// Brainstorm: mapa szkoleniowa „Nieurodzaj” v4 — diorama 3D (Three.js), czas w tygodniach/dniach,
// opóźnione efekty decyzji i panel „Dlaczego?”. Cel: pokazać łańcuch przyczyn oraz różnicę między
// decyzją RACJONALNĄ (spełnia cele) a OPTYMALNĄ (największy dobrobyt spośród racjonalnych).
(function () {
  "use strict";
  const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  let threeP = null;
  const loadThree = () => threeP || (threeP = new Promise(res => {
    if (window.THREE) return res(window.THREE);
    const s = document.createElement("script"); s.src = THREE_URL;
    s.onload = () => res(window.THREE || null); s.onerror = () => res(null);
    document.head.appendChild(s);
  }));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const r1 = v => Math.round(v * 10) / 10;
  const fmt = v => String(r1(v)).replace(".", ",");
  const sign = v => (v > 0 ? "+" : "") + fmt(v);
  const n0 = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const sn0 = v => (v > 0 ? "+" : v < 0 ? "−" : "") + n0(Math.abs(v));
  const zl = v => (Math.round(v * 100) / 100).toFixed(2).replace(".", ",") + " zł";

  // ================================================================ MODEL v4 (rozliczenie miesięczne)
  // Jednostki: zboże w tonach (t), chleb w tys. bochenków; 1 t zboża ≈ 1 tys. bochenków.
  const MONTHS = 12, DAYS = 30, BASE_P = 5, NORM = 1000;
  const REF = { harvest: 900, imp: 100 };                  // normalny rok: 900 t z kraju + 100 t importu
  const BLOCKADE = [2, 3, 4];                               // miesiące 3–5: blokada importu
  const importCap = m => BLOCKADE.includes(m) ? 120 : 400;
  const WEATHER = [1, 1, 0.9, 0.8, 0.9, 1, 1, 1, 1, 1.08, 1.04, 1];
  const potential = m => m < 9 ? 700 + 25 * m : 1000;      // pola odbudowują się po suszy; nowe żniwa w 10. mies.
  const BUILD = { piekarnia2: { cost: 12, months: 3, jobs: 20, site: 15 }, nawadnianie: { cost: 10, months: 4, jobs: 8, site: 10 } };
  const GOALS = { price: 6.5, shortage: 2, farmInc: 75, budget: -10, unemp: 8 };
  const ADJ = 0.4, MOVE = 0.15, MOVE_SHOCK = 0.25, IMP_ADJ = 0.5, LABOR = 1040;

  function newState(){
    return { m: 0, day: 0, done: false, stock: 500, budget: 10, subsidyBoost: 0, bakeries: 1, irrig: 0, projects: [],
      price: 6, imp: 100, pop: 1, unempPrev: 6.5,
      d: { tariff: 30, reserve: 0, subsidy: 0, cap: 0, rate: 5 }, hist: [], log: [] };
  }
  const weatherName = (w, L) => w >= 1.05 ? L("dobra pogoda", "хорошая погода") : w >= 1 ? L("normalna pogoda", "обычная погода") : w >= 0.85 ? L("słaba pogoda", "плохая погода") : L("susza", "засуха");

  // d.reserve < 0 = kupuj do magazynu (t/mies.), > 0 = uwalniaj
  function sim(st, d = st.d){
    const m = Math.min(st.m, MONTHS - 1);
    const k = st.irrig, w = WEATHER[m], wEff = 1 - (1 - w) * (1 - 0.6 * k);
    const pot = potential(m) * (1 + 0.12 * k);
    const harvest = pot * wEff + st.subsidyBoost;
    const icap = importCap(m), impTarget = icap * clamp(1 - d.tariff / 40, 0, 1);
    const imp = Math.min(icap, st.imp + IMP_ADJ * (impTarget - st.imp));
    const rel = d.reserve > 0 ? Math.min(d.reserve, st.stock) : 0;
    const buy = d.reserve < 0 ? -d.reserve : 0;
    const grain = Math.max(1, harvest + imp + rel - buy);
    const capacity = NORM * st.bakeries;
    const production = Math.min(grain, capacity);
    const bottleneck = grain > capacity ? "bakery" : "grain";
    const rateF = 1 - 0.012 * (d.rate - 5), incF = clamp(1 - 0.008 * (st.unempPrev - 6), 0.85, 1.05);
    const Dbase = NORM * st.pop * incF * rateF;               // popyt przy cenie 5 zł
    const D = p => Dbase * Math.pow(BASE_P / p, 0.6);
    const Peq = BASE_P * Math.pow(Dbase / production, 1 / 0.6);
    const shock = m === BLOCKADE[0] || w <= 0.8;
    const mv = shock ? MOVE_SHOCK : MOVE;
    const Pfree = clamp(st.price + ADJ * (Peq - st.price), st.price * (1 - mv), st.price * (1 + mv));
    let P = Pfree, capped = false;
    if (d.cap && d.cap < Pfree){ P = d.cap; capped = true; }
    const demand = D(P), sales = Math.min(demand, production);
    const short = Math.max(0, demand - production), surplus = Math.max(0, production - demand);
    const shortage = 100 * short / demand;
    const gf = (P / BASE_P) * Math.pow(Math.min(1, capacity / grain), 1.5);
    const grainPrice = 1000 * gf;                             // zł za tonę (normalnie 1000 zł/t)
    const farmSales = 100 * harvest / REF.harvest * gf;
    const farmInc = farmSales + 2 * d.subsidy;               // % normalnego dochodu rolników
    const power = clamp(100 * BASE_P / P - shortage * 1.5, 0, 150);
    const building = st.projects.reduce((s, p) => s + BUILD[p.type].site, 0);
    const jobs = { base: 905, farm: 0.06 * harvest, bakery: 20 * st.bakeries * (0.6 + 0.4 * production / capacity), irrig: BUILD.nawadnianie.jobs * k, build: building, rate: -8 * (d.rate - 5) };
    const employed = Object.values(jobs).reduce((s, v) => s + v, 0);
    const unemp = clamp(100 * (1 - employed / LABOR), 3, 30);
    const taxes = employed * 0.004, tariffRev = imp / 10 * d.tariff * 0.006;
    const spendFixed = 3.0, benefits = unemp * 0.08, reserveCost = rel * 0.008 + buy * 0.015;
    const buildCost = st.projects.reduce((s, pr) => s + BUILD[pr.type].cost / BUILD[pr.type].months, 0);
    const net = taxes + tariffRev - spendFixed - d.subsidy - benefits - reserveCost - buildCost;
    const budgetAfter = st.budget + net;
    const dP = 100 * (P - st.price) / st.price;
    const parts = { power: clamp(power, 0, 100), jobs: clamp(100 - (unemp - 5) * 10, 0, 100), farm: clamp(farmInc, 0, 100), fiscal: clamp(60 + budgetAfter * 2, 0, 100), stable: clamp(100 - 6 * Math.abs(dP) - 3 * shortage, 0, 100) };
    const W = 0.4 * parts.power + 0.2 * parts.jobs + 0.2 * parts.farm + 0.1 * parts.fiscal + 0.1 * parts.stable;
    const inflation = 2.5 + dP * 0.8 - (d.rate - 5) * 0.7;
    const ok = { price: P <= GOALS.price, shortage: shortage <= GOALS.shortage, farmInc: farmInc >= GOALS.farmInc, budget: budgetAfter >= GOALS.budget, unemp: unemp <= GOALS.unemp };
    return { m, w, k, pot, harvest, imp, impTarget, icap, rel, buy, grain, capacity, production, bottleneck, Dbase, incF, rateF, Peq, Pfree, P, p: P, prevP: st.price, dP, capped, demand, sales, short, surplus, shortage,
      grainPrice, farmSales, farmInc, power, jobs, employed, unemp, taxes, tariffRev, spendFixed, benefits, reserveCost, buildCost, subsidy: d.subsidy, net, budgetAfter, parts, W, inflation, ok,
      rational: Object.values(ok).every(Boolean), demandAt: D, stockAfter: st.stock - rel + buy };
  }

  // Jeden miesiąc do przodu (czysta funkcja — używana też w prognozach i przez doradcę)
  function step(st, d = st.d){
    const r = sim(st, d);
    const n = { ...st, d: { ...d }, projects: st.projects.map(p => ({ ...p })) };
    n.stock = r.stockAfter; n.budget = r.budgetAfter; n.price = r.P; n.imp = r.imp; n.unempPrev = r.unemp;
    n.pop = st.pop * 1.003 * (st.m === 6 ? 1.03 : 1);
    n.subsidyBoost = Math.min(150, st.subsidyBoost + d.subsidy * 2.5);
    const finished = [];
    n.projects.forEach(p => p.left--);
    const ir = n.projects.find(p => p.type === "nawadnianie");
    if (ir){ const M = BUILD.nawadnianie.months, e = M - ir.left; n.irrig = ir.left <= 0 ? 1 : clamp((e - 1) / (M - 1), 0, 1); }
    n.projects = n.projects.filter(p => { if (p.left <= 0){ finished.push(p.type); if (p.type === "piekarnia2") n.bakeries = 2; if (p.type === "nawadnianie") n.irrig = 1; return false; } return true; });
    n.m = st.m + 1; n.day = 0; n.done = n.m >= MONTHS;
    if (n.d.reserve > n.stock) n.d.reserve = Math.floor(n.stock / 10) * 10;
    return { n, r, finished };
  }
  // dNext: decyzje w kolejnych miesiącach (domyślnie te same) — pozwala doradcy planować zapas pod blokadę
  function horizon(st, d, len = 4, dNext = d){
    let s = st; const rs = [];
    for (let i = 0; i < len && s.m < MONTHS; i++){ const x = step(s, i ? { ...dNext, reserve: Math.min(dNext.reserve, Math.floor(s.stock)) } : d); rs.push(x.r); s = x.n; }
    return { rs, end: s };
  }

  // Optimum = największy dobrobyt (średnio w tym i 3 kolejnych miesiącach) SPOŚRÓD decyzji racjonalnych.
  function bestPolicy(st){
    let best = null;
    for (const tariff of [0, 10, 20, 30, 40]) for (const reserve of [-100, -50, 0, 50, 100, 150, 200, 250]) for (const subsidy of [0, 2, 4]) for (const rate of [4, 5, 6]) for (const later of [0, 100, 200]){
      if (reserve > st.stock) continue;
      const d = { tariff, reserve, subsidy, cap: 0, rate };
      const { rs, end } = horizon(st, d, 4, { ...d, reserve: later }), r = rs[0];
      const left = Math.max(0, MONTHS - st.m - rs.length);
      const endBudget = end.budget + rs[rs.length - 1].net * left;
      const level = r.rational ? (endBudget >= GOALS.budget ? 0 : 1) : 2;
      const viol = Object.values(r.ok).filter(v => !v).length;
      const Wh = rs.reduce((s, x) => s + x.W, 0) / rs.length;
      const c = { d, r, rs, level, viol, Wh, endBudget };
      if (!best || c.level < best.level || (c.level === best.level && (c.level === 2 ? (c.viol < best.viol || (c.viol === best.viol && c.Wh > best.Wh)) : c.Wh > best.Wh))) best = c;
    }
    return best;
  }
  const inProgress = (st, t) => st.projects.some(p => p.type === t);
  const startBuild = (st, type) => st.projects.push({ type, left: BUILD[type].months });
  function advance(st){
    const best = bestPolicy(st);
    const { n, r, finished } = step(st);
    const hist = st.hist, log = st.log;
    Object.assign(st, n, { hist, log });
    hist.push({ m: r.m, d: { ...n.d }, r, bestW: best.r.W, best: best.d });
    return { r, finished };
  }
  function grade(st){
    const H = st.hist, W = H.reduce((s, h) => s + h.r.W, 0) / H.length, bestW = H.reduce((s, h) => s + h.bestW, 0) / H.length;
    const rationalShare = H.filter(h => h.r.rational).length / H.length;
    const eff = clamp(100 - Math.max(0, bestW - W) * 4, 0, 100);
    const stars = (rationalShare >= 0.75 ? 1 : 0) + (eff >= 90 ? 1 : 0) + (eff >= 97 && rationalShare === 1 ? 1 : 0);
    return { W, bestW, rationalShare, eff, stars };
  }

  // ================================================================ PRZYCZYNY („Dlaczego?”)
  // Wkład czynników w odchylenie ceny równowagi od normalnych 5 zł (w t / tys. bochenków; + = presja w górę).
  function causes(st, r, L){
    const out = [];
    const add = (k, v, txt) => { if (Math.abs(v) >= 8) out.push({ k, v, txt }); };
    if (r.bottleneck === "grain"){
      const dh = REF.harvest - r.harvest;
      add("harvest", dh, dh > 0 ? L(`Zbiory ${n0(r.harvest)} t — o ${n0(dh)} t mniej niż w normalnym roku (${weatherName(r.w, L)}, pola po suszy).`, `Урожай ${n0(r.harvest)} т — на ${n0(dh)} т меньше обычного (${weatherName(r.w, L)}, поля после засухи).`)
                             : L(`Zbiory ${n0(r.harvest)} t — o ${n0(-dh)} t więcej niż zwykle (${weatherName(r.w, L)}).`, `Урожай ${n0(r.harvest)} т — на ${n0(-dh)} т больше обычного (${weatherName(r.w, L)}).`));
      const di = REF.imp - r.imp, why = BLOCKADE.includes(r.m) ? L("trwa blokada importu", "идёт блокада импорта") : L(`cło ${st.d.tariff}%`, `пошлина ${st.d.tariff}%`);
      add("import", di, di > 0 ? L(`Import ${n0(r.imp)} t zamiast zwykłych ${REF.imp} t (${why}).`, `Импорт ${n0(r.imp)} т вместо обычных ${REF.imp} т (${why}).`)
                             : L(`Import ${n0(r.imp)} t — o ${n0(-di)} t więcej niż zwykle (${why}).`, `Импорт ${n0(r.imp)} т — на ${n0(-di)} т больше обычного (${why}).`));
      add("reserve", r.buy - r.rel, r.rel > 0 ? L(`Rezerwa dodaje na rynek ${n0(r.rel)} t zboża.`, `Резерв добавляет на рынок ${n0(r.rel)} т зерна.`) : L(`Zakupy do rezerwy zabierają z rynku ${n0(r.buy)} t.`, `Закупки в резерв забирают с рынка ${n0(r.buy)} т.`));
    } else {
      add("bakery", r.Dbase - r.capacity, r.Dbase > r.capacity ? L(`Piekarnie mogą upiec najwyżej ${n0(r.capacity)} tys. bochenków, a przy 5 zł ludzie chcą ${n0(r.Dbase)} tys.`, `Пекарни могут испечь максимум ${n0(r.capacity)} тыс. буханок, а при 5 zł люди хотят ${n0(r.Dbase)} тыс.`)
                                                    : L(`Piekarnie pieką ${n0(r.production)} tys. — więcej, niż ludzie chcą kupić po 5 zł (${n0(r.Dbase)} tys.).`, `Пекарни пекут ${n0(r.production)} тыс. — больше, чем люди хотят купить по 5 zł (${n0(r.Dbase)} тыс.).`));
    }
    const popV = NORM * (st.pop - 1), incV = NORM * st.pop * (r.incF - 1), rateV = r.Dbase - NORM * st.pop * r.incF;
    add("pop", popV, L(`Mieszkańców przybyło: popyt +${fmt(100 * (st.pop - 1))}% względem początku roku.`, `Жителей стало больше: спрос +${fmt(100 * (st.pop - 1))}% к началу года.`));
    add("income", incV, incV < 0 ? L(`Bezrobocie ${fmt(st.unempPrev)}% obniża dochody, więc ludzie kupują mniej (${fmt(100 * (r.incF - 1))}%).`, `Безработица ${fmt(st.unempPrev)}% снижает доходы, люди покупают меньше (${fmt(100 * (r.incF - 1))}%).`)
                                 : L(`Rosnące dochody zwiększają popyt (+${fmt(100 * (r.incF - 1))}%).`, `Растущие доходы увеличивают спрос (+${fmt(100 * (r.incF - 1))}%).`));
    add("rate", rateV, rateV < 0 ? L(`Stopa NBP ${fmt(st.d.rate)}% schładza popyt (${fmt(100 * (r.rateF - 1))}%).`, `Ставка NBP ${fmt(st.d.rate)}% охлаждает спрос (${fmt(100 * (r.rateF - 1))}%).`)
                                 : L(`Niska stopa NBP ${fmt(st.d.rate)}% pobudza popyt (+${fmt(100 * (r.rateF - 1))}%).`, `Низкая ставка NBP ${fmt(st.d.rate)}% разгоняет спрос (+${fmt(100 * (r.rateF - 1))}%).`));
    const up = r.Peq >= BASE_P;
    const list = out.filter(c => up ? c.v > 0 : c.v < 0).sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
    const tot = list.reduce((s, c) => s + Math.abs(c.v), 0) || 1;
    list.forEach(c => { c.share = Math.abs(c.v) / tot; c.col = c.share >= 0.4 ? "r" : c.share >= 0.2 ? "o" : "y"; });
    const against = out.filter(c => up ? c.v < 0 : c.v > 0);
    return { up, list, against, main: list[0] || null };
  }

  function texts(lang){
    const L = mk(lang);
    return { L,
      title: L("Nieurodzaj · mapa szkoleniowa", "Неурожай · учебная карта"),
      brief: L("Susza zniszczyła zbiory: rolnicy mają tylko ok. 700 t zboża miesięcznie zamiast normalnych 900 t, a pełne żniwa wrócą w 10. miesiącu. Chleb już podrożał do 6 zł. W miesiącach 3–5 import będzie zablokowany, a w 4. miesiącu prognozowana jest kolejna susza. Decyzje nie działają od razu: importerzy, ceny i budowy potrzebują czasu.",
               "Засуха уничтожила урожай: у фермеров лишь около 700 т зерна в месяц вместо обычных 900 т, полный урожай вернётся на 10-й месяц. Хлеб уже подорожал до 6 zł. В месяцы 3–5 импорт заблокирован, а на 4-й месяц прогнозируют новую засуху. Решения действуют не сразу: импортёрам, ценам и стройкам нужно время."),
      rationalDef: L("<b>Decyzja racjonalna</b> spełnia wszystkie cele (zielone wskaźniki). <b>Decyzja optymalna</b> to ta spośród racjonalnych, która daje największy <b>dobrobyt</b> — wspólny wynik konsumentów, pracowników, rolników, budżetu i stabilności rynku. Każda optymalna decyzja jest racjonalna, ale nie każda racjonalna jest optymalna.",
                     "<b>Рациональное решение</b> выполняет все цели (зелёные показатели). <b>Оптимальное решение</b> — то из рациональных, что даёт максимальное <b>благосостояние</b>: общий результат потребителей, работников, фермеров, бюджета и стабильности рынка. Любое оптимальное решение рационально, но не любое рациональное оптимально."),
      goalList: [
        L(`Chleb ≤ ${fmt(GOALS.price)} zł (normalnie 5 zł)`, `Хлеб ≤ ${fmt(GOALS.price)} zł (обычно 5 zł)`),
        L(`Niedobór chleba ≤ ${GOALS.shortage}% popytu`, `Дефицит хлеба ≤ ${GOALS.shortage}% спроса`),
        L(`Dochód rolników ≥ ${GOALS.farmInc}% normalnego`, `Доход фермеров ≥ ${GOALS.farmInc}% обычного`),
        L(`Bezrobocie ≤ ${GOALS.unemp}%`, `Безработица ≤ ${GOALS.unemp}%`),
        L(`Budżet ≥ ${GOALS.budget} mln zł`, `Бюджет ≥ ${GOALS.budget} млн zł`),
      ],
      day: L("Dzień", "День"), week: L("Tydzień", "Неделя"), month: L("Miesiąc", "Месяц"), play: L("Start", "Пуск"), pause: L("Pauza", "Пауза"),
      advisor: L("Doradca", "Советник"), economy: L("Gospodarka", "Экономика"), why: L("Dlaczego?", "Почему?"),
      bread: L("Chleb", "Хлеб"), shelves: L("Niedobór", "Дефицит"), farmInc: L("Dochód rolników", "Доход фермеров"), unemp: L("Bezrobocie", "Безработица"), budget: L("Budżet", "Бюджет"), welfare: L("Dobrobyt", "Благосостояние"),
      none: L("brak", "нет"), close: L("Dalej", "Дальше"), restart: L("Zagraj jeszcze raz", "Сыграть ещё раз"),
      loading: L("Ładowanie świata…", "Загрузка мира…"), noGL: L("Twoja przeglądarka nie obsługuje 3D. Wybierz budynek z listy:", "Браузер не поддерживает 3D. Выбери здание из списка:"),
      forecast: L("Skutki zmiany", "Последствия изменения"), noChange: L("Przesuń suwak, a zobaczysz, co zmieni się teraz, za 1–2 miesiące i później.", "Подвинь ползунок — увидишь, что изменится сейчас, через 1–2 месяца и позже."),
      thisMonth: L("prognoza na ten miesiąc", "прогноз на этот месяц"), t: L(" t", " т"), tys: L(" tys.", " тыс."), mln: L(" mln", " млн"),
      stages: [L("Decyzje wchodzą w życie", "Решения вступают в силу"), L("Rynek reaguje", "Рынок реагирует"), L("Producenci dostosowują produkcję", "Производители подстраивают выпуск"), L("Cena się dostosowuje", "Цена подстраивается")],
    };
  }
  const mk = lang => (pl, ru) => lang === "ru" ? ru : pl;

  function buildings(lang){
    const L = mk(lang);
    return {
      rzad: { name: L("Rząd", "Правительство"),
        role: L("Prowadzi [[polityka-fiskalna|politykę fiskalną]]: cła, dopłaty i ceny urzędowe. Budowy zlecasz w budynkach Piekarnia i Farma.", "Ведёт [[polityka-fiskalna|фискальную политику]]: пошлины, дотации и регулируемые цены. Стройки заказываются в Пекарне и на Ферме."),
        controls: [
          { k: "tariff", min: 0, max: 40, step: 5, unit: "%", label: L("Cło na import zboża", "Пошлина на импорт зерна") },
          { k: "subsidy", min: 0, max: 8, step: 1, unit: L(" mln/mies.", " млн/мес."), label: L("Dopłaty dla rolników", "Дотации фермерам") },
          { k: "cap", min: 0, max: 8, step: 0.5, unit: " zł", label: L("Cena maksymalna chleba (0 = brak)", "Максимальная цена хлеба (0 = нет)") },
        ] },
      rezerwy: { name: L("Rezerwy", "Госрезерв"),
        role: L("Państwowy magazyn zboża — bufor na wstrząsy podaży. **Uwalnianie** od razu dodaje zboże na rynek, ale zmniejsza bezpieczeństwo na przyszłość. **Zakupy** kosztują i zabierają zboże z rynku teraz, ale chronią przed kolejnym kryzysem.", "Государственный склад зерна — буфер против шоков предложения. **Выпуск** сразу добавляет зерно на рынок, но снижает безопасность в будущем. **Закупки** стоят денег и забирают зерно с рынка сейчас, но защищают от следующего кризиса."),
        controls: [{ k: "reserve", min: -100, max: 250, step: 10, unit: L(" t", " т"), label: L("Kupuj (−) / uwalniaj (+) co miesiąc", "Покупать (−) / выпускать (+) каждый месяц") }] },
      nbp: { name: "NBP",
        role: L("Narodowy Bank Polski ustala [[stopa-referencyjna|stopę referencyjną]]. Wyższa stopa: droższy kredyt, mniejszy popyt i presja cenowa, ale firmy mniej zatrudniają.", "Национальный банк Польши устанавливает [[stopa-referencyjna|референсную ставку]]. Выше ставка: дороже кредит, меньше спрос и давление на цены, но фирмы меньше нанимают."),
        controls: [{ k: "rate", min: 2, max: 9, step: 0.5, unit: "%", label: L("Stopa referencyjna", "Референсная ставка") }] },
      farma: { name: L("Farma", "Ферма"), role: L("Krajowa [[podaz|podaż]] zboża. Zbiory = potencjał pól × pogoda. Nawadnianie podnosi potencjał i zmniejsza straty przy suszy — zwiększa odporność gospodarki.", "Внутреннее [[podaz|предложение]] зерна. Урожай = потенциал полей × погода. Орошение повышает потенциал и уменьшает потери в засуху — повышает устойчивость экономики."), build: "nawadnianie" },
      piekarnia: { name: L("Piekarnia", "Пекарня"), role: L("Zamienia zboże w chleb: 1 t zboża ≈ 1 tys. bochenków. Upiecze tyle, ile pozwala **mniejsza** z dwóch rzeczy: dostępne zboże albo moc pieców.", "Превращает зерно в хлеб: 1 т зерна ≈ 1 тыс. буханок. Испечёт столько, сколько позволяет **меньшее** из двух: доступное зерно или мощность печей."), build: "piekarnia2" },
      sklep: { name: L("Sklep", "Магазин"), role: L("Tu [[popyt|popyt]] mieszkańców spotyka się z podażą chleba. **Popyt** — ile ludzie chcą kupić, **podaż** — ile chleba jest, **sprzedaż** — ile naprawdę kupili.", "Здесь [[popyt|спрос]] жителей встречается с предложением хлеба. **Спрос** — сколько люди хотят купить, **предложение** — сколько хлеба есть, **продажи** — сколько реально купили.") },
      granica: { name: L("Import", "Импорт"), role: L("Ciężarówki z zagranicznym zbożem. Importerzy reagują na cło z opóźnieniem: co miesiąc pokonują połowę drogi do nowego poziomu. W miesiącach 3–5 granica jest zablokowana (max 120 t).", "Грузовики с иностранным зерном. Импортёры реагируют на пошлину с задержкой: каждый месяц проходят половину пути к новому уровню. В месяцы 3–5 граница заблокирована (макс. 120 т).") },
    };
  }
  function buildInfo(lang){
    const L = mk(lang);
    return {
      piekarnia2: { name: L("Druga piekarnia", "Вторая пекарня"), what: L(`Zapłać teraz ${BUILD.piekarnia2.cost} mln zł (w ${BUILD.piekarnia2.months} ratach), a za ${BUILD.piekarnia2.months} mies. moc wzrośnie o 1 000 tys. bochenków. W czasie budowy ${BUILD.piekarnia2.site * 10} osób dostanie pracę, potem ${BUILD.piekarnia2.jobs * 10} stałych miejsc. Pomoże tylko wtedy, gdy wąskim gardłem jest moc, a nie zboże.`, `Плати сейчас ${BUILD.piekarnia2.cost} млн zł (${BUILD.piekarnia2.months} платежа), а через ${BUILD.piekarnia2.months} мес. мощность вырастет на 1 000 тыс. буханок. Во время стройки ${BUILD.piekarnia2.site * 10} человек получат работу, потом ${BUILD.piekarnia2.jobs * 10} постоянных мест. Поможет, только если узкое место — мощность, а не зерно.`) },
      nawadnianie: { name: L("Nawadnianie pól", "Орошение полей"), what: L(`Koszt ${BUILD.nawadnianie.cost} mln zł, budowa ${BUILD.nawadnianie.months} mies.; efekt rośnie stopniowo. Po ukończeniu: potencjał pól +12% i o 60% mniejsze straty przy suszy (np. susza 4. miesiąca: zamiast −20% tylko −8%).`, `Стоит ${BUILD.nawadnianie.cost} млн zł, строится ${BUILD.nawadnianie.months} мес.; эффект растёт постепенно. После завершения: потенциал полей +12% и на 60% меньше потерь в засуху (например, засуха 4-го месяца: вместо −20% лишь −8%).`) },
    };
  }

  // Podpowiedzi nad budynkami — tylko fakty, bez gotowych odpowiedzi
  function hints(st, lang){
    const L = mk(lang), r = sim(st), out = {};
    if (st.done) return out;
    if (BLOCKADE.includes(st.m)) out.granica = L("Blokada: import max 120 t", "Блокада: импорт макс. 120 т");
    else if (Math.abs(r.impTarget - r.imp) > 20) out.granica = L(`Import dochodzi do ${n0(r.impTarget)} t`, `Импорт идёт к ${n0(r.impTarget)} т`);
    if (st.m < BLOCKADE[0]) out.rezerwy = L(`Blokada za ${BLOCKADE[0] - st.m} mies. · zapas ${n0(st.stock)} t`, `Блокада через ${BLOCKADE[0] - st.m} мес. · запас ${n0(st.stock)} т`);
    else if (BLOCKADE.includes(st.m) && st.stock > 0) out.rezerwy = L(`Kryzys · w magazynie ${n0(st.stock)} t`, `Кризис · на складе ${n0(st.stock)} т`);
    if (r.bottleneck === "bakery" && r.Dbase > r.capacity * 0.98) out.piekarnia = L("Piekarnia na pełnej mocy", "Пекарня на полной мощности");
    if (WEATHER[st.m] < 1) out.farma = L(`${weatherName(WEATHER[st.m], L)}: ${n0(r.harvest)} t`, `${weatherName(WEATHER[st.m], L)}: ${n0(r.harvest)} т`);
    else if (r.farmInc < GOALS.farmInc) out.farma = L(`Dochód rolników ${Math.round(r.farmInc)}%`, `Доход фермеров ${Math.round(r.farmInc)}%`);
    if (r.short > 5) out.sklep = L(`Brakuje ${n0(r.short)} tys. bochenków`, `Не хватает ${n0(r.short)} тыс. буханок`);
    const endB = r.budgetAfter + r.net * (MONTHS - st.m - 1);
    if (endB < GOALS.budget) out.rzad = L(`Przy tym saldzie: ${fmt(endB)} mln na koniec roku`, `При таком сальдо: ${fmt(endB)} млн к концу года`);
    if (r.unemp > GOALS.unemp) out.nbp = L(`Bezrobocie ${fmt(r.unemp)}%`, `Безработица ${fmt(r.unemp)}%`);
    return out;
  }

  // ================================================================ SCENA 3D
  const PAL = { grass: 0x8fd16a, soil: 0x8a5a3b, soilDark: 0x6b4429, road: 0xe9dcc0, water: 0x5cc4f2, wall: 0xfff6e6, roofRed: 0xe2574c, roofBlue: 0x4a7bd8, roofGreen: 0x4bb377, gold: 0xf5c542, wood: 0xb07a4a, wheat: 0xf2cf4a, wheatDry: 0xc9a66b, stone: 0xd9d4cc, truck: 0x3d8fe0, people: 0xff9d5c, tree: 0x3fa35a, trunk: 0x8a5a3b, white: 0xffffff, dark: 0x4a4a55, flagR: 0xdc143c, scaffold: 0xf0a030, pipe: 0x7fb8e0, smoke: 0xeeeeee, skin: 0xf7d1b0 };
  function makeScene(THREE, canvas){
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 200);
    cam.position.set(22, 22.5, 22); cam.lookAt(0, -1.2, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 0.75));
    const sun = new THREE.DirectionalLight(0xfff1dd, 0.75);
    sun.position.set(12, 22, 6); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16 }); scene.add(sun);
    const mats = {}, mat = c => mats[c] || (mats[c] = new THREE.MeshLambertMaterial({ color: c }));
    const box = (w, h, d, c, x, y, z, parent = scene) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c)); m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
    const cyl = (rt, rb, h, c, x, y, z, seg = 10, parent = scene) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(c)); m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
    const roof = (w, d, h, c, x, y, z, parent = scene) => { const g = new THREE.CylinderGeometry(0.0001, 1, 1, 4, 1); g.rotateY(Math.PI / 4); const m = new THREE.Mesh(g, mat(c)); m.scale.set(w * 0.72, h, d * 0.72); m.position.set(x, y + h / 2, z); m.castShadow = true; parent.add(m); return m; };
    const tree = (x, z, s = 1) => { cyl(0.12 * s, 0.15 * s, 0.5 * s, PAL.trunk, x, 1, z, 6); const t = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 * s, 0), mat(PAL.tree)); t.position.set(x, 1 + 0.9 * s, z); t.castShadow = true; scene.add(t); };

    box(18, 1, 18, PAL.grass, 0, 0, 0); box(18, 2.2, 18, PAL.soil, 0, -2.2, 0); box(17.6, 1, 17.6, PAL.soilDark, 0, -3.2, 0);
    box(18, 0.06, 1.6, PAL.road, 0, 1, 1.2); box(1.6, 0.06, 7.4, PAL.road, -1.2, 1, -3.7);
    box(1.8, 0.05, 18, PAL.water, 7.9, 1, 0); box(2.4, 0.3, 1.8, PAL.wood, 7.9, 1, 1.2);
    const groups = {};
    const group = (id, x, z) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.userData.id = id; scene.add(g); groups[id] = g; return g; };
    { const g = group("rzad", -5.6, -5.2);
      box(4, 0.3, 3, PAL.stone, 0, 1, 0, g); box(3.6, 1.8, 2.4, PAL.wall, 0, 1.3, -0.1, g);
      for (let i = -1.5; i <= 1.5; i += 1) cyl(0.14, 0.14, 1.8, PAL.white, i, 1.3, 1.25, 8, g);
      box(3.9, 0.3, 2.9, PAL.stone, 0, 3.1, 0, g); roof(4, 3, 0.9, PAL.roofBlue, 0, 3.4, 0, g);
      cyl(0.04, 0.04, 1.6, PAL.dark, 1.6, 4.1, -0.9, 6, g); box(0.8, 0.25, 0.04, PAL.white, 2.0, 5.3, -0.9, g); box(0.8, 0.25, 0.04, PAL.flagR, 2.0, 5.05, -0.9, g); }
    { const g = group("nbp", -1.3, -5.6);
      box(3, 2.4, 2.6, PAL.stone, 0, 1, 0, g); box(3.3, 0.3, 2.9, PAL.white, 0, 3.4, 0, g);
      for (let i = -1; i <= 1; i += 1) cyl(0.13, 0.13, 2.2, PAL.white, i, 1, 1.4, 8, g);
      const coin = cyl(0.8, 0.8, 0.22, PAL.gold, 0, 4.1, 0, 20, g); coin.rotation.x = Math.PI / 2; coin.position.y = 4.6; g.userData.coin = coin; }
    { const g = group("rezerwy", 4.4, -5.2);
      const tops = [];
      [[-0.8, 0], [0.8, 0], [0, -1.1]].forEach(([x, z]) => { cyl(0.75, 0.75, 3, 0xe6e9ef, x, 1, z, 14, g); tops.push(cyl(0.01, 0.78, 0.7, PAL.roofGreen, x, 4, z, 14, g)); });
      g.userData.tops = tops; }
    { const g = group("farma", -5.4, 4.8);
      box(2.4, 1.8, 2, PAL.roofRed, 1.8, 1, 0.2, g); roof(2.4, 2.1, 1, PAL.wall, 1.8, 2.8, 0.2, g); box(0.8, 1.1, 0.05, PAL.white, 1.8, 1, 1.22, g);
      const fields = [];
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) fields.push(box(1.05, 0.25, 1.05, PAL.wheat, -1.6 + i * 1.15, 1, -1.0 + j * 1.15, g));
      g.userData.fields = fields; }
    { const g = group("piekarnia", 0.6, 4.6);
      box(2.6, 1.9, 2.2, PAL.wall, 0, 1, 0, g); roof(2.7, 2.4, 1, PAL.roofRed, 0, 2.9, 0, g);
      box(0.4, 1.4, 0.4, PAL.stone, 0.8, 3, -0.5, g); box(1.4, 0.5, 0.08, PAL.wood, 0, 2.1, 1.12, g);
      const bread = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), mat(0xd9984a)); bread.scale.set(1.4, 0.8, 1); bread.position.set(0, 2.35, 1.2); g.add(bread); }
    { const g = group("sklep", 4.2, 4.6);
      box(2.2, 1.6, 2, PAL.wall, 0, 1, 0, g); box(2.4, 0.15, 0.9, PAL.roofGreen, 0, 2.5, 1.2, g);
      box(2.3, 0.2, 2.1, PAL.roofGreen, 0, 2.6, 0, g); box(0.7, 1, 0.05, PAL.dark, 0, 1, 1.02, g); }
    { const g = group("granica", 0, 0);
      cyl(0.08, 0.08, 1.4, PAL.dark, 6.5, 1, -0.1, 6, g); g.userData.bar = box(2.2, 0.14, 0.14, PAL.flagR, 5.4, 2.1, -0.1, g); box(1, 1, 1, PAL.stone, 6.4, 1, -1, g); }
    const lots = {
      piekarnia2: { x: 4.6, z: -1.9, chimney: [5.3, 4.4, -2.4], build(g){ box(2.4, 1.8, 2, PAL.wall, 0, 1, 0, g); roof(2.5, 2.2, 0.9, PAL.roofBlue, 0, 2.8, 0, g); box(0.4, 1.3, 0.4, PAL.stone, 0.7, 2.8, -0.5, g); } },
      nawadnianie: { x: -2.3, z: 7.2, build(g){ box(2.2, 0.08, 1.4, PAL.water, 0, 1, 0, g); cyl(0.12, 0.12, 0.8, PAL.pipe, 1.2, 1, 0, 6, g); box(3.2, 0.12, 0.12, PAL.pipe, -1.0, 1.7, -1.2, g); cyl(0.25, 0.25, 0.3, PAL.dark, 1.2, 1.8, 0, 8, g); } },
    };
    const lotMarks = {};
    Object.entries(lots).forEach(([id, l]) => { lotMarks[id] = box(2.4, 0.04, 2, 0xd8c79a, l.x, 1, l.z); });
    [[-7.4, -0.9], [-4.6, -1.2], [2.0, -1.6]].forEach(([x, z], i) => { box(1.2, 1, 1.1, PAL.wall, x, 1, z); roof(1.3, 1.2, 0.6, [PAL.roofRed, PAL.roofBlue, PAL.roofGreen][i], x, 2, z); });
    [[-7.8, 7.6], [6.8, 7.2], [-8, -7.8], [1.2, -7.9], [6.4, 3.4], [-2.8, -2.6]].forEach(([x, z]) => tree(x, z, 0.95));

    // obiekty ruchome — animowane tylko, gdy płynie czas
    const mkTruck = () => { const t = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.6), mat(PAL.truck)); b.position.set(0, 0.55, 0); b.castShadow = true; t.add(b); const c = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.6), mat(PAL.white)); c.position.set(-0.75, 0.5, 0); t.add(c); const gr = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.25, 0.5), mat(PAL.wheat)); gr.position.set(0.05, 0.95, 0); t.add(gr); return t; };
    const mkPerson = c => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.7, 8), mat(c)); b.position.y = 0.35; b.castShadow = true; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), mat(PAL.skin)); h.position.y = 0.85; g.add(h); return g; };
    const trucks = [], queue = [], walkers = [], smoke = [];
    for (let i = 0; i < 6; i++){ const t = mkTruck(); t.visible = false; scene.add(t); trucks.push({ o: t, phase: i / 6 }); }
    for (let i = 0; i < 7; i++){ const p = mkPerson(PAL.people); p.visible = false; p.position.set(3.0 + i * 0.45, 1, 6.6); scene.add(p); queue.push(p); }
    [[0xff9d5c, -6, 0.04], [0x6fa8ff, 2, -0.03], [0xb07ae0, -2, 0.025]].forEach(([c, x, v], i) => { const p = mkPerson(c); p.position.set(x, 1, 2.0 + i * 0.3); scene.add(p); walkers.push({ o: p, v }); });
    const smokeSrc = [[1.4, 4.5, 4.1]];
    for (let i = 0; i < 10; i++){ const s = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshLambertMaterial({ color: PAL.smoke, transparent: true, opacity: 0.7 })); s.visible = false; scene.add(s); smoke.push({ o: s, t: i / 10 }); }

    const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
    const pick = (cx, cy) => { const r = canvas.getBoundingClientRect(); v2.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); ray.setFromCamera(v2, cam); const hit = ray.intersectObjects(Object.values(groups), true)[0]; let o = hit?.object; while (o && !o.userData.id) o = o.parent; return o?.userData.id || null; };
    const hlCache = new Map(), hl = base => { if (!hlCache.has(base)){ const m = base.clone(); m.emissive = new THREE.Color(0x3366aa); m.emissiveIntensity = 0.35; hlCache.set(base, m); } return hlCache.get(base); };
    let current = null;
    const highlight = id => { current = id; Object.entries(groups).forEach(([k, g]) => g.traverse(m => { if (!m.isMesh) return; if (!m.userData.m0) m.userData.m0 = m.material; m.material = k === id ? hl(m.userData.m0) : m.userData.m0; })); };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const built = {}, scaff = {};
    let view = { load: 1 }, running = false, raf = 0;
    function popIn(g){
      if (reduce){ g.scale.set(1, 1, 1); render(); return; }
      const t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 500), e = 1 - Math.pow(1 - k, 3) * (1 - 1.7 * k * (1 - k)); g.scale.set(1, Math.max(0.01, e), 1); render(); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    function apply(v){
      view = v;
      const f = groups.farma.userData.fields, n = Math.round(clamp(v.harvest / 100, 0, 1) * f.length);
      f.forEach((m, i) => { m.userData.m0 = mat(i < n ? PAL.wheat : PAL.wheatDry); m.material = m.userData.m0; m.scale.y = i < n ? 1.6 : 0.5; });
      groups.rezerwy.userData.tops.forEach((t, i) => { t.userData.m0 = mat(v.stock > i * 18 ? PAL.roofGreen : 0xc9c9c9); t.material = t.userData.m0; });
      groups.granica.userData.bar.rotation.z = v.blockade ? 0 : 0.9;
      trucks.forEach((t, i) => { t.o.visible = i < Math.round(v.imports / 8); });
      queue.forEach((p, i) => { p.visible = i < Math.round(clamp(v.shortage / 3, 0, 7)); });
      Object.entries(lots).forEach(([id, l]) => {
        if (v.underConstruction.includes(id) && !scaff[id]){
          const g = new THREE.Group(); g.position.set(l.x, 0, l.z);
          for (const [x, z] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]){ const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 0.1), mat(PAL.scaffold)); p.position.set(x, 1.9, z); g.add(p); }
          const beam = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.8), mat(PAL.scaffold)); beam.position.set(0, 2.8, 0); g.add(beam);
          const crane = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 2.6), mat(PAL.scaffold)); crane.position.set(0.9, 3.6, 0); g.add(crane); g.userData.crane = crane;
          scene.add(g); scaff[id] = g;
        }
        if (!v.underConstruction.includes(id) && scaff[id]){ scene.remove(scaff[id]); delete scaff[id]; }
        if (v.built.includes(id) && !built[id]){ const g = group(id, l.x, l.z); l.build(g); g.scale.set(1, 0.01, 1); built[id] = g; scene.remove(lotMarks[id]); popIn(g); if (l.chimney) smokeSrc.push(l.chimney); }
      });
      if (current) highlight(current);
      place(0); render();
    }
    function place(t){
      trucks.forEach((tr, i) => {
        if (!tr.o.visible) return;
        if (!running || reduce){ tr.o.position.set(8.9, 1, -5.6 + i * 1.3); tr.o.rotation.y = Math.PI / 2; return; }
        const k = (tr.phase + t * 0.00008) % 1;
        if (k < 0.3){ tr.o.position.set(8.9, 1, -6 + (k / 0.3) * 7.2); tr.o.rotation.y = -Math.PI / 2; }
        else { tr.o.position.set(8.9 - ((k - 0.3) / 0.7) * 7.6, 1.06, 1.2 + (i % 2 ? 0.35 : -0.35)); tr.o.rotation.y = 0; }
      });
      walkers.forEach((w, i) => { if (running && !reduce){ w.o.position.x += w.v; if (w.o.position.x > 7 || w.o.position.x < -8.5) w.v *= -1; w.o.position.y = 1 + Math.abs(Math.sin(t * 0.01 + i)) * 0.06; } });
      queue.forEach((p, i) => { if (p.visible) p.position.y = 1 + (running && !reduce ? Math.abs(Math.sin(t * 0.006 + i)) * 0.05 : 0); });
      smoke.forEach((s, i) => {
        const src = smokeSrc[i % smokeSrc.length];
        if (!running || reduce || i >= Math.round(10 * clamp(view.load, 0.2, 1))){ s.o.visible = false; return; }
        s.t = (s.t + 0.004) % 1; s.o.visible = true;
        s.o.position.set(src[0] + Math.sin(i + s.t * 3) * 0.2, src[1] + s.t * 2.4, src[2]);
        s.o.scale.setScalar(0.6 + s.t * 1.2); s.o.material.opacity = 0.65 * (1 - s.t);
      });
      Object.values(scaff).forEach(g => { if (running && !reduce) g.userData.crane.rotation.y = t * 0.0006; });
      if (running && !reduce) groups.nbp.userData.coin.rotation.z = t * 0.0015;
    }
    function loop(t){ if (!running) return; place(t); render(); raf = requestAnimationFrame(loop); }
    function setRunning(v){ running = v; cancelAnimationFrame(raf); if (v && !reduce) raf = requestAnimationFrame(loop); else { place(0); render(); } }
    let w = 0, h = 0;
    function resize(){
      const r = canvas.parentElement.getBoundingClientRect(); w = r.width; h = r.height;
      renderer.setSize(w, h, false);
      const aspect = w / h, s = aspect < 1 ? 11.6 / aspect : (aspect > 1.6 ? 9.0 : 10.4 / Math.sqrt(aspect / 1.2));
      cam.left = -s * aspect; cam.right = s * aspect; cam.top = s; cam.bottom = -s; cam.updateProjectionMatrix(); render();
    }
    function render(){ renderer.render(scene, cam); }
    const anchors = { rzad: [-5.6, 6.2, -5.2], nbp: [-1.3, 5.8, -5.6], rezerwy: [4.4, 5.4, -5.2], farma: [-5.4, 4.2, 4.8], piekarnia: [0.6, 4.6, 4.6], sklep: [4.2, 3.6, 4.6], granica: [8.8, 3, -3.2], piekarnia2: [4.6, 4.4, -1.9], nawadnianie: [-2.3, 2.8, 7.2] };
    const screenPos = id => { const p = new THREE.Vector3(...anchors[id]).project(cam); return { x: (p.x + 1) / 2 * w, y: (1 - p.y) / 2 * h }; };
    return { resize, render, apply, pick, highlight, screenPos, setRunning, dispose(){ running = false; cancelAnimationFrame(raf); renderer.dispose(); } };
  }

  // ================================================================ UI
  function mount(_el, ctx){
    const { lang, inline, esc, track } = ctx;
    const T = texts(lang), B = buildings(lang), BI = buildInfo(lang), L = T.L;
    let st = newState(), sel = null, world = null, timer = null, speed = 1, forecastBase = null, tutorial = null;
    const LS = "makro2.game1", LS_TUT = "makro2.game1.tut";
    const tt = v => n0(v) + T.t, ty = v => n0(v) + T.tys, pc = v => Math.round(v) + "%";

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull"; document.body.appendChild(host); document.body.classList.add("gaming");
    host.innerHTML = `<div class="gtop">
        <div class="grow">
          <a class="gbtn" href="#start" aria-label="${L("Wyjdź", "Выйти")}">✕</a>
          <b class="gtitle">${T.title}</b>
          <div class="gclock"><span id="gdate"></span><i><b id="gbar"></b></i><small id="gstage"></small></div>
          <div class="gctrls">
            <button class="gbtn primary" id="gplay"></button>
            <button class="gbtn" id="gspeed">×1</button>
            <button class="gbtn" id="gadv">${T.advisor}</button>
            <button class="gbtn" id="ghelp" aria-label="${L("Pomoc", "Помощь")}">?</button>
          </div>
        </div>
        <div class="gstats" id="gstats"></div>
      </div>
      <div class="gbody">
        <div class="gstage" id="gscene"><canvas id="gcv" aria-label="${T.title}"></canvas><div class="glabels" id="glabels"></div><div class="gfx" id="gfx"></div><div class="gload" id="gload">${T.loading}</div></div>
        <aside class="gpanel" id="gpanel"></aside>
        <div id="gmodal"></div>
        <div id="gtut"></div>
      </div>`;
    const $ = s => host.querySelector(s);
    const view = () => { const r = sim(st); return {
      harvest: r.harvest / 10, imports: r.imp / 10, shortage: r.shortage, load: r.production / r.capacity, stock: st.stock / 10, blockade: BLOCKADE.includes(st.m),
      underConstruction: st.projects.map(p => p.type),
      built: [...(st.bakeries > 1 ? ["piekarnia2"] : []), ...(st.irrig >= 1 ? ["nawadnianie"] : [])] }; };

    // ---------- wspólne klocki
    const arrow = (v, goodUp) => v > 0.5 ? `<i class="ga ${goodUp ? "g" : "b"}">↑</i>` : v < -0.5 ? `<i class="ga ${goodUp ? "b" : "g"}">↓</i>` : `<i class="ga n">→</i>`;
    const tbl = rows => `<table class="gtbl">${rows.filter(Boolean).map(([a, b, cls]) => `<tr${cls ? ` class="${cls}"` : ""}><td>${a}</td><td>${b}</td></tr>`).join("")}</table>`;
    const whyBtn = k => `<button class="gwhy" data-why="${k}">${T.why}</button>`;
    // pasek: części (np. zbiory + import + rezerwa) na wspólnej skali
    const bar = (label, parts, max, note) => `<div class="gbar"><div class="gbl"><span>${label}</span><b>${note}</b></div><div class="gbt">${parts.filter(p => p.v > 0).map(p => `<i class="${p.c}" style="width:${clamp(100 * p.v / max, 0, 100)}%" title="${esc(p.t)}"></i>`).join("")}</div></div>`;
    function flow(r){
      const max = Math.max(r.grain + r.buy, r.capacity, r.demand, r.Dbase) * 1.02;
      return `<div class="gflow">
        ${bar(L("Zboże", "Зерно"), [{ v: r.harvest, c: "h", t: "zbiory" }, { v: r.imp, c: "i", t: "import" }, { v: r.rel, c: "r", t: "rezerwa" }], max, tt(r.grain))}
        ${bar(L("Moc piekarni", "Мощность пекарен"), [{ v: r.capacity, c: "c", t: "moc" }], max, ty(r.capacity))}
        ${bar(L("Chleb upieczony", "Испечено хлеба"), [{ v: r.production, c: "p", t: "produkcja" }], max, ty(r.production))}
        ${bar(L("Popyt", "Спрос"), [{ v: r.demand, c: "d", t: "popyt" }], max, ty(r.demand))}
        ${bar(L("Sprzedaż", "Продажи"), [{ v: r.sales, c: "s", t: "sprzedaż" }, { v: r.short, c: "x", t: "niedobór" }], max, ty(r.sales))}
        <p class="gleg"><i class="h"></i>${L("zbiory", "урожай")} <i class="i"></i>${L("import", "импорт")} <i class="r"></i>${L("rezerwa", "резерв")} <i class="x"></i>${L("niedobór", "дефицит")}</p></div>`;
    }
    // mini-wykres liniowy na 12 miesięcy
    function chart(series, mark){
      const W = 300, H = 110, pad = 22, all = series.flatMap(s => s.v.filter(v => v != null)), max = Math.max(...all) * 1.08, min = Math.min(...all) * 0.9;
      const X = i => pad + i * (W - pad - 6) / (MONTHS - 1), Y = v => H - 16 - (v - min) / (max - min) * (H - 26);
      const lines = series.map(s => `<polyline fill="none" stroke="${s.c}" stroke-width="2.4" ${s.dash ? 'stroke-dasharray="5 4"' : ""} points="${s.v.map((v, i) => v == null ? "" : `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ")}"/>`).join("");
      const now = `<line x1="${X(Math.min(st.m, 11))}" x2="${X(Math.min(st.m, 11))}" y1="6" y2="${H - 16}" stroke="#94a3b8" stroke-dasharray="2 3"/>`;
      const mk = mark != null ? `<circle cx="${X(mark)}" cy="10" r="4" fill="#c23a1a"/>` : "";
      const blk = `<rect x="${X(2)}" y="6" width="${X(4) - X(2)}" height="${H - 22}" fill="#c23a1a" opacity=".07"/>`;
      const ticks = [0, 3, 6, 9, 11].map(i => `<text x="${X(i)}" y="${H - 3}" font-size="9" text-anchor="middle" fill="#5a6676">${i + 1}</text>`).join("");
      return `<svg class="gchart" viewBox="0 0 ${W} ${H}" role="img">${blk}${now}${lines}${mk}${ticks}</svg><p class="gleg">${series.map(s => `<i style="background:${s.c}"></i>${s.n}`).join(" ")}</p>`;
    }
    // prognoza na resztę roku przy obecnych decyzjach
    const projection = () => { const out = []; let s = st; for (let m = st.m; m < MONTHS; m++){ const x = step(s); out[m] = x.r; s = x.n; } return out; };

    // ---------- „Dlaczego?” — łańcuch przyczyn z liczbami tego miesiąca
    function chainHtml(r){
      const rows = [
        [L(`Pogoda: ${weatherName(r.w, L)}`, `Погода: ${weatherName(r.w, L)}`), r.w < 1 ? -1 : r.w > 1 ? 1 : 0, true],
        [L(`Zbiory ${tt(r.harvest)} (normalnie ${REF.harvest} t)`, `Урожай ${tt(r.harvest)} (обычно ${REF.harvest} т)`), r.harvest - REF.harvest, true],
        [L(`Import ${tt(r.imp)}${BLOCKADE.includes(r.m) ? " (blokada)" : ""}, rezerwa ${sn0(r.rel - r.buy)} t`, `Импорт ${tt(r.imp)}${BLOCKADE.includes(r.m) ? " (блокада)" : ""}, резерв ${sn0(r.rel - r.buy)} т`), r.imp + r.rel - r.buy - REF.imp, true],
        [L(`Dostępne zboże ${tt(r.grain)}`, `Доступное зерно ${tt(r.grain)}`), r.grain - NORM, true],
        [L(`Produkcja chleba ${ty(r.production)} (ogranicza: ${r.bottleneck === "grain" ? "zboże" : "moc piekarni"})`, `Выпуск хлеба ${ty(r.production)} (ограничивает: ${r.bottleneck === "grain" ? "зерно" : "мощность пекарен"})`), r.production - NORM, true],
        [r.short > 1 ? L(`Popyt ${ty(r.demand)} > podaż → niedobór ${ty(r.short)}`, `Спрос ${ty(r.demand)} > предложения → дефицит ${ty(r.short)}`) : L(`Popyt ${ty(r.demand)}, chleba wystarcza${r.surplus > 1 ? ` (nadwyżka ${ty(r.surplus)})` : ""}`, `Спрос ${ty(r.demand)}, хлеба хватает${r.surplus > 1 ? ` (излишек ${ty(r.surplus)})` : ""}`), r.Peq - r.P, false],
        [L(`Cena równowagi ${zl(r.Peq)} → cena faktyczna ${zl(r.P)}${r.capped ? " (cena maksymalna)" : ""}`, `Равновесная цена ${zl(r.Peq)} → фактическая ${zl(r.P)}${r.capped ? " (потолок)" : ""}`), r.P - r.prevP, false],
        [L(`Sprzedaż (konsumpcja) ${ty(r.sales)}`, `Продажи (потребление) ${ty(r.sales)}`), r.sales - NORM, true],
      ];
      return `<ol class="gchain">${rows.map(([t, v, goodUp]) => `<li>${arrow(v, goodUp)}<span>${t}</span></li>`).join("")}</ol>`;
    }
    function priceWhy(r){
      const c = causes(st, r, L), col = { r: "🔴", o: "🟠", y: "🟡" };
      const head = r.capped ? L(`Cena jest ograniczona prawnie do ${zl(r.P)}, ale chleba nie przybyło. <b>Problemem nie jest już cena — problemem jest niedobór</b>: ${ty(r.short)} bochenków dla chętnych zabraknie.`, `Цена ограничена законом до ${zl(r.P)}, но хлеба не стало больше. <b>Проблема уже не цена, а дефицит</b>: ${ty(r.short)} буханок не достанется желающим.`)
        : c.main ? L(`<b>Główna przyczyna:</b> ${c.main.txt}`, `<b>Главная причина:</b> ${c.main.txt}`) : L("Rynek jest blisko normy.", "Рынок близок к норме.");
      const lag = Math.abs(r.Peq - r.Pfree) > 0.08 ? `<p class="gsmall">${L(`Cena nie skacze od razu do równowagi (${zl(r.Peq)}): sklepy i piekarnie zmieniają ją stopniowo, ok. 40% różnicy na miesiąc. ${r.Peq > r.P ? "Dopóki cena jest niższa od równowagi, chętnych jest więcej niż chleba." : "Cena będzie dalej spadać."}`, `Цена не прыгает сразу к равновесию (${zl(r.Peq)}): магазины и пекарни меняют её постепенно, примерно на 40% разницы в месяц. ${r.Peq > r.P ? "Пока цена ниже равновесной, желающих больше, чем хлеба." : "Цена будет снижаться дальше."}`)}</p>` : "";
      const acts = actions(r, c);
      return `<p>${head}</p>
        ${c.list.length ? `<b>${c.up ? L("Co podnosi cenę", "Что поднимает цену") : L("Co obniża cenę", "Что снижает цену")}</b><ul class="gcause">${c.list.slice(0, 4).map(x => `<li>${col[x.col]} ${x.txt}</li>`).join("")}</ul>` : ""}
        ${c.against.length ? `<p class="gsmall">${L("Działa w drugą stronę: ", "Действует в обратную сторону: ")}${c.against.map(x => x.txt).join(" ")}</p>` : ""}
        <b>${L("Łańcuch", "Цепочка")}</b>${chainHtml(r)}${lag}
        ${acts.length ? `<b>${L("Co możesz zrobić", "Что можно сделать")}</b><ul class="gcause">${acts.map(a => `<li>${a}</li>`).join("")}</ul>` : ""}`;
    }
    function actions(r, c){
      const k = c.main?.k, out = [], blk = BLOCKADE.includes(st.m);
      if (r.capped) out.push(L("Zniesienie ceny maksymalnej przywróci równowagę: cena wzrośnie, ale kolejki znikną.", "Отмена потолка вернёт равновесие: цена вырастет, но очереди исчезнут."));
      if (!c.up){ out.push(L("Niska cena cieszy konsumentów, ale obniża dochód rolników. Dobry moment, by dokupić zapas do rezerwy albo podnieść cło.", "Низкая цена радует потребителей, но снижает доход фермеров. Хороший момент пополнить резерв или поднять пошлину.")); return out; }
      if (["harvest", "import", "reserve"].includes(k)){
        if (st.stock > 0) out.push(L(`<b>Rezerwa</b> — efekt od razu (w magazynie ${tt(st.stock)}), ale mniej zostanie na przyszłe kryzysy.`, `<b>Резерв</b> — эффект сразу (на складе ${tt(st.stock)}), но меньше останется на будущие кризисы.`));
        out.push(blk ? L("<b>Import</b> — w blokadzie najwyżej 120 t, nawet przy zerowym cle.", "<b>Импорт</b> — в блокаду максимум 120 т даже при нулевой пошлине.") : L("<b>Niższe cło</b> — efekt w 1–2 mies. (importerzy reagują stopniowo); mniej wpływów i niższy dochód rolników.", "<b>Ниже пошлина</b> — эффект через 1–2 мес. (импортёры реагируют постепенно); меньше доходов и ниже доход фермеров."));
        if (st.irrig < 1 && !inProgress(st, "nawadnianie")) out.push(L("<b>Nawadnianie</b> — efekt długoterminowy, zmniejsza straty przy kolejnych suszach.", "<b>Орошение</b> — долгосрочный эффект, уменьшает потери в следующие засухи."));
        out.push(L("<b>Druga piekarnia</b> — teraz nie pomoże: brakuje zboża, a nie mocy.", "<b>Вторая пекарня</b> — сейчас не поможет: не хватает зерна, а не мощности."));
      } else if (k === "bakery"){
        out.push(L("<b>Druga piekarnia</b> — +1 000 tys. bochenków mocy po 3 mies. budowy.", "<b>Вторая пекарня</b> — +1 000 тыс. буханок мощности через 3 мес. стройки."));
        out.push(L("<b>Więcej zboża (import, rezerwa)</b> nie pomoże: piece i tak pracują na 100%.", "<b>Больше зерна (импорт, резерв)</b> не поможет: печи и так работают на 100%."));
        out.push(L("<b>Wyższa stopa NBP</b> — szybko ograniczy popyt, ale zwiększy bezrobocie.", "<b>Выше ставка NBP</b> — быстро снизит спрос, но увеличит безработицу."));
      } else if (k){
        out.push(L("<b>Wyższa stopa NBP</b> ogranicza popyt (szybko), kosztem zatrudnienia.", "<b>Выше ставка NBP</b> сдерживает спрос (быстро) ценой занятости."));
        out.push(L("<b>Większa podaż</b> (rezerwa, import) zaspokoi rosnący popyt.", "<b>Больше предложения</b> (резерв, импорт) покроет растущий спрос."));
      }
      return out;
    }
    function whyHtml(k){
      const r = sim(st), G = r.ok;
      if (k === "bread") return `<h2>${L("Cena chleba", "Цена хлеба")}: ${zl(r.P)} ${r.dP ? `<small>(${sign(r.dP)}%)</small>` : ""}</h2>${priceWhy(r)}`;
      if (k === "shelves") return `<h2>${L("Niedobór chleba", "Дефицит хлеба")}: ${ty(r.short)} (${fmt(r.shortage)}%)</h2>
        ${tbl([[L("Popyt — ile ludzie chcą kupić", "Спрос — сколько хотят купить"), ty(r.demand)], [L("Dostępny chleb — podaż", "Доступный хлеб — предложение"), ty(r.production)], [L("Sprzedaż — ile kupili", "Продажи — сколько купили"), ty(r.sales)], [L("Niedobór", "Дефицит"), ty(r.short), "sum"]])}
        <p>${r.capped ? L("⚠️ Chleb jest tani, ale nie ma go dla wszystkich: cena maksymalna zwiększa liczbę chętnych, a nie liczbę bochenków.", "⚠️ Хлеб дешёвый, но его не хватает всем: потолок цены увеличивает число желающих, а не число буханок.")
          : r.short > 1 ? L(`Cena (${zl(r.P)}) jeszcze nie dogoniła równowagi (${zl(r.Peq)}): przy niższej cenie chętnych jest więcej niż chleba.`, `Цена (${zl(r.P)}) ещё не догнала равновесную (${zl(r.Peq)}): при более низкой цене желающих больше, чем хлеба.`)
          : L("Chleba wystarcza dla wszystkich chętnych przy obecnej cenie.", "Хлеба хватает всем желающим по текущей цене.")}</p><b>${L("Łańcuch", "Цепочка")}</b>${chainHtml(r)}`;
      if (k === "farmInc") return `<h2>${T.farmInc}: ${pc(r.farmInc)}</h2>
        ${tbl([[L("Zbiory", "Урожай"), `${tt(r.harvest)} (${pc(100 * r.harvest / REF.harvest)} ${L("normy", "нормы")})`], [L("Cena zboża", "Цена зерна"), `${n0(r.grainPrice)} zł/t (${L("normalnie", "обычно")} 1 000)`], [L("Ze sprzedaży zboża", "От продажи зерна"), pc(r.farmSales)], [L("Z dopłat", "От дотаций"), "+" + pc(2 * r.subsidy)], [T.farmInc, pc(r.farmInc), "sum"]])}
        <p>${L("Dochód = ile zboża sprzedadzą × po jakiej cenie + dopłaty.", "Доход = сколько зерна продадут × по какой цене + дотации.")} ${r.bottleneck === "bakery" ? L(`Zboża jest więcej (${tt(r.grain)}), niż piekarnie przerobią (${ty(r.capacity)}), więc cena zboża spada.`, `Зерна больше (${tt(r.grain)}), чем пекарни переработают (${ty(r.capacity)}), поэтому цена зерна падает.`) : L("Drogi chleb podnosi cenę zboża, ale przy małych zbiorach rolnicy mają mało do sprzedania.", "Дорогой хлеб поднимает цену зерна, но при малом урожае фермерам мало что продавать.")} ${L("Tani import podnosi podaż i obniża cenę zboża krajowego.", "Дешёвый импорт увеличивает предложение и снижает цену местного зерна.")}</p>`;
      if (k === "unemp"){ const j = r.jobs; return `<h2>${T.unemp}: ${fmt(r.unemp)}%</h2>
        ${tbl([[L("Pracujący", "Работающих"), n0(r.employed * 10) + L(" osób", " чел.")], [L("Rolnictwo (zależy od zbiorów)", "Сельское хозяйство (зависит от урожая)"), n0(j.farm * 10)], [L("Piekarnie (zależy od produkcji)", "Пекарни (зависит от выпуска)"), n0(j.bakery * 10)], [L("Budowy", "Стройки"), n0(j.build * 10)], [L("Wpływ stopy NBP", "Влияние ставки NBP"), sn0(j.rate * 10)], [L("Siła robocza", "Рабочая сила"), n0(LABOR * 10)]])}
        <p>${L("Mniej zboża → mniej chleba → piekarnie i farmy potrzebują mniej pracowników → bezrobocie ↑ → niższe dochody → mniejszy popyt.", "Меньше зерна → меньше хлеба → пекарням и фермам нужно меньше работников → безработица ↑ → ниже доходы → меньше спрос.")} ${r.jobs.build ? L("Budowa daje pracę teraz: wydatek państwa → dochody pracowników → ich zakupy → dochody innych firm (to efekt mnożnika).", "Стройка даёт работу сейчас: расход государства → доходы работников → их покупки → доходы других фирм (это эффект мультипликатора).") : ""}</p>`; }
      if (k === "budget") return `<h2>${T.budget}: ${fmt(r.budgetAfter)} ${L("mln zł", "млн zł")}</h2>${budgetTbl(r)}
        <p>${r.buildCost > 0 ? L("Budżet pogarsza się głównie przez inwestycję, ale inwestycja zwiększy przyszłą moc produkcyjną.", "Бюджет ухудшается в основном из-за инвестиции, но она увеличит будущую производственную мощность.") : r.subsidy > 0 ? L("Dopłaty są dużym wydatkiem: warto, gdy dochód rolników jest blisko granicy.", "Дотации — крупный расход: оправданы, когда доход фермеров на грани.") : L("Więcej pracujących = więcej podatków i mniej zasiłków.", "Больше работающих = больше налогов и меньше пособий.")}</p>`;
      const P = r.parts;
      return `<h2>${T.welfare}: ${Math.round(r.W)}</h2>
        ${tbl([[L("Siła nabywcza konsumentów × 40%", "Покупательная сила × 40%"), Math.round(P.power)], [L("Praca × 20%", "Работа × 20%"), Math.round(P.jobs)], [L("Dochód rolników × 20%", "Доход фермеров × 20%"), Math.round(P.farm)], [L("Budżet × 10%", "Бюджет × 10%"), Math.round(P.fiscal)], [L("Stabilność rynku × 10%", "Стабильность рынка × 10%"), Math.round(P.stable)], [T.welfare, Math.round(r.W), "sum"]])}
        <p>${L("Każdy składnik ma skalę 0–100. Stabilność spada, gdy cena gwałtownie się zmienia albo brakuje chleba. Cele (racjonalność) to osobny test — dobrobyt mówi, jak <b>dobrze</b> je spełniasz.", "Каждая часть по шкале 0–100. Стабильность падает при резких скачках цены или дефиците. Цели (рациональность) — отдельная проверка; благосостояние показывает, насколько <b>хорошо</b> ты их выполняешь.")}</p>`;
    }
    const budgetTbl = r => tbl([[L("Podatki od pracujących", "Налоги работающих"), "+" + fmt(r.taxes)], [L("Cło", "Пошлина"), "+" + fmt(r.tariffRev)], [L("Usługi publiczne", "Госуслуги"), "−" + fmt(r.spendFixed)], [L("Zasiłki dla bezrobotnych", "Пособия по безработице"), "−" + fmt(r.benefits)], r.subsidy ? [L("Dopłaty", "Дотации"), "−" + fmt(r.subsidy)] : null, r.reserveCost ? [L("Rezerwy", "Резерв"), "−" + fmt(r.reserveCost)] : null, r.buildCost ? [L("Inwestycje", "Инвестиции"), "−" + fmt(r.buildCost)] : null, [L("Saldo miesiąca", "Сальдо месяца"), sign(r.net), "sum"]]);
    function why(k){ pause(); modal(whyHtml(k)); track?.("game", "why", k); }

    function hud(){
      const r = sim(st);
      const chip = (k, val, bad, extra = "") => `<button class="gstat ${bad ? "bad" : ""}" data-why="${k}"><span>${T[k]} ⓘ</span><b>${val}${extra}</b></button>`;
      $("#gstats").innerHTML = [
        chip("bread", zl(r.P), !r.ok.price, Math.abs(r.dP) >= 1 ? ` <small>${r.dP > 0 ? "↑" : "↓"}${Math.round(Math.abs(r.dP))}%</small>` : ""),
        chip("shelves", r.short > 1 ? ty(r.short) : T.none, !r.ok.shortage),
        chip("farmInc", pc(r.farmInc), !r.ok.farmInc),
        chip("unemp", fmt(r.unemp) + "%", !r.ok.unemp),
        chip("budget", fmt(r.budgetAfter) + T.mln, !r.ok.budget),
        chip("welfare", Math.round(r.W), false),
      ].join("");
      const wk = Math.min(4, Math.floor(st.day / 7.5) + 1);
      $("#gdate").textContent = st.done ? L("Koniec roku", "Конец года") : `${T.month} ${st.m + 1}/${MONTHS} · ${T.week} ${wk}/4 · ${T.day} ${st.day + 1}${BLOCKADE.includes(st.m) ? L(" · blokada", " · блокада") : ""}`;
      $("#gstage").textContent = st.done ? "" : timer ? T.stages[wk - 1] : L("Pauza — zmień decyzje", "Пауза — меняй решения");
      $("#gbar").style.width = (st.done ? 100 : (st.day / DAYS) * 100) + "%";
      $("#gplay").textContent = timer ? "⏸ " + T.pause : "▶ " + T.play;
      $("#gplay").disabled = st.done;
      $("#gspeed").textContent = "×" + speed;
    }

    function labels(){
      if (!world) return;
      const all = hints(st, lang), H = {};
      const order = ["rezerwy", "sklep", "granica", "farma", "piekarnia", "rzad", "nbp"];
      order.filter(id => all[id]).slice(0, matchMedia("(max-width:900px)").matches ? 2 : 4).forEach(id => H[id] = all[id]);
      const ids = ["rzad", "nbp", "rezerwy", "farma", "piekarnia", "sklep", "granica", ...view().built];
      const names = { ...Object.fromEntries(Object.entries(B).map(([k, v]) => [k, v.name])), piekarnia2: BI.piekarnia2.name, nawadnianie: BI.nawadnianie.name };
      $("#glabels").innerHTML = ids.map(id => { const p = world.screenPos(id), W = $("#gscene").clientWidth, x = H[id] ? clamp(p.x, 85, W - 85) : p.x; return `<button class="glabel ${sel === id ? "on" : ""} ${H[id] ? "hint" : ""}" data-b="${id}" style="left:${x}px;top:${Math.max(H[id] ? 54 : 30, p.y)}px">${H[id] ? `<em>${esc(H[id])}</em>` : ""}<span>${esc(names[id])}</span></button>`; }).join("");
    }
    function floatText(id, text, good){
      if (!world) return;
      const p = world.screenPos(id), d = document.createElement("div");
      d.className = "gfloat " + (good ? "up" : "down"); d.textContent = text; d.style.left = p.x + "px"; d.style.top = Math.max(40, p.y - 10) + "px";
      $("#gfx").appendChild(d); setTimeout(() => d.remove(), 1800);
    }

    const okRow = (ok, t) => `<li class="${ok ? "ok" : "no"}">${ok ? "✓" : "✗"} ${t}</li>`;
    function overviewPanel(){
      const r = sim(st);
      return `<div class="gph"><h2>${T.economy}</h2><button class="gcol" data-col aria-label="${L("Zwiń", "Свернуть")}">▾</button></div>
        <div class="gpb">
        <div class="gbox"><b>${L("Cele w tym miesiącu", "Цели в этом месяце")}</b>
          <ul class="ggoal">${okRow(r.ok.price, T.goalList[0] + ` → ${zl(r.P)}`)}${okRow(r.ok.shortage, T.goalList[1] + ` → ${fmt(r.shortage)}%`)}${okRow(r.ok.farmInc, T.goalList[2] + ` → ${pc(r.farmInc)}`)}${okRow(r.ok.unemp, T.goalList[3] + ` → ${fmt(r.unemp)}%`)}${okRow(r.ok.budget, T.goalList[4] + ` → ${fmt(r.budgetAfter)}`)}</ul>
          <p class="gverd ${r.rational ? "ok" : "no"}">${r.rational ? L("Decyzje racjonalne: wszystkie cele spełnione.", "Решения рациональны: все цели выполнены.") : L("Decyzje nieracjonalne: nie wszystkie cele są spełnione.", "Решения нерациональны: не все цели выполнены.")} ${T.welfare}: <b>${Math.round(r.W)}</b></p></div>
        <div class="gbox"><div class="gbh"><b>${L("Przepływ: zboże → chleb → ludzie", "Поток: зерно → хлеб → люди")}</b>${whyBtn("bread")}</div>${flow(r)}</div>
        ${st.projects.length ? `<div class="gbox"><b>${L("Budowy", "Стройки")}</b>${st.projects.map(projHtml).join("")}</div>` : ""}
        <div class="gbox"><div class="gbh"><b>${L("Budżet w tym miesiącu (mln zł)", "Бюджет в этом месяце (млн zł)")}</b>${whyBtn("budget")}</div>${budgetTbl(r)}</div>
        ${st.log.length ? `<div class="gbox"><b>${L("Dziennik", "Журнал")}</b><ul class="glog">${st.log.slice(-4).reverse().map(x => `<li>${inline(x)}</li>`).join("")}</ul></div>` : ""}
        </div>`;
    }
    function projHtml(p){
      const M = BUILD[p.type].months, done = M - p.left, pct = Math.round(100 * done / M), ready = st.m + p.left + 1;
      const eff = p.type === "piekarnia2" ? L(`+1 000 tys. bochenków mocy od miesiąca ${ready}`, `+1 000 тыс. буханок мощности с месяца ${ready}`) : L(`pełny efekt od miesiąca ${ready}; teraz ${pc(100 * st.irrig)} efektu`, `полный эффект с месяца ${ready}; сейчас ${pc(100 * st.irrig)} эффекта`);
      return `<div class="gprog"><div class="gbl"><span>🏗️ ${BI[p.type].name}</span><b>${pct}%</b></div><div class="gbt"><i class="c" style="width:${pct}%"></i></div><p class="gsmall">${L(`Pozostało: ${p.left} mies.`, `Осталось: ${p.left} мес.`)} · ${eff}</p></div>`;
    }

    // ---------- karty budynków
    function card(id, r){
      if (id === "farma"){ const pr = projection(); return `${tbl([[L("Pogoda", "Погода"), weatherName(r.w, L)], [L("Potencjał pól", "Потенциал полей"), tt(r.pot)], [L("Zbiory w tym miesiącu", "Урожай в этом месяце"), `${tt(r.harvest)} · ${pc(100 * r.harvest / REF.harvest)} ${L("normy", "нормы")}`], [L("Cena zboża", "Цена зерна"), n0(r.grainPrice) + " zł/t"], [T.farmInc, pc(r.farmInc)], [L("Pracują w rolnictwie", "Работают в сельском хозяйстве"), n0(r.jobs.farm * 10) + L(" osób", " чел.")], [L("Nawadnianie", "Орошение"), pc(100 * st.irrig)]])}
        ${whyBtn("farmInc")}<b>${L("Zbiory w tym roku (t/mies.)", "Урожай за год (т/мес.)")}</b>${chart([{ n: L("zbiory (prognoza)", "урожай (прогноз)"), c: "#d4a514", v: Array.from({ length: MONTHS }, (_, m) => m < st.m ? st.hist[m]?.r.harvest ?? null : pr[m]?.harvest ?? null) }, { n: L("normalnie 900 t", "норма 900 т"), c: "#94a3b8", dash: 1, v: Array(MONTHS).fill(REF.harvest) }])}<p class="gsmall">${L("Czerwone pole: blokada importu. Susza w 4. miesiącu obniży zbiory o 20% (z nawadnianiem tylko o 8%).", "Красная зона: блокада импорта. Засуха в 4-м месяце снизит урожай на 20% (с орошением только на 8%).")}</p>`; }
      if (id === "piekarnia" || id === "piekarnia2"){
        const pr = projection(), demand5 = Array.from({ length: MONTHS }, (_, m) => m < st.m ? st.hist[m]?.r.Dbase ?? null : pr[m]?.Dbase ?? null);
        const capS = Array.from({ length: MONTHS }, (_, m) => m < st.m ? st.hist[m]?.r.capacity ?? null : pr[m]?.capacity ?? null);
        const grainS = Array.from({ length: MONTHS }, (_, m) => m < st.m ? st.hist[m]?.r.grain ?? null : pr[m]?.grain ?? null);
        const over = demand5.findIndex((v, m) => m >= st.m && v != null && capS[m] != null && v > capS[m]);
        const util = 100 * r.production / r.capacity, supply = 100 * r.grain / r.capacity;
        const neck = r.bottleneck === "grain" ? L(`Piekarnia może upiec ${ty(r.capacity)}, ale zboża jest tylko na ${ty(r.grain)} — pracuje na ${pc(util)}. Ogranicza ją <b>brak zboża</b>, więc druga piekarnia nic by teraz nie dała.`, `Пекарня может испечь ${ty(r.capacity)}, но зерна хватает лишь на ${ty(r.grain)} — работает на ${pc(util)}. Её ограничивает <b>нехватка зерна</b>, поэтому вторая пекарня сейчас ничего бы не дала.`)
          : L(`Zboża jest ${tt(r.grain)}, ale piece mogą przerobić tylko ${ty(r.capacity)} — ${tt(r.grain - r.capacity)} zboża leży w magazynach. Piekarnia nie produkuje więcej, bo <b>ogranicza ją moc</b>.`, `Зерна ${tt(r.grain)}, но печи переработают лишь ${ty(r.capacity)} — ${tt(r.grain - r.capacity)} зерна лежит на складах. Пекарня не производит больше, потому что <b>её ограничивает мощность</b>.`);
        return `${tbl([[L("Moc maksymalna (wszystkie piekarnie)", "Макс. мощность (все пекарни)"), ty(r.capacity) + L("/mies.", "/мес.")], [L("Dostępne zboże", "Доступное зерно"), tt(r.grain)], [L("Produkcja w tym miesiącu", "Выпуск в этом месяце"), ty(r.production)], [L("Wykorzystanie mocy", "Загрузка мощности"), pc(util) + ` <small>(${L("produkcja / moc", "выпуск / мощность")})</small>`], [L("Zaopatrzenie w zboże", "Обеспеченность зерном"), pc(supply) + ` <small>(${L("zboże / moc", "зерно / мощность")})</small>`], [r.grain >= r.capacity ? L("Nadwyżka zboża", "Излишек зерна") : L("Brakuje zboża do pełnej mocy", "Не хватает зерна до полной мощности"), tt(Math.abs(r.grain - r.capacity))], [L("Pracownicy piekarni", "Работники пекарен"), n0(r.jobs.bakery * 10) + L(" osób", " чел.")]])}
          <p class="gextra">${neck}</p>
          <b>${L("Czy budować? Popyt przy 5 zł vs moc vs zboże", "Строить ли? Спрос при 5 zł vs мощность vs зерно")}</b>${chart([{ n: L("popyt przy 5 zł", "спрос при 5 zł"), c: "#2347c5", v: demand5 }, { n: L("moc piekarni", "мощность"), c: "#c23a1a", dash: 1, v: capS }, { n: L("dostępne zboże", "доступное зерно"), c: "#d4a514", v: grainS }], over >= 0 ? over : null)}
          <p class="gsmall">${over >= 0 ? L(`Popyt przekroczy moc w miesiącu ${over + 1} (czerwona kropka). Budowa trwa 3 mies.`, `Спрос превысит мощность в месяце ${over + 1} (красная точка). Стройка длится 3 мес.`) : L("Przy obecnych decyzjach popyt nie przekroczy mocy do końca roku.", "При текущих решениях спрос не превысит мощность до конца года.")} ${L("Piekarnia pomaga tylko tam, gdzie żółta linia (zboże) jest nad czerwoną (moc).", "Пекарня помогает только там, где жёлтая линия (зерно) выше красной (мощность).")}</p>`;
      }
      if (id === "sklep") return `${tbl([[L("Cena chleba", "Цена хлеба"), zl(r.P) + (r.capped ? L(" (maks.)", " (потолок)") : "")], [L("Cena równowagi", "Равновесная цена"), zl(r.Peq)], [L("Popyt — chcą kupić", "Спрос — хотят купить"), ty(r.demand)], [L("Podaż — dostępny chleb", "Предложение — доступный хлеб"), ty(r.production)], [L("Sprzedaż — kupili", "Продажи — купили"), ty(r.sales)], r.short > 1 ? [L("Niedobór", "Дефицит"), ty(r.short), "bad"] : [L("Niesprzedany chleb", "Непроданный хлеб"), ty(r.surplus)], [L("Na mieszkańca (100 tys. osób)", "На жителя (100 тыс. чел.)"), fmt(r.sales / 100) + L(" bochenka/mies.", " буханки/мес.")]])}
        ${whyBtn("shelves")} ${whyBtn("bread")}
        <p class="gsmall">${L(`Elastyczność: przy cenie o 1 zł wyższej ludzie chcieliby ${ty(r.demandAt(r.P + 1))} (${sign(100 * (r.demandAt(r.P + 1) / r.demand - 1))}%), o 1 zł niższej — ${ty(r.demandAt(Math.max(1, r.P - 1)))}. Chleb to dobro podstawowe: popyt zmienia się słabo, więc mały brak towaru mocno podnosi cenę.`, `Эластичность: при цене на 1 zł выше люди хотели бы ${ty(r.demandAt(r.P + 1))} (${sign(100 * (r.demandAt(r.P + 1) / r.demand - 1))}%), на 1 zł ниже — ${ty(r.demandAt(Math.max(1, r.P - 1)))}. Хлеб — базовый товар: спрос меняется слабо, поэтому небольшая нехватка сильно поднимает цену.`)}</p>`;
      if (id === "granica") return `${tbl([[L("Import w tym miesiącu", "Импорт в этом месяце"), tt(r.imp)], [L("Docelowy przy obecnym cle", "Целевой при текущей пошлине"), tt(r.impTarget)], [L("Limit", "Лимит"), tt(r.icap) + (BLOCKADE.includes(r.m) ? L(" (blokada)", " (блокада)") : "")], [L("Cło", "Пошлина"), st.d.tariff + "%"], [L("Wpływy z cła", "Доход от пошлины"), fmt(r.tariffRev) + T.mln]])}
        <p class="gsmall">${L("Importerzy co miesiąc pokonują połowę drogi do poziomu docelowego: zmiana cła działa w pełni po 2–3 miesiącach. Blokada działa od razu.", "Импортёры каждый месяц проходят половину пути к целевому уровню: изменение пошлины действует полностью через 2–3 месяца. Блокада действует сразу.")}</p>`;
      if (id === "rezerwy"){
        let need = 0; for (const m of BLOCKADE) if (m >= st.m){ const pot = potential(m) * (1 + 0.12 * st.irrig), w = 1 - (1 - WEATHER[m]) * (1 - 0.6 * st.irrig); need += Math.max(0, r.Dbase * 0.95 - (pot * w + st.subsidyBoost) - importCap(m)); }
        return `${tbl([[L("Zapas w magazynie", "Запас на складе"), tt(st.stock)], [L("W tym miesiącu", "В этом месяце"), r.rel ? L(`uwalniasz ${tt(r.rel)}`, `выпускаешь ${tt(r.rel)}`) : r.buy ? L(`kupujesz ${tt(r.buy)}`, `покупаешь ${tt(r.buy)}`) : "0"], [L("Zapas po miesiącu", "Запас после месяца"), tt(r.stockAfter)], st.m <= BLOCKADE[2] ? [L("Ile może brakować w blokadzie", "Сколько может не хватать в блокаду"), "≈ " + tt(need)] : null, [L("Koszt operacji", "Стоимость операций"), fmt(r.reserveCost) + T.mln]])}
          <p class="gsmall">${st.m < BLOCKADE[0] && r.rel > 0 ? L(`⚠️ Zapewniasz tańszy chleb dziś kosztem mniejszego bezpieczeństwa w miesiącach 3–5.`, `⚠️ Ты обеспечиваешь дешёвый хлеб сегодня ценой меньшей безопасности в месяцы 3–5.`) : L("Rezerwa wygładza chwilowy wstrząs podaży. Zapas jest skończony — co wydasz teraz, tego zabraknie w następnym kryzysie.", "Резерв сглаживает временный шок предложения. Запас конечен — что потратишь сейчас, того не хватит в следующий кризис.")}</p>`;
      }
      if (id === "rzad") return `${budgetTbl(r)}${whyBtn("budget")}`;
      if (id === "nbp") return `${tbl([[L("Stopa referencyjna", "Референсная ставка"), fmt(st.d.rate) + "%"], [L("Wpływ na popyt", "Влияние на спрос"), sign(100 * (r.rateF - 1)) + "%"], [L("Wpływ na zatrudnienie", "Влияние на занятость"), sn0(r.jobs.rate * 10) + L(" osób", " чел.")], [T.unemp, fmt(r.unemp) + "%"], [L("Inflacja (rocznie)", "Инфляция (годовая)"), fmt(r.inflation) + "%"]])}${whyBtn("unemp")}`;
      return "";
    }

    // ---------- skutki zmiany decyzji: teraz / za 1–2 mies. / później / ryzyko
    const CHAINS = {
      tariff: [["Cło", "Пошлина", 1], ["Budżet (wpływy)", "Бюджет (доходы)", 1], ["Import", "Импорт", -1], ["Zboże", "Зерно", -1], ["Cena chleba", "Цена хлеба", 1], ["Dochód rolników", "Доход фермеров", 1], ["Konsumpcja", "Потребление", -1]],
      subsidy: [["Dopłaty", "Дотации", 1], ["Budżet", "Бюджет", -1], ["Dochód rolników", "Доход фермеров", 1], ["Przyszłe zbiory", "Будущий урожай", 1]],
      cap: [["Cena maks.", "Потолок", -1], ["Cena chleba", "Цена хлеба", -1], ["Chętni (popyt)", "Желающие (спрос)", 1], ["Podaż", "Предложение", 0], ["Niedobór", "Дефицит", 1]],
      reserve: [["Uwalnianie", "Выпуск", 1], ["Zboże teraz", "Зерно сейчас", 1], ["Cena chleba", "Цена хлеба", -1], ["Zapas na kryzys", "Запас на кризис", -1]],
      rate: [["Stopa NBP", "Ставка NBP", 1], ["Popyt", "Спрос", -1], ["Presja cenowa", "Давление на цены", -1], ["Zatrudnienie", "Занятость", -1]],
    };
    function chainPreview(k, up){
      return `<div class="gpc">${CHAINS[k].map(([pl, ru, d]) => { const v = d * (up ? 1 : -1); return `<span>${L(pl, ru)} ${v > 0 ? '<i class="ga u">↑</i>' : v < 0 ? '<i class="ga d">↓</i>' : '<i class="ga n">=</i>'}</span>`; }).join("<em>→</em>")}</div>`;
    }
    function preview(k, from, to){
      const a = horizon(st, forecastBase, 3).rs, b = horizon(st, { ...forecastBase, [k]: to }, 3).rs, up = to > from, blk = BLOCKADE.includes(st.m);
      const txt = {
        tariff: { now: up ? L(`Wpływy z cła: ${sign(a[0].tariffRev)} → ${sign(b[0].tariffRev)} mln.`, `Доход от пошлины: ${sign(a[0].tariffRev)} → ${sign(b[0].tariffRev)} млн.`) : L(`Mniej wpływów z cła: ${fmt(a[0].tariffRev)} → ${fmt(b[0].tariffRev)} mln.`, `Меньше дохода от пошлины: ${fmt(a[0].tariffRev)} → ${fmt(b[0].tariffRev)} млн.`),
          soon: L(`Import ${tt(a[0].imp)} → ${tt(b[0].imp)}, za miesiąc ${tt(a[1]?.imp ?? 0)} → ${tt(b[1]?.imp ?? 0)} (importerzy reagują stopniowo).`, `Импорт ${tt(a[0].imp)} → ${tt(b[0].imp)}, через месяц ${tt(a[1]?.imp ?? 0)} → ${tt(b[1]?.imp ?? 0)} (импортёры реагируют постепенно).`) + (blk ? L(" Teraz blokada: najwyżej 120 t.", " Сейчас блокада: максимум 120 т.") : ""),
          risk: up ? L("Mniej zboża, droższy chleb — groźne przed blokadą i suszą.", "Меньше зерна, дороже хлеб — опасно перед блокадой и засухой.") : L("Tańsze zboże z zagranicy obniża dochód krajowych rolników.", "Дешёвое иностранное зерно снижает доход местных фермеров.") },
        subsidy: { now: L(`Koszt: ${sign(-(to - from))} mln co miesiąc. Dochód rolników ${pc(a[0].farmInc)} → ${pc(b[0].farmInc)}.`, `Расход: ${sign(-(to - from))} млн каждый месяц. Доход фермеров ${pc(a[0].farmInc)} → ${pc(b[0].farmInc)}.`),
          soon: L("Od następnego miesiąca rolnicy zasieją więcej: +2,5 t zbiorów za każdy 1 mln miesięcznie (narasta).", "Со следующего месяца фермеры посеют больше: +2,5 т урожая за каждый 1 млн в месяц (накапливается)."),
          risk: L("Budżet: dopłaty płacisz co miesiąc aż do zmiany.", "Бюджет: дотации платишь каждый месяц, пока не изменишь.") },
        cap: { now: b[0].capped ? L(`Cena ${zl(b[0].P)}, ale chętni chcą ${ty(b[0].demand)}, a chleba jest ${ty(b[0].production)}: niedobór ${ty(b[0].short)}`, `Цена ${zl(b[0].P)}, но желающие хотят ${ty(b[0].demand)}, а хлеба ${ty(b[0].production)}: дефицит ${ty(b[0].short)}`) : L("Cena maksymalna jest powyżej ceny rynkowej — nic nie zmienia.", "Потолок выше рыночной цены — ничего не меняет."),
          soon: L("Cena maksymalna nie dodaje ani jednego bochenka.", "Потолок цены не добавляет ни одной буханки."),
          risk: L("Kolejki, puste półki i niższa stabilność rynku.", "Очереди, пустые полки и ниже стабильность рынка.") },
        reserve: { now: to > 0 ? L(`Na rynek trafi ${tt(b[0].rel)} więcej zboża; niedobór ${ty(a[0].short)} → ${ty(b[0].short)}`, `На рынок попадёт ${tt(b[0].rel)} зерна; дефицит ${ty(a[0].short)} → ${ty(b[0].short)}`) : to < 0 ? L(`Z rynku zniknie ${tt(b[0].buy)} zboża, koszt ${fmt(b[0].reserveCost)} mln.`, `С рынка уйдёт ${tt(b[0].buy)} зерна, стоимость ${fmt(b[0].reserveCost)} млн.`) : L("Magazyn bez zmian.", "Склад без изменений."),
          soon: L(`Zapas po 3 mies.: ${tt(st.stock - a.reduce((s, r) => s + r.rel - r.buy, 0))} → ${tt(st.stock - b.reduce((s, r) => s + r.rel - r.buy, 0))}.`, `Запас через 3 мес.: ${tt(st.stock - a.reduce((s, r) => s + r.rel - r.buy, 0))} → ${tt(st.stock - b.reduce((s, r) => s + r.rel - r.buy, 0))}.`),
          risk: to > 0 && st.m < BLOCKADE[0] ? L("Blokada (mies. 3–5) jeszcze przed Tobą — wtedy zapas będzie cenniejszy.", "Блокада (мес. 3–5) ещё впереди — тогда запас будет ценнее.") : to < 0 ? L("Teraz mniej chleba na rynku i wyższa cena.", "Сейчас меньше хлеба на рынке и выше цена.") : L("Zapas jest skończony.", "Запас конечен.") },
        rate: { now: L(`Popyt ${ty(a[0].demand)} → ${ty(b[0].demand)}; bezrobocie ${fmt(a[0].unemp)}% → ${fmt(b[0].unemp)}%.`, `Спрос ${ty(a[0].demand)} → ${ty(b[0].demand)}; безработица ${fmt(a[0].unemp)}% → ${fmt(b[0].unemp)}%.`),
          soon: up ? L("Mniejszy popyt → mniejsza presja na ceny w kolejnych miesiącach.", "Меньший спрос → меньше давление на цены в следующие месяцы.") : L("Większy popyt → większa presja na ceny w kolejnych miesiącach.", "Больший спрос → больше давление на цены в следующие месяцы."),
          risk: up ? L("Wyższe bezrobocie → niższe dochody.", "Выше безработица → ниже доходы.") : L("Przy braku chleba większy popyt tylko podnosi cenę.", "При нехватке хлеба больший спрос лишь поднимает цену.") },
      }[k];
      const rows = a.map((x, i) => `<tr><td>${L("mies.", "мес.")} ${x.m + 1}</td><td>${zl(x.P)} → <b>${zl(b[i].P)}</b></td><td>${n0(x.short)} → <b>${n0(b[i].short)}</b></td><td>${sign(x.net)} → <b>${sign(b[i].net)}</b></td></tr>`).join("");
      return `${chainPreview(k, up)}
        <ul class="gsteps"><li><b>${L("Teraz", "Сейчас")}:</b> ${txt.now}</li><li><b>${L("Za 1–2 mies.", "Через 1–2 мес.")}:</b> ${txt.soon}</li><li><b>${L("Ryzyko", "Риск")}:</b> ${txt.risk}</li></ul>
        <table class="gtbl"><tr><th></th><th>${L("chleb", "хлеб")}</th><th>${L("niedobór, tys.", "дефицит, тыс.")}</th><th>${L("saldo, mln", "сальдо, млн")}</th></tr>${rows}</table>
        <p class="gverd ${b[0].rational ? "ok" : "no"}">${b[0].rational ? L("Po zmianie w tym miesiącu cele są spełnione.", "После изменения в этом месяце цели выполнены.") : L("Po zmianie co najmniej jeden cel w tym miesiącu nie jest spełniony.", "После изменения хотя бы одна цель в этом месяце не выполнена.")} ${T.welfare} ${sign(b[0].W - a[0].W)}</p>`;
    }

    function panel(){
      const p = $("#gpanel");
      if (!sel){ p.innerHTML = overviewPanel() + (!world ? `<div class="glist">${Object.keys(B).map(id => `<button class="gbtn" data-b="${id}">${esc(B[id].name)}</button>`).join("")}</div>` : ""); return; }
      const r = sim(st);
      if (sel === "piekarnia2" || sel === "nawadnianie"){ p.innerHTML = `<div class="gph"><button class="gback" data-b="">← ${T.economy}</button><button class="gcol" data-col>▾</button></div><div class="gpb"><h2>${BI[sel].name}</h2><p class="grole">${BI[sel].what}</p>${sel === "piekarnia2" ? card("piekarnia", r) : card("farma", r)}</div>`; return; }
      const b = B[sel], H = hints(st, lang);
      const bk = b.build, bInfo = bk && BI[bk], proj = st.projects.find(x => x.type === bk), isBuilt = (bk === "piekarnia2" && st.bakeries > 1) || (bk === "nawadnianie" && st.irrig >= 1);
      p.innerHTML = `<div class="gph"><button class="gback" data-b="">← ${T.economy}</button><button class="gcol" data-col>▾</button></div>
        <div class="gpb"><h2>${esc(b.name)}</h2>${H[sel] ? `<p class="ghint">${esc(H[sel])}</p>` : ""}<p class="grole">${inline(b.role)}</p>
        <div class="gbox"><b>${L("Ten miesiąc", "Этот месяц")} <span class="gsmall">(${T.thisMonth})</span></b>${card(sel, r)}</div>
        ${(b.controls || []).map(c => `<label class="gctl" for="c-${c.k}"><span>${c.label}<b id="v-${c.k}"></b></span>
          <input type="range" id="c-${c.k}" min="${c.min}" max="${c.k === "reserve" ? Math.max(0, Math.min(c.max, Math.floor(st.stock / 10) * 10)) : c.max}" step="${c.step}" value="${st.d[c.k]}" ${st.done ? "disabled" : ""}></label>`).join("")}
        ${b.controls ? `<div class="gforecast" id="gfc"><b>${T.forecast}</b><p class="gsmall">${T.noChange}</p></div>` : ""}
        ${bInfo ? `<div class="gbox"><b>${bInfo.name}</b><p class="gsmall">${bInfo.what}</p>
          ${isBuilt ? `<p class="gverd ok">${L("Zbudowane", "Построено")}</p>` : proj ? projHtml(proj)
          : `<p class="gpc"><span>${L("Koszt teraz", "Расход сейчас")} <i class="ga d">↓</i></span><em>→</em><span>${L("budowa", "стройка")}</span><em>→</em><span>${L("miejsca pracy", "рабочие места")} <i class="ga u">↑</i></span><em>→</em><span>${bk === "piekarnia2" ? L("moc", "мощность") : L("zbiory", "урожай")} <i class="ga u">↑</i></span><em>→</em><span>${L("presja cenowa", "давление цен")} <i class="ga d">↓</i></span></p>
            <button class="gbtn primary" id="gbuild" ${st.done ? "disabled" : ""}>${L("Zbuduj", "Построить")} (${BUILD[bk].cost} ${L("mln", "млн")})</button>`}</div>` : ""}</div>`;
      forecastBase = { ...st.d };
      (b.controls || []).forEach(c => {
        const inp = p.querySelector("#c-" + c.k), out = p.querySelector("#v-" + c.k);
        const show = () => { const v = +inp.value; out.textContent = (c.k === "cap" && v === 0) ? T.none : c.k === "reserve" ? (v < 0 ? L(`kupuj ${-v} t`, `покупать ${-v} т`) : v > 0 ? L(`uwalniaj ${v} t`, `выпускать ${v} т`) : "0") : fmt(v) + c.unit; };
        inp.oninput = () => {
          pause();
          const from = forecastBase[c.k]; st.d[c.k] = +inp.value; show();
          p.querySelector("#gfc").innerHTML = `<b>${T.forecast}</b>` + (from === st.d[c.k] ? `<p class="gsmall">${T.noChange}</p>` : preview(c.k, from, st.d[c.k]));
          hud(); labels(); world?.apply(view());
        };
        show();
      });
      p.querySelector("#gbuild")?.addEventListener("click", () => {
        if (st.budget < BUILD[bk].cost * 0.3){ p.querySelector("#gbuild").insertAdjacentHTML("afterend", `<p class="gverd no">${L("Za mało pieniędzy w budżecie na pierwszą ratę.", "В бюджете мало денег на первый платёж.")}</p>`); return; }
        startBuild(st, bk); st.log.push(L(`Rozpoczęto budowę: ${bInfo.name}. ${BUILD[bk].site * 10} osób dostało pracę przy budowie.`, `Начато строительство: ${bInfo.name}. ${BUILD[bk].site * 10} человек получили работу на стройке.`));
        floatText(sel, L(`+${BUILD[bk].site * 10} miejsc pracy`, `+${BUILD[bk].site * 10} рабочих мест`), true);
        world?.apply(view()); panel(); hud(); labels();
      });
    }
    function select(id){ if (tutorial) return; sel = id || null; $("#gpanel").classList.remove("collapsed"); $(".gbody").classList.remove("wide"); world?.highlight(sel); world?.render(); panel(); labels(); }

    function modal(html, onClose){
      const m = $("#gmodal");
      m.innerHTML = html ? `<div class="gmodal"><div class="gcard">${html}<button class="gbtn primary" id="gclose" style="align-self:flex-end">${T.close} →</button></div></div>` : "";
      m.querySelector("#gclose")?.addEventListener("click", () => { modal(""); onClose?.(); });
      m.querySelector("#grestart")?.addEventListener("click", restart);
      m.querySelectorAll("[data-apply]").forEach(b => b.addEventListener("click", () => { Object.assign(st.d, JSON.parse(b.dataset.apply)); modal(""); panel(); hud(); labels(); world?.apply(view()); }));
    }

    // ---------- samouczek
    function tutSteps(){
      const c5 = sim(st, { ...st.d, cap: 5 });
      return [
        { t: null, h: L("Witaj na mapie szkoleniowej", "Добро пожаловать на учебную карту"), b: `<p>${T.brief}</p><div class="gdef">${T.rationalDef}</div>` },
        { t: "#gstats", h: L("Wskaźniki i „Dlaczego?”", "Показатели и «Почему?»"), b: `<p>${L("Pokazują prognozę na <b>bieżący miesiąc</b>. Zielone = cel spełniony, czerwone = nie. <b>Dotknij dowolnego wskaźnika</b>, a zobaczysz, co się stało, dlaczego i co możesz zrobić — z łańcuchem przyczyn na liczbach z tego miesiąca.", "Показывают прогноз на <b>текущий месяц</b>. Зелёный = цель выполнена, красный = нет. <b>Нажми на любой показатель</b> — увидишь, что произошло, почему и что можно сделать, с цепочкой причин на цифрах этого месяца.")}</p><ul class="gtutl">${T.goalList.map(x => `<li>${x}</li>`).join("")}</ul>` },
        { t: null, h: L("Lekcja 1: dlaczego nie ustawić ceny 5 zł?", "Урок 1: почему не установить цену 5 zł?"), b: `<p>${L(`Gdyby rząd ustawił cenę maksymalną 5 zł, w tym miesiącu chętni chcieliby kupić <b>${ty(c5.demand)}</b> bochenków, a piekarnie upieką tylko <b>${ty(c5.production)}</b>. Zabrakłoby <b>${ty(c5.short)}</b>.`, `Если правительство установит потолок 5 zł, в этом месяце желающие захотят купить <b>${ty(c5.demand)}</b> буханок, а пекарни испекут лишь <b>${ty(c5.production)}</b>. Не хватит <b>${ty(c5.short)}</b>.`)}</p><p>${L("Cena 5 zł nie oznacza, że każdy kupi chleb za 5 zł. Cena jest niska, ale dostępność też. Żeby chleb potaniał naprawdę, musi go być więcej: zboże → piekarnie → sklep.", "Цена 5 zł не значит, что каждый купит хлеб за 5 zł. Цена низкая, но и доступность низкая. Чтобы хлеб реально подешевел, его должно стать больше: зерно → пекарни → магазин.")}</p>` },
        ...["rzad", "nbp", "rezerwy", "farma", "piekarnia", "sklep", "granica"].map(id => ({ t: `.glabel[data-b="${id}"]`, id, h: B[id].name, b: `<p>${inline(B[id].role)}</p>` + (B[id].controls ? `<p class="gsmall">${L("Decyzje tutaj: ", "Решения здесь: ")}${B[id].controls.map(c => c.label).join("; ")}.</p>` : B[id].build ? `<p class="gsmall">${L("Tutaj zlecisz budowę: ", "Здесь можно заказать стройку: ")}${BI[B[id].build].name}.</p>` : "") })),
        { t: "#gadv", h: T.advisor, b: `<p>${L("Doradca patrzy na ten i 3 kolejne miesiące (także na zbliżającą się blokadę), odrzuca decyzje nieracjonalne i spośród reszty wybiera tę z największym dobrobytem — i tłumaczy dlaczego.", "Советник смотрит на этот и 3 следующих месяца (в том числе на приближающуюся блокаду), отбрасывает нерациональные решения и из оставшихся выбирает с максимальным благосостоянием — и объясняет почему.")}</p>` },
        { t: "#gplay", h: L("Czas", "Время"), b: `<p>${L("▶ uruchamia czas: miesiąc to 4 tygodnie. Decyzje działają z opóźnieniem: cena dochodzi do równowagi stopniowo, importerzy reagują w 1–2 mies., budowy trwają 3–4 mies. Na koniec miesiąca zobaczysz, dlaczego cena się zmieniła.", "▶ запускает время: месяц — это 4 недели. Решения действуют с задержкой: цена приходит к равновесию постепенно, импортёры реагируют за 1–2 мес., стройки идут 3–4 мес. В конце месяца увидишь, почему изменилась цена.")}</p><p><b>${L("Pierwsze zadanie: dotknij wskaźnika „Chleb” i sprawdź, dlaczego jest drogo. Potem zmień decyzję i naciśnij ▶.", "Первое задание: нажми на показатель «Хлеб» и выясни, почему дорого. Потом измени решение и нажми ▶.")}</b></p>` },
      ];
    }
    function showTut(i){
      const S = tutSteps(); tutorial = { i };
      const step = S[i], box = $("#gtut");
      let ring = "", pos = "center";
      if (step.t){
        const el = host.querySelector(step.t);
        if (el){ const a = el.getBoundingClientRect(), hb = $(".gbody").getBoundingClientRect(); ring = `<div class="gring" style="left:${a.left - hb.left - 6}px;top:${a.top - hb.top - 6}px;width:${a.width + 12}px;height:${a.height + 12}px"></div>`; pos = a.top - hb.top > hb.height / 2 ? "top" : "bottom"; }
      }
      world?.highlight(step.id || null); world?.render();
      box.innerHTML = `<div class="gtutwrap">${ring}<div class="gtcard ${pos}">
        <span class="gsmall">${i + 1} / ${S.length}</span><h2>${step.h}</h2><div class="gtb">${step.b}</div>
        <div class="gtnav"><button class="gbtn" id="tskip">${L("Pomiń", "Пропустить")}</button>
        <span>${i > 0 ? `<button class="gbtn" id="tprev">←</button>` : ""}<button class="gbtn primary" id="tnext">${i + 1 < S.length ? T.close + " →" : L("Zaczynam", "Начинаю")}</button></span></div></div></div>`;
      box.querySelector("#tnext").onclick = () => i + 1 < S.length ? showTut(i + 1) : endTut();
      box.querySelector("#tprev")?.addEventListener("click", () => showTut(i - 1));
      box.querySelector("#tskip").onclick = endTut;
    }
    function endTut(){ tutorial = null; $("#gtut").innerHTML = ""; try { localStorage.setItem(LS_TUT, "4"); } catch {} world?.highlight(sel); world?.render(); panel(); labels(); }
    function startTut(){ pause(); modal(""); sel = null; panel(); showTut(0); }

    // ---------- doradca
    function advisor(){
      pause();
      const cur = sim(st), best = bestPolicy(st), curH = horizon(st, st.d).rs;
      const curWh = curH.reduce((s, x) => s + x.W, 0) / curH.length, gap = best.Wh - curWh;
      const names = { tariff: L("cło", "пошлина"), reserve: L("rezerwy", "резерв"), subsidy: L("dopłaty", "дотации"), rate: L("stopa NBP", "ставка NBP"), cap: L("cena maks.", "потолок цены") };
      const b0 = best.r;
      const why = {
        tariff: v => v < st.d.tariff ? L(`Import wzrośnie (w tym mies. ${tt(cur.imp)} → ${tt(b0.imp)}, dalej więcej), więc zboża i chleba będzie więcej. Rolnicy stracą trochę dochodu, konsumenci zyskają więcej.`, `Импорт вырастет (в этом мес. ${tt(cur.imp)} → ${tt(b0.imp)}, дальше больше), значит зерна и хлеба станет больше. Фермеры немного потеряют, потребители выиграют больше.`) : L(`Zboża wystarcza: wyższe cło da ${fmt(b0.tariffRev)} mln wpływów i ochroni dochód rolników (${pc(cur.farmInc)} → ${pc(b0.farmInc)}).`, `Зерна хватает: более высокая пошлина даст ${fmt(b0.tariffRev)} млн дохода и защитит доход фермеров (${pc(cur.farmInc)} → ${pc(b0.farmInc)}).`),
        reserve: v => v > st.d.reserve ? L(`Uwolnienie ${tt(Math.max(0, v))} obniży niedobór z ${fmt(cur.shortage)}% do ${fmt(b0.shortage)}%.${st.m < BLOCKADE[0] ? " Część zapasu zostaje na blokadę." : ""}`, `Выпуск ${tt(Math.max(0, v))} снизит дефицит с ${fmt(cur.shortage)}% до ${fmt(b0.shortage)}%.${st.m < BLOCKADE[0] ? " Часть запаса остаётся на блокаду." : ""}`) : v < 0 ? L("Zboża jest teraz dużo — to dobry moment, by odbudować zapas na przyszłe wstrząsy.", "Зерна сейчас много — хороший момент восстановить запас на будущие шоки.") : L(`Zostaw zapas: ${st.m < BLOCKADE[0] ? `za ${BLOCKADE[0] - st.m} mies. zacznie się blokada importu, wtedy każda tona będzie cenniejsza.` : "dziś nie jest potrzebny tak bardzo jak w kolejnych miesiącach."}`, `Сохрани запас: ${st.m < BLOCKADE[0] ? `через ${BLOCKADE[0] - st.m} мес. начнётся блокада импорта, тогда каждая тонна будет ценнее.` : "сегодня он нужен меньше, чем в следующие месяцы."}`),
        subsidy: v => v > st.d.subsidy ? L(`Dochód rolników ${pc(cur.farmInc)} → ${pc(b0.farmInc)}, a od przyszłego miesiąca większe zbiory.`, `Доход фермеров ${pc(cur.farmInc)} → ${pc(b0.farmInc)}, а со следующего месяца больше урожай.`) : L("Dopłaty kosztują więcej, niż dają dobrobytu.", "Дотации стоят больше, чем дают благосостояния."),
        rate: v => v > st.d.rate ? L(`Wyższa stopa ograniczy popyt (${ty(cur.demand)} → ${ty(b0.demand)}) i presję na ceny.`, `Более высокая ставка снизит спрос (${ty(cur.demand)} → ${ty(b0.demand)}) и давление на цены.`) : L(`Niższa stopa wesprze zatrudnienie (bezrobocie ${fmt(cur.unemp)}% → ${fmt(b0.unemp)}%).`, `Более низкая ставка поддержит занятость (безработица ${fmt(cur.unemp)}% → ${fmt(b0.unemp)}%).`),
        cap: () => L("Cena maksymalna tworzy niedobór i nie zwiększa podaży.", "Потолок цены создаёт дефицит и не увеличивает предложение."),
      };
      const vfmt = (k, v) => k === "cap" && !v ? T.none : k === "reserve" ? (v < 0 ? L(`kupuj ${-v} t`, `покупать ${-v} т`) : v > 0 ? L(`uwalniaj ${v} t`, `выпускать ${v} т`) : "0") : fmt(v);
      const diffs = Object.keys(names).filter(k => best.d[k] !== st.d[k]);
      const status = cur.rational ? (gap < 1 ? L("<b>Twoje decyzje są racjonalne i prawie optymalne.</b>", "<b>Твои решения рациональны и почти оптимальны.</b>") : L(`<b>Twoje decyzje są racjonalne, ale nie optymalne.</b> Cele są spełnione, ale w tym i kolejnych 3 miesiącach można mieć średnio o ${fmt(gap)} pkt więcej dobrobytu.`, `<b>Твои решения рациональны, но не оптимальны.</b> Цели выполнены, но в этом и следующих 3 месяцах можно получить в среднем на ${fmt(gap)} п. больше благосостояния.`))
        : L("<b>Twoje decyzje nie są racjonalne:</b> nie wszystkie cele są spełnione.", "<b>Твои решения не рациональны:</b> не все цели выполнены.");
      const bestNote = best.level === 2 ? `<p class="gverd no">${L("W tym miesiącu żadna decyzja nie spełni wszystkich celów — doradca wybiera tę z najmniejszą liczbą niespełnionych celów.", "В этом месяце ни одно решение не выполнит все цели — советник выбирает вариант с наименьшим числом невыполненных целей.")}</p>` : best.level === 1 ? `<p class="gverd no">${L("Uwaga: budżet może nie wytrzymać do końca roku.", "Внимание: бюджет может не дотянуть до конца года.")}</p>` : "";
      modal(`<h2>💡 ${T.advisor}</h2><p>${status}</p>${bestNote}
        ${diffs.length ? `<b>${L("Co zmienić i dlaczego", "Что изменить и почему")}</b><ul>${diffs.map(k => `<li><b>${names[k]}: ${vfmt(k, st.d[k])} → ${vfmt(k, best.d[k])}</b>. ${why[k](best.d[k])}</li>`).join("")}</ul>` : ""}
        <table class="gtbl"><tr><th></th><th>${L("Teraz", "Сейчас")}</th><th>${L("Optymalnie", "Оптимально")}</th></tr>
          <tr><td>${T.bread}</td><td>${zl(cur.P)}</td><td>${zl(b0.P)}</td></tr>
          <tr><td>${L("Niedobór", "Дефицит")}</td><td>${fmt(cur.shortage)}%</td><td>${fmt(b0.shortage)}%</td></tr>
          <tr><td>${T.farmInc}</td><td>${pc(cur.farmInc)}</td><td>${pc(b0.farmInc)}</td></tr>
          <tr><td>${T.unemp}</td><td>${fmt(cur.unemp)}%</td><td>${fmt(b0.unemp)}%</td></tr>
          <tr><td>${L("Saldo budżetu", "Сальдо бюджета")}</td><td>${sign(cur.net)}</td><td>${sign(b0.net)}</td></tr>
          <tr><td>${L("Cele spełnione", "Цели выполнены")}</td><td>${cur.rational ? "✓" : "✗"}</td><td>${b0.rational ? "✓" : "✗"}</td></tr>
          <tr class="sum"><td>${T.welfare} (${L("śr. 4 mies.", "ср. 4 мес.")})</td><td>${Math.round(curWh)}</td><td>${Math.round(best.Wh)}</td></tr></table>
        <p class="gsmall">${L("Racjonalne = spełnia cele. Optymalne = spośród racjonalnych daje najwięcej dobrobytu w tym i 3 kolejnych miesiącach.", "Рационально = выполняет цели. Оптимально = из рациональных даёт больше всего благосостояния в этом и 3 следующих месяцах.")}</p>
        ${diffs.length ? `<button class="gbtn" data-apply='${JSON.stringify(best.d)}'>${L("Zastosuj te ustawienia", "Применить эти настройки")}</button>` : ""}`);
      track?.("game", "advisor", Math.round(gap));
    }

    // ---------- czas
    function monthEnd(){
      if (st.done) return;
      const before = st.budget, prevP = st.price, stBefore = { ...st, d: { ...st.d } };
      const { r, finished } = advance(st);
      const ev = [];
      finished.forEach(t => { ev.push(t === "piekarnia2" ? L(`Ukończono: ${BI[t].name}. Od teraz moc: ${ty(st.bakeries * NORM)}`, `Построено: ${BI[t].name}. Теперь мощность: ${ty(st.bakeries * NORM)}`) : L(`Ukończono: ${BI[t].name} — pełny efekt.`, `Построено: ${BI[t].name} — полный эффект.`)); floatText(t === "piekarnia2" ? "piekarnia" : "farma", t === "piekarnia2" ? L("+1 000 tys. mocy", "+1 000 тыс. мощности") : L("+12% potencjału", "+12% потенциала"), true); });
      if (r.capped && r.short > 1) ev.push(L(`⚠️ Chleb był tani (${zl(r.P)}), ale nie dla wszystkich: zabrakło ${ty(r.short)} bochenków.`, `⚠️ Хлеб был дешёвым (${zl(r.P)}), но не для всех: не хватило ${ty(r.short)} буханок.`));
      else if (!r.ok.shortage) ev.push(L(`Zabrakło ${ty(r.short)} bochenków: cena jeszcze nie dogoniła równowagi.`, `Не хватило ${ty(r.short)} буханок: цена ещё не догнала равновесную.`));
      if (!r.ok.farmInc) ev.push(L(`Rolnicy protestują: dochód tylko ${pc(r.farmInc)} normalnego.`, `Фермеры протестуют: доход лишь ${pc(r.farmInc)} обычного.`));
      if (!r.ok.unemp) ev.push(L(`Bezrobocie ${fmt(r.unemp)}%.`, `Безработица ${fmt(r.unemp)}%.`));
      if (!r.ok.budget) ev.push(L("Budżet poniżej limitu.", "Бюджет ниже лимита."));
      if (st.m === BLOCKADE[0]) ev.push(L("Od teraz przez 3 miesiące import jest zablokowany (max 120 t).", "Следующие 3 месяца импорт заблокирован (макс. 120 т)."));
      if (st.m === BLOCKADE[0] + 1) ev.push(L("Prognoza: w tym miesiącu susza (−20% zbiorów).", "Прогноз: в этом месяце засуха (−20% урожая)."));
      if (st.m === BLOCKADE[BLOCKADE.length - 1] + 1) ev.push(L("Blokada importu się skończyła.", "Блокада импорта закончилась."));
      if (st.m === 7) ev.push(L("Do miasta napłynęli nowi mieszkańcy: popyt +3%.", "В город приехали новые жители: спрос +3%."));
      if (st.m === 9) ev.push(L("Nowe żniwa! Zbiory wracają do normy — dobry moment, by odbudować rezerwy.", "Новый урожай! Урожай возвращается к норме — хороший момент пополнить резерв."));
      st.log.push(`${T.month} ${st.m}: ${L("chleb", "хлеб")} ${fmt(r.P)} zł, ${L("niedobór", "дефицит")} ${n0(r.short)} ${L("tys.", "тыс.")}, ${T.welfare.toLowerCase()} ${Math.round(r.W)}${r.rational ? " ✓" : " ✗"}`);
      if (Math.abs(st.budget - before) >= 0.1) floatText("rzad", sign(st.budget - before) + T.mln, st.budget >= before);
      track?.("game", "1-m" + st.m, Math.round(r.W));
      world?.apply(view()); hud(); labels(); panel();
      if (st.done){ pause(); finish(); return; }
      const big = Math.abs(r.dP) >= 3;
      if (ev.length || big || !r.rational){
        pause();
        const c = causes(stBefore, r, L), cc = { r: "🔴", o: "🟠", y: "🟡" };
        modal(`<h2>${L("Koniec miesiąca", "Конец месяца")} ${st.m}</h2>
          <p>${L(`Cena chleba: ${zl(prevP)} → <b>${zl(r.P)}</b> (${sign(r.dP)}%).`, `Цена хлеба: ${zl(prevP)} → <b>${zl(r.P)}</b> (${sign(r.dP)}%).`)} ${T.welfare}: <b>${Math.round(r.W)}</b> · ${r.rational ? L("decyzje racjonalne ✓", "решения рациональны ✓") : L("decyzje nieracjonalne ✗", "решения нерациональны ✗")}</p>
          ${c.list.length ? `<b>${L("Dlaczego cena jest taka?", "Почему цена такая?")}</b><ul class="gcause">${c.list.slice(0, 3).map(x => `<li>${cc[x.col]} ${x.txt}</li>`).join("")}</ul>` : ""}
          ${ev.length ? `<b>${L("Wydarzenia", "События")}</b><ul>${ev.map(e => `<li>${inline(e)}</li>`).join("")}</ul>` : ""}
          <p class="gsmall">${L("Gra jest zatrzymana. Dotknij wskaźnika, aby zobaczyć pełny łańcuch przyczyn.", "Игра на паузе. Нажми на показатель, чтобы увидеть полную цепочку причин.")}</p>`);
      }
    }
    function dayTick(){ if (st.done) return; st.day++; if (st.day >= DAYS) monthEnd(); else hud(); }
    function play(){ if (st.done || timer || tutorial) return; modal(""); timer = setInterval(dayTick, 300 / speed); world?.setRunning(true); hud(); }
    function pause(){ if (timer){ clearInterval(timer); timer = null; } world?.setRunning(false); if ($("#gplay")) hud(); }
    function finish(){
      const g = grade(st), H = st.hist;
      try { const prev = JSON.parse(localStorage.getItem(LS) || "null"); if (prev == null || g.stars > prev) localStorage.setItem(LS, JSON.stringify(g.stars)); } catch {}
      track?.("game", "1-end", Math.round(g.eff));
      const top = H.reduce((a, h) => h.r.P > a.r.P ? h : a, H[0]);
      const capM = H.filter(h => h.r.capped).length, blkRel = H.filter(h => BLOCKADE.includes(h.m)).reduce((s, h) => s + h.r.rel, 0), earlyRel = H.filter(h => h.m < BLOCKADE[0]).reduce((s, h) => s + h.r.rel, 0);
      const ratNotOpt = H.filter(h => h.r.rational && h.bestW - h.r.W > 1).length;
      const qa = [
        [L("Dlaczego chleb drożał?", "Почему хлеб дорожал?"), L(`Najdrożej było w miesiącu ${top.m + 1} (${zl(top.r.P)}): podaż chleba (${ty(top.r.production)}) nie nadążała za popytem. Cena rośnie, gdy podaż nie nadąża za popytem.`, `Дороже всего было в месяце ${top.m + 1} (${zl(top.r.P)}): предложение хлеба (${ty(top.r.production)}) не успевало за спросом. Цена растёт, когда предложение не успевает за спросом.`)],
        [L("Dlaczego cena maksymalna tworzy niedobór?", "Почему потолок цены создаёт дефицит?"), capM ? L(`Używałeś jej przez ${capM} mies.: cena poniżej równowagi zwiększa liczbę chętnych, a nie liczbę bochenków.`, `Ты использовал его ${capM} мес.: цена ниже равновесной увеличивает число желающих, а не число буханок.`) : L("Cena poniżej równowagi zwiększa liczbę chętnych, a nie liczbę bochenków.", "Цена ниже равновесной увеличивает число желающих, а не число буханок.")],
        [L("Po co rezerwa i dlaczego nie zawsze jej używać?", "Зачем резерв и почему не всегда им пользоваться?"), L(`Przed blokadą uwolniłeś ${tt(earlyRel)}, w blokadzie ${tt(blkRel)}. Rezerwa wygładza chwilowy wstrząs, ale jest skończona — zużyta wcześniej nie pomoże w kryzysie.`, `До блокады ты выпустил ${tt(earlyRel)}, в блокаду ${tt(blkRel)}. Резерв сглаживает временный шок, но он конечен — потраченный раньше не поможет в кризис.`)],
        [L("Kiedy budowa się opłaca?", "Когда стройка выгодна?"), L("Gdy zwiększa przyszłą moc tam, gdzie brakuje mocy. Gdy brakuje zboża, dodatkowe piece stoją.", "Когда увеличивает будущую мощность там, где её не хватает. Если не хватает зерна, дополнительные печи простаивают.")],
        [L("Racjonalne a optymalne", "Рационально и оптимально"), L(`W ${ratNotOpt} mies. Twoje decyzje spełniały cele, ale nie dawały największego dobrobytu — kilka decyzji może być racjonalnych, a tylko jedna optymalna.`, `В ${ratNotOpt} мес. твои решения выполняли цели, но не давали максимального благосостояния — рациональных решений может быть несколько, а оптимальное одно.`)],
      ];
      modal(`<h2>${L("Koniec roku", "Конец года")}: ${"★".repeat(g.stars)}${"☆".repeat(3 - g.stars)}</h2>
        <table class="gtbl"><tr><td>${L("Miesiące z decyzjami racjonalnymi", "Месяцы с рациональными решениями")}</td><td>${Math.round(g.rationalShare * 12)}/12</td></tr>
          <tr><td>${L("Twój średni dobrobyt", "Твоё среднее благосостояние")}</td><td>${fmt(g.W)}</td></tr>
          <tr><td>${L("Optymalny średni dobrobyt", "Оптимальное среднее благосостояние")}</td><td>${fmt(g.bestW)}</td></tr>
          <tr class="sum"><td>${L("Efektywność", "Эффективность")}</td><td>${Math.round(g.eff)}%</td></tr></table>
        <b>${L("Czego nauczył Cię ten rok", "Чему научил этот год")}</b><ul class="gcause">${qa.map(([q, a]) => `<li><b>${q}</b> ${a}</li>`).join("")}</ul>
        <button class="gbtn" id="grestart">${T.restart}</button>`);
    }
    function restart(){ pause(); st = newState(); sel = null; modal(""); world?.apply(view()); hud(); panel(); labels(); }

    host.addEventListener("click", e => {
      if (e.target.closest("[data-col]")){ $("#gpanel").classList.toggle("collapsed"); $(".gbody").classList.toggle("wide", $("#gpanel").classList.contains("collapsed")); return; }
      const w = e.target.closest("[data-why]"); if (w && !tutorial){ why(w.dataset.why); return; }
      const b = e.target.closest("[data-b]"); if (b) select(b.dataset.b);
    });
    $("#gplay").onclick = () => timer ? pause() : play();
    $("#gspeed").onclick = () => { speed = speed === 1 ? 2 : speed === 2 ? 4 : 1; if (timer){ clearInterval(timer); timer = setInterval(dayTick, 300 / speed); } hud(); };
    $("#gadv").onclick = () => { if (!tutorial) advisor(); };
    $("#ghelp").onclick = startTut;
    if (matchMedia("(max-width:900px)").matches) $("#gpanel").classList.add("collapsed");
    hud(); panel();

    let seenTut = false; try { seenTut = localStorage.getItem(LS_TUT) === "4"; } catch {}
    loadThree().then(THREE => {
      const load = $("#gload");
      let ok = !!THREE;
      if (ok){ try { world = makeScene(THREE, $("#gcv")); } catch (e) { ok = false; } }
      if (!ok){ load.textContent = T.noGL; panel(); if (!seenTut) startTut(); return; }
      load.remove();
      world.resize(); world.apply(view()); labels();
      $("#gcv").addEventListener("click", e => select(world.pick(e.clientX, e.clientY)));
      const ro = new ResizeObserver(() => { if (!host.isConnected){ ro.disconnect(); pause(); world.dispose(); return; } world.resize(); labels(); if (tutorial) showTut(tutorial.i); });
      ro.observe($("#gscene"));
      if (!seenTut) startTut();
    });
    window.addEventListener("hashchange", () => { if (!host.isConnected) pause(); }, { once: true });
  }

  window.BrainstormGame = { mount, _model: { newState, sim, step, horizon, advance, grade, bestPolicy, startBuild, causes, GOALS, BLOCKADE } };
})();
