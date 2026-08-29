import assert from "node:assert/strict";
import {
  cleanPlayerName,
  cleanRoomCode,
  makeRoomCode,
  resolveRoomPick,
  resolveRoundReady,
  resolveVehiclePick,
  roomPlayers,
} from "./src/game/rigged/RiggedMultiplayer.ts";
import { applyCard, createStarterRun, createTurretCard, draftCards } from "./src/game/rigged/RoguelikeRun.ts";

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
const starter = createStarterRun("mg", 1);
assert.equal(resolveRoomPick(baseRoom, "guest", { optionId: "mg", optionName: "Rattler", nextRunState: starter, nextOptions: [] }), undefined, "guest cannot steal the host turn");
const afterHost = resolveRoomPick(baseRoom, "host", { optionId: "mg", optionName: "Rattler", nextRunState: starter, nextOptions: ["rocket", "sniper"] }, 2);
assert.equal(afterHost.activePickerId, "guest");
assert.equal(afterHost.phase, "starter_draft");

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

console.log("Rigged multiplayer room tests passed (names, codes, ordered turret/vehicle picks, shared state, and the both-player round gate). ");
