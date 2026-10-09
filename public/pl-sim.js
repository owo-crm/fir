// Nieurodzaj — rdzeń symulacji gospodarki Polski (bez DOM; przeglądarka i Node).
// Krok dzienny tick(state, dt) (dt w dniach; prognozy liczą krokiem miesięcznym dt = 30).
// Wszystko deterministyczne dla danego seeda i tej samej sekwencji komend.
// Jednostki makro: mld zł / rok (realnie: w cenach startowych; nominalnie = realnie × poziom cen).
(function (root) {
  "use strict";
  const DATA = typeof module !== "undefined" && module.exports ? require("./pl-simulation-data.js") : root.PL_DATA;
  const SCHEMA = 2, DAYS = 30;   // 2: nowa kalibracja (budżet, rezerwy, banki) — starsze zapisy nie są zgodne
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ema = (old, v, days, dt = 1) => old + (v - old) * Math.min(1, dt / days);
  const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
  function rng(seed){ let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const dayRng = (s, salt = 0) => rng((s.seed * 2654435761 + s.dayIndex * 97 + salt * 7919) >>> 0);
  const MK = Object.keys(DATA.markets), PK = Object.keys(DATA.partners), PROG = Object.keys(DATA.programs), SEC = Object.keys(DATA.sectors);
  const valueOf = (m, qty, price) => qty * price * DATA.markets[m].perUnit / 1e9;  // → mld zł / rok

  // ------------------------------------------------------------ kalendarz
  function date(dayIndex){
    const m0 = DATA.startDate.month + Math.floor(dayIndex / DAYS);
    return { day: dayIndex % DAYS, month: m0 % 12, year: DATA.startDate.year + Math.floor(m0 / 12), monthIndex: Math.floor(dayIndex / DAYS) };
  }

  // ------------------------------------------------------------ programy: inwestycje z opóźnieniem
  // Każdy miesiąc wydatków to „rocznik” (vintage); jego efekt rośnie liniowo od lagStart do lagFull, potem amortyzacja.
  function ramp(age, P){ return age < P.lagStart ? 0 : age >= P.lagFull ? 1 : (age - P.lagStart) / (P.lagFull - P.lagStart); }
  function programStock(pr, P, monthIndex){
    let k = 0;
    for (const [mi, amt] of pr.v){ const age = monthIndex - mi; if (age < 0) continue; k += amt * ramp(age, P) * Math.pow(1 - P.dep, age / 12); }
    return k;
  }
  // Stan „pełnego wdrożenia” przy stałym finansowaniu bazowym — punkt odniesienia indeksu efektu (=1 na starcie).
  function steadyStock(P, perMonth){ let k = 0; for (let age = 0; age < 240; age++) k += perMonth * ramp(age, P) * Math.pow(1 - P.dep, age / 12); return k; }

  // docelowy indeks efektu programu przy OBECNYM finansowaniu (gdy wszystkie roczniki dojrzeją) — do opisu postępu
  function programTarget(s, k){ const P = DATA.programs[k]; return steadyStock(P, s.policy.programs[k] / 12) / s.programs[k].base; }

  // ------------------------------------------------------------ nowa gra
  function newGame(seed = 20260101){
    const D = DATA, M = D.macro;
    const s = {
      schemaVersion: SCHEMA, seed: seed >>> 0, dayIndex: 0,
      policy: { vat: D.budget.taxes.vat, pit: D.budget.taxes.pit, cit: D.budget.taxes.cit, rate: M.policyRate, social: D.budget.spending.social, health: D.budget.spending.health, admin: D.budget.spending.admin,
        programs: Object.fromEntries(PROG.map(k => [k, D.programs[k].base])), reserveTarget: { zboze: 1, gaz: 1, paliwa: 1 }, capBuffer: 1.5 },
      pe: null,
      macro: { Y: M.gdp, Ypot: M.gdp * 1.005, C: M.consumption, I: M.investment, G: M.government, X: 0, M: 0, NX: 0, servicesNet: M.servicesNet,
        priceLevel: 1, cpi: 1, inflation: M.inflation, core: M.inflation, inflE: 3.0, unemployment: M.unemployment, rateEff: M.policyRate, realRate: M.policyRate - 3,
        conf: 1, credit: 1, bankStress: 0.1, debt: M.debt, reserves: M.reserves, revenue: 0, spending: 0, balance: 0, debtRatio: M.debt / M.gdp * 100, prod: 1, growthYoY: 2.8, energyCost: 1, freight: 1 },
      programs: {}, sectors: {}, markets: {}, partners: {},
      contracts: [], offers: [], events: [], innovations: { found: [], active: [], done: [] }, news: [], history: [], monthly: [], decisions: [],
      advisor: { goals: null, reports: [], lastMonthlyReportIndex: -1, conversation: [] },
      tutorial: { complete: false, step: 0, seen: {} }, flags: {}, nextId: 1,
    };
    s.pe = JSON.parse(JSON.stringify(s.policy));
    // programy: 15 lat historii przy finansowaniu bazowym → indeks efektu startuje z 1
    for (const k of PROG){ const P = D.programs[k], pm = P.base / 12; const v = []; for (let mi = -240; mi < 0; mi++) v.push([mi, pm]); s.programs[k] = { v, base: steadyStock(P, pm), eff: 1 }; s.programs[k].eff = programStock(s.programs[k], P, 0) / s.programs[k].base; }
    for (const k of SEC){ const S = D.sectors[k]; s.sectors[k] = { output: 1, capacity: 1.04, utilization: 0.96, productivity: 1, energyInt: S.energyInt, importDep: S.importDep, employment: S.employ, competitiveness: 1, unitCost: 1, reliability: 1 }; }
    for (const m of MK){ const B = D.markets[m], t = D.trade0[m];
      s.markets[m] = { world: B.price, worldBase: B.price, price: B.price, prod: B.prod, demand: B.demand, imp: t.imp, exp: t.exp, stock: B.storable ? B.demand * (B.stockDays / 360) : 0, shortage: 0, impCap: t.imp * 1.6, expCap: t.exp * 1.4, parity: B.price, exportNet: B.price, contractImp: 0, contractExp: 0, priceYoY: 0, prodBase: B.prod, demandBase: B.demand }; }
    for (const p of PK){ s.partners[p] = { relationship: DATA.partners[p].restricted ? 0.25 : 0.65, reliability: 0.95, supply: {}, demand: 1, route: 1 }; }
    s.advisor.goals = { start: 0, list: D.goals.map(g => ({ ...g })) };
    // rozgrzewka: 30 dni bez wydarzeń, żeby przepływy i ceny się ustabilizowały, potem start kalendarza
    s.quiet = true; for (let i = 0; i < 60; i++) tick(s, 1, true); s.quiet = false;
    s.flags.ad0adj += s.macro.AD - DATA.macro.gdp; s.flags.x0 = s.macro.Xr;
    // Rozgrzewka tylko ustala przepływy rynków; stan finansowy wraca do udokumentowanych wartości startowych (DATA.macro).
    Object.assign(s.macro, { Y: DATA.macro.gdp, unemployment: DATA.macro.unemployment, priceLevel: 1, cpi: 1, debt: DATA.macro.debt, reserves: DATA.macro.reserves,
      rateEff: DATA.macro.policyRate, inflE: DATA.macro.inflation, core: DATA.macro.inflation, nominalGDP: DATA.macro.gdp, debtRatio: DATA.macro.debt / DATA.macro.gdp * 100, netDebtRatio: (DATA.macro.debt - DATA.macro.reserves) / DATA.macro.gdp * 100 });
    if (s.macro.pi){ const gapPi = DATA.macro.inflation - (s.macro.pi.expect + s.macro.pi.demand + s.macro.pi.energy + s.macro.pi.food); s.macro.pi.expect += gapPi; s.macro.inflation = DATA.macro.inflation; }
    s.pe = JSON.parse(JSON.stringify(s.policy));
    s.flags.ec0 = s.macro.energyCost; s.flags.food0 = [s.markets.zywnosc.price / s.markets.zywnosc.worldBase, s.markets.zboze.price / s.markets.zboze.worldBase];
    // ponowna kalibracja popytu po przywróceniu stanu startowego (próbny krok na kopii)
    for (let it = 0; it < 3; it++){ const c = JSON.parse(JSON.stringify(s)); tick(c, 1, true); s.flags.ad0adj += c.macro.AD - DATA.macro.gdp; }
    s.flags.gap0 = (DATA.macro.gdp / s.macro.Ypot - 1) * 100; s.macro.slowGap = 0;
    s.dayIndex = 0; s.history = []; s.monthly = []; s.news = []; s.events = []; s.decisions = [];
    s.macro.growthYoY = 2.8; s.start = snapshot(s); s.yearAgo = [];
    pushNews(s, "welcome", {});
    s.advisor.reports.push(buildReport(s)); s.advisor.lastMonthlyReportIndex = 0;
    makeOffers(s, 2);
    return s;
  }

  // ------------------------------------------------------------ jeden dzień (lub krok dt dni)
  function tick(s, dt = 1, warm = false){
    const D = DATA, p = s.policy, pe = s.pe, m = s.macro, Dt = date(s.dayIndex), rnd = dayRng(s, 1);
    const monthStart = Dt.day === 0 || dt >= DAYS;

    // 1) polityka działa z opóźnieniem (ustawa → urzędy → ludzie)
    const LAG = { vat: 30, pit: 30, cit: 60, social: 20, health: 45, admin: 45 };
    for (const [k, lag] of Object.entries(LAG)) pe[k] = ema(pe[k], p[k], lag, dt);
    m.rateEff = ema(m.rateEff, p.rate, 45, dt);

    // 2) programy inwestycyjne: rocznik na początku miesiąca, efekt liczony raz w miesiącu
    if (monthStart && !warm){
      for (const k of PROG){ const P = D.programs[k], pr = s.programs[k];
        const months = dt >= DAYS ? Math.round(dt / DAYS) : 1;
        for (let i = 0; i < months; i++) pr.v.push([Dt.monthIndex + i, p.programs[k] / 12]);
        if (pr.v.length > 240) pr.v.splice(0, pr.v.length - 240);
        pr.eff = programStock(pr, P, Dt.monthIndex + months - 1) / pr.base; }
    }
    const E = k => clamp(s.programs[k].eff, 0.2, 3.5);
    const maint = k => { const P = D.programs[k]; return P.maintenance ? clamp((p.programs[k] - P.maintenance) / P.maintenance, -0.5, 1) : 0; };

    // 3) wydarzenia
    if (!warm && !s.quiet && !s.flags.noEvents && monthStart) rollEvents(s, Dt, rnd);
    const fx = { supply: {}, world: {}, route: {}, demand: {}, domestic: {}, freight: 1, credit: 1, yieldMult: 1 };
    for (const ev of s.events){
      const T = D.events[ev.k], k = intensity(ev), e = T.effects;
      if (e.supply) for (const [pk, o] of Object.entries(e.supply)) for (const [mk, v] of Object.entries(o)) fx.supply[pk + mk] = Math.min(fx.supply[pk + mk] ?? 1, 1 - (1 - v) * k);
      if (e.world) for (const [mk, v] of Object.entries(e.world)) fx.world[mk] = Math.max(fx.world[mk] ?? 1, 1 + (v - 1) * k);
      if (e.route) for (const [pk, v] of Object.entries(e.route)) fx.route[pk] = Math.min(fx.route[pk] ?? 1, 1 - (1 - v) * k);
      if (e.demand) for (const [pk, v] of Object.entries(e.demand)) fx.demand[pk] = Math.min(fx.demand[pk] ?? 1, 1 - (1 - v) * k);
      if (e.domestic) for (const [mk, v] of Object.entries(e.domestic)) fx.domestic[mk] = Math.min(fx.domestic[mk] ?? 1, 1 - (1 - v) * k * (T.gridDependent ? clamp(1.6 - 0.6 * E("siec"), 0.4, 1.3) : 1));
      if (e.freight) fx.freight = Math.max(fx.freight, 1 + (e.freight - 1) * k);
      if (e.credit) fx.credit = Math.min(fx.credit, 1 - (1 - e.credit) * k);
      if (e.domesticYield) fx.yieldMult = Math.min(fx.yieldMult, 1 - (1 - e.domesticYield) * k * clamp(1 - 0.015 * (E("rolnictwo") - 1) * D.programs.rolnictwo.base - innov(s, "droughtResist"), 0.3, 1.3));
      ev.t += dt;
    }
    const ended = s.events.filter(ev => ev.t >= ev.len);
    ended.forEach(ev => { if (!s.quiet) pushNews(s, "event_end", { k: ev.k }); s.flags.lastEvents = (s.flags.lastEvents || []).concat(ev.k).slice(-10); });
    s.events = s.events.filter(ev => ev.t < ev.len);
    for (const pk of PK){ const P = s.partners[pk]; P.route = ema(P.route, fx.route[pk] ?? 1, 5, dt); P.demand = ema(P.demand, fx.demand[pk] ?? 1, 20, dt);
      for (const mk of MK) P.supply[mk] = ema(P.supply[mk] ?? 1, fx.supply[pk + mk] ?? 1, 15, dt); }
    const freightT = fx.freight * (1 - 0.15 * (E("logistyka") - 1)) * (1 - innov(s, "freight"));
    m.freight = ema(m.freight, clamp(freightT, 0.5, 3), 15, dt);
    // 3b) banki: oprocentowanie kredytów, złe kredyty (NPL), kapitał; bufor kapitałowy (decyzja gracza) = bezpieczeństwo kosztem akcji kredytowej
    const B = m.bank = m.bank || { npl: 4, capital: 17, loans: 1650, loanGrowth: 5, lendRate: 6.6, depositRate: 3 };
    const buf = p.capBuffer ?? 1.5;
    B.lendRate = m.rateEff + 1.9 + 3 * m.bankStress + 0.3 * (buf - 1.5);
    B.depositRate = Math.max(0, m.rateEff - 1.1);
    B.npl = ema(B.npl, clamp(4 + 0.5 * (m.unemployment - DATA.macro.unemployment) + 0.25 * Math.max(0, B.lendRate - 6.6) + 8 * (1 - fx.credit) - 1.0 * Math.min(0, (m.gap ?? 0) - (s.flags.gap0 ?? 0)), 1.5, 16), 120, dt);
    B.capital = ema(B.capital, clamp(15.5 + buf - 0.5 * (B.npl - 4) - 25 * (1 - fx.credit) + 0.15 * (B.lendRate - B.depositRate - 3.6), 6, 25), 180, dt);
    m.credit = ema(m.credit, fx.credit * clamp(1 - 0.03 * (m.rateEff - 4.25), 0.7, 1.15) * clamp(1 - 0.02 * (buf - 1.5) - 0.06 * Math.max(0, 13.5 - B.capital), 0.7, 1.05), 20, dt);
    m.bankStress = ema(m.bankStress, clamp(0.1 + (1 - fx.credit) * 3 + Math.max(0, m.rateEff - 7) * 0.05 + 0.06 * Math.max(0, 14 - B.capital) + 0.01 * Math.max(0, B.npl - 6), 0, 1), 20, dt);

    // 4) wydajność i potencjał: edukacja, R&D, modernizacja, logistyka (wolno)
    // X(k) = dodatkowe „trwałe” finansowanie programu w mld zł/rok (po opóźnieniu). Efekt liczony od kwoty, nie od procentu,
    // żeby +20 mld w małym programie nie działało 5× mocniej niż +20 mld w dużym.
    const XP = k => (E(k) - 1) * D.programs[k].base;
    const growthPot = 0.025 + 0.00011 * XP("edukacja") + 0.00009 * XP("badania") + 0.00008 * XP("przemysl") + 0.00006 * XP("logistyka") + 0.03 * (m.I / (DATA.macro.investment * trendG(s)) - 1);
    m.prod *= 1 + clamp(growthPot, -0.01, 0.04) * dt / 360;
    const prodInnov = innov(s, "productivity_przemysl");
    // strona podażowa: wysokie podatki zniechęcają do pracy i inwestycji, zdrowie wspiera aktywność zawodową (działa powoli, ~2 lata)
    const T0 = DATA.budget.taxes, supT = 1 - 0.004 * (pe.pit - T0.pit) - 0.0025 * (pe.cit - T0.cit) - 0.0015 * (pe.vat - T0.vat) + 0.00012 * (pe.health - DATA.budget.spending.health);
    m.supply = ema(m.supply ?? 1, clamp(supT, 0.85, 1.08), 720, dt);
    m.Ypot = DATA.macro.gdp * 1.01 * m.prod * m.supply * (1 + 0.6 * prodInnov) * (1 - 0.02 * Math.max(0, -maint("logistyka")));

    // 5) energia: produkcja prądu, zapotrzebowanie, gaz do elektrowni
    const mk = s.markets, eff = 1 - 0.05 * (E("efektywnosc") - 1) - innov(s, "energyDemand");
    const indAct = s.sectors.przemysl.output, act = m.Y / DATA.macro.gdp;
    const ozeTWh = 45 * (E("oze") - 1);
    const outage = fx.domestic.prad ?? 1;
    const gridLoss = clamp(0.07 - 0.02 * (E("siec") - 1) + innov(s, "gridLoss"), 0.03, 0.12);
    const elecCap = (mk.prad.prodBase + ozeTWh) * outage * (1.07 - gridLoss);
    const elecDemand = mk.prad.demandBase * (0.5 + 0.5 * indAct) * eff * Math.pow(mk.prad.price / mk.prad.worldBase, -0.08);
    const gasPower = Math.max(5, 32 - ozeTWh * 1.8);   // 1 TWh prądu z gazu ≈ 1,8–2 TWh gazu
    const gasDemand = (mk.gaz.demandBase - 32 + gasPower) * (0.4 + 0.6 * indAct) * eff * Math.pow(mk.gaz.price / mk.gaz.worldBase, -0.1);
    const storage = 1 + 0.5 * (E("magazyny") - 1) + innov(s, "storageBoost");

    // 6) rynki: produkcja, popyt, import/eksport (ograniczone partnerami i trasami), ceny, zapasy
    const yieldMult = fx.yieldMult * (1 + clamp(0.003 * XP("rolnictwo"), -0.1, 0.12));
    const consIdx = m.C / DATA.macro.consumption, invIdx = m.I / DATA.macro.investment;
    let X = 0, Mv = 0, Xr = 0, Mr = 0, tariffRev = 0, importEnergy = 0;
    for (const k of MK){
      const B = DATA.markets[k], q = mk[k], t0 = DATA.trade0[k];
      // cena światowa: błądzenie losowe wokół poziomu bazowego × wydarzenia
      const wT = q.worldBase * (fx.world[k] ?? 1) * (1 + (s.flags.worldDrift?.[k] || 0));
      q.world = ema(q.world, wT * (1 + (rnd() - 0.5) * 0.01), 20, dt);
      // podaż krajowa i popyt
      const priceRel = q.price / q.worldBase;
      if (k === "prad"){ q.prod = Math.min(elecCap, elecDemand * 1.03); q.demand = elecDemand; }
      else if (k === "gaz"){ q.prod = B.prod * (fx.domestic.gaz ?? 1); q.demand = gasDemand; }
      else {
        const secOut = s.sectors[B.sector]?.output ?? 1;
        q.prod = q.prodBase * secOut * (k === "zboze" || k === "zywnosc" ? yieldMult : 1) * Math.pow(priceRel, 0.15) * (fx.domestic[k] ?? 1) * (k === "maszyny" || k === "przemyslowe" ? 1 + 0.5 * prodInnov : 1);
        const drv = k === "maszyny" ? invIdx : k === "konsumpcyjne" || k === "zywnosc" ? consIdx : k === "zboze" ? 0.7 + 0.3 * consIdx : indAct;
        q.demand = q.demandBase * drv * Math.pow(priceRel, k === "zboze" ? -0.25 : -0.3) * (k === "paliwa" ? eff : 1);
      }
      // trasy i partnerzy: ile realnie mogą dostarczyć i kupić
      let capI = 0, capE = 0;
      for (const pk of PK){ const P = DATA.partners[pk], S = s.partners[pk];
        const route = S.route * (P.restricted ? 0.3 : 1) * (1 + 0.25 * (E("logistyka") - 1)) * (1 - 0.15 * Math.max(0, -maint("logistyka")));
        capI += (P.imp[k] || 0) * route * (S.supply[k] ?? 1);
        capE += (P.exp[k] || 0) * route * S.demand; }
      const shareI = Object.values(DATA.partners).reduce((a, P) => a + (P.imp[k] || 0), 0) || 1, shareE = Object.values(DATA.partners).reduce((a, P) => a + (P.exp[k] || 0), 0) || 1;
      q.impCap = (t0.imp * 1.5 + 4) * capI / shareI * trendG(s);
      q.expCap = (t0.exp * 1.5 + 2) * capE / shareE * trendG(s);
      // parytety cen
      const fr = avgFriction(k);
      q.parity = q.world * (1 + fr) + B.transport * m.freight + (k === "gaz" ? 6 * (1 - Math.min(1, capI / shareI)) * q.world / 100 : 0);
      q.exportNet = q.world - B.transport * m.freight;
      // kontrakty (pierwszeństwo)
      let cImp = 0, cExp = 0, cImpVal = 0, cExpVal = 0;
      for (const c of s.contracts){ if (c.status !== "active" || c.market !== k) continue;
        const Sp = s.partners[c.partner], deliverable = c.type === "import" ? Math.min(1, (Sp.supply[k] ?? 1) * Sp.route) : 1;
        c.delivery = deliverable; const vol = c.volume * deliverable;
        if (c.type === "import"){ cImp += vol; cImpVal += valueOf(k, vol, c.price); } else { cExp += vol; cExpVal += valueOf(k, vol, c.price); } }
      q.contractImp = cImp; q.contractExp = cExp;
      // import/eksport rynkowy: handel dwukierunkowy + wyrównanie niedoboru/nadwyżki
      const need = q.demand + cExp - q.prod - cImp;               // ile brakuje (+) lub zbywa (−) po kontraktach
      const refill = B.storable ? (q.demand * (B.stockDays / 360) * storage * (p.reserveTarget[k] ?? 1) - q.stock) / 90 * 360 / 360 : 0;
      const priceImp = clamp(q.price / q.parity, 0.6, 1.6), priceExp = clamp(q.exportNet / q.price, 0.6, 1.6);
      const comp = s.sectors[B.sector]?.competitiveness ?? 1, pd = partnerDemandIndex(s, k);
      const commodity = k === "zboze" || k === "gaz" || k === "paliwa";
      let impT, expT;
      if (commodity){
        // surowce: import pokrywa lukę (+ uzupełnienie zapasu). Handel „w obie strony” tylko dla zboża i zawsze zbilansowany,
        // żeby nadwyżka nie odkładała się w nieskończoność w magazynie.
        const two = k === "zboze" ? t0.imp * 0.6 * priceImp : 0;
        impT = Math.max(0, need + refill) + two;
        expT = Math.max(0, -(need + refill)) * 0.9 * priceExp + two + t0.exp * 0.05;
      } else if (k === "prad"){
        impT = Math.max(0, need) + t0.imp * 0.6 * priceImp; expT = Math.max(0, -need) * 0.8 + t0.exp * 0.5 * priceExp;
      } else {
        // handel wewnątrzgałęziowy: eksport zależy od popytu partnerów i konkurencyjności, import od popytu krajowego i cen
        expT = t0.exp * pd * comp * Math.sqrt(priceExp) * trendG(s);
        impT = t0.imp * (q.demand / q.demandBase) * Math.sqrt(priceImp) + Math.max(0, need - (t0.imp - t0.exp)) * 0.5;
      }
      impT = clamp(impT, 0, Math.max(0, q.impCap - cImp));
      expT = clamp(expT, 0, Math.max(0, q.expCap - cExp));
      q.imp = Math.min(ema(q.imp, impT + cImp, 12, dt), q.impCap + cImp); q.exp = Math.min(ema(q.exp, expT + cExp, 15, dt), q.expCap + cExp);   // fizyczny limit tras
      // bilans ilości: zapas (dla magazynowalnych) albo niedobór
      const bal = q.prod + q.imp - q.exp - q.demand;
      if (B.storable){ q.stock = Math.max(0, q.stock + bal * dt / 360); }
      q.shortage = Math.max(0, -bal) / q.demand * (B.storable && q.stock > 0 ? 0 : 1);
      const cover = B.storable ? q.stock / Math.max(1e-6, q.demand * B.stockDays / 360) : 1;
      // cena docelowa: między parytetem importu a ceną eksportu netto, wg pozycji rynku + premia za niedobór
      const net = (q.imp - q.exp) / Math.max(1, q.demand);
      const wImp = clamp(0.5 + net * 2, 0, 1);
      let pT = wImp * q.parity + (1 - wImp) * q.exportNet;
      if (k === "przemyslowe" || k === "maszyny" || k === "konsumpcyjne" || k === "zywnosc") pT *= 1 + s.sectors[B.sector].energyInt * 0.08 * (m.energyCost - 1) + 0.25 * (m.priceLevel - 1);
      if (k === "prad") pT = (0.55 * q.parity + 0.45 * (mk.gaz.price / mk.gaz.worldBase) * q.worldBase) * (1 - 0.4 * clamp(ozeTWh / Math.max(1, elecDemand), 0, 0.6));   // tanie OZE obniżają cenę hurtową
      // magazyny i OZE łagodzą skoki cen energii: część szoku cenowego jest „buforowana”
      if (k === "gaz" || k === "prad"){ const ref = q.worldBase * (1 + fr) + B.transport; if (pT > ref){ const damp = clamp(0.012 * XP("magazyny"), -0.1, 0.45) + (k === "prad" ? clamp(ozeTWh / Math.max(1, elecDemand), 0, 0.5) : 0); pT = ref + (pT - ref) * (1 - clamp(damp, -0.1, 0.7)); } }
      pT *= 1 + 2.5 * Math.max(0, q.shortage) + (B.storable ? 0.25 * clamp(1 - cover, 0, 1) : 0);
      q.price = clamp(ema(q.price, pT, k === "prad" || k === "gaz" ? 20 : 35, dt), q.price * (1 - 0.02 * dt), q.price * (1 + 0.025 * dt));
      // wartości (mld zł / rok); cło tylko spoza UE (abstrakcyjne „tarcie”)
      const impV = valueOf(k, q.imp - cImp, q.price) + cImpVal, expV = valueOf(k, q.exp - cExp, q.price) + cExpVal;
      q.impValue = impV; q.expValue = expV;
      X += expV; Mv += impV; Xr += valueOf(k, q.exp, B.price); Mr += valueOf(k, q.imp, B.price);   // realnie: w cenach startowych
      tariffRev += impV * nonEuShare(k) * 0.04;
      if (k === "gaz" || k === "prad" || k === "paliwa") importEnergy += impV;
    }
    m.X = X; m.M = Mv; m.Xr = Xr; m.Mr = Mr;
    m.energyCost = ema(m.energyCost, (0.45 * mk.prad.price / mk.prad.worldBase + 0.35 * mk.gaz.price / mk.gaz.worldBase + 0.2 * mk.paliwa.price / mk.paliwa.worldBase) * eff, 10, dt);   // koszt energii = ceny × zużycie (efektywność obniża rachunek)
    m.importEnergy = importEnergy;
    m.gasImportShare = 100 * mk.gaz.imp / Math.max(1, mk.gaz.demand);

    // 7) sektory: konkurencyjność z kosztów, wydajności i energii
    for (const k of SEC){ const S = s.sectors[k], B = DATA.sectors[k];
      const energyInt = B.energyInt * (k === "przemysl" ? (1 - clamp(0.003 * XP("przemysl"), -0.2, 0.25)) : 1) * eff;
      S.energyInt = energyInt;
      S.unitCost = 0.7 * m.priceLevel / (m.prod * (k === "przemysl" ? 1 + prodInnov : 1)) + 0.3 * (1 + energyInt * 0.6 * (m.energyCost / (s.flags.ec0 || 1) - 1));   // energia drożeje względem startu → koszt jednostkowy rośnie
      S.competitiveness = clamp(ema(S.competitiveness, Math.pow(1 / S.unitCost, 0.5) * (1 + clamp(0.0015 * XP("przemysl"), -0.1, 0.12)), 90, dt), 0.8, 1.25);
      S.productivity = m.prod * (k === "przemysl" ? 1 + prodInnov : 1);
    }

    // 8) popyt globalny (realnie): C + I + G + NX
    const P0 = DATA.budget, gdp0 = DATA.macro.gdp, trend = m.Ypot / (gdp0 * 1.01);
    const wageInc = 0.62 * m.Y, taxIncome = (pe.pit / P0.taxes.pit) * P0.revenueBase.pit * (m.Y / gdp0) + P0.revenueBase.contributions * (1 - m.unemployment / 100) / (1 - DATA.macro.unemployment / 100) * (m.Y / gdp0);
    const transfers = pe.social * trend + m.unemployment / 100 * DATA.macro.laborForce * 1e6 * 24000 / 1e9;   // zasiłki ~2000 zł/mies.
    const disp = wageInc + 0.18 * m.Y - taxIncome + transfers;
    const vatF = 1 - 0.6 * (pe.vat - P0.taxes.vat) / 100;
    const rateC = 1 - 0.012 * (m.rateEff - DATA.macro.policyRate);
    if (s.flags.disp0 == null) s.flags.disp0 = disp;
    m.disp = disp;
    const C = m.conf * (DATA.macro.consumption * trend * 0.5 + 0.5 * DATA.macro.consumption * disp / s.flags.disp0) * rateC * vatF * (1 - 0.3 * avgShortage(s));
    const iRate = clamp(1 - 0.03 * (m.realRate - (DATA.macro.policyRate - 3)), 0.5, 1.4);
    const citF = 1 - 0.8 * (pe.cit - P0.taxes.cit) / 100;
    const I = DATA.macro.investment * trend * m.conf * m.credit * iRate * citF * (1 + 0.3 * (s.sectors.przemysl.competitiveness - 1));
    const progSpend = sum(p.programs), base = DATA.budget.spending;
    const Greal = (pe.health + pe.admin + progSpend - sum(Object.fromEntries(PROG.map(k => [k, 0])))) / m.priceLevel;
    const G0 = base.health + base.admin + sum(Object.fromEntries(PROG.map(k => [k, DATA.programs[k].base])));
    const G = DATA.macro.government * (Greal * m.priceLevel) / G0 * trend;
    const NX = (Xr - Mr) + m.servicesNet * trend;
    m.C = C; m.I = I; m.G = G; m.NX = NX;
    const AD = C + I + G + NX - (s.flags.ad0adj ?? 0);
    if (s.flags.ad0adj == null) s.flags.ad0adj = AD - gdp0;          // kalibracja: start w równowadze
    const Y = Math.min(AD - 0, m.Ypot * 1.06);
    m.AD = AD;   // (wcześniej korekta była odejmowana dwa razy — kalibracja startu się rozjeżdżała)
    // ceny i płace powoli dopasowują się → popyt wraca w stronę potencjału (≈3 lata); polityka popytowa działa przejściowo
    // Korekta reaguje tylko na TRWAŁĄ lukę (średnia ~1 rok), więc krótki wstrząs nie wywołuje późniejszego „przegrzania”.
    if (!warm && s.flags.gap0 != null){ m.slowGap = ema(m.slowGap ?? 0, m.AD / m.Ypot * 100 - 100 - s.flags.gap0, 365, dt); s.flags.ad0adj += m.slowGap / 100 * m.Ypot * dt / 1440; }
    m.Y = ema(m.Y, Math.min(m.AD, m.Ypot * 1.06), 25, dt);
    m.gap = (m.Y / m.Ypot - 1) * 100;
    void Y;
    // sektory: produkcja za popytem (prosty podział)
    s.sectors.przemysl.output = ema(s.sectors.przemysl.output, (0.6 * m.Y / gdp0 + 0.4 * (Xr / Math.max(1, s.flags.x0 ?? Xr))) * (outage < 0.95 ? 0.97 : 1) * (1 - 0.5 * mk.gaz.shortage), 20, dt);
    if (s.flags.x0 == null) s.flags.x0 = Xr;
    for (const k of ["uslugi", "budownictwo", "transport", "finanse"]) s.sectors[k].output = ema(s.sectors[k].output, m.Y / gdp0 * (k === "budownictwo" ? m.I / DATA.macro.investment : 1), 20, dt);
    s.sectors.rolnictwo.output = ema(s.sectors.rolnictwo.output, yieldMult, 20, dt);
    s.sectors.energia.output = mk.prad.prod / mk.prad.prodBase;
    for (const k of SEC){ const S = s.sectors[k]; S.capacity = (m.Ypot / gdp0) * (k === "energia" ? (mk.prad.prodBase + ozeTWh) / mk.prad.prodBase : 1) * 1.04; S.utilization = clamp(S.output / S.capacity, 0, 1.2); }

    // 9) rynek pracy i ceny
    // prawo Okuna (uproszczone): 1% luki PKB ≈ 0,45 p.p. bezrobocia; wolna reakcja firm
    if (s.flags.gap0 == null) s.flags.gap0 = m.gap;
    m.unemployment = clamp(ema(m.unemployment, DATA.macro.unemployment - 0.45 * (m.gap - s.flags.gap0), 40, dt), 2, 25);
    const f0 = s.flags.food0 || [1, 1], foodPush = 100 * (mk.zywnosc.price / mk.zywnosc.worldBase / f0[0] - 1) * 0.3 + 100 * (mk.zboze.price / mk.zboze.worldBase / f0[1] - 1) * 0.05;   // względem stanu startowego
    const energyPush = 100 * (m.energyCost / (s.flags.ec0 || 1) - 1) * 0.12;
    m.inflE = ema(m.inflE, 0.5 * m.core + 0.5 * 2.5 - 0.2 * (m.rateEff - DATA.macro.policyRate), 150, dt);
    m.core = ema(m.core, m.inflE + 0.5 * (m.gap - s.flags.gap0) + 0.4 * energyPush, 45, dt);
    const yoy = (key) => { const h = s.yearAgo?.[0]; return h ? h[key] : null; };
    const foodYoY = yoy("food") ? (mk.zywnosc.price / yoy("food") - 1) * 100 : foodPush;
    const enYoY = yoy("energy") ? (m.energyCost / yoy("energy") - 1) * 100 : energyPush;
    m.pi = { expect: 0.7 * m.inflE, demand: 0.7 * (m.core - m.inflE), energy: 0.2 * enYoY, food: 0.22 * foodYoY };
    m.inflation = m.pi.expect + m.pi.demand + m.pi.energy + m.pi.food;
    m.priceLevel *= 1 + m.core / 100 * dt / 360;
    m.cpi *= 1 + m.inflation / 100 * dt / 360;
    m.realRate = m.rateEff - m.inflE;
    m.conf = ema(m.conf, clamp(1 - 0.008 * Math.max(0, m.inflation - 5) - 0.004 * Math.max(0, m.unemployment - 7) - 0.008 * s.events.filter(e => phase(e) === "peak").length, 0.85, 1.12), 30, dt);

    // 10) budżet (nominalnie, mld zł / rok) — handel zagraniczny NIE jest częścią budżetu
    const nom = m.Y * m.priceLevel, rb = P0.revenueBase;
    const tx = (k) => Math.pow(pe[k] / P0.taxes[k], pe[k] > P0.taxes[k] ? 0.8 : 1);   // wyższa stawka → więcej unikania, dochód rośnie wolniej niż stawka
    const rev = { vat: rb.vat * tx("vat") * (C / DATA.macro.consumption) * m.priceLevel, pit: rb.pit * tx("pit") * (nom / gdp0), cit: rb.cit * tx("cit") * (nom / gdp0) * (0.6 + 0.4 * m.I / DATA.macro.investment),
      excise: rb.excise * (nom / gdp0) * 0.9 + rb.excise * 0.1, contributions: rb.contributions * (nom / gdp0) * (1 - m.unemployment / 100) / (1 - DATA.macro.unemployment / 100), other: rb.other * (nom / gdp0), tariffs: tariffRev };
    const govRate = m.rateEff * 0.6 + 2.4 + Math.max(0, m.debtRatio - 60) * 0.06;
    // Wydatki w polityce są w cenach i skali gospodarki z 2026 r.: rosną z cenami ORAZ z realnym trendem PKB
    // (tak jak płace w budżetówce i świadczenia). Wcześniej rosły tylko z cenami → udział w PKB malał, a deficyt sam znikał.
    const nomTrend = m.priceLevel * trend;
    const spend = { social: pe.social * nomTrend + m.unemployment / 100 * DATA.macro.laborForce * 1e6 * 24000 / 1e9 * nomTrend, health: pe.health * nomTrend, admin: pe.admin * nomTrend,
      programs: progSpend * nomTrend, innovations: s.innovations.active.reduce((a, x) => a + x.cost / (x.months / 12), 0), interest: m.debt * govRate / 100 };
    rev.reserveIncome = (m.reserves || 0) * Math.max(0, m.rateEff - 0.5) / 100;
    m.rev = rev; m.spend = spend; m.revenue = sum(rev); m.spending = sum(spend); m.balance = m.revenue - m.spending;
    // przepływ gotówki: nadwyżka spłaca dług, a gdy długu brak — trafia do rezerw (Fundusz Rezerwowy); deficyt najpierw zużywa rezerwy
    const cf = m.balance * dt / 360;
    if (cf >= 0){ const pay = Math.min(cf, m.debt); m.debt -= pay; m.reserves = (m.reserves || 0) + cf - pay; }
    else { const use = Math.min(-cf, m.reserves || 0); m.reserves = (m.reserves || 0) - use; m.debt += -cf - use; }
    m.govRate = govRate;
    m.nominalGDP = nom; m.debtRatio = m.debt / nom * 100; m.netDebtRatio = (m.debt - (m.reserves || 0)) / nom * 100;

    // 10a) zatrudnienie w sektorach: produkcja ÷ wydajność, przeskalowane do łącznej liczby pracujących
    { let tot = 0; const raw = {};
      for (const k of SEC){ const S = s.sectors[k], Bs = DATA.sectors[k]; if (!Bs.employ) continue; raw[k] = Bs.employ * S.output / (S.productivity / m.prod * (k === "przemysl" ? 1 + 0.5 * clamp(0.003 * XP("przemysl"), 0, 0.25) : 1)); tot += raw[k]; }
      const empl = DATA.macro.laborForce * (1 - m.unemployment / 100);
      for (const k of Object.keys(raw)){ const S = s.sectors[k]; S.jobs = empl * raw[k] / tot; S.va = DATA.sectors[k].share * m.Y * S.output / Math.max(0.3, s.sectors.uslugi.output); S.prodPerWorker = S.va / Math.max(0.01, S.jobs); } }
    // 10b) społeczeństwo (wskaźniki do odczytu; nie wpływają na resztę modelu)
    if (s.flags.disp0) m.realIncome = m.disp / s.flags.disp0;
    m.employment = DATA.macro.laborForce * (1 - m.unemployment / 100);
    m.mood = ema(m.mood ?? 60, clamp(60 + 150 * ((m.realIncome ?? 1) - 1) - 4 * (m.unemployment - DATA.macro.unemployment) - 3 * Math.max(0, m.inflation - 3) - 120 * avgShortage(s), 5, 95), 30, dt);
    // 10c) dyplomacja: relacje rosną stopniowo po misji / umowie
    for (const d of (s.diplo || [])){ const step = Math.min(dt, d.len - d.t); if (step > 0){ const P = s.partners[d.pk]; P.relationship = clamp(P.relationship + d.gain * step / d.len, 0, 1); if (d.rel) P.reliability = clamp(P.reliability + d.rel * step / d.len, 0, 1); } d.t += dt; }
    if (s.diplo) s.diplo = s.diplo.filter(d => d.t < d.len);

    // 11) innowacje w trakcie wdrażania
    for (const inv of s.innovations.active) inv.t += dt;
    const doneInv = s.innovations.active.filter(x => x.t >= x.months * DAYS);
    doneInv.forEach(x => { s.innovations.done.push(x); if (!s.quiet) pushNews(s, "innovation_done", { id: x.id }); });
    s.innovations.active = s.innovations.active.filter(x => x.t < x.months * DAYS);

    if (warm) return;
    // 12) dzień minął
    s.dayIndex += dt;
    if (!s.quiet){
      s.history.push(snapshot(s)); if (s.history.length > 420) s.history.splice(0, s.history.length - 420);
      checkNews(s);
    }
    if (date(s.dayIndex).day === 0 || dt >= DAYS) closeMonth(s);
  }

  function partnerDemandIndex(s, k){ let a = 0, w = 0; for (const [pk, P] of Object.entries(DATA.partners)){ const sh = P.exp[k] || 0; a += sh * s.partners[pk].demand * Math.min(1, s.partners[pk].route * 1.2); w += sh; } return w ? a / w : 1; }
  function trendG(s){ return s.macro.Ypot / (DATA.macro.gdp * 1.01); }
  function avgFriction(k){ let f = 0, w = 0; for (const [pk, P] of Object.entries(DATA.partners)){ const sh = P.imp[k] || 0; f += sh * P.friction; w += sh; } return w ? f / w : 0; }
  function nonEuShare(k){ let n = 0, w = 0; for (const P of Object.values(DATA.partners)){ const sh = P.imp[k] || 0; w += sh; if (!P.eu) n += sh; } return w ? n / w : 0; }
  function avgShortage(s){ let a = 0; for (const k of MK) a += s.markets[k].shortage * DATA.markets[k].pct; return a; }
  function innov(s, key){ let v = 0; for (const x of s.innovations.done){ const I = DATA.innovations.find(i => i.id === x.id); if (!I) continue; const e = I.effect;
    if (key === "productivity_przemysl" && e.productivity?.przemysl) v += e.productivity.przemysl; else if (e[key] != null) v += e[key]; } return v; }

  // ------------------------------------------------------------ wydarzenia: sygnał → stres → szczyt → odbudowa
  function intensity(ev){ const f = ev.t / ev.len; return f < 0.15 ? f / 0.15 * 0.3 : f < 0.35 ? 0.3 + (f - 0.15) / 0.2 * 0.7 : f < 0.7 ? 1 : Math.max(0, 1 - (f - 0.7) / 0.3); }
  function phase(ev){ const f = ev.t / ev.len; return f < 0.15 ? "signal" : f < 0.35 ? "stress" : f < 0.7 ? "peak" : "recovery"; }
  function rollEvents(s, Dt, rnd){
    for (const [k, T] of Object.entries(DATA.events)){
      if (s.events.some(e => e.k === k) || s.events.length >= 3) continue;
      if (T.season){ const [a, b] = T.season, mo = Dt.month; const inS = a <= b ? mo >= a && mo <= b : mo >= a || mo <= b; if (!inS) continue; }
      if (Dt.monthIndex < 2) continue;
      const pr = T.p * (s.flags.lastEvents?.includes(k) ? 0.6 : 1);
      if (rnd() < pr) startEvent(s, k, rnd);
    }
  }
  function startEvent(s, k, rnd = dayRng(s, 9)){
    const T = DATA.events[k]; if (!T || s.events.some(e => e.k === k)) return null;
    const len = Math.round((T.len[0] + rnd() * (T.len[1] - T.len[0])) * DAYS);
    const ev = { id: s.nextId++, k, t: 0, len, start: s.dayIndex, partner: T.partner };
    s.events.push(ev); if (!s.quiet) pushNews(s, "event_signal", { k, eid: ev.id });
    return ev;
  }

  // ------------------------------------------------------------ kontrakty
  function makeOffers(s, n){
    const r = dayRng(s, 3);
    for (let i = 0; i < n; i++){
      const T = DATA.contractTemplates[Math.floor(r() * DATA.contractTemplates.length)];
      if (s.offers.some(o => o.partner === T.partner && o.market === T.market) || s.contracts.some(c => c.status === "active" && c.partner === T.partner && c.market === T.market)) continue;
      const q = s.markets[T.market], vol = +(T.vol[0] + r() * (T.vol[1] - T.vol[0])).toFixed(2), dur = Math.round(T.dur[0] + r() * (T.dur[1] - T.dur[0]));
      if (r() > 0.45 + 0.6 * s.partners[T.partner].relationship - 1.2 * Math.max(0, 0.95 - (s.flags.playerReliability ?? 0.95))) continue;   // słabe relacje lub zła reputacja Polski = mniej ofert
      const prem = T.prem[0] + r() * (T.prem[1] - T.prem[0]) + (T.type === "export" ? 1 : -1) * (s.partners[T.partner].relationship - 0.65) * 0.05;
      const price = +(q.world * (1 + prem)).toFixed(DATA.markets[T.market].price < 10 ? 3 : 0);
      s.offers.push({ id: s.nextId++, partner: T.partner, market: T.market, type: T.type, volume: vol, price, months: dur, guarantee: 0.8, penalty: +(valueOf(T.market, vol, price) * 0.05).toFixed(2), expires: s.dayIndex + 28, rounds: 0, status: "offer" });
      if (!s.quiet){ const o = s.offers[s.offers.length - 1]; pushNews(s, "offer", { id: o.id, p: o.partner, mk: o.market, ty: o.type }); }
    }
  }
  // ocena oferty przed podpisaniem: wpływ na przychód, rynek krajowy, przepustowość
  function assessContract(s, o){
    const q = s.markets[o.market], v = valueOf(o.market, o.volume, o.price), mkt = valueOf(o.market, o.volume, o.type === "import" ? q.parity : q.exportNet);
    const shareOfMarket = o.volume / Math.max(1e-6, q.demand) * 100;
    return { valuePerYear: v, vsMarket: o.type === "import" ? mkt - v : v - mkt, shareOfMarket, capacityLeft: o.type === "import" ? q.impCap - q.contractImp : q.expCap - q.contractExp,
      domesticEffect: o.type === "export" ? (q.prod + q.imp - q.demand - q.contractExp < o.volume ? "tight" : "ok") : "hedge", partnerRisk: 1 - s.partners[o.partner].reliability + (DATA.partners[o.partner].restricted ? 0.3 : 0) };
  }
  function acceptOffer(s, id){
    const o = s.offers.find(x => x.id === id); if (!o) return null;
    s.offers = s.offers.filter(x => x.id !== id);
    const c = { ...o, status: "active", start: s.dayIndex, end: s.dayIndex + o.months * DAYS, delivered: 0, shortfalls: 0, delivery: 1 };
    s.contracts.push(c); s.partners[o.partner].relationship = clamp(s.partners[o.partner].relationship + 0.03, 0, 1);
    s.decisions.push({ day: s.dayIndex, k: "contract", v: id }); if (!s.quiet) pushNews(s, "contract_signed", { id: c.id });
    return c;
  }
  function rejectOffer(s, id){ const o = s.offers.find(x => x.id === id); if (!o) return; s.offers = s.offers.filter(x => x.id !== id); s.partners[o.partner].relationship = clamp(s.partners[o.partner].relationship - 0.005, 0, 1); }
  // negocjacje: partner przyjmuje, kontruje albo odrzuca — deterministycznie
  function negotiate(s, id, ask){
    const o = s.offers.find(x => x.id === id); if (!o) return { result: "gone" };
    const P = s.partners[o.partner], q = s.markets[o.market];
    const want = { price: ask.price ?? o.price, volume: ask.volume ?? o.volume, months: ask.months ?? o.months, guarantee: ask.guarantee ?? o.guarantee };
    const ref = q.world;
    // „ustępstwo”, o które prosimy partnera (dodatnie = gorzej dla partnera)
    const priceGain = (o.type === "export" ? (want.price - o.price) : (o.price - want.price)) / ref;
    const volGain = (o.type === "import" ? want.volume - o.volume : o.volume - want.volume) / o.volume * 0.3;
    const guarGain = (o.type === "import" ? want.guarantee - o.guarantee : o.guarantee - want.guarantee) * 0.3;
    const ask_ = Math.max(0, priceGain) + Math.max(0, volGain) + Math.max(0, guarGain) + Math.abs(want.months - o.months) / o.months * 0.05;
    const room = 0.02 + 0.08 * P.relationship + 0.04 * (P.reliability - 0.8) + 0.1 * ((s.flags.playerReliability ?? 0.95) - 0.95) - o.rounds * 0.02;
    o.rounds++;
    if (ask_ <= room){ Object.assign(o, want); o.penalty = +(valueOf(o.market, o.volume, o.price) * 0.05).toFixed(2); return { result: "accepted", offer: o }; }
    if (ask_ <= room * 2.5 && o.rounds < 3){ const f = room / ask_; o.price = +(o.price + (want.price - o.price) * f * 0.8).toFixed(o.price < 10 ? 3 : 0); o.volume = +(o.volume + (want.volume - o.volume) * f).toFixed(2); o.months = Math.round(o.months + (want.months - o.months) * f); return { result: "counter", offer: o }; }
    if (o.rounds >= 3){ s.offers = s.offers.filter(x => x.id !== id); P.relationship = clamp(P.relationship - 0.01, 0, 1); return { result: "rejected" }; }
    return { result: "counter", offer: o };
  }
  // zerwanie umowy przez gracza → kara + spadek wiarygodności i relacji
  function cancelContract(s, id){
    const c = s.contracts.find(x => x.id === id && x.status === "active"); if (!c) return null;
    c.status = "broken"; c.end = s.dayIndex; oneOff(s, cancelPenalty(c), "penalty");
    s.flags.playerReliability = clamp((s.flags.playerReliability ?? 0.95) - 0.08, 0, 1);
    s.partners[c.partner].relationship = clamp(s.partners[c.partner].relationship - 0.12, 0, 1);
    s.decisions.push({ day: s.dayIndex, k: "cancel", v: id }); pushNews(s, "contract_broken", { id });
    return c;
  }
  // jednorazowe koszty (kary, pomoc, dyplomacja): od razu w długu/rezerwach, sumowane w roku budżetowym
  function oneOff(s, amt, kind){
    const m = s.macro, use = Math.min(amt, m.reserves || 0);
    m.reserves = (m.reserves || 0) - use; m.debt += amt - use;
    const y = date(s.dayIndex).year; if (s.flags.oneOffYear !== y){ s.flags.oneOffYear = y; s.flags.oneOff = {}; }
    s.flags.oneOff[kind] = (s.flags.oneOff[kind] || 0) + amt;
  }
  const cancelPenalty = c => +(valueOf(c.market, c.volume, c.price) * 0.25).toFixed(2);   // zerwanie: 25% rocznej wartości
  function settleContracts(s){
    for (const c of s.contracts){ if (c.status !== "active") continue;
      const q = s.markets[c.market];
      if (c.type === "export"){ const avail = (q.prod + q.imp - q.demand) / Math.max(1e-6, q.contractExp); c.delivery = clamp(avail, 0, 1); }
      c.delivered += c.volume / 12 * c.delivery;
      if (c.delivery < c.guarantee){ c.shortfalls++;
        const forceMajeure = c.type === "import" ? (s.partners[c.partner].supply[c.market] ?? 1) < 0.95 || s.partners[c.partner].route < 0.95 : s.events.length > 0;
        if (c.type === "import"){ s.partners[c.partner].reliability = clamp(s.partners[c.partner].reliability - (forceMajeure ? 0.01 : 0.05), 0.3, 1); if (!forceMajeure) oneOff(s, -c.penalty, "compensation"); /* partner płaci nam karę */ if (!s.quiet) pushNews(s, "contract_shortfall", { id: c.id, fm: forceMajeure }); }
        else { if (!forceMajeure){ s.flags.playerReliability = clamp((s.flags.playerReliability ?? 0.95) - 0.03, 0, 1); oneOff(s, c.penalty, "penalty"); } if (!s.quiet) pushNews(s, "contract_underdelivery", { id: c.id, fm: forceMajeure }); }
      }
      if (s.dayIndex >= c.end){ c.status = "done"; s.partners[c.partner].relationship = clamp(s.partners[c.partner].relationship + (c.shortfalls ? 0 : 0.04), 0, 1); if (!s.quiet) pushNews(s, "contract_done", { id: c.id }); }
    }
    s.offers = s.offers.filter(o => o.expires > s.dayIndex);
  }

  // ------------------------------------------------------------ dyplomacja (bez wojen): misja handlowa / umowa ułatwiająca handel
  const DIPLO = { mission: { cost: 0.5, gain: 0.08, rel: 0, len: 180 }, agreement: { cost: 3, gain: 0.15, rel: 0.04, len: 360 } };
  function diplomacy(s, pk, kind){
    const K = DIPLO[kind], P = DATA.partners[pk];
    if (!K || !P) return { ok: false, reason: "unknown" };
    if (P.restricted) return { ok: false, reason: "sanctions" };
    s.diplo = s.diplo || [];
    if (s.diplo.some(d => d.pk === pk)) return { ok: false, reason: "busy" };
    s.diplo.push({ pk, kind, t: 0, len: K.len, gain: K.gain, rel: K.rel });
    oneOff(s, K.cost, "diplomacy");     // jednorazowy koszt (finansowany długiem)
    s.decisions.push({ day: s.dayIndex, k: "diplomacy", v: pk + ":" + kind }); if (!s.quiet) pushNews(s, "diplomacy", { pk, kind });
    return { ok: true };
  }

  // ------------------------------------------------------------ prośba partnera o pomoc (bez wojen): wybór z realnymi kosztami
  const AID = { help: { cost: 1.5, rel: 0.12, shorten: 0.25 }, sell: { rel: 0.05, months: 3, share: 0.08, prem: 0.1 }, decline: { rel: -0.06 }, timeout: { rel: -0.03 } };
  function maybeAid(s, ev){
    const T = DATA.events[ev.k]; if (!T.aid || s.aid || !s.partners[T.partner] || DATA.partners[T.partner].restricted) return;
    const q = s.markets[T.aid], vol = +(q.prod * AID.sell.share).toFixed(2);
    s.aid = { id: s.nextId++, eid: ev.id, k: ev.k, partner: T.partner, market: T.aid, volume: vol, price: +(q.world * (1 + AID.sell.prem)).toFixed(q.world < 10 ? 3 : 0), created: s.dayIndex, deadline: s.dayIndex + 30 };
    pushNews(s, "aid_request", { pk: T.partner, mk: T.aid });
  }
  function respondAid(s, choice){
    const a = s.aid; if (!a) return null; const P = s.partners[a.partner], O = AID[choice]; if (!O) return null;
    const gain = O.rel; s.diplo = s.diplo || [];
    if (gain > 0) s.diplo.push({ pk: a.partner, kind: "aid", t: 0, len: 90, gain, rel: 0.02 }); else P.relationship = clamp(P.relationship + gain, 0, 1);
    if (choice === "help"){ oneOff(s, O.cost, "aid"); const ev = s.events.find(e => e.id === a.eid); if (ev) ev.len = Math.max(ev.t + 30, Math.round(ev.len * (1 - O.shorten))); }
    if (choice === "sell") s.contracts.push({ id: s.nextId++, partner: a.partner, market: a.market, type: "export", volume: a.volume * 12 / O.months / 4, price: a.price, months: O.months, guarantee: 0.5, penalty: 0, status: "active", start: s.dayIndex, end: s.dayIndex + O.months * DAYS, delivered: 0, shortfalls: 0, delivery: 1, aid: true });
    s.decisions.push({ day: s.dayIndex, k: "aid", v: a.partner + ":" + choice }); pushNews(s, "aid_answer", { pk: a.partner, choice });
    s.aid = null; return { ok: true, choice };
  }

  // ------------------------------------------------------------ innowacje (prawdopodobieństwo zależy od R&D i edukacji)
  function innovationChance(s){ const E = k => clamp(s.programs[k].eff, 0.2, 3.5); const X = k => (E(k) - 1) * DATA.programs[k].base; return clamp(0.015 + 0.0011 * X("badania") + 0.0002 * X("edukacja"), 0.003, 0.15); }
  function tryInnovation(s, r){
    if (r() >= innovationChance(s)) return;
    const pool = DATA.innovations.filter(I => !s.innovations.found.includes(I.id)); if (!pool.length) return;
    const I = pool[Math.floor(r() * pool.length)]; s.innovations.found.push(I.id); pushNews(s, "innovation_found", { id: I.id });
  }
  function implementInnovation(s, id){
    const I = DATA.innovations.find(x => x.id === id); if (!I || !s.innovations.found.includes(id) || s.innovations.active.some(x => x.id === id) || s.innovations.done.some(x => x.id === id)) return false;
    s.innovations.active.push({ id, cost: I.cost, months: I.months, t: 0 }); s.decisions.push({ day: s.dayIndex, k: "innovation", v: id }); return true;
  }

  // ------------------------------------------------------------ miesiąc: raport doradcy raz na miesiąc
  function closeMonth(s){
    const mi = date(s.dayIndex).monthIndex;
    // historia „rok temu” także w prognozach (inaczej inflacja w prognozie liczyłaby się inaczej niż w grze)
    s.yearAgo = s.yearAgo || []; s.yearAgo.push({ food: s.markets.zywnosc.price, energy: s.macro.energyCost, Y: s.macro.Y }); if (s.yearAgo.length > 12) s.yearAgo.shift();
    if (s.quiet){ settleContracts(s); return; }
    if (s.advisor.lastMonthlyReportIndex >= mi) return;            // nigdy dwa raporty w tym samym miesiącu
    settleContracts(s);
    const z = snapshot(s);
    const y12 = s.monthly.length >= 12 ? s.monthly[s.monthly.length - 12] : null;
    s.macro.growthYoY = y12 ? (s.macro.Y / y12.Y - 1) * 100 : s.macro.growthYoY;
    s.monthly.push(z); if (s.monthly.length > 600) s.monthly.shift();
    const r = dayRng(s, 5);
    tryInnovation(s, r);
    if (r() < 0.75) makeOffers(s, 1 + (r() < 0.3 ? 1 : 0));
    if (mi - s.advisor.goals.start >= 36) s.advisor.goals.start = mi;     // cele odnawiane co 3 lata
    s.advisor.reports.push(buildReport(s)); if (s.advisor.reports.length > 24) s.advisor.reports.shift();
    s.advisor.lastMonthlyReportIndex = mi;
    s.lastMonthAt = s.dayIndex;
  }

  function snapshot(s){
    const m = s.macro, mk = s.markets;
    return { day: s.dayIndex, Y: m.Y, Ypot: m.Ypot, nominalGDP: m.Y * m.priceLevel, growthYoY: m.growthYoY, inflation: m.inflation, core: m.core, unemployment: m.unemployment, balance: m.balance, debt: m.debt, debtRatio: m.debtRatio,
      X: m.X, M: m.M, tradeBalance: m.X - m.M, freight: m.freight, Ypot: m.Ypot, C: m.C, I: m.I, G: m.G, NX: m.NX, rate: s.policy.rate, rateEff: m.rateEff, energyCost: m.energyCost, gasImportShare: m.gasImportShare, priceLevel: m.priceLevel, cpi: m.cpi,
      gas: mk.gaz.price, power: mk.prad.price, grain: mk.zboze.price, food: mk.zywnosc.price, credit: m.credit, conf: m.conf, revenue: m.revenue, spending: m.spending, prod: m.prod, pi: m.pi ? { ...m.pi } : null,
      rev: m.rev ? { ...m.rev } : null, spend: m.spend ? { ...m.spend } : null, disp: m.disp, gap: m.gap, realIncome: m.realIncome ?? 1, mood: m.mood ?? 60, employment: m.employment, npl: m.bank?.npl, capital: m.bank?.capital, lendRate: m.bank?.lendRate, reserves: m.reserves || 0, gasImp: mk.gaz.imp, gasProdD: mk.gaz.prod,
      mk: Object.fromEntries(MK.map(k => [k, { price: mk[k].price, world: mk[k].world, prod: mk[k].prod, demand: mk[k].demand, imp: mk[k].imp, exp: mk[k].exp, stock: mk[k].stock, shortage: mk[k].shortage, parity: mk[k].parity, impCap: mk[k].impCap, impValue: mk[k].impValue, expValue: mk[k].expValue }])) };
  }

  // ------------------------------------------------------------ prognoza „co jeśli” (kopia stanu, bez losowych wydarzeń, krok miesięczny)
  function clone(s){ return JSON.parse(JSON.stringify(s)); }
  function project(s, months, policyPatch){
    const c = clone(s); c.quiet = true; c.events = c.events.map(e => ({ ...e }));
    if (policyPatch) applyPolicyPatch(c, policyPatch, true);
    const out = [];
    for (let i = 0; i < months; i++){ tick(c, DAYS); out.push({ gasImp: c.markets.gaz.imp, gasDemand: c.markets.gaz.demand, revenue: c.macro.revenue, spending: c.macro.spending, month: i + 1, Y: c.macro.Y, Ypot: c.macro.Ypot, inflation: c.macro.inflation, unemployment: c.macro.unemployment, debtRatio: c.macro.debtRatio, balance: c.macro.balance, gas: c.markets.gaz.price, gasImportShare: c.macro.gasImportShare, tradeBalance: c.macro.X - c.macro.M }); }
    return out;
  }
  function applyPolicyPatch(s, patch, silent){
    for (const [k, v] of Object.entries(patch)){
      if (k === "programs") for (const [pk, pv] of Object.entries(v)) setPolicy(s, "programs." + pk, pv, silent);
      else setPolicy(s, k, v, silent);
    }
  }
  const LIMITS = { capBuffer: [0, 4], vat: [15, 27], pit: [8, 25], cit: [9, 30], rate: [0.25, 12], social: [600, 900], health: [180, 320], admin: [240, 360] };
  function setPolicy(s, key, value, silent){
    let old;
    if (key.startsWith("programs.")){ const k = key.slice(9), P = DATA.programs[k]; if (!P) return; old = s.policy.programs[k]; s.policy.programs[k] = clamp(+value, 0, P.max); }
    else if (key.startsWith("reserve.")){ const k = key.slice(8); old = s.policy.reserveTarget[k]; s.policy.reserveTarget[k] = clamp(+value, 0.3, 2.5); }
    else { if (!(key in LIMITS)) return; old = s.policy[key]; s.policy[key] = clamp(+value, ...LIMITS[key]); }
    if (!silent && old !== value){ const last = s.decisions[s.decisions.length - 1];
      if (last && last.k === key && s.dayIndex - last.day < 3) last.v = value; else s.decisions.push({ day: s.dayIndex, k: key, from: old, v: value }); }
  }
  // koszt alternatywny: co oznacza dodatkowa kwota w innych pozycjach
  function opportunityCost(s, mld){
    const p = s.policy.programs;
    return { education: mld / p.edukacja * 100, research: mld / Math.max(1, p.badania) * 100, deficitPP: mld / (s.macro.Y * s.macro.priceLevel) * 100 };
  }

  // ------------------------------------------------------------ cele i raport doradcy
  function goalStatus(s){
    const g = s.advisor.goals, since = s.monthly.slice(g.start), m = s.macro;
    const growthAvg = since.length >= 12 ? (Math.pow(m.Y / since[0].Y, 12 / since.length) - 1) * 100 : m.growthYoY;
    const val = { inflation: m.inflation, growthAvg, debtRatio: m.debtRatio, gasImportShare: m.gasImportShare };
    return g.list.map(G => { const v = val[G.metric]; const ok = (G.min == null || v >= G.min) && (G.max == null || v <= G.max); return { ...G, value: v, ok, monthsLeft: 36 - (date(s.dayIndex).monthIndex - g.start) }; });
  }
  function confidence(s, horizon){
    const vol = Math.abs(s.markets.gaz.world / s.markets.gaz.worldBase - 1) + Math.abs(s.markets.paliwa.world / s.markets.paliwa.worldBase - 1);
    const recent = s.decisions.filter(d => s.dayIndex - d.day < 60).length;
    const reasons = [];
    let c = 90 - horizon / 60 * 25;
    if (s.events.length){ c -= 8 * s.events.length; reasons.push("events"); }
    if (vol > 0.15){ c -= 10; reasons.push("prices"); }
    if (recent > 2){ c -= 6; reasons.push("decisions"); }
    if (s.contracts.some(x => x.status === "active" && x.delivery < x.guarantee)){ c -= 5; reasons.push("contracts"); }
    return { value: Math.round(clamp(c, 25, 92)), reasons };
  }
  // ryzyka uszeregowane wg wagi; każde z proponowaną zmianą polityki (gracz potwierdza)
  function risks(s){
    const m = s.macro, p = s.policy, out = [];
    const add = (topic, score, action, data) => out.push({ topic, score, action, data });
    if (m.inflation > 4) add("inflation_high", (m.inflation - 4) * 2, { rate: +(p.rate + Math.min(1.5, (m.inflation - 3.5) * 0.4)).toFixed(2) }, { inflation: m.inflation });
    if (m.inflation < 1.5) add("inflation_low", (1.5 - m.inflation) * 2, { rate: +Math.max(0.5, p.rate - 0.75).toFixed(2) }, { inflation: m.inflation });
    if (m.unemployment > 6.5) add("unemployment", (m.unemployment - 6.5) * 1.5, { rate: +Math.max(0.5, p.rate - 0.5).toFixed(2), programs: { logistyka: Math.min(200, p.programs.logistyka + 15) } }, { u: m.unemployment });
    if (m.debtRatio > 60) add("debt", (m.debtRatio - 60) * 0.25 + (m.balance < 0 ? 1 : 0), { admin: Math.max(240, p.admin - 15), vat: Math.min(25, p.vat + 1) }, { d: m.debtRatio });
    if (m.gasImportShare > 70) add("gas_dependency", (m.gasImportShare - 70) * 0.08 + (s.markets.gaz.price / s.markets.gaz.worldBase - 1) * 4, { programs: { oze: Math.min(60, p.programs.oze + 10), efektywnosc: Math.min(30, p.programs.efektywnosc + 5), magazyny: Math.min(30, p.programs.magazyny + 4) } }, { share: m.gasImportShare });
    if (s.markets.zboze.stock < s.markets.zboze.demand * 0.2 || s.events.some(e => e.k === "ua_drought")) add("food_security", 2.5, { "reserve.zboze": 1.4 }, {});
    if (s.programs.edukacja.eff < 1.02 && s.programs.badania.eff < 1.05) add("productivity", 1.2, { programs: { edukacja: Math.min(230, p.programs.edukacja + 10), badania: Math.min(90, p.programs.badania + 8) } }, {});
    if (p.programs.logistyka < DATA.programs.logistyka.maintenance) add("infrastructure", 2, { programs: { logistyka: DATA.programs.logistyka.maintenance + 10 } }, {});
    if (m.growthYoY < 2 && m.inflation < 4) add("growth", (2 - m.growthYoY) * 1.2, { rate: +Math.max(0.5, p.rate - 0.5).toFixed(2), programs: { przemysl: Math.min(90, p.programs.przemysl + 10) } }, {});
    return out.sort((a, b) => b.score - a.score);
  }
  function buildReport(s){
    const H = [12, 36, 60], base = project(s, 60), rs = risks(s).slice(0, 2);
    const patch = {}; rs.forEach(r => { for (const [k, v] of Object.entries(r.action)){ if (k === "programs") patch.programs = { ...(patch.programs || {}), ...v }; else patch[k] = v; } });
    const alt = Object.keys(patch).length ? project(s, 60, patch) : null;
    const pick = (arr, h) => { const r = arr[h - 1], y0 = s.macro.Y; return { growth: (Math.pow(r.Y / y0, 12 / h) - 1) * 100, inflation: r.inflation, unemployment: r.unemployment, debtRatio: r.debtRatio, gas: r.gas, gasImportShare: r.gasImportShare, Y: r.Y }; };
    const D0 = date(s.dayIndex);
    const prev = s.monthly.length >= 2 ? s.monthly[s.monthly.length - 2] : s.start, now = snapshot(s);
    return { monthIndex: D0.monthIndex, month: D0.month, year: D0.year, base: H.map(h => ({ h, ...pick(base, h) })), alt: alt ? H.map(h => ({ h, ...pick(alt, h) })) : null, patch, risks: rs,
      confidence: H.map(h => ({ h, ...confidence(s, h) })), goals: goalStatus(s), change: { prev, now } };
  }

  // ------------------------------------------------------------ wiadomości (tylko ważne)
  function pushNews(s, id, data = {}){
    const key = id + (data.k || "") + (data.id || "");
    if (s.news.some(n => n.key === key && s.dayIndex - n.day < 60 && !/offer|contract|innovation|diplomacy|aid_/.test(id))) return;
    s.news.push({ ...data, ref: data.id, key, id, day: s.dayIndex }); if (s.news.length > 80) s.news.shift();
  }
  function checkNews(s){
    const H = s.history, n = H.length; if (n < 31) return;
    const now = H[n - 1], mo = H[n - 31], m = s.macro;
    if (now.inflation > 5 && mo.inflation <= 5) pushNews(s, "inflation_high", { v: now.inflation });
    if (now.unemployment > 7 && mo.unemployment <= 7) pushNews(s, "unemployment_high", { v: now.unemployment });
    if (now.gas / mo.gas > 1.12) pushNews(s, "gas_up", { v: (now.gas / mo.gas - 1) * 100 });
    if (now.debtRatio > 60 && mo.debtRatio <= 60) pushNews(s, "debt_60", { v: now.debtRatio });
    for (const k of MK) if (s.markets[k].shortage > 0.03) pushNews(s, "shortage", { k: k, v: s.markets[k].shortage * 100 });
    for (const ev of s.events){ const ph = phase(ev); if (ph !== ev.ph){ ev.ph = ph; if (ph !== "signal") pushNews(s, "event_" + ph, { k: ev.k, eid: ev.id }); if (ph === "stress") maybeAid(s, ev); } }
    if (s.aid && s.dayIndex >= s.aid.deadline) respondAid(s, "timeout");
    void m;
  }

  // ------------------------------------------------------------ zegar: 1× = 12 s na dzień, bez nadrabiania setek dni
  function createClock(opts = {}){
    const daySec = opts.daySec ?? 12, maxCatchUp = opts.maxCatchUp ?? 2;
    const SPEEDS = { 0: 0, 1: 1, 2: 2, 5: 5 };
    let speed = 0, acc = 0;
    return {
      get speed(){ return speed; }, get progress(){ return acc; },
      setSpeed(v){ speed = SPEEDS[v] != null ? v : 0; },
      // zwraca liczbę dni gry do wykonania po upływie realMs; ukryta karta = czas zamrożony
      advance(realMs, visible = true){
        if (!speed || !visible) return 0;
        acc += realMs / 1000 * speed / daySec;
        const n = Math.min(maxCatchUp, Math.floor(acc)); acc -= n; if (acc > 1) acc = 0.99;
        return n;
      },
      msPerDay(){ return speed ? daySec * 1000 / speed : Infinity; },
    };
  }

  // ------------------------------------------------------------ zapis / odczyt
  function serialize(s){ return JSON.stringify(s); }
  function deserialize(json){
    let o; try { o = typeof json === "string" ? JSON.parse(json) : json; } catch (e){ return { ok: false, error: "parse" }; }
    if (!o || typeof o !== "object") return { ok: false, error: "parse" };
    if (o.schemaVersion !== SCHEMA) return { ok: false, error: o.schemaVersion > SCHEMA ? "version" : "old", found: o.schemaVersion };
    return { ok: true, state: o };
  }

  const API = { DATA, SCHEMA, DAYS, MK, PK, PROG, SEC, newGame, tick, date, snapshot, project, setPolicy, applyPolicyPatch, startEvent, phase, intensity,
    makeOffers, acceptOffer, rejectOffer, negotiate, cancelContract, assessContract, implementInnovation, innovationChance, goalStatus, confidence, risks, buildReport,
    createClock, programTarget, diplomacy, DIPLO, respondAid, AID, cancelPenalty, serialize, deserialize, opportunityCost, valueOf, clone, programStock };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.PLSim = API;
})(typeof window !== "undefined" ? window : globalThis);
