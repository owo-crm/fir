// Treść kursu: wykłady → podtematy (artykuły).
// Składnia artykułu: "## nagłówek", "### podnagłówek", akapity, "- lista", "1. lista",
// "> !zapamietaj|przyklad|uwaga tekst", "$$ wzór | podpis", "| tabela |", "{{chart:id}}",
// pojęcia: [[id]] lub [[id|tekst]] (id z glossary.js), **pogrubienie**.
window.COURSE = {
  name: "Makro",
  university: "WSB Gdańsk",
  lecturer: "dr Elżbieta Kwella",
  examDate: "2027-01-28",

  program: [
    { n: 2, pl: "Ruch okrężny i rachunek PKB", ru: "Кругооборот и расчёт ВВП" },
    { n: 3, pl: "Trend i cykle koniunkturalne", ru: "Тренд и экономические циклы" },
    { n: 4, pl: "Cykle koniunkturalne w USA i w Polsce", ru: "Экономические циклы в США и Польше" },
    { n: 5, pl: "Model klasyczny i keynesowski", ru: "Классическая и кейнсианская модели" },
    { n: 6, pl: "Budżet państwa i polityka fiskalna", ru: "Госбюджет и фискальная политика" },
    { n: 7, pl: "Pieniądz i banki", ru: "Деньги и банки" },
    { n: 8, pl: "Bank centralny i polityka pieniężna", ru: "Центробанк и денежная политика" },
    { n: 9, pl: "Model IS-LM", ru: "Модель IS-LM" },
    { n: 10, pl: "Rynek pracy i bezrobocie", ru: "Рынок труда и безработица" },
    { n: 11, pl: "Inflacja", ru: "Инфляция" },
    { n: 12, pl: "Wzrost i rozwój gospodarczy", ru: "Экономический рост и развитие" },
  ],

  lectures: [
    {
      n: 1,
      color: "--c1",
      title: { pl: "Czym jest makroekonomia?", ru: "Что такое макроэкономика?" },
      lead: {
        pl: "Wprowadzenie do kursu: czym zajmuje się ekonomia, jak działa rynek, czym jest PKB, skąd biorą się bezrobocie i inflacja oraz jak na gospodarkę patrzą klasycy i Keynes.",
        ru: "Введение в курс: чем занимается экономика, как работает рынок, что такое ВВП, откуда берутся безработица и инфляция и как на экономику смотрят классики и Кейнс.",
      },
      subs: [
        // ------------------------------------------------------------------ 1.1
        {
          id: "1.1",
          title: { pl: "Ekonomia i makroekonomia", ru: "Экономика и макроэкономика" },
          body: {
            pl: `Zanim zaczniemy liczyć PKB i rysować wykresy, warto wiedzieć, po co w ogóle istnieje [[ekonomia]] i czym różni się patrzenie „z bliska” od patrzenia „z lotu ptaka”.

## Dlaczego istnieje ekonomia
Ludzie chcą więcej, niż da się wyprodukować. Czasu, pracy, ziemi i maszyn jest ograniczona ilość. Tę sytuację nazywamy [[rzadkosc|rzadkością]]. Skoro nie można mieć wszystkiego, trzeba wybierać, a ekonomia jest nauką o tych wyborach.

Każde społeczeństwo musi odpowiedzieć na trzy pytania:
1. **Co produkować?** Więcej szpitali czy więcej dróg? Smartfony czy rowery?
2. **Jak produkować?** Ręcznie czy maszynami? Z węgla czy z wiatru?
3. **Dla kogo?** Kto ile dostanie z tego, co wyprodukowano?

## Mikro i makro
Ekonomia dzieli się na dwie części, które patrzą na ten sam świat z różnej odległości.

| | Mikroekonomia | Makroekonomia |
|---|---|---|
| Patrzy na | jednego konsumenta, firmę, rynek | całą gospodarkę kraju |
| Typowe pytanie | Ile kosztuje laptop i dlaczego? | Dlaczego ceny wszystkiego rosną? |
| Główne pojęcia | popyt, podaż, cena | PKB, bezrobocie, inflacja |

[[mikroekonomia|Mikroekonomia]] bada pojedyncze decyzje. [[makroekonomia|Makroekonomia]] sumuje je dla całego kraju i pyta, dlaczego cała gospodarka czasem przyspiesza, a czasem zwalnia.

> !zapamietaj Makroekonomia sprowadza się do jednego pytania: **jak szybko powinna działać gospodarka?** Tak szybko, żeby wszyscy chętni mieli pracę, ale nie tak szybko, żeby ceny zaczęły gwałtownie rosnąć.

## Trzy sposoby podejmowania decyzji
Na pytania „co, jak, dla kogo” można odpowiadać na trzy sposoby:
- **Tradycja i obyczaj.** Robimy tak, jak robili rodzice. Tak działały dawne wioski.
- **Proces polityczny.** Decyduje rząd, np. ile szkół zbudować.
- **Proces rynkowy.** Decydują miliony ludzi, kupując i sprzedając, a sygnałem są ceny.

Prawdziwe gospodarki łączą te sposoby. To połączenie nazywamy [[system-ekonomiczny|systemem ekonomicznym]]:
- **Kapitalizm amerykański:** głównie rynek, wspierany przez politykę.
- **Socjalizm:** głównie decyzje polityczne, z elementami rynku.
- **Socjalizm demokratyczny UE (socjokapitalizm):** rynek plus silna rola państwa, np. w ochronie zdrowia. Tak działa Polska.
- **Komunizm:** tylko decyzje polityczne.

> !przyklad Cena chleba w Polsce wynika z rynku. Ale to, że szkoła jest bezpłatna, a apteka nie może sprzedawać leków bez recepty, to decyzje polityczne. Obie metody działają jednocześnie.

## Dlaczego menedżer musi znać makro
Firma może być świetnie zarządzana, a i tak stracić, gdy zmieni się otoczenie: [[stopa-referencyjna|stopy procentowe]] pójdą w górę, kurs złotego się zmieni albo nadejdzie [[recesja]]. Dlatego ten kurs zaczyna się od pytania, jak działa gospodarka jako całość.`,
            ru: `Прежде чем считать ВВП и рисовать графики, разберёмся, зачем вообще существует [[ekonomia|экономическая наука]] и чем взгляд «вблизи» отличается от взгляда «с высоты».

## Зачем нужна экономика
Люди хотят больше, чем можно произвести. Времени, труда, земли и оборудования ограниченное количество. Это называется [[rzadkosc|ограниченностью ресурсов]]. Раз нельзя иметь всё, приходится выбирать, а экономика — наука об этом выборе.

Каждое общество отвечает на три вопроса:
1. **Что производить?** Больше больниц или больше дорог? Смартфоны или велосипеды?
2. **Как производить?** Вручную или машинами? На угле или на ветре?
3. **Для кого?** Кто сколько получит из произведённого?

## Микро и макро
Экономика делится на две части, которые смотрят на один мир с разного расстояния.

| | Микроэкономика | Макроэкономика |
|---|---|---|
| Смотрит на | одного потребителя, фирму, рынок | всю экономику страны |
| Типичный вопрос | Сколько стоит ноутбук и почему? | Почему дорожает всё сразу? |
| Главные понятия | спрос, предложение, цена | ВВП, безработица, инфляция |

[[mikroekonomia|Микроэкономика]] изучает отдельные решения. [[makroekonomia|Макроэкономика]] суммирует их по всей стране и спрашивает, почему экономика то ускоряется, то замедляется.

> !zapamietaj Макроэкономика сводится к одному вопросу: **насколько быстро должна работать экономика?** Так быстро, чтобы у всех желающих была работа, но не настолько, чтобы цены начали резко расти.

## Три способа принимать решения
На вопросы «что, как, для кого» можно отвечать тремя способами:
- **Традиция и обычай.** Делаем так, как делали родители. Так жили старые деревни.
- **Политический процесс.** Решает правительство, например сколько строить школ.
- **Рыночный процесс.** Решают миллионы людей, покупая и продавая, а сигналом служат цены.

Реальные экономики сочетают эти способы. Такое сочетание называется [[system-ekonomiczny|экономической системой]]:
- **Американский капитализм:** в основном рынок при поддержке политики.
- **Социализм:** в основном политические решения с элементами рынка.
- **Демократический социализм ЕС (социокапитализм):** рынок плюс сильная роль государства, например в здравоохранении. Так устроена Польша.
- **Коммунизм:** только политические решения.

> !przyklad Цена хлеба в Польше определяется рынком. А то, что школа бесплатная и аптека не продаёт лекарства без рецепта, — политические решения. Оба способа работают одновременно.

## Зачем менеджеру макроэкономика
Фирма может быть отлично управляемой и всё равно потерять деньги, если изменится окружение: вырастут [[stopa-referencyjna|процентные ставки]], изменится курс злотого или начнётся [[recesja|рецессия]]. Поэтому курс начинается с того, как работает экономика в целом.`,
          },
          quiz: [
            { q: { pl: "Dlaczego w ogóle istnieje ekonomia?", ru: "Почему вообще существует экономическая наука?" },
              a: [{ pl: "Bo zasoby są ograniczone, a potrzeby nie", ru: "Потому что ресурсы ограничены, а потребности нет" }, { pl: "Bo istnieją pieniądze", ru: "Потому что существуют деньги" }, { pl: "Bo państwo pobiera podatki", ru: "Потому что государство собирает налоги" }],
              correct: 0, why: { pl: "To problem rzadkości: trzeba wybierać, co, jak i dla kogo produkować.", ru: "Это проблема ограниченности: нужно выбирать, что, как и для кого производить." } },
            { q: { pl: "Które pytanie jest typowe dla makroekonomii?", ru: "Какой вопрос типичен для макроэкономики?" },
              a: [{ pl: "Ile kawy sprzeda kawiarnia przy cenie 12 zł?", ru: "Сколько кофе продаст кафе по цене 12 злотых?" }, { pl: "Dlaczego w Polsce wzrosło bezrobocie?", ru: "Почему в Польше выросла безработица?" }, { pl: "Jak rodzina dzieli swój budżet?", ru: "Как семья распределяет бюджет?" }],
              correct: 1, why: { pl: "Bezrobocie w całym kraju to wielkość zagregowana, czyli temat makro.", ru: "Безработица по всей стране — агрегированная величина, то есть тема макро." } },
            { q: { pl: "Socjokapitalizm (model UE) to połączenie:", ru: "Социокапитализм (модель ЕС) — это сочетание:" },
              a: [{ pl: "tradycji i rynku", ru: "традиции и рынка" }, { pl: "rynku i silnej roli państwa", ru: "рынка и сильной роли государства" }, { pl: "wyłącznie decyzji politycznych", ru: "только политических решений" }],
              correct: 1, why: { pl: "Rynek decyduje o większości cen, a państwo zapewnia m.in. edukację i ochronę zdrowia.", ru: "Рынок определяет большинство цен, а государство обеспечивает образование, здравоохранение и др." } },
          ],
        },
        // ------------------------------------------------------------------ 1.2
        {
          id: "1.2",
          title: { pl: "Rynek, popyt i podaż", ru: "Рынок, спрос и предложение" },
          body: {
            pl: `Makroekonomia korzysta z narzędzi mikroekonomii. Najważniejsze z nich to popyt, podaż i cena równowagi. Bez nich trudno zrozumieć wykres AD–AS.

## Czym jest rynek
[[rynek|Rynek]] to każde miejsce lub mechanizm, gdzie spotykają się kupujący i sprzedający: sklep, Allegro, giełda. Na rynku ustala się cena.

## Popyt
[[popyt|Popyt]] to nie to, co ludzie kupili, tylko to, co **chcieliby i mogliby kupić** przy różnych cenach. Dobrze opisuje go zdanie „ile ludzie kupiliby, gdyby cena wynosiła…”.

[[prawo-popytu|Prawo popytu]] mówi: im niższa cena, tym więcej ludzie chcą kupić. Dzieje się tak z dwóch powodów:
- **Efekt substytucji.** Gdy coś drożeje, zastępujemy to czymś tańszym.
- **Efekt dochodowy.** Gdy coś drożeje, za tę samą pensję stać nas na mniej.

> !przyklad Na wykładzie: popyt Polaków na komputery opisuje wzór Q₁ = 10 − P (cena w tys. zł, ilość w tys. sztuk rocznie). Przy cenie 3 tys. zł ludzie chcą kupić 7 tys. komputerów, przy cenie 8 tys. zł tylko 2 tys.

## Ruch po krzywej czy przesunięcie krzywej?
To najczęstszy błąd na egzaminie.
- **Zmienia się cena samego dobra** → poruszamy się **wzdłuż** krzywej popytu. Popyt się nie zmienia, zmienia się tylko kupowana ilość.
- **Zmienia się coś innego** → **cała krzywa** przesuwa się w prawo (więcej przy każdej cenie) lub w lewo.

Krzywą popytu w prawo przesuwa:
- wzrost dochodów,
- moda, zmiana gustów,
- wzrost ceny [[substytut|substytutu]] (np. drożeją laptopy, więc rośnie popyt na komputery stacjonarne),
- spadek ceny [[dobro-komplementarne|dobra komplementarnego]] (np. tanieje oprogramowanie).

> !uwaga „Komputery potaniały, więc wzrósł popyt na komputery” to błąd. Wzrosła **wielkość popytu** (ruch po krzywej). Sam popyt, czyli cała krzywa, się nie zmienił.

## Podaż
[[podaz|Podaż]] to ilość, którą sprzedawcy **chcą zaoferować** przy różnych cenach. [[prawo-podazy|Prawo podaży]]: im wyższa cena, tym więcej producenci chcą sprzedać, bo rośnie ich zysk. Na wykładzie: Q₂ = P.

Krzywą podaży w prawo (więcej przy każdej cenie) przesuwa:
- nowa, tańsza technologia,
- spadek cen surowców i płac,
- niższe podatki.

## Równowaga rynkowa
[[cena-rownowagi|Cena równowagi]] to cena, przy której kupujący chcą kupić dokładnie tyle, ile sprzedający chcą sprzedać.

$$ Q₁ = Q₂  →  10 − P = P  →  P = 5, Q = 5 | Równowaga na rynku komputerów z wykładu: 5 tys. zł i 5 tys. sztuk rocznie

- Jeśli cena jest **wyższa** (np. 7), chętnych do kupna jest 3, a towaru 7. Powstaje [[nadwyzka|nadwyżka]] i cena spada.
- Jeśli cena jest **niższa** (np. 3), chętnych jest 7, a towaru 3. Powstaje [[niedobor|niedobór]] i cena rośnie.

{{chart:ds}}

## Jak rynek sam się dostosowuje
Wykład pokazuje sekwencję zdarzeń, którą warto znać na pamięć:
1. Rośnie popyt (krzywa D w prawo).
2. Przy starej cenie brakuje towaru, więc cena rośnie.
3. Wysoka cena daje duże zyski i przyciąga nowych producentów.
4. Rośnie podaż (krzywa S w prawo), cena wraca do „normalnej”, a sprzedaje się więcej.

To właśnie [[niewidzialna-reka|niewidzialna ręka rynku]] Adama Smitha: nikt tego nie planuje, a zasoby trafiają tam, gdzie chcą ich konsumenci.

> !zapamietaj Popyt podbija cenę, a wysoka cena w długim okresie zwiększa podaż.`,
            ru: `Макроэкономика пользуется инструментами микроэкономики. Главные из них — спрос, предложение и равновесная цена. Без них трудно понять график AD–AS.

## Что такое рынок
[[rynek|Рынок]] — любое место или механизм, где встречаются покупатели и продавцы: магазин, Allegro, биржа. На рынке устанавливается цена.

## Спрос
[[popyt|Спрос]] — это не то, что люди купили, а то, что они **хотели бы и могли бы купить** при разных ценах. Его хорошо описывает фраза «сколько купили бы люди, если бы цена была…».

[[prawo-popytu|Закон спроса]]: чем ниже цена, тем больше люди хотят купить. Причин две:
- **Эффект замещения.** Когда что-то дорожает, мы заменяем это более дешёвым.
- **Эффект дохода.** Когда что-то дорожает, на ту же зарплату можно купить меньше.

> !przyklad На лекции спрос поляков на компьютеры описывает формула Q₁ = 10 − P (цена в тыс. злотых, количество в тыс. штук в год). При цене 3 тыс. люди хотят купить 7 тыс. компьютеров, при цене 8 тыс. — только 2 тыс.

## Движение по кривой или сдвиг кривой?
Это самая частая ошибка на экзамене.
- **Меняется цена самого товара** → движемся **вдоль** кривой спроса. Спрос не меняется, меняется только покупаемое количество.
- **Меняется что-то другое** → **вся кривая** сдвигается вправо (больше при каждой цене) или влево.

Кривую спроса вправо сдвигают:
- рост доходов,
- мода, изменение вкусов,
- рост цены [[substytut|товара-заменителя]] (дорожают ноутбуки — растёт спрос на настольные компьютеры),
- снижение цены [[dobro-komplementarne|дополняющего товара]] (дешевеют программы).

> !uwaga «Компьютеры подешевели, поэтому вырос спрос на компьютеры» — ошибка. Выросла **величина спроса** (движение по кривой). Сам спрос, то есть вся кривая, не изменился.

## Предложение
[[podaz|Предложение]] — количество, которое продавцы **хотят предложить** при разных ценах. [[prawo-podazy|Закон предложения]]: чем выше цена, тем больше производители хотят продать, потому что растёт прибыль. На лекции: Q₂ = P.

Кривую предложения вправо (больше при каждой цене) сдвигают:
- новая, более дешёвая технология,
- снижение цен на сырьё и зарплат,
- снижение налогов.

## Рыночное равновесие
[[cena-rownowagi|Равновесная цена]] — цена, при которой покупатели хотят купить ровно столько, сколько продавцы хотят продать.

$$ Q₁ = Q₂  →  10 − P = P  →  P = 5, Q = 5 | Равновесие на рынке компьютеров из лекции: 5 тыс. злотых и 5 тыс. штук в год

- Если цена **выше** (например, 7), желающих купить 3, а товара 7. Возникает [[nadwyzka|избыток]], и цена падает.
- Если цена **ниже** (например, 3), желающих 7, а товара 3. Возникает [[niedobor|дефицит]], и цена растёт.

{{chart:ds}}

## Как рынок подстраивается сам
Лекция показывает последовательность событий, которую стоит знать наизусть:
1. Растёт спрос (кривая D вправо).
2. При старой цене товара не хватает, и цена растёт.
3. Высокая цена даёт большую прибыль и привлекает новых производителей.
4. Растёт предложение (кривая S вправо), цена возвращается к «нормальной», а продаётся больше.

Это и есть [[niewidzialna-reka|невидимая рука рынка]] Адама Смита: никто этого не планирует, а ресурсы попадают туда, где их хотят потребители.

> !zapamietaj Спрос поднимает цену, а высокая цена в долгосрочном периоде увеличивает предложение.`,
          },
          quiz: [
            { q: { pl: "Komputery potaniały. Co się stało?", ru: "Компьютеры подешевели. Что произошло?" },
              a: [{ pl: "Krzywa popytu przesunęła się w prawo", ru: "Кривая спроса сдвинулась вправо" }, { pl: "Nastąpił ruch wzdłuż krzywej popytu", ru: "Произошло движение вдоль кривой спроса" }, { pl: "Krzywa podaży przesunęła się w lewo", ru: "Кривая предложения сдвинулась влево" }],
              correct: 1, why: { pl: "Zmiana ceny samego dobra to ruch po krzywej, nie przesunięcie krzywej.", ru: "Изменение цены самого товара — движение по кривой, а не сдвиг." } },
            { q: { pl: "Laptopy podrożały. Co dzieje się z popytem na komputery stacjonarne?", ru: "Ноутбуки подорожали. Что происходит со спросом на настольные компьютеры?" },
              a: [{ pl: "Rośnie (krzywa w prawo)", ru: "Растёт (кривая вправо)" }, { pl: "Spada (krzywa w lewo)", ru: "Падает (кривая влево)" }, { pl: "Nie zmienia się", ru: "Не меняется" }],
              correct: 0, why: { pl: "Laptop jest substytutem. Gdy substytut drożeje, popyt na nasze dobro rośnie.", ru: "Ноутбук — заменитель. Когда заменитель дорожает, спрос на наш товар растёт." } },
            { q: { pl: "Popyt: Q₁ = 10 − P, podaż: Q₂ = P. Jaka jest cena równowagi?", ru: "Спрос: Q₁ = 10 − P, предложение: Q₂ = P. Какова равновесная цена?" },
              a: [{ pl: "3", ru: "3" }, { pl: "5", ru: "5" }, { pl: "7", ru: "7" }],
              correct: 1, why: { pl: "10 − P = P, więc P = 5 i Q = 5.", ru: "10 − P = P, значит P = 5 и Q = 5." } },
            { q: { pl: "Cena jest wyższa od ceny równowagi. Na rynku pojawia się:", ru: "Цена выше равновесной. На рынке возникает:" },
              a: [{ pl: "niedobór i cena rośnie", ru: "дефицит, и цена растёт" }, { pl: "nadwyżka i cena spada", ru: "избыток, и цена падает" }, { pl: "równowaga", ru: "равновесие" }],
              correct: 1, why: { pl: "Przy wysokiej cenie sprzedający oferują więcej, niż kupujący chcą kupić.", ru: "При высокой цене продавцы предлагают больше, чем покупатели хотят купить." } },
          ],
        },
        // ------------------------------------------------------------------ 1.3
        {
          id: "1.3",
          title: { pl: "PKB: jak mierzymy gospodarkę", ru: "ВВП: как измеряют экономику" },
          body: {
            pl: `Żeby powiedzieć, czy gospodarce idzie dobrze, trzeba ją zmierzyć. Najważniejszą miarą jest [[pkb|PKB]]. Ten temat rozwiniemy na wykładzie 2, ale podstawy są potrzebne już teraz.

## Co to jest PKB
**Produkt krajowy brutto** to wartość wszystkich [[dobra-finalne|dóbr i usług finalnych]] wytworzonych w kraju w ciągu roku.

Rozłóżmy tę definicję na części:
- **Wartość** – sumujemy złotówki, bo nie da się dodać jabłek do fryzjera.
- **Finalnych** – liczymy tylko to, co trafia do ostatecznego użytkownika.
- **W kraju** – liczy się miejsce produkcji. Fabryka Toyoty w Wałbrzychu tworzy polski PKB.
- **W ciągu roku** – PKB to strumień, jak pensja miesięczna, a nie stan, jak oszczędności.

> !przyklad Rolnik sprzedaje zboże młynowi za 1 zł, młyn sprzedaje mąkę piekarni za 3 zł, piekarnia sprzedaje chleb za 6 zł. Do PKB wliczamy tylko **6 zł**. Gdybyśmy dodali 1 + 3 + 6, policzylibyśmy zboże trzy razy.

## Z czego składa się PKB
PKB można policzyć, sumując, kto kupił wytworzone dobra. To metoda wydatkowa:

$$ PKB = C + I + G + (X − M) | Konsumpcja + inwestycje + zakupy rządowe + eksport netto

| Litera | Nazwa | Kto wydaje | Przykład |
|---|---|---|---|
| C | [[konsumpcja|Konsumpcja]] | gospodarstwa domowe | jedzenie, ubrania, Netflix |
| I | [[inwestycje|Inwestycje]] | firmy | nowa maszyna, magazyn, mieszkania |
| G | [[wydatki-rzadowe|Wydatki rządowe]] | państwo i samorządy | drogi, szkoły, pensje nauczycieli |
| X − M | [[eksport-netto|Eksport netto]] | zagranica minus my | Polska sprzedaje meble, kupuje ropę |

> !uwaga Emerytury, zasiłki i 800+ **nie** są częścią G. Państwo za nie niczego nie kupuje, tylko przekazuje pieniądze. Zostaną policzone dopiero wtedy, gdy ktoś za nie coś kupi (jako C).

Ten sam wzór opisuje [[ad|zagregowany popyt]], który poznamy w podtemacie 1.5. To nie przypadek: PKB to wszystko, co zostało kupione.

## Nominalny i realny
Wyobraź sobie, że w ciągu roku wyprodukowano dokładnie tyle samo, ale wszystko podrożało o 10%. PKB w złotówkach wzrośnie o 10%, choć gospodarka niczego więcej nie wytworzyła.

- [[pkb-nominalny|PKB nominalny]] liczymy w cenach z danego roku.
- [[pkb-realny|PKB realny]] liczymy w stałych cenach, więc pokazuje prawdziwy wzrost produkcji.

> !zapamietaj Gdy słyszysz „PKB Polski wzrósł o 3%”, chodzi o PKB realny, czyli już bez inflacji.

## PKB na mieszkańca
Chiny mają ogromny PKB, ale dzielą go na 1,4 mld ludzi. Dlatego do porównywania poziomu życia używa się [[pkb-per-capita|PKB per capita]], czyli PKB podzielonego przez liczbę mieszkańców.

## Czy PKB mierzy szczęście?
Nie do końca. PKB nie uwzględnia pracy w domu, wolontariatu, czasu wolnego ani zanieczyszczenia środowiska. Mimo to jest najlepszą pojedynczą miarą tego, jak szybko działa gospodarka. Gdy PKB spada, rośnie bezrobocie, a to już realny problem ludzi.`,
            ru: `Чтобы сказать, хорошо ли идут дела в экономике, её нужно измерить. Главный показатель — [[pkb|ВВП]] (по-польски PKB). Подробно тему разберём на лекции 2, но основы нужны уже сейчас.

## Что такое ВВП
**Валовой внутренний продукт** — стоимость всех [[dobra-finalne|конечных товаров и услуг]], произведённых в стране за год.

Разберём определение по частям:
- **Стоимость** — складываем злотые, потому что яблоки и стрижку напрямую не сложить.
- **Конечных** — считаем только то, что попадает к конечному пользователю.
- **В стране** — важно место производства. Завод Toyota в Валбжихе создаёт польский ВВП.
- **За год** — ВВП это поток, как месячная зарплата, а не запас, как сбережения.

> !przyklad Фермер продаёт зерно мельнице за 1 злотый, мельница продаёт муку пекарне за 3, пекарня продаёт хлеб за 6. В ВВП включаем только **6 злотых**. Если сложить 1 + 3 + 6, зерно будет посчитано трижды.

## Из чего состоит ВВП
ВВП можно посчитать, сложив, кто купил произведённые товары. Это метод расходов:

$$ ВВП = C + I + G + (X − M) | Потребление + инвестиции + госзакупки + чистый экспорт

| Буква | Название | Кто тратит | Пример |
|---|---|---|---|
| C | [[konsumpcja|Потребление]] | домохозяйства | еда, одежда, Netflix |
| I | [[inwestycje|Инвестиции]] | фирмы | новый станок, склад, жильё |
| G | [[wydatki-rzadowe|Госрасходы]] | государство и самоуправления | дороги, школы, зарплаты учителей |
| X − M | [[eksport-netto|Чистый экспорт]] | заграница минус мы | Польша продаёт мебель, покупает нефть |

> !uwaga Пенсии, пособия и 800+ **не** входят в G. Государство ничего за них не покупает, а лишь передаёт деньги. Они попадут в ВВП, только когда на них что-то купят (как C).

Та же формула описывает [[ad|совокупный спрос]], который мы разберём в подтеме 1.5. Это не случайно: ВВП — это всё, что было куплено.

## Номинальный и реальный
Представь, что за год произвели ровно столько же, но всё подорожало на 10%. ВВП в злотых вырастет на 10%, хотя экономика ничего больше не создала.

- [[pkb-nominalny|Номинальный ВВП]] считают в ценах данного года.
- [[pkb-realny|Реальный ВВП]] считают в постоянных ценах, поэтому он показывает настоящий рост производства.

> !zapamietaj Когда говорят «ВВП Польши вырос на 3%», речь о реальном ВВП, то есть уже без инфляции.

## ВВП на душу населения
У Китая огромный ВВП, но он делится на 1,4 млрд человек. Поэтому для сравнения уровня жизни используют [[pkb-per-capita|ВВП на душу населения]] — ВВП, делённый на число жителей.

## Измеряет ли ВВП счастье?
Не совсем. ВВП не учитывает домашний труд, волонтёрство, свободное время и загрязнение среды. Но это лучший отдельный показатель того, насколько быстро работает экономика. Когда ВВП падает, растёт безработица, а это уже реальная проблема людей.`,
          },
          quiz: [
            { q: { pl: "Piekarnia kupuje mąkę za 3 zł i sprzedaje chleb za 6 zł. Ile wnosi to do PKB?", ru: "Пекарня покупает муку за 3 злотых и продаёт хлеб за 6. Сколько это добавляет к ВВП?" },
              a: [{ pl: "3 zł", ru: "3 злотых" }, { pl: "6 zł", ru: "6 злотых" }, { pl: "9 zł", ru: "9 злотых" }],
              correct: 1, why: { pl: "Liczymy tylko dobro finalne, czyli chleb. Mąka jest już w jego cenie.", ru: "Считаем только конечный товар — хлеб. Мука уже входит в его цену." } },
            { q: { pl: "Który wydatek NIE należy do G (wydatków rządowych)?", ru: "Какой расход НЕ входит в G (госрасходы)?" },
              a: [{ pl: "Budowa autostrady", ru: "Строительство автострады" }, { pl: "Pensje nauczycieli", ru: "Зарплаты учителей" }, { pl: "Wypłata emerytur", ru: "Выплата пенсий" }],
              correct: 2, why: { pl: "Emerytury to transfery: państwo niczego za nie nie kupuje.", ru: "Пенсии — трансферты: государство ничего за них не покупает." } },
            { q: { pl: "Ceny wzrosły o 10%, produkcja się nie zmieniła. Co się stało z PKB realnym?", ru: "Цены выросли на 10%, производство не изменилось. Что с реальным ВВП?" },
              a: [{ pl: "Wzrósł o 10%", ru: "Вырос на 10%" }, { pl: "Nie zmienił się", ru: "Не изменился" }, { pl: "Spadł o 10%", ru: "Упал на 10%" }],
              correct: 1, why: { pl: "PKB realny liczy się w stałych cenach, więc pokazuje tylko zmianę produkcji. Wzrósł PKB nominalny.", ru: "Реальный ВВП считается в постоянных ценах и показывает только изменение производства. Вырос номинальный ВВП." } },
            { q: { pl: "Co oznacza M we wzorze PKB = C + I + G + (X − M)?", ru: "Что означает M в формуле ВВП = C + I + G + (X − M)?" },
              a: [{ pl: "Ilość pieniądza", ru: "Количество денег" }, { pl: "Import", ru: "Импорт" }, { pl: "Mnożnik", ru: "Мультипликатор" }],
              correct: 1, why: { pl: "Import odejmujemy, bo te dobra wytworzono za granicą.", ru: "Импорт вычитаем, потому что эти товары произведены за рубежом." } },
          ],
        },
        // ------------------------------------------------------------------ 1.4
        {
          id: "1.4",
          title: { pl: "Bezrobocie i inflacja", ru: "Безработица и инфляция" },
          body: {
            pl: `Makroekonomia ma dwa główne problemy. Oba wynikają z tego, że gospodarka działa w złym tempie: za wolno albo za szybko.

## Bezrobocie: gospodarka jedzie za wolno
[[bezrobocie|Bezrobotny]] to ktoś, kto chce pracować, akceptuje obecne płace, szuka pracy i jej nie znajduje. Student, który nie szuka pracy, nie jest bezrobotny, bo nie należy do [[sila-robocza|siły roboczej]].

$$ u = bezrobotni / siła robocza × 100% | Stopa bezrobocia

Gdy ludzie, firmy i państwo kupują za mało, w sklepach i magazynach zostaje towar. Firmy ograniczają produkcję i zwalniają ludzi. To [[bezrobocie-cykliczne|bezrobocie cykliczne]].

Wykład podaje 7 cech gospodarki, w której głównym problemem jest bezrobocie:
1. System gospodarczy działa **zbyt wolno**.
2. Występują **nadwyżki** towarów (AD < AS).
3. Wydatki są **zbyt małe**.
4. Producenci nie produkują.
5. Ludzie nie kupują.
6. Moce wytwórcze i ludzie są **niewykorzystani**.
7. Faza cyklu: **recesja** lub depresja.

> !zapamietaj Klucz do wysokiej produkcji i zatrudnienia: utrzymać łączne wydatki na odpowiednio wysokim poziomie.

Nie każde bezrobocie jest problemem. Zawsze ktoś zmienia pracę ([[bezrobocie-frykcyjne|bezrobocie frykcyjne]]). Takie [[bezrobocie-naturalne|bezrobocie naturalne]] istnieje nawet przy „pełnym zatrudnieniu”.

{{chart:unemployment}}

## Inflacja: gospodarka jedzie za szybko
[[inflacja|Inflacja]] to trwały wzrost ogólnego poziomu cen. Mierzy się ją wskaźnikiem [[cpi|CPI]]: GUS co miesiąc sprawdza ceny koszyka typowych zakupów.

Gdy wszystkie fabryki i ludzie już pracują, a ludzie wciąż chcą kupować więcej, produkcji nie da się zwiększyć. Rosną więc ceny.

9 cech gospodarki, w której głównym problemem jest inflacja:
1. System gospodarczy działa **zbyt szybko**.
2. Występują **niedobory** (AD > AS).
3. Wydatki są **zbyt duże**.
4. Firmy próbują kupić więcej zasobów, niż ich jest.
5. Konsumenci próbują kupić więcej, niż jest towarów.
6. Wszystkie zasoby są **w pełni wykorzystane**.
7. Bieżący PKB jest **powyżej** potencjalnego.
8. Faza cyklu: rozkwit, **boom**, przegrzanie.
9. Ceny **rosną**.

> !przyklad W 2022 r. inflacja w Polsce wyniosła 14,4%. Koszyk zakupów za 100 zł kosztował po roku ok. 114 zł. W latach 2015–2016 ceny spadały, czyli była [[deflacja]].

{{chart:inflation}}

## Kto pilnuje cen w Polsce
[[nbp|Narodowy Bank Polski]] ma [[cel-inflacyjny|cel inflacyjny]] 2,5% z odchyleniem ± 1 punkt procentowy. O tym, jak go osiągnąć, decyduje [[rpp|Rada Polityki Pieniężnej]], ustalając [[stopa-referencyjna|stopę referencyjną]].

| Stopa NBP (od 9.10.2025) | Wysokość |
|---|---|
| referencyjna | 4,50% |
| lombardowa | 5,00% |
| depozytowa | 4,00% |

Gdy inflacja jest za wysoka, RPP podnosi stopy: kredyty drożeją, ludzie mniej wydają i ceny rosną wolniej. Tak było w latach 2021–2022, gdy stopa wzrosła z 0,10% do 6,75%.

## Złoty środek
Idealna gospodarka działa **tak szybko, żeby wszyscy chętni mieli pracę, i nie szybciej**. Wtedy produkuje na poziomie [[produkcja-potencjalna|produkcji potencjalnej]], a inflacja jest blisko celu.`,
            ru: `У макроэкономики две главные проблемы. Обе возникают, когда экономика работает в неправильном темпе: слишком медленно или слишком быстро.

## Безработица: экономика едет слишком медленно
[[bezrobocie|Безработный]] — тот, кто хочет работать, согласен на текущие зарплаты, ищет работу и не находит её. Студент, который не ищет работу, не безработный, потому что не входит в [[sila-robocza|рабочую силу]].

$$ u = безработные / рабочая сила × 100% | Уровень безработицы

Когда люди, фирмы и государство покупают слишком мало, товар остаётся в магазинах и на складах. Фирмы сокращают производство и увольняют людей. Это [[bezrobocie-cykliczne|циклическая безработица]].

Лекция называет 7 признаков экономики, где главная проблема — безработица:
1. Экономика работает **слишком медленно**.
2. Есть **избыток** товаров (AD < AS).
3. Расходов **слишком мало**.
4. Производители не производят.
5. Люди не покупают.
6. Мощности и люди **не задействованы**.
7. Фаза цикла: **рецессия** или депрессия.

> !zapamietaj Ключ к высокому выпуску и занятости: поддерживать совокупные расходы на достаточно высоком уровне.

Не всякая безработица — проблема. Кто-то всегда меняет работу ([[bezrobocie-frykcyjne|фрикционная безработица]]). Такая [[bezrobocie-naturalne|естественная безработица]] есть даже при «полной занятости».

{{chart:unemployment}}

## Инфляция: экономика едет слишком быстро
[[inflacja|Инфляция]] — устойчивый рост общего уровня цен. Её измеряют индексом [[cpi|CPI]]: GUS каждый месяц проверяет цены корзины типичных покупок.

Когда все заводы и люди уже работают, а люди хотят покупать ещё больше, производство увеличить нельзя. Поэтому растут цены.

9 признаков экономики, где главная проблема — инфляция:
1. Экономика работает **слишком быстро**.
2. Есть **дефицит** (AD > AS).
3. Расходов **слишком много**.
4. Фирмы пытаются купить больше ресурсов, чем есть.
5. Потребители пытаются купить больше, чем есть товаров.
6. Все ресурсы **задействованы полностью**.
7. Текущий ВВП **выше** потенциального.
8. Фаза цикла: подъём, **бум**, перегрев.
9. Цены **растут**.

> !przyklad В 2022 году инфляция в Польше составила 14,4%. Корзина покупок за 100 злотых через год стоила около 114. В 2015–2016 годах цены падали, то есть была [[deflacja|дефляция]].

{{chart:inflation}}

## Кто следит за ценами в Польше
У [[nbp|Национального банка Польши]] [[cel-inflacyjny|инфляционная цель]] 2,5% с отклонением ± 1 процентный пункт. Как её достичь, решает [[rpp|Совет денежной политики]], устанавливая [[stopa-referencyjna|референсную ставку]].

| Ставка NBP (с 9.10.2025) | Размер |
|---|---|
| референсная | 4,50% |
| ломбардная | 5,00% |
| депозитная | 4,00% |

Когда инфляция слишком высокая, RPP повышает ставки: кредиты дорожают, люди тратят меньше, и цены растут медленнее. Так было в 2021–2022 годах, когда ставка выросла с 0,10% до 6,75%.

## Золотая середина
Идеальная экономика работает **так быстро, чтобы у всех желающих была работа, и не быстрее**. Тогда она производит на уровне [[produkcja-potencjalna|потенциального выпуска]], а инфляция близка к цели.`,
          },
          quiz: [
            { q: { pl: "Student dzienny, który nie szuka pracy, jest:", ru: "Студент дневной формы, который не ищет работу:" },
              a: [{ pl: "bezrobotny", ru: "безработный" }, { pl: "poza siłą roboczą", ru: "вне рабочей силы" }, { pl: "bezrobotny frykcyjnie", ru: "фрикционный безработный" }],
              correct: 1, why: { pl: "Bezrobotny musi aktywnie szukać pracy.", ru: "Безработный должен активно искать работу." } },
            { q: { pl: "Która cecha opisuje gospodarkę z problemem inflacji?", ru: "Какой признак описывает экономику с проблемой инфляции?" },
              a: [{ pl: "Nadwyżki towarów w magazynach", ru: "Избыток товаров на складах" }, { pl: "Bieżący PKB powyżej potencjalnego", ru: "Текущий ВВП выше потенциального" }, { pl: "Niewykorzystane moce wytwórcze", ru: "Незадействованные мощности" }],
              correct: 1, why: { pl: "Przy inflacji zasoby są w pełni wykorzystane, a wydatki za duże.", ru: "При инфляции ресурсы задействованы полностью, а расходов слишком много." } },
            { q: { pl: "Jaki jest cel inflacyjny NBP?", ru: "Какова инфляционная цель NBP?" },
              a: [{ pl: "0%", ru: "0%" }, { pl: "2,5% ± 1 p.p.", ru: "2,5% ± 1 п.п." }, { pl: "5% ± 2 p.p.", ru: "5% ± 2 п.п." }],
              correct: 1, why: { pl: "NBP dąży do 2,5%, dopuszczając odchylenie o 1 punkt procentowy.", ru: "NBP стремится к 2,5%, допуская отклонение на 1 процентный пункт." } },
            { q: { pl: "Inflacja jest za wysoka. Co zwykle robi RPP?", ru: "Инфляция слишком высокая. Что обычно делает RPP?" },
              a: [{ pl: "Obniża stopy procentowe", ru: "Снижает процентные ставки" }, { pl: "Podnosi stopy procentowe", ru: "Повышает процентные ставки" }, { pl: "Podnosi podatki", ru: "Повышает налоги" }],
              correct: 1, why: { pl: "Wyższe stopy oznaczają droższy kredyt i mniejsze wydatki. O podatkach decyduje rząd, nie RPP.", ru: "Более высокие ставки — дороже кредит и меньше расходов. Налоги решает правительство, а не RPP." } },
          ],
        },
        // ------------------------------------------------------------------ 1.5
        {
          id: "1.5",
          title: { pl: "Zagregowany popyt i podaż (AD–AS)", ru: "Совокупный спрос и предложение (AD–AS)" },
          body: {
            pl: `Model AD–AS to najważniejszy wykres tego kursu. To popyt i podaż z podtematu 1.2, tylko dla całej gospodarki naraz.

## Co zmienia się na osiach
Na rynku komputerów na osiach była cena komputera i liczba komputerów. W makro zamieniamy je na:
- **oś pozioma – realny PKB (Y):** ile gospodarka produkuje;
- **oś pionowa – poziom cen (P):** przeciętny poziom wszystkich cen, jak w CPI.

## Strona popytu: AD
[[ad|Zagregowany popyt]] to wszystko, co chcą kupić gospodarstwa domowe, firmy, państwo i zagranica:

$$ AD = C + I + G + (X − M) | Ten sam wzór co PKB z podtematu 1.3

Krzywa AD **opada**: gdy ogólny poziom cen spada, za te same pieniądze można kupić więcej.

Całą krzywą AD przesuwają dwie polityki:
- [[polityka-fiskalna|Polityka fiskalna]] – rząd zmienia wydatki i podatki.
- [[polityka-pieniezna|Polityka pieniężna]] – bank centralny zmienia stopy procentowe i ilość pieniądza.

> !przyklad Rząd buduje nowe drogi (G rośnie) albo NBP obniża stopy i ludzie biorą więcej kredytów (C i I rosną). W obu przypadkach AD przesuwa się w prawo.

## Strona podaży: SAS i LAS
Podaż ma w makro dwie krzywe, bo w krótkim i długim okresie gospodarka zachowuje się inaczej.

[[sas|SAS (krótkookresowa podaż)]] **rośnie**. Płace są ustalone w umowach, więc gdy ceny produktów rosną, firmy zarabiają więcej i zwiększają produkcję.

[[las|LAS (długookresowa podaż)]] jest **pionowa** na poziomie [[produkcja-potencjalna|produkcji potencjalnej Y*]]. W długim okresie płace dogonią ceny, więc ile gospodarka wyprodukuje, zależy tylko od ludzi, maszyn i technologii.

> !zapamietaj Y* to PKB przy pełnym zatrudnieniu: wszystkie moce pracują, jest tylko bezrobocie naturalne.

Krzywe podaży przesuwają: postęp techniczny (w prawo), wzrost płac i cen surowców (SAS w lewo), polityka strukturalna i przemysłowa.

## Równowaga
[[rownowaga-makro|Równowaga makroekonomiczna]] to punkt, w którym wszystko, co wyprodukowano, zostało kupione: **AD = AS**.

- **Równowaga krótkookresowa: AD = SAS.** Może leżeć w lewo od Y* (recesja, bezrobocie) albo w prawo (przegrzanie, inflacja).
- **Równowaga długookresowa: AD = SAS = LAS.** Gospodarka jest w Y*, bez bezrobocia przymusowego.

## Wypróbuj model
Przesuń suwaki i obserwuj, gdzie przecinają się AD i SAS. Pod wykresem zobaczysz, co oznacza ta sytuacja.

{{chart:adas}}

## Co wpływa na AD, a co na AS
| Czynnik | Głównie na |
|---|---|
| Ilość pieniądza w obiegu | AD |
| Dochód osobisty | AD |
| Poziom cen i kosztów | AS |
| Produkcja potencjalna | AS |
| Zasoby kapitału, pracy, technologii | AS |

> !uwaga Zmiana poziomu cen to ruch **po** krzywej AD i SAS. Krzywe przesuwają tylko inne czynniki, tak jak w podtemacie 1.2.`,
            ru: `Модель AD–AS — главный график этого курса. Это спрос и предложение из подтемы 1.2, только для всей экономики сразу.

## Что меняется на осях
На рынке компьютеров на осях были цена компьютера и количество компьютеров. В макро их заменяют:
- **горизонтальная ось — реальный ВВП (Y):** сколько производит экономика;
- **вертикальная ось — уровень цен (P):** средний уровень всех цен, как в CPI.

## Сторона спроса: AD
[[ad|Совокупный спрос]] — всё, что хотят купить домохозяйства, фирмы, государство и заграница:

$$ AD = C + I + G + (X − M) | Та же формула, что у ВВП из подтемы 1.3

Кривая AD **нисходящая**: когда общий уровень цен падает, на те же деньги можно купить больше.

Всю кривую AD сдвигают две политики:
- [[polityka-fiskalna|Фискальная политика]] — правительство меняет расходы и налоги.
- [[polityka-pieniezna|Денежная политика]] — центробанк меняет ставки и количество денег.

> !przyklad Правительство строит дороги (растёт G) или NBP снижает ставки, и люди берут больше кредитов (растут C и I). В обоих случаях AD сдвигается вправо.

## Сторона предложения: SAS и LAS
У предложения в макро две кривые, потому что в краткосрочном и долгосрочном периоде экономика ведёт себя по-разному.

[[sas|SAS (краткосрочное предложение)]] **восходящая**. Зарплаты зафиксированы в договорах, поэтому когда цены продукции растут, фирмы зарабатывают больше и увеличивают выпуск.

[[las|LAS (долгосрочное предложение)]] **вертикальна** на уровне [[produkcja-potencjalna|потенциального выпуска Y*]]. В долгосрочном периоде зарплаты догоняют цены, и объём производства зависит только от людей, оборудования и технологий.

> !zapamietaj Y* — ВВП при полной занятости: все мощности работают, есть только естественная безработица.

Кривые предложения сдвигают: технический прогресс (вправо), рост зарплат и цен на сырьё (SAS влево), структурная и промышленная политика.

## Равновесие
[[rownowaga-makro|Макроэкономическое равновесие]] — точка, где всё произведённое куплено: **AD = AS**.

- **Краткосрочное равновесие: AD = SAS.** Может лежать левее Y* (рецессия, безработица) или правее (перегрев, инфляция).
- **Долгосрочное равновесие: AD = SAS = LAS.** Экономика в Y*, без вынужденной безработицы.

## Попробуй модель
Двигай ползунки и следи, где пересекаются AD и SAS. Под графиком написано, что означает эта ситуация.

{{chart:adas}}

## Что влияет на AD, а что на AS
| Фактор | В основном на |
|---|---|
| Количество денег в обращении | AD |
| Личный доход | AD |
| Уровень цен и издержек | AS |
| Потенциальный выпуск | AS |
| Запасы капитала, труда, технологии | AS |

> !uwaga Изменение уровня цен — движение **по** кривым AD и SAS. Кривые сдвигают только другие факторы, как в подтеме 1.2.`,
          },
          quiz: [
            { q: { pl: "Co jest na osi poziomej wykresu AD–AS?", ru: "Что на горизонтальной оси графика AD–AS?" },
              a: [{ pl: "Poziom cen", ru: "Уровень цен" }, { pl: "Realny PKB", ru: "Реальный ВВП" }, { pl: "Stopa procentowa", ru: "Процентная ставка" }],
              correct: 1, why: { pl: "Pozioma oś to produkcja (Y), pionowa to poziom cen (P).", ru: "Горизонтальная ось — выпуск (Y), вертикальная — уровень цен (P)." } },
            { q: { pl: "Krzywa LAS jest pionowa, ponieważ:", ru: "Кривая LAS вертикальна, потому что:" },
              a: [{ pl: "w długim okresie produkcja zależy od zasobów i technologii, nie od cen", ru: "в долгосрочном периоде выпуск зависит от ресурсов и технологий, а не от цен" }, { pl: "ceny są sztywne", ru: "цены жёсткие" }, { pl: "państwo ustala produkcję", ru: "государство устанавливает выпуск" }],
              correct: 0, why: { pl: "Płace i ceny się dostosowują, więc zostaje tylko Y*.", ru: "Зарплаты и цены подстраиваются, поэтому остаётся только Y*." } },
            { q: { pl: "Rząd zwiększa wydatki na drogi. Co się dzieje?", ru: "Правительство увеличивает расходы на дороги. Что происходит?" },
              a: [{ pl: "AD przesuwa się w prawo", ru: "AD сдвигается вправо" }, { pl: "LAS przesuwa się w lewo", ru: "LAS сдвигается влево" }, { pl: "SAS przesuwa się w prawo", ru: "SAS сдвигается вправо" }],
              correct: 0, why: { pl: "G jest składnikiem AD.", ru: "G — компонент AD." } },
            { q: { pl: "Równowaga długookresowa to:", ru: "Долгосрочное равновесие — это:" },
              a: [{ pl: "AD = SAS w dowolnym punkcie", ru: "AD = SAS в любой точке" }, { pl: "AD = SAS = LAS, czyli PKB = Y*", ru: "AD = SAS = LAS, то есть ВВП = Y*" }, { pl: "AD > AS", ru: "AD > AS" }],
              correct: 1, why: { pl: "Tylko wtedy jest pełne zatrudnienie.", ru: "Только тогда есть полная занятость." } },
            { q: { pl: "Wzrost płac i cen surowców przesuwa:", ru: "Рост зарплат и цен на сырьё сдвигает:" },
              a: [{ pl: "SAS w lewo", ru: "SAS влево" }, { pl: "AD w prawo", ru: "AD вправо" }, { pl: "LAS w prawo", ru: "LAS вправо" }],
              correct: 0, why: { pl: "Wyższe koszty oznaczają, że przy każdym poziomie cen firmy produkują mniej.", ru: "Более высокие издержки означают, что при каждом уровне цен фирмы производят меньше." } },
          ],
        },
        // ------------------------------------------------------------------ 1.6
        {
          id: "1.6",
          title: { pl: "Klasycy kontra Keynes", ru: "Классики против Кейнса" },
          body: {
            pl: `Ekonomiści od stu lat spierają się, czy gospodarka sama wraca do równowagi. Wykład nazywa to **dwusystemowym modelem gospodarki**: czasem lepiej pasuje opis klasyków, a czasem Keynesa.

## Dwie szkoły w skrócie
| | [[szkola-klasyczna|Klasycy]] | [[keynesizm|Keynes]] |
|---|---|---|
| Kto | Adam Smith (1776) | John Maynard Keynes (1936) |
| Okres analizy | długi | krótki |
| Ceny i płace | giętkie | [[sztywne-ceny|sztywne]] |
| Model | AD–LAS | AD–SAS |
| Co ogranicza produkcję | podaż (zasoby) | popyt (wydatki) |
| Rola państwa | mała | aktywna |

## Świat klasyków
Według klasyków ceny i płace reagują od razu. Gdy ludzie kupują za mało, ceny spadają, towar się sprzedaje i gospodarka wraca do Y*. To [[niewidzialna-reka|niewidzialna ręka rynku]].

- AD < AS → ceny spadają (była nadwyżka, [[luka-recesyjna|luka recesyjna]]).
- AD > AS → ceny rosną (był niedobór, [[luka-inflacyjna|luka inflacyjna]]).

> !zapamietaj U klasyków zmiana AD zmienia **tylko ceny**. Produkcja i zatrudnienie zostają w Y*. Polityka antycykliczna w długim okresie nic nie daje.

## Świat Keynesa
Keynes zauważył, że w czasie Wielkiego Kryzysu lat 30. ceny i płace wcale szybko nie spadały, a bezrobocie trwało latami. Gdy ceny są sztywne, spadek popytu obniża **produkcję**, a nie ceny.

W recesji fabryki stoją i ludzie są wolni do pracy. Jeśli więc państwo zwiększy popyt, firmy zwiększą produkcję, a ceny prawie nie wzrosną.

> !zapamietaj U Keynesa w recesji wzrost AD zwiększa **realny PKB i zatrudnienie**. Polityka makroekonomiczna działa w krótkim okresie.

## Dwie luki
{{chart:gaps}}

- [[luka-recesyjna|Luka recesyjna]]: faktyczny PKB jest **na lewo** od Y*. Duże bezrobocie przymusowe, niewykorzystane maszyny.
- [[luka-inflacyjna|Luka inflacyjna]]: faktyczny PKB jest **na prawo** od Y*. Bezrobocie niższe niż naturalne (ale nie zerowe), presja płacowa i inflacyjna.

## Trzy sposoby zamknięcia luki recesyjnej
1. **Spadek płac i cen** → SAS przesuwa się w prawo. Droga rynkowa (klasycy), ale powolna i bolesna.
2. **Wzrost wydatków prywatnych** → AD w prawo. Też rynkowa: ludzie i firmy same zaczynają więcej wydawać.
3. **Aktywna polityka państwa** → AD w prawo: większe wydatki rządowe, niższe podatki, więcej pieniądza (tańszy kredyt). To [[polityka-dyskrecjonalna|polityka dyskrecjonalna]] keynesistów.

## Trzy sposoby zamknięcia luki inflacyjnej
1. **Wzrost płac i cen** → SAS w lewo. Gospodarka wraca do Y*, ale przy wyższych cenach.
2. **Spadek wydatków prywatnych** → AD w lewo.
3. **Polityka restrykcyjna** → AD w lewo: mniejsze wydatki rządowe, wyższe podatki, mniej pieniądza (wyższe stopy).

> !uwaga Dlaczego politycy nie czekają, aż luka inflacyjna sama się zamknie? Bo gospodarka wróci do Y* przy **wyższych płacach i cenach** i będzie mniej konkurencyjna za granicą. Lepiej schłodzić popyt (AD w lewo) i zdusić presję inflacyjną w zarodku.

## Kto ma rację?
Obie szkoły. Klasycy dobrze opisują długi okres, a Keynes krótki, szczególnie recesje. Dlatego na kolejnych wykładach będziemy oglądać gospodarkę z obu punktów widzenia.`,
            ru: `Экономисты уже сто лет спорят, возвращается ли экономика к равновесию сама. Лекция называет это **двухсистемной моделью экономики**: иногда лучше подходит описание классиков, иногда — Кейнса.

## Две школы кратко
| | [[szkola-klasyczna|Классики]] | [[keynesizm|Кейнс]] |
|---|---|---|
| Кто | Адам Смит (1776) | Джон Мейнард Кейнс (1936) |
| Период анализа | долгосрочный | краткосрочный |
| Цены и зарплаты | гибкие | [[sztywne-ceny|жёсткие]] |
| Модель | AD–LAS | AD–SAS |
| Что ограничивает выпуск | предложение (ресурсы) | спрос (расходы) |
| Роль государства | малая | активная |

## Мир классиков
По классикам цены и зарплаты реагируют сразу. Когда люди покупают слишком мало, цены падают, товар продаётся, и экономика возвращается к Y*. Это [[niewidzialna-reka|невидимая рука рынка]].

- AD < AS → цены падают (был избыток, [[luka-recesyjna|рецессионный разрыв]]).
- AD > AS → цены растут (был дефицит, [[luka-inflacyjna|инфляционный разрыв]]).

> !zapamietaj У классиков изменение AD меняет **только цены**. Выпуск и занятость остаются на Y*. Антициклическая политика в долгосрочном периоде ничего не даёт.

## Мир Кейнса
Кейнс заметил, что во время Великой депрессии 1930-х цены и зарплаты быстро не падали, а безработица держалась годами. Когда цены жёсткие, падение спроса снижает **выпуск**, а не цены.

В рецессии заводы простаивают, а люди свободны. Если государство увеличит спрос, фирмы нарастят производство, а цены почти не вырастут.

> !zapamietaj У Кейнса в рецессии рост AD увеличивает **реальный ВВП и занятость**. Макроэкономическая политика работает в краткосрочном периоде.

## Два разрыва
{{chart:gaps}}

- [[luka-recesyjna|Рецессионный разрыв]]: фактический ВВП **левее** Y*. Высокая вынужденная безработица, простаивающее оборудование.
- [[luka-inflacyjna|Инфляционный разрыв]]: фактический ВВП **правее** Y*. Безработица ниже естественной (но не нулевая), давление на зарплаты и цены.

## Три способа закрыть рецессионный разрыв
1. **Снижение зарплат и цен** → SAS сдвигается вправо. Рыночный путь (классики), но медленный и болезненный.
2. **Рост частных расходов** → AD вправо. Тоже рыночный: люди и фирмы сами начинают больше тратить.
3. **Активная политика государства** → AD вправо: больше госрасходов, ниже налоги, больше денег (дешевле кредит). Это [[polityka-dyskrecjonalna|дискреционная политика]] кейнсианцев.

## Три способа закрыть инфляционный разрыв
1. **Рост зарплат и цен** → SAS влево. Экономика возвращается к Y*, но при более высоких ценах.
2. **Снижение частных расходов** → AD влево.
3. **Сдерживающая политика** → AD влево: меньше госрасходов, выше налоги, меньше денег (выше ставки).

> !uwaga Почему политики не ждут, пока инфляционный разрыв закроется сам? Потому что экономика вернётся к Y* при **более высоких зарплатах и ценах** и станет менее конкурентоспособной за рубежом. Лучше охладить спрос (AD влево) и подавить инфляционное давление в зародыше.

## Кто прав?
Обе школы. Классики хорошо описывают долгосрочный период, а Кейнс — краткосрочный, особенно рецессии. Поэтому на следующих лекциях будем смотреть на экономику с обеих точек зрения.`,
          },
          quiz: [
            { q: { pl: "W modelu klasycznym (AD–LAS) wzrost AD powoduje:", ru: "В классической модели (AD–LAS) рост AD вызывает:" },
              a: [{ pl: "wzrost realnego PKB", ru: "рост реального ВВП" }, { pl: "tylko wzrost cen", ru: "только рост цен" }, { pl: "spadek bezrobocia", ru: "снижение безработицы" }],
              correct: 1, why: { pl: "Gospodarka zawsze jest w Y*, więc zmieniają się tylko ceny.", ru: "Экономика всегда на Y*, поэтому меняются только цены." } },
            { q: { pl: "Kluczowe założenie Keynesa w krótkim okresie to:", ru: "Ключевое предположение Кейнса в краткосрочном периоде:" },
              a: [{ pl: "giętkie ceny i płace", ru: "гибкие цены и зарплаты" }, { pl: "sztywne ceny i płace", ru: "жёсткие цены и зарплаты" }, { pl: "brak państwa", ru: "отсутствие государства" }],
              correct: 1, why: { pl: "Przy sztywnych cenach spadek popytu obniża produkcję, a nie ceny.", ru: "При жёстких ценах падение спроса снижает выпуск, а не цены." } },
            { q: { pl: "Keynesowski sposób zamknięcia luki recesyjnej to:", ru: "Кейнсианский способ закрыть рецессионный разрыв:" },
              a: [{ pl: "poczekać, aż spadną płace", ru: "подождать, пока упадут зарплаты" }, { pl: "zwiększyć wydatki rządowe lub obniżyć podatki", ru: "увеличить госрасходы или снизить налоги" }, { pl: "podnieść stopy procentowe", ru: "повысить процентные ставки" }],
              correct: 1, why: { pl: "To przesuwa AD w prawo, w stronę Y*.", ru: "Это сдвигает AD вправо, к Y*." } },
            { q: { pl: "Gospodarka jest w luce inflacyjnej. Bezrobocie jest:", ru: "Экономика в инфляционном разрыве. Безработица:" },
              a: [{ pl: "zerowe", ru: "нулевая" }, { pl: "niższe niż naturalne, ale nie zerowe", ru: "ниже естественной, но не нулевая" }, { pl: "wyższe niż naturalne", ru: "выше естественной" }],
              correct: 1, why: { pl: "Tak odpowiada wykład: pracy jest dużo, ale ktoś zawsze zmienia pracę.", ru: "Так отвечает лекция: работы много, но кто-то всегда меняет работу." } },
          ],
        },
        // ------------------------------------------------------------------ 1.7
        {
          id: "1.7",
          title: { pl: "Podstawowe prawa ekonomii", ru: "Основные законы экономики" },
          body: {
            pl: `Kilka „praw” ekonomii pojawia się na egzaminach co roku. Każde ma autora i krótką myśl, którą trzeba umieć wyjaśnić własnymi słowami.

## Prawa o całej gospodarce
### Prawo Saya (J.B. Say, 1767–1832)
[[prawo-saya|„Podaż tworzy swój własny popyt.”]] Produkując, ludzie zarabiają, a zarobione pieniądze wydają na wytworzone dobra. Dlatego ogólna nadprodukcja jest niemożliwa. To fundament szkoły klasycznej.

### Prawo Keynesa (J.M. Keynes, 1883–1946)
[[prawo-keynesa|„Popyt tworzy swoją własną podaż.”]] W krótkim okresie produkcja zależy od popytu. Przyczyną bezrobocia jest za mały popyt globalny, a nadprodukcja jest możliwa.

> !zapamietaj Say i Keynes to lustrzane odbicia: u Saya decyduje podaż, u Keynesa popyt.

### Prawo Okuna (A. Okun, 1928–1980)
[[prawo-okuna|Każdy punkt procentowy bezrobocia]] powyżej stopy naturalnej obniża PKB o ok. 2,5% (dane dla USA). To miara strat, jakie powoduje bezrobocie.

### Paradoks oszczędności
[[paradoks-oszczednosci|Gdy wszyscy naraz zaczynają oszczędzać]], spada popyt, firmy produkują mniej i zwalniają ludzi. Dochody maleją, więc na końcu wszyscy oszczędzają **mniej** niż na początku. Co jest rozsądne dla jednej rodziny, szkodzi całej gospodarce.

## Wyjątki od prawa popytu
Zwykle wyższa cena oznacza mniejszy popyt. Są dwa słynne wyjątki.

### Efekt Veblena (T. Veblen, 1899)
[[efekt-veblena|Popyt na dobra luksusowe rośnie]], bo rośnie ich cena. Drogi zegarek kupuje się właśnie dlatego, że jest drogi i pokazuje status.

### Paradoks Giffena (R. Giffen, 1837–1910)
[[paradoks-giffena|Przy bardzo niskich dochodach]] podwyżka ceny chleba sprawia, że biedna rodzina kupuje **więcej** chleba. Nie stać jej już na droższe masło i mięso, więc zastępuje je najtańszym produktem.

> !uwaga Veblen dotyczy bogatych i dóbr luksusowych. Giffen dotyczy biednych i tanich dóbr podstawowych. Na egzaminie łatwo je pomylić.

## Inne prawa
| Prawo | Autor | O co chodzi |
|---|---|---|
| [[prawo-engla|Prawo Engla]] | E. Engel (1821–1896) | Gdy dochody rosną, udział wydatków na żywność spada |
| [[prawo-greshama|Prawo Kopernika-Greshama]] | M. Kopernik, T. Gresham | „Gorszy pieniądz wypiera lepszy” |
| [[malejace-przychody|Prawo malejących przychodów]] | – | Każda kolejna jednostka czynnika daje coraz mniejszy przyrost |
| [[prawo-lassallea|Spiżowe prawo płacy]] | F. Lassalle (1825–1864) | Płace spadają do minimum utrzymania (do poł. XIX w.) |

> !przyklad Prawo Engla w praktyce: rodzina z dochodem 4000 zł wydaje na jedzenie 1600 zł (40%). Gdy dochód wzrośnie do 10 000 zł, wyda 2500 zł, czyli więcej złotówek, ale tylko 25% budżetu.

## Prawo popytu i podaży
Na końcu najważniejsze. W warunkach doskonałej konkurencji cena ustala się tam, gdzie ilość, którą ludzie chcą kupić, równa się ilości, którą chcą sprzedać. Szczegóły w podtemacie 1.2.`,
            ru: `Несколько «законов» экономики встречаются на экзаменах каждый год. У каждого есть автор и короткая мысль, которую нужно уметь объяснить своими словами.

## Законы об экономике в целом
### Закон Сэя (Ж.-Б. Сэй, 1767–1832)
[[prawo-saya|«Предложение создаёт собственный спрос».]] Производя, люди зарабатывают, а заработанное тратят на произведённые товары. Поэтому общее перепроизводство невозможно. Это фундамент классической школы.

### Закон Кейнса (Дж. М. Кейнс, 1883–1946)
[[prawo-keynesa|«Спрос создаёт собственное предложение».]] В краткосрочном периоде выпуск зависит от спроса. Причина безработицы — недостаточный совокупный спрос, перепроизводство возможно.

> !zapamietaj Сэй и Кейнс — зеркальные отражения: у Сэя решает предложение, у Кейнса — спрос.

### Закон Оукена (А. Оукен, 1928–1980)
[[prawo-okuna|Каждый процентный пункт безработицы]] сверх естественного уровня снижает ВВП примерно на 2,5% (данные по США). Это мера потерь от безработицы.

### Парадокс бережливости
[[paradoks-oszczednosci|Когда все одновременно начинают сберегать]], падает спрос, фирмы производят меньше и увольняют людей. Доходы снижаются, и в итоге все сберегают **меньше**, чем в начале. Что разумно для одной семьи, вредит всей экономике.

## Исключения из закона спроса
Обычно более высокая цена означает меньший спрос. Есть два известных исключения.

### Эффект Веблена (Т. Веблен, 1899)
[[efekt-veblena|Спрос на предметы роскоши растёт]], потому что растёт их цена. Дорогие часы покупают именно потому, что они дорогие и показывают статус.

### Парадокс Гиффена (Р. Гиффен, 1837–1910)
[[paradoks-giffena|При очень низких доходах]] подорожание хлеба заставляет бедную семью покупать **больше** хлеба. Масло и мясо ей уже не по карману, и она заменяет их самым дешёвым продуктом.

> !uwaga Веблен — богатые и предметы роскоши. Гиффен — бедные и дешёвые базовые товары. На экзамене их легко перепутать.

## Другие законы
| Закон | Автор | Суть |
|---|---|---|
| [[prawo-engla|Закон Энгеля]] | Э. Энгель (1821–1896) | С ростом доходов доля расходов на еду падает |
| [[prawo-greshama|Закон Коперника–Грешема]] | Н. Коперник, Т. Грешем | «Худшие деньги вытесняют лучшие» |
| [[malejace-przychody|Закон убывающей отдачи]] | – | Каждая следующая единица фактора даёт всё меньший прирост |
| [[prawo-lassallea|«Железный закон» зарплаты]] | Ф. Лассаль (1825–1864) | Зарплаты падают до минимума содержания (до сер. XIX в.) |

> !przyklad Закон Энгеля на практике: семья с доходом 4000 злотых тратит на еду 1600 (40%). Когда доход вырастет до 10 000, она потратит 2500 — больше злотых, но только 25% бюджета.

## Закон спроса и предложения
И главное в конце. В условиях совершенной конкуренции цена устанавливается там, где количество, которое хотят купить, равно количеству, которое хотят продать. Подробнее в подтеме 1.2.`,
          },
          quiz: [
            { q: { pl: "„Podaż tworzy swój własny popyt” to prawo:", ru: "«Предложение создаёт собственный спрос» — это закон:" },
              a: [{ pl: "Keynesa", ru: "Кейнса" }, { pl: "Saya", ru: "Сэя" }, { pl: "Okuna", ru: "Оукена" }],
              correct: 1, why: { pl: "Keynes twierdził odwrotnie: popyt tworzy podaż.", ru: "Кейнс утверждал обратное: спрос создаёт предложение." } },
            { q: { pl: "Popyt na luksusową torebkę rośnie po podwyżce jej ceny. To:", ru: "Спрос на люксовую сумку растёт после повышения её цены. Это:" },
              a: [{ pl: "paradoks Giffena", ru: "парадокс Гиффена" }, { pl: "efekt Veblena", ru: "эффект Веблена" }, { pl: "prawo Engla", ru: "закон Энгеля" }],
              correct: 1, why: { pl: "Veblen: dobra luksusowe i prestiż. Giffen: tanie dobra podstawowe u biednych.", ru: "Веблен — роскошь и престиж. Гиффен — дешёвые базовые товары у бедных." } },
            { q: { pl: "Według prawa Okuna 1 p.p. bezrobocia ponad stopę naturalną obniża PKB o ok.:", ru: "По закону Оукена 1 п.п. безработицы сверх естественного уровня снижает ВВП примерно на:" },
              a: [{ pl: "0,5%", ru: "0,5%" }, { pl: "2,5%", ru: "2,5%" }, { pl: "10%", ru: "10%" }],
              correct: 1, why: { pl: "Tak podaje wykład (dane dla USA).", ru: "Так сказано в лекции (данные по США)." } },
            { q: { pl: "Gdy dochody rosną, udział wydatków na żywność w budżecie spada. To prawo:", ru: "Когда доходы растут, доля расходов на еду в бюджете падает. Это закон:" },
              a: [{ pl: "Engla", ru: "Энгеля" }, { pl: "Greshama", ru: "Грешема" }, { pl: "Saya", ru: "Сэя" }],
              correct: 0, why: { pl: "Ernst Engel opisał to w XIX wieku.", ru: "Эрнст Энгель описал это в XIX веке." } },
          ],
        },
      ],
      // Test końcowy wykładu — zaliczenie przy 100%
      final: [
        { q: { pl: "Problem bezrobocia cyklicznego oznacza, że gospodarka działa:", ru: "Проблема циклической безработицы означает, что экономика работает:" },
          a: [{ pl: "zbyt wolno — wydatki są za małe", ru: "слишком медленно — расходов мало" }, { pl: "zbyt szybko — wydatki są za duże", ru: "слишком быстро — расходов слишком много" }, { pl: "z optymalną prędkością", ru: "с оптимальной скоростью" }],
          correct: 0, why: { pl: "Przy bezrobociu wydatki są za małe, powstają nadwyżki i rosną zapasy.", ru: "При безработице расходов мало, возникает избыток товаров и растут запасы." } },
        { q: { pl: "Które pytanie NIE jest jednym z trzech podstawowych problemów ekonomicznych?", ru: "Какой вопрос НЕ входит в три основные экономические проблемы?" },
          a: [{ pl: "Co produkować?", ru: "Что производить?" }, { pl: "Jak produkować?", ru: "Как производить?" }, { pl: "Ile pieniędzy wydrukować?", ru: "Сколько денег напечатать?" }, { pl: "Dla kogo produkować?", ru: "Для кого производить?" }],
          correct: 2, why: { pl: "Trzy problemy to: co, jak i dla kogo produkować.", ru: "Три проблемы: что, как и для кого производить." } },
        { q: { pl: "Spadek ceny komputerów powoduje:", ru: "Снижение цены компьютеров вызывает:" },
          a: [{ pl: "przesunięcie krzywej popytu w prawo", ru: "сдвиг кривой спроса вправо" }, { pl: "ruch wzdłuż krzywej popytu", ru: "движение вдоль кривой спроса" }, { pl: "przesunięcie krzywej podaży w prawo", ru: "сдвиг кривой предложения вправо" }],
          correct: 1, why: { pl: "Zmiana ceny samego dobra to ruch po krzywej.", ru: "Изменение цены самого товара — движение по кривой." } },
        { q: { pl: "Popyt: Q₁ = 10 − P, podaż: Q₂ = P. Cena równowagi wynosi:", ru: "Спрос: Q₁ = 10 − P, предложение: Q₂ = P. Равновесная цена:" },
          a: [{ pl: "3", ru: "3" }, { pl: "5", ru: "5" }, { pl: "7", ru: "7" }, { pl: "10", ru: "10" }],
          correct: 1, why: { pl: "10 − P = P → P = 5, Q = 5.", ru: "10 − P = P → P = 5, Q = 5." } },
        { q: { pl: "Co przesuwa krzywą podaży w prawo?", ru: "Что сдвигает кривую предложения вправо?" },
          a: [{ pl: "Wzrost podatków", ru: "Рост налогов" }, { pl: "Wzrost cen surowców", ru: "Рост цен на сырьё" }, { pl: "Nowe techniki produkcji", ru: "Новые технологии производства" }],
          correct: 2, why: { pl: "Postęp techniczny, tańsze czynniki produkcji i niższe podatki zwiększają podaż.", ru: "Техпрогресс, удешевление факторов и снижение налогов увеличивают предложение." } },
        { q: { pl: "Do PKB wliczamy:", ru: "В ВВП включаются:" },
          a: [{ pl: "wszystkie transakcje w gospodarce", ru: "все сделки в экономике" }, { pl: "tylko dobra i usługi finalne", ru: "только конечные товары и услуги" }, { pl: "tylko dobra eksportowane", ru: "только экспортируемые товары" }],
          correct: 1, why: { pl: "Dobra pośrednie są już w cenie dóbr finalnych.", ru: "Промежуточные товары уже входят в цену конечных." } },
        { q: { pl: "Który element NIE jest składnikiem AD?", ru: "Что НЕ является компонентом AD?" },
          a: [{ pl: "Konsumpcja (C)", ru: "Потребление (C)" }, { pl: "Zakupy rządowe (G)", ru: "Госзакупки (G)" }, { pl: "Produkcja potencjalna (Y*)", ru: "Потенциальный выпуск (Y*)" }, { pl: "Eksport netto (X − M)", ru: "Чистый экспорт (X − M)" }],
          correct: 2, why: { pl: "Y* wyznacza położenie LAS, czyli stronę podaży.", ru: "Y* задаёт положение LAS, то есть сторону предложения." } },
        { q: { pl: "Krzywa LAS jest:", ru: "Кривая LAS:" },
          a: [{ pl: "pionowa na poziomie produkcji potencjalnej", ru: "вертикальна на уровне потенциального выпуска" }, { pl: "pozioma", ru: "горизонтальна" }, { pl: "malejąca", ru: "нисходящая" }],
          correct: 0, why: { pl: "W długim okresie produkcję wyznaczają zasoby i technologia.", ru: "В долгосрочном периоде выпуск определяют ресурсы и технологии." } },
        { q: { pl: "W modelu klasycznym wzrost AD powoduje:", ru: "В классической модели рост AD вызывает:" },
          a: [{ pl: "wzrost realnego PKB", ru: "рост реального ВВП" }, { pl: "tylko wzrost cen", ru: "только рост цен" }, { pl: "spadek bezrobocia", ru: "снижение безработицы" }],
          correct: 1, why: { pl: "Ceny są giętkie, gospodarka jest zawsze przy Y*.", ru: "Цены гибкие, экономика всегда на Y*." } },
        { q: { pl: "Keynesowski model krótkookresowy zakłada:", ru: "Кейнсианская краткосрочная модель предполагает:" },
          a: [{ pl: "giętkie ceny i płace", ru: "гибкие цены и зарплаты" }, { pl: "sztywne ceny i płace", ru: "жёсткие цены и зарплаты" }, { pl: "brak wpływu popytu na produkcję", ru: "отсутствие влияния спроса на выпуск" }],
          correct: 1, why: { pl: "Przy sztywnych cenach wzrost AD w recesji zwiększa produkcję.", ru: "При жёстких ценах рост AD в рецессии увеличивает выпуск." } },
        { q: { pl: "Kto opisał „niewidzialną rękę rynku”?", ru: "Кто описал «невидимую руку рынка»?" },
          a: [{ pl: "J.M. Keynes", ru: "Дж. М. Кейнс" }, { pl: "A. Smith", ru: "А. Смит" }, { pl: "A. Okun", ru: "А. Оукен" }],
          correct: 1, why: { pl: "Adam Smith, „Bogactwo narodów”, 1776.", ru: "Адам Смит, «Богатство народов», 1776." } },
        { q: { pl: "Dlaczego politycy nie czekają, aż luka inflacyjna zamknie się sama?", ru: "Почему политики не ждут, пока инфляционный разрыв закроется сам?" },
          a: [{ pl: "Bo gospodarka wróci do Y* przy wyższych płacach i cenach i straci konkurencyjność", ru: "Потому что экономика вернётся к Y* при более высоких зарплатах и ценах и потеряет конкурентоспособность" }, { pl: "Bo bezrobocie spadnie do zera", ru: "Потому что безработица упадёт до нуля" }, { pl: "Bo realny PKB wzrośnie", ru: "Потому что реальный ВВП вырастет" }],
          correct: 0, why: { pl: "Lepiej schłodzić popyt (AD w lewo).", ru: "Лучше охладить спрос (AD влево)." } },
        { q: { pl: "„Podaż tworzy swój własny popyt” — to prawo:", ru: "«Предложение создаёт собственный спрос» — это закон:" },
          a: [{ pl: "Keynesa", ru: "Кейнса" }, { pl: "Saya", ru: "Сэя" }, { pl: "Engla", ru: "Энгеля" }],
          correct: 1, why: { pl: "Keynes twierdził odwrotnie.", ru: "Кейнс утверждал обратное." } },
        { q: { pl: "Biedna rodzina kupuje więcej chleba po jego podwyżce. To:", ru: "Бедная семья покупает больше хлеба после его подорожания. Это:" },
          a: [{ pl: "paradoks Giffena", ru: "парадокс Гиффена" }, { pl: "efekt Veblena", ru: "эффект Веблена" }, { pl: "paradoks oszczędności", ru: "парадокс бережливости" }],
          correct: 0, why: { pl: "Giffen: tanie dobro podstawowe przy bardzo niskich dochodach.", ru: "Гиффен: дешёвый базовый товар при очень низких доходах." } },
        { q: { pl: "Cel inflacyjny NBP wynosi:", ru: "Инфляционная цель NBP:" },
          a: [{ pl: "2% ± 0,5 p.p.", ru: "2% ± 0,5 п.п." }, { pl: "2,5% ± 1 p.p.", ru: "2,5% ± 1 п.п." }, { pl: "3,5% ± 1 p.p.", ru: "3,5% ± 1 п.п." }],
          correct: 1, why: { pl: "Cel ciągły NBP: 2,5% z pasmem ± 1 p.p.", ru: "Постоянная цель NBP: 2,5% с коридором ± 1 п.п." } },
        { q: { pl: "Emerytury wypłacane przez państwo w rachunku PKB:", ru: "Пенсии, выплачиваемые государством, в расчёте ВВП:" },
          a: [{ pl: "są częścią G", ru: "входят в G" }, { pl: "nie są częścią G, bo to transfery", ru: "не входят в G, потому что это трансферты" }, { pl: "są częścią I", ru: "входят в I" }],
          correct: 1, why: { pl: "Państwo nic za nie nie kupuje, tylko przekazuje pieniądze.", ru: "Государство ничего за них не покупает, а лишь передаёт деньги." } },
      ],
    },
  ],

  data: {
    inflation: [[2003,0.8],[2004,3.5],[2005,2.1],[2006,1.0],[2007,2.5],[2008,4.2],[2009,3.5],[2010,2.6],[2011,4.3],[2012,3.7],[2013,0.9],[2014,0.0],[2015,-0.9],[2016,-0.6],[2017,2.0],[2018,1.6],[2019,2.3],[2020,3.4],[2021,5.1],[2022,14.4],[2023,11.4],[2024,3.6]],
    // stopa bezrobocia rejestrowanego, grudzień (2025: sierpień)
    unemployment: [[2004,19.0],[2005,17.6],[2006,14.8],[2007,11.2],[2008,9.5],[2009,12.1],[2010,12.4],[2011,12.5],[2012,13.4],[2013,13.4],[2014,11.4],[2015,9.7],[2016,8.3],[2017,6.6],[2018,5.8],[2019,5.2],[2020,6.2],[2021,5.4],[2022,5.2],[2023,5.1],[2024,5.1],[2025,5.5]],
  },
};
