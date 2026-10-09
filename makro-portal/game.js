// Brainstorm · NIEURODZAJ — strategia ekonomiczna: Polska, piaskownica bez końca (bez wojen i armii).
// Model: pl-sim.js (window.PLSim), dane: pl-simulation-data.js, doradca bez API: advisor-knowledge.js.
// Ten plik to tylko interfejs: zegar (1× = 12 s na dzień), mapa 2D, panele, doradca, „Dlaczego?”, samouczek.
(function () {
  "use strict";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const LS_SAVE = "makro2.pl.save", LS_TUT = "makro2.pl.tut";

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
    const monthName = (m, y) => `${MONTHS[m]} ${y}`;
    const dateStr = di => { const d = S.date(di); return `${d.day + 1} · ${monthName(d.month, d.year)}`; };
    const UNIT = L("mld zł/rok", "млрд zł/год");

    // ------------------------------------------------------------ stan
    let s = null;
    try { const raw = localStorage.getItem(LS_SAVE); if (raw){ const r = S.deserialize(raw); if (r.ok) s = r.state; } } catch {}
    if (!s) s = S.newGame((Date.now() % 1e9) >>> 0);
    let tut = { done: false, step: 0 };
    try { tut = JSON.parse(localStorage.getItem(LS_TUT) || "null") || tut; } catch {}
    const clock = S.createClock({ daySec: 12, maxCatchUp: 2 });
    let section = null, rtab = "advisor", why = null, partnerSel = null, draft = {}, sheet = false, lastMonth = -1, lastSig = "";
    const ui = { whyOpened: false, partnerOpened: null, asked: false };
    ctx.track?.("game", "pl_open");

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull pl"; document.body.appendChild(host); document.body.classList.add("gaming");
    const $ = (q, r = host) => r.querySelector(q), $$ = (q, r = host) => [...r.querySelectorAll(q)];

    const SECTIONS = [["gosp", "📈", L("Gospodarka", "Экономика")], ["budzet", "🏛️", L("Budżet", "Бюджет")], ["sektory", "🏭", L("Sektory", "Секторы")], ["handel", "🚢", L("Handel", "Торговля")],
      ["energia", "⚡", L("Energia", "Энергетика")], ["nauka", "🎓", L("Edukacja i Nauka", "Образование и наука")], ["banki", "🏦", L("Banki", "Банки")], ["dane", "📊", L("Dane", "Данные")], ["ust", "⚙️", L("Ustawienia", "Настройки")]];
    const PROG_SEC = { siec: "energia", magazyny: "energia", oze: "energia", efektywnosc: "energia", logistyka: "handel", edukacja: "nauka", badania: "nauka", rolnictwo: "sektory", przemysl: "sektory" };
    const targetSection = t => !t ? null : t.startsWith("programs.") ? PROG_SEC[t.slice(9)] : t.startsWith("reserve.") || t === "trade" ? "handel" : t === "rate" ? "banki" : ["vat", "pit", "cit", "social", "health", "admin", "budget"].includes(t) ? "budzet" : null;

    host.innerHTML = `
      <header class="pl-top">
        <a class="pl-b" href="#start" aria-label="${L("Wyjdź", "Выйти")}">✕</a>
        <div class="pl-brand"><b>NIEURODZAJ</b><span>🇵🇱 ${L("Polska", "Польша")} · <em>${L("dane gry, przybliżone", "игровые данные, приблизительно")}</em></span></div>
        <div class="pl-date"><span id="pldate"></span><i><b id="pldbar"></b></i></div>
        <div class="pl-speed" role="group" aria-label="${L("Tempo", "Скорость")}" id="plspeed">
          <button class="pl-b" data-sp="0" aria-label="${L("Pauza", "Пауза")}">⏸</button><button class="pl-b" data-sp="1">1×</button><button class="pl-b" data-sp="2">2×</button><button class="pl-b" data-sp="5">5×</button>
        </div>
        <button class="pl-b" id="pltut" aria-label="${L("Samouczek", "Обучение")}">?</button>
      </header>
      <div class="pl-kpis" id="plkpi"></div>
      <div class="pl-body">
        <nav class="pl-nav" id="plnav">${SECTIONS.map(([k, i, t]) => `<button data-sec="${k}"><span>${i}</span>${t}</button>`).join("")}</nav>
        <div class="pl-mapwrap" id="plmapwrap"><svg class="pl-map" id="plmap" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" aria-label="${L("Mapa Polski i partnerów", "Карта Польши и партнёров")}"></svg>
          <div class="pl-legend">${L("Grubość trasy = wartość handlu · pomarańczowa = zakłócenia · zielona = kontrakt", "Толщина = объём торговли · оранжевый = сбой · зелёный = контракт")}</div>
          <aside class="pl-drawer" id="pldrawer" hidden></aside>
        </div>
        <aside class="pl-right" id="plright">
          <div class="pl-rtabs" id="plrtabs">
            <button data-rt="advisor">🧭 ${L("Doradca", "Советник")}</button><button data-rt="news">📰 ${L("Wiadomości", "Новости")}</button><button data-rt="contracts">🤝 ${L("Kontrakty", "Контракты")}<i id="ploffn"></i></button>
          </div>
          <div class="pl-rbody" id="plrbody"><div id="plrep"></div><div id="plchat" class="pl-chat"></div></div>
        </aside>
      </div>
      <footer class="pl-bottom" id="plbottom"></footer>
      <nav class="pl-mnav" id="plmnav"><button data-m="sec">☰ ${L("Sekcje", "Разделы")}</button><button data-m="advisor">🧭 ${L("Doradca", "Советник")}</button><button data-m="news">📰 ${L("Wiadomości", "Новости")}</button><button data-m="contracts">🤝 ${L("Kontrakty", "Контракты")}</button></nav>
      <div class="pl-why" id="plwhy" hidden></div>
      <div class="pl-modal" id="plmodal" hidden></div>
      <div class="pl-tut" id="pltutbox" hidden></div>
      <div class="pl-toast" id="pltoast"></div>`;

    // ------------------------------------------------------------ mapa (SVG)
    const proj = (lon, lat) => [290 + (lon - 14.1) / 10 * 420, 170 + (54.9 - lat) / 5.9 * 380];
    const PL_OUT = [[14.2, 53.9], [16.0, 54.25], [17.5, 54.75], [18.6, 54.72], [18.6, 54.4], [19.6, 54.45], [22.8, 54.36], [23.5, 53.9], [23.9, 53.15], [23.6, 52.6], [23.2, 52.25], [23.6, 51.6], [24.1, 51.0], [23.6, 50.4], [22.7, 49.6], [22.6, 49.1], [21.0, 49.4], [19.8, 49.2], [18.9, 49.5], [18.0, 50.0], [16.9, 50.4], [16.3, 50.7], [15.0, 51.0], [14.8, 51.6], [14.6, 52.4], [14.2, 52.9], [14.4, 53.3]];
    const CITIES = [["Warszawa", 21.0, 52.23, 1], ["Kraków", 19.94, 50.06], ["Łódź", 19.46, 51.76], ["Wrocław", 17.03, 51.1], ["Poznań", 16.93, 52.4], ["Gdańsk", 18.65, 54.35, 0, "port"], ["Szczecin", 14.55, 53.43], ["Świnoujście", 14.25, 53.9, 0, "lng"], ["Katowice", 19.02, 50.26], ["Lublin", 22.57, 51.25], ["Białystok", 23.16, 53.13], ["Rzeszów", 22.0, 50.04], ["Bełchatów", 19.33, 51.27, 0, "power"]];
    const ENTRY = { DE: [14.6, 52.4], CZ: [16.5, 50.55], SK: [20.5, 49.35], LT: [23.3, 54.05], UA: [23.9, 50.7], BY: [23.6, 52.35], FR: [15.1, 51.1], EU: [14.5, 53.5], WORLD: [18.65, 54.45] };
    const ppos = k => { const P = D.partners[k]; return [40 + P.x * 920, 40 + P.y * 620]; };
    function buildMap(){
      const svg = $("#plmap"), pts = PL_OUT.map(p => proj(...p).map(Math.round).join(",")).join(" ");
      let h = `<defs><linearGradient id="plsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pl-sea1)"/><stop offset="1" stop-color="var(--pl-sea2)"/></linearGradient></defs>
        <rect x="0" y="0" width="1000" height="700" fill="var(--pl-land0)"/>
        <path d="M0 0 H1000 V120 C 820 150 760 175 700 168 C 600 160 560 152 480 158 C 400 162 330 168 290 175 C 200 190 120 150 0 170 Z" fill="url(#plsea)"/>
        <text x="330" y="132" class="pl-sea">${L("Morze Bałtyckie", "Балтийское море")}</text>
        <polygon points="${pts}" class="pl-poland"/>
        <g id="plroutes"></g><g id="plcities">`;
      for (const [n, lo, la, cap, kind] of CITIES){ const [x, y] = proj(lo, la);
        h += kind ? `<g class="pl-poi" data-poi="${kind}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><circle r="11"/><text y="5" text-anchor="middle">${kind === "port" ? "⚓" : kind === "lng" ? "🛢️" : "🏭"}</text><text class="pl-cn" x="14" y="4">${n}</text></g>`
          : `<g class="pl-city" transform="translate(${x.toFixed(0)},${y.toFixed(0)})"><circle r="${cap ? 6 : 4}"/><text class="pl-cn${cap ? " cap" : ""}" x="8" y="4">${n}</text></g>`; }
      h += `</g><g id="plpartners">`;
      for (const k of S.PK){ const [x, y] = ppos(k), P = D.partners[k];
        h += `<g class="pl-partner${P.restricted ? " restr" : ""}" data-p="${k}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})" tabindex="0" role="button" aria-label="${esc(nm(P))}"><circle r="26" class="ring"/><circle r="21"/><text y="5" text-anchor="middle" class="pl-pk">${k === "WORLD" ? "🌍" : k === "EU" ? "🇪🇺" : k}</text><text y="44" text-anchor="middle" class="pl-pn">${esc(nm(P))}</text><g class="pl-pev"></g></g>`; }
      h += `</g><g id="plevpl"></g>`;
      svg.innerHTML = h;
      $$(".pl-partner").forEach(g => { const open = () => openPartner(g.dataset.p); g.onclick = open; g.onkeydown = e => { if (e.key === "Enter") open(); }; });
      $$(".pl-poi").forEach(g => g.onclick = () => { const k = g.dataset.poi; openWhy(k === "power" ? "power" : k === "lng" ? "gas" : "imports"); });
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
    function drawMap(){
      let h = "";
      for (const pk of S.PK){
        const [x1, y1] = ppos(pk), [x2, y2] = proj(...ENTRY[pk]), tr = partnerTrade(pk), v = tr.imp + tr.exp;
        const w = clamp(1.5 + Math.sqrt(v) * 0.55, 1.5, 22), bad = partnerIssue(pk), restr = D.partners[pk].restricted;
        const mx = (x1 + x2) / 2 + (y2 - y1) * 0.12, my = (y1 + y2) / 2 - (x2 - x1) * 0.12;
        const d = `M${x1.toFixed(0)} ${y1.toFixed(0)} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}`;
        h += `<path d="${d}" class="pl-route${bad ? " bad" : ""}${restr ? " restr" : ""}" style="stroke-width:${w.toFixed(1)}"/><path d="${d}" class="pl-flow" style="animation-duration:${(6 / Math.max(0.3, s.partners[pk].route)).toFixed(1)}s"/>`;
        const cs = s.contracts.filter(c => c.status === "active" && c.partner === pk);
        if (cs.length) h += `<path d="M${x1.toFixed(0)} ${(y1 + 8).toFixed(0)} Q${(mx + 10).toFixed(0)} ${(my + 10).toFixed(0)} ${x2.toFixed(0)} ${(y2 + 6).toFixed(0)}" class="pl-cline"/><text x="${mx.toFixed(0)}" y="${(my + 26).toFixed(0)}" class="pl-ctag">🤝${cs.length}</text>`;
      }
      $("#plroutes").innerHTML = h;
      for (const g of $$(".pl-partner")){ const pk = g.dataset.p, sp = s.partners[pk], ev = s.events.filter(e => D.events[e.k].partner === pk);
        g.classList.toggle("issue", partnerIssue(pk)); g.classList.toggle("sel", partnerSel === pk);
        g.querySelector(".ring").style.stroke = sp.relationship > 0.6 ? "var(--pl-good)" : sp.relationship > 0.35 ? "var(--pl-warn)" : "var(--pl-bad)";
        g.querySelector(".pl-pev").innerHTML = ev.length ? `<g transform="translate(20,-22)"><circle r="12" class="pl-evdot ${S.phase(ev[0])}"/><text y="5" text-anchor="middle">⚠</text></g>` : ""; }
      const dom = s.events.filter(e => D.events[e.k].partner === "PL");
      const [bx, by] = proj(19.33, 51.27);
      $("#plevpl").innerHTML = dom.length ? `<g transform="translate(${bx + 16},${by - 22})"><circle r="12" class="pl-evdot ${S.phase(dom[0])}"/><text y="5" text-anchor="middle">⚠</text></g>` : "";
    }

    // ------------------------------------------------------------ górny pasek i wskaźniki
    const KPIS = [
      ["gdp", L("PKB r/r", "ВВП г/г"), () => s.macro.growthYoY, v => sgn(v) + "%", 1],
      ["inflation", L("Inflacja", "Инфляция"), () => s.macro.inflation, v => n1(v) + "%", -1],
      ["unemployment", L("Bezrobocie", "Безработица"), () => s.macro.unemployment, v => n1(v) + "%", -1],
      ["budget", L("Saldo budżetu", "Сальдо бюджета"), () => s.macro.balance, v => sgn(v, n0) + " " + L("mld", "млрд"), 1],
      ["debt", L("Dług / PKB", "Долг / ВВП"), () => s.macro.debtRatio, v => n1(v) + "%", -1],
      ["exports", L("Eksport", "Экспорт"), () => s.macro.X, v => n0(v) + " " + L("mld", "млрд"), 0],
      ["imports", L("Import", "Импорт"), () => s.macro.M, v => n0(v) + " " + L("mld", "млрд"), 0],
      ["gas", L("Gaz", "Газ"), () => s.markets.gaz.price, v => n0(v) + " zł/MWh", -1],
    ];
    const histAgo = days => { const H = s.history; return H.length > days ? H[H.length - 1 - days] : H[0] || s.start; };
    const KEYMAP = { gdp: "growthYoY", inflation: "inflation", unemployment: "unemployment", budget: "balance", debt: "debtRatio", exports: "X", imports: "M", gas: "gas" };
    function drawKpis(){
      const a = histAgo(30);
      $("#plkpi").innerHTML = KPIS.map(([k, t, get, f, good]) => { const v = get(), p = a[KEYMAP[k]] ?? v, d = v - p, th = Math.abs(p) * 0.004 + 0.02;
        const arrow = d > th ? "▲" : d < -th ? "▼" : "•", cls = !good || Math.abs(d) <= th ? "" : (d > 0) === (good > 0) ? "up" : "down";
        return `<button class="pl-kpi" data-why="${k}"><small>${t}</small><b>${f(v)}</b><i class="${cls}">${arrow}</i></button>`; }).join("");
      $$("#plkpi .pl-kpi").forEach(b => b.onclick = () => openWhy(b.dataset.why));
    }
    function drawTop(){
      $("#pldate").textContent = dateStr(s.dayIndex);
      $("#pldbar").style.width = (clamp(clock.progress, 0, 1) * 100).toFixed(1) + "%";
      $$("#plspeed [data-sp]").forEach(b => b.classList.toggle("on", +b.dataset.sp === clock.speed));
    }
    function setSpeed(v){ clock.setSpeed(v); drawTop(); tutCheck(); }
    $$("#plspeed [data-sp]").forEach(b => b.onclick = () => setSpeed(+b.dataset.sp));

    // ------------------------------------------------------------ dolny pasek: mini-wykresy + struktura PKB
    function spark(vals, w = 120, h = 34){
      if (vals.length < 2) return `<svg class="pl-spark" width="${w}" height="${h}"></svg>`;
      const mn = Math.min(...vals), mx = Math.max(...vals), r = mx - mn || 1;
      const pts = vals.map((v, i) => `${(i / (vals.length - 1) * (w - 2) + 1).toFixed(1)},${(h - 2 - (v - mn) / r * (h - 4)).toFixed(1)}`).join(" ");
      return `<svg class="pl-spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none"><polyline points="${pts}"/></svg>`;
    }
    function drawBottom(){
      const H = s.history.slice(-360), take = k => H.map(x => x[k]);
      const items = [["gdp", L("PKB (nominalnie)", "ВВП (номинальный)"), take("nominalGDP"), n0(s.macro.Y * s.macro.priceLevel) + " " + L("mld", "млрд")], ["inflation", L("Inflacja", "Инфляция"), take("inflation"), n1(s.macro.inflation) + "%"],
        ["unemployment", L("Bezrobocie", "Безработица"), take("unemployment"), n1(s.macro.unemployment) + "%"], ["debt", L("Dług/PKB", "Долг/ВВП"), take("debtRatio"), n1(s.macro.debtRatio) + "%"], ["trade", L("Saldo handlu", "Торговое сальдо"), take("tradeBalance"), sgn(s.macro.X - s.macro.M, n0) + " " + L("mld", "млрд")]];
      const m = s.macro, parts = [["C", m.C, "c"], ["I", m.I, "i"], ["G", m.G, "g"]], tot = m.C + m.I + m.G + Math.max(0, m.NX);
      $("#plbottom").innerHTML = items.map(([k, t, v, now]) => `<button class="pl-mini" data-why="${k}"><small>${t}</small><b>${now}</b>${spark(v)}</button>`).join("") +
        `<div class="pl-struct"><small>${L("Struktura popytu (PKB)", "Структура спроса (ВВП)")}</small><div class="pl-bar">${parts.map(([k, v, c]) => `<span class="${c}" style="width:${(v / tot * 100).toFixed(1)}%">${k} ${Math.round(v / tot * 100)}%</span>`).join("")}${m.NX > 0 ? `<span class="nx" style="width:${(m.NX / tot * 100).toFixed(1)}%">NX</span>` : ""}</div><small class="muted">NX ${sgn(m.NX, n0)} ${L("mld (realnie)", "млрд (реально)")}</small></div>`;
      $$("#plbottom [data-why]").forEach(b => b.onclick = () => openWhy(b.dataset.why));
    }

    // ------------------------------------------------------------ prawy panel: doradca / wiadomości / kontrakty
    const RISK = { inflation_high: [L("Inflacja powyżej celu", "Инфляция выше цели"), "inflation"], inflation_low: [L("Inflacja poniżej celu", "Инфляция ниже цели"), "inflation"], unemployment: [L("Rosnące bezrobocie", "Растущая безработица"), "unemployment"],
      debt: [L("Dług powyżej 60% PKB", "Долг выше 60% ВВП"), "debt"], gas_dependency: [L("Zależność od importu gazu", "Зависимость от импорта газа"), "gas"], food_security: [L("Bezpieczeństwo żywnościowe", "Продовольственная безопасность"), "grain"],
      productivity: [L("Słaby wzrost wydajności", "Слабый рост производительности"), "gdp"], infrastructure: [L("Niedofinansowana infrastruktura", "Недофинансированная инфраструктура"), "trade"], growth: [L("Wolny wzrost gospodarki", "Медленный рост экономики"), "gdp"] };
    const CONF_R = { events: L("trwające wydarzenia", "идущие события"), prices: L("zmienne ceny surowców", "волатильные цены сырья"), decisions: L("świeże decyzje (efekt jeszcze niewidoczny)", "свежие решения (эффект ещё не виден)"), contracts: L("kłopoty z dostawami", "проблемы с поставками") };
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
    function reportHtml(){
      const r = s.advisor.reports[s.advisor.reports.length - 1]; if (!r) return "";
      const pv = r.change.prev, nw = r.change.now;
      const ch = [[L("Inflacja", "Инфляция"), pv.inflation, nw.inflation, "%"], [L("Bezrobocie", "Безработица"), pv.unemployment, nw.unemployment, "%"], [L("Dług/PKB", "Долг/ВВП"), pv.debtRatio, nw.debtRatio, "%"], [L("Gaz", "Газ"), pv.gas, nw.gas, " zł/MWh"]];
      const rows = [[L("Wzrost PKB (śr./rok)", "Рост ВВП (ср./год)"), "growth"], [L("Inflacja", "Инфляция"), "inflation"], [L("Bezrobocie", "Безработица"), "unemployment"], [L("Dług/PKB", "Долг/ВВП"), "debtRatio"], [L("Import gazu (udział)", "Импорт газа (доля)"), "gasImportShare"]];
      const cell = (i, key) => { const b = r.base[i][key], a = r.alt?.[i]?.[key]; return `<td>${n1(b)}${a != null && Math.abs(a - b) > 0.05 ? `<em>→ ${n1(a)}</em>` : ""}</td>`; };
      const lines = patchLines(r.patch);
      return `<section class="pl-card pl-report"><h3>📋 ${L("Raport doradcy", "Доклад советника")} · ${monthName(r.month, r.year)}</h3>
        <div class="pl-chg">${ch.map(([t, a, b, u]) => `<span><small>${t}</small>${u === "%" ? n1(a) : n0(a)} → <b>${u === "%" ? n1(b) : n0(b)}${u}</b></span>`).join("")}</div>
        ${r.risks.length ? `<h4>${L("Najważniejsze ryzyka", "Главные риски")}</h4><ol class="pl-risks">${r.risks.map(x => `<li><b>${RISK[x.topic]?.[0] || x.topic}</b> <button class="pl-link" data-why="${RISK[x.topic]?.[1] || "gdp"}">${L("Dlaczego?", "Почему?")}</button></li>`).join("")}</ol>` : `<p class="muted">${L("Brak pilnych ryzyk.", "Срочных рисков нет.")}</p>`}
        <h4>${L("Prognoza: obecna polityka", "Прогноз: текущая политика")}${r.alt ? ` <em>→ ${L("z planem doradcy", "с планом советника")}</em>` : ""}</h4>
        <table class="pl-tbl"><tr><th></th><th>12 ${L("mies.", "мес.")}</th><th>36</th><th>60</th></tr>${rows.map(([t, k]) => `<tr><td>${t}</td>${[0, 1, 2].map(i => cell(i, k)).join("")}</tr>`).join("")}
        <tr class="conf"><td>${L("Pewność", "Уверенность")}</td>${r.confidence.map(c => `<td>${c.value}%</td>`).join("")}</tr></table>
        ${r.confidence[0].reasons.length ? `<p class="muted small">${L("Niższa pewność, bo", "Уверенность ниже, потому что")}: ${r.confidence[0].reasons.map(x => CONF_R[x]).join(", ")}.</p>` : ""}
        <p class="muted small">${L("Prognoza modelu gry bez losowych wydarzeń; % = średnio rocznie (PKB) lub poziom na koniec okresu.", "Прогноз модели без случайных событий; % = среднегодовой (ВВП) или уровень на конец периода.")}</p>
        ${lines.length ? `<div class="pl-plan"><b>${L("Plan doradcy", "План советника")}</b><ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul><button class="pl-btn pri" id="plapply">✓ ${L("Zastosuj", "Применить")}</button></div>` : ""}
        <h4>${L("Cele na 3 lata", "Цели на 3 года")}</h4><ul class="pl-goals">${r.goals.map(g => `<li class="${g.ok ? "ok" : "no"}">${g.ok ? "✓" : "✗"} ${nm(g)} <small>(${n1(g.value)}%, ${L("zostało", "осталось")} ${Math.max(0, g.monthsLeft)} ${L("mies.", "мес.")})</small></li>`).join("")}</ul></section>`;
    }
    function newsText(n){
      const ev = k => nm(D.events[k]), cid = n.ref, c = s.contracts.find(x => x.id === cid) || s.offers.find(x => x.id === cid) || (n.p ? { type: n.ty, market: n.mk, partner: n.p } : null);
      const cdesc = c ? `${c.type === "import" ? L("import", "импорт") : L("eksport", "экспорт")} ${nm(D.markets[c.market]).toLowerCase()} · ${nm(D.partners[c.partner])}` : "";
      const inn = id => nm(D.innovations.find(x => x.id === id));
      const T = {
        welcome: ["👋", L("Start kadencji. Gospodarka Polski czeka na Twoje decyzje. Czas płynie — możesz go zatrzymać.", "Начало срока. Экономика Польши ждёт решений. Время идёт — его можно остановить.")],
        event_signal: ["📡", L(`Pierwsze sygnały: ${ev(n.k)}.`, `Первые сигналы: ${ev(n.k)}.`), "ev"], event_stress: ["⚠️", L(`Narasta: ${ev(n.k)}.`, `Нарастает: ${ev(n.k)}.`), "ev"], event_peak: ["🔥", L(`Szczyt: ${ev(n.k)}.`, `Пик: ${ev(n.k)}.`), "ev"],
        event_recovery: ["🌤️", L(`Wygasa: ${ev(n.k)}.`, `Затухает: ${ev(n.k)}.`), "ev"], event_end: ["✅", L(`Koniec: ${ev(n.k)}.`, `Завершилось: ${ev(n.k)}.`), "ev"],
        offer: ["📨", L(`Nowa oferta kontraktu: ${cdesc}.`, `Новое предложение контракта: ${cdesc}.`)], contract_signed: ["🤝", L(`Podpisano kontrakt: ${cdesc}.`, `Подписан контракт: ${cdesc}.`)],
        contract_broken: ["💔", L(`Zerwano kontrakt: ${cdesc}. Kara i spadek zaufania partnerów.`, `Контракт разорван: ${cdesc}. Штраф и падение доверия.`)],
        contract_shortfall: ["📉", L(`Partner nie dostarczył pełnej ilości: ${cdesc}${n.fm ? " (siła wyższa)" : ""}.`, `Партнёр недопоставил: ${cdesc}${n.fm ? " (форс-мажор)" : ""}.`)],
        contract_underdelivery: ["📦", L(`Polska nie dostarczyła pełnej ilości: ${cdesc}${n.fm ? " (siła wyższa)" : " — kara i niższa wiarygodność"}.`, `Польша недопоставила: ${cdesc}${n.fm ? " (форс-мажор)" : " — штраф и ниже надёжность"}.`)],
        contract_done: ["🏁", L(`Kontrakt zakończony: ${cdesc}.`, `Контракт завершён: ${cdesc}.`)],
        innovation_found: ["💡", L(`Naukowcy opracowali: ${inn(n.ref)}. Możesz wdrożyć (Edukacja i Nauka).`, `Учёные разработали: ${inn(n.ref)}. Можно внедрить (Образование и наука).`)], innovation_done: ["🚀", L(`Wdrożono: ${inn(n.ref)}.`, `Внедрено: ${inn(n.ref)}.`)],
        inflation_high: ["🔺", L(`Inflacja przekroczyła 5% (${n1(n.v)}%).`, `Инфляция превысила 5% (${n1(n.v)}%).`), "inflation"], unemployment_high: ["🔺", L(`Bezrobocie powyżej 7% (${n1(n.v)}%).`, `Безработица выше 7% (${n1(n.v)}%).`), "unemployment"],
        gas_up: ["🔥", L(`Gaz zdrożał o ${n0(n.v)}% w miesiąc.`, `Газ подорожал на ${n0(n.v)}% за месяц.`), "gas"], debt_60: ["🏦", L(`Dług przekroczył 60% PKB.`, `Долг превысил 60% ВВП.`), "debt"],
        shortage: ["🚨", L(`Niedobór na rynku: ${n.k && D.markets[n.k] ? nm(D.markets[n.k]).toLowerCase() : ""} (${n1(n.v || 0)}% popytu).`, `Дефицит на рынке: ${n.k && D.markets[n.k] ? nm(D.markets[n.k]).toLowerCase() : ""} (${n1(n.v || 0)}% спроса).`), n.k === "gaz" ? "gas" : n.k === "prad" ? "power" : n.k === "zboze" || n.k === "zywnosc" ? "grain" : "imports"],
      };
      const t = T[n.id] || ["•", String(n.id)];
      let wk = t[2];
      if (wk === "ev"){ const e = (D.events[n.k] || {}).effects || {}; wk = e.world?.gaz ? "gas" : e.domesticYield || e.supply?.UA ? "grain" : e.domestic?.prad ? "power" : e.demand ? "exports" : "imports"; }
      return { icon: t[0], text: t[1], why: wk };
    }
    function newsHtml(){
      const N = s.news.slice().reverse().slice(0, 40);
      return `<section class="pl-card"><h3>📰 ${L("Wiadomości", "Новости")}</h3><ul class="pl-news">${N.map(n => { const t = newsText(n); return `<li><span>${t.icon}</span><div><small>${dateStr(n.day)}</small>${esc(t.text)}${t.why ? ` <button class="pl-link" data-why="${t.why}">${L("Dlaczego?", "Почему?")}</button>` : ""}</div></li>`; }).join("")}</ul></section>`;
    }
    const qty = (k, v) => (v < 10 ? n1(v) : n0(v)) + " " + D.markets[k].unit;
    const priceStr = (k, p) => D.markets[k].price < 10 ? L("indeks ", "индекс ") + n2(p) : n0(p) + " " + D.markets[k].priceUnit;
    function offerHtml(o){
      const a = S.assessContract(s, o), imp = o.type === "import";
      const risk = a.partnerRisk > 0.3 ? L("wysokie", "высокий") : a.partnerRisk > 0.12 ? L("średnie", "средний") : L("niskie", "низкий");
      return `<div class="pl-offer" data-o="${o.id}"><div class="pl-oh"><b>${imp ? "⬇️ " + L("Import", "Импорт") : "⬆️ " + L("Eksport", "Экспорт")}: ${nm(D.markets[o.market])}</b><span>${nm(D.partners[o.partner])}</span></div>
        <div class="pl-og"><span><small>${L("Ilość", "Объём")}</small>${qty(o.market, o.volume)}/${L("rok", "год")}</span><span><small>${L("Cena", "Цена")}</small>${priceStr(o.market, o.price)}</span><span><small>${L("Okres", "Срок")}</small>${o.months} ${L("mies.", "мес.")}</span>
        <span><small>${L("Wartość", "Стоимость")}</small>${n1(a.valuePerYear)} ${UNIT}</span><span><small>${L("vs rynek", "vs рынок")}</small><b class="${a.vsMarket >= 0 ? "g" : "r"}">${sgn(a.vsMarket)} ${L("mld/rok", "млрд/год")}</b></span><span><small>${L("Ryzyko partnera", "Риск партнёра")}</small>${risk}</span></div>
        <p class="small muted">${imp ? L("Stała cena chroni przed skokami cen świata, ale wiąże, gdy ceny spadną.", "Фиксированная цена защищает от скачков, но связывает, если цены упадут.") : a.domesticEffect === "tight" ? L("⚠ Mało wolnego towaru — kontrakt może zabrać podaż z rynku krajowego.", "⚠ Мало свободного товара — контракт может забрать предложение с внутреннего рынка.") : L("Stały odbiorca; towar na eksport nie trafi na rynek krajowy.", "Стабильный покупатель; товар на экспорт не попадёт на внутренний рынок.")}
        ${L("Wolna przepustowość tras", "Свободная пропускная способность")}: ${qty(o.market, Math.max(0, a.capacityLeft))}. ${L("Kara za zerwanie", "Штраф за разрыв")}: ${n1(o.penalty * 12)} ${L("mld zł", "млрд zł")}.</p>
        <div class="pl-oact"><button class="pl-btn pri" data-acc="${o.id}">✓ ${L("Akceptuj", "Принять")}</button><button class="pl-btn" data-neg="${o.id}">↔ ${L("Negocjuj", "Торговаться")}</button><button class="pl-btn" data-rej="${o.id}">✕ ${L("Odrzuć", "Отклонить")}</button></div><div class="pl-negbox" id="plneg${o.id}"></div></div>`;
    }
    function contractsHtml(){
      const act = s.contracts.filter(c => c.status === "active"), rel = s.flags.playerReliability ?? 0.95;
      return `<section class="pl-card"><h3>📨 ${L("Oferty", "Предложения")} (${s.offers.length})</h3>${s.offers.length ? s.offers.map(offerHtml).join("") : `<p class="muted">${L("Brak ofert. Nowe pojawiają się co miesiąc.", "Предложений нет. Новые появляются каждый месяц.")}</p>`}</section>
        <section class="pl-card"><h3>🤝 ${L("Aktywne kontrakty", "Активные контракты")} (${act.length})</h3><p class="small muted">${L("Wiarygodność Polski", "Надёжность Польши")}: <b>${Math.round(rel * 100)}%</b></p>
        ${act.map(c => `<div class="pl-offer"><div class="pl-oh"><b>${c.type === "import" ? "⬇️" : "⬆️"} ${nm(D.markets[c.market])}</b><span>${nm(D.partners[c.partner])}</span></div>
          <div class="pl-og"><span><small>${L("Ilość", "Объём")}</small>${qty(c.market, c.volume)}</span><span><small>${L("Dostawy", "Поставки")}</small><b class="${c.delivery < c.guarantee ? "r" : "g"}">${Math.round(c.delivery * 100)}%</b></span><span><small>${L("Zostało", "Осталось")}</small>${Math.max(0, Math.ceil((c.end - s.dayIndex) / 30))} ${L("mies.", "мес.")}</span></div>
          <button class="pl-btn" data-cancel="${c.id}">${L("Zerwij", "Разорвать")}</button></div>`).join("") || `<p class="muted">${L("Brak.", "Нет.")}</p>`}</section>`;
    }
    function drawRight(force){
      const sig = rtab + "|" + s.advisor.reports.length + "|" + s.advisor.lastMonthlyReportIndex + "|" + s.news.length + "|" + (s.news[s.news.length - 1]?.day ?? 0) + "|" + s.offers.map(o => o.id + ":" + o.rounds).join(",") + "|" + s.contracts.map(c => c.status + c.delivery.toFixed(2)).join(",");
      $("#ploffn").textContent = s.offers.length ? s.offers.length : "";
      $$("#plrtabs [data-rt]").forEach(b => b.classList.toggle("on", b.dataset.rt === rtab));
      $$("#plmnav [data-m]").forEach(b => b.classList.toggle("on", sheet && b.dataset.m === rtab));
      if (!force && sig === lastSig) return; lastSig = sig;
      const rep = $("#plrep"), chat = $("#plchat");
      if (rep.contains(document.activeElement) && document.activeElement.tagName === "INPUT" && !force) return;
      if (rtab === "advisor"){ rep.innerHTML = reportHtml(); chat.hidden = false; if (!chat.dataset.init) initChat(); }
      else { rep.innerHTML = rtab === "news" ? newsHtml() : contractsHtml(); chat.hidden = true; }
      wire(rep);
      const ap = $("#plapply", rep); if (ap) ap.onclick = applyPlan;
      $$("[data-acc]", rep).forEach(b => b.onclick = () => { S.acceptOffer(s, +b.dataset.acc); toast(L("Kontrakt podpisany.", "Контракт подписан.")); refresh(true); });
      $$("[data-rej]", rep).forEach(b => b.onclick = () => { S.rejectOffer(s, +b.dataset.rej); refresh(true); });
      $$("[data-neg]", rep).forEach(b => b.onclick = () => negForm(+b.dataset.neg));
      $$("[data-cancel]", rep).forEach(b => b.onclick = async () => { const c = s.contracts.find(x => x.id === +b.dataset.cancel);
        if (await confirmBox(L("Zerwać kontrakt?", "Разорвать контракт?"), `<p>${L("Kara", "Штраф")}: <b>${n1(c.penalty * 12)} ${L("mld zł", "млрд zł")}</b>. ${L("Spadnie zaufanie partnera i wiarygodność Polski — przyszłe oferty będą gorsze.", "Упадёт доверие партнёра и надёжность Польши — будущие предложения будут хуже.")}</p>`, L("Zerwij", "Разорвать"))){ S.cancelContract(s, c.id); refresh(true); } });
    }
    function negForm(id){
      const o = s.offers.find(x => x.id === id), box = $("#plneg" + id); if (!o || !box) return;
      const better = o.type === "import" ? -1 : 1, step = o.price < 10 ? 0.01 : Math.max(1, Math.round(o.price * 0.01));
      box.innerHTML = `<label>${L("Twoja cena", "Ваша цена")} <input type="number" step="${step}" value="${+(o.price + better * step * 3).toFixed(3)}" id="plnp${id}"></label><label>${L("Ilość", "Объём")} <input type="number" step="0.1" value="${o.volume}" id="plnv${id}"></label><label>${L("Miesiące", "Месяцы")} <input type="number" step="1" value="${o.months}" id="plnm${id}"></label><button class="pl-btn pri" id="plns${id}">${L("Wyślij propozycję", "Отправить")}</button><p class="small muted">${L("Partner może przyjąć, złożyć kontrofertę lub zerwać rozmowy (maks. 3 rundy). Lepsze relacje = więcej miejsca na ustępstwa.", "Партнёр может принять, предложить своё или прекратить переговоры (до 3 раундов). Лучше отношения — больше уступок.")}</p>`;
      $("#plns" + id).onclick = () => {
        const r = S.negotiate(s, id, { price: +$("#plnp" + id).value, volume: +$("#plnv" + id).value, months: Math.round(+$("#plnm" + id).value) });
        toast(r.result === "accepted" ? L("Partner przyjął Twoje warunki. Teraz możesz zaakceptować ofertę.", "Партнёр принял условия. Теперь можно принять предложение.") : r.result === "counter" ? L("Kontroferta partnera — sprawdź nowe warunki.", "Встречное предложение партнёра — проверьте условия.") : L("Partner zerwał rozmowy.", "Партнёр прекратил переговоры."));
        refresh(true);
      };
    }
    async function applyPlan(){
      const r = s.advisor.reports[s.advisor.reports.length - 1], lines = patchLines(r.patch);
      if (await confirmBox(L("Zastosować plan doradcy?", "Применить план советника?"), `<ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul><p class="small muted">${L("Efekty pojawią się z opóźnieniem. Każdą zmianę możesz cofnąć w sekcjach.", "Эффекты проявятся с задержкой. Любое изменение можно отменить в разделах.")}</p>`, L("Zastosuj", "Применить"))){
        S.applyPolicyPatch(s, r.patch); toast(L("Plan zastosowany.", "План применён.")); refresh(true);
      }
    }
    $$("#plrtabs [data-rt]").forEach(b => b.onclick = () => { rtab = b.dataset.rt; drawRight(true); tutCheck(); });

    // ------------------------------------------------------------ czat doradcy (drzewo + wolny tekst, bez API)
    function initChat(){
      const chat = $("#plchat"); chat.dataset.init = 1;
      chat.innerHTML = `<section class="pl-card"><h3>💬 ${L("Zapytaj doradcę", "Спросить советника")}</h3><div id="plchlog" class="pl-chlog"></div><div id="plchips" class="pl-chips"></div>
        <form id="plask" class="pl-ask"><input id="plq" placeholder="${L("np. dlaczego gaz drożeje?", "напр. почему дорожает газ?")}" autocomplete="off"><button class="pl-btn pri" aria-label="${L("Wyślij", "Отправить")}">→</button></form></section>`;
      treeChips([]);
      $("#plask").onsubmit = e => { e.preventDefault(); const q = $("#plq").value.trim(); if (!q) return; $("#plq").value = ""; ask(q); };
    }
    function treeChips(path){
      const box = $("#plchips"); let chips = [];
      if (!path.length) chips = Object.entries(A.TREE).map(([k, v]) => [[k], v[lang] || v.pl]);
      else if (path.length === 1) chips = Object.entries(A.TREE[path[0]].kids).map(([k, v]) => [[path[0], k], v[lang] || v.pl]);
      else chips = Object.entries(A.INTENTS).map(([k, v]) => [[...path, k], v[li]]);
      box.innerHTML = (path.length ? `<button class="pl-chip back" data-p="${path.slice(0, -1).join("/")}">←</button>` : "") + chips.map(([p, t]) => `<button class="pl-chip" data-p="${p.join("/")}">${esc(t)}</button>`).join("");
      $$(".pl-chip", box).forEach(b => b.onclick = () => { const p = b.dataset.p ? b.dataset.p.split("/") : [];
        if (p.length === 3){ ui.asked = true; answer(p.join("/"), (A.TREE[p[0]].kids[p[1]][lang] || A.TREE[p[0]].kids[p[1]].pl) + " — " + A.INTENTS[p[2]][li]); treeChips([]); tutCheck(); } else treeChips(p); });
    }
    function logMsg(html, me){ const log = $("#plchlog"); log.insertAdjacentHTML("beforeend", `<div class="pl-msg${me ? " me" : ""}">${html}</div>`); while (log.children.length > 12) log.children[0].remove(); const m = log.lastElementChild; log.scrollTop = log.scrollHeight; wire(m); return m; }
    function ask(q){
      ui.asked = true; logMsg(esc(q), true);
      const r = A.resolveAdvisorQuery(q, s, lang);
      if (r.answerId) answer(r.answerId);
      else { const m = logMsg(`${L("Nie jestem pewien, o co pytasz. Chodzi o:", "Не уверен, о чём вопрос. Вы имеете в виду:")}<div class="pl-chips">${r.suggestions.map(([id, t]) => `<button class="pl-chip" data-ans="${id}">${esc(t)}</button>`).join("")}</div>`);
        $$("[data-ans]", m).forEach(b => b.onclick = () => answer(b.dataset.ans, b.textContent)); }
      tutCheck();
    }
    function answer(id, label){
      if (label) logMsg(esc(label), true);
      const a = A.buildAdvisorAnswer(id, s, lang); if (!a){ logMsg(L("Brak danych.", "Нет данных.")); return; }
      const intent = id.split("/").pop();
      const fac = a.factors.slice(0, 4).map(f => `<li class="${f.rank}"><b>${f.rank === "main" ? L("Główny", "Главный") : L("Dodatkowy", "Доп.")}:</b> ${esc(f.label)}${f.txt ? ` — <span class="muted">${esc(f.txt)}</span>` : ""}</li>`).join("");
      const m = logMsg(`<b>${esc(a.title)}</b><p>${esc(a.summary)}</p>${["WHY", "IMPACT"].includes(intent) && fac ? `<ul class="pl-fac">${fac}</ul>` : ""}
        ${a.chain?.length ? `<div class="pl-chain">${a.chain.map(c => `<span>${esc(c)}</span>`).join("<i>→</i>")}</div>` : ""}
        ${intent === "OPTIONS" || intent === "POLICY" ? `<ul class="pl-acts">${a.actions.map(([t, tg]) => `<li>${esc(t)}${targetSection(tg) ? ` <button class="pl-link" data-sec="${targetSection(tg)}">${L("Pokaż", "Показать")}</button>` : ""}</li>`).join("")}</ul>` : ""}
        ${a.note ? `<p class="small pl-note">${esc(a.note)}</p>` : ""}<p class="small muted">${esc(a.uncertainty)}</p>
        <div class="pl-chips"><button class="pl-chip" data-why="${a.key}">🔍 ${L("Pełne „Dlaczego?”", "Полное «Почему?»")}</button>${a.follow.map(([fid, t]) => `<button class="pl-chip" data-ans="${fid}">${esc(t)}</button>`).join("")}</div>`);
      $$("[data-ans]", m).forEach(b => b.onclick = () => answer(b.dataset.ans, b.textContent));
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
      const chU = E.unit ? " " + E.unit : "%";
      box.hidden = false;
      box.innerHTML = `<div class="pl-whyin" role="dialog" aria-label="${L("Dlaczego?", "Почему?")}"><button class="pl-b pl-x" id="plwhyx" aria-label="${L("Zamknij", "Закрыть")}">✕</button>
        <h3>🔍 ${esc(E.title)}: <b>${esc(E.value)}</b></h3><p class="muted">${L("Zmiana w ostatnich 6 mies.", "Изменение за 6 мес.")}: <b>${sgn(E.change)}${chU}</b></p>
        ${E.structure ? `<div class="pl-strbar">${E.structure.slice(0, 8).map(x => `<div><span>${esc(x.name)}</span><i style="width:${clamp(x.share, 0, 100).toFixed(0)}%"></i><b>${n0(x.value)} (${n0(x.share)}%)</b></div>`).join("")}</div>` : ""}
        ${E.main.length ? `<h4>${E.exact ? L("Największy składnik (wprost z modelu)", "Крупнейшая составляющая (прямо из модели)") : L("Główna przyczyna", "Главная причина")}</h4><ul class="pl-causes">${E.main.map(f => row(f, true)).join("")}</ul>` : ""}
        ${E.extra.length ? `<h4>${L("Dodatkowe czynniki", "Дополнительные факторы")}</h4><ul class="pl-causes">${E.extra.map(f => row(f)).join("")}</ul>` : ""}
        ${E.events?.length ? `<p>⚠ ${L("Wydarzenia", "События")}: ${E.events.map(esc).join(", ")}</p>` : ""}
        <h4>${L("Łańcuch przyczyn", "Цепочка причин")}</h4><div class="pl-chain">${E.chain.map(c => `<span>${esc(c)}</span>`).join("<i>→</i>")}</div>
        ${E.note ? `<p class="pl-note">${esc(E.note)}</p>` : ""}
        ${E.actions?.length ? `<h4>${L("Co możesz zrobić", "Что можно сделать")}</h4><ul class="pl-acts">${E.actions.map(([t, tg]) => `<li>${esc(t)}${targetSection(tg) ? ` <button class="pl-link" data-sec="${targetSection(tg)}">${L("Pokaż", "Показать")}</button>` : ""}</li>`).join("")}</ul>` : ""}
        <details${keep ? " open" : ""}><summary>${L("Więcej: decyzje, programy w toku, niepewność", "Подробнее: решения, программы, неопределённость")}</summary>
          ${E.decisions?.length ? `<p><b>${L("Twoje ostatnie decyzje", "Ваши последние решения")}:</b> ${E.decisions.map(d => `${dateStr(d.day)} · ${esc(String(d.k))}`).join("; ")}</p>` : ""}
          ${E.delayed?.length ? `<p><b>${L("Programy w toku (efekt z opóźnieniem)", "Программы в работе (эффект с задержкой)")}:</b> ${E.delayed.map(x => `${esc(x.name)} ×${n2(x.eff)}`).join(", ")}</p>` : ""}
          <p class="muted">${esc(E.uncertainty)}</p></details>
        <div class="pl-chips"><small>${L("Powiązane", "Связанное")}:</small>${(RELATED[why] || []).map(k => `<button class="pl-chip" data-why="${k}">${WHY_TITLE[k]}</button>`).join("")}</div></div>`;
      box.querySelector(".pl-whyin").scrollTop = scroll;
      $("#plwhyx").onclick = () => { why = null; drawWhy(); };
      box.onclick = e => { if (e.target === box){ why = null; drawWhy(); } };
      wire(box);
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
        extra = `<p class="small">${esc(P.effect[li])}</p><p class="small muted">⏳ ${L("Efekt od", "Эффект с")} ${P.lagStart} ${L("do", "до")} ${P.lagFull} ${L("mies. · obecny efekt", "мес. · текущий эффект")} <b>×${n2(eff)}</b>${P.maintenance ? ` · ${L("utrzymanie min.", "минимум на содержание")} ${P.maintenance}` : ""} · ${L("start", "старт")} ${P.base}</p><i class="pl-eff"><b style="width:${clamp(eff / 2 * 100, 0, 100).toFixed(0)}%"></b></i>`; }
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
        <div class="pl-oact"><button class="pl-btn pri" id="plcommit">✓ ${L("Zatwierdź zmiany", "Утвердить")}</button><button class="pl-btn" id="plundo">${L("Anuluj", "Отмена")}</button></div>`;
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
      let h = `<header><h3>${title[1]} ${title[2]}</h3><button class="pl-b pl-x" id="pldrx" aria-label="${L("Zamknij", "Закрыть")}">✕</button></header>`;
      if (k === "gosp"){
        h += `<div class="pl-kvs">${kv(L("PKB nominalny", "Номинальный ВВП"), n0(m.Y * m.priceLevel) + " " + L("mld", "млрд"))}${kv(L("Wzrost r/r", "Рост г/г"), sgn(m.growthYoY) + "%")}${kv(L("Luka PKB", "Разрыв ВВП"), sgn(m.gap) + "%")}${kv(L("Inflacja", "Инфляция"), n1(m.inflation) + "%")}${kv(L("Bezrobocie", "Безработица"), n1(m.unemployment) + "%")}${kv(L("Nastroje", "Настроения"), n0(m.conf * 100))}</div>
          <h4>${L("Inflacja — z czego się składa", "Инфляция — из чего состоит")} ${whyBtn("inflation")}</h4><div class="pl-kvs">${kv(L("Oczekiwania", "Ожидания"), sgn(m.pi.expect) + " p.p.")}${kv(L("Popyt", "Спрос"), sgn(m.pi.demand) + " p.p.")}${kv(L("Energia", "Энергия"), sgn(m.pi.energy) + " p.p.")}${kv(L("Żywność", "Еда"), sgn(m.pi.food) + " p.p.")}</div>
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
          ${marketsTable()}<h4>${L("Rezerwy strategiczne", "Стратегические резервы")}</h4>${["reserve.zboze", "reserve.gaz", "reserve.paliwa"].map(slider).join("")}<h4>${L("Infrastruktura", "Инфраструктура")}</h4>${slider("programs.logistyka")}${draftBox()}`;
      } else if (k === "energia"){
        h += `<div class="pl-kvs">${kv(L("Gaz", "Газ"), n0(mk.gaz.price) + " zł/MWh")}${kv(L("Świat", "Мир"), n0(mk.gaz.world))}${kv(L("Import gazu", "Импорт газа"), n0(m.gasImportShare) + "%")}${kv(L("Prąd", "Электроэнергия"), n0(mk.prad.price) + " zł/MWh")}${kv(L("Produkcja prądu", "Выработка"), n0(mk.prad.prod) + " TWh")}${kv(L("Zapas gazu", "Запас газа"), n0(mk.gaz.stock / Math.max(1, mk.gaz.demand) * 360) + " " + L("dni", "дн."))}</div>
          <p>${whyBtn("gas", L("Dlaczego gaz?", "Почему газ?"))} · ${whyBtn("power", L("Dlaczego prąd?", "Почему электроэнергия?"))}</p><h4>${L("Programy energetyczne", "Энергопрограммы")}</h4>${["programs.siec", "programs.magazyny", "programs.oze", "programs.efektywnosc"].map(slider).join("")}${draftBox()}`;
      } else if (k === "nauka"){
        const found = s.innovations.found.filter(id => !s.innovations.active.some(x => x.id === id) && !s.innovations.done.some(x => x.id === id));
        h += `<div class="pl-kvs">${kv(L("Szansa na odkrycie / mies.", "Шанс открытия / мес."), n1(S.innovationChance(s) * 100) + "%")}${kv(L("Wydajność (indeks)", "Производительность"), n2(m.prod))}</div>${["programs.edukacja", "programs.badania"].map(slider).join("")}${draftBox()}
          <h4>💡 ${L("Innowacje", "Инновации")}</h4>${found.map(id => { const I = D.innovations.find(x => x.id === id); return `<div class="pl-offer"><b>${nm(I)}</b><p class="small">${L("Koszt", "Стоимость")} ${I.cost} ${L("mld zł", "млрд zł")} · ${I.months} ${L("mies.", "мес.")}</p><button class="pl-btn pri" data-inn="${id}">${L("Wdróż", "Внедрить")}</button></div>`; }).join("")}
          ${s.innovations.active.map(x => `<p class="small">⏳ ${nm(D.innovations.find(i => i.id === x.id))}: ${Math.round(x.t / (x.months * 30) * 100)}%</p>`).join("")}${s.innovations.done.map(x => `<p class="small">✅ ${nm(D.innovations.find(i => i.id === x.id))}</p>`).join("")}
          ${!found.length && !s.innovations.active.length && !s.innovations.done.length ? `<p class="muted small">${L("Jeszcze brak odkryć. Więcej R&D i edukacji = większa szansa (z opóźnieniem).", "Открытий пока нет. Больше R&D и образования — выше шанс (с задержкой).")}</p>` : ""}`;
      } else if (k === "banki"){
        h += `<div class="pl-kvs">${kv(L("Stopa efektywna", "Эффективная ставка"), n2(m.rateEff) + "%")}${kv(L("Stopa realna", "Реальная ставка"), sgn(m.realRate) + "%")}${kv(L("Kredyt (indeks)", "Кредит (индекс)"), n2(m.credit))}${kv(L("Stres banków", "Стресс банков"), n0(m.bankStress * 100) + "%")}</div>
          ${slider("rate")}<p class="small muted">${L("W grze sam ustalasz stopę (w rzeczywistości robi to niezależna RPP). Wyższa stopa: niższa inflacja i popyt, droższy kredyt — działa po kilku miesiącach.", "В игре ставку задаёте вы (в реальности — независимый RPP). Выше ставка: ниже инфляция и спрос, дороже кредит — действует через несколько месяцев.")}</p>${draftBox()}`;
      } else if (k === "dane"){
        const M = s.monthly.slice(-60), ser = (t, key, f) => `<div class="pl-dchart"><small>${t}</small>${spark(M.map(x => x[key]), 300, 60)}<b>${f(M.length ? M[M.length - 1][key] : 0)}</b></div>`;
        h += `<p class="small pl-note">${esc(D.dataNote)}</p>${M.length < 2 ? `<p class="muted">${L("Wykresy pojawią się po 2 miesiącach gry.", "Графики появятся через 2 месяца игры.")}</p>` : ""}
          ${ser(L("PKB realny", "Реальный ВВП"), "Y", n0)}${ser(L("Inflacja %", "Инфляция %"), "inflation", n1)}${ser(L("Bezrobocie %", "Безработица %"), "unemployment", n1)}${ser(L("Dług/PKB %", "Долг/ВВП %"), "debtRatio", n1)}${ser(L("Saldo handlu", "Торговое сальдо"), "tradeBalance", n0)}${ser(L("Gaz zł/MWh", "Газ zł/MWh"), "gas", n0)}
          <h4>${L("Twoje decyzje", "Ваши решения")}</h4><ul class="small">${s.decisions.slice(-15).reverse().map(d => `<li>${dateStr(d.day)} · ${esc(String(d.k))}: ${d.from != null ? esc(String(+(+d.from).toFixed(2))) + " → " : ""}${esc(String(typeof d.v === "number" ? +d.v.toFixed(2) : d.v))}</li>`).join("") || `<li class="muted">${L("Brak.", "Нет.")}</li>`}</ul>`;
      } else if (k === "ust"){
        h += `<div class="pl-oact col"><button class="pl-btn" id="plsave">💾 ${L("Zapisz grę", "Сохранить")}</button><button class="pl-btn" id="plload">📂 ${L("Wczytaj zapis", "Загрузить")}</button><button class="pl-btn" id="plnew">🆕 ${L("Nowa gra", "Новая игра")}</button><button class="pl-btn" id="pltutr">🎓 ${L("Samouczek od nowa", "Обучение заново")}</button></div>
          <p class="small muted">${L("Gra zapisuje się automatycznie co miesiąc (w tej przeglądarce).", "Игра сохраняется автоматически каждый месяц (в этом браузере).")} Seed: ${s.seed}</p><p class="small pl-note">${esc(D.dataNote)} ${L("Bez wojen, armii i budżetu obrony — z założenia gry.", "Без войн, армии и оборонного бюджета — по замыслу игры.")}</p>`;
      }
      return h;
    }
    function drawSection(){
      const box = $("#pldrawer");
      $$("#plnav [data-sec]").forEach(b => b.classList.toggle("on", b.dataset.sec === section));
      if (!section){ if (!partnerSel) box.hidden = true; return; }
      partnerSel = null;
      const sc = box.scrollTop; box.hidden = false; box.innerHTML = sectionHtml(section); box.scrollTop = sc;
      $("#pldrx").onclick = () => { section = null; draft = {}; drawSection(); };
      wireSliders(box); wire(box); drawDraft();
      $$("[data-inn]", box).forEach(b => b.onclick = () => { S.implementInnovation(s, b.dataset.inn); toast(L("Wdrażanie rozpoczęte.", "Внедрение начато.")); drawSection(); });
      const on = (id, f) => { const b = $("#" + id, box); if (b) b.onclick = f; };
      on("plsave", () => { save(); toast(L("Zapisano.", "Сохранено.")); });
      on("plload", () => { const r = S.deserialize(localStorage.getItem(LS_SAVE) || ""); if (!r.ok){ toast(L("Brak poprawnego zapisu.", "Нет корректного сохранения.")); return; } s = r.state; draft = {}; lastMonth = S.date(s.dayIndex).monthIndex; toast(L("Wczytano zapis.", "Сохранение загружено.")); refresh(true); drawSection(); });
      on("plnew", async () => { if (await confirmBox(L("Nowa gra?", "Новая игра?"), `<p>${L("Obecna gra zostanie zastąpiona.", "Текущая игра будет заменена.")}</p>`, L("Zacznij od nowa", "Начать заново"))){ s = S.newGame((Date.now() % 1e9) >>> 0); draft = {}; why = null; lastMonth = 0; save(); setSpeed(0); refresh(true); drawSection(); drawWhy(); } });
      on("pltutr", () => { tut = { done: false, step: 0 }; saveTut(); section = null; drawSection(); drawTut(); });
    }
    function openSection(k){ if (section !== k) draft = {}; section = k; showSheet(false); host.classList.remove("navopen"); drawSection(); drawMap(); tutCheck(); }
    $$("#plnav [data-sec]").forEach(b => b.onclick = () => section === b.dataset.sec ? (section = null, draft = {}, drawSection()) : openSection(b.dataset.sec));
    function openPartner(pk){
      partnerSel = pk; ui.partnerOpened = pk; section = null; draft = {};
      $$("#plnav [data-sec]").forEach(b => b.classList.remove("on"));
      const P = D.partners[pk], sp = s.partners[pk], tr = partnerTrade(pk), ev = s.events.filter(e => D.events[e.k].partner === pk);
      const box = $("#pldrawer"); box.hidden = false;
      const PH = { signal: L("sygnał", "сигнал"), stress: L("narastanie", "нарастание"), peak: L("szczyt", "пик"), recovery: L("odbudowa", "восстановление") };
      box.innerHTML = `<header><h3>${pk === "WORLD" ? "🌍" : "🏳️"} ${esc(nm(P))}</h3><button class="pl-b pl-x" id="pldrx" aria-label="${L("Zamknij", "Закрыть")}">✕</button></header>
        <div class="pl-kvs">${kv(L("Relacje", "Отношения"), n0(sp.relationship * 100) + "/100")}${kv(L("Niezawodność dostaw", "Надёжность поставок"), n0(sp.reliability * 100) + "%")}${kv(L("Trasy", "Маршруты"), n0(sp.route * 100) + "%")}${kv(L("Popyt partnera", "Спрос партнёра"), n0(sp.demand * 100) + "%")}${kv(L("Import stąd", "Импорт отсюда"), "≈" + n0(tr.imp))}${kv(L("Eksport tam", "Экспорт туда"), "≈" + n0(tr.exp))}</div>
        ${P.restricted ? `<p class="pl-note small">${L("Handel ograniczony sankcjami i barierami (wysokie „tarcie”).", "Торговля ограничена санкциями и барьерами.")}</p>` : P.eu ? `<p class="small muted">${L("Jednolity rynek UE — bez ceł.", "Единый рынок ЕС — без пошлин.")}</p>` : P.dcfta ? `<p class="small muted">${L("Umowa o wolnym handlu z UE (DCFTA), niewielkie bariery.", "Соглашение о свободной торговле с ЕС (DCFTA), небольшие барьеры.")}</p>` : ""}
        ${ev.map(e => `<p class="pl-evp">⚠ <b>${nm(D.events[e.k])}</b> — ${PH[S.phase(e)]} (${Math.round(e.t / e.len * 100)}%)</p>`).join("")}
        <h4>${L("Co płynie (mld zł/rok, szacunek)", "Что идёт (млрд zł/год, оценка)")}</h4><table class="pl-tbl sm"><tr><th></th><th>⬇️ ${L("import", "импорт")}</th><th>⬆️ ${L("eksport", "экспорт")}</th><th>${L("dostawy", "поставки")}</th></tr>${tr.byM.map(x => `<tr><td>${nm(D.markets[x.k])}</td><td>${n0(x.imp)}</td><td>${n0(x.exp)}</td><td class="${(sp.supply[x.k] ?? 1) < 0.9 ? "r" : ""}">${n0((sp.supply[x.k] ?? 1) * 100)}%</td></tr>`).join("")}</table>
        <h4>${L("Kontrakty", "Контракты")}</h4>${s.contracts.filter(c => c.partner === pk && c.status === "active").map(c => `<p class="small">🤝 ${c.type === "import" ? "⬇️" : "⬆️"} ${nm(D.markets[c.market])} · ${Math.round(c.delivery * 100)}%</p>`).join("") || `<p class="small muted">${L("Brak aktywnych.", "Нет активных.")}</p>`}
        ${s.offers.some(o => o.partner === pk) ? `<button class="pl-btn pri" id="plgooff">📨 ${L("Zobacz ofertę", "Смотреть предложение")}</button>` : ""}`;
      $("#pldrx").onclick = () => { partnerSel = null; box.hidden = true; drawMap(); };
      const g = $("#plgooff"); if (g) g.onclick = () => { rtab = "contracts"; if (isMobile()) showSheet(true); drawRight(true); };
      drawMap(); tutCheck();
    }

    // ------------------------------------------------------------ wspólne: linki, dialogi, toast, zapis
    function wire(root){
      $$("[data-why]", root).forEach(b => { if (!b.classList.contains("pl-kpi") && !b.classList.contains("pl-mini")) b.onclick = () => openWhy(b.dataset.why); });
      $$("[data-sec]", root).forEach(b => b.onclick = () => { why = null; drawWhy(); openSection(b.dataset.sec); });
    }
    function confirmBox(title, body, ok){
      return new Promise(res => { const m = $("#plmodal"); m.hidden = false;
        m.innerHTML = `<div class="pl-modin" role="dialog" aria-modal="true"><h3>${esc(title)}</h3>${body}<div class="pl-oact"><button class="pl-btn pri" id="plmok">${esc(ok)}</button><button class="pl-btn" id="plmno">${L("Anuluj", "Отмена")}</button></div></div>`;
        const done = v => { m.hidden = true; m.innerHTML = ""; res(v); };
        $("#plmok").onclick = () => done(true); $("#plmno").onclick = () => done(false); $("#plmok").focus(); });
    }
    let toastT = 0;
    function toast(t){ const b = $("#pltoast"); b.textContent = t; b.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => b.classList.remove("on"), 2600); }
    function save(){ try { localStorage.setItem(LS_SAVE, S.serialize(s)); } catch {} }
    function saveTut(){ try { localStorage.setItem(LS_TUT, JSON.stringify(tut)); } catch {} }

    // ------------------------------------------------------------ telefon: arkusze zamiast kolumn
    const isMobile = () => host.clientWidth < 900;
    function showSheet(on){ sheet = on; host.classList.toggle("sheet", on); }
    $$("#plmnav [data-m]").forEach(b => b.onclick = () => { const k = b.dataset.m;
      if (k === "sec"){ host.classList.toggle("navopen"); showSheet(false); return; }
      host.classList.remove("navopen");
      if (sheet && rtab === k){ showSheet(false); drawRight(false); return; }
      rtab = k; section = null; partnerSel = null; drawSection(); $("#pldrawer").hidden = true; showSheet(true); drawRight(true); tutCheck(); });

    // ------------------------------------------------------------ samouczek (12 kroków, można pominąć i powtórzyć)
    const TUT = [
      { t: L("Witaj w Nieurodzaju", "Добро пожаловать"), b: L("Prowadzisz gospodarkę Polski — bez wojen i armii, bez końca gry. Liczby to dane gry (przybliżone). Cel: stabilny wzrost, niska inflacja i pewne dostawy.", "Вы управляете экономикой Польши — без войн и армии, без конца игры. Числа — игровые (приблизительные). Цель: устойчивый рост, низкая инфляция и надёжные поставки.") },
      { t: L("Uruchom czas", "Запустите время"), b: L("Naciśnij 1×. Jeden dzień trwa ok. 12 sekund. Nie ma przycisku „następny miesiąc” — gospodarka żyje cały czas.", "Нажмите 1×. Один день ≈ 12 секунд. Кнопки «следующий месяц» нет — экономика живёт постоянно."), sel: "#plspeed", wait: () => clock.speed > 0 },
      { t: L("Pauza i tempo", "Пауза и скорость"), b: L("⏸ zatrzymuje czas (np. na spokojne decyzje), 2× i 5× przyspieszają. Wynik nie zależy od tempa — tylko od decyzji. Spacja = pauza.", "⏸ останавливает время, 2× и 5× ускоряют. Результат зависит не от скорости, а от решений. Пробел = пауза."), sel: "#plspeed" },
      { t: L("Wskaźniki", "Показатели"), b: L("Na górze kluczowe liczby. Kliknij „Inflacja”, aby zobaczyć, skąd się bierze.", "Сверху ключевые числа. Нажмите «Инфляция», чтобы увидеть её причины."), sel: "#plkpi", wait: () => ui.whyOpened },
      { t: L("Panel „Dlaczego?”", "Панель «Почему?»"), b: L("Przyczyny są uszeregowane: główna i dodatkowe, plus łańcuch skutków i możliwe działania. Bez zmyślonych procentów.", "Причины ранжированы: главная и дополнительные, плюс цепочка и возможные действия. Без выдуманных процентов."), sel: "#plwhy" },
      { t: L("Mapa", "Карта"), b: L("Trasy pokazują handel z partnerami. Kliknij Niemcy (DE) — naszego największego partnera.", "Маршруты показывают торговлю с партнёрами. Нажмите Германию (DE) — крупнейшего партнёра."), sel: "#plmapwrap", wait: () => ui.partnerOpened === "DE", pre: () => { why = null; drawWhy(); } },
      { t: L("Zakłócenia", "Сбои"), b: L("Grubość trasy = wartość handlu. Pomarańczowa przerywana linia i ⚠ oznaczają kłopoty partnera (susza, sztorm). Wtedy maleją dostawy i rosną ceny.", "Толщина = объём торговли. Оранжевая пунктирная линия и ⚠ — проблемы у партнёра (засуха, шторм). Поставки падают, цены растут."), sel: "#plmapwrap" },
      { t: L("Kontrakty", "Контракты"), b: L("Otwórz zakładkę „Kontrakty”.", "Откройте вкладку «Контракты»."), sel: "#plrtabs", msel: "#plmnav", wait: () => rtab === "contracts" && (!isMobile() || sheet), pre: () => { partnerSel = null; $("#pldrawer").hidden = true; drawMap(); } },
      { t: L("Oferty", "Предложения"), b: L("Każda oferta ma ocenę: wartość, porównanie z rynkiem, ryzyko partnera, wpływ na rynek krajowy. Możesz zaakceptować, negocjować albo odrzucić. Zerwanie kontraktu = kara i utrata zaufania.", "У каждого предложения есть оценка: стоимость, сравнение с рынком, риск партнёра, влияние на внутренний рынок. Можно принять, торговаться или отклонить. Разрыв = штраф и потеря доверия."), sel: "#plright" },
      { t: L("Inwestycje działają z opóźnieniem", "Инвестиции работают с задержкой"), b: L("Otwórz sekcję „Energia”. Suwaki programów pokazują, kiedy pojawi się efekt — np. OZE dopiero po 2,5–6 latach.", "Откройте раздел «Энергетика». Ползунки программ показывают, когда появится эффект — например, ВИЭ через 2,5–6 лет."), sel: "#plnav", msel: "#plmnav", wait: () => section === "energia", pre: () => showSheet(false) },
      { t: L("Doradca", "Советник"), b: L("Co miesiąc doradca przygotowuje raport: prognozy na 12/36/60 mies., cele, pewność i plan. „Zastosuj” zawsze wymaga Twojego potwierdzenia. Otwórz zakładkę „Doradca”.", "Каждый месяц советник готовит доклад: прогнозы на 12/36/60 мес., цели, уверенность и план. «Применить» всегда требует подтверждения. Откройте вкладку «Советник»."), sel: "#plrtabs", msel: "#plmnav", wait: () => rtab === "advisor" && (!isMobile() || sheet), pre: () => { section = null; drawSection(); } },
      { t: L("Zapytaj", "Спросите"), b: L("Wpisz pytanie, np. „dlaczego gaz drożeje?”, albo wybierz temat z listy. Zapis gry: Ustawienia → Zapisz / Wczytaj / Nowa gra.", "Введите вопрос, например «почему дорожает газ?», или выберите тему. Сохранение: Настройки → Сохранить / Загрузить / Новая игра."), sel: "#plchat", wait: () => ui.asked },
    ];
    function drawTut(){
      $$(".pl-hl").forEach(x => x.classList.remove("pl-hl"));
      const box = $("#pltutbox");
      if (tut.done){ box.hidden = true; return; }
      const st = TUT[tut.step]; if (!st){ tut.done = true; saveTut(); box.hidden = true; return; }
      const sel = isMobile() && st.msel ? st.msel : st.sel; if (sel) $(sel)?.classList.add("pl-hl");
      const waiting = st.wait && !st.wait();
      box.hidden = false;
      box.innerHTML = `<div class="pl-tutin"><small>${L("Samouczek", "Обучение")} ${tut.step + 1}/${TUT.length}</small><i class="pl-tbar"><b style="width:${((tut.step + 1) / TUT.length * 100).toFixed(0)}%"></b></i><h4>${esc(st.t)}</h4><p>${esc(st.b)}</p>
        <div class="pl-oact">${waiting ? `<span class="small muted">👉 ${L("Wykonaj to, by przejść dalej", "Сделайте это, чтобы продолжить")}</span>` : `<button class="pl-btn pri" id="pltnext">${tut.step === TUT.length - 1 ? L("Gotowe", "Готово") : L("Dalej", "Далее")}</button>`}<button class="pl-btn" id="pltskip">${L("Pomiń", "Пропустить")}</button></div></div>`;
      const nx = $("#pltnext"); if (nx) nx.onclick = () => { tut.step++; if (tut.step >= TUT.length) tut.done = true; saveTut(); TUT[tut.step]?.pre?.(); drawTut(); };
      $("#pltskip").onclick = () => { tut.done = true; saveTut(); drawTut(); };
    }
    function tutCheck(){ if (tut.done) return; const st = TUT[tut.step]; if (st?.wait && st.wait()){ tut.step++; if (tut.step >= TUT.length) tut.done = true; saveTut(); TUT[tut.step]?.pre?.(); } drawTut(); }
    $("#pltut").onclick = () => { tut = { done: false, step: 0 }; saveTut(); drawTut(); };

    // ------------------------------------------------------------ pętla czasu
    function refresh(force){
      drawTop(); drawKpis(); drawMap(); drawBottom(); drawRight(force);
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
        if (mi !== lastMonth){ save(); toast("📋 " + L("Nowy raport doradcy", "Новый доклад советника")); lastMonth = mi; }
      }
      sinceWhy += dt;
      if (n){ drawKpis(); drawMap(); drawBottom(); drawRight(false);
        if (why && sinceWhy > 3000){ drawWhy(); sinceWhy = 0; }
        if (section && !$("#pldrawer").contains(document.activeElement) && !Object.keys(draft).length && s.dayIndex % 5 === 0) drawSection(); }
      drawTop();
      requestAnimationFrame(loop);
    }
    function onKey(e){
      if (!host.isConnected || !$("#plmodal").hidden) return;
      if (e.key === "Escape"){ if (why){ why = null; drawWhy(); } else if (section || partnerSel){ section = null; partnerSel = null; draft = {}; drawSection(); $("#pldrawer").hidden = true; drawMap(); } else if (sheet) showSheet(false); }
      if (e.key === " " && (e.target === document.body || e.target === host)){ e.preventDefault(); setSpeed(clock.speed ? 0 : 1); }
    }
    document.addEventListener("keydown", onKey);
    buildMap(); lastMonth = S.date(s.dayIndex).monthIndex; refresh(true); drawTut();
    requestAnimationFrame(loop);
    window.__plGame = { get state(){ return s; }, clock };   // dostęp dla testów (Playwright)
  }

  window.BrainstormGame = { mount };
})();
