// Brainstorm: statyczny portal + anonimowa statystyka (D1) + API panelu admina.
const TYPES = new Set(["view", "time", "mini", "final", "search", "term"]);
const MAX_BODY = 16_000, MAX_EVENTS = 60, DAY = 86_400_000;

// Sprawdza i normalizuje paczkę zdarzeń z /api/t. Zwraca null, gdy jest niepoprawna.
export function parseBatch(raw){
  let b; try { b = JSON.parse(raw); } catch { return null; }
  if (!b || typeof b.v !== "string" || !/^[\w-]{6,64}$/.test(b.v) || !Array.isArray(b.e)) return null;
  const events = b.e.slice(0, MAX_EVENTS).filter(e => Array.isArray(e) && TYPES.has(e[0])).map(([type, page, val]) => ({
    type,
    page: String(page ?? "").slice(0, 80),
    val: Math.max(0, Math.min(type === "time" ? 600 : 100, Number.isFinite(+val) ? Math.round(+val) : 0)),
  }));
  return { visitor: b.v, lang: b.lang === "ru" ? "ru" : "pl", device: b.d === "m" ? "m" : "d", events };
}

function safeEqual(a, b){
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

async function track(req, env){
  const raw = await req.text();
  if (raw.length > MAX_BODY) return new Response(null, { status: 204 });
  const b = parseBatch(raw);
  if (!b || !b.events.length) return new Response(null, { status: 204 });
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare("INSERT INTO visitors (id, first_seen, last_seen, lang, device) VALUES (?1, ?2, ?2, ?3, ?4) ON CONFLICT(id) DO UPDATE SET last_seen = ?2, lang = ?3, device = ?4")
      .bind(b.visitor, now, b.lang, b.device),
    ...b.events.map(e => env.DB.prepare("INSERT INTO events (visitor, ts, type, page, val) VALUES (?, ?, ?, ?, ?)").bind(b.visitor, now, e.type, e.page, e.val)),
  ]);
  return new Response(null, { status: 204 });
}

async function stats(env){
  const now = Date.now(), all = q => env.DB.prepare(q);
  const [users, daily, time, pages, terms, tests, searches, split] = await env.DB.batch([
    all(`SELECT COUNT(*) total,
           SUM(last_seen > ?1) d1, SUM(last_seen > ?2) d7, SUM(last_seen > ?3) d30
         FROM visitors`).bind(now - DAY, now - 7 * DAY, now - 30 * DAY),
    all(`SELECT date(ts / 1000, 'unixepoch') day, COUNT(DISTINCT visitor) users,
           SUM(CASE WHEN type = 'time' THEN val ELSE 0 END) secs
         FROM events WHERE ts > ? GROUP BY day ORDER BY day`).bind(now - 30 * DAY),
    all(`SELECT COALESCE(SUM(val), 0) secs, COUNT(DISTINCT visitor) users FROM events WHERE type = 'time'`),
    all(`SELECT page, SUM(type = 'view') views, COUNT(DISTINCT visitor) users,
           SUM(CASE WHEN type = 'time' THEN val ELSE 0 END) secs
         FROM events WHERE type IN ('view', 'time') GROUP BY page ORDER BY secs DESC, views DESC LIMIT 25`),
    all(`SELECT page, COUNT(*) n FROM events WHERE type = 'term' GROUP BY page ORDER BY n DESC LIMIT 15`),
    all(`SELECT type, page, COUNT(*) n, ROUND(AVG(val)) avg, SUM(val = 100) perfect
         FROM events WHERE type IN ('mini', 'final') GROUP BY type, page ORDER BY type DESC, page`),
    all(`SELECT page, COUNT(*) n FROM events WHERE type = 'search' GROUP BY page ORDER BY n DESC LIMIT 15`),
    all(`SELECT lang, device, COUNT(*) n FROM visitors GROUP BY lang, device`),
  ]);
  return Response.json({
    users: users.results[0], daily: daily.results, time: time.results[0], pages: pages.results,
    terms: terms.results, tests: tests.results, searches: searches.results, split: split.results,
  }, { headers: { "cache-control": "no-store" } });
}

export default {
  async fetch(req, env){
    const url = new URL(req.url);
    if (url.pathname === "/api/t" && req.method === "POST") return track(req, env);
    if (url.pathname === "/api/stats" && req.method === "GET"){
      const token = (req.headers.get("authorization") || "").replace(/^Bearer /, "");
      if (!env.ADMIN_PASSWORD || !safeEqual(token, env.ADMIN_PASSWORD)) return new Response("Unauthorized", { status: 401 });
      return stats(env);
    }
    if (url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(req);
  },
};
