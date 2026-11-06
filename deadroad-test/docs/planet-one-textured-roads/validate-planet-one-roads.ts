import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { USA_ANCHORS } from "../client/src/game/roadEditor/CuratedUSARoadLayer.ts";
import { planetOneAuthoredRoads as curatedUSARoads } from "../client/src/game/roadEditor/PlanetOneRoadNetwork.ts";
import { createExport, parseRoadEditorExport, sampleCatmullRom, validateRoads } from "../client/src/game/roadEditor/RoadEditorData.ts";
import { compileRoadNetwork } from "../client/src/game/roadEditor/RoadNetworkGeometry.ts";
import { theaterLatLon } from "../client/src/game/AmericasTheater.ts";
import { LOWER_48_TACTICAL_RING } from "../client/src/map/AmericasCountryGeometry.ts";
import { continentWorld, createContinentLots } from "../client/src/game/continentData.ts";
import { createEarthGlobeWorld } from "../client/src/globe/EarthGlobeData.ts";

const planet1 = createEarthGlobeWorld(continentWorld, createContinentLots());
const before = JSON.stringify(planet1);
const roads = curatedUSARoads();
assert(roads.length >= 15 && roads.length <= 35);
assert.equal(new Set(roads.map(r => r.id)).size, roads.length);
assert(roads.every(r => r.source === "manual_editor" && !r.locked && r.visible && ["highway", "major_road"].includes(r.roadClass)));
assert.deepEqual(validateRoads(roads), []);
const exported = createExport(roads, "2026-09-05T00:00:00.000Z");
assert.deepEqual(parseRoadEditorExport(JSON.stringify(exported)).roads, roads);
const independent = curatedUSARoads(); independent[0].points[0].x += 100; independent[0].tags!.push("test");
assert.notDeepEqual(independent, roads); assert.deepEqual(curatedUSARoads(), roads);
assert.equal(JSON.stringify(planet1), before, "Planet 1 mutated");

const inside = (lat: number, lon: number) => {
  let hit = false; const ring = LOWER_48_TACTICAL_RING;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [x,y] = ring[i], [xx,yy] = ring[j];
    if ((y > lat) !== (yy > lat) && lon < (xx-x) * (lat-y) / (yy-y) + x) hit = !hit;
  }
  return hit;
};
const outside: string[] = [];
for (const r of roads) for (const point of sampleCatmullRom(r.points, 100)) {
  const {lat,lon} = theaterLatLon(point);
  if (!inside(lat,lon)) outside.push(`${r.id}: ${lat.toFixed(3)}, ${lon.toFixed(3)}`);
}
assert.equal(outside.length, 0, `Splines leave schematic land (${outside.length} samples): ${outside.filter((_,i) => i % 20 === 0).join("; ")}`);

const network = compileRoadNetwork(roads);
const adjacency = new Map(network.nodes.map(n => [n.id, new Set<string>()]));
for (const e of network.edges) { adjacency.get(e.start)!.add(e.end); adjacency.get(e.end)!.add(e.start); }
const visited = new Set<string>(); const pending = [network.nodes[0].id];
while (pending.length) { const id = pending.pop()!; if (visited.has(id)) continue; visited.add(id); pending.push(...adjacency.get(id)!); }
assert.equal(visited.size, network.nodes.length, "Disconnected corridors in sampled spline graph");
const excessive = network.nodes.filter(n => n.edges.length > 4);
assert.equal(excessive.length, 0, JSON.stringify(excessive.map(n => ({...theaterLatLon(n), arms:n.edges.length, roads:n.edges.map(i=>network.edges[i].roadId)}))));
const metros: Record<string, number> = {};
for (const name of ["stLouis", "kc", "chicago", "la", "atlanta", "newYork"] as const) {
  const anchor = USA_ANCHORS[name];
  const node = network.nodes.find(n => Math.hypot(n.x-anchor.x, n.y-anchor.y) < .01);
  assert(node && node.edges.length >= 3 && node.edges.length <= 4, `${name} must be one simple 3–6 arm junction`);
  metros[name] = node.edges.length;
  const nearby = network.nodes.filter(n => n.edges.length > 2 && Math.hypot(n.x-anchor.x,n.y-anchor.y) < 250);
  assert.equal(nearby.length, 1, `${name} has extra junctions within the metro anchor area`);
}
for (const id of ["i5","i10","i15","i25","i40","i70","i80","i90-west","i90-east","i35","i55","i65","i75","i95"]) assert(roads.some(r => r.id === `curated-usa-${id}`));
const source = await readFile(new URL("../client/src/game/roadEditor/CuratedUSARoadLayer.ts", import.meta.url), "utf8");
assert(!/Math\.random|generateRoad|RoadStamp/.test(source));
await writeFile(new URL("../docs/curated-usa/planet-one-usa.json", import.meta.url), JSON.stringify(exported, null, 2));
console.log(JSON.stringify({roads: roads.length, controlPoints: roads.reduce((n,r)=>n+r.points.length,0), connected: true, onLand: true, metros, exportRoundTrip: true, maxIntersectionArms: Math.max(...network.nodes.map(n => n.edges.length)), worldDataStable: true}, null, 2));


