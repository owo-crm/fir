// Brainstorm: mapa szkoleniowa „Nieurodzaj” — diorama 3D (Three.js), czas w dniach, samouczek,
// podpowiedzi nad budynkami. Cel: pokazać różnicę między decyzją RACJONALNĄ (spełnia cele)
// a OPTYMALNĄ (największy dobrobyt).
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

  // ================================================================ MODEL (rozliczenie miesięczne)
  const MONTHS = 12, DAYS = 30, BASE_P = 5;
  const BLOCKADE = [2, 3, 4];                       // miesiące 3–5: blokada importu
  const importMax = m => BLOCKADE.includes(m) ? 12 : 40;
  const BUILD = { piekarnia2: { cost: 12, months: 3, jobs: 20 }, nawadnianie: { cost: 10, months: 4, jobs: 8 } };
  const GOALS = { price: 6.5, shortage: 2, farmInc: 75, budget: -10, unemp: 8 };
  const harvest = m => m < 9 ? 58 + m * 3 : 100;   // susza; nowe żniwa w miesiącu 10

  function newState(){
    return { m: 0, day: 0, done: false, stock: 50, budget: 10, subsidyBoost: 0, bakeries: 1, irrigation: false, projects: [],
      d: { tariff: 30, reserve: 0, subsidy: 0, cap: 0, rate: 5 }, hist: [], log: [] };
  }

  // d.reserve < 0 = kupuj do magazynu, > 0 = uwalniaj
  function sim(st, d = st.d){
    const m = Math.min(st.m, MONTHS - 1);
    const dom = harvest(m) + (st.irrigation ? 12 : 0) + st.subsidyBoost;
    const imax = importMax(m), imp = imax * clamp(1 - d.tariff / 40, 0, 1);
    const rel = d.reserve > 0 ? Math.min(d.reserve, st.stock) : 0;
    const buy = d.reserve < 0 ? -d.reserve : 0;
    const grain = Math.max(1, dom + imp + rel - buy);
    const capacity = 100 * st.bakeries;
    const Q = Math.min(grain, capacity);
    const bottleneck = grain > capacity + 0.5 ? "bakery" : "grain";
    const ds = (1 + 0.015 * m) * (1 - (d.rate - 5) * 0.012);
    const D = p => 100 * ds * Math.pow(BASE_P / p, 0.6);
    let p = BASE_P * Math.pow(100 * ds / Q, 1 / 0.6), shortage = 0, capped = false;
    if (d.cap && d.cap < p){ capped = true; p = d.cap; shortage = Math.max(0, D(p) - Q); }
    const grainPrice = p * Math.pow(Math.min(1, capacity / grain), 1.5);
    const farmInc = (dom * grainPrice + d.subsidy * 10) / 5;          // % normalnego dochodu (100 = zwykły rok)
    const power = clamp(100 * BASE_P / p - shortage * 1.5, 0, 150);    // siła nabywcza: ile chleba za pensję, %
    const building = st.projects.length > 0;
    const employed = 920 + st.bakeries * 20 + (st.irrigation ? 8 : 0) + dom * 0.6 + (building ? 15 : 0) - (d.rate - 5) * 8;
    const unemp = clamp(100 * (1 - employed / 1040), 3, 30);
    const taxes = employed * 0.004, tariffRev = imp * d.tariff * 0.006;
    const spendFixed = 3.0, benefits = unemp * 0.08, reserveCost = rel * 0.08 + buy * 0.15;
    const buildCost = st.projects.reduce((s, pr) => s + BUILD[pr.type].cost / BUILD[pr.type].months, 0);
    const net = taxes + tariffRev - spendFixed - d.subsidy - benefits - reserveCost - buildCost;
    const budgetAfter = st.budget + net;
    const consumers = clamp(power, 0, 100), farmers = clamp(farmInc, 0, 100);
    const jobs = clamp(100 - (unemp - 5) * 10, 0, 100), fiscal = clamp(60 + budgetAfter * 2, 0, 100);
    const W = 0.35 * consumers + 0.25 * farmers + 0.2 * jobs + 0.2 * fiscal;
    const inflation = 2.5 + (p - BASE_P) / BASE_P * 18 - (d.rate - 5) * 0.7;
    const ok = { price: p <= GOALS.price, shortage: shortage <= GOALS.shortage, farmInc: farmInc >= GOALS.farmInc, budget: budgetAfter >= GOALS.budget, unemp: unemp <= GOALS.unemp };
    return { dom, imp, imax, rel, buy, grain, capacity, Q, bottleneck, p, shortage, capped, farmInc, power, unemp, employed, taxes, tariffRev, spendFixed, benefits, reserveCost, buildCost, subsidy: d.subsidy, net, budgetAfter, W, inflation, ok, rational: Object.values(ok).every(Boolean), demandAt5: D(BASE_P), stockAfter: st.stock - rel + buy };
  }

  // Najlepsze decyzje na ten miesiąc + wartość zapasu na przyszłość (planowanie pod blokadę)
  function bestPolicy(st){
    let best = null;
    const left = MONTHS - st.m;
    const stockValue = st.m < BLOCKADE[0] ? 0.22 : 0.02;   // zapas jest cenny tylko przed blokadą
    for (const tariff of [0, 10, 20, 30, 40]) for (const reserve of [-8, -4, 0, 5, 10, 15, 20]) for (const subsidy of [0, 2, 4, 6]) for (const rate of [4, 5, 6, 7]){
      if (reserve > st.stock) continue;
      const d = { tariff, reserve, subsidy, cap: 0, rate };
      const r = sim(st, d);
      const endBudget = r.budgetAfter + r.net * (left - 1);
      const score = r.W + (r.rational ? 4 : 0) + Math.min(0, endBudget - GOALS.budget) * 0.4 + Math.min(r.stockAfter, 40) * stockValue;
      if (!best || score > best.score) best = { d, r, score };
    }
    return best;
  }
  const inProgress = (st, t) => st.projects.some(p => p.type === t);
  function buildAdvice(st){
    const left = MONTHS - st.m, out = [];
    if (st.bakeries < 2 && !inProgress(st, "piekarnia2") && left > 3 && 100 * (1 + 0.015 * (st.m + 3)) > 100 * st.bakeries * 0.97) out.push("piekarnia2");
    if (!st.irrigation && !inProgress(st, "nawadnianie") && left > 5 && st.m < 6) out.push("nawadnianie");
    return out;
  }
  const startBuild = (st, type) => st.projects.push({ type, left: BUILD[type].months });
  function advance(st){
    const before = { ...st, projects: st.projects.map(p => ({ ...p })) };
    const best = bestPolicy(before);
    const r = sim(st);
    st.stock = r.stockAfter; st.budget = r.budgetAfter;
    st.subsidyBoost = Math.min(15, st.subsidyBoost + st.d.subsidy * 0.25);
    const finished = [];
    st.projects.forEach(p => p.left--);
    st.projects = st.projects.filter(p => { if (p.left <= 0){ finished.push(p.type); if (p.type === "piekarnia2") st.bakeries = 2; if (p.type === "nawadnianie") st.irrigation = true; return false; } return true; });
    st.hist.push({ m: st.m, d: { ...st.d }, r, bestW: best.r.W });
    st.m++; st.day = 0; if (st.m >= MONTHS) st.done = true;
    if (st.d.reserve > st.stock) st.d.reserve = Math.floor(st.stock);
    return { r, finished };
  }
  function grade(st){
    const H = st.hist, W = H.reduce((s, h) => s + h.r.W, 0) / H.length, bestW = H.reduce((s, h) => s + h.bestW, 0) / H.length;
    const rationalShare = H.filter(h => h.r.rational).length / H.length;
    const eff = clamp(100 - Math.max(0, bestW - W) * 4, 0, 100);
    const stars = (rationalShare >= 0.75 ? 1 : 0) + (eff >= 90 ? 1 : 0) + (eff >= 97 && rationalShare === 1 ? 1 : 0);
    return { W, bestW, rationalShare, eff, stars };
  }

  // ================================================================ TEKSTY
  const mk = lang => (pl, ru) => lang === "ru" ? ru : pl;
  function texts(lang){
    const L = mk(lang);
    return { L,
      title: L("Nieurodzaj · mapa szkoleniowa", "Неурожай · учебная карта"),
      brief: L("Susza zniszczyła zbiory: rolnicy mają tylko 58% normalnej ilości zboża, a pełne żniwa wrócą w 10. miesiącu. Miasto rośnie, a jedyna piekarnia pracuje już na 100% mocy. Do tego w miesiącach 3–5 import zboża będzie zablokowany. Przez 12 miesięcy rządzisz gospodarką.",
               "Засуха уничтожила урожай: у фермеров только 58% обычного зерна, полный урожай вернётся на 10-й месяц. Город растёт, а единственная пекарня уже работает на 100%. Вдобавок в месяцы 3–5 импорт зерна будет заблокирован. 12 месяцев ты управляешь экономикой."),
      rationalDef: L("<b>Decyzja racjonalna</b> spełnia wszystkie cele (zielone wskaźniki). <b>Decyzja optymalna</b> daje największy możliwy <b>dobrobyt</b>, czyli najlepszy wynik dla wszystkich naraz: konsumentów, rolników, pracowników i budżetu. Każda optymalna decyzja jest racjonalna, ale nie każda racjonalna jest optymalna.",
                     "<b>Рациональное решение</b> выполняет все цели (зелёные показатели). <b>Оптимальное решение</b> даёт максимальное <b>благосостояние</b>, то есть лучший результат для всех сразу: потребителей, фермеров, работников и бюджета. Любое оптимальное решение рационально, но не любое рациональное оптимально."),
      goalList: [
        L(`Chleb ≤ ${fmt(GOALS.price)} zł (normalnie 5 zł)`, `Хлеб ≤ ${fmt(GOALS.price)} zł (обычно 5 zł)`),
        L(`Puste półki (niedobór) ≤ ${GOALS.shortage}%`, `Пустые полки (дефицит) ≤ ${GOALS.shortage}%`),
        L(`Dochód rolników ≥ ${GOALS.farmInc}% normalnego`, `Доход фермеров ≥ ${GOALS.farmInc}% обычного`),
        L(`Bezrobocie ≤ ${GOALS.unemp}%`, `Безработица ≤ ${GOALS.unemp}%`),
        L(`Budżet ≥ ${GOALS.budget} mln zł`, `Бюджет ≥ ${GOALS.budget} млн zł`),
      ],
      day: L("Dzień", "День"), month: L("Miesiąc", "Месяц"), play: L("Start", "Пуск"), pause: L("Pauza", "Пауза"),
      advisor: L("Doradca", "Советник"), economy: L("Gospodarka", "Экономика"),
      bread: L("Chleb", "Хлеб"), shelves: L("Półki", "Полки"), farmInc: L("Dochód rolników", "Доход фермеров"), unemp: L("Bezrobocie", "Безработица"), budget: L("Budżet", "Бюджет"), welfare: L("Dobrobyt", "Благосостояние"),
      full: L("pełne", "полные"), close: L("Dalej", "Дальше"), restart: L("Zagraj jeszcze raz", "Сыграть ещё раз"),
      loading: L("Ładowanie świata…", "Загрузка мира…"), noGL: L("Twoja przeglądarka nie obsługuje 3D. Wybierz budynek z listy:", "Браузер не поддерживает 3D. Выбери здание из списка:"),
      forecast: L("Prognoza na ten miesiąc", "Прогноз на этот месяц"), noChange: L("Przesuń suwak, a zobaczysz skutki zmiany.", "Подвинь ползунок, и увидишь последствия."),
      thisMonth: L("prognoza na ten miesiąc", "прогноз на этот месяц"),
    };
  }
  function statInfo(lang){
    const L = mk(lang);
    return {
      bread: L("<b>Chleb</b>: cena wynika z popytu i podaży. Im mniej chleba (mało zboża albo mała moc piekarni), tym drożej. Normalnie 5 zł, cel ≤ 6,5 zł.", "<b>Хлеб</b>: цена следует из спроса и предложения. Чем меньше хлеба (мало зерна или мала мощность пекарни), тем дороже. Обычно 5 zł, цель ≤ 6,5 zł."),
      shelves: L("<b>Półki</b>: czy chleba wystarcza dla wszystkich chętnych przy obecnej cenie. Braki pojawiają się, gdy rząd ustawi cenę maksymalną poniżej ceny rynkowej.", "<b>Полки</b>: хватает ли хлеба всем желающим по текущей цене. Дефицит появляется, если правительство установит потолок ниже рыночной цены."),
      farmInc: L("<b>Dochód rolników</b> w % zwykłego roku (100% = normalnie). Zależy od zbiorów, ceny zboża i dopłat. Tani import i nadmiar zboża obniżają ich dochód. Cel ≥ 75%.", "<b>Доход фермеров</b> в % от обычного года (100% = норма). Зависит от урожая, цены зерна и дотаций. Дешёвый импорт и избыток зерна снижают их доход. Цель ≥ 75%."),
      unemp: L("<b>Bezrobocie</b>: odsetek osób bez pracy. Spada, gdy powstają zakłady i budowy; rośnie przy wysokich stopach NBP. Cel ≤ 8%.", "<b>Безработица</b>: доля людей без работы. Падает, когда появляются предприятия и стройки; растёт при высоких ставках NBP. Цель ≤ 8%."),
      budget: L("<b>Budżet</b> państwa w mln zł. Wpływy: podatki pracujących i cło. Wydatki: usługi publiczne, zasiłki, dopłaty, rezerwy, budowy. Cel ≥ −10 mln.", "<b>Бюджет</b> в млн zł. Доходы: налоги работающих и пошлины. Расходы: госуслуги, пособия, дотации, резервы, стройки. Цель ≥ −10 млн."),
      welfare: L("<b>Dobrobyt</b> (0–100): wspólna ocena — siła nabywcza konsumentów 35%, dochód rolników 25%, praca 20%, budżet 20%. Decyzja optymalna daje najwyższy dobrobyt.", "<b>Благосостояние</b> (0–100): общая оценка — покупательная способность 35%, доход фермеров 25%, работа 20%, бюджет 20%. Оптимальное решение даёт максимальное благосостояние."),
    };
  }
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
        role: L("Państwowy magazyn zboża. Możesz <b>dokupować</b> zboże (kosztuje i zmniejsza podaż teraz) albo je <b>uwalniać</b> (zwiększa podaż od razu). Zapas robi się, gdy zboża jest dużo, a wydaje w kryzysie — np. w czasie blokady importu w miesiącach 3–5.", "Государственный склад зерна. Можно <b>докупать</b> зерно (стоит денег и уменьшает предложение сейчас) или <b>выпускать</b> его (сразу увеличивает предложение). Запас делают, когда зерна много, и тратят в кризис — например во время блокады импорта в месяцы 3–5."),
        controls: [{ k: "reserve", min: -10, max: 20, step: 1, unit: "%", label: L("Kupuj (−) / uwalniaj (+) co miesiąc", "Покупать (−) / выпускать (+) каждый месяц") }] },
      nbp: { name: "NBP",
        role: L("Narodowy Bank Polski ustala [[stopa-referencyjna|stopę referencyjną]]. Wyższa stopa: droższy kredyt, mniejszy popyt i inflacja, ale firmy mniej zatrudniają.", "Национальный банк Польши устанавливает [[stopa-referencyjna|референсную ставку]]. Выше ставка: дороже кредит, меньше спрос и инфляция, но фирмы меньше нанимают."),
        controls: [{ k: "rate", min: 2, max: 9, step: 0.5, unit: "%", label: L("Stopa referencyjna", "Референсная ставка") }] },
      farma: { name: L("Farma", "Ферма"), role: L("Krajowa [[podaz|podaż]] zboża. Po suszy zbiory są małe, odbudują się przy nowych żniwach (miesiąc 10). Nawadnianie daje +12% zbiorów na stałe.", "Внутреннее [[podaz|предложение]] зерна. После засухи урожай мал, восстановится к новому урожаю (месяц 10). Орошение даёт +12% урожая навсегда."), build: "nawadnianie" },
      piekarnia: { name: L("Piekarnia", "Пекарня"), role: L("Zamienia zboże w chleb. Moc: 100% normalnego popytu. Gdy zboża jest więcej niż mocy, nadwyżka leży w magazynach, a cena zboża dla rolników spada.", "Превращает зерно в хлеб. Мощность: 100% обычного спроса. Если зерна больше мощности, излишек лежит на складах, а цена зерна для фермеров падает."), build: "piekarnia2" },
      sklep: { name: L("Sklep", "Магазин"), role: L("Tu [[popyt|popyt]] mieszkańców spotyka się z podażą chleba. Chleb to dobro podstawowe: ludzie kupują go prawie tyle samo nawet po podwyżce, więc brak towaru mocno podnosi cenę.", "Здесь [[popyt|спрос]] жителей встречается с предложением хлеба. Хлеб — базовый товар: его покупают почти столько же даже после подорожания, поэтому нехватка сильно поднимает цену.") },
      granica: { name: L("Import", "Импорт"), role: L("Ciężarówki z zagranicznym zbożem. Ile przyjedzie, zależy od cła. Import zwiększa podaż, ale konkuruje z krajowymi rolnikami. W miesiącach 3–5 import jest zablokowany (max 12%).", "Грузовики с иностранным зерном. Сколько приедет, зависит от пошлины. Импорт увеличивает предложение, но конкурирует с местными фермерами. В месяцы 3–5 импорт заблокирован (макс. 12%).") },
    };
  }
  function buildInfo(lang){
    const L = mk(lang);
    return {
      piekarnia2: { name: L("Druga piekarnia", "Вторая пекарня"), what: L(`Koszt ${BUILD.piekarnia2.cost} mln zł (płatne przez ${BUILD.piekarnia2.months} mies.), budowa ${BUILD.piekarnia2.months} mies. Podwaja moc wypieku i daje ${BUILD.piekarnia2.jobs} stałych miejsc pracy (+15 przy budowie). Ale więcej chleba wymaga więcej zboża: rolnicy go nie mają, więc trzeba będzie importować.`, `Стоит ${BUILD.piekarnia2.cost} млн zł (оплата ${BUILD.piekarnia2.months} мес.), строится ${BUILD.piekarnia2.months} мес. Удваивает мощность и даёт ${BUILD.piekarnia2.jobs} постоянных рабочих мест (+15 на стройке). Но больше хлеба требует больше зерна: у фермеров его нет, придётся импортировать.`) },
      nawadnianie: { name: L("Nawadnianie pól", "Орошение полей"), what: L(`Koszt ${BUILD.nawadnianie.cost} mln zł, budowa ${BUILD.nawadnianie.months} mies. Na stałe +12% zbiorów i ${BUILD.nawadnianie.jobs} miejsc pracy. Zwraca się po kilku miesiącach: im później, tym mniej się opłaca.`, `Стоит ${BUILD.nawadnianie.cost} млн zł, строится ${BUILD.nawadnianie.months} мес. Навсегда +12% урожая и ${BUILD.nawadnianie.jobs} рабочих мест. Окупается через несколько месяцев: чем позже, тем менее выгодно.`) },
    };
  }

  function explainChange(k, from, to, a, b, st, lang){
    const L = mk(lang), up = to > from, out = [];
    if (k === "tariff"){
      out.push(up ? L(`Cło ${fmt(from)}% → ${fmt(to)}%: import droższy, spadnie do ${fmt(b.imp)}% potrzeb (było ${fmt(a.imp)}%).`, `Пошлина ${fmt(from)}% → ${fmt(to)}%: импорт дороже, упадёт до ${fmt(b.imp)}% потребности (было ${fmt(a.imp)}%).`)
                  : L(`Cło ${fmt(from)}% → ${fmt(to)}%: import wzrośnie do ${fmt(b.imp)}% potrzeb (było ${fmt(a.imp)}%).`, `Пошлина ${fmt(from)}% → ${fmt(to)}%: импорт вырастет до ${fmt(b.imp)}% потребности (было ${fmt(a.imp)}%).`));
      if (BLOCKADE.includes(st.m)) out.push(L("Trwa blokada importu: nawet zerowe cło da najwyżej 12%.", "Идёт блокада импорта: даже нулевая пошлина даст максимум 12%."));
      if (b.bottleneck === "bakery") out.push(L("Piekarnia pracuje na 100% mocy: dodatkowe zboże nie zamieni się w chleb, tylko obniży cenę zboża dla rolników.", "Пекарня работает на 100%: лишнее зерно не превратится в хлеб, а лишь снизит цену зерна для фермеров."));
      out.push(up ? L("Krajowi rolnicy zyskują (mniej konkurencji), konsumenci płacą więcej.", "Местные фермеры выигрывают (меньше конкуренции), потребители платят больше.")
                  : L("Konsumenci zyskują na tańszym chlebie, ale lokalni rolnicy tracą: tańsze zboże z importu obniża ich dochód.", "Потребители выигрывают от дешёвого хлеба, но местные фермеры теряют: дешёвое импортное зерно снижает их доход."));
    }
    if (k === "subsidy") out.push(up ? L(`Dopłaty ${fmt(from)} → ${fmt(to)} mln/mies.: dochód rolników rośnie, a w kolejnych miesiącach zasieją więcej. Koszt: ${fmt(to - from)} mln co miesiąc.`, `Дотации ${fmt(from)} → ${fmt(to)} млн/мес.: доход фермеров растёт, в следующие месяцы они посеют больше. Стоимость: ${fmt(to - from)} млн каждый месяц.`)
                                      : L(`Mniejsze dopłaty: oszczędzasz ${fmt(from - to)} mln/mies., ale rolnicy tracą dochód.`, `Меньше дотаций: экономишь ${fmt(from - to)} млн/мес., но фермеры теряют доход.`));
    if (k === "cap") out.push(b.capped ? L(`Cena maksymalna ${fmt(to)} zł jest niższa od rynkowej. Nie dodaje ani jednego bochenka: brakuje ${fmt(b.shortage)}% chleba, powstają kolejki.`, `Потолок ${fmt(to)} zł ниже рыночной цены. Он не добавляет ни одной буханки: не хватает ${fmt(b.shortage)}% хлеба, появляются очереди.`) : L("Cena maksymalna jest wyższa od rynkowej, więc nic nie zmienia.", "Потолок выше рыночной цены, поэтому ничего не меняет."));
    if (k === "reserve"){
      if (to > 0) out.push(L(`Uwalniasz ${fmt(b.rel)}% z magazynu: podaż od razu rośnie. Zostanie ${fmt(b.stockAfter)}% zapasu.${st.m < BLOCKADE[0] ? " Uwaga: blokada importu dopiero się zbliża — wtedy zapas będzie cenniejszy." : ""}`, `Выпускаешь ${fmt(b.rel)}% со склада: предложение сразу растёт. Останется ${fmt(b.stockAfter)}% запаса.${st.m < BLOCKADE[0] ? " Внимание: блокада импорта ещё впереди — тогда запас будет ценнее." : ""}`));
      else if (to < 0) out.push(L(`Dokupujesz ${fmt(b.buy)}% zboża do magazynu: teraz na rynku jest go mniej (chleb drożeje), ale zapas wzrośnie do ${fmt(b.stockAfter)}% na gorsze czasy.`, `Докупаешь ${fmt(b.buy)}% зерна на склад: сейчас на рынке его меньше (хлеб дорожает), но запас вырастет до ${fmt(b.stockAfter)}% на чёрный день.`));
      else out.push(L("Magazyn bez zmian.", "Склад без изменений."));
    }
    if (k === "rate") out.push(up ? L(`Stopa ${fmt(from)}% → ${fmt(to)}%: kredyty drożeją, ludzie i firmy mniej wydają. Inflacja spada, bezrobocie rośnie (${fmt(a.unemp)}% → ${fmt(b.unemp)}%).`, `Ставка ${fmt(from)}% → ${fmt(to)}%: кредиты дорожают, люди и фирмы тратят меньше. Инфляция падает, безработица растёт (${fmt(a.unemp)}% → ${fmt(b.unemp)}%).`)
                                  : L(`Stopa ${fmt(from)}% → ${fmt(to)}%: tańszy kredyt pobudza popyt i zatrudnienie, ale przy braku chleba podnosi cenę i inflację.`, `Ставка ${fmt(from)}% → ${fmt(to)}%: дешёвый кредит подстёгивает спрос и занятость, но при нехватке хлеба поднимает цену и инфляцию.`));
    out.push(L(`Bilans: chleb ${fmt(a.p)} → ${fmt(b.p)} zł, dochód rolników ${Math.round(a.farmInc)} → ${Math.round(b.farmInc)}%, bezrobocie ${fmt(a.unemp)} → ${fmt(b.unemp)}%, saldo budżetu ${sign(a.net)} → ${sign(b.net)} mln. Dobrobyt ${sign(b.W - a.W)} pkt.`,
               `Итог: хлеб ${fmt(a.p)} → ${fmt(b.p)} zł, доход фермеров ${Math.round(a.farmInc)} → ${Math.round(b.farmInc)}%, безработица ${fmt(a.unemp)} → ${fmt(b.unemp)}%, сальдо бюджета ${sign(a.net)} → ${sign(b.net)} млн. Благосостояние ${sign(b.W - a.W)} п.`));
    return out;
  }

  // Podpowiedzi nad budynkami
  function hints(st, lang){
    const L = mk(lang), r = sim(st), out = {};
    if (st.done) return out;
    if (BLOCKADE.includes(st.m)) out.granica = L("Blokada importu (mies. 3–5)", "Блокада импорта (мес. 3–5)");
    else if (r.bottleneck === "grain" && r.p > GOALS.price && st.d.tariff > 10) out.granica = L("Za mało zboża — obniż cło?", "Мало зерна — снизить пошлину?");
    if (st.m < BLOCKADE[0]) out.rezerwy = L(`Blokada za ${BLOCKADE[0] - st.m} mies. — oszczędzaj zapas`, `Блокада через ${BLOCKADE[0] - st.m} мес. — береги запас`);
    else if (BLOCKADE.includes(st.m) && st.stock > 0 && st.d.reserve < 15) out.rezerwy = L("Kryzys — czas uwolnić rezerwy", "Кризис — пора выпускать резерв");
    else if (st.m >= 9 && st.stock < 30 && st.d.reserve >= 0) out.rezerwy = L("Po żniwach dużo zboża — dokup zapas", "После урожая зерна много — пополни запас");
    if (st.bakeries < 2 && !inProgress(st, "piekarnia2") && MONTHS - st.m > 3 && 100 * (1 + 0.015 * (st.m + 3)) > 97) out.piekarnia = L("Za ~3 mies. zabraknie mocy — buduj?", "Через ~3 мес. не хватит мощности — строить?");
    if (r.farmInc < GOALS.farmInc) out.farma = L(`Dochód ${Math.round(r.farmInc)}% — dopłaty?`, `Доход ${Math.round(r.farmInc)}% — дотации?`);
    if (r.capped && r.shortage > GOALS.shortage) out.sklep = L("Kolejki! Cena maks. tworzy niedobór", "Очереди! Потолок цены создаёт дефицит");
    const endB = r.budgetAfter + r.net * (MONTHS - st.m - 1);
    if (endB < GOALS.budget) out.rzad = L("Budżet nie wytrzyma do końca roku", "Бюджета не хватит до конца года");
    if (r.unemp > GOALS.unemp) out.nbp = L("Wysokie bezrobocie — obniż stopę?", "Высокая безработица — снизить ставку?");
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
    const T = texts(lang), B = buildings(lang), BI = buildInfo(lang), SI = statInfo(lang), L = T.L;
    let st = newState(), sel = null, world = null, timer = null, speed = 1, forecastBase = null, tutorial = null;
    const LS = "makro2.game1", LS_TUT = "makro2.game1.tut";

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull"; document.body.appendChild(host); document.body.classList.add("gaming");
    host.innerHTML = `<div class="gtop">
        <div class="grow">
          <a class="gbtn" href="#start" aria-label="${L("Wyjdź", "Выйти")}">✕</a>
          <b class="gtitle">${T.title}</b>
          <div class="gclock"><span id="gdate"></span><i><b id="gbar"></b></i></div>
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
        <div class="gstage" id="gstage"><canvas id="gcv" aria-label="${T.title}"></canvas><div class="glabels" id="glabels"></div><div class="gfx" id="gfx"></div><div class="gload" id="gload">${T.loading}</div></div>
        <aside class="gpanel" id="gpanel"></aside>
        <div id="gmodal"></div>
        <div id="gtut"></div>
      </div>`;
    const $ = s => host.querySelector(s);

    const view = () => { const r = sim(st); return {
      harvest: harvest(Math.min(st.m, MONTHS - 1)) + (st.irrigation ? 12 : 0) + st.subsidyBoost,
      imports: r.imp, shortage: r.shortage, load: r.Q / r.capacity, stock: st.stock, blockade: BLOCKADE.includes(st.m),
      underConstruction: st.projects.map(p => p.type),
      built: [...(st.bakeries > 1 ? ["piekarnia2"] : []), ...(st.irrigation ? ["nawadnianie"] : [])] }; };

    function hud(){
      const r = sim(st);
      const chip = (k, val, bad) => `<button class="gstat ${bad ? "bad" : ""}" data-info="${k}"><span>${T[k]}</span><b>${val}</b></button>`;
      $("#gstats").innerHTML = [
        chip("bread", fmt(r.p) + " zł", !r.ok.price),
        chip("shelves", r.shortage > 0.5 ? "−" + Math.round(r.shortage) + "%" : T.full, !r.ok.shortage),
        chip("farmInc", Math.round(r.farmInc) + "%", !r.ok.farmInc),
        chip("unemp", fmt(r.unemp) + "%", !r.ok.unemp),
        chip("budget", fmt(r.budgetAfter) + L(" mln", " млн"), !r.ok.budget),
        chip("welfare", Math.round(r.W), false),
      ].join("");
      $("#gdate").textContent = st.done ? L("Koniec roku", "Конец года") : `${T.day} ${st.day + 1} · ${T.month} ${st.m + 1}/${MONTHS}${BLOCKADE.includes(st.m) ? L(" · blokada", " · блокада") : ""}`;
      $("#gbar").style.width = (st.done ? 100 : (st.day / DAYS) * 100) + "%";
      $("#gplay").textContent = timer ? "⏸ " + T.pause : "▶ " + T.play;
      $("#gplay").disabled = st.done;
      $("#gspeed").textContent = "×" + speed;
    }

    function labels(){
      if (!world) return;
      const all = hints(st, lang), H = {};
      const order = ["rezerwy", "sklep", "granica", "piekarnia", "farma", "rzad", "nbp"];
      order.filter(id => all[id]).slice(0, matchMedia("(max-width:900px)").matches ? 2 : 4).forEach(id => H[id] = all[id]);
      const ids = ["rzad", "nbp", "rezerwy", "farma", "piekarnia", "sklep", "granica", ...view().built];
      const names = { ...Object.fromEntries(Object.entries(B).map(([k, v]) => [k, v.name])), piekarnia2: BI.piekarnia2.name, nawadnianie: BI.nawadnianie.name };
      $("#glabels").innerHTML = ids.map(id => { const p = world.screenPos(id), W = $("#gstage").clientWidth, x = H[id] ? clamp(p.x, 85, W - 85) : p.x; return `<button class="glabel ${sel === id ? "on" : ""} ${H[id] ? "hint" : ""}" data-b="${id}" style="left:${x}px;top:${Math.max(H[id] ? 54 : 30, p.y)}px">${H[id] ? `<em>${esc(H[id])}</em>` : ""}<span>${esc(names[id])}</span></button>`; }).join("");
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
          <ul class="ggoal">${okRow(r.ok.price, T.goalList[0] + ` → ${fmt(r.p)} zł`)}${okRow(r.ok.shortage, T.goalList[1] + ` → ${fmt(r.shortage)}%`)}${okRow(r.ok.farmInc, T.goalList[2] + ` → ${Math.round(r.farmInc)}%`)}${okRow(r.ok.unemp, T.goalList[3] + ` → ${fmt(r.unemp)}%`)}${okRow(r.ok.budget, T.goalList[4] + ` → ${fmt(r.budgetAfter)}`)}</ul>
          <p class="gverd ${r.rational ? "ok" : "no"}">${r.rational ? L("Decyzje racjonalne: wszystkie cele spełnione.", "Решения рациональны: все цели выполнены.") : L("Decyzje nieracjonalne: nie wszystkie cele są spełnione.", "Решения нерациональны: не все цели выполнены.")} ${T.welfare}: <b>${Math.round(r.W)}</b></p></div>
        <div class="gbox"><b>${L("Budżet w tym miesiącu (mln zł)", "Бюджет в этом месяце (млн zł)")}</b>
          <table class="gtbl"><tr><td>${L("Podatki od pracujących", "Налоги работающих")}</td><td>+${fmt(r.taxes)}</td></tr><tr><td>${L("Cło", "Пошлина")}</td><td>+${fmt(r.tariffRev)}</td></tr>
          <tr><td>${L("Usługi publiczne", "Госуслуги")}</td><td>−${fmt(r.spendFixed)}</td></tr><tr><td>${L("Zasiłki", "Пособия")}</td><td>−${fmt(r.benefits)}</td></tr>
          <tr><td>${L("Dopłaty", "Дотации")}</td><td>−${fmt(r.subsidy)}</td></tr><tr><td>${L("Rezerwy", "Резерв")}</td><td>−${fmt(r.reserveCost)}</td></tr><tr><td>${L("Budowy", "Стройки")}</td><td>−${fmt(r.buildCost)}</td></tr>
          <tr class="sum"><td>${L("Saldo", "Сальдо")}</td><td>${sign(r.net)}</td></tr></table>
          <p class="gsmall">${L("Więcej pracujących = więcej podatków i mniej zasiłków.", "Больше работающих — больше налогов и меньше пособий.")}</p></div>
        ${st.log.length ? `<div class="gbox"><b>${L("Dziennik", "Журнал")}</b><ul class="glog">${st.log.slice(-4).reverse().map(x => `<li>${inline(x)}</li>`).join("")}</ul></div>` : ""}
        </div>`;
    }
    function panel(){
      const p = $("#gpanel");
      if (!sel){ p.innerHTML = overviewPanel() + (!world ? `<div class="glist">${Object.keys(B).map(id => `<button class="gbtn" data-b="${id}">${esc(B[id].name)}</button>`).join("")}</div>` : ""); return; }
      if (sel === "piekarnia2" || sel === "nawadnianie"){ p.innerHTML = `<div class="gph"><button class="gback" data-b="">← ${T.economy}</button><button class="gcol" data-col>▾</button></div><div class="gpb"><h2>${BI[sel].name}</h2><p class="grole">${BI[sel].what}</p></div>`; return; }
      const b = B[sel], r = sim(st), H = hints(st, lang);
      const status = {
        farma: L(`Zbiory: ${fmt(r.dom)}% normy. Dochód rolników: ${Math.round(r.farmInc)}% normalnego.`, `Урожай: ${fmt(r.dom)}% нормы. Доход фермеров: ${Math.round(r.farmInc)}% обычного.`),
        piekarnia: L(`Moc: ${r.capacity}%. Zboże: ${fmt(r.grain)}%. ${r.bottleneck === "bakery" ? "Wąskie gardło: piekarnia." : "Wąskie gardło: zboże."} Popyt przy 5 zł: ${fmt(r.demandAt5)}%.`, `Мощность: ${r.capacity}%. Зерно: ${fmt(r.grain)}%. ${r.bottleneck === "bakery" ? "Узкое место: пекарня." : "Узкое место: зерно."} Спрос при 5 zł: ${fmt(r.demandAt5)}%.`),
        sklep: L(`Chleb: ${fmt(r.p)} zł. ${r.shortage > 0.5 ? `Brakuje ${fmt(r.shortage)}% chleba.` : "Półki pełne."}`, `Хлеб: ${fmt(r.p)} zł. ${r.shortage > 0.5 ? `Не хватает ${fmt(r.shortage)}% хлеба.` : "Полки полные."}`),
        granica: L(`Przyjeżdża ${fmt(r.imp)}% zboża (max ${r.imax}%).`, `Приезжает ${fmt(r.imp)}% зерна (макс. ${r.imax}%).`),
        rezerwy: L(`W magazynie: ${fmt(st.stock)}%.`, `На складе: ${fmt(st.stock)}%.`),
        rzad: L(`Budżet: ${fmt(st.budget)} mln. Saldo w tym miesiącu: ${sign(r.net)} mln.`, `Бюджет: ${fmt(st.budget)} млн. Сальдо в этом месяце: ${sign(r.net)} млн.`),
        nbp: L(`Bezrobocie: ${fmt(r.unemp)}%. Inflacja: ${fmt(r.inflation)}%.`, `Безработица: ${fmt(r.unemp)}%. Инфляция: ${fmt(r.inflation)}%.`),
      }[sel] || "";
      const bk = b.build, bInfo = bk && BI[bk], proj = st.projects.find(x => x.type === bk), isBuilt = (bk === "piekarnia2" && st.bakeries > 1) || (bk === "nawadnianie" && st.irrigation);
      p.innerHTML = `<div class="gph"><button class="gback" data-b="">← ${T.economy}</button><button class="gcol" data-col>▾</button></div>
        <div class="gpb"><h2>${esc(b.name)}</h2>${H[sel] ? `<p class="ghint">${esc(H[sel])}</p>` : ""}<p class="grole">${inline(b.role)}</p>
        <p class="gextra">${status} <span class="gsmall">(${T.thisMonth})</span></p>
        ${(b.controls || []).map(c => `<label class="gctl" for="c-${c.k}"><span>${c.label}<b id="v-${c.k}"></b></span>
          <input type="range" id="c-${c.k}" min="${c.min}" max="${c.k === "reserve" ? Math.min(c.max, Math.floor(st.stock)) : c.max}" step="${c.step}" value="${st.d[c.k]}" ${st.done ? "disabled" : ""}></label>`).join("")}
        ${b.controls ? `<div class="gforecast" id="gfc"><b>${T.forecast}</b><p class="gsmall">${T.noChange}</p></div>` : ""}
        ${bInfo ? `<div class="gbox"><b>${bInfo.name}</b><p class="gsmall">${bInfo.what}</p>
          ${isBuilt ? `<p class="gverd ok">${L("Zbudowane", "Построено")}</p>` : proj ? `<p class="gverd">${L(`W budowie: zostało ${proj.left} mies.`, `Строится: осталось ${proj.left} мес.`)}</p>`
          : `<button class="gbtn primary" id="gbuild" ${st.done ? "disabled" : ""}>${L("Zbuduj", "Построить")} (${BUILD[bk].cost} ${L("mln", "млн")})</button>`}</div>` : ""}</div>`;
      forecastBase = { ...st.d };
      (b.controls || []).forEach(c => {
        const inp = p.querySelector("#c-" + c.k), out = p.querySelector("#v-" + c.k);
        const show = () => { const v = +inp.value; out.textContent = (c.k === "cap" && v === 0) ? L("brak", "нет") : c.k === "reserve" ? (v < 0 ? L(`kupuj ${-v}%`, `покупать ${-v}%`) : v > 0 ? L(`uwalniaj ${v}%`, `выпускать ${v}%`) : "0") : fmt(v) + c.unit; };
        inp.oninput = () => {
          pause();
          const from = forecastBase[c.k]; st.d[c.k] = +inp.value; show();
          const a = sim(st, forecastBase), bb = sim(st, st.d);
          const lines = from === st.d[c.k] ? [T.noChange] : explainChange(c.k, from, st.d[c.k], a, sim(st, { ...forecastBase, [c.k]: st.d[c.k] }), st, lang);
          p.querySelector("#gfc").innerHTML = `<b>${T.forecast}</b><ul>${lines.map(x => `<li>${inline(x)}</li>`).join("")}</ul><p class="gverd ${bb.rational ? "ok" : "no"}">${bb.rational ? L("Po zmianie decyzje są racjonalne.", "После изменения решения рациональны.") : L("Po zmianie co najmniej jeden cel nie jest spełniony.", "После изменения хотя бы одна цель не выполнена.")}</p>`;
          hud(); labels(); world?.apply(view());
        };
        show();
      });
      p.querySelector("#gbuild")?.addEventListener("click", () => {
        if (st.budget < BUILD[bk].cost * 0.3){ p.querySelector("#gbuild").insertAdjacentHTML("afterend", `<p class="gverd no">${L("Za mało pieniędzy. Podnieś cło, zmniejsz dopłaty albo poczekaj.", "Мало денег. Подними пошлину, уменьши дотации или подожди.")}</p>`); return; }
        startBuild(st, bk); st.log.push(L(`Rozpoczęto budowę: ${bInfo.name}. +15 miejsc pracy przy budowie.`, `Начато строительство: ${bInfo.name}. +15 рабочих мест на стройке.`));
        floatText(sel, L("+15 miejsc pracy", "+15 рабочих мест"), true);
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
      return [
        { t: null, h: L("Witaj na mapie szkoleniowej", "Добро пожаловать на учебную карту"), b: `<p>${T.brief}</p><div class="gdef">${T.rationalDef}</div>` },
        { t: "#gstats", h: L("Wskaźniki na górze", "Показатели сверху"), b: `<p>${L("Pokazują prognozę na <b>bieżący miesiąc</b> przy Twoich decyzjach — te same liczby zobaczysz w budynkach. Zielone = cel spełniony, czerwone = nie. Dotknij wskaźnika, aby w każdej chwili zobaczyć jego opis.", "Показывают прогноз на <b>текущий месяц</b> при твоих решениях — те же цифры будут в зданиях. Зелёный = цель выполнена, красный = нет. Нажми на показатель, чтобы в любой момент увидеть описание.")}</p><ul class="gtutl">${Object.values(SI).map(x => `<li>${x}</li>`).join("")}</ul>` },
        ...["rzad", "nbp", "rezerwy", "farma", "piekarnia", "sklep", "granica"].map(id => ({ t: `.glabel[data-b="${id}"]`, id, h: B[id].name, b: `<p>${inline(B[id].role)}</p>` + (B[id].controls ? `<p class="gsmall">${L("Decyzje tutaj: ", "Решения здесь: ")}${B[id].controls.map(c => c.label).join("; ")}.</p>` : B[id].build ? `<p class="gsmall">${L("Tutaj zlecisz budowę: ", "Здесь можно заказать стройку: ")}${BI[B[id].build].name}.</p>` : "") })),
        { t: "#gadv", h: T.advisor, b: `<p>${L("Doradca porównuje Twoje decyzje z optymalnymi i tłumaczy różnicę. Żółte dymki nad budynkami podpowiadają, co warto zmienić teraz.", "Советник сравнивает твои решения с оптимальными и объясняет разницу. Жёлтые пузыри над зданиями подсказывают, что стоит изменить сейчас.")}</p>` },
        { t: "#gplay", h: L("Czas", "Время"), b: `<p>${L("▶ uruchamia czas: dzień po dniu, pasek obok daty pokazuje postęp miesiąca. Na koniec miesiąca dostaniesz podsumowanie. Gra sama zatrzyma się przy ważnym zdarzeniu.", "▶ запускает время: день за днём, полоска рядом с датой показывает прогресс месяца. В конце месяца будет итог. Игра сама встанет на паузу при важном событии.")}</p><p><b>${L("Pierwsze zadanie: kliknij Import albo Rząd, zmień cło i zobacz prognozę. Potem naciśnij ▶.", "Первое задание: нажми на Импорт или Правительство, измени пошлину и посмотри прогноз. Потом нажми ▶.")}</b></p>` },
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
    function endTut(){ tutorial = null; $("#gtut").innerHTML = ""; try { localStorage.setItem(LS_TUT, "1"); } catch {} world?.highlight(sel); world?.render(); panel(); labels(); }
    function startTut(){ pause(); modal(""); sel = null; panel(); showTut(0); }

    // ---------- doradca
    function advisor(){
      pause();
      const cur = sim(st), best = bestPolicy(st), gap = best.r.W - cur.W;
      const names = { tariff: L("cło", "пошлина"), reserve: L("rezerwy", "резерв"), subsidy: L("dopłaty", "дотации"), rate: L("stopa NBP", "ставка NBP"), cap: L("cena maks.", "потолок цены") };
      const why = {
        tariff: v => v < st.d.tariff ? L("Brakuje zboża: tańszy import zwiększy podaż. Rolnicy stracą trochę, konsumenci zyskają więcej.", "Не хватает зерна: дешёвый импорт увеличит предложение. Фермеры немного потеряют, потребители выиграют больше.") : L("Zboża jest dość (albo piekarnia jest pełna): wyższe cło chroni rolników i daje wpływy.", "Зерна достаточно (или пекарня загружена): более высокая пошлина защищает фермеров и даёт доход."),
        reserve: v => v > st.d.reserve ? (v > 0 ? L("Teraz jest najtrudniej: użyj zapasu.", "Сейчас труднее всего: используй запас.") : L("Kupuj mniej do magazynu: teraz zboże jest potrzebniejsze na rynku.", "Покупай меньше на склад: сейчас зерно нужнее на рынке.")) : (v < 0 ? L("Zboża jest teraz sporo: dokup zapas na gorsze czasy.", "Зерна сейчас много: докупи запас на чёрный день.") : L("Oszczędzaj zapas: blokada importu jest przed Tobą, wtedy będzie cenniejszy.", "Береги запас: блокада импорта впереди, тогда он будет ценнее.")),
        subsidy: v => v > st.d.subsidy ? L("Dochód rolników jest blisko granicy: dopłaty go utrzymają i zwiększą przyszłe zbiory.", "Доход фермеров на грани: дотации удержат его и увеличат будущие урожаи.") : L("Dopłaty kosztują więcej, niż dają.", "Дотации стоят больше, чем дают."),
        rate: v => v > st.d.rate ? L("Wyższa stopa schłodzi ceny bez dużego wzrostu bezrobocia.", "Более высокая ставка охладит цены без большого роста безработицы.") : L("Niższa stopa wesprze zatrudnienie.", "Более низкая ставка поддержит занятость."),
        cap: () => L("Cena maksymalna tworzy kolejki i nie zwiększa podaży. Optymalnie jej nie stosować.", "Потолок цены создаёт очереди и не увеличивает предложение. Оптимально его не использовать."),
      };
      const vfmt = (k, v) => k === "cap" && !v ? L("brak", "нет") : k === "reserve" ? (v < 0 ? L(`kupuj ${-v}`, `покупать ${-v}`) : v > 0 ? L(`uwalniaj ${v}`, `выпускать ${v}`) : "0") : fmt(v);
      const diffs = Object.keys(names).filter(k => best.d[k] !== st.d[k]);
      const builds = buildAdvice(st);
      const endB = cur.budgetAfter + cur.net * (MONTHS - st.m - 1);
      const sustain = endB < GOALS.budget ? `<p class="gverd no">${L(`Przy obecnym saldzie (${sign(cur.net)} mln/mies.) budżet na koniec roku spadnie do ${fmt(endB)} mln. Decyzja, która dziś spełnia cele, później przestanie być racjonalna.`, `При текущем сальдо (${sign(cur.net)} млн/мес.) бюджет к концу года упадёт до ${fmt(endB)} млн. Решение, которое сегодня выполняет цели, потом перестанет быть рациональным.`)}</p>` : "";
      const status = cur.rational ? (gap < 1.5 ? L("<b>Twoje decyzje są racjonalne i prawie optymalne.</b>", "<b>Твои решения рациональны и почти оптимальны.</b>") : L(`<b>Twoje decyzje są racjonalne, ale nie optymalne.</b> Cele są spełnione, ale można mieć o ${fmt(gap)} pkt więcej dobrobytu.`, `<b>Твои решения рациональны, но не оптимальны.</b> Цели выполнены, но можно получить на ${fmt(gap)} п. больше благосостояния.`))
        : L("<b>Twoje decyzje nie są racjonalne:</b> nie wszystkie cele są spełnione.", "<b>Твои решения не рациональны:</b> не все цели выполнены.");
      modal(`<h2>${T.advisor}</h2><p>${status}</p>${sustain}
        ${diffs.length ? `<b>${L("Co zmienić i dlaczego", "Что изменить и почему")}</b><ul>${diffs.map(k => `<li><b>${names[k]}: ${vfmt(k, st.d[k])} → ${vfmt(k, best.d[k])}</b>. ${why[k](best.d[k])}</li>`).join("")}</ul>` : ""}
        ${builds.length ? `<b>${L("Inwestycje", "Инвестиции")}</b><ul>${builds.map(t => `<li><b>${BI[t].name}</b>: ${t === "piekarnia2" ? L("popyt rośnie i za kilka miesięcy przekroczy moc piekarni.", "спрос растёт и через несколько месяцев превысит мощность пекарни.") : L("zdąży się zwrócić przed końcem roku.", "успеет окупиться до конца года.")}</li>`).join("")}</ul>` : ""}
        <table class="gtbl"><tr><th></th><th>${L("Teraz", "Сейчас")}</th><th>${L("Optymalnie", "Оптимально")}</th></tr>
          <tr><td>${T.bread}</td><td>${fmt(cur.p)} zł</td><td>${fmt(best.r.p)} zł</td></tr>
          <tr><td>${T.farmInc}</td><td>${Math.round(cur.farmInc)}%</td><td>${Math.round(best.r.farmInc)}%</td></tr>
          <tr><td>${T.unemp}</td><td>${fmt(cur.unemp)}%</td><td>${fmt(best.r.unemp)}%</td></tr>
          <tr><td>${L("Saldo budżetu", "Сальдо бюджета")}</td><td>${sign(cur.net)}</td><td>${sign(best.r.net)}</td></tr>
          <tr class="sum"><td>${T.welfare}</td><td>${Math.round(cur.W)}</td><td>${Math.round(best.r.W)}</td></tr></table>
        ${diffs.length ? `<button class="gbtn" data-apply='${JSON.stringify(best.d)}'>${L("Zastosuj optymalne ustawienia", "Применить оптимальные настройки")}</button>` : ""}`);
      track?.("game", "advisor", Math.round(gap));
    }

    // ---------- czas
    function monthEnd(){
      if (st.done) return;
      const before = st.budget;
      const { r, finished } = advance(st);
      const ev = [];
      finished.forEach(t => { ev.push(L(`Ukończono: ${BI[t].name}.`, `Построено: ${BI[t].name}.`)); floatText(t === "piekarnia2" ? "piekarnia" : "farma", t === "piekarnia2" ? L("+20 miejsc pracy", "+20 рабочих мест") : L("+12% zbiorów", "+12% урожая"), true); });
      if (!r.ok.shortage) ev.push(L(`Puste półki: brakowało ${fmt(r.shortage)}% chleba${r.capped ? " przez cenę maksymalną" : ""}.`, `Пустые полки: не хватало ${fmt(r.shortage)}% хлеба${r.capped ? " из-за потолка цены" : ""}.`));
      if (!r.ok.price) ev.push(L(`Chleb kosztował ${fmt(r.p)} zł, powyżej celu. ${r.bottleneck === "bakery" ? "Przyczyna: piekarnia nie nadąża." : "Przyczyna: za mało zboża."}`, `Хлеб стоил ${fmt(r.p)} zł, выше цели. ${r.bottleneck === "bakery" ? "Причина: пекарня не успевает." : "Причина: мало зерна."}`));
      if (!r.ok.farmInc) ev.push(L(`Rolnicy protestują: dochód tylko ${Math.round(r.farmInc)}% normalnego.`, `Фермеры протестуют: доход лишь ${Math.round(r.farmInc)}% обычного.`));
      if (!r.ok.unemp) ev.push(L(`Bezrobocie ${fmt(r.unemp)}%.`, `Безработица ${fmt(r.unemp)}%.`));
      if (!r.ok.budget) ev.push(L("Budżet poniżej limitu.", "Бюджет ниже лимита."));
      if (st.m === BLOCKADE[0]) ev.push(L("Od teraz przez 3 miesiące import jest zablokowany (max 12%). Czas na rezerwy.", "Следующие 3 месяца импорт заблокирован (макс. 12%). Время для резервов."));
      if (st.m === BLOCKADE[BLOCKADE.length - 1] + 1) ev.push(L("Blokada importu się skończyła.", "Блокада импорта закончилась."));
      if (st.m === 9) ev.push(L("Nowe żniwa! Krajowe zbiory wróciły do 100%. Dobry moment, żeby odbudować rezerwy.", "Новый урожай! Внутренний урожай вернулся к 100%. Хороший момент пополнить резерв."));
      st.log.push(`${T.month} ${st.m}: ${L("chleb", "хлеб")} ${fmt(r.p)} zł, ${T.welfare.toLowerCase()} ${Math.round(r.W)}${r.rational ? " ✓" : " ✗"}${ev.length ? ". " + ev.join(" ") : ""}`);
      if (Math.abs(st.budget - before) >= 0.1) floatText("rzad", sign(st.budget - before) + L(" mln", " млн"), st.budget >= before);
      track?.("game", "1-m" + st.m, Math.round(r.W));
      world?.apply(view()); hud(); labels(); panel();
      if (st.done){ pause(); finish(); return; }
      if (ev.length){ pause(); modal(`<h2>${L("Koniec miesiąca", "Конец месяца")} ${st.m}</h2><p>${L("Dobrobyt w minionym miesiącu", "Благосостояние за прошлый месяц")}: <b>${Math.round(r.W)}</b> · ${r.rational ? L("decyzje racjonalne ✓", "решения рациональны ✓") : L("decyzje nieracjonalne ✗", "решения нерациональны ✗")}</p><ul>${ev.map(e => `<li>${inline(e)}</li>`).join("")}</ul><p class="gsmall">${L("Gra jest zatrzymana. Kliknij budynek z podpowiedzią albo „Doradca”.", "Игра на паузе. Нажми на здание с подсказкой или «Советник».")}</p>`); }
    }
    function dayTick(){ if (st.done) return; st.day++; if (st.day >= DAYS) monthEnd(); else hud(); }
    function play(){ if (st.done || timer || tutorial) return; modal(""); timer = setInterval(dayTick, 300 / speed); world?.setRunning(true); hud(); }
    function pause(){ if (timer){ clearInterval(timer); timer = null; } world?.setRunning(false); if ($("#gplay")) hud(); }
    function finish(){
      const g = grade(st);
      try { const prev = JSON.parse(localStorage.getItem(LS) || "null"); if (prev == null || g.stars > prev) localStorage.setItem(LS, JSON.stringify(g.stars)); } catch {}
      track?.("game", "1-end", Math.round(g.eff));
      modal(`<h2>${L("Koniec roku", "Конец года")}: ${"★".repeat(g.stars)}${"☆".repeat(3 - g.stars)}</h2>
        <table class="gtbl"><tr><td>${L("Miesiące z decyzjami racjonalnymi", "Месяцы с рациональными решениями")}</td><td>${Math.round(g.rationalShare * 12)}/12</td></tr>
          <tr><td>${L("Twój średni dobrobyt", "Твоё среднее благосостояние")}</td><td>${fmt(g.W)}</td></tr>
          <tr><td>${L("Optymalny średni dobrobyt", "Оптимальное среднее благосостояние")}</td><td>${fmt(g.bestW)}</td></tr>
          <tr class="sum"><td>${L("Efektywność", "Эффективность")}</td><td>${Math.round(g.eff)}%</td></tr></table>
        <p>${g.rationalShare === 1 && g.eff >= 97 ? L("Decyzje racjonalne i praktycznie optymalne.", "Решения рациональные и практически оптимальные.") : g.rationalShare >= 0.75 ? L("Decyzje były w większości racjonalne. Różnica do optimum to dobrobyt, który został „na stole”: np. za wysokie cło, zapas zużyty przed blokadą albo spóźniona inwestycja.", "Решения в основном рациональны. Разница с оптимумом — благосостояние, оставшееся «на столе»: например, высокая пошлина, запас, потраченный до блокады, или запоздалая инвестиция.") : L("Wiele miesięcy nie spełniało celów. Sprawdź doradcę i podpowiedzi nad budynkami.", "Многие месяцы цели не выполнялись. Смотри советника и подсказки над зданиями.")}</p>
        <p class="gsmall">${L("Wnioski: przy nieurodzaju najskuteczniej działa zwiększenie podaży (import, rezerwy, inwestycje). Zapasy robi się, gdy jest dużo, a wydaje w kryzysie. Cena maksymalna nie dodaje chleba, tylko tworzy kolejki.", "Выводы: при неурожае эффективнее всего увеличивать предложение (импорт, резервы, инвестиции). Запасы делают, когда всего много, и тратят в кризис. Потолок цены не добавляет хлеба, а создаёт очереди.")}</p>
        <button class="gbtn" id="grestart">${T.restart}</button>`);
    }
    function restart(){ pause(); st = newState(); sel = null; modal(""); world?.apply(view()); hud(); panel(); labels(); }

    host.addEventListener("click", e => {
      if (e.target.closest("[data-col]")){ $("#gpanel").classList.toggle("collapsed"); $(".gbody").classList.toggle("wide", $("#gpanel").classList.contains("collapsed")); return; }
      const info = e.target.closest("[data-info]"); if (info && !tutorial){ pause(); modal(`<p>${SI[info.dataset.info]}</p>`); return; }
      const b = e.target.closest("[data-b]"); if (b) select(b.dataset.b);
    });
    $("#gplay").onclick = () => timer ? pause() : play();
    $("#gspeed").onclick = () => { speed = speed === 1 ? 2 : speed === 2 ? 4 : 1; if (timer){ clearInterval(timer); timer = setInterval(dayTick, 300 / speed); } hud(); };
    $("#gadv").onclick = () => { if (!tutorial) advisor(); };
    $("#ghelp").onclick = startTut;
    if (matchMedia("(max-width:900px)").matches) $("#gpanel").classList.add("collapsed");
    hud(); panel();

    let seenTut = false; try { seenTut = localStorage.getItem(LS_TUT) === "1"; } catch {}
    loadThree().then(THREE => {
      const load = $("#gload");
      let ok = !!THREE;
      if (ok){ try { world = makeScene(THREE, $("#gcv")); } catch (e) { ok = false; } }
      if (!ok){ load.textContent = T.noGL; panel(); if (!seenTut) startTut(); return; }
      load.remove();
      world.resize(); world.apply(view()); labels();
      $("#gcv").addEventListener("click", e => select(world.pick(e.clientX, e.clientY)));
      const ro = new ResizeObserver(() => { if (!host.isConnected){ ro.disconnect(); pause(); world.dispose(); return; } world.resize(); labels(); if (tutorial) showTut(tutorial.i); });
      ro.observe($("#gstage"));
      if (!seenTut) startTut();
    });
    window.addEventListener("hashchange", () => { if (!host.isConnected) pause(); }, { once: true });
  }

  window.BrainstormGame = { mount, _model: { newState, sim, advance, grade, bestPolicy, startBuild } };
})();
