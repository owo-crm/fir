// Słownik pojęć. Każde pojęcie: id, powiązane pojęcia, wersja PL i RU.
// n = nazwa, s = krótka definicja (popup, fiszka), l = rozwinięcie (strona pojęcia).
(function () {
  const G = [];
  const T = (id, rel, pl, ru) => G.push({ id, rel, pl: { n: pl[0], s: pl[1], l: pl[2] }, ru: { n: ru[0], s: ru[1], l: ru[2] } });

  // ---------- podstawy ----------
  T("ekonomia", ["rzadkosc", "makroekonomia", "mikroekonomia"],
    ["Ekonomia", "Nauka o tym, jak ludzie i społeczeństwa wykorzystują ograniczone zasoby, żeby zaspokoić swoje potrzeby.",
     "Potrzeb jest więcej niż zasobów, więc trzeba wybierać. Ekonomia bada te wybory: co produkować, jak i dla kogo. Dzieli się na mikroekonomię (pojedyncze rynki, firmy, gospodarstwa domowe) i makroekonomię (gospodarka jako całość)."],
    ["Экономика (наука)", "Наука о том, как люди и общества используют ограниченные ресурсы для удовлетворения своих потребностей.",
     "Потребностей больше, чем ресурсов, поэтому приходится выбирать. Экономическая наука изучает этот выбор: что производить, как и для кого. Делится на микроэкономику (отдельные рынки, фирмы, домохозяйства) и макроэкономику (экономика в целом)."]);
  T("makroekonomia", ["mikroekonomia", "pkb", "inflacja", "bezrobocie"],
    ["Makroekonomia", "Dział ekonomii, który bada gospodarkę jako całość: PKB, bezrobocie, inflację, wzrost i politykę państwa.",
     "Makroekonomia nie pyta, ile kosztuje jeden komputer, tylko dlaczego cała gospodarka rośnie albo się kurczy, skąd bierze się bezrobocie i inflacja i co mogą z tym zrobić rząd i bank centralny. Pracuje na wielkościach zagregowanych, czyli zsumowanych dla całego kraju."],
    ["Макроэкономика", "Раздел экономики, изучающий экономику в целом: ВВП, безработицу, инфляцию, рост и политику государства.",
     "Макроэкономика спрашивает не о цене одного компьютера, а о том, почему вся экономика растёт или сжимается, откуда берутся безработица и инфляция и что с этим могут сделать правительство и центральный банк. Она работает с агрегированными величинами, то есть суммированными по всей стране."]);
  T("mikroekonomia", ["makroekonomia", "rynek"],
    ["Mikroekonomia", "Dział ekonomii, który bada decyzje pojedynczych konsumentów i firm oraz działanie konkretnych rynków.",
     "Mikroekonomia odpowiada na pytania typu: jak kształtuje się cena komputerów, ile wyprodukuje firma, jak konsument dzieli swój budżet. Jej narzędzia (popyt, podaż, równowaga) są punktem wyjścia do makroekonomii."],
    ["Микроэкономика", "Раздел экономики, изучающий решения отдельных потребителей и фирм и работу конкретных рынков.",
     "Микроэкономика отвечает на вопросы вроде: как формируется цена компьютеров, сколько произведёт фирма, как потребитель распределяет бюджет. Её инструменты (спрос, предложение, равновесие) — отправная точка для макроэкономики."]);
  T("rzadkosc", ["ekonomia", "system-ekonomiczny"],
    ["Rzadkość", "Sytuacja, w której zasobów (pracy, ziemi, kapitału, czasu) jest za mało, by zaspokoić wszystkie potrzeby.",
     "Rzadkość to powód, dla którego w ogóle istnieje ekonomia. Skoro nie da się mieć wszystkiego, każde społeczeństwo musi rozstrzygnąć trzy problemy: co produkować, jak produkować i dla kogo."],
    ["Редкость (ограниченность)", "Ситуация, когда ресурсов (труда, земли, капитала, времени) не хватает для удовлетворения всех потребностей.",
     "Ограниченность ресурсов — причина существования экономической науки. Раз нельзя иметь всё, каждое общество решает три проблемы: что производить, как производить и для кого."]);
  T("system-ekonomiczny", ["rzadkosc", "rynek", "niewidzialna-reka"],
    ["System ekonomiczny", "Sposób, w jaki społeczeństwo rozstrzyga, co, jak i dla kogo produkować: przez tradycję, decyzje polityczne lub rynek.",
     "Na wykładzie wyróżniamy: kapitalizm amerykański (głównie rynek, wspierany polityką), socjalizm (głównie polityka, z elementami rynku), socjalizm demokratyczny UE, czyli socjokapitalizm (rynek + silna rola państwa), oraz komunizm (tylko decyzje polityczne)."],
    ["Экономическая система", "Способ, которым общество решает, что, как и для кого производить: через традицию, политические решения или рынок.",
     "На лекции выделяют: американский капитализм (в основном рынок, поддержанный политикой), социализм (в основном политика с элементами рынка), демократический социализм ЕС, то есть социокапитализм (рынок + сильная роль государства), и коммунизм (только политические решения)."]);

  // ---------- rynek ----------
  T("rynek", ["popyt", "podaz", "cena-rownowagi"],
    ["Rynek", "System współzależnych transakcji kupna i sprzedaży dóbr i usług.",
     "Rynek to nie tylko miejsce, ale każdy mechanizm, w którym kupujący i sprzedający się spotykają: sklep, giełda, aplikacja. Na rynku ustala się cena, która godzi plany obu stron."],
    ["Рынок", "Система взаимосвязанных сделок купли-продажи товаров и услуг.",
     "Рынок — это не только место, а любой механизм встречи покупателей и продавцов: магазин, биржа, приложение. На рынке устанавливается цена, согласующая планы обеих сторон."]);
  T("popyt", ["prawo-popytu", "podaz", "substytut", "dobro-komplementarne"],
    ["Popyt", "Ilości dobra, które nabywcy chcą i mogą kupić przy różnych cenach w danym czasie.",
     "Popyt to „zamiar kupna”, a nie sam zakup. Opisuje go krzywa popytu: przy każdej cenie pokazuje, ile ludzie kupiliby. Zmiana ceny przesuwa nas wzdłuż krzywej. Zmiana dochodów, gustów albo cen innych dóbr przesuwa całą krzywą."],
    ["Спрос", "Количество товара, которое покупатели хотят и могут купить при разных ценах за определённое время.",
     "Спрос — это «намерение купить», а не сама покупка. Его описывает кривая спроса: при каждой цене она показывает, сколько купили бы люди. Изменение цены — движение вдоль кривой. Изменение доходов, вкусов или цен других товаров сдвигает всю кривую."]);
  T("prawo-popytu", ["popyt", "paradoks-giffena", "efekt-veblena"],
    ["Prawo popytu", "Im niższa cena, tym większa ilość, którą ludzie chcą kupić (i odwrotnie).",
     "Działa z dwóch powodów. Efekt substytucji: droższe dobro zastępujemy tańszym. Efekt dochodowy: wyższa cena zmniejsza nasz realny dochód, więc kupujemy mniej. Wyjątki to paradoks Giffena i efekt Veblena."],
    ["Закон спроса", "Чем ниже цена, тем больше количество, которое люди хотят купить (и наоборот).",
     "Действует по двум причинам. Эффект замещения: дорожающий товар заменяем более дешёвым. Эффект дохода: рост цены уменьшает реальный доход, и мы покупаем меньше. Исключения — парадокс Гиффена и эффект Веблена."]);
  T("podaz", ["prawo-podazy", "popyt", "cena-rownowagi"],
    ["Podaż", "Ilości dobra, które sprzedawcy chcą zaoferować na rynku przy różnych cenach w danym czasie.",
     "Podaż to „skłonność do sprzedaży”. Krzywa podaży rośnie: wyższa cena zachęca do produkcji. Całą krzywą w prawo przesuwają nowe technologie, tańsze surowce i niższe podatki."],
    ["Предложение", "Количество товара, которое продавцы хотят предложить на рынке при разных ценах за определённое время.",
     "Предложение — это «склонность продать». Кривая предложения восходящая: более высокая цена стимулирует производство. Всю кривую вправо сдвигают новые технологии, дешёвое сырьё и снижение налогов."]);
  T("prawo-podazy", ["podaz"],
    ["Prawo podaży", "Im wyższa cena, tym więcej producenci chcą zaoferować na sprzedaż.",
     "Wyższa cena oznacza wyższy zysk, więc firmy rozszerzają produkcję, a na rynek wchodzą nowi producenci."],
    ["Закон предложения", "Чем выше цена, тем больше производители хотят предложить к продаже.",
     "Более высокая цена означает более высокую прибыль, поэтому фирмы расширяют производство, а на рынок приходят новые производители."]);
  T("cena-rownowagi", ["nadwyzka", "niedobor", "rynek"],
    ["Cena równowagi", "Cena, przy której ilość, którą kupujący chcą kupić, jest równa ilości, którą sprzedający chcą sprzedać (D = S).",
     "Przy cenie równowagi nie ma ani nadwyżki, ani niedoboru. Jeśli cena jest wyższa, powstaje nadwyżka i cena spada. Jeśli niższa, powstaje niedobór i cena rośnie."],
    ["Равновесная цена", "Цена, при которой количество, которое хотят купить, равно количеству, которое хотят продать (D = S).",
     "При равновесной цене нет ни избытка, ни дефицита. Если цена выше, возникает избыток и цена падает. Если ниже, возникает дефицит и цена растёт."]);
  T("nadwyzka", ["cena-rownowagi", "niedobor"],
    ["Nadwyżka", "Sytuacja, w której przy danej cenie podaż jest większa niż popyt: towar zalega w magazynach.",
     "Nadwyżka pojawia się, gdy cena jest powyżej ceny równowagi. Sprzedawcy obniżają ceny, żeby pozbyć się zapasów. W skali makro nadwyżki towarów to objaw recesji."],
    ["Избыток (излишек)", "Ситуация, когда при данной цене предложение больше спроса: товар залёживается на складах.",
     "Избыток возникает, когда цена выше равновесной. Продавцы снижают цены, чтобы избавиться от запасов. В макромасштабе избыток товаров — признак рецессии."]);
  T("niedobor", ["cena-rownowagi", "nadwyzka"],
    ["Niedobór", "Sytuacja, w której przy danej cenie popyt jest większy niż podaż: towaru brakuje.",
     "Niedobór pojawia się, gdy cena jest poniżej ceny równowagi. Kupujący przebijają się ofertami i cena rośnie. W skali makro powszechne niedobory to objaw przegrzania i inflacji."],
    ["Дефицит", "Ситуация, когда при данной цене спрос больше предложения: товара не хватает.",
     "Дефицит возникает, когда цена ниже равновесной. Покупатели готовы платить больше, и цена растёт. В макромасштабе массовый дефицит — признак перегрева и инфляции."]);
  T("substytut", ["popyt", "dobro-komplementarne"],
    ["Substytut", "Dobro, które może zastąpić inne dobro, np. laptop i komputer stacjonarny, masło i margaryna.",
     "Gdy substytut drożeje, popyt na nasze dobro rośnie (krzywa popytu przesuwa się w prawo)."],
    ["Товар-заменитель (субститут)", "Товар, который может заменить другой, например ноутбук и настольный компьютер, масло и маргарин.",
     "Когда заменитель дорожает, спрос на наш товар растёт (кривая спроса сдвигается вправо)."]);
  T("dobro-komplementarne", ["popyt", "substytut"],
    ["Dobro komplementarne", "Dobro używane razem z innym, np. komputer i oprogramowanie, samochód i paliwo.",
     "Gdy dobro komplementarne tanieje, popyt na nasze dobro rośnie (krzywa popytu przesuwa się w prawo)."],
    ["Дополняющий товар (комплемент)", "Товар, используемый вместе с другим, например компьютер и программы, автомобиль и топливо.",
     "Когда дополняющий товар дешевеет, спрос на наш товар растёт (кривая спроса сдвигается вправо)."]);
  T("niewidzialna-reka", ["szkola-klasyczna", "rynek"],
    ["Niewidzialna ręka rynku", "Idea Adama Smitha (1776): swobodne ceny i decyzje milionów ludzi same kierują zasoby tam, gdzie społeczeństwo ich potrzebuje.",
     "Nikt nie planuje centralnie, ile ma powstać komputerów. Gdy rośnie popyt, rośnie cena i zysk, więc przychodzą nowi producenci. Rynek działa tak, „jakby ludzie byli prowadzeni przez niewidzialną rękę”. To podstawa szkoły klasycznej."],
    ["Невидимая рука рынка", "Идея Адама Смита (1776): свободные цены и решения миллионов людей сами направляют ресурсы туда, где они нужны обществу.",
     "Никто централизованно не планирует, сколько выпустить компьютеров. Когда растёт спрос, растут цена и прибыль, и приходят новые производители. Рынок работает так, «как будто людей ведёт невидимая рука». Это основа классической школы."]);

  // ---------- PKB ----------
  T("pkb", ["pkb-realny", "pkb-nominalny", "pkb-per-capita", "dobra-finalne", "ad"],
    ["PKB", "Produkt krajowy brutto: wartość wszystkich dóbr i usług finalnych wytworzonych w kraju w ciągu roku (lub kwartału).",
     "PKB to najważniejsza miara wielkości gospodarki. Liczymy tylko dobra finalne, żeby nie liczyć tego samego dwa razy. Metodą wydatkową PKB = C + I + G + (X − M). Gdy PKB rośnie, mówimy o wzroście gospodarczym, a gdy spada przez dłuższy czas, o recesji."],
    ["ВВП", "Валовой внутренний продукт: стоимость всех конечных товаров и услуг, произведённых в стране за год (или квартал).",
     "ВВП — главный показатель размера экономики. Считаются только конечные товары, чтобы не посчитать одно и то же дважды. По методу расходов ВВП = C + I + G + (X − M). Когда ВВП растёт, говорят об экономическом росте, а когда долго падает — о рецессии."]);
  T("dobra-finalne", ["pkb"],
    ["Dobra finalne", "Dobra i usługi kupowane przez ostatecznego użytkownika, a nie do dalszej produkcji.",
     "Chleb kupiony w sklepie to dobro finalne. Mąka kupiona przez piekarnię to dobro pośrednie: jej wartość jest już ukryta w cenie chleba. Dlatego do PKB wliczamy tylko chleb."],
    ["Конечные товары", "Товары и услуги, приобретаемые конечным потребителем, а не для дальнейшего производства.",
     "Хлеб, купленный в магазине, — конечный товар. Мука, купленная пекарней, — промежуточный: её стоимость уже входит в цену хлеба. Поэтому в ВВП включается только хлеб."]);
  T("pkb-nominalny", ["pkb-realny", "pkb"],
    ["PKB nominalny", "PKB liczony w cenach bieżących, czyli z danego roku.",
     "PKB nominalny może rosnąć tylko dlatego, że wszystko podrożało, nawet jeśli wyprodukowano tyle samo. Dlatego do porównań w czasie używa się PKB realnego."],
    ["Номинальный ВВП", "ВВП в текущих ценах, то есть ценах данного года.",
     "Номинальный ВВП может расти только из-за того, что всё подорожало, даже если произвели столько же. Поэтому для сравнения во времени используют реальный ВВП."]);
  T("pkb-realny", ["pkb-nominalny", "pkb", "inflacja"],
    ["PKB realny", "PKB liczony w cenach stałych (z roku bazowego), czyli oczyszczony z wpływu inflacji.",
     "PKB realny pokazuje, czy naprawdę wyprodukowano więcej dóbr i usług. Gdy media podają „wzrost gospodarczy 3%”, chodzi o wzrost PKB realnego."],
    ["Реальный ВВП", "ВВП в постоянных ценах (базового года), то есть очищенный от влияния инфляции.",
     "Реальный ВВП показывает, действительно ли произведено больше товаров и услуг. Когда в новостях говорят «экономический рост 3%», имеется в виду рост реального ВВП."]);
  T("pkb-per-capita", ["pkb"],
    ["PKB per capita", "PKB podzielony przez liczbę mieszkańców kraju.",
     "Pozwala porównywać kraje o różnej wielkości i jest przybliżoną miarą poziomu życia. Duży kraj może mieć wysoki PKB, ale niski PKB na mieszkańca."],
    ["ВВП на душу населения", "ВВП, делённый на численность населения страны.",
     "Позволяет сравнивать страны разного размера и приблизительно отражает уровень жизни. Большая страна может иметь высокий ВВП, но низкий ВВП на душу."]);
  T("konsumpcja", ["pkb", "ad"],
    ["Konsumpcja (C)", "Wydatki gospodarstw domowych na dobra i usługi: jedzenie, ubrania, mieszkanie, rozrywkę, samochody.",
     "Największy składnik PKB, w Polsce około połowy. Dzieli się na dobra trwałe (np. pralka), nietrwałe (np. jedzenie) i usługi (np. fryzjer)."],
    ["Потребление (C)", "Расходы домохозяйств на товары и услуги: еду, одежду, жильё, развлечения, автомобили.",
     "Крупнейший компонент ВВП, в Польше около половины. Делится на товары длительного пользования (стиральная машина), кратковременного (еда) и услуги (парикмахер)."]);
  T("inwestycje", ["pkb", "ad"],
    ["Inwestycje (I)", "Wydatki firm na maszyny, budynki i oprogramowanie, budowa mieszkań oraz zmiana zapasów.",
     "Inwestycje to wydatki, które zwiększają przyszłe możliwości produkcji. Uwaga: kupno akcji to w ekonomii nie inwestycja, tylko zmiana właściciela aktywów. Inwestycje mocno wahają się w trakcie cyklu koniunkturalnego."],
    ["Инвестиции (I)", "Расходы фирм на оборудование, здания и программы, строительство жилья и изменение запасов.",
     "Инвестиции — расходы, увеличивающие будущие производственные возможности. Важно: покупка акций в экономике не инвестиция, а лишь смена владельца актива. Инвестиции сильно колеблются в ходе экономического цикла."]);
  T("wydatki-rzadowe", ["pkb", "polityka-fiskalna"],
    ["Wydatki rządowe (G)", "Zakupy dóbr i usług przez państwo i samorządy: drogi, szkoły, wojsko, pensje urzędników.",
     "Do G nie wliczamy transferów socjalnych (emerytur, zasiłków, 800+), bo państwo nic za nie nie kupuje, tylko przekazuje pieniądze."],
    ["Государственные расходы (G)", "Закупки товаров и услуг государством и самоуправлениями: дороги, школы, армия, зарплаты чиновников.",
     "В G не включаются социальные трансферты (пенсии, пособия, 800+), потому что государство ничего за них не покупает, а лишь передаёт деньги."]);
  T("eksport-netto", ["pkb", "ad"],
    ["Eksport netto (NX)", "Eksport minus import: NX = X − M.",
     "Eksport (X) to wydatki obcokrajowców na nasze towary. Import (M) to nasze wydatki na towary zagraniczne, które odejmujemy, bo nie zostały wytworzone w kraju. Gdy NX > 0, kraj ma nadwyżkę handlową."],
    ["Чистый экспорт (NX)", "Экспорт минус импорт: NX = X − M.",
     "Экспорт (X) — расходы иностранцев на наши товары. Импорт (M) — наши расходы на иностранные товары, которые вычитаются, потому что произведены не в стране. Когда NX > 0, у страны торговый профицит."]);

  // ---------- bezrobocie i inflacja ----------
  T("bezrobocie", ["stopa-bezrobocia", "bezrobocie-naturalne", "bezrobocie-cykliczne", "prawo-okuna"],
    ["Bezrobocie", "Sytuacja, w której osoby zdolne i chętne do pracy, akceptujące obowiązujące płace, nie mogą jej znaleźć.",
     "Bezrobotnym nie jest każdy, kto nie pracuje. Student czy emeryt, który nie szuka pracy, nie należy do siły roboczej. Bezrobocie to jeden z dwóch głównych problemów makroekonomii: oznacza zmarnowane zasoby i niższy PKB."],
    ["Безработица", "Ситуация, когда люди, способные и желающие работать на существующих условиях оплаты, не могут найти работу.",
     "Безработный — не каждый, кто не работает. Студент или пенсионер, не ищущий работу, не входит в рабочую силу. Безработица — одна из двух главных проблем макроэкономики: это потерянные ресурсы и более низкий ВВП."]);
  T("stopa-bezrobocia", ["bezrobocie", "sila-robocza"],
    ["Stopa bezrobocia", "Odsetek bezrobotnych w sile roboczej: u = bezrobotni / siła robocza × 100%.",
     "W Polsce GUS podaje stopę bezrobocia rejestrowanego (osoby zarejestrowane w urzędach pracy). W 2002–2004 wynosiła ok. 20%, w 2025 ok. 5%."],
    ["Уровень безработицы", "Доля безработных в рабочей силе: u = безработные / рабочая сила × 100%.",
     "В Польше GUS публикует уровень зарегистрированной безработицы (люди, зарегистрированные в бюро труда). В 2002–2004 он составлял около 20%, в 2025 — около 5%."]);
  T("sila-robocza", ["stopa-bezrobocia"],
    ["Siła robocza", "Wszyscy pracujący oraz bezrobotni, którzy aktywnie szukają pracy.",
     "Osoby, które nie pracują i nie szukają pracy (np. studenci dzienni, emeryci), są poza siłą roboczą i nie wliczają się do bezrobotnych."],
    ["Рабочая сила", "Все занятые плюс безработные, активно ищущие работу.",
     "Люди, которые не работают и не ищут работу (например, студенты дневной формы, пенсионеры), находятся вне рабочей силы и не считаются безработными."]);
  T("bezrobocie-naturalne", ["bezrobocie-frykcyjne", "produkcja-potencjalna", "bezrobocie-cykliczne"],
    ["Bezrobocie naturalne", "Bezrobocie, które istnieje nawet przy pełnym zatrudnieniu: frykcyjne i strukturalne.",
     "Zawsze ktoś zmienia pracę albo ma kwalifikacje, których rynek nie potrzebuje. Gdy jest tylko bezrobocie naturalne, mówimy o pełnym zatrudnieniu, a gospodarka produkuje na poziomie potencjalnym."],
    ["Естественная безработица", "Безработица, которая существует даже при полной занятости: фрикционная и структурная.",
     "Всегда кто-то меняет работу или имеет квалификацию, не нужную рынку. Когда есть только естественная безработица, говорят о полной занятости, и экономика производит на потенциальном уровне."]);
  T("bezrobocie-frykcyjne", ["bezrobocie-naturalne"],
    ["Bezrobocie frykcyjne", "Krótkotrwałe bezrobocie osób, które zmieniają pracę lub dopiero jej szukają.",
     "Absolwent, który przez dwa miesiące wybiera najlepszą ofertę, jest bezrobotny frykcyjnie. Takie bezrobocie nie jest problemem i nie da się go całkiem usunąć."],
    ["Фрикционная безработица", "Кратковременная безработица людей, которые меняют работу или только ищут её.",
     "Выпускник, который два месяца выбирает лучшее предложение, — фрикционный безработный. Это не проблема, и полностью её не устранить."]);
  T("bezrobocie-cykliczne", ["bezrobocie", "luka-recesyjna", "recesja"],
    ["Bezrobocie cykliczne", "Bezrobocie wywołane zbyt małymi łącznymi wydatkami w gospodarce, typowe dla recesji.",
     "Gdy ludzie, firmy i państwo kupują za mało, firmy ograniczają produkcję i zwalniają pracowników. Według Keynesa to bezrobocie przymusowe, które można zmniejszyć, zwiększając popyt."],
    ["Циклическая безработица", "Безработица из-за недостаточных совокупных расходов в экономике, характерная для рецессии.",
     "Когда люди, фирмы и государство покупают слишком мало, фирмы сокращают производство и увольняют работников. По Кейнсу это вынужденная безработица, которую можно уменьшить, увеличив спрос."]);
  T("inflacja", ["deflacja", "cpi", "cel-inflacyjny", "luka-inflacyjna"],
    ["Inflacja", "Trwały wzrost ogólnego poziomu cen w gospodarce, czyli spadek siły nabywczej pieniądza.",
     "Inflacja 10% oznacza, że koszyk zakupów, który rok temu kosztował 100 zł, teraz kosztuje 110 zł. Mierzy się ją zwykle wskaźnikiem cen towarów i usług konsumpcyjnych (CPI). W Polsce w 2022 r. wyniosła 14,4%."],
    ["Инфляция", "Устойчивый рост общего уровня цен в экономике, то есть снижение покупательной способности денег.",
     "Инфляция 10% означает, что корзина покупок, стоившая год назад 100 злотых, теперь стоит 110. Обычно её измеряют индексом потребительских цен (CPI). В Польше в 2022 году она составила 14,4%."]);
  T("deflacja", ["inflacja"],
    ["Deflacja", "Trwały spadek ogólnego poziomu cen.",
     "Brzmi dobrze, ale bywa groźna: ludzie odkładają zakupy, bo jutro będzie taniej, firmy sprzedają mniej i zwalniają. W Polsce deflacja wystąpiła w latach 2015–2016."],
    ["Дефляция", "Устойчивое снижение общего уровня цен.",
     "Звучит хорошо, но бывает опасна: люди откладывают покупки, потому что завтра будет дешевле, фирмы продают меньше и увольняют. В Польше дефляция была в 2015–2016 годах."]);
  T("cpi", ["inflacja"],
    ["CPI (wskaźnik cen konsumpcyjnych)", "Wskaźnik, który pokazuje, jak zmienia się cena typowego koszyka dóbr i usług kupowanych przez gospodarstwa domowe.",
     "GUS co miesiąc sprawdza ceny tysięcy produktów. Stopa inflacji to procentowa zmiana CPI: π = (CPI₁ − CPI₀) / CPI₀ × 100%."],
    ["CPI (индекс потребительских цен)", "Показатель изменения цены типичной корзины товаров и услуг, покупаемой домохозяйствами.",
     "GUS ежемесячно отслеживает цены тысяч товаров. Темп инфляции — процентное изменение CPI: π = (CPI₁ − CPI₀) / CPI₀ × 100%."]);
  T("cel-inflacyjny", ["nbp", "rpp", "inflacja"],
    ["Cel inflacyjny", "Poziom inflacji, który bank centralny chce utrzymać. Dla NBP: 2,5% z dopuszczalnym odchyleniem ± 1 punkt procentowy.",
     "Bank centralny nie dąży do zerowej inflacji, bo lekki wzrost cen jest bezpieczniejszy niż deflacja. Gdy inflacja przekracza 3,5%, RPP zwykle podnosi stopy procentowe."],
    ["Инфляционная цель", "Уровень инфляции, который центральный банк стремится поддерживать. Для NBP: 2,5% с допустимым отклонением ± 1 процентный пункт.",
     "Центробанк не стремится к нулевой инфляции, потому что умеренный рост цен безопаснее дефляции. Когда инфляция превышает 3,5%, RPP обычно повышает процентные ставки."]);
  T("nbp", ["rpp", "stopa-referencyjna", "polityka-pieniezna"],
    ["NBP", "Narodowy Bank Polski, czyli bank centralny Polski: emituje złotego i prowadzi politykę pieniężną.",
     "NBP nie obsługuje zwykłych klientów. Jest „bankiem banków”: reguluje ilość pieniądza i kredytu w gospodarce oraz poziom stóp procentowych, co wpływa na koniunkturę."],
    ["NBP", "Национальный банк Польши, центральный банк страны: выпускает злотый и проводит денежно-кредитную политику.",
     "NBP не обслуживает обычных клиентов. Это «банк банков»: он регулирует количество денег и кредита в экономике и уровень процентных ставок, что влияет на конъюнктуру."]);
  T("rpp", ["nbp", "stopa-referencyjna", "cel-inflacyjny"],
    ["RPP", "Rada Polityki Pieniężnej: organ NBP, który ustala stopy procentowe.",
     "RPP składa się z prezesa NBP i 9 członków powoływanych na 6 lat. Obecnie trwa V kadencja (2022–2028), przewodniczy jej prezes NBP Adam Glapiński."],
    ["RPP (Совет денежной политики)", "Орган NBP, который устанавливает процентные ставки.",
     "RPP состоит из председателя NBP и 9 членов, назначаемых на 6 лет. Сейчас идёт V созыв (2022–2028), его возглавляет председатель NBP Адам Глапиньский."]);
  T("stopa-referencyjna", ["rpp", "nbp", "polityka-pieniezna"],
    ["Stopa referencyjna", "Główna stopa procentowa NBP, od której zależy oprocentowanie kredytów i lokat w całej gospodarce.",
     "Gdy RPP podnosi stopę referencyjną, kredyty drożeją, ludzie i firmy wydają mniej, a inflacja słabnie. Od 9.10.2025 wynosi 4,50%. Rekordowo niska była w 2020 r. (0,10%), wysoka w 2022 r. (6,75%)."],
    ["Референсная ставка", "Основная процентная ставка NBP, от которой зависят проценты по кредитам и вкладам во всей экономике.",
     "Когда RPP повышает референсную ставку, кредиты дорожают, люди и фирмы тратят меньше, и инфляция замедляется. С 9.10.2025 она составляет 4,50%. Рекордно низкой была в 2020 году (0,10%), высокой — в 2022 (6,75%)."]);

  // ---------- AD-AS ----------
  T("ad", ["konsumpcja", "inwestycje", "wydatki-rzadowe", "eksport-netto", "sas"],
    ["Zagregowany popyt (AD)", "Łączne ilości dóbr i usług, które wszyscy nabywcy w kraju i za granicą chcą kupić przy danym poziomie cen.",
     "AD = C + I + G + (X − M). Krzywa AD opada: gdy ogólny poziom cen spada, realnie można kupić więcej. Całą krzywą przesuwają m.in. polityka fiskalna, polityka pieniężna i nastroje konsumentów."],
    ["Совокупный спрос (AD)", "Общий объём товаров и услуг, который все покупатели в стране и за рубежом хотят купить при данном уровне цен.",
     "AD = C + I + G + (X − M). Кривая AD нисходящая: когда общий уровень цен падает, реально можно купить больше. Всю кривую сдвигают фискальная и денежная политика, настроения потребителей и др."]);
  T("sas", ["las", "ad", "sztywne-ceny"],
    ["Krótkookresowa podaż (SAS)", "Łączna produkcja, którą firmy chcą wytworzyć przy różnych poziomach cen w krótkim okresie. Krzywa rośnie.",
     "W krótkim okresie płace są ustalone w umowach, więc wyższe ceny produktów oznaczają wyższe zyski i firmy produkują więcej. SAS przesuwa się w lewo, gdy rosną płace lub ceny surowców, a w prawo przy postępie technicznym."],
    ["Краткосрочное совокупное предложение (SAS)", "Общий объём выпуска, который фирмы готовы произвести при разных уровнях цен в краткосрочном периоде. Кривая восходящая.",
     "В краткосрочном периоде зарплаты зафиксированы в договорах, поэтому более высокие цены продукции означают большую прибыль, и фирмы производят больше. SAS сдвигается влево при росте зарплат или цен на сырьё, вправо — при техническом прогрессе."]);
  T("las", ["produkcja-potencjalna", "sas", "szkola-klasyczna"],
    ["Długookresowa podaż (LAS)", "Pionowa krzywa na poziomie produkcji potencjalnej Y*: w długim okresie produkcja nie zależy od poziomu cen.",
     "W długim okresie płace i ceny się dostosowują, więc ile gospodarka wyprodukuje, zależy tylko od zasobów (praca, kapitał) i technologii. LAS przesuwa się w prawo, gdy rośnie liczba pracowników, kapitał albo wydajność."],
    ["Долгосрочное совокупное предложение (LAS)", "Вертикальная кривая на уровне потенциального выпуска Y*: в долгосрочном периоде выпуск не зависит от уровня цен.",
     "В долгосрочном периоде зарплаты и цены подстраиваются, поэтому объём производства зависит только от ресурсов (труд, капитал) и технологий. LAS сдвигается вправо при росте числа работников, капитала или производительности."]);
  T("produkcja-potencjalna", ["las", "bezrobocie-naturalne", "luka-recesyjna", "luka-inflacyjna"],
    ["Produkcja potencjalna (Y*)", "PKB, jaki gospodarka wytwarza przy pełnym wykorzystaniu mocy i pełnym zatrudnieniu (tylko bezrobocie naturalne).",
     "To „normalna prędkość” gospodarki. Faktyczny PKB może być niższy (luka recesyjna) albo chwilowo wyższy (luka inflacyjna), np. gdy ludzie pracują w nadgodzinach."],
    ["Потенциальный выпуск (Y*)", "ВВП, который экономика производит при полном использовании мощностей и полной занятости (только естественная безработица).",
     "Это «нормальная скорость» экономики. Фактический ВВП может быть ниже (рецессионный разрыв) или временно выше (инфляционный разрыв), например когда люди работают сверхурочно."]);
  T("rownowaga-makro", ["ad", "sas", "las"],
    ["Równowaga makroekonomiczna", "Stan, w którym wartość wytworzonej produkcji (AS) równa się łącznym wydatkom (AD).",
     "Równowaga krótkookresowa: AD = SAS, może wystąpić przy recesji albo przegrzaniu. Równowaga długookresowa: AD = SAS = LAS, gospodarka jest na poziomie Y* i występuje tylko bezrobocie naturalne."],
    ["Макроэкономическое равновесие", "Состояние, при котором стоимость произведённой продукции (AS) равна совокупным расходам (AD).",
     "Краткосрочное равновесие: AD = SAS, возможно при рецессии или перегреве. Долгосрочное: AD = SAS = LAS, экономика на уровне Y*, есть только естественная безработица."]);
  T("luka-recesyjna", ["produkcja-potencjalna", "recesja", "bezrobocie-cykliczne"],
    ["Luka recesyjna (deflacyjna)", "Sytuacja, w której faktyczny PKB jest niższy od potencjalnego: maszyny stoją, ludzie są bezrobotni.",
     "Powstaje, gdy łączne wydatki są za małe. Zamknąć ją można przez spadek płac i cen (droga rynkowa, powolna), wzrost wydatków prywatnych albo aktywną politykę państwa: wyższe wydatki rządowe, niższe podatki, tańszy pieniądz."],
    ["Рецессионный (дефляционный) разрыв", "Ситуация, когда фактический ВВП ниже потенциального: оборудование простаивает, люди без работы.",
     "Возникает, когда совокупных расходов слишком мало. Закрыть его можно снижением зарплат и цен (рыночный путь, медленный), ростом частных расходов или активной политикой государства: ростом госрасходов, снижением налогов, удешевлением денег."]);
  T("luka-inflacyjna", ["produkcja-potencjalna", "inflacja"],
    ["Luka inflacyjna", "Sytuacja, w której faktyczny PKB jest wyższy od potencjalnego: gospodarka jest przegrzana, rosną płace i ceny.",
     "Powstaje, gdy wydatki są za duże. Sama się zamknie, bo płace i ceny wzrosną (SAS w lewo), ale gospodarka stanie się mniej konkurencyjna. Dlatego lepiej schłodzić popyt: ograniczyć wydatki rządowe, podnieść podatki lub stopy procentowe."],
    ["Инфляционный разрыв", "Ситуация, когда фактический ВВП выше потенциального: экономика перегрета, растут зарплаты и цены.",
     "Возникает, когда расходов слишком много. Закроется сам, потому что вырастут зарплаты и цены (SAS влево), но экономика станет менее конкурентоспособной. Поэтому лучше охладить спрос: сократить госрасходы, повысить налоги или ставки."]);
  T("recesja", ["luka-recesyjna", "bezrobocie-cykliczne", "pkb"],
    ["Recesja", "Faza cyklu koniunkturalnego, w której PKB spada, rośnie bezrobocie, a firmy mają nadwyżki towarów.",
     "Najczęściej mówi się o recesji, gdy realny PKB spada przez co najmniej dwa kwartały z rzędu. Głęboka i długa recesja to depresja (kryzys)."],
    ["Рецессия", "Фаза экономического цикла, когда ВВП падает, растёт безработица, а у фирм копятся излишки товаров.",
     "Обычно о рецессии говорят, когда реальный ВВП падает как минимум два квартала подряд. Глубокая и длительная рецессия — депрессия (кризис)."]);

  // ---------- polityka i szkoły ----------
  T("polityka-fiskalna", ["wydatki-rzadowe", "ad", "polityka-dyskrecjonalna"],
    ["Polityka fiskalna", "Wpływanie na gospodarkę przez wydatki państwa i podatki (budżet).",
     "Ekspansywna polityka fiskalna (więcej wydatków, niższe podatki) przesuwa AD w prawo. Restrykcyjna (cięcia, wyższe podatki) przesuwa AD w lewo. Decyduje o niej rząd i parlament."],
    ["Фискальная (бюджетная) политика", "Влияние на экономику через госрасходы и налоги (бюджет).",
     "Стимулирующая фискальная политика (больше расходов, ниже налоги) сдвигает AD вправо. Сдерживающая (сокращения, выше налоги) — влево. Решения принимают правительство и парламент."]);
  T("polityka-pieniezna", ["nbp", "stopa-referencyjna", "ad"],
    ["Polityka pieniężna", "Wpływanie na gospodarkę przez bank centralny: stopy procentowe, ilość pieniądza i kurs walutowy.",
     "Obniżka stóp procentowych tanieje kredyt, więc rosną konsumpcja i inwestycje (AD w prawo). Podwyżka stóp schładza gospodarkę i hamuje inflację. W Polsce prowadzi ją NBP, a stopy ustala RPP."],
    ["Денежно-кредитная политика", "Влияние на экономику через центральный банк: процентные ставки, количество денег и валютный курс.",
     "Снижение ставок удешевляет кредит, поэтому растут потребление и инвестиции (AD вправо). Повышение ставок охлаждает экономику и сдерживает инфляцию. В Польше её проводит NBP, а ставки устанавливает RPP."]);
  T("polityka-dyskrecjonalna", ["polityka-fiskalna", "polityka-pieniezna", "keynesizm"],
    ["Polityka dyskrecjonalna (aktywna)", "Świadome działania państwa, które mają wyrównywać wahania wydatków prywatnych i łagodzić recesje i boomy.",
     "Gdy prywatne wydatki spadają, państwo wydaje więcej. Gdy gospodarka się przegrzewa, ogranicza wydatki. To podejście keynesowskie. Klasycy uważają je za nieskuteczne w długim okresie."],
    ["Дискреционная (активная) политика", "Сознательные действия государства, компенсирующие колебания частных расходов и смягчающие спады и бумы.",
     "Когда частные расходы падают, государство тратит больше. Когда экономика перегревается, сокращает расходы. Это кейнсианский подход. Классики считают его неэффективным в долгосрочном периоде."]);
  T("szkola-klasyczna", ["niewidzialna-reka", "las", "prawo-saya", "keynesizm"],
    ["Szkoła klasyczna", "Nurt ekonomii (A. Smith, D. Ricardo, J.B. Say), według którego giętkie ceny i płace same przywracają pełne zatrudnienie.",
     "Klasycy analizują długi okres (model AD–LAS). Uważają, że produkcję ogranicza podaż, a zmiany popytu wpływają tylko na ceny. Zalecają liberalizm gospodarczy i ograniczoną rolę państwa."],
    ["Классическая школа", "Направление экономики (А. Смит, Д. Рикардо, Ж.-Б. Сэй), по которому гибкие цены и зарплаты сами восстанавливают полную занятость.",
     "Классики анализируют долгосрочный период (модель AD–LAS). Считают, что выпуск ограничен предложением, а изменения спроса влияют только на цены. Рекомендуют экономический либерализм и ограниченную роль государства."]);
  T("keynesizm", ["sztywne-ceny", "polityka-dyskrecjonalna", "prawo-keynesa", "szkola-klasyczna"],
    ["Keynesizm", "Nurt ekonomii J.M. Keynesa (1936), według którego w krótkim okresie produkcję ogranicza popyt, a państwo powinno go wspierać.",
     "Keynes analizuje krótki okres przy sztywnych cenach (model AD–SAS). Recesja może trwać długo, bo rynek sam się nie naprawia. Wtedy rząd powinien zwiększyć wydatki lub obniżyć podatki, a bank centralny obniżyć stopy."],
    ["Кейнсианство", "Направление экономики Дж. М. Кейнса (1936), по которому в краткосрочном периоде выпуск ограничен спросом, и государство должно его поддерживать.",
     "Кейнс анализирует краткосрочный период при жёстких ценах (модель AD–SAS). Рецессия может длиться долго, потому что рынок сам не исправляется. Тогда правительству следует увеличить расходы или снизить налоги, а центробанку — снизить ставки."]);
  T("sztywne-ceny", ["keynesizm", "sas"],
    ["Sztywne ceny i płace", "Założenie, że ceny i płace w krótkim okresie nie zmieniają się szybko, np. przez umowy i cenniki.",
     "Przy sztywnych cenach spadek popytu nie obniża cen, tylko produkcję i zatrudnienie. To kluczowe założenie modelu keynesowskiego."],
    ["Жёсткие цены и зарплаты", "Предположение, что в краткосрочном периоде цены и зарплаты меняются медленно, например из-за договоров и прайс-листов.",
     "При жёстких ценах падение спроса снижает не цены, а выпуск и занятость. Это ключевое предположение кейнсианской модели."]);
  T("mnoznik", ["keynesizm", "ad"],
    ["Mnożnik wydatków", "Liczba, która pokazuje, o ile wzrośnie PKB, gdy wydatki autonomiczne wzrosną o 1 zł: Y = m · A.",
     "Wydany złoty staje się czyimś dochodem, który ktoś znów częściowo wydaje. Dlatego wzrost wydatków o 1 mld zł może podnieść PKB o więcej niż 1 mld. Szczegóły poznamy przy modelu keynesowskim."],
    ["Мультипликатор расходов", "Число, показывающее, на сколько вырастет ВВП при росте автономных расходов на 1 злотый: Y = m · A.",
     "Потраченный злотый становится чьим-то доходом, который снова частично тратится. Поэтому рост расходов на 1 млрд может поднять ВВП больше чем на 1 млрд. Подробнее — в теме о кейнсианской модели."]);

  // ---------- prawa ekonomii ----------
  T("prawo-saya", ["szkola-klasyczna", "prawo-keynesa"],
    ["Prawo Saya", "„Podaż tworzy swój własny popyt”: ogólna nadprodukcja jest niemożliwa.",
     "J.B. Say (1767–1832) twierdził, że produkując, ludzie zarabiają dochody, za które kupią wytworzone dobra. Na tym opiera się szkoła klasyczna."],
    ["Закон Сэя", "«Предложение создаёт собственный спрос»: общее перепроизводство невозможно.",
     "Ж.-Б. Сэй (1767–1832) утверждал, что, производя, люди получают доходы, на которые купят произведённые товары. На этом основана классическая школа."]);
  T("prawo-keynesa", ["keynesizm", "prawo-saya", "bezrobocie-cykliczne"],
    ["Prawo Keynesa", "„Popyt tworzy swoją własną podaż”: w krótkim okresie produkcja zależy od popytu, a nadprodukcja jest możliwa.",
     "Przyczyną bezrobocia jest za mały popyt globalny. To odwrotność prawa Saya."],
    ["Закон Кейнса", "«Спрос создаёт собственное предложение»: в краткосрочном периоде выпуск зависит от спроса, перепроизводство возможно.",
     "Причина безработицы — недостаточный совокупный спрос. Это противоположность закона Сэя."]);
  T("prawo-okuna", ["bezrobocie", "pkb"],
    ["Prawo Okuna", "Każdy punkt procentowy bezrobocia powyżej stopy naturalnej obniża PKB o ok. 2,5% (dane dla USA).",
     "Arthur Okun (1928–1980) pokazał, ile kosztuje bezrobocie: to nie tylko problem bezrobotnych, ale strata dla całej gospodarki."],
    ["Закон Оукена", "Каждый процентный пункт безработицы сверх естественного уровня снижает ВВП примерно на 2,5% (данные по США).",
     "Артур Оукен (1928–1980) показал цену безработицы: это проблема не только безработных, но потеря для всей экономики."]);
  T("paradoks-giffena", ["prawo-popytu", "efekt-veblena"],
    ["Paradoks Giffena", "Przy bardzo niskich dochodach popyt na tanie dobro podstawowe (np. chleb) rośnie mimo wzrostu jego ceny.",
     "Biedna rodzina po podwyżce chleba nie stać już na droższe masło i mięso, więc kupuje… jeszcze więcej chleba. Przykład z XIX-wiecznej Irlandii."],
    ["Парадокс Гиффена", "При очень низких доходах спрос на дешёвый базовый товар (например, хлеб) растёт, несмотря на рост его цены.",
     "Бедная семья после подорожания хлеба уже не может позволить себе масло и мясо и покупает… ещё больше хлеба. Пример из Ирландии XIX века."]);
  T("efekt-veblena", ["prawo-popytu", "paradoks-giffena"],
    ["Efekt Veblena", "Popyt na dobra luksusowe rośnie, gdy rośnie ich cena, bo wysoka cena jest oznaką prestiżu.",
     "Thorstein Veblen (1899) nazwał to konsumpcją na pokaz. Dotyczy najbogatszych i dóbr luksusowych: drogich zegarków, torebek, samochodów."],
    ["Эффект Веблена", "Спрос на предметы роскоши растёт при росте их цены, потому что высокая цена — признак престижа.",
     "Торстейн Веблен (1899) назвал это демонстративным потреблением. Касается самых богатых и предметов роскоши: дорогих часов, сумок, автомобилей."]);
  T("prawo-engla", ["popyt"],
    ["Prawo Engla", "Gdy dochody rosną, wydatki na żywność też rosną, ale wolniej, więc ich udział w budżecie spada.",
     "Ernst Engel (1821–1896). Bogata rodzina wydaje na jedzenie więcej złotówek, ale mniejszy procent dochodu niż rodzina uboga."],
    ["Закон Энгеля", "Когда доходы растут, расходы на еду тоже растут, но медленнее, поэтому их доля в бюджете падает.",
     "Эрнст Энгель (1821–1896). Богатая семья тратит на еду больше злотых, но меньший процент дохода, чем бедная."]);
  T("prawo-greshama", ["nbp"],
    ["Prawo Kopernika-Greshama", "„Gorszy pieniądz wypiera lepszy”: lepszy pieniądz ludzie chowają, w obiegu zostaje gorszy.",
     "Gdy w obiegu były monety o tej samej wartości nominalnej, ale różnej zawartości złota, ludzie gromadzili cenniejsze, a płacili tymi gorszymi. Opisał to już Mikołaj Kopernik."],
    ["Закон Коперника–Грешема", "«Худшие деньги вытесняют лучшие»: лучшие деньги люди припрятывают, в обороте остаются худшие.",
     "Когда в обороте были монеты одного номинала, но с разным содержанием золота, люди копили более ценные, а платили худшими. Это описал ещё Николай Коперник."]);
  T("malejace-przychody", ["podaz"],
    ["Prawo malejących przychodów", "Po pewnym poziomie każda kolejna jednostka czynnika produkcji daje coraz mniejszy przyrost produkcji.",
     "Pierwszy pracownik w małej kawiarni bardzo zwiększa sprzedaż, dziesiąty już przeszkadza innym. Zakłada się, że pozostałe czynniki są stałe (ceteris paribus)."],
    ["Закон убывающей отдачи", "После определённого уровня каждая следующая единица фактора производства даёт всё меньший прирост выпуска.",
     "Первый работник в маленьком кафе сильно увеличивает продажи, десятый уже мешает другим. Остальные факторы считаются неизменными (ceteris paribus)."]);
  T("paradoks-oszczednosci", ["keynesizm", "ad"],
    ["Paradoks oszczędności", "Gdy wszyscy naraz zaczynają więcej oszczędzać, spada popyt, produkcja i dochody, więc łączne oszczędności mogą nawet spaść.",
     "Dla jednej rodziny oszczędzanie jest rozsądne. Gdy robi to całe społeczeństwo, firmy sprzedają mniej, zwalniają ludzi i dochody spadają. To argument Keynesa za podtrzymywaniem popytu w recesji."],
    ["Парадокс бережливости", "Когда все одновременно начинают больше сберегать, падают спрос, выпуск и доходы, и суммарные сбережения могут даже снизиться.",
     "Для одной семьи сбережения разумны. Когда так делает всё общество, фирмы продают меньше, увольняют людей, и доходы падают. Это аргумент Кейнса за поддержку спроса в рецессии."]);
  T("prawo-lassallea", ["bezrobocie"],
    ["Spiżowe prawo płacy (Lassalle)", "Pogląd, że płace w długim okresie spadają do minimum potrzebnego do utrzymania robotnika i jego rodziny.",
     "Gdy płaca rośnie, rośnie liczba robotników i płaca znów spada. Ferdinand Lassalle (1825–1864) opierał się na Malthusie i Ricardo. Prawo sprawdzało się mniej więcej do połowy XIX wieku."],
    ["«Железный закон» зарплаты (Лассаль)", "Взгляд, что зарплаты в долгосрочном периоде снижаются до минимума, необходимого для содержания рабочего и его семьи.",
     "Когда зарплата растёт, растёт число рабочих, и зарплата снова падает. Фердинанд Лассаль (1825–1864) опирался на Мальтуса и Рикардо. Закон примерно работал до середины XIX века."]);

  window.GLOSSARY = G;
})();
