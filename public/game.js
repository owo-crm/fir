// Brainstorm · NIEURODZAJ — strategia ekonomiczna: Polska, piaskownica bez końca (bez wojen i armii).
// Model: pl-sim.js (window.PLSim), dane: pl-simulation-data.js, doradca bez API: advisor-knowledge.js.
// Ten plik to tylko interfejs: zegar (1× = 12 s na dzień), mapa 2D, panele, doradca, „Dlaczego?”, samouczek.
// Ikony i flagi to proste wektory SVG (bez emoji i bez grafik zewnętrznych).
(function () {
  "use strict";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const LS_SAVE = "makro2.pl.save", LS_TUT = "makro2.pl.tut";

  // ------------------------------------------------------------ ikony (24×24, linia)
  const ICON = {
    chart: '<path d="M4 20V11M10 20V5M16 20v-8M21 20H3"/>', coins: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    factory: '<path d="M3 21V11l5 3v-3l5 3V8l5 3v10zM3 21h18M17 4h2v7"/>', globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3.6 3.2 14.4 0 18M12 3c-3.2 3.6-3.2 14.4 0 18"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', cap: '<path d="m2 9 10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6"/>', flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9"/>',
    bank: '<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>', data: '<path d="M3 3v18h18M7 15l4-4 3 3 6-6"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5"/>', news: '<path d="M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 13h7M7 16h4"/>',
    doc: '<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5"/>', pause: '<path d="M8 5v14M16 5v14"/>', play: '<path d="m7 4 13 8-13 8z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', alert: '<path d="M12 3 2 20h20zM12 10v4M12 17h.01"/>',
    down: '<path d="M12 4v15M6 13l6 6 6-6"/>', up: '<path d="M12 20V5M6 11l6-6 6 6"/>', check: '<path d="m5 12 5 5 9-10"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>', send: '<path d="M4 12 20 4l-6 16-3-7z"/>',
    wheat: '<path d="M12 21V8M12 8c-3 0-4-2-4-5 3 0 4 2 4 5zm0 0c3 0 4-2 4-5-3 0-4 2-4 5zM12 14c-3 0-4-2-4-4 3 0 4 1 4 4zm0 0c3 0 4-2 4-4-3 0-4 1-4 4z"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 3 3 5"/>', fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3M6 8h6"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/>', bread: '<path d="M5 11a4 4 0 0 1 2-7.5h10A4 4 0 0 1 19 11v9H5z"/>',
    anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M5 13a7 7 0 0 0 14 0M8 11h8"/>', tank: '<ellipse cx="12" cy="7" rx="6" ry="2.5"/><path d="M6 7v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"/>',
    plant: '<path d="M4 21v-9l4-2v11M8 21V8h4v13M14 21l1-12h4l1 12M3 21h18M16.5 6c0-2 2-2 2-4"/>', target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    save: '<path d="M5 3h11l3 3v15H5zM8 3v5h7M8 21v-7h8v7"/>', folder: '<path d="M3 6h6l2 2h10v11H3z"/>', plus: '<path d="M12 5v14M5 12h14"/>', back: '<path d="M15 6l-6 6 6 6"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.8 3.6-5.5 6.5-5.5s5.7 1.7 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .6 3.2 2.4 3.5 5.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    signal: '<path d="M5 12a7 7 0 0 1 14 0M8.5 12a3.5 3.5 0 0 1 7 0M12 12v8"/>',
  };
  const ic = (n, cls = "") => `<svg class="pl-ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON[n] || ""}</svg>`;
  // flagi (uproszczone, wektorowe)
  const STRIPES = { PL: [["#fff", "#dc143c"], "h"], DE: [["#111", "#dd0000", "#ffce00"], "h"], SK: [["#fff", "#0b4ea2", "#ee1c25"], "h"], LT: [["#fdb913", "#006a44", "#c1272d"], "h"], UA: [["#0057b7", "#ffd700"], "h"], BY: [["#c8313e", "#c8313e", "#4aa657"], "h"], FR: [["#0055a4", "#fff", "#ef4135"], "v"] };
  function flagInner(k){
    if (k === "EU"){ let d = ""; for (let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2; d += `<circle cx="${(15 + Math.cos(a) * 6).toFixed(1)}" cy="${(10 + Math.sin(a) * 6).toFixed(1)}" r="1" fill="#ffcc00"/>`; } return `<rect width="30" height="20" fill="#039"/>${d}`; }
    if (k === "CZ") return `<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#d7141a"/><path d="M0 0 15 10 0 20z" fill="#11457e"/>`;
    if (k === "WORLD") return `<rect width="30" height="20" fill="#1d4f7a"/><circle cx="15" cy="10" r="7" fill="none" stroke="#bfe3ff" stroke-width="1.4"/><path d="M8 10h14M15 3c3 3 3 11 0 14M15 3c-3 3-3 11 0 14" fill="none" stroke="#bfe3ff" stroke-width="1.1"/>`;
    const [cs, dir] = STRIPES[k] || [["#888"], "h"], n = cs.length;
    return cs.map((c, i) => dir === "h" ? `<rect y="${(20 / n * i).toFixed(2)}" width="30" height="${(20 / n + 0.1).toFixed(2)}" fill="${c}"/>` : `<rect x="${(30 / n * i).toFixed(2)}" width="${(30 / n + 0.1).toFixed(2)}" height="20" fill="${c}"/>`).join("");
  }
  const flag = (k, w = 22) => `<svg class="pl-flag" viewBox="0 0 30 20" width="${w}" height="${(w * 2 / 3).toFixed(0)}" aria-hidden="true">${flagInner(k)}</svg>`;

  function mount(el, ctx){
    const S = window.PLSim, A = window.PLAdvisor, D = S && S.DATA;
    if (!S || !A){ el.innerHTML = "<p>Brak modułu gry.</p>"; return; }
    const { lang, esc } = ctx, li = lang === "ru" ? 1 : 0;
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    const n1 = v => (Math.round(v * 10) / 10).toFixed(1).replace(".", ",").replace("-", "−");
    const n2 = v => (Math.round(v * 100) / 100).toFixed(2).replace(".", ",").replace("-", "−");
    const n0 = v => String(Math.round(v)).replace("-", "−").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const sgn = (v, f = n1) => (v > 0.0001 ? "+" : v < -0.0001 ? "−" : "±") + f(Math.abs(v));
    const nm = o => o ? o.name[li] : "";
    const MONTHS = lang === "ru" ? ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"] : ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
    const MGEN = lang === "ru" ? ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"] : ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
    const monthName = (m, y) => `${MONTHS[m][0].toUpperCase() + MONTHS[m].slice(1)} ${y}`;
    const dateStr = di => { const d = S.date(di); return `${d.day + 1} ${MGEN[d.month]} ${d.year}`; };
    const UNIT = L("mld zł/rok", "млрд zł/год"), PP = L(" p.p.", " п.п."), RR = L("% r/r", "% г/г");

    // ------------------------------------------------------------ stan
    let s = null;
    try { const raw = localStorage.getItem(LS_SAVE); if (raw){ const r = S.deserialize(raw); if (r.ok) s = r.state; } } catch {}
    if (!s) s = S.newGame((Date.now() % 1e9) >>> 0);
    let tut = { done: false, step: 0 };
    try { tut = JSON.parse(localStorage.getItem(LS_TUT) || "null") || tut; } catch {}
    const clock = S.createClock({ daySec: 12, maxCatchUp: 2 });
    let section = null, ov = null, ovBuilt = null, why = null, partnerSel = null, draft = {}, lastMonth = -1, sigRight = "", sigOv = "", chatHtml = "", chatPath = [];
    const ui = { whyOpened: false, partnerOpened: null, asked: false };
    ctx.track?.("game", "pl_open");

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull pl"; document.body.appendChild(host); document.body.classList.add("gaming");
    const $ = (q, r = host) => r.querySelector(q), $$ = (q, r = host) => [...r.querySelectorAll(q)];

    const SECTIONS = [["gosp", "chart", L("Gospodarka", "Экономика")], ["budzet", "coins", L("Budżet", "Бюджет")], ["sektory", "factory", L("Sektory", "Секторы")], ["handel", "globe", L("Handel", "Торговля")],
      ["energia", "bolt", L("Energia", "Энергия")], ["nauka", "cap", L("Edukacja i Nauka", "Образование")], ["banki", "bank", L("Banki", "Банки")], ["dane", "data", L("Dane", "Данные")], ["ust", "gear", L("Ustawienia", "Настройки")]];
    const PROG_SEC = { siec: "energia", magazyny: "energia", oze: "energia", efektywnosc: "energia", logistyka: "handel", edukacja: "nauka", badania: "nauka", rolnictwo: "sektory", przemysl: "sektory" };
    const targetSection = t => !t ? null : t.startsWith("programs.") ? PROG_SEC[t.slice(9)] : t.startsWith("reserve.") || t === "trade" ? "handel" : t === "rate" ? "banki" : ["vat", "pit", "cit", "social", "health", "admin", "budget"].includes(t) ? "budzet" : null;

    host.innerHTML = `
      <header class="pl-top">
        <div class="pl-brand">${flag("PL", 34)}<div><b>${L("POLSKA", "ПОЛЬША")}</b><span id="pldate"></span><i class="pl-dbar"><b id="pldbar"></b></i></div></div>
        <div class="pl-kpis" id="plkpi"></div>
        <div class="pl-speed" role="group" aria-label="${L("Tempo", "Скорость")}" id="plspeed">
          <button data-sp="0" aria-label="${L("Pauza", "Пауза")}">${ic("pause")}</button><button data-sp="1">1×</button><button data-sp="2">2×</button><button data-sp="5">5×</button>
        </div>
        <button class="pl-ib" id="pltut" aria-label="${L("Samouczek", "Обучение")}">${ic("help")}</button>
        <a class="pl-ib" href="#start" aria-label="${L("Wyjdź", "Выйти")}">${ic("close")}</a>
      </header>
      <div class="pl-body" id="plbody">
        <nav class="pl-nav" id="plnav">${SECTIONS.map(([k, i, t]) => `<button data-nav="${k}">${ic(i)}<span>${t}</span></button>`).join("")}</nav>
        <div class="pl-mapwrap" id="plmapwrap"><svg class="pl-map" id="plmap" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" aria-label="${L("Mapa Polski i partnerów", "Карта Польши и партнёров")}"></svg>
          <div class="pl-legend"><span><i class="lg-r"></i>${L("handel (grubość = wartość)", "торговля (толщина = объём)")}</span><span><i class="lg-b"></i>${L("zakłócenia", "сбои")}</span><span><i class="lg-c"></i>${L("kontrakt", "контракт")}</span><em>${L("dane gry, przybliżone", "игровые данные, приблизительно")}</em></div>
          <aside class="pl-drawer" id="pldrawer" hidden></aside>
        </div>
        <aside class="pl-right" id="plright"></aside>
        <div class="pl-ov" id="plov" hidden></div>
      </div>
      <footer class="pl-bottom" id="plbottom"></footer>
      <nav class="pl-mnav" id="plmnav"><button data-m="sec">${ic("chart")}<span>${L("Sekcje", "Разделы")}</span></button><button data-m="advisor">${ic("user")}<span>${L("Doradca", "Советник")}</span></button><button data-m="news">${ic("news")}<span>${L("Wiadomości", "Новости")}</span></button><button data-m="contracts">${ic("doc")}<span>${L("Kontrakty", "Контракты")}</span></button></nav>
      <div class="pl-why" id="plwhy" hidden></div>
      <div class="pl-modal" id="plmodal" hidden></div>
      <div class="pl-tut" id="pltutbox" hidden></div>
      <div class="pl-toast" id="pltoast"></div>`;

    // ------------------------------------------------------------ mapa (SVG, prosta i lekka)
    const proj = (lon, lat) => [290 + (lon - 14.1) / 10 * 420, 170 + (54.9 - lat) / 5.9 * 380];
    const PL_OUT = [[14.2, 53.9], [16.0, 54.25], [17.5, 54.75], [18.6, 54.72], [18.6, 54.4], [19.6, 54.45], [22.8, 54.36], [23.5, 53.9], [23.9, 53.15], [23.6, 52.6], [23.2, 52.25], [23.6, 51.6], [24.1, 51.0], [23.6, 50.4], [22.7, 49.6], [22.6, 49.1], [21.0, 49.4], [19.8, 49.2], [18.9, 49.5], [18.0, 50.0], [16.9, 50.4], [16.3, 50.7], [15.0, 51.0], [14.8, 51.6], [14.6, 52.4], [14.2, 52.9], [14.4, 53.3]];
    const CITIES = [["Warszawa", 21.0, 52.23, 1], ["Kraków", 19.94, 50.06], ["Łódź", 19.46, 51.76], ["Wrocław", 17.03, 51.1], ["Poznań", 16.93, 52.4], ["Gdańsk", 18.65, 54.35, 0, "anchor"], ["Szczecin", 14.55, 53.43], ["Świnoujście", 14.25, 53.9, 0, "tank"], ["Katowice", 19.02, 50.26], ["Lublin", 22.57, 51.25], ["Białystok", 23.16, 53.13], ["Rzeszów", 22.0, 50.04], ["Bełchatów", 19.33, 51.27, 0, "plant"]];
    const ENTRY = { DE: [14.6, 52.4], CZ: [16.5, 50.55], SK: [20.5, 49.35], LT: [23.3, 54.05], UA: [23.9, 50.7], BY: [23.6, 52.35], FR: [15.1, 51.1], EU: [14.5, 53.5], WORLD: [18.65, 54.45] };
    const ppos = k => { const P = D.partners[k]; return [40 + P.x * 920, 40 + P.y * 620]; };
    const mapIc = (n, sc = 0.7) => `<g class="pl-mapic" transform="translate(${-12 * sc},${-12 * sc}) scale(${sc})">${ICON[n]}</g>`;
    function buildMap(){
      const svg = $("#plmap"), pts = PL_OUT.map(p => proj(...p).map(Math.round).join(",")).join(" "), [lx, ly] = proj(18.0, 52.95);
      let h = `<defs><linearGradient id="plsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2140"/><stop offset="1" stop-color="#15385c"/></linearGradient>
          <linearGradient id="plland" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#466f3c"/><stop offset="1" stop-color="#355a31"/></linearGradient></defs>
        <rect x="0" y="0" width="1000" height="700" fill="#1e2b25"/>
        <path d="M0 0 H1000 V120 C 820 150 760 175 700 168 C 600 160 560 152 480 158 C 400 162 330 168 290 175 C 200 190 120 150 0 170 Z" fill="url(#plsea)"/>
        <text x="330" y="132" class="pl-sea">${L("Morze Bałtyckie", "Балтийское море")}</text>
        <polygon points="${pts}" class="pl-poland"/>
        <text x="${lx.toFixed(0)}" y="${ly.toFixed(0)}" class="pl-plname">${L("POLSKA", "ПОЛЬША")}</text>
        <g id="plroutes"></g><g id="plcities">`;
      for (const [n, lo, la, cap, kind] of CITIES){ const [x, y] = proj(lo, la);
        h += kind ? `<g class="pl-poi" data-poi="${kind}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><rect x="-12" y="-12" width="24" height="24" rx="6"/>${mapIc(kind)}<text class="pl-cn" x="16" y="5">${n}</text></g>`
          : `<g class="pl-city" transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><circle r="${cap ? 6 : 4.5}"/><text class="pl-cn${cap ? " cap" : ""}" x="9" y="5">${n}</text></g>`; }
      h += `</g><g id="plpartners">`;
      for (const k of S.PK){ const [x, y] = ppos(k), P = D.partners[k];
        h += `<g class="pl-partner${P.restricted ? " restr" : ""}" data-p="${k}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})" tabindex="0" role="button" aria-label="${esc(nm(P))}"><circle r="25" class="ring"/><circle r="20" class="core"/><svg x="-12" y="-8" width="24" height="16" viewBox="0 0 30 20">${flagInner(k)}</svg><text y="43" text-anchor="middle" class="pl-pn">${esc(nm(P)).toUpperCase()}</text><g class="pl-pev"></g></g>`; }
      h += `</g><g id="plevpl"></g>`;
      svg.innerHTML = h;
      $$(".pl-partner").forEach(g => { const open = () => openPartner(g.dataset.p); g.onclick = open; g.onkeydown = e => { if (e.key === "Enter") open(); }; });
      $$(".pl-poi").forEach(g => g.onclick = () => { const k = g.dataset.poi; openWhy(k === "plant" ? "power" : k === "tank" ? "gas" : "imports"); });
    }
    // wartość handlu z partnerem (mld zł/rok) — szacunek z udziałów partnera w rynkach
    function partnerTrade(pk){
      const P = D.partners[pk], sp = s.partners[pk], out = { imp: 0, exp: 0, byM: [] };
      for (const k of S.MK){ const si = Object.values(D.partners).reduce((a, Q) => a + (Q.imp[k] || 0), 0) || 1, se = Object.values(D.partners).reduce((a, Q) => a + (Q.exp[k] || 0), 0) || 1, q = s.markets[k];
        const i = (P.imp[k] || 0) / si * (q.impValue || 0) * Math.min(1, (sp.supply[k] ?? 1) * sp.route * 1.05), e = (P.exp[k] || 0) / se * (q.expValue || 0) * Math.min(1, sp.demand * sp.route * 1.05);
        out.imp += i; out.exp += e; if (i + e > 0.5) out.byM.push({ k, imp: i, exp: e }); }
      out.byM.sort((a, b) => (b.imp + b.exp) - (a.imp + a.exp));
      return out;
    }
    const partnerIssue = pk => { const sp = s.partners[pk]; const minS = Math.min(1, ...Object.values(sp.supply)); return sp.route < 0.9 || minS < 0.9 || sp.demand < 0.95; };
    const evMark = ph => `<g class="pl-evm ${ph}"><circle r="12"/><g transform="translate(-8,-8.5) scale(.68)">${ICON.alert}</g></g>`;
    function drawMap(){
      let h = "";
      for (const pk of S.PK){
        const [x1, y1] = ppos(pk), [x2, y2] = proj(...ENTRY[pk]), tr = partnerTrade(pk), v = tr.imp + tr.exp;
        const w = clamp(1.5 + Math.sqrt(v) * 0.55, 1.5, 20), bad = partnerIssue(pk), restr = D.partners[pk].restricted;
        const mx = (x1 + x2) / 2 + (y2 - y1) * 0.12, my = (y1 + y2) / 2 - (x2 - x1) * 0.12;
        const d = `M${x1.toFixed(0)} ${y1.toFixed(0)} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}`;
        h += `<path d="${d}" class="pl-route${bad ? " bad" : ""}${restr ? " restr" : ""}" style="stroke-width:${w.toFixed(1)}"/><path d="${d}" class="pl-flow" style="animation-duration:${(6 / Math.max(0.3, s.partners[pk].route)).toFixed(1)}s"/>`;
        const cs = s.contracts.filter(c => c.status === "active" && c.partner === pk);
        if (cs.length) h += `<path d="M${x1.toFixed(0)} ${(y1 + 8).toFixed(0)} Q${(mx + 10).toFixed(0)} ${(my + 10).toFixed(0)} ${x2.toFixed(0)} ${(y2 + 6).toFixed(0)}" class="pl-cline"/><g class="pl-ctag" transform="translate(${mx.toFixed(0)},${(my + 22).toFixed(0)})"><rect x="-17" y="-11" width="34" height="22" rx="6"/><g transform="translate(-14,-7) scale(.58)">${ICON.doc}</g><text x="5" y="5">${cs.length}</text></g>`;
      }
      $("#plroutes").innerHTML = h;
      for (const g of $$(".pl-partner")){ const pk = g.dataset.p, sp = s.partners[pk], ev = s.events.filter(e => D.events[e.k].partner === pk);
        g.classList.toggle("issue", partnerIssue(pk)); g.classList.toggle("sel", partnerSel === pk);
        g.querySelector(".ring").style.stroke = sp.relationship > 0.6 ? "var(--pl-green)" : sp.relationship > 0.35 ? "var(--pl-gold)" : "var(--pl-red)";
        g.querySelector(".pl-pev").innerHTML = ev.length ? `<g transform="translate(20,-20)">${evMark(S.phase(ev[0]))}</g>` : ""; }
      const dom = s.events.filter(e => D.events[e.k].partner === "PL");
      const [bx, by] = proj(19.33, 51.27);
      $("#plevpl").innerHTML = dom.length ? `<g transform="translate(${bx + 18},${by - 22})">${evMark(S.phase(dom[0]))}</g>` : "";
    }

    // ------------------------------------------------------------ górny pasek i wskaźniki
    const histAgo = days => { const H = s.history; return H.length > days ? H[H.length - 1 - days] : H[0] || s.start; };
    const KPIS = [
      ["gdp", "chart", L("PKB", "ВВП"), () => s.macro.Y * s.macro.priceLevel, v => (v / 1000).toFixed(2).replace(".", ",") + " " + L("bln zł", "трлн zł"), () => sgn(s.macro.growthYoY) + RR, 1, "nominalGDP"],
      ["inflation", "flame", L("Inflacja", "Инфляция"), () => s.macro.inflation, v => n1(v) + "%", d => sgn(d) + PP, -1, "inflation"],
      ["unemployment", "people", L("Bezrobocie", "Безработица"), () => s.macro.unemployment, v => n1(v) + "%", d => sgn(d) + PP, -1, "unemployment"],
      ["budget", "coins", L("Budżet", "Бюджет"), () => s.macro.balance, v => sgn(v, n0) + " " + L("mld zł", "млрд"), () => sgn(s.macro.balance / s.macro.nominalGDP * 100) + L("% PKB", "% ВВП"), 1, "balance"],
      ["debt", "bank", L("Dług/PKB", "Долг/ВВП"), () => s.macro.debtRatio, v => n1(v) + "%", d => sgn(d) + PP, -1, "debtRatio"],
      ["exports", "up", L("Eksport", "Экспорт"), () => s.macro.X, v => n0(v) + " " + L("mld", "млрд"), (d, p) => sgn(d / Math.max(1, p) * 100) + "%", 1, "X"],
      ["imports", "down", L("Import", "Импорт"), () => s.macro.M, v => n0(v) + " " + L("mld", "млрд"), (d, p) => sgn(d / Math.max(1, p) * 100) + "%", 0, "M"],
    ];
    function drawKpis(){
      const a = histAgo(30);
      $("#plkpi").innerHTML = KPIS.map(([k, icn, t, get, f, fd, good, hk]) => { const v = get(), p = a[hk] ?? v, d = v - p, th = Math.abs(p) * 0.003 + 0.02;
        const cls = !good || Math.abs(d) <= th ? "" : (d > 0) === (good > 0) ? "up" : "down";
        return `<button class="pl-kpi k-${k}" data-why="${k}">${ic(icn)}<span><small>${t}</small><b>${f(v)}</b><i class="${cls}">${fd(d, p)}</i></span></button>`; }).join("");
    }
    function drawTop(){
      $("#pldate").textContent = dateStr(s.dayIndex);
      $("#pldbar").style.width = (clamp(clock.progress, 0, 1) * 100).toFixed(1) + "%";
      $$("#plspeed [data-sp]").forEach(b => b.classList.toggle("on", +b.dataset.sp === clock.speed));
    }
    function setSpeed(v){ clock.setSpeed(v); drawTop(); tutCheck(); }

    // ------------------------------------------------------------ dolny pasek: wskaźniki, struktura PKB, zasoby i rynki
    function spark(vals, color = "var(--pl-blue)", w = 120, h = 34){
      if (vals.length < 2) return `<svg class="pl-spark" viewBox="0 0 ${w} ${h}"></svg>`;
      const mn = Math.min(...vals), mx = Math.max(...vals), r = mx - mn || 1;
      const pts = vals.map((v, i) => `${(i / (vals.length - 1) * w).toFixed(1)},${(h - 2 - (v - mn) / r * (h - 5)).toFixed(1)}`);
      return `<svg class="pl-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="--c:${color}"><polygon points="0,${h} ${pts.join(" ")} ${w},${h}"/><polyline points="${pts.join(" ")}"/></svg>`;
    }
    function donut(parts){
      let off = 25, out = "";
      const tot = parts.reduce((a, p) => a + Math.max(0, p[1]), 0) || 1;
      for (const [, v, c] of parts){ const pc = Math.max(0, v) / tot * 100; out += `<circle r="15.9" cx="21" cy="21" fill="none" stroke="${c}" stroke-width="6" stroke-dasharray="${pc.toFixed(2)} ${(100 - pc).toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>`; off -= pc; }
      return `<svg class="pl-donut" viewBox="0 0 42 42">${out}</svg>`;
    }
    const RES = [["zboze", "wheat", L("Zboże", "Зерно")], ["gaz", "flame", L("Gaz", "Газ")], ["prad", "bolt", L("Prąd", "Электроэнергия")], ["paliwa", "fuel", L("Paliwa", "Топливо")], ["zywnosc", "bread", L("Żywność", "Еда")], ["maszyny", "gear", L("Maszyny", "Машины")]];
    const priceStr = (k, p) => D.markets[k].price < 10 ? L("indeks ", "индекс ") + n0(p * 100) : n0(p) + " " + D.markets[k].priceUnit;
    function drawBottom(){
      const H = s.history.slice(-360), take = k => H.map(x => x[k]), a = histAgo(30), m = s.macro;
      const items = [["gdp", L("PKB", "ВВП"), take("nominalGDP"), (m.Y * m.priceLevel / 1000).toFixed(2).replace(".", ",") + " " + L("bln", "трлн"), sgn(m.growthYoY) + RR, "var(--pl-green)"],
        ["inflation", L("Inflacja", "Инфляция"), take("inflation"), n1(m.inflation) + "%", sgn(m.inflation - a.inflation) + PP, "var(--pl-red)"],
        ["unemployment", L("Bezrobocie", "Безработица"), take("unemployment"), n1(m.unemployment) + "%", sgn(m.unemployment - a.unemployment) + PP, "var(--pl-blue)"],
        ["debt", L("Dług/PKB", "Долг/ВВП"), take("debtRatio"), n1(m.debtRatio) + "%", sgn(m.debtRatio - a.debtRatio) + PP, "var(--pl-gold)"],
        ["trade", L("Saldo handlu", "Торг. сальдо"), take("tradeBalance"), sgn(m.X - m.M, n0) + " " + L("mld", "млрд"), L("towary, rocznie", "товары, в год"), "var(--pl-violet)"]];
      const tot = m.C + m.I + m.G + Math.max(0, m.NX);
      const parts = [[L("Konsumpcja", "Потребление"), m.C, "#4ea1ff"], [L("Inwestycje", "Инвестиции"), m.I, "#3fc28a"], [L("Wydatki państwa", "Госрасходы"), m.G, "#e2b44c"], [L("Eksport netto", "Чистый экспорт"), Math.max(0, m.NX), "#b77cf2"]];
      $("#plbottom").innerHTML = `<section class="pl-panel pl-ind"><h5>${ic("chart")}${L("Najważniejsze wskaźniki", "Главные показатели")}</h5><div class="pl-indg">${items.map(([k, t, v, now, d, c]) => `<button class="pl-mini" data-why="${k}"><small>${t}</small><b>${now}</b><i>${d}</i>${spark(v, c)}</button>`).join("")}</div></section>
        <section class="pl-panel pl-str"><h5>${ic("data")}${L("Struktura popytu (PKB)", "Структура спроса (ВВП)")}</h5><div class="pl-strg">${donut(parts)}<ul>${parts.map(([t, v, c]) => `<li><i style="background:${c}"></i>${t}<b>${Math.round(v / tot * 100)}%</b></li>`).join("")}</ul></div></section>
        <section class="pl-panel pl-res"><h5>${ic("box")}${L("Zasoby i rynki (ceny krajowe)", "Ресурсы и рынки (внутренние цены)")}</h5><div class="pl-resg">${RES.map(([k, icn, t]) => { const p = s.markets[k].price, p0 = a.mk?.[k]?.price ?? p, d = (p / p0 - 1) * 100;
          return `<button class="pl-resi" data-why="${k === "gaz" ? "gas" : k === "prad" ? "power" : k === "zboze" || k === "zywnosc" ? "grain" : "imports"}">${ic(icn)}<span><small>${t}</small><b>${priceStr(k, p)}</b><i class="${d > 0.3 ? "r" : d < -0.3 ? "g" : ""}">${sgn(d)}%</i></span></button>`; }).join("")}</div></section>`;
    }

    // ------------------------------------------------------------ prawa kolumna: doradca (skrót), wiadomości, kontrakty
    const RISK = { inflation_high: [L("Inflacja powyżej celu", "Инфляция выше цели"), "inflation", "flame"], inflation_low: [L("Inflacja poniżej celu", "Инфляция ниже цели"), "inflation", "flame"], unemployment: [L("Rosnące bezrobocie", "Растущая безработица"), "unemployment", "people"],
      debt: [L("Dług powyżej 60% PKB", "Долг выше 60% ВВП"), "debt", "bank"], gas_dependency: [L("Wysoka zależność od importu gazu", "Высокая зависимость от импорта газа"), "gas", "bolt"], food_security: [L("Bezpieczeństwo żywnościowe", "Продовольственная безопасность"), "grain", "wheat"],
      productivity: [L("Edukacja i R&D niedofinansowane — słabszy potencjał w dłuższym okresie", "Образование и R&D недофинансированы — слабее потенциал в долгосрочной перспективе"), "gdp", "cap"], infrastructure: [L("Niedofinansowana infrastruktura", "Недофинансированная инфраструктура"), "trade", "globe"], growth: [L("Wolny wzrost gospodarki", "Медленный рост экономики"), "gdp", "chart"] };
    const CONF_R = { events: L("trwające wydarzenia", "идущие события"), prices: L("zmienne ceny surowców", "волатильные цены сырья"), decisions: L("świeże decyzje (efekt jeszcze niewidoczny)", "свежие решения (эффект ещё не виден)"), contracts: L("kłopoty z dostawami", "проблемы с поставками") };
    const lastRep = () => s.advisor.reports[s.advisor.reports.length - 1];
    const avatar = (cls = "") => `<div class="pl-avatar ${cls}"><img src="advisor.jpg" alt="" loading="lazy"></div>`;
    function advisorBrief(){
      const r = lastRep(); if (!r) return "";
      const b = r.base[0], top = r.risks[0];
      return `${L(`Przy obecnej polityce PKB urośnie o ${n1(b.growth)}% w ciągu 12 miesięcy, inflacja wyniesie ok. ${n1(b.inflation)}%.`, `При текущей политике ВВП вырастет на ${n1(b.growth)}% за 12 месяцев, инфляция составит около ${n1(b.inflation)}%.`)} ${top ? L(`Główne ryzyko: ${RISK[top.topic]?.[0].toLowerCase()}.`, `Главный риск: ${RISK[top.topic]?.[0].toLowerCase()}.`) : L("Brak pilnych ryzyk.", "Срочных рисков нет.")}`;
    }
    function newsText(n){
      const ev = k => nm(D.events[k]), cid = n.ref, c = s.contracts.find(x => x.id === cid) || s.offers.find(x => x.id === cid) || (n.p ? { type: n.ty, market: n.mk, partner: n.p } : null);
      const cdesc = c ? `${c.type === "import" ? L("import", "импорт") : L("eksport", "экспорт")} ${nm(D.markets[c.market]).toLowerCase()} · ${nm(D.partners[c.partner])}` : "";
      const inn = id => nm(D.innovations.find(x => x.id === id));
      const T = {
        welcome: ["calendar", L("Start kadencji", "Начало срока"), L("Gospodarka Polski czeka na Twoje decyzje. Czas płynie — możesz go zatrzymać.", "Экономика Польши ждёт решений. Время идёт — его можно остановить.")],
        event_signal: ["signal", ev(n.k), L("Pierwsze sygnały — warto przygotować się zawczasu.", "Первые сигналы — стоит подготовиться заранее."), "ev"], event_stress: ["alert", ev(n.k), L("Sytuacja się zaostrza.", "Ситуация обостряется."), "ev"],
        event_peak: ["alert", ev(n.k), L("Szczyt zakłóceń.", "Пик сбоев."), "ev"], event_recovery: ["check", ev(n.k), L("Sytuacja się poprawia.", "Ситуация улучшается."), "ev"], event_end: ["check", ev(n.k), L("Zakłócenie wygasło.", "Сбой завершился."), "ev"],
        offer: ["doc", L("Nowa oferta kontraktu", "Новое предложение контракта"), cdesc], contract_signed: ["doc", L("Podpisano kontrakt", "Подписан контракт"), cdesc],
        contract_broken: ["alert", L("Zerwano kontrakt", "Контракт разорван"), cdesc + L(" — kara i spadek zaufania.", " — штраф и падение доверия.")],
        contract_shortfall: ["down", L("Niepełne dostawy partnera", "Недопоставка партнёра"), cdesc + (n.fm ? L(" (siła wyższa)", " (форс-мажор)") : "")],
        contract_underdelivery: ["down", L("Polska nie dostarczyła pełnej ilości", "Польша недопоставила"), cdesc + (n.fm ? L(" (siła wyższa)", " (форс-мажор)") : L(" — kara i niższa wiarygodność", " — штраф и ниже надёжность"))],
        contract_done: ["check", L("Kontrakt zakończony", "Контракт завершён"), cdesc],
        innovation_found: ["bulb", L("Nowe odkrycie", "Новое открытие"), inn(n.ref) + L(" — możesz wdrożyć (Edukacja i Nauka).", " — можно внедрить (Образование).")], innovation_done: ["check", L("Wdrożono innowację", "Инновация внедрена"), inn(n.ref)],
        inflation_high: ["flame", L("Inflacja powyżej 5%", "Инфляция выше 5%"), n1(n.v) + "%", "inflation"], unemployment_high: ["people", L("Bezrobocie powyżej 7%", "Безработица выше 7%"), n1(n.v) + "%", "unemployment"],
        gas_up: ["flame", L("Gaz drożeje", "Газ дорожает"), L(`+${n0(n.v)}% w miesiąc`, `+${n0(n.v)}% за месяц`), "gas"], debt_60: ["bank", L("Dług powyżej 60% PKB", "Долг выше 60% ВВП"), "", "debt"],
        shortage: ["alert", L("Niedobór na rynku", "Дефицит на рынке"), `${n.k && D.markets[n.k] ? nm(D.markets[n.k]) : ""} (${n1(n.v || 0)}% ${L("popytu", "спроса")})`, n.k === "gaz" ? "gas" : n.k === "prad" ? "power" : n.k === "zboze" || n.k === "zywnosc" ? "grain" : "imports"],
      };
      const t = T[n.id] || ["news", String(n.id), ""];
      let wk = t[3], fl = null;
      if (wk === "ev"){ const E = D.events[n.k] || {}, e = E.effects || {}; fl = E.partner || "PL"; wk = e.world?.gaz ? "gas" : e.domesticYield || e.supply?.UA ? "grain" : e.domestic?.prad ? "power" : e.demand ? "exports" : "imports"; }
      if (c) fl = c.partner;
      return { icon: t[0], title: t[1], text: t[2], why: wk, flag: fl, tone: /alert|down|flame/.test(t[0]) ? "bad" : /check|bulb/.test(t[0]) ? "good" : "" };
    }
    const newsItem = n => { const t = newsText(n); return `<li class="${t.tone}"><span class="ni">${t.flag ? flag(t.flag, 26) : ic(t.icon)}</span><div><b>${esc(t.title)}</b>${t.text ? `<p>${esc(t.text)}</p>` : ""}${t.why ? `<button class="pl-link" data-why="${t.why}">${L("Dlaczego?", "Почему?")}</button>` : ""}</div><small>${dateStr(n.day)}</small></li>`; };
    function drawRight(force){
      const r = lastRep(), act = s.contracts.filter(c => c.status === "active");
      const sig = (r?.monthIndex ?? -1) + "|" + s.news.length + "|" + (s.news[s.news.length - 1]?.day ?? 0) + "|" + s.offers.map(o => o.id + ":" + o.rounds).join(",") + "|" + act.map(c => c.id + c.delivery.toFixed(2)).join(",") + "|" + JSON.stringify(r?.patch || {});
      if (!force && sig === sigRight) return; sigRight = sig;
      const hasPlan = r && Object.keys(r.patch).length;
      $("#plright").innerHTML = `<section class="pl-panel pl-advc" id="pladv"><div class="pl-advh">${avatar()}<div><h4>${L("Doradca ekonomiczny", "Экономический советник")}</h4><small>${r ? monthName(r.month, r.year) : ""}</small></div></div>
          <p>${esc(advisorBrief())}</p><div class="pl-two"><button class="pl-btn" data-ov="advisor">${L("Szczegóły", "Подробнее")}</button><button class="pl-btn go" data-apply="1" ${hasPlan ? "" : "disabled"}>${L("Zastosuj zalecenia", "Применить советы")}</button></div></section>
        <section class="pl-panel"><h5>${ic("news")}${L("Wiadomości", "Новости")}<button class="pl-more" data-ov="news">${L("Zobacz wszystkie", "Все")}</button></h5><ul class="pl-news">${s.news.slice().reverse().slice(0, 4).map(newsItem).join("")}</ul></section>
        <section class="pl-panel" id="plcon"><h5>${ic("doc")}${L("Aktywne kontrakty", "Активные контракты")}<button class="pl-more" data-ov="contracts">${L("Zobacz wszystkie", "Все")}</button></h5>
          ${s.offers.length ? `<button class="pl-offbar" data-ov="contracts">${ic("doc")}<span>${L("Nowe oferty", "Новые предложения")}: <b>${s.offers.length}</b></span><em>${L("Sprawdź", "Открыть")}</em></button>` : ""}
          ${act.length ? `<ul class="pl-cons">${act.slice(0, 4).map(c => `<li>${flag(c.partner, 26)}<div><b>${nm(D.partners[c.partner])}</b><small>${nm(D.markets[c.market])}</small></div><div class="pl-cv"><b>${n1(S.valueOf(c.market, c.volume, c.price))} ${L("mld/rok", "млрд/год")}</b><i class="pl-pbar"><b style="width:${Math.round(c.delivery * 100)}%"></b></i></div><em>${Math.round(c.delivery * 100)}%</em></li>`).join("")}</ul>` : `<p class="muted small">${L("Brak aktywnych kontraktów.", "Нет активных контрактов.")}</p>`}</section>`;
    }

    // ------------------------------------------------------------ nakładki: doradca (pełny), wiadomości, handel i kontrakty
    function patchLines(patch){
      const out = [], P = s.policy;
      const lab = { vat: "VAT", pit: "PIT", cit: "CIT", rate: L("Stopa procentowa", "Ставка"), social: L("Świadczenia", "Соцвыплаты"), health: L("Zdrowie", "Здравоохранение"), admin: L("Administracja", "Администрация") };
      for (const [k, v] of Object.entries(patch)){
        if (k === "programs") for (const [pk, pv] of Object.entries(v)) out.push(`${nm(D.programs[pk])}: ${n0(P.programs[pk])} → ${n0(pv)} ${UNIT}`);
        else if (k.startsWith("reserve.")) out.push(`${L("Rezerwa", "Резерв")} ${nm(D.markets[k.slice(8)])}: ×${n1(P.reserveTarget[k.slice(8)])} → ×${n1(v)}`);
        else out.push(`${lab[k] || k}: ${["vat", "pit", "cit", "rate"].includes(k) ? n2(P[k]) + "% → " + n2(v) + "%" : n0(P[k]) + " → " + n0(v) + " " + UNIT}`);
      }
      return out;
    }
    const ring = pct => `<svg class="pl-ring" viewBox="0 0 42 42"><circle r="16" cx="21" cy="21" fill="none" stroke="var(--pl-line)" stroke-width="4"/><circle r="16" cx="21" cy="21" fill="none" stroke="var(--pl-green)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(pct * 1.005).toFixed(1)} 200" transform="rotate(-90 21 21)"/></svg>`;
    function scen(arr, title, cls, icn){
      const Y0 = s.macro.Y * s.macro.priceLevel, vals = arr.map(x => x.Y), mn = Math.min(s.macro.Y, ...vals), mx = Math.max(s.macro.Y, ...vals), r = mx - mn || 1;
      const xs = [8, 70, 135, 200], ys = [s.macro.Y, ...vals].map(v => (40 - (v - mn) / r * 30).toFixed(1));
      const nom = (x, i) => (x.Y / s.macro.Y) * Y0 * Math.pow(1 + x.inflation / 100, [1, 3, 5][i]) / 1000;
      return `<div class="pl-scen ${cls}"><h6>${ic(icn)}${title}</h6><svg viewBox="0 0 208 46" preserveAspectRatio="none"><polyline points="${xs.map((x, i) => x + "," + ys[i]).join(" ")}"/>${xs.slice(1).map((x, i) => `<circle cx="${x}" cy="${ys[i + 1]}" r="2.6"/>`).join("")}</svg>
        <div class="pl-scg">${arr.map((x, i) => `<div><b>≈${nom(x, i).toFixed(2).replace(".", ",")} ${L("bln zł", "трлн")}</b><i>(${sgn(x.growth)}%)</i><small>${x.h} ${L("mies.", "мес.")}</small></div>`).join("")}</div>
        <table class="pl-tbl sm">${[[L("Inflacja", "Инфляция"), "inflation"], [L("Bezrobocie", "Безработица"), "unemployment"], [L("Dług/PKB", "Долг/ВВП"), "debtRatio"], [L("Import gazu", "Импорт газа"), "gasImportShare"]].map(([t, k]) => `<tr><td>${t}</td>${arr.map(x => `<td>${n1(x[k])}%</td>`).join("")}</tr>`).join("")}</table></div>`;
    }
    const GOAL_IC = { inflation: "target", growthAvg: "chart", debtRatio: "coins", gasImportShare: "flame" };
    const GOAL_T = { inflation: [L("Inflacja", "Инфляция"), "2–4%"], growthAvg: [L("Średni wzrost PKB", "Средний рост ВВП"), "≥ 3%"], debtRatio: [L("Dług publiczny", "Госдолг"), L("< 65% PKB", "< 65% ВВП")], gasImportShare: [L("Import gazu", "Импорт газа"), L("< 80% zużycia", "< 80% потребления")] };
    function advisorHtml(){
      const r = lastRep(); if (!r) return "";
      const pv = r.change.prev, nw = r.change.now, lines = patchLines(r.patch), c0 = r.confidence[0];
      return `<div class="pl-advhead">${avatar("big")}<div><h3>${L("Doradca ekonomiczny", "Экономический советник")}</h3><small>${L("Analiza · Prognozy · Rekomendacje", "Анализ · Прогнозы · Рекомендации")}</small>
          <p class="pl-bubble">${L("Dzień dobry, Panie Premierze. Poniżej najnowsze prognozy i zalecenia — decyzja należy do Pana.", "Добрый день, господин премьер. Ниже свежие прогнозы и рекомендации — решение за вами.")} ${esc(advisorBrief())}</p></div>
          <div class="pl-conf"><small>${monthName(r.month, r.year)}</small><div>${ring(c0.value)}<span><b>${c0.value}%</b><small>${L("Pewność prognozy", "Уверенность прогноза")}</small></span></div></div></div>
        <section class="pl-panel"><h5>${ic("calendar")}${L("Zmiany w ostatnim miesiącu", "Изменения за месяц")}</h5><div class="pl-chg">${[[L("Inflacja", "Инфляция"), pv.inflation, nw.inflation, "%"], [L("Bezrobocie", "Безработица"), pv.unemployment, nw.unemployment, "%"], [L("Dług/PKB", "Долг/ВВП"), pv.debtRatio, nw.debtRatio, "%"], [L("Gaz", "Газ"), pv.gas, nw.gas, " zł/MWh"]].map(([t, a, b, u]) => `<span><small>${t}</small>${u === "%" ? n1(a) : n0(a)} → <b>${u === "%" ? n1(b) : n0(b)}${u}</b></span>`).join("")}</div></section>
        <section class="pl-panel"><h5>${ic("target")}${L("Cele na najbliższe 3 lata", "Цели на ближайшие 3 года")}</h5><div class="pl-goals">${r.goals.map(g => `<div class="${g.ok ? "ok" : "no"}">${ic(GOAL_IC[g.metric] || "target")}<span><small>${GOAL_T[g.metric]?.[0] || nm(g)}</small><b>${GOAL_T[g.metric]?.[1] || ""}</b><i>${L("teraz", "сейчас")} ${n1(g.value)}% · ${g.ok ? L("w celu", "в цели") : L("poza celem", "вне цели")}</i></span></div>`).join("")}</div><p class="muted small">${L("Do końca okresu", "До конца периода")}: ${Math.max(0, r.goals[0]?.monthsLeft ?? 0)} ${L("mies.", "мес.")}</p></section>
        <section class="pl-panel"><h5>${ic("chart")}${L("Prognoza wzrostu PKB — porównanie scenariuszy", "Прогноз роста ВВП — сравнение сценариев")}</h5><div class="pl-scens">${scen(r.base, L("Przy obecnej polityce", "При текущей политике"), "", "clock")}${r.alt ? scen(r.alt, L("Po proponowanych zmianach", "После предложенных изменений"), "alt", "check") : `<div class="pl-scen alt"><h6>${ic("check")}${L("Po proponowanych zmianach", "После изменений")}</h6><p class="muted">${L("Doradca nie proponuje zmian.", "Советник не предлагает изменений.")}</p></div>`}</div>
          <p class="muted small">${L("Prognoza modelu gry bez losowych wydarzeń. Pewność", "Прогноз модели без случайных событий. Уверенность")}: ${r.confidence.map(c => `${c.h} ${L("mies.", "мес.")} ${c.value}%`).join(" · ")}${c0.reasons.length ? ` — ${L("niższa, bo", "ниже, потому что")}: ${c0.reasons.map(x => CONF_R[x]).join(", ")}` : ""}.</p></section>
        <section class="pl-panel"><h5>${ic("search")}${L("Kluczowe obserwacje", "Ключевые наблюдения")}</h5><ul class="pl-obs">${r.risks.length ? r.risks.map(x => `<li>${ic(RISK[x.topic]?.[2] || "alert")}<span>${RISK[x.topic]?.[0] || x.topic}</span><button class="pl-link" data-why="${RISK[x.topic]?.[1] || "gdp"}">${L("Dlaczego?", "Почему?")}</button></li>`).join("") : `<li>${ic("check")}<span>${L("Brak pilnych ryzyk — gospodarka w równowadze.", "Срочных рисков нет — экономика в равновесии.")}</span></li>`}</ul>
          ${lines.length ? `<div class="pl-plan"><b>${L("Plan doradcy", "План советника")}</b><ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul><button class="pl-btn go" data-apply="1">${ic("check")}${L("Zastosuj zalecenia", "Применить советы")}</button></div>` : ""}</section>`;
    }
    function offerHtml(o){
      const a = S.assessContract(s, o), imp = o.type === "import";
      const risk = a.partnerRisk > 0.3 ? L("wysokie", "высокий") : a.partnerRisk > 0.12 ? L("średnie", "средний") : L("niskie", "низкий");
      const qty = (k, v) => (v < 10 ? n1(v) : n0(v)) + " " + D.markets[k].unit;
      return `<div class="pl-offer"><div class="pl-oh">${flag(o.partner, 30)}<div><small>${L("Propozycja kontraktu", "Предложение контракта")} <em class="pl-new">${L("Nowa", "Новое")}</em></small><b>${imp ? L("Import", "Импорт") : L("Eksport", "Экспорт")}: ${nm(D.markets[o.market]).toLowerCase()} — ${nm(D.partners[o.partner])}</b></div><span class="muted small">${L("ważna", "действует")} ${Math.max(0, o.expires - s.dayIndex)} ${L("dni", "дн.")}</span></div>
        <div class="pl-og"><span><small>${L("Wolumen", "Объём")}</small>${qty(o.market, o.volume)}/${L("rok", "год")}</span><span><small>${L("Cena", "Цена")}</small>${priceStr(o.market, o.price)}</span><span><small>${L("Czas trwania", "Срок")}</small>${o.months} ${L("mies.", "мес.")}</span>
        <span><small>${L("Gwarantowany wolumen", "Гарантированный объём")}</small>${Math.round(o.guarantee * 100)}%</span><span><small>${L("Wartość roczna", "Годовая стоимость")}</small><b class="gold">${n1(a.valuePerYear)} ${L("mld zł", "млрд")}</b></span><span><small>${L("vs rynek", "vs рынок")}</small><b class="${a.vsMarket >= 0 ? "g" : "r"}">${sgn(a.vsMarket)} ${L("mld/rok", "млрд/год")}</b></span>
        <span><small>${L("Kara za zerwanie", "Штраф за разрыв")}</small>${n1(o.penalty * 12)} ${L("mld zł", "млрд")}</span><span><small>${L("Ryzyko partnera", "Риск партнёра")}</small>${risk}</span><span><small>${L("Wolna przepustowość", "Свободная пропускная")}</small>${qty(o.market, Math.max(0, a.capacityLeft))}</span></div>
        <p class="small muted">${imp ? L("Stała cena chroni przed skokami cen świata, ale wiąże, gdy ceny spadną.", "Фиксированная цена защищает от скачков, но связывает, если цены упадут.") : a.domesticEffect === "tight" ? L("Uwaga: mało wolnego towaru — kontrakt może zabrać podaż z rynku krajowego.", "Внимание: мало свободного товара — контракт может забрать предложение с внутреннего рынка.") : L("Stały odbiorca; towar na eksport nie trafi na rynek krajowy.", "Стабильный покупатель; товар на экспорт не попадёт на внутренний рынок.")}</p>
        <div class="pl-three"><button class="pl-btn go" data-acc="${o.id}">${L("Akceptuj", "Принять")}</button><button class="pl-btn" data-neg="${o.id}">${L("Negocjuj", "Торговаться")}</button><button class="pl-btn bad" data-rej="${o.id}">${L("Odrzuć", "Отклонить")}</button></div><div class="pl-negbox" id="plneg${o.id}"></div></div>`;
    }
    function contractsHtml(){
      const act = s.contracts.filter(c => c.status === "active"), rel = s.flags.playerReliability ?? 0.95;
      const rows = S.PK.map(pk => ({ pk, ...partnerTrade(pk) })).sort((a, b) => (b.imp + b.exp) - (a.imp + a.exp));
      return `<section class="pl-panel"><h5>${ic("globe")}${L("Główni partnerzy handlowi (szacunek, mld zł/rok)", "Главные торговые партнёры (оценка, млрд zł/год)")}</h5><div class="pl-tscroll"><table class="pl-tbl"><tr><th>${L("Kraj", "Страна")}</th><th>${L("Eksport", "Экспорт")}</th><th>${L("Import", "Импорт")}</th><th>${L("Bilans", "Баланс")}</th></tr>${rows.map(x => `<tr><td><span class="pl-cty">${flag(x.pk, 20)}${nm(D.partners[x.pk])}</span></td><td>${n0(x.exp)}</td><td>${n0(x.imp)}</td><td class="${x.exp - x.imp >= 0 ? "g" : "r"}">${sgn(x.exp - x.imp, n0)}</td></tr>`).join("")}
          <tr class="tot"><td>${L("Razem", "Итого")}</td><td>${n0(s.macro.X)}</td><td>${n0(s.macro.M)}</td><td class="${s.macro.X >= s.macro.M ? "g" : "r"}">${sgn(s.macro.X - s.macro.M, n0)}</td></tr></table></div><button class="pl-link" data-why="trade">${L("Dlaczego?", "Почему?")}</button></section>
        <section class="pl-panel"><h5>${ic("doc")}${L("Oferty", "Предложения")} (${s.offers.length})</h5>${s.offers.length ? s.offers.map(offerHtml).join("") : `<p class="muted">${L("Brak ofert. Nowe pojawiają się co miesiąc.", "Предложений нет. Новые появляются каждый месяц.")}</p>`}</section>
        <section class="pl-panel"><h5>${ic("check")}${L("Aktywne kontrakty", "Активные контракты")} (${act.length}) <span class="muted small">· ${L("wiarygodność Polski", "надёжность Польши")} ${Math.round(rel * 100)}%</span></h5>
        ${act.map(c => `<div class="pl-offer"><div class="pl-oh">${flag(c.partner, 26)}<div><b>${c.type === "import" ? L("Import", "Импорт") : L("Eksport", "Экспорт")}: ${nm(D.markets[c.market]).toLowerCase()}</b><small>${nm(D.partners[c.partner])} · ${L("zostało", "осталось")} ${Math.max(0, Math.ceil((c.end - s.dayIndex) / 30))} ${L("mies.", "мес.")}</small></div><span class="${c.delivery < c.guarantee ? "r" : "g"}">${Math.round(c.delivery * 100)}%</span></div>
          <i class="pl-pbar"><b style="width:${Math.round(c.delivery * 100)}%"></b></i><button class="pl-btn bad sm" data-cancel="${c.id}">${L("Zerwij", "Разорвать")}</button></div>`).join("") || `<p class="muted">${L("Brak.", "Нет.")}</p>`}</section>`;
    }
    const OV_T = { advisor: ["user", L("Doradca ekonomiczny", "Экономический советник")], news: ["news", L("Wiadomości", "Новости")], contracts: ["globe", L("Handel i kontrakty", "Торговля и контракты")] };
    function openOv(k){ ov = k; section = null; partnerSel = null; $("#pldrawer").hidden = true; drawNav(); drawOv(true); drawMap(); tutCheck(); }
    function closeOv(){ ov = null; drawOv(true); }
    function drawOv(force){
      const box = $("#plov");
      $$("#plmnav [data-m]").forEach(b => b.classList.toggle("on", b.dataset.m === ov));
      if (!ov){ box.hidden = true; ovBuilt = null; return; }
      const sig = ov + "|" + s.advisor.lastMonthlyReportIndex + "|" + s.news.length + "|" + s.offers.map(o => o.id + ":" + o.rounds).join(",") + "|" + s.contracts.map(c => c.status + c.delivery.toFixed(2)).join(",");
      if (!force && sig === sigOv) return; sigOv = sig;
      if (ovBuilt !== ov){
        box.hidden = false; ovBuilt = ov;
        box.innerHTML = `<div class="pl-ovin ${ov}"><header><h3>${ic(OV_T[ov][0])}${OV_T[ov][1]}</h3><button class="pl-ib" data-close="ov" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button></header>
          <div class="pl-ovb">${ov === "advisor" ? `<div class="pl-ovl" id="plrep"></div><div class="pl-ovr" id="plchat"></div>` : `<div class="pl-ovl" id="plrep"></div>`}</div></div>`;
        if (ov === "advisor") initChat();
      }
      if (document.activeElement?.closest?.("#plrep .pl-negbox")) return;
      const rep = $("#plrep"), sc = rep.scrollTop;
      rep.innerHTML = ov === "advisor" ? advisorHtml() : ov === "news" ? `<section class="pl-panel"><ul class="pl-news big">${s.news.slice().reverse().slice(0, 40).map(newsItem).join("")}</ul></section>` : contractsHtml();
      rep.scrollTop = sc;
    }
    function negForm(id){
      const o = s.offers.find(x => x.id === id), box = $("#plneg" + id); if (!o || !box) return;
      const better = o.type === "import" ? -1 : 1, step = o.price < 10 ? 0.01 : Math.max(1, Math.round(o.price * 0.01));
      box.innerHTML = `<label>${L("Twoja cena", "Ваша цена")} <input type="number" step="${step}" value="${+(o.price + better * step * 3).toFixed(3)}" id="plnp${id}"></label><label>${L("Ilość", "Объём")} <input type="number" step="0.1" value="${o.volume}" id="plnv${id}"></label><label>${L("Miesiące", "Месяцы")} <input type="number" step="1" value="${o.months}" id="plnm${id}"></label><button class="pl-btn go" id="plns${id}">${L("Wyślij propozycję", "Отправить")}</button><p class="small muted">${L("Partner może przyjąć, złożyć kontrofertę lub zerwać rozmowy (maks. 3 rundy). Lepsze relacje = więcej miejsca na ustępstwa.", "Партнёр может принять, предложить своё или прекратить переговоры (до 3 раундов). Лучше отношения — больше уступок.")}</p>`;
      $("#plns" + id).onclick = () => {
        const r = S.negotiate(s, id, { price: +$("#plnp" + id).value, volume: +$("#plnv" + id).value, months: Math.round(+$("#plnm" + id).value) });
        toast(r.result === "accepted" ? L("Partner przyjął Twoje warunki. Teraz możesz zaakceptować ofertę.", "Партнёр принял условия. Теперь можно принять предложение.") : r.result === "counter" ? L("Kontroferta partnera — sprawdź nowe warunki.", "Встречное предложение партнёра — проверьте условия.") : L("Partner zerwał rozmowy.", "Партнёр прекратил переговоры."));
        document.activeElement?.blur?.(); refresh(true);
      };
    }
    async function applyPlan(){
      const r = lastRep(), lines = patchLines(r.patch); if (!lines.length) return;
      if (await confirmBox(L("Zastosować plan doradcy?", "Применить план советника?"), `<ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul><p class="small muted">${L("Efekty pojawią się z opóźnieniem. Każdą zmianę możesz cofnąć w sekcjach.", "Эффекты проявятся с задержкой. Любое изменение можно отменить в разделах.")}</p>`, L("Zastosuj", "Применить"))){
        S.applyPolicyPatch(s, r.patch); toast(L("Plan zastosowany.", "План применён.")); refresh(true);
      }
    }

    // ------------------------------------------------------------ czat doradcy (kategorie + wolny tekst, bez API)
    const AREA_IC = { MACRO: "chart", BUDGET: "coins", ENERGY: "bolt", TRADE: "globe", INDUSTRY: "factory", AGRI: "wheat", BANKS: "bank", EDU: "cap", RD: "flask", INFRA: "anchor" };
    function initChat(){
      $("#plchat").innerHTML = `<section class="pl-panel"><h5>${ic("help")}${L("W czym mogę pomóc?", "Чем могу помочь?")}</h5><p class="muted small">${L("Wybierz kategorię lub wpisz własne pytanie.", "Выберите категорию или задайте свой вопрос.")}</p><div id="plcats" class="pl-cats"></div></section>
        <section class="pl-panel pl-chatp"><div id="plcrumb" class="pl-crumb"></div><div id="plchlog" class="pl-chlog">${chatHtml}</div><div id="plchips" class="pl-chips"></div>
        <form id="plask" class="pl-ask"><input id="plq" placeholder="${L("Zadaj własne pytanie…", "Задайте свой вопрос…")}" autocomplete="off"><button class="pl-btn go" aria-label="${L("Wyślij", "Отправить")}">${ic("send")}</button></form><p class="muted small">${L("Odpowiedzi oparte na danych aktualnej partii.", "Ответы основаны на данных текущей партии.")}</p></section>`;
      $("#plcats").innerHTML = Object.entries(A.TREE).map(([k, v]) => `<button data-cp="${k}">${ic(AREA_IC[k] || "chart")}<span>${esc(v[lang] || v.pl)}</span></button>`).join("");
      treeChips(chatPath);
      $("#plask").onsubmit = e => { e.preventDefault(); const q = $("#plq").value.trim(); if (!q) return; $("#plq").value = ""; ask(q); };
      const log = $("#plchlog"); log.scrollTop = log.scrollHeight;
    }
    function treeChips(path){
      chatPath = path; const box = $("#plchips"), cr = $("#plcrumb"); if (!box) return;
      $$("#plcats [data-cp]").forEach(b => b.classList.toggle("on", b.dataset.cp === path[0]));
      const names = [path[0] && (A.TREE[path[0]][lang] || A.TREE[path[0]].pl), path[1] && (A.TREE[path[0]].kids[path[1]][lang] || A.TREE[path[0]].kids[path[1]].pl)].filter(Boolean);
      cr.innerHTML = names.length ? `${ic(AREA_IC[path[0]] || "chart")}${names.map(esc).join(" <i>›</i> ")}` : "";
      let chips = [];
      if (path.length === 1) chips = Object.entries(A.TREE[path[0]].kids).map(([k, v]) => [[path[0], k].join("/"), v[lang] || v.pl]);
      else if (path.length === 2) chips = Object.entries(A.INTENTS).map(([k, v]) => [[...path, k].join("/"), v[li]]);
      box.innerHTML = (path.length ? `<button class="pl-chip back" data-cp="${path.slice(0, -1).join("/")}">${ic("back")}${L("Wróć", "Назад")}</button>` : "") + chips.map(([p, t]) => `<button class="pl-chip" data-cp="${p}">${esc(t)}</button>`).join("");
    }
    function chipPath(p){
      const path = p ? p.split("/") : [];
      if (path.length === 3){ ui.asked = true; answer(p, (A.TREE[path[0]].kids[path[1]][lang] || A.TREE[path[0]].kids[path[1]].pl) + " — " + A.INTENTS[path[2]][li]); treeChips(path.slice(0, 2)); tutCheck(); }
      else treeChips(path);
    }
    function logMsg(html, me){
      const log = $("#plchlog"); if (!log) return null;
      log.insertAdjacentHTML("beforeend", me ? `<div class="pl-msg me"><span>${html}</span></div>` : `<div class="pl-msg">${avatar("sm")}<div>${html}</div></div>`);
      while (log.children.length > 14) log.children[0].remove();
      log.scrollTop = log.scrollHeight; chatHtml = log.innerHTML; return log.lastElementChild;
    }
    function ask(q){
      ui.asked = true; logMsg(esc(q), true);
      const r = A.resolveAdvisorQuery(q, s, lang);
      if (r.answerId) answer(r.answerId);
      else logMsg(`${L("Nie jestem pewien, o co pytasz. Chodzi o:", "Не уверен, о чём вопрос. Вы имеете в виду:")}<div class="pl-chips">${r.suggestions.map(([id, t]) => `<button class="pl-chip" data-ans="${id}">${esc(t)}</button>`).join("")}</div>`);
      tutCheck();
    }
    function answer(id, label){
      if (label) logMsg(esc(label), true);
      const a = A.buildAdvisorAnswer(id, s, lang); if (!a){ logMsg(L("Brak danych.", "Нет данных.")); return; }
      const intent = id.split("/").pop();
      const fac = a.factors.slice(0, 4).map(f => `<li class="${f.rank}">${esc(f.label)}${f.txt ? ` — <span class="muted">${esc(f.txt)}</span>` : ""}</li>`).join("");
      logMsg(`<b>${esc(a.title)}</b><p>${esc(a.summary)}</p>${["WHY", "IMPACT"].includes(intent) && fac ? `<p class="small"><b>${L("Główne przyczyny", "Главные причины")}:</b></p><ul class="pl-fac">${fac}</ul>` : ""}
        ${a.chain?.length ? `<div class="pl-chain">${a.chain.map(c => `<span>${esc(c)}</span>`).join("<i>→</i>")}</div>` : ""}
        ${intent === "OPTIONS" || intent === "POLICY" ? `<ul class="pl-acts">${a.actions.map(([t, tg]) => `<li>${esc(t)}${targetSection(tg) ? ` <button class="pl-link" data-sec="${targetSection(tg)}">${L("Pokaż", "Показать")}</button>` : ""}</li>`).join("")}</ul>` : ""}
        ${a.note ? `<p class="small pl-note">${esc(a.note)}</p>` : ""}<p class="small muted">${esc(a.uncertainty)}</p>
        <div class="pl-chips"><button class="pl-chip" data-why="${a.key}">${ic("search")}${L("Pełne „Dlaczego?”", "Полное «Почему?»")}</button>${a.follow.map(([fid, t]) => `<button class="pl-chip" data-ans="${fid}">${esc(t)}</button>`).join("")}</div>`);
    }

    // ------------------------------------------------------------ „Dlaczego?” — przyczyny, łańcuch, działania (bez zmyślonych procentów)
    const RELATED = { gas: ["power", "inflation", "imports"], power: ["gas", "inflation"], inflation: ["gas", "grain", "gdp"], gdp: ["unemployment", "trade", "budget"], unemployment: ["gdp"], budget: ["debt", "gdp"], debt: ["budget"], trade: ["imports", "exports", "gas"], imports: ["gas", "trade"], exports: ["trade", "gdp"], grain: ["inflation", "imports"] };
    const WHY_TITLE = { gas: L("Gaz", "Газ"), power: L("Prąd", "Электроэнергия"), inflation: L("Inflacja", "Инфляция"), gdp: L("PKB", "ВВП"), unemployment: L("Bezrobocie", "Безработица"), budget: L("Budżet", "Бюджет"), debt: L("Dług", "Долг"), trade: L("Handel", "Торговля"), imports: L("Import", "Импорт"), exports: L("Eksport", "Экспорт"), grain: L("Zboże", "Зерно") };
    function openWhy(key){ why = key; ui.whyOpened = true; drawWhy(); tutCheck(); }
    function drawWhy(){
      const box = $("#plwhy"); if (!why){ box.hidden = true; return; }
      const E = A.explain(why, s, lang); if (!E){ box.hidden = true; return; }
      const keep = box.querySelector("details")?.open, scroll = box.querySelector(".pl-whyin")?.scrollTop || 0;
      const fv = f => f.unit === "" ? "" : `<small>${n1(f.v)} ${esc(f.unit)}</small>`;
      const row = (f, main) => `<li class="${main ? "main" : ""}"><span class="dir ${f.dir > 0 ? "up" : f.dir < 0 ? "down" : ""}">${f.dir > 0 ? "▲" : f.dir < 0 ? "▼" : "•"}</span><div><b>${esc(f.label)}</b> ${fv(f)}${f.txt ? `<p>${esc(f.txt)}</p>` : ""}</div></li>`;
      box.hidden = false;
      box.innerHTML = `<div class="pl-whyin" role="dialog" aria-label="${L("Dlaczego?", "Почему?")}"><button class="pl-ib pl-x" data-close="why" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button>
        <h3>${ic("search")}${esc(E.title)}: <b>${esc(E.value)}</b></h3><p class="muted">${L("Zmiana w ostatnich 6 mies.", "Изменение за 6 мес.")}: <b>${sgn(E.change)}${E.unit ? " " + E.unit : "%"}</b></p>
        ${E.structure ? `<div class="pl-strbar">${E.structure.slice(0, 8).map(x => `<div><span>${esc(x.name)}</span><i style="width:${clamp(x.share, 0, 100).toFixed(0)}%"></i><b>${n0(x.value)} (${n0(x.share)}%)</b></div>`).join("")}</div>` : ""}
        ${E.main.length ? `<h4>${E.exact ? L("Największy składnik (wprost z modelu)", "Крупнейшая составляющая (прямо из модели)") : L("Główna przyczyna", "Главная причина")}</h4><ul class="pl-causes">${E.main.map(f => row(f, true)).join("")}</ul>` : ""}
        ${E.extra.length ? `<h4>${L("Dodatkowe czynniki", "Дополнительные факторы")}</h4><ul class="pl-causes">${E.extra.map(f => row(f)).join("")}</ul>` : ""}
        ${E.events?.length ? `<p class="pl-evp">${ic("alert")}${L("Wydarzenia", "События")}: ${E.events.map(esc).join(", ")}</p>` : ""}
        <h4>${L("Łańcuch przyczyn", "Цепочка причин")}</h4><div class="pl-chain">${E.chain.map(c => `<span>${esc(c)}</span>`).join("<i>→</i>")}</div>
        ${E.note ? `<p class="pl-note">${esc(E.note)}</p>` : ""}
        ${E.actions?.length ? `<h4>${L("Co możesz zrobić", "Что можно сделать")}</h4><ul class="pl-acts">${E.actions.map(([t, tg]) => `<li>${esc(t)}${targetSection(tg) ? ` <button class="pl-link" data-sec="${targetSection(tg)}">${L("Pokaż", "Показать")}</button>` : ""}</li>`).join("")}</ul>` : ""}
        <details${keep ? " open" : ""}><summary>${L("Więcej: decyzje, programy w toku, niepewność", "Подробнее: решения, программы, неопределённость")}</summary>
          ${E.decisions?.length ? `<p><b>${L("Twoje ostatnie decyzje", "Ваши последние решения")}:</b> ${E.decisions.map(d => `${dateStr(d.day)} · ${esc(String(d.k))}`).join("; ")}</p>` : ""}
          ${E.delayed?.length ? `<p><b>${L("Programy w toku (efekt z opóźnieniem)", "Программы в работе (эффект с задержкой)")}:</b> ${E.delayed.map(x => `${esc(x.name)} ×${n2(x.eff)}`).join(", ")}</p>` : ""}
          <p class="muted">${esc(E.uncertainty)}</p></details>
        <div class="pl-chips"><small>${L("Powiązane", "Связанное")}:</small>${(RELATED[why] || []).map(k => `<button class="pl-chip" data-why="${k}">${WHY_TITLE[k]}</button>`).join("")}</div></div>`;
      box.querySelector(".pl-whyin").scrollTop = scroll;
    }

    // ------------------------------------------------------------ szuflada sekcji (suwaki → projekt zmian → podgląd → zatwierdź)
    const POLICY_LAB = { vat: ["VAT", "%", 0.5], pit: ["PIT", "%", 0.5], cit: ["CIT", "%", 0.5], rate: [L("Stopa procentowa (NBP)", "Ставка (NBP)"), "%", 0.25], social: [L("Świadczenia społeczne", "Соцвыплаты"), UNIT, 5], health: [L("Ochrona zdrowia", "Здравоохранение"), UNIT, 5], admin: [L("Administracja i inne", "Администрация и прочее"), UNIT, 5] };
    const LIM = { vat: [15, 27], pit: [8, 25], cit: [9, 30], rate: [0.25, 12], social: [600, 900], health: [180, 320], admin: [240, 360] };
    const curVal = key => key.startsWith("programs.") ? s.policy.programs[key.slice(9)] : key.startsWith("reserve.") ? s.policy.reserveTarget[key.slice(8)] : s.policy[key];
    const draftVal = key => key.startsWith("programs.") ? draft.programs?.[key.slice(9)] : draft[key];
    const setDraft = (key, v) => { if (key.startsWith("programs.")){ draft.programs = { ...(draft.programs || {}), [key.slice(9)]: v }; if (v === curVal(key)) delete draft.programs[key.slice(9)]; if (!Object.keys(draft.programs).length) delete draft.programs; } else { draft[key] = v; if (v === curVal(key)) delete draft[key]; } };
    const fmtSl = (key, v) => key.startsWith("reserve.") ? "×" + n1(v) : POLICY_LAB[key]?.[1] === "%" ? n2(v) + "%" : n0(v) + " " + UNIT;
    function slider(key){
      let lab, step, min, max, extra = "";
      if (key.startsWith("programs.")){ const P = D.programs[key.slice(9)], eff = s.programs[key.slice(9)].eff;
        lab = nm(P); step = P.max > 100 ? 5 : 1; min = 0; max = P.max;
        extra = `<p class="small">${esc(P.effect[li])}</p><p class="small muted">${ic("clock")}${L("Efekt od", "Эффект с")} ${P.lagStart} ${L("do", "до")} ${P.lagFull} ${L("mies. · obecny efekt", "мес. · текущий эффект")} <b>×${n2(eff)}</b>${P.maintenance ? ` · ${L("utrzymanie min.", "минимум на содержание")} ${P.maintenance}` : ""} · ${L("start", "старт")} ${P.base}</p><i class="pl-pbar"><b style="width:${clamp(eff / 2 * 100, 0, 100).toFixed(0)}%"></b></i>`; }
      else if (key.startsWith("reserve.")){ lab = L("Rezerwa", "Резерв") + ": " + nm(D.markets[key.slice(8)]); step = 0.1; min = 0.3; max = 2.5; extra = `<p class="small muted">${L("Większa rezerwa = bufor na zakłócenia, ale zakup na zapas kosztuje teraz.", "Больше резерв — буфер от сбоев, но закупка в запас стоит денег сейчас.")}</p>`; }
      else { [lab, , step] = POLICY_LAB[key]; [min, max] = LIM[key]; }
      const cur = curVal(key), v = draftVal(key) ?? cur, ch = Math.abs(v - cur) > 1e-9;
      return `<div class="pl-sl${ch ? " ch" : ""}"><label><span>${esc(lab)}</span><b data-out="${key}">${fmtSl(key, v)}</b></label><input type="range" min="${min}" max="${max}" step="${step}" value="${v}" data-sl="${key}" aria-label="${esc(lab)}"><small class="muted">${L("teraz", "сейчас")}: ${fmtSl(key, cur)}</small>${extra}</div>`;
    }
    const draftBox = () => `<div class="pl-draft" id="pldraft"></div>`;
    function drawDraft(){
      const box = $("#pldraft"); if (!box) return;
      if (!Object.keys(draft).length){ box.innerHTML = `<p class="small muted">${L("Przesuń suwak — zobaczysz skutki na 12 miesięcy, zanim zatwierdzisz.", "Двигайте ползунок — увидите последствия на 12 месяцев до подтверждения.")}</p>`; return; }
      const B = S.project(s, 12)[11], X = S.project(s, 12, draft)[11];
      const g = r => (r.Y / s.macro.Y - 1) * 100;
      const rows = [[L("Wzrost PKB (12 mies.)", "Рост ВВП (12 мес.)"), g(B), g(X), "%"], [L("Inflacja", "Инфляция"), B.inflation, X.inflation, "%"], [L("Bezrobocie", "Безработица"), B.unemployment, X.unemployment, "%"], [L("Saldo budżetu", "Сальдо бюджета"), B.balance, X.balance, " " + L("mld", "млрд")], [L("Dług/PKB", "Долг/ВВП"), B.debtRatio, X.debtRatio, "%"]];
      box.innerHTML = `<h4>${L("Podgląd skutków (12 mies., bez losowych wydarzeń)", "Предпросмотр (12 мес., без случайных событий)")}</h4><table class="pl-tbl"><tr><th></th><th>${L("bez zmian", "без изменений")}</th><th>${L("z decyzją", "с решением")}</th></tr>${rows.map(([t, x, y, u]) => `<tr><td>${t}</td><td>${n1(x)}${u}</td><td><b>${n1(y)}${u}</b> <small class="muted">(${sgn(y - x)})</small></td></tr>`).join("")}</table>
        <p class="small muted">${L("Programy inwestycyjne działają z opóźnieniem — w 12 miesięcy widać głównie koszt.", "Инвестпрограммы работают с задержкой — за 12 месяцев виден в основном расход.")}</p>
        <div class="pl-two"><button class="pl-btn go" id="plcommit">${ic("check")}${L("Zatwierdź zmiany", "Утвердить")}</button><button class="pl-btn" id="plundo">${L("Anuluj", "Отмена")}</button></div>`;
      $("#plcommit").onclick = () => { S.applyPolicyPatch(s, draft); draft = {}; toast(L("Decyzja wchodzi w życie (z opóźnieniem).", "Решение вступает в силу (с задержкой).")); drawSection(); refresh(true); tutCheck(); };
      $("#plundo").onclick = () => { draft = {}; drawSection(); };
    }
    let draftT = 0;
    function wireSliders(box){
      $$("[data-sl]", box).forEach(inp => inp.oninput = () => { const k = inp.dataset.sl, v = +inp.value; setDraft(k, v);
        const o = $(`[data-out="${k}"]`, box); if (o) o.textContent = fmtSl(k, v);
        inp.closest(".pl-sl").classList.add("ch"); clearTimeout(draftT); draftT = setTimeout(drawDraft, 220); });
    }
    const kv = (t, v, cls = "") => `<div class="pl-kv ${cls}"><small>${t}</small><b>${v}</b></div>`;
    const whyBtn = (k, t) => `<button class="pl-link" data-why="${k}">${t || L("Dlaczego?", "Почему?")}</button>`;
    function marketsTable(){
      return `<div class="pl-tscroll"><table class="pl-tbl sm"><tr><th>${L("Rynek", "Рынок")}</th><th>${L("Cena", "Цена")}</th><th>${L("Prod.", "Пр-во")}</th><th>${L("Popyt", "Спрос")}</th><th>Imp</th><th>Exp</th><th>${L("Zapas / niedobór", "Запас / дефицит")}</th></tr>${S.MK.map(k => { const q = s.markets[k], B = D.markets[k];
        return `<tr><td>${nm(B)}<small> ${B.unit}</small></td><td>${B.price < 10 ? n2(q.price) : n0(q.price)}</td><td>${n0(q.prod)}</td><td>${n0(q.demand)}</td><td title="${L("limit", "лимит")} ${n0(q.impCap)}">${n0(q.imp)}<i class="pl-cap"><b style="width:${clamp(q.imp / Math.max(1, q.impCap) * 100, 0, 100).toFixed(0)}%"></b></i></td><td>${n0(q.exp)}<i class="pl-cap"><b style="width:${clamp(q.exp / Math.max(1, q.expCap) * 100, 0, 100).toFixed(0)}%"></b></i></td><td>${q.shortage > 0.005 ? `<b class="r">−${n1(q.shortage * 100)}%</b>` : B.storable ? n0(q.stock / Math.max(1e-6, q.demand) * 360) + " " + L("dni", "дн.") : "—"}</td></tr>`; }).join("")}</table></div>
        <p class="small muted">${L("Pasek pod importem/eksportem = wykorzystanie przepustowości tras. Ilości na rok.", "Полоска = загрузка маршрутов. Объёмы в год.")}</p>`;
    }
    function sectionHtml(k){
      const m = s.macro, mk = s.markets, title = SECTIONS.find(x => x[0] === k);
      let h = `<header><h3>${ic(title[1])}${title[2]}</h3><button class="pl-ib" data-close="drawer" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button></header>`;
      if (k === "gosp"){
        h += `<div class="pl-kvs">${kv(L("PKB nominalny", "Номинальный ВВП"), n0(m.Y * m.priceLevel) + " " + L("mld", "млрд"))}${kv(L("Wzrost r/r", "Рост г/г"), sgn(m.growthYoY) + "%")}${kv(L("Luka PKB", "Разрыв ВВП"), sgn(m.gap) + "%")}${kv(L("Inflacja", "Инфляция"), n1(m.inflation) + "%")}${kv(L("Bezrobocie", "Безработица"), n1(m.unemployment) + "%")}${kv(L("Nastroje", "Настроения"), n0(m.conf * 100))}</div>
          <h4>${L("Inflacja — z czego się składa", "Инфляция — из чего состоит")} ${whyBtn("inflation")}</h4><div class="pl-kvs">${kv(L("Oczekiwania", "Ожидания"), sgn(m.pi.expect) + PP)}${kv(L("Popyt", "Спрос"), sgn(m.pi.demand) + PP)}${kv(L("Energia", "Энергия"), sgn(m.pi.energy) + PP)}${kv(L("Żywność", "Еда"), sgn(m.pi.food) + PP)}</div>
          <h4>${L("Popyt: C + I + G + NX", "Спрос: C + I + G + NX")} ${whyBtn("gdp")}</h4><div class="pl-kvs">${kv(L("Konsumpcja", "Потребление"), n0(m.C))}${kv(L("Inwestycje", "Инвестиции"), n0(m.I))}${kv(L("Państwo", "Государство"), n0(m.G))}${kv(L("Eksport netto", "Чистый экспорт"), sgn(m.NX, n0))}</div>
          <p class="small muted">${L("Realnie, w cenach startowych, mld zł/rok. Dane gry — przybliżone.", "В реальном выражении, млрд zł/год. Игровые данные — приблизительно.")}</p>`;
      } else if (k === "budzet"){
        const RL = { vat: "VAT", pit: "PIT", cit: "CIT", excise: L("Akcyza", "Акциз"), contributions: L("Składki", "Взносы"), other: L("Inne", "Прочие"), tariffs: L("Cła", "Пошлины"), social: L("Świadczenia i zasiłki", "Соцвыплаты"), health: L("Zdrowie", "Здравоохранение"), admin: L("Administracja", "Администрация"), programs: L("Programy inwestycyjne", "Инвестпрограммы"), innovations: L("Innowacje", "Инновации"), interest: L("Odsetki od długu", "Проценты по долгу"), penalties: L("Kary umowne", "Штрафы") };
        h += `<div class="pl-kvs">${kv(L("Dochody", "Доходы"), n0(m.revenue))}${kv(L("Wydatki", "Расходы"), n0(m.spending))}${kv(L("Saldo", "Сальдо"), sgn(m.balance, n0), m.balance < 0 ? "r" : "g")}${kv(L("Dług/PKB", "Долг/ВВП"), n1(m.debtRatio) + "%")}${kv(L("Odsetki", "Проценты"), n0(m.spend.interest))}</div>
          <p class="small pl-note">${L("Saldo handlowe nie jest częścią budżetu. Import nie zwiększa długu publicznego wprost.", "Торговое сальдо не входит в бюджет. Импорт не увеличивает госдолг напрямую.")} ${whyBtn("budget")}</p>
          <h4>${L("Podatki", "Налоги")}</h4>${["vat", "pit", "cit"].map(slider).join("")}<h4>${L("Wydatki", "Расходы")}</h4>${["social", "health", "admin"].map(slider).join("")}${draftBox()}
          <details><summary>${L("Struktura dochodów i wydatków (mld zł/rok)", "Структура доходов и расходов (млрд zł/год)")}</summary><table class="pl-tbl sm"><tr><th colspan="2">${L("Dochody", "Доходы")}</th></tr>${Object.entries(m.rev).map(([a, v]) => `<tr><td>${RL[a] || a}</td><td>${n0(v)}</td></tr>`).join("")}<tr><th colspan="2">${L("Wydatki", "Расходы")}</th></tr>${Object.entries(m.spend).map(([a, v]) => `<tr><td>${RL[a] || a}</td><td>${n0(v)}</td></tr>`).join("")}</table></details>`;
      } else if (k === "sektory"){
        h += `<div class="pl-tscroll"><table class="pl-tbl sm"><tr><th>${L("Sektor", "Сектор")}</th><th>${L("Produkcja", "Выпуск")}</th><th>${L("Wykorzyst.", "Загрузка")}</th><th>${L("Konkurenc.", "Конкур.")}</th><th>${L("Energochł.", "Энергоёмк.")}</th></tr>${S.SEC.filter(x => D.sectors[x].share > 0).map(x => { const z = s.sectors[x]; return `<tr><td>${nm(D.sectors[x])}</td><td>${n2(z.output)}</td><td>${n0(z.utilization * 100)}%</td><td>${n2(z.competitiveness)}</td><td>${n2(z.energyInt)}</td></tr>`; }).join("")}</table></div>
          <p class="small muted">${L("Indeksy: 1,00 = start gry.", "Индексы: 1,00 = старт игры.")} ${whyBtn("exports")}</p><h4>${L("Programy", "Программы")}</h4>${["programs.przemysl", "programs.rolnictwo"].map(slider).join("")}${draftBox()}`;
      } else if (k === "handel"){
        h += `<div class="pl-kvs">${kv(L("Eksport", "Экспорт"), n0(m.X))}${kv(L("Import", "Импорт"), n0(m.M))}${kv(L("Saldo", "Сальдо"), sgn(m.X - m.M, n0))}${kv(L("Fracht", "Фрахт"), "×" + n2(m.freight))}</div>
          <p class="small pl-note">${L("Deficyt handlowy nie jest automatycznie zły — liczy się, co importujemy (maszyny vs. droga energia) i jak to finansujemy. To nie jest budżet państwa.", "Торговый дефицит не обязательно плох — важно, что импортируем (машины vs. дорогая энергия) и как финансируем. Это не госбюджет.")} ${whyBtn("trade")}</p>
          <button class="pl-btn" data-ov="contracts">${ic("doc")}${L("Partnerzy, oferty i kontrakty", "Партнёры, предложения и контракты")}</button>
          ${marketsTable()}<h4>${L("Rezerwy strategiczne", "Стратегические резервы")}</h4>${["reserve.zboze", "reserve.gaz", "reserve.paliwa"].map(slider).join("")}<h4>${L("Infrastruktura", "Инфраструктура")}</h4>${slider("programs.logistyka")}${draftBox()}`;
      } else if (k === "energia"){
        h += `<div class="pl-kvs">${kv(L("Gaz", "Газ"), n0(mk.gaz.price) + " zł/MWh")}${kv(L("Świat", "Мир"), n0(mk.gaz.world))}${kv(L("Import gazu", "Импорт газа"), n0(m.gasImportShare) + "%")}${kv(L("Prąd", "Электроэнергия"), n0(mk.prad.price) + " zł/MWh")}${kv(L("Produkcja prądu", "Выработка"), n0(mk.prad.prod) + " TWh")}${kv(L("Zapas gazu", "Запас газа"), n0(mk.gaz.stock / Math.max(1, mk.gaz.demand) * 360) + " " + L("dni", "дн."))}</div>
          <p>${whyBtn("gas", L("Dlaczego gaz?", "Почему газ?"))} · ${whyBtn("power", L("Dlaczego prąd?", "Почему электроэнергия?"))}</p><h4>${L("Programy energetyczne", "Энергопрограммы")}</h4>${["programs.siec", "programs.magazyny", "programs.oze", "programs.efektywnosc"].map(slider).join("")}${draftBox()}`;
      } else if (k === "nauka"){
        const found = s.innovations.found.filter(id => !s.innovations.active.some(x => x.id === id) && !s.innovations.done.some(x => x.id === id));
        h += `<div class="pl-kvs">${kv(L("Szansa na odkrycie / mies.", "Шанс открытия / мес."), n1(S.innovationChance(s) * 100) + "%")}${kv(L("Wydajność (indeks)", "Производительность"), n2(m.prod))}</div>${["programs.edukacja", "programs.badania"].map(slider).join("")}${draftBox()}
          <h4>${ic("bulb")}${L("Innowacje", "Инновации")}</h4>${found.map(id => { const I = D.innovations.find(x => x.id === id); return `<div class="pl-offer"><b>${nm(I)}</b><p class="small">${L("Koszt", "Стоимость")} ${I.cost} ${L("mld zł", "млрд zł")} · ${I.months} ${L("mies.", "мес.")}</p><button class="pl-btn go" data-inn="${id}">${L("Wdróż", "Внедрить")}</button></div>`; }).join("")}
          ${s.innovations.active.map(x => `<p class="small">${ic("clock")}${nm(D.innovations.find(i => i.id === x.id))}: ${Math.round(x.t / (x.months * 30) * 100)}%</p>`).join("")}${s.innovations.done.map(x => `<p class="small">${ic("check")}${nm(D.innovations.find(i => i.id === x.id))}</p>`).join("")}
          ${!found.length && !s.innovations.active.length && !s.innovations.done.length ? `<p class="muted small">${L("Jeszcze brak odkryć. Więcej R&D i edukacji = większa szansa (z opóźnieniem).", "Открытий пока нет. Больше R&D и образования — выше шанс (с задержкой).")}</p>` : ""}`;
      } else if (k === "banki"){
        h += `<div class="pl-kvs">${kv(L("Stopa efektywna", "Эффективная ставка"), n2(m.rateEff) + "%")}${kv(L("Stopa realna", "Реальная ставка"), sgn(m.realRate) + "%")}${kv(L("Kredyt (indeks)", "Кредит (индекс)"), n2(m.credit))}${kv(L("Stres banków", "Стресс банков"), n0(m.bankStress * 100) + "%")}</div>
          ${slider("rate")}<p class="small muted">${L("W grze sam ustalasz stopę (w rzeczywistości robi to niezależna RPP). Wyższa stopa: niższa inflacja i popyt, droższy kredyt — działa po kilku miesiącach.", "В игре ставку задаёте вы (в реальности — независимый RPP). Выше ставка: ниже инфляция и спрос, дороже кредит — действует через несколько месяцев.")}</p>${draftBox()}`;
      } else if (k === "dane"){
        const M = s.monthly.slice(-60), ser = (t, key, f, c) => `<div class="pl-dchart"><small>${t}</small>${spark(M.map(x => x[key]), c, 300, 60)}<b>${f(M.length ? M[M.length - 1][key] : 0)}</b></div>`;
        h += `<p class="small pl-note">${esc(D.dataNote)}</p>${M.length < 2 ? `<p class="muted">${L("Wykresy pojawią się po 2 miesiącach gry.", "Графики появятся через 2 месяца игры.")}</p>` : ""}
          ${ser(L("PKB realny", "Реальный ВВП"), "Y", n0, "var(--pl-green)")}${ser(L("Inflacja %", "Инфляция %"), "inflation", n1, "var(--pl-red)")}${ser(L("Bezrobocie %", "Безработица %"), "unemployment", n1, "var(--pl-blue)")}${ser(L("Dług/PKB %", "Долг/ВВП %"), "debtRatio", n1, "var(--pl-gold)")}${ser(L("Saldo handlu", "Торговое сальдо"), "tradeBalance", n0, "var(--pl-violet)")}${ser(L("Gaz zł/MWh", "Газ zł/MWh"), "gas", n0, "var(--pl-red)")}
          <h4>${L("Twoje decyzje", "Ваши решения")}</h4><ul class="small">${s.decisions.slice(-15).reverse().map(d => `<li>${dateStr(d.day)} · ${esc(String(d.k))}: ${d.from != null ? esc(String(+(+d.from).toFixed(2))) + " → " : ""}${esc(String(typeof d.v === "number" ? +d.v.toFixed(2) : d.v))}</li>`).join("") || `<li class="muted">${L("Brak.", "Нет.")}</li>`}</ul>`;
      } else if (k === "ust"){
        h += `<div class="pl-oact col"><button class="pl-btn" id="plsave">${ic("save")}${L("Zapisz grę", "Сохранить")}</button><button class="pl-btn" id="plload">${ic("folder")}${L("Wczytaj zapis", "Загрузить")}</button><button class="pl-btn" id="plnew">${ic("plus")}${L("Nowa gra", "Новая игра")}</button><button class="pl-btn" id="pltutr">${ic("cap")}${L("Samouczek od nowa", "Обучение заново")}</button></div>
          <p class="small muted">${L("Gra zapisuje się automatycznie co miesiąc (w tej przeglądarce).", "Игра сохраняется автоматически каждый месяц (в этом браузере).")} Seed: ${s.seed}</p><p class="small pl-note">${esc(D.dataNote)} ${L("Bez wojen, armii i budżetu obrony — z założenia gry.", "Без войн, армии и оборонного бюджета — по замыслу игры.")}</p>`;
      }
      return h;
    }
    const drawNav = () => $$("#plnav [data-nav]").forEach(b => b.classList.toggle("on", b.dataset.nav === section));
    function drawSection(){
      const box = $("#pldrawer"); drawNav();
      if (!section){ if (!partnerSel) box.hidden = true; return; }
      partnerSel = null;
      const sc = box.scrollTop; box.hidden = false; box.innerHTML = sectionHtml(section); box.scrollTop = sc;
      wireSliders(box); drawDraft();
      const on = (id, f) => { const b = $("#" + id, box); if (b) b.onclick = f; };
      on("plsave", () => { save(); toast(L("Zapisano.", "Сохранено.")); });
      on("plload", () => { const r = S.deserialize(localStorage.getItem(LS_SAVE) || ""); if (!r.ok){ toast(L("Brak poprawnego zapisu.", "Нет корректного сохранения.")); return; } s = r.state; draft = {}; lastMonth = S.date(s.dayIndex).monthIndex; toast(L("Wczytano zapis.", "Сохранение загружено.")); refresh(true); drawSection(); });
      on("plnew", async () => { if (await confirmBox(L("Nowa gra?", "Новая игра?"), `<p>${L("Obecna gra zostanie zastąpiona.", "Текущая игра будет заменена.")}</p>`, L("Zacznij od nowa", "Начать заново"))){ s = S.newGame((Date.now() % 1e9) >>> 0); draft = {}; why = null; lastMonth = 0; chatHtml = ""; save(); setSpeed(0); refresh(true); drawSection(); drawWhy(); } });
      on("pltutr", () => { tut = { done: false, step: 0 }; saveTut(); section = null; drawSection(); drawTut(); });
    }
    function openSection(k){ if (section !== k) draft = {}; section = k; ov = null; drawOv(true); host.classList.remove("navopen"); drawSection(); drawMap(); tutCheck(); }
    function openPartner(pk){
      partnerSel = pk; ui.partnerOpened = pk; section = null; draft = {}; ov = null; drawOv(true); drawNav();
      const P = D.partners[pk], sp = s.partners[pk], tr = partnerTrade(pk), ev = s.events.filter(e => D.events[e.k].partner === pk);
      const box = $("#pldrawer"); box.hidden = false;
      const PH = { signal: L("sygnał", "сигнал"), stress: L("narastanie", "нарастание"), peak: L("szczyt", "пик"), recovery: L("odbudowa", "восстановление") };
      box.innerHTML = `<header><h3>${flag(pk, 30)}${esc(nm(P))}</h3><button class="pl-ib" data-close="drawer" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button></header>
        <div class="pl-kvs">${kv(L("Relacje", "Отношения"), n0(sp.relationship * 100) + "/100")}${kv(L("Niezawodność dostaw", "Надёжность поставок"), n0(sp.reliability * 100) + "%")}${kv(L("Trasy", "Маршруты"), n0(sp.route * 100) + "%")}${kv(L("Popyt partnera", "Спрос партнёра"), n0(sp.demand * 100) + "%")}${kv(L("Import stąd", "Импорт отсюда"), "≈" + n0(tr.imp))}${kv(L("Eksport tam", "Экспорт туда"), "≈" + n0(tr.exp))}</div>
        ${P.restricted ? `<p class="pl-note small">${L("Handel ograniczony sankcjami i barierami (wysokie „tarcie”).", "Торговля ограничена санкциями и барьерами.")}</p>` : P.eu ? `<p class="small muted">${L("Jednolity rynek UE — bez ceł.", "Единый рынок ЕС — без пошлин.")}</p>` : P.dcfta ? `<p class="small muted">${L("Umowa o wolnym handlu z UE (DCFTA), niewielkie bariery.", "Соглашение о свободной торговле с ЕС (DCFTA), небольшие барьеры.")}</p>` : ""}
        ${ev.map(e => `<p class="pl-evp">${ic("alert")}<b>${nm(D.events[e.k])}</b> — ${PH[S.phase(e)]} (${Math.round(e.t / e.len * 100)}%)</p>`).join("")}
        <h4>${L("Co płynie (mld zł/rok, szacunek)", "Что идёт (млрд zł/год, оценка)")}</h4><table class="pl-tbl sm"><tr><th></th><th>${L("import", "импорт")}</th><th>${L("eksport", "экспорт")}</th><th>${L("dostawy", "поставки")}</th></tr>${tr.byM.map(x => `<tr><td>${nm(D.markets[x.k])}</td><td>${n0(x.imp)}</td><td>${n0(x.exp)}</td><td class="${(sp.supply[x.k] ?? 1) < 0.9 ? "r" : ""}">${n0((sp.supply[x.k] ?? 1) * 100)}%</td></tr>`).join("")}</table>
        <h4>${L("Kontrakty", "Контракты")}</h4>${s.contracts.filter(c => c.partner === pk && c.status === "active").map(c => `<p class="small">${ic(c.type === "import" ? "down" : "up")}${nm(D.markets[c.market])} · ${Math.round(c.delivery * 100)}%</p>`).join("") || `<p class="small muted">${L("Brak aktywnych.", "Нет активных.")}</p>`}
        ${s.offers.some(o => o.partner === pk) ? `<button class="pl-btn go" data-ov="contracts">${ic("doc")}${L("Zobacz ofertę", "Смотреть предложение")}</button>` : ""}`;
      drawMap(); tutCheck();
    }

    // ------------------------------------------------------------ jeden słuchacz kliknięć (delegacja)
    host.addEventListener("click", async e => {
      const t = e.target.closest("button,[data-why]"); if (!t || !host.contains(t) || t.disabled) return;
      const d = t.dataset;
      if (d.sp != null) setSpeed(+d.sp);
      else if (d.nav){ if (section === d.nav){ section = null; draft = {}; drawSection(); } else openSection(d.nav); }
      else if (d.close === "drawer"){ section = null; partnerSel = null; draft = {}; drawSection(); $("#pldrawer").hidden = true; drawMap(); }
      else if (d.close === "why"){ why = null; drawWhy(); }
      else if (d.close === "ov") closeOv();
      else if (d.why) openWhy(d.why);
      else if (d.sec){ why = null; drawWhy(); openSection(d.sec); }
      else if (d.ov) openOv(d.ov);
      else if (d.ans) answer(d.ans, t.textContent);
      else if (d.cp != null) chipPath(d.cp);
      else if (d.apply) applyPlan();
      else if (d.acc){ S.acceptOffer(s, +d.acc); toast(L("Kontrakt podpisany.", "Контракт подписан.")); refresh(true); }
      else if (d.rej){ S.rejectOffer(s, +d.rej); refresh(true); }
      else if (d.neg) negForm(+d.neg);
      else if (d.inn){ S.implementInnovation(s, d.inn); toast(L("Wdrażanie rozpoczęte.", "Внедрение начато.")); drawSection(); }
      else if (d.cancel){ const c = s.contracts.find(x => x.id === +d.cancel);
        if (c && await confirmBox(L("Zerwać kontrakt?", "Разорвать контракт?"), `<p>${L("Kara", "Штраф")}: <b>${n1(c.penalty * 12)} ${L("mld zł", "млрд zł")}</b>. ${L("Spadnie zaufanie partnera i wiarygodność Polski — przyszłe oferty będą gorsze.", "Упадёт доверие партнёра и надёжность Польши — будущие предложения будут хуже.")}</p>`, L("Zerwij", "Разорвать"))){ S.cancelContract(s, c.id); refresh(true); } }
      else if (d.m){ if (d.m === "sec"){ host.classList.toggle("navopen"); return; } host.classList.remove("navopen"); if (ov === d.m) closeOv(); else openOv(d.m); }
    });
    $("#plwhy").addEventListener("click", e => { if (e.target.id === "plwhy"){ why = null; drawWhy(); } });
    $("#plov").addEventListener("click", e => { if (e.target.id === "plov") closeOv(); });

    function confirmBox(title, body, ok){
      return new Promise(res => { const m = $("#plmodal"); m.hidden = false;
        m.innerHTML = `<div class="pl-modin" role="dialog" aria-modal="true"><h3>${esc(title)}</h3>${body}<div class="pl-two"><button class="pl-btn go" id="plmok">${esc(ok)}</button><button class="pl-btn" id="plmno">${L("Anuluj", "Отмена")}</button></div></div>`;
        const done = v => { m.hidden = true; m.innerHTML = ""; res(v); };
        $("#plmok").onclick = ev => { ev.stopPropagation(); done(true); }; $("#plmno").onclick = ev => { ev.stopPropagation(); done(false); }; $("#plmok").focus(); });
    }
    let toastT = 0;
    function toast(t){ const b = $("#pltoast"); b.textContent = t; b.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => b.classList.remove("on"), 2600); }
    function save(){ try { localStorage.setItem(LS_SAVE, S.serialize(s)); } catch {} }
    function saveTut(){ try { localStorage.setItem(LS_TUT, JSON.stringify(tut)); } catch {} }
    const isMobile = () => host.clientWidth < 900;

    // ------------------------------------------------------------ samouczek (12 kroków, można pominąć i powtórzyć)
    const TUT = [
      { t: L("Witaj w Nieurodzaju", "Добро пожаловать"), b: L("Prowadzisz gospodarkę Polski — bez wojen i armii, bez końca gry. Liczby to dane gry (przybliżone). Cel: stabilny wzrost, niska inflacja i pewne dostawy.", "Вы управляете экономикой Польши — без войн и армии, без конца игры. Числа — игровые (приблизительные). Цель: устойчивый рост, низкая инфляция и надёжные поставки.") },
      { t: L("Uruchom czas", "Запустите время"), b: L("Naciśnij 1×. Jeden dzień trwa ok. 12 sekund. Nie ma przycisku „następny miesiąc” — gospodarka żyje cały czas.", "Нажмите 1×. Один день ≈ 12 секунд. Кнопки «следующий месяц» нет — экономика живёт постоянно."), sel: "#plspeed", wait: () => clock.speed > 0 },
      { t: L("Pauza i tempo", "Пауза и скорость"), b: L("Pauza zatrzymuje czas (np. na spokojne decyzje), 2× i 5× przyspieszają. Wynik nie zależy od tempa — tylko od decyzji. Spacja = pauza.", "Пауза останавливает время, 2× и 5× ускоряют. Результат зависит не от скорости, а от решений. Пробел = пауза."), sel: "#plspeed" },
      { t: L("Wskaźniki", "Показатели"), b: L("Na górze kluczowe liczby. Kliknij „Inflacja”, aby zobaczyć, skąd się bierze.", "Сверху ключевые числа. Нажмите «Инфляция», чтобы увидеть её причины."), sel: "#plkpi", wait: () => ui.whyOpened },
      { t: L("Panel „Dlaczego?”", "Панель «Почему?»"), b: L("Przyczyny są uszeregowane: główna i dodatkowe, plus łańcuch skutków i możliwe działania. Bez zmyślonych procentów.", "Причины ранжированы: главная и дополнительные, плюс цепочка и возможные действия. Без выдуманных процентов."), sel: "#plwhy" },
      { t: L("Mapa", "Карта"), b: L("Trasy pokazują handel z partnerami. Kliknij Niemcy — naszego największego partnera.", "Маршруты показывают торговлю с партнёрами. Нажмите Германию — крупнейшего партнёра."), sel: "#plmapwrap", wait: () => ui.partnerOpened === "DE", pre: () => { why = null; drawWhy(); } },
      { t: L("Zakłócenia", "Сбои"), b: L("Grubość trasy = wartość handlu. Pomarańczowa przerywana linia i znak ostrzeżenia oznaczają kłopoty partnera (susza, sztorm). Wtedy maleją dostawy i rosną ceny.", "Толщина = объём торговли. Оранжевая пунктирная линия и знак предупреждения — проблемы у партнёра (засуха, шторм). Поставки падают, цены растут."), sel: "#plmapwrap" },
      { t: L("Kontrakty", "Контракты"), b: L("Otwórz „Handel i kontrakty” — przycisk „Zobacz wszystkie” w panelu kontraktów.", "Откройте «Торговля и контракты» — кнопка «Все» в панели контрактов."), sel: "#plcon", msel: "#plmnav", wait: () => ov === "contracts", pre: () => { partnerSel = null; $("#pldrawer").hidden = true; drawMap(); } },
      { t: L("Oferty", "Предложения"), b: L("Każda oferta ma ocenę: wartość, porównanie z rynkiem, ryzyko partnera, wpływ na rynek krajowy. Możesz zaakceptować, negocjować albo odrzucić. Zerwanie kontraktu = kara i utrata zaufania.", "У каждого предложения есть оценка: стоимость, сравнение с рынком, риск партнёра, влияние на внутренний рынок. Можно принять, торговаться или отклонить. Разрыв = штраф и потеря доверия."), sel: "#plov" },
      { t: L("Inwestycje działają z opóźnieniem", "Инвестиции работают с задержкой"), b: L("Otwórz sekcję „Energia”. Suwaki programów pokazują, kiedy pojawi się efekt — np. OZE dopiero po 2,5–6 latach.", "Откройте раздел «Энергия». Ползунки программ показывают, когда появится эффект — например, ВИЭ через 2,5–6 лет."), sel: "#plnav", msel: "#plmnav", wait: () => section === "energia", pre: () => closeOv() },
      { t: L("Doradca", "Советник"), b: L("Co miesiąc doradca przygotowuje raport: prognozy na 12/36/60 mies., cele, pewność i plan. „Zastosuj” zawsze wymaga Twojego potwierdzenia. Kliknij „Szczegóły” w karcie doradcy.", "Каждый месяц советник готовит доклад: прогнозы на 12/36/60 мес., цели, уверенность и план. «Применить» всегда требует подтверждения. Нажмите «Подробнее» в карточке советника."), sel: "#pladv", msel: "#plmnav", wait: () => ov === "advisor", pre: () => { section = null; drawSection(); } },
      { t: L("Zapytaj", "Спросите"), b: L("Wybierz kategorię albo wpisz pytanie, np. „dlaczego gaz drożeje?”. Zapis gry: Ustawienia → Zapisz / Wczytaj / Nowa gra.", "Выберите категорию или введите вопрос, например «почему дорожает газ?». Сохранение: Настройки → Сохранить / Загрузить / Новая игра."), sel: "#plchat", wait: () => ui.asked },
    ];
    function drawTut(){
      $$(".pl-hl").forEach(x => x.classList.remove("pl-hl"));
      const box = $("#pltutbox");
      if (tut.done){ box.hidden = true; return; }
      const st = TUT[tut.step]; if (!st){ tut.done = true; saveTut(); box.hidden = true; return; }
      const sel = isMobile() && st.msel ? st.msel : st.sel; if (sel) $(sel)?.classList.add("pl-hl");
      const waiting = st.wait && !st.wait();
      box.hidden = false;
      box.innerHTML = `<div class="pl-tutin"><small>${L("Samouczek", "Обучение")} ${tut.step + 1}/${TUT.length}</small><i class="pl-pbar"><b style="width:${((tut.step + 1) / TUT.length * 100).toFixed(0)}%"></b></i><h4>${esc(st.t)}</h4><p>${esc(st.b)}</p>
        <div class="pl-two">${waiting ? `<span class="small muted">${L("Wykonaj to, by przejść dalej", "Сделайте это, чтобы продолжить")}</span>` : `<button class="pl-btn go" id="pltnext">${tut.step === TUT.length - 1 ? L("Gotowe", "Готово") : L("Dalej", "Далее")}</button>`}<button class="pl-btn" id="pltskip">${L("Pomiń", "Пропустить")}</button></div></div>`;
      const nx = $("#pltnext"); if (nx) nx.onclick = () => { tut.step++; if (tut.step >= TUT.length) tut.done = true; saveTut(); TUT[tut.step]?.pre?.(); drawTut(); };
      $("#pltskip").onclick = () => { tut.done = true; saveTut(); drawTut(); };
    }
    function tutCheck(){ if (tut.done) return; const st = TUT[tut.step]; if (st?.wait && st.wait()){ tut.step++; if (tut.step >= TUT.length) tut.done = true; saveTut(); TUT[tut.step]?.pre?.(); } drawTut(); }
    $("#pltut").onclick = () => { tut = { done: false, step: 0 }; saveTut(); drawTut(); };

    // ------------------------------------------------------------ pętla czasu
    function refresh(force){
      drawTop(); drawKpis(); drawMap(); drawBottom(); drawRight(force); drawOv(force);
      if (why) drawWhy();
      if (partnerSel && force) openPartner(partnerSel);
    }
    let last = performance.now(), sinceWhy = 0;
    function loop(now){
      if (!host.isConnected){ save(); document.removeEventListener("keydown", onKey); return; }
      const dt = Math.min(250, now - last); last = now;
      const n = $("#plmodal").hidden ? clock.advance(dt, !document.hidden) : 0;
      for (let i = 0; i < n; i++){
        S.tick(s, 1);
        const mi = S.date(s.dayIndex).monthIndex;
        if (mi !== lastMonth){ save(); toast(L("Nowy raport doradcy", "Новый доклад советника")); lastMonth = mi; }
      }
      sinceWhy += dt;
      if (n){ drawKpis(); drawMap(); drawBottom(); drawRight(false); drawOv(false);
        if (why && sinceWhy > 3000){ drawWhy(); sinceWhy = 0; }
        if (section && !$("#pldrawer").contains(document.activeElement) && !Object.keys(draft).length && s.dayIndex % 5 === 0) drawSection(); }
      drawTop();
      requestAnimationFrame(loop);
    }
    function onKey(e){
      if (!host.isConnected || !$("#plmodal").hidden) return;
      if (e.key === "Escape"){ if (why){ why = null; drawWhy(); } else if (ov) closeOv(); else if (section || partnerSel){ section = null; partnerSel = null; draft = {}; drawSection(); $("#pldrawer").hidden = true; drawMap(); } }
      if (e.key === " " && (e.target === document.body || e.target === host)){ e.preventDefault(); setSpeed(clock.speed ? 0 : 1); }
    }
    document.addEventListener("keydown", onKey);
    buildMap(); lastMonth = S.date(s.dayIndex).monthIndex; refresh(true); drawTut();
    requestAnimationFrame(loop);
    window.__plGame = { get state(){ return s; }, clock };   // dostęp dla testów (Playwright)
  }

  window.BrainstormGame = { mount };
})();
