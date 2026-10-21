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
    // zmiana jako kolorowa strzałka: good = +1 (wzrost dobry), −1 (wzrost zły), 0 (neutralnie)
    const dl = (v, f = n1, good = 1, unit = "") => { const z = Math.abs(v) < 0.05 * (f === n0 ? 10 : 1); const c = z ? "z" : good === 0 ? "n" : (v > 0) === (good > 0) ? "g" : "r";
      return `<span class="pl-d ${c}">${z ? "•" : v > 0 ? "▲" : "▼"} ${f(Math.abs(v))}${unit}</span>`; };
    const lvl = (v, f = n1, unit = "") => `<span class="${v < 0 ? "r" : "g"}">${f(v)}${unit}</span>`;
    const MSHORT = lang === "ru" ? ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"] : ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
    // słupki SVG (przewijane w poziomie, gdy jest ich dużo)
    function barChart(items, fmt = n1, unit = ""){
      if (!items.length) return `<p class="muted small">${L("Dane pojawią się po pierwszym pełnym miesiącu gry.", "Данные появятся после первого полного месяца игры.")}</p>`;
      const bw = 34, W = Math.max(300, items.length * bw), H = 150, top = 18, bot = 22, vals = items.map(x => x.v);
      const mx = Math.max(0, ...vals), mn = Math.min(0, ...vals), r = (mx - mn) || 1, y = v => top + (mx - v) / r * (H - top - bot);
      let g = `<line x1="0" x2="${W}" y1="${y(0).toFixed(1)}" y2="${y(0).toFixed(1)}" class="zero"/>`;
      const step = W / items.length;
      items.forEach((it, i) => { const x = i * step + step * 0.16, w = step * 0.68, y0 = y(0), yv = y(it.v);
        g += `<g class="${it.cls || "n"}"><rect x="${x.toFixed(1)}" y="${Math.min(y0, yv).toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(1, Math.abs(yv - y0)).toFixed(1)}" rx="2"><title>${esc(it.label)}: ${fmt(it.v)}${unit}</title></rect><text x="${(x + w / 2).toFixed(1)}" y="${(it.v >= 0 ? yv - 4 : yv + 11).toFixed(1)}" class="v">${fmt(it.v)}</text><text x="${(x + w / 2).toFixed(1)}" y="${H - 6}" class="l">${esc(it.label)}</text></g>`; });
      return `<div class="pl-bars"><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg></div>`;
    }
    const SERIES = { gdp: ["growthYoY", n1, "%", v => v >= 3 ? "g" : v < 0 ? "r" : "w"], inflation: ["inflation", n1, "%", v => v >= 2 && v <= 4 ? "g" : v > 5 ? "r" : "w"], unemployment: ["unemployment", n1, "%", v => v <= 6 ? "g" : v > 8 ? "r" : "w"],
      debt: ["debtRatio", n1, "%", v => v <= 60 ? "g" : v > 65 ? "r" : "w"], npl: ["npl", n1, "%", v => v <= 5 ? "g" : v > 8 ? "r" : "w"], capital: ["capital", n1, "%", v => v >= 15 ? "g" : v < 13 ? "r" : "w"], budget: ["balance", n0, "", v => v >= 0 ? "g" : "r"], trade: ["tradeBalance", n0, "", v => v >= 0 ? "g" : "w"], gas: ["gas", n0, "", () => "n"], power: ["power", n0, "", () => "n"], grain: ["grain", n0, "", () => "n"],
      exports: ["X", n0, "", () => "n"], imports: ["M", n0, "", () => "n"], mood: ["mood", n0, "", v => v >= 55 ? "g" : v < 40 ? "r" : "w"], food: ["food", v => n0(v * 100), "", () => "n"], realIncome: ["realIncome", v => n1((v - 1) * 100), "%", v => v >= 1 ? "g" : "r"] };
    function seriesItems(key, mode){
      const [f, , , cl] = SERIES[key], M = s.monthly.filter(z => z[f] != null);
      if (mode === "m") return M.slice(-24).map(z => { const d = S.date(Math.max(0, z.day - 1)); return { label: MSHORT[d.month] + (d.month === 0 ? " " + String(d.year).slice(2) : ""), v: z[f], cls: cl(z[f]) }; });
      const by = {}; M.forEach(z => { const y = S.date(Math.max(0, z.day - 1)).year; (by[y] = by[y] || []).push(z[f]); });
      const cy = S.date(s.dayIndex).year;
      return Object.entries(by).map(([y, a]) => { const v = a.reduce((p, c) => p + c, 0) / a.length; return { label: y + (+y === cy ? "*" : ""), v, cls: cl(v) }; });
    }
    const seriesChart = (key, mode) => { const [, fmt, unit] = SERIES[key]; return barChart(seriesItems(key, mode), fmt, unit); };

    const helpOpen = new Set(), helpGas = {};
    const ENERGY_P = ["oze", "efektywnosc", "magazyny", "siec"];
    // ile % importu gazu zastąpimy przy podanej zmianie polityki (1 / 3 / 5 lat)
    let baseProjCache = null;
    const baseProj = () => { const k = s.dayIndex; if (!baseProjCache || baseProjCache.k !== k) baseProjCache = { k, p: S.project(s, 60) }; return baseProjCache.p; };
    const gasReplace = patch => { const a = baseProj(), b = S.project(s, 60, patch); return [11, 35, 59].map(i => Math.max(0, (1 - b[i].gasImp / a[i].gasImp) * 100)); };
    // ------------------------------------------------------------ opis decyzji: co to jest, skutki zwiększenia i zmniejszenia w czasie, postęp programu
    const termOpen = new Set();
    const term = (k, label) => `<button class="pl-term" data-term="${k}" aria-expanded="${termOpen.has(k)}">${esc(label)} <i>?</i></button>${termOpen.has(k) ? `<span class="pl-gl">${esc(window.PLLearn.GLOSSARY[k][li])}</span>` : ""}`;
    function helpBox(key){
      const H = window.PLLearn.policyHelp(key, s, lang); if (!H) return "";
      const HZ = [["now", L("Teraz", "Сейчас")], ["m", L("3–12 mies.", "3–12 мес.")], ["y", L("1–3 lata", "1–3 года")], ["long", L("Długi okres", "Долгий срок")]];
      const col = (o, t, cls) => `<div><b class="${cls}">${t}</b><dl>${HZ.map(([k, h]) => `<dt>${h}</dt><dd>${esc(o[k])}</dd>`).join("")}</dl></div>`;
      let gas = "", prog = "";
      if (key.startsWith("programs.") && ENERGY_P.includes(key.slice(9))){
        const pk = key.slice(9), ck = pk + ":" + S.date(s.dayIndex).monthIndex;
        if (!helpGas[ck]) helpGas[ck] = gasReplace({ programs: { [pk]: Math.min(D.programs[pk].max, s.policy.programs[pk] + 10) } });
        const g = helpGas[ck];
        gas = `<p class="pl-gasr">${ic("flame")}${L("Gdyby dodać +10 mld zł/rok: zastąpimy", "Если добавить +10 млрд zł/год: заменим")} <b>${n1(g[0])}%</b> / <b>${n1(g[1])}%</b> / <b>${n1(g[2])}%</b> ${L("importu gazu po 1 / 3 / 5 latach (prognoza modelu)", "импорта газа через 1 / 3 / 5 лет (прогноз модели)")}</p>`;
      }
      if (H.progress){ const p = H.progress;
        prog = `<div class="pl-prog"><b>${L("Postęp efektu programu", "Прогресс эффекта программы")}</b> <small class="muted">(${L("to nie postęp budowy", "это не прогресс строительства")})</small><p class="small">${esc(p.text)}${p.share != null ? " " + L(`Osiągnięto ok. ${n0(p.share * 100)}% drogi do efektu docelowego.`, `Пройдено около ${n0(p.share * 100)}% пути к целевому эффекту.`) : ""}</p>${p.share != null ? `<i class="pl-pbar"><b style="width:${(p.share * 100).toFixed(0)}%"></b></i>` : ""}</div>`; }
      return `<div class="pl-help"><p><b>${esc(H.what)}</b>${H.lag ? ` <span class="muted">· ${L("opóźnienie efektu", "задержка эффекта")}: ${esc(H.lag)}</span>` : ""}</p>
        <div class="pl-hcols">${col(H.up, "▲ " + L("Jeśli zwiększysz", "Если увеличить"), "hu")}${col(H.down, "▼ " + L("Jeśli zmniejszysz", "Если уменьшить"), "hd")}</div>${H.note ? `<p class="small muted">${esc(H.note)}</p>` : ""}${prog}${gas}
        <p class="small muted">${L("Opisujemy tylko mechanizmy obecne w modelu gry.", "Описаны только механизмы, которые есть в модели игры.")}</p></div>`;
    }
    const SER_LABEL = { gdp: L("wzrost realnego PKB względem tego samego miesiąca rok wcześniej (%)", "рост реального ВВП к тому же месяцу год назад (%)"), inflation: L("inflacja r/r (%)", "инфляция г/г (%)"), unemployment: L("stopa bezrobocia (%)", "уровень безработицы (%)"),
      debt: L("dług publiczny (% PKB)", "госдолг (% ВВП)"), budget: L("saldo budżetu w tempie rocznym (mld zł/rok)", "сальдо бюджета в годовом темпе (млрд zł/год)"), trade: L("saldo handlu towarami (mld zł/rok)", "сальдо торговли товарами (млрд zł/год)"),
      gas: L("cena gazu (zł/MWh)", "цена газа (zł/MWh)"), power: L("cena prądu (zł/MWh)", "цена электроэнергии (zł/MWh)"), grain: L("cena zboża (zł/t)", "цена зерна (zł/t)"), food: L("ceny żywności (indeks, start = 100)", "цены на еду (индекс, старт = 100)"),
      exports: L("eksport (mld zł/rok)", "экспорт (млрд zł/год)"), imports: L("import (mld zł/rok)", "импорт (млрд zł/год)"), mood: L("nastroje społeczne (0–100)", "общественные настроения (0–100)"), realIncome: L("zmiana dochodu realnego od startu (%)", "изменение реального дохода со старта (%)"),
      npl: L("złe kredyty (% kredytów)", "плохие кредиты (% кредитов)"), capital: L("kapitał banków (% aktywów ważonych ryzykiem)", "капитал банков (% активов с учётом риска)") };
    const SER_DESC = (key, mode) => (mode === "y" ? L("Każdy słupek = średnia z miesięcy w roku kalendarzowym (* = rok w toku): ", "Каждый столбец = среднее по месяцам календарного года (* = текущий год): ") : L("Każdy słupek = stan na koniec miesiąca: ", "Каждый столбец = значение на конец месяца: ")) + (SER_LABEL[key] || "") + ".";
    // ------------------------------------------------------------ stan
    let s = null;
    let oldSave = false;
    try { const raw = localStorage.getItem(LS_SAVE); if (raw){ const r = S.deserialize(raw); if (r.ok) s = r.state; else oldSave = r.error === "old"; } } catch {}
    if (!s) s = S.newGame((Date.now() % 1e9) >>> 0);
    let tut = { done: false, step: 0 };
    try { tut = JSON.parse(localStorage.getItem(LS_TUT) || "null") || tut; } catch {}
    const clock = S.createClock({ daySec: 12, maxCatchUp: 2 });
    let dataMode = "m", whyTab = "why", chatFull = false, section = null, ov = null, ovBuilt = null, why = null, partnerSel = null, draft = {}, lastMonth = -1, sigRight = "", sigOv = "", chatHtml = "", chatPath = [];
    const ui = { whyOpened: false, partnerOpened: null, asked: false };
    ctx.track?.("game", "pl_open");

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull pl"; document.body.appendChild(host); document.body.classList.add("gaming");
    const $ = (q, r = host) => r.querySelector(q), $$ = (q, r = host) => [...r.querySelectorAll(q)];

    const SECTIONS = [["gosp", "chart", L("Przegląd gospodarki", "Обзор экономики")], ["sektory", "factory", L("Sektory", "Секторы")], ["spol", "people", L("Społeczeństwo", "Общество")],
      ["budzet", "coins", L("Budżet", "Бюджет")], ["edukacja", "cap", L("Edukacja", "Образование")], ["nauka", "flask", L("Nauka i R&D", "Наука и R&D")],
      ["energia", "bolt", L("Energia", "Энергетика")], ["infra", "anchor", L("Transport i sieci", "Транспорт и сети")],
      ["handel", "globe", L("Handel", "Торговля")], ["banki", "bank", L("Banki", "Банки")], ["dyplo", "doc", L("Dyplomacja", "Дипломатия")],
      ["advisor", "user", L("Doradca", "Советник")], ["dane", "data", L("Dane i historia", "Данные и история")], ["teoria", "cap", L("Teoria", "Теория")], ["ust", "gear", L("Ustawienia", "Настройки")]];
    // nawigacja: 5 grup; sekcje grupy to zakładki w obszarze roboczym
    const GROUPS = [["econ", "chart", L("Gospodarka", "Экономика"), ["gosp", "sektory", "spol"]], ["gov", "bank", L("Państwo", "Государство"), ["budzet", "edukacja", "nauka"]], ["infra", "bolt", L("Infra\u00ADstruktura", "Инфра\u00ADструктура"), ["energia", "infra"]],
      ["markets", "globe", L("Rynki", "Рынки"), ["handel", "banki", "dyplo"]], ["analysis", "data", L("Analiza", "Анализ"), ["advisor", "dane", "teoria", "ust"]]];
    const groupOf = k => GROUPS.find(g => g[3].includes(k));
    const lastInGroup = {};
    let learnSel = "gdp";
    const PROG_SEC = { siec: "infra", magazyny: "energia", oze: "energia", efektywnosc: "energia", logistyka: "infra", edukacja: "edukacja", badania: "nauka", rolnictwo: "sektory", przemysl: "sektory" };
    const targetSection = t => !t ? null : t.startsWith("programs.") ? PROG_SEC[t.slice(9)] : t.startsWith("reserve.") || t === "trade" ? "handel" : t === "rate" ? "banki" : ["social", "health"].includes(t) ? "spol" : ["vat", "pit", "cit", "admin", "budget"].includes(t) ? "budzet" : null;

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
        <nav class="pl-nav" id="plnav" aria-label="${L("Menu gry", "Меню игры")}"><button class="pl-navt" id="plnavt" aria-label="${L("Zwiń / rozwiń menu", "Свернуть / развернуть меню")}" title="${L("Zwiń / rozwiń menu", "Свернуть / развернуть меню")}">${ic("data")}<span>${L("Menu", "Меню")}</span></button>${GROUPS.map(([g, i, t, secs]) => `<div class="pl-ng" data-group-box="${g}"><small>${t}</small>${secs.map(x => { const T = SECTIONS.find(z => z[0] === x); return `<button ${x === "advisor" ? `data-ov="advisor"` : `data-sec="${x}"`} data-nsec="${x}" title="${T[2]}" aria-label="${T[2]}">${ic(T[1])}<span>${T[2]}</span></button>`; }).join("")}</div>`).join("")}</nav>
        <div class="pl-mapwrap" id="plmapwrap"><svg class="pl-map" id="plmap" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" aria-label="${L("Mapa Polski i partnerów", "Карта Польши и партнёров")}"></svg>
          <details class="pl-legend" id="plleg"${innerHeight > 820 ? " open" : ""}><summary>${L("Legenda", "Легенда")}</summary><div class="pl-legi"><span><i class="lg-r"></i>${L("przemysł", "промышленность")}</span><span><i class="lg-e"></i>${L("energia", "энергия")}</span><span><i class="lg-f"></i>${L("żywność", "еда")}</span><span>${L("grubość/liczba = handel, mld zł/rok", "толщина/число = торговля, млрд zł/год")}</span><span><i class="lg-b"></i>${L("zakłócenia", "сбои")}</span><span><i class="lg-c"></i>${L("kontrakt", "контракт")}</span><em>${L("dane gry, przybliżone", "игровые данные, приблизительно")}</em></div></details>
          <div class="pl-alerts" id="plalerts"></div><aside class="pl-right" id="plright"></aside><aside class="pl-drawer" id="pldrawer" hidden></aside>
        </div>
        <div class="pl-ov" id="plov" hidden></div>
      </div>
      <nav class="pl-mnav" id="plmnav"><button data-m="sec">${ic("chart")}<span>${L("Sekcje", "Разделы")}</span></button><button data-m="advisor">${ic("user")}<span>${L("Doradca", "Советник")}</span></button><button data-m="news">${ic("news")}<span>${L("Wiadomości", "Новости")}</span></button><button data-m="contracts">${ic("doc")}<span>${L("Kontrakty", "Контракты")}</span></button></nav>
      <div class="pl-why" id="plwhy" hidden></div>
      <div class="pl-modal" id="plmodal" hidden></div>
      <div class="pl-tut" id="pltutbox" hidden></div>
      <div class="pl-toast" id="pltoast"></div>`;

    // ------------------------------------------------------------ mapa (SVG, prosta i lekka)
    const proj = (lon, lat) => [290 + (lon - 14.1) / 10 * 420, 170 + (54.9 - lat) / 5.9 * 380];
    const PL_OUT = [[14.2, 53.9], [16.0, 54.25], [17.5, 54.75], [18.6, 54.72], [18.6, 54.4], [19.6, 54.45], [22.8, 54.36], [23.5, 53.9], [23.9, 53.15], [23.6, 52.6], [23.2, 52.25], [23.6, 51.6], [24.1, 51.0], [23.6, 50.4], [22.7, 49.6], [22.6, 49.1], [21.0, 49.4], [19.8, 49.2], [18.9, 49.5], [18.0, 50.0], [16.9, 50.4], [16.3, 50.7], [15.0, 51.0], [14.8, 51.6], [14.6, 52.4], [14.2, 52.9], [14.4, 53.3]];
    const CITIES = [["Warszawa", 21.0, 52.23, 1], ["Kraków", 19.94, 50.06], ["Łódź", 19.46, 51.76], ["Wrocław", 17.03, 51.1], ["Poznań", 16.93, 52.4], ["Gdańsk", 18.65, 54.35, 0, "anchor"], ["Szczecin", 14.55, 53.43], ["Świnoujście", 14.25, 53.9, 0, "tank"], ["Górny Śląsk", 19.02, 50.26, 0, "factory"], ["Lublin", 22.57, 51.25], ["Białystok", 23.16, 53.13], ["Rzeszów", 22.0, 50.04], ["Bełchatów", 19.33, 51.27, 0, "plant"], ["Wielkopolska", 17.3, 52.05, 0, "wheat"]];
    const ENTRY = { DE: [14.6, 52.4], CZ: [16.5, 50.55], SK: [20.5, 49.35], LT: [23.3, 54.05], UA: [23.9, 50.7], BY: [23.6, 52.35], FR: [15.1, 51.1], EU: [14.5, 53.5], WORLD: [18.65, 54.45] };
    // uproszczone kontury sąsiadów (tylko tło, bez szczegółów)
    const NEIGH = { DE: [[6, 55], [9.5, 54.9], [11, 54.4], [13, 54.6], [14.2, 53.9], [14.4, 53.3], [14.2, 52.9], [14.6, 52.4], [14.8, 51.6], [15.0, 51.0], [14.3, 50.9], [12.5, 50.3], [12.1, 50.3], [13.8, 48.8], [13, 47.5], [6, 47.5]],
      CZ: [[12.1, 50.3], [12.5, 50.3], [14.3, 50.9], [15.0, 51.0], [16.3, 50.7], [16.9, 50.4], [18.0, 50.0], [18.9, 49.5], [18.8, 49.4], [17.2, 48.8], [16.9, 48.6], [15.0, 48.9], [13.8, 48.8]],
      SK: [[18.9, 49.5], [19.8, 49.2], [21.0, 49.4], [22.6, 49.1], [22.4, 48.4], [20.5, 48.1], [18.8, 47.8], [17.2, 48.0], [16.9, 48.6], [17.2, 48.8], [18.8, 49.4]],
      UA: [[22.6, 49.1], [22.7, 49.6], [23.6, 50.4], [24.1, 51.0], [23.6, 51.6], [25, 51.9], [27, 51.6], [30, 51.4], [32, 52.1], [32, 45], [22, 45], [22.4, 48.4]],
      BY: [[23.6, 51.6], [23.2, 52.25], [23.6, 52.6], [23.9, 53.15], [23.5, 53.9], [24.5, 54.0], [25.7, 54.3], [26.6, 55.6], [28, 56.2], [32, 56], [32, 52.1], [30, 51.4], [27, 51.6], [25, 51.9]],
      LT: [[22.8, 54.36], [23.5, 53.9], [24.5, 54.0], [25.7, 54.3], [26.6, 55.6], [25, 56.3], [21.1, 56.1], [21.0, 55.3]],
      KG: [[19.6, 54.45], [22.8, 54.36], [21.0, 55.3], [19.9, 54.95]] };
    const CAT = { gaz: "en", prad: "en", paliwa: "en", zboze: "fd", zywnosc: "fd", maszyny: "in", przemyslowe: "in", konsumpcyjne: "in" };
    const ppos = k => { const P = D.partners[k]; return [40 + P.x * 920, 40 + P.y * 620]; };
    const mapIc = (n, sc = 0.7) => `<g class="pl-mapic" transform="translate(${-12 * sc},${-12 * sc}) scale(${sc})">${ICON[n]}</g>`;
    function buildMap(){
      const svg = $("#plmap"), pts = PL_OUT.map(p => proj(...p).map(Math.round).join(",")).join(" "), [lx, ly] = proj(18.0, 52.95);
      const A = window.PLMapArt, lite = isMobile();
      const nb = Object.entries(NEIGH).map(([k, ps]) => `<polygon points="${ps.map(p => proj(...p).map(Math.round).join(",")).join(" ")}" class="pl-nb${k === "KG" ? " kg" : ""}" data-nb="${k}"/>`).join("")
        + [[[21.1, 56.1], [25, 56.3], [26.6, 55.6], [28, 56.2], [32, 56], [45, 56], [45, 62], [21, 62]], [[-10, 47.5], [6, 47.5], [13, 47.5], [17.2, 48.0], [18.8, 47.8], [20.5, 48.1], [22.4, 48.4], [22, 45], [32, 45], [45, 45], [45, 30], [-10, 30]], [[32, 45], [32, 56], [45, 56], [45, 45]]].map(ps => `<polygon points="${ps.map(p => proj(...p).map(Math.round).join(",")).join(" ")}" class="pl-nb fill"/>`).join("");
      let h = `<defs>${A.defs()}</defs>
        <rect x="-1200" y="-800" width="3400" height="2400" fill="#2f4129"/>
        <path d="M-1200 -800 H2200 V250 H-1200 Z" fill="url(#plsea2)"/><path d="M-1200 -800 H2200 V250 H-1200 Z" fill="url(#plwave)" class="pl-waves"/>
        ${A.terrain(proj, { lite, neighbours: nb })}${A.border(proj)}${A.industry(proj)}
        <text x="330" y="122" class="pl-sea">${L("Morze Bałtyckie", "Балтийское море")}</text>
        <g id="pllive" pointer-events="none"></g>
        <text x="${lx.toFixed(0)}" y="${ly.toFixed(0)}" class="pl-plname">${L("POLSKA", "ПОЛЬША")}</text>
        ${lite ? "" : A.clouds()}
        <g id="plroutes"></g><g id="pltraffic" pointer-events="none"></g><g id="plcities">`;
      for (const [n, lo, la, cap, kind] of CITIES){ const [x, y] = proj(lo, la);
        h += kind ? `<g class="pl-poi" data-poi="${kind}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})" tabindex="0" role="button" aria-label="${esc(n)}"><rect x="-12" y="-12" width="24" height="24" rx="6"/>${mapIc(kind)}<text class="pl-cn" x="16" y="5">${n}</text></g>`
          : `<g class="pl-city" transform="translate(${x.toFixed(0)},${y.toFixed(0)})">${A.skyline(-10, 2, cap)}<circle r="${cap ? 6 : 4.5}"/><text class="pl-cn${cap ? " cap" : ""}" x="9" y="5">${n}</text></g>`; }
      h += `</g><g id="plpartners">`;
      for (const k of S.PK){ const [x, y] = ppos(k), P = D.partners[k];
        h += `<g class="pl-partner${P.restricted ? " restr" : ""}" data-p="${k}" transform="translate(${x.toFixed(0)},${y.toFixed(0)})" tabindex="0" role="button" aria-label="${esc(nm(P))}"><circle r="25" class="ring"/><circle r="20" class="core"/><svg x="-12" y="-8" width="24" height="16" viewBox="0 0 30 20">${flagInner(k)}</svg><text y="43" text-anchor="middle" class="pl-pn">${esc(nm(P)).toUpperCase()}</text><g class="pl-pev"></g></g>`; }
      h += `</g><g id="plevpl"></g>`;
      svg.innerHTML = h;
      $$(".pl-partner").forEach(g => { const open = () => openPartner(g.dataset.p); g.onclick = open; g.onkeydown = e => { if (e.key === "Enter") open(); }; });
      $$(".pl-poi").forEach(g => { const open = () => openObject(g.dataset.poi); g.onclick = open; g.onkeydown = e => { if (e.key === "Enter") open(); }; });
    }
    // obiekty gospodarcze na mapie — każdy pokazuje tylko wskaźniki krajowe z symulacji (model nie ma regionów)
    let objSel = null;
    const stockDays = k => { const q = s.markets[k]; return q.stock / Math.max(1e-6, q.demand) * 365; };
    const OBJ = {
      anchor: () => ({ t: L("Porty Gdańsk i Gdynia", "Порты Гданьск и Гдыня"), why: "trade", sec: "infra", sev: s.macro.freight > 1.25 ? 2 : s.macro.freight > 1.1 ? 1 : 0,
        rows: [[L("Koszt frachtu (indeks, start = 1,00)", "Стоимость фрахта (индекс, старт = 1,00)"), n2(s.macro.freight)], [L("Program logistyki — efekt (×)", "Программа логистики — эффект (×)"), n2(s.programs.logistyka.eff)], [L("Eksport towarów (mld zł/rok)", "Экспорт товаров (млрд zł/год)"), n0(s.macro.X)], [L("Import towarów (mld zł/rok)", "Импорт товаров (млрд zł/год)"), n0(s.macro.M)]] }),
      tank: () => { const g = s.markets.gaz, d = stockDays("gaz"); return { t: L("Terminal LNG Świnoujście i Baltic Pipe", "СПГ-терминал Свиноуйсьце и Baltic Pipe"), why: "gas", sec: "energia", sev: g.shortage > 0.01 ? 2 : (d < 25 || g.imp > 0.95 * g.impCap) ? 1 : 0,
        rows: [[L("Cena gazu (zł/MWh)", "Цена газа (zł/MWh)"), n0(g.price)], [L("Import gazu (TWh/rok)", "Импорт газа (TWh/год)"), n0(g.imp)], [L("Wykorzystanie przepustowości importu", "Загрузка импортных мощностей"), n0(g.imp / Math.max(1, g.impCap) * 100) + "%"], [L("Udział importu w zużyciu", "Доля импорта в потреблении"), n0(s.macro.gasImportShare * 100) + "%"], [L("Zapasy (dni zużycia)", "Запасы (дней потребления)"), n0(d)], [L("Niedobór", "Дефицит"), g.shortage > 0.005 ? n1(g.shortage * 100) + "%" : L("brak", "нет")]] }; },
      plant: () => { const q = s.markets.prad; return { t: L("Energetyka (Bełchatów i sieć krajowa)", "Энергетика (Белхатув и национальная сеть)"), why: "power", sec: "energia", sev: q.shortage > 0.01 ? 2 : q.price > 1.3 * D.markets.prad.price ? 1 : 0,
        rows: [[L("Cena prądu (zł/MWh)", "Цена электроэнергии (zł/MWh)"), n0(q.price)], [L("Produkcja krajowa (TWh/rok)", "Внутреннее производство (TWh/год)"), n0(q.prod)], [L("Zużycie (TWh/rok)", "Потребление (TWh/год)"), n0(q.demand)], [L("Modernizacja sieci — efekt (×)", "Модернизация сети — эффект (×)"), n2(s.programs.siec.eff)], [L("OZE — efekt (×)", "ВИЭ — эффект (×)"), n2(s.programs.oze.eff)]] }; },
      factory: () => { const x = s.sectors.przemysl; return { t: L("Górny Śląsk — przemysł", "Верхняя Силезия — промышленность"), why: topicOfMarket("przemyslowe"), sec: "sektory", sev: x.utilization > 0.99 ? 1 : x.output < 0.9 ? 2 : x.output < 0.96 ? 1 : 0,
        rows: [[L("Produkcja przemysłu (indeks, start = 1,00)", "Выпуск промышленности (индекс, старт = 1,00)"), n2(x.output)], [L("Wykorzystanie mocy", "Загрузка мощностей"), n0(x.utilization * 100) + "%"], [L("Konkurencyjność (indeks)", "Конкурентоспособность (индекс)"), n2(x.competitiveness)], [L("Pracujący (mln)", "Занятые (млн)"), n2(x.jobs)]] }; },
      wheat: () => { const q = s.markets.zboze, x = s.sectors.rolnictwo, d = stockDays("zboze"); return { t: L("Rolnictwo (Wielkopolska i kraj)", "Сельское хозяйство (Великопольша и страна)"), why: "grain", sec: "sektory", sev: q.shortage > 0.01 ? 2 : (d < 30 || q.price > 1.3 * D.markets.zboze.price) ? 1 : 0,
        rows: [[L("Cena zboża", "Цена зерна"), priceStr("zboze", q.price)], [L("Zbiory (mln t/rok)", "Урожай (млн т/год)"), n1(q.prod)], [L("Zapasy (dni zużycia)", "Запасы (дней потребления)"), n0(d)], [L("Produkcja rolnictwa (indeks)", "Выпуск сельского хозяйства (индекс)"), n2(x.output)], [L("Program rolny — efekt (×)", "Аграрная программа — эффект (×)"), n2(s.programs.rolnictwo.eff)]] }; } };
    const objSev = k => OBJ[k] ? OBJ[k]().sev : 0;
    const SEV_T = [L("Normalna praca", "Нормальная работа"), L("Wąskie gardło — obserwuj", "Узкое место — следите"), L("Sytuacja kryzysowa", "Кризисная ситуация")];
    function openObject(k){
      const o = OBJ[k](); objSel = k; partnerSel = null; section = null; draft = {}; ov = null; drawOv(true); drawNav();
      const box = $("#pldrawer"); box.hidden = false; box.classList.add("ctx");
      box.innerHTML = `<header><h3>${ic(k === "tank" ? "flame" : k === "plant" ? "bolt" : k)}${esc(o.t)}</h3><button class="pl-ib" data-close="drawer" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button></header>
        <p class="pl-sev s${o.sev}">${ic(o.sev ? "alert" : "check")}${SEV_T[o.sev]}</p>
        <dl class="pl-orows">${o.rows.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl>
        <p class="small muted">${L("Model nie dzieli gospodarki na regiony — obiekt pokazuje wskaźniki krajowe dla tej dziedziny.", "Модель не делит экономику на регионы — объект показывает общенациональные показатели этой отрасли.")}</p>
        <div class="pl-two"><button class="pl-btn" data-why="${o.why}">${ic("help")}${L("Dlaczego?", "Почему?")}</button><button class="pl-btn go" data-sec="${o.sec}">${L("Otwórz sekcję", "Открыть раздел")}</button></div>`;
      drawMap();
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
    let trafSig = "", liveSig = "";
    function drawMap(){
      let h = ""; const traffic = [], A = window.PLMapArt;
      for (const pk of S.PK){
        const [x1, y1] = ppos(pk), [x2, y2] = proj(...ENTRY[pk]), tr = partnerTrade(pk), v = tr.imp + tr.exp;
        const w = clamp(1.5 + Math.sqrt(v) * 0.55, 1.5, 20), bad = partnerIssue(pk), restr = D.partners[pk].restricted;
        const mx = (x1 + x2) / 2 + (y2 - y1) * 0.12, my = (y1 + y2) / 2 - (x2 - x1) * 0.12;
        const d = `M${x1.toFixed(0)} ${y1.toFixed(0)} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}`;
        const cats = { en: 0, fd: 0, in: 0 }; tr.byM.forEach(x => cats[CAT[x.k]] += x.imp + x.exp); const cat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0][0];
        const tip = `${nm(D.partners[pk])}: ${L("eksport", "экспорт")} ≈${n0(tr.exp)}, ${L("import", "импорт")} ≈${n0(tr.imp)} ${L("mld zł/rok", "млрд zł/год")}`;
        h += `<path d="${d}" class="pl-route c-${cat}${bad ? " bad" : ""}${restr ? " restr" : ""}" style="stroke-width:${w.toFixed(1)}"><title>${esc(tip)}</title></path><path d="${d}" class="pl-flow" style="animation-duration:${(6 / Math.max(0.3, s.partners[pk].route)).toFixed(1)}s" ${restr ? "" : tr.exp > tr.imp ? `marker-start="url(#plarr)"` : `marker-end="url(#plarr)"`}/>`;
        const qx = (0.25 * x1 + 0.5 * mx + 0.25 * x2), qy = (0.25 * y1 + 0.5 * my + 0.25 * y2);
        if (restr) h += `<g class="pl-sanct" transform="translate(${(qx + 30).toFixed(0)},${(qy - 8).toFixed(0)})"><circle r="11"/><path d="M-4 -4 L4 4 M4 -4 L-4 4"/><g transform="translate(-52,15)"><rect width="104" height="24" rx="4"/><text x="52" y="16" text-anchor="middle">${L("Ograniczenia handlowe", "Торговые ограничения")}</text></g></g>`;
        else if (bad) h += `<g class="pl-block" transform="translate(${(qx - 34).toFixed(0)},${qy.toFixed(0)})"><circle r="10"/><path d="M0 -5 V1 M0 4.5 V5"/></g>`;
        if (!restr && v > 5){ const n = bad ? 1 : clamp(Math.round(Math.sqrt(v) / 6), 1, 5), xs = tr.exp / v, sea = pk === "WORLD";
          const list = []; for (let i = 0; i < n; i++){ const dir = (i + 0.5) / n < xs ? -1 : 1; list.push([sea ? "plship" : ["UA", "LT", "CZ"].includes(pk) && i % 2 === 0 ? "pltrain" : "pltruck", dir, dir < 0 ? "#e2b44c" : "#5fa8ff"]); }
          if (sea && s.markets.gaz.imp > 1) list.push(["pltanker", 1, ""]);
          traffic.push([pk, d, list, Math.round(Math.max(0.3, s.partners[pk].route) * 4)]); }
        if (v > 60 && !restr) h += `<g class="pl-rv" transform="translate(${(0.25 * x1 + 0.5 * mx + 0.25 * x2).toFixed(0)},${(0.25 * y1 + 0.5 * my + 0.25 * y2).toFixed(0)})"><rect x="-27" y="-10" width="54" height="19" rx="5"/><text y="4" text-anchor="middle">≈${n0(v)}</text></g>`;
        const cs = s.contracts.filter(c => c.status === "active" && c.partner === pk);
        if (cs.length) h += `<path d="M${x1.toFixed(0)} ${(y1 + 8).toFixed(0)} Q${(mx + 10).toFixed(0)} ${(my + 10).toFixed(0)} ${x2.toFixed(0)} ${(y2 + 6).toFixed(0)}" class="pl-cline"/><g class="pl-ctag" transform="translate(${mx.toFixed(0)},${(my + 22).toFixed(0)})"><rect x="-17" y="-11" width="34" height="22" rx="6"/><g transform="translate(-14,-7) scale(.58)">${ICON.doc}</g><text x="5" y="5">${cs.length}</text></g>`;
      }
      $("#plroutes").innerHTML = h;
      // ruch na trasach: przebudowa tylko przy zmianie liczby/kierunku pojazdów (animacja się nie restartuje)
      const tsig = traffic.map(([pk, , l, sp]) => pk + l.map(x => x[0][2] + x[1]).join("") + sp).join("|");
      if (tsig !== trafSig){ trafSig = tsig; $("#pltraffic").innerHTML = traffic.map(([pk, d, list, sp]) => A.movers(d, list, (pk === "WORLD" ? 40 : 22) / (sp / 4))).join(""); }
      // żywa warstwa: pola (zbiory), wiatraki (efekt programu OZE), dym (wykorzystanie mocy przemysłu, produkcja prądu)
      const mk = s.markets, [fa, fb, pale] = A.fieldColors(mk.zboze.prod / Math.max(1e-6, mk.zboze.prodBase), mk.zboze.shortage), svg = $("#plmap");
      svg.style.setProperty("--fa", fa); svg.style.setProperty("--fb", fb); svg.style.setProperty("--fpale", pale);
      const nW = Math.round(clamp(3 + (s.programs.oze.eff - 1) * 60, 3, A.WIND_MAX)), ind = s.sectors.przemysl;
      const kInd = clamp((ind.utilization - 0.7) / 0.3, 0, 1) * clamp(ind.output, 0, 1.2), kPow = clamp(mk.prad.prod / Math.max(1e-6, mk.prad.prodBase), 0, 1.2) * 0.85;
      const ls = nW + "|" + kInd.toFixed(1) + "|" + kPow.toFixed(1);
      if (ls !== liveSig){ liveSig = ls; svg.dataset.wind = nW;
        $("#pllive").innerHTML = A.wind(proj, nW) + (isMobile() ? "" : A.smoke(proj, 18.75, 50.32, kInd, -7, -18) + A.smoke(proj, 19.55, 51.7, kInd * 0.7, -1, -14) + A.smoke(proj, 19.33, 51.27, kPow, 37, -26)); }
      for (const g of $$(".pl-poi")){ const sv = objSev(g.dataset.poi); g.classList.toggle("warn", sv === 1); g.classList.toggle("crit", sv === 2); g.classList.toggle("sel", objSel === g.dataset.poi); }
      $$(".pl-nb").forEach(g => g.classList.toggle("issue", !!(s.partners[g.dataset.nb] && partnerIssue(g.dataset.nb))));
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
    // Górny pasek: każda wartość ma okres w etykiecie lub podpisie; te same pola co w „Dlaczego?” i w raporcie doradcy
    const D30 = L("30 dni", "30 дн."), est = () => s.monthly.length < 12;
    const KPIS = [
      ["gdp", "chart", L("PKB nominalny", "Номинальный ВВП"), () => s.macro.Y * s.macro.priceLevel, v => (v / 1000).toFixed(2).replace(".", ",") + " " + L("bln zł", "трлн zł"), () => dl(s.macro.growthYoY, n1, 1, "%") + ` <em>${L("realnie, 12 mies.", "реально, 12 мес.")}${est() ? "*" : ""}</em>`, 1, "nominalGDP",
        () => L("PKB w cenach bieżących, w tempie rocznym. Pod spodem: wzrost realnego PKB w ostatnich 12 miesiącach", "ВВП в текущих ценах, годовой темп. Ниже: рост реального ВВП за последние 12 месяцев") + (est() ? L(" (* szacunek startowy — gra trwa krócej niż rok).", " (* стартовая оценка — игра идёт меньше года).") : ".")],
      ["inflation", "flame", L("Inflacja r/r", "Инфляция г/г"), () => s.macro.inflation, v => n1(v) + "%", d => dl(d, n1, -1, PP) + ` <em>${D30}</em>`, -1, "inflation", () => L("Wzrost cen w ciągu ostatnich 12 miesięcy. Pod spodem: zmiana w ciągu 30 dni (p.p.).", "Рост цен за последние 12 месяцев. Ниже: изменение за 30 дней (п.п.).")],
      ["unemployment", "people", L("Bezrobocie", "Безработица"), () => s.macro.unemployment, v => n1(v) + "%", d => dl(d, n1, -1, PP) + ` <em>${D30}</em>`, -1, "unemployment", () => L("Odsetek osób szukających pracy. Pod spodem: zmiana w ciągu 30 dni.", "Доля ищущих работу. Ниже: изменение за 30 дней.")],
      ["budget", "coins", L("Saldo budżetu", "Сальдо бюджета"), () => s.macro.balance, v => lvl(v, n0) + " " + L("mld/rok", "млрд/год"), () => lvl(s.macro.balance / s.macro.nominalGDP * 100, n1, L("% PKB", "% ВВП")), 1, "balance", () => L("Dochody − wydatki państwa w tempie rocznym. To nie jest saldo handlowe.", "Доходы − расходы государства в годовом темпе. Это не торговое сальдо.")],
      ["debt", "bank", L("Dług/PKB", "Долг/ВВП"), () => s.macro.debtRatio, v => n1(v) + "%", d => dl(d, n1, -1, PP) + ` <em>${D30}</em>`, -1, "debtRatio", () => L("Dług publiczny brutto jako % PKB nominalnego. Pod spodem: zmiana w ciągu 30 dni.", "Валовой госдолг в % номинального ВВП. Ниже: изменение за 30 дней.")],
      ["trade", "globe", L("Handel (rocznie)", "Торговля (в год)"), () => s.macro.X - s.macro.M, v => lvl(v, n0) + " " + L("mld", "млрд"), () => `${L("eksp.", "эксп.")} ${n0(s.macro.X)} · ${L("imp.", "имп.")} ${n0(s.macro.M)}`, 1, "tradeBalance", () => L("Saldo handlu towarami w tempie rocznym (eksport − import, mld zł). Pod spodem: eksport i import. Kliknij, aby zobaczyć przyczyny.", "Сальдо торговли товарами в годовом темпе (экспорт − импорт, млрд zł). Ниже: экспорт и импорт. Нажмите, чтобы увидеть причины.")],
    ];
    function drawKpis(){
      const a = histAgo(30);
      $("#plkpi").innerHTML = KPIS.map(([k, icn, t, get, f, fd, good, hk, desc]) => { const v = get(), p = a[hk] ?? v, d = v - p;
        return `<button class="pl-kpi k-${k}" data-why="${k}" title="${esc(desc())}">${ic(icn)}<span><small>${t}</small><b>${f(v)}</b><i>${fd(d, p)}</i></span></button>`; }).join("");
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
    function bottomHtml(){
      const H = s.history.slice(-360), take = k => H.map(x => x[k]), a = histAgo(30), m = s.macro;
      const items = [["gdp", L("PKB", "ВВП"), take("nominalGDP"), (m.Y * m.priceLevel / 1000).toFixed(2).replace(".", ",") + " " + L("bln", "трлн"), dl(m.growthYoY, n1, 1, RR), "var(--pl-green)"],
        ["inflation", L("Inflacja", "Инфляция"), take("inflation"), n1(m.inflation) + "%", dl(m.inflation - a.inflation, n1, -1, PP), "var(--pl-red)"],
        ["unemployment", L("Bezrobocie", "Безработица"), take("unemployment"), n1(m.unemployment) + "%", dl(m.unemployment - a.unemployment, n1, -1, PP), "var(--pl-blue)"],
        ["debt", L("Dług/PKB", "Долг/ВВП"), take("debtRatio"), n1(m.debtRatio) + "%", dl(m.debtRatio - a.debtRatio, n1, -1, PP), "var(--pl-gold)"],
        ["trade", L("Saldo handlu", "Торг. сальдо"), take("tradeBalance"), lvl(m.X - m.M, n0) + " " + L("mld", "млрд"), L("towary, rocznie", "товары, в год"), "var(--pl-violet)"]];
      const tot = m.C + m.I + m.G + Math.max(0, m.NX);
      const parts = [[L("Konsumpcja", "Потребление"), m.C, "#4ea1ff"], [L("Inwestycje", "Инвестиции"), m.I, "#3fc28a"], [L("Wydatki państwa", "Госрасходы"), m.G, "#e2b44c"], [L("Eksport netto", "Чистый экспорт"), Math.max(0, m.NX), "#b77cf2"]];
      return `<section class="pl-panel pl-ind"><h5>${ic("chart")}${L("Najważniejsze wskaźniki", "Главные показатели")}</h5><div class="pl-indg">${items.map(([k, t, v, now, d, c]) => `<button class="pl-mini" data-why="${k}"><small>${t}</small><b>${now}</b><i>${d}</i>${spark(v, c)}</button>`).join("")}</div></section>
        <section class="pl-panel pl-str"><h5>${ic("data")}${L("Struktura popytu (PKB)", "Структура спроса (ВВП)")}</h5><div class="pl-strg">${donut(parts)}<ul>${parts.map(([t, v, c]) => `<li><i style="background:${c}"></i>${t}<b>${Math.round(v / tot * 100)}%</b></li>`).join("")}</ul></div></section>
        <section class="pl-panel pl-res"><h5>${ic("box")}${L("Zasoby i rynki (ceny krajowe)", "Ресурсы и рынки (внутренние цены)")}</h5><div class="pl-resg">${RES.map(([k, icn, t]) => { const p = s.markets[k].price, p0 = a.mk?.[k]?.price ?? p, d = (p / p0 - 1) * 100;
          return `<button class="pl-resi" data-why="${topicOfMarket(k)}">${ic(icn)}<span><small>${t}</small><b>${priceStr(k, p)}</b><i>${dl(d, n1, -1, "%")}</i></span></button>`; }).join("")}</div></section>`;
    }

    // ------------------------------------------------------------ prawa kolumna: doradca (skrót), wiadomości, kontrakty
    const RISK = { inflation_high: [L("Inflacja powyżej celu", "Инфляция выше цели"), "inflation", "flame"], inflation_low: [L("Inflacja poniżej celu", "Инфляция ниже цели"), "inflation", "flame"], unemployment: [L("Rosnące bezrobocie", "Растущая безработица"), "unemployment", "people"],
      debt: [L("Dług powyżej 60% PKB", "Долг выше 60% ВВП"), "debt", "bank"], gas_dependency: [L("Wysoka zależność od importu gazu", "Высокая зависимость от импорта газа"), "gas", "bolt"], food_security: [L("Bezpieczeństwo żywnościowe", "Продовольственная безопасность"), "grain", "wheat"],
      productivity: [L("Edukacja i R&D niedofinansowane — słabszy potencjał w dłuższym okresie", "Образование и R&D недофинансированы — слабее потенциал в долгосрочной перспективе"), "gdp", "cap"], infrastructure: [L("Niedofinansowana infrastruktura", "Недофинансированная инфраструктура"), "trade", "globe"], growth: [L("Wolny wzrost gospodarki", "Медленный рост экономики"), "gdp", "chart"] };
    const CONF_R = { events: L("trwające wydarzenia", "идущие события"), prices: L("zmienne ceny surowców", "волатильные цены сырья"), decisions: L("świeże decyzje (efekt jeszcze niewidoczny)", "свежие решения (эффект ещё не виден)"), contracts: L("kłopoty z dostawami", "проблемы с поставками") };
    const lastRep = () => s.advisor.reports[s.advisor.reports.length - 1];
    // stylizowany portret doradcy (własna ilustracja SVG, bez zdjęć prawdziwych osób)
    const ADV_SVG = `<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="pladvbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d3d5f"/><stop offset="1" stop-color="#0d2136"/></linearGradient></defs>
      <rect width="64" height="64" fill="url(#pladvbg)"/><circle cx="50" cy="12" r="16" fill="#e2b44c" opacity=".12"/>
      <path d="M8 64c2-13 11-19 24-19s22 6 24 19z" fill="#24384f"/><path d="M26 45l6 9 6-9z" fill="#eef2f6"/><path d="M30.5 47h3l1 3-2.5 9-2.5-9z" fill="#c8483f"/>
      <path d="M20 47l8 17h-6zM44 47l-8 17h6z" fill="#1a2a3c"/><rect x="28" y="36" width="8" height="9" rx="3" fill="#d9a77f"/>
      <ellipse cx="32" cy="27" rx="11.5" ry="13" fill="#e8b98f"/><path d="M20.5 25c0-10 6-14 12-14s11.5 3.5 11.5 12c-2-4-6-6-11-6.5-4.5.5-9 3-12.5 8.5z" fill="#6b5847"/>
      <path d="M20.5 25c-1 3 0 6 1.5 7" stroke="#6b5847" stroke-width="2" fill="none"/>
      <g fill="none" stroke="#1b2633" stroke-width="1.6"><rect x="22.5" y="24.5" width="8" height="6" rx="2"/><rect x="33.5" y="24.5" width="8" height="6" rx="2"/><path d="M30.5 27h3"/></g>
      <circle cx="26.5" cy="27.6" r="1.1" fill="#1b2633"/><circle cx="37.5" cy="27.6" r="1.1" fill="#1b2633"/><path d="M28.5 34.5q3.5 2 7 0" stroke="#9a5b45" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
    const avatar = (cls = "") => `<div class="pl-avatar ${cls}" role="img" aria-label="${L("Doradca ekonomiczny", "Экономический советник")}">${ADV_SVG}</div>`;
    function advisorBrief(){
      const r = lastRep(); if (!r) return "";
      const b = r.base[0], top = r.risks[0];
      return `${L(`Prognoza modelu (bez losowych wydarzeń): w następnych 12 mies. PKB realny ${b.growth >= 0 ? "wzrośnie" : "spadnie"} o ${n1(Math.abs(b.growth))}%, inflacja za 12 mies. ok. ${n1(b.inflation)}%.`, `Прогноз модели (без случайных событий): за следующие 12 мес. реальный ВВП ${b.growth >= 0 ? "вырастет" : "снизится"} на ${n1(Math.abs(b.growth))}%, инфляция через 12 мес. около ${n1(b.inflation)}%.`)} ${top ? L(`Główne ryzyko: ${RISK[top.topic]?.[0].toLowerCase()}.`, `Главный риск: ${RISK[top.topic]?.[0].toLowerCase()}.`) : L("Brak pilnych ryzyk.", "Срочных рисков нет.")}`;
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
        aid_request: ["alert", L("Prośba o pomoc", "Просьба о помощи"), n.pk && D.partners[n.pk] ? nm(D.partners[n.pk]) + " — " + nm(D.markets[n.mk] || { name: ["", ""] }) : ""],
        aid_answer: [n.choice === "help" || n.choice === "sell" ? "check" : "close", L("Odpowiedź na prośbę o pomoc", "Ответ на просьбу о помощи"), (n.pk && D.partners[n.pk] ? nm(D.partners[n.pk]) + ": " : "") + ({ help: L("pomoc udzielona", "помощь оказана"), sell: L("awaryjna dostawa", "экстренная поставка"), decline: L("odmowa", "отказ"), timeout: L("brak odpowiedzi", "нет ответа") }[n.choice] || "")],
        diplomacy: ["globe", n.kind === "agreement" ? L("Rozmowy o umowie handlowej", "Переговоры о торговом соглашении") : L("Misja handlowa", "Торговая миссия"), n.pk && D.partners[n.pk] ? nm(D.partners[n.pk]) : ""],
        contract_done: ["check", L("Kontrakt zakończony", "Контракт завершён"), cdesc],
        innovation_found: ["bulb", L("Nowe odkrycie", "Новое открытие"), inn(n.ref) + L(" — możesz wdrożyć (Edukacja i Nauka).", " — можно внедрить (Образование).")], innovation_done: ["check", L("Wdrożono innowację", "Инновация внедрена"), inn(n.ref)],
        inflation_high: ["flame", L("Inflacja powyżej 5%", "Инфляция выше 5%"), n1(n.v) + "%", "inflation"], unemployment_high: ["people", L("Bezrobocie powyżej 7%", "Безработица выше 7%"), n1(n.v) + "%", "unemployment"],
        gas_up: ["flame", L("Gaz drożeje", "Газ дорожает"), L(`+${n0(n.v)}% w miesiąc`, `+${n0(n.v)}% за месяц`), "gas"], debt_60: ["bank", L("Dług powyżej 60% PKB", "Долг выше 60% ВВП"), "", "debt"],
        shortage: ["alert", L("Niedobór na rynku", "Дефицит на рынке"), `${n.k && D.markets[n.k] ? nm(D.markets[n.k]) : ""} (${n1(n.v || 0)}% ${L("popytu", "спроса")})`, n.k ? topicOfMarket(n.k) : "imports"],
      };
      const t = T[n.id] || ["news", String(n.id), ""];
      let wk = t[3], fl = null;
      if (wk === "ev"){ const E = D.events[n.k] || {}, e = E.effects || {}; fl = E.partner || "PL"; const mk1 = Object.keys(e.world || {})[0] || Object.keys(Object.values(e.supply || {})[0] || {})[0] || Object.keys(e.domestic || {})[0]; wk = e.domesticYield ? "grain" : mk1 ? topicOfMarket(mk1) : e.demand ? "exports" : e.credit ? "gdp" : "imports"; }
      if (c) fl = c.partner; if (n.id === "diplomacy" || n.id.startsWith("aid_")) fl = n.pk;
      return { icon: t[0], title: t[1], text: t[2], why: wk, flag: fl, tone: /alert|down|flame/.test(t[0]) ? "bad" : /check|bulb/.test(t[0]) ? "good" : "" };
    }
    const newsItem = n => { const t = newsText(n); return `<li class="${t.tone}"><span class="ni">${t.flag ? flag(t.flag, 26) : ic(t.icon)}</span><div><b>${esc(t.title)}</b>${t.text ? `<p>${esc(t.text)}</p>` : ""}${t.why ? `<button class="pl-link" data-why="${t.why}">${L("Dlaczego?", "Почему?")}</button>` : ""}</div><small>${dateStr(n.day)}</small></li>`; };
    // prośba partnera o pomoc: okno z wyborem (czas staje), przypomnienie w prawej kolumnie
    let aidSeen = null;
    function aidHtml(){
      const a = s.aid; if (!a) return "";
      const P = D.partners[a.partner], M = D.markets[a.market], ev = D.events[a.k], A_ = S.AID, unit = M.unit;
      return `<div class="pl-aid"><div class="pl-oh">${flag(a.partner, 34)}<div><small>${L("Prośba o pomoc", "Просьба о помощи")} · ${L("odpowiedz w", "ответить за")} ${Math.max(0, a.deadline - s.dayIndex)} ${L("dni", "дн.")}</small><b>${esc(nm(P))}: ${esc(nm(ev))}</b></div></div>
        <p class="small">${L(`Partner prosi Polskę o wsparcie. Od tej decyzji zależą relacje (przyszłe oferty i ceny), budżet oraz to, jak szybko wrócą normalne dostawy (${nm(M).toLowerCase()}).`, `Партнёр просит Польшу о поддержке. От решения зависят отношения (будущие предложения и цены), бюджет и то, как быстро восстановятся поставки (${nm(M).toLowerCase()}).`)}</p>
        <div class="pl-aidopts">
          <button class="pl-aido go" data-aidc="help"><b>${ic("check")}${L("Pomoc", "Помощь")} — ${n1(A_.help.cost)} ${L("mld zł jednorazowo", "млрд zł разово")}</b><span class="g">▲ ${L("relacje, krótszy kryzys u partnera → szybciej wrócą dostawy", "отношения, кризис у партнёра короче → поставки вернутся быстрее")}</span><span class="r">▼ ${L("dług rośnie od razu", "долг растёт сразу")}</span></button>
          <button class="pl-aido" data-aidc="sell"><b>${ic("up")}${L("Awaryjna dostawa", "Экстренная поставка")}: ${n1(a.volume)} ${unit} ${L("na 3 mies., cena rynkowa +10%", "на 3 мес., рыночная цена +10%")}</b><span class="g">▲ ${L("przychód z eksportu, relacje (mniej niż pomoc)", "выручка от экспорта, отношения (меньше, чем помощь)")}</span><span class="r">▼ ${L("mniej towaru w kraju → wyższe ceny w Polsce", "меньше товара в стране → выше цены в Польше")}</span></button>
          <button class="pl-aido bad" data-aidc="decline"><b>${ic("close")}${L("Odmowa", "Отказ")}</b><span class="g">▲ ${L("brak kosztów teraz", "нет расходов сейчас")}</span><span class="r">▼ ${L("relacje spadają → mniej ofert i gorsze ceny", "отношения падают → меньше предложений и хуже цены")}</span></button>
        </div></div>`;
    }
    function showAid(){ if (!s.aid) return; const m = $("#plmodal"); m.hidden = false; m.innerHTML = `<div class="pl-modin" role="dialog" aria-modal="true">${aidHtml()}<div class="pl-two"><button class="pl-btn" id="plaidlater">${L("Zdecyduję później", "Решу позже")}</button></div></div>`; $("#plaidlater").onclick = e => { e.stopPropagation(); m.hidden = true; m.innerHTML = ""; }; }
    function drawRight(force){
      const r = lastRep(), act = s.contracts.filter(c => c.status === "active");
      const sig = (s.aid ? s.aid.id + ":" + (s.aid.deadline - s.dayIndex) : "-") + "|" + (r?.monthIndex ?? -1) + "|" + s.news.length + "|" + (s.news[s.news.length - 1]?.day ?? 0) + "|" + s.offers.map(o => o.id + ":" + o.rounds).join(",") + "|" + act.map(c => c.id + c.delivery.toFixed(2)).join(",") + "|" + JSON.stringify(r?.patch || {});
      const sig2 = sig + "|" + s.events.map(e => e.k + S.phase(e) + Math.round(e.t / e.len * 20)).join(","); if (!force && sig2 === sigRight) return; sigRight = sig2;
      const hasPlan = r && Object.keys(r.patch).length;
      const evs = s.events.filter(e => S.phase(e) !== "recovery");
      $("#plalerts").innerHTML = (s.aid ? `<button class="pl-chipa crit" data-aidopen="1">${ic("alert")}<span><b>${L("Prośba o pomoc", "Просьба о помощи")}</b><small>${esc(nm(D.partners[s.aid.partner]))}</small></span></button>` : "")
        + evs.slice(0, 3).map(e => { const P = D.events[e.k].partner, ph = S.phase(e); return `<button class="pl-chipa ${ph === "peak" ? "crit" : "warn"}" ${P && P !== "PL" && D.partners[P] ? `data-partner="${P}"` : `data-ov="news"`}>${ic("alert")}<span><b>${esc(nm(D.events[e.k]))}</b><small>${P && D.partners[P] ? esc(nm(D.partners[P])) : L("Polska", "Польша")} · ${Math.round(e.t / e.len * 100)}%</small></span></button>`; }).join("")
;
      $("#plright").innerHTML = `<section class="pl-float pl-advc" id="pladv"><div class="pl-advh">${avatar("sm2")}<div><h4>${L("Doradca", "Советник")}</h4><small>${r ? L("raport: ", "доклад: ") + monthName(r.month, r.year) : ""}</small></div></div>
          <p>${esc(advisorBrief())}</p><div class="pl-three"><button class="pl-btn" data-ov="advisor">${L("Raport", "Доклад")}</button><button class="pl-btn" data-ov="chat">${L("Zapytaj", "Спросить")}</button><button class="pl-btn go" data-apply="1" ${hasPlan ? "" : "disabled"} title="${L("Zastosuj zalecenia", "Применить советы")}">${L("Zastosuj", "Применить")}</button></div></section>
        <section class="pl-float pl-newsf"><h5>${ic("news")}${L("Wiadomości", "Новости")}<button class="pl-more" data-ov="news">${L("Wszystkie", "Все")}</button></h5><ul class="pl-news">${s.news.slice().reverse().slice(0, 4).map(newsItem).join("")}</ul></section>
        <section class="pl-float pl-conf" id="plcon"><h5>${ic("doc")}${L("Aktywne kontrakty", "Активные контракты")}<button class="pl-more" data-ov="contracts">${L("Wszystkie", "Все")}</button></h5>
          ${s.offers.length ? `<button class="pl-offbar" data-ov="contracts">${ic("doc")}<span>${L("Nowe oferty", "Новые предложения")}: <b>${s.offers.length}</b></span><em>${L("Sprawdź", "Открыть")}</em></button>` : ""}
          ${act.length ? `<ul class="pl-cons">${act.slice(0, 3).map(c => `<li>${flag(c.partner, 24)}<div><b>${nm(D.partners[c.partner])}</b><small>${nm(D.markets[c.market])} · ${c.type === "import" ? L("import", "импорт") : L("eksport", "экспорт")}</small></div><div class="pl-cv"><b>${n1(S.valueOf(c.market, c.volume, c.price))} ${L("mld/rok", "млрд/год")}</b><i class="pl-pbar"><b style="width:${Math.round(c.delivery * 100)}%"></b></i></div><em>${Math.round(c.delivery * 100)}%</em></li>`).join("")}</ul>` : `<p class="muted small">${L("Brak aktywnych kontraktów — oferty partnerów pojawią się tutaj.", "Нет активных контрактов — предложения партнёров появятся здесь.")}</p>`}</section>`;
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
        <div class="pl-scg">${arr.map((x, i) => `<div><b>≈${nom(x, i).toFixed(2).replace(".", ",")} ${L("bln zł", "трлн")}</b><i>${dl(x.growth, n1, 1, "%")}</i><small>${x.h} ${L("mies.", "мес.")}</small></div>`).join("")}</div>
        <table class="pl-tbl sm">${[[L("Inflacja", "Инфляция"), "inflation"], [L("Bezrobocie", "Безработица"), "unemployment"], [L("Dług/PKB", "Долг/ВВП"), "debtRatio"], [L("Import gazu", "Импорт газа"), "gasImportShare"]].map(([t, k]) => `<tr><td>${t}</td>${arr.map(x => `<td>${n1(x[k])}%</td>`).join("")}</tr>`).join("")}</table></div>`;
    }
    const GOAL_IC = { inflation: "target", growthAvg: "chart", debtRatio: "coins", gasImportShare: "flame" };
    const GOAL_T = { inflation: [L("Inflacja", "Инфляция"), "2–4%"], growthAvg: [L("Średni wzrost PKB", "Средний рост ВВП"), "≥ 3%"], debtRatio: [L("Dług publiczny", "Госдолг"), L("< 65% PKB", "< 65% ВВП")], gasImportShare: [L("Import gazu", "Импорт газа"), L("< 80% zużycia", "< 80% потребления")] };
    // zalecenia doradcy z uzasadnieniem: co zmienia, dlaczego, koszt, kiedy, efekt vs obecna polityka, czy cel jest osiągalny
    const REC_METRIC = { inflation_high: ["inflation", -1, [2, 4]], inflation_low: ["inflation", 1, [2, 4]], unemployment: ["unemployment", -1, [0, 6.5]], debt: ["debtRatio", -1, [0, 65]], gas_dependency: ["gasImportShare", -1, [0, 80]], food_security: ["inflation", -1, null], productivity: ["Y", 1, null], infrastructure: ["Y", 1, null], growth: ["Y", 1, null] };
    let recCache = null;
    function recHtml(r){
      const key = r.monthIndex + ":" + s.dayIndex;
      if (!recCache || recCache.key !== key){ const BP = baseProj(); recCache = { key, items: r.risks.map(x => ({ x, XP: S.project(s, 60, x.action), BP })) }; }
      const fm = (m, v) => m === "Y" ? (v / 1000).toFixed(2).replace(".", ",") + " " + L("bln zł", "трлн zł") : n1(v) + "%";
      const ML = { inflation: L("inflacja", "инфляция"), unemployment: L("bezrobocie", "безработица"), debtRatio: L("dług/PKB", "долг/ВВП"), gasImportShare: L("import gazu (% zużycia)", "импорт газа (% потребления)"), Y: L("PKB realny", "реальный ВВП") };
      return recCache.items.map(({ x, XP, BP }) => {
        const [met, gd, tgt] = REC_METRIC[x.topic] || ["Y", 1, null], b36 = BP[35][met], a36 = XP[35][met], a60 = XP[59][met];
        const dSp = XP[0].spending - BP[0].spending, dRev = XP[0].revenue - BP[0].revenue, pl = patchLines(x.action);
        const progs = Object.keys(x.action.programs || {}), when = progs.length ? L(`efekt od ${Math.min(...progs.map(k => D.programs[k].lagStart))} do ${Math.max(...progs.map(k => D.programs[k].lagFull))} mies.`, `эффект с ${Math.min(...progs.map(k => D.programs[k].lagStart))} до ${Math.max(...progs.map(k => D.programs[k].lagFull))} мес.`) : x.action.rate != null ? L("efekt po 2–6 mies.", "эффект через 2–6 мес.") : L("efekt po 1–3 mies.", "эффект через 1–3 мес.");
        const ok = tgt ? a60 >= tgt[0] && a60 <= tgt[1] : null;
        const why = { inflation_high: L(`Inflacja ${n1(s.macro.inflation)}% jest powyżej celu 2–4%.`, `Инфляция ${n1(s.macro.inflation)}% выше цели 2–4%.`), inflation_low: L(`Inflacja ${n1(s.macro.inflation)}% jest poniżej celu.`, `Инфляция ${n1(s.macro.inflation)}% ниже цели.`), unemployment: L(`Bezrobocie ${n1(s.macro.unemployment)}% rośnie.`, `Безработица ${n1(s.macro.unemployment)}% растёт.`),
          debt: L(`Dług ${n1(s.macro.debtRatio)}% PKB — powyżej 60% rośnie premia za ryzyko i odsetki.`, `Долг ${n1(s.macro.debtRatio)}% ВВП — выше 60% растёт премия за риск и проценты.`), gas_dependency: L(`Import pokrywa ${n0(s.macro.gasImportShare)}% zużycia gazu — skoki cen na świecie szybko uderzają w koszty.`, `Импорт покрывает ${n0(s.macro.gasImportShare)}% потребления газа — мировые скачки цен быстро бьют по издержкам.`),
          food_security: L("Niskie zapasy zboża albo nieurodzaj u partnera.", "Низкие запасы зерна или неурожай у партнёра."), productivity: L("Edukacja i R&D na poziomie startowym — potencjał rośnie wolno.", "Образование и R&D на стартовом уровне — потенциал растёт медленно."), infrastructure: L("Finansowanie infrastruktury poniżej utrzymania.", "Финансирование инфраструктуры ниже содержания."), growth: L(`Wzrost ${n1(s.macro.growthYoY)}% przy niskiej inflacji.`, `Рост ${n1(s.macro.growthYoY)}% при низкой инфляции.`) }[x.topic] || "";
        const reach = tgt == null ? "" : ok ? `<p class="small g">${ic("check")}${L("Według modelu cel jest osiągalny w 5 lat przy tej zmianie.", "По модели цель достижима за 5 лет при этом изменении.")}</p>`
          : `<p class="small r">${ic("alert")}${L(`Przy tej skali zmian cel (${tgt[0] ? tgt[0] + "–" : "≤ "}${tgt[1]}%) nie zostanie osiągnięty w 5 lat (prognoza: ${n1(a60)}%).`, `При таком масштабе цель (${tgt[0] ? tgt[0] + "–" : "≤ "}${tgt[1]}%) не будет достигнута за 5 лет (прогноз: ${n1(a60)}%).`)} ${x.topic === "gas_dependency" ? L("Import gazu spada powoli: trzeba wielu lat budowy nowych źródeł (OZE/atom) i efektywności; same magazyny importu nie zastąpią.", "Импорт газа снижается медленно: нужны годы строительства новых источников (ВИЭ/АЭС) и эффективности; хранилища импорт не заменят.") : L("Potrzebne są większe lub dodatkowe działania.", "Нужны более сильные или дополнительные меры.")}</p>`;
        return `<div class="pl-rec"><div class="pl-rech">${ic(RISK[x.topic]?.[2] || "alert")}<b>${RISK[x.topic]?.[0] || x.topic}</b><button class="pl-link" data-why="${RISK[x.topic]?.[1] || "gdp"}">${L("Dlaczego?", "Почему?")}</button></div>
          <p class="small">${esc(why)}</p><dl class="pl-recdl"><dt>${L("Co zmienić", "Что изменить")}</dt><dd>${pl.map(esc).join("; ")}</dd><dt>${L("Koszt dla budżetu (rocznie)", "Стоимость для бюджета (в год)")}</dt><dd>${L("wydatki", "расходы")} ${dl(dSp, n1, -1, " " + L("mld", "млрд"))}, ${L("dochody", "доходы")} ${dl(dRev, n1, 1, " " + L("mld", "млрд"))}</dd>
          <dt>${L("Kiedy", "Когда")}</dt><dd>${when}</dd><dt>${L("Efekt po 3 latach", "Эффект через 3 года")} (${ML[met]})</dt><dd>${fm(met, b36)} → <b>${fm(met, a36)}</b> ${dl(met === "Y" ? (a36 / b36 - 1) * 100 : a36 - b36, n1, gd, met === "Y" ? "%" : " p.p.")}</dd></dl>${reach}</div>`; }).join("");
    }
    // zmiana prognozy względem poprzedniego miesiąca i porównanie prognozy sprzed roku z rzeczywistością
    function forecastHistoryHtml(r){
      const R = s.advisor.reports, prev = R.length >= 2 ? R[R.length - 2] : null, old = R.find(x => x.monthIndex === r.monthIndex - 12);
      const row = (t, a, b, gd, u = "%") => `<tr><td>${t}</td><td>${n1(a)}${u}</td><td><b>${n1(b)}${u}</b></td><td>${dl(b - a, n1, gd, " p.p.")}</td></tr>`;
      let h = "";
      if (prev){
        const from = prev.monthIndex * 30, dec = s.decisions.filter(d => d.day >= from), evs = s.news.filter(n => n.day >= from && /event_(signal|end)/.test(n.id)).map(n => (n.id === "event_end" ? L("koniec: ", "конец: ") : L("początek: ", "начало: ")) + nm(D.events[n.k] || { name: [n.k, n.k] }));
        h += `<section class="pl-panel"><h5>${ic("clock")}${L("Jak zmieniła się prognoza na 12 mies. (vs poprzedni raport)", "Как изменился прогноз на 12 мес. (к прошлому докладу)")}</h5><table class="pl-tbl sm"><tr><th></th><th>${monthName(prev.month, prev.year)}</th><th>${monthName(r.month, r.year)}</th><th>${L("Zmiana", "Изменение")}</th></tr>
          ${row(L("Wzrost PKB realnego", "Рост реального ВВП"), prev.base[0].growth, r.base[0].growth, 1)}${row(L("Inflacja za 12 mies.", "Инфляция через 12 мес."), prev.base[0].inflation, r.base[0].inflation, -1)}${row(L("Dług/PKB za 12 mies.", "Долг/ВВП через 12 мес."), prev.base[0].debtRatio, r.base[0].debtRatio, -1)}</table>
          <p class="small muted">${L("Powody rewizji", "Причины пересмотра")}: ${[...dec.map(d => L("Twoja decyzja: ", "Ваше решение: ") + d.k), ...evs].slice(0, 6).map(esc).join("; ") || L("brak nowych decyzji i wydarzeń — zmiana wynika z upływu czasu (nowy punkt startowy prognozy).", "новых решений и событий нет — изменение из-за течения времени (новая стартовая точка прогноза).")}</p></section>`;
      }
      if (old){
        h += `<section class="pl-panel"><h5>${ic("target")}${L("Prognoza sprzed 12 mies. a rzeczywistość", "Прогноз 12 мес. назад и реальность")}</h5><table class="pl-tbl sm"><tr><th></th><th>${L("Prognoza", "Прогноз")} (${monthName(old.month, old.year)})</th><th>${L("Faktycznie", "Фактически")}</th><th>${L("Różnica", "Разница")}</th></tr>
          ${row(L("Wzrost PKB realnego, 12 mies.", "Рост реального ВВП, 12 мес."), old.base[0].growth, s.macro.growthYoY, 1)}${row(L("Inflacja", "Инфляция"), old.base[0].inflation, s.macro.inflation, -1)}${row(L("Bezrobocie", "Безработица"), old.base[0].unemployment, s.macro.unemployment, -1)}${row(L("Dług/PKB", "Долг/ВВП"), old.base[0].debtRatio, s.macro.debtRatio, -1)}</table>
          <p class="small muted">${L("Prognoza zakładała brak losowych wydarzeń i brak zmian polityki — różnice wynikają głównie z wydarzeń i Twoich decyzji w tym czasie.", "Прогноз предполагал отсутствие случайных событий и изменений политики — разница в основном из-за событий и ваших решений за это время.")}</p></section>`;
      }
      return h;
    }
    function advisorHtml(){
      const r = lastRep(); if (!r) return "";
      const pv = r.change.prev, nw = r.change.now, lines = patchLines(r.patch), c0 = r.confidence[0];
      return `<div class="pl-advhead">${avatar("big")}<div><h3>${L("Doradca ekonomiczny", "Экономический советник")}</h3><small>${L("Analiza · Prognozy · Rekomendacje", "Анализ · Прогнозы · Рекомендации")}</small>
          <p class="pl-bubble">${L("Dzień dobry, Panie Premierze. Poniżej najnowsze prognozy i zalecenia — decyzja należy do Pana.", "Добрый день, господин премьер. Ниже свежие прогнозы и рекомендации — решение за вами.")} ${esc(advisorBrief())}</p></div>
          <div class="pl-conf"><small>${monthName(r.month, r.year)}</small><div>${ring(c0.value)}<span><b>${c0.value}%</b><small>${L("Pewność (wskaźnik heurystyczny)", "Уверенность (эвристический индекс)")}</small></span></div></div></div>
        <section class="pl-panel"><h5>${ic("calendar")}${L("Zmiany w ostatnim miesiącu", "Изменения за месяц")}</h5><div class="pl-chg">${[[L("Inflacja", "Инфляция"), pv.inflation, nw.inflation, "%"], [L("Bezrobocie", "Безработица"), pv.unemployment, nw.unemployment, "%"], [L("Dług/PKB", "Долг/ВВП"), pv.debtRatio, nw.debtRatio, "%"], [L("Gaz", "Газ"), pv.gas, nw.gas, " zł/MWh"]].map(([t, a, b, u]) => `<span><small>${t}</small><b>${u === "%" ? n1(b) : n0(b)}${u}</b> ${dl(b - a, u === "%" ? n1 : n0, -1)}</span>`).join("")}</div></section>
        <section class="pl-panel"><h5>${ic("target")}${L("Cele na najbliższe 3 lata", "Цели на ближайшие 3 года")}</h5><div class="pl-goals">${r.goals.map(g => `<div class="${g.ok ? "ok" : "no"}">${ic(GOAL_IC[g.metric] || "target")}<span><small>${GOAL_T[g.metric]?.[0] || nm(g)}</small><b>${GOAL_T[g.metric]?.[1] || ""}</b><i>${L("teraz", "сейчас")} ${n1(g.value)}% · ${g.ok ? L("w celu", "в цели") : L("poza celem", "вне цели")}</i></span></div>`).join("")}</div><p class="muted small">${L("Do końca okresu", "До конца периода")}: ${Math.max(0, r.goals[0]?.monthsLeft ?? 0)} ${L("mies.", "мес.")}</p></section>
        <section class="pl-panel"><h5>${ic("chart")}${L("Prognoza wzrostu PKB — porównanie scenariuszy", "Прогноз роста ВВП — сравнение сценариев")}</h5><div class="pl-scens">${scen(r.base, L("Przy obecnej polityce", "При текущей политике"), "", "clock")}${r.alt ? scen(r.alt, L("Po proponowanych zmianach", "После предложенных изменений"), "alt", "check") : `<div class="pl-scen alt"><h6>${ic("check")}${L("Po proponowanych zmianach", "После изменений")}</h6><p class="muted">${L("Doradca nie proponuje zmian.", "Советник не предлагает изменений.")}</p></div>`}</div>
          <p class="muted small">${L("Prognoza modelu gry bez losowych wydarzeń. „Pewność” to wskaźnik heurystyczny (horyzont, trwające wstrząsy, zmienność cen, świeże decyzje) — nie jest statystycznie skalibrowanym prawdopodobieństwem", "Прогноз модели без случайных событий. «Уверенность» — эвристический индекс (горизонт, идущие шоки, волатильность цен, свежие решения), а не статистически откалиброванная вероятность")}: ${r.confidence.map(c => `${c.h} ${L("mies.", "мес.")} ${c.value}%`).join(" · ")}${c0.reasons.length ? ` — ${L("niższa, bo", "ниже, потому что")}: ${c0.reasons.map(x => CONF_R[x]).join(", ")}` : ""}.</p></section>
        ${forecastHistoryHtml(r)}
        <section class="pl-panel"><h5>${ic("search")}${L("Kluczowe obserwacje i zalecenia", "Ключевые наблюдения и рекомендации")}</h5>${r.risks.length ? recHtml(r) : `<p class="small">${ic("check")}${L("Brak pilnych ryzyk — gospodarka w równowadze.", "Срочных рисков нет — экономика в равновесии.")}</p>`}
          ${lines.length ? `<div class="pl-plan"><b>${L("Plan doradcy (wszystkie zalecenia razem)", "План советника (все рекомендации вместе)")}</b><ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul><button class="pl-btn go" data-apply="1">${ic("check")}${L("Zastosuj zalecenia", "Применить советы")}</button><p class="small muted">${L("Zastosowanie wymaga potwierdzenia. Prognoza zakłada brak nowych losowych wydarzeń.", "Применение требует подтверждения. Прогноз не учитывает новых случайных событий.")}</p></div>` : ""}</section>`;
    }
    function offerHtml(o){
      const a = S.assessContract(s, o), imp = o.type === "import";
      const risk = a.partnerRisk > 0.3 ? L("wysokie", "высокий") : a.partnerRisk > 0.12 ? L("średnie", "средний") : L("niskie", "низкий");
      const qty = (k, v) => (v < 10 ? n1(v) : n0(v)) + " " + D.markets[k].unit;
      return `<div class="pl-offer"><div class="pl-oh">${flag(o.partner, 30)}<div><small>${L("Propozycja kontraktu", "Предложение контракта")} <em class="pl-new">${L("Nowa", "Новое")}</em></small><b>${imp ? L("Import", "Импорт") : L("Eksport", "Экспорт")}: ${nm(D.markets[o.market]).toLowerCase()} — ${nm(D.partners[o.partner])}</b></div><span class="muted small">${L("ważna", "действует")} ${Math.max(0, o.expires - s.dayIndex)} ${L("dni", "дн.")}</span></div>
        <div class="pl-og"><span><small>${L("Wolumen", "Объём")}</small>${qty(o.market, o.volume)}/${L("rok", "год")}</span><span><small>${L("Cena", "Цена")}</small>${priceStr(o.market, o.price)}</span><span><small>${L("Czas trwania", "Срок")}</small>${o.months} ${L("mies.", "мес.")}</span>
        <span><small>${L("Gwarantowany wolumen", "Гарантированный объём")}</small>${Math.round(o.guarantee * 100)}%</span><span><small>${L("Wartość roczna", "Годовая стоимость")}</small><b class="gold">${n1(a.valuePerYear)} ${L("mld zł", "млрд")}</b></span><span><small>${L("vs rynek", "vs рынок")}</small><b>${dl(a.vsMarket, n1, 1, " " + L("mld/rok", "млрд/год"))}</b></span>
        <span><small>${L("Kara za zerwanie / za miesiąc braków", "Штраф за разрыв / за месяц недопоставки")}</small>${n1(S.cancelPenalty(o))} / ${n1(o.penalty)} ${L("mld zł", "млрд")}</span><span><small>${L("Ryzyko partnera", "Риск партнёра")}</small>${risk}</span><span><small>${L("Wolna przepustowość", "Свободная пропускная")}</small>${qty(o.market, Math.max(0, a.capacityLeft))}</span></div>
        <p class="small muted">${imp ? L("Stała cena chroni przed skokami cen świata, ale wiąże, gdy ceny spadną.", "Фиксированная цена защищает от скачков, но связывает, если цены упадут.") : a.domesticEffect === "tight" ? L("Uwaga: mało wolnego towaru — kontrakt może zabrać podaż z rynku krajowego.", "Внимание: мало свободного товара — контракт может забрать предложение с внутреннего рынка.") : L("Stały odbiorca; towar na eksport nie trafi na rynek krajowy.", "Стабильный покупатель; товар на экспорт не попадёт на внутренний рынок.")}</p>
        <div class="pl-three"><button class="pl-btn go" data-acc="${o.id}">${L("Akceptuj", "Принять")}</button><button class="pl-btn" data-neg="${o.id}">${L("Negocjuj", "Торговаться")}</button><button class="pl-btn bad" data-rej="${o.id}">${L("Odrzuć", "Отклонить")}</button></div><div class="pl-negbox" id="plneg${o.id}"></div></div>`;
    }
    function contractsHtml(){
      const act = s.contracts.filter(c => c.status === "active"), rel = s.flags.playerReliability ?? 0.95;
      const rows = S.PK.map(pk => ({ pk, ...partnerTrade(pk) })).sort((a, b) => (b.imp + b.exp) - (a.imp + a.exp));
      return `<section class="pl-panel"><h5>${ic("globe")}${L("Główni partnerzy handlowi (szacunek, mld zł/rok)", "Главные торговые партнёры (оценка, млрд zł/год)")}</h5><div class="pl-tscroll"><table class="pl-tbl"><tr><th>${L("Kraj", "Страна")}</th><th>${L("Eksport", "Экспорт")}</th><th>${L("Import", "Импорт")}</th><th>${L("Bilans", "Баланс")}</th></tr>${rows.map(x => `<tr><td><span class="pl-cty">${flag(x.pk, 20)}${nm(D.partners[x.pk])}</span></td><td>${n0(x.exp)}</td><td>${n0(x.imp)}</td><td class="${x.exp - x.imp >= 0 ? "g" : "r"}">${lvl(x.exp - x.imp, n0)}</td></tr>`).join("")}
          <tr class="tot"><td>${L("Razem", "Итого")}</td><td>${n0(s.macro.X)}</td><td>${n0(s.macro.M)}</td><td class="${s.macro.X >= s.macro.M ? "g" : "r"}">${lvl(s.macro.X - s.macro.M, n0)}</td></tr></table></div><button class="pl-link" data-why="trade">${L("Dlaczego?", "Почему?")}</button></section>
        <section class="pl-panel"><h5>${ic("doc")}${L("Oferty", "Предложения")} (${s.offers.length})</h5>${s.offers.length ? s.offers.map(offerHtml).join("") : `<p class="muted">${L("Brak ofert. Nowe pojawiają się co miesiąc.", "Предложений нет. Новые появляются каждый месяц.")}</p>`}</section>
        <section class="pl-panel"><h5>${ic("check")}${L("Aktywne kontrakty", "Активные контракты")} (${act.length}) <span class="muted small">· ${L("wiarygodność Polski", "надёжность Польши")} ${Math.round(rel * 100)}%</span></h5>
        ${act.map(c => `<div class="pl-offer"><div class="pl-oh">${flag(c.partner, 26)}<div><b>${c.type === "import" ? L("Import", "Импорт") : L("Eksport", "Экспорт")}: ${nm(D.markets[c.market]).toLowerCase()}</b><small>${nm(D.partners[c.partner])} · ${L("zostało", "осталось")} ${Math.max(0, Math.ceil((c.end - s.dayIndex) / 30))} ${L("mies.", "мес.")}</small></div><span class="${c.delivery < c.guarantee ? "r" : "g"}">${Math.round(c.delivery * 100)}%</span></div>
          <i class="pl-pbar"><b style="width:${Math.round(c.delivery * 100)}%"></b></i><button class="pl-btn bad sm" data-cancel="${c.id}">${L("Zerwij", "Разорвать")}</button></div>`).join("") || `<p class="muted">${L("Brak.", "Нет.")}</p>`}</section>`;
    }
    const OV_T = { advisor: ["user", L("Doradca ekonomiczny", "Экономический советник")], news: ["news", L("Wiadomości", "Новости")], contracts: ["globe", L("Handel i kontrakty", "Торговля и контракты")] };
    function openOv(k){ if (k === "advisor" || k === "chat") lastInGroup.analysis = "advisor"; if (k === "chat"){ k = "advisor"; chatFull = true; if (ov === "advisor"){ ovBuilt = null; } } ov = k; section = null; partnerSel = null; $("#pldrawer").hidden = true; drawNav(); drawOv(true); drawMap(); tutCheck(); }
    function closeOv(){ chatFull = false; ov = null; drawOv(true); }
    function drawOv(force){
      const box = $("#plov");
      $$("#plmnav [data-m]").forEach(b => b.classList.toggle("on", b.dataset.m === ov)); host.classList.toggle("ovopen", !!ov);
      if (!ov){ box.hidden = true; ovBuilt = null; return; }
      const sig = ov + "|" + s.advisor.lastMonthlyReportIndex + "|" + s.news.length + "|" + s.offers.map(o => o.id + ":" + o.rounds).join(",") + "|" + s.contracts.map(c => c.status + c.delivery.toFixed(2)).join(",");
      if (!force && sig === sigOv) return; sigOv = sig;
      if (ovBuilt !== ov){
        box.hidden = false; ovBuilt = ov;
        box.innerHTML = `<div class="pl-ovin ${ov}${ov === "advisor" && chatFull ? " chatfull" : ""}"><header><h3>${ic(OV_T[ov][0])}${OV_T[ov][1]}</h3>${ov === "advisor" ? `<div class="pl-wtabs">${groupOf("advisor")[3].map(x => { const T = SECTIONS.find(z => z[0] === x); return `<button class="${x === "advisor" ? "on" : ""}" ${x === "advisor" ? `data-ov="advisor"` : `data-sec="${x}"`}>${ic(T[1])}${T[2]}</button>`; }).join("")}</div>` : ""}<button class="pl-ib" data-close="ov" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button></header>
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
      $("#plchat").innerHTML = `<section class="pl-panel pl-chatp"><div class="pl-chath"><h5>${ic("help")}${L("Zapytaj doradcę", "Спросить советника")}</h5><button class="pl-btn sm" data-chatfull="1">${chatFull ? L("Zwiń czat", "Свернуть чат") : L("Rozwiń czat", "Развернуть чат")}</button></div>
        <div id="plcats" class="pl-cats"></div><div id="plcrumb" class="pl-crumb"></div><div id="plchlog" class="pl-chlog">${chatHtml || `<p class="muted small">${L("Wybierz kategorię powyżej albo wpisz pytanie, np. „dlaczego gaz drożeje?”.", "Выберите категорию выше или задайте вопрос, например «почему дорожает газ?».")}</p>`}</div><div id="plchips" class="pl-chips"></div>
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

    // ------------------------------------------------------------ „Dlaczego?” — jeden temat = jedna metryka (kontrakt z advisor-knowledge.js)
    const WHY_TITLE = { gdp: L("PKB", "ВВП"), inflation: L("Inflacja", "Инфляция"), unemployment: L("Bezrobocie", "Безработица"), budget: L("Budżet", "Бюджет"), debt: L("Dług", "Долг"), trade: L("Saldo handlu", "Торговое сальдо"), imports: L("Import", "Импорт"), exports: L("Eksport", "Экспорт"),
      grain: L("Zboże", "Зерно"), food: L("Żywność", "Еда"), gas: L("Gaz", "Газ"), power: L("Prąd", "Электроэнергия"), fuel: L("Paliwa", "Топливо"), machines: L("Maszyny", "Машины"), industrial: L("Wyroby przemysłowe", "Промтовары"), consumer: L("Towary konsumpcyjne", "Потребтовары") };
    const WHY_GOOD = { gdp: 1, inflation: -1, unemployment: -1, budget: 1, debt: -1, trade: 1, imports: 0, exports: 1, grain: -1, food: -1, gas: -1, power: -1, fuel: -1, machines: 0, industrial: 0, consumer: 0 };
    const topicOfMarket = k => A.TOPIC_OF_MARKET[k] || "imports";
    function openWhy(key){ if (!A.TOPICS.includes(key)) key = key === "growth" ? "gdp" : "gdp"; if (why !== key) whyTab = "why"; why = key; ui.whyOpened = true; drawWhy(); tutCheck(); }
    const fmtF = (v, unit) => unit ? `${Math.abs(v) >= 100 ? n0(v) : n1(v)} ${esc(unit)}` : "";
    function drawWhy(){
      const box = $("#plwhy"); if (!why){ box.hidden = true; box.innerHTML = ""; return; }
      const E = A.explain(why, s, lang); if (!E){ box.hidden = true; return; }
      const keep = box.dataset.topic === why ? box.querySelector("details")?.open : false, scroll = box.dataset.topic === why ? (box.querySelector(".pl-whyin")?.scrollTop || 0) : 0;
      const BT = E.basisText || {};
      const row = (f, main) => `<li class="${main ? "main" : ""}"><span class="dir ${f.dir > 0 ? "up" : f.dir < 0 ? "down" : ""}">${f.dir > 0 ? "▲" : f.dir < 0 ? "▼" : "•"}</span><div><b>${esc(f.label)}</b> <small>${fmtF(f.value, f.unit)}</small>${f.txt ? `<p>${esc(f.txt)}</p>` : ""}<em class="pl-basis">${esc(BT[f.basis] || "")}</em></div></li>`;
      const hasSer = !!SERIES[why]; if (!hasSer) whyTab = "why";
      const tabs = hasSer ? `<div class="pl-seg">${[["why", L("Wyjaśnienie", "Объяснение")], ["m", L("Historia: miesiące", "История: месяцы")], ["y", L("Historia: lata", "История: годы")]].map(([v, t]) => `<button data-wt="${v}" class="${whyTab === v ? "on" : ""}">${t}</button>`).join("")}</div>` : "";
      const comp = E.composition ? `<h4>${ic("data")}${L("Skład — z czego składa się wartość (to nie są przyczyny zmiany)", "Состав — из чего складывается значение (это не причины изменения)")}</h4><div class="pl-strbar">${E.composition.slice(0, 10).map(c => `<div><span>${esc(c.name)}</span><i style="width:${c.share != null ? clamp(c.share, 0, 100).toFixed(0) : clamp(Math.abs(c.value) * 15, 2, 100).toFixed(0)}%"></i><b>${c.unit ? n1(c.value) + " " + esc(c.unit) : n0(c.value)}${c.share != null ? ` (${n0(c.share)}%)` : ""}</b></div>${c.def ? `<p class="small muted pl-cdef">${esc(c.def)}</p>` : ""}`).join("")}</div>` : "";
      const body = whyTab !== "why" ? `<p class="small muted">${esc(SER_DESC(why, whyTab))}</p>${seriesChart(why, whyTab)}` : `
        <p class="pl-sum">${esc(E.summary)}</p>
        <h4>${ic("search")}${L("Przyczyny zmiany", "Причины изменения")}</h4>
        ${E.noDominant ? `<p class="pl-nodom">${L("Model nie wskazał jednej wyraźnie dominującej przyczyny.", "Модель не выявила одной явно доминирующей причины.")}</p>` : `<ul class="pl-causes">${E.main.map(f => row(f, true)).join("")}</ul>`}
        ${E.extra.length ? `<h5 class="pl-sub">${E.noDominant ? L("Czynniki, które działały (każdy niewielki)", "Факторы, которые действовали (каждый невелик)") : L("Inne czynniki", "Другие факторы")}</h5><ul class="pl-causes">${E.extra.map(f => row(f)).join("")}</ul>` : ""}
        <p class="small muted">${esc(E.criterion || "")}</p>
        ${comp}
        ${E.facts?.length ? `<h4>${ic("box")}${L("Dane (stan obecny)", "Данные (текущее состояние)")}</h4><table class="pl-tbl sm">${E.facts.map(([t, v, u]) => `<tr><td>${esc(t)}</td><td>${typeof v === "number" ? (Math.abs(v) >= 100 ? n0(v) : n1(v)) : esc(String(v))} ${esc(u)}</td></tr>`).join("")}</table>` : ""}
        ${E.consequences?.length ? `<h4>${ic("signal")}${L("Skutki — na co to wpływa dalej", "Последствия — на что это влияет дальше")}</h4><ul class="pl-acts">${E.consequences.map(c => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
        <h4>${ic("chart")}${L("Jak to działa — łańcuch przyczyn", "Как это работает — цепочка причин")}</h4>
        <ol class="pl-cchain">${E.causalChain.map(c => `<li><b>${esc(c.from)}</b> → <b>${esc(c.to)}</b><p>${esc(c.why)}</p></li>`).join("")}</ol>
        <p class="small muted">${L("Strzałka oznacza możliwy wpływ, nie pewność: siła i czas zależą od skali zmiany, dostępnych zamienników i opóźnień.", "Стрелка означает возможное влияние, а не гарантию: сила и время зависят от масштаба изменения, заменителей и задержек.")}</p>
        ${E.note ? `<p class="pl-note">${esc(E.note)}</p>` : ""}
        ${E.actions?.length ? `<h4>${ic("check")}${L("Co możesz zrobić", "Что можно сделать")}</h4><ul class="pl-acts">${E.actions.map(([t, tg]) => `<li>${esc(t)}${targetSection(tg) ? ` <button class="pl-link" data-sec="${targetSection(tg)}">${L("Pokaż", "Показать")}</button>` : tg === "trade" ? ` <button class="pl-link" data-ov="contracts">${L("Pokaż", "Показать")}</button>` : ""}</li>`).join("")}</ul>` : ""}
        <details${keep ? " open" : ""}><summary>${L("Ograniczenia modelu, Twoje decyzje, programy w toku", "Ограничения модели, ваши решения, программы")}</summary>
          <p class="muted">${esc(E.uncertainty)}</p>
          ${E.decisions?.length ? `<p><b>${L("Twoje ostatnie decyzje", "Ваши последние решения")}:</b> ${E.decisions.map(d => `${dateStr(d.day)} · ${esc(String(d.k))}`).join("; ")}</p>` : ""}
          ${E.delayed?.length ? `<p><b>${L("Programy w toku (efekt z opóźnieniem)", "Программы в работе (эффект с задержкой)")}:</b> ${E.delayed.map(x => `${esc(x.name)} ×${n2(x.eff)}`).join(", ")}</p>` : ""}</details>`;
      box.hidden = false; box.dataset.topic = why;
      box.innerHTML = `<div class="pl-whyin" role="dialog" aria-label="${esc(E.title)}"><button class="pl-ib pl-x" data-close="why" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button>
        <h3>${ic("search")}${esc(E.title)}: <b>${esc(E.valueText)}</b></h3><p class="small muted">${L("Jednostka", "Единица")}: ${esc(E.unit)}</p>
        <p>${L("Zmiana", "Изменение")}: ${dl(E.changeValue, Math.abs(E.changeValue) >= 100 ? n0 : n1, WHY_GOOD[why] ?? 0, " " + (E.changeUnit || ""))} <span class="muted">${L("w porównaniu z", "по сравнению с")}: ${esc(E.comparisonPeriod)}${E.comparisonText ? ` (${esc(E.comparisonText)})` : ""}</span></p>
        ${tabs}${body}
        <div class="pl-chips"><button class="pl-chip" data-learn="${E.concept || "gdp"}">${ic("cap")}${L("Teoria", "Теория")}</button><small>${L("Powiązane", "Связанное")}:</small>${(E.relatedTopics || []).map(k => `<button class="pl-chip" data-why="${k}">${WHY_TITLE[k] || k}</button>`).join("")}</div></div>`;
      box.querySelector(".pl-whyin").scrollTop = scroll;
      const bars = box.querySelector(".pl-bars"); if (bars) bars.scrollLeft = bars.scrollWidth;
    }
    // ------------------------------------------------------------ szuflada sekcji (suwaki → projekt zmian → podgląd → zatwierdź)
    const POLICY_LAB = { capBuffer: [L("Bufor kapitałowy banków", "Буфер капитала банков"), "%", 0.5], vat: ["VAT", "%", 0.5], pit: ["PIT", "%", 0.5], cit: ["CIT", "%", 0.5], rate: [L("Stopa procentowa (NBP)", "Ставка (NBP)"), "%", 0.25], social: [L("Świadczenia społeczne", "Соцвыплаты"), UNIT, 5], health: [L("Ochrona zdrowia", "Здравоохранение"), UNIT, 5], admin: [L("Administracja i inne", "Администрация и прочее"), UNIT, 5] };
    const LIM = { capBuffer: [0, 4], vat: [15, 27], pit: [8, 25], cit: [9, 30], rate: [0.25, 12], social: [600, 900], health: [180, 320], admin: [240, 360] };
    const curVal = key => key.startsWith("programs.") ? s.policy.programs[key.slice(9)] : key.startsWith("reserve.") ? s.policy.reserveTarget[key.slice(8)] : s.policy[key];
    const draftVal = key => key.startsWith("programs.") ? draft.programs?.[key.slice(9)] : draft[key];
    const setDraft = (key, v) => { if (key.startsWith("programs.")){ draft.programs = { ...(draft.programs || {}), [key.slice(9)]: v }; if (v === curVal(key)) delete draft.programs[key.slice(9)]; if (!Object.keys(draft.programs).length) delete draft.programs; } else { draft[key] = v; if (v === curVal(key)) delete draft[key]; } };
    const fmtSl = (key, v) => key.startsWith("reserve.") ? "×" + n1(v) : POLICY_LAB[key]?.[1] === "%" ? n2(v) + "%" : n0(v) + " " + UNIT;
function slider(key){
      let lab, step, min, max, extra = "";
      if (key.startsWith("programs.")){ const P = D.programs[key.slice(9)], eff = s.programs[key.slice(9)].eff;
        lab = nm(P); step = P.max > 100 ? 5 : 1; min = 0; max = P.max;
        const tgt = S.programTarget(s, key.slice(9)); extra = `<p class="small">${esc(P.effect[li])}</p><p class="small muted">${ic("clock")}${L("Opóźnienie efektu", "Задержка эффекта")}: ${P.lagStart}–${P.lagFull} ${L("mies.", "мес.")} · ${term("effectIndex", L("Efekt programu", "Эффект программы"))}: ${L("dziś", "сейчас")} <b>×${n2(eff)}</b>, ${L("przy obecnym finansowaniu docelowo", "при текущем финансировании в итоге")} <b>×${n2(tgt)}</b>${P.maintenance && key === "programs.logistyka" ? ` · ${L("minimum na utrzymanie", "минимум на содержание")}: ${P.maintenance} ${L("mld zł/rok", "млрд zł/год")}` : ""}</p>`; }
      else if (key.startsWith("reserve.")){ lab = L("Rezerwa", "Резерв") + ": " + nm(D.markets[key.slice(8)]); step = 0.1; min = 0.3; max = 2.5; }
      else { [lab, , step] = POLICY_LAB[key]; [min, max] = LIM[key]; }
      const cur = curVal(key), v = draftVal(key) ?? cur, ch = Math.abs(v - cur) > 1e-9;
      return `<div class="pl-sl${ch ? " ch" : ""}"><label><span>${esc(lab)} <button class="pl-q${helpOpen.has(key) ? " on" : ""}" data-help="${key}" aria-label="${L("Jak to działa?", "Как это работает?")}">?</button></span><b data-out="${key}">${fmtSl(key, v)}</b></label><input type="range" min="${min}" max="${max}" step="${step}" value="${v}" data-sl="${key}" aria-label="${esc(lab)}"><small class="muted">${L("teraz", "сейчас")}: ${fmtSl(key, cur)}</small>${extra}${helpOpen.has(key) ? helpBox(key) : ""}</div>`;
    }
    const draftBox = () => `<div class="pl-draft" id="pldraft"></div>`;
    function drawDraft(){
      const box = $("#pldraft"); if (!box) return;
      if (!Object.keys(draft).length){ box.innerHTML = `<p class="small muted">${L("Przesuń suwak — przed zatwierdzeniem zobaczysz prognozę na 12, 36 i 60 miesięcy: obecna polityka vs proponowana.", "Двигайте ползунок — до подтверждения увидите прогноз на 12, 36 и 60 месяцев: текущая политика vs предлагаемая.")}</p>`; return; }
      const BP = baseProj(), XP = S.project(s, 60, draft), H = [11, 35, 59];
      const lines = patchLines(draft);
      const MET = [[L("PKB realny", "Реальный ВВП"), r => r.Y / 1000, v => n2(v) + " " + L("bln zł", "трлн zł"), 1], [L("Inflacja r/r", "Инфляция г/г"), r => r.inflation, v => n1(v) + "%", -1], [L("Bezrobocie", "Безработица"), r => r.unemployment, v => n1(v) + "%", -1],
        [L("Saldo budżetu (rocznie)", "Сальдо бюджета (в год)"), r => r.balance, v => n0(v) + " " + L("mld", "млрд"), 1], [L("Dług / PKB", "Долг / ВВП"), r => r.debtRatio, v => n1(v) + "%", -1], [L("Import gazu (% zużycia)", "Импорт газа (% потребления)"), r => r.gasImportShare, v => n1(v) + "%", -1]];
      const cell = (g, f, gd, i) => { const b = g(BP[i]), x = g(XP[i]); return `<td><span class="muted">${f(b)}</span> → <b>${f(x)}</b><br>${dl(x - b, Math.abs(x - b) >= 100 ? n0 : n1, gd)}</td>`; };
      const dSp = XP[0].spending - BP[0].spending, dRev = XP[0].revenue - BP[0].revenue;
      const good = [], bad = []; MET.forEach(([t, g, , gd]) => { const d = g(XP[35]) - g(BP[35]); if (Math.abs(d) < 0.05) return; ((d > 0) === (gd > 0) ? good : bad).push(t); });
      const energy = draft.programs && Object.keys(draft.programs).some(k => ENERGY_P.includes(k));
      let gas = ""; if (energy){ const r = H.map(i => Math.max(0, (1 - XP[i].gasImp / BP[i].gasImp) * 100));
        gas = `<div class="pl-gasr big">${ic("flame")}<div><b>${L("Zastąpimy własnymi źródłami lub oszczędnością", "Заменим собственными источниками или экономией")}</b><div class="pl-g3">${[L("1 rok", "1 год"), L("3 lata", "3 года"), L("5 lat", "5 лет")].map((t, i) => `<span><small>${t}</small><b>${n1(r[i])}%</b></span>`).join("")}</div><small class="muted">${L("% importu gazu w porównaniu z polityką bez zmian.", "% импорта газа по сравнению с политикой без изменений.")}</small></div></div>`; }
      box.innerHTML = `<h4>${L("Podgląd decyzji (nic się nie zmienia, dopóki nie zatwierdzisz)", "Предпросмотр решения (ничего не меняется до подтверждения)")}</h4>
        <ul class="small">${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="small">${L("Wpływ na budżet od razu (tempo roczne)", "Влияние на бюджет сразу (годовой темп)")}: ${L("wydatki", "расходы")} ${dl(dSp, n1, -1, " " + L("mld", "млрд"))}, ${L("dochody", "доходы")} ${dl(dRev, n1, 1, " " + L("mld", "млрд"))}</p>
        ${gas}<div class="pl-tscroll"><table class="pl-tbl pl-prev"><tr><th>${L("Obecna → proponowana", "Текущая → предлагаемая")}</th><th>12 ${L("mies.", "мес.")}</th><th>36 ${L("mies.", "мес.")}</th><th>60 ${L("mies.", "мес.")}</th></tr>${MET.map(([t, g, f, gd]) => `<tr><td>${t}</td>${H.map(i => cell(g, f, gd, i)).join("")}</tr>`).join("")}</table></div>
        ${good.length || bad.length ? `<p class="small">${good.length ? `<span class="g">▲ ${L("Lepiej po 3 latach", "Лучше через 3 года")}: ${good.join(", ")}.</span> ` : ""}${bad.length ? `<span class="r">▼ ${L("Gorzej po 3 latach", "Хуже через 3 года")}: ${bad.join(", ")}.</span>` : ""}</p>` : ""}
        <p class="small muted">${L("Prognoza warunkowa modelu: zakłada brak nowych losowych wydarzeń i brak innych zmian polityki. Programy działają z opóźnieniem — w pierwszym roku widać głównie koszt.", "Условный прогноз модели: без новых случайных событий и других изменений политики. Программы действуют с задержкой — в первый год виден в основном расход.")}</p>
        <div class="pl-two"><button class="pl-btn go" id="plcommit">${ic("check")}${L("Zatwierdź zmiany", "Утвердить")}</button><button class="pl-btn" id="plundo">${L("Anuluj", "Отмена")}</button></div>`;
      $("#plcommit").onclick = () => { S.applyPolicyPatch(s, draft); draft = {}; baseProjCache = null; toast(L("Decyzja wchodzi w życie (z opóźnieniem).", "Решение вступает в силу (с задержкой).")); drawSection(); refresh(true); tutCheck(); };
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
      return `<div class="pl-tscroll"><table class="pl-tbl sm"><tr><th>${L("Rynek", "Рынок")}</th><th>${L("Jednostka ilości", "Единица объёма")}</th><th>${L("Cena", "Цена")}</th><th>${L("Produkcja w kraju", "Производство")}</th><th>${L("Zużycie w kraju", "Потребление")}</th><th>${L("Import", "Импорт")}</th><th>${L("Eksport", "Экспорт")}</th><th>${L("Zapasy / niedobór", "Запасы / дефицит")}</th></tr>${S.MK.map(k => { const q = s.markets[k], B = D.markets[k];
        return `<tr><td><button class="pl-link" data-why="${topicOfMarket(k)}">${nm(B)}</button></td><td>${B.unit}${L("/rok", "/год")}</td><td>${B.price < 10 ? L("indeks ", "индекс ") + n2(q.price) : n0(q.price) + " " + B.priceUnit}</td><td>${n0(q.prod)}</td><td>${n0(q.demand)}</td><td title="${L("wykorzystanie przepustowości importu", "загрузка импортных мощностей")}">${n0(q.imp)}<i class="pl-cap"><b style="width:${clamp(q.imp / Math.max(1, q.impCap) * 100, 0, 100).toFixed(0)}%"></b></i></td><td>${n0(q.exp)}<i class="pl-cap"><b style="width:${clamp(q.exp / Math.max(1, q.expCap) * 100, 0, 100).toFixed(0)}%"></b></i></td><td>${q.shortage > 0.005 ? `<b class="r">${L("brakuje", "не хватает")} ${n1(q.shortage * 100)}%</b>` : B.storable ? n0(q.stock / Math.max(1e-6, q.demand) * 360) + " " + L("dni zużycia", "дней потребления") : "—"}</td></tr>`; }).join("")}</table></div>
        <p class="small muted">${L("Ilości w podanej jednostce na rok. Pasek pod importem/eksportem = wykorzystanie przepustowości tras (pełny = trasy zapchane). „indeks” = cena względem startu gry (1,00). Kliknij nazwę rynku, aby zobaczyć, dlaczego zmienia się cena.", "Объёмы в указанной единице за год. Полоска под импортом/экспортом = загрузка маршрутов (полная = маршруты забиты). «индекс» = цена к старту игры (1,00). Нажмите на рынок, чтобы увидеть, почему меняется цена.")}</p>`;
    }
function sectionHtml(k){
      const m = s.macro, mk = s.markets, title = SECTIONS.find(x => x[0] === k);
      const G = groupOf(k); lastInGroup[G[0]] = k;
      let h = `<header><div class="pl-wsh"><small>${G[2]}</small><h3>${ic(title[1])}${title[2]}</h3></div><button class="pl-ib" data-close="drawer" aria-label="${L("Zamknij", "Закрыть")}">${ic("close")}</button></header>
        <div class="pl-wtabs">${G[3].map(x => { const T = SECTIONS.find(z => z[0] === x); return `<button class="${x === k ? "on" : ""}" ${x === "advisor" ? `data-ov="advisor"` : `data-sec="${x}"`}>${ic(T[1])}${T[2]}</button>`; }).join("")}</div>`;
      const tabs = key => `<div class="pl-seg">${[["m", L("Miesiące", "Месяцы")], ["y", L("Lata", "Годы")]].map(([v, t]) => `<button data-dm="${v}" class="${dataMode === v ? "on" : ""}">${t}</button>`).join("")}</div>`;
      if (k === "gosp"){
        h += `<div class="pl-gsum">${bottomHtml()}</div><div class="pl-kvs">${kv(L("PKB nominalny", "Номинальный ВВП"), n0(m.Y * m.priceLevel) + " " + L("mld", "млрд"))}${kv(L("Wzrost r/r", "Рост г/г"), dl(m.growthYoY, n1, 1, "%"))}${kv(L("Luka PKB", "Разрыв ВВП"), lvl(m.gap, n1, "%"))}${kv(L("Inflacja", "Инфляция"), n1(m.inflation) + "%")}${kv(L("Bezrobocie", "Безработица"), n1(m.unemployment) + "%")}${kv(L("Nastroje", "Настроения"), n0(m.mood ?? 60) + "/100")}</div>
          ${tabs()}<h4>${L("Wzrost PKB r/r", "Рост ВВП г/г")} ${whyBtn("gdp")}</h4>${seriesChart("gdp", dataMode)}<h4>${L("Inflacja", "Инфляция")} ${whyBtn("inflation")}</h4>${seriesChart("inflation", dataMode)}<h4>${L("Bezrobocie", "Безработица")} ${whyBtn("unemployment")}</h4>${seriesChart("unemployment", dataMode)}
          <h4>${L("Inflacja — z czego się składa", "Инфляция — из чего состоит")}</h4>${stackBar([[L("Oczekiwania", "Ожидания"), m.pi.expect, "#4ea1ff"], [L("Popyt", "Спрос"), m.pi.demand, "#3fc28a"], [L("Energia", "Энергия"), m.pi.energy, "#e2b44c"], [L("Żywność", "Еда"), m.pi.food, "#ef6461"]], v => n1(v) + " p.p.")}
          <h4>${L("Popyt: C + I + G + NX", "Спрос: C + I + G + NX")}</h4>${stackBar([[L("Konsumpcja", "Потребление"), m.C, "#4ea1ff"], [L("Inwestycje", "Инвестиции"), m.I, "#3fc28a"], [L("Państwo", "Государство"), m.G, "#e2b44c"], [L("Eksport netto", "Чистый экспорт"), m.NX, "#b77cf2"]], v => n0(v))}
          <p class="small muted">${L("Mld zł/rok, realnie. Dane gry — przybliżone.", "Млрд zł/год, реально. Игровые данные — приблизительно.")}</p>`;
      } else if (k === "budzet"){
        const RL = { vat: "VAT", pit: "PIT", cit: "CIT", excise: L("Akcyza", "Акциз"), contributions: L("Składki", "Взносы"), other: L("Inne", "Прочие"), tariffs: L("Cła", "Пошлины"), social: L("Świadczenia i zasiłki", "Соцвыплаты"), health: L("Zdrowie", "Здравоохранение"), admin: L("Administracja", "Администрация"), programs: L("Programy inwestycyjne", "Инвестпрограммы"), innovations: L("Innowacje", "Инновации"), interest: L("Odsetki od długu", "Проценты по долгу"), reserveIncome: L("Odsetki od rezerw", "Доход от резервов") };
        const RC = ["#4ea1ff", "#3fc28a", "#e2b44c", "#b77cf2", "#ef6461", "#5fd0d6", "#f08bd0"];
        const rev = Object.entries(m.rev).filter(x => x[1] > 0.5).map(([a, v], i) => [RL[a] || a, v, RC[i % 7]]), sp = Object.entries(m.spend).filter(x => x[1] > 0.5).map(([a, v], i) => [RL[a] || a, v, RC[i % 7]]);
        const legend = (parts, tot) => `<ul class="pl-leg">${parts.map(([t, v, c]) => `<li><i style="background:${c}"></i>${esc(t)}<b>${n0(v)}</b><em>${n0(v / tot * 100)}%</em></li>`).join("")}</ul>`;
        h += `<div class="pl-kvs">${kv(L("Dochody", "Доходы"), n0(m.revenue))}${kv(L("Wydatki", "Расходы"), n0(m.spending))}${kv(L("Saldo", "Сальдо"), lvl(m.balance, n0))}${kv(L("Dług/PKB", "Долг/ВВП"), n1(m.debtRatio) + "%")}${kv(L("Odsetki", "Проценты"), n0(m.spend.interest))}${kv(L("Deficyt/PKB", "Дефицит/ВВП"), lvl(m.balance / m.nominalGDP * 100, n1, "%"))}${kv(L("Rezerwy państwa", "Резервы государства"), n0(m.reserves || 0) + " " + L("mld", "млрд"))}${kv(L("Dług netto/PKB", "Чистый долг/ВВП"), n1(m.netDebtRatio ?? m.debtRatio) + "%")}${kv(L("Jednorazowe w tym roku", "Разовые в этом году"), n1(Object.values(s.flags.oneOffYear === S.date(s.dayIndex).year ? s.flags.oneOff || {} : {}).reduce((a, b) => a + b, 0)) + " " + L("mld", "млрд"))}</div>
          <p class="small muted">${L("Nadwyżka najpierw spłaca dług; gdy długu brak, trafia do rezerw. Kary, pomoc dla partnerów i dyplomacja to koszty jednorazowe — od razu zmieniają dług, nie roczne saldo.", "Профицит сначала гасит долг; когда долга нет — идёт в резервы. Штрафы, помощь партнёрам и дипломатия — разовые расходы: сразу меняют долг, а не годовое сальдо.")}</p>
          <h4>${L("Dochody vs wydatki (mld zł/rok)", "Доходы vs расходы (млрд zł/год)")} ${whyBtn("budget")}</h4>
          <div class="pl-hb"><span>${L("Dochody", "Доходы")}</span>${hbar(rev, Math.max(m.revenue, m.spending))}<b>${n0(m.revenue)}</b></div>
          <div class="pl-hb"><span>${L("Wydatki", "Расходы")}</span>${hbar(sp, Math.max(m.revenue, m.spending))}<b>${n0(m.spending)}</b></div>
          <div class="pl-hb"><span>${L("Saldo", "Сальдо")}</span><div class="pl-hbt"><i style="width:${(Math.abs(m.balance) / Math.max(m.revenue, m.spending) * 100).toFixed(1)}%;background:${m.balance < 0 ? "var(--pl-red)" : "var(--pl-green)"}"></i></div><b>${lvl(m.balance, n0)}</b></div>
          <div class="pl-donuts"><div><h6>${L("Skąd są pieniądze", "Откуда деньги")}</h6><div class="pl-strg">${donut(rev)}${legend(rev, m.revenue)}</div></div><div><h6>${L("Na co idą", "На что тратятся")}</h6><div class="pl-strg">${donut(sp)}${legend(sp, m.spending)}</div></div></div>
          ${tabs()}<h4>${L("Saldo budżetu (mld zł/rok)", "Сальдо бюджета (млрд zł/год)")}</h4>${seriesChart("budget", dataMode)}<h4>${L("Dług publiczny / PKB", "Госдолг / ВВП")} ${whyBtn("debt")}</h4>${seriesChart("debt", dataMode)}
          <p class="small pl-note">${L("Saldo handlowe nie jest częścią budżetu. Import nie zwiększa długu publicznego wprost.", "Торговое сальдо не входит в бюджет. Импорт не увеличивает госдолг напрямую.")}</p>
          <h4>${L("Podatki", "Налоги")}</h4>${["vat", "pit", "cit"].map(slider).join("")}<h4>${L("Wydatki", "Расходы")}</h4>${slider("admin")}<button class="pl-btn" data-sec="spol">${ic("people")}${L("Świadczenia i zdrowie → Społeczeństwo", "Соцвыплаты и здравоохранение → Общество")}</button>${draftBox()}`;
      } else if (k === "sektory"){
        h += `<p class="small muted">${L("Wskaźniki sektorów to indeksy względem startu gry (1,00 = początek 2026 r.), chyba że podano jednostkę. Kliknij „?” przy pojęciu, aby zobaczyć definicję.", "Показатели секторов — индексы к старту игры (1,00 = начало 2026 г.), если не указана единица. Нажмите «?» у понятия, чтобы увидеть определение.")}</p>
          <div class="pl-terms">${term("outputIndex", L("Indeks produkcji", "Индекс выпуска"))}${term("utilization", L("Wykorzystanie mocy", "Загрузка мощностей"))}${term("competitiveness", L("Konkurencyjność", "Конкурентоспособность"))}${term("energyInt", L("Energochłonność", "Энергоёмкость"))}${term("productivity", L("Wydajność", "Производительность"))}</div>
          <div class="pl-tscroll"><table class="pl-tbl sm"><tr><th>${L("Sektor", "Сектор")}</th><th>${L("Produkcja (indeks)", "Выпуск (индекс)")}</th><th>${L("Wykorzystanie mocy (%)", "Загрузка мощностей (%)")}</th><th>${L("Konkurencyjność (zmiana od startu)", "Конкурентоспособность (изм. со старта)")}</th><th>${L("Energochłonność (indeks)", "Энергоёмкость (индекс)")}</th><th>${L("Pracujący (mln)", "Занятые (млн)")}</th><th>${L("Wartość dodana na pracującego (tys. zł/rok)", "Добавленная стоимость на занятого (тыс. zł/год)")}</th></tr>${S.SEC.filter(x => D.sectors[x].share > 0).map(x => { const z = s.sectors[x], ei = D.sectors[x].energyInt ? z.energyInt / D.sectors[x].energyInt : null;
            return `<tr><td>${nm(D.sectors[x])}</td><td>${n2(z.output)} <small>${dl((z.output - 1) * 100, n1, 1, "%")}</small></td><td>${n0(z.utilization * 100)}%</td><td>${dl((z.competitiveness - 1) * 100, n1, 1, "%")}</td><td>${ei == null ? "—" : n2(ei) + " " + `<small>${dl((ei - 1) * 100, n1, -1, "%")}</small>`}</td><td>${n2(z.jobs ?? 0)}</td><td>${n0((z.prodPerWorker ?? 0) * 1000)}</td></tr>`; }).join("")}</table></div>
          <p class="small muted">${L("Strzałki: zmiana od startu gry. Wyższe wykorzystanie mocy = mniej miejsca na wzrost bez inwestycji. Niższa energochłonność = mniej energii na tę samą produkcję. Droższa energia najmocniej podnosi koszty sektorów energochłonnych.", "Стрелки: изменение со старта. Выше загрузка = меньше места для роста без инвестиций. Ниже энергоёмкость = меньше энергии на тот же выпуск. Дорогая энергия сильнее всего повышает издержки энергоёмких секторов.")} ${whyBtn("exports")}</p><h4>${L("Programy", "Программы")}</h4>${["programs.przemysl", "programs.rolnictwo"].map(slider).join("")}${draftBox()}`;
      } else if (k === "handel"){
        h += `<div class="pl-kvs">${kv(L("Eksport", "Экспорт"), n0(m.X))}${kv(L("Import", "Импорт"), n0(m.M))}${kv(L("Saldo", "Сальдо"), lvl(m.X - m.M, n0))}${kv(L("Fracht", "Фрахт"), "×" + n2(m.freight))}</div>
          <p class="small pl-note">${L("Deficyt handlowy nie jest automatycznie zły — liczy się, co importujemy (maszyny vs. droga energia) i jak to finansujemy. To nie jest budżet państwa.", "Торговый дефицит не обязательно плох — важно, что импортируем (машины vs. дорогая энергия) и как финансируем. Это не госбюджет.")} ${whyBtn("trade")}</p>
          <div class="pl-two"><button class="pl-btn" data-ov="contracts">${ic("doc")}${L("Oferty i kontrakty", "Предложения и контракты")}</button><button class="pl-btn" data-sec="dyplo">${ic("globe")}${L("Dyplomacja", "Дипломатия")}</button></div>
          ${tabs()}<h4>${L("Saldo handlu towarami (mld zł/rok)", "Сальдо торговли товарами (млрд zł/год)")}</h4>${seriesChart("trade", dataMode)}
          ${marketsTable()}<h4>${L("Rezerwy strategiczne", "Стратегические резервы")}</h4>${["reserve.zboze", "reserve.gaz", "reserve.paliwa"].map(slider).join("")}${draftBox()}`;
      } else if (k === "energia"){
        const g = mk.gaz, bp = baseProj(), share = 100 * g.imp / Math.max(1, g.demand);
        h += `<div class="pl-kvs">${kv(L("Gaz", "Газ"), n0(g.price) + " zł/MWh")}${kv(L("Świat", "Мир"), n0(g.world))}${kv(L("Prąd", "Электроэнергия"), n0(mk.prad.price) + " zł/MWh")}${kv(L("Produkcja prądu", "Выработка"), n0(mk.prad.prod) + " TWh")}${kv(L("Zapas gazu", "Запас газа"), n0(g.stock / Math.max(1, g.demand) * 360) + " " + L("dni", "дн."))}${kv(L("Import gazu", "Импорт газа"), n0(share) + "%")}</div>
          <section class="pl-gasb"><h4>${ic("flame")}${L("Skąd mamy gaz", "Откуда газ")} ${whyBtn("gas")}</h4>
            <div class="pl-hb"><span>${L("Dziś", "Сейчас")}</span>${hbar([[L("Wydobycie krajowe", "Собственная добыча"), g.prod, "#3fc28a"], [L("Import", "Импорт"), g.imp, "#ef6461"]], g.prod + g.imp)}<b>${n0(share)}%</b></div>
            ${[11, 35, 59].map((i, j) => `<div class="pl-hb"><span>${[L("za 1 rok", "через 1 год"), L("za 3 lata", "через 3 года"), L("za 5 lat", "через 5 лет")][j]}</span>${hbar([[L("Krajowe", "Своё"), Math.max(0, bp[i].gasDemand - bp[i].gasImp), "#3fc28a"], [L("Import", "Импорт"), bp[i].gasImp, "#ef6461"]], bp[i].gasDemand)}<b>${n0(bp[i].gasImportShare)}%</b></div>`).join("")}
            <p class="small muted">${L("Prognoza przy obecnej polityce. Zmień program poniżej — podgląd pokaże, ile importu zastąpimy.", "Прогноз при текущей политике. Измените программу ниже — предпросмотр покажет, сколько импорта заменим.")}</p></section>
          <h4>${L("Programy energetyczne", "Энергопрограммы")}</h4>${["programs.oze", "programs.efektywnosc", "programs.magazyny"].map(slider).join("")}<button class="pl-btn" data-sec="infra">${ic("bolt")}${L("Sieć przesyłowa → Infrastruktura", "Сети → Инфраструктура")}</button>${draftBox()}`;
      } else if (k === "edukacja"){
        h += `<div class="pl-kvs">${kv(L("Wydajność (indeks)", "Производительность"), n2(m.prod))}${kv(L("Efekt edukacji", "Эффект образования"), "×" + n2(s.programs.edukacja.eff))}${kv(L("Bezrobocie", "Безработица"), n1(m.unemployment) + "%")}</div>${slider("programs.edukacja")}${draftBox()}`;
      } else if (k === "nauka"){
        const found = s.innovations.found.filter(id => !s.innovations.active.some(x => x.id === id) && !s.innovations.done.some(x => x.id === id));
        h += `<div class="pl-kvs">${kv(L("Szansa na odkrycie / mies.", "Шанс открытия / мес."), n1(S.innovationChance(s) * 100) + "%")}${kv(L("Efekt R&D", "Эффект R&D"), "×" + n2(s.programs.badania.eff))}</div>${slider("programs.badania")}${draftBox()}
          <h4>${ic("bulb")}${L("Innowacje", "Инновации")}</h4>${found.map(id => { const I = D.innovations.find(x => x.id === id); return `<div class="pl-offer"><b>${nm(I)}</b><p class="small">${L("Koszt", "Стоимость")} ${I.cost} ${L("mld zł", "млрд zł")} · ${I.months} ${L("mies.", "мес.")}</p><button class="pl-btn go" data-inn="${id}">${L("Wdróż", "Внедрить")}</button></div>`; }).join("")}
          ${s.innovations.active.map(x => `<p class="small">${ic("clock")}${nm(D.innovations.find(i => i.id === x.id))}: ${Math.round(x.t / (x.months * 30) * 100)}%</p>`).join("")}${s.innovations.done.map(x => `<p class="small">${ic("check")}${nm(D.innovations.find(i => i.id === x.id))}</p>`).join("")}
          ${!found.length && !s.innovations.active.length && !s.innovations.done.length ? `<p class="muted small">${L("Jeszcze brak odkryć. Więcej R&D i edukacji = większa szansa (z opóźnieniem).", "Открытий пока нет. Больше R&D и образования — выше шанс (с задержкой).")}</p>` : ""}`;
      } else if (k === "banki"){
        const b = m.bank || {};
        h += `<div class="pl-kvs">${kv(L("Stopa NBP (efektywna)", "Ставка NBP (эфф.)"), n2(m.rateEff) + "%")}${kv(L("Kredyt dla firm/ludzi", "Ставка по кредитам"), n2(b.lendRate ?? 0) + "%")}${kv(L("Lokaty", "Депозиты"), n2(b.depositRate ?? 0) + "%")}${kv(L("Złe kredyty (NPL)", "Плохие кредиты (NPL)"), `<span class="${(b.npl ?? 0) > 7 ? "r" : ""}">${n1(b.npl ?? 0)}%</span>`)}${kv(L("Kapitał banków", "Капитал банков"), `<span class="${(b.capital ?? 0) < 13 ? "r" : "g"}">${n1(b.capital ?? 0)}%</span>`)}${kv(L("Akcja kredytowa", "Кредитование"), dl((m.credit - 1) * 100, n1, 1, "%"))}</div>
          <p class="small muted">${L("Łańcuch: stopa NBP → oprocentowanie kredytów → inwestycje i konsumpcja; bezrobocie i drogie raty → złe kredyty → mniej kapitału → banki ograniczają kredyt. Bufor kapitałowy chroni przed tym w kryzysie, ale w spokojnych czasach podraża kredyt.", "Цепочка: ставка NBP → ставки по кредитам → инвестиции и потребление; безработица и дорогие платежи → плохие кредиты → меньше капитала → банки сокращают кредит. Буфер капитала защищает в кризис, но в спокойное время удорожает кредит.")}</p>
          ${tabs()}<h4>${L("Złe kredyty (NPL, %)", "Плохие кредиты (NPL, %)")}</h4>${seriesChart("npl", dataMode)}<h4>${L("Kapitał banków (% aktywów ważonych ryzykiem)", "Капитал банков (% активов с учётом риска)")}</h4>${seriesChart("capital", dataMode)}
          <h4>${L("Decyzje", "Решения")}</h4>${slider("rate")}${slider("capBuffer")}<p class="small muted">${L("W grze sam ustalasz stopę (w rzeczywistości robi to niezależna RPP), a bufor — jak nadzór finansowy (KNF).", "В игре ставку задаёте вы (в реальности — независимый RPP), а буфер — как финансовый надзор (KNF).")}</p>${draftBox()}`;
      } else if (k === "spol"){
        h += `<div class="pl-kvs">${kv(L("Nastroje społeczne", "Общественные настроения"), n0(m.mood ?? 60) + "/100")}${kv(L("Dochód realny", "Реальный доход"), dl(((m.realIncome ?? 1) - 1) * 100, n1, 1, "%"))}${kv(L("Pracujący", "Занятые"), n1(m.employment ?? 16.7) + " " + L("mln", "млн"))}${kv(L("Bezrobocie", "Безработица"), n1(m.unemployment) + "%")}${kv(L("Inflacja", "Инфляция"), n1(m.inflation) + "%")}${kv(L("Ludność", "Население"), n1(D.macro.population) + " " + L("mln", "млн"))}</div>
          <p class="small muted">${L("Nastroje zależą od dochodu realnego, bezrobocia, inflacji i niedoborów w sklepach. Dochód realny — zmiana od startu gry.", "Настроения зависят от реального дохода, безработицы, инфляции и дефицита в магазинах. Реальный доход — изменение с начала игры.")}</p>
          ${tabs()}<h4>${L("Nastroje społeczne", "Общественные настроения")}</h4>${seriesChart("mood", dataMode)}<h4>${L("Dochód realny (zmiana od startu)", "Реальный доход (изменение с начала)")}</h4>${seriesChart("realIncome", dataMode)}<h4>${L("Bezrobocie", "Безработица")}</h4>${seriesChart("unemployment", dataMode)}
          <h4>${L("Wydatki społeczne", "Социальные расходы")}</h4>${["social", "health"].map(slider).join("")}${draftBox()}`;
      } else if (k === "infra"){
        const P = D.programs.logistyka, low = s.policy.programs.logistyka < P.maintenance;
        h += `<div class="pl-kvs">${kv(L("Koszt frachtu", "Стоимость фрахта"), dl((m.freight - 1) * 100, n1, -1, "%"))}${kv(L("Efekt infrastruktury", "Эффект инфраструктуры"), "×" + n2(s.programs.logistyka.eff))}${kv(L("Sieć energetyczna", "Энергосеть"), "×" + n2(s.programs.siec.eff))}</div>
          ${low ? `<p class="pl-evp">${ic("alert")}${L("Finansowanie poniżej poziomu utrzymania — drogi, kolej i porty się starzeją, przepustowość spada.", "Финансирование ниже уровня содержания — дороги, ж/д и порты стареют, пропускная способность падает.")}</p>` : ""}
          <h4>${L("Trasy do partnerów (drożność)", "Маршруты к партнёрам (проходимость)")}</h4>${S.PK.map(pk => { const r = s.partners[pk].route * (D.partners[pk].restricted ? 0.3 : 1); return `<div class="pl-hb"><span>${flag(pk, 18)} ${nm(D.partners[pk])}</span><div class="pl-hbt"><i style="width:${clamp(r * 100, 0, 100).toFixed(0)}%;background:${r < 0.9 ? "#ff9f3a" : "var(--pl-blue)"}"></i></div><b>${n0(r * 100)}%</b></div>`; }).join("")}
          <h4>${L("Wykorzystanie przepustowości importu", "Загрузка импортных мощностей")}</h4>${S.MK.map(k2 => { const q = mk[k2], u = q.imp / Math.max(1e-6, q.impCap); return `<div class="pl-hb"><span>${nm(D.markets[k2])}</span><div class="pl-hbt"><i style="width:${clamp(u * 100, 0, 100).toFixed(0)}%;background:${u > 0.9 ? "var(--pl-red)" : u > 0.75 ? "var(--pl-gold)" : "var(--pl-green)"}"></i></div><b>${n0(u * 100)}%</b></div>`; }).join("")}
          <h4>${L("Programy", "Программы")}</h4>${["programs.logistyka", "programs.siec"].map(slider).join("")}${draftBox()}`;
      } else if (k === "dyplo"){
        const busy = pk => (s.diplo || []).find(d => d.pk === pk);
        h += `<p class="small muted">${L("Bez wojen i sankcji — tylko misje handlowe i umowy. Lepsze relacje = więcej ofert, lepsze ceny i więcej miejsca w negocjacjach. Efekt narasta stopniowo.", "Без войн и санкций — только торговые миссии и соглашения. Лучше отношения — больше предложений, лучше цены и больше уступок. Эффект нарастает постепенно.")}</p>
          <div class="pl-two"><div class="pl-kv"><small>${L("Misja handlowa", "Торговая миссия")}</small><b>${n1(S.DIPLO.mission.cost)} ${L("mld zł · ~6 mies.", "млрд · ~6 мес.")}</b></div><div class="pl-kv"><small>${L("Umowa handlowa", "Торговое соглашение")}</small><b>${n1(S.DIPLO.agreement.cost)} ${L("mld zł · ~12 mies.", "млрд · ~12 мес.")}</b></div></div>
          ${S.PK.map(pk => { const P = D.partners[pk], sp = s.partners[pk], tr = partnerTrade(pk), b = busy(pk);
            return `<div class="pl-offer"><div class="pl-oh">${flag(pk, 30)}<div><b>${nm(P)}</b><small>${L("Handel", "Торговля")}: ${lvl(tr.exp - tr.imp, n0)} ${L("mld/rok", "млрд/год")} · ${L("niezawodność", "надёжность")} ${n0(sp.reliability * 100)}%</small></div><span class="${sp.relationship > 0.6 ? "g" : sp.relationship > 0.35 ? "gold" : "r"}">${n0(sp.relationship * 100)}/100</span></div>
              <i class="pl-pbar"><b style="width:${(sp.relationship * 100).toFixed(0)}%"></b></i>
              ${P.restricted ? `<p class="small r">${L("Sankcje — działania dyplomatyczne niedostępne.", "Санкции — дипломатические действия недоступны.")}</p>` : b ? `<p class="small">${ic("clock")}${b.kind === "mission" ? L("Misja handlowa w toku", "Торговая миссия идёт") : L("Umowa w toku", "Соглашение в работе")}: ${Math.round(b.t / b.len * 100)}%</p>`
                : `<div class="pl-two"><button class="pl-btn" data-dip="${pk}:mission">${L("Misja handlowa", "Торговая миссия")}</button><button class="pl-btn go" data-dip="${pk}:agreement">${L("Umowa handlowa", "Соглашение")}</button></div>`}</div>`; }).join("")}`;
      } else if (k === "dane"){
        h += `<p class="small pl-note">${esc(D.dataNote)}</p>${tabs()}${[["gdp", L("Wzrost PKB r/r %", "Рост ВВП г/г %")], ["inflation", L("Inflacja %", "Инфляция %")], ["unemployment", L("Bezrobocie %", "Безработица %")], ["debt", L("Dług/PKB %", "Долг/ВВП %")], ["budget", L("Saldo budżetu", "Сальдо бюджета")], ["trade", L("Saldo handlu", "Торговое сальдо")], ["gas", L("Gaz zł/MWh", "Газ zł/MWh")]].map(([key, t]) => `<h4>${t}</h4>${seriesChart(key, dataMode)}`).join("")}
          <h4>${L("Twoje decyzje", "Ваши решения")}</h4><ul class="small">${s.decisions.slice(-15).reverse().map(d => `<li>${dateStr(d.day)} · ${esc(String(d.k))}: ${d.from != null ? esc(String(+(+d.from).toFixed(2))) + " → " : ""}${esc(String(typeof d.v === "number" ? +d.v.toFixed(2) : d.v))}</li>`).join("") || `<li class="muted">${L("Brak.", "Нет.")}</li>`}</ul>`;
      } else if (k === "teoria"){
        const LE = window.PLLearn, C = LE.concept(learnSel) || LE.CONCEPTS[0], tl = x => x[li];
        const TGT = tg => { const sec = targetSection(tg); const lab = tg.startsWith("programs.") ? nm(D.programs[tg.slice(9)]) : tg.startsWith("reserve.") ? L("Rezerwy", "Резервы") : ({ rate: L("Stopa procentowa", "Ставка"), vat: "VAT", pit: "PIT", social: L("Świadczenia", "Соцвыплаты"), admin: L("Administracja", "Администрация"), budget: L("Budżet", "Бюджет"), trade: L("Kontrakty", "Контракты"), capBuffer: L("Bufor banków", "Буфер банков") }[tg] || tg);
          return tg === "trade" ? `<button class="pl-chip" data-ov="contracts">${esc(lab)}</button>` : sec ? `<button class="pl-chip" data-sec="${sec}">${esc(lab)}</button>` : ""; };
        h += `<p class="small muted">${L("Krótkie karty pojęć z gry. Zacznij od definicji i przykładu z Twojej gospodarki; mechanizm i ograniczenia modelu są niżej.", "Короткие карточки понятий игры. Начните с определения и примера из вашей экономики; механизм и ограничения модели — ниже.")}</p>
          <div class="pl-chips">${LE.CONCEPTS.map(c => `<button class="pl-chip${c.id === C.id ? " on" : ""}" data-learn="${c.id}">${esc(tl(c.title))}</button>`).join("")}</div>
          <section class="pl-card2"><h4>${esc(tl(C.title))}</h4><p><b>${L("Definicja", "Определение")}:</b> ${esc(tl(C.def))}</p><p><b>${L("Dlaczego to ważne", "Почему это важно")}:</b> ${esc(tl(C.why))}</p>
            <p class="pl-note"><b>${L("Przykład z Twojej gry", "Пример из вашей игры")}:</b> ${esc(C.ex(s, L))}</p>
            <details open><summary>${L("Mechanizm (jak to działa w modelu)", "Механизм (как это работает в модели)")}</summary><p>${esc(tl(C.mech))}</p></details>
            <p><b>${L("Na co możesz wpłynąć", "На что можно повлиять")}:</b></p><div class="pl-chips">${C.influence.map(TGT).join("")}</div>
            <details><summary>${L("Ograniczenia modelu", "Ограничения модели")}</summary><p class="muted">${esc(tl(C.limits))}</p></details></section>
          <details><summary>${L("Słowniczek wskaźników", "Словарь показателей")}</summary><dl class="pl-glos">${Object.keys(LE.GLOSSARY).map(g => `<dd>${esc(LE.GLOSSARY[g][li])}</dd>`).join("")}</dl></details>`;
      } else if (k === "ust"){
        h += `<div class="pl-oact col"><button class="pl-btn" id="plsave">${ic("save")}${L("Zapisz grę", "Сохранить")}</button><button class="pl-btn" id="plload">${ic("folder")}${L("Wczytaj zapis", "Загрузить")}</button><button class="pl-btn" id="plnew">${ic("plus")}${L("Nowa gra", "Новая игра")}</button><button class="pl-btn" id="pltutr">${ic("cap")}${L("Samouczek od nowa", "Обучение заново")}</button></div>
          <p class="small muted">${L("Gra zapisuje się automatycznie co miesiąc (w tej przeglądarce).", "Игра сохраняется автоматически каждый месяц (в этом браузере).")} Seed: ${s.seed}</p><p class="small pl-note">${esc(D.dataNote)} ${L("Bez wojen, armii i budżetu obrony — z założenia gry.", "Без войн, армии и оборонного бюджета — по замыслу игры.")}</p>`;
      }
      return h;
    }
    // pasek złożony z części (np. struktura dochodów) i pasek poziomy
    function stackBar(parts, fmt){
      const tot = parts.reduce((a, p) => a + Math.abs(p[1]), 0) || 1;
      return `<div class="pl-stack">${parts.map(([t, v, c]) => `<i style="width:${(Math.abs(v) / tot * 100).toFixed(1)}%;background:${c}" title="${esc(t)}: ${fmt(v)}"></i>`).join("")}</div><ul class="pl-leg row">${parts.map(([t, v, c]) => `<li><i style="background:${c}"></i>${esc(t)} <b>${fmt(v)}</b></li>`).join("")}</ul>`;
    }
    function hbar(parts, max){ return `<div class="pl-hbt">${parts.map(([t, v, c]) => `<i style="width:${(Math.max(0, v) / Math.max(1e-6, max) * 100).toFixed(1)}%;background:${c}" title="${esc(t)}: ${n0(v)}"></i>`).join("")}</div>`; }

    const topEl = $(".pl-top"), setTopH = () => host.style.setProperty("--toph", topEl.offsetHeight + "px");
    setTopH(); if (window.ResizeObserver) new ResizeObserver(setTopH).observe(topEl);
    // dopasowanie mapy do wolnego miejsca: pod półprzezroczystym paskiem, obok prawej kolumny
    function fitMap(){
      const svg = $("#plmap"), wr = $("#plmapwrap"), W = wr.clientWidth, H = wr.clientHeight; if (!W || !H) return;
      const rc = $("#plright"), resR = rc && rc.offsetParent ? rc.offsetWidth + 24 : 0, top = isMobile() ? 0 : topEl.offsetHeight;
      const k = Math.min((W - resR) / 1000, (H - top) / 690);
      const x0 = -((W - resR) / k - 1000) / 2, y0 = 5 - top / k - ((H - top) / k - 690) / 2;
      svg.setAttribute("viewBox", `${x0.toFixed(1)} ${y0.toFixed(1)} ${(W / k).toFixed(1)} ${(H / k).toFixed(1)}`);
    }
    if (window.ResizeObserver) new ResizeObserver(fitMap).observe($("#plmapwrap")); else addEventListener("resize", fitMap);
    const LS_NAV = "makro2.pl.navmini";
    try { const v = localStorage.getItem(LS_NAV); host.classList.toggle("navmini", v == null ? innerWidth < 1440 : v === "1"); } catch { host.classList.toggle("navmini", innerWidth < 1440); }
    $("#plnavt").onclick = () => { const m = host.classList.toggle("navmini"); try { localStorage.setItem(LS_NAV, m ? "1" : "0"); } catch {} };
    const drawNav = () => $$("#plnav [data-nsec]").forEach(b => b.classList.toggle("on", b.dataset.nsec === "advisor" ? ov === "advisor" : section === b.dataset.nsec));
    function drawSection(){
      const box = $("#pldrawer"); drawNav();
      if (!section){ if (!partnerSel) box.hidden = true; return; }
      partnerSel = null;
      const sc = box.scrollTop; box.hidden = false; box.classList.remove("ctx"); box.innerHTML = sectionHtml(section); box.scrollTop = sc;
      wireSliders(box); drawDraft(); $$(".pl-bars", box).forEach(b => b.scrollLeft = b.scrollWidth);
      const on = (id, f) => { const b = $("#" + id, box); if (b) b.onclick = f; };
      on("plsave", () => { save(); toast(L("Zapisano.", "Сохранено.")); });
      on("plload", () => { const r = S.deserialize(localStorage.getItem(LS_SAVE) || ""); if (!r.ok){ toast(L("Brak poprawnego zapisu.", "Нет корректного сохранения.")); return; } s = r.state; draft = {}; lastMonth = S.date(s.dayIndex).monthIndex; toast(L("Wczytano zapis.", "Сохранение загружено.")); refresh(true); drawSection(); });
      on("plnew", async () => { if (await confirmBox(L("Nowa gra?", "Новая игра?"), `<p>${L("Obecna gra zostanie zastąpiona.", "Текущая игра будет заменена.")}</p>`, L("Zacznij od nowa", "Начать заново"))){ s = S.newGame((Date.now() % 1e9) >>> 0); draft = {}; why = null; lastMonth = 0; chatHtml = ""; save(); setSpeed(0); refresh(true); drawSection(); drawWhy(); } });
      on("pltutr", () => { tut = { done: false, step: 0 }; saveTut(); section = null; drawSection(); drawTut(); });
    }
    function openSection(k){ objSel = null; if (section !== k) draft = {}; section = k; ov = null; drawOv(true); host.classList.remove("navopen"); drawSection(); drawMap(); tutCheck(); }
    function openPartner(pk){
      objSel = null; partnerSel = pk; ui.partnerOpened = pk; section = null; draft = {}; ov = null; drawOv(true); drawNav();
      const P = D.partners[pk], sp = s.partners[pk], tr = partnerTrade(pk), ev = s.events.filter(e => D.events[e.k].partner === pk);
      const box = $("#pldrawer"); box.hidden = false; box.classList.add("ctx");
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
      else if (d.aidc){ const r = S.respondAid(s, d.aidc); $("#plmodal").hidden = true; $("#plmodal").innerHTML = ""; if (r) toast(L("Decyzja przekazana partnerowi.", "Решение передано партнёру.")); refresh(true); }
      else if (d.aidopen) showAid();
      else if (d.term){ termOpen.has(d.term) ? termOpen.delete(d.term) : termOpen.add(d.term); if (t.closest("#pldrawer")) drawSection(); else if (t.closest("#plwhy")) drawWhy(); else drawOv(true); }
      else if (d.learn){ why = null; drawWhy(); learnSel = d.learn; openSection("teoria"); }
      else if (d.help){ helpOpen.has(d.help) ? helpOpen.delete(d.help) : helpOpen.add(d.help); drawSection(); }
      else if (d.wt){ whyTab = d.wt; drawWhy(); }
      else if (d.dm){ dataMode = d.dm; drawSection(); }
      else if (d.chatfull){ chatFull = !chatFull; ovBuilt = null; drawOv(true); }
      else if (d.dip){ const [pk, kind] = d.dip.split(":"), r = S.diplomacy(s, pk, kind); toast(r.ok ? L("Działania dyplomatyczne rozpoczęte — relacje będą rosły stopniowo.", "Дипломатия начата — отношения будут расти постепенно.") : r.reason === "sanctions" ? L("Niedostępne — sankcje.", "Недоступно — санкции.") : L("Trwa już inna akcja z tym krajem.", "С этой страной уже идёт другое действие.")); refresh(true); drawSection(); }
      else if (d.group){ const G = GROUPS.find(g => g[0] === d.group); if (section && groupOf(section)?.[0] === d.group){ section = null; draft = {}; drawSection(); } else { const k = lastInGroup[d.group] || G[3][0]; if (k === "advisor") openOv("advisor"); else openSection(k); } }
      else if (d.close === "drawer"){ section = null; partnerSel = null; objSel = null; draft = {}; drawSection(); $("#pldrawer").hidden = true; drawMap(); }
      else if (d.close === "why"){ why = null; drawWhy(); }
      else if (d.close === "ov") closeOv();
      else if (d.why) openWhy(d.why);
      else if (d.sec){ why = null; drawWhy(); openSection(d.sec); }
      else if (d.ov) openOv(d.ov);
      else if (d.partner) openPartner(d.partner);
      else if (d.ans) answer(d.ans, t.textContent);
      else if (d.cp != null) chipPath(d.cp);
      else if (d.apply) applyPlan();
      else if (d.acc){ S.acceptOffer(s, +d.acc); toast(L("Kontrakt podpisany.", "Контракт подписан.")); refresh(true); }
      else if (d.rej){ S.rejectOffer(s, +d.rej); refresh(true); }
      else if (d.neg) negForm(+d.neg);
      else if (d.inn){ S.implementInnovation(s, d.inn); toast(L("Wdrażanie rozpoczęte.", "Внедрение начато.")); drawSection(); }
      else if (d.cancel){ const c = s.contracts.find(x => x.id === +d.cancel);
        if (c && await confirmBox(L("Zerwać kontrakt?", "Разорвать контракт?"), `<p>${L("Kara", "Штраф")}: <b>${n1(S.cancelPenalty(c))} ${L("mld zł", "млрд zł")}</b>. ${L("Spadnie zaufanie partnera i wiarygodność Polski — przyszłe oferty będą gorsze.", "Упадёт доверие партнёра и надёжность Польши — будущие предложения будут хуже.")}</p>`, L("Zerwij", "Разорвать"))){ S.cancelContract(s, c.id); refresh(true); } }
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
    // Samouczek: każdy krok = jedna lekcja na żywych danych. Kroki z akcją mają przycisk „Pokaż mi” (wykonuje akcję za gracza).
    const TUT = [
      { t: L("Wskaźniki na górze", "Показатели наверху"), b: L("Każda liczba ma okres: „r/r” = w porównaniu z tym samym momentem rok temu, „30 dni” = zmiana w ostatnim miesiącu. Kolor strzałki mówi, czy zmiana jest zwykle korzystna (zielona) czy nie (czerwona). Najedź na wskaźnik, aby zobaczyć definicję.", "У каждого числа есть период: «г/г» = по сравнению с тем же моментом год назад, «30 дн.» = изменение за месяц. Цвет стрелки показывает, обычно ли это хорошо (зелёная) или плохо (красная). Наведите на показатель, чтобы увидеть определение."), sel: "#plkpi" },
      { t: L("Czas", "Время"), b: L("Naciśnij 1× — jeden dzień trwa ok. 12 s. Nie ma przycisku „następny miesiąc”: gospodarka żyje cały czas, a pauza (lub spacja) daje czas na decyzje. Wynik nie zależy od tempa.", "Нажмите 1× — один день ≈ 12 с. Кнопки «следующий месяц» нет: экономика живёт постоянно, пауза (или пробел) даёт время на решения. Результат не зависит от скорости."), sel: "#plspeed", wait: () => clock.speed > 0, act: () => setSpeed(1) },
      { t: L("Mapa i trasy handlowe", "Карта и торговые маршруты"), b: L("Kolor trasy = główny rodzaj towarów (niebieski przemysł, pomarańczowy energia, zielony żywność), grubość i liczba = wartość handlu w mld zł/rok. Kliknij Niemcy — największego partnera.", "Цвет маршрута = основной вид товаров (синий промышленность, оранжевый энергия, зелёный еда), толщина и число = объём торговли в млрд zł/год. Нажмите Германию — крупнейшего партнёра."), sel: "#plmapwrap", wait: () => ui.partnerOpened === "DE", act: () => openPartner("DE") },
      { t: L("Sektory i indeksy", "Секторы и индексы"), b: L("Otwórz Gospodarka → Sektory. Większość wartości to indeksy względem startu gry (1,00 = początek 2026 r.). Przy pojęciach jest „?” z definicją — np. energochłonność to energia potrzebna na jednostkę produkcji.", "Откройте Экономика → Секторы. Большинство значений — индексы к старту (1,00 = начало 2026 г.). У понятий есть «?» с определением — например, энергоёмкость = энергия на единицу продукции."), sel: "#plnav", msel: "#plmnav", wait: () => section === "sektory", act: () => openSection("sektory"), pre: () => { partnerSel = null; $("#pldrawer").hidden = true; drawMap(); } },
      { t: L("Budżet państwa", "Госбюджет"), b: L("Otwórz Państwo → Budżet. Saldo = dochody − wydatki w ciągu roku; dług to suma dawnych deficytów. Deficyt nie zmienia wskaźnika dług/PKB 1:1, bo PKB też rośnie.", "Откройте Государство → Бюджет. Сальдо = доходы − расходы за год; долг — сумма прошлых дефицитов. Дефицит не меняет долг/ВВП 1:1, потому что ВВП тоже растёт."), sel: "#plnav", msel: "#plmnav", wait: () => section === "budzet", act: () => openSection("budzet") },
      { t: L("Inwestycje działają z opóźnieniem", "Инвестиции работают с задержкой"), b: L("Otwórz Infrastruktura → Energia i kliknij „?” przy programie. Zobaczysz, co się dzieje teraz, za 3–12 mies., za 1–3 lata i w długim okresie — przy zwiększeniu i przy cięciu. Koszt jest od razu, efekt później.", "Откройте Инфраструктура → Энергетика и нажмите «?» у программы. Увидите, что происходит сейчас, через 3–12 мес., через 1–3 года и в долгом сроке — при увеличении и сокращении. Расход сразу, эффект позже."), sel: "#plnav", msel: "#plmnav", wait: () => section === "energia", act: () => openSection("energia") },
      { t: L("Handel i kontrakty", "Торговля и контракты"), b: L("Otwórz „Handel i kontrakty” (Rynki → Handel albo panel kontraktów). Saldo handlowe = eksport − import; to nie jest budżet państwa. Oferty mają ocenę: wartość, porównanie z rynkiem, ryzyko i kary.", "Откройте «Торговля и контракты» (Рынки → Торговля или панель контрактов). Торговое сальдо = экспорт − импорт; это не госбюджет. У предложений есть оценка: стоимость, сравнение с рынком, риск и штрафы."), sel: "#plcon", msel: "#plmnav", wait: () => ov === "contracts", act: () => openOv("contracts"), pre: () => { section = null; drawSection(); } },
      { t: L("Doradca i prognozy", "Советник и прогнозы"), b: L("Otwórz doradcę (Analiza → Doradca). Prognozy na 12/36/60 mies. są warunkowe: zakładają brak losowych wydarzeń. „Pewność” to wskaźnik heurystyczny, a nie prawdopodobieństwo. Każde zalecenie pokazuje koszt, czas i to, czy cel jest osiągalny.", "Откройте советника (Анализ → Советник). Прогнозы на 12/36/60 мес. условные: без случайных событий. «Уверенность» — эвристический индекс, а не вероятность. Каждая рекомендация показывает стоимость, сроки и достижимость цели."), sel: "#pladv", msel: "#plmnav", wait: () => ov === "advisor", act: () => openOv("advisor") },
      { t: L("Panel „Dlaczego?”", "Панель «Почему?»"), b: L("Kliknij „Inflacja r/r” na górze. Panel rozdziela przyczyny zmiany, skład wartości i skutki. Jeśli nic się wyraźnie nie zmieniło, powie wprost, że nie ma dominującej przyczyny.", "Нажмите «Инфляция г/г» наверху. Панель разделяет причины изменения, состав значения и последствия. Если ничего заметно не изменилось, она прямо скажет, что доминирующей причины нет."), sel: "#plkpi", wait: () => ui.whyOpened, act: () => openWhy("inflation"), pre: () => closeOv() },
      { t: L("Pytania do doradcy", "Вопросы советнику"), b: L("Zadaj pytanie własnymi słowami (np. „dlaczego gaz drożeje?”) albo wybierz kategorię. Doradca działa bez internetu — rozpoznaje słowa kluczowe, a gdy nie jest pewien, poprosi o doprecyzowanie.", "Задайте вопрос своими словами («почему дорожает газ?») или выберите категорию. Советник работает без интернета — распознаёт ключевые слова, а если не уверен, попросит уточнить."), sel: "#plchat", wait: () => ui.asked, act: () => { if (ov !== "advisor") openOv("chat"); setTimeout(() => ask(L("dlaczego gaz drożeje", "почему дорожает газ")), 50); }, pre: () => { why = null; drawWhy(); openOv("chat"); } },
      { t: L("Decyzja → skutki później", "Решение → последствия позже"), b: L("Przesuń dowolny suwak: zanim zatwierdzisz, podgląd pokaże prognozę obecnej i nowej polityki po 12, 36 i 60 mies. oraz koszt dla budżetu. Gra niczego nie zmienia, dopóki nie klikniesz „Zatwierdź”.", "Сдвиньте любой ползунок: до подтверждения предпросмотр покажет прогноз текущей и новой политики через 12, 36 и 60 мес. и стоимость для бюджета. Игра ничего не меняет, пока вы не нажмёте «Утвердить»."), pre: () => closeOv() },
      { t: L("Historia: prognoza a rzeczywistość", "История: прогноз и реальность"), b: L("Otwórz Analiza → Dane i historia: słupki po miesiącach i latach. Po roku gry doradca porówna swoją prognozę sprzed 12 mies. z tym, co się naprawdę stało — i wyjaśni różnice. Teoria pojęć: Analiza → Teoria. Samouczek możesz powtórzyć w Ustawieniach.", "Откройте Анализ → Данные и история: столбцы по месяцам и годам. Через год советник сравнит прогноз 12-месячной давности с реальностью и объяснит разницу. Теория: Анализ → Теория. Обучение можно повторить в Настройках."), sel: "#plnav", msel: "#plmnav", wait: () => section === "dane", act: () => openSection("dane") },
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
        <div class="pl-oact">${waiting ? `${st.act ? `<button class="pl-btn go" id="pltact">${L("Pokaż mi", "Покажи")}</button>` : ""}<button class="pl-btn" id="pltnext">${L("Dalej", "Далее")}</button>` : `<button class="pl-btn go" id="pltnext">${tut.step === TUT.length - 1 ? L("Gotowe", "Готово") : L("Dalej", "Далее")}</button>`}<button class="pl-btn" id="pltskip">${L("Pomiń samouczek", "Пропустить обучение")}</button></div></div>`;
      const nx = $("#pltnext"); if (nx) nx.onclick = () => { tut.step++; if (tut.step >= TUT.length) tut.done = true; saveTut(); TUT[tut.step]?.pre?.(); drawTut(); };
      const ac = $("#pltact"); if (ac) ac.onclick = () => { st.act(); tutCheck(); };
      $("#pltskip").onclick = () => { tut.done = true; saveTut(); drawTut(); };
    }
    function tutCheck(){ if (tut.done) return; const st = TUT[tut.step]; if (st?.wait && st.wait()){ tut.step++; if (tut.step >= TUT.length) tut.done = true; saveTut(); TUT[tut.step]?.pre?.(); } drawTut(); }
    $("#pltut").onclick = () => { tut = { done: false, step: 0 }; saveTut(); drawTut(); };

    // ------------------------------------------------------------ pętla czasu
    function refresh(force){
      drawTop(); drawKpis(); drawMap(); drawRight(force); drawOv(force);
      if (why) drawWhy();
      if (partnerSel && force) openPartner(partnerSel);
      if (objSel && force) openObject(objSel);
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
      if (s.aid && s.aid.id !== aidSeen){ aidSeen = s.aid.id; setSpeed(0); showAid(); drawRight(true); }
      sinceWhy += dt;
      if (n){ drawKpis(); drawMap(); drawRight(false); drawOv(false);
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
    if (oldSave) toast(L("Zapis pochodził z poprzedniej wersji modelu — zaczynamy nową grę.", "Сохранение от старой версии модели — начинаем новую игру."));
    requestAnimationFrame(loop);
    window.__plGame = { get state(){ return s; }, clock, refresh: () => refresh(true) };   // dostęp dla testów (Playwright)
  }

  window.BrainstormGame = { mount };
})();
