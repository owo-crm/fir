// Novaria — rdzeń symulacji gospodarki (dzień po dniu). Bez DOM: działa w przeglądarce i w Node (testy).
// Jednostki: PKB i budżet w mln zł / miesiąc, zboże w tonach, chleb w tys. bochenków (1 t ≈ 1 tys.).
(function (root) {
  "use strict";
  const DAYS = 30, YEARS = 8, MONTHS = YEARS * 12, TOTAL = MONTHS * DAYS;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ema = (old, v, days) => old + (v - old) / days;
  const DA = 1 - Math.pow(0.6, 1 / DAYS);                 // cena dochodzi 40% drogi do celu w miesiąc
  function rng(seed){ let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // ------------------------------------------------------------ stałe świata
  const POP0 = 120000, LF_SHARE = 0.5;
  const PROD0 = 10000;                                   // zł produkcji na pracownika miesięcznie
  const HARVEST = [0, 0, 0, 0, 0, 0, 0.30, 0.45, 0.25, 0, 0, 0]; // żniwa: lipiec–wrzesień
  const HARVEST0 = 14700;                                // t zboża w normalnym roku
  const BREAD_PC = 10;                                   // bochenków na osobę miesięcznie przy 5 zł
  const BAKERY_CAP = 1300;                               // tys. bochenków / mies. na piekarnię
  const GROUPS = [                                       // gospodarstwa domowe
    { k: "low",  pop: 0.35, inc: 0.18, food: 0.28, mpc: 0.97 },
    { k: "mid",  pop: 0.45, inc: 0.47, food: 0.16, mpc: 0.85 },
    { k: "high", pop: 0.20, inc: 0.35, food: 0.07, mpc: 0.60 },
  ];
  const PROJECTS = {
    piekarnia:  { cost: 40,  months: 4,  jobs: 120, unlock: 0 },
    nawadnianie:{ cost: 60,  months: 8,  jobs: 200, unlock: 0 },
    elektrownia:{ cost: 180, months: 14, jobs: 500, unlock: 6 },
    kolej:      { cost: 140, months: 12, jobs: 450, unlock: 6 },
    port:       { cost: 120, months: 10, jobs: 350, unlock: 6 },
  };
  // kiedy odblokowuje się narzędzie (miesiąc kampanii) — gra stopniowo się komplikuje
  const UNLOCK = { reserve: 0, cap: 0, farmSub: 0, tax: 2, spend: 2, transfers: 2, rate: 4, tariff: 6 };
  const LAGS = { tax: 30, spend: 45, transfers: 20, farmSub: 30, tariff: 20 };   // dni do pełnego efektu
  const DEFAULT_POLICY = { reserve: 0, cap: 0, farmSub: 0, tax: 22, spend: 17.5, transfers: 25, rate: 4.5, tariff: 10 };

  // ------------------------------------------------------------ wydarzenia (losowe, ale z sygnałami)
  // fazy: warning → stress → crisis → recovery
  const EVENTS = {
    drought: { months: [2, 3, 4, 5], base: 0.075, len: 130,
      phases: [[0, "warning"], [25, "stress"], [55, "crisis"], [100, "recovery"]],
      prob: s => (s.w.rain < 0.85 ? 0.12 : 0) + (s.mem.drought > 0 ? 0.05 : 0) },
    energy:  { months: null, base: 0.022, len: 220, phases: [[0, "warning"], [15, "stress"], [40, "crisis"], [110, "recovery"]], prob: () => 0 },
    boom:    { months: null, base: 0.025, len: 200, phases: [[0, "warning"], [30, "stress"], [60, "crisis"], [150, "recovery"]],
      prob: s => (s.m.realRate < 0 ? 0.025 : 0) + (s.m.conf > 1.03 ? 0.02 : 0) },
    recession:{ months: null, base: 0.02, len: 240, phases: [[0, "warning"], [30, "stress"], [60, "crisis"], [170, "recovery"]],
      prob: s => (s.m.infl > 6 && s.p.rate > 7 ? 0.04 : 0) + (s.mem.boom > 0 ? 0.03 : 0) + (s.m.realRate > 3 ? 0.02 : 0) },
    credit:  { months: null, base: 0.015, len: 160, phases: [[0, "warning"], [20, "stress"], [45, "crisis"], [120, "recovery"]],
      prob: s => (s.p.rate > 7 ? 0.03 : 0) + (s.m.debtRatio > 0.9 ? 0.03 : 0) + (s.mem.boom > 0 ? 0.015 : 0) },
    trade:   { months: null, base: 0.012, len: 110, phases: [[0, "warning"], [10, "crisis"], [80, "recovery"]], prob: () => 0 },
  };
  function eventIntensity(ev){             // 0..1 siły wydarzenia w danym dniu
    const t = ev.t, L = EVENTS[ev.k].len, ph = EVENTS[ev.k].phases;
    const crisisAt = (ph.find(p => p[1] === "crisis") || ph[1])[0], recAt = ph[ph.length - 1][0];
    if (t < crisisAt) return 0.25 + 0.75 * t / crisisAt * 0.6;
    if (t < recAt) return 1;
    return Math.max(0, 1 - (t - recAt) / (L - recAt));
  }
  const phaseOf = ev => { let p = "warning"; for (const [d, n] of EVENTS[ev.k].phases) if (ev.t >= d) p = n; return p; };

  // ------------------------------------------------------------ stan początkowy
  function newGame(seed = (Math.random() * 1e9) | 0){
    const s = {
      seed, day: 0, over: false, lost: null, warn: {},
      p: { ...DEFAULT_POLICY }, pe: { ...DEFAULT_POLICY },
      pop: POP0, prodIdx: 1,
      w: { rain: 1, rainT: 1, crop: 1, energy: 1, worldDemand: 1, worldGrain: 1000, portCap: 1, conf: 1, credit: 1 },
      g: { stock: 7600, price: 1000, imp: 0, exp: 0, reserve: 2500, harvested: 0, farmInc: 1 },
      b: { bakeries: 1, price: 5, prod: 1180, demand: 1200, sales: 1180, short: 0 },
      m: { Y: 600, C: 0, I: 0, G: 0, NX: 0, Yinc: 600, infl: 2.5, inflE: 2.5, core: 2.5, pIdx: 1, cpi: 1, rateEff: 4.5,
           unemp: 6, debt: 3400, budget: 0, approval: 58, realInc: 1, realRate: 2, debtRatio: 0.58, conf: 1, ygap: 0 },
      infra: { irrigation: 0, energyEff: 0, rail: 0, port: 0 },
      projects: [], events: [], mem: { drought: 0, boom: 0 },
      mtd: null, hist: [], monthly: [], news: [], concepts: {}, decisions: [], risks: {}, crises: [],
      _rng: null,
    };
    s.mtd = blankMtd();
    for (let i = 0; i < 60; i++) tick(s, true);           // rozgrzewka: gospodarka w stanie równowagi
    s.day = 0; s.hist = []; s.monthly = []; s.news = []; s.mtd = blankMtd(); s.events = []; s.crises = [];
    s.incRef = null; s.m.realInc = 1;
    for (let i = 0; i < 5; i++) tick(s, true);
    s.day = 0; s.g.stock = 8600; s.g.imp = 0; s.g.exp = 0; s.g.harvested = 0; s.w.crop = 1;
    s.start = snapshot(s); s.risks = riskForecast(s);
    return s;
  }
  const blankMtd = () => ({ n: 0, Y: 0, bread: 0, short: 0, demand: 0, sales: 0, budget: 0, harvest: 0, imp: 0, exp: 0, price0: null, cpi0: null });
  const R = s => s._rng || (s._rng = rng(s.seed + s.day * 7919));
  const date = d => ({ day: d % DAYS, month: Math.floor(d / DAYS) % 12, year: Math.floor(d / (DAYS * 12)), mIndex: Math.floor(d / DAYS) });

  // ------------------------------------------------------------ jeden dzień
  function tick(s, warmup = false){
    const D = date(s.day), w = s.w, g = s.g, b = s.b, m = s.m, p = s.p;
    s._rng = rng(s.seed * 31 + s.day * 7919 + 17);
    const rnd = s._rng;

    // --- wydarzenia (start na początku miesiąca)
    if (!warmup && !s.noEvents && D.day === 0) rollEvents(s, D);
    // decyzje działają z opóźnieniem: ustawa → urzędy → ludzie i firmy
    const pe = s.pe || (s.pe = { ...p });
    for (const [k, lag] of Object.entries(LAGS)) pe[k] = Math.abs(pe[k] - p[k]) < 1e-6 ? p[k] : ema(pe[k], p[k], lag);
    let rainT = 1, energyT = 1, confT = 1, worldT = 1, creditT = 1, portT = 1;
    for (const ev of s.events){
      const k = eventIntensity(ev);
      if (ev.k === "drought") rainT = Math.min(rainT, 1 - 0.6 * k);
      if (ev.k === "energy") energyT = Math.max(energyT, 1 + 0.75 * k);
      if (ev.k === "boom") confT += 0.09 * k;
      if (ev.k === "recession"){ confT -= 0.11 * k; worldT -= 0.12 * k; }
      if (ev.k === "credit") creditT = Math.min(creditT, 1 - 0.3 * k * (p.rate > 6 ? 1.4 : 1));
      if (ev.k === "trade") portT = Math.min(portT, 1 - 0.75 * k);
      ev.t++;
    }
    const ended = s.events.filter(ev => ev.t >= EVENTS[ev.k].len);
    ended.forEach(ev => { s.mem[ev.k] = 365; s.crises.push({ k: ev.k, start: ev.start, end: s.day }); });
    s.events = s.events.filter(ev => ev.t < EVENTS[ev.k].len);
    for (const k in s.mem) s.mem[k] = Math.max(0, s.mem[k] - 1);

    // --- pogoda i świat
    w.rainT = rainT;
    w.rain = clamp(w.rain + 0.06 * (rainT - w.rain) + (rnd() - 0.5) * 0.03, 0.2, 1.4);
    w.energy = ema(w.energy, energyT, 12);
    w.conf = ema(w.conf, confT, 25);
    w.worldDemand = ema(w.worldDemand, worldT, 30);
    w.credit = ema(w.credit, creditT, 15);
    w.portCap = ema(w.portCap, portT * (1 + 0.5 * s.infra.port), 6);
    w.worldGrain = clamp(w.worldGrain * (1 + (rnd() - 0.5) * 0.004) + (1000 - w.worldGrain) * 0.003 + (w.energy - 1) * 2, 700, 1500);

    // --- rolnictwo: stan upraw kształtuje się w sezonie wegetacji (kwiecień–sierpień)
    if (D.month === 0 && D.day === 0){ w.crop = 1; g.harvested = 0; }
    if (D.month >= 3 && D.month <= 7){
      const effRain = w.rain + s.infra.irrigation * (1 - w.rain) * 0.65;
      w.crop = clamp(w.crop + (Math.min(effRain, 1.15) - 1) * 0.012 + 0.0002 * (pe.farmSub > 0 ? 1 : 0), 0.4, 1.2);
    }
    const potential = HARVEST0 * s.prodIdx * (1 + 0.12 * s.infra.irrigation) * (1 + Math.min(pe.farmSub, 20) * 0.004);
    const harvestToday = potential * w.crop * HARVEST[D.month] / DAYS;
    g.harvested += harvestToday;
    const harvestForecast = potential * w.crop;          // prognoza tegorocznych zbiorów

    // --- rynek zboża: cena zależy od tego, czy zapasów + przyszłych zbiorów wystarczy do kolejnych żniw
    const use = Math.max(1, b.prod / DAYS);
    // ile dni musi wystarczyć to, co jest (do 1 lipca; w czasie żniw — do lipca następnego roku)
    const inHarvest = D.month >= 6 && D.month <= 8;
    const daysToJuly = ((6 - D.month + 12) % 12 || 12) * DAYS - D.day;
    const remainingHarvest = inHarvest ? Math.max(0, harvestForecast - g.harvested) : 0;
    const supplyAhead = g.stock + remainingHarvest + g.reserve * 0.15;
    const ratio = Math.max(0, supplyAhead - use * 35) / (use * Math.max(30, daysToJuly));   // bufor ~1 mies.
    // oczekiwania: gorsza prognoza zbiorów podnosi cenę już przed żniwami
    const tightness = clamp((1.4 - ratio) / 0.8, 0, 1);              // pełne magazyny = oczekiwania prawie nie działają
    const fRel = D.month >= 2 && D.month <= 8 ? harvestForecast / (HARVEST0 * s.prodIdx) : 1;   // po żniwach tegoroczna prognoza już nie ma znaczenia
    const expect = Math.pow(clamp(fRel, 0.4, 1.4), (inHarvest ? -0.2 : -0.9) * tightness);
    g.ratio = ratio; g.expect = expect; 
    const transport = 120 * (1 - 0.35 * s.infra.rail);
    const parity = w.worldGrain * (1 + pe.tariff / 100) + transport;  // cena zboża z importu
    const floor = w.worldGrain - transport;                          // cena, przy której opłaca się eksport
    const pgTarget = clamp(1000 * expect * Math.pow(clamp(ratio / 1.15, 0.2, 3), -1.4), floor * 0.9, parity * 1.25);
    g.price = g.price + (pgTarget - g.price) * 0.03;
    g.parity = parity; g.floor = floor; g.target = pgTarget; g.forecast = harvestForecast;
    const impT = g.price > parity ? clamp((g.price - parity) / parity * 6, 0, 1) * 400 * w.portCap : 0;
    const expT = g.price < floor ? clamp((floor - g.price) / floor * 6, 0, 1) * 400 * w.portCap : 0;
    g.imp = ema(g.imp, impT, 20); g.exp = ema(g.exp, expT, 20);

    // rezerwa państwowa: + uwalnianie, − zakupy (t/mies.)
    let rel = 0, buy = 0;
    if (p.reserve > 0) rel = Math.min(p.reserve / DAYS, g.reserve);
    if (p.reserve < 0) buy = Math.min(-p.reserve / DAYS, g.stock * 0.05);
    g.reserve += buy - rel;
    g.stock = Math.max(0, g.stock + harvestToday + g.imp / DAYS - g.exp / DAYS + rel - buy);

    // --- piekarnie
    const wageIdx = m.pIdx, energy = w.energy * (1 - 0.25 * s.infra.energyEff);
    const cap = BAKERY_CAP * b.bakeries;
    const incomeF = Math.pow(clamp(m.realInc, 0.5, 1.5), 0.3);
    const D0 = s.pop * BREAD_PC / 1000 * incomeF;        // popyt przy 5 zł (tys./mies.)
    const effP = p.cap > 0 ? Math.min(b.price, p.cap) : b.price;
    const demand = D0 * Math.pow(5 / effP, 0.6);
    const grainLimit = g.stock / 8 * DAYS;                // przy małym zapasie piekarnie racjonują zboże
    const prod = Math.min(cap, grainLimit, demand * 1.02);
    const used = prod / DAYS;
    g.stock = Math.max(0, g.stock - used);
    const sales = Math.min(demand, prod), short = Math.max(0, demand - prod);
    const costGrain = g.price / 1000, costLabor = 1.6 * wageIdx, costEnergy = 1.0 * energy;
    const cost = costGrain + costLabor + costEnergy;      // ≈ 3,6 zł/bochenek
    const tight = demand / Math.max(1, Math.min(cap, grainLimit));
    const scarcity = tight > 1 ? Math.pow(tight, 1 / 0.6) : Math.pow(tight, 0.4);
    const target = cost * 1.39 * scarcity;
    b.cost = { grain: costGrain, labor: costLabor, energy: costEnergy, total: cost, scarcity, target };
    b.price = clamp(b.price + (target - b.price) * DA, b.price * 0.985, b.price * 1.02);
    b.prod = prod; b.demand = demand; b.sales = sales; b.short = short; b.cap = cap; b.grainLimit = grainLimit;
    b.capped = p.cap > 0 && p.cap < b.price;
    // co naprawdę ogranicza piekarnię
    b.limit = grainLimit < cap && grainLimit <= demand * 1.02 ? "grain" : prod >= cap * 0.995 ? "cap" : costGrain > 1.15 ? "grainPrice" : costEnergy > 1.15 ? "energyPrice" : "demand";

    // --- makro: zagregowany popyt z opóźnieniami
    m.rateEff = ema(m.rateEff, p.rate, 45);              // stopa działa z opóźnieniem
    m.realRate = m.rateEff - m.inflE;
    const LF = s.pop * LF_SHARE;
    const Ypot = PROD0 * s.prodIdx * LF * 0.95 / 1e6 * (1 + 0.05 * s.infra.rail + 0.04 * s.infra.energyEff);
    const income = 0.7 * m.Yinc, tax = pe.tax / 100 * income;
    const disp = income - tax + pe.transfers + m.unemp / 100 * LF * 1800 / 1e6;
    const foodShare = 0.15, realDisp = disp / (m.cpi);
    const trend = s.prodIdx * s.pop / POP0;
    const cRate = 1 - 0.012 * (m.rateEff - 4.5), cShort = 1 - 0.08 * (b.short / Math.max(1, demand));
    const C = w.conf * (86 * trend + 0.78 * disp) * cRate * cShort;
    m.inc = { income, tax, transfers: pe.transfers, benefits: m.unemp / 100 * LF * 1800 / 1e6, disp, cRate, cShort, cBase: 86 * trend + 0.78 * disp };
    const credit = w.credit;
    const iRate = clamp(1 - 0.025 * (m.realRate - 2), 0.35, 1.4), iProj = 1 + 0.15 * s.projects.length / 3;
    const I = 105 * trend * w.conf * credit * iRate * iProj;
    m.iParts = { conf: w.conf, credit, iRate, iProj, trend };
    const projSpend = s.projects.reduce((a, pr) => a + PROJECTS[pr.k].cost / PROJECTS[pr.k].months, 0);
    const G = pe.spend / 100 * Ypot + projSpend;
    const X = 75 * trend * w.worldDemand * (1 + 0.25 * s.infra.port) * (1 - 0.15 * (energy - 1)) + g.exp * g.price / 1e6;
    const M = 0.14 * C + 0.1 * I + g.imp * g.price / 1e6 + 12 * (energy - 1);
    const AD = C + I + G + X - M;
    const Ycap = Ypot * 1.06;
    m.Y = ema(m.Y, Math.min(AD, Ycap), 20);
    m.Yinc = ema(m.Yinc, m.Y, 25);                         // dochody idą za produkcją (mnożnik)
    m.C = C; m.I = I; m.G = G; m.NX = X - M; m.X = X; m.M = M; m.Ypot = Ypot; m.AD = AD;
    m.ygap = (m.Y / Ypot - 1) * 100;
    const employed = clamp(m.Y * 1e6 / (PROD0 * s.prodIdx * (1 + 0.05 * s.infra.rail)) + s.projects.reduce((a, pr) => a + PROJECTS[pr.k].jobs * 0.4, 0), 0, LF);
    m.unemp = clamp(100 * (1 - employed / LF), 1.5, 40); m.employed = employed; m.LF = LF;

    // --- inflacja: bazowa (luka popytowa + oczekiwania), energia (kosztowa), żywność
    const energyPush = (w.energy - 1) * 12;
    m.core = ema(m.core, m.inflE + 0.45 * m.ygap + energyPush * 0.5, 40);
    m.inflE = ema(m.inflE, 0.45 * m.core + 0.55 * 2.5 - 0.15 * (m.rateEff - 4.5), 120);
    const breadInfl = s.hist.length >= 360 ? (b.price / s.hist[s.hist.length - 360].bread - 1) * 100 : (b.price / 5 - 1) * 100 * 0.6;
    m.infl = 0.75 * m.core + 0.1 * energyPush + 0.15 * breadInfl;
    { const tg = m.inflE + 0.45 * m.ygap + energyPush * 0.5, sc = Math.abs(tg) > 0.01 ? m.core / tg : 1;
      m.pi = { expect: 0.75 * m.inflE * sc, demand: 0.75 * 0.45 * m.ygap * sc, energy: 0.75 * energyPush * 0.5 * sc + 0.1 * energyPush, food: 0.15 * breadInfl }; }
    m.pIdx *= 1 + m.core / 100 / 360;
    m.cpi *= 1 + m.infl / 100 / 360;

    // --- grupy gospodarstw: inflacja uderza różnie
    m.groups = GROUPS.map(G => { const fi = (b.price / 5 - 1) * G.food, rinc = (income / 420) * (1 + (pe.transfers - 25) / 100 * (G.k === "low" ? 1.5 : 0.2)) / (1 + fi) / (m.cpi / m.pIdx) ; return { k: G.k, realInc: rinc, food: G.food }; });
    if (!s.incRef) s.incRef = realDisp;
    m.realInc = ema(m.realInc, realDisp / s.incRef, 30);

    // --- budżet (mln zł / dzień)
    const rev = { tax: tax / DAYS, vat: 0.18 * C / DAYS, tariff: g.imp * w.worldGrain * pe.tariff / 100 / 1e6 / DAYS, reserve: rel * g.price / 1e6 };
    const govRate = m.rateEff + Math.max(0, m.debtRatio - 0.6) * 8 + 0.8;
    const spend = { services: pe.spend / 100 * Ypot / DAYS, transfers: (pe.transfers + m.unemp / 100 * LF * 1800 / 1e6) / DAYS, farm: pe.farmSub / DAYS, projects: projSpend / DAYS, interest: m.debt * govRate / 100 / 360, reserve: buy * g.price / 1e6 };
    const net = Object.values(rev).reduce((a, x) => a + x, 0) - Object.values(spend).reduce((a, x) => a + x, 0);
    m.debt -= net; m.budgetDay = net; m.rev = rev; m.spendItems = spend; m.govRate = govRate;
    m.debtRatio = m.debt / (m.Y * 12);
    g.farmInc = ema(g.farmInc, (harvestForecast * g.price / (HARVEST0 * 1000) + pe.farmSub / 30), 30);

    // --- poparcie społeczne
    const ap = { base: 55, income: 40 * (m.realInc - 1), jobs: -2.6 * (m.unemp - 5), infl: -1.8 * Math.max(0, Math.abs(m.infl - 2.5) - 0.5), queues: -1.2 * (100 * b.short / Math.max(1, demand)), tax: -0.6 * (pe.tax - 22), services: 4 * (pe.spend - 17.5) + 0.1 * (pe.transfers - 25) };
    const apT = Object.values(ap).reduce((a, x) => a + x, 0); m.ap = ap;
    m.approval = clamp(ema(m.approval, apT, 30), 0, 100);
    m.conf = w.conf;

    // --- budowy
    s.projects.forEach(pr => pr.days++);
    const done = s.projects.filter(pr => pr.days >= PROJECTS[pr.k].months * DAYS);
    done.forEach(pr => finishProject(s, pr.k));
    s.projects = s.projects.filter(pr => pr.days < PROJECTS[pr.k].months * DAYS);
    s.infra.irrigationBuilding = s.projects.find(pr => pr.k === "nawadnianie");
    // nawadnianie działa stopniowo jeszcze w trakcie budowy (kanały otwierane po kolei)
    if (s.infra.irrigationBuilding) s.infra.irrigation = Math.max(s.infra.irrigation, clamp(s.infra.irrigationBuilding.days / (PROJECTS.nawadnianie.months * DAYS) - 0.3, 0, 1) * 0.6);

    // --- demografia i produktywność
    s.pop *= 1 + 0.003 / 360 + (m.unemp < 6 ? 0.001 / 360 : 0);
    s.prodIdx *= 1 + (0.012 + 0.00008 * (I - 100)) / 360;

    if (warmup) return;
    // --- historia, zestawienie miesiąca
    const mt = s.mtd;
    if (mt.price0 == null){ mt.snap0 = s.hist.length ? s.hist[s.hist.length - 1] : snapshot(s); mt.price0 = b.price; mt.cpi0 = m.cpi; mt.debt0 = m.debt; mt.Y0 = m.Y; mt.unemp0 = m.unemp; mt.grain0 = g.price; }
    mt.n++; mt.Y += m.Y / DAYS; mt.bread += b.price; mt.short += short / DAYS; mt.demand += demand / DAYS; mt.sales += sales / DAYS; mt.budget += net; mt.harvest += harvestToday; mt.imp += g.imp / DAYS; mt.exp += g.exp / DAYS;
    s.hist.push(snapshot(s));
    if (s.hist.length > 800) s.hist.splice(0, s.hist.length - 800);
    checkNews(s, D);
    s.day++;
    if (s.day % DAYS === 0) closeMonth(s);
    checkDefeat(s);
    if (s.day >= TOTAL) s.over = true;
  }

  function snapshot(s){
    const m = s.m, b = s.b, g = s.g, w = s.w;
    return { day: s.day, Y: m.Y, infl: m.infl, core: m.core, unemp: m.unemp, budget: m.budgetDay * DAYS, debt: m.debt, debtRatio: m.debtRatio, approval: m.approval,
      bread: b.price, prod: b.prod, demand: b.demand, short: b.short, grain: g.price, stock: g.stock, reserve: g.reserve, imp: g.imp, exp: g.exp,
      rain: w.rain, crop: w.crop, energy: w.energy, conf: w.conf, C: m.C, I: m.I, G: m.G, NX: m.NX, rate: s.p.rate, realInc: m.realInc, cpi: m.cpi,
      costGrain: b.cost?.grain, costLabor: b.cost?.labor, costEnergy: b.cost?.energy, scarcity: b.cost?.scarcity, harvestF: HARVEST0 * s.prodIdx * (1 + 0.12 * s.infra.irrigation) * w.crop,
      inc: m.inc ? { ...m.inc } : null, iParts: m.iParts ? { ...m.iParts } : null, pi: m.pi ? { ...m.pi } : null, ap: m.ap ? { ...m.ap } : null,
      rev: m.rev ? Object.fromEntries(Object.entries(m.rev).map(([k, v]) => [k, v * DAYS])) : null, spend: m.spendItems ? Object.fromEntries(Object.entries(m.spendItems).map(([k, v]) => [k, v * DAYS])) : null,
      employed: m.employed, LF: m.LF, prodIdx: s.prodIdx, rateEff: m.rateEff, realRate: m.realRate, credit: w.credit, ygap: m.ygap, limit: b.limit, cap: b.cap, sales: b.sales,
      ratio: g.ratio, expect: g.expect, parity: g.parity, X: m.X, M: m.M, pe: s.pe ? { ...s.pe } : null };
  }

  function closeMonth(s){
    const mt = s.mtd, D = date(s.day - 1);
    const z = snapshot(s), a0 = mt.snap0 || z;
    const rep = { a: a0, z, decisions: s.decisions.filter(d => d.day >= s.day - DAYS && d.day < s.day), events: s.events.map(e => ({ k: e.k, ph: phaseOf(e) })), mIndex: D.mIndex, month: D.month, year: D.year, Y: mt.Y, breadAvg: mt.bread / mt.n, breadStart: mt.price0, breadEnd: s.b.price, short: mt.short, demand: mt.demand, sales: mt.sales,
      budget: mt.budget, debt: s.m.debt, debtStart: mt.debt0, harvest: mt.harvest, imp: mt.imp, exp: mt.exp, infl: s.m.infl, unemp: s.m.unemp, unempStart: mt.unemp0, approval: s.m.approval,
      grainStart: mt.grain0, grainEnd: s.g.price, YStart: mt.Y0, YEnd: s.m.Y };
    s.monthly.push(rep);
    s.mtd = blankMtd();
    s.risks = riskForecast(s);
    if (s.risks.drought >= 0.35 && D.month >= 1 && D.month <= 4) pushNews(s, "forecastDrought", { v: s.risks.drought * 100 });
    if (s.risks.energy >= 0.3) pushNews(s, "forecastEnergy", { v: s.risks.energy * 100 });
    s.lastReport = rep;
  }

  function rollEvents(s, D){
    const rnd = s._rng;
    for (const [k, E] of Object.entries(EVENTS)){
      if (s.events.some(e => e.k === k) || s.events.length >= 2) continue;
      if (E.months && !E.months.includes(D.month)) continue;
      if (D.mIndex < 3) continue;                        // spokojny początek kadencji
      const p = clamp(E.base + E.prob(s), 0, 0.5);
      if (rnd() < p){ s.events.push({ k, t: 0, start: s.day }); pushNews(s, k + ":start", { k }); }
    }
  }
  // prognoza ryzyka na 3 miesiące — celowo nieidealna (szum ±)
  function riskForecast(s){
    const D = date(s.day), out = {};
    for (const [k, E] of Object.entries(EVENTS)){
      let pm = 0, P = 1;
      for (let i = 0; i < 3; i++){ const mo = (D.month + i) % 12; if (E.months && !E.months.includes(mo)) continue; pm = clamp(E.base + E.prob(s), 0, 0.5); P *= 1 - pm; }
      const noise = (rng(s.seed + D.mIndex * 101 + k.length)() - 0.5) * 0.12;
      out[k] = s.events.some(e => e.k === k) ? 1 : clamp(1 - P + noise, 0.01, 0.95);
    }
    return out;
  }

  function finishProject(s, k){
    if (k === "piekarnia") s.b.bakeries++;
    if (k === "nawadnianie") s.infra.irrigation = 1;
    if (k === "elektrownia") s.infra.energyEff = 1;
    if (k === "kolej") s.infra.rail = 1;
    if (k === "port") s.infra.port = 1;
    pushNews(s, "built:" + k, { k });
  }
  function startProject(s, k){
    const P = PROJECTS[k];
    if (!P || s.projects.some(pr => pr.k === k)) return false;
    if (date(s.day).mIndex < P.unlock) return false;
    if (k !== "piekarnia" && ((k === "nawadnianie" && s.infra.irrigation >= 1) || (k === "elektrownia" && s.infra.energyEff) || (k === "kolej" && s.infra.rail) || (k === "port" && s.infra.port))) return false;
    s.projects.push({ k, days: 0 });
    s.decisions.push({ day: s.day, k: "build", v: k, before: s.hist.length ? pick(s.hist[s.hist.length - 1]) : null });
    pushNews(s, "start:" + k, { k });
    return true;
  }
  function setPolicy(s, k, v){
    const old = s.p[k]; if (old === v) return;
    s.p[k] = v;
    const last = s.decisions[s.decisions.length - 1];
    if (last && last.k === k && s.day - last.day < 5) last.v = v; else s.decisions.push({ day: s.day, k, from: old, v, before: s.hist.length ? pick(s.hist[s.hist.length - 1]) : null });
  }
  const pick = h => ({ Y: h.Y, infl: h.infl, unemp: h.unemp, bread: h.bread, budget: h.budget, approval: h.approval, realInc: h.realInc, short: h.short, demand: h.demand, disp: h.inc?.disp, I: h.I, grain: h.grain, harvestF: h.harvestF });
  const unlocked = (s, k) => date(s.day).mIndex >= (UNLOCK[k] ?? 0);

  // ------------------------------------------------------------ wiadomości (generowane z danych)
  function pushNews(s, id, data = {}){
    const last = s.news.find(n => n.id === id);
    if (last && s.day - last.day < 45) return;
    s.news.push({ id, day: s.day, ...data });
    if (s.news.length > 120) s.news.shift();
  }
  // Wiadomości tylko o rzeczach ważnych: pogoda i prognozy, wydarzenia, progi, budowy. Zmiany codzienne widać w „Dlaczego?”.
  function checkNews(s, D){
    const H = s.hist, n = H.length; if (n < 8) return;
    const now = H[n - 1], mo = H[Math.max(0, n - 31)], sh = 100 * s.b.short / Math.max(1, s.b.demand);
    if (sh > 5) pushNews(s, s.b.capped ? "queuesCap" : "queues", { v: sh });
    if (now.unemp > 9 && mo.unemp <= 9) pushNews(s, "jobsDown", { v: now.unemp });
    if (now.infl > 5 && mo.infl <= 5) pushNews(s, "inflHigh", { v: now.infl });
    if (now.infl < 0 && mo.infl >= 0) pushNews(s, "inflLow", { v: now.infl });
    if (s.w.rain < 0.8 && D.month >= 2 && D.month <= 7) pushNews(s, "rainLow", { v: s.w.rain });
    if (D.month === 6 && D.day === 2) pushNews(s, "harvestStart", { v: now.harvestF });
    if (D.month === 9 && D.day === 1) pushNews(s, "harvestEnd", { v: s.g.harvested });
    if (s.m.debtRatio > 0.8) pushNews(s, "debt", { v: s.m.debtRatio * 100 });
    for (const ev of s.events){ const ph = phaseOf(ev); if (ph !== ev.ph){ ev.ph = ph;
      if (ev.k === "boom" && ph === "crisis" && s.m.ygap < 1.5) continue;     // bez przegrzania nie ma „szczytu”
      pushNews(s, ev.k + ":" + ph, { k: ev.k }); } }
  }


  // ------------------------------------------------------------ porażka (z ostrzeżeniami)
  function checkDefeat(s){
    const m = s.m, sh = 100 * s.b.short / Math.max(1, s.b.demand);
    const rules = { hyper: m.infl > 25, debt: m.debtRatio > 1.6, jobs: m.unemp > 20, food: sh > 25, approval: m.approval < 12 };
    for (const [k, bad] of Object.entries(rules)){
      s.warn[k] = bad ? (s.warn[k] || 0) + 1 : Math.max(0, (s.warn[k] || 0) - 2);
      if (s.warn[k] === 1) pushNews(s, "warn:" + k, {});
      if (s.warn[k] > 90){ s.over = true; s.lost = k; }
    }
  }

  // ------------------------------------------------------------ wynik kadencji
  function score(s){
    const a = s.start, z = snapshot(s), M = s.monthly;
    const avg = f => M.reduce((x, r) => x + f(r), 0) / Math.max(1, M.length);
    const parts = {
      economy: clamp(50 + 120 * (z.Y / a.Y - 1) + 60 * (z.realInc / a.realInc - 1), 0, 100),
      stability: clamp(100 - 6 * Math.abs(avg(r => r.infl) - 2.5) - 4 * Math.max(0, avg(r => r.unemp) - 5), 0, 100),
      state: clamp(100 - 120 * Math.max(0, z.debtRatio - 0.6), 0, 100),
      society: clamp(z.approval + 20 - 2 * avg(r => 100 * r.short / Math.max(1, r.demand)), 0, 100),
      resilience: clamp(30 + 25 * s.infra.irrigation + 15 * s.infra.energyEff + 10 * s.infra.port + 10 * s.infra.rail + Math.min(20, s.g.reserve / 150), 0, 100),
    };
    const total = Object.values(parts).reduce((x, v) => x + v, 0) / 5;
    return { parts, total, start: a, end: z };
  }

  // prognoza „co jeśli”: kopia stanu bez wydarzeń
  function clone(s){ const c = JSON.parse(JSON.stringify({ ...s, _rng: null })); c._rng = null; return c; }
  function project(s, days, policy){
    const c = clone(s); c.events = []; c.news = []; c.hist = c.hist.slice(-400); c.quiet = true;
    if (policy) Object.assign(c.p, policy);
    const out = [];
    for (let i = 0; i < days && !c.over; i++){ tick(c); if ((i + 1) % 30 === 0) out.push(snapshot(c)); }
    return out;
  }

  const API = { DAYS, YEARS, MONTHS, TOTAL, HARVEST, HARVEST0, PROJECTS, UNLOCK, EVENTS, GROUPS, BAKERY_CAP,
    newGame, tick, snapshot, date, startProject, setPolicy, unlocked, score, project, clone, phaseOf, eventIntensity, riskForecast };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.NovariaSim = API;
})(typeof window !== "undefined" ? window : globalThis);
