import polygonClipping, { type MultiPolygon, type Pair, type Polygon } from "polygon-clipping";
import { sampleCatmullRom, type AuthoredRoad, type EditorPoint } from "./RoadEditorData";

// Renderer-independent local metric coordinates. Globe adapters project into a
// local tile before compilation; neither geographic data nor editor state lives here.
export type NetworkNode = EditorPoint & { id: string; edges: number[] };
export type NetworkEdge = { roadId: string; start: string; end: string; width: number; a: EditorPoint; b: EditorPoint };
export type CompiledNetwork = { nodes: NetworkNode[]; edges: NetworkEdge[]; roads: AuthoredRoad[]; surface: MultiPolygon; footprints: Map<string, MultiPolygon>; owned: Map<string, MultiPolygon> };
type Segment = { road: AuthoredRoad; a: EditorPoint; b: EditorPoint; cuts: number[] };
const EPS = 1e-7;
const pair = (x: number, y: number): Pair => [Math.round(x * 1e5) / 1e5, Math.round(y * 1e5) / 1e5];
const cross = (a: EditorPoint, b: EditorPoint) => a.x * b.y - a.y * b.x;
const sub = (a: EditorPoint, b: EditorPoint) => ({ x: a.x - b.x, y: a.y - b.y });
const lerp = (a: EditorPoint, b: EditorPoint, t: number) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
export const mergePolygons = (polygons: MultiPolygon[]): MultiPolygon => polygons.length ? polygonClipping.union(polygons[0], ...polygons.slice(1)) : [];

/** Butt-ended segment boundary, with no implicit endpoint pad. */
export function segmentBoundary(a: EditorPoint, b: EditorPoint, width: number): Polygon {
  const length = Math.hypot(b.x - a.x, b.y - a.y); const nx = -(b.y - a.y) / length * width / 2; const ny = (b.x - a.x) / length * width / 2;
  return [[pair(a.x + nx, a.y + ny), pair(a.x - nx, a.y - ny), pair(b.x - nx, b.y - ny), pair(b.x + nx, b.y + ny), pair(a.x + nx, a.y + ny)]];
}
function roundJoin(point: EditorPoint, radius: number): Polygon {
  const ring: Pair[] = Array.from({ length: 32 }, (_, i) => pair(point.x + Math.cos(i * Math.PI / 16) * radius, point.y + Math.sin(i * Math.PI / 16) * radius));
  return [[...ring, ring[0]]];
}

/** Split sampled centerlines at actual crossings, including collinear endpoints.
 * Sweep on x bounds avoids the old all-road/all-sample Cartesian product.
 * Explicit snaps are resolved against the same samples as the rendered parent.
 */
export function compileRoadNetwork(input: AuthoredRoad[], smooth = true): CompiledNetwork {
  const roads = input.filter(r => r.visible !== false && r.width > 0 && r.points.length >= 2).map(r => ({ ...r, points: (smooth && !r.locked ? sampleCatmullRom(r.points, 20) : r.points).map(p => ({ x: p.x, y: p.y })) }));
  for (const source of input) source.points.forEach((point, index) => {
    if (!point.connection || index !== 0 && index !== source.points.length - 1) return;
    const child = roads.find(r => r.id === source.id); const parent = roads.find(r => r.id === point.connection!.targetRoadId.replace(/^(planet1:)+/, "planet1:"));
    if (!child || !parent || child === parent) return;
    let best = Infinity; let anchor = point;
    for (let i = 1; i < parent.points.length; i++) {
      const a = parent.points[i - 1], b = parent.points[i]; const d = sub(b, a); const length = d.x * d.x + d.y * d.y;
      const t = length ? Math.max(0, Math.min(1, ((point.x - a.x) * d.x + (point.y - a.y) * d.y) / length)) : 0;
      const candidate = lerp(a, b, t); const distance = Math.hypot(point.x - candidate.x, point.y - candidate.y);
      if (distance < best) { best = distance; anchor = candidate; }
    }
    child.points[index === 0 ? 0 : child.points.length - 1] = { x: anchor.x, y: anchor.y };
  });
  const segments: Segment[] = roads.flatMap(road => road.points.slice(1).flatMap((b, i) => Math.hypot(b.x - road.points[i].x, b.y - road.points[i].y) > EPS ? [{ road, a: road.points[i], b, cuts: [0, 1] }] : []));
  const sorted = [...segments].sort((a, b) => Math.min(a.a.x, a.b.x) - Math.min(b.a.x, b.b.x));
  for (let i = 0; i < sorted.length; i++) {
    const first = sorted[i]; const r = sub(first.b, first.a);
    for (let j = i + 1; j < sorted.length; j++) {
      const second = sorted[j];
      if (Math.min(second.a.x, second.b.x) > Math.max(first.a.x, first.b.x) + EPS) break;
      if (Math.min(second.a.y, second.b.y) > Math.max(first.a.y, first.b.y) + EPS || Math.max(second.a.y, second.b.y) < Math.min(first.a.y, first.b.y) - EPS) continue;
      const s = sub(second.b, second.a), q = sub(second.a, first.a); const denominator = cross(r, s);
      if (Math.abs(denominator) > EPS) {
        const t = cross(q, s) / denominator, u = cross(q, r) / denominator;
        if (t >= -EPS && t <= 1 + EPS && u >= -EPS && u <= 1 + EPS) { first.cuts.push(Math.max(0, Math.min(1, t))); second.cuts.push(Math.max(0, Math.min(1, u))); }
      } else if (Math.abs(cross(q, r)) < EPS) {
        for (const [target, other] of [[first, second], [second, first]]) {
          const d = sub(target.b, target.a); const length = d.x * d.x + d.y * d.y;
          for (const p of [other.a, other.b]) { const t = ((p.x - target.a.x) * d.x + (p.y - target.a.y) * d.y) / length; if (t > 0 && t < 1) target.cuts.push(t); }
        }
      }
    }
  }
  const nodeMap = new Map<string, NetworkNode>(); const edges: NetworkEdge[] = [];
  const nodeAt = (point: EditorPoint) => { const id = `${Math.round(point.x * 1e5)},${Math.round(point.y * 1e5)}`; let node = nodeMap.get(id); if (!node) { node = { ...point, id, edges: [] }; nodeMap.set(id, node); } return node; };
  for (const segment of segments) {
    const cuts = [...new Set(segment.cuts)].sort((a, b) => a - b);
    for (let i = 1; i < cuts.length; i++) {
      const a = nodeAt(lerp(segment.a, segment.b, cuts[i - 1])), b = nodeAt(lerp(segment.a, segment.b, cuts[i])); if (a.id === b.id) continue;
      a.edges.push(edges.length); b.edges.push(edges.length); edges.push({ roadId: segment.road.id, width: segment.road.width, a, b, start: a.id, end: b.id });
    }
  }
  const parts = new Map(roads.map(r => [r.id, [] as MultiPolygon]));
  for (const edge of edges) parts.get(edge.roadId)!.push(segmentBoundary(edge.a, edge.b, edge.width));
  for (const node of nodeMap.values()) {
    // Only degree-two bends have a round outer join. Its radius is bounded by
    // the narrowest incident road, so even a near reversal cannot spike.
    // Dead ends are flat; junctions get NO circle, hull, apron or cap.
    if (node.edges.length !== 2) continue;
    const incident = node.edges.map(i => edges[i]);
    const first = incident[0], second = incident[1];
    const d1 = sub(first.start === node.id ? first.b : first.a, node), d2 = sub(second.start === node.id ? second.b : second.a, node);
    if (Math.abs(cross(d1, d2)) < EPS) continue;
    const owner = [...incident].sort((a, b) => b.width - a.width || a.roadId.localeCompare(b.roadId))[0];
    parts.get(owner.roadId)!.push(roundJoin(node, Math.min(...incident.map(e => e.width)) / 2));
  }
  const footprints = new Map([...parts].map(([id, polygons]) => [id, mergePolygons(polygons.map(p => [p]))]));
  const owned = new Map<string, MultiPolygon>();
  const bounds = new Map([...footprints].map(([id, polygons]) => {
    const points = polygons.flat(2);
    return [id, { left: Math.min(...points.map(p => p[0])), right: Math.max(...points.map(p => p[0])), top: Math.min(...points.map(p => p[1])), bottom: Math.max(...points.map(p => p[1])) }];
  }));
  const prior: string[] = [];
  // Stable ownership: the wider through-road keeps its surface. Every joining
  // road is cut at the actual parent boundary, including oblique approaches.
  for (const road of [...roads].sort((a, b) => b.width - a.width || a.id.localeCompare(b.id))) {
    const footprint = footprints.get(road.id)!;
    const b = bounds.get(road.id)!;
    const overlaps = prior.filter(id => { const a = bounds.get(id)!; return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top; }).map(id => footprints.get(id)!);
    owned.set(road.id, overlaps.length ? polygonClipping.difference(footprint, ...overlaps) : footprint);
    prior.push(road.id);
  }
  // Union once; repeatedly rebuilding the entire country for each small road
  // made adding local connections disproportionately expensive.
  const surface = mergePolygons([...footprints.values()]);
  return { nodes: [...nodeMap.values()], edges, roads, surface, footprints, owned };
}

export function polygonPath(polygons: MultiPolygon, project: (point: EditorPoint) => EditorPoint): Path2D {
  const path = new Path2D();
  for (const polygon of polygons) for (const ring of polygon) { ring.forEach(([x, y], i) => { const p = project({ x, y }); i ? path.lineTo(p.x, p.y) : path.moveTo(p.x, p.y); }); path.closePath(); }
  return path;
}
