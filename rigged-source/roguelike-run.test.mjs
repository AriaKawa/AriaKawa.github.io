import assert from "node:assert/strict";
import {
  abilityCards,
  applyCard,
  createStarterRun,
  draftDrawCountForRound,
  draftCards,
  normalizeRunState,
  remainingCardCount,
  upgradeCards,
} from "./src/game/rigged/RoguelikeRun.ts";

const starter = createStarterRun("rocket");
assert.deepEqual(starter.ownedTurrets, ["rocket"], "a run begins with only the selected turret");
assert.equal(starter.activeTurret, "rocket");
assert.equal(remainingCardCount(starter,"weapon"),20);
assert.equal(remainingCardCount(starter,"body"),16);
assert.equal(remainingCardCount(starter,"wheel"),16);
assert.equal(remainingCardCount(starter,"ability"),4);

const heavy = upgradeCards.find(card => card.id === "heavy-rounds");
assert.ok(heavy);
applyCard(starter, heavy);
for (const kind of ["mg","rocket","sniper"]) {
  assert.equal(starter.turretStats[kind].damageMultiplier, 1.8, "weapon cards apply to every turret record");
  assert.equal(starter.turretStats[kind].fireRateMultiplier, .65);
}
assert.equal(remainingCardCount(starter,"weapon"),19,"one of two copies is removed");
applyCard(starter, heavy);
assert.equal(remainingCardCount(starter,"weapon"),18,"the second copy is removed separately");
const damageAfterTwo=starter.turretStats.mg.damageMultiplier;
applyCard(starter, heavy);
assert.equal(starter.turretStats.mg.damageMultiplier,damageAfterTwo,"an exhausted card cannot apply again");

starter.round=2;
const balancedDraft=draftCards(starter);
assert.equal(balancedDraft.length,3);
assert.equal(new Set(balancedDraft.map(card=>card.id)).size,3,"a draft avoids duplicate card ids");
assert.equal(new Set(balancedDraft.map(card=>card.deck)).size,1,"a draft draws every offer from one deck only");
assert.ok(["weapon","body","wheel"].includes(balancedDraft[0].deck),"the selected normal deck is one of the three visible decks");

const drawCounts=Array.from({length:24},(_,index)=>draftDrawCountForRound(index+1));
assert.ok(drawCounts.includes(1)&&drawCounts.includes(2),"rounds randomly alternate between one draw and an occasional bonus draw");

const sequentialState=createStarterRun("mg",2);
for(let drawIndex=0;drawIndex<8;drawIndex++){
  const offer=draftCards(sequentialState);
  const effectiveDecks=new Set(offer.map(card=>card.category==="turret"?"weapon":card.deck));
  assert.equal(effectiveDecks.size,1,`sequential draft ${drawIndex+1} stays inside one deck`);
  assert.equal(offer.length,3,`sequential draft ${drawIndex+1} still offers three choices`);
  applyCard(sequentialState,offer[0]);
}

const abilityDraft=draftCards(starter,{forceAbility:true});
const firstAbility=abilityDraft.find(card=>card.category==="ability");
assert.ok(firstAbility,"the rare ability deck can replace a normal offer");
assert.ok(abilityDraft.every(card=>card.category==="ability"),"ability draws are not mixed with visible-deck cards");
applyCard(starter,firstAbility);
assert.equal(starter.activeAbility,firstAbility.abilityId);
assert.equal(remainingCardCount(starter,"ability"),3,"abilities have one copy");
const replacement=abilityCards.find(card=>card.abilityId!==starter.activeAbility);
assert.ok(replacement);applyCard(starter,replacement);
assert.equal(starter.activeAbility,replacement.abilityId,"a new ability replaces rather than stacks");

starter.round=3;
const rewardDraft=draftCards(starter);
assert.equal(rewardDraft.length,3);
assert.equal(rewardDraft[0].category,"turret","round three guarantees a turret reward");
assert.ok(rewardDraft.every(card=>card.category==="weapon"||card.category==="turret"),"turret reward drafts stay entirely in the weapon deck");
applyCard(starter,rewardDraft[0]);
assert.equal(starter.ownedTurrets.length,2);
const acquired=starter.activeTurret;
assert.equal(starter.turretStats[acquired].damageMultiplier,damageAfterTwo,"later turrets inherit prior global weapon upgrades");

starter.cameraMode="enemy";
const restored=normalizeRunState(JSON.parse(JSON.stringify(starter)));
assert.ok(restored);assert.equal(restored.cameraMode,"enemy","camera choice survives run-state serialization");

console.log("Roguelike run model tests passed (four decks, two-copy exhaustion, global turrets, ability replacement, round-three reward, and camera persistence). ");
