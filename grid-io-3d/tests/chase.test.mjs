import test from "node:test";
import assert from "node:assert/strict";
import { ChaseCamera, steeringAxis, steeringTarget, relativeTurn } from "../chase.mjs";
import { Arena, HALF, LANDMARKS, jumpHeight } from "../../grid-io/simulation.mjs";
import { LOOP, loopPoint } from '../terrain.mjs';

test('camera orbit remains independent underground and throughout an inverted loop',()=>{
 const poses=[{x:0,y:-24,z:310,angle:0,pitch:0,jump:0},...[.25,.5,.75].map(t=>({...loopPoint(LOOP.approach+LOOP.circle*t),loopS:LOOP.approach+LOOP.circle*t,jump:0}))];
 for(const rider of poses) {
   const camera=new ChaseCamera();camera.reset(rider);const locked=camera.update(rider,1/60);let orbit;
   for(let i=0;i<60;i++)orbit=camera.update(rider,1/60,{orbit:{x:1,y:-.7}});
   assert(Math.hypot(locked.x-orbit.x,locked.y-orbit.y,locked.z-orbit.z)>8);
   assert(Math.abs(camera.orbitX-.85)<.002);
   for(let i=0;i<100;i++)camera.update(rider,1/60);
   assert(Math.abs(camera.orbitX)<.001);
 }
});
test("relative steering keeps the original turn rate in all headings", () => {
  for (const heading of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    assert.equal(steeringTarget(heading, 0, 1 / 60), heading);
    assert(Math.abs(steeringTarget(heading, 1, 1 / 60) - heading - 2.9 / 60) < 1e-9);
    assert(Math.abs(steeringTarget(heading, -1, 1 / 60) - heading + 2.9 / 60) < 1e-9);
    assert.equal(relativeTurn(heading, 1) - heading, Math.PI / 2);
    assert.equal(relativeTurn(heading, -1) - heading, -Math.PI / 2);
  }
  assert.equal(steeringAxis(0.1), 0); assert.equal(steeringAxis(1), 1); assert.equal(steeringAxis(-1), -1);
});
test("camera follows behind and rear view looks back over the bike", () => {
  const camera = new ChaseCamera();
  for (const angle of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    const p = { x: 0, z: 125, angle, jump: 0 }; camera.reset(p);
    const pose = camera.update(p, 1 / 60);
    assert((pose.x - p.x) * Math.cos(angle) + (pose.z - p.z) * Math.sin(angle) < -20);
    assert(pose.y < 20);
    const rear = camera.update(p, 1 / 60, { lookBack: true });
    assert((rear.x - p.x) * Math.cos(angle) + (rear.z - p.z) * Math.sin(angle) > 20);
  }
});
test("camera follows jumps, wraps angles, and avoids boundary and reactor clipping", () => {
  const a = new Arena({ seed: 22, bots: 0, food: 0 }), camera = new ChaseCamera(), p = a.player;
  p.angle = Math.PI - 0.01; camera.reset(p); p.angle = -Math.PI + 0.01; camera.update(p, 1 / 60);
  assert(Math.abs(camera.heading - Math.PI) < 0.02);
  p.jump = 0.525; for (let i = 0; i < 60; i++) camera.update(p, 1 / 60);
  assert(Math.abs(camera.elevation - jumpHeight(p)) < 0.01);
  Object.assign(p, { x: -HALF + 1, z: 0, angle: 0, jump: 0 }); camera.reset(p);
  assert(camera.update(p, 1 / 60).x >= -HALF + 2);
  const o = LANDMARKS[0]; Object.assign(p, { x: o.x + o.r + 12, z: o.z, angle: 0 }); camera.reset(p);
  const pose = camera.update(p, 1 / 60); assert(pose.x > o.x + o.r + 3); assert(Number.isFinite(pose.y));
});
test("boost widens the view and reduced motion keeps a fixed field of view", () => {
  const p = { x: 0, z: 125, angle: 0, jump: 0, boost: true }, camera = new ChaseCamera(); camera.reset(p);
  let pose; for (let i = 0; i < 100; i++) pose = camera.update(p, 1 / 60);
  assert(pose.fov > 72); camera.reset(p);
  for (let i = 0; i < 100; i++) pose = camera.update(p, 1 / 60, { reducedMotion: true });
  assert.equal(pose.fov, 68);
});
