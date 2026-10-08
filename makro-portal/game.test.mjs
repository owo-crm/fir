// Testy modelu gry „Nieurodzaj” v4: node makro-portal/game.test.mjs
import fs from "fs"; import vm from "vm"; import assert from "assert/strict";
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(new URL("./game.js", import.meta.url), "utf8"), ctx);
const M = ctx.window.BrainstormGame._model;
const near = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-6, `${msg}: ${a} vs ${b}`);
let n = 0; const test = (name, fn) => { fn(); n++; console.log("ok -", name); };

const policies = {
  nothing: () => {},
  cap5: st => { st.d.cap = 5; },
  tariff0: st => { st.d.tariff = 0; },
  dumpEarly: st => { st.d.tariff = 0; st.d.reserve = st.m < 2 ? 250 : 0; },
  saveForBlockade: st => { st.d.tariff = 0; st.d.reserve = M.BLOCKADE.includes(st.m) ? 170 : 0; },
  advisor: st => { Object.assign(st.d, M.bestPolicy(st).d); },
};
function play(policy, each){
  const st = M.newState();
  while (!st.done){ policy(st); const before = { ...st, d: { ...st.d } }; const { r } = M.advance(st); each?.(before, r, st); }
  return { st, g: M.grade(st) };
}

test("bilans: produkcja, sprzedaż, niedobór, zboże, rezerwa", () => {
  for (const p of Object.values(policies)) play(p, (b, r, after) => {
    near(r.grain, Math.max(1, r.harvest + r.imp + r.rel - r.buy), "grain balance");
    near(r.production, Math.min(r.grain, r.capacity), "production = min(grain, capacity)");
    near(r.sales, Math.min(r.demand, r.production), "sales = min(demand, production)");
    near(r.short, Math.max(r.demand - r.production, 0), "shortage = max(D - prod, 0)");
    near(after.stock, b.stock + r.buy - r.rel, "reserve next = cur + buy - rel");
    assert.ok(r.rel <= b.stock + 1e-9, "release <= stock");
  });
});

test("cena dochodzi do równowagi stopniowo (max 15%, 25% przy wstrząsie)", () => {
  for (const p of Object.values(policies)) play(p, (b, r) => {
    if (r.capped) return;
    const lim = (r.m === M.BLOCKADE[0] || r.w <= 0.8) ? 0.25 : 0.15;
    assert.ok(Math.abs(r.P - b.price) <= b.price * lim + 1e-9, `price jump ${b.price} -> ${r.P}`);
    if (Math.abs(r.Peq - b.price) > 0.05) assert.ok(Math.abs(r.P - r.Peq) < Math.abs(b.price - r.Peq), "moves toward equilibrium");
  });
});

test("cena maksymalna poniżej równowagi tworzy niedobór", () => {
  const st = M.newState(); const r = M.sim(st, { ...st.d, cap: 4.5 });
  assert.ok(r.capped && r.P === 4.5 && r.short > 0);
});

test("druga piekarnia: moc dopiero po ukończeniu budowy", () => {
  const st = M.newState(); M.startBuild(st, "piekarnia2");
  const caps = []; for (let i = 0; i < 4; i++){ caps.push(M.sim(st).capacity); M.advance(st); }
  assert.deepEqual(caps, [1000, 1000, 1000, 2000]);
});

test("nawadnianie: efekt narasta stopniowo", () => {
  const st = M.newState(); M.startBuild(st, "nawadnianie");
  const k = []; for (let i = 0; i < 5; i++){ k.push(st.irrig); M.advance(st); }
  assert.equal(k[0], 0); assert.equal(k[1], 0); assert.ok(k[2] > 0 && k[2] < 1); assert.equal(k[4], 1);
});

test("import reaguje na cło z opóźnieniem, blokada od razu", () => {
  const st = M.newState(); st.d.tariff = 0;
  const r = M.sim(st); assert.ok(r.imp > 100 && r.imp < r.impTarget);
  st.m = 2; st.imp = 400; assert.equal(M.sim(st).imp, 120);
});

test("doradca wybiera decyzje racjonalne, gdy takie istnieją", () => {
  play(policies.advisor, (b, r) => { if (M.bestPolicy(b).level < 2) assert.ok(r.rational, `month ${r.m + 1}`); });
});

test("„Dlaczego?”: główna przyczyna zgodna z danymi", () => {
  const st = M.newState(); st.m = 3; st.imp = 120;
  const r = M.sim(st), c = M.causes(st, r, a => a);
  assert.ok(c.up && ["harvest", "import"].includes(c.main.k), c.main?.k);
});

test("strategie: doradca najlepszy, cena maks. najgorsza", () => {
  const res = Object.fromEntries(Object.entries(policies).map(([k, p]) => [k, play(p).g]));
  for (const [k, g] of Object.entries(res)) console.log("  ", k.padEnd(16), "★" + g.stars, "rational", Math.round(g.rationalShare * 12) + "/12", "eff", Math.round(g.eff), "W", g.W.toFixed(1));
  assert.equal(res.advisor.stars, 3);
  for (const k of Object.keys(res)) if (k !== "advisor") assert.ok(res.advisor.W >= res[k].W, k);
  assert.ok(res.cap5.rationalShare < res.saveForBlockade.rationalShare);
  assert.ok(res.saveForBlockade.rationalShare > res.dumpEarly.rationalShare);
});
console.log(`${n} tests passed`);
