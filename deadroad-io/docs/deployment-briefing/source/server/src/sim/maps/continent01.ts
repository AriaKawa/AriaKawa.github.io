import type { BuildPad, InfestationPointDefinition, RoadNodeDefinition, RoadSegment, RoadsideLot, Territory, TownDefinition, Vec2, WorldStatic } from "../types.js";

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
  road("dirt-hospital", "St. Mercy Access", "dirt", ["prairie-rest", "prairie-hospital"], { lotEligible: false }),
  road("dirt-county", "County Yard Track", "dirt", ["old-farm", "county-yard"], { lotEligible: false }),
  road("dirt-north-check", "Checkpoint Service Lane", "dirt", ["north-bridge", "north-checkpoint"], { lotEligible: false }),
  road("dirt-graveyard", "Graveyard Track", "dirt", ["black-river", "dead-graveyard"], { lotEligible: false }),
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

function shortestInfestationRoute(targetNodeId: string, excludeRoadId: string): { infestationId: string; points: Vec2[]; distance: number } | undefined {
  const graph = graphEdges(excludeRoadId); const distances = new Map<string, number>(); const paths = new Map<string, Vec2[]>(); const origins = new Map<string, string>(); const queue: string[] = [];
  for (const infestation of infestationPoints) { distances.set(infestation.nodeId, 0); paths.set(infestation.nodeId, [{ x: infestation.x, y: infestation.y }]); origins.set(infestation.nodeId, infestation.id); queue.push(infestation.nodeId); }
  while (queue.length) {
    queue.sort((a, b) => (distances.get(a) ?? Infinity) - (distances.get(b) ?? Infinity)); const current = queue.shift()!;
    if (current === targetNodeId) return { infestationId: origins.get(current)!, points: paths.get(current)!, distance: distances.get(current)! };
    for (const edge of graph.get(current) ?? []) {
      const nextDistance = distances.get(current)! + edge.distance;
      if (nextDistance >= (distances.get(edge.to) ?? Infinity)) continue;
      distances.set(edge.to, nextDistance); origins.set(edge.to, origins.get(current)!); paths.set(edge.to, [...paths.get(current)!, ...edge.points.slice(1)]); queue.push(edge.to);
    }
  }
  return undefined;
}

export function routeForLot(lot: RoadsideLot, variant = 0): { infestationId: string; points: Vec2[] } {
  const candidateRoad = continentRoads.find((candidate) => candidate.id === lot.roadSegmentId);
  if (!candidateRoad?.nodeIds?.length) return { infestationId: infestationPoints[0].id, points: [infestationPoints[0], lot.entrancePoint, { x: lot.x, y: lot.y }] };
  let segmentIndex = 0; let bestDistance = Infinity;
  candidateRoad.points.slice(1).forEach((point, index) => { const distance = distanceToSegment(lot.entrancePoint, candidateRoad.points[index], point); if (distance < bestDistance) { bestDistance = distance; segmentIndex = index; } });
  const fromNodeId = candidateRoad.nodeIds[segmentIndex]; const toNodeId = candidateRoad.nodeIds[segmentIndex + 1];
  const fromRoute = shortestInfestationRoute(fromNodeId, candidateRoad.id); const toRoute = shortestInfestationRoute(toNodeId, candidateRoad.id);
  const fromPoint = candidateRoad.points[segmentIndex]; const toPoint = candidateRoad.points[segmentIndex + 1];
  const fromCost = (fromRoute?.distance ?? Infinity) + Math.hypot(lot.entrancePoint.x - fromPoint.x, lot.entrancePoint.y - fromPoint.y);
  const toCost = (toRoute?.distance ?? Infinity) + Math.hypot(lot.entrancePoint.x - toPoint.x, lot.entrancePoint.y - toPoint.y);
  const from = variant % 2 ? fromCost > toCost : fromCost <= toCost; const selected = from ? fromRoute : toRoute; const endpoint = from ? fromPoint : toPoint;
  if (!selected) return { infestationId: infestationPoints[0].id, points: [infestationPoints[0], lot.entrancePoint, { x: lot.x, y: lot.y }] };
  return { infestationId: selected.infestationId, points: [...selected.points, endpoint, lot.entrancePoint, { x: lot.x, y: lot.y }] };
}

export const continentWorld: WorldStatic = { worldWidth: CONTINENT_WIDTH, worldHeight: CONTINENT_HEIGHT, territories: territoriesSeed, roads: continentRoads, outline: continentOutline, roadNodes, towns, infestations: infestationPoints };
