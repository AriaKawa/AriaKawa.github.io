import test from "node:test";
import assert from "node:assert/strict";
import {
  Arena,
  JUMP_DURATION,
  jumpHeight,
  LANDMARKS,
  WALL_HEIGHT,
  WALL_BOTTOM,
  trailDistance,
} from "../simulation.mjs";
import { LaserWalls } from "../laser-walls.js";

function arena(mode = "360") {
  const a = new Arena({ mode, seed: 91, bots: 0, food: 0 });
  a.food = [];
  a.rebuildFoodHash();
  Object.assign(a.player, { x: 0, z: 125, angle: 0, grace: 0, length: 150 });
  a.player.trail = a.initialTrail(a.player);
  return a;
}
function advance(a, n, input = {}) {
  for (let i = 0; i < n; i++) a.step(1 / 60, input);
}
function arch(mode = "360") {
  const a = arena(mode);
  a.jump(a.player);
  advance(a, 66);
  assert.equal(jumpHeight(a.player), 0);
  const peak = a.player.trail.reduce((p, q) => (q.y > p.y ? q : p));
  assert(peak.y > 10);
  return { a, peak };
}
function crossingRider(a, peak, airborne = false) {
  const r = a.makeRider("Crossing", 1, false, {
    x: peak.x,
    z: peak.z - (airborne ? 2.5 : 12),
  });
  Object.assign(r, {
    angle: Math.PI / 2,
    desired: Math.PI / 2,
    think: 99,
    grace: 0,
    cooldown: 99,
    jump: airborne ? JUMP_DURATION / 2 : 0,
  });
  r.trail = a.initialTrail(r);
  return r;
}
for (const mode of ["360", "90"]) {
  test(`${mode}: emitted arch stays raised after landing and permits a grounded crossing`, () => {
    const { a, peak } = arch(mode),
      original = { ...peak };
    const rival = crossingRider(a, peak);
    advance(a, 45);
    assert(rival.alive);
    assert(rival.z > peak.z + 8);
    assert(a.player.trail.includes(peak));
    assert.deepEqual(peak, original);
  });
}
test("the same crossing crashes into a ground-level trail or an arch at matching altitude", () => {
  const ground = arch();
  for (const p of ground.a.player.trail) p.y = 0;
  const grounded = crossingRider(ground.a, ground.peak);
  advance(ground.a, 40);
  assert.equal(grounded.alive, false);
  const raised = arch(),
    airborne = crossingRider(raised.a, raised.peak, true);
  advance(raised.a, 4);
  assert.equal(airborne.alive, false);
});
test("the arch and its collision disappear when that section passes the tail", () => {
  const { a, peak } = arch();
  const probe = { jump: JUMP_DURATION / 2 };
  a.rebuildTrails();
  assert.equal(a.trailAt(probe, peak.x, peak.z), a.player);
  advance(a, 360);
  assert(a.player.alive);
  assert(!a.player.trail.includes(peak));
  a.rebuildTrails();
  assert.equal(a.trailAt(probe, peak.x, peak.z), null);
});
test("low sloping legs block riders while the arch opening is clear", () => {
  const a = arena(),
    owner = a.makeRider("Arch", 1, false, { x: 100, z: 100 });
  owner.grace = 0;
  owner.trail = [
    { x: 10, y: 0, z: 0 },
    { x: 10, y: 4, z: 3 },
    { x: 10, y: 8, z: 6 },
    { x: 10, y: 10, z: 9 },
  ];
  a.rebuildTrails();
  assert.equal(a.trailAt(a.player, 10, 2), owner);
  assert.equal(a.trailAt(a.player, 10, 8), null);
  assert.equal(a.trailAt(a.player, 10, 8, 2.3, 9), owner);
});
test("laser geometry lifts both edges without filling the opening to the floor", () => {
  const walls = new LaserWalls(1);
  walls.segment(
    0,
    { x: 0, y: 4, z: 1 },
    { x: 3, y: 8, z: 1 },
    { r: 1, g: 0, b: 0 },
  );
  walls.finish(1);
  const ys = [1, 4, 7, 10].map((i) => walls.positions[i]);
  const expected = [
    4 + WALL_BOTTOM,
    4 + WALL_HEIGHT,
    8 + WALL_BOTTOM,
    8 + WALL_HEIGHT,
  ];
  ys.forEach((y, i) => assert(Math.abs(y - expected[i]) < 1e-5));
  assert.equal(walls.geometry.drawRange.count, 6);
  walls.geometry.dispose();
  walls.material.dispose();
});
test("90 turns instantly, records exact corners, and ignores direct reversals", () => {
  const a = arena("90");
  advance(a, 11);
  const corner = { x: a.player.x, z: a.player.z };
  advance(a, 1, { angle: Math.PI / 2 });
  assert.equal(a.player.angle, Math.PI / 2);
  assert.equal(a.player.x, corner.x);
  assert(a.player.trail.some((p) => p.x === corner.x && p.z === corner.z));
  advance(a, 15, { angle: -Math.PI / 2 });
  assert.equal(a.player.angle, Math.PI / 2);
  for (let i = 1; i < a.player.trail.length; i++) {
    const p = a.player.trail[i - 1],
      q = a.player.trail[i];
    assert(Math.abs(p.x - q.x) < 1e-8 || Math.abs(p.z - q.z) < 1e-8);
  }
});
test("90 retains lethal self collision around a rectangle", () => {
  const a = arena("90");
  a.player.length = 200;
  for (const angle of [0, Math.PI / 2, Math.PI, -Math.PI / 2])
    advance(a, 60, { angle });
  assert.equal(a.player.alive, false);
});
test("360 keeps gradual free steering", () => {
  const a = arena();
  advance(a, 1, { angle: Math.PI / 2 });
  assert(a.player.angle > 0 && a.player.angle < Math.PI / 2);
});
test("90 AI starts, turns, and respawns with axis-aligned trails", () => {
  const a = new Arena({ mode: "90", seed: 4, bots: 12, food: 100 });
  for (let i = 0; i < 600; i++) a.step(1 / 60);
  a.respawn(a.riders[1]);
  for (const r of a.riders) {
    assert(
      Math.abs(r.angle / (Math.PI / 2) - Math.round(r.angle / (Math.PI / 2))) <
        1e-8,
    );
    for (let i = 1; i < r.trail.length; i++) {
      const p = r.trail[i - 1],
        q = r.trail[i];
      assert(Math.abs(p.x - q.x) < 1e-7 || Math.abs(p.z - q.z) < 1e-7);
      assert(Number.isFinite(trailDistance(p, q)));
    }
  }
});
test("the center is empty in both the obstacle data and collision checks", () => {
  assert(!LANDMARKS.some((o) => Math.hypot(o.x, o.z) < o.r));
  assert.equal(arena().blocked(0, 0, 10), false);
});
