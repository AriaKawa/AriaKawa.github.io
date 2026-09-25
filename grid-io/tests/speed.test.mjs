import test from "node:test";
import assert from "node:assert/strict";
import { Arena, normalizeSpeed } from "../simulation.mjs";

function empty(speedPercent, mode = "360") {
  const a = new Arena({ seed: 18, bots: 0, food: 0, speedPercent, mode });
  a.food = [];
  a.rebuildFoodHash();
  Object.assign(a.player, { x: 0, z: 125, angle: 0, length: 200, grace: 0 });
  a.player.trail = a.initialTrail(a.player);
  return a;
}
function advance(a, n, input = {}) {
  for (let i = 0; i < n; i++) a.step(1 / 60, input);
}

test("speed defaults to 100 and rejects invalid or out-of-range saved values", () => {
  assert.equal(empty().speedPercent, 100);
  assert.equal(normalizeSpeed("125"), 125);
  assert.equal(normalizeSpeed("broken"), 100);
  assert.equal(normalizeSpeed(Infinity), 100);
  assert.equal(normalizeSpeed(-5), 0);
  assert.equal(normalizeSpeed(400), 300);
});
for (const mode of ["90", "360"]) {
  test(`${mode}: all riders travel at the selected percentage`, () => {
    for (const speedPercent of [1, 50, 100, 175, 300]) {
      const a = empty(speedPercent, mode);
      const bot = a.makeRider("Test", 1, false, { x: 0, z: 250 });
      Object.assign(bot, { grace: 0, think: 99, desired: 0 });
      advance(a, 60);
      for (const r of a.riders) {
        assert(r.alive);
        assert(Math.abs(r.x - (29 * speedPercent) / 100) < 1e-8);
        assert.equal(r.speed, (29 * speedPercent) / 100);
      }
      a.respawn(bot);
      assert.equal(bot.speed, (29 * speedPercent) / 100);
    }
  });
}
test("0 stops every rider, including boost, jumping and respawning", () => {
  const a = empty(0),
    bot = a.makeRider("Test", 1, false, { x: 0, z: 125 });
  assert.equal(a.jump(a.player), false);
  const before = a.riders.map((r) => ({ x: r.x, z: r.z, length: r.length }));
  advance(a, 120, { boost: true, angle: Math.PI / 2, jump: true });
  assert.deepEqual(
    a.riders.map((r) => ({ x: r.x, z: r.z, length: r.length })),
    before,
  );
  assert(a.riders.every((r) => r.alive && r.speed === 0));
  bot.alive = false;
  bot.respawn = 0.01;
  advance(a, 60);
  assert.equal(bot.alive, false);
  assert.equal(a.time, 0);
});
test("boost keeps its multiplier and trails stay collidable at 300 percent", () => {
  const a = empty(300);
  advance(a, 1, { boost: true });
  assert(Math.abs(a.player.speed - 29 * 3 * 1.72) < 1e-9);
  const wall = a.makeRider("Wall", 1, false, { x: 10, z: 134 });
  Object.assign(wall, {
    grace: 0,
    think: 99,
    desired: Math.PI / 2,
    angle: Math.PI / 2,
  });
  wall.trail = [
    { x: 10, z: 119, y: 0 },
    { x: 10, z: 122, y: 0 },
    { x: 10, z: 125, y: 0 },
    { x: 10, z: 128, y: 0 },
    { x: 10, z: 131, y: 0 },
    { x: 10, z: 134, y: 0 },
  ];
  advance(a, 8, { boost: true });
  assert.equal(a.player.alive, false);
});
test("slow and fast jumps retain raised trail sections after landing", () => {
  for (const speed of [1, 25, 300]) {
    const a = empty(speed);
    a.player.length = 300;
    // Isolate arch sampling from self-intersections when a very slow jump
    // descends through its own rising wall, using the normal spawn grace.
    a.player.grace = 3.5;
    a.jump(a.player);
    advance(a, 65, { boost: true });
    assert(a.player.alive);
    assert.equal(a.player.jump, 0);
    assert(a.player.trail.some((p) => p.y > 9));
    for (let i = 1; i < a.player.trail.length; i++) {
      const p = a.player.trail[i - 1],
        q = a.player.trail[i];
      assert(Math.hypot(q.x - p.x, q.z - p.z) <= 6);
    }
  }
});
