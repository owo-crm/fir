// Testy rdzenia „Nieurodzaj” (Polska) i doradcy: node makro-portal/pl-sim.test.mjs
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const S = require("./pl-sim.js");
const A = require("./advisor-knowledge.js");

let pass = 0, fail = 0;
function test(name, fn){
  try { fn(); pass++; console.log("ok   " + name); }
  catch (e){ fail++; console.log("FAIL " + name + "\n     " + (e && e.message)); }
}
function assert(c, msg){ if (!c) throw new Error(msg || "assert"); }
const days = (s, n) => { for (let i = 0; i < n; i++) S.tick(s, 1); return s; };

test("determinizm: ten sam seed i komendy → ten sam stan", () => {
  const a = S.newGame(7), b = S.newGame(7);
  S.setPolicy(a, "rate", 5); S.setPolicy(b, "rate", 5);
  days(a, 75); days(b, 75);
  assert(S.serialize(a) === S.serialize(b), "stany różne");
});

test("jeden raport doradcy na miesiąc", () => {
  const s = days(S.newGame(3), 95);
  const idx = s.advisor.reports.map(r => r.monthIndex);
  assert(new Set(idx).size === idx.length, "duplikat raportu: " + idx);
  assert(idx.length === 4, "oczekiwano 4 raportów, jest " + idx.length);
  const before = s.advisor.reports.length; S.tick(s, 1);
  assert(s.advisor.reports.length === before, "raport w środku miesiąca");
});

test("prędkość nie zmienia wyniku (tylko tempo)", () => {
  const run = speed => { const s = S.newGame(11), c = S.createClock(); c.setSpeed(speed); let d = 0;
    while (d < 40){ const n = c.advance(1000 / 60); for (let i = 0; i < n && d < 40; i++){ S.tick(s, 1); d++; } } return S.serialize(s); };
  assert(run(1) === run(5), "1× ≠ 5×");
  const c = S.createClock(); c.setSpeed(1); let n = 0; for (let i = 0; i < 60 * 12 + 1; i++) n += c.advance(1000 / 60);
  assert(n === 1, "1× powinno dać 1 dzień na 12 s, jest " + n);
});

test("pauza i ukryta karta zatrzymują czas", () => {
  const c = S.createClock(); c.setSpeed(0);
  assert(c.advance(60000) === 0, "pauza");
  c.setSpeed(5); assert(c.advance(60000, false) === 0, "ukryta karta");
  assert(c.advance(60000) <= 2, "brak limitu nadrabiania");
});

test("zapis / odczyt odtwarza grę", () => {
  const s = days(S.newGame(5), 40);
  const r = S.deserialize(S.serialize(s)); assert(r.ok, "deserialize");
  days(s, 20); days(r.state, 20);
  assert(S.serialize(s) === S.serialize(r.state), "różnica po wczytaniu");
  assert(!S.deserialize("{zepsute").ok, "zepsuty plik przyjęty");
  assert(!S.deserialize(JSON.stringify({ schemaVersion: 99 })).ok, "nowsza wersja przyjęta");
});

test("nowa gra resetuje stan", () => {
  const s = days(S.newGame(5), 40); S.setPolicy(s, "vat", 25);
  const n = S.newGame(5);
  assert(n.dayIndex === 0 && n.policy.vat === 23 && n.decisions.length === 0 && n.contracts.length === 0, "brak resetu");
});

test("inwestycja działa z opóźnieniem", () => {
  const s = S.newGame(9); s.flags.noEvents = true;
  const e0 = s.programs.oze.eff; S.setPolicy(s, "programs.oze", 60);
  for (let i = 0; i < 12; i++) S.tick(s, 30);
  const e12 = s.programs.oze.eff;
  for (let i = 0; i < 48; i++) S.tick(s, 30);
  const e60 = s.programs.oze.eff;
  assert(Math.abs(e12 - e0) < 0.05, `efekt za szybko: ${e0} → ${e12}`);
  assert(e60 > e0 + 0.15, `brak efektu po 5 latach: ${e60}`);
});

test("import i eksport ograniczone przepustowością", () => {
  const s = S.newGame(13); S.startEvent(s, "ua_drought"); S.startEvent(s, "port_storm");
  for (let d = 0; d < 120; d++){ S.tick(s, 1);
    for (const k of S.MK){ const q = s.markets[k];
      assert(q.imp <= q.impCap * 1.15 + q.contractImp + 0.5, `${k}: import ${q.imp} > cap ${q.impCap}`);
      assert(q.exp <= q.expCap * 1.15 + q.contractExp + 0.5, `${k}: eksport ${q.exp} > cap ${q.expCap}`); } }
});

test("kontrakt eksportowy zmniejsza wolny wolumen", () => {
  const s = S.newGame(17);
  const o = { id: 999, partner: "DE", market: "przemyslowe", type: "export", volume: 30, price: 1, months: 24, guarantee: 0.8, penalty: 1.5, expires: 100, rounds: 0, status: "offer" };
  s.offers.push(o);
  const before = S.assessContract(s, o).capacityLeft;
  S.acceptOffer(s, 999); days(s, 3);
  const q = s.markets.przemyslowe;
  assert(q.contractExp > 25, "kontrakt nie liczony");
  assert(q.expCap - q.contractExp < before - 20, "wolna przepustowość nie spadła");
});

test("deficyt handlowy ≠ dług publiczny", () => {
  const s = S.newGame(19); S.startEvent(s, "gas_spike"); days(s, 60);
  const d0 = s.macro.debt, x0 = s.macro.X - s.macro.M;
  S.tick(s, 1);
  const expected = d0 - s.macro.balance / 360;
  assert(Math.abs(s.macro.debt - expected) < 1e-6, "dług zmienił się nie tylko o saldo budżetu");
  assert(x0 !== s.macro.balance, "saldo handlu użyte jako saldo budżetu");
});

test("zerwanie kontraktu obniża reputację i relacje", () => {
  const s = S.newGame(23); const o = s.offers[0]; assert(o, "brak oferty");
  const rel0 = s.partners[o.partner].relationship, r0 = s.flags.playerReliability ?? 0.95;
  S.acceptOffer(s, o.id); S.cancelContract(s, o.id);
  assert(s.flags.playerReliability < r0, "reputacja bez zmian");
  assert(s.partners[o.partner].relationship < rel0, "relacja bez zmian");
  assert(s.news.some(n => n.id === "contract_broken"), "brak wiadomości");
});

test("susza u partnera → mniejsze dostawy i wiadomość", () => {
  const s = S.newGame(29); s.flags.noEvents = true; S.startEvent(s, "ua_drought"); days(s, 75);
  assert(s.partners.UA.supply.zboze < 0.8, "dostawy UA nie spadły: " + s.partners.UA.supply.zboze);
  assert(s.news.some(n => n.id === "event_signal" && n.k === "ua_drought"), "brak wiadomości");
  const q = s.markets.zboze, base = S.newGame(29); base.flags.noEvents = true; days(base, 75);
  assert(q.impCap < base.markets.zboze.impCap, "przepustowość importu zboża bez zmian");
});

test("doradca: „gaz cena dlaczego” → ENERGY/GAS/PRICE/WHY", () => {
  const s = S.newGame(1);
  for (const q of ["Dlaczego gaz jest taki drogi? cena", "gaz cena dlaczego", "почему газ дорогой, цена"]){
    const r = A.resolveAdvisorQuery(q, s, "pl");
    assert(r.answerId === "ENERGY/GAS/PRICE/WHY", q + " → " + r.answerId);
  }
  const ans = A.buildAdvisorAnswer("ENERGY/GAS/PRICE/WHY", s, "pl");
  assert(ans && ans.summary && ans.factors.length && ans.chain.length, "pusta odpowiedź");
});

test("doradca: niejasne pytanie → doprecyzowanie", () => {
  const s = S.newGame(1);
  const r = A.resolveAdvisorQuery("hmm co tam", s, "pl");
  assert(r.answerId === null && r.suggestions.length >= 3, "brak sugestii");
  const r2 = A.resolveAdvisorQuery("energia", s, "pl");
  assert(r2.answerId === null && r2.suggestions.length, "sam obszar nie powinien dawać odpowiedzi");
});

test("„Dlaczego?” bez zmyślonych procentów", () => {
  const s = days(S.newGame(31), 35);
  for (const k of ["gas", "power", "inflation", "gdp", "unemployment", "budget", "debt", "trade", "imports", "exports", "grain"]){
    const e = A.explain(k, s, "pl"); assert(e, "brak " + k);
    assert(e.uncertainty, "brak opisu niepewności " + k);
    for (const f of [...e.main, ...e.extra]) assert(!("share" in f) && !("percentOfCause" in f), "procent udziału przyczyny w " + k);
  }
  const inf = A.explain("inflation", s, "pl"), p = s.macro.pi;
  assert(Math.abs(p.expect + p.demand + p.energy + p.food - s.macro.inflation) < 1e-9 && inf.exact, "rozbicie inflacji niedokładne");
});

test("dyplomacja: relacja rośnie z czasem, kosztuje, BY zablokowana", () => {
  const s = S.newGame(41); s.flags.noEvents = true;
  const r0 = s.partners.DE.relationship, d0 = s.macro.debt;
  assert(S.diplomacy(s, "DE", "mission").ok, "misja odrzucona");
  assert(s.macro.debt > d0, "brak kosztu");
  assert(!S.diplomacy(s, "DE", "agreement").ok, "druga akcja naraz");
  assert(S.diplomacy(s, "BY", "mission").reason === "sanctions", "BY nie zablokowana");
  days(s, 30); const r1 = s.partners.DE.relationship; days(s, 160);
  assert(r1 > r0 && r1 < r0 + 0.03, "efekt nie jest stopniowy");
  assert(s.partners.DE.relationship >= r0 + 0.07, "brak efektu po pół roku");
});

test("więcej OZE i efektywności → mniejszy import gazu po 5 latach", () => {
  const s = S.newGame(43); s.flags.noEvents = true;
  const a = S.project(s, 60), b = S.project(s, 60, { programs: { oze: 40, efektywnosc: 20 } });
  assert(b[59].gasImp < a[59].gasImp * 0.97, `import gazu: ${a[59].gasImp} → ${b[59].gasImp}`);
  assert(b[11].gasImp > a[11].gasImp * 0.97, "efekt za szybko");
});

test("wskaźniki społeczne w zakresie", () => {
  const s = days(S.newGame(47), 40);
  assert(s.macro.mood > 5 && s.macro.mood < 95 && s.macro.employment > 15 && Math.abs(s.macro.realIncome - 1) < 0.2, "mood/employment/realIncome");
});

console.log(`\n${pass} ok, ${fail} błędów`);
if (fail) process.exit(1);
