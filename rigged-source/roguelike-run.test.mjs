import assert from "node:assert/strict";
import { applyCard, createStarterRun, draftCards, upgradeCards } from "./src/game/rigged/RoguelikeRun.ts";

const starter = createStarterRun("rocket");
assert.deepEqual(starter.ownedTurrets, ["rocket"], "a run must begin with only the selected turret");
assert.equal(starter.activeTurret, "rocket");

const heavy = upgradeCards.find(card => card.id === "heavy-rounds");
assert.ok(heavy);
applyCard(starter, heavy);
assert.equal(starter.turretStats.rocket.damageMultiplier, 2);
assert.equal(starter.turretStats.rocket.fireRateMultiplier, .5);
assert.equal(starter.turretStats.mg.damageMultiplier, 1, "weapon cards must affect only the active turret");

const incendiary = upgradeCards.find(card => card.id === "incendiary-rounds");
assert.ok(incendiary);
applyCard(starter, incendiary);
assert.ok(starter.turretStats.rocket.burnDps > 0);
assert.ok(starter.turretStats.rocket.burnDuration >= 3);

starter.round = 3;
const rewardDraft = draftCards(starter);
assert.equal(rewardDraft.length, 3);
assert.equal(rewardDraft[0].category, "turret", "round three must guarantee a new turret offer");
applyCard(starter, rewardDraft[0]);
assert.equal(starter.ownedTurrets.length, 2);
assert.equal(starter.activeTurret, starter.ownedTurrets[1]);

starter.round = 4;
assert.equal(draftCards(starter).length, 3);
assert.ok(draftCards(starter).every(card => card.category !== "turret"));

console.log("Roguelike run model tests passed (starter ownership, scoped cards, burn, round-three turret reward, and normal drafts). ");
