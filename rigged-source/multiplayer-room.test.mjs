import assert from "node:assert/strict";
import {
  addAiPlayer,
  cleanPlayerName,
  cleanRoomCode,
  makeRoomCode,
  normalizeRoomSnapshot,
  resolveRoomPick,
  resolveRoundReady,
  resolveVehiclePick,
  roomPlayers,
} from "./src/game/rigged/RiggedMultiplayer.ts";
import { applyCard, createStarterRun, createTurretCard, draftCards, draftDrawCountForRound } from "./src/game/rigged/RoguelikeRun.ts";

assert.equal(cleanPlayerName("   Road    Rat   "), "Road Rat");
assert.equal(cleanPlayerName(""), "Road warrior");
assert.equal(cleanRoomCode(" a-b$c 29 "), "ABC29");

const rolls = [0, .05, .1, .15, .2];
let rollIndex = 0;
assert.equal(makeRoomCode(() => rolls[rollIndex++] ?? 0), "ABDEG");

const players = roomPlayers({
  players: {
    guest: { name: "Guest", joinedAt: 20 },
    host: { name: "Host", joinedAt: 10 },
  },
});
assert.deepEqual(players.map(player => player.id), ["host", "guest"]);

const baseRoom = {
  code: "ABCDE", hostId: "host", phase: "starter_draft", round: 1,
  players: { host: { name: "Host", joinedAt: 10 }, guest: { name: "Guest", joinedAt: 20 } },
  playerOrder: ["host", "guest"], activePickerId: "host", draftOptions: ["mg", "rocket", "sniper"],
  draftTurn: 0, pickSequence: 0, lastPick: null, vehicleSelections: {}, roundReady: {}, runState: null, createdAt: 1, updatedAt: 1,
};
const lobbyRoom={...baseRoom,phase:"lobby",players:{host:{name:"Host",joinedAt:10}},playerOrder:["host"],activePickerId:"",draftOptions:[]};
const aiRoom=addAiPlayer(lobbyRoom,"host",2);
assert.equal(aiRoom.players.rigged_ai.isAI,true);
assert.deepEqual(aiRoom.playerOrder,["host","rigged_ai"]);
assert.equal(addAiPlayer(lobbyRoom,"guest",2),undefined,"only the host can add AI");
const starter = createStarterRun("mg", 1);
const normalized=normalizeRoomSnapshot({...baseRoom,roundReady:undefined,vehicleSelections:undefined,runState:{...starter,upgrades:undefined,pickedCards:undefined}});
assert.deepEqual(normalized.roundReady,{});
assert.deepEqual(normalized.vehicleSelections,{});
assert.deepEqual(normalized.runState.upgrades,[],"Firebase-omitted run arrays are restored");
assert.deepEqual(normalized.runState.pickedCards,[],"Firebase-omitted pick history is restored before an AI applies a card");
const normalizedAiState=structuredClone(normalized.runState);
applyCard(normalizedAiState,createTurretCard("sniper"));
assert.deepEqual(normalizedAiState.pickedCards,["add-sniper"],"the AI can apply a starter card after Firebase normalization");
assert.equal(resolveRoomPick(baseRoom, "guest", { optionId: "mg", optionName: "Rattler", nextRunState: starter, nextOptions: [] }), undefined, "guest cannot steal the host turn");
const allStarterOptions=["mg","rocket","sniper"];
const afterHost = resolveRoomPick(baseRoom, "host", { optionId: "mg", optionName: "Rattler", nextRunState: starter, nextOptions: allStarterOptions }, 2);
assert.equal(afterHost.activePickerId, "guest");
assert.equal(afterHost.phase, "starter_draft");
assert.deepEqual(afterHost.draftOptions,allStarterOptions,"the second driver may choose the same starter turret");
assert.deepEqual(resolveRoomPick({...baseRoom,roundReady:undefined},"host",{optionId:"mg",optionName:"Rattler",nextRunState:starter,nextOptions:allStarterOptions},2).roundReady,{},"Firebase-omitted empty maps are restored");

const sameStarter=structuredClone(starter);
applyCard(sameStarter,createTurretCard("mg"));
const samePickVehicleOptions=["race","suv","taxi"];
const afterSamePick=resolveRoomPick(afterHost,"guest",{optionId:"mg",optionName:"Rattler",nextRunState:sameStarter,nextOptions:samePickVehicleOptions},3);
assert.equal(afterSamePick.phase,"vehicle_select","matching starter choices complete the draft normally");
assert.deepEqual(afterSamePick.runState.ownedTurrets,["mg"],"matching starter choices do not create duplicate mounts");

const sharedStarter = structuredClone(starter);
applyCard(sharedStarter, createTurretCard("rocket"));
const vehicleOptions = ["race", "suv", "taxi"];
const afterGuest = resolveRoomPick(afterHost, "guest", { optionId: "rocket", optionName: "Hellbox", nextRunState: sharedStarter, nextOptions: vehicleOptions }, 3);
assert.equal(afterGuest.phase, "vehicle_select");
assert.deepEqual(afterGuest.runState.ownedTurrets, ["mg", "rocket"]);

const hostVehicle = resolveVehiclePick(afterGuest, "host", "race", "Track Racer", 4);
assert.equal(hostVehicle.phase, "vehicle_select");
assert.equal(hostVehicle.activePickerId, "guest");
const guestVehicle = resolveVehiclePick(hostVehicle, "guest", "taxi", "Battle Taxi", 5);
assert.equal(guestVehicle.phase, "playing");
assert.deepEqual(guestVehicle.vehicleSelections, { host:"race", guest:"taxi" });

const hostReady = resolveRoundReady(guestVehicle, "host", draftCards(sharedStarter).map(card => card.id), sharedStarter, 6);
assert.equal(hostReady.phase, "playing");
const bothReady = resolveRoundReady(hostReady, "guest", draftCards(sharedStarter).map(card => card.id), sharedStarter, 7);
assert.equal(bothReady.phase, "upgrade_draft");
assert.equal(bothReady.activePickerId, "host");

const bonusRound=Array.from({length:30},(_,index)=>index+1).find(round=>draftDrawCountForRound(round)===2);
assert.ok(bonusRound);
let bonusRoom={...bothReady,round:bonusRound,draftTurn:0,activePickerId:"host",draftOptions:["bonus-card"]};
for(const [index,playerId] of ["host","guest","host","guest"].entries()){
  bonusRoom=resolveRoomPick(bonusRoom,playerId,{optionId:"bonus-card",optionName:"Bonus Card",nextRunState:sharedStarter,nextOptions:["bonus-card"]},10+index);
  assert.ok(bonusRoom);
  if(index===1){assert.equal(bonusRoom.phase,"upgrade_draft","a bonus round continues into a second sequential draw");assert.equal(bonusRoom.activePickerId,"host");}
}
assert.equal(bonusRoom.phase,"playing","the bonus draft finishes after both players take their second draw");

console.log("Rigged multiplayer room tests passed (names, codes, ordered turret/vehicle picks, shared state, and the both-player round gate). ");
