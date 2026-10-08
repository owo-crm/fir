// Testy symulacji Novarii: node makro-portal/novaria.test.mjs
import { createRequire } from "module"; import assert from "assert/strict";
const S = createRequire(import.meta.url)("./novaria-sim.js");
let n = 0; const test = (name, fn) => { fn(); n++; console.log("ok -", name); };
const run = (s, days) => { for (let i = 0; i < days; i++) S.tick(s); return s; };

test("gospodarka żyje bez gracza i jest stabilna (8 lat bez wstrząsów)", () => {
  const s = S.newGame(1); s.noEvents = true; run(s, S.TOTAL);
  const z = s.hist.at(-1);
  assert.ok(z.infl > 0.5 && z.infl < 4, "infl " + z.infl); assert.ok(z.unemp > 3 && z.unemp < 8, "unemp " + z.unemp); assert.ok(!s.lost);
});
test("bilans chleba: produkcja ≤ min(moc, popyt·1,02), sprzedaż = min(popyt, produkcja)", () => {
  const s = S.newGame(2); for (let i = 0; i < 900; i++){ S.tick(s); const b = s.b;
    assert.ok(b.prod <= b.cap + 1e-6); assert.ok(Math.abs(b.sales - Math.min(b.demand, b.prod)) < 1e-6); assert.ok(Math.abs(b.short - Math.max(0, b.demand - b.prod)) < 1e-6); }
});
test("podatek nie zmienia budżetu natychmiast (wchodzi stopniowo)", () => {
  const s = S.newGame(3); s.noEvents = true; run(s, 90); const b0 = s.m.rev.tax;
  S.setPolicy(s, "tax", 32); S.tick(s); const b1 = s.m.rev.tax; run(s, 60); const b2 = s.m.rev.tax;
  assert.ok((b1 - b0) / (b2 - b0) < 0.1, `jump ${b1 - b0} vs full ${b2 - b0}`);
});
test("podatek obniża dochód do dyspozycji i konsumpcję", () => {
  const a = S.newGame(4), b = S.newGame(4); a.noEvents = b.noEvents = true; S.setPolicy(b, "tax", 32); run(a, 120); run(b, 120);
  assert.ok(b.m.inc.disp < a.m.inc.disp && b.m.C < a.m.C);
});
test("brak zboża → piekarnię ogranicza zboże, nie popyt", () => {
  const s = S.newGame(5); s.noEvents = true; run(s, 10); s.g.stock = 50; s.g.reserve = 0; S.tick(s);
  assert.equal(s.b.limit, "grain");
});
test("pełne magazyny: słaba prognoza zbiorów prawie nie podnosi ceny zboża", () => {
  const a = S.newGame(6), b = S.newGame(6); a.noEvents = b.noEvents = true; run(a, 120); run(b, 120);   // maj
  a.g.stock = b.g.stock = 12000; b.w.crop = 0.7; run(a, 20); run(b, 20);
  assert.ok(b.g.price / a.g.price < 1.05, String(b.g.price / a.g.price));
});
test("cena chleba zmienia się płynnie (≤2%/dzień w górę)", () => {
  const s = S.newGame(7); let p = s.b.price; for (let i = 0; i < 1500; i++){ S.tick(s); assert.ok(s.b.price <= p * 1.0201); p = s.b.price; }
});
test("rozbicie inflacji sumuje się do inflacji", () => {
  const s = S.newGame(8); run(s, 400); const pi = s.m.pi; const sum = pi.expect + pi.demand + pi.energy + pi.food;
  assert.ok(Math.abs(sum - s.m.infl) < 1e-6, `${sum} vs ${s.m.infl}`);
});
test("kampania z wydarzeniami kończy się bez błędów dla kilku ziaren", () => {
  for (const seed of [11, 12, 13]){ const s = S.newGame(seed); while (!s.over) S.tick(s); assert.ok(s.monthly.length > 0); S.score(s); }
});
console.log(`${n} tests passed`);
