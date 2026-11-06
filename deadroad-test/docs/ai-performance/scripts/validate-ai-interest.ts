import assert from 'node:assert/strict';
import { LocalSimulation } from '../client/src/net/LocalSimulation';
import { TACTICAL_MAP_SCALE } from '../client/src/game/AmericasTheater';
import type { AiRequest, AiResponse } from '../client/src/net/AiSimulationProtocol';
import { emptyAiFrame } from '../client/src/net/AiSimulationProtocol';

let now = 1800000000000;
Date.now = () => now;
Object.defineProperty(globalThis, 'performance', { value: { now: () => now } });
Object.assign(globalThis, { window: { setInterval: () => 0, setTimeout: () => 0, clearInterval: () => {}, clearTimeout: () => {} }, sessionStorage: { getItem: () => null, setItem: () => {} } });
const host = new LocalSimulation('Host', () => {}, () => {}, true);
for (let i = 0; i < 4; i++) host.addAiConvoy();
const reference = { anchor: { x: 3000, y: 2000 }, origin: { x: 0, y: 0 } };
let full = emptyAiFrame();
for (let step = 0; step < 2400; step++) { now += 50; full = host.advanceAiFrame(reference); }
assert.equal(full.players.length, 4);
assert(full.towers.length > 0 && full.contracts.length > 0);
const far = host.advanceAiFrame(reference, { left: -10000, top: -10000, right: -5000, bottom: -5000, detail: true }, false);
assert.equal(far.bases.length, full.bases.length);
assert.equal(far.players.length, 4);
assert.equal(far.towers.length + far.zombies.length + far.contracts.length + far.lots.length, 0);
const base = full.bases.find(b => full.contracts.some(c => c.baseId === b.id))!;
const near = host.advanceAiFrame(reference, { left: base.worldX! - 6000, top: base.worldY! - 6000, right: base.worldX! + 6000, bottom: base.worldY! + 6000, detail: true }, false);
assert(near.contracts.some(c => c.baseId === base.id));
for (const tower of near.towers) assert(full.towers.some(t => t.id === tower.id && t.x === tower.x && t.y === tower.y));
const shiftedReference = { anchor: { x: 20, y: 40 }, origin: { x: 1000, y: 2000 } };
const shifted = host.advanceAiFrame(shiftedReference, undefined, false);
for (const t of shifted.towers) {
  const before = full.towers.find(b => b.id === t.id)!;
  assert(Math.abs(t.x - before.x - (20 - 3000 - 1000 / TACTICAL_MAP_SCALE)) < 1e-8);
}
const overview = host.advanceAiFrame(reference, { left: 0, top: 0, right: 1e9, bottom: 1e9, detail: false }, false);
assert.equal(overview.contracts.length, 0);
assert.equal(overview.players.length, 4);

// Transport backpressure and clear must prevent delayed replies reviving removed AI.
const sent: AiRequest[] = [];
const worker = { postMessage: (m: AiRequest) => sent.push(m), terminate: () => {}, onmessage: (_: { data: AiResponse }) => {}, onerror: () => {} };
let state: any;
const client = new LocalSimulation('Player', s => { state = s; }, () => {});
client.enableAiWorker(worker as unknown as Worker);
for (let i = 0; i < 110; i++) client.addAiConvoy();
assert.equal(sent.filter(m => m.type === 'step').length, 1, 'multiple in-flight requests');
const first = sent[0] as Extract<AiRequest, { type: 'step' }>;
client.clearAiConvoys();
worker.onmessage({ data: { generation: first.generation, reference: first.reference, frame: full, elapsedMs: 1 } });
(client as any).emit();
assert.equal(state.players.length, 1, 'stale worker response revived cleared AI');
client.addAiConvoy();
assert.equal(sent.filter(m => m.type === 'step').length, 2, 'clear left request permanently blocked');
client.dispose();
console.log(JSON.stringify({ commanders: 4, fullBytes: JSON.stringify(full).length, distantBytes: JSON.stringify(far).length, restoredTowers: near.towers.length, checks: 'camera interest, overview, coordinate remapping, request backpressure, stale clear replies, restart' }));
