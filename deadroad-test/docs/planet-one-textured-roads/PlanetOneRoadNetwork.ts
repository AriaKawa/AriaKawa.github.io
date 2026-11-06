import { curatedUSARoads } from "./CuratedUSARoadLayer";
import { cloneRoads, sampleCatmullRom } from "./RoadEditorData";
import { theaterLatLon, theaterPoint } from "../AmericasTheater";
import type { WorldRoad } from "../../globe/GlobeData";

/** The editor's USA backbone, with separate approaches instead of metro hubs. */
export function planetOneAuthoredRoads() {
  const roads = curatedUSARoads();
  const road = (id: string) => roads.find(r => r.id === `curated-usa-${id}`)!;
  // I-44 terminates on I-55 southwest of the I-70 crossing. I-64 leaves
  // I-55 to the east north of that crossing: three spaced junctions.
  const south = theaterPoint(38.20, -90.05);
  const north = theaterPoint(39.10, -90.00);
  const i55 = road("i55");
  const metro = i55.points.findIndex(p => Math.hypot(p.x-road("i44").points.at(-1)!.x, p.y-road("i44").points.at(-1)!.y) < .01);
  i55.points.splice(metro, 1, south, i55.points[metro], north);
  road("i44").points[road("i44").points.length - 1] = south;
  road("i64").points[0] = north;
  // I-44 joins I-35 north of Oklahoma City's I-40 crossing.
  const okNorth = theaterPoint(36.15, -97.45);
  road("i35").points.splice(6, 0, okNorth);
  road("i44").points[0] = okNorth;
  // I-81 branches northeast of Knoxville instead of adding a fifth arm.
  const eastKnox = theaterPoint(36.02, -83.45);
  const i40 = road("i40");
  const knox = i40.points.findIndex(p => Math.hypot(p.x-road("i81").points[0].x, p.y-road("i81").points[0].y) < .01);
  i40.points.splice(knox + 1, 0, eastKnox);
  road("i81").points[0] = eastKnox;
  return cloneRoads(roads);
}

/** Identical sampled centerlines for rendering, deployment, and map selection. */
export function planetOneWorldRoads(): WorldRoad[] {
  return planetOneAuthoredRoads().map(r => ({
    id: r.id, name: r.name, roadClass: "interstate_highway", gameRoadClass: "interstate",
    renderClass: "highway", purpose: "connect_city", surface: "damaged_asphalt",
    condition: "damaged", status: "contested", continentId: "north-america",
    startEndpointKind: "road_intersection", endEndpointKind: "road_intersection",
    importance: r.roadClass === "highway" ? 95 : 75, isPrimary: r.roadClass === "highway",
    pointLatLon: sampleCatmullRom(r.points, 20).map(theaterLatLon)
  }));
}


