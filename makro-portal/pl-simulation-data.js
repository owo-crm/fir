// Nieurodzaj — scenariusz startowy „Polska” (DANE GRY, PRZYBLIŻONE).
// Wartości są uproszczonym, okrągłym przybliżeniem rzędu wielkości gospodarki Polski ok. 2025 r.
// i NIE są oficjalną statystyką. Jedyna liczba wprost z publikacji: handel towarami 2025
// (GUS, dane ostateczne, 30.07.2026: eksport 1563,6 mld zł, import 1594,5 mld zł, saldo −31,0 mld zł) —
// użyta tylko do skali startowej. Brak obrony/armii z założenia projektu.
(function (root) {
  "use strict";
  const DATA = {
    schemaVersion: 1,
    startDate: { year: 2026, month: 0 },          // styczeń 2026 (gra)
    dataNote: "Dane gry — przybliżone. Nie są oficjalną statystyką ani prognozą.",
    macro: {                                       // mld zł / rok (nominalnie = realnie w cenach startowych)
      gdp: 3900, consumption: 2190, investment: 820, government: 760, servicesNet: 160,
      inflation: 3.2, unemployment: 5.2, policyRate: 4.25, debt: 2300, population: 37.4,
      laborForce: 17.6,                            // mln
    },
    // Budżet państwa (mld zł / rok). Wydatki „sektorowe” są suwakami gracza.
    budget: {
      taxes: { vat: 23, pit: 12, cit: 19 },        // stawki w %
      revenueBase: { vat: 330, pit: 165, cit: 105, excise: 120, contributions: 620, other: 340 },
      spending: {                                  // startowe wydatki programów (mld zł / rok)
        social: 760, health: 230, education: 150, research: 28, transport: 120, energy: 40, agriculture: 50, industry: 30, admin: 300,
      },
    },
    sectors: {
      rolnictwo:   { name: ["Rolnictwo", "Сельское хозяйство"], share: 0.027, energyInt: 0.6, importDep: 0.15, employ: 0.08, tradable: true },
      przemysl:    { name: ["Przemysł", "Промышленность"], share: 0.25, energyInt: 1.6, importDep: 0.40, employ: 0.24, tradable: true },
      energia:     { name: ["Energia", "Энергетика"], share: 0.035, energyInt: 0, importDep: 0.35, employ: 0.02, tradable: true },
      transport:   { name: ["Transport i logistyka", "Транспорт и логистика"], share: 0.065, energyInt: 1.2, importDep: 0.20, employ: 0.07, tradable: false },
      uslugi:      { name: ["Usługi", "Услуги"], share: 0.50, energyInt: 0.4, importDep: 0.10, employ: 0.47, tradable: false },
      budownictwo: { name: ["Budownictwo", "Строительство"], share: 0.07, energyInt: 0.8, importDep: 0.15, employ: 0.07, tradable: false },
      finanse:     { name: ["Finanse i banki", "Финансы и банки"], share: 0.045, energyInt: 0.1, importDep: 0.05, employ: 0.03, tradable: false },
      edukacja:    { name: ["Edukacja i kapitał ludzki", "Образование и человеческий капитал"], share: 0.0, energyInt: 0, importDep: 0, employ: 0.0, tradable: false },
      nauka:       { name: ["Nauka i R&D", "Наука и R&D"], share: 0.0, energyInt: 0, importDep: 0, employ: 0.0, tradable: false },
    },
    // Rynki towarowe. unit: jednostka ilości; price: zł za jednostkę (cena świata na starcie);
    // prod/demand: ilość / rok; sector: kto produkuje; storable: czy da się magazynować.
    markets: {
      zboze:   { name: ["Zboże", "Зерно"], unit: "mln t", priceUnit: "zł/t", price: 900, prod: 35, demand: 27.5, sector: "rolnictwo", storable: true, stockDays: 120, transport: 70, perUnit: 1e6, pct: 0.15 },
      zywnosc: { name: ["Żywność przetworzona", "Продукты питания"], unit: "mld zł", priceUnit: "indeks", price: 1, prod: 300, demand: 250, sector: "rolnictwo", storable: false, transport: 0.03, perUnit: 1e9, pct: 0.18 },
      gaz:     { name: ["Gaz ziemny", "Природный газ"], unit: "TWh", priceUnit: "zł/MWh", price: 190, prod: 42, demand: 190, sector: "energia", storable: true, stockDays: 60, transport: 18, perUnit: 1e6, pct: 0.05 },
      prad:    { name: ["Energia elektryczna", "Электроэнергия"], unit: "TWh", priceUnit: "zł/MWh", price: 430, prod: 168, demand: 172, sector: "energia", storable: false, transport: 15, perUnit: 1e6, pct: 0.06 },
      paliwa:  { name: ["Ropa, paliwa, surowce", "Нефть, топливо, сырьё"], unit: "mld zł", priceUnit: "indeks", price: 1, prod: 30, demand: 195, sector: "przemysl", storable: true, stockDays: 90, transport: 0.04, perUnit: 1e9, pct: 0.07 },
      maszyny: { name: ["Maszyny i urządzenia", "Машины и оборудование"], unit: "mld zł", priceUnit: "indeks", price: 1, prod: 280, demand: 330, sector: "przemysl", storable: false, transport: 0.03, perUnit: 1e9, pct: 0.06 },
      przemyslowe: { name: ["Wyroby przemysłowe i komponenty", "Промтовары и комплектующие"], unit: "mld zł", priceUnit: "indeks", price: 1, prod: 650, demand: 560, sector: "przemysl", storable: false, transport: 0.03, perUnit: 1e9, pct: 0.10 },
      konsumpcyjne: { name: ["Towary konsumpcyjne", "Потребительские товары"], unit: "mld zł", priceUnit: "indeks", price: 1, prod: 420, demand: 380, sector: "przemysl", storable: false, transport: 0.03, perUnit: 1e9, pct: 0.20 },
    },
    // Startowe przepływy handlowe (ilość / rok) — kalibracja do skali GUS 2025.
    trade0: { zboze: { imp: 1.5, exp: 9 }, zywnosc: { imp: 70, exp: 120 }, gaz: { imp: 150, exp: 2 }, prad: { imp: 12, exp: 8 }, paliwa: { imp: 190, exp: 25 }, maszyny: { imp: 380, exp: 330 }, przemyslowe: { imp: 560, exp: 650 }, konsumpcyjne: { imp: 380, exp: 420 } },
    // Partnerzy: udział w imporcie/eksporcie danego rynku, „tarcie” (koszt barier), przepustowość tras.
    partners: {
      DE: { name: ["Niemcy", "Германия"], eu: true, x: 0.08, y: 0.45, friction: 0, capacity: 1.0, imp: { maszyny: 0.35, przemyslowe: 0.30, konsumpcyjne: 0.25, prad: 0.45, zywnosc: 0.2, paliwa: 0.05, gaz: 0.15 }, exp: { maszyny: 0.35, przemyslowe: 0.32, konsumpcyjne: 0.30, zywnosc: 0.28, prad: 0.4, zboze: 0.25 } },
      CZ: { name: ["Czechy", "Чехия"], eu: true, x: 0.32, y: 0.86, friction: 0, capacity: 0.6, imp: { przemyslowe: 0.08, maszyny: 0.06, prad: 0.25, zywnosc: 0.08, konsumpcyjne: 0.05 }, exp: { przemyslowe: 0.07, maszyny: 0.06, zywnosc: 0.08, prad: 0.25, zboze: 0.1 } },
      SK: { name: ["Słowacja", "Словакия"], eu: true, x: 0.58, y: 0.93, friction: 0, capacity: 0.4, imp: { przemyslowe: 0.03, prad: 0.1, konsumpcyjne: 0.02 }, exp: { przemyslowe: 0.03, zywnosc: 0.04, prad: 0.1, zboze: 0.05 } },
      LT: { name: ["Litwa", "Литва"], eu: true, x: 0.80, y: 0.06, friction: 0, capacity: 0.4, imp: { paliwa: 0.12, prad: 0.15, gaz: 0.1, zywnosc: 0.04 }, exp: { prad: 0.15, zywnosc: 0.05, przemyslowe: 0.03, zboze: 0.05 } },
      UA: { name: ["Ukraina", "Украина"], eu: false, dcfta: true, x: 0.97, y: 0.72, friction: 0.04, capacity: 0.7, imp: { zboze: 0.65, zywnosc: 0.12, prad: 0.05, paliwa: 0.03 }, exp: { paliwa: 0.12, maszyny: 0.05, konsumpcyjne: 0.05, przemyslowe: 0.04, prad: 0.1 } },
      BY: { name: ["Białoruś", "Беларусь"], eu: false, restricted: true, x: 0.97, y: 0.33, friction: 0.35, capacity: 0.15, imp: { przemyslowe: 0.005, zywnosc: 0.005 }, exp: { zywnosc: 0.005 } },
      FR: { name: ["Francja", "Франция"], eu: true, far: true, x: 0.0, y: 0.92, friction: 0, capacity: 0.6, imp: { maszyny: 0.06, przemyslowe: 0.06, zywnosc: 0.06, konsumpcyjne: 0.05, zboze: 0.1 }, exp: { maszyny: 0.06, przemyslowe: 0.06, konsumpcyjne: 0.07, zywnosc: 0.07, zboze: 0.05 } },
      EU: { name: ["Reszta UE", "Остальной ЕС"], eu: true, abstract: true, x: 0.04, y: 0.12, friction: 0, capacity: 1.0, imp: { maszyny: 0.2, przemyslowe: 0.3, konsumpcyjne: 0.25, zywnosc: 0.35, gaz: 0.15, paliwa: 0.1, zboze: 0.15 }, exp: { maszyny: 0.3, przemyslowe: 0.32, konsumpcyjne: 0.33, zywnosc: 0.38, zboze: 0.35 } },
      WORLD: { name: ["Rynek światowy (morze)", "Мировой рынок (море)"], abstract: true, sea: true, x: 0.45, y: -0.02, friction: 0.03, capacity: 1.0, imp: { gaz: 0.6, paliwa: 0.7, maszyny: 0.18, przemyslowe: 0.20, konsumpcyjne: 0.38, zywnosc: 0.15, zboze: 0.1 }, exp: { maszyny: 0.18, przemyslowe: 0.17, konsumpcyjne: 0.18, zywnosc: 0.1, zboze: 0.15, paliwa: 0.88 } },
    },
    // Programy inwestycyjne: suwak w mld zł / rok; efekt narasta między lagStart a lagFull (miesiące).
    programs: {
      siec:        { sector: "energia", name: ["Modernizacja sieci", "Модернизация сети"], base: 12, max: 40, lagStart: 12, lagFull: 36, dep: 0.03, effect: L("Sprawność sieci ↑, straty ↓, mniejsze ryzyko awarii", "Надёжность сети ↑, потери ↓, меньше риск аварий") },
      magazyny:    { sector: "energia", name: ["Magazyny energii i gazu", "Хранилища энергии и газа"], base: 6, max: 30, lagStart: 18, lagFull: 48, dep: 0.04, effect: L("Rezerwa mocy ↑, większy zapas gazu, stabilniejsze ceny", "Резерв мощности ↑, больший запас газа, стабильнее цены") },
      oze:         { sector: "energia", name: ["Nowe źródła (OZE, atom)", "Новые источники (ВИЭ, АЭС)"], base: 15, max: 60, lagStart: 18, lagFull: 60, dep: 0.03, effect: L("Produkcja prądu ↑, mniej gazu w elektrowniach, mniejszy import", "Выработка ↑, меньше газа в генерации, меньше импорт") },
      efektywnosc: { sector: "energia", name: ["Efektywność energetyczna", "Энергоэффективность"], base: 7, max: 30, lagStart: 9, lagFull: 30, dep: 0.05, effect: L("Zużycie energii w przemyśle i domach ↓", "Потребление энергии ↓") },
      logistyka:   { sector: "transport", name: ["Koleje, porty i drogi", "Железные дороги, порты, дороги"], base: 120, max: 200, lagStart: 6, lagFull: 30, dep: 0.03, maintenance: 95, effect: L("Przepustowość tras ↑, koszty transportu ↓ (poniżej ~95 mld/rok infrastruktura się starzeje)", "Пропускная способность ↑, транспорт дешевле (ниже ~95 млрд/год инфраструктура стареет)") },
      edukacja:    { sector: "edukacja", name: ["Edukacja i kwalifikacje", "Образование и квалификация"], base: 150, max: 230, lagStart: 24, lagFull: 60, dep: 0.02, maintenance: 140, effect: L("Kapitał ludzki → wydajność pracy → PKB potencjalny", "Человеческий капитал → производительность → потенциальный ВВП") },
      badania:     { sector: "nauka", name: ["Badania i rozwój (R&D)", "Исследования и разработки"], base: 28, max: 90, lagStart: 12, lagFull: 60, dep: 0.06, effect: L("Szansa na innowacje ↑, wydajność przemysłu ↑", "Шанс на инновации ↑, производительность ↑") },
      rolnictwo:   { sector: "rolnictwo", name: ["Nawadnianie i odporność upraw", "Орошение и устойчивость посевов"], base: 50, max: 90, lagStart: 12, lagFull: 36, dep: 0.04, maintenance: 45, effect: L("Mniejsze straty przy suszy, wyższe plony", "Меньше потери при засухе, выше урожай") },
      przemysl:    { sector: "przemysl", name: ["Modernizacja przemysłu", "Модернизация промышленности"], base: 30, max: 90, lagStart: 12, lagFull: 36, dep: 0.06, effect: L("Wydajność ↑, energochłonność ↓, konkurencyjność eksportu ↑", "Производительность ↑, энергоёмкость ↓, конкурентоспособность ↑") },
    },
    // Wydarzenia zewnętrzne (bez wojen). months: [od, do] trwania; p: szansa miesięczna.
    events: {
      ua_drought:   { name: ["Słabe zbiory w Ukrainie", "Неурожай в Украине"], partner: "UA", p: 0.035, season: [3, 7], len: [5, 9], effects: { supply: { UA: { zboze: 0.45, zywnosc: 0.75 } }, world: { zboze: 1.18 } } },
      fr_drought:   { name: ["Susza w Europie Zachodniej", "Засуха в Западной Европе"], partner: "FR", p: 0.02, season: [4, 7], len: [4, 7], effects: { supply: { FR: { zboze: 0.6, zywnosc: 0.85 } }, world: { zboze: 1.1 }, domesticYield: 0.88 } },
      gas_spike:    { name: ["Skok światowych cen gazu", "Скачок мировых цен на газ"], partner: "WORLD", p: 0.025, len: [6, 12], effects: { world: { gaz: 1.7, prad: 1.25, paliwa: 1.15 } } },
      oil_spike:    { name: ["Drożejąca ropa", "Дорожающая нефть"], partner: "WORLD", p: 0.025, len: [5, 10], effects: { world: { paliwa: 1.35, gaz: 1.1 } } },
      grid_failure: { name: ["Awaria dużej elektrowni", "Авария крупной электростанции"], partner: "PL", p: 0.018, len: [2, 5], effects: { domestic: { prad: 0.9 } }, gridDependent: true },
      port_storm:   { name: ["Sztorm zamyka porty Bałtyku", "Шторм закрывает порты Балтики"], partner: "WORLD", p: 0.02, season: [10, 2], len: [1, 2], effects: { route: { WORLD: 0.4 } } },
      de_slowdown:  { name: ["Spowolnienie przemysłu w Niemczech", "Спад промышленности в Германии"], partner: "DE", p: 0.02, len: [8, 16], effects: { demand: { DE: 0.88 } } },
      components:   { name: ["Niedobór komponentów u dostawców", "Нехватка комплектующих у поставщиков"], partner: "WORLD", p: 0.015, len: [4, 8], effects: { supply: { WORLD: { maszyny: 0.6, przemyslowe: 0.75 }, DE: { maszyny: 0.85 } } } },
      freight:      { name: ["Wzrost kosztów frachtu", "Рост стоимости фрахта"], partner: "WORLD", p: 0.02, len: [4, 9], effects: { freight: 1.8 } },
      bank_stress:  { name: ["Napięcia w bankach strefy euro", "Напряжение в банках еврозоны"], partner: "EU", p: 0.012, len: [5, 10], effects: { credit: 0.85, demand: { EU: 0.92, DE: 0.94 } } },
    },
    // Szablony ofert kontraktów (generowane w grze, nie są prawdziwymi umowami firm).
    contractTemplates: [
      { partner: "LT", market: "prad", type: "export", vol: [1.5, 3], dur: [12, 36], prem: [-0.05, 0.08] },
      { partner: "DE", market: "maszyny", type: "export", vol: [8, 20], dur: [24, 48], prem: [-0.03, 0.05] },
      { partner: "DE", market: "przemyslowe", type: "export", vol: [15, 35], dur: [24, 48], prem: [-0.03, 0.04] },
      { partner: "UA", market: "zboze", type: "import", vol: [0.5, 1.5], dur: [12, 24], prem: [-0.12, -0.02] },
      { partner: "WORLD", market: "gaz", type: "import", vol: [10, 30], dur: [24, 60], prem: [-0.08, 0.04] },
      { partner: "FR", market: "zywnosc", type: "export", vol: [4, 12], dur: [12, 36], prem: [0, 0.07] },
      { partner: "CZ", market: "prad", type: "import", vol: [1, 3], dur: [12, 24], prem: [-0.04, 0.05] },
      { partner: "UA", market: "paliwa", type: "export", vol: [3, 8], dur: [12, 24], prem: [0.02, 0.1] },
      { partner: "EU", market: "konsumpcyjne", type: "export", vol: [10, 25], dur: [24, 36], prem: [-0.02, 0.04] },
      { partner: "WORLD", market: "zboze", type: "export", vol: [1, 3], dur: [12, 24], prem: [-0.05, 0.06] },
    ],
    innovations: [
      { id: "automatyzacja", name: ["Automatyzacja produkcji", "Автоматизация производства"], sectors: ["przemysl"], cost: 12, months: 18, effect: { productivity: { przemysl: 0.04 } } },
      { id: "siec_ai", name: ["Inteligentne zarządzanie siecią", "Умное управление сетью"], sectors: ["energia"], cost: 6, months: 12, effect: { gridLoss: -0.02, energyDemand: -0.01 } },
      { id: "nasiona", name: ["Nasiona odporne na suszę", "Засухоустойчивые семена"], sectors: ["rolnictwo"], cost: 3, months: 24, effect: { droughtResist: 0.25 } },
      { id: "logistyka_opt", name: ["Optymalizacja logistyki", "Оптимизация логистики"], sectors: ["transport"], cost: 4, months: 12, effect: { freight: -0.08 } },
      { id: "magazyny_nowe", name: ["Tańsze magazyny energii", "Дешёвые накопители энергии"], sectors: ["energia"], cost: 8, months: 24, effect: { storageBoost: 0.3 } },
    ],
    goals: [
      { id: "infl", name: ["Inflacja 2–4%", "Инфляция 2–4%"], metric: "inflation", min: 2, max: 4 },
      { id: "growth", name: ["Średni wzrost PKB ≥ 3%", "Средний рост ВВП ≥ 3%"], metric: "growthAvg", min: 3 },
      { id: "debt", name: ["Dług publiczny < 65% PKB", "Госдолг < 65% ВВП"], metric: "debtRatio", max: 65 },
      { id: "gasdep", name: ["Zależność od importu gazu < 80%", "Зависимость от импорта газа < 80%"], metric: "gasImportShare", max: 80 },
    ],
  };
  function L(pl, ru){ return [pl, ru]; }
  if (typeof module !== "undefined" && module.exports) module.exports = DATA; else root.PL_DATA = DATA;
})(typeof window !== "undefined" ? window : globalThis);
