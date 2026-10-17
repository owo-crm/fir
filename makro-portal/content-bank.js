// Bankowość — wykłady → podtematy. Format jak w content.js.
// Składnia artykułu: "## nagłówek", akapity, "- lista", "1. lista", "> !zapamietaj|przyklad|uwaga tekst",
// "| tabela |", pojęcia: [[id]] lub [[id|tekst]] (glossary.js + glossary-bank.js), **pogrubienie**.
(window.SUBJECTS = window.SUBJECTS || []).push({
  id: "bank",
  name: { pl: "Podstawy bankowości", ru: "Основы банковского дела" },
  short: { pl: "Bankowość", ru: "Банки" },
  icon: "bank",
  lecturer: "Justyna Rybacka",
  examDate: "2027-01-30",
  program: [],
  lectures: [
    // ================================================================== W1
    {
      n: 1,
      color: "--c1",
      title: { pl: "Banki i system bankowy", ru: "Банки и банковская система" },
      lead: {
        pl: "Czym jest bank w świetle ekonomii i Prawa bankowego, jakie czynności może wykonywać, z kogo składa się polski system bankowy, jak banki tworzą pieniądz i kto pilnuje, żeby system się nie zawalił.",
        ru: "Что такое банк с точки зрения экономики и закона «Prawo bankowe», какие операции он может выполнять, из кого состоит польская банковская система, как банки создают деньги и кто следит, чтобы система не рухнула.",
      },
      subs: [
        // ------------------------------------------------------------------ 1.1
        {
          id: "1.1",
          title: { pl: "Bank i czynności bankowe", ru: "Банк и банковские операции" },
          src: "Podstawy bankowości, slajdy 3–10; Prawo bankowe, art. 2, 5, 6",
          body: {
            pl: `Każdy z nas korzysta z banku: ma konto, kartę, może kredyt. Ale czym właściwie jest bank i co odróżnia go od zwykłej firmy, która też pożycza pieniądze?

## Bank z trzech perspektyw
**Ujęcie mikroekonomiczne.** Bank to przedsiębiorstwo. Zaciąga kredyt (przyjmuje depozyty, czyli pożycza od klientów) i udziela kredytu, świadczy usługi w obrocie pieniężnym, kredytowym i kapitałowym oraz oferuje inne usługi. Jak każda firma chce osiągać zysk, a jego głównym źródłem jest różnica między oprocentowaniem kredytów i depozytów oraz prowizje.

**Ujęcie makroekonomiczne.** Dla gospodarki bank pełni trzy funkcje:
- **akumulacja** — zbiera rozproszone oszczędności wielu osób,
- **dystrybucja** — rozdziela je tam, gdzie są potrzebne (firmom, gospodarstwom domowym, państwu),
- **pośrednictwo** — łączy tych, którzy mają nadwyżki, z tymi, którym brakuje pieniędzy.

**Ujęcie prawne.** Najważniejsza jest definicja z [[prawo-bankowe|Prawa bankowego]]:

> !zapamietaj Art. 2 Prawa bankowego: „Bank jest osobą prawną utworzoną zgodnie z przepisami ustaw, działającą na podstawie zezwoleń uprawniających do wykonywania czynności bankowych obciążających ryzykiem środki powierzone pod jakimkolwiek tytułem zwrotnym”.

Rozłóżmy tę definicję na części:
1. **Osoba prawna** — bank nie może być osobą fizyczną ani spółką cywilną. Art. 12 Prawa bankowego pozwala tworzyć banki państwowe, spółdzielcze i banki w formie spółek akcyjnych.
2. **Zezwolenie** — bez licencji (wydaje ją dziś KNF) nie wolno prowadzić działalności bankowej.
3. **Ryzyko cudzych pieniędzy** — bank pożycza pieniądze, które sam musi oddać deponentom. To dlatego jest tak mocno regulowany.

## Podział banków ze względu na lokalizację
- **Banki krajowe** — mają siedzibę w Polsce.
- **Banki zagraniczne** — mają siedzibę za granicą i mogą działać w Polsce przez oddział lub przedstawicielstwo. Banki z UE (instytucje kredytowe) korzystają z tzw. jednolitego paszportu, czyli licencja z kraju macierzystego wystarcza do działania w innych państwach UE.

## Czynności bankowe sensu stricto
Art. 5 ust. 1 Prawa bankowego wymienia [[czynnosci-bankowe|czynności bankowe]] w ścisłym znaczeniu. Jako działalność gospodarczą może je wykonywać **wyłącznie bank** (art. 5 ust. 4), chyba że inna ustawa pozwala na to innym podmiotom (np. SKOK-om).

| Czynności sensu stricto (art. 5 ust. 1) | Prosty przykład |
|---|---|
| przyjmowanie wkładów płatnych na żądanie lub z nadejściem terminu i prowadzenie ich rachunków | konto osobiste, lokata |
| prowadzenie innych rachunków bankowych | rachunek powierniczy |
| udzielanie kredytów | kredyt hipoteczny |
| udzielanie i potwierdzanie gwarancji bankowych, otwieranie i potwierdzanie akredytyw | gwarancja dobrego wykonania kontraktu |
| emitowanie bankowych papierów wartościowych | certyfikat depozytowy |
| przeprowadzanie bankowych rozliczeń pieniężnych | przelew |
| wydawanie instrumentu pieniądza elektronicznego | karta przedpłacona |

## Czynności bankowe sensu largo
Art. 5 ust. 2 wymienia czynności, które są bankowe **tylko wtedy, gdy wykonuje je bank**. Mogą je wykonywać także inne firmy — wtedy nie są czynnościami bankowymi. Należą do nich m.in.:
- udzielanie pożyczek pieniężnych,
- operacje czekowe i wekslowe,
- wydawanie kart płatniczych i operacje nimi,
- terminowe operacje finansowe (np. kontrakty terminowe),
- nabywanie i zbywanie wierzytelności (np. faktoring),
- przechowywanie przedmiotów i papierów wartościowych, skrytki sejfowe,
- skup i sprzedaż wartości dewizowych,
- udzielanie i potwierdzanie poręczeń,
- czynności zlecone związane z emisją papierów wartościowych,
- pośrednictwo w przekazach pieniężnych i rozliczeniach dewizowych.

> !przyklad Kantor wymiany walut może kupować i sprzedawać euro, bo skup walut to czynność sensu largo. Gdy robi to bank, jest to czynność bankowa. Ale kantor nie może przyjmować od ludzi lokat, bo to czynność sensu stricto zastrzeżona dla banków.

## Co jeszcze może bank (art. 6)
Poza czynnościami bankowymi bank może m.in. nabywać akcje i udziały innych firm, obracać papierami wartościowymi, kupować i sprzedawać nieruchomości, świadczyć usługi doradcze w sprawach finansowych i inne usługi finansowe. Może też zamienić wierzytelność na majątek dłużnika, ale musi go sprzedać: nieruchomość w ciągu 5 lat, a inne składniki w ciągu 3 lat (art. 6 ust. 2), chyba że wykorzysta je do własnej działalności bankowej.

> !uwaga Nie myl czynności bankowych (art. 5) z innymi dozwolonymi działaniami banku (art. 6). Kupno nieruchomości przez bank jest dozwolone, ale nie jest czynnością bankową.`,
            ru: `Каждый из нас пользуется банком: у нас есть счёт, карта, может быть кредит. Но что такое банк на самом деле и чем он отличается от обычной фирмы, которая тоже даёт деньги в долг?

## Банк с трёх точек зрения
**Микроэкономический подход.** Банк — это предприятие. Он берёт в долг (принимает депозиты, то есть занимает у клиентов) и даёт кредиты, оказывает услуги в денежном, кредитном и капитальном обороте и предлагает другие услуги. Как любая фирма, он стремится к прибыли, а её главный источник — разница между ставками по кредитам и депозитам, а также комиссии.

**Макроэкономический подход.** Для экономики банк выполняет три функции:
- **аккумуляция** — собирает разрозненные сбережения многих людей,
- **распределение** — направляет их туда, где они нужны (фирмам, домохозяйствам, государству),
- **посредничество** — соединяет тех, у кого есть излишки, с теми, кому денег не хватает.

**Правовой подход.** Главное — определение из закона [[prawo-bankowe|«Prawo bankowe»]]:

> !zapamietaj Ст. 2 «Prawo bankowe»: «Банк — это юридическое лицо, созданное в соответствии с законами, действующее на основании разрешений на выполнение банковских операций, при которых рискует средствами, доверенными ему на любом возвратном основании».

Разберём это определение по частям:
1. **Юридическое лицо** — банк не может быть физическим лицом или гражданским товариществом. Ст. 12 закона позволяет создавать государственные банки, кооперативные банки и банки в форме акционерных обществ.
2. **Разрешение** — без лицензии (сегодня её выдаёт KNF) вести банковскую деятельность нельзя.
3. **Риск чужих денег** — банк одалживает деньги, которые сам обязан вернуть вкладчикам. Поэтому он так строго регулируется.

## Деление банков по месту нахождения
- **Отечественные банки** — имеют местонахождение в Польше.
- **Иностранные банки** — находятся за границей и могут работать в Польше через филиал или представительство. Банки из ЕС (кредитные учреждения) пользуются так называемым единым паспортом: лицензии страны происхождения достаточно для работы в других странах ЕС.

## Банковские операции sensu stricto
Ст. 5 п. 1 закона перечисляет [[czynnosci-bankowe|банковские операции]] в узком смысле. Как предпринимательскую деятельность их может вести **только банк** (ст. 5 п. 4), если другой закон не разрешает этого иным субъектам (например, SKOK).

| Операции sensu stricto (ст. 5 п. 1) | Простой пример |
|---|---|
| приём вкладов до востребования или на срок и ведение их счетов | личный счёт, срочный вклад |
| ведение других банковских счетов | доверительный счёт |
| выдача кредитов | ипотечный кредит |
| выдача и подтверждение банковских гарантий, открытие и подтверждение аккредитивов | гарантия исполнения контракта |
| выпуск банковских ценных бумаг | депозитный сертификат |
| проведение банковских денежных расчётов | перевод |
| выпуск инструмента электронных денег | предоплаченная карта |

## Банковские операции sensu largo
Ст. 5 п. 2 перечисляет операции, которые являются банковскими **только тогда, когда их выполняет банк**. Их могут вести и другие фирмы — тогда это не банковские операции. Среди них:
- выдача денежных займов,
- чековые и вексельные операции,
- выпуск платёжных карт и операции с ними,
- срочные финансовые операции (например, фьючерсы),
- покупка и продажа денежных требований (например, факторинг),
- хранение предметов и ценных бумаг, банковские сейфы,
- покупка и продажа иностранной валюты,
- выдача и подтверждение поручительств,
- поручения, связанные с выпуском ценных бумаг,
- посредничество в денежных переводах и валютных расчётах.

> !przyklad Обменный пункт (kantor) может покупать и продавать евро, потому что покупка валюты — операция sensu largo. Когда это делает банк, это банковская операция. Но обменный пункт не может принимать от людей вклады, потому что это операция sensu stricto, зарезервированная за банками.

## Что ещё может банк (ст. 6)
Помимо банковских операций банк может, в частности, приобретать акции и доли других фирм, торговать ценными бумагами, покупать и продавать недвижимость, консультировать по финансовым вопросам и оказывать другие финансовые услуги. Он может также обменять требование на имущество должника, но обязан его продать: недвижимость в течение 5 лет, прочее имущество — в течение 3 лет (ст. 6 п. 2), если не использует его для собственной банковской деятельности.

> !uwaga Не путайте банковские операции (ст. 5) с другими разрешёнными действиями банка (ст. 6). Покупка банком недвижимости разрешена, но банковской операцией не является.`,
          },
          quiz: [
            { q: { pl: "Zgodnie z art. 2 Prawa bankowego bank jest:", ru: "Согласно ст. 2 «Prawo bankowe» банк — это:" },
              a: [{ pl: "dowolnym przedsiębiorcą udzielającym pożyczek", ru: "любой предприниматель, выдающий займы" }, { pl: "osobą fizyczną z licencją KNF", ru: "физическое лицо с лицензией KNF" }, { pl: "osobą prawną działającą na podstawie zezwoleń, obciążającą ryzykiem środki powierzone pod tytułem zwrotnym", ru: "юридическое лицо, действующее по разрешениям и рискующее средствами, доверенными на возвратной основе" }, { pl: "spółką cywilną zarejestrowaną w KRS", ru: "гражданское товарищество, зарегистрированное в KRS" }],
              correct: 2, why: { pl: "Kluczowe elementy definicji: osoba prawna, zezwolenie i ryzyko cudzych, zwrotnych środków.", ru: "Ключевые элементы определения: юридическое лицо, разрешение и риск чужих возвратных средств." } },
            { q: { pl: "Która czynność jest czynnością bankową sensu stricto?", ru: "Какая операция является банковской sensu stricto?" },
              a: [{ pl: "Skup i sprzedaż walut", ru: "Покупка и продажа валюты" }, { pl: "Udzielanie kredytów", ru: "Выдача кредитов" }, { pl: "Udostępnianie skrytek sejfowych", ru: "Предоставление сейфовых ячеек" }, { pl: "Udzielanie pożyczek pieniężnych", ru: "Выдача денежных займов" }],
              correct: 1, why: { pl: "Kredyt jest w art. 5 ust. 1, a pozostałe trzy czynności — w art. 5 ust. 2 (sensu largo).", ru: "Кредит указан в ст. 5 п. 1, а остальные три операции — в ст. 5 п. 2 (sensu largo)." } },
            { q: { pl: "Czynność sensu largo staje się czynnością bankową, gdy:", ru: "Операция sensu largo становится банковской, когда:" },
              a: [{ pl: "wykonuje ją bank", ru: "её выполняет банк" }, { pl: "przekracza 1000 zł", ru: "превышает 1000 злотых" }, { pl: "zgodzi się na nią NBP", ru: "её одобрит NBP" }, { pl: "dotyczy waluty obcej", ru: "касается иностранной валюты" }],
              correct: 0, why: { pl: "Art. 5 ust. 2: czynności te są bankowe, „o ile są wykonywane przez banki”.", ru: "Ст. 5 п. 2: эти операции банковские, «если их выполняют банки»." } },
            { q: { pl: "Trzy funkcje banku w ujęciu makroekonomicznym to:", ru: "Три функции банка с макроэкономической точки зрения:" },
              a: [{ pl: "emisja, nadzór, kontrola", ru: "эмиссия, надзор, контроль" }, { pl: "produkcja, sprzedaż, marketing", ru: "производство, продажа, маркетинг" }, { pl: "podatki, cła, opłaty", ru: "налоги, пошлины, сборы" }, { pl: "akumulacja, dystrybucja, pośrednictwo", ru: "аккумуляция, распределение, посредничество" }],
              correct: 3, why: { pl: "Bank zbiera oszczędności, rozdziela je i pośredniczy między oszczędzającymi a pożyczającymi.", ru: "Банк собирает сбережения, распределяет их и посредничает между сберегающими и заёмщиками." } },
            { q: { pl: "Bank przejął od dłużnika nieruchomość, której nie używa. W jakim terminie musi ją sprzedać?", ru: "Банк получил от должника недвижимость, которую не использует. В какой срок он должен её продать?" },
              a: [{ pl: "1 rok", ru: "1 год" }, { pl: "3 lata", ru: "3 года" }, { pl: "5 lat", ru: "5 лет" }, { pl: "Nie musi jej sprzedawać", ru: "Не обязан продавать" }],
              correct: 2, why: { pl: "Art. 6 ust. 2: nieruchomości — nie dłużej niż 5 lat, inne składniki — 3 lata.", ru: "Ст. 6 п. 2: недвижимость — не дольше 5 лет, прочее имущество — 3 года." } },
          ],
        },
        // ------------------------------------------------------------------ 1.2
        {
          id: "1.2",
          title: { pl: "System bankowy w Polsce", ru: "Банковская система Польши" },
          src: "Podstawy bankowości, slajdy 11–24; Prawo bankowe, art. 12–13",
          body: {
            pl: `Banki nie działają w próżni. Tworzą razem z przepisami i instytucjami nadzoru [[system-bankowy|system bankowy]] — ogół instytucji oraz norm prawnych, które określają organizację, zakres i zasady działania banków, ich wzajemne powiązania i relacje z otoczeniem.

## Grupy banków
W typowym systemie bankowym wyróżnia się:
1. **bank centralny**,
2. **banki operacyjne** (depozytowo-kredytowe, uniwersalne),
3. **banki specjalistyczne** (inwestycyjne, hipoteczne, komunalne),
4. **kasy oszczędnościowe**,
5. **spółdzielczość kredytową**.

Polski system jest **dwuszczeblowy**: na górze stoi [[nbp|Narodowy Bank Polski]], a na dole banki komercyjne i spółdzielcze, które obsługują klientów.

## Bank centralny
[[bank-centralny|Bank centralny]] nie prowadzi kont dla ludzi ani firm. Jego zadania to:
- emisja pieniądza gotówkowego (banknotów i monet),
- bycie **bankiem banków** — prowadzi ich rachunki, udziela im kredytów, przyjmuje rezerwy,
- bycie **bankiem państwa** — obsługuje budżet, zarządza rezerwami walutowymi,
- prowadzenie polityki pieniężnej (o tym w wykładzie 2).

W gospodarce istnieją **dwa rodzaje pieniądza**: gotówkowy, który emituje bank centralny, i bezgotówkowy (zapisy na rachunkach), który w dużej mierze tworzą banki komercyjne przez kredyty — mechanizm [[kreacja-pieniadza|kreacji pieniądza]] omówimy w temacie 1.3.

## Banki operacyjne (komercyjne, uniwersalne)
To banki, które znamy z ulicy: przyjmują depozyty, udzielają kredytów, prowadzą rozliczenia. Bank uniwersalny robi „wszystko” — obsługuje ludność, firmy, a często też działa na rynku kapitałowym. W działaniu musi:
- **zachowywać płynność** — mieć pieniądze na wypłaty,
- **przestrzegać przepisów** — Prawa bankowego, regulacji ostrożnościowych,
- **budować zaufanie klientów** — bo bez niego ludzie wycofają depozyty.

## Banki specjalistyczne
**[[bank-inwestycyjny|Bank inwestycyjny]]** skupia się na rynku kapitałowym:
- operacje na rynku papierów wartościowych: działalność brokerska i dealerska, sprzedaż papierów wąskiej grupie inwestorów, pośrednictwo, projektowanie i handel instrumentami pochodnymi, organizacja emisji własnych i obcych,
- operacje na rynku pieniężnym,
- zarządzanie aktywami,
- doradztwo finansowe: restrukturyzacja firm, organizowanie kredytów konsorcjalnych, wspomagany (lewarowany) wykup przedsiębiorstw.

**[[bank-hipoteczny|Bank hipoteczny]]** udziela długich kredytów pod hipotekę i finansuje je emisją **listów zastawnych** — papierów zabezpieczonych tymi kredytami. Nad pulą zabezpieczeń czuwa **powiernik** wyznaczony przez KNF, który pilnuje interesów posiadaczy listów.

**Bank komunalny** specjalizuje się w finansowaniu samorządów i (w modelu niemieckim) obsłudze kas oszczędnościowych.

## Kasy oszczędnościowe
W modelu europejskim (szczególnie niemieckie Sparkassen) kasy oszczędnościowe to samodzielne banki uniwersalne. Organem założycielskim jest samorząd lokalny. Rada kasy wybiera zarząd, ustala warunki działania i decyduje o otwieraniu oddziałów, a zarząd prowadzi bieżącą działalność. Kasy wspierają banki komunalne: obsługują ich rozliczenia, udzielają im kredytów, obsługują kredyty konsorcjalne i emisje obligacji.

## Spółdzielczość kredytowa
**[[bank-spoldzielczy|Banki spółdzielcze]]** należą do swoich członków i działają głównie lokalnie. Założycielami mogą być tylko osoby fizyczne (art. 13 ust. 2 Prawa bankowego). Banki spółdzielcze zrzeszają się wokół banków zrzeszających, które zapewniają im rozliczenia i wsparcie płynności.

**[[skok|SKOK-i]]** (spółdzielcze kasy oszczędnościowo-kredytowe) nie są bankami, ale przyjmują oszczędności członków i udzielają im pożyczek i kredytów. Od 2012 r. nadzoruje je KNF, a ich depozyty gwarantuje BFG.

| | Bank komercyjny | Bank spółdzielczy | SKOK |
|---|---|---|---|
| Forma | zwykle spółka akcyjna | spółdzielnia | spółdzielnia |
| Właściciele | akcjonariusze | członkowie (osoby fizyczne) | członkowie (osoby fizyczne) |
| Klienci | wszyscy | wszyscy, głównie lokalnie | tylko członkowie |
| Podstawa prawna | Prawo bankowe | Prawo bankowe + Prawo spółdzielcze | ustawa o SKOK |

> !przyklad Rolnik spod Kościerzyny bierze kredyt na ciągnik w lokalnym banku spółdzielczym, którego jest członkiem. Jego córka w Gdańsku ma konto w dużym banku komercyjnym będącym spółką giełdową. Obie instytucje to banki, ale mają innych właścicieli i inny zasięg.

## Holding bankowy a konglomerat finansowy
Duże banki rzadko działają samotnie. W **holdingu bankowym** bank (lub spółka holdingowa) kontroluje spółki zależne: leasingową, faktoringową, dom maklerski, towarzystwo funduszy. **[[konglomerat-finansowy|Konglomerat finansowy]]** idzie dalej — łączy w jednej grupie istotną działalność bankową lub inwestycyjną oraz ubezpieczeniową. Taka grupa podlega dodatkowemu nadzorowi, bo problemy jednej części mogą przenieść się na inne.

> !zapamietaj System bankowy w Polsce: NBP (szczebel centralny) + banki komercyjne, spółdzielcze i specjalistyczne (szczebel operacyjny). SKOK-i działają obok, nie są bankami, ale też podlegają KNF i gwarancjom BFG.`,
            ru: `Банки не работают в пустоте. Вместе с законами и надзорными органами они образуют [[system-bankowy|банковскую систему]] — совокупность институтов и правовых норм, которые определяют организацию, сферу и принципы деятельности банков, их взаимосвязи и отношения с окружением.

## Группы банков
В типичной банковской системе выделяют:
1. **центральный банк**,
2. **операционные банки** (депозитно-кредитные, универсальные),
3. **специализированные банки** (инвестиционные, ипотечные, коммунальные),
4. **сберегательные кассы**,
5. **кредитную кооперацию**.

Польская система **двухуровневая**: наверху [[nbp|Narodowy Bank Polski]], внизу коммерческие и кооперативные банки, обслуживающие клиентов.

## Центральный банк
[[bank-centralny|Центральный банк]] не ведёт счета людей и фирм. Его задачи:
- выпуск наличных денег (банкнот и монет),
- роль **банка банков** — ведёт их счета, кредитует их, принимает резервы,
- роль **банка государства** — обслуживает бюджет, управляет валютными резервами,
- проведение денежной политики (об этом в лекции 2).

В экономике есть **два вида денег**: наличные, которые выпускает центральный банк, и безналичные (записи на счетах), которые в основном создают коммерческие банки через кредиты — механизм [[kreacja-pieniadza|создания денег]] разберём в теме 1.3.

## Операционные банки (коммерческие, универсальные)
Это банки, которые мы видим на улице: принимают депозиты, выдают кредиты, ведут расчёты. Универсальный банк делает «всё» — обслуживает население, фирмы, а часто работает и на рынке капитала. В работе он обязан:
- **сохранять ликвидность** — иметь деньги на выплаты,
- **соблюдать законы** — «Prawo bankowe», пруденциальные нормы,
- **поддерживать доверие клиентов** — без него люди заберут депозиты.

## Специализированные банки
**[[bank-inwestycyjny|Инвестиционный банк]]** сосредоточен на рынке капитала:
- операции с ценными бумагами: брокерская и дилерская деятельность, продажа бумаг узкому кругу инвесторов, посредничество, конструирование производных инструментов и торговля ими, организация собственных и чужих эмиссий,
- операции на денежном рынке,
- управление активами,
- финансовый консалтинг: реструктуризация фирм, организация синдицированных кредитов, выкуп компаний с привлечением заёмных средств.

**[[bank-hipoteczny|Ипотечный банк]]** выдаёт долгосрочные кредиты под ипотеку и финансирует их выпуском **ипотечных облигаций (listy zastawne)** — бумаг, обеспеченных этими кредитами. За пулом обеспечения следит **доверенное лицо (powiernik)**, назначенное KNF, которое защищает интересы держателей облигаций.

**Коммунальный банк** специализируется на финансировании органов местного самоуправления и (в немецкой модели) на обслуживании сберегательных касс.

## Сберегательные кассы
В европейской модели (особенно немецкие Sparkassen) сберегательные кассы — самостоятельные универсальные банки. Учредителем является орган местного самоуправления. Совет кассы избирает правление, устанавливает условия работы и решает об открытии отделений, а правление ведёт текущую деятельность. Кассы связаны с коммунальными банками: те обслуживают их расчёты, кредитуют их, ведут синдицированные кредиты и выпуск облигаций.

## Кредитная кооперация
**[[bank-spoldzielczy|Кооперативные банки]]** принадлежат своим членам и работают в основном локально. Учредителями могут быть только физические лица (ст. 13 п. 2 «Prawo bankowe»). Кооперативные банки объединяются вокруг объединяющих банков, которые обеспечивают им расчёты и поддержку ликвидности.

**[[skok|SKOK]]** (кредитно-сберегательные кооперативы) не являются банками, но принимают сбережения членов и выдают им займы и кредиты. С 2012 г. их надзирает KNF, а их депозиты гарантирует BFG.

| | Коммерческий банк | Кооперативный банк | SKOK |
|---|---|---|---|
| Форма | обычно акционерное общество | кооператив | кооператив |
| Владельцы | акционеры | члены (физические лица) | члены (физические лица) |
| Клиенты | все | все, в основном местные | только члены |
| Правовая основа | «Prawo bankowe» | «Prawo bankowe» + закон о кооперативах | закон о SKOK |

> !przyklad Фермер из-под Косьцежины берёт кредит на трактор в местном кооперативном банке, членом которого он является. Его дочь в Гданьске держит счёт в крупном коммерческом банке — публичной акционерной компании. Оба учреждения — банки, но у них разные владельцы и разный масштаб.

## Банковский холдинг и финансовый конгломерат
Крупные банки редко работают в одиночку. В **банковском холдинге** банк (или холдинговая компания) контролирует дочерние фирмы: лизинговую, факторинговую, брокерский дом, управляющую компанию фондов. **[[konglomerat-finansowy|Финансовый конгломерат]]** идёт дальше — объединяет в одной группе существенную банковскую или инвестиционную и страховую деятельность. Такая группа находится под дополнительным надзором, потому что проблемы одной части могут перейти на другие.

> !zapamietaj Банковская система Польши: NBP (центральный уровень) + коммерческие, кооперативные и специализированные банки (операционный уровень). SKOK работают рядом, банками не являются, но тоже подчиняются KNF и гарантиям BFG.`,
          },
          quiz: [
            { q: { pl: "Polski system bankowy jest dwuszczeblowy. Co znajduje się na górnym szczeblu?", ru: "Польская банковская система двухуровневая. Что находится на верхнем уровне?" },
              a: [{ pl: "KNF", ru: "KNF" }, { pl: "Narodowy Bank Polski", ru: "Narodowy Bank Polski" }, { pl: "Największy bank komercyjny", ru: "Крупнейший коммерческий банк" }, { pl: "Ministerstwo Finansów", ru: "Министерство финансов" }],
              correct: 1, why: { pl: "Szczebel centralny to bank centralny (NBP), operacyjny — banki obsługujące klientów.", ru: "Центральный уровень — центральный банк (NBP), операционный — банки, обслуживающие клиентов." } },
            { q: { pl: "Czym bank hipoteczny finansuje udzielane kredyty?", ru: "Чем ипотечный банк финансирует выдаваемые кредиты?" },
              a: [{ pl: "Depozytami na żądanie", ru: "Депозитами до востребования" }, { pl: "Kredytem z NBP", ru: "Кредитом NBP" }, { pl: "Emisją listów zastawnych", ru: "Выпуском ипотечных облигаций (listy zastawne)" }, { pl: "Dotacjami z budżetu", ru: "Бюджетными дотациями" }],
              correct: 2, why: { pl: "Listy zastawne to długie papiery zabezpieczone kredytami hipotecznymi — pasują terminem do długich kredytów.", ru: "Ипотечные облигации — долгие бумаги, обеспеченные ипотечными кредитами, — по сроку совпадают с долгими кредитами." } },
            { q: { pl: "Kto może być założycielem banku spółdzielczego?", ru: "Кто может быть учредителем кооперативного банка?" },
              a: [{ pl: "Tylko osoby fizyczne", ru: "Только физические лица" }, { pl: "Tylko gminy", ru: "Только гмины" }, { pl: "Tylko Skarb Państwa", ru: "Только государственная казна" }, { pl: "Co najmniej 3 osoby prawne", ru: "Не менее 3 юридических лиц" }],
              correct: 0, why: { pl: "Art. 13 ust. 2 Prawa bankowego: założycielami banku spółdzielczego mogą być tylko osoby fizyczne.", ru: "Ст. 13 п. 2 «Prawo bankowe»: учредителями кооперативного банка могут быть только физические лица." } },
            { q: { pl: "Organizowanie emisji akcji i doradztwo przy wykupie firmy to domena:", ru: "Организация выпуска акций и консультирование при выкупе компании — сфера:" },
              a: [{ pl: "banku hipotecznego", ru: "ипотечного банка" }, { pl: "SKOK", ru: "SKOK" }, { pl: "banku centralnego", ru: "центрального банка" }, { pl: "banku inwestycyjnego", ru: "инвестиционного банка" }],
              correct: 3, why: { pl: "Bank inwestycyjny działa na rynku kapitałowym: emisje, obrót, zarządzanie aktywami, doradztwo.", ru: "Инвестиционный банк работает на рынке капитала: эмиссии, торговля, управление активами, консалтинг." } },
            { q: { pl: "Konglomerat finansowy różni się od zwykłego holdingu bankowego tym, że:", ru: "Финансовый конгломерат отличается от обычного банковского холдинга тем, что:" },
              a: [{ pl: "nie ma w nim banku", ru: "в нём нет банка" }, { pl: "łączy działalność bankową lub inwestycyjną z ubezpieczeniową", ru: "объединяет банковскую или инвестиционную деятельность со страховой" }, { pl: "nie podlega żadnemu nadzorowi", ru: "не подлежит никакому надзору" }, { pl: "może działać tylko za granicą", ru: "может работать только за границей" }],
              correct: 1, why: { pl: "Konglomerat obejmuje co najmniej dwa sektory (bankowo-inwestycyjny i ubezpieczeniowy) i ma dodatkowy nadzór.", ru: "Конгломерат охватывает минимум два сектора (банковско-инвестиционный и страховой) и имеет дополнительный надзор." } },
          ],
        },
        // ------------------------------------------------------------------ 1.3
        {
          id: "1.3",
          title: { pl: "Modele systemu finansowego i funkcje banków", ru: "Модели финансовой системы и функции банков" },
          src: "Podstawy bankowości, slajdy 25–32",
          body: {
            pl: `Firma, która potrzebuje pieniędzy na rozwój, ma dwie drogi: pójść do banku po kredyt albo sprzedać inwestorom akcje lub obligacje. Kraje różnią się tym, która droga dominuje.

## Dwa modele systemu finansowego
**Model anglosaski** (USA, Wielka Brytania) opiera się na **rynku kapitałowym**. Firmy finansują się głównie emisją akcji i obligacji, a ważną rolę grają inwestorzy instytucjonalni (fundusze emerytalne, inwestycyjne).

**Model niemiecko-japoński** (Niemcy, Japonia, w dużej mierze kontynentalna Europa i Polska) opiera się na **bankach**. Firma ma „swój” bank, z którym współpracuje latami, a bank często jest też jej akcjonariuszem.

| | Model anglosaski | Model niemiecko-japoński |
|---|---|---|
| Główne źródło finansowania | rynek akcji i obligacji | kredyt bankowy |
| Zalety | kluczowa rola rynków akcji i obligacji, wspiera inwestorów instytucjonalnych, pobudza innowacje finansowe | finansowanie na podstawie umów, długoterminowa relacja bank–firma, silne banki uniwersalne |
| Wady | anonimowy rynek papierów, nastawienie na częstą zmianę partnerów, sformalizowane transakcje | wąski wachlarz instrumentów, opóźnienia w innowacjach finansowych, mniejsza odporność na konkurencję innych instytucji finansowych |

> !przyklad Amerykański start-up technologiczny szybko wchodzi na giełdę i zbiera pieniądze od tysięcy anonimowych inwestorów. Niemiecka rodzinna firma produkująca maszyny od 40 lat finansuje się w tym samym banku, który zna każdą jej inwestycję.

## Funkcje banków w gospodarce
Banki pełnią dwie ogólne funkcje:
- **funkcję komercyjną** — działają jak firmy i zarabiają dla właścicieli,
- **funkcję służebną** — obsługują gospodarkę: płatności, oszczędności, finansowanie.

Do zadań banków w gospodarce rynkowej należą m.in.: tworzenie pieniądza, przeprowadzanie rozliczeń, gromadzenie oszczędności, finansowanie inwestycji i konsumpcji, udział w społecznym podziale pracy oraz transformacja środków.

## Mechanizm kreacji pieniądza
Banki komercyjne nie drukują banknotów, ale **tworzą pieniądz bezgotówkowy**. Jak? Bank musi zatrzymać tylko część depozytu jako [[rezerwa-obowiazkowa|rezerwę obowiązkową]], a resztę może pożyczyć. Pożyczone pieniądze trafiają na konto w innym banku jako nowy depozyt — i proces się powtarza.

Przykład z wykładu przy stopie rezerwy 3,5%:

| Bank | Depozyt | Rezerwa (3,5%) | Kredyt |
|---|---|---|---|
| I | 1000,00 | 35,00 | 965,00 |
| II | 965,00 | 33,78 | 931,22 |
| III | 931,22 | 32,59 | 898,63 |
| … | … | … | … |
| Ogółem | 28 571,43 | 1000,00 | 27 571,43 |

Suma depozytów to depozyt początkowy razy **mnożnik kreacji pieniądza** = 1 / stopa rezerwy = 1 / 0,035 ≈ 28,57. Z 1000 zł powstaje więc maksymalnie ok. 28 571 zł depozytów, z czego 27 571 zł to nowe kredyty.

> !zapamietaj Maksymalna kreacja depozytów = depozyt początkowy × 1/r, gdzie r to stopa rezerwy obowiązkowej. Im niższa rezerwa, tym więcej pieniądza mogą stworzyć banki.

> !uwaga To wartość teoretyczna. W praktyce część pieniędzy ludzie trzymają w gotówce, banki trzymają nadwyżki rezerw, a nie każdy chce się zadłużać — więc realny mnożnik jest mniejszy.

## Udział w społecznym podziale pracy
Bez banków każdy, kto ma oszczędności, musiałby sam szukać kogoś, komu je pożyczy, i sam sprawdzać, czy ta osoba odda. Banki przejmują tę pracę i specjalizują się w niej — tak jak piekarz specjalizuje się w pieczeniu chleba. Dzięki temu cały system działa taniej.

## Alokacja i transformacja środków
Bank przekształca pieniądze oszczędzających w formę potrzebną pożyczającym. Wyróżnia się cztery transformacje:
1. **Transformacja informacji** — oszczędzający nie musi wiedzieć nic o kredytobiorcy; bank zbiera i analizuje informacje za niego.
2. **Transformacja kwot** — wiele małych depozytów składa się na jeden duży kredyt (np. dla fabryki).
3. **[[transformacja-terminow|Transformacja terminów]]** — krótkie depozyty (np. na miesiąc) finansują długie kredyty (np. na 30 lat). Działa, bo nie wszyscy wypłacają pieniądze naraz.
4. **Transformacja ryzyka** — deponent ryzykuje mniej, niż gdyby sam pożyczał jednej osobie, bo bank rozkłada ryzyko na tysiące kredytów i ma kapitał na straty.

> !przyklad 2000 osób trzyma w banku po 5 000 zł na miesięcznych lokatach. Bank udziela z tego jednego kredytu 10 mln zł na 20 lat dla firmy budującej halę. To jednocześnie transformacja kwot, terminów i ryzyka.`,
            ru: `У фирмы, которой нужны деньги на развитие, два пути: взять кредит в банке или продать инвесторам акции или облигации. Страны различаются тем, какой путь преобладает.

## Две модели финансовой системы
**Англосаксонская модель** (США, Великобритания) опирается на **рынок капитала**. Фирмы финансируются в основном выпуском акций и облигаций, а важную роль играют институциональные инвесторы (пенсионные и инвестиционные фонды).

**Германо-японская модель** (Германия, Япония, во многом континентальная Европа и Польша) опирается на **банки**. У фирмы есть «свой» банк, с которым она сотрудничает годами, а банк нередко ещё и её акционер.

| | Англосаксонская модель | Германо-японская модель |
|---|---|---|
| Главный источник финансирования | рынок акций и облигаций | банковский кредит |
| Преимущества | ключевая роль рынков акций и облигаций, поддержка институциональных инвесторов, стимул к финансовым инновациям | финансирование на основе договоров, долгосрочные отношения банк–фирма, сильные универсальные банки |
| Недостатки | анонимный рынок бумаг, ориентация на частую смену партнёров, формализация сделок | узкий набор инструментов, запаздывание финансовых инноваций, меньшая устойчивость к конкуренции других финансовых институтов |

> !przyklad Американский технологический стартап быстро выходит на биржу и собирает деньги у тысяч анонимных инвесторов. Немецкая семейная фирма, производящая станки, 40 лет финансируется в одном и том же банке, который знает каждое её вложение.

## Функции банков в экономике
У банков две общие функции:
- **коммерческая** — они работают как фирмы и зарабатывают для владельцев,
- **обслуживающая (służebna)** — они обслуживают экономику: платежи, сбережения, финансирование.

К задачам банков в рыночной экономике относятся: создание денег, проведение расчётов, накопление сбережений, финансирование инвестиций и потребления, участие в общественном разделении труда и трансформация средств.

## Механизм создания денег
Коммерческие банки не печатают банкноты, но **создают безналичные деньги**. Как? Банк обязан оставить лишь часть депозита как [[rezerwa-obowiazkowa|обязательный резерв]], а остальное может одолжить. Одолженные деньги попадают на счёт в другом банке как новый депозит — и процесс повторяется.

Пример из лекции при норме резерва 3,5%:

| Банк | Депозит | Резерв (3,5%) | Кредит |
|---|---|---|---|
| I | 1000,00 | 35,00 | 965,00 |
| II | 965,00 | 33,78 | 931,22 |
| III | 931,22 | 32,59 | 898,63 |
| … | … | … | … |
| Итого | 28 571,43 | 1000,00 | 27 571,43 |

Сумма депозитов равна первоначальному депозиту, умноженному на **денежный мультипликатор** = 1 / норма резерва = 1 / 0,035 ≈ 28,57. Из 1000 злотых возникает максимум около 28 571 злотых депозитов, из них 27 571 злотых — новые кредиты.

> !zapamietaj Максимальное создание депозитов = первоначальный депозит × 1/r, где r — норма обязательного резерва. Чем ниже резерв, тем больше денег могут создать банки.

> !uwaga Это теоретическая величина. На практике часть денег люди держат наличными, банки держат избыточные резервы, а не все хотят брать в долг — поэтому реальный мультипликатор меньше.

## Участие в общественном разделении труда
Без банков каждый, у кого есть сбережения, должен был бы сам искать, кому их одолжить, и сам проверять, вернёт ли тот деньги. Банки берут эту работу на себя и специализируются на ней — как пекарь специализируется на выпечке хлеба. Благодаря этому вся система работает дешевле.

## Аллокация и трансформация средств
Банк превращает деньги сберегающих в форму, нужную заёмщикам. Выделяют четыре трансформации:
1. **Трансформация информации** — вкладчику не нужно ничего знать о заёмщике; банк собирает и анализирует информацию за него.
2. **Трансформация сумм** — много мелких депозитов складываются в один крупный кредит (например, для завода).
3. **[[transformacja-terminow|Трансформация сроков]]** — короткие депозиты (например, на месяц) финансируют длинные кредиты (например, на 30 лет). Это работает, потому что не все забирают деньги одновременно.
4. **Трансформация риска** — вкладчик рискует меньше, чем если бы сам одалживал одному человеку, потому что банк распределяет риск на тысячи кредитов и имеет капитал на покрытие убытков.

> !przyklad 2000 человек держат в банке по 5 000 злотых на месячных вкладах. Банк выдаёт из этих денег один кредит на 10 млн злотых на 20 лет фирме, строящей склад. Это одновременно трансформация сумм, сроков и риска.`,
          },
          quiz: [
            { q: { pl: "W modelu anglosaskim firmy finansują się głównie przez:", ru: "В англосаксонской модели фирмы финансируются в основном через:" },
              a: [{ pl: "kredyt w „swoim” banku", ru: "кредит в «своём» банке" }, { pl: "dotacje państwowe", ru: "государственные дотации" }, { pl: "rynek akcji i obligacji", ru: "рынок акций и облигаций" }, { pl: "pożyczki od rodziny", ru: "займы у родственников" }],
              correct: 2, why: { pl: "Model anglosaski opiera się na rynku kapitałowym, niemiecko-japoński — na bankach.", ru: "Англосаксонская модель опирается на рынок капитала, германо-японская — на банки." } },
            { q: { pl: "Wadą modelu niemiecko-japońskiego jest:", ru: "Недостатком германо-японской модели является:" },
              a: [{ pl: "opóźnienie we wprowadzaniu innowacji finansowych", ru: "запаздывание финансовых инноваций" }, { pl: "anonimowość rynku papierów", ru: "анонимность рынка бумаг" }, { pl: "brak silnych banków", ru: "отсутствие сильных банков" }, { pl: "częsta zmiana partnerów biznesowych", ru: "частая смена деловых партнёров" }],
              correct: 0, why: { pl: "Wady tego modelu to wąski wachlarz instrumentów, wolniejsze innowacje i mniejsza odporność na konkurencję.", ru: "Недостатки модели — узкий набор инструментов, медленные инновации и меньшая устойчивость к конкуренции." } },
            { q: { pl: "Stopa rezerwy obowiązkowej wynosi 3,5%. Jaki jest teoretyczny mnożnik kreacji pieniądza?", ru: "Норма обязательного резерва 3,5%. Каков теоретический денежный мультипликатор?" },
              a: [{ pl: "3,5", ru: "3,5" }, { pl: "ok. 28,57", ru: "около 28,57" }, { pl: "ok. 9,65", ru: "около 9,65" }, { pl: "100", ru: "100" }],
              correct: 1, why: { pl: "Mnożnik = 1 / 0,035 ≈ 28,57; z 1000 zł powstaje maksymalnie ok. 28 571 zł depozytów.", ru: "Мультипликатор = 1 / 0,035 ≈ 28,57; из 1000 злотых возникает максимум около 28 571 злотых депозитов." } },
            { q: { pl: "Finansowanie 30-letnich kredytów z miesięcznych depozytów to transformacja:", ru: "Финансирование 30-летних кредитов из месячных депозитов — это трансформация:" },
              a: [{ pl: "informacji", ru: "информации" }, { pl: "kwot", ru: "сумм" }, { pl: "waluty", ru: "валюты" }, { pl: "terminów", ru: "сроков" }],
              correct: 3, why: { pl: "Transformacja terminów zamienia krótkie źródła finansowania na długie kredyty.", ru: "Трансформация сроков превращает короткие источники финансирования в долгие кредиты." } },
            { q: { pl: "Dlaczego realny mnożnik kreacji jest mniejszy od teoretycznego?", ru: "Почему реальный мультипликатор меньше теоретического?" },
              a: [{ pl: "Bo NBP zabrania udzielania kredytów", ru: "Потому что NBP запрещает выдавать кредиты" }, { pl: "Bo część pieniędzy zostaje w gotówce, a banki trzymają nadwyżki rezerw", ru: "Потому что часть денег остаётся наличными, а банки держат избыточные резервы" }, { pl: "Bo depozyty nie są oprocentowane", ru: "Потому что на депозиты не начисляются проценты" }, { pl: "Bo rezerwa wynosi 100%", ru: "Потому что резерв равен 100%" }],
              correct: 1, why: { pl: "Odpływ gotówki, nadwyżkowe rezerwy i mniejszy popyt na kredyt przerywają łańcuch kreacji.", ru: "Утечка наличных, избыточные резервы и меньший спрос на кредит прерывают цепочку создания денег." } },
          ],
        },
        // ------------------------------------------------------------------ 1.4
        {
          id: "1.4",
          title: { pl: "Sieć bezpieczeństwa, trendy i kryzysy", ru: "Сеть безопасности, тенденции и кризисы" },
          src: "Podstawy bankowości, slajdy 33–38",
          body: {
            pl: `Bank żyje z zaufania. Jeśli ludzie uwierzą, że bank upadnie, wszyscy naraz pójdą po swoje pieniądze — i bank rzeczywiście upadnie, bo pieniądze są pożyczone na lata. Dlatego wokół banków zbudowano [[siec-bezpieczenstwa|sieć bezpieczeństwa finansowego]].

## Kto tworzy sieć bezpieczeństwa
Rynek finansowy obejmuje sektor bankowy, ubezpieczeniowy i inwestycyjny. Chronią go:
1. **bank centralny** — pożyczkodawca ostatniej instancji,
2. **organ nadzoru** — udziela licencji i pilnuje zasad,
3. **instytucja gwarancyjna** — gwarantuje wypłatę depozytów w razie upadłości,
4. **regulacje prawne** — ustawy i normy ostrożnościowe.

W Polsce te role pełnią: [[nbp|NBP]], [[knf|KNF]] i [[bfg|BFG]], a całość współpracuje z ministrem finansów w Komitecie Stabilności Finansowej.

## Bank centralny w sieci bezpieczeństwa
Bank centralny:
- emituje pieniądz gotówkowy,
- jest bankiem banków i bankiem państwa,
- stabilizuje rynki finansowe,
- współuczestniczy w realizacji polityki pieniężnej państwa,
- jest [[pozyczkodawca-ostatniej-instancji|pożyczkodawcą ostatniej instancji]],
- jest „regulatorem cen pieniądza”, bo ustala stopy procentowe.

> !zapamietaj Pożyczkodawca ostatniej instancji pomaga bankom, które są **wypłacalne, ale chwilowo niepłynne** — mają dobre aktywa, ale zabrakło im gotówki. Nie ratuje banków, które straciły kapitał.

## Organy nadzoru
Nadzór działa w trzech krokach:
- **licencjonowanie** — zgoda na utworzenie banku,
- **regulacje ostrożnościowe** — określenie, co bank może robić i w jakim zakresie,
- **kontrole** — sprawdzanie, czy bank przestrzega zasad.

## Instytucje gwarancyjne
Instytucja gwarancyjna ma dwa zadania:
- **gwarantowanie depozytów** — jeśli bank upadnie, deponent dostaje pieniądze do ustawowego limitu (w UE równowartość 100 000 euro),
- **przymusowa restrukturyzacja** — uporządkowane „rozmontowanie” zagrożonego banku tak, by klienci nie stracili dostępu do usług.

Szczegóły poznamy w wykładzie 3.

| Element sieci | Instytucja w Polsce | Główne narzędzie |
|---|---|---|
| Bank centralny | NBP | kredyt płynnościowy, stopy procentowe |
| Nadzór | KNF | licencje, rekomendacje, inspekcje |
| Gwarancje | BFG | wypłata depozytów, resolution |
| Regulacje | Sejm, UE, KNF | Prawo bankowe, CRR/CRD |

## Współczesne trendy w bankowości
Bankowość zmienia się bardzo szybko. Najważniejsze kierunki:
- **cyfryzacja** — bankowość internetowa i mobilna, płatności telefonem, BLIK, zamykanie oddziałów,
- **fintechy i bigtechy** — nowe firmy technologiczne konkurują z bankami w płatnościach i kredytach,
- **konsolidacja** — fuzje i przejęcia, mniej, ale większe banki,
- **automatyzacja i sztuczna inteligencja** — scoring, chatboty, wykrywanie oszustw,
- **cyberbezpieczeństwo** — coraz większe znaczenie ochrony danych,
- **ESG i zielone finansowanie** — kredyty na inwestycje ekologiczne,
- **pieniądz cyfrowy** — prace nad walutami cyfrowymi banków centralnych (CBDC).

## Kryzysy w XXI wieku
Wykład wymienia kilka wstrząsów, które pokazały, jak ważna jest sieć bezpieczeństwa:
- **Lata 20. XX wieku** — Wielki Kryzys po krachu z 1929 r.; fala upadłości banków w USA doprowadziła m.in. do powstania systemu gwarantowania depozytów.
- **2007–2009** — globalny kryzys finansowy: kredyty subprime w USA, sekurytyzacja, upadłość Lehman Brothers w 2008 r. Państwa musiały ratować banki pieniędzmi podatników. Dlatego potem wprowadzono Bazyleę III i przymusową restrukturyzację.
- **COVID-19 (2020)** — nagłe zatrzymanie gospodarki; banki centralne obniżyły stopy i dostarczyły płynności, a nadzorcy złagodzili niektóre bufory.
- **Wojna Rosji z Ukrainą (od 2022)** — sankcje, szok cen energii i wysoka inflacja, a w konsekwencji szybkie podwyżki stóp procentowych.

> !przyklad W 2008 r. ludzie stali w kolejkach przed brytyjskim bankiem Northern Rock, żeby wypłacić oszczędności. Bank był finansowany głównie krótkoterminowo z rynku, a gdy rynek się zamknął, zabrakło mu płynności. To klasyczny „run na bank”, któremu ma zapobiegać sieć bezpieczeństwa.

> !uwaga Kryzys nie musi zaczynać się w banku. Pandemia czy wojna to szoki zewnętrzne, ale przez kredyty, depozyty i rynki szybko przenoszą się na sektor bankowy.`,
            ru: `Банк живёт доверием. Если люди поверят, что банк рухнет, все одновременно пойдут за своими деньгами — и банк действительно рухнет, потому что деньги выданы в кредит на годы. Поэтому вокруг банков построена [[siec-bezpieczenstwa|сеть финансовой безопасности]].

## Кто образует сеть безопасности
Финансовый рынок охватывает банковский, страховой и инвестиционный сектор. Его защищают:
1. **центральный банк** — кредитор последней инстанции,
2. **надзорный орган** — выдаёт лицензии и следит за соблюдением правил,
3. **гарантийный институт** — гарантирует выплату депозитов при банкротстве,
4. **правовое регулирование** — законы и пруденциальные нормы.

В Польше эти роли выполняют [[nbp|NBP]], [[knf|KNF]] и [[bfg|BFG]], а вместе с министром финансов они сотрудничают в Комитете финансовой стабильности (Komitet Stabilności Finansowej).

## Центральный банк в сети безопасности
Центральный банк:
- выпускает наличные деньги,
- является банком банков и банком государства,
- стабилизирует финансовые рынки,
- участвует в проведении денежной политики государства,
- является [[pozyczkodawca-ostatniej-instancji|кредитором последней инстанции]],
- выступает «регулятором цены денег», так как устанавливает процентные ставки.

> !zapamietaj Кредитор последней инстанции помогает банкам, которые **платёжеспособны, но временно неликвидны** — у них хорошие активы, но не хватило денег. Он не спасает банки, потерявшие капитал.

## Надзорные органы
Надзор работает в три шага:
- **лицензирование** — согласие на создание банка,
- **пруденциальное регулирование** — определение, что банк может делать и в каком объёме,
- **проверки** — контроль соблюдения правил.

## Гарантийные институты
У гарантийного института две задачи:
- **гарантирование депозитов** — если банк обанкротится, вкладчик получает деньги в пределах законного лимита (в ЕС — эквивалент 100 000 евро),
- **принудительная реструктуризация** — упорядоченный «разбор» проблемного банка так, чтобы клиенты не потеряли доступ к услугам.

Подробности — в лекции 3.

| Элемент сети | Институт в Польше | Главный инструмент |
|---|---|---|
| Центральный банк | NBP | кредит ликвидности, процентные ставки |
| Надзор | KNF | лицензии, рекомендации, проверки |
| Гарантии | BFG | выплата депозитов, resolution |
| Регулирование | Сейм, ЕС, KNF | «Prawo bankowe», CRR/CRD |

## Современные тенденции в банковском деле
Банковское дело меняется очень быстро. Главные направления:
- **цифровизация** — интернет- и мобильный банкинг, платежи телефоном, BLIK, закрытие отделений,
- **финтехи и бигтехи** — новые технологические компании конкурируют с банками в платежах и кредитах,
- **консолидация** — слияния и поглощения, банков меньше, но они крупнее,
- **автоматизация и искусственный интеллект** — скоринг, чат-боты, выявление мошенничества,
- **кибербезопасность** — растущее значение защиты данных,
- **ESG и зелёное финансирование** — кредиты на экологические инвестиции,
- **цифровые деньги** — работа над цифровыми валютами центральных банков (CBDC).

## Кризисы XXI века
Лекция называет несколько потрясений, которые показали, насколько важна сеть безопасности:
- **1920-е годы** — Великая депрессия после краха 1929 г.; волна банкротств банков в США привела, в частности, к созданию системы гарантирования депозитов.
- **2007–2009** — глобальный финансовый кризис: кредиты subprime в США, секьюритизация, банкротство Lehman Brothers в 2008 г. Государствам пришлось спасать банки деньгами налогоплательщиков. Поэтому затем ввели Базель III и принудительную реструктуризацию.
- **COVID-19 (2020)** — внезапная остановка экономики; центральные банки снизили ставки и дали ликвидность, а надзоры смягчили некоторые буферы.
- **Война России против Украины (с 2022)** — санкции, шок цен на энергию и высокая инфляция, а в результате — быстрое повышение процентных ставок.

> !przyklad В 2008 г. люди стояли в очередях у британского банка Northern Rock, чтобы снять сбережения. Банк финансировался в основном краткосрочно с рынка, и когда рынок закрылся, ему не хватило ликвидности. Это классическое «бегство вкладчиков» (run na bank), которое должна предотвращать сеть безопасности.

> !uwaga Кризис не обязательно начинается в банке. Пандемия или война — внешние шоки, но через кредиты, депозиты и рынки они быстро переходят в банковский сектор.`,
          },
          quiz: [
            { q: { pl: "Który element NIE należy do sieci bezpieczeństwa finansowego?", ru: "Какой элемент НЕ входит в сеть финансовой безопасности?" },
              a: [{ pl: "Bank centralny", ru: "Центральный банк" }, { pl: "Organ nadzoru", ru: "Надзорный орган" }, { pl: "Instytucja gwarancyjna", ru: "Гарантийный институт" }, { pl: "Giełda towarowa", ru: "Товарная биржа" }],
              correct: 3, why: { pl: "Sieć tworzą bank centralny, nadzór, instytucja gwarancyjna i regulacje prawne.", ru: "Сеть образуют центральный банк, надзор, гарантийный институт и правовое регулирование." } },
            { q: { pl: "Pożyczkodawca ostatniej instancji pomaga przede wszystkim bankom, które:", ru: "Кредитор последней инстанции помогает прежде всего банкам, которые:" },
              a: [{ pl: "są wypłacalne, ale chwilowo brakuje im płynności", ru: "платёжеспособны, но временно испытывают нехватку ликвидности" }, { pl: "straciły cały kapitał", ru: "потеряли весь капитал" }, { pl: "chcą rozwinąć sieć oddziałów", ru: "хотят расширить сеть отделений" }, { pl: "mają nadwyżkę gotówki", ru: "имеют избыток наличных" }],
              correct: 0, why: { pl: "Pomoc dotyczy płynności przy dobrych aktywach, a nie ratowania niewypłacalnych banków.", ru: "Помощь касается ликвидности при хороших активах, а не спасения неплатёжеспособных банков." } },
            { q: { pl: "Licencjonowanie, regulacje ostrożnościowe i kontrole to zadania:", ru: "Лицензирование, пруденциальное регулирование и проверки — задачи:" },
              a: [{ pl: "instytucji gwarancyjnej", ru: "гарантийного института" }, { pl: "organu nadzoru", ru: "надзорного органа" }, { pl: "Ministerstwa Cyfryzacji", ru: "Министерства цифровизации" }, { pl: "banku komercyjnego", ru: "коммерческого банка" }],
              correct: 1, why: { pl: "W Polsce te zadania wykonuje KNF.", ru: "В Польше эти задачи выполняет KNF." } },
            { q: { pl: "Upadłość Lehman Brothers to symbol kryzysu:", ru: "Банкротство Lehman Brothers — символ кризиса:" },
              a: [{ pl: "z lat 20. XX wieku", ru: "1920-х годов" }, { pl: "pandemii COVID-19", ru: "пандемии COVID-19" }, { pl: "finansowego 2007–2009", ru: "финансового 2007–2009 гг." }, { pl: "energetycznego 2022", ru: "энергетического 2022 г." }],
              correct: 2, why: { pl: "Lehman Brothers upadł we wrześniu 2008 r., w szczycie globalnego kryzysu finansowego.", ru: "Lehman Brothers обанкротился в сентябре 2008 г., в разгар глобального финансового кризиса." } },
            { q: { pl: "Które zadanie należy do instytucji gwarancyjnej?", ru: "Какая задача относится к гарантийному институту?" },
              a: [{ pl: "Emisja banknotów", ru: "Выпуск банкнот" }, { pl: "Ustalanie stopy referencyjnej", ru: "Установление референтной ставки" }, { pl: "Udzielanie licencji bankowych", ru: "Выдача банковских лицензий" }, { pl: "Przymusowa restrukturyzacja", ru: "Принудительная реструктуризация" }],
              correct: 3, why: { pl: "Instytucja gwarancyjna (BFG) gwarantuje depozyty i prowadzi przymusową restrukturyzację.", ru: "Гарантийный институт (BFG) гарантирует депозиты и проводит принудительную реструктуризацию." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Który element definicji banku z art. 2 Prawa bankowego uzasadnia silną regulację banków?", ru: "Какой элемент определения банка из ст. 2 «Prawo bankowe» объясняет строгое регулирование банков?" },
          a: [{ pl: "Bank jest przedsiębiorstwem", ru: "Банк — предприятие" }, { pl: "Bank obciąża ryzykiem środki powierzone pod tytułem zwrotnym", ru: "Банк рискует средствами, доверенными на возвратной основе" }, { pl: "Bank ma siedzibę w Polsce", ru: "Банк находится в Польше" }, { pl: "Bank zatrudnia pracowników", ru: "Банк нанимает сотрудников" }],
          correct: 1, why: { pl: "Bank ryzykuje cudze pieniądze, które musi oddać — to istota regulacji.", ru: "Банк рискует чужими деньгами, которые обязан вернуть, — в этом суть регулирования." } },
        { q: { pl: "Emitowanie bankowych papierów wartościowych to czynność:", ru: "Выпуск банковских ценных бумаг — это операция:" },
          a: [{ pl: "sensu stricto (art. 5 ust. 1)", ru: "sensu stricto (ст. 5 п. 1)" }, { pl: "sensu largo (art. 5 ust. 2)", ru: "sensu largo (ст. 5 п. 2)" }, { pl: "z art. 6, niebędąca czynnością bankową", ru: "из ст. 6, не являющаяся банковской" }, { pl: "zakazana bankom", ru: "запрещённая банкам" }],
          correct: 0, why: { pl: "Art. 5 ust. 1 pkt 5 Prawa bankowego.", ru: "Ст. 5 п. 1 пп. 5 «Prawo bankowe»." } },
        { q: { pl: "Wydawanie kart płatniczych przez firmę niebędącą bankiem jest:", ru: "Выпуск платёжных карт фирмой, не являющейся банком, — это:" },
          a: [{ pl: "zawsze przestępstwem", ru: "всегда преступление" }, { pl: "czynnością bankową sensu stricto", ru: "банковская операция sensu stricto" }, { pl: "dopuszczalne, ale nie jest wtedy czynnością bankową", ru: "допустимо, но тогда это не банковская операция" }, { pl: "możliwe tylko za zgodą NBP", ru: "возможно только с согласия NBP" }],
          correct: 2, why: { pl: "Karty płatnicze to czynność sensu largo — bankowa tylko wtedy, gdy wykonuje ją bank.", ru: "Платёжные карты — операция sensu largo, банковская лишь когда её выполняет банк." } },
        { q: { pl: "Który bank jest „bankiem banków”?", ru: "Какой банк является «банком банков»?" },
          a: [{ pl: "Bank hipoteczny", ru: "Ипотечный банк" }, { pl: "Bank spółdzielczy", ru: "Кооперативный банк" }, { pl: "Bank inwestycyjny", ru: "Инвестиционный банк" }, { pl: "Bank centralny", ru: "Центральный банк" }],
          correct: 3, why: { pl: "Bank centralny prowadzi rachunki banków, przyjmuje rezerwy i udziela im kredytów.", ru: "Центральный банк ведёт счета банков, принимает резервы и кредитует их." } },
        { q: { pl: "Kto czuwa nad zabezpieczeniem listów zastawnych w banku hipotecznym?", ru: "Кто следит за обеспечением ипотечных облигаций в ипотечном банке?" },
          a: [{ pl: "Powiernik", ru: "Доверенное лицо (powiernik)" }, { pl: "Rada Polityki Pieniężnej", ru: "Совет денежной политики" }, { pl: "Komornik", ru: "Судебный исполнитель" }, { pl: "Kasa Krajowa", ru: "Kasa Krajowa" }],
          correct: 0, why: { pl: "Powiernik ustanawiany przez KNF chroni interesy posiadaczy listów zastawnych.", ru: "Доверенное лицо, назначаемое KNF, защищает интересы держателей ипотечных облигаций." } },
        { q: { pl: "SKOK różni się od banku spółdzielczego tym, że:", ru: "SKOK отличается от кооперативного банка тем, что:" },
          a: [{ pl: "jest spółką akcyjną", ru: "является акционерным обществом" }, { pl: "nie jest bankiem i obsługuje tylko swoich członków", ru: "не является банком и обслуживает только своих членов" }, { pl: "nie podlega żadnemu nadzorowi", ru: "не подлежит никакому надзору" }, { pl: "emituje pieniądz gotówkowy", ru: "выпускает наличные деньги" }],
          correct: 1, why: { pl: "SKOK działa na podstawie odrębnej ustawy, obsługuje członków; nadzoruje go KNF.", ru: "SKOK действует по отдельному закону, обслуживает членов; его надзирает KNF." } },
        { q: { pl: "Długoterminowa relacja bank–firma i silne banki uniwersalne to zalety modelu:", ru: "Долгосрочные отношения банк–фирма и сильные универсальные банки — преимущества модели:" },
          a: [{ pl: "anglosaskiego", ru: "англосаксонской" }, { pl: "centralnie planowanego", ru: "централизованно планируемой" }, { pl: "niemiecko-japońskiego", ru: "германо-японской" }, { pl: "offshore", ru: "офшорной" }],
          correct: 2, why: { pl: "Model niemiecko-japoński opiera się na bankach i umowach.", ru: "Германо-японская модель опирается на банки и договоры." } },
        { q: { pl: "Przy stopie rezerwy 3,5% bank I przyjmuje 1000 zł depozytu. Ile może pożyczyć?", ru: "При норме резерва 3,5% банк I принимает депозит 1000 злотых. Сколько он может одолжить?" },
          a: [{ pl: "35 zł", ru: "35 злотых" }, { pl: "1000 zł", ru: "1000 злотых" }, { pl: "28 571 zł", ru: "28 571 злотых" }, { pl: "965 zł", ru: "965 злотых" }],
          correct: 3, why: { pl: "35 zł trafia do rezerwy, 965 zł może być kredytem.", ru: "35 злотых идут в резерв, 965 злотых можно выдать в кредит." } },
        { q: { pl: "Wiele małych depozytów finansuje jeden duży kredyt. To transformacja:", ru: "Много мелких депозитов финансируют один крупный кредит. Это трансформация:" },
          a: [{ pl: "kwot", ru: "сумм" }, { pl: "terminów", ru: "сроков" }, { pl: "informacji", ru: "информации" }, { pl: "walut", ru: "валют" }],
          correct: 0, why: { pl: "Transformacja kwot łączy małe wkłady w duże finansowanie.", ru: "Трансформация сумм объединяет мелкие вклады в крупное финансирование." } },
        { q: { pl: "Funkcja służebna banku oznacza, że bank:", ru: "Обслуживающая функция банка означает, что банк:" },
          a: [{ pl: "maksymalizuje zysk akcjonariuszy", ru: "максимизирует прибыль акционеров" }, { pl: "obsługuje gospodarkę: płatności, oszczędności, finansowanie", ru: "обслуживает экономику: платежи, сбережения, финансирование" }, { pl: "służy wyłącznie państwu", ru: "служит исключительно государству" }, { pl: "nadzoruje inne banki", ru: "надзирает за другими банками" }],
          correct: 1, why: { pl: "Funkcja komercyjna to zysk, służebna — obsługa potrzeb gospodarki.", ru: "Коммерческая функция — прибыль, обслуживающая — удовлетворение потребностей экономики." } },
        { q: { pl: "Które instytucje tworzą sieć bezpieczeństwa finansowego w Polsce?", ru: "Какие институты образуют сеть финансовой безопасности в Польше?" },
          a: [{ pl: "GPW, KDPW, ZUS", ru: "GPW, KDPW, ZUS" }, { pl: "NBP, KNF, BFG (z ministrem finansów)", ru: "NBP, KNF, BFG (с министром финансов)" }, { pl: "PKO BP, Pekao, mBank", ru: "PKO BP, Pekao, mBank" }, { pl: "UOKiK, GUS, NIK", ru: "UOKiK, GUS, NIK" }],
          correct: 1, why: { pl: "NBP, KNF i BFG współpracują z ministrem finansów w Komitecie Stabilności Finansowej.", ru: "NBP, KNF и BFG сотрудничают с министром финансов в Комитете финансовой стабильности." } },
        { q: { pl: "Holding bankowy to:", ru: "Банковский холдинг — это:" },
          a: [{ pl: "zrzeszenie banków spółdzielczych", ru: "объединение кооперативных банков" }, { pl: "fundusz gwarancyjny", ru: "гарантийный фонд" }, { pl: "grupa spółek kontrolowanych przez bank lub spółkę bankową", ru: "группа компаний под контролем банка или банковской компании" }, { pl: "oddział banku zagranicznego", ru: "филиал иностранного банка" }],
          correct: 2, why: { pl: "W holdingu bank kontroluje spółki zależne, np. leasingową czy dom maklerski.", ru: "В холдинге банк контролирует дочерние компании, например лизинговую или брокерскую." } },
      ],
    },
    // ================================================================== W2
    {
      n: 2,
      color: "--c2",
      title: { pl: "Polityka pieniężna i rynek pieniężny", ru: "Денежная политика и денежный рынок" },
      lead: {
        pl: "Jakie cele ma NBP i kto podejmuje decyzje, jak mierzy się ilość pieniądza, jakimi stopami i operacjami bank centralny steruje gospodarką, czym są WIBOR, WIRON i pieniądz cyfrowy banku centralnego oraz jak impuls z NBP dociera do firm i rodzin.",
        ru: "Какие цели у NBP и кто принимает решения, как измеряют количество денег, какими ставками и операциями центральный банк управляет экономикой, что такое WIBOR, WIRON и цифровые деньги центрального банка и как импульс от NBP доходит до фирм и семей.",
      },
      subs: [
        // ------------------------------------------------------------------ 2.1
        {
          id: "2.1",
          title: { pl: "NBP, RPP i cele polityki pieniężnej", ru: "NBP, RPP и цели денежной политики" },
          src: "Podstawy bankowości, slajdy 39–45, 50",
          body: {
            pl: `[[polityka-pieniezna|Polityka pieniężna]] to działania banku centralnego, które wpływają na ilość i cenę pieniądza w gospodarce. Od nich zależy, ile płacimy za kredyt, ile dostajemy na lokacie i jak szybko rosną ceny.

## Rodzaje polityki pieniężnej
- **Polityka ekspansywna (łagodna)** — bank centralny obniża stopy i zwiększa płynność, żeby pobudzić kredyt, wydatki i wzrost. Stosuje się ją w czasie [[recesja|recesji]].
- **Polityka restrykcyjna (ostra)** — bank podnosi stopy i ogranicza płynność, żeby schłodzić popyt i zbić [[inflacja|inflację]].
- **Polityka neutralna** — stopy na poziomie, który ani nie pobudza, ani nie hamuje gospodarki.

## Każdy bank centralny ma swoje cele
| Bank centralny | Główny cel |
|---|---|
| Bank Japonii | stabilność cen (cel inflacyjny 2%) |
| System Rezerwy Federalnej (Fed, USA) | podwójny mandat: maksymalne zatrudnienie i stabilne ceny (2%) |
| Europejski System Banków Centralnych (EBC) | stabilność cen w strefie euro (2% w średnim okresie) |
| Narodowy Bank Polski | stabilny poziom cen przy wspieraniu polityki gospodarczej rządu |

## Narodowy Bank Polski
Podstawowym celem [[nbp|NBP]] jest **utrzymanie stabilnego poziomu cen**, przy jednoczesnym wspieraniu polityki gospodarczej rządu, o ile nie ogranicza to celu podstawowego. W praktyce oznacza to też dbanie o zrównoważony wzrost gospodarczy.

> !zapamietaj [[cel-inflacyjny|Cel inflacyjny]] NBP to **2,5%** wzrostu cen konsumpcyjnych (CPI) rok do roku, z dopuszczalnym pasmem wahań **±1 punkt procentowy** (czyli 1,5–3,5%). Obowiązuje od 2004 r.

## Rada Polityki Pieniężnej
NBP ma trzy organy: **Prezesa NBP**, **[[rpp|Radę Polityki Pieniężnej]]** i **Zarząd NBP**. RPP to „serce” polityki pieniężnej:
- składa się z Prezesa NBP jako przewodniczącego i 9 członków, wybieranych po 3 przez Prezydenta, Sejm i Senat, na 6-letnią kadencję,
- co roku przyjmuje założenia polityki pieniężnej,
- ustala wysokość stóp procentowych NBP,
- ustala zasady i stopy rezerwy obowiązkowej,
- określa zasady operacji otwartego rynku.

Zarząd NBP realizuje uchwały RPP na co dzień, a Prezes NBP kieruje bankiem i reprezentuje go na zewnątrz.

## Cele polityki pieniężnej: trzy poziomy
Bank centralny nie może bezpośrednio „ustawić” inflacji. Dlatego działa łańcuchem celów:
1. **Cel nadrzędny (ostateczny)** — stabilność cen, w Polsce inflacja 2,5% ±1 pkt proc.
2. **Cel pośredni** — wielkość, na którą bank może wpływać i która jest powiązana z inflacją, np. prognoza inflacji, a w innych strategiach podaż pieniądza lub kurs walutowy.
3. **Cel operacyjny** — wielkość sterowana z dnia na dzień, w Polsce krótkoterminowa (jednodniowa) stopa rynku międzybankowego utrzymywana w pobliżu [[stopa-referencyjna|stopy referencyjnej]].

> !przyklad Inflacja wynosi 6% i według prognoz nie spadnie szybko do celu. RPP podnosi stopę referencyjną. NBP przez operacje otwartego rynku pilnuje, by stawka overnight poszła w górę (cel operacyjny). Kredyty drożeją, popyt słabnie, prognoza inflacji spada (cel pośredni), a w końcu spada sama inflacja (cel nadrzędny).

## Płynny kurs walutowy
Od 2000 r. Polska ma [[kurs-plynny|płynny kurs złotego]] — kształtuje się swobodnie pod wpływem popytu i podaży na rynku walutowym. NBP nie broni żadnego poziomu kursu, ale zastrzega sobie prawo do interwencji.

## Pojęcia związane z kursem walutowym
| Pojęcie | Co oznacza | W jakim reżimie |
|---|---|---|
| Dewaluacja | urzędowe obniżenie wartości waluty | kurs stały |
| Rewaluacja | urzędowe podwyższenie wartości waluty | kurs stały |
| Deprecjacja | rynkowy spadek wartości waluty | kurs płynny |
| Aprecjacja | rynkowy wzrost wartości waluty | kurs płynny |

> !uwaga Gdy kurs euro rośnie z 4,30 do 4,50 zł, to **złoty traci** (deprecjacja złotego), a nie zyskuje. Za jedno euro trzeba zapłacić więcej złotych.

Słaby złoty pomaga eksporterom (ich towary są tańsze za granicą), ale podnosi ceny importu i może zwiększać inflację. Mocny złoty działa odwrotnie. Dlatego kurs jest dla RPP ważnym sygnałem, choć nie celem.`,
            ru: `[[polityka-pieniezna|Денежная политика]] — это действия центрального банка, влияющие на количество и цену денег в экономике. От них зависит, сколько мы платим за кредит, сколько получаем по вкладу и как быстро растут цены.

## Виды денежной политики
- **Экспансионистская (мягкая) политика** — центральный банк снижает ставки и увеличивает ликвидность, чтобы стимулировать кредит, расходы и рост. Её применяют во время [[recesja|рецессии]].
- **Рестриктивная (жёсткая) политика** — банк повышает ставки и ограничивает ликвидность, чтобы охладить спрос и сбить [[inflacja|инфляцию]].
- **Нейтральная политика** — ставки на уровне, который ни стимулирует, ни тормозит экономику.

## У каждого центрального банка свои цели
| Центральный банк | Главная цель |
|---|---|
| Банк Японии | стабильность цен (инфляционная цель 2%) |
| Федеральная резервная система (ФРС, США) | двойной мандат: максимальная занятость и стабильные цены (2%) |
| Европейская система центральных банков (ЕЦБ) | стабильность цен в еврозоне (2% в среднесрочной перспективе) |
| Narodowy Bank Polski | стабильный уровень цен при поддержке экономической политики правительства |

## Narodowy Bank Polski
Основная цель [[nbp|NBP]] — **поддержание стабильного уровня цен** при одновременной поддержке экономической политики правительства, если это не мешает основной цели. На практике это означает и заботу об устойчивом экономическом росте.

> !zapamietaj [[cel-inflacyjny|Инфляционная цель]] NBP — **2,5%** роста потребительских цен (CPI) год к году с допустимым диапазоном колебаний **±1 процентный пункт** (то есть 1,5–3,5%). Действует с 2004 г.

## Совет денежной политики
У NBP три органа: **Президент NBP**, **[[rpp|Совет денежной политики (RPP)]]** и **Правление NBP**. RPP — «сердце» денежной политики:
- состоит из Президента NBP как председателя и 9 членов, которых по 3 избирают Президент, Сейм и Сенат на 6-летний срок,
- ежегодно принимает основные направления денежной политики,
- устанавливает процентные ставки NBP,
- устанавливает принципы и нормы обязательного резерва,
- определяет принципы операций на открытом рынке.

Правление NBP ежедневно исполняет решения RPP, а Президент NBP руководит банком и представляет его вовне.

## Цели денежной политики: три уровня
Центральный банк не может напрямую «установить» инфляцию. Поэтому он действует через цепочку целей:
1. **Высшая (конечная) цель** — стабильность цен, в Польше инфляция 2,5% ±1 п.п.
2. **Промежуточная цель** — величина, на которую банк может влиять и которая связана с инфляцией, например прогноз инфляции, а в других стратегиях — денежная масса или валютный курс.
3. **Операционная цель** — величина, которой управляют ежедневно, в Польше краткосрочная (однодневная) ставка межбанковского рынка, удерживаемая около [[stopa-referencyjna|референтной ставки]].

> !przyklad Инфляция 6%, и по прогнозам она не скоро вернётся к цели. RPP повышает референтную ставку. NBP через операции на открытом рынке следит, чтобы ставка овернайт пошла вверх (операционная цель). Кредиты дорожают, спрос слабеет, прогноз инфляции снижается (промежуточная цель), а в итоге снижается и сама инфляция (конечная цель).

## Плавающий валютный курс
С 2000 г. в Польше [[kurs-plynny|плавающий курс злотого]] — он свободно формируется спросом и предложением на валютном рынке. NBP не защищает никакой уровень курса, но оставляет за собой право на интервенции.

## Понятия, связанные с валютным курсом
| Понятие | Что означает | При каком режиме |
|---|---|---|
| Девальвация (dewaluacja) | официальное снижение стоимости валюты | фиксированный курс |
| Ревальвация (rewaluacja) | официальное повышение стоимости валюты | фиксированный курс |
| Обесценение (deprecjacja) | рыночное падение стоимости валюты | плавающий курс |
| Удорожание (aprecjacja) | рыночный рост стоимости валюты | плавающий курс |

> !uwaga Когда курс евро растёт с 4,30 до 4,50 злотых, **злотый слабеет** (обесценение злотого), а не укрепляется. За один евро нужно заплатить больше злотых.

Слабый злотый помогает экспортёрам (их товары за границей дешевле), но повышает цены импорта и может усиливать инфляцию. Сильный злотый действует наоборот. Поэтому курс — важный сигнал для RPP, хотя и не цель.`,
          },
          quiz: [
            { q: { pl: "Jaki jest cel inflacyjny NBP?", ru: "Какова инфляционная цель NBP?" },
              a: [{ pl: "2% bez pasma wahań", ru: "2% без диапазона колебаний" }, { pl: "0%", ru: "0%" }, { pl: "2,5% ±1 punkt procentowy", ru: "2,5% ±1 процентный пункт" }, { pl: "3,5% ±0,5 punktu", ru: "3,5% ±0,5 пункта" }],
              correct: 2, why: { pl: "Ciągły cel inflacyjny NBP od 2004 r.: 2,5% CPI r/r z pasmem ±1 pkt proc.", ru: "Постоянная цель NBP с 2004 г.: 2,5% CPI г/г с диапазоном ±1 п.п." } },
            { q: { pl: "Kto ustala wysokość stóp procentowych NBP?", ru: "Кто устанавливает процентные ставки NBP?" },
              a: [{ pl: "Rada Polityki Pieniężnej", ru: "Совет денежной политики (RPP)" }, { pl: "Minister finansów", ru: "Министр финансов" }, { pl: "KNF", ru: "KNF" }, { pl: "Sejm w ustawie budżetowej", ru: "Сейм в законе о бюджете" }],
              correct: 0, why: { pl: "RPP ustala stopy procentowe, zasady rezerwy obowiązkowej i operacji otwartego rynku.", ru: "RPP устанавливает ставки, правила обязательного резерва и операций на открытом рынке." } },
            { q: { pl: "Który bank centralny ma „podwójny mandat”: zatrudnienie i stabilne ceny?", ru: "У какого центрального банка «двойной мандат»: занятость и стабильные цены?" },
              a: [{ pl: "Bank Japonii", ru: "Банк Японии" }, { pl: "Fed", ru: "ФРС" }, { pl: "NBP", ru: "NBP" }, { pl: "EBC", ru: "ЕЦБ" }],
              correct: 1, why: { pl: "System Rezerwy Federalnej dąży do maksymalnego zatrudnienia i stabilnych cen.", ru: "ФРС стремится к максимальной занятости и стабильным ценам." } },
            { q: { pl: "Kurs EUR/PLN spada z 4,50 do 4,30 przy kursie płynnym. To:", ru: "Курс EUR/PLN снижается с 4,50 до 4,30 при плавающем курсе. Это:" },
              a: [{ pl: "dewaluacja złotego", ru: "девальвация злотого" }, { pl: "deprecjacja złotego", ru: "обесценение злотого" }, { pl: "rewaluacja euro", ru: "ревальвация евро" }, { pl: "aprecjacja złotego", ru: "удорожание злотого" }],
              correct: 3, why: { pl: "Za euro płacimy mniej złotych, więc złoty rynkowo zyskuje — to aprecjacja.", ru: "За евро платим меньше злотых, значит злотый рыночно укрепляется — это удорожание (aprecjacja)." } },
            { q: { pl: "Celem operacyjnym NBP jest:", ru: "Операционная цель NBP:" },
              a: [{ pl: "utrzymanie jednodniowej stopy rynku międzybankowego blisko stopy referencyjnej", ru: "удержание однодневной межбанковской ставки около референтной" }, { pl: "inflacja 2,5%", ru: "инфляция 2,5%" }, { pl: "stały kurs złotego wobec euro", ru: "фиксированный курс злотого к евро" }, { pl: "zerowe bezrobocie", ru: "нулевая безработица" }],
              correct: 0, why: { pl: "Cel operacyjny jest sterowany codziennie; inflacja to cel nadrzędny.", ru: "Операционной целью управляют ежедневно; инфляция — конечная цель." } },
          ],
        },
        // ------------------------------------------------------------------ 2.2
        {
          id: "2.2",
          title: { pl: "Agregaty pieniężne, stopy NBP i WIBOR a WIRON", ru: "Денежные агрегаты, ставки NBP, WIBOR и WIRON" },
          src: "Podstawy bankowości, slajdy 46–49, 163",
          body: {
            pl: `Żeby sterować pieniądzem, trzeba go najpierw zmierzyć. A potem mieć narzędzia, którymi da się go „przykręcić” lub „odkręcić”.

## Agregaty pieniężne
[[agregaty-pieniezne|Agregaty pieniężne]] to miary ilości pieniądza, ułożone od najbardziej płynnych do coraz szerszych:

| Agregat | Co obejmuje (według wykładu) |
|---|---|
| M0 | gotówka w obiegu, w kasach banków i środki na rachunkach banków w banku centralnym (baza monetarna) |
| M1 | M0 + depozyty na rachunkach bankowych płatne na żądanie |
| M2 | M1 + wkłady oszczędnościowe na krótki i średni okres, depozyty terminowe |
| M3 | M2 + wkłady oszczędnościowe na długi termin i inne mniej płynne instrumenty |

> !uwaga Definicje agregatów różnią się nieco między krajami i podręcznikami. NBP i EBC liczą M1, M2 i M3 według metodologii europejskiej; w zadaniach trzymaj się zasady: każdy kolejny agregat = poprzedni + mniej płynne składniki.

## Stopy procentowe NBP
RPP ustala pięć stóp, które tworzą „korytarz” dla rynku:

| Stopa | Do czego służy |
|---|---|
| **[[stopa-referencyjna|Referencyjna]]** | główna stopa; wyznacza rentowność podstawowych operacji otwartego rynku (bonów pieniężnych NBP) |
| **Lombardowa** | oprocentowanie kredytu lombardowego (overnight pod zastaw papierów) — górna granica korytarza |
| **Depozytowa** | oprocentowanie lokaty jednodniowej banku w NBP — dolna granica korytarza |
| **Redyskontowa weksli** | po tej stopie NBP odkupuje od banków weksle |
| **Dyskontowa weksli** | stosowana przy dyskoncie weksli przez NBP |

> !zapamietaj Stopa lombardowa > referencyjna > depozytowa. Żaden bank nie pożyczy na rynku drożej niż w NBP (lombard) ani nie ulokuje taniej niż w NBP (depozyt), więc stawki rynkowe overnight wahają się w tym korytarzu, zwykle blisko stopy referencyjnej.

Oprócz stóp NBP ma też [[rezerwa-obowiazkowa|rezerwę obowiązkową]] i interwencje walutowe.

## Jak NBP wpływa na podaż pieniądza: operacje otwartego rynku
[[operacje-otwartego-rynku|Operacje otwartego rynku]] to transakcje NBP z bankami na papierach wartościowych:
- **Transakcja repo** (z punktu widzenia NBP: zakup papierów z przyrzeczeniem odsprzedaży) — NBP daje bankom gotówkę pod zastaw papierów, czyli **zasila** system w płynność.
- **Transakcja reverse repo** (sprzedaż papierów z przyrzeczeniem odkupu) — NBP zabiera pieniądze z rynku, czyli **absorbuje** płynność.
- **Emisja bonów pieniężnych NBP** — podstawowa operacja w Polsce. Polski sektor bankowy ma zwykle nadwyżkę płynności, więc NBP regularnie ją „ściąga”, sprzedając bankom 7-dniowe bony oprocentowane według stopy referencyjnej.

> !uwaga Nazewnictwo repo/reverse repo zależy od tego, z czyjej strony patrzymy. Najważniejsze, by pamiętać kierunek: czy bank centralny **dodaje** pieniądze bankom, czy je **zabiera**.

## WIBOR a WIRON
Banki pożyczają sobie pieniądze nawzajem. Cena tych pożyczek staje się wskaźnikiem dla kredytów klientów.

[[wibor|WIBOR]] (Warsaw Interbank Offered Rate) to stawka, po której banki **deklarują**, że są gotowe udzielić lokaty innym bankom, na różne terminy (np. 1M, 3M, 6M). Większość kredytów hipotecznych o zmiennym oprocentowaniu w Polsce liczona była jako WIBOR 3M lub 6M + marża banku.

[[wiron|WIRON]] (Warsaw Interest Rate Overnight) to wskaźnik **transakcyjny** — liczony z rzeczywistych depozytów jednodniowych, które banki przyjęły od instytucji finansowych i dużych firm.

| | WIBOR | WIRON |
|---|---|---|
| Podstawa | deklaracje (kwotowania) banków panelowych | rzeczywiste transakcje overnight |
| Charakter | „patrzy w przyszłość” — stawka na 3 czy 6 miesięcy znana z góry | „patrzy wstecz” — stopa składana za miniony okres |
| Zaleta | rata znana z wyprzedzeniem | trudniej manipulować, zgodny z unijnym rozporządzeniem BMR |
| Wada | ryzyko oderwania od transakcji | mniej znany klientom, trudniejszy do przewidzenia |

W 2022 r. Narodowa Grupa Robocza ds. reformy wskaźników wskazała WIRON jako następcę WIBOR. W 2025 r. plan zmieniono i jako docelowy wskaźnik wybrano nowy indeks **POLSTR**, a harmonogram wygaszania WIBOR przesunięto. To temat „w ruchu”, dlatego warto sprawdzać aktualne komunikaty.

> !przyklad Kredyt 400 000 zł oprocentowany WIBOR 6M + 2% marży. Jeśli WIBOR 6M wzrośnie o 1 pkt proc., oprocentowanie kredytu też rośnie o 1 pkt proc. przy najbliższej aktualizacji, a odsetki w pierwszym roku są wyższe o ok. 4 000 zł. Sama marża pozostaje bez zmian.`,
            ru: `Чтобы управлять деньгами, их сначала нужно измерить. А затем иметь инструменты, которыми можно их «прикрутить» или «открутить».

## Денежные агрегаты
[[agregaty-pieniezne|Денежные агрегаты]] — это показатели количества денег, расположенные от самых ликвидных к всё более широким:

| Агрегат | Что включает (по лекции) |
|---|---|
| M0 | наличные в обращении, в кассах банков и средства банков на счетах в центральном банке (денежная база) |
| M1 | M0 + депозиты до востребования на банковских счетах |
| M2 | M1 + сберегательные вклады на короткий и средний срок, срочные депозиты |
| M3 | M2 + долгосрочные сберегательные вклады и другие менее ликвидные инструменты |

> !uwaga Определения агрегатов немного различаются по странам и учебникам. NBP и ЕЦБ считают M1, M2 и M3 по европейской методологии; в задачах держитесь правила: каждый следующий агрегат = предыдущий + менее ликвидные составляющие.

## Процентные ставки NBP
RPP устанавливает пять ставок, которые образуют «коридор» для рынка:

| Ставка | Для чего служит |
|---|---|
| **[[stopa-referencyjna|Референтная]]** | главная ставка; определяет доходность основных операций на открытом рынке (денежных векселей NBP) |
| **Ломбардная** | ставка ломбардного кредита (овернайт под залог бумаг) — верхняя граница коридора |
| **Депозитная** | ставка однодневного депозита банка в NBP — нижняя граница коридора |
| **Ставка переучёта векселей (redyskontowa)** | по ней NBP выкупает у банков векселя |
| **Учётная ставка векселей (dyskontowa)** | применяется при учёте векселей в NBP |

> !zapamietaj Ломбардная > референтная > депозитная. Ни один банк не займёт на рынке дороже, чем в NBP (ломбард), и не разместит дешевле, чем в NBP (депозит), поэтому рыночные ставки овернайт колеблются в этом коридоре, обычно около референтной.

Кроме ставок у NBP есть [[rezerwa-obowiazkowa|обязательный резерв]] и валютные интервенции.

## Как NBP влияет на денежное предложение: операции на открытом рынке
[[operacje-otwartego-rynku|Операции на открытом рынке]] — это сделки NBP с банками с ценными бумагами:
- **Сделка репо** (с точки зрения NBP: покупка бумаг с обязательством обратной продажи) — NBP даёт банкам деньги под залог бумаг, то есть **добавляет** ликвидность в систему.
- **Сделка обратного репо (reverse repo)** (продажа бумаг с обязательством обратного выкупа) — NBP забирает деньги с рынка, то есть **поглощает** ликвидность.
- **Выпуск денежных векселей NBP (bony pieniężne)** — основная операция в Польше. В польском банковском секторе обычно избыток ликвидности, поэтому NBP регулярно его «стягивает», продавая банкам 7-дневные векселя под референтную ставку.

> !uwaga Названия репо/обратное репо зависят от того, с чьей стороны смотреть. Главное — помнить направление: центральный банк **добавляет** деньги банкам или **забирает** их.

## WIBOR и WIRON
Банки одалживают друг другу деньги. Цена этих займов становится ориентиром для кредитов клиентов.

[[wibor|WIBOR]] (Warsaw Interbank Offered Rate) — ставка, по которой банки **заявляют** о готовности разместить депозит в других банках на разные сроки (например, 1M, 3M, 6M). Большинство ипотечных кредитов с плавающей ставкой в Польше рассчитывались как WIBOR 3M или 6M + маржа банка.

[[wiron|WIRON]] (Warsaw Interest Rate Overnight) — **транзакционный** индикатор, рассчитываемый по реальным однодневным депозитам, которые банки приняли от финансовых учреждений и крупных фирм.

| | WIBOR | WIRON |
|---|---|---|
| Основа | заявки (котировки) банков панели | реальные сделки овернайт |
| Характер | «смотрит вперёд» — ставка на 3 или 6 месяцев известна заранее | «смотрит назад» — сложная ставка за прошедший период |
| Плюс | платёж известен заранее | труднее манипулировать, соответствует регламенту ЕС BMR |
| Минус | риск отрыва от реальных сделок | менее знаком клиентам, труднее прогнозировать |

В 2022 г. Национальная рабочая группа по реформе индикаторов (Narodowa Grupa Robocza) назвала WIRON преемником WIBOR. В 2025 г. план изменили: целевым индикатором выбрали новый индекс **POLSTR**, а график отказа от WIBOR сдвинули. Это тема «в движении», поэтому стоит следить за актуальными сообщениями.

> !przyklad Кредит 400 000 злотых под WIBOR 6M + 2% маржи. Если WIBOR 6M вырастет на 1 п.п., ставка по кредиту тоже вырастет на 1 п.п. при ближайшем пересмотре, и проценты за первый год будут выше примерно на 4 000 злотых. Сама маржа не меняется.`,
          },
          quiz: [
            { q: { pl: "Agregat M1 to:", ru: "Агрегат M1 — это:" },
              a: [{ pl: "M0 + depozyty płatne na żądanie", ru: "M0 + депозиты до востребования" }, { pl: "tylko gotówka w obiegu", ru: "только наличные в обращении" }, { pl: "M2 + długoterminowe wkłady", ru: "M2 + долгосрочные вклады" }, { pl: "suma kredytów bankowych", ru: "сумма банковских кредитов" }],
              correct: 0, why: { pl: "M1 dodaje do M0 najbardziej płynne depozyty — na żądanie.", ru: "M1 добавляет к M0 самые ликвидные депозиты — до востребования." } },
            { q: { pl: "Która stopa NBP wyznacza górną granicę korytarza stóp rynkowych?", ru: "Какая ставка NBP задаёт верхнюю границу коридора рыночных ставок?" },
              a: [{ pl: "Depozytowa", ru: "Депозитная" }, { pl: "Referencyjna", ru: "Референтная" }, { pl: "Lombardowa", ru: "Ломбардная" }, { pl: "Redyskontowa", ru: "Ставка переучёта" }],
              correct: 2, why: { pl: "Bank zawsze może pożyczyć w NBP po stopie lombardowej, więc na rynku nie zapłaci więcej.", ru: "Банк всегда может занять в NBP по ломбардной ставке, поэтому на рынке не заплатит больше." } },
            { q: { pl: "NBP sprzedaje bankom 7-dniowe bony pieniężne. Skutek dla płynności:", ru: "NBP продаёт банкам 7-дневные денежные векселя. Результат для ликвидности:" },
              a: [{ pl: "zwiększa płynność banków", ru: "увеличивает ликвидность банков" }, { pl: "nie ma wpływu", ru: "не влияет" }, { pl: "zwiększa rezerwę obowiązkową", ru: "увеличивает обязательный резерв" }, { pl: "absorbuje (zabiera) nadwyżkę płynności", ru: "поглощает (забирает) избыток ликвидности" }],
              correct: 3, why: { pl: "Banki płacą za bony pieniędzmi, które znikają z rynku do czasu wykupu.", ru: "Банки платят за векселя деньгами, которые уходят с рынка до погашения." } },
            { q: { pl: "Czym WIRON różni się od WIBOR?", ru: "Чем WIRON отличается от WIBOR?" },
              a: [{ pl: "Jest ustalany przez RPP", ru: "Его устанавливает RPP" }, { pl: "Opiera się na rzeczywistych transakcjach overnight, a nie na deklaracjach", ru: "Основан на реальных сделках овернайт, а не на заявках" }, { pl: "Jest zawsze wyższy", ru: "Он всегда выше" }, { pl: "Dotyczy tylko kredytów w euro", ru: "Касается только кредитов в евро" }],
              correct: 1, why: { pl: "WIRON to wskaźnik transakcyjny; WIBOR opiera się na kwotowaniach banków panelowych.", ru: "WIRON — транзакционный индикатор; WIBOR основан на котировках банков панели." } },
            { q: { pl: "Kredyt: WIBOR 3M + 2,5% marży. WIBOR 3M spada o 0,5 pkt proc. Co się dzieje?", ru: "Кредит: WIBOR 3M + 2,5% маржи. WIBOR 3M снижается на 0,5 п.п. Что происходит?" },
              a: [{ pl: "Oprocentowanie spada o 0,5 pkt proc., marża bez zmian", ru: "Ставка снижается на 0,5 п.п., маржа без изменений" }, { pl: "Marża rośnie o 0,5 pkt proc.", ru: "Маржа растёт на 0,5 п.п." }, { pl: "Nic, bo oprocentowanie jest stałe", ru: "Ничего, потому что ставка фиксированная" }, { pl: "Oprocentowanie spada o 2,5 pkt proc.", ru: "Ставка снижается на 2,5 п.п." }],
              correct: 0, why: { pl: "Zmienne oprocentowanie = wskaźnik + stała marża; zmienia się tylko część wskaźnikowa.", ru: "Плавающая ставка = индикатор + постоянная маржа; меняется только индикатор." } },
          ],
        },
        // ------------------------------------------------------------------ 2.3
        {
          id: "2.3",
          title: { pl: "Cyfrowa waluta banku centralnego i cyfrowe euro", ru: "Цифровая валюта центрального банка и цифровой евро" },
          src: "Podstawy bankowości, slajdy 51–54",
          body: {
            pl: `Pieniądze na koncie są cyfrowe już dziś. Ale to pieniądz **banku komercyjnego** — Twoja należność wobec banku. Jedynym pieniądzem banku centralnego dostępnym dla zwykłych ludzi jest gotówka. [[cbdc|CBDC]] miałaby to zmienić.

## Czym jest CBDC
> !zapamietaj Waluta cyfrowa banku centralnego (CBDC, central bank digital currency) to **zobowiązanie banku centralnego**, wyrażone w obowiązującej jednostce rozrachunkowej, w formie cyfrowej, które służy jako **środek wymiany** oraz **środek przechowywania wartości**.

Najprościej: to „cyfrowa gotówka”. Jest tak samo bezpieczna jak banknot, bo za nią stoi bank centralny, a nie bank komercyjny, który mógłby upaść.

| | Gotówka | Pieniądz na koncie w banku | CBDC |
|---|---|---|---|
| Kto jest dłużnikiem | bank centralny | bank komercyjny | bank centralny |
| Forma | fizyczna | cyfrowa | cyfrowa |
| Ryzyko upadłości emitenta | praktycznie brak | jest (ograniczone gwarancjami BFG) | praktycznie brak |
| Oprocentowanie | brak | możliwe | zwykle brak lub decyzja banku centralnego |

## Rodzaje CBDC
**Według użytkowników:**
- **detaliczna (retail)** — dla ludności i firm, do codziennych płatności,
- **hurtowa (wholesale)** — tylko dla banków i instytucji finansowych, do rozliczeń między nimi.

**Według technologii:**
- **oparta na rachunkach (account-based)** — bank centralny lub pośrednik prowadzi rachunek i sprawdza tożsamość posiadacza,
- **oparta na tokenach (token-based)** — jak cyfrowy banknot; liczy się, czy token jest prawdziwy, a nie kto go trzyma.

**Według architektury:**
- **bezpośrednia** — bank centralny sam obsługuje użytkowników,
- **pośrednia lub hybrydowa** — bank centralny emituje, a portfele i obsługę klientów prowadzą banki komercyjne i firmy płatnicze. Ten model wybiera większość projektów, w tym cyfrowe euro.

## Gdzie działa CBDC
Detaliczne CBDC uruchomiły już m.in.:
- **Bahamy** — Sand Dollar (2020), pierwsza w pełni wdrożona CBDC,
- **Wschodnie Karaiby** — DCash, wspólna waluta kilku wyspiarskich państw,
- **Nigeria** — eNaira (2021),
- **Jamajka** — JAM-DEX (2022).

Wiele innych krajów (np. Chiny z e-CNY) prowadzi duże pilotaże. Doświadczenia pokazują, że samo uruchomienie nie gwarantuje popularności — w kilku krajach z CBDC korzysta niewielu ludzi.

## Cyfrowe euro
[[cyfrowe-euro|Cyfrowe euro]] to projekt Europejskiego Banku Centralnego. Główne założenia:
- uzupełnienie, a nie zastąpienie gotówki,
- dostęp przez portfele w bankach i aplikacjach, płatności w całej strefie euro,
- możliwość płatności offline (bez internetu) z wysokim poziomem prywatności,
- **limit przechowywania** na osobę, żeby ludzie nie przenieśli masowo depozytów z banków do cyfrowego euro,
- podstawowe usługi bezpłatne dla użytkowników.

Komisja Europejska przedstawiła projekt rozporządzenia w czerwcu 2023 r., a EBC w listopadzie 2023 r. rozpoczął fazę przygotowawczą. Ostateczne uruchomienie zależy od przyjęcia przepisów przez Parlament Europejski i Radę UE.

> !przyklad Turysta z Polski płaci w Hiszpanii cyfrowym euro z portfela w aplikacji. Płatność trafia od razu do sprzedawcy, a jej rozliczenie nie zależy od amerykańskich organizacji kartowych. To jeden z argumentów UE: większa niezależność europejskich płatności.

## Szanse i zagrożenia
| Szanse | Zagrożenia |
|---|---|
| bezpieczny pieniądz banku centralnego w erze cyfrowej | odpływ depozytów z banków i słabsza kreacja kredytu |
| tańsze i szybsze płatności | obawy o prywatność i inwigilację |
| większa niezależność płatności od globalnych firm | ryzyko cyberataków |
| włączenie finansowe osób bez konta | koszt budowy infrastruktury |

> !uwaga CBDC to nie kryptowaluta. Bitcoin nie ma emitenta i jego wartość się waha, a CBDC jest emitowana przez bank centralny i zawsze warta tyle samo co gotówka w tej walucie.`,
            ru: `Деньги на счёте уже сегодня цифровые. Но это деньги **коммерческого банка** — ваше требование к банку. Единственные деньги центрального банка, доступные обычным людям, — наличные. [[cbdc|CBDC]] должна это изменить.

## Что такое CBDC
> !zapamietaj Цифровая валюта центрального банка (CBDC, central bank digital currency) — это **обязательство центрального банка**, выраженное в действующей расчётной единице, в цифровой форме, которое служит **средством обмена** и **средством сбережения стоимости**.

Проще говоря, это «цифровые наличные». Они так же надёжны, как банкнота, потому что за ними стоит центральный банк, а не коммерческий банк, который может обанкротиться.

| | Наличные | Деньги на счёте в банке | CBDC |
|---|---|---|---|
| Кто должник | центральный банк | коммерческий банк | центральный банк |
| Форма | физическая | цифровая | цифровая |
| Риск банкротства эмитента | практически нет | есть (ограничен гарантиями BFG) | практически нет |
| Проценты | нет | возможны | обычно нет или по решению центрального банка |

## Виды CBDC
**По пользователям:**
- **розничная (retail)** — для населения и фирм, для повседневных платежей,
- **оптовая (wholesale)** — только для банков и финансовых учреждений, для расчётов между ними.

**По технологии:**
- **на основе счетов (account-based)** — центральный банк или посредник ведёт счёт и проверяет личность владельца,
- **на основе токенов (token-based)** — как цифровая банкнота; важно, подлинный ли токен, а не кто его держит.

**По архитектуре:**
- **прямая** — центральный банк сам обслуживает пользователей,
- **косвенная или гибридная** — центральный банк выпускает, а кошельки и обслуживание клиентов ведут коммерческие банки и платёжные компании. Эту модель выбирает большинство проектов, в том числе цифровой евро.

## Где работает CBDC
Розничные CBDC уже запустили, в частности:
- **Багамы** — Sand Dollar (2020), первая полностью внедрённая CBDC,
- **Восточные Карибы** — DCash, общая валюта нескольких островных государств,
- **Нигерия** — eNaira (2021),
- **Ямайка** — JAM-DEX (2022).

Многие другие страны (например, Китай с e-CNY) ведут крупные пилоты. Опыт показывает, что сам запуск не гарантирует популярности — в ряде стран CBDC пользуются немногие.

## Цифровой евро
[[cyfrowe-euro|Цифровой евро]] — проект Европейского центрального банка. Основные принципы:
- дополнение, а не замена наличных,
- доступ через кошельки в банках и приложениях, платежи по всей еврозоне,
- возможность платить офлайн (без интернета) с высоким уровнем конфиденциальности,
- **лимит хранения** на человека, чтобы люди массово не перевели депозиты из банков в цифровой евро,
- бесплатные базовые услуги для пользователей.

Европейская комиссия представила проект регламента в июне 2023 г., а ЕЦБ в ноябре 2023 г. начал подготовительную фазу. Окончательный запуск зависит от принятия правил Европейским парламентом и Советом ЕС.

> !przyklad Турист из Польши платит в Испании цифровым евро из кошелька в приложении. Платёж сразу доходит до продавца, а его проведение не зависит от американских карточных систем. Это один из аргументов ЕС: большая независимость европейских платежей.

## Возможности и угрозы
| Возможности | Угрозы |
|---|---|
| надёжные деньги центрального банка в цифровую эпоху | отток депозитов из банков и ослабление кредитования |
| более дешёвые и быстрые платежи | опасения за приватность и слежку |
| большая независимость платежей от глобальных компаний | риск кибератак |
| финансовая доступность для людей без счёта | стоимость создания инфраструктуры |

> !uwaga CBDC — не криптовалюта. У биткоина нет эмитента и его стоимость колеблется, а CBDC выпускает центральный банк, и она всегда стоит столько же, сколько наличные в этой валюте.`,
          },
          quiz: [
            { q: { pl: "CBDC jest zobowiązaniem:", ru: "CBDC является обязательством:" },
              a: [{ pl: "banku komercyjnego", ru: "коммерческого банка" }, { pl: "ministra finansów", ru: "министра финансов" }, { pl: "banku centralnego", ru: "центрального банка" }, { pl: "giełdy kryptowalut", ru: "криптобиржи" }],
              correct: 2, why: { pl: "To istota definicji: cyfrowe zobowiązanie banku centralnego w krajowej jednostce.", ru: "Это суть определения: цифровое обязательство центрального банка в национальной единице." } },
            { q: { pl: "CBDC przeznaczona tylko do rozliczeń między bankami to CBDC:", ru: "CBDC только для расчётов между банками — это CBDC:" },
              a: [{ pl: "hurtowa (wholesale)", ru: "оптовая (wholesale)" }, { pl: "detaliczna (retail)", ru: "розничная (retail)" }, { pl: "tokenowa offline", ru: "токенная офлайн" }, { pl: "hybrydowa", ru: "гибридная" }],
              correct: 0, why: { pl: "Hurtowa CBDC służy instytucjom finansowym, detaliczna — ludności i firmom.", ru: "Оптовая CBDC служит финансовым учреждениям, розничная — населению и фирмам." } },
            { q: { pl: "Która CBDC działa na Bahamach?", ru: "Какая CBDC работает на Багамах?" },
              a: [{ pl: "eNaira", ru: "eNaira" }, { pl: "DCash", ru: "DCash" }, { pl: "JAM-DEX", ru: "JAM-DEX" }, { pl: "Sand Dollar", ru: "Sand Dollar" }],
              correct: 3, why: { pl: "Sand Dollar (2020) na Bahamach; eNaira — Nigeria, DCash — Wschodnie Karaiby, JAM-DEX — Jamajka.", ru: "Sand Dollar (2020) — Багамы; eNaira — Нигерия, DCash — Восточные Карибы, JAM-DEX — Ямайка." } },
            { q: { pl: "Po co w cyfrowym euro planuje się limit przechowywania?", ru: "Зачем в цифровом евро планируется лимит хранения?" },
              a: [{ pl: "Żeby zwiększyć inflację", ru: "Чтобы повысить инфляцию" }, { pl: "Żeby nie doszło do masowego odpływu depozytów z banków", ru: "Чтобы не допустить массового оттока депозитов из банков" }, { pl: "Żeby ograniczyć turystykę", ru: "Чтобы ограничить туризм" }, { pl: "Bo technologia nie pozwala na więcej", ru: "Потому что технология не позволяет больше" }],
              correct: 1, why: { pl: "Bez limitu ludzie mogliby przenieść depozyty do CBDC, osłabiając finansowanie kredytów.", ru: "Без лимита люди могли бы перевести депозиты в CBDC, ослабив финансирование кредитов." } },
            { q: { pl: "Czym CBDC różni się od bitcoina?", ru: "Чем CBDC отличается от биткоина?" },
              a: [{ pl: "CBDC ma emitenta (bank centralny) i stałą wartość w walucie krajowej", ru: "У CBDC есть эмитент (центральный банк) и неизменная стоимость в национальной валюте" }, { pl: "Niczym, to synonimy", ru: "Ничем, это синонимы" }, { pl: "Bitcoin jest emitowany przez EBC", ru: "Биткоин выпускает ЕЦБ" }, { pl: "CBDC nie może być używana do płatności", ru: "CBDC нельзя использовать для платежей" }],
              correct: 0, why: { pl: "Kryptowaluta nie ma emitenta i jej kurs się waha; CBDC to forma pieniądza banku centralnego.", ru: "У криптовалюты нет эмитента и её курс колеблется; CBDC — форма денег центрального банка." } },
          ],
        },
        // ------------------------------------------------------------------ 2.4
        {
          id: "2.4",
          title: { pl: "Impulsy pieniężne i instrumenty rynku pieniężnego", ru: "Денежные импульсы и инструменты денежного рынка" },
          src: "Podstawy bankowości, slajdy 55–56",
          body: {
            pl: `RPP podnosi stopy w środę. Dlaczego ceny w sklepie reagują dopiero po roku? Bo impuls pieniężny musi przejść przez kilka „rur”, zanim dotrze do gospodarki. Nazywamy je [[kanaly-transmisji|kanałami transmisji]].

## Kanały transmisji impulsów pieniężnych
Weźmy przykład podwyżki [[stopa-referencyjna|stopy referencyjnej]] i zobaczmy, co dzieje się w każdym kanale.

| Kanał | Co się dzieje po podwyżce stóp |
|---|---|
| **Stóp procentowych** | rośnie oprocentowanie kredytów i lokat; opłaca się oszczędzać, a nie pożyczać; spadają konsumpcja i inwestycje |
| **Kursu walutowego** | wyższe stopy przyciągają kapitał zagraniczny, złoty się umacnia; import tanieje, eksport słabnie, inflacja spada |
| **Kredytów bankowych** | banki ostrożniej udzielają kredytów, zaostrzają kryteria; mniej pieniędzy trafia do gospodarki |
| **Cen kapitału** | spadają ceny akcji i obligacji; firmy mają droższe finansowanie, ludzie czują się „biedniejsi” |
| **Cen nieruchomości** | droższe kredyty hipoteczne zmniejszają popyt na mieszkania, ceny rosną wolniej lub spadają |
| **Oczekiwań inflacyjnych** | ludzie i firmy wierzą, że inflacja spadnie, więc mniej podnoszą ceny i żądania płacowe |
| **Podejmowania ryzyka** | banki i inwestorzy stają się ostrożniejsi, mniej finansują ryzykowne projekty |

> !zapamietaj Polityka pieniężna działa z **opóźnieniem**: pełny wpływ zmiany stóp na inflację pojawia się zwykle po kilku kwartałach (często podaje się 1–2 lata). Dlatego RPP decyduje na podstawie **prognoz**, a nie bieżącej inflacji.

Przy obniżce stóp wszystkie kanały działają w przeciwną stronę: kredyt tanieje, złoty słabnie, rosną ceny aktywów i skłonność do ryzyka.

> !przyklad Rodzina planuje kredyt na mieszkanie. Po serii podwyżek stóp jej rata wzrosłaby tak bardzo, że bank przyznaje mniejszą kwotę (kanał kredytowy). Rodzina odkłada zakup (kanał nieruchomości) i trzyma pieniądze na lokacie, bo jest wyżej oprocentowana (kanał stóp). Jedna decyzja RPP zadziałała na trzy sposoby.

## Rynek pieniężny
Rynek pieniężny to rynek, na którym obraca się pieniądzem i instrumentami **krótkoterminowymi — do 1 roku**. Jego uczestnicy to głównie banki, bank centralny, Skarb Państwa, duże firmy i fundusze. Służy do zarządzania płynnością: kto ma chwilową nadwyżkę, pożycza ją temu, komu chwilowo brakuje.

Na rynku pieniężnym działają też lokaty międzybankowe (np. overnight) i operacje NBP, ale wykład wyróżnia trzy podstawowe instrumenty dłużne.

## Instrumenty rynku pieniężnego
**Bony skarbowe** — krótkoterminowe papiery dłużne emitowane przez Skarb Państwa (przez ministra finansów), na okres do 1 roku. Sprzedaje się je z **dyskontem**: inwestor płaci mniej niż wartość nominalna, a przy wykupie dostaje pełną kwotę. Różnica to jego zysk. Uważane są za bardzo bezpieczne.

**Certyfikat depozytowy** — bankowy papier wartościowy, który potwierdza złożenie w banku depozytu na określony czas i procent. W odróżnieniu od zwykłej lokaty certyfikat można **sprzedać innemu inwestorowi** przed terminem. Emisja certyfikatów jest czynnością bankową (emitowanie bankowych papierów wartościowych).

**Krótkoterminowe papiery dłużne firm** (bony komercyjne, commercial papers) — emitowane przez duże przedsiębiorstwa o dobrej kondycji, żeby sfinansować bieżące potrzeby taniej niż kredytem. Zwykle także sprzedawane z dyskontem; ryzyko zależy od wiarygodności emitenta.

| Instrument | Emitent | Termin | Ryzyko |
|---|---|---|---|
| Bon skarbowy | Skarb Państwa | do 1 roku | bardzo niskie |
| Bon pieniężny NBP | NBP (tylko dla banków) | najczęściej 7 dni | bardzo niskie |
| Certyfikat depozytowy | bank | od kilku dni do kilku lat (na rynku pieniężnym — krótkie) | niskie, zależne od banku |
| Bon komercyjny | firma | do 1 roku | zależne od firmy |

> !przyklad Inwestor kupuje 52-tygodniowy bon skarbowy o nominale 1000 zł za 960 zł. Po roku dostaje 1000 zł. Zarobił 40 zł, czyli ok. 4,2% (40 / 960). Nie było kuponu odsetkowego — cały zysk wynika z dyskonta.

> !uwaga Instrumenty rynku pieniężnego są bardzo płynne i bezpieczne, ale przynoszą niewielki zysk. Na dłuższe inwestycje (obligacje na wiele lat, akcje) służy rynek kapitałowy.`,
            ru: `RPP повышает ставки в среду. Почему цены в магазине реагируют только через год? Потому что денежный импульс должен пройти через несколько «труб», прежде чем дойдёт до экономики. Их называют [[kanaly-transmisji|каналами трансмиссии]].

## Каналы трансмиссии денежных импульсов
Возьмём повышение [[stopa-referencyjna|референтной ставки]] и посмотрим, что происходит в каждом канале.

| Канал | Что происходит после повышения ставок |
|---|---|
| **Процентный** | растут ставки по кредитам и вкладам; выгоднее сберегать, а не занимать; снижаются потребление и инвестиции |
| **Валютного курса** | высокие ставки привлекают иностранный капитал, злотый укрепляется; импорт дешевеет, экспорт слабеет, инфляция снижается |
| **Банковского кредита** | банки осторожнее выдают кредиты, ужесточают критерии; в экономику поступает меньше денег |
| **Цен капитала** | падают цены акций и облигаций; финансирование фирм дорожает, люди чувствуют себя «беднее» |
| **Цен недвижимости** | более дорогая ипотека снижает спрос на жильё, цены растут медленнее или падают |
| **Инфляционных ожиданий** | люди и фирмы верят, что инфляция снизится, поэтому меньше повышают цены и требования к зарплате |
| **Принятия риска** | банки и инвесторы становятся осторожнее, меньше финансируют рискованные проекты |

> !zapamietaj Денежная политика действует с **задержкой**: полное влияние изменения ставок на инфляцию проявляется обычно через несколько кварталов (часто называют 1–2 года). Поэтому RPP решает на основе **прогнозов**, а не текущей инфляции.

При снижении ставок все каналы работают в обратную сторону: кредит дешевеет, злотый слабеет, растут цены активов и склонность к риску.

> !przyklad Семья планирует ипотеку. После серии повышений ставок её платёж вырос бы так сильно, что банк одобряет меньшую сумму (кредитный канал). Семья откладывает покупку (канал недвижимости) и держит деньги на вкладе, потому что ставка выше (процентный канал). Одно решение RPP сработало тремя путями.

## Денежный рынок
Денежный рынок — это рынок, где обращаются деньги и **краткосрочные инструменты — до 1 года**. Его участники — в основном банки, центральный банк, государственная казна, крупные фирмы и фонды. Он служит для управления ликвидностью: у кого временный избыток, одалживает тому, у кого временная нехватка.

На денежном рынке работают также межбанковские депозиты (например, овернайт) и операции NBP, но лекция выделяет три основных долговых инструмента.

## Инструменты денежного рынка
**Казначейские векселя (bony skarbowe)** — краткосрочные долговые бумаги, выпускаемые государственной казной (министром финансов) на срок до 1 года. Их продают с **дисконтом**: инвестор платит меньше номинала, а при погашении получает полную сумму. Разница — его доход. Считаются очень надёжными.

**Депозитный сертификат** — банковская ценная бумага, подтверждающая размещение депозита в банке на определённый срок и под определённый процент. В отличие от обычного вклада сертификат можно **продать другому инвестору** до срока. Выпуск сертификатов — банковская операция (выпуск банковских ценных бумаг).

**Краткосрочные долговые бумаги фирм** (коммерческие векселя, commercial papers) — выпускаются крупными компаниями с хорошим финансовым положением, чтобы финансировать текущие потребности дешевле, чем кредитом. Обычно тоже продаются с дисконтом; риск зависит от надёжности эмитента.

| Инструмент | Эмитент | Срок | Риск |
|---|---|---|---|
| Казначейский вексель | государственная казна | до 1 года | очень низкий |
| Денежный вексель NBP | NBP (только для банков) | чаще всего 7 дней | очень низкий |
| Депозитный сертификат | банк | от нескольких дней до нескольких лет (на денежном рынке — короткие) | низкий, зависит от банка |
| Коммерческий вексель | фирма | до 1 года | зависит от фирмы |

> !przyklad Инвестор покупает 52-недельный казначейский вексель номиналом 1000 злотых за 960 злотых. Через год он получает 1000 злотых. Он заработал 40 злотых, то есть около 4,2% (40 / 960). Купона не было — весь доход получен из дисконта.

> !uwaga Инструменты денежного рынка очень ликвидны и надёжны, но приносят небольшой доход. Для долгосрочных вложений (облигации на много лет, акции) служит рынок капитала.`,
          },
          quiz: [
            { q: { pl: "Po podwyżce stóp złoty się umacnia, a import tanieje. To kanał:", ru: "После повышения ставок злотый укрепляется, а импорт дешевеет. Это канал:" },
              a: [{ pl: "cen nieruchomości", ru: "цен недвижимости" }, { pl: "kursu walutowego", ru: "валютного курса" }, { pl: "kredytów bankowych", ru: "банковского кредита" }, { pl: "podejmowania ryzyka", ru: "принятия риска" }],
              correct: 1, why: { pl: "Wyższe stopy przyciągają kapitał, waluta się umacnia, co obniża ceny importu.", ru: "Высокие ставки привлекают капитал, валюта укрепляется, что снижает цены импорта." } },
            { q: { pl: "Dlaczego RPP podejmuje decyzje na podstawie prognoz inflacji?", ru: "Почему RPP принимает решения на основе прогнозов инфляции?" },
              a: [{ pl: "Bo bieżąca inflacja nie jest publikowana", ru: "Потому что текущая инфляция не публикуется" }, { pl: "Bo tak nakazuje KNF", ru: "Потому что так требует KNF" }, { pl: "Bo zmiana stóp działa z opóźnieniem kilku kwartałów", ru: "Потому что изменение ставок действует с задержкой в несколько кварталов" }, { pl: "Bo stopy wpływają tylko na kurs", ru: "Потому что ставки влияют только на курс" }],
              correct: 2, why: { pl: "Skoro efekt przychodzi po czasie, trzeba reagować na przyszłą, a nie obecną inflację.", ru: "Раз эффект наступает позже, нужно реагировать на будущую, а не текущую инфляцию." } },
            { q: { pl: "Bony skarbowe emituje:", ru: "Казначейские векселя выпускает:" },
              a: [{ pl: "Skarb Państwa", ru: "государственная казна" }, { pl: "NBP", ru: "NBP" }, { pl: "bank komercyjny", ru: "коммерческий банк" }, { pl: "samorząd gminy", ru: "самоуправление гмины" }],
              correct: 0, why: { pl: "Bony skarbowe to krótkoterminowy dług Skarbu Państwa; NBP emituje bony pieniężne.", ru: "Казначейские векселя — краткосрочный долг казны; NBP выпускает денежные векселя." } },
            { q: { pl: "Bon o nominale 1000 zł kupiony za 950 zł daje zysk wynikający z:", ru: "Вексель номиналом 1000 злотых, купленный за 950, даёт доход за счёт:" },
              a: [{ pl: "kuponu odsetkowego", ru: "процентного купона" }, { pl: "dywidendy", ru: "дивиденда" }, { pl: "zmiany kursu walut", ru: "изменения валютного курса" }, { pl: "dyskonta", ru: "дисконта" }],
              correct: 3, why: { pl: "Instrumenty dyskontowe kupuje się poniżej nominału i wykupuje po nominale.", ru: "Дисконтные инструменты покупают ниже номинала и гасят по номиналу." } },
            { q: { pl: "Co odróżnia certyfikat depozytowy od zwykłej lokaty?", ru: "Чем депозитный сертификат отличается от обычного вклада?" },
              a: [{ pl: "Nie jest oprocentowany", ru: "На него не начисляются проценты" }, { pl: "Można go sprzedać innemu inwestorowi przed terminem", ru: "Его можно продать другому инвестору до срока" }, { pl: "Emituje go Skarb Państwa", ru: "Его выпускает казна" }, { pl: "Jest zawsze bezterminowy", ru: "Он всегда бессрочный" }],
              correct: 1, why: { pl: "Certyfikat to papier wartościowy, więc bywa zbywalny na rynku wtórnym.", ru: "Сертификат — ценная бумага, поэтому его можно продать на вторичном рынке." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Ile osób liczy Rada Polityki Pieniężnej łącznie z przewodniczącym?", ru: "Сколько человек входит в RPP вместе с председателем?" },
          a: [{ pl: "5", ru: "5" }, { pl: "7", ru: "7" }, { pl: "10", ru: "10" }, { pl: "12", ru: "12" }],
          correct: 2, why: { pl: "Prezes NBP jako przewodniczący + 9 członków (po 3 od Prezydenta, Sejmu i Senatu).", ru: "Президент NBP как председатель + 9 членов (по 3 от Президента, Сейма и Сената)." } },
        { q: { pl: "Podstawowym celem NBP jest:", ru: "Основная цель NBP:" },
          a: [{ pl: "utrzymanie stabilnego poziomu cen", ru: "поддержание стабильного уровня цен" }, { pl: "maksymalizacja zysku NBP", ru: "максимизация прибыли NBP" }, { pl: "stały kurs złotego", ru: "фиксированный курс злотого" }, { pl: "finansowanie deficytu budżetu", ru: "финансирование дефицита бюджета" }],
          correct: 0, why: { pl: "NBP dba o stabilność cen, wspierając politykę rządu, o ile nie koliduje to z celem podstawowym.", ru: "NBP обеспечивает стабильность цен, поддерживая политику правительства, если это не мешает основной цели." } },
        { q: { pl: "Przy jakiej inflacji NBP mieści się w paśmie celu?", ru: "При какой инфляции NBP находится в диапазоне цели?" },
          a: [{ pl: "0,8%", ru: "0,8%" }, { pl: "4,2%", ru: "4,2%" }, { pl: "5,0%", ru: "5,0%" }, { pl: "3,1%", ru: "3,1%" }],
          correct: 3, why: { pl: "Pasmo celu to 1,5–3,5%.", ru: "Диапазон цели — 1,5–3,5%." } },
        { q: { pl: "Urzędowe obniżenie wartości waluty w systemie kursu stałego to:", ru: "Официальное снижение стоимости валюты при фиксированном курсе — это:" },
          a: [{ pl: "deprecjacja", ru: "обесценение (deprecjacja)" }, { pl: "dewaluacja", ru: "девальвация" }, { pl: "aprecjacja", ru: "удорожание (aprecjacja)" }, { pl: "rewaluacja", ru: "ревальвация" }],
          correct: 1, why: { pl: "Dewaluacja i rewaluacja to decyzje władz; deprecjacja i aprecjacja to zmiany rynkowe.", ru: "Девальвация и ревальвация — решения властей; обесценение и удорожание — рыночные изменения." } },
        { q: { pl: "Która stopa NBP stanowi dolną granicę korytarza?", ru: "Какая ставка NBP — нижняя граница коридора?" },
          a: [{ pl: "Depozytowa", ru: "Депозитная" }, { pl: "Lombardowa", ru: "Ломбардная" }, { pl: "Referencyjna", ru: "Референтная" }, { pl: "Dyskontowa", ru: "Учётная" }],
          correct: 0, why: { pl: "Bank zawsze może ulokować nadwyżkę w NBP po stopie depozytowej.", ru: "Банк всегда может разместить избыток в NBP по депозитной ставке." } },
        { q: { pl: "Transakcja, w której bank centralny daje bankom gotówkę pod zastaw papierów:", ru: "Сделка, при которой центральный банк даёт банкам деньги под залог бумаг:" },
          a: [{ pl: "absorbuje płynność", ru: "поглощает ликвидность" }, { pl: "nie zmienia płynności", ru: "не меняет ликвидность" }, { pl: "zasila system w płynność", ru: "добавляет ликвидность в систему" }, { pl: "podnosi rezerwę obowiązkową", ru: "повышает обязательный резерв" }],
          correct: 2, why: { pl: "To transakcja typu repo zasilająca — pieniądze trafiają do banków.", ru: "Это сделка репо, добавляющая ликвидность, — деньги поступают в банки." } },
        { q: { pl: "WIBOR jest wskaźnikiem opartym na:", ru: "WIBOR — индикатор, основанный на:" },
          a: [{ pl: "inflacji CPI", ru: "инфляции CPI" }, { pl: "decyzjach RPP", ru: "решениях RPP" }, { pl: "kursie EUR/PLN", ru: "курсе EUR/PLN" }, { pl: "kwotowaniach (deklaracjach) banków panelowych", ru: "котировках (заявках) банков панели" }],
          correct: 3, why: { pl: "WIBOR to stawka oferowana — deklaracje banków; WIRON — rzeczywiste transakcje.", ru: "WIBOR — предлагаемая ставка, заявки банков; WIRON — реальные сделки." } },
        { q: { pl: "Agregat, który obejmuje depozyty terminowe krótko- i średnioterminowe, to:", ru: "Агрегат, включающий кратко- и среднесрочные срочные депозиты:" },
          a: [{ pl: "M0", ru: "M0" }, { pl: "M2", ru: "M2" }, { pl: "M1", ru: "M1" }, { pl: "tylko M3", ru: "только M3" }],
          correct: 1, why: { pl: "M2 = M1 + wkłady krótko- i średnioterminowe; M3 je zawiera, ale to M2 je dodaje.", ru: "M2 = M1 + кратко- и среднесрочные вклады; M3 их тоже содержит, но добавляет их именно M2." } },
        { q: { pl: "CBDC oparta na tokenach przypomina:", ru: "CBDC на основе токенов напоминает:" },
          a: [{ pl: "cyfrowy banknot", ru: "цифровую банкноту" }, { pl: "kredyt hipoteczny", ru: "ипотечный кредит" }, { pl: "obligację korporacyjną", ru: "корпоративную облигацию" }, { pl: "rachunek powierniczy", ru: "доверительный счёт" }],
          correct: 0, why: { pl: "W modelu tokenowym liczy się autentyczność tokenu, jak przy gotówce.", ru: "В токенной модели важна подлинность токена, как с наличными." } },
        { q: { pl: "Kto przygotowuje cyfrowe euro?", ru: "Кто готовит цифровой евро?" },
          a: [{ pl: "NBP", ru: "NBP" }, { pl: "Fed", ru: "ФРС" }, { pl: "Europejski Bank Centralny", ru: "Европейский центральный банк" }, { pl: "BFG", ru: "BFG" }],
          correct: 2, why: { pl: "Projekt prowadzi EBC; przepisy przygotowuje Komisja Europejska.", ru: "Проект ведёт ЕЦБ; правила готовит Европейская комиссия." } },
        { q: { pl: "Ludzie wierzą, że inflacja spadnie, więc firmy mniej podnoszą ceny. To kanał:", ru: "Люди верят, что инфляция снизится, поэтому фирмы меньше повышают цены. Это канал:" },
          a: [{ pl: "kredytów bankowych", ru: "банковского кредита" }, { pl: "kursu walutowego", ru: "валютного курса" }, { pl: "cen nieruchomości", ru: "цен недвижимости" }, { pl: "oczekiwań inflacyjnych", ru: "инфляционных ожиданий" }],
          correct: 3, why: { pl: "Wiarygodny bank centralny kotwiczy oczekiwania, co samo obniża inflację.", ru: "Надёжный центральный банк закрепляет ожидания, что само снижает инфляцию." } },
        { q: { pl: "Rynek pieniężny to rynek instrumentów o terminie:", ru: "Денежный рынок — рынок инструментов сроком:" },
          a: [{ pl: "do 1 roku", ru: "до 1 года" }, { pl: "powyżej 5 lat", ru: "свыше 5 лет" }, { pl: "bezterminowych", ru: "бессрочных" }, { pl: "co najmniej 10 lat", ru: "не менее 10 лет" }],
          correct: 0, why: { pl: "Instrumenty do 1 roku tworzą rynek pieniężny, dłuższe — rynek kapitałowy.", ru: "Инструменты до 1 года — денежный рынок, более длинные — рынок капитала." } },
      ],
    },
    // ================================================================== W3
    {
      n: 3,
      color: "--c3",
      title: { pl: "Nadzór nad działalnością bankową", ru: "Надзор за банковской деятельностью" },
      lead: {
        pl: "Kto nadzoruje banki w Polsce i w UE, jak wygląda nadzór od założenia banku do jego wyjścia z rynku, jakie normy ostrożnościowe muszą spełniać banki, czego uczy Bazylea i jak działa gwarantowanie depozytów przez BFG.",
        ru: "Кто надзирает за банками в Польше и ЕС, как выглядит надзор от создания банка до его ухода с рынка, каким пруденциальным нормам должны соответствовать банки, чему учит Базель и как работает гарантирование депозитов BFG.",
      },
      subs: [
        // ------------------------------------------------------------------ 3.1
        {
          id: "3.1",
          title: { pl: "Filary i etapy nadzoru bankowego", ru: "Опоры и этапы банковского надзора" },
          src: "Podstawy bankowości, slajdy 57–60; Prawo bankowe, art. 32",
          body: {
            pl: `Bank obraca cudzymi pieniędzmi, a jego upadłość może zarazić cały system. Dlatego państwo nie pozwala bankom działać „na słowo honoru” — patrzy im na ręce od pierwszego dnia do ostatniego.

## Kto nadzoruje banki
**Europejski Bank Centralny.** Od 2014 r. w strefie euro działa Jednolity Mechanizm Nadzorczy (SSM): EBC bezpośrednio nadzoruje największe banki strefy euro, a krajowe organy — mniejsze. Polska nie należy do strefy euro ani do unii bankowej, więc polskie banki nadzoruje polski organ. Wspólne standardy dla całej UE wydaje też Europejski Urząd Nadzoru Bankowego (EBA).

**[[knf|Komisja Nadzoru Finansowego]].** W Polsce działa **nadzór zintegrowany** — jeden organ nadzoruje banki, ubezpieczycieli, rynek kapitałowy, fundusze emerytalne, instytucje płatnicze i SKOK-i. KNF powstała w 2006 r. (wtedy przejęła nadzór nad rynkiem ubezpieczeń, kapitałowym i emerytalnym), a 1 stycznia 2008 r. przejęła też nadzór bankowy od Komisji Nadzoru Bankowego działającej przy NBP.

| Model nadzoru | Na czym polega | Przykład |
|---|---|---|
| sektorowy | osobny nadzorca dla banków, ubezpieczeń, giełdy | Polska przed 2006/2008 |
| zintegrowany | jeden nadzorca dla całego rynku finansowego | Polska — KNF |
| ponadnarodowy | nadzór nad dużymi bankami na poziomie wspólnoty | strefa euro — EBC (SSM) |

> !zapamietaj Nadzór zintegrowany ma sens, bo banki, ubezpieczyciele i fundusze tworzą wspólne grupy (konglomeraty). Jeden nadzorca widzi całą grupę i łatwiej wychwyci ryzyko przechodzące między sektorami.

## Etapy nadzoru nad bankiem
Nadzór towarzyszy bankowi przez całe życie.

### 1. Założenie banku
Zanim bank zacznie działać, musi dostać zezwolenie KNF. Nadzorca sprawdza m.in.:
- czy założyciele i przyszli akcjonariusze są wiarygodni i skąd mają pieniądze,
- czy członkowie zarządu mają kwalifikacje i nieposzlakowaną opinię,
- czy bank ma realny plan działalności i odpowiednie systemy (zarządzania ryzykiem, IT, kontroli wewnętrznej),
- czy kapitał założycielski jest wystarczający — zgodnie z art. 32 Prawa bankowego nie może być niższy od równowartości **5 000 000 euro** (z wyjątkami, np. dla banków spółdzielczych).

### 2. Funkcjonowanie banku
To najdłuższy etap. KNF:
- analizuje sprawozdania, które bank regularnie przesyła (nadzór zdalny, off-site),
- przeprowadza inspekcje w banku (nadzór na miejscu, on-site),
- co roku ocenia bank w procesie badania i oceny nadzorczej (BION) — patrzy na model biznesowy, zarządzanie, kapitał i płynność, a potem może nałożyć dodatkowy wymóg kapitałowy,
- zatwierdza zmiany w zarządzie i znaczące pakiety akcji,
- wydaje rekomendacje, np. Rekomendację S o kredytach hipotecznych.

### 3. Wyjście banku z rynku
Gdy bank ma kłopoty, nadzór reaguje stopniowo:
1. bank uruchamia **plan naprawy**,
2. KNF może zażądać dodatkowych działań, ograniczyć wypłatę dywidendy, zakazać ryzykownej działalności,
3. KNF może ustanowić **zarząd komisaryczny**,
4. gdy bank jest na progu upadłości, BFG może wszcząć **[[przymusowa-restrukturyzacja|przymusową restrukturyzację]]**,
5. jeśli nie ma interesu publicznego w restrukturyzacji — likwidacja lub upadłość, a deponenci dostają wypłatę z BFG.

## Działania kontrolne
| Rodzaj | Jak wygląda | Co daje |
|---|---|---|
| nadzór analityczny (zdalny) | analiza sprawozdań, wskaźników, raportów | szybkie wykrycie zmian w wynikach |
| inspekcja (na miejscu) | zespół KNF pracuje w banku, bada dokumenty, procesy, próbki kredytów | sprawdzenie, czy liczby są prawdziwe |
| działania naprawcze | zalecenia, nakazy, kary pieniężne | usunięcie nieprawidłowości |
| sankcje najostrzejsze | odwołanie członka zarządu, zarząd komisaryczny, cofnięcie zezwolenia | ochrona deponentów przed dalszymi stratami |

> !przyklad Podczas inspekcji KNF sprawdza próbkę 200 kredytów firmowych i odkrywa, że w 30 z nich bank nie badał porządnie zdolności kredytowej. Wydaje zalecenia: poprawić procedury, przeszacować ryzyko i utworzyć wyższe odpisy na straty. Jeśli bank tego nie zrobi, KNF może nałożyć karę.

> !uwaga Nadzór nie gwarantuje, że żaden bank nie upadnie. Jego celem jest ograniczanie ryzyka i bezpieczna ścieżka wyjścia z rynku, a nie utrzymywanie przy życiu każdego banku za wszelką cenę.`,
            ru: `Банк распоряжается чужими деньгами, а его банкротство может заразить всю систему. Поэтому государство не позволяет банкам работать «на честном слове» — оно следит за ними с первого дня до последнего.

## Кто надзирает за банками
**Европейский центральный банк.** С 2014 г. в еврозоне работает Единый надзорный механизм (SSM): ЕЦБ напрямую надзирает за крупнейшими банками еврозоны, а национальные органы — за меньшими. Польша не входит в еврозону и банковский союз, поэтому польские банки надзирает польский орган. Общие стандарты для всего ЕС издаёт также Европейское банковское управление (EBA).

**[[knf|Комиссия финансового надзора (KNF)]].** В Польше действует **интегрированный надзор** — один орган надзирает за банками, страховщиками, рынком капитала, пенсионными фондами, платёжными учреждениями и SKOK. KNF создана в 2006 г. (тогда она приняла надзор за страховым, фондовым и пенсионным рынком), а 1 января 2008 г. приняла и банковский надзор от Комиссии банковского надзора (Komisja Nadzoru Bankowego), работавшей при NBP.

| Модель надзора | В чём суть | Пример |
|---|---|---|
| секторальная | отдельный надзор для банков, страхования, биржи | Польша до 2006/2008 |
| интегрированная | один надзорный орган для всего финансового рынка | Польша — KNF |
| наднациональная | надзор за крупными банками на уровне сообщества | еврозона — ЕЦБ (SSM) |

> !zapamietaj Интегрированный надзор оправдан, потому что банки, страховщики и фонды образуют общие группы (конгломераты). Один надзорный орган видит всю группу и легче заметит риск, переходящий между секторами.

## Этапы надзора за банком
Надзор сопровождает банк всю его жизнь.

### 1. Создание банка
Прежде чем банк начнёт работать, он должен получить разрешение KNF. Надзор проверяет, в частности:
- надёжны ли учредители и будущие акционеры и откуда у них деньги,
- есть ли у членов правления квалификация и безупречная репутация,
- есть ли у банка реальный бизнес-план и нужные системы (управления риском, ИТ, внутреннего контроля),
- достаточен ли учредительный капитал — по ст. 32 «Prawo bankowe» он не может быть ниже эквивалента **5 000 000 евро** (с исключениями, например для кооперативных банков).

### 2. Функционирование банка
Это самый долгий этап. KNF:
- анализирует отчёты, которые банк регулярно присылает (дистанционный надзор, off-site),
- проводит проверки в банке (надзор на месте, on-site),
- ежегодно оценивает банк в процессе надзорной проверки и оценки (BION) — смотрит на бизнес-модель, управление, капитал и ликвидность, а затем может установить дополнительное требование к капиталу,
- утверждает изменения в правлении и крупные пакеты акций,
- издаёт рекомендации, например Rekomendacja S об ипотечных кредитах.

### 3. Уход банка с рынка
Когда у банка проблемы, надзор реагирует поэтапно:
1. банк запускает **план оздоровления**,
2. KNF может потребовать дополнительных мер, ограничить выплату дивидендов, запретить рискованную деятельность,
3. KNF может назначить **временную администрацию (zarząd komisaryczny)**,
4. когда банк на грани банкротства, BFG может начать **[[przymusowa-restrukturyzacja|принудительную реструктуризацию]]**,
5. если общественного интереса в реструктуризации нет — ликвидация или банкротство, а вкладчики получают выплату от BFG.

## Контрольные действия
| Вид | Как выглядит | Что даёт |
|---|---|---|
| аналитический (дистанционный) надзор | анализ отчётов, показателей, докладов | быстрое выявление изменений в результатах |
| проверка (на месте) | группа KNF работает в банке, изучает документы, процессы, выборку кредитов | проверка, правдивы ли цифры |
| корректирующие меры | рекомендации, предписания, денежные штрафы | устранение нарушений |
| самые жёсткие санкции | отзыв члена правления, временная администрация, отзыв разрешения | защита вкладчиков от дальнейших потерь |

> !przyklad Во время проверки KNF изучает выборку из 200 корпоративных кредитов и обнаруживает, что по 30 из них банк плохо проверил кредитоспособность. Она выдаёт рекомендации: исправить процедуры, переоценить риск и создать более высокие резервы на убытки. Если банк этого не сделает, KNF может наложить штраф.

> !uwaga Надзор не гарантирует, что ни один банк не обанкротится. Его цель — ограничивать риск и обеспечивать безопасный путь ухода с рынка, а не сохранять каждый банк любой ценой.`,
          },
          quiz: [
            { q: { pl: "Od kiedy KNF sprawuje nadzór nad bankami?", ru: "С какого времени KNF надзирает за банками?" },
              a: [{ pl: "Od 1997 r.", ru: "С 1997 г." }, { pl: "Od 1 stycznia 2008 r.", ru: "С 1 января 2008 г." }, { pl: "Od 2014 r.", ru: "С 2014 г." }, { pl: "Od 2016 r.", ru: "С 2016 г." }],
              correct: 1, why: { pl: "KNF powstała w 2006 r., a nadzór bankowy przejęła od KNB 1 stycznia 2008 r.", ru: "KNF создана в 2006 г., а банковский надзор приняла от KNB 1 января 2008 г." } },
            { q: { pl: "Minimalny kapitał założycielski banku (art. 32 Prawa bankowego) to równowartość:", ru: "Минимальный учредительный капитал банка (ст. 32 «Prawo bankowe») — эквивалент:" },
              a: [{ pl: "100 000 euro", ru: "100 000 евро" }, { pl: "1 000 000 zł", ru: "1 000 000 злотых" }, { pl: "5 000 000 euro", ru: "5 000 000 евро" }, { pl: "50 000 000 euro", ru: "50 000 000 евро" }],
              correct: 2, why: { pl: "Art. 32 ust. 1: nie mniej niż równowartość 5 000 000 euro (z wyjątkami).", ru: "Ст. 32 п. 1: не менее эквивалента 5 000 000 евро (с исключениями)." } },
            { q: { pl: "Nadzór zintegrowany oznacza, że:", ru: "Интегрированный надзор означает, что:" },
              a: [{ pl: "jeden organ nadzoruje cały rynek finansowy", ru: "один орган надзирает весь финансовый рынок" }, { pl: "banki nadzorują się nawzajem", ru: "банки надзирают друг за другом" }, { pl: "nadzór prowadzi wyłącznie EBC", ru: "надзор ведёт только ЕЦБ" }, { pl: "każdy sektor ma osobny organ", ru: "у каждого сектора свой орган" }],
              correct: 0, why: { pl: "W Polsce KNF nadzoruje banki, ubezpieczenia, rynek kapitałowy, emerytalny i SKOK.", ru: "В Польше KNF надзирает банки, страхование, рынок капитала, пенсионный рынок и SKOK." } },
            { q: { pl: "Analiza sprawozdań przesyłanych przez bank do KNF to nadzór:", ru: "Анализ отчётов, присылаемых банком в KNF, — это надзор:" },
              a: [{ pl: "na miejscu (on-site)", ru: "на месте (on-site)" }, { pl: "przymusowy", ru: "принудительный" }, { pl: "komisaryczny", ru: "временная администрация" }, { pl: "zdalny (off-site)", ru: "дистанционный (off-site)" }],
              correct: 3, why: { pl: "Off-site to analiza danych bez wizyty w banku; inspekcja to on-site.", ru: "Off-site — анализ данных без визита в банк; проверка на месте — on-site." } },
            { q: { pl: "Dlaczego EBC nie nadzoruje bezpośrednio polskich banków?", ru: "Почему ЕЦБ напрямую не надзирает за польскими банками?" },
              a: [{ pl: "Bo Polska nie jest w UE", ru: "Потому что Польша не в ЕС" }, { pl: "Bo Polska nie należy do strefy euro ani unii bankowej", ru: "Потому что Польша не входит в еврозону и банковский союз" }, { pl: "Bo polskie banki są za małe", ru: "Потому что польские банки слишком малы" }, { pl: "Bo zabrania tego Konstytucja RP", ru: "Потому что это запрещает Конституция" }],
              correct: 1, why: { pl: "SSM obejmuje strefę euro i kraje, które dobrowolnie przystąpiły do unii bankowej.", ru: "SSM охватывает еврозону и страны, добровольно вступившие в банковский союз." } },
          ],
        },
        // ------------------------------------------------------------------ 3.2
        {
          id: "3.2",
          title: { pl: "Regulacje ostrożnościowe i Bazylea", ru: "Пруденциальное регулирование и Базель" },
          src: "Podstawy bankowości, slajdy 61–63; Prawo bankowe, art. 71",
          body: {
            pl: `Regulacje ostrożnościowe to „przepisy ruchu drogowego” dla banków. Nie mówią, komu bank ma udzielić kredytu, ale wyznaczają granice, których nie wolno przekroczyć.

## Najważniejsze regulacje ostrożnościowe
Wykład wymienia cztery podstawowe narzędzia:

**1. Limit koncentracji zaangażowań.** Bank nie może „postawić wszystkiego na jedną kartę”. Zaangażowanie (kredyty, gwarancje, akcje) wobec jednego klienta lub grupy powiązanych podmiotów nie może przekroczyć **25% kapitału** banku (obecnie według unijnego rozporządzenia CRR; dawniej regulował to art. 71 Prawa bankowego). Dzięki temu upadek jednego dużego klienta nie zatopi banku.

**2. [[wspolczynnik-wyplacalnosci|Współczynnik wypłacalności]] (adekwatność kapitałowa).** Fundusze własne banku podzielone przez aktywa ważone ryzykiem muszą wynosić co najmniej **8%**. Im bardziej ryzykowny kredyt, tym więcej kapitału trzeba „odłożyć”.

**3. Współczynniki płynności.** Bank musi mieć zapas płynnych aktywów:
- **LCR** (wskaźnik pokrycia wypływów netto) — płynne aktywa muszą pokryć wypływy w 30-dniowym scenariuszu stresu, minimum 100%,
- **NSFR** (wskaźnik stabilnego finansowania netto) — długie aktywa muszą być finansowane stabilnymi źródłami, minimum 100%.

**4. Rezerwy i odpisy.** Bank tworzy rezerwy celowe (dziś głównie odpisy aktualizujące wartość według MSSF 9) na kredyty, które mogą nie zostać spłacone. Gdy klient przestaje płacić, strata jest już częściowo „zaksięgowana” i nie uderza w bank znienacka.

> !zapamietaj Cztery filary bezpieczeństwa banku według wykładu: **limit koncentracji**, **współczynnik wypłacalności**, **współczynnik płynności**, **rezerwy**. Pierwsze chroni przed jednym dużym dłużnikiem, drugie — przed stratami, trzecie — przed brakiem gotówki, czwarte — przed złymi kredytami.

> !przyklad Bank ma 1 mld zł funduszy własnych. Największy klient, grupa deweloperska, chce kolejnego kredytu, a już ma 230 mln zł zaangażowania. Limit 25% to 250 mln zł, więc bank może dać najwyżej 20 mln zł więcej. Na większą kwotę musiałby zorganizować kredyt konsorcjalny z innymi bankami.

## Bazylejski Komitet Nadzoru Bankowego
[[bazylea|Komitet Bazylejski]] działa przy Banku Rozrachunków Międzynarodowych (BIS) w Bazylei od 1974 r. Sam nie ma władzy ustawodawczej — tworzy standardy, które potem wdrażają państwa i UE (w UE przez rozporządzenie CRR i dyrektywę CRD).

| Umowa | Rok | Co wprowadziła |
|---|---|---|
| Bazylea I | 1988 | minimalny współczynnik kapitałowy 8%, proste wagi ryzyka kredytowego |
| Bazylea II | 2004 | trzy filary; dokładniejszy pomiar ryzyka kredytowego; wymóg na ryzyko operacyjne |
| Bazylea III | 2010 (wdrażana stopniowo) | wyższa jakość kapitału, bufory kapitałowe, wskaźnik dźwigni, LCR i NSFR |

## Trzy filary Bazylei II (i III)
**Filar I — minimalne wymogi kapitałowe.** Bank liczy wymóg kapitałowy na ryzyko kredytowe, rynkowe i operacyjne. To jest „twarda” liczba: co najmniej 8% aktywów ważonych ryzykiem.

**Filar II — samoocena banku i przegląd nadzorczy.** Bank sam ocenia wszystkie swoje ryzyka, także te, których nie obejmuje filar I (np. ryzyko koncentracji, ryzyko stopy procentowej w portfelu bankowym), i wylicza kapitał wewnętrzny (proces ICAAP). Nadzorca sprawdza tę ocenę (w Polsce w ramach BION) i może zażądać więcej kapitału.

**Filar III — dyscyplina rynkowa.** Bank publikuje informacje o kapitale, ryzyku i zarządzaniu. Inwestorzy, klienci i analitycy mogą je ocenić i „ukarać” bank, np. żądając wyższego oprocentowania za jego obligacje.

> !uwaga Filar III działa tylko wtedy, gdy rynek naprawdę czyta te informacje. W kryzysie 2007–2009 okazało się, że wielu inwestorów nie rozumiało ryzyka banków — dlatego Bazylea III dodała bufory i wskaźniki płynności niezależne od rynku.

## Po co bufory?
Bazylea III dodała ponad minimum 8% m.in. **bufor zabezpieczający** i **bufor antycykliczny**. W dobrych czasach banki gromadzą dodatkowy kapitał, a w kryzysie mogą go „zużyć”, nie ograniczając gwałtownie kredytów. To jak oszczędzanie na czarną godzinę.`,
            ru: `Пруденциальное регулирование — это «правила дорожного движения» для банков. Оно не говорит, кому банк должен дать кредит, но задаёт границы, которые нельзя пересекать.

## Важнейшие пруденциальные нормы
Лекция называет четыре основных инструмента:

**1. Лимит концентрации.** Банк не может «ставить всё на одну карту». Вложения (кредиты, гарантии, акции) в одного клиента или группу связанных лиц не могут превышать **25% капитала** банка (сейчас по регламенту ЕС CRR; ранее это регулировала ст. 71 «Prawo bankowe»). Благодаря этому падение одного крупного клиента не потопит банк.

**2. [[wspolczynnik-wyplacalnosci|Коэффициент платёжеспособности]] (достаточность капитала).** Собственные средства банка, делённые на активы, взвешенные по риску, должны составлять не менее **8%**. Чем рискованнее кредит, тем больше капитала нужно «отложить».

**3. Нормативы ликвидности.** У банка должен быть запас ликвидных активов:
- **LCR** (норматив покрытия чистого оттока) — ликвидные активы должны покрывать отток в 30-дневном стресс-сценарии, минимум 100%,
- **NSFR** (норматив чистого стабильного фондирования) — долгие активы должны финансироваться стабильными источниками, минимум 100%.

**4. Резервы и списания.** Банк создаёт целевые резервы (сегодня в основном корректировки стоимости по МСФО 9) на кредиты, которые могут быть не возвращены. Когда клиент перестаёт платить, убыток уже частично «учтён» и не бьёт по банку внезапно.

> !zapamietaj Четыре опоры безопасности банка по лекции: **лимит концентрации**, **коэффициент платёжеспособности**, **норматив ликвидности**, **резервы**. Первое защищает от одного крупного должника, второе — от убытков, третье — от нехватки денег, четвёртое — от плохих кредитов.

> !przyklad У банка 1 млрд злотых собственных средств. Крупнейший клиент, девелоперская группа, просит ещё кредит, а у банка уже вложено в неё 230 млн злотых. Лимит 25% — это 250 млн злотых, поэтому банк может дать не больше 20 млн злотых. На большую сумму ему пришлось бы организовать синдицированный кредит с другими банками.

## Базельский комитет по банковскому надзору
[[bazylea|Базельский комитет]] работает при Банке международных расчётов (BIS) в Базеле с 1974 г. Сам он не имеет законодательной власти — он создаёт стандарты, которые затем внедряют государства и ЕС (в ЕС через регламент CRR и директиву CRD).

| Соглашение | Год | Что ввело |
|---|---|---|
| Базель I | 1988 | минимальный коэффициент капитала 8%, простые веса кредитного риска |
| Базель II | 2004 | три столпа; более точное измерение кредитного риска; требование по операционному риску |
| Базель III | 2010 (внедряется поэтапно) | более качественный капитал, буферы капитала, показатель левериджа, LCR и NSFR |

## Три столпа Базеля II (и III)
**Столп I — минимальные требования к капиталу.** Банк рассчитывает требование к капиталу на кредитный, рыночный и операционный риск. Это «жёсткая» цифра: не менее 8% активов, взвешенных по риску.

**Столп II — самооценка банка и надзорная проверка.** Банк сам оценивает все свои риски, в том числе не охваченные столпом I (например, риск концентрации, процентный риск банковского портфеля), и рассчитывает внутренний капитал (процесс ICAAP). Надзор проверяет эту оценку (в Польше в рамках BION) и может потребовать больше капитала.

**Столп III — рыночная дисциплина.** Банк публикует информацию о капитале, рисках и управлении. Инвесторы, клиенты и аналитики могут её оценить и «наказать» банк, например потребовав более высокой ставки по его облигациям.

> !uwaga Столп III работает, только если рынок действительно читает эту информацию. В кризис 2007–2009 гг. оказалось, что многие инвесторы не понимали риски банков, — поэтому Базель III добавил буферы и нормативы ликвидности, не зависящие от рынка.

## Зачем буферы?
Базель III добавил сверх минимума 8%, в частности, **буфер консервации капитала** и **антициклический буфер**. В хорошие времена банки накапливают дополнительный капитал, а в кризис могут его «израсходовать», не сокращая резко кредитование. Это как откладывать на чёрный день.`,
          },
          quiz: [
            { q: { pl: "Minimalny łączny współczynnik kapitałowy według Bazylei wynosi:", ru: "Минимальный общий коэффициент достаточности капитала по Базелю:" },
              a: [{ pl: "3,5%", ru: "3,5%" }, { pl: "25%", ru: "25%" }, { pl: "100%", ru: "100%" }, { pl: "8%", ru: "8%" }],
              correct: 3, why: { pl: "Od Bazylei I minimum to 8% aktywów ważonych ryzykiem; bufory dochodzą ponad to.", ru: "С Базеля I минимум — 8% активов, взвешенных по риску; буферы добавляются сверху." } },
            { q: { pl: "Limit koncentracji zaangażowań wobec jednego klienta to:", ru: "Лимит концентрации на одного клиента:" },
              a: [{ pl: "25% kapitału banku", ru: "25% капитала банка" }, { pl: "8% aktywów", ru: "8% активов" }, { pl: "50% depozytów", ru: "50% депозитов" }, { pl: "brak limitu", ru: "лимита нет" }],
              correct: 0, why: { pl: "Zaangażowanie wobec klienta lub grupy powiązanej nie może przekroczyć 25% kapitału.", ru: "Вложения в клиента или связанную группу не могут превышать 25% капитала." } },
            { q: { pl: "Samoocena banku (ICAAP) i przegląd nadzorczy to filar:", ru: "Самооценка банка (ICAAP) и надзорная проверка — это столп:" },
              a: [{ pl: "I", ru: "I" }, { pl: "II", ru: "II" }, { pl: "III", ru: "III" }, { pl: "IV", ru: "IV" }],
              correct: 1, why: { pl: "Filar I — wymogi minimalne, II — samoocena i nadzór, III — dyscyplina rynkowa.", ru: "Столп I — минимальные требования, II — самооценка и надзор, III — рыночная дисциплина." } },
            { q: { pl: "Wskaźnik LCR sprawdza, czy bank:", ru: "Норматив LCR проверяет, может ли банк:" },
              a: [{ pl: "ma wystarczająco dużo oddziałów", ru: "иметь достаточно отделений" }, { pl: "płaci dywidendę", ru: "платить дивиденды" }, { pl: "przetrwa 30-dniowy stres płynnościowy dzięki płynnym aktywom", ru: "пережить 30-дневный стресс ликвидности за счёт ликвидных активов" }, { pl: "ma kredyty tylko w złotych", ru: "иметь кредиты только в злотых" }],
              correct: 2, why: { pl: "LCR: płynne aktywa wysokiej jakości ≥ wypływy netto w 30 dniach stresu (min. 100%).", ru: "LCR: высококачественные ликвидные активы ≥ чистый отток за 30 дней стресса (мин. 100%)." } },
            { q: { pl: "Filar III Bazylei polega na:", ru: "Столп III Базеля заключается в:" },
              a: [{ pl: "ujawnianiu informacji, by rynek mógł ocenić bank", ru: "раскрытии информации, чтобы рынок мог оценить банк" }, { pl: "gwarantowaniu depozytów", ru: "гарантировании депозитов" }, { pl: "ustalaniu stóp procentowych", ru: "установлении процентных ставок" }, { pl: "kontroli kursu walut", ru: "контроле валютного курса" }],
              correct: 0, why: { pl: "Dyscyplina rynkowa działa przez przejrzystość — publikację danych o ryzyku i kapitale.", ru: "Рыночная дисциплина работает через прозрачность — публикацию данных о риске и капитале." } },
          ],
        },
        // ------------------------------------------------------------------ 3.3
        {
          id: "3.3",
          title: { pl: "System gwarantowania depozytów (BFG)", ru: "Система гарантирования депозитов (BFG)" },
          src: "Podstawy bankowości, slajd 64; ustawa o BFG (Dz.U. 2016 poz. 996), art. 17, 22, 24, 35, 66, 110",
          body: {
            pl: `Co się stanie z Twoimi oszczędnościami, jeśli bank upadnie? W Polsce odpowiedź daje [[bfg|Bankowy Fundusz Gwarancyjny]]. Działa od 1995 r., a obecnie na podstawie ustawy z 10 czerwca 2016 r. o BFG, systemie gwarantowania depozytów oraz przymusowej restrukturyzacji.

## Ile jest gwarantowane
> !zapamietaj Art. 24 ustawy o BFG: środki deponenta w jednym banku są objęte ochroną **do równowartości w złotych 100 000 euro — w całości**. Euro przelicza się po **kursie średnim NBP** z dnia spełnienia warunku gwarancji.

Ważne szczegóły:
- limit liczy się **na jednego deponenta w jednym banku** — wszystkie jego rachunki w tym banku sumuje się,
- jeśli masz pieniądze w dwóch różnych bankach, każdy jest chroniony osobno do 100 000 euro,
- rachunek wspólny (np. małżonków) dzieli się po równo między współposiadaczy, chyba że umowa stanowi inaczej,
- odsetki naliczone do dnia spełnienia warunku gwarancji też są chronione.

**Wyższa ochrona w szczególnych sytuacjach.** Art. 24 ust. 3 przewiduje dodatkową ochronę dla osób fizycznych, które dostały duże pieniądze z określonych źródeł, m.in. ze sprzedaży mieszkania lub domu (poza działalnością gospodarczą), z podziału majątku po rozwodzie, ze spadku, z ubezpieczenia na życie lub odprawy. Takie środki są chronione przez **3 miesiące** od wpływu na rachunek, do łącznej kwoty dwukrotności limitu.

## Kiedy BFG wypłaca pieniądze
Wypłata następuje po **spełnieniu warunku gwarancji**. W przypadku banku oznacza to m.in., że KNF zawiesiła działalność banku i wystąpiła do sądu o ogłoszenie upadłości (albo z takim wnioskiem wystąpił BFG).

> !zapamietaj Art. 35 ust. 3: świadczenie jest płatne **w złotych, w terminie 7 dni roboczych** od dnia spełnienia warunku gwarancji.

## Kto jest chroniony, a kto nie
Ochroną objęte są środki na rachunkach bankowych (art. 17) — osób fizycznych, przedsiębiorców, wspólnot mieszkaniowych, fundacji, stowarzyszeń, szkół itp. Gwarancje obejmują banki krajowe, oddziały banków zagranicznych spoza UE oraz SKOK-i.

Art. 22 wyłącza z ochrony m.in. środki:

| Wyłączeni z ochrony (art. 22) | Dlaczego |
|---|---|
| Skarbu Państwa i NBP | państwo nie potrzebuje ochrony |
| banków, SKOK-ów i samego BFG | to profesjonalni uczestnicy rynku |
| instytucji finansowych, firm inwestycyjnych, ubezpieczycieli | mają własne zasoby do oceny ryzyka |
| funduszy inwestycyjnych i emerytalnych | j.w. |
| jednostek samorządu terytorialnego | podmioty publiczne |
| osób niezidentyfikowanych przez bank | nie wiadomo, komu wypłacić |

> !uwaga Gwarancje BFG obejmują **depozyty**, a nie inwestycje. Akcje, jednostki funduszy inwestycyjnych czy obligacje kupione przez bank nie są chronione przez BFG — inwestorzy mają osobny, znacznie niższy system rekompensat.

> !przyklad Pani Anna ma w banku X: konto osobiste 50 000 zł i lokatę 400 000 zł. Bank upada, kurs średni NBP wynosi 4,30 zł/EUR. Limit to 100 000 × 4,30 = 430 000 zł. Pani Anna ma 450 000 zł, więc w ciągu 7 dni roboczych dostaje 430 000 zł z BFG, a o pozostałe 20 000 zł musi walczyć w postępowaniu upadłościowym.

## Skąd BFG ma pieniądze
Fundusz finansują **składki banków i kas** — na fundusz gwarancyjny i fundusz przymusowej restrukturyzacji. Wysokość składki zależy od wielkości depozytów i profilu ryzyka banku: ryzykowniejszy bank płaci więcej. W razie potrzeby BFG może pozyskać dodatkowe środki, np. pożyczkę.

## Przymusowa restrukturyzacja
Od 2016 r. BFG jest też organem [[przymusowa-restrukturyzacja|przymusowej restrukturyzacji]] (art. 65). Zamiast pozwolić bankowi upaść, BFG może go „rozmontować” tak, by klienci zachowali dostęp do kont.

**Cele (art. 66):** utrzymanie stabilności finansowej, ograniczenie użycia pieniędzy publicznych, zapewnienie ciągłości funkcji krytycznych (np. płatności), ochrona deponentów oraz środków klientów.

**Instrumenty (art. 110):**
1. **przejęcie przedsiębiorstwa** — sprzedaż banku lub jego części innemu bankowi,
2. **instytucja pomostowa** — przeniesienie dobrej części banku do tymczasowego „banku pomostowego”,
3. **umorzenie lub konwersja zobowiązań (bail-in)** — straty pokrywają akcjonariusze i wierzyciele, a nie podatnicy,
4. **wydzielenie praw majątkowych** — przeniesienie złych aktywów do osobnego podmiotu.

W Polsce przymusową restrukturyzację zastosowano wobec Banku Spółdzielczego w Przemkowie (2020), Idea Banku (2020, przejęcie przez Bank Pekao) i Getin Noble Banku (2022, instytucja pomostowa VeloBank).`,
            ru: `Что будет с вашими сбережениями, если банк обанкротится? В Польше ответ даёт [[bfg|Банковский гарантийный фонд (BFG)]]. Он работает с 1995 г., а сейчас — на основании закона от 10 июня 2016 г. о BFG, системе гарантирования депозитов и принудительной реструктуризации.

## Сколько гарантируется
> !zapamietaj Ст. 24 закона о BFG: средства вкладчика в одном банке защищены **до эквивалента в злотых 100 000 евро — полностью**. Евро пересчитывают по **среднему курсу NBP** на день наступления гарантийного случая.

Важные детали:
- лимит считается **на одного вкладчика в одном банке** — все его счета в этом банке суммируются,
- если у вас деньги в двух разных банках, каждый защищён отдельно до 100 000 евро,
- совместный счёт (например, супругов) делится поровну между совладельцами, если договор не предусматривает иное,
- проценты, начисленные до дня гарантийного случая, тоже защищены.

**Повышенная защита в особых ситуациях.** Ст. 24 п. 3 предусматривает дополнительную защиту для физических лиц, получивших крупные суммы из определённых источников, в частности от продажи квартиры или дома (вне предпринимательской деятельности), от раздела имущества после развода, наследства, страхования жизни или выходного пособия. Такие средства защищены **3 месяца** с момента поступления на счёт, в общей сумме до двойного лимита.

## Когда BFG выплачивает деньги
Выплата происходит после **наступления гарантийного случая (spełnienie warunku gwarancji)**. Для банка это означает, в частности, что KNF приостановила деятельность банка и обратилась в суд с заявлением о банкротстве (или такое заявление подал BFG).

> !zapamietaj Ст. 35 п. 3: выплата производится **в злотых в течение 7 рабочих дней** со дня наступления гарантийного случая.

## Кто защищён, а кто нет
Защищены средства на банковских счетах (ст. 17) — физических лиц, предпринимателей, товариществ собственников жилья, фондов, ассоциаций, школ и т. п. Гарантии охватывают польские банки, филиалы иностранных банков из-за пределов ЕС и SKOK.

Ст. 22 исключает из защиты, в частности, средства:

| Исключены из защиты (ст. 22) | Почему |
|---|---|
| государственной казны и NBP | государству защита не нужна |
| банков, SKOK и самого BFG | это профессиональные участники рынка |
| финансовых учреждений, инвестиционных фирм, страховщиков | у них есть свои ресурсы для оценки риска |
| инвестиционных и пенсионных фондов | то же самое |
| органов местного самоуправления | публичные субъекты |
| лиц, не идентифицированных банком | неизвестно, кому платить |

> !uwaga Гарантии BFG касаются **депозитов**, а не инвестиций. Акции, паи инвестиционных фондов или облигации, купленные через банк, BFG не защищает — для инвесторов есть отдельная, гораздо более низкая система компенсаций.

> !przyklad У пани Анны в банке X: личный счёт 50 000 злотых и вклад 400 000 злотых. Банк банкротится, средний курс NBP — 4,30 злотых/EUR. Лимит = 100 000 × 4,30 = 430 000 злотых. У пани Анны 450 000 злотых, поэтому в течение 7 рабочих дней она получает 430 000 злотых от BFG, а за оставшиеся 20 000 злотых ей придётся бороться в процедуре банкротства.

## Откуда у BFG деньги
Фонд финансируется **взносами банков и касс** — в гарантийный фонд и фонд принудительной реструктуризации. Размер взноса зависит от объёма депозитов и профиля риска банка: более рискованный банк платит больше. При необходимости BFG может привлечь дополнительные средства, например заём.

## Принудительная реструктуризация
С 2016 г. BFG является также органом [[przymusowa-restrukturyzacja|принудительной реструктуризации]] (ст. 65). Вместо того чтобы дать банку обанкротиться, BFG может его «разобрать» так, чтобы клиенты сохранили доступ к счетам.

**Цели (ст. 66):** поддержание финансовой стабильности, ограничение использования государственных денег, обеспечение непрерывности критических функций (например, платежей), защита вкладчиков и средств клиентов.

**Инструменты (ст. 110):**
1. **передача предприятия** — продажа банка или его части другому банку,
2. **бридж-банк (instytucja pomostowa)** — перенос хорошей части банка во временный «переходный банк»,
3. **списание или конверсия обязательств (bail-in)** — убытки покрывают акционеры и кредиторы, а не налогоплательщики,
4. **выделение имущественных прав** — перенос плохих активов в отдельный субъект.

В Польше принудительную реструктуризацию применили к Кооперативному банку в Пшемкуве (2020), Idea Bank (2020, присоединение к Bank Pekao) и Getin Noble Bank (2022, бридж-банк VeloBank).`,
          },
          quiz: [
            { q: { pl: "Do jakiej kwoty BFG gwarantuje depozyty jednego deponenta w jednym banku?", ru: "До какой суммы BFG гарантирует депозиты одного вкладчика в одном банке?" },
              a: [{ pl: "50 000 euro", ru: "50 000 евро" }, { pl: "100 000 zł", ru: "100 000 злотых" }, { pl: "równowartości 100 000 euro", ru: "эквивалента 100 000 евро" }, { pl: "bez limitu", ru: "без лимита" }],
              correct: 2, why: { pl: "Art. 24 ust. 1: do równowartości w złotych 100 000 euro w całości.", ru: "Ст. 24 п. 1: до эквивалента в злотых 100 000 евро полностью." } },
            { q: { pl: "W jakim terminie BFG wypłaca środki gwarantowane?", ru: "В какой срок BFG выплачивает гарантированные средства?" },
              a: [{ pl: "7 dni roboczych", ru: "7 рабочих дней" }, { pl: "30 dni", ru: "30 дней" }, { pl: "3 miesiące", ru: "3 месяца" }, { pl: "1 rok", ru: "1 год" }],
              correct: 0, why: { pl: "Art. 35 ust. 3: w złotych, w terminie 7 dni roboczych od spełnienia warunku gwarancji.", ru: "Ст. 35 п. 3: в злотых, в течение 7 рабочих дней с наступления гарантийного случая." } },
            { q: { pl: "Czyje środki NIE są objęte gwarancjami BFG?", ru: "Чьи средства НЕ защищены гарантиями BFG?" },
              a: [{ pl: "Osoby fizycznej", ru: "Физического лица" }, { pl: "Małej firmy", ru: "Малой фирмы" }, { pl: "Fundacji", ru: "Фонда (фундации)" }, { pl: "Jednostki samorządu terytorialnego", ru: "Органа местного самоуправления" }],
              correct: 3, why: { pl: "Art. 22 ust. 1 pkt 12 wyłącza z ochrony jednostki samorządu terytorialnego.", ru: "Ст. 22 п. 1 пп. 12 исключает из защиты органы местного самоуправления." } },
            { q: { pl: "Klient ma 60 000 euro w banku A i 70 000 euro w banku B. Oba banki upadają. Ile jest chronione?", ru: "У клиента 60 000 евро в банке A и 70 000 евро в банке B. Оба банка банкротятся. Сколько защищено?" },
              a: [{ pl: "100 000 euro łącznie", ru: "100 000 евро в сумме" }, { pl: "całe 130 000 euro", ru: "все 130 000 евро" }, { pl: "tylko 70 000 euro", ru: "только 70 000 евро" }, { pl: "nic", ru: "ничего" }],
              correct: 1, why: { pl: "Limit dotyczy deponenta w każdym banku osobno, więc obie kwoty mieszczą się w limitach.", ru: "Лимит действует для вкладчика в каждом банке отдельно, поэтому обе суммы в пределах лимитов." } },
            { q: { pl: "Instrument restrukturyzacji, w którym straty pokrywają akcjonariusze i wierzyciele, to:", ru: "Инструмент реструктуризации, при котором убытки покрывают акционеры и кредиторы:" },
              a: [{ pl: "instytucja pomostowa", ru: "бридж-банк" }, { pl: "wydzielenie praw majątkowych", ru: "выделение имущественных прав" }, { pl: "umorzenie lub konwersja zobowiązań (bail-in)", ru: "списание или конверсия обязательств (bail-in)" }, { pl: "kredyt lombardowy", ru: "ломбардный кредит" }],
              correct: 2, why: { pl: "Bail-in przenosi koszt na właścicieli i wierzycieli banku zamiast na podatników.", ru: "Bail-in переносит издержки на владельцев и кредиторов банка вместо налогоплательщиков." } },
            { q: { pl: "Czy jednostki funduszu inwestycyjnego kupione w banku są chronione przez BFG?", ru: "Защищены ли BFG паи инвестиционного фонда, купленные в банке?" },
              a: [{ pl: "Tak, do 100 000 euro", ru: "Да, до 100 000 евро" }, { pl: "Tak, bez limitu", ru: "Да, без лимита" }, { pl: "Tylko przez 3 miesiące", ru: "Только 3 месяца" }, { pl: "Nie, BFG chroni depozyty, a nie inwestycje", ru: "Нет, BFG защищает депозиты, а не инвестиции" }],
              correct: 3, why: { pl: "Gwarancje obejmują środki na rachunkach bankowych; inwestycje mają inny system.", ru: "Гарантии охватывают средства на банковских счетах; для инвестиций другая система." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Który organ nadzoruje banki w Polsce?", ru: "Какой орган надзирает за банками в Польше?" },
          a: [{ pl: "KNF", ru: "KNF" }, { pl: "RPP", ru: "RPP" }, { pl: "BFG", ru: "BFG" }, { pl: "GIIF", ru: "GIIF" }],
          correct: 0, why: { pl: "KNF to zintegrowany nadzór nad całym rynkiem finansowym.", ru: "KNF — интегрированный надзор за всем финансовым рынком." } },
        { q: { pl: "Trzy etapy nadzoru nad bankiem to:", ru: "Три этапа надзора за банком:" },
          a: [{ pl: "emisja, obrót, wykup", ru: "эмиссия, обращение, погашение" }, { pl: "założenie, funkcjonowanie, wyjście z rynku", ru: "создание, функционирование, уход с рынка" }, { pl: "identyfikacja, pomiar, kontrola", ru: "выявление, измерение, контроль" }, { pl: "lokowanie, maskowanie, legitymizacja", ru: "размещение, маскировка, легитимизация" }],
          correct: 1, why: { pl: "Nadzór obejmuje cały cykl życia banku.", ru: "Надзор охватывает весь жизненный цикл банка." } },
        { q: { pl: "Jednolity Mechanizm Nadzorczy (SSM) prowadzi:", ru: "Единый надзорный механизм (SSM) ведёт:" },
          a: [{ pl: "KNF", ru: "KNF" }, { pl: "Komitet Bazylejski", ru: "Базельский комитет" }, { pl: "EBC", ru: "ЕЦБ" }, { pl: "NBP", ru: "NBP" }],
          correct: 2, why: { pl: "EBC nadzoruje w SSM największe banki strefy euro.", ru: "ЕЦБ в SSM надзирает за крупнейшими банками еврозоны." } },
        { q: { pl: "Ustanowienie zarządu komisarycznego w banku to działanie na etapie:", ru: "Назначение временной администрации в банке — мера на этапе:" },
          a: [{ pl: "zakładania banku", ru: "создания банка" }, { pl: "emisji akcji", ru: "выпуска акций" }, { pl: "przyjmowania depozytów", ru: "приёма депозитов" }, { pl: "problemów banku i ewentualnego wyjścia z rynku", ru: "проблем банка и возможного ухода с рынка" }],
          correct: 3, why: { pl: "Zarząd komisaryczny to jedna z najostrzejszych sankcji wobec banku w kłopotach.", ru: "Временная администрация — одна из самых жёстких санкций против проблемного банка." } },
        { q: { pl: "Bank ma 800 mln zł funduszy własnych. Maksymalne zaangażowanie wobec jednego klienta to:", ru: "У банка 800 млн злотых собственных средств. Максимальное вложение в одного клиента:" },
          a: [{ pl: "200 mln zł", ru: "200 млн злотых" }, { pl: "64 mln zł", ru: "64 млн злотых" }, { pl: "400 mln zł", ru: "400 млн злотых" }, { pl: "800 mln zł", ru: "800 млн злотых" }],
          correct: 0, why: { pl: "25% × 800 mln zł = 200 mln zł.", ru: "25% × 800 млн = 200 млн злотых." } },
        { q: { pl: "Współczynnik wypłacalności to relacja:", ru: "Коэффициент платёжеспособности — это отношение:" },
          a: [{ pl: "depozytów do kredytów", ru: "депозитов к кредитам" }, { pl: "funduszy własnych do aktywów ważonych ryzykiem", ru: "собственных средств к активам, взвешенным по риску" }, { pl: "zysku do przychodów", ru: "прибыли к выручке" }, { pl: "gotówki do depozytów", ru: "наличных к депозитам" }],
          correct: 1, why: { pl: "Minimum łącznego współczynnika to 8%.", ru: "Минимум общего коэффициента — 8%." } },
        { q: { pl: "Bazylea III wprowadziła m.in.:", ru: "Базель III ввёл, в частности:" },
          a: [{ pl: "pierwszy w historii wymóg 8%", ru: "впервые в истории требование 8%" }, { pl: "gwarancje depozytów 100 000 euro", ru: "гарантии депозитов 100 000 евро" }, { pl: "wskaźniki płynności LCR i NSFR oraz bufory kapitałowe", ru: "нормативы ликвидности LCR и NSFR и буферы капитала" }, { pl: "cel inflacyjny", ru: "инфляционную цель" }],
          correct: 2, why: { pl: "8% to Bazylea I; Bazylea III dodała płynność, bufory i wskaźnik dźwigni.", ru: "8% — это Базель I; Базель III добавил ликвидность, буферы и леверидж." } },
        { q: { pl: "Kurs średni NBP w dniu spełnienia warunku gwarancji wynosi 4,25 zł/EUR. Limit gwarancji w złotych to:", ru: "Средний курс NBP в день гарантийного случая — 4,25 злотых/EUR. Лимит гарантии в злотых:" },
          a: [{ pl: "100 000 zł", ru: "100 000 злотых" }, { pl: "212 500 zł", ru: "212 500 злотых" }, { pl: "850 000 zł", ru: "850 000 злотых" }, { pl: "425 000 zł", ru: "425 000 злотых" }],
          correct: 3, why: { pl: "100 000 × 4,25 = 425 000 zł.", ru: "100 000 × 4,25 = 425 000 злотых." } },
        { q: { pl: "Kto finansuje Bankowy Fundusz Gwarancyjny?", ru: "Кто финансирует BFG?" },
          a: [{ pl: "Banki i kasy przez składki", ru: "Банки и кассы через взносы" }, { pl: "Wyłącznie budżet państwa", ru: "Только госбюджет" }, { pl: "Deponenci przez opłatę od lokaty", ru: "Вкладчики через сбор с вклада" }, { pl: "EBC", ru: "ЕЦБ" }],
          correct: 0, why: { pl: "Składki zależą od wielkości depozytów i ryzyka banku.", ru: "Взносы зависят от объёма депозитов и риска банка." } },
        { q: { pl: "Przeniesienie dobrej części banku do tymczasowego banku to:", ru: "Перенос хорошей части банка во временный банк — это:" },
          a: [{ pl: "bail-in", ru: "bail-in" }, { pl: "instytucja pomostowa", ru: "бридж-банк (instytucja pomostowa)" }, { pl: "likwidacja", ru: "ликвидация" }, { pl: "kredyt refinansowy", ru: "рефинансовый кредит" }],
          correct: 1, why: { pl: "Tak powstał VeloBank z Getin Noble Banku w 2022 r.", ru: "Так в 2022 г. из Getin Noble Bank возник VeloBank." } },
        { q: { pl: "Środki ze sprzedaży mieszkania osoby fizycznej mają podwyższoną ochronę przez:", ru: "Средства от продажи квартиры физическим лицом имеют повышенную защиту в течение:" },
          a: [{ pl: "7 dni", ru: "7 дней" }, { pl: "1 roku", ru: "1 года" }, { pl: "3 miesięcy", ru: "3 месяцев" }, { pl: "zawsze", ru: "всегда" }],
          correct: 2, why: { pl: "Art. 24 ust. 3: 3 miesiące od wpływu środków, do dwukrotności limitu łącznie.", ru: "Ст. 24 п. 3: 3 месяца с поступления средств, в общей сумме до двойного лимита." } },
        { q: { pl: "Celem przymusowej restrukturyzacji NIE jest:", ru: "Целью принудительной реструктуризации НЕ является:" },
          a: [{ pl: "stabilność finansowa", ru: "финансовая стабильность" }, { pl: "ciągłość funkcji krytycznych", ru: "непрерывность критических функций" }, { pl: "ochrona deponentów", ru: "защита вкладчиков" }, { pl: "zapewnienie zysku akcjonariuszom banku", ru: "обеспечение прибыли акционерам банка" }],
          correct: 3, why: { pl: "Art. 66 wymienia stabilność, ograniczenie pieniędzy publicznych, funkcje krytyczne i ochronę klientów.", ru: "Ст. 66 называет стабильность, ограничение госденег, критические функции и защиту клиентов." } },
      ],
    },
    // ================================================================== W4
    {
      n: 4,
      color: "--c4",
      title: { pl: "Operacje bankowe", ru: "Банковские операции" },
      lead: {
        pl: "Od konta i lokaty, przez kredyt i pożyczkę, kredyty hipoteczne i konsumpcyjne, finansowanie firm (konsorcjum, faktoring, forfaiting, gwarancje), aż po przelewy, karty, akredytywy i inkaso — oraz to, co dzieje się poza bankami: shadow banking i crowdfunding.",
        ru: "От счёта и вклада через кредит и заём, ипотечные и потребительские кредиты, финансирование фирм (синдикат, факторинг, форфейтинг, гарантии) до переводов, карт, аккредитивов и инкассо — а также то, что происходит вне банков: теневой банкинг и краудфандинг.",
      },
      subs: [
        // ------------------------------------------------------------------ 4.1
        {
          id: "4.1",
          title: { pl: "Operacje bankowe i rachunki depozytowe", ru: "Банковские операции и депозитные счета" },
          src: "Podstawy bankowości, slajdy 65–78; Prawo bankowe, art. 49–50",
          body: {
            pl: `Operacje bankowe to, według W.L. Jaworskiego, **stosunki umowne między bankiem a klientem**, w których bank oferuje usługi, a klient z nich korzysta. Każda taka operacja wiąże się z określonym świadczeniem na rzecz klienta — przechowaniem pieniędzy, kredytem, przelewem.

## Klasyfikacja operacji bankowych
Operacje można dzielić według kilku kryteriów:
- **rola operacji** — bierne (bank pozyskuje pieniądze, np. depozyty), czynne (bank je lokuje, np. kredyty) i pośredniczące (usługi, np. przelewy, przechowywanie),
- **przedmiot operacji** — depozytowe, kredytowe, rozliczeniowe, gwarancyjne, walutowe, na papierach wartościowych,
- **waluta** — w złotych lub w walutach obcych,
- **zasięg** — krajowe lub zagraniczne.

## Operacje pozabilansowe
Część operacji **nie pojawia się w bilansie** banku od razu, bo pieniądze nie zmieniły jeszcze właściciela. To np. udzielone gwarancje i poręczenia, otwarte akredytywy, przyznane, ale niewykorzystane limity kredytowe, transakcje terminowe i pochodne. Są ewidencjonowane „pod bilansem”, ale niosą ryzyko — jeśli gwarancja zostanie wykorzystana, bank zapłaci. Dlatego nadzór wymaga na nie kapitału.

## Operacje depozytowe — skąd bank ma pieniądze
Depozyty to główne źródło finansowania banku (operacje bierne). Art. 49 Prawa bankowego wymienia rodzaje [[rachunek-bankowy|rachunków bankowych]]:

| Rachunek | Dla kogo | Do czego |
|---|---|---|
| rozliczeniowy (bieżący i pomocniczy) | firmy, instytucje, osoby prowadzące działalność | obsługa płatności firmy |
| lokaty terminowej | j.w. | ulokowanie nadwyżki na termin |
| oszczędnościowy, oszczędnościowo-rozliczeniowy (ROR), terminowej lokaty oszczędnościowej | osoby fizyczne, szkolne kasy oszczędności, pracownicze kasy zapomogowo-pożyczkowe | codzienne finanse i oszczędzanie |
| powierniczy | powierzający i powiernik | środki na określony cel |

**Rachunek rozliczeniowy.** Firma może mieć jeden rachunek **bieżący** (podstawowy) do całej działalności i dowolnie wiele rachunków **pomocniczych** — np. do wypłat płac czy do konkretnego projektu.

**Rachunki lokat terminowych i oszczędnościowe.** Pieniądze są złożone na **określony termin** i przy **określonym oprocentowaniu**. Wcześniejsza wypłata zwykle oznacza utratę części lub całości odsetek.

**Rachunek oszczędnościowo-rozliczeniowy (ROR).** Zwykłe „konto osobiste”: wpływ pensji, karta, przelewy. Od 2017 r. każdy konsument, który nie ma innego konta w Polsce, ma prawo do **rachunku podstawowego** — prostego, z bezpłatnym podstawowym pakietem operacji. Bank nie może mu go odmówić (poza wyjątkami, np. przy podejrzeniu prania pieniędzy).

**Rachunki do odbioru świadczeń.** Środki z niektórych świadczeń (np. rodzinnych i socjalnych) są **wolne od egzekucji** — komornik nie może ich zająć. Rachunek jest zakładany na jedną osobę fizyczną. Prawo bankowe przewiduje też ogólną **kwotę wolną od zajęcia** na rachunku osoby fizycznej (art. 54).

**[[rachunek-powierniczy|Rachunek powierniczy]].** Ma trzy strony: bank, powiernika (posiadacza rachunku) i powierzającego (właściciela pieniędzy). Środki są zwykle **nieoprocentowane**, **nie wchodzą do masy upadłości** powiernika i **nie podlegają zajęciu** z jego długów. Rachunek może być **otwarty** (wypłaty częściowe, np. po etapach budowy) lub **zamknięty** (wypłata dopiero po zakończeniu inwestycji).

> !przyklad Kupujesz mieszkanie od dewelopera. Nie płacisz mu bezpośrednio, tylko wpłacasz na mieszkaniowy rachunek powierniczy w banku. Jeśli rachunek jest otwarty, bank przekazuje deweloperowi pieniądze po sprawdzeniu, że skończył kolejny etap budowy. Jeśli deweloper upadnie, Twoje pieniądze nie trafią do jego wierzycieli.

> !zapamietaj Rachunki rozliczeniowe są dla **firm i instytucji**, a oszczędnościowe i ROR — dla **osób fizycznych** (art. 49 ust. 2–3 Prawa bankowego). Posiadacz dysponuje środkami swobodnie, chyba że umowa stanowi inaczej (art. 50).

## Lokaty międzybankowe
Banki lokują u siebie nawzajem nadwyżki na bardzo krótkie terminy:
- **overnight (O/N)** — od dziś do jutra,
- **tomnext (T/N, tomorrow-next)** — od jutra do następnego dnia roboczego,
- **spot/next (S/N)** — od dnia spot (za 2 dni robocze) do następnego dnia.

Oprocentowanie takich lokat jest podstawą wskaźników [[wibor|WIBOR]] i [[wiron|WIRON]].

## Bankowe papiery wartościowe
Bank może też pozyskiwać pieniądze, emitując własne papiery — np. **certyfikaty depozytowe** (zbywalne potwierdzenie depozytu) czy obligacje. Emisja bankowych papierów wartościowych to czynność bankowa sensu stricto.`,
            ru: `Банковские операции — это, по В. Л. Яворскому, **договорные отношения между банком и клиентом**, при которых банк предлагает услуги, а клиент ими пользуется. Каждая такая операция связана с определённой услугой для клиента — хранением денег, кредитом, переводом.

## Классификация банковских операций
Операции можно делить по нескольким критериям:
- **роль операции** — пассивные (банк привлекает деньги, например депозиты), активные (банк их размещает, например кредиты) и посреднические (услуги, например переводы, хранение),
- **предмет операции** — депозитные, кредитные, расчётные, гарантийные, валютные, с ценными бумагами,
- **валюта** — в злотых или в иностранной валюте,
- **охват** — внутренние или зарубежные.

## Внебалансовые операции
Часть операций **не сразу появляется в балансе** банка, потому что деньги ещё не сменили владельца. Это, например, выданные гарантии и поручительства, открытые аккредитивы, предоставленные, но неиспользованные кредитные лимиты, срочные и производные сделки. Их учитывают «за балансом», но они несут риск — если гарантию используют, банк заплатит. Поэтому надзор требует под них капитал.

## Депозитные операции — откуда у банка деньги
Депозиты — главный источник финансирования банка (пассивные операции). Ст. 49 «Prawo bankowe» перечисляет виды [[rachunek-bankowy|банковских счетов]]:

| Счёт | Для кого | Для чего |
|---|---|---|
| расчётный (текущий и вспомогательный) | фирмы, организации, лица, ведущие деятельность | обслуживание платежей фирмы |
| срочного вклада | то же | размещение излишка на срок |
| сберегательный, сберегательно-расчётный (ROR), срочного сберегательного вклада | физические лица, школьные сберкассы, работнические кассы взаимопомощи | повседневные финансы и сбережения |
| доверительный | доверитель и доверенное лицо | средства на определённую цель |

**Расчётный счёт.** У фирмы может быть один **текущий** (основной) счёт для всей деятельности и сколько угодно **вспомогательных** — например, для выплаты зарплат или конкретного проекта.

**Срочные и сберегательные счета.** Деньги размещены на **определённый срок** под **определённый процент**. Досрочное снятие обычно означает потерю части или всех процентов.

**Сберегательно-расчётный счёт (ROR).** Обычный «личный счёт»: поступление зарплаты, карта, переводы. С 2017 г. каждый потребитель, у которого нет другого счёта в Польше, имеет право на **базовый счёт (rachunek podstawowy)** — простой, с бесплатным базовым пакетом операций. Банк не может ему отказать (кроме исключений, например при подозрении в отмывании денег).

**Счета для получения пособий.** Средства из некоторых социальных выплат (например, семейных) **защищены от взыскания** — судебный исполнитель (komornik) не может их арестовать. Счёт открывается на одно физическое лицо. «Prawo bankowe» предусматривает также общую **сумму, свободную от ареста**, на счёте физического лица (ст. 54).

**[[rachunek-powierniczy|Доверительный счёт]].** У него три стороны: банк, доверенное лицо (powiernik, владелец счёта) и доверитель (powierzający, собственник денег). Средства обычно **без процентов**, **не входят в конкурсную массу** доверенного лица и **не подлежат аресту** по его долгам. Счёт может быть **открытым** (частичные выплаты, например после этапов строительства) или **закрытым** (выплата только после завершения проекта).

> !przyklad Вы покупаете квартиру у застройщика. Вы платите не ему напрямую, а на жилищный доверительный счёт в банке. Если счёт открытый, банк перечисляет застройщику деньги после проверки, что он завершил очередной этап строительства. Если застройщик обанкротится, ваши деньги не достанутся его кредиторам.

> !zapamietaj Расчётные счета — для **фирм и организаций**, сберегательные и ROR — для **физических лиц** (ст. 49 п. 2–3 «Prawo bankowe»). Владелец свободно распоряжается средствами, если договор не предусматривает иное (ст. 50).

## Межбанковские депозиты
Банки размещают друг у друга излишки на очень короткие сроки:
- **овернайт (O/N)** — с сегодня до завтра,
- **томнекст (T/N, tomorrow-next)** — с завтра до следующего рабочего дня,
- **спот/некст (S/N)** — с даты спот (через 2 рабочих дня) до следующего дня.

Ставки по таким депозитам — основа индикаторов [[wibor|WIBOR]] и [[wiron|WIRON]].

## Банковские ценные бумаги
Банк может также привлекать деньги, выпуская собственные бумаги — например, **депозитные сертификаты** (обращаемое подтверждение депозита) или облигации. Выпуск банковских ценных бумаг — банковская операция sensu stricto.`,
          },
          quiz: [
            { q: { pl: "Dla kogo mogą być prowadzone rachunki rozliczeniowe (art. 49 ust. 2)?", ru: "Для кого могут вестись расчётные счета (ст. 49 п. 2)?" },
              a: [{ pl: "Tylko dla osób fizycznych niepracujących", ru: "Только для неработающих физических лиц" }, { pl: "Dla osób prawnych, jednostek organizacyjnych i osób prowadzących działalność zarobkową", ru: "Для юрлиц, организаций и лиц, ведущих заработную деятельность" }, { pl: "Tylko dla banków", ru: "Только для банков" }, { pl: "Tylko dla szkolnych kas oszczędności", ru: "Только для школьных сберкасс" }],
              correct: 1, why: { pl: "Rachunki rozliczeniowe są dla firm i instytucji; ROR i oszczędnościowe — dla osób fizycznych.", ru: "Расчётные счета — для фирм и организаций; ROR и сберегательные — для физлиц." } },
            { q: { pl: "Środki na rachunku powierniczym:", ru: "Средства на доверительном счёте:" },
              a: [{ pl: "zawsze są wysoko oprocentowane", ru: "всегда под высокий процент" }, { pl: "wchodzą do masy upadłości powiernika", ru: "входят в конкурсную массу доверенного лица" }, { pl: "nie podlegają zajęciu z długów powiernika", ru: "не подлежат аресту по долгам доверенного лица" }, { pl: "może wypłacić każdy klient banku", ru: "может снять любой клиент банка" }],
              correct: 2, why: { pl: "Chronią powierzającego: nie wchodzą do masy upadłości ani nie podlegają zajęciu.", ru: "Они защищают доверителя: не входят в конкурсную массу и не подлежат аресту." } },
            { q: { pl: "Lokata międzybankowa od dziś do jutra to:", ru: "Межбанковский депозит с сегодня до завтра:" },
              a: [{ pl: "overnight (O/N)", ru: "овернайт (O/N)" }, { pl: "tomnext (T/N)", ru: "томнекст (T/N)" }, { pl: "spot/next (S/N)", ru: "спот/некст (S/N)" }, { pl: "1M", ru: "1M" }],
              correct: 0, why: { pl: "O/N zaczyna się dziś, T/N jutro, S/N w dniu spot.", ru: "O/N начинается сегодня, T/N — завтра, S/N — в дату спот." } },
            { q: { pl: "Udzielona gwarancja bankowa, z której beneficjent jeszcze nie skorzystał, to operacja:", ru: "Выданная банковская гарантия, которой бенефициар ещё не воспользовался, — это операция:" },
              a: [{ pl: "depozytowa", ru: "депозитная" }, { pl: "gotówkowa", ru: "кассовая" }, { pl: "bierna", ru: "пассивная" }, { pl: "pozabilansowa", ru: "внебалансовая" }],
              correct: 3, why: { pl: "Pieniądze jeszcze nie wypłynęły, ale ryzyko istnieje — ewidencja pod bilansem.", ru: "Деньги ещё не ушли, но риск есть — учёт за балансом." } },
            { q: { pl: "Od kiedy w Polsce konsument bez konta ma prawo do rachunku podstawowego?", ru: "С какого года в Польше потребитель без счёта имеет право на базовый счёт?" },
              a: [{ pl: "od 1997 r.", ru: "с 1997 г." }, { pl: "od 2008 r.", ru: "с 2008 г." }, { pl: "od 2017 r.", ru: "с 2017 г." }, { pl: "od 2024 r.", ru: "с 2024 г." }],
              correct: 2, why: { pl: "Rachunek podstawowy wprowadzono w 2017 r. w ślad za unijną dyrektywą.", ru: "Базовый счёт ввели в 2017 г. вслед за директивой ЕС." } },
          ],
        },
        // ------------------------------------------------------------------ 4.2
        {
          id: "4.2",
          title: { pl: "Kredyt i pożyczka", ru: "Кредит и заём" },
          src: "Podstawy bankowości, slajdy 79–85, 90–91; Prawo bankowe, art. 69–70",
          body: {
            pl: `Operacje czynne to te, w których bank **lokuje** pieniądze. Najważniejsza z nich to finansowanie klientów. Operacje bezpośrednie polegają na **czasowym i odpłatnym udostępnianiu klientom środków banku** — najczęściej w formie kredytu.

## Definicja kredytu
> !zapamietaj Art. 69 ust. 1 Prawa bankowego: „Przez umowę kredytu bank zobowiązuje się oddać do dyspozycji kredytobiorcy na czas oznaczony w umowie kwotę środków pieniężnych z przeznaczeniem na ustalony cel, a kredytobiorca zobowiązuje się do korzystania z niej na warunkach określonych w umowie, zwrotu kwoty wykorzystanego kredytu wraz z odsetkami w oznaczonych terminach spłaty oraz zapłaty prowizji od udzielonego kredytu”.

Z tej definicji wynikają trzy **cechy kredytu**:
1. **Zwrotność** — pieniądze trzeba oddać.
2. **Celowość** — kredyt ma określony cel (mieszkanie, maszyna, zapasy).
3. **Odpłatność** — płaci się odsetki i prowizję.

Art. 69 ust. 2 wymaga **formy pisemnej** i wymienia, co umowa musi zawierać: strony, kwotę i walutę, cel, zasady i termin spłaty, oprocentowanie i warunki jego zmiany, zabezpieczenie, uprawnienia banku do kontroli wykorzystania kredytu, terminy wypłaty, prowizję oraz warunki zmiany i rozwiązania umowy.

## Zdolność kredytowa
Art. 70 ust. 1: bank uzależnia przyznanie kredytu od [[zdolnosc-kredytowa|zdolności kredytowej]], czyli **zdolności do spłaty kredytu wraz z odsetkami w terminach określonych w umowie**. Klient musi przedstawić dokumenty potrzebne do oceny.

Na zdolność kredytową osoby fizycznej wpływają m.in.:
- wysokość i stabilność dochodu (rodzaj umowy o pracę, staż),
- stałe wydatki i liczba osób na utrzymaniu,
- inne kredyty, limity na kartach i w koncie,
- historia kredytowa (np. w Biurze Informacji Kredytowej),
- wiek i okres kredytowania,
- wysokość wkładu własnego.

> !uwaga Wyjątek z art. 70 ust. 2: bank **może** udzielić kredytu podmiotowi bez zdolności kredytowej, jeśli ustanowi szczególne zabezpieczenie i zostanie przedstawiony program naprawczy, który według banku przywróci zdolność w określonym czasie. To samo dotyczy nowo utworzonych firm (ust. 4).

## Umowa pożyczki
[[pozyczka|Pożyczka]] pochodzi z Kodeksu cywilnego (art. 720 KC). Pożyczkodawca **przenosi na własność** pożyczkobiorcy pieniądze lub rzeczy oznaczone co do gatunku, a pożyczkobiorca zobowiązuje się **oddać tę samą ilość** pieniędzy lub rzeczy tego samego gatunku i jakości po upływie ustalonego czasu.

## Kredyt a pożyczka
| Wyszczególnienie | Kredyt | Pożyczka |
|---|---|---|
| Przepisy | Prawo bankowe (art. 69) | Kodeks cywilny (art. 720) |
| Przedmiot umowy | wyłącznie pieniądze | pieniądze lub rzeczy oznaczone co do gatunku |
| Termin | zawsze oznaczony w umowie | może być oznaczony lub nie |
| Forma udostępnienia | do dyspozycji kredytobiorcy, zwykle bezgotówkowo | przeniesienie własności, także gotówką |
| Udzielający | tylko bank (lub inna instytucja z mocy ustawy) | każdy: osoba, firma, bank |
| Forma umowy | pisemna | dokumentowa, jeśli kwota przekracza 1000 zł |
| Cel | zawsze określony | nie musi być określony |
| Kontrola wykorzystania | bank ma prawo kontroli | zwykle brak |
| Koszt | odsetki i prowizja | może być nieodpłatna |
| Spłata | zwrot wykorzystanej kwoty z odsetkami w terminach | zwrot tej samej ilości |

> !przyklad Kolega pożycza Ci 500 zł do pierwszego — to pożyczka, bez celu, bez odsetek, nawet bez umowy na piśmie. Bank daje Ci 30 000 zł na samochód na 5 lat — to kredyt: umowa pisemna, określony cel, odsetki, prowizja, prawo banku do sprawdzenia, czy kupiłeś auto.

## Metody udzielania kredytu
**Kredyt w rachunku bieżącym.** Bank przyznaje **limit** na rachunku klienta. Saldo może spaść poniżej zera do wysokości limitu. Taki kredyt:
- jest przypisany do rachunku i służy bieżącej płynności (codzienne wydatki),
- ma ograniczoną wysokość,
- jest **odnawialny** — każdy wpływ na rachunek **automatycznie spłaca** zadłużenie i limit znów jest dostępny.

**Kredyt w rachunku kredytowym.** Bank otwiera **osobny rachunek kredytowy**, wypłaca z niego kwotę (jednorazowo lub w transzach) na wskazany cel, a klient spłaca według harmonogramu. Spłacona kwota zwykle nie odnawia się. Tak udziela się kredytów inwestycyjnych, hipotecznych czy samochodowych.

| | W rachunku bieżącym | W rachunku kredytowym |
|---|---|---|
| Rachunek | ten sam co do płatności | osobny |
| Spłata | każdy wpływ | według harmonogramu |
| Odnawialność | tak | zwykle nie |
| Typowy cel | płynność, bieżące wydatki | konkretna inwestycja lub zakup |`,
            ru: `Активные операции — это те, при которых банк **размещает** деньги. Важнейшая из них — финансирование клиентов. Прямые операции заключаются во **временном и платном предоставлении клиентам средств банка** — чаще всего в форме кредита.

## Определение кредита
> !zapamietaj Ст. 69 п. 1 «Prawo bankowe»: «По кредитному договору банк обязуется предоставить в распоряжение заёмщика на указанный в договоре срок денежную сумму для установленной цели, а заёмщик обязуется пользоваться ею на условиях договора, вернуть сумму использованного кредита с процентами в указанные сроки погашения и уплатить комиссию за предоставленный кредит».

Из этого определения вытекают три **признака кредита**:
1. **Возвратность** — деньги нужно вернуть.
2. **Целевой характер** — у кредита есть определённая цель (квартира, станок, запасы).
3. **Платность** — платятся проценты и комиссия.

Ст. 69 п. 2 требует **письменной формы** и перечисляет, что должно быть в договоре: стороны, сумма и валюта, цель, порядок и срок погашения, процентная ставка и условия её изменения, обеспечение, права банка по контролю использования кредита, сроки выдачи, комиссия, а также условия изменения и расторжения договора.

## Кредитоспособность
Ст. 70 п. 1: банк ставит выдачу кредита в зависимость от [[zdolnosc-kredytowa|кредитоспособности]], то есть **способности погасить кредит с процентами в сроки, указанные в договоре**. Клиент обязан представить документы для оценки.

На кредитоспособность физического лица влияют, в частности:
- размер и стабильность дохода (вид трудового договора, стаж),
- постоянные расходы и число иждивенцев,
- другие кредиты, лимиты по картам и счёту,
- кредитная история (например, в Бюро кредитной информации, BIK),
- возраст и срок кредитования,
- размер собственного взноса.

> !uwaga Исключение из ст. 70 п. 2: банк **может** выдать кредит субъекту без кредитоспособности, если установит особое обеспечение и будет представлена программа оздоровления, которая, по оценке банка, восстановит кредитоспособность в определённый срок. То же касается вновь созданных фирм (п. 4).

## Договор займа
[[pozyczka|Заём]] происходит из Гражданского кодекса (ст. 720 KC). Заимодавец **передаёт в собственность** заёмщику деньги или вещи, определённые родовыми признаками, а заёмщик обязуется **вернуть такое же количество** денег или вещей того же рода и качества по истечении установленного срока.

## Кредит и заём
| Признак | Кредит | Заём |
|---|---|---|
| Нормы | «Prawo bankowe» (ст. 69) | Гражданский кодекс (ст. 720) |
| Предмет договора | только деньги | деньги или вещи, определённые родовыми признаками |
| Срок | всегда указан в договоре | может быть указан или нет |
| Форма предоставления | в распоряжение заёмщика, обычно безналично | передача в собственность, в том числе наличными |
| Кто предоставляет | только банк (или другой институт по закону) | любой: человек, фирма, банк |
| Форма договора | письменная | документальная, если сумма больше 1000 злотых |
| Цель | всегда определена | может быть не определена |
| Контроль использования | банк вправе контролировать | обычно нет |
| Стоимость | проценты и комиссия | может быть бесплатным |
| Погашение | возврат использованной суммы с процентами в сроки | возврат того же количества |

> !przyklad Друг одалживает вам 500 злотых до получки — это заём: без цели, без процентов, даже без письменного договора. Банк даёт вам 30 000 злотых на машину на 5 лет — это кредит: письменный договор, определённая цель, проценты, комиссия, право банка проверить, купили ли вы машину.

## Способы предоставления кредита
**Кредит на текущем счёте (овердрафт).** Банк устанавливает **лимит** на счёте клиента. Остаток может уйти ниже нуля в пределах лимита. Такой кредит:
- привязан к счёту и служит текущей ликвидности (повседневные расходы),
- имеет ограниченный размер,
- **возобновляемый** — каждое поступление на счёт **автоматически погашает** долг, и лимит снова доступен.

**Кредит на ссудном счёте.** Банк открывает **отдельный кредитный счёт**, выдаёт с него сумму (сразу или траншами) на указанную цель, а клиент погашает по графику. Погашенная сумма обычно не возобновляется. Так выдают инвестиционные, ипотечные и автокредиты.

| | На текущем счёте | На ссудном счёте |
|---|---|---|
| Счёт | тот же, что для платежей | отдельный |
| Погашение | каждым поступлением | по графику |
| Возобновляемость | да | обычно нет |
| Типичная цель | ликвидность, текущие расходы | конкретное вложение или покупка |`,
          },
          quiz: [
            { q: { pl: "Które trzy cechy charakteryzują kredyt?", ru: "Какие три признака характеризуют кредит?" },
              a: [{ pl: "Zwrotność, celowość, odpłatność", ru: "Возвратность, целевой характер, платность" }, { pl: "Płynność, rentowność, bezpieczeństwo", ru: "Ликвидность, доходность, надёжность" }, { pl: "Anonimowość, dobrowolność, nieodpłatność", ru: "Анонимность, добровольность, бесплатность" }, { pl: "Gotówkowość, krótkoterminowość, bezcelowość", ru: "Наличность, краткосрочность, нецелевой характер" }],
              correct: 0, why: { pl: "Wynikają z art. 69: zwrot, ustalony cel, odsetki i prowizja.", ru: "Они вытекают из ст. 69: возврат, установленная цель, проценты и комиссия." } },
            { q: { pl: "Zdolność kredytowa według art. 70 to:", ru: "Кредитоспособность по ст. 70 — это:" },
              a: [{ pl: "wysokość majątku klienta", ru: "размер имущества клиента" }, { pl: "zdolność do spłaty kredytu z odsetkami w terminach z umowy", ru: "способность погасить кредит с процентами в сроки по договору" }, { pl: "zgoda małżonka na kredyt", ru: "согласие супруга на кредит" }, { pl: "brak wpisów w BIK", ru: "отсутствие записей в BIK" }],
              correct: 1, why: { pl: "Liczy się zdolność spłaty w terminach, a nie sam majątek.", ru: "Важна способность погашать в срок, а не само имущество." } },
            { q: { pl: "Przedmiotem umowy pożyczki mogą być:", ru: "Предметом договора займа могут быть:" },
              a: [{ pl: "wyłącznie pieniądze", ru: "только деньги" }, { pl: "wyłącznie nieruchomości", ru: "только недвижимость" }, { pl: "pieniądze lub rzeczy oznaczone co do gatunku", ru: "деньги или вещи, определённые родовыми признаками" }, { pl: "tylko papiery wartościowe", ru: "только ценные бумаги" }],
              correct: 2, why: { pl: "Art. 720 KC; kredyt dotyczy tylko pieniędzy.", ru: "Ст. 720 KC; кредит касается только денег." } },
            { q: { pl: "Kredyt, który każdy wpływ na rachunek automatycznie spłaca i odnawia, to kredyt:", ru: "Кредит, который каждое поступление на счёт автоматически погашает и возобновляет, — это кредит:" },
              a: [{ pl: "hipoteczny", ru: "ипотечный" }, { pl: "inwestycyjny", ru: "инвестиционный" }, { pl: "w rachunku kredytowym", ru: "на ссудном счёте" }, { pl: "w rachunku bieżącym", ru: "на текущем счёте" }],
              correct: 3, why: { pl: "Limit w rachunku bieżącym jest odnawialny i służy bieżącej płynności.", ru: "Лимит на текущем счёте возобновляемый и служит текущей ликвидности." } },
            { q: { pl: "Czy bank może udzielić kredytu firmie bez zdolności kredytowej?", ru: "Может ли банк выдать кредит фирме без кредитоспособности?" },
              a: [{ pl: "Nigdy", ru: "Никогда" }, { pl: "Tak, przy szczególnym zabezpieczeniu i programie naprawczym", ru: "Да, при особом обеспечении и программе оздоровления" }, { pl: "Tylko za zgodą RPP", ru: "Только с согласия RPP" }, { pl: "Tak, bez żadnych warunków", ru: "Да, без каких-либо условий" }],
              correct: 1, why: { pl: "Art. 70 ust. 2 dopuszcza taki wyjątek pod dwoma warunkami.", ru: "Ст. 70 п. 2 допускает такое исключение при двух условиях." } },
            { q: { pl: "Pożyczka pieniężna od znajomego na 3000 zł wymaga:", ru: "Денежный заём у знакомого на 3000 злотых требует:" },
              a: [{ pl: "formy aktu notarialnego", ru: "нотариальной формы" }, { pl: "zgody KNF", ru: "согласия KNF" }, { pl: "formy dokumentowej", ru: "документальной формы" }, { pl: "żadnej formy, nawet dokumentowej", ru: "никакой формы, даже документальной" }],
              correct: 2, why: { pl: "Art. 720 § 2 KC: pożyczka powyżej 1000 zł wymaga formy dokumentowej.", ru: "Ст. 720 § 2 KC: заём свыше 1000 злотых требует документальной формы." } },
          ],
        },
        // ------------------------------------------------------------------ 4.3
        {
          id: "4.3",
          title: { pl: "Rodzaje kredytów i oprocentowanie", ru: "Виды кредитов и процентные ставки" },
          src: "Podstawy bankowości, slajdy 86–95",
          body: {
            pl: `Kredytów jest tak wiele, że bez porządnej klasyfikacji łatwo się pogubić. Wykład proponuje dziesięć kryteriów.

## Klasyfikacja kredytów bankowych
| Kryterium | Przykładowe rodzaje |
|---|---|
| podmiot | dla osób fizycznych, firm, rolników, samorządów, banków |
| okres | krótkoterminowe (do 1 roku), średnioterminowe (1–5 lat), długoterminowe (powyżej 5 lat) |
| cel | na działalność gospodarczą, konsumpcyjne, mieszkaniowe, konsolidacyjne |
| metoda udzielania | w rachunku bieżącym, w rachunku kredytowym |
| oprocentowanie | stałe, zmienne, okresowo stałe |
| waluta | złotowe, walutowe, indeksowane do waluty |
| częstotliwość wykorzystania i spłaty | jednorazowe, w transzach, odnawialne |
| forma | pieniężne, gwarancyjne (np. akredytywa, gwarancja) |
| zabezpieczenie | hipoteczne, zastawne, wekslowe, z poręczeniem, niezabezpieczone |
| bank kredytujący | jednego banku, konsorcjalne |

## Kredyty dla osób fizycznych
- **saldo debetowe w rachunku** (limit w koncie),
- **[[kredyt-konsumpcyjny|kredyty konsumpcyjne]]**: gotówkowe, studenckie, odnawialne, na kartach kredytowych, samochodowe, konsolidacyjne i inne na potrzeby gospodarstwa domowego,
- **kredyty na cele mieszkaniowe**.

## Kredyt konsumpcyjny
Cechy według wykładu:
- **krótko- i średnioterminowy**,
- wypłacany na rachunek klienta lub gotówkowo,
- bank pobiera **prowizję**,
- za nieterminową spłatę nalicza **odsetki karne**,
- często oferowany w sklepach jako **kredyt ratalny**.

Ustawa o kredycie konsumenckim z 2011 r. chroni klientów przy kredytach do 255 550 zł. Kredytodawca musi podać [[rrso|RRSO]] — rzeczywistą roczną stopę oprocentowania, która obejmuje wszystkie koszty — a klient może **odstąpić od umowy w ciągu 14 dni** bez podawania przyczyny.

> !uwaga Niskie oprocentowanie nominalne nie oznacza taniego kredytu. Dwa kredyty po 8% mogą mieć zupełnie inne RRSO, jeśli jeden ma wysoką prowizję i drogie ubezpieczenie. Porównuj zawsze RRSO i całkowitą kwotę do zapłaty.

## Kredyty mieszkaniowe i hipoteczne
[[kredyt-hipoteczny|Kredyt hipoteczny]] to kredyt długoterminowy (zwykle 20–30 lat), zabezpieczony [[hipoteka|hipoteką]] na nieruchomości. Kredyt mieszkaniowy to kredyt na cel mieszkaniowy (zakup, budowa, remont) — w praktyce prawie zawsze zabezpieczony hipoteką. Kredyt hipoteczny może jednak służyć też innym celom (np. pożyczka hipoteczna na dowolny cel).

Ważne zasady (m.in. Rekomendacja S KNF i ustawa o kredycie hipotecznym z 2017 r.):
- klient zwykle wnosi **wkład własny**, a wskaźnik LTV (kredyt do wartości nieruchomości) jest ograniczony,
- kredyt powinien być w **walucie, w której klient zarabia** — to lekcja z kredytów frankowych,
- bank musi przedstawić ofertę z oprocentowaniem **stałym lub okresowo stałym**,
- raty mogą być **równe** (annuitetowe) albo **malejące**.

## Kredyt konsolidacyjny
Kredyt konsolidacyjny **łączy kilka zobowiązań w jedno**: bank spłaca dotychczasowe kredyty i karty klienta, a klient ma odtąd jedną ratę w jednym banku. Zwykle rata jest niższa, bo okres spłaty się wydłuża — ale całkowity koszt odsetek może wzrosnąć.

> !przyklad Pan Marek ma kredyt gotówkowy (rata 900 zł), limit na karcie (rata 300 zł) i raty za telewizor (200 zł) — razem 1400 zł miesięcznie. Bierze kredyt konsolidacyjny na dłuższy okres z jedną ratą 1000 zł. Co miesiąc oddycha swobodniej, ale spłaca dłużej i w sumie może oddać więcej odsetek.

## Zasady oprocentowania
- **Stałe** — oprocentowanie nie zmienia się przez cały okres. Klient zna ratę z góry, ryzyko zmiany stóp przejmuje bank.
- **Zmienne** — oprocentowanie = wskaźnik rynkowy (np. [[wibor|WIBOR]] 3M lub 6M) + stała marża banku. Rata zmienia się razem ze stopami; ryzyko ponosi klient.
- **Okresowo stałe** — oprocentowanie stałe przez kilka lat (np. 5), potem ustalane na nowo według aktualnych warunków. Kompromis popularny w Polsce.

| | Stałe | Zmienne | Okresowo stałe |
|---|---|---|---|
| Przewidywalność raty | pełna | niska | wysoka przez okres stałości |
| Kto ponosi ryzyko stóp | bank | klient | bank w okresie, potem klient |
| Gdy stopy spadają | klient nie korzysta | rata spada | korzysta dopiero po okresie |

> !zapamietaj W wielu krajach UE kredyty hipoteczne ze stałą stopą dominują. Według danych przytaczanych na wykładzie (J. Choloniewski i in., 2020) stanowiły np. w Belgii 98%, w Niemczech i Wielkiej Brytanii 88%, we Włoszech 77%, na Węgrzech 59%, w Hiszpanii 58%, w Austrii 39%, a w Rumunii tylko 7% wszystkich kredytów hipotecznych. W Polsce przez lata dominowało oprocentowanie zmienne.

| Kraj | Udział kredytów hipotecznych ze stałą stopą |
|---|---|
| Belgia | 98% |
| Niemcy | 88% |
| Wielka Brytania | 88% |
| Włochy | 77% |
| Węgry | 59% |
| Hiszpania | 58% |
| Austria | 39% |
| Rumunia | 7% |`,
            ru: `Кредитов так много, что без хорошей классификации легко запутаться. Лекция предлагает десять критериев.

## Классификация банковских кредитов
| Критерий | Примеры видов |
|---|---|
| субъект | для физических лиц, фирм, фермеров, органов самоуправления, банков |
| срок | краткосрочные (до 1 года), среднесрочные (1–5 лет), долгосрочные (более 5 лет) |
| цель | на предпринимательскую деятельность, потребительские, жилищные, консолидационные |
| способ предоставления | на текущем счёте, на ссудном счёте |
| процентная ставка | фиксированная, плавающая, периодически фиксированная |
| валюта | в злотых, валютные, индексированные к валюте |
| частота использования и погашения | разовые, траншами, возобновляемые |
| форма | денежные, гарантийные (например, аккредитив, гарантия) |
| обеспечение | ипотечные, залоговые, вексельные, с поручительством, без обеспечения |
| банк-кредитор | одного банка, синдицированные |

## Кредиты для физических лиц
- **дебетовое сальдо на счёте** (лимит на счёте),
- **[[kredyt-konsumpcyjny|потребительские кредиты]]**: наличные, студенческие, возобновляемые, по кредитным картам, автомобильные, консолидационные и другие на нужды домохозяйства,
- **кредиты на жилищные цели**.

## Потребительский кредит
Признаки по лекции:
- **кратко- и среднесрочный**,
- выплачивается на счёт клиента или наличными,
- банк берёт **комиссию**,
- за несвоевременное погашение начисляет **штрафные проценты**,
- часто предлагается в магазинах как **кредит в рассрочку**.

Закон о потребительском кредите 2011 г. защищает клиентов по кредитам до 255 550 злотых. Кредитор обязан указать [[rrso|RRSO]] — реальную годовую процентную ставку, включающую все расходы, — а клиент может **отказаться от договора в течение 14 дней** без объяснения причин.

> !uwaga Низкая номинальная ставка не означает дешёвый кредит. Два кредита по 8% могут иметь совсем разную RRSO, если у одного высокая комиссия и дорогая страховка. Всегда сравнивайте RRSO и общую сумму к оплате.

## Жилищные и ипотечные кредиты
[[kredyt-hipoteczny|Ипотечный кредит]] — долгосрочный кредит (обычно на 20–30 лет), обеспеченный [[hipoteka|ипотекой]] на недвижимость. Жилищный кредит — кредит на жилищную цель (покупка, строительство, ремонт) — на практике почти всегда обеспечен ипотекой. Но ипотечный кредит может служить и другим целям (например, ипотечный заём на любую цель).

Важные правила (в частности, Rekomendacja S KNF и закон об ипотечном кредите 2017 г.):
- клиент обычно вносит **собственный взнос**, а показатель LTV (кредит к стоимости недвижимости) ограничен,
- кредит должен быть в **валюте, в которой клиент зарабатывает**, — урок франковых кредитов,
- банк обязан представить предложение с **фиксированной или периодически фиксированной** ставкой,
- платежи могут быть **равными** (аннуитетными) или **убывающими**.

## Консолидационный кредит
Консолидационный кредит **объединяет несколько обязательств в одно**: банк погашает прежние кредиты и карты клиента, и у клиента остаётся один платёж в одном банке. Обычно платёж ниже, потому что срок удлиняется, — но общая стоимость процентов может вырасти.

> !przyklad У пана Марека наличный кредит (платёж 900 злотых), лимит по карте (300 злотых) и рассрочка за телевизор (200 злотых) — всего 1400 злотых в месяц. Он берёт консолидационный кредит на более долгий срок с одним платежом 1000 злотых. Каждый месяц ему легче, но он платит дольше и в сумме может отдать больше процентов.

## Принципы начисления процентов
- **Фиксированная ставка** — не меняется весь срок. Клиент знает платёж заранее, риск изменения ставок берёт на себя банк.
- **Плавающая ставка** — ставка = рыночный индикатор (например, [[wibor|WIBOR]] 3M или 6M) + постоянная маржа банка. Платёж меняется вместе со ставками; риск несёт клиент.
- **Периодически фиксированная** — ставка постоянна несколько лет (например, 5), затем устанавливается заново по текущим условиям. Популярный в Польше компромисс.

| | Фиксированная | Плавающая | Периодически фиксированная |
|---|---|---|---|
| Предсказуемость платежа | полная | низкая | высокая в период фиксации |
| Кто несёт процентный риск | банк | клиент | банк в период фиксации, затем клиент |
| Когда ставки падают | клиент не выигрывает | платёж снижается | выигрывает только после периода |

> !zapamietaj Во многих странах ЕС преобладают ипотечные кредиты с фиксированной ставкой. По данным, приведённым в лекции (J. Choloniewski и др., 2020), они составляли, например, в Бельгии 98%, в Германии и Великобритании 88%, в Италии 77%, в Венгрии 59%, в Испании 58%, в Австрии 39%, а в Румынии лишь 7% всех ипотечных кредитов. В Польше долгие годы преобладала плавающая ставка.

| Страна | Доля ипотечных кредитов с фиксированной ставкой |
|---|---|
| Бельгия | 98% |
| Германия | 88% |
| Великобритания | 88% |
| Италия | 77% |
| Венгрия | 59% |
| Испания | 58% |
| Австрия | 39% |
| Румыния | 7% |`,
          },
          quiz: [
            { q: { pl: "Kredyt średnioterminowy to kredyt na okres:", ru: "Среднесрочный кредит — это кредит на срок:" },
              a: [{ pl: "do 1 roku", ru: "до 1 года" }, { pl: "powyżej 10 lat", ru: "более 10 лет" }, { pl: "od 1 do 5 lat", ru: "от 1 до 5 лет" }, { pl: "dokładnie 30 dni", ru: "ровно 30 дней" }],
              correct: 2, why: { pl: "Krótkoterminowe do 1 roku, średnioterminowe 1–5 lat, długoterminowe powyżej 5 lat.", ru: "Краткосрочные до 1 года, среднесрочные 1–5 лет, долгосрочные более 5 лет." } },
            { q: { pl: "Przy kredycie o zmiennym oprocentowaniu ryzyko wzrostu stóp ponosi:", ru: "По кредиту с плавающей ставкой риск роста ставок несёт:" },
              a: [{ pl: "klient", ru: "клиент" }, { pl: "bank", ru: "банк" }, { pl: "BFG", ru: "BFG" }, { pl: "NBP", ru: "NBP" }],
              correct: 0, why: { pl: "Oprocentowanie zmienne = wskaźnik + marża; gdy wskaźnik rośnie, rośnie rata klienta.", ru: "Плавающая ставка = индикатор + маржа; когда индикатор растёт, растёт платёж клиента." } },
            { q: { pl: "RRSO pozwala porównać kredyty, ponieważ:", ru: "RRSO позволяет сравнивать кредиты, потому что:" },
              a: [{ pl: "jest zawsze równa stopie referencyjnej", ru: "всегда равна референтной ставке" }, { pl: "uwzględnia tylko marżę", ru: "учитывает только маржу" }, { pl: "nie zależy od prowizji", ru: "не зависит от комиссии" }, { pl: "obejmuje wszystkie koszty kredytu w skali roku", ru: "включает все расходы по кредиту в годовом выражении" }],
              correct: 3, why: { pl: "RRSO obejmuje odsetki, prowizje, opłaty i obowiązkowe ubezpieczenia.", ru: "RRSO включает проценты, комиссии, сборы и обязательные страховки." } },
            { q: { pl: "Kredyt konsolidacyjny:", ru: "Консолидационный кредит:" },
              a: [{ pl: "zawsze obniża całkowity koszt", ru: "всегда снижает общую стоимость" }, { pl: "łączy kilka zobowiązań w jedno, zwykle z niższą ratą i dłuższym okresem", ru: "объединяет несколько обязательств в одно, обычно с меньшим платежом и более долгим сроком" }, { pl: "jest udzielany tylko firmom", ru: "выдаётся только фирмам" }, { pl: "jest nieoprocentowany", ru: "беспроцентный" }],
              correct: 1, why: { pl: "Niższa rata wynika z wydłużenia okresu, co może podnieść łączne odsetki.", ru: "Меньший платёж — следствие удлинения срока, что может увеличить общие проценты." } },
            { q: { pl: "W którym kraju według danych z wykładu udział kredytów hipotecznych ze stałą stopą był najwyższy?", ru: "В какой стране, по данным лекции, доля ипотечных кредитов с фиксированной ставкой была самой высокой?" },
              a: [{ pl: "Rumunia", ru: "Румыния" }, { pl: "Austria", ru: "Австрия" }, { pl: "Belgia", ru: "Бельгия" }, { pl: "Hiszpania", ru: "Испания" }],
              correct: 2, why: { pl: "Belgia — 98%; Rumunia — tylko 7%.", ru: "Бельгия — 98%; Румыния — лишь 7%." } },
            { q: { pl: "Odsetki karne w kredycie konsumpcyjnym bank nalicza za:", ru: "Штрафные проценты по потребительскому кредиту банк начисляет за:" },
              a: [{ pl: "wcześniejszą spłatę", ru: "досрочное погашение" }, { pl: "nieterminową spłatę", ru: "несвоевременное погашение" }, { pl: "odstąpienie w ciągu 14 dni", ru: "отказ в течение 14 дней" }, { pl: "zmianę adresu", ru: "смену адреса" }],
              correct: 1, why: { pl: "Odsetki karne to sankcja za opóźnienie w spłacie.", ru: "Штрафные проценты — санкция за просрочку." } },
          ],
        },
        // ------------------------------------------------------------------ 4.4
        {
          id: "4.4",
          title: { pl: "Finansowanie przedsiębiorstw", ru: "Финансирование предприятий" },
          src: "Podstawy bankowości, slajdy 96–102",
          body: {
            pl: `Firma potrzebuje pieniędzy na trzy rzeczy: żeby wystartować, żeby działać na co dzień i żeby się rozwijać. Bank ma na każdą z tych potrzeb inny produkt — a gdy kredyt nie wystarcza, sięga po faktoring, forfaiting, gwarancje i rynek kapitałowy.

## Kredyty dla podmiotów gospodarczych
- **Kredyty na start** — dla nowych firm bez historii. Bank ryzykuje więcej, więc często wymaga dodatkowego zabezpieczenia, poręczenia (np. z funduszu poręczeniowego lub gwarancji BGK) albo planu biznesowego. Przypomnij sobie art. 70 ust. 4 Prawa bankowego.
- **Kredyty obrotowe** — finansują bieżącą działalność: zakup materiałów, towarów, wypłatę wynagrodzeń, lukę między wydatkiem a wpływem od klienta. Udzielane **w rachunku bieżącym** (limit) lub **w rachunku kredytowym** (na konkretny cel, np. zakup partii towaru).
- **Kredyty inwestycyjne** — finansują zakup lub budowę środków trwałych: maszyn, hal, technologii. Są średnio- i długoterminowe, wypłacane w transzach, a bank kontroluje postęp inwestycji.

## Kredyt konsorcjalny
[[kredyt-konsorcjalny|Kredyt konsorcjalny]] to kredyt udzielany przez **kilka banków razem**, na podstawie umowy między nimi.
- Banki zawierają umowę konsorcjum, żeby wspólnie sfinansować duży projekt.
- To działanie **zapobiega nadmiernej koncentracji ryzyka** w jednym banku (por. limit 25% kapitału).
- **Każdy bank ponosi ryzyko proporcjonalnie** do swojego udziału w kredycie.
- Jeden bank (lider, aranżer) organizuje transakcję, a bank-agent prowadzi rozliczenia z klientem.

> !przyklad Budowa farmy wiatrowej kosztuje 1,2 mld zł. Żaden bank nie chce sam zaangażować takiej kwoty. Pięć banków tworzy konsorcjum: lider daje 400 mln zł, cztery pozostałe po 200 mln zł. Jeśli projekt się nie uda, lider poniesie 1/3 straty, a każdy z pozostałych — 1/6.

## Faktoring
[[faktoring|Faktoring]] to **odkup należności** z faktur. Firma sprzedała towar z terminem płatności 60 dni, ale pieniędzy potrzebuje dziś. Sprzedaje fakturę faktorowi (bankowi lub firmie faktoringowej), dostaje od razu zaliczkę (zwykle większość kwoty), a faktor czeka na zapłatę od odbiorcy.

| Rodzaj | Kto ponosi ryzyko niewypłacalności odbiorcy |
|---|---|
| **pełny (właściwy, bez regresu)** | faktor |
| **niepełny (niewłaściwy, z regresem)** | firma — jeśli odbiorca nie zapłaci, faktor żąda zwrotu |
| **mieszany** | faktor do ustalonego limitu, powyżej — firma |

Faktoring poprawia płynność, ale kosztuje (odsetki od zaliczki i prowizja). Faktor często przejmuje też monitorowanie płatności i windykację.

## Forfaiting
[[forfaiting|Forfaiting]] to **odkup bez prawa regresu** należności średnio- i długoterminowych, typowo w **handlu zagranicznym**. Eksporter sprzedaje bankowi należność od zagranicznego importera (np. udokumentowaną wekslami lub akredytywą) z dyskontem i od razu dostaje pieniądze. Bank przejmuje **całe ryzyko**: niewypłacalności, kursowe, stopy procentowej i ryzyko kraju.

| | Faktoring | Forfaiting |
|---|---|---|
| Należności | krótkoterminowe, wiele faktur | średnio- i długoterminowe, pojedyncza duża transakcja |
| Regres | możliwy | brak |
| Typowe zastosowanie | handel krajowy i zagraniczny | eksport, finansowanie dóbr inwestycyjnych |

## Gwarancja bankowa
[[gwarancja-bankowa|Gwarancja bankowa]] to pisemne zobowiązanie banku, że **zapłaci beneficjentowi**, jeśli klient banku nie wykona zobowiązania. Ma trzy strony:
- **zleceniodawca** — klient banku, który prosi o gwarancję,
- **bank-gwarant** — wystawia gwarancję i za nią odpowiada,
- **beneficjent** — ten, kto może z gwarancji skorzystać.

Rodzaje gwarancji:
- **przetargowa (wadialna)** — zastępuje wadium w przetargu,
- **dobrego wykonania kontraktu** — chroni zamawiającego, gdy wykonawca nie dotrzyma umowy,
- **zwrotu zaliczki** — chroni tego, kto zapłacił zaliczkę,
- **zapłaty** — chroni sprzedawcę, gdy kupujący nie zapłaci,
- **usunięcia wad i usterek** (rękojmi),
- **celna** — zabezpiecza należności celne i podatkowe.

Gwarancje mogą być **warunkowe** (beneficjent musi przedstawić dokumenty) albo **bezwarunkowe, płatne na pierwsze żądanie**.

> !zapamietaj Gwarancja to operacja **pozabilansowa**: bank nie wypłaca pieniędzy od razu, ale przyjmuje ryzyko. Za to pobiera prowizję. Zapłaci dopiero wtedy, gdy zleceniodawca zawiedzie — i wtedy dochodzi zwrotu od zleceniodawcy.

## Źródła finansowania z rynku kapitałowego
Duże firmy mogą sięgnąć po pieniądze inwestorów:
- **emisja papierów wartościowych** — akcji (kapitał własny) lub obligacji (dług),
- **nabywanie i zbywanie** papierów wartościowych.

Bank pomaga w tym jako organizator i agent emisji, gwarant jej objęcia, dom maklerski, a także sam kupuje obligacje firm. Według art. 5 ust. 2 Prawa bankowego czynności zlecone związane z emisją papierów wartościowych są czynnością bankową sensu largo.

> !uwaga Emisja akcji nie musi być spłacona, ale oznacza oddanie części własności i dywidendy. Kredyt i obligacje trzeba spłacić z odsetkami, ale właściciele zachowują kontrolę.`,
            ru: `Фирме нужны деньги на три вещи: чтобы начать, чтобы работать каждый день и чтобы развиваться. У банка для каждой из этих потребностей свой продукт — а когда кредита мало, он использует факторинг, форфейтинг, гарантии и рынок капитала.

## Кредиты для хозяйствующих субъектов
- **Кредиты на старт** — для новых фирм без истории. Банк рискует больше, поэтому часто требует дополнительного обеспечения, поручительства (например, гарантийного фонда или гарантии BGK) или бизнес-плана. Вспомните ст. 70 п. 4 «Prawo bankowe».
- **Оборотные кредиты** — финансируют текущую деятельность: покупку материалов и товаров, выплату зарплат, разрыв между расходом и поступлением от клиента. Выдаются **на текущем счёте** (лимит) или **на ссудном счёте** (на конкретную цель, например партию товара).
- **Инвестиционные кредиты** — финансируют покупку или строительство основных средств: станков, цехов, технологий. Они средне- и долгосрочные, выдаются траншами, а банк контролирует ход инвестиции.

## Синдицированный кредит
[[kredyt-konsorcjalny|Синдицированный кредит (kredyt konsorcjalny)]] — кредит, который **несколько банков выдают вместе** на основании договора между собой.
- Банки заключают договор консорциума, чтобы совместно финансировать крупный проект.
- Это **предотвращает чрезмерную концентрацию риска** в одном банке (ср. лимит 25% капитала).
- **Каждый банк несёт риск пропорционально** своей доле в кредите.
- Один банк (лидер, аранжировщик) организует сделку, а банк-агент ведёт расчёты с клиентом.

> !przyklad Строительство ветропарка стоит 1,2 млрд злотых. Ни один банк не хочет вкладывать такую сумму в одиночку. Пять банков образуют консорциум: лидер даёт 400 млн злотых, остальные четыре — по 200 млн. Если проект провалится, лидер понесёт 1/3 убытка, а каждый из остальных — 1/6.

## Факторинг
[[faktoring|Факторинг]] — это **выкуп дебиторской задолженности** по счетам-фактурам. Фирма продала товар с отсрочкой 60 дней, но деньги нужны сегодня. Она продаёт счёт фактору (банку или факторинговой компании), сразу получает аванс (обычно большую часть суммы), а фактор ждёт оплаты от покупателя.

| Вид | Кто несёт риск неплатёжеспособности покупателя |
|---|---|
| **полный (настоящий, без регресса)** | фактор |
| **неполный (ненастоящий, с регрессом)** | фирма — если покупатель не заплатит, фактор требует возврата |
| **смешанный** | фактор до установленного лимита, сверх него — фирма |

Факторинг улучшает ликвидность, но стоит денег (проценты за аванс и комиссия). Фактор часто берёт на себя также контроль платежей и взыскание долгов.

## Форфейтинг
[[forfaiting|Форфейтинг]] — **выкуп без права регресса** средне- и долгосрочной задолженности, обычно во **внешней торговле**. Экспортёр продаёт банку требование к иностранному импортёру (например, оформленное векселями или аккредитивом) с дисконтом и сразу получает деньги. Банк берёт на себя **весь риск**: неплатёжеспособности, валютный, процентный и страновой.

| | Факторинг | Форфейтинг |
|---|---|---|
| Требования | краткосрочные, много счетов | средне- и долгосрочные, одна крупная сделка |
| Регресс | возможен | нет |
| Типичное применение | внутренняя и внешняя торговля | экспорт, финансирование инвестиционных товаров |

## Банковская гарантия
[[gwarancja-bankowa|Банковская гарантия]] — письменное обязательство банка **заплатить бенефициару**, если клиент банка не выполнит обязательство. У неё три стороны:
- **принципал (zleceniodawca)** — клиент банка, который просит о гарантии,
- **банк-гарант** — выдаёт гарантию и отвечает по ней,
- **бенефициар** — тот, кто может воспользоваться гарантией.

Виды гарантий:
- **тендерная (wadialna)** — заменяет залог (wadium) при участии в тендере,
- **надлежащего исполнения контракта** — защищает заказчика, если подрядчик не выполнит договор,
- **возврата аванса** — защищает того, кто заплатил аванс,
- **платежа** — защищает продавца, если покупатель не заплатит,
- **устранения дефектов** (гарантийных обязательств),
- **таможенная** — обеспечивает таможенные и налоговые платежи.

Гарантии бывают **условными** (бенефициар должен представить документы) или **безусловными, по первому требованию**.

> !zapamietaj Гарантия — **внебалансовая** операция: банк не выплачивает деньги сразу, но принимает риск. За это он берёт комиссию. Платит он, только когда принципал подведёт, — и тогда требует возврата от принципала.

## Источники финансирования на рынке капитала
Крупные фирмы могут привлечь деньги инвесторов:
- **выпуск ценных бумаг** — акций (собственный капитал) или облигаций (долг),
- **покупка и продажа** ценных бумаг.

Банк помогает в этом как организатор и агент эмиссии, гарант её размещения, брокер, а также сам покупает облигации фирм. По ст. 5 п. 2 «Prawo bankowe» поручения, связанные с выпуском ценных бумаг, — банковская операция sensu largo.

> !uwaga Выпуск акций не нужно возвращать, но он означает передачу части собственности и дивидендов. Кредит и облигации нужно погашать с процентами, зато владельцы сохраняют контроль.`,
          },
          quiz: [
            { q: { pl: "Kredyt na zakup materiałów i wypłatę płac to kredyt:", ru: "Кредит на покупку материалов и выплату зарплат — это кредит:" },
              a: [{ pl: "inwestycyjny", ru: "инвестиционный" }, { pl: "hipoteczny", ru: "ипотечный" }, { pl: "obrotowy", ru: "оборотный" }, { pl: "konsolidacyjny", ru: "консолидационный" }],
              correct: 2, why: { pl: "Kredyt obrotowy finansuje bieżącą działalność firmy.", ru: "Оборотный кредит финансирует текущую деятельность фирмы." } },
            { q: { pl: "W kredycie konsorcjalnym każdy bank ponosi ryzyko:", ru: "В синдицированном кредите каждый банк несёт риск:" },
              a: [{ pl: "proporcjonalnie do swojego udziału", ru: "пропорционально своей доле" }, { pl: "w całości", ru: "полностью" }, { pl: "tylko lider ponosi ryzyko", ru: "риск несёт только лидер" }, { pl: "ryzyko przejmuje BFG", ru: "риск берёт на себя BFG" }],
              correct: 0, why: { pl: "Tak rozkłada się ryzyko i unika jego koncentracji w jednym banku.", ru: "Так риск распределяется и не концентрируется в одном банке." } },
            { q: { pl: "W faktoringu pełnym (bez regresu) ryzyko niewypłacalności odbiorcy ponosi:", ru: "При полном факторинге (без регресса) риск неплатёжеспособности покупателя несёт:" },
              a: [{ pl: "sprzedawca (faktorant)", ru: "продавец (клиент фактора)" }, { pl: "faktor", ru: "фактор" }, { pl: "odbiorca", ru: "покупатель" }, { pl: "KNF", ru: "KNF" }],
              correct: 1, why: { pl: "Faktoring właściwy przenosi ryzyko na faktora; niewłaściwy zostawia je u firmy.", ru: "Настоящий факторинг переносит риск на фактора; ненастоящий оставляет его у фирмы." } },
            { q: { pl: "Forfaiting dotyczy zwykle:", ru: "Форфейтинг обычно касается:" },
              a: [{ pl: "drobnych faktur krajowych", ru: "мелких внутренних счетов" }, { pl: "kredytów studenckich", ru: "студенческих кредитов" }, { pl: "depozytów overnight", ru: "депозитов овернайт" }, { pl: "średnio- i długoterminowych należności eksportowych, bez regresu", ru: "средне- и долгосрочной экспортной задолженности, без регресса" }],
              correct: 3, why: { pl: "Forfaiter przejmuje całe ryzyko pojedynczej, zwykle dużej transakcji eksportowej.", ru: "Форфейтер берёт весь риск единичной, обычно крупной экспортной сделки." } },
            { q: { pl: "Gwarancja, która zastępuje wadium w przetargu, to gwarancja:", ru: "Гарантия, заменяющая залог (wadium) в тендере, — это гарантия:" },
              a: [{ pl: "celna", ru: "таможенная" }, { pl: "zwrotu zaliczki", ru: "возврата аванса" }, { pl: "przetargowa (wadialna)", ru: "тендерная (wadialna)" }, { pl: "zapłaty", ru: "платежа" }],
              correct: 2, why: { pl: "Gwarancja wadialna zabezpiecza zamawiającego, że oferent podpisze umowę po wygraniu przetargu.", ru: "Тендерная гарантия обеспечивает заказчику, что участник подпишет договор после победы." } },
          ],
        },
        // ------------------------------------------------------------------ 4.5
        {
          id: "4.5",
          title: { pl: "Rozliczenia pieniężne", ru: "Денежные расчёты" },
          src: "Podstawy bankowości, slajdy 103–120",
          body: {
            pl: `Każdy przelew, płatność kartą czy BLIK-iem to dla banku operacja rozliczeniowa. Według wykładu są to operacje, **których celem i skutkiem są zmiany stanu środków na rachunku bankowym**, zapisywane w księgach rachunkowych banku.

## Operacje gotówkowe
- wpłata i wypłata gotówki (w oddziale, we wpłatomacie, w bankomacie),
- przelewy zlecane gotówką (np. opłata rachunku na poczcie),
- wymiana waluty.

Udział gotówki w płatnościach w Polsce systematycznie spada (według badań NBP o zwyczajach płatniczych), ale gotówka nadal pełni ważną rolę, np. jako zapas na wypadek awarii systemów.

## Rozliczenia międzybankowe
Gdy przelewasz pieniądze z banku A do banku B, banki muszą się rozliczyć. Pośredniczy w tym [[kir|Krajowa Izba Rozliczeniowa (KIR)]], która prowadzi systemy:
- **Elixir** — elektroniczny system rozliczeń zwykłych przelewów w złotych, w kilku sesjach w dni robocze,
- **Express Elixir** — przelewy natychmiastowe, rozliczane w czasie zbliżonym do rzeczywistego, także w weekendy,
- **Euro Elixir** — rozliczenia płatności w euro, także w standardzie **SEPA** (jednolity obszar płatności w euro, w którym przelew w euro za granicę kosztuje tyle samo co krajowy).

Duże i pilne płatności rozlicza **SORBNET** — system prowadzony przez NBP, działający w czasie rzeczywistym (brutto, transakcja po transakcji).

| System | Operator | Do czego |
|---|---|---|
| Elixir | KIR | zwykłe przelewy w PLN, sesje |
| Express Elixir | KIR | przelewy natychmiastowe w PLN |
| Euro Elixir | KIR | przelewy w EUR, SEPA |
| SORBNET | NBP | płatności wysokokwotowe w PLN, w czasie rzeczywistym |

## Przelewy natychmiastowe przez operatora (np. BlueCash)
Przed rozpowszechnieniem Express Elixir popularne były przelewy przez operatora, np. **BlueCash** (Blue Media):
1. Zlecasz przelew wewnętrzny ze swojego konta na rachunek operatora w Twoim banku.
2. Bank przekazuje elektronicznie dane odbiorcy operatorowi.
3. Operator wysyła pieniądze przelewem wewnętrznym ze swojego rachunku w banku odbiorcy.

Pieniądze nie „podróżują” między bankami — operator ma konta w wielu bankach i przesuwa środki wewnątrz każdego z nich.

## IBAN i przelewy zagraniczne
[[iban|IBAN]] (International Bank Account Number) składa się z czterech elementów: **kodu kraju**, **liczby kontrolnej**, **numeru banku/oddziału** i **numeru rachunku**. Polski IBAN ma 28 znaków, np. PL 61 1090 1014 0000 0712 1981 2874.

Przelewy zagraniczne spoza SEPA idą zwykle przez sieć **SWIFT**. Klient wybiera, kto płaci koszty:
- **SHA** — każda strona płaci opłaty swojego banku (standard w EOG),
- **OUR** — wszystkie koszty ponosi zleceniodawca,
- **BEN** — wszystkie koszty ponosi odbiorca (potrąca się je z kwoty przelewu).

## Rodzaje rozliczeń bezgotówkowych
1. **Polecenie przelewu** — płatnik każe bankowi przesłać pieniądze odbiorcy.
2. **Polecenie zapłaty** — odbiorca (np. operator telefonii) ściąga pieniądze z rachunku płatnika na podstawie jego wcześniejszej zgody.
3. **Karty płatnicze**.
4. **[[blik|BLIK]]** — płatności aplikacją mobilną z 6-cyfrowym kodem.
5. **Inkaso**.
6. **Akredytywa**.

## Karty płatnicze
| Karta | Skąd pieniądze | Jak się spłaca |
|---|---|---|
| debetowa | z rachunku klienta, od razu | nie ma spłaty, środki schodzą z konta |
| kredytowa | z limitu kredytowego banku | min. część zadłużenia co miesiąc, okres bezodsetkowy |
| obciążeniowa (charge) | bank kredytuje do końca okresu | całe zadłużenie jednorazowo po okresie rozliczeniowym |
| przedpłacona | z wcześniej zasilonej karty | brak — można wydać tylko to, co wpłacono |

## Akredytywa
[[akredytywa|Akredytywa]] to zobowiązanie banku importera do zapłaty eksporterowi po przedstawieniu dokumentów zgodnych z warunkami. Przebieg:
1. Importer i eksporter zawierają **kontrakt** z płatnością akredytywą.
2. Importer zleca swojemu bankowi (**bankowi otwierającemu**) otwarcie akredytywy.
3. Bank otwierający przesyła akredytywę do banku eksportera (**banku awizującego**).
4. Bank awizujący zawiadamia eksportera; ten wysyła towar.
5. Eksporter składa dokumenty (np. fakturę, konosament, polisę, świadectwo pochodzenia) w banku i dostaje zapłatę.
6. Bank otwierający sprawdza dokumenty, płaci i obciąża importera, który odbiera dokumenty i towar.

Rodzaje akredytyw: odwołalna i **nieodwołalna**, przenośna i nieprzenośna, **potwierdzona** (drugi bank też gwarantuje zapłatę) i niepotwierdzona, odnawialna, płatna **at sight** (za okazaniem) lub w terminie odroczonym, akceptacyjna (bank akceptuje weksel), zaliczkowa oraz **stand-by** (działa jak gwarancja).

## Inkaso dokumentowe
[[inkaso|Inkaso]] jest prostsze i tańsze: eksporter przekazuje dokumenty do swojego banku, a ten przez bank importera wydaje je importerowi **dopiero za zapłatą** (D/P) **lub akceptacją weksla** (D/A). Banki nie gwarantują jednak zapłaty — tylko pośredniczą w obiegu dokumentów.

> !zapamietaj Akredytywa = **bank gwarantuje zapłatę** za zgodne dokumenty. Inkaso = bank tylko **wydaje dokumenty za zapłatę**, bez własnego zobowiązania. Akredytywa jest bezpieczniejsza dla eksportera, ale droższa.

> !przyklad Polska firma sprzedaje meble do Kanady nowemu klientowi, którego nie zna. Wybiera nieodwołalną akredytywę potwierdzoną przez swój bank — dostanie pieniądze, gdy złoży poprawne dokumenty. Ze stałym klientem z Niemiec, z którym współpracuje od lat, rozlicza się zwykłym przelewem SEPA.`,
            ru: `Каждый перевод, платёж картой или через BLIK — для банка расчётная операция. По лекции это операции, **цель и результат которых — изменение остатка средств на банковском счёте**, отражаемое в бухгалтерских книгах банка.

## Кассовые операции
- внесение и снятие наличных (в отделении, в депозитном автомате, в банкомате),
- переводы, оплачиваемые наличными (например, оплата счёта на почте),
- обмен валюты.

Доля наличных в платежах в Польше постоянно снижается (по исследованиям NBP о платёжных привычках), но наличные по-прежнему важны, например как резерв на случай сбоя систем.

## Межбанковские расчёты
Когда вы переводите деньги из банка A в банк B, банки должны рассчитаться. Посредником выступает [[kir|Национальная расчётная палата (KIR)]], которая ведёт системы:
- **Elixir** — электронная система расчётов по обычным переводам в злотых, несколькими сессиями в рабочие дни,
- **Express Elixir** — мгновенные переводы почти в реальном времени, в том числе в выходные,
- **Euro Elixir** — расчёты платежей в евро, в том числе по стандарту **SEPA** (единая зона платежей в евро, где перевод в евро за границу стоит столько же, сколько внутренний).

Крупные и срочные платежи проводит **SORBNET** — система NBP, работающая в реальном времени (валовые расчёты, операция за операцией).

| Система | Оператор | Для чего |
|---|---|---|
| Elixir | KIR | обычные переводы в PLN, сессии |
| Express Elixir | KIR | мгновенные переводы в PLN |
| Euro Elixir | KIR | переводы в EUR, SEPA |
| SORBNET | NBP | крупные платежи в PLN в реальном времени |

## Мгновенные переводы через оператора (например, BlueCash)
До распространения Express Elixir были популярны переводы через оператора, например **BlueCash** (Blue Media):
1. Вы делаете внутренний перевод со своего счёта на счёт оператора в вашем банке.
2. Банк электронно передаёт данные получателя оператору.
3. Оператор отправляет деньги внутренним переводом со своего счёта в банке получателя.

Деньги не «путешествуют» между банками — у оператора есть счета во многих банках, и он перемещает средства внутри каждого из них.

## IBAN и зарубежные переводы
[[iban|IBAN]] (International Bank Account Number) состоит из четырёх элементов: **кода страны**, **контрольного числа**, **номера банка/отделения** и **номера счёта**. Польский IBAN — 28 знаков, например PL 61 1090 1014 0000 0712 1981 2874.

Зарубежные переводы вне SEPA обычно идут через сеть **SWIFT**. Клиент выбирает, кто платит расходы:
- **SHA** — каждая сторона платит комиссии своего банка (стандарт в ЕЭЗ),
- **OUR** — все расходы несёт отправитель,
- **BEN** — все расходы несёт получатель (их вычитают из суммы перевода).

## Виды безналичных расчётов
1. **Платёжное поручение (polecenie przelewu)** — плательщик поручает банку перевести деньги получателю.
2. **Прямое дебетование (polecenie zapłaty)** — получатель (например, оператор связи) списывает деньги со счёта плательщика на основании его предварительного согласия.
3. **Платёжные карты**.
4. **[[blik|BLIK]]** — платежи мобильным приложением с 6-значным кодом.
5. **Инкассо**.
6. **Аккредитив**.

## Платёжные карты
| Карта | Откуда деньги | Как погашается |
|---|---|---|
| дебетовая | со счёта клиента, сразу | погашать нечего, средства списываются со счёта |
| кредитная | из кредитного лимита банка | минимум часть долга ежемесячно, беспроцентный период |
| расчётная (charge) | банк кредитует до конца периода | весь долг разом после расчётного периода |
| предоплаченная | с заранее пополненной карты | нет — можно потратить только внесённое |

## Аккредитив
[[akredytywa|Аккредитив]] — обязательство банка импортёра заплатить экспортёру при представлении документов, соответствующих условиям. Порядок:
1. Импортёр и экспортёр заключают **контракт** с оплатой аккредитивом.
2. Импортёр поручает своему банку (**банку-эмитенту**) открыть аккредитив.
3. Банк-эмитент направляет аккредитив в банк экспортёра (**авизующий банк**).
4. Авизующий банк уведомляет экспортёра; тот отгружает товар.
5. Экспортёр сдаёт документы (например, счёт, коносамент, страховой полис, сертификат происхождения) в банк и получает оплату.
6. Банк-эмитент проверяет документы, платит и списывает сумму с импортёра, который получает документы и товар.

Виды аккредитивов: отзывный и **безотзывный**, переводной и непереводной, **подтверждённый** (второй банк тоже гарантирует оплату) и неподтверждённый, возобновляемый (револьверный), с оплатой **по предъявлении (at sight)** или с отсрочкой, акцептный (банк акцептует вексель), авансовый и **резервный (stand-by)**, действующий как гарантия.

## Документарное инкассо
[[inkaso|Инкассо]] проще и дешевле: экспортёр передаёт документы своему банку, а тот через банк импортёра выдаёт их импортёру **только против оплаты** (D/P) **или акцепта векселя** (D/A). Но банки оплату не гарантируют — они лишь посредничают в движении документов.

> !zapamietaj Аккредитив = **банк гарантирует оплату** за соответствующие документы. Инкассо = банк лишь **выдаёт документы против оплаты**, без собственного обязательства. Аккредитив надёжнее для экспортёра, но дороже.

> !przyklad Польская фирма продаёт мебель в Канаду новому клиенту, которого не знает. Она выбирает безотзывный аккредитив, подтверждённый её банком, — деньги она получит, сдав правильные документы. С постоянным клиентом из Германии, с которым работает годами, она рассчитывается обычным переводом SEPA.`,
          },
          quiz: [
            { q: { pl: "Który system służy do przelewów natychmiastowych w złotych?", ru: "Какая система служит для мгновенных переводов в злотых?" },
              a: [{ pl: "Euro Elixir", ru: "Euro Elixir" }, { pl: "SWIFT", ru: "SWIFT" }, { pl: "Express Elixir", ru: "Express Elixir" }, { pl: "SEPA", ru: "SEPA" }],
              correct: 2, why: { pl: "Express Elixir (KIR) rozlicza przelewy w czasie zbliżonym do rzeczywistego.", ru: "Express Elixir (KIR) проводит переводы почти в реальном времени." } },
            { q: { pl: "Zasada kosztów SWIFT, w której wszystkie opłaty płaci zleceniodawca:", ru: "Принцип расходов SWIFT, при котором все комиссии платит отправитель:" },
              a: [{ pl: "OUR", ru: "OUR" }, { pl: "SHA", ru: "SHA" }, { pl: "BEN", ru: "BEN" }, { pl: "D/P", ru: "D/P" }],
              correct: 0, why: { pl: "OUR — koszty zleceniodawcy, BEN — odbiorcy, SHA — podział.", ru: "OUR — расходы отправителя, BEN — получателя, SHA — раздел." } },
            { q: { pl: "Karta, przy której całe zadłużenie spłaca się jednorazowo po okresie rozliczeniowym, to karta:", ru: "Карта, по которой весь долг погашается разом после расчётного периода:" },
              a: [{ pl: "debetowa", ru: "дебетовая" }, { pl: "przedpłacona", ru: "предоплаченная" }, { pl: "kredytowa", ru: "кредитная" }, { pl: "obciążeniowa", ru: "расчётная (charge)" }],
              correct: 3, why: { pl: "Karta obciążeniowa (charge) wymaga spłaty całości; kredytowa pozwala spłacać część.", ru: "Расчётная карта требует полного погашения; кредитная позволяет платить часть." } },
            { q: { pl: "Odbiorca ściąga pieniądze z rachunku płatnika na podstawie jego zgody. To:", ru: "Получатель списывает деньги со счёта плательщика на основании его согласия. Это:" },
              a: [{ pl: "polecenie przelewu", ru: "платёжное поручение" }, { pl: "polecenie zapłaty", ru: "прямое дебетование (polecenie zapłaty)" }, { pl: "akredytywa", ru: "аккредитив" }, { pl: "forfaiting", ru: "форфейтинг" }],
              correct: 1, why: { pl: "W poleceniu zapłaty inicjatorem jest odbiorca, w przelewie — płatnik.", ru: "При прямом дебетовании инициатор — получатель, при переводе — плательщик." } },
            { q: { pl: "Czym akredytywa różni się od inkasa dokumentowego?", ru: "Чем аккредитив отличается от документарного инкассо?" },
              a: [{ pl: "W akredytywie bank zobowiązuje się zapłacić za zgodne dokumenty", ru: "При аккредитиве банк обязуется заплатить за соответствующие документы" }, { pl: "Inkaso jest zawsze droższe", ru: "Инкассо всегда дороже" }, { pl: "W akredytywie nie ma dokumentów", ru: "В аккредитиве нет документов" }, { pl: "Inkaso dotyczy tylko kart", ru: "Инкассо касается только карт" }],
              correct: 0, why: { pl: "W inkasie banki tylko pośredniczą; w akredytywie bank przyjmuje zobowiązanie zapłaty.", ru: "При инкассо банки лишь посредничают; при аккредитиве банк берёт обязательство оплаты." } },
            { q: { pl: "Płatności wysokokwotowe w złotych w czasie rzeczywistym rozlicza:", ru: "Крупные платежи в злотых в реальном времени проводит:" },
              a: [{ pl: "Elixir", ru: "Elixir" }, { pl: "BLIK", ru: "BLIK" }, { pl: "SORBNET (NBP)", ru: "SORBNET (NBP)" }, { pl: "BlueCash", ru: "BlueCash" }],
              correct: 2, why: { pl: "SORBNET to system rozrachunku brutto w czasie rzeczywistym prowadzony przez NBP.", ru: "SORBNET — система валовых расчётов в реальном времени, которую ведёт NBP." } },
          ],
        },
        // ------------------------------------------------------------------ 4.6
        {
          id: "4.6",
          title: { pl: "Shadow banking i crowdfunding", ru: "Теневой банкинг и краудфандинг" },
          src: "Podstawy bankowości, slajd 121",
          body: {
            pl: `Nie każdy, kto pożycza pieniądze, jest bankiem. Obok sektora bankowego rośnie świat instytucji, które robią „coś jak bank”, ale bez licencji bankowej — i coraz więcej ludzi finansuje projekty bezpośrednio, przez internet.

## Czym jest shadow banking
[[shadow-banking|Shadow banking]] (system bankowości równoległej, „bankowość cienia”) to według Rady Stabilności Finansowej (FSB) **pośrednictwo kredytowe prowadzone przez podmioty i działania spoza regulowanego sektora bankowego**.

Należą do niego m.in.:
- firmy pożyczkowe (w Polsce: instytucje pożyczkowe),
- fundusze inwestycyjne, w tym fundusze rynku pieniężnego i fundusze kredytowe,
- spółki sekurytyzacyjne i fundusze sekurytyzacyjne,
- firmy leasingowe i faktoringowe,
- platformy pożyczkowe.

## Dlaczego „cień”?
Te podmioty wykonują funkcje podobne do banków: zbierają pieniądze i finansują nimi innych, często **przekształcając terminy i ryzyko**. Ale:

| | Bank | Shadow banking |
|---|---|---|
| Licencja bankowa | tak | nie |
| Wymogi kapitałowe Bazylei | pełne | brak lub łagodniejsze |
| Gwarancje depozytów (BFG) | tak | nie |
| Dostęp do kredytu banku centralnego | tak | zwykle nie |
| Nadzór | ścisły (KNF) | częściowy albo brak |

> !zapamietaj Shadow banking nie jest nielegalny. Problem polega na tym, że podejmuje **ryzyko podobne do bankowego, bez bankowych zabezpieczeń**. W kryzysie nie ma za nim ani pożyczkodawcy ostatniej instancji, ani gwarancji depozytów.

## Zalety i zagrożenia
**Zalety:**
- dodatkowe źródło finansowania dla firm i ludzi, którym banki odmawiają,
- konkurencja dla banków i innowacje,
- rozproszenie ryzyka poza sektor bankowy.

**Zagrożenia:**
- **ryzyko systemowe** — kryzys 2007–2009 w dużej mierze zaczął się w cieniu: spółki sekurytyzacyjne i fundusze finansowane krótkoterminowo kupowały papiery oparte na kredytach subprime; gdy zaufanie upadło, „run” dotknął ich jak banku,
- powiązania z bankami — banki często finansują podmioty z cienia lub udzielają im gwarancji, więc problemy wracają do banków,
- słabsza ochrona klientów — wysokie koszty pożyczek, agresywna windykacja.

> !przyklad Instytucja pożyczkowa udziela „chwilówki” 2000 zł na 30 dni. Nie przyjmuje depozytów, więc nie potrzebuje licencji bankowej, ale musi być wpisana do rejestru prowadzonego przez KNF i przestrzegać limitów pozaodsetkowych kosztów kredytu z ustawy o kredycie konsumenckim. Pożyczkobiorca nie ma jednak takiej samej ochrony jak klient banku.

## Crowdfunding
[[crowdfunding|Crowdfunding]] (finansowanie społecznościowe) to zbieranie pieniędzy na projekt od **wielu osób**, zwykle przez **platformę internetową**, bez pośrednictwa banku.

| Rodzaj | Co dostaje wspierający | Przykład |
|---|---|---|
| **donacyjny** | nic materialnego — satysfakcję | zbiórka na leczenie |
| **nagrodowy** (reward-based) | nagrodę lub produkt | przedsprzedaż gry planszowej |
| **udziałowy** (equity) | udziały lub akcje firmy | inwestycja w start-up browaru |
| **pożyczkowy** (lending, P2P) | zwrot pożyczki z odsetkami | wiele osób pożycza firmie na rozwój |

## Regulacje crowdfundingu
Crowdfunding udziałowy i pożyczkowy dla firm w UE reguluje **rozporządzenie 2020/1503** w sprawie europejskich dostawców usług finansowania społecznościowego. Platforma musi mieć zezwolenie (w Polsce wydaje je KNF), informować inwestorów o ryzyku i przeprowadzać test wiedzy dla inwestorów niedoświadczonych. Zbiórki donacyjne i nagrodowe nie są usługami finansowymi w tym rozumieniu.

> !uwaga Pieniądze zainwestowane przez crowdfunding **nie są depozytem** i nie są chronione przez BFG. Start-up może upaść, a pożyczkobiorca nie oddać pieniędzy. To inwestycja, a nie lokata.

## Związek z bankami
Crowdfunding i shadow banking są dla banków jednocześnie **konkurencją** (odbierają część klientów) i **uzupełnieniem** (finansują projekty, których banki nie chcą). Banki coraz częściej współpracują z platformami fintech, np. udostępniając im rachunki i usługi płatnicze.`,
            ru: `Не каждый, кто даёт деньги в долг, — банк. Рядом с банковским сектором растёт мир учреждений, которые делают «что-то вроде банка», но без банковской лицензии, — и всё больше людей финансируют проекты напрямую через интернет.

## Что такое теневой банкинг
[[shadow-banking|Теневой банкинг (shadow banking)]] (параллельная банковская система) — это, по определению Совета по финансовой стабильности (FSB), **кредитное посредничество субъектов и видов деятельности вне регулируемого банковского сектора**.

К нему относятся, в частности:
- займовые компании (в Польше — instytucje pożyczkowe),
- инвестиционные фонды, в том числе фонды денежного рынка и кредитные фонды,
- компании и фонды секьюритизации,
- лизинговые и факторинговые фирмы,
- займовые платформы.

## Почему «теневой»?
Эти субъекты выполняют функции, похожие на банковские: собирают деньги и финансируют ими других, часто **трансформируя сроки и риск**. Но:

| | Банк | Теневой банкинг |
|---|---|---|
| Банковская лицензия | да | нет |
| Базельские требования к капиталу | полные | нет или мягче |
| Гарантии депозитов (BFG) | да | нет |
| Доступ к кредиту центрального банка | да | обычно нет |
| Надзор | строгий (KNF) | частичный или отсутствует |

> !zapamietaj Теневой банкинг не является незаконным. Проблема в том, что он берёт на себя **риск, похожий на банковский, без банковских страховок**. В кризис за ним нет ни кредитора последней инстанции, ни гарантий депозитов.

## Плюсы и угрозы
**Плюсы:**
- дополнительный источник финансирования для фирм и людей, которым отказывают банки,
- конкуренция для банков и инновации,
- распределение риска за пределы банковского сектора.

**Угрозы:**
- **системный риск** — кризис 2007–2009 гг. во многом начался в тени: компании секьюритизации и фонды с краткосрочным финансированием покупали бумаги на основе кредитов subprime; когда доверие рухнуло, «бегство» ударило по ним, как по банку,
- связи с банками — банки часто финансируют теневых участников или дают им гарантии, поэтому проблемы возвращаются в банки,
- более слабая защита клиентов — высокая стоимость займов, агрессивное взыскание.

> !przyklad Займовая компания выдаёт «быстрый заём» (chwilówka) 2000 злотых на 30 дней. Она не принимает депозиты, поэтому ей не нужна банковская лицензия, но она должна быть внесена в реестр, который ведёт KNF, и соблюдать лимиты непроцентных расходов по закону о потребительском кредите. Однако у заёмщика нет такой же защиты, как у клиента банка.

## Краудфандинг
[[crowdfunding|Краудфандинг]] (коллективное финансирование) — сбор денег на проект у **множества людей**, обычно через **интернет-платформу**, без посредничества банка.

| Вид | Что получает спонсор | Пример |
|---|---|---|
| **донационный** | ничего материального — удовлетворение | сбор на лечение |
| **вознаграждающий** (reward-based) | награду или продукт | предзаказ настольной игры |
| **долевой** (equity) | доли или акции фирмы | вложение в стартап-пивоварню |
| **заёмный** (lending, P2P) | возврат займа с процентами | много людей одалживают фирме на развитие |

## Регулирование краудфандинга
Долевой и заёмный краудфандинг для бизнеса в ЕС регулирует **регламент 2020/1503** о европейских поставщиках услуг коллективного финансирования. Платформе нужно разрешение (в Польше его выдаёт KNF), она должна информировать инвесторов о рисках и проводить тест знаний для неопытных инвесторов. Донационные и вознаграждающие сборы не являются финансовыми услугами в этом смысле.

> !uwaga Деньги, вложенные через краудфандинг, **не являются депозитом** и не защищены BFG. Стартап может обанкротиться, а заёмщик — не вернуть деньги. Это инвестиция, а не вклад.

## Связь с банками
Краудфандинг и теневой банкинг для банков одновременно **конкуренция** (забирают часть клиентов) и **дополнение** (финансируют проекты, которые банкам неинтересны). Банки всё чаще сотрудничают с финтех-платформами, например предоставляя им счета и платёжные услуги.`,
          },
          quiz: [
            { q: { pl: "Shadow banking to:", ru: "Теневой банкинг — это:" },
              a: [{ pl: "nielegalne pranie pieniędzy", ru: "незаконное отмывание денег" }, { pl: "pośrednictwo kredytowe poza regulowanym sektorem bankowym", ru: "кредитное посредничество вне регулируемого банковского сектора" }, { pl: "bankowość internetowa", ru: "интернет-банкинг" }, { pl: "nadzór EBC nad bankami", ru: "надзор ЕЦБ за банками" }],
              correct: 1, why: { pl: "Definicja FSB; podmioty te nie są bankami, ale pełnią podobne funkcje.", ru: "Определение FSB; эти субъекты не банки, но выполняют похожие функции." } },
            { q: { pl: "Czego NIE mają podmioty shadow bankingu?", ru: "Чего НЕТ у участников теневого банкинга?" },
              a: [{ pl: "Klientów", ru: "Клиентов" }, { pl: "Możliwości udzielania pożyczek", ru: "Возможности давать займы" }, { pl: "Gwarancji depozytów i dostępu do pożyczkodawcy ostatniej instancji", ru: "Гарантий депозитов и доступа к кредитору последней инстанции" }, { pl: "Pracowników", ru: "Сотрудников" }],
              correct: 2, why: { pl: "Brak siatki bezpieczeństwa to główne źródło ich ryzyka.", ru: "Отсутствие сети безопасности — главный источник их риска." } },
            { q: { pl: "Wspierający dostaje udziały w firmie. To crowdfunding:", ru: "Спонсор получает доли в фирме. Это краудфандинг:" },
              a: [{ pl: "udziałowy (equity)", ru: "долевой (equity)" }, { pl: "donacyjny", ru: "донационный" }, { pl: "nagrodowy", ru: "вознаграждающий" }, { pl: "pożyczkowy", ru: "заёмный" }],
              correct: 0, why: { pl: "Equity crowdfunding = inwestycja w kapitał firmy.", ru: "Equity-краудфандинг = вложение в капитал фирмы." } },
            { q: { pl: "Czy pieniądze pożyczone firmie przez platformę crowdfundingową są chronione przez BFG?", ru: "Защищены ли BFG деньги, одолженные фирме через краудфандинговую платформу?" },
              a: [{ pl: "Tak, do 100 000 euro", ru: "Да, до 100 000 евро" }, { pl: "Tak, w całości", ru: "Да, полностью" }, { pl: "Tylko przez 3 miesiące", ru: "Только 3 месяца" }, { pl: "Nie, to inwestycja, a nie depozyt", ru: "Нет, это инвестиция, а не депозит" }],
              correct: 3, why: { pl: "BFG chroni środki na rachunkach w bankach i SKOK-ach, a nie inwestycje.", ru: "BFG защищает средства на счетах в банках и SKOK, а не инвестиции." } },
            { q: { pl: "Jaki akt UE reguluje platformy crowdfundingu udziałowego i pożyczkowego?", ru: "Какой акт ЕС регулирует платформы долевого и заёмного краудфандинга?" },
              a: [{ pl: "Rozporządzenie CRR", ru: "Регламент CRR" }, { pl: "Rozporządzenie 2020/1503", ru: "Регламент 2020/1503" }, { pl: "Dyrektywa o rachunkach płatniczych", ru: "Директива о платёжных счетах" }, { pl: "Prawo bankowe", ru: "«Prawo bankowe»" }],
              correct: 1, why: { pl: "Rozporządzenie 2020/1503 wprowadziło unijne zezwolenia dla dostawców usług crowdfundingu.", ru: "Регламент 2020/1503 ввёл единые в ЕС разрешения для поставщиков краудфандинга." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Rachunek oszczędnościowo-rozliczeniowy (ROR) może być prowadzony dla:", ru: "Сберегательно-расчётный счёт (ROR) может вестись для:" },
          a: [{ pl: "spółek akcyjnych", ru: "акционерных обществ" }, { pl: "osób fizycznych", ru: "физических лиц" }, { pl: "jednostek samorządu", ru: "органов самоуправления" }, { pl: "banków", ru: "банков" }],
          correct: 1, why: { pl: "Art. 49 ust. 3 Prawa bankowego.", ru: "Ст. 49 п. 3 «Prawo bankowe»." } },
        { q: { pl: "Umowa kredytu musi być zawarta:", ru: "Кредитный договор должен быть заключён:" },
          a: [{ pl: "ustnie", ru: "устно" }, { pl: "w formie aktu notarialnego", ru: "в нотариальной форме" }, { pl: "na piśmie", ru: "в письменной форме" }, { pl: "w dowolnej formie", ru: "в любой форме" }],
          correct: 2, why: { pl: "Art. 69 ust. 2: umowa kredytu powinna być zawarta na piśmie.", ru: "Ст. 69 п. 2: кредитный договор должен быть письменным." } },
        { q: { pl: "Kto może udzielić pożyczki?", ru: "Кто может дать заём?" },
          a: [{ pl: "Tylko bank", ru: "Только банк" }, { pl: "Tylko NBP", ru: "Только NBP" }, { pl: "Tylko SKOK", ru: "Только SKOK" }, { pl: "Każdy: osoba fizyczna, firma, bank", ru: "Любой: физлицо, фирма, банк" }],
          correct: 3, why: { pl: "Pożyczka to umowa z Kodeksu cywilnego; kredytu udziela tylko bank.", ru: "Заём — договор по Гражданскому кодексу; кредит даёт только банк." } },
        { q: { pl: "Kredyt hipoteczny jest zabezpieczony:", ru: "Ипотечный кредит обеспечен:" },
          a: [{ pl: "hipoteką na nieruchomości", ru: "ипотекой на недвижимость" }, { pl: "zastawem na samochodzie", ru: "залогом автомобиля" }, { pl: "wyłącznie wekslem", ru: "только векселем" }, { pl: "niczym", ru: "ничем" }],
          correct: 0, why: { pl: "Hipoteka wpisana do księgi wieczystej to istota kredytu hipotecznego.", ru: "Ипотека, внесённая в поземельную книгу, — суть ипотечного кредита." } },
        { q: { pl: "Oprocentowanie stałe przez 5 lat, potem ustalane na nowo, to oprocentowanie:", ru: "Ставка, фиксированная на 5 лет, затем устанавливаемая заново, — это ставка:" },
          a: [{ pl: "zmienne", ru: "плавающая" }, { pl: "okresowo stałe", ru: "периодически фиксированная" }, { pl: "karne", ru: "штрафная" }, { pl: "stałe na cały okres", ru: "фиксированная на весь срок" }],
          correct: 1, why: { pl: "Okresowo stałe to kompromis między stałym a zmiennym.", ru: "Периодически фиксированная — компромисс между фиксированной и плавающей." } },
        { q: { pl: "Kredyt na budowę nowej hali produkcyjnej to kredyt:", ru: "Кредит на строительство нового цеха — это кредит:" },
          a: [{ pl: "obrotowy", ru: "оборотный" }, { pl: "konsumpcyjny", ru: "потребительский" }, { pl: "inwestycyjny", ru: "инвестиционный" }, { pl: "w rachunku bieżącym", ru: "на текущем счёте" }],
          correct: 2, why: { pl: "Kredyty inwestycyjne finansują środki trwałe, są średnio- i długoterminowe.", ru: "Инвестиционные кредиты финансируют основные средства, они средне- и долгосрочные." } },
        { q: { pl: "Faktoring polega na:", ru: "Факторинг заключается в:" },
          a: [{ pl: "wynajmie maszyn", ru: "аренде оборудования" }, { pl: "gwarantowaniu depozytów", ru: "гарантировании депозитов" }, { pl: "emisji akcji", ru: "выпуске акций" }, { pl: "odkupie należności z faktur przed terminem zapłaty", ru: "выкупе задолженности по счетам до срока оплаты" }],
          correct: 3, why: { pl: "Faktor płaci firmie od razu, a sam czeka na zapłatę od odbiorcy.", ru: "Фактор платит фирме сразу, а сам ждёт оплаты от покупателя." } },
        { q: { pl: "Trzy strony gwarancji bankowej to:", ru: "Три стороны банковской гарантии:" },
          a: [{ pl: "zleceniodawca, bank-gwarant, beneficjent", ru: "принципал, банк-гарант, бенефициар" }, { pl: "importer, eksporter, KIR", ru: "импортёр, экспортёр, KIR" }, { pl: "powiernik, powierzający, deweloper", ru: "доверенное лицо, доверитель, застройщик" }, { pl: "NBP, KNF, BFG", ru: "NBP, KNF, BFG" }],
          correct: 0, why: { pl: "Bank na zlecenie klienta zobowiązuje się zapłacić beneficjentowi.", ru: "Банк по поручению клиента обязуется заплатить бенефициару." } },
        { q: { pl: "Ile znaków ma polski numer IBAN?", ru: "Сколько знаков в польском IBAN?" },
          a: [{ pl: "16", ru: "16" }, { pl: "22", ru: "22" }, { pl: "28", ru: "28" }, { pl: "34", ru: "34" }],
          correct: 2, why: { pl: "„PL” + 2 cyfry kontrolne + 24 cyfry NRB = 28 znaków.", ru: "«PL» + 2 контрольные цифры + 24 цифры NRB = 28 знаков." } },
        { q: { pl: "Kto prowadzi system Elixir?", ru: "Кто ведёт систему Elixir?" },
          a: [{ pl: "NBP", ru: "NBP" }, { pl: "Krajowa Izba Rozliczeniowa", ru: "Национальная расчётная палата (KIR)" }, { pl: "KNF", ru: "KNF" }, { pl: "Blue Media", ru: "Blue Media" }],
          correct: 1, why: { pl: "KIR prowadzi Elixir, Express Elixir i Euro Elixir; NBP — SORBNET.", ru: "KIR ведёт Elixir, Express Elixir и Euro Elixir; NBP — SORBNET." } },
        { q: { pl: "Akredytywa, którą dodatkowo gwarantuje bank eksportera, to akredytywa:", ru: "Аккредитив, который дополнительно гарантирует банк экспортёра, — это аккредитив:" },
          a: [{ pl: "odwołalna", ru: "отзывный" }, { pl: "niepotwierdzona", ru: "неподтверждённый" }, { pl: "zaliczkowa", ru: "авансовый" }, { pl: "potwierdzona", ru: "подтверждённый" }],
          correct: 3, why: { pl: "Potwierdzenie oznacza, że drugi bank też zobowiązuje się zapłacić.", ru: "Подтверждение означает, что второй банк тоже обязуется заплатить." } },
        { q: { pl: "Karta debetowa:", ru: "Дебетовая карта:" },
          a: [{ pl: "pobiera środki bezpośrednio z rachunku klienta", ru: "списывает средства прямо со счёта клиента" }, { pl: "daje limit kredytowy z okresem bezodsetkowym", ru: "даёт кредитный лимит с беспроцентным периодом" }, { pl: "wymaga spłaty całości po miesiącu", ru: "требует полного погашения через месяц" }, { pl: "nie jest powiązana z żadnym rachunkiem i nie można jej doładować", ru: "не связана ни с каким счётом и не пополняется" }],
          correct: 0, why: { pl: "Debetowa — z konta; kredytowa — z limitu; obciążeniowa — spłata całości.", ru: "Дебетовая — со счёта; кредитная — из лимита; расчётная — полное погашение." } },
        { q: { pl: "Fundusz sekurytyzacyjny finansujący kredyty to przykład:", ru: "Фонд секьюритизации, финансирующий кредиты, — пример:" },
          a: [{ pl: "banku centralnego", ru: "центрального банка" }, { pl: "crowdfundingu donacyjnego", ru: "донационного краудфандинга" }, { pl: "shadow bankingu", ru: "теневого банкинга" }, { pl: "nadzoru zintegrowanego", ru: "интегрированного надзора" }],
          correct: 2, why: { pl: "Spółki i fundusze sekurytyzacyjne to klasyczne podmioty bankowości równoległej.", ru: "Компании и фонды секьюритизации — классические участники теневого банкинга." } },
      ],
    },
    // ================================================================== W5
    {
      n: 5,
      color: "--c5",
      title: { pl: "Ryzyko bankowe", ru: "Банковский риск" },
      lead: {
        pl: "Jakie ryzyka ponosi bank i jak nimi zarządza: płynność, ocena zdolności kredytowej firm i osób (wskaźniki, 5C, Altman, scoring, rating), zabezpieczenia i monitoring, ryzyko stopy procentowej, walutowe i kraju, a na koniec ryzyko operacyjne, cyberprzestępczość, oszustwa i pranie pieniędzy.",
        ru: "Какие риски несёт банк и как им управляет: ликвидность, оценка кредитоспособности фирм и людей (показатели, 5C, Альтман, скоринг, рейтинг), обеспечение и мониторинг, процентный, валютный и страновой риск, а в завершение — операционный риск, киберпреступность, мошенничество и отмывание денег.",
      },
      subs: [
        // ------------------------------------------------------------------ 5.1
        {
          id: "5.1",
          title: { pl: "Rodzaje ryzyka i zarządzanie ryzykiem", ru: "Виды риска и управление риском" },
          src: "Podstawy bankowości, slajdy 122–130",
          body: {
            pl: `Bank zarabia na tym, że bierze ryzyko, którego nie chcą brać jego klienci. Deponent chce mieć pewność, że odzyska pieniądze, a kredytobiorca chce pieniędzy na lata. Bank stoi pośrodku — i to on ryzykuje.

## Czym jest ryzyko bankowe
[[ryzyko-bankowe|Ryzyko]] dla banku oznacza możliwość, że:
- zmniejszą się jego **zyski**,
- straci **płynność** i **wiarygodność**,
- zmniejszy się jego **kapitał własny**,
- wpadnie w **trudności finansowe**, a w skrajnym przypadku **zbankrutuje**.

> !zapamietaj Ryzyko można **ograniczyć, ale nie wyeliminować**. Bank bez ryzyka nie udzielałby kredytów i nie zarabiałby — zamieniłby się w sejf.

## Czynniki zewnętrzne
Na bank wpływa otoczenie, którego nie kontroluje:
- **makroekonomiczne** — koniunktura, inflacja, stopy procentowe, bezrobocie, kurs walutowy,
- **społeczne** — zaufanie do banków, zwyczaje płatnicze, poziom edukacji finansowej,
- **polityczne** — zmiany prawa, podatki (np. podatek bankowy), decyzje sądów, wojny,
- **demograficzne** — starzenie się społeczeństwa, migracje,
- **techniczne** — nowe technologie, cyfryzacja, cyberzagrożenia.

Współcześnie zagrożenie dla banków zwiększają:
- **globalizacja** — kryzys w jednym kraju szybko przenosi się na inne,
- **liberalizacja** — mniej barier, więcej konkurencji i więcej ryzykownych działań,
- **nowe instrumenty finansowe** — złożone produkty (np. derywaty, sekurytyzacja), których ryzyko trudno ocenić.

## Czynniki wewnętrzne
Część ryzyka bank „produkuje” sam:
- **zarządzanie** — jakość decyzji zarządu, strategia, kultura ryzyka,
- **czynnik ludzki** — kompetencje, błędy i nieuczciwość pracowników,
- **technologia** — jakość i bezpieczeństwo systemów informatycznych.

## Rodzaje ryzyka
| Grupa | Rodzaj | Krótko |
|---|---|---|
| finansowe | **[[ryzyko-plynnosci|płynności]]** | brak pieniędzy na terminowe wypłaty |
| finansowe | **[[ryzyko-kredytowe|kredytowe]]** | klient nie spłaci kredytu |
| rynkowe | **[[ryzyko-stopy-procentowej|stopy procentowej]]** | zmiana stóp obniży wynik |
| rynkowe | **[[ryzyko-walutowe|walutowe]]** | zmiana kursu przyniesie stratę |
| rynkowe | spadku kursów akcji | spadnie wartość posiadanych akcji |
| rynkowe | surowcowe/towarowe | zmienią się ceny surowców i towarów |
| niefinansowe | **[[ryzyko-operacyjne|operacyjne]]** | błędy ludzi, systemów, oszustwa, zdarzenia zewnętrzne |
| niefinansowe | **[[ryzyko-kraju|kraju]]** | kłopoty polityczne lub gospodarcze w kraju kontrahenta |
| niefinansowe | transferu | zakaz przekazania płatności za granicę |

## Etapy zarządzania ryzykiem
1. **Identyfikacja** — jakie ryzyka w ogóle występują? Np. nowy produkt — kredyt dla firm z branży OZE — niesie ryzyko kredytowe, regulacyjne i rynkowe.
2. **Kwantyfikacja lub oszacowanie** — jak duże jest ryzyko? Bank mierzy je wskaźnikami, modelami, testami warunków skrajnych (stress testami).
3. **Sterowanie ryzykiem** — co z nim zrobić? Bank może ryzyko **unikać** (nie wchodzić w transakcję), **ograniczać** (limity, zabezpieczenia), **przenosić** (ubezpieczenie, sprzedaż wierzytelności, derywaty) albo **akceptować** (gdy jest małe i dobrze wycenione).
4. **Kontrola podejmowanych przedsięwzięć** — czy działania działają? Monitoring limitów, raporty, audyt wewnętrzny.

> !przyklad Bank zauważa, że 30% jego kredytów dla firm dotyczy jednej branży — budownictwa (identyfikacja). Liczy, że przy spadku koniunktury w tej branży straty mogą sięgnąć kilku procent kapitału (kwantyfikacja). Wprowadza limit: maksymalnie 20% portfela w jednej branży i wyższe wymogi zabezpieczeń (sterowanie). Co kwartał sprawdza, czy limit jest przestrzegany (kontrola).

## Apetyt na ryzyko
**Podejmowanie ryzyka to warunek konieczny do osiągnięcia zysku.** Apetyt na ryzyko to poziom i rodzaje ryzyka, które bank **świadomie akceptuje**, żeby zrealizować strategię. Określają go zarząd i rada nadzorcza, a potem przekładają na konkretne limity: maksymalny udział kredytów jednej branży, maksymalną lukę płynności, minimalny poziom współczynnika kapitałowego ponad wymóg nadzorcy.

| Apetyt na ryzyko | Skutek |
|---|---|
| za mały | bezpiecznie, ale bank traci klientów i zarabia mało |
| dobrany do kapitału | zysk przy kontrolowanych stratach |
| za duży | wysokie zyski w dobrych czasach, ogromne straty w kryzysie |

> !uwaga Wyższe oprocentowanie kredytu nie „likwiduje” ryzyka. Marża za ryzyko ma pokryć **oczekiwane** straty, a na straty **nieoczekiwane** bank musi mieć kapitał.`,
            ru: `Банк зарабатывает на том, что берёт риск, который не хотят брать его клиенты. Вкладчик хочет быть уверен, что получит деньги обратно, а заёмщику нужны деньги на годы. Банк стоит посередине — и рискует именно он.

## Что такое банковский риск
[[ryzyko-bankowe|Риск]] для банка означает возможность того, что:
- уменьшится его **прибыль**,
- он потеряет **ликвидность** и **доверие**,
- уменьшится его **собственный капитал**,
- он попадёт в **финансовые трудности**, а в крайнем случае **обанкротится**.

> !zapamietaj Риск можно **ограничить, но не устранить**. Банк без риска не выдавал бы кредитов и не зарабатывал бы — он превратился бы в сейф.

## Внешние факторы
На банк влияет окружение, которое он не контролирует:
- **макроэкономические** — конъюнктура, инфляция, процентные ставки, безработица, валютный курс,
- **социальные** — доверие к банкам, платёжные привычки, уровень финансовой грамотности,
- **политические** — изменения законов, налоги (например, банковский налог), решения судов, войны,
- **демографические** — старение общества, миграция,
- **технические** — новые технологии, цифровизация, киберугрозы.

Сегодня угрозу для банков усиливают:
- **глобализация** — кризис в одной стране быстро переходит на другие,
- **либерализация** — меньше барьеров, больше конкуренции и больше рискованных действий,
- **новые финансовые инструменты** — сложные продукты (например, деривативы, секьюритизация), риск которых трудно оценить.

## Внутренние факторы
Часть риска банк «производит» сам:
- **управление** — качество решений правления, стратегия, культура риска,
- **человеческий фактор** — компетентность, ошибки и нечестность сотрудников,
- **технологии** — качество и безопасность ИТ-систем.

## Виды риска
| Группа | Вид | Кратко |
|---|---|---|
| финансовые | **[[ryzyko-plynnosci|ликвидности]]** | нет денег на своевременные выплаты |
| финансовые | **[[ryzyko-kredytowe|кредитный]]** | клиент не вернёт кредит |
| рыночные | **[[ryzyko-stopy-procentowej|процентный]]** | изменение ставок снизит результат |
| рыночные | **[[ryzyko-walutowe|валютный]]** | изменение курса принесёт убыток |
| рыночные | падения курсов акций | снизится стоимость принадлежащих акций |
| рыночные | сырьевой/товарный | изменятся цены сырья и товаров |
| нефинансовые | **[[ryzyko-operacyjne|операционный]]** | ошибки людей, систем, мошенничество, внешние события |
| нефинансовые | **[[ryzyko-kraju|страновой]]** | политические или экономические проблемы в стране контрагента |
| нефинансовые | трансферный | запрет перевода платежей за границу |

## Этапы управления риском
1. **Выявление** — какие риски вообще есть? Например, новый продукт — кредит для фирм возобновляемой энергетики — несёт кредитный, регуляторный и рыночный риск.
2. **Количественная оценка** — насколько велик риск? Банк измеряет его показателями, моделями, стресс-тестами.
3. **Регулирование риска** — что с ним делать? Банк может риска **избегать** (не заключать сделку), **ограничивать** (лимиты, обеспечение), **передавать** (страхование, продажа требований, деривативы) или **принимать** (если он мал и хорошо оценён).
4. **Контроль предпринятых мер** — работают ли действия? Мониторинг лимитов, отчёты, внутренний аудит.

> !przyklad Банк замечает, что 30% его кредитов фирмам приходится на одну отрасль — строительство (выявление). Он рассчитывает, что при спаде в отрасли убытки могут достичь нескольких процентов капитала (оценка). Он вводит лимит: не более 20% портфеля в одной отрасли и более высокие требования к обеспечению (регулирование). Каждый квартал он проверяет соблюдение лимита (контроль).

## Аппетит к риску
**Принятие риска — необходимое условие получения прибыли.** Аппетит к риску — это уровень и виды риска, которые банк **сознательно принимает** ради выполнения стратегии. Его определяют правление и наблюдательный совет, а затем переводят в конкретные лимиты: максимальную долю кредитов одной отрасли, максимальный разрыв ликвидности, минимальный уровень коэффициента капитала сверх надзорного требования.

| Аппетит к риску | Результат |
|---|---|
| слишком мал | безопасно, но банк теряет клиентов и мало зарабатывает |
| соответствует капиталу | прибыль при контролируемых убытках |
| слишком велик | высокая прибыль в хорошие времена, огромные убытки в кризис |

> !uwaga Более высокая ставка по кредиту не «устраняет» риск. Надбавка за риск должна покрывать **ожидаемые** убытки, а на **непредвиденные** убытки у банка должен быть капитал.`,
          },
          quiz: [
            { q: { pl: "Co według wykładu można zrobić z ryzykiem bankowym?", ru: "Что, по лекции, можно сделать с банковским риском?" },
              a: [{ pl: "Całkowicie je wyeliminować", ru: "Полностью устранить" }, { pl: "Przerzucić w całości na NBP", ru: "Полностью переложить на NBP" }, { pl: "Ograniczyć, ale nie wyeliminować", ru: "Ограничить, но не устранить" }, { pl: "Zignorować przy wysokiej marży", ru: "Игнорировать при высокой марже" }],
              correct: 2, why: { pl: "Ryzyko jest nieodłączne od działalności banku; można nim tylko zarządzać.", ru: "Риск неотделим от деятельности банка; им можно лишь управлять." } },
            { q: { pl: "Jaka jest kolejność etapów zarządzania ryzykiem?", ru: "Каков порядок этапов управления риском?" },
              a: [{ pl: "Identyfikacja → kwantyfikacja → sterowanie → kontrola", ru: "Выявление → оценка → регулирование → контроль" }, { pl: "Kontrola → identyfikacja → sterowanie → kwantyfikacja", ru: "Контроль → выявление → регулирование → оценка" }, { pl: "Sterowanie → kontrola → identyfikacja → kwantyfikacja", ru: "Регулирование → контроль → выявление → оценка" }, { pl: "Kwantyfikacja → kontrola → sterowanie → identyfikacja", ru: "Оценка → контроль → регулирование → выявление" }],
              correct: 0, why: { pl: "Najpierw trzeba ryzyko znaleźć, potem zmierzyć, potem nim sterować i kontrolować efekty.", ru: "Сначала риск нужно найти, затем измерить, затем регулировать и контролировать результат." } },
            { q: { pl: "Ryzyko walutowe należy do ryzyka:", ru: "Валютный риск относится к риску:" },
              a: [{ pl: "operacyjnego", ru: "операционному" }, { pl: "rynkowego", ru: "рыночному" }, { pl: "kraju", ru: "страновому" }, { pl: "płynności", ru: "ликвидности" }],
              correct: 1, why: { pl: "Ryzyko rynkowe obejmuje stopę procentową, kursy walut, ceny akcji i surowców.", ru: "Рыночный риск включает процентные ставки, курсы валют, цены акций и сырья." } },
            { q: { pl: "Który czynnik jest wewnętrzny dla banku?", ru: "Какой фактор является внутренним для банка?" },
              a: [{ pl: "Inflacja", ru: "Инфляция" }, { pl: "Starzenie się społeczeństwa", ru: "Старение общества" }, { pl: "Zmiana przepisów podatkowych", ru: "Изменение налоговых правил" }, { pl: "Jakość zarządzania", ru: "Качество управления" }],
              correct: 3, why: { pl: "Czynniki wewnętrzne to zarządzanie, czynnik ludzki i technologia.", ru: "Внутренние факторы — управление, человеческий фактор и технологии." } },
            { q: { pl: "Bank kupuje ubezpieczenie od skutków cyberataku. To sterowanie ryzykiem przez:", ru: "Банк покупает страховку от последствий кибератаки. Это регулирование риска путём:" },
              a: [{ pl: "unikanie", ru: "избегания" }, { pl: "akceptację", ru: "принятия" }, { pl: "przeniesienie", ru: "передачи" }, { pl: "identyfikację", ru: "выявления" }],
              correct: 2, why: { pl: "Ubezpieczenie przenosi część skutków finansowych ryzyka na ubezpieczyciela.", ru: "Страховка передаёт часть финансовых последствий риска страховщику." } },
          ],
        },
        // ------------------------------------------------------------------ 5.2
        {
          id: "5.2",
          title: { pl: "Ryzyko płynności", ru: "Риск ликвидности" },
          src: "Podstawy bankowości, slajdy 131–136",
          body: {
            pl: `Bank może mieć świetne kredyty i duży zysk, a mimo to upaść w tydzień — jeśli zabraknie mu gotówki na wypłaty. To właśnie [[ryzyko-plynnosci|ryzyko płynności]].

## Czym jest płynność
> !zapamietaj **Płynność** to zdolność do **terminowego regulowania zobowiązań**. Dla banku ryzyko płynności to zagrożenie płatnicze zarówno wobec **deponentów** (wypłata depozytów), jak i **kredytobiorców** (wypłata przyznanych kredytów).

Płynność to nie to samo co wypłacalność. Bank **wypłacalny** ma więcej aktywów niż zobowiązań. Bank **płynny** ma gotówkę teraz. Można być wypłacalnym, ale niepłynnym — gdy aktywa są dobre, ale „zamrożone” w długich kredytach.

## Przyczyny braku płynności
- **niespłacanie lub opóźnienia** w spłacie rat kapitału i odsetek — pieniądze, na które bank liczył, nie wpływają,
- **[[transformacja-terminow|transformacja terminów]]** — krótkie depozyty finansują długie kredyty, więc wypływy mogą wyprzedzać wpływy,
- **nieoczekiwane przedterminowe wypłaty** środków z lokat — np. po złej plotce o banku,
- **czynniki wewnętrzne** (złe zarządzanie, utrata reputacji) i **zewnętrzne** (kryzys na rynku międzybankowym, panika).

> !przyklad W marcu 2023 r. amerykański Silicon Valley Bank stracił w ciągu jednego dnia dziesiątki miliardów dolarów depozytów. Klienci — głównie firmy technologiczne — wypłacali pieniądze masowo przez aplikacje, po informacji o stratach banku na obligacjach. Bank, który formalnie miał duże aktywa, nie zdążył ich spieniężyć i został zamknięty.

## Teoretyczne zasady zachowania płynności
| Zasada | Na czym polega |
|---|---|
| **Złota reguła bankowa** (O. Hübner, XIX w.) | terminy aktywów i pasywów muszą być dopasowane — kredyty długie tylko z pieniędzy długich |
| **Teoria osadu we wkładach** | część depozytów, nawet bieżących, stale zostaje w banku (osad); można ją bezpiecznie pożyczać na dłużej |
| **Reguła przesunięć** (shiftability) | ważne nie terminy, tylko możliwość szybkiej sprzedaży aktywów lub ich zastawienia w banku centralnym |
| **Reguła maksymalnego obciążenia** (W. Stützel) | bank musi być w stanie pokryć maksymalne możliwe wypływy ze sprzedaży aktywów bez straty niszczącej kapitał |

Złota reguła jest najbezpieczniejsza, ale gdyby bank jej ściśle przestrzegał, nie mógłby przekształcać terminów i nie zarabiałby. Pozostałe reguły pokazują, kiedy transformacja jest bezpieczna.

## Pomiar ryzyka płynności
**Luka płynności** to różnica między aktywami a pasywami, które stają się wymagalne w tym samym przedziale czasu (np. do 7 dni, 7 dni–1 miesiąc, 1–3 miesiące…). Ujemna luka w danym przedziale oznacza, że więcej pieniędzy wypłynie niż wpłynie.

**Urealniona luka płynności** koryguje terminy z umów o **rzeczywiste zachowania klientów**. Formalnie depozyty bieżące są płatne „na żądanie” (od razu), ale w praktyce większość z nich zostaje w banku przez lata (osad). Z kolei część kredytów jest spłacana przed terminem.

| Przedział | Aktywa (wpływy) | Pasywa (wypływy) | Luka |
|---|---|---|---|
| do 1 miesiąca | 200 | 350 | −150 |
| 1–12 miesięcy | 300 | 250 | +50 |
| powyżej roku | 700 | 600 | +100 |

## Płynność bieżąca i strukturalna
- **Płynność bieżąca** — dni i tygodnie; bada się ją głównie **analizą luki** w najkrótszych przedziałach.
- **Płynność strukturalna** — średni i długi okres; obejmuje:
  - badanie zmian pozycji bilansowych i pozabilansowych,
  - analizę struktury bilansu (jak finansowane są długie aktywa),
  - prognozę sytuacji płynnościowej,
  - analizę ryzyka koncentracji (czy bank nie zależy od kilku dużych deponentów).

## Sposoby zarządzania płynnością
1. **Na podstawie aktywów** — utrzymywanie zapasu płynnych aktywów (gotówka, obligacje skarbowe, bony pieniężne), które łatwo sprzedać lub zastawić.
2. **Przez finansowanie na rynku pieniężnym** — pożyczanie na rynku międzybankowym, gdy brakuje środków.
3. **Zarządzanie aktywami i pasywami (ALM)** — wspólne planowanie struktury kredytów i źródeł finansowania.
4. **Sekurytyzacja wierzytelności kredytowych** — zamiana portfela kredytów na papiery wartościowe i ich sprzedaż, co daje gotówkę.
5. **Limity wewnętrzne płynności** — np. maksymalna ujemna luka w danym przedziale.
6. **Awaryjne plany zachowania płynności** — co robić, gdy nagle odpłyną depozyty (z kim się kontaktować, które aktywa sprzedać, kiedy prosić NBP o pomoc).

> !uwaga Od Bazylei III płynność to nie tylko sprawa wewnętrzna banku. Wskaźniki **LCR** i **NSFR** muszą wynosić co najmniej 100%, a w razie problemów bank może skorzystać z kredytu banku centralnego jako [[pozyczkodawca-ostatniej-instancji|pożyczkodawcy ostatniej instancji]].`,
            ru: `У банка могут быть отличные кредиты и большая прибыль, но он всё равно может рухнуть за неделю — если ему не хватит денег на выплаты. Это и есть [[ryzyko-plynnosci|риск ликвидности]].

## Что такое ликвидность
> !zapamietaj **Ликвидность** — способность **своевременно выполнять обязательства**. Для банка риск ликвидности — это угроза неплатежа как перед **вкладчиками** (выплата депозитов), так и перед **заёмщиками** (выдача одобренных кредитов).

Ликвидность — не то же самое, что платёжеспособность. **Платёжеспособный** банк имеет больше активов, чем обязательств. **Ликвидный** банк имеет деньги сейчас. Можно быть платёжеспособным, но неликвидным — когда активы хорошие, но «заморожены» в долгих кредитах.

## Причины нехватки ликвидности
- **невозврат или просрочки** платежей по основному долгу и процентам — деньги, на которые рассчитывал банк, не поступают,
- **[[transformacja-terminow|трансформация сроков]]** — короткие депозиты финансируют долгие кредиты, поэтому оттоки могут опережать притоки,
- **неожиданное досрочное изъятие** средств со вкладов — например, после плохого слуха о банке,
- **внутренние факторы** (плохое управление, потеря репутации) и **внешние** (кризис на межбанковском рынке, паника).

> !przyklad В марте 2023 г. американский Silicon Valley Bank за один день потерял десятки миллиардов долларов депозитов. Клиенты — в основном технологические компании — массово снимали деньги через приложения после новости об убытках банка по облигациям. Банк, у которого формально было много активов, не успел их продать и был закрыт.

## Теоретические принципы сохранения ликвидности
| Принцип | В чём суть |
|---|---|
| **Золотое банковское правило** (О. Хюбнер, XIX в.) | сроки активов и пассивов должны совпадать — долгие кредиты только из долгих денег |
| **Теория осадка во вкладах** | часть депозитов, даже текущих, постоянно остаётся в банке (осадок); её можно безопасно давать в долг на дольше |
| **Правило перемещения** (shiftability) | важны не сроки, а возможность быстро продать активы или заложить их в центральном банке |
| **Правило максимальной нагрузки** (В. Штютцель) | банк должен суметь покрыть максимально возможный отток продажей активов без убытка, уничтожающего капитал |

Золотое правило самое надёжное, но если бы банк строго его соблюдал, он не мог бы трансформировать сроки и не зарабатывал бы. Остальные правила показывают, когда трансформация безопасна.

## Измерение риска ликвидности
**Разрыв ликвидности** — разница между активами и пассивами, срок которых наступает в одном и том же интервале (например, до 7 дней, 7 дней–1 месяц, 1–3 месяца…). Отрицательный разрыв в интервале означает, что денег уйдёт больше, чем придёт.

**Скорректированный разрыв ликвидности** поправляет договорные сроки на **реальное поведение клиентов**. Формально текущие депозиты выплачиваются «по требованию» (сразу), но на практике большая их часть остаётся в банке годами (осадок). А часть кредитов погашается досрочно.

| Интервал | Активы (притоки) | Пассивы (оттоки) | Разрыв |
|---|---|---|---|
| до 1 месяца | 200 | 350 | −150 |
| 1–12 месяцев | 300 | 250 | +50 |
| более года | 700 | 600 | +100 |

## Текущая и структурная ликвидность
- **Текущая ликвидность** — дни и недели; её изучают в основном **анализом разрыва** в самых коротких интервалах.
- **Структурная ликвидность** — средний и долгий срок; включает:
  - изучение изменений балансовых и внебалансовых позиций,
  - анализ структуры баланса (как финансируются долгие активы),
  - прогноз ситуации с ликвидностью,
  - анализ риска концентрации (не зависит ли банк от нескольких крупных вкладчиков).

## Способы управления ликвидностью
1. **На основе активов** — поддержание запаса ликвидных активов (наличные, госооблигации, денежные векселя NBP), которые легко продать или заложить.
2. **Через финансирование на денежном рынке** — заимствование на межбанковском рынке при нехватке средств.
3. **Управление активами и пассивами (ALM)** — совместное планирование структуры кредитов и источников финансирования.
4. **Секьюритизация кредитных требований** — превращение портфеля кредитов в ценные бумаги и их продажа, что даёт деньги.
5. **Внутренние лимиты ликвидности** — например, максимальный отрицательный разрыв в интервале.
6. **Аварийные планы ликвидности** — что делать при внезапном оттоке депозитов (с кем связаться, какие активы продать, когда просить помощи у NBP).

> !uwaga С Базеля III ликвидность — не только внутреннее дело банка. Нормативы **LCR** и **NSFR** должны быть не ниже 100%, а при проблемах банк может воспользоваться кредитом центрального банка как [[pozyczkodawca-ostatniej-instancji|кредитора последней инстанции]].`,
          },
          quiz: [
            { q: { pl: "Płynność banku to:", ru: "Ликвидность банка — это:" },
              a: [{ pl: "nadwyżka aktywów nad zobowiązaniami", ru: "превышение активов над обязательствами" }, { pl: "zdolność do terminowego regulowania zobowiązań", ru: "способность своевременно выполнять обязательства" }, { pl: "wysokość zysku netto", ru: "размер чистой прибыли" }, { pl: "liczba oddziałów", ru: "число отделений" }],
              correct: 1, why: { pl: "Nadwyżka aktywów to wypłacalność; płynność to gotówka na czas.", ru: "Превышение активов — платёжеспособность; ликвидность — деньги вовремя." } },
            { q: { pl: "Złota reguła bankowa mówi, że:", ru: "Золотое банковское правило гласит, что:" },
              a: [{ pl: "terminy aktywów i pasywów powinny być dopasowane", ru: "сроки активов и пассивов должны совпадать" }, { pl: "bank powinien trzymać złoto w skarbcu", ru: "банк должен хранить золото в хранилище" }, { pl: "kredyty muszą być w walucie obcej", ru: "кредиты должны быть в иностранной валюте" }, { pl: "depozyty bieżące można pożyczać bez ograniczeń", ru: "текущие депозиты можно одалживать без ограничений" }],
              correct: 0, why: { pl: "Kredyty długie — z pieniędzy długich, krótkie — z krótkich.", ru: "Долгие кредиты — из долгих денег, короткие — из коротких." } },
            { q: { pl: "Część depozytów bieżących, która stale zostaje w banku, to:", ru: "Часть текущих депозитов, которая постоянно остаётся в банке, — это:" },
              a: [{ pl: "rezerwa obowiązkowa", ru: "обязательный резерв" }, { pl: "luka płynności", ru: "разрыв ликвидности" }, { pl: "osad", ru: "осадок (osad)" }, { pl: "marża", ru: "маржа" }],
              correct: 2, why: { pl: "Teoria osadu pozwala bezpiecznie pożyczać część depozytów na dłużej.", ru: "Теория осадка позволяет безопасно одалживать часть депозитов на дольше." } },
            { q: { pl: "W przedziale do 1 miesiąca wpływy wynoszą 200, a wypływy 350. Luka płynności to:", ru: "В интервале до 1 месяца притоки 200, оттоки 350. Разрыв ликвидности:" },
              a: [{ pl: "+150", ru: "+150" }, { pl: "+550", ru: "+550" }, { pl: "0", ru: "0" }, { pl: "−150", ru: "−150" }],
              correct: 3, why: { pl: "Luka = aktywa − pasywa = 200 − 350 = −150 (ujemna).", ru: "Разрыв = активы − пассивы = 200 − 350 = −150 (отрицательный)." } },
            { q: { pl: "Urealniona luka płynności różni się od zwykłej tym, że:", ru: "Скорректированный разрыв отличается от обычного тем, что:" },
              a: [{ pl: "uwzględnia rzeczywiste zachowania klientów, np. osad i wcześniejsze spłaty", ru: "учитывает реальное поведение клиентов, например осадок и досрочные погашения" }, { pl: "nie uwzględnia depozytów", ru: "не учитывает депозиты" }, { pl: "liczy się tylko raz w roku", ru: "считается только раз в год" }, { pl: "dotyczy tylko kredytów walutowych", ru: "касается только валютных кредитов" }],
              correct: 0, why: { pl: "Terminy umowne koryguje się o to, jak klienci faktycznie się zachowują.", ru: "Договорные сроки корректируют с учётом фактического поведения клиентов." } },
            { q: { pl: "Zamiana portfela kredytów na papiery wartościowe i ich sprzedaż to:", ru: "Превращение портфеля кредитов в ценные бумаги и их продажа — это:" },
              a: [{ pl: "faktoring", ru: "факторинг" }, { pl: "sekurytyzacja", ru: "секьюритизация" }, { pl: "konsolidacja", ru: "консолидация" }, { pl: "inkaso", ru: "инкассо" }],
              correct: 1, why: { pl: "Sekurytyzacja zamienia niepłynne kredyty na gotówkę.", ru: "Секьюритизация превращает неликвидные кредиты в деньги." } },
          ],
        },
        // ------------------------------------------------------------------ 5.3
        {
          id: "5.3",
          title: { pl: "Ryzyko kredytowe i ocena zdolności kredytowej", ru: "Кредитный риск и оценка кредитоспособности" },
          src: "Podstawy bankowości, slajdy 137–154; Prawo bankowe, art. 70",
          body: {
            pl: `[[ryzyko-kredytowe|Ryzyko kredytowe]] to zwykle największe ryzyko banku. Jego istotą jest **niewypłacalność** klienta — zaprzestanie spłaty, po angielsku **default**.

## Pojedyncze i łączne ryzyko kredytowe
- **Pojedyncze ryzyko** dotyczy jednego kredytu i zależy od **wysokości możliwej straty**.
- **Łączne ryzyko (portfela)** zależy od wysokości pojedynczych kredytów, **prawdopodobieństwa** ich niespłacenia i **współzależności** między nimi. Sto kredytów dla firm z jednej branży jest bardziej ryzykowne niż sto kredytów z różnych branż, bo mogą „upaść razem”.

## Metody ograniczania ryzyka kredytowego
1. **Badanie zdolności kredytowej przed udzieleniem kredytu**.
2. **Zabezpieczenie kredytu**.
3. **Monitoring kredytowy** — sprawdzanie zdolności po udzieleniu kredytu.

Badanie zdolności ma dwa kroki:
- **zdolność prawna** do zaciągania kredytów — czy klient w ogóle może zawrzeć umowę (np. pełnoletność, umocowanie zarządu firmy),
- **analiza [[zdolnosc-kredytowa|zdolności kredytowej]]** — metodą **opisową** (ocena ekspercka) lub **statystyczno-matematyczną** (modele, scoring).

## Osoba indywidualna a przedsiębiorstwo
| | Osoba fizyczna | Przedsiębiorstwo |
|---|---|---|
| Źródło spłaty | dochód (pensja, emerytura) | przepływy pieniężne z działalności |
| Dokumenty | zaświadczenie o dochodach, wyciągi | sprawozdania finansowe, plany, dane o transakcjach |
| Główna metoda | credit scoring | analiza wskaźnikowa, rating |
| Skala | wiele małych, podobnych kredytów | mniej, ale większych i różnorodnych |

## Zdolność kredytowa przedsiębiorstwa
Na możliwości płatnicze firmy wpływają: wartość majątku, struktura kapitałów i zobowiązań, płynność, wartość sprzedaży i jakość produkcji, pozycja na rynku, kwalifikacje kadry kierowniczej oraz otoczenie.

Bank potrzebuje dokumentów: **sprawozdania finansowego**, **planów finansowych**, danych o zawieranych **transakcjach** i rozpoczętych **inwestycjach**, informacji o **zadłużeniu w innych bankach** i **spisu zabezpieczeń**.

## Analiza wskaźnikowa
| Grupa | Przykładowe wskaźniki | Pytanie |
|---|---|---|
| **rentowność** | ROE = zysk netto / kapitał własny; ROA = zysk netto / aktywa | czy firma zarabia? |
| **płynność finansowa** | wskaźnik płynności bieżącej = aktywa obrotowe / zobowiązania krótkoterminowe | czy ma czym płacić bieżące rachunki? |
| **sprawność działania** | rotacja zapasów, rotacja należności (w dniach) | jak szybko obraca pieniędzmi? |
| **zadłużenie i pokrycie** | wskaźnik zadłużenia = zobowiązania / aktywa; **DSCR** = środki na obsługę długu / raty i odsetki | czy udźwignie dług? |

> !zapamietaj **DSCR** (debt service coverage ratio) pokazuje, ile razy wolne przepływy firmy pokrywają raty kapitału i odsetek. DSCR poniżej 1 oznacza, że z bieżącej działalności nie wystarczy na obsługę długu.

Wskaźniki porównuje się z: **latami ubiegłymi** (trend), **innymi firmami** o podobnych obrotach, zatrudnieniu i kapitałochłonności oraz z **wartościami granicznymi**. Bank patrzy też na branżę: **rozwojową**, **stagnacyjną** lub **regresyjną**, i robi **analizę wrażliwości** — co się stanie z firmą, gdy np. sprzedaż spadnie o 20% albo stopy wzrosną o 2 pkt proc.

## Metoda 5C (6C)
Klasyczna metoda opisowa ocenia klienta w pięciu (sześciu) wymiarach:
1. **Character** — charakter, uczciwość, historia kredytowa,
2. **Capacity** — zdolność do spłaty z dochodów,
3. **Capital** — kapitał własny, majątek,
4. **Collateral** — zabezpieczenie,
5. **Conditions** — warunki zewnętrzne (gospodarka, branża),
6. **Control** — (w wersji 6C) zgodność z prawem i polityką banku, kontrola nad wykorzystaniem środków.

## Metoda punktowa i model Altmana
**Metoda punktowa**: wybiera się kryteria (np. ROA, płynność, staż na rynku), przypisuje im punkty i sumuje. Suma decyduje o klasie ryzyka.

**[[model-altmana|Model Altmana]]** (Z-score, 1968) łączy pięć wskaźników w jedną liczbę:

Z = 1,2 · (kapitał pracujący / aktywa ogółem) + 1,4 · (skumulowany zysk zatrzymany / aktywa ogółem) + 3,3 · (zysk przed opodatkowaniem i odsetkami / aktywa ogółem) + 0,6 · (wartość rynkowa kapitału własnego / wartość kapitałów obcych) + 1,0 · (sprzedaż / aktywa ogółem)

W oryginalnym badaniu Altmana firmy z Z poniżej ok. 1,81 były zagrożone upadłością, a powyżej ok. 2,99 — bezpieczne; pomiędzy leżała „szara strefa”.

## Ratingi
**Wewnętrzne ratingi ryzyka** bank buduje sam, oceniając: kondycję ekonomiczno-finansową, zdolności menedżerskie, pozycję kredytobiorcy w branży, jakość informacji finansowych i ryzyko kraju. **[[rating|Ratingi zewnętrzne]]** nadają agencje (S&P, Moody's, Fitch) w skali od AAA do D.

## Credit scoring dla osób fizycznych
[[scoring|Scoring]] przyznaje punkty za cechy klienta (dochód, zatrudnienie, wiek, zobowiązania, historia w BIK). Pozwala: **określić wielkość ryzyka**, **uzyskać wiarygodne prognozy**, **zautomatyzować proces** i **ułatwić obserwację kredytu**.

> !przyklad Firma ma ROA 2%, płynność bieżącą 0,8 i DSCR 0,9. Rentowność jest niska, aktywa obrotowe nie pokrywają zobowiązań krótkoterminowych, a przepływy nie wystarczają na raty. Bank prawdopodobnie odmówi albo zażąda silnego zabezpieczenia i programu naprawczego (art. 70 ust. 2).`,
            ru: `[[ryzyko-kredytowe|Кредитный риск]] — обычно самый крупный риск банка. Его суть — **неплатёжеспособность** клиента, прекращение платежей, по-английски **default**.

## Единичный и совокупный кредитный риск
- **Единичный риск** касается одного кредита и зависит от **размера возможного убытка**.
- **Совокупный риск (портфеля)** зависит от размера отдельных кредитов, **вероятности** их невозврата и **взаимосвязи** между ними. Сто кредитов фирмам одной отрасли рискованнее, чем сто кредитов разным отраслям, потому что они могут «упасть вместе».

## Методы ограничения кредитного риска
1. **Анализ кредитоспособности до выдачи кредита**.
2. **Обеспечение кредита**.
3. **Кредитный мониторинг** — проверка кредитоспособности после выдачи.

Анализ кредитоспособности проходит в два шага:
- **правоспособность** брать кредиты — может ли клиент вообще заключить договор (например, совершеннолетие, полномочия правления фирмы),
- **анализ [[zdolnosc-kredytowa|кредитоспособности]]** — **описательным** методом (экспертная оценка) или **статистико-математическим** (модели, скоринг).

## Физическое лицо и предприятие
| | Физическое лицо | Предприятие |
|---|---|---|
| Источник погашения | доход (зарплата, пенсия) | денежные потоки от деятельности |
| Документы | справка о доходах, выписки | финансовая отчётность, планы, данные о сделках |
| Главный метод | кредитный скоринг | анализ показателей, рейтинг |
| Масштаб | много мелких однотипных кредитов | меньше, но крупнее и разнообразнее |

## Кредитоспособность предприятия
На платёжные возможности фирмы влияют: стоимость имущества, структура капитала и обязательств, ликвидность, объём продаж и качество продукции, положение на рынке, квалификация руководства и окружение.

Банку нужны документы: **финансовая отчётность**, **финансовые планы**, данные о заключаемых **сделках** и начатых **инвестициях**, информация о **долгах в других банках** и **перечень обеспечения**.

## Анализ показателей
| Группа | Примеры показателей | Вопрос |
|---|---|---|
| **рентабельность** | ROE = чистая прибыль / собственный капитал; ROA = чистая прибыль / активы | зарабатывает ли фирма? |
| **финансовая ликвидность** | коэффициент текущей ликвидности = оборотные активы / краткосрочные обязательства | есть ли чем платить текущие счета? |
| **деловая активность** | оборачиваемость запасов, дебиторской задолженности (в днях) | как быстро оборачиваются деньги? |
| **задолженность и покрытие** | коэффициент задолженности = обязательства / активы; **DSCR** = средства на обслуживание долга / платежи по основному долгу и процентам | выдержит ли долг? |

> !zapamietaj **DSCR** (debt service coverage ratio) показывает, во сколько раз свободные денежные потоки фирмы покрывают платежи по основному долгу и процентам. DSCR ниже 1 означает, что текущей деятельности не хватит на обслуживание долга.

Показатели сравнивают с **прошлыми годами** (тенденция), с **другими фирмами** с похожим оборотом, численностью и капиталоёмкостью и с **пороговыми значениями**. Банк смотрит и на отрасль: **растущую**, **стагнирующую** или **регрессирующую**, и делает **анализ чувствительности** — что будет с фирмой, если, например, продажи упадут на 20% или ставки вырастут на 2 п.п.

## Метод 5C (6C)
Классический описательный метод оценивает клиента по пяти (шести) измерениям:
1. **Character** — характер, честность, кредитная история,
2. **Capacity** — способность погашать из доходов,
3. **Capital** — собственный капитал, имущество,
4. **Collateral** — обеспечение,
5. **Conditions** — внешние условия (экономика, отрасль),
6. **Control** — (в версии 6C) соответствие закону и политике банка, контроль за использованием средств.

## Балльный метод и модель Альтмана
**Балльный метод**: выбирают критерии (например, ROA, ликвидность, стаж на рынке), присваивают им баллы и суммируют. Сумма определяет класс риска.

**[[model-altmana|Модель Альтмана]]** (Z-score, 1968) объединяет пять показателей в одно число:

Z = 1,2 · (оборотный капитал / активы) + 1,4 · (накопленная нераспределённая прибыль / активы) + 3,3 · (прибыль до налогов и процентов / активы) + 0,6 · (рыночная стоимость собственного капитала / заёмный капитал) + 1,0 · (выручка / активы)

В исходном исследовании Альтмана фирмы с Z ниже примерно 1,81 были под угрозой банкротства, а выше примерно 2,99 — в безопасности; между ними лежала «серая зона».

## Рейтинги
**Внутренние рейтинги риска** банк строит сам, оценивая: экономико-финансовое состояние, управленческие способности, положение заёмщика в отрасли, качество финансовой информации и страновой риск. **[[rating|Внешние рейтинги]]** присваивают агентства (S&P, Moody's, Fitch) по шкале от AAA до D.

## Кредитный скоринг для физических лиц
[[scoring|Скоринг]] начисляет баллы за характеристики клиента (доход, занятость, возраст, обязательства, история в BIK). Он позволяет: **определить величину риска**, **получить надёжные прогнозы**, **автоматизировать процесс** и **облегчить наблюдение за кредитом**.

> !przyklad У фирмы ROA 2%, текущая ликвидность 0,8 и DSCR 0,9. Рентабельность низкая, оборотные активы не покрывают краткосрочные обязательства, а потоков не хватает на платежи. Банк, скорее всего, откажет или потребует сильного обеспечения и программы оздоровления (ст. 70 п. 2).`,
          },
          quiz: [
            { q: { pl: "Łączne ryzyko kredytowe portfela zależy m.in. od:", ru: "Совокупный кредитный риск портфеля зависит, в частности, от:" },
              a: [{ pl: "koloru logo banku", ru: "цвета логотипа банка" }, { pl: "tylko liczby oddziałów", ru: "только числа отделений" }, { pl: "współzależności między pojedynczymi kredytami", ru: "взаимосвязи между отдельными кредитами" }, { pl: "wyłącznie stopy referencyjnej", ru: "только референтной ставки" }],
              correct: 2, why: { pl: "Liczą się wielkości kredytów, prawdopodobieństwo niespłaty i korelacje.", ru: "Важны размеры кредитов, вероятность невозврата и корреляции." } },
            { q: { pl: "Wskaźnik DSCR poniżej 1 oznacza, że:", ru: "DSCR ниже 1 означает, что:" },
              a: [{ pl: "firma ma bardzo wysoką rentowność", ru: "у фирмы очень высокая рентабельность" }, { pl: "przepływy nie pokrywają rat i odsetek", ru: "потоки не покрывают платежи и проценты" }, { pl: "firma nie ma żadnych długów", ru: "у фирмы нет долгов" }, { pl: "zapasy rotują szybko", ru: "запасы быстро оборачиваются" }],
              correct: 1, why: { pl: "DSCR = środki na obsługę długu / obsługa długu; poniżej 1 brakuje pieniędzy na raty.", ru: "DSCR = средства на обслуживание / обслуживание долга; ниже 1 денег на платежи не хватает." } },
            { q: { pl: "Litera „Collateral” w metodzie 5C oznacza:", ru: "Буква «Collateral» в методе 5C означает:" },
              a: [{ pl: "zabezpieczenie", ru: "обеспечение" }, { pl: "charakter klienta", ru: "характер клиента" }, { pl: "kapitał własny", ru: "собственный капитал" }, { pl: "warunki gospodarcze", ru: "экономические условия" }],
              correct: 0, why: { pl: "Character, Capacity, Capital, Collateral (zabezpieczenie), Conditions.", ru: "Character, Capacity, Capital, Collateral (обеспечение), Conditions." } },
            { q: { pl: "Który wskaźnik w modelu Altmana ma najwyższą wagę?", ru: "Какой показатель в модели Альтмана имеет наибольший вес?" },
              a: [{ pl: "sprzedaż / aktywa", ru: "выручка / активы" }, { pl: "kapitał pracujący / aktywa", ru: "оборотный капитал / активы" }, { pl: "wartość rynkowa kapitału / kapitały obce", ru: "рыночная стоимость капитала / заёмный капитал" }, { pl: "EBIT / aktywa", ru: "EBIT / активы" }],
              correct: 3, why: { pl: "Waga 3,3 przy zysku przed odsetkami i podatkiem do aktywów.", ru: "Вес 3,3 у прибыли до процентов и налогов к активам." } },
            { q: { pl: "Credit scoring stosuje się głównie do oceny:", ru: "Кредитный скоринг применяют в основном для оценки:" },
              a: [{ pl: "państw", ru: "государств" }, { pl: "dużych korporacji giełdowych", ru: "крупных публичных корпораций" }, { pl: "osób fizycznych", ru: "физических лиц" }, { pl: "banków centralnych", ru: "центральных банков" }],
              correct: 2, why: { pl: "Scoring automatyzuje ocenę wielu podobnych, małych kredytów detalicznych.", ru: "Скоринг автоматизирует оценку множества похожих мелких розничных кредитов." } },
            { q: { pl: "Firma działa w branży, której sprzedaż od lat spada. To branża:", ru: "Фирма работает в отрасли, продажи которой годами падают. Это отрасль:" },
              a: [{ pl: "rozwojowa", ru: "растущая" }, { pl: "regresyjna", ru: "регрессирующая" }, { pl: "stagnacyjna", ru: "стагнирующая" }, { pl: "innowacyjna", ru: "инновационная" }],
              correct: 1, why: { pl: "Branża regresyjna kurczy się — ryzyko kredytowe jest wyższe.", ru: "Регрессирующая отрасль сжимается — кредитный риск выше." } },
          ],
        },
        // ------------------------------------------------------------------ 5.4
        {
          id: "5.4",
          title: { pl: "Zabezpieczenia, monitoring i portfel kredytowy", ru: "Обеспечение, мониторинг и кредитный портфель" },
          src: "Podstawy bankowości, slajdy 155–159",
          body: {
            pl: `Nawet najlepsza ocena zdolności kredytowej może się pomylić. Dlatego bank ma jeszcze dwie linie obrony: **zabezpieczenie**, z którego odzyska pieniądze, gdy klient nie zapłaci, i **monitoring**, który pozwala wcześnie zauważyć kłopoty.

## Ryzyko w transakcjach międzybankowych
Ryzyko kredytowe dotyczy nie tylko klientów, ale też innych banków. Bank ponosi je, gdy:
- udziela kredytów innym bankom,
- lokuje u nich depozyty (np. overnight),
- przyjmuje od nich gwarancje i poręczenia (jeśli bank-gwarant upadnie, gwarancja nic nie jest warta),
- prowadzi z nimi rozliczenia, np. akredytywy.

Dlatego banki ustalają **limity na kontrahentów** — maksymalną kwotę, jaką mogą mieć „u” danego banku.

## Zabezpieczenia kredytów
Zabezpieczenia dzielą się na **osobiste** (odpowiada osoba, całym swoim majątkiem) i **rzeczowe** (odpowiada konkretna rzecz).

| Zabezpieczenie | Rodzaj | Na czym polega |
|---|---|---|
| **[[hipoteka|Hipoteka]]** | rzeczowe | prawo do zaspokojenia się z nieruchomości; wpis do księgi wieczystej |
| **Zastaw** (w tym rejestrowy) | rzeczowe | prawo do zaspokojenia się z rzeczy ruchomej (auto, maszyna, zapasy) |
| **Blokada środków na rachunku** | rzeczowe | część pieniędzy na koncie klienta jest „zamrożona” do spłaty kredytu |
| **Kaucja** | rzeczowe | klient przekazuje bankowi pieniądze, które bank zwraca po spłacie |
| **Poręczenie** | osobiste | osoba trzecia (poręczyciel) zobowiązuje się spłacić dług, jeśli dłużnik tego nie zrobi |
| **Weksel** (in blanco) | osobiste | klient podpisuje niewypełniony weksel, który bank może uzupełnić i dochodzić zapłaty w uproszczonym trybie |

Do zabezpieczeń należą też m.in. cesja wierzytelności (np. z kontraktu lub polisy), przewłaszczenie na zabezpieczenie i ubezpieczenie kredytu.

## Hipoteka i zastaw na rzeczach ruchomych
**Hipoteka** obciąża nieruchomość. Jej ogromną zaletą jest to, że „idzie za nieruchomością” — jeśli właściciel ją sprzeda, nowy właściciel kupuje ją z hipoteką. Wierzyciel hipoteczny ma też **pierwszeństwo** przed innymi wierzycielami. Hipotekę ustanawia się przez wpis do **księgi wieczystej**.

**Zastaw** to odpowiednik hipoteki dla rzeczy ruchomych. **Zastaw rejestrowy** wpisuje się do rejestru zastawów prowadzonego przez sąd — rzecz może zostać u dłużnika (firma dalej używa maszyny), a bank i tak jest chroniony.

| | Hipoteka | Zastaw rejestrowy |
|---|---|---|
| Przedmiot | nieruchomość | rzecz ruchoma, prawa |
| Gdzie wpis | księga wieczysta | rejestr zastawów |
| Kto ma rzecz | właściciel | zwykle dłużnik |
| Typowy kredyt | mieszkaniowy, inwestycyjny | samochodowy, na maszyny |

> !uwaga Zabezpieczenie **nie zastępuje** zdolności kredytowej. Bank woli klienta, który spłaca z dochodów, niż sprzedaż jego mieszkania na licytacji — to długie, kosztowne i często przynosi mniej niż wartość rynkowa.

> !przyklad Firma transportowa bierze kredyt na 5 ciężarówek. Bank ustanawia **zastaw rejestrowy** na ciężarówkach (firma nimi jeździ), żąda **weksla in blanco** podpisanego przez firmę i **poręczenia** właściciela. Jeśli firma przestanie płacić, bank może sięgnąć po ciężarówki, a gdy to nie wystarczy — po majątek właściciela.

## Monitoring kredytowy — analiza po udzieleniu kredytu
Kredyt udzielony to dopiero początek. Bank stale obserwuje:
- **sytuację makroekonomiczną** — recesja, stopy, kurs, inflacja,
- **sytuację w branży** — np. nowe przepisy, spadek popytu, ceny surowców,
- **sytuację w przedsiębiorstwie** — sprawozdania kwartalne, terminowość spłat, wpływy na rachunek, zmiany w zarządzie, wartość zabezpieczeń.

Sygnały ostrzegawcze to np.: opóźnienia w ratach, spadek wpływów na rachunek, przekraczanie limitów, prośby o odroczenie spłaty, utrata dużego klienta. Wcześnie wykryty problem można rozwiązać (restrukturyzacja, dodatkowe zabezpieczenie), zanim kredyt stanie się „zagrożony”.

## Zarządzanie portfelem kredytowym
Bank patrzy nie tylko na pojedyncze kredyty, ale na cały portfel:
- **limity zaangażowań** — na jednego klienta, grupę powiązaną, branżę, region, walutę (pamiętaj o limicie 25% kapitału),
- **dywersyfikacja portfela** — kredyty dla różnych branż, regionów i typów klientów, żeby nie upadały razem,
- **monitoring kredytowy** — na poziomie całego portfela: udział kredytów przeterminowanych, odpisy, koncentracje.

> !zapamietaj Trzy linie obrony przed ryzykiem kredytowym: **ocena zdolności przed kredytem**, **zabezpieczenie**, **monitoring po kredycie**. A na poziomie portfela: **limity** i **dywersyfikacja**.`,
            ru: `Даже самая лучшая оценка кредитоспособности может ошибиться. Поэтому у банка есть ещё две линии обороны: **обеспечение**, из которого он вернёт деньги, если клиент не заплатит, и **мониторинг**, позволяющий рано заметить проблемы.

## Риск в межбанковских операциях
Кредитный риск касается не только клиентов, но и других банков. Банк несёт его, когда:
- кредитует другие банки,
- размещает у них депозиты (например, овернайт),
- принимает от них гарантии и поручительства (если банк-гарант обанкротится, гарантия ничего не стоит),
- ведёт с ними расчёты, например аккредитивы.

Поэтому банки устанавливают **лимиты на контрагентов** — максимальную сумму, которую можно держать «у» данного банка.

## Обеспечение кредитов
Обеспечение делится на **личное** (отвечает человек всем своим имуществом) и **вещное** (отвечает конкретная вещь).

| Обеспечение | Вид | В чём суть |
|---|---|---|
| **[[hipoteka|Ипотека]]** | вещное | право на удовлетворение из недвижимости; запись в поземельной книге |
| **Залог** (в том числе регистрируемый) | вещное | право на удовлетворение из движимой вещи (авто, станок, запасы) |
| **Блокировка средств на счёте** | вещное | часть денег на счёте клиента «заморожена» для погашения кредита |
| **Денежный залог (kaucja)** | вещное | клиент передаёт банку деньги, которые тот возвращает после погашения |
| **Поручительство** | личное | третье лицо (поручитель) обязуется погасить долг, если должник этого не сделает |
| **Вексель** (бланковый) | личное | клиент подписывает незаполненный вексель, который банк может заполнить и взыскать в упрощённом порядке |

К обеспечению относятся также уступка требований (например, по контракту или полису), передача права собственности в обеспечение и страхование кредита.

## Ипотека и залог движимых вещей
**Ипотека** обременяет недвижимость. Её огромное преимущество — она «следует за недвижимостью»: если владелец её продаст, новый владелец покупает её с ипотекой. Ипотечный кредитор также имеет **приоритет** перед другими кредиторами. Ипотеку устанавливают записью в **поземельной книге (księga wieczysta)**.

**Залог** — аналог ипотеки для движимых вещей. **Регистрируемый залог (zastaw rejestrowy)** вносят в реестр залогов, который ведёт суд, — вещь может оставаться у должника (фирма продолжает пользоваться станком), а банк всё равно защищён.

| | Ипотека | Регистрируемый залог |
|---|---|---|
| Предмет | недвижимость | движимая вещь, права |
| Где запись | поземельная книга | реестр залогов |
| У кого вещь | у владельца | обычно у должника |
| Типичный кредит | жилищный, инвестиционный | автокредит, на оборудование |

> !uwaga Обеспечение **не заменяет** кредитоспособность. Банк предпочитает клиента, который платит из доходов, продаже его квартиры с торгов — это долго, дорого и часто приносит меньше рыночной стоимости.

> !przyklad Транспортная фирма берёт кредит на 5 грузовиков. Банк устанавливает **регистрируемый залог** на грузовики (фирма на них ездит), требует **бланковый вексель**, подписанный фирмой, и **поручительство** владельца. Если фирма перестанет платить, банк может обратить взыскание на грузовики, а если этого не хватит — на имущество владельца.

## Кредитный мониторинг — анализ после выдачи кредита
Выданный кредит — только начало. Банк постоянно следит за:
- **макроэкономической ситуацией** — рецессия, ставки, курс, инфляция,
- **ситуацией в отрасли** — например, новые законы, падение спроса, цены сырья,
- **ситуацией на предприятии** — квартальная отчётность, своевременность платежей, поступления на счёт, смены в правлении, стоимость обеспечения.

Тревожные сигналы: просрочки платежей, падение поступлений на счёт, превышение лимитов, просьбы об отсрочке, потеря крупного клиента. Рано выявленную проблему можно решить (реструктуризация, дополнительное обеспечение), прежде чем кредит станет «проблемным».

## Управление кредитным портфелем
Банк смотрит не только на отдельные кредиты, но и на весь портфель:
- **лимиты вложений** — на одного клиента, связанную группу, отрасль, регион, валюту (помните о лимите 25% капитала),
- **диверсификация портфеля** — кредиты разным отраслям, регионам и типам клиентов, чтобы они не падали вместе,
- **кредитный мониторинг** — на уровне всего портфеля: доля просроченных кредитов, резервы, концентрации.

> !zapamietaj Три линии обороны от кредитного риска: **оценка кредитоспособности до кредита**, **обеспечение**, **мониторинг после кредита**. А на уровне портфеля — **лимиты** и **диверсификация**.`,
          },
          quiz: [
            { q: { pl: "Które zabezpieczenie jest osobiste?", ru: "Какое обеспечение является личным?" },
              a: [{ pl: "Hipoteka", ru: "Ипотека" }, { pl: "Zastaw rejestrowy", ru: "Регистрируемый залог" }, { pl: "Poręczenie", ru: "Поручительство" }, { pl: "Blokada środków", ru: "Блокировка средств" }],
              correct: 2, why: { pl: "Przy poręczeniu odpowiada osoba (poręczyciel) całym majątkiem, a nie konkretna rzecz.", ru: "При поручительстве отвечает человек (поручитель) всем имуществом, а не конкретная вещь." } },
            { q: { pl: "Hipotekę ustanawia się przez wpis do:", ru: "Ипотеку устанавливают записью в:" },
              a: [{ pl: "księgi wieczystej", ru: "поземельную книгу" }, { pl: "rejestru zastawów", ru: "реестр залогов" }, { pl: "BIK", ru: "BIK" }, { pl: "KRS", ru: "KRS" }],
              correct: 0, why: { pl: "Hipoteka obciąża nieruchomość i jest ujawniana w księdze wieczystej.", ru: "Ипотека обременяет недвижимость и отражается в поземельной книге." } },
            { q: { pl: "Zastaw rejestrowy pozwala, by:", ru: "Регистрируемый залог позволяет:" },
              a: [{ pl: "bank od razu sprzedał rzecz", ru: "банку сразу продать вещь" }, { pl: "rzecz została u dłużnika, a bank był chroniony", ru: "вещи остаться у должника, а банку быть защищённым" }, { pl: "klient nie spłacał kredytu", ru: "клиенту не погашать кредит" }, { pl: "nieruchomość zmieniła właściciela", ru: "недвижимости сменить владельца" }],
              correct: 1, why: { pl: "Wpis do rejestru chroni bank, a firma dalej używa np. maszyny.", ru: "Запись в реестре защищает банк, а фирма продолжает пользоваться, например, станком." } },
            { q: { pl: "Ulokowanie depozytu overnight w innym banku niesie dla banku ryzyko:", ru: "Размещение депозита овернайт в другом банке несёт для банка риск:" },
              a: [{ pl: "żadne", ru: "никакой" }, { pl: "tylko walutowe", ru: "только валютный" }, { pl: "tylko operacyjne", ru: "только операционный" }, { pl: "kredytowe (kontrahenta)", ru: "кредитный (контрагента)" }],
              correct: 3, why: { pl: "Jeśli bank-kontrahent upadnie, depozyt może nie wrócić — stąd limity na kontrahentów.", ru: "Если банк-контрагент обанкротится, депозит может не вернуться, — отсюда лимиты на контрагентов." } },
            { q: { pl: "Dywersyfikacja portfela kredytowego polega na:", ru: "Диверсификация кредитного портфеля заключается в:" },
              a: [{ pl: "udzielaniu kredytów różnym branżom, regionom i klientom", ru: "кредитовании разных отраслей, регионов и клиентов" }, { pl: "kredytowaniu tylko jednej, najlepszej branży", ru: "кредитовании только одной, лучшей отрасли" }, { pl: "rezygnacji z zabezpieczeń", ru: "отказе от обеспечения" }, { pl: "podnoszeniu stóp NBP", ru: "повышении ставок NBP" }],
              correct: 0, why: { pl: "Rozproszenie zmniejsza ryzyko, że wiele kredytów przestanie być spłacanych naraz.", ru: "Распределение снижает риск, что многие кредиты перестанут погашаться одновременно." } },
          ],
        },
        // ------------------------------------------------------------------ 5.5
        {
          id: "5.5",
          title: { pl: "Ryzyko stopy procentowej, walutowe i kraju", ru: "Процентный, валютный и страновой риск" },
          src: "Podstawy bankowości, slajdy 160–170",
          body: {
            pl: `Bank może mieć samych uczciwych klientów i świetną płynność, a i tak stracić pieniądze — bo zmieniły się stopy procentowe, kurs walut albo sytuacja w kraju, z którym handluje.

## Ryzyko stopy procentowej
> !zapamietaj [[ryzyko-stopy-procentowej|Ryzyko stopy procentowej]] to niebezpieczeństwo **negatywnego wpływu zmian rynkowych stóp procentowych** na sytuację finansową banku.

**Przyczyny:**
- **niedopasowanie terminów** — aktywa i pasywa mają różne terminy zapadalności,
- **przeszacowanie aktywów, pasywów i pozycji pozabilansowych** w różnym czasie — oprocentowanie kredytów i depozytów zmienia się w różnych momentach (np. kredyt ze stałą stopą na 5 lat, a depozyty 3-miesięczne).

**Ryzyko zależy od:**
- **wielkości zmian** stopy procentowej,
- **wielkości transakcji**, dla których terminy zmiany stóp nie są zsynchronizowane,
- **długości czasu**, na który zawarto transakcje.

> !przyklad Bank udzielił kredytów na 5 lat ze stałym oprocentowaniem 7%, finansując je 3-miesięcznymi lokatami na 4%. Zarabia 3 pkt proc. marży. Po roku stopy rosną i nowe lokaty kosztują 6%. Bank dalej dostaje tylko 7% z kredytów, więc marża spada do 1 pkt proc. Gdyby stopy wzrosły do 8%, bank traciłby na każdym złotym.

**WIBOR a WIRON w kontekście ryzyka.** Przy kredytach o zmiennym oprocentowaniu (WIBOR + marża) ryzyko stopy przenosi się w dużej mierze na klienta. Ale rośnie wtedy ryzyko kredytowe — gdy stopy szybko rosną, raty mogą przekroczyć możliwości kredytobiorców. Reforma wskaźników (WIBOR → wskaźnik transakcyjny, np. [[wiron|WIRON]], a według planu z 2025 r. POLSTR) ma sprawić, by wskaźnik lepiej odzwierciedlał rzeczywiste transakcje, ale nie usuwa samego ryzyka zmiany stóp.

Bank zarządza tym ryzykiem m.in. przez: dopasowanie terminów przeszacowania (analiza luki), kredyty o zmiennym lub okresowo stałym oprocentowaniu, instrumenty pochodne (swapy procentowe) i limity.

## Ryzyko walutowe
> !zapamietaj [[ryzyko-walutowe|Ryzyko walutowe]] to ryzyko poniesienia straty przez bank na skutek **niekorzystnej zmiany kursu walutowego**.

Powstaje, gdy bank ma **otwartą pozycję walutową**: np. więcej aktywów w euro niż pasywów w euro (pozycja długa — traci, gdy euro tanieje) albo odwrotnie (pozycja krótka — traci, gdy euro drożeje).

**Rodzaje transakcji walutowych:**
- **natychmiastowe (spot)** — wymiana walut z dostawą zwykle po 2 dniach roboczych, po bieżącym kursie,
- **terminowe (forward, futures, swapy)** — kurs ustalony dziś, wymiana w przyszłości; służą m.in. do zabezpieczania się przed zmianą kursu.

**Strategie zarządzania ryzykiem walutowym:**
| Strategia | Na czym polega | Plus | Minus |
|---|---|---|---|
| całkowite zabezpieczenie | zamknięcie całej pozycji (np. forward) | brak strat kursowych | koszt zabezpieczenia, brak zysków kursowych |
| rezygnacja z zabezpieczenia | pozycja otwarta | możliwy zysk, brak kosztów | możliwa duża strata |
| kombinacja | zabezpieczenie części pozycji | kompromis | wymaga oceny, jaką część zabezpieczyć |

**Adekwatność kapitałowa.** Kapitał własny banku musi pokryć ewentualne ryzyko walutowe — nadzór wymaga utrzymywania kapitału na otwartą pozycję walutową. To jeden ze sposobów ograniczania tego ryzyka.

## Ryzyko kraju
[[ryzyko-kraju|Ryzyko kraju]] to ryzyko strat z transakcji z podmiotami z danego państwa, wynikające z sytuacji w tym państwie. Nawet uczciwy i wypłacalny kontrahent może nie zapłacić, jeśli coś stanie się w jego kraju.

**Przyczyny:**
- **społeczno-polityczne** — wojna, zamach stanu, rewolucja, nacjonalizacja, sankcje międzynarodowe, protesty,
- **ekonomiczne** — recesja, hiperinflacja, kryzys walutowy, niewypłacalność państwa, brak rezerw walutowych.

**Szczególne postaci ryzyka kraju:**
- **ryzyko konwersji** — władze kraju **ograniczają zamianę** waluty krajowej na inną; dłużnik ma pieniądze, ale nie może kupić waluty, w której ma oddać dług,
- **ryzyko transferu** — na mocy decyzji władz kraju **ograniczony lub zakazany** zostaje transfer należności za granicę.

> !przyklad Po 2022 r. wiele zachodnich banków nie mogło odzyskać pieniędzy od kontrahentów z Rosji — nie dlatego, że ci nie mieli środków, ale z powodu sankcji i rosyjskich ograniczeń w przekazywaniu płatności za granicę. To ryzyko kraju w postaci ryzyka transferu.

Banki oceniają ryzyko kraju m.in. na podstawie **ratingów państw**, wskaźników gospodarczych (dług publiczny, rezerwy walutowe, saldo obrotów bieżących) i oceny politycznej, a ograniczają je **limitami na kraje** i ubezpieczeniem eksportowym.

> !uwaga Ryzyko kraju dotyczy także banków, które same nie działają za granicą — wystarczy, że ich klienci eksportują lub importują. Problemy kontrahenta z zagranicy szybko stają się ryzykiem kredytowym polskiego banku.`,
            ru: `У банка могут быть только честные клиенты и отличная ликвидность, а он всё равно потеряет деньги — потому что изменились процентные ставки, курс валют или ситуация в стране, с которой он работает.

## Процентный риск
> !zapamietaj [[ryzyko-stopy-procentowej|Процентный риск]] — опасность **негативного влияния изменений рыночных процентных ставок** на финансовое положение банка.

**Причины:**
- **несовпадение сроков** — у активов и пассивов разные сроки погашения,
- **переоценка активов, пассивов и внебалансовых позиций** в разное время — ставки по кредитам и депозитам меняются в разные моменты (например, кредит с фиксированной ставкой на 5 лет, а депозиты 3-месячные).

**Риск зависит от:**
- **величины изменения** процентной ставки,
- **объёма сделок**, у которых сроки изменения ставок не синхронизированы,
- **длительности**, на которую заключены сделки.

> !przyklad Банк выдал кредиты на 5 лет под фиксированные 7%, финансируя их 3-месячными вкладами под 4%. Он зарабатывает 3 п.п. маржи. Через год ставки растут, и новые вклады стоят 6%. Банк по-прежнему получает лишь 7% по кредитам, поэтому маржа падает до 1 п.п. Если бы ставки выросли до 8%, банк терял бы на каждом злотом.

**WIBOR и WIRON в контексте риска.** По кредитам с плавающей ставкой (WIBOR + маржа) процентный риск в значительной мере переходит на клиента. Но тогда растёт кредитный риск — при быстром росте ставок платежи могут превысить возможности заёмщиков. Реформа индикаторов (WIBOR → транзакционный индикатор, например [[wiron|WIRON]], а по плану 2025 г. — POLSTR) должна сделать индикатор ближе к реальным сделкам, но сам риск изменения ставок она не устраняет.

Банк управляет этим риском, в частности, через согласование сроков переоценки (анализ разрыва), кредиты с плавающей или периодически фиксированной ставкой, производные инструменты (процентные свопы) и лимиты.

## Валютный риск
> !zapamietaj [[ryzyko-walutowe|Валютный риск]] — риск убытка банка из-за **неблагоприятного изменения валютного курса**.

Он возникает, когда у банка **открытая валютная позиция**: например, активов в евро больше, чем пассивов в евро (длинная позиция — теряет при удешевлении евро), или наоборот (короткая позиция — теряет при удорожании евро).

**Виды валютных сделок:**
- **немедленные (спот)** — обмен валют с поставкой обычно через 2 рабочих дня по текущему курсу,
- **срочные (форвард, фьючерсы, свопы)** — курс фиксируется сегодня, обмен в будущем; служат, в частности, для защиты от изменения курса.

**Стратегии управления валютным риском:**
| Стратегия | В чём суть | Плюс | Минус |
|---|---|---|---|
| полное хеджирование | закрытие всей позиции (например, форвардом) | нет курсовых потерь | стоимость защиты, нет курсовой прибыли |
| отказ от хеджирования | позиция открыта | возможна прибыль, нет расходов | возможен большой убыток |
| комбинация | хеджирование части позиции | компромисс | нужно решить, какую часть хеджировать |

**Достаточность капитала.** Собственный капитал банка должен покрывать возможный валютный риск — надзор требует держать капитал под открытую валютную позицию. Это один из способов ограничить этот риск.

## Страновой риск
[[ryzyko-kraju|Страновой риск]] — риск убытков по сделкам с субъектами определённой страны, вызванный ситуацией в этой стране. Даже честный и платёжеспособный контрагент может не заплатить, если что-то случится в его стране.

**Причины:**
- **социально-политические** — война, переворот, революция, национализация, международные санкции, протесты,
- **экономические** — рецессия, гиперинфляция, валютный кризис, дефолт государства, нехватка валютных резервов.

**Особые формы странового риска:**
- **риск конвертации** — власти страны **ограничивают обмен** национальной валюты на другую; у должника есть деньги, но он не может купить валюту, в которой должен вернуть долг,
- **риск трансфера** — по решению властей страны **ограничивается или запрещается** перевод платежей за границу.

> !przyklad После 2022 г. многие западные банки не могли вернуть деньги от контрагентов из России — не потому, что у тех не было средств, а из-за санкций и российских ограничений на переводы за границу. Это страновой риск в форме риска трансфера.

Банки оценивают страновой риск, в частности, по **рейтингам государств**, экономическим показателям (госдолг, валютные резервы, сальдо текущего счёта) и политической оценке, а ограничивают его **лимитами на страны** и экспортным страхованием.

> !uwaga Страновой риск касается и банков, которые сами не работают за границей, — достаточно, что их клиенты экспортируют или импортируют. Проблемы иностранного контрагента быстро становятся кредитным риском польского банка.`,
          },
          quiz: [
            { q: { pl: "Główną przyczyną ryzyka stopy procentowej jest:", ru: "Главная причина процентного риска:" },
              a: [{ pl: "phishing", ru: "фишинг" }, { pl: "niedopasowanie terminów przeszacowania aktywów i pasywów", ru: "несовпадение сроков переоценки активов и пассивов" }, { pl: "wysoka liczba oddziałów", ru: "большое число отделений" }, { pl: "brak gwarancji BFG", ru: "отсутствие гарантий BFG" }],
              correct: 1, why: { pl: "Gdy oprocentowanie aktywów i pasywów zmienia się w różnym czasie, zmiana stóp uderza w marżę.", ru: "Когда ставки по активам и пассивам меняются в разное время, изменение ставок бьёт по марже." } },
            { q: { pl: "Bank ma więcej aktywów niż pasywów w euro. Kiedy traci?", ru: "У банка активов в евро больше, чем пассивов. Когда он теряет?" },
              a: [{ pl: "Gdy euro drożeje", ru: "Когда евро дорожает" }, { pl: "Gdy stopy NBP spadają", ru: "Когда ставки NBP падают" }, { pl: "Gdy euro tanieje", ru: "Когда евро дешевеет" }, { pl: "Nigdy", ru: "Никогда" }],
              correct: 2, why: { pl: "Pozycja długa w euro traci na spadku kursu euro.", ru: "Длинная позиция в евро теряет при падении курса евро." } },
            { q: { pl: "Władze kraju zakazują przekazywania płatności za granicę. To ryzyko:", ru: "Власти страны запрещают переводить платежи за границу. Это риск:" },
              a: [{ pl: "transferu", ru: "трансфера" }, { pl: "konwersji", ru: "конвертации" }, { pl: "operacyjne", ru: "операционный" }, { pl: "płynności", ru: "ликвидности" }],
              correct: 0, why: { pl: "Ryzyko transferu = ograniczenie lub zakaz przekazania należności za granicę.", ru: "Риск трансфера = ограничение или запрет перевода требований за границу." } },
            { q: { pl: "Zamknięcie całej pozycji walutowej kontraktem forward to strategia:", ru: "Закрытие всей валютной позиции форвардом — это стратегия:" },
              a: [{ pl: "rezygnacji z zabezpieczenia", ru: "отказа от хеджирования" }, { pl: "kombinacji", ru: "комбинации" }, { pl: "spekulacji", ru: "спекуляции" }, { pl: "całkowitego zabezpieczenia", ru: "полного хеджирования" }],
              correct: 3, why: { pl: "Pełne zabezpieczenie usuwa ryzyko kursowe, ale też możliwość zysku i kosztuje.", ru: "Полное хеджирование устраняет курсовой риск, но и возможность прибыли, и стоит денег." } },
            { q: { pl: "Wojna i zamach stanu to przyczyny ryzyka kraju:", ru: "Война и переворот — причины странового риска:" },
              a: [{ pl: "ekonomiczne", ru: "экономические" }, { pl: "społeczno-polityczne", ru: "социально-политические" }, { pl: "techniczne", ru: "технические" }, { pl: "demograficzne", ru: "демографические" }],
              correct: 1, why: { pl: "Wykład dzieli przyczyny na społeczno-polityczne i ekonomiczne.", ru: "Лекция делит причины на социально-политические и экономические." } },
            { q: { pl: "Ryzyko stopy procentowej rośnie, gdy:", ru: "Процентный риск растёт, когда:" },
              a: [{ pl: "zmiany stóp są małe", ru: "изменения ставок малы" }, { pl: "transakcje są krótkie i zsynchronizowane", ru: "сделки короткие и синхронизированы" }, { pl: "zmiany stóp są duże, a niezsynchronizowane transakcje — duże i długie", ru: "изменения ставок велики, а несинхронизированные сделки — крупные и длинные" }, { pl: "bank nie ma żadnych kredytów", ru: "у банка нет кредитов" }],
              correct: 2, why: { pl: "Ryzyko zależy od skali zmian stóp, wielkości i długości niedopasowanych transakcji.", ru: "Риск зависит от величины изменения ставок, объёма и срока несогласованных сделок." } },
          ],
        },
        // ------------------------------------------------------------------ 5.6
        {
          id: "5.6",
          title: { pl: "Ryzyko operacyjne, cyberprzestępczość i pranie pieniędzy", ru: "Операционный риск, киберпреступность и отмывание денег" },
          src: "Podstawy bankowości, slajdy 171–175",
          body: {
            pl: `Nie wszystkie straty banku wynikają z rynku czy złych kredytów. Pracownik może się pomylić, system — zawiesić, a oszust — ukraść dane klienta. To świat [[ryzyko-operacyjne|ryzyka operacyjnego]].

## Czym jest ryzyko operacyjne
Ryzyko operacyjne to ryzyko straty wynikającej z **niewłaściwych lub zawodnych procesów wewnętrznych, ludzi i systemów** albo ze **zdarzeń zewnętrznych**. Wykład wskazuje dwa główne źródła:
- **ludzie** — błędy, brak wiedzy, nieuczciwość,
- **technika** — awarie systemów, luki bezpieczeństwa, przerwy w dostawie prądu czy internetu.

Od Bazylei II banki muszą utrzymywać kapitał także na ryzyko operacyjne.

## Kategorie strat operacyjnych
| Kategoria | Przykład |
|---|---|
| **oszustwo wewnętrzne** | pracownik wyprowadza pieniądze z kont klientów |
| **oszustwo zewnętrzne** | przestępca wyłudza kredyt na cudzy dowód, kradnie dane |
| **kadra i bezpieczeństwo pracy** | dyskryminacja, wypadki, spory z pracownikami |
| **klienci i produkty** | sprzedaż produktu niedopasowanego do klienta (misselling), naruszenie przepisów konsumenckich |
| **zakłócenie działalności i błędy systemów** | awaria bankowości mobilnej na kilka godzin |
| **dokonywanie transakcji** (wykonanie i zarządzanie procesami) | pomyłka przy księgowaniu, przelew na zły rachunek |

> !uwaga Bazylejska klasyfikacja ma siedem kategorii — oprócz powyższych wymienia też **szkody w aktywach rzeczowych** (np. pożar, powódź, zniszczenie oddziału).

## Cyberprzestępczość
Wraz z cyfryzacją rośnie rola [[cyberprzestepczosc|cyberprzestępczości]]. Typowe przypadki według wykładu:
- **rozpowszechnianie wirusów** i złośliwego oprogramowania (np. przejmującego telefon),
- **nielegalne pobieranie plików**,
- **phishing** — fałszywy e-mail lub strona „banku” wyłudzająca login i hasło,
- **spamming** — masowe wysyłanie niechcianych wiadomości, często z linkami do oszustw,
- **vishing** (voice phishing) — telefon od „pracownika banku” lub „policjanta”, który nakłania do przelewu lub instalacji aplikacji,
- **smishing** (SMS phishing) — SMS o „niedopłacie za przesyłkę” z linkiem do fałszywej bramki płatności,
- **pharming** — przekierowanie na fałszywą stronę mimo wpisania poprawnego adresu (np. przez zainfekowany router),
- **kradzież danych osobowych** — i wykorzystanie ich np. do wzięcia kredytu na cudze nazwisko.

> !przyklad Pani Ewa dostaje SMS: „Twoja paczka czeka, dopłać 1,99 zł” z linkiem. Strona wygląda jak bramka płatności jej banku. Wpisuje login, hasło i kod z SMS-a. Po kilku minutach z jej konta znika 8 000 zł. To smishing połączony z phishingiem. Bank nigdy nie prosi o podanie danych logowania przez link z SMS-a.

> !zapamietaj Złota zasada bezpieczeństwa: **bank nigdy nie prosi** przez telefon, SMS ani e-mail o pełne hasło, kod BLIK, kod autoryzacyjny ani o instalację aplikacji do zdalnego pulpitu. Jeśli ktoś o to prosi — to oszust.

## Defraudacje
Defraudacje (oszustwa finansowe) mogą być popełniane przez:
- **pracowników** — np. przywłaszczenie gotówki, fikcyjne kredyty,
- **pracowników w zmowie z osobami trzecimi** — np. pracownik przekazuje dane klientów grupie przestępczej, zatwierdza kredyty na podstawione osoby,
- **osoby trzecie** — wyłudzenia kredytów, fałszywe dokumenty, oszustwa kartowe.

Banki bronią się przez zasadę „dwóch par oczu” (ważne operacje zatwierdzają dwie osoby), rozdzielenie obowiązków, rotację stanowisk, kontrolę wewnętrzną, monitoring transakcji i systemy wykrywania nadużyć. Klient może się też chronić, zastrzegając PESEL w rejestrze zastrzeżeń numerów PESEL — wtedy trudniej wziąć kredyt na jego dane.

## Przestępstwo prania pieniędzy
[[pranie-pieniedzy|Pranie pieniędzy]] to wprowadzanie do legalnego obiegu pieniędzy z przestępstwa (np. handlu narkotykami, korupcji, oszustw podatkowych), tak by ukryć ich źródło. Proces ma trzy etapy:

| Etap | Co się dzieje | Przykład |
|---|---|---|
| **1. Lokowanie** (placement) | „brudna” gotówka trafia do systemu finansowego | wiele małych wpłat na różne konta, poniżej progów zgłoszenia |
| **2. Maskowanie** (layering) | seria transakcji zacierających ślady | przelewy między kontami w różnych krajach, spółki fasadowe, fikcyjne faktury |
| **3. Legitymizacja** (integration) | pieniądze wracają jako pozornie legalne | zakup nieruchomości, „zysk” z działalności firmy |

Banki są **instytucjami obowiązanymi** według ustawy z 1 marca 2018 r. o przeciwdziałaniu praniu pieniędzy oraz finansowaniu terroryzmu. Muszą m.in.:
- **identyfikować i weryfikować klienta** oraz beneficjenta rzeczywistego (zasada „poznaj swojego klienta”, KYC),
- **monitorować transakcje** i stosować wzmożone środki przy podwyższonym ryzyku,
- przy transakcjach o równowartości co najmniej **15 000 euro** stosować szczególne środki bezpieczeństwa,
- **zgłaszać podejrzane transakcje** do Generalnego Inspektora Informacji Finansowej (**GIIF**),
- szkolić pracowników i przechowywać dokumentację.

> !uwaga Dzielenie wpłat na drobne kwoty, żeby „zmieścić się” pod progiem (tzw. smurfing), samo w sobie jest sygnałem ostrzegawczym, który systemy banku wychwytują.`,
            ru: `Не все убытки банка возникают из-за рынка или плохих кредитов. Сотрудник может ошибиться, система — зависнуть, а мошенник — украсть данные клиента. Это мир [[ryzyko-operacyjne|операционного риска]].

## Что такое операционный риск
Операционный риск — риск убытка из-за **неправильных или ненадёжных внутренних процессов, людей и систем** либо **внешних событий**. Лекция указывает два главных источника:
- **люди** — ошибки, нехватка знаний, нечестность,
- **техника** — сбои систем, уязвимости, перебои с электричеством или интернетом.

С Базеля II банки обязаны держать капитал и под операционный риск.

## Категории операционных убытков
| Категория | Пример |
|---|---|
| **внутреннее мошенничество** | сотрудник выводит деньги со счетов клиентов |
| **внешнее мошенничество** | преступник получает кредит по чужому паспорту, крадёт данные |
| **кадры и безопасность труда** | дискриминация, несчастные случаи, трудовые споры |
| **клиенты и продукты** | продажа продукта, не подходящего клиенту (misselling), нарушение прав потребителей |
| **сбои в деятельности и ошибки систем** | отказ мобильного банкинга на несколько часов |
| **исполнение операций** (и управление процессами) | ошибка при проводке, перевод не на тот счёт |

> !uwaga Базельская классификация насчитывает семь категорий — кроме перечисленных, в ней есть **ущерб материальным активам** (например, пожар, наводнение, разрушение отделения).

## Киберпреступность
С цифровизацией растёт роль [[cyberprzestepczosc|киберпреступности]]. Типичные случаи по лекции:
- **распространение вирусов** и вредоносных программ (например, перехватывающих телефон),
- **незаконное скачивание файлов**,
- **фишинг** — поддельное письмо или сайт «банка», выманивающий логин и пароль,
- **спам** — массовая рассылка нежелательных сообщений, часто со ссылками на мошенничество,
- **вишинг** (голосовой фишинг) — звонок от «сотрудника банка» или «полицейского», который склоняет к переводу или установке приложения,
- **смишинг** (SMS-фишинг) — SMS о «доплате за посылку» со ссылкой на поддельную платёжную страницу,
- **фарминг** — перенаправление на поддельный сайт даже при вводе правильного адреса (например, через заражённый роутер),
- **кража персональных данных** — и их использование, например, для получения кредита на чужое имя.

> !przyklad Пани Эва получает SMS: «Ваша посылка ждёт, доплатите 1,99 злотых» со ссылкой. Страница выглядит как платёжный шлюз её банка. Она вводит логин, пароль и код из SMS. Через несколько минут с её счёта исчезают 8 000 злотых. Это смишинг в сочетании с фишингом. Банк никогда не просит вводить данные для входа по ссылке из SMS.

> !zapamietaj Золотое правило безопасности: **банк никогда не просит** по телефону, SMS или e-mail полный пароль, код BLIK, код подтверждения или установку программы удалённого доступа. Если кто-то об этом просит — это мошенник.

## Растраты (defraudacje)
Финансовое мошенничество могут совершать:
- **сотрудники** — например, присвоение наличных, фиктивные кредиты,
- **сотрудники в сговоре с третьими лицами** — например, сотрудник передаёт данные клиентов преступной группе, одобряет кредиты на подставных лиц,
- **третьи лица** — получение кредитов обманом, поддельные документы, карточное мошенничество.

Банки защищаются принципом «двух пар глаз» (важные операции утверждают два человека), разделением обязанностей, ротацией должностей, внутренним контролем, мониторингом операций и системами выявления злоупотреблений. Клиент тоже может защититься, заблокировав свой номер PESEL в реестре блокировок (rejestr zastrzeżeń numerów PESEL), — тогда труднее взять кредит на его данные.

## Отмывание денег
[[pranie-pieniedzy|Отмывание денег]] — введение в легальный оборот денег, полученных преступным путём (например, от торговли наркотиками, коррупции, налогового мошенничества), с сокрытием их происхождения. Процесс состоит из трёх этапов:

| Этап | Что происходит | Пример |
|---|---|---|
| **1. Размещение** (placement) | «грязные» наличные попадают в финансовую систему | много мелких взносов на разные счета ниже порогов отчётности |
| **2. Маскировка** (layering) | серия операций, запутывающих следы | переводы между счетами в разных странах, фирмы-однодневки, фиктивные счета-фактуры |
| **3. Легитимизация** (integration) | деньги возвращаются как внешне законные | покупка недвижимости, «прибыль» от деятельности фирмы |

Банки — **обязанные учреждения** по закону от 1 марта 2018 г. о противодействии отмыванию денег и финансированию терроризма. Они должны, в частности:
- **идентифицировать и проверять клиента** и конечного бенефициара (принцип «знай своего клиента», KYC),
- **отслеживать операции** и применять усиленные меры при повышенном риске,
- при операциях на сумму, эквивалентную не менее **15 000 евро**, применять особые меры безопасности,
- **сообщать о подозрительных операциях** Генеральному инспектору финансовой информации (**GIIF**),
- обучать сотрудников и хранить документацию.

> !uwaga Дробление взносов на мелкие суммы, чтобы «уложиться» под порог (так называемый смёрфинг), уже само по себе — тревожный сигнал, который системы банка улавливают.`,
          },
          quiz: [
            { q: { pl: "Dwa główne źródła ryzyka operacyjnego według wykładu to:", ru: "Два главных источника операционного риска по лекции:" },
              a: [{ pl: "stopy procentowe i kursy", ru: "процентные ставки и курсы" }, { pl: "ludzie i technika", ru: "люди и техника" }, { pl: "inflacja i bezrobocie", ru: "инфляция и безработица" }, { pl: "depozyty i kredyty", ru: "депозиты и кредиты" }],
              correct: 1, why: { pl: "Ryzyko operacyjne wynika z błędów ludzi, procesów i systemów oraz zdarzeń zewnętrznych.", ru: "Операционный риск возникает из ошибок людей, процессов и систем, а также внешних событий." } },
            { q: { pl: "Fałszywy SMS z linkiem do „dopłaty za paczkę” to:", ru: "Поддельный SMS со ссылкой на «доплату за посылку» — это:" },
              a: [{ pl: "pharming", ru: "фарминг" }, { pl: "vishing", ru: "вишинг" }, { pl: "smishing", ru: "смишинг" }, { pl: "spamming legalny", ru: "легальный спам" }],
              correct: 2, why: { pl: "Smishing = phishing przez SMS; vishing = przez telefon; pharming = przekierowanie na fałszywą stronę.", ru: "Смишинг = фишинг через SMS; вишинг = по телефону; фарминг = перенаправление на поддельный сайт." } },
            { q: { pl: "Pierwszy etap prania pieniędzy to:", ru: "Первый этап отмывания денег:" },
              a: [{ pl: "lokowanie", ru: "размещение" }, { pl: "maskowanie", ru: "маскировка" }, { pl: "legitymizacja", ru: "легитимизация" }, { pl: "konwersja", ru: "конвертация" }],
              correct: 0, why: { pl: "Kolejność: lokowanie → maskowanie → legitymizacja.", ru: "Порядок: размещение → маскировка → легитимизация." } },
            { q: { pl: "Do kogo bank zgłasza podejrzane transakcje związane z praniem pieniędzy?", ru: "Кому банк сообщает о подозрительных операциях, связанных с отмыванием денег?" },
              a: [{ pl: "Do BFG", ru: "В BFG" }, { pl: "Do RPP", ru: "В RPP" }, { pl: "Do KIR", ru: "В KIR" }, { pl: "Do GIIF", ru: "В GIIF" }],
              correct: 3, why: { pl: "Generalny Inspektor Informacji Finansowej to polska jednostka analityki finansowej.", ru: "Генеральный инспектор финансовой информации — польское подразделение финансовой разведки." } },
            { q: { pl: "Pracownik banku przekazuje dane klientów grupie przestępczej. To defraudacja popełniona przez:", ru: "Сотрудник банка передаёт данные клиентов преступной группе. Это мошенничество, совершённое:" },
              a: [{ pl: "wyłącznie osoby trzecie", ru: "только третьими лицами" }, { pl: "wyłącznie system IT", ru: "только ИТ-системой" }, { pl: "pracownika w zmowie z osobami trzecimi", ru: "сотрудником в сговоре с третьими лицами" }, { pl: "klienta", ru: "клиентом" }],
              correct: 2, why: { pl: "Wykład wyróżnia: pracowników, pracowników + osoby trzecie, osoby trzecie.", ru: "Лекция выделяет: сотрудников, сотрудников + третьих лиц, третьих лиц." } },
          ],
        },
      ],
      final: [
        { q: { pl: "Ryzyko dla banku oznacza m.in.:", ru: "Риск для банка означает, в частности:" },
          a: [{ pl: "wzrost liczby klientów", ru: "рост числа клиентов" }, { pl: "zmniejszenie zysków, utratę płynności i kapitału", ru: "снижение прибыли, потерю ликвидности и капитала" }, { pl: "obniżkę podatków", ru: "снижение налогов" }, { pl: "wyższy rating", ru: "более высокий рейтинг" }],
          correct: 1, why: { pl: "Skrajnym skutkiem ryzyka jest bankructwo.", ru: "Крайнее последствие риска — банкротство." } },
        { q: { pl: "Apetyt na ryzyko to:", ru: "Аппетит к риску — это:" },
          a: [{ pl: "poziom ryzyka, który bank świadomie akceptuje dla realizacji strategii", ru: "уровень риска, который банк сознательно принимает ради стратегии" }, { pl: "chęć klientów do zaciągania kredytów", ru: "желание клиентов брать кредиты" }, { pl: "kara nakładana przez KNF", ru: "штраф KNF" }, { pl: "rodzaj kredytu konsumpcyjnego", ru: "вид потребительского кредита" }],
          correct: 0, why: { pl: "Bez ryzyka nie ma zysku, ale musi ono mieścić się w możliwościach kapitałowych.", ru: "Без риска нет прибыли, но он должен вписываться в капитальные возможности." } },
        { q: { pl: "Bank może być wypłacalny, ale niepłynny, gdy:", ru: "Банк может быть платёжеспособным, но неликвидным, когда:" },
          a: [{ pl: "ma ujemny kapitał", ru: "у него отрицательный капитал" }, { pl: "nie ma żadnych aktywów", ru: "у него нет активов" }, { pl: "ma dobre aktywa, ale zamrożone w długich kredytach", ru: "у него хорошие активы, но заморожены в долгих кредитах" }, { pl: "ma za dużo gotówki", ru: "у него слишком много наличных" }],
          correct: 2, why: { pl: "Wypłacalność to nadwyżka aktywów, płynność — gotówka teraz.", ru: "Платёжеспособность — превышение активов, ликвидность — деньги сейчас." } },
        { q: { pl: "Reguła przesunięć (shiftability) zakłada, że płynność zależy od:", ru: "Правило перемещения (shiftability) предполагает, что ликвидность зависит от:" },
          a: [{ pl: "liczby pracowników", ru: "числа сотрудников" }, { pl: "ścisłego dopasowania terminów", ru: "строгого совпадения сроков" }, { pl: "wysokości marży", ru: "размера маржи" }, { pl: "możliwości szybkiej sprzedaży lub zastawienia aktywów", ru: "возможности быстро продать или заложить активы" }],
          correct: 3, why: { pl: "Złota reguła wymaga dopasowania terminów; reguła przesunięć — zbywalności aktywów.", ru: "Золотое правило требует совпадения сроков; правило перемещения — обращаемости активов." } },
        { q: { pl: "Default oznacza:", ru: "Дефолт (default) означает:" },
          a: [{ pl: "zaprzestanie spłaty przez kredytobiorcę", ru: "прекращение платежей заёмщиком" }, { pl: "domyślne ustawienia konta", ru: "настройки счёта по умолчанию" }, { pl: "wcześniejszą spłatę", ru: "досрочное погашение" }, { pl: "podwyżkę stóp", ru: "повышение ставок" }],
          correct: 0, why: { pl: "Niewypłacalność = zaprzestanie spłaty = default.", ru: "Неплатёжеспособность = прекращение платежей = дефолт." } },
        { q: { pl: "Wskaźnik płynności bieżącej to:", ru: "Коэффициент текущей ликвидности — это:" },
          a: [{ pl: "zysk netto / kapitał własny", ru: "чистая прибыль / собственный капитал" }, { pl: "zobowiązania / aktywa", ru: "обязательства / активы" }, { pl: "aktywa obrotowe / zobowiązania krótkoterminowe", ru: "оборотные активы / краткосрочные обязательства" }, { pl: "sprzedaż / zapasy", ru: "выручка / запасы" }],
          correct: 2, why: { pl: "ROE to zysk/kapitał, wskaźnik zadłużenia to zobowiązania/aktywa.", ru: "ROE — прибыль/капитал, коэффициент задолженности — обязательства/активы." } },
        { q: { pl: "Firma ma w modelu Altmana Z = 1,2. Według oryginalnych progów jest:", ru: "У фирмы в модели Альтмана Z = 1,2. По исходным порогам она:" },
          a: [{ pl: "w strefie bezpiecznej", ru: "в безопасной зоне" }, { pl: "w szarej strefie", ru: "в серой зоне" }, { pl: "poza modelem", ru: "вне модели" }, { pl: "zagrożona upadłością", ru: "под угрозой банкротства" }],
          correct: 3, why: { pl: "Poniżej ok. 1,81 — wysokie zagrożenie; powyżej ok. 2,99 — bezpiecznie.", ru: "Ниже примерно 1,81 — высокая угроза; выше примерно 2,99 — безопасно." } },
        { q: { pl: "Kaucja jako zabezpieczenie kredytu polega na tym, że:", ru: "Денежный залог (kaucja) как обеспечение кредита означает, что:" },
          a: [{ pl: "klient przekazuje bankowi pieniądze, zwracane po spłacie", ru: "клиент передаёт банку деньги, возвращаемые после погашения" }, { pl: "osoba trzecia ręczy za dług", ru: "третье лицо ручается за долг" }, { pl: "bank wpisuje się do księgi wieczystej", ru: "банк вносится в поземельную книгу" }, { pl: "klient podpisuje weksel in blanco", ru: "клиент подписывает бланковый вексель" }],
          correct: 0, why: { pl: "Kaucja to zabezpieczenie rzeczowe w pieniądzu.", ru: "Kaucja — вещное обеспечение деньгами." } },
        { q: { pl: "Monitoring kredytowy obejmuje analizę sytuacji:", ru: "Кредитный мониторинг включает анализ ситуации:" },
          a: [{ pl: "tylko w dniu udzielenia kredytu", ru: "только в день выдачи кредита" }, { pl: "makroekonomicznej, w branży i w przedsiębiorstwie", ru: "макроэкономической, в отрасли и на предприятии" }, { pl: "wyłącznie poręczyciela", ru: "только поручителя" }, { pl: "tylko innych banków", ru: "только других банков" }],
          correct: 1, why: { pl: "Monitoring to analiza po udzieleniu kredytu na trzech poziomach.", ru: "Мониторинг — анализ после выдачи кредита на трёх уровнях." } },
        { q: { pl: "Kredyt ze stałą stopą finansowany krótkimi depozytami naraża bank na ryzyko:", ru: "Кредит с фиксированной ставкой, финансируемый короткими депозитами, подвергает банк риску:" },
          a: [{ pl: "operacyjne", ru: "операционному" }, { pl: "kraju", ru: "страновому" }, { pl: "stopy procentowej", ru: "процентному" }, { pl: "prania pieniędzy", ru: "отмывания денег" }],
          correct: 2, why: { pl: "Gdy stopy wzrosną, koszt depozytów rośnie, a przychód z kredytu nie.", ru: "Если ставки вырастут, стоимость депозитов растёт, а доход по кредиту — нет." } },
        { q: { pl: "Ryzyko konwersji to sytuacja, gdy:", ru: "Риск конвертации — ситуация, когда:" },
          a: [{ pl: "klient zmienia bank", ru: "клиент меняет банк" }, { pl: "bank zamienia kredyt na akcje", ru: "банк превращает кредит в акции" }, { pl: "spada kurs akcji", ru: "падает курс акций" }, { pl: "władze kraju ograniczają wymianę waluty krajowej na inną", ru: "власти страны ограничивают обмен национальной валюты на другую" }],
          correct: 3, why: { pl: "Dłużnik ma pieniądze, ale nie może ich wymienić na walutę długu.", ru: "У должника есть деньги, но он не может обменять их на валюту долга." } },
        { q: { pl: "Telefon od fałszywego „konsultanta banku” nakłaniający do przelewu to:", ru: "Звонок от поддельного «консультанта банка», склоняющий к переводу, — это:" },
          a: [{ pl: "vishing", ru: "вишинг" }, { pl: "pharming", ru: "фарминг" }, { pl: "smishing", ru: "смишинг" }, { pl: "legitymizacja", ru: "легитимизация" }],
          correct: 0, why: { pl: "Vishing = voice phishing, oszustwo przez rozmowę telefoniczną.", ru: "Вишинг = голосовой фишинг, мошенничество по телефону." } },
        { q: { pl: "Przelewy między kontami w wielu krajach i spółki fasadowe to etap prania pieniędzy:", ru: "Переводы между счетами во многих странах и подставные фирмы — этап отмывания денег:" },
          a: [{ pl: "lokowania", ru: "размещения" }, { pl: "maskowania", ru: "маскировки" }, { pl: "legitymizacji", ru: "легитимизации" }, { pl: "identyfikacji", ru: "идентификации" }],
          correct: 1, why: { pl: "Maskowanie (layering) zaciera ślady pochodzenia pieniędzy.", ru: "Маскировка (layering) запутывает следы происхождения денег." } },
      ],
    },
  ],
});
