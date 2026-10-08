// Brainstorm: Misje — diorama 3D (Three.js) z klikalnymi budynkami i turowym modelem gospodarki.
// Statyczna kamera, render tylko po zmianie stanu. Fallback 2D bez WebGL.
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

  // ---------------------------------------------------------------- misja 1: model
  const BASE_P = 5;               // normalna cena chleba (zł)
  const HARVEST = [58, 64, 72, 95]; // krajowa podaż zboża w kwartałach (normalnie 100)
  const IMPORT_MAX = 40;          // ile zboża świat sprzeda przy zerowym cle
  const RESERVE_START = 40;

  function newState(){
    return {
      q: 0, done: false, reserve: RESERVE_START, budget: 0, subsidyBoost: 0, history: [],
      d: { tariff: 30, release: 0, subsidy: 0, cap: 0, rate: 5 },   // decyzje gracza
      last: null,
    };
  }
  function simulate(st){
    const d = st.d, q = st.q;
    const dom = HARVEST[q] + st.subsidyBoost;
    const imp = IMPORT_MAX * clamp(1 - d.tariff / 40, 0, 1);
    const rel = Math.min(d.release, st.reserve);
    const S = dom + imp + rel;
    const dm = 1 - (d.rate - 5) * 0.012;                         // wyższe stopy = trochę mniejszy popyt
    const D = p => 100 * dm * Math.pow(BASE_P / p, 0.6);           // popyt na chleb/zboże
    let p = BASE_P * Math.pow(100 * dm / S, 1 / 0.6);              // cena równowagi D(p) = S
    let shortage = 0, capped = false;
    if (d.cap && d.cap < p){ capped = true; p = d.cap; shortage = Math.max(0, D(p) - S); }
    const farmIncome = dom * p + d.subsidy * 10;
    const farmers = clamp(50 + (farmIncome - 500) / 7, 0, 100);
    const consumers = clamp(100 - (p - BASE_P) * 13 - shortage * 2.2, 0, 100);
    const bakery = clamp(70 - (p - BASE_P) * 6 - (d.rate - 5) * 4 - shortage * 1.5, 0, 100);
    const revenue = imp * d.tariff * 0.02;
    const cost = d.subsidy + rel * 0.25;
    const inflation = 2.5 + (p - BASE_P) / BASE_P * 18 - (d.rate - 5) * 0.7;
    return { dom, imp, rel, S, p, shortage, capped, farmers, consumers, bakery, revenue, cost, inflation, D100: D(p) };
  }
  function advance(st){
    const r = simulate(st);
    st.reserve -= r.rel;
    st.budget += r.revenue - r.cost;
    st.subsidyBoost = Math.min(15, st.subsidyBoost + st.d.subsidy * 0.6);
    st.history.push({ q: st.q, d: { ...st.d }, r });
    st.last = r; st.q++;
    if (st.q >= 4) st.done = true;
    return r;
  }
  const GOALS = {
    price: 6.5, shortage: 2, farmers: 35, budget: -20,
  };
  function grade(st){
    const H = st.history;
    const okPrice = H.every(h => h.r.p <= GOALS.price);
    const okShort = H.every(h => h.r.shortage <= GOALS.shortage);
    const okFarm = H[H.length - 1].r.farmers >= GOALS.farmers;
    const okBud = st.budget >= GOALS.budget;
    return { okPrice, okShort, okFarm, okBud, stars: [okPrice && okShort, okFarm, okBud].filter(Boolean).length };
  }

  // ---------------------------------------------------------------- teksty
  function texts(lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    return {
      L,
      title: L("Misja 1: Nieurodzaj", "Миссия 1: Неурожай"),
      brief: L("Susza zniszczyła część zbiorów. W tym kwartale rolnicy zebrali tylko 58% normalnej ilości zboża, a pełne zbiory wrócą dopiero za rok. Twoje zadanie: przez 4 kwartały utrzymać chleb w rozsądnej cenie, nie dopuścić do pustych półek i nie zrujnować rolników ani budżetu.",
               "Засуха уничтожила часть урожая. В этом квартале фермеры собрали только 58% обычного объёма зерна, а полный урожай вернётся лишь через год. Твоя задача: 4 квартала держать хлеб по разумной цене, не допустить пустых полок и не разорить ни фермеров, ни бюджет."),
      how: L("Kliknij budynek, żeby zobaczyć, za co odpowiada i co możesz zmienić. Potem naciśnij „Następny kwartał”.",
             "Нажми на здание, чтобы увидеть, за что оно отвечает и что можно изменить. Потом нажми «Следующий квартал»."),
      goals: L("Cele", "Цели"),
      g1: L(`Chleb ≤ ${GOALS.price} zł w każdym kwartale (normalnie 5 zł)`, `Хлеб ≤ ${GOALS.price} zł в каждом квартале (обычно 5 zł)`),
      g2: L("Brak pustych półek (niedobór ≤ 2%)", "Без пустых полок (дефицит ≤ 2%)"),
      g3: L(`Nastroje rolników na końcu ≥ ${GOALS.farmers}`, `Настроение фермеров в конце ≥ ${GOALS.farmers}`),
      g4: L(`Budżet nie gorszy niż ${GOALS.budget} mln zł`, `Бюджет не хуже ${GOALS.budget} млн zł`),
      quarter: L("Kwartał", "Квартал"), next: L("Następny kwartał", "Следующий квартал"),
      restart: L("Zagraj jeszcze raz", "Сыграть ещё раз"), pick: L("Wybierz budynek na mapie", "Выбери здание на карте"),
      bread: L("Cena chleba", "Цена хлеба"), infl: L("Inflacja", "Инфляция"), budget: L("Budżet", "Бюджет"),
      shelves: L("Półki", "Полки"), full: L("pełne", "полные"), empty: L("braki", "дефицит"),
      farmers: L("Rolnicy", "Фермеры"), consumers: L("Konsumenci", "Потребители"), bakeryM: L("Piekarnia", "Пекарня"),
      report: L("Raport doradców", "Отчёт советников"), summary: L("Podsumowanie misji", "Итоги миссии"),
      learn: L("Do powtórki", "Повторить"), noGL: L("Twoja przeglądarka nie obsługuje 3D. Wybierz budynek z listy:", "Браузер не поддерживает 3D. Выбери здание из списка:"),
      loading: L("Ładowanie świata…", "Загрузка мира…"),
    };
  }

  // budynki: opis roli, wskaźniki, decyzje
  function buildings(lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    return {
      rzad: {
        name: L("Rząd", "Правительство"),
        role: L("Ustala [[polityka-fiskalna|politykę fiskalną]]: podatki, cła, dopłaty i wydatki z budżetu. Każda złotówka wydana tutaj zmniejsza budżet.",
                "Определяет [[polityka-fiskalna|фискальную политику]]: налоги, пошлины, дотации и расходы бюджета. Каждый потраченный здесь злотый уменьшает бюджет."),
        controls: [
          { k: "tariff", min: 0, max: 40, step: 5, unit: "%", label: L("Cło na import zboża", "Пошлина на импорт зерна"),
            hint: L("Wysokie cło chroni rolników, ale ogranicza import, więc [[podaz|podaż]] jest mniejsza i chleb droższy. Cło daje wpływy do budżetu.", "Высокая пошлина защищает фермеров, но ограничивает импорт: [[podaz|предложение]] меньше, хлеб дороже. Пошлина приносит доход в бюджет.") },
          { k: "subsidy", min: 0, max: 10, step: 1, unit: L(" mln zł", " млн zł"), label: L("Dopłaty dla rolników (na kwartał)", "Дотации фермерам (за квартал)"),
            hint: L("Kosztują budżet, ale poprawiają nastroje rolników i zwiększają przyszłe zbiory (nawozy, maszyny).", "Стоят бюджету денег, но улучшают настроение фермеров и увеличивают будущие урожаи (удобрения, техника).") },
          { k: "cap", min: 0, max: 8, step: 0.5, unit: " zł", label: L("Cena maksymalna chleba (0 = brak)", "Максимальная цена хлеба (0 = нет)"),
            hint: L("Jeśli cena maksymalna jest niższa od [[cena-rownowagi|ceny równowagi]], powstaje [[niedobor|niedobór]]: kolejki i puste półki.", "Если максимальная цена ниже [[cena-rownowagi|равновесной]], возникает [[niedobor|дефицит]]: очереди и пустые полки.") },
        ],
      },
      rezerwy: {
        name: L("Rezerwy strategiczne", "Госрезерв"),
        role: L("Magazyn państwowego zboża na kryzysy. Uwolnienie rezerw zwiększa podaż od razu, ale zapas się kończy.", "Государственный склад зерна на случай кризиса. Выпуск резервов сразу увеличивает предложение, но запас заканчивается."),
        controls: [
          { k: "release", min: 0, max: 20, step: 2, unit: "%", label: L("Uwolnij z rezerw (w tym kwartale)", "Выпустить из резерва (в этом квартале)"),
            hint: L("Zostało w magazynie: {reserve}%. Każdy 1% kosztuje 0,25 mln zł (transport, przechowanie).", "Осталось на складе: {reserve}%. Каждый 1% стоит 0,25 млн zł (перевозка, хранение).") },
        ],
      },
      nbp: {
        name: L("NBP", "NBP (Центробанк)"),
        role: L("Narodowy Bank Polski prowadzi [[polityka-pieniezna|politykę pieniężną]]. [[stopa-referencyjna|Stopa referencyjna]] wpływa na kredyty firm i ludzi, a przez to na popyt i [[inflacja|inflację]].",
                "Национальный банк Польши проводит [[polityka-pieniezna|денежную политику]]. [[stopa-referencyjna|Референсная ставка]] влияет на кредиты фирм и людей, а через них на спрос и [[inflacja|инфляцию]]."),
        controls: [
          { k: "rate", min: 1, max: 10, step: 0.5, unit: "%", label: L("Stopa referencyjna", "Референсная ставка"),
            hint: L("Wyższa stopa schładza popyt i inflację, ale piekarnia płaci więcej za kredyt na mąkę i paliwo.", "Более высокая ставка охлаждает спрос и инфляцию, но пекарня платит больше по кредиту на муку и топливо.") },
        ],
      },
      farma: {
        name: L("Farma", "Ферма"),
        role: L("Rolnicy to krajowa [[podaz|podaż]] zboża. Po suszy zbiory są małe; wrócą do normy dopiero za rok. Ich dochód zależy od ceny i ilości zboża oraz od dopłat.",
                "Фермеры — внутреннее [[podaz|предложение]] зерна. После засухи урожай мал и вернётся к норме лишь через год. Их доход зависит от цены и количества зерна и от дотаций."),
      },
      piekarnia: {
        name: L("Piekarnia", "Пекарня"),
        role: L("Kupuje zboże (mąkę) i sprzedaje chleb. Gdy zboże drożeje, rosną jej koszty; wysokie stopy procentowe podnoszą koszt kredytu na dostawy.",
                "Покупает зерно (муку) и продаёт хлеб. Когда зерно дорожает, растут её издержки; высокие ставки повышают стоимость кредита на поставки."),
      },
      sklep: {
        name: L("Sklep i mieszkańcy", "Магазин и жители"),
        role: L("Tu widać [[popyt|popyt]] konsumentów. Chleb to dobro podstawowe, więc ludzie kupują go prawie tyle samo nawet po podwyżce. Kolejki oznaczają niedobór.",
                "Здесь виден [[popyt|спрос]] потребителей. Хлеб — базовый товар, поэтому люди покупают почти столько же даже после подорожания. Очереди означают дефицит."),
      },
      granica: {
        name: L("Granica i import", "Граница и импорт"),
        role: L("Ciężarówki z zagranicznym zbożem. Import zwiększa [[podaz|podaż]] i obniża cenę, ale konkuruje z krajowymi rolnikami. Ile przyjedzie, zależy od cła ustalonego przez rząd.",
                "Грузовики с иностранным зерном. Импорт увеличивает [[podaz|предложение]] и снижает цену, но конкурирует с местными фермерами. Сколько приедет, зависит от пошлины, установленной правительством."),
      },
    };
  }

  // raport po kwartale
  function report(st, r, lang){
    const L = (pl, ru) => lang === "ru" ? ru : pl;
    const d = st.history[st.history.length - 1].d, out = [];
    out.push(L(`Podaż zboża: rolnicy ${Math.round(r.dom)}% + import ${Math.round(r.imp)}% + rezerwy ${Math.round(r.rel)}% = <b>${Math.round(r.S)}%</b> normalnej ilości.`,
               `Предложение зерна: фермеры ${Math.round(r.dom)}% + импорт ${Math.round(r.imp)}% + резерв ${Math.round(r.rel)}% = <b>${Math.round(r.S)}%</b> от нормы.`));
    if (r.capped) out.push(L(`<b>Cena maksymalna ${r1(r.p)} zł jest poniżej ceny równowagi.</b> Ludzie chcą kupić więcej, niż jest chleba: niedobór ${Math.round(r.shortage)}%. Powstały kolejki, a część chleba trafia na czarny rynek. To klasyczny skutek ceny maksymalnej.`,
                             `<b>Максимальная цена ${r1(r.p)} zł ниже равновесной.</b> Люди хотят купить больше, чем есть хлеба: дефицит ${Math.round(r.shortage)}%. Появились очереди, часть хлеба уходит на чёрный рынок. Классическое следствие потолка цен.`));
    else if (r.S < 95) out.push(L(`Podaży jest mniej niż zwykle, więc [[cena-rownowagi|cena równowagi]] wzrosła do <b>${r1(r.p)} zł</b>. Chleb to dobro podstawowe: popyt prawie nie spada, dlatego nawet mały brak mocno podnosi cenę.`,
                                  `Предложения меньше обычного, поэтому [[cena-rownowagi|равновесная цена]] выросла до <b>${r1(r.p)} zł</b>. Хлеб — базовый товар: спрос почти не падает, поэтому даже небольшая нехватка сильно поднимает цену.`));
    else out.push(L(`Podaż jest bliska normy, więc chleb kosztuje <b>${r1(r.p)} zł</b>.`, `Предложение близко к норме, поэтому хлеб стоит <b>${r1(r.p)} zł</b>.`));
    if (d.tariff >= 30 && r.p > GOALS.price) out.push(L("Wysokie cło zatrzymało większość importu. Rolnicy są chronieni, ale płacą za to konsumenci.", "Высокая пошлина остановила большую часть импорта. Фермеры защищены, но платят за это потребители."));
    if (d.tariff <= 10 && r.farmers < 45) out.push(L("Tani import obniżył cenę zboża, więc dochody krajowych rolników spadły.", "Дешёвый импорт снизил цену зерна, поэтому доходы местных фермеров упали."));
    if (d.subsidy > 0) out.push(L(`Dopłaty ${d.subsidy} mln zł wsparły rolników i zwiększą następne zbiory.`, `Дотации ${d.subsidy} млн zł поддержали фермеров и увеличат следующие урожаи.`));
    if (d.rate >= 7) out.push(L("Wysokie stopy NBP hamują inflację, ale piekarnia ma droższy kredyt na dostawy.", "Высокие ставки NBP сдерживают инфляцию, но у пекарни дороже кредит на поставки."));
    if (d.rate <= 3) out.push(L("Niskie stopy NBP pobudzają popyt, a to dodatkowo podnosi ceny.", "Низкие ставки NBP подстёгивают спрос, а это дополнительно поднимает цены."));
    out.push(L(`Budżet w tym kwartale: +${r1(r.revenue)} mln z cła, −${r1(r.cost)} mln na dopłaty i rezerwy.`, `Бюджет в этом квартале: +${r1(r.revenue)} млн от пошлины, −${r1(r.cost)} млн на дотации и резервы.`));
    return out;
  }

  // ---------------------------------------------------------------- scena 3D
  const PAL = {
    grass: 0x8fd16a, grassSide: 0x6aa84f, soil: 0x8a5a3b, soilDark: 0x6b4429, road: 0xe9dcc0, water: 0x5cc4f2,
    wall: 0xfff6e6, roofRed: 0xe2574c, roofBlue: 0x4a7bd8, roofGreen: 0x4bb377, gold: 0xf5c542, wood: 0xb07a4a,
    wheat: 0xf2cf4a, wheatDry: 0xc9a66b, stone: 0xd9d4cc, truck: 0x3d8fe0, people: 0xff9d5c, tree: 0x3fa35a, trunk: 0x8a5a3b,
    white: 0xffffff, dark: 0x4a4a55, flagW: 0xffffff, flagR: 0xdc143c,
  };

  function makeScene(THREE, canvas){
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 200);
    cam.position.set(22, 24, 22); cam.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 0.75));
    const sun = new THREE.DirectionalLight(0xfff1dd, 0.75);
    sun.position.set(12, 22, 6); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16 });
    scene.add(sun);

    const mats = {};
    const mat = c => mats[c] || (mats[c] = new THREE.MeshLambertMaterial({ color: c }));
    const box = (w, h, d, c, x, y, z, parent = scene) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c));
      m.position.set(x, y + h / 2, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
    };
    const cyl = (rt, rb, h, c, x, y, z, seg = 10, parent = scene) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(c));
      m.position.set(x, y + h / 2, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
    };
    const roof = (w, d, h, c, x, y, z, parent) => {     // dach dwuspadowy z pryzmatu
      const g = new THREE.CylinderGeometry(0.0001, 1, 1, 4, 1); g.rotateY(Math.PI / 4);
      const m = new THREE.Mesh(g, mat(c)); m.scale.set(w * 0.72, h, d * 0.72); m.position.set(x, y + h / 2, z);
      m.castShadow = true; parent.add(m); return m;
    };
    const tree = (x, z, s = 1) => { cyl(0.12 * s, 0.15 * s, 0.5 * s, PAL.trunk, x, 1, z, 6); const t = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 * s, 0), mat(PAL.tree)); t.position.set(x, 1 + 0.9 * s, z); t.castShadow = true; scene.add(t); };

    // wyspa-diorama
    box(18, 1, 18, PAL.grass, 0, 0, 0);
    box(18, 2.2, 18, PAL.soil, 0, -2.2, 0); box(17.6, 1, 17.6, PAL.soilDark, 0, -3.2, 0);
    // droga w kształcie L i rzeka
    box(18, 0.06, 1.6, PAL.road, 0, 1, 1.2); box(1.6, 0.06, 7.4, PAL.road, -1.2, 1, -3.7);
    box(1.8, 0.05, 18, PAL.water, 7.9, 1, 0);
    box(2.4, 0.3, 1.8, PAL.wood, 7.9, 1, 1.2);       // most

    const groups = {};
    const group = (id, x, z) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.userData.id = id; scene.add(g); groups[id] = g; return g; };

    // Rząd: biały gmach z kolumnami i flagą
    { const g = group("rzad", -5.6, -5.2);
      box(4, 0.3, 3, PAL.stone, 0, 1, 0, g); box(3.6, 1.8, 2.4, PAL.wall, 0, 1.3, -0.1, g);
      for (let i = -1.5; i <= 1.5; i += 1) cyl(0.14, 0.14, 1.8, PAL.white, i, 1.3, 1.25, 8, g);
      box(3.9, 0.3, 2.9, PAL.stone, 0, 3.1, 0, g); roof(4, 3, 0.9, PAL.roofBlue, 0, 3.4, 0, g);
      cyl(0.04, 0.04, 1.6, PAL.dark, 1.6, 4.1, -0.9, 6, g); box(0.8, 0.25, 0.04, PAL.flagW, 2.0, 5.3, -0.9, g); box(0.8, 0.25, 0.04, PAL.flagR, 2.0, 5.05, -0.9, g); }
    // NBP: bank z monetą
    { const g = group("nbp", -1.2 + 3.6, -5.4);
      box(3, 2.4, 2.6, PAL.stone, 0, 1, 0, g); box(3.3, 0.3, 2.9, PAL.white, 0, 3.4, 0, g);
      for (let i = -1; i <= 1; i += 1) cyl(0.13, 0.13, 2.2, PAL.white, i, 1, 1.4, 8, g);
      const coin = cyl(0.8, 0.8, 0.22, PAL.gold, 0, 4.1, 0, 20, g); coin.rotation.x = Math.PI / 2; coin.position.y = 4.6; }
    // Rezerwy: silosy
    { const g = group("rezerwy", 5.2, -5.4);
      [[-0.8, 0], [0.8, 0], [0, -1.1]].forEach(([x, z]) => { cyl(0.75, 0.75, 3, 0xe6e9ef, x, 1, z, 14, g); const c = cyl(0.01, 0.78, 0.7, PAL.roofGreen, x, 4, z, 14, g); });
      g.userData.level = []; }
    // Farma: stodoła + pola
    { const g = group("farma", -5.4, 4.8);
      box(2.4, 1.8, 2, PAL.roofRed, 1.8, 1, 0.2, g); roof(2.4, 2.1, 1, PAL.wall, 1.8, 2.8, 0.2, g); box(0.8, 1.1, 0.05, PAL.white, 1.8, 1, 1.22, g);
      const fields = [];
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) fields.push(box(1.05, 0.25, 1.05, PAL.wheat, -1.6 + i * 1.15, 1, -1.0 + j * 1.15, g));
      g.userData.fields = fields; }
    // Piekarnia: komin, szyld
    { const g = group("piekarnia", 0.6, 4.6);
      box(2.6, 1.9, 2.2, PAL.wall, 0, 1, 0, g); roof(2.7, 2.4, 1, PAL.roofRed, 0, 2.9, 0, g);
      box(0.4, 1.4, 0.4, PAL.stone, 0.8, 3, -0.5, g); box(1.4, 0.5, 0.08, PAL.wood, 0, 2.1, 1.12, g);
      const bread = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), mat(0xd9984a)); bread.scale.set(1.4, 0.8, 1); bread.position.set(0, 2.35, 1.2); g.add(bread); }
    // Sklep z markizą + miejsce na kolejkę
    { const g = group("sklep", 4.2, 4.6);
      box(2.2, 1.6, 2, PAL.wall, 0, 1, 0, g); box(2.4, 0.15, 0.9, PAL.roofGreen, 0, 2.5, 1.2, g);
      box(2.3, 0.2, 2.1, PAL.roofGreen, 0, 2.6, 0, g); box(0.7, 1, 0.05, PAL.dark, 0, 1, 1.02, g);
      g.userData.queue = []; }
    // Granica z ciężarówkami (po drugiej stronie rzeki)
    { const g = group("granica", 0, 0);
      cyl(0.08, 0.08, 1.4, PAL.dark, 6.5, 1, -0.1, 6, g); const bar = box(2.2, 0.14, 0.14, PAL.flagR, 5.4, 2.1, -0.1, g); bar.userData.bar = true;
      box(1, 1, 1, PAL.stone, 6.4, 1, -1, g);
      g.userData.trucks = []; }

    // dekoracje: domki i drzewa
    [[-7.4, -0.9], [-4.6, -1.2], [2.4, -1.4]].forEach(([x, z], i) => { box(1.2, 1, 1.1, PAL.wall, x, 1, z); roof(1.3, 1.2, 0.6, [PAL.roofRed, PAL.roofBlue, PAL.roofGreen][i], x, 2, z, scene); });
    [[-7.8, 7.6], [-1.6, 7.8], [6.8, 7.2], [-8, -7.8], [1.2, -7.9], [6.4, 3.4], [-2.8, -2.6]].forEach(([x, z]) => tree(x, z, 0.9 + (x * z % 3) * 0.08));

    // klikalność
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
      Object.entries(groups).forEach(([k, g]) => g.traverse(m => {
        if (!m.isMesh) return;
        if (!m.userData.m0) m.userData.m0 = m.material;
        m.material = k === id ? hl(m.userData.m0) : m.userData.m0;
      }));
    };

    // stan → scena (bez animacji)
    const truckMeshes = [], queueMeshes = [];
    function apply(view){
      const f = groups.farma.userData.fields, n = Math.round(clamp(view.harvest / 100, 0, 1) * f.length);
      f.forEach((m, i) => { m.userData.m0 = mat(i < n ? PAL.wheat : PAL.wheatDry); m.material = m.userData.m0; m.scale.y = i < n ? 1.6 : 0.5; });
      if (current) highlight(current);
      truckMeshes.splice(0).forEach(m => scene.remove(m));
      const trucks = Math.round(view.imports / 10);
      for (let i = 0; i < trucks; i++){
        const t = new THREE.Group(); const x = 8.9 + (i % 2) * 0, z = -2.6 + i * 1.3 - 1;
        const b = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 0.6), mat(PAL.truck)); b.position.set(0, 0.55, 0); b.castShadow = true; t.add(b);
        const c = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.6), mat(PAL.white)); c.position.set(-0.75, 0.5, 0); t.add(c);
        t.position.set(x, 1, z - 2); t.rotation.y = Math.PI / 2; scene.add(t); truckMeshes.push(t);
      }
      queueMeshes.splice(0).forEach(m => scene.remove(m));
      const people = Math.round(clamp(view.shortage / 3, 0, 6));
      for (let i = 0; i < people; i++){
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.7, 8), mat(PAL.people));
        p.position.set(4.2 - 1.2 + i * 0.45, 1.35, 6.6); p.castShadow = true; scene.add(p); queueMeshes.push(p);
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), mat(0xf7d1b0)); h.position.set(p.position.x, 1.85, 6.6); scene.add(h); queueMeshes.push(h);
      }
      render();
    }

    let w = 0, h = 0;
    function resize(){
      const r = canvas.parentElement.getBoundingClientRect(); w = r.width; h = r.height;
      renderer.setSize(w, h, false);
      const aspect = w / h, s = aspect < 1 ? 13.5 / aspect * 0.78 : 12.5;
      cam.left = -s * aspect; cam.right = s * aspect; cam.top = s; cam.bottom = -s; cam.updateProjectionMatrix();
      render();
    }
    function render(){ renderer.render(scene, cam); }
    const anchors = { rzad: [-5.6, 6.2, -5.2], nbp: [2.4, 5.8, -5.4], rezerwy: [5.2, 5.4, -5.4], farma: [-5.4, 4.2, 4.8], piekarnia: [0.6, 4.6, 4.6], sklep: [4.2, 3.6, 4.6], granica: [8.8, 3, -3.2] };
    function screenPos(id){
      const p = new THREE.Vector3(...anchors[id]).project(cam);
      return { x: (p.x + 1) / 2 * w, y: (1 - p.y) / 2 * h };
    }
    return { resize, render, apply, pick, highlight, screenPos, ids: Object.keys(anchors), dispose(){ renderer.dispose(); } };
  }

  // ---------------------------------------------------------------- UI
  function mount(el, ctx){
    const { lang, md, inline, esc, track } = ctx;
    const T = texts(lang), B = buildings(lang), L = T.L;
    let st = newState(), sel = null, world = null;
    const LS = "makro2.game1";
    try { const best = JSON.parse(localStorage.getItem(LS) || "null"); if (best) st.best = best; } catch {}

    el.innerHTML = `<div class="game">
      <header class="ghead">
        <div><span class="eyebrow">${L("Gra ekonomiczna", "Экономическая игра")}</span><h1 class="h1" style="font-size:clamp(22px,3.4vw,30px)">${T.title}</h1></div>
        <div class="gq" id="gq"></div>
      </header>
      <section class="card gbrief"><p>${T.brief}</p><p class="muted" style="margin:0;font-size:14px">${T.how}</p>
        <div class="ggoals" id="ggoals"></div></section>
      <div class="gmain">
        <div class="gworld"><div class="gstage" id="gstage"><canvas id="gcv" aria-label="${T.title}"></canvas><div class="glabels" id="glabels"></div><div class="gload" id="gload">${T.loading}</div></div>
          <div class="gstats" id="gstats"></div></div>
        <aside class="card gpanel" id="gpanel"></aside>
      </div>
      <section id="greport"></section>
    </div>`;
    const $ = s => el.querySelector(s);

    function view(){
      const r = st.last || simulate(st);
      return { harvest: HARVEST[Math.min(st.q, 3)] + st.subsidyBoost, imports: (st.last ? r.imp : simulate(st).imp), shortage: r.shortage };
    }
    function stats(){
      const r = st.last || simulate({ ...st, d: st.d });
      const pill = (lab, val, bad) => `<div class="gstat ${bad ? "bad" : ""}"><span>${lab}</span><b>${val}</b></div>`;
      $("#gstats").innerHTML = st.last ? [
        pill(T.bread, r1(r.p) + " zł", r.p > GOALS.price),
        pill(T.shelves, r.shortage > GOALS.shortage ? `${T.empty} ${Math.round(r.shortage)}%` : T.full, r.shortage > GOALS.shortage),
        pill(T.infl, r1(r.inflation) + "%", r.inflation > 3.5),
        pill(T.budget, (st.budget >= 0 ? "+" : "") + r1(st.budget) + L(" mln", " млн"), st.budget < GOALS.budget),
        pill(T.farmers, Math.round(r.farmers) + "/100", r.farmers < GOALS.farmers),
        pill(T.consumers, Math.round(r.consumers) + "/100", r.consumers < 40),
      ].join("") : `<p class="muted" style="margin:0;font-size:14px">${L("Wskaźniki pojawią się po pierwszym kwartale.", "Показатели появятся после первого квартала.")}</p>`;
      $("#gq").innerHTML = st.done ? `<span class="pill ok">${L("Koniec misji", "Миссия завершена")}</span>` : `<span class="pill">${T.quarter} ${st.q + 1} / 4</span>`;
      $("#ggoals").innerHTML = `<b>${T.goals}</b><ul>${[T.g1, T.g2, T.g3, T.g4].map(g => `<li>${g}</li>`).join("")}</ul>`;
    }
    function bubbles(){
      if (!world) return;
      const r = st.last, lab = $("#glabels");
      const warn = {
        farma: r && r.farmers < GOALS.farmers ? "!" : "", sklep: r && r.shortage > GOALS.shortage ? "!" : "",
        piekarnia: r && r.bakery < 40 ? "!" : "", rzad: st.budget < GOALS.budget ? "!" : "", rezerwy: st.reserve <= 0 ? "0" : "",
      };
      lab.innerHTML = world.ids.map(id => { const p = world.screenPos(id); return `<button class="glabel ${sel === id ? "on" : ""}" data-b="${id}" style="left:${p.x}px;top:${p.y}px">${esc(B[id].name)}${warn[id] ? `<i>${warn[id]}</i>` : ""}</button>`; }).join("");
    }
    function panel(){
      const p = $("#gpanel");
      if (!sel){ p.innerHTML = `<p class="muted" style="margin:0">${T.pick}</p>${!world ? `<div class="glist">${Object.keys(B).map(id => `<button class="btn ghost" data-b="${id}">${esc(B[id].name)}</button>`).join("")}</div>` : ""}`; return; }
      const b = B[sel], r = st.last;
      const extra = {
        farma: r ? L(`Zbiory: ${Math.round(r.dom)}% normy. Dochód rolników: ${Math.round(r.farmers)}/100.`, `Урожай: ${Math.round(r.dom)}% нормы. Доход фермеров: ${Math.round(r.farmers)}/100.`) : L(`Zbiory w tym kwartale: ${HARVEST[st.q] + Math.round(st.subsidyBoost)}% normy.`, `Урожай в этом квартале: ${HARVEST[st.q] + Math.round(st.subsidyBoost)}% нормы.`),
        piekarnia: r ? L(`Kondycja: ${Math.round(r.bakery)}/100. ${r.bakery < 40 ? "Problemy: drogie zboże i kredyt, opóźnione dostawy." : "Dostawy idą normalnie."}`, `Состояние: ${Math.round(r.bakery)}/100. ${r.bakery < 40 ? "Проблемы: дорогое зерно и кредит, задержки поставок." : "Поставки идут нормально."}`) : "",
        sklep: r ? L(`Chleb: ${r1(r.p)} zł. ${r.shortage > 0 ? `Niedobór: ${Math.round(r.shortage)}%.` : "Półki pełne."} Nastroje: ${Math.round(r.consumers)}/100.`, `Хлеб: ${r1(r.p)} zł. ${r.shortage > 0 ? `Дефицит: ${Math.round(r.shortage)}%.` : "Полки полные."} Настроение: ${Math.round(r.consumers)}/100.`) : "",
        granica: L(`Przy obecnym cle przyjedzie ${Math.round(IMPORT_MAX * clamp(1 - st.d.tariff / 40, 0, 1))}% zboża z importu.`, `При текущей пошлине приедет ${Math.round(IMPORT_MAX * clamp(1 - st.d.tariff / 40, 0, 1))}% зерна из импорта.`),
        rezerwy: L(`W magazynie: ${Math.round(st.reserve)}%.`, `На складе: ${Math.round(st.reserve)}%.`),
      }[sel] || "";
      p.innerHTML = `<h2 class="h2">${esc(b.name)}</h2><p class="grole">${inline(b.role)}</p>${extra ? `<p class="gextra">${extra}</p>` : ""}
        ${(b.controls || []).map(c => `<label class="gctl" for="c-${c.k}"><span>${c.label}<b id="v-${c.k}"></b></span>
          <input type="range" id="c-${c.k}" min="${c.min}" max="${c.k === "release" ? Math.min(c.max, Math.max(0, st.reserve)) : c.max}" step="${c.step}" value="${Math.min(st.d[c.k], c.k === "release" ? st.reserve : 99)}" ${st.done ? "disabled" : ""}>
          <small>${inline(c.hint.replace("{reserve}", Math.round(st.reserve)))}</small></label>`).join("")}`;
      (b.controls || []).forEach(c => {
        const inp = p.querySelector("#c-" + c.k), out = p.querySelector("#v-" + c.k);
        const show = () => out.textContent = (c.k === "cap" && +inp.value === 0) ? L("brak", "нет") : String(+inp.value).replace(".", ",") + c.unit;
        inp.oninput = () => { st.d[c.k] = +inp.value; show(); };
        show();
      });
    }
    function select(id){ sel = id; world?.highlight(id); world?.render(); panel(); bubbles(); }
    function next(){
      if (st.done) return;
      const r = advance(st);
      track?.("game", "1-q" + st.q, Math.round(r.p * 10));
      world?.apply(view());
      stats(); panel(); bubbles();
      const msgs = report(st, r, lang);
      let html = `<div class="card greport"><h2 class="h2">${T.report} · ${T.quarter} ${st.q}</h2><ul>${msgs.map(m => `<li>${inline(m)}</li>`).join("")}</ul>`;
      if (st.done){
        const g = grade(st);
        try { const prev = JSON.parse(localStorage.getItem(LS) || "null"); if (!prev || g.stars > prev) localStorage.setItem(LS, JSON.stringify(g.stars)); } catch {}
        track?.("game", "1-end", g.stars);
        const row = (ok, t) => `<li class="${ok ? "ok" : "no"}">${ok ? "✓" : "✗"} ${t}</li>`;
        html += `<h2 class="h2" style="margin-top:18px">${T.summary}: ${"★".repeat(g.stars)}${"☆".repeat(3 - g.stars)}</h2>
          <ul class="ggrade">${row(g.okPrice && g.okShort, T.g1 + " / " + T.g2)}${row(g.okFarm, T.g3)}${row(g.okBud, T.g4)}</ul>
          <p>${L("Wniosek: przy nieurodzaju podaż spada, a popyt na chleb prawie się nie zmienia, więc cena mocno rośnie. Najskuteczniej działa zwiększenie podaży (import, rezerwy). Cena maksymalna nie dodaje ani jednego bochenka, tylko zamienia drożyznę w kolejki. Każde rozwiązanie ma koszt: dla rolników, konsumentów albo budżetu.",
                 "Вывод: при неурожае предложение падает, а спрос на хлеб почти не меняется, поэтому цена сильно растёт. Эффективнее всего увеличить предложение (импорт, резервы). Потолок цен не добавляет ни одной буханки, а лишь превращает дороговизну в очереди. У каждого решения есть цена: для фермеров, потребителей или бюджета.")}</p>
          <p class="muted">${T.learn}: <a href="#w1.2">1.2</a> · <a href="#p-niedobor">${esc(window.GLOSSARY.find(g => g.id === "niedobor")[lang].n)}</a> · <a href="#p-polityka-fiskalna">${esc(window.GLOSSARY.find(g => g.id === "polityka-fiskalna")[lang].n)}</a></p>
          <button class="btn" id="grestart">${T.restart}</button>`;
      }
      html += "</div>";
      $("#greport").innerHTML = html;
      $("#grestart")?.addEventListener("click", () => { st = newState(); $("#greport").innerHTML = ""; world?.apply(view()); stats(); panel(); bubbles(); nextBtn(); });
      nextBtn();
      $("#greport").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    function nextBtn(){
      let b = $("#gnext");
      if (!b){ b = document.createElement("button"); b.id = "gnext"; b.className = "btn gnextbtn"; $(".gworld").appendChild(b); b.onclick = next; }
      b.hidden = st.done; b.textContent = `${T.next} (${Math.min(st.q + 1, 4)}/4) →`;
    }

    el.addEventListener("click", e => { const b = e.target.closest("[data-b]"); if (b){ select(b.dataset.b); } });
    stats(); panel(); nextBtn();

    loadThree().then(THREE => {
      const load = $("#gload");
      let ok = !!THREE;
      if (ok){ try { world = makeScene(THREE, $("#gcv")); } catch (e) { ok = false; } }
      if (!ok){ load.textContent = T.noGL; $("#gstage").classList.add("nogl"); panel(); return; }
      load.remove();
      world.resize(); world.apply(view()); bubbles();
      const cv = $("#gcv");
      cv.addEventListener("click", e => { const id = world.pick(e.clientX, e.clientY); if (id) select(id); });
      const ro = new ResizeObserver(() => { world.resize(); bubbles(); }); ro.observe($("#gstage"));
      el._dispose = () => { ro.disconnect(); world.dispose(); };
    });
  }

  window.BrainstormGame = { mount, _model: { newState, simulate, advance, grade } };
})();
