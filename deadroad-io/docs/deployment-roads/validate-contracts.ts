import { continentRoads, createContinentLots, defenseContractSeed, generateDefenseContractLayout, validateDefenseContractLayout } from "../client/src/game/continentData.ts";
import { NORMAL_ZOMBIE_ROAD_FOLLOW_PERCENT, shouldZombieFollowRoad } from "../client/src/game/contractRules.ts";

const errors: string[] = []; const lots = createContinentLots(); let routeCount = 0; let padCount = 0; let variantLots = 0;
for (const road of continentRoads) { if (!road.roadClass) errors.push(`${road.id}: missing road class`); if (!road.purpose) errors.push(`${road.id}: missing road purpose`); }
for (const [index, lot] of lots.entries()) {
  const difficulty = index % 5 + 1; const first = generateDefenseContractLayout(lot, difficulty, `validation-${lot.id}-a`, defenseContractSeed(`${lot.id}:a`)); const second = generateDefenseContractLayout(lot, difficulty, `validation-${lot.id}-b`, defenseContractSeed(`${lot.id}:b`));
  for (const issue of validateDefenseContractLayout(lot, first)) errors.push(`${lot.id}: ${issue}`);
  if (first.spawnpoints.some((entry) => entry.distanceToBase < 900 || entry.distanceToBase > 6500)) errors.push(`${lot.id}: spawn source outside valid distance`);
  if (first.routes.some((entry) => entry.roadIds.length === 0 || entry.points.length < 3)) errors.push(`${lot.id}: route does not use the road graph`);
  if (first.buildPads.length < 8 || first.buildPads.length > 14) errors.push(`${lot.id}: expected 8-14 route pads, got ${first.buildPads.length}`);
  if (first.buildPads.some((entry) => (entry.distanceToRoute ?? 0) < 42 || (entry.distanceToRoute ?? 0) > 100)) errors.push(`${lot.id}: pad is not beside the defense route`);
  const firstSources = first.spawnpoints.map((entry) => entry.name).join("|"); const secondSources = second.spawnpoints.map((entry) => entry.name).join("|"); if (firstSources !== secondSources) variantLots += 1;
  routeCount += first.routes.length; padCount += first.buildPads.length;
}
if (!lots.length) errors.push("no deployment lots generated"); if (variantLots < Math.max(2, Math.floor(lots.length * .15))) errors.push(`only ${variantLots}/${lots.length} lots vary their source selection across contract seeds`);
const roadSamples = Array.from({ length: 1300 }, (_, index) => shouldZombieFollowRoad(index, Math.floor(index / 34) + 1)); const observedRoadShare = roadSamples.filter(Boolean).length / roadSamples.length; if (Math.abs(observedRoadShare - NORMAL_ZOMBIE_ROAD_FOLLOW_PERCENT) > .02) errors.push(`road-following share ${observedRoadShare.toFixed(3)} does not match ${NORMAL_ZOMBIE_ROAD_FOLLOW_PERCENT}`);
const fieldLot = lots[0] ? { ...lots[0], id: "validation-field", worldX: 146000, worldY: 112000, x: 5400, y: 3900, nearbyRoadPoint: { x: 5400, y: 3900 }, entrancePoint: { x: 5400, y: 3900 }, drivewayPoints: [{ x: 5400, y: 3900 }] } : undefined;
const fieldLayout = fieldLot ? generateDefenseContractLayout(fieldLot, 3, "validation-field-contract", defenseContractSeed("validation-field")) : undefined;
if (fieldLot && fieldLayout) {
  for (const issue of validateDefenseContractLayout(fieldLot, fieldLayout)) errors.push(`field deployment: ${issue}`);
  if (fieldLayout.routes.some((route) => route.roadIds.length !== 0)) errors.push("field deployment unexpectedly depends on a hidden road");
  if (fieldLayout.routes.length !== 1 || fieldLayout.spawnpoints.length !== 1) errors.push("field deployment must keep one persistent route and spawner across waves");
  if (fieldLayout.routes.some((route) => route.points.length < 8)) errors.push("field deployment needs more turns");
  if (fieldLayout.routes.some((route) => route.routeLength > 1650)) errors.push("field deployment route extends too far from the base");
  if (fieldLayout.routes.some((route) => Math.hypot(route.points[0].x - fieldLot.x, route.points[0].y - fieldLot.y) > 1150)) errors.push("field deployment spawn is too far from the base");
  if (fieldLayout.buildPads.length < 8) errors.push(`field deployment only generated ${fieldLayout.buildPads.length} build pads`);
}

if (errors.length) { console.error(errors.slice(0, 80).join("\n")); if (errors.length > 80) console.error(`...and ${errors.length - 80} more`); process.exitCode = 1; }
else console.log(`Defense contracts valid: ${lots.length} deployment lots, ${routeCount} road-fed routes, ${fieldLayout?.routes.length ?? 0} curved field routes, ${padCount} route-side pads, ${variantLots} seeded source variants, and ${(observedRoadShare * 100).toFixed(1)}% road-following hordes.`);
