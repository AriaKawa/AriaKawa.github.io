import test from "node:test";
import assert from "node:assert/strict";
import * as E from "../engine.mjs";
import { attackTiming, unitPose } from "../animation.mjs";
test("animation follows stride distance and freezes with the simulation clock", () => {
  const u = {
    id: 1,
    clan: "rats",
    art: 0,
    size: 32,
    walked: 0,
    moving: true,
    hp: 100,
  };
  const frames = [];
  for (let i = 0; i < 8; i++) {
    u.walked = i * 3;
    frames.push(unitPose(u, 0).frame);
  }
  assert.deepEqual(frames, [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(unitPose(u, 0), unitPose(u, 99));
  u.moving = false;
  assert.deepEqual(unitPose(u, 2), unitPose(u, 2));
  u.back = true;
  u.moving = true;
  assert.equal(unitPose(u, 2).sheet, "back");
});
test("attack damage and projectiles wait for their painted release pose", () => {
  for (const type of ["rat", "scout", "mage", "king"]) {
    const own = E.newGame("rats", 7),
      enemy = E.newGame("wolves", 8);
    const sim = E.createBattle(E.snapshot(own), E.snapshot(enemy), 10),
      u = sim.units.find((x) => x.side === 0),
      v = sim.units.find((x) => x.side === 1);
    Object.assign(u, E.UNIT[type], {
      type,
      clan: "rats",
      hp: 100,
      maxHP: 100,
      x: 700,
      y: 400,
      cooldown: 0,
      cast: 100,
    });
    Object.assign(v, {
      hp: 10000,
      maxHP: 10000,
      x: 720,
      y: 400,
      cooldown: 100,
      cast: 100,
    });
    sim.units = [u, v];
    E.stepBattle(sim, 1 / 60);
    assert.equal(v.hp, 10000);
    assert.equal(sim.projectiles.length, 0);
    assert.ok(u.swing);
    const { windup } = attackTiming(u);
    let time = 0;
    while (time + 1 / 60 < windup - 1e-6) {
      E.stepBattle(sim, 1 / 60);
      time += 1 / 60;
      assert.equal(v.hp, 10000);
      assert.equal(sim.projectiles.length, 0);
    }
    for (let i = 0; i < 3; i++) E.stepBattle(sim, 1 / 60);
    assert.equal(u.swing, null);
    assert.ok(v.hp < 10000 || sim.projectiles.length > 0);
    assert.ok(unitPose(u, sim.time).frame >= 3);
  }
});
test("a unit killed during its wind-up cannot deliver a delayed attack", () => {
  const sim = E.createBattle(
      E.snapshot(E.newGame("rats", 7)),
      E.snapshot(E.newGame("wolves", 8)),
      10,
    ),
    u = sim.units.find((x) => x.side === 0),
    v = sim.units.find((x) => x.side === 1);
  sim.units = [u, v];
  Object.assign(u, { x: 700, y: 400, cooldown: 0, cast: 100 });
  Object.assign(v, { x: 720, y: 400, cooldown: 100, cast: 100 });
  E.stepBattle(sim, 1 / 60);
  const hp = v.hp;
  u.hp = 0;
  for (let i = 0; i < 30; i++) E.stepBattle(sim, 1 / 60);
  assert.equal(v.hp, hp);
});
import { makeRoads, roadGraph, roadRoute } from "../render.mjs";
test("units pursue directly across open ground without a central waypoint", () => {
  const own = E.newGame("rats", 7);
  const enemy = E.newGame("wolves", 8);
  const sim = E.createBattle(E.snapshot(own), E.snapshot(enemy), 10);
  const rat = sim.units.find((u) => u.side === 0);
  const wolf = sim.units.find((u) => u.side === 1);
  sim.units = [rat, wolf];
  Object.assign(rat, { x: 1000, y: 220 });
  Object.assign(wolf, { x: 800, y: 220 });
  E.stepBattle(sim, 0.05);
  assert.ok(rat.x < 1000);
  assert.ok(wolf.x > 800);
  assert.equal(rat.y, 220);
  assert.equal(wolf.y, 220);
});
test("every occupied plot has a perimeter and workers can reach every road node", () => {
  const roads = makeRoads(E.CELLS);
  assert.equal(roads.filter((p) => p.length === 7 && p[0] === p[6]).length, 37);
  const graph = roadGraph(roads),
    start = graph.keys().next().value;
  for (const destination of graph.keys()) {
    if (destination === start) continue;
    const route = roadRoute(graph, start, destination);
    assert.equal(route.at(-1), destination);
    let previous = start;
    for (const next of route) {
      assert.ok(graph.get(previous).neighbors.has(next));
      previous = next;
    }
  }
});
test("37 valid unique plots and connected roads", () => {
  assert.equal(E.CELLS.length, 37);
  const roads = makeRoads([
    { q: 0, r: 0 },
    ...E.CELLS.filter((c) => E.hexDistance(c, { q: 0, r: 0 }) === 3),
  ]);
  assert.ok(roads.length >= 36);
  for (const path of roads)
    for (const p of path)
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
});
test("shop always four cards with level rarity restrictions and reroll cost", () => {
  for (const clan of E.CLANS) {
    const s = E.newGame(clan, 1);
    for (let i = 0; i < 50; i++) {
      s.gold = 100;
      E.roll(s);
      assert.equal(s.gold, 98);
      assert.equal(s.shop.length, 4);
      assert.ok(s.shop.every((id) => E.definition(clan, id).cost <= 2));
    }
    s.gold = 1;
    const before = JSON.stringify(s.shop);
    assert.ok(E.roll(s));
    assert.equal(JSON.stringify(s.shop), before);
  }
});
test("shop upgrades the same building immediately and caps at three stars", () => {
  const s = E.newGame("rats");
  s.gold = 30;
  const b = s.buildings[0],
    uid = b.uid;
  s.shop = ["warren", "warren", "warren", "market"];
  assert.equal(E.buy(s, 0).upgraded, true);
  assert.equal(b.star, 2);
  assert.equal(b.uid, uid);
  assert.equal(b.q, 1);
  assert.equal(s.buildings.length, 2);
  assert.equal(E.buy(s, 1).upgraded, true);
  assert.equal(b.star, 3);
  assert.equal(E.sellPrice(s, b), 3);
  const gold = s.gold;
  assert.equal(E.buy(s, 2).error, "Maximum upgrade");
  assert.equal(s.gold, gold);
  assert.equal(s.shop[2], "warren");
  for (let i = 0; i < 30; i++) {
    s.gold = 100;
    E.roll(s);
    assert.ok(!s.shop.includes("warren"));
  }
});
test("full reserve allows upgrades but not another new type", () => {
  const s = E.newGame("wolves");
  s.gold = 30;
  s.buildings = E.CATALOG.wolves
    .slice(0, 8)
    .map((d) => E.makeBuilding(s, d.id));
  s.shop = ["well", "warren", null, null];
  assert.equal(E.buy(s, 0).error, "Reserve is full");
  assert.equal(E.buy(s, 1).upgraded, true);
  assert.equal(E.bench(s).length, 8);
});
test("legacy duplicates are refunded once and duplicate placement is blocked", () => {
  const s = E.newGame("rats");
  delete s.rules;
  s.gold = 10;
  s.buildings = [
    E.makeBuilding(s, "warren", 1, 0, 2),
    E.makeBuilding(s, "warren", 0, 1),
  ];
  const restored = E.restore(JSON.stringify(s));
  assert.equal(restored.buildings.length, 1);
  assert.equal(restored.buildings[0].star, 2);
  assert.equal(restored.gold, 12);
  assert.equal(E.restore(JSON.stringify(restored)).gold, 12);
  const duplicate = E.makeBuilding(restored, "warren");
  restored.buildings.push(duplicate);
  assert.match(E.place(restored, duplicate.uid, -1, 0), /Upgrade/);
});
test("army and support caps, swapping, headquarters, stash and selling", () => {
  const s = E.newGame("rats");
  const b = E.makeBuilding(s, "mage");
  s.buildings.push(b);
  assert.equal(E.place(s, b.uid, 1, -1), null);
  const extra = E.makeBuilding(s, "guard");
  s.buildings.push(extra);
  assert.match(E.place(s, extra.uid, 2, -1), /Army full/);
  assert.equal(E.place(s, extra.uid, 1, -1), null);
  assert.equal(b.q, null);
  assert.match(E.place(s, b.uid, 0, 0), /empty/);
  const g = s.gold;
  assert.equal(E.sell(s, b.uid), 3);
  assert.equal(s.gold, g + 3);
  assert.equal(E.stash(s, extra.uid), null);
  assert.equal(extra.q, null);
});
test("interest capped, starred economic income, streaks and settlement are applied once", () => {
  const s = E.newGame("rats");
  s.gold = 70;
  s.round = 4;
  s.streak = 3;
  s.buildings.push(E.makeBuilding(s, "farm", -1, 1, 2));
  s.phase = "battle";
  const r = E.settle(s, { winner: 0, survivors: 4 });
  assert.deepEqual(r.earnings, {
    base: 5,
    interest: 5,
    economy: 4,
    streak: 2,
    victory: 1,
  });
  assert.equal(s.gold, 87);
  assert.equal(s.wins, 1);
  assert.equal(E.settle(s, { winner: 0 }), null);
  assert.equal(s.gold, 87);
});
test("XP levels up, lock keeps sold slots, loss and game-over settle", () => {
  const s = E.newGame("wolves");
  s.gold = 20;
  s.xp = 4;
  E.buyXP(s);
  assert.equal(s.level, 4);
  assert.equal(s.xp, 2);
  s.shop = ["warren", null, "farm", "totem"];
  s.locked = true;
  s.phase = "battle";
  s.hp = 1;
  E.settle(s, { winner: 1, survivors: 2 });
  assert.equal(s.phase, "end");
  assert.equal(s.hp, 0);
  const t = E.newGame("wolves");
  t.shop = ["warren", null, "farm", "totem"];
  t.locked = true;
  t.phase = "battle";
  E.settle(t, { winner: 0 });
  E.nextRound(t);
  assert.deepEqual(t.shop, ["warren", null, "farm", "totem"]);
});
test("support buffs apply only to adjacent buildings and star upgrades scale units", () => {
  const s = E.newGame("rats");
  s.buildings = [
    E.makeBuilding(s, "warren", 1, 0, 2),
    E.makeBuilding(s, "well", 1, -1, 2),
    E.makeBuilding(s, "totem", -3, 0, 3),
  ];
  const enemy = E.makeOpponent(s),
    sim = E.createBattle(E.snapshot(s), enemy, 4);
  const rat = sim.units.find((u) => u.side === 0);
  assert.equal(rat.maxHP, 48 * 1.85 * 1.5);
  assert.equal(rat.rate, E.UNIT.rat.rate);
});
test("snapshot validation rejects duplicate plots, unknown types, invalid tiers and wrong round", () => {
  const s = E.newGame("rats");
  let snap = E.snapshot(s);
  assert.ok(E.validateSnapshot(snap, 1));
  assert.equal(E.validateSnapshot(snap, 2), null);
  snap.buildings.push({ ...snap.buildings[0] });
  assert.equal(E.validateSnapshot(snap, 1), null);
  snap = E.snapshot(s);
  snap.buildings[0].star = 4;
  assert.equal(E.validateSnapshot(snap, 1), null);
  snap = E.snapshot(s);
  snap.buildings[0].type = "<script>";
  assert.equal(E.validateSnapshot(snap, 1), null);
});
test("valid saves restore; corrupt saves are rejected", () => {
  const s = E.newGame("wolves");
  assert.ok(E.restore(JSON.stringify(s)));
  assert.equal(E.restore("{broken"), null);
  s.hp = null;
  assert.equal(E.restore(JSON.stringify(s)), null);
});
test("combat is deterministic, finite, and resolves both clans with all abilities", () => {
  for (const clan of E.CLANS) {
    const s = E.newGame(clan, 25);
    s.level = 8;
    s.round = 10;
    s.buildings = E.CATALOG[clan].map((d, i) =>
      E.makeBuilding(
        s,
        d.id,
        E.CELLS.filter((c) => c.q || c.r)[i].q,
        E.CELLS.filter((c) => c.q || c.r)[i].r,
        2,
      ),
    );
    const enemy = E.makeOpponent(s),
      a = E.simulate(E.snapshot(s), enemy, 42),
      b = E.simulate(E.snapshot(s), enemy, 42);
    assert.equal(a.done, true);
    assert.equal(a.winner, b.winner);
    assert.equal(a.time, b.time);
    assert.ok(
      a.units.every((u) => Number.isFinite(u.x) && Number.isFinite(u.hp)),
    );
    if (clan === "rats") assert.ok(a.summons[0] > 0);
  }
});
test("healthy complete campaigns reach a terminal result without economy errors", () => {
  for (const clan of E.CLANS) {
    const s = E.newGame(clan, 55);
    s.level = 8;
    s.buildings = E.CATALOG[clan].map((d, i) =>
      E.makeBuilding(
        s,
        d.id,
        E.CELLS.filter((c) => c.q || c.r)[i].q,
        E.CELLS.filter((c) => c.q || c.r)[i].r,
        3,
      ),
    );
    for (let round = 0; round < 25 && s.phase !== "end"; round++) {
      const enemy = E.makeOpponent(s);
      s.phase = "battle";
      E.settle(s, E.simulate(E.snapshot(s), enemy, s.seed + round));
      assert.ok(s.gold >= 0 && s.hp >= 0);
      if (s.phase === "result") E.nextRound(s);
    }
    assert.equal(s.phase, "end");
    assert.equal(s.wins, 10);
  }
});
