// Kontrola treści wszystkich przedmiotów: node makro-portal/content.test.mjs
import { readFileSync, existsSync } from "fs";
import vm from "vm";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const ctx = { window: {} }; vm.createContext(ctx);
const load = f => { const p = join(dir, f); if (existsSync(p)) vm.runInContext(readFileSync(p, "utf8"), ctx, { filename: f }); return existsSync(p); };
for (const f of ["glossary.js", "glossary-bank.js", "glossary-podatki.js", "glossary-inwest.js", "content.js", "content-bank.js", "content-podatki.js", "content-inwest.js"]) load(f);

const W = ctx.window, GL = W.GLOSSARY, TERM = new Map(GL.map(g => [g.id, g]));
const SUBJECTS = [{ ...W.COURSE, id: "makro" }, ...(W.SUBJECTS || [])];
let pass = 0, fail = 0;
const test = (name, fn) => { try { fn(); pass++; console.log("ok   " + name); } catch (e) { fail++; console.log("FAIL " + name + "\n     " + e.message); } };
const assert = (c, m) => { if (!c) throw new Error(m); };
const both = (o, where) => assert(o && typeof o.pl === "string" && o.pl.trim() && typeof o.ru === "string" && o.ru.trim(), "brak PL/RU: " + where);
// litery typowo polskie w tekście RU (poza nazwami własnymi w cudzysłowie i „zł”)
const PLCH = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/;
const ruLeaks = (s) => s.replace(/\[\[[^\]]*\]\]/g, "").replace(/„[^”]*”|«[^»]*»|\([^)]*\)|"[^"]*"/g, "").split(/\s+/).filter(w => PLCH.test(w) && !/^zł/.test(w));

test("glossary: unikalne id i komplet PL/RU", () => {
  const seen = new Set();
  for (const g of GL){ assert(!seen.has(g.id), "duplikat id " + g.id); seen.add(g.id); assert(/^[a-z0-9-]+$/.test(g.id), "zły id " + g.id);
    for (const l of ["pl", "ru"]) assert(g[l]?.n && g[l]?.s && g[l]?.l, "niepełne pojęcie " + g.id + "/" + l);
    for (const r of g.rel || []) assert(TERM.has(r), `pojęcie ${g.id}: brak powiązanego ${r}`); }
});
test("przedmioty: 4 i unikalne id", () => {
  const ids = SUBJECTS.map(s => s.id); assert(new Set(ids).size === ids.length, "duplikaty przedmiotów");
  assert(["makro", "bank", "podatki", "inwest"].every(x => ids.includes(x)), "brakuje przedmiotu: " + ids.join(","));
});
for (const X of SUBJECTS){
  test(`${X.id}: schemat wykładów i podtematów`, () => {
    if (X.id !== "makro") { both(X.name, X.id + ".name"); assert(X.examDate && X.icon, X.id + ": examDate/icon"); }
    assert(X.lectures.length > 0, "brak wykładów");
    const subIds = new Set();
    X.lectures.forEach((L, i) => {
      assert(L.n === i + 1, `${X.id}: numeracja wykładów ${L.n}`); both(L.title, `W${L.n}.title`); both(L.lead, `W${L.n}.lead`);
      assert(L.subs.length >= 2, `W${L.n}: mało podtematów`);
      L.subs.forEach((s, k) => {
        assert(s.id === `${L.n}.${k + 1}`, `id podtematu ${s.id} (oczekiwano ${L.n}.${k + 1})`); assert(!subIds.has(s.id), "duplikat " + s.id); subIds.add(s.id);
        both(s.title, s.id + ".title"); both(s.body, s.id + ".body");
        assert(s.quiz && s.quiz.length >= 3, `${s.id}: quiz < 3 pytań`);
      });
      assert(L.final && L.final.length >= 8, `W${L.n}: test końcowy < 8 pytań`);
    });
  });
  test(`${X.id}: pytania poprawne (4 odp., correct w zakresie, why)`, () => {
    const all = X.lectures.flatMap(L => [...L.final.map(q => [`W${L.n}-final`, q]), ...L.subs.flatMap(s => s.quiz.map(q => [s.id, q]))]);
    const pos = [0, 0, 0, 0, 0];
    for (const [w, q] of all){ both(q.q, w + " q"); assert(q.a.length >= 3, w + ": <3 odpowiedzi"); q.a.forEach((a, i) => both(a, `${w} a${i}`));
      assert(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.a.length, `${w}: correct poza zakresem`); both(q.why, w + " why"); pos[q.correct]++; }
    if (X.id !== "makro") assert(Math.max(...pos) / all.length < 0.6, `${X.id}: poprawna odpowiedź zbyt często na tej samej pozycji (${pos})`);
  });
  test(`${X.id}: każde [[pojęcie]] istnieje w słowniku`, () => {
    const miss = new Set();
    X.lectures.forEach(L => L.subs.forEach(s => ["pl", "ru"].forEach(l => [...s.body[l].matchAll(/\[\[([^\]|]+)/g)].forEach(m => { if (!TERM.has(m[1])) miss.add(s.id + ":" + m[1]); }))));
    assert(!miss.size, "brak w słowniku: " + [...miss].slice(0, 12).join(", "));
  });
  if (X.id !== "makro") test(`${X.id}: tekst RU bez polskich słów (poza nazwami)`, () => {
    const leaks = [];
    X.lectures.forEach(L => { [L.title.ru, L.lead.ru, ...L.subs.flatMap(s => [s.title.ru, s.body.ru, ...s.quiz.flatMap(q => [q.q.ru, q.why.ru, ...q.a.map(a => a.ru)])]), ...L.final.flatMap(q => [q.q.ru, q.why.ru, ...q.a.map(a => a.ru)])]
      .forEach(txt => leaks.push(...ruLeaks(txt))); });
    assert(leaks.length <= 15, `${leaks.length} polskich słów w RU, np.: ${[...new Set(leaks)].slice(0, 15).join(" ")}`);
  });
}
console.log(`\n${pass} ok, ${fail} błędów`);
process.exit(fail ? 1 : 0);
