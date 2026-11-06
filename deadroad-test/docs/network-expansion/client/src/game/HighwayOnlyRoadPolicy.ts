import type { WorldRoad } from "../globe/GlobeData";

/**
 * Normal Earth gameplay deliberately exposes one canonical road class.
 * Local, service, county, stamped, and imported detail may remain available to
 * diagnostics, but must never enter the normal render or routing collections.
 */
export const NORMAL_VISIBLE_EARTH_ROAD_CLASSES = ["interstate_highway"] as const;

export function isNormalGameplayHighway(road: Pick<WorldRoad, "roadClass" | "gameRoadClass">): boolean {
  return road.roadClass === "interstate_highway" && (!road.gameRoadClass || road.gameRoadClass === "interstate");
}

export function normalGameplayHighways(roads: readonly WorldRoad[]): WorldRoad[] {
  return roads.filter(road => road.id.startsWith("curated-usa-") || isNormalGameplayHighway(road));
}
