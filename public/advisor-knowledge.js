// Nieurodzaj — wiedza doradcy BEZ API: drzewo tematów, słowniki słów kluczowych (PL/RU),
// lokalne rozpoznawanie pytań i odpowiedzi budowane z bieżącego stanu symulacji.
// Nic tu nie „zgaduje”: niska pewność → prośba o doprecyzowanie.
(function (root) {
  "use strict";
  const SIM = typeof module !== "undefined" && module.exports ? require("./pl-sim.js") : root.PLSim;
  const DATA = SIM.DATA;
  const fold = t => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/ё/g, "е");
  const n1 = v => (Math.round(v * 10) / 10).toFixed(1).replace(".", ",");
  const n0 = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const sgn = v => (v > 0 ? "+" : v < 0 ? "−" : "±") + n1(Math.abs(v));

  // ------------------------------------------------------------ drzewo tematów
  // ścieżka = [obszar, temat?, aspekt?]; liść → answerId
  const TREE = {
    MACRO: { pl: "Gospodarka", ru: "Экономика", kids: { GDP: { pl: "PKB i wzrost", ru: "ВВП и рост" }, INFLATION: { pl: "Inflacja", ru: "Инфляция" }, UNEMPLOYMENT: { pl: "Bezrobocie", ru: "Безработица" } } },
    BUDGET: { pl: "Budżet", ru: "Бюджет", kids: { DEFICIT: { pl: "Deficyt", ru: "Дефицит" }, DEBT: { pl: "Dług publiczny", ru: "Госдолг" }, TAX: { pl: "Podatki", ru: "Налоги" } } },
    ENERGY: { pl: "Energia", ru: "Энергия", kids: { GAS: { pl: "Gaz", ru: "Газ" }, POWER: { pl: "Prąd", ru: "Электроэнергия" }, INVEST: { pl: "Inwestycje w energię", ru: "Инвестиции в энергетику" } } },
    TRADE: { pl: "Handel", ru: "Торговля", kids: { BALANCE: { pl: "Saldo handlowe", ru: "Торговый баланс" }, IMPORT: { pl: "Import", ru: "Импорт" }, EXPORT: { pl: "Eksport", ru: "Экспорт" }, CONTRACTS: { pl: "Kontrakty", ru: "Контракты" } } },
    INDUSTRY: { pl: "Przemysł", ru: "Промышленность", kids: { COMPET: { pl: "Konkurencyjność", ru: "Конкурентоспособность" } } },
    AGRI: { pl: "Rolnictwo", ru: "Сельское хозяйство", kids: { GRAIN: { pl: "Zboże i żywność", ru: "Зерно и еда" } } },
    BANKS: { pl: "Banki", ru: "Банки", kids: { RATE: { pl: "Stopy procentowe", ru: "Ставки" }, CREDIT: { pl: "Kredyt", ru: "Кредит" } } },
    EDU: { pl: "Edukacja", ru: "Образование", kids: { HUMAN: { pl: "Kapitał ludzki", ru: "Человеческий капитал" } } },
    RD: { pl: "Nauka i R&D", ru: "Наука и R&D", kids: { INNOV: { pl: "Innowacje", ru: "Инновации" } } },
    INFRA: { pl: "Infrastruktura", ru: "Инфраструктура", kids: { LOGI: { pl: "Transport i porty", ru: "Транспорт и порты" } } },
  };
  const INTENTS = { WHY: ["Dlaczego?", "Почему?"], LEVEL: ["Czy to dużo?", "Это много?"], OPTIONS: ["Co możemy zrobić?", "Что можно сделать?"], IMPACT: ["Jak wpłynie to na gospodarkę?", "Как это повлияет на экономику?"], FORECAST: ["Jaka jest prognoza?", "Какой прогноз?"], INACTION: ["Jaki będzie koszt braku działania?", "Цена бездействия?"] };

  // ------------------------------------------------------------ słowniki (rdzenie słów, bez polskich znaków)
  const KW = {
    area: {
      ENERGY: ["energi", "energet", "энерг", "elektrown"], TRADE: ["handel", "handl", "торгов", "kontrakt", "контракт", "umow", "partner", "партнер"],
      BUDGET: ["budzet", "бюджет", "finanse publ", "deficyt", "дефицит бюдж", "dlug", "долг", "podatk", "налог", "vat", "pit", "cit"],
      MACRO: ["gospodark", "экономик", "pkb", "ввп", "wzrost", "рост", "inflac", "инфляц", "drozej", "дорож", "ceny", "цены", "bezroboc", "безработ", "prac", "работ"],
      INDUSTRY: ["przemysl", "промышл", "fabryk", "завод", "konkurencyj", "конкурент"], AGRI: ["rolnict", "сельск", "zboz", "зерн", "zywnos", "еда", "продовол", "susz", "засух", "plon", "урожа"],
      BANKS: ["bank", "банк", "stop", "ставк", "kredyt", "кредит", "nbp", "rpp", "odset", "процент"], EDU: ["edukac", "образован", "szkol", "школ", "uczel", "вуз", "kwalifik"],
      RD: ["nauk", "наук", "badan", "r&d", "innowac", "инновац", "odkryc", "открыт"], INFRA: ["infrastruk", "инфраструкт", "kolej", "железн", "port", "порт", "drog", "дорог", "logist", "логист", "transport", "транспорт"],
    },
    topic: {
      GAS: ["gaz", "газ", "lng"], POWER: ["prad", "ток", "электроэн", "elektryczn", "mwh"], INFLATION: ["inflac", "инфляц", "drozej", "дорож", "ceny", "цены", "cpi"],
      GDP: ["pkb", "ввп", "wzrost", "рост", "produkcj", "выпуск"], UNEMPLOYMENT: ["bezroboc", "безработ", "prac", "работ", "zatrudn", "занятост"],
      DEBT: ["dlug", "долг"], DEFICIT: ["deficyt", "дефицит бюдж", "saldo budz", "budzet"], TAX: ["podatk", "налог", "vat", "pit", "cit"],
      BALANCE: ["saldo handl", "bilans handl", "торговый баланс", "deficyt handl", "торговый дефицит", "дефицит торг"], IMPORT: ["import", "импорт"], EXPORT: ["eksport", "экспорт"], CONTRACTS: ["kontrakt", "контракт", "umow", "оферт", "ofert"],
      GRAIN: ["zboz", "зерн", "zywnos", "еда", "chleb", "хлеб", "susz", "засух", "plon", "урожа"], RATE: ["stop", "ставк", "odset", "процент", "nbp"], CREDIT: ["kredyt", "кредит", "pozycz", "займ"],
      COMPET: ["konkurencyj", "конкурент", "przemysl", "промышл"], HUMAN: ["edukac", "образован", "kwalifik", "kapital ludz"], INNOV: ["innowac", "инновац", "r&d", "badan", "nauk", "наук", "odkryc"], LOGI: ["kolej", "port", "порт", "drog", "дорог", "logist", "логист", "transport", "транспорт"], INVEST: ["inwest", "инвест", "oze", "atom", "siec", "сеть", "magazyn"],
    },
    intent: {
      WHY: ["dlaczego", "czemu", "skad", "z jakiego powodu", "почему", "отчего", "из-за чего", "why"],
      LEVEL: ["czy to duzo", "duzo", "malo", "wysok", "nisk", "много", "мало", "высок", "низк", "normaln", "норм"],
      OPTIONS: ["co mozemy", "co zrobic", "jak obniz", "jak zmniejsz", "jak popraw", "powinnismy", "czy warto", "zwiekszyc", "zmniejszyc", "что делать", "что можно", "как снизить", "как уменьшить", "стоит ли", "нужно ли", "увеличить", "уменьшить"],
      IMPACT: ["jak wplyn", "wplyw", "skutk", "konsekwenc", "как повлия", "влияни", "последств"],
      FORECAST: ["prognoz", "bedzie", "przyszl", "za rok", "прогноз", "будет", "дальше"],
      INACTION: ["brak dzialan", "nic nie rob", "jesli nic", "бездейств", "если ничего"],
    },
  };
  const TOPIC_AREA = { GAS: "ENERGY", POWER: "ENERGY", INVEST: "ENERGY", INFLATION: "MACRO", GDP: "MACRO", UNEMPLOYMENT: "MACRO", DEBT: "BUDGET", DEFICIT: "BUDGET", TAX: "BUDGET", BALANCE: "TRADE", IMPORT: "TRADE", EXPORT: "TRADE", CONTRACTS: "TRADE", GRAIN: "AGRI", RATE: "BANKS", CREDIT: "BANKS", COMPET: "INDUSTRY", HUMAN: "EDU", INNOV: "RD", LOGI: "INFRA" };

  // ------------------------------------------------------------ rozpoznanie pytania (czysta funkcja)
  function resolveAdvisorQuery(text, state, locale = "pl"){
    const t = " " + fold(text) + " ";
    const hits = (list) => list.filter(w => t.includes(fold(w))).length;
    const score = (dict) => Object.entries(dict).map(([k, ws]) => [k, hits(ws)]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]);
    const topics = score(KW.topic), areas = score(KW.area), intents = score(KW.intent);
    let topic = topics[0]?.[0] || null;
    // przy remisie „gaz + import”: aspekt import/cena opisuje pytanie dokładniej
    const has = k => topics.some(x => x[0] === k);
    let aspect = null;
    if (has("GAS") || has("POWER")){ topic = has("GAS") ? "GAS" : "POWER"; aspect = has("IMPORT") ? "IMPORT" : /cen|drog|tani|цен|дорог|дешев/.test(t) ? "PRICE" : has("INVEST") ? "INVEST" : /zapas|magazyn|запас/.test(t) ? "STOCK" : "PRICE"; }
    else if (has("GRAIN")){ topic = "GRAIN"; aspect = has("IMPORT") ? "IMPORT" : "PRICE"; }
    const area = topic ? TOPIC_AREA[topic] : areas[0]?.[0] || null;
    let intent = intents[0]?.[0] || null;
    if (!intent && /\?/.test(text) && topic) intent = "WHY";
    if (intent === "LEVEL" && /dlaczego|почему|czemu/.test(t)) intent = "WHY";
    // pewność: temat + intencja = wysoka; sam obszar = niska
    let confidence = (topic ? 0.5 : area ? 0.25 : 0) + (intent ? 0.35 : 0) + Math.min(0.15, ((topics[0]?.[1] || 0) - 1) * 0.08);
    if (!topic && !area) confidence = 0;
    const path = [area, topic, aspect, intent].filter(Boolean);
    const answerId = confidence >= 0.6 && topic && intent ? path.join("/") : null;
    const suggestions = suggest(area, topic, locale);
    return { area, topic, aspect, intent, confidence: Math.round(confidence * 100) / 100, answerId, path, suggestions };
  }
  function suggest(area, topic, locale){
    const L = (pl, ru) => locale === "ru" ? ru : pl;
    if (topic === "GAS") return [["ENERGY/GAS/PRICE/WHY", L("Cena gazu", "Цена газа")], ["ENERGY/GAS/IMPORT/OPTIONS", L("Import gazu", "Импорт газа")], ["ENERGY/GAS/STOCK/LEVEL", L("Zapasy gazu", "Запасы газа")], ["ENERGY/INVEST/OPTIONS", L("Bezpieczeństwo energetyczne", "Энергобезопасность")]];
    if (area && TREE[area]) return Object.entries(TREE[area].kids).map(([k, v]) => [`${area}/${k}/WHY`, locale === "ru" ? v.ru : v.pl]);
    return [["MACRO/INFLATION/WHY", L("Inflacja", "Инфляция")], ["MACRO/GDP/WHY", L("Wzrost PKB", "Рост ВВП")], ["TRADE/BALANCE/LEVEL", L("Saldo handlowe", "Торговый баланс")], ["ENERGY/GAS/PRICE/WHY", L("Cena gazu", "Цена газа")]];
  }

  // ------------------------------------------------------------ „Dlaczego?” — kontrakt wyjaśnienia (jeden temat = jedna metryka)
  // Każde wyjaśnienie zwraca: topicId, title, currentValue, unit, valueText, changeValue, changeText, comparisonPeriod, comparisonValue,
  // summary, causes (przyczyny zmiany), noDominant, composition (skład sumy — NIE przyczyna), facts (kontekst), consequences (skutki),
  // causalChain [{from,to,why}], actions [[tekst, cel, kierunek]], uncertainty, relatedTopics.
  // Przyczyna trafia do sekcji „główna” tylko, gdy jej szacowany wpływ przekracza próg (opis kryterium w `criterion`).
  const MARKET_TOPIC = { grain: "zboze", food: "zywnosc", gas: "gaz", power: "prad", fuel: "paliwa", machines: "maszyny", industrial: "przemyslowe", consumer: "konsumpcyjne" };
  const TOPIC_OF_MARKET = Object.fromEntries(Object.entries(MARKET_TOPIC).map(([t, k]) => [k, t]));
  const TOPICS = ["gdp", "inflation", "unemployment", "budget", "debt", "trade", "imports", "exports", ...Object.keys(MARKET_TOPIC)];
  function back(s, months){ const M = s.monthly; return M.length > months ? { z: M[M.length - 1 - months], months } : { z: s.start, months: Math.max(0, Math.round(s.dayIndex / 30)), start: true }; }
  // czynnik: rel = szacowany wpływ na metrykę (w % jej wartości lub w jej jednostkach), basis = skąd wiemy
  const F = (label, value, unit, dir, txt, basis, rel) => ({ label, v: value, value, unit, dir, txt, basis, rel: Math.abs(rel || 0), w: Math.abs(rel || 0) });
  function rankCauses(list, significant, threshold){
    const f = list.filter(x => x.rel > 1e-9).sort((a, b) => b.rel - a.rel);
    const eligible = significant ? f.filter(x => x.rel >= threshold) : [];
    const main = eligible.slice(0, 1), extra = f.filter(x => !main.includes(x)).slice(0, 5);
    return { main, extra, noDominant: !main.length };
  }
  const pct = (x, y) => y ? (x / y - 1) * 100 : 0;
  const sum = a => a.reduce((p, c) => p + c, 0);

  function explain(topicId, s, locale = "pl"){
    const L = (pl, ru) => locale === "ru" ? ru : pl, li = locale === "ru" ? 1 : 0, m = s.macro, z = SIM.snapshot(s), bk = back(s, 6), a = bk.z;
    const period = bk.start ? (bk.months ? L(`start gry (${bk.months} mies. temu)`, `начало игры (${bk.months} мес. назад)`) : L("start gry", "начало игры")) : L("6 mies. temu", "6 мес. назад");
    const nm = o => o.name[li];
    let r = null;
    const BASIS = { equation: L("wprost z równań modelu", "прямо из уравнений модели"), history: L("porównanie ze stanem sprzed okresu", "сравнение с прошлым состоянием"), heuristic: L("ranking heurystyczny", "эвристический рейтинг") };
    if (MARKET_TOPIC[topicId]) r = explainMarket(topicId, MARKET_TOPIC[topicId]);
    else if (topicId === "gdp") r = explainGdp();
    else if (topicId === "inflation") r = explainInflation();
    else if (topicId === "unemployment") r = explainUnemployment();
    else if (topicId === "budget") r = explainBudget();
    else if (topicId === "debt") r = explainDebt();
    else if (["trade", "imports", "exports"].includes(topicId)) r = explainTrade(topicId);
    if (!r) return null;
    r.topicId = topicId; r.comparisonPeriod = period;
    r.basisText = BASIS;
    r.decisions = s.decisions.filter(d => s.dayIndex - d.day < 180).slice(-3);
    r.delayed = SIM.PROG.filter(k => Math.abs(s.programs[k].eff - 1) > 0.02).map(k => ({ k, name: nm(DATA.programs[k]), eff: s.programs[k].eff }));
    r.uncertainty = (r.uncertainty ? r.uncertainty + " " : "") + L("Model gry jest uproszczony; czynniki są uszeregowane wg szacowanego wpływu w modelu, bez procentowego „udziału” przyczyn.", "Модель игры упрощена; факторы упорядочены по оценке влияния в модели, без процентной «доли» причин.");
    // zgodność wstecz (doradca, starsze widoki)
    r.value = r.valueText; r.change = r.changeValue; r.chain = r.causalChain.map(c => c.to ? c.to : c.from); if (r.causalChain[0]) r.chain.unshift(r.causalChain[0].from);
    r.structure = r.composition ? r.composition.map(c => ({ name: c.name, value: c.value, share: c.share })) : null;
    r.title = r.title; r.exact = !!r.exact;
    return r;

    // ---------------------------------------------------------- rynki (zboże, żywność, gaz, prąd, paliwa, towary przemysłowe)
    function explainMarket(t, k){
      const q = s.markets[k], qa = a.mk[k], B = DATA.markets[k], idx = B.price < 10;
      const unit = idx ? L("indeks ceny (start = 1,00)", "индекс цены (старт = 1,00)") : B.priceUnit;
      const fmtP = v => idx ? (Math.round(v * 100) / 100).toFixed(2).replace(".", ",") : n0(v);
      const pc = pct(q.price, qa.price), worldCh = pct(q.world, qa.world);
      const pos = (imp, exp, dem) => Math.max(0, Math.min(1, 0.5 + (imp - exp) / Math.max(1, dem) * 2));
      const fr = 0.05, spread = (q.parity - q.exportNet) / Math.max(1e-9, q.price) * 100;
      const dPos = (pos(q.imp, q.exp, q.demand) - pos(qa.imp, qa.exp, qa.demand)) * spread;
      const coverD = B.storable ? q.stock / Math.max(1e-9, q.demand) * 360 : null, coverA = B.storable ? qa.stock / Math.max(1e-9, qa.demand) * 360 : null;
      const premium = (st, dem) => B.storable ? 25 * Math.max(0, 1 - st / Math.max(1e-9, dem * B.stockDays / 360)) : 0;
      const dPrem = premium(q.stock, q.demand) - premium(qa.stock, qa.demand), dShort = 250 * (q.shortage - qa.shortage);
      const dFreight = B.transport * ((m.freight || 1) - (a.freight || 1)) / Math.max(1e-9, q.price) * 100;
      const parts = Object.entries(DATA.partners).filter(([, P]) => P.imp[k]);
      const wsum = sum(parts.map(([, P]) => P.imp[k])) || 1, supIdx = sum(parts.map(([pk, P]) => P.imp[k] * (s.partners[pk].supply[k] ?? 1) * s.partners[pk].route)) / wsum;
      const capUse = q.imp / Math.max(1e-9, q.impCap) * 100, impShare = q.imp / Math.max(1e-9, q.demand) * 100;
      const surplus = (q.prod - q.demand) / Math.max(1e-9, q.demand) * 100, surplusA = (qa.prod - qa.demand) / Math.max(1e-9, qa.demand) * 100;
      const up = v => v > 0 ? 1 : v < 0 ? -1 : 0;
      const causes = [
        F(L("Cena na rynku światowym", "Цена на мировом рынке"), worldCh, "%", up(worldCh), worldCh > 1 ? L("Na świecie drożeje — import i eksport wyceniane są wyżej.", "В мире дорожает — импорт и экспорт оцениваются дороже.") : worldCh < -1 ? L("Na świecie tanieje.", "В мире дешевеет.") : L("Cena światowa prawie bez zmian.", "Мировая цена почти не изменилась."), "equation", worldCh),
        F(L("Bilans krajowy: produkcja vs zużycie", "Внутренний баланс: производство vs потребление"), surplus - surplusA, L("p.p. nadwyżki", "п.п. профицита"), up(dPos), surplus >= 0 ? L(`Produkujemy więcej niż zużywamy (nadwyżka ${n1(surplus)}%). Mniejsza nadwyżka zbliża cenę do ceny importu.`, `Производим больше, чем потребляем (профицит ${n1(surplus)}%). Меньший профицит приближает цену к цене импорта.`) : L(`Zużywamy więcej, niż produkujemy (brakuje ${n1(-surplus)}% zużycia — pokrywa to import).`, `Потребляем больше, чем производим (не хватает ${n1(-surplus)}% — покрывает импорт).`), "equation", dPos),
      ];
      if (B.storable) causes.push(F(L("Zapasy", "Запасы"), coverD - coverA, L("dni zużycia", "дней потребления"), up(dPrem), L(`Zapasy starczają na ok. ${n0(coverD)} dni (norma ${n0(B.stockDays * (s.policy.reserveTarget[k] ?? 1))}). ${dPrem > 0.3 ? "Spadek zapasów podnosi premię cenową." : coverD >= B.stockDays * 0.9 ? "Zapasy są wystarczające — nie podnoszą ceny." : "Zapasy poniżej normy dodają niewielką premię."}`, `Запасов хватает примерно на ${n0(coverD)} дней (норма ${n0(B.stockDays * (s.policy.reserveTarget[k] ?? 1))}). ${dPrem > 0.3 ? "Снижение запасов повышает ценовую премию." : coverD >= B.stockDays * 0.9 ? "Запасов достаточно — цену не поднимают." : "Запасы ниже нормы дают небольшую премию."}`), "equation", dPrem));
      if (q.shortage > 0.002 || qa.shortage > 0.002) causes.push(F(L("Niedobór towaru", "Нехватка товара"), q.shortage * 100, L("% popytu", "% спроса"), up(dShort), L("Gdy brakuje towaru, cena rośnie ponad koszt importu.", "Когда товара не хватает, цена растёт выше стоимости импорта."), "equation", dShort));
      if (Math.abs(dFreight) > 0.05) causes.push(F(L("Koszt transportu (fracht)", "Стоимость перевозки (фрахт)"), ((m.freight || 1) - 1) * 100, L("% vs norma", "% к норме"), up(dFreight), L("Droższy transport podnosi koszt sprowadzenia towaru.", "Дорогая перевозка повышает стоимость ввоза."), "equation", dFreight));
      if (supIdx < 0.97) causes.push(F(L("Zakłócenia dostaw od partnerów", "Сбои поставок от партнёров"), (supIdx - 1) * 100, L("% dostępnych dostaw", "% доступных поставок"), 1, L(`Partnerzy mogą dostarczyć mniej (wykorzystanie przepustowości importu: ${n0(capUse)}%). Na cenę działa to głównie wtedy, gdy brakuje towaru lub spadają zapasy.`, `Партнёры могут поставить меньше (загрузка импортных мощностей: ${n0(capUse)}%). На цену это влияет, в основном, когда не хватает товара или падают запасы.`), "heuristic", (1 - supIdx) * (capUse > 85 ? 8 : 2)));
      if (k === "prad"){ const gp = pct(s.markets.gaz.price, a.mk.gaz.price) * 0.45; causes.push(F(L("Cena gazu dla elektrowni", "Цена газа для электростанций"), pct(s.markets.gaz.price, a.mk.gaz.price), "%", up(gp), L("Część prądu powstaje z gazu — droższy gaz podnosi koszt wytwarzania.", "Часть электроэнергии из газа — дорогой газ повышает стоимость генерации."), "equation", gp));
        const out = s.events.find(e => e.k === "grid_failure"); if (out) causes.push(F(L("Awaria elektrowni", "Авария электростанции"), 0, "", 1, L("Mniej mocy w kraju → większy import i wyższa cena.", "Меньше мощности в стране → больше импорта и выше цена."), "heuristic", 3)); }
      if (["maszyny", "przemyslowe", "konsumpcyjne", "zywnosc"].includes(k)){
        const sec = DATA.sectors[B.sector], ec = (x0, x1) => sec.energyInt * 8 * (x1 - x0);
        const dEn = ec(a.energyCost || 1, m.energyCost), dPl = 25 * (m.priceLevel - (a.priceLevel || 1));
        causes.push(F(L("Koszty energii w produkcji", "Затраты на энергию в производстве"), pct(m.energyCost, a.energyCost || 1), "%", up(dEn), L("Droższa energia podnosi koszty producentów.", "Дорогая энергия повышает издержки производителей."), "equation", dEn));
        causes.push(F(L("Ogólny wzrost cen i płac w kraju", "Общий рост цен и зарплат в стране"), pct(m.priceLevel, a.priceLevel || 1), "%", up(dPl), L("Krajowe koszty (płace, usługi) rosną razem z inflacją.", "Внутренние издержки (зарплаты, услуги) растут вместе с инфляцией."), "equation", dPl));
      }
      const significant = Math.abs(pc) >= 1;
      const rk = rankCauses(causes, significant, Math.max(0.5, Math.abs(pc) * 0.25));
      const facts = [[L("Produkcja w kraju", "Производство в стране"), q.prod, B.unit + L("/rok", "/год")], [L("Zużycie w kraju", "Потребление в стране"), q.demand, B.unit + L("/rok", "/год")], [L("Import", "Импорт"), q.imp, B.unit + L("/rok", "/год")], [L("Eksport", "Экспорт"), q.exp, B.unit + L("/rok", "/год")],
        [L("Import jako % zużycia", "Импорт в % потребления"), impShare, "%"], [L("Wykorzystanie przepustowości importu", "Загрузка импортных мощностей"), capUse, "%"], [L("Cena światowa", "Мировая цена"), q.world, idx ? L("indeks", "индекс") : B.priceUnit]];
      if (B.storable) facts.push([L("Zapasy (dni zużycia)", "Запасы (дней потребления)"), coverD, L("dni", "дн.")]);
      const CONS = {
        zboze: [L("Droższe zboże podnosi koszty producentów żywności.", "Дорогое зерно повышает издержки производителей еды."), L("Ceny żywności mogą wzrosnąć (składnik „żywność” w inflacji).", "Цены на еду могут вырасти (компонент «еда» в инфляции)."), L("Rolnicy-eksporterzy zarabiają więcej; kupujący płacą więcej.", "Фермеры-экспортёры зарабатывают больше; покупатели платят больше.")],
        zywnosc: [L("Wyższe ceny żywności bezpośrednio podnoszą inflację (składnik „żywność”).", "Более высокие цены на еду напрямую повышают инфляцию (компонент «еда»)."), L("Spada siła nabywcza gospodarstw domowych.", "Падает покупательная способность домохозяйств.")],
        gaz: [L("Droższy prąd z elektrowni gazowych.", "Дороже электроэнергия газовых станций."), L("Wyższe koszty przemysłu → słabsza konkurencyjność.", "Выше издержки промышленности → слабее конкурентоспособность."), L("Inflacja (składnik „energia”) i większa wartość importu.", "Инфляция (компонент «энергия») и больше стоимость импорта.")],
        prad: [L("Wyższe koszty firm, zwłaszcza energochłonnych.", "Выше издержки фирм, особенно энергоёмких."), L("Inflacja (składnik „energia”).", "Инфляция (компонент «энергия»).")],
        paliwa: [L("Droższy transport i dojazdy.", "Дороже транспорт и поездки."), L("Inflacja (składnik „energia”) i wyższy rachunek za import.", "Инфляция (компонент «энергия») и больше счёт за импорт.")],
      }[k] || [L("Zmienia się wartość eksportu i importu tej grupy towarów.", "Меняется стоимость экспорта и импорта этой группы товаров."), L("Konkurencyjność krajowych producentów wobec zagranicznych.", "Конкурентоспособность отечественных производителей по сравнению с иностранными.")];
      const CH = {
        zboze: [[L("pogoda i zbiory (w kraju i u partnerów)", "погода и урожай (в стране и у партнёров)"), L("podaż zboża", "предложение зерна"), L("mniejsze zbiory = mniej towaru do sprzedania", "меньший урожай = меньше товара")], [L("podaż zboża", "предложение зерна"), L("zapasy i import", "запасы и импорт"), L("brak pokrywa się z zapasów albo z importu (jeśli są wolne trasy)", "нехватку покрывают запасы или импорт (если есть свободные маршруты)")], [L("zapasy i import", "запасы и импорт"), L("cena zboża", "цена зерна"), L("cena rośnie, gdy zapasy maleją lub trzeba sprowadzać drożej", "цена растёт, когда запасы падают или ввоз дороже")], [L("cena zboża", "цена зерна"), L("ceny żywności", "цены на еду"), L("przenosi się na żywność z opóźnieniem, częściowo", "переходит на еду с задержкой, частично")]],
        gaz: [[L("ceny gazu na świecie", "мировые цены на газ"), L("koszt importu", "стоимость импорта"), L("ok. ", "около ") + n0(impShare) + L("% gazu kupujemy za granicą", "% газа покупаем за границей")], [L("koszt importu", "стоимость импорта"), L("cena gazu w kraju", "цена газа в стране"), L("magazyny łagodzą skok cen, gdy są pełne", "хранилища смягчают скачок цен, если заполнены")], [L("cena gazu w kraju", "цена газа в стране"), L("prąd i koszty przemysłu", "электроэнергия и издержки промышленности"), L("zależy od tego, ile prądu powstaje z gazu", "зависит от доли газовой генерации")], [L("koszty firm", "издержки фирм"), L("ceny i produkcja", "цены и производство"), L("część kosztów trafia do cen po kilku miesiącach", "часть издержек переходит в цены через несколько месяцев")]],
        prad: [[L("koszt paliw (gaz) i udział OZE", "стоимость топлива (газ) и доля ВИЭ"), L("koszt wytwarzania prądu", "стоимость генерации"), L("więcej OZE = mniejsza zależność od gazu", "больше ВИЭ = меньше зависимость от газа")], [L("moc w kraju vs zużycie", "мощности vs потребление"), L("import prądu", "импорт электроэнергии"), L("brak mocy pokrywa import, jeśli połączenia nie są pełne", "нехватку покрывает импорт, если перетоки не загружены")], [L("cena prądu", "цена электроэнергии"), L("koszty firm i inflacja", "издержки фирм и инфляция"), L("najmocniej w sektorach energochłonnych", "сильнее всего в энергоёмких секторах")]],
      }[k] || [[L("ceny światowe i koszty", "мировые цены и издержки"), L("cena w kraju", "цена в стране"), L("cena krajowa leży między ceną importu a ceną eksportu", "внутренняя цена между ценой импорта и экспорта")], [L("cena w kraju", "цена в стране"), L("koszty firm i gospodarstw", "издержки фирм и домохозяйств"), L("z opóźnieniem i nie w całości", "с задержкой и не полностью")]];
      const ACT = { zboze: [[L("Rezerwa zboża (bufor na nieurodzaj)", "Резерв зерна (буфер на неурожай)"), "reserve.zboze"], [L("Nawadnianie i odporne uprawy", "Орошение и устойчивые культуры"), "programs.rolnictwo"], [L("Kontrakty importowe ze stałą ceną", "Импортные контракты с фиксированной ценой"), "trade"]],
        zywnosc: [[L("Nawadnianie i odporne uprawy", "Орошение и устойчивые культуры"), "programs.rolnictwo"], [L("Rezerwa zboża", "Резерв зерна"), "reserve.zboze"]],
        gaz: [[L("Magazyny gazu — łagodzą skoki cen", "Хранилища газа — смягчают скачки цен"), "programs.magazyny"], [L("OZE/atom — mniej gazu w elektrowniach", "ВИЭ/АЭС — меньше газа на электростанциях"), "programs.oze"], [L("Efektywność — mniejsze zużycie", "Эффективность — меньше потребление"), "programs.efektywnosc"], [L("Kontrakt importowy ze stałą ceną", "Импортный контракт с фиксированной ценой"), "trade"]],
        prad: [[L("Nowe źródła (OZE, atom)", "Новые источники (ВИЭ, АЭС)"), "programs.oze"], [L("Modernizacja sieci", "Модернизация сети"), "programs.siec"], [L("Efektywność energetyczna", "Энергоэффективность"), "programs.efektywnosc"]],
        paliwa: [[L("Rezerwa paliw", "Резерв топлива"), "reserve.paliwa"], [L("Efektywność energetyczna", "Энергоэффективность"), "programs.efektywnosc"]] }[k] || [[L("Modernizacja przemysłu", "Модернизация промышленности"), "programs.przemysl"], [L("Efektywność energetyczna (niższe koszty)", "Энергоэффективность (ниже издержки)"), "programs.efektywnosc"]];
      const title = { zboze: L("Cena zboża", "Цена зерна"), zywnosc: L("Ceny żywności przetworzonej", "Цены на продукты питания"), gaz: L("Cena gazu", "Цена газа"), prad: L("Cena prądu", "Цена электроэнергии"), paliwa: L("Ceny ropy i paliw", "Цены на нефть и топливо") }[k] || L("Ceny: ", "Цены: ") + nm(B).toLowerCase();
      const dirTxt = pc > 1 ? L(`wzrosła o ${n1(pc)}%`, `выросла на ${n1(pc)}%`) : pc < -1 ? L(`spadła o ${n1(-pc)}%`, `снизилась на ${n1(-pc)}%`) : L("prawie się nie zmieniła", "почти не изменилась");
      return { title, currentValue: q.price, unit, valueText: `${fmtP(q.price)} ${idx ? "" : B.priceUnit}`.trim(), changeValue: pc, changeUnit: "%", comparisonValue: qa.price, comparisonText: fmtP(qa.price),
        summary: (L(`Cena ${dirTxt} w porównaniu z: ${period}. `, `Цена ${dirTxt} по сравнению с: ${period}. `)) + (rk.noDominant ? "" : L(`Najsilniej działa: ${rk.main[0].label.toLowerCase()}.`, `Сильнее всего действует: ${rk.main[0].label.toLowerCase()}.`)) + (k === "gaz" ? L(` Udział importu w zużyciu (${n0(impShare)}%) to inna miara niż wpływ importu na cenę.`, ` Доля импорта в потреблении (${n0(impShare)}%) — не то же самое, что влияние импорта на цену.`) : ""),
        causes, ...rk, criterion: L(`Główna przyczyna: szacowany wpływ ≥ ${n1(Math.max(0.5, Math.abs(pc) * 0.25))}% ceny i zmiana ceny ≥ 1%.`, `Главная причина: оценка влияния ≥ ${n1(Math.max(0.5, Math.abs(pc) * 0.25))}% цены и изменение цены ≥ 1%.`),
        facts, composition: null, consequences: CONS, causalChain: CH.map(([from, to, why]) => ({ from, to, why })), actions: ACT, relatedTopics: { zboze: ["food", "inflation", "imports"], zywnosc: ["grain", "inflation"], gaz: ["power", "inflation", "imports"], prad: ["gas", "inflation"], paliwa: ["inflation", "imports"] }[k] || ["imports", "exports"],
        concept: k === "gaz" || k === "prad" || k === "paliwa" ? "energy" : "supply" };
    }

    // ---------------------------------------------------------- PKB
    function explainGdp(){
      const nom = m.Y * m.priceLevel, comps = [["C", L("Konsumpcja (C)", "Потребление (C)")], ["I", L("Inwestycje (I)", "Инвестиции (I)")], ["G", L("Wydatki państwa (G)", "Госрасходы (G)")], ["NX", L("Eksport netto (NX)", "Чистый экспорт (NX)")]];
      const dY = pct(z.Y, a.Y), causes = comps.map(([k, lab]) => F(lab, z[k] - a[k], L("mld zł/rok", "млрд zł/год"), (z[k] - a[k]) > 0 ? 1 : -1, "", "equation", Math.abs(z[k] - a[k]) / Math.max(1, a.Y) * 100));
      const rk = rankCauses(causes, Math.abs(dY) >= 0.3, Math.max(0.1, Math.abs(dY) * 0.3));
      const months = s.monthly.length, rep = s.advisor.reports[s.advisor.reports.length - 1];
      const avg = months >= 12 ? (Math.pow(m.Y / DATA.macro.gdp, 12 / months) - 1) * 100 : null;
      const facts = [[L("PKB nominalny (w cenach bieżących)", "Номинальный ВВП (в текущих ценах)"), nom, L("mld zł/rok", "млрд zł/год")], [L("PKB realny (w cenach z 2026 r.)", "Реальный ВВП (в ценах 2026 г.)"), m.Y, L("mld zł/rok", "млрд zł/год")],
        [months >= 12 ? L("Wzrost realny, ostatnie 12 mies.", "Реальный рост, последние 12 мес.") : L("Wzrost realny r/r (szacunek startowy — za mało historii)", "Реальный рост г/г (стартовая оценка — мало истории)"), m.growthYoY, "%"]];
      if (avg != null) facts.push([L("Średni wzrost roczny od startu", "Средний годовой рост с начала"), avg, "%"]);
      if (rep) facts.push([L("Prognoza wzrostu, następne 12 mies. (model, bez losowych wydarzeń)", "Прогноз роста, следующие 12 мес. (модель, без случайных событий)"), rep.base[0].growth, "%"]);
      facts.push([L("PKB potencjalny (możliwości gospodarki)", "Потенциальный ВВП (возможности экономики)"), m.Ypot, L("mld zł/rok", "млрд zł/год")], [L("Luka PKB (realny vs potencjalny)", "Разрыв ВВП (реальный vs потенциальный)"), m.gap, "%"]);
      return { title: L("PKB realny", "Реальный ВВП"), currentValue: m.Y, unit: L("mld zł/rok, ceny z 2026 r.", "млрд zł/год, цены 2026 г."), valueText: `${n0(m.Y)} ${L("mld zł", "млрд zł")}`, changeValue: dY, changeUnit: "%", comparisonValue: a.Y, comparisonText: n0(a.Y), exact: true,
        summary: L(`Realny PKB zmienił się o ${n1(dY)}% w porównaniu z: ${period}. Zmianę rozbijamy na składniki popytu (C + I + G + NX) — to rozbicie wynika wprost z modelu; produkcja dopasowuje się do popytu z kilkutygodniowym opóźnieniem.`, `Реальный ВВП изменился на ${n1(dY)}% по сравнению с: ${period}. Изменение раскладывается на компоненты спроса (C + I + G + NX) — это прямо из модели; производство подстраивается под спрос с задержкой в несколько недель.`),
        causes, ...rk, criterion: L("Składnik uznajemy za główny, gdy jego zmiana ≥ 30% zmiany PKB i PKB zmienił się o ≥ 0,3%.", "Компонент главный, если его изменение ≥ 30% изменения ВВП и ВВП изменился на ≥ 0,3%."), facts, composition: comps.map(([k, lab]) => ({ name: lab, value: m[k], share: m[k] / (m.C + m.I + m.G + Math.max(0, m.NX)) * 100 })),
        consequences: [L("Zatrudnienie: wyższa produkcja → firmy zatrudniają (z opóźnieniem).", "Занятость: выше производство → фирмы нанимают (с задержкой)."), L("Budżet: wpływy z podatków rosną razem z PKB.", "Бюджет: налоговые поступления растут вместе с ВВП."), L("Inflacja: gdy PKB przekracza potencjał, rośnie presja cenowa.", "Инфляция: когда ВВП выше потенциала, растёт ценовое давление.")],
        causalChain: [{ from: L("popyt: C + I + G + NX", "спрос: C + I + G + NX"), to: L("produkcja", "производство"), why: L("firmy produkują tyle, ile mogą sprzedać, ale nie więcej niż pozwala potencjał", "фирмы производят столько, сколько могут продать, но не больше потенциала") }, { from: L("produkcja", "производство"), to: L("zatrudnienie i dochody", "занятость и доходы"), why: L("z opóźnieniem kilku miesięcy (prawo Okuna w uproszczeniu)", "с задержкой в несколько месяцев (упрощённый закон Оукена)") }, { from: L("dochody", "доходы"), to: L("konsumpcja", "потребление"), why: L("część dodatkowego dochodu ludzie wydają — to efekt mnożnikowy", "часть дополнительного дохода люди тратят — эффект мультипликатора") }],
        actions: [[L("Inwestycje w wydajność: edukacja, R&D, modernizacja (efekt po latach)", "Инвестиции в производительность: образование, R&D, модернизация (эффект через годы)"), "programs.przemysl"], [L("Niższa stopa procentowa — szybciej, ale ryzyko inflacji", "Ниже ставка — быстрее, но риск инфляции"), "rate"], [L("Wydatki państwa — szybki, ale przejściowy efekt i koszt w długu", "Госрасходы — быстрый, но временный эффект и рост долга"), "budget"]],
        relatedTopics: ["unemployment", "inflation", "budget", "trade"], concept: "gdp" };
    }

    // ---------------------------------------------------------- inflacja
    function explainInflation(){
      const pi = m.pi, pa = a.pi || pi, D_ = [["expect", L("Oczekiwania inflacyjne", "Инфляционные ожидания"), L("Ile wzrostu cen spodziewają się firmy i ludzie — wpisują to w ceny i płace.", "Какого роста цен ждут фирмы и люди — закладывают это в цены и зарплаты.")], ["demand", L("Presja popytu", "Давление спроса"), L("Dodatnia, gdy popyt przekracza możliwości gospodarki (luka PKB > 0); ujemna, gdy popyt jest słaby.", "Положительное, когда спрос выше возможностей экономики; отрицательное, когда спрос слаб.")], ["energy", L("Energia", "Энергия"), L("Zmiana kosztów prądu, gazu i paliw w ciągu roku.", "Изменение стоимости электроэнергии, газа и топлива за год.")], ["food", L("Żywność", "Еда"), L("Zmiana cen żywności w ciągu roku.", "Изменение цен на еду за год.")]];
      const dI = m.inflation - a.inflation;
      const causes = D_.map(([k, lab, def]) => F(lab, pi[k] - pa[k], "p.p.", pi[k] - pa[k], def, "equation", Math.abs(pi[k] - pa[k])));
      const rk = rankCauses(causes, Math.abs(dI) >= 0.3, Math.max(0.15, Math.abs(dI) * 0.3));
      return { title: L("Inflacja (r/r)", "Инфляция (г/г)"), currentValue: m.inflation, unit: "%", valueText: `${n1(m.inflation)}%`, changeValue: dI, changeUnit: "p.p.", comparisonValue: a.inflation, comparisonText: n1(a.inflation) + "%", exact: true,
        summary: L(`Inflacja to tempo wzrostu cen w ciągu roku. W modelu = suma czterech składników (poniżej). Zmiana o ${n1(dI)} p.p. w porównaniu z: ${period}.`, `Инфляция — темп роста цен за год. В модели = сумма четырёх компонентов (ниже). Изменение на ${n1(dI)} п.п. по сравнению с: ${period}.`),
        causes, ...rk, criterion: L("Składnik główny: jego zmiana ≥ 30% zmiany inflacji, a inflacja zmieniła się o ≥ 0,3 p.p.", "Главный компонент: его изменение ≥ 30% изменения инфляции, а инфляция изменилась на ≥ 0,3 п.п."),
        composition: D_.map(([k, lab, def]) => ({ name: lab, value: pi[k], share: null, unit: "p.p.", def })), facts: [[L("Cel gry", "Цель игры"), "2–4", "%"], [L("Stopa procentowa (efektywna)", "Ставка (эффективная)"), m.rateEff, "%"], [L("Luka PKB", "Разрыв ВВП"), m.gap, "%"]],
        consequences: [L("Dochody realne: gdy ceny rosną szybciej niż płace, ludzie mogą kupić mniej.", "Реальные доходы: когда цены растут быстрее зарплат, люди могут купить меньше."), L("Oczekiwania: długo wysoka inflacja „utrwala się” w oczekiwaniach.", "Ожидания: долгая высокая инфляция закрепляется в ожиданиях."), L("Budżet: wpływy nominalne rosną, ale wydatki też.", "Бюджет: номинальные доходы растут, но и расходы тоже.")],
        causalChain: [{ from: L("energia, żywność, popyt, oczekiwania", "энергия, еда, спрос, ожидания"), to: L("koszty i marże firm", "издержки и маржа фирм"), why: L("droższe wejścia lub silny popyt pozwalają podnieść ceny", "дорогие ресурсы или сильный спрос позволяют поднять цены") }, { from: L("koszty firm", "издержки фирм"), to: L("ceny w sklepach", "цены в магазинах"), why: L("przenoszone stopniowo, przez kilka miesięcy", "переносятся постепенно, несколько месяцев") }, { from: L("ceny", "цены"), to: L("oczekiwania", "ожидания"), why: L("ludzie patrzą na niedawną inflację; wyższa stopa NBP pomaga je obniżyć", "люди смотрят на недавнюю инфляцию; выше ставка NBP помогает их снизить") }],
        actions: [[L("Wyższa stopa procentowa — chłodzi popyt i oczekiwania (po kilku miesiącach), kosztem wzrostu", "Выше ставка — охлаждает спрос и ожидания (через несколько месяцев), ценой роста"), "rate"], [L("Mniejszy deficyt — mniej popytu", "Меньше дефицит — меньше спроса"), "budget"], [L("Przy inflacji kosztowej: efektywność energetyczna i magazyny", "При инфляции издержек: энергоэффективность и хранилища"), "programs.efektywnosc"]],
        relatedTopics: ["gas", "food", "gdp"], concept: "inflation",
        uncertainty: L("Rozbicie na 4 składniki to uproszczenie modelu gry, a nie pełny opis inflacji w realnej gospodarce.", "Разложение на 4 компонента — упрощение модели игры, а не полное описание инфляции в реальной экономике.") };
    }

    // ---------------------------------------------------------- bezrobocie
    function explainUnemployment(){
      const g0 = s.flags.gap0 ?? 0, gapDev = m.gap - g0, gapDevA = (a.gap ?? m.gap) - g0, dU = m.unemployment - a.unemployment;
      const causes = [F(L("Luka popytu (PKB vs możliwości)", "Разрыв спроса (ВВП vs возможности)"), gapDev, "p.p.", -(gapDev - gapDevA), gapDev < 0 ? L("Popyt poniżej możliwości — firmy zatrudniają ostrożniej.", "Спрос ниже возможностей — фирмы нанимают осторожнее.") : L("Popyt wysoki — firmy szukają pracowników.", "Спрос высокий — фирмы ищут работников."), "equation", 0.45 * Math.abs(gapDev - gapDevA))];
      if (s.events.length) causes.push(F(L("Wstrząsy u partnerów i w kraju", "Шоки у партнёров и в стране"), s.events.length, "", 1, L("Działają przez spadek zamówień (popytu).", "Действуют через падение заказов (спроса)."), "heuristic", 0.1 * s.events.length));
      const rk = rankCauses(causes, Math.abs(dU) >= 0.2, 0.08);
      return { title: L("Stopa bezrobocia", "Уровень безработицы"), currentValue: m.unemployment, unit: L("% aktywnych zawodowo", "% рабочей силы"), valueText: `${n1(m.unemployment)}%`, changeValue: dU, changeUnit: "p.p.", comparisonValue: a.unemployment, comparisonText: n1(a.unemployment) + "%",
        summary: L(`Bezrobocie zmieniło się o ${n1(dU)} p.p. W modelu reaguje na lukę PKB (popyt vs możliwości gospodarki) z opóźnieniem kilku miesięcy.`, `Безработица изменилась на ${n1(dU)} п.п. В модели она реагирует на разрыв ВВП (спрос vs возможности) с задержкой в несколько месяцев.`),
        causes, ...rk, criterion: L("Główna: wpływ ≥ 0,08 p.p. i zmiana bezrobocia ≥ 0,2 p.p.", "Главная: влияние ≥ 0,08 п.п. и изменение безработицы ≥ 0,2 п.п."), facts: [[L("Pracujący", "Занятые"), m.employment ?? 0, L("mln", "млн")], [L("Luka PKB", "Разрыв ВВП"), m.gap, "%"]], composition: null,
        consequences: [L("Mniej dochodów → niższa konsumpcja i nastroje.", "Меньше доходов → ниже потребление и настроения."), L("Budżet: mniej składek, więcej zasiłków.", "Бюджет: меньше взносов, больше пособий.")],
        causalChain: [{ from: L("popyt", "спрос"), to: L("produkcja", "производство"), why: L("firmy dostosowują produkcję do zamówień", "фирмы подстраивают производство под заказы") }, { from: L("produkcja", "производство"), to: L("zatrudnienie", "занятость"), why: L("z opóźnieniem; firmy nie zwalniają ani nie zatrudniają od razu", "с задержкой; фирмы не увольняют и не нанимают сразу") }],
        actions: [[L("Niższa stopa procentowa (jeśli inflacja pozwala)", "Ниже ставка (если инфляция позволяет)"), "rate"], [L("Programy infrastruktury — praca teraz, przepustowość potem", "Инфраструктурные программы — работа сейчас, пропускная способность потом"), "programs.logistyka"]],
        relatedTopics: ["gdp", "inflation"], concept: "unemployment" };
    }

    // ---------------------------------------------------------- budżet i dług
    function RL(){ return { vat: "VAT", pit: "PIT", cit: "CIT", excise: L("Akcyza", "Акциз"), contributions: L("Składki", "Взносы"), other: L("Inne dochody", "Прочие доходы"), tariffs: L("Cła", "Пошлины"), reserveIncome: L("Odsetki od rezerw", "Доход от резервов"),
      social: L("Świadczenia i zasiłki", "Соцвыплаты и пособия"), health: L("Zdrowie", "Здравоохранение"), admin: L("Administracja", "Администрация"), programs: L("Programy inwestycyjne", "Инвестпрограммы"), innovations: L("Innowacje", "Инновации"), interest: L("Odsetki od długu", "Проценты по долгу") }; }
    function explainBudget(){
      const N = RL(), ra = a.rev || {}, sa = a.spend || {};
      const causes = [...Object.keys(m.rev).map(k => F(N[k] || k, m.rev[k] - (ra[k] ?? m.rev[k]), L("mld zł/rok", "млрд zł/год"), (m.rev[k] - (ra[k] ?? m.rev[k])) > 0 ? 1 : -1, L("dochód", "доход"), "equation", Math.abs(m.rev[k] - (ra[k] ?? m.rev[k])))),
        ...Object.keys(m.spend).map(k => F(N[k] || k, m.spend[k] - (sa[k] ?? m.spend[k]), L("mld zł/rok", "млрд zł/год"), (m.spend[k] - (sa[k] ?? m.spend[k])) > 0 ? -1 : 1, L("wydatek", "расход"), "equation", Math.abs(m.spend[k] - (sa[k] ?? m.spend[k]))))];
      const dB = m.balance - (a.balance ?? m.balance), rk = rankCauses(causes, Math.abs(dB) >= 3, Math.max(2, Math.abs(dB) * 0.3));
      return { title: L("Saldo budżetu (tempo roczne)", "Сальдо бюджета (годовой темп)"), currentValue: m.balance, unit: L("mld zł/rok", "млрд zł/год"), valueText: `${n0(m.balance)} ${L("mld zł/rok", "млрд zł/год")}`, changeValue: dB, changeUnit: L("mld zł", "млрд zł"), comparisonValue: a.balance, comparisonText: n0(a.balance ?? m.balance), exact: true,
        summary: L(`Saldo = dochody − wydatki państwa w tempie rocznym. Zmiana o ${n0(dB)} mld zł w porównaniu z: ${period}. Rozbicie na pozycje wynika wprost z modelu. Wydatki z polityki rosną razem z cenami i realnym trendem gospodarki.`, `Сальдо = доходы − расходы государства в годовом темпе. Изменение на ${n0(dB)} млрд zł по сравнению с: ${period}. Разложение по статьям — прямо из модели. Расходы политики растут вместе с ценами и реальным трендом экономики.`),
        causes, ...rk, criterion: L("Pozycja główna: zmiana ≥ 30% zmiany salda i saldo zmieniło się o ≥ 3 mld zł.", "Главная статья: изменение ≥ 30% изменения сальдо и сальдо изменилось на ≥ 3 млрд zł."),
        composition: [...Object.entries(m.rev).map(([k, v]) => ({ name: L("Dochód: ", "Доход: ") + (N[k] || k), value: v, share: v / m.revenue * 100 })), ...Object.entries(m.spend).map(([k, v]) => ({ name: L("Wydatek: ", "Расход: ") + (N[k] || k), value: v, share: v / m.spending * 100 }))],
        facts: [[L("Dochody", "Доходы"), m.revenue, L("mld zł/rok", "млрд zł/год")], [L("Wydatki", "Расходы"), m.spending, L("mld zł/rok", "млрд zł/год")], [L("Odsetki od długu", "Проценты по долгу"), m.spend.interest, L("mld zł/rok", "млрд zł/год")], [L("Saldo / PKB", "Сальдо / ВВП"), m.balance / m.nominalGDP * 100, "%"], [L("Dług / PKB", "Долг / ВВП"), m.debtRatio, "%"]],
        consequences: [L("Deficyt zwiększa dług; nadwyżka spłaca dług, a gdy długu brak — trafia do rezerw.", "Дефицит увеличивает долг; профицит гасит долг, а когда долга нет — идёт в резервы."), L("Większy dług → wyższe odsetki w przyszłości.", "Больше долг → выше проценты в будущем.")],
        causalChain: [{ from: L("PKB i zatrudnienie", "ВВП и занятость"), to: L("wpływy z podatków", "налоговые поступления"), why: L("podatki liczone są od konsumpcji, płac i zysków", "налоги считаются от потребления, зарплат и прибыли") }, { from: L("decyzje o wydatkach", "решения о расходах"), to: L("wydatki", "расходы"), why: L("działają z opóźnieniem kilku tygodni (ustawa → urzędy)", "действуют с задержкой в несколько недель") }, { from: L("saldo", "сальдо"), to: L("dług i odsetki", "долг и проценты"), why: L("każdy dzień deficytu dopisuje się do długu", "каждый день дефицита добавляется к долгу") }],
        actions: [[L("Podatki (VAT, PIT, CIT)", "Налоги (VAT, PIT, CIT)"), "vat"], [L("Wydatki administracji", "Расходы администрации"), "admin"], [L("Świadczenia i zdrowie", "Соцвыплаты и здравоохранение"), "social"]],
        note: L("Saldo handlowe (eksport − import) nie jest częścią budżetu państwa.", "Торговое сальдо (экспорт − импорт) не входит в госбюджет."), relatedTopics: ["debt", "gdp", "trade"], concept: "budget" };
    }
    function explainDebt(){
      const nom1 = m.nominalGDP || m.Y * m.priceLevel, nom0 = a.nominalGDP || a.Y * (a.priceLevel || 1), d0 = a.debt, d1 = m.debt;
      const total = (d1 / nom1 - d0 / nom0) * 100, flow = (d1 - d0) / nom1 * 100, denom = d0 * (1 / nom1 - 1 / nom0) * 100;
      const causes = [F(L("Nowy dług (deficyty i koszty jednorazowe)", "Новый долг (дефициты и разовые расходы)"), d1 - d0, L("mld zł", "млрд zł"), flow, L("Każdy deficyt dopisuje się do długu.", "Каждый дефицит добавляется к долгу."), "equation", flow), F(L("Wzrost nominalnego PKB (mianownik)", "Рост номинального ВВП (знаменатель)"), pct(nom1, nom0), "%", denom, L("Gdy PKB rośnie (realnie i przez inflację), ten sam dług to mniejszy % PKB.", "Когда ВВП растёт (реально и из-за инфляции), тот же долг — меньший % ВВП."), "equation", denom)];
      const rk = rankCauses(causes, Math.abs(total) >= 0.2, 0.1);
      return { title: L("Dług publiczny / PKB", "Госдолг / ВВП"), currentValue: m.debtRatio, unit: L("% PKB", "% ВВП"), valueText: `${n1(m.debtRatio)}%`, changeValue: total, changeUnit: "p.p.", comparisonValue: a.debtRatio, comparisonText: n1(a.debtRatio) + "%", exact: true,
        summary: L(`Zmiana wskaźnika długu = nowy dług / PKB minus efekt wzrostu PKB. Dlatego deficyt nie przekłada się 1:1 na wskaźnik: przy szybkim wzroście nominalnego PKB wskaźnik może spadać mimo deficytu.`, `Изменение долга к ВВП = новый долг / ВВП минус эффект роста ВВП. Поэтому дефицит не переходит 1:1 в показатель: при быстром росте номинального ВВП показатель может падать даже при дефиците.`),
        causes, ...rk, criterion: L("Rozbicie dokładne (z definicji wskaźnika).", "Точное разложение (по определению показателя)."), composition: null,
        facts: [[L("Dług brutto", "Валовой долг"), m.debt, L("mld zł", "млрд zł")], [L("Rezerwy państwa", "Резервы государства"), m.reserves || 0, L("mld zł", "млрд zł")], [L("Dług netto / PKB", "Чистый долг / ВВП"), m.netDebtRatio ?? m.debtRatio, "%"], [L("Oprocentowanie długu", "Ставка по долгу"), m.govRate ?? 0, "%"], [L("Odsetki", "Проценты"), m.spend.interest, L("mld zł/rok", "млрд zł/год")]],
        consequences: [L("Wyższy dług → wyższe odsetki (mniej pieniędzy na inne cele).", "Выше долг → выше проценты (меньше денег на другое)."), L("Powyżej 60% PKB rynek żąda wyższej premii za ryzyko.", "Выше 60% ВВП рынок требует более высокой премии за риск.")],
        causalChain: [{ from: L("deficyt", "дефицит"), to: L("pożyczki", "заимствования"), why: L("państwo pokrywa brak pieniędzy, sprzedając obligacje", "государство покрывает нехватку, продавая облигации") }, { from: L("dług", "долг"), to: L("odsetki", "проценты"), why: L("zależą od stopy NBP i poziomu długu", "зависят от ставки NBP и уровня долга") }, { from: L("odsetki", "проценты"), to: L("deficyt", "дефицит"), why: L("odsetki to wydatek — mogą napędzać spiralę długu", "проценты — расход, могут раскручивать спираль долга") }],
        actions: [[L("Zmniejszenie deficytu (podatki lub wydatki)", "Снижение дефицита (налоги или расходы)"), "budget"], [L("Inwestycje we wzrost — większy mianownik po latach", "Инвестиции в рост — больше знаменатель через годы"), "programs.przemysl"]], relatedTopics: ["budget", "gdp"], concept: "budget" };
    }

    // ---------------------------------------------------------- handel
    function explainTrade(t){
      const side = t === "exports" ? "exp" : "imp", val = side === "exp" ? "expValue" : "impValue";
      const contrib = side => SIM.MK.map(k => { const q = s.markets[k], qa = a.mk[k], v1 = q[side === "exp" ? "expValue" : "impValue"] || 0, v0 = qa[side === "exp" ? "expValue" : "impValue"] || 0;
        const price = SIM.valueOf(k, qa[side], q.price) - SIM.valueOf(k, qa[side], qa.price); return { k, d: v1 - v0, price, vol: v1 - v0 - price }; });
      const mkF = (c, sign) => F(DATA.markets[c.k].name[li], c.d, L("mld zł/rok", "млрд zł/год"), sign * c.d, `${L("efekt ceny", "эффект цены")} ${c.price >= 0 ? "+" : "−"}${n0(Math.abs(c.price))}, ${L("efekt ilości", "эффект объёма")} ${c.vol >= 0 ? "+" : "−"}${n0(Math.abs(c.vol))}`, "equation", Math.abs(c.d));
      let causes, total, total0, title, comp;
      if (t === "trade"){ const ce = contrib("exp"), ci = contrib("imp"); causes = [...ce.map(c => ({ ...mkF(c, 1), label: L("Eksport: ", "Экспорт: ") + DATA.markets[c.k].name[li] })), ...ci.map(c => ({ ...mkF(c, -1), label: L("Import: ", "Импорт: ") + DATA.markets[c.k].name[li] }))]; total = m.X - m.M; total0 = a.X - a.M; title = L("Saldo handlu towarami", "Сальдо торговли товарами"); comp = null; }
      else { const cs = contrib(side); causes = cs.map(c => mkF(c, 1)); total = side === "exp" ? m.X : m.M; total0 = side === "exp" ? a.X : a.M; title = side === "exp" ? L("Eksport towarów", "Экспорт товаров") : L("Import towarów", "Импорт товаров");
        comp = SIM.MK.map(k => ({ name: DATA.markets[k].name[li], value: s.markets[k][val] || 0, share: (s.markets[k][val] || 0) / Math.max(1, total) * 100 })).sort((x, y) => y.value - x.value); }
      const dT = total - total0, rk = rankCauses(causes, Math.abs(dT) >= Math.max(3, Math.abs(total0) * 0.01), Math.max(2, Math.abs(dT) * 0.25));
      const ev = s.events.filter(e => DATA.events[e.k].effects.supply || DATA.events[e.k].effects.route || DATA.events[e.k].effects.demand).map(e => DATA.events[e.k].name[li]);
      return { title, currentValue: total, unit: L("mld zł/rok", "млрд zł/год"), valueText: `${n0(total)} ${L("mld zł/rok", "млрд zł/год")}`, changeValue: dT, changeUnit: L("mld zł", "млрд zł"), comparisonValue: total0, comparisonText: n0(total0), exact: true,
        summary: (t === "trade" ? L(`Saldo = eksport − import. Zmiana o ${n0(dT)} mld zł w porównaniu z: ${period}. Każdą pozycję dzielimy na efekt ceny i efekt ilości.`, `Сальдо = экспорт − импорт. Изменение на ${n0(dT)} млрд zł по сравнению с: ${period}. Каждую позицию делим на эффект цены и эффект объёма.`) : L(`Zmiana o ${n0(dT)} mld zł w porównaniu z: ${period}. Przyczyny = zmiany poszczególnych grup towarów (efekt ceny + efekt ilości). Skład (poniżej) pokazuje tylko, z czego składa się suma.`, `Изменение на ${n0(dT)} млрд zł по сравнению с: ${period}. Причины = изменения групп товаров (эффект цены + эффект объёма). Состав (ниже) показывает только, из чего складывается сумма.`)) + (ev.length ? L(" Trwające zakłócenia: ", " Идущие сбои: ") + ev.join(", ") + "." : ""),
        causes, ...rk, criterion: L("Grupa główna: zmiana ≥ 25% zmiany sumy.", "Главная группа: изменение ≥ 25% изменения суммы."), composition: comp,
        facts: [[L("Eksport", "Экспорт"), m.X, L("mld zł/rok", "млрд zł/год")], [L("Import", "Импорт"), m.M, L("mld zł/rok", "млрд zł/год")], [L("Saldo", "Сальдо"), m.X - m.M, L("mld zł/rok", "млрд zł/год")], [L("Koszt frachtu (vs norma)", "Фрахт (к норме)"), ((m.freight || 1) - 1) * 100, "%"]],
        consequences: t === "imports" ? [L("Droższy import energii podnosi koszty i inflację.", "Дорогой импорт энергии повышает издержки и инфляцию."), L("Import maszyn może zwiększać przyszłą wydajność.", "Импорт машин может повышать будущую производительность.")] : [L("Eksport netto to część popytu (PKB).", "Чистый экспорт — часть спроса (ВВП)."), L("Saldo handlowe ≠ budżet: nie zmienia długu publicznego wprost.", "Торговое сальдо ≠ бюджет: напрямую не меняет госдолг.")],
        causalChain: [{ from: L("ceny światowe i popyt", "мировые цены и спрос"), to: L("wartość importu i eksportu", "стоимость импорта и экспорта"), why: L("wartość = ilość × cena", "стоимость = объём × цена") }, { from: L("konkurencyjność firm", "конкурентоспособность фирм"), to: L("eksport", "экспорт"), why: L("tańsza i lepsza produkcja wygrywa zamówienia u partnerów", "более дешёвая и качественная продукция выигрывает заказы") }, { from: L("trasy i przepustowość", "маршруты и пропускная способность"), to: L("ilość handlu", "объём торговли"), why: L("przy zakłóceniach handel jest ograniczony fizycznie", "при сбоях торговля ограничена физически") }],
        note: L("Deficyt handlowy nie jest automatycznie zły i nie jest deficytem budżetu ani długiem publicznym.", "Торговый дефицит не обязательно плох и не является дефицитом бюджета или госдолгом."),
        actions: [[L("Kontrakty eksportowe — stały popyt", "Экспортные контракты — стабильный спрос"), "trade"], [L("Modernizacja przemysłu — konkurencyjność", "Модернизация промышленности — конкурентоспособность"), "programs.przemysl"], [L("Efektywność i OZE — mniejszy import energii", "Эффективность и ВИЭ — меньше импорт энергии"), "programs.efektywnosc"]],
        relatedTopics: t === "imports" ? ["gas", "fuel", "trade"] : t === "exports" ? ["trade", "gdp", "industrial"] : ["imports", "exports", "budget"], concept: "trade" };
    }
  }

  // ------------------------------------------------------------ odpowiedź doradcy (struktura, nie wolny tekst)
  const ANSWER_KEY = { GAS: "gas", POWER: "power", INFLATION: "inflation", GDP: "gdp", UNEMPLOYMENT: "unemployment", DEFICIT: "budget", DEBT: "debt", TAX: "budget", BALANCE: "trade", IMPORT: "imports", EXPORT: "exports", GRAIN: "grain", RATE: "inflation", CREDIT: "gdp", COMPET: "exports", HUMAN: "gdp", INNOV: "gdp", LOGI: "gdp", CONTRACTS: "exports", INVEST: "gas" };
  function buildAdvisorAnswer(answerId, s, locale = "pl"){
    const L = (pl, ru) => locale === "ru" ? ru : pl;
    const parts = answerId.split("/"), topic = parts[1], intent = parts[parts.length - 1];
    let key = ANSWER_KEY[topic] || "gdp";
    if (topic === "GAS" && parts[2] === "IMPORT") key = "gas";
    const E = explain(key, s, locale); if (!E) return null;
    const rep = s.advisor.reports[s.advisor.reports.length - 1], m = s.macro;
    let summary;
    
    if (intent === "WHY") summary = E.summary + (E.noDominant ? " " + L("Model nie wskazał jednej wyraźnie dominującej przyczyny.", "Модель не выявила одной явно доминирующей причины.") : "");
    else if (intent === "LEVEL") summary = levelText(key, s, L);
    else if (intent === "OPTIONS" || intent === "POLICY") summary = L(`Możliwe działania dla tematu „${E.title}” — każde ma koszt i opóźnienie. Doradca nie wybiera za Ciebie.`, `Возможные действия по теме «${E.title}» — у каждого есть цена и задержка. Советник не решает за тебя.`);
    else if (intent === "IMPACT") summary = L(`Łańcuch wpływu: ${E.chain.join(" → ")}.`, `Цепочка влияния: ${E.chain.join(" → ")}.`);
    else if (intent === "FORECAST") summary = rep ? L(`Przy obecnej polityce za 12 mies.: wzrost PKB ${n1(rep.base[0].growth)}% r/r, inflacja ${n1(rep.base[0].inflation)}%, dług ${n1(rep.base[0].debtRatio)}% PKB. Pewność ${rep.confidence[0].value}%.`, `При текущей политике через 12 мес.: рост ВВП ${n1(rep.base[0].growth)}%, инфляция ${n1(rep.base[0].inflation)}%, долг ${n1(rep.base[0].debtRatio)}% ВВП. Уверенность ${rep.confidence[0].value}%.`) : "";
    else if (intent === "INACTION") summary = rep ? L(`Bez zmian: za 36 mies. inflacja ok. ${n1(rep.base[1].inflation)}%, dług ${n1(rep.base[1].debtRatio)}% PKB, udział importu gazu ${Math.round(rep.base[1].gasImportShare)}%.`, `Без изменений: через 36 мес. инфляция ~${n1(rep.base[1].inflation)}%, долг ${n1(rep.base[1].debtRatio)}% ВВП, доля импорта газа ${Math.round(rep.base[1].gasImportShare)}%.`) : "";
    else summary = E.title + ": " + E.value;
    return { answerId, key, title: E.title, summary, factors: [...E.main.map(f => ({ ...f, rank: "main" })), ...E.extra.map(f => ({ ...f, rank: "extra" }))], chain: E.chain, action: E.actions?.[0] || null, actions: E.actions || [], note: E.note || null,
      uncertainty: E.uncertainty, follow: Object.keys(INTENTS).filter(i => i !== intent).slice(0, 4).map(i => [`${parts.slice(0, -1).join("/")}/${i}`, INTENTS[i][locale === "ru" ? 1 : 0]]), structure: E.structure || null };
    void m;
  }
  function levelText(key, s, L){
    const m = s.macro, mk = s.markets;
    if (key === "gas"){ const r = mk.gaz.price / mk.gaz.worldBase; return r > 1.3 ? L(`Tak — gaz jest o ${Math.round((r - 1) * 100)}% droższy niż na starcie gry.`, `Да — газ на ${Math.round((r - 1) * 100)}% дороже, чем в начале игры.`) : r < 0.9 ? L("Nie — gaz jest tańszy niż na starcie gry.", "Нет — газ дешевле, чем в начале игры.") : L("Cena jest blisko poziomu startowego gry.", "Цена близка к стартовому уровню игры."); }
    if (key === "inflation") return m.inflation > 4 ? L("Tak — powyżej górnej granicy celu gry (2–4%).", "Да — выше верхней границы цели (2–4%).") : m.inflation < 2 ? L("Nisko — poniżej dolnej granicy celu gry.", "Низко — ниже нижней границы цели.") : L("W przedziale celu gry 2–4%.", "В коридоре цели 2–4%.");
    if (key === "debt") return m.debtRatio > 65 ? L("Powyżej progu celu gry (65% PKB).", "Выше порога цели (65% ВВП).") : L("Poniżej progu celu gry (65% PKB).", "Ниже порога цели (65% ВВП).");
    if (key === "trade" || key === "imports") return L("Sam deficyt handlowy nie jest „dobry” ani „zły” — liczy się struktura importu i finansowanie.", "Сам торговый дефицит не «хороший» и не «плохой» — важны структура импорта и финансирование.");
    if (key === "unemployment") return m.unemployment > 7 ? L("Wysokie jak na Polskę.", "Высокая для Польши.") : L("Umiarkowane.", "Умеренная.");
    return L("Porównaj z historią w zakładce Dane.", "Сравни с историей во вкладке Данные.");
  }

  const API = { TREE, INTENTS, KW, resolveAdvisorQuery, buildAdvisorAnswer, explain, fold, TOPICS, MARKET_TOPIC, TOPIC_OF_MARKET };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.PLAdvisor = API;
})(typeof window !== "undefined" ? window : globalThis);
