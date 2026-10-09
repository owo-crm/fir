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

// ---------------------------------------------------------------- scenariusze długookresowe (krok miesięczny, bez losowych wydarzeń)
function scenario(patch, months, setup){
  const s = S.newGame(11); s.flags.noEvents = true; s.quiet = true;
  if (patch) S.applyPolicyPatch(s, patch, true); if (setup) setup(s);
  const path = [];
  for (let i = 1; i <= months; i++){
    const net0 = s.macro.debt - (s.macro.reserves || 0); S.tick(s, 30); const m = s.macro;
    path.push({ i, Y: m.Y, infl: m.inflation, u: m.unemployment, bal: m.balance / m.nominalGDP * 100, debt: m.debtRatio, res: m.reserves || 0,
      flowErr: Math.abs((m.debt - (m.reserves || 0)) - (net0 - m.balance * 30 / 360)), gas: m.gasImportShare, vals: [m.Y, m.C, m.I, m.G, m.NX, m.inflation, m.unemployment, m.debt, m.reserves || 0, m.balance, m.priceLevel] });
  }
  return { s, path, at: i => path[i - 1] };
}
const finite = sc => sc.path.every(p => p.vals.every(Number.isFinite));
const BASE = scenario(null, 120);

test("start: udokumentowany stan na 1.01.2026 (rozgrzewka nie przesuwa finansów)", () => {
  const s = S.newGame(3), M = S.DATA.macro;
  assert(s.dayIndex === 0 && s.macro.priceLevel === 1 && s.macro.Y === M.gdp && s.macro.debt === M.debt && s.macro.reserves === M.reserves, "stan startowy");
  assert(Math.abs(s.macro.debtRatio - M.debt / M.gdp * 100) < 1e-9 && Math.abs(s.macro.inflation - M.inflation) < 1e-9 && s.macro.rateEff === M.policyRate, "wskaźniki startowe");
  assert(Math.abs(s.macro.AD - M.gdp) / M.gdp < 0.005, "popyt startowy ≠ PKB: " + s.macro.AD);
});

test("10 lat bez zmian: wartości skończone, budżet = dług, rozsądne granice", () => {
  assert(finite(BASE), "NaN/Infinity");
  assert(BASE.path.every(p => p.flowErr < 1e-6), "dług nie zgadza się z saldem budżetu");
  const e = BASE.at(120), g = (Math.pow(e.Y / S.DATA.macro.gdp, 1 / 10) - 1) * 100;
  assert(g > 1.5 && g < 3.5, "średni wzrost " + g);
  assert(e.infl > 0.5 && e.infl < 5, "inflacja " + e.infl);
  assert(e.u > 3 && e.u < 9, "bezrobocie " + e.u);
  assert(e.debt > 60 && e.debt < 95, "dług/PKB po 10 latach " + e.debt + " (bez reform dług ma rosnąć, ale nie eksplodować)");
  assert(BASE.path.every(p => p.bal < 0 && p.bal > -8), "saldo budżetu poza zakresem");
});

test("oszczędności: niższy dług, ale koszt we wzroście na starcie; dług nigdy ujemny", () => {
  const A = scenario({ vat: 26, pit: 15, admin: 250, social: 650, health: 200 }, 120);
  assert(finite(A) && A.path.every(p => p.flowErr < 1e-6), "spójność");
  assert(A.at(120).debt < BASE.at(120).debt - 20, "dług nie spadł wyraźnie");
  assert(A.at(12).Y < BASE.at(12).Y * 0.97, "brak kosztu krótkookresowego");
  assert(A.at(12).u > BASE.at(12).u + 0.5, "bezrobocie nie wzrosło");
  assert(A.path.every(p => p.debt >= 0 && p.res >= 0), "ujemny dług lub rezerwy");
});

test("skrajne podatki: nadwyżka trafia do rezerw (dług ≥ 0), PKB trwale niższe", () => {
  const T = scenario({ vat: 27, pit: 25, cit: 30, admin: 240, social: 600, health: 180 }, 120);
  assert(T.path.every(p => p.debt >= 0 && p.res >= 0 && p.flowErr < 1e-6), "bilans");
  assert(T.at(120).res > 0 || T.at(120).debt < 20, "nadwyżka nie została rozliczona");
  assert(T.at(120).Y < BASE.at(120).Y * 0.95, "wysokie podatki bez kosztu dla potencjału");
});

test("inwestycje: koszt teraz, efekt z opóźnieniem, mniej importu gazu", () => {
  const I = scenario({ programs: { oze: 50, efektywnosc: 25, edukacja: 210, badania: 75, przemysl: 75, logistyka: 160 } }, 120);
  assert(finite(I) && I.path.every(p => p.flowErr < 1e-6), "spójność");
  assert(I.at(24).debt > BASE.at(24).debt + 1, "brak kosztu fiskalnego");
  const g2 = I.at(60).Y / BASE.at(60).Y, g10 = I.at(120).Y / BASE.at(120).Y;
  assert(g10 > 1.04 && g10 > g2 + 0.02, `efekt nie narasta: 5 lat ${g2}, 10 lat ${g10}`);
  assert(I.at(120).gas < BASE.at(120).gas - 3, "import gazu nie spadł");
});

test("każdy program: +20 mld/rok daje dodatni efekt PKB po 15 latach, ale nie darmowy", () => {
  const B = scenario(null, 180);
  for (const k of ["edukacja", "badania", "przemysl", "logistyka", "oze", "efektywnosc"]){
    const R = scenario({ programs: { [k]: S.DATA.programs[k].base + 20 } }, 180);
    const dY = R.at(180).Y / B.at(180).Y - 1, d5 = R.at(60).Y / B.at(60).Y - 1;
    assert(dY > 0.004 && dY < 0.025, `${k}: efekt po 15 latach ${dY}`);
    assert(dY > d5, `${k}: efekt nie narasta z czasem`);
    assert(R.at(180).debt > B.at(180).debt, `${k}: brak kosztu`);
  }
});

test("kryzys (gaz + Niemcy + banki): głęboki spadek, potem odbicie bez przegrzania", () => {
  const C = scenario(null, 60, s => { S.startEvent(s, "gas_spike"); S.startEvent(s, "de_slowdown"); S.startEvent(s, "bank_stress"); });
  assert(finite(C), "NaN");
  const minY = Math.min(...C.path.slice(0, 12).map((p, i) => p.Y / BASE.path[i].Y));
  assert(minY < 0.97, "brak recesji: " + minY);
  assert(Math.max(...C.path.slice(0, 12).map(p => p.infl)) > BASE.at(6).infl + 3, "brak skoku inflacji");
  assert(C.at(36).Y / BASE.at(36).Y > 0.98 && C.at(36).Y / BASE.at(36).Y < 1.01, "brak odbicia albo przegrzanie");
});

test("odporność: magazyny łagodzą szok gazowy, efektywność obniża inflację", () => {
  const peak = patch => { const R = scenario(patch, 96); const s = R.s; s.quiet = true; const y0 = s.macro.Y; const e = S.startEvent(s, "gas_spike"); e.len = 240; let mx = 0, mn = 9; for (let d = 0; d < 300; d++){ S.tick(s, 1); mx = Math.max(mx, s.macro.inflation); mn = Math.min(mn, s.macro.Y / y0); } return { mx, mn }; };
  const a = peak(null), b = peak({ programs: { magazyny: 26, efektywnosc: 27 } });
  assert(b.mx < a.mx - 0.5 && b.mn > a.mn + 0.003, `inflacja ${a.mx}→${b.mx}, PKB ${a.mn}→${b.mn}`);
});

test("prośba o pomoc: susza w Ukrainie → wybór z kosztem i skutkami", () => {
  const mk = () => { const s = S.newGame(51); s.flags.noEvents = true; const e = S.startEvent(s, "ua_drought"); e.len = 240; for (let d = 0; d < 60 && !s.aid; d++) S.tick(s, 1); return s; };
  const a = mk(); assert(a.aid && a.aid.partner === "UA" && a.aid.market === "zboze", "brak prośby");
  assert(a.news.some(n => n.id === "aid_request"), "brak wiadomości");
  const r0 = a.partners.UA.relationship, net0 = a.macro.debt - a.macro.reserves, len0 = a.events[0].len;
  S.respondAid(a, "help"); assert(!a.aid, "prośba nie zamknięta");
  assert(Math.abs((a.macro.debt - a.macro.reserves) - net0 - S.AID.help.cost) < 1e-9, "koszt pomocy nie w długu");
  assert(a.events[0].len < len0, "pomoc nie skraca kryzysu u partnera");
  for (let d = 0; d < 90; d++) S.tick(a, 1); assert(a.partners.UA.relationship > r0 + 0.08, "relacje nie wzrosły");
  const b = mk(); S.respondAid(b, "sell"); const c = b.contracts.find(x => x.aid);
  assert(c && c.type === "export" && c.market === "zboze" && c.status === "active", "brak awaryjnej dostawy");
  const d = mk(), rd = d.partners.UA.relationship; S.respondAid(d, "decline"); assert(d.partners.UA.relationship < rd, "odmowa bez kosztu");
  const e = mk(); for (let i = 0; i < 31; i++) S.tick(e, 1); assert(!e.aid, "brak wygaśnięcia prośby");
});

test("kontrakty: kara za zerwanie i odszkodowanie od partnera trafiają do bilansu", () => {
  const s = S.newGame(23); const o = s.offers[0]; S.acceptOffer(s, o.id);
  const c = s.contracts.find(x => x.id === o.id), net0 = s.macro.debt - s.macro.reserves, pen = S.cancelPenalty(c);
  S.cancelContract(s, c.id);
  assert(Math.abs((s.macro.debt - s.macro.reserves) - net0 - pen) < 1e-9 && pen > 0, "kara nie w bilansie");
  assert(Math.abs(pen - S.valueOf(c.market, c.volume, c.price) * 0.25) < 0.01, "kara ≠ 25% wartości rocznej");
});

test("sektory: zatrudnienie sumuje się do liczby pracujących", () => {
  const s = days(S.newGame(29), 40), sum = Object.values(s.sectors).reduce((a, x) => a + (x.jobs || 0), 0);
  assert(Math.abs(sum - S.DATA.macro.laborForce * (1 - s.macro.unemployment / 100)) < 1e-6, "suma " + sum);
});

test("banki: bufor kapitałowy chroni w kryzysie, ale kosztuje w spokojnych czasach", () => {
  const run = b => { const s = S.newGame(7); s.flags.noEvents = true; s.quiet = true; S.setPolicy(s, "capBuffer", b, true); for (let i = 0; i < 36; i++) S.tick(s, 30); const y0 = s.macro.Y; const e = S.startEvent(s, "bank_stress"); e.len = 300; let mn = 9; for (let d = 0; d < 360; d++){ S.tick(s, 1); mn = Math.min(mn, s.macro.Y / y0); } return { y0, mn, b: s.macro.bank }; };
  const lo = run(0), hi = run(4);
  assert(hi.y0 < lo.y0, "wyższy bufor powinien kosztować w spokojnych czasach");
  assert(hi.mn > lo.mn + 0.003, `bufor nie chroni: ${lo.mn} vs ${hi.mn}`);
  for (const r of [lo, hi]) assert(r.b.npl > 1 && r.b.npl < 16 && r.b.capital > 5 && r.b.capital < 26, "banki poza zakresem");
});

console.log(`\n${pass} ok, ${fail} błędów`);
if (fail) process.exit(1);
