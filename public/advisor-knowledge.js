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

  // ------------------------------------------------------------ czynniki „Dlaczego?” z bieżącego stanu
  // Zwraca { title, value, change, main:[...], extra:[...], chain:[...], actions:[...], uncertainty, follow:[...] }
  // Czynniki są RANKINGIEM (główny / dodatkowy) z faktycznych zmian w modelu — bez wymyślonych procentów.
  function back(s, months){ const M = s.monthly; return M.length > months ? M[M.length - 1 - months] : s.start; }
  function factor(label, v, unit, dir, txt){ return { label, v, unit, dir, txt, w: Math.abs(dir) }; }
  function explain(key, s, locale = "pl"){
    const L = (pl, ru) => locale === "ru" ? ru : pl, m = s.macro, mk = s.markets, a = back(s, 6), z = SIM.snapshot(s);
    const pct = (x, y) => y ? (x / y - 1) * 100 : 0;
    const rank = list => { const f = list.filter(x => Math.abs(x.w) > 1e-9).sort((x, y) => y.w - x.w); return { main: f.slice(0, 1), extra: f.slice(1, 4) }; };
    let r = null;
    if (key === "gas"){
      const g = mk.gaz, ga = a.mk.gaz, worldCh = pct(g.world, ga.world), demCh = pct(g.demand, ga.demand), shareImp = 100 * g.imp / Math.max(1, g.demand);
      const evs = s.events.filter(e => DATA.events[e.k].effects.world?.gaz).map(e => DATA.events[e.k].name[locale === "ru" ? 1 : 0]);
      const fs = [factor(L("Światowa cena gazu", "Мировая цена газа"), worldCh, "%", worldCh * 1.0, worldCh > 1 ? L("Gaz na świecie zdrożał — import kosztuje więcej.", "Газ в мире подорожал — импорт дороже.") : L("Gaz na świecie stabilny lub tańszy.", "Газ в мире стабилен или дешевле.")),
        factor(L("Udział importu w zużyciu", "Доля импорта в потреблении"), shareImp, "%", (shareImp - 60) * 0.1, L(`Ok. ${n0(shareImp)}% gazu pochodzi z importu, więc cena krajowa idzie za ceną importu.`, `Около ${n0(shareImp)}% газа импортируется, поэтому цена внутри следует за ценой импорта.`)),
        factor(L("Popyt przemysłu i elektrowni", "Спрос промышленности и электростанций"), demCh, "%", demCh * 0.6, demCh > 0 ? L("Zużycie rośnie — potrzeba więcej importu.", "Потребление растёт — нужно больше импорта.") : L("Zużycie spada.", "Потребление падает.")),
        factor(L("Koszt frachtu i tras", "Стоимость фрахта и маршрутов"), (m.freight - 1) * 100, "%", (m.freight - 1) * 30, L("Droższy transport podnosi parytet importu.", "Дорогая перевозка поднимает импортный паритет."))];
      r = { title: L("Cena gazu", "Цена газа"), value: `${n0(g.price)} zł/MWh`, change: pct(g.price, ga.price), ...rank(fs),
        chain: [L("cena światowa", "мировая цена") + (worldCh > 1 ? " ↑" : ""), L("udział importu", "доля импорта") + ` ${n0(shareImp)}%`, L("parytet importu", "импортный паритет") + ` ${n0(g.parity)} zł`, L("cena krajowa", "внутренняя цена") + ` ${n0(g.price)} zł`, L("koszty przemysłu i prądu", "издержки промышленности и энергии")],
        events: evs, actions: [[L("Magazyny gazu — stabilniejsze ceny (efekt po 1,5–4 latach)", "Хранилища газа — стабильнее цены (через 1,5–4 года)"), "programs.magazyny"], [L("Efektywność energetyczna — mniejsze zużycie (9–30 mies.)", "Энергоэффективность — меньше потребление (9–30 мес.)"), "programs.efektywnosc"], [L("Kontrakt importowy ze stałą ceną — ochrona przed skokami", "Импортный контракт по фиксированной цене — защита от скачков"), "trade"], [L("OZE/atom — mniej gazu w elektrowniach (2,5–6 lat)", "ВИЭ/АЭС — меньше газа в генерации (2,5–6 лет)"), "programs.oze"]] };
    } else if (key === "power"){
      const q = mk.prad, qa = a.mk.prad;
      const fs = [factor(L("Cena gazu (część elektrowni)", "Цена газа (часть генерации)"), pct(mk.gaz.price, qa ? a.mk.gaz.price : mk.gaz.price), "%", pct(mk.gaz.price, a.mk.gaz.price) * 0.5, L("Elektrownie gazowe wyznaczają cenę w szczycie.", "Газовые станции задают цену в пик.")),
        factor(L("Podaż krajowa vs. zużycie", "Внутреннее производство vs. потребление"), pct(q.prod, q.demand), "%", -pct(q.prod, q.demand) * 2, q.prod < q.demand ? L("Produkujemy mniej, niż zużywamy — potrzebny import.", "Производим меньше, чем потребляем — нужен импорт.") : L("Produkcja pokrywa zużycie.", "Производство покрывает потребление.")),
        factor(L("Awarie / niezawodność sieci", "Аварии / надёжность сети"), s.events.some(e => e.k === "grid_failure") ? 1 : 0, "", s.events.some(e => e.k === "grid_failure") ? 5 : 0, L("Awaria dużej elektrowni zmniejszyła podaż.", "Авария крупной станции снизила предложение."))];
      r = { title: L("Cena prądu", "Цена электроэнергии"), value: `${n0(q.price)} zł/MWh`, change: pct(q.price, qa.price), ...rank(fs), chain: [L("gaz i węgiel", "газ и уголь"), L("koszt wytwarzania", "стоимость генерации"), L("bilans mocy", "баланс мощности"), L("cena prądu", "цена электроэнергии"), L("koszty firm i rachunki", "издержки фирм и счета")], actions: [[L("Modernizacja sieci", "Модернизация сети"), "programs.siec"], [L("Nowe źródła (OZE, atom)", "Новые источники"), "programs.oze"]] };
    } else if (key === "inflation"){
      const pi = m.pi, pa = a.pi || pi;
      const fs = [factor(L("Oczekiwania inflacyjne", "Инфляционные ожидания"), pi.expect, "p.p.", Math.abs(pi.expect - pa.expect) + 0.3, L("Ludzie i firmy zakładają przyszłe podwyżki.", "Люди и фирмы закладывают будущий рост цен.")),
        factor(L("Popyt vs. możliwości gospodarki", "Спрос vs. возможности экономики"), pi.demand, "p.p.", Math.abs(pi.demand) + 0.01, pi.demand > 0 ? L("Popyt przewyższa możliwości — ceny rosną (inflacja popytowa).", "Спрос выше возможностей — цены растут (инфляция спроса).") : L("Słaby popyt hamuje ceny.", "Слабый спрос сдерживает цены.")),
        factor(L("Energia (koszty)", "Энергия (издержки)"), pi.energy, "p.p.", Math.abs(pi.energy), pi.energy > 0 ? L("Droższa energia podnosi koszty wszystkich firm (inflacja kosztowa).", "Дорогая энергия поднимает издержки всех фирм (инфляция издержек).") : L("Energia tanieje i obniża inflację.", "Энергия дешевеет и снижает инфляцию.")),
        factor(L("Żywność", "Еда"), pi.food, "p.p.", Math.abs(pi.food), pi.food > 0 ? L("Żywność drożeje szybciej niż rok temu.", "Еда дорожает быстрее, чем год назад.") : L("Żywność drożeje wolniej niż rok temu.", "Еда дорожает медленнее, чем год назад."))];
      r = { title: L("Inflacja", "Инфляция"), value: `${n1(m.inflation)}%`, change: m.inflation - a.inflation, unit: "p.p.", ...rank(fs), exact: true,
        chain: [L("energia, żywność, popyt, oczekiwania", "энергия, еда, спрос, ожидания"), L("koszty i marże firm", "издержки и маржа фирм"), L("ceny w sklepach", "цены в магазинах"), L("dochód realny", "реальный доход")],
        actions: [[L("Wyższa stopa NBP — chłodzi popyt i oczekiwania (efekt po ~1,5–6 mies.), kosztem wzrostu", "Выше ставка NBP — охлаждает спрос и ожидания (через ~1,5–6 мес.), ценой роста"), "rate"], [L("Mniejszy deficyt — mniej popytu", "Меньший дефицит — меньше спроса"), "budget"], [L("Przy inflacji kosztowej: efektywność energetyczna i magazyny", "При инфляции издержек: энергоэффективность и хранилища"), "programs.efektywnosc"]] };
    } else if (key === "gdp"){
      const fs = [["C", L("Konsumpcja (C)", "Потребление (C)")], ["I", L("Inwestycje (I)", "Инвестиции (I)")], ["G", L("Wydatki państwa (G)", "Госрасходы (G)")], ["NX", L("Eksport netto (NX)", "Чистый экспорт (NX)")]].map(([k, lab]) => factor(lab, z[k] - a[k], L("mld zł/rok", "млрд zł/год"), Math.abs(z[k] - a[k]), ""));
      r = { title: L("PKB realny", "Реальный ВВП"), value: `${n0(m.Y * m.priceLevel)} ${L("mld zł", "млрд zł")}`, change: pct(z.Y, a.Y), ...rank(fs), exact: true,
        chain: [L("popyt: C + I + G + NX", "спрос: C + I + G + NX"), L("produkcja (z opóźnieniem)", "производство (с задержкой)"), L("zatrudnienie i dochody", "занятость и доходы"), L("konsumpcja (mnożnik)", "потребление (мультипликатор)")],
        actions: [[L("Inwestycje w produktywność (edukacja, R&D, modernizacja) — wzrost potencjału po latach", "Инвестиции в производительность — рост потенциала через годы"), "programs.przemysl"], [L("Niższa stopa — szybszy popyt, ryzyko inflacji", "Ниже ставка — быстрее спрос, риск инфляции"), "rate"]] };
    } else if (key === "unemployment"){
      const fs = [factor(L("Luka PKB (popyt vs. potencjał)", "Разрыв ВВП (спрос vs. потенциал)"), m.gap, "%", Math.abs(m.gap - (a.gap ?? m.gap)) + 0.1, m.gap < 0 ? L("Popyt jest niższy niż możliwości — firmy zatrudniają ostrożnie.", "Спрос ниже возможностей — фирмы осторожно нанимают.") : L("Gospodarka pracuje blisko pełnych mocy.", "Экономика работает близко к полным мощностям.")),
        factor(L("Wydarzenia zewnętrzne", "Внешние события"), s.events.length, "", s.events.length * 0.3, s.events.length ? L("Wstrząsy u partnerów obniżają zamówienia.", "Шоки у партнёров снижают заказы.") : "")];
      r = { title: L("Bezrobocie", "Безработица"), value: `${n1(m.unemployment)}%`, change: m.unemployment - a.unemployment, unit: "p.p.", ...rank(fs), chain: [L("popyt", "спрос"), L("produkcja", "производство"), L("zatrudnienie", "занятость"), L("bezrobocie", "безработица")], actions: [[L("Logistyka/inwestycje publiczne — praca teraz i potencjał później", "Логистика/госинвестиции — работа сейчас и потенциал потом"), "programs.logistyka"], [L("Niższa stopa — z opóźnieniem", "Ниже ставка — с задержкой"), "rate"]] };
    } else if (key === "budget"){
      const ra = a.rev || {}, sa = a.spend || {}, rz = z.rev, sz = z.spend;
      const items = [["vat", "VAT"], ["pit", "PIT"], ["cit", "CIT"], ["contributions", L("Składki", "Взносы")], ["other", L("Inne dochody", "Прочие доходы")], ["tariffs", L("Cła (spoza UE)", "Пошлины (вне ЕС)")]].map(([k, lab]) => factor(lab, rz[k] - (ra[k] ?? rz[k]), L("mld zł", "млрд zł"), Math.abs(rz[k] - (ra[k] ?? rz[k])), L("dochód", "доход")))
        .concat([["social", L("Świadczenia i zasiłki", "Соцвыплаты и пособия")], ["health", L("Zdrowie", "Здравоохранение")], ["admin", L("Administracja i inne", "Администрация и прочее")], ["programs", L("Programy inwestycyjne", "Инвестпрограммы")], ["interest", L("Odsetki od długu", "Проценты по долгу")]].map(([k, lab]) => factor(lab, -(sz[k] - (sa[k] ?? sz[k])), L("mld zł", "млрд zł"), Math.abs(sz[k] - (sa[k] ?? sz[k])), L("wydatek", "расход"))));
      r = { title: L("Saldo budżetu", "Сальдо бюджета"), value: `${sgn(m.balance)} ${L("mld zł/rok", "млрд zł/год")}`, change: m.balance - (a.balance ?? m.balance), unit: L("mld zł", "млрд zł"), ...rank(items), exact: true,
        chain: [L("PKB i zatrudnienie", "ВВП и занятость"), L("wpływy z podatków", "налоговые поступления"), L("wydatki i programy", "расходы и программы"), L("saldo", "сальдо"), L("dług i odsetki", "долг и проценты")],
        note: L("Saldo handlowe nie jest częścią budżetu: import nie zamienia się bezpośrednio w dług publiczny.", "Торговый баланс не входит в бюджет: импорт не превращается напрямую в госдолг."), actions: [[L("Przegląd wydatków administracji", "Пересмотр расходов администрации"), "admin"], [L("Podatki — więcej wpływów, mniejszy popyt", "Налоги — больше доходов, меньше спроса"), "vat"]] };
    } else if (key === "debt"){
      const fs = [factor(L("Deficyt budżetu", "Дефицит бюджета"), m.balance, L("mld zł", "млрд zł"), Math.max(0, -m.balance) / 50, L("Każdy rok deficytu zwiększa dług.", "Каждый год дефицита увеличивает долг.")), factor(L("Wzrost nominalnego PKB", "Рост номинального ВВП"), z.nominalGDP - a.nominalGDP, L("mld zł", "млрд zł"), Math.max(0, z.nominalGDP - a.nominalGDP) / 100, L("Rosnący PKB zmniejsza relację długu do PKB.", "Растущий ВВП снижает отношение долга к ВВП.")), factor(L("Oprocentowanie długu", "Ставка по долгу"), m.govRate, "%", m.govRate / 5, L("Wyższe stopy = droższa obsługa długu.", "Выше ставки = дороже обслуживание долга."))];
      r = { title: L("Dług / PKB", "Долг / ВВП"), value: `${n1(m.debtRatio)}%`, change: m.debtRatio - a.debtRatio, unit: "p.p.", ...rank(fs), chain: [L("deficyt", "дефицит"), L("pożyczki", "заимствования"), L("dług ↑", "долг ↑"), L("odsetki ↑", "проценты ↑")], actions: [[L("Ograniczyć deficyt lub przyspieszyć wzrost", "Сократить дефицит или ускорить рост"), "budget"]] };
    } else if (key === "trade" || key === "imports" || key === "exports"){
      const comp = SIM.MK.map(k => ({ k, name: DATA.markets[k].name[locale === "ru" ? 1 : 0], imp: mk[k].impValue, exp: mk[k].expValue })).sort((x, y) => (key === "exports" ? y.exp - x.exp : y.imp - x.imp));
      const totI = m.M, totE = m.X;
      r = { title: key === "imports" ? L("Import towarów", "Импорт товаров") : key === "exports" ? L("Eksport towarów", "Экспорт товаров") : L("Saldo handlu towarami", "Сальдо торговли товарами"),
        value: key === "imports" ? `${n0(totI)} ${L("mld zł/rok", "млрд zł/год")}` : key === "exports" ? `${n0(totE)} ${L("mld zł/rok", "млрд zł/год")}` : `${sgn(totE - totI)} ${L("mld zł/rok", "млрд zł/год")}`,
        change: key === "imports" ? pct(z.M, a.M) : key === "exports" ? pct(z.X, a.X) : (z.X - z.M) - (a.X - a.M), structure: comp.map(c => ({ name: c.name, value: key === "exports" ? c.exp : c.imp, share: 100 * (key === "exports" ? c.exp / totE : c.imp / totI) })),
        main: [factor(L("Struktura", "Структура"), 0, "", 1, comp.slice(0, 3).map(c => c.name).join(", "))], extra: [],
        chain: [L("popyt krajowy i ceny", "внутренний спрос и цены"), L("import (energia, maszyny, komponenty)", "импорт (энергия, машины, комплектующие)"), L("produkcja i eksport", "производство и экспорт"), L("saldo", "сальдо")],
        note: L("Deficyt handlowy nie oznacza automatycznie słabej gospodarki. Ważne, co importujemy (maszyny i technologie mogą wspierać przyszły wzrost; droga energia to ryzyko), jak finansowana jest różnica i czy import zwiększa produktywność. Saldo handlowe to nie budżet państwa.", "Торговый дефицит не означает автоматически слабую экономику. Важно, что импортируем (машины и технологии поддерживают будущий рост; дорогая энергия — риск), как финансируется разница и повышает ли импорт производительность. Торговый баланс — не госбюджет."),
        actions: [[L("Kontrakty eksportowe — stały popyt", "Экспортные контракты — стабильный спрос"), "trade"], [L("Modernizacja przemysłu — konkurencyjność", "Модернизация промышленности — конкурентоспособность"), "programs.przemysl"]] };
    } else if (key === "grain"){
      const q = mk.zboze, qa = a.mk.zboze, ua = s.partners.UA.supply.zboze ?? 1;
      const fs = [factor(L("Dostawy z Ukrainy", "Поставки из Украины"), (ua - 1) * 100, "%", (1 - ua) * 10, ua < 0.95 ? L("Słabsze zbiory u partnera ograniczają import.", "Слабый урожай у партнёра ограничивает импорт.") : L("Dostawy normalne.", "Поставки в норме.")), factor(L("Cena światowa", "Мировая цена"), pct(q.world, qa.world), "%", Math.abs(pct(q.world, qa.world)) / 5, ""), factor(L("Zapasy w kraju", "Запасы в стране"), q.stock, L("mln t", "млн т"), q.stock < q.demand * 0.25 ? 3 : 0.1, L("Małe zapasy = większa premia cenowa.", "Малые запасы = выше ценовая премия."))];
      r = { title: L("Cena zboża", "Цена зерна"), value: `${n0(q.price)} zł/t`, change: pct(q.price, qa.price), ...rank(fs), chain: [L("pogoda i zbiory", "погода и урожай"), L("import / eksport", "импорт / экспорт"), L("zapasy", "запасы"), L("cena zboża", "цена зерна"), L("ceny żywności", "цены на еду")], actions: [[L("Większa rezerwa zboża", "Больший резерв зерна"), "reserve.zboze"], [L("Nawadnianie i odporność upraw", "Орошение и устойчивость посевов"), "programs.rolnictwo"]] };
    }
    if (!r) return null;
    r.decisions = s.decisions.filter(d => s.dayIndex - d.day < 180).slice(-3);
    r.delayed = SIM.PROG.filter(k => Math.abs(s.programs[k].eff - 1) > 0.02).map(k => ({ k, name: DATA.programs[k].name[locale === "ru" ? 1 : 0], eff: s.programs[k].eff }));
    r.uncertainty = r.exact ? L("Rozbicie wynika wprost z równań modelu.", "Разложение следует прямо из уравнений модели.") : L("Czynniki uszeregowane wg wpływu w modelu (główny / dodatkowy) — bez dokładnych procentów udziału.", "Факторы упорядочены по влиянию в модели (главный / дополнительный) — без точных процентов вклада.");
    return r;
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
    const ch = E.change != null ? (E.unit ? `${sgn(E.change)} ${E.unit}` : `${sgn(E.change)}%`) : "";
    if (intent === "WHY") summary = L(`${E.title}: ${E.value} (${ch} w ostatnich 6 mies.). Główna przyczyna: ${E.main[0]?.label?.toLowerCase() || "brak wyraźnej"}.`, `${E.title}: ${E.value} (${ch} за 6 мес.). Главная причина: ${E.main[0]?.label?.toLowerCase() || "нет явной"}.`);
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

  const API = { TREE, INTENTS, KW, resolveAdvisorQuery, buildAdvisorAnswer, explain, fold };
  if (typeof module !== "undefined" && module.exports) module.exports = API; else root.PLAdvisor = API;
})(typeof window !== "undefined" ? window : globalThis);
