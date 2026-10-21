/* Nieurodzaj — ilustrowana mapa 2D (SVG, bez obrazków).
   Warstwa statyczna (teren, rzeki, drogi, lasy, pola, góry, chmury) jest rysowana raz.
   Warstwa „żywa” (pola, wiatraki, dym, statki, pojazdy) dostaje tylko wskaźniki z symulacji
   i nic w niej nie jest zmyślone: liczba wiatraków = efekt programu OZE, kolor pól = zbiory itd. */
(function (root){
  "use strict";
  // deterministyczny generator — mapa wygląda tak samo przy każdym uruchomieniu
  function rng(seed){ let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const f0 = v => v.toFixed(0), f1 = v => v.toFixed(1);

  // szczegółowy kontur Polski (lon, lat)
  const PL = [[14.21, 53.95], [14.8, 54.05], [15.4, 54.16], [16.1, 54.28], [16.6, 54.54], [17.2, 54.71], [17.9, 54.82], [18.38, 54.83], [18.8, 54.62], [18.82, 54.59], [18.5, 54.71], [18.56, 54.53], [18.66, 54.38], [19.0, 54.35], [19.62, 54.45],
    [20.5, 54.4], [21.4, 54.33], [22.8, 54.36], [23.1, 54.3], [23.5, 54.15], [23.5, 53.95], [23.6, 53.6], [23.9, 53.2], [23.85, 52.9], [23.6, 52.6], [23.2, 52.3], [23.6, 52.1], [23.65, 51.8], [23.55, 51.6], [23.85, 51.25], [24.1, 50.85],
    [23.7, 50.4], [23.4, 50.3], [22.8, 49.9], [22.65, 49.55], [22.85, 49.1], [22.6, 49.05], [22.2, 49.15], [21.6, 49.43], [21.0, 49.4], [20.6, 49.37], [20.1, 49.2], [19.8, 49.2], [19.45, 49.55], [19.0, 49.4], [18.85, 49.52],
    [18.6, 49.9], [18.1, 50.05], [17.7, 50.3], [17.4, 50.27], [16.9, 50.45], [16.65, 50.15], [16.3, 50.65], [16.0, 50.65], [15.4, 50.8], [14.85, 50.87], [15.0, 51.1], [14.95, 51.45], [14.7, 51.6], [14.75, 52.07], [14.55, 52.4],
    [14.6, 52.6], [14.15, 52.85], [14.4, 53.25], [14.3, 53.6]];
  const RIVERS = [
    [[18.95, 49.62], [19.4, 50.0], [19.95, 50.05], [20.8, 50.3], [21.6, 50.6], [21.9, 51.1], [21.6, 51.5], [21.2, 52.0], [21.0, 52.25], [20.5, 52.5], [19.7, 52.6], [19.0, 52.9], [18.6, 53.05], [18.25, 53.3], [18.8, 53.8], [18.9, 54.3]],
    [[18.2, 49.95], [17.9, 50.35], [17.3, 50.85], [17.0, 51.1], [16.4, 51.4], [15.8, 51.8], [15.0, 52.05], [14.65, 52.35], [14.4, 52.6], [14.2, 52.95], [14.45, 53.4], [14.55, 53.75]],
    [[19.2, 50.6], [18.6, 51.4], [18.0, 52.1], [17.0, 52.4], [16.2, 52.6], [15.2, 52.6], [14.65, 52.6]],
    [[24.0, 50.8], [23.75, 51.6], [23.4, 52.2], [22.5, 52.5], [21.5, 52.55], [20.9, 52.5]]];
  // drogi ekspresowe i koleje między miastami
  const C = { WAW: [21.0, 52.23], KRK: [19.94, 50.06], LDZ: [19.46, 51.76], WRO: [17.03, 51.1], POZ: [16.93, 52.4], GDN: [18.65, 54.35], SZZ: [14.55, 53.43], KAT: [19.02, 50.26], LUB: [22.57, 51.25], BIA: [23.16, 53.13], RZE: [22.0, 50.04], DE: [14.6, 52.35], CZ: [16.4, 50.6], UA: [23.4, 50.2], LT: [23.2, 54.1], BY: [23.6, 52.1] };
  const ROADS = [["WAW", "LDZ"], ["LDZ", "WRO"], ["WAW", "POZ"], ["POZ", "DE"], ["WAW", "GDN"], ["WAW", "KRK"], ["KRK", "KAT"], ["KAT", "WRO"], ["WRO", "POZ"], ["WAW", "LUB"], ["WAW", "BIA"], ["KRK", "RZE"], ["RZE", "UA"], ["GDN", "SZZ"], ["SZZ", "POZ"], ["BIA", "LT"], ["WRO", "CZ"], ["LDZ", "KAT"]];
  const RAILS = [["WAW", "POZ"], ["WAW", "KAT"], ["WAW", "GDN"], ["WAW", "BY"], ["KAT", "WRO"], ["POZ", "SZZ"], ["LUB", "UA"], ["KRK", "RZE"]];
  // strefy krajobrazu: [lon, lat, rx, ry, gęstość]
  const FORESTS = [[16.8, 53.9, 1.0, 0.35, 70], [17.9, 53.6, 0.4, 0.3, 30], [21.4, 53.7, 0.9, 0.35, 60], [23.5, 52.75, 0.3, 0.3, 25], [16.0, 52.7, 0.5, 0.22, 30], [15.4, 51.5, 0.5, 0.3, 35], [23.0, 50.5, 0.4, 0.25, 22], [20.8, 50.85, 0.4, 0.2, 20], [21.5, 49.6, 1.1, 0.2, 45], [19.3, 53.3, 0.4, 0.2, 18], [22.3, 52.1, 0.4, 0.3, 18]];
  const FIELDS = [[17.3, 52.15, 0.9, 0.4, 30], [18.6, 52.7, 0.5, 0.25, 14], [22.5, 51.0, 0.6, 0.4, 24], [20.4, 51.9, 0.6, 0.3, 18], [17.9, 50.65, 0.4, 0.25, 12], [22.6, 53.0, 0.4, 0.3, 10], [19.8, 50.5, 0.4, 0.2, 10], [16.4, 51.2, 0.4, 0.2, 10]];
  const LAKES = [[21.7, 53.85, 0.12, 0.05], [21.55, 53.6, 0.08, 0.06], [22.0, 53.95, 0.1, 0.04], [21.85, 53.7, 0.05, 0.08], [18.05, 54.25, 0.06, 0.04], [17.9, 54.1, 0.05, 0.03], [16.2, 53.5, 0.07, 0.03]];
  const MOUNTAINS = [[15.6, 50.82, 0.7], [16.1, 50.7, 0.8], [16.6, 50.35, 0.9], [18.9, 49.58, 0.8], [19.4, 49.6, 0.8], [19.95, 49.28, 1.25], [20.15, 49.27, 1.1], [20.6, 49.45, 0.8], [21.3, 49.48, 0.75], [22.4, 49.2, 0.95], [22.7, 49.25, 0.85]];
  // turbiny wiatrowe: wybrzeże i Pomorze (kolejność = kolejność pojawiania się)
  const WIND = [[16.4, 54.4], [16.8, 54.5], [17.3, 54.62], [15.8, 54.2], [17.7, 54.66], [16.1, 54.25], [15.3, 54.1], [17.0, 54.3], [18.0, 54.5], [16.6, 54.15], [15.6, 53.95], [17.5, 54.4]];

  function inPoly(x, y, poly){ let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++){ const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }
  const smooth = pts => { let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`; for (let i = 1; i < pts.length - 1; i++){ const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2; d += ` Q${f1(pts[i][0])} ${f1(pts[i][1])} ${f1(mx)} ${f1(my)}`; } const l = pts[pts.length - 1]; return d + ` L${f1(l[0])} ${f1(l[1])}`; };
  const curve = (a, b, k) => { const mx = (a[0] + b[0]) / 2 + (b[1] - a[1]) * k, my = (a[1] + b[1]) / 2 - (b[0] - a[0]) * k; return `M${f1(a[0])} ${f1(a[1])} Q${f1(mx)} ${f1(my)} ${f1(b[0])} ${f1(b[1])}`; };

  function defs(){
    return `<linearGradient id="plsea2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a2a4f"/><stop offset=".7" stop-color="#14467a"/><stop offset="1" stop-color="#1d5d93"/></linearGradient>
      <radialGradient id="plland2" cx=".45" cy=".45" r=".7"><stop offset="0" stop-color="#7a9a48"/><stop offset=".7" stop-color="#5d8238"/><stop offset="1" stop-color="#4b6d2f"/></radialGradient>
      <linearGradient id="plnbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#36472f"/><stop offset="1" stop-color="#2b3b28"/></linearGradient>
      <pattern id="plwave" width="60" height="22" patternUnits="userSpaceOnUse"><path d="M0 11 q7.5 -6 15 0 t15 0" fill="none" stroke="#9ccfff" stroke-opacity=".18" stroke-width="1.4"/></pattern>
      <pattern id="plgrain" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#000" opacity=".08"/><circle cx="6" cy="5" r=".6" fill="#fff" opacity=".05"/></pattern>
      <filter id="plblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="plshadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity=".45"/></filter>
      <marker id="plarr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker>
      <g id="pltree"><circle r="3.4" cy="-3" fill="#2f5a2a"/><circle r="2.3" cx="-1" cy="-4.2" fill="#3f7334"/></g>
      <g id="plpine"><path d="M0 -8 L3.6 0 L-3.6 0 Z" fill="#244a26"/><path d="M0 -10 L2.6 -4 L-2.6 -4 Z" fill="#2f5d2d"/></g>
      <g id="plwind"><path d="M0 0 V-16" stroke="#e9eef2" stroke-width="1.4"/><g transform="translate(0,-16)"><g class="pl-blade"><path d="M0 0 L0 -9 M0 0 L7.8 4.5 M0 0 L-7.8 4.5" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/></g></g></g>
      <g id="plship"><path d="M-11 0 L11 0 L8 5 L-8 5 Z" fill="#c9372c"/><rect x="-8" y="-5" width="10" height="5" fill="#e8b04c"/><rect x="-6" y="-5" width="4" height="5" fill="#4f8fd6"/><rect x="4" y="-8" width="4" height="8" fill="#f2f2f2"/></g>
      <g id="pltanker"><path d="M-13 0 L13 0 L10 5 L-10 5 Z" fill="#2c3f55"/><circle cx="-6" cy="-2" r="3.2" fill="#dfe6ee"/><circle cx="1" cy="-2" r="3.2" fill="#dfe6ee"/><rect x="7" y="-7" width="4" height="7" fill="#f2f2f2"/></g>
      <g id="pltruck"><rect x="-8" y="-3.5" width="11" height="7" rx="1" fill="#f2f2f2"/><rect x="3" y="-3" width="5" height="6" rx="1" fill="var(--vc,#e2b44c)"/></g>
      <g id="pltrain"><rect x="-13" y="-2.6" width="8" height="5.2" rx="1" fill="var(--vc,#5fa8ff)"/><rect x="-4" y="-2.6" width="8" height="5.2" rx="1" fill="var(--vc,#5fa8ff)"/><rect x="5" y="-2.6" width="8" height="5.2" rx="2" fill="#f2f2f2"/></g>
      <radialGradient id="plcg"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><g id="plcloud" fill="url(#plcg)"><circle cx="0" cy="0" r="48"/><circle cx="40" cy="-12" r="56"/><circle cx="82" cy="4" r="44"/><circle cx="40" cy="22" r="44"/></g>`;
  }

  // warstwa statyczna: teren pod granicami i znacznikami
  function terrain(proj, opt){
    const R = rng(20260101), lite = !!opt.lite, P = PL.map(p => proj(...p));
    const ptsStr = P.map(p => f0(p[0]) + "," + f0(p[1])).join(" ");
    let h = "";
    // sąsiedzi (wielokąty z gry dostaje funkcja wywołująca); tu tylko lekka faktura
    h += `<g class="pl-nbtex" pointer-events="none">${opt.neighbours}</g>`;
    // Polska: ziemia + faktura + delikatny cień
    h += `<polygon points="${ptsStr}" fill="url(#plland2)" filter="url(#plshadow)"/><polygon points="${ptsStr}" fill="url(#plgrain)"/>`;
    // pola (kolor ustawia warstwa żywa przez zmienną --field)
    h += `<g class="pl-fields">`;
    for (const [lo, la, rx, ry, n] of FIELDS){ for (let i = 0; i < n * (lite ? 0.5 : 1); i++){ const a = R() * Math.PI * 2, r = Math.sqrt(R()); const ll = [lo + Math.cos(a) * rx * r, la + Math.sin(a) * ry * r]; if (!inPoly(ll[0], ll[1], PL)) continue;
      const [x, y] = proj(...ll), w = 7 + R() * 9, hh = 4 + R() * 6, rot = -25 + R() * 50, alt = R() < 0.35;
      h += `<rect x="${f1(x - w / 2)}" y="${f1(y - hh / 2)}" width="${f1(w)}" height="${f1(hh)}" transform="rotate(${f0(rot)} ${f1(x)} ${f1(y)})" class="${alt ? "fa" : "fb"}"/>`; } }
    h += `</g>`;
    // jeziora
    for (const [lo, la, rx, ry] of LAKES){ const [x, y] = proj(lo, la), [x2, y2] = proj(lo + rx, la + ry); h += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(Math.abs(x2 - x))}" ry="${f1(Math.abs(y2 - y))}" fill="#3d7fbf" stroke="#9ccfff" stroke-opacity=".4"/>`; }
    // rzeki
    h += `<g class="pl-rivers">${RIVERS.map(r => `<path d="${smooth(r.map(p => proj(...p)))}"/>`).join("")}</g>`;
    // drogi i koleje
    h += `<g class="pl-roads">${ROADS.map(([a, b], i) => `<path d="${curve(proj(...C[a]), proj(...C[b]), (i % 2 ? 0.05 : -0.05))}"/>`).join("")}</g>`;
    h += `<g class="pl-rails">${RAILS.map(([a, b], i) => `<path d="${curve(proj(...C[a]), proj(...C[b]), (i % 2 ? -0.08 : 0.08))}"/>`).join("")}</g>`;
    // lasy (drzewa liściaste i iglaste)
    h += `<g class="pl-forest">`;
    for (const [lo, la, rx, ry, n] of FORESTS){ for (let i = 0; i < n * (lite ? 0.45 : 1); i++){ const a = R() * Math.PI * 2, r = Math.sqrt(R()); const ll = [lo + Math.cos(a) * rx * r, la + Math.sin(a) * ry * r]; if (!inPoly(ll[0], ll[1], PL)) continue;
      const [x, y] = proj(...ll); h += `<use href="${R() < 0.5 ? "#plpine" : "#pltree"}" x="${f1(x)}" y="${f1(y)}"/>`; } }
    // trochę lasów także u sąsiadów — żeby tło nie było puste
    for (let i = 0; i < (lite ? 30 : 90); i++){ const ll = [12 + R() * 16, 48 + R() * 8]; if (inPoly(ll[0], ll[1], PL) || ll[1] > 54.6 && ll[0] < 21) continue; const [x, y] = proj(...ll); h += `<use href="#plpine" x="${f1(x)}" y="${f1(y)}" opacity=".55"/>`; }
    h += `</g>`;
    // góry na południu
    h += `<g class="pl-mtn">${MOUNTAINS.map(([lo, la, sc]) => { const [x, y] = proj(lo, la), w = 13 * sc, hh = 15 * sc; return `<path d="M${f1(x - w)} ${f1(y + 4)} L${f1(x)} ${f1(y - hh)} L${f1(x + w)} ${f1(y + 4)} Z" fill="#6f6a5c"/><path d="M${f1(x)} ${f1(y - hh)} L${f1(x + w * 0.36)} ${f1(y - hh * 0.55)} L${f1(x - w * 0.36)} ${f1(y - hh * 0.55)} Z" fill="#f4f4f0"/><path d="M${f1(x)} ${f1(y - hh)} L${f1(x + w)} ${f1(y + 4)} L${f1(x + w * 0.2)} ${f1(y + 4)} Z" fill="#000" opacity=".18"/>`; }).join("")}</g>`;
    return h;
  }
  // granica Polski — nad terenem
  function border(proj){ const pts = PL.map(p => proj(...p)).map(p => f0(p[0]) + "," + f0(p[1])).join(" "); return `<polygon points="${pts}" class="pl-poland2"/>`; }
  // chmury na krawędziach mapy
  function clouds(){
    const C2 = [[-60, -30, 1.3], [820, -50, 1.5], [-80, 560, 1.4], [880, 590, 1.2], [460, 650, 1.0], [960, 260, 1.1]];
    return `<g class="pl-clouds" pointer-events="none">${C2.map(([x, y, s], i) => `<g class="pl-cloud c${i % 3}"><use href="#plcloud" transform="translate(${x},${y}) scale(${s})"/></g>`).join("")}</g>`;
  }
  // przemysł i elektrownie (statyczne sylwetki; dym i wiatraki są w warstwie żywej)
  function industry(proj){
    const site = (lo, la, n, cls) => { const [x, y] = proj(lo, la); let g = `<g class="pl-ind ${cls}" transform="translate(${f1(x)},${f1(y)})">`;
      for (let i = 0; i < n; i++){ const ox = -14 + i * 10, hh = 7 + (i * 5) % 9; g += `<rect x="${ox}" y="${-hh}" width="9" height="${hh}" fill="#8a8f99"/><path d="M${ox} ${-hh} l3 -3 l3 3 l3 -3 v3" fill="#a5abb4"/><rect x="${ox + 6}" y="${-hh - 9}" width="2" height="9" fill="#6b707a"/>`; }
      return g + `</g>`; };
    const [bx, by] = proj(19.33, 51.27);
    const towers = `<g class="pl-plantg" transform="translate(${f1(bx + 26)},${f1(by - 4)})"><path d="M-14 0 q2 -9 -1 -16 h8 q-3 7 -1 16 z" fill="#c9ccd2"/><path d="M-3 0 q2 -9 -1 -16 h8 q-3 7 -1 16 z" fill="#b8bcc4"/><rect x="9" y="-22" width="3" height="22" fill="#8a8f99"/></g>`;
    return site(18.75, 50.32, 4, "sil") + site(19.55, 51.7, 2, "ldz") + site(18.52, 54.48, 2, "tri") + site(16.2, 51.4, 2, "leg") + towers;
  }
  // miasta: mała sylwetka zabudowy zamiast kropki
  function skyline(x, y, big){
    const n = big ? 6 : 3, R = rng(Math.round(x * 7 + y)); let g = `<g class="pl-sky" transform="translate(${f1(x)},${f1(y)})">`;
    for (let i = 0; i < n; i++){ const w = big ? 5 : 4.5, hh = (big ? 10 : 6) + R() * (big ? 16 : 7), ox = -n * w / 2 + i * w; g += `<rect x="${f1(ox)}" y="${f1(-hh)}" width="${f1(w - 0.6)}" height="${f1(hh)}" fill="${i % 2 ? "#d9dde3" : "#bfc6cf"}"/>`; if (hh > 9) g += `<rect x="${f1(ox + 1.2)}" y="${f1(-hh + 3)}" width="1.4" height="1.4" fill="#ffd36b"/>`; }
    return g + `</g>`;
  }

  // ---------- warstwa żywa (dane z symulacji) ----------
  // kolor pól: zbiory względem normy (1 = normalnie); niedobór dodatkowo „wybiela”
  function fieldColors(harvest, shortage){
    const t = Math.max(0, Math.min(1, (1 - harvest) / 0.35)); // 0 = zielono, 1 = susza
    const mix = (a, b) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const A = mix([170, 196, 92], [196, 160, 82]), B = mix([214, 190, 96], [170, 128, 70]);
    const pale = shortage > 0.01 ? 0.75 : 1;
    return [`rgb(${A.join(",")})`, `rgb(${B.join(",")})`, pale];
  }
  function wind(proj, count){ return WIND.slice(0, count).map(([lo, la], i) => { const [x, y] = proj(lo, la); return `<use href="#plwind" x="${f1(x)}" y="${f1(y)}" class="pl-w w${i % 3}"/>`; }).join(""); }
  // dym: natężenie 0..1
  function smoke(proj, lo, la, k, dx = 0, dy = 0){
    if (k <= 0.05) return ""; const [x, y] = proj(lo, la); let g = `<g class="pl-smoke" transform="translate(${f1(x + dx)},${f1(y + dy)})" style="--k:${k.toFixed(2)}">`;
    for (let i = 0; i < 3; i++) g += `<circle r="${(3 + 2 * k).toFixed(1)}" class="p${i}"/>`;
    return g + `</g>`;
  }
  // pojazdy jadące po ścieżce trasy; dir = 1 (od partnera do Polski = import) albo -1 (eksport)
  function movers(pathD, list, dur){
    return list.map(([kind, dir, color], i) => { const off = (dur / list.length * i).toFixed(1);
      return `<use href="#${kind}" style="--vc:${color}"><animateMotion dur="${dur.toFixed(1)}s" begin="-${off}s" repeatCount="indefinite" rotate="auto" ${dir < 0 ? `keyPoints="1;0" keyTimes="0;1" calcMode="linear"` : ""} path="${pathD}"/></use>`; }).join("");
  }

  root.PLMapArt = { defs, terrain, border, clouds, industry, skyline, fieldColors, wind, smoke, movers, WIND_MAX: WIND.length, rng };
})(typeof window !== "undefined" ? window : globalThis);
