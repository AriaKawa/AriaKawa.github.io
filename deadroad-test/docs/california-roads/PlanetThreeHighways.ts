import type { WorldRoad } from "../../globe/GlobeData";
import { normalGameplayHighways } from "../HighwayOnlyRoadPolicy";

// FHWA California highway map guides the corridors; inland offsets respect the
// deliberately simplified tactical coastline. These are overview centerlines,
// not navigation-grade GIS. Shared vertices give the editor real junctions.
type Point = { lat: number; lon: number };
const p = (lat: number, lon: number): Point => ({ lat, lon });
const sacramento = p(38.58, -121.49), la = p(34.05, -118.24);
const barstow = p(34.90, -117.02), cajon = p(34.23, -117.42);
const vegas = p(36.17, -115.14), sanDiego = p(32.80, -116.98);
const routes: Record<string, Point[]> = {
  "usa-i5-03": [sacramento, p(37.65, -121.30), p(36.25, -120.20), p(35.40, -119.40), p(34.95, -118.90), p(34.45, -118.60), la],
  "usa-i5-05": [la, p(33.80, -117.85), p(33.45, -117.40), p(33.05, -117.10), sanDiego],
  "usa-i10-01": [la, cajon, p(33.92, -116.95), p(33.75, -116.20), p(33.62, -114.60), p(33.60, -113.70), p(33.45, -112.07)],
  // Remove the San Diego–Utah diagonal. I-15 joins I-10 at Cajon instead.
  "usa-i15-01": [cajon, p(34.55, -117.30), barstow, p(35.25, -116.10), p(35.65, -115.40), vegas],
  // I-40 starts at Barstow, removing the extra direct LA–New Mexico approach.
  "usa-i40-01": [barstow, p(34.75, -115.70), p(34.85, -114.60), p(35.19, -114.05), p(35.20, -112.50), p(35.20, -111.65)],
  // The schematic map omits the SF peninsula; keep its Bay Area feeder inland.
  "usa-i80-01": [p(37.85, -121.75), p(38.25, -121.65), sacramento],
};

export function planetThreeHighways(worldRoads: readonly WorldRoad[]): WorldRoad[] {
  return normalGameplayHighways(worldRoads).flatMap(road => {
    const id = road.id.replace(/^(planet1:)+/, "");
    // Former SF–LA I-5 leg duplicated the new inland Sacramento–LA corridor.
    if (id === "usa-i5-04") return [];
    const points = routes[id];
    return [{ ...road, pointLatLon: (points ?? road.pointLatLon).map(point => ({ ...point })) }];
  });
}
