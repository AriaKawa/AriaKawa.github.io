import { theaterPoint } from "../AmericasTheater";
import { sampleCatmullRom, type AuthoredRoad, type EditorPoint, type RoadClass } from "./RoadEditorData";
import dirtRoads from "./usa-dirt-roads.json";

const p = (lat: number, lon: number) => theaterPoint(lat, lon);

/** Fixed, authored corridors. Endpoint projection happens once, never per frame. */
export function expandUSARoads(roads: AuthoredRoad[], includeDirt = true): AuthoredRoad[] {
  const get = (id: string) => roads.find(r => r.id === `curated-usa-${id}`)!;
  const i15 = get("i15"); i15.points = i15.points.slice(0, -1);
  const i35 = get("i35"); i35.points[i35.points.length - 1] = p(43.90, -92.48);
  get("i80").points.splice(0, 2);
  const i5 = get("i5"); i5.points = i5.points.slice(0, 14);
  for (const id of ["i25", "i65"]) { get(id).roadClass = "major_road"; get(id).width = 30; }

  const nearest = (point: EditorPoint, parent: string) => {
    const line = sampleCatmullRom(get(parent).points, 20);
    return { ...line.reduce((best, q) => Math.hypot(q.x-point.x,q.y-point.y) < Math.hypot(best.x-point.x,best.y-point.y) ? q : best) };
  };
  const add = (id: string, name: string, coords: number[][], from: string, to: string, roadClass: RoadClass = "rural_road") => {
    const points = coords.map(([lat,lon]) => p(lat,lon));
    points[0] = nearest(points[0], from); points[points.length-1] = nearest(points.at(-1)!, to);
    roads.push({ id: `curated-usa-${id}`, name, roadClass, width: roadClass === "highway" ? 48 : 24, points, source: "manual_editor", locked: false, visible: true, tags: ["authored-expansion"] });
  };
  add("maine-loop", "Atlantic–Maine–Vermont highway loop", [[42.3,-71.23],[43.08,-70.85],[43.70,-70.35],[44.35,-69.50],[44.85,-68.65],[45.55,-68.35],[46.35,-68.20],[46.85,-68.45],[46.90,-69.0],[46.40,-69.65],[45.70,-70.10],[45.10,-70.85],[44.80,-71.65],[44.50,-72.55],[44.35,-73.05],[43.65,-73.30],[42.65,-73.75]], "i95", "i90-east", "highway");
  add("northern-plains", "Northern plains two-lane", [[46.87,-113.99],[47.30,-111.5],[47.25,-108.4],[47.05,-105.5],[46.90,-103.1],[46.80,-100.8],[46.85,-97.0],[46.10,-95.3],[44.95,-94.7],[43.65,-94.0]], "i90-west", "i90-west");
  add("high-desert", "Oregon–Idaho two-lane", [[44.10,-123.02],[44.1,-121.2],[43.70,-119.2],[43.60,-116.5],[43.1,-114.6],[42.87,-112.45]], "i5", "i15");
  add("basin", "Great Basin two-lane", [[39.53,-119.81],[38.6,-118.7],[37.9,-117.5],[36.9,-116.4],[36.17,-115.14]], "i80", "i15");
  add("central-plains", "Central plains two-lane", [[40.90,-98.34],[40.15,-98.1],[38.84,-97.61]], "i80", "i70");
  add("arkansas", "Arkansas delta two-lane", [[34.75,-92.27],[33.6,-91.8],[32.30,-90.18]], "i40", "i55");
  add("gulf", "Gulf inland two-lane", [[32.30,-90.18],[32.4,-88.8],[32.37,-86.30]], "i55", "i65");
  add("michigan", "Michigan inland two-lane loop", [[41.50,-86.20],[42.4,-85.7],[43.4,-85.6],[44.4,-84.8],[44.6,-84.2],[43.6,-83.8],[42.30,-83.18]], "i80", "i75");
  add("delmarva", "Delaware inland two-lane", [[39.72,-75.6],[39.3,-75.65],[38.85,-75.7],[38.95,-76.2],[39.30,-76.65]], "i95", "i95");
  add("rhode-island", "Rhode Island two-lane", [[41.8,-72.25],[41.65,-71.75],[41.70,-71.5],[42.00,-71.50]], "i95", "i95");
  if (includeDirt) roads.push(...structuredClone(dirtRoads) as AuthoredRoad[]);
  return roads;
}
