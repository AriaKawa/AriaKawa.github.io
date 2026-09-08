import assert from 'node:assert/strict';
import { portalPlacement, PORTAL_ROAD_WIDTH } from '../client/src/game/PortalPlacement';
const spawn = { x: 135, y: -92 };
for (let degrees = 0; degrees < 360; degrees++) {
  const heading = degrees * Math.PI / 180;
  const dx = Math.cos(heading), dy = Math.sin(heading);
  const next = { x: spawn.x + dx * 80, y: spawn.y + dy * 80 };
  const pose = portalPlacement(spawn, [spawn, spawn, next]);
  const across = { x: pose.right.x - pose.left.x, y: pose.right.y - pose.left.y };
  assert.ok(Math.abs(across.x * dx + across.y * dy) < 1e-9, `perpendicular ${degrees}`);
  assert.ok(Math.abs(Math.hypot(across.x, across.y) - PORTAL_ROAD_WIDTH) < 1e-9);
  assert.ok(Math.abs(-Math.sin(pose.angle) - dx) < 1e-9 && Math.abs(Math.cos(pose.angle) - dy) < 1e-9);
  assert.deepEqual(portalPlacement(spawn, [{ x: spawn.x - dx * 50, y: spawn.y - dy * 50 }, spawn, next]), pose);
}
assert.ok(Number.isFinite(portalPlacement(spawn, []).angle));
assert.ok(Number.isFinite(portalPlacement(spawn, [spawn, spawn]).angle));
const wide = portalPlacement({ x: 0, y: 0 }, [{ x: 0, y: 0 }, { x: 0, y: 100 }], 80);
assert.equal(Math.hypot(wide.right.x - wide.left.x, wide.right.y - wide.left.y), 80);
console.log('Portal placement: all 360 headings, road widths, repeated points and degenerate routes passed.');
