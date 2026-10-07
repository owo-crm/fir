// DANE TESTOWE: zostaną zastąpione materiałami z sylabusa WSB Gdańsk.
// Pojęcia: `def` = znaczenie pokazywane na odwrocie fiszki.
// Każdy tekst to obiekt { pl, ru }. Dodaj kolejne tematy do tablicy `topics`.
window.COURSE = {
  title: { pl: "Makroekonomia", ru: "Макроэкономика" },
  university: "WSB Gdańsk",
  examDate: "2027-01-28",
  topics: [
    {
      id: "pkb",
      lecture: 1,
      title: { pl: "PKB i mierzenie gospodarki", ru: "ВВП и измерение экономики" },
      summary: {
        pl: [
          "PKB to wartość wszystkich dóbr i usług finalnych wytworzonych w kraju w danym okresie.",
          "Metoda wydatkowa: PKB = C + I + G + NX.",
          "PKB nominalny liczony jest w cenach bieżących, realny w cenach stałych.",
          "Deflator PKB = PKB nominalny / PKB realny × 100.",
        ],
        ru: [
          "ВВП — стоимость всех конечных товаров и услуг, произведённых в стране за период.",
          "Метод расходов: ВВП = C + I + G + NX.",
          "Номинальный ВВП считается в текущих ценах, реальный — в постоянных.",
          "Дефлятор ВВП = номинальный ВВП / реальный ВВП × 100.",
        ],
      },
      formulas: [
        { f: "Y = C + I + G + NX", d: { pl: "Tożsamość PKB (metoda wydatkowa)", ru: "Тождество ВВП (метод расходов)" } },
        { f: "Deflator = PKBnom / PKBreal × 100", d: { pl: "Deflator PKB", ru: "Дефлятор ВВП" } },
      ],
      terms: [
        { pl: "Konsumpcja (C)", ru: "Потребление (C)", en: "Consumption",
          def: { pl: "Wydatki gospodarstw domowych na dobra i usługi finalne.", ru: "Расходы домохозяйств на конечные товары и услуги." } },
        { pl: "Inwestycje (I)", ru: "Инвестиции (I)", en: "Investment",
          def: { pl: "Wydatki firm na dobra kapitałowe (maszyny, budynki) i zmiana zapasów.", ru: "Расходы фирм на капитальные блага (оборудование, здания) и изменение запасов." } },
        { pl: "Wydatki rządowe (G)", ru: "Госрасходы (G)", en: "Government spending",
          def: { pl: "Zakupy dóbr i usług przez państwo (bez transferów socjalnych).", ru: "Закупки товаров и услуг государством (без социальных трансфертов)." } },
        { pl: "Eksport netto (NX)", ru: "Чистый экспорт (NX)", en: "Net exports",
          def: { pl: "Eksport minus import: NX = X − M.", ru: "Экспорт минус импорт: NX = X − M." } },
      ],
      quiz: [
        {
          q: { pl: "Który element NIE wchodzi do PKB metodą wydatkową?", ru: "Что НЕ входит в ВВП по методу расходов?" },
          a: [
            { pl: "Konsumpcja", ru: "Потребление" },
            { pl: "Transfery socjalne", ru: "Социальные трансферы" },
            { pl: "Inwestycje", ru: "Инвестиции" },
            { pl: "Eksport netto", ru: "Чистый экспорт" },
          ],
          correct: 1,
          why: { pl: "Transfery nie są zapłatą za dobra ani usługi.", ru: "Трансферы — это не оплата товаров или услуг." },
        },
        {
          q: { pl: "PKB realny liczony jest w cenach:", ru: "Реальный ВВП считается в ценах:" },
          a: [
            { pl: "bieżących", ru: "текущих" },
            { pl: "stałych (roku bazowego)", ru: "постоянных (базового года)" },
            { pl: "rynkowych zagranicznych", ru: "зарубежных рыночных" },
          ],
          correct: 1,
          why: { pl: "Realny PKB eliminuje wpływ zmian cen.", ru: "Реальный ВВП устраняет влияние изменения цен." },
        },
      ],
    },
    {
      id: "inflacja",
      lecture: 2,
      title: { pl: "Inflacja i bezrobocie", ru: "Инфляция и безработица" },
      summary: {
        pl: [
          "Inflacja to trwały wzrost ogólnego poziomu cen, mierzony najczęściej wskaźnikiem CPI.",
          "Stopa bezrobocia = bezrobotni / siła robocza × 100%.",
          "Krzywa Phillipsa pokazuje, że w krótkim okresie niższe bezrobocie idzie w parze z wyższą inflacją.",
        ],
        ru: [
          "Инфляция — устойчивый рост общего уровня цен, чаще всего измеряется индексом CPI.",
          "Уровень безработицы = безработные / рабочая сила × 100%.",
          "Кривая Филлипса: в краткосрочном периоде более низкая безработица сопровождается более высокой инфляцией.",
        ],
      },
      formulas: [
        { f: "u = U / L × 100%", d: { pl: "Stopa bezrobocia", ru: "Уровень безработицы" } },
        { f: "π = (CPI₁ − CPI₀) / CPI₀ × 100%", d: { pl: "Stopa inflacji", ru: "Темп инфляции" } },
      ],
      terms: [
        { pl: "Siła robocza", ru: "Рабочая сила", en: "Labour force",
          def: { pl: "Osoby pracujące oraz bezrobotni aktywnie szukający pracy.", ru: "Занятые плюс безработные, активно ищущие работу." } },
        { pl: "Bezrobocie frykcyjne", ru: "Фрикционная безработица", en: "Frictional unemployment",
          def: { pl: "Krótkotrwałe bezrobocie związane ze zmianą lub szukaniem pracy.", ru: "Кратковременная безработица при смене или поиске работы." } },
        { pl: "Deflacja", ru: "Дефляция", en: "Deflation",
          def: { pl: "Trwały spadek ogólnego poziomu cen.", ru: "Устойчивое снижение общего уровня цен." } },
      ],
      quiz: [
        {
          q: { pl: "Krzywa Phillipsa opisuje zależność między:", ru: "Кривая Филлипса описывает связь между:" },
          a: [
            { pl: "inflacją a bezrobociem", ru: "инфляцией и безработицей" },
            { pl: "PKB a eksportem", ru: "ВВП и экспортом" },
            { pl: "stopą procentową a podatkami", ru: "ставкой процента и налогами" },
          ],
          correct: 0,
          why: { pl: "To klasyczny kompromis inflacja–bezrobocie.", ru: "Это классический компромисс инфляция–безработица." },
        },
      ],
    },
    {
      id: "adas",
      lecture: 3,
      title: { pl: "Model AD–AS", ru: "Модель AD–AS" },
      chart: "adas",
      summary: {
        pl: [
          "AD (popyt globalny) jest malejący: przy wyższych cenach popyt realny spada.",
          "SRAS (krótkookresowa podaż) jest rosnąca, LRAS jest pionowa na poziomie produkcji potencjalnej.",
          "Ekspansywna polityka fiskalna przesuwa AD w prawo, co podnosi Y i P w krótkim okresie.",
        ],
        ru: [
          "AD (совокупный спрос) нисходящий: при более высоких ценах реальный спрос падает.",
          "SRAS (краткосрочное предложение) восходящее, LRAS вертикальна на уровне потенциального выпуска.",
          "Стимулирующая фискальная политика сдвигает AD вправо и в краткосроке повышает Y и P.",
        ],
      },
      formulas: [{ f: "AD = C + I + G + NX", d: { pl: "Składniki popytu globalnego", ru: "Компоненты совокупного спроса" } }],
      terms: [
        { pl: "Popyt globalny", ru: "Совокупный спрос", en: "Aggregate demand",
          def: { pl: "Łączny popyt na dobra i usługi w gospodarce przy danym poziomie cen: C + I + G + NX.", ru: "Общий спрос на товары и услуги в экономике при данном уровне цен: C + I + G + NX." } },
        { pl: "Podaż globalna", ru: "Совокупное предложение", en: "Aggregate supply",
          def: { pl: "Łączna produkcja, jaką firmy chcą wytworzyć przy danym poziomie cen.", ru: "Общий объём выпуска, который фирмы готовы произвести при данном уровне цен." } },
        { pl: "Produkcja potencjalna", ru: "Потенциальный выпуск", en: "Potential output",
          def: { pl: "Produkcja przy pełnym wykorzystaniu zasobów (naturalna stopa bezrobocia).", ru: "Выпуск при полном использовании ресурсов (естественный уровень безработицы)." } },
      ],
      quiz: [
        {
          q: { pl: "Wzrost wydatków rządowych przesuwa krzywą AD:", ru: "Рост госрасходов сдвигает кривую AD:" },
          a: [
            { pl: "w lewo", ru: "влево" },
            { pl: "w prawo", ru: "вправо" },
            { pl: "nie przesuwa", ru: "не сдвигает" },
          ],
          correct: 1,
          why: { pl: "G jest składnikiem AD, więc jego wzrost zwiększa popyt.", ru: "G — компонент AD, поэтому его рост увеличивает спрос." },
        },
      ],
    },
    {
      id: "pieniadz",
      lecture: 4,
      title: { pl: "Pieniądz i polityka pieniężna", ru: "Деньги и денежно-кредитная политика" },
      summary: {
        pl: [
          "Funkcje pieniądza: środek wymiany, miernik wartości, środek przechowywania wartości.",
          "NBP prowadzi politykę pieniężną głównie przez stopę referencyjną.",
          "Mnożnik kreacji pieniądza: m = 1 / r, gdzie r to stopa rezerw obowiązkowych.",
        ],
        ru: [
          "Функции денег: средство обмена, мера стоимости, средство сбережения.",
          "NBP (центробанк Польши) проводит денежную политику в основном через референсную ставку.",
          "Денежный мультипликатор: m = 1 / r, где r — норма обязательных резервов.",
        ],
      },
      formulas: [{ f: "m = 1 / r", d: { pl: "Mnożnik kreacji pieniądza", ru: "Денежный мультипликатор" } }],
      terms: [
        { pl: "Stopa referencyjna", ru: "Референсная ставка", en: "Reference rate",
          def: { pl: "Główna stopa procentowa NBP, wyznacza koszt pieniądza w gospodarce.", ru: "Основная ставка NBP, задаёт стоимость денег в экономике." } },
        { pl: "Rezerwa obowiązkowa", ru: "Обязательный резерв", en: "Reserve requirement",
          def: { pl: "Część depozytów, którą banki muszą trzymać w banku centralnym.", ru: "Часть депозитов, которую банки обязаны держать в центробанке." } },
      ],
      quiz: [
        {
          q: { pl: "Przy stopie rezerw 10% mnożnik wynosi:", ru: "При норме резервов 10% мультипликатор равен:" },
          a: [{ pl: "1", ru: "1" }, { pl: "5", ru: "5" }, { pl: "10", ru: "10" }],
          correct: 2,
          why: { pl: "m = 1 / 0,1 = 10", ru: "m = 1 / 0,1 = 10" },
        },
      ],
    },
  ],
};
