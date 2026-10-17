// Słownik pojęć — Podstawy inwestycji (subj: "inwest").
(function () {
  const G = window.GLOSSARY;
  const T = (id, rel, pl, ru) => G.push({ id, subj: "inwest", rel, pl: { n: pl[0], s: pl[1], l: pl[2] }, ru: { n: ru[0], s: ru[1], l: ru[2] } });

  // ---------- podstawy ----------
  T("inwestycja", ["przedsiewziecie-inwestycyjne", "ryzyko-inwestycyjne", "wartosc-pieniadza-w-czasie", "inwestycje"],
    ["Inwestycja", "Zaangażowanie pieniędzy lub innych zasobów dziś w nadziei na niepewne korzyści w przyszłości.",
     "Inwestycja oznacza rezygnację z bieżącej konsumpcji. Nakład ponosimy teraz i znamy jego wysokość, a korzyści (przychody, oszczędności, wzrost wartości) przyjdą później i są niepewne. Dlatego każda ocena inwestycji musi uwzględniać czas i ryzyko. W finansach inwestycją jest zarówno budowa fabryki, jak i zakup akcji czy obligacji."],
    ["Инвестиция", "Вложение денег или других ресурсов сегодня в надежде на неопределённые выгоды в будущем.",
     "Инвестиция означает отказ от текущего потребления. Затраты несём сейчас и знаем их размер, а выгоды (доходы, экономия, рост стоимости) придут позже и неопределённы. Поэтому любая оценка инвестиции должна учитывать время и риск. В финансах инвестиция — это и строительство завода, и покупка акций или облигаций."]);
  T("przedsiewziecie-inwestycyjne", ["inwestycja", "zadanie-inwestycyjne", "projekt-inwestycyjny"],
    ["Przedsięwzięcie inwestycyjne", "Całość działań prowadzących do realizacji inwestycji, z własnym budżetem i harmonogramem.",
     "Przedsięwzięcie to konkretne wcielenie idei inwestycji, np. budowa centrum logistycznego. Składa się z zadań inwestycyjnych, które można osobno planować i rozliczać, a ich efektem są obiekty. Ma określony cel, nakłady, czas realizacji i oczekiwane efekty."],
    ["Инвестиционное мероприятие", "Совокупность действий для реализации инвестиции, со своим бюджетом и графиком.",
     "Мероприятие (przedsięwzięcie inwestycyjne) — конкретное воплощение идеи инвестиции, например строительство логистического центра. Оно состоит из инвестиционных задач, которые можно отдельно планировать и учитывать, а их результат — объекты. У него есть цель, затраты, срок реализации и ожидаемые эффекты."]);
  T("zadanie-inwestycyjne", ["przedsiewziecie-inwestycyjne", "obiekt-inwestycyjny"],
    ["Zadanie inwestycyjne", "Wyodrębniona część przedsięwzięcia, którą można osobno zaplanować, zrealizować i rozliczyć.",
     "Duże przedsięwzięcie dzieli się na zadania, np. budowa hali, drogi dojazdowej i systemu IT. Podział ułatwia zarządzanie, kontrolę kosztów i terminów. Efektem zadania jest zwykle jeden lub kilka obiektów inwestycyjnych."],
    ["Инвестиционная задача", "Выделенная часть мероприятия, которую можно отдельно спланировать, выполнить и учесть.",
     "Крупное мероприятие делится на задачи (zadania), например строительство склада, подъездной дороги и IT-системы. Такое деление облегчает управление, контроль затрат и сроков. Результат задачи — обычно один или несколько инвестиционных объектов."]);
  T("obiekt-inwestycyjny", ["zadanie-inwestycyjne", "przedsiewziecie-inwestycyjne"],
    ["Obiekt inwestycyjny", "Konkretny, fizyczny efekt inwestycji, który po oddaniu do użytku może samodzielnie funkcjonować.",
     "Obiektem jest np. gotowa hala magazynowa, zajezdnia tramwajowa czy linia produkcyjna. To najniższy poziom w hierarchii: przedsięwzięcie → zadanie → obiekt. Odbiór obiektu kończy jego realizację i otwiera fazę eksploatacji."],
    ["Инвестиционный объект", "Конкретный физический результат инвестиции, способный после ввода работать самостоятельно.",
     "Объект (obiekt inwestycyjny) — например, готовый склад, трамвайное депо или производственная линия. Это нижний уровень иерархии: мероприятие → задача → объект. Приёмка объекта завершает его реализацию и открывает фазу эксплуатации."]);
  T("inwestycja-rzeczowa", ["inwestycja-finansowa", "inwestycja", "amortyzacja"],
    ["Inwestycja rzeczowa", "Inwestycja w aktywa materialne lub niematerialne używane w działalności: maszyny, budynki, oprogramowanie.",
     "Inwestycje rzeczowe tworzą lub powiększają majątek produkcyjny. Realizują je głównie przedsiębiorstwa i sektor publiczny. Mają zwykle niską płynność, długi horyzont i ocenia się je rachunkiem przepływów pieniężnych (okres zwrotu, NPV, IRR)."],
    ["Реальная инвестиция", "Инвестиция в материальные или нематериальные активы для деятельности: станки, здания, ПО.",
     "Реальные инвестиции (inwestycje rzeczowe) создают или увеличивают производственный капитал. Их осуществляют в основном предприятия и государственный сектор. Обычно у них низкая ликвидность, длинный горизонт, а оценивают их расчётом денежных потоков (срок окупаемости, NPV, IRR)."]);
  T("inwestycja-finansowa", ["inwestycja-rzeczowa", "akcja", "obligacja", "fundusz-inwestycyjny"],
    ["Inwestycja finansowa", "Nabycie instrumentu dającego prawo do przyszłych dochodów: akcji, obligacji, jednostek funduszu, lokaty.",
     "Inwestor finansowy nie kupuje maszyny, lecz prawo do odsetek, dywidend lub udziału we wzroście wartości. Instrumenty finansowe są zwykle bardziej płynne niż aktywa rzeczowe i dostępne od niewielkich kwot. Ich ocena wymaga analizy emitenta, rynku i ryzyka."],
    ["Финансовая инвестиция", "Покупка инструмента, дающего право на будущие доходы: акций, облигаций, паёв, депозита.",
     "Финансовый инвестор покупает не станок, а право на проценты, дивиденды или участие в росте стоимости. Финансовые инструменты обычно ликвиднее реальных активов и доступны с небольших сумм. Их оценка требует анализа эмитента, рынка и риска."]);
  T("inwestycja-bezposrednia", ["inwestycja-posrednia", "akcja"],
    ["Inwestowanie bezpośrednie", "Samodzielny wybór i zakup aktywów przez inwestora, np. konkretnych akcji, obligacji czy mieszkania.",
     "Inwestor sam podejmuje decyzje, sam ponosi ich skutki i nie płaci za zarządzanie. Wymaga to czasu, wiedzy i odpowiedniego kapitału na dywersyfikację. Uwaga: w finansach międzynarodowych „bezpośrednie inwestycje zagraniczne” oznaczają coś innego — zakup udziału dającego wpływ na zarządzanie firmą."],
    ["Прямое инвестирование", "Самостоятельный выбор и покупка активов инвестором, например конкретных акций, облигаций или квартиры.",
     "Инвестор сам принимает решения, сам несёт последствия и не платит за управление. Это требует времени, знаний и достаточного капитала для диверсификации. Внимание: в международных финансах «прямые иностранные инвестиции» означают другое — покупку доли, дающей влияние на управление фирмой."]);
  T("inwestycja-posrednia", ["inwestycja-bezposrednia", "fundusz-inwestycyjny", "tfi"],
    ["Inwestowanie pośrednie", "Powierzenie pieniędzy instytucji (np. funduszowi), która inwestuje je w imieniu inwestora.",
     "Decyzje o wyborze aktywów podejmuje zawodowy zarządzający, a inwestor wybiera tylko fundusz lub strategię. Zaletą jest dywersyfikacja i profesjonalne zarządzanie od małych kwot, wadą — opłaty i brak wpływu na konkretne decyzje. Typowy przykład to fundusze inwestycyjne i ETF-y."],
    ["Косвенное инвестирование", "Передача денег учреждению (например, фонду), которое инвестирует их от имени инвестора.",
     "Решения о выборе активов принимает профессиональный управляющий, а инвестор выбирает лишь фонд или стратегию. Плюс — диверсификация и профессиональное управление с небольших сумм, минус — комиссии и отсутствие влияния на конкретные решения. Типичный пример — инвестиционные фонды и ETF."]);
  T("projekt-inwestycyjny", ["proces-inwestycyjny", "studium-wykonalnosci", "przedsiewziecie-inwestycyjne"],
    ["Projekt inwestycyjny", "Zaplanowane przedsięwzięcie o określonym celu, budżecie, czasie realizacji i oczekiwanych efektach.",
     "Projekt ma początek i koniec, a jego wynik da się zmierzyć. Opisuje się go w biznesplanie, studium wykonalności i harmonogramie. Cykl rozwoju projektu obejmuje fazę przedinwestycyjną, inwestycyjną (realizacyjną) i operacyjną."],
    ["Инвестиционный проект", "Спланированное мероприятие с определённой целью, бюджетом, сроком реализации и ожидаемыми эффектами.",
     "У проекта есть начало и конец, а результат можно измерить. Его описывают в бизнес-плане, ТЭО и графике. Цикл развития проекта включает прединвестиционную, инвестиционную (реализационную) и операционную фазы."]);
  T("proces-inwestycyjny", ["projekt-inwestycyjny", "inwestor", "studium-wykonalnosci"],
    ["Proces inwestycyjny", "Uporządkowany ciąg działań od pomysłu, przez decyzję i realizację, do eksploatacji i oceny efektów.",
     "Proces opisuje, jak i w jakiej kolejności realizuje się inwestycję. Uczestniczą w nim inwestor, projektant, wykonawca, inspektor nadzoru, instytucje finansujące i organy administracji. Inwestor indywidualny przechodzi uproszczony proces: cel, analiza, zakup, monitorowanie, wyjście i ocena."],
    ["Инвестиционный процесс", "Упорядоченная последовательность действий от идеи через решение и реализацию до эксплуатации и оценки.",
     "Процесс описывает, как и в каком порядке реализуется инвестиция. В нём участвуют инвестор, проектировщик, подрядчик, инспектор надзора, финансирующие учреждения и органы администрации. Частный инвестор проходит упрощённый процесс: цель, анализ, покупка, мониторинг, выход и оценка."]);
  T("inwestor", ["proces-inwestycyjny", "ryzyko-inwestycyjne"],
    ["Inwestor", "Podmiot, który podejmuje decyzję inwestycyjną, finansuje ją i ponosi jej ryzyko.",
     "Inwestor ma cel, wybiera przedsięwzięcie lub instrument, zapewnia kapitał (własny lub dłużny) i staje się właścicielem efektów. W procesie budowlanym to on zleca projekt i roboty oraz odbiera obiekt. Inwestorem może być osoba, firma, fundusz lub państwo."],
    ["Инвестор", "Субъект, который принимает инвестиционное решение, финансирует его и несёт риск.",
     "У инвестора есть цель, он выбирает мероприятие или инструмент, обеспечивает капитал (собственный или заёмный) и становится владельцем результатов. В строительном процессе он заказывает проект и работы и принимает объект. Инвестором может быть человек, фирма, фонд или государство."]);
  T("studium-wykonalnosci", ["projekt-inwestycyjny", "npv", "analiza-wrazliwosci"],
    ["Studium wykonalności", "Szczegółowa analiza projektu przed decyzją: rynek, technologia, koszty, finansowanie, przepływy, ryzyko.",
     "Studium wykonalności (feasibility study) powstaje w fazie przedinwestycyjnej i odpowiada na pytanie, czy projekt jest możliwy i opłacalny. Zawiera prognozy przepływów, ocenę opłacalności (np. NPV) i analizę ryzyka. Błędy wykryte na tym etapie kosztują najmniej."],
    ["ТЭО (технико-экономическое обоснование)", "Детальный анализ проекта до решения: рынок, технология, затраты, финансирование, потоки, риск.",
     "ТЭО (studium wykonalności, feasibility study) готовится в прединвестиционной фазе и отвечает на вопрос, возможен ли и выгоден ли проект. Оно содержит прогноз потоков, оценку окупаемости (например, NPV) и анализ риска. Ошибки, найденные на этом этапе, обходятся дешевле всего."]);

  // ---------- Eurocash i przepływy ----------
  T("cena-zakupu", ["wklad-wlasny", "dlug"],
    ["Cena zakupu", "Wartość całej transakcji nabycia aktywa.",
     "Cena zakupu jest finansowana wkładem własnym i długiem: cena = wkład + dług. W Eurocash to pierwsza z czterech liczb każdej okazji. Przy wycenie aktywów na koniec gry można ją przyjąć za podstawę wyceny, gdy wartość rynkowa jest nieznana."],
    ["Цена покупки", "Стоимость всей сделки по приобретению актива.",
     "Цена покупки финансируется собственным вкладом и долгом: цена = вклад + долг. В Eurocash это первое из четырёх чисел каждой возможности. При оценке активов в конце игры её можно принять за основу, если рыночная стоимость неизвестна."]);
  T("wklad-wlasny", ["cena-zakupu", "dlug", "dzwignia-finansowa"],
    ["Wkład własny", "Gotówka inwestora zaangażowana w zakup — część ceny niefinansowana długiem.",
     "Od wkładu własnego liczymy zwrot dla właściciela: relację rocznego przepływu do wkładu i czas odzyskania wkładu. Im mniejszy wkład przy tej samej cenie, tym większa dźwignia i tym silniej zmiany wartości wpływają na wynik. Większy wkład oznacza też mniejszą rezerwę gotówki po zakupie."],
    ["Собственный вклад", "Наличные инвестора, вложенные в покупку, — часть цены, не покрытая долгом.",
     "От собственного вклада (wkład własny) считают доходность для владельца: отношение годового потока к вкладу и срок возврата вклада. Чем меньше вклад при той же цене, тем больше рычаг и тем сильнее изменения стоимости влияют на результат. Больший вклад означает и меньший резерв наличных после покупки."]);
  T("dlug", ["wklad-wlasny", "dzwignia-finansowa"],
    ["Dług", "Obce finansowanie zakupu, które trzeba spłacić — np. kredyt.",
     "Dług pozwala kupić aktywo większe, niż wynikałoby z własnej gotówki, ale wymaga obsługi (odsetek, rat) i spłaty, także przy sprzedaży. W Eurocash przy sprzedaży najpierw spłaca się dług. Dług tworzy dźwignię finansową, która powiększa zarówno zyski, jak i straty właściciela."],
    ["Долг", "Заёмное финансирование покупки, которое нужно погасить, — например, кредит.",
     "Долг позволяет купить актив больше, чем позволяют свои деньги, но требует обслуживания (проценты, платежи) и погашения, в том числе при продаже. В Eurocash при продаже сначала гасится долг. Долг создаёт финансовый рычаг, который увеличивает и прибыль, и убытки владельца."]);
  T("przychod-pasywny", ["przeplyw-pieniezny", "okres-zwrotu"],
    ["Przychód pasywny", "Regularny dochód z posiadanego aktywa, niewymagający bieżącej pracy — np. czynsz, dywidenda.",
     "W Eurocash przychód pasywny z karty już uwzględnia koszty danej inwestycji, więc nie odejmuje się ich ponownie; pełni rolę miesięcznego przepływu netto. Służy do liczenia rocznego przepływu (× 12), relacji do wkładu i czasu odzyskania wkładu."],
    ["Пассивный доход", "Регулярный доход от актива, не требующий текущей работы, — например, аренда, дивиденд.",
     "В Eurocash пассивный доход на карточке уже учитывает расходы инвестиции, поэтому их не вычитают повторно; он играет роль ежемесячного чистого потока. Используется для расчёта годового потока (× 12), отношения к вкладу и срока возврата вклада."]);
  T("przeplyw-pieniezny", ["npv", "okres-zwrotu", "przychod-pasywny"],
    ["Przepływ pieniężny", "Rzeczywisty wpływ lub wydatek gotówki związany z inwestycją w danym okresie.",
     "Przepływy pieniężne (cash flow) to podstawa oceny inwestycji: nakład to przepływ ujemny, a przychody i oszczędności — dodatnie. W odróżnieniu od zysku księgowego nie zawierają amortyzacji. Metody dyskontowe (NPV, IRR) operują właśnie na przepływach."],
    ["Денежный поток", "Фактическое поступление или расход денег, связанные с инвестицией в данном периоде.",
     "Денежные потоки (cash flow) — основа оценки инвестиций: затраты — отрицательный поток, доходы и экономия — положительные. В отличие от бухгалтерской прибыли они не включают амортизацию. Дисконтные методы (NPV, IRR) работают именно с потоками."]);
  T("okres-zwrotu", ["przeplyw-pieniezny", "npv", "arr"],
    ["Okres zwrotu", "Czas, po którym suma przepływów z inwestycji zrówna się z nakładem.",
     "Prosty okres zwrotu przy równych przepływach = nakład / roczny przepływ; przy nierównych sumuje się przepływy rok po roku. Metoda jest prosta i pokazuje szybkość odzyskania gotówki, ale pomija wartość pieniądza w czasie i przepływy po okresie zwrotu. W Eurocash odpowiada mu czas odzyskania wkładu (wkład / przepływ miesięczny)."],
    ["Срок окупаемости", "Время, за которое сумма потоков от инвестиции сравняется с затратами.",
     "Простой срок окупаемости при равных потоках = затраты / годовой поток; при неравных потоки суммируют год за годом. Метод простой и показывает скорость возврата денег, но не учитывает стоимость денег во времени и потоки после окупаемости. В Eurocash ему соответствует срок возврата вклада (вклад / месячный поток)."]);
  T("dzwignia-finansowa", ["dlug", "wklad-wlasny", "ryzyko-inwestycyjne"],
    ["Dźwignia finansowa", "Efekt finansowania długiem: powiększa zyski i straty liczone względem wkładu własnego.",
     "Ponieważ dług jest stały, cała zmiana wartości aktywa obciąża wkład właściciela. W przykładzie z Eurocash zmiana ceny A o ±10% dała +33,33% lub −46,67% wkładu. Dźwignia zwiększa potencjalny zwrot, ale też ryzyko, zwłaszcza gdy przepływy spadają."],
    ["Финансовый рычаг", "Эффект финансирования долгом: увеличивает прибыль и убытки относительно собственного вклада.",
     "Поскольку долг постоянен, всё изменение стоимости актива ложится на вклад владельца. В примере Eurocash изменение цены A на ±10% дало +33,33% или −46,67% вклада. Рычаг повышает потенциальную доходность, но и риск, особенно при падении потоков."]);
  T("stopa-zwrotu", ["premia-za-ryzyko", "irr", "odchylenie-standardowe"],
    ["Stopa zwrotu", "Zysk lub strata z inwestycji wyrażone w procentach zainwestowanej kwoty.",
     "Dla akcji: (cena sprzedaży − cena zakupu + dywidenda) / cena zakupu. Oczekiwana stopa zwrotu to średnia ważona prawdopodobieństwami scenariuszy. Należy odróżniać stopę nominalną od realnej (po uwzględnieniu inflacji) i pamiętać, że wyższa oczekiwana stopa idzie w parze z wyższym ryzykiem."],
    ["Норма доходности", "Прибыль или убыток от инвестиции в процентах от вложенной суммы.",
     "Для акции: (цена продажи − цена покупки + дивиденд) / цена покупки. Ожидаемая доходность — средневзвешенная по вероятностям сценариев. Нужно различать номинальную и реальную (с учётом инфляции) доходность и помнить, что более высокая ожидаемая доходность идёт рядом с более высоким риском."]);

  // ---------- matematyka finansowa ----------
  T("wartosc-pieniadza-w-czasie", ["dyskontowanie", "procent-skladany", "koszt-alternatywny"],
    ["Wartość pieniądza w czasie", "Zasada, że ta sama kwota otrzymana wcześniej jest warta więcej niż otrzymana później.",
     "Powody: możliwość zainwestowania pieniędzy (koszt alternatywny), inflacja, ryzyko, że przyszła płatność nie nadejdzie, oraz preferencja bieżącej konsumpcji. Zasada ta jest podstawą matematyki finansowej: wartości przyszłej, bieżącej, dyskontowania, NPV i IRR."],
    ["Стоимость денег во времени", "Принцип: одна и та же сумма, полученная раньше, стоит больше, чем полученная позже.",
     "Причины: возможность вложить деньги (альтернативные издержки), инфляция, риск неполучения будущего платежа и предпочтение текущего потребления. Этот принцип — основа финансовой математики: будущей и текущей стоимости, дисконтирования, NPV и IRR."]);
  T("procent-prosty", ["procent-skladany", "wartosc-przyszla"],
    ["Procent prosty", "Sposób naliczania odsetek zawsze od kwoty początkowej: FV = PV × (1 + r × n).",
     "Przy procencie prostym odsetki nie są doliczane do kapitału, więc co roku przynoszą tę samą kwotę. Przykład: 10 000 zł na 5% przez 3 lata daje 11 500 zł. W długim okresie procent prosty daje wyraźnie mniej niż składany."],
    ["Простые проценты", "Начисление процентов всегда на начальную сумму: FV = PV × (1 + r × n).",
     "При простых процентах проценты не присоединяются к капиталу, поэтому каждый год приносят одинаковую сумму. Пример: 10 000 зл под 5% на 3 года дают 11 500 зл. В долгосрочной перспективе простые проценты дают заметно меньше сложных."]);
  T("procent-skladany", ["procent-prosty", "wartosc-przyszla", "wartosc-pieniadza-w-czasie"],
    ["Procent składany", "Naliczanie odsetek także od wcześniej dopisanych odsetek (kapitalizacja): FV = PV × (1 + r)ⁿ.",
     "Kapitał rośnie wykładniczo, jak kula śnieżna. Przykład: 10 000 zł na 5% przez 10 lat daje ok. 16 288,95 zł, a przy procencie prostym 15 000 zł. Reguła 72 szacuje czas podwojenia kapitału: 72 / stopa w %. Procent składany działa też na niekorzyść — np. przy wysokich opłatach funduszu."],
    ["Сложные проценты", "Начисление процентов и на ранее начисленные проценты (капитализация): FV = PV × (1 + r)ⁿ.",
     "Капитал растёт экспоненциально, как снежный ком. Пример: 10 000 зл под 5% на 10 лет дают около 16 288,95 зл, а при простых процентах — 15 000 зл. Правило 72 оценивает время удвоения капитала: 72 / ставка в %. Сложные проценты действуют и во вред — например, при высоких комиссиях фонда."]);
  T("wartosc-przyszla", ["wartosc-biezaca", "procent-skladany"],
    ["Wartość przyszła (FV)", "Wartość, jaką dzisiejsza kwota osiągnie po n okresach przy danej stopie procentowej.",
     "Przy kapitalizacji rocznej FV = PV × (1 + r)ⁿ. Liczenie wartości przyszłej to tzw. oprocentowanie lub kapitalizacja. Odwrotną operacją jest dyskontowanie, które z wartości przyszłej wyznacza wartość bieżącą."],
    ["Будущая стоимость (FV)", "Стоимость, которой сегодняшняя сумма достигнет через n периодов при данной ставке.",
     "При ежегодной капитализации FV = PV × (1 + r)ⁿ. Расчёт будущей стоимости называют наращением или капитализацией. Обратная операция — дисконтирование, которое по будущей стоимости находит текущую."]);
  T("wartosc-biezaca", ["wartosc-przyszla", "dyskontowanie", "npv"],
    ["Wartość bieżąca (PV)", "Dzisiejsza wartość kwoty, którą otrzymamy w przyszłości: PV = FV / (1 + r)ⁿ.",
     "Wartość bieżąca pozwala porównać kwoty z różnych okresów. Przykład: 10 000 zł za 2 lata przy stopie 8% jest dziś warte ok. 8 573,39 zł. Im wyższa stopa i dłuższy okres, tym niższa wartość bieżąca. Suma wartości bieżących przepływów minus nakład to NPV."],
    ["Текущая стоимость (PV)", "Сегодняшняя стоимость суммы, которую получим в будущем: PV = FV / (1 + r)ⁿ.",
     "Текущая стоимость позволяет сравнивать суммы разных периодов. Пример: 10 000 зл через 2 года при ставке 8% сегодня стоят около 8 573,39 зл. Чем выше ставка и длиннее срок, тем ниже текущая стоимость. Сумма текущих стоимостей потоков минус затраты — это NPV."]);
  T("dyskontowanie", ["wartosc-biezaca", "stopa-dyskontowa"],
    ["Dyskontowanie", "Przeliczanie przyszłych kwot na ich wartość dzisiejszą przy użyciu stopy dyskontowej.",
     "Dyskontowanie jest odwrotnością kapitalizacji: dzielimy przyszłą kwotę przez (1 + r)ⁿ. Dzięki niemu przepływy z różnych lat można zsumować w jednej „walucie” — dzisiejszych złotych. To podstawa metod NPV, IRR i zdyskontowanego okresu zwrotu."],
    ["Дисконтирование", "Пересчёт будущих сумм в их сегодняшнюю стоимость с помощью ставки дисконтирования.",
     "Дисконтирование — обратная операция к капитализации: будущую сумму делят на (1 + r)ⁿ. Благодаря ему потоки разных лет можно сложить в одной «валюте» — сегодняшних злотых. Это основа методов NPV, IRR и дисконтированного срока окупаемости."]);
  T("stopa-dyskontowa", ["dyskontowanie", "premia-za-ryzyko", "koszt-alternatywny"],
    ["Stopa dyskontowa", "Stopa, którą przeliczamy przyszłe kwoty na dzisiejsze; odzwierciedla wymagany zwrot.",
     "Stopa dyskontowa to koszt alternatywny kapitału: zwrot z najlepszej dostępnej alternatywy o podobnym ryzyku. Zwykle = stopa wolna od ryzyka + premia za ryzyko. Wyższa stopa obniża wartość bieżącą przepływów i NPV, dlatego jej dobór silnie wpływa na decyzję."],
    ["Ставка дисконтирования", "Ставка, по которой будущие суммы пересчитывают в сегодняшние; отражает требуемую доходность.",
     "Ставка дисконтирования — альтернативная стоимость капитала: доходность лучшей доступной альтернативы с похожим риском. Обычно = безрисковая ставка + премия за риск. Более высокая ставка снижает текущую стоимость потоков и NPV, поэтому её выбор сильно влияет на решение."]);
  T("koszt-alternatywny", ["stopa-dyskontowa", "wartosc-pieniadza-w-czasie"],
    ["Koszt alternatywny", "Korzyść utracona przez to, że wybraliśmy jedną możliwość zamiast najlepszej innej.",
     "Pieniądze zainwestowane w jeden projekt nie mogą jednocześnie pracować gdzie indziej. Np. trzymając złoto, rezygnujemy z odsetek z lokaty. Koszt alternatywny wyznacza minimalny wymagany zwrot i dlatego jest podstawą doboru stopy dyskontowej."],
    ["Альтернативные издержки", "Выгода, упущенная из-за выбора одной возможности вместо лучшей другой.",
     "Деньги, вложенные в один проект, не могут одновременно работать в другом месте. Например, держа золото, мы отказываемся от процентов по депозиту. Альтернативные издержки задают минимальную требуемую доходность и поэтому служат основой выбора ставки дисконтирования."]);
  T("npv", ["irr", "dyskontowanie", "stopa-dyskontowa", "wartosc-biezaca"],
    ["NPV (wartość bieżąca netto)", "Suma zdyskontowanych przepływów inwestycji minus nakład początkowy.",
     "NPV > 0 oznacza, że inwestycja zarabia więcej niż wymagana stopa i zwiększa majątek inwestora — należy ją przyjąć; NPV < 0 — odrzucić. Przykład: maszyna za 100 000 zł z przepływami 4 × 30 000 zł ma przy 10% NPV ≈ −4 904 zł, a przy 6% ≈ +3 953 zł. Przy wyborze między projektami wykluczającymi się NPV jest kryterium rozstrzygającym."],
    ["NPV (чистая приведённая стоимость)", "Сумма дисконтированных потоков инвестиции минус начальные затраты.",
     "NPV > 0 означает, что инвестиция зарабатывает больше требуемой ставки и увеличивает богатство инвестора — её следует принять; NPV < 0 — отклонить. Пример: станок за 100 000 зл с потоками 4 × 30 000 зл при 10% имеет NPV ≈ −4 904 зл, а при 6% ≈ +3 953 зл. При выборе между взаимоисключающими проектами решающим критерием служит NPV."]);
  T("irr", ["npv", "stopa-dyskontowa", "stopa-zwrotu"],
    ["IRR (wewnętrzna stopa zwrotu)", "Stopa dyskontowa, przy której NPV inwestycji wynosi zero.",
     "IRR to „własna” stopa zwrotu projektu. Jeśli IRR przewyższa wymaganą stopę (koszt kapitału), projekt się opłaca. Przykład: maszyna za 100 000 zł z przepływami 4 × 30 000 zł ma IRR ≈ 7,71%. Ograniczenia: przy nietypowych przepływach może mieć kilka wartości, zakłada reinwestycję po stopie IRR i może mylić przy porównaniu projektów różnej skali."],
    ["IRR (внутренняя норма доходности)", "Ставка дисконтирования, при которой NPV инвестиции равна нулю.",
     "IRR — «собственная» доходность проекта. Если IRR превышает требуемую ставку (стоимость капитала), проект выгоден. Пример: станок за 100 000 зл с потоками 4 × 30 000 зл имеет IRR ≈ 7,71%. Ограничения: при нетипичных потоках может иметь несколько значений, предполагает реинвестирование по ставке IRR и может вводить в заблуждение при сравнении проектов разного масштаба."]);
  T("arr", ["okres-zwrotu", "amortyzacja"],
    ["ARR (księgowa stopa zwrotu)", "Średni roczny zysk księgowy podzielony przez nakład (lub średni zaangażowany kapitał).",
     "ARR to prosta, statyczna miara opłacalności. Przykład: zysk 5 000 zł rocznie przy nakładzie 100 000 zł daje 5%, a liczone od średniego kapitału 50 000 zł — 10%. Wady: opiera się na zysku, a nie przepływach, pomija czas i zależy od metody amortyzacji."],
    ["ARR (бухгалтерская норма доходности)", "Средняя годовая бухгалтерская прибыль, делённая на затраты (или средний вложенный капитал).",
     "ARR — простая статическая мера окупаемости. Пример: прибыль 5 000 зл в год при затратах 100 000 зл даёт 5%, а от среднего капитала 50 000 зл — 10%. Недостатки: основана на прибыли, а не потоках, игнорирует время и зависит от метода амортизации."]);
  T("amortyzacja", ["arr", "inwestycja-rzeczowa", "przeplyw-pieniezny"],
    ["Amortyzacja", "Rozłożenie kosztu zakupu środka trwałego na lata jego używania.",
     "Przy amortyzacji liniowej koszt dzieli się równo, np. maszyna za 100 000 zł na 4 lata to 25 000 zł rocznie. Amortyzacja obniża zysk księgowy, ale nie jest wydatkiem gotówki w danym roku — dlatego przepływ pieniężny jest wyższy od zysku. Ma znaczenie przy liczeniu ARR."],
    ["Амортизация", "Распределение стоимости основного средства на годы его использования.",
     "При линейной амортизации стоимость делится поровну, например станок за 100 000 зл на 4 года — 25 000 зл в год. Амортизация уменьшает бухгалтерскую прибыль, но не является расходом денег в данном году, поэтому денежный поток выше прибыли. Важна при расчёте ARR."]);
  T("analiza-wrazliwosci", ["npv", "ryzyko-inwestycyjne", "studium-wykonalnosci"],
    ["Analiza wrażliwości", "Sprawdzenie, jak wynik inwestycji zmienia się przy zmianie jednego z założeń.",
     "Przykładowo zmniejszamy przepływy o 10–30% lub podnosimy stopę dyskontową i obserwujemy NPV czy okres zwrotu. W Eurocash spadek przepływu A o 30% wydłużył zwrot wkładu z 50 do ok. 71,4 miesiąca. Rozszerzeniem jest analiza scenariuszowa (pesymistyczny, bazowy, optymistyczny) i wyznaczanie progu rentowności."],
    ["Анализ чувствительности", "Проверка того, как меняется результат инвестиции при изменении одного из допущений.",
     "Например, уменьшаем потоки на 10–30% или повышаем ставку дисконтирования и смотрим на NPV или срок окупаемости. В Eurocash падение потока A на 30% удлинило возврат вклада с 50 до примерно 71,4 месяца. Расширение — сценарный анализ (пессимистичный, базовый, оптимистичный) и поиск точки безубыточности."]);

  // ---------- instrumenty ----------
  T("akcja", ["dywidenda", "obligacja", "rynek-efektywny"],
    ["Akcja", "Papier wartościowy potwierdzający udział we własności spółki akcyjnej.",
     "Akcjonariusz ma prawa majątkowe (dywidenda, udział w majątku przy likwidacji) i korporacyjne (głos na walnym zgromadzeniu). Zarabia na dywidendach i wzroście kursu. Akcje dają wyższy oczekiwany zwrot niż obligacje, ale silniej się wahają; przy upadłości akcjonariusze są zaspokajani po wierzycielach. W Polsce handluje się nimi głównie na GPW."],
    ["Акция", "Ценная бумага, подтверждающая долю в собственности акционерного общества.",
     "Акционер имеет имущественные права (дивиденд, доля в имуществе при ликвидации) и корпоративные (голос на общем собрании). Зарабатывает на дивидендах и росте курса. Акции дают более высокую ожидаемую доходность, чем облигации, но сильнее колеблются; при банкротстве акционеры получают остаток после кредиторов. В Польше ими торгуют в основном на GPW."]);
  T("dywidenda", ["akcja", "przychod-pasywny"],
    ["Dywidenda", "Część zysku spółki wypłacana akcjonariuszom.",
     "O wypłacie i wysokości dywidendy decyduje walne zgromadzenie; nie jest ona obowiązkowa ani gwarantowana. Stopa dywidendy = dywidenda na akcję / cena akcji, np. 2 zł / 50 zł = 4%. Dywidenda jest jednym z dwóch źródeł zwrotu z akcji obok zmiany kursu."],
    ["Дивиденд", "Часть прибыли компании, выплачиваемая акционерам.",
     "О выплате и размере дивиденда решает общее собрание; он не обязателен и не гарантирован. Дивидендная доходность = дивиденд на акцию / цена акции, например 2 зл / 50 зл = 4%. Дивиденд — один из двух источников доходности акции наряду с изменением курса."]);
  T("obligacja", ["kupon", "ryzyko-stopy-procentowej", "akcja"],
    ["Obligacja", "Papier dłużny: emitent pożycza pieniądze od inwestora i zobowiązuje się oddać je z odsetkami.",
     "Parametry obligacji to wartość nominalna, kupon, termin wykupu i rodzaj oprocentowania (stałe, zmienne, indeksowane inflacją). Obligatariusz jest wierzycielem, nie właścicielem. Emitentami są Skarb Państwa, samorządy i firmy — ryzyko niewypłacalności rośnie w tej kolejności. Ceny obligacji o stałym kuponie spadają, gdy stopy procentowe rosną."],
    ["Облигация", "Долговая бумага: эмитент занимает деньги у инвестора и обязуется вернуть их с процентами.",
     "Параметры облигации: номинал, купон, срок погашения и тип процента (фиксированный, плавающий, индексируемый инфляцией). Держатель облигации — кредитор, а не владелец. Эмитенты — государство, самоуправления и фирмы; риск неплатежа растёт в этом порядке. Цены облигаций с фиксированным купоном падают при росте процентных ставок."]);
  T("kupon", ["obligacja"],
    ["Kupon", "Odsetki wypłacane przez emitenta obligacji, zwykle jako procent wartości nominalnej.",
     "Obligacja o nominale 1 000 zł z kuponem 6% płaci 60 zł rocznie. Kupon może być stały, zmienny (powiązany ze stopą rynkową) lub zależny od inflacji. Istnieją też obligacje zerokuponowe, kupowane poniżej nominału, na których zarabia się na różnicy ceny."],
    ["Купон", "Проценты, выплачиваемые эмитентом облигации, обычно в процентах от номинала.",
     "Облигация номиналом 1 000 зл с купоном 6% платит 60 зл в год. Купон может быть фиксированным, плавающим (привязанным к рыночной ставке) или зависящим от инфляции. Есть и бескупонные облигации, покупаемые ниже номинала, доход по которым — разница в цене."]);
  T("rynek-efektywny", ["akcja", "ryzyko-inwestycyjne"],
    ["Rynek efektywny", "Rynek, na którym ceny szybko i w pełni odzwierciedlają dostępne informacje.",
     "Jeśli rynek jest efektywny, trudno trwale osiągać wyniki lepsze od rynku bez ponoszenia większego ryzyka, bo nowe informacje są natychmiast uwzględniane w cenach. Ta hipoteza jest argumentem za tanimi funduszami indeksowymi. W praktyce rynki bywają mniej lub bardziej efektywne."],
    ["Эффективный рынок", "Рынок, на котором цены быстро и полностью отражают доступную информацию.",
     "Если рынок эффективен, трудно стабильно обгонять рынок, не принимая большего риска, поскольку новая информация сразу учитывается в ценах. Эта гипотеза — аргумент в пользу дешёвых индексных фондов. На практике рынки бывают более или менее эффективными."]);
  T("fundusz-inwestycyjny", ["tfi", "inwestycja-posrednia", "dywersyfikacja"],
    ["Fundusz inwestycyjny", "Wspólna pula pieniędzy wielu inwestorów, inwestowana przez zawodowego zarządzającego.",
     "Uczestnik ma jednostki uczestnictwa (FIO, SFIO) lub certyfikaty (FIZ), których wartość = aktywa netto / liczba jednostek. Funduszem zarządza TFI, aktywa przechowuje depozytariusz, nadzór sprawuje KNF. Według polityki wyróżnia się fundusze rynku pieniężnego, dłużne, mieszane i akcyjne; istnieją też fundusze indeksowe i ETF-y. Fundusz zapewnia dywersyfikację, ale nie usuwa ryzyka rynku i pobiera opłaty."],
    ["Инвестиционный фонд", "Общий пул денег многих инвесторов, которым управляет профессиональный управляющий.",
     "Участник владеет паями (FIO, SFIO) или сертификатами (FIZ), стоимость которых = чистые активы / число паёв. Фондом управляет TFI, активы хранит депозитарий, надзор ведёт KNF. По политике различают фонды денежного рынка, долговые, смешанные и акционные; есть также индексные фонды и ETF. Фонд обеспечивает диверсификацию, но не устраняет рыночный риск и берёт комиссии."]);
  T("tfi", ["fundusz-inwestycyjny", "knf"],
    ["TFI", "Towarzystwo funduszy inwestycyjnych — spółka, która tworzy fundusze inwestycyjne i nimi zarządza.",
     "TFI działa na podstawie zezwolenia KNF i ustawy o funduszach inwestycyjnych z 2004 r. Pobiera opłatę za zarządzanie z aktywów funduszu. Aktywa funduszu są oddzielone od majątku TFI i przechowywane przez depozytariusza, co chroni inwestorów w razie problemów towarzystwa."],
    ["TFI", "Общество инвестиционных фондов (towarzystwo funduszy inwestycyjnych) — компания, создающая фонды и управляющая ими.",
     "TFI работает на основании разрешения KNF и закона об инвестиционных фондах 2004 года. Берёт плату за управление из активов фонда. Активы фонда отделены от имущества TFI и хранятся у депозитария, что защищает инвесторов при проблемах общества."]);
  T("inwestycje-alternatywne", ["zloto-inwestycyjne", "reit", "dywersyfikacja", "plynnosc"],
    ["Inwestycje alternatywne", "Inwestycje poza klasycznym zestawem akcji, obligacji i lokat: złoto, nieruchomości, REIT-y, sztuka, wino.",
     "Mogą poprawić dywersyfikację portfela i chronić przed inflacją, ale zwykle mają niższą płynność, wyższe koszty transakcyjne i przechowywania oraz trudniejszą wycenę. Przy kolekcjach granica między inwestowaniem, spekulacją a kolekcjonowaniem jest płynna. Zazwyczaj stanowią uzupełnienie portfela."],
    ["Альтернативные инвестиции", "Инвестиции вне классического набора акций, облигаций и депозитов: золото, недвижимость, REIT, искусство, вино.",
     "Они могут улучшить диверсификацию портфеля и защитить от инфляции, но обычно имеют более низкую ликвидность, высокие расходы на сделки и хранение и сложную оценку. В коллекционировании граница между инвестированием, спекуляцией и коллекционированием размыта. Обычно это дополнение к портфелю."]);
  T("zloto-inwestycyjne", ["inwestycje-alternatywne", "koszt-alternatywny"],
    ["Złoto inwestycyjne", "Złoto kupowane w celach inwestycyjnych: sztabki, monety bulionowe lub instrumenty oparte na jego cenie.",
     "Złoto uchodzi za „bezpieczną przystań” w kryzysach, ale nie przynosi odsetek ani dywidend — zarabia się tylko na wzroście ceny. Cenę podaje się zwykle w USD za uncję trojańską (ok. 31,1 g), więc dla inwestora z Polski ważny jest też kurs walut. Złoto fizyczne wymaga przechowywania i wiąże się ze spreadem między ceną kupna i sprzedaży."],
    ["Инвестиционное золото", "Золото, купленное с инвестиционной целью: слитки, инвестиционные монеты или инструменты на его цену.",
     "Золото считается «тихой гаванью» в кризисы, но не приносит ни процентов, ни дивидендов — доход только от роста цены. Цену обычно указывают в USD за тройскую унцию (около 31,1 г), поэтому для инвестора из Польши важен и валютный курс. Физическое золото требует хранения и связано со спредом между ценой покупки и продажи."]);
  T("reit", ["inwestycje-alternatywne", "dywidenda", "plynnosc"],
    ["REIT", "Real estate investment trust — spółka lub fundusz posiadający nieruchomości na wynajem i wypłacający większość zysku.",
     "REIT daje pośredni dostęp do rynku nieruchomości: biur, magazynów, centrów handlowych, mieszkań. Akcje REIT-ów notowane są na giełdzie, więc próg wejścia jest niski, a płynność wysoka. Forma powstała w USA w 1960 r. Ceny REIT-ów wahają się jak akcje i są wrażliwe na stopy procentowe."],
    ["REIT", "Real estate investment trust — компания или фонд с доходной недвижимостью, выплачивающий большую часть прибыли.",
     "REIT даёт косвенный доступ к рынку недвижимости: офисам, складам, торговым центрам, жилью. Акции REIT торгуются на бирже, поэтому порог входа низкий, а ликвидность высокая. Форма появилась в США в 1960 году. Цены REIT колеблются как акции и чувствительны к процентным ставкам."]);
  T("plynnosc", ["inwestycje-alternatywne", "ryzyko-inwestycyjne"],
    ["Płynność", "Łatwość i szybkość zamiany aktywa na gotówkę bez istotnej straty wartości.",
     "Gotówka i lokaty są bardzo płynne, akcje dużych spółek — płynne, a mieszkania, maszyny czy dzieła sztuki — mało płynne. Niska płynność oznacza ryzyko, że w razie potrzeby trzeba będzie sprzedać taniej. Dlatego przy inwestowaniu warto utrzymywać rezerwę gotówki, jak w Eurocash."],
    ["Ликвидность", "Лёгкость и скорость превращения актива в деньги без существенной потери стоимости.",
     "Наличные и депозиты очень ликвидны, акции крупных компаний ликвидны, а квартиры, станки или произведения искусства — малоликвидны. Низкая ликвидность означает риск, что при необходимости придётся продать дешевле. Поэтому при инвестировании стоит держать резерв наличных, как в Eurocash."]);
  T("portfel-inwestycyjny", ["dywersyfikacja", "ryzyko-specyficzne"],
    ["Portfel inwestycyjny", "Zestaw wszystkich inwestycji posiadanych przez inwestora.",
     "Portfel może łączyć akcje, obligacje, fundusze i aktywa alternatywne. Jego ryzyko zależy nie tylko od ryzyka składników, ale też od ich współzależności — to główna myśl teorii portfela H. Markowitza. Portfel dobiera się do celu, horyzontu i akceptowanego ryzyka, a potem monitoruje i koryguje."],
    ["Инвестиционный портфель", "Совокупность всех инвестиций, которыми владеет инвестор.",
     "Портфель может сочетать акции, облигации, фонды и альтернативные активы. Его риск зависит не только от риска составляющих, но и от их взаимосвязи — главная идея теории портфеля Г. Марковица. Портфель подбирают под цель, горизонт и приемлемый риск, а затем отслеживают и корректируют."]);

  // ---------- ryzyko ----------
  T("ryzyko-inwestycyjne", ["ryzyko-systematyczne", "ryzyko-specyficzne", "odchylenie-standardowe", "premia-za-ryzyko"],
    ["Ryzyko inwestycyjne", "Możliwość, że rzeczywisty wynik inwestycji będzie inny niż oczekiwany.",
     "W finansach ryzyko obejmuje odchylenia w obie strony, choć najbardziej obawiamy się strat. Dzieli się na systematyczne (rynkowe) i specyficzne. Rodzaje szczegółowe to m.in. ryzyko cenowe, stopy procentowej, inflacji, kredytowe, płynności, walutowe, operacyjne i polityczne. Mierzy się je np. odchyleniem standardowym; ogranicza dywersyfikacją, rezerwą i mniejszym długiem."],
    ["Инвестиционный риск", "Возможность того, что фактический результат инвестиции будет отличаться от ожидаемого.",
     "В финансах риск включает отклонения в обе стороны, хотя больше всего мы боимся убытков. Делится на систематический (рыночный) и специфический. Подробные виды: ценовой, процентный, инфляционный, кредитный, ликвидности, валютный, операционный и политический. Измеряется, например, стандартным отклонением; ограничивается диверсификацией, резервом и меньшим долгом."]);
  T("ryzyko-systematyczne", ["ryzyko-specyficzne", "premia-za-ryzyko", "recesja"],
    ["Ryzyko systematyczne", "Ryzyko dotyczące całego rynku i gospodarki, którego nie da się usunąć dywersyfikacją.",
     "Źródłami są m.in. recesja, zmiany stóp procentowych, inflacja, kryzysy finansowe i decyzje polityczne. Ponieważ dotyka wszystkich aktywów naraz, inwestorzy żądają za jego ponoszenie premii za ryzyko. Nazywane jest też ryzykiem rynkowym lub niedywersyfikowalnym."],
    ["Систематический риск", "Риск, касающийся всего рынка и экономики, который нельзя устранить диверсификацией.",
     "Источники: рецессия, изменения процентных ставок, инфляция, финансовые кризисы и политические решения. Поскольку он затрагивает все активы сразу, инвесторы требуют за него премию за риск. Его также называют рыночным или недиверсифицируемым."]);
  T("ryzyko-specyficzne", ["ryzyko-systematyczne", "dywersyfikacja"],
    ["Ryzyko specyficzne", "Ryzyko związane z konkretną spółką, branżą lub projektem, które można ograniczyć dywersyfikacją.",
     "Przykłady: błąd zarządu, utrata kluczowego klienta, pożar fabryki, proces sądowy. Ponieważ takie zdarzenia w różnych firmach zachodzą niezależnie, rozłożenie kapitału na wiele spółek znacząco zmniejsza ich wpływ na portfel. Nazywane jest też niesystematycznym lub dywersyfikowalnym."],
    ["Специфический риск", "Риск, связанный с конкретной компанией, отраслью или проектом, который можно ограничить диверсификацией.",
     "Примеры: ошибка правления, потеря ключевого клиента, пожар на заводе, судебный процесс. Поскольку такие события в разных фирмах происходят независимо, распределение капитала по многим компаниям заметно снижает их влияние на портфель. Его также называют несистематическим или диверсифицируемым."]);
  T("odchylenie-standardowe", ["ryzyko-inwestycyjne", "stopa-zwrotu"],
    ["Odchylenie standardowe", "Miara rozrzutu stóp zwrotu wokół średniej; podstawowa miara ryzyka.",
     "σ = pierwiastek z wariancji, czyli ze średniej (ważonej) kwadratów odchyleń od średniej. Przykład: inwestycje X i Y dały średnio po 10%, ale σ(X) ≈ 1,41 p.p., a σ(Y) ≈ 15,81 p.p. — Y jest bardziej ryzykowna. Przy różnych średnich porównuje się współczynnik zmienności σ / E(R). Miary historyczne nie gwarantują przyszłych wahań."],
    ["Стандартное отклонение", "Мера разброса доходностей вокруг среднего; основная мера риска.",
     "σ — корень из дисперсии, то есть из средневзвешенного квадрата отклонений от среднего. Пример: инвестиции X и Y в среднем дали по 10%, но σ(X) ≈ 1,41 п.п., а σ(Y) ≈ 15,81 п.п. — Y рискованнее. При разных средних сравнивают коэффициент вариации σ / E(R). Исторические меры не гарантируют будущих колебаний."]);
  T("dywersyfikacja", ["ryzyko-specyficzne", "portfel-inwestycyjny", "fundusz-inwestycyjny"],
    ["Dywersyfikacja", "Rozłożenie kapitału na różne aktywa, aby ograniczyć ryzyko portfela.",
     "Dywersyfikacja działa najlepiej, gdy wyniki aktywów są słabo lub ujemnie skorelowane. Zmniejsza ryzyko specyficzne, ale nie usuwa systematycznego — w kryzysie wiele aktywów spada jednocześnie. Najprostszym sposobem dywersyfikacji przy małym kapitale jest fundusz inwestycyjny."],
    ["Диверсификация", "Распределение капитала по разным активам для снижения риска портфеля.",
     "Диверсификация лучше всего работает, когда результаты активов слабо или отрицательно коррелированы. Она снижает специфический риск, но не устраняет систематический — в кризис многие активы падают одновременно. Самый простой способ диверсификации при небольшом капитале — инвестиционный фонд."]);
  T("premia-za-ryzyko", ["ryzyko-systematyczne", "stopa-dyskontowa", "stopa-zwrotu"],
    ["Premia za ryzyko", "Nadwyżka oczekiwanego zwrotu ponad stopę wolną od ryzyka, wymagana za ponoszenie ryzyka.",
     "Wymagana stopa zwrotu = stopa wolna od ryzyka + premia za ryzyko. Ponieważ inwestorzy mają zwykle awersję do ryzyka, bardziej ryzykowne aktywa muszą oferować wyższy oczekiwany zwrot. Premia rośnie m.in. z ryzykiem emitenta — dlatego państwa i firmy o słabszej kondycji płacą wyższe odsetki."],
    ["Премия за риск", "Превышение ожидаемой доходности над безрисковой ставкой, требуемое за принятие риска.",
     "Требуемая доходность = безрисковая ставка + премия за риск. Поскольку инвесторы обычно не склонны к риску, более рискованные активы должны предлагать более высокую ожидаемую доходность. Премия растёт, в частности, с риском эмитента — поэтому государства и фирмы в худшем состоянии платят более высокие проценты."]);
})();
