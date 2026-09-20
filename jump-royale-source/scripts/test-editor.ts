import assert from 'node:assert/strict';
import { MAPS, levelForMap } from '../server/src/sim/maps';
import { stepPlayer } from '../server/src/sim/physics';
import { updateMovingPlatforms } from '../server/src/sim/platforms';
import { clone, createDraft, DraftHistory, LIBRARY_KEY, movePlatform, parseDraft, readLibrary, saveDraft } from '../client/src/editor/maps';
import { EditorSimulation } from '../client/src/editor/simulation';

const idle = () => ({ left: false, right: false, up: false, down: false, jumpHeld: false, seq: 0 });
for (const map of MAPS) {
  const original = levelForMap(map.id), serialized = JSON.stringify(original);
  const draft = createDraft(map.id), restored = parseDraft(JSON.stringify(draft));
  assert.deepEqual(restored, draft, `${map.id} import/export is stable`);
  assert.equal(restored.platforms.length, original.length);
  const sim = new EditorSimulation(draft);
  // Compare each simulation tick to the normal game's actual movement functions.
  const normal = clone(sim.player), platforms = clone(sim.platforms);
  for (let tick = 0; tick < 180; tick++) {
    const input = { ...idle(), right: tick > 20 && tick < 80, jumpHeld: tick > 30 && tick < 55 };
    const elapsed = sim.elapsed + 1 / 30;
    updateMovingPlatforms(platforms, elapsed * 1000);
    normal.input = clone(input);
    stepPlayer(normal, platforms, 1 / 30, { ...sim.world, time: elapsed });
    sim.step(clone(input));
    if(normal.y>sim.world.height){assert.equal(sim.deaths,1,'Crossing the fixed bottom retries even outside the original sides');break;}
    assert.equal(sim.player.x, normal.x, `${map.id} horizontal movement at ${tick}`);
    assert.equal(sim.player.y, normal.y, `${map.id} vertical movement at ${tick}`);
  }
  assert.equal(JSON.stringify(levelForMap(map.id)), serialized, 'Original map is unchanged');
  assert.deepEqual(draft, restored, 'Playtesting never mutates the draft');
}

const draft = createDraft('forge');
const sim = new EditorSimulation(draft), ferry = sim.platforms.find(p => p.type === 'moving')!;
sim.placeOn(ferry); sim.setRetry(); sim.reset();
for (let i = 0; i < 60; i++) sim.step({ ...idle(), jumpHeld: i < 20, right: true });
const first = clone({ player: sim.player, platforms: sim.platforms, elapsed: sim.elapsed });
sim.reset();
for (let i = 0; i < 60; i++) sim.step({ ...idle(), jumpHeld: i < 20, right: true });
assert.deepEqual({ player: sim.player, platforms: sim.platforms, elapsed: sim.elapsed }, first, 'Retry repeats moving-platform timing exactly');
sim.player.crumblingPlatforms = { crumb: .7 };
sim.setRetry(); sim.player.crumblingPlatforms.crumb = 0; sim.reset();
assert.equal(sim.player.crumblingPlatforms!.crumb, .7);
sim.toggleFlight(); sim.teleport(300, 700); sim.step({ ...idle(), up: true });
assert.ok(sim.player.y < 700); sim.toggleFlight();
assert.equal(sim.flying, false); assert.equal(sim.player.vy, 0); assert.equal(sim.player.grounded, false);
sim.setRetry(); const retry = clone(sim.retryPoint); sim.teleport(200, sim.world.height - 1);
sim.hazards = true; sim.hazardY = 0; sim.step(idle());
assert.equal(sim.deaths, 1); assert.deepEqual(sim.retryPoint, retry);
assert.equal(sim.player.x, retry.x);

const moving = clone(draft.platforms.find(p => p.type === 'moving')!);
const baseX = moving.baseX!; movePlatform(moving, moving.x + 88, moving.y - 40);
assert.equal(moving.baseX, baseX + 88, 'Moving platform path moves with its object');
const history = new DraftHistory(), before = clone(draft); draft.platforms.splice(2, 1);
history.record(before, draft); assert.deepEqual(history.undo(draft), before); assert.deepEqual(history.redo(before), draft);

const storage = new Map<string, string>();
const memory = { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => { storage.set(k, v); } };
saveDraft(draft, memory); assert.equal(readLibrary(memory).length, 1);
draft.name = 'Updated'; saveDraft(draft, memory); assert.equal(readLibrary(memory).length, 1); assert.equal(readLibrary(memory)[0].name, 'Updated');
memory.setItem(LIBRARY_KEY, '{corrupt'); assert.throws(() => saveDraft(draft, memory)); assert.equal(memory.getItem(LIBRARY_KEY), '{corrupt', 'Corrupt storage is not overwritten');
assert.throws(() => parseDraft(JSON.stringify({ ...draft, version: 2 })));
assert.throws(() => parseDraft(JSON.stringify({ ...draft, platforms: [{ ...draft.platforms[0], x: 'NaN' }] })));
assert.throws(() => parseDraft(JSON.stringify({ ...draft, platforms: [draft.platforms[0], draft.platforms[0]] })));
assert.throws(() => parseDraft(JSON.stringify({ ...draft, platforms: [{ ...draft.platforms[0], bucket: {left:.9,right:.2,depth:2} }] })));
assert.throws(() => parseDraft(JSON.stringify({ ...draft, platforms: [{ ...draft.platforms[0], type:'moving',movePeriodMs:0 }] })));
assert.throws(() => parseDraft('x'.repeat(2_000_001)));
const unsafe = JSON.parse(JSON.stringify(draft)); unsafe.script = '<script>bad()</script>'; unsafe.platforms[0].onload = 'bad()';
const safe = parseDraft(JSON.stringify(unsafe)); assert.ok(!('script' in safe)); assert.ok(!('onload' in safe.platforms[0]));
console.log('Map Workshop: six-map physics parity, deterministic retries, draft isolation, editing history, persistence, and import validation passed.');
