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
      jobsDown: ["👷", L(`Bezrobocie przekroczyło 9% (${v}%)`, `Безработица превысила 9% (${v}%)`), "worker", L("U nas skrócili zmiany, a nowych ofert brak.", "У нас сократили смены, а новых вакансий нет.")],
      inflLow: ["🧊", L(`Ceny spadają — deflacja (${v}%)`, `Цены падают — дефляция (${v}%)`), "nbp", L("Ludzie odkładają zakupy, bo jutro będzie taniej.", "Люди откладывают покупки — завтра будет дешевле.")],
      forecastDrought: ["🌤️", L(`Synoptycy: ryzyko suszy tego lata ok. ${Math.round(v)}%`, `Синоптики: риск засухи этим летом ~${Math.round(v)}%`), "farmer", L("Patrzymy w niebo i liczymy zapasy.", "Смотрим в небо и считаем запасы.")],
      forecastEnergy: ["🛢️", L(`Analitycy: rośnie ryzyko szoku na rynku energii (${Math.round(v)}%)`, `Аналитики: растёт риск шока на рынке энергии (${Math.round(v)}%)`), "minister", L("Rynki ropy są nerwowe.", "Нефтяные рынки нервничают.")],
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
    try { const sv = JSON.parse(localStorage.getItem(LS_SAVE) || "null"); if (sv && sv.v === 2 && sv.s && !sv.s.over) s = sv.s; } catch {}
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
    const save = () => { try { localStorage.setItem(LS_SAVE, JSON.stringify({ v: 2, s: { ...s, _rng: null, hist: s.hist.slice(-120) } })); } catch {} };

    // ---------- KPI: stan dziś + trend 30 dni
    const kpiDef = () => {
      const h = H(), a = ago(30), sh = 100 * h.short / Math.max(1, h.demand);
      return [
        { k: "gdp", v: X.n0(h.Y) + L(" mln", " млн"), d: (h.Y / a.Y - 1) * 100, good: 1, sub: L("na miesiąc", "в месяц") },
        { k: "infl", v: X.pct(h.infl), d: h.infl - a.infl, good: inflGood(a.infl, h.infl) || 0, target: 1, sub: L("cel NBP 2,5%", "цель NBP 2,5%"), bad: h.infl > 5 || h.infl < 0 },
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
      $("#nvkpi").innerHTML = kpiDef().map(k => { const tr = Math.abs(k.d) < 0.05 ? "→" : k.d > 0 ? "↑" : "↓", good = tr === "→" ? "n" : k.target ? (k.good > 0 ? "g" : k.good < 0 ? "b" : "n") : (k.d > 0) === (k.good > 0) ? "g" : "b";
        return `<button class="nv-kpi ${k.bad ? "bad" : ""}" data-why="${k.k}"><span>${X.kpi[k.k]}</span><b>${k.v} <i class="${good}">${tr}</i></b><small>${k.sub}</small></button>`; }).join("");
    }

    // ---------- wydarzenia, ryzyka i wiadomości (na mapie)
    function feed(){
      const evs = s.events.map(e => { const ph = S.phaseOf(e), E = X.ev[e.k]; return `<button class="nv-ev ${e.k === "boom" ? "good" : ph}" data-evk="${e.k}">${E.icon} <b>${E.name}</b> <span>${phaseName(e.k, ph)}</span></button>`; }).join("");
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
      if (id.startsWith("piekarnia") && s.b.limit === "grain") return "⚠️";
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
        piekarnia: [L("Piekarnie", "Пекарни"), [row(L("Moc", "Мощность"), X.n0(b.cap) + L(" tys./mies.", " тыс./мес.")), row(L("Produkcja", "Выпуск"), X.n0(b.prod) + L(" tys.", " тыс.")), row(L("Wykorzystanie mocy", "Загрузка"), Math.round(100 * b.prod / b.cap) + "%"), row(L("Pracownicy", "Работники"), X.n0(150 * b.bakeries * (0.6 + 0.4 * b.prod / b.cap))), row(L("Zboża w magazynach na", "Зерна на складах на"), Math.round(g.stock / Math.max(1, b.prod) * 30) + L(" dni", " дн."), g.stock < b.prod * 0.5 ? "bad" : ""), `<div class="nv-con">${L("Dlaczego nie pieką więcej", "Почему не пекут больше")}: <b>${{ grain: "🌾 " + L("brakuje zboża w magazynach — piece stoją", "не хватает зерна на складах — печи простаивают"), cap: "🏭 " + L("piece pracują na 100% mocy", "печи работают на 100%"), grainPrice: "💰 " + L("drogie zboże → drogi chleb → ludzie kupują mniej", "дорогое зерно → дорогой хлеб → люди покупают меньше"), energyPrice: "⚡ " + L("droga energia → drogi chleb → ludzie kupują mniej", "дорогая энергия → дорогой хлеб → люди покупают меньше"), demand: "🛒 " + L("tyle ludzie chcą kupić po tej cenie", "столько люди хотят купить по этой цене") }[b.limit] || ""}</b></div>`], "bread"],
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

    // ---------- „Dlaczego?”: dokładne rozbicie zmiany każdego wskaźnika na przyczyny (suma części = zmiana)
    const inflGood = (from, to) => Math.abs(to - 2.5) < Math.abs(from - 2.5) - 0.02 ? 1 : Math.abs(to - 2.5) > Math.abs(from - 2.5) + 0.02 ? -1 : 0;
    const lnPart = (total, pairs) => { const ls = pairs.map(([n, a, b]) => [n, a > 0 && b > 0 ? Math.log(b / a) : 0]); const sum = ls.reduce((x, y) => x + y[1], 0); return ls.map(([n, l]) => [n, Math.abs(sum) > 1e-9 ? total * l / sum : 0]); };
    // Zdanie do każdej części rozbicia: [gdy podnosi wskaźnik, gdy obniża] — mechanizm prostymi słowami
    const PTXT = {
      bread: [[L("Zboże zdrożało — piekarnie płacą więcej za mąkę i przenoszą to na cenę bochenka.", "Зерно подорожало — пекарни платят больше за муку и переносят это в цену."), L("Zboże potaniało — mąka tańsza, więc bochenek też tanieje.", "Зерно подешевело — мука дешевле, буханка тоже дешевеет.")],
        [L("Ogólnie ceny i płace w kraju rosną (inflacja) — piekarnie płacą więcej pracownikom.", "Общие цены и зарплаты растут (инфляция) — пекарни больше платят работникам."), L("Płace rosną wolniej — koszty pracy w piekarni spadają.", "Зарплаты растут медленнее — затраты на труд падают.")],
        [L("Energia zdrożała — piece i transport kosztują więcej.", "Энергия подорожала — печи и транспорт дороже."), L("Energia potaniała — tańszy wypiek i transport.", "Энергия подешевела — дешевле выпечка и транспорт.")],
        [L("Chleba jest za mało w stosunku do chętnych — sklepy podnoszą marżę (cena „rynkowa” rośnie).", "Хлеба мало относительно желающих — магазины поднимают наценку."), L("Chleba jest pod dostatkiem — sklepy konkurują ceną i marża spada.", "Хлеба достаточно — магазины конкурируют ценой, наценка падает.")]],
      short: [[L("Więcej ludzi chce kupić chleb (tańszy lub wyższe dochody) — chętnych przybywa szybciej niż bochenków.", "Больше людей хотят купить хлеб — желающих больше, чем буханок."), L("Mniej osób chce kupić chleb (drożej, niższe dochody) — kolejki maleją.", "Меньше людей хотят купить хлеб — очереди уменьшаются.")],
        [L("Piekarnie upiekły mniej (brak zboża lub mocy pieców) — niedobór rośnie.", "Пекарни испекли меньше (нет зерна или мощности) — дефицит растёт."), L("Piekarnie upiekły więcej — niedobór maleje.", "Пекарни испекли больше — дефицит уменьшается.")]],
      infl: [[L("Ludzie i firmy spodziewają się wyższych cen, więc z góry podnoszą ceny i żądają podwyżek.", "Люди и фирмы ждут роста цен и заранее их поднимают."), L("Oczekiwania się uspokajają — firmy rzadziej podnoszą ceny.", "Ожидания успокаиваются — фирмы реже поднимают цены.")],
        [L("Popyt jest większy niż to, co gospodarka może wyprodukować — firmy podnoszą ceny.", "Спрос больше, чем экономика может произвести — фирмы поднимают цены."), L("Popyt jest słabszy niż możliwości gospodarki — firmy hamują z podwyżkami.", "Спрос слабее возможностей экономики — фирмы сдерживают цены.")],
        [L("Droższa energia podnosi koszty wszystkich firm — to inflacja kosztowa.", "Дорогая энергия поднимает издержки всех фирм — инфляция издержек."), L("Energia tanieje — koszty firm spadają, ceny rosną wolniej.", "Энергия дешевеет — издержки падают, цены растут медленнее.")],
        [L("Żywność (chleb) drożeje szybciej niż rok temu — podbija średni wzrost cen.", "Еда (хлеб) дорожает быстрее, чем год назад — подталкивает инфляцию."), L("Żywność drożeje wolniej niż rok temu (lub tanieje) — mniej podbija średni wzrost cen.", "Еда дорожает медленнее, чем год назад (или дешевеет) — меньше подталкивает инфляцию.")]],
      gdp: [[L("Ludzie więcej kupują — firmy więcej sprzedają i produkują.", "Люди больше покупают — фирмы больше продают и производят."), L("Ludzie mniej kupują — firmy produkują mniej.", "Люди меньше покупают — фирмы производят меньше.")],
        [L("Firmy więcej inwestują (maszyny, budynki) — to też jest popyt.", "Фирмы больше инвестируют — это тоже спрос."), L("Firmy wstrzymują inwestycje — mniej zamówień.", "Фирмы замораживают инвестиции — меньше заказов.")],
        [L("Państwo więcej wydaje — zamawia usługi i budowy.", "Государство больше тратит — заказывает услуги и стройки."), L("Państwo wydaje mniej — mniej zamówień publicznych.", "Государство тратит меньше — меньше госзаказов.")],
        [L("Eksport rośnie szybciej niż import — zagranica kupuje więcej od nas.", "Экспорт растёт быстрее импорта — заграница покупает у нас больше."), L("Eksport słabnie lub import rośnie — część popytu ucieka za granicę.", "Экспорт слабеет или импорт растёт — часть спроса уходит за границу.")]],
      C: [[L("Lepsze nastroje — ludzie chętniej wydają.", "Настроения лучше — люди охотнее тратят."), L("Gorsze nastroje — ludzie oszczędzają.", "Настроения хуже — люди экономят.")],
        [L("Ludzie mają więcej pieniędzy po podatkach — więcej kupują.", "У людей больше денег после налогов — больше покупают."), L("Ludziom zostaje mniej po podatkach — mniej kupują.", "У людей остаётся меньше после налогов — меньше покупают.")],
        [L("Tańszy kredyt — łatwiej kupić na raty.", "Кредит дешевле — легче покупать в рассрочку."), L("Droższy kredyt — mniej zakupów na raty.", "Кредит дороже — меньше покупок в рассрочку.")],
        [L("Mniej kolejek — zakupy wracają.", "Меньше очередей — покупки возвращаются."), L("Puste półki — ludzie nie mają czego kupić.", "Пустые полки — людям нечего купить.")]],
      disp: [[L("Gospodarka produkuje więcej — rosną pensje i zyski.", "Экономика производит больше — растут зарплаты и прибыль."), L("Produkcja spada — pensje i zyski maleją.", "Производство падает — зарплаты и прибыль снижаются.")],
        [L("Niższy podatek (lub mniejsze dochody do opodatkowania) — w portfelach zostaje więcej.", "Ниже налог — в кошельках остаётся больше."), L("Wyższy podatek zabiera większą część pensji — w portfelach zostaje mniej, budżet dostaje więcej.", "Выше налог забирает большую часть зарплаты — у людей меньше, в бюджете больше.")],
        [L("Wyższe transfery socjalne — szczególnie biedni mają więcej.", "Выше соцтрансферы — особенно у бедных больше денег."), L("Niższe transfery — biedni mają mniej.", "Ниже трансферы — у бедных меньше денег.")],
        [L("Więcej bezrobotnych dostaje zasiłki.", "Больше безработных получают пособия."), L("Mniej bezrobotnych — mniej zasiłków.", "Меньше безработных — меньше пособий.")]],
      realInc: [[L("Pensje w złotówkach rosną.", "Зарплаты в злотых растут."), L("Pensje w złotówkach spadają (wyższy podatek, mniej pracy).", "Зарплаты в злотых падают (выше налог, меньше работы).")],
        [L("Ceny w sklepach rosną wolniej niż pensje.", "Цены растут медленнее зарплат."), L("Ceny w sklepach (żywność, energia) rosną szybciej niż pensje — za te same pieniądze kupisz mniej.", "Цены (еда, энергия) растут быстрее зарплат — на те же деньги купишь меньше.")]],
      I: [[L("Firmy są optymistyczne.", "Фирмы настроены оптимистично."), L("Firmy boją się przyszłości.", "Фирмы боятся будущего.")], [L("Banki chętniej pożyczają.", "Банки охотнее дают кредиты."), L("Banki ograniczają kredyty.", "Банки ограничивают кредиты.")], [L("Kredyt tańszy (niższa stopa realna).", "Кредит дешевле (ниже реальная ставка)."), L("Kredyt droższy (wyższa stopa realna) — mniej projektów się opłaca.", "Кредит дороже (выше реальная ставка) — меньше проектов окупается.")], [L("Budowy państwa ciągną zamówienia dla firm.", "Госстройки тянут заказы для фирм."), L("Koniec budów państwa.", "Госстройки закончились.")], [L("Gospodarka rośnie — potrzeba więcej maszyn.", "Экономика растёт — нужно больше оборудования."), L("", "")]],
      unemp: [[L("Produkcja spadła — firmy potrzebują mniej ludzi.", "Производство упало — фирмам нужно меньше людей."), L("Produkcja wzrosła — firmy zatrudniają.", "Производство выросло — фирмы нанимают.")], [L("Wydajność rośnie szybciej niż produkcja — ta sama praca wymaga mniej ludzi.", "Производительность растёт быстрее выпуска — та же работа требует меньше людей."), L("", "")], [L("Kończą się budowy lub przybywa chętnych do pracy.", "Заканчиваются стройки или растёт число желающих работать."), L("Budowy dają dodatkowe miejsca pracy.", "Стройки дают дополнительные рабочие места.")]],
      budget: [[L("Wpływy z podatku dochodowego rosną (wyższa stawka lub wyższe pensje).", "Поступления подоходного налога растут."), L("Wpływy z podatku dochodowego maleją.", "Поступления подоходного налога падают.")], [L("Ludzie więcej kupują — więcej VAT.", "Люди больше покупают — больше НДС."), L("Ludzie mniej kupują — mniej VAT.", "Люди меньше покупают — меньше НДС.")], [L("Więcej ceł z importu.", "Больше пошлин с импорта."), L("Mniej ceł (mniejszy import lub niższe cło).", "Меньше пошлин.")], [L("Sprzedaż zboża z rezerwy przynosi pieniądze.", "Продажа зерна из резерва приносит деньги."), L("Zakupy do rezerwy kosztują.", "Закупки в резерв стоят денег.")], [L("Mniejsze wydatki na usługi publiczne.", "Меньше расходов на госуслуги."), L("Większe wydatki na usługi publiczne.", "Больше расходов на госуслуги.")], [L("Mniej wydatków na transfery i zasiłki.", "Меньше расходов на трансферы и пособия."), L("Więcej wydatków na transfery i zasiłki.", "Больше расходов на трансферы и пособия.")], [L("Mniejsze dopłaty rolne.", "Меньше агродотаций."), L("Większe dopłaty rolne.", "Больше агродотаций.")], [L("Budowy się skończyły.", "Стройки закончились."), L("Trwają budowy — raty kosztują.", "Идут стройки — платежи стоят денег.")], [L("Mniejsze odsetki od długu.", "Меньше процентов по долгу."), L("Większe odsetki — dług rośnie lub droższe pożyczanie.", "Больше процентов — долг растёт или занимать дороже.")]],
      approval: [[L("Ludzie mogą kupić więcej za swoje pensje.", "Люди могут купить больше на свои зарплаты."), L("Ludzie mogą kupić mniej za swoje pensje.", "Люди могут купить меньше на свои зарплаты.")], [L("Mniej osób bez pracy.", "Меньше людей без работы."), L("Więcej osób bez pracy.", "Больше людей без работы.")], [L("Inflacja bliżej 2,5% — ceny stabilniejsze.", "Инфляция ближе к 2,5% — цены стабильнее."), L("Inflacja oddala się od 2,5% — ceny niestabilne.", "Инфляция удаляется от 2,5% — цены нестабильны.")], [L("Mniej kolejek po chleb.", "Меньше очередей за хлебом."), L("Więcej kolejek po chleb.", "Больше очередей за хлебом.")], [L("Niższe podatki są popularne.", "Низкие налоги популярны."), L("Wyższe podatki są niepopularne.", "Высокие налоги непопулярны.")], [L("Lepsze usługi publiczne i transfery.", "Лучше госуслуги и трансферы."), L("Cięcia usług i transferów.", "Сокращение услуг и трансферов.")]],
    };
    function explain(key, a, z){
      const P = (lab, v) => [lab, v];
      const pe = z.pe || s.pe, pa = a.pe || s.pe;
      switch (key){
        case "bread": { const m = (h) => h.bread - h.costGrain - h.costLabor - h.costEnergy;
          return { t: L("Cena chleba", "Цена хлеба"), u: "zł", f: x => X.zl(x), good: -1, from: a.bread, to: z.bread,
            parts: [P("🌾 " + L("koszt zboża", "стоимость зерна"), z.costGrain - a.costGrain), P("👷 " + L("płace (ceny w gospodarce)", "зарплаты (общие цены)"), z.costLabor - a.costLabor), P("⚡ " + L("energia", "энергия"), z.costEnergy - a.costEnergy), P("🏪 " + L("marża: niedobór lub nadwyżka chleba", "маржа: дефицит или излишек хлеба"), m(z) - m(a))],
            kids: ["grain", "short", "infl"], how: L("cena bochenka = zboże + płace + energia + marża (marża rośnie, gdy chleba brakuje). Cena dochodzi do celu stopniowo.", "цена буханки = зерно + зарплаты + энергия + маржа (маржа растёт при нехватке). Цена идёт к цели постепенно.") }; }
        case "grain": return { t: L("Cena zboża", "Цена зерна"), u: "zł/t", f: x => X.n0(x) + " zł/t", good: -1, from: a.grain, to: z.grain, factors: true,
            parts: [[L("📦 Zapas na rynku", "📦 Запас на рынке"), X.n0(a.stock) + " t", X.n0(z.stock) + " t", z.stock - a.stock, 1], [L("⏳ Zapas wystarcza do żniw w", "⏳ Запаса хватит до жатвы на"), Math.round(a.ratio * 100) + "%", Math.round(z.ratio * 100) + "%", z.ratio - a.ratio, 1], [L("🌾 Prognoza zbiorów", "🌾 Прогноз урожая"), X.n0(a.harvestF) + " t", X.n0(z.harvestF) + " t", z.harvestF - a.harvestF, 1], [L("🔮 Oczekiwania rynku (×)", "🔮 Ожидания рынка (×)"), X.n1(a.expect || 1), X.n1(z.expect || 1), (z.expect || 1) - (a.expect || 1), -1], [L("🚢 Import / 📤 eksport", "🚢 Импорт / 📤 экспорт"), `${X.n0(a.imp)} / ${X.n0(a.exp)}`, `${X.n0(z.imp)} / ${X.n0(z.exp)}`, (z.imp - z.exp) - (a.imp - a.exp), 1], [L("🌍 Cena importu (świat + cło + transport)", "🌍 Цена импорта (мир + пошлина + транспорт)"), X.n0(a.parity) + " zł/t", X.n0(z.parity) + " zł/t", 0, 0]],
            kids: ["harvest", "bread"], how: L("Zboże drożeje, gdy zapasów może nie wystarczyć do żniw. Gdy w kraju drożej niż import — przypływa import i hamuje cenę. Pełne magazyny = słaba prognoza prawie nie podnosi ceny.", "Зерно дорожает, когда запасов может не хватить до жатвы. Когда внутри дороже импорта — приходит импорт и сдерживает цену. Полные склады = плохой прогноз почти не поднимает цену.") };
        case "harvest": return { t: L("Prognoza zbiorów", "Прогноз урожая"), u: "t", f: x => X.n0(x) + " t", good: 1, from: a.harvestF, to: z.harvestF, factors: true,
            parts: [[L("🌧️ Opady (% normy)", "🌧️ Осадки (% нормы)"), Math.round(a.rain * 100) + "%", Math.round(z.rain * 100) + "%", z.rain - a.rain, 1], [L("🌱 Stan upraw", "🌱 Состояние посевов"), Math.round(a.crop * 100) + "%", Math.round(z.crop * 100) + "%", z.crop - a.crop, 1], [L("💧 Nawadnianie", "💧 Орошение"), "", Math.round(s.infra.irrigation * 100) + "%", 0, 0], [L("🚜 Dopłaty rolne (działające)", "🚜 Агродотации (действующие)"), X.n1(pa.farmSub) + L(" mln", " млн"), X.n1(pe.farmSub) + L(" mln", " млн"), pe.farmSub - pa.farmSub, 1]],
            kids: ["grain"], how: L("Stan upraw kształtuje się od kwietnia do sierpnia: deszcz poprawia, susza pogarsza. Nawadnianie łagodzi suszę. Żniwa: lipiec–wrzesień.", "Состояние посевов складывается с апреля по август: дождь улучшает, засуха ухудшает. Орошение смягчает засуху. Жатва: июль–сентябрь.") };
        case "short": return { t: L("Niedobór chleba", "Дефицит хлеба"), u: L("tys.", "тыс."), f: x => X.n0(x) + L(" tys.", " тыс."), good: -1, from: a.short, to: z.short,
            parts: [P("🛒 " + L("popyt (ile chcą kupić)", "спрос (сколько хотят купить)"), z.demand - a.demand), P("🏭 " + L("produkcja (ile upieczono)", "выпуск (сколько испекли)"), -(z.prod - a.prod))].map(([n, v]) => [n, v]),
            kids: ["bread", "grain"], how: L("niedobór = popyt − produkcja. Produkcję ogranicza mniejsze z: zboże w magazynach, moc pieców.", "дефицит = спрос − выпуск. Выпуск ограничивает меньшее из: зерно на складах, мощность печей.") };
        case "infl": return { t: L("Inflacja", "Инфляция"), u: "%", f: x => X.pct(x), good: 0, from: a.infl, to: z.infl,
            parts: [P("🔮 " + L("oczekiwania (co ludzie myślą o cenach)", "ожидания (что люди думают о ценах)"), (z.pi?.expect || 0) - (a.pi?.expect || 0)), P("📈 " + L("popyt vs. możliwości gospodarki", "спрос vs. возможности экономики"), (z.pi?.demand || 0) - (a.pi?.demand || 0)), P("⚡ " + L("energia (inflacja kosztowa)", "энергия (инфляция издержек)"), (z.pi?.energy || 0) - (a.pi?.energy || 0)), P("🍞 " + L("żywność (chleb) vs. rok temu", "еда (хлеб) vs. год назад"), (z.pi?.food || 0) - (a.pi?.food || 0))],
            kids: ["gdp", "bread", "rate"], how: L("Cel NBP: 2,5% — za wysoka zjada dochody, za niska (deflacja) hamuje gospodarkę. Wyższa stopa schładza popyt i oczekiwania po kilku miesiącach.", "Цель NBP: 2,5% — слишком высокая съедает доходы, слишком низкая (дефляция) тормозит экономику. Высокая ставка охлаждает спрос и ожидания через несколько месяцев.") };
        case "gdp": return { t: L("PKB (popyt w gospodarce)", "ВВП (спрос в экономике)"), u: L("mln", "млн"), f: x => X.n0(x) + L(" mln", " млн"), good: 1, from: a.Y, to: z.Y,
            parts: [P("🛍️ C — " + L("konsumpcja", "потребление"), z.C - a.C), P("🏗️ I — " + L("inwestycje firm", "инвестиции фирм"), z.I - a.I), P("🏛️ G — " + L("wydatki państwa", "госрасходы"), z.G - a.G), P("🌍 NX — " + L("eksport netto", "чистый экспорт"), z.NX - a.NX)],
            kids: ["C", "I", "unemp"], how: L("PKB = C + I + G + NX. Produkcja nadąża za popytem z opóźnieniem ok. 3 tygodni; większy PKB = więcej pracy i dochodów (mnożnik).", "ВВП = C + I + G + NX. Производство догоняет спрос с задержкой ~3 недели; больше ВВП = больше работы и доходов (мультипликатор).") };
        case "C": return { t: L("Konsumpcja", "Потребление"), u: L("mln", "млн"), f: x => X.n0(x) + L(" mln", " млн"), good: 1, from: a.C, to: z.C,
            parts: lnPart(z.C - a.C, [["🙂 " + L("nastroje", "настроения"), a.conf, z.conf], ["👛 " + L("dochód do dyspozycji", "располагаемый доход"), a.inc?.cBase, z.inc?.cBase], ["🏦 " + L("koszt kredytu (stopa)", "стоимость кредита (ставка)"), a.inc?.cRate, z.inc?.cRate], ["🧺 " + L("puste półki", "пустые полки"), a.inc?.cShort, z.inc?.cShort]]),
            kids: ["disp", "rate"], how: L("Ludzie wydają ok. 78% dodatkowego dochodu. Dobre nastroje i tani kredyt zwiększają zakupy.", "Люди тратят ~78% дополнительного дохода. Хорошие настроения и дешёвый кредит увеличивают покупки.") };
        case "disp": return { t: L("Dochód do dyspozycji", "Располагаемый доход"), u: L("mln", "млн"), f: x => X.n0(x) + L(" mln", " млн"), good: 1, from: a.inc?.disp || 0, to: z.inc?.disp || 0,
            parts: [P("💼 " + L("pensje i zyski (70% PKB)", "зарплаты и прибыль (70% ВВП)"), (z.inc?.income || 0) - (a.inc?.income || 0)), P("🧾 " + L(`podatek dochodowy (działa ${X.n1(pa.tax)}% → ${X.n1(pe.tax)}%)`, `подоходный налог (действует ${X.n1(pa.tax)}% → ${X.n1(pe.tax)}%)`), -((z.inc?.tax || 0) - (a.inc?.tax || 0))), P("🤝 " + L("transfery socjalne", "соцтрансферы"), (z.inc?.transfers || 0) - (a.inc?.transfers || 0)), P("🧑‍🔧 " + L("zasiłki dla bezrobotnych", "пособия по безработице"), (z.inc?.benefits || 0) - (a.inc?.benefits || 0))],
            kids: ["gdp", "realInc", "budget"], how: L(`Dochód do dyspozycji = pensje − podatek + transfery + zasiłki. Przy podatku ${X.n1(pe.tax)}% państwo zabiera ${X.n1(pe.tax)} zł z każdych 100 zł — mniej zostaje na zakupy, ale więcej trafia do budżetu.`, `Располагаемый доход = зарплаты − налог + трансферы + пособия. При налоге ${X.n1(pe.tax)}% государство забирает ${X.n1(pe.tax)} zł из каждых 100 zł — меньше остаётся на покупки, но больше идёт в бюджет.`) };
        case "realInc": { const dl = Math.log(((z.inc?.disp || 1) * (z.pIdx || 1)) / ((a.inc?.disp || 1) * (a.pIdx || 1))) * 100, pl = Math.log(z.cpi / a.cpi) * 100;
          return { t: L("Dochód realny (siła nabywcza)", "Реальный доход (покупательная способность)"), u: "%", f: x => Math.round(x * 100) + "%", good: 1, from: a.realInc, to: z.realInc, pct: true,
            parts: [P("👛 " + L("dochód w złotówkach", "доход в злотых"), dl / 100), P("🏷️ " + L("wzrost cen (inflacja)", "рост цен (инфляция)"), -pl / 100)],
            kids: ["disp", "infl"], how: L("Dochód realny = ile możesz kupić. Rośnie, gdy pensje rosną szybciej niż ceny. Podatki obniżają go od razu, inflacja — powoli.", "Реальный доход = сколько можно купить. Растёт, когда зарплаты растут быстрее цен. Налоги снижают его сразу, инфляция — постепенно.") }; }
        case "I": return { t: L("Inwestycje firm", "Инвестиции фирм"), u: L("mln", "млн"), f: x => X.n0(x) + L(" mln", " млн"), good: 1, from: a.I, to: z.I,
            parts: lnPart(z.I - a.I, [["🙂 " + L("nastroje firm", "настроения фирм"), a.iParts?.conf, z.iParts?.conf], ["💳 " + L("dostępność kredytu", "доступность кредита"), a.iParts?.credit, z.iParts?.credit], ["🏦 " + L("stopa realna (koszt kredytu)", "реальная ставка (цена кредита)"), a.iParts?.iRate, z.iParts?.iRate], ["🏗️ " + L("budowy państwa", "госстройки"), a.iParts?.iProj, z.iParts?.iProj], ["📈 " + L("wzrost gospodarki", "рост экономики"), a.iParts?.trend, z.iParts?.trend]]),
            kids: ["rate", "gdp"], how: L("Firmy inwestują, gdy kredyt jest tani i dostępny, a nastroje dobre. Stopa NBP działa z opóźnieniem ok. 1,5 miesiąca.", "Фирмы инвестируют, когда кредит дешёв и доступен, а настроения хорошие. Ставка NBP действует с задержкой ~1,5 месяца.") };
        case "rate": return { t: L("Stopa NBP (działająca)", "Ставка NBP (действующая)"), u: "%", f: x => X.n1(x) + "%", good: 0, from: a.rateEff, to: z.rateEff, factors: true,
            parts: [[L("🎯 Ustawiona stopa", "🎯 Установленная ставка"), X.n1(a.rate) + "%", X.n1(z.rate) + "%", 0, 0], [L("⏳ Już działa", "⏳ Уже действует"), X.n1(a.rateEff) + "%", X.n1(z.rateEff) + "%", 0, 0], [L("📉 Stopa realna (minus oczekiwana inflacja)", "📉 Реальная ставка (минус ожидаемая инфляция)"), X.n1(a.realRate) + "%", X.n1(z.realRate) + "%", 0, 0]],
            kids: ["I", "C", "infl"], how: L("Stopa działa stopniowo (ok. 45 dni). Wyższa: droższy kredyt → mniej inwestycji i zakupów → niższa inflacja, ale wyższe bezrobocie.", "Ставка действует постепенно (~45 дней). Выше: дороже кредит → меньше инвестиций и покупок → ниже инфляция, но выше безработица.") };
        case "unemp": { const yE = v => v.Y * 1e6 / (10000 * v.prodIdx) / v.LF * 100;
          return { t: L("Bezrobocie", "Безработица"), u: "%", f: x => X.pct(x), good: -1, from: a.unemp, to: z.unemp,
            parts: [P("📉 " + L("produkcja (PKB)", "производство (ВВП)"), -((z.Y * 1e6 / (10000 * a.prodIdx) / a.LF * 100) - yE(a))), P("⚙️ " + L("wydajność (mniej ludzi na tę samą produkcję)", "производительность (меньше людей на тот же выпуск)"), -(yE(z) - z.Y * 1e6 / (10000 * a.prodIdx) / a.LF * 100)), P("🏗️ " + L("budowy i inne", "стройки и прочее"), 0)].map((p2, i, arr) => i === 2 ? [p2[0], (z.unemp - a.unemp) - arr[0][1] - arr[1][1]] : p2),
            kids: ["gdp"], how: L("Firmy zatrudniają, gdy rośnie produkcja. Bezrobocie 4–5% to norma (ludzie zmieniają pracę); poniżej 4% firmom trudno znaleźć pracowników i płace rosną szybciej.", "Фирмы нанимают, когда растёт производство. Безработица 4–5% — норма (люди меняют работу); ниже 4% фирмам трудно найти работников, и зарплаты растут быстрее.") }; }
        case "budget": { const R = (h, k) => (h.rev?.[k] || 0), Sp = (h, k) => (h.spend?.[k] || 0);
          return { t: L("Saldo budżetu", "Сальдо бюджета"), u: L("mln", "млн"), f: x => X.sgn(x) + L(" mln", " млн"), good: 1, from: a.budget, to: z.budget,
            parts: [P("💼 " + L("podatek dochodowy", "подоходный налог"), R(z, "tax") - R(a, "tax")), P("🧾 VAT", R(z, "vat") - R(a, "vat")), P("⚓ " + L("cła", "пошлины"), R(z, "tariff") - R(a, "tariff")), P("🌾 " + L("rezerwa (sprzedaż − zakupy)", "резерв (продажи − закупки)"), (R(z, "reserve") - Sp(z, "reserve")) - (R(a, "reserve") - Sp(a, "reserve"))), P("🏥 " + L("usługi publiczne", "госуслуги"), -(Sp(z, "services") - Sp(a, "services"))), P("🤝 " + L("transfery i zasiłki", "трансферы и пособия"), -(Sp(z, "transfers") - Sp(a, "transfers"))), P("🚜 " + L("dopłaty rolne", "агродотации"), -(Sp(z, "farm") - Sp(a, "farm"))), P("🏗️ " + L("inwestycje", "инвестиции"), -(Sp(z, "projects") - Sp(a, "projects"))), P("💸 " + L("odsetki od długu", "проценты по долгу"), -(Sp(z, "interest") - Sp(a, "interest")))],
            kids: ["disp", "gdp"], how: L("Zmiany podatków i wydatków wchodzą stopniowo (20–45 dni): urzędy wdrażają, ludzie reagują. Gdy PKB rośnie, wpływy rosną same.", "Изменения налогов и расходов вступают постепенно (20–45 дней): ведомства внедряют, люди реагируют. Когда ВВП растёт, доходы растут сами.") }; }
        case "approval": { const A = (h, k) => h.ap?.[k] || 0;
          return { t: L("Poparcie (cel, do którego zmierza)", "Поддержка (к чему стремится)"), u: L("pkt", "п."), f: x => Math.round(x) + "%", good: 1, from: a.approval, to: z.approval,
            parts: [P("👛 " + L("dochody realne", "реальные доходы"), A(z, "income") - A(a, "income")), P("👷 " + L("bezrobocie", "безработица"), A(z, "jobs") - A(a, "jobs")), P("📊 " + L("inflacja daleko od 2,5%", "инфляция далеко от 2,5%"), A(z, "infl") - A(a, "infl")), P("🧺 " + L("kolejki po chleb", "очереди за хлебом"), A(z, "queues") - A(a, "queues")), P("💼 " + L("podatki", "налоги"), A(z, "tax") - A(a, "tax")), P("🏥 " + L("usługi i transfery", "услуги и трансферы"), A(z, "services") - A(a, "services"))],
            kids: ["realInc", "unemp", "infl"], how: L("Poparcie podąża za warunkami życia z opóźnieniem ok. miesiąca. Czasem dobra decyzja jest niepopularna (np. wyższy podatek, by spłacać dług).", "Поддержка следует за условиями жизни с задержкой ~месяц. Иногда правильное решение непопулярно (например, выше налог, чтобы гасить долг).") }; }
      }
      return null;
    }
    const KEYMAP = { jobs: "unemp", gdp: "gdp", infl: "infl", budget: "budget", bread: "bread", approval: "approval", grain: "grain" };
    function partGood(E, v){ if (Math.abs(v) < 1e-6) return 0; if (E.good === 0) return inflGood(E.from, E.from + v) || (v > 0 ? -1 : 1) * Math.sign(E.from - 2.5 || 1); return (v > 0) === (E.good > 0) ? 1 : -1; }
    function explainHtml(key, a, z, compact){
      const E = explain(key, a, z); if (!E) return "";
      const d = E.to - E.from, fd = E.pct ? X.n1(d * 100) + L(" pp", " пп") : E.u === "%" ? X.n1(d) + L(" pp", " пп") : E.f(Math.abs(d)).replace(/^[+−±]/, "");
      const dir = Math.abs(d) < 1e-6 ? "→" : d > 0 ? "↑" : "↓", g = key === "infl" ? inflGood(E.from, E.to) : Math.abs(d) < 1e-6 ? 0 : (d > 0) === (E.good > 0) ? 1 : -1;
      let body;
      if (E.factors){
        body = `<table class="nv-tbl"><tr><th>${L("czynnik", "фактор")}</th><th>${L("było", "было")}</th><th>${L("jest", "стало")}</th></tr>${E.parts.map(([n, f0, f1, dv, gd]) => `<tr><td>${n}</td><td>${f0}</td><td class="${!gd || Math.abs(dv) < 1e-6 ? "" : (dv > 0) === (gd > 0) ? "g" : "b"}">${f1}</td></tr>`).join("")}</table>`;
      } else {
        const mx = Math.max(...E.parts.map(p => Math.abs(p[1])), 1e-9), fmtP = v => E.pct ? X.sgn(v * 100) + L(" pp", " пп") : E.u === "%" ? X.sgn(v) + L(" pp", " пп") : E.u === "zł" ? (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(2).replace(".", ",") + " zł" : X.sgn(v) + " " + E.u;
        const tx = PTXT[key] || [], tiny = mx * 0.04;
        const sorted = E.parts.map((p2, i) => [...p2, tx[i]]).sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]));
        body = `<div class="nv-dec">${sorted.map(([n, v, t]) => { const gg = partGood(E, v), sent = t && Math.abs(v) > tiny ? (v > 0 ? t[0] : t[1]) : ""; return `<div class="nv-part"><div class="nv-sbar dec"><span>${n}</span><i class="${gg > 0 ? "g" : gg < 0 ? "b" : ""}" style="width:${Math.abs(v) / mx * 100}%"></i><b>${fmtP(v)}</b></div>${sent ? `<p class="${gg > 0 ? "g" : gg < 0 ? "b" : ""}">${v > 0 ? "▲" : "▼"} ${sent}</p>` : ""}</div>`; }).join("")}</div>`;
        const top = sorted[0];
        if (top && Math.abs(top[1]) > 1e-6 && !compact) body += `<p class="nv-cause"><b>${X.mainCause}:</b> ${top[0].replace(/^\S+\s/, "")} (${fmtP(top[1])})</p>`;
      }
      const unitNote = E.factors ? "" : `<p class="nv-muted">${E.u === "%" || E.pct ? L("Liczby przy przyczynach to punkty procentowe (pp): o ile każda przyczyna podniosła (+) lub obniżyła (−) wskaźnik. Razem dają całą zmianę.", "Числа у причин — процентные пункты (пп): насколько каждая причина подняла (+) или снизила (−) показатель. Вместе дают всё изменение.") : L("Liczby przy przyczynach: o ile każda z nich podniosła (+) lub obniżyła (−) wskaźnik. Razem dają całą zmianę.", "Числа у причин: насколько каждая подняла (+) или снизила (−) показатель. Вместе дают всё изменение.")}</p>`;
      return `<div class="nv-exp"><div class="nv-exph"><b>${E.t}</b><span>${E.f(E.from)} → <b>${E.f(E.to)}</b> <i class="${g > 0 ? "g" : g < 0 ? "b" : "n"}">${dir} ${fd}</i></span></div>${unitNote}${body}
        ${compact ? "" : `<p class="nv-muted">ℹ️ ${E.how}</p><div class="nv-chips">${E.kids.map(k2 => `<button data-drill="${k2}">${L("Głębiej", "Глубже")}: ${explain(k2, a, z)?.t || k2} →</button>`).join("")}</div>`}</div>`;
    }
    let whyStack = [];
    function whyHtml(){
      const k = whyStack[whyStack.length - 1], z = H(), a = ago(30);
      const crumbs = whyStack.map((kk, i) => `<button data-crumb="${i}" class="${i === whyStack.length - 1 ? "on" : ""}">${explain(kk, a, z)?.t || kk}</button>`).join("<em>›</em>");
      return `<div class="nv-whyh"><small>${X.why} · ${L("ostatnie 30 dni", "последние 30 дней")}</small><div class="nv-crumbs">${crumbs}</div></div>${explainHtml(k, a, z)}`;
    }
    function openWhy(k){ why = true; whyStack = [KEYMAP[k] || k]; modal(whyHtml(), "why"); track?.("game", "why", k); }

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
          <p class="nv-muted">⏳ ${L("Zmiany podatków i wydatków wchodzą stopniowo (20–45 dni) — budżet nie zmienia się w dniu decyzji.", "Изменения налогов и расходов вступают постепенно (20–45 дней) — бюджет не меняется в день решения.")}</p>
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
    // Co się stanie przy podniesieniu / obniżeniu — konkretnie, z kosztami
    const POLTXT = {
      reserve: [L("Więcej uwalniasz: od razu więcej zboża w magazynach → piekarnie mogą piec więcej, zboże i chleb tanieją, kolejki maleją. Koszt: rezerwa topnieje — w następnej suszy będzie jej brakować. Państwo zarabia na sprzedaży.", "Больше выпускаешь: сразу больше зерна на складах → пекарни пекут больше, зерно и хлеб дешевеют, очереди уменьшаются. Цена: резерв тает — в следующую засуху его не хватит. Государство зарабатывает на продаже."),
                L("Więcej kupujesz do rezerwy: zabierasz zboże z rynku → zboże i chleb drożeją teraz, ale rośnie bufor na przyszłe kryzysy. Koszt: wydatek budżetu. Najlepiej kupować po żniwach, gdy zboża jest dużo.", "Больше закупаешь в резерв: забираешь зерно с рынка → зерно и хлеб дорожают сейчас, но растёт запас на будущие кризисы. Цена: расход бюджета. Лучше закупать после жатвы, когда зерна много.")],
      cap: [L("Wyższa (lub brak) cena maksymalna: cena może dojść do równowagi → kolejki znikają, bo drożej = mniej chętnych, a piekarnie dostają więcej za bochenek.", "Выше потолок (или без него): цена может дойти до равновесия → очереди исчезают, т.к. дороже = меньше желающих."),
            L("Niższa cena maksymalna: chleb tańszy dla tych, którzy go kupią — ale chętnych jest więcej, a chleba tyle samo → kolejki, puste półki, spada poparcie. Nie dodaje ani bochenka.", "Ниже потолок: хлеб дешевле для тех, кто успеет купить — но желающих больше, а хлеба столько же → очереди, пустые полки, падает поддержка. Не добавляет ни буханки.")],
      farmSub: [L("Wyższe dopłaty: rolnicy zarabiają więcej i lepiej dbają o pola → nieco wyższe przyszłe zbiory (efekt po ok. miesiącu). Koszt: co miesiąc z budżetu.", "Выше дотации: фермеры зарабатывают больше и лучше ухаживают за полями → чуть выше будущий урожай (через ~месяц). Цена: ежемесячно из бюджета."),
                L("Niższe dopłaty: oszczędzasz w budżecie, ale rolnicy mniej inwestują w pola → nieco niższe zbiory.", "Ниже дотации: экономишь бюджет, но фермеры меньше вкладывают в поля → чуть ниже урожай.")],
      tax: [L("Wyższy podatek dochodowy: państwo bierze większą część każdej pensji → ludziom zostaje mniej (dochód do dyspozycji ↓) → mniej kupują (konsumpcja ↓, PKB ↓, więcej bezrobocia) i spada poparcie. Zysk: więcej wpływów, deficyt i dług maleją. Wchodzi w ~30 dni.", "Выше подоходный налог: государство забирает большую часть зарплаты → у людей меньше денег (располагаемый доход ↓) → меньше покупок (потребление ↓, ВВП ↓, больше безработица), падает поддержка. Плюс: больше доходов, дефицит и долг уменьшаются. Вступает за ~30 дней."),
            L("Niższy podatek: ludziom zostaje więcej → więcej kupują (konsumpcja ↑, PKB ↑, praca ↑) i rośnie poparcie. Koszt: mniej wpływów, rośnie deficyt i dług. Przy pełnym zatrudnieniu może podbić inflację.", "Ниже налог: у людей больше денег → больше покупок (потребление ↑, ВВП ↑, работа ↑), растёт поддержка. Цена: меньше доходов, растут дефицит и долг. При полной занятости может разогнать инфляцию.")],
      spend: [L("Wyższe wydatki publiczne: państwo zamawia więcej usług i pracy → PKB ↑, zatrudnienie ↑, lepsze usługi (poparcie ↑). Koszt: deficyt i dług ↑; przy przegrzanej gospodarce — inflacja ↑. Wchodzi w ~45 dni.", "Выше госрасходы: государство заказывает больше услуг и работы → ВВП ↑, занятость ↑, лучше услуги (поддержка ↑). Цена: дефицит и долг ↑; при перегреве — инфляция ↑. Вступает за ~45 дней."),
              L("Niższe wydatki: budżet się poprawia, dług rośnie wolniej. Koszt: mniej zamówień → PKB ↓, bezrobocie ↑, gorsze usługi (poparcie ↓).", "Ниже расходы: бюджет улучшается, долг растёт медленнее. Цена: меньше заказов → ВВП ↓, безработица ↑, хуже услуги (поддержка ↓).")],
      transfers: [L("Wyższe transfery socjalne: najbiedniejsi mają więcej pieniędzy → wydają prawie wszystko (konsumpcja ↑), mniej odczuwają drożyznę. Koszt: wydatek budżetu, dług ↑.", "Выше соцтрансферы: у беднейших больше денег → тратят почти всё (потребление ↑), меньше страдают от дороговизны. Цена: расход бюджета, долг ↑."),
                  L("Niższe transfery: oszczędność w budżecie, ale najbiedniejsi tracą najbardziej — spada konsumpcja i poparcie.", "Ниже трансферы: экономия бюджета, но беднейшие теряют больше всех — падают потребление и поддержка.")],
      rate: [L("Wyższa stopa NBP: kredyt drożeje → firmy mniej inwestują, ludzie mniej kupują na raty → popyt ↓ → po kilku miesiącach inflacja ↓. Koszt: PKB ↓, bezrobocie ↑, droższa obsługa długu. Działa z opóźnieniem ok. 45 dni.", "Выше ставка NBP: кредит дорожает → фирмы меньше инвестируют, люди меньше покупают в кредит → спрос ↓ → через несколько месяцев инфляция ↓. Цена: ВВП ↓, безработица ↑, дороже обслуживание долга. Задержка ~45 дней."),
             L("Niższa stopa: tańszy kredyt → inwestycje i zakupy ↑ → PKB ↑, praca ↑. Koszt: jeśli gospodarka jest już pełna, rośnie inflacja. Działa z opóźnieniem.", "Ниже ставка: дешевле кредит → инвестиции и покупки ↑ → ВВП ↑, работа ↑. Цена: если экономика уже загружена, растёт инфляция. Действует с задержкой.")],
      tariff: [L("Wyższe cło: zboże z importu droższe → import ↓, krajowi rolnicy zarabiają więcej, budżet dostaje cła. Koszt: gdy w kraju brakuje zboża, chleb drożeje bardziej, bo import trudniej ratuje sytuację.", "Выше пошлина: импортное зерно дороже → импорт ↓, местные фермеры зарабатывают больше, бюджет получает пошлины. Цена: при нехватке зерна хлеб дорожает сильнее — импорт хуже спасает."),
               L("Niższe cło: import tańszy i łatwiejszy → przy niedoborze zboże szybciej napływa z zagranicy, chleb tańszy. Koszt: mniej ceł, rolnicy konkurują z importem.", "Ниже пошлина: импорт дешевле и проще → при нехватке зерно быстрее приходит из-за рубежа, хлеб дешевле. Цена: меньше пошлин, фермеры конкурируют с импортом.")],
    };
    function policyHtml(){
      return `<h2>${X.tabs.policy}</h2><p class="nv-muted">${L("Zmieniasz warunki — ludzie i firmy reagują z opóźnieniem. Po przesunięciu suwaka zobaczysz skutki za 3 i 6 miesięcy.", "Ты меняешь условия — люди и фирмы реагируют с задержкой. После движения ползунка увидишь последствия через 3 и 6 месяцев.")}</p>
        ${POL().map(p => { const lock = !S.unlocked(s, p.k); return `<div class="nv-pol ${lock ? "locked" : ""}"><label for="pp-${p.k}"><span>${p.ic} ${p.n}</span><b id="pv-${p.k}">${p.f(s.p[p.k])}</b></label>
          ${!lock && LAGTXT[p.k] && Math.abs((p.k === "rate" ? s.m.rateEff : s.pe[p.k]) - s.p[p.k]) > 0.05 ? `<small class="nv-lag">⏳ ${L("teraz działa", "сейчас действует")} ${p.f(Math.round((p.k === "rate" ? s.m.rateEff : s.pe[p.k]) * 10) / 10)} · ${L("pełny efekt po ok.", "полный эффект через ~")} ${LAGTXT[p.k]} ${L("dniach", "дн.")}</small>` : ""}
          ${lock ? `<small class="nv-muted">🔒 ${L(`Dostępne od miesiąca ${S.UNLOCK[p.k] + 1}`, `Доступно с месяца ${S.UNLOCK[p.k] + 1}`)}</small>` : `<input type="range" id="pp-${p.k}" data-pol="${p.k}" min="${p.min}" max="${p.max}" step="${p.step}" value="${s.p[p.k]}"><div class="nv-pc">${p.chain.join(" <em>→</em> ")}</div><details class="nv-pt"><summary>${L("Co się stanie, gdy podniosę / obniżę?", "Что будет, если подниму / снижу?")}</summary><p>▲ ${POLTXT[p.k][0]}</p><p>▼ ${POLTXT[p.k][1]}</p></details><div class="nv-prev" id="pr-${p.k}"></div>`}</div>`; }).join("")}`;
    }
    function previewPolicy(k){
      const pr = $("#pr-" + k); if (!pr) return;
      const prev = prevVals[k] ?? s.p[k];
      if (prev === s.p[k]){ pr.innerHTML = ""; return; }
      const b0 = S.project(s, 180, { [k]: prev }), alt = S.project(s, 180, { [k]: s.p[k] });
      const rows = [["📈 " + L("PKB", "ВВП"), "Y", 1, 0], ["📊 " + L("Inflacja", "Инфляция"), "infl", -1, 1], ["👷 " + L("Bezrobocie", "Безработица"), "unemp", -1, 1], ["🍞 " + L("Chleb", "Хлеб"), "bread", -1, 0], ["🧾 " + L("Saldo, mln", "Сальдо, млн"), "budget", 1, 2], ["👛 " + L("Dochód realny", "Реальный доход"), "realInc", 1, 0], ["🗳️ " + L("Poparcie", "Поддержка"), "approval", 1, 2]];
      const cell = (a, b2, good, abs) => { if (a == null || b2 == null) return "<td></td>"; const d = abs ? b2 - a : (b2 / a - 1) * 100; const cls = Math.abs(d) < 0.05 ? "" : (d > 0) === (good > 0) ? "g" : "b"; return `<td class="${cls}">${Math.abs(d) < 0.05 ? "≈" : (d > 0 ? "+" : "−") + X.n1(Math.abs(d)) + (abs === 1 ? L(" pp", " пп") : abs === 2 ? "" : "%")}</td>`; };
      pr.innerHTML = `<p class="nv-dtxt">${s.p[k] > prev ? "▲ " + POLTXT[k][0] : "▼ " + POLTXT[k][1]}</p><table class="nv-tbl"><tr><th>${L("różnica vs. bez zmiany", "разница vs. без изменения")}</th><th>3 ${L("mies.", "мес.")}</th><th>6 ${L("mies.", "мес.")}</th></tr>${rows.map(([n, f, good, abs]) => `<tr><td>${n}</td>${[2, 5].map(c => cell(b0[c]?.[f], alt[c]?.[f], good, abs)).join("")}</tr>`).join("")}</table>`;
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
    function modal(html, kind, btn){
      $("#nvmodal").innerHTML = html ? `<div class="nv-modal ${kind === "report" || kind === "crisis" || kind === "end" ? "full" : ""}" data-kind="${kind || ""}"><div class="nv-mcard">${html}<button class="nv-btn" data-mclose>${btn || (kind === "intro" ? L("Zaczynam ▶", "Начинаю ▶") : L("Zamknij", "Закрыть"))}</button></div></div>` : "";
    }
    function unlockConcept(k){
      if (s.concepts[k] != null) return;
      s.concepts[k] = s.day; (s.newConcepts = s.newConcepts || []).push(k);
      host.querySelector('[data-tab="learn"]')?.classList.add("dot");
      track?.("game", "concept", k);
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

    // ---------- pełnoekranowe raporty: co zrobiłeś → co się stało → dlaczego
    const LAGTXT = { tax: 30, spend: 45, transfers: 20, farmSub: 30, tariff: 20, rate: 45, reserve: 0, cap: 0 };
    const AFFECTS = { tax: ["disp", "realInc", "budget", "approval"], spend: ["gdp", "unemp", "budget"], transfers: ["realInc", "budget", "approval"], rate: ["I", "infl", "unemp"], tariff: ["grain", "budget"], reserve: ["short", "bread", "grain"], cap: ["short", "bread"], farmSub: ["harvest", "budget"], build: ["budget", "unemp", "gdp"] };
    const VAL = { disp: h => h.inc?.disp, realInc: h => h.realInc, budget: h => h.budget, approval: h => h.approval, gdp: h => h.Y, unemp: h => h.unemp, I: h => h.I, infl: h => h.infl, grain: h => h.grain, short: h => h.short, bread: h => h.bread, harvest: h => h.harvestF };
    function decisionHtml(d, now){
      const names = Object.fromEntries(POL().map(p => [p.k, p]));
      const lag = LAGTXT[d.k] ?? 0, age = s.day - d.day, pe = s.pe?.[d.k];
      const what = d.k === "build" ? `🏗️ ${L("Budowa", "Стройка")}: <b>${PN[d.v]}</b>` : `${names[d.k].ic} ${names[d.k].n}: <b>${names[d.k].f(d.from)} → ${names[d.k].f(d.v)}</b>`;
      const status = d.k === "build" ? L("pieniądze płyną co miesiąc, efekt po ukończeniu", "деньги уходят ежемесячно, эффект после завершения") : !lag ? L("działa od razu", "действует сразу") : age >= lag * 2.5 ? L("działa w pełni", "действует полностью") : L(`wchodzi stopniowo (ok. ${lag} dni) — teraz działa ${d.k === "rate" ? X.n1(s.m.rateEff) + "%" : names[d.k].f(Math.round(pe * 10) / 10)}`, `вступает постепенно (~${lag} дн.) — сейчас действует ${d.k === "rate" ? X.n1(s.m.rateEff) + "%" : names[d.k].f(Math.round(pe * 10) / 10)}`);
      const fx = d.before ? (AFFECTS[d.k] || []).map(k => { const f = VAL[k]; const b0 = f({ ...d.before, inc: d.before.disp != null ? { disp: d.before.disp } : null }), b1 = f(now); if (b0 == null || b1 == null) return ""; const E = explain(k, now, now); const dd = b1 - b0; return `<span class="nv-fx">${E.t}: ${E.f(b0)} → <b>${E.f(b1)}</b></span>`; }).join("") : "";
      const why2 = d.k !== "build" && POLTXT[d.k] ? `<p class="nv-dtxt">${d.v > d.from ? "▲ " + POLTXT[d.k][0] : "▼ " + POLTXT[d.k][1]}</p>` : "";
      return `<li>${what}${why2}<small class="nv-muted">⏳ ${status}</small>${fx ? `<div class="nv-fxs"><small>${L("Od decyzji", "С момента решения")} (${age} ${L("dni", "дн.")}):</small>${fx}</div>` : ""}</li>`;
    }
    let reportMode = (() => { try { return localStorage.getItem("makro2.novaria.rep") || "month"; } catch { return "month"; } })(), resume = 0;
    function pauseFor(){ resume = timer ? speed : resume; clearInterval(timer); timer = null; hud(); visual(); }
    function monthReport(force){
      const r = s.lastReport; if (!r) return;
      const quiet = !r.decisions.length && !r.events.length && !(s.newConcepts || []).length;
      if (!force && (reportMode === "events" && quiet || reportMode === "quarter" && (r.month + 1) % 3 !== 0 && quiet)) return;
      pauseFor();
      const keys = ["bread", "infl", "unemp", "gdp", "budget", "approval"];
      const rel = k => { const E = explain(k, r.a, r.z); return Math.abs(E.to - E.from) / (Math.abs(E.from) + (k === "infl" || k === "unemp" ? 2 : 1e-9)); };
      const order = keys.slice().sort((x, y) => rel(y) - rel(x));
      const tile = k => { const E = explain(k, r.a, r.z); const g = k === "infl" ? inflGood(E.from, E.to) : Math.abs(E.to - E.from) < 1e-6 ? 0 : (E.to > E.from) === (E.good > 0) ? 1 : -1; return `<div class="${g > 0 ? "up" : g < 0 ? "down" : ""}"><small>${E.t.replace(/ \(.*/, "")}</small><b>${E.f(E.to)}</b><i>${L("było", "было")} ${E.f(E.from)}</i></div>`; };
      const nc = (s.newConcepts || []).map(k => `<div class="nv-box"><b>💡 ${CON[k].t}</b><div class="nv-chain">${CON[k].chain.join(" → ")}</div><p>${CON[k].d}</p></div>`).join("");
      s.newConcepts = [];
      const evs = r.events.map(e => `<li>${X.ev[e.k].icon} <b>${X.ev[e.k].name}</b> — ${phaseName(e.k, e.ph)}</li>`).join("");
      const risks = Object.entries(s.risks).filter(([, p]) => p >= 0.2).sort((a, b) => b[1] - a[1]).map(([k, p]) => `<span class="nv-fx">${X.ev[k].icon} ${X.ev[k].name}: <b>${Math.round(p * 100)}%</b></span>`).join("");
      modal(`<div class="nv-whyh"><small>📅 ${L("Raport miesiąca", "Отчёт месяца")}</small><h2>${X.months[r.month][0].toUpperCase() + X.months[r.month].slice(1)}, ${X.year} ${r.year + 1}</h2></div>
        <div class="nv-tiles rep">${keys.map(tile).join("")}</div>
        <h3>🎛️ ${L("Twoje decyzje", "Твои решения")}</h3>
        ${r.decisions.length ? `<ul class="nv-dlist">${r.decisions.map(d => decisionHtml(d, r.z)).join("")}</ul>` : `<p class="nv-muted">${L("W tym miesiącu nic nie zmieniałeś — gospodarka zmieniała się sama.", "В этом месяце ты ничего не менял — экономика менялась сама.")}</p>`}
        ${evs ? `<h3>🌍 ${L("Wydarzenia", "События")}</h3><ul>${evs}</ul>` : ""}
        <h3>🔍 ${L("Co się zmieniło i dlaczego", "Что изменилось и почему")}</h3>
        ${order.map((k, i) => `<details class="nv-more" ${i < 2 ? "open" : ""}><summary>${explain(k, r.a, r.z).t}</summary>${explainHtml(k, r.a, r.z, true)}</details>`).join("")}
        ${nc ? `<h3>📚 ${L("Nowe pojęcia — zobaczyłeś je w swojej gospodarce", "Новые понятия — ты увидел их в своей экономике")}</h3>${nc}` : ""}
        ${risks ? `<h3>⚠️ ${L("Ryzyka na 3 miesiące", "Риски на 3 месяца")}</h3><div>${risks}</div>` : ""}
        <label class="nv-rmode">${L("Pokazuj raport", "Показывать отчёт")}: <select id="nvrmode"><option value="month">${L("co miesiąc", "каждый месяц")}</option><option value="quarter">${L("co kwartał lub gdy coś się stało", "раз в квартал или если что-то случилось")}</option><option value="events">${L("tylko gdy coś się stało", "только если что-то случилось")}</option></select></label>`, "report", L("Kontynuuj ▶", "Продолжить ▶"));
      const sel2 = $("#nvrmode"); if (sel2){ sel2.value = reportMode; sel2.onchange = () => { reportMode = sel2.value; try { localStorage.setItem("makro2.novaria.rep", reportMode); } catch {} }; }
      host.querySelector('[data-tab="learn"]')?.classList.remove("dot");
    }
    const phaseName = (k, ph) => k === "boom" ? ({ warning: L("ożywienie", "оживление"), stress: L("boom", "бум"), crisis: L("szczyt — ryzyko przegrzania", "пик — риск перегрева"), recovery: L("wygasa", "затухает") })[ph] : X.phase[ph];
    const EVINFO = {
      drought: { chain: ["🌧️ " + L("opady ↓", "осадки ↓"), "🌱 " + L("uprawy ↓", "посевы ↓"), "🌾 " + L("prognoza zbiorów ↓", "прогноз урожая ↓"), "💰 " + L("zboże ↑ (gdy zapasy małe)", "зерно ↑ (если запасы малы)"), "🍞 " + L("chleb ↑", "хлеб ↑"), "👛 " + L("dochód realny ↓", "реальный доход ↓")], opts: [["⚡", L("Rezerwa zboża — działa od razu, ale zmniejsza bufor na przyszłość.", "Резерв зерна — сразу, но уменьшает буфер на будущее.")], ["⏳", L("Niższe cło — import w 1–2 mies.; mniej wpływów, rolnicy tracą.", "Ниже пошлина — импорт за 1–2 мес.; меньше доходов, фермеры теряют.")], ["🏗️", L("Nawadnianie — nie pomoże teraz, ale osłabi kolejne susze.", "Орошение — сейчас не поможет, но ослабит следующие засухи.")], ["🤔", L("Nic — jeśli silosy są pełne, cena może się nie ruszyć.", "Ничего — если силосы полны, цена может не сдвинуться.")]] },
      energy: { chain: ["🛢️ " + L("energia na świecie ↑", "мировая энергия ↑"), "🏭 " + L("koszty firm ↑", "издержки фирм ↑"), "💰 " + L("ceny ↑", "цены ↑"), "📊 " + L("inflacja ↑", "инфляция ↑"), "👛 " + L("dochód realny ↓", "реальный доход ↓")], opts: [["🏦", L("Wyższa stopa — powstrzyma spiralę cen, ale nie obniży kosztów i zwiększy bezrobocie.", "Выше ставка — остановит спираль цен, но не снизит издержки и увеличит безработицу.")], ["🤝", L("Transfery dla biednych — chronią najsłabszych, kosztem budżetu.", "Трансферы бедным — защищают слабых ценой бюджета.")], ["🏗️", L("Elektrownia — długoterminowa ochrona przed kolejnymi szokami.", "Электростанция — долгосрочная защита от следующих шоков.")], ["🤔", L("Przeczekać — szok energetyczny zwykle mija po kilku miesiącach.", "Переждать — энергошок обычно проходит за несколько месяцев.")]] },
      boom: { chain: ["🙂 " + L("nastroje ↑", "настроения ↑"), "🛍️ " + L("zakupy wszystkiego ↑", "покупки всего ↑"), "📈 PKB ↑", "👷 " + L("praca ↑", "работа ↑"), "📊 " + L("inflacja ↑ — jeśli popyt przerośnie możliwości", "инфляция ↑ — если спрос превысит возможности")], opts: [["😊", L("Korzystać — rosną dochody i wpływy do budżetu.", "Пользоваться — растут доходы и поступления в бюджет.")], ["🏦", L("Wyższa stopa, gdy inflacja ucieka powyżej 3,5% — schłodzi popyt.", "Выше ставка, если инфляция уходит выше 3,5% — охладит спрос.")], ["💰", L("Odłożyć nadwyżki budżetu na gorsze czasy.", "Отложить излишки бюджета на трудные времена.")]], note: L("Boom dotyczy całej gospodarki (sklepy, usługi, fabryki), nie tylko chleba — piekarnia może mieć wolne moce.", "Бум касается всей экономики (магазины, услуги, фабрики), а не только хлеба — у пекарни могут быть свободные мощности.") },
      recession: { chain: ["🌍 " + L("zamówienia z zagranicy ↓", "заказы из-за рубежа ↓"), "📤 " + L("eksport ↓", "экспорт ↓"), "🏭 " + L("produkcja ↓", "производство ↓"), "👷 " + L("bezrobocie ↑", "безработица ↑"), "🛍️ " + L("zakupy ↓", "покупки ↓")], opts: [["🏛️", L("Wyższe wydatki — szybko wspierają popyt, rośnie dług.", "Выше расходы — быстро поддерживают спрос, растёт долг.")], ["💼", L("Niższe podatki — więcej pieniędzy w portfelach, mniej w budżecie.", "Ниже налоги — больше денег у людей, меньше в бюджете.")], ["🏦", L("Niższa stopa — tańszy kredyt, efekt po 1–2 mies.", "Ниже ставка — дешевле кредит, эффект через 1–2 мес.")], ["🤔", L("Czekać — recesja sama mija, ale ludzie tracą pracę.", "Ждать — рецессия проходит сама, но люди теряют работу.")]] },
      credit: { chain: ["🏦 " + L("ryzyko w bankach ↑", "риск в банках ↑"), "💳 " + L("kredyt ↓", "кредит ↓"), "🏗️ " + L("inwestycje ↓", "инвестиции ↓"), "📈 PKB ↓"], opts: [["🏦", L("Niższa stopa — łagodzi, ale nie usuwa braku kredytu. Wysoka stopa pogłębia kryzys.", "Ниже ставка — смягчает, но не устраняет нехватку кредита. Высокая ставка углубляет кризис.")], ["🏗️", L("Inwestycje publiczne — zastępują część inwestycji firm.", "Госинвестиции — заменяют часть инвестиций фирм.")]] },
      trade: { chain: ["🚫 " + L("porty ↓", "порты ↓"), "🚢 " + L("import i eksport ↓", "импорт и экспорт ↓"), "🌾 " + L("zboże z zagranicy niedostępne", "зерно из-за рубежа недоступно"), "📤 " + L("eksport ↓", "экспорт ↓")], opts: [["🌾", L("Rezerwa zastąpi import zboża.", "Резерв заменит импорт зерна.")], ["🏗️", L("Rozbudowa portu zwiększa odporność na zakłócenia.", "Расширение порта повышает устойчивость к сбоям.")]] },
    };
    function crisisModal(n){
      const [ic, title, who, quote] = newsText(n, lang), P = NPC[who];
      const k = n.k, E = k && EVINFO[k], ev = s.events.find(e => e.k === k), ph = ev ? S.phaseOf(ev) : null;
      const ladder = k ? `<div class="nv-ladder">${(S.EVENTS[k].phases.map(x => x[1])).map(p => `<span class="${p === ph ? "on" : ""}">${phaseName(k, p)}</span>`).join("<em>→</em>")}</div>` : "";
      pauseFor();
      modal(`<div class="nv-whyh"><small>${k ? X.ev[k].icon + " " + X.ev[k].name : "🚨 " + L("Ostrzeżenie", "Предупреждение")}</small><h2>${ic} ${esc(title)}</h2></div>
        ${quote ? `<p class="nv-quote"><i>${P.icon}</i> „${esc(quote)}” <small>— ${lang === "ru" ? P.ru : P.pl}</small></p>` : ""}${ladder}
        ${E ? `<h3>🔗 ${L("Jak to się rozchodzi po gospodarce", "Как это расходится по экономике")}</h3><div class="nv-chain">${E.chain.join(" → ")}</div>${E.note ? `<p class="nv-muted">ℹ️ ${E.note}</p>` : ""}
        <h3>🧭 ${L("Możliwe reakcje i ich koszty", "Возможные реакции и их цена")}</h3><ul class="nv-steps">${E.opts.map(([i2, t]) => `<li>${i2} ${t}</li>`).join("")}</ul>` : `<p>${L("Jeśli ten stan potrwa ok. 3 miesiące, rząd upadnie. Sprawdź „Dlaczego?” przy wskaźnikach.", "Если это продлится ~3 месяца, правительство падёт. Проверь «Почему?» у показателей.")}</p>`}
        <p class="nv-muted">${L("Gra czeka. Decyzja należy do Ciebie — nie ma jednej właściwej odpowiedzi.", "Игра ждёт. Решение за тобой — единственно верного ответа нет.")}</p>`, "crisis", L("Wracam do gry ▶", "Вернуться в игру ▶"));
      sound.ping();
    }

    // ---------- czas
    const MS = { 1: 1100, 4: 280, 16: 70 };
    function setSpeed(v){
      clearInterval(timer); timer = null;
      if (v > 0 && !s.over){ speed = v; timer = setInterval(stepDay, MS[v]); resume = 0; }
      hud(); visual();
    }
    function stepDay(){
      if (s.over){ setSpeed(0); finish(); return; }
      const nNews = s.news.length;
      S.tick(s);
      learnHooks();
      const fresh = s.news.slice(nNews);
      hud(); feed(); visual();
      if (s.day % 3 === 0){ labels(); refreshPanel(); if (sel) $("#nvcard").innerHTML = objCard(sel); }
      if (why && s.day % 2 === 0){ const c = $("#nvmodal .nv-mcard"); if (c && $(".nv-modal")?.dataset.kind === "why"){ const o = [...c.querySelectorAll("details")].map(d => d.open); c.innerHTML = whyHtml() + `<button class="nv-btn" data-mclose>${L("Zamknij", "Закрыть")}</button>`; } }
      if (s.over){ finish(); return; }
      const big = fresh.find(n => /:(start|crisis)$|^warn:/.test(n.id) && !(n.k === "boom" && /:start$/.test(n.id)));
      if (big && !$(".nv-modal")) { crisisModal(big); return; }
      if (s.day % 30 === 0){ save(); if (!$(".nv-modal")) monthReport(); }
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
      const sc = S.score(s), a = sc.start, z = sc.end, M = s.monthly, n = Math.max(1, M.length);
      const stars = s.lost ? 0 : sc.total >= 75 ? 3 : sc.total >= 60 ? 2 : sc.total >= 45 ? 1 : 0;
      try { const prev = JSON.parse(localStorage.getItem(LS) || "null"); if (prev == null || stars > prev) localStorage.setItem(LS, JSON.stringify(stars)); } catch {}
      track?.("game", "term-end", Math.round(sc.total));
      const when = r => `${X.months[r.month]}, ${X.year} ${r.year + 1}`;
      const cnt = f => M.filter(f).length;
      const maxBy = f => M.reduce((x, r) => f(r) > f(x) ? r : x, M[0]), minBy = f => M.reduce((x, r) => f(r) < f(x) ? r : x, M[0]);
      const stats = M.length ? [
        ["📊", L("Inflacja w przedziale 1,5–3,5%", "Инфляция в коридоре 1,5–3,5%"), `${cnt(r => r.infl >= 1.5 && r.infl <= 3.5)} / ${n} ${L("mies.", "мес.")}`],
        ["👷", L("Bezrobocie ≤ 6%", "Безработица ≤ 6%"), `${cnt(r => r.unemp <= 6)} / ${n} ${L("mies.", "мес.")}`],
        ["🧺", L("Miesiące z kolejkami po chleb (>2%)", "Месяцы с очередями за хлебом (>2%)"), `${cnt(r => r.short / Math.max(1, r.demand) > 0.02)}`],
        ["🔥", L("Najwyższa inflacja", "Самая высокая инфляция"), `${X.pct(maxBy(r => r.infl).infl)} (${when(maxBy(r => r.infl))})`],
        ["📉", L("Najwyższe bezrobocie", "Самая высокая безработица"), `${X.pct(maxBy(r => r.unemp).unemp)} (${when(maxBy(r => r.unemp))})`],
        ["🗳️", L("Średnie poparcie / najniższe", "Средняя поддержка / минимальная"), `${Math.round(M.reduce((x, r) => x + r.approval, 0) / n)}% / ${Math.round(minBy(r => r.approval).approval)}% (${when(minBy(r => r.approval))})`],
      ] : [];
      // co budowało i niszczyło poparcie: średnie składniki celu poparcia
      const apKeys = [["income", L("👛 dochody realne", "👛 реальные доходы")], ["jobs", L("👷 bezrobocie", "👷 безработица")], ["infl", L("📊 inflacja", "📊 инфляция")], ["queues", L("🧺 kolejki", "🧺 очереди")], ["tax", L("💼 podatki", "💼 налоги")], ["services", L("🏥 usługi i transfery", "🏥 услуги и трансферы")]];
      const apAvg = apKeys.map(([k, lab]) => [lab, M.reduce((x, r) => x + (r.z.ap?.[k] || 0), 0) / n]).sort((x, y) => Math.abs(y[1]) - Math.abs(x[1]));
      const apMx = Math.max(...apAvg.map(x => Math.abs(x[1])), 0.1);
      // decyzje i ich zmierzone skutki po 3 miesiącach
      const names = Object.fromEntries(POL().map(p => [p.k, p]));
      const after = d => M.find(r => r.mIndex >= Math.floor(d.day / 30) + 3)?.z || z;
      const decs = s.decisions.filter(d => d.before).slice(-8).map(d => { const z3 = after(d), ks = (AFFECTS[d.k] || []).slice(0, 3);
        return `<li>${S.date(d.day).year + 1}/${S.date(d.day).month + 1}: ${d.k === "build" ? "🏗️ " + PN[d.v] : names[d.k].ic + " " + names[d.k].n + " " + names[d.k].f(d.from) + " → " + names[d.k].f(d.v)}<div class="nv-fxs">${ks.map(k => { const f = VAL[k], b0 = f({ ...d.before, inc: { disp: d.before.disp } }), b1 = f(z3); if (b0 == null || b1 == null) return ""; const E = explain(k, z3, z3); return `<span class="nv-fx">${E.t}: ${E.f(b0)} → <b>${E.f(b1)}</b></span>`; }).join("")}</div></li>`; }).join("");
      const seriesSvg = (f, col) => spark(M.map(f), col, 60);
      const fall = s.lost && M.length > 6 ? `<h3>🧩 ${L("Co doprowadziło do upadku (ostatnie pół roku)", "Что привело к падению (последние полгода)")}</h3>${explainHtml({ hyper: "infl", debt: "budget", jobs: "unemp", food: "short", approval: "approval" }[s.lost], M[M.length - 7].z, z, true)}` : "";
      modal(`<h2>${s.lost ? "🏛️ " + L("Rząd upadł", "Правительство пало") : "🏁 " + L("Kadencja zakończona", "Срок завершён")} ${"★".repeat(stars)}${"☆".repeat(3 - stars)}</h2>
        ${s.lost ? `<p>${{ hyper: L("Inflacja ponad 25% przez 3 miesiące zniszczyła zaufanie do pieniądza.", "Инфляция выше 25% три месяца разрушила доверие к деньгам."), debt: L("Dług przekroczył 160% PKB — państwo straciło dostęp do finansowania.", "Долг превысил 160% ВВП — государство потеряло доступ к финансированию."), jobs: L("Bezrobocie ponad 20% przez 3 miesiące.", "Безработица выше 20% три месяца."), food: L("Brak ponad 25% chleba przez 3 miesiące.", "Нехватка более 25% хлеба три месяца."), approval: L("Poparcie poniżej 12% przez 3 miesiące — społeczeństwo odebrało Ci zaufanie.", "Поддержка ниже 12% три месяца — общество лишило тебя доверия.") }[s.lost]}</p>` : ""}
        <h3>📈 ${L("Co się zmieniło", "Что изменилось")}</h3>
        <div class="nv-tiles rep">${[["PKB", (z.Y / a.Y - 1) * 100, "%"], [L("Dochód realny", "Реальный доход"), (z.realInc / a.realInc - 1) * 100, "%"]].map(([t, v]) => `<div class="${v >= 0 ? "up" : "down"}"><small>${t}</small><b>${v > 0 ? "+" : ""}${X.n1(v)}%</b></div>`).join("")}<div><small>${L("Inflacja", "Инфляция")}</small><b>${X.pct(z.infl)}</b><i>${L("start", "старт")} ${X.pct(a.infl)}</i></div><div><small>${L("Bezrobocie", "Безработица")}</small><b>${X.pct(z.unemp)}</b><i>${L("start", "старт")} ${X.pct(a.unemp)}</i></div><div><small>${L("Dług/PKB", "Долг/ВВП")}</small><b>${Math.round(z.debtRatio * 100)}%</b><i>${L("start", "старт")} ${Math.round(a.debtRatio * 100)}%</i></div><div><small>${L("Poparcie", "Поддержка")}</small><b>${Math.round(z.approval)}%</b><i>${L("start", "старт")} ${Math.round(a.approval)}%</i></div></div>
        <h3>⏱️ ${L("Jak długo trzymałeś gospodarkę w dobrym stanie", "Сколько ты держал экономику в хорошем состоянии")}</h3>
        <table class="nv-tbl">${stats.map(([i2, t, v]) => `<tr><td>${i2} ${t}</td><td>${v}</td></tr>`).join("")}</table>
        <div class="nv-box"><b>${L("Inflacja / bezrobocie / poparcie w czasie", "Инфляция / безработица / поддержка во времени")}</b>${seriesSvg(r => r.infl, "#c23a1a")}${seriesSvg(r => r.unemp, "#2347c5")}${seriesSvg(r => r.approval, "#13804a")}</div>
        <h3>🗳️ ${L("Dlaczego ludzie Cię popierali (lub nie)", "Почему люди тебя поддерживали (или нет)")}</h3>
        ${apAvg.map(([lab, v]) => `<div class="nv-sbar dec"><span>${lab}</span><i class="${v >= 0 ? "g" : "b"}" style="width:${Math.abs(v) / apMx * 100}%"></i><b>${X.sgn(v)} ${L("pkt", "п.")}</b></div>`).join("")}
        <p class="nv-muted">${L("Średni wpływ na poparcie przez całą kadencję (punkt wyjścia: 55).", "Среднее влияние на поддержку за весь срок (база: 55).")}</p>
        ${fall}
        <h3>🎛️ ${L("Twoje decyzje i ich skutki po 3 miesiącach", "Твои решения и их последствия через 3 месяца")}</h3>
        ${decs ? `<ul class="nv-dlist">${decs}</ul>` : `<p class="nv-muted">${L("Prawie niczego nie zmieniano — gospodarka płynęła sama.", "Почти ничего не менялось — экономика шла сама.")}</p>`}
        <h3>🌍 ${L("Przetrwane kryzysy", "Пережитые кризисы")}</h3><p>${s.crises.map(c => `✓ ${X.ev[c.k].icon} ${X.ev[c.k].name} (${X.year} ${S.date(c.start).year + 1})`).join(" · ") || L("brak", "нет")}</p>
        <h3>🏅 ${L("Ocena", "Оценка")}: ${Math.round(sc.total)}/100</h3>
        ${Object.entries(sc.parts).map(([k, v]) => `<div class="nv-sbar"><span>${{ economy: L("Gospodarka", "Экономика"), stability: L("Stabilność", "Стабильность"), state: L("Państwo", "Государство"), society: L("Społeczeństwo", "Общество"), resilience: L("Odporność", "Устойчивость") }[k]}</span><i class="${v >= 60 ? "g" : "b"}" style="width:${v}%"></i><b>${Math.round(v)}</b></div>`).join("")}
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
      const dr = t.closest("[data-drill]"); if (dr){ whyStack.push(dr.dataset.drill); if (!why || $(".nv-modal")?.dataset.kind !== "why"){ why = true; whyStack = [dr.dataset.drill]; } modal(whyHtml(), "why"); return; }
      const cr = t.closest("[data-crumb]"); if (cr){ whyStack = whyStack.slice(0, +cr.dataset.crumb + 1); modal(whyHtml(), "why"); return; }
      if (t.closest("[data-mclose]") || (t.closest(".nv-modal") && !t.closest(".nv-mcard") && !/report|crisis|end/.test($(".nv-modal")?.dataset.kind || ""))){ const kind = $(".nv-modal")?.dataset.kind; why = null; modal(""); if (kind === "intro" && !timer) setSpeed(1); else if ((kind === "report" || kind === "crisis") && resume) setSpeed(resume); return; }
      if (t.closest("#nvnew")){ s = S.newGame(); finish.done = false; modal(""); hud(); feed(); visual(); labels(); setSpeed(1); return; }
      const sp = t.closest("[data-sp]"); if (sp){ setSpeed(+sp.dataset.sp); return; }
      const w = t.closest("[data-why]"); if (w){ openWhy(w.dataset.why); return; }
      const tb = t.closest("[data-tab]"); if (tb){ openTab(tb.dataset.tab); return; }
      const tg = t.closest("[data-tab-go]"); if (tg){ if (tab !== tg.dataset.tabGo) openTab(tg.dataset.tabGo); return; }
      const ev = t.closest("[data-evk]"); if (ev){ const n = s.news.slice().reverse().find(x => x.k === ev.dataset.evk) || { id: ev.dataset.evk + ":start", k: ev.dataset.evk }; resume = timer ? speed : 0; crisisModal(n); return; }
      const ch = t.closest("[data-chart]"); if (ch){ chartKey = ch.dataset.chart; refreshPanel(); return; }
      const bd = t.closest("[data-build]"); if (bd){ if (S.startProject(s, bd.dataset.build)){ learnHooks("build"); visual(); refreshPanel(); } return; }
      if (t.closest("[data-close]")){ hideCard(); return; }
      const ob = t.closest("[data-obj]"); if (ob){ const r = ob.getBoundingClientRect(), st = $("#nvst").getBoundingClientRect(); showCard(ob.dataset.obj, r.left - st.left + r.width / 2, r.top - st.top); return; }
    });
    $("#nvsnd").onclick = () => { if (sound.enabled){ sound.off(); $("#nvsnd").textContent = "🔇"; } else { sound.on(); $("#nvsnd").textContent = "🔊"; } };
    const onKey = e => { if (!host.isConnected){ window.removeEventListener("keydown", onKey); return; } if (e.target.closest?.("input, textarea")) return; if (e.code === "Space"){ e.preventDefault(); setSpeed(timer ? 0 : speed || 1); } if (e.key === "Escape"){ const kind = $(".nv-modal")?.dataset.kind; why = null; modal(""); hideCard(); if ((kind === "report" || kind === "crisis") && resume) setSpeed(resume); } };
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
