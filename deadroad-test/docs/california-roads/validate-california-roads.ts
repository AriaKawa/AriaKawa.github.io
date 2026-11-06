import assert from "node:assert/strict";
import { continentWorld, createContinentLots } from "../client/src/game/continentData.ts";
import { createEarthGlobeWorld } from "../client/src/globe/EarthGlobeData.ts";
import { planetThreeHighways } from "../client/src/game/roadEditor/PlanetThreeHighways.ts";
import { LOWER_48_TACTICAL_RING } from "../client/src/map/AmericasCountryGeometry.ts";
import { PlanetOneReferenceMap } from "../client/src/game/roadEditor/PlanetOneReferenceMap.ts";
const world = createEarthGlobeWorld(continentWorld, createContinentLots());
const before = JSON.stringify(world.roads);
const roads = planetThreeHighways(world.roads);
const inside = (lat: number, lon: number) => {
  let hit = false;
  const ring = LOWER_48_TACTICAL_RING;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x, y] = ring[i], [xx, yy] = ring[j];
    if ((y > lat) !== (yy > lat) && lon < (xx - x) * (lat - y) / (yy - y) + x) hit = !hit;
  }
  return hit;
};
const changed = roads.filter(road => JSON.stringify(road.pointLatLon) !== JSON.stringify(world.roads.find(r => r.id === road.id)!.pointLatLon));
for (const road of changed) for (let i = 1; i < road.pointLatLon.length; i++) {
  const a = road.pointLatLon[i - 1], b = road.pointLatLon[i];
  for (let s = 0; s <= 100; s++) {
    const lat = a.lat + (b.lat - a.lat) * s / 100, lon = a.lon + (b.lon - a.lon) * s / 100;
    assert(inside(lat, lon), `${road.id} leaves rendered land at ${lat},${lon}`);
  }
}
assert(!roads.some(r => r.id === "usa-i5-04"));
const route = (id: string) => roads.find(r => r.id === id)!.pointLatLon;
const touches = (a: string, b: string) => route(a).some(p => route(b).some(q => p.lat === q.lat && p.lon === q.lon));
for (const pair of [["usa-i5-03", "usa-i5-05"], ["usa-i5-03", "usa-i10-01"], ["usa-i10-01", "usa-i15-01"], ["usa-i15-01", "usa-i40-01"], ["usa-i80-01", "usa-i5-03"]]) assert(touches(pair[0], pair[1]), `Missing junction ${pair}`);
assert(!touches("usa-i15-01", "usa-i5-05"), "Border diagonal returned");
assert.equal(JSON.stringify(world.roads), before, "Planet 1 data mutated");
const reference = new PlanetOneReferenceMap(world.roads);
assert.equal(reference.roads.length, roads.length);
assert.deepEqual(reference.snapRoads.map(r => r.points), reference.roads.map(r => r.points));
console.log(`California valid: ${changed.length} corrected corridors, all sampled segments on rendered land, shared junctions and snap geometry verified.`);
