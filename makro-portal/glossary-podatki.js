// Słownik pojęć przedmiotu „Podatki”. Format jak w glossary.js (subj: "podatki").
(function () {
  const G = window.GLOSSARY;
  const T = (id, rel, pl, ru) => G.push({ id, subj: "podatki", rel, pl: { n: pl[0], s: pl[1], l: pl[2] }, ru: { n: ru[0], s: ru[1], l: ru[2] } });

  // ---------- podstawy ----------
  T("podatek", ["danina-publiczna", "ordynacja-podatkowa", "podatnik", "oplata-publiczna"],
    ["Podatek", "Publicznoprawne, nieodpłatne, przymusowe i bezzwrotne świadczenie pieniężne na rzecz Skarbu Państwa lub JST, wynikające z ustawy (art. 6 Op).",
     "Podatek nie daje płacącemu konkretnego świadczenia w zamian: państwo finansuje z niego dobra ogólne. Powstaje z mocy prawa (ex lege), gdy zajdzie zdarzenie opisane w ustawie. Prawidłowo zapłacony nie wraca; zwraca się tylko nadpłatę. Nałożyć go można wyłącznie ustawą."],
    ["Налог", "Публично-правовой, безвозмездный, принудительный и безвозвратный денежный платёж в пользу казны или JST, вытекающий из закона (ст. 6 Op).",
     "Налог не даёт плательщику конкретного встречного предоставления: государство финансирует из него общие блага. Он возникает в силу закона (ex lege), когда наступает событие, описанное в законе. Правильно уплаченный налог не возвращается; возвращается только переплата. Ввести его можно только законом."]);
  T("danina-publiczna", ["podatek", "oplata-publiczna", "clo"],
    ["Danina publiczna", "Ogólne pojęcie świadczeń pieniężnych na rzecz władzy publicznej: podatki, opłaty, cła, składki, dopłaty.",
     "Daniny różnią się przede wszystkim odpłatnością i celowością. Podatek jest nieodpłatny i niecelowy, opłata daje świadczenie wzajemne, składka uprawnia do świadczeń z systemu ubezpieczeń, a cło pobiera się w obrocie z zagranicą. Od rodzaju daniny zależy, jakie przepisy się do niej stosuje."],
    ["Публичный платёж", "Общее понятие денежных платежей публичной власти: налоги, сборы, пошлины, взносы, доплаты.",
     "Публичные платежи различаются прежде всего возмездностью и целевым характером. Налог безвозмезден и нецелевой, сбор даёт встречное предоставление, взнос даёт право на выплаты из системы страхования, а пошлина взимается во внешней торговле. От вида платежа зависит, какие нормы к нему применяются."]);
  T("oplata-publiczna", ["danina-publiczna", "podatek", "oplata-lokalna"],
    ["Opłata (publiczna)", "Danina odpłatna: w zamian płacący dostaje konkretne świadczenie od organu, np. dokument.",
     "Opłata ma charakter ekwiwalentny: jej wysokość powinna odpowiadać kosztom usługi urzędu. Przykłady to opłata skarbowa czy opłata za wydanie paszportu. Jeśli „opłata” nie daje żadnego świadczenia wzajemnego, w istocie może być podatkiem."],
    ["Сбор (публичный)", "Возмездный платёж: взамен плательщик получает конкретное действие органа, например документ.",
     "Сбор эквивалентен: его размер должен соответствовать стоимости услуги ведомства. Примеры — гербовый сбор или сбор за выдачу паспорта. Если «сбор» не даёт никакого встречного предоставления, по сути он может быть налогом."]);
  T("clo", ["danina-publiczna", "kas"],
    ["Cło", "Danina pobierana na granicy celnej w związku z obrotem towarowym z zagranicą.",
     "Cło może pełnić funkcję ochronną (cła protekcyjne chronią rynek krajowy) albo fiskalną. W Unii Europejskiej polityka celna jest wyłączną kompetencją UE. W Polsce sprawami celnymi zajmują się organy KAS, m.in. naczelnicy urzędów celno-skarbowych."],
    ["Пошлина", "Платёж, взимаемый на таможенной границе в связи с внешней торговлей товарами.",
     "Пошлина может выполнять защитную функцию (протекционистские пошлины защищают внутренний рынок) или фискальную. В ЕС таможенная политика — исключительная компетенция Союза. В Польше таможенными делами занимаются органы KAS, в частности начальники таможенно-налоговых служб."]);
  T("ordynacja-podatkowa", ["podatek", "postepowanie-podatkowe", "in-dubio-pro-tributario"],
    ["Ordynacja podatkowa", "Ustawa z 29 sierpnia 1997 r., podstawowy akt formalnego prawa podatkowego.",
     "Zawiera definicję podatku (art. 6), przepisy o podatnikach, płatnikach i inkasentach, zobowiązaniach, przedawnieniu, interpretacjach, postępowaniu podatkowym, czynnościach sprawdzających i kontroli podatkowej. Stosuje się ją do większości podatków, także lokalnych."],
    ["Ordynacja podatkowa (Налоговый кодекс)", "Закон от 29 августа 1997 г., основной акт процессуального налогового права.",
     "Содержит определение налога (ст. 6), нормы о налогоплательщиках, агентах и сборщиках, обязательствах, давности, разъяснениях, налоговом производстве, проверочных действиях и налоговой проверке. Применяется к большинству налогов, в том числе местным."]);
  T("podatnik", ["platnik", "inkasent", "podatek"],
    ["Podatnik", "Osoba fizyczna, prawna lub jednostka bez osobowości prawnej, która podlega obowiązkowi podatkowemu (art. 7 Op).",
     "Podatnik to podstawowy podmiot bierny stosunku podatkowego: ciąży na nim obowiązek zapłaty podatku z własnych środków. Ustawy podatkowe mogą ustanawiać podatnikami także inne podmioty. W podatkach pośrednich podatnik formalny (sprzedawca) nie ponosi ekonomicznego ciężaru podatku."],
    ["Налогоплательщик", "Физическое, юридическое лицо или организация без правосубъектности, несущие налоговую обязанность (ст. 7 Op).",
     "Налогоплательщик — основной пассивный субъект налогового отношения: на нём лежит обязанность уплатить налог из собственных средств. Налоговые законы могут признавать налогоплательщиками и других субъектов. В косвенных налогах формальный налогоплательщик (продавец) не несёт экономической тяжести налога."]);
  T("platnik", ["podatnik", "inkasent"],
    ["Płatnik", "Podmiot obowiązany obliczyć, pobrać od podatnika podatek i wpłacić go organowi (art. 8 Op).",
     "Typowy płatnik to pracodawca pobierający zaliczki na PIT z pensji pracownika albo notariusz pobierający podatek przy darowiźnie w akcie notarialnym. Płatnik odpowiada całym swoim majątkiem za podatek, którego nie pobrał albo nie wpłacił (art. 30 Op)."],
    ["Налоговый агент (płatnik)", "Субъект, обязанный рассчитать, удержать с налогоплательщика налог и перечислить его органу (ст. 8 Op).",
     "Типичный агент — работодатель, удерживающий авансы PIT из зарплаты работника, или нотариус, удерживающий налог при дарении нотариальным актом. Агент отвечает всем своим имуществом за налог, который не удержал или не перечислил (ст. 30 Op)."]);
  T("inkasent", ["platnik", "podatnik", "podatek-rolny"],
    ["Inkasent", "Podmiot obowiązany pobrać od podatnika podatek i wpłacić go organowi, ale bez jego obliczania (art. 9 Op).",
     "Inkasenci są typowi dla podatków i opłat lokalnych: sołtys pobiera podatek rolny, leśny i od nieruchomości, a hotel pobiera opłatę miejscową. W odróżnieniu od płatnika inkasent nie oblicza podatku, tylko go zbiera."],
    ["Сборщик (inkasent)", "Субъект, обязанный собрать с налогоплательщика налог и перечислить его органу, но без расчёта (ст. 9 Op).",
     "Сборщики типичны для местных налогов и сборов: сельский староста собирает сельскохозяйственный, лесной налог и налог на недвижимость, а гостиница — курортный сбор. В отличие от агента сборщик налог не рассчитывает, а только собирает."]);
  T("przedmiot-opodatkowania", ["podstawa-opodatkowania", "stawka-podatkowa"],
    ["Przedmiot opodatkowania", "Zdarzenie lub stan, z którym ustawa wiąże powstanie obowiązku podatkowego.",
     "To najważniejszy element konstrukcji podatku, bo wskazuje, co jest opodatkowane: osiąganie dochodu (PIT, CIT), obrót towarami i usługami (VAT), posiadanie majątku (podatek od nieruchomości) albo jego nieodpłatne nabycie (podatek od spadków i darowizn). Przedmiot wyznacza typ podatku."],
    ["Объект налогообложения", "Событие или состояние, с которым закон связывает возникновение налоговой обязанности.",
     "Это важнейший элемент конструкции налога, так как показывает, что облагается: получение дохода (PIT, CIT), оборот товаров и услуг (VAT), владение имуществом (налог на недвижимость) или его безвозмездное приобретение (налог на наследство и дарение). Объект определяет тип налога."]);
  T("podstawa-opodatkowania", ["przedmiot-opodatkowania", "stawka-podatkowa", "kwota-wolna"],
    ["Podstawa opodatkowania", "Wartościowe lub ilościowe ujęcie przedmiotu podatku, do którego stosuje się stawkę.",
     "Podstawa może być wyrażona w pieniądzu (dochód w PIT, wartość sprzedaży w VAT) albo w jednostkach fizycznych (m² w podatku od nieruchomości, litry w akcyzie). Ustawa określa, jak ją obliczyć i jakie odliczenia ją zmniejszają."],
    ["Налоговая база", "Стоимостное или количественное выражение объекта налога, к которому применяется ставка.",
     "База может быть выражена в деньгах (доход в PIT, стоимость продажи в VAT) или в физических единицах (м² в налоге на недвижимость, литры в акцизе). Закон определяет, как её рассчитать и какие вычеты её уменьшают."]);
  T("stawka-podatkowa", ["podstawa-opodatkowania", "progresja"],
    ["Stawka podatkowa", "Wielkość określająca wysokość podatku w stosunku do podstawy opodatkowania.",
     "Stawki bywają kwotowe (stała kwota od jednostki, np. zł za m²), procentowe (proporcjonalne, progresywne, degresywne) albo mieszane. Uporządkowany zbiór stawek to skala podatkowa. W VAT stosuje się stawki 23%, 8%, 5% i 0%, w PIT na skali 12% i 32%."],
    ["Налоговая ставка", "Величина, определяющая размер налога относительно налоговой базы.",
     "Ставки бывают твёрдыми (фиксированная сумма на единицу, например зл за м²), процентными (пропорциональными, прогрессивными, дегрессивными) или смешанными. Упорядоченный набор ставок — налоговая шкала. В VAT применяются ставки 23%, 8%, 5% и 0%, в PIT по шкале — 12% и 32%."]);
  T("progresja", ["stawka-podatkowa", "pit", "funkcja-redystrybucyjna"],
    ["Progresja podatkowa", "Skala, w której stawka rośnie wraz ze wzrostem podstawy opodatkowania.",
     "Progresja globalna stosuje jedną stawkę do całej podstawy (w Polsce dziś niestosowana). Progresja szczeblowa dzieli podstawę na przedziały z różnymi stawkami: wyższa stawka dotyczy tylko nadwyżki ponad próg. Szczeblową stosuje się w PIT (12% i 32%) i w podatku od spadków i darowizn."],
    ["Налоговая прогрессия", "Шкала, при которой ставка растёт вместе с налоговой базой.",
     "Глобальная прогрессия применяет одну ставку ко всей базе (в Польше сейчас не применяется). Ступенчатая делит базу на интервалы с разными ставками: более высокая ставка касается только превышения над порогом. Ступенчатая применяется в PIT (12% и 32%) и в налоге на наследство и дарение."]);
  T("kwota-wolna", ["pit", "podatek-od-spadkow", "podstawa-opodatkowania"],
    ["Kwota wolna od podatku", "Część podstawy, od której nie płaci się podatku, uznawana za minimum egzystencji.",
     "W PIT na skali wynosi 30 000 zł rocznie i działa jako kwota zmniejszająca podatek 3 600 zł (30 000 × 12%). W podatku od spadków i darowizn kwoty wolne zależą od grupy: 36 120 zł, 27 090 zł i 5 733 zł. Na podatku liniowym i ryczałcie kwoty wolnej nie ma."],
    ["Необлагаемый минимум", "Часть базы, с которой налог не платится, так как она считается прожиточным минимумом.",
     "В PIT по шкале он составляет 30 000 зл в год и действует как сумма, уменьшающая налог, 3 600 зл (30 000 × 12%). В налоге на наследство и дарение необлагаемые суммы зависят от группы: 36 120 зл, 27 090 зл и 5 733 зл. При линейном налоге и ryczałt необлагаемого минимума нет."]);
  T("zwolnienie-podatkowe", ["ulga-podatkowa", "zwolnienie-4a"],
    ["Zwolnienie podatkowe", "Wyłączenie z opodatkowania określonych podmiotów lub przedmiotów, które normalnie mieszczą się w zakresie podatku.",
     "Zwolnienie podmiotowe dotyczy kategorii podatników, przedmiotowe — kategorii rzeczy lub czynności (np. usługi medyczne w VAT). Przy zwolnieniu obowiązek podatkowy istnieje, ale nie zamienia się w zobowiązanie. Różni się to od wyłączenia, gdy sytuacja w ogóle leży poza zakresem podatku."],
    ["Налоговое освобождение", "Вывод из-под налогообложения определённых субъектов или объектов, которые обычно попадают под налог.",
     "Субъектное освобождение касается категорий налогоплательщиков, предметное — категорий вещей или операций (например, медицинские услуги в VAT). При освобождении налоговая обязанность существует, но не превращается в обязательство. Это отличается от исключения, когда ситуация вообще лежит вне сферы налога."]);
  T("ulga-podatkowa", ["zwolnienie-podatkowe", "funkcja-stymulacyjna"],
    ["Ulga podatkowa", "Element fakultatywny podatku, który zmniejsza podstawę opodatkowania albo kwotę podatku.",
     "W PIT część ulg odlicza się od dochodu (np. rehabilitacyjna, termomodernizacyjna, internetowa), a część od podatku (ulga prorodzinna). W CIT i PIT działają ulgi stymulacyjne, np. B+R, na robotyzację, na ekspansję. Ulgi realizują funkcje społeczne i stymulacyjne podatków."],
    ["Налоговая льгота", "Факультативный элемент налога, уменьшающий налоговую базу или сумму налога.",
     "В PIT часть льгот вычитается из дохода (например, реабилитационная, термомодернизационная, интернет-льгота), а часть — из налога (семейная льгота на детей). В CIT и PIT действуют стимулирующие льготы, например B+R, на роботизацию, на экспансию. Льготы реализуют социальные и стимулирующие функции налогов."]);
  T("funkcja-fiskalna", ["funkcja-redystrybucyjna", "funkcja-stymulacyjna", "polityka-fiskalna"],
    ["Funkcja fiskalna", "Podstawowa funkcja podatków: dostarczanie dochodów budżetowi państwa i samorządów.",
     "Dochody podatkowe stanowią zdecydowaną większość dochodów budżetu państwa. Największe wpływy dają VAT i akcyza, a w gminach podatek od nieruchomości. Dobry podatek ma wysoką wydajność fiskalną (dużo wpływów przy niskim koszcie poboru) i elastyczność (wpływy rosną razem z PKB)."],
    ["Фискальная функция", "Основная функция налогов: наполнение бюджета государства и органов самоуправления.",
     "Налоговые доходы составляют подавляющую часть доходов госбюджета. Больше всего дают VAT и акциз, а в гминах — налог на недвижимость. Хороший налог обладает высокой фискальной эффективностью (много поступлений при низких издержках сбора) и эластичностью (поступления растут вместе с ВВП)."]);
  T("funkcja-redystrybucyjna", ["funkcja-fiskalna", "progresja"],
    ["Funkcja redystrybucyjna", "Wtórny podział dochodu narodowego między grupy społeczne za pomocą podatków i transferów.",
     "Mechanizmem jest progresywne opodatkowanie (wyższe stawki dla wyższych dochodów) połączone z transferami socjalnymi. Skuteczność mierzy m.in. współczynnik Giniego. Zbyt silna redystrybucja może jednak osłabiać bodźce do pracy i inwestowania."],
    ["Перераспределительная функция", "Вторичное распределение национального дохода между социальными группами с помощью налогов и трансфертов.",
     "Механизм — прогрессивное налогообложение (выше ставки для более высоких доходов) в сочетании с социальными трансфертами. Эффективность измеряется, в частности, коэффициентом Джини. Слишком сильное перераспределение может ослаблять стимулы к труду и инвестициям."]);
  T("funkcja-stymulacyjna", ["funkcja-fiskalna", "ulga-podatkowa"],
    ["Funkcja stymulacyjna (regulacyjna)", "Wykorzystanie podatków do zachęcania do pożądanych zachowań i hamowania niepożądanych.",
     "Państwo zachęca ulgami i zwolnieniami (ulga B+R, IP Box, ulga termomodernizacyjna) i zniechęca wysokimi stawkami (akcyza na tytoń i alkohol, opłata od toreb plastikowych). Gminy działają podobnie, różnicując stawki podatków lokalnych."],
    ["Стимулирующая (регулирующая) функция", "Использование налогов для поощрения желательного и сдерживания нежелательного поведения.",
     "Государство поощряет льготами и освобождениями (льгота B+R, IP Box, термомодернизационная льгота) и сдерживает высокими ставками (акциз на табак и алкоголь, сбор за пластиковые пакеты). Гмины действуют похоже, дифференцируя ставки местных налогов."]);
  T("podatek-bezposredni", ["podatek-posredni", "pit", "cit"],
    ["Podatek bezpośredni", "Podatek, którego ciężar ponosi sam podatnik, bez możliwości przerzucenia go na innych.",
     "Obciąża bezpośrednio dochód lub majątek, ma charakter osobisty i może uwzględniać sytuację podatnika (np. progresja, ulgi rodzinne). Przykłady: PIT, CIT, podatek od nieruchomości, od spadków i darowizn. Uważany jest za bardziej sprawiedliwy niż podatki pośrednie."],
    ["Прямой налог", "Налог, тяжесть которого несёт сам налогоплательщик без возможности переложить её на других.",
     "Облагает непосредственно доход или имущество, имеет личный характер и может учитывать положение налогоплательщика (например, прогрессия, семейные льготы). Примеры: PIT, CIT, налог на недвижимость, на наследство и дарение. Считается более справедливым, чем косвенные налоги."]);
  T("podatek-posredni", ["podatek-bezposredni", "vat", "akcyza"],
    ["Podatek pośredni", "Podatek ukryty w cenie, którego ciężar sprzedawca przerzuca na konsumenta.",
     "Formalnym podatnikiem jest przedsiębiorca, ale ekonomicznie płaci nabywca. Podatki pośrednie są anonimowe, tanie w poborze i wydajne, lecz regresywne: biedniejsi płacą wyższy odsetek dochodu. Główne przykłady w Polsce to VAT i akcyza, które dają ponad połowę wpływów podatkowych."],
    ["Косвенный налог", "Налог, скрытый в цене, тяжесть которого продавец перекладывает на потребителя.",
     "Формальный налогоплательщик — предприниматель, но экономически платит покупатель. Косвенные налоги анонимны, дёшевы в сборе и эффективны, но регрессивны: бедные платят больший процент дохода. Главные примеры в Польше — VAT и акциз, дающие больше половины налоговых поступлений."]);
  T("system-podatkowy", ["podatek", "podatek-bezposredni", "podatek-posredni"],
    ["System podatkowy", "Ogół podatków obowiązujących w danym państwie w danym czasie, tworzący względnie spójną całość.",
     "Obejmuje także aparat skarbowy, prawo i zasady jego działania. Na jego kształt wpływają tradycje oraz warunki administracyjne, ekonomiczne i polityczne. Dobry system jest kompletny i spójny, neutralny i efektywny oraz stabilny i przewidywalny."],
    ["Налоговая система", "Совокупность налогов, действующих в данном государстве в данное время и образующих относительно целостное единство.",
     "Включает также налоговый аппарат, право и принципы его работы. На её облик влияют традиции, а также административные, экономические и политические условия. Хорошая система полна и согласована, нейтральна и эффективна, стабильна и предсказуема."]);
  T("in-dubio-pro-tributario", ["ordynacja-podatkowa", "interpretacja-indywidualna"],
    ["In dubio pro tributario", "Zasada z art. 2a Op: niedające się usunąć wątpliwości co do treści przepisów rozstrzyga się na korzyść podatnika.",
     "Obowiązuje od 2016 r. Według NSA stosuje się ją dopiero po wyczerpaniu innych metod wykładni (językowej, systemowej, celowościowej). Uzupełnia ją zakaz stosowania analogii na niekorzyść podatnika, wynikający z zasady nullum tributum sine lege."],
    ["In dubio pro tributario", "Принцип ст. 2a Op: неустранимые сомнения относительно содержания норм толкуются в пользу налогоплательщика.",
     "Действует с 2016 г. По мнению NSA, применяется только после исчерпания других методов толкования (языкового, системного, целевого). Его дополняет запрет аналогии во вред налогоплательщику, вытекающий из принципа nullum tributum sine lege."]);
  T("otoczenie-podatkowe", ["podwojne-opodatkowanie", "kontrola-podatkowa", "jpk"],
    ["Otoczenie podatkowe przedsiębiorstwa", "Całokształt czynników związanych z podatkami, które wpływają na funkcjonowanie firmy.",
     "Obejmuje płaszczyzny: prawną (przepisy i ich zmiany), finansową (koszty, płynność, wynik), ekonomiczną (konkurencyjność, inwestycje), organizacyjną (księgi, deklaracje, kontrole), międzynarodową (podwójne opodatkowanie, VAT w UE) oraz społeczną i etyczną (uczciwość, szara strefa, reputacja)."],
    ["Налоговое окружение предприятия", "Совокупность связанных с налогами факторов, влияющих на работу фирмы.",
     "Охватывает плоскости: правовую (нормы и их изменения), финансовую (издержки, ликвидность, результат), экономическую (конкурентоспособность, инвестиции), организационную (книги, декларации, проверки), международную (двойное налогообложение, VAT в ЕС), а также социальную и этическую (честность, теневая экономика, репутация)."]);
  T("podwojne-opodatkowanie", ["cit", "otoczenie-podatkowe"],
    ["Podwójne opodatkowanie", "Opodatkowanie tego samego dochodu dwa razy: w dwóch państwach albo na dwóch poziomach (spółka i wspólnik).",
     "Międzynarodowe podwójne opodatkowanie ograniczają umowy o unikaniu podwójnego opodatkowania (Polska ma ich ponad 90), dzielące prawo do podatku między państwo rezydencji i źródła. Ekonomiczne podwójne opodatkowanie występuje przy dywidendzie: spółka płaci CIT, a wspólnik PIT 19%."],
    ["Двойное налогообложение", "Обложение одного и того же дохода дважды: в двух государствах или на двух уровнях (компания и участник).",
     "Международное двойное налогообложение ограничивают соглашения об избежании двойного налогообложения (у Польши их более 90), распределяющие право на налог между государством резидентства и источника. Экономическое двойное налогообложение возникает при дивидендах: компания платит CIT, а участник — PIT 19%."]);

  // ---------- podatki dochodowe ----------
  T("pit", ["podatek-liniowy", "ryczalt-ewidencjonowany", "kwota-wolna", "progresja"],
    ["PIT", "Podatek dochodowy od osób fizycznych (ustawa z 26 lipca 1991 r.).",
     "W 2026 r. skala wynosi 12% do 120 000 zł i 32% od nadwyżki, z kwotą wolną 30 000 zł (kwota zmniejszająca 3 600 zł). Przedsiębiorcy mogą wybrać podatek liniowy 19% lub ryczałt. PIT płaci się w zaliczkach (pobieranych przez płatnika albo samodzielnie) i rozlicza rocznie. To podatek wspólny państwa i samorządów."],
    ["PIT", "Налог на доходы физических лиц (закон от 26 июля 1991 г.).",
     "В 2026 г. шкала: 12% до 120 000 зл и 32% с превышения, с необлагаемым минимумом 30 000 зл (уменьшающая сумма 3 600 зл). Предприниматели могут выбрать линейный налог 19% или ryczałt. PIT платится авансами (удерживаемыми агентом или самостоятельно) и рассчитывается за год. Это общий налог государства и самоуправления."]);
  T("cit", ["maly-podatnik", "estonski-cit", "podwojne-opodatkowanie"],
    ["CIT", "Podatek dochodowy od osób prawnych (ustawa z 15 lutego 1992 r.).",
     "Płacą go spółki z o.o., akcyjne, a od 2021 r. także komandytowe i komandytowo-akcyjne. Stawka podstawowa wynosi 19%, a dla małych podatników i firm w pierwszym roku działalności 9%. Zaliczki płaci się do 20. dnia miesiąca, a zeznanie CIT-8 składa do końca 3. miesiąca po roku."],
    ["CIT", "Налог на доходы юридических лиц (закон от 15 февраля 1992 г.).",
     "Его платят sp. z o.o., акционерные общества, а с 2021 г. также коммандитные и коммандитно-акционерные товарищества. Основная ставка — 19%, для малых налогоплательщиков и фирм в первый год — 9%. Авансы платятся до 20-го числа месяца, а декларация CIT-8 подаётся до конца 3-го месяца после года."]);
  T("koszty-uzyskania", ["pit", "cit", "podstawa-opodatkowania"],
    ["Koszty uzyskania przychodu", "Wydatki poniesione w celu osiągnięcia przychodu albo zachowania lub zabezpieczenia jego źródła.",
     "Dochód to przychód minus koszty jego uzyskania; gdy koszty są wyższe, powstaje strata. Ustawa wymienia wydatki, które kosztem nie są. Koszty można odliczać na skali i na podatku liniowym, ale nie na ryczałcie. Do kosztów należą też odpisy amortyzacyjne."],
    ["Расходы на получение выручки", "Затраты, понесённые для получения выручки или сохранения либо обеспечения её источника.",
     "Доход — это выручка минус расходы на её получение; если расходы больше, возникает убыток. Закон перечисляет затраты, которые расходами не являются. Расходы можно вычитать на шкале и линейном налоге, но не на ryczałt. К расходам относятся и амортизационные отчисления."]);
  T("podatek-liniowy", ["pit", "skladka-zdrowotna", "jdg"],
    ["Podatek liniowy", "Forma opodatkowania działalności gospodarczej w PIT ze stałą stawką 19% od dochodu.",
     "Nie ma progów ani kwoty wolnej, a podatnik traci większość ulg i prawo do wspólnego rozliczenia z małżonkiem. Koszty nadal się odlicza. Składka zdrowotna wynosi 4,9% dochodu. Wybór zgłasza się do 20. dnia miesiąca po miesiącu pierwszego przychodu. Opłaca się przy wysokich dochodach."],
    ["Линейный налог", "Форма налогообложения предпринимательской деятельности в PIT с постоянной ставкой 19% с дохода.",
     "Нет порогов и необлагаемого минимума, а налогоплательщик теряет большинство льгот и право на совместную декларацию с супругом. Расходы по-прежнему вычитаются. Медицинский взнос — 4,9% дохода. Выбор заявляется до 20-го числа месяца после месяца первой выручки. Выгоден при высоких доходах."]);
  T("ryczalt-ewidencjonowany", ["pit", "jdg", "karta-podatkowa"],
    ["Ryczałt od przychodów ewidencjonowanych", "Uproszczona forma PIT, w której podatek liczy się od przychodu, bez odliczania kosztów.",
     "Stawki wynoszą od 2% do 17% zależnie od rodzaju działalności. Wymaga tylko ewidencji przychodów. Opłaca się przy niskich kosztach (freelancerzy, usługi niematerialne), a nie opłaca przy handlu z wysokimi kosztami. Obowiązuje limit przychodów 2 mln euro i ustawowe wyłączenia niektórych działalności."],
    ["Ryczałt с учитываемой выручки", "Упрощённая форма PIT, при которой налог считается с выручки без вычета расходов.",
     "Ставки — от 2% до 17% в зависимости от вида деятельности. Требует только реестра выручки. Выгоден при низких расходах (фрилансеры, нематериальные услуги) и невыгоден для торговли с высокими расходами. Действует лимит выручки 2 млн евро и законодательные исключения для некоторых видов деятельности."]);
  T("karta-podatkowa", ["ryczalt-ewidencjonowany", "jdg"],
    ["Karta podatkowa", "Forma PIT, w której stałą kwotę podatku ustala z góry decyzją naczelnik urzędu skarbowego.",
     "Kwota zależy od rodzaju działalności, liczby pracowników i wielkości miejscowości, a nie od faktycznych przychodów. Nie trzeba prowadzić ewidencji ani składać deklaracji. Od 2022 r. nowi przedsiębiorcy nie mogą jej wybrać; korzystają z niej tylko kontynuujący."],
    ["Налоговая карта (karta podatkowa)", "Форма PIT, при которой фиксированную сумму налога заранее устанавливает решением начальник налоговой инспекции.",
     "Сумма зависит от вида деятельности, числа работников и размера населённого пункта, а не от фактической выручки. Не нужно вести учёт и подавать декларации. С 2022 г. новые предприниматели не могут её выбрать; ею пользуются только продолжающие."]);
  T("skladka-zdrowotna", ["podatek-liniowy", "ryczalt-ewidencjonowany", "jdg"],
    ["Składka zdrowotna przedsiębiorcy", "Obowiązkowa składka na ubezpieczenie zdrowotne, której wysokość zależy od formy opodatkowania.",
     "Według materiałów na skali wynosi 9% dochodu, na podatku liniowym 4,9% dochodu, a na ryczałcie jest stałą kwotą zależną od progu przychodów. Przy wyborze formy opodatkowania trzeba liczyć podatek razem ze składką zdrowotną, bo różnice bywają duże."],
    ["Медицинский взнос предпринимателя", "Обязательный взнос на медицинское страхование, размер которого зависит от формы налогообложения.",
     "По материалам на шкале он составляет 9% дохода, на линейном налоге — 4,9% дохода, а на ryczałt — фиксированную сумму в зависимости от порога выручки. При выборе формы налогообложения нужно считать налог вместе с медицинским взносом, так как различия бывают большими."]);
  T("maly-podatnik", ["cit", "vat"],
    ["Mały podatnik", "Podatnik, którego przychody (sprzedaż) w poprzednim roku nie przekroczyły równowartości 2 mln euro.",
     "W CIT mały podatnik stosuje stawkę 9% i może płacić zaliczki kwartalne; w CIT estońskim płaci 10% zamiast 20%. W VAT mały podatnik może stosować metodę kasową, rozliczając VAT dopiero po otrzymaniu zapłaty. Kwotę w euro przelicza się według kursu NBP."],
    ["Малый налогоплательщик", "Налогоплательщик, чья выручка (продажи) в прошлом году не превысила эквивалента 2 млн евро.",
     "В CIT малый налогоплательщик применяет ставку 9% и может платить ежеквартальные авансы; на эстонском CIT он платит 10% вместо 20%. В VAT малый налогоплательщик может применять кассовый метод, рассчитывая VAT только после получения оплаты. Сумма в евро пересчитывается по курсу NBP."]);
  T("estonski-cit", ["cit", "podwojne-opodatkowanie", "maly-podatnik"],
    ["CIT estoński", "Ryczałt od dochodów spółek (art. 28c–28o ustawy o CIT): podatek płaci się dopiero przy wypłacie zysku.",
     "Dopóki zysk zostaje w spółce, podatku nie ma. Stawki wynoszą 10% (mali) i 20% (pozostali), a wspólnik odlicza część CIT od PIT od dywidendy. Łączne obciążenie wypłaconego zysku to ok. 20% i 25% wobec 26,29% i 34,39% w klasycznym CIT. Warunki: odpowiednia forma prawna, wspólnicy-osoby fizyczne, co najmniej 3 pracowników, przewaga przychodów operacyjnych."],
    ["Эстонский CIT", "Единый налог с дохода компаний (ст. 28c–28o закона о CIT): налог платится только при выплате прибыли.",
     "Пока прибыль остаётся в компании, налога нет. Ставки — 10% (малые) и 20% (остальные), а участник вычитает часть CIT из PIT с дивидендов. Общая нагрузка на выплаченную прибыль — около 20% и 25% против 26,29% и 34,39% при классическом CIT. Условия: подходящая правовая форма, участники — физические лица, не менее 3 работников, преобладание операционной выручки."]);
  T("jdg", ["pit", "podatek-liniowy", "ryczalt-ewidencjonowany"],
    ["JDG (jednoosobowa działalność gospodarcza)", "Firma prowadzona przez osobę fizyczną we własnym imieniu i na własny rachunek.",
     "Przedsiębiorca odpowiada za zobowiązania całym majątkiem, także prywatnym, a firma nie ma osobowości prawnej. JDG płaci PIT i może wybrać skalę, podatek liniowy, ryczałt albo (tylko kontynuujący) kartę podatkową. Nie może korzystać z CIT estońskiego. Formę opodatkowania można zmieniać co roku."],
    ["JDG (индивидуальное предпринимательство)", "Фирма, которую физическое лицо ведёт от своего имени и за свой счёт.",
     "Предприниматель отвечает по обязательствам всем имуществом, в том числе личным, а фирма не имеет правосубъектности. JDG платит PIT и может выбрать шкалу, линейный налог, ryczałt или (только продолжающие) налоговую карту. Эстонский CIT ей недоступен. Форму налогообложения можно менять каждый год."]);

  // ---------- podatki pośrednie ----------
  T("vat", ["vat-nalezny", "vat-naliczony", "podatek-posredni", "split-payment"],
    ["VAT", "Podatek od towarów i usług (ustawa z 11 marca 2004 r., dyrektywa 2006/112/WE).",
     "VAT jest powszechny, wielofazowy i potrącalny: każdy przedsiębiorca płaci tylko od dodanej przez siebie wartości, a cały ciężar ponosi konsument. Stawki wynoszą 23%, 8%, 5% i 0%. Podatnikiem jest podmiot samodzielnie prowadzący działalność gospodarczą. To największe źródło dochodów budżetu państwa."],
    ["VAT", "Налог на товары и услуги (закон от 11 марта 2004 г., директива 2006/112/WE).",
     "VAT всеобщий, многоэтапный и зачётный: каждый предприниматель платит только с добавленной им стоимости, а всю тяжесть несёт потребитель. Ставки — 23%, 8%, 5% и 0%. Налогоплательщик — субъект, самостоятельно ведущий хозяйственную деятельность. Это крупнейший источник доходов госбюджета."]);
  T("vat-nalezny", ["vat-naliczony", "vat"],
    ["VAT należny", "Podatek wykazany na fakturach wystawionych przez podatnika (ze sprzedaży).",
     "VAT należny tworzy zobowiązanie wobec urzędu skarbowego. Od niego odejmuje się VAT naliczony z faktur zakupowych; różnicę wpłaca się do urzędu albo, gdy jest ujemna, odzyskuje lub przenosi na kolejny okres."],
    ["Исходящий VAT (należny)", "Налог, указанный в счетах, выставленных налогоплательщиком (с продаж).",
     "Исходящий VAT образует обязательство перед налоговой инспекцией. Из него вычитается входящий VAT из счетов на покупки; разница уплачивается в налоговую или, если она отрицательная, возвращается или переносится на следующий период."]);
  T("vat-naliczony", ["vat-nalezny", "vat"],
    ["VAT naliczony", "Podatek wykazany na fakturach otrzymanych przez podatnika (z zakupów).",
     "VAT naliczony zmniejsza podatek do zapłaty, ale tylko wtedy, gdy zakup ma związek z działalnością opodatkowaną. Dzięki odliczeniu VAT jest neutralny dla przedsiębiorcy. Podmiot zwolniony z VAT nie może odliczać VAT naliczonego, więc dla niego jest to koszt."],
    ["Входящий VAT (naliczony)", "Налог, указанный в счетах, полученных налогоплательщиком (с покупок).",
     "Входящий VAT уменьшает налог к уплате, но только если покупка связана с облагаемой деятельностью. Благодаря вычету VAT нейтрален для предпринимателя. Субъект, освобождённый от VAT, не может вычитать входящий VAT, поэтому для него это расход."]);
  T("split-payment", ["vat", "kas"],
    ["Split payment (mechanizm podzielonej płatności)", "Sposób zapłaty, w którym kwota netto trafia na rachunek sprzedawcy, a VAT na jego osobny rachunek VAT.",
     "Ma utrudniać wyłudzenia VAT. Jest obowiązkowy przy towarach i usługach „wrażliwych” (np. stal, elektronika, paliwa, usługi budowlane), gdy faktura brutto przekracza 15 000 zł. Rachunek VAT bank tworzy automatycznie do rachunku firmowego."],
    ["Раздельный платёж (split payment)", "Способ оплаты, при котором сумма нетто поступает на счёт продавца, а VAT — на его отдельный VAT-счёт.",
     "Призван затруднить мошенничество с VAT. Обязателен для «чувствительных» товаров и услуг (например, сталь, электроника, топливо, строительные услуги), если счёт брутто превышает 15 000 зл. VAT-счёт банк открывает автоматически к расчётному счёту фирмы."]);
  T("jpk", ["vat", "kontrola-podatkowa"],
    ["JPK (Jednolity Plik Kontrolny)", "Księgi i dowody podatkowe w ustandaryzowanej formie elektronicznej przekazywane organom (art. 193a Op).",
     "Część plików wysyła się obowiązkowo co miesiąc lub kwartał, np. JPK_V7M/JPK_V7K z ewidencją i deklaracją VAT. Inne struktury (np. księgi rachunkowe, wyciągi bankowe, KPiR) przekazuje się na żądanie organu. JPK ułatwia automatyczną analizę i kontrolę rozliczeń."],
    ["JPK (Единый контрольный файл)", "Налоговые книги и документы в стандартизированной электронной форме, передаваемые органам (ст. 193a Op).",
     "Часть файлов отправляется обязательно ежемесячно или ежеквартально, например JPK_V7M/JPK_V7K с реестром и декларацией VAT. Другие структуры (например, бухгалтерские книги, банковские выписки, KPiR) передаются по требованию органа. JPK облегчает автоматический анализ и проверку расчётов."]);
  T("akcyza", ["sklad-podatkowy", "znaki-akcyzy", "podatek-posredni", "vat"],
    ["Akcyza (podatek akcyzowy)", "Wybiórczy, jednofazowy podatek pośredni od wyrobów akcyzowych (ustawa z 6 grudnia 2008 r.).",
     "Obejmuje w UE wyroby energetyczne, energię elektryczną, alkohol i tytoń, a w Polsce także m.in. samochody osobowe. Płaci ją zwykle producent lub importer, ale ciężar ponosi konsument. Stawki są kwotowe, procentowe lub mieszane; akcyza wchodzi do podstawy VAT. Ma cele fiskalne, zdrowotne i ekologiczne."],
    ["Акциз", "Выборочный одноэтапный косвенный налог на подакцизные товары (закон от 6 декабря 2008 г.).",
     "Охватывает в ЕС энергетические продукты, электроэнергию, алкоголь и табак, а в Польше также, в частности, легковые автомобили. Платит его обычно производитель или импортёр, но тяжесть несёт потребитель. Ставки твёрдые, процентные или смешанные; акциз входит в базу VAT. Имеет фискальные, здравоохранительные и экологические цели."]);
  T("sklad-podatkowy", ["akcyza", "znaki-akcyzy"],
    ["Skład podatkowy", "Miejsce produkcji, magazynowania lub przeładunku wyrobów akcyzowych w procedurze zawieszenia poboru akcyzy.",
     "Dopóki wyroby są w składzie, zobowiązanie akcyzowe nie powstaje; akcyzę płaci się przy wyprowadzeniu wyrobów do konsumpcji. Poprawia to płynność producenta. Prowadzenie składu wymaga zezwolenia, zabezpieczenia akcyzowego i rygorystycznej ewidencji."],
    ["Налоговый склад", "Место производства, хранения или перегрузки подакцизных товаров в процедуре приостановления взимания акциза.",
     "Пока товары на складе, акцизное обязательство не возникает; акциз платится при выпуске товаров в потребление. Это улучшает ликвидность производителя. Для ведения склада нужны разрешение, акцизное обеспечение и строгий учёт."]);
  T("znaki-akcyzy", ["akcyza", "sklad-podatkowy"],
    ["Znaki akcyzy", "Oznaczenia (np. banderole) umieszczane na niektórych wyrobach akcyzowych, m.in. papierosach i alkoholu.",
     "Podatkowe znaki akcyzy potwierdzają wpłatę kwoty odpowiadającej ich wartości (swoistej zaliczki na akcyzę), a legalizacyjne potwierdzają prawo do sprzedaży. Brak banderoli oznacza nielegalny obrót: konfiskatę towaru i odpowiedzialność karną skarbową."],
    ["Акцизные марки", "Обозначения (например, бандероли) на некоторых подакцизных товарах, в частности сигаретах и алкоголе.",
     "Налоговые акцизные марки подтверждают уплату суммы, равной их стоимости (своего рода аванса по акцизу), а легализационные — право на продажу. Отсутствие бандероли означает нелегальный оборот: конфискацию товара и уголовно-фискальную ответственность."]);

  // ---------- podatki majątkowe i lokalne ----------
  T("podatek-od-spadkow", ["grupa-podatkowa", "zwolnienie-4a", "kwota-wolna"],
    ["Podatek od spadków i darowizn", "Podatek od nieodpłatnego nabycia rzeczy i praw majątkowych (ustawa z 28 lipca 1983 r.).",
     "Obejmuje m.in. dziedziczenie, zapisy, darowizny, zasiedzenie i nieodpłatne zniesienie współwłasności. Podatnikiem jest nabywca. Wysokość zależy od grupy podatkowej: kwoty wolne 36 120 / 27 090 / 5 733 zł i stawki od 3% do 20%. Pobiera go naczelnik urzędu skarbowego, a wpływy trafiają do gminy."],
    ["Налог на наследство и дарение", "Налог на безвозмездное приобретение вещей и имущественных прав (закон от 28 июля 1983 г.).",
     "Охватывает, в частности, наследование, легаты, дарения, приобретательную давность и безвозмездное прекращение общей собственности. Налогоплательщик — приобретатель. Размер зависит от налоговой группы: необлагаемые суммы 36 120 / 27 090 / 5 733 зл и ставки от 3% до 20%. Взимает его начальник налоговой инспекции, а поступления идут гмине."]);
  T("grupa-podatkowa", ["podatek-od-spadkow", "zwolnienie-4a"],
    ["Grupa podatkowa", "Kategoria nabywców w podatku od spadków i darowizn ustalana według pokrewieństwa z darczyńcą lub spadkodawcą.",
     "Grupa I to najbliższa rodzina (m.in. małżonek, dzieci, rodzice, rodzeństwo, teściowie, zięć, synowa), grupa II to dalsza rodzina (np. siostrzeńcy, wujkowie), a grupa III to wszyscy pozostali, także partnerzy bez ślubu. Im bliższa grupa, tym wyższa kwota wolna i niższe stawki."],
    ["Налоговая группа", "Категория приобретателей в налоге на наследство и дарение, определяемая по родству с дарителем или наследодателем.",
     "Группа I — ближайшие родственники (в частности супруг, дети, родители, братья и сёстры, родители супруга, зять, невестка), группа II — дальние (например, племянники, дяди), группа III — все остальные, в том числе партнёры без брака. Чем ближе группа, тем выше необлагаемая сумма и ниже ставки."]);
  T("zwolnienie-4a", ["podatek-od-spadkow", "grupa-podatkowa", "zwolnienie-podatkowe"],
    ["Zwolnienie z art. 4a", "Całkowite zwolnienie z podatku od spadków i darowizn dla najbliższej rodziny po spełnieniu warunków formalnych.",
     "Dotyczy małżonka, zstępnych, wstępnych, pasierba, rodzeństwa, ojczyma i macochy (nie teściów, zięcia i synowej). Warunek: zgłoszenie nabycia na formularzu SD-Z2 w ciągu 6 miesięcy od powstania obowiązku podatkowego, a przy darowiźnie pieniężnej — udokumentowanie jej przelewem na rachunek obdarowanego (lub przekazem pocztowym)."],
    ["Освобождение по ст. 4a", "Полное освобождение от налога на наследство и дарение для ближайших родственников при выполнении формальных условий.",
     "Касается супруга, нисходящих, восходящих, пасынка, братьев и сестёр, отчима и мачехи (не родителей супруга, зятя и невестки). Условие: заявление о приобретении по форме SD-Z2 в течение 6 месяцев с момента возникновения налоговой обязанности, а при денежном дарении — подтверждение перевода на счёт одаряемого (или почтового перевода)."]);
  T("pcc", ["podatek-od-spadkow", "vat"],
    ["PCC (podatek od czynności cywilnoprawnych)", "Podatek od określonych umów cywilnoprawnych, np. sprzedaży, pożyczki, umowy spółki (ustawa z 9 września 2000 r.).",
     "Według materiałów stawki wynoszą m.in. 2% przy sprzedaży nieruchomości i rzeczy ruchomych, 1% przy prawach majątkowych, 0,5% przy pożyczce i umowie spółki. Co do zasady PCC nie pobiera się, gdy czynność podlega VAT. Pobiera go urząd skarbowy, a wpływy trafiają do gminy."],
    ["PCC (налог на гражданско-правовые сделки)", "Налог на определённые гражданско-правовые договоры, например купли-продажи, займа, договора товарищества (закон от 9 сентября 2000 г.).",
     "По материалам ставки составляют, в частности, 2% при продаже недвижимости и движимых вещей, 1% при имущественных правах, 0,5% при займе и договоре товарищества. Как правило, PCC не взимается, если сделка облагается VAT. Взимает его налоговая инспекция, а поступления идут гмине."]);
  T("podatek-od-nieruchomosci", ["wladztwo-podatkowe", "podatek-rolny", "podatek-lesny"],
    ["Podatek od nieruchomości", "Podatek lokalny od gruntów, budynków i budowli związanych z działalnością gospodarczą.",
     "Podstawą jest powierzchnia gruntów i budynków (m²) oraz wartość budowli. Stawki uchwala rada gminy, różnicując je według przeznaczenia (najwyższe dla działalności gospodarczej), w granicach maksimów ogłaszanych corocznie przez Ministra Finansów. To najważniejsze źródło dochodów podatkowych gmin."],
    ["Налог на недвижимость", "Местный налог на земельные участки, здания и сооружения, связанные с предпринимательской деятельностью.",
     "База — площадь участков и зданий (м²) и стоимость сооружений. Ставки устанавливает совет гмины, дифференцируя их по назначению (самые высокие для предпринимательской деятельности), в пределах максимумов, ежегодно объявляемых министром финансов. Это важнейший источник налоговых доходов гмин."]);
  T("podatek-rolny", ["podatek-od-nieruchomosci", "podatek-lesny", "inkasent"],
    ["Podatek rolny", "Podatek lokalny od gruntów sklasyfikowanych jako użytki rolne (ustawa z 15 listopada 1984 r.).",
     "Podstawą jest liczba hektarów przeliczeniowych, a stawką równowartość 2,5 q żyta od 1 ha według średniej ceny skupu żyta (GUS); rada gminy może obniżyć tę cenę. Grunty zajęte na działalność gospodarczą inną niż rolnicza podlegają podatkowi od nieruchomości."],
    ["Сельскохозяйственный налог", "Местный налог на земли, отнесённые к сельхозугодьям (закон от 15 ноября 1984 г.).",
     "База — число условных гектаров, а ставка — эквивалент 2,5 ц ржи с 1 га по средней цене закупки ржи (GUS); совет гмины может снизить эту цену. Земли, занятые под предпринимательскую деятельность, отличную от сельскохозяйственной, облагаются налогом на недвижимость."]);
  T("podatek-lesny", ["podatek-rolny", "podatek-od-nieruchomosci"],
    ["Podatek leśny", "Podatek lokalny od lasów (ustawa z 30 października 2002 r.).",
     "Stawka to równowartość 0,220 m³ drewna od 1 ha według średniej ceny sprzedaży drewna (GUS); rada gminy może ją obniżyć. Lasy zajęte na działalność gospodarczą inną niż gospodarka leśna podlegają podatkowi od nieruchomości. Zwolnione są m.in. niektóre lasy ochronne i rezerwaty."],
    ["Лесной налог", "Местный налог на леса (закон от 30 октября 2002 г.).",
     "Ставка — эквивалент 0,220 м³ древесины с 1 га по средней цене продажи древесины (GUS); совет гмины может её снизить. Леса, занятые под предпринимательскую деятельность, отличную от лесного хозяйства, облагаются налогом на недвижимость. Освобождены, в частности, некоторые защитные леса и заповедники."]);
  T("podatek-od-srodkow-transportowych", ["wladztwo-podatkowe", "podatek-od-nieruchomosci"],
    ["Podatek od środków transportowych", "Podatek lokalny od pojazdów ciężkich: samochodów ciężarowych od 3,5 t, ciągników, przyczep, naczep i autobusów.",
     "Stawki zależą od rodzaju i masy pojazdu, liczby osi, zawieszenia lub liczby miejsc. Rada gminy ustala je w granicach maksimów i może je różnicować np. według norm emisji spalin. Samochody osobowe nie podlegają temu podatkowi."],
    ["Налог на транспортные средства", "Местный налог на тяжёлый транспорт: грузовики от 3,5 т, тягачи, прицепы, полуприцепы и автобусы.",
     "Ставки зависят от вида и массы транспортного средства, числа осей, подвески или числа мест. Совет гмины устанавливает их в пределах максимумов и может дифференцировать, например по экологическим нормам. Легковые автомобили этим налогом не облагаются."]);
  T("oplata-lokalna", ["oplata-publiczna", "wladztwo-podatkowe", "inkasent"],
    ["Opłata lokalna", "Danina samorządowa o charakterze częściowo ekwiwalentnym: targowa, miejscowa, uzdrowiskowa, reklamowa, od posiadania psów.",
     "W zamian płacący dostaje możliwość korzystania z przestrzeni publicznej lub walorów miejscowości. Rada gminy wprowadza je fakultatywnie i ustala stawki w granicach ustawy. Opłaty mają niewielkie znaczenie fiskalne, ale ważną funkcję regulacyjną (np. opłata reklamowa porządkuje krajobraz)."],
    ["Местный сбор", "Самоуправленческий платёж частично эквивалентного характера: рыночный, курортный, санаторный, рекламный, за содержание собак.",
     "Взамен плательщик получает возможность пользоваться публичным пространством или достоинствами местности. Совет гмины вводит их факультативно и устанавливает ставки в пределах закона. Сборы имеют небольшое фискальное значение, но важную регулирующую функцию (например, рекламный сбор упорядочивает ландшафт)."]);
  T("wladztwo-podatkowe", ["podatek-od-nieruchomosci", "oplata-lokalna"],
    ["Władztwo podatkowe gminy", "Uprawnienia organów gminy do kształtowania obciążeń podatkowych na jej terenie w granicach ustaw.",
     "Rada gminy uchwala stawki podatków i opłat lokalnych (do maksimów ustawowych), wprowadza zwolnienia przedmiotowe i może obniżać ceny żyta i drewna. Nie może tworzyć nowych podatków ani zwalniać konkretnych podmiotów. Wójt jako organ podatkowy stosuje prawo w decyzjach, a RIO nadzoruje legalność uchwał."],
    ["Налоговая власть гмины", "Полномочия органов гмины формировать налоговую нагрузку на своей территории в пределах законов.",
     "Совет гмины устанавливает ставки местных налогов и сборов (до законодательных максимумов), вводит предметные освобождения и может снижать цены ржи и древесины. Он не может создавать новые налоги или освобождать конкретных субъектов. Войт как налоговый орган применяет право в решениях, а RIO надзирает за законностью решений совета."]);

  // ---------- organy i postępowanie ----------
  T("kas", ["interpretacja-indywidualna", "kontrola-podatkowa", "postepowanie-podatkowe"],
    ["KAS (Krajowa Administracja Skarbowa)", "Wyspecjalizowana administracja rządowa do spraw poboru podatków, ceł i kontroli, działająca od 1 marca 2017 r.",
     "Tworzą ją m.in. Szef KAS, Dyrektor Krajowej Informacji Skarbowej, dyrektorzy izb administracji skarbowej, naczelnicy urzędów skarbowych i urzędów celno-skarbowych. W ramach KAS działa umundurowana Służba Celno-Skarbowa. KAS powstała z połączenia administracji podatkowej, kontroli skarbowej i Służby Celnej."],
    ["KAS (Национальная налоговая администрация)", "Специализированная правительственная администрация по взиманию налогов, пошлин и контролю, действующая с 1 марта 2017 г.",
     "В неё входят, в частности, глава KAS, директор Национальной налоговой информации, директора налоговых палат, начальники налоговых инспекций и таможенно-налоговых служб. В составе KAS действует таможенно-налоговая служба в униформе. KAS создана путём объединения налоговой администрации, фискального контроля и таможенной службы."]);
  T("interpretacja-indywidualna", ["interpretacja-ogolna", "kas", "in-dubio-pro-tributario"],
    ["Interpretacja indywidualna", "Wydawana na wniosek ocena skutków podatkowych konkretnego stanu faktycznego lub zdarzenia przyszłego wnioskodawcy (art. 14b Op).",
     "W podatkach państwowych wydaje ją Dyrektor KIS, w lokalnych — wójt, burmistrz, prezydent, starosta lub marszałek. Wniosek kosztuje 40 zł od stanu faktycznego, a interpretację wydaje się najpóźniej w 3 miesiące. Zastosowanie się do niej nie może szkodzić wnioskodawcy, nawet po jej zmianie."],
    ["Индивидуальное разъяснение", "Выдаваемая по заявлению оценка налоговых последствий конкретного фактического состояния или будущего события заявителя (ст. 14b Op).",
     "По государственным налогам его выдаёт директор KIS, по местным — войт, бурмистр, президент, староста или маршал. Заявление стоит 40 зл за фактическое состояние, а разъяснение выдаётся не позднее 3 месяцев. Следование ему не может вредить заявителю, даже после его изменения."]);
  T("interpretacja-ogolna", ["interpretacja-indywidualna", "ordynacja-podatkowa"],
    ["Interpretacja ogólna", "Wyjaśnienie przepisów wydawane przez Ministra Finansów w celu ujednolicenia ich stosowania przez organy (art. 14a Op).",
     "Wydaje się ją z urzędu lub na wniosek, gdy organy stosują przepis niejednolicie, z uwzględnieniem orzecznictwa sądów, TK i TSUE. Z wnioskiem nie może wystąpić organ administracji. Minister wydaje też objaśnienia podatkowe. Zastosowanie się do interpretacji ogólnej chroni podatnika."],
    ["Общее разъяснение", "Разъяснение норм, издаваемое министром финансов для унификации их применения органами (ст. 14a Op).",
     "Издаётся по собственной инициативе или по заявлению, когда органы применяют норму неединообразно, с учётом практики судов, Конституционного трибунала и Суда ЕС. Орган администрации не может подать такое заявление. Министр также издаёт налоговые пояснения. Следование общему разъяснению защищает налогоплательщика."]);
  T("postepowanie-podatkowe", ["decyzja-podatkowa", "kontrola-podatkowa", "czynnosci-sprawdzajace"],
    ["Postępowanie podatkowe", "Sformalizowany zespół czynności organu i stron mający na celu ustalenie istnienia i zakresu zobowiązania podatkowego (dział IV Op).",
     "Opiera się na zasadach m.in. praworządności, prawdy obiektywnej, czynnego udziału strony i dwuinstancyjności. Wszczyna się je z urzędu lub na żądanie strony. Organ I instancji ma na załatwienie sprawy miesiąc (sprawa skomplikowana — 2 miesiące). Kończy się decyzją, od której przysługuje odwołanie w 14 dni."],
    ["Налоговое производство", "Формализованная совокупность действий органа и сторон с целью установить наличие и объём налогового обязательства (раздел IV Op).",
     "Опирается на принципы, в частности, законности, объективной истины, активного участия стороны и двухинстанционности. Возбуждается по инициативе органа или по требованию стороны. У органа I инстанции на рассмотрение — месяц (сложное дело — 2 месяца). Заканчивается решением, которое можно обжаловать в течение 14 дней."]);
  T("czynnosci-sprawdzajace", ["kontrola-podatkowa", "postepowanie-podatkowe"],
    ["Czynności sprawdzające", "Najmniej sformalizowany tryb weryfikacji: sprawdzenie terminowości i poprawności deklaracji (art. 272–280 Op).",
     "Organ może tylko żądać wyjaśnień i dokumentów, wezwać do złożenia lub uzupełnienia deklaracji, a oczywiste omyłki w określonym limicie poprawić sam (podatnik może wnieść sprzeciw w 14 dni). Nie przesłuchuje świadków ani nie powołuje biegłych; do tego potrzebna jest kontrola lub postępowanie."],
    ["Проверочные действия", "Наименее формализованный режим проверки: контроль своевременности и правильности деклараций (ст. 272–280 Op).",
     "Орган может только требовать пояснений и документов, вызвать для подачи или дополнения декларации, а очевидные ошибки в определённом лимите исправить сам (налогоплательщик может возразить в течение 14 дней). Он не допрашивает свидетелей и не привлекает экспертов; для этого нужна проверка или производство."]);
  T("kontrola-podatkowa", ["czynnosci-sprawdzajace", "postepowanie-podatkowe", "kas"],
    ["Kontrola podatkowa", "Tryb sprawdzenia, czy kontrolowany wywiązuje się z obowiązków podatkowych (art. 281–292 Op).",
     "Kontrolę wszczyna się przez doręczenie upoważnienia kontrolowanemu lub osobie upoważnionej. Kontrolujący może przesłuchiwać świadków i powoływać biegłych. W trakcie kontroli korekta deklaracji w jej zakresie jest bezskuteczna. Kontrola kończy się protokołem (nie decyzją); zastrzeżenia można złożyć w 14 dni."],
    ["Налоговая проверка", "Режим проверки выполнения проверяемым налоговых обязанностей (ст. 281–292 Op).",
     "Проверка начинается с вручения полномочия проверяемому или уполномоченному лицу. Проверяющий может допрашивать свидетелей и привлекать экспертов. Во время проверки корректировка декларации в её рамках неэффективна. Проверка заканчивается протоколом (не решением); замечания можно подать в течение 14 дней."]);
  T("decyzja-podatkowa", ["postepowanie-podatkowe", "przedawnienie"],
    ["Decyzja podatkowa", "Akt organu podatkowego rozstrzygający sprawę co do istoty, np. ustalający lub określający wysokość zobowiązania.",
     "Decyzja ustalająca tworzy zobowiązanie z dniem doręczenia (np. podatek od spadków), a określająca tylko określa prawidłową wysokość zobowiązania powstałego z mocy prawa. Decyzja zawiera m.in. podstawę prawną, rozstrzygnięcie, uzasadnienie i pouczenie. Odwołanie wnosi się w 14 dni od doręczenia, a od decyzji II instancji przysługuje skarga do WSA w 30 dni."],
    ["Налоговое решение", "Акт налогового органа, разрешающий дело по существу, например устанавливающий или определяющий размер обязательства.",
     "Устанавливающее решение создаёт обязательство со дня вручения (например, налог на наследство), а определяющее лишь определяет правильный размер обязательства, возникшего в силу закона. Решение содержит, в частности, правовое основание, резолютивную часть, обоснование и указание на порядок обжалования. Жалоба подаётся в течение 14 дней с вручения, а на решение II инстанции — жалоба в WSA в течение 30 дней."]);
  T("przedawnienie", ["decyzja-podatkowa", "postepowanie-podatkowe"],
    ["Przedawnienie zobowiązania podatkowego", "Wygaśnięcie zobowiązania podatkowego po upływie ustawowego terminu, jeśli nie zostało zapłacone ani skutecznie dochodzone.",
     "Bieg przedawnienia może zostać zawieszony albo przerwany w przypadkach z art. 70 Op, np. z dniem wszczęcia postępowania w sprawie o przestępstwo skarbowe, o którym podatnik został zawiadomiony. Sądy badają jednak, czy takie wszczęcie nie było instrumentalne (uchwała NSA I FPS 1/21). Po przedawnieniu postępowanie podatkowe się umarza."],
    ["Давность налогового обязательства", "Прекращение налогового обязательства по истечении законодательного срока, если оно не уплачено и не взыскано.",
     "Течение давности может быть приостановлено или прервано в случаях ст. 70 Op, например со дня возбуждения дела о фискальном преступлении, о котором налогоплательщик уведомлён. Но суды проверяют, не было ли такое возбуждение инструментальным (постановление NSA I FPS 1/21). После истечения давности налоговое производство прекращается."]);
})();
