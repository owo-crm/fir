// Podatki — wykłady → podtematy. Format jak w content.js.
(window.SUBJECTS = window.SUBJECTS || []).push({
  id: "podatki",
  name: { pl: "Podatki", ru: "Налоги" },
  short: { pl: "Podatki", ru: "Налоги" },
  icon: "coins",
  lecturer: "dr Magdalena Łyszkiewicz",
  examDate: "2027-01-30",
  program: [],
  lectures: [
    {
      n: 1,
      color: "--c1",
      title: { pl: "Podstawy podatków i system podatkowy", ru: "Основы налогов и налоговая система" },
      lead: {
        pl: "Czym jest podatek według Ordynacji podatkowej, z jakich elementów się składa, jakie pełni funkcje, jak dzielimy podatki i skąd bierze się prawo podatkowe.",
        ru: "Что такое налог по Налоговому кодексу Польши (Ordynacja podatkowa), из каких элементов он состоит, какие функции выполняет, как классифицируются налоги и откуда берётся налоговое право.",
      },
      subs: [
        // ------------------------------------------------------------------ 1.1
        {
          id: "1.1",
          title: { pl: "Pojęcie podatku i inne daniny publiczne", ru: "Понятие налога и другие публичные платежи" },
          src: "Podstawy systemów podatkowych – wykład 1 (2026): pojęcie podatku, podatek a inne daniny; art. 6 Ordynacji podatkowej",
          body: {
            pl: `Benjamin Franklin napisał kiedyś, że na tym świecie pewne są tylko śmierć i [[podatek|podatki]]. Zanim zaczniemy liczyć PIT czy VAT, trzeba dokładnie wiedzieć, co prawnik nazywa podatkiem, a czego już nie.

## Definicja ustawowa
Najważniejszą definicję zawiera **art. 6 [[ordynacja-podatkowa|Ordynacji podatkowej]]** (ustawa z 29 sierpnia 1997 r.). Podatek to:

> !zapamietaj „Publicznoprawne, nieodpłatne, przymusowe oraz bezzwrotne świadczenie pieniężne na rzecz Skarbu Państwa, województwa, powiatu lub gminy, wynikające z ustawy podatkowej” (art. 6 Op).

Każde słowo tej definicji ma znaczenie. Rozłóżmy ją na części:

| Cecha | Co oznacza w praktyce |
|---|---|
| **Publicznoprawny** | Wierzycielem jest zawsze władza publiczna: Skarb Państwa albo jednostka samorządu terytorialnego (JST). Podatek nie wynika z umowy. |
| **Nieodpłatny** | Płacąc, nie dostajesz konkretnej usługi w zamian. Państwo finansuje z podatków dobra ogólne: drogi, szkoły, policję. |
| **Przymusowy** | Nie można się „wypisać”. Państwo ma aparat egzekucji, którym ściąga zaległości. |
| **Bezzwrotny** | Prawidłowo zapłacony podatek nie wraca. Wyjątkiem jest **nadpłata**, czyli kwota zapłacona przez pomyłkę za wysoko. |
| **Pieniężny** | Płacimy w pieniądzu, a nie w naturze (np. zbożem). |
| **Wynika z ustawy** | Podatek można nałożyć tylko ustawą, nie rozporządzeniem ani uchwałą urzędnika. |

Ważne jest też to, że podatek jest zobowiązaniem **ex lege**, czyli powstaje z mocy samego prawa. Nikt nie podpisuje z urzędem skarbowym umowy o płacenie PIT. Wystarczy, że zdarzy się sytuacja opisana w ustawie, np. osiągniesz dochód.

## Podatek a inne daniny publiczne
Nie każda wpłata na rzecz państwa jest podatkiem. Szersze pojęcie to [[danina-publiczna|danina publiczna]]. Obejmuje ono podatki, ale też inne świadczenia, które różnią się od podatku głównie **odpłatnością** albo **celowością**.

| Danina | Czym różni się od podatku | Przykład |
|---|---|---|
| [[oplata-publiczna|Opłata]] | Jest odpłatna: w zamian dostajesz konkretne świadczenie od urzędu. Jej wysokość powinna odpowiadać kosztom usługi. | opłata skarbowa, opłata za paszport |
| [[clo|Cło]] | Pobierane na granicy celnej przy handlu z zagranicą. Pełni funkcję ochronną (cła protekcyjne) albo fiskalną. W UE polityka celna należy do wyłącznych kompetencji Unii. | cło przy imporcie towarów spoza UE |
| Składka ubezpieczeniowa | Jest celowa i wzajemna: daje prawo do świadczeń z systemu ubezpieczeń. | składki do ZUS, składka zdrowotna (NFZ) |
| Dopłata specjalna | Jest celowa: idzie na określone zadanie publiczne. | opłata cukrowa od napojów słodzonych |

> !przyklad Za wydanie paszportu płacisz opłatę i dostajesz paszport, więc jest świadczenie wzajemne. Podatek dochodowy płacisz, ale nie dostajesz „w zamian” nic konkretnego, tylko ogólne usługi państwa. Dlatego PIT jest podatkiem, a opłata paszportowa nie.

## Dlaczego to rozróżnienie ma znaczenie
Od tego, czy coś jest podatkiem, zależy, jakie przepisy stosujemy. Do podatków stosuje się Ordynację podatkową: jej zasady postępowania, terminy, przedawnienie i środki odwoławcze. Do innych danin mogą mieć zastosowanie inne ustawy. Trybunał Konstytucyjny wielokrotnie badał np. charakter prawny składek, bo od tego zależało, jakie gwarancje przysługują płacącym.

> !uwaga Nazwa nie przesądza o charakterze daniny. Jeżeli „opłata” nie daje płacącemu żadnego świadczenia wzajemnego, a jest przymusowa i bezzwrotna, w istocie może być podatkiem. Liczą się cechy, a nie etykieta.

## Gdzie trafiają pieniądze
Podatki są głównym źródłem dochodów publicznych. Według materiałów wykładu dochody podatkowe stanowią około 85–90% dochodów budżetu państwa. Samorządy dostają udziały w PIT i CIT oraz pobierają własne podatki lokalne. Bez stabilnych wpływów podatkowych państwo nie mogłoby finansować edukacji, ochrony zdrowia, bezpieczeństwa ani inwestycji.`,
            ru: `Бенджамин Франклин однажды написал, что в этом мире неизбежны только смерть и [[podatek|налоги]]. Прежде чем считать PIT или VAT, нужно точно знать, что юрист называет налогом, а что уже нет.

## Законодательное определение
Главное определение содержится в **ст. 6 [[ordynacja-podatkowa|Налогового кодекса]]** (Ordynacja podatkowa, закон от 29 августа 1997 г.). Налог — это:

> !zapamietaj «Публично-правовой, безвозмездный, принудительный и безвозвратный денежный платёж в пользу Государственной казны (Skarb Państwa), воеводства, повята или гмины, вытекающий из налогового закона» (ст. 6 Op).

Каждое слово этого определения важно. Разберём его по частям:

| Признак | Что это значит на практике |
|---|---|
| **Публично-правовой** | Кредитором всегда является публичная власть: Государственная казна или единица территориального самоуправления (JST). Налог не вытекает из договора. |
| **Безвозмездный** | Платя налог, вы не получаете взамен конкретной услуги. Государство финансирует из налогов общие блага: дороги, школы, полицию. |
| **Принудительный** | От налога нельзя «отписаться». У государства есть аппарат принудительного взыскания задолженности. |
| **Безвозвратный** | Правильно уплаченный налог не возвращается. Исключение — **переплата** (nadpłata), то есть сумма, по ошибке уплаченная в завышенном размере. |
| **Денежный** | Платят деньгами, а не в натуральной форме (например, зерном). |
| **Вытекает из закона** | Налог можно установить только законом, а не распоряжением или решением чиновника. |

Важно и то, что налог — обязательство **ex lege**, то есть возникает в силу самого закона. Никто не подписывает с налоговой инспекцией договор об уплате PIT. Достаточно, чтобы произошла ситуация, описанная в законе, например вы получили доход.

## Налог и другие публичные платежи
Не каждый платёж государству — налог. Более широкое понятие — [[danina-publiczna|публичный платёж]] (danina publiczna). Оно охватывает налоги, но также и другие платежи, которые отличаются от налога прежде всего **возмездностью** или **целевым характером**.

| Платёж | Чем отличается от налога | Пример |
|---|---|---|
| [[oplata-publiczna|Сбор]] (opłata) | Возмездный: взамен вы получаете конкретное действие ведомства. Его размер должен соответствовать стоимости услуги. | гербовый сбор (opłata skarbowa), сбор за паспорт |
| [[clo|Пошлина]] (cło) | Взимается на таможенной границе при торговле с заграницей. Выполняет защитную (протекционистские пошлины) или фискальную функцию. В ЕС таможенная политика — исключительная компетенция Союза. | пошлина при импорте товаров из-за пределов ЕС |
| Страховой взнос | Целевой и взаимный: даёт право на выплаты из системы страхования. | взносы в ZUS, медицинский взнос (NFZ) |
| Специальный сбор | Целевой: идёт на определённую публичную задачу. | «сахарный сбор» с подслащённых напитков |

> !przyklad За оформление паспорта вы платите сбор и получаете паспорт — есть встречное предоставление. Подоходный налог вы платите, но ничего конкретного «взамен» не получаете, только общие услуги государства. Поэтому PIT — налог, а паспортный сбор — нет.

## Почему это различие важно
От того, является ли платёж налогом, зависит, какие нормы применяются. К налогам применяется Ordynacja podatkowa: её правила процедуры, сроки, давность и средства обжалования. К другим платежам могут применяться другие законы. Конституционный трибунал неоднократно исследовал, например, правовую природу взносов, потому что от этого зависели гарантии для плательщиков.

> !uwaga Название не определяет природу платежа. Если «сбор» не даёт плательщику никакого встречного предоставления, а при этом принудителен и безвозвратен, по сути он может быть налогом. Важны признаки, а не ярлык.

## Куда идут деньги
Налоги — главный источник публичных доходов. По материалам лекции налоговые доходы составляют около 85–90% доходов государственного бюджета. Органы самоуправления получают доли в PIT и CIT и собирают собственные местные налоги. Без стабильных налоговых поступлений государство не смогло бы финансировать образование, здравоохранение, безопасность и инвестиции.`,
          },
          quiz: [
            { q: { pl: "Który akt prawny zawiera ustawową definicję podatku?", ru: "Какой нормативный акт содержит законодательное определение налога?" },
              a: [{ pl: "Konstytucja RP, art. 217", ru: "Конституция РП, ст. 217" }, { pl: "Ordynacja podatkowa, art. 6", ru: "Ordynacja podatkowa, ст. 6" }, { pl: "Ustawa o PIT, art. 1", ru: "Закон о PIT, ст. 1" }, { pl: "Ustawa o VAT, art. 5", ru: "Закон о VAT, ст. 5" }],
              correct: 1, why: { pl: "Definicję podatku zawiera art. 6 Ordynacji podatkowej z 29 sierpnia 1997 r. Konstytucja (art. 217) mówi tylko, że podatki nakłada się w drodze ustawy.", ru: "Определение налога содержит ст. 6 Ordynacji podatkowej от 29 августа 1997 г. Конституция (ст. 217) говорит лишь о том, что налоги устанавливаются законом." } },
            { q: { pl: "Cecha „nieodpłatności” podatku oznacza, że:", ru: "Признак «безвозмездности» налога означает, что:" },
              a: [{ pl: "podatek można zapłacić w naturze", ru: "налог можно уплатить в натуральной форме" }, { pl: "podatek zawsze wraca do podatnika", ru: "налог всегда возвращается налогоплательщику" }, { pl: "podatnik nie dostaje w zamian konkretnego świadczenia od państwa", ru: "налогоплательщик не получает взамен конкретного предоставления от государства" }, { pl: "podatek nie jest obowiązkowy", ru: "налог не обязателен" }],
              correct: 2, why: { pl: "Nieodpłatność to brak bezpośredniego, ekwiwalentnego świadczenia wzajemnego. Świadczenia państwa mają charakter ogólny.", ru: "Безвозмездность — отсутствие прямого эквивалентного встречного предоставления. Услуги государства носят общий характер." } },
            { q: { pl: "Czym opłata różni się od podatku?", ru: "Чем сбор (opłata) отличается от налога?" },
              a: [{ pl: "Opłata jest odpłatna: w zamian płacący dostaje konkretne świadczenie", ru: "Сбор возмездный: взамен плательщик получает конкретное предоставление" }, { pl: "Opłata nie wynika z ustawy", ru: "Сбор не вытекает из закона" }, { pl: "Opłatę płaci się tylko w euro", ru: "Сбор платят только в евро" }, { pl: "Niczym, to synonimy", ru: "Ничем, это синонимы" }],
              correct: 0, why: { pl: "Opłata, np. skarbowa czy paszportowa, jest ekwiwalentna: jej wysokość powinna odpowiadać kosztom usługi urzędu.", ru: "Сбор, например гербовый или паспортный, эквивалентен: его размер должен соответствовать стоимости услуги ведомства." } },
            { q: { pl: "Wyjątkiem od zasady bezzwrotności podatku jest:", ru: "Исключение из принципа безвозвратности налога — это:" },
              a: [{ pl: "ulga na dzieci", ru: "льгота на детей" }, { pl: "kwota wolna od podatku", ru: "необлагаемый минимум" }, { pl: "zwolnienie przedmiotowe", ru: "предметное освобождение" }, { pl: "nadpłata, czyli kwota zapłacona za wysoko", ru: "переплата, то есть сумма, уплаченная в завышенном размере" }],
              correct: 3, why: { pl: "Prawidłowo zapłacony podatek nie wraca. Zwraca się tylko nadpłatę, która powstała przez błąd w obliczeniu lub wpłatę wyższą niż należna.", ru: "Правильно уплаченный налог не возвращается. Возвращается только переплата, возникшая из-за ошибки в расчёте или уплаты суммы больше причитающейся." } },
            { q: { pl: "Co oznacza, że zobowiązanie podatkowe powstaje ex lege?", ru: "Что означает, что налоговое обязательство возникает ex lege?" },
              a: [{ pl: "Powstaje dopiero po podpisaniu umowy z urzędem", ru: "Возникает только после подписания договора с ведомством" }, { pl: "Powstaje z mocy samego prawa, gdy zajdzie zdarzenie opisane w ustawie", ru: "Возникает в силу самого закона, когда наступает событие, описанное в законе" }, { pl: "Powstaje tylko na wniosek podatnika", ru: "Возникает только по заявлению налогоплательщика" }, { pl: "Powstaje wyłącznie w drodze uchwały rady gminy", ru: "Возникает исключительно на основании решения совета гмины" }],
              correct: 1, why: { pl: "Do powstania obowiązku nie potrzeba umowy. Wystarczy zdarzenie, z którym ustawa wiąże podatek, np. osiągnięcie dochodu.", ru: "Для возникновения обязанности не нужен договор. Достаточно события, с которым закон связывает налог, например получения дохода." } },
          ],
        },
        // ------------------------------------------------------------------ 1.2
        {
          id: "1.2",
          title: { pl: "Elementy konstrukcji podatku", ru: "Элементы конструкции налога" },
          src: "Podstawy systemów podatkowych – wykład 1 (2026): elementy konstrukcji podatku, skala podatkowa, kwota wolna, zwolnienia i ulgi; art. 7–9 Op",
          body: {
            pl: `Każdy podatek, czy to PIT, VAT, czy podatek od psa, jest zbudowany z tych samych „klocków”. Jeśli brakuje któregoś z obowiązkowych elementów, podatku nie da się prawidłowo obliczyć ani pobrać.

## Elementy obligatoryjne i fakultatywne

| Obligatoryjne (muszą być) | Fakultatywne (mogą być) |
|---|---|
| podmiot podatku | [[ulga-podatkowa|ulgi]] (zniżki) |
| [[przedmiot-opodatkowania|przedmiot podatku]] | [[zwolnienie-podatkowe|zwolnienia]] |
| [[podstawa-opodatkowania|podstawa opodatkowania]] | zwyżki (podwyższenie podatku) |
| [[stawka-podatkowa|stawka podatkowa]] | |
| terminy i tryb płatności | |

## Podmiot podatku
W stosunku podatkowym są dwie strony. **Podmiot czynny** (wierzyciel) to zawsze władza publiczna: Skarb Państwa albo JST. **Podmiot bierny** (dłużnik) to przede wszystkim podatnik. Ordynacja wymienia trzy kluczowe role:

| Rola | Przepis | Co robi | Przykład |
|---|---|---|---|
| [[podatnik|Podatnik]] | art. 7 Op | podlega obowiązkowi podatkowemu i płaci z własnych środków | osoba osiągająca dochód |
| [[platnik|Płatnik]] | art. 8 Op | **oblicza**, pobiera i wpłaca podatek za podatnika | pracodawca odprowadzający zaliczki na PIT pracownika |
| [[inkasent|Inkasent]] | art. 9 Op | tylko **pobiera** i wpłaca, nie oblicza | sołtys pobierający podatek rolny |

> !zapamietaj Płatnik oblicza i pobiera, inkasent tylko pobiera. Płatnik odpowiada całym swoim majątkiem za podatek, którego nie pobrał albo nie wpłacił (art. 30 Op).

## Przedmiot, podstawa i stawka
**Przedmiot podatku** to zdarzenie lub stan, z którym ustawa wiąże obowiązek podatkowy. To najważniejszy element, bo mówi, *co* opodatkowujemy: osiąganie dochodu (PIT, CIT), obrót towarami i usługami (VAT), posiadanie majątku (podatek od nieruchomości), nabycie majątku (podatek od spadków i darowizn, PCC).

**Podstawa opodatkowania** to przedmiot wyrażony liczbą, do której stosujemy stawkę. Może być wartościowa (dochód w złotych w PIT) albo ilościowa (powierzchnia w m² w podatku od nieruchomości).

**Stawka** określa wysokość podatku w stosunku do podstawy. Bywa:
- **kwotowa**, czyli stała kwota od jednostki (np. zł za m²),
- **procentowa**: proporcjonalna (stały %), progresywna (rośnie z podstawą), degresywna,
- **mieszana**.

## Skala podatkowa
Uporządkowany zbiór stawek to skala podatkowa.
- **Proporcjonalna (liniowa):** stawka stała bez względu na podstawę. Występuje m.in. w VAT, akcyzie, PCC.
- **Progresywna:** stawka rośnie razem z podstawą. Wyróżniamy [[progresja|progresję]] **globalną** (jedna stawka dla całej podstawy, w Polsce dziś niestosowana) i **szczeblową** (podstawę dzieli się na przedziały, każdy ma swoją stawkę). Szczeblowa występuje w PIT i w podatku od spadków i darowizn.
- **Regresywna:** stawka maleje, gdy podstawa rośnie. W praktyce prawie się jej nie stosuje, bo jest uważana za niesprawiedliwą.

> !przyklad W PIT obowiązuje progresja dwustopniowa: 12% do 120 000 zł i 32% od nadwyżki. Przy dochodzie 150 000 zł stawka 32% dotyczy tylko 30 000 zł ponad próg, a nie całego dochodu. To właśnie progresja szczeblowa.

## Kwota wolna i kumulacja
[[kwota-wolna|Kwota wolna od podatku]] to część podstawy, od której nie płaci się podatku, bo uznaje się ją za minimum egzystencji. W polskim PIT wynosi **30 000 zł rocznie**. Technicznie działa jako **kwota zmniejszająca podatek**: 30 000 zł × 12% = **3 600 zł**.

$$ 50 000 zł × 12% − 3 600 zł = 2 400 zł | Podatek przy dochodzie 50 000 zł (skala, bez innych ulg)

**Kumulacja** to sumowanie podstaw: z różnych źródeł tego samego podatnika (przedmiotowa, np. praca i działalność na skali), różnych osób (podmiotowa, np. wspólne rozliczenie małżonków), różnych okresów (czasowa) lub terytoriów.

## Zwolnienia, ulgi, zwyżki
- **Zwolnienie** wyłącza z opodatkowania określone podmioty (podmiotowe) albo przedmioty (przedmiotowe), które normalnie mieściłyby się w zakresie podatku. Obowiązek podatkowy istnieje, ale nie zamienia się w zobowiązanie.
- **Wyłączenie** to coś innego: ustawodawca w ogóle nie interesuje się opodatkowaniem danej sytuacji tym podatkiem, więc obowiązek nie powstaje.
- **Ulga (zniżka)** obniża podatek lub podstawę.
- **Zwyżka** podwyższa podatek w określonych przypadkach.

## Terminy i sposób zapłaty
Termin może być **bezwzględny** (konkretna data w kalendarzu) albo **względny** (np. 14 dni od doręczenia decyzji). Podatek płaci się jednorazowo, w ratach (kwota znana, płatna w częściach) albo w **zaliczkach** (kwota roczna jeszcze nieznana, wpłacamy części w trakcie roku).`,
            ru: `Любой налог — PIT, VAT или налог на собак — собран из одних и тех же «кубиков». Если нет какого-то из обязательных элементов, налог нельзя правильно рассчитать и взыскать.

## Обязательные и факультативные элементы

| Обязательные (должны быть) | Факультативные (могут быть) |
|---|---|
| субъект налога | [[ulga-podatkowa|льготы]] (скидки) |
| [[przedmiot-opodatkowania|объект налога]] | [[zwolnienie-podatkowe|освобождения]] |
| [[podstawa-opodatkowania|налоговая база]] | надбавки (повышение налога) |
| [[stawka-podatkowa|налоговая ставка]] | |
| сроки и порядок уплаты | |

## Субъект налога
В налоговом отношении две стороны. **Активный субъект** (кредитор) — всегда публичная власть: Государственная казна или JST. **Пассивный субъект** (должник) — прежде всего налогоплательщик. Кодекс называет три ключевые роли:

| Роль | Статья | Что делает | Пример |
|---|---|---|---|
| [[podatnik|Налогоплательщик]] (podatnik) | ст. 7 Op | несёт налоговую обязанность и платит из собственных средств | лицо, получающее доход |
| [[platnik|Налоговый агент]] (płatnik) | ст. 8 Op | **рассчитывает**, удерживает и перечисляет налог за налогоплательщика | работодатель, перечисляющий авансы PIT работника |
| [[inkasent|Сборщик]] (inkasent) | ст. 9 Op | только **собирает** и перечисляет, не рассчитывает | староста деревни (sołtys), собирающий сельскохозяйственный налог |

> !zapamietaj Налоговый агент рассчитывает и удерживает, сборщик только собирает. Агент отвечает всем своим имуществом за налог, который не удержал или не перечислил (ст. 30 Op).

## Объект, база и ставка
**Объект налога** — событие или состояние, с которым закон связывает налоговую обязанность. Это важнейший элемент: он говорит, *что* облагается. Получение дохода (PIT, CIT), оборот товаров и услуг (VAT), владение имуществом (налог на недвижимость), приобретение имущества (налог на наследство и дарение, PCC).

**Налоговая база** — объект, выраженный числом, к которому применяется ставка. Бывает стоимостной (доход в злотых в PIT) или количественной (площадь в м² в налоге на недвижимость).

**Ставка** определяет размер налога относительно базы. Бывает:
- **твёрдой** (kwotowa), то есть фиксированной суммой на единицу (например, злотых за м²),
- **процентной**: пропорциональной (постоянный %), прогрессивной (растёт с базой), дегрессивной,
- **смешанной**.

## Налоговая шкала
Упорядоченный набор ставок — налоговая шкала.
- **Пропорциональная (линейная):** ставка постоянна независимо от базы. Применяется, в частности, в VAT, акцизе, PCC.
- **Прогрессивная:** ставка растёт вместе с базой. Различают [[progresja|прогрессию]] **глобальную** (одна ставка на всю базу, в Польше сейчас не применяется) и **ступенчатую** (база делится на интервалы, у каждого своя ставка). Ступенчатая применяется в PIT и в налоге на наследство и дарение.
- **Регрессивная:** ставка падает при росте базы. На практике почти не применяется, так как считается несправедливой.

> !przyklad В PIT действует двухступенчатая прогрессия: 12% до 120 000 зл и 32% с превышения. При доходе 150 000 зл ставка 32% касается только 30 000 зл сверх порога, а не всего дохода. Это и есть ступенчатая прогрессия.

## Необлагаемый минимум и кумуляция
[[kwota-wolna|Необлагаемый минимум]] (kwota wolna od podatku) — часть базы, с которой налог не платится, так как она считается прожиточным минимумом. В польском PIT он составляет **30 000 зл в год**. Технически он действует как **сумма, уменьшающая налог**: 30 000 зл × 12% = **3 600 зл**.

$$ 50 000 зл × 12% − 3 600 зл = 2 400 зл | Налог при доходе 50 000 зл (шкала, без других льгот)

**Кумуляция** — суммирование баз: из разных источников одного налогоплательщика (предметная, например работа и предпринимательство по шкале), разных лиц (субъектная, например совместная декларация супругов), разных периодов (временная) или территорий.

## Освобождения, льготы, надбавки
- **Освобождение** выводит из-под налогообложения определённых субъектов (субъектное) или объекты (предметное), которые обычно попадали бы под налог. Налоговая обязанность существует, но не превращается в обязательство.
- **Исключение** (wyłączenie) — другое: законодатель вообще не интересуется налогообложением данной ситуации этим налогом, поэтому обязанность не возникает.
- **Льгота (скидка)** уменьшает налог или базу.
- **Надбавка** повышает налог в определённых случаях.

## Сроки и способ уплаты
Срок может быть **абсолютным** (конкретная календарная дата) или **относительным** (например, 14 дней с момента вручения решения). Налог платят единовременно, в рассрочку (сумма известна, платится частями) или **авансами** (годовая сумма ещё неизвестна, в течение года вносятся части).`,
          },
          quiz: [
            { q: { pl: "Który element konstrukcji podatku jest fakultatywny?", ru: "Какой элемент конструкции налога факультативен?" },
              a: [{ pl: "Podstawa opodatkowania", ru: "Налоговая база" }, { pl: "Stawka podatkowa", ru: "Налоговая ставка" }, { pl: "Ulga podatkowa", ru: "Налоговая льгота" }, { pl: "Przedmiot podatku", ru: "Объект налога" }],
              correct: 2, why: { pl: "Ulgi, zwolnienia i zwyżki mogą, ale nie muszą wystąpić. Bez podmiotu, przedmiotu, podstawy i stawki podatku nie da się obliczyć.", ru: "Льготы, освобождения и надбавки могут быть, а могут и не быть. Без субъекта, объекта, базы и ставки налог не рассчитать." } },
            { q: { pl: "Pracodawca, który oblicza, pobiera i wpłaca zaliczki na PIT pracownika, to:", ru: "Работодатель, который рассчитывает, удерживает и перечисляет авансы PIT работника, — это:" },
              a: [{ pl: "inkasent", ru: "сборщик (inkasent)" }, { pl: "płatnik", ru: "налоговый агент (płatnik)" }, { pl: "podatnik", ru: "налогоплательщик" }, { pl: "organ podatkowy", ru: "налоговый орган" }],
              correct: 1, why: { pl: "Płatnik (art. 8 Op) oblicza, pobiera i wpłaca podatek. Inkasent (art. 9 Op) tylko pobiera i wpłaca.", ru: "Налоговый агент (ст. 8 Op) рассчитывает, удерживает и перечисляет налог. Сборщик (ст. 9 Op) только собирает и перечисляет." } },
            { q: { pl: "Ile wynosi kwota zmniejszająca podatek przy kwocie wolnej 30 000 zł w PIT?", ru: "Чему равна сумма, уменьшающая налог, при необлагаемом минимуме 30 000 зл в PIT?" },
              a: [{ pl: "3 600 zł", ru: "3 600 зл" }, { pl: "5 100 zł", ru: "5 100 зл" }, { pl: "9 600 zł", ru: "9 600 зл" }, { pl: "30 000 zł", ru: "30 000 зл" }],
              correct: 0, why: { pl: "30 000 zł × 12% = 3 600 zł. Tę kwotę odejmuje się od podatku obliczonego według skali.", ru: "30 000 зл × 12% = 3 600 зл. Эту сумму вычитают из налога, рассчитанного по шкале." } },
            { q: { pl: "Progresja szczeblowa polega na tym, że:", ru: "Ступенчатая прогрессия заключается в том, что:" },
              a: [{ pl: "do całej podstawy stosuje się jedną, najwyższą stawkę", ru: "ко всей базе применяется одна, самая высокая ставка" }, { pl: "stawka maleje, gdy podstawa rośnie", ru: "ставка снижается при росте базы" }, { pl: "stawka jest stała", ru: "ставка постоянна" }, { pl: "podstawę dzieli się na przedziały i każdy ma swoją stawkę", ru: "базу делят на интервалы, и у каждого своя ставка" }],
              correct: 3, why: { pl: "W progresji szczeblowej wyższa stawka dotyczy tylko nadwyżki ponad próg. Tak działa polski PIT i podatek od spadków i darowizn.", ru: "При ступенчатой прогрессии более высокая ставка касается только превышения над порогом. Так работают польский PIT и налог на наследство и дарение." } },
            { q: { pl: "Czym zwolnienie podatkowe różni się od wyłączenia?", ru: "Чем налоговое освобождение отличается от исключения?" },
              a: [{ pl: "Przy zwolnieniu obowiązek podatkowy istnieje, ale nie zamienia się w zobowiązanie; przy wyłączeniu obowiązek w ogóle nie powstaje", ru: "При освобождении налоговая обязанность существует, но не превращается в обязательство; при исключении обязанность вообще не возникает" }, { pl: "Zwolnienie dotyczy tylko VAT", ru: "Освобождение касается только VAT" }, { pl: "Wyłączenie zawsze wymaga decyzji urzędu", ru: "Исключение всегда требует решения ведомства" }, { pl: "Nie ma żadnej różnicy", ru: "Никакой разницы нет" }],
              correct: 0, why: { pl: "Zwolnienie to preferencja w ramach zakresu podatku. Wyłączenie oznacza, że sytuacja leży poza zainteresowaniem danego podatku.", ru: "Освобождение — преференция в пределах сферы налога. Исключение означает, что ситуация лежит вне сферы данного налога." } },
          ],
        },
        // ------------------------------------------------------------------ 1.3
        {
          id: "1.3",
          title: { pl: "Funkcje podatków i zasady podatkowe", ru: "Функции налогов и налоговые принципы" },
          src: "Podstawy systemów podatkowych – wykład 1 (2026): funkcje podatków, zasady A. Smitha i A. Wagnera, zasady konstytucyjne; Systematyka podatków w Polsce",
          body: {
            pl: `Podatki nie służą tylko do zbierania pieniędzy. Państwo używa ich także do zmieniania zachowań ludzi i firm oraz do wyrównywania różnic w dochodach. Dlatego mówimy o kilku funkcjach podatków.

## Funkcja fiskalna
[[funkcja-fiskalna|Funkcja fiskalna]] (skarbowa) jest podstawowa i historycznie najstarsza. Polega na dostarczaniu pieniędzy do budżetu państwa i budżetów samorządów. Według materiałów wykładu największe wpływy budżetu centralnego dają podatki pośrednie: VAT (ok. 40% wpływów podatkowych) i akcyza (ok. 15%), a po nich CIT i PIT.

Dobry podatek powinien mieć **wydajność fiskalną**: dawać dużo dochodów przy niskim koszcie poboru. Ważna jest też **elastyczność**: wpływy rosną same, gdy rośnie [[pkb|PKB]]. VAT jest bardzo elastyczny, bo jego wpływy mocno zależą od koniunktury.

## Funkcje pozafiskalne

| Funkcja | Na czym polega | Przykład |
|---|---|---|
| [[funkcja-redystrybucyjna|Redystrybucyjna]] | wtórny podział dochodu między grupy społeczne | progresywny PIT plus transfery socjalne z budżetu |
| Regulacyjna (interwencyjna) | hamowanie albo pobudzanie zachowań przez różnicowanie obciążeń | akcyza na tytoń i alkohol ogranicza ich spożycie |
| [[funkcja-stymulacyjna|Stymulacyjna]] | zachęcanie do pożądanych działań przez ulgi i zwolnienia | ulga B+R, IP Box (5% od dochodu z kwalifikowanych praw własności intelektualnej), ulga na ekspansję |

> !przyklad Podatek od plastikowych toreb nie ma przynieść fortuny budżetowi. Ma sprawić, że będziemy ich używać mniej. To czysta funkcja regulacyjna. Ulga termomodernizacyjna z kolei zachęca do ocieplania domów, czyli działa stymulacyjnie.

Skuteczność redystrybucji mierzy m.in. **współczynnik Giniego**: im niższy, tym bardziej równomiernie rozłożone są dochody.

> !uwaga Funkcje bywają ze sobą w konflikcie. Zbyt wysoka progresja (redystrybucja) może zniechęcać do pracy i inwestowania (osłabia stymulację). Dobry system szuka równowagi.

## Klasyczne zasady Adama Smitha
W „Bogactwie narodów” (1776) Adam Smith sformułował cztery zasady, które do dziś służą do oceny systemów podatkowych:

| Zasada | Treść | Współczesny odpowiednik |
|---|---|---|
| **Równości (sprawiedliwości)** | płacimy według swoich możliwości | sprawiedliwość pozioma i pionowa |
| **Pewności** | kwota, termin i sposób zapłaty muszą być jasne, a nie arbitralne | *nullum tributum sine lege* (art. 84 i 217 Konstytucji) |
| **Dogodności** | pobór w czasie i sposobie wygodnym dla podatnika | odroczenie płatności, raty |
| **Taniości** | koszt poboru jak najniższy w stosunku do wpływów | analiza luki podatkowej (*tax gap*) |

## Zasady Adolfa Wagnera
Wagner (XIX w.) zgrupował zasady w cztery bloki: **polityki finansowej** (wydajność, elastyczność), **gospodarcze** (ochrona majątku i kapitału jako źródła podatku), **sprawiedliwości** (powszechność, równomierność, progresja) oraz **techniczne** (pewność, dogodność, taniość).

## Zasady konstytucyjne
Konstytucja RP z 1997 r. wiąże ustawodawcę. Trybunał Konstytucyjny bada zgodność ustaw podatkowych z tymi zasadami:
- **Ustawowa forma podatków** (art. 84 i 217): podmiot, przedmiot, stawki, zasady ulg i zwolnień określa się tylko w ustawie. Rozporządzenie nie może nałożyć podatku.
- **Równość i powszechność** (art. 32 i 84): wszyscy ponoszą ciężary publiczne, a zróżnicowanie musi mieć racjonalne uzasadnienie.
- **Ochrona praw nabytych, zakaz wstecznego działania prawa** (art. 2, *lex retro non agit*): nie można zaskoczyć podatnika pogorszeniem jego sytuacji z mocą wsteczną.
- **Proporcjonalność** (art. 31 ust. 3): podatek nie może być konfiskatą, czyli naruszać istoty prawa własności.

> !zapamietaj Trzy główne funkcje podatków to: **fiskalna** (pieniądze dla budżetu), **redystrybucyjna** (wyrównywanie dochodów) i **stymulacyjna/regulacyjna** (wpływanie na zachowania). Cztery zasady Smitha to: równość, pewność, dogodność, taniość.`,
            ru: `Налоги служат не только для сбора денег. Государство использует их и для изменения поведения людей и фирм, и для выравнивания различий в доходах. Поэтому говорят о нескольких функциях налогов.

## Фискальная функция
[[funkcja-fiskalna|Фискальная функция]] (казначейская) — основная и исторически самая старая. Она состоит в наполнении государственного бюджета и бюджетов органов самоуправления. По материалам лекции крупнейшие поступления центрального бюджета дают косвенные налоги: VAT (около 40% налоговых поступлений) и акциз (около 15%), а за ними CIT и PIT.

Хороший налог должен обладать **фискальной эффективностью**: давать много доходов при низких издержках сбора. Важна и **эластичность**: поступления растут сами, когда растёт [[pkb|ВВП]]. VAT очень эластичен, так как его поступления сильно зависят от конъюнктуры.

## Нефискальные функции

| Функция | В чём состоит | Пример |
|---|---|---|
| [[funkcja-redystrybucyjna|Перераспределительная]] | вторичное распределение дохода между социальными группами | прогрессивный PIT плюс социальные трансферты из бюджета |
| Регулирующая (интервенционная) | сдерживание или стимулирование поведения через дифференциацию нагрузки | акциз на табак и алкоголь ограничивает их потребление |
| [[funkcja-stymulacyjna|Стимулирующая]] | поощрение желательных действий через льготы и освобождения | льгота на НИОКР (B+R), IP Box (5% с дохода от квалифицированных прав интеллектуальной собственности), льгота на экспансию |

> !przyklad Налог на пластиковые пакеты не должен принести бюджету состояние. Он должен заставить нас пользоваться ими меньше. Это чистая регулирующая функция. Льгота на термомодернизацию, в свою очередь, поощряет утепление домов, то есть действует стимулирующе.

Эффективность перераспределения измеряет, в частности, **коэффициент Джини**: чем он ниже, тем равномернее распределены доходы.

> !uwaga Функции бывают в конфликте друг с другом. Слишком высокая прогрессия (перераспределение) может отбивать охоту работать и инвестировать (ослабляет стимулирование). Хорошая система ищет баланс.

## Классические принципы Адама Смита
В «Богатстве народов» (1776) Адам Смит сформулировал четыре принципа, по которым до сих пор оценивают налоговые системы:

| Принцип | Содержание | Современный аналог |
|---|---|---|
| **Равенства (справедливости)** | платим в соответствии со своими возможностями | горизонтальная и вертикальная справедливость |
| **Определённости** | сумма, срок и способ уплаты должны быть ясны, а не произвольны | *nullum tributum sine lege* (ст. 84 и 217 Конституции) |
| **Удобства** | взимание во время и способом, удобным для налогоплательщика | отсрочка платежа, рассрочка |
| **Экономичности** | издержки сбора как можно ниже относительно поступлений | анализ налогового разрыва (*tax gap*) |

## Принципы Адольфа Вагнера
Вагнер (XIX в.) сгруппировал принципы в четыре блока: **финансовой политики** (эффективность, эластичность), **экономические** (защита имущества и капитала как источника налога), **справедливости** (всеобщность, равномерность, прогрессия) и **технические** (определённость, удобство, экономичность).

## Конституционные принципы
Конституция РП 1997 г. связывает законодателя. Конституционный трибунал проверяет соответствие налоговых законов этим принципам:
- **Законодательная форма налогов** (ст. 84 и 217): субъект, объект, ставки, правила льгот и освобождений устанавливаются только законом. Распоряжение не может ввести налог.
- **Равенство и всеобщность** (ст. 32 и 84): все несут публичные тяготы, а различия должны иметь рациональное обоснование.
- **Защита приобретённых прав, запрет обратной силы** (ст. 2, *lex retro non agit*): нельзя застать налогоплательщика врасплох ухудшением его положения задним числом.
- **Пропорциональность** (ст. 31 п. 3): налог не может быть конфискацией, то есть нарушать суть права собственности.

> !zapamietaj Три главные функции налогов: **фискальная** (деньги для бюджета), **перераспределительная** (выравнивание доходов) и **стимулирующая/регулирующая** (влияние на поведение). Четыре принципа Смита: равенство, определённость, удобство, экономичность.`,
          },
          quiz: [
            { q: { pl: "Która funkcja podatków jest podstawowa i historycznie najstarsza?", ru: "Какая функция налогов основная и исторически самая старая?" },
              a: [{ pl: "Stymulacyjna", ru: "Стимулирующая" }, { pl: "Redystrybucyjna", ru: "Перераспределительная" }, { pl: "Fiskalna", ru: "Фискальная" }, { pl: "Ekologiczna", ru: "Экологическая" }],
              correct: 2, why: { pl: "Funkcja fiskalna, czyli dostarczanie dochodów do budżetu, jest podstawową i najstarszą funkcją podatków.", ru: "Фискальная функция, то есть наполнение бюджета, — основная и самая старая функция налогов." } },
            { q: { pl: "Ulga B+R i IP Box to przykłady funkcji:", ru: "Льгота B+R и IP Box — примеры функции:" },
              a: [{ pl: "stymulacyjnej", ru: "стимулирующей" }, { pl: "fiskalnej", ru: "фискальной" }, { pl: "redystrybucyjnej", ru: "перераспределительной" }, { pl: "kontrolnej", ru: "контрольной" }],
              correct: 0, why: { pl: "Te preferencje mają zachęcać firmy do badań i innowacji, więc realizują funkcję stymulacyjną.", ru: "Эти преференции должны поощрять фирмы к исследованиям и инновациям, поэтому реализуют стимулирующую функцию." } },
            { q: { pl: "Zasada pewności opodatkowania Adama Smitha oznacza, że:", ru: "Принцип определённости налогообложения Адама Смита означает, что:" },
              a: [{ pl: "podatek powinien być jak najniższy", ru: "налог должен быть как можно ниже" }, { pl: "koszt poboru ma być niski", ru: "издержки сбора должны быть низкими" }, { pl: "podatek płaci się po zbiorach", ru: "налог платится после сбора урожая" }, { pl: "kwota, termin i sposób zapłaty muszą być jasne, nie arbitralne", ru: "сумма, срок и способ уплаты должны быть ясны, не произвольны" }],
              correct: 3, why: { pl: "Pewność to jasność obowiązku. Dziś odpowiada jej zasada nullum tributum sine lege. Niski koszt to zasada taniości, płacenie po zbiorach — dogodności.", ru: "Определённость — ясность обязанности. Сегодня ей соответствует принцип nullum tributum sine lege. Низкие издержки — принцип экономичности, уплата после урожая — удобства." } },
            { q: { pl: "Który przepis Konstytucji RP stanowi, że podatki nakłada się wyłącznie w drodze ustawy?", ru: "Какая статья Конституции РП устанавливает, что налоги вводятся только законом?" },
              a: [{ pl: "art. 2", ru: "ст. 2" }, { pl: "art. 217", ru: "ст. 217" }, { pl: "art. 168", ru: "ст. 168" }, { pl: "art. 31", ru: "ст. 31" }],
              correct: 1, why: { pl: "Art. 217 (razem z art. 84) wymaga ustawy do nałożenia podatku i określenia jego elementów. Art. 2 to zasada państwa prawnego, art. 31 ust. 3 — proporcjonalność.", ru: "Ст. 217 (вместе со ст. 84) требует закона для введения налога и определения его элементов. Ст. 2 — принцип правового государства, ст. 31 п. 3 — пропорциональность." } },
            { q: { pl: "Dlaczego funkcje podatków mogą być ze sobą w konflikcie?", ru: "Почему функции налогов могут конфликтовать друг с другом?" },
              a: [{ pl: "Bo funkcja fiskalna jest zakazana przez UE", ru: "Потому что фискальная функция запрещена ЕС" }, { pl: "Bo podatki pośrednie nie mają żadnych funkcji", ru: "Потому что у косвенных налогов нет функций" }, { pl: "Bo np. wysoka progresja (redystrybucja) może hamować aktywność gospodarczą (stymulację)", ru: "Потому что, например, высокая прогрессия (перераспределение) может тормозить экономическую активность (стимулирование)" }, { pl: "Bo każda funkcja wymaga osobnego podatku", ru: "Потому что каждая функция требует отдельного налога" }],
              correct: 2, why: { pl: "Materiały wskazują, że zbyt wysoka progresja może zniechęcać do aktywności. System musi równoważyć cele.", ru: "Материалы указывают, что слишком высокая прогрессия может отбивать охоту к активности. Система должна балансировать цели." } },
          ],
        },
        // ------------------------------------------------------------------ 1.4
        {
          id: "1.4",
          title: { pl: "Systematyka podatków i polski system podatkowy", ru: "Классификация налогов и польская налоговая система" },
          src: "Podstawy systemów podatkowych – wykład 1 (2026): systematyka podatków, system podatkowy; Podstawy podatków – Systematyka podatków w Polsce",
          body: {
            pl: `Podatków w Polsce jest kilkanaście. Żeby się w nich nie pogubić, porządkuje się je według różnych kryteriów. Każdy podział mówi coś innego o danym podatku.

## Kryterium przedmiotowe
To jeden z najważniejszych podziałów: patrzymy, *co* jest opodatkowane.

| Grupa | Podstawa | Przykłady |
|---|---|---|
| **Przychodowe** | przychód brutto, bez odliczania kosztów | [[ryczalt-ewidencjonowany|ryczałt od przychodów ewidencjonowanych]] (2–17%) |
| **Dochodowe** | dochód, czyli przychód minus koszty | [[pit|PIT]], [[cit|CIT]] |
| **Obrotowe (konsumpcyjne)** | wartość obrotu, sprzedaży | [[vat|VAT]], [[akcyza]], [[pcc|PCC]] |
| **Majątkowe** | posiadanie lub nabycie majątku | [[podatek-od-nieruchomosci|od nieruchomości]], rolny, leśny, od spadków i darowizn |

> !uwaga Podatek przychodowy płaci się nawet wtedy, gdy firma ma stratę, bo nie odlicza się kosztów. To jego główna wada. Zaletą jest prostota i odporność na „kreatywną” księgowość kosztów.

## Bezpośrednie i pośrednie
Klasyczny podział ekonomiczny pyta: czy ten, kto formalnie płaci podatek, ponosi też jego ciężar?

| | [[podatek-bezposredni|Bezpośrednie]] | [[podatek-posredni|Pośrednie]] |
|---|---|---|
| Kto ponosi ciężar | sam podatnik | konsument, w cenie |
| Przerzucalność | brak | ciężar przerzucany przez cenę |
| Charakter | osobisty, uwzględnia sytuację podatnika | anonimowy: urząd nie zna ostatecznego nabywcy |
| Przykłady | PIT, CIT, od nieruchomości, od spadków | VAT, akcyza, podatek od gier |
| Ocena | bardziej sprawiedliwe, mogą być progresywne | wydajne i tanie w poborze, ale regresywne |

Podatki pośrednie są **regresywne** w tym sensie, że biedniejsi wydają większą część dochodu na konsumpcję, więc płacą wyższy odsetek swojego dochodu. Polski system mocno opiera się na podatkach pośrednich: VAT i akcyza dają łącznie ponad połowę wpływów podatkowych.

> !przyklad Kupujesz kawę za 10 zł. W tej cenie jest około 1,87 zł VAT (23%). Formalnie VAT odprowadza kawiarnia, ale ekonomicznie zapłaciłeś go ty. To typowy podatek pośredni.

## Centralne, lokalne, wspólne
Ten podział mówi, *komu* przypadają wpływy:
- **Centralne (państwowe):** w całości dochód budżetu państwa, np. VAT, akcyza, podatek od gier.
- **Lokalne (samorządowe):** dochód gminy, powiatu lub województwa. Rada gminy ustala stawki w granicach ustawowych maksimów, np. podatek od nieruchomości, rolny, leśny, od środków transportowych.
- **Wspólne (udziałowe):** dzielone między państwo i samorządy. W Polsce są to podatki dochodowe: PIT i CIT.

## Czym jest system podatkowy
[[system-podatkowy|System podatkowy]] to ogół podatków obowiązujących w danym państwie w danym czasie, tworzący względnie spójną całość. Obejmuje też aparat skarbowy, prawo i zasady jego działania. Na kształt systemu wpływają tradycje historyczne oraz warunki administracyjne, ekonomiczne i polityczne. Wyróżnia się systemy **historyczne** (narastały latami) i **racjonalne** (zaprojektowane według założeń naukowych).

Dobry system powinien być:
- **kompletny i spójny**: obejmuje źródła dochodu bez luk, a podatki nie nakładają się na siebie,
- **neutralny i efektywny**: nie zniekształca nadmiernie decyzji firm (inaczej rośnie szara strefa i emigracja podatkowa),
- **stabilny i przewidywalny**: częste zmiany przepisów naruszają zasadę pewności.

## Główne podatki w Polsce

| Podatek | Ustawa | Stawki | Beneficjent |
|---|---|---|---|
| PIT | 26.07.1991 | 12% i 32% (skala), 19% (liniowy) | wspólny |
| CIT | 15.02.1992 | 19%, 9% (mali) | wspólny |
| VAT | 11.03.2004 | 23%, 8%, 5%, 0% | państwo |
| Akcyza | 6.12.2008 | kwotowe i procentowe | państwo |
| Od nieruchomości | 12.01.1991 | wg uchwał rad gmin | gmina |
| PCC | 9.09.2000 | 0,5–2% | gmina (pobiera urząd skarbowy) |
| Od spadków i darowizn | 28.07.1983 | 3–20% | gmina (pobiera urząd skarbowy) |

> !zapamietaj Najważniejsze podziały: **przedmiotowy** (przychodowe, dochodowe, obrotowe, majątkowe), **ekonomiczny** (bezpośrednie i pośrednie) oraz **według beneficjenta** (centralne, lokalne, wspólne).`,
            ru: `Налогов в Польше больше десятка. Чтобы не запутаться, их упорядочивают по разным критериям. Каждая классификация говорит о налоге что-то своё.

## Предметный критерий
Это одно из важнейших делений: смотрим, *что* облагается.

| Группа | База | Примеры |
|---|---|---|
| **С выручки** (przychodowe) | валовая выручка без вычета расходов | [[ryczalt-ewidencjonowany|единый налог с учитываемой выручки]] (ryczałt, 2–17%) |
| **Подоходные** | доход, то есть выручка минус расходы | [[pit|PIT]], [[cit|CIT]] |
| **С оборота (на потребление)** | стоимость оборота, продаж | [[vat|VAT]], [[akcyza|акциз]], [[pcc|PCC]] |
| **Имущественные** | владение или приобретение имущества | [[podatek-od-nieruchomosci|на недвижимость]], сельскохозяйственный, лесной, на наследство и дарение |

> !uwaga Налог с выручки платят даже тогда, когда у фирмы убыток, потому что расходы не вычитаются. Это его главный недостаток. Преимущество — простота и устойчивость к «творческому» учёту расходов.

## Прямые и косвенные
Классическое экономическое деление спрашивает: несёт ли тот, кто формально платит налог, и его тяжесть?

| | [[podatek-bezposredni|Прямые]] | [[podatek-posredni|Косвенные]] |
|---|---|---|
| Кто несёт тяжесть | сам налогоплательщик | потребитель, в цене |
| Переложимость | нет | тяжесть перекладывается через цену |
| Характер | личный, учитывает положение налогоплательщика | анонимный: ведомство не знает конечного покупателя |
| Примеры | PIT, CIT, на недвижимость, на наследство | VAT, акциз, налог на игры |
| Оценка | справедливее, могут быть прогрессивными | эффективны и дёшевы в сборе, но регрессивны |

Косвенные налоги **регрессивны** в том смысле, что бедные тратят большую часть дохода на потребление и потому платят больший процент своего дохода. Польская система сильно опирается на косвенные налоги: VAT и акциз вместе дают больше половины налоговых поступлений.

> !przyklad Вы покупаете кофе за 10 зл. В этой цене около 1,87 зл VAT (23%). Формально VAT перечисляет кафе, но экономически заплатили его вы. Это типичный косвенный налог.

## Центральные, местные, общие
Это деление показывает, *кому* идут поступления:
- **Центральные (государственные):** полностью доход госбюджета, например VAT, акциз, налог на игры.
- **Местные (самоуправленческие):** доход гмины, повята или воеводства. Совет гмины устанавливает ставки в пределах законодательных максимумов: налог на недвижимость, сельскохозяйственный, лесной, на транспортные средства.
- **Общие (долевые):** делятся между государством и самоуправлением. В Польше это подоходные налоги: PIT и CIT.

## Что такое налоговая система
[[system-podatkowy|Налоговая система]] — совокупность налогов, действующих в данном государстве в данное время и образующих относительно целостное единство. Она включает также налоговый аппарат, право и принципы его работы. На облик системы влияют исторические традиции, а также административные, экономические и политические условия. Различают системы **исторические** (складывались годами) и **рациональные** (спроектированы по научным принципам).

Хорошая система должна быть:
- **полной и согласованной**: охватывает источники дохода без пробелов, а налоги не накладываются друг на друга,
- **нейтральной и эффективной**: не искажает чрезмерно решения фирм (иначе растёт теневая экономика и налоговая эмиграция),
- **стабильной и предсказуемой**: частые изменения норм нарушают принцип определённости.

## Главные налоги Польши

| Налог | Закон | Ставки | Получатель |
|---|---|---|---|
| PIT | 26.07.1991 | 12% и 32% (шкала), 19% (линейный) | общий |
| CIT | 15.02.1992 | 19%, 9% (малые) | общий |
| VAT | 11.03.2004 | 23%, 8%, 5%, 0% | государство |
| Акциз | 6.12.2008 | твёрдые и процентные | государство |
| На недвижимость | 12.01.1991 | по решениям советов гмин | гмина |
| PCC | 9.09.2000 | 0,5–2% | гмина (взимает налоговая инспекция) |
| На наследство и дарение | 28.07.1983 | 3–20% | гмина (взимает налоговая инспекция) |

> !zapamietaj Главные классификации: **предметная** (с выручки, подоходные, с оборота, имущественные), **экономическая** (прямые и косвенные) и **по получателю** (центральные, местные, общие).`,
          },
          quiz: [
            { q: { pl: "Ryczałt od przychodów ewidencjonowanych to przykład podatku:", ru: "Единый налог с учитываемой выручки (ryczałt) — пример налога:" },
              a: [{ pl: "majątkowego", ru: "имущественного" }, { pl: "przychodowego", ru: "с выручки" }, { pl: "obrotowego", ru: "с оборота" }, { pl: "lokalnego", ru: "местного" }],
              correct: 1, why: { pl: "Podstawą ryczałtu jest przychód, bez odliczania kosztów, dlatego zaliczamy go do podatków przychodowych.", ru: "База рычалта — выручка без вычета расходов, поэтому его относят к налогам с выручки." } },
            { q: { pl: "Cechą podatków pośrednich jest:", ru: "Признак косвенных налогов —" },
              a: [{ pl: "uwzględnianie sytuacji rodzinnej podatnika", ru: "учёт семейного положения налогоплательщика" }, { pl: "brak możliwości przerzucenia ciężaru", ru: "невозможность переложить тяжесть" }, { pl: "progresywna skala", ru: "прогрессивная шкала" }, { pl: "przerzucanie ciężaru na konsumenta przez cenę", ru: "перекладывание тяжести на потребителя через цену" }],
              correct: 3, why: { pl: "W podatkach pośrednich formalnym podatnikiem jest sprzedawca, ale ekonomiczny ciężar ponosi konsument, bo podatek jest w cenie.", ru: "В косвенных налогах формальный налогоплательщик — продавец, но экономическую тяжесть несёт потребитель, так как налог в цене." } },
            { q: { pl: "Które podatki są w Polsce podatkami wspólnymi (udziałowymi)?", ru: "Какие налоги в Польше являются общими (долевыми)?" },
              a: [{ pl: "PIT i CIT", ru: "PIT и CIT" }, { pl: "VAT i akcyza", ru: "VAT и акциз" }, { pl: "Podatek rolny i leśny", ru: "Сельскохозяйственный и лесной" }, { pl: "Podatek od gier i tonażowy", ru: "Налог на игры и тоннажный" }],
              correct: 0, why: { pl: "Wpływy z podatków dochodowych są dzielone między budżet państwa a samorządy.", ru: "Поступления от подоходных налогов делятся между госбюджетом и органами самоуправления." } },
            { q: { pl: "Dlaczego podatki pośrednie nazywa się regresywnymi?", ru: "Почему косвенные налоги называют регрессивными?" },
              a: [{ pl: "Bo ich stawki maleją z czasem", ru: "Потому что их ставки со временем снижаются" }, { pl: "Bo płacą je tylko firmy", ru: "Потому что их платят только фирмы" }, { pl: "Bo osoby biedniejsze wydają większą część dochodu na konsumpcję, więc płacą wyższy odsetek dochodu", ru: "Потому что бедные тратят большую часть дохода на потребление и платят больший процент дохода" }, { pl: "Bo są pobierane tylko w recesji", ru: "Потому что взимаются только в рецессию" }],
              correct: 2, why: { pl: "Stawka VAT jest taka sama dla wszystkich, ale w relacji do dochodu bardziej obciąża tych, którzy wszystko wydają.", ru: "Ставка VAT одинакова для всех, но относительно дохода сильнее нагружает тех, кто всё тратит." } },
            { q: { pl: "Która cecha dobrego systemu podatkowego jest naruszana przez bardzo częste zmiany przepisów?", ru: "Какой признак хорошей налоговой системы нарушают очень частые изменения норм?" },
              a: [{ pl: "Kompletność", ru: "Полнота" }, { pl: "Stabilność i przewidywalność", ru: "Стабильность и предсказуемость" }, { pl: "Wydajność fiskalna", ru: "Фискальная эффективность" }, { pl: "Elastyczność", ru: "Эластичность" }],
              correct: 1, why: { pl: "Podatnicy muszą móc planować działalność. Częste nowelizacje naruszają zasadę pewności prawa i podnoszą koszty dostosowania.", ru: "Налогоплательщики должны иметь возможность планировать. Частые поправки нарушают принцип правовой определённости и повышают издержки." } },
          ],
        },
        // ------------------------------------------------------------------ 1.5
        {
          id: "1.5",
          title: { pl: "Prawo podatkowe: źródła i wykładnia", ru: "Налоговое право: источники и толкование" },
          src: "Podstawy systemów podatkowych – wykład 1 (2026): istota prawa podatkowego, normy, źródła, wykładnia, zakaz analogii, art. 2a Op",
          body: {
            pl: `Prawo podatkowe to osobna gałąź **prawa publicznego**. Reguluje wszystko, co dzieje się przy nakładaniu i poborze podatków. W relacji z podatnikiem organ podatkowy jest stroną nadrzędną: może jednostronnie kształtować jego prawa i obowiązki, np. wydając decyzję.

## Materialne i formalne prawo podatkowe

| Rodzaj | Co reguluje | Przykłady aktów |
|---|---|---|
| **Materialne** | elementy konstrukcji podatku: kto płaci, od czego, ile, jakie są ulgi | ustawy o PIT, CIT, VAT, o podatku akcyzowym |
| **Formalne (proceduralne)** | tryb wymiaru, poboru i kontroli podatków | [[ordynacja-podatkowa|Ordynacja podatkowa]] z 1997 r. |

Szeroko rozumiane prawo podatkowe obejmuje też prawo karne skarbowe, umowy o unikaniu [[podwojne-opodatkowanie|podwójnego opodatkowania]] i przepisy unijne.

Prawo podatkowe ma **autonomię pojęciową**: może definiować na własne potrzeby pojęcia znane z prawa cywilnego.

## Norma prawa podatkowego
Jak każda norma, składa się z **hipotezy** (opis sytuacji), **dyspozycji** (co trzeba zrobić) i **sankcji** (co grozi za naruszenie). W prawie podatkowym wyróżnia się:
- **normy nakładające obowiązek**: kto, od czego i ile płaci. Są bezwzględnie wiążące, umowa stron nie może ich zmienić,
- **normy proceduralne**: tryb działania organu i podatnika, terminy, środki zaskarżenia,
- **normy sankcjonujące**: np. odsetki za zwłokę (art. 53 Op), odpowiedzialność karna skarbowa.

## Hierarchia źródeł prawa
Art. 87 Konstytucji wymienia zamknięty katalog źródeł prawa powszechnie obowiązującego. W prawie podatkowym wygląda to tak:

1. Konstytucja RP
2. Prawo UE (traktaty, dyrektywy, rozporządzenia)
3. Ratyfikowane umowy międzynarodowe (w tym umowy o unikaniu podwójnego opodatkowania, UPO)
4. Ustawy podatkowe (PIT, CIT, VAT, Ordynacja...)
5. Rozporządzenia wykonawcze Ministra Finansów

Norma niższego rzędu nie może być sprzeczna z wyższą. W podatkach pośrednich (VAT, akcyza), które są mocno zharmonizowane w UE, w razie kolizji pierwszeństwo ma prawo unijne. Podatki bezpośrednie (PIT, CIT) pozostają w dużej mierze w kompetencji państw, choć i tu działają dyrektywy, np. ATAD przeciw unikaniu opodatkowania. Polska zawarła ponad 90 umów o unikaniu podwójnego opodatkowania opartych na Modelu OECD.

> !uwaga Interpretacje podatkowe i orzeczenia sądów nie są źródłami prawa powszechnie obowiązującego. Są jednak bardzo ważne w praktyce, bo pokazują, jak przepisy są rozumiane (więcej w wykładzie 7).

## Wykładnia prawa podatkowego
Wykładnia to ustalanie znaczenia przepisu. Przepisy podatkowe są często lakoniczne, więc wykładnia ma ogromne znaczenie.

| Rodzaj | Na czym polega |
|---|---|
| **Językowa** | znaczenie według reguł języka i definicji ustawowych; w prawie podatkowym ma priorytet |
| **Systemowa** | przepis czyta się w kontekście całej ustawy i całego systemu prawa |
| **Celowościowa** | szuka się celu ustawodawcy, gdy wykładnia językowa daje absurdalny wynik |
| **Prounijna** | przepisy wdrażające dyrektywy czyta się zgodnie z dyrektywą i orzecznictwem TSUE |

## Zakaz analogii i in dubio pro tributario
Prawo podatkowe nakłada ciężary, więc ma szczególne reguły ochronne:
- **Zakaz analogii na niekorzyść podatnika.** Organ nie może opodatkować czynności tylko dlatego, że jest „podobna” do opodatkowanej. Obowiązek musi wynikać wprost z ustawy (*nullum tributum sine lege*).
- **[[in-dubio-pro-tributario|In dubio pro tributario]]** (art. 2a Op, od 2016 r.): niedające się usunąć wątpliwości co do treści przepisów rozstrzyga się na korzyść podatnika.

> !przyklad Przepis jest niejasny i da się go czytać na dwa sposoby. Organ najpierw stosuje wszystkie metody wykładni: językową, systemową, celowościową. Jeśli dalej nie wiadomo, która wersja jest prawidłowa, musi wybrać tę korzystniejszą dla podatnika. Tak rozumie art. 2a NSA: zasada działa dopiero po wyczerpaniu innych metod.

> !zapamietaj Hierarchia: Konstytucja → prawo UE → umowy międzynarodowe → ustawy → rozporządzenia. Wątpliwości, których nie da się usunąć, rozstrzyga się na korzyść podatnika (art. 2a Op).`,
            ru: `Налоговое право — отдельная отрасль **публичного права**. Оно регулирует всё, что происходит при установлении и взимании налогов. В отношениях с налогоплательщиком налоговый орган — вышестоящая сторона: он может односторонне определять его права и обязанности, например вынося решение.

## Материальное и процессуальное налоговое право

| Вид | Что регулирует | Примеры актов |
|---|---|---|
| **Материальное** | элементы конструкции налога: кто платит, с чего, сколько, какие льготы | законы о PIT, CIT, VAT, об акцизе |
| **Формальное (процессуальное)** | порядок исчисления, взимания и контроля налогов | [[ordynacja-podatkowa|Ordynacja podatkowa]] 1997 г. |

Налоговое право в широком смысле включает и уголовно-фискальное право, соглашения об избежании [[podwojne-opodatkowanie|двойного налогообложения]] и нормы ЕС.

У налогового права есть **понятийная автономия**: оно может определять для своих нужд понятия, известные из гражданского права.

## Норма налогового права
Как любая норма, она состоит из **гипотезы** (описание ситуации), **диспозиции** (что нужно сделать) и **санкции** (что грозит за нарушение). В налоговом праве выделяют:
- **нормы, устанавливающие обязанность**: кто, с чего и сколько платит. Они императивны, договор сторон не может их изменить,
- **процессуальные нормы**: порядок действий органа и налогоплательщика, сроки, средства обжалования,
- **санкционные нормы**: например проценты за просрочку (ст. 53 Op), уголовно-фискальная ответственность.

## Иерархия источников права
Ст. 87 Конституции содержит закрытый перечень источников общеобязательного права. В налоговом праве это выглядит так:

1. Конституция РП
2. Право ЕС (договоры, директивы, регламенты)
3. Ратифицированные международные договоры (в том числе соглашения об избежании двойного налогообложения, UPO)
4. Налоговые законы (PIT, CIT, VAT, Ordynacja...)
5. Исполнительные распоряжения министра финансов

Норма низшего уровня не может противоречить высшей. В косвенных налогах (VAT, акциз), сильно гармонизированных в ЕС, при коллизии приоритет имеет право ЕС. Прямые налоги (PIT, CIT) в основном остаются в компетенции государств, хотя и здесь действуют директивы, например ATAD против уклонения от налогов. Польша заключила более 90 соглашений об избежании двойного налогообложения на основе Модели ОЭСР.

> !uwaga Налоговые разъяснения и судебные решения не являются источниками общеобязательного права. Но на практике они очень важны, так как показывают, как понимаются нормы (подробнее в лекции 7).

## Толкование налогового права
Толкование — установление смысла нормы. Налоговые нормы часто лаконичны, поэтому толкование имеет огромное значение.

| Вид | В чём состоит |
|---|---|
| **Языковое** | смысл по правилам языка и законодательным определениям; в налоговом праве имеет приоритет |
| **Системное** | норму читают в контексте всего закона и всей системы права |
| **Целевое** | ищут цель законодателя, когда языковое толкование даёт абсурдный результат |
| **Проевропейское** | нормы, внедряющие директивы, читают в соответствии с директивой и практикой Суда ЕС |

## Запрет аналогии и in dubio pro tributario
Налоговое право возлагает тяготы, поэтому у него особые защитные правила:
- **Запрет аналогии во вред налогоплательщику.** Орган не может обложить налогом действие только потому, что оно «похоже» на облагаемое. Обязанность должна прямо вытекать из закона (*nullum tributum sine lege*).
- **[[in-dubio-pro-tributario|In dubio pro tributario]]** (ст. 2a Op, с 2016 г.): неустранимые сомнения относительно содержания норм толкуются в пользу налогоплательщика.

> !przyklad Норма неясна, её можно прочитать двумя способами. Орган сначала применяет все методы толкования: языковое, системное, целевое. Если по-прежнему неясно, какой вариант верен, он должен выбрать более выгодный для налогоплательщика. Так понимает ст. 2a Высший административный суд (NSA): принцип действует только после исчерпания других методов.

> !zapamietaj Иерархия: Конституция → право ЕС → международные договоры → законы → распоряжения. Неустранимые сомнения толкуются в пользу налогоплательщика (ст. 2a Op).`,
          },
          quiz: [
            { q: { pl: "Ordynacja podatkowa jest przede wszystkim aktem prawa podatkowego:", ru: "Ordynacja podatkowa — прежде всего акт налогового права:" },
              a: [{ pl: "materialnego", ru: "материального" }, { pl: "cywilnego", ru: "гражданского" }, { pl: "formalnego (proceduralnego)", ru: "формального (процессуального)" }, { pl: "unijnego", ru: "европейского" }],
              correct: 2, why: { pl: "Ordynacja reguluje tryb wymiaru, poboru i kontroli podatków, postępowanie podatkowe i kontrolę, czyli prawo formalne.", ru: "Ordynacja регулирует порядок исчисления, взимания и контроля налогов, налоговое производство и проверки, то есть процессуальное право." } },
            { q: { pl: "Co mówi zasada in dubio pro tributario (art. 2a Op)?", ru: "Что гласит принцип in dubio pro tributario (ст. 2a Op)?" },
              a: [{ pl: "Niedające się usunąć wątpliwości co do treści przepisów rozstrzyga się na korzyść podatnika", ru: "Неустранимые сомнения относительно содержания норм толкуются в пользу налогоплательщика" }, { pl: "Wątpliwości rozstrzyga się na korzyść Skarbu Państwa", ru: "Сомнения толкуются в пользу казны" }, { pl: "Podatnik zawsze wygrywa spór z organem", ru: "Налогоплательщик всегда выигрывает спор с органом" }, { pl: "Przepisy stosuje się przez analogię", ru: "Нормы применяются по аналогии" }],
              correct: 0, why: { pl: "Zasada działa od 2016 r. i ma zastosowanie dopiero po wyczerpaniu innych metod wykładni.", ru: "Принцип действует с 2016 г. и применяется только после исчерпания других методов толкования." } },
            { q: { pl: "Które źródło stoi najniżej w hierarchii źródeł prawa podatkowego?", ru: "Какой источник стоит ниже всех в иерархии налогового права?" },
              a: [{ pl: "Ustawa o VAT", ru: "Закон о VAT" }, { pl: "Ratyfikowana umowa o unikaniu podwójnego opodatkowania", ru: "Ратифицированное соглашение об избежании двойного налогообложения" }, { pl: "Dyrektywa VAT", ru: "Директива о VAT" }, { pl: "Rozporządzenie wykonawcze Ministra Finansów", ru: "Исполнительное распоряжение министра финансов" }],
              correct: 3, why: { pl: "Kolejność: Konstytucja, prawo UE, umowy międzynarodowe, ustawy, rozporządzenia.", ru: "Порядок: Конституция, право ЕС, международные договоры, законы, распоряжения." } },
            { q: { pl: "Który rodzaj wykładni ma w prawie podatkowym priorytet?", ru: "Какой вид толкования имеет приоритет в налоговом праве?" },
              a: [{ pl: "Celowościowa", ru: "Целевое" }, { pl: "Językowa", ru: "Языковое" }, { pl: "Historyczna", ru: "Историческое" }, { pl: "Analogia", ru: "Аналогия" }],
              correct: 1, why: { pl: "Punktem wyjścia jest wykładnia językowa; organ nie może wychodzić poza literalne brzmienie przepisu na niekorzyść podatnika.", ru: "Отправная точка — языковое толкование; орган не может выходить за буквальный смысл нормы во вред налогоплательщику." } },
            { q: { pl: "Z czego wynika zakaz stosowania analogii na niekorzyść podatnika?", ru: "Из чего вытекает запрет аналогии во вред налогоплательщику?" },
              a: [{ pl: "Z zasady nullum tributum sine lege i art. 217 Konstytucji", ru: "Из принципа nullum tributum sine lege и ст. 217 Конституции" }, { pl: "Z dyrektywy ATAD", ru: "Из директивы ATAD" }, { pl: "Z umów o unikaniu podwójnego opodatkowania", ru: "Из соглашений об избежании двойного налогообложения" }, { pl: "Z rozporządzeń Ministra Finansów", ru: "Из распоряжений министра финансов" }],
              correct: 0, why: { pl: "Skoro podatek można nałożyć tylko ustawą, nie można go rozszerzać na sytuacje „podobne”, których ustawa nie wymienia.", ru: "Раз налог можно ввести только законом, его нельзя распространять на «похожие» ситуации, которых закон не называет." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Podatek według art. 6 Op to świadczenie:", ru: "Налог по ст. 6 Op — это платёж:" },
          a: [{ pl: "dobrowolne i zwrotne", ru: "добровольный и возвратный" }, { pl: "publicznoprawne, nieodpłatne, przymusowe i bezzwrotne", ru: "публично-правовой, безвозмездный, принудительный и безвозвратный" }, { pl: "odpłatne, wynikające z umowy", ru: "возмездный, вытекающий из договора" }, { pl: "wyłącznie na rzecz gminy", ru: "исключительно в пользу гмины" }],
          correct: 1, why: { pl: "To cztery kluczowe cechy z definicji ustawowej; dodatkowo świadczenie jest pieniężne i wynika z ustawy.", ru: "Это четыре ключевых признака из законодательного определения; кроме того, платёж денежный и вытекает из закона." } },
        { q: { pl: "Składka na ubezpieczenie społeczne różni się od podatku, bo:", ru: "Страховой взнос отличается от налога тем, что:" },
          a: [{ pl: "jest celowa i daje prawo do świadczeń z systemu", ru: "он целевой и даёт право на выплаты из системы" }, { pl: "nie jest przymusowa", ru: "он не принудителен" }, { pl: "jest płacona w naturze", ru: "он платится в натуре" }, { pl: "nie wynika z ustawy", ru: "он не вытекает из закона" }],
          correct: 0, why: { pl: "Składka ma charakter celowy i wzajemny, podczas gdy podatek jest nieodpłatny.", ru: "Взнос имеет целевой и взаимный характер, а налог безвозмезден." } },
        { q: { pl: "Inkasent różni się od płatnika tym, że:", ru: "Сборщик (inkasent) отличается от налогового агента (płatnik) тем, что:" },
          a: [{ pl: "płaci podatek z własnych środków", ru: "платит налог из собственных средств" }, { pl: "wydaje decyzje", ru: "выносит решения" }, { pl: "nie oblicza podatku, tylko go pobiera i wpłaca", ru: "не рассчитывает налог, а только собирает и перечисляет" }, { pl: "nie ma żadnych obowiązków", ru: "не имеет обязанностей" }],
          correct: 2, why: { pl: "Płatnik oblicza, pobiera i wpłaca (art. 8 Op); inkasent tylko pobiera i wpłaca (art. 9 Op).", ru: "Агент рассчитывает, удерживает и перечисляет (ст. 8 Op); сборщик только собирает и перечисляет (ст. 9 Op)." } },
        { q: { pl: "Powierzchnia w m² w podatku od nieruchomości to przykład:", ru: "Площадь в м² в налоге на недвижимость — пример:" },
          a: [{ pl: "stawki procentowej", ru: "процентной ставки" }, { pl: "przedmiotu podatku", ru: "объекта налога" }, { pl: "kwoty wolnej", ru: "необлагаемого минимума" }, { pl: "ilościowej podstawy opodatkowania", ru: "количественной налоговой базы" }],
          correct: 3, why: { pl: "Podstawa to przedmiot wyrażony liczbą; tutaj jest ilościowa (m²), w PIT — wartościowa (zł).", ru: "База — объект, выраженный числом; здесь количественная (м²), в PIT — стоимостная (зл)." } },
        { q: { pl: "Podatnik ma dochód 80 000 zł (skala PIT, bez innych ulg). Ile wynosi podatek?", ru: "Доход налогоплательщика 80 000 зл (шкала PIT, без других льгот). Каков налог?" },
          a: [{ pl: "9 600 zł", ru: "9 600 зл" }, { pl: "6 000 zł", ru: "6 000 зл" }, { pl: "15 200 zł", ru: "15 200 зл" }, { pl: "13 200 zł", ru: "13 200 зл" }],
          correct: 1, why: { pl: "80 000 × 12% = 9 600 zł; minus kwota zmniejszająca 3 600 zł = 6 000 zł.", ru: "80 000 × 12% = 9 600 зл; минус уменьшающая сумма 3 600 зл = 6 000 зл." } },
        { q: { pl: "Skala proporcjonalna (liniowa) występuje m.in. w:", ru: "Пропорциональная (линейная) шкала применяется, в частности, в:" },
          a: [{ pl: "VAT i akcyzie", ru: "VAT и акцизе" }, { pl: "PIT według skali", ru: "PIT по шкале" }, { pl: "podatku od spadków i darowizn", ru: "налоге на наследство и дарение" }, { pl: "żadnym polskim podatku", ru: "ни одном польском налоге" }],
          correct: 0, why: { pl: "W VAT, akcyzie, PCC, podatku rolnym i leśnym stawka nie zależy od wielkości podstawy.", ru: "В VAT, акцизе, PCC, сельскохозяйственном и лесном налогах ставка не зависит от размера базы." } },
        { q: { pl: "Akcyza na wyroby tytoniowe to przede wszystkim przejaw funkcji:", ru: "Акциз на табачные изделия — прежде всего проявление функции:" },
          a: [{ pl: "redystrybucyjnej", ru: "перераспределительной" }, { pl: "regulacyjnej (obok fiskalnej)", ru: "регулирующей (наряду с фискальной)" }, { pl: "kontrolnej", ru: "контрольной" }, { pl: "informacyjnej", ru: "информационной" }],
          correct: 1, why: { pl: "Wysoka akcyza ma ograniczać szkodliwą konsumpcję, a przy okazji daje duże wpływy.", ru: "Высокий акциз должен ограничивать вредное потребление, а заодно даёт большие поступления." } },
        { q: { pl: "Która zasada Adama Smitha mówi, że koszt poboru ma być jak najniższy?", ru: "Какой принцип Адама Смита гласит, что издержки сбора должны быть минимальны?" },
          a: [{ pl: "Równości", ru: "Равенства" }, { pl: "Pewności", ru: "Определённости" }, { pl: "Dogodności", ru: "Удобства" }, { pl: "Taniości", ru: "Экономичности" }],
          correct: 3, why: { pl: "Zasada taniości (ekonomiczności) wymaga niskich kosztów poboru w stosunku do wpływów.", ru: "Принцип экономичности требует низких издержек сбора относительно поступлений." } },
        { q: { pl: "Zakaz wstecznego działania prawa podatkowego wynika z:", ru: "Запрет обратной силы налогового закона вытекает из:" },
          a: [{ pl: "art. 2 Konstytucji (państwo prawne)", ru: "ст. 2 Конституции (правовое государство)" }, { pl: "art. 6 Op", ru: "ст. 6 Op" }, { pl: "dyrektywy VAT", ru: "директивы о VAT" }, { pl: "uchwały rady gminy", ru: "решения совета гмины" }],
          correct: 0, why: { pl: "Z klauzuli demokratycznego państwa prawnego wynika zasada lex retro non agit i ochrona praw nabytych.", ru: "Из клаузулы демократического правового государства вытекают принцип lex retro non agit и защита приобретённых прав." } },
        { q: { pl: "Do podatków dochodowych zaliczamy:", ru: "К подоходным налогам относятся:" },
          a: [{ pl: "VAT i akcyzę", ru: "VAT и акциз" }, { pl: "podatek od nieruchomości", ru: "налог на недвижимость" }, { pl: "PIT i CIT", ru: "PIT и CIT" }, { pl: "ryczałt ewidencjonowany", ru: "рычалт с выручки" }],
          correct: 2, why: { pl: "Podstawą PIT i CIT jest dochód, czyli przychód pomniejszony o koszty jego uzyskania.", ru: "База PIT и CIT — доход, то есть выручка за вычетом расходов на её получение." } },
        { q: { pl: "Któremu podziałowi odpowiada para „centralne – lokalne – wspólne”?", ru: "Какому делению соответствует тройка «центральные – местные – общие»?" },
          a: [{ pl: "Przedmiotowemu", ru: "Предметному" }, { pl: "Według beneficjenta wpływów", ru: "По получателю поступлений" }, { pl: "Ekonomicznemu (przerzucalność)", ru: "Экономическому (переложимость)" }, { pl: "Według skali", ru: "По шкале" }],
          correct: 1, why: { pl: "Ten podział mówi, czy wpływy trafiają do budżetu państwa, samorządu, czy są dzielone.", ru: "Это деление показывает, идут ли поступления в госбюджет, в самоуправление или делятся." } },
        { q: { pl: "W razie kolizji przepisu krajowego z dyrektywą VAT pierwszeństwo ma:", ru: "При коллизии национальной нормы с директивой о VAT приоритет имеет:" },
          a: [{ pl: "rozporządzenie Ministra Finansów", ru: "распоряжение министра финансов" }, { pl: "ustawa krajowa, bo jest późniejsza", ru: "национальный закон, так как он принят позже" }, { pl: "interpretacja indywidualna", ru: "индивидуальное разъяснение" }, { pl: "prawo unijne", ru: "право ЕС" }],
          correct: 3, why: { pl: "W zharmonizowanych podatkach pośrednich obowiązuje zasada pierwszeństwa prawa UE.", ru: "В гармонизированных косвенных налогах действует принцип приоритета права ЕС." } },
      ],
    },
    {
      n: 2,
      color: "--c2",
      title: { pl: "Otoczenie podatkowe przedsiębiorstwa", ru: "Налоговое окружение предприятия" },
      lead: {
        pl: "Jak podatki wpływają na firmę z różnych stron: prawa, finansów, gospodarki, organizacji, rynku międzynarodowego i etyki.",
        ru: "Как налоги влияют на фирму с разных сторон: права, финансов, экономики, организации, международного рынка и этики.",
      },
      subs: [
        // ------------------------------------------------------------------ 2.1
        {
          id: "2.1",
          title: { pl: "Otoczenie podatkowe i płaszczyzna prawna", ru: "Налоговое окружение и правовой аспект" },
          src: "Płaszczyzny otoczenia przedsiębiorstwa (dr M. Łyszkiewicz): wprowadzenie, płaszczyzna prawna",
          body: {
            pl: `Każda firma, niezależnie od wielkości, branży i formy prawnej, musi liczyć się z podatkami. Dla przedsiębiorcy podatki to nie tylko wydatek. To element środowiska, w którym działa, i który wpływa na jego najważniejsze decyzje.

## Czym jest otoczenie podatkowe
[[otoczenie-podatkowe|Otoczenie podatkowe przedsiębiorstwa]] to całokształt czynników związanych z podatkami, które wpływają na funkcjonowanie firmy. Podatki mają tu podwójną naturę:
- są **obciążeniem finansowym**, które zmniejsza zysk,
- są **instrumentem** państwa, który kształtuje warunki gospodarowania: zachęca do jednych działań, a zniechęca do innych.

Podatki wpływają na decyzje strategiczne: ile inwestować, ilu ludzi zatrudnić, jakie ustalić ceny, a nawet gdzie ulokować firmę. Dlatego przedsiębiorca musi stale analizować swoje otoczenie podatkowe, dostosowywać się do zmian i szukać rozwiązań korzystnych i zgodnych z prawem.

W materiałach wykładu otoczenie podatkowe dzieli się na kilka **płaszczyzn**:

| Płaszczyzna | Główne pytanie |
|---|---|
| prawna | jakie przepisy obowiązują i jak się zmieniają? |
| finansowa | jak podatki wpływają na koszty, płynność i wynik? |
| ekonomiczna | jak podatki wpływają na konkurencyjność i gospodarkę? |
| organizacyjna | jakie obowiązki ewidencyjne i sprawozdawcze ma firma? |
| międzynarodowa | jak opodatkowana jest działalność za granicą? |
| społeczna i etyczna | jak społeczeństwo ocenia podejście firmy do podatków? |

## Płaszczyzna prawna: źródła
Podstawą jest prawo. Przedsiębiorca musi znać:
- **Konstytucję**, która określa zasady nakładania podatków (np. wyłącznie w drodze ustawy),
- **ustawy podatkowe**, np. o VAT, o CIT, o PIT,
- **rozporządzenia wykonawcze**,
- **interpretacje** indywidualne i ogólne (wydawane przez Dyrektora KIS i Ministra Finansów),
- **prawo unijne** i orzecznictwo Trybunału Sprawiedliwości UE.

## Cechy prawa podatkowego z punktu widzenia firmy
Materiały wskazują trzy problemy, które zwiększają ryzyko przedsiębiorcy:
1. **Częste zmiany.** Przepisy podatkowe w Polsce zmieniają się bardzo często, więc to, co było dobre rok temu, dziś może być błędem.
2. **Skomplikowane przepisy.** Wiele regulacji jest długich i technicznych, z licznymi wyjątkami.
3. **Niejasne definicje.** Ten sam przepis można czytać różnie, co rodzi spory z urzędem.

> !przyklad Firma od lat rozlicza pewien wydatek jako koszt. Po zmianie ustawy przestaje on być kosztem podatkowym. Jeśli księgowa tego nie zauważy, przy kontroli powstanie zaległość z odsetkami. Prawo się zmieniło, a firma nie zareagowała.

## Jak firma może się chronić
- **Śledzić zmiany** przepisów i korzystać z pomocy doradców podatkowych.
- **Pytać urząd**: w razie wątpliwości można wystąpić o [[interpretacja-indywidualna|interpretację indywidualną]]. Zastosowanie się do niej chroni podatnika, nawet gdy później zostanie zmieniona.
- **Dokumentować decyzje**: mieć dowody, dlaczego przyjęto dane rozliczenie.

> !uwaga Brak zgodności z prawem podatkowym grozi nie tylko zapłatą zaległości z odsetkami, ale także karami finansowymi, a nawet odpowiedzialnością karną skarbową (Kodeks karny skarbowy).

## Znaczenie płaszczyzny prawnej
Przedsiębiorca musi jednocześnie **znać i przestrzegać prawa** oraz **umieć reagować na jego zmiany**. To wymaga stałej uwagi, dlatego wiele firm korzysta z biur rachunkowych i doradców. Koszt takiej pomocy jest zwykle niższy niż koszt błędu.

> !zapamietaj Otoczenie podatkowe to wszystkie czynniki podatkowe wpływające na firmę. Na płaszczyźnie prawnej główne ryzyka to **częste zmiany**, **złożoność** i **niejasność** przepisów. Ochroną są wiedza, interpretacje i dokumentacja.`,
            ru: `Любая фирма, независимо от размера, отрасли и правовой формы, должна считаться с налогами. Для предпринимателя налоги — не только расход. Это элемент среды, в которой он работает и которая влияет на его важнейшие решения.

## Что такое налоговое окружение
[[otoczenie-podatkowe|Налоговое окружение предприятия]] — совокупность связанных с налогами факторов, влияющих на работу фирмы. Налоги здесь имеют двойную природу:
- это **финансовая нагрузка**, уменьшающая прибыль,
- это **инструмент** государства, формирующий условия хозяйствования: поощряет одни действия и препятствует другим.

Налоги влияют на стратегические решения: сколько инвестировать, сколько людей нанять, какие установить цены и даже где разместить фирму. Поэтому предприниматель должен постоянно анализировать своё налоговое окружение, приспосабливаться к изменениям и искать выгодные и законные решения.

В материалах лекции налоговое окружение делится на несколько **плоскостей**:

| Плоскость | Главный вопрос |
|---|---|
| правовая | какие нормы действуют и как они меняются? |
| финансовая | как налоги влияют на издержки, ликвидность и результат? |
| экономическая | как налоги влияют на конкурентоспособность и экономику? |
| организационная | какие учётные и отчётные обязанности у фирмы? |
| международная | как облагается деятельность за рубежом? |
| социальная и этическая | как общество оценивает отношение фирмы к налогам? |

## Правовая плоскость: источники
Основа — право. Предприниматель должен знать:
- **Конституцию**, которая определяет принципы введения налогов (например, только законом),
- **налоговые законы**, например о VAT, о CIT, о PIT,
- **исполнительные распоряжения**,
- **разъяснения** индивидуальные и общие (их выдают директор Национальной налоговой информации, KIS, и министр финансов),
- **право ЕС** и практику Суда ЕС.

## Черты налогового права с точки зрения фирмы
Материалы указывают три проблемы, повышающие риск предпринимателя:
1. **Частые изменения.** Налоговые нормы в Польше меняются очень часто, так что то, что было правильным год назад, сегодня может быть ошибкой.
2. **Сложные нормы.** Многие правила длинные и технические, с многочисленными исключениями.
3. **Неясные определения.** Одну и ту же норму можно читать по-разному, что порождает споры с налоговой.

> !przyklad Фирма годами учитывает определённый расход как затраты. После изменения закона он перестаёт быть налоговыми расходами. Если бухгалтер этого не заметит, при проверке возникнет недоимка с процентами. Право изменилось, а фирма не отреагировала.

## Как фирма может защититься
- **Следить за изменениями** норм и пользоваться помощью налоговых консультантов.
- **Спрашивать налоговую**: при сомнениях можно запросить [[interpretacja-indywidualna|индивидуальное разъяснение]]. Следование ему защищает налогоплательщика, даже если позже оно будет изменено.
- **Документировать решения**: иметь доказательства, почему выбран данный способ расчёта.

> !uwaga Несоблюдение налогового права грозит не только уплатой недоимки с процентами, но и штрафами, а то и уголовно-фискальной ответственностью (Уголовно-фискальный кодекс, Kodeks karny skarbowy).

## Значение правовой плоскости
Предприниматель должен одновременно **знать и соблюдать право** и **уметь реагировать на его изменения**. Это требует постоянного внимания, поэтому многие фирмы пользуются услугами бухгалтерских бюро и консультантов. Стоимость такой помощи обычно ниже стоимости ошибки.

> !zapamietaj Налоговое окружение — все налоговые факторы, влияющие на фирму. В правовой плоскости главные риски — **частые изменения**, **сложность** и **неясность** норм. Защита — знания, разъяснения и документация.`,
          },
          quiz: [
            { q: { pl: "Otoczenie podatkowe przedsiębiorstwa to:", ru: "Налоговое окружение предприятия — это:" },
              a: [{ pl: "wyłącznie wysokość podatku CIT", ru: "только размер налога CIT" }, { pl: "budynek urzędu skarbowego", ru: "здание налоговой инспекции" }, { pl: "całokształt czynników podatkowych wpływających na funkcjonowanie firmy", ru: "совокупность налоговых факторов, влияющих на работу фирмы" }, { pl: "lista kontrahentów firmy", ru: "список контрагентов фирмы" }],
              correct: 2, why: { pl: "To szerokie pojęcie: prawo, finanse, gospodarka, organizacja, rynek międzynarodowy i etyka.", ru: "Это широкое понятие: право, финансы, экономика, организация, международный рынок и этика." } },
            { q: { pl: "Które cechy prawa podatkowego materiały wskazują jako źródło ryzyka dla firmy?", ru: "Какие черты налогового права материалы называют источником риска для фирмы?" },
              a: [{ pl: "Częste zmiany, skomplikowane przepisy, niejasne definicje", ru: "Частые изменения, сложные нормы, неясные определения" }, { pl: "Niskie stawki i brak kontroli", ru: "Низкие ставки и отсутствие проверок" }, { pl: "Brak przepisów o VAT", ru: "Отсутствие норм о VAT" }, { pl: "Stałość przepisów od 1990 r.", ru: "Неизменность норм с 1990 г." }],
              correct: 0, why: { pl: "Te trzy cechy sprawiają, że łatwo o błąd i spór z organem.", ru: "Эти три черты делают ошибку и спор с органом весьма вероятными." } },
            { q: { pl: "Co grozi firmie za brak zgodności z prawem podatkowym?", ru: "Что грозит фирме за несоблюдение налогового права?" },
              a: [{ pl: "Tylko upomnienie ustne", ru: "Только устное замечание" }, { pl: "Nic, jeśli firma jest mała", ru: "Ничего, если фирма маленькая" }, { pl: "Wyłącznie utrata klientów", ru: "Только потеря клиентов" }, { pl: "Zaległość z odsetkami, kary finansowe, a nawet odpowiedzialność karna skarbowa", ru: "Недоимка с процентами, штрафы и даже уголовно-фискальная ответственность" }],
              correct: 3, why: { pl: "Materiały wymieniają kary finansowe i odpowiedzialność karną skarbową jako konsekwencje braku zgodności.", ru: "Материалы называют штрафы и уголовно-фискальную ответственность последствиями несоблюдения." } },
            { q: { pl: "Jakie narzędzie pozwala firmie zapytać organ o skutki podatkowe konkretnej sytuacji?", ru: "Какой инструмент позволяет фирме спросить орган о налоговых последствиях конкретной ситуации?" },
              a: [{ pl: "Protokół kontroli", ru: "Протокол проверки" }, { pl: "Interpretacja indywidualna", ru: "Индивидуальное разъяснение" }, { pl: "Deklaracja VAT", ru: "Декларация VAT" }, { pl: "Uchwała rady gminy", ru: "Решение совета гмины" }],
              correct: 1, why: { pl: "Interpretację indywidualną wydaje na wniosek Dyrektor KIS; zastosowanie się do niej chroni podatnika.", ru: "Индивидуальное разъяснение по заявлению выдаёт директор KIS; следование ему защищает налогоплательщика." } },
          ],
        },
        // ------------------------------------------------------------------ 2.2
        {
          id: "2.2",
          title: { pl: "Płaszczyzna finansowa i ekonomiczna", ru: "Финансовая и экономическая плоскости" },
          src: "Płaszczyzny otoczenia przedsiębiorstwa (dr M. Łyszkiewicz): płaszczyzna finansowa, płaszczyzna ekonomiczna",
          body: {
            pl: `Podatki to dla firmy przede wszystkim pieniądze, które wychodzą z konta. Ale wpływają też na to, ile firma może zainwestować, czy jest konkurencyjna i jak zachowuje się cała gospodarka.

## Płaszczyzna finansowa
### Struktura kosztów
Podatki są częścią kosztów działalności. Niektóre są kosztem bezpośrednio (np. [[podatek-od-nieruchomosci|podatek od nieruchomości]]), inne zmniejszają zysk (CIT, PIT).

### Płynność finansowa
Podatki wpływają na to, czy firma ma gotówkę na bieżące wydatki:
- **VAT** trzeba wpłacić w terminie, nawet jeśli kontrahent jeszcze nie zapłacił faktury,
- **zaliczki na CIT i PIT** są obowiązkowe co miesiąc lub co kwartał.

> !przyklad Firma wystawiła fakturę na 100 000 zł netto + 23 000 zł VAT z terminem płatności 60 dni. Deklarację VAT za ten miesiąc składa wcześniej i musi wpłacić VAT należny, choć pieniędzy od klienta jeszcze nie ma. Zabiera to gotówkę, którą mogła wydać na towar albo pensje.

### Wynik finansowy
Podatki dochodowe obciążają **zysk netto**. Im wyższy podatek, tym mniej zostaje na rozwój i inwestycje.

### Legalne możliwości optymalizacji
Materiały wymieniają kilka dozwolonych sposobów zmniejszenia obciążeń:

| Narzędzie | Jak działa |
|---|---|
| ulgi podatkowe | np. ulga B+R, ulga na robotyzację zmniejszają podstawę lub podatek |
| amortyzacja | koszt zakupu środka trwałego rozkłada się na lata i zmniejsza dochód |
| koszty uzyskania przychodów | odpowiednie ich kształtowanie i dokumentowanie obniża dochód |
| wybór formy opodatkowania | np. [[estonski-cit|CIT estoński]] lub [[ryczalt-ewidencjonowany|ryczałt]], jeśli pasują do firmy |

> !uwaga Błędy w rozliczeniach są kosztowne: trzeba zapłacić zaległość, **odsetki za zwłokę** i możliwe sankcje. Dlatego optymalizacja musi być zgodna z prawem i dobrze udokumentowana.

## Płaszczyzna ekonomiczna
### Podatki jako narzędzie polityki gospodarczej
Podatki są częścią [[polityka-fiskalna|polityki fiskalnej]] państwa. Wpływają na koniunkturę, poziom inwestycji i konsumpcji.

### Konkurencyjność
Wysokie podatki mogą osłabiać pozycję firm wobec zagranicznych konkurentów. Niskie mogą przyciągać inwestorów. Materiały podają przykład Irlandii, która przyciągała inwestorów stawką CIT 12,5%.

### Instrumenty prorozwojowe
Państwo może stosować preferencje: strefy ekonomiczne, zwolnienia dla nowych inwestycji, ulgi branżowe.

### Znaczenie makro i mikro

| Poziom | Wpływ podatków |
|---|---|
| **Makroekonomiczny** | zbyt wysokie podatki hamują inwestycje; zbyt niskie zmniejszają dochody budżetu i mogą prowadzić do zadłużenia państwa |
| **Mikroekonomiczny** | podatki wpływają na ceny towarów i usług, decyzje produkcyjne i poziom zatrudnienia |

> !przyklad Gdy rośnie akcyza na paliwo, firmy transportowe podnoszą ceny usług. Klienci płacą więcej, część z nich ogranicza zamówienia. Jeden podatek zmienia ceny, popyt i zatrudnienie w całej branży.

> !uwaga Optymalizacja podatkowa to wybór najkorzystniejszego rozwiązania, które prawo przewiduje. Uchylanie się od opodatkowania (ukrywanie przychodów, fikcyjne koszty) jest przestępstwem skarbowym. Granica bywa cienka, dlatego przy nietypowych rozwiązaniach warto zapytać urząd o interpretację.

## Jak to się łączy
Płaszczyzna finansowa patrzy na podatki „od środka firmy”: koszty, gotówka, zysk. Ekonomiczna patrzy „z zewnątrz”: rynek, konkurencja, gospodarka. Dobry menedżer bierze pod uwagę obie. Decyzja o inwestycji zależy od tego, ile podatku zapłaci firma, ale też od tego, czy państwo daje ulgi, i od tego, co robią konkurenci w innych krajach.

> !zapamietaj Na płaszczyźnie finansowej podatki wpływają na **koszty, płynność i wynik**. Na ekonomicznej na **konkurencyjność, inwestycje, ceny i zatrudnienie**. Legalna optymalizacja to ulgi, amortyzacja, koszty i wybór formy opodatkowania.`,
            ru: `Налоги для фирмы — прежде всего деньги, уходящие со счёта. Но они влияют и на то, сколько фирма может инвестировать, насколько она конкурентоспособна и как ведёт себя вся экономика.

## Финансовая плоскость
### Структура издержек
Налоги — часть издержек деятельности. Одни являются расходом напрямую (например, [[podatek-od-nieruchomosci|налог на недвижимость]]), другие уменьшают прибыль (CIT, PIT).

### Финансовая ликвидность
Налоги влияют на то, есть ли у фирмы деньги на текущие расходы:
- **VAT** нужно уплатить в срок, даже если контрагент ещё не оплатил счёт-фактуру,
- **авансы по CIT и PIT** обязательны ежемесячно или ежеквартально.

> !przyklad Фирма выставила счёт-фактуру на 100 000 зл нетто + 23 000 зл VAT со сроком оплаты 60 дней. Декларацию VAT за этот месяц она подаёт раньше и должна уплатить начисленный VAT, хотя денег от клиента ещё нет. Это забирает деньги, которые можно было потратить на товар или зарплаты.

### Финансовый результат
Подоходные налоги уменьшают **чистую прибыль**. Чем выше налог, тем меньше остаётся на развитие и инвестиции.

### Законные возможности оптимизации
Материалы называют несколько допустимых способов снизить нагрузку:

| Инструмент | Как работает |
|---|---|
| налоговые льготы | например, льгота на НИОКР (B+R), льгота на роботизацию уменьшают базу или налог |
| амортизация | стоимость покупки основного средства распределяется на годы и уменьшает доход |
| расходы на получение дохода | их правильное формирование и документирование снижает доход |
| выбор формы налогообложения | например [[estonski-cit|эстонский CIT]] или [[ryczalt-ewidencjonowany|ryczałt]], если они подходят фирме |

> !uwaga Ошибки в расчётах дороги: нужно уплатить недоимку, **проценты за просрочку** и возможные санкции. Поэтому оптимизация должна быть законной и хорошо задокументированной.

## Экономическая плоскость
### Налоги как инструмент экономической политики
Налоги — часть [[polityka-fiskalna|фискальной политики]] государства. Они влияют на конъюнктуру, уровень инвестиций и потребления.

### Конкурентоспособность
Высокие налоги могут ослаблять позицию фирм по сравнению с иностранными конкурентами. Низкие могут привлекать инвесторов. Материалы приводят пример Ирландии, которая привлекала инвесторов ставкой CIT 12,5%.

### Проразвивающие инструменты
Государство может применять преференции: экономические зоны, освобождения для новых инвестиций, отраслевые льготы.

### Макро- и микрозначение

| Уровень | Влияние налогов |
|---|---|
| **Макроэкономический** | слишком высокие налоги тормозят инвестиции; слишком низкие уменьшают доходы бюджета и могут вести к росту госдолга |
| **Микроэкономический** | налоги влияют на цены товаров и услуг, производственные решения и уровень занятости |

> !przyklad Когда растёт акциз на топливо, транспортные фирмы поднимают цены на услуги. Клиенты платят больше, часть из них сокращает заказы. Один налог меняет цены, спрос и занятость во всей отрасли.

> !uwaga Налоговая оптимизация — выбор самого выгодного решения из предусмотренных законом. Уклонение от налогов (сокрытие выручки, фиктивные расходы) — фискальное преступление. Граница бывает тонкой, поэтому при нестандартных решениях стоит запросить у налоговой разъяснение.

## Как это связано
Финансовая плоскость смотрит на налоги «изнутри фирмы»: издержки, деньги, прибыль. Экономическая — «снаружи»: рынок, конкуренция, экономика. Хороший менеджер учитывает обе. Решение об инвестиции зависит от того, сколько налога заплатит фирма, но и от того, даёт ли государство льготы, и от того, что делают конкуренты в других странах.

> !zapamietaj В финансовой плоскости налоги влияют на **издержки, ликвидность и результат**. В экономической — на **конкурентоспособность, инвестиции, цены и занятость**. Законная оптимизация — это льготы, амортизация, расходы и выбор формы налогообложения.`,
          },
          quiz: [
            { q: { pl: "Dlaczego VAT może pogorszyć płynność finansową firmy?", ru: "Почему VAT может ухудшить ликвидность фирмы?" },
              a: [{ pl: "Bo VAT jest kosztem uzyskania przychodu", ru: "Потому что VAT — расход на получение дохода" }, { pl: "Bo VAT trzeba wpłacić w terminie, nawet jeśli klient jeszcze nie zapłacił faktury", ru: "Потому что VAT нужно уплатить в срок, даже если клиент ещё не оплатил счёт" }, { pl: "Bo VAT płaci się raz na 5 lat", ru: "Потому что VAT платится раз в 5 лет" }, { pl: "Bo VAT nie podlega odliczeniu", ru: "Потому что VAT не подлежит вычету" }],
              correct: 1, why: { pl: "Termin zapłaty VAT nie zależy od tego, czy kontrahent zapłacił. Firma może więc „kredytować” podatek z własnych pieniędzy.", ru: "Срок уплаты VAT не зависит от того, заплатил ли контрагент. Фирма может «кредитовать» налог из своих денег." } },
            { q: { pl: "Który z wymienionych sposobów NIE jest legalną optymalizacją wskazaną w materiałach?", ru: "Какой из способов НЕ является законной оптимизацией, указанной в материалах?" },
              a: [{ pl: "Korzystanie z ulgi B+R", ru: "Использование льготы B+R" }, { pl: "Amortyzacja środków trwałych", ru: "Амортизация основных средств" }, { pl: "Niewystawianie faktur za sprzedaż", ru: "Невыставление счетов за продажи" }, { pl: "Wybór formy opodatkowania", ru: "Выбор формы налогообложения" }],
              correct: 2, why: { pl: "Ukrywanie sprzedaży to uchylanie się od opodatkowania, a nie optymalizacja. Grozi zaległością, karami i odpowiedzialnością karną skarbową.", ru: "Сокрытие продаж — уклонение от налогов, а не оптимизация. Грозит недоимкой, штрафами и уголовно-фискальной ответственностью." } },
            { q: { pl: "Jaki jest makroekonomiczny skutek zbyt niskich podatków według materiałów?", ru: "Каков макроэкономический эффект слишком низких налогов по материалам?" },
              a: [{ pl: "Spadek dochodów budżetu i możliwy wzrost zadłużenia państwa", ru: "Снижение доходов бюджета и возможный рост госдолга" }, { pl: "Automatyczny wzrost inflacji do zera", ru: "Автоматическое падение инфляции до нуля" }, { pl: "Zakaz inwestycji", ru: "Запрет инвестиций" }, { pl: "Brak jakichkolwiek skutków", ru: "Никаких последствий" }],
              correct: 0, why: { pl: "Zbyt wysokie podatki hamują inwestycje, a zbyt niskie zmniejszają dochody budżetu i mogą prowadzić do zadłużenia.", ru: "Слишком высокие налоги тормозят инвестиции, слишком низкие — уменьшают доходы бюджета и могут вести к долгам." } },
            { q: { pl: "Na poziomie mikroekonomicznym podatki wpływają przede wszystkim na:", ru: "На микроэкономическом уровне налоги влияют прежде всего на:" },
              a: [{ pl: "kurs euro", ru: "курс евро" }, { pl: "liczbę posłów w Sejmie", ru: "число депутатов Сейма" }, { pl: "wysokość PKB innych krajów", ru: "ВВП других стран" }, { pl: "ceny, decyzje produkcyjne i zatrudnienie w firmie", ru: "цены, производственные решения и занятость в фирме" }],
              correct: 3, why: { pl: "Na poziomie pojedynczej firmy podatki zmieniają ceny, decyzje o produkcji i liczbę zatrudnionych.", ru: "На уровне отдельной фирмы налоги меняют цены, решения о производстве и число работников." } },
          ],
        },
        // ------------------------------------------------------------------ 2.3
        {
          id: "2.3",
          title: { pl: "Płaszczyzny organizacyjna, międzynarodowa i społeczno-etyczna", ru: "Организационная, международная и социально-этическая плоскости" },
          src: "Płaszczyzny otoczenia przedsiębiorstwa (dr M. Łyszkiewicz): płaszczyzna organizacyjna, międzynarodowa, społeczna i etyczna",
          body: {
            pl: `Podatki to także praca: księgi, deklaracje, pliki do urzędu, kontrole. Coraz więcej firm działa za granicą, a klienci patrzą, czy firma uczciwie płaci podatki. To trzy kolejne płaszczyzny otoczenia podatkowego.

## Płaszczyzna organizacyjna
### Obowiązki firmy
Przedsiębiorstwo musi:
- prowadzić **księgi rachunkowe** albo **podatkową księgę przychodów i rozchodów** (KPiR),
- sporządzać **sprawozdania**,
- składać **deklaracje**, np. [[jpk|JPK]] (w tym JPK_V7 z deklaracją VAT), zeznanie roczne CIT-8.

### Rola księgowości
Przepisy są coraz bardziej skomplikowane, więc firmy zatrudniają księgowych albo korzystają z biur rachunkowych.

### Kontrole
Przedsiębiorca musi być przygotowany na [[kontrola-podatkowa|kontrolę]] urzędu skarbowego. Kontrola może sprawdzić nie tylko dokumenty, ale też **realność transakcji**, czyli czy opisane w fakturach zdarzenia naprawdę miały miejsce.

### Odpowiedzialność
Za błędy może odpowiadać nie tylko firma, ale też konkretne osoby, np. członkowie zarządu (także odpowiedzialność karna skarbowa).

### Cyfryzacja
Coraz więcej obowiązków wykonuje się elektronicznie: JPK, e-faktury, Krajowy System e-Faktur (KSeF).

> !przyklad Mała spółka handlowa co miesiąc wysyła plik JPK_V7M z ewidencją i deklaracją VAT, raz w roku składa CIT-8, a od wprowadzenia KSeF wystawia faktury przez system rządowy. Bez programu księgowego i osoby, która go obsługuje, nie dałaby rady.

## Płaszczyzna międzynarodowa
Firmy działające globalnie mierzą się z dodatkowymi problemami:

| Zagadnienie | O co chodzi |
|---|---|
| [[podwojne-opodatkowanie|Unikanie podwójnego opodatkowania]] | dzięki umowom międzynarodowym ten sam dochód nie jest opodatkowany dwa razy (w Polsce i w kraju kontrahenta) |
| VAT w UE | szczególne zasady handlu wewnątrzunijnego: WDT (wewnątrzwspólnotowa dostawa towarów) i WNT (wewnątrzwspólnotowe nabycie towarów) |
| Raje podatkowe | niektóre firmy przenoszą działalność do krajów o niskich podatkach, a państwa coraz mocniej z tym walczą |
| OECD BEPS i dyrektywy UE | mają ograniczać transfer zysków i agresywną optymalizację |
| Kursy walut i cła | dochodzi ryzyko walutowe i dodatkowe obciążenia |

> !uwaga Legalne korzystanie z umów o unikaniu podwójnego opodatkowania to co innego niż sztuczne przenoszenie zysków do raju podatkowego. To drugie państwa zwalczają m.in. przepisami wynikającymi z projektu BEPS i dyrektyw ATAD.

## Płaszczyzna społeczna i etyczna
Społeczeństwo oczekuje, że firmy będą uczciwie płacić podatki.
- **CSR w podatkach:** część dużych korporacji publikuje raporty podatkowe, pokazując, ile zapłaciła do budżetu.
- **Etyka:** unikanie podatków przez raje podatkowe często spotyka się z krytyką, a nawet bojkotami konsumentów.
- **Szara strefa:** firmy działające poza systemem są zagrożeniem dla uczciwych, bo zaniżają ceny dzięki niepłaceniu podatków.
- **Reputacja:** rzetelne płacenie podatków buduje zaufanie klientów i partnerów.

> !przyklad Dwa warsztaty samochodowe w tym samym mieście. Jeden płaci VAT i podatki, drugi pracuje „na czarno” i jest o 20% tańszy. Uczciwy warsztat traci klientów, choć jest lepiej zorganizowany. To pokazuje, dlaczego szara strefa szkodzi konkurencji.

### Dylemat przedsiębiorcy
Jak znaleźć równowagę między **minimalizacją podatków** a **odpowiedzialnością wobec państwa i społeczeństwa**? Prawo pozwala wybierać korzystniejsze rozwiązania, ale firma musi też pamiętać o swoim wizerunku i o tym, że z podatków finansowane są drogi, szkoły i szpitale, z których sama korzysta.

> !zapamietaj Płaszczyzna organizacyjna to **obowiązki ewidencyjne, deklaracje, kontrole i cyfryzacja** (JPK, KSeF). Międzynarodowa to **podwójne opodatkowanie, VAT w UE, raje podatkowe, BEPS**. Społeczna to **uczciwość, szara strefa i reputacja**.`,
            ru: `Налоги — это и работа: книги учёта, декларации, файлы для налоговой, проверки. Всё больше фирм работает за рубежом, а клиенты смотрят, честно ли фирма платит налоги. Это ещё три плоскости налогового окружения.

## Организационная плоскость
### Обязанности фирмы
Предприятие должно:
- вести **бухгалтерские книги** или **налоговую книгу доходов и расходов** (KPiR),
- составлять **отчёты**,
- подавать **декларации**, например [[jpk|JPK]] (в том числе JPK_V7 с декларацией VAT), годовую декларацию CIT-8.

### Роль бухгалтерии
Нормы всё сложнее, поэтому фирмы нанимают бухгалтеров или пользуются услугами бухгалтерских бюро.

### Проверки
Предприниматель должен быть готов к [[kontrola-podatkowa|проверке]] налоговой инспекции. Проверка может касаться не только документов, но и **реальности сделок**, то есть того, действительно ли описанные в счетах события имели место.

### Ответственность
За ошибки может отвечать не только фирма, но и конкретные лица, например члены правления (в том числе уголовно-фискальная ответственность).

### Цифровизация
Всё больше обязанностей выполняется электронно: JPK, электронные счета-фактуры, Национальная система электронных счетов (KSeF).

> !przyklad Небольшая торговая компания ежемесячно отправляет файл JPK_V7M с реестром и декларацией VAT, раз в год подаёт CIT-8, а после введения KSeF выставляет счета через государственную систему. Без бухгалтерской программы и человека, который с ней работает, она бы не справилась.

## Международная плоскость
Фирмы, работающие глобально, сталкиваются с дополнительными проблемами:

| Вопрос | В чём суть |
|---|---|
| [[podwojne-opodatkowanie|Избежание двойного налогообложения]] | благодаря международным соглашениям один и тот же доход не облагается дважды (в Польше и в стране контрагента) |
| VAT в ЕС | особые правила внутрисоюзной торговли: WDT (внутрисоюзная поставка товаров) и WNT (внутрисоюзное приобретение товаров) |
| Налоговые гавани | некоторые фирмы переносят деятельность в страны с низкими налогами, а государства всё активнее с этим борются |
| OECD BEPS и директивы ЕС | направлены на ограничение переноса прибыли и агрессивной оптимизации |
| Курсы валют и пошлины | добавляются валютный риск и дополнительная нагрузка |

> !uwaga Законное использование соглашений об избежании двойного налогообложения — не то же самое, что искусственный перенос прибыли в налоговую гавань. С последним государства борются, в частности, нормами проекта BEPS и директив ATAD.

## Социальная и этическая плоскость
Общество ожидает, что фирмы будут честно платить налоги.
- **CSR в налогах:** часть крупных корпораций публикует налоговые отчёты, показывая, сколько они заплатили в бюджет.
- **Этика:** уход от налогов через налоговые гавани часто вызывает критику и даже бойкоты потребителей.
- **Теневая экономика:** фирмы вне системы угрожают честным, так как занижают цены за счёт неуплаты налогов.
- **Репутация:** добросовестная уплата налогов укрепляет доверие клиентов и партнёров.

> !przyklad Две автомастерские в одном городе. Одна платит VAT и налоги, другая работает «вчёрную» и дешевле на 20%. Честная мастерская теряет клиентов, хотя лучше организована. Это показывает, почему теневая экономика вредит конкуренции.

### Дилемма предпринимателя
Как найти баланс между **минимизацией налогов** и **ответственностью перед государством и обществом**? Право позволяет выбирать более выгодные решения, но фирма должна помнить о своей репутации и о том, что из налогов финансируются дороги, школы и больницы, которыми она сама пользуется.

> !zapamietaj Организационная плоскость — это **учётные обязанности, декларации, проверки и цифровизация** (JPK, KSeF). Международная — **двойное налогообложение, VAT в ЕС, налоговые гавани, BEPS**. Социальная — **честность, теневая экономика и репутация**.`,
          },
          quiz: [
            { q: { pl: "Co oznacza skrót KSeF?", ru: "Что означает аббревиатура KSeF?" },
              a: [{ pl: "Krajowy System e-Faktur", ru: "Национальная система электронных счетов-фактур" }, { pl: "Krajowa Służba Finansowa", ru: "Национальная финансовая служба" }, { pl: "Komisja Skarbowa Funduszy", ru: "Казначейская комиссия фондов" }, { pl: "Kodeks Spółek Finansowych", ru: "Кодекс финансовых компаний" }],
              correct: 0, why: { pl: "KSeF to rządowy system do wystawiania i odbierania faktur ustrukturyzowanych, element cyfryzacji podatków.", ru: "KSeF — государственная система выставления и получения структурированных счетов, элемент цифровизации налогов." } },
            { q: { pl: "Kontrola podatkowa może sprawdzać:", ru: "Налоговая проверка может проверять:" },
              a: [{ pl: "wyłącznie terminowość wpłat", ru: "только своевременность платежей" }, { pl: "tylko dane osobowe właściciela", ru: "только персональные данные владельца" }, { pl: "nie tylko dokumenty, ale też realność transakcji", ru: "не только документы, но и реальность сделок" }, { pl: "jedynie wygląd biura", ru: "только внешний вид офиса" }],
              correct: 2, why: { pl: "Materiały podkreślają, że kontrola bada również, czy transakcje opisane w dokumentach naprawdę się odbyły.", ru: "Материалы подчёркивают, что проверка исследует и то, действительно ли сделки из документов имели место." } },
            { q: { pl: "Jaki jest cel umów o unikaniu podwójnego opodatkowania?", ru: "Какова цель соглашений об избежании двойного налогообложения?" },
              a: [{ pl: "Podwojenie wpływów obu państw", ru: "Удвоение поступлений обоих государств" }, { pl: "Zniesienie VAT w UE", ru: "Отмена VAT в ЕС" }, { pl: "Zakaz handlu z zagranicą", ru: "Запрет внешней торговли" }, { pl: "Żeby ten sam dochód nie był opodatkowany dwa razy w dwóch krajach", ru: "Чтобы один и тот же доход не облагался дважды в двух странах" }],
              correct: 3, why: { pl: "Umowy dzielą prawo do opodatkowania między państwo rezydencji i państwo źródła.", ru: "Соглашения распределяют право налогообложения между государством резидентства и государством источника." } },
            { q: { pl: "Dlaczego szara strefa szkodzi uczciwym przedsiębiorcom?", ru: "Почему теневая экономика вредит честным предпринимателям?" },
              a: [{ pl: "Bo firmy z szarej strefy zaniżają ceny dzięki niepłaceniu podatków", ru: "Потому что теневые фирмы занижают цены за счёт неуплаты налогов" }, { pl: "Bo płaci więcej podatków niż legalne firmy", ru: "Потому что платит больше налогов, чем легальные фирмы" }, { pl: "Bo zawsze ma lepszą jakość", ru: "Потому что всегда лучше по качеству" }, { pl: "Nie szkodzi", ru: "Не вредит" }],
              correct: 0, why: { pl: "Niepłacenie podatków daje nieuczciwą przewagę cenową i zniekształca konkurencję.", ru: "Неуплата налогов даёт нечестное ценовое преимущество и искажает конкуренцию." } },
            { q: { pl: "Co oznaczają skróty WDT i WNT?", ru: "Что означают аббревиатуры WDT и WNT?" },
              a: [{ pl: "Rodzaje podatku od nieruchomości", ru: "Виды налога на недвижимость" }, { pl: "Wewnątrzwspólnotową dostawę i wewnątrzwspólnotowe nabycie towarów", ru: "Внутрисоюзную поставку и внутрисоюзное приобретение товаров" }, { pl: "Formy opodatkowania JDG", ru: "Формы налогообложения JDG" }, { pl: "Organy kontroli celno-skarbowej", ru: "Органы таможенно-налогового контроля" }],
              correct: 1, why: { pl: "To pojęcia VAT dotyczące handlu towarami między państwami UE.", ru: "Это понятия VAT, касающиеся торговли товарами между странами ЕС." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Podatki w otoczeniu firmy mają podwójną naturę, ponieważ są:", ru: "Налоги в окружении фирмы имеют двойную природу, так как являются:" },
          a: [{ pl: "obciążeniem finansowym i instrumentem kształtującym warunki gospodarowania", ru: "финансовой нагрузкой и инструментом, формирующим условия хозяйствования" }, { pl: "dobrowolne i obowiązkowe jednocześnie", ru: "одновременно добровольными и обязательными" }, { pl: "tylko lokalne i tylko unijne", ru: "только местными и только европейскими" }, { pl: "przychodem i kosztem firmy", ru: "доходом и расходом фирмы" }],
          correct: 0, why: { pl: "Podatek zmniejsza zysk, ale też jest narzędziem państwa wpływającym na decyzje firm.", ru: "Налог уменьшает прибыль, но это и инструмент государства, влияющий на решения фирм." } },
        { q: { pl: "Które z poniższych NIE jest źródłem prawa na płaszczyźnie prawnej wymienionym w materiałach?", ru: "Что из ниже перечисленного НЕ является источником права в правовой плоскости по материалам?" },
          a: [{ pl: "Konstytucja", ru: "Конституция" }, { pl: "Ustawy podatkowe", ru: "Налоговые законы" }, { pl: "Regulamin wewnętrzny firmy", ru: "Внутренний регламент фирмы" }, { pl: "Prawo unijne", ru: "Право ЕС" }],
          correct: 2, why: { pl: "Materiały wymieniają Konstytucję, ustawy, rozporządzenia, interpretacje i prawo UE. Regulamin firmy nie tworzy prawa podatkowego.", ru: "Материалы называют Конституцию, законы, распоряжения, разъяснения и право ЕС. Регламент фирмы налогового права не создаёт." } },
        { q: { pl: "Zaliczki na CIT i PIT wpływają przede wszystkim na:", ru: "Авансы по CIT и PIT влияют прежде всего на:" },
          a: [{ pl: "reputację firmy", ru: "репутацию фирмы" }, { pl: "płynność finansową", ru: "финансовую ликвидность" }, { pl: "kurs walut", ru: "курс валют" }, { pl: "liczbę kontroli", ru: "количество проверок" }],
          correct: 1, why: { pl: "Zaliczki płaci się regularnie w trakcie roku, więc zabierają gotówkę z bieżącej działalności.", ru: "Авансы платят регулярно в течение года, поэтому они забирают деньги из текущей деятельности." } },
        { q: { pl: "Irlandia jest w materiałach przykładem kraju, który:", ru: "Ирландия в материалах — пример страны, которая:" },
          a: [{ pl: "zlikwidował VAT", ru: "отменила VAT" }, { pl: "wprowadził najwyższe podatki w UE", ru: "ввела самые высокие налоги в ЕС" }, { pl: "nie ma umów podatkowych", ru: "не имеет налоговых соглашений" }, { pl: "przyciągał inwestorów niską stawką CIT 12,5%", ru: "привлекала инвесторов низкой ставкой CIT 12,5%" }],
          correct: 3, why: { pl: "Niska stawka CIT była narzędziem konkurencji podatkowej o inwestorów.", ru: "Низкая ставка CIT была инструментом налоговой конкуренции за инвесторов." } },
        { q: { pl: "Amortyzacja jako narzędzie optymalizacji polega na tym, że:", ru: "Амортизация как инструмент оптимизации заключается в том, что:" },
          a: [{ pl: "koszt zakupu środka trwałego rozkłada się na lata i zmniejsza dochód", ru: "стоимость основного средства распределяется на годы и уменьшает доход" }, { pl: "nie płaci się VAT od zakupu", ru: "не платится VAT с покупки" }, { pl: "firma otrzymuje dotację z gminy", ru: "фирма получает дотацию от гмины" }, { pl: "obniża się stawkę CIT", ru: "снижается ставка CIT" }],
          correct: 0, why: { pl: "Odpisy amortyzacyjne są kosztem podatkowym, więc obniżają podstawę opodatkowania w kolejnych latach.", ru: "Амортизационные отчисления — налоговые расходы, поэтому снижают налоговую базу в следующие годы." } },
        { q: { pl: "Do płaszczyzny organizacyjnej należy:", ru: "К организационной плоскости относится:" },
          a: [{ pl: "konkurencja podatkowa państw", ru: "налоговая конкуренция государств" }, { pl: "prowadzenie ksiąg i składanie deklaracji (np. JPK, CIT-8)", ru: "ведение книг и подача деклараций (например, JPK, CIT-8)" }, { pl: "bojkot konsumencki", ru: "потребительский бойкот" }, { pl: "kurs euro", ru: "курс евро" }],
          correct: 1, why: { pl: "Płaszczyzna organizacyjna obejmuje obowiązki ewidencyjne, sprawozdawcze, kontrole i cyfryzację.", ru: "Организационная плоскость охватывает учётные и отчётные обязанности, проверки и цифровизацию." } },
        { q: { pl: "Kto może odpowiadać za błędy podatkowe spółki obok samej spółki?", ru: "Кто может отвечать за налоговые ошибки компании наряду с самой компанией?" },
          a: [{ pl: "Klienci spółki", ru: "Клиенты компании" }, { pl: "Urząd gminy", ru: "Администрация гмины" }, { pl: "Osoby odpowiedzialne, np. członkowie zarządu", ru: "Ответственные лица, например члены правления" }, { pl: "Nikt", ru: "Никто" }],
          correct: 2, why: { pl: "Materiały wskazują, że odpowiada zarówno firma, jak i osoby odpowiedzialne, w tym karnie skarbowo.", ru: "Материалы указывают, что отвечает и фирма, и ответственные лица, в том числе в уголовно-фискальном порядке." } },
        { q: { pl: "Projekt OECD BEPS ma na celu:", ru: "Проект OECD BEPS направлен на:" },
          a: [{ pl: "obniżenie VAT", ru: "снижение VAT" }, { pl: "zniesienie ceł", ru: "отмену пошлин" }, { pl: "ułatwienie zakładania firm", ru: "упрощение регистрации фирм" }, { pl: "ograniczenie transferu zysków i agresywnej optymalizacji", ru: "ограничение переноса прибыли и агрессивной оптимизации" }],
          correct: 3, why: { pl: "BEPS (Base Erosion and Profit Shifting) to walka z erozją podstawy opodatkowania i przerzucaniem zysków.", ru: "BEPS (Base Erosion and Profit Shifting) — борьба с размыванием налоговой базы и переносом прибыли." } },
        { q: { pl: "Raport podatkowy publikowany przez korporację to przejaw:", ru: "Налоговый отчёт, публикуемый корпорацией, — проявление:" },
          a: [{ pl: "CSR w podatkach (płaszczyzna społeczna)", ru: "CSR в налогах (социальная плоскость)" }, { pl: "obowiązku JPK", ru: "обязанности JPK" }, { pl: "kontroli celno-skarbowej", ru: "таможенно-налогового контроля" }, { pl: "procedury zawieszenia akcyzy", ru: "процедуры приостановления акциза" }],
          correct: 0, why: { pl: "Firma pokazuje, ile zapłaciła do budżetu, budując zaufanie i reputację.", ru: "Фирма показывает, сколько заплатила в бюджет, укрепляя доверие и репутацию." } },
        { q: { pl: "Dylemat przedsiębiorcy na płaszczyźnie etycznej to:", ru: "Дилемма предпринимателя в этической плоскости — это:" },
          a: [{ pl: "wybór banku", ru: "выбор банка" }, { pl: "równowaga między minimalizacją podatków a odpowiedzialnością wobec państwa i społeczeństwa", ru: "баланс между минимизацией налогов и ответственностью перед государством и обществом" }, { pl: "wybór między VAT a akcyzą", ru: "выбор между VAT и акцизом" }, { pl: "zatrudnienie księgowej czy prawnika", ru: "нанять бухгалтера или юриста" }],
          correct: 1, why: { pl: "Materiały kończą płaszczyznę etyczną pytaniem o tę równowagę.", ru: "Материалы завершают этическую плоскость вопросом об этом балансе." } },
      ],
    },
    {
      n: 3,
      color: "--c3",
      title: { pl: "Podatki dochodowe", ru: "Подоходные налоги" },
      lead: {
        pl: "PIT i CIT od podstaw: kto płaci, od czego i według jakich stawek w 2026 r., czym CIT estoński różni się od klasycznego i jak przedsiębiorca wybiera formę opodatkowania JDG.",
        ru: "PIT и CIT с нуля: кто платит, с чего и по каким ставкам в 2026 г., чем эстонский CIT отличается от классического и как предприниматель выбирает форму налогообложения JDG.",
      },
      subs: [
        // ------------------------------------------------------------------ 3.1
        {
          id: "3.1",
          title: { pl: "PIT – podatek dochodowy od osób fizycznych", ru: "PIT — налог на доходы физических лиц" },
          src: "Podatki dochodowe 2026: PIT (podmiot, przedmiot, źródła przychodów, skala, ulgi, płatność); Wybór opodatkowania JDG 2026: skala podatkowa",
          body: {
            pl: `[[pit|PIT]] (*personal income tax*) to podatek, który płaci prawie każdy dorosły: pracownik, emeryt, przedsiębiorca, osoba wynajmująca mieszkanie. Reguluje go ustawa z 26 lipca 1991 r. o podatku dochodowym od osób fizycznych.

## Dochód: podstawowe pojęcie
W ustawie [[koszty-uzyskania|dochód]] to różnica między przychodem a kosztami jego uzyskania. Gdy koszty są wyższe niż przychód, powstaje **strata**.

$$ dochód = przychód − koszty uzyskania przychodu | Prawna definicja dochodu

Od dochodu odejmuje się jeszcze przysługujące **odliczenia** (np. składki ZUS, niektóre ulgi), i dopiero do tak obliczonej podstawy stosuje się stawkę.

## Kto płaci: obowiązek nieograniczony i ograniczony
- **Nieograniczony obowiązek:** osoba mająca miejsce zamieszkania w Polsce płaci od **całości** dochodów, także zagranicznych.
- **Ograniczony obowiązek:** osoba bez miejsca zamieszkania w Polsce płaci tylko od dochodów osiągniętych **w Polsce**.

## Źródła przychodów
Ustawa wymienia m.in.: stosunek pracy i stosunek służbowy, działalność wykonywaną osobiście, pozarolniczą działalność gospodarczą, działy specjalne produkcji rolnej, najem i dzierżawę, kapitały pieniężne i prawa majątkowe, odpłatne zbycie nieruchomości i innych rzeczy oraz „inne źródła”.

## Skala podatkowa w 2026 r.

| Dochód roczny | Podatek |
|---|---|
| do 120 000 zł | 12% minus kwota zmniejszająca podatek 3 600 zł |
| ponad 120 000 zł | 10 800 zł + 32% nadwyżki ponad 120 000 zł |

[[kwota-wolna|Kwota wolna]] wynosi **30 000 zł**: kto zarobi mniej, nie płaci podatku. Liczba 10 800 zł to podatek od pierwszych 120 000 zł już po uwzględnieniu kwoty wolnej (14 400 − 3 600).

> !przyklad Dochód 150 000 zł. Podatek = 10 800 zł + 32% × 30 000 zł = 10 800 + 9 600 = **20 400 zł**. Stawka 32% dotyczy tylko 30 000 zł nadwyżki.

Bardzo wysokie dochody obciąża dodatkowo **danina solidarnościowa**: 4% od nadwyżki dochodów ponad 1 000 000 zł.

## Inne formy opodatkowania
Oprócz skali przedsiębiorcy mogą wybrać [[podatek-liniowy|podatek liniowy 19%]] albo formy zryczałtowane: [[ryczalt-ewidencjonowany|ryczałt od przychodów ewidencjonowanych]] i (tylko kontynuujący) [[karta-podatkowa|kartę podatkową]]. Wybór formy to temat podtematu 3.4.

## Wspólne rozliczenie i samotny rodzic
- **Małżonkowie** mogą rozliczyć się wspólnie, jeśli przez cały rok byli w małżeństwie i mieli wspólność majątkową, a żaden nie korzystał z ryczałtu, karty ani liniowego. Od 2022 r. można też rozliczyć się wspólnie za rok zawarcia małżeństwa (gdy małżeństwo i wspólność trwały do końca roku). Dochody się sumuje, dzieli na pół, liczy podatek i mnoży przez 2. To się opłaca, gdy dochody małżonków bardzo się różnią.
- **Osoba samotnie wychowująca dziecko** rozlicza się w podobny sposób: od połowy dochodu, a podatek mnoży przez 2.

> !uwaga Splitting z małżonkiem działa tylko na skali podatkowej. Kto wybrał podatek liniowy, traci tę możliwość.

## Ulgi i zwolnienia
Materiały dzielą ulgi na grupy: związane z kosztami (np. składki), z kosztami egzystencji (np. rehabilitacyjna), rodzinne (ulga na dzieci), stymulacyjne (darowizny, B+R, termomodernizacyjna, na robotyzację, na terminal), techniczne, a także ulgę na powrót i zwolnienie dla osób do 26. roku życia.

Część ulg odlicza się **od dochodu** (np. rehabilitacyjna, internetowa, termomodernizacyjna), a część **od podatku** (np. ulga prorodzinna).

> !przyklad Ulga prorodzinna na pierwsze i drugie dziecko wynosi według materiałów 1 112,04 zł rocznie na każde. Rodzic dwójki dzieci odejmuje od podatku 2 224,08 zł.

## Jak płaci się PIT
- **Przez płatnika** w trakcie roku: zaliczki z pensji pobiera pracodawca.
- **Samodzielnie** w trakcie roku: przedsiębiorca wpłaca zaliczki miesięczne lub kwartalne.
- **Przy rozliczeniu rocznym**: podatnik składa zeznanie i dopłaca różnicę albo dostaje zwrot.

> !zapamietaj PIT 2026: skala **12% i 32%**, próg **120 000 zł**, kwota wolna **30 000 zł** (kwota zmniejszająca **3 600 zł**). Liniowy **19%**. Danina solidarnościowa **4%** od nadwyżki ponad 1 mln zł.`,
            ru: `[[pit|PIT]] (*personal income tax*) — налог, который платит почти каждый взрослый: работник, пенсионер, предприниматель, человек, сдающий квартиру. Его регулирует закон от 26 июля 1991 г. о налоге на доходы физических лиц.

## Доход: базовое понятие
В законе [[koszty-uzyskania|доход]] — разница между выручкой (przychód) и расходами на её получение (koszty uzyskania przychodu). Если расходы больше выручки, возникает **убыток**.

$$ доход = выручка − расходы на получение выручки | Правовое определение дохода

Из дохода вычитаются ещё положенные **вычеты** (например, взносы ZUS, некоторые льготы), и только к так рассчитанной базе применяется ставка.

## Кто платит: неограниченная и ограниченная обязанность
- **Неограниченная обязанность:** лицо, проживающее в Польше, платит со **всех** доходов, в том числе зарубежных.
- **Ограниченная обязанность:** лицо без места жительства в Польше платит только с доходов, полученных **в Польше**.

## Источники выручки
Закон называет, в частности: трудовые и служебные отношения, лично выполняемую деятельность, несельскохозяйственную предпринимательскую деятельность, специальные отрасли сельхозпроизводства, аренду, денежные капиталы и имущественные права, возмездное отчуждение недвижимости и других вещей, а также «иные источники».

## Налоговая шкала в 2026 г.

| Годовой доход | Налог |
|---|---|
| до 120 000 зл | 12% минус сумма, уменьшающая налог, 3 600 зл |
| свыше 120 000 зл | 10 800 зл + 32% от превышения над 120 000 зл |

[[kwota-wolna|Необлагаемый минимум]] — **30 000 зл**: кто заработал меньше, налог не платит. Число 10 800 зл — налог с первых 120 000 зл уже с учётом необлагаемого минимума (14 400 − 3 600).

> !przyklad Доход 150 000 зл. Налог = 10 800 зл + 32% × 30 000 зл = 10 800 + 9 600 = **20 400 зл**. Ставка 32% касается только 30 000 зл превышения.

Очень высокие доходы дополнительно облагаются **«солидарным сбором»** (danina solidarnościowa): 4% с превышения дохода над 1 000 000 зл.

## Другие формы налогообложения
Помимо шкалы предприниматели могут выбрать [[podatek-liniowy|линейный налог 19%]] или упрощённые формы: [[ryczalt-ewidencjonowany|единый налог с учитываемой выручки]] (ryczałt) и (только продолжающие) [[karta-podatkowa|налоговую карту]] (karta podatkowa). Выбор формы — тема подраздела 3.4.

## Совместная декларация и одинокий родитель
- **Супруги** могут подать совместную декларацию, если весь год состояли в браке и имели общность имущества, а ни один из них не применял рычалт, налоговую карту или линейный налог. С 2022 г. можно подать совместную декларацию и за год заключения брака (если брак и общность продолжались до конца года). Доходы суммируют, делят пополам, считают налог и умножают на 2. Это выгодно, когда доходы супругов сильно различаются.
- **Лицо, одиноко воспитывающее ребёнка**, рассчитывается похожим способом: с половины дохода, а налог умножается на 2.

> !uwaga Сплиттинг с супругом работает только на шкале. Кто выбрал линейный налог, теряет эту возможность.

## Льготы и освобождения
Материалы делят льготы на группы: связанные с расходами (например, взносы), с расходами на существование (например, реабилитационная), семейные (льгота на детей), стимулирующие (пожертвования, B+R, термомодернизационная, на роботизацию, на платёжный терминал), технические, а также льготу на возвращение и освобождение для лиц до 26 лет.

Часть льгот вычитается **из дохода** (например, реабилитационная, интернет-льгота, термомодернизационная), а часть — **из налога** (например, семейная льгота на детей).

> !przyklad Семейная льгота на первого и второго ребёнка по материалам составляет 1 112,04 зл в год на каждого. Родитель двоих детей вычитает из налога 2 224,08 зл.

## Как платится PIT
- **Через налогового агента** в течение года: авансы из зарплаты удерживает работодатель.
- **Самостоятельно** в течение года: предприниматель вносит ежемесячные или ежеквартальные авансы.
- **При годовом расчёте**: налогоплательщик подаёт декларацию и доплачивает разницу или получает возврат.

> !zapamietaj PIT 2026: шкала **12% и 32%**, порог **120 000 зл**, необлагаемый минимум **30 000 зл** (уменьшающая сумма **3 600 зл**). Линейный — **19%**. Солидарный сбор — **4%** с превышения над 1 млн зл.`,
          },
          quiz: [
            { q: { pl: "Ile wynosi podatek według skali przy dochodzie 100 000 zł (bez innych ulg)?", ru: "Каков налог по шкале при доходе 100 000 зл (без других льгот)?" },
              a: [{ pl: "12 000 zł", ru: "12 000 зл" }, { pl: "8 400 zł", ru: "8 400 зл" }, { pl: "19 000 zł", ru: "19 000 зл" }, { pl: "10 800 zł", ru: "10 800 зл" }],
              correct: 1, why: { pl: "100 000 × 12% = 12 000 zł; minus 3 600 zł kwoty zmniejszającej = 8 400 zł.", ru: "100 000 × 12% = 12 000 зл; минус 3 600 зл уменьшающей суммы = 8 400 зл." } },
            { q: { pl: "Podatnik z nieograniczonym obowiązkiem podatkowym płaci PIT:", ru: "Налогоплательщик с неограниченной обязанностью платит PIT:" },
              a: [{ pl: "tylko od dochodów z Polski", ru: "только с доходов из Польши" }, { pl: "tylko od dochodów z pracy", ru: "только с доходов от работы" }, { pl: "od całości dochodów, także zagranicznych", ru: "со всех доходов, включая зарубежные" }, { pl: "wyłącznie od wygranych", ru: "только с выигрышей" }],
              correct: 2, why: { pl: "Nieograniczony obowiązek dotyczy osób mających miejsce zamieszkania w Polsce i obejmuje wszystkie dochody.", ru: "Неограниченная обязанность касается лиц с местом жительства в Польше и охватывает все доходы." } },
            { q: { pl: "Ile wynosi podatek według skali przy dochodzie 200 000 zł?", ru: "Каков налог по шкале при доходе 200 000 зл?" },
              a: [{ pl: "36 400 zł", ru: "36 400 зл" }, { pl: "64 000 zł", ru: "64 000 зл" }, { pl: "38 000 zł", ru: "38 000 зл" }, { pl: "24 000 zł", ru: "24 000 зл" }],
              correct: 0, why: { pl: "10 800 zł + 32% × 80 000 zł = 10 800 + 25 600 = 36 400 zł.", ru: "10 800 зл + 32% × 80 000 зл = 10 800 + 25 600 = 36 400 зл." } },
            { q: { pl: "Kiedy małżonkowie NIE mogą rozliczyć się wspólnie?", ru: "Когда супруги НЕ могут подать совместную декларацию?" },
              a: [{ pl: "Gdy jeden z nich nie miał dochodów", ru: "Когда у одного из них не было доходов" }, { pl: "Gdy mają wspólność majątkową", ru: "Когда у них общность имущества" }, { pl: "Gdy oboje rozliczają się na skali", ru: "Когда оба рассчитываются по шкале" }, { pl: "Gdy jeden z nich wybrał podatek liniowy", ru: "Когда один из них выбрал линейный налог" }],
              correct: 3, why: { pl: "Wspólne rozliczenie wymaga, by żaden z małżonków nie korzystał z liniowego, ryczałtu ani karty. Brak dochodu u jednego nie przeszkadza.", ru: "Совместная декларация требует, чтобы ни один супруг не применял линейный налог, рычалт или карту. Отсутствие дохода у одного не мешает." } },
            { q: { pl: "Danina solidarnościowa to:", ru: "Солидарный сбор (danina solidarnościowa) — это:" },
              a: [{ pl: "4% od nadwyżki dochodów ponad 1 000 000 zł", ru: "4% с превышения дохода над 1 000 000 зл" }, { pl: "19% od dywidend", ru: "19% с дивидендов" }, { pl: "opłata za wspólne rozliczenie", ru: "плата за совместную декларацию" }, { pl: "ulga dla rodzin", ru: "льгота для семей" }],
              correct: 0, why: { pl: "Danina dotyczy osób o bardzo wysokich dochodach: 4% nadwyżki ponad 1 mln zł.", ru: "Сбор касается лиц с очень высокими доходами: 4% превышения над 1 млн зл." } },
          ],
        },
        // ------------------------------------------------------------------ 3.2
        {
          id: "3.2",
          title: { pl: "CIT – podatek dochodowy od osób prawnych", ru: "CIT — налог на прибыль юридических лиц" },
          src: "Podatki dochodowe 2026: CIT (zakres podmiotowy, rodzaje spółek, obowiązek podatkowy, PGK, mały podatnik, stawki, strata, zaliczki); Systematyka podatków w Polsce: przykład CIT",
          body: {
            pl: `[[cit|CIT]] (*corporate income tax*) płacą przede wszystkim spółki z o.o. i spółki akcyjne. Reguluje go ustawa z 15 lutego 1992 r. o podatku dochodowym od osób prawnych. To podatek bezpośredni, państwowy, roczny, ze stawką liniową.

## Kto płaci CIT
Podatnikami są:
- osoby prawne (np. sp. z o.o., S.A., spółdzielnie),
- spółki kapitałowe w organizacji,
- jednostki organizacyjne bez osobowości prawnej, **z wyjątkiem** spółek niemających osobowości prawnej,
- od 2021 r. także **spółki komandytowe** i **komandytowo-akcyjne** z siedzibą lub zarządem w Polsce,
- podatkowe grupy kapitałowe (PGK).

| Spółka | Osobowość prawna | CIT? |
|---|---|---|
| cywilna, jawna, partnerska | brak | nie (wspólnicy płacą PIT lub CIT od swojej części) |
| komandytowa, komandytowo-akcyjna | brak | tak |
| z o.o., akcyjna | tak | tak |

> !uwaga W spółce jawnej czy partnerskiej podatku nie płaci spółka, tylko wspólnicy: każdy dolicza swoją część dochodu do własnych dochodów. Jeśli wspólnikiem jest spółka kapitałowa, płaci od tej części CIT.

## Rezydenci i nierezydenci
- **Nieograniczony obowiązek:** spółka z siedzibą lub zarządem w Polsce płaci CIT od całości dochodów, gdziekolwiek je osiągnie.
- **Ograniczony obowiązek:** spółka zagraniczna płaci tylko od dochodów osiągniętych w Polsce.

Zasady te modyfikują umowy o unikaniu [[podwojne-opodatkowanie|podwójnego opodatkowania]]. Ważne pojęcie to **zakład** (stała placówka): miejsce o stałym charakterze, przez które zagraniczna firma prowadzi działalność. Placówka służąca tylko do składowania, wystawiania towarów albo działalności pomocniczej zakładu nie tworzy. Rezydencję potwierdza **certyfikat rezydencji**.

## Podatkowa grupa kapitałowa
Co najmniej dwie spółki z osobowością prawną mogą rozliczać się razem jako PGK, jeśli spełnią warunki (m.in. przeciętny kapitał zakładowy każdej spółki co najmniej 500 000 zł, spółka dominująca ma bezpośrednio co najmniej 75% udziałów w zależnych, brak zaległości podatkowych). Największa korzyść: strata jednej spółki od razu zmniejsza dochód innych.

## Stawki CIT

| Stawka | Kiedy |
|---|---|
| **19%** | zasady ogólne |
| **9%** | [[maly-podatnik|mali podatnicy]] (przychody nie przekroczyły równowartości 2 mln euro) i firmy w roku rozpoczęcia działalności; nie dotyczy zysków kapitałowych |
| 19% | dywidendy i inne przychody z udziału w zyskach |

Od 2022 r. istnieje też **minimalny podatek dochodowy** (art. 24ca) dla spółek ze stratą lub bardzo niską rentownością: 10% od podstawy liczonej według szczególnych zasad.

## Jak liczy się CIT
1. Przychody (wszelkie trwałe przysporzenia majątkowe; data przychodu to zwykle dzień wydania rzeczy lub wykonania usługi, nie później niż dzień wystawienia faktury lub zapłaty).
2. Minus [[koszty-uzyskania|koszty uzyskania przychodu]] (wydatki poniesione, żeby osiągnąć przychód albo zachować źródło przychodu; art. 16 wylicza wydatki, które kosztem nie są).
3. = dochód. Minus odliczenia (np. strata z lat ubiegłych, darowizny, ulga B+R).
4. × stawka = podatek.

> !przyklad Spółka handlowa, mały podatnik: przychód 500 000 zł, koszty 300 000 zł. Dochód = 200 000 zł. CIT = 200 000 × 9% = **18 000 zł**. Podatek płatny do końca marca następnego roku razem z zeznaniem CIT-8.

## Rozliczenie straty
Stratę można odliczyć w ciągu kolejnych **5 lat**: albo maksymalnie 50% straty w jednym roku, albo jednorazowo do 5 000 000 zł, a resztę w pozostałych latach (też do 50% rocznie).

## Zaliczki i zeznanie
- **Zaliczki miesięczne** do 20. dnia następnego miesiąca.
- Mali podatnicy i firmy w pierwszym roku mogą płacić **kwartalnie** (do 20. dnia po kwartale), zawiadamiając urząd do 20. dnia drugiego miesiąca roku.
- **Zeznanie CIT-8** do końca 3. miesiąca następnego roku.
- Rok podatkowy to zwykle rok kalendarzowy, ale spółka może przyjąć inny okres 12 miesięcy.

> !zapamietaj CIT: stawka **19%**, dla małych podatników i nowych firm **9%** (limit **2 mln euro** przychodów). Strata — 5 lat. Zaliczki do **20.** dnia, zeznanie CIT-8 do końca **3. miesiąca** po roku.`,
            ru: `[[cit|CIT]] (*corporate income tax*) платят прежде всего общества с ограниченной ответственностью (sp. z o.o.) и акционерные общества (S.A.). Его регулирует закон от 15 февраля 1992 г. о налоге на доходы юридических лиц. Это прямой, государственный, годовой налог с линейной ставкой.

## Кто платит CIT
Налогоплательщики:
- юридические лица (например, sp. z o.o., S.A., кооперативы),
- капитальные общества в процессе создания,
- организационные единицы без правосубъектности, **за исключением** товариществ без правосубъектности,
- с 2021 г. также **коммандитные товарищества** (spółka komandytowa) и **коммандитно-акционерные** с местонахождением или управлением в Польше,
- налоговые группы капитала (PGK).

| Товарищество/общество | Правосубъектность | CIT? |
|---|---|---|
| гражданское, полное (jawna), партнёрское | нет | нет (участники платят PIT или CIT со своей доли) |
| коммандитное, коммандитно-акционерное | нет | да |
| sp. z o.o., акционерное | да | да |

> !uwaga В полном или партнёрском товариществе налог платит не товарищество, а участники: каждый добавляет свою долю дохода к собственным доходам. Если участник — капитальное общество, с этой доли оно платит CIT.

## Резиденты и нерезиденты
- **Неограниченная обязанность:** общество с местонахождением или управлением в Польше платит CIT со всех доходов, где бы оно их ни получило.
- **Ограниченная обязанность:** иностранное общество платит только с доходов, полученных в Польше.

Эти правила модифицируют соглашения об избежании [[podwojne-opodatkowanie|двойного налогообложения]]. Важное понятие — **постоянное представительство** (zakład): место постоянного характера, через которое иностранная фирма ведёт деятельность. Площадка, служащая только для хранения, демонстрации товаров или вспомогательной деятельности, представительства не образует. Резидентство подтверждает **сертификат резидентства**.

## Налоговая группа капитала
Не менее двух обществ с правосубъектностью могут рассчитываться вместе как PGK, если выполнены условия (в частности, средний уставный капитал каждого не менее 500 000 зл, материнская компания напрямую владеет не менее 75% долей дочерних, нет налоговой задолженности). Главная выгода: убыток одного общества сразу уменьшает доход других.

## Ставки CIT

| Ставка | Когда |
|---|---|
| **19%** | общие правила |
| **9%** | [[maly-podatnik|малые налогоплательщики]] (выручка не превысила эквивалент 2 млн евро) и фирмы в год начала деятельности; не касается доходов от капитала |
| 19% | дивиденды и другие доходы от участия в прибыли |

С 2022 г. существует также **минимальный подоходный налог** (ст. 24ca) для обществ с убытком или очень низкой рентабельностью: 10% от базы, рассчитанной по особым правилам.

## Как считается CIT
1. Выручка (любые постоянные имущественные приращения; дата выручки — обычно день передачи вещи или оказания услуги, не позднее дня выставления счёта или оплаты).
2. Минус [[koszty-uzyskania|расходы на получение выручки]] (затраты, понесённые для получения выручки или сохранения её источника; ст. 16 перечисляет затраты, которые расходами не являются).
3. = доход. Минус вычеты (например, убыток прошлых лет, пожертвования, льгота B+R).
4. × ставка = налог.

> !przyklad Торговое общество, малый налогоплательщик: выручка 500 000 зл, расходы 300 000 зл. Доход = 200 000 зл. CIT = 200 000 × 9% = **18 000 зл**. Налог уплачивается до конца марта следующего года вместе с декларацией CIT-8.

## Перенос убытка
Убыток можно вычитать в течение следующих **5 лет**: либо не более 50% убытка в одном году, либо единовременно до 5 000 000 зл, а остаток в остальные годы (тоже до 50% в год).

## Авансы и декларация
- **Ежемесячные авансы** — до 20-го числа следующего месяца.
- Малые налогоплательщики и фирмы в первый год могут платить **ежеквартально** (до 20-го числа после квартала), уведомив налоговую до 20-го числа второго месяца года.
- **Декларация CIT-8** — до конца 3-го месяца следующего года.
- Налоговый год — обычно календарный, но общество может принять другой 12-месячный период.

> !zapamietaj CIT: ставка **19%**, для малых налогоплательщиков и новых фирм **9%** (лимит выручки **2 млн евро**). Убыток — 5 лет. Авансы до **20-го** числа, декларация CIT-8 до конца **3-го месяца** после года.`,
          },
          quiz: [
            { q: { pl: "Która spółka NIE jest podatnikiem CIT?", ru: "Какое товарищество/общество НЕ является плательщиком CIT?" },
              a: [{ pl: "Spółka z o.o.", ru: "Sp. z o.o." }, { pl: "Spółka komandytowa", ru: "Коммандитное товарищество" }, { pl: "Spółka jawna", ru: "Полное товарищество (jawna)" }, { pl: "Spółka akcyjna", ru: "Акционерное общество" }],
              correct: 2, why: { pl: "Spółka jawna nie płaci CIT; dochód rozliczają jej wspólnicy. Komandytowa jest podatnikiem CIT od 2021 r.", ru: "Полное товарищество не платит CIT; доход рассчитывают его участники. Коммандитное — плательщик CIT с 2021 г." } },
            { q: { pl: "Jaka jest preferencyjna stawka CIT dla małych podatników?", ru: "Какова льготная ставка CIT для малых налогоплательщиков?" },
              a: [{ pl: "9%", ru: "9%" }, { pl: "12%", ru: "12%" }, { pl: "5%", ru: "5%" }, { pl: "15%", ru: "15%" }],
              correct: 0, why: { pl: "9% dotyczy podatników z przychodami do równowartości 2 mln euro i firm w roku rozpoczęcia działalności (bez zysków kapitałowych).", ru: "9% применяется при выручке до эквивалента 2 млн евро и для фирм в год начала деятельности (без доходов от капитала)." } },
            { q: { pl: "Spółka (mały podatnik) ma przychód 800 000 zł i koszty 500 000 zł. Ile wynosi CIT?", ru: "Общество (малый налогоплательщик) имеет выручку 800 000 зл и расходы 500 000 зл. Каков CIT?" },
              a: [{ pl: "72 000 zł", ru: "72 000 зл" }, { pl: "57 000 zł", ru: "57 000 зл" }, { pl: "45 000 zł", ru: "45 000 зл" }, { pl: "27 000 zł", ru: "27 000 зл" }],
              correct: 3, why: { pl: "Dochód = 300 000 zł; 300 000 × 9% = 27 000 zł.", ru: "Доход = 300 000 зл; 300 000 × 9% = 27 000 зл." } },
            { q: { pl: "W jakim terminie składa się zeznanie roczne CIT-8?", ru: "В какой срок подаётся годовая декларация CIT-8?" },
              a: [{ pl: "Do 20 stycznia", ru: "До 20 января" }, { pl: "Do końca trzeciego miesiąca po zakończeniu roku podatkowego", ru: "До конца третьего месяца после окончания налогового года" }, { pl: "Do 30 czerwca", ru: "До 30 июня" }, { pl: "Do końca roku", ru: "До конца года" }],
              correct: 1, why: { pl: "Art. 27 ustawy o CIT: zeznanie do końca 3. miesiąca roku następnego; podatek pomniejsza się o wpłacone zaliczki.", ru: "Ст. 27 закона о CIT: декларация до конца 3-го месяца следующего года; налог уменьшается на уплаченные авансы." } },
            { q: { pl: "Ile lat można rozliczać stratę podatkową w CIT?", ru: "Сколько лет можно переносить налоговый убыток в CIT?" },
              a: [{ pl: "1 rok", ru: "1 год" }, { pl: "3 lata", ru: "3 года" }, { pl: "5 lat", ru: "5 лет" }, { pl: "10 lat", ru: "10 лет" }],
              correct: 2, why: { pl: "Stratę odlicza się w ciągu najbliższych 5 lat: do 50% rocznie albo jednorazowo do 5 mln zł.", ru: "Убыток вычитается в течение ближайших 5 лет: до 50% в год или единовременно до 5 млн зл." } },
          ],
        },
        // ------------------------------------------------------------------ 3.3
        {
          id: "3.3",
          title: { pl: "CIT klasyczny a CIT estoński", ru: "Классический CIT и эстонский CIT" },
          src: "CIT klasyczny a CIT estoński – porównanie (art. 28c–28o ustawy o CIT); Podatki dochodowe 2026: CIT estoński",
          body: {
            pl: `Od 1 stycznia 2021 r. spółki mogą wybrać [[estonski-cit|CIT estoński]], czyli ryczałt od dochodów spółek (rozdział 6b ustawy o CIT, art. 28c–28o). Różnica wobec klasycznego CIT sprowadza się do jednego pytania: **kiedy** płaci się podatek.

## Klasyczny CIT: płać, gdy zarabiasz
W klasycznym modelu (*pay as you earn*) podatek płaci się od dochodu na bieżąco, w zaliczkach, **niezależnie od tego, czy zysk zostanie wypłacony**. Nawet gdy wspólnicy zostawiają cały zysk w firmie na inwestycje, CIT i tak trzeba zapłacić.

> !przyklad Spółka (mały podatnik) ma stały dochód 100 000 zł miesięcznie. Zaliczka = 100 000 × 9% = 9 000 zł miesięcznie, czyli 108 000 zł rocznie. Ta kwota wychodzi z firmy, nawet jeśli wspólnicy nie wypłacą ani złotówki dywidendy.

## CIT estoński: płać, gdy wypłacasz
W modelu estońskim (*pay as you distribute*) dopóki zysk zostaje w spółce, podatku nie ma. Obowiązek powstaje dopiero przy:
- **wypłacie zysku** (dywidendy),
- **ukrytych zyskach**, czyli świadczeniach na rzecz wspólników, które w istocie są wypłatą zysku (art. 28m),
- pokryciu straty sprzed okresu estońskiego.

Stawki (art. 28i): **10%** dla małych podatników i firm rozpoczynających działalność, **20%** dla pozostałych.

## Podwójne opodatkowanie dywidendy
Żeby porównać oba systemy, trzeba doliczyć **PIT od dywidendy: 19%**, który płaci wspólnik.

| | Klasyczny CIT | CIT estoński |
|---|---|---|
| Kiedy podatek | na bieżąco, od dochodu | przy wypłacie zysku |
| Zaliczki | miesięczne lub kwartalne | brak |
| Stawka CIT (mały / pozostali) | 9% / 19% | 10% / 20% |
| PIT od dywidendy | 19% | 19%, ale wspólnik odlicza część CIT spółki (90% u małego, 70% u pozostałych) |
| Łączne obciążenie (mały) | 26,29% | ok. 20% |
| Łączne obciążenie (pozostali) | 34,39% | ok. 25% |
| Zysk reinwestowany | opodatkowany | 0% do czasu wypłaty |

Skąd 26,29%? Ze 100 zł dochodu spółka płaci 9 zł CIT, zostaje 91 zł; wspólnik płaci 19% od 91 zł, czyli 17,29 zł, i dostaje 73,71 zł. Razem podatki: 26,29 zł.

> !przyklad Kazus z materiałów (uproszczony): mała spółka z dochodem 1 000 000 zł chce wypłacić cały zysk. **Klasycznie:** CIT 90 000 zł, dywidenda 910 000 zł, PIT 172 900 zł, razem 262 900 zł (26,29%). **Po estońsku:** CIT 10% = 100 000 zł; PIT 19% = 190 000 zł minus odliczenie 90% CIT (90 000 zł) = 100 000 zł; razem 200 000 zł, czyli ok. 20%.

> !uwaga Od ukrytych zysków **nie ma** odliczenia 90%/70% w PIT. Typowe ukryte zyski: zawyżony czynsz płacony wspólnikowi, prywatne używanie firmowego auta, nieoprocentowana pożyczka dla wspólnika, spłata jego prywatnych długów.

## Kto może wybrać CIT estoński
- **Forma prawna:** sp. z o.o., S.A., prosta spółka akcyjna, spółka komandytowa i komandytowo-akcyjna (te dwie tylko wtedy, gdy wspólnikami są wyłącznie osoby fizyczne). JDG, spółki jawne, partnerskie i cywilne nie mogą.
- **Wspólnicy:** co do zasady tylko osoby fizyczne; nie mogą mieć udziałów w innej spółce na CIT estońskim.
- **Zatrudnienie:** co najmniej 3 osoby na umowę o pracę (w przeliczeniu na etaty), bez wspólników.
- **Przychody:** przychody pasywne (np. odsetki, dywidendy, licencje) nie mogą przeważać nad operacyjnymi.
- **Procedura:** zawiadomienie ZAW-RD do urzędu skarbowego, wybór na co najmniej 4 lata, wejście tylko od początku roku podatkowego.

## Plusy i minusy

| CIT estoński: zalety | CIT estoński: wady |
|---|---|
| podatek odroczony do wypłaty | wymogi co do formy, wspólników, zatrudnienia |
| lepsza płynność, brak zaliczek | utrata warunków oznacza powrót do klasycznego CIT |
| niższe łączne obciążenie przy wypłacie | ryzyko ukrytych zysków |
| prostsza ewidencja | nieopłacalny przy częstych wysokich dywidendach |

> !zapamietaj Klasyczny CIT to podatek od **osiągnięcia** dochodu (9%/19%). Estoński to podatek od **wypłaty** zysku (10%/20%), z odliczeniem części CIT w PIT wspólnika. Opłaca się firmom, które **reinwestują** zyski.`,
            ru: `С 1 января 2021 г. общества могут выбрать [[estonski-cit|эстонский CIT]], то есть единый налог с дохода обществ (глава 6b закона о CIT, ст. 28c–28o). Отличие от классического CIT сводится к одному вопросу: **когда** платится налог.

## Классический CIT: плати, когда зарабатываешь
В классической модели (*pay as you earn*) налог платится с дохода текущими авансами, **независимо от того, будет ли прибыль выплачена**. Даже если участники оставляют всю прибыль в фирме на инвестиции, CIT всё равно нужно заплатить.

> !przyklad Общество (малый налогоплательщик) имеет стабильный доход 100 000 зл в месяц. Аванс = 100 000 × 9% = 9 000 зл в месяц, то есть 108 000 зл в год. Эта сумма уходит из фирмы, даже если участники не выплатят ни злотого дивидендов.

## Эстонский CIT: плати, когда выплачиваешь
В эстонской модели (*pay as you distribute*) пока прибыль остаётся в обществе, налога нет. Обязанность возникает только при:
- **выплате прибыли** (дивидендов),
- **скрытой прибыли**, то есть предоставлениях участникам, которые по сути являются выплатой прибыли (ст. 28m),
- покрытии убытка, возникшего до эстонского периода.

Ставки (ст. 28i): **10%** для малых налогоплательщиков и начинающих фирм, **20%** для остальных.

## Двойное налогообложение дивидендов
Чтобы сравнить системы, нужно добавить **PIT с дивидендов: 19%**, который платит участник.

| | Классический CIT | Эстонский CIT |
|---|---|---|
| Когда налог | текущий, с дохода | при выплате прибыли |
| Авансы | ежемесячные или ежеквартальные | нет |
| Ставка CIT (малые / остальные) | 9% / 19% | 10% / 20% |
| PIT с дивидендов | 19% | 19%, но участник вычитает часть CIT общества (90% у малого, 70% у остальных) |
| Общая нагрузка (малый) | 26,29% | около 20% |
| Общая нагрузка (остальные) | 34,39% | около 25% |
| Реинвестированная прибыль | облагается | 0% до выплаты |

Откуда 26,29%? Со 100 зл дохода общество платит 9 зл CIT, остаётся 91 зл; участник платит 19% с 91 зл, то есть 17,29 зл, и получает 73,71 зл. Всего налогов: 26,29 зл.

> !przyklad Кейс из материалов (упрощённый): малое общество с доходом 1 000 000 зл хочет выплатить всю прибыль. **Классически:** CIT 90 000 зл, дивиденд 910 000 зл, PIT 172 900 зл, итого 262 900 зл (26,29%). **По-эстонски:** CIT 10% = 100 000 зл; PIT 19% = 190 000 зл минус вычет 90% CIT (90 000 зл) = 100 000 зл; итого 200 000 зл, то есть около 20%.

> !uwaga Со скрытой прибыли вычета 90%/70% в PIT **нет**. Типичная скрытая прибыль: завышенная аренда, уплачиваемая участнику, частное использование служебного автомобиля, беспроцентный заём участнику, погашение его личных долгов.

## Кто может выбрать эстонский CIT
- **Правовая форма:** sp. z o.o., S.A., простое акционерное общество, коммандитное и коммандитно-акционерное товарищество (последние два — только если все участники физические лица). JDG, полные, партнёрские и гражданские товарищества не могут.
- **Участники:** в принципе только физические лица; они не могут владеть долями в другом обществе на эстонском CIT.
- **Занятость:** не менее 3 человек по трудовому договору (в пересчёте на ставки), не считая участников.
- **Выручка:** пассивная выручка (например, проценты, дивиденды, лицензии) не может преобладать над операционной.
- **Процедура:** уведомление ZAW-RD в налоговую, выбор минимум на 4 года, вход только с начала налогового года.

## Плюсы и минусы

| Эстонский CIT: преимущества | Эстонский CIT: недостатки |
|---|---|
| налог отложен до выплаты | требования к форме, участникам, занятости |
| лучше ликвидность, нет авансов | при утрате условий — возврат к классическому CIT |
| ниже общая нагрузка при выплате | риск скрытой прибыли |
| проще учёт | невыгоден при частых крупных дивидендах |

> !zapamietaj Классический CIT — налог на **получение** дохода (9%/19%). Эстонский — налог на **выплату** прибыли (10%/20%) с вычетом части CIT в PIT участника. Он выгоден фирмам, которые **реинвестируют** прибыль.`,
          },
          quiz: [
            { q: { pl: "Kiedy w CIT estońskim powstaje obowiązek zapłaty podatku?", ru: "Когда при эстонском CIT возникает обязанность уплатить налог?" },
              a: [{ pl: "Co miesiąc od dochodu", ru: "Ежемесячно с дохода" }, { pl: "Przy wypłacie zysku lub ukrytym zysku", ru: "При выплате прибыли или скрытой прибыли" }, { pl: "Przy każdym zakupie środka trwałego", ru: "При каждой покупке основного средства" }, { pl: "Nigdy", ru: "Никогда" }],
              correct: 1, why: { pl: "Estoński CIT działa według zasady „pay as you distribute”: dopóki zysk zostaje w spółce, podatku nie ma.", ru: "Эстонский CIT работает по принципу «pay as you distribute»: пока прибыль остаётся в обществе, налога нет." } },
            { q: { pl: "Ile wynosi łączne obciążenie zysku wypłaconego jako dywidenda w klasycznym CIT u małego podatnika?", ru: "Какова общая нагрузка на прибыль, выплаченную как дивиденд, при классическом CIT у малого налогоплательщика?" },
              a: [{ pl: "19%", ru: "19%" }, { pl: "20%", ru: "20%" }, { pl: "34,39%", ru: "34,39%" }, { pl: "26,29%", ru: "26,29%" }],
              correct: 3, why: { pl: "9% CIT, potem 19% PIT od 91 zł = 17,29 zł; razem 26,29 zł ze 100 zł.", ru: "9% CIT, затем 19% PIT с 91 зл = 17,29 зл; итого 26,29 зл со 100 зл." } },
            { q: { pl: "Która forma działalności NIE może korzystać z CIT estońskiego?", ru: "Какая форма деятельности НЕ может применять эстонский CIT?" },
              a: [{ pl: "Jednoosobowa działalność gospodarcza", ru: "Индивидуальное предпринимательство (JDG)" }, { pl: "Spółka z o.o.", ru: "Sp. z o.o." }, { pl: "Prosta spółka akcyjna", ru: "Простое акционерное общество" }, { pl: "Spółka akcyjna", ru: "Акционерное общество" }],
              correct: 0, why: { pl: "JDG, spółki jawne, partnerskie i cywilne są wyłączone; płacą PIT lub klasyczny CIT wspólników.", ru: "JDG, полные, партнёрские и гражданские товарищества исключены; они платят PIT или классический CIT участников." } },
            { q: { pl: "Ilu pracowników na umowę o pracę musi zatrudniać spółka na CIT estońskim?", ru: "Сколько работников по трудовому договору должно быть у общества на эстонском CIT?" },
              a: [{ pl: "Co najmniej 1", ru: "Не менее 1" }, { pl: "Co najmniej 10", ru: "Не менее 10" }, { pl: "Co najmniej 3 (bez wspólników)", ru: "Не менее 3 (без участников)" }, { pl: "Nie ma takiego wymogu", ru: "Такого требования нет" }],
              correct: 2, why: { pl: "Art. 28c wymaga co najmniej 3 osób zatrudnionych na umowę o pracę w przeliczeniu na etaty; wspólnicy się nie liczą.", ru: "Ст. 28c требует не менее 3 человек по трудовому договору в пересчёте на ставки; участники не учитываются." } },
            { q: { pl: "Dlaczego od ukrytego zysku płaci się efektywnie więcej niż od dywidendy?", ru: "Почему со скрытой прибыли фактически платят больше, чем с дивиденда?" },
              a: [{ pl: "Bo ukryty zysk jest opodatkowany VAT", ru: "Потому что скрытая прибыль облагается VAT" }, { pl: "Bo od ukrytego zysku nie ma odliczenia 90%/70% CIT w PIT wspólnika", ru: "Потому что со скрытой прибыли нет вычета 90%/70% CIT в PIT участника" }, { pl: "Bo stawka wynosi 50%", ru: "Потому что ставка 50%" }, { pl: "Bo płaci go gmina", ru: "Потому что его платит гмина" }],
              correct: 1, why: { pl: "Materiały podkreślają, że przy ukrytych zyskach brak mechanizmu kompensacyjnego, więc obciążenie rośnie.", ru: "Материалы подчёркивают, что при скрытой прибыли нет компенсационного механизма, поэтому нагрузка растёт." } },
          ],
        },
        // ------------------------------------------------------------------ 3.4
        {
          id: "3.4",
          title: { pl: "Wybór formy opodatkowania JDG", ru: "Выбор формы налогообложения JDG" },
          src: "Wybór opodatkowania JDG 2026: formy opodatkowania, skala, liniowy, ryczałt, karta, kryteria wyboru, procedura, kazusy",
          body: {
            pl: `[[jdg|Jednoosobowa działalność gospodarcza (JDG)]] to firma, w której przedsiębiorca działa we własnym imieniu i na własny rachunek. Odpowiada za długi całym majątkiem, także prywatnym, a firma nie ma osobowości prawnej. Jedna z pierwszych decyzji takiego przedsiębiorcy to wybór formy opodatkowania. Może ją zmieniać co roku.

## Cztery formy w 2026 r.

| | Skala | Liniowy | Ryczałt ewidencjonowany | Karta podatkowa |
|---|---|---|---|---|
| Podstawa | dochód | dochód | **przychód** | stała kwota z decyzji |
| Stawka | 12% / 32% | 19% | 2–17% zależnie od działalności | ustala naczelnik US |
| Kwota wolna 30 000 zł | tak | nie | nie | nie |
| Odliczanie kosztów | tak | tak | nie | nie |
| Wspólne rozliczenie, ulga na dzieci | tak | nie | nie | nie |
| [[skladka-zdrowotna|Składka zdrowotna]] | 9% dochodu | 4,9% dochodu | stała kwota zależna od progu przychodów | szczególne zasady |
| Ewidencja | KPiR | KPiR | ewidencja przychodów | brak |

> !uwaga [[karta-podatkowa|Kartę podatkową]] mogą w 2026 r. stosować tylko przedsiębiorcy, którzy byli na niej już wcześniej i ją kontynuują. Nowa firma nie może jej wybrać.

## Skala podatkowa
Forma domyślna: kto nic nie zgłosi, jest na skali. Zalety: kwota wolna, ulgi (na dzieci, internet, darowizny, rehabilitacyjna, B+R, termomodernizacyjna), wspólne rozliczenie z małżonkiem albo jako samotny rodzic. Wady: 32% powyżej 120 000 zł i składka zdrowotna 9% od dochodu.

## [[podatek-liniowy|Podatek liniowy]]
Stałe 19% od dochodu, bez progów. Koszty nadal się odlicza. Brak kwoty wolnej, większości ulg i wspólnego rozliczenia. Składka zdrowotna niższa: 4,9% dochodu. Opłaca się przy wysokich dochodach.

## [[ryczalt-ewidencjonowany|Ryczałt od przychodów ewidencjonowanych]]
Podatek od przychodu, bez kosztów. Stawki 2–17% zależą od rodzaju działalności (np. w materiałach: 12% dla niektórych usług IT, 15% dla doradztwa, 17% dla niektórych wolnych zawodów). Prosta ewidencja. Opłaca się przy **niskich kosztach**: freelancerzy, konsultanci, programiści. Nie dla każdej działalności (są wyłączenia ustawowe), a limit przychodów wynosi 2 mln euro.

## Przykład porównawczy
Programista na JDG: przychód 240 000 zł, koszty 20 000 zł, dochód 220 000 zł. Załóżmy ryczałt 12%. Dla uproszczenia pomijamy składki społeczne ZUS (są takie same we wszystkich formach) i częściowe odliczanie składki zdrowotnej.

| | Skala | Liniowy | Ryczałt 12% |
|---|---|---|---|
| Podatek | 10 800 + 32% × 100 000 = **42 800 zł** | 19% × 220 000 = **41 800 zł** | 12% × 240 000 = **28 800 zł** |
| Zdrowotna | 9% × 220 000 = 19 800 zł | 4,9% × 220 000 = 10 780 zł | ok. 8 400 zł (szacunek z materiałów dla progu 60–300 tys. zł) |
| **Razem** | **62 600 zł** | **52 580 zł** | **ok. 37 200 zł** |

> !przyklad Przy niskich kosztach (8% przychodu) ryczałt wygrywa wyraźnie. Teraz odwróćmy sytuację: sklep internetowy z przychodem 250 000 zł i kosztami 180 000 zł (towar, wysyłka, reklama). Dochód to tylko 70 000 zł. Na skali podatek wyniesie 70 000 × 12% − 3 600 = 4 800 zł (przed ZUS i ulgami), a ryczałt liczyłby podatek od całych 250 000 zł przychodu. Tu zdecydowanie wygrywa skala.

## Kryteria wyboru
- **Wysokość dochodu:** poniżej 120 000 zł zwykle skala; wyraźnie powyżej warto policzyć liniowy.
- **Koszty:** wysokie (handel, produkcja) przemawiają za skalą lub liniowym; niskie (usługi niematerialne) za ryczałtem.
- **Rodzina i ulgi:** dzieci, małżonek z niskim dochodem przemawiają za skalą.
- **Branża:** czy działalność może być na ryczałcie i jaka jest stawka.
- **Księgowość:** ryczałt jest najprostszy.
- **Plany rozwoju:** duże inwestycje i zatrudnianie to argument za formą z kosztami.

## Procedura i terminy
- **Skala:** automatycznie, bez zgłoszenia.
- **Liniowy i ryczałt:** pisemne oświadczenie do naczelnika US **do 20. dnia miesiąca następującego po miesiącu, w którym osiągnięto pierwszy przychód** (gdy pierwszy przychód jest w grudniu — do końca roku). Często zgłasza się to już przy rejestracji firmy.
- **Zmiana formy** jest możliwa co roku, w tych samych terminach.

> !zapamietaj Nie ma jednej najlepszej formy. **Skala** dla niższych dochodów, rodzin i firm z kosztami; **liniowy** dla wysokich dochodów z kosztami; **ryczałt** dla usług z niskimi kosztami. Zawsze licz podatek **razem ze składką zdrowotną**.`,
            ru: `[[jdg|Индивидуальное предпринимательство (JDG)]] — фирма, в которой предприниматель действует от своего имени и за свой счёт. Он отвечает по долгам всем имуществом, в том числе личным, а фирма не имеет правосубъектности. Одно из первых решений такого предпринимателя — выбор формы налогообложения. Её можно менять каждый год.

## Четыре формы в 2026 г.

| | Шкала | Линейный | Рычалт с учитываемой выручки | Налоговая карта |
|---|---|---|---|---|
| База | доход | доход | **выручка** | фиксированная сумма по решению |
| Ставка | 12% / 32% | 19% | 2–17% в зависимости от деятельности | устанавливает начальник налоговой |
| Необлагаемый минимум 30 000 зл | да | нет | нет | нет |
| Вычет расходов | да | да | нет | нет |
| Совместная декларация, льгота на детей | да | нет | нет | нет |
| [[skladka-zdrowotna|Медицинский взнос]] | 9% дохода | 4,9% дохода | фиксированная сумма в зависимости от порога выручки | особые правила |
| Учёт | KPiR | KPiR | реестр выручки | нет |

> !uwaga [[karta-podatkowa|Налоговую карту]] в 2026 г. могут применять только предприниматели, которые уже были на ней раньше и продолжают её применять. Новая фирма выбрать её не может.

## Налоговая шкала
Форма по умолчанию: кто ничего не заявил, тот на шкале. Плюсы: необлагаемый минимум, льготы (на детей, интернет, пожертвования, реабилитационная, B+R, термомодернизационная), совместная декларация с супругом или как одинокий родитель. Минусы: 32% выше 120 000 зл и медицинский взнос 9% от дохода.

## [[podatek-liniowy|Линейный налог]]
Постоянные 19% с дохода, без порогов. Расходы по-прежнему вычитаются. Нет необлагаемого минимума, большинства льгот и совместной декларации. Медицинский взнос ниже: 4,9% дохода. Выгоден при высоких доходах.

## [[ryczalt-ewidencjonowany|Ryczałt с учитываемой выручки]]
Налог с выручки, без расходов. Ставки 2–17% зависят от вида деятельности (например, в материалах: 12% для некоторых IT-услуг, 15% для консалтинга, 17% для некоторых свободных профессий). Простой учёт. Выгоден при **низких расходах**: фрилансеры, консультанты, программисты. Подходит не для всякой деятельности (есть законодательные исключения), а лимит выручки — 2 млн евро.

## Сравнительный пример
Программист на JDG: выручка 240 000 зл, расходы 20 000 зл, доход 220 000 зл. Допустим, ставка рычалт 12%. Для упрощения не учитываем социальные взносы ZUS (они одинаковы во всех формах) и частичный вычет медицинского взноса.

| | Шкала | Линейный | Рычалт 12% |
|---|---|---|---|
| Налог | 10 800 + 32% × 100 000 = **42 800 зл** | 19% × 220 000 = **41 800 зл** | 12% × 240 000 = **28 800 зл** |
| Медицинский взнос | 9% × 220 000 = 19 800 зл | 4,9% × 220 000 = 10 780 зл | около 8 400 зл (оценка из материалов для порога 60–300 тыс. зл) |
| **Итого** | **62 600 зл** | **52 580 зл** | **около 37 200 зл** |

> !przyklad При низких расходах (8% выручки) рычалт явно выигрывает. Теперь перевернём ситуацию: интернет-магазин с выручкой 250 000 зл и расходами 180 000 зл (товар, доставка, реклама). Доход всего 70 000 зл. По шкале налог составит 70 000 × 12% − 3 600 = 4 800 зл (до ZUS и льгот), а рычалт считал бы налог со всех 250 000 зл выручки. Здесь однозначно выигрывает шкала.

## Критерии выбора
- **Размер дохода:** ниже 120 000 зл обычно шкала; заметно выше стоит посчитать линейный.
- **Расходы:** высокие (торговля, производство) говорят в пользу шкалы или линейного; низкие (нематериальные услуги) — в пользу рычалт.
- **Семья и льготы:** дети, супруг с низким доходом говорят в пользу шкалы.
- **Отрасль:** может ли деятельность быть на рычалт и какая ставка.
- **Бухгалтерия:** рычалт проще всего.
- **Планы развития:** крупные инвестиции и наём работников — аргумент за форму с расходами.

## Процедура и сроки
- **Шкала:** автоматически, без заявления.
- **Линейный и рычалт:** письменное заявление начальнику налоговой **до 20-го числа месяца, следующего за месяцем получения первой выручки** (если первая выручка в декабре — до конца года). Часто это заявляют уже при регистрации фирмы.
- **Смена формы** возможна каждый год, в те же сроки.

> !zapamietaj Единой лучшей формы нет. **Шкала** — для более низких доходов, семей и фирм с расходами; **линейный** — для высоких доходов с расходами; **рычалт** — для услуг с низкими расходами. Всегда считайте налог **вместе с медицинским взносом**.`,
          },
          quiz: [
            { q: { pl: "Co jest podstawą opodatkowania w ryczałcie od przychodów ewidencjonowanych?", ru: "Что является налоговой базой при рычалт с учитываемой выручки?" },
              a: [{ pl: "Dochód", ru: "Доход" }, { pl: "Zysk netto", ru: "Чистая прибыль" }, { pl: "Przychód, bez odliczania kosztów", ru: "Выручка, без вычета расходов" }, { pl: "Wartość majątku firmy", ru: "Стоимость имущества фирмы" }],
              correct: 2, why: { pl: "Ryczałt to podatek przychodowy: mnoży się przychód przez stawkę, kosztów się nie odlicza.", ru: "Рычалт — налог с выручки: выручку умножают на ставку, расходы не вычитаются." } },
            { q: { pl: "Ile wynosi składka zdrowotna na podatku liniowym według materiałów?", ru: "Каков медицинский взнос при линейном налоге по материалам?" },
              a: [{ pl: "4,9% dochodu", ru: "4,9% дохода" }, { pl: "9% dochodu", ru: "9% дохода" }, { pl: "19% dochodu", ru: "19% дохода" }, { pl: "0%", ru: "0%" }],
              correct: 0, why: { pl: "Na skali zdrowotna to 9% dochodu, na liniowym 4,9%, a na ryczałcie stała kwota zależna od progu przychodów.", ru: "На шкале медицинский взнос — 9% дохода, на линейном — 4,9%, на рычалт — фиксированная сумма по порогу выручки." } },
            { q: { pl: "Do kiedy trzeba zgłosić wybór podatku liniowego przy nowej firmie?", ru: "До какого срока нужно заявить выбор линейного налога в новой фирме?" },
              a: [{ pl: "Do 31 stycznia następnego roku", ru: "До 31 января следующего года" }, { pl: "Nie trzeba zgłaszać", ru: "Заявлять не нужно" }, { pl: "Do 30 kwietnia", ru: "До 30 апреля" }, { pl: "Do 20. dnia miesiąca po miesiącu pierwszego przychodu", ru: "До 20-го числа месяца, следующего за месяцем первой выручки" }],
              correct: 3, why: { pl: "Liniowy i ryczałt wymagają oświadczenia w tym terminie; skala jest formą domyślną.", ru: "Линейный налог и рычалт требуют заявления в этот срок; шкала — форма по умолчанию." } },
            { q: { pl: "Która forma jest zwykle najkorzystniejsza dla sklepu z bardzo wysokimi kosztami i niskim dochodem?", ru: "Какая форма обычно самая выгодная для магазина с очень высокими расходами и низким доходом?" },
              a: [{ pl: "Ryczałt", ru: "Рычалт" }, { pl: "Skala podatkowa", ru: "Налоговая шкала" }, { pl: "Karta podatkowa", ru: "Налоговая карта" }, { pl: "CIT estoński", ru: "Эстонский CIT" }],
              correct: 1, why: { pl: "Skala pozwala odliczyć koszty i daje kwotę wolną; ryczałt liczyłby podatek od całego przychodu. CIT estoński nie jest dostępny dla JDG.", ru: "Шкала позволяет вычесть расходы и даёт необлагаемый минимум; рычалт считал бы налог со всей выручки. Эстонский CIT недоступен для JDG." } },
            { q: { pl: "Kto w 2026 r. może korzystać z karty podatkowej?", ru: "Кто в 2026 г. может применять налоговую карту?" },
              a: [{ pl: "Każdy nowy przedsiębiorca", ru: "Любой новый предприниматель" }, { pl: "Tylko spółki z o.o.", ru: "Только sp. z o.o." }, { pl: "Tylko przedsiębiorcy kontynuujący kartę z wcześniejszych lat", ru: "Только предприниматели, продолжающие карту с прошлых лет" }, { pl: "Nikt, karta została zniesiona w 2026 r.", ru: "Никто, карта отменена в 2026 г." }],
              correct: 2, why: { pl: "Od 2022 r. nowi przedsiębiorcy nie mogą wybrać karty; mogą ją stosować tylko kontynuujący.", ru: "С 2022 г. новые предприниматели не могут выбрать карту; её могут применять только продолжающие." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Dochód w podatkach dochodowych to:", ru: "Доход в подоходных налогах — это:" },
          a: [{ pl: "przychód brutto", ru: "валовая выручка" }, { pl: "przychód minus koszty jego uzyskania", ru: "выручка минус расходы на её получение" }, { pl: "wartość majątku", ru: "стоимость имущества" }, { pl: "obrót z VAT", ru: "оборот с VAT" }],
          correct: 1, why: { pl: "To definicja prawna dochodu; gdy koszty przewyższają przychód, powstaje strata.", ru: "Это правовое определение дохода; если расходы превышают выручку, возникает убыток." } },
        { q: { pl: "Próg skali PIT w 2026 r. wynosi:", ru: "Порог шкалы PIT в 2026 г. составляет:" },
          a: [{ pl: "85 528 zł", ru: "85 528 зл" }, { pl: "100 000 zł", ru: "100 000 зл" }, { pl: "120 000 zł", ru: "120 000 зл" }, { pl: "1 000 000 zł", ru: "1 000 000 зл" }],
          correct: 2, why: { pl: "Do 120 000 zł stosuje się 12%, powyżej 32% od nadwyżki. 85 528 zł to dawny próg sprzed 2022 r.", ru: "До 120 000 зл — 12%, свыше — 32% с превышения. 85 528 зл — прежний порог до 2022 г." } },
        { q: { pl: "Przedsiębiorca na liniowym ma dochód 300 000 zł. Ile wynosi PIT?", ru: "У предпринимателя на линейном налоге доход 300 000 зл. Каков PIT?" },
          a: [{ pl: "57 000 zł", ru: "57 000 зл" }, { pl: "68 400 zł", ru: "68 400 зл" }, { pl: "36 000 zł", ru: "36 000 зл" }, { pl: "96 000 zł", ru: "96 000 зл" }],
          correct: 0, why: { pl: "300 000 × 19% = 57 000 zł; na liniowym nie ma kwoty wolnej.", ru: "300 000 × 19% = 57 000 зл; на линейном налоге необлагаемого минимума нет." } },
        { q: { pl: "Ten sam dochód 300 000 zł według skali to podatek:", ru: "Тот же доход 300 000 зл по шкале даёт налог:" },
          a: [{ pl: "57 000 zł", ru: "57 000 зл" }, { pl: "96 000 zł", ru: "96 000 зл" }, { pl: "75 600 zł", ru: "75 600 зл" }, { pl: "68 400 zł", ru: "68 400 зл" }],
          correct: 3, why: { pl: "10 800 + 32% × 180 000 = 10 800 + 57 600 = 68 400 zł.", ru: "10 800 + 32% × 180 000 = 10 800 + 57 600 = 68 400 зл." } },
        { q: { pl: "Spółka komandytowa od 2021 r.:", ru: "Коммандитное товарищество с 2021 г.:" },
          a: [{ pl: "jest podatnikiem CIT", ru: "является плательщиком CIT" }, { pl: "nie płaci żadnego podatku dochodowego", ru: "не платит никакого подоходного налога" }, { pl: "płaci wyłącznie VAT", ru: "платит только VAT" }, { pl: "płaci kartę podatkową", ru: "платит налоговую карту" }],
          correct: 0, why: { pl: "Spółki komandytowe i komandytowo-akcyjne z siedzibą w Polsce są podatnikami CIT.", ru: "Коммандитные и коммандитно-акционерные товарищества с местонахождением в Польше — плательщики CIT." } },
        { q: { pl: "Limit przychodów małego podatnika w CIT to równowartość:", ru: "Лимит выручки малого налогоплательщика в CIT — эквивалент:" },
          a: [{ pl: "200 000 zł", ru: "200 000 зл" }, { pl: "1 mln euro", ru: "1 млн евро" }, { pl: "2 mln euro", ru: "2 млн евро" }, { pl: "100 mln zł", ru: "100 млн зл" }],
          correct: 2, why: { pl: "Status małego podatnika i stawka 9% przysługują przy przychodach do równowartości 2 mln euro.", ru: "Статус малого налогоплательщика и ставка 9% положены при выручке до эквивалента 2 млн евро." } },
        { q: { pl: "Do kiedy wpłaca się miesięczne zaliczki na CIT?", ru: "До какого числа уплачиваются ежемесячные авансы по CIT?" },
          a: [{ pl: "Do 7. dnia miesiąca", ru: "До 7-го числа" }, { pl: "Do 20. dnia następnego miesiąca", ru: "До 20-го числа следующего месяца" }, { pl: "Do 25. dnia miesiąca", ru: "До 25-го числа" }, { pl: "Do końca kwartału", ru: "До конца квартала" }],
          correct: 1, why: { pl: "Art. 25 ustawy o CIT: zaliczki do 20. dnia każdego miesiąca za miesiąc poprzedni.", ru: "Ст. 25 закона о CIT: авансы до 20-го числа каждого месяца за предыдущий месяц." } },
        { q: { pl: "Stawki CIT estońskiego wynoszą:", ru: "Ставки эстонского CIT составляют:" },
          a: [{ pl: "9% i 19%", ru: "9% и 19%" }, { pl: "5% i 15%", ru: "5% и 15%" }, { pl: "12% i 32%", ru: "12% и 32%" }, { pl: "10% i 20%", ru: "10% и 20%" }],
          correct: 3, why: { pl: "Art. 28i: 10% dla małych i rozpoczynających działalność, 20% dla pozostałych.", ru: "Ст. 28i: 10% для малых и начинающих, 20% для остальных." } },
        { q: { pl: "Zawyżony czynsz płacony przez spółkę na CIT estońskim jej wspólnikowi to:", ru: "Завышенная аренда, которую общество на эстонском CIT платит участнику, — это:" },
          a: [{ pl: "ukryty zysk", ru: "скрытая прибыль" }, { pl: "koszt uzyskania przychodu bez skutków", ru: "расход без последствий" }, { pl: "darowizna zwolniona", ru: "освобождённое дарение" }, { pl: "przychód gminy", ru: "доход гмины" }],
          correct: 0, why: { pl: "Nadwyżka ponad czynsz rynkowy to świadczenie na rzecz wspólnika, które w istocie jest wypłatą zysku (art. 28m).", ru: "Превышение над рыночной арендой — предоставление участнику, по сути являющееся выплатой прибыли (ст. 28m)." } },
        { q: { pl: "Kto NIE może wybrać ryczałtu ewidencjonowanego bez względu na branżę?", ru: "Кто НЕ может выбрать рычалт независимо от отрасли?" },
          a: [{ pl: "Freelancer graficzny", ru: "Фрилансер-графический дизайнер" }, { pl: "Przedsiębiorca, którego przychody przekroczyły limit 2 mln euro", ru: "Предприниматель, чья выручка превысила лимит 2 млн евро" }, { pl: "Programista na JDG", ru: "Программист на JDG" }, { pl: "Konsultant HR", ru: "HR-консультант" }],
          correct: 1, why: { pl: "Ryczałt ma limit przychodów 2 mln euro; jego przekroczenie oznacza przejście na zasady ogólne.", ru: "У рычалт лимит выручки 2 млн евро; его превышение означает переход на общие правила." } },
        { q: { pl: "Wspólne rozliczenie z małżonkiem jest dostępne dla przedsiębiorcy na:", ru: "Совместная декларация с супругом доступна предпринимателю на:" },
          a: [{ pl: "podatku liniowym", ru: "линейном налоге" }, { pl: "ryczałcie", ru: "рычалт" }, { pl: "karcie podatkowej", ru: "налоговой карте" }, { pl: "skali podatkowej", ru: "налоговой шкале" }],
          correct: 3, why: { pl: "Splitting i ulga na dzieci to przywileje skali; inne formy je wykluczają.", ru: "Сплиттинг и льгота на детей — преимущества шкалы; другие формы их исключают." } },
        { q: { pl: "Ile wynosi PIT od dywidendy wypłaconej wspólnikowi?", ru: "Каков PIT с дивиденда, выплаченного участнику?" },
          a: [{ pl: "9%", ru: "9%" }, { pl: "12%", ru: "12%" }, { pl: "19%", ru: "19%" }, { pl: "32%", ru: "32%" }],
          correct: 2, why: { pl: "Dywidendy opodatkowane są zryczałtowanym PIT 19%; dlatego mówimy o podwójnym opodatkowaniu zysku spółki.", ru: "Дивиденды облагаются фиксированным PIT 19%; поэтому говорят о двойном налогообложении прибыли общества." } },
      ],
    },
    {
      n: 4,
      color: "--c4",
      title: { pl: "Podatki pośrednie: VAT i akcyza", ru: "Косвенные налоги: VAT и акциз" },
      lead: {
        pl: "Jak działa VAT: kto go płaci, od czego, według jakich stawek i jak odlicza się podatek naliczony. Czym jest akcyza, które wyroby obejmuje i jak się ją pobiera.",
        ru: "Как работает VAT: кто его платит, с чего, по каким ставкам и как вычитается входящий налог. Что такое акциз, какие товары он охватывает и как взимается.",
      },
      subs: [
        // ------------------------------------------------------------------ 4.1
        {
          id: "4.1",
          title: { pl: "VAT: istota i konstrukcja", ru: "VAT: сущность и конструкция" },
          src: "Podatki pośrednie 2024–2025: harmonizacja, zasady VAT, zakres podmiotowy i przedmiotowy, zwolnienia, obowiązek podatkowy, podstawa; Systematyka podatków w Polsce: VAT",
          body: {
            pl: `[[vat|VAT]] (*value added tax*), po polsku podatek od towarów i usług, to najważniejszy podatek w budżecie państwa. Reguluje go ustawa z 11 marca 2004 r., a na poziomie UE dyrektywa 2006/112/WE. VAT i akcyza to podatki **obrotowe**, **pośrednie** i **zharmonizowane** w Unii.

## Harmonizacja
Harmonizacja to ujednolicanie systemów podatkowych państw członkowskich. Cel: żeby podatki nie przeszkadzały w swobodnym przepływie towarów, usług i czynników produkcji na wspólnym rynku.

## Zasady wspólnego systemu VAT
- **powszechność**: obejmuje prawie cały obrót,
- **wielofazowość**: płacony na każdym etapie obrotu,
- **potrącalność**: podatnik odlicza VAT zapłacony przy zakupach,
- **neutralność**: dla przedsiębiorcy VAT ma być „przezroczysty”, ciężar ponosi konsument,
- **niezakłócanie konkurencji**,
- **proporcjonalna stawka**,
- **bezpośrednia skuteczność dyrektyw**: podatnik może powołać się na dyrektywę.

## Kto jest podatnikiem
Podatnikami są osoby prawne, jednostki bez osobowości prawnej i osoby fizyczne, które **samodzielnie wykonują działalność gospodarczą**, bez względu na jej cel lub rezultat. Organy władzy publicznej nie są podatnikami w zakresie swoich zadań publicznych, ale są nimi przy umowach cywilnoprawnych.

Firma, która chce lub musi być czynnym podatnikiem, składa zgłoszenie **VAT-R** do naczelnika urzędu skarbowego.

## Zwolnienie podmiotowe
Mały przedsiębiorca może korzystać ze zwolnienia podmiotowego, jeśli wartość jego sprzedaży nie przekroczyła limitu ustawowego. Materiały z 2024–2025 podają limit **200 000 zł** netto rocznie (proporcjonalnie przy rozpoczęciu działalności w trakcie roku).

> !uwaga Limit zwolnienia podmiotowego bywa zmieniany ustawą. Przed decyzją zawsze sprawdź kwotę obowiązującą w danym roku.

Zwolnienie **opłaca się**, gdy klientami są konsumenci (nie odliczą VAT), a **nie opłaca się**, gdy klientami są czynni podatnicy VAT, gdy firma robi duże zakupy inwestycyjne albo sprzedaje towary z obniżoną stawką. Ze zwolnienia można zrezygnować, składając zawiadomienie przed początkiem miesiąca.

## Zwolnienia przedmiotowe
Niezależnie od obrotów zwolnione są niektóre rodzaje usług (art. 43), m.in. **medyczne, edukacyjne, finansowe**, ubezpieczeniowe, pomocy społecznej.

## Co jest opodatkowane
Przedmiot VAT to:
1. odpłatna dostawa towarów i odpłatne świadczenie usług w kraju,
2. eksport towarów,
3. import towarów,
4. wewnątrzwspólnotowe nabycie towarów (WNT),
5. wewnątrzwspólnotowa dostawa towarów (WDT).

Opodatkowane są też towary, które zostały przy likwidacji JDG lub rozwiązaniu spółki osobowej. **Nie podlega** VAT zbycie przedsiębiorstwa lub jego zorganizowanej części.

## Kiedy powstaje obowiązek podatkowy
Zasada ogólna (art. 19a): **z chwilą dostawy towaru lub wykonania usługi**. Fakturę wystawia się co do zasady przy każdej sprzedaży dla firmy; konsumentowi tylko na jego żądanie.

## Podstawa opodatkowania
Podstawą jest wszystko, co stanowi zapłatę, którą sprzedawca otrzymał lub ma otrzymać, **bez kwoty samego VAT**. Do podstawy wlicza się m.in. inne podatki i cła (np. akcyzę), koszty transportu i opakowania. Nie wlicza się rabatów i opustów udzielonych przy sprzedaży.

## Stawki VAT

| Stawka | Przykłady |
|---|---|
| **23%** | podstawowa, większość towarów i usług |
| **8%** | niektóre produkty spożywcze, niektóre leki i usługi |
| **5%** | podstawowe produkty spożywcze, książki |
| **0%** | eksport, WDT, niektóre usługi międzynarodowe |

> !przyklad Kawiarnia sprzedaje kawę za 10 zł brutto ze stawką 23%. Cena netto = 10 / 1,23 ≈ 8,13 zł, VAT ≈ 1,87 zł. Kawiarnia odprowadza ten VAT, ale ekonomicznie zapłacił go klient.

> !zapamietaj VAT jest **powszechny, wielofazowy, potrącalny i neutralny** dla firmy. Stawki: **23%, 8%, 5%, 0%**. Podstawa to kwota należna **bez VAT**.`,
            ru: `[[vat|VAT]] (*value added tax*), по-польски налог на товары и услуги (podatek od towarów i usług), — важнейший налог государственного бюджета. Его регулирует закон от 11 марта 2004 г., а на уровне ЕС — директива 2006/112/WE. VAT и акциз — налоги **с оборота**, **косвенные** и **гармонизированные** в Союзе.

## Гармонизация
Гармонизация — унификация налоговых систем государств-членов. Цель: чтобы налоги не мешали свободному движению товаров, услуг и факторов производства на общем рынке.

## Принципы общей системы VAT
- **всеобщность**: охватывает почти весь оборот,
- **многоэтапность**: уплачивается на каждом этапе оборота,
- **зачётность**: налогоплательщик вычитает VAT, уплаченный при покупках,
- **нейтральность**: для предпринимателя VAT должен быть «прозрачным», тяжесть несёт потребитель,
- **неискажение конкуренции**,
- **пропорциональная ставка**,
- **прямое действие директив**: налогоплательщик может ссылаться на директиву.

## Кто налогоплательщик
Налогоплательщики — юридические лица, единицы без правосубъектности и физические лица, **самостоятельно ведущие хозяйственную деятельность**, независимо от её цели или результата. Органы публичной власти не являются налогоплательщиками в рамках своих публичных задач, но являются ими при гражданско-правовых договорах.

Фирма, которая хочет или обязана быть активным плательщиком, подаёт заявление **VAT-R** начальнику налоговой инспекции.

## Субъектное освобождение
Небольшой предприниматель может пользоваться субъектным освобождением, если объём его продаж не превысил законодательного лимита. Материалы 2024–2025 гг. называют лимит **200 000 зл** нетто в год (пропорционально при начале деятельности в течение года).

> !uwaga Лимит субъектного освобождения иногда меняется законом. Перед решением всегда проверяйте сумму, действующую в данном году.

Освобождение **выгодно**, когда клиенты — потребители (они не вычтут VAT), и **невыгодно**, когда клиенты — активные плательщики VAT, когда фирма делает крупные инвестиционные закупки или продаёт товары по пониженной ставке. От освобождения можно отказаться, подав уведомление до начала месяца.

## Предметные освобождения
Независимо от оборота освобождены некоторые виды услуг (ст. 43), в частности **медицинские, образовательные, финансовые**, страховые, социальной помощи.

## Что облагается
Объект VAT:
1. возмездная поставка товаров и возмездное оказание услуг внутри страны,
2. экспорт товаров,
3. импорт товаров,
4. внутрисоюзное приобретение товаров (WNT),
5. внутрисоюзная поставка товаров (WDT).

Облагаются также товары, оставшиеся при ликвидации JDG или роспуске товарищества. **Не облагается** VAT продажа предприятия или его организованной части.

## Когда возникает налоговая обязанность
Общее правило (ст. 19a): **в момент поставки товара или оказания услуги**. Счёт-фактура выставляется, как правило, при каждой продаже фирме; потребителю — только по его требованию.

## Налоговая база
База — всё, что составляет оплату, которую продавец получил или должен получить, **без суммы самого VAT**. В базу включаются, в частности, другие налоги и пошлины (например, акциз), расходы на транспорт и упаковку. Не включаются скидки, предоставленные при продаже.

## Ставки VAT

| Ставка | Примеры |
|---|---|
| **23%** | основная, большинство товаров и услуг |
| **8%** | некоторые продукты питания, некоторые лекарства и услуги |
| **5%** | основные продукты питания, книги |
| **0%** | экспорт, WDT, некоторые международные услуги |

> !przyklad Кафе продаёт кофе за 10 зл брутто по ставке 23%. Цена нетто = 10 / 1,23 ≈ 8,13 зл, VAT ≈ 1,87 зл. Кафе перечисляет этот VAT, но экономически его заплатил клиент.

> !zapamietaj VAT **всеобщий, многоэтапный, зачётный и нейтральный** для фирмы. Ставки: **23%, 8%, 5%, 0%**. База — причитающаяся сумма **без VAT**.`,
          },
          quiz: [
            { q: { pl: "Kto jest podatnikiem VAT?", ru: "Кто является плательщиком VAT?" },
              a: [{ pl: "Każdy konsument kupujący w sklepie", ru: "Любой потребитель, покупающий в магазине" }, { pl: "Podmiot samodzielnie wykonujący działalność gospodarczą, bez względu na jej cel lub rezultat", ru: "Субъект, самостоятельно ведущий хозяйственную деятельность, независимо от её цели или результата" }, { pl: "Tylko spółki akcyjne", ru: "Только акционерные общества" }, { pl: "Tylko importerzy", ru: "Только импортёры" }],
              correct: 1, why: { pl: "Konsument ponosi ekonomiczny ciężar VAT, ale formalnym podatnikiem jest przedsiębiorca.", ru: "Потребитель несёт экономическую тяжесть VAT, но формальный плательщик — предприниматель." } },
            { q: { pl: "Jaka jest podstawowa stawka VAT w Polsce?", ru: "Какова основная ставка VAT в Польше?" },
              a: [{ pl: "19%", ru: "19%" }, { pl: "8%", ru: "8%" }, { pl: "25%", ru: "25%" }, { pl: "23%", ru: "23%" }],
              correct: 3, why: { pl: "Stawka podstawowa wynosi 23%; obniżone to 8% i 5%, a 0% dotyczy m.in. eksportu i WDT.", ru: "Основная ставка — 23%; пониженные — 8% и 5%, а 0% касается, в частности, экспорта и WDT." } },
            { q: { pl: "Która czynność NIE podlega VAT?", ru: "Какая операция НЕ облагается VAT?" },
              a: [{ pl: "Zbycie przedsiębiorstwa", ru: "Продажа предприятия" }, { pl: "Import towarów", ru: "Импорт товаров" }, { pl: "Odpłatne świadczenie usług w kraju", ru: "Возмездное оказание услуг внутри страны" }, { pl: "Eksport towarów", ru: "Экспорт товаров" }],
              correct: 0, why: { pl: "Ustawy o VAT nie stosuje się do zbycia przedsiębiorstwa lub jego zorganizowanej części.", ru: "Закон о VAT не применяется к продаже предприятия или его организованной части." } },
            { q: { pl: "Kiedy zwolnienie podmiotowe z VAT jest zwykle NIEKORZYSTNE?", ru: "Когда субъектное освобождение от VAT обычно НЕВЫГОДНО?" },
              a: [{ pl: "Gdy klientami są wyłącznie konsumenci", ru: "Когда клиенты — только потребители" }, { pl: "Gdy firma sprzedaje usługi zwolnione przedmiotowo", ru: "Когда фирма продаёт предметно освобождённые услуги" }, { pl: "Gdy klientami są czynni podatnicy VAT lub firma robi duże zakupy inwestycyjne", ru: "Когда клиенты — активные плательщики VAT или фирма делает крупные инвестиционные закупки" }, { pl: "Nigdy", ru: "Никогда" }],
              correct: 2, why: { pl: "Zwolniony nie odliczy VAT od zakupów, a jego klienci-firmy nie zyskują na niższej cenie, bo i tak odliczyliby VAT.", ru: "Освобождённый не вычтет VAT с покупок, а его клиенты-фирмы не выигрывают от низкой цены, так как всё равно вычли бы VAT." } },
            { q: { pl: "Czy akcyza wchodzi do podstawy opodatkowania VAT?", ru: "Входит ли акциз в налоговую базу VAT?" },
              a: [{ pl: "Nie, nigdy", ru: "Нет, никогда" }, { pl: "Tak, podstawa obejmuje inne podatki i cła z wyjątkiem samego VAT", ru: "Да, база включает другие налоги и пошлины, кроме самого VAT" }, { pl: "Tylko przy eksporcie", ru: "Только при экспорте" }, { pl: "Tylko w gminach wiejskich", ru: "Только в сельских гминах" }],
              correct: 1, why: { pl: "Podstawa VAT obejmuje podatki, cła i opłaty z wyjątkiem kwoty VAT, więc VAT liczy się od ceny z akcyzą.", ru: "База VAT включает налоги, пошлины и сборы, кроме суммы VAT, поэтому VAT считается от цены с акцизом." } },
          ],
        },
        // ------------------------------------------------------------------ 4.2
        {
          id: "4.2",
          title: { pl: "Mechanizm odliczenia i rozliczanie VAT", ru: "Механизм вычета и расчёт VAT" },
          src: "Podatki pośrednie 2024–2025: rozrachunki VAT, przykład NASZE UBRANIA, fazy obrotu, „Co się bardziej opłaca?”, JPK, WIS, split payment, biała lista; Systematyka podatków w Polsce",
          body: {
            pl: `Najważniejsza cecha VAT to **potrącalność**. Każdy przedsiębiorca w łańcuchu płaci do urzędu tylko podatek od wartości, którą sam dodał. Dlatego mówi się o podatku od wartości dodanej.

## VAT należny i naliczony

| Pojęcie | Skąd się bierze | Skutek |
|---|---|---|
| [[vat-nalezny|VAT należny]] | z faktur **wystawionych** (sprzedaż) | zobowiązanie wobec urzędu |
| [[vat-naliczony|VAT naliczony]] | z faktur **otrzymanych** (zakup) | zmniejsza podatek do zapłaty |

$$ VAT do zapłaty = VAT należny − VAT naliczony | Jeśli wynik jest ujemny, powstaje nadwyżka do zwrotu lub przeniesienia

Odliczyć można VAT tylko od zakupów związanych z **działalnością opodatkowaną**.

## Przykład 1: jedna firma
Spółka NASZE UBRANIA kupiła wełnę za 10 000 zł netto i w tym samym miesiącu sprzedała garnitury za 12 000 zł netto (VAT 23%).

| | Zakup | Sprzedaż |
|---|---|---|
| Netto | 10 000 zł | 12 000 zł |
| VAT | 2 300 zł (naliczony) | 2 760 zł (należny) |

Do zapłaty: 2 760 − 2 300 = **460 zł**. To dokładnie 23% od wartości dodanej: (12 000 − 10 000) × 23% = 460 zł.

## Przykład 2: łańcuch trzech firm

| Faza | Netto | Brutto | VAT należny | VAT z poprzedniej fazy | Wpłata do US |
|---|---|---|---|---|---|
| Producent X | 1 000 | 1 230 | 230 | 0 | 230 |
| Hurtownik Y | 1 500 | 1 845 | 345 | 230 | 115 |
| Detalista Z | 1 800 | 2 214 | 414 | 345 | 69 |
| **Razem** | | | | | **414** |

Urząd dostał łącznie 414 zł, czyli 23% od ostatecznej ceny netto 1 800 zł. Każda firma zapłaciła tylko od swojej „dokładki”. Cały ciężar spadł na ostatniego nabywcę.

> !zapamietaj Dla przedsiębiorcy będącego czynnym podatnikiem VAT jest **neutralny**: pobiera go od klienta, odlicza od zakupów i wpłaca różnicę. Kosztem jest dopiero dla konsumenta.

## Przykład 3: czy opłaca się być „VATowcem”?
Pan Jan wykonuje 2 usługi miesięcznie po 1 500 zł. Ponosi koszty 1 230 zł brutto (1 000 zł netto + 230 zł VAT). Jego klienci są czynnymi podatnikami VAT.

| | Bez VAT (zwolniony) | Czynny podatnik VAT |
|---|---|---|
| Przychód netto | 3 000 zł | 3 000 zł (+ 690 zł VAT, który odda) |
| Koszty | 1 230 zł (VAT nie do odliczenia) | 1 000 zł (230 zł VAT odliczone) |
| VAT do urzędu | 0 | 690 − 230 = 460 zł |
| **Zysk miesięczny** | **1 770 zł** | **2 000 zł** |

Klientom-firmom cena 1 500 zł + VAT nie przeszkadza, bo odliczą VAT. Pan Jan zarabia więcej o 230 zł, bo odzyskuje VAT od swoich kosztów.

> !uwaga Gdyby klientami byli konsumenci, sytuacja byłaby odwrotna: musiałby albo podnieść cenę o 23%, albo „zjeść” VAT z marży.

## Rozliczanie i ewidencja
- Deklaracja VAT jest częścią pliku **JPK_V7M** (miesięcznie) albo **JPK_V7K** (kwartalnie). [[jpk|Jednolity Plik Kontrolny]] to księgi i dowody w formie elektronicznej; część plików wysyła się co miesiąc, inne na żądanie organu.
- Firma prowadzi ewidencję sprzedaży i zakupów, kontrahentów i dowodów.
- Sprzedaż dla konsumentów rejestruje się na **kasach rejestrujących** (online, wirtualnych itd.).
- **Mały podatnik** może stosować **metodę kasową**: rozlicza VAT należny dopiero po otrzymaniu zapłaty.

## Narzędzia uszczelniające
| Narzędzie | Na czym polega |
|---|---|
| [[split-payment|Split payment (MPP)]] | zapłata dzieli się: netto na rachunek sprzedawcy, VAT na jego specjalny rachunek VAT. Obowiązkowy przy towarach „wrażliwych” (np. stal, elektronika, paliwa, usługi budowlane), gdy faktura brutto przekracza 15 000 zł |
| Biała lista podatników VAT | darmowy wykaz prowadzony przez Szefa KAS; pozwala sprawdzić status kontrahenta i jego rachunek bankowy, do 5 lat wstecz |
| WIS (Wiążąca Informacja Stawkowa) | decyzja potwierdzająca właściwą stawkę VAT dla towaru lub usługi; chroni podatnika przy kontroli |
| KSeF i e-faktury | elektroniczny obieg faktur ułatwiający kontrolę |

> !przyklad Hurtownia kupuje laptopy za 40 000 zł brutto. Laptopy są na liście towarów wrażliwych, a faktura przekracza 15 000 zł, więc musi zapłacić w mechanizmie podzielonej płatności. 7 479,67 zł VAT trafi na rachunek VAT dostawcy, a nie na jego zwykły rachunek.`,
            ru: `Главная черта VAT — **зачётность**. Каждый предприниматель в цепочке платит налоговой только налог со стоимости, которую добавил сам. Поэтому и говорят о налоге на добавленную стоимость.

## Исходящий и входящий VAT

| Понятие | Откуда берётся | Последствие |
|---|---|---|
| [[vat-nalezny|Исходящий (начисленный) VAT]] (VAT należny) | из **выставленных** счетов (продажа) | обязательство перед налоговой |
| [[vat-naliczony|Входящий VAT]] (VAT naliczony) | из **полученных** счетов (покупка) | уменьшает налог к уплате |

$$ VAT к уплате = исходящий VAT − входящий VAT | Если результат отрицательный, возникает излишек к возврату или переносу

Вычесть можно VAT только с покупок, связанных с **облагаемой деятельностью**.

## Пример 1: одна фирма
Компания NASZE UBRANIA купила шерсть за 10 000 зл нетто и в том же месяце продала костюмы за 12 000 зл нетто (VAT 23%).

| | Покупка | Продажа |
|---|---|---|
| Нетто | 10 000 зл | 12 000 зл |
| VAT | 2 300 зл (входящий) | 2 760 зл (исходящий) |

К уплате: 2 760 − 2 300 = **460 зл**. Это ровно 23% с добавленной стоимости: (12 000 − 10 000) × 23% = 460 зл.

## Пример 2: цепочка из трёх фирм

| Этап | Нетто | Брутто | Исходящий VAT | VAT с предыдущего этапа | Платёж в налоговую |
|---|---|---|---|---|---|
| Производитель X | 1 000 | 1 230 | 230 | 0 | 230 |
| Оптовик Y | 1 500 | 1 845 | 345 | 230 | 115 |
| Розничный продавец Z | 1 800 | 2 214 | 414 | 345 | 69 |
| **Итого** | | | | | **414** |

Налоговая получила всего 414 зл, то есть 23% от конечной цены нетто 1 800 зл. Каждая фирма заплатила только со своей «надбавки». Вся тяжесть легла на последнего покупателя.

> !zapamietaj Для предпринимателя — активного плательщика VAT **нейтрален**: он взимает его с клиента, вычитает с покупок и платит разницу. Расходом он становится только для потребителя.

## Пример 3: выгодно ли быть плательщиком VAT?
Пан Ян оказывает 2 услуги в месяц по 1 500 зл. Его расходы — 1 230 зл брутто (1 000 зл нетто + 230 зл VAT). Его клиенты — активные плательщики VAT.

| | Без VAT (освобождён) | Активный плательщик VAT |
|---|---|---|
| Выручка нетто | 3 000 зл | 3 000 зл (+ 690 зл VAT, который он отдаст) |
| Расходы | 1 230 зл (VAT не вычитается) | 1 000 зл (230 зл VAT вычтено) |
| VAT в налоговую | 0 | 690 − 230 = 460 зл |
| **Месячная прибыль** | **1 770 зл** | **2 000 зл** |

Клиентам-фирмам цена 1 500 зл + VAT не мешает, так как они вычтут VAT. Пан Ян зарабатывает на 230 зл больше, потому что возвращает VAT со своих расходов.

> !uwaga Если бы клиентами были потребители, ситуация была бы обратной: пришлось бы либо поднять цену на 23%, либо «съесть» VAT из маржи.

## Расчёт и учёт
- Декларация VAT — часть файла **JPK_V7M** (ежемесячно) или **JPK_V7K** (ежеквартально). [[jpk|Единый контрольный файл]] (JPK) — книги и документы в электронной форме; часть файлов отправляется ежемесячно, другие — по требованию органа.
- Фирма ведёт реестр продаж и покупок, контрагентов и документов.
- Продажи потребителям регистрируются на **кассовых аппаратах** (онлайн, виртуальных и т. д.).
- **Малый налогоплательщик** может применять **кассовый метод**: рассчитывает исходящий VAT только после получения оплаты.

## Инструменты «уплотнения» VAT
| Инструмент | В чём состоит |
|---|---|
| [[split-payment|Раздельный платёж]] (split payment, MPP) | оплата делится: нетто — на счёт продавца, VAT — на его специальный VAT-счёт. Обязателен для «чувствительных» товаров (например, сталь, электроника, топливо, строительные услуги), если счёт брутто превышает 15 000 зл |
| «Белый список» плательщиков VAT | бесплатный реестр, который ведёт глава KAS; позволяет проверить статус контрагента и его банковский счёт, до 5 лет назад |
| WIS (обязывающая информация о ставке) | решение, подтверждающее правильную ставку VAT для товара или услуги; защищает налогоплательщика при проверке |
| KSeF и электронные счета | электронный оборот счетов, облегчающий контроль |

> !przyklad Оптовый склад покупает ноутбуки за 40 000 зл брутто. Ноутбуки — в списке чувствительных товаров, а счёт превышает 15 000 зл, поэтому платить нужно раздельным платежом. 7 479,67 зл VAT попадут на VAT-счёт поставщика, а не на его обычный счёт.`,
          },
          quiz: [
            { q: { pl: "Firma ma VAT należny 5 000 zł i VAT naliczony 3 200 zł. Ile wpłaci do urzędu?", ru: "У фирмы исходящий VAT 5 000 зл и входящий 3 200 зл. Сколько она заплатит в налоговую?" },
              a: [{ pl: "1 800 zł", ru: "1 800 зл" }, { pl: "8 200 zł", ru: "8 200 зл" }, { pl: "5 000 zł", ru: "5 000 зл" }, { pl: "3 200 zł", ru: "3 200 зл" }],
              correct: 0, why: { pl: "VAT do zapłaty = należny − naliczony = 5 000 − 3 200 = 1 800 zł.", ru: "VAT к уплате = исходящий − входящий = 5 000 − 3 200 = 1 800 зл." } },
            { q: { pl: "VAT naliczony to podatek wynikający z faktur:", ru: "Входящий VAT (naliczony) — налог из счетов:" },
              a: [{ pl: "wystawionych klientom", ru: "выставленных клиентам" }, { pl: "otrzymanych od dostawców (zakupy)", ru: "полученных от поставщиков (покупки)" }, { pl: "korygujących sprzedaż", ru: "корректирующих продажи" }, { pl: "wystawianych przez urząd", ru: "выставляемых налоговой" }],
              correct: 1, why: { pl: "Naliczony pochodzi z faktur zakupowych i zmniejsza podatek do zapłaty; należny pochodzi z faktur sprzedażowych.", ru: "Входящий берётся из счетов на покупку и уменьшает налог к уплате; исходящий — из счетов на продажу." } },
            { q: { pl: "W łańcuchu X → Y → Z ostatnia cena netto wynosi 1 800 zł (VAT 23%). Ile łącznie trafiło do urzędu?", ru: "В цепочке X → Y → Z последняя цена нетто 1 800 зл (VAT 23%). Сколько всего получила налоговая?" },
              a: [{ pl: "230 zł", ru: "230 зл" }, { pl: "989 zł", ru: "989 зл" }, { pl: "414 zł", ru: "414 зл" }, { pl: "69 zł", ru: "69 зл" }],
              correct: 2, why: { pl: "Suma wpłat 230 + 115 + 69 = 414 zł, czyli 23% od 1 800 zł. To dowód, że VAT obciąża tylko wartość dodaną.", ru: "Сумма платежей 230 + 115 + 69 = 414 зл, то есть 23% от 1 800 зл. Это доказывает, что VAT облагает только добавленную стоимость." } },
            { q: { pl: "Kiedy split payment jest obowiązkowy?", ru: "Когда раздельный платёж обязателен?" },
              a: [{ pl: "Przy każdej sprzedaży konsumentowi", ru: "При каждой продаже потребителю" }, { pl: "Tylko przy eksporcie", ru: "Только при экспорте" }, { pl: "Nigdy, jest dobrowolny", ru: "Никогда, он добровольный" }, { pl: "Przy towarach i usługach „wrażliwych”, gdy faktura brutto przekracza 15 000 zł", ru: "Для «чувствительных» товаров и услуг, если счёт брутто превышает 15 000 зл" }],
              correct: 3, why: { pl: "MPP jest obowiązkowy dla określonych branż ryzykownych (np. stal, elektronika, paliwa, budowlanka) powyżej 15 000 zł brutto.", ru: "MPP обязателен для определённых рискованных отраслей (сталь, электроника, топливо, стройка) свыше 15 000 зл брутто." } },
            { q: { pl: "Do czego służy biała lista podatników VAT?", ru: "Для чего служит «белый список» плательщиков VAT?" },
              a: [{ pl: "Do weryfikacji statusu kontrahenta i jego rachunku bankowego", ru: "Для проверки статуса контрагента и его банковского счёта" }, { pl: "Do zgłaszania zwolnień z akcyzy", ru: "Для заявления освобождений от акциза" }, { pl: "Do ustalania stawek podatku od nieruchomości", ru: "Для установления ставок налога на недвижимость" }, { pl: "Do rejestracji samochodów", ru: "Для регистрации автомобилей" }],
              correct: 0, why: { pl: "Wykaz prowadzi Szef KAS; pozwala sprawdzić, czy kontrahent jest czynnym podatnikiem VAT, do 5 lat wstecz.", ru: "Реестр ведёт глава KAS; он позволяет проверить, является ли контрагент активным плательщиком VAT, до 5 лет назад." } },
            { q: { pl: "Dlaczego w przykładzie pan Jan zarabia więcej jako czynny podatnik VAT?", ru: "Почему в примере пан Ян зарабатывает больше как активный плательщик VAT?" },
              a: [{ pl: "Bo nie płaci w ogóle VAT", ru: "Потому что вообще не платит VAT" }, { pl: "Bo podnosi cenę netto o 23%", ru: "Потому что поднимает цену нетто на 23%" }, { pl: "Bo odlicza VAT od swoich kosztów, a klienci-firmy odliczą VAT z jego faktur", ru: "Потому что вычитает VAT со своих расходов, а клиенты-фирмы вычтут VAT из его счетов" }, { pl: "Bo płaci niższy PIT", ru: "Потому что платит меньший PIT" }],
              correct: 2, why: { pl: "Jego koszty spadają z 1 230 zł do 1 000 zł netto, a cena netto 1 500 zł się nie zmienia. Zysk rośnie z 1 770 do 2 000 zł.", ru: "Его расходы падают с 1 230 зл до 1 000 зл нетто, а цена нетто 1 500 зл не меняется. Прибыль растёт с 1 770 до 2 000 зл." } },
          ],
        },
        // ------------------------------------------------------------------ 4.3
        {
          id: "4.3",
          title: { pl: "Podatek akcyzowy", ru: "Акциз" },
          src: "Podatki pośrednie 2024–2025: akcyza (podmiot, czynności, wyroby, obowiązek, podstawa, stawki 2025–2027, znaki, skład podatkowy, WIA); Podatek akcyzowy w Polsce",
          body: {
            pl: `[[akcyza|Akcyza]] (od łacińskiego *accidere*, „odcinać”) to podatek pośredni nakładany tylko na **wybrane towary**. Reguluje ją ustawa z 6 grudnia 2008 r. o podatku akcyzowym oraz dyrektywy UE (ogólna dyrektywa akcyzowa i dyrektywy sektorowe dla energii, alkoholu i tytoniu).

## Czym akcyza różni się od VAT

| | VAT | Akcyza |
|---|---|---|
| Zakres | powszechny, prawie wszystkie towary i usługi | wybiórczy, tylko wyroby akcyzowe |
| Fazy | wielofazowy | **jednofazowy**: płacony raz, zwykle przez producenta lub importera |
| Stawki | procentowe | kwotowe, procentowe albo mieszane |
| Odliczenie | VAT naliczony się odlicza | brak mechanizmu odliczania jak w VAT |

## Wyroby akcyzowe
Zharmonizowane w UE są:
- **wyroby energetyczne** (benzyna, olej napędowy, gaz),
- **energia elektryczna**,
- **napoje alkoholowe** i alkohol etylowy,
- **wyroby tytoniowe**.

Opodatkowanie innych wyrobów, np. **samochodów osobowych**, suszu tytoniowego, płynu do e-papierosów czy wyrobów nowatorskich, zależy od decyzji państwa członkowskiego.

## Po co jest akcyza
- **Cel fiskalny:** duże wpływy do budżetu.
- **Regulacja konsumpcji:** ogranicza spożycie produktów szkodliwych dla zdrowia.
- **Ochrona środowiska:** zachęca do ekologicznych rozwiązań energetycznych.

## Kto płaci i kiedy
Podatnikiem jest każdy (osoba fizyczna, prawna, jednostka), kto wykonuje czynność opodatkowaną akcyzą: przede wszystkim **producent** i **importer**, a także nabywca wewnątrzwspólnotowy. Podmioty akcyzowe rejestrują się w Centralnym Rejestrze Podmiotów Akcyzowych przed pierwszą czynnością.

Czynności opodatkowane to m.in. produkcja, wyprowadzenie ze składu podatkowego, import, nabycie wewnątrzwspólnotowe, a także posiadanie wyrobów, od których nie zapłacono akcyzy, i ich ubytki.

## Podstawa i stawki
- Przy stawce **procentowej** podstawą jest kwota należna ze sprzedaży pomniejszona o VAT i akcyzę (w imporcie: wartość celna plus cło).
- Przy stawce **kwotowej** podstawą jest ilość: litry, kilogramy, sztuki.

Stawki na wyroby tytoniowe rosną w kolejnych latach zgodnie z ustawową „mapą drogową”. Według materiałów stawka na papierosy wynosi w **2026 r. 414 zł za 1000 sztuk** (część kwotowa; w 2025 r. 345 zł), a na płyn do e-papierosów 1,44 zł/ml.

> !przyklad Mechanizm stawki kwotowej na alkohol (stawka z 2025 r. z materiałów: 7 991 zł za hektolitr czystego alkoholu). Butelka 0,5 l wódki 40%: czysty alkohol = 0,5 × 0,4 = 0,2 l = 0,002 hl. Akcyza = 7 991 × 0,002 ≈ **15,98 zł**. Od ceny z akcyzą liczy się jeszcze VAT 23%, więc podatki stanowią dużą część ceny.

## Skład podatkowy i zawieszenie poboru
[[sklad-podatkowy|Skład podatkowy]] to miejsce, w którym wyroby akcyzowe produkuje się, magazynuje, przeładowuje albo z którego się je wyprowadza w **procedurze zawieszenia poboru akcyzy**. Dopóki towar jest w składzie, obowiązek podatkowy istnieje, ale zobowiązanie nie powstaje. Akcyzę płaci się dopiero przy wyprowadzeniu wyrobu do konsumpcji. To poprawia płynność producenta. Prowadzenie składu wymaga zezwolenia i zabezpieczenia akcyzowego.

Przemieszczanie wyrobów w UE z zawieszeniem akcyzy odbywa się w systemie **EMCS** z elektronicznym dokumentem e-AD. Akcyzę płaci się w kraju **konsumpcji**, według jego stawek.

## Znaki akcyzy
Niektóre wyroby (m.in. papierosy, alkohol) trzeba oznaczać [[znaki-akcyzy|znakami akcyzy]], np. banderolami. **Podatkowe** znaki potwierdzają wpłatę kwoty odpowiadającej ich wartości (swoistej zaliczki na akcyzę), a **legalizacyjne** potwierdzają prawo do sprzedaży. Brak banderoli oznacza nielegalny obrót: konfiskatę towaru i sankcje karne skarbowe.

## Płatność
Deklaracje i zapłata co do zasady za okresy miesięczne, **do 25. dnia** miesiąca następnego. W razie wątpliwości co do klasyfikacji wyrobu można uzyskać **Wiążącą Informację Akcyzową (WIA)**, ważną 5 lat.

> !zapamietaj Akcyza jest **wybiórcza i jednofazowa**. Obejmuje energię, alkohol, tytoń (zharmonizowane) i np. samochody osobowe. W **składzie podatkowym** pobór jest zawieszony. Płaci się ją do **25. dnia** następnego miesiąca.`,
            ru: `[[akcyza|Акциз]] (от латинского *accidere*, «отсекать») — косвенный налог, которым облагаются только **отдельные товары**. Его регулируют закон от 6 декабря 2008 г. об акцизе и директивы ЕС (общая акцизная директива и отраслевые директивы по энергии, алкоголю и табаку).

## Чем акциз отличается от VAT

| | VAT | Акциз |
|---|---|---|
| Охват | всеобщий, почти все товары и услуги | выборочный, только подакцизные товары |
| Этапы | многоэтапный | **одноэтапный**: платится один раз, обычно производителем или импортёром |
| Ставки | процентные | твёрдые, процентные или смешанные |
| Вычет | входящий VAT вычитается | механизма вычета как в VAT нет |

## Подакцизные товары
Гармонизированы в ЕС:
- **энергетические продукты** (бензин, дизельное топливо, газ),
- **электроэнергия**,
- **алкогольные напитки** и этиловый спирт,
- **табачные изделия**.

Налогообложение других товаров, например **легковых автомобилей**, табачного сырья, жидкости для электронных сигарет или новых табачных изделий, зависит от решения государства-члена.

## Зачем нужен акциз
- **Фискальная цель:** крупные поступления в бюджет.
- **Регулирование потребления:** ограничивает потребление вредных для здоровья продуктов.
- **Защита окружающей среды:** поощряет экологичные энергетические решения.

## Кто платит и когда
Налогоплательщик — каждый (физическое, юридическое лицо, организация), кто совершает облагаемую акцизом операцию: прежде всего **производитель** и **импортёр**, а также внутрисоюзный приобретатель. Подакцизные субъекты регистрируются в Центральном реестре подакцизных субъектов до первой операции.

Облагаемые операции — в частности производство, вывоз с налогового склада, импорт, внутрисоюзное приобретение, а также владение товарами, с которых не уплачен акциз, и их недостача.

## База и ставки
- При **процентной** ставке база — сумма продажи за вычетом VAT и акциза (при импорте — таможенная стоимость плюс пошлина).
- При **твёрдой** ставке база — количество: литры, килограммы, штуки.

Ставки на табачные изделия растут в следующие годы по законодательной «дорожной карте». По материалам ставка на сигареты в **2026 г. — 414 зл за 1000 штук** (твёрдая часть; в 2025 г. — 345 зл), а на жидкость для электронных сигарет — 1,44 зл/мл.

> !przyklad Механизм твёрдой ставки на алкоголь (ставка 2025 г. из материалов: 7 991 зл за гектолитр чистого спирта). Бутылка 0,5 л водки 40%: чистый спирт = 0,5 × 0,4 = 0,2 л = 0,002 гл. Акциз = 7 991 × 0,002 ≈ **15,98 зл**. С цены с акцизом считается ещё VAT 23%, так что налоги составляют большую часть цены.

## Налоговый склад и приостановление взимания
[[sklad-podatkowy|Налоговый склад]] — место, где подакцизные товары производятся, хранятся, перегружаются или откуда вывозятся в **процедуре приостановления взимания акциза**. Пока товар на складе, налоговая обязанность существует, но обязательство не возникает. Акциз платится только при выпуске товара в потребление. Это улучшает ликвидность производителя. Для ведения склада нужны разрешение и акцизное обеспечение.

Перемещение товаров в ЕС с приостановлением акциза идёт в системе **EMCS** с электронным документом e-AD. Акциз платится в стране **потребления** по её ставкам.

## Акцизные марки
Некоторые товары (в частности сигареты, алкоголь) нужно маркировать [[znaki-akcyzy|акцизными марками]] (znaki akcyzy), например бандеролями. **Налоговые** марки подтверждают уплату суммы, равной их стоимости (своего рода аванса по акцизу), а **легализационные** — право на продажу. Отсутствие бандероли означает нелегальный оборот: конфискацию товара и уголовно-фискальные санкции.

## Уплата
Декларации и уплата, как правило, за месячные периоды, **до 25-го числа** следующего месяца. При сомнениях в классификации товара можно получить **обязывающую акцизную информацию (WIA)**, действующую 5 лет.

> !zapamietaj Акциз **выборочный и одноэтапный**. Охватывает энергию, алкоголь, табак (гармонизированные) и, например, легковые автомобили. На **налоговом складе** взимание приостановлено. Платится до **25-го числа** следующего месяца.`,
          },
          quiz: [
            { q: { pl: "Akcyza jest podatkiem:", ru: "Акциз — это налог:" },
              a: [{ pl: "powszechnym i wielofazowym", ru: "всеобщий и многоэтапный" }, { pl: "bezpośrednim i dochodowym", ru: "прямой и подоходный" }, { pl: "wybiórczym i jednofazowym", ru: "выборочный и одноэтапный" }, { pl: "lokalnym", ru: "местный" }],
              correct: 2, why: { pl: "Akcyza obejmuje tylko wybrane wyroby i płaci się ją raz w łańcuchu, zwykle przy produkcji lub imporcie.", ru: "Акциз охватывает только отдельные товары и платится один раз в цепочке, обычно при производстве или импорте." } },
            { q: { pl: "Które wyroby akcyzowe NIE są zharmonizowane w UE?", ru: "Какие подакцизные товары НЕ гармонизированы в ЕС?" },
              a: [{ pl: "Samochody osobowe", ru: "Легковые автомобили" }, { pl: "Napoje alkoholowe", ru: "Алкогольные напитки" }, { pl: "Wyroby tytoniowe", ru: "Табачные изделия" }, { pl: "Energia elektryczna", ru: "Электроэнергия" }],
              correct: 0, why: { pl: "Akcyza od samochodów osobowych to decyzja krajowa; energia, alkohol i tytoń są zharmonizowane.", ru: "Акциз на легковые автомобили — национальное решение; энергия, алкоголь и табак гармонизированы." } },
            { q: { pl: "Co oznacza procedura zawieszenia poboru akcyzy w składzie podatkowym?", ru: "Что означает процедура приостановления акциза на налоговом складе?" },
              a: [{ pl: "Wyroby w składzie są na zawsze zwolnione", ru: "Товары на складе навсегда освобождены" }, { pl: "Akcyzę płaci się dopiero przy wyprowadzeniu wyrobu do konsumpcji", ru: "Акциз платится только при выпуске товара в потребление" }, { pl: "Akcyzę płaci się podwójnie", ru: "Акциз платится дважды" }, { pl: "Skład płaci VAT zamiast akcyzy", ru: "Склад платит VAT вместо акциза" }],
              correct: 1, why: { pl: "W składzie zobowiązanie nie powstaje; płatność odsuwa się do momentu wyprowadzenia wyrobu, co poprawia płynność.", ru: "На складе обязательство не возникает; уплата отодвигается до вывоза товара, что улучшает ликвидность." } },
            { q: { pl: "Ile wynosi akcyza na butelkę 0,5 l wódki 40% przy stawce 7 991 zł/hl czystego alkoholu?", ru: "Каков акциз на бутылку 0,5 л водки 40% при ставке 7 991 зл/гл чистого спирта?" },
              a: [{ pl: "7,99 zł", ru: "7,99 зл" }, { pl: "39,96 zł", ru: "39,96 зл" }, { pl: "3,20 zł", ru: "3,20 зл" }, { pl: "ok. 15,98 zł", ru: "около 15,98 зл" }],
              correct: 3, why: { pl: "0,5 l × 40% = 0,2 l = 0,002 hl; 7 991 × 0,002 ≈ 15,98 zł.", ru: "0,5 л × 40% = 0,2 л = 0,002 гл; 7 991 × 0,002 ≈ 15,98 зл." } },
            { q: { pl: "Co potwierdza podatkowy znak akcyzy (banderola)?", ru: "Что подтверждает налоговая акцизная марка (бандероль)?" },
              a: [{ pl: "Że wyrób jest zwolniony z VAT", ru: "Что товар освобождён от VAT" }, { pl: "Że producent ma certyfikat jakości", ru: "Что у производителя есть сертификат качества" }, { pl: "Wpłatę kwoty odpowiadającej wartości znaku i legalne pochodzenie towaru", ru: "Уплату суммы, равной стоимости марки, и легальное происхождение товара" }, { pl: "Datę ważności produktu", ru: "Срок годности продукта" }],
              correct: 2, why: { pl: "Banderola działa jak zaliczka na akcyzę i dowód legalności; jej brak oznacza nielegalny obrót.", ru: "Бандероль действует как аванс по акцизу и доказательство легальности; её отсутствие означает нелегальный оборот." } },
          ],
        },
      ],
      final: [
        { q: { pl: "VAT i akcyza to podatki:", ru: "VAT и акциз — налоги:" },
          a: [{ pl: "bezpośrednie i lokalne", ru: "прямые и местные" }, { pl: "obrotowe, pośrednie i zharmonizowane w UE", ru: "с оборота, косвенные и гармонизированные в ЕС" }, { pl: "majątkowe", ru: "имущественные" }, { pl: "dochodowe", ru: "подоходные" }],
          correct: 1, why: { pl: "Oba obciążają obrót, ciężar przerzucany jest na konsumenta, a ich konstrukcję wyznaczają dyrektywy UE.", ru: "Оба облагают оборот, тяжесть перекладывается на потребителя, а их конструкцию задают директивы ЕС." } },
        { q: { pl: "Zasada neutralności VAT oznacza, że:", ru: "Принцип нейтральности VAT означает, что:" },
          a: [{ pl: "VAT jest zawsze 0%", ru: "VAT всегда 0%" }, { pl: "VAT płacą tylko banki", ru: "VAT платят только банки" }, { pl: "dla czynnego podatnika VAT nie jest kosztem, ciężar ponosi konsument", ru: "для активного плательщика VAT не является расходом, тяжесть несёт потребитель" }, { pl: "VAT nie podlega kontroli", ru: "VAT не подлежит проверке" }],
          correct: 2, why: { pl: "Dzięki odliczeniu VAT naliczonego przedsiębiorca rozlicza tylko różnicę, a pełny podatek zawiera cena dla konsumenta.", ru: "Благодаря вычету входящего VAT предприниматель рассчитывает только разницу, а полный налог содержится в цене для потребителя." } },
        { q: { pl: "Stawka 0% VAT dotyczy m.in.:", ru: "Ставка VAT 0% применяется, в частности, к:" },
          a: [{ pl: "eksportu i wewnątrzwspólnotowej dostawy towarów", ru: "экспорту и внутрисоюзной поставке товаров" }, { pl: "usług prawniczych", ru: "юридическим услугам" }, { pl: "sprzedaży paliwa w kraju", ru: "продаже топлива внутри страны" }, { pl: "usług fryzjerskich", ru: "парикмахерским услугам" }],
          correct: 0, why: { pl: "0% przy eksporcie i WDT pozwala odliczyć VAT od zakupów, a podatek rozlicza się w kraju nabywcy.", ru: "0% при экспорте и WDT позволяет вычесть VAT с покупок, а налог рассчитывается в стране покупателя." } },
        { q: { pl: "Który dokument zgłasza się, by zostać czynnym podatnikiem VAT?", ru: "Какой документ подают, чтобы стать активным плательщиком VAT?" },
          a: [{ pl: "CIT-8", ru: "CIT-8" }, { pl: "SD-Z2", ru: "SD-Z2" }, { pl: "ZAW-RD", ru: "ZAW-RD" }, { pl: "VAT-R", ru: "VAT-R" }],
          correct: 3, why: { pl: "Rejestracja VAT odbywa się na formularzu VAT-R u naczelnika urzędu skarbowego.", ru: "Регистрация по VAT проходит по форме VAT-R у начальника налоговой инспекции." } },
        { q: { pl: "Usługi medyczne i edukacyjne w VAT to przykład:", ru: "Медицинские и образовательные услуги в VAT — пример:" },
          a: [{ pl: "zwolnienia podmiotowego", ru: "субъектного освобождения" }, { pl: "zwolnienia przedmiotowego", ru: "предметного освобождения" }, { pl: "stawki 23%", ru: "ставки 23%" }, { pl: "procedury zawieszenia", ru: "процедуры приостановления" }],
          correct: 1, why: { pl: "Zwolnienia przedmiotowe (art. 43) zależą od rodzaju usługi, a nie od wielkości obrotów.", ru: "Предметные освобождения (ст. 43) зависят от вида услуги, а не от размера оборота." } },
        { q: { pl: "Firma kupiła towar za 20 000 zł netto i sprzedała za 26 000 zł netto (23%). Ile VAT wpłaci?", ru: "Фирма купила товар за 20 000 зл нетто и продала за 26 000 зл нетто (23%). Сколько VAT она заплатит?" },
          a: [{ pl: "1 380 zł", ru: "1 380 зл" }, { pl: "5 980 zł", ru: "5 980 зл" }, { pl: "4 600 zł", ru: "4 600 зл" }, { pl: "6 000 zł", ru: "6 000 зл" }],
          correct: 0, why: { pl: "Należny 5 980 zł − naliczony 4 600 zł = 1 380 zł, czyli 23% od 6 000 zł wartości dodanej.", ru: "Исходящий 5 980 зл − входящий 4 600 зл = 1 380 зл, то есть 23% от 6 000 зл добавленной стоимости." } },
        { q: { pl: "Metoda kasowa w VAT pozwala małemu podatnikowi:", ru: "Кассовый метод в VAT позволяет малому налогоплательщику:" },
          a: [{ pl: "nie płacić VAT w ogóle", ru: "вообще не платить VAT" }, { pl: "stosować stawkę 5%", ru: "применять ставку 5%" }, { pl: "rozliczać VAT należny dopiero po otrzymaniu zapłaty od klienta", ru: "рассчитывать исходящий VAT только после получения оплаты от клиента" }, { pl: "nie wystawiać faktur", ru: "не выставлять счета" }],
          correct: 2, why: { pl: "Metoda kasowa przesuwa rozliczenie podatku na okres otrzymania zapłaty, co chroni płynność.", ru: "Кассовый метод переносит расчёт налога на период получения оплаты, что защищает ликвидность." } },
        { q: { pl: "WIS to:", ru: "WIS — это:" },
          a: [{ pl: "wykaz podatników VAT", ru: "реестр плательщиков VAT" }, { pl: "deklaracja akcyzowa", ru: "акцизная декларация" }, { pl: "rachunek VAT w banku", ru: "VAT-счёт в банке" }, { pl: "Wiążąca Informacja Stawkowa potwierdzająca stawkę VAT", ru: "Обязывающая информация о ставке, подтверждающая ставку VAT" }],
          correct: 3, why: { pl: "WIS chroni podatnika: jeśli zastosuje stawkę z WIS, organ przy kontroli jej nie zakwestionuje.", ru: "WIS защищает налогоплательщика: если он применил ставку из WIS, орган при проверке её не оспорит." } },
        { q: { pl: "Podatnikiem akcyzy jest przede wszystkim:", ru: "Плательщиком акциза является прежде всего:" },
          a: [{ pl: "producent lub importer wyrobów akcyzowych", ru: "производитель или импортёр подакцизных товаров" }, { pl: "konsument w sklepie", ru: "потребитель в магазине" }, { pl: "gmina", ru: "гмина" }, { pl: "bank prowadzący rachunek", ru: "банк, ведущий счёт" }],
          correct: 0, why: { pl: "Akcyza jest jednofazowa i co do zasady rozlicza ją producent lub importer, choć ciężar ponosi konsument.", ru: "Акциз одноэтапный и, как правило, его рассчитывает производитель или импортёр, хотя тяжесть несёт потребитель." } },
        { q: { pl: "Stawka akcyzy na papierosy (część kwotowa) w 2026 r. według materiałów wynosi:", ru: "Ставка акциза на сигареты (твёрдая часть) в 2026 г. по материалам составляет:" },
          a: [{ pl: "276 zł/1000 szt.", ru: "276 зл/1000 шт." }, { pl: "345 zł/1000 szt.", ru: "345 зл/1000 шт." }, { pl: "414 zł/1000 szt.", ru: "414 зл/1000 шт." }, { pl: "476,10 zł/1000 szt.", ru: "476,10 зл/1000 шт." }],
          correct: 2, why: { pl: "Mapa drogowa: 2025 — 345 zł, 2026 — 414 zł, 2027 — 476,10 zł za 1000 sztuk.", ru: "Дорожная карта: 2025 — 345 зл, 2026 — 414 зл, 2027 — 476,10 зл за 1000 штук." } },
        { q: { pl: "W którym systemie przemieszcza się wyroby akcyzowe w UE z zawieszeniem poboru akcyzy?", ru: "В какой системе подакцизные товары перемещаются в ЕС с приостановлением акциза?" },
          a: [{ pl: "KSeF", ru: "KSeF" }, { pl: "EMCS (dokument e-AD)", ru: "EMCS (документ e-AD)" }, { pl: "JPK_V7", ru: "JPK_V7" }, { pl: "CEIDG", ru: "CEIDG" }],
          correct: 1, why: { pl: "EMCS monitoruje przesyłki w czasie rzeczywistym; akcyzę płaci się w kraju konsumpcji.", ru: "EMCS отслеживает перевозки в реальном времени; акциз платится в стране потребления." } },
        { q: { pl: "Do kiedy co do zasady płaci się akcyzę za dany miesiąc?", ru: "До какого числа, как правило, уплачивается акциз за месяц?" },
          a: [{ pl: "Do 7. dnia następnego miesiąca", ru: "До 7-го числа следующего месяца" }, { pl: "Do 20. dnia następnego miesiąca", ru: "До 20-го числа следующего месяца" }, { pl: "Do końca kwartału", ru: "До конца квартала" }, { pl: "Do 25. dnia następnego miesiąca", ru: "До 25-го числа следующего месяца" }],
          correct: 3, why: { pl: "Deklaracja i zapłata akcyzy za okresy miesięczne: do 25. dnia miesiąca następującego.", ru: "Декларация и уплата акциза за месячные периоды: до 25-го числа следующего месяца." } },
      ],
    },
    {
      n: 5,
      color: "--c5",
      title: { pl: "Podatek od spadków i darowizn", ru: "Налог на наследство и дарение" },
      lead: {
        pl: "Kto płaci podatek, gdy dostaje coś za darmo: grupy podatkowe, kwoty wolne i stawki na 2026 r., zwolnienie dla najbliższej rodziny z art. 4a, terminy i rozwiązane krok po kroku kazusy.",
        ru: "Кто платит налог, когда получает что-то безвозмездно: налоговые группы, необлагаемые суммы и ставки на 2026 г., освобождение для ближайших родственников по ст. 4a, сроки и пошагово решённые казусы.",
      },
      subs: [
        // ------------------------------------------------------------------ 5.1
        {
          id: "5.1",
          title: { pl: "Konstrukcja podatku: przedmiot, grupy, kwoty wolne i stawki", ru: "Конструкция налога: объект, группы, необлагаемые суммы и ставки" },
          src: "Podatek od spadków i darowizn – 2026 (podstawy prawne, grupy, kwoty wolne, skala, przykłady); ustawa z 28 lipca 1983 r.",
          body: {
            pl: `[[podatek-od-spadkow|Podatek od spadków i darowizn]] reguluje ustawa z 28 lipca 1983 r. Mimo wieku to wciąż obowiązujący akt, wielokrotnie nowelizowany. Podatek obciąża **nieodpłatne nabycie** rzeczy i praw majątkowych.

## Co jest opodatkowane
Podatkowi podlega nabycie:
- w drodze **dziedziczenia** (ustawowego i testamentowego), zapisu, dalszego zapisu, zapisu windykacyjnego, polecenia testamentowego,
- w drodze **darowizny** i polecenia darczyńcy,
- przez **zasiedzenie**,
- przez **nieodpłatne zniesienie współwłasności**.

Obowiązuje zasada **terytorialności**: opodatkowane są rzeczy znajdujące się w Polsce i prawa majątkowe wykonywane w Polsce. Podatnikiem jest **nabywca**, czyli ten, kto dostaje majątek (spadkobierca, obdarowany).

## Grupy podatkowe
Wysokość podatku zależy przede wszystkim od tego, jak blisko spokrewniony jest nabywca z darczyńcą lub spadkodawcą. To jest [[grupa-podatkowa|grupa podatkowa]].

| Grupa | Kto należy |
|---|---|
| **I** | małżonek, zstępni (dzieci, wnuki), wstępni (rodzice, dziadkowie), pasierb, rodzeństwo, ojczym, macocha, teściowie, zięć, synowa |
| **II** | zstępni rodzeństwa (siostrzeńcy, bratankowie), rodzeństwo rodziców (wujkowie, ciotki), zstępni i małżonkowie pasierbów, małżonkowie rodzeństwa i rodzeństwo małżonków, małżonkowie rodzeństwa małżonków, małżonkowie innych zstępnych |
| **III** | wszyscy pozostali, w tym osoby niespokrewnione, przyjaciele, partnerzy bez ślubu |

> !uwaga Partner w związku nieformalnym (konkubent) należy do **grupy III**, nawet jeśli para żyje razem od lat. Prawo podatkowe patrzy na pokrewieństwo i małżeństwo, a nie na faktyczną bliskość.

## Kwoty wolne
Nabycie jest wolne od podatku, jeśli jego wartość nie przekracza [[kwota-wolna|kwoty wolnej]] dla danej grupy:

| Grupa I | Grupa II | Grupa III |
|---|---|---|
| **36 120 zł** | **27 090 zł** | **5 733 zł** |

Wartość nabyć od tej samej osoby w ciągu **5 lat** przed ostatnim nabyciem sumuje się (to wiedza ustawowa, którą trzeba pamiętać przy kilku darowiznach od tej samej osoby).

## Stawki
Podatek liczy się od **nadwyżki** ponad kwotę wolną, według progresji szczeblowej:

| Nadwyżka | Grupa I | Grupa II | Grupa III |
|---|---|---|---|
| do 11 833 zł | 3% | 7% | 12% |
| 11 833 – 23 665 zł | 5% | 9% | 16% |
| powyżej 23 665 zł | 7% | 12% | 20% |

## Przykład 1: spadek w grupie I
Wartość spadku: 50 000 zł. Kwota wolna grupy I: 36 120 zł.
1. Podstawa: 50 000 − 36 120 = **13 880 zł**.
2. Od pierwszych 11 833 zł: 11 833 × 3% = 355 zł.
3. Od reszty 2 047 zł: 2 047 × 5% = 102,35 zł.
4. Podatek: **ok. 457 zł**, czyli około 0,9% wartości spadku.

(Gdyby spadkobierca był małżonkiem lub dzieckiem i terminowo zgłosił nabycie, mógłby w ogóle nie płacić. O tym w podtemacie 5.2.)

## Przykład 2: darowizna w grupie III
Darowizna 20 000 zł od znajomego.
1. Podstawa: 20 000 − 5 733 = **14 267 zł**.
2. Od 11 833 zł: 12% = 1 419,96 zł.
3. Od 2 434 zł: 16% = 389,44 zł.
4. Podatek: **ok. 1 809 zł**.

> !przyklad Ta sama darowizna 20 000 zł dla brata (grupa I) nie wywoła podatku nawet bez zwolnienia, bo mieści się w kwocie wolnej 36 120 zł. Różnica między grupami jest ogromna.

## Kto dostaje pieniądze
Podatek wymierza i pobiera **naczelnik urzędu skarbowego**, ale wpływy w całości trafiają do budżetu **gminy**. Dlatego mówi się, że to podatek samorządowy pobierany przez urząd skarbowy.

> !zapamietaj Podatnikiem jest **nabywca**. Trzy grupy, kwoty wolne **36 120 / 27 090 / 5 733 zł**, stawki **3–7% / 7–12% / 12–20%**. Podatek pobiera urząd skarbowy, a dochód trafia do gminy.`,
            ru: `[[podatek-od-spadkow|Налог на наследство и дарение]] регулирует закон от 28 июля 1983 г. Несмотря на возраст, это действующий акт, многократно изменявшийся. Налогом облагается **безвозмездное приобретение** вещей и имущественных прав.

## Что облагается
Налогом облагается приобретение:
- путём **наследования** (по закону и по завещанию), легата, последующего легата, виндикационного легата, завещательного возложения,
- путём **дарения** и возложения дарителя,
- в силу **приобретательной давности**,
- путём **безвозмездного прекращения общей собственности**.

Действует принцип **территориальности**: облагаются вещи, находящиеся в Польше, и имущественные права, осуществляемые в Польше. Налогоплательщик — **приобретатель**, то есть тот, кто получает имущество (наследник, одаряемый).

## Налоговые группы
Размер налога зависит прежде всего от того, насколько близко приобретатель связан родством с дарителем или наследодателем. Это [[grupa-podatkowa|налоговая группа]].

| Группа | Кто входит |
|---|---|
| **I** | супруг, нисходящие (дети, внуки), восходящие (родители, бабушки и дедушки), пасынок/падчерица, братья и сёстры, отчим, мачеха, родители супруга, зять, невестка |
| **II** | нисходящие братьев и сестёр (племянники), братья и сёстры родителей (дяди, тёти), нисходящие и супруги пасынков, супруги братьев и сестёр и братья и сёстры супруга, супруги братьев и сестёр супруга, супруги других нисходящих |
| **III** | все остальные, в том числе неродственники, друзья, партнёры без брака |

> !uwaga Партнёр в неформальном союзе (сожитель) относится к **группе III**, даже если пара живёт вместе много лет. Налоговое право смотрит на родство и брак, а не на фактическую близость.

## Необлагаемые суммы
Приобретение не облагается, если его стоимость не превышает [[kwota-wolna|необлагаемой суммы]] для группы:

| Группа I | Группа II | Группа III |
|---|---|---|
| **36 120 зл** | **27 090 зл** | **5 733 зл** |

Стоимость приобретений от одного и того же лица за **5 лет** до последнего приобретения суммируется (это законодательное правило, о котором нужно помнить при нескольких дарениях от одного лица).

## Ставки
Налог считается с **превышения** над необлагаемой суммой по ступенчатой прогрессии:

| Превышение | Группа I | Группа II | Группа III |
|---|---|---|---|
| до 11 833 зл | 3% | 7% | 12% |
| 11 833 – 23 665 зл | 5% | 9% | 16% |
| свыше 23 665 зл | 7% | 12% | 20% |

## Пример 1: наследство в группе I
Стоимость наследства: 50 000 зл. Необлагаемая сумма группы I: 36 120 зл.
1. База: 50 000 − 36 120 = **13 880 зл**.
2. С первых 11 833 зл: 11 833 × 3% = 355 зл.
3. С остатка 2 047 зл: 2 047 × 5% = 102,35 зл.
4. Налог: **около 457 зл**, то есть примерно 0,9% стоимости наследства.

(Если бы наследником был супруг или ребёнок и он своевременно заявил о приобретении, он мог бы вообще не платить. Об этом в подразделе 5.2.)

## Пример 2: дарение в группе III
Дарение 20 000 зл от знакомого.
1. База: 20 000 − 5 733 = **14 267 зл**.
2. С 11 833 зл: 12% = 1 419,96 зл.
3. С 2 434 зл: 16% = 389,44 зл.
4. Налог: **около 1 809 зл**.

> !przyklad То же дарение 20 000 зл брату (группа I) не вызовет налога даже без освобождения, так как укладывается в необлагаемую сумму 36 120 зл. Разница между группами огромна.

## Кто получает деньги
Налог начисляет и взимает **начальник налоговой инспекции**, но поступления полностью идут в бюджет **гмины**. Поэтому говорят, что это самоуправленческий налог, взимаемый налоговой инспекцией.

> !zapamietaj Налогоплательщик — **приобретатель**. Три группы, необлагаемые суммы **36 120 / 27 090 / 5 733 зл**, ставки **3–7% / 7–12% / 12–20%**. Налог взимает налоговая инспекция, а доход идёт гмине.`,
          },
          quiz: [
            { q: { pl: "Kto jest podatnikiem podatku od spadków i darowizn?", ru: "Кто является плательщиком налога на наследство и дарение?" },
              a: [{ pl: "Darczyńca", ru: "Даритель" }, { pl: "Nabywca (spadkobierca, obdarowany)", ru: "Приобретатель (наследник, одаряемый)" }, { pl: "Notariusz", ru: "Нотариус" }, { pl: "Gmina", ru: "Гмина" }],
              correct: 1, why: { pl: "Podatek obciąża nabycie majątku, więc płaci ten, kto majątek otrzymał.", ru: "Налог облагает приобретение имущества, поэтому платит тот, кто его получил." } },
            { q: { pl: "Do której grupy należy partner w związku nieformalnym?", ru: "К какой группе относится партнёр в неформальном союзе?" },
              a: [{ pl: "I", ru: "I" }, { pl: "II", ru: "II" }, { pl: "III", ru: "III" }, { pl: "Jest zawsze zwolniony", ru: "Всегда освобождён" }],
              correct: 2, why: { pl: "Brak małżeństwa i pokrewieństwa oznacza grupę III z najniższą kwotą wolną i najwyższymi stawkami.", ru: "Отсутствие брака и родства означает группу III с самой низкой необлагаемой суммой и самыми высокими ставками." } },
            { q: { pl: "Ile wynosi kwota wolna dla grupy I?", ru: "Какова необлагаемая сумма для группы I?" },
              a: [{ pl: "36 120 zł", ru: "36 120 зл" }, { pl: "27 090 zł", ru: "27 090 зл" }, { pl: "5 733 zł", ru: "5 733 зл" }, { pl: "30 000 zł", ru: "30 000 зл" }],
              correct: 0, why: { pl: "Kwoty wolne: grupa I — 36 120 zł, II — 27 090 zł, III — 5 733 zł. 30 000 zł to kwota wolna w PIT.", ru: "Необлагаемые суммы: группа I — 36 120 зл, II — 27 090 зл, III — 5 733 зл. 30 000 зл — минимум в PIT." } },
            { q: { pl: "Jakie stawki obowiązują w grupie III?", ru: "Какие ставки действуют в группе III?" },
              a: [{ pl: "3%, 5%, 7%", ru: "3%, 5%, 7%" }, { pl: "7%, 9%, 12%", ru: "7%, 9%, 12%" }, { pl: "19% liniowo", ru: "19% линейно" }, { pl: "12%, 16%, 20%", ru: "12%, 16%, 20%" }],
              correct: 3, why: { pl: "Grupa III ma najwyższe stawki: 12%, 16% i 20% w kolejnych progach nadwyżki.", ru: "У группы III самые высокие ставки: 12%, 16% и 20% на последовательных ступенях превышения." } },
            { q: { pl: "Do czyjego budżetu trafiają wpływy z podatku od spadków i darowizn?", ru: "В чей бюджет идут поступления от налога на наследство и дарение?" },
              a: [{ pl: "Budżetu państwa", ru: "Госбюджета" }, { pl: "Województwa", ru: "Воеводства" }, { pl: "Gminy (pobiera je urząd skarbowy)", ru: "Гмины (взимает налоговая инспекция)" }, { pl: "ZUS", ru: "ZUS" }],
              correct: 2, why: { pl: "Decyzje wydaje naczelnik US, ale podatek jest dochodem gminy.", ru: "Решения выносит начальник налоговой инспекции, но налог — доход гмины." } },
          ],
        },
        // ------------------------------------------------------------------ 5.2
        {
          id: "5.2",
          title: { pl: "Zwolnienie z art. 4a, terminy i procedura", ru: "Освобождение по ст. 4a, сроки и процедура" },
          src: "Podatek od spadków i darowizn – 2026 (zwolnienia, procedury i terminy); Systematyka podatków w Polsce (art. 4a); ustawa o podatku od spadków i darowizn",
          body: {
            pl: `Najważniejszy przepis dla zwykłej rodziny to **art. 4a ustawy**. Dzięki niemu najbliżsi mogą przekazywać sobie majątek bez żadnego podatku, nawet miliony złotych. Warunek: dopełnić formalności w terminie.

## Kto może skorzystać ze zwolnienia
[[zwolnienie-4a|Zwolnienie z art. 4a]] dotyczy tylko najbliższej rodziny, potocznie nazywanej „grupą zerową”:
- małżonek,
- zstępni (dzieci, wnuki, prawnuki),
- wstępni (rodzice, dziadkowie),
- pasierb,
- rodzeństwo,
- ojczym i macocha.

> !uwaga Teściowie, zięć i synowa należą do grupy I, ale **nie** są objęci zwolnieniem z art. 4a. Mają kwotę wolną i najniższe stawki grupy I, ale ponad kwotę wolną płacą podatek.

## Warunki zwolnienia

| Warunek | Na czym polega |
|---|---|
| **Zgłoszenie w terminie** | nabycie trzeba zgłosić naczelnikowi urzędu skarbowego na formularzu **SD-Z2** w ciągu **6 miesięcy** od dnia powstania obowiązku podatkowego |
| **Udokumentowanie przelewu** (tylko darowizny pieniężne) | pieniądze muszą trafić na rachunek bankowy obdarowanego, na rachunek w SKOK albo przekazem pocztowym |

Materiały przypominają, że NSA uznał za spełniony warunek także przelew darczyńcy bezpośrednio na rachunek dewelopera, gdy darowizna służyła zakupowi mieszkania dla obdarowanego.

Zgłoszenia **nie trzeba** składać, jeśli wartość nabycia (razem z wcześniejszymi od tej samej osoby z ostatnich 5 lat) nie przekracza kwoty wolnej grupy I. Wtedy podatku i tak nie ma.

> !przyklad Rodzice przelewają córce na konto 150 000 zł na mieszkanie. Córka w ciągu 6 miesięcy składa SD-Z2 i zachowuje potwierdzenie przelewu. Podatek: 0 zł. Gdyby rodzice dali jej te pieniądze w gotówce do ręki, zwolnienie by nie przysługiwało, a 150 000 zł byłoby opodatkowane według stawek grupy I.

## Kiedy powstaje obowiązek podatkowy
Od tego momentu liczy się termin 6 miesięcy.

| Sytuacja | Moment powstania obowiązku |
|---|---|
| Spadek | dzień **uprawomocnienia się postanowienia sądu** o stwierdzeniu nabycia spadku (albo zarejestrowania notarialnego aktu poświadczenia dziedziczenia) |
| Darowizna w akcie notarialnym | dzień zawarcia umowy |
| Darowizna bez aktu (np. przelew) | dzień spełnienia świadczenia, czyli faktycznego przekazania |
| Zasiedzenie | uprawomocnienie się orzeczenia sądu |

## Jakie formularze
- **SD-Z2**: zgłoszenie nabycia przez osoby z „grupy zerowej”, gdy korzystają ze zwolnienia.
- **SD-3**: zeznanie podatkowe we wszystkich pozostałych przypadkach, gdy nabycie przekracza kwotę wolną. Według ustawy składa się je w ciągu miesiąca od powstania obowiązku podatkowego.

Do zgłoszenia lub zeznania dołącza się dokumenty: np. postanowienie sądu albo akt notarialny, umowę darowizny, potwierdzenie przelewu, dokumenty pozwalające ustalić wartość majątku.

## Wymiar i zapłata
Podatek od spadków i darowizn jest zwykle **wymierzany decyzją** naczelnika urzędu skarbowego. Płaci się go w terminie **14 dni od doręczenia decyzji**. Przy darowiźnie w formie aktu notarialnego podatek pobiera notariusz jako [[platnik]].

## Wartość majątku
Podstawą jest **wartość rynkowa** nabytych rzeczy i praw (po odliczeniu długów i ciężarów), według stanu w dniu nabycia i cen z dnia powstania obowiązku. Jeśli podatnik poda wartość zbyt niską, organ może ją zakwestionować i ustalić prawidłową, np. z pomocą biegłego.

## Co grozi za spóźnienie
Niedotrzymanie 6-miesięcznego terminu oznacza **utratę zwolnienia**. Wtedy:
- podatek liczy się na zasadach ogólnych dla grupy I (z kwotą wolną 36 120 zł),
- doliczane są **odsetki za zwłokę**,
- organ może wszcząć postępowanie z urzędu.

Szczególnie surowo traktuje się sytuację, gdy darowizna wychodzi na jaw dopiero przy kontroli, a podatnik powołuje się na nią, by wytłumaczyć pochodzenie majątku: ustawa przewiduje wtedy podwyższoną, sankcyjną stawkę.

> !zapamietaj Zwolnienie z art. 4a: najbliżsi (małżonek, dzieci, wnuki, rodzice, dziadkowie, rodzeństwo, pasierb, ojczym, macocha), **SD-Z2 w 6 miesięcy**, darowizna pieniężna **przelewem**. Spadek nie wymaga przelewu. Spóźnienie = utrata zwolnienia.`,
            ru: `Самая важная норма для обычной семьи — **ст. 4a закона**. Благодаря ей ближайшие родственники могут передавать друг другу имущество вообще без налога, даже миллионы злотых. Условие — выполнить формальности в срок.

## Кто может воспользоваться освобождением
[[zwolnienie-4a|Освобождение по ст. 4a]] касается только ближайших родственников, в обиходе — «нулевой группы»:
- супруг,
- нисходящие (дети, внуки, правнуки),
- восходящие (родители, бабушки и дедушки),
- пасынок/падчерица,
- братья и сёстры,
- отчим и мачеха.

> !uwaga Родители супруга, зять и невестка относятся к группе I, но **не** подпадают под освобождение по ст. 4a. У них необлагаемая сумма и самые низкие ставки группы I, но сверх необлагаемой суммы они платят налог.

## Условия освобождения

| Условие | В чём состоит |
|---|---|
| **Заявление в срок** | о приобретении нужно сообщить начальнику налоговой инспекции по форме **SD-Z2** в течение **6 месяцев** со дня возникновения налоговой обязанности |
| **Документирование перевода** (только денежные дарения) | деньги должны поступить на банковский счёт одаряемого, на счёт в кредитном кооперативе (SKOK) или почтовым переводом |

Материалы напоминают, что Высший административный суд (NSA) признал условие выполненным и при переводе дарителя прямо на счёт застройщика, когда дарение служило покупке квартиры для одаряемого.

Заявление **не нужно** подавать, если стоимость приобретения (вместе с прежними от того же лица за последние 5 лет) не превышает необлагаемой суммы группы I. Тогда налога и так нет.

> !przyklad Родители переводят дочери на счёт 150 000 зл на квартиру. Дочь в течение 6 месяцев подаёт SD-Z2 и сохраняет подтверждение перевода. Налог: 0 зл. Если бы родители дали ей эти деньги наличными в руки, освобождение не применялось бы, и 150 000 зл облагались бы по ставкам группы I.

## Когда возникает налоговая обязанность
С этого момента отсчитывается срок 6 месяцев.

| Ситуация | Момент возникновения обязанности |
|---|---|
| Наследство | день **вступления в силу постановления суда** о подтверждении наследования (или регистрации нотариального акта о подтверждении наследования) |
| Дарение нотариальным актом | день заключения договора |
| Дарение без акта (например, переводом) | день исполнения, то есть фактической передачи |
| Приобретательная давность | вступление в силу решения суда |

## Какие формы
- **SD-Z2**: заявление о приобретении лицами из «нулевой группы», когда они пользуются освобождением.
- **SD-3**: налоговая декларация во всех остальных случаях, когда приобретение превышает необлагаемую сумму. По закону её подают в течение месяца с момента возникновения обязанности.

К заявлению или декларации прилагают документы: например, постановление суда или нотариальный акт, договор дарения, подтверждение перевода, документы для определения стоимости имущества.

## Начисление и уплата
Налог на наследство и дарение обычно **начисляется решением** начальника налоговой инспекции. Его платят в течение **14 дней с момента вручения решения**. При дарении в форме нотариального акта налог удерживает нотариус как [[platnik|налоговый агент]].

## Стоимость имущества
База — **рыночная стоимость** приобретённых вещей и прав (за вычетом долгов и обременений) по состоянию на день приобретения и по ценам на день возникновения обязанности. Если налогоплательщик указал заниженную стоимость, орган может её оспорить и установить правильную, например с помощью эксперта.

## Что грозит за опоздание
Пропуск 6-месячного срока означает **утрату освобождения**. Тогда:
- налог считается по общим правилам для группы I (с необлагаемой суммой 36 120 зл),
- начисляются **проценты за просрочку**,
- орган может начать производство по собственной инициативе.

Особенно строго закон относится к ситуации, когда дарение выясняется только при проверке, а налогоплательщик ссылается на него, чтобы объяснить происхождение имущества: закон предусматривает тогда повышенную, санкционную ставку.

> !zapamietaj Освобождение по ст. 4a: ближайшие (супруг, дети, внуки, родители, бабушки и дедушки, братья и сёстры, пасынок, отчим, мачеха), **SD-Z2 в течение 6 месяцев**, денежное дарение — **переводом**. Наследство перевода не требует. Опоздание = утрата освобождения.`,
          },
          quiz: [
            { q: { pl: "Kto NIE jest objęty zwolnieniem z art. 4a, choć należy do grupy I?", ru: "Кто НЕ подпадает под освобождение по ст. 4a, хотя относится к группе I?" },
              a: [{ pl: "Syn", ru: "Сын" }, { pl: "Teściowa", ru: "Тёща/свекровь" }, { pl: "Brat", ru: "Брат" }, { pl: "Ojczym", ru: "Отчим" }],
              correct: 1, why: { pl: "Teściowie, zięć i synowa są w grupie I, ale art. 4a ich nie obejmuje.", ru: "Родители супруга, зять и невестка — в группе I, но ст. 4a их не охватывает." } },
            { q: { pl: "W jakim terminie trzeba złożyć SD-Z2, by zachować zwolnienie?", ru: "В какой срок нужно подать SD-Z2, чтобы сохранить освобождение?" },
              a: [{ pl: "14 dni", ru: "14 дней" }, { pl: "1 miesiąca", ru: "1 месяца" }, { pl: "1 roku", ru: "1 года" }, { pl: "6 miesięcy od powstania obowiązku podatkowego", ru: "6 месяцев с момента возникновения налоговой обязанности" }],
              correct: 3, why: { pl: "Termin 6 miesięcy jest kluczowy; jego przekroczenie oznacza utratę zwolnienia.", ru: "Срок 6 месяцев ключевой; его пропуск означает утрату освобождения." } },
            { q: { pl: "Matka daje synowi 50 000 zł w gotówce do ręki. Czy przysługuje zwolnienie z art. 4a?", ru: "Мать даёт сыну 50 000 зл наличными в руки. Применяется ли освобождение по ст. 4a?" },
              a: [{ pl: "Nie, bo darowizna pieniężna musi być udokumentowana wpływem na rachunek (lub przekazem pocztowym)", ru: "Нет, так как денежное дарение должно быть подтверждено поступлением на счёт (или почтовым переводом)" }, { pl: "Tak, zawsze", ru: "Да, всегда" }, { pl: "Tak, jeśli syn ma mniej niż 26 lat", ru: "Да, если сыну меньше 26 лет" }, { pl: "Tak, bo to grupa I", ru: "Да, потому что это группа I" }],
              correct: 0, why: { pl: "Przy darowiznach pieniężnych warunkiem zwolnienia jest udokumentowanie przekazania przez rachunek bankowy, SKOK lub przekaz pocztowy.", ru: "При денежных дарениях условием освобождения является подтверждение передачи через банковский счёт, SKOK или почтовый перевод." } },
            { q: { pl: "Kiedy powstaje obowiązek podatkowy przy spadku?", ru: "Когда возникает налоговая обязанность при наследстве?" },
              a: [{ pl: "W dniu śmierci spadkodawcy", ru: "В день смерти наследодателя" }, { pl: "W dniu pogrzebu", ru: "В день похорон" }, { pl: "W dniu uprawomocnienia się postanowienia o stwierdzeniu nabycia spadku (lub rejestracji aktu poświadczenia dziedziczenia)", ru: "В день вступления в силу постановления о подтверждении наследования (или регистрации акта о подтверждении наследования)" }, { pl: "Po sprzedaży odziedziczonego majątku", ru: "После продажи унаследованного имущества" }],
              correct: 2, why: { pl: "Od tego dnia liczy się 6 miesięcy na SD-Z2.", ru: "С этого дня отсчитываются 6 месяцев на SD-Z2." } },
            { q: { pl: "W jakim terminie płaci się podatek wymierzony decyzją?", ru: "В какой срок платится налог, начисленный решением?" },
              a: [{ pl: "7 dni od wydania decyzji", ru: "7 дней с момента вынесения решения" }, { pl: "14 dni od doręczenia decyzji", ru: "14 дней с момента вручения решения" }, { pl: "do końca roku", ru: "до конца года" }, { pl: "do 20. dnia miesiąca", ru: "до 20-го числа месяца" }],
              correct: 1, why: { pl: "Materiały: podatek należy wpłacić w terminie 14 dni od dnia doręczenia decyzji.", ru: "Материалы: налог нужно уплатить в течение 14 дней со дня вручения решения." } },
          ],
        },
        // ------------------------------------------------------------------ 5.3
        {
          id: "5.3",
          title: { pl: "Kazusy z podatku od spadków i darowizn", ru: "Казусы по налогу на наследство и дарение" },
          src: "Podatek od spadków i darowizn – kazusy (kazusy 1, 2, 3, 7, 10, 14); rozwiązania własne na podstawie ustawy z 28 lipca 1983 r. i materiałów 2026",
          body: {
            pl: `Kazusy rozwiązujemy zawsze według tego samego schematu. Dzięki temu nie pominiemy żadnego kroku.

> !zapamietaj Schemat: 1) czy jest nabycie podlegające podatkowi? 2) kto jest podatnikiem i jaka to grupa? 3) czy przysługuje zwolnienie z art. 4a? 4) czy wartość przekracza kwotę wolną (z sumowaniem nabyć z 5 lat od tej samej osoby)? 5) jakie obowiązki (SD-Z2, SD-3, terminy)?

## Kazus 1: tablet od koleżanki
Student dostał od koleżanki na urodziny tablet wart 2 500 zł. Czy musi złożyć zeznanie i zapłacić podatek? Czyim dochodem jest ten podatek?

1. Darowizna rzeczy to nabycie podlegające podatkowi.
2. Koleżanka jest niespokrewniona: **grupa III**.
3. Zwolnienie z art. 4a nie przysługuje (to nie najbliższa rodzina).
4. 2 500 zł < 5 733 zł (kwota wolna grupy III), przy założeniu, że wcześniej w ciągu 5 lat koleżanka nic mu nie dała.
5. **Nie ma podatku i nie trzeba składać zeznania.**

Podatek od spadków i darowizn jest dochodem **gminy**, a wymiar i pobór prowadzi **naczelnik urzędu skarbowego** (odwołanie: do dyrektora izby administracji skarbowej).

## Kazus 2: wspólny prezent od 20 przyjaciół
Dwudziestu przyjaciół złożyło się po 300 zł na komputer za 6 000 zł.

Kluczowe pytanie: kto jest darczyńcą? Każdy przyjaciel dał osobną darowiznę o wartości 300 zł. Kwotę wolną liczy się **od każdego darczyńcy osobno**. Każda darowizna (300 zł) mieści się w kwocie wolnej grupy III (5 733 zł). **Brak podatku i brak obowiązku zeznania**, choć łączna wartość prezentu przekracza 5 733 zł.

## Kazus 3: samochód od siostry
1 lipca 2023 r. student dostał od starszej siostry samochód.

1. Darowizna, siostra to rodzeństwo: grupa I i „grupa zerowa” z art. 4a.
2. Przy darowiźnie rzeczy nie ma wymogu przelewu.
3. **Wariant A (pod koniec lipca 2023 r.):** student mieści się w terminie 6 miesięcy. Składa SD-Z2 do naczelnika US i jest całkowicie zwolniony, bez względu na wartość auta.
4. **Wariant B (dzisiaj):** termin 6 miesięcy dawno minął, zwolnienie przepadło. Jeśli wartość auta przekracza 36 120 zł, student musi złożyć zeznanie SD-3 i zapłacić podatek według stawek grupy I (3–7%) od nadwyżki, z odsetkami za zwłokę. Jeśli auto jest warte mniej niż kwota wolna, podatku nie ma.

> !uwaga Najdroższym błędem w tym podatku jest zwykle nie wysokość stawki, tylko **przegapiony termin**.

## Kazus 7: 10 000 euro w gotówce od matki
Zenek dostał od matki na Gwiazdkę 10 000 euro w gotówce.

1. Matka to wstępna, więc teoretycznie art. 4a.
2. Ale to **darowizna pieniężna**, a pieniądze nie przeszły przez rachunek obdarowanego. Warunek udokumentowania przelewem nie jest spełniony.
3. Zwolnienie nie przysługuje. Kwotę przelicza się na złote; jeśli przekracza 36 120 zł, Zenek składa SD-3 i płaci podatek według grupy I.
4. **Czy pomoże wpłata na własne konto zaraz potem?** Nie. Liczy się, jak pieniądze przekazał **darczyńca**. Samodzielna wpłata gotówki przez obdarowanego nie dokumentuje przekazania od matki.

## Kazus 10: dom po zmarłym mężu i ojcu
Marian D. zmarł 20 czerwca 2022 r. Dom (ok. 2 mln zł) i samochód (ok. 80 000 zł) były we wspólności majątkowej z żoną Danutą. Spadkobiercy w częściach równych: żona Danuta i syn Mikołaj. Postanowienie o nabyciu spadku uprawomocniło się 2 listopada 2024 r.

1. **Co wchodzi do spadku?** Tylko udział Mariana we wspólności, czyli połowa domu i auta. Druga połowa i tak należy do Danuty i nie jest nabyciem w drodze spadku.
2. **Każdy spadkobierca jest osobnym podatnikiem** i nabywa po 1/4 całego majątku.
3. **Zwolnienie:** żona i syn są w „grupie zerowej”. Spadek nie wymaga przelewu. Mogą być w pełni zwolnieni.
4. **Termin:** 6 miesięcy od uprawomocnienia postanowienia, czyli do **2 maja 2025 r.** (nie od dnia śmierci!).
5. **Formularz:** każde z nich składa **odrębne SD-Z2**, dołączając m.in. postanowienie sądu i dane pozwalające ustalić wartość majątku.

## Kazus 14: „100 000 zł od mamy na dobry początek”
Podczas kontroli podatkowej w 2025 r. Szymon tłumaczy, że maszyny kupił za 100 000 zł, które lata temu dostał od matki. Darowizny nigdy nie zgłosił.

1. Matka to „grupa zerowa”, ale zwolnienie wymagało SD-Z2 w 6 miesięcy i (przy pieniądzach) przelewu. Zgłoszenia nie było, więc **zwolnienie nie przysługuje**.
2. Darowizna przekracza kwotę wolną grupy I, więc powstaje zobowiązanie w podatku od spadków i darowizn.
3. Ponieważ podatnik powołuje się na darowiznę dopiero w toku kontroli, żeby wyjaśnić źródło majątku, ustawa przewiduje **podwyższoną stawkę sankcyjną** zamiast zwykłych stawek grupy I.
4. Alternatywą dla organu byłoby uznanie, że pieniądze pochodzą z nieujawnionych źródeł, co też jest bardzo kosztowne.

> !przyklad Morał z kazusu 14: darowiznę od rodziców zgłasza się **od razu**, nawet jeśli wydaje się to formalnością. Dokument SD-Z2 i potwierdzenie przelewu są po latach najlepszym dowodem legalnego pochodzenia pieniędzy.`,
            ru: `Казусы всегда решаем по одной схеме. Так мы не пропустим ни одного шага.

> !zapamietaj Схема: 1) есть ли облагаемое приобретение? 2) кто налогоплательщик и какая группа? 3) применяется ли освобождение по ст. 4a? 4) превышает ли стоимость необлагаемую сумму (с суммированием приобретений от того же лица за 5 лет)? 5) какие обязанности (SD-Z2, SD-3, сроки)?

## Казус 1: планшет от однокурсницы
Студент получил от однокурсницы на день рождения планшет стоимостью 2 500 зл. Должен ли он подать декларацию и заплатить налог? Чьим доходом является этот налог?

1. Дарение вещи — облагаемое приобретение.
2. Однокурсница не родственница: **группа III**.
3. Освобождение по ст. 4a не применяется (это не ближайшие родственники).
4. 2 500 зл < 5 733 зл (необлагаемая сумма группы III), если предположить, что раньше за 5 лет она ему ничего не дарила.
5. **Налога нет, декларацию подавать не нужно.**

Налог на наследство и дарение — доход **гмины**, а начисление и взимание ведёт **начальник налоговой инспекции** (обжалование — директору налоговой палаты, IAS).

## Казус 2: общий подарок от 20 друзей
Двадцать друзей скинулись по 300 зл на компьютер за 6 000 зл.

Ключевой вопрос: кто даритель? Каждый друг сделал отдельное дарение стоимостью 300 зл. Необлагаемая сумма считается **по каждому дарителю отдельно**. Каждое дарение (300 зл) укладывается в необлагаемую сумму группы III (5 733 зл). **Налога и обязанности подавать декларацию нет**, хотя общая стоимость подарка превышает 5 733 зл.

## Казус 3: автомобиль от сестры
1 июля 2023 г. студент получил от старшей сестры автомобиль.

1. Дарение, сестра — сестра: группа I и «нулевая группа» по ст. 4a.
2. При дарении вещи требования о переводе нет.
3. **Вариант A (в конце июля 2023 г.):** студент укладывается в 6-месячный срок. Подаёт SD-Z2 начальнику налоговой инспекции и полностью освобождён, независимо от стоимости автомобиля.
4. **Вариант B (сегодня):** 6 месяцев давно прошли, освобождение утрачено. Если стоимость авто превышает 36 120 зл, студент должен подать декларацию SD-3 и заплатить налог по ставкам группы I (3–7%) с превышения, с процентами за просрочку. Если авто стоит меньше необлагаемой суммы, налога нет.

> !uwaga Самая дорогая ошибка в этом налоге — обычно не размер ставки, а **пропущенный срок**.

## Казус 7: 10 000 евро наличными от матери
Зенек получил от матери на Рождество 10 000 евро наличными.

1. Мать — восходящая, так что теоретически ст. 4a.
2. Но это **денежное дарение**, а деньги не прошли через счёт одаряемого. Условие о документировании переводом не выполнено.
3. Освобождение не применяется. Сумму пересчитывают в злотые; если она превышает 36 120 зл, Зенек подаёт SD-3 и платит налог по группе I.
4. **Поможет ли внести деньги на свой счёт сразу после этого?** Нет. Важно, как деньги передал **даритель**. Самостоятельный взнос наличных одаряемым не подтверждает передачу от матери.

## Казус 10: дом после смерти мужа и отца
Мариан Д. умер 20 июня 2022 г. Дом (около 2 млн зл) и автомобиль (около 80 000 зл) были в общей совместной собственности с женой Дануте. Наследники в равных долях: жена Данута и сын Миколай. Постановление о наследовании вступило в силу 2 ноября 2024 г.

1. **Что входит в наследство?** Только доля Мариана в общей собственности, то есть половина дома и авто. Вторая половина и так принадлежит Дануте и не является приобретением по наследству.
2. **Каждый наследник — отдельный налогоплательщик** и приобретает по 1/4 всего имущества.
3. **Освобождение:** жена и сын — в «нулевой группе». Наследство не требует перевода. Они могут быть полностью освобождены.
4. **Срок:** 6 месяцев с момента вступления постановления в силу, то есть до **2 мая 2025 г.** (не со дня смерти!).
5. **Форма:** каждый подаёт **отдельное SD-Z2**, прилагая, в частности, постановление суда и данные для определения стоимости имущества.

## Казус 14: «100 000 зл от мамы на хороший старт»
Во время налоговой проверки в 2025 г. Шимон объясняет, что купил станки на 100 000 зл, которые много лет назад получил от матери. Дарение он никогда не заявлял.

1. Мать — «нулевая группа», но освобождение требовало SD-Z2 в течение 6 месяцев и (для денег) перевода. Заявления не было, поэтому **освобождение не применяется**.
2. Дарение превышает необлагаемую сумму группы I, поэтому возникает обязательство по налогу на наследство и дарение.
3. Так как налогоплательщик ссылается на дарение только в ходе проверки, чтобы объяснить источник имущества, закон предусматривает **повышенную санкционную ставку** вместо обычных ставок группы I.
4. Альтернативой для органа было бы признать, что деньги получены из нераскрытых источников, что тоже очень дорого.

> !przyklad Мораль казуса 14: дарение от родителей заявляют **сразу**, даже если это кажется формальностью. SD-Z2 и подтверждение перевода через годы — лучшее доказательство законного происхождения денег.`,
          },
          quiz: [
            { q: { pl: "Dwudziestu przyjaciół dało po 300 zł na wspólny prezent za 6 000 zł. Czy obdarowany płaci podatek?", ru: "Двадцать друзей дали по 300 зл на общий подарок за 6 000 зл. Платит ли одаряемый налог?" },
              a: [{ pl: "Tak, bo 6 000 zł > 5 733 zł", ru: "Да, так как 6 000 зл > 5 733 зл" }, { pl: "Nie, bo kwotę wolną liczy się od każdego darczyńcy osobno", ru: "Нет, так как необлагаемая сумма считается по каждому дарителю отдельно" }, { pl: "Tak, 20% od całości", ru: "Да, 20% со всей суммы" }, { pl: "Płacą darczyńcy", ru: "Платят дарители" }],
              correct: 1, why: { pl: "Każdy przyjaciel to odrębny darczyńca z darowizną 300 zł, mieszczącą się w kwocie wolnej grupy III.", ru: "Каждый друг — отдельный даритель с дарением 300 зл, укладывающимся в необлагаемую сумму группы III." } },
            { q: { pl: "Postanowienie o nabyciu spadku uprawomocniło się 2 listopada 2024 r. Do kiedy złożyć SD-Z2?", ru: "Постановление о наследовании вступило в силу 2 ноября 2024 г. До какого числа подать SD-Z2?" },
              a: [{ pl: "Do 20 grudnia 2022 r.", ru: "До 20 декабря 2022 г." }, { pl: "Do 2 grudnia 2024 r.", ru: "До 2 декабря 2024 г." }, { pl: "Do 2 maja 2025 r.", ru: "До 2 мая 2025 г." }, { pl: "Termin nie obowiązuje przy spadkach", ru: "Срок не действует при наследстве" }],
              correct: 2, why: { pl: "6 miesięcy liczy się od uprawomocnienia postanowienia, a nie od śmierci spadkodawcy.", ru: "6 месяцев отсчитываются со вступления постановления в силу, а не со смерти наследодателя." } },
            { q: { pl: "Czy samodzielna wpłata na własne konto gotówki otrzymanej od matki ratuje zwolnienie z art. 4a?", ru: "Спасает ли освобождение по ст. 4a самостоятельный взнос на свой счёт наличных, полученных от матери?" },
              a: [{ pl: "Nie, liczy się udokumentowanie przekazania od darczyńcy na rachunek obdarowanego", ru: "Нет, важно подтверждение передачи от дарителя на счёт одаряемого" }, { pl: "Tak, zawsze", ru: "Да, всегда" }, { pl: "Tak, jeśli wpłata nastąpi w ciągu roku", ru: "Да, если взнос сделан в течение года" }, { pl: "Tak, jeśli w tytule wpisze się „darowizna”", ru: "Да, если в назначении указать «дарение»" }],
              correct: 0, why: { pl: "Warunek dotyczy sposobu przekazania pieniędzy przez darczyńcę. Własna wpłata obdarowanego tego nie dokumentuje.", ru: "Условие касается способа передачи денег дарителем. Собственный взнос одаряемого этого не подтверждает." } },
            { q: { pl: "Spadkobiercami po mężu są żona i syn w częściach równych. Ile SD-Z2 należy złożyć?", ru: "Наследники мужа — жена и сын в равных долях. Сколько SD-Z2 нужно подать?" },
              a: [{ pl: "Jedno wspólne", ru: "Одно общее" }, { pl: "Żadnego", ru: "Ни одного" }, { pl: "Składa tylko notariusz", ru: "Подаёт только нотариус" }, { pl: "Dwa odrębne, bo każdy spadkobierca jest osobnym podatnikiem", ru: "Два отдельных, так как каждый наследник — отдельный налогоплательщик" }],
              correct: 3, why: { pl: "Podatnikiem jest każdy nabywca, więc każdy zgłasza swoje nabycie.", ru: "Налогоплательщик — каждый приобретатель, поэтому каждый заявляет своё приобретение." } },
            { q: { pl: "Student dostał auto od siostry i zapomniał o zgłoszeniu. Minęło 2 lata. Co się dzieje?", ru: "Студент получил авто от сестры и забыл о заявлении. Прошло 2 года. Что происходит?" },
              a: [{ pl: "Nic, rodzeństwo jest zawsze zwolnione", ru: "Ничего, братья и сёстры всегда освобождены" }, { pl: "Traci zwolnienie; jeśli auto jest warte więcej niż 36 120 zł, płaci podatek wg grupy I z odsetkami", ru: "Утрачивает освобождение; если авто дороже 36 120 зл, платит налог по группе I с процентами" }, { pl: "Płaci podatek wg grupy III", ru: "Платит налог по группе III" }, { pl: "Musi zwrócić auto siostrze", ru: "Должен вернуть авто сестре" }],
              correct: 1, why: { pl: "Przegapienie 6 miesięcy oznacza powrót do zasad ogólnych grupy I: kwota wolna i stawki 3–7%.", ru: "Пропуск 6 месяцев означает возврат к общим правилам группы I: необлагаемая сумма и ставки 3–7%." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Który akt reguluje podatek od spadków i darowizn?", ru: "Какой акт регулирует налог на наследство и дарение?" },
          a: [{ pl: "Ustawa z 28 lipca 1983 r.", ru: "Закон от 28 июля 1983 г." }, { pl: "Ordynacja podatkowa", ru: "Ordynacja podatkowa" }, { pl: "Ustawa o PCC z 2000 r.", ru: "Закон о PCC 2000 г." }, { pl: "Kodeks cywilny", ru: "Гражданский кодекс" }],
          correct: 0, why: { pl: "To ustawa z 28 lipca 1983 r. o podatku od spadków i darowizn, wielokrotnie nowelizowana.", ru: "Это закон от 28 июля 1983 г. о налоге на наследство и дарение, многократно изменявшийся." } },
        { q: { pl: "Do grupy II należy:", ru: "К группе II относится:" },
          a: [{ pl: "córka", ru: "дочь" }, { pl: "przyjaciel", ru: "друг" }, { pl: "bratanek", ru: "племянник (сын брата)" }, { pl: "ojciec", ru: "отец" }],
          correct: 2, why: { pl: "Zstępni rodzeństwa (bratankowie, siostrzeńcy) to grupa II.", ru: "Нисходящие братьев и сестёр (племянники) — группа II." } },
        { q: { pl: "Kwota wolna dla grupy III wynosi:", ru: "Необлагаемая сумма для группы III:" },
          a: [{ pl: "36 120 zł", ru: "36 120 зл" }, { pl: "27 090 zł", ru: "27 090 зл" }, { pl: "11 833 zł", ru: "11 833 зл" }, { pl: "5 733 zł", ru: "5 733 зл" }],
          correct: 3, why: { pl: "Grupa III ma najniższą kwotę wolną: 5 733 zł. 11 833 zł to granica pierwszego progu stawek.", ru: "У группы III самая низкая необлагаемая сумма: 5 733 зл. 11 833 зл — граница первой ступени ставок." } },
        { q: { pl: "Wujek daje siostrzeńcowi 30 000 zł. Ile wynosi podstawa opodatkowania?", ru: "Дядя дарит племяннику 30 000 зл. Какова налоговая база?" },
          a: [{ pl: "30 000 zł", ru: "30 000 зл" }, { pl: "2 910 zł", ru: "2 910 зл" }, { pl: "24 267 zł", ru: "24 267 зл" }, { pl: "0 zł", ru: "0 зл" }],
          correct: 1, why: { pl: "Siostrzeniec to grupa II z kwotą wolną 27 090 zł: 30 000 − 27 090 = 2 910 zł (stawka 7%).", ru: "Племянник — группа II с необлагаемой суммой 27 090 зл: 30 000 − 27 090 = 2 910 зл (ставка 7%)." } },
        { q: { pl: "Spadek od ojca o wartości 50 000 zł bez zgłoszenia SD-Z2 to podatek około:", ru: "Наследство от отца стоимостью 50 000 зл без подачи SD-Z2 — налог около:" },
          a: [{ pl: "457 zł", ru: "457 зл" }, { pl: "3 500 zł", ru: "3 500 зл" }, { pl: "0 zł", ru: "0 зл" }, { pl: "10 000 zł", ru: "10 000 зл" }],
          correct: 0, why: { pl: "Podstawa 13 880 zł: 11 833 × 3% + 2 047 × 5% ≈ 355 + 102 = 457 zł.", ru: "База 13 880 зл: 11 833 × 3% + 2 047 × 5% ≈ 355 + 102 = 457 зл." } },
        { q: { pl: "Na jakim formularzu najbliższa rodzina zgłasza nabycie, by skorzystać ze zwolnienia?", ru: "По какой форме ближайшие родственники заявляют о приобретении, чтобы получить освобождение?" },
          a: [{ pl: "SD-3", ru: "SD-3" }, { pl: "PIT-37", ru: "PIT-37" }, { pl: "SD-Z2", ru: "SD-Z2" }, { pl: "VAT-R", ru: "VAT-R" }],
          correct: 2, why: { pl: "SD-Z2 służy do zgłoszenia nabycia objętego zwolnieniem z art. 4a; SD-3 to zeznanie w pozostałych przypadkach.", ru: "SD-Z2 служит для заявления о приобретении с освобождением по ст. 4a; SD-3 — декларация в остальных случаях." } },
        { q: { pl: "Podatek od spadków i darowizn liczy się według skali:", ru: "Налог на наследство и дарение рассчитывается по шкале:" },
          a: [{ pl: "liniowej", ru: "линейной" }, { pl: "regresywnej", ru: "регрессивной" }, { pl: "kwotowej od m²", ru: "твёрдой с м²" }, { pl: "progresywnej szczeblowej", ru: "прогрессивной ступенчатой" }],
          correct: 3, why: { pl: "Nadwyżkę ponad kwotę wolną dzieli się na progi (do 11 833 zł, do 23 665 zł, powyżej) z rosnącymi stawkami.", ru: "Превышение над необлагаемой суммой делится на ступени (до 11 833 зл, до 23 665 зл, свыше) с растущими ставками." } },
        { q: { pl: "Kto pobiera podatek przy darowiźnie w formie aktu notarialnego?", ru: "Кто удерживает налог при дарении в форме нотариального акта?" },
          a: [{ pl: "Notariusz jako płatnik", ru: "Нотариус как налоговый агент" }, { pl: "Darczyńca", ru: "Даритель" }, { pl: "Sołtys", ru: "Староста деревни" }, { pl: "Bank", ru: "Банк" }],
          correct: 0, why: { pl: "Przy umowach notarialnych notariusz oblicza, pobiera i wpłaca podatek, czyli jest płatnikiem.", ru: "При нотариальных договорах нотариус рассчитывает, удерживает и перечисляет налог, то есть является агентом." } },
        { q: { pl: "Którego nabycia NIE obejmuje podatek od spadków i darowizn?", ru: "Какое приобретение НЕ охватывает налог на наследство и дарение?" },
          a: [{ pl: "Zasiedzenia nieruchomości", ru: "Приобретательной давности на недвижимость" }, { pl: "Zakupu mieszkania za pieniądze", ru: "Покупки квартиры за деньги" }, { pl: "Zapisu windykacyjnego", ru: "Виндикационного легата" }, { pl: "Nieodpłatnego zniesienia współwłasności", ru: "Безвозмездного прекращения общей собственности" }],
          correct: 1, why: { pl: "Kupno to nabycie odpłatne; podatek dotyczy tylko nabyć nieodpłatnych.", ru: "Покупка — возмездное приобретение; налог касается только безвозмездных приобретений." } },
        { q: { pl: "Co jest najczęstszą przyczyną utraty zwolnienia z art. 4a?", ru: "Что чаще всего приводит к утрате освобождения по ст. 4a?" },
          a: [{ pl: "Zbyt wysoka wartość darowizny", ru: "Слишком высокая стоимость дарения" }, { pl: "Przekazanie nieruchomości", ru: "Передача недвижимости" }, { pl: "Niezłożenie SD-Z2 w terminie 6 miesięcy", ru: "Неподача SD-Z2 в 6-месячный срок" }, { pl: "Darowizna od matki", ru: "Дарение от матери" }],
          correct: 2, why: { pl: "Zwolnienie nie ma limitu wartości; warunkiem jest terminowe zgłoszenie (i przelew przy pieniądzach).", ru: "У освобождения нет лимита стоимости; условие — своевременное заявление (и перевод при деньгах)." } },
      ],
    },
    {
      n: 6,
      color: "--c6",
      title: { pl: "Podatki i opłaty lokalne", ru: "Местные налоги и сборы" },
      lead: {
        pl: "Skąd gmina ma pieniądze, jakie podatki i opłaty pobiera sama, co może zmieniać rada gminy, a czego nie, oraz jak te zasady działają w praktycznych sporach.",
        ru: "Откуда у гмины деньги, какие налоги и сборы она взимает сама, что может менять совет гмины, а что нет, и как эти правила работают в практических спорах.",
      },
      subs: [
        // ------------------------------------------------------------------ 6.1
        {
          id: "6.1",
          title: { pl: "Gmina, jej dochody i władztwo podatkowe", ru: "Гмина, её доходы и налоговая власть" },
          src: "Podatki i opłaty samorządowe – wykład 1 (2026): gmina jako JST, dochody gminy, władztwo podatkowe, kompetencje rady i wójta, stawki maksymalne, ograniczenia",
          body: {
            pl: `Gmina to podstawowa jednostka samorządu terytorialnego. Ma osobowość prawną, własny majątek i radę wybieraną przez mieszkańców (ustawa o samorządzie gminnym z 8 marca 1990 r.). Opiera się na zasadzie **subsydiarności**: zadania publiczne wykonuje się jak najbliżej obywatela.

## Zadania gminy

| Rodzaj | Przykłady | Finansowanie |
|---|---|---|
| **Własne** | drogi gminne, oświata, pomoc społeczna, gospodarka komunalna, kultura, sport | dochody własne, subwencje |
| **Zlecone** z administracji rządowej | ewidencja ludności, akty stanu cywilnego | dotacje celowe z budżetu państwa |
| **Powierzone** | na podstawie porozumień z innymi JST | podmiot powierzający |

Konstytucja (art. 167) gwarantuje samorządom udział w dochodach publicznych odpowiednio do ich zadań.

## Skąd gmina ma pieniądze

| Kategoria | Co obejmuje | Swoboda gminy |
|---|---|---|
| **Dochody własne** | podatki i opłaty lokalne, dochody z majątku, inne | największa |
| **Udziały w PIT i CIT** | według materiałów: 39,34% PIT mieszkańców i 6,71% CIT firm z siedzibą w gminie | gmina nie wpływa na wysokość |
| **Subwencja ogólna** | części oświatowa, wyrównawcza, równoważąca | dowolne wydatkowanie |
| **Dotacje celowe** | na zadania zlecone, własne, z funduszy UE | tylko na wskazany cel |

> !zapamietaj Im większy udział **dochodów własnych**, tym większa realna samodzielność gminy. Subwencje i dotacje uzależniają ją od decyzji rządu.

## Katalog podatków i opłat lokalnych
Katalog jest **zamknięty**: gmina nie może wymyślić nowego podatku. Może tylko kształtować stawki i zwolnienia w granicach ustawy.
- **Podatki będące dochodem gminy:** [[podatek-od-nieruchomosci|od nieruchomości]], [[podatek-rolny|rolny]], [[podatek-lesny|leśny]], [[podatek-od-srodkow-transportowych|od środków transportowych]], od spadków i darowizn, [[pcc|PCC]], karta podatkowa.
- **[[oplata-lokalna|Opłaty lokalne]]:** targowa, miejscowa, uzdrowiskowa, reklamowa, od posiadania psów, a także opłata skarbowa.

## Władztwo podatkowe
[[wladztwo-podatkowe|Władztwo podatkowe]] to uprawnienia organów gminy do kształtowania obciążeń na jej terenie. W Polsce ma ono charakter **wtórny i pochodny**: gmina działa tylko w granicach wyznaczonych przez ustawy. Art. 168 Konstytucji pozwala JST ustalać wysokość podatków i opłat lokalnych w zakresie określonym w ustawie.

| Kto | Co robi |
|---|---|
| **Rada gminy** (organ stanowiący) | uchwala stawki podatków i opłat lokalnych, wprowadza zwolnienia przedmiotowe, może obniżyć cenę skupu żyta (podatek rolny) i cenę sprzedaży drewna (podatek leśny) |
| **Wójt, burmistrz, prezydent** (organ wykonawczy) | jako organ podatkowy I instancji wydaje decyzje, prowadzi kontrole, udziela ulg w spłacie (raty, odroczenia, umorzenia), prowadzi egzekucję |
| **SKO** | rozpatruje odwołania od decyzji wójta |
| **RIO** | nadzoruje legalność uchwał podatkowych |

## Granice władztwa
1. **Stawki maksymalne.** Rada nie może ustalić stawki wyższej niż górna granica z ustawy, ogłaszana corocznie w obwieszczeniu Ministra Finansów (indeksowana wskaźnikiem cen towarów i usług konsumpcyjnych). Co do zasady nie ma stawek minimalnych.
2. **Zakaz zwolnień podmiotowych.** Rada może zwolnić **kategorię przedmiotów** (np. obiekty sportowe), ale nie **konkretną firmę**. Zwolnienia podmiotowe zastrzeżone są dla ustawodawcy.
3. **Pomoc publiczna UE.** Preferencje dla firm muszą mieścić się w zasadach pomocy publicznej (np. *de minimis*).
4. **Nadzór RIO.** Uchwałę sprzeczną z prawem RIO może unieważnić (materiały: w ciągu 30 dni od jej przekazania).

> !przyklad Rada gminy chce przyciągnąć przemysł. Może uchwalić niższą stawkę podatku od nieruchomości dla budynków związanych z działalnością gospodarczą (wszystkich, nie wybranej spółki) albo zwolnić nowe inwestycje spełniające ogólne kryteria. Nie może napisać w uchwale: „zwalnia się spółkę X”.

> !uwaga Wójt może umorzyć zaległość albo rozłożyć ją na raty w indywidualnej sprawie (ważny interes podatnika lub interes publiczny). To co innego niż zwolnienie: zwolnienie uchwala rada i dotyczy kategorii, ulgę w spłacie daje wójt decyzją.`,
            ru: `Гмина — базовая единица территориального самоуправления. У неё есть правосубъектность, своё имущество и совет, избираемый жителями (закон о гминном самоуправлении от 8 марта 1990 г.). Она опирается на принцип **субсидиарности**: публичные задачи выполняются как можно ближе к гражданину.

## Задачи гмины

| Вид | Примеры | Финансирование |
|---|---|---|
| **Собственные** | гминные дороги, образование, социальная помощь, коммунальное хозяйство, культура, спорт | собственные доходы, субвенции |
| **Поручённые** правительственной администрацией | учёт населения, акты гражданского состояния | целевые дотации из госбюджета |
| **Доверенные** | по соглашениям с другими JST | передающий субъект |

Конституция (ст. 167) гарантирует органам самоуправления долю в публичных доходах соразмерно их задачам.

## Откуда у гмины деньги

| Категория | Что включает | Свобода гмины |
|---|---|---|
| **Собственные доходы** | местные налоги и сборы, доходы от имущества, прочие | наибольшая |
| **Доли в PIT и CIT** | по материалам: 39,34% PIT жителей и 6,71% CIT фирм с местонахождением в гмине | гмина не влияет на размер |
| **Общая субвенция** | образовательная, выравнивающая, балансирующая части | свободное расходование |
| **Целевые дотации** | на поручённые и собственные задачи, из фондов ЕС | только на указанную цель |

> !zapamietaj Чем больше доля **собственных доходов**, тем больше реальная самостоятельность гмины. Субвенции и дотации делают её зависимой от решений правительства.

## Перечень местных налогов и сборов
Перечень **закрытый**: гмина не может придумать новый налог. Она может только формировать ставки и освобождения в пределах закона.
- **Налоги — доход гмины:** [[podatek-od-nieruchomosci|на недвижимость]], [[podatek-rolny|сельскохозяйственный]], [[podatek-lesny|лесной]], [[podatek-od-srodkow-transportowych|на транспортные средства]], на наследство и дарение, [[pcc|PCC]], налоговая карта.
- **[[oplata-lokalna|Местные сборы]]:** рыночный (targowa), курортный (miejscowa), санаторный (uzdrowiskowa), рекламный, за содержание собак, а также гербовый сбор.

## Налоговая власть
[[wladztwo-podatkowe|Налоговая власть]] (władztwo podatkowe) — полномочия органов гмины формировать налоговую нагрузку на её территории. В Польше она **вторична и производна**: гмина действует только в пределах, установленных законами. Ст. 168 Конституции позволяет JST устанавливать размер местных налогов и сборов в объёме, определённом законом.

| Кто | Что делает |
|---|---|
| **Совет гмины** (представительный орган) | принимает ставки местных налогов и сборов, вводит предметные освобождения, может снизить цену закупки ржи (сельхозналог) и цену продажи древесины (лесной налог) |
| **Войт, бурмистр, президент города** (исполнительный орган) | как налоговый орган I инстанции выносит решения, проводит проверки, предоставляет льготы по уплате (рассрочки, отсрочки, списания), ведёт взыскание |
| **SKO** (Самоуправленческая апелляционная коллегия) | рассматривает жалобы на решения войта |
| **RIO** (Региональная счётная палата) | надзирает за законностью налоговых решений совета |

## Пределы налоговой власти
1. **Максимальные ставки.** Совет не может установить ставку выше верхнего предела из закона, ежегодно объявляемого в сообщении министра финансов (индексируется по индексу потребительских цен). Минимальных ставок, как правило, нет.
2. **Запрет субъектных освобождений.** Совет может освободить **категорию объектов** (например, спортивные сооружения), но не **конкретную фирму**. Субъектные освобождения — прерогатива законодателя.
3. **Государственная помощь ЕС.** Преференции для фирм должны укладываться в правила госпомощи (например, *de minimis*).
4. **Надзор RIO.** Незаконное решение RIO может признать недействительным (по материалам — в течение 30 дней с момента его передачи).

> !przyklad Совет гмины хочет привлечь промышленность. Он может установить более низкую ставку налога на недвижимость для зданий, связанных с предпринимательской деятельностью (всех, а не выбранной компании), или освободить новые инвестиции, отвечающие общим критериям. Но не может написать в решении: «освобождается компания X».

> !uwaga Войт может списать недоимку или предоставить рассрочку по индивидуальному делу (важный интерес налогоплательщика или публичный интерес). Это не освобождение: освобождение принимает совет и оно касается категории, а льготу по уплате даёт войт решением.`,
          },
          quiz: [
            { q: { pl: "Kto uchwala stawki podatku od nieruchomości w gminie?", ru: "Кто устанавливает ставки налога на недвижимость в гмине?" },
              a: [{ pl: "Wójt", ru: "Войт" }, { pl: "Minister Finansów", ru: "Министр финансов" }, { pl: "Rada gminy", ru: "Совет гмины" }, { pl: "Naczelnik urzędu skarbowego", ru: "Начальник налоговой инспекции" }],
              correct: 2, why: { pl: "Rada gminy uchwala stawki w granicach maksimów; Minister ogłasza tylko górne granice, a wójt stosuje stawki w decyzjach.", ru: "Совет гмины устанавливает ставки в пределах максимумов; министр лишь объявляет верхние пределы, а войт применяет ставки в решениях." } },
            { q: { pl: "Czy rada gminy może zwolnić z podatku od nieruchomości konkretną spółkę ABC?", ru: "Может ли совет гмины освободить от налога на недвижимость конкретную компанию ABC?" },
              a: [{ pl: "Tak, jeśli spółka tworzy miejsca pracy", ru: "Да, если компания создаёт рабочие места" }, { pl: "Nie, rada może wprowadzać tylko zwolnienia przedmiotowe", ru: "Нет, совет может вводить только предметные освобождения" }, { pl: "Tak, za zgodą wójta", ru: "Да, с согласия войта" }, { pl: "Tak, na maksymalnie 5 lat", ru: "Да, максимум на 5 лет" }],
              correct: 1, why: { pl: "Zwolnienia podmiotowe są zastrzeżone dla ustawodawcy; imienne zwolnienie byłoby niedopuszczalną pomocą publiczną.", ru: "Субъектные освобождения — прерогатива законодателя; именное освобождение было бы недопустимой госпомощью." } },
            { q: { pl: "Do kogo przysługuje odwołanie od decyzji wójta w sprawie podatku lokalnego?", ru: "Куда обжалуется решение войта по местному налогу?" },
              a: [{ pl: "Do Samorządowego Kolegium Odwoławczego", ru: "В Самоуправленческую апелляционную коллегию (SKO)" }, { pl: "Do Dyrektora Izby Administracji Skarbowej", ru: "Директору налоговой палаты (IAS)" }, { pl: "Do rady gminy", ru: "В совет гмины" }, { pl: "Do Ministra Finansów", ru: "Министру финансов" }],
              correct: 0, why: { pl: "Organem II instancji dla organów samorządowych jest SKO; dalej skarga do WSA.", ru: "Органом II инстанции для органов самоуправления является SKO; далее жалоба в WSA." } },
            { q: { pl: "Która kategoria dochodów daje gminie największą samodzielność?", ru: "Какая категория доходов даёт гмине наибольшую самостоятельность?" },
              a: [{ pl: "Dotacje celowe", ru: "Целевые дотации" }, { pl: "Subwencja oświatowa", ru: "Образовательная субвенция" }, { pl: "Fundusze UE", ru: "Фонды ЕС" }, { pl: "Dochody własne, w tym podatki lokalne", ru: "Собственные доходы, в том числе местные налоги" }],
              correct: 3, why: { pl: "Dochody własne można wydawać według lokalnych priorytetów, a ich wysokość gmina częściowo kształtuje sama.", ru: "Собственные доходы можно тратить по местным приоритетам, а их размер гмина частично формирует сама." } },
            { q: { pl: "Czym ograniczona jest swoboda rady gminy przy ustalaniu stawek?", ru: "Чем ограничена свобода совета гмины при установлении ставок?" },
              a: [{ pl: "Stawkami minimalnymi ustalanymi przez wójta", ru: "Минимальными ставками, установленными войтом" }, { pl: "Niczym", ru: "Ничем" }, { pl: "Górnymi granicami stawek z ustawy, ogłaszanymi corocznie przez Ministra Finansów", ru: "Верхними пределами ставок из закона, ежегодно объявляемыми министром финансов" }, { pl: "Decyzją SKO", ru: "Решением SKO" }],
              correct: 2, why: { pl: "Maksima chronią podatników przed nadmiernym fiskalizmem lokalnym i są corocznie indeksowane.", ru: "Максимумы защищают налогоплательщиков от чрезмерного местного фискализма и ежегодно индексируются." } },
          ],
        },
        // ------------------------------------------------------------------ 6.2
        {
          id: "6.2",
          title: { pl: "Podatek od nieruchomości, rolny, leśny i od środków transportowych", ru: "Налоги на недвижимость, сельскохозяйственный, лесной и на транспортные средства" },
          src: "Podatki i opłaty samorządowe – wykład 1 (2026); Systematyka podatków w Polsce: podatki lokalne, przykład podatku od nieruchomości; Podstawy systemów podatkowych (podatki majątkowe)",
          body: {
            pl: `Cztery podatki lokalne opodatkowują majątek: nieruchomości, ziemię, lasy i pojazdy. Trzy pierwsze trzeba umieć od siebie odróżnić, bo ten sam grunt może podlegać tylko jednemu z nich.

## Podatek od nieruchomości
[[podatek-od-nieruchomosci|Podatek od nieruchomości]] (ustawa z 12 stycznia 1991 r. o podatkach i opłatach lokalnych) to fiskalnie najważniejszy podatek lokalny. W wielu miastach daje ponad połowę wpływów z podatków lokalnych.

**Przedmiot:**
- grunty (z wyjątkiem rolnych i leśnych, chyba że są zajęte na działalność gospodarczą),
- budynki lub ich części,
- budowle lub ich części **związane z działalnością gospodarczą**.

**Podatnicy:** właściciele, posiadacze samoistni, użytkownicy wieczyści, a także posiadacze zależni nieruchomości Skarbu Państwa lub JST.

**Podstawa:**

| Przedmiot | Podstawa |
|---|---|
| grunty | powierzchnia w m² (lub ha) |
| budynki | powierzchnia użytkowa w m² |
| budowle | wartość |

To ważna cecha polskiego systemu: podstawą jest **powierzchnia, a nie wartość** rynkowa (z wyjątkiem budowli). Od 2025 r. obowiązują nowe ustawowe definicje budynku i budowli, wprowadzone po wyroku TK (SK 39/19).

**Stawki** różnicuje rada gminy według przeznaczenia: inne dla mieszkalnych, inne dla związanych z działalnością gospodarczą (najwyższe), inne dla pozostałych. Wszystkie nie mogą przekroczyć maksimów ustawowych.

> !przyklad Według przykładu z materiałów firma wynajmuje biuro 100 m² i magazyn 200 m². Gmina ustaliła stawkę dla budynków związanych z działalnością gospodarczą na 25 zł/m². Podatek roczny = 300 m² × 25 zł = **7 500 zł**. (Kwota 25 zł to stawka przykładowa, nie konkretna stawka z obwieszczenia.)

## Podatek rolny
[[podatek-rolny|Podatek rolny]] (ustawa z 15 listopada 1984 r.) obciąża grunty sklasyfikowane w ewidencji jako **użytki rolne**, z wyjątkiem zajętych na działalność gospodarczą inną niż rolnicza.
- **Podstawa:** liczba **hektarów przeliczeniowych** (zależy od powierzchni, klasy gleby i okręgu podatkowego); dla niektórych gruntów hektary fizyczne.
- **Stawka:** równowartość pieniężna **2,5 q żyta** od 1 ha przeliczeniowego, liczona według średniej ceny skupu żyta (GUS). Rada gminy może obniżyć tę cenę uchwałą.
- Przewidziane są ulgi, np. dla młodych rolników i gospodarstw ekologicznych.

## Podatek leśny
[[podatek-lesny|Podatek leśny]] (ustawa z 30 października 2002 r.) obejmuje lasy, z wyjątkiem zajętych na działalność gospodarczą inną niż gospodarka leśna.
- **Stawka:** równowartość **0,220 m³ drewna** od 1 ha, według średniej ceny sprzedaży drewna (GUS). Rada może obniżyć tę cenę.
- Zwolnione są m.in. niektóre lasy ochronne i rezerwaty.

> !uwaga Sama ewidencja gruntów zwykle przesądza o tym, czy płacimy rolny, leśny czy od nieruchomości. Ale część gruntu **zajęta na działalność gospodarczą** (np. hala na działce rolnej, parking w lesie) podlega podatkowi od nieruchomości.

## Podatek od środków transportowych
[[podatek-od-srodkow-transportowych|Podatek od środków transportowych]] dotyczy pojazdów ciężkich: **samochodów ciężarowych** (od 3,5 t dopuszczalnej masy całkowitej), ciągników siodłowych i balastowych, przyczep i naczep oraz **autobusów**. Samochody osobowe tym podatkiem nie są objęte.
- Stawki zależą od rodzaju pojazdu, masy, liczby osi, zawieszenia i liczby miejsc (autobusy).
- Rada gminy może różnicować stawki, np. uwzględniając normy emisji spalin (niższe dla czystszych pojazdów).

## Porównanie

| Podatek | Przedmiot | Podstawa | Kto ustala stawkę |
|---|---|---|---|
| od nieruchomości | grunty, budynki, budowle | m² lub wartość (budowle) | rada gminy do maksimum |
| rolny | użytki rolne | ha przeliczeniowe | ustawa (2,5 q żyta); rada może obniżyć cenę żyta |
| leśny | lasy | ha | ustawa (0,220 m³ drewna); rada może obniżyć cenę drewna |
| od środków transportowych | ciężarówki, ciągniki, naczepy, autobusy | pojazd | rada gminy do maksimum |

> !zapamietaj Podatek od nieruchomości liczy się głównie **od powierzchni**, a najwyższe stawki dotyczą nieruchomości **związanych z działalnością gospodarczą**. Rolny opiera się na **cenie żyta**, leśny na **cenie drewna**. Od środków transportowych płacą właściciele **pojazdów ciężkich**.`,
            ru: `Четыре местных налога облагают имущество: недвижимость, землю, леса и транспорт. Первые три нужно уметь различать, потому что один и тот же участок может облагаться только одним из них.

## Налог на недвижимость
[[podatek-od-nieruchomosci|Налог на недвижимость]] (закон от 12 января 1991 г. о местных налогах и сборах) — фискально важнейший местный налог. Во многих городах он даёт больше половины поступлений от местных налогов.

**Объект:**
- земельные участки (кроме сельскохозяйственных и лесных, если только они не заняты под предпринимательскую деятельность),
- здания или их части,
- сооружения или их части, **связанные с предпринимательской деятельностью**.

**Налогоплательщики:** собственники, самостоятельные владельцы, бессрочные пользователи, а также зависимые владельцы недвижимости Государственной казны или JST.

**База:**

| Объект | База |
|---|---|
| участки | площадь в м² (или га) |
| здания | полезная площадь в м² |
| сооружения | стоимость |

Это важная черта польской системы: база — **площадь, а не рыночная стоимость** (кроме сооружений). С 2025 г. действуют новые законодательные определения здания и сооружения, введённые после решения Конституционного трибунала (SK 39/19).

**Ставки** совет гмины дифференцирует по назначению: одни для жилых, другие для связанных с предпринимательской деятельностью (самые высокие), третьи для прочих. Все они не могут превышать законодательных максимумов.

> !przyklad По примеру из материалов фирма арендует офис 100 м² и склад 200 м². Гмина установила ставку для зданий, связанных с предпринимательской деятельностью, 25 зл/м². Годовой налог = 300 м² × 25 зл = **7 500 зл**. (25 зл — условная ставка примера, а не конкретная ставка из сообщения министра.)

## Сельскохозяйственный налог
[[podatek-rolny|Сельскохозяйственный налог]] (закон от 15 ноября 1984 г.) облагает земли, отнесённые в кадастре к **сельхозугодьям**, кроме занятых под предпринимательскую деятельность, отличную от сельскохозяйственной.
- **База:** число **условных гектаров** (зависит от площади, класса почвы и налогового округа); для некоторых земель — физические гектары.
- **Ставка:** денежный эквивалент **2,5 ц ржи** с 1 условного гектара по средней цене закупки ржи (GUS). Совет гмины может снизить эту цену решением.
- Предусмотрены льготы, например для молодых фермеров и экологических хозяйств.

## Лесной налог
[[podatek-lesny|Лесной налог]] (закон от 30 октября 2002 г.) охватывает леса, кроме занятых под предпринимательскую деятельность, отличную от лесного хозяйства.
- **Ставка:** эквивалент **0,220 м³ древесины** с 1 га по средней цене продажи древесины (GUS). Совет может снизить эту цену.
- Освобождены, в частности, некоторые защитные леса и заповедники.

> !uwaga Сам земельный кадастр обычно определяет, платим ли мы сельхозналог, лесной или на недвижимость. Но часть участка, **занятая под предпринимательскую деятельность** (например, ангар на сельхозучастке, парковка в лесу), облагается налогом на недвижимость.

## Налог на транспортные средства
[[podatek-od-srodkow-transportowych|Налог на транспортные средства]] касается тяжёлой техники: **грузовых автомобилей** (от 3,5 т разрешённой полной массы), седельных и балластных тягачей, прицепов и полуприцепов, а также **автобусов**. Легковые автомобили этим налогом не облагаются.
- Ставки зависят от вида транспорта, массы, числа осей, подвески и числа мест (автобусы).
- Совет гмины может дифференцировать ставки, например с учётом экологических норм выхлопа (ниже для более чистых машин).

## Сравнение

| Налог | Объект | База | Кто устанавливает ставку |
|---|---|---|---|
| на недвижимость | участки, здания, сооружения | м² или стоимость (сооружения) | совет гмины до максимума |
| сельскохозяйственный | сельхозугодья | условные га | закон (2,5 ц ржи); совет может снизить цену ржи |
| лесной | леса | га | закон (0,220 м³ древесины); совет может снизить цену древесины |
| на транспортные средства | грузовики, тягачи, полуприцепы, автобусы | транспортное средство | совет гмины до максимума |

> !zapamietaj Налог на недвижимость считается в основном **с площади**, а самые высокие ставки — для недвижимости, **связанной с предпринимательской деятельностью**. Сельскохозяйственный опирается на **цену ржи**, лесной — на **цену древесины**. Налог на транспорт платят владельцы **тяжёлых машин**.`,
          },
          quiz: [
            { q: { pl: "Co jest podstawą opodatkowania budynku w podatku od nieruchomości?", ru: "Что является налоговой базой здания в налоге на недвижимость?" },
              a: [{ pl: "Wartość rynkowa", ru: "Рыночная стоимость" }, { pl: "Powierzchnia użytkowa w m²", ru: "Полезная площадь в м²" }, { pl: "Liczba pięter", ru: "Число этажей" }, { pl: "Dochód z najmu", ru: "Доход от аренды" }],
              correct: 1, why: { pl: "Budynki opodatkowane są od powierzchni użytkowej; od wartości liczy się podatek tylko od budowli.", ru: "Здания облагаются с полезной площади; со стоимости налог считается только для сооружений." } },
            { q: { pl: "Firma ma magazyn 400 m², stawka gminy dla budynków gospodarczych 25 zł/m². Ile wynosi podatek?", ru: "У фирмы склад 400 м², ставка гмины для хозяйственных зданий 25 зл/м². Каков налог?" },
              a: [{ pl: "1 000 zł", ru: "1 000 зл" }, { pl: "7 500 zł", ru: "7 500 зл" }, { pl: "4 000 zł", ru: "4 000 зл" }, { pl: "10 000 zł", ru: "10 000 зл" }],
              correct: 3, why: { pl: "400 m² × 25 zł = 10 000 zł rocznie.", ru: "400 м² × 25 зл = 10 000 зл в год." } },
            { q: { pl: "Na czym opiera się stawka podatku rolnego?", ru: "На чём основана ставка сельскохозяйственного налога?" },
              a: [{ pl: "Na równowartości 2,5 q żyta od 1 ha przeliczeniowego", ru: "На эквиваленте 2,5 ц ржи с 1 условного гектара" }, { pl: "Na cenie drewna", ru: "На цене древесины" }, { pl: "Na wartości rynkowej ziemi", ru: "На рыночной стоимости земли" }, { pl: "Na dochodzie rolnika", ru: "На доходе фермера" }],
              correct: 0, why: { pl: "Stawka rolnego to 2,5 q żyta × średnia cena skupu żyta (GUS); rada gminy może obniżyć tę cenę.", ru: "Ставка сельхозналога — 2,5 ц ржи × средняя цена закупки ржи (GUS); совет гмины может снизить эту цену." } },
            { q: { pl: "Który pojazd NIE podlega podatkowi od środków transportowych?", ru: "Какое транспортное средство НЕ облагается налогом на транспорт?" },
              a: [{ pl: "Ciągnik siodłowy", ru: "Седельный тягач" }, { pl: "Autobus", ru: "Автобус" }, { pl: "Samochód osobowy", ru: "Легковой автомобиль" }, { pl: "Naczepa", ru: "Полуприцеп" }],
              correct: 2, why: { pl: "Podatek obejmuje pojazdy ciężkie i autobusy; samochody osobowe nie są nim objęte.", ru: "Налог охватывает тяжёлый транспорт и автобусы; легковые автомобили им не облагаются." } },
            { q: { pl: "Na działce rolnej (w ewidencji: użytki rolne) stoi hala firmy na 0,5 ha. Jaki podatek dotyczy tej części?", ru: "На сельхозучастке (в кадастре: сельхозугодья) стоит ангар фирмы на 0,5 га. Какой налог касается этой части?" },
              a: [{ pl: "Rolny", ru: "Сельскохозяйственный" }, { pl: "Leśny", ru: "Лесной" }, { pl: "Żaden", ru: "Никакой" }, { pl: "Od nieruchomości", ru: "На недвижимость" }],
              correct: 3, why: { pl: "Grunty rolne zajęte na działalność gospodarczą inną niż rolnicza są wyłączone z podatku rolnego i podlegają podatkowi od nieruchomości.", ru: "Сельхозземли, занятые под предпринимательскую деятельность, отличную от сельскохозяйственной, исключены из сельхозналога и облагаются налогом на недвижимость." } },
          ],
        },
        // ------------------------------------------------------------------ 6.3
        {
          id: "6.3",
          title: { pl: "Opłaty lokalne i lokalna polityka podatkowa", ru: "Местные сборы и местная налоговая политика" },
          src: "Podatki i opłaty samorządowe – wykład 1 (2026): opłaty lokalne, funkcje podatków lokalnych, stabilność dochodów, lokalna polityka podatkowa, konkurencja podatkowa, kazusy 1–5",
          body: {
            pl: `Oprócz podatków gmina może pobierać opłaty lokalne. A decydując o stawkach i zwolnieniach, prowadzi własną politykę podatkową, która ma swoje plusy, minusy i ryzyka.

## Opłaty lokalne
[[oplata-lokalna|Opłaty lokalne]] różnią się od podatków tym, że płacący dostaje w zamian jakieś świadczenie albo możliwość korzystania z przestrzeni publicznej. Są więc częściowo ekwiwalentne. Rada gminy wprowadza je **fakultatywnie** (wyjątkiem jest obowiązkowa opłata skarbowa).

| Opłata | Kto płaci | Uwagi |
|---|---|---|
| **Targowa** | osoby fizyczne, prawne i jednostki dokonujące sprzedaży na targowiskach | nie dotyczy sprzedaży w budynkach |
| **Miejscowa** | osoby przebywające czasowo w miejscowościach turystycznych | pobierana zwykle przez hotel lub pensjonat jako inkasenta |
| **Uzdrowiskowa** | osoby przebywające w uzdrowiskach | wyższa niż miejscowa |
| **Reklamowa** | właściciele tablic i urządzeń reklamowych (od 2015 r.) | wymaga uchwały krajobrazowej; część stała i zmienna od m²; narzędzie ładu przestrzennego |
| **Od posiadania psów** | osoby fizyczne mające psy | niewielkie znaczenie fiskalne, liczne zwolnienia |

## Funkcje podatków lokalnych

| Funkcja | Jak działa w gminie |
|---|---|
| **Fiskalna** | dostarcza pieniędzy na zadania; najwydajniejszy jest podatek od nieruchomości, w gminach wiejskich ważny jest rolny |
| **Regulacyjna** | różne stawki zależnie od sposobu użycia nieruchomości; opłata reklamowa porządkuje „chaos reklamowy”; niższe stawki dla czystszych ciężarówek |
| **Stymulacyjna** | zwolnienia dla nowych inwestycji, preferencje w strefach rewitalizacji, dla obiektów sportowych, instalacji OZE |

## Stabilność dochodów
- **Wysoka:** podatek od nieruchomości (powierzchnia zmienia się wolno), rolny i leśny.
- **Umiarkowana:** udziały w PIT (zależą od rynku pracy), podatek od środków transportowych.
- **Niska:** PCC i podatek od spadków i darowizn (zależą od koniunktury na rynku nieruchomości).

## Dwie strategie gminy

| | Strategia fiskalna | Strategia proinwestycyjna |
|---|---|---|
| Stawki | blisko maksimów | poniżej maksimów, szerokie zwolnienia |
| Cel | jak najwyższe wpływy teraz | przyciągnąć firmy, które później powiększą bazę podatkową i udziały w PIT |
| Dla kogo | gminy z dużymi potrzebami inwestycyjnymi i silną bazą firm | gminy w restrukturyzacji, przy węzłach komunikacyjnych, w strefach ekonomicznych |

W praktyce większość gmin stosuje strategię **mieszaną**.

## Skutki podwyżek i obniżek
- **Podwyżka:** pewny wzrost wpływów w krótkim okresie, ale obciąża mieszkańców (ryzyko polityczne) i może wypychać firmy do tańszych gmin. W skrajnym przypadku działa lokalny odpowiednik **krzywej Laffera**: wyższe stawki, a dochody spadają, bo baza się kurczy.
- **Obniżka:** większa atrakcyjność i wizerunek, ale natychmiastowy ubytek dochodów, niepewny efekt i ryzyko **„wyścigu na dno”**, w którym sąsiednie gminy licytują się obniżkami.

> !przyklad Kazus z wykładu: gmina Nowa Dolina (25 tys. mieszkańców) planuje szkołę, przedszkole i drogi. Podwyżka podatku od nieruchomości blisko maksimów da ok. 3 mln zł rocznie, ale przedsiębiorcy grożą przeniesieniem się do sąsiedniej gminy. Rozsądna rekomendacja: podwyżka umiarkowana i rozłożona w czasie, zróżnicowana (mniejsza dla mieszkańców, większa dla gruntów nieużywanych), połączona z jasną informacją, na co pójdą pieniądze, i analizą, czy firmy realnie mogą się przenieść.

## Konkurencja podatkowa między gminami
- **Za:** dyscyplinuje władze, wymusza efektywność, daje podatnikom wybór („głosowanie nogami” według Tiebouta).
- **Przeciw:** „wyścig na dno”, pogłębianie nierówności, trudności z długofalowym planowaniem.
- **Polskie realia:** najwyraźniej widać ją w gminach podmiejskich wokół dużych miast i przy węzłach autostradowych.

> !uwaga Badania pokazują, że inwestor patrzy najpierw na dostępność komunikacyjną, infrastrukturę i ludzi, a podatki są dalej na liście. Niska stawka nie zrekompensuje złych dróg.

> !zapamietaj Opłaty lokalne (targowa, miejscowa, uzdrowiskowa, reklamowa, od psów) są **fakultatywne** i częściowo ekwiwalentne. Gmina wybiera między strategią **fiskalną** a **proinwestycyjną**; obie mają koszty.`,
            ru: `Помимо налогов, гмина может взимать местные сборы. А решая о ставках и освобождениях, она ведёт собственную налоговую политику, у которой есть плюсы, минусы и риски.

## Местные сборы
[[oplata-lokalna|Местные сборы]] отличаются от налогов тем, что плательщик получает взамен некое предоставление или возможность пользоваться публичным пространством. Поэтому они частично эквивалентны. Совет гмины вводит их **факультативно** (исключение — обязательный гербовый сбор).

| Сбор | Кто платит | Примечания |
|---|---|---|
| **Рыночный** (targowa) | физические, юридические лица и организации, торгующие на рынках | не касается продажи в зданиях |
| **Курортный** (miejscowa) | лица, временно пребывающие в туристических местностях | обычно взимает гостиница или пансионат как сборщик |
| **Санаторный** (uzdrowiskowa) | лица, пребывающие на курортах | выше курортного |
| **Рекламный** | владельцы рекламных щитов и устройств (с 2015 г.) | требует «ландшафтного» решения совета; постоянная часть и переменная с м²; инструмент пространственного порядка |
| **За содержание собак** | физические лица, имеющие собак | малое фискальное значение, много освобождений |

## Функции местных налогов

| Функция | Как работает в гмине |
|---|---|
| **Фискальная** | даёт деньги на задачи; самый доходный — налог на недвижимость, в сельских гминах важен сельхозналог |
| **Регулирующая** | разные ставки в зависимости от использования недвижимости; рекламный сбор упорядочивает «рекламный хаос»; пониженные ставки для более чистых грузовиков |
| **Стимулирующая** | освобождения для новых инвестиций, преференции в зонах ревитализации, для спортивных объектов, установок ВИЭ |

## Стабильность доходов
- **Высокая:** налог на недвижимость (площадь меняется медленно), сельскохозяйственный и лесной.
- **Умеренная:** доли в PIT (зависят от рынка труда), налог на транспортные средства.
- **Низкая:** PCC и налог на наследство и дарение (зависят от конъюнктуры на рынке недвижимости).

## Две стратегии гмины

| | Фискальная стратегия | Проинвестиционная стратегия |
|---|---|---|
| Ставки | близко к максимумам | ниже максимумов, широкие освобождения |
| Цель | максимальные поступления сейчас | привлечь фирмы, которые позже расширят налоговую базу и доли в PIT |
| Для кого | гмины с большими инвестиционными потребностями и сильной базой фирм | гмины в реструктуризации, у транспортных узлов, в экономических зонах |

На практике большинство гмин применяет **смешанную** стратегию.

## Последствия повышения и снижения
- **Повышение:** гарантированный рост поступлений в краткосрочной перспективе, но нагрузка на жителей (политический риск) и возможный уход фирм в более дешёвые гмины. В крайнем случае действует местный аналог **кривой Лаффера**: ставки выше, а доходы падают, потому что база сжимается.
- **Снижение:** выше привлекательность и имидж, но немедленная потеря доходов, неопределённый эффект и риск **«гонки на дно»**, когда соседние гмины перебивают друг друга снижением ставок.

> !przyklad Казус с лекции: гмина Новая Долина (25 тыс. жителей) планирует школу, детский сад и дороги. Повышение налога на недвижимость почти до максимумов даст около 3 млн зл в год, но предприниматели грозят переехать в соседнюю гмину. Разумная рекомендация: умеренное и растянутое во времени повышение, дифференцированное (меньше для жителей, больше для неиспользуемых участков), с ясной информацией, на что пойдут деньги, и анализом, могут ли фирмы реально переехать.

## Налоговая конкуренция между гминами
- **За:** дисциплинирует власти, вынуждает к эффективности, даёт налогоплательщикам выбор («голосование ногами» по Тибу).
- **Против:** «гонка на дно», углубление неравенства, трудности долгосрочного планирования.
- **Польские реалии:** заметнее всего в пригородных гминах вокруг больших городов и у автомагистральных узлов.

> !uwaga Исследования показывают, что инвестор смотрит сначала на транспортную доступность, инфраструктуру и людей, а налоги — дальше в списке. Низкая ставка не компенсирует плохие дороги.

> !zapamietaj Местные сборы (рыночный, курортный, санаторный, рекламный, за собак) **факультативны** и частично эквивалентны. Гмина выбирает между **фискальной** и **проинвестиционной** стратегией; обе имеют издержки.`,
          },
          quiz: [
            { q: { pl: "Czym opłata lokalna różni się od podatku lokalnego?", ru: "Чем местный сбор отличается от местного налога?" },
              a: [{ pl: "Opłata daje płacącemu świadczenie lub możliwość korzystania z przestrzeni publicznej", ru: "Сбор даёт плательщику предоставление или возможность пользоваться публичным пространством" }, { pl: "Opłatę ustala Minister Finansów", ru: "Сбор устанавливает министр финансов" }, { pl: "Opłata jest zawsze obowiązkowa", ru: "Сбор всегда обязателен" }, { pl: "Opłatę płacą tylko firmy", ru: "Сбор платят только фирмы" }],
              correct: 0, why: { pl: "Opłaty mają charakter (częściowo) ekwiwalentny; rada wprowadza je fakultatywnie.", ru: "Сборы имеют (частично) эквивалентный характер; совет вводит их факультативно." } },
            { q: { pl: "Która danina lokalna ma najniższą stabilność dochodów?", ru: "Какой местный платёж наименее стабилен по доходам?" },
              a: [{ pl: "Podatek od nieruchomości", ru: "Налог на недвижимость" }, { pl: "Podatek rolny", ru: "Сельскохозяйственный налог" }, { pl: "PCC i podatek od spadków i darowizn", ru: "PCC и налог на наследство и дарение" }, { pl: "Podatek leśny", ru: "Лесной налог" }],
              correct: 2, why: { pl: "Wpływy z PCC i spadków są silnie procykliczne: rosną w boomie na rynku nieruchomości i spadają w recesji.", ru: "Поступления PCC и от наследства сильно проциклические: растут в бум на рынке недвижимости и падают в рецессию." } },
            { q: { pl: "Co oznacza „wyścig na dno” w lokalnej polityce podatkowej?", ru: "Что означает «гонка на дно» в местной налоговой политике?" },
              a: [{ pl: "Podnoszenie stawek do maksimów", ru: "Повышение ставок до максимумов" }, { pl: "Spiralę obniżek między konkurującymi gminami, która niszczy bazę dochodową", ru: "Спираль снижений между конкурирующими гминами, разрушающая доходную базу" }, { pl: "Likwidację opłaty targowej", ru: "Отмену рыночного сбора" }, { pl: "Kontrolę RIO", ru: "Проверку RIO" }],
              correct: 1, why: { pl: "Gminy licytują się obniżkami, aż wszystkie tracą dochody, a przewagi i tak nikt nie ma.", ru: "Гмины перебивают друг друга снижениями, пока все не теряют доходы, а преимущества так ни у кого и нет." } },
            { q: { pl: "Lokalny odpowiednik krzywej Laffera oznacza, że:", ru: "Местный аналог кривой Лаффера означает, что:" },
              a: [{ pl: "każda podwyżka zwiększa dochody", ru: "любое повышение увеличивает доходы" }, { pl: "opłaty są ważniejsze niż podatki", ru: "сборы важнее налогов" }, { pl: "gminy nie mogą obniżać stawek", ru: "гмины не могут снижать ставки" }, { pl: "zbyt wysokie stawki mogą zmniejszyć bazę podatkową i dochody", ru: "слишком высокие ставки могут сократить налоговую базу и доходы" }],
              correct: 3, why: { pl: "Gdy firmy i zamożni podatnicy wyjeżdżają, wyższa stawka działa na mniejszą bazę i wpływy spadają.", ru: "Когда фирмы и состоятельные налогоплательщики уезжают, более высокая ставка применяется к меньшей базе, и поступления падают." } },
            { q: { pl: "Kto zwykle pobiera opłatę miejscową od turystów?", ru: "Кто обычно взимает курортный сбор с туристов?" },
              a: [{ pl: "Hotel lub pensjonat jako inkasent", ru: "Гостиница или пансионат как сборщик" }, { pl: "Urząd skarbowy", ru: "Налоговая инспекция" }, { pl: "Policja", ru: "Полиция" }, { pl: "Sami turyści wpłacają na konto ministerstwa", ru: "Сами туристы платят на счёт министерства" }],
              correct: 0, why: { pl: "Opłatę miejscową pobiera zwykle podmiot udzielający noclegu w roli inkasenta i wpłaca ją gminie.", ru: "Курортный сбор обычно взимает предоставляющий ночлег субъект в роли сборщика и перечисляет его гмине." } },
          ],
        },
        // ------------------------------------------------------------------ 6.4
        {
          id: "6.4",
          title: { pl: "Podatki lokalne w praktyce: kazusy", ru: "Местные налоги на практике: казусы" },
          src: "Podatki i opłaty lokalne w praktyce 2026 (kazusy 1, 2, 4, 7); Podatki i opłaty samorządowe 2026 (kazusy 3, 6); rozwiązania własne na podstawie ustawy o podatkach i opłatach lokalnych",
          body: {
            pl: `W praktyce doradcy podatkowego spory o podatki lokalne dotyczą najczęściej **kwalifikacji**: czy coś jest budynkiem, budowlą, gruntem rolnym, czy „związane z działalnością”. Przejdźmy przez typowe sytuacje.

## Kazus 1: hala, która „nie jest budynkiem”
Spółka Alfa ma halę produkcyjną 8 400 m²: konstrukcja stalowa, fundament, dach, instalacje technologiczne, suwnica, wentylacja, instalacja przeciwpożarowa. Spółka twierdzi, że funkcja technologiczna wyklucza opodatkowanie hali jako budynku. Gmina opodatkowała całość.

**Rozwiązanie krok po kroku:**
1. O kwalifikacji decydują **cechy konstrukcyjne**: czy obiekt jest trwale związany z gruntem, wydzielony przegrodami budowlanymi, ma fundament i dach. Hala z fundamentem, ścianami i dachem spełnia te cechy, więc co do zasady jest **budynkiem** (podstawa: powierzchnia użytkowa).
2. Sama funkcja technologiczna nie zmienia budynku w budowlę. Od 2025 r. obowiązują nowe ustawowe definicje budynku i budowli, które mają te spory ograniczać.
3. **Urządzenia** (suwnica, linie technologiczne) nie są częścią budynku. Część z nich może być opodatkowana jako **budowle** związane z działalnością (od wartości), jeśli spełniają ustawową definicję; inne, jak maszyny, w ogóle nie podlegają temu podatkowi.
4. **Wniosek:** gmina słusznie opodatkowała halę jako budynek, ale nie powinna doliczać do powierzchni ani wartości maszyn. Spółka powinna wykazać, które elementy są urządzeniami, a które budowlami.

## Kazus 2: pusty lokal nie obniża automatycznie stawki
Spółka ma lokal użytkowy 1 200 m², pusty od 18 miesięcy. Chce niższej stawki niż dla działalności gospodarczej.

1. Nieruchomość w posiadaniu przedsiębiorcy uważa się za **związaną z działalnością gospodarczą**, nawet jeśli w danej chwili nikt w niej nie pracuje.
2. Niższą stawkę można stosować tylko wtedy, gdy działalności **nie da się prowadzić ze względów technicznych** (np. budynek grozi zawaleniem, nakaz wyłączenia z użytkowania).
3. Sam brak najemcy, brak klientów czy decyzja biznesowa nie wystarczą.
4. **Opinia dla zarządu:** stawka dla działalności gospodarczej jest prawidłowa, chyba że spółka udokumentuje (np. ekspertyzą, decyzją nadzoru budowlanego) techniczną niemożność użytkowania.

## Kazus 3: działka rolna z halą magazynową
Grunt 3 ha, w ewidencji jako użytki rolne. Na 0,5 ha stoi hala używana w działalności gospodarczej. Podatnik płaci rolny od całości, gmina chce podatku od nieruchomości od części.

1. **Ewidencja** ma podstawowe znaczenie: użytki rolne podlegają podatkowi rolnemu.
2. Ustawa wyłącza jednak z podatku rolnego grunty **zajęte na działalność gospodarczą inną niż rolnicza**. Liczy się faktyczne wykorzystanie.
3. Na 0,5 ha zajętych przez halę: **podatek od nieruchomości** od gruntu (stawka dla gruntów związanych z działalnością) i od budynku hali (od m²).
4. Na pozostałych 2,5 ha: **podatek rolny**.
5. Gmina ma rację co do części działki.

## Kazus 4: opłata targowa — kto handluje?
Przedsiębiorca sprzedaje warzywa. W sobotę wynajmuje stanowisko na targowisku, a sprzedaje jego pracownik. Inkasent pobiera opłatę od pracownika, który odmawia.

1. Opłatę targową płacą osoby **dokonujące sprzedaży** na targowisku.
2. Pracownik działa w imieniu i na rachunek pracodawcy: to **przedsiębiorca** jest sprzedawcą (jego towar, jego ryzyko).
3. Faktura za wynajem stanowiska nie zwalnia z opłaty targowej. To dwie różne rzeczy: czynsz za miejsce i danina publiczna.
4. **Stanowisko:** zobowiązany jest przedsiębiorca. Pracownik może zapłacić w jego imieniu, ale nie jest dłużnikiem z własnego majątku.

## Kazus 5: „Rada uchwaliła, RIO uchyliło”
Rada gminy uchwaliła: „Zwalnia się z podatku od nieruchomości przedsiębiorstwo ABC sp. z o.o.”.

1. Rada może wprowadzać tylko **zwolnienia przedmiotowe** (kategorie nieruchomości), nie podmiotowe.
2. Imienne zwolnienie narusza zasadę równości i może być niedozwoloną pomocą publiczną.
3. Rada **przekroczyła kompetencje**. Organ nadzoru (RIO) stwierdzi nieważność uchwały w całości lub w części.
4. **Jak zrobić to legalnie?** Np. zwolnić „budynki i grunty zajęte pod nowe inwestycje spełniające kryteria X i Y”, dostępne dla każdego, kto je spełni, i zgodne z zasadami pomocy publicznej.

> !przyklad Liczbowo w kazusie 3 (działka z halą): jeśli rada ustaliła stawkę dla gruntów związanych z działalnością na X zł/m², podatnik płaci podatek od nieruchomości od 5 000 m² gruntu (0,5 ha) według tej stawki plus podatek od powierzchni użytkowej hali, a podatek rolny tylko od 2,5 ha. Deklaracja „rolny od całości” zaniża podatek gminie.

> !uwaga W kazusie 3 z wykładu („Dlaczego nowa firma płaci mniej?”) zwolnienie dla wszystkich **nowych** przedsiębiorców jest formalnie przedmiotowe, ale budzi zarzut nierówności wobec firm działających od lat. Bezpieczniejsze jest zwolnienie dla wszystkich, którzy spełnią obiektywne kryteria (np. nowa inwestycja, nowe miejsca pracy), także dla istniejących firm.

> !zapamietaj W sporach lokalnych decyduje **kwalifikacja**: cechy konstrukcyjne (budynek czy budowla), **faktyczne wykorzystanie** gruntu (rolny czy od nieruchomości) i **status przedsiębiorcy** (posiadanie przez firmę = związek z działalnością). Rada może zwalniać tylko **kategorie**, nie konkretne firmy.`,
            ru: `В практике налогового консультанта споры о местных налогах чаще всего касаются **квалификации**: здание это, сооружение, сельхозземля или нечто «связанное с деятельностью». Разберём типичные ситуации.

## Казус 1: цех, который «не является зданием»
У компании Альфа производственный цех 8 400 м²: стальной каркас, фундамент, крыша, технологические системы, мостовой кран, вентиляция, противопожарная система. Компания утверждает, что технологическая функция исключает обложение цеха как здания. Гмина обложила всё.

**Решение по шагам:**
1. Квалификацию определяют **конструктивные признаки**: прочно ли объект связан с землёй, отделён ли строительными перегородками, есть ли фундамент и крыша. Цех с фундаментом, стенами и крышей им отвечает, поэтому, как правило, это **здание** (база — полезная площадь).
2. Сама технологическая функция не превращает здание в сооружение. С 2025 г. действуют новые законодательные определения здания и сооружения, которые должны сократить такие споры.
3. **Оборудование** (мостовой кран, технологические линии) не является частью здания. Часть его может облагаться как **сооружения**, связанные с деятельностью (со стоимости), если отвечает законодательному определению; другое, как машины, этим налогом вообще не облагается.
4. **Вывод:** гмина правильно обложила цех как здание, но не должна добавлять к площади или стоимости машины. Компании следует показать, какие элементы — оборудование, а какие — сооружения.

## Казус 2: пустое помещение не снижает ставку автоматически
У компании коммерческое помещение 1 200 м², пустующее 18 месяцев. Она хочет ставку ниже, чем для предпринимательской деятельности.

1. Недвижимость во владении предпринимателя считается **связанной с предпринимательской деятельностью**, даже если в данный момент там никто не работает.
2. Пониженную ставку можно применять только тогда, когда деятельность **невозможно вести по техническим причинам** (например, здание грозит обрушением, предписание о выводе из эксплуатации).
3. Отсутствия арендатора, клиентов или бизнес-решения недостаточно.
4. **Заключение для правления:** ставка для предпринимательской деятельности правильна, если только компания не докажет (например, экспертизой, решением строительного надзора) техническую невозможность использования.

## Казус 3: сельхозучасток со складским ангаром
Участок 3 га, в кадастре — сельхозугодья. На 0,5 га стоит ангар, используемый в предпринимательской деятельности. Налогоплательщик платит сельхозналог со всего участка, гмина хочет налог на недвижимость с части.

1. **Кадастр** имеет основное значение: сельхозугодья облагаются сельхозналогом.
2. Но закон исключает из сельхозналога земли, **занятые под предпринимательскую деятельность, отличную от сельскохозяйственной**. Важно фактическое использование.
3. На 0,5 га под ангаром: **налог на недвижимость** с земли (ставка для участков, связанных с деятельностью) и со здания ангара (с м²).
4. На остальных 2,5 га: **сельскохозяйственный налог**.
5. Гмина права в отношении части участка.

## Казус 4: рыночный сбор — кто торгует?
Предприниматель продаёт овощи. В субботу он арендует место на рынке, а продаёт его работник. Сборщик требует сбор с работника, тот отказывается.

1. Рыночный сбор платят лица, **осуществляющие продажу** на рынке.
2. Работник действует от имени и за счёт работодателя: продавец — **предприниматель** (его товар, его риск).
3. Счёт за аренду места не освобождает от рыночного сбора. Это разные вещи: плата за место и публичный платёж.
4. **Позиция:** обязан предприниматель. Работник может заплатить от его имени, но не является должником своим имуществом.

## Казус 5: «Совет принял, RIO отменила»
Совет гмины постановил: «Освобождается от налога на недвижимость предприятие ABC sp. z o.o.».

1. Совет может вводить только **предметные освобождения** (категории недвижимости), но не субъектные.
2. Именное освобождение нарушает принцип равенства и может быть недопустимой госпомощью.
3. Совет **превысил полномочия**. Надзорный орган (RIO) признает решение недействительным полностью или в части.
4. **Как сделать законно?** Например, освободить «здания и участки, занятые под новые инвестиции, отвечающие критериям X и Y», доступно каждому, кто им отвечает, и в соответствии с правилами госпомощи.

> !przyklad В цифрах для казуса 3 (участок с ангаром): если совет установил ставку для участков, связанных с деятельностью, X зл/м², налогоплательщик платит налог на недвижимость с 5 000 м² земли (0,5 га) по этой ставке плюс налог с полезной площади ангара, а сельхозналог — только с 2,5 га. Декларация «сельхозналог со всего участка» занижает налог гмине.

> !uwaga В казусе 3 из лекции («Почему новая фирма платит меньше?») освобождение для всех **новых** предпринимателей формально предметное, но вызывает упрёк в неравенстве по отношению к фирмам, работающим много лет. Безопаснее освобождение для всех, кто отвечает объективным критериям (например, новая инвестиция, новые рабочие места), в том числе для существующих фирм.

> !zapamietaj В местных спорах решает **квалификация**: конструктивные признаки (здание или сооружение), **фактическое использование** земли (сельхозналог или налог на недвижимость) и **статус предпринимателя** (владение фирмой = связь с деятельностью). Совет может освобождать только **категории**, а не конкретные фирмы.`,
          },
          quiz: [
            { q: { pl: "Przedsiębiorca ma pusty lokal użytkowy. Kiedy może zastosować stawkę niższą niż dla działalności gospodarczej?", ru: "У предпринимателя пустое коммерческое помещение. Когда он может применить ставку ниже, чем для предпринимательской деятельности?" },
              a: [{ pl: "Gdy nie ma najemcy od 6 miesięcy", ru: "Когда нет арендатора 6 месяцев" }, { pl: "Gdy zarząd tak zdecyduje", ru: "Когда так решит правление" }, { pl: "Gdy działalności nie da się prowadzić ze względów technicznych", ru: "Когда деятельность невозможно вести по техническим причинам" }, { pl: "Zawsze, gdy lokal stoi pusty", ru: "Всегда, когда помещение пустует" }],
              correct: 2, why: { pl: "Posiadanie przez przedsiębiorcę oznacza związek z działalnością; wyjątkiem jest techniczna niemożność prowadzenia działalności.", ru: "Владение предпринимателем означает связь с деятельностью; исключение — техническая невозможность ведения деятельности." } },
            { q: { pl: "Co przesądza o tym, czy hala jest budynkiem?", ru: "Что определяет, является ли цех зданием?" },
              a: [{ pl: "Cechy konstrukcyjne: trwałe związanie z gruntem, przegrody budowlane, fundament, dach", ru: "Конструктивные признаки: прочная связь с землёй, строительные перегородки, фундамент, крыша" }, { pl: "Wyłącznie funkcja technologiczna", ru: "Только технологическая функция" }, { pl: "Wartość maszyn wewnątrz", ru: "Стоимость машин внутри" }, { pl: "Opinia wójta", ru: "Мнение войта" }],
              correct: 0, why: { pl: "Funkcja nie zmienia budynku w budowlę; liczą się cechy konstrukcyjne, a urządzenia ocenia się osobno.", ru: "Функция не превращает здание в сооружение; важны конструктивные признаки, а оборудование оценивается отдельно." } },
            { q: { pl: "Kto jest zobowiązany do opłaty targowej, gdy na stanowisku sprzedaje pracownik przedsiębiorcy?", ru: "Кто обязан платить рыночный сбор, если на месте продаёт работник предпринимателя?" },
              a: [{ pl: "Pracownik z własnych pieniędzy", ru: "Работник из собственных денег" }, { pl: "Przedsiębiorca, bo to on dokonuje sprzedaży", ru: "Предприниматель, так как продажу осуществляет он" }, { pl: "Zarządca targowiska", ru: "Управляющий рынком" }, { pl: "Nikt, bo jest faktura za stanowisko", ru: "Никто, так как есть счёт за место" }],
              correct: 1, why: { pl: "Pracownik działa w imieniu i na rachunek przedsiębiorcy; faktura za wynajem nie zastępuje opłaty targowej.", ru: "Работник действует от имени и за счёт предпринимателя; счёт за аренду не заменяет рыночный сбор." } },
            { q: { pl: "Uchwała „zwalnia się spółkę ABC z podatku od nieruchomości” jest:", ru: "Решение «освобождается компания ABC от налога на недвижимость» является:" },
              a: [{ pl: "zgodna z prawem, jeśli ABC tworzy miejsca pracy", ru: "законным, если ABC создаёт рабочие места" }, { pl: "ważna przez 5 lat", ru: "действительным 5 лет" }, { pl: "zgodna z prawem po akceptacji SKO", ru: "законным после одобрения SKO" }, { pl: "niezgodna z prawem, bo to zwolnienie podmiotowe", ru: "незаконным, так как это субъектное освобождение" }],
              correct: 3, why: { pl: "Rada może zwalniać tylko kategorie przedmiotów; organ nadzoru stwierdzi nieważność takiej uchwały.", ru: "Совет может освобождать только категории объектов; надзорный орган признает такое решение недействительным." } },
            { q: { pl: "Działka 3 ha jest w ewidencji użytkami rolnymi, ale 0,5 ha zajmuje hala firmy. Jak ją opodatkować?", ru: "Участок 3 га в кадастре — сельхозугодья, но 0,5 га занимает ангар фирмы. Как его облагать?" },
              a: [{ pl: "2,5 ha podatkiem rolnym, 0,5 ha i halę podatkiem od nieruchomości", ru: "2,5 га — сельхозналогом, 0,5 га и ангар — налогом на недвижимость" }, { pl: "Całość podatkiem rolnym", ru: "Весь участок — сельхозналогом" }, { pl: "Całość podatkiem leśnym", ru: "Весь участок — лесным налогом" }, { pl: "Całość podatkiem od nieruchomości", ru: "Весь участок — налогом на недвижимость" }],
              correct: 0, why: { pl: "Grunt zajęty na działalność gospodarczą inną niż rolnicza wypada z podatku rolnego; reszta pozostaje w nim.", ru: "Земля под предпринимательскую деятельность, отличную от сельскохозяйственной, выпадает из сельхозналога; остальное остаётся в нём." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Gmina może wprowadzić nowy podatek lokalny, którego nie przewiduje ustawa?", ru: "Может ли гмина ввести новый местный налог, не предусмотренный законом?" },
          a: [{ pl: "Tak, uchwałą rady", ru: "Да, решением совета" }, { pl: "Tak, za zgodą RIO", ru: "Да, с согласия RIO" }, { pl: "Nie, katalog podatków lokalnych jest zamknięty", ru: "Нет, перечень местных налогов закрыт" }, { pl: "Tak, w referendum", ru: "Да, на референдуме" }],
          correct: 2, why: { pl: "Gmina kształtuje tylko stawki i zwolnienia w granicach ustawy; nowe daniny może tworzyć wyłącznie ustawodawca.", ru: "Гмина формирует только ставки и освобождения в пределах закона; новые платежи может вводить только законодатель." } },
        { q: { pl: "Organem podatkowym I instancji w sprawie podatku od nieruchomości jest:", ru: "Налоговым органом I инстанции по налогу на недвижимость является:" },
          a: [{ pl: "naczelnik urzędu skarbowego", ru: "начальник налоговой инспекции" }, { pl: "wójt, burmistrz lub prezydent miasta", ru: "войт, бурмистр или президент города" }, { pl: "rada gminy", ru: "совет гмины" }, { pl: "SKO", ru: "SKO" }],
          correct: 1, why: { pl: "Wójt (burmistrz, prezydent) wymierza i pobiera podatki lokalne; rada uchwala stawki, SKO jest organem odwoławczym.", ru: "Войт (бурмистр, президент) начисляет и взимает местные налоги; совет устанавливает ставки, SKO — апелляционный орган." } },
        { q: { pl: "Udział gminy w PIT jej mieszkańców według materiałów wynosi:", ru: "Доля гмины в PIT её жителей по материалам составляет:" },
          a: [{ pl: "6,71%", ru: "6,71%" }, { pl: "100%", ru: "100%" }, { pl: "19%", ru: "19%" }, { pl: "39,34%", ru: "39,34%" }],
          correct: 3, why: { pl: "Materiały podają 39,34% PIT i 6,71% CIT; gmina nie ma wpływu na wysokość tych udziałów.", ru: "Материалы называют 39,34% PIT и 6,71% CIT; гмина не влияет на размер этих долей." } },
        { q: { pl: "Budowle w podatku od nieruchomości opodatkowane są od:", ru: "Сооружения в налоге на недвижимость облагаются с:" },
          a: [{ pl: "wartości", ru: "стоимости" }, { pl: "powierzchni użytkowej", ru: "полезной площади" }, { pl: "liczby pracowników", ru: "числа работников" }, { pl: "dochodu firmy", ru: "дохода фирмы" }],
          correct: 0, why: { pl: "Grunty i budynki od powierzchni, budowle związane z działalnością od wartości.", ru: "Участки и здания — с площади, сооружения, связанные с деятельностью, — со стоимости." } },
        { q: { pl: "Stawka podatku leśnego opiera się na:", ru: "Ставка лесного налога основана на:" },
          a: [{ pl: "2,5 q żyta", ru: "2,5 ц ржи" }, { pl: "0,220 m³ drewna od 1 ha", ru: "0,220 м³ древесины с 1 га" }, { pl: "wartości lasu", ru: "стоимости леса" }, { pl: "liczbie drzew", ru: "количестве деревьев" }],
          correct: 1, why: { pl: "Stawka leśnego to równowartość 0,220 m³ drewna według średniej ceny sprzedaży drewna.", ru: "Ставка лесного налога — эквивалент 0,220 м³ древесины по средней цене продажи древесины." } },
        { q: { pl: "Który organ nadzoruje legalność uchwał podatkowych rady gminy?", ru: "Какой орган надзирает за законностью налоговых решений совета гмины?" },
          a: [{ pl: "Naczelnik urzędu skarbowego", ru: "Начальник налоговой инспекции" }, { pl: "Wójt", ru: "Войт" }, { pl: "Regionalna Izba Obrachunkowa", ru: "Региональная счётная палата (RIO)" }, { pl: "Szef KAS", ru: "Глава KAS" }],
          correct: 2, why: { pl: "RIO bada uchwały podatkowe pod względem legalności i może stwierdzić ich nieważność.", ru: "RIO проверяет налоговые решения на законность и может признать их недействительными." } },
        { q: { pl: "Która opłata lokalna wymaga uchwały krajobrazowej?", ru: "Какой местный сбор требует «ландшафтного» решения?" },
          a: [{ pl: "Targowa", ru: "Рыночный" }, { pl: "Od posiadania psów", ru: "За содержание собак" }, { pl: "Miejscowa", ru: "Курортный" }, { pl: "Reklamowa", ru: "Рекламный" }],
          correct: 3, why: { pl: "Opłatę reklamową mogą pobierać gminy, które uchwaliły zasady sytuowania tablic i urządzeń reklamowych.", ru: "Рекламный сбор могут взимать гмины, принявшие правила размещения рекламных щитов и устройств." } },
        { q: { pl: "Strategia proinwestycyjna gminy polega na:", ru: "Проинвестиционная стратегия гмины заключается в:" },
          a: [{ pl: "obniżaniu stawek i zwolnieniach, by przyciągnąć firmy", ru: "снижении ставок и освобождениях для привлечения фирм" }, { pl: "ustalaniu stawek na poziomie maksimów", ru: "установлении ставок на уровне максимумов" }, { pl: "likwidacji podatku rolnego", ru: "отмене сельхозналога" }, { pl: "podnoszeniu opłaty skarbowej", ru: "повышении гербового сбора" }],
          correct: 0, why: { pl: "Gmina rezygnuje z części bieżących dochodów w nadziei na większą bazę podatkową i udziały w PIT w przyszłości.", ru: "Гмина отказывается от части текущих доходов в надежде на большую налоговую базу и доли в PIT в будущем." } },
        { q: { pl: "Podatkiem od środków transportowych objęte są samochody ciężarowe o dopuszczalnej masie całkowitej:", ru: "Налогом на транспорт облагаются грузовые автомобили с разрешённой полной массой:" },
          a: [{ pl: "od 1 t", ru: "от 1 т" }, { pl: "od 3,5 t", ru: "от 3,5 т" }, { pl: "od 20 t", ru: "от 20 т" }, { pl: "każdej", ru: "любой" }],
          correct: 1, why: { pl: "Podatek dotyczy samochodów ciężarowych od 3,5 t, ciągników, przyczep, naczep i autobusów.", ru: "Налог касается грузовиков от 3,5 т, тягачей, прицепов, полуприцепов и автобусов." } },
        { q: { pl: "Kto może umorzyć zaległość w podatku od nieruchomości w indywidualnej sprawie?", ru: "Кто может списать недоимку по налогу на недвижимость по индивидуальному делу?" },
          a: [{ pl: "Rada gminy uchwałą", ru: "Совет гмины решением" }, { pl: "RIO", ru: "RIO" }, { pl: "Wójt (burmistrz, prezydent) decyzją", ru: "Войт (бурмистр, президент) решением" }, { pl: "Minister Finansów", ru: "Министр финансов" }],
          correct: 2, why: { pl: "Ulgi w spłacie i umorzenia w indywidualnych sprawach stosuje organ podatkowy, czyli wójt.", ru: "Льготы по уплате и списания по индивидуальным делам применяет налоговый орган, то есть войт." } },
      ],
    },
    {
      n: 7,
      color: "--c7",
      title: { pl: "Postępowanie podatkowe", ru: "Налоговое производство" },
      lead: {
        pl: "Kto jest organem podatkowym, jak uzyskać interpretację, czym różnią się postępowanie podatkowe, czynności sprawdzające i kontrole, jak przebiega postępowanie i jak się odwołać. Na koniec kazusy z kontroli.",
        ru: "Кто является налоговым органом, как получить разъяснение, чем различаются налоговое производство, проверочные действия и проверки, как идёт производство и как обжаловать решение. В конце — казусы по проверкам.",
      },
      subs: [
        // ------------------------------------------------------------------ 7.1
        {
          id: "7.1",
          title: { pl: "Organy podatkowe i interpretacje", ru: "Налоговые органы и разъяснения" },
          src: "Organy podatkowe, interpretacje (art. 7–9, 13, 14a–14s Op; ustawa o KAS); Podstawy systemów podatkowych (właściwość organów); Systematyka podatków w Polsce (organy administracji podatkowej)",
          body: {
            pl: `W stosunku podatkowym państwo i samorząd (podmiot czynny) działają przez **organy podatkowe**. Trzeba wiedzieć, który organ jest właściwy, bo decyzja organu niewłaściwego jest wadliwa.

## Właściwość organów
Właściwość to zdolność organu do załatwienia konkretnej sprawy. Organ bada ją z urzędu na każdym etapie.
- **Rzeczowa:** jaki *typ* organu zajmuje się danym podatkiem (np. urząd skarbowy — PIT, VAT; wójt — podatek od nieruchomości; urząd celno-skarbowy — akcyza, cła).
- **Miejscowa:** *który konkretnie* organ danego typu. Zasada (art. 17 Op): osoby fizyczne — według **miejsca zamieszkania** (nie zameldowania), osoby prawne — według **siedziby**.
- **Instancyjna:** który organ jest I, a który II instancji.

## Krajowa Administracja Skarbowa
[[kas|KAS]] powstała 1 marca 2017 r. z połączenia administracji podatkowej, kontroli skarbowej i Służby Celnej. Zajmuje się poborem podatków i ceł, kontrolą, zwalczaniem przestępstw skarbowych i obsługą podatników.

| Organ | Rola |
|---|---|
| **Minister Finansów** | polityka podatkowa, interpretacje ogólne i objaśnienia podatkowe |
| **Szef KAS** | nadzór i koordynacja; m.in. organ I instancji przy stwierdzaniu nieważności i wznawianiu postępowań z urzędu, porozumienia cenowe, opinie zabezpieczające |
| **Dyrektor Krajowej Informacji Skarbowej** | wydaje interpretacje indywidualne |
| **Dyrektor Izby Administracji Skarbowej** | organ odwoławczy od decyzji naczelników US i UCS |
| **Naczelnik urzędu skarbowego** | I instancja w sprawach podatków państwowych (PIT, CIT, VAT), także pobiera podatek od spadków i darowizn i PCC |
| **Naczelnik urzędu celno-skarbowego** | akcyza, cła, kontrola celno-skarbowa |

**Organy samorządowe:** wójt, burmistrz, prezydent miasta (podatki lokalne), a także starosta i marszałek województwa w zakresie określonym ustawami. Organem odwoławczym od nich jest **Samorządowe Kolegium Odwoławcze (SKO)**.

**Sądy administracyjne:** WSA (pierwsza instancja, skargi na decyzje) i NSA (skargi kasacyjne, ujednolicanie orzecznictwa). Sądy nie są organami podatkowymi, tylko kontrolują legalność ich działań.

## Interpretacje: jak zapytać o prawo
Przepisy są niejasne, więc Ordynacja daje podatnikom narzędzia ochrony.

| | [[interpretacja-ogolna|Interpretacja ogólna]] (art. 14a) | [[interpretacja-indywidualna|Interpretacja indywidualna]] (art. 14b) |
|---|---|---|
| Kto wydaje | Minister Finansów | Dyrektor KIS; w podatkach lokalnych wójt, burmistrz, prezydent, starosta, marszałek |
| Tryb | z urzędu lub na wniosek | wyłącznie na wniosek |
| Dotyczy | zagadnienia, które organy stosują niejednolicie | konkretnego stanu faktycznego lub zdarzenia przyszłego wnioskodawcy |
| Kto może wnioskować | każdy, z wyjątkiem organu administracji | podatnik, płatnik, inkasent, a także inni zainteresowani (np. przyszły inwestor); możliwy wniosek wspólny |

Oprócz tego Minister wydaje z urzędu **objaśnienia podatkowe** (praktyczne wyjaśnienia przepisów).

### Interpretacja indywidualna krok po kroku
1. Wniosek: wyczerpujący opis stanu faktycznego albo zdarzenia przyszłego **oraz własne stanowisko** wnioskodawcy.
2. Oświadczenie pod rygorem odpowiedzialności karnej, że sprawa nie jest przedmiotem toczącego się postępowania, kontroli ani nie została rozstrzygnięta decyzją.
3. **Opłata 40 zł** od każdego stanu faktycznego, płatna w ciągu 7 dni od złożenia wniosku.
4. Wydanie bez zbędnej zwłoki, **najpóźniej w 3 miesiące** od otrzymania wniosku.
5. Interpretacja zawiera ocenę stanowiska (z uzasadnieniem, jeśli jest negatywna) i pouczenie o **skardze do sądu administracyjnego**. Po anonimizacji publikuje się ją w BIP.

## Ochrona, jaką daje interpretacja
> !zapamietaj Zastosowanie się do interpretacji **nie może szkodzić** podatnikowi, nawet jeśli później zostanie zmieniona albo organ jej nie uwzględni. Nie wszczyna się wtedy postępowania karnego skarbowego i **nie nalicza się odsetek za zwłokę**.

> !uwaga Interpretacja chroni tylko w granicach opisanego stanu faktycznego. Jeśli wnioskodawca coś pominął albo opisał inaczej, niż było naprawdę, ochrony nie ma. Nie zwalnia też z obowiązku zapłaty podatku, gdy skutki zdarzenia nastąpiły przed doręczeniem interpretacji.

> !przyklad Spółka planuje kupić od wspólnika samochód i wynajmować go dalej. Nie wie, czy wydatki na auto będą kosztem. Składa wniosek o interpretację indywidualną dotyczącą **zdarzenia przyszłego**, opisuje plan i swoje stanowisko, płaci 40 zł. Dyrektor KIS uznaje stanowisko za prawidłowe. Jeśli po 3 latach organ przy kontroli będzie innego zdania, spółka jest chroniona, o ile zrobiła dokładnie to, co opisała.`,
            ru: `В налоговом отношении государство и самоуправление (активный субъект) действуют через **налоговые органы**. Нужно знать, какой орган компетентен, потому что решение некомпетентного органа порочно.

## Компетенция органов
Компетенция (właściwość) — способность органа рассмотреть конкретное дело. Орган проверяет её по собственной инициативе на каждом этапе.
- **Предметная:** какой *тип* органа занимается данным налогом (например, налоговая инспекция — PIT, VAT; войт — налог на недвижимость; таможенно-налоговая служба — акциз, пошлины).
- **Территориальная:** *какой конкретно* орган данного типа. Правило (ст. 17 Op): физические лица — по **месту жительства** (а не прописки), юридические лица — по **местонахождению**.
- **Инстанционная:** какой орган — I, а какой — II инстанции.

## Национальная налоговая администрация
[[kas|KAS]] (Krajowa Administracja Skarbowa) создана 1 марта 2017 г. путём объединения налоговой администрации, фискального контроля и таможенной службы. Она занимается взиманием налогов и пошлин, контролем, борьбой с фискальными преступлениями и обслуживанием налогоплательщиков.

| Орган | Роль |
|---|---|
| **Министр финансов** | налоговая политика, общие разъяснения и налоговые пояснения |
| **Глава KAS** | надзор и координация; в частности, орган I инстанции при признании решений недействительными и возобновлении производств по собственной инициативе, соглашения о ценах, защитные заключения |
| **Директор Национальной налоговой информации (KIS)** | выдаёт индивидуальные разъяснения |
| **Директор налоговой палаты (IAS)** | апелляционный орган по решениям начальников налоговых и таможенно-налоговых служб |
| **Начальник налоговой инспекции (US)** | I инстанция по государственным налогам (PIT, CIT, VAT), также взимает налог на наследство и дарение и PCC |
| **Начальник таможенно-налоговой службы (UCS)** | акциз, пошлины, таможенно-налоговый контроль |

**Органы самоуправления:** войт, бурмистр, президент города (местные налоги), а также староста и маршал воеводства в объёме, определённом законами. Апелляционный орган для них — **Самоуправленческая апелляционная коллегия (SKO)**.

**Административные суды:** WSA (воеводские, первая инстанция, жалобы на решения) и NSA (Высший, кассационные жалобы, унификация практики). Суды — не налоговые органы, они лишь проверяют законность их действий.

## Разъяснения: как спросить о праве
Нормы неясны, поэтому Ordynacja даёт налогоплательщикам инструменты защиты.

| | [[interpretacja-ogolna|Общее разъяснение]] (ст. 14a) | [[interpretacja-indywidualna|Индивидуальное разъяснение]] (ст. 14b) |
|---|---|---|
| Кто выдаёт | министр финансов | директор KIS; по местным налогам — войт, бурмистр, президент, староста, маршал |
| Порядок | по собственной инициативе или по заявлению | только по заявлению |
| Касается | вопроса, который органы применяют неединообразно | конкретного фактического состояния или будущего события заявителя |
| Кто может просить | любой, кроме органа администрации | налогоплательщик, агент, сборщик, а также другие заинтересованные (например, будущий инвестор); возможно совместное заявление |

Кроме того, министр по собственной инициативе издаёт **налоговые пояснения** (практические разъяснения норм).

### Индивидуальное разъяснение по шагам
1. Заявление: исчерпывающее описание фактического состояния или будущего события **и собственная позиция** заявителя.
2. Заявление под угрозой уголовной ответственности, что дело не является предметом текущего производства, проверки и не решено решением.
3. **Сбор 40 зл** за каждое фактическое состояние, уплачиваемый в течение 7 дней с подачи заявления.
4. Выдача без лишнего промедления, **не позднее 3 месяцев** с получения заявления.
5. Разъяснение содержит оценку позиции (с обоснованием, если она отрицательная) и указание на право **жалобы в административный суд**. После анонимизации оно публикуется в BIP (Бюллетене публичной информации).

## Защита, которую даёт разъяснение
> !zapamietaj Следование разъяснению **не может вредить** налогоплательщику, даже если позже оно будет изменено или орган его не учтёт. В этом случае уголовно-фискальное производство не возбуждается и **проценты за просрочку не начисляются**.

> !uwaga Разъяснение защищает только в пределах описанного фактического состояния. Если заявитель что-то упустил или описал не так, как было на самом деле, защиты нет. Оно также не освобождает от уплаты налога, если последствия события наступили до вручения разъяснения.

> !przyklad Компания планирует купить у участника автомобиль и сдавать его дальше в аренду. Она не знает, будут ли расходы на авто налоговыми расходами. Подаёт заявление на индивидуальное разъяснение по **будущему событию**, описывает план и свою позицию, платит 40 зл. Директор KIS признаёт позицию правильной. Если через 3 года орган при проверке будет иного мнения, компания защищена, при условии что сделала ровно то, что описала.`,
          },
          quiz: [
            { q: { pl: "Według czego ustala się właściwość miejscową organu dla osoby fizycznej?", ru: "По какому признаку определяется территориальная компетенция органа для физического лица?" },
              a: [{ pl: "Miejsca zameldowania", ru: "Места прописки" }, { pl: "Miejsca zamieszkania", ru: "Места жительства" }, { pl: "Miejsca urodzenia", ru: "Места рождения" }, { pl: "Miejsca pracy", ru: "Места работы" }],
              correct: 1, why: { pl: "Art. 17 Op: osoby fizyczne według miejsca zamieszkania, a nie zameldowania; osoby prawne według siedziby.", ru: "Ст. 17 Op: физические лица — по месту жительства, а не прописки; юридические лица — по местонахождению." } },
            { q: { pl: "Kto wydaje interpretacje indywidualne w sprawach PIT, CIT i VAT?", ru: "Кто выдаёт индивидуальные разъяснения по PIT, CIT и VAT?" },
              a: [{ pl: "Minister Finansów", ru: "Министр финансов" }, { pl: "Naczelnik urzędu skarbowego", ru: "Начальник налоговой инспекции" }, { pl: "Dyrektor Krajowej Informacji Skarbowej", ru: "Директор Национальной налоговой информации (KIS)" }, { pl: "NSA", ru: "NSA" }],
              correct: 2, why: { pl: "Interpretacje indywidualne wydaje Dyrektor KIS; Minister wydaje interpretacje ogólne.", ru: "Индивидуальные разъяснения выдаёт директор KIS; министр — общие разъяснения." } },
            { q: { pl: "W jakim terminie wydaje się interpretację indywidualną?", ru: "В какой срок выдаётся индивидуальное разъяснение?" },
              a: [{ pl: "Najpóźniej w 3 miesiące od otrzymania wniosku", ru: "Не позднее 3 месяцев с получения заявления" }, { pl: "W 14 dni", ru: "В течение 14 дней" }, { pl: "W 1 rok", ru: "В течение 1 года" }, { pl: "Nie ma terminu", ru: "Срока нет" }],
              correct: 0, why: { pl: "Ordynacja: bez zbędnej zwłoki, nie później niż w 3 miesiące; nie wlicza się m.in. opóźnień z winy strony.", ru: "Ordynacja: без лишнего промедления, не позднее 3 месяцев; не засчитываются, в частности, задержки по вине стороны." } },
            { q: { pl: "Ile wynosi opłata od wniosku o interpretację indywidualną (od jednego stanu faktycznego)?", ru: "Каков сбор за заявление об индивидуальном разъяснении (за одно фактическое состояние)?" },
              a: [{ pl: "17 zł", ru: "17 зл" }, { pl: "100 zł", ru: "100 зл" }, { pl: "Jest bezpłatny", ru: "Бесплатно" }, { pl: "40 zł", ru: "40 зл" }],
              correct: 3, why: { pl: "Opłata wynosi 40 zł od każdego stanu faktycznego lub zdarzenia przyszłego, płatna w 7 dni.", ru: "Сбор — 40 зл за каждое фактическое состояние или будущее событие, уплачивается в течение 7 дней." } },
            { q: { pl: "Jaki jest skutek zastosowania się do interpretacji, która później została zmieniona?", ru: "Каковы последствия следования разъяснению, которое позже было изменено?" },
              a: [{ pl: "Podatnik płaci podwójne odsetki", ru: "Налогоплательщик платит двойные проценты" }, { pl: "Nie może to szkodzić podatnikowi: brak odsetek za zwłokę i postępowania karnego skarbowego", ru: "Это не может вредить налогоплательщику: нет процентов за просрочку и уголовно-фискального производства" }, { pl: "Interpretacja traci moc z mocą wsteczną", ru: "Разъяснение теряет силу задним числом" }, { pl: "Podatnik traci prawo do odwołania", ru: "Налогоплательщик теряет право на обжалование" }],
              correct: 1, why: { pl: "To podstawowa funkcja ochronna interpretacji (art. 14k–14m Op).", ru: "Это основная защитная функция разъяснения (ст. 14k–14m Op)." } },
          ],
        },
        // ------------------------------------------------------------------ 7.2
        {
          id: "7.2",
          title: { pl: "Rodzaje postępowań: podatkowe, sprawdzające, kontrolne", ru: "Виды производств: налоговое, проверочные действия, проверки" },
          src: "Rodzaje postępowań (działy IV–VI Op: postępowanie podatkowe, czynności sprawdzające art. 272–280, kontrola podatkowa art. 281–292); Postępowanie podatkowe (różnice kontrola – postępowanie)",
          body: {
            pl: `Ordynacja podatkowa przewiduje kilka trybów, w których organ sprawdza podatnika. Różnią się **stopniem sformalizowania, celem i uprawnieniami** organu, zwłaszcza w zbieraniu dowodów.

## Trzy tryby z Ordynacji

| | Czynności sprawdzające (dział V) | Kontrola podatkowa (dział VI) | Postępowanie podatkowe (dział IV) |
|---|---|---|---|
| Cel | szybkie sprawdzenie deklaracji i terminów | sprawdzenie, czy kontrolowany wykonuje obowiązki podatkowe | wymiar podatku: wydanie decyzji |
| Formalizm | najmniejszy | średni | największy |
| Dowody | tylko wyjaśnienia i dokumenty | pełne, m.in. świadkowie i biegli | pełne |
| Zakończenie | np. korekta, wezwanie, ewentualnie wszczęcie postępowania | **protokół** | **decyzja** |
| Środek zaskarżenia | sprzeciw (przy korekcie) | zastrzeżenia do protokołu (14 dni) | odwołanie (14 dni) |

## Czynności sprawdzające
[[czynnosci-sprawdzajace|Czynności sprawdzające]] (art. 272–280) mogą podejmować organy I instancji, żeby:
1. sprawdzić **terminowość** składania deklaracji i wpłat (także płatników i inkasentów),
2. stwierdzić **formalną poprawność** dokumentów,
3. ustalić stan faktyczny w zakresie potrzebnym do porównania z dokumentami,
4. zweryfikować wydatki i przychody w zakresie potrzebnym do wykrycia dochodów z nieujawnionych źródeł,
5. zweryfikować dane przy rejestracji podatkowej.

Organ może tu **wyłącznie**: zażądać wyjaśnień albo wezwać do złożenia brakującej deklaracji, wezwać do wyjaśnienia lub uzupełnienia deklaracji budzącej wątpliwości (podając przyczynę), a przy ulgach zażądać okazania dokumentów. Oczywiste omyłki może w określonych granicach poprawić sam. Organ może też żądać dokumentów od kontrahentów podatnika, żeby porównać zapisy.

> !uwaga W czynnościach sprawdzających organ **nie przesłuchuje świadków** i nie powołuje biegłych. Do tego potrzebna jest kontrola albo postępowanie podatkowe.

## Kontrola podatkowa
[[kontrola-podatkowa|Kontrola podatkowa]] (art. 281–292) ma sprawdzić, czy kontrolowany wywiązuje się z obowiązków wynikających z prawa podatkowego (art. 281 § 2). Kontrola to porównanie **stanu rzeczywistego** ze **stanem wzorcowym**: ustala się, jak być powinno, jak jest, porównuje i szuka przyczyn niezgodności.

- Kontrolujący może przeprowadzać dowody, w tym **przesłuchiwać świadków** i **zasięgać opinii biegłych**.
- Kontrola kończy się **protokołem**. Protokół **nie jest decyzją** i nie ustala podatku.
- Kontrolowany może w ciągu **14 dni** od doręczenia protokołu złożyć **zastrzeżenia lub wyjaśnienia** z wnioskami dowodowymi. Kontrolujący rozpatruje je i w ciągu 14 dni informuje o sposobie ich załatwienia.
- W trakcie kontroli **nie można skutecznie skorygować** deklaracji w kontrolowanym zakresie. Po kontroli podatnik może złożyć korektę.
- Jeśli wykryto nieprawidłowości, a podatnik nie złożył korekty, organ **wszczyna postępowanie podatkowe** (materiały: w ciągu 6 miesięcy od zakończenia kontroli).

## Kontrola celno-skarbowa
Obok kontroli z Ordynacji istnieje **kontrola celno-skarbowa**, uregulowana w ustawie o Krajowej Administracji Skarbowej. Prowadzą ją naczelnicy urzędów celno-skarbowych, zwykle w sprawach poważniejszych: dużych podmiotów, podejrzeń oszustw (np. wyłudzeń VAT), akcyzy i ceł. Jest bardziej sformalizowana i daje organom szersze uprawnienia. Może zakończyć się wynikiem kontroli, a następnie wydaniem decyzji.

## Postępowanie podatkowe
[[postepowanie-podatkowe|Postępowanie podatkowe]] to sformalizowany zespół czynności organu i stron, którego celem jest ustalenie istnienia i zakresu zobowiązania, czyli **wymiar podatku**. To odrębny rodzaj postępowania administracyjnego. Kończy się [[decyzja-podatkowa|decyzją]], od której przysługuje odwołanie. Przebieg omawiamy w podtemacie 7.3.

> !przyklad Pan Andrzej (JDG) miał kontrolę za 2022 r. W protokole z 15 marca 2024 r. wykazano m.in. niezaewidencjonowaną sprzedaż i prywatne wydatki w kosztach. Nie złożył zastrzeżeń ani korekty. 10 września 2024 r. naczelnik US wszczął postępowanie podatkowe w zakresie PIT i VAT za 2022 r. Dopiero ono zakończy się decyzją określającą wysokość zobowiązania, od której Pan Andrzej może się odwołać.

> !zapamietaj **Czynności sprawdzające**: szybko, bez świadków. **Kontrola**: pełne dowody, kończy się **protokołem** (zastrzeżenia 14 dni). **Postępowanie**: kończy się **decyzją** (odwołanie 14 dni). Kontrola często poprzedza postępowanie.`,
            ru: `Ordynacja podatkowa предусматривает несколько режимов, в которых орган проверяет налогоплательщика. Они различаются **степенью формализации, целью и полномочиями** органа, особенно в сборе доказательств.

## Три режима из Ordynacja

| | Проверочные действия (раздел V) | Налоговая проверка (раздел VI) | Налоговое производство (раздел IV) |
|---|---|---|---|
| Цель | быстрая проверка деклараций и сроков | проверка выполнения налоговых обязанностей | исчисление налога: вынесение решения |
| Формализм | наименьший | средний | наибольший |
| Доказательства | только пояснения и документы | полные, в том числе свидетели и эксперты | полные |
| Завершение | например, исправление, вызов, возможно возбуждение производства | **протокол** | **решение** |
| Средство обжалования | возражение (при исправлении) | замечания к протоколу (14 дней) | апелляционная жалоба (14 дней) |

## Проверочные действия
[[czynnosci-sprawdzajace|Проверочные действия]] (czynności sprawdzające, ст. 272–280) могут предпринимать органы I инстанции, чтобы:
1. проверить **своевременность** подачи деклараций и платежей (также агентов и сборщиков),
2. установить **формальную правильность** документов,
3. установить фактическое состояние в объёме, нужном для сравнения с документами,
4. проверить расходы и выручку в объёме, нужном для выявления доходов из нераскрытых источников,
5. проверить данные при налоговой регистрации.

Орган может здесь **только**: потребовать пояснений или вызвать для подачи недостающей декларации, вызвать для пояснения или дополнения сомнительной декларации (указав причину), а при льготах — потребовать предъявить документы. Очевидные ошибки он в определённых пределах может исправить сам. Орган может также запрашивать документы у контрагентов налогоплательщика, чтобы сопоставить записи.

> !uwaga В рамках проверочных действий орган **не допрашивает свидетелей** и не привлекает экспертов. Для этого нужна проверка или налоговое производство.

## Налоговая проверка
[[kontrola-podatkowa|Налоговая проверка]] (kontrola podatkowa, ст. 281–292) должна проверить, выполняет ли проверяемый обязанности по налоговому праву (ст. 281 § 2). Проверка — сравнение **фактического состояния** с **эталонным**: устанавливают, как должно быть, как есть, сравнивают и ищут причины расхождений.

- Проверяющий может собирать доказательства, в том числе **допрашивать свидетелей** и **получать заключения экспертов**.
- Проверка заканчивается **протоколом**. Протокол **не является решением** и не устанавливает налог.
- Проверяемый может в течение **14 дней** после вручения протокола подать **замечания или пояснения** с ходатайствами о доказательствах. Проверяющий рассматривает их и в течение 14 дней сообщает о результате.
- Во время проверки **нельзя эффективно скорректировать** декларацию в проверяемой части. После проверки налогоплательщик может подать корректировку.
- Если выявлены нарушения, а налогоплательщик не подал корректировку, орган **возбуждает налоговое производство** (по материалам — в течение 6 месяцев после окончания проверки).

## Таможенно-налоговый контроль
Наряду с проверкой по Ordynacja существует **таможенно-налоговый контроль** (kontrola celno-skarbowa), урегулированный законом о Национальной налоговой администрации. Его проводят начальники таможенно-налоговых служб, обычно по более серьёзным делам: крупные субъекты, подозрение мошенничества (например, незаконного возмещения VAT), акциз и пошлины. Он более формализован и даёт органам более широкие полномочия. Может завершиться результатом контроля, а затем вынесением решения.

## Налоговое производство
[[postepowanie-podatkowe|Налоговое производство]] — формализованная совокупность действий органа и сторон, цель которой — установить наличие и объём обязательства, то есть **исчисление налога**. Это особый вид административного производства. Оно заканчивается [[decyzja-podatkowa|решением]], на которое можно подать апелляционную жалобу. Ход производства разберём в подразделе 7.3.

> !przyklad У пана Анджея (JDG) была проверка за 2022 г. В протоколе от 15 марта 2024 г. выявлены, в частности, неучтённые продажи и личные расходы в затратах. Он не подал ни замечаний, ни корректировки. 10 сентября 2024 г. начальник налоговой инспекции возбудил налоговое производство по PIT и VAT за 2022 г. Только оно закончится решением, определяющим размер обязательства, которое пан Анджей может обжаловать.

> !zapamietaj **Проверочные действия**: быстро, без свидетелей. **Проверка**: полные доказательства, заканчивается **протоколом** (замечания 14 дней). **Производство**: заканчивается **решением** (жалоба 14 дней). Проверка часто предшествует производству.`,
          },
          quiz: [
            { q: { pl: "Czym kończy się kontrola podatkowa?", ru: "Чем заканчивается налоговая проверка?" },
              a: [{ pl: "Decyzją wymiarową", ru: "Решением об исчислении налога" }, { pl: "Wyrokiem WSA", ru: "Приговором WSA" }, { pl: "Protokołem kontroli", ru: "Протоколом проверки" }, { pl: "Interpretacją indywidualną", ru: "Индивидуальным разъяснением" }],
              correct: 2, why: { pl: "Protokół nie jest decyzją ani formą wymiaru. Decyzję wydaje się dopiero w postępowaniu podatkowym.", ru: "Протокол — не решение и не форма исчисления. Решение выносится только в налоговом производстве." } },
            { q: { pl: "Czy w ramach czynności sprawdzających organ może przesłuchać świadka?", ru: "Может ли орган в рамках проверочных действий допросить свидетеля?" },
              a: [{ pl: "Tak, zawsze", ru: "Да, всегда" }, { pl: "Nie, może tylko żądać wyjaśnień i dokumentów", ru: "Нет, он может только требовать пояснений и документов" }, { pl: "Tak, jeśli świadek się zgodzi", ru: "Да, если свидетель согласится" }, { pl: "Tylko w VAT", ru: "Только по VAT" }],
              correct: 1, why: { pl: "Czynności sprawdzające są odformalizowane; przesłuchania świadków i opinie biegłych są możliwe w kontroli i postępowaniu.", ru: "Проверочные действия неформализованы; допросы свидетелей и экспертизы возможны при проверке и в производстве." } },
            { q: { pl: "W jakim terminie kontrolowany może złożyć zastrzeżenia do protokołu kontroli?", ru: "В какой срок проверяемый может подать замечания к протоколу проверки?" },
              a: [{ pl: "14 dni od doręczenia protokołu", ru: "14 дней с момента вручения протокола" }, { pl: "7 dni", ru: "7 дней" }, { pl: "30 dni", ru: "30 дней" }, { pl: "6 miesięcy", ru: "6 месяцев" }],
              correct: 0, why: { pl: "Art. 291 Op: 14 dni na zastrzeżenia lub wyjaśnienia; kontrolujący ma 14 dni na odpowiedź.", ru: "Ст. 291 Op: 14 дней на замечания или пояснения; у проверяющего 14 дней на ответ." } },
            { q: { pl: "Co się dzieje, jeśli kontrola wykazała nieprawidłowości, a podatnik nie złożył korekty?", ru: "Что происходит, если проверка выявила нарушения, а налогоплательщик не подал корректировку?" },
              a: [{ pl: "Nic, protokół wystarcza", ru: "Ничего, протокола достаточно" }, { pl: "Sprawa trafia od razu do NSA", ru: "Дело сразу идёт в NSA" }, { pl: "Organ wydaje interpretację", ru: "Орган выдаёт разъяснение" }, { pl: "Organ wszczyna postępowanie podatkowe i wydaje decyzję", ru: "Орган возбуждает налоговое производство и выносит решение" }],
              correct: 3, why: { pl: "Kontrola dostarcza dowodów, ale wymiar podatku wymaga decyzji w postępowaniu podatkowym.", ru: "Проверка даёт доказательства, но исчисление налога требует решения в налоговом производстве." } },
            { q: { pl: "Kto prowadzi kontrolę celno-skarbową?", ru: "Кто проводит таможенно-налоговый контроль?" },
              a: [{ pl: "Wójt", ru: "Войт" }, { pl: "Naczelnik urzędu celno-skarbowego", ru: "Начальник таможенно-налоговой службы" }, { pl: "Dyrektor KIS", ru: "Директор KIS" }, { pl: "SKO", ru: "SKO" }],
              correct: 1, why: { pl: "Kontrolę celno-skarbową regulowaną ustawą o KAS prowadzą naczelnicy urzędów celno-skarbowych.", ru: "Таможенно-налоговый контроль по закону о KAS проводят начальники таможенно-налоговых служб." } },
          ],
        },
        // ------------------------------------------------------------------ 7.3
        {
          id: "7.3",
          title: { pl: "Przebieg postępowania, terminy i odwołania", ru: "Ход производства, сроки и обжалование" },
          src: "Rodzaje postępowań (zasady art. 118–129, strony, terminy, decyzje i postanowienia); Postępowanie podatkowe (wszczęcie, dowody, doręczenia, zawieszenie, umorzenie, środki zaskarżenia); Ordynacja podatkowa",
          body: {
            pl: `[[postepowanie-podatkowe|Postępowanie podatkowe]] ma jasno określone zasady, etapy i terminy. Kto je zna, potrafi bronić swoich praw.

## Zasady ogólne postępowania
1. **Praworządność** (art. 120): organ działa na podstawie przepisów prawa.
2. **Zaufanie do organów** (art. 121 § 1) i **udzielanie informacji** stronie (art. 121 § 2).
3. **Prawda obiektywna** (art. 122): organ wyjaśnia sprawę dokładnie, także na korzyść podatnika.
4. **Czynny udział strony** w każdym stadium (art. 123).
5. **Przekonywanie** (art. 124): organ wyjaśnia, dlaczego rozstrzyga tak, a nie inaczej.
6. **Szybkość i prostota** (art. 125).
7. **Pisemność** (art. 126).
8. **Dwuinstancyjność** (art. 127).
9. **Trwałość decyzji ostatecznych** (art. 128).
10. **Jawność** wyłącznie dla stron (art. 129).

## Strony i pełnomocnik
Stroną jest podatnik, płatnik, inkasent, ich następca prawny, a także osoba trzecia mająca interes prawny. Strona może działać osobiście albo przez **pełnomocnika** (np. doradcę podatkowego). Jeśli ustanowiono pełnomocnika, pisma doręcza się **pełnomocnikowi** (art. 145 § 2).

## Etapy
1. **Wszczęcie**: z urzędu (postanowienie doręczane stronie, np. po kontroli) albo na żądanie strony (np. wniosek o stwierdzenie nadpłaty).
2. **Postępowanie dowodowe**: dowodem jest wszystko, co może przyczynić się do wyjaśnienia sprawy, a nie jest sprzeczne z prawem (art. 180, otwarty katalog dowodów): dokumenty, zeznania świadków, opinie biegłych, oględziny. Strona musi być zawiadomiona o przesłuchaniu świadka co najmniej **7 dni** wcześniej (art. 190).
3. **Wypowiedzenie się strony**: przed wydaniem decyzji organ wyznacza **7 dni** na wypowiedzenie się w sprawie zebranego materiału (art. 200).
4. **Decyzja** organu I instancji.
5. **Postępowanie odwoławcze**.

## Terminy załatwienia sprawy

| Organ | Termin |
|---|---|
| I instancji | bez zbędnej zwłoki, nie później niż w **1 miesiąc**; sprawa skomplikowana — **2 miesiące** |
| odwoławczy | **2 miesiące**; gdy przeprowadza się rozprawę — **3 miesiące** |

Jeśli organ nie zdąży, musi zawiadomić stronę o przyczynie i nowym terminie. Na przewlekłość przysługuje środek prawny (ponaglenie).

## Decyzja i postanowienie
- [[decyzja-podatkowa|Decyzja]] rozstrzyga sprawę co do istoty (np. określa zobowiązanie, stwierdza nadpłatę, odracza termin płatności). Zawiera m.in. oznaczenie organu i strony, podstawę prawną, rozstrzygnięcie, uzasadnienie faktyczne i prawne, pouczenie o odwołaniu i podpis.
- **Postanowienie** dotyczy kwestii proceduralnych w toku sprawy (np. wszczęcie, zawieszenie, odmowa wszczęcia).

| Decyzja | Kiedy powstaje zobowiązanie |
|---|---|
| **ustalająca** | z dniem doręczenia decyzji (np. podatek od nieruchomości osób fizycznych, od spadków i darowizn) |
| **określająca** | z mocy prawa, z chwilą zdarzenia; decyzja tylko określa prawidłową wysokość (np. gdy deklaracja PIT była błędna) |

## Doręczenia
Termin liczy się od dnia **doręczenia**, nie wydania pisma. Jeśli adresat nie odbierze listu mimo awizo, pismo uważa się za doręczone po upływie **14 dni** (tzw. fikcja doręczenia). Doręczenia elektroniczne też mają swoje zasady. Gdy strona uchybiła terminowi bez swojej winy, może w ciągu **7 dni** od ustania przyczyny złożyć wniosek o **przywrócenie terminu**.

## Środki zaskarżenia

| Środek | Na co | Termin | Do kogo |
|---|---|---|---|
| **Odwołanie** | decyzja I instancji | **14 dni** od doręczenia | dyrektor IAS albo SKO, za pośrednictwem organu, który wydał decyzję |
| **Zażalenie** | postanowienie (gdy przysługuje) | **7 dni** | organ II instancji |
| **Skarga** | decyzja organu II instancji | **30 dni** od doręczenia | WSA |
| **Skarga kasacyjna** | wyrok WSA | **30 dni** od doręczenia wyroku z uzasadnieniem | NSA |

Organ odwoławczy może utrzymać decyzję w mocy, uchylić ją i orzec co do istoty albo przekazać sprawę do ponownego rozpatrzenia. Od decyzji ostatecznych przysługują **nadzwyczajne tryby**: wznowienie postępowania (np. fałszywe dowody, nowe okoliczności), stwierdzenie nieważności, uchylenie lub zmiana decyzji.

## Zawieszenie i umorzenie
- **Zawieszenie**: przeszkoda przejściowa (np. śmierć strony do czasu ustalenia spadkobierców, czekanie na wynik innego postępowania). Po ustaniu przyczyny postępowanie się podejmuje.
- **Umorzenie**: postępowanie stało się bezprzedmiotowe (np. zobowiązanie się przedawniło, strona wycofała wniosek). Na postanowienie o umorzeniu przysługuje zażalenie.

> !przyklad Decyzję doręczono 3 marca. Termin na odwołanie mija 17 marca. Jeśli 17 marca to sobota, termin przesuwa się na najbliższy dzień roboczy. Odwołanie składa się do organu, który wydał decyzję, a ten przekazuje je dyrektorowi IAS.

> !zapamietaj Odwołanie **14 dni**, zażalenie **7 dni**, skarga do WSA i kasacja do NSA po **30 dni**. Przed decyzją strona ma **7 dni** na wypowiedzenie się. Awizo: doręczenie po **14 dniach**.`,
            ru: `[[postepowanie-podatkowe|Налоговое производство]] имеет чётко определённые принципы, этапы и сроки. Кто их знает, умеет защищать свои права.

## Общие принципы производства
1. **Законность** (ст. 120): орган действует на основании норм права.
2. **Доверие к органам** (ст. 121 § 1) и **информирование** стороны (ст. 121 § 2).
3. **Объективная истина** (ст. 122): орган тщательно выясняет дело, в том числе в пользу налогоплательщика.
4. **Активное участие стороны** на каждой стадии (ст. 123).
5. **Убеждение** (ст. 124): орган объясняет, почему решает так, а не иначе.
6. **Быстрота и простота** (ст. 125).
7. **Письменность** (ст. 126).
8. **Двухинстанционность** (ст. 127).
9. **Стабильность окончательных решений** (ст. 128).
10. **Гласность** только для сторон (ст. 129).

## Стороны и представитель
Сторона — налогоплательщик, агент, сборщик, их правопреемник, а также третье лицо с правовым интересом. Сторона может действовать лично или через **представителя** (например, налогового консультанта). Если назначен представитель, документы вручаются **представителю** (ст. 145 § 2).

## Этапы
1. **Возбуждение**: по собственной инициативе (постановление вручается стороне, например после проверки) или по требованию стороны (например, заявление о подтверждении переплаты).
2. **Сбор доказательств**: доказательством является всё, что может способствовать выяснению дела и не противоречит закону (ст. 180, открытый перечень доказательств): документы, показания свидетелей, заключения экспертов, осмотр. Сторону нужно уведомить о допросе свидетеля не менее чем за **7 дней** (ст. 190).
3. **Высказывание стороны**: перед решением орган назначает **7 дней** на высказывание по собранным материалам (ст. 200).
4. **Решение** органа I инстанции.
5. **Апелляционное производство**.

## Сроки рассмотрения дела

| Орган | Срок |
|---|---|
| I инстанции | без лишнего промедления, не позднее **1 месяца**; сложное дело — **2 месяца** |
| апелляционный | **2 месяца**; при проведении слушания — **3 месяца** |

Если орган не успевает, он обязан сообщить стороне причину и новый срок. На затягивание есть средство защиты (ponaglenie — понуждение).

## Решение и постановление
- [[decyzja-podatkowa|Решение]] (decyzja) разрешает дело по существу (например, определяет обязательство, подтверждает переплату, отсрочивает платёж). Оно содержит, в частности, обозначение органа и стороны, правовое основание, резолютивную часть, фактическое и правовое обоснование, указание на право обжалования и подпись.
- **Постановление** (postanowienie) касается процессуальных вопросов по ходу дела (например, возбуждение, приостановление, отказ в возбуждении).

| Решение | Когда возникает обязательство |
|---|---|
| **устанавливающее** (ustalająca) | со дня вручения решения (например, налог на недвижимость физических лиц, на наследство и дарение) |
| **определяющее** (określająca) | в силу закона, в момент события; решение лишь определяет правильный размер (например, если декларация PIT была ошибочной) |

## Вручение
Срок считается со дня **вручения**, а не вынесения документа. Если адресат не забрал письмо несмотря на извещение, документ считается вручённым по истечении **14 дней** (так называемая фикция вручения). У электронного вручения свои правила. Если сторона пропустила срок не по своей вине, она может в течение **7 дней** после устранения причины подать ходатайство о **восстановлении срока**.

## Средства обжалования

| Средство | На что | Срок | Куда |
|---|---|---|---|
| **Апелляционная жалоба** (odwołanie) | решение I инстанции | **14 дней** с вручения | директору IAS или в SKO, через орган, вынесший решение |
| **Частная жалоба** (zażalenie) | постановление (если предусмотрено) | **7 дней** | органу II инстанции |
| **Жалоба** (skarga) | решение органа II инстанции | **30 дней** с вручения | в WSA |
| **Кассационная жалоба** | приговор WSA | **30 дней** с вручения приговора с обоснованием | в NSA |

Апелляционный орган может оставить решение в силе, отменить его и решить дело по существу или направить дело на новое рассмотрение. На окончательные решения есть **чрезвычайные процедуры**: возобновление производства (например, ложные доказательства, новые обстоятельства), признание недействительным, отмена или изменение решения.

## Приостановление и прекращение
- **Приостановление**: временное препятствие (например, смерть стороны до установления наследников, ожидание результата другого производства). После устранения причины производство возобновляют.
- **Прекращение** (umorzenie): производство стало беспредметным (например, обязательство погашено давностью, сторона отозвала заявление). На постановление о прекращении можно подать частную жалобу.

> !przyklad Решение вручено 3 марта. Срок на обжалование истекает 17 марта. Если 17 марта — суббота, срок переносится на ближайший рабочий день. Жалоба подаётся в орган, вынесший решение, а он передаёт её директору IAS.

> !zapamietaj Апелляционная жалоба — **14 дней**, частная — **7 дней**, жалоба в WSA и кассация в NSA — по **30 дней**. Перед решением у стороны **7 дней** на высказывание. Извещение: вручение по истечении **14 дней**.`,
          },
          quiz: [
            { q: { pl: "W jakim terminie składa się odwołanie od decyzji organu I instancji?", ru: "В какой срок подаётся апелляционная жалоба на решение органа I инстанции?" },
              a: [{ pl: "7 dni od wydania", ru: "7 дней с вынесения" }, { pl: "30 dni od doręczenia", ru: "30 дней с вручения" }, { pl: "14 dni od doręczenia", ru: "14 дней с вручения" }, { pl: "3 miesiące", ru: "3 месяца" }],
              correct: 2, why: { pl: "Odwołanie: 14 dni od doręczenia decyzji, za pośrednictwem organu, który ją wydał.", ru: "Апелляционная жалоба: 14 дней с вручения решения, через орган, который его вынес." } },
            { q: { pl: "Ile czasu ma strona na wypowiedzenie się w sprawie zebranego materiału przed wydaniem decyzji?", ru: "Сколько времени у стороны на высказывание по собранным материалам перед решением?" },
              a: [{ pl: "7 dni (art. 200 Op)", ru: "7 дней (ст. 200 Op)" }, { pl: "14 dni", ru: "14 дней" }, { pl: "1 dzień", ru: "1 день" }, { pl: "Nie ma takiego prawa", ru: "Такого права нет" }],
              correct: 0, why: { pl: "To element zasady czynnego udziału strony; pominięcie tego etapu jest poważnym naruszeniem procedury.", ru: "Это элемент принципа активного участия стороны; пропуск этого этапа — серьёзное процессуальное нарушение." } },
            { q: { pl: "Kiedy pismo nieodebrane mimo awizo uważa się za doręczone?", ru: "Когда письмо, не полученное несмотря на извещение, считается вручённым?" },
              a: [{ pl: "Nigdy", ru: "Никогда" }, { pl: "Po 3 dniach", ru: "Через 3 дня" }, { pl: "Po roku", ru: "Через год" }, { pl: "Po upływie 14 dni", ru: "По истечении 14 дней" }],
              correct: 3, why: { pl: "Działa fikcja doręczenia; od tego dnia biegną terminy, np. na odwołanie.", ru: "Действует фикция вручения; с этого дня текут сроки, например на обжалование." } },
            { q: { pl: "Decyzja określająca różni się od ustalającej tym, że:", ru: "Определяющее решение отличается от устанавливающего тем, что:" },
              a: [{ pl: "zobowiązanie powstaje dopiero z jej doręczeniem", ru: "обязательство возникает только с его вручением" }, { pl: "zobowiązanie powstało z mocy prawa, a decyzja tylko określa jego prawidłową wysokość", ru: "обязательство возникло в силу закона, а решение лишь определяет его правильный размер" }, { pl: "nie można się od niej odwołać", ru: "его нельзя обжаловать" }, { pl: "wydaje ją sąd", ru: "его выносит суд" }],
              correct: 1, why: { pl: "Przy decyzji ustalającej zobowiązanie powstaje z doręczeniem; przy określającej — wcześniej, z mocy prawa.", ru: "При устанавливающем решении обязательство возникает с вручением; при определяющем — раньше, в силу закона." } },
            { q: { pl: "W jakim terminie organ I instancji powinien załatwić sprawę skomplikowaną?", ru: "В какой срок орган I инстанции должен рассмотреть сложное дело?" },
              a: [{ pl: "2 tygodnie", ru: "2 недели" }, { pl: "2 miesiące", ru: "2 месяца" }, { pl: "1 rok", ru: "1 год" }, { pl: "5 lat", ru: "5 лет" }],
              correct: 1, why: { pl: "Art. 139 Op: miesiąc, a w sprawie skomplikowanej 2 miesiące; organ odwoławczy 2 miesiące (3 przy rozprawie).", ru: "Ст. 139 Op: месяц, а по сложному делу 2 месяца; апелляционный орган — 2 месяца (3 при слушании)." } },
          ],
        },
        // ------------------------------------------------------------------ 7.4
        {
          id: "7.4",
          title: { pl: "Kazusy: czynności sprawdzające, kontrola i postępowanie", ru: "Казусы: проверочные действия, проверка и производство" },
          src: "Kazusy postępowanie podatkowe, kontrola, czynności (kazusy 1–4, 6–8, 10; art. 274, 81b, 284, 145, 190, 200, 70 Op); rozwiązania opracowane samodzielnie",
          body: {
            pl: `Przy kazusach z procedury zadajemy zawsze trzy pytania: **w jakim trybie działa organ** (czynności sprawdzające, kontrola, postępowanie), **jakie ma w nim uprawnienia** i **czy dochował gwarancji strony**.

## Kazus 1: korekta oczywistej omyłki
Pan Jan w PIT-37 zamiast odliczyć 1 000 zł wpisał 10 000 zł (błąd przy przenoszeniu kwoty z załącznika). Urząd sam poprawił zeznanie i przysłał mu kopię korekty z informacją o prawie do sprzeciwu.

1. Tryb: **czynności sprawdzające**.
2. Organ może sam skorygować deklarację, gdy chodzi o **oczywiste omyłki pisarskie lub rachunkowe** i korekta nie przekracza limitu ustawowego (materiały: 5 000 zł; tu korekta podatku jest mniejsza).
3. Podatnik może w ciągu **14 dni** wnieść **sprzeciw**; wtedy korekta traci moc.
4. **Wniosek:** organ postąpił prawidłowo.

## Kazus 2: świadek w czynnościach sprawdzających
Przy weryfikacji zwrotu VAT urzędnik wezwał kontrahenta na formalne przesłuchanie w charakterze świadka i pouczył o odpowiedzialności karnej.

1. Tryb: **czynności sprawdzające**, procedura odformalizowana.
2. Organ może tu tylko żądać dokumentów i wyjaśnień (może też zażądać dokumentów od kontrahenta, żeby porównać zapisy).
3. **Przesłuchanie świadka** jest możliwe dopiero w kontroli podatkowej albo w postępowaniu podatkowym.
4. **Wniosek:** organ przekroczył uprawnienia; jeśli potrzebuje zeznań, musi wszcząć kontrolę lub postępowanie.

## Kazus 3: korekta w trakcie kontroli
5 maja wszczęto w spółce X kontrolę CIT za poprzedni rok. 10 maja księgowa złożyła korektę CIT za ten rok i dopłaciła podatek.

1. W trakcie kontroli prawo do korekty deklaracji w **zakresie objętym kontrolą jest zawieszone** (art. 81b § 1 pkt 1).
2. Korekta złożona w tym czasie **nie wywołuje skutków prawnych**.
3. Spółka może złożyć korektę **po zakończeniu kontroli** (np. po otrzymaniu protokołu).
4. Dopłata nie jest stracona: zostanie zaliczona zgodnie z przepisami, ale sama korekta jest bezskuteczna.

## Kazus 4: kontrola pod nieobecność przedsiębiorcy
Kontrolerzy przyszli do firmy pana Adama (JDG). Jego nie było, był pracownik sekretariatu. Kontrolerzy okazali legitymacje i upoważnienie pracownikowi i zaczęli przeglądać dokumenty w szafach.

1. Kontrolę wszczyna się przez **doręczenie upoważnienia kontrolowanemu** albo osobie przez niego **upoważnionej** do reprezentowania (art. 284 Op), i co do zasady po wcześniejszym zawiadomieniu o zamiarze kontroli.
2. Pracownik sekretariatu bez pisemnego upoważnienia nie jest taką osobą.
3. Wyjątki (art. 284a), np. podejrzenie przestępstwa, pozwalają działać pod nieobecność kontrolowanego, ale z udziałem przywołanego świadka.
4. **Wniosek:** zwykle wszczęcie było **nieprawidłowe**; ustalenia dokonane w ten sposób można podważać.

## Kazus 5: pominięcie pełnomocnika
Pani Ewa ustanowiła doradcę podatkowego jako pełnomocnika ogólnego. Organ wysłał decyzję bezpośrednio do niej, z pominięciem pełnomocnika.

1. Art. 145 § 2: jeśli jest pełnomocnik, pisma doręcza się **pełnomocnikowi**.
2. Doręczenie samej stronie jest **bezskuteczne**: decyzja nie weszła do obrotu prawnego, a termin na odwołanie nie biegnie.
3. Termin zacznie biec dopiero od doręczenia pełnomocnikowi.

## Kazus 6: świadek przesłuchany bez wiedzy strony
Organ przesłuchał kluczowego świadka, nie zawiadamiając podatnika, i oparł na tym niekorzystną decyzję.

1. Naruszono zasadę **czynnego udziału strony**.
2. Art. 190 Op: strona musi być zawiadomiona o miejscu i terminie przesłuchania co najmniej **7 dni** wcześniej i ma prawo zadawać pytania.
3. Dowód przeprowadzony z naruszeniem tego prawa nie może być podstawą rozstrzygnięcia niekorzystnego dla strony.
4. **Wniosek:** decyzję można skutecznie zaskarżyć odwołaniem.

## Kazus 7: decyzja bez 7 dni na wypowiedzenie się
Organ zebrał materiał w sprawie spółki ABC i od razu wydał decyzję, bo do przedawnienia zostały 2 dni.

1. Art. 200 § 1: przed decyzją organ musi wyznaczyć stronie **7 dni** na wypowiedzenie się co do zebranych dowodów.
2. Pośpiech przed przedawnieniem nie usprawiedliwia pominięcia tego etapu.
3. **Wniosek:** poważne naruszenie procedury, które może prowadzić do uchylenia decyzji przez organ odwoławczy lub sąd.

## Kazus 8: instrumentalne wszczęcie postępowania karnego skarbowego
Zobowiązanie pana Krzysztofa przedawniało się 31 grudnia. 20 grudnia organ wszczął postępowanie karne skarbowe i zawiadomił o tym podatnika.

1. Art. 70 § 6 pkt 1: bieg [[przedawnienie|przedawnienia]] zawiesza się z dniem wszczęcia postępowania w sprawie o przestępstwo skarbowe, jeśli podatnik został o tym zawiadomiony.
2. Formalnie przedawnienie zostało więc zawieszone.
3. Ale sądy administracyjne (uchwała NSA I FPS 1/21) badają, czy wszczęcie nie było **instrumentalne**, czyli dokonane tylko po to, żeby zatrzymać przedawnienie.
4. **Wniosek:** jeśli sąd uzna wszczęcie za pozorne, zawieszenie nie działa i zobowiązanie się przedawnia.

> !przyklad Praktyczna lekcja z kazusów 5 i 6: podatnik, który ma pełnomocnika i zna art. 190 i 200, może skutecznie podważyć decyzję nawet wtedy, gdy co do meritum organ miał rację. Procedura jest gwarancją, a nie formalnością.

> !zapamietaj Najczęstsze błędy organów w kazusach: **przekroczenie trybu** (świadek w czynnościach sprawdzających), **wadliwe wszczęcie kontroli**, **pominięcie pełnomocnika**, **naruszenie czynnego udziału** (art. 190, art. 200) i **instrumentalne** działania wobec przedawnienia.`,
            ru: `В процессуальных казусах всегда задаём три вопроса: **в каком режиме действует орган** (проверочные действия, проверка, производство), **какие у него в нём полномочия** и **соблюдены ли гарантии стороны**.

## Казус 1: исправление очевидной ошибки
Пан Ян в декларации PIT-37 вместо вычета 1 000 зл вписал 10 000 зл (ошибка при переносе суммы из приложения). Налоговая сама исправила декларацию и прислала ему копию исправления с информацией о праве на возражение.

1. Режим: **проверочные действия**.
2. Орган может сам исправить декларацию, если речь идёт об **очевидных описках или арифметических ошибках** и исправление не превышает законодательного лимита (по материалам — 5 000 зл; здесь корректировка налога меньше).
3. Налогоплательщик может в течение **14 дней** подать **возражение**; тогда исправление теряет силу.
4. **Вывод:** орган поступил правильно.

## Казус 2: свидетель при проверочных действиях
При проверке возврата VAT чиновник вызвал контрагента на формальный допрос в качестве свидетеля и предупредил об уголовной ответственности.

1. Режим: **проверочные действия**, неформализованная процедура.
2. Здесь орган может лишь требовать документы и пояснения (может также запросить документы у контрагента, чтобы сопоставить записи).
3. **Допрос свидетеля** возможен только в налоговой проверке или налоговом производстве.
4. **Вывод:** орган превысил полномочия; если ему нужны показания, он должен начать проверку или производство.

## Казус 3: корректировка во время проверки
5 мая в компании X началась проверка CIT за прошлый год. 10 мая бухгалтер подала корректировку CIT за этот год и доплатила налог.

1. Во время проверки право на корректировку декларации **в проверяемой части приостановлено** (ст. 81b § 1 п. 1).
2. Корректировка, поданная в это время, **не имеет правовых последствий**.
3. Компания может подать корректировку **после окончания проверки** (например, после получения протокола).
4. Доплата не пропадает: она будет зачтена по правилам, но сама корректировка неэффективна.

## Казус 4: проверка в отсутствие предпринимателя
Проверяющие пришли в фирму пана Адама (JDG). Его не было, был сотрудник секретариата. Проверяющие предъявили удостоверения и полномочие сотруднику и начали просматривать документы в шкафах.

1. Проверка начинается с **вручения полномочия проверяемому** или **уполномоченному** им представителю (ст. 284 Op), и, как правило, после предварительного уведомления о намерении проверки.
2. Сотрудник секретариата без письменной доверенности таким лицом не является.
3. Исключения (ст. 284a), например подозрение преступления, позволяют действовать в отсутствие проверяемого, но с участием приглашённого свидетеля.
4. **Вывод:** обычно начало проверки было **неправильным**; полученные так данные можно оспаривать.

## Казус 5: представителя обошли
Пани Эва назначила налогового консультанта общим представителем. Орган отправил решение прямо ей, минуя представителя.

1. Ст. 145 § 2: если есть представитель, документы вручаются **представителю**.
2. Вручение самой стороне **неэффективно**: решение не вступило в правовой оборот, срок на обжалование не течёт.
3. Срок начнёт течь только с вручения представителю.

## Казус 6: свидетель допрошен без ведома стороны
Орган допросил ключевого свидетеля, не уведомив налогоплательщика, и положил это в основу неблагоприятного решения.

1. Нарушен принцип **активного участия стороны**.
2. Ст. 190 Op: сторону нужно уведомить о месте и времени допроса не менее чем за **7 дней**, и она вправе задавать вопросы.
3. Доказательство, полученное с нарушением этого права, не может быть основой неблагоприятного для стороны решения.
4. **Вывод:** решение можно успешно обжаловать.

## Казус 7: решение без 7 дней на высказывание
Орган собрал материалы по делу компании ABC и сразу вынес решение, так как до истечения давности оставалось 2 дня.

1. Ст. 200 § 1: перед решением орган обязан назначить стороне **7 дней** на высказывание по собранным доказательствам.
2. Спешка перед истечением давности не оправдывает пропуск этого этапа.
3. **Вывод:** серьёзное процессуальное нарушение, которое может привести к отмене решения апелляционным органом или судом.

## Казус 8: инструментальное возбуждение уголовно-фискального дела
Обязательство пана Кшиштофа погашалось давностью 31 декабря. 20 декабря орган возбудил уголовно-фискальное дело и уведомил об этом налогоплательщика.

1. Ст. 70 § 6 п. 1: течение [[przedawnienie|давности]] приостанавливается со дня возбуждения дела о фискальном преступлении, если налогоплательщик об этом уведомлён.
2. Формально давность была приостановлена.
3. Но административные суды (постановление NSA I FPS 1/21) проверяют, не было ли возбуждение **инструментальным**, то есть сделанным только ради остановки давности.
4. **Вывод:** если суд признает возбуждение мнимым, приостановление не действует, и обязательство погашается давностью.

> !przyklad Практический урок казусов 5 и 6: налогоплательщик, у которого есть представитель и который знает ст. 190 и 200, может успешно оспорить решение, даже если по существу орган был прав. Процедура — гарантия, а не формальность.

> !zapamietaj Типичные ошибки органов в казусах: **выход за рамки режима** (свидетель при проверочных действиях), **неправильное начало проверки**, **игнорирование представителя**, **нарушение активного участия** (ст. 190, ст. 200) и **инструментальные** действия в отношении давности.`,
          },
          quiz: [
            { q: { pl: "Spółka złożyła korektę deklaracji CIT w trakcie kontroli tego rozliczenia. Jaki jest skutek?", ru: "Компания подала корректировку CIT во время проверки этого расчёта. Каковы последствия?" },
              a: [{ pl: "Korekta jest skuteczna i kończy kontrolę", ru: "Корректировка эффективна и завершает проверку" }, { pl: "Korekta jest bezskuteczna, bo prawo do korekty jest zawieszone na czas kontroli", ru: "Корректировка неэффективна, так как право на неё приостановлено на время проверки" }, { pl: "Kontrolujący musi ją przyjąć jako protokół", ru: "Проверяющий должен принять её как протокол" }, { pl: "Spółka traci prawo do odwołania", ru: "Компания теряет право на обжалование" }],
              correct: 1, why: { pl: "Art. 81b § 1 pkt 1 Op: uprawnienie do korekty ulega zawieszeniu w zakresie objętym kontrolą.", ru: "Ст. 81b § 1 п. 1 Op: право на корректировку приостанавливается в проверяемой части." } },
            { q: { pl: "Organ wysłał decyzję stronie, pomijając jej pełnomocnika. Czy doręczenie jest skuteczne?", ru: "Орган отправил решение стороне, минуя её представителя. Эффективно ли вручение?" },
              a: [{ pl: "Tak, bo strona odebrała list", ru: "Да, так как сторона получила письмо" }, { pl: "Tak, po 14 dniach", ru: "Да, через 14 дней" }, { pl: "Tylko przy podatkach lokalnych", ru: "Только по местным налогам" }, { pl: "Nie, pisma doręcza się pełnomocnikowi (art. 145 § 2)", ru: "Нет, документы вручаются представителю (ст. 145 § 2)" }],
              correct: 3, why: { pl: "Doręczenie z pominięciem pełnomocnika jest bezskuteczne; termin na odwołanie nie biegnie.", ru: "Вручение в обход представителя неэффективно; срок на обжалование не течёт." } },
            { q: { pl: "Na ile dni przed przesłuchaniem świadka trzeba zawiadomić stronę?", ru: "За сколько дней до допроса свидетеля нужно уведомить сторону?" },
              a: [{ pl: "Co najmniej 7 dni", ru: "Не менее 7 дней" }, { pl: "1 dzień", ru: "1 день" }, { pl: "30 dni", ru: "30 дней" }, { pl: "Nie trzeba zawiadamiać", ru: "Уведомлять не нужно" }],
              correct: 0, why: { pl: "Art. 190 Op chroni czynny udział strony: zawiadomienie co najmniej 7 dni przed terminem.", ru: "Ст. 190 Op защищает активное участие стороны: уведомление не менее чем за 7 дней." } },
            { q: { pl: "Kiedy organ może sam skorygować oczywistą omyłkę w deklaracji w ramach czynności sprawdzających?", ru: "Когда орган может сам исправить очевидную ошибку в декларации в рамках проверочных действий?" },
              a: [{ pl: "Zawsze, bez względu na kwotę", ru: "Всегда, независимо от суммы" }, { pl: "Tylko za zgodą sądu", ru: "Только с согласия суда" }, { pl: "Gdy korekta nie przekracza limitu ustawowego (w materiałach 5 000 zł); podatnik może wnieść sprzeciw w 14 dni", ru: "Когда исправление не превышает законодательного лимита (в материалах 5 000 зл); налогоплательщик может возразить в течение 14 дней" }, { pl: "Nigdy", ru: "Никогда" }],
              correct: 2, why: { pl: "Art. 274 § 1 pkt 1 Op; sprzeciw podatnika powoduje, że korekta traci moc.", ru: "Ст. 274 § 1 п. 1 Op; возражение налогоплательщика лишает исправление силы." } },
            { q: { pl: "Dlaczego sądy badają wszczęcie postępowania karnego skarbowego tuż przed przedawnieniem?", ru: "Почему суды проверяют возбуждение уголовно-фискального дела незадолго до истечения давности?" },
              a: [{ pl: "Bo takie wszczęcie jest zawsze zakazane", ru: "Потому что такое возбуждение всегда запрещено" }, { pl: "Bo może być instrumentalne, czyli służyć tylko zawieszeniu biegu przedawnienia", ru: "Потому что оно может быть инструментальным, то есть служить только приостановлению давности" }, { pl: "Bo przedawnienie nie dotyczy podatków", ru: "Потому что давность не касается налогов" }, { pl: "Bo wymaga zgody podatnika", ru: "Потому что требует согласия налогоплательщика" }],
              correct: 1, why: { pl: "Uchwała NSA I FPS 1/21: przy wszczęciu instrumentalnym zawieszenie nie działa i zobowiązanie się przedawnia.", ru: "Постановление NSA I FPS 1/21: при инструментальном возбуждении приостановление не действует и обязательство погашается давностью." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Organem odwoławczym od decyzji naczelnika urzędu skarbowego jest:", ru: "Апелляционным органом по решениям начальника налоговой инспекции является:" },
          a: [{ pl: "SKO", ru: "SKO" }, { pl: "Dyrektor Izby Administracji Skarbowej", ru: "Директор налоговой палаты (IAS)" }, { pl: "WSA", ru: "WSA" }, { pl: "Minister Finansów", ru: "Министр финансов" }],
          correct: 1, why: { pl: "Od decyzji naczelników US i UCS odwołanie rozpatruje dyrektor IAS; od organów samorządowych — SKO.", ru: "Жалобы на решения начальников US и UCS рассматривает директор IAS; на решения органов самоуправления — SKO." } },
        { q: { pl: "Interpretację ogólną wydaje:", ru: "Общее разъяснение выдаёт:" },
          a: [{ pl: "Dyrektor KIS", ru: "Директор KIS" }, { pl: "Naczelnik urzędu skarbowego", ru: "Начальник налоговой инспекции" }, { pl: "Minister Finansów", ru: "Министр финансов" }, { pl: "Wójt", ru: "Войт" }],
          correct: 2, why: { pl: "Art. 14a Op: Minister Finansów wydaje interpretacje ogólne i objaśnienia podatkowe.", ru: "Ст. 14a Op: министр финансов выдаёт общие разъяснения и налоговые пояснения." } },
        { q: { pl: "Kiedy powstała Krajowa Administracja Skarbowa?", ru: "Когда создана Национальная налоговая администрация (KAS)?" },
          a: [{ pl: "W 2017 r.", ru: "В 2017 г." }, { pl: "W 1997 r.", ru: "В 1997 г." }, { pl: "W 2004 r.", ru: "В 2004 г." }, { pl: "W 2022 r.", ru: "В 2022 г." }],
          correct: 0, why: { pl: "KAS działa od 1 marca 2017 r., z połączenia administracji podatkowej, kontroli skarbowej i Służby Celnej.", ru: "KAS действует с 1 марта 2017 г. после объединения налоговой администрации, фискального контроля и таможенной службы." } },
        { q: { pl: "Zasada prawdy obiektywnej (art. 122 Op) oznacza, że organ:", ru: "Принцип объективной истины (ст. 122 Op) означает, что орган:" },
          a: [{ pl: "może przyjąć wersję korzystną tylko dla budżetu", ru: "может принять версию, выгодную только бюджету" }, { pl: "nie musi zbierać dowodów", ru: "не обязан собирать доказательства" }, { pl: "opiera się wyłącznie na deklaracji", ru: "опирается только на декларацию" }, { pl: "musi dokładnie wyjaśnić stan faktyczny, także na korzyść podatnika", ru: "должен тщательно выяснить фактическое состояние, в том числе в пользу налогоплательщика" }],
          correct: 3, why: { pl: "Organ bada wszystkie okoliczności, zarówno na korzyść, jak i na niekorzyść strony.", ru: "Орган исследует все обстоятельства — как в пользу, так и во вред стороне." } },
        { q: { pl: "Skargę na decyzję organu II instancji wnosi się do:", ru: "Жалоба на решение органа II инстанции подаётся в:" },
          a: [{ pl: "NSA w 14 dni", ru: "NSA в течение 14 дней" }, { pl: "WSA w 30 dni", ru: "WSA в течение 30 дней" }, { pl: "SKO w 7 dni", ru: "SKO в течение 7 дней" }, { pl: "Trybunału Konstytucyjnego", ru: "Конституционный трибунал" }],
          correct: 1, why: { pl: "Po wyczerpaniu drogi odwoławczej przysługuje skarga do WSA w 30 dni; od wyroku WSA — kasacja do NSA w 30 dni.", ru: "После исчерпания апелляции — жалоба в WSA в течение 30 дней; на приговор WSA — кассация в NSA в течение 30 дней." } },
        { q: { pl: "W ramach którego trybu organ NIE może przesłuchiwać świadków?", ru: "В каком режиме орган НЕ может допрашивать свидетелей?" },
          a: [{ pl: "Czynności sprawdzających", ru: "Проверочных действий" }, { pl: "Kontroli podatkowej", ru: "Налоговой проверки" }, { pl: "Postępowania podatkowego", ru: "Налогового производства" }, { pl: "Postępowania odwoławczego", ru: "Апелляционного производства" }],
          correct: 0, why: { pl: "Czynności sprawdzające są odformalizowane i ograniczone do wyjaśnień i dokumentów.", ru: "Проверочные действия неформализованы и ограничены пояснениями и документами." } },
        { q: { pl: "Na postanowienie o umorzeniu postępowania przysługuje:", ru: "На постановление о прекращении производства можно подать:" },
          a: [{ pl: "odwołanie w 14 dni", ru: "апелляционную жалобу в течение 14 дней" }, { pl: "skarga kasacyjna", ru: "кассационную жалобу" }, { pl: "zażalenie w 7 dni", ru: "частную жалобу в течение 7 дней" }, { pl: "nic", ru: "ничего" }],
          correct: 2, why: { pl: "Postanowienia zaskarża się zażaleniem w terminie 7 dni.", ru: "Постановления обжалуются частной жалобой в течение 7 дней." } },
        { q: { pl: "Kto wydaje interpretacje indywidualne w sprawie podatku od nieruchomości?", ru: "Кто выдаёт индивидуальные разъяснения по налогу на недвижимость?" },
          a: [{ pl: "Dyrektor KIS", ru: "Директор KIS" }, { pl: "RIO", ru: "RIO" }, { pl: "Rada gminy", ru: "Совет гмины" }, { pl: "Wójt, burmistrz lub prezydent miasta", ru: "Войт, бурмистр или президент города" }],
          correct: 3, why: { pl: "W zakresie podatków i opłat lokalnych interpretacje wydają organy samorządowe: wójt, burmistrz, prezydent (starosta, marszałek w swoim zakresie).", ru: "По местным налогам и сборам разъяснения выдают органы самоуправления: войт, бурмистр, президент (староста, маршал в своей сфере)." } },
        { q: { pl: "Uchybiony bez winy strony termin można przywrócić, składając wniosek w ciągu:", ru: "Пропущенный не по вине стороны срок можно восстановить, подав ходатайство в течение:" },
          a: [{ pl: "7 dni od ustania przyczyny uchybienia", ru: "7 дней с момента устранения причины пропуска" }, { pl: "30 dni od doręczenia decyzji", ru: "30 дней с вручения решения" }, { pl: "1 roku", ru: "1 года" }, { pl: "nie można przywrócić terminu", ru: "срок восстановить нельзя" }],
          correct: 0, why: { pl: "Wniosek o przywrócenie terminu składa się w 7 dni od ustania przyczyny, z uprawdopodobnieniem braku winy.", ru: "Ходатайство о восстановлении срока подаётся в течение 7 дней с устранения причины, с обоснованием отсутствия вины." } },
        { q: { pl: "Protokół kontroli podatkowej:", ru: "Протокол налоговой проверки:" },
          a: [{ pl: "jest decyzją i można się od niego odwołać", ru: "является решением, и его можно обжаловать" }, { pl: "ustala wysokość zobowiązania", ru: "устанавливает размер обязательства" }, { pl: "nie jest decyzją; można złożyć do niego zastrzeżenia w 14 dni", ru: "не является решением; к нему можно подать замечания в течение 14 дней" }, { pl: "zastępuje deklarację", ru: "заменяет декларацию" }],
          correct: 2, why: { pl: "Od protokołu nie ma odwołania; są tylko zastrzeżenia. Decyzję wydaje się w postępowaniu podatkowym.", ru: "Протокол не обжалуется; есть только замечания. Решение выносится в налоговом производстве." } },
        { q: { pl: "Dowodem w postępowaniu podatkowym (art. 180 Op) może być:", ru: "Доказательством в налоговом производстве (ст. 180 Op) может быть:" },
          a: [{ pl: "tylko dokument urzędowy", ru: "только официальный документ" }, { pl: "wszystko, co może przyczynić się do wyjaśnienia sprawy, a nie jest sprzeczne z prawem", ru: "всё, что может способствовать выяснению дела и не противоречит закону" }, { pl: "tylko zeznanie podatnika", ru: "только показания налогоплательщика" }, { pl: "tylko opinia biegłego", ru: "только заключение эксперта" }],
          correct: 1, why: { pl: "W postępowaniu podatkowym obowiązuje otwarty katalog dowodów.", ru: "В налоговом производстве действует открытый перечень доказательств." } },
        { q: { pl: "Kontrolę wszczyna się co do zasady przez:", ru: "Проверка, как правило, начинается с:" },
          a: [{ pl: "telefon do podatnika", ru: "звонка налогоплательщику" }, { pl: "wysłanie e-maila do księgowej", ru: "письма бухгалтеру по e-mail" }, { pl: "wydanie decyzji wymiarowej", ru: "вынесения решения об исчислении" }, { pl: "doręczenie upoważnienia kontrolowanemu lub osobie przez niego upoważnionej", ru: "вручения полномочия проверяемому или уполномоченному им лицу" }],
          correct: 3, why: { pl: "Art. 284 Op; doręczenie upoważnienia przypadkowemu pracownikowi bez umocowania jest zwykle nieskuteczne.", ru: "Ст. 284 Op; вручение полномочия случайному сотруднику без доверенности обычно неэффективно." } },
      ],
    },
  ],
});
