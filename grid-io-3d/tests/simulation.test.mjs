import test from "node:test";
import assert from "node:assert/strict";
import {
  Arena,
  BASE_LENGTH,
  JUMP_DURATION,
  JUMP_COOLDOWN,
  jumpHeight,
  HALF,
} from "../simulation.mjs";
function clean() {
  const a = new Arena({ seed: 7, bots: 0, food: 0 });
  a.food = [];
  a.rebuildFoodHash();
  Object.assign(a.player, { x: 0, z: 125, grace: 0 });
  a.player.trail = a.initialTrail(a.player);
  return a;
}
function step(a, n, input = {}) {
  for (let i = 0; i < n; i++) a.step(1 / 60, input);
}
function laser(a) {
  const rival = a.makeRider("Test rival", 1, false, { x: 8, z: 129 });
  rival.angle = Math.PI / 2;
  rival.grace = 0;
  rival.trail = [
    { x: 8, z: 120 },
    { x: 8, z: 123 },
    { x: 8, z: 126 },
    { x: 8, z: 129 },
  ];
  rival.think = 99;
  return rival;
}
test("energy pickups grow the trail and record peak length", () => {
  const a = clean(),
    start = a.player.length;
  a.addFood(1, 125, 4, 0);
  a.rebuildFoodHash();
  step(a, 1);
  assert(a.player.length > start);
  assert.equal(a.player.peak, a.player.length);
});
test("boost spends length and cannot consume the base trail", () => {
  const a = clean();
  a.player.length = 70;
  step(a, 60, { boost: true });
  assert(a.player.x > 40);
  assert(a.player.length < 70);
  step(a, 240, { boost: true });
  assert(a.player.length >= BASE_LENGTH);
  assert.equal(a.player.boost, false);
});
test("enemy laser collision kills grounded riders and credits owner", () => {
  const a = clean(),
    r = laser(a);
  step(a, 17);
  assert.equal(a.player.alive, false);
  assert.equal(r.kills, 1);
  assert(a.food.length > 0);
});
test("jump height clears the same laser, with cooldown and landing", () => {
  const a = clean();
  laser(a);
  assert(a.jump(a.player));
  assert(!a.jump(a.player));
  step(a, 20);
  assert(jumpHeight(a.player) > 3);
  assert(a.player.alive);
  step(a, 50);
  assert.equal(a.player.jump, 0);
  assert(a.player.cooldown > 0);
  step(a, 280);
  assert(a.jump(a.player));
});
test("a rider looping into their own trail dies without earning an elimination", () => {
  const a = clean();
  a.player.length = 140;
  let death;
  for (let i = 0; i < 240 && a.player.alive; i++)
    death =
      a.step(1 / 60, { angle: i * 0.05 }).find((e) => e.type === "death") ||
      death;
  assert.equal(a.player.alive, false);
  assert.equal(death.reason, "self");
  assert.equal(death.killer, a.player);
  assert.equal(a.player.kills, 0);
  assert(a.food.length > 0);
});
test("the newly emitted attachment never kills a rider travelling forward", () => {
  const a = clean();
  step(a, 600);
  assert(a.player.alive);
  assert(a.player.x > 280);
});
function selfCrossing(a) {
  const corners = [
      { x: 8, z: 119 },
      { x: 8, z: 133 },
      { x: -8, z: 133 },
      { x: -8, z: 125 },
      { x: 0, z: 125 },
    ],
    points = [];
  for (let i = 1; i < corners.length; i++) {
    const start = corners[i - 1],
      end = corners[i],
      n = Math.ceil(Math.hypot(end.x - start.x, end.z - start.z) / 2);
    for (let j = 0; j < n; j++)
      points.push({
        x: start.x + ((end.x - start.x) * j) / n,
        z: start.z + ((end.z - start.z) * j) / n,
      });
  }
  points.push(corners.at(-1));
  a.player.trail = points;
  a.player.length = 100;
}
test("jump clears your own wall, while the same grounded crossing kills", () => {
  const grounded = clean();
  selfCrossing(grounded);
  step(grounded, 20);
  assert(!grounded.player.alive);
  const airborne = clean();
  selfCrossing(airborne);
  airborne.jump(airborne.player);
  step(airborne, 20);
  assert(airborne.player.alive);
  assert(jumpHeight(airborne.player) > 3.1);
});
test("boundary remains lethal while jumping", () => {
  const a = clean();
  a.player.x = HALF - 1;
  a.player.jump = JUMP_DURATION / 2;
  step(a, 1);
  assert(!a.player.alive);
});
test("large arena stays populated and simulations remain finite over five minutes", () => {
  const a = new Arena({ seed: 4 });
  for (let i = 0; i < 18000; i++) a.step(1 / 60, { angle: i * 0.009 });
  assert.equal(a.riders.length, 41);
  assert(a.food.length <= 8200);
  assert(a.riders.filter((r) => r.alive).length > 25);
  for (const r of a.riders) {
    assert(Number.isFinite(r.x + r.z + r.angle + r.length));
    assert(r.length >= BASE_LENGTH);
    assert(r.trail.length < 650);
  }
  assert(a.time > 299);
});
