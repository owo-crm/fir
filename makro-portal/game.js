// Brainstorm · NIEURODZAJ — strategia ekonomiczna w żywej dioramie 3D (kraj Novaria, kadencja 8 lat).
// Model gospodarki: novaria-sim.js (window.NovariaSim). Tu: świat 3D, interfejs na mapie, wiadomości, „Dlaczego?”, nauka.
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
  const lerp = (a, b, t) => a + (b - a) * t;

  // ================================================================ TEKSTY
  const mk = lang => (pl, ru) => lang === "ru" ? ru : pl;
  function T(lang){
    const L = mk(lang);
    const n1 = v => (Math.round(v * 10) / 10).toFixed(1).replace(".", ",");
    const n0 = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const zl = v => v.toFixed(2).replace(".", ",") + " zł";
    const pct = v => n1(v) + "%";
    const sgn = v => (v > 0 ? "+" : v < 0 ? "−" : "±") + n1(Math.abs(v));
    return { L, n1, n0, zl, pct, sgn,
      months: lang === "ru" ? ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"] : ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
      year: L("Rok", "Год"), day: L("dzień", "день"),
      tabs: { economy: L("Gospodarka", "Экономика"), budget: L("Budżet", "Бюджет"), markets: L("Rynki", "Рынки"), policy: L("Polityka", "Политика"), build: L("Inwestycje", "Инвестиции"), learn: L("Wiedza", "Знания"), news: L("Wiadomości", "Новости") },
      kpi: { gdp: L("PKB", "ВВП"), infl: L("Inflacja", "Инфляция"), jobs: L("Zatrudnienie", "Занятость"), budget: L("Budżet", "Бюджет"), approval: L("Poparcie", "Поддержка"), bread: L("Chleb", "Хлеб") },
      why: L("Dlaczego?", "Почему?"), mainCause: L("Główna przyczyna", "Главная причина"),
      ev: {
        drought: { icon: "🌵", name: L("Susza", "Засуха") }, energy: { icon: "⚡", name: L("Szok energetyczny", "Энергетический шок") },
        boom: { icon: "🎉", name: L("Boom konsumpcyjny", "Потребительский бум") }, recession: { icon: "📉", name: L("Recesja", "Рецессия") },
        credit: { icon: "🏦", name: L("Kryzys kredytowy", "Кредитный кризис") }, trade: { icon: "🚫", name: L("Zakłócenia handlu", "Сбой торговли") },
      },
      phase: { warning: L("sygnały", "сигналы"), stress: L("napięcie", "напряжение"), crisis: L("kryzys", "кризис"), recovery: L("wychodzenie", "восстановление") },
    };
  }

  // Bohaterowie: dają punkt widzenia, nie gotowe odpowiedzi
  const NPC = {
    farmer: { icon: "👨‍🌾", pl: "Jan, rolnik", ru: "Ян, фермер" },
    baker: { icon: "👩‍🍳", pl: "Ewa, piekarnia „Kłos”", ru: "Эва, пекарня «Колос»" },
    minister: { icon: "🧑‍💼", pl: "Tomasz, minister finansów", ru: "Томаш, министр финансов" },
    nbp: { icon: "🏦", pl: "Anna, prezes NBP", ru: "Анна, глава NBP" },
    worker: { icon: "👷", pl: "Marek, robotnik", ru: "Марек, рабочий" },
    journalist: { icon: "📰", pl: "Ola, „Novaria Daily”", ru: "Ола, «Novaria Daily»" },
  };
  const PROJ_NAMES = lang => { const L = mk(lang); return { piekarnia: L("piekarnia", "пекарня"), nawadnianie: L("nawadnianie pól", "орошение полей"), elektrownia: L("elektrownia", "электростанция"), kolej: L("kolej towarowa", "грузовая железная дорога"), port: L("rozbudowa portu", "расширение порта") }; };
  function newsText(n, lang){
    const L = mk(lang), v = n.v != null ? Math.round(n.v * 10) / 10 : 0, k = n.k;
    const E = T(lang).ev[k] || {};
    const map = {
      grainUp: ["📈", L(`Ceny zboża rosną (+${v}% w tydzień)`, `Зерно дорожает (+${v}% за неделю)`), "baker", L("Mąka drożeje. Zobaczymy, ile wytrzymają klienci.", "Мука дорожает. Посмотрим, сколько выдержат покупатели.")],
      grainDown: ["📉", L(`Zboże tanieje (−${v}%)`, `Зерно дешевеет (−${v}%)`), "farmer", L("Za tonę dostajemy coraz mniej.", "За тонну получаем всё меньше.")],
      bakeryLimit: ["🏭", L("Piekarnie ograniczają produkcję", "Пекарни сокращают выпуск"), "baker", L("Mamy wolne piece, ale brakuje zboża.", "Печи свободны, но не хватает зерна.")],
      bakeryFull: ["🔥", L("Piekarnie pracują na pełnych obrotach", "Пекарни работают на пределе"), "baker", L("Piece chodzą całą dobę, a kolejka i tak jest.", "Печи работают круглосуточно, а очередь всё равно есть.")],
      queues: ["🧺", L(`Kolejki po chleb (brakuje ${v}%)`, `Очереди за хлебом (не хватает ${v}%)`), "journalist", L("Półki pustoszeją przed południem.", "Полки пустеют до полудня.")],
      queuesCap: ["🧺", L("Tani chleb, puste półki", "Дешёвый хлеб, пустые полки"), "journalist", L("Cena jest niska — tylko chleba nie ma.", "Цена низкая — только хлеба нет.")],
      jobsDown: ["👷", L(`Firmy zwalniają (bezrobocie ${v}%)`, `Фирмы увольняют (безработица ${v}%)`), "worker", L("U nas skrócili zmiany.", "У нас сократили смены.")],
      jobsUp: ["🤝", L(`Firmy szukają pracowników (bezrobocie ${v}%)`, `Фирмы ищут работников (безработица ${v}%)`), "worker", L("Pierwszy raz od dawna mam wybór.", "Впервые за долгое время есть выбор.")],
      inflHigh: ["🛒", L(`Inflacja przekroczyła 5% (${v}%)`, `Инфляция превысила 5% (${v}%)`), "nbp", L("Ceny rosną szybciej, niż byśmy chcieli.", "Цены растут быстрее, чем хотелось бы.")],
      rainLow: ["🌤️", L("Opady poniżej normy", "Осадки ниже нормы"), "farmer", L("Ziemia jest sucha. Boimy się o zbiory.", "Земля сухая. Боимся за урожай.")],
      harvestStart: ["🌾", L(`Początek żniw: prognoza ${Math.round(v)} t`, `Начало жатвы: прогноз ${Math.round(v)} т`), "farmer", L("Kombajny wyjechały w pole.", "Комбайны вышли в поле.")],
      harvestEnd: ["🏁", L(`Koniec żniw: zebrano ${Math.round(v)} t`, `Конец жатвы: собрано ${Math.round(v)} т`), "farmer", L("Silosy pełne — teraz musi wystarczyć do lata.", "Силосы полны — теперь должно хватить до лета.")],
      exports: ["🚢", L("Nadwyżki zboża płyną na eksport", "Излишки зерна уходят на экспорт"), "farmer", L("Za granicą płacą lepiej.", "За границей платят лучше.")],
      imports: ["⚓", L("Statki z importowanym zbożem w porcie", "В порту суда с импортным зерном"), "baker", L("Bez importu stanęłyby linie.", "Без импорта встали бы линии.")],
      debt: ["💸", L("Dług przekroczył 80% PKB", "Долг превысил 80% ВВП"), "minister", L("Odsetki zjadają coraz większą część budżetu.", "Проценты съедают всё большую часть бюджета.")],
      consumersCut: ["🛍️", L("Konsumenci odkładają zakupy", "Потребители откладывают покупки"), "journalist", L("Sklepy mówią o słabszym ruchu.", "Магазины говорят о слабом потоке.")],
      creditTight: ["🏦", L("Banki zaostrzają kredyty", "Банки ужесточают кредиты"), "nbp", L("Firmy rzadziej dostają finansowanie.", "Фирмы реже получают финансирование.")],
      exportOrders: ["📦", L("Eksporterzy: rekordowe zamówienia", "Экспортёры: рекордные заказы"), "worker", L("W fabryce dokładają zmianę.", "На фабрике добавляют смену.")],
      "warn:hyper": ["🚨", L("Ostrzeżenie: inflacja wymyka się spod kontroli", "Предупреждение: инфляция выходит из-под контроля"), "nbp", L("Jeśli to potrwa, ludzie przestaną ufać złotemu.", "Если это продлится, люди перестанут доверять злотому.")],
      "warn:debt": ["🚨", L("Ostrzeżenie: rynki boją się długu", "Предупреждение: рынки боятся долга"), "minister", L("Kolejne obligacje sprzedamy coraz drożej.", "Следующие облигации продадим всё дороже.")],
      "warn:jobs": ["🚨", L("Ostrzeżenie: masowe bezrobocie", "Предупреждение: массовая безработица"), "worker", L("Pół mojej ulicy szuka pracy.", "Половина моей улицы ищет работу.")],
      "warn:food": ["🚨", L("Ostrzeżenie: kryzys żywnościowy", "Предупреждение: продовольственный кризис"), "journalist", L("Ludzie stoją w kolejkach od świtu.", "Люди стоят в очередях с рассвета.")],
      "warn:approval": ["🚨", L("Ostrzeżenie: protesty na ulicach", "Предупреждение: протесты на улицах"), "journalist", L("Rząd traci zaufanie obywateli.", "Правительство теряет доверие граждан.")],
      "drought:start": ["🌤️", L("Meteorolodzy: sucha wiosna", "Метеорологи: сухая весна"), "farmer", L("Jeśli nie popada, zbiory będą słabe.", "Если не будет дождей, урожай будет слабым.")],
      "drought:stress": ["🌾", L("Prognoza zbiorów się pogarsza", "Прогноз урожая ухудшается"), "farmer", L("Zboże rośnie niskie.", "Зерно растёт низким.")],
      "drought:crisis": ["🌵", L("Susza uderza w uprawy", "Засуха бьёт по посевам"), "farmer", L("Bez wody nic tu nie urośnie.", "Без воды здесь ничего не вырастет.")],
      "drought:recovery": ["🌧️", L("Wracają deszcze", "Возвращаются дожди"), "farmer", L("Wreszcie spadł deszcz.", "Наконец-то пошёл дождь.")],
      "energy:start": ["🛢️", L("Ceny ropy na świecie rosną", "Мировые цены на нефть растут"), "minister", L("To może podnieść koszty wszystkich firm.", "Это может поднять издержки всех фирм.")],
      "energy:stress": ["⚡", L("Rachunki za prąd w górę", "Счета за электричество растут"), "baker", L("Piec elektryczny kosztuje nas fortunę.", "Электропечь обходится в целое состояние.")],
      "energy:crisis": ["⚡", L("Szok energetyczny: firmy podnoszą ceny", "Энергошок: фирмы поднимают цены"), "nbp", L("Wyższa stopa nie doda energii — ale może zatrzymać spiralę cen.", "Высокая ставка не добавит энергии — но может остановить спираль цен.")],
      "energy:recovery": ["🔋", L("Ceny energii spadają", "Цены на энергию падают"), "minister", L("Najgorsze chyba za nami.", "Худшее, кажется, позади.")],
      "boom:start": ["🙂", L("Nastroje konsumentów najlepsze od lat", "Настроения потребителей лучшие за годы"), "journalist", L("Galerie pełne w dzień powszedni.", "Торговые центры полны в будни.")],
      "boom:stress": ["🛍️", L("Sklepy: rekordowa sprzedaż", "Магазины: рекордные продажи"), "worker", L("Szef szuka ludzi na gwałt.", "Шеф срочно ищет людей.")],
      "boom:crisis": ["🔥", L("Gospodarka się przegrzewa?", "Экономика перегревается?"), "nbp", L("Popyt rośnie szybciej niż możliwości firm.", "Спрос растёт быстрее возможностей фирм.")],
      "boom:recovery": ["😐", L("Euforia słabnie", "Эйфория ослабевает"), "journalist", L("Klienci znów liczą każdy grosz.", "Покупатели снова считают каждый грош.")],
      "recession:start": ["🌍", L("Zamówienia z zagranicy maleją", "Заказы из-за рубежа падают"), "worker", L("Mniej kontenerów, mniej pracy.", "Меньше контейнеров — меньше работы.")],
      "recession:stress": ["📉", L("Firmy wstrzymują inwestycje", "Фирмы замораживают инвестиции"), "minister", L("Wpływy z podatków spadają.", "Налоговые поступления падают.")],
      "recession:crisis": ["📉", L("Recesja: sprzedaż i produkcja w dół", "Рецессия: продажи и производство падают"), "worker", L("Mówią o zwolnieniach.", "Говорят об увольнениях.")],
      "recession:recovery": ["🌱", L("Pierwsze oznaki ożywienia", "Первые признаки оживления"), "journalist", L("Zamówień znów przybywa.", "Заказов снова прибавляется.")],
      "credit:start": ["🏦", L("Banki ostrożniejsze z kredytami", "Банки осторожнее с кредитами"), "nbp", L("Ryzyko w sektorze bankowym rośnie.", "Риск в банковском секторе растёт.")],
      "credit:stress": ["💳", L("Trudniej o kredyt", "Кредит получить труднее"), "worker", L("Odmówili nam kredytu na mieszkanie.", "Нам отказали в ипотеке.")],
      "credit:crisis": ["🏦", L("Kryzys kredytowy: inwestycje stają", "Кредитный кризис: инвестиции встают"), "minister", L("Firmy nie mają czym finansować budów.", "Фирмам нечем финансировать стройки.")],
      "credit:recovery": ["🏦", L("Banki znów pożyczają", "Банки снова кредитуют"), "nbp", L("Rynek kredytowy się stabilizuje.", "Кредитный рынок стабилизируется.")],
      "trade:start": ["🚫", L("Zakłócenia w transporcie morskim", "Сбои в морских перевозках"), "baker", L("Dostawy z portu się spóźniają.", "Поставки из порта опаздывают.")],
      "trade:crisis": ["🚫", L("Porty sąsiadów zamknięte", "Порты соседей закрыты"), "minister", L("Import i eksport mocno ograniczone.", "Импорт и экспорт сильно ограничены.")],
      "trade:recovery": ["⚓", L("Handel wraca do normy", "Торговля возвращается к норме"), "baker", L("Statki znów przypływają.", "Суда снова приходят.")],
      "built:piekarnia": ["🥖", L("Nowa piekarnia otwarta", "Открыта новая пекарня"), "baker", L("Więcej pieców — o ile będzie z czego piec.", "Больше печей — если будет из чего печь.")],
      "built:nawadnianie": ["💧", L("Kanały nawadniające gotowe", "Ирригационные каналы готовы"), "farmer", L("Susza nie będzie już tak straszna.", "Засуха уже не так страшна.")],
      "built:elektrownia": ["⚡", L("Nowa elektrownia działa", "Новая электростанция работает"), "minister", L("Mniej zależymy od cen energii na świecie.", "Меньше зависим от мировых цен на энергию.")],
      "built:kolej": ["🚆", L("Nowa linia kolejowa", "Новая железная дорога"), "worker", L("Towary jadą taniej i szybciej.", "Товары едут дешевле и быстрее.")],
      "built:port": ["🚢", L("Rozbudowany port przyjmuje większe statki", "Расширенный порт принимает большие суда"), "worker", L("Więcej handlu — więcej pracy na nabrzeżu.", "Больше торговли — больше работы на причале.")],
    };
    if (/^start:/.test(n.id)) return ["🏗️", L(`Rusza budowa: ${PROJ_NAMES(lang)[k]}`, `Начинается стройка: ${PROJ_NAMES(lang)[k]}`), "worker", L("Na budowie jest praca.", "На стройке есть работа.")];
    return map[n.id] || [E.icon || "📰", E.name || n.id, "journalist", ""];
  }

  // Pojęcia: najpierw doświadczenie, potem krótko, na końcu nazwa
  function concepts(lang){
    const L = mk(lang);
    return {
      scarcity: { t: L("Rzadkość", "Редкость"), chain: ["🌾 " + L("mało zboża", "мало зерна"), "🍞 " + L("mało chleba", "мало хлеба"), "⚖️ " + L("trzeba wybierać", "приходится выбирать")], d: L("Zasobów jest mniej, niż ludzie chcą. Każda decyzja to wybór, kto dostanie mniej.", "Ресурсов меньше, чем хотят люди. Каждое решение — выбор, кому достанется меньше.") },
      shortage: { t: L("Niedobór", "Дефицит"), chain: ["🛒 " + L("popyt", "спрос") + " > 🏭 " + L("podaż", "предложение"), "🧺 " + L("kolejki", "очереди")], d: L("Przy danej cenie ludzie chcą kupić więcej, niż jest towaru.", "При данной цене люди хотят купить больше, чем есть товара.") },
      ceiling: { t: L("Cena maksymalna", "Потолок цены"), chain: ["📜 " + L("cena w dół", "цена вниз"), "🛒 " + L("chętnych więcej", "желающих больше"), "🏭 " + L("chleba tyle samo", "хлеба столько же"), "🧺 " + L("niedobór", "дефицит")], d: L("Cena poniżej równowagi nie dodaje towaru — tworzy kolejki.", "Цена ниже равновесной не добавляет товара — создаёт очереди.") },
      equilibrium: { t: L("Równowaga rynkowa", "Рыночное равновесие"), chain: ["⚠️ " + L("niedobór", "дефицит"), "💰 " + L("cena rośnie", "цена растёт"), "🛒 " + L("popyt spada", "спрос падает"), "⚖️ " + L("popyt = podaż", "спрос = предложение")], d: L("Cena dąży tam, gdzie ilość chciana = ilość dostępna. Robi to stopniowo.", "Цена стремится туда, где желаемое = доступному. Постепенно.") },
      elasticity: { t: L("Elastyczność cenowa popytu", "Ценовая эластичность спроса"), chain: ["💰 " + L("chleb +10%", "хлеб +10%"), "🛒 " + L("popyt −6%", "спрос −6%")], d: L("Chleb to dobro podstawowe: przy podwyżce kupujemy tylko trochę mniej.", "Хлеб — базовый товар: при подорожании покупаем лишь немного меньше.") },
      supplyShock: { t: L("Szok podażowy", "Шок предложения"), chain: ["🌵 " + L("susza", "засуха"), "🌾 " + L("zbiory ↓", "урожай ↓"), "💰 " + L("ceny ↑", "цены ↑")], d: L("Nagle spada ilość, jaką gospodarka może wytworzyć.", "Внезапно падает то, что экономика может произвести.") },
      costPush: { t: L("Inflacja kosztowa", "Инфляция издержек"), chain: ["⚡ " + L("energia ↑", "энергия ↑"), "🏭 " + L("koszty firm ↑", "издержки фирм ↑"), "💰 " + L("ceny ↑", "цены ↑"), "👛 " + L("dochód realny ↓", "реальный доход ↓")], d: L("Ceny rosną, bo produkcja drożeje — nie dlatego, że ludzie więcej kupują.", "Цены растут, потому что производство дорожает, а не потому, что больше покупают.") },
      demandPull: { t: L("Inflacja popytowa", "Инфляция спроса"), chain: ["🙂 " + L("nastroje ↑", "настроения ↑"), "🛍️ " + L("konsumpcja ↑", "потребление ↑"), "📈 AD ↑", "💰 " + L("ceny ↑", "цены ↑")], d: L("Popyt rośnie szybciej niż możliwości produkcji.", "Спрос растёт быстрее производственных возможностей.") },
      cycle: { t: L("Cykl koniunkturalny", "Экономический цикл"), chain: ["📈 " + L("ożywienie", "оживление"), "🔥 " + L("szczyt", "пик"), "📉 " + L("recesja", "рецессия"), "🌱 " + L("odbicie", "восстановление")], d: L("Gospodarka nie rośnie równo: przyspiesza i zwalnia.", "Экономика растёт неравномерно: ускоряется и замедляется.") },
      fiscal: { t: L("Polityka fiskalna", "Фискальная политика"), chain: ["🏛️ " + L("wydatki ↑ / podatki ↓", "расходы ↑ / налоги ↓"), "📈 AD ↑", "👷 " + L("zatrudnienie ↑", "занятость ↑"), "💸 " + L("dług ↑", "долг ↑")], d: L("Rząd wpływa na popyt przez wydatki i podatki.", "Правительство влияет на спрос через расходы и налоги.") },
      multiplier: { t: L("Mnożnik wydatków", "Мультипликатор расходов"), chain: ["🏗️ " + L("budowa", "стройка"), "👷 " + L("pensje", "зарплаты"), "🛍️ " + L("zakupy", "покупки"), "🏪 " + L("dochody innych", "доходы других")], d: L("Wydany złoty krąży: czyjś wydatek to czyjś dochód.", "Потраченный злотый ходит по кругу: чей-то расход — чей-то доход.") },
      monetary: { t: L("Polityka pieniężna", "Денежная политика"), chain: ["🏦 " + L("stopa ↑", "ставка ↑"), "💳 " + L("kredyt drożeje", "кредит дорожает"), "🏗️ " + L("inwestycje ↓", "инвестиции ↓"), "📊 " + L("inflacja ↓ (z opóźnieniem)", "инфляция ↓ (с задержкой)")], d: L("NBP zmienia koszt pieniądza. Działa wolno — miesiącami.", "NBP меняет стоимость денег. Действует медленно — месяцами.") },
      opportunity: { t: L("Koszt alternatywny", "Альтернативные издержки"), chain: ["💰 " + L("mln na budowę", "млн на стройку"), "🚫 " + L("nie ma ich na szkoły, rezerwy, niższe podatki", "их нет на школы, резервы, снижение налогов")], d: L("Prawdziwy koszt wyboru to najlepsza rzecz, z której rezygnujesz.", "Настоящая цена выбора — лучшее, от чего отказываешься.") },
      trade: { t: L("Handel zagraniczny", "Внешняя торговля"), chain: ["🌍 " + L("cena światowa", "мировая цена"), "🚢 " + L("import / eksport", "импорт / экспорт"), "⚖️ " + L("ceny w kraju", "цены в стране")], d: L("Gdy w kraju drożej niż za granicą — opłaca się import; gdy taniej — eksport.", "Когда в стране дороже, чем за рубежом, выгоден импорт; когда дешевле — экспорт.") },
      debt: { t: L("Dług publiczny", "Государственный долг"), chain: ["➖ " + L("deficyt", "дефицит"), "🧾 " + L("pożyczki", "заимствования"), "💸 " + L("odsetki ↑", "проценты ↑")], d: L("Dzisiejszy deficyt to jutrzejsze odsetki.", "Сегодняшний дефицит — завтрашние проценты.") },
    };
  }

  // ================================================================ ŚWIAT 3D
  const C3 = { grass: 0x86c95f, soil: 0x8a5a3b, dark: 0x4a4a55, road: 0xd9ccb0, water: 0x4fb3e8, wall: 0xfff4e2, red: 0xe2574c, blue: 0x4a7bd8, green: 0x3fae6e, gold: 0xf2c53d, wood: 0xb07a4a, stone: 0xd6d1c8, wheat: 0xf0c94a, white: 0xffffff, glass: 0x9fd3ff, orange: 0xf08a3c, purple: 0x8a6bd1, teal: 0x2eb8a6, steel: 0x9aa4b2, skin: 0xf3cba5 };
  function makeWorld(THREE, canvas){
    const R = new THREE.WebGLRenderer({ canvas, antialias: true });
    R.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xbfe3ff, 70, 130);
    const cam = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 300);
    cam.position.set(34, 32, 34); cam.lookAt(0, -1, 0);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x7a8a99, 0.7); scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff0d8, 0.85); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 120 }); scene.add(sun); scene.add(sun.target);
    const mats = {}, M = (c, o = {}) => { const k = c + JSON.stringify(o); return mats[k] || (mats[k] = new THREE.MeshLambertMaterial({ color: c, ...o })); };
    const box = (w, h, d, c, x, y, z, P = scene, o) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof c === "object" ? c : M(c, o)); m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; P.add(m); return m; };
    const cyl = (rt, rb, h, c, x, y, z, P = scene, seg = 12) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), typeof c === "object" ? c : M(c)); m.position.set(x, y + h / 2, z); m.castShadow = m.receiveShadow = true; P.add(m); return m; };
    const roof = (w, d, h, c, x, y, z, P = scene) => { const g = new THREE.CylinderGeometry(0.001, 1, 1, 4, 1); g.rotateY(Math.PI / 4); const m = new THREE.Mesh(g, M(c)); m.scale.set(w * 0.72, h, d * 0.72); m.position.set(x, y + h / 2, z); m.castShadow = true; P.add(m); return m; };
    const gable = (w, d, h, c, x, y, z, P = scene) => { const s = new THREE.Shape(); s.moveTo(-w / 2, 0); s.lineTo(0, h); s.lineTo(w / 2, 0); const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false }); g.translate(0, 0, -d / 2); const m = new THREE.Mesh(g, M(c)); m.position.set(x, y, z); m.castShadow = true; P.add(m); return m; };

    // --- teren
    const W = 30, Dp = 22;
    const grassMat = new THREE.MeshLambertMaterial({ color: C3.grass });
    box(W, 1, Dp, grassMat, 0, 0, 0); box(W, 2.6, Dp, C3.soil, 0, -2.6, 0); box(W - 0.4, 1.2, Dp - 0.4, 0x6b4429, 0, -3.8, 0);
    const water = new THREE.MeshLambertMaterial({ color: C3.water, transparent: true, opacity: 0.92 });
    box(4.2, 0.08, Dp, water, 12.9, 0.96, 0);
    box(W - 4.2, 0.05, 1.5, C3.road, -2.1, 1, 0.2); box(1.5, 0.05, 9.6, C3.road, 1.6, 1, -5.6); box(1.5, 0.05, 6.4, C3.road, -6.5, 1, 4.4);
    for (let x = -14.5; x < 10.8; x += 0.7) box(0.16, 0.06, 1.1, C3.wood, x, 1, 8.6);
    box(25.4, 0.08, 0.1, C3.steel, -1.85, 1.05, 8.25); box(25.4, 0.08, 0.1, C3.steel, -1.85, 1.05, 8.95);
    const lamps = [];
    const lamp = (x, z) => { cyl(0.05, 0.05, 1.3, C3.dark, x, 1, z); const b = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 6), new THREE.MeshLambertMaterial({ color: 0xfff1b0, emissive: 0x000000 })); b.position.set(x, 2.35, z); scene.add(b); lamps.push(b); };
    [[-12, 1.2], [-6, 1.2], [0, 1.2], [6, 1.2], [2.6, -3], [2.6, -7]].forEach(([x, z]) => lamp(x, z));
    const trees = [];
    const tree = (x, z, s = 1, pine) => { cyl(0.1 * s, 0.14 * s, 0.6 * s, C3.wood, x, 1, z, scene, 6); const g = pine ? new THREE.ConeGeometry(0.6 * s, 1.5 * s, 7) : new THREE.IcosahedronGeometry(0.6 * s, 0); const t = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ color: 0x3fa35a })); t.position.set(x, 1 + (pine ? 1.3 : 1.05) * s, z); t.castShadow = true; scene.add(t); trees.push(t); };
    [[-14, -10], [-13, 9.8], [-8.5, -9.6], [9.8, 9.5], [8, -10], [-3.5, 9.9], [4.5, 10], [-14.2, -2.5], [10.4, 3.8], [-4.4, -4.2], [5.2, -1.6]].forEach(([x, z], i) => tree(x, z, 0.9 + (i % 3) * 0.12, i % 2));

    const groups = {}, anchor = {};
    const group = (id, x, z, ay = 3.5) => { const g = new THREE.Group(); g.position.set(x, 0, z); g.userData.id = id; scene.add(g); groups[id] = g; anchor[id] = [x, ay, z]; return g; };

    // --- rolnictwo (zachód)
    const fields = [];
    { const g = group("farma", -10.5, -3.5, 3);
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++){
        box(2.2, 0.12, 2.2, 0x7a5232, -2.6 + i * 2.5, 1, -2.6 + j * 2.5, g);
        const crop = box(2.0, 0.5, 2.0, new THREE.MeshLambertMaterial({ color: C3.wheat }), -2.6 + i * 2.5, 1.12, -2.6 + j * 2.5, g);
        fields.push({ crop });
      }
      box(1.8, 1.4, 1.4, C3.red, 3.2, 1, 3.4, g); gable(1.9, 1.5, 0.9, C3.wall, 3.2, 2.4, 3.4, g); }
    const silos = [];
    { const g = group("silosy", -10.5, 4.2, 4.2);
      [[-1.6, 0], [0, 0], [1.6, 0]].forEach(([x, z]) => { cyl(0.7, 0.7, 3.2, 0xe4e7ec, x, 1, z, g, 16); cyl(0.01, 0.75, 0.6, C3.steel, x, 4.2, z, g, 16);
        const fill = cyl(0.72, 0.72, 1, new THREE.MeshLambertMaterial({ color: C3.gold }), x, 1, z, g, 16); silos.push(fill); });
      box(5, 0.15, 1.6, C3.stone, 0, 1, 1.5, g); }
    const lots = {};
    lots.nawadnianie = { x: -10.5, z: -9.4, w: 7, d: 1.6, build(g){ box(7, 0.06, 0.7, water, 0, 1, 0, g); [-3, 0, 3].forEach(x => { cyl(0.1, 0.1, 0.9, C3.steel, x, 1, 0.6, g, 6); box(0.1, 0.1, 2.2, C3.steel, x, 1.9, -0.4, g); }); } };

    // --- piekarnie (północ)
    const bakerySmoke = [];
    const bakerySlots = [[-3.8, -6.2], [-0.6, -9.2], [-4.4, -9.4]];
    const makeBakery = (i) => { const [x, z] = bakerySlots[i]; const g = group(i === 0 ? "piekarnia" : "piekarnia" + (i + 1), x, z, 3.6);
      box(2.6, 1.8, 2.2, C3.wall, 0, 1, 0, g); gable(2.8, 2.4, 1.1, i ? C3.blue : C3.red, 0, 2.8, 0, g); box(0.45, 1.6, 0.45, C3.stone, 0.8, 2.9, -0.5, g);
      box(1.6, 0.45, 0.06, C3.wood, 0, 2.0, 1.12, g); const loaf = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), M(0xd9984a)); loaf.scale.set(1.5, 0.75, 1); loaf.position.set(0, 2.25, 1.2); g.add(loaf);
      g.userData.win = box(0.7, 0.6, 0.05, new THREE.MeshLambertMaterial({ color: C3.glass, emissive: 0x000000 }), -0.7, 1.4, 1.11, g);
      bakerySmoke.push([x + 0.8, 4.6, z - 0.5]); return g; };
    makeBakery(0);

    // --- miasto (centrum)
    const houses = [];
    [[-1.6, 3], [0.2, 3.4], [-3.4, 3.6], [4.6, 3.4], [6.4, 3.2], [-5.2, 6.4], [-3, 6.2], [4, 6.4], [6.4, 6.2], [-0.6, 6.1], [8.2, 4.6], [1.8, 6.4]].forEach(([x, z], i) => { const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
      const h = 1 + (i % 3) * 0.35, c = [C3.red, C3.blue, C3.green, C3.orange, C3.purple, C3.teal][i % 6];
      box(1.3, h, 1.2, C3.wall, 0, 1, 0, g); gable(1.4, 1.3, 0.7, c, 0, 1 + h, 0, g);
      const win = box(0.35, 0.3, 0.04, new THREE.MeshLambertMaterial({ color: 0x8aa7c4, emissive: 0x000000 }), 0.25, 1 + h * 0.55, 0.62, g); houses.push({ win, on: (i * 0.37) % 1 }); });
    { const g = group("sklep", 2.6, 3.0, 3);
      box(2.4, 1.4, 1.8, C3.wall, 0, 1, 0, g); box(2.6, 0.15, 0.9, C3.green, 0, 2.2, 1.2, g); box(2.5, 0.2, 1.9, C3.green, 0, 2.4, 0, g);
      box(1.6, 0.8, 0.05, new THREE.MeshLambertMaterial({ color: C3.glass }), 0, 1.25, 0.91, g); }
    { const g = group("rzad", -6.2, -2.8, 5.4);
      box(4, 0.3, 2.8, C3.stone, 0, 1, 0, g); box(3.6, 1.9, 2.2, C3.wall, 0, 1.3, -0.1, g);
      for (let i = -1.5; i <= 1.5; i += 0.75) cyl(0.11, 0.11, 1.9, C3.white, i, 1.3, 1.15, g, 8);
      box(3.9, 0.3, 2.6, C3.stone, 0, 3.2, 0, g); roof(4, 2.8, 1, C3.blue, 0, 3.5, 0, g);
      cyl(0.04, 0.04, 1.8, C3.dark, 1.7, 4.4, -0.8, g, 6); g.userData.flag = box(0.9, 0.5, 0.04, C3.red, 2.15, 5.6, -0.8, g); }
    { const g = group("nbp", -1.6, -2.6, 4.6);
      box(2.8, 2.4, 2.2, C3.stone, 0, 1, 0, g); box(3.1, 0.3, 2.5, C3.white, 0, 3.4, 0, g);
      for (let i = -1; i <= 1; i++) cyl(0.12, 0.12, 2.2, C3.white, i, 1, 1.2, g, 8);
      const coin = cyl(0.65, 0.65, 0.16, C3.gold, 0, 4.2, 0, g, 24); coin.rotation.x = Math.PI / 2; coin.position.y = 4.5; g.userData.coin = coin; }
    { const g = group("bank", 5.6, -2.8, 4.4);
      box(2.2, 2.8, 2, C3.glass, 0, 1, 0, g); box(2.3, 0.2, 2.1, C3.steel, 0, 3.8, 0, g);
      for (let y = 1.4; y < 3.6; y += 0.55) box(2.24, 0.06, 2.04, C3.steel, 0, y, 0, g); }

    // --- przemysł (północny wschód)
    const factorySmoke = [];
    { const g = group("fabryka", 6.8, -7.4, 4.6);
      box(4.2, 2, 3, 0xc9ccd3, 0, 1, 0, g); for (let i = 0; i < 3; i++) gable(1.4, 3, 0.6, C3.steel, -1.4 + i * 1.4, 3, 0, g);
      cyl(0.3, 0.38, 3.2, C3.red, 1.6, 1, -1, g, 10); factorySmoke.push([8.4, 4.4, -8.4]); }
    lots.elektrownia = { x: 2.0, z: -9.4, w: 3.4, d: 2.6, build(g){ cyl(1.0, 1.25, 3, 0xd9dde4, -0.6, 1, 0, g, 18); box(1.6, 1.6, 1.6, C3.stone, 1.0, 1, 0.4, g); box(0.1, 3, 0.1, C3.steel, 1.6, 2.6, -0.6, g); } };
    lots.piekarnia = { x: bakerySlots[1][0], z: bakerySlots[1][1], w: 2.8, d: 2.4 };
    lots.kolej = { x: -7.6, z: 7.1, w: 3.6, d: 1.4, build(g){ box(3.6, 0.3, 1.4, C3.stone, 0, 1, 0, g); box(3.2, 1.2, 0.12, C3.wall, 0, 1.3, -0.6, g); box(3.6, 0.14, 1.4, C3.red, 0, 2.5, 0, g); } };
    lots.port = { x: 10.4, z: -4.2, w: 1.6, d: 4, build(g){ box(1.6, 0.4, 4, C3.stone, 0, 0.8, 0, g); cyl(0.12, 0.12, 3, C3.orange, 0, 1.2, -1.2, g, 6); box(0.14, 0.14, 2.6, C3.orange, 0.9, 4.1, -1.2, g); } };

    // --- port (wschód)
    { const g = group("port", 10.4, 2.4, 3.2);
      box(1.6, 0.4, 5, C3.stone, 0, 0.8, 0, g); cyl(0.12, 0.12, 2.6, C3.orange, 0, 1.2, -1.4, g, 6); box(0.14, 0.14, 2.4, C3.orange, 0.9, 3.7, -1.4, g);
      [C3.red, C3.blue, C3.green].forEach((c, i) => box(0.9, 0.5, 0.45, c, -0.1, 1.2, 0.6 + i * 0.6, g)); }
    const ship = new THREE.Group(); { box(3.2, 0.7, 1.1, C3.dark, 0, 0, 0, ship); box(0.9, 0.7, 0.9, C3.white, -1, 0.7, 0, ship); [C3.red, C3.gold].forEach((c, i) => box(0.8, 0.4, 0.8, c, 0.3 + i * 0.9, 0.7, 0, ship)); ship.position.set(13, 0.85, 6); ship.rotation.y = Math.PI / 2; scene.add(ship); }

    // --- budowy
    const lotMarks = {}, built = {}, scaff = {};
    Object.entries(lots).forEach(([k, l]) => { lotMarks[k] = box(l.w, 0.04, l.d, 0xd9c99a, l.x, 1, l.z); });

    // --- ruch
    const carColors = [C3.red, C3.blue, C3.gold, C3.green, C3.white, C3.purple];
    const mkCar = (c, truck) => { const t = new THREE.Group(); box(truck ? 1.2 : 0.8, truck ? 0.6 : 0.36, 0.5, truck ? C3.blue : c, 0, 0.12, 0, t); box(truck ? 0.38 : 0.42, 0.3, 0.46, truck ? C3.white : 0xdfeaf5, truck ? -0.75 : 0, truck ? 0.12 : 0.48, 0, t); if (truck) t.userData.load = box(1.0, 0.25, 0.42, C3.wheat, 0.08, 0.72, 0, t); t.visible = false; scene.add(t); return t; };
    const cars = Array.from({ length: 14 }, (_, i) => ({ o: mkCar(carColors[i % 6]), ph: i / 14, lane: i % 2 }));
    const trucks = Array.from({ length: 6 }, (_, i) => ({ o: mkCar(0, true), ph: i / 6 }));
    const train = new THREE.Group(); { box(1.6, 0.9, 0.8, C3.red, 0, 0.1, 0, train); for (let i = 1; i <= 4; i++) box(1.5, 0.7, 0.75, i % 2 ? C3.steel : C3.gold, -i * 1.7, 0.1, 0, train); train.position.set(-16, 1.05, 8.6); scene.add(train); }
    const mkPerson = c => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 0.55, 8), M(c)); b.position.y = 0.28; b.castShadow = true; g.add(b); const h = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), M(C3.skin)); h.position.y = 0.7; g.add(h); scene.add(g); return g; };
    const queue = Array.from({ length: 9 }, (_, i) => { const p = mkPerson([C3.orange, C3.blue, C3.purple][i % 3]); p.position.set(3.6 + (i % 5) * 0.42, 1, 4.4 + Math.floor(i / 5) * 0.5); p.visible = false; return p; });
    const walkers = Array.from({ length: 10 }, (_, i) => ({ o: mkPerson([C3.orange, C3.blue, C3.purple, C3.green, C3.red][i % 5]), x: -10 + i * 2, v: (i % 2 ? 1 : -1) * (0.03 + i * 0.002), z: 1.0 + (i % 2) * 0.5 }));
    const workers = Array.from({ length: 6 }, () => { const p = mkPerson(C3.gold); p.visible = false; return p; });

    // --- dym i opady
    const smoke = Array.from({ length: 26 }, (_, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), new THREE.MeshLambertMaterial({ color: 0xeeeeee, transparent: true, opacity: 0.6 })); s.visible = false; scene.add(s); return { o: s, t: i / 26 }; });
    const RN = 700, rp = new Float32Array(RN * 3);
    for (let i = 0; i < RN; i++){ rp[i * 3] = (Math.random() - 0.5) * W; rp[i * 3 + 1] = Math.random() * 14 + 1; rp[i * 3 + 2] = (Math.random() - 0.5) * Dp; }
    const rainGeo = new THREE.BufferGeometry(); rainGeo.setAttribute("position", new THREE.BufferAttribute(rp, 3));
    const rainMat = new THREE.PointsMaterial({ color: 0xa8c8ff, size: 0.09, transparent: true, opacity: 0.75 }), snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent: true, opacity: 0.9 });
    const rain = new THREE.Points(rainGeo, rainMat); rain.visible = false; scene.add(rain);

    // --- wybór obiektów
    const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
    const pick = (cx, cy) => { const r = canvas.getBoundingClientRect(); v2.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1); ray.setFromCamera(v2, cam); const hit = ray.intersectObjects(Object.values(groups), true)[0]; let o = hit?.object; while (o && !o.userData.id) o = o.parent; return o?.userData.id || null; };
    let selected = null;
    const hl = new Map();
    const highlight = id => { selected = id; Object.entries(groups).forEach(([k, g]) => g.traverse(m => { if (!m.isMesh) return; if (!m.userData.m0) m.userData.m0 = m.material; if (k === id){ if (!hl.has(m.userData.m0)){ const c = m.userData.m0.clone(); c.emissive = new THREE.Color(0x2a4a8a); c.emissiveIntensity = 0.45; hl.set(m.userData.m0, c); } m.material = hl.get(m.userData.m0); } else m.material = m.userData.m0; })); };

    // --- stan wizualny (z gospodarki)
    let V = { prod: 1, trade: 0.3, act: 1, short: 0, stock: 0.6, crop: 1, month: 0, dayIn: 0, rain: 1, energy: 1, building: [], built: [], bakeries: 1, running: false, speed: 1, workers: 0.94 };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const season = m => [0.0, 0.05, 0.25, 0.55, 0.8, 1, 1, 0.95, 0.75, 0.5, 0.25, 0.05][m];
    const cGrass = new THREE.Color(), cTmp = new THREE.Color(), sky = new THREE.Color();
    function apply(v){
      V = { ...V, ...v };
      const gr = season(V.month), dry = clamp(1 - V.rain, 0, 0.6) * (V.month >= 3 && V.month <= 8 ? 1 : 0.3);
      cGrass.setRGB(lerp(0.70, 0.47, gr), lerp(0.74, 0.78, gr), lerp(0.62, 0.33, gr));
      const winter = V.month === 11 || V.month <= 1;
      if (winter) cGrass.lerp(cTmp.set(0xf2f5fa), V.month === 0 ? 0.75 : 0.45);
      cGrass.lerp(cTmp.set(0xc9b86a), dry * 1.1); grassMat.color.copy(cGrass);
      trees.forEach((t, i) => { t.material.color.set(V.month >= 9 && V.month <= 10 && i % 2 === 0 ? 0xd98b2b : winter ? (i % 2 ? 0x2f7a4a : 0x9a8f80) : 0x3fa35a); if (winter) t.material.color.lerp(cTmp.set(0xffffff), 0.35); });
      const m = V.month, hgt = m < 3 ? 0.08 : m < 6 ? 0.3 + (m - 3) * 0.25 : m < 9 ? 1 : 0.06;
      const col = m < 3 || m > 8 ? (winter ? 0xf0f2f6 : 0x8a6a45) : m < 6 ? 0x6cc04a : 0xf0c94a;
      const cut = m >= 6 && m <= 8 ? Math.floor(((m - 6) + V.dayIn) / 3 * 9) : 0;
      fields.forEach((f, i) => { const harvested = i < cut; f.crop.scale.y = harvested ? 0.12 : clamp(hgt * (0.55 + 0.45 * V.crop), 0.06, 1.3); f.crop.material.color.set(harvested ? 0xc8a46a : col); if (m >= 3 && m <= 8 && !harvested) f.crop.material.color.lerp(cTmp.set(0xb59a5a), clamp(1 - V.crop, 0, 0.6)); });
      silos.forEach((s, i) => { const f = clamp(V.stock * 3 - i, 0, 1); s.scale.y = Math.max(0.01, f * 3.2); s.visible = f > 0.01; });
      queue.forEach((p, i) => p.visible = i < Math.round(clamp(V.short * 0.9, 0, 9)));
      Object.entries(lots).forEach(([k, l]) => {
        const isB = V.building.includes(k);
        if (isB && !scaff[k]){ const g = new THREE.Group(); g.position.set(l.x, 0, l.z); for (const [x, z] of [[-1, -0.8], [1, -0.8], [-1, 0.8], [1, 0.8]]){ const p = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.2, 0.09), M(0xf0a030)); p.position.set(x * l.w * 0.4, 2.1, z * l.d * 0.4); g.add(p); }
          const cr = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 3), M(0xf0a030)); cr.position.set(0, 4, 0); g.add(cr); g.userData.crane = cr; const mast = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3, 0.14), M(0xf0a030)); mast.position.set(0, 2.5, 0); g.add(mast); scene.add(g); scaff[k] = g; }
        if (!isB && scaff[k]){ scene.remove(scaff[k]); delete scaff[k]; }
      });
      if (V.bakeries > 1 && !built.piekarnia2){ built.piekarnia2 = makeBakery(1); scene.remove(lotMarks.piekarnia); popIn(built.piekarnia2); }
      if (V.bakeries > 2 && !built.piekarnia3){ built.piekarnia3 = makeBakery(2); popIn(built.piekarnia3); }
      ["nawadnianie", "elektrownia", "kolej", "port"].forEach(k => { if (V.built.includes(k) && !built[k]){ const l = lots[k], g = group(k === "port" ? "port2" : k, l.x, l.z, 3); l.build(g); scene.remove(lotMarks[k]); built[k] = g; popIn(g); if (k === "elektrownia") factorySmoke.push([1.4, 4.2, -9.4]); } });
      if (selected) highlight(selected);
    }
    function popIn(g){ if (reduce) return; const t0 = performance.now(); g.scale.set(1, 0.01, 1); const step = t => { const k = Math.min(1, (t - t0) / 600), e = 1 - Math.pow(1 - k, 3); g.scale.set(1, Math.max(0.01, e), 1); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }

    // --- animacja: świat żyje zawsze, szybciej gdy płynie czas
    let last = 0, t = 0, tod = 0.35, raf = 0, alive = true;
    function frame(now){
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (now - (frame.lt || 0) < 33) return;
      const dt = Math.min(0.1, (now - (frame.lt || now)) / 1000); frame.lt = now;
      const go = V.running && !reduce, sp = go ? Math.min(3, 0.6 + V.speed * 0.25) : 0.2;
      t += dt * sp;
      // dzień i noc: pełny cykl ok. 80 s przy ▶; przy ⏭ i pauzie powoli wraca do dnia
      if (go && V.speed < 16) tod = (tod + dt / 80) % 1; else tod = lerp(tod, tod > 0.75 ? 1.35 : 0.35, 0.01) % 1;
      const daylight = clamp(Math.sin(tod * Math.PI) * 1.5 - 0.2, 0, 1), ang = (tod - 0.25) * Math.PI;
      sun.position.set(-Math.cos(tod * Math.PI) * 30, 6 + 26 * daylight, 14); sun.intensity = 0.12 + 0.82 * daylight; void ang;
      hemi.intensity = 0.32 + 0.42 * daylight;
      sky.setRGB(lerp(0.10, 0.74, daylight), lerp(0.13, 0.88, daylight), lerp(0.28, 1, daylight));
      if (daylight > 0.05 && daylight < 0.45) sky.lerp(cTmp.set(0xf6a96b), 0.35 * (1 - Math.abs(daylight - 0.25) * 4));
      if (V.rain > 1.12) sky.lerp(cTmp.set(0x9aa6b4), 0.4);
      scene.background = sky; scene.fog.color.copy(sky);
      const night = 1 - daylight, lit = night > 0.45;
      lamps.forEach(l => l.material.emissive.setRGB(night, night * 0.85, night * 0.4));
      houses.forEach(h => { const on = lit && h.on < 0.25 + 0.7 * V.workers; h.win.material.emissive.setRGB(on ? 0.95 : 0, on ? 0.75 : 0, on ? 0.35 : 0); });
      Object.keys(groups).filter(k => k.startsWith("piekarnia")).forEach(k => { const w = groups[k].userData.win; if (w) w.material.emissive.setRGB(0.9 * clamp(V.prod, 0, 1) * (0.25 + night), 0.5 * clamp(V.prod, 0, 1) * (0.25 + night), 0.08); });
      const nCars = Math.round(clamp(V.act, 0.5, 1.3) * 12 - 3);
      cars.forEach((c, i) => { c.o.visible = i < nCars; if (!c.o.visible) return; const k = (c.ph + t * 0.035 * (c.lane ? 1 : 0.9)) % 1; const x = c.lane ? lerp(-14.5, 11, k) : lerp(11, -14.5, k); c.o.position.set(x, 1.02, c.lane ? 0.55 : -0.15); c.o.rotation.y = c.lane ? 0 : Math.PI; });
      const nTr = Math.round(clamp(V.prod, 0, 1.2) * 5);
      trucks.forEach((c, i) => { c.o.visible = i < nTr; if (!c.o.visible) return; const k = (c.ph + t * 0.025) % 1; let x, z, ry;
        if (k < 0.35){ x = -6.5; z = lerp(2.8, 0.5, k / 0.35); ry = Math.PI / 2; } else if (k < 0.7){ x = lerp(-6.5, 1.6, (k - 0.35) / 0.35); z = 0.55; ry = 0; } else { x = 1.6; z = lerp(0.2, -5.2, (k - 0.7) / 0.3); ry = Math.PI / 2; }
        c.o.position.set(x, 1.02, z); c.o.rotation.y = ry; c.o.userData.load.visible = V.stock > 0.03; });
      train.position.x = -16 + ((t * 1.6 * (0.5 + V.act * 0.6 + (V.built.includes("kolej") ? 0.5 : 0))) % 34);
      ship.position.z = 7 - ((t * 0.6 * (0.3 + V.trade)) % 16);
      walkers.forEach((w, i) => { w.x += w.v * (go ? 1 : 0.3); if (w.x > 9 || w.x < -14) w.v *= -1; w.o.position.set(w.x, 1 + Math.abs(Math.sin(t * 6 + i)) * 0.05, w.z); w.o.rotation.y = w.v > 0 ? Math.PI / 2 : -Math.PI / 2; w.o.visible = i < Math.round(3 + 7 * V.workers) && !(lit && i > 3); });
      queue.forEach((p, i) => { if (p.visible) p.position.y = 1 + Math.abs(Math.sin(t * 4 + i)) * 0.04; });
      const sk = Object.keys(scaff);
      workers.forEach((p, i) => { const k = sk[i % Math.max(1, sk.length)]; p.visible = !!k && i < sk.length * 3; if (p.visible){ const l = lots[k]; p.position.set(l.x + Math.sin(t * 1.5 + i) * 0.9, 1, l.z + l.d / 2 + 0.4 + (i % 2) * 0.2); } });
      const srcs = [...bakerySmoke.map(s => [s, V.prod]), ...factorySmoke.map(s => [s, V.act])];
      smoke.forEach((s, i) => { const [src, lvl] = srcs[i % srcs.length]; if (i >= 26 * clamp(lvl, 0.15, 1.1)){ s.o.visible = false; return; } s.t = (s.t + dt * 0.25 * (go ? 1 : 0.4)) % 1; s.o.visible = true; s.o.position.set(src[0] + Math.sin(i + s.t * 3) * 0.25, src[1] + s.t * 2.8, src[2]); s.o.scale.setScalar(0.5 + s.t * 1.4); s.o.material.opacity = 0.55 * (1 - s.t); s.o.material.color.setScalar(V.energy > 1.3 ? 0.62 : 0.93); });
      const winter = V.month === 11 || V.month <= 1, wet = V.rain > 1.1 || (winter && V.rain > 1.02);
      rain.visible = wet && !reduce; rain.material = winter ? snowMat : rainMat;
      if (rain.visible){ const a = rain.geometry.attributes.position; for (let i = 0; i < RN; i++){ let y = a.array[i * 3 + 1] - (winter ? 0.05 : 0.35); if (y < 1) y = 15; a.array[i * 3 + 1] = y; } a.needsUpdate = true; }
      Object.values(scaff).forEach(g => g.userData.crane.rotation.y = t * 0.4);
      groups.nbp.userData.coin.rotation.z = t * 0.8;
      groups.rzad.userData.flag.rotation.y = Math.sin(t * 3) * 0.15;
      R.render(scene, cam);
    }
    raf = requestAnimationFrame(frame);
    let w = 0, h = 0;
    function resize(){
      const r = canvas.parentElement.getBoundingClientRect(); w = r.width; h = r.height; R.setSize(w, h, false);
      const aspect = w / h, s = aspect < 1 ? 12.5 / aspect : aspect > 1.7 ? 11.2 : 12.6 / Math.sqrt(aspect / 1.25);
      cam.left = -s * aspect; cam.right = s * aspect; cam.top = s; cam.bottom = -s; cam.updateProjectionMatrix();
    }
    const screenPos = id => { const a = anchor[id] || [0, 0, 0], p = new THREE.Vector3(...a).project(cam); return { x: (p.x + 1) / 2 * w, y: (1 - p.y) / 2 * h }; };
    return { resize, apply, pick, highlight, screenPos, ids: () => Object.keys(groups), dispose(){ alive = false; cancelAnimationFrame(raf); R.dispose(); } };
  }

  // ================================================================ DŹWIĘK (generowany, domyślnie wyłączony)
  function makeSound(){
    let ctx = null, nodes = null;
    return {
      on(){ if (ctx) return; const A = window.AudioContext || window.webkitAudioContext; if (!A) return; ctx = new A();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 500;
        const gain = ctx.createGain(); gain.gain.value = 0.05;
        const hum = ctx.createOscillator(); hum.frequency.value = 55; const hg = ctx.createGain(); hg.gain.value = 0.012;
        src.connect(lp).connect(gain).connect(ctx.destination); hum.connect(hg).connect(ctx.destination); src.start(); hum.start(); nodes = { lp, gain, hg }; },
      off(){ if (ctx){ ctx.close(); ctx = null; nodes = null; } },
      set(v){ if (!nodes) return; nodes.lp.frequency.value = 300 + 900 * clamp(v.rain - 0.8, 0, 0.6) + 200 * v.act; nodes.gain.gain.value = 0.03 + 0.04 * clamp(v.rain - 0.9, 0, 0.5); nodes.hg.gain.value = 0.006 + 0.012 * clamp(v.act, 0, 1.3) + (v.alarm ? 0.02 : 0); },
      ping(){ if (!ctx) return; const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(0.06, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4); o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.4); },
      get enabled(){ return !!ctx; },
    };
  }

  // ================================================================ UI
  function mount(_el, ctx){
    const S = window.NovariaSim;
    const { lang, esc, track } = ctx;
    const X = T(lang), L = X.L, CON = concepts(lang), PN = PROJ_NAMES(lang);
    const LS = "makro2.game1", LS_TUT = "makro2.game1.tut", LS_SAVE = "makro2.novaria";
    let s = null, world = null, timer = null, speed = 1, tab = null, sel = null, why = null, previewT = 0;
    const sound = makeSound(), prevVals = {};
    try { const sv = JSON.parse(localStorage.getItem(LS_SAVE) || "null"); if (sv && sv.v === 1 && sv.s && !sv.s.over) s = sv.s; } catch {}
    if (!s) s = S.newGame();

    document.querySelector(".gfull")?.remove();
    const host = document.createElement("div"); host.className = "gfull nv"; document.body.appendChild(host); document.body.classList.add("gaming");
    host.innerHTML = `
      <div class="nv-stage" id="nvst"><canvas id="nvcv" aria-label="Novaria"></canvas><div class="nv-labels" id="nvlab"></div><div class="nv-load" id="nvload">${L("Budowanie Novarii…", "Строим Новарию…")}</div></div>
      <div class="nv-tl">
        <a class="nv-b" href="#start" aria-label="${L("Wyjdź", "Выйти")}">✕</a>
        <div class="nv-date"><b>NOVARIA</b><span id="nvdate"></span><i class="nv-dbar"><b id="nvdbar"></b></i></div>
        <div class="nv-speed" role="group" aria-label="${L("Tempo", "Темп")}">
          <button class="nv-b" data-sp="0" aria-label="${L("Pauza", "Пауза")}">⏸</button><button class="nv-b" data-sp="1" aria-label="×1">▶</button><button class="nv-b" data-sp="4" aria-label="×4">⏩</button><button class="nv-b" data-sp="16" aria-label="×16">⏭</button>
        </div>
        <button class="nv-b" id="nvsnd" aria-label="${L("Dźwięk", "Звук")}">🔇</button>
      </div>
      <div class="nv-kpis" id="nvkpi"></div>
      <div class="nv-feed" id="nvfeed"></div>
      <nav class="nv-tabs" id="nvtabs">${Object.entries(X.tabs).map(([k, v]) => `<button data-tab="${k}">${v}</button>`).join("")}</nav>
      <aside class="nv-panel" id="nvpanel" hidden></aside>
      <div class="nv-card" id="nvcard" hidden></div>
      <div class="nv-toasts" id="nvtoasts"></div>
      <div id="nvmodal"></div>`;
    const $ = q => host.querySelector(q);
    const H = () => s.hist[s.hist.length - 1] || S.snapshot(s);
    const ago = n => s.hist[Math.max(0, s.hist.length - 1 - n)] || H();
    const D = () => S.date(s.day);
    const save = () => { try { localStorage.setItem(LS_SAVE, JSON.stringify({ v: 1, s: { ...s, _rng: null } })); } catch {} };

    // ---------- KPI: stan dziś + trend 30 dni
    const kpiDef = () => {
      const h = H(), a = ago(30), sh = 100 * h.short / Math.max(1, h.demand);
      return [
        { k: "gdp", v: X.n0(h.Y) + L(" mln", " млн"), d: (h.Y / a.Y - 1) * 100, good: 1, sub: L("na miesiąc", "в месяц") },
        { k: "infl", v: X.pct(h.infl), d: h.infl - a.infl, good: -1, sub: L("rok do roku", "год к году"), bad: h.infl > 6 || h.infl < -1 },
        { k: "jobs", v: X.pct(100 - h.unemp), d: a.unemp - h.unemp, good: 1, sub: L("bezrobocie ", "безработица ") + X.pct(h.unemp), bad: h.unemp > 9 },
        { k: "budget", v: X.sgn(h.budget) + L(" mln", " млн"), d: h.budget - a.budget, good: 1, sub: L("dług ", "долг ") + Math.round(h.debtRatio * 100) + L("% PKB", "% ВВП"), bad: h.debtRatio > 0.9 },
        { k: "bread", v: X.zl(h.bread), d: (h.bread / a.bread - 1) * 100, good: -1, sub: sh > 1 ? L("brakuje ", "не хватает ") + X.pct(sh) : L("półki pełne", "полки полны"), bad: sh > 2 },
        { k: "approval", v: Math.round(h.approval) + "%", d: h.approval - a.approval, good: 1, sub: L("społeczeństwo", "общество"), bad: h.approval < 30 },
      ];
    };
    function hud(){
      const d = D();
      $("#nvdate").textContent = `${X.year} ${d.year + 1}/8 · ${X.months[d.month]} · ${X.day} ${d.day + 1}`;
      $("#nvdbar").style.width = (100 * s.day / S.TOTAL) + "%";
      host.querySelectorAll("[data-sp]").forEach(b => b.classList.toggle("on", +b.dataset.sp === (timer ? speed : 0)));
      $("#nvkpi").innerHTML = kpiDef().map(k => { const tr = Math.abs(k.d) < 0.05 ? "→" : k.d > 0 ? "↑" : "↓", good = tr === "→" ? "n" : (k.d > 0) === (k.good > 0) ? "g" : "b";
        return `<button class="nv-kpi ${k.bad ? "bad" : ""}" data-why="${k.k}"><span>${X.kpi[k.k]}</span><b>${k.v} <i class="${good}">${tr}</i></b><small>${k.sub}</small></button>`; }).join("");
    }

    // ---------- wydarzenia, ryzyka i wiadomości (na mapie)
    function feed(){
      const evs = s.events.map(e => { const ph = S.phaseOf(e), E = X.ev[e.k]; return `<button class="nv-ev ${ph}" data-evk="${e.k}">${E.icon} <b>${E.name}</b> <span>${X.phase[ph]}</span></button>`; }).join("");
      const risk = Object.entries(s.risks || {}).filter(([k, p]) => p >= 0.25 && !s.events.some(e => e.k === k)).sort((a, b) => b[1] - a[1]).slice(0, 2)
        .map(([k, p]) => `<button class="nv-ev risk" data-tab-go="economy">${X.ev[k].icon} ${L("Ryzyko", "Риск")}: ${X.ev[k].name} <b>${Math.round(p * 100)}%</b></button>`).join("");
      const news = s.news.slice(-3).reverse().map(n => { const [ic, title] = newsText(n, lang); return `<button class="nv-news" data-tab-go="news"><i>${ic}</i>${esc(title)}</button>`; }).join("");
      $("#nvfeed").innerHTML = `${evs || risk ? `<div class="nv-evs">${evs}${risk}</div>` : ""}<div class="nv-daily"><b>Novaria Daily</b>${news || `<span class="nv-muted">${L("Spokojny dzień w Novarii.", "Спокойный день в Новарии.")}</span>`}</div>`;
    }

    // ---------- etykiety budynków (z ikoną problemu)
    const NAMES = { farma: L("Farmy", "Фермы"), silosy: L("Silosy", "Силосы"), piekarnia: L("Piekarnia", "Пекарня"), piekarnia2: L("Piekarnia 2", "Пекарня 2"), piekarnia3: L("Piekarnia 3", "Пекарня 3"), sklep: L("Sklepy", "Магазины"), rzad: L("Rząd", "Правительство"), nbp: "NBP", bank: L("Bank", "Банк"), fabryka: L("Fabryka", "Фабрика"), port: L("Port", "Порт"), nawadnianie: L("Nawadnianie", "Орошение"), elektrownia: L("Elektrownia", "Электростанция"), kolej: L("Dworzec", "Вокзал"), port2: L("Nabrzeże", "Причал") };
    function alertOf(id){
      const sh = s.b.short / Math.max(1, s.b.demand);
      if (id === "sklep" && sh > 0.02) return "🧺";
      if (id.startsWith("piekarnia") && s.b.prod < s.b.demand * 0.97 && s.b.grainLimit < s.b.cap) return "⚠️";
      if (id === "farma" && s.w.rain < 0.82 && D().month >= 2 && D().month <= 8) return "🌵";
      if (id === "silosy" && s.g.stock < s.b.prod * 1.2) return "⚠️";
      if (id === "fabryka" && s.events.some(e => e.k === "recession" || e.k === "energy")) return "📉";
      if (id === "bank" && s.events.some(e => e.k === "credit")) return "🏦";
      if (id === "port" && s.events.some(e => e.k === "trade")) return "🚫";
      return "";
    }
    function labels(){
      if (!world) return;
      const small = matchMedia("(max-width:700px)").matches;
      $("#nvlab").innerHTML = world.ids().filter(id => NAMES[id] && (!small || ["farma", "silosy", "piekarnia", "sklep", "rzad", "nbp", "port"].includes(id) || alertOf(id))).map(id => { const p = world.screenPos(id), al = alertOf(id);
        return `<button class="nv-lab ${sel === id ? "on" : ""} ${al ? "alert" : ""}" data-obj="${id}" style="left:${p.x}px;top:${p.y}px"><span>${al ? al + " " : ""}${NAMES[id]}</span></button>`; }).join("");
    }

    // ---------- krótkie karty obiektów
    function objCard(id){
      const h = H(), b = s.b, g = s.g, m = s.m;
      const row = (k, v, cls = "") => `<div class="nv-row ${cls}"><span>${k}</span><b>${v}</b></div>`;
      const cards = {
        farma: [L("Farmy", "Фермы"), [row(L("Pracownicy", "Работники"), X.n0(1900 * (0.8 + 0.2 * h.crop))), row(L("Prognoza zbiorów", "Прогноз урожая"), X.n0(h.harvestF) + " t"), row(L("Stan upraw", "Состояние посевов"), Math.round(h.crop * 100) + "%", h.crop < 0.85 ? "bad" : ""), row(L("Opady", "Осадки"), Math.round(h.rain * 100) + L("% normy", "% нормы"), h.rain < 0.85 ? "bad" : ""), row(L("Nawadnianie", "Орошение"), Math.round(s.infra.irrigation * 100) + "%"), row(L("Ryzyko suszy", "Риск засухи"), Math.round((s.risks.drought || 0) * 100) + "%", (s.risks.drought || 0) > 0.3 ? "bad" : "")], "grain"],
        silosy: [L("Silosy zbożowe", "Зерновые силосы"), [row(L("Zapas rynkowy", "Рыночный запас"), X.n0(g.stock) + " t"), row(L("Wystarczy na", "Хватит на"), Math.round(g.stock / Math.max(1, b.prod) * 30) + L(" dni", " дн.")), row(L("Rezerwa państwa", "Госрезерв"), X.n0(g.reserve) + " t"), row(L("Cena zboża", "Цена зерна"), X.n0(g.price) + " zł/t"), row(L("Import / eksport", "Импорт / экспорт"), `${X.n0(g.imp)} / ${X.n0(g.exp)} ${L("t/mies.", "т/мес.")}`)], "grain"],
        piekarnia: [L("Piekarnie", "Пекарни"), [row(L("Moc", "Мощность"), X.n0(b.cap) + L(" tys./mies.", " тыс./мес.")), row(L("Produkcja", "Выпуск"), X.n0(b.prod) + L(" tys.", " тыс.")), row(L("Wykorzystanie mocy", "Загрузка"), Math.round(100 * b.prod / b.cap) + "%"), row(L("Pracownicy", "Работники"), X.n0(150 * b.bakeries * (0.6 + 0.4 * b.prod / b.cap))), `<div class="nv-con">${L("Główne ograniczenie", "Главное ограничение")}: <b>${b.grainLimit < b.cap && b.prod < b.demand ? "🌾 " + L("brak zboża", "нехватка зерна") : b.prod >= b.cap * 0.99 ? "🏭 " + L("moc pieców", "мощность печей") : "🛒 " + L("popyt", "спрос")}</b></div>`], "bread"],
        sklep: [L("Sklepy", "Магазины"), [row(L("Cena chleba", "Цена хлеба"), X.zl(Math.min(b.price, s.p.cap || 99))), row(L("Popyt", "Спрос"), X.n0(b.demand) + L(" tys.", " тыс.")), row(L("Podaż", "Предложение"), X.n0(b.prod) + L(" tys.", " тыс.")), row(L("Sprzedaż", "Продажи"), X.n0(b.sales) + L(" tys.", " тыс.")), row(L("Niedobór", "Дефицит"), X.n0(b.short) + L(" tys.", " тыс."), b.short > 1 ? "bad" : "")], "bread"],
        rzad: [L("Rząd", "Правительство"), [row(L("Saldo (tempo/mies.)", "Сальдо (темп/мес.)"), X.sgn(h.budget) + L(" mln", " млн")), row(L("Dług", "Долг"), X.n0(m.debt) + L(" mln", " млн")), row(L("Dług / PKB", "Долг / ВВП"), Math.round(h.debtRatio * 100) + "%"), row(L("Odsetki", "Проценты"), X.n1(m.spendItems.interest * 30) + L(" mln/mies.", " млн/мес."))], "budget"],
        nbp: [L("Narodowy Bank Polski", "Национальный банк"), [row(L("Stopa", "Ставка"), X.n1(s.p.rate) + "%"), row(L("Działa już (opóźnienie)", "Уже действует (задержка)"), X.n1(m.rateEff) + "%"), row(L("Stopa realna", "Реальная ставка"), X.n1(m.realRate) + "%"), row(L("Inflacja", "Инфляция"), X.pct(m.infl))], "infl"],
        bank: [L("Banki", "Банки"), [row(L("Dostępność kredytu", "Доступность кредита"), Math.round(s.w.credit * 100) + "%", s.w.credit < 0.9 ? "bad" : ""), row(L("Inwestycje firm", "Инвестиции фирм"), X.n0(m.I) + L(" mln", " млн")), row(L("Ryzyko kryzysu", "Риск кризиса"), Math.round((s.risks.credit || 0) * 100) + "%")], "gdp"],
        fabryka: [L("Przemysł i usługi", "Промышленность и услуги"), [row(L("Produkcja (PKB)", "Производство (ВВП)"), X.n0(m.Y) + L(" mln", " млн")), row(L("Wykorzystanie mocy", "Загрузка мощностей"), Math.round(100 * m.Y / m.Ypot) + "%"), row(L("Eksport", "Экспорт"), X.n0(m.X) + L(" mln", " млн")), row(L("Koszt energii", "Стоимость энергии"), Math.round(s.w.energy * 100) + "%", s.w.energy > 1.2 ? "bad" : "")], "gdp"],
        port: [L("Port", "Порт"), [row(L("Przepustowość", "Пропускная способность"), Math.round(s.w.portCap * 100) + "%", s.w.portCap < 0.8 ? "bad" : ""), row(L("Cena zboża na świecie", "Мировая цена зерна"), X.n0(s.w.worldGrain) + " zł/t"), row(L("Cło", "Пошлина"), s.p.tariff + "%"), row(L("Eksport netto", "Чистый экспорт"), X.sgn(m.NX) + L(" mln", " млн"))], "grain"],
      };
      const key = id.startsWith("piekarnia") ? "piekarnia" : ({ port2: "port", nawadnianie: "farma", elektrownia: "fabryka", kolej: "fabryka" })[id] || id;
      const c = cards[key]; if (!c) return "";
      return `<div class="nv-ch"><b>${c[0]}</b><button class="nv-x" data-close aria-label="${L("Zamknij", "Закрыть")}">✕</button></div>${c[1].join("")}<button class="nv-why" data-why="${c[2]}">${X.why}</button>`;
    }
    function placeCard(x, y){ const el = $("#nvcard"), r = $("#nvst").getBoundingClientRect(), Wc = el.offsetWidth, Hc = el.offsetHeight; el.style.left = clamp(x - Wc / 2, 8, r.width - Wc - 8) + "px"; el.style.top = clamp(y - Hc - 24, 70, Math.max(70, r.height - Hc - 70)) + "px"; }
    function showCard(id, x, y){ sel = id; world?.highlight(id); const el = $("#nvcard"); el.hidden = false; el.innerHTML = objCard(id); placeCard(x, y); labels(); track?.("game", "obj", id); }
    function hideCard(){ sel = null; $("#nvcard").hidden = true; world?.highlight(null); labels(); }

    // ---------- „Dlaczego?” — graf przyczynowy (węzły klikalne), bez ściany tekstu
    const ABS = ["infl", "unemp", "rate", "budget", "NX"];
    const NODE = {
      rain: h => ["🌧️", L("Opady", "Осадки"), Math.round(h.rain * 100) + "%", "rain", 1],
      crop: h => ["🌱", L("Stan upraw", "Посевы"), Math.round(h.crop * 100) + "%", "crop", 1],
      harvest: h => ["🌾", L("Prognoza zbiorów", "Прогноз урожая"), X.n0(h.harvestF) + " t", "harvestF", 1],
      stock: h => ["🏚️", L("Zapas zboża", "Запас зерна"), X.n0(h.stock) + " t", "stock", 1],
      imp: h => ["🚢", L("Import zboża", "Импорт зерна"), X.n0(h.imp) + L(" t/mies.", " т/мес."), "imp", 1],
      grain: h => ["💰", L("Cena zboża", "Цена зерна"), X.n0(h.grain) + " zł/t", "grain", -1, "grain"],
      prod: h => ["🏭", L("Produkcja chleba", "Выпуск хлеба"), X.n0(h.prod) + L(" tys.", " тыс."), "prod", 1],
      short: h => ["⚠️", L("Niedobór", "Дефицит"), X.n0(h.short) + L(" tys.", " тыс."), "short", -1],
      bread: h => ["🍞", L("Cena chleba", "Цена хлеба"), X.zl(h.bread), "bread", -1, "bread"],
      energy: h => ["⚡", L("Ceny energii", "Цены энергии"), Math.round(h.energy * 100) + "%", "energy", -1],
      realInc: h => ["👛", L("Dochód realny", "Реальный доход"), Math.round(h.realInc * 100) + "%", "realInc", 1],
      conf: h => ["🙂", L("Nastroje", "Настроения"), Math.round(h.conf * 100) + "%", "conf", 1],
      rate: h => ["🏦", L("Stopa NBP", "Ставка NBP"), X.n1(h.rate) + "%", "rate", -1, "infl"],
      C: h => ["🛍️", L("Konsumpcja", "Потребление"), X.n0(h.C) + L(" mln", " млн"), "C", 1],
      I: h => ["🏗️", L("Inwestycje", "Инвестиции"), X.n0(h.I) + L(" mln", " млн"), "I", 1],
      G: h => ["🏛️", L("Wydatki państwa", "Госрасходы"), X.n0(h.G) + L(" mln", " млн"), "G", 1, "budget"],
      NX: h => ["🌍", L("Eksport netto", "Чистый экспорт"), X.sgn(h.NX) + L(" mln", " млн"), "NX", 1],
      gdp: h => ["📈", L("PKB", "ВВП"), X.n0(h.Y) + L(" mln", " млн"), "Y", 1, "gdp"],
      unemp: h => ["👷", L("Bezrobocie", "Безработица"), X.pct(h.unemp), "unemp", -1, "jobs"],
      infl: h => ["📊", L("Inflacja", "Инфляция"), X.pct(h.infl), "infl", -1, "infl"],
      budget: h => ["🧾", L("Saldo budżetu", "Сальдо бюджета"), X.sgn(h.budget) + L(" mln", " млн"), "budget", 1, "budget"],
      debt: h => ["💸", L("Dług / PKB", "Долг / ВВП"), Math.round(h.debtRatio * 100) + "%", "debtRatio", -1],
      approval: h => ["🗳️", L("Poparcie", "Поддержка"), Math.round(h.approval) + "%", "approval", 1, "approval"],
    };
    function whyModel(k){
      const h = H(), a = ago(30);
      const nodes = keys => keys.map(key => { const [ic, lab, val, f, goodDir, link] = NODE[key](h); const abs = ABS.includes(key); const dv = abs ? h[f] - a[f] : a[f] ? (h[f] / a[f] - 1) * 100 : 0; return { ic, lab, val, dv, abs, good: Math.abs(dv) < 0.3 ? 0 : (dv > 0) === (goodDir > 0) ? 1 : -1, link }; });
      let chain, cause, side = [];
      if (k === "bread" || k === "grain"){
        const drivers = [["grain", h.costGrain - a.costGrain], ["energy", h.costEnergy - a.costEnergy], ["labor", h.costLabor - a.costLabor], ["scarcity", (h.scarcity - a.scarcity) * 3.6]].sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]));
        const top = drivers[0][0], weak = h.harvestF < S.HARVEST0 * 0.92;
        chain = top === "energy" ? ["energy", "bread"] : top === "scarcity" ? (weak ? ["rain", "harvest", "stock", "prod", "short", "bread"] : ["stock", "prod", "short", "bread"]) : weak ? ["rain", "crop", "harvest", "grain", "bread"] : ["stock", "imp", "grain", "bread"];
        if (k === "grain") chain = ["rain", "harvest", "stock", "imp", "grain"];
        cause = { grain: L("cena zboża", "цена зерна"), energy: L("koszty energii", "стоимость энергии"), labor: L("rosnące płace i ceny", "растущие зарплаты и цены"), scarcity: L("brak chleba na rynku (popyt > podaż)", "нехватка хлеба (спрос > предложения)") }[top];
        if (Math.abs(drivers[0][1]) < 0.02) cause = L("cena stabilna — rynek blisko równowagi", "цена стабильна — рынок близок к равновесию");
        if (k === "grain") cause = h.harvestF < S.HARVEST0 * 0.92 ? L("słabsza prognoza zbiorów", "слабый прогноз урожая") : h.stock < h.prod * 1.5 ? L("kończą się zapasy przed żniwami", "запасы заканчиваются до жатвы") : L("podaż i zapasy w normie", "предложение и запасы в норме");
        if (s.b.capped) cause = L("cena maksymalna — tani chleb, ale go brakuje", "потолок цены — дешёвый хлеб, но его не хватает");
        side = [[L("🌾 Zboże", "🌾 Зерно"), h.costGrain], [L("👷 Praca", "👷 Труд"), h.costLabor], [L("⚡ Energia", "⚡ Энергия"), h.costEnergy], [L("🏪 Marża i niedobór", "🏪 Маржа и дефицит"), h.bread - h.costGrain - h.costLabor - h.costEnergy]];
      } else if (k === "infl"){
        const y1 = s.hist[Math.max(0, s.hist.length - 361)]?.bread || h.bread;
        const food = 0.15 * ((h.bread / y1 - 1) * 100), en = (h.energy - 1) * 12, dem = 0.45 * s.m.ygap;
        const top = [["food", food], ["energy", en], ["demand", dem]].sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]))[0][0];
        chain = top === "energy" ? ["energy", "bread", "infl", "realInc"] : top === "food" ? ["harvest", "grain", "bread", "infl", "realInc"] : ["rate", "conf", "C", "gdp", "infl"];
        cause = { food: L("drożejąca żywność (szok podażowy)", "дорожающая еда (шок предложения)"), energy: L("droga energia (inflacja kosztowa)", "дорогая энергия (инфляция издержек)"), demand: s.m.ygap > 0 ? L("popyt przewyższa możliwości gospodarki (inflacja popytowa)", "спрос превышает возможности экономики (инфляция спроса)") : L("słaby popyt hamuje ceny", "слабый спрос сдерживает цены") }[top];
        side = [[L("🍞 Żywność", "🍞 Еда"), food], [L("⚡ Energia", "⚡ Энергия"), en], [L("📈 Popyt", "📈 Спрос"), dem], [L("🔮 Oczekiwania", "🔮 Ожидания"), s.m.inflE]];
      } else if (k === "gdp" || k === "jobs"){
        const top = ["C", "I", "G", "NX"].map(c => [c, h[c] - a[c]]).sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]))[0][0];
        chain = { C: ["conf", "realInc", "C"], I: ["rate", "I"], G: ["G"], NX: ["energy", "NX"] }[top].concat(k === "jobs" ? ["gdp", "unemp"] : ["gdp"]);
        cause = { C: L("konsumpcja gospodarstw domowych", "потребление домохозяйств"), I: L("inwestycje firm (kredyt i stopy)", "инвестиции фирм (кредит и ставки)"), G: L("wydatki państwa", "госрасходы"), NX: L("handel zagraniczny", "внешняя торговля") }[top];
        side = [["🛍️ C", h.C], ["🏗️ I", h.I], ["🏛️ G", h.G], ["🌍 NX", h.NX]];
      } else if (k === "budget"){
        chain = ["gdp", "unemp", "budget", "debt"];
        const R = s.m.rev, Sp = s.m.spendItems;
        side = [[L("💼 Podatek dochodowy", "💼 Подоходный налог"), R.tax * 30], ["🧾 VAT", R.vat * 30], [L("⚓ Cła", "⚓ Пошлины"), R.tariff * 30], [L("🏥 Usługi publiczne", "🏥 Госуслуги"), -Sp.services * 30], [L("🤝 Transfery i zasiłki", "🤝 Трансферы и пособия"), -Sp.transfers * 30], [L("🚜 Dopłaty rolne", "🚜 Агродотации"), -Sp.farm * 30], [L("🏗️ Inwestycje", "🏗️ Инвестиции"), -Sp.projects * 30], [L("💸 Odsetki", "💸 Проценты"), -Sp.interest * 30]].filter(x => Math.abs(x[1]) > 0.01);
        const big = side.filter(x => x[1] < 0).sort((x, y) => x[1] - y[1])[0];
        cause = h.budget < 0 ? L(`wydatki większe niż wpływy (największa pozycja: ${big[0]})`, `расходы больше доходов (крупнейшая статья: ${big[0]})`) : L("wpływy pokrywają wydatki", "доходы покрывают расходы");
      } else {
        chain = ["realInc", "unemp", "infl", "short", "approval"];
        side = [[L("👛 Dochody realne", "👛 Реальные доходы"), 40 * (h.realInc - 1)], [L("👷 Bezrobocie", "👷 Безработица"), -2.6 * (h.unemp - 5)], [L("📊 Inflacja", "📊 Инфляция"), -1.8 * Math.max(0, h.infl - 3)], [L("🧺 Kolejki", "🧺 Очереди"), -1.2 * 100 * h.short / Math.max(1, h.demand)], [L("💼 Podatki", "💼 Налоги"), -0.6 * (s.p.tax - 22)], [L("🏥 Usługi i transfery", "🏥 Услуги и трансферы"), 4 * (s.p.spend - 17.5) + 0.1 * (s.p.transfers - 25)]];
        cause = side.slice().sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]))[0][0];
      }
      return { chain: nodes(chain), cause, side };
    }
    function whyHtml(k){
      const W = whyModel(k), title = { bread: L("Cena chleba", "Цена хлеба"), grain: L("Cena zboża", "Цена зерна"), infl: X.kpi.infl, gdp: X.kpi.gdp, jobs: X.kpi.jobs, budget: X.kpi.budget, approval: X.kpi.approval }[k];
      const last = W.chain[W.chain.length - 1];
      const nodes = W.chain.map((n, i) => `<button class="nv-node ${n.good > 0 ? "g" : n.good < 0 ? "b" : ""}" ${n.link && n.link !== k ? `data-why="${n.link}"` : ""}><i>${n.ic}</i><span>${n.lab}</span><b>${n.val}</b><em>${Math.abs(n.dv) < 0.05 ? "→" : (n.dv > 0 ? "↑ +" : "↓ −") + X.n1(Math.abs(n.dv)) + (n.abs ? L(" pp", " пп") : "%")}</em></button>${i < W.chain.length - 1 ? '<div class="nv-arr">↓</div>' : ""}`).join("");
      const maxS = Math.max(...W.side.map(x => Math.abs(x[1])), 0.001);
      const fmtS = v => k === "bread" || k === "grain" ? X.zl(v) : k === "gdp" || k === "jobs" ? X.n0(v) : X.sgn(v);
      const sideH = W.side.map(([n, v]) => `<div class="nv-sbar"><span>${n}</span><i class="${k === "budget" || k === "approval" ? (v >= 0 ? "g" : "b") : ""}" style="width:${Math.abs(v) / maxS * 100}%"></i><b>${fmtS(v)}</b></div>`).join("");
      const sideT = { bread: L("Z czego składa się cena bochenka", "Из чего состоит цена буханки"), grain: L("Koszty bochenka", "Издержки буханки"), infl: L("Skąd inflacja (pkt proc.)", "Откуда инфляция (п.п.)"), gdp: L("PKB = C + I + G + NX (mln/mies.)", "ВВП = C + I + G + NX (млн/мес.)"), jobs: L("PKB = C + I + G + NX (mln/mies.)", "ВВП = C + I + G + NX (млн/мес.)"), budget: L("Wpływy i wydatki (mln/mies.)", "Доходы и расходы (млн/мес.)"), approval: L("Co wpływa na poparcie (pkt)", "Что влияет на поддержку (п.)") }[k];
      return `<div class="nv-whyh"><small>${X.why}</small><h2>${title}: ${last.val}</h2><p class="nv-muted">${L("Zmiany w ostatnich 30 dniach. Dotknij węzła, aby zajrzeć głębiej.", "Изменения за 30 дней. Нажми на узел, чтобы копнуть глубже.")}</p></div>
        <div class="nv-graph">${nodes}</div>
        <p class="nv-cause"><b>${X.mainCause}:</b> ${W.cause}</p>
        <details class="nv-more"><summary>${sideT}</summary>${sideH}</details>`;
    }
    function openWhy(k){ why = k; modal(whyHtml(k), "why"); track?.("game", "why", k); }

    // ---------- zakładki
    const spark = (vals, color = "#2347c5", hh = 70) => { if (vals.length < 2) return `<p class="nv-muted">${L("Dane zbiorą się z czasem.", "Данные накопятся со временем.")}</p>`; const mn = Math.min(...vals), mx = Math.max(...vals), W = 300; const pts = vals.map((v, i) => `${(i / (vals.length - 1) * W).toFixed(1)},${(hh - 8 - (v - mn) / ((mx - mn) || 1) * (hh - 16)).toFixed(1)}`).join(" "); return `<div class="nv-spk"><svg class="nv-spark" viewBox="0 0 ${W} ${hh}" preserveAspectRatio="none"><polyline fill="none" stroke="${color}" stroke-width="2.2" vector-effect="non-scaling-stroke" points="${pts}"/></svg><small>${X.n1(mx)}</small><small>${X.n1(mn)}</small></div>`; };
    let chartKey = "Y", fc = null, fcAt = -1;
    function forecast(){ const k = Math.floor(s.day / 30); if (fcAt !== k || !fc){ fcAt = k; const p = S.project(s, 360); fc = { m3: p[2], m6: p[5], m12: p[11] }; } return fc; }
    function panelHtml(){
      const h = H(), m = s.m, b = s.b, g = s.g;
      if (tab === "economy"){
        const f = forecast(), arrow = (now, fut, goodUp, abs) => { if (fut == null) return ""; const d = abs ? fut - now : (fut / now - 1) * 100; const ic = Math.abs(d) < (abs ? 0.2 : 0.5) ? "→" : d > 0 ? "↗" : "↘"; const cls = ic === "→" ? "n" : (d > 0) === goodUp ? "g" : "b"; return `<i class="${cls}">${ic}</i>`; };
        const rows = [[L("PKB", "ВВП"), "Y", true], [L("Inflacja", "Инфляция"), "infl", false, 1], [L("Bezrobocie", "Безработица"), "unemp", false, 1], [L("Cena chleba", "Цена хлеба"), "bread", false], [L("Eksport netto", "Чистый экспорт"), "NX", true, 1]];
        const keys = [["Y", L("PKB", "ВВП")], ["infl", L("Inflacja", "Инфляция")], ["unemp", L("Bezrobocie", "Безработица")], ["bread", L("Chleb", "Хлеб")], ["grain", L("Zboże", "Зерно")], ["debtRatio", L("Dług/PKB", "Долг/ВВП")], ["realInc", L("Dochód realny", "Реальный доход")], ["rate", L("Stopa", "Ставка")], ["approval", L("Poparcie", "Поддержка")]];
        const series = s.hist.filter((_, i) => i % 3 === 0).slice(-240).map(x => x[chartKey]);
        return `<h2>${X.tabs.economy}</h2>
          <div class="nv-box"><b>${L("Prognoza (bez nowych wstrząsów)", "Прогноз (без новых шоков)")}</b>
          <table class="nv-tbl"><tr><th></th><th>${L("teraz", "сейчас")}</th><th>3 ${L("mies.", "мес.")}</th><th>6</th><th>12</th></tr>${rows.map(([n, f2, up, abs]) => `<tr><td>${n}</td><td>${f2 === "bread" ? X.zl(h[f2]) : abs ? X.n1(h[f2]) : X.n0(h[f2])}</td>${["m3", "m6", "m12"].map(p => `<td>${arrow(h[f2], f[p]?.[f2], up, abs)}</td>`).join("")}</tr>`).join("")}</table></div>
          <div class="nv-box"><b>${L("Ryzyka na 3 miesiące", "Риски на 3 месяца")}</b>${Object.entries(s.risks).sort((a, b2) => b2[1] - a[1]).map(([k, p]) => `<div class="nv-sbar"><span>${X.ev[k].icon} ${X.ev[k].name}</span><i class="${p > 0.4 ? "b" : ""}" style="width:${p * 100}%"></i><b>${Math.round(p * 100)}%</b></div>`).join("")}<p class="nv-muted">${L("Szacunki są niepewne. Sygnały (opady, nastroje, dług, stopy) zmieniają ryzyko.", "Оценки неточны. Сигналы (осадки, настроения, долг, ставки) меняют риск.")}</p></div>
          <div class="nv-box"><div class="nv-chips">${keys.map(([k2, n]) => `<button class="${k2 === chartKey ? "on" : ""}" data-chart="${k2}">${n}</button>`).join("")}</div>${spark(series)}<p class="nv-muted">${L("Ostatnie 2 lata", "Последние 2 года")}</p></div>
          <div class="nv-box"><b>${L("Kogo dotykają zmiany", "Кого затрагивают изменения")}</b>${m.groups.map(G => `<div class="nv-sbar"><span>${{ low: L("Niskie dochody", "Низкие доходы"), mid: L("Średnie dochody", "Средние доходы"), high: L("Wysokie dochody", "Высокие доходы") }[G.k]}</span><i class="${G.realInc < 0.97 ? "b" : "g"}" style="width:${clamp(G.realInc * 70, 5, 100)}%"></i><b>${Math.round(G.realInc * 100)}%</b></div>`).join("")}<p class="nv-muted">${L("Dochód realny vs. normalny. Żywność to 28% wydatków biednych i 7% bogatych — droższy chleb uderza nierówno.", "Реальный доход vs. обычного. Еда — 28% расходов бедных и 7% богатых — дорогой хлеб бьёт неравномерно.")}</p></div>`;
      }
      if (tab === "budget"){
        const R = m.rev, Sp = m.spendItems, rv = [["💼 " + L("Podatek dochodowy", "Подоходный налог"), R.tax], ["🧾 VAT", R.vat], ["⚓ " + L("Cła", "Пошлины"), R.tariff], ["🌾 " + L("Sprzedaż z rezerwy", "Продажи из резерва"), R.reserve]], sp = [["🏥 " + L("Usługi publiczne", "Госуслуги"), Sp.services], ["🤝 " + L("Transfery i zasiłki", "Трансферы и пособия"), Sp.transfers], ["🚜 " + L("Dopłaty rolne", "Агродотации"), Sp.farm], ["🏗️ " + L("Inwestycje", "Инвестиции"), Sp.projects], ["💸 " + L("Odsetki", "Проценты"), Sp.interest], ["🌾 " + L("Zakupy do rezerwy", "Закупки в резерв"), Sp.reserve]];
        const mx = Math.max(...rv.map(x => x[1]), ...sp.map(x => x[1])) * 30;
        const bars = (arr, cls) => arr.filter(x => x[1] > 0.0005).map(([n, v]) => `<div class="nv-sbar"><span>${n}</span><i class="${cls}" style="width:${v * 30 / mx * 100}%"></i><b>${X.n1(v * 30)}</b></div>`).join("");
        return `<h2>${X.tabs.budget}</h2>
          <div class="nv-tiles"><div><small>${L("Saldo / mies.", "Сальдо / мес.")}</small><b class="${h.budget < 0 ? "bad" : ""}">${X.sgn(h.budget)}</b></div><div><small>${L("Dług, mln", "Долг, млн")}</small><b>${X.n0(m.debt)}</b></div><div><small>${L("Dług / PKB", "Долг / ВВП")}</small><b class="${h.debtRatio > 0.9 ? "bad" : ""}">${Math.round(h.debtRatio * 100)}%</b></div><div><small>${L("Oprocentowanie długu", "Ставка по долгу")}</small><b>${X.n1(m.govRate)}%</b></div></div>
          <div class="nv-box"><b>${L("Skąd pieniądze (mln/mies.)", "Откуда деньги (млн/мес.)")}</b>${bars(rv, "g")}</div>
          <div class="nv-box"><b>${L("Na co (mln/mies.)", "Куда (млн/мес.)")}</b>${bars(sp, "b")}</div>
          <div class="nv-chain">➖ ${L("deficyt", "дефицит")} → 🧾 ${L("pożyczki", "займы")} → 💸 ${L("dług ↑", "долг ↑")} → 📈 ${L("odsetki ↑", "проценты ↑")}</div>
          <button class="nv-why" data-why="budget">${X.why}</button>`;
      }
      if (tab === "markets"){
        const mx = Math.max(b.demand, b.cap, b.prod) * 1.05, bar = (n, v, cls) => `<div class="nv-sbar"><span>${n}</span><i class="${cls}" style="width:${v / mx * 100}%"></i><b>${X.n0(v)}</b></div>`;
        const cst = b.cost, tot = b.price;
        return `<h2>${X.tabs.markets}</h2>
          <div class="nv-box"><div class="nv-ch"><b>🍞 ${L("Rynek chleba", "Рынок хлеба")} · ${X.zl(Math.min(b.price, s.p.cap || 99))}</b><button class="nv-why" data-why="bread">${X.why}</button></div>
            ${bar(L("Popyt — chcą kupić", "Спрос — хотят купить"), b.demand, "d")}${bar(L("Podaż — upieczone", "Предложение — испечено"), b.prod, "p")}${bar(L("Sprzedaż — kupili", "Продажи — купили"), b.sales, "g")}${bar(L("Moc piekarni", "Мощность пекарен"), b.cap, "c")}
            <p class="nv-muted">${L("tys. bochenków / mies.", "тыс. буханок / мес.")}${b.short > 1 ? ` · <b class="bad">${L("niedobór", "дефицит")} ${X.n0(b.short)}</b>` : ""}</p>
            <div class="nv-stack">${[["g", cst.grain, "🌾"], ["l", cst.labor, "👷"], ["e", cst.energy, "⚡"], ["m", Math.max(0, tot - cst.grain - cst.labor - cst.energy), "🏪"]].map(([c, v, ic]) => `<i class="${c}" style="flex:${v}">${ic} ${X.n1(v)}</i>`).join("")}</div>
            <p class="nv-muted">${L("Bochenek = zboże + praca + energia + marża (rośnie przy niedoborze).", "Буханка = зерно + труд + энергия + маржа (растёт при дефиците).")}</p></div>
          <div class="nv-box"><div class="nv-ch"><b>🌾 ${L("Rynek zboża", "Рынок зерна")} · ${X.n0(g.price)} zł/t</b><button class="nv-why" data-why="grain">${X.why}</button></div>
            <div class="nv-tiles"><div><small>${L("Zapas", "Запас")}</small><b>${X.n0(g.stock)} t</b></div><div><small>${L("Wystarczy na", "Хватит на")}</small><b>${Math.round(g.stock / Math.max(1, b.prod) * 30)} ${L("dni", "дн.")}</b></div><div><small>${L("Prognoza zbiorów", "Прогноз урожая")}</small><b>${X.n0(h.harvestF)} t</b></div><div><small>${L("Rezerwa państwa", "Госрезерв")}</small><b>${X.n0(g.reserve)} t</b></div></div>
            <div class="nv-flow"><span>🌍 ${X.n0(s.w.worldGrain)} zł/t</span><em>${g.imp > g.exp + 1 ? "→ 🚢 " + L("import", "импорт") + " " + X.n0(g.imp) + " t →" : g.exp > 1 ? "← 🚢 " + L("eksport", "экспорт") + " " + X.n0(g.exp) + " t ←" : "⇄"}</em><span>🏠 ${X.n0(g.price)} zł/t</span></div>
            <p class="nv-muted">${L("Import opłaca się, gdy w kraju zboże jest droższe niż na świecie z cłem i transportem; eksport — gdy tańsze.", "Импорт выгоден, когда внутри зерно дороже мирового с пошлиной и транспортом; экспорт — когда дешевле.")}</p></div>`;
      }
      if (tab === "policy") return policyHtml();
      if (tab === "build") return buildHtml();
      if (tab === "learn"){
        const got = Object.keys(s.concepts);
        return `<h2>${X.tabs.learn}</h2><p class="nv-muted">${L(`Odkryte pojęcia: ${got.length}/${Object.keys(CON).length}. Pojęcie odblokowuje się, gdy zobaczysz je we własnej gospodarce.`, `Открыто понятий: ${got.length}/${Object.keys(CON).length}. Понятие открывается, когда ты увидишь его в своей экономике.`)}</p>
          ${Object.entries(CON).map(([k, c]) => got.includes(k) ? `<div class="nv-box"><b>${c.t}</b><div class="nv-chain">${c.chain.join(" → ")}</div><p>${c.d}</p><small class="nv-muted">${L("Odkryte", "Открыто")}: ${X.months[S.date(s.concepts[k]).month]}, ${X.year} ${S.date(s.concepts[k]).year + 1}</small></div>` : `<div class="nv-box locked"><b>🔒 ???</b></div>`).join("")}`;
      }
      if (tab === "news") return `<h2>Novaria Daily</h2>${s.news.slice().reverse().map(n => { const [ic, title, who, quote] = newsText(n, lang), d = S.date(n.day), P = NPC[who]; return `<article class="nv-art"><small>${d.day + 1} ${X.months[d.month]}, ${X.year} ${d.year + 1}</small><b>${ic} ${esc(title)}</b>${quote ? `<p><i>${P.icon}</i> „${esc(quote)}” <small>— ${lang === "ru" ? P.ru : P.pl}</small></p>` : ""}</article>`; }).join("") || `<p class="nv-muted">${L("Na razie cisza.", "Пока тихо.")}</p>`}`;
      return "";
    }
    const POL = () => [
      { k: "reserve", ic: "🌾", min: -300, max: 600, step: 50, f: v => v > 0 ? L(`uwalniaj ${v} t/mies.`, `выпускать ${v} т/мес.`) : v < 0 ? L(`kupuj ${-v} t/mies.`, `покупать ${-v} т/мес.`) : L("bez zmian", "без изменений"), n: L("Rezerwa zboża", "Резерв зерна"), chain: ["🌾 " + L("zboże na rynku", "зерно на рынке"), "🍞 " + L("produkcja", "выпуск"), "💰 " + L("cena chleba", "цена хлеба"), "🛡️ " + L("zapas na kryzys", "запас на кризис")] },
      { k: "cap", ic: "📜", min: 0, max: 8, step: 0.25, f: v => v ? X.zl(v) : L("brak", "нет"), n: L("Cena maksymalna chleba", "Потолок цены хлеба"), chain: ["💰 " + L("cena", "цена"), "🛒 " + L("chętni", "желающие"), "🏭 " + L("podaż bez zmian", "предложение то же"), "🧺 " + L("niedobór", "дефицит")] },
      { k: "farmSub", ic: "🚜", min: 0, max: 20, step: 1, f: v => v + L(" mln/mies.", " млн/мес."), n: L("Dopłaty dla rolników", "Дотации фермерам"), chain: ["🚜 " + L("dochód rolników", "доход фермеров"), "🌾 " + L("przyszłe zbiory", "будущий урожай"), "🧾 " + L("budżet", "бюджет")] },
      { k: "tax", ic: "💼", min: 10, max: 40, step: 1, f: v => v + "%", n: L("Podatek dochodowy", "Подоходный налог"), chain: ["💼 " + L("podatek", "налог"), "👛 " + L("dochód do dyspozycji", "располагаемый доход"), "🛍️ " + L("konsumpcja", "потребление"), "📈 PKB", "🧾 " + L("wpływy", "доходы")] },
      { k: "spend", ic: "🏥", min: 12, max: 26, step: 0.5, f: v => X.n1(v) + L("% PKB", "% ВВП"), n: L("Wydatki publiczne", "Госрасходы"), chain: ["🏛️ G", "📈 AD", "👷 " + L("zatrudnienie", "занятость"), "💸 " + L("dług", "долг")] },
      { k: "transfers", ic: "🤝", min: 0, max: 80, step: 5, f: v => v + L(" mln/mies.", " млн/мес."), n: L("Transfery socjalne", "Социальные трансферы"), chain: ["🤝 " + L("dochody biednych", "доходы бедных"), "🛍️ " + L("konsumpcja", "потребление"), "🧾 " + L("budżet", "бюджет")] },
      { k: "rate", ic: "🏦", min: 0.5, max: 12, step: 0.25, f: v => X.n1(v) + "%", n: L("Stopa referencyjna NBP", "Ставка NBP"), chain: ["🏦 " + L("stopa", "ставка"), "💳 " + L("kredyt", "кредит"), "🏗️ " + L("inwestycje", "инвестиции"), "📈 AD", "📊 " + L("inflacja (po miesiącach)", "инфляция (через месяцы)")] },
      { k: "tariff", ic: "⚓", min: 0, max: 50, step: 5, f: v => v + "%", n: L("Cło na zboże", "Пошлина на зерно"), chain: ["⚓ " + L("cło", "пошлина"), "🚢 " + L("import", "импорт"), "🌾 " + L("cena zboża", "цена зерна"), "🚜 " + L("rolnicy", "фермеры"), "🧾 " + L("wpływy", "доходы")] },
    ];
    function policyHtml(){
      return `<h2>${X.tabs.policy}</h2><p class="nv-muted">${L("Zmieniasz warunki — ludzie i firmy reagują z opóźnieniem. Po przesunięciu suwaka zobaczysz skutki za 3 i 6 miesięcy.", "Ты меняешь условия — люди и фирмы реагируют с задержкой. После движения ползунка увидишь последствия через 3 и 6 месяцев.")}</p>
        ${POL().map(p => { const lock = !S.unlocked(s, p.k); return `<div class="nv-pol ${lock ? "locked" : ""}"><label for="pp-${p.k}"><span>${p.ic} ${p.n}</span><b id="pv-${p.k}">${p.f(s.p[p.k])}</b></label>
          ${lock ? `<small class="nv-muted">🔒 ${L(`Dostępne od miesiąca ${S.UNLOCK[p.k] + 1}`, `Доступно с месяца ${S.UNLOCK[p.k] + 1}`)}</small>` : `<input type="range" id="pp-${p.k}" data-pol="${p.k}" min="${p.min}" max="${p.max}" step="${p.step}" value="${s.p[p.k]}"><div class="nv-pc">${p.chain.join(" <em>→</em> ")}</div><div class="nv-prev" id="pr-${p.k}"></div>`}</div>`; }).join("")}`;
    }
    function previewPolicy(k){
      const pr = $("#pr-" + k); if (!pr) return;
      const prev = prevVals[k] ?? s.p[k];
      if (prev === s.p[k]){ pr.innerHTML = ""; return; }
      const b0 = S.project(s, 180, { [k]: prev }), alt = S.project(s, 180, { [k]: s.p[k] });
      const rows = [["📈 " + L("PKB", "ВВП"), "Y", 1, 0], ["📊 " + L("Inflacja", "Инфляция"), "infl", -1, 1], ["👷 " + L("Bezrobocie", "Безработица"), "unemp", -1, 1], ["🍞 " + L("Chleb", "Хлеб"), "bread", -1, 0], ["🧾 " + L("Saldo, mln", "Сальдо, млн"), "budget", 1, 2]];
      const cell = (a, b2, good, abs) => { if (a == null || b2 == null) return "<td></td>"; const d = abs ? b2 - a : (b2 / a - 1) * 100; const cls = Math.abs(d) < 0.05 ? "" : (d > 0) === (good > 0) ? "g" : "b"; return `<td class="${cls}">${Math.abs(d) < 0.05 ? "≈" : (d > 0 ? "+" : "−") + X.n1(Math.abs(d)) + (abs === 1 ? L(" pp", " пп") : abs === 2 ? "" : "%")}</td>`; };
      pr.innerHTML = `<table class="nv-tbl"><tr><th>${L("różnica vs. bez zmiany", "разница vs. без изменения")}</th><th>3 ${L("mies.", "мес.")}</th><th>6 ${L("mies.", "мес.")}</th></tr>${rows.map(([n, f, good, abs]) => `<tr><td>${n}</td>${[2, 5].map(c => cell(b0[c]?.[f], alt[c]?.[f], good, abs)).join("")}</tr>`).join("")}</table>`;
    }
    function buildHtml(){
      const mi = D().mIndex;
      const info = {
        piekarnia: [L("+1 300 tys. bochenków mocy miesięcznie", "+1 300 тыс. буханок мощности в месяц"), L("Pomaga, gdy brakuje mocy — nie gdy brakuje zboża.", "Помогает, когда не хватает мощности — не зерна.")],
        nawadnianie: [L("Susza obniża zbiory o 65% słabiej, pola +12%", "Засуха бьёт по урожаю на 65% слабее, поля +12%"), L("Odporność: zwraca się w latach suszy. Kanały działają częściowo już w trakcie budowy.", "Устойчивость: окупается в засушливые годы. Каналы частично работают уже во время стройки.")],
        elektrownia: [L("Szoki cen energii słabsze o 25%", "Шоки цен энергии слабее на 25%"), L("Bezpieczeństwo energetyczne: słabsza inflacja kosztowa.", "Энергобезопасность: слабее инфляция издержек.")],
        kolej: [L("Transport zboża −35%, potencjał PKB +5%", "Транспорт зерна −35%, потенциал ВВП +5%"), L("Taniej wozić = taniej produkować.", "Дешевле возить = дешевле производить.")],
        port: [L("Eksport +25%, większa przepustowość", "Экспорт +25%, больше пропускная способность"), L("Więcej handlu — ale większa zależność od świata.", "Больше торговли — но больше зависимость от мира.")],
      };
      const doneK = k => (k === "nawadnianie" && s.infra.irrigation >= 1) || (k === "elektrownia" && s.infra.energyEff) || (k === "kolej" && s.infra.rail) || (k === "port" && s.infra.port) || (k === "piekarnia" && s.b.bakeries >= 3);
      const tr = Math.max(1, s.m.spendItems.transfers * 30);
      return `<h2>${X.tabs.build}</h2><p class="nv-muted">${L("Inwestycja to pieniądze dziś za korzyść jutro. Każdy milion wydany tu to milion, którego nie ma na nic innego.", "Инвестиция — деньги сегодня ради выгоды завтра. Каждый миллион здесь — миллион, которого нет ни на что другое.")}</p>
        ${Object.entries(S.PROJECTS).map(([k, P]) => { const pr = s.projects.find(x => x.k === k), lock = mi < P.unlock, done = doneK(k);
          const pct = pr ? Math.round(100 * pr.days / (P.months * 30)) : 0, endM = pr ? Math.floor((s.day + (P.months * 30 - pr.days)) / 30) : 0;
          return `<div class="nv-proj ${lock ? "locked" : ""}"><div class="nv-ch"><b>${PN[k][0].toUpperCase() + PN[k].slice(1)}</b>${done ? `<span class="nv-ok">✓ ${L("gotowe", "готово")}</span>` : ""}</div>
            <div class="nv-tiles"><div><small>💰 ${L("Koszt", "Стоимость")}</small><b>${P.cost} ${L("mln", "млн")}</b></div><div><small>⏳ ${L("Budowa", "Стройка")}</small><b>${P.months} ${L("mies.", "мес.")}</b></div><div><small>👷 ${L("Miejsca pracy", "Рабочие места")}</small><b>${P.jobs}</b></div></div>
            <p>✨ ${info[k][0]}</p><p class="nv-muted">${info[k][1]} ${L(`Alternatywa: ${P.cost} mln = ${X.n1(P.cost / tr)} mies. transferów socjalnych.`, `Альтернатива: ${P.cost} млн = ${X.n1(P.cost / tr)} мес. соцтрансферов.`)}</p>
            ${pr ? `<div class="nv-prog"><i style="width:${pct}%"></i></div><small>🏗️ ${pct}% · ${L("ukończenie", "завершение")}: ${X.months[endM % 12]}, ${X.year} ${Math.floor(endM / 12) + 1}</small>`
              : lock ? `<small class="nv-muted">🔒 ${L(`Od miesiąca ${P.unlock + 1}`, `С месяца ${P.unlock + 1}`)}</small>` : done ? "" : `<button class="nv-btn" data-build="${k}">${L("Rozpocznij budowę", "Начать стройку")} · ${P.cost} ${L("mln", "млн")}</button>`}</div>`; }).join("")}`;
    }
    function openTab(k){
      tab = tab === k ? null : k;
      host.querySelectorAll("[data-tab]").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
      const p = $("#nvpanel"); p.hidden = !tab;
      if (tab === "policy") Object.keys(s.p).forEach(k2 => prevVals[k2] = s.p[k2]);
      if (tab){ p.innerHTML = `<button class="nv-x nv-px" data-tab="${tab}" aria-label="${L("Zamknij", "Закрыть")}">✕</button>` + panelHtml(); p.scrollTop = 0; bindPanel(); }
      track?.("game", "tab", tab || "none");
    }
    function refreshPanel(){ if (!tab || tab === "policy") return; const p = $("#nvpanel"), sc = p.scrollTop; const open = [...p.querySelectorAll("details")].map(d => d.open); p.innerHTML = `<button class="nv-x nv-px" data-tab="${tab}" aria-label="${L("Zamknij", "Закрыть")}">✕</button>` + panelHtml(); p.querySelectorAll("details").forEach((d, i) => d.open = open[i]); p.scrollTop = sc; bindPanel(); }
    function bindPanel(){
      $("#nvpanel").querySelectorAll("[data-pol]").forEach(inp => {
        const k = inp.dataset.pol, P = POL().find(x => x.k === k);
        inp.oninput = () => { S.setPolicy(s, k, +inp.value); $("#pv-" + k).textContent = P.f(+inp.value); clearTimeout(previewT); previewT = setTimeout(() => previewPolicy(k), 150); hud(); learnHooks("policy:" + k); };
      });
    }

    // ---------- modal i powiadomienia
    function modal(html, kind){
      $("#nvmodal").innerHTML = html ? `<div class="nv-modal" data-kind="${kind || ""}"><div class="nv-mcard">${html}<button class="nv-btn" data-mclose>${kind === "intro" ? L("Zaczynam ▶", "Начинаю ▶") : L("Zamknij", "Закрыть")}</button></div></div>` : "";
    }
    function toast(html, ms = 7000, cls = ""){
      const box = $("#nvtoasts"), t = document.createElement("div"); t.className = "nv-toast " + cls; t.innerHTML = html; box.appendChild(t);
      setTimeout(() => t.classList.add("out"), ms); setTimeout(() => t.remove(), ms + 400);
      while (box.children.length > (matchMedia("(max-width:900px)").matches ? 1 : 3)) box.firstChild.remove();
    }
    function unlockConcept(k){
      if (s.concepts[k] != null) return;
      s.concepts[k] = s.day; const c = CON[k];
      toast(`<small>💡 ${L("Właśnie to zobaczyłeś", "Ты только что это увидел")}</small><div class="nv-chain">${c.chain.join(" → ")}</div><b>${L("To się nazywa", "Это называется")}: ${c.t}</b>`, 9000, "learn");
      sound.ping(); track?.("game", "concept", k);
    }
    // doświadczenie → wyjaśnienie → pojęcie
    function learnHooks(tag){
      const sh = s.b.short / Math.max(1, s.b.demand), h = H(), a = ago(30);
      if (sh > 0.02) unlockConcept("shortage");
      if (s.b.capped && sh > 0.02) unlockConcept("ceiling");
      if (s.concepts.shortage != null && s.day - s.concepts.shortage > 20 && h.bread > a.bread * 1.02) unlockConcept("equilibrium");
      if (h.bread > a.bread * 1.06 && h.demand < a.demand) unlockConcept("elasticity");
      if (s.events.some(e => e.k === "drought" && S.phaseOf(e) !== "warning")){ unlockConcept("scarcity"); if (s.w.crop < 0.9) unlockConcept("supplyShock"); }
      if (s.events.some(e => e.k === "energy" && S.phaseOf(e) === "crisis")) unlockConcept("costPush");
      if (s.events.some(e => e.k === "boom") && s.m.ygap > 1) unlockConcept("demandPull");
      if (s.events.some(e => e.k === "recession" && S.phaseOf(e) !== "warning")) unlockConcept("cycle");
      if (tag === "policy:spend" || tag === "policy:tax" || tag === "policy:transfers") unlockConcept("fiscal");
      if (tag === "policy:rate") unlockConcept("monetary");
      if (tag === "policy:tariff" || s.g.imp > 150 || s.g.exp > 150) unlockConcept("trade");
      if (tag === "build") unlockConcept("opportunity");
      if (s.projects.some(p => p.days > 40)) unlockConcept("multiplier");
      if (s.m.debtRatio > 0.7) unlockConcept("debt");
    }

    // ---------- raport miesiąca: kafelki, wartości na koniec miesiąca = górny pasek w tej chwili
    function monthReport(){
      const r = s.lastReport; if (!r) return;
      const prev = s.monthly[s.monthly.length - 2];
      const tile = (n, v, d, goodUp, fmtD) => `<div><small>${n}</small><b>${v}</b>${d != null ? `<i class="${Math.abs(d) < 0.05 ? "n" : (d > 0) === goodUp ? "g" : "b"}">${d > 0 ? "↑" : d < 0 ? "↓" : "→"} ${fmtD(Math.abs(d))}</i>` : ""}</div>`;
      const top = s.news.filter(n => n.day >= s.day - 30).slice(-2).map(n => { const [ic, t] = newsText(n, lang); return `<li>${ic} ${esc(t)}</li>`; }).join("");
      toast(`<small>📅 ${L("Koniec miesiąca", "Конец месяца")}: ${X.months[r.month]}, ${X.year} ${r.year + 1}</small>
        <div class="nv-tiles sm">${tile(L("PKB", "ВВП"), X.n0(r.YEnd), prev ? (r.YEnd / prev.YEnd - 1) * 100 : null, true, v => X.n1(v) + "%")}${tile(L("Inflacja", "Инфляция"), X.pct(r.infl), prev ? r.infl - prev.infl : null, false, v => X.n1(v))}${tile(L("Bezrobocie", "Безработица"), X.pct(r.unemp), r.unemp - r.unempStart, false, v => X.n1(v))}${tile(L("Chleb", "Хлеб"), X.zl(r.breadEnd), (r.breadEnd / r.breadStart - 1) * 100, false, v => X.n1(v) + "%")}${tile(L("Saldo w miesiącu", "Сальдо за месяц"), X.sgn(r.budget), null)}${tile(L("Poparcie", "Поддержка"), Math.round(r.approval) + "%", prev ? r.approval - prev.approval : null, true, v => X.n1(v))}</div>
        ${top ? `<ul>${top}</ul>` : ""}`, speed >= 16 ? 3500 : 8000, "month");
    }

    // ---------- czas
    const MS = { 1: 1100, 4: 280, 16: 70 };
    function setSpeed(v){
      clearInterval(timer); timer = null;
      if (v > 0 && !s.over){ speed = v; timer = setInterval(stepDay, MS[v]); }
      hud(); visual();
    }
    function stepDay(){
      if (s.over){ setSpeed(0); finish(); return; }
      const nNews = s.news.length;
      S.tick(s);
      if (s.day % 30 === 0){ monthReport(); save(); }
      if (s.news.length > nNews){ const n = s.news[s.news.length - 1]; if (/:crisis$|^warn:/.test(n.id)){ if (speed >= 4) setSpeed(0); const [ic, t] = newsText(n, lang); toast(`<b>${ic} ${esc(t)}</b>${speed >= 4 || !timer ? `<small>${L("Czas zatrzymany — sprawdź, co się dzieje.", "Время остановлено — посмотри, что происходит.")}</small>` : ""}`, 9000, "alert"); sound.ping(); } }
      learnHooks();
      hud(); feed(); visual();
      if (s.day % 3 === 0){ labels(); refreshPanel(); if (sel) $("#nvcard").innerHTML = objCard(sel); }
      if (why && s.day % 2 === 0){ const c = $("#nvmodal .nv-mcard"); if (c){ const o = c.querySelector("details")?.open; c.innerHTML = whyHtml(why) + `<button class="nv-btn" data-mclose>${L("Zamknij", "Закрыть")}</button>`; if (o) c.querySelector("details").open = true; } }
      if (s.over) finish();
    }
    function visual(){
      const d = D(), h = H();
      world?.apply({ prod: s.b.prod / S.BAKERY_CAP / s.b.bakeries, act: s.m.Y / s.m.Ypot, trade: clamp((s.g.imp + s.g.exp) / 300 + s.m.X / 150, 0.1, 1.5), short: 100 * s.b.short / Math.max(1, s.b.demand), stock: clamp(s.g.stock / 12000, 0, 1),
        crop: s.w.crop, month: d.month, dayIn: (d.day + 1) / 30, rain: s.w.rain, energy: s.w.energy,
        building: s.projects.map(p => p.k), built: [s.infra.irrigation >= 1 && "nawadnianie", s.infra.energyEff && "elektrownia", s.infra.rail && "kolej", s.infra.port && "port"].filter(Boolean), bakeries: s.b.bakeries, running: !!timer, speed, workers: 1 - h.unemp / 100 });
      sound.set({ rain: s.w.rain, act: s.m.Y / s.m.Ypot, alarm: s.events.some(e => S.phaseOf(e) === "crisis") });
    }
    function finish(){
      if (finish.done) return; finish.done = true;
      clearInterval(timer); timer = null; hud();
      try { localStorage.removeItem(LS_SAVE); } catch {}
      const sc = S.score(s), a = sc.start, z = sc.end;
      const stars = sc.total >= 75 ? 3 : sc.total >= 60 ? 2 : sc.total >= 45 ? 1 : 0;
      try { const prev = JSON.parse(localStorage.getItem(LS) || "null"); if (prev == null || stars > prev) localStorage.setItem(LS, JSON.stringify(stars)); } catch {}
      track?.("game", "term-end", Math.round(sc.total));
      const dif = (n, v) => `<div><small>${n}</small><b>${v > 0 ? "+" : ""}${X.n1(v)}%</b></div>`;
      const names = Object.fromEntries(POL().map(p => [p.k, p.n]));
      const key = s.decisions.filter(dd => dd.k !== "reserve" || Math.abs(dd.v) >= 200).sort((x, y) => (y.k === "build") - (x.k === "build")).slice(0, 5);
      modal(`<h2>${s.lost ? "🏛️ " + L("Rząd upadł", "Правительство пало") : "🏁 " + L("Kadencja zakończona", "Срок завершён")} ${"★".repeat(stars)}${"☆".repeat(3 - stars)}</h2>
        ${s.lost ? `<p>${{ hyper: L("Hiperinflacja zniszczyła zaufanie do pieniądza.", "Гиперинфляция разрушила доверие к деньгам."), debt: L("Państwo straciło dostęp do finansowania.", "Государство потеряло доступ к финансированию."), jobs: L("Masowe bezrobocie.", "Массовая безработица."), food: L("Kryzys żywnościowy.", "Продовольственный кризис."), approval: L("Społeczeństwo odebrało Ci zaufanie.", "Общество лишило тебя доверия.") }[s.lost]}</p>` : ""}
        <b>${L("Co się zmieniło?", "Что изменилось?")}</b>
        <div class="nv-tiles">${dif("PKB", (z.Y / a.Y - 1) * 100)}${dif(L("Dochód realny", "Реальный доход"), (z.realInc / a.realInc - 1) * 100)}<div><small>${L("Inflacja", "Инфляция")}</small><b>${X.pct(z.infl)}</b></div><div><small>${L("Bezrobocie", "Безработица")}</small><b>${X.pct(z.unemp)}</b></div><div><small>${L("Dług/PKB", "Долг/ВВП")}</small><b>${Math.round(z.debtRatio * 100)}%</b></div><div><small>${L("Poparcie", "Поддержка")}</small><b>${Math.round(z.approval)}%</b></div></div>
        <b>${L("Ocena", "Оценка")}: ${Math.round(sc.total)}/100</b>
        ${Object.entries(sc.parts).map(([k, v]) => `<div class="nv-sbar"><span>${{ economy: L("Gospodarka", "Экономика"), stability: L("Stabilność", "Стабильность"), state: L("Państwo", "Государство"), society: L("Społeczeństwo", "Общество"), resilience: L("Odporność", "Устойчивость") }[k]}</span><i class="${v >= 60 ? "g" : "b"}" style="width:${v}%"></i><b>${Math.round(v)}</b></div>`).join("")}
        <b>${L("Przetrwane kryzysy", "Пережитые кризисы")}</b><p>${s.crises.map(c => `✓ ${X.ev[c.k].icon} ${X.ev[c.k].name}`).join(" · ") || L("brak", "нет")}</p>
        <b>${L("Ważne decyzje", "Важные решения")}</b><ul>${key.map(dd => { const dt = S.date(dd.day); return `<li>${X.months[dt.month]}, ${X.year} ${dt.year + 1}: ${dd.k === "build" ? "🏗️ " + PN[dd.v] : names[dd.k] + " → " + (POL().find(p => p.k === dd.k)?.f(dd.v) ?? dd.v)}</li>`; }).join("") || `<li>${L("Prawie niczego nie zmieniano.", "Почти ничего не менялось.")}</li>`}</ul>
        <button class="nv-btn" id="nvnew">${L("Nowa kadencja (inne kryzysy)", "Новый срок (другие кризисы)")}</button>`, "end");
    }

    // ---------- wstęp: krótki, wizualny
    function intro(){
      modal(`<h2>🏛️ ${L("Witaj w Novarii", "Добро пожаловать в Новарию")}</h2>
        <div class="nv-tiles"><div><small>👥 ${L("Mieszkańcy", "Жители")}</small><b>120 000</b></div><div><small>📈 PKB</small><b>${X.n0(H().Y)} ${L("mln/mies.", "млн/мес.")}</b></div><div><small>⏳ ${L("Kadencja", "Срок")}</small><b>8 ${L("lat", "лет")}</b></div></div>
        <div class="nv-chain">🌾 ${L("farmy", "фермы")} → 🏚️ ${L("silosy", "силосы")} → 🏭 ${L("piekarnie", "пекарни")} → 🏪 ${L("sklepy", "магазины")} → 👥 ${L("ludzie", "люди")}</div>
        <ul class="nv-steps"><li>▶ ${L("Gospodarka żyje sama — obserwuj mapę i wiadomości.", "Экономика живёт сама — наблюдай за картой и новостями.")}</li><li>👆 ${L("Klikaj budynki i wskaźniki → „Dlaczego?”.", "Нажимай на здания и показатели → «Почему?».")}</li><li>🎛️ ${L("Polityka zmienia warunki, nie ceny. Skutki przychodzą z opóźnieniem.", "Политика меняет условия, а не цены. Последствия приходят с задержкой.")}</li><li>🎯 ${L("Cel: oddać kraj silniejszy i odporniejszy niż dziś.", "Цель: передать страну сильнее и устойчивее, чем сегодня.")}</li></ul>
        <p class="nv-muted">${L("Na początku masz rynek chleba. Podatki, NBP i handel odblokują się z czasem. Spacja = pauza.", "Сначала у тебя рынок хлеба. Налоги, NBP и торговля откроются со временем. Пробел = пауза.")}</p>`, "intro");
      try { localStorage.setItem(LS_TUT, "5"); } catch {}
    }

    // ---------- obsługa kliknięć
    host.addEventListener("click", e => {
      const t = e.target;
      if (t.closest("[data-mclose]") || (t.closest(".nv-modal") && !t.closest(".nv-mcard"))){ const intro0 = $(".nv-modal")?.dataset.kind === "intro"; why = null; modal(""); if (intro0 && !timer) setSpeed(1); return; }
      if (t.closest("#nvnew")){ s = S.newGame(); finish.done = false; modal(""); hud(); feed(); visual(); labels(); setSpeed(1); return; }
      const sp = t.closest("[data-sp]"); if (sp){ setSpeed(+sp.dataset.sp); return; }
      const w = t.closest("[data-why]"); if (w){ openWhy(w.dataset.why); return; }
      const tb = t.closest("[data-tab]"); if (tb){ openTab(tb.dataset.tab); return; }
      const tg = t.closest("[data-tab-go]"); if (tg){ if (tab !== tg.dataset.tabGo) openTab(tg.dataset.tabGo); return; }
      const ev = t.closest("[data-evk]"); if (ev){ openWhy({ drought: "grain", energy: "infl", boom: "infl", recession: "gdp", credit: "gdp", trade: "grain" }[ev.dataset.evk]); return; }
      const ch = t.closest("[data-chart]"); if (ch){ chartKey = ch.dataset.chart; refreshPanel(); return; }
      const bd = t.closest("[data-build]"); if (bd){ if (S.startProject(s, bd.dataset.build)){ learnHooks("build"); toast(`🏗️ ${L("Budowa ruszyła", "Стройка началась")}: ${PN[bd.dataset.build]}`, 4000); visual(); refreshPanel(); } return; }
      if (t.closest("[data-close]")){ hideCard(); return; }
      const ob = t.closest("[data-obj]"); if (ob){ const r = ob.getBoundingClientRect(), st = $("#nvst").getBoundingClientRect(); showCard(ob.dataset.obj, r.left - st.left + r.width / 2, r.top - st.top); return; }
    });
    $("#nvsnd").onclick = () => { if (sound.enabled){ sound.off(); $("#nvsnd").textContent = "🔇"; } else { sound.on(); $("#nvsnd").textContent = "🔊"; } };
    const onKey = e => { if (!host.isConnected){ window.removeEventListener("keydown", onKey); return; } if (e.target.closest?.("input, textarea")) return; if (e.code === "Space"){ e.preventDefault(); setSpeed(timer ? 0 : speed || 1); } if (e.key === "Escape"){ why = null; modal(""); hideCard(); } };
    window.addEventListener("keydown", onKey);

    hud(); feed();
    let seen = false; try { seen = localStorage.getItem(LS_TUT) === "5"; } catch {}
    loadThree().then(THREE => {
      const ld = $("#nvload");
      if (THREE){ try { world = makeWorld(THREE, $("#nvcv")); } catch (e) { world = null; } }
      if (!world) ld.textContent = L("Ten ekran nie obsługuje 3D — gospodarka działa dalej, korzystaj z zakładek.", "Этот экран не поддерживает 3D — экономика работает, пользуйся вкладками.");
      else { ld.remove(); world.resize(); visual(); labels();
        $("#nvcv").addEventListener("click", e => { const id = world.pick(e.clientX, e.clientY); const r = $("#nvst").getBoundingClientRect(); if (id) showCard(id, e.clientX - r.left, e.clientY - r.top); else hideCard(); });
        const ro = new ResizeObserver(() => { if (!host.isConnected){ ro.disconnect(); return; } world.resize(); labels(); }); ro.observe($("#nvst"));
      }
      const iv = setInterval(() => { if (!host.isConnected){ clearInterval(iv); clearInterval(timer); timer = null; world?.dispose(); sound.off(); save(); return; } if (!timer){ labels(); } }, 500);
      if (!seen) intro(); else setSpeed(1);
    });
    window.addEventListener("pagehide", save);
  }

  window.BrainstormGame = { mount };
})();
