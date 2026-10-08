// Brainstorm: Misje — diorama 3D (Three.js), klikalne budynki, czas miesięczny z pauzą.
// Cel dydaktyczny: pokazać różnicę między decyzją RACJONALNĄ (spełnia cele) a OPTYMALNĄ (największy dobrobyt).
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

  // ================================================================ MODEL (miesięczny)
  const MONTHS = 12, BASE_P = 5, IMPORT_MAX = 40;
  const BUILD = {
    piekarnia2: { cost: 12, months: 3, jobs: 20 },
    nawadnianie: { cost: 10, months: 4, jobs: 8 },
  };
  const GOALS = { price: 6.5, shortage: 2, farmers: 35, budget: -10, unemp: 8 };
  const harvest = m => m < 9 ? 58 + m * 3 : 100;          // susza: zbiory odbudowują się do nowych żniw (miesiąc 10)

  function newState(){
    return {
      m: 0, done: false, reserve: 40, budget: 10, subsidyBoost: 0,
      bakeries: 1, irrigation: false, projects: [],            // projekty: {type, left}
      d: { tariff: 30, release: 0, subsidy: 0, cap: 0, rate: 5 },
      hist: [], log: [],
    };
  }

  // Wynik jednego miesiąca przy decyzjach d (bez zmiany stanu).
  function sim(st, d = st.d){
    const m = st.m;
    const dom = harvest(m) + (st.irrigation ? 12 : 0) + st.subsidyBoost;
    const imp = IMPORT_MAX * clamp(1 - d.tariff / 40, 0, 1);
    const rel = Math.min(d.release, st.reserve);
    const grain = dom + imp + rel;
    const capacity = 100 * st.bakeries;
    const Q = Math.min(grain, capacity);
    const bottleneck = grain > capacity + 0.5 ? "bakery" : "grain";
    const ds = (1 + 0.015 * m) * (1 - (d.rate - 5) * 0.012);   // miasto rośnie; wysokie stopy chłodzą popyt
    const D = p => 100 * ds * Math.pow(BASE_P / p, 0.6);
    let p = BASE_P * Math.pow(100 * ds / Q, 1 / 0.6), shortage = 0, capped = false;
    if (d.cap && d.cap < p){ capped = true; p = d.cap; shortage = Math.max(0, D(p) - Q); }
    const grainPrice = p * Math.pow(Math.min(1, capacity / grain), 1.5);   // nadmiar zboża (brak mocy piekarni) obniża jego cenę
    const farmers = clamp(50 + (dom * grainPrice + d.subsidy * 10 - 500) / 7, 0, 100);
    const consumers = clamp(100 - (p - BASE_P) * 13 - shortage * 2.2, 0, 100);
    const building = st.projects.length > 0;
    const employed = 920 + st.bakeries * 20 + (st.irrigation ? 8 : 0) + dom * 0.6 + (building ? 15 : 0) - (d.rate - 5) * 8;
    const unemp = clamp(100 * (1 - employed / 1040), 3, 30);   // zawsze jest trochę bezrobocia frykcyjnego
    const taxes = employed * 0.004;
    const tariffRev = imp * d.tariff * 0.006;
    const spendFixed = 3.0, benefits = unemp * 0.08, reserveCost = rel * 0.08, buildCost = st.projects.reduce((s, pr) => s + BUILD[pr.type].cost / BUILD[pr.type].months, 0);
    const net = taxes + tariffRev - spendFixed - d.subsidy - benefits - reserveCost - buildCost;
    const budgetAfter = st.budget + net;
    const jobs = clamp(100 - (unemp - 5) * 10, 0, 100);
    const fiscal = clamp(60 + budgetAfter * 2, 0, 100);
    const W = 0.35 * consumers + 0.25 * farmers + 0.2 * jobs + 0.2 * fiscal;     // dobrobyt (0–100)
    const inflation = 2.5 + (p - BASE_P) / BASE_P * 18 - (d.rate - 5) * 0.7;
    const ok = { price: p <= GOALS.price, shortage: shortage <= GOALS.shortage, farmers: farmers >= GOALS.farmers, budget: budgetAfter >= GOALS.budget, unemp: unemp <= GOALS.unemp };
    const rational = Object.values(ok).every(Boolean);
    return { dom, imp, rel, grain, capacity, Q, bottleneck, p, shortage, capped, farmers, consumers, unemp, employed, taxes, tariffRev, spendFixed, benefits, reserveCost, buildCost, subsidy: d.subsidy, net, budgetAfter, jobs, fiscal, W, inflation, ok, rational, demandAt5: D(BASE_P) };
  }

  // Najlepsze decyzje polityczne na ten miesiąc (przeszukanie siatki).
  function bestPolicy(st){
    let best = null;
    for (const tariff of [0, 10, 20, 30, 40]) for (const release of [0, 4, 8, 12]) for (const subsidy of [0, 2, 4, 6]) for (const rate of [4, 5, 6, 7]){
      const d = { tariff, release: Math.min(release, st.reserve), subsidy, cap: 0, rate };
      const r = sim(st, d);
      const left = MONTHS - st.m;   // kara za saldo, którego nie da się utrzymać do końca roku
      const endBudget = r.budgetAfter + r.net * (left - 1);
      const score = r.W + (r.rational ? 4 : 0) + Math.min(0, endBudget - GOALS.budget) * 0.4;
      if (!best || score > best.score) best = { d, r, score };
    }
    return best;
  }
  // Czy opłaca się budować (prognoza na kilka miesięcy).
  function buildAdvice(st){
    const left = MONTHS - st.m, out = [];
    const inProgress = t => st.projects.some(p => p.type === t);
    const demSoon = 100 * (1 + 0.015 * (st.m + 3));
    if (st.bakeries < 2 && !inProgress("piekarnia2") && left > 3 && demSoon > 100 * st.bakeries * 0.97) out.push("piekarnia2");
    if (!st.irrigation && !inProgress("nawadnianie") && left > 5 && st.m < 6) out.push("nawadnianie");
    return out;
  }

  function startBuild(st, type){
    st.projects.push({ type, left: BUILD[type].months });
  }
  function advance(st){
    const r = sim(st);
    st.reserve -= r.rel; st.budget = r.budgetAfter;
    st.subsidyBoost = Math.min(15, st.subsidyBoost + st.d.subsidy * 0.25);
    const finished = [];
    st.projects.forEach(p => p.left--);
    st.projects = st.projects.filter(p => { if (p.left <= 0){ finished.push(p.type); if (p.type === "piekarnia2") st.bakeries = 2; if (p.type === "nawadnianie") st.irrigation = true; return false; } return true; });
    const best = bestPolicy({ ...st, m: st.m, budget: st.budget - r.net, reserve: st.reserve + r.rel });
    st.hist.push({ m: st.m, d: { ...st.d }, r, bestW: best.r.W });
    st.m++; if (st.m >= MONTHS) st.done = true;
    return { r, finished };
  }
  function grade(st){
    const H = st.hist, avg = k => H.reduce((s, h) => s + h[k], 0) / H.length;
    const W = H.reduce((s, h) => s + h.r.W, 0) / H.length, bestW = avg("bestW");
    const rationalShare = H.filter(h => h.r.rational).length / H.length;
    const eff = clamp(100 - (bestW - W) * 4, 0, 100);   // 1 pkt dobrobytu poniżej optimum = −4% efektywności
    const stars = (rationalShare >= 0.75 ? 1 : 0) + (eff >= 90 ? 1 : 0) + (eff >= 97 && rationalShare === 1 ? 1 : 0);
    return { W, bestW, rationalShare, eff, stars };
  }

  // ================================================================ TEKSTY
  function texts(lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    return {
      L,
      title: L("Misja 1: Nieurodzaj", "Миссия 1: Неурожай"),
      brief: L("Susza zniszczyła zbiory: rolnicy mają tylko 58% normalnej ilości zboża, a pełne żniwa wrócą dopiero za 9 miesięcy. Miasto rośnie, więc popyt na chleb co miesiąc jest trochę większy, a jedyna piekarnia pracuje już na 100% mocy. Przez 12 miesięcy rządzisz gospodarką.",
               "Засуха уничтожила урожай: у фермеров только 58% обычного зерна, а полный урожай будет лишь через 9 месяцев. Город растёт, поэтому спрос на хлеб каждый месяц немного выше, а единственная пекарня уже работает на 100%. 12 месяцев ты управляешь экономикой."),
      rationalDef: L("<b>Decyzja racjonalna</b> spełnia wszystkie cele (zielone wskaźniki). <b>Decyzja optymalna</b> daje największy możliwy <b>dobrobyt</b> (konsumenci, rolnicy, praca, budżet razem). Każda optymalna decyzja jest racjonalna, ale nie każda racjonalna jest optymalna.",
                     "<b>Рациональное решение</b> выполняет все цели (зелёные показатели). <b>Оптимальное решение</b> даёт максимальное <b>благосостояние</b> (потребители, фермеры, работа, бюджет вместе). Любое оптимальное решение рационально, но не любое рациональное оптимально."),
      how: L("Kliknij budynek, żeby zmienić decyzje. Przy każdej zmianie zobaczysz prognozę skutków. ▶ uruchamia czas, gra sama zatrzyma się przy ważnym zdarzeniu.",
             "Нажми на здание, чтобы изменить решения. При каждом изменении увидишь прогноз последствий. ▶ запускает время, игра сама остановится при важном событии."),
      goals: L("Cele", "Цели"),
      goalList: [
        L(`Chleb ≤ ${fmt(GOALS.price)} zł (normalnie 5 zł)`, `Хлеб ≤ ${fmt(GOALS.price)} zł (обычно 5 zł)`),
        L(`Puste półki (niedobór) ≤ ${GOALS.shortage}%`, `Пустые полки (дефицит) ≤ ${GOALS.shortage}%`),
        L(`Nastroje rolników ≥ ${GOALS.farmers}`, `Настроение фермеров ≥ ${GOALS.farmers}`),
        L(`Bezrobocie ≤ ${GOALS.unemp}%`, `Безработица ≤ ${GOALS.unemp}%`),
        L(`Budżet ≥ ${GOALS.budget} mln zł`, `Бюджет ≥ ${GOALS.budget} млн zł`),
      ],
      month: L("Miesiąc", "Месяц"), play: L("Start", "Пуск"), pause: L("Pauza", "Пауза"),
      advisor: L("Doradca", "Советник"), economy: L("Gospodarka", "Экономика"),
      bread: L("Chleb", "Хлеб"), shelves: L("Półki", "Полки"), unemp: L("Bezrobocie", "Безработица"), budget: L("Budżet", "Бюджет"), welfare: L("Dobrobyt", "Благосостояние"),
      farmers: L("Rolnicy", "Фермеры"), consumers: L("Konsumenci", "Потребители"), infl: L("Inflacja", "Инфляция"),
      full: L("pełne", "полные"), noGL: L("Twoja przeglądarka nie obsługuje 3D. Wybierz budynek z listy:", "Браузер не поддерживает 3D. Выбери здание из списка:"),
      loading: L("Ładowanie świata…", "Загрузка мира…"), close: L("Dalej", "Дальше"), restart: L("Zagraj jeszcze raz", "Сыграть ещё раз"),
      forecast: L("Prognoza na ten miesiąc", "Прогноз на этот месяц"), noChange: L("Przesuń suwak, a zobaczysz skutki zmiany.", "Подвинь ползунок, и увидишь последствия."),
    };
  }

  function buildings(lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    return {
      rzad: { name: L("Rząd", "Правительство"),
        role: L("Prowadzi [[polityka-fiskalna|politykę fiskalną]]: cła, dopłaty, ceny urzędowe i inwestycje. Pieniądze bierze z budżetu, który zasilają podatki pracujących i cła.",
                "Ведёт [[polityka-fiskalna|фискальную политику]]: пошлины, дотации, регулируемые цены и инвестиции. Деньги берёт из бюджета, который пополняют налоги работающих и пошлины."),
        controls: [
          { k: "tariff", min: 0, max: 40, step: 5, unit: "%", label: L("Cło na import zboża", "Пошлина на импорт зерна") },
          { k: "subsidy", min: 0, max: 8, step: 1, unit: L(" mln/mies.", " млн/мес."), label: L("Dopłaty dla rolników", "Дотации фермерам") },
          { k: "cap", min: 0, max: 8, step: 0.5, unit: " zł", label: L("Cena maksymalna chleba (0 = brak)", "Максимальная цена хлеба (0 = нет)") },
        ] },
      rezerwy: { name: L("Rezerwy", "Госрезерв"),
        role: L("Państwowy magazyn zboża na kryzys. Uwolnienie od razu zwiększa podaż, ale zapas jest jeden na cały rok.", "Государственный склад зерна на кризис. Выпуск сразу увеличивает предложение, но запас один на весь год."),
        controls: [{ k: "release", min: 0, max: 12, step: 1, unit: "%", label: L("Uwalniaj z rezerw co miesiąc", "Выпускать из резерва каждый месяц") }] },
      nbp: { name: "NBP",
        role: L("Narodowy Bank Polski ustala [[stopa-referencyjna|stopę referencyjną]] ([[polityka-pieniezna|polityka pieniężna]]). Wyższa stopa: droższy kredyt, mniejszy popyt i inflacja, ale firmy mniej zatrudniają.",
                "Национальный банк Польши устанавливает [[stopa-referencyjna|референсную ставку]] ([[polityka-pieniezna|денежная политика]]). Выше ставка: дороже кредит, меньше спрос и инфляция, но фирмы меньше нанимают."),
        controls: [{ k: "rate", min: 2, max: 9, step: 0.5, unit: "%", label: L("Stopa referencyjna", "Референсная ставка") }] },
      farma: { name: L("Farma", "Ферма"),
        role: L("Krajowa [[podaz|podaż]] zboża. Po suszy zbiory są małe, odbudują się przy nowych żniwach (miesiąc 10). Nawadnianie daje +12% zbiorów na stałe.",
                "Внутреннее [[podaz|предложение]] зерна. После засухи урожай мал и восстановится к новому урожаю (месяц 10). Орошение даёт +12% урожая навсегда."),
        build: "nawadnianie" },
      piekarnia: { name: L("Piekarnia", "Пекарня"),
        role: L("Zamienia zboże w chleb. Ma ograniczoną moc: 100% normalnego popytu. Jeśli zboża jest więcej niż mocy, nadwyżka leży w magazynach, a cena zboża dla rolników spada.",
                "Превращает зерно в хлеб. Мощность ограничена: 100% обычного спроса. Если зерна больше мощности, излишек лежит на складах, а цена зерна для фермеров падает."),
        build: "piekarnia2" },
      sklep: { name: L("Sklep", "Магазин"),
        role: L("Tu spotyka się [[popyt|popyt]] mieszkańców z podażą chleba. Chleb to dobro podstawowe: ludzie kupują go prawie tyle samo nawet po podwyżce, więc brak towaru mocno podnosi cenę.",
                "Здесь [[popyt|спрос]] жителей встречается с предложением хлеба. Хлеб — базовый товар: его покупают почти столько же даже после подорожания, поэтому нехватка сильно поднимает цену.") },
      granica: { name: L("Import", "Импорт"),
        role: L("Ciężarówki z zagranicznym zbożem. Ile przyjedzie, zależy od cła. Import zwiększa podaż, ale konkuruje z krajowymi rolnikami.",
                "Грузовики с иностранным зерном. Сколько приедет, зависит от пошлины. Импорт увеличивает предложение, но конкурирует с местными фермерами.") },
    };
  }
  function buildInfo(lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    return {
      piekarnia2: { name: L("Druga piekarnia", "Вторая пекарня"),
        what: L(`Koszt ${BUILD.piekarnia2.cost} mln zł (płatne przez ${BUILD.piekarnia2.months} mies.), budowa ${BUILD.piekarnia2.months} mies. Podwaja moc wypieku i daje ${BUILD.piekarnia2.jobs} stałych miejsc pracy (+15 przy budowie). Ale więcej chleba wymaga więcej zboża: rolnicy go nie mają, więc trzeba będzie importować.`,
                `Стоит ${BUILD.piekarnia2.cost} млн zł (оплата ${BUILD.piekarnia2.months} мес.), строится ${BUILD.piekarnia2.months} мес. Удваивает мощность и даёт ${BUILD.piekarnia2.jobs} постоянных рабочих мест (+15 на стройке). Но больше хлеба требует больше зерна: у фермеров его нет, придётся импортировать.`) },
      nawadnianie: { name: L("Nawadnianie pól", "Орошение полей"),
        what: L(`Koszt ${BUILD.nawadnianie.cost} mln zł, budowa ${BUILD.nawadnianie.months} mies. Na stałe +12% krajowych zbiorów i ${BUILD.nawadnianie.jobs} miejsc pracy. Zwraca się dopiero po kilku miesiącach: im później, tym mniej się opłaca.`,
                `Стоит ${BUILD.nawadnianie.cost} млн zł, строится ${BUILD.nawadnianie.months} мес. Навсегда +12% урожая и ${BUILD.nawadnianie.jobs} рабочих мест. Окупается лишь через несколько месяцев: чем позже, тем менее выгодно.`) },
    };
  }

  // Wyjaśnienie zmiany jednej decyzji: przyczyna → skutki (z liczbami).
  function explainChange(k, from, to, a, b, lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl, up = to > from, out = [];
    const dW = b.W - a.W;
    if (k === "tariff"){
      out.push(up ? L(`Cło ${fmt(from)}% → ${fmt(to)}%: import droższy, spadnie do ${fmt(b.imp)}% normalnego zapotrzebowania (było ${fmt(a.imp)}%).`, `Пошлина ${fmt(from)}% → ${fmt(to)}%: импорт дороже, упадёт до ${fmt(b.imp)}% обычной потребности (было ${fmt(a.imp)}%).`)
                  : L(`Cło ${fmt(from)}% → ${fmt(to)}%: import wzrośnie do ${fmt(b.imp)}% normalnego zapotrzebowania (było ${fmt(a.imp)}%).`, `Пошлина ${fmt(from)}% → ${fmt(to)}%: импорт вырастет до ${fmt(b.imp)}% обычной потребности (было ${fmt(a.imp)}%).`));
      if (a.bottleneck === "bakery" && b.bottleneck === "bakery") out.push(L("Ale piekarnia i tak pracuje na 100% mocy: dodatkowe zboże nie zamieni się w chleb, tylko obniży cenę zboża dla rolników.", "Но пекарня и так работает на 100%: лишнее зерно не превратится в хлеб, а лишь снизит цену зерна для фермеров."));
      out.push(up ? L("Krajowi rolnicy zyskują (mniej konkurencji), konsumenci płacą więcej, budżet ma inne wpływy z cła.", "Местные фермеры выигрывают (меньше конкуренции), потребители платят больше, доход бюджета от пошлины меняется.")
                  : L("Konsumenci zyskują na tańszym chlebie, ale to gorzej dla lokalnych rolników: tańsze zboże z importu obniża ich dochody.", "Потребители выигрывают от дешёвого хлеба, но местным фермерам хуже: дешёвое импортное зерно снижает их доходы."));
    }
    if (k === "subsidy") out.push(up ? L(`Dopłaty ${fmt(from)} → ${fmt(to)} mln/mies.: rolnicy mają większy dochód i będą siać więcej (zbiory rosną z opóźnieniem). Koszt dla budżetu: ${fmt(to - from)} mln co miesiąc.`, `Дотации ${fmt(from)} → ${fmt(to)} млн/мес.: у фермеров больше дохода, они будут сеять больше (урожай растёт с задержкой). Стоимость для бюджета: ${fmt(to - from)} млн каждый месяц.`)
                                      : L(`Mniejsze dopłaty: oszczędzasz ${fmt(from - to)} mln/mies., ale rolnicy tracą dochód.`, `Меньше дотаций: экономишь ${fmt(from - to)} млн/мес., но фермеры теряют доход.`));
    if (k === "cap"){
      if (b.capped) out.push(L(`Cena maksymalna ${fmt(to)} zł jest niższa od ceny rynkowej. Nie dodaje ani jednego bochenka: ludzie chcą kupić więcej, niż jest, więc brakuje ${fmt(b.shortage)}% chleba. Kolejki i czarny rynek.`, `Потолок ${fmt(to)} zł ниже рыночной цены. Он не добавляет ни одной буханки: люди хотят купить больше, чем есть, поэтому не хватает ${fmt(b.shortage)}% хлеба. Очереди и чёрный рынок.`));
      else out.push(L("Cena maksymalna jest wyższa od ceny rynkowej, więc nic nie zmienia.", "Потолок выше рыночной цены, поэтому ничего не меняет."));
    }
    if (k === "release") out.push(up ? L(`Uwalniasz ${fmt(to)}% z rezerw: podaż od razu rośnie, ale w magazynie zostanie mniej na kolejne miesiące. Każdy 1% kosztuje 0,08 mln.`, `Выпускаешь ${fmt(to)}% из резерва: предложение сразу растёт, но на следующие месяцы останется меньше. Каждый 1% стоит 0,08 млн.`)
                                      : L("Mniej z rezerw: zapas zostaje na gorsze miesiące, ale teraz podaż jest mniejsza.", "Меньше из резерва: запас остаётся на худшие месяцы, но сейчас предложение меньше."));
    if (k === "rate") out.push(up ? L(`Stopa ${fmt(from)}% → ${fmt(to)}%: kredyty drożeją, ludzie i firmy mniej wydają. Inflacja spada, ale rośnie bezrobocie (${fmt(a.unemp)}% → ${fmt(b.unemp)}%).`, `Ставка ${fmt(from)}% → ${fmt(to)}%: кредиты дорожают, люди и фирмы тратят меньше. Инфляция падает, но растёт безработица (${fmt(a.unemp)}% → ${fmt(b.unemp)}%).`)
                                  : L(`Stopa ${fmt(from)}% → ${fmt(to)}%: tańszy kredyt pobudza popyt i zatrudnienie, ale przy braku chleba podnosi jego cenę i inflację.`, `Ставка ${fmt(from)}% → ${fmt(to)}%: дешёвый кредит подстёгивает спрос и занятость, но при нехватке хлеба поднимает цену и инфляцию.`));
    out.push(L(`Bilans: chleb ${fmt(a.p)} → ${fmt(b.p)} zł, rolnicy ${Math.round(a.farmers)} → ${Math.round(b.farmers)}, bezrobocie ${fmt(a.unemp)} → ${fmt(b.unemp)}%, budżet w tym miesiącu ${sign(a.net)} → ${sign(b.net)} mln. Dobrobyt ${sign(dW)} pkt.`,
               `Итог: хлеб ${fmt(a.p)} → ${fmt(b.p)} zł, фермеры ${Math.round(a.farmers)} → ${Math.round(b.farmers)}, безработица ${fmt(a.unemp)} → ${fmt(b.unemp)}%, бюджет в этом месяце ${sign(a.net)} → ${sign(b.net)} млн. Благосостояние ${sign(dW)} п.`));
    return out;
  }

  // ================================================================ SCENA 3D
  const PAL = {
    grass: 0x8fd16a, soil: 0x8a5a3b, soilDark: 0x6b4429, road: 0xe9dcc0, water: 0x5cc4f2,
    wall: 0xfff6e6, roofRed: 0xe2574c, roofBlue: 0x4a7bd8, roofGreen: 0x4bb377, gold: 0xf5c542, wood: 0xb07a4a,
    wheat: 0xf2cf4a, wheatDry: 0xc9a66b, stone: 0xd9d4cc, truck: 0x3d8fe0, people: 0xff9d5c, tree: 0x3fa35a, trunk: 0x8a5a3b,
    white: 0xffffff, dark: 0x4a4a55, flagR: 0xdc143c, scaffold: 0xf0a030, pipe: 0x7fb8e0,
  };
  function makeScene(THREE, canvas){
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 200);
    cam.position.set(22, 22.5, 22); cam.lookAt(0, -1.5, 0);
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
      const coin = cyl(0.8, 0.8, 0.22, PAL.gold, 0, 4.1, 0, 20, g); coin.rotation.x = Math.PI / 2; coin.position.y = 4.6; }
    { const g = group("rezerwy", 4.4, -5.2);
      [[-0.8, 0], [0.8, 0], [0, -1.1]].forEach(([x, z]) => { cyl(0.75, 0.75, 3, 0xe6e9ef, x, 1, z, 14, g); cyl(0.01, 0.78, 0.7, PAL.roofGreen, x, 4, z, 14, g); }); }
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
      cyl(0.08, 0.08, 1.4, PAL.dark, 6.5, 1, -0.1, 6, g); box(2.2, 0.14, 0.14, PAL.flagR, 5.4, 2.1, -0.1, g); box(1, 1, 1, PAL.stone, 6.4, 1, -1, g); }

    // działki pod budowę: druga piekarnia (obok drogi) i nawadnianie (staw przy farmie)
    const lots = {
      piekarnia2: { x: 4.6, z: -1.9, build(g){ box(2.4, 1.8, 2, PAL.wall, 0, 1, 0, g); roof(2.5, 2.2, 0.9, PAL.roofBlue, 0, 2.8, 0, g); box(0.4, 1.3, 0.4, PAL.stone, 0.7, 2.8, -0.5, g); } },
      nawadnianie: { x: -2.3, z: 7.2, build(g){ box(2.2, 0.08, 1.4, PAL.water, 0, 1, 0, g); cyl(0.12, 0.12, 0.8, PAL.pipe, 1.2, 1, 0, 6, g); box(3.2, 0.12, 0.12, PAL.pipe, -1.0, 1.7, -1.2, g); cyl(0.25, 0.25, 0.3, PAL.dark, 1.2, 1.8, 0, 8, g); } },
    };
    const lotMarks = {};
    Object.entries(lots).forEach(([id, l]) => { const mark = box(2.4, 0.04, 2, 0xd8c79a, l.x, 1, l.z); lotMarks[id] = mark; });
    [[-7.4, -0.9], [-4.6, -1.2], [2.0, -1.6]].forEach(([x, z], i) => { box(1.2, 1, 1.1, PAL.wall, x, 1, z); roof(1.3, 1.2, 0.6, [PAL.roofRed, PAL.roofBlue, PAL.roofGreen][i], x, 2, z); });
    [[-7.8, 7.6], [6.8, 7.2], [-8, -7.8], [1.2, -7.9], [6.4, 3.4], [-2.8, -2.6]].forEach(([x, z]) => tree(x, z, 0.95));

    const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
    const pick = (cx, cy) => {
      const r = canvas.getBoundingClientRect(); v2.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(v2, cam);
      const hit = ray.intersectObjects(Object.values(groups), true)[0];
      let o = hit?.object; while (o && !o.userData.id) o = o.parent;
      return o?.userData.id || null;
    };
    const hlCache = new Map();
    const hl = base => { if (!hlCache.has(base)){ const m = base.clone(); m.emissive = new THREE.Color(0x3366aa); m.emissiveIntensity = 0.35; hlCache.set(base, m); } return hlCache.get(base); };
    let current = null;
    const highlight = id => {
      current = id;
      Object.entries(groups).forEach(([k, g]) => g.traverse(m => { if (!m.isMesh) return; if (!m.userData.m0) m.userData.m0 = m.material; m.material = k === id ? hl(m.userData.m0) : m.userData.m0; }));
    };

    // efekt: krótkie „wyrośnięcie” nowego budynku (jedyna animacja, ~0,5 s)
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function popIn(g){
      if (reduce){ g.scale.set(1, 1, 1); render(); return; }
      const t0 = performance.now();
      const step = t => { const k = Math.min(1, (t - t0) / 500), e = 1 - Math.pow(1 - k, 3) * (1 - 1.7 * k * (1 - k)); g.scale.set(1, Math.max(0.01, e), 1); render(); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    const dyn = [], built = {}, scaff = {};
    function apply(v){
      const f = groups.farma.userData.fields, n = Math.round(clamp(v.harvest / 100, 0, 1) * f.length);
      f.forEach((m, i) => { m.userData.m0 = mat(i < n ? PAL.wheat : PAL.wheatDry); m.material = m.userData.m0; m.scale.y = i < n ? 1.6 : 0.5; });
      dyn.splice(0).forEach(m => scene.remove(m));
      for (let i = 0; i < Math.round(v.imports / 10); i++){
        const t = new THREE.Group();
        const b = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.6), mat(PAL.truck)); b.position.set(0, 0.55, 0); b.castShadow = true; t.add(b);
        const c = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.6), mat(PAL.white)); c.position.set(-0.75, 0.5, 0); t.add(c);
        t.position.set(8.9, 1, -5.6 + i * 1.3); t.rotation.y = Math.PI / 2; scene.add(t); dyn.push(t);
      }
      for (let i = 0; i < Math.round(clamp(v.shortage / 3, 0, 6)); i++){
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.7, 8), mat(PAL.people)); p.position.set(3.0 + i * 0.45, 1.35, 6.6); p.castShadow = true; scene.add(p); dyn.push(p);
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), mat(0xf7d1b0)); h.position.set(p.position.x, 1.85, 6.6); scene.add(h); dyn.push(h);
      }
      Object.entries(lots).forEach(([id, l]) => {
        if (v.underConstruction.includes(id) && !scaff[id]){
          const g = new THREE.Group(); g.position.set(l.x, 0, l.z);
          for (const [x, z] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 0.1), mat(PAL.scaffold)); p.position.set(x, 1.9, z); g.add(p); }
          const beam = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.8), mat(PAL.scaffold)); beam.position.set(0, 2.8, 0); g.add(beam);
          scene.add(g); scaff[id] = g;
        }
        if (!v.underConstruction.includes(id) && scaff[id]){ scene.remove(scaff[id]); delete scaff[id]; }
        if (v.built.includes(id) && !built[id]){
          const g = group(id, l.x, l.z); l.build(g); g.scale.set(1, 0.01, 1); built[id] = g; scene.remove(lotMarks[id]); popIn(g);
        }
      });
      if (current) highlight(current);
      render();
    }
    let w = 0, h = 0;
    function resize(){
      const r = canvas.parentElement.getBoundingClientRect(); w = r.width; h = r.height;
      renderer.setSize(w, h, false);
      const aspect = w / h, s = aspect < 1 ? 13 / aspect : (aspect > 1.6 ? 10.2 : 11.5 / Math.sqrt(aspect / 1.2));
      cam.left = -s * aspect; cam.right = s * aspect; cam.top = s; cam.bottom = -s; cam.updateProjectionMatrix(); render();
    }
    function render(){ renderer.render(scene, cam); }
    const anchors = { rzad: [-5.6, 6.2, -5.2], nbp: [-1.3, 5.8, -5.6], rezerwy: [4.4, 5.4, -5.2], farma: [-5.4, 4.2, 4.8], piekarnia: [0.6, 4.6, 4.6], sklep: [4.2, 3.6, 4.6], granica: [8.8, 3, -3.2], piekarnia2: [4.6, 4.4, -1.9], nawadnianie: [-2.3, 2.8, 7.2] };
    function screenPos(id){ const p = new THREE.Vector3(...anchors[id]).project(cam); return { x: (p.x + 1) / 2 * w, y: (1 - p.y) / 2 * h }; }
    return { resize, render, apply, pick, highlight, screenPos, dispose(){ renderer.dispose(); } };
  }

  // ================================================================ UI
  function mount(_el, ctx){
    const { lang, inline, esc, track } = ctx;
    const T = texts(lang), B = buildings(lang), BI = buildInfo(lang), L = T.L;
    let st = newState(), sel = null, world = null, timer = null, speed = 1, forecastBase = null, lastMsg = null;
    const LS = "makro2.game1";

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull"; document.body.appendChild(host); document.body.classList.add("gaming");
    host.innerHTML = `<div class="gtop">
        <div class="grow">
          <a class="gbtn" href="#start" aria-label="${L("Wyjdź", "Выйти")}">✕</a>
          <b class="gtitle">${T.title}</b>
          <span class="gmonth" id="gmonth"></span>
          <div class="gctrls">
            <button class="gbtn primary" id="gplay"></button>
            <button class="gbtn" id="gspeed">×1</button>
            <button class="gbtn" id="gstep" title="${L("Jeden miesiąc", "Один месяц")}">+1</button>
            <button class="gbtn" id="gadv">${T.advisor}</button>
            <button class="gbtn" id="ginfo">${T.goals}</button>
          </div>
        </div>
        <div class="gstats" id="gstats"></div>
      </div>
      <div class="gbody">
        <div class="gstage" id="gstage"><canvas id="gcv" aria-label="${T.title}"></canvas><div class="glabels" id="glabels"></div><div class="gfx" id="gfx"></div><div class="gload" id="gload">${T.loading}</div></div>
        <aside class="gpanel" id="gpanel"></aside>
        <div id="gmodal"></div>
      </div>`;
    const $ = s => host.querySelector(s);

    const view = () => ({
      harvest: harvest(Math.min(st.m, MONTHS - 1)) + (st.irrigation ? 12 : 0) + st.subsidyBoost,
      imports: sim(st).imp, shortage: (st.hist.at(-1)?.r.shortage) || 0,
      underConstruction: st.projects.map(p => p.type),
      built: [...(st.bakeries > 1 ? ["piekarnia2"] : []), ...(st.irrigation ? ["nawadnianie"] : [])],
    });

    // ---------- górny pasek
    function hud(){
      const r = st.hist.at(-1)?.r || sim(st);
      const chip = (lab, val, bad, title) => `<div class="gstat ${bad ? "bad" : "good"}" title="${esc(title || "")}"><span>${lab}</span><b>${val}</b></div>`;
      $("#gstats").innerHTML = [
        chip(T.bread, fmt(r.p) + " zł", !r.ok.price),
        chip(T.shelves, r.shortage > GOALS.shortage ? "−" + Math.round(r.shortage) + "%" : T.full, !r.ok.shortage),
        chip(T.farmers, Math.round(r.farmers), !r.ok.farmers),
        chip(T.unemp, fmt(r.unemp) + "%", !r.ok.unemp),
        chip(T.budget, fmt(st.hist.length ? st.budget : r.budgetAfter) + L(" mln", " млн"), !r.ok.budget),
        chip(T.welfare, Math.round(r.W), false),
      ].join("");
      $("#gmonth").textContent = st.done ? L("Koniec", "Конец") : `${T.month} ${st.m + 1}/${MONTHS}`;
      $("#gplay").textContent = timer ? "⏸ " + T.pause : "▶ " + T.play;
      $("#gplay").disabled = $("#gstep").disabled = st.done;
      $("#gspeed").textContent = "×" + speed;
    }

    // ---------- etykiety i efekty pływające
    function labels(){
      if (!world) return;
      const r = st.hist.at(-1)?.r;
      const warn = { farma: r && !r.ok.farmers, sklep: r && !r.ok.shortage, piekarnia: r && r.bottleneck === "bakery" && r.p > GOALS.price, rzad: r && !r.ok.budget, rezerwy: st.reserve <= 0, nbp: r && !r.ok.unemp };
      const ids = ["rzad", "nbp", "rezerwy", "farma", "piekarnia", "sklep", "granica", ...view().built];
      const names = { ...Object.fromEntries(Object.entries(B).map(([k, v]) => [k, v.name])), piekarnia2: BI.piekarnia2.name, nawadnianie: BI.nawadnianie.name };
      $("#glabels").innerHTML = ids.map(id => { const p = world.screenPos(id); return `<button class="glabel ${sel === id ? "on" : ""}" data-b="${id}" style="left:${p.x}px;top:${Math.max(30, p.y)}px">${esc(names[id])}${warn[id] ? "<i>!</i>" : ""}</button>`; }).join("");
    }
    function floatText(id, text, good){
      if (!world) return;
      const p = world.screenPos(id), d = document.createElement("div");
      d.className = "gfloat " + (good ? "up" : "down"); d.textContent = text; d.style.left = p.x + "px"; d.style.top = (p.y - 10) + "px";
      $("#gfx").appendChild(d); setTimeout(() => d.remove(), 1800);
    }

    // ---------- panel
    function overviewPanel(){
      const r = sim(st), H = st.hist.at(-1)?.r;
      const okRow = (ok, t) => `<li class="${ok ? "ok" : "no"}">${ok ? "✓" : "✗"} ${t}</li>`;
      return `<h2>${T.economy}</h2>
        <p class="grole">${T.how}</p>
        <div class="gbox"><b>${L("Ten miesiąc przy obecnych decyzjach", "Этот месяц при текущих решениях")}</b>
          <ul class="ggoal">${okRow(r.ok.price, T.goalList[0] + ` → ${fmt(r.p)} zł`)}${okRow(r.ok.shortage, T.goalList[1] + ` → ${fmt(r.shortage)}%`)}${okRow(r.ok.farmers, T.goalList[2] + ` → ${Math.round(r.farmers)}`)}${okRow(r.ok.unemp, T.goalList[3] + ` → ${fmt(r.unemp)}%`)}${okRow(r.ok.budget, T.goalList[4] + ` → ${fmt(r.budgetAfter)}`)}</ul>
          <p class="gverd ${r.rational ? "ok" : "no"}">${r.rational ? L("Decyzje racjonalne: wszystkie cele spełnione.", "Решения рациональны: все цели выполнены.") : L("Decyzje nieracjonalne: co najmniej jeden cel nie jest spełniony.", "Решения нерациональны: хотя бы одна цель не выполнена.")} ${T.welfare}: <b>${Math.round(r.W)}</b>/100</p></div>
        <div class="gbox"><b>${L("Budżet: skąd i dokąd (mln zł/mies.)", "Бюджет: откуда и куда (млн zł/мес.)")}</b>
          <table class="gtbl"><tr><td>${L("Podatki od pracujących", "Налоги работающих")}</td><td>+${fmt(r.taxes)}</td></tr>
          <tr><td>${L("Cło", "Пошлина")}</td><td>+${fmt(r.tariffRev)}</td></tr>
          <tr><td>${L("Usługi publiczne (stałe)", "Госуслуги (постоянно)")}</td><td>−${fmt(r.spendFixed)}</td></tr>
          <tr><td>${L("Zasiłki dla bezrobotnych", "Пособия безработным")}</td><td>−${fmt(r.benefits)}</td></tr>
          <tr><td>${L("Dopłaty", "Дотации")}</td><td>−${fmt(r.subsidy)}</td></tr>
          <tr><td>${L("Rezerwy", "Резерв")}</td><td>−${fmt(r.reserveCost)}</td></tr>
          <tr><td>${L("Budowy", "Стройки")}</td><td>−${fmt(r.buildCost)}</td></tr>
          <tr class="sum"><td>${L("Saldo", "Сальдо")}</td><td>${sign(r.net)}</td></tr></table>
          <p class="gsmall">${L("Więcej pracujących = więcej podatków i mniej zasiłków. Dlatego miejsca pracy pomagają budżetowi. Budżet możesz wydać na budowy, dopłaty i rezerwy.", "Больше работающих — больше налогов и меньше пособий. Поэтому рабочие места помогают бюджету. Бюджет можно тратить на стройки, дотации и резервы.")}</p></div>
        ${H ? `<div class="gbox"><b>${L("Ostatnie wydarzenia", "Последние события")}</b><ul class="glog">${st.log.slice(-4).reverse().map(x => `<li>${inline(x)}</li>`).join("")}</ul></div>` : ""}`;
    }
    function panel(){
      const p = $("#gpanel");
      if (!sel){ p.innerHTML = overviewPanel() + (!world ? `<div class="glist">${Object.keys(B).map(id => `<button class="gbtn" data-b="${id}">${esc(B[id].name)}</button>`).join("")}</div>` : ""); return; }
      if (sel === "piekarnia2" || sel === "nawadnianie"){ p.innerHTML = `<button class="gback" data-b="">← ${T.economy}</button><h2>${BI[sel].name}</h2><p class="grole">${BI[sel].what}</p>`; return; }
      const b = B[sel], r = sim(st);
      const status = {
        farma: L(`Zbiory w tym miesiącu: ${fmt(r.dom)}% normy${st.irrigation ? " (z nawadnianiem)" : ""}. Nastroje: ${Math.round(r.farmers)}/100.`, `Урожай в этом месяце: ${fmt(r.dom)}% нормы${st.irrigation ? " (с орошением)" : ""}. Настроение: ${Math.round(r.farmers)}/100.`),
        piekarnia: L(`Moc: ${r.capacity}%. Zboża dostępne: ${fmt(r.grain)}%. ${r.bottleneck === "bakery" ? "Wąskie gardło to piekarnia: zboża jest więcej, niż da się upiec." : "Wąskie gardło to zboże: piekarnia mogłaby piec więcej."} Popyt przy normalnej cenie: ${fmt(r.demandAt5)}%.`, `Мощность: ${r.capacity}%. Доступно зерна: ${fmt(r.grain)}%. ${r.bottleneck === "bakery" ? "Узкое место — пекарня: зерна больше, чем можно испечь." : "Узкое место — зерно: пекарня могла бы печь больше."} Спрос при обычной цене: ${fmt(r.demandAt5)}%.`),
        sklep: L(`Chleb: ${fmt(r.p)} zł. ${r.shortage > 0 ? `Brakuje ${fmt(r.shortage)}% chleba.` : "Półki pełne."}`, `Хлеб: ${fmt(r.p)} zł. ${r.shortage > 0 ? `Не хватает ${fmt(r.shortage)}% хлеба.` : "Полки полные."}`),
        granica: L(`Przy cle ${st.d.tariff}% przyjeżdża ${fmt(r.imp)}% zboża.`, `При пошлине ${st.d.tariff}% приезжает ${fmt(r.imp)}% зерна.`),
        rezerwy: L(`W magazynie: ${fmt(st.reserve)}%.`, `На складе: ${fmt(st.reserve)}%.`),
        rzad: L(`Budżet: ${fmt(st.budget)} mln zł. Saldo w tym miesiącu: ${sign(r.net)} mln.`, `Бюджет: ${fmt(st.budget)} млн zł. Сальдо в этом месяце: ${sign(r.net)} млн.`),
        nbp: L(`Bezrobocie: ${fmt(r.unemp)}%. Inflacja: ${fmt(r.inflation)}%.`, `Безработица: ${fmt(r.unemp)}%. Инфляция: ${fmt(r.inflation)}%.`),
      }[sel] || "";
      const bk = b.build, bInfo = bk && BI[bk], proj = st.projects.find(x => x.type === bk), isBuilt = (bk === "piekarnia2" && st.bakeries > 1) || (bk === "nawadnianie" && st.irrigation);
      p.innerHTML = `<button class="gback" data-b="">← ${T.economy}</button><h2>${esc(b.name)}</h2><p class="grole">${inline(b.role)}</p>
        <p class="gextra">${status}</p>
        ${(b.controls || []).map(c => `<label class="gctl" for="c-${c.k}"><span>${c.label}<b id="v-${c.k}"></b></span>
          <input type="range" id="c-${c.k}" min="${c.min}" max="${c.max}" step="${c.step}" value="${st.d[c.k]}" ${st.done ? "disabled" : ""}></label>`).join("")}
        ${b.controls ? `<div class="gforecast" id="gfc"><b>${T.forecast}</b><p class="gsmall">${T.noChange}</p></div>` : ""}
        ${bInfo ? `<div class="gbox"><b>${bInfo.name}</b><p class="gsmall">${bInfo.what}</p>
          ${isBuilt ? `<p class="gverd ok">${L("Zbudowane", "Построено")}</p>` : proj ? `<p class="gverd">${L(`W budowie: zostało ${proj.left} mies.`, `Строится: осталось ${proj.left} мес.`)}</p>`
          : `<button class="gbtn primary" id="gbuild" ${st.done ? "disabled" : ""}>${L("Zbuduj", "Построить")} (${BUILD[bk].cost} ${L("mln", "млн")})</button>`}</div>` : ""}`;
      forecastBase = { ...st.d };
      (b.controls || []).forEach(c => {
        const inp = p.querySelector("#c-" + c.k), out = p.querySelector("#v-" + c.k);
        const show = () => out.textContent = (c.k === "cap" && +inp.value === 0) ? L("brak", "нет") : fmt(+inp.value) + c.unit;
        inp.oninput = () => {
          pause();
          const from = forecastBase[c.k]; st.d[c.k] = +inp.value; show();
          const a = sim(st, forecastBase), bb = sim(st, st.d);
          const lines = from === st.d[c.k] ? [T.noChange] : explainChange(c.k, from, st.d[c.k], a, sim(st, { ...forecastBase, [c.k]: st.d[c.k] }), lang);
          const ratTxt = bb.rational ? L("Po zmianie decyzje są racjonalne (cele spełnione).", "После изменения решения рациональны (цели выполнены).") : L("Po zmianie co najmniej jeden cel nie jest spełniony.", "После изменения хотя бы одна цель не выполнена.");
          p.querySelector("#gfc").innerHTML = `<b>${T.forecast}</b><ul>${lines.map(x => `<li>${inline(x)}</li>`).join("")}</ul><p class="gverd ${bb.rational ? "ok" : "no"}">${ratTxt}</p>`;
          hudPreview();
        };
        show();
      });
      p.querySelector("#gbuild")?.addEventListener("click", () => {
        if (st.budget < BUILD[bk].cost * 0.3){ p.querySelector("#gbuild").insertAdjacentHTML("afterend", `<p class="gverd no">${L("Za mało pieniędzy w budżecie. Podnieś cło, zmniejsz dopłaty albo poczekaj.", "Мало денег в бюджете. Подними пошлину, уменьши дотации или подожди.")}</p>`); return; }
        startBuild(st, bk); st.log.push(L(`Rozpoczęto budowę: ${bInfo.name}. +15 miejsc pracy przy budowie.`, `Начато строительство: ${bInfo.name}. +15 рабочих мест на стройке.`));
        floatText(sel, L("+15 miejsc pracy", "+15 рабочих мест"), true);
        world?.apply(view()); panel(); hud(); labels();
      });
    }
    function hudPreview(){ hud(); }
    function select(id){ sel = id || null; world?.highlight(sel); world?.render(); panel(); labels(); }

    // ---------- modal
    function modal(html, onClose){
      const m = $("#gmodal");
      m.innerHTML = html ? `<div class="gmodal"><div class="gcard">${html}<button class="gbtn primary" id="gclose" style="align-self:flex-end">${T.close} →</button></div></div>` : "";
      m.querySelector("#gclose")?.addEventListener("click", () => { modal(""); onClose?.(); });
      m.querySelector("#grestart")?.addEventListener("click", restart);
      m.querySelectorAll("[data-apply]").forEach(b => b.addEventListener("click", () => { Object.assign(st.d, JSON.parse(b.dataset.apply)); modal(""); panel(); hud(); world?.apply(view()); }));
    }
    const intro = () => { pause(); modal(`<h2>${T.title}</h2><p>${T.brief}</p><div class="gdef">${T.rationalDef}</div><p class="gsmall">${T.how}</p><b>${T.goals}</b><ul>${T.goalList.map(g => `<li>${g}</li>`).join("")}</ul>`); };

    // ---------- doradca: racjonalne vs optymalne
    function advisor(){
      pause();
      const cur = sim(st), best = bestPolicy(st), gap = best.r.W - cur.W;
      const names = { tariff: L("cło", "пошлина"), release: L("rezerwy", "резерв"), subsidy: L("dopłaty", "дотации"), rate: L("stopa NBP", "ставка NBP"), cap: L("cena maks.", "потолок цены") };
      const why = {
        tariff: v => v < st.d.tariff ? L("Brakuje zboża: tańszy import zwiększy podaż. Rolnicy stracą trochę, ale konsumenci zyskają więcej.", "Не хватает зерна: дешёвый импорт увеличит предложение. Фермеры немного потеряют, но потребители выиграют больше.") : L("Zboża jest dość (albo piekarnia jest pełna): wyższe cło chroni rolników i daje wpływy do budżetu.", "Зерна достаточно (или пекарня загружена): более высокая пошлина защищает фермеров и даёт доход бюджету."),
        release: v => v > st.d.release ? L("Teraz jest najtrudniej: lepiej użyć rezerw, póki brakuje zboża.", "Сейчас труднее всего: лучше использовать резерв, пока не хватает зерна.") : L("Zachowaj rezerwy na gorsze miesiące.", "Сохрани резерв на худшие месяцы."),
        subsidy: v => v > st.d.subsidy ? L("Rolnicy są blisko granicy: niewielkie dopłaty utrzymają ich nastroje i przyszłe zbiory.", "Фермеры на грани: небольшие дотации сохранят их настроение и будущие урожаи.") : L("Dopłaty kosztują więcej, niż dają: budżet lepiej wydać inaczej.", "Дотации стоят больше, чем дают: бюджет лучше потратить иначе."),
        rate: v => v > st.d.rate ? L("Wyższa stopa schłodzi popyt i ceny bez dużego wzrostu bezrobocia.", "Более высокая ставка охладит спрос и цены без большого роста безработицы.") : L("Niższa stopa wesprze zatrudnienie.", "Более низкая ставка поддержит занятость."),
        cap: () => L("Cena maksymalna tworzy kolejki i nie zwiększa podaży. Optymalnie jej nie stosować.", "Потолок цены создаёт очереди и не увеличивает предложение. Оптимально его не использовать."),
      };
      const diffs = Object.keys(names).filter(k => best.d[k] !== st.d[k]);
      const endB = cur.budgetAfter + cur.net * (MONTHS - st.m - 1);
      const sustain = endB < GOALS.budget ? L(`<p class="gverd no">Uwaga: przy obecnym saldzie (${sign(cur.net)} mln/mies.) budżet na koniec roku spadnie do ${fmt(endB)} mln. Decyzja, która dziś spełnia cele, za kilka miesięcy przestanie być racjonalna.</p>`, `<p class="gverd no">Внимание: при текущем сальдо (${sign(cur.net)} млн/мес.) бюджет к концу года упадёт до ${fmt(endB)} млн. Решение, которое сегодня выполняет цели, через несколько месяцев перестанет быть рациональным.</p>`) : "";
      const builds = buildAdvice(st);
      const status = cur.rational ? (gap < 1.5 ? L("<b>Twoje decyzje są racjonalne i prawie optymalne.</b>", "<b>Твои решения рациональны и почти оптимальны.</b>") : L(`<b>Twoje decyzje są racjonalne, ale nie optymalne.</b> Cele są spełnione, jednak można osiągnąć o ${fmt(gap)} pkt większy dobrobyt.`, `<b>Твои решения рациональны, но не оптимальны.</b> Цели выполнены, но можно получить на ${fmt(gap)} п. больше благосостояния.`))
        : L(`<b>Twoje decyzje nie są racjonalne:</b> nie wszystkie cele są spełnione. Optymalne ustawienie daje o ${fmt(gap)} pkt więcej dobrobytu${best.r.rational ? " i spełnia cele" : ""}.`, `<b>Твои решения не рациональны:</b> не все цели выполнены. Оптимальные настройки дают на ${fmt(gap)} п. больше благосостояния${best.r.rational ? " и выполняют цели" : ""}.`);
      const bi = buildInfo(lang);
      modal(`<h2>${T.advisor}</h2><div class="gdef">${T.rationalDef}</div><p>${status}</p>${sustain}
        ${diffs.length ? `<b>${L("Co zmienić", "Что изменить")}</b><ul>${diffs.map(k => `<li><b>${names[k]}: ${k === "cap" && !best.d[k] ? L("brak", "нет") : fmt(st.d[k])} → ${k === "cap" && !best.d[k] ? L("brak", "нет") : fmt(best.d[k])}</b>. ${why[k](best.d[k])}</li>`).join("")}</ul>` : ""}
        ${builds.length ? `<b>${L("Inwestycje", "Инвестиции")}</b><ul>${builds.map(t => `<li><b>${bi[t].name}</b>: ${t === "piekarnia2" ? L("popyt rośnie i za kilka miesięcy przekroczy moc jedynej piekarni. Budowa teraz zdąży na czas i da pracę.", "спрос растёт и через несколько месяцев превысит мощность единственной пекарни. Если строить сейчас, успеешь вовремя, плюс рабочие места.") : L("jeszcze zdąży się zwrócić przed końcem roku.", "ещё успеет окупиться до конца года.")}</li>`).join("")}</ul>` : ""}
        <table class="gtbl"><tr><th></th><th>${L("Teraz", "Сейчас")}</th><th>${L("Optymalnie", "Оптимально")}</th></tr>
          <tr><td>${T.bread}</td><td>${fmt(cur.p)} zł</td><td>${fmt(best.r.p)} zł</td></tr>
          <tr><td>${T.farmers}</td><td>${Math.round(cur.farmers)}</td><td>${Math.round(best.r.farmers)}</td></tr>
          <tr><td>${T.unemp}</td><td>${fmt(cur.unemp)}%</td><td>${fmt(best.r.unemp)}%</td></tr>
          <tr><td>${T.budget}</td><td>${sign(cur.net)}</td><td>${sign(best.r.net)}</td></tr>
          <tr class="sum"><td>${T.welfare}</td><td>${Math.round(cur.W)}</td><td>${Math.round(best.r.W)}</td></tr></table>
        ${diffs.length ? `<button class="gbtn" data-apply='${JSON.stringify(best.d)}'>${L("Zastosuj optymalne ustawienia", "Применить оптимальные настройки")}</button>` : ""}`);
      track?.("game", "advisor", Math.round(gap));
    }

    // ---------- czas
    function monthTick(){
      if (st.done) return;
      const prev = st.hist.at(-1)?.r, beforeBudget = st.budget;
      const { r, finished } = advance(st);
      const events = [];
      const mName = `${T.month} ${st.m}`;
      finished.forEach(t => { events.push(L(`Ukończono: ${buildInfo(lang)[t].name}.`, `Построено: ${buildInfo(lang)[t].name}.`)); floatText(t === "piekarnia2" ? "piekarnia" : "farma", t === "piekarnia2" ? L("+20 miejsc pracy", "+20 рабочих мест") : L("+12% zbiorów", "+12% урожая"), true); });
      if (!r.ok.shortage) events.push(L(`Puste półki: brakuje ${fmt(r.shortage)}% chleba${r.capped ? " przez cenę maksymalną" : ""}.`, `Пустые полки: не хватает ${fmt(r.shortage)}% хлеба${r.capped ? " из-за потолка цены" : ""}.`));
      if (!r.ok.price) events.push(L(`Chleb kosztuje ${fmt(r.p)} zł, powyżej celu. ${r.bottleneck === "bakery" ? "Przyczyna: piekarnia nie nadąża za popytem." : "Przyczyna: za mało zboża."}`, `Хлеб стоит ${fmt(r.p)} zł, выше цели. ${r.bottleneck === "bakery" ? "Причина: пекарня не успевает за спросом." : "Причина: мало зерна."}`));
      if (!r.ok.farmers) events.push(L("Rolnicy protestują: ich dochody są za niskie.", "Фермеры протестуют: их доходы слишком низкие."));
      if (!r.ok.unemp) events.push(L(`Bezrobocie ${fmt(r.unemp)}%: za mało miejsc pracy.`, `Безработица ${fmt(r.unemp)}%: мало рабочих мест.`));
      if (!r.ok.budget) events.push(L("Budżet poniżej limitu: trzeba ograniczyć wydatki albo zwiększyć wpływy.", "Бюджет ниже лимита: нужно сократить расходы или увеличить доходы."));
      if (st.reserve <= 0 && r.rel > 0) events.push(L("Rezerwy się skończyły.", "Резерв закончился."));
      if (st.m === 9) events.push(L("Nowe żniwa! Krajowe zbiory wróciły do 100%.", "Новый урожай! Внутренний урожай вернулся к 100%."));
      const line = `${mName}: ${L("chleb", "хлеб")} ${fmt(r.p)} zł, ${T.welfare.toLowerCase()} ${Math.round(r.W)}${r.rational ? "" : " ✗"}`;
      st.log.push(events.length ? `${line}. ${events.join(" ")}` : line);
      if (prev && Math.abs(r.p - prev.p) >= 0.3) floatText("sklep", (r.p > prev.p ? "+" : "") + fmt(r.p - prev.p) + " zł", r.p < prev.p);
      if (Math.abs(st.budget - beforeBudget) >= 0.1) floatText("rzad", sign(st.budget - beforeBudget) + L(" mln", " млн"), st.budget >= beforeBudget);
      track?.("game", "1-m" + st.m, Math.round(r.W));
      world?.apply(view()); hud(); labels(); panel();
      if (st.done){ pause(); finish(); return; }
      if (events.length){ pause(); modal(`<h2>${mName}: ${L("ważne zdarzenia", "важные события")}</h2><ul>${events.map(e => `<li>${inline(e)}</li>`).join("")}</ul><p class="gsmall">${L("Gra jest zatrzymana. Kliknij budynek albo „Doradca”, żeby zareagować.", "Игра на паузе. Нажми на здание или «Советник», чтобы отреагировать.")}</p>`); }
    }
    function play(){ if (st.done || timer) return; modal(""); timer = setInterval(monthTick, 1700 / speed); hud(); }
    function pause(){ if (timer){ clearInterval(timer); timer = null; } if ($("#gplay")) hud(); }
    function finish(){
      const g = grade(st);
      try { const prev = JSON.parse(localStorage.getItem(LS) || "null"); if (prev == null || g.stars > prev) localStorage.setItem(LS, JSON.stringify(g.stars)); } catch {}
      track?.("game", "1-end", Math.round(g.eff));
      modal(`<h2>${L("Koniec roku", "Конец года")}: ${"★".repeat(g.stars)}${"☆".repeat(3 - g.stars)}</h2>
        <table class="gtbl"><tr><td>${L("Miesiące z decyzjami racjonalnymi", "Месяцы с рациональными решениями")}</td><td>${Math.round(g.rationalShare * 12)}/12</td></tr>
          <tr><td>${L("Twój średni dobrobyt", "Твоё среднее благосостояние")}</td><td>${fmt(g.W)}</td></tr>
          <tr><td>${L("Optymalny średni dobrobyt", "Оптимальное среднее благосостояние")}</td><td>${fmt(g.bestW)}</td></tr>
          <tr class="sum"><td>${L("Efektywność", "Эффективность")}</td><td>${Math.round(g.eff)}%</td></tr></table>
        <p>${g.rationalShare === 1 && g.eff >= 97 ? L("Decyzje racjonalne i praktycznie optymalne. Świetnie!", "Решения рациональные и практически оптимальные. Отлично!")
          : g.rationalShare >= 0.75 ? L("Twoje decyzje były w większości racjonalne: cele były spełnione. Różnica do optimum pokazuje, ile dobrobytu zostało „na stole” — np. za wysokie cło, niewykorzystane rezerwy albo spóźniona inwestycja.", "Твои решения были в основном рациональными: цели выполнялись. Разница с оптимумом показывает, сколько благосостояния осталось «на столе» — например, слишком высокая пошлина, неиспользованный резерв или запоздалая инвестиция.")
          : L("Wiele miesięcy nie spełniało celów. Sprawdź doradcę: zwykle problemem jest za mała podaż zboża albo moc piekarni.", "Многие месяцы цели не выполнялись. Загляни к советнику: обычно проблема в малом предложении зерна или мощности пекарни.")}</p>
        <p class="gsmall">${L("Wnioski: przy nieurodzaju najskuteczniej działa zwiększenie podaży (import, rezerwy, inwestycje). Cena maksymalna nie dodaje chleba, tylko tworzy kolejki. Każda decyzja ma koszt dla kogoś: konsumentów, rolników albo budżetu.", "Выводы: при неурожае эффективнее всего увеличивать предложение (импорт, резервы, инвестиции). Потолок цены не добавляет хлеба, а создаёт очереди. У каждого решения есть цена для кого-то: потребителей, фермеров или бюджета.")}</p>
        <button class="gbtn" id="grestart">${T.restart}</button>`);
    }
    function restart(){ pause(); st = newState(); sel = null; host.querySelector(".gfull") ; modal(""); world?.apply(view()); hud(); panel(); labels(); intro(); }

    // ---------- zdarzenia
    host.addEventListener("click", e => { const b = e.target.closest("[data-b]"); if (b) select(b.dataset.b); });
    $("#gplay").onclick = () => timer ? pause() : play();
    $("#gstep").onclick = () => { pause(); monthTick(); };
    $("#gspeed").onclick = () => { speed = speed === 1 ? 2 : 1; if (timer){ pause(); play(); } hud(); };
    $("#gadv").onclick = advisor;
    $("#ginfo").onclick = intro;
    hud(); panel(); intro();

    loadThree().then(THREE => {
      const load = $("#gload");
      let ok = !!THREE;
      if (ok){ try { world = makeScene(THREE, $("#gcv")); } catch (e) { ok = false; } }
      if (!ok){ load.textContent = T.noGL; panel(); return; }
      load.remove();
      world.resize(); world.apply(view()); labels();
      $("#gcv").addEventListener("click", e => { const id = world.pick(e.clientX, e.clientY); select(id); });
      const ro = new ResizeObserver(() => { if (!host.isConnected){ ro.disconnect(); pause(); world.dispose(); return; } world.resize(); labels(); });
      ro.observe($("#gstage"));
    });
    window.addEventListener("hashchange", () => { if (!host.isConnected) pause(); }, { once: true });
  }

  window.BrainstormGame = { mount, _model: { newState, sim, advance, grade, bestPolicy, startBuild } };
})();
