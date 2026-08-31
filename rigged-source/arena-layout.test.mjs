import assert from "node:assert/strict";

import {
  nextRiggedLevel,
  riggedArenaLayouts,
  riggedArenaOrder,
} from "./src/game/rigged/RiggedArenaLayout.ts";

assert.deepEqual(riggedArenaOrder, ["dustring", "ovalbowl", "skyfoundry", "redmesa"]);
assert.deepEqual(
  riggedArenaOrder.map(nextRiggedLevel),
  ["ovalbowl", "skyfoundry", "redmesa", "dustring"],
  "arena rotation should visit every map and wrap cleanly",
);

const skyFoundry = riggedArenaLayouts.skyfoundry;
const foundryBridges = skyFoundry.surfaces.filter(surface => surface.kind === "bridge");
assert.equal(foundryBridges.length, 6, "Sky Foundry needs four approaches and two crossing decks");
assert.equal(foundryBridges.filter(surface => surface.startHeight === 9 && surface.endHeight === 9).length, 2);
assert.equal(foundryBridges.filter(surface => Math.abs(surface.endHeight - surface.startHeight) === 9).length, 4);
assert.ok(foundryBridges.every(surface => surface.width >= 18), "raised routes must be wide enough for combat driving");
assert.ok(foundryBridges.filter(surface => surface.startHeight === surface.endHeight).every(surface => surface.rails === false), "the crossing deck must leave its central junction open");

const redMesa = riggedArenaLayouts.redmesa;
assert.equal(redMesa.terrainProfile, "rolling");
assert.ok(redMesa.ringOuterRadius - redMesa.ringInnerRadius >= 40, "Red Mesa needs a broad hilly combat loop");
assert.equal(redMesa.surfaces.filter(surface => surface.kind === "ramp").length, 2);

for (const layout of Object.values(riggedArenaLayouts)) {
  assert.ok(layout.spawn.z * layout.opponentSpawn.z < 0, `${layout.name} keeps drivers on opposite sides`);
  assert.ok(layout.ringOuterRadius < layout.radius, `${layout.name} leaves boundary runoff`);
}

console.log("Arena layout tests passed (four-map rotation, raised bridge cross, and rolling hill arena). ");
