import { SceneryWorld } from "../client/src/game/SceneryWorld";
import { theaterLatLon, TACTICAL_MAP_SCALE } from "../client/src/game/AmericasTheater";
import assert from "node:assert/strict";
import { LocalSimulation } from "../client/src/net/LocalSimulation";
import { earthTerritoryAt } from "../client/src/globe/EarthTerritories";
import type { Snapshot } from "../client/src/game/types";

const count = process.argv.includes("--100") ? 100 : 8;
let now = 1800000000000;
Date.now = () => now;
Object.defineProperty(globalThis, "performance", { value: { now: () => now } });
Object.assign(globalThis, { window: { setInterval: () => 0, setTimeout: () => 0 }, sessionStorage: { getItem: () => null, setItem: () => {} } });
let state: Snapshot;
const sim = new LocalSimulation("Tester", s => { state = s; }, () => {});
const internal = sim as any;
internal.emit();
assert.equal(state!.bases.length, 0);
assert.equal(state!.warOperations.length, 0);
const lot = state!.lots.find(l => l.status === "empty")!;
sim.deploy(lot.id, false, { planetId: "earth", regionId: "earth-us-ks", regionName: "Kansas", centerLat: 38, centerLon: -98, worldX: 123000, worldY: 103000, threatLevel: 2, infestation: 30, state: "contested" });
const human = structuredClone(state!.players[0]);
if (process.argv.includes("--scenery")) {
  const scenery = new SceneryWorld([], [], p => { const ll = theaterLatLon(p); return earthTerritoryAt(ll.lat, ll.lon)?.group === "usa"; });
  sim.setScenery(scenery, p => p, p => p, TACTICAL_MAP_SCALE);
}
for (let i = 0; i < count; i++) sim.addAiConvoy();
assert.equal(state!.players.length, count + 1);
assert.equal(new Set(state!.bases.map(b => b.id)).size, count + 1);
for (const op of state!.warOperations.filter(o => o.isAI)) assert.equal(earthTerritoryAt(op.visibleLat!, op.visibleLon!)?.group, "usa");
const startingPositions = state!.bases.filter(b => b.isAI).map(b => [b.coreX, b.coreY]);
let mostContracts = 0, mostTowers = 0, mostZombies = 0, maxWave = 0;
const start = process.hrtime.bigint();
for (let step = 0; step < 6000; step++) {
  now += 50; internal.tick();
  mostContracts = Math.max(mostContracts, state!.contracts.length);
  mostTowers = Math.max(mostTowers, state!.towers.length);
  mostZombies = Math.max(mostZombies, state!.zombies.length);
  maxWave = Math.max(maxWave, ...state!.contracts.map(c => c.waveIndex));
  if (step % 100 === 0) {
    const ids = new Set(state!.bases.map(b => b.id));
    for (const tower of state!.towers) assert(ids.has(tower.baseId));
    for (const contract of state!.contracts) assert(ids.has(contract.baseId));
  }
}
assert(mostContracts >= 6, `Only ${mostContracts} bots deployed`);
assert(mostTowers >= 16, `Only ${mostTowers} towers built`);
assert(mostZombies > 0, "No actual zombies simulated");
assert(maxWave >= 2, "Bots failed to progress through waves");
assert.equal(state!.players[0].scrap, human.scrap, "AI rewards leaked to human");
assert.equal(state!.bases.find(b => !b.isAI)?.id, human.baseId, "AI death removed human base");
assert.notDeepEqual(state!.bases.filter(b => b.isAI).map(b => [b.coreX, b.coreY]), startingPositions);
sim.clearAiConvoys();
assert.equal(state!.players.length, 1); assert.equal(state!.bases.length, 1);
assert.equal(state!.contracts.length, 0); assert.equal(state!.towers.length, 0); assert.equal(state!.zombies.length, 0);
console.log(JSON.stringify({ simulatedSeconds: 300, bots: count, mostContracts, mostTowers, mostZombies, maxWave, elapsedMs: Number(process.hrtime.bigint() - start) / 1e6 }));

