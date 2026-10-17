// Podstawy inwestycji — wykłady → podtematy. Format jak w content.js.
(window.SUBJECTS = window.SUBJECTS || []).push({
  id: "inwest",
  name: { pl: "Podstawy inwestycji", ru: "Основы инвестиций" },
  short: { pl: "Inwestycje", ru: "Инвестиции" },
  icon: "chart",
  lecturer: "mgr Krzysztof Maszota",
  examDate: "2027-01-30",
  program: [
    { n: 6, pl: "Eurocash II i porównanie rozgrywek", ru: "Eurocash II и сравнение партий" },
    { n: 7, pl: "Test końcowy", ru: "Итоговый тест" },
  ],
  lectures: [
    {
      n: 1,
      color: "--c1",
      title: { pl: "Eurocash I — gra i analiza decyzji", ru: "Eurocash I — игра и анализ решений" },
      lead: {
        pl: "Pierwsze spotkanie: zasady zaliczenia, gra planszowa Eurocash i podstawowe liczby każdej inwestycji — cena, wkład własny, dług i przepływ pieniężny. Liczymy zwrot z wkładu, czas odzyskania wkładu, porównujemy dwie okazje, sprzedaż z długiem i wariant niekorzystny.",
        ru: "Первая встреча: правила зачёта, настольная игра Eurocash и базовые цифры любой инвестиции — цена, собственный вклад, долг и денежный поток. Считаем отдачу на вклад, срок возврата вклада, сравниваем две возможности, продажу с долгом и неблагоприятный сценарий.",
      },
      subs: [
        // ------------------------------------------------------------------ 1.1
        {
          id: "1.1",
          title: { pl: "Gra Eurocash i zasady przedmiotu", ru: "Игра Eurocash и правила предмета" },
          src: "Prezentacja „Podstawy inwestycji 01. Eurocash — pierwsza rozgrywka i analiza decyzji”, slajdy 1–11",
          body: {
            pl: `Przedmiot „Podstawy inwestycji” zaczyna się nietypowo: zamiast definicji mamy grę planszową. Chodzi o to, żeby najpierw **doświadczyć** decyzji inwestycyjnych, a dopiero potem nazwać i policzyć to, co się wydarzyło.

## Plan siedmiu spotkań
| Spotkanie | Temat |
|---|---|
| 1 | Eurocash I — pierwsza rozgrywka i analiza decyzji |
| 2 | Od pomysłu do inwestycji |
| 3 | Czy inwestycja się opłaca? |
| 4 | W co można inwestować? |
| 5 | Ryzyko i uzasadnienie decyzji |
| 6 | Eurocash II i porównanie rozgrywek |
| 7 | Test końcowy |

Spotkania 2–5 to cztery moduły merytoryczne. Nie korzystamy z platform tradingowych — uczymy się myśleć o inwestycji, a nie klikać „kup”.

## Jak zaliczyć przedmiot
- **10 punktów za raport** — indywidualna analiza dwóch rozgrywek (2–3 strony plus dokumentacja), oddawana w Moodle po drugiej grze.
- **20 punktów za test** — test końcowy na spotkaniu 7.
- Razem **30 punktów**, próg zaliczenia to **16/30**. Liczy się jeden wynik łączny, nie ma osobnych minimów z testu i raportu.

| Punkty | Ocena |
|---|---|
| 0–15 | 2,0 |
| 16–18 | 3,0 |
| 19–21 | 3,5 |
| 22–24 | 4,0 |
| 25–27 | 4,5 |
| 28–30 | 5,0 |

> !uwaga Ocenie podlega **analiza**, a nie wynik gry. Wygrana w Eurocash ani sama obecność nie dają punktów. Można przegrać grę i napisać świetny raport.

## O co chodzi w Eurocash
Na planszy pojawiają się trzy rodzaje pól z okazjami: **biznes, inwestycje i nieruchomości**. Gracz dostaje propozycję i sam decyduje, czy ją przyjąć. Są też karty **„Los”** — ich treść trzeba wykonać obowiązkowo, czy się to podoba, czy nie. Pole **„Wypłata”** oznacza rozliczenie według zestawienia finansowego gracza. Po każdej transakcji aktualizujemy swoje dane.

## Cztery liczby każdej okazji
| Pojęcie | Co oznacza |
|---|---|
| [[cena-zakupu|Cena zakupu]] | wartość całej transakcji |
| [[wklad-wlasny|Środki własne (wkład)]] | Twoja gotówka zaangażowana w zakup |
| [[dlug|Dług]] | finansowanie, które trzeba będzie rozliczyć |
| [[przychod-pasywny|Przychód pasywny]] | kwota, którą inwestycja przynosi co miesiąc |

Zawsze obowiązuje równanie: **cena = wkład własny + dług**.

> !zapamietaj Przychód pasywny z karty Eurocash **już uwzględnia koszty** danej inwestycji. Nie odejmuj ich drugi raz. W grze ta kwota pełni rolę miesięcznego [[przeplyw-pieniezny|przepływu pieniężnego]] netto.

## Workbook: przed, w trakcie, po
1. **Przed grą** — stan początkowy i własny plan. Odpowiadasz na trzy pytania: jaki cel chcę osiągnąć, jaką rezerwę gotówki utrzymam, jakie dane sprawdzę przed zakupem.
2. **W trakcie** — zapisujesz trzy istotne decyzje i ich uzasadnienie. Jeśli odrzucisz okazję, też ją zapisz — rezygnacja to również decyzja.
3. **Po grze** — stan końcowy: gotówka i miesięczna wypłata, przychody pasywne, aktywa i zadłużenie. Zrób zdjęcie swojego zestawienia.

Gra trwa 2 × 45 minut z 15-minutową przerwą — to organizacja zajęć, a nie reguła zwycięstwa. Przy wycenie aktywów na koniec nie musisz znać wartości rynkowej; wystarczy wskazać podstawę wyceny, np. cenę zakupu.

> !przyklad Gracz zapisuje w workbooku: „Cel — przychód pasywny wyższy niż wydatki. Rezerwa — zawsze co najmniej kilka tysięcy złotych gotówki. Przed zakupem sprawdzam: wkład, dług i miesięczny przepływ”. Taki plan pozwala potem ocenić, czy trzymał się własnych zasad.

Workbook trzeba zachować — wrócimy do niego na spotkaniu 6, a raport końcowy powstaje dopiero po drugiej rozgrywce.`,
            ru: `Предмет «Основы инвестиций» начинается необычно: вместо определений — настольная игра. Идея в том, чтобы сначала **прочувствовать** инвестиционные решения, а уже потом назвать и посчитать то, что произошло.

## План семи встреч
| Встреча | Тема |
|---|---|
| 1 | Eurocash I — первая партия и анализ решений |
| 2 | От идеи к инвестиции |
| 3 | Окупается ли инвестиция? |
| 4 | Во что можно инвестировать? |
| 5 | Риск и обоснование решения |
| 6 | Eurocash II и сравнение партий |
| 7 | Итоговый тест |

Встречи 2–5 — четыре содержательных модуля. Торговые платформы не используются: мы учимся думать об инвестиции, а не нажимать «купить».

## Как получить зачёт
- **10 баллов за отчёт** — индивидуальный анализ двух партий (2–3 страницы плюс документация), сдаётся в Moodle после второй игры.
- **20 баллов за тест** — итоговый тест на 7-й встрече.
- Всего **30 баллов**, порог зачёта — **16/30**. Учитывается один общий результат, отдельных минимумов за тест и отчёт нет.

| Баллы | Оценка |
|---|---|
| 0–15 | 2,0 |
| 16–18 | 3,0 |
| 19–21 | 3,5 |
| 22–24 | 4,0 |
| 25–27 | 4,5 |
| 28–30 | 5,0 |

> !uwaga Оценивается **анализ**, а не результат игры. Победа в Eurocash и само присутствие баллов не дают. Можно проиграть партию и написать отличный отчёт.

## Суть игры Eurocash
На поле есть три вида клеток с возможностями: **бизнес, инвестиции и недвижимость**. Игрок получает предложение и сам решает, принять ли его. Есть и карточки **«Судьба» (Los)** — их содержание выполняется обязательно, нравится это или нет. Клетка **«Выплата» (Wypłata)** означает расчёт по финансовой ведомости игрока. После каждой сделки свои данные нужно обновить.

## Четыре числа любой возможности
| Понятие | Что означает |
|---|---|
| [[cena-zakupu|Цена покупки]] | стоимость всей сделки |
| [[wklad-wlasny|Собственные средства (вклад)]] | ваши наличные, вложенные в покупку |
| [[dlug|Долг]] | финансирование, которое придётся погасить |
| [[przychod-pasywny|Пассивный доход]] | сумма, которую инвестиция приносит каждый месяц |

Всегда верно равенство: **цена = собственный вклад + долг**.

> !zapamietaj Пассивный доход на карточке Eurocash **уже учитывает расходы** по этой инвестиции. Не вычитайте их второй раз. В игре эта сумма играет роль ежемесячного чистого [[przeplyw-pieniezny|денежного потока]].

## Рабочая тетрадь (workbook): до, во время, после
1. **До игры** — начальное состояние и собственный план. Отвечаете на три вопроса: какой цели хочу достичь, какой резерв наличных буду держать, какие данные проверю перед покупкой.
2. **Во время игры** — записываете три важных решения и их обоснование. Если отказались от возможности, тоже запишите — отказ тоже решение.
3. **После игры** — итоговое состояние: наличные и ежемесячная выплата, пассивные доходы, активы и задолженность. Сфотографируйте свою ведомость.

Игра длится 2 × 45 минут с 15-минутным перерывом — это организация занятия, а не правило победы. При оценке активов в конце не нужно знать рыночную стоимость; достаточно указать основу оценки, например цену покупки.

> !przyklad Игрок записывает в тетради: «Цель — пассивный доход выше расходов. Резерв — всегда хотя бы несколько тысяч злотых наличными. Перед покупкой проверяю вклад, долг и ежемесячный поток». Такой план позволяет потом оценить, соблюдал ли он собственные правила.

Тетрадь нужно сохранить — мы вернёмся к ней на 6-й встрече, а итоговый отчёт пишется только после второй партии.`,
          },
          quiz: [
            { q: { pl: "Jaki jest próg zaliczenia przedmiotu?", ru: "Каков порог зачёта по предмету?" },
              a: [{ pl: "15/30 punktów", ru: "15/30 баллов" }, { pl: "10 punktów z testu i 5 z raportu", ru: "10 баллов за тест и 5 за отчёт" }, { pl: "16/30 punktów łącznie", ru: "16/30 баллов в сумме" }, { pl: "51% z samego testu", ru: "51% только за тест" }],
              correct: 2, why: { pl: "Liczy się jeden wynik łączny z raportu (10 pkt) i testu (20 pkt); próg to 16/30, bez osobnych minimów.", ru: "Учитывается один общий результат за отчёт (10) и тест (20); порог — 16/30, без отдельных минимумов." } },
            { q: { pl: "Co daje punkty w części praktycznej?", ru: "Что даёт баллы в практической части?" },
              a: [{ pl: "Wygrana w Eurocash", ru: "Победа в Eurocash" }, { pl: "Analiza dwóch rozgrywek w raporcie", ru: "Анализ двух партий в отчёте" }, { pl: "Obecność na grze", ru: "Присутствие на игре" }, { pl: "Najwyższy przychód pasywny w grupie", ru: "Самый высокий пассивный доход в группе" }],
              correct: 1, why: { pl: "Ocenie podlega analiza; wynik gry i obecność nie dają punktów.", ru: "Оценивается анализ; результат игры и присутствие баллов не дают." } },
            { q: { pl: "Cena zakupu wynosi 40 000 zł, a wkład własny 10 000 zł. Ile wynosi dług?", ru: "Цена покупки 40 000 зл, собственный вклад 10 000 зл. Каков долг?" },
              a: [{ pl: "50 000 zł", ru: "50 000 зл" }, { pl: "10 000 zł", ru: "10 000 зл" }, { pl: "40 000 zł", ru: "40 000 зл" }, { pl: "30 000 zł", ru: "30 000 зл" }],
              correct: 3, why: { pl: "Cena = wkład + dług, więc dług = 40 000 − 10 000 = 30 000 zł.", ru: "Цена = вклад + долг, значит долг = 40 000 − 10 000 = 30 000 зл." } },
            { q: { pl: "Jak traktować koszty inwestycji, gdy karta podaje przychód pasywny?", ru: "Как учитывать расходы, если карточка указывает пассивный доход?" },
              a: [{ pl: "Nie odejmować ich ponownie — są już ujęte w tej kwocie", ru: "Не вычитать повторно — они уже включены в эту сумму" }, { pl: "Odjąć je od przychodu pasywnego", ru: "Вычесть их из пассивного дохода" }, { pl: "Dodać je do długu", ru: "Прибавить их к долгу" }, { pl: "Odjąć je od wkładu własnego", ru: "Вычесть их из собственного вклада" }],
              correct: 0, why: { pl: "Regulamin Eurocash: przychód pasywny z karty już uwzględnia koszty danej inwestycji.", ru: "По правилам Eurocash пассивный доход на карточке уже учитывает расходы инвестиции." } },
            { q: { pl: "Co oznacza karta „Los” w Eurocash?", ru: "Что означает карточка «Судьба» (Los) в Eurocash?" },
              a: [{ pl: "Okazję, którą można odrzucić", ru: "Возможность, от которой можно отказаться" }, { pl: "Rozliczenie miesięcznej wypłaty", ru: "Расчёт ежемесячной выплаты" }, { pl: "Zdarzenie, którego treść trzeba obowiązkowo wykonać", ru: "Событие, содержание которого нужно выполнить обязательно" }, { pl: "Koniec gry", ru: "Конец игры" }],
              correct: 2, why: { pl: "Karty Los wykonuje się obowiązkowo — to element przypadku, na który gracz nie ma wpływu.", ru: "Карточки Los выполняются обязательно — это элемент случая, на который игрок не влияет." } },
          ],
        },
        // ------------------------------------------------------------------ 1.2
        {
          id: "1.2",
          title: { pl: "Analiza jednej inwestycji i wybór: A czy B?", ru: "Анализ одной инвестиции и выбор: A или B?" },
          src: "Prezentacja „Podstawy inwestycji 01”, slajdy 12–14 (workbook s. 4–5)",
          body: {
            pl: `Po grze wybierasz jedną swoją inwestycję i liczysz dla niej trzy proste wskaźniki. To pierwsze narzędzia oceny opłacalności — później, na spotkaniu 3, poznasz bardziej dokładne metody.

## Trzy wskaźniki z workbooka
| Wskaźnik | Wzór | Co mówi |
|---|---|---|
| Roczny przepływ | miesięczny przepływ × 12 | ile inwestycja daje w ciągu roku |
| Relacja do wkładu | roczny przepływ / wkład własny × 100% | ile procent wkładu wraca co roku |
| Czas odzyskania wkładu | wkład własny / miesięczny przepływ | po ilu miesiącach gotówka wróci |

Czas zwrotu podajemy **w miesiącach**. Wszystkie wzory zakładają **stały, dodatni przepływ**.

> !uwaga Relacja przepływu do wkładu to **nie jest pełna [[stopa-zwrotu|stopa zwrotu]]**. Pomija wartość końcową (za ile sprzedasz), [[dyskontowanie]] oraz zmiany przepływów w czasie. To szybkie przybliżenie, a nie ostateczny werdykt.

## Dwie okazje
Masz na start **20 000 zł gotówki**. Do wyboru są dwie inwestycje (przykład dydaktyczny, niezależny od kart gry; przepływy są już po kosztach i obsłudze finansowania):

| | A | B |
|---|---|---|
| Cena | 60 000 zł | 40 000 zł |
| Wkład własny | 15 000 zł | 10 000 zł |
| Dług | 45 000 zł | 30 000 zł |
| Przepływ netto | 300 zł/mies. | 250 zł/mies. |

## Liczymy krok po kroku
**Gotówka po zakupie:** A: 20 000 − 15 000 = **5 000 zł**; B: 20 000 − 10 000 = **10 000 zł**.

**Roczny przepływ:** A: 300 × 12 = **3 600 zł**; B: 250 × 12 = **3 000 zł**.

**Relacja do wkładu:** A: 3 600 / 15 000 = **24%**; B: 3 000 / 10 000 = **30%**.

**Czas odzyskania wkładu:** A: 15 000 / 300 = **50 miesięcy**; B: 10 000 / 250 = **40 miesięcy**.

| Wielkość | A | B |
|---|---|---|
| Gotówka po zakupie | 5 000 zł | 10 000 zł |
| Roczny przepływ | 3 600 zł | 3 000 zł |
| Przepływ / wkład | 24% | 30% |
| Zwrot wkładu | 50 mies. | 40 mies. |

## Co wybrać?
- **A** daje więcej złotych miesięcznie (300 zamiast 250).
- **B** zostawia dwa razy większą rezerwę gotówki, ma wyższą relację przepływu do wkładu i szybciej zwraca wkład.

> !zapamietaj Nie ma jednej „poprawnej” odpowiedzi. Bez danych o [[ryzyko-inwestycyjne|ryzyku]] nie da się wydać uniwersalnej rekomendacji. Liczy się to, **który argument uznajesz za najważniejszy i czy potrafisz go uzasadnić** — tego właśnie oczekujemy w raporcie.

> !przyklad Ktoś, kto boi się kart „Los” z nieoczekiwanymi wydatkami, wybierze B, bo 10 000 zł rezerwy daje bezpieczeństwo. Ktoś, kto chce jak najszybciej zwiększyć przychód pasywny w złotych, może wybrać A. Obie decyzje mogą być dobre, jeśli są świadome.

## Rezerwa gotówki jako argument
Rezerwa to pieniądze, które pozwalają przetrwać nieprzewidziane zdarzenie bez przymusowej sprzedaży. W grze odpowiada jej gotówka po zakupie; w życiu — poduszka finansowa. Im mniejsza rezerwa, tym mniejszy margines błędu. Dlatego przy porównaniu zawsze patrzymy łącznie na **przepływ, wkład i rezerwę**, a nie na jedną liczbę.`,
            ru: `После игры вы выбираете одну свою инвестицию и считаете для неё три простых показателя. Это первые инструменты оценки окупаемости — позже, на 3-й встрече, вы узнаете более точные методы.

## Три показателя из рабочей тетради
| Показатель | Формула | Что показывает |
|---|---|---|
| Годовой поток | ежемесячный поток × 12 | сколько инвестиция даёт за год |
| Отношение к вкладу | годовой поток / собственный вклад × 100% | какой процент вклада возвращается каждый год |
| Срок возврата вклада | собственный вклад / ежемесячный поток | через сколько месяцев вернутся деньги |

Срок возврата указываем **в месяцах**. Все формулы предполагают **постоянный положительный поток**.

> !uwaga Отношение потока к вкладу — **не полная [[stopa-zwrotu|норма доходности]]**. Оно не учитывает конечную стоимость (за сколько продадите), [[dyskontowanie|дисконтирование]] и изменение потоков во времени. Это быстрое приближение, а не окончательный вердикт.

## Две возможности
На старте у вас **20 000 зл наличными**. На выбор две инвестиции (учебный пример, не связанный с карточками игры; потоки уже после расходов и обслуживания финансирования):

| | A | B |
|---|---|---|
| Цена | 60 000 зл | 40 000 зл |
| Собственный вклад | 15 000 зл | 10 000 зл |
| Долг | 45 000 зл | 30 000 зл |
| Чистый поток | 300 зл/мес. | 250 зл/мес. |

## Считаем шаг за шагом
**Наличные после покупки:** A: 20 000 − 15 000 = **5 000 зл**; B: 20 000 − 10 000 = **10 000 зл**.

**Годовой поток:** A: 300 × 12 = **3 600 зл**; B: 250 × 12 = **3 000 зл**.

**Отношение к вкладу:** A: 3 600 / 15 000 = **24%**; B: 3 000 / 10 000 = **30%**.

**Срок возврата вклада:** A: 15 000 / 300 = **50 месяцев**; B: 10 000 / 250 = **40 месяцев**.

| Величина | A | B |
|---|---|---|
| Наличные после покупки | 5 000 зл | 10 000 зл |
| Годовой поток | 3 600 зл | 3 000 зл |
| Поток / вклад | 24% | 30% |
| Возврат вклада | 50 мес. | 40 мес. |

## Что выбрать?
- **A** даёт больше злотых в месяц (300 вместо 250).
- **B** оставляет вдвое больший резерв наличных, имеет более высокое отношение потока к вкладу и быстрее возвращает вклад.

> !zapamietaj Единственно «правильного» ответа нет. Без данных о [[ryzyko-inwestycyjne|риске]] нельзя дать универсальную рекомендацию. Важно, **какой аргумент вы считаете главным и можете ли его обосновать** — именно этого ждут в отчёте.

> !przyklad Тот, кто боится карточек «Судьба» с неожиданными расходами, выберет B: 10 000 зл резерва дают безопасность. Тот, кто хочет как можно быстрее увеличить пассивный доход в злотых, может выбрать A. Оба решения могут быть хорошими, если они осознанные.

## Резерв наличных как аргумент
Резерв — это деньги, позволяющие пережить непредвиденное событие без вынужденной продажи. В игре ему соответствуют наличные после покупки, в жизни — финансовая подушка. Чем меньше резерв, тем меньше запас на ошибку. Поэтому при сравнении мы всегда смотрим вместе на **поток, вклад и резерв**, а не на одно число.`,
          },
          quiz: [
            { q: { pl: "Przepływ netto wynosi 300 zł miesięcznie. Ile wynosi roczny przepływ?", ru: "Чистый поток — 300 зл в месяц. Каков годовой поток?" },
              a: [{ pl: "3 000 zł", ru: "3 000 зл" }, { pl: "3 600 zł", ru: "3 600 зл" }, { pl: "300 zł", ru: "300 зл" }, { pl: "36 000 zł", ru: "36 000 зл" }],
              correct: 1, why: { pl: "Roczny przepływ = miesięczny × 12 = 300 × 12 = 3 600 zł.", ru: "Годовой поток = ежемесячный × 12 = 300 × 12 = 3 600 зл." } },
            { q: { pl: "Ile wynosi relacja przepływu do wkładu dla okazji B (wkład 10 000 zł, 250 zł/mies.)?", ru: "Каково отношение потока к вкладу для B (вклад 10 000 зл, 250 зл/мес.)?" },
              a: [{ pl: "25%", ru: "25%" }, { pl: "24%", ru: "24%" }, { pl: "40%", ru: "40%" }, { pl: "30%", ru: "30%" }],
              correct: 3, why: { pl: "250 × 12 = 3 000 zł; 3 000 / 10 000 = 30%.", ru: "250 × 12 = 3 000 зл; 3 000 / 10 000 = 30%." } },
            { q: { pl: "Po ilu miesiącach wróci wkład w okazji A?", ru: "Через сколько месяцев вернётся вклад в возможности A?" },
              a: [{ pl: "50", ru: "50" }, { pl: "40", ru: "40" }, { pl: "200", ru: "200" }, { pl: "24", ru: "24" }],
              correct: 0, why: { pl: "Wkład / miesięczny przepływ = 15 000 / 300 = 50 miesięcy.", ru: "Вклад / ежемесячный поток = 15 000 / 300 = 50 месяцев." } },
            { q: { pl: "Czego NIE uwzględnia relacja przepływu do wkładu?", ru: "Чего НЕ учитывает отношение потока к вкладу?" },
              a: [{ pl: "Miesięcznego przepływu", ru: "Ежемесячного потока" }, { pl: "Wysokości wkładu", ru: "Размера вклада" }, { pl: "Wartości końcowej, dyskontowania i zmian przepływów", ru: "Конечной стоимости, дисконтирования и изменений потоков" }, { pl: "Liczby miesięcy w roku", ru: "Числа месяцев в году" }],
              correct: 2, why: { pl: "To uproszczony wskaźnik, a nie pełna stopa zwrotu.", ru: "Это упрощённый показатель, а не полная норма доходности." } },
            { q: { pl: "Która cecha przemawia za okazją B?", ru: "Какое свойство говорит в пользу B?" },
              a: [{ pl: "Wyższy przepływ w złotych", ru: "Более высокий поток в злотых" }, { pl: "Większa rezerwa gotówki po zakupie", ru: "Больший резерв наличных после покупки" }, { pl: "Wyższa cena zakupu", ru: "Более высокая цена покупки" }, { pl: "Większy dług", ru: "Больший долг" }],
              correct: 1, why: { pl: "Po zakupie B zostaje 10 000 zł, a po zakupie A tylko 5 000 zł.", ru: "После покупки B остаётся 10 000 зл, после A — только 5 000 зл." } },
          ],
        },
        // ------------------------------------------------------------------ 1.3
        {
          id: "1.3",
          title: { pl: "Sprzedaż z długiem, wariant niekorzystny i rola przypadku", ru: "Продажа с долгом, неблагоприятный сценарий и роль случая" },
          src: "Prezentacja „Podstawy inwestycji 01”, slajdy 15–18 (workbook s. 5–8)",
          body: {
            pl: `Kupić to połowa historii. Druga połowa to pytanie: **co zostanie w kieszeni, gdy sprzedam?** Gdy zakup był częściowo finansowany długiem, odpowiedź bywa zaskakująca.

## Rozliczenie sprzedaży
Przy sprzedaży najpierw spłacamy dług (tak każe regulamin Eurocash) i pokrywamy koszt transakcji. Dopiero reszta jest nasza.

- **Wpływ netto** = cena sprzedaży − dług − koszt sprzedaży
- **Wynik** = wpływ netto − wkład własny

## Okazja A przy dwóch cenach
Inwestycja A: wkład 15 000 zł, dług 45 000 zł, cena zakupu 60 000 zł. Koszt sprzedaży: 1 000 zł.

| | Sprzedaż za 66 000 zł | Sprzedaż za 54 000 zł |
|---|---|---|
| Spłata długu | −45 000 zł | −45 000 zł |
| Koszt sprzedaży | −1 000 zł | −1 000 zł |
| Gotówka po rozliczeniu | **20 000 zł** | **8 000 zł** |
| Wynik (minus wkład 15 000) | **zysk 5 000 zł** | **strata 7 000 zł** |
| Wynik / wkład | **+33,33%** | **−46,67%** |

Ćwiczenie pomija wcześniejsze przepływy i podatki — patrzymy tylko na efekt samej sprzedaży.

## Dźwignia finansowa
Zauważ: cena zmieniła się tylko o **10%** w górę lub w dół (o 6 000 zł względem 60 000 zł), a wynik na wkładzie to +33% albo −47%. To efekt [[dzwignia-finansowa|dźwigni finansowej]]. Ponieważ większość ceny sfinansował dług, cała zmiana wartości „spada” na mały wkład własny. Koszt sprzedaży dodatkowo przesuwa wynik w dół — dlatego strata jest większa niż zysk przy tej samej zmianie ceny.

> !zapamietaj Dług **powiększa zarówno zyski, jak i straty** liczone względem wkładu własnego. Dźwignia działa w obie strony.

## Wariant niekorzystny: przepływ −30%
Dobra analiza nie kończy się na scenariuszu bazowym. Sprawdzamy, co się stanie, gdy będzie gorzej — to prosty [[analiza-wrazliwosci|stres test]].

Załóżmy, że przepływ z inwestycji A spada o 30%:
- miesięczny przepływ: 300 × 0,7 = **210 zł**
- roczny przepływ: 210 × 12 = **2 520 zł**
- relacja do wkładu: 2 520 / 15 000 = **16,8%** (zamiast 24%)
- czas odzyskania wkładu: 15 000 / 210 ≈ **71,4 miesiąca** (zamiast 50)

> !przyklad Inwestor, który akceptował zwrot wkładu po ok. 4 latach (50 miesięcy), musi się zastanowić, czy zaakceptuje też prawie 6 lat (71,4 miesiąca). Jeśli nie — inwestycja jest dla niego zbyt wrażliwa na spadek przepływu.

Ten test nie zmienia regulaminu gry — to narzędzie myślenia. Pytanie brzmi: **czy nadal zaakceptujesz inwestycję?**

## Decyzja a przypadek
W Eurocash, jak w życiu, wynik zależy od dwóch rzeczy: **jakości decyzji** i **losu** (kostka, karty). Dlatego po grze odpowiadasz na trzy pytania:
1. Którą decyzję najlepiej uzasadniłem?
2. Co następnym razem zrobię inaczej?
3. Jak losowanie wpłynęło na mój wynik?

> !uwaga Wygrana nie dowodzi, że każda decyzja była dobra, a przegrana — że była zła. Decyzję oceniamy według **argumentów znanych w chwili wyboru**, a nie według tego, co wydarzyło się potem.

## Co dalej
Zachowaj workbook i zdjęcie zestawienia. Do uzupełnienia zostaje analiza inwestycji i wnioski. Na spotkaniu 6 wrócimy do Twoich decyzji, a raport końcowy powstanie po drugiej grze.`,
            ru: `Купить — это половина истории. Вторая половина — вопрос: **что останется в кармане, когда я продам?** Если покупка частично финансировалась долгом, ответ бывает неожиданным.

## Расчёт при продаже
При продаже сначала гасим долг (так требуют правила Eurocash) и покрываем расходы на сделку. Только остаток принадлежит нам.

- **Чистое поступление** = цена продажи − долг − расходы на продажу
- **Результат** = чистое поступление − собственный вклад

## Возможность A при двух ценах
Инвестиция A: вклад 15 000 зл, долг 45 000 зл, цена покупки 60 000 зл. Расходы на продажу: 1 000 зл.

| | Продажа за 66 000 зл | Продажа за 54 000 зл |
|---|---|---|
| Погашение долга | −45 000 зл | −45 000 зл |
| Расходы на продажу | −1 000 зл | −1 000 зл |
| Наличные после расчёта | **20 000 зл** | **8 000 зл** |
| Результат (минус вклад 15 000) | **прибыль 5 000 зл** | **убыток 7 000 зл** |
| Результат / вклад | **+33,33%** | **−46,67%** |

Упражнение не учитывает предыдущие потоки и налоги — смотрим только на эффект самой продажи.

## Финансовый рычаг
Обратите внимание: цена изменилась всего на **10%** вверх или вниз (на 6 000 зл от 60 000 зл), а результат на вклад — +33% или −47%. Это эффект [[dzwignia-finansowa|финансового рычага]]. Поскольку большую часть цены покрыл долг, всё изменение стоимости «ложится» на небольшой собственный вклад. Расходы на продажу дополнительно сдвигают результат вниз — поэтому убыток больше прибыли при одинаковом изменении цены.

> !zapamietaj Долг **увеличивает и прибыль, и убытки**, рассчитанные относительно собственного вклада. Рычаг действует в обе стороны.

## Неблагоприятный сценарий: поток −30%
Хороший анализ не заканчивается базовым сценарием. Проверяем, что будет, если станет хуже, — это простой [[analiza-wrazliwosci|стресс-тест]].

Допустим, поток инвестиции A падает на 30%:
- ежемесячный поток: 300 × 0,7 = **210 зл**
- годовой поток: 210 × 12 = **2 520 зл**
- отношение к вкладу: 2 520 / 15 000 = **16,8%** (вместо 24%)
- срок возврата вклада: 15 000 / 210 ≈ **71,4 месяца** (вместо 50)

> !przyklad Инвестор, который соглашался на возврат вклада примерно через 4 года (50 месяцев), должен подумать, согласится ли он и на почти 6 лет (71,4 месяца). Если нет — инвестиция для него слишком чувствительна к падению потока.

Этот тест не меняет правил игры — это инструмент мышления. Вопрос: **примете ли вы инвестицию и в этом случае?**

## Решение и случай
В Eurocash, как и в жизни, результат зависит от двух вещей: **качества решения** и **случая** (кубик, карточки). Поэтому после игры вы отвечаете на три вопроса:
1. Какое решение я обосновал лучше всего?
2. Что в следующий раз сделаю иначе?
3. Как жребий повлиял на мой результат?

> !uwaga Победа не доказывает, что каждое решение было хорошим, а проигрыш — что плохим. Решение оценивают по **аргументам, известным в момент выбора**, а не по тому, что случилось потом.

## Что дальше
Сохраните тетрадь и фото ведомости. Осталось дописать анализ инвестиции и выводы. На 6-й встрече мы вернёмся к вашим решениям, а итоговый отчёт появится после второй игры.`,
          },
          quiz: [
            { q: { pl: "A (dług 45 000 zł) sprzedajemy za 66 000 zł, koszt sprzedaży 1 000 zł. Ile gotówki zostaje?", ru: "A (долг 45 000 зл) продаём за 66 000 зл, расходы 1 000 зл. Сколько наличных остаётся?" },
              a: [{ pl: "21 000 zł", ru: "21 000 зл" }, { pl: "5 000 zł", ru: "5 000 зл" }, { pl: "66 000 zł", ru: "66 000 зл" }, { pl: "20 000 zł", ru: "20 000 зл" }],
              correct: 3, why: { pl: "66 000 − 45 000 − 1 000 = 20 000 zł; po odjęciu wkładu 15 000 zł zysk to 5 000 zł.", ru: "66 000 − 45 000 − 1 000 = 20 000 зл; за вычетом вклада 15 000 зл прибыль 5 000 зл." } },
            { q: { pl: "Przy sprzedaży A za 54 000 zł wynik na wkładzie wynosi:", ru: "При продаже A за 54 000 зл результат на вклад составляет:" },
              a: [{ pl: "−10%", ru: "−10%" }, { pl: "−46,67%", ru: "−46,67%" }, { pl: "−7%", ru: "−7%" }, { pl: "+33,33%", ru: "+33,33%" }],
              correct: 1, why: { pl: "Wpływ netto 8 000 zł, strata 7 000 zł; 7 000 / 15 000 = 46,67%.", ru: "Чистое поступление 8 000 зл, убыток 7 000 зл; 7 000 / 15 000 = 46,67%." } },
            { q: { pl: "Przepływ A spada o 30%. Jaki jest nowy czas odzyskania wkładu?", ru: "Поток A падает на 30%. Каков новый срок возврата вклада?" },
              a: [{ pl: "ok. 71,4 miesiąca", ru: "около 71,4 месяца" }, { pl: "65 miesięcy", ru: "65 месяцев" }, { pl: "35 miesięcy", ru: "35 месяцев" }, { pl: "50 miesięcy", ru: "50 месяцев" }],
              correct: 0, why: { pl: "300 × 0,7 = 210 zł; 15 000 / 210 ≈ 71,4 miesiąca.", ru: "300 × 0,7 = 210 зл; 15 000 / 210 ≈ 71,4 месяца." } },
            { q: { pl: "Dlaczego zmiana ceny o 10% dała wynik +33% lub −47% na wkładzie?", ru: "Почему изменение цены на 10% дало +33% или −47% на вклад?" },
              a: [{ pl: "Z powodu inflacji", ru: "Из-за инфляции" }, { pl: "Z powodu podatków", ru: "Из-за налогов" }, { pl: "Z powodu dźwigni finansowej — większość ceny to dług", ru: "Из-за финансового рычага — большая часть цены — долг" }, { pl: "Z powodu dyskontowania", ru: "Из-за дисконтирования" }],
              correct: 2, why: { pl: "Dług się nie zmienia, więc cała zmiana wartości obciąża mały wkład własny.", ru: "Долг не меняется, поэтому всё изменение стоимости ложится на небольшой вклад." } },
            { q: { pl: "Jak oceniać decyzję podjętą w grze?", ru: "Как оценивать решение, принятое в игре?" },
              a: [{ pl: "Według końcowego wyniku gry", ru: "По итоговому результату игры" }, { pl: "Według argumentów znanych w chwili wyboru", ru: "По аргументам, известным в момент выбора" }, { pl: "Według wyników innych graczy", ru: "По результатам других игроков" }, { pl: "Według liczby kart Los", ru: "По числу карточек «Судьба»" }],
              correct: 1, why: { pl: "Wynik zależy też od przypadku; wygrana nie dowodzi poprawności każdej decyzji.", ru: "Результат зависит и от случая; победа не доказывает правильность каждого решения." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Ile punktów można zdobyć za raport, a ile za test?", ru: "Сколько баллов даёт отчёт и сколько тест?" },
          a: [{ pl: "15 i 15", ru: "15 и 15" }, { pl: "20 i 10", ru: "20 и 10" }, { pl: "10 i 20", ru: "10 и 20" }, { pl: "30 i 0", ru: "30 и 0" }],
          correct: 2, why: { pl: "Raport — 10 pkt, test końcowy — 20 pkt, razem 30.", ru: "Отчёт — 10 баллов, итоговый тест — 20, всего 30." } },
        { q: { pl: "Jaką ocenę daje 20 punktów?", ru: "Какую оценку дают 20 баллов?" },
          a: [{ pl: "3,5", ru: "3,5" }, { pl: "3,0", ru: "3,0" }, { pl: "4,0", ru: "4,0" }, { pl: "2,0", ru: "2,0" }],
          correct: 0, why: { pl: "Przedział 19–21 punktów to ocena 3,5.", ru: "Интервал 19–21 балл — оценка 3,5." } },
        { q: { pl: "Które równanie jest zawsze prawdziwe dla okazji w Eurocash?", ru: "Какое равенство всегда верно для возможности в Eurocash?" },
          a: [{ pl: "Dług = cena + wkład", ru: "Долг = цена + вклад" }, { pl: "Cena = wkład własny + dług", ru: "Цена = собственный вклад + долг" }, { pl: "Wkład = przepływ × 12", ru: "Вклад = поток × 12" }, { pl: "Cena = przepływ × 100", ru: "Цена = поток × 100" }],
          correct: 1, why: { pl: "Transakcję finansuje się wkładem i długiem.", ru: "Сделка финансируется вкладом и долгом." } },
        { q: { pl: "Ile gotówki zostaje po zakupie A przy 20 000 zł na start?", ru: "Сколько наличных остаётся после покупки A при 20 000 зл на старте?" },
          a: [{ pl: "10 000 zł", ru: "10 000 зл" }, { pl: "15 000 zł", ru: "15 000 зл" }, { pl: "0 zł", ru: "0 зл" }, { pl: "5 000 zł", ru: "5 000 зл" }],
          correct: 3, why: { pl: "20 000 − 15 000 (wkład) = 5 000 zł.", ru: "20 000 − 15 000 (вклад) = 5 000 зл." } },
        { q: { pl: "Relacja przepływu do wkładu dla A wynosi:", ru: "Отношение потока к вкладу для A:" },
          a: [{ pl: "24%", ru: "24%" }, { pl: "30%", ru: "30%" }, { pl: "6%", ru: "6%" }, { pl: "50%", ru: "50%" }],
          correct: 0, why: { pl: "3 600 / 15 000 = 0,24 = 24%.", ru: "3 600 / 15 000 = 0,24 = 24%." } },
        { q: { pl: "Czas odzyskania wkładu w B wynosi:", ru: "Срок возврата вклада в B:" },
          a: [{ pl: "50 miesięcy", ru: "50 месяцев" }, { pl: "30 miesięcy", ru: "30 месяцев" }, { pl: "40 miesięcy", ru: "40 месяцев" }, { pl: "160 miesięcy", ru: "160 месяцев" }],
          correct: 2, why: { pl: "10 000 / 250 = 40 miesięcy.", ru: "10 000 / 250 = 40 месяцев." } },
        { q: { pl: "Wzór na czas odzyskania wkładu zakłada, że:", ru: "Формула срока возврата вклада предполагает, что:" },
          a: [{ pl: "przepływ rośnie co roku", ru: "поток растёт каждый год" }, { pl: "przepływ jest stały i dodatni", ru: "поток постоянный и положительный" }, { pl: "inwestycja zostanie sprzedana", ru: "инвестиция будет продана" }, { pl: "nie ma długu", ru: "долга нет" }],
          correct: 1, why: { pl: "Dzielimy wkład przez stały miesięczny przepływ — inaczej wynik nie ma sensu.", ru: "Делим вклад на постоянный ежемесячный поток — иначе результат не имеет смысла." } },
        { q: { pl: "Wpływ netto ze sprzedaży liczymy jako:", ru: "Чистое поступление от продажи считается как:" },
          a: [{ pl: "cena − wkład", ru: "цена − вклад" }, { pl: "cena + dług − koszt", ru: "цена + долг − расходы" }, { pl: "dług − koszt", ru: "долг − расходы" }, { pl: "cena − dług − koszt sprzedaży", ru: "цена − долг − расходы на продажу" }],
          correct: 3, why: { pl: "Najpierw spłacamy dług i koszt transakcji; wynik = wpływ netto − wkład.", ru: "Сначала гасим долг и расходы; результат = чистое поступление − вклад." } },
        { q: { pl: "Dźwignia finansowa oznacza, że dług:", ru: "Финансовый рычаг означает, что долг:" },
          a: [{ pl: "zwiększa zyski i straty liczone względem wkładu", ru: "увеличивает прибыль и убытки относительно вклада" }, { pl: "zmniejsza ryzyko", ru: "снижает риск" }, { pl: "zwiększa tylko zyski", ru: "увеличивает только прибыль" }, { pl: "nie wpływa na wynik", ru: "не влияет на результат" }],
          correct: 0, why: { pl: "W przykładzie A ±10% ceny dało +33% lub −47% wkładu.", ru: "В примере A ±10% цены дали +33% или −47% вклада." } },
        { q: { pl: "Roczny przepływ A po spadku o 30% wynosi:", ru: "Годовой поток A после падения на 30%:" },
          a: [{ pl: "2 100 zł", ru: "2 100 зл" }, { pl: "2 520 zł", ru: "2 520 зл" }, { pl: "3 600 zł", ru: "3 600 зл" }, { pl: "1 080 zł", ru: "1 080 зл" }],
          correct: 1, why: { pl: "210 zł × 12 = 2 520 zł.", ru: "210 зл × 12 = 2 520 зл." } },
        { q: { pl: "Dlaczego w Eurocash zapisujemy też odrzucone okazje?", ru: "Зачем в Eurocash записывать и отклонённые возможности?" },
          a: [{ pl: "Bo dają dodatkowe punkty", ru: "Потому что дают дополнительные баллы" }, { pl: "Bo wymaga tego bank", ru: "Потому что этого требует банк" }, { pl: "Bo rezygnacja też jest decyzją, którą trzeba uzasadnić", ru: "Потому что отказ — тоже решение, которое нужно обосновать" }, { pl: "Bo zmieniają regulamin", ru: "Потому что меняют правила" }],
          correct: 2, why: { pl: "Analiza obejmuje wszystkie istotne decyzje, także „nie kupuję”.", ru: "Анализ охватывает все важные решения, включая «не покупаю»." } },
        { q: { pl: "Wygrana w grze dowodzi, że:", ru: "Победа в игре доказывает, что:" },
          a: [{ pl: "wszystkie decyzje były dobre", ru: "все решения были хорошими" }, { pl: "gracz miał najwięcej długu", ru: "у игрока было больше всего долга" }, { pl: "raport dostanie 10 pkt", ru: "отчёт получит 10 баллов" }, { pl: "niczego nie dowodzi o jakości każdej decyzji — wpływa na nią także przypadek", ru: "ничего не доказывает о качестве каждого решения — на результат влияет и случай" }],
          correct: 3, why: { pl: "Wynik to decyzje plus los; oceniamy argumenty z chwili wyboru.", ru: "Результат — это решения плюс случай; оцениваем аргументы на момент выбора." } },
      ],
    },
    {
      n: 2,
      color: "--c2",
      title: { pl: "Od pomysłu do inwestycji", ru: "От идеи к инвестиции" },
      lead: {
        pl: "Czym jest inwestycja i jak nazywamy jej elementy, według jakich kryteriów dzielimy inwestycje, kto uczestniczy w procesie inwestycyjnym i przez jakie etapy przechodzi projekt — od pomysłu do eksploatacji.",
        ru: "Что такое инвестиция и как называются её элементы, по каким критериям классифицируют инвестиции, кто участвует в инвестиционном процессе и через какие этапы проходит проект — от идеи до эксплуатации.",
      },
      subs: [
        // ------------------------------------------------------------------ 2.1
        {
          id: "2.1",
          title: { pl: "Istota inwestycji i podstawowe pojęcia", ru: "Сущность инвестиции и основные понятия" },
          src: "Karta przedmiotu (treści programowe) + literatura: Mayo, Inwestycje; Sławiński, Chmielewska, Zrozumieć rynki finansowe",
          body: {
            pl: `Słowo „inwestycja” słyszymy codziennie: inwestuje firma, gmina, student kupujący kurs programowania. Co łączy te sytuacje?

## Czym jest inwestycja
[[inwestycja|Inwestycja]] to **rezygnacja z dzisiejszej konsumpcji** — zaangażowanie pieniędzy lub innych zasobów teraz — **w nadziei na korzyści w przyszłości**. Te korzyści są niepewne i rozłożone w czasie.

W tej definicji kryją się trzy elementy, które będą wracać przez cały przedmiot:
1. **Nakład dziś** — wiemy, ile wydajemy.
2. **Korzyści jutro** — przychody, oszczędności, wzrost wartości.
3. **Czas i niepewność** — korzyści przyjdą później i mogą okazać się mniejsze, niż zakładaliśmy.

> !zapamietaj Inwestycja = **pewny nakład teraz** w zamian za **niepewne korzyści później**. Dlatego ocena każdej inwestycji wymaga uwzględnienia [[wartosc-pieniadza-w-czasie|wartości pieniądza w czasie]] i [[ryzyko-inwestycyjne|ryzyka]].

## Inwestycja w ekonomii i w finansach
W makroekonomii [[inwestycje]] to wydatki na nowe dobra kapitałowe: maszyny, budynki, zapasy. Kupno akcji na giełdzie z punktu widzenia całej gospodarki to tylko zmiana właściciela papieru.

W finansach osobistych i w tym przedmiocie patrzymy szerzej: inwestycją jest też zakup akcji, obligacji czy jednostek funduszu, bo inwestor angażuje pieniądze, licząc na przyszły dochód.

## Cztery pojęcia z karty przedmiotu
W literaturze o inwestycjach rzeczowych (np. budowie zakładu) używa się kilku pojęć ułożonych od ogólnego do szczegółowego:

| Pojęcie | Znaczenie | Przykład: nowe centrum logistyczne |
|---|---|---|
| [[inwestycja|Inwestycja]] | ogólna idea zaangażowania zasobów dla przyszłych korzyści | decyzja firmy o rozbudowie sieci dystrybucji |
| [[przedsiewziecie-inwestycyjne|Przedsięwzięcie inwestycyjne]] | całość działań prowadzących do realizacji inwestycji, z budżetem i harmonogramem | budowa i uruchomienie centrum pod Gdańskiem |
| [[zadanie-inwestycyjne|Zadanie inwestycyjne]] | wyodrębniona część przedsięwzięcia, którą można zaplanować i rozliczyć osobno | budowa hali magazynowej, droga dojazdowa, system IT |
| [[obiekt-inwestycyjny|Obiekt inwestycyjny]] | konkretny, fizyczny efekt, który po oddaniu do użytku może samodzielnie działać | gotowa hala nr 1 z rampami |

Przedsięwzięcie składa się więc z zadań, a efektem zadań są obiekty.

> !przyklad Gmina chce poprawić komunikację. **Inwestycja**: rozwój transportu publicznego. **Przedsięwzięcie**: budowa linii tramwajowej. **Zadania**: torowisko, zajezdnia, sieć trakcyjna. **Obiekty**: gotowa zajezdnia, odcinek torowiska oddany do ruchu.

## Nakłady i efekty
Każde przedsięwzięcie opisują dwie strony:
- **Nakłady inwestycyjne** — jednorazowe wydatki na stworzenie lub zakup aktywów (grunt, budowa, maszyny, wdrożenie).
- **Efekty** — przyszłe [[przeplyw-pieniezny|przepływy pieniężne]]: przychody, oszczędności kosztów, wartość końcowa.

W Eurocash nakładem był **wkład własny** (plus dług), a efektem — miesięczny **przychód pasywny**. To ten sam schemat, tylko w uproszczeniu.

## Inwestowanie a spekulacja i oszczędzanie
| | Oszczędzanie | Inwestowanie | Spekulacja |
|---|---|---|---|
| Cel | bezpieczeństwo, odłożenie pieniędzy | wzrost majątku w średnim i długim okresie | szybki zysk ze zmiany ceny |
| Ryzyko | niskie | umiarkowane do wysokiego | wysokie |
| Podstawa decyzji | potrzeba rezerwy | analiza przyszłych korzyści | przewidywanie krótkich ruchów cen |

Granica nie jest ostra — ten sam zakup akcji może być inwestycją albo spekulacją, zależnie od celu, horyzontu i sposobu podejmowania decyzji.

> !uwaga Inwestycja nie jest „pewnym sposobem na zarobek”. Jeśli ktoś obiecuje wysoki zysk **bez ryzyka**, to najpewniej coś ukrywa — zysk i ryzyko zawsze idą w parze.`,
            ru: `Слово «инвестиция» звучит каждый день: инвестирует фирма, город (gmina), студент, покупающий курс программирования. Что объединяет эти ситуации?

## Что такое инвестиция
[[inwestycja|Инвестиция]] — это **отказ от сегодняшнего потребления**, то есть вложение денег или других ресурсов сейчас **в надежде на выгоды в будущем**. Эти выгоды неопределённы и растянуты во времени.

В этом определении три элемента, которые будут возвращаться весь курс:
1. **Затраты сегодня** — мы знаем, сколько тратим.
2. **Выгоды завтра** — доходы, экономия, рост стоимости.
3. **Время и неопределённость** — выгоды придут позже и могут оказаться меньше ожидаемых.

> !zapamietaj Инвестиция = **определённые затраты сейчас** в обмен на **неопределённые выгоды потом**. Поэтому оценка любой инвестиции требует учитывать [[wartosc-pieniadza-w-czasie|стоимость денег во времени]] и [[ryzyko-inwestycyjne|риск]].

## Инвестиция в экономике и в финансах
В макроэкономике [[inwestycje|инвестиции]] — это расходы на новые капитальные блага: машины, здания, запасы. Покупка акций на бирже для экономики в целом — лишь смена владельца бумаги.

В личных финансах и в этом курсе мы смотрим шире: инвестицией считается и покупка акций, облигаций или паёв фонда, ведь инвестор вкладывает деньги в расчёте на будущий доход.

## Четыре понятия из карты предмета
В литературе о реальных инвестициях (например, строительстве завода) используется несколько понятий — от общего к частному:

| Понятие | Значение | Пример: новый логистический центр |
|---|---|---|
| [[inwestycja|Инвестиция (inwestycja)]] | общая идея вложения ресурсов ради будущих выгод | решение фирмы расширить дистрибуционную сеть |
| [[przedsiewziecie-inwestycyjne|Инвестиционное мероприятие (przedsięwzięcie inwestycyjne)]] | совокупность действий для реализации инвестиции, с бюджетом и графиком | строительство и запуск центра под Гданьском |
| [[zadanie-inwestycyjne|Инвестиционная задача (zadanie inwestycyjne)]] | выделенная часть мероприятия, которую можно отдельно запланировать и отчитаться | строительство склада, подъездная дорога, IT-система |
| [[obiekt-inwestycyjny|Инвестиционный объект (obiekt inwestycyjny)]] | конкретный физический результат, который после ввода в эксплуатацию может работать самостоятельно | готовый склад № 1 с рампами |

Мероприятие состоит из задач, а результат задач — объекты.

> !przyklad Город хочет улучшить транспорт. **Инвестиция**: развитие общественного транспорта. **Мероприятие**: строительство трамвайной линии. **Задачи**: пути, депо, контактная сеть. **Объекты**: готовое депо, участок пути, сданный в эксплуатацию.

## Затраты и эффекты
Каждое мероприятие описывают две стороны:
- **Инвестиционные затраты** — разовые расходы на создание или покупку активов (участок, строительство, оборудование, внедрение).
- **Эффекты** — будущие [[przeplyw-pieniezny|денежные потоки]]: доходы, экономия затрат, конечная стоимость.

В Eurocash затратами был **собственный вклад** (плюс долг), а эффектом — ежемесячный **пассивный доход**. Это та же схема, только упрощённая.

## Инвестирование, сбережение и спекуляция
| | Сбережение | Инвестирование | Спекуляция |
|---|---|---|---|
| Цель | безопасность, отложить деньги | рост капитала в средне- и долгосрочной перспективе | быстрая прибыль на изменении цены |
| Риск | низкий | от умеренного до высокого | высокий |
| Основа решения | потребность в резерве | анализ будущих выгод | прогноз краткосрочных движений цен |

Граница нечёткая: одна и та же покупка акций может быть инвестицией или спекуляцией — в зависимости от цели, горизонта и способа принятия решения.

> !uwaga Инвестиция — не «верный способ заработать». Если кто-то обещает высокую прибыль **без риска**, он, скорее всего, что-то скрывает: доходность и риск всегда идут рядом.`,
          },
          quiz: [
            { q: { pl: "Co jest istotą inwestycji?", ru: "В чём сущность инвестиции?" },
              a: [{ pl: "Wydanie pieniędzy na bieżącą konsumpcję", ru: "Трата денег на текущее потребление" }, { pl: "Zaangażowanie zasobów dziś w nadziei na niepewne korzyści w przyszłości", ru: "Вложение ресурсов сегодня в надежде на неопределённые будущие выгоды" }, { pl: "Gwarantowany zysk bez ryzyka", ru: "Гарантированная прибыль без риска" }, { pl: "Wyłącznie zakup akcji", ru: "Исключительно покупка акций" }],
              correct: 1, why: { pl: "Inwestycja łączy pewny nakład teraz z niepewnymi korzyściami później.", ru: "Инвестиция сочетает определённые затраты сейчас с неопределёнными выгодами потом." } },
            { q: { pl: "Wyodrębniona część przedsięwzięcia, którą można osobno zaplanować i rozliczyć, to:", ru: "Выделенная часть мероприятия, которую можно отдельно спланировать и учесть, — это:" },
              a: [{ pl: "obiekt inwestycyjny", ru: "инвестиционный объект" }, { pl: "inwestor", ru: "инвестор" }, { pl: "zadanie inwestycyjne", ru: "инвестиционная задача" }, { pl: "portfel", ru: "портфель" }],
              correct: 2, why: { pl: "Przedsięwzięcie dzieli się na zadania, a efektem zadań są obiekty.", ru: "Мероприятие делится на задачи, а их результат — объекты." } },
            { q: { pl: "Gotowa zajezdnia tramwajowa oddana do użytku to przykład:", ru: "Готовое трамвайное депо, сданное в эксплуатацию, — пример:" },
              a: [{ pl: "obiektu inwestycyjnego", ru: "инвестиционного объекта" }, { pl: "nakładu inwestycyjnego", ru: "инвестиционных затрат" }, { pl: "spekulacji", ru: "спекуляции" }, { pl: "przedsięwzięcia", ru: "мероприятия" }],
              correct: 0, why: { pl: "Obiekt to fizyczny efekt, który może samodzielnie funkcjonować.", ru: "Объект — физический результат, способный функционировать самостоятельно." } },
            { q: { pl: "Czym spekulacja różni się zwykle od inwestowania?", ru: "Чем спекуляция обычно отличается от инвестирования?" },
              a: [{ pl: "Spekulacja ma niższe ryzyko", ru: "У спекуляции ниже риск" }, { pl: "Spekulacja dotyczy tylko nieruchomości", ru: "Спекуляция касается только недвижимости" }, { pl: "Nie ma żadnej różnicy", ru: "Никакой разницы нет" }, { pl: "Spekulant liczy na szybki zysk z krótkiej zmiany ceny", ru: "Спекулянт рассчитывает на быструю прибыль от краткосрочного изменения цены" }],
              correct: 3, why: { pl: "Spekulacja ma krótki horyzont i wysokie ryzyko; inwestowanie opiera się na analizie przyszłych korzyści.", ru: "Спекуляция — короткий горизонт и высокий риск; инвестирование опирается на анализ будущих выгод." } },
          ],
        },
        // ------------------------------------------------------------------ 2.2
        {
          id: "2.2",
          title: { pl: "Klasyfikacja inwestycji", ru: "Классификация инвестиций" },
          src: "Karta przedmiotu (podział inwestycji według podstawowych kryteriów) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Inwestycje są bardzo różne: hala produkcyjna, mieszkanie na wynajem, obligacje skarbowe, sztabka złota. Żeby je porządkować i porównywać, dzielimy je według kilku kryteriów. Jedna inwestycja może jednocześnie należeć do kilku grup.

## 1. Według przedmiotu: rzeczowe i finansowe
| | Inwestycje rzeczowe | Inwestycje finansowe |
|---|---|---|
| Co kupujemy | aktywa materialne lub niematerialne używane w działalności | prawa do przyszłych przepływów (papiery, udziały, wkłady) |
| Przykłady | maszyna, budynek, grunt, oprogramowanie, patent | akcje, obligacje, jednostki funduszy, lokaty |
| Płynność | zwykle niska | zwykle wyższa |
| Kto najczęściej | przedsiębiorstwa, państwo, samorządy | gospodarstwa domowe, fundusze, banki |

[[inwestycja-rzeczowa|Inwestycje rzeczowe]] tworzą lub powiększają majątek produkcyjny. [[inwestycja-finansowa|Inwestycje finansowe]] polegają na nabyciu instrumentów, które dają prawo do dochodu (odsetek, dywidend) lub do udziału we wzroście wartości.

## 2. Według sposobu: bezpośrednie i pośrednie
- [[inwestycja-bezposrednia|Inwestowanie bezpośrednie]] — inwestor sam wybiera i kupuje aktywa: konkretne akcje, obligacje, mieszkanie. Sam podejmuje decyzje i ponosi ich skutki.
- [[inwestycja-posrednia|Inwestowanie pośrednie]] — inwestor powierza pieniądze instytucji (np. [[fundusz-inwestycyjny|funduszowi inwestycyjnemu]]), a decyzje podejmują zawodowi zarządzający.

> !uwaga W finansach międzynarodowych „inwestycje bezpośrednie” (BIZ) to coś innego: zakup co najmniej znaczącego udziału w zagranicznej firmie dający wpływ na zarządzanie. W tym przedmiocie, zgodnie z kartą, chodzi o rozróżnienie **samodzielnie / przez pośrednika**.

## 3. Według horyzontu czasowego
| Horyzont | Orientacyjny czas | Przykład |
|---|---|---|
| Krótkoterminowe | do 1 roku | bony, krótkie lokaty |
| Średnioterminowe | 1–5 lat | obligacje kilkuletnie |
| Długoterminowe | powyżej 5 lat | akcje na emeryturę, nieruchomość, fabryka |

Granice są umowne — różni autorzy podają je nieco inaczej.

## 4. Według celu (inwestycje przedsiębiorstwa)
- **Odtworzeniowe** — wymiana zużytego majątku na nowy (stara maszyna → nowa tego samego typu).
- **Rozwojowe** — zwiększenie skali działania: nowa linia produkcyjna, nowy sklep.
- **Modernizacyjne** — poprawa jakości lub obniżka kosztów istniejącej działalności.
- **Innowacyjne** — nowe produkty lub technologie.
- **Strategiczne** — wejście na nowe rynki, przejęcia.
- **Obowiązkowe** — wymuszone przepisami, np. ochrona środowiska, bezpieczeństwo pracy.

> !przyklad Piekarnia wymienia zepsuty piec na identyczny — inwestycja **odtworzeniowa**. Kupuje drugi piec, bo chce piec więcej — **rozwojowa**. Instaluje filtr wymagany przez nowe przepisy — **obowiązkowa**.

## 5. Według podmiotu
- **prywatne** (osoby, firmy),
- **publiczne** (państwo, samorząd — drogi, szkoły, szpitale),
- **partnerstwo publiczno-prywatne** — wspólna realizacja.

## 6. Inne kryteria
- **Według ryzyka**: bezpieczne (np. obligacje skarbowe) vs ryzykowne (akcje małych spółek).
- **Według zależności**: niezależne (można zrealizować obie), wzajemnie wykluczające się (wybór A oznacza rezygnację z B — jak w Eurocash przy ograniczonej gotówce), komplementarne (jedna wymaga drugiej).
- **Tradycyjne vs [[inwestycje-alternatywne|alternatywne]]**: akcje, obligacje i lokaty kontra złoto, sztuka, wino, REIT-y.

> !zapamietaj Najważniejsze podziały: **rzeczowe / finansowe**, **bezpośrednie / pośrednie**, **krótko- / średnio- / długoterminowe** oraz **według celu**. Klasyfikacja pomaga dobrać metodę oceny: inwestycję w maszynę ocenimy rachunkiem przepływów, akcję — także analizą rynku i ryzyka.

## Po co klasyfikować?
Bo od rodzaju inwestycji zależą pytania, jakie zadajemy. Przy inwestycji rzeczowej pytamy o koszt budowy i przyszłe oszczędności; przy finansowej — o [[plynnosc|płynność]], ryzyko emitenta i koszty pośrednika. Inwestycje wzajemnie wykluczające się trzeba porównać, a niezależne — ocenić osobno.`,
            ru: `Инвестиции очень разные: производственный цех, квартира под сдачу, государственные облигации, слиток золота. Чтобы упорядочить и сравнивать их, мы делим инвестиции по нескольким критериям. Одна инвестиция может одновременно относиться к нескольким группам.

## 1. По предмету: реальные и финансовые
| | Реальные инвестиции | Финансовые инвестиции |
|---|---|---|
| Что покупаем | материальные или нематериальные активы для деятельности | права на будущие потоки (бумаги, доли, вклады) |
| Примеры | станок, здание, земля, программное обеспечение, патент | акции, облигации, паи фондов, депозиты |
| Ликвидность | обычно низкая | обычно выше |
| Кто чаще всего | предприятия, государство, органы самоуправления | домохозяйства, фонды, банки |

[[inwestycja-rzeczowa|Реальные инвестиции (inwestycje rzeczowe)]] создают или увеличивают производственный капитал. [[inwestycja-finansowa|Финансовые инвестиции]] — это покупка инструментов, дающих право на доход (проценты, дивиденды) или на участие в росте стоимости.

## 2. По способу: прямые и косвенные
- [[inwestycja-bezposrednia|Прямое инвестирование]] — инвестор сам выбирает и покупает активы: конкретные акции, облигации, квартиру. Сам принимает решения и несёт их последствия.
- [[inwestycja-posrednia|Косвенное инвестирование]] — инвестор доверяет деньги учреждению (например, [[fundusz-inwestycyjny|инвестиционному фонду]]), а решения принимают профессиональные управляющие.

> !uwaga В международных финансах «прямые иностранные инвестиции» (BIZ) — другое понятие: покупка как минимум значительной доли в зарубежной фирме, дающей влияние на управление. В этом курсе, согласно карте предмета, речь о различии **самостоятельно / через посредника**.

## 3. По горизонту времени
| Горизонт | Ориентировочный срок | Пример |
|---|---|---|
| Краткосрочные | до 1 года | векселя, короткие депозиты |
| Среднесрочные | 1–5 лет | облигации на несколько лет |
| Долгосрочные | свыше 5 лет | акции на пенсию, недвижимость, завод |

Границы условны — разные авторы указывают их немного по-разному.

## 4. По цели (инвестиции предприятия)
- **Восстановительные** — замена изношенного имущества новым (старый станок → новый того же типа).
- **Развивающие** — увеличение масштаба: новая производственная линия, новый магазин.
- **Модернизационные** — повышение качества или снижение затрат существующей деятельности.
- **Инновационные** — новые продукты или технологии.
- **Стратегические** — выход на новые рынки, поглощения.
- **Обязательные** — вынужденные законом, например охрана окружающей среды, безопасность труда.

> !przyklad Пекарня меняет сломанную печь на такую же — **восстановительная** инвестиция. Покупает вторую печь, чтобы печь больше, — **развивающая**. Ставит фильтр по требованию новых правил — **обязательная**.

## 5. По субъекту
- **частные** (люди, фирмы),
- **государственные** (государство, самоуправление — дороги, школы, больницы),
- **государственно-частное партнёрство** — совместная реализация.

## 6. Другие критерии
- **По риску**: безопасные (например, государственные облигации) и рискованные (акции малых компаний).
- **По взаимосвязи**: независимые (можно реализовать обе), взаимоисключающие (выбор A означает отказ от B — как в Eurocash при ограниченных наличных), взаимодополняющие (одна требует другой).
- **Традиционные и [[inwestycje-alternatywne|альтернативные]]**: акции, облигации и депозиты против золота, искусства, вина, REIT.

> !zapamietaj Главные деления: **реальные / финансовые**, **прямые / косвенные**, **кратко- / средне- / долгосрочные** и **по цели**. Классификация помогает выбрать метод оценки: инвестицию в станок оценим расчётом потоков, акцию — ещё и анализом рынка и риска.

## Зачем классифицировать?
Потому что от вида инвестиции зависят вопросы, которые мы задаём. Для реальной инвестиции спрашиваем о стоимости строительства и будущей экономии; для финансовой — о [[plynnosc|ликвидности]], риске эмитента и расходах посредника. Взаимоисключающие инвестиции нужно сравнивать, а независимые — оценивать по отдельности.`,
          },
          quiz: [
            { q: { pl: "Zakup nowej maszyny przez firmę to inwestycja:", ru: "Покупка фирмой нового станка — это инвестиция:" },
              a: [{ pl: "finansowa", ru: "финансовая" }, { pl: "pośrednia", ru: "косвенная" }, { pl: "rzeczowa", ru: "реальная" }, { pl: "alternatywna", ru: "альтернативная" }],
              correct: 2, why: { pl: "Maszyna to aktywo materialne używane w działalności — inwestycja rzeczowa.", ru: "Станок — материальный актив для деятельности, это реальная инвестиция." } },
            { q: { pl: "Kupno jednostek funduszu inwestycyjnego to przykład inwestowania:", ru: "Покупка паёв инвестиционного фонда — пример инвестирования:" },
              a: [{ pl: "pośredniego", ru: "косвенного" }, { pl: "bezpośredniego", ru: "прямого" }, { pl: "rzeczowego", ru: "реального" }, { pl: "obowiązkowego", ru: "обязательного" }],
              correct: 0, why: { pl: "Decyzje o wyborze aktywów podejmuje zarządzający funduszem, a nie inwestor.", ru: "Решения о выборе активов принимает управляющий фондом, а не инвестор." } },
            { q: { pl: "Firma wymienia zużytą maszynę na identyczną. To inwestycja:", ru: "Фирма меняет изношенный станок на такой же. Это инвестиция:" },
              a: [{ pl: "rozwojowa", ru: "развивающая" }, { pl: "strategiczna", ru: "стратегическая" }, { pl: "innowacyjna", ru: "инновационная" }, { pl: "odtworzeniowa", ru: "восстановительная" }],
              correct: 3, why: { pl: "Odtworzeniowa przywraca dotychczasowe możliwości, nie zwiększa skali.", ru: "Восстановительная возвращает прежние возможности, не увеличивая масштаб." } },
            { q: { pl: "Inwestycje A i B są wzajemnie wykluczające się, gdy:", ru: "Инвестиции A и B взаимоисключающие, если:" },
              a: [{ pl: "można zrealizować obie", ru: "можно реализовать обе" }, { pl: "wybór jednej oznacza rezygnację z drugiej", ru: "выбор одной означает отказ от другой" }, { pl: "jedna wymaga drugiej", ru: "одна требует другой" }, { pl: "mają ten sam horyzont", ru: "у них одинаковый горизонт" }],
              correct: 1, why: { pl: "Np. przy ograniczonej gotówce lub jednej działce można wybrać tylko jedną.", ru: "Например, при ограниченных деньгах или одном участке можно выбрать только одну." } },
            { q: { pl: "Inwestycja na ponad 5 lat to zwykle inwestycja:", ru: "Инвестиция на срок более 5 лет обычно считается:" },
              a: [{ pl: "krótkoterminowa", ru: "краткосрочной" }, { pl: "średnioterminowa", ru: "среднесрочной" }, { pl: "długoterminowa", ru: "долгосрочной" }, { pl: "spekulacyjna", ru: "спекулятивной" }],
              correct: 2, why: { pl: "Orientacyjnie: do 1 roku krótko, 1–5 lat średnio, powyżej 5 lat długo.", ru: "Ориентировочно: до 1 года — кратко, 1–5 лет — средне, свыше 5 лет — долго." } },
          ],
        },
        // ------------------------------------------------------------------ 2.3
        {
          id: "2.3",
          title: { pl: "Projekt i proces inwestycyjny: uczestnicy i cykl rozwoju", ru: "Инвестиционный проект и процесс: участники и цикл развития" },
          src: "Karta przedmiotu (projekt inwestycyjny, proces inwestycyjny, uczestnicy, cykl rozwoju projektu) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Między pomysłem „zbudujmy nowy sklep” a dniem otwarcia jest długa droga. Tę drogę opisują dwa pojęcia: projekt inwestycyjny i proces inwestycyjny.

## Projekt inwestycyjny
[[projekt-inwestycyjny|Projekt inwestycyjny]] to zaplanowane przedsięwzięcie o **określonym celu, budżecie, czasie realizacji i oczekiwanych efektach**. Projekt ma początek i koniec, a jego wynik da się zmierzyć. Opisuje się go w dokumentach: biznesplanie, [[studium-wykonalnosci|studium wykonalności]], harmonogramie.

## Proces inwestycyjny
[[proces-inwestycyjny|Proces inwestycyjny]] to **uporządkowany ciąg działań** od zrodzenia się pomysłu, przez decyzję i realizację, do eksploatacji i rozliczenia efektów. Projekt to „co”, a proces to „jak i w jakiej kolejności”.

## Cykl rozwoju projektu inwestycyjnego
Typowo wyróżnia się trzy główne fazy (tak np. w metodyce UNIDO):

| Faza | Co się dzieje | Kluczowe pytanie |
|---|---|---|
| **1. Przedinwestycyjna** | identyfikacja pomysłu, wstępna analiza, studium wykonalności, decyzja | Czy warto i czy się da? |
| **2. Inwestycyjna (realizacyjna)** | finansowanie, projekt techniczny, pozwolenia, przetargi, budowa, zakup wyposażenia, rozruch | Jak zrealizować w budżecie i terminie? |
| **3. Operacyjna (eksploatacyjna)** | działanie obiektu, generowanie przepływów, ocena efektów, na końcu likwidacja lub odtworzenie | Czy inwestycja daje zakładane korzyści? |

### Faza przedinwestycyjna
To najtańsza faza, ale najważniejsza: tu zapadają decyzje, których później nie da się tanio zmienić.
1. **Identyfikacja okazji** — skąd pomysł? Potrzeba rynku, problem w firmie, nowe przepisy.
2. **Studium wstępne** — szybkie sprawdzenie, czy pomysł ma sens.
3. **Studium wykonalności** — szczegółowa analiza: rynek, technologia, lokalizacja, koszty, finansowanie, prognoza przepływów, [[ryzyko-inwestycyjne|ryzyko]], [[npv|opłacalność]].
4. **Decyzja inwestycyjna** — realizować, zmienić czy odrzucić.

### Faza inwestycyjna
Tu wydaje się najwięcej pieniędzy. Typowe ryzyka: opóźnienia, przekroczenie budżetu, problemy z wykonawcą.

### Faza operacyjna
Obiekt pracuje i przynosi efekty. Porównujemy rzeczywistość z planem (tzw. ocena ex post) i wyciągamy wnioski na przyszłość.

> !zapamietaj Im wcześniej w cyklu, tym **taniej można coś zmienić**. Błąd wykryty w studium wykonalności kosztuje kartkę papieru, ten sam błąd wykryty w trakcie budowy — miliony.

## Uczestnicy procesu inwestycyjnego
| Uczestnik | Rola |
|---|---|
| [[inwestor|Inwestor]] | ma cel, podejmuje decyzję, finansuje i ponosi ryzyko; staje się właścicielem efektów |
| Projektant | przygotowuje dokumentację techniczną |
| Wykonawca (generalny wykonawca, podwykonawcy) | realizuje roboty i dostawy |
| Inspektor nadzoru / inżynier kontraktu | kontroluje jakość i zgodność z projektem w imieniu inwestora |
| Instytucje finansujące | banki, fundusze, leasingodawcy — dostarczają kapitał dłużny |
| Organy administracji | wydają pozwolenia i decyzje (np. budowlane, środowiskowe) |
| Dostawcy, doradcy, użytkownicy | dostarczają urządzenia, wiedzę; korzystają z obiektu |

W prawie budowlanym wymienia się m.in. inwestora, inspektora nadzoru inwestorskiego, projektanta i kierownika budowy jako uczestników procesu budowlanego.

> !przyklad Firma handlowa buduje magazyn. **Inwestor** — firma. **Bank** daje kredyt (to jej [[dlug|dług]]). **Biuro projektowe** rysuje projekt. **Starostwo** wydaje pozwolenie na budowę. **Generalny wykonawca** stawia halę, a **inspektor nadzoru** sprawdza jakość. Po odbiorze magazyn wchodzi w fazę operacyjną i zaczyna przynosić oszczędności na kosztach transportu.

## Inwestycje finansowe też mają proces
Inwestor indywidualny przechodzi podobne kroki, tylko prostsze:
1. określenie celu, horyzontu i akceptowanego ryzyka,
2. analiza możliwości (akcje, obligacje, fundusze),
3. wybór i zakup,
4. monitorowanie i korekta [[portfel-inwestycyjny|portfela]],
5. wyjście z inwestycji i ocena wyniku.

> !uwaga W Eurocash też przechodzisz ten proces: plan przed grą (cel, rezerwa) to faza przedinwestycyjna, zakup — realizacja, a otrzymywanie przychodu pasywnego — faza operacyjna. Raport to Twoja ocena ex post.`,
            ru: `Между идеей «построим новый магазин» и днём открытия — долгий путь. Его описывают два понятия: инвестиционный проект и инвестиционный процесс.

## Инвестиционный проект
[[projekt-inwestycyjny|Инвестиционный проект]] — это спланированное мероприятие с **определённой целью, бюджетом, сроком реализации и ожидаемыми эффектами**. У проекта есть начало и конец, а результат можно измерить. Его описывают в документах: бизнес-плане, [[studium-wykonalnosci|технико-экономическом обосновании (studium wykonalności)]], графике.

## Инвестиционный процесс
[[proces-inwestycyjny|Инвестиционный процесс]] — это **упорядоченная последовательность действий** от рождения идеи, через решение и реализацию, до эксплуатации и подведения итогов. Проект — это «что», а процесс — «как и в каком порядке».

## Цикл развития инвестиционного проекта
Обычно выделяют три главные фазы (так, например, в методике UNIDO):

| Фаза | Что происходит | Ключевой вопрос |
|---|---|---|
| **1. Прединвестиционная** | поиск идеи, предварительный анализ, ТЭО, решение | Стоит ли и возможно ли? |
| **2. Инвестиционная (реализационная)** | финансирование, технический проект, разрешения, тендеры, строительство, закупка оборудования, пуск | Как реализовать в бюджет и срок? |
| **3. Операционная (эксплуатационная)** | работа объекта, генерация потоков, оценка эффектов, в конце ликвидация или замена | Даёт ли инвестиция ожидаемые выгоды? |

### Прединвестиционная фаза
Самая дешёвая, но самая важная фаза: здесь принимаются решения, которые потом дёшево не изменить.
1. **Поиск возможности** — откуда идея? Потребность рынка, проблема в фирме, новые правила.
2. **Предварительное исследование** — быстрая проверка, имеет ли идея смысл.
3. **ТЭО** — детальный анализ: рынок, технология, место, затраты, финансирование, прогноз потоков, [[ryzyko-inwestycyjne|риск]], [[npv|окупаемость]].
4. **Инвестиционное решение** — реализовать, изменить или отклонить.

### Инвестиционная фаза
Здесь тратится больше всего денег. Типичные риски: задержки, превышение бюджета, проблемы с подрядчиком.

### Операционная фаза
Объект работает и приносит эффекты. Сравниваем реальность с планом (так называемая оценка ex post) и делаем выводы на будущее.

> !zapamietaj Чем раньше в цикле, тем **дешевле что-то изменить**. Ошибка, найденная в ТЭО, стоит листа бумаги; та же ошибка во время строительства — миллионы.

## Участники инвестиционного процесса
| Участник | Роль |
|---|---|
| [[inwestor|Инвестор]] | имеет цель, принимает решение, финансирует и несёт риск; становится владельцем результатов |
| Проектировщик | готовит техническую документацию |
| Подрядчик (генподрядчик, субподрядчики) | выполняет работы и поставки |
| Инспектор надзора / инженер контракта | контролирует качество и соответствие проекту от имени инвестора |
| Финансирующие учреждения | банки, фонды, лизинговые компании — дают заёмный капитал |
| Органы администрации | выдают разрешения и решения (например, строительные, экологические) |
| Поставщики, консультанты, пользователи | поставляют оборудование, знания; пользуются объектом |

Польский строительный закон (prawo budowlane) называет участниками строительного процесса, в частности, инвестора, инспектора инвесторского надзора, проектировщика и руководителя строительства.

> !przyklad Торговая фирма строит склад. **Инвестор** — фирма. **Банк** даёт кредит (это её [[dlug|долг]]). **Проектное бюро** готовит проект. **Повятовая администрация (starostwo)** выдаёт разрешение на строительство. **Генподрядчик** возводит здание, а **инспектор надзора** проверяет качество. После приёмки склад входит в операционную фазу и начинает экономить на транспортных расходах.

## У финансовых инвестиций тоже есть процесс
Частный инвестор проходит похожие, но более простые шаги:
1. определение цели, горизонта и приемлемого риска,
2. анализ возможностей (акции, облигации, фонды),
3. выбор и покупка,
4. мониторинг и корректировка [[portfel-inwestycyjny|портфеля]],
5. выход из инвестиции и оценка результата.

> !uwaga В Eurocash вы тоже проходите этот процесс: план до игры (цель, резерв) — прединвестиционная фаза, покупка — реализация, получение пассивного дохода — операционная фаза. Отчёт — ваша оценка ex post.`,
          },
          quiz: [
            { q: { pl: "W której fazie cyklu powstaje studium wykonalności?", ru: "В какой фазе цикла создаётся ТЭО?" },
              a: [{ pl: "Operacyjnej", ru: "Операционной" }, { pl: "Przedinwestycyjnej", ru: "Прединвестиционной" }, { pl: "Inwestycyjnej", ru: "Инвестиционной" }, { pl: "Likwidacyjnej", ru: "Ликвидационной" }],
              correct: 1, why: { pl: "Studium wykonalności poprzedza decyzję inwestycyjną.", ru: "ТЭО предшествует инвестиционному решению." } },
            { q: { pl: "Kto podejmuje decyzję, finansuje inwestycję i ponosi jej ryzyko?", ru: "Кто принимает решение, финансирует инвестицию и несёт её риск?" },
              a: [{ pl: "Inwestor", ru: "Инвестор" }, { pl: "Projektant", ru: "Проектировщик" }, { pl: "Wykonawca", ru: "Подрядчик" }, { pl: "Organ administracji", ru: "Орган администрации" }],
              correct: 0, why: { pl: "Inwestor jest właścicielem przedsięwzięcia i jego efektów.", ru: "Инвестор — владелец мероприятия и его результатов." } },
            { q: { pl: "Dlaczego faza przedinwestycyjna jest tak ważna?", ru: "Почему прединвестиционная фаза так важна?" },
              a: [{ pl: "Bo wydaje się w niej najwięcej pieniędzy", ru: "Потому что в ней тратится больше всего денег" }, { pl: "Bo obiekt wtedy już działa", ru: "Потому что объект уже работает" }, { pl: "Bo nie ma w niej żadnych decyzji", ru: "Потому что в ней нет решений" }, { pl: "Bo zmiany na tym etapie są najtańsze", ru: "Потому что изменения на этом этапе самые дешёвые" }],
              correct: 3, why: { pl: "Błąd wykryty przed budową kosztuje znacznie mniej niż w trakcie realizacji.", ru: "Ошибка, найденная до строительства, обходится намного дешевле, чем во время реализации." } },
            { q: { pl: "Porównanie rzeczywistych efektów z planem po uruchomieniu obiektu to ocena:", ru: "Сравнение реальных эффектов с планом после запуска объекта — это оценка:" },
              a: [{ pl: "ex ante", ru: "ex ante" }, { pl: "wstępna", ru: "предварительная" }, { pl: "ex post", ru: "ex post" }, { pl: "przetargowa", ru: "тендерная" }],
              correct: 2, why: { pl: "Ex post = po fakcie, w fazie operacyjnej.", ru: "Ex post — после факта, в операционной фазе." } },
            { q: { pl: "Czym różni się projekt od procesu inwestycyjnego?", ru: "Чем проект отличается от инвестиционного процесса?" },
              a: [{ pl: "Niczym", ru: "Ничем" }, { pl: "Projekt to zaplanowane przedsięwzięcie („co”), proces to ciąg działań („jak i w jakiej kolejności”)", ru: "Проект — спланированное мероприятие («что»), процесс — последовательность действий («как и в каком порядке»)" }, { pl: "Proces dotyczy tylko akcji", ru: "Процесс касается только акций" }, { pl: "Projekt nie ma budżetu", ru: "У проекта нет бюджета" }],
              correct: 1, why: { pl: "Projekt ma cel, budżet i czas; proces opisuje kolejne etapy realizacji.", ru: "У проекта есть цель, бюджет и срок; процесс описывает этапы реализации." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Inwestycja to przede wszystkim:", ru: "Инвестиция — это прежде всего:" },
          a: [{ pl: "rezygnacja z bieżącej konsumpcji dla przyszłych, niepewnych korzyści", ru: "отказ от текущего потребления ради будущих неопределённых выгод" }, { pl: "zaciągnięcie kredytu", ru: "получение кредита" }, { pl: "zakup dóbr konsumpcyjnych", ru: "покупка потребительских товаров" }, { pl: "gwarantowany dochód", ru: "гарантированный доход" }],
          correct: 0, why: { pl: "Nakład dziś, korzyści później i niepewność — to trzy cechy inwestycji.", ru: "Затраты сегодня, выгоды потом и неопределённость — три черты инвестиции." } },
        { q: { pl: "Ułóż od ogólnego do szczegółowego:", ru: "Расположите от общего к частному:" },
          a: [{ pl: "obiekt → zadanie → przedsięwzięcie", ru: "объект → задача → мероприятие" }, { pl: "zadanie → przedsięwzięcie → obiekt", ru: "задача → мероприятие → объект" }, { pl: "przedsięwzięcie → zadanie → obiekt", ru: "мероприятие → задача → объект" }, { pl: "obiekt → przedsięwzięcie → zadanie", ru: "объект → мероприятие → задача" }],
          correct: 2, why: { pl: "Przedsięwzięcie dzieli się na zadania, a ich efektem są obiekty.", ru: "Мероприятие делится на задачи, их результат — объекты." } },
        { q: { pl: "Która inwestycja jest finansowa?", ru: "Какая инвестиция финансовая?" },
          a: [{ pl: "Budowa hali", ru: "Строительство цеха" }, { pl: "Zakup obligacji skarbowych", ru: "Покупка государственных облигаций" }, { pl: "Zakup ciężarówki", ru: "Покупка грузовика" }, { pl: "Modernizacja linii produkcyjnej", ru: "Модернизация производственной линии" }],
          correct: 1, why: { pl: "Obligacja to instrument dający prawo do przyszłych odsetek i zwrotu kapitału.", ru: "Облигация — инструмент, дающий право на будущие проценты и возврат капитала." } },
        { q: { pl: "Samodzielny zakup akcji konkretnej spółki to inwestowanie:", ru: "Самостоятельная покупка акций конкретной компании — это инвестирование:" },
          a: [{ pl: "pośrednie", ru: "косвенное" }, { pl: "rzeczowe", ru: "реальное" }, { pl: "publiczne", ru: "государственное" }, { pl: "bezpośrednie", ru: "прямое" }],
          correct: 3, why: { pl: "Inwestor sam wybiera aktywo i podejmuje decyzję.", ru: "Инвестор сам выбирает актив и принимает решение." } },
        { q: { pl: "Instalacja filtra wymaganego nowymi przepisami to inwestycja:", ru: "Установка фильтра по требованию новых правил — это инвестиция:" },
          a: [{ pl: "obowiązkowa", ru: "обязательная" }, { pl: "rozwojowa", ru: "развивающая" }, { pl: "spekulacyjna", ru: "спекулятивная" }, { pl: "finansowa", ru: "финансовая" }],
          correct: 0, why: { pl: "Wymusza ją prawo, a nie chęć zwiększenia skali.", ru: "Её требует закон, а не желание увеличить масштаб." } },
        { q: { pl: "Zakup drugiego pieca, by zwiększyć produkcję, to inwestycja:", ru: "Покупка второй печи для увеличения производства — инвестиция:" },
          a: [{ pl: "odtworzeniowa", ru: "восстановительная" }, { pl: "rozwojowa", ru: "развивающая" }, { pl: "obowiązkowa", ru: "обязательная" }, { pl: "krótkoterminowa finansowa", ru: "краткосрочная финансовая" }],
          correct: 1, why: { pl: "Zwiększa skalę działalności.", ru: "Увеличивает масштаб деятельности." } },
        { q: { pl: "Inwestycje rzeczowe w porównaniu z finansowymi mają zwykle:", ru: "Реальные инвестиции по сравнению с финансовыми обычно имеют:" },
          a: [{ pl: "wyższą płynność", ru: "более высокую ликвидность" }, { pl: "brak ryzyka", ru: "отсутствие риска" }, { pl: "niższą płynność", ru: "более низкую ликвидность" }, { pl: "krótszy horyzont", ru: "более короткий горизонт" }],
          correct: 2, why: { pl: "Budynek czy maszynę trudniej szybko sprzedać niż akcje.", ru: "Здание или станок труднее быстро продать, чем акции." } },
        { q: { pl: "W której fazie cyklu wydaje się najwięcej pieniędzy?", ru: "В какой фазе цикла тратится больше всего денег?" },
          a: [{ pl: "Przedinwestycyjnej", ru: "Прединвестиционной" }, { pl: "Operacyjnej", ru: "Операционной" }, { pl: "Identyfikacji pomysłu", ru: "Поиска идеи" }, { pl: "Inwestycyjnej (realizacyjnej)", ru: "Инвестиционной (реализационной)" }],
          correct: 3, why: { pl: "Budowa, zakup wyposażenia i rozruch to główne nakłady.", ru: "Строительство, закупка оборудования и пуск — главные затраты." } },
        { q: { pl: "Kto kontroluje jakość robót w imieniu inwestora?", ru: "Кто контролирует качество работ от имени инвестора?" },
          a: [{ pl: "Inspektor nadzoru", ru: "Инспектор надзора" }, { pl: "Bank", ru: "Банк" }, { pl: "Generalny wykonawca", ru: "Генподрядчик" }, { pl: "Użytkownik", ru: "Пользователь" }],
          correct: 0, why: { pl: "Inspektor nadzoru inwestorskiego reprezentuje inwestora na budowie.", ru: "Инспектор инвесторского надзора представляет инвестора на стройке." } },
        { q: { pl: "Co NIE jest typowym elementem studium wykonalności?", ru: "Что НЕ является типичным элементом ТЭО?" },
          a: [{ pl: "Analiza rynku", ru: "Анализ рынка" }, { pl: "Prognoza przepływów", ru: "Прогноз потоков" }, { pl: "Ocena ex post po 5 latach działania", ru: "Оценка ex post через 5 лет работы" }, { pl: "Analiza ryzyka", ru: "Анализ риска" }],
          correct: 2, why: { pl: "Studium powstaje przed decyzją; ocena ex post jest w fazie operacyjnej.", ru: "ТЭО создаётся до решения; оценка ex post — в операционной фазе." } },
        { q: { pl: "Inwestycje komplementarne to takie, które:", ru: "Взаимодополняющие инвестиции — это такие, которые:" },
          a: [{ pl: "wykluczają się nawzajem", ru: "исключают друг друга" }, { pl: "wymagają siebie nawzajem lub jedna drugiej", ru: "требуют друг друга или одна — другой" }, { pl: "są całkowicie niezależne", ru: "полностью независимы" }, { pl: "zawsze są finansowe", ru: "всегда финансовые" }],
          correct: 1, why: { pl: "Np. hala magazynowa i droga dojazdowa do niej.", ru: "Например, склад и подъездная дорога к нему." } },
        { q: { pl: "Po co klasyfikujemy inwestycje?", ru: "Зачем классифицировать инвестиции?" },
          a: [{ pl: "Żeby dobrać właściwe pytania i metody oceny", ru: "Чтобы подобрать правильные вопросы и методы оценки" }, { pl: "Bo wymaga tego Eurocash", ru: "Потому что этого требует Eurocash" }, { pl: "Żeby uniknąć podatków", ru: "Чтобы избежать налогов" }, { pl: "Klasyfikacja nie ma znaczenia praktycznego", ru: "Классификация не имеет практического значения" }],
          correct: 0, why: { pl: "Od rodzaju inwestycji zależy, czy pytamy o koszt budowy, płynność, ryzyko emitenta itd.", ru: "От вида инвестиции зависит, спрашиваем ли о стоимости строительства, ликвидности, риске эмитента и т. д." } },
      ],
    },
    {
      n: 3,
      color: "--c3",
      title: { pl: "Czy inwestycja się opłaca?", ru: "Окупается ли инвестиция?" },
      lead: {
        pl: "Wartość pieniądza w czasie: procent prosty i składany, wartość przyszła i bieżąca, dyskontowanie. Proste metody oceny (okres zwrotu, ARR) i metody dyskontowe (NPV, IRR) — z przykładami liczbowymi.",
        ru: "Стоимость денег во времени: простые и сложные проценты, будущая и текущая стоимость, дисконтирование. Простые методы оценки (срок окупаемости, ARR) и дисконтные методы (NPV, IRR) — с числовыми примерами.",
      },
      subs: [
        // ------------------------------------------------------------------ 3.1
        {
          id: "3.1",
          title: { pl: "Wartość pieniądza w czasie", ru: "Стоимость денег во времени" },
          src: "Karta przedmiotu (efekt PI_W2: zasady zmiany wartości pieniądza w czasie) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Wolisz 1 000 zł dziś czy 1 000 zł za rok? Prawie każdy wybierze „dziś” — i ma rację. Na tej prostej intuicji opiera się cała matematyka finansowa.

## Dlaczego złotówka dziś jest warta więcej
Zasada [[wartosc-pieniadza-w-czasie|wartości pieniądza w czasie]] mówi: **ta sama kwota otrzymana wcześniej jest warta więcej niż otrzymana później**. Powody:
1. **Możliwość inwestowania** — pieniądze dziś można ulokować i za rok mieć więcej. Rezygnując z tego, ponosimy [[koszt-alternatywny|koszt alternatywny]].
2. **[[inflacja|Inflacja]]** — za rok za tę samą kwotę kupimy zwykle mniej.
3. **Ryzyko** — przyszła płatność może w ogóle nie nadejść.
4. **Preferencja konsumpcji** — ludzie wolą korzystać z dóbr wcześniej.

## Procent prosty
Przy [[procent-prosty|procencie prostym]] odsetki naliczamy zawsze od kwoty początkowej:

$$ FV = PV × (1 + r × n) | procent prosty: PV — kwota początkowa, r — stopa roczna, n — liczba lat

> !przyklad 10 000 zł na 5% rocznie przez 3 lata: odsetki co roku 500 zł, razem 1 500 zł. FV = 10 000 × (1 + 0,05 × 3) = **11 500 zł**.

## Procent składany
Przy [[procent-skladany|procencie składanym]] odsetki dopisuje się do kapitału, a w kolejnym okresie liczy się odsetki także od odsetek (kapitalizacja):

$$ FV = PV × (1 + r)ⁿ | wartość przyszła przy kapitalizacji rocznej

> !przyklad Te same 10 000 zł na 5% przez 3 lata: 10 000 × 1,05³ = **11 576,25 zł**. Różnica wobec procentu prostego to tylko 76,25 zł — ale po 10 latach jest już wyraźna: 10 000 × 1,05¹⁰ ≈ **16 288,95 zł** wobec 15 000 zł przy procencie prostym.

| Lata | Procent prosty (5%) | Procent składany (5%) |
|---|---|---|
| 1 | 10 500,00 zł | 10 500,00 zł |
| 3 | 11 500,00 zł | 11 576,25 zł |
| 10 | 15 000,00 zł | 16 288,95 zł |

> !zapamietaj Procent składany działa jak kula śnieżna: im dłuższy horyzont, tym większa przewaga nad procentem prostym. Dlatego **czas** jest sprzymierzeńcem inwestora długoterminowego.

**Reguła 72** — szybkie przybliżenie: kapitał podwaja się po około 72 / (stopa w %) latach. Przy 6% to ok. 12 lat, przy 8% ok. 9 lat.

## Wartość przyszła i wartość bieżąca
- [[wartosc-przyszla|Wartość przyszła (FV)]] — ile będzie warta dzisiejsza kwota za n lat.
- [[wartosc-biezaca|Wartość bieżąca (PV)]] — ile jest warta dziś kwota, którą dostaniemy za n lat.

Przejście od przyszłości do teraźniejszości to [[dyskontowanie]]:

$$ PV = FV / (1 + r)ⁿ | dyskontowanie; r — stopa dyskontowa

> !przyklad Za 2 lata dostaniesz 10 000 zł. Alternatywnie możesz inwestować na 8% rocznie. Ile ta obietnica jest warta dziś? PV = 10 000 / 1,08² = 10 000 / 1,1664 ≈ **8 573,39 zł**. Jeśli ktoś proponuje Ci dziś więcej niż 8 573 zł w zamian za tę przyszłą płatność, opłaca się wziąć gotówkę teraz.

## Stopa dyskontowa
[[stopa-dyskontowa|Stopa dyskontowa]] to stopa, którą „przesuwamy” pieniądze w czasie. Odzwierciedla minimalny zwrot, jakiego wymagamy: zwrot z najlepszej dostępnej alternatywy o podobnym ryzyku. Im wyższe ryzyko inwestycji, tym wyższa stopa i tym niższa wartość bieżąca przyszłych przepływów.

Zwykle stopa składa się z dwóch części: stopy wolnej od ryzyka (np. rentowności bezpiecznych obligacji skarbowych) oraz [[premia-za-ryzyko|premii za ryzyko]].

## Stopa nominalna i realna
Stopa nominalna to ta, którą podaje bank. Stopa realna pokazuje wzrost siły nabywczej. W przybliżeniu: **realna ≈ nominalna − inflacja**. Lokata na 5% przy inflacji 4% daje realnie tylko ok. 1%.

> !uwaga W Eurocash liczyliśmy czas odzyskania wkładu, **dzieląc kwoty bez dyskontowania**. To uproszczenie — zakłada, że 300 zł za 4 lata jest warte tyle samo co 300 zł dziś. Metody dyskontowe (NPV, IRR) naprawiają ten błąd.`,
            ru: `Что вы предпочтёте: 1 000 зл сегодня или 1 000 зл через год? Почти каждый выберет «сегодня» — и будет прав. На этой простой интуиции построена вся финансовая математика.

## Почему злотый сегодня стоит больше
Принцип [[wartosc-pieniadza-w-czasie|стоимости денег во времени]] гласит: **одна и та же сумма, полученная раньше, стоит больше, чем полученная позже**. Причины:
1. **Возможность инвестировать** — сегодняшние деньги можно вложить и через год иметь больше. Отказываясь от этого, мы несём [[koszt-alternatywny|альтернативные издержки]].
2. **[[inflacja|Инфляция]]** — через год на ту же сумму обычно можно купить меньше.
3. **Риск** — будущий платёж может вообще не поступить.
4. **Предпочтение потребления** — люди предпочитают пользоваться благами раньше.

## Простые проценты
При [[procent-prosty|простых процентах]] проценты всегда начисляются на начальную сумму:

$$ FV = PV × (1 + r × n) | простые проценты: PV — начальная сумма, r — годовая ставка, n — число лет

> !przyklad 10 000 зл под 5% годовых на 3 года: проценты каждый год 500 зл, всего 1 500 зл. FV = 10 000 × (1 + 0,05 × 3) = **11 500 зл**.

## Сложные проценты
При [[procent-skladany|сложных процентах]] проценты прибавляются к капиталу, и в следующем периоде проценты начисляются и на проценты (капитализация):

$$ FV = PV × (1 + r)ⁿ | будущая стоимость при ежегодной капитализации

> !przyklad Те же 10 000 зл под 5% на 3 года: 10 000 × 1,05³ = **11 576,25 зл**. Разница с простыми процентами — всего 76,25 зл, но через 10 лет она уже заметна: 10 000 × 1,05¹⁰ ≈ **16 288,95 зл** против 15 000 зл при простых процентах.

| Годы | Простые проценты (5%) | Сложные проценты (5%) |
|---|---|---|
| 1 | 10 500,00 зл | 10 500,00 зл |
| 3 | 11 500,00 зл | 11 576,25 зл |
| 10 | 15 000,00 зл | 16 288,95 зл |

> !zapamietaj Сложные проценты работают как снежный ком: чем длиннее горизонт, тем больше преимущество над простыми. Поэтому **время** — союзник долгосрочного инвестора.

**Правило 72** — быстрое приближение: капитал удваивается примерно за 72 / (ставка в %) лет. При 6% — около 12 лет, при 8% — около 9 лет.

## Будущая и текущая стоимость
- [[wartosc-przyszla|Будущая стоимость (FV)]] — сколько будет стоить сегодняшняя сумма через n лет.
- [[wartosc-biezaca|Текущая стоимость (PV)]] — сколько сегодня стоит сумма, которую мы получим через n лет.

Переход от будущего к настоящему — это [[dyskontowanie|дисконтирование]]:

$$ PV = FV / (1 + r)ⁿ | дисконтирование; r — ставка дисконтирования

> !przyklad Через 2 года вы получите 10 000 зл. Альтернативно можно инвестировать под 8% годовых. Сколько это обещание стоит сегодня? PV = 10 000 / 1,08² = 10 000 / 1,1664 ≈ **8 573,39 зл**. Если вам сегодня предлагают больше 8 573 зл в обмен на этот будущий платёж, выгоднее взять деньги сейчас.

## Ставка дисконтирования
[[stopa-dyskontowa|Ставка дисконтирования]] — ставка, по которой мы «переносим» деньги во времени. Она отражает минимальную требуемую доходность: доходность лучшей доступной альтернативы с похожим риском. Чем выше риск инвестиции, тем выше ставка и тем ниже текущая стоимость будущих потоков.

Обычно ставка состоит из двух частей: безрисковой ставки (например, доходности надёжных государственных облигаций) и [[premia-za-ryzyko|премии за риск]].

## Номинальная и реальная ставка
Номинальная ставка — та, которую называет банк. Реальная показывает рост покупательной способности. Приблизительно: **реальная ≈ номинальная − инфляция**. Депозит под 5% при инфляции 4% даёт реально лишь около 1%.

> !uwaga В Eurocash мы считали срок возврата вклада, **деля суммы без дисконтирования**. Это упрощение: оно предполагает, что 300 зл через 4 года стоят столько же, сколько 300 зл сегодня. Дисконтные методы (NPV, IRR) исправляют этот недостаток.`,
          },
          quiz: [
            { q: { pl: "10 000 zł na 5% przez 3 lata przy procencie prostym daje:", ru: "10 000 зл под 5% на 3 года при простых процентах дают:" },
              a: [{ pl: "11 576,25 zł", ru: "11 576,25 зл" }, { pl: "10 500 zł", ru: "10 500 зл" }, { pl: "11 500 zł", ru: "11 500 зл" }, { pl: "15 000 zł", ru: "15 000 зл" }],
              correct: 2, why: { pl: "FV = 10 000 × (1 + 0,05 × 3) = 11 500 zł.", ru: "FV = 10 000 × (1 + 0,05 × 3) = 11 500 зл." } },
            { q: { pl: "Czym różni się procent składany od prostego?", ru: "Чем сложные проценты отличаются от простых?" },
              a: [{ pl: "Odsetki naliczane są także od wcześniej dopisanych odsetek", ru: "Проценты начисляются и на ранее начисленные проценты" }, { pl: "Ma zawsze niższą stopę", ru: "Всегда имеет более низкую ставку" }, { pl: "Nie zależy od czasu", ru: "Не зависит от времени" }, { pl: "Dotyczy tylko kredytów", ru: "Касается только кредитов" }],
              correct: 0, why: { pl: "Kapitalizacja sprawia, że kapitał rośnie wykładniczo.", ru: "Капитализация заставляет капитал расти экспоненциально." } },
            { q: { pl: "Ile jest warte dziś 10 000 zł płatne za 2 lata przy stopie 8%?", ru: "Сколько сегодня стоят 10 000 зл, выплачиваемые через 2 года при ставке 8%?" },
              a: [{ pl: "8 400 zł", ru: "8 400 зл" }, { pl: "11 664 zł", ru: "11 664 зл" }, { pl: "9 259,26 zł", ru: "9 259,26 зл" }, { pl: "ok. 8 573,39 zł", ru: "около 8 573,39 зл" }],
              correct: 3, why: { pl: "PV = 10 000 / 1,08² = 10 000 / 1,1664 ≈ 8 573,39 zł.", ru: "PV = 10 000 / 1,08² = 10 000 / 1,1664 ≈ 8 573,39 зл." } },
            { q: { pl: "Jak zmienia się wartość bieżąca przy wyższej stopie dyskontowej?", ru: "Как меняется текущая стоимость при более высокой ставке дисконтирования?" },
              a: [{ pl: "Rośnie", ru: "Растёт" }, { pl: "Maleje", ru: "Снижается" }, { pl: "Nie zmienia się", ru: "Не меняется" }, { pl: "Staje się ujemna", ru: "Становится отрицательной" }],
              correct: 1, why: { pl: "Dzielimy przez większe (1 + r)ⁿ, więc PV jest mniejsze.", ru: "Делим на большее (1 + r)ⁿ, поэтому PV меньше." } },
            { q: { pl: "Według reguły 72 kapitał na 8% podwoi się po około:", ru: "По правилу 72 капитал под 8% удвоится примерно за:" },
              a: [{ pl: "9 latach", ru: "9 лет" }, { pl: "12 latach", ru: "12 лет" }, { pl: "8 latach", ru: "8 лет" }, { pl: "72 latach", ru: "72 года" }],
              correct: 0, why: { pl: "72 / 8 = 9 lat (przybliżenie).", ru: "72 / 8 = 9 лет (приближение)." } },
          ],
        },
        // ------------------------------------------------------------------ 3.2
        {
          id: "3.2",
          title: { pl: "Proste metody oceny: okres zwrotu i ARR", ru: "Простые методы оценки: срок окупаемости и ARR" },
          src: "Karta przedmiotu (efekt PI_U2: metody oceny opłacalności inwestycji) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Metody oceny opłacalności dzielimy na **proste (statyczne)**, które nie uwzględniają wartości pieniądza w czasie, i **dyskontowe (dynamiczne)**, które ją uwzględniają. Zacznijmy od prostych — są szybkie i intuicyjne, więc firmy chętnie ich używają do wstępnej selekcji.

## Przykład, na którym liczymy
Firma rozważa zakup maszyny:
- nakład początkowy: **100 000 zł**,
- okres użytkowania: **4 lata**, bez wartości końcowej,
- roczny [[przeplyw-pieniezny|przepływ pieniężny]] netto: **30 000 zł**,
- [[amortyzacja|amortyzacja]] liniowa: 100 000 / 4 = **25 000 zł rocznie**,
- roczny zysk księgowy: 30 000 − 25 000 = **5 000 zł** (dla uproszczenia bez podatku).

## Prosty okres zwrotu
[[okres-zwrotu|Okres zwrotu]] (payback period) odpowiada na pytanie: **po jakim czasie odzyskamy nakład?**

$$ okres zwrotu = nakład / roczny przepływ | przy równych przepływach

Dla maszyny: 100 000 / 30 000 = **3,33 roku** (ok. 3 lata i 4 miesiące).

Przy nierównych przepływach sumujemy je rok po roku, aż suma zrówna się z nakładem.

> !przyklad Przepływy: rok 1 — 20 000 zł, rok 2 — 40 000 zł, rok 3 — 50 000 zł; nakład 100 000 zł. Po 2 latach odzyskano 60 000 zł, brakuje 40 000 zł. W roku 3 wpływa 50 000 zł, więc potrzeba 40 000 / 50 000 = 0,8 roku. Okres zwrotu = **2,8 roku**.

Firma porównuje okres zwrotu z maksymalnym akceptowanym (np. „inwestycja musi się zwrócić w ciągu 4 lat”). To dokładnie ten sam pomysł co **czas odzyskania wkładu** z Eurocash — tam liczyliśmy go w miesiącach.

### Zalety i wady okresu zwrotu
| Zalety | Wady |
|---|---|
| bardzo prosty, zrozumiały dla każdego | pomija wartość pieniądza w czasie |
| pokazuje, jak szybko odzyskamy gotówkę (płynność) | pomija przepływy po okresie zwrotu |
| przybliża ryzyko: krótszy zwrot = krócej narażeni | nie mówi, ile inwestycja zarobi łącznie |

> !uwaga Dwie inwestycje mogą mieć ten sam okres zwrotu 3 lata, ale jedna po tym czasie przestaje działać, a druga przynosi przepływy jeszcze przez 10 lat. Okres zwrotu ich nie odróżni.

Ulepszeniem jest **zdyskontowany okres zwrotu** — sumujemy przepływy już zdyskontowane. Jest zawsze dłuższy niż prosty.

## Księgowa stopa zwrotu (ARR)
[[arr|ARR]] (accounting rate of return) porównuje **przeciętny roczny zysk księgowy** z nakładem:

$$ ARR = średni roczny zysk / nakład × 100% | wariant liczony od nakładu początkowego

Dla maszyny: 5 000 / 100 000 = **5%**.

Często stosuje się wariant od **średniego zaangażowanego kapitału** (przy amortyzacji liniowej i braku wartości końcowej to połowa nakładu): 5 000 / 50 000 = **10%**. Trzeba zawsze podać, którą wersję liczymy.

Decyzja: porównujemy ARR z wymaganą stopą. Jeśli firma wymaga 8%, wynik zależy od wariantu — kolejny powód, by nie polegać tylko na ARR.

### Ograniczenia ARR
- opiera się na **zysku księgowym**, a nie na przepływach gotówki,
- ignoruje rozłożenie zysków w czasie (zysk w roku 1 i w roku 4 liczy się tak samo),
- wynik zależy od metody amortyzacji i definicji mianownika.

> !zapamietaj Metody proste — **okres zwrotu** i **ARR** — są dobre do szybkiego „sita”, ale **nie uwzględniają wartości pieniądza w czasie**. Do ostatecznej decyzji używamy metod dyskontowych: NPV i IRR.

## Porównanie z Eurocash
| Eurocash | Ocena inwestycji w firmie |
|---|---|
| czas odzyskania wkładu (wkład / przepływ miesięczny) | prosty okres zwrotu |
| przepływ roczny / wkład × 100% | wskaźnik podobny do ARR, ale liczony z przepływów i od wkładu własnego |

W obu przypadkach zasada jest ta sama: szybka miara, która pomaga porównać okazje, ale nie zastępuje pełnej analizy.`,
            ru: `Методы оценки окупаемости делятся на **простые (статические)**, не учитывающие стоимость денег во времени, и **дисконтные (динамические)**, которые её учитывают. Начнём с простых — они быстрые и интуитивные, поэтому фирмы охотно применяют их для предварительного отбора.

## Пример для расчётов
Фирма рассматривает покупку станка:
- начальные затраты: **100 000 зл**,
- срок использования: **4 года**, без остаточной стоимости,
- годовой чистый [[przeplyw-pieniezny|денежный поток]]: **30 000 зл**,
- линейная [[amortyzacja|амортизация]]: 100 000 / 4 = **25 000 зл в год**,
- годовая бухгалтерская прибыль: 30 000 − 25 000 = **5 000 зл** (для простоты без налога).

## Простой срок окупаемости
[[okres-zwrotu|Срок окупаемости]] (payback period) отвечает на вопрос: **через какое время мы вернём затраты?**

$$ срок окупаемости = затраты / годовой поток | при равных потоках

Для станка: 100 000 / 30 000 = **3,33 года** (около 3 лет и 4 месяцев).

При неравных потоках суммируем их год за годом, пока сумма не сравняется с затратами.

> !przyklad Потоки: 1-й год — 20 000 зл, 2-й — 40 000 зл, 3-й — 50 000 зл; затраты 100 000 зл. За 2 года вернули 60 000 зл, не хватает 40 000 зл. В 3-м году поступает 50 000 зл, значит нужно 40 000 / 50 000 = 0,8 года. Срок окупаемости = **2,8 года**.

Фирма сравнивает срок окупаемости с максимально допустимым (например, «инвестиция должна окупиться за 4 года»). Это та же идея, что **срок возврата вклада** в Eurocash — там мы считали его в месяцах.

### Плюсы и минусы срока окупаемости
| Плюсы | Минусы |
|---|---|
| очень простой, понятен каждому | не учитывает стоимость денег во времени |
| показывает, как быстро вернутся деньги (ликвидность) | не учитывает потоки после срока окупаемости |
| приближённо отражает риск: короче срок — меньше время под риском | не говорит, сколько инвестиция заработает в сумме |

> !uwaga У двух инвестиций может быть одинаковый срок окупаемости 3 года, но одна после этого перестаёт работать, а другая приносит потоки ещё 10 лет. Срок окупаемости их не различит.

Улучшенный вариант — **дисконтированный срок окупаемости**: суммируются уже дисконтированные потоки. Он всегда длиннее простого.

## Бухгалтерская норма доходности (ARR)
[[arr|ARR]] (accounting rate of return) сравнивает **среднюю годовую бухгалтерскую прибыль** с затратами:

$$ ARR = средняя годовая прибыль / затраты × 100% | вариант от начальных затрат

Для станка: 5 000 / 100 000 = **5%**.

Часто используют вариант от **среднего вложенного капитала** (при линейной амортизации и нулевой остаточной стоимости это половина затрат): 5 000 / 50 000 = **10%**. Всегда нужно указывать, какую версию мы считаем.

Решение: сравниваем ARR с требуемой ставкой. Если фирма требует 8%, результат зависит от варианта — ещё одна причина не полагаться только на ARR.

### Ограничения ARR
- опирается на **бухгалтерскую прибыль**, а не на денежные потоки,
- игнорирует распределение прибыли во времени (прибыль в 1-м и 4-м году считается одинаково),
- результат зависит от метода амортизации и определения знаменателя.

> !zapamietaj Простые методы — **срок окупаемости** и **ARR** — хороши как быстрое «сито», но **не учитывают стоимость денег во времени**. Для окончательного решения используют дисконтные методы: NPV и IRR.

## Сравнение с Eurocash
| Eurocash | Оценка инвестиции в фирме |
|---|---|
| срок возврата вклада (вклад / месячный поток) | простой срок окупаемости |
| годовой поток / вклад × 100% | показатель, похожий на ARR, но рассчитанный по потокам и от собственного вклада |

В обоих случаях принцип одинаков: быстрая мера, которая помогает сравнить возможности, но не заменяет полного анализа.`,
          },
          quiz: [
            { q: { pl: "Nakład 100 000 zł, roczny przepływ 30 000 zł. Prosty okres zwrotu wynosi:", ru: "Затраты 100 000 зл, годовой поток 30 000 зл. Простой срок окупаемости:" },
              a: [{ pl: "3 lata", ru: "3 года" }, { pl: "4 lata", ru: "4 года" }, { pl: "ok. 3,33 roku", ru: "около 3,33 года" }, { pl: "0,3 roku", ru: "0,3 года" }],
              correct: 2, why: { pl: "100 000 / 30 000 ≈ 3,33 roku.", ru: "100 000 / 30 000 ≈ 3,33 года." } },
            { q: { pl: "Przepływy 20 000, 40 000, 50 000 zł; nakład 100 000 zł. Okres zwrotu:", ru: "Потоки 20 000, 40 000, 50 000 зл; затраты 100 000 зл. Срок окупаемости:" },
              a: [{ pl: "2,5 roku", ru: "2,5 года" }, { pl: "2,8 roku", ru: "2,8 года" }, { pl: "3 lata", ru: "3 года" }, { pl: "2 lata", ru: "2 года" }],
              correct: 1, why: { pl: "Po 2 latach 60 000 zł; brakujące 40 000 / 50 000 = 0,8 roku → 2,8.", ru: "За 2 года 60 000 зл; недостающие 40 000 / 50 000 = 0,8 года → 2,8." } },
            { q: { pl: "Główna wada prostego okresu zwrotu to:", ru: "Главный недостаток простого срока окупаемости:" },
              a: [{ pl: "jest trudny do policzenia", ru: "его трудно посчитать" }, { pl: "wymaga stopy dyskontowej", ru: "требует ставки дисконтирования" }, { pl: "uwzględnia zbyt wiele przepływów", ru: "учитывает слишком много потоков" }, { pl: "pomija wartość pieniądza w czasie i przepływy po okresie zwrotu", ru: "не учитывает стоимость денег во времени и потоки после срока окупаемости" }],
              correct: 3, why: { pl: "To metoda statyczna, „ślepa” na to, co po zwrocie.", ru: "Это статический метод, «слепой» к тому, что после окупаемости." } },
            { q: { pl: "ARR opiera się na:", ru: "ARR основан на:" },
              a: [{ pl: "zysku księgowym", ru: "бухгалтерской прибыли" }, { pl: "zdyskontowanych przepływach", ru: "дисконтированных потоках" }, { pl: "cenie akcji", ru: "цене акций" }, { pl: "inflacji", ru: "инфляции" }],
              correct: 0, why: { pl: "ARR = średni roczny zysk księgowy / nakład (lub średni kapitał).", ru: "ARR = средняя годовая бухгалтерская прибыль / затраты (или средний капитал)." } },
            { q: { pl: "Zysk 5 000 zł rocznie, nakład 100 000 zł, średni kapitał 50 000 zł. ARR od średniego kapitału:", ru: "Прибыль 5 000 зл в год, затраты 100 000 зл, средний капитал 50 000 зл. ARR от среднего капитала:" },
              a: [{ pl: "5%", ru: "5%" }, { pl: "10%", ru: "10%" }, { pl: "20%", ru: "20%" }, { pl: "50%", ru: "50%" }],
              correct: 1, why: { pl: "5 000 / 50 000 = 10% (od nakładu początkowego byłoby 5%).", ru: "5 000 / 50 000 = 10% (от начальных затрат было бы 5%)." } },
          ],
        },
        // ------------------------------------------------------------------ 3.3
        {
          id: "3.3",
          title: { pl: "Metody dyskontowe: NPV i IRR", ru: "Дисконтные методы: NPV и IRR" },
          src: "Karta przedmiotu (efekt PI_U2: matematyka finansowa w ocenie inwestycji rzeczowych i kapitałowych) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Metody dyskontowe łączą dwie rzeczy, które już znamy: przepływy pieniężne inwestycji i [[dyskontowanie]]. Dzięki temu porównują złotówki z różnych lat w jednej „walucie” — złotówkach dzisiejszych.

## NPV — wartość bieżąca netto
[[npv|NPV]] (net present value, wartość bieżąca netto) to suma zdyskontowanych przepływów minus nakład początkowy:

$$ NPV = −I₀ + CF₁/(1+r) + CF₂/(1+r)² + … + CFₙ/(1+r)ⁿ | I₀ — nakład, CFₜ — przepływ w roku t, r — stopa dyskontowa

**Reguła decyzyjna:**
- NPV > 0 → inwestycja zarabia więcej niż wymagana stopa; **przyjąć**,
- NPV = 0 → zarabia dokładnie wymaganą stopę,
- NPV < 0 → zarabia mniej niż alternatywa; **odrzucić**.

## Przykład: maszyna z poprzedniego tematu
Nakład 100 000 zł, przepływy 30 000 zł przez 4 lata, wymagana stopa **10%**.

| Rok | Przepływ | Czynnik 1/(1,1)ᵗ | Wartość bieżąca |
|---|---|---|---|
| 0 | −100 000 zł | 1,0000 | −100 000,00 zł |
| 1 | 30 000 zł | 0,9091 | 27 272,73 zł |
| 2 | 30 000 zł | 0,8264 | 24 793,39 zł |
| 3 | 30 000 zł | 0,7513 | 22 539,44 zł |
| 4 | 30 000 zł | 0,6830 | 20 490,40 zł |
| | | **NPV** | **−4 904,04 zł** |

Choć suma przepływów (120 000 zł) przewyższa nakład, a prosty okres zwrotu (3,33 roku) mieści się w okresie życia maszyny, **NPV jest ujemne**. Przy wymaganych 10% inwestycja się nie opłaca.

> !przyklad Jeśli firma wymaga tylko **6%**, wartość bieżąca przepływów wynosi ok. 103 953,17 zł, a NPV ≈ **+3 953,17 zł**. Ta sama maszyna staje się opłacalna. Wynik NPV mocno zależy od przyjętej stopy dyskontowej.

> !zapamietaj NPV mówi, **o ile złotych (w dzisiejszej wartości) inwestycja zwiększa majątek** inwestora ponad to, co dałaby alternatywa o wymaganej stopie. Dodatnie NPV = tworzenie wartości.

## IRR — wewnętrzna stopa zwrotu
[[irr|IRR]] (internal rate of return) to **stopa dyskontowa, przy której NPV = 0**. Można ją traktować jako „własną” stopę zwrotu inwestycji.

**Reguła decyzyjna:** porównujemy IRR z wymaganą stopą (kosztem kapitału):
- IRR > wymagana stopa → przyjąć,
- IRR < wymagana stopa → odrzucić.

Dla maszyny IRR ≈ **7,71%**. To tłumaczy oba wyniki: przy 10% (więcej niż IRR) NPV jest ujemne, przy 6% (mniej niż IRR) — dodatnie.

| Stopa dyskontowa | NPV maszyny |
|---|---|
| 6% | ≈ +3 953 zł |
| 7,71% (IRR) | ≈ 0 zł |
| 10% | ≈ −4 904 zł |

IRR liczy się metodą prób (podstawiamy kolejne stopy) albo w arkuszu kalkulacyjnym (funkcja IRR).

## NPV czy IRR?
| | NPV | IRR |
|---|---|---|
| Wynik | kwota w zł | stopa w % |
| Wymaga znajomości stopy dyskontowej | tak | nie do obliczenia, tak do decyzji |
| Przy porównaniu projektów różnej wielkości | wiarygodne | może wprowadzać w błąd |
| Przy nietypowych przepływach (zmiana znaku kilka razy) | działa | może mieć kilka wartości lub żadnej |

Dla pojedynczego, typowego projektu obie metody dają tę samą decyzję. Przy wyborze między projektami wzajemnie wykluczającymi się podręczniki zalecają kierować się **NPV**.

> !uwaga IRR zakłada, że przepływy uzyskane w trakcie można reinwestować po stopie równej IRR. Przy bardzo wysokim IRR to założenie bywa nierealne.

## Skąd brać dane?
Wynik jest tak dobry, jak dane wejściowe. Prognoza przepływów i dobór stopy to najtrudniejsza część analizy — karta przedmiotu podkreśla umiejętność oceny, czy informacje są **wiarygodne i przydatne**. Dlatego obok NPV robi się [[analiza-wrazliwosci|analizę wrażliwości]]: jak zmieni się NPV, gdy przepływy spadną o 10–30% albo stopa wzrośnie? To dokładnie to, co zrobiliśmy w Eurocash, obniżając przepływ A o 30%.`,
            ru: `Дисконтные методы объединяют две уже знакомые вещи: денежные потоки инвестиции и [[dyskontowanie|дисконтирование]]. Благодаря этому они сравнивают злотые разных лет в одной «валюте» — сегодняшних злотых.

## NPV — чистая приведённая стоимость
[[npv|NPV]] (net present value, чистая приведённая стоимость) — сумма дисконтированных потоков минус начальные затраты:

$$ NPV = −I₀ + CF₁/(1+r) + CF₂/(1+r)² + … + CFₙ/(1+r)ⁿ | I₀ — затраты, CFₜ — поток в году t, r — ставка дисконтирования

**Правило решения:**
- NPV > 0 → инвестиция зарабатывает больше требуемой ставки; **принять**,
- NPV = 0 → зарабатывает ровно требуемую ставку,
- NPV < 0 → зарабатывает меньше альтернативы; **отклонить**.

## Пример: станок из прошлой темы
Затраты 100 000 зл, потоки по 30 000 зл в течение 4 лет, требуемая ставка **10%**.

| Год | Поток | Множитель 1/(1,1)ᵗ | Текущая стоимость |
|---|---|---|---|
| 0 | −100 000 зл | 1,0000 | −100 000,00 зл |
| 1 | 30 000 зл | 0,9091 | 27 272,73 зл |
| 2 | 30 000 зл | 0,8264 | 24 793,39 зл |
| 3 | 30 000 зл | 0,7513 | 22 539,44 зл |
| 4 | 30 000 зл | 0,6830 | 20 490,40 зл |
| | | **NPV** | **−4 904,04 зл** |

Хотя сумма потоков (120 000 зл) больше затрат, а простой срок окупаемости (3,33 года) укладывается в срок службы станка, **NPV отрицательна**. При требуемых 10% инвестиция невыгодна.

> !przyklad Если фирма требует только **6%**, текущая стоимость потоков около 103 953,17 зл, а NPV ≈ **+3 953,17 зл**. Тот же станок становится выгодным. Результат NPV сильно зависит от принятой ставки дисконтирования.

> !zapamietaj NPV показывает, **на сколько злотых (в сегодняшней стоимости) инвестиция увеличивает богатство** инвестора сверх того, что дала бы альтернатива с требуемой ставкой. Положительная NPV = создание стоимости.

## IRR — внутренняя норма доходности
[[irr|IRR]] (internal rate of return) — это **ставка дисконтирования, при которой NPV = 0**. Её можно считать «собственной» доходностью инвестиции.

**Правило решения:** сравниваем IRR с требуемой ставкой (стоимостью капитала):
- IRR > требуемой ставки → принять,
- IRR < требуемой ставки → отклонить.

Для станка IRR ≈ **7,71%**. Это объясняет оба результата: при 10% (больше IRR) NPV отрицательна, при 6% (меньше IRR) — положительна.

| Ставка дисконтирования | NPV станка |
|---|---|
| 6% | ≈ +3 953 зл |
| 7,71% (IRR) | ≈ 0 зл |
| 10% | ≈ −4 904 зл |

IRR считают методом подбора (подставляя разные ставки) или в электронной таблице (функция IRR).

## NPV или IRR?
| | NPV | IRR |
|---|---|---|
| Результат | сумма в злотых | ставка в % |
| Нужна ли ставка дисконтирования | да | для расчёта нет, для решения да |
| При сравнении проектов разного размера | надёжна | может вводить в заблуждение |
| При нетипичных потоках (несколько смен знака) | работает | может иметь несколько значений или ни одного |

Для одного типичного проекта оба метода дают одинаковое решение. При выборе между взаимоисключающими проектами учебники рекомендуют ориентироваться на **NPV**.

> !uwaga IRR предполагает, что промежуточные потоки можно реинвестировать под ставку, равную IRR. При очень высокой IRR это допущение бывает нереалистичным.

## Откуда брать данные?
Результат хорош настолько, насколько хороши исходные данные. Прогноз потоков и выбор ставки — самая трудная часть анализа; карта предмета подчёркивает умение оценивать, насколько информация **достоверна и полезна**. Поэтому рядом с NPV делают [[analiza-wrazliwosci|анализ чувствительности]]: как изменится NPV, если потоки упадут на 10–30% или ставка вырастет? Именно это мы сделали в Eurocash, снизив поток A на 30%.`,
          },
          quiz: [
            { q: { pl: "Kiedy według NPV inwestycję należy przyjąć?", ru: "Когда по NPV инвестицию следует принять?" },
              a: [{ pl: "Gdy NPV < 0", ru: "Когда NPV < 0" }, { pl: "Gdy NPV > 0", ru: "Когда NPV > 0" }, { pl: "Gdy suma przepływów > nakład", ru: "Когда сумма потоков > затрат" }, { pl: "Gdy okres zwrotu < 5 lat", ru: "Когда срок окупаемости < 5 лет" }],
              correct: 1, why: { pl: "Dodatnie NPV oznacza zwrot wyższy niż wymagana stopa.", ru: "Положительная NPV означает доходность выше требуемой ставки." } },
            { q: { pl: "IRR to stopa dyskontowa, przy której:", ru: "IRR — это ставка дисконтирования, при которой:" },
              a: [{ pl: "NPV jest maksymalne", ru: "NPV максимальна" }, { pl: "okres zwrotu = 1 rok", ru: "срок окупаемости = 1 год" }, { pl: "NPV = 0", ru: "NPV = 0" }, { pl: "inflacja = 0", ru: "инфляция = 0" }],
              correct: 2, why: { pl: "To z definicji „własna” stopa zwrotu projektu.", ru: "По определению это «собственная» доходность проекта." } },
            { q: { pl: "Maszyna ma IRR ≈ 7,71%. Firma wymaga 10%. Decyzja:", ru: "IRR станка ≈ 7,71%. Фирма требует 10%. Решение:" },
              a: [{ pl: "Odrzucić — IRR niższe od wymaganej stopy", ru: "Отклонить — IRR ниже требуемой ставки" }, { pl: "Przyjąć — IRR dodatnie", ru: "Принять — IRR положительна" }, { pl: "Przyjąć — przepływy > nakład", ru: "Принять — потоки > затрат" }, { pl: "Nie da się ocenić", ru: "Оценить невозможно" }],
              correct: 0, why: { pl: "Przy 10% NPV ≈ −4 904 zł; IRR < r oznacza ujemne NPV.", ru: "При 10% NPV ≈ −4 904 зл; IRR < r означает отрицательную NPV." } },
            { q: { pl: "Co się dzieje z NPV, gdy obniżymy stopę dyskontową (dla typowego projektu)?", ru: "Что происходит с NPV при снижении ставки дисконтирования (для типичного проекта)?" },
              a: [{ pl: "Maleje", ru: "Снижается" }, { pl: "Nie zmienia się", ru: "Не меняется" }, { pl: "Zawsze spada do zera", ru: "Всегда падает до нуля" }, { pl: "Rośnie", ru: "Растёт" }],
              correct: 3, why: { pl: "Niższa stopa = wyższe wartości bieżące przepływów; maszyna: −4 904 zł przy 10%, +3 953 zł przy 6%.", ru: "Ниже ставка — выше текущая стоимость потоков; станок: −4 904 зл при 10%, +3 953 зл при 6%." } },
            { q: { pl: "Przy wyborze między projektami wzajemnie wykluczającymi się zaleca się kierować:", ru: "При выборе между взаимоисключающими проектами рекомендуется ориентироваться на:" },
              a: [{ pl: "IRR", ru: "IRR" }, { pl: "NPV", ru: "NPV" }, { pl: "ARR", ru: "ARR" }, { pl: "prostym okresem zwrotu", ru: "простой срок окупаемости" }],
              correct: 1, why: { pl: "NPV pokazuje przyrost majątku w zł; IRR może mylić przy różnej skali projektów.", ru: "NPV показывает прирост богатства в злотых; IRR может вводить в заблуждение при разном масштабе." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Zasada wartości pieniądza w czasie mówi, że:", ru: "Принцип стоимости денег во времени гласит, что:" },
          a: [{ pl: "pieniądz zawsze traci wartość o stopę inflacji", ru: "деньги всегда теряют стоимость на величину инфляции" }, { pl: "ta sama kwota wcześniej jest warta więcej niż później", ru: "одна и та же сумма раньше стоит больше, чем позже" }, { pl: "przyszłe kwoty są warte więcej", ru: "будущие суммы стоят больше" }, { pl: "czas nie ma znaczenia", ru: "время не имеет значения" }],
          correct: 1, why: { pl: "Dzisiejsze pieniądze można zainwestować; przyszłe są niepewne i tracą na inflacji.", ru: "Сегодняшние деньги можно вложить; будущие неопределённы и теряют от инфляции." } },
        { q: { pl: "10 000 zł na 5% przez 3 lata z kapitalizacją roczną daje:", ru: "10 000 зл под 5% на 3 года с ежегодной капитализацией дают:" },
          a: [{ pl: "11 500 zł", ru: "11 500 зл" }, { pl: "11 576,25 zł", ru: "11 576,25 зл" }, { pl: "11 025 zł", ru: "11 025 зл" }, { pl: "15 000 zł", ru: "15 000 зл" }],
          correct: 1, why: { pl: "10 000 × 1,05³ = 11 576,25 zł.", ru: "10 000 × 1,05³ = 11 576,25 зл." } },
        { q: { pl: "Dyskontowanie to:", ru: "Дисконтирование — это:" },
          a: [{ pl: "obliczanie wartości bieżącej przyszłych kwot", ru: "расчёт текущей стоимости будущих сумм" }, { pl: "obliczanie wartości przyszłej", ru: "расчёт будущей стоимости" }, { pl: "obniżka ceny w sklepie", ru: "скидка в магазине" }, { pl: "spłata długu", ru: "погашение долга" }],
          correct: 0, why: { pl: "PV = FV / (1 + r)ⁿ — przesuwamy kwotę z przyszłości do dziś.", ru: "PV = FV / (1 + r)ⁿ — переносим сумму из будущего в сегодня." } },
        { q: { pl: "Stopa dyskontowa odzwierciedla przede wszystkim:", ru: "Ставка дисконтирования отражает прежде всего:" },
          a: [{ pl: "stopę podatku", ru: "налоговую ставку" }, { pl: "wielkość nakładu", ru: "размер затрат" }, { pl: "wymagany zwrot z alternatywy o podobnym ryzyku", ru: "требуемую доходность альтернативы с похожим риском" }, { pl: "kurs walut", ru: "валютный курс" }],
          correct: 2, why: { pl: "To koszt alternatywny kapitału: stopa wolna od ryzyka + premia za ryzyko.", ru: "Это альтернативная стоимость капитала: безрисковая ставка + премия за риск." } },
        { q: { pl: "Lokata 5% przy inflacji 4% daje realnie około:", ru: "Депозит 5% при инфляции 4% даёт реально около:" },
          a: [{ pl: "9%", ru: "9%" }, { pl: "5%", ru: "5%" }, { pl: "−1%", ru: "−1%" }, { pl: "1%", ru: "1%" }],
          correct: 3, why: { pl: "Realna ≈ nominalna − inflacja = 5% − 4% = 1%.", ru: "Реальная ≈ номинальная − инфляция = 5% − 4% = 1%." } },
        { q: { pl: "Która metoda NIE uwzględnia wartości pieniądza w czasie?", ru: "Какой метод НЕ учитывает стоимость денег во времени?" },
          a: [{ pl: "NPV", ru: "NPV" }, { pl: "IRR", ru: "IRR" }, { pl: "Prosty okres zwrotu", ru: "Простой срок окупаемости" }, { pl: "Zdyskontowany okres zwrotu", ru: "Дисконтированный срок окупаемости" }],
          correct: 2, why: { pl: "Prosty okres zwrotu i ARR to metody statyczne.", ru: "Простой срок окупаемости и ARR — статические методы." } },
        { q: { pl: "Czas odzyskania wkładu w Eurocash to odpowiednik:", ru: "Срок возврата вклада в Eurocash соответствует:" },
          a: [{ pl: "prostego okresu zwrotu", ru: "простому сроку окупаемости" }, { pl: "IRR", ru: "IRR" }, { pl: "NPV", ru: "NPV" }, { pl: "stopy realnej", ru: "реальной ставке" }],
          correct: 0, why: { pl: "W obu dzielimy nakład przez stały przepływ, bez dyskontowania.", ru: "В обоих случаях делим затраты на постоянный поток, без дисконтирования." } },
        { q: { pl: "NPV maszyny (100 000 zł, 4 × 30 000 zł) przy 10% wynosi ok.:", ru: "NPV станка (100 000 зл, 4 × 30 000 зл) при 10% около:" },
          a: [{ pl: "+20 000 zł", ru: "+20 000 зл" }, { pl: "−4 904 zł", ru: "−4 904 зл" }, { pl: "+3 953 zł", ru: "+3 953 зл" }, { pl: "0 zł", ru: "0 зл" }],
          correct: 1, why: { pl: "Suma PV przepływów ≈ 95 095,96 zł − 100 000 zł ≈ −4 904 zł.", ru: "Сумма PV потоков ≈ 95 095,96 зл − 100 000 зл ≈ −4 904 зл." } },
        { q: { pl: "Dlaczego maszyna z sumą przepływów 120 000 zł może się nie opłacać?", ru: "Почему станок с суммой потоков 120 000 зл может быть невыгоден?" },
          a: [{ pl: "Bo przyszłe złotówki po zdyskontowaniu są warte mniej niż nakład", ru: "Потому что будущие злотые после дисконтирования стоят меньше затрат" }, { pl: "Bo amortyzacja jest za wysoka", ru: "Потому что амортизация слишком высокая" }, { pl: "Bo okres zwrotu jest ujemny", ru: "Потому что срок окупаемости отрицательный" }, { pl: "Zawsze się opłaca", ru: "Он всегда выгоден" }],
          correct: 0, why: { pl: "Przy 10% wartość bieżąca przepływów to ok. 95 096 zł, mniej niż 100 000 zł.", ru: "При 10% текущая стоимость потоков около 95 096 зл, меньше 100 000 зл." } },
        { q: { pl: "Jeśli IRR projektu jest wyższe niż wymagana stopa, to NPV przy tej stopie jest:", ru: "Если IRR проекта выше требуемой ставки, то NPV при этой ставке:" },
          a: [{ pl: "ujemne", ru: "отрицательна" }, { pl: "równe zero", ru: "равна нулю" }, { pl: "dodatnie", ru: "положительна" }, { pl: "nieokreślone", ru: "не определена" }],
          correct: 2, why: { pl: "Dla typowego projektu NPV > 0 dokładnie wtedy, gdy r < IRR.", ru: "Для типичного проекта NPV > 0 тогда и только тогда, когда r < IRR." } },
        { q: { pl: "ARR liczony od nakładu początkowego dla zysku 5 000 zł i nakładu 100 000 zł wynosi:", ru: "ARR от начальных затрат при прибыли 5 000 зл и затратах 100 000 зл:" },
          a: [{ pl: "10%", ru: "10%" }, { pl: "30%", ru: "30%" }, { pl: "25%", ru: "25%" }, { pl: "5%", ru: "5%" }],
          correct: 3, why: { pl: "5 000 / 100 000 = 5%.", ru: "5 000 / 100 000 = 5%." } },
        { q: { pl: "Analiza wrażliwości polega na:", ru: "Анализ чувствительности состоит в:" },
          a: [{ pl: "sprawdzeniu, jak wynik zmienia się przy zmianie założeń", ru: "проверке, как меняется результат при изменении допущений" }, { pl: "wyborze najwyższej stopy", ru: "выборе самой высокой ставки" }, { pl: "obliczeniu podatku", ru: "расчёте налога" }, { pl: "pominięciu ryzyka", ru: "игнорировании риска" }],
          correct: 0, why: { pl: "Np. przepływ −30% w Eurocash lub wyższa stopa w NPV.", ru: "Например, поток −30% в Eurocash или более высокая ставка в NPV." } },
      ],
    },
    {
      n: 4,
      color: "--c4",
      title: { pl: "W co można inwestować?", ru: "Во что можно инвестировать?" },
      lead: {
        pl: "Przegląd głównych instrumentów: akcje i obligacje, fundusze inwestycyjne (inwestowanie pośrednie) oraz inwestycje alternatywne — złoto, nieruchomości i REIT-y, przedmioty kolekcjonerskie. Dla każdego: źródło dochodu, ryzyko, płynność i koszty.",
        ru: "Обзор основных инструментов: акции и облигации, инвестиционные фонды (косвенное инвестирование) и альтернативные инвестиции — золото, недвижимость и REIT, предметы коллекционирования. Для каждого: источник дохода, риск, ликвидность и расходы.",
      },
      subs: [
        // ------------------------------------------------------------------ 4.1
        {
          id: "4.1",
          title: { pl: "Akcje i obligacje", ru: "Акции и облигации" },
          src: "Karta przedmiotu (cele: inwestowanie w akcje i obligacje) + literatura: Mayo, Inwestycje; Sławiński, Chmielewska, Zrozumieć rynki finansowe",
          body: {
            pl: `Akcje i obligacje to dwa podstawowe instrumenty rynku kapitałowego. Różnią się jednym, fundamentalnym szczegółem: **akcjonariusz jest współwłaścicielem, a obligatariusz — wierzycielem**.

## Akcja
[[akcja|Akcja]] to papier wartościowy potwierdzający **udział we własności spółki akcyjnej**. Posiadacz akcji ma:
- **prawa majątkowe** — do udziału w zysku ([[dywidenda|dywidendy]]), do udziału w majątku przy likwidacji, często prawo poboru nowych akcji,
- **prawa korporacyjne** — głos na walnym zgromadzeniu.

### Skąd zarobek na akcjach
1. **Dywidenda** — część zysku wypłacana akcjonariuszom (nie jest obowiązkowa; decyduje walne zgromadzenie).
2. **Zysk kapitałowy** — wzrost ceny akcji między zakupem a sprzedażą.

$$ stopa zwrotu z akcji = (P₁ − P₀ + D) / P₀ | P₀ — cena zakupu, P₁ — cena sprzedaży, D — dywidenda

> !przyklad Kupujesz akcję za 50 zł. Po roku otrzymujesz 2 zł dywidendy, a kurs rośnie do 54 zł. Stopa zwrotu = (54 − 50 + 2) / 50 = 6 / 50 = **12%**. Sama stopa dywidendy to 2 / 50 = 4%. Gdyby kurs spadł do 45 zł, wynik wyniósłby (45 − 50 + 2) / 50 = **−6%**.

W Polsce akcjami handluje się głównie na **Giełdzie Papierów Wartościowych w Warszawie (GPW)**, nad którą nadzór sprawuje [[knf|KNF]]. Inwestor indywidualny kupuje je przez dom maklerski, na rachunku maklerskim.

## Obligacja
[[obligacja|Obligacja]] to papier dłużny: emitent (państwo, gmina, firma) **pożycza pieniądze od inwestora** i zobowiązuje się je oddać w określonym terminie (data wykupu) wraz z odsetkami.

Podstawowe parametry:
- **wartość nominalna** — kwota, którą emitent zwróci przy wykupie,
- **[[kupon|kupon]]** — odsetki, zwykle jako % wartości nominalnej,
- **termin wykupu**,
- **rodzaj oprocentowania** — stałe, zmienne (np. powiązane ze stopą rynkową) lub indeksowane inflacją.

> !przyklad Obligacja o wartości nominalnej 1 000 zł z kuponem 6% rocznie płaci 60 zł odsetek co roku, a w dniu wykupu oddaje 1 000 zł.

### Cena obligacji a stopy procentowe
Jeśli stopy procentowe na rynku **rosną**, starsze obligacje o stałym, niższym kuponie stają się mniej atrakcyjne — ich **cena spada**. Gdy stopy **spadają** — ceny obligacji o stałym kuponie **rosną**. To [[ryzyko-stopy-procentowej|ryzyko stopy procentowej]]. Kto trzyma obligację do wykupu, dostanie nominał, ale kto sprzedaje wcześniej, może stracić lub zyskać.

### Rodzaje obligacji według emitenta
| Emitent | Przykład | Ryzyko niewypłacalności |
|---|---|---|
| Skarb Państwa | obligacje skarbowe (detaliczne i hurtowe) | najniższe w danym kraju |
| Samorząd | obligacje komunalne | niskie do umiarkowanego |
| Przedsiębiorstwo | obligacje korporacyjne | zależy od kondycji firmy — od niskiego do wysokiego |

## Akcje a obligacje — porównanie
| | Akcja | Obligacja |
|---|---|---|
| Status inwestora | współwłaściciel | wierzyciel |
| Dochód | dywidenda (niepewna) + zmiana kursu | odsetki (zwykle znane z góry) + ewentualna zmiana ceny |
| Termin | bezterminowa | określony termin wykupu |
| Pierwszeństwo przy upadłości | po wierzycielach | przed akcjonariuszami |
| Ryzyko i oczekiwany zwrot | wyższe | niższe |

> !zapamietaj Akcje dają **wyższy oczekiwany zwrot, ale większe wahania**; obligacje — **niższy, ale stabilniejszy dochód**. To przykład zasady: większy oczekiwany zysk wymaga przyjęcia większego [[ryzyko-inwestycyjne|ryzyka]].

## Ocena akcji w skrócie
Inwestorzy stosują dwa główne podejścia:
- **analiza fundamentalna** — bada kondycję spółki (zyski, zadłużenie, perspektywy branży) i szacuje wartość wewnętrzną; jednym z narzędzi jest wskaźnik C/Z (cena / zysk na akcję),
- **analiza techniczna** — szuka wzorców w wykresach kursów i obrotów.

Teoria [[rynek-efektywny|rynku efektywnego]] sugeruje, że ceny szybko uwzględniają dostępne informacje, więc trwałe „pokonywanie rynku” jest trudne.

> !uwaga Akcje jednej spółki mogą stracić większość wartości, a nawet całą — np. przy upadłości. Obligacje też nie są całkiem bezpieczne: emitent korporacyjny może nie zapłacić. Zawsze sprawdzaj, **kto jest emitentem** i jak wiarygodne są informacje o nim.`,
            ru: `Акции и облигации — два базовых инструмента рынка капитала. Они различаются одной фундаментальной деталью: **акционер — совладелец, а держатель облигации — кредитор**.

## Акция
[[akcja|Акция]] — ценная бумага, подтверждающая **долю в собственности акционерного общества**. Владелец акции имеет:
- **имущественные права** — на участие в прибыли ([[dywidenda|дивиденды]]), на долю в имуществе при ликвидации, часто преимущественное право на новые акции,
- **корпоративные права** — голос на общем собрании.

### Как зарабатывают на акциях
1. **Дивиденд** — часть прибыли, выплачиваемая акционерам (необязательная; решает общее собрание).
2. **Прирост капитала** — рост цены акции между покупкой и продажей.

$$ доходность акции = (P₁ − P₀ + D) / P₀ | P₀ — цена покупки, P₁ — цена продажи, D — дивиденд

> !przyklad Вы покупаете акцию за 50 зл. Через год получаете 2 зл дивиденда, а курс растёт до 54 зл. Доходность = (54 − 50 + 2) / 50 = 6 / 50 = **12%**. Одна дивидендная доходность — 2 / 50 = 4%. Если бы курс упал до 45 зл, результат был бы (45 − 50 + 2) / 50 = **−6%**.

В Польше акциями торгуют в основном на **Варшавской фондовой бирже (GPW)**, надзор за которой осуществляет [[knf|KNF]]. Частный инвестор покупает их через брокерский дом (dom maklerski) на брокерском счёте.

## Облигация
[[obligacja|Облигация]] — долговая бумага: эмитент (государство, город, фирма) **занимает деньги у инвестора** и обязуется вернуть их в определённый срок (дата погашения) вместе с процентами.

Основные параметры:
- **номинальная стоимость** — сумма, которую эмитент вернёт при погашении,
- **[[kupon|купон]]** — проценты, обычно в % от номинала,
- **срок погашения**,
- **тип процента** — фиксированный, плавающий (например, привязанный к рыночной ставке) или индексируемый инфляцией.

> !przyklad Облигация номиналом 1 000 зл с купоном 6% годовых платит 60 зл процентов каждый год, а в день погашения возвращает 1 000 зл.

### Цена облигации и процентные ставки
Если рыночные процентные ставки **растут**, старые облигации с фиксированным, более низким купоном становятся менее привлекательными — их **цена падает**. Когда ставки **снижаются**, цены облигаций с фиксированным купоном **растут**. Это [[ryzyko-stopy-procentowej|процентный риск]]. Тот, кто держит облигацию до погашения, получит номинал, а тот, кто продаёт раньше, может потерять или выиграть.

### Виды облигаций по эмитенту
| Эмитент | Пример | Риск неплатёжеспособности |
|---|---|---|
| Государственная казна (Skarb Państwa) | государственные облигации (розничные и оптовые) | самый низкий в данной стране |
| Самоуправление | муниципальные облигации | от низкого до умеренного |
| Предприятие | корпоративные облигации | зависит от состояния фирмы — от низкого до высокого |

## Акции и облигации — сравнение
| | Акция | Облигация |
|---|---|---|
| Статус инвестора | совладелец | кредитор |
| Доход | дивиденд (неопределённый) + изменение курса | проценты (обычно известны заранее) + возможное изменение цены |
| Срок | бессрочная | определённая дата погашения |
| Очерёдность при банкротстве | после кредиторов | перед акционерами |
| Риск и ожидаемая доходность | выше | ниже |

> !zapamietaj Акции дают **более высокую ожидаемую доходность, но сильнее колеблются**; облигации — **более низкий, но стабильный доход**. Это пример правила: большая ожидаемая прибыль требует принятия большего [[ryzyko-inwestycyjne|риска]].

## Коротко об оценке акций
Инвесторы используют два основных подхода:
- **фундаментальный анализ** — изучает состояние компании (прибыль, долг, перспективы отрасли) и оценивает внутреннюю стоимость; один из инструментов — коэффициент P/E (C/Z: цена / прибыль на акцию),
- **технический анализ** — ищет закономерности в графиках курсов и оборотов.

Теория [[rynek-efektywny|эффективного рынка]] предполагает, что цены быстро учитывают доступную информацию, поэтому стабильно «обыгрывать рынок» трудно.

> !uwaga Акции одной компании могут потерять большую часть стоимости и даже всю — например, при банкротстве. Облигации тоже не совсем безопасны: корпоративный эмитент может не заплатить. Всегда проверяйте, **кто эмитент** и насколько достоверна информация о нём.`,
          },
          quiz: [
            { q: { pl: "Posiadacz obligacji jest wobec emitenta:", ru: "Держатель облигации по отношению к эмитенту является:" },
              a: [{ pl: "współwłaścicielem", ru: "совладельцем" }, { pl: "wierzycielem", ru: "кредитором" }, { pl: "pracownikiem", ru: "работником" }, { pl: "akcjonariuszem", ru: "акционером" }],
              correct: 1, why: { pl: "Obligacja to dług emitenta wobec inwestora.", ru: "Облигация — долг эмитента перед инвестором." } },
            { q: { pl: "Akcja kupiona za 50 zł, dywidenda 2 zł, sprzedaż za 54 zł. Stopa zwrotu:", ru: "Акция куплена за 50 зл, дивиденд 2 зл, продажа за 54 зл. Доходность:" },
              a: [{ pl: "8%", ru: "8%" }, { pl: "4%", ru: "4%" }, { pl: "12%", ru: "12%" }, { pl: "6%", ru: "6%" }],
              correct: 2, why: { pl: "(54 − 50 + 2) / 50 = 6 / 50 = 12%.", ru: "(54 − 50 + 2) / 50 = 6 / 50 = 12%." } },
            { q: { pl: "Co dzieje się z ceną obligacji o stałym kuponie, gdy rynkowe stopy procentowe rosną?", ru: "Что происходит с ценой облигации с фиксированным купоном при росте рыночных ставок?" },
              a: [{ pl: "Spada", ru: "Падает" }, { pl: "Rośnie", ru: "Растёт" }, { pl: "Nie zmienia się", ru: "Не меняется" }, { pl: "Rośnie kupon", ru: "Растёт купон" }],
              correct: 0, why: { pl: "Nowe obligacje płacą więcej, więc stare tanieją — to ryzyko stopy procentowej.", ru: "Новые облигации платят больше, поэтому старые дешевеют — это процентный риск." } },
            { q: { pl: "Obligacja 1 000 zł z kuponem 6% płaci rocznie:", ru: "Облигация 1 000 зл с купоном 6% платит в год:" },
              a: [{ pl: "6 zł", ru: "6 зл" }, { pl: "600 zł", ru: "600 зл" }, { pl: "1 060 zł", ru: "1 060 зл" }, { pl: "60 zł", ru: "60 зл" }],
              correct: 3, why: { pl: "6% × 1 000 zł = 60 zł odsetek rocznie.", ru: "6% × 1 000 зл = 60 зл процентов в год." } },
            { q: { pl: "Kto ma pierwszeństwo przy podziale majątku upadłej spółki?", ru: "У кого приоритет при разделе имущества обанкротившейся компании?" },
              a: [{ pl: "Akcjonariusze", ru: "Акционеры" }, { pl: "Wierzyciele, w tym obligatariusze", ru: "Кредиторы, в том числе держатели облигаций" }, { pl: "Zarząd", ru: "Правление" }, { pl: "Wszyscy po równo", ru: "Все поровну" }],
              correct: 1, why: { pl: "Akcjonariusze dostają dopiero to, co zostanie po zaspokojeniu wierzycieli.", ru: "Акционеры получают лишь то, что останется после удовлетворения кредиторов." } },
          ],
        },
        // ------------------------------------------------------------------ 4.2
        {
          id: "4.2",
          title: { pl: "Fundusze inwestycyjne", ru: "Инвестиционные фонды" },
          src: "Karta przedmiotu (cele: inwestowanie w fundusze inwestycyjne; inwestowanie pośrednie) + literatura: Sławiński, Chmielewska, Zrozumieć rynki finansowe; ustawa o funduszach inwestycyjnych",
          body: {
            pl: `Nie każdy ma czas i wiedzę, żeby samodzielnie wybierać akcje i obligacje. Dla takich osób powstały [[fundusz-inwestycyjny|fundusze inwestycyjne]] — klasyczny przykład [[inwestycja-posrednia|inwestowania pośredniego]].

## Jak działa fundusz
1. Wielu inwestorów wpłaca pieniądze do wspólnej puli.
2. Zawodowy zarządzający inwestuje tę pulę zgodnie z polityką inwestycyjną funduszu (np. „akcje polskich spółek”).
3. Każdy inwestor ma udział w puli proporcjonalny do wpłaty — w formie **jednostek uczestnictwa** albo **certyfikatów inwestycyjnych**.
4. Wartość udziału zmienia się razem z wartością aktywów funduszu.

$$ wartość jednostki = (aktywa − zobowiązania) / liczba jednostek | wartość aktywów netto na jednostkę

> !przyklad Fundusz ma aktywa netto 10 mln zł i 100 000 jednostek — jednostka jest warta 100 zł. Kupujesz 50 jednostek za 5 000 zł. Po roku aktywa netto (po kosztach) rosną do 10,8 mln zł przy tej samej liczbie jednostek: jednostka jest warta 108 zł, Twoje 50 jednostek — 5 400 zł, czyli +8%.

## Kto jest kim
| Podmiot | Rola |
|---|---|
| [[tfi|TFI]] (towarzystwo funduszy inwestycyjnych) | tworzy fundusz i nim zarządza |
| Depozytariusz (zwykle bank) | przechowuje aktywa funduszu i kontroluje zgodność działań z prawem i statutem |
| [[knf|KNF]] | wydaje zezwolenia i nadzoruje |
| Dystrybutor | sprzedaje jednostki (bank, dom maklerski, platforma internetowa) |

Podstawą prawną jest ustawa z 27 maja 2004 r. o funduszach inwestycyjnych i zarządzaniu alternatywnymi funduszami inwestycyjnymi. Aktywa funduszu są oddzielone od majątku TFI — upadłość towarzystwa nie oznacza utraty pieniędzy inwestorów (co nie chroni jednak przed spadkiem wartości samych inwestycji).

## Rodzaje funduszy
### Według formy prawnej
- **Fundusz otwarty (FIO)** — jednostki można odkupić (umorzyć) w każdym dniu wyceny; duża [[plynnosc|płynność]].
- **Specjalistyczny fundusz otwarty (SFIO)** — podobny, ale z większą swobodą polityki lub ograniczonym kręgiem uczestników.
- **Fundusz zamknięty (FIZ)** — emituje **certyfikaty**; wykup jest ograniczony, a część certyfikatów notowana jest na giełdzie. Może inwestować w mniej płynne aktywa.

### Według polityki inwestycyjnej
| Typ | W co inwestuje | Ryzyko |
|---|---|---|
| Rynku pieniężnego / gotówkowy | krótkie instrumenty dłużne, depozyty | niskie |
| Dłużny (obligacyjny) | obligacje | niskie do umiarkowanego |
| Mieszany (zrównoważony, stabilnego wzrostu) | akcje + obligacje | umiarkowane |
| Akcyjny | głównie akcje | wysokie |

### Fundusze pasywne i ETF
- **Fundusz aktywny** — zarządzający próbuje wybrać lepsze aktywa i „pokonać” wybrany indeks.
- **Fundusz indeksowy (pasywny)** — odwzorowuje indeks, np. WIG20; zwykle ma niższe opłaty.
- **ETF** (exchange traded fund) — fundusz, najczęściej indeksowy, którego jednostki notowane są na giełdzie jak akcje.

## Koszty
Najważniejsza jest **opłata za zarządzanie** pobierana codziennie z aktywów (dlatego nie widać jej na wyciągu — jest już „w cenie” jednostki). Mogą też wystąpić opłata dystrybucyjna przy zakupie i opłata za wynik. Wartość jednostki podawana przez fundusz jest **już po opłatach za zarządzanie**.

> !uwaga Różnica 1–2 punktów procentowych opłat rocznie wydaje się mała, ale dzięki [[procent-skladany|procentowi składanemu]] po 20 latach może „zjeść” znaczną część zysku. Przed zakupem warto sprawdzić łączny wskaźnik kosztów w dokumencie z kluczowymi informacjami.

## Zalety i wady
| Zalety | Wady |
|---|---|
| [[dywersyfikacja]] już od niewielkiej kwoty | opłaty obniżają wynik |
| profesjonalne zarządzanie | brak wpływu na wybór konkretnych aktywów |
| płynność (FIO) | wyniki przeszłe nie gwarantują przyszłych |
| nadzór KNF, oddzielenie aktywów | ryzyko rynkowe pozostaje — fundusz akcyjny może stracić |

> !zapamietaj Fundusz **nie usuwa ryzyka rynku** — zmniejsza tylko ryzyko związane z pojedynczą spółką dzięki dywersyfikacji. Wybór funduszu zaczyna się od pytania o **cel, horyzont i akceptowane ryzyko**, a nie od zeszłorocznego rankingu.`,
            ru: `Не у каждого есть время и знания, чтобы самому выбирать акции и облигации. Для таких людей созданы [[fundusz-inwestycyjny|инвестиционные фонды]] — классический пример [[inwestycja-posrednia|косвенного инвестирования]].

## Как работает фонд
1. Много инвесторов вносят деньги в общий пул.
2. Профессиональный управляющий инвестирует пул согласно инвестиционной политике фонда (например, «акции польских компаний»).
3. Каждый инвестор владеет долей пула пропорционально взносу — в форме **паёв (jednostki uczestnictwa)** или **инвестиционных сертификатов (certyfikaty inwestycyjne)**.
4. Стоимость доли меняется вместе со стоимостью активов фонда.

$$ стоимость пая = (активы − обязательства) / число паёв | чистая стоимость активов на пай

> !przyklad У фонда чистые активы 10 млн зл и 100 000 паёв — пай стоит 100 зл. Вы покупаете 50 паёв за 5 000 зл. Через год чистые активы (после расходов) растут до 10,8 млн зл при том же числе паёв: пай стоит 108 зл, ваши 50 паёв — 5 400 зл, то есть +8%.

## Кто есть кто
| Субъект | Роль |
|---|---|
| [[tfi|TFI]] (общество инвестиционных фондов) | создаёт фонд и управляет им |
| Депозитарий (обычно банк) | хранит активы фонда и контролирует соответствие действий закону и уставу |
| [[knf|KNF]] | выдаёт разрешения и осуществляет надзор |
| Дистрибьютор | продаёт паи (банк, брокерский дом, интернет-платформа) |

Правовая основа — закон от 27 мая 2004 г. об инвестиционных фондах и управлении альтернативными инвестиционными фондами. Активы фонда отделены от имущества TFI — банкротство общества не означает потери денег инвесторов (но это не защищает от падения стоимости самих инвестиций).

## Виды фондов
### По правовой форме
- **Открытый фонд (FIO)** — паи можно погасить (выкупить) в любой день оценки; высокая [[plynnosc|ликвидность]].
- **Специализированный открытый фонд (SFIO)** — похож, но с большей свободой политики или ограниченным кругом участников.
- **Закрытый фонд (FIZ)** — выпускает **сертификаты**; выкуп ограничен, часть сертификатов торгуется на бирже. Может вкладывать в менее ликвидные активы.

### По инвестиционной политике
| Тип | Во что вкладывает | Риск |
|---|---|---|
| Денежного рынка | короткие долговые инструменты, депозиты | низкий |
| Долговой (облигационный) | облигации | от низкого до умеренного |
| Смешанный (сбалансированный, стабильного роста) | акции + облигации | умеренный |
| Акционный | в основном акции | высокий |

### Пассивные фонды и ETF
- **Активный фонд** — управляющий пытается выбрать лучшие активы и «обыграть» выбранный индекс.
- **Индексный (пассивный) фонд** — повторяет индекс, например WIG20; обычно с более низкими комиссиями.
- **ETF** (exchange traded fund) — фонд, чаще всего индексный, паи которого торгуются на бирже как акции.

## Расходы
Главное — **плата за управление**, ежедневно списываемая из активов (поэтому её не видно в выписке — она уже «в цене» пая). Возможны также дистрибуционная комиссия при покупке и плата за результат. Стоимость пая, публикуемая фондом, **уже за вычетом платы за управление**.

> !uwaga Разница в 1–2 процентных пункта комиссий в год кажется небольшой, но из-за [[procent-skladany|сложных процентов]] за 20 лет может «съесть» значительную часть прибыли. Перед покупкой стоит проверить совокупный показатель расходов в документе с ключевой информацией.

## Плюсы и минусы
| Плюсы | Минусы |
|---|---|
| [[dywersyfikacja|диверсификация]] уже с небольшой суммы | комиссии снижают результат |
| профессиональное управление | нет влияния на выбор конкретных активов |
| ликвидность (FIO) | прошлые результаты не гарантируют будущих |
| надзор KNF, отделение активов | рыночный риск остаётся — акционный фонд может потерять |

> !zapamietaj Фонд **не устраняет рыночный риск** — он лишь снижает риск отдельной компании благодаря диверсификации. Выбор фонда начинается с вопроса о **цели, горизонте и приемлемом риске**, а не с прошлогоднего рейтинга.`,
          },
          quiz: [
            { q: { pl: "Kto przechowuje aktywa funduszu i kontroluje legalność jego działań?", ru: "Кто хранит активы фонда и контролирует законность его действий?" },
              a: [{ pl: "TFI", ru: "TFI" }, { pl: "Dystrybutor", ru: "Дистрибьютор" }, { pl: "Uczestnik funduszu", ru: "Участник фонда" }, { pl: "Depozytariusz", ru: "Депозитарий" }],
              correct: 3, why: { pl: "Depozytariusz (zwykle bank) przechowuje aktywa; TFI zarządza.", ru: "Депозитарий (обычно банк) хранит активы; TFI управляет." } },
            { q: { pl: "Aktywa netto 10,8 mln zł, 100 000 jednostek. Wartość jednostki:", ru: "Чистые активы 10,8 млн зл, 100 000 паёв. Стоимость пая:" },
              a: [{ pl: "108 zł", ru: "108 зл" }, { pl: "100 zł", ru: "100 зл" }, { pl: "10,8 zł", ru: "10,8 зл" }, { pl: "1 080 zł", ru: "1 080 зл" }],
              correct: 0, why: { pl: "10 800 000 / 100 000 = 108 zł.", ru: "10 800 000 / 100 000 = 108 зл." } },
            { q: { pl: "Fundusz, którego jednostki można odkupić w każdym dniu wyceny, to:", ru: "Фонд, паи которого можно погасить в любой день оценки, — это:" },
              a: [{ pl: "FIZ", ru: "FIZ" }, { pl: "FIO", ru: "FIO" }, { pl: "REIT", ru: "REIT" }, { pl: "obligacja", ru: "облигация" }],
              correct: 1, why: { pl: "Fundusz otwarty zapewnia bieżący odkup jednostek.", ru: "Открытый фонд обеспечивает текущий выкуп паёв." } },
            { q: { pl: "Czego NIE eliminuje inwestowanie przez fundusz akcyjny?", ru: "Чего НЕ устраняет инвестирование через акционный фонд?" },
              a: [{ pl: "Konieczności samodzielnego wyboru spółek", ru: "Необходимости самостоятельно выбирать компании" }, { pl: "Dużej zależności od jednej spółki", ru: "Сильной зависимости от одной компании" }, { pl: "Ryzyka spadku całego rynku", ru: "Риска падения всего рынка" }, { pl: "Potrzeby dużego kapitału na dywersyfikację", ru: "Потребности в большом капитале для диверсификации" }],
              correct: 2, why: { pl: "Dywersyfikacja zmniejsza ryzyko specyficzne, ale nie rynkowe.", ru: "Диверсификация снижает специфический риск, но не рыночный." } },
            { q: { pl: "Fundusz odwzorowujący indeks, notowany na giełdzie jak akcja, to:", ru: "Фонд, повторяющий индекс и торгуемый на бирже как акция, — это:" },
              a: [{ pl: "ETF", ru: "ETF" }, { pl: "FIZ aktywów niepublicznych", ru: "FIZ непубличных активов" }, { pl: "lokata", ru: "депозит" }, { pl: "fundusz rynku pieniężnego", ru: "фонд денежного рынка" }],
              correct: 0, why: { pl: "ETF = exchange traded fund, zwykle pasywny i tani.", ru: "ETF — exchange traded fund, обычно пассивный и недорогой." } },
          ],
        },
        // ------------------------------------------------------------------ 4.3
        {
          id: "4.3",
          title: { pl: "Inwestycje alternatywne: złoto, nieruchomości, kolekcje", ru: "Альтернативные инвестиции: золото, недвижимость, коллекции" },
          src: "Karta przedmiotu (alternatywne sposoby inwestowania) + literatura uzupełniająca: Ostrowska; Witkiewicz; Tokarz; Adamska, Fierla (red.)",
          body: {
            pl: `[[inwestycje-alternatywne|Inwestycje alternatywne]] to wszystko, co wykracza poza klasyczny zestaw „akcje, obligacje, lokaty”. Karta przedmiotu podkreśla ten temat, a literatura uzupełniająca poświęca mu osobne książki: o złocie i srebrze, o REIT-ach, o kolekcjonowaniu.

## Dlaczego ktoś inwestuje alternatywnie
- **Dywersyfikacja** — ceny tych aktywów często zachowują się inaczej niż ceny akcji i obligacji.
- **Ochrona przed inflacją** — aktywa realne (złoto, nieruchomości) mogą zachowywać siłę nabywczą w długim okresie.
- **Pasja** — przy kolekcjonowaniu liczy się też przyjemność posiadania.

## Złoto i metale szlachetne
Złoto od wieków uważane jest za „bezpieczną przystań” w czasach kryzysów. Formy inwestowania:
| Forma | Uwagi |
|---|---|
| [[zloto-inwestycyjne|złoto fizyczne]] — sztabki, monety bulionowe | trzeba je przechowywać i ubezpieczyć; jest różnica między ceną kupna i sprzedaży (spread) |
| ETF-y i certyfikaty na złoto | łatwy obrót na giełdzie, bez przechowywania metalu |
| akcje spółek wydobywczych | zależą od ceny złota, ale też od kondycji firmy |

Cechy: złoto **nie płaci odsetek ani dywidend** — zarabia się wyłącznie na wzroście ceny. Cena wyrażana jest zwykle w dolarach za uncję trojańską (ok. 31,1 g), więc dla inwestora z Polski znaczenie ma też kurs USD/PLN.

> !przyklad Inwestor kupuje sztabkę za 10 000 zł. W tym czasie lokata dałaby odsetki, a złoto nie daje nic, dopóki nie wzrośnie cena. Utrata odsetek to [[koszt-alternatywny|koszt alternatywny]] trzymania złota — trzeba go uwzględnić, porównując wyniki.

## Nieruchomości
Inwestowanie w nieruchomości przypomina okazje z Eurocash: jest [[cena-zakupu|cena]], [[wklad-wlasny|wkład własny]], często kredyt (czyli [[dzwignia-finansowa|dźwignia]]) i [[przychod-pasywny|przychód pasywny]] z najmu.

### Bezpośrednio
Kupno mieszkania lub lokalu na wynajem. Zarobek: czynsz najmu (po kosztach) i ewentualny wzrost wartości. Wady: wysoki próg wejścia, niska [[plynnosc|płynność]], koszty transakcyjne, obowiązki zarządcy, ryzyko pustostanu.

### Pośrednio: REIT
[[reit|REIT]] (real estate investment trust) to spółka lub fundusz, który posiada nieruchomości przynoszące dochód (biura, magazyny, centra handlowe, mieszkania) i **wypłaca inwestorom większość zysku**. Akcje REIT-ów notowane są na giełdzie, więc można kupić ich niewielką ilość i szybko sprzedać. Forma ta powstała w USA w 1960 r. i jest dziś rozpowszechniona w wielu krajach; polski inwestor ma do niej dostęp głównie przez rynki zagraniczne lub fundusze.

| | Mieszkanie na wynajem | REIT |
|---|---|---|
| Próg wejścia | wysoki | niski (cena akcji) |
| Płynność | niska | wysoka (giełda) |
| Zarządzanie | samodzielne | profesjonalne |
| Dywersyfikacja | jedna nieruchomość | wiele nieruchomości |
| Wahania wyceny | rzadko widoczne | codzienne, jak akcji |

## Przedmioty kolekcjonerskie
Sztuka, wino, zegarki, znaczki, monety kolekcjonerskie, klasyczne samochody. Literatura opisuje tę grupę hasłem „inwestowanie, spekulowanie, kolekcjonowanie” — granica między nimi bywa płynna.

Charakterystyka:
- **brak bieżącego dochodu**,
- **bardzo niska płynność** — sprzedaż wymaga znalezienia kupca, często przez dom aukcyjny z wysoką prowizją,
- trudna wycena — każdy przedmiot jest inny, brak codziennych notowań,
- koszty przechowywania, ubezpieczenia, ekspertyz,
- ryzyko podróbek,
- potrzeba specjalistycznej wiedzy.

> !uwaga Wysokie wyniki z pojedynczych aukcji przyciągają uwagę mediów, ale nie mówią nic o tysiącach obiektów, które sprzedały się poniżej ceny zakupu albo wcale. To tzw. **błąd przeżywalności** — widzimy tylko sukcesy.

## Ogólne porównanie
| Aktywo | Bieżący dochód | Płynność | Główne ryzyka |
|---|---|---|---|
| Złoto | brak | wysoka (ETF) / średnia (sztabki) | wahania ceny, kurs walut, spread |
| Nieruchomość bezpośrednio | czynsz | niska | pustostan, dźwignia, koszty |
| REIT | dywidendy | wysoka | rynek nieruchomości, stopy procentowe |
| Kolekcje | brak | bardzo niska | wycena, podróbki, moda |

> !zapamietaj Inwestycje alternatywne mogą **poprawić dywersyfikację portfela**, ale zwykle mają **niższą płynność, wyższe koszty i trudniejszą wycenę** niż akcje i obligacje. Zazwyczaj stanowią uzupełnienie, a nie trzon portfela.`,
            ru: `[[inwestycje-alternatywne|Альтернативные инвестиции]] — всё, что выходит за классический набор «акции, облигации, депозиты». Карта предмета подчёркивает эту тему, а дополнительная литература посвящает ей отдельные книги: о золоте и серебре, о REIT, о коллекционировании.

## Почему инвестируют альтернативно
- **Диверсификация** — цены этих активов часто ведут себя иначе, чем цены акций и облигаций.
- **Защита от инфляции** — реальные активы (золото, недвижимость) могут сохранять покупательную способность в долгосрочной перспективе.
- **Увлечение** — при коллекционировании важно и удовольствие от владения.

## Золото и драгоценные металлы
Золото веками считается «тихой гаванью» в кризисы. Формы инвестирования:
| Форма | Замечания |
|---|---|
| [[zloto-inwestycyjne|физическое золото]] — слитки, инвестиционные монеты | их нужно хранить и страховать; есть разница между ценой покупки и продажи (спред) |
| ETF и сертификаты на золото | лёгкая торговля на бирже, без хранения металла |
| акции золотодобывающих компаний | зависят от цены золота, но и от состояния фирмы |

Особенности: золото **не платит ни процентов, ни дивидендов** — заработок только на росте цены. Цена обычно выражается в долларах за тройскую унцию (около 31,1 г), поэтому для инвестора из Польши важен и курс USD/PLN.

> !przyklad Инвестор покупает слиток за 10 000 зл. За это время депозит дал бы проценты, а золото не даёт ничего, пока не вырастет цена. Потерянные проценты — [[koszt-alternatywny|альтернативные издержки]] владения золотом; их нужно учитывать при сравнении результатов.

## Недвижимость
Инвестиции в недвижимость напоминают возможности из Eurocash: есть [[cena-zakupu|цена]], [[wklad-wlasny|собственный вклад]], часто кредит (то есть [[dzwignia-finansowa|рычаг]]) и [[przychod-pasywny|пассивный доход]] от аренды.

### Напрямую
Покупка квартиры или помещения под сдачу. Доход: арендная плата (после расходов) и возможный рост стоимости. Минусы: высокий порог входа, низкая [[plynnosc|ликвидность]], транзакционные расходы, обязанности управляющего, риск простоя.

### Косвенно: REIT
[[reit|REIT]] (real estate investment trust) — компания или фонд, владеющий доходной недвижимостью (офисы, склады, торговые центры, жильё) и **выплачивающий инвесторам большую часть прибыли**. Акции REIT торгуются на бирже, поэтому можно купить небольшое их количество и быстро продать. Эта форма появилась в США в 1960 году и сегодня распространена во многих странах; польский инвестор получает к ней доступ в основном через зарубежные рынки или фонды.

| | Квартира под сдачу | REIT |
|---|---|---|
| Порог входа | высокий | низкий (цена акции) |
| Ликвидность | низкая | высокая (биржа) |
| Управление | самостоятельное | профессиональное |
| Диверсификация | один объект | много объектов |
| Колебания оценки | редко видны | ежедневные, как у акций |

## Предметы коллекционирования
Искусство, вино, часы, марки, коллекционные монеты, классические автомобили. Литература описывает эту группу формулой «инвестирование, спекуляция, коллекционирование» — граница между ними размыта.

Особенности:
- **нет текущего дохода**,
- **очень низкая ликвидность** — для продажи нужен покупатель, часто через аукционный дом с высокой комиссией,
- трудная оценка — каждый предмет уникален, нет ежедневных котировок,
- расходы на хранение, страховку, экспертизу,
- риск подделок,
- нужны специальные знания.

> !uwaga Рекордные результаты отдельных аукционов привлекают внимание СМИ, но ничего не говорят о тысячах предметов, проданных ниже цены покупки или не проданных вовсе. Это так называемая **ошибка выжившего** — мы видим только успехи.

## Общее сравнение
| Актив | Текущий доход | Ликвидность | Главные риски |
|---|---|---|---|
| Золото | нет | высокая (ETF) / средняя (слитки) | колебания цены, валютный курс, спред |
| Недвижимость напрямую | аренда | низкая | простой, рычаг, расходы |
| REIT | дивиденды | высокая | рынок недвижимости, процентные ставки |
| Коллекции | нет | очень низкая | оценка, подделки, мода |

> !zapamietaj Альтернативные инвестиции могут **улучшить диверсификацию портфеля**, но обычно имеют **более низкую ликвидность, более высокие расходы и более сложную оценку**, чем акции и облигации. Как правило, это дополнение, а не основа портфеля.`,
          },
          quiz: [
            { q: { pl: "Jakiego dochodu bieżącego dostarcza złoto inwestycyjne?", ru: "Какой текущий доход даёт инвестиционное золото?" },
              a: [{ pl: "Odsetek", ru: "Проценты" }, { pl: "Dywidend", ru: "Дивиденды" }, { pl: "Żadnego — zarabia się tylko na wzroście ceny", ru: "Никакого — заработок только на росте цены" }, { pl: "Czynszu", ru: "Арендную плату" }],
              correct: 2, why: { pl: "Złoto nie płaci odsetek ani dywidend; trzeba też uwzględnić koszt alternatywny.", ru: "Золото не платит ни процентов, ни дивидендов; нужно учитывать и альтернативные издержки." } },
            { q: { pl: "Czym jest REIT?", ru: "Что такое REIT?" },
              a: [{ pl: "Rodzajem obligacji skarbowej", ru: "Видом государственной облигации" }, { pl: "Spółką/funduszem z nieruchomościami na dochód, wypłacającym większość zysku", ru: "Компанией/фондом с доходной недвижимостью, выплачивающим большую часть прибыли" }, { pl: "Kredytem hipotecznym", ru: "Ипотечным кредитом" }, { pl: "Kartą w Eurocash", ru: "Карточкой в Eurocash" }],
              correct: 1, why: { pl: "REIT daje pośredni dostęp do rynku nieruchomości przez giełdę.", ru: "REIT даёт косвенный доступ к рынку недвижимости через биржу." } },
            { q: { pl: "Która cecha jest typowa dla przedmiotów kolekcjonerskich?", ru: "Какая черта типична для предметов коллекционирования?" },
              a: [{ pl: "Bardzo niska płynność i trudna wycena", ru: "Очень низкая ликвидность и сложная оценка" }, { pl: "Codzienne notowania na giełdzie", ru: "Ежедневные котировки на бирже" }, { pl: "Stały kupon", ru: "Постоянный купон" }, { pl: "Gwarancja KNF", ru: "Гарантия KNF" }],
              correct: 0, why: { pl: "Każdy obiekt jest inny, sprzedaż wymaga znalezienia kupca i wiąże się z prowizjami.", ru: "Каждый предмет уникален, продажа требует поиска покупателя и связана с комиссиями." } },
            { q: { pl: "Co jest główną przewagą REIT nad bezpośrednim zakupem mieszkania na wynajem?", ru: "Главное преимущество REIT перед прямой покупкой квартиры под сдачу?" },
              a: [{ pl: "Brak jakiegokolwiek ryzyka", ru: "Полное отсутствие риска" }, { pl: "Gwarantowany wzrost cen", ru: "Гарантированный рост цен" }, { pl: "Wyższy próg wejścia", ru: "Более высокий порог входа" }, { pl: "Wysoka płynność i niski próg wejścia", ru: "Высокая ликвидность и низкий порог входа" }],
              correct: 3, why: { pl: "Akcje REIT można kupić w małej ilości i szybko sprzedać na giełdzie.", ru: "Акции REIT можно купить в малом количестве и быстро продать на бирже." } },
            { q: { pl: "„Błąd przeżywalności” przy kolekcjonowaniu oznacza, że:", ru: "«Ошибка выжившего» в коллекционировании означает, что:" },
              a: [{ pl: "kolekcje zawsze tracą", ru: "коллекции всегда теряют" }, { pl: "widzimy głównie spektakularne sukcesy, a nie nieudane transakcje", ru: "мы видим в основном громкие успехи, а не неудачные сделки" }, { pl: "obiekty ulegają zniszczeniu", ru: "предметы разрушаются" }, { pl: "aukcje są nielegalne", ru: "аукционы незаконны" }],
              correct: 1, why: { pl: "Rekordowe aukcje nie są reprezentatywne dla całego rynku.", ru: "Рекордные аукционы не репрезентативны для всего рынка." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Akcjonariusz jest:", ru: "Акционер — это:" },
          a: [{ pl: "wierzycielem spółki", ru: "кредитор компании" }, { pl: "pracownikiem spółki", ru: "работник компании" }, { pl: "współwłaścicielem spółki", ru: "совладелец компании" }, { pl: "depozytariuszem", ru: "депозитарий" }],
          correct: 2, why: { pl: "Akcja potwierdza udział we własności spółki akcyjnej.", ru: "Акция подтверждает долю в собственности акционерного общества." } },
        { q: { pl: "Dwa źródła zarobku na akcjach to:", ru: "Два источника дохода по акциям:" },
          a: [{ pl: "dywidenda i wzrost kursu", ru: "дивиденд и рост курса" }, { pl: "kupon i nominał", ru: "купон и номинал" }, { pl: "czynsz i kaucja", ru: "аренда и залог" }, { pl: "odsetki i prowizja", ru: "проценты и комиссия" }],
          correct: 0, why: { pl: "Stopa zwrotu = (P₁ − P₀ + D) / P₀.", ru: "Доходность = (P₁ − P₀ + D) / P₀." } },
        { q: { pl: "Akcja kupiona za 50 zł, dywidenda 2 zł, kurs spadł do 45 zł. Stopa zwrotu:", ru: "Акция куплена за 50 зл, дивиденд 2 зл, курс упал до 45 зл. Доходность:" },
          a: [{ pl: "−10%", ru: "−10%" }, { pl: "−6%", ru: "−6%" }, { pl: "+4%", ru: "+4%" }, { pl: "−14%", ru: "−14%" }],
          correct: 1, why: { pl: "(45 − 50 + 2) / 50 = −3 / 50 = −6%.", ru: "(45 − 50 + 2) / 50 = −3 / 50 = −6%." } },
        { q: { pl: "Obligacje skarbowe mają zwykle w danym kraju:", ru: "Государственные облигации обычно имеют в данной стране:" },
          a: [{ pl: "najwyższe ryzyko niewypłacalności", ru: "самый высокий риск неплатежа" }, { pl: "brak terminu wykupu", ru: "нет срока погашения" }, { pl: "prawo głosu", ru: "право голоса" }, { pl: "najniższe ryzyko niewypłacalności", ru: "самый низкий риск неплатежа" }],
          correct: 3, why: { pl: "Emitentem jest państwo, które ma największą zdolność obsługi długu w swojej walucie.", ru: "Эмитент — государство, у которого наибольшая способность обслуживать долг в своей валюте." } },
        { q: { pl: "Gdy stopy procentowe spadają, ceny obligacji o stałym kuponie:", ru: "Когда процентные ставки падают, цены облигаций с фиксированным купоном:" },
          a: [{ pl: "rosną", ru: "растут" }, { pl: "spadają", ru: "падают" }, { pl: "nie zmieniają się", ru: "не меняются" }, { pl: "spadają do zera", ru: "падают до нуля" }],
          correct: 0, why: { pl: "Stary, wyższy kupon staje się bardziej atrakcyjny niż nowe emisje.", ru: "Старый, более высокий купон становится привлекательнее новых выпусков." } },
        { q: { pl: "Fundusz inwestycyjny jest przykładem inwestowania:", ru: "Инвестиционный фонд — пример инвестирования:" },
          a: [{ pl: "bezpośredniego", ru: "прямого" }, { pl: "rzeczowego", ru: "реального" }, { pl: "pośredniego", ru: "косвенного" }, { pl: "obowiązkowego", ru: "обязательного" }],
          correct: 2, why: { pl: "Decyzje podejmuje zarządzający, a nie sam inwestor.", ru: "Решения принимает управляющий, а не сам инвестор." } },
        { q: { pl: "Kto tworzy fundusz inwestycyjny i nim zarządza?", ru: "Кто создаёт инвестиционный фонд и управляет им?" },
          a: [{ pl: "KNF", ru: "KNF" }, { pl: "TFI", ru: "TFI" }, { pl: "GPW", ru: "GPW" }, { pl: "NBP", ru: "NBP" }],
          correct: 1, why: { pl: "Towarzystwo funduszy inwestycyjnych; KNF nadzoruje, depozytariusz przechowuje aktywa.", ru: "Общество инвестиционных фондов; KNF надзирает, депозитарий хранит активы." } },
        { q: { pl: "Fundusz zamknięty (FIZ) emituje:", ru: "Закрытый фонд (FIZ) выпускает:" },
          a: [{ pl: "jednostki odkupywane codziennie", ru: "паи, выкупаемые ежедневно" }, { pl: "obligacje skarbowe", ru: "государственные облигации" }, { pl: "akcje spółki", ru: "акции компании" }, { pl: "certyfikaty inwestycyjne", ru: "инвестиционные сертификаты" }],
          correct: 3, why: { pl: "FIZ emituje certyfikaty; ich wykup jest ograniczony.", ru: "FIZ выпускает сертификаты; их выкуп ограничен." } },
        { q: { pl: "Opłata za zarządzanie funduszem:", ru: "Плата за управление фондом:" },
          a: [{ pl: "jest już ujęta w wartości jednostki", ru: "уже учтена в стоимости пая" }, { pl: "jest pobierana tylko przy sprzedaży", ru: "взимается только при продаже" }, { pl: "nie istnieje w funduszach pasywnych", ru: "не существует в пассивных фондах" }, { pl: "gwarantuje zysk", ru: "гарантирует прибыль" }],
          correct: 0, why: { pl: "Pobierana jest codziennie z aktywów, więc wycena jednostki jest po kosztach.", ru: "Взимается ежедневно из активов, поэтому оценка пая уже после расходов." } },
        { q: { pl: "Uncja trojańska złota to około:", ru: "Тройская унция золота — это около:" },
          a: [{ pl: "1 kg", ru: "1 кг" }, { pl: "100 g", ru: "100 г" }, { pl: "31,1 g", ru: "31,1 г" }, { pl: "10 g", ru: "10 г" }],
          correct: 2, why: { pl: "W uncjach trojańskich (ok. 31,1 g) notuje się cenę złota.", ru: "Цена золота котируется в тройских унциях (около 31,1 г)." } },
        { q: { pl: "Zakup mieszkania na wynajem z kredytem przypomina w Eurocash:", ru: "Покупка квартиры под сдачу в кредит напоминает в Eurocash:" },
          a: [{ pl: "kartę Los", ru: "карточку «Судьба»" }, { pl: "okazję z ceną, wkładem, długiem i przychodem pasywnym", ru: "возможность с ценой, вкладом, долгом и пассивным доходом" }, { pl: "pole Wypłata", ru: "клетку «Выплата»" }, { pl: "koniec gry", ru: "конец игры" }],
          correct: 1, why: { pl: "Te same cztery liczby i efekt dźwigni.", ru: "Те же четыре числа и эффект рычага." } },
        { q: { pl: "Inwestycje alternatywne w porównaniu z akcjami i obligacjami mają zwykle:", ru: "Альтернативные инвестиции по сравнению с акциями и облигациями обычно имеют:" },
          a: [{ pl: "wyższą płynność i niższe koszty", ru: "более высокую ликвидность и низкие расходы" }, { pl: "gwarantowany zwrot", ru: "гарантированную доходность" }, { pl: "niższą płynność, wyższe koszty i trudniejszą wycenę", ru: "более низкую ликвидность, высокие расходы и сложную оценку" }, { pl: "nadzór GPW", ru: "надзор GPW" }],
          correct: 2, why: { pl: "Dlatego zwykle są uzupełnieniem, a nie trzonem portfela.", ru: "Поэтому обычно они дополнение, а не основа портфеля." } },
      ],
    },
    {
      n: 5,
      color: "--c5",
      title: { pl: "Ryzyko i uzasadnienie decyzji", ru: "Риск и обоснование решения" },
      lead: {
        pl: "Czym jest ryzyko inwestycyjne i jakie ma rodzaje, jak je mierzyć (oczekiwana stopa zwrotu, odchylenie standardowe), jak zmniejsza je dywersyfikacja, na czym polega kompromis zysk–ryzyko i jak uzasadnić decyzję inwestycyjną w raporcie.",
        ru: "Что такое инвестиционный риск и какие бывают его виды, как его измерять (ожидаемая доходность, стандартное отклонение), как его снижает диверсификация, в чём компромисс доходность–риск и как обосновать инвестиционное решение в отчёте.",
      },
      subs: [
        // ------------------------------------------------------------------ 5.1
        {
          id: "5.1",
          title: { pl: "Ryzyko inwestycyjne i jego rodzaje", ru: "Инвестиционный риск и его виды" },
          src: "Karta przedmiotu (ryzyko inwestowania; efekt PI_W3) + literatura: Mayo, Inwestycje; Sławiński, Chmielewska, Zrozumieć rynki finansowe",
          body: {
            pl: `Każda inwestycja dotyczy przyszłości, a przyszłość jest niepewna. [[ryzyko-inwestycyjne|Ryzyko inwestycyjne]] to **możliwość, że rzeczywisty wynik będzie inny niż oczekiwany** — zwykle myślimy o wyniku gorszym, ale w finansach ryzyko oznacza każde odchylenie, także w górę.

## Ryzyko a niepewność
- **Ryzyko** — znamy możliwe scenariusze i potrafimy oszacować ich prawdopodobieństwo (np. na podstawie historii).
- **Niepewność** — nie potrafimy nawet sensownie określić prawdopodobieństw (np. zupełnie nowa technologia).

W praktyce oba słowa często używane są zamiennie, ale warto znać różnicę.

## Dwie wielkie grupy ryzyka
| | [[ryzyko-systematyczne|Ryzyko systematyczne (rynkowe)]] | [[ryzyko-specyficzne|Ryzyko specyficzne (niesystematyczne)]] |
|---|---|---|
| Źródło | cała gospodarka i rynek | konkretna spółka, branża, projekt |
| Przykłady | [[recesja]], zmiana [[stopa-referencyjna|stóp procentowych]], [[inflacja]], kryzys finansowy | błąd zarządu, utrata klienta, pożar fabryki, proces sądowy |
| Czy dywersyfikacja pomaga | **nie** | **tak** |

> !zapamietaj **Ryzyka specyficznego można się w dużej mierze pozbyć przez [[dywersyfikacja|dywersyfikację]]**, ryzyka systematycznego — nie. Dlatego rynek wynagradza inwestorów (premią za ryzyko) głównie za ponoszenie ryzyka systematycznego.

## Szczegółowe rodzaje ryzyka
| Rodzaj | Na czym polega | Przykład |
|---|---|---|
| Rynkowe (cenowe) | spadek cen aktywów na rynku | bessa na giełdzie |
| [[ryzyko-stopy-procentowej|Stopy procentowej]] | zmiana stóp wpływa na ceny obligacji i koszt długu | wzrost stóp → tanieją obligacje, drożeje kredyt |
| Inflacji | zysk nominalny nie pokrywa wzrostu cen | lokata 5% przy inflacji 6% |
| Kredytowe (niewypłacalności) | dłużnik nie zapłaci | firma nie wykupuje obligacji |
| [[plynnosc|Płynności]] | nie da się szybko sprzedać bez dużej obniżki ceny | mieszkanie, obraz, akcje małej spółki |
| Walutowe | zmiana kursu walut | akcje w USD, gdy złoty się umacnia |
| Operacyjne / biznesowe | problemy w działalności firmy lub projektu | opóźnienie budowy, awaria |
| Polityczne i prawne | zmiana przepisów, podatków, regulacji | nowy podatek od danej branży |
| Finansowe (dźwigni) | dług zwiększa wahania wyniku właściciela | przykład A z Eurocash |

## Ryzyko w projekcie inwestycyjnym
W inwestycji rzeczowej ryzyko pojawia się w każdej fazie cyklu:
- **faza przedinwestycyjna** — błędna prognoza popytu lub kosztów,
- **faza realizacji** — przekroczenie budżetu, opóźnienia, problemy z wykonawcą,
- **faza operacyjna** — niższe przychody, wyższe koszty, zmiany na rynku.

> !przyklad W Eurocash spotkaliście się z kilkoma rodzajami ryzyka naraz: karty „Los” to zdarzenia losowe (ryzyko operacyjne), dług przy okazji A to ryzyko finansowe (dźwignia), a możliwość sprzedaży poniżej ceny zakupu — ryzyko cenowe. Rezerwa gotówki była Waszą ochroną przed ryzykiem płynności.

## Ryzyko a państwo i gospodarka
Karta przedmiotu łączy ryzyko inwestowania z **gospodarką finansową państwa**. Deficyt i dług publiczny, [[polityka-fiskalna|polityka fiskalna]] i [[polityka-pieniezna|polityka pieniężna]] wpływają na stopy procentowe, inflację i kurs walut, a przez to — na ryzyko systematyczne wszystkich inwestycji w kraju. Państwo z wysokim zadłużeniem płaci zwykle wyższe odsetki od obligacji, bo inwestorzy żądają większej [[premia-za-ryzyko|premii za ryzyko]].

> !uwaga Ryzyka nie da się całkowicie usunąć. Można je **rozpoznać, zmierzyć, ograniczyć** (dywersyfikacja, rezerwa, mniejszy dług) lub **przenieść** (ubezpieczenie, umowa z wykonawcą). Najgorszą strategią jest udawanie, że go nie ma.`,
            ru: `Любая инвестиция касается будущего, а будущее неопределённо. [[ryzyko-inwestycyjne|Инвестиционный риск]] — это **возможность того, что фактический результат будет отличаться от ожидаемого**. Обычно думают о худшем результате, но в финансах риск — это любое отклонение, в том числе вверх.

## Риск и неопределённость
- **Риск** — мы знаем возможные сценарии и можем оценить их вероятность (например, по истории).
- **Неопределённость** — мы не можем даже разумно определить вероятности (например, совершенно новая технология).

На практике эти слова часто используют как синонимы, но разницу стоит знать.

## Две большие группы риска
| | [[ryzyko-systematyczne|Систематический (рыночный) риск]] | [[ryzyko-specyficzne|Специфический (несистематический) риск]] |
|---|---|---|
| Источник | вся экономика и рынок | конкретная компания, отрасль, проект |
| Примеры | [[recesja|рецессия]], изменение [[stopa-referencyjna|процентных ставок]], [[inflacja|инфляция]], финансовый кризис | ошибка правления, потеря клиента, пожар на заводе, судебный процесс |
| Помогает ли диверсификация | **нет** | **да** |

> !zapamietaj **От специфического риска можно в значительной мере избавиться с помощью [[dywersyfikacja|диверсификации]]**, от систематического — нет. Поэтому рынок вознаграждает инвесторов (премией за риск) в основном за принятие систематического риска.

## Подробные виды риска
| Вид | В чём состоит | Пример |
|---|---|---|
| Рыночный (ценовой) | падение цен активов на рынке | медвежий рынок на бирже |
| [[ryzyko-stopy-procentowej|Процентный]] | изменение ставок влияет на цены облигаций и стоимость долга | рост ставок → облигации дешевеют, кредит дорожает |
| Инфляционный | номинальная прибыль не покрывает рост цен | депозит 5% при инфляции 6% |
| Кредитный (неплатежа) | должник не заплатит | фирма не погашает облигации |
| [[plynnosc|Ликвидности]] | нельзя быстро продать без большой скидки | квартира, картина, акции малой компании |
| Валютный | изменение валютного курса | акции в USD при укреплении злотого |
| Операционный / деловой | проблемы в деятельности фирмы или проекта | задержка строительства, авария |
| Политический и правовой | изменение законов, налогов, регулирования | новый налог для отрасли |
| Финансовый (рычага) | долг увеличивает колебания результата владельца | пример A из Eurocash |

## Риск в инвестиционном проекте
В реальной инвестиции риск появляется на каждой фазе цикла:
- **прединвестиционная фаза** — ошибочный прогноз спроса или затрат,
- **фаза реализации** — превышение бюджета, задержки, проблемы с подрядчиком,
- **операционная фаза** — меньшие доходы, большие расходы, изменения на рынке.

> !przyklad В Eurocash вы столкнулись сразу с несколькими видами риска: карточки «Судьба» — случайные события (операционный риск), долг в возможности A — финансовый риск (рычаг), а возможность продать ниже цены покупки — ценовой риск. Резерв наличных был вашей защитой от риска ликвидности.

## Риск, государство и экономика
Карта предмета связывает инвестиционный риск с **финансовым хозяйством государства**. Дефицит и государственный долг, [[polityka-fiskalna|фискальная]] и [[polityka-pieniezna|денежная политика]] влияют на процентные ставки, инфляцию и валютный курс, а через них — на систематический риск всех инвестиций в стране. Государство с высоким долгом обычно платит более высокие проценты по облигациям, потому что инвесторы требуют большей [[premia-za-ryzyko|премии за риск]].

> !uwaga Риск нельзя устранить полностью. Его можно **распознать, измерить, ограничить** (диверсификация, резерв, меньший долг) или **передать** (страховка, договор с подрядчиком). Худшая стратегия — делать вид, что его нет.`,
          },
          quiz: [
            { q: { pl: "Ryzyko inwestycyjne w finansach to:", ru: "Инвестиционный риск в финансах — это:" },
              a: [{ pl: "pewność straty", ru: "уверенность в убытке" }, { pl: "możliwość odchylenia wyniku od oczekiwanego", ru: "возможность отклонения результата от ожидаемого" }, { pl: "wysokość prowizji", ru: "размер комиссии" }, { pl: "tylko ryzyko upadłości", ru: "только риск банкротства" }],
              correct: 1, why: { pl: "Ryzyko obejmuje odchylenia w dół i w górę od oczekiwań.", ru: "Риск включает отклонения от ожиданий и вниз, и вверх." } },
            { q: { pl: "Którego ryzyka NIE da się usunąć dywersyfikacją?", ru: "Какой риск НЕЛЬЗЯ устранить диверсификацией?" },
              a: [{ pl: "Pożaru w jednej fabryce", ru: "Пожара на одном заводе" }, { pl: "Błędu zarządu jednej spółki", ru: "Ошибки правления одной компании" }, { pl: "Systematycznego, np. recesji", ru: "Систематического, например рецессии" }, { pl: "Utraty klienta przez jedną firmę", ru: "Потери клиента одной фирмой" }],
              correct: 2, why: { pl: "Ryzyko systematyczne dotyczy całego rynku.", ru: "Систематический риск касается всего рынка." } },
            { q: { pl: "Mieszkania nie da się szybko sprzedać bez obniżki ceny. To ryzyko:", ru: "Квартиру нельзя быстро продать без скидки. Это риск:" },
              a: [{ pl: "płynności", ru: "ликвидности" }, { pl: "walutowe", ru: "валютный" }, { pl: "inflacji", ru: "инфляционный" }, { pl: "polityczne", ru: "политический" }],
              correct: 0, why: { pl: "Ryzyko płynności = trudność zamiany aktywa na gotówkę bez straty.", ru: "Риск ликвидности — трудность обратить актив в деньги без потерь." } },
            { q: { pl: "Polski inwestor ma akcje notowane w USD, a złoty się umacnia. Grozi mu ryzyko:", ru: "У польского инвестора акции в USD, а злотый укрепляется. Ему грозит риск:" },
              a: [{ pl: "płynności", ru: "ликвидности" }, { pl: "operacyjne", ru: "операционный" }, { pl: "kredytowe", ru: "кредитный" }, { pl: "walutowe", ru: "валютный" }],
              correct: 3, why: { pl: "Silniejszy złoty oznacza mniej złotych za każdego dolara.", ru: "Более сильный злотый означает меньше злотых за каждый доллар." } },
            { q: { pl: "Dlaczego państwo z wysokim długiem płaci zwykle wyższe odsetki od obligacji?", ru: "Почему государство с высоким долгом обычно платит более высокие проценты по облигациям?" },
              a: [{ pl: "Bo tak nakazuje GPW", ru: "Так требует GPW" }, { pl: "Bo inwestorzy żądają wyższej premii za ryzyko", ru: "Потому что инвесторы требуют более высокой премии за риск" }, { pl: "Bo ma niższą inflację", ru: "Потому что у него ниже инфляция" }, { pl: "To nieprawda", ru: "Это неправда" }],
              correct: 1, why: { pl: "Wyższe ryzyko niewypłacalności = wyższa wymagana stopa zwrotu.", ru: "Выше риск неплатежа — выше требуемая доходность." } },
          ],
        },
        // ------------------------------------------------------------------ 5.2
        {
          id: "5.2",
          title: { pl: "Pomiar ryzyka, dywersyfikacja i kompromis zysk–ryzyko", ru: "Измерение риска, диверсификация и компромисс доходность–риск" },
          src: "Karta przedmiotu (efekt PI_U1: ocena efektywności i ryzyka) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Żeby porównać ryzyko dwóch inwestycji, potrzebujemy liczb. Najczęściej stosowane miary opierają się na prostej statystyce.

## Oczekiwana stopa zwrotu
Jeśli znamy możliwe scenariusze i ich prawdopodobieństwa, [[stopa-zwrotu|oczekiwana stopa zwrotu]] to średnia ważona:

$$ E(R) = p₁ × R₁ + p₂ × R₂ + … + pₙ × Rₙ | pᵢ — prawdopodobieństwo scenariusza, Rᵢ — stopa zwrotu w scenariuszu

> !przyklad Inwestycja ma trzy scenariusze: kryzys (prawdopodobieństwo 25%, zwrot −5%), normalny (50%, +8%), boom (25%, +15%). E(R) = 0,25 × (−5) + 0,5 × 8 + 0,25 × 15 = −1,25 + 4 + 3,75 = **6,5%**.

## Odchylenie standardowe
[[odchylenie-standardowe|Odchylenie standardowe]] (σ) mierzy, **jak bardzo wyniki rozrzucone są wokół średniej**. Im większe σ, tym większe ryzyko.

$$ σ = √[ Σ pᵢ × (Rᵢ − E(R))² ] | wariancja to σ²

Dla przykładu powyżej:
- odchylenia od 6,5%: −11,5; +1,5; +8,5,
- kwadraty: 132,25; 2,25; 72,25,
- ważone: 0,25 × 132,25 + 0,5 × 2,25 + 0,25 × 72,25 = 33,06 + 1,13 + 18,06 = **52,25** (to wariancja),
- σ = √52,25 ≈ **7,23 punktu procentowego**.

### Na danych historycznych
Dwie inwestycje miały w czterech latach takie stopy zwrotu:

| Rok | X | Y |
|---|---|---|
| 1 | 8% | −10% |
| 2 | 10% | 30% |
| 3 | 12% | 0% |
| 4 | 10% | 20% |
| **Średnia** | **10%** | **10%** |
| **σ** | **≈ 1,41 p.p.** | **≈ 15,81 p.p.** |

Obie dały średnio 10%, ale Y jest znacznie bardziej ryzykowna. (Liczymy wariancję jako średnią kwadratów odchyleń: dla X (4 + 0 + 4 + 0) / 4 = 2, dla Y (400 + 400 + 100 + 100) / 4 = 250. Przy próbie statystycy dzielą często przez n − 1 — wyniki będą nieco wyższe, wniosek ten sam.)

## Współczynnik zmienności
Gdy inwestycje mają różne średnie, porównujemy **ryzyko na jednostkę zwrotu**:

$$ CV = σ / E(R) | im niższy, tym korzystniejsza relacja ryzyka do zwrotu

Dla przykładu ze scenariuszami: 7,23 / 6,5 ≈ **1,11**.

## Kompromis zysk–ryzyko
Inwestorzy w większości mają **awersję do ryzyka**: przy tym samym oczekiwanym zwrocie wybiorą inwestycję mniej ryzykowną. Dlatego bardziej ryzykowne aktywa muszą oferować wyższy oczekiwany zwrot — [[premia-za-ryzyko|premię za ryzyko]].

$$ wymagana stopa = stopa wolna od ryzyka + premia za ryzyko | ta sama logika co przy stopie dyskontowej

> !zapamietaj **Wyższy oczekiwany zwrot = wyższe ryzyko.** Nie ma wysokiego zysku bez ryzyka. Inwestycja „racjonalna” to taka, która przy danym ryzyku daje najwyższy oczekiwany zwrot albo przy danym zwrocie — najniższe ryzyko.

## Dywersyfikacja
[[dywersyfikacja|Dywersyfikacja]] to rozłożenie kapitału na różne aktywa, by straty jednych łagodziły zyski innych. Działa najlepiej, gdy wyniki aktywów są **słabo lub ujemnie skorelowane** (nie poruszają się razem).

- Kilka spółek z różnych branż → spada ryzyko specyficzne.
- Akcje + obligacje + trochę aktywów alternatywnych → portfel mniej zależy od jednego rynku.
- Ryzyko systematyczne zostaje — wszystkie akcje mogą spaść w kryzysie.

> !przyklad Lodziarnia zarabia latem, a sklep z parasolami w deszczowe dni. Właściciel obu firm ma stabilniejszy dochód niż właściciel tylko jednej — choć ani lody, ani parasole nie stały się mniej ryzykowne. Tak działa dywersyfikacja w [[portfel-inwestycyjny|portfelu]].

## Teoria portfela w jednym akapicie
Harry Markowitz (lata 50. XX w.) pokazał, że ryzyko portfela zależy nie tylko od ryzyka składników, ale też od tego, **jak bardzo poruszają się one razem**. Dlatego dodanie nawet ryzykownego aktywa może obniżyć ryzyko całego portfela, jeśli jest ono słabo skorelowane z resztą.

> !uwaga Odchylenie standardowe liczone z historii mówi o **przeszłości**. Przyszłe wahania mogą być większe — kryzysy zdarzają się częściej, niż sugerują proste modele. Miary ryzyka to pomoc, a nie gwarancja.`,
            ru: `Чтобы сравнить риск двух инвестиций, нужны числа. Самые распространённые меры основаны на простой статистике.

## Ожидаемая доходность
Если известны возможные сценарии и их вероятности, [[stopa-zwrotu|ожидаемая доходность]] — это средневзвешенная величина:

$$ E(R) = p₁ × R₁ + p₂ × R₂ + … + pₙ × Rₙ | pᵢ — вероятность сценария, Rᵢ — доходность в сценарии

> !przyklad У инвестиции три сценария: кризис (вероятность 25%, доходность −5%), обычный (50%, +8%), бум (25%, +15%). E(R) = 0,25 × (−5) + 0,5 × 8 + 0,25 × 15 = −1,25 + 4 + 3,75 = **6,5%**.

## Стандартное отклонение
[[odchylenie-standardowe|Стандартное отклонение]] (σ) измеряет, **насколько результаты разбросаны вокруг среднего**. Чем больше σ, тем выше риск.

$$ σ = √[ Σ pᵢ × (Rᵢ − E(R))² ] | дисперсия — это σ²

Для примера выше:
- отклонения от 6,5%: −11,5; +1,5; +8,5,
- квадраты: 132,25; 2,25; 72,25,
- взвешенные: 0,25 × 132,25 + 0,5 × 2,25 + 0,25 × 72,25 = 33,06 + 1,13 + 18,06 = **52,25** (это дисперсия),
- σ = √52,25 ≈ **7,23 процентного пункта**.

### По историческим данным
Две инвестиции за четыре года показали такую доходность:

| Год | X | Y |
|---|---|---|
| 1 | 8% | −10% |
| 2 | 10% | 30% |
| 3 | 12% | 0% |
| 4 | 10% | 20% |
| **Среднее** | **10%** | **10%** |
| **σ** | **≈ 1,41 п.п.** | **≈ 15,81 п.п.** |

Обе в среднем дали 10%, но Y значительно рискованнее. (Дисперсию считаем как среднее квадратов отклонений: для X (4 + 0 + 4 + 0) / 4 = 2, для Y (400 + 400 + 100 + 100) / 4 = 250. Для выборки статистики часто делят на n − 1 — результаты будут немного выше, вывод тот же.)

## Коэффициент вариации
Когда у инвестиций разные средние, сравнивают **риск на единицу доходности**:

$$ CV = σ / E(R) | чем ниже, тем выгоднее соотношение риска и доходности

Для примера со сценариями: 7,23 / 6,5 ≈ **1,11**.

## Компромисс доходность–риск
Большинство инвесторов **не склонны к риску**: при одинаковой ожидаемой доходности они выберут менее рискованную инвестицию. Поэтому более рискованные активы должны предлагать более высокую ожидаемую доходность — [[premia-za-ryzyko|премию за риск]].

$$ требуемая ставка = безрисковая ставка + премия за риск | та же логика, что у ставки дисконтирования

> !zapamietaj **Выше ожидаемая доходность — выше риск.** Высокой прибыли без риска не бывает. «Рациональная» инвестиция — та, что при данном риске даёт наибольшую ожидаемую доходность, а при данной доходности — наименьший риск.

## Диверсификация
[[dywersyfikacja|Диверсификация]] — распределение капитала по разным активам, чтобы убытки одних смягчались прибылью других. Лучше всего она работает, когда результаты активов **слабо или отрицательно коррелированы** (не движутся вместе).

- Несколько компаний из разных отраслей → снижается специфический риск.
- Акции + облигации + немного альтернативных активов → портфель меньше зависит от одного рынка.
- Систематический риск остаётся — в кризис могут упасть все акции.

> !przyklad Кафе-мороженое зарабатывает летом, а магазин зонтов — в дождливые дни. Владелец обеих фирм имеет более стабильный доход, чем владелец одной, хотя ни мороженое, ни зонты не стали менее рискованными. Так работает диверсификация в [[portfel-inwestycyjny|портфеле]].

## Теория портфеля в одном абзаце
Гарри Марковиц (1950-е годы) показал, что риск портфеля зависит не только от риска составляющих, но и от того, **насколько они движутся вместе**. Поэтому добавление даже рискованного актива может снизить риск всего портфеля, если он слабо коррелирует с остальными.

> !uwaga Стандартное отклонение, рассчитанное по истории, говорит о **прошлом**. Будущие колебания могут быть больше — кризисы случаются чаще, чем предполагают простые модели. Меры риска — помощь, а не гарантия.`,
          },
          quiz: [
            { q: { pl: "Scenariusze: 25% → −5%, 50% → 8%, 25% → 15%. Oczekiwana stopa zwrotu:", ru: "Сценарии: 25% → −5%, 50% → 8%, 25% → 15%. Ожидаемая доходность:" },
              a: [{ pl: "6%", ru: "6%" }, { pl: "8%", ru: "8%" }, { pl: "6,5%", ru: "6,5%" }, { pl: "18%", ru: "18%" }],
              correct: 2, why: { pl: "−1,25 + 4 + 3,75 = 6,5%.", ru: "−1,25 + 4 + 3,75 = 6,5%." } },
            { q: { pl: "X i Y dały średnio po 10%, ale σ(X) ≈ 1,41, a σ(Y) ≈ 15,81. Co z tego wynika?", ru: "X и Y дали в среднем по 10%, но σ(X) ≈ 1,41, σ(Y) ≈ 15,81. Что из этого следует?" },
              a: [{ pl: "Y jest mniej ryzykowna", ru: "Y менее рискованна" }, { pl: "Obie są tak samo ryzykowne", ru: "Обе одинаково рискованны" }, { pl: "Y przyniesie więcej", ru: "Y принесёт больше" }, { pl: "Y jest znacznie bardziej ryzykowna", ru: "Y значительно рискованнее" }],
              correct: 3, why: { pl: "Większe odchylenie standardowe = większy rozrzut wyników.", ru: "Большее стандартное отклонение — больший разброс результатов." } },
            { q: { pl: "Dywersyfikacja działa najlepiej, gdy aktywa są:", ru: "Диверсификация работает лучше всего, когда активы:" },
              a: [{ pl: "słabo lub ujemnie skorelowane", ru: "слабо или отрицательно коррелированы" }, { pl: "silnie dodatnio skorelowane", ru: "сильно положительно коррелированы" }, { pl: "z tej samej branży", ru: "из одной отрасли" }, { pl: "jednakowo drogie", ru: "одинаково дорогие" }],
              correct: 0, why: { pl: "Wtedy straty jednych są częściej łagodzone zyskami innych.", ru: "Тогда убытки одних чаще смягчаются прибылью других." } },
            { q: { pl: "Awersja do ryzyka oznacza, że inwestor przy tym samym oczekiwanym zwrocie:", ru: "Неприятие риска означает, что инвестор при одинаковой ожидаемой доходности:" },
              a: [{ pl: "wybierze bardziej ryzykowną inwestycję", ru: "выберет более рискованную инвестицию" }, { pl: "wybierze mniej ryzykowną inwestycję", ru: "выберет менее рискованную инвестицию" }, { pl: "nie zainwestuje w ogóle", ru: "вообще не будет инвестировать" }, { pl: "wybierze losowo", ru: "выберет случайно" }],
              correct: 1, why: { pl: "Dlatego ryzykowne aktywa muszą oferować premię za ryzyko.", ru: "Поэтому рискованные активы должны предлагать премию за риск." } },
            { q: { pl: "Współczynnik zmienności CV = σ / E(R) służy do:", ru: "Коэффициент вариации CV = σ / E(R) служит для:" },
              a: [{ pl: "obliczenia NPV", ru: "расчёта NPV" }, { pl: "obliczenia dywidendy", ru: "расчёта дивиденда" }, { pl: "porównania ryzyka na jednostkę zwrotu", ru: "сравнения риска на единицу доходности" }, { pl: "obliczenia inflacji", ru: "расчёта инфляции" }],
              correct: 2, why: { pl: "Przydaje się, gdy inwestycje mają różne oczekiwane zwroty.", ru: "Полезен, когда у инвестиций разная ожидаемая доходность." } },
          ],
        },
        // ------------------------------------------------------------------ 5.3
        {
          id: "5.3",
          title: { pl: "Jak uzasadnić decyzję inwestycyjną", ru: "Как обосновать инвестиционное решение" },
          src: "Karta przedmiotu (efekty PI_U3, PI_K02, PI_K03) + prezentacja „Podstawy inwestycji 01” (workbook, raport) + literatura: Mayo, Inwestycje",
          body: {
            pl: `Ostatni moduł łączy wszystko, czego się nauczyliśmy: liczby (opłacalność), ryzyko i własne cele. Celem nie jest znalezienie „idealnej” inwestycji, tylko **dobrze uzasadniona decyzja** — taka, którą potrafisz obronić argumentami znanymi w chwili wyboru.

## Pięć pytań przed decyzją
1. **Cel i horyzont** — po co inwestuję i na jak długo? Pieniądze potrzebne za rok wymagają innych instrumentów niż oszczędności na emeryturę.
2. **Opłacalność** — jakie są przepływy, okres zwrotu, [[npv|NPV]] lub [[irr|IRR]]? Czy wynik przewyższa alternatywę?
3. **Ryzyko** — co może pójść źle, jak bardzo i jak często? Jakie jest ryzyko systematyczne, a jakie specyficzne?
4. **[[plynnosc|Płynność]] i rezerwa** — czy po zakupie zostanie mi poduszka finansowa? Czy w razie potrzeby szybko sprzedam?
5. **Jakość informacji** — skąd mam dane i czy są wiarygodne?

## Analiza wrażliwości i scenariusze
[[analiza-wrazliwosci|Analiza wrażliwości]] sprawdza, jak wynik reaguje na zmianę jednego założenia. Analiza scenariuszowa zmienia kilka założeń naraz (scenariusz pesymistyczny, bazowy, optymistyczny).

> !przyklad Wróćmy do okazji A z Eurocash. Bazowo: 300 zł/mies., zwrot wkładu po 50 miesiącach, relacja do wkładu 24%. Przy spadku przepływu o 30%: 210 zł/mies., zwrot po ok. 71,4 miesiąca, relacja 16,8%. Przy sprzedaży za 54 000 zł zamiast 66 000 zł wynik zmienia się z +33,33% na −46,67% wkładu. Uzasadnienie decyzji powinno odpowiedzieć: **czy akceptuję także wariant pesymistyczny?**

| Scenariusz | Przepływ A | Zwrot wkładu | Przepływ / wkład |
|---|---|---|---|
| Bazowy | 300 zł/mies. | 50 mies. | 24% |
| Niekorzystny (−30%) | 210 zł/mies. | ≈ 71,4 mies. | 16,8% |

**Próg rentowności** (break-even) to wartość założenia, przy której wynik spada do zera — np. stopa dyskontowa równa IRR. Im dalej bazowe założenia od progu, tym bezpieczniejsza inwestycja.

## Ocena wiarygodności informacji
Karta przedmiotu wymaga oceny informacji pod kątem **wiarygodności i przydatności**. Pomocne pytania:
- Kto jest autorem i czy ma interes w tym, żebym kupił? (sprzedawca, „influencer”, prospekt emisyjny)
- Czy dane są aktualne i sprawdzalne w niezależnym źródle (sprawozdania finansowe, [[knf|KNF]], GPW)?
- Czy prognozy są realistyczne w porównaniu z historią i branżą?
- Czy pokazano też ryzyka, czy tylko korzyści?

> !uwaga Sygnały ostrzegawcze: obietnica wysokiego zysku „bez ryzyka”, presja czasu („tylko dziś”), brak informacji o podmiocie, zysk wypłacany z wpłat nowych uczestników. KNF prowadzi publiczną listę ostrzeżeń — warto ją sprawdzić przed powierzeniem komuś pieniędzy.

## Pułapki myślenia
- **Ocenianie decyzji po wyniku** — wygrana nie dowodzi dobrej decyzji (pamiętasz Eurocash i rolę przypadku?).
- **Nadmierna pewność siebie** — przecenianie własnej wiedzy i niedocenianie ryzyka.
- **Podążanie za tłumem** — kupowanie, bo „wszyscy kupują”.
- **Niechęć do realizacji straty** — trzymanie słabej inwestycji, „żeby się odbiła”.
- **Zakotwiczenie** — przywiązanie do jednej liczby, np. ceny zakupu.

> !zapamietaj Dobra decyzja inwestycyjna = **cel + liczby + ryzyko + rezerwa + wiarygodne źródła**. Oceniamy ją według tego, co było wiadomo w chwili wyboru, a nie według późniejszego wyniku.

## Jak napisać raport z Eurocash
Raport (10 pkt, 2–3 strony plus dokumentacja) to indywidualna analiza dwóch rozgrywek. Sprawdzona struktura:
1. **Plan i stan początkowy** — cel, rezerwa, kryteria zakupu.
2. **Trzy kluczowe decyzje** — co wybrałem lub odrzuciłem i dlaczego.
3. **Analiza jednej inwestycji** — roczny przepływ, relacja do wkładu, czas odzyskania wkładu, wariant niekorzystny.
4. **Rola przypadku** — jak losowanie wpłynęło na wynik.
5. **Porównanie rozgrywek i wnioski** — co zmieniłem w drugiej grze i z jakim skutkiem.

Ocenie podlega jakość analizy i argumentów, a nie wynik gry. Wnioski formułuj w pierwszej osobie i opieraj na liczbach — to właśnie „uzasadnianie własnych poglądów”, o którym mówi karta przedmiotu.`,
            ru: `Последний модуль объединяет всё изученное: цифры (окупаемость), риск и собственные цели. Цель — не найти «идеальную» инвестицию, а принять **хорошо обоснованное решение**, которое можно защитить аргументами, известными в момент выбора.

## Пять вопросов перед решением
1. **Цель и горизонт** — зачем я инвестирую и на какой срок? Деньги, нужные через год, требуют иных инструментов, чем сбережения на пенсию.
2. **Окупаемость** — каковы потоки, срок окупаемости, [[npv|NPV]] или [[irr|IRR]]? Превосходит ли результат альтернативу?
3. **Риск** — что может пойти не так, насколько сильно и как часто? Каков систематический и каков специфический риск?
4. **[[plynnosc|Ликвидность]] и резерв** — останется ли после покупки финансовая подушка? Смогу ли быстро продать при необходимости?
5. **Качество информации** — откуда у меня данные и достоверны ли они?

## Анализ чувствительности и сценарии
[[analiza-wrazliwosci|Анализ чувствительности]] проверяет, как результат реагирует на изменение одного допущения. Сценарный анализ меняет несколько допущений сразу (пессимистичный, базовый, оптимистичный сценарий).

> !przyklad Вернёмся к возможности A из Eurocash. Базово: 300 зл/мес., возврат вклада через 50 месяцев, отношение к вкладу 24%. При падении потока на 30%: 210 зл/мес., возврат примерно через 71,4 месяца, отношение 16,8%. При продаже за 54 000 зл вместо 66 000 зл результат меняется с +33,33% на −46,67% вклада. Обоснование решения должно ответить: **принимаю ли я и пессимистичный вариант?**

| Сценарий | Поток A | Возврат вклада | Поток / вклад |
|---|---|---|---|
| Базовый | 300 зл/мес. | 50 мес. | 24% |
| Неблагоприятный (−30%) | 210 зл/мес. | ≈ 71,4 мес. | 16,8% |

**Точка безубыточности** (break-even) — значение допущения, при котором результат падает до нуля, например ставка дисконтирования, равная IRR. Чем дальше базовые допущения от этого порога, тем безопаснее инвестиция.

## Оценка достоверности информации
Карта предмета требует оценивать информацию с точки зрения **достоверности и полезности**. Полезные вопросы:
- Кто автор и заинтересован ли он в том, чтобы я купил? (продавец, «инфлюенсер», эмиссионный проспект)
- Актуальны ли данные и проверяемы ли в независимом источнике (финансовая отчётность, [[knf|KNF]], GPW)?
- Реалистичны ли прогнозы в сравнении с историей и отраслью?
- Показаны ли риски или только выгоды?

> !uwaga Тревожные сигналы: обещание высокой прибыли «без риска», давление времени («только сегодня»), отсутствие информации о компании, выплата прибыли из взносов новых участников. KNF ведёт публичный список предупреждений — его стоит проверить, прежде чем доверить кому-то деньги.

## Ловушки мышления
- **Оценка решения по результату** — победа не доказывает хорошего решения (помните Eurocash и роль случая?).
- **Чрезмерная самоуверенность** — переоценка своих знаний и недооценка риска.
- **Следование за толпой** — покупка, потому что «все покупают».
- **Нежелание фиксировать убыток** — удержание слабой инвестиции, «пока не отыграется».
- **Эффект якоря** — привязка к одному числу, например цене покупки.

> !zapamietaj Хорошее инвестиционное решение = **цель + цифры + риск + резерв + достоверные источники**. Его оценивают по тому, что было известно в момент выбора, а не по последующему результату.

## Как написать отчёт по Eurocash
Отчёт (10 баллов, 2–3 страницы плюс документация) — индивидуальный анализ двух партий. Проверенная структура:
1. **План и начальное состояние** — цель, резерв, критерии покупки.
2. **Три ключевых решения** — что я выбрал или отклонил и почему.
3. **Анализ одной инвестиции** — годовой поток, отношение к вкладу, срок возврата вклада, неблагоприятный вариант.
4. **Роль случая** — как жребий повлиял на результат.
5. **Сравнение партий и выводы** — что я изменил во второй игре и с каким эффектом.

Оценивается качество анализа и аргументов, а не результат игры. Формулируйте выводы от первого лица и опирайтесь на цифры — это и есть «обоснование собственных взглядов», о котором говорит карта предмета.`,
          },
          quiz: [
            { q: { pl: "Analiza wrażliwości polega na:", ru: "Анализ чувствительности состоит в:" },
              a: [{ pl: "sprawdzeniu reakcji wyniku na zmianę jednego założenia", ru: "проверке реакции результата на изменение одного допущения" }, { pl: "wyborze najdroższej inwestycji", ru: "выборе самой дорогой инвестиции" }, { pl: "obliczeniu dywidendy", ru: "расчёте дивиденда" }, { pl: "zignorowaniu scenariusza pesymistycznego", ru: "игнорировании пессимистичного сценария" }],
              correct: 0, why: { pl: "Np. jak zmieni się zwrot wkładu, gdy przepływ spadnie o 30%.", ru: "Например, как изменится возврат вклада при падении потока на 30%." } },
            { q: { pl: "Który sygnał powinien wzbudzić podejrzenia wobec oferty inwestycyjnej?", ru: "Какой сигнал должен насторожить в инвестиционном предложении?" },
              a: [{ pl: "Opis ryzyk w prospekcie", ru: "Описание рисков в проспекте" }, { pl: "Nadzór KNF", ru: "Надзор KNF" }, { pl: "Obietnica wysokiego zysku bez ryzyka i presja czasu", ru: "Обещание высокой прибыли без риска и давление времени" }, { pl: "Publikowane sprawozdania finansowe", ru: "Публикуемая финансовая отчётность" }],
              correct: 2, why: { pl: "Zysk i ryzyko idą w parze; presja czasu utrudnia analizę.", ru: "Доходность и риск идут рядом; давление времени мешает анализу." } },
            { q: { pl: "Ocenianie decyzji wyłącznie po jej wyniku to błąd, ponieważ:", ru: "Оценивать решение только по результату — ошибка, потому что:" },
              a: [{ pl: "wynik zawsze jest losowy", ru: "результат всегда случаен" }, { pl: "na wynik wpływa także przypadek", ru: "на результат влияет и случай" }, { pl: "wynik nie ma znaczenia", ru: "результат не важен" }, { pl: "tak każe regulamin", ru: "так требуют правила" }],
              correct: 1, why: { pl: "Decyzję oceniamy według argumentów dostępnych w chwili wyboru.", ru: "Решение оценивают по аргументам, доступным в момент выбора." } },
            { q: { pl: "Trzymanie słabej inwestycji, „żeby się odbiła”, to przykład:", ru: "Удержание слабой инвестиции, «пока не отыграется», — пример:" },
              a: [{ pl: "dywersyfikacji", ru: "диверсификации" }, { pl: "analizy wrażliwości", ru: "анализа чувствительности" }, { pl: "awersji do ryzyka", ru: "неприятия риска" }, { pl: "niechęci do realizacji straty", ru: "нежелания фиксировать убыток" }],
              correct: 3, why: { pl: "To częsta pułapka behawioralna; cena zakupu nie powinna decydować o przyszłości.", ru: "Это частая поведенческая ловушка; цена покупки не должна определять будущее." } },
            { q: { pl: "Co NIE jest elementem zalecanej struktury raportu z Eurocash?", ru: "Что НЕ входит в рекомендуемую структуру отчёта по Eurocash?" },
              a: [{ pl: "Trzy kluczowe decyzje", ru: "Три ключевых решения" }, { pl: "Analiza jednej inwestycji z wariantem niekorzystnym", ru: "Анализ одной инвестиции с неблагоприятным вариантом" }, { pl: "Ranking graczy według wygranej", ru: "Рейтинг игроков по выигрышу" }, { pl: "Rola przypadku", ru: "Роль случая" }],
              correct: 2, why: { pl: "Wynik gry nie podlega ocenie — liczy się analiza.", ru: "Результат игры не оценивается — важен анализ." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Ryzyko specyficzne to ryzyko:", ru: "Специфический риск — это риск:" },
          a: [{ pl: "całego rynku", ru: "всего рынка" }, { pl: "inflacji", ru: "инфляции" }, { pl: "konkretnej spółki lub projektu", ru: "конкретной компании или проекта" }, { pl: "zmiany stóp procentowych", ru: "изменения процентных ставок" }],
          correct: 2, why: { pl: "Dotyczy jednego podmiotu i można je ograniczyć dywersyfikacją.", ru: "Касается одного субъекта, его можно ограничить диверсификацией." } },
        { q: { pl: "Wzrost stóp procentowych przez bank centralny to źródło ryzyka:", ru: "Повышение процентных ставок центробанком — источник риска:" },
          a: [{ pl: "systematycznego", ru: "систематического" }, { pl: "specyficznego", ru: "специфического" }, { pl: "operacyjnego jednej firmy", ru: "операционного одной фирмы" }, { pl: "żadnego", ru: "никакого" }],
          correct: 0, why: { pl: "Dotyka całego rynku, więc dywersyfikacja go nie usunie.", ru: "Затрагивает весь рынок, поэтому диверсификация его не устранит." } },
        { q: { pl: "Odchylenie standardowe mierzy:", ru: "Стандартное отклонение измеряет:" },
          a: [{ pl: "średni zysk", ru: "среднюю прибыль" }, { pl: "rozrzut wyników wokół średniej", ru: "разброс результатов вокруг среднего" }, { pl: "wartość bieżącą", ru: "текущую стоимость" }, { pl: "okres zwrotu", ru: "срок окупаемости" }],
          correct: 1, why: { pl: "Im większe σ, tym większe ryzyko.", ru: "Чем больше σ, тем выше риск." } },
        { q: { pl: "Wariancja w przykładzie ze scenariuszami wynosi 52,25. Odchylenie standardowe to ok.:", ru: "Дисперсия в примере со сценариями 52,25. Стандартное отклонение около:" },
          a: [{ pl: "26,1", ru: "26,1" }, { pl: "52,25", ru: "52,25" }, { pl: "6,5", ru: "6,5" }, { pl: "7,23", ru: "7,23" }],
          correct: 3, why: { pl: "σ = √52,25 ≈ 7,23 p.p.", ru: "σ = √52,25 ≈ 7,23 п.п." } },
        { q: { pl: "Wymagana stopa zwrotu = stopa wolna od ryzyka + …", ru: "Требуемая доходность = безрисковая ставка + …" },
          a: [{ pl: "inflacja bazowa", ru: "базовая инфляция" }, { pl: "premia za ryzyko", ru: "премия за риск" }, { pl: "dywidenda", ru: "дивиденд" }, { pl: "prowizja", ru: "комиссия" }],
          correct: 1, why: { pl: "Za większe ryzyko inwestorzy żądają wyższej premii.", ru: "За больший риск инвесторы требуют большей премии." } },
        { q: { pl: "Dywersyfikacja ogranicza przede wszystkim:", ru: "Диверсификация ограничивает прежде всего:" },
          a: [{ pl: "ryzyko specyficzne", ru: "специфический риск" }, { pl: "ryzyko systematyczne", ru: "систематический риск" }, { pl: "inflację", ru: "инфляцию" }, { pl: "podatki", ru: "налоги" }],
          correct: 0, why: { pl: "Straty jednej spółki łagodzą wyniki innych; ryzyko rynku zostaje.", ru: "Убытки одной компании смягчаются результатами других; рыночный риск остаётся." } },
        { q: { pl: "Kto pokazał, że ryzyko portfela zależy od współzależności składników?", ru: "Кто показал, что риск портфеля зависит от взаимосвязи составляющих?" },
          a: [{ pl: "J.M. Keynes", ru: "Дж. М. Кейнс" }, { pl: "A. Smith", ru: "А. Смит" }, { pl: "H. Markowitz", ru: "Г. Марковиц" }, { pl: "A. Okun", ru: "А. Оукен" }],
          correct: 2, why: { pl: "Teoria portfela Markowitza z lat 50. XX w.", ru: "Теория портфеля Марковица 1950-х годов." } },
        { q: { pl: "Zysk nominalny 5% przy inflacji 6% to przejaw ryzyka:", ru: "Номинальная прибыль 5% при инфляции 6% — проявление риска:" },
          a: [{ pl: "płynności", ru: "ликвидности" }, { pl: "walutowego", ru: "валютного" }, { pl: "kredytowego", ru: "кредитного" }, { pl: "inflacji", ru: "инфляционного" }],
          correct: 3, why: { pl: "Realnie inwestor traci ok. 1% siły nabywczej.", ru: "Реально инвестор теряет около 1% покупательной способности." } },
        { q: { pl: "Przy spadku przepływu A o 30% relacja przepływu do wkładu wynosi:", ru: "При падении потока A на 30% отношение потока к вкладу составляет:" },
          a: [{ pl: "16,8%", ru: "16,8%" }, { pl: "24%", ru: "24%" }, { pl: "21%", ru: "21%" }, { pl: "30%", ru: "30%" }],
          correct: 0, why: { pl: "2 520 / 15 000 = 16,8%.", ru: "2 520 / 15 000 = 16,8%." } },
        { q: { pl: "Która postawa najlepiej opisuje racjonalnego inwestora?", ru: "Какая позиция лучше всего описывает рационального инвестора?" },
          a: [{ pl: "Najwyższy zysk bez względu na ryzyko", ru: "Наибольшая прибыль независимо от риска" }, { pl: "Najwyższy oczekiwany zwrot przy danym ryzyku", ru: "Наибольшая ожидаемая доходность при данном риске" }, { pl: "Kupowanie tego, co kupują inni", ru: "Покупка того, что покупают другие" }, { pl: "Unikanie jakiejkolwiek inwestycji", ru: "Избегание любых инвестиций" }],
          correct: 1, why: { pl: "Albo najniższe ryzyko przy danym zwrocie — to kompromis zysk–ryzyko.", ru: "Или наименьший риск при данной доходности — это компромисс доходность–риск." } },
        { q: { pl: "Gdzie warto sprawdzić podmiot oferujący inwestycję w Polsce?", ru: "Где стоит проверить компанию, предлагающую инвестицию в Польше?" },
          a: [{ pl: "W mediach społecznościowych", ru: "В социальных сетях" }, { pl: "W reklamie oferty", ru: "В рекламе предложения" }, { pl: "Na liście ostrzeżeń KNF", ru: "В списке предупреждений KNF" }, { pl: "Nigdzie, wystarczy zaufanie", ru: "Нигде, достаточно доверия" }],
          correct: 2, why: { pl: "KNF publikuje listę ostrzeżeń publicznych o podmiotach budzących wątpliwości.", ru: "KNF публикует список публичных предупреждений о сомнительных субъектах." } },
        { q: { pl: "Dobra decyzja inwestycyjna opiera się na:", ru: "Хорошее инвестиционное решение опирается на:" },
          a: [{ pl: "intuicji i szczęściu", ru: "интуицию и удачу" }, { pl: "rankingach z zeszłego roku", ru: "рейтинги прошлого года" }, { pl: "radach znajomych", ru: "советы знакомых" }, { pl: "celu, liczbach, ryzyku, rezerwie i wiarygodnych źródłach", ru: "цель, цифры, риск, резерв и достоверные источники" }],
          correct: 3, why: { pl: "To podsumowanie całego modułu „Ryzyko i uzasadnienie decyzji”.", ru: "Это итог всего модуля «Риск и обоснование решения»." } },
      ],
    },
  ],
});
