import { test } from "node:test";
import assert from "node:assert/strict";
import { parseBatch } from "./worker.js";

test("akceptuje poprawną paczkę i przycina wartości", () => {
  const b = parseBatch(JSON.stringify({ v: "abc-123456", lang: "ru", d: "m", e: [["view", "w1.2", 0], ["time", "w1.2", 99999], ["mini", "1.2", 250]] }));
  assert.equal(b.visitor, "abc-123456"); assert.equal(b.lang, "ru"); assert.equal(b.device, "m");
  assert.deepEqual(b.events.map(e => e.val), [0, 600, 100]);
});
test("odrzuca złe id i śmieci", () => {
  assert.equal(parseBatch("nie json"), null);
  assert.equal(parseBatch(JSON.stringify({ v: "<script>", e: [] })), null);
  assert.equal(parseBatch(JSON.stringify({ v: "abcdef", e: "x" })), null);
});
test("pomija nieznane typy i ogranicza liczbę zdarzeń", () => {
  const e = Array.from({ length: 100 }, () => ["view", "x".repeat(200), 0]).concat([["drop", "x", 1]]);
  const b = parseBatch(JSON.stringify({ v: "abcdef", e }));
  assert.equal(b.events.length, 60); assert.equal(b.events[0].page.length, 80);
});
