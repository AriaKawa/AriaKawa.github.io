import type { BuildPad, HordeRoute, InfestationPointDefinition, RoadNodeDefinition, RoadSegment, RoadsideLot, SpawnSourceKind, Territory, TownDefinition, Vec2, WorldStatic, ZombieSpawnpoint } from "./types";

export const CONTINENT_WIDTH = 6000;
export const CONTINENT_HEIGHT = 4000;

export const continentOutline: Vec2[] = [
  { x: 240, y: 980 }, { x: 410, y: 560 }, { x: 900, y: 320 }, { x: 1580, y: 250 },
  { x: 2240, y: 360 }, { x: 2920, y: 230 }, { x: 3560, y: 340 }, { x: 4300, y: 250 },
  { x: 5050, y: 350 }, { x: 5540, y: 630 }, { x: 5760, y: 1030 }, { x: 5650, y: 1450 },
  { x: 5790, y: 1940 }, { x: 5630, y: 2440 }, { x: 5720, y: 3180 }, { x: 5400, y: 3610 },
  { x: 4810, y: 3690 }, { x: 4200, y: 3560 }, { x: 3560, y: 3820 }, { x: 2930, y: 3660 },
  { x: 2300, y: 3860 }, { x: 1650, y: 3710 }, { x: 940, y: 3830 }, { x: 420, y: 3450 },
  { x: 220, y: 2880 }, { x: 300, y: 2280 }, { x: 180, y: 1640 }
];

const territory = (
  id: string, name: string, polygon: Vec2[], labelPoint: Vec2, state: Territory["state"], threatLevel: number,
  pressure: number, neighbors: string[]
): Territory => {
  const xs = polygon.map((point) => point.x); const ys = polygon.map((point) => point.y);
  const x = Math.min(...xs); const y = Math.min(...ys); const w = Math.max(...xs) - x; const h = Math.max(...ys) - y;
  return { id, name, polygon, labelPoint, x, y, w, h, state, threatLevel, pressure, infestation: state === "safe" ? 14 : state === "contested" ? 44 : state === "infested" ? 76 : 100, neighbors };
};

export const territoriesSeed: Territory[] = [
  territory("west-barrens", "West Barrens", [{ x: 240, y: 980 }, { x: 410, y: 560 }, { x: 1280, y: 330 }, { x: 1320, y: 1850 }, { x: 300, y: 2100 }, { x: 180, y: 1640 }], { x: 690, y: 930 }, "safe", 1, 18, ["prairie-line", "capitol-wastes"]),
  territory("prairie-line", "Prairie Line", [{ x: 1280, y: 330 }, { x: 2240, y: 360 }, { x: 2410, y: 1720 }, { x: 1320, y: 1850 }], { x: 1630, y: 670 }, "safe", 1, 16, ["west-barrens", "mark-twain", "capitol-wastes"]),
  territory("mark-twain", "Mark Twain Reach", [{ x: 2240, y: 360 }, { x: 2920, y: 230 }, { x: 3560, y: 340 }, { x: 3600, y: 1740 }, { x: 2410, y: 1720 }], { x: 2700, y: 650 }, "overrun", 5, 100, ["prairie-line", "hannibal-verge", "capitol-wastes", "black-river"]),
  territory("hannibal-verge", "Hannibal Verge", [{ x: 3560, y: 340 }, { x: 4300, y: 250 }, { x: 5050, y: 350 }, { x: 5000, y: 1760 }, { x: 3600, y: 1740 }], { x: 3900, y: 650 }, "overrun", 5, 100, ["mark-twain", "gateway-ruin", "black-river"]),
  territory("gateway-ruin", "Gateway Ruin", [{ x: 5050, y: 350 }, { x: 5540, y: 630 }, { x: 5760, y: 1030 }, { x: 5650, y: 1450 }, { x: 5790, y: 1940 }, { x: 5000, y: 1760 }], { x: 5070, y: 1040 }, "infested", 4, 82, ["hannibal-verge", "delta-ash"]),
  territory("capitol-wastes", "Capitol Wastes", [{ x: 300, y: 2100 }, { x: 1320, y: 1850 }, { x: 2410, y: 1720 }, { x: 2500, y: 2750 }, { x: 1180, y: 2820 }, { x: 220, y: 2880 }], { x: 900, y: 2250 }, "contested", 2, 42, ["west-barrens", "prairie-line", "mark-twain", "ozark-gate"]),
  territory("ozark-gate", "Ozark Gate", [{ x: 220, y: 2880 }, { x: 1180, y: 2820 }, { x: 2500, y: 2750 }, { x: 2300, y: 3860 }, { x: 1650, y: 3710 }, { x: 940, y: 3830 }, { x: 420, y: 3450 }], { x: 850, y: 3200 }, "contested", 3, 47, ["capitol-wastes", "black-river"]),
  territory("black-river", "Black River", [{ x: 2410, y: 1720 }, { x: 3600, y: 1740 }, { x: 3760, y: 2780 }, { x: 3560, y: 3820 }, { x: 2930, y: 3660 }, { x: 2300, y: 3860 }, { x: 2500, y: 2750 }], { x: 2750, y: 2250 }, "contested", 3, 51, ["mark-twain", "hannibal-verge", "capitol-wastes", "ozark-gate", "delta-ash"]),
  territory("delta-ash", "Delta Ash", [{ x: 3600, y: 1740 }, { x: 5000, y: 1760 }, { x: 5150, y: 2790 }, { x: 4810, y: 3690 }, { x: 4200, y: 3560 }, { x: 3560, y: 3820 }, { x: 3760, y: 2780 }], { x: 4050, y: 2240 }, "infested", 4, 78, ["hannibal-verge", "gateway-ruin", "black-river", "bootheel-front"]),
  territory("bootheel-front", "Bootheel Front", [{ x: 5000, y: 1760 }, { x: 5790, y: 1940 }, { x: 5630, y: 2440 }, { x: 5720, y: 3180 }, { x: 5400, y: 3610 }, { x: 4810, y: 3690 }, { x: 5150, y: 2790 }], { x: 5050, y: 2450 }, "overrun", 5, 100, ["gateway-ruin", "delta-ash"])
];

export const roadNodes: RoadNodeDefinition[] = [
  { id: "west-hospital", x: 300, y: 1260, kind: "infestation" }, { id: "west-gate", x: 700, y: 1420, kind: "hub" },
  { id: "prairie-rest", x: 1570, y: 1040, kind: "hub" }, { id: "capitol-ruins", x: 2820, y: 1510, kind: "hub" },
  { id: "mark-outpost", x: 3820, y: 1040, kind: "hub" }, { id: "north-bridge", x: 4450, y: 880, kind: "junction" },
  { id: "hannibal", x: 5080, y: 760, kind: "hub" }, { id: "east-tunnel", x: 5580, y: 980, kind: "infestation" },
  { id: "gateway", x: 5060, y: 1580, kind: "hub" }, { id: "river-factory", x: 5520, y: 2260, kind: "infestation" },
  { id: "delta-junction", x: 4470, y: 2780, kind: "hub" }, { id: "bootheel-camp", x: 5200, y: 3280, kind: "hub" },
  { id: "burned-mall", x: 5000, y: 3510, kind: "infestation" }, { id: "ozark-gate", x: 1260, y: 2960, kind: "hub" },
  { id: "black-river", x: 2920, y: 2860, kind: "hub" }, { id: "rustwater", x: 650, y: 2390, kind: "hub" },
  { id: "prairie-hospital", x: 2090, y: 650, kind: "infestation" }, { id: "dead-graveyard", x: 3410, y: 3500, kind: "infestation" },
  { id: "capitol-checkpoint", x: 2470, y: 2200, kind: "junction" }, { id: "radio-hill", x: 3780, y: 1570, kind: "landmark" },
  { id: "ashfall", x: 4080, y: 2260, kind: "junction" }, { id: "old-farm", x: 1510, y: 1910, kind: "landmark" },
  { id: "quarry", x: 2200, y: 3310, kind: "landmark" }, { id: "military-checkpoint", x: 4630, y: 2110, kind: "landmark" },
  { id: "grain-silo", x: 1160, y: 760, kind: "landmark" }, { id: "county-yard", x: 1820, y: 2470, kind: "landmark" },
  { id: "river-chapel", x: 3450, y: 2460, kind: "landmark" }, { id: "delta-farm", x: 4050, y: 3200, kind: "landmark" },
  { id: "north-checkpoint", x: 4520, y: 1320, kind: "landmark" }, { id: "bootheel-radio", x: 5480, y: 3000, kind: "landmark" }
];

const node = (id: string): Vec2 => { const found = roadNodes.find((entry) => entry.id === id); if (!found) throw new Error(`Unknown road node ${id}`); return { x: found.x, y: found.y }; };
const road = (id: string, label: string, kind: RoadSegment["kind"], nodeIds: string[], options: Partial<RoadSegment> = {}): RoadSegment => ({
  id, label, kind, nodeIds, points: nodeIds.map(node), width: kind === "highway" ? 18 : kind === "secondary" ? 12 : 7,
  roadClass: kind === "highway" ? "interstate_highway" : kind === "secondary" ? "state_highway" : "service_road",
  purpose: kind === "highway" ? "connect_city" : kind === "secondary" ? "rural_connector" : "service_spur",
  territoryId: "continent", lotEligible: kind !== "dirt", ...options
});

export const continentRoads: RoadSegment[] = [
  road("hwy-36", "HIGHWAY 36 // NORTHERN ARC", "highway", ["west-hospital", "west-gate", "prairie-rest", "capitol-ruins", "mark-outpost", "north-bridge", "hannibal", "east-tunnel"], { showLabel: true }),
  road("river-road", "RIVER ROAD // EASTERN SPINE", "highway", ["hannibal", "gateway", "river-factory", "bootheel-camp", "burned-mall"], { showLabel: true }),
  road("route-21", "ROUTE 21 // SOUTHERN CROSS", "highway", ["ozark-gate", "quarry", "black-river", "delta-junction", "bootheel-camp"], { showLabel: true }),
  road("sec-west-capitol", "Capitol Evacuation Road", "secondary", ["west-gate", "old-farm", "capitol-checkpoint", "capitol-ruins"]),
  road("sec-prairie-farm", "Prairie Farm Road", "secondary", ["prairie-rest", "old-farm", "rustwater"]),
  road("sec-capitol-black", "Black River Crossing", "secondary", ["capitol-ruins", "capitol-checkpoint", "black-river"]),
  road("sec-mark-capitol", "Signal Road", "secondary", ["mark-outpost", "radio-hill", "capitol-ruins"]),
  road("sec-mark-gateway", "Hannibal Cutoff", "secondary", ["mark-outpost", "north-checkpoint", "gateway"]),
  road("sec-gateway-delta", "Ashfall Road", "secondary", ["gateway", "military-checkpoint", "ashfall", "delta-junction"]),
  road("sec-west-ozark", "Ozark Service Route", "secondary", ["west-gate", "rustwater", "ozark-gate"]),
  road("sec-black-ash", "River Chapel Road", "secondary", ["black-river", "river-chapel", "ashfall"]),
  road("dirt-grain", "Grain Silo Track", "dirt", ["prairie-rest", "grain-silo"], { lotEligible: false }),
  road("dirt-hospital", "St. Mercy Access", "dirt", ["prairie-rest", "prairie-hospital"], { lotEligible: false, purpose: "zombie_source" }),
  road("dirt-county", "County Yard Track", "dirt", ["old-farm", "county-yard"], { lotEligible: false }),
  road("dirt-north-check", "Checkpoint Service Lane", "dirt", ["north-bridge", "north-checkpoint"], { lotEligible: false }),
  road("dirt-graveyard", "Graveyard Track", "dirt", ["black-river", "dead-graveyard"], { lotEligible: false, purpose: "zombie_source" }),
  road("dirt-delta-farm", "Delta Farm Road", "dirt", ["delta-junction", "delta-farm"], { lotEligible: false }),
  road("dirt-boot-radio", "Bootheel Radio Track", "dirt", ["bootheel-camp", "bootheel-radio"], { lotEligible: false })
];

export const towns: TownDefinition[] = [
  { id: "town-west-gate", name: "Ashfall", x: 700, y: 1420, territoryId: "west-barrens", kind: "checkpoint" },
  { id: "town-rustwater", name: "Rustwater", x: 650, y: 2390, territoryId: "capitol-wastes", kind: "gas_station" },
  { id: "town-prairie", name: "Prairie Rest", x: 1570, y: 1040, territoryId: "prairie-line", kind: "town" },
  { id: "town-capitol", name: "Capitol Ruins", x: 2820, y: 1510, territoryId: "mark-twain", kind: "city" },
  { id: "town-mark", name: "Mark Twain Outpost", x: 3820, y: 1040, territoryId: "hannibal-verge", kind: "radio_tower" },
  { id: "town-hannibal", name: "Hannibal Verge", x: 5080, y: 760, territoryId: "gateway-ruin", kind: "town" },
  { id: "town-gateway", name: "Gateway Ruin", x: 5060, y: 1580, territoryId: "gateway-ruin", kind: "city" },
  { id: "town-ozark", name: "Ozark Gate", x: 1260, y: 2960, territoryId: "ozark-gate", kind: "checkpoint" },
  { id: "town-black", name: "Black River Crossing", x: 2920, y: 2860, territoryId: "black-river", kind: "bridge" },
  { id: "town-delta", name: "Delta Junction", x: 4470, y: 2780, territoryId: "delta-ash", kind: "town" },
  { id: "town-bootheel", name: "Bootheel Camp", x: 5200, y: 3280, territoryId: "bootheel-front", kind: "checkpoint" }
];

export const infestationPoints: InfestationPointDefinition[] = [
  { id: "inf-west-hospital", name: "St. Agnes Ward", x: 300, y: 1260, territoryId: "west-barrens", nodeId: "west-hospital", kind: "hospital" },
  { id: "inf-prairie-hospital", name: "St. Mercy Overflow", x: 2090, y: 650, territoryId: "prairie-line", nodeId: "prairie-hospital", kind: "hospital" },
  { id: "inf-east-tunnel", name: "Collapsed River Tunnel", x: 5580, y: 980, territoryId: "gateway-ruin", nodeId: "east-tunnel", kind: "tunnel" },
  { id: "inf-factory", name: "River Chemical Works", x: 5520, y: 2260, territoryId: "bootheel-front", nodeId: "river-factory", kind: "factory" },
  { id: "inf-graveyard", name: "Black River Cemetery", x: 3410, y: 3500, territoryId: "black-river", nodeId: "dead-graveyard", kind: "graveyard" },
  { id: "inf-mall", name: "Burned Delta Mall", x: 5000, y: 3510, territoryId: "bootheel-front", nodeId: "burned-mall", kind: "mall" }
];

function pointInPolygon(point: Vec2, polygon: Vec2[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i]; const b = polygon[j];
    if ((a.y > point.y) !== (b.y > point.y) && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

function distanceToSegment(point: Vec2, a: Vec2, b: Vec2): number {
  const dx = b.x - a.x; const dy = b.y - a.y; const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / Math.max(1, dx * dx + dy * dy)));
  return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
}

function roadBlocked(position: Vec2, radius: number): boolean {
  return continentRoads.some((candidate) => candidate.points.slice(1).some((point, index) => distanceToSegment(position, candidate.points[index], point) < candidate.width / 2 + radius + 8));
}

function padsFor(id: string, core: Vec2, tangent: Vec2, outward: Vec2): BuildPad[] {
  const positions = [{ along: -72, away: 34 }, { along: 72, away: 34 }, { along: -116, away: 112 }, { along: 116, away: 112 }, { along: -62, away: 194 }, { along: 62, away: 194 }];
  return positions.map((offset, index) => ({ id: `${id}-pad-${index + 1}`, x: core.x + tangent.x * offset.along + outward.x * offset.away, y: core.y + tangent.y * offset.along + outward.y * offset.away, radius: 28, kind: "tower" }));
}

export function createContinentLots(): RoadsideLot[] {
  const results: RoadsideLot[] = []; let counter = 1;
  for (const candidateRoad of continentRoads.filter((candidate) => candidate.lotEligible)) {
    candidateRoad.points.slice(1).forEach((b, segmentIndex) => {
      const a = candidateRoad.points[segmentIndex]; const dx = b.x - a.x; const dy = b.y - a.y; const length = Math.hypot(dx, dy);
      if (length < 430) return;
      const tangent = { x: dx / length, y: dy / length }; const interval = candidateRoad.kind === "highway" ? 540 : 475;
      for (let distance = interval * .52; distance < length - interval * .34; distance += interval) {
        const entrance = { x: a.x + tangent.x * distance, y: a.y + tangent.y * distance };
        const sideSign = (counter + segmentIndex) % 2 ? 1 : -1; const outward = { x: -tangent.y * sideSign, y: tangent.x * sideSign };
        const offset = candidateRoad.width / 2 + 116; const core = { x: entrance.x + outward.x * offset, y: entrance.y + outward.y * offset };
        const owningTerritory = territoriesSeed.find((entry) => entry.polygon && pointInPolygon(core, entry.polygon));
        const id = `lot-${String(counter).padStart(2, "0")}`; const pads = padsFor(id, core, tangent, outward);
        const insideTerritory = Boolean(owningTerritory?.polygon && pads.every((pad) => pointInPolygon(pad, owningTerritory.polygon!)));
        const overlapsLot = results.some((entry) => Math.hypot(entry.x - core.x, entry.y - core.y) < 270);
        if (owningTerritory && insideTerritory && !overlapsLot && !roadBlocked(core, 62) && pads.every((pad) => !roadBlocked(pad, pad.radius))) {
          results.push({ id, territoryId: owningTerritory.id, roadSegmentId: candidateRoad.id, x: core.x, y: core.y, w: 180, h: 120, side: sideSign > 0 ? "right" : "left", status: owningTerritory.state === "overrun" ? "overrun" : "empty", nearbyRoadPoint: entrance, entrancePoint: entrance, drivewayPoints: [entrance, { x: entrance.x + outward.x * 58, y: entrance.y + outward.y * 58 }, core], pads });
        }
        counter += 1;
      }
    });
  }
  return results;
}

type GraphEdge = { to: string; roadId: string; points: Vec2[]; distance: number };
function graphEdges(excludeRoadId?: string): Map<string, GraphEdge[]> {
  const graph = new Map<string, GraphEdge[]>();
  for (const candidate of continentRoads) {
    if (candidate.id === excludeRoadId || !candidate.nodeIds?.length) continue;
    for (let index = 1; index < candidate.nodeIds.length; index++) {
      const from = candidate.nodeIds[index - 1]; const to = candidate.nodeIds[index]; const points = [candidate.points[index - 1], candidate.points[index]];
      const distance = Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
      graph.set(from, [...(graph.get(from) ?? []), { to, roadId: candidate.id, points, distance }]);
      graph.set(to, [...(graph.get(to) ?? []), { to: from, roadId: candidate.id, points: [...points].reverse(), distance }]);
    }
  }
  return graph;
}

type RoadPath = { points: Vec2[]; roadIds: string[]; distance: number };
export type ContractLayout = { spawnpoints: ZombieSpawnpoint[]; routes: HordeRoute[]; buildPads: BuildPad[]; routeDanger: number };

function shortestRoadPath(startNodeId: string, targetNodeId: string): RoadPath | undefined {
  const graph = graphEdges(); const distances = new Map<string, number>([[startNodeId, 0]]); const paths = new Map<string, Vec2[]>([[startNodeId, [node(startNodeId)]]]); const roads = new Map<string, string[]>([[startNodeId, []]]); const queue = [startNodeId];
  while (queue.length) {
    queue.sort((a, b) => (distances.get(a) ?? Infinity) - (distances.get(b) ?? Infinity)); const current = queue.shift()!;
    if (current === targetNodeId) return { points: paths.get(current)!, roadIds: roads.get(current)!, distance: distances.get(current)! };
    for (const edge of graph.get(current) ?? []) {
      const nextDistance = distances.get(current)! + edge.distance; if (nextDistance >= (distances.get(edge.to) ?? Infinity)) continue;
      distances.set(edge.to, nextDistance); paths.set(edge.to, [...paths.get(current)!, ...edge.points.slice(1)]); roads.set(edge.to, [...roads.get(current)!, edge.roadId]); queue.push(edge.to);
    }
  }
  return undefined;
}

function polylineLength(points: Vec2[]): number { return points.slice(1).reduce((sum, point, index) => sum + Math.hypot(point.x - points[index].x, point.y - points[index].y), 0); }
function appendUnique(points: Vec2[], additions: Vec2[]): Vec2[] { const result = [...points]; for (const point of additions) { const previous = result.at(-1); if (!previous || Math.hypot(previous.x - point.x, previous.y - point.y) > 1) result.push({ x: point.x, y: point.y }); } return result; }
function sourceKind(kind: InfestationPointDefinition["kind"]): SpawnSourceKind { return kind === "hospital" ? "hospital_ruin" : kind === "factory" ? "factory_ruin" : kind === "tunnel" ? "tunnel" : kind === "graveyard" ? "graveyard" : kind === "mall" || kind === "hive" ? "zombie_hive" : "infested_town"; }

type ContractRouteCandidate = { source: InfestationPointDefinition; points: Vec2[]; roadIds: string[]; distance: number };

function routeFromSource(lot: RoadsideLot, source: InfestationPointDefinition): ContractRouteCandidate | undefined {
  const accessRoad = continentRoads.find((candidate) => candidate.id === lot.roadSegmentId); if (!accessRoad?.nodeIds?.length) return undefined;
  let segmentIndex = 0; let nearest = Infinity;
  accessRoad.points.slice(1).forEach((point, index) => { const distance = distanceToSegment(lot.entrancePoint, accessRoad.points[index], point); if (distance < nearest) { nearest = distance; segmentIndex = index; } });
  const choices = [segmentIndex, segmentIndex + 1].map((pointIndex) => {
    const endpointNodeId = accessRoad.nodeIds![pointIndex]; const path = shortestRoadPath(source.nodeId, endpointNodeId); if (!path) return undefined;
    const points = appendUnique(path.points, [accessRoad.points[pointIndex], lot.entrancePoint, ...(lot.drivewayPoints?.slice(1) ?? [{ x: lot.x, y: lot.y }])]);
    const roadIds = [...path.roadIds]; if (roadIds.at(-1) !== accessRoad.id) roadIds.push(accessRoad.id);
    return { source, points, roadIds, distance: polylineLength(points) };
  }).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  return choices.sort((a, b) => a.distance - b.distance)[0];
}

export function defenseContractSeed(value: string): number { let hash = 2166136261; for (let index = 0; index < value.length; index++) { hash ^= value.charCodeAt(index); hash = Math.imul(hash, 16777619); } return hash >>> 0; }
function seededUnit(seed: number, salt: string): number { return defenseContractSeed(`${seed}:${salt}`) / 0xffffffff; }

function curvedFieldRoute(lot: RoadsideLot, source: InfestationPointDefinition, seed: number, index: number): ContractRouteCandidate {
  const angle = seededUnit(seed, `angle-${index}`) * Math.PI * 2;
  const length = 1000 + seededUnit(seed, `length-${index}`) * 120;
  const bend = (seededUnit(seed, `bend-${index}`) - .5) * 220;
  const curved = Array.from({length:17}, (_, i) => {
    const t = 1-i/16, offset = Math.sin(t*Math.PI)*bend;
    return {x:lot.x+Math.cos(angle)*length*t-Math.sin(angle)*offset, y:lot.y+Math.sin(angle)*length*t+Math.cos(angle)*offset};
  });
  return { source, points: curved, roadIds: [], distance: polylineLength(curved) };
}

function sampleFromRouteEnd(points: Vec2[], distanceFromEnd: number): { point: Vec2; tangent: Vec2; routeIndex: number } | undefined {
  let remaining = distanceFromEnd;
  for (let index = points.length - 1; index > 0; index--) {
    const a = points[index - 1]; const b = points[index]; const length = Math.hypot(b.x - a.x, b.y - a.y); if (length < 1) continue;
    if (remaining <= length) { const t = (length - remaining) / length; return { point: { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }, tangent: { x: (b.x - a.x) / length, y: (b.y - a.y) / length }, routeIndex: index - 1 }; }
    remaining -= length;
  }
  return undefined;
}

function contractPads(contractId: string, lot: RoadsideLot, route: HordeRoute, difficulty: number, seed: number): BuildPad[] {
  const desired = Math.max(8, Math.min(12, 12 - Math.floor(difficulty / 2))); const pads: BuildPad[] = [];
  for (let candidateIndex = 0; candidateIndex < 42 && pads.length < desired; candidateIndex++) {
    const sample = sampleFromRouteEnd(route.points, Math.min(165, route.routeLength * .2) + candidateIndex * Math.min(62, Math.max(24, (route.routeLength-100)/24))); if (!sample) break;
    const preferredSide = seededUnit(seed, `pad-side-${candidateIndex}`) > .5 ? 1 : -1; let placed = false;
    for (const side of [preferredSide, -preferredSide]) {
      const distanceToRoute = 62 + seededUnit(seed, `pad-offset-${candidateIndex}-${side}`) * 28; const normal = { x: -sample.tangent.y * side, y: sample.tangent.x * side };
      const position = { x: sample.point.x + normal.x * distanceToRoute, y: sample.point.y + normal.y * distanceToRoute };
      if (Math.hypot(position.x - lot.x, position.y - lot.y) < 108 || roadBlocked(position, 18) || pads.some((pad) => Math.hypot(pad.x - position.x, pad.y - position.y) < 68)) continue;
      pads.push({ id: `${contractId}-pad-${pads.length + 1}`, contractId, x: position.x, y: position.y, radius: 24, kind: "tower", distanceToRoute, routeIndex: sample.routeIndex }); placed = true; break;
    }
    if (!placed && candidateIndex > 24 && pads.length < 8) continue;
  }
  return pads;
}

export function validateDefenseContractLayout(lot: RoadsideLot, layout: ContractLayout): string[] {
  const errors: string[] = []; const roadIds = new Set(continentRoads.map((entry) => entry.id));
  if (!layout.spawnpoints.length) errors.push("no spawnpoints"); if (!layout.routes.length) errors.push("no horde routes"); if (layout.buildPads.length < 8) errors.push(`only ${layout.buildPads.length} build pads`);
  for (const route of layout.routes) {
    const spawnpoint = layout.spawnpoints.find((entry) => entry.id === route.spawnpointId); if (!spawnpoint) errors.push(`${route.id}: missing spawnpoint`);
    if (route.routeLength < (lot.worldX !== undefined ? 100 : 900) || route.routeLength > 6500) errors.push(`${route.id}: invalid length ${Math.round(route.routeLength)}`);
    if (route.roadIds.some((id) => !roadIds.has(id))) errors.push(`${route.id}: disconnected road graph`);
    const end = route.points.at(-1); if (!end || Math.hypot(end.x - lot.x, end.y - lot.y) > 12) errors.push(`${route.id}: does not reach base`);
  }
  for (const pad of layout.buildPads) { if ((pad.distanceToRoute ?? 0) < 42 || (pad.distanceToRoute ?? 0) > 100) errors.push(`${pad.id}: invalid route offset`); }
  return errors;
}

export function generateDefenseContractLayout(lot: RoadsideLot, difficulty: number, contractId: string, seed: number, routeField?: (points: Vec2[]) => Vec2[]): ContractLayout {
  const strategicField = lot.worldX !== undefined && lot.worldY !== undefined;
  const rawCandidates = strategicField
    ? infestationPoints.map((source, index) => curvedFieldRoute(lot, source, seed, index))
    : infestationPoints.map((source) => routeFromSource(lot, source)).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const validCandidates = rawCandidates.filter((entry) => entry.distance >= 900 && entry.distance <= 6500); const candidates = (validCandidates.length ? validCandidates : rawCandidates).sort((a, b) => {
    const aScore = Math.abs(a.distance - 2700) / 2700 + seededUnit(seed, a.source.id) * .42; const bScore = Math.abs(b.distance - 2700) / 2700 + seededUnit(seed, b.source.id) * .42; return aScore - bScore;
  });
  const selected: ContractRouteCandidate[] = [];
  for (const candidate of candidates) {
    try {
      const points = strategicField && routeField ? routeField(candidate.points) : candidate.points;
      const distance = polylineLength(points);
      if (strategicField && (distance > 1650 || distance < 100)) continue;
      selected.push({...candidate, points, distance}); break;
    } catch { /* Try another deterministic approach when terrain blocks this one. */ }
  }
  if (strategicField && !selected.length) throw new Error("No clear deployment approach nearby");
  if (!selected.length) { const fallback = infestationPoints[0]; const points = [fallback, lot.entrancePoint, ...(lot.drivewayPoints?.slice(1) ?? [{ x: lot.x, y: lot.y }])]; selected.push({ source: fallback, points, roadIds: [lot.roadSegmentId], distance: polylineLength(points) }); }
  const spawnpoints: ZombieSpawnpoint[] = []; const routes: HordeRoute[] = [];
  selected.forEach((candidate, index) => {
    const spawnpointId = `${contractId}-spawn-${index + 1}`; const routeId = `${contractId}-route-${index + 1}`; const routeDanger = Math.max(1, Math.min(5, Math.round(difficulty * .72 + candidate.distance / 1900)));
    const spawn = candidate.points[0]; const finalApproach = candidate.points.at(-2) ?? { x: lot.x, y: lot.y };
    spawnpoints.push({ id: spawnpointId, contractId, name: strategicField ? `${candidate.source.name} Roamers` : candidate.source.name, kind: sourceKind(candidate.source.kind), worldX: spawn.x, worldY: spawn.y, roadId: candidate.roadIds[0] ?? "field-path", threatLevel: routeDanger, distanceToBase: candidate.distance });
    routes.push({ id: routeId, contractId, spawnpointId, roadIds: [...new Set(candidate.roadIds)], points: candidate.points, routeDanger, routeLength: candidate.distance, finalApproachPoint: { ...finalApproach } });
  });
  const routeDanger = Math.max(...routes.map((entry) => entry.routeDanger)); const buildPads = contractPads(contractId, lot, routes[0], difficulty, seed); const layout = { spawnpoints, routes, buildPads, routeDanger };
  const errors = validateDefenseContractLayout(lot, layout); if (errors.length) console.warn(`DefenseContract ${contractId} validation: ${errors.join(", ")}`);
  return layout;
}

export function routeForLot(lot: RoadsideLot): { infestationId: string; points: Vec2[] } {
  const layout = generateDefenseContractLayout(lot, 2, `preview-${lot.id}`, defenseContractSeed(lot.id)); const route = layout.routes[0]; const spawnpoint = layout.spawnpoints.find((entry) => entry.id === route.spawnpointId);
  return { infestationId: infestationPoints.find((entry) => entry.name === spawnpoint?.name)?.id ?? infestationPoints[0].id, points: route.points };
}

export const continentWorld: WorldStatic = { worldWidth: CONTINENT_WIDTH, worldHeight: CONTINENT_HEIGHT, territories: territoriesSeed, roads: continentRoads, outline: continentOutline, roadNodes, towns, infestations: infestationPoints };
