import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  set,
  update,
  remove,
  onDisconnect,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMKUChewk2QMqNi-klW2NPB8jPtrDz_Hg",
  authDomain: "multiplayer-640ec.firebaseapp.com",
  databaseURL: "https://multiplayer-640ec-default-rtdb.firebaseio.com",
  projectId: "multiplayer-640ec",
  storageBucket: "multiplayer-640ec.firebasestorage.app",
  messagingSenderId: "94914236381",
  appId: "1:94914236381:web:c716d8b16991f9230cf034",
  measurementId: "G-KFGCR5FZCF",
};

const prompts = [
  "The snack lab opened at midnight and every champion sprinted toward the golden keyboard with absolutely heroic hunger.",
  "Fast fingers turn tiny victories into giant legends, especially when the crowd starts chanting for one more impossible round.",
  "Nobody expected the typing tournament to involve pastries, pressure gauges, and a trophy shaped like a suspiciously heavy crown.",
  "The room went quiet, the timer blinked, and two rivals began hammering keys like the fate of dessert depended on every letter.",
  "Accuracy feeds the machine, speed pumps the meter, and the first player to reach critical mass claims the strangest win online.",
];

const els = {
  lobby: document.querySelector("[data-lobby]"),
  arena: document.querySelector("[data-arena]"),
  connection: document.querySelector("[data-connection]"),
  name: document.querySelector("[data-name]"),
  createRoom: document.querySelector("[data-create-room]"),
  joinForm: document.querySelector("[data-join-form]"),
  roomCodeInput: document.querySelector("[data-room-code]"),
  lobbyNotice: document.querySelector("[data-lobby-notice]"),
  copyRoom: document.querySelector("[data-copy-room]"),
  raceState: document.querySelector("[data-race-state]"),
  playerGrid: document.querySelector("[data-player-grid]"),
  prompt: document.querySelector("[data-prompt]"),
  input: document.querySelector("[data-typing-input]"),
  ready: document.querySelector("[data-ready]"),
  start: document.querySelector("[data-start]"),
  newRound: document.querySelector("[data-new-round]"),
  leave: document.querySelector("[data-leave]"),
  notice: document.querySelector("[data-game-notice]"),
  countdown: document.querySelector("[data-countdown]"),
  playerTemplate: document.querySelector("[data-player-template]"),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const roomsRef = ref(db, "typeOffRooms");

let user = null;
let currentRoomCode = "";
let currentRoom = null;
let unsubscribeRoom = null;
let localInput = "";
let raceTimer = null;
let lastProgressWrite = 0;

function cleanName(value) {
  return value.replace(/\s+/g, " ").trim().slice(0, 18) || "Speed legend";
}

function makeRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function getRoomRef(code = currentRoomCode) {
  return child(roomsRef, code);
}

function getPlayerRef(code = currentRoomCode, uid = user?.uid) {
  return child(getRoomRef(code), `players/${uid}`);
}

function setConnection(text, online = false) {
  els.connection.textContent = text;
  els.connection.classList.toggle("is-online", online);
}

function setLobbyNotice(text) {
  els.lobbyNotice.textContent = text;
}

async function ensureAuth() {
  return new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser) {
        stop();
        user = nextUser;
        setConnection("Online", true);
        resolve(nextUser);
        return;
      }

      try {
        await signInAnonymously(auth);
      } catch (error) {
        stop();
        reject(error);
      }
    });
  });
}

async function createRoom() {
  await ensureAuth();
  const roomCode = makeRoomCode();
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  await set(getRoomRef(roomCode), {
    code: roomCode,
    hostId: user.uid,
    status: "lobby",
    prompt,
    createdAt: serverTimestamp(),
    startedAt: 0,
    winnerId: "",
  });
  await joinRoom(roomCode);
}

async function joinRoom(roomCode) {
  await ensureAuth();
  const code = roomCode.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  if (!code) {
    setLobbyNotice("Enter a room code first.");
    return;
  }

  const snapshot = await get(getRoomRef(code));
  if (!snapshot.exists()) {
    setLobbyNotice("That room does not exist yet.");
    return;
  }

  currentRoomCode = code;
  localInput = "";
  els.input.value = "";
  const player = {
    name: cleanName(els.name.value),
    ready: false,
    progress: 0,
    typed: 0,
    correct: 0,
    wpm: 0,
    accuracy: 100,
    mass: 0,
    joinedAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
  };

  await set(getPlayerRef(code), player);
  onDisconnect(getPlayerRef(code)).remove();
  subscribeRoom(code);
  els.lobby.hidden = true;
  els.arena.hidden = false;
}

function subscribeRoom(code) {
  if (unsubscribeRoom) {
    unsubscribeRoom();
  }

  unsubscribeRoom = onValue(getRoomRef(code), (snapshot) => {
    currentRoom = snapshot.val();
    if (!currentRoom) {
      leaveRoom(false);
      setLobbyNotice("The room closed.");
      return;
    }
    renderRoom();
  });
}

function getPlayers() {
  return Object.entries(currentRoom?.players || {}).map(([id, value]) => ({ id, ...value }));
}

function isHost() {
  return currentRoom?.hostId === user?.uid;
}

function renderRoom() {
  const players = getPlayers();
  els.copyRoom.textContent = currentRoomCode;
  els.raceState.textContent = labelStatus(currentRoom.status);
  els.prompt.innerHTML = renderPrompt(currentRoom.prompt || "", localInput);
  els.ready.textContent = players.find((player) => player.id === user?.uid)?.ready ? "Unready" : "Ready";
  els.start.disabled = !isHost() || currentRoom.status !== "lobby" || players.length < 2 || players.some((player) => !player.ready);
  els.newRound.disabled = !isHost() || currentRoom.status !== "finished";
  els.input.disabled = currentRoom.status !== "racing";
  els.input.placeholder = currentRoom.status === "racing" ? "Type the prompt here..." : "Ready up, then race.";
  renderPlayers(players);
  updateNotice(players);
  updateCountdown();
}

function labelStatus(status) {
  if (status === "countdown") return "Starting";
  if (status === "racing") return "Racing";
  if (status === "finished") return "Finished";
  return "Lobby";
}

function renderPrompt(prompt, input) {
  return Array.from(prompt).map((char, index) => {
    const typed = input[index];
    if (typed === undefined) return `<span>${escapeHtml(char)}</span>`;
    const className = typed === char ? "typed" : "wrong";
    return `<span class="${className}">${escapeHtml(char)}</span>`;
  }).join("");
}

function renderPlayers(players) {
  els.playerGrid.innerHTML = "";
  players
    .sort((a, b) => (b.mass || 0) - (a.mass || 0))
    .forEach((player) => {
      const fragment = els.playerTemplate.content.cloneNode(true);
      const card = fragment.querySelector(".player-card");
      const avatar = fragment.querySelector("[data-avatar]");
      const mass = Math.min(100, player.mass || 0);
      const stage = Math.min(3, Math.floor(mass / 25));
      const stageProgress = (mass % 25) / 25;
      const scale = 1 + stageProgress * 0.08;

      card.classList.toggle("is-local", player.id === user?.uid);
      card.classList.toggle("is-winner", currentRoom.winnerId === player.id);
      avatar.style.setProperty("--scale", scale.toFixed(2));
      avatar.dataset.stage = String(stage);
      avatar.style.filter = player.mass >= 100 ? "saturate(1.45) brightness(1.12)" : "";

      fragment.querySelector("[data-player-name]").textContent = player.name || "Player";
      fragment.querySelector("[data-player-status]").textContent = getPlayerStatus(player);
      fragment.querySelector("[data-player-badge]").textContent = player.id === currentRoom.hostId ? "Host" : "Guest";
      fragment.querySelector("[data-player-wpm]").textContent = Math.round(player.wpm || 0);
      fragment.querySelector("[data-player-accuracy]").textContent = `${Math.round(player.accuracy || 100)}%`;
      fragment.querySelector("[data-player-mass]").textContent = `${Math.round(player.mass || 0)}%`;
      fragment.querySelector("[data-player-meter]").style.width = `${Math.min(100, player.mass || 0)}%`;
      els.playerGrid.appendChild(fragment);
    });
}

function getPlayerStatus(player) {
  if (currentRoom.status === "finished" && currentRoom.winnerId === player.id) return "Critical mass victory";
  if (currentRoom.status === "finished") return "Outpaced";
  if (currentRoom.status === "racing") return `${Math.round((player.progress || 0) * 100)}% complete`;
  return player.ready ? "Ready" : "Waiting";
}

function updateNotice(players) {
  if (currentRoom.status === "finished") {
    const winner = players.find((player) => player.id === currentRoom.winnerId);
    els.notice.textContent = winner ? `${winner.name} hit critical mass first and wins.` : "Round finished.";
  } else if (currentRoom.status === "racing") {
    els.notice.textContent = "Speed and accuracy both feed the mass meter. First to 100% wins.";
  } else if (players.length < 2) {
    els.notice.textContent = "Send the room code to a friend so they can join.";
  } else if (players.some((player) => !player.ready)) {
    els.notice.textContent = "Both players need to ready up.";
  } else if (isHost()) {
    els.notice.textContent = "Everyone is ready. Start the race.";
  } else {
    els.notice.textContent = "Waiting for the host to start.";
  }
}

function updateCountdown() {
  clearInterval(raceTimer);
  raceTimer = null;

  if (currentRoom?.status !== "countdown") {
    els.countdown.hidden = true;
    return;
  }

  const tick = () => {
    const left = Math.ceil((currentRoom.startedAt - Date.now()) / 1000);
    els.countdown.hidden = false;
    els.countdown.textContent = left > 0 ? String(left) : "GO";
    if (left <= -1 && isHost()) {
      update(getRoomRef(), { status: "racing" });
    }
  };

  tick();
  raceTimer = setInterval(tick, 180);
}

async function toggleReady() {
  if (!currentRoom || currentRoom.status !== "lobby") return;
  const local = getPlayers().find((player) => player.id === user.uid);
  await update(getPlayerRef(), {
    ready: !local?.ready,
    lastSeen: serverTimestamp(),
  });
}

async function startRace() {
  if (!isHost() || currentRoom.status !== "lobby") return;
  const startedAt = Date.now() + 3200;
  await update(getRoomRef(), {
    status: "countdown",
    startedAt,
    winnerId: "",
  });
}

async function newRound() {
  if (!isHost()) return;
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  const updates = {
    prompt,
    status: "lobby",
    startedAt: 0,
    winnerId: "",
  };
  getPlayers().forEach((player) => {
    updates[`players/${player.id}/ready`] = false;
    updates[`players/${player.id}/progress`] = 0;
    updates[`players/${player.id}/typed`] = 0;
    updates[`players/${player.id}/correct`] = 0;
    updates[`players/${player.id}/wpm`] = 0;
    updates[`players/${player.id}/accuracy`] = 100;
    updates[`players/${player.id}/mass`] = 0;
  });
  localInput = "";
  els.input.value = "";
  await update(getRoomRef(), updates);
}

async function handleTyping() {
  if (!currentRoom || currentRoom.status !== "racing") return;
  localInput = els.input.value;
  const prompt = currentRoom.prompt || "";
  const metrics = calculateMetrics(prompt, localInput);
  els.prompt.innerHTML = renderPrompt(prompt, localInput);

  const now = performance.now();
  if (now - lastProgressWrite < 120 && metrics.mass < 100) return;
  lastProgressWrite = now;

  await update(getPlayerRef(), {
    ...metrics,
    lastSeen: serverTimestamp(),
  });

  if (metrics.mass >= 100 && !currentRoom.winnerId) {
    await update(getRoomRef(), {
      status: "finished",
      winnerId: user.uid,
      finishedAt: serverTimestamp(),
    });
  }
}

function calculateMetrics(prompt, input) {
  let correct = 0;
  for (let index = 0; index < input.length; index += 1) {
    if (input[index] === prompt[index]) correct += 1;
  }

  const typed = input.length;
  const progress = prompt.length ? Math.min(1, correct / prompt.length) : 0;
  const elapsedMinutes = Math.max((Date.now() - currentRoom.startedAt) / 60000, 1 / 600);
  const wpm = correct / 5 / elapsedMinutes;
  const accuracy = typed ? correct / typed * 100 : 100;
  const speedBoost = Math.max(0, wpm - 22) * 0.62;
  const mass = Math.min(100, 6 + progress * 72 + speedBoost + Math.max(0, accuracy - 88) * 0.45);

  return {
    progress,
    typed,
    correct,
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy),
    mass: Math.round(mass),
  };
}

async function leaveRoom(removePlayer = true) {
  clearInterval(raceTimer);
  raceTimer = null;
  if (unsubscribeRoom) {
    unsubscribeRoom();
    unsubscribeRoom = null;
  }

  if (removePlayer && currentRoomCode && user) {
    await remove(getPlayerRef());
  }

  currentRoom = null;
  currentRoomCode = "";
  localInput = "";
  els.input.value = "";
  els.lobby.hidden = false;
  els.arena.hidden = true;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.createRoom.addEventListener("click", () => {
  createRoom().catch((error) => {
    console.error(error);
    setLobbyNotice("Could not create a room. Check Firebase rules and Anonymous Auth.");
  });
});

els.joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  joinRoom(els.roomCodeInput.value).catch((error) => {
    console.error(error);
    setLobbyNotice("Could not join that room.");
  });
});

els.copyRoom.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentRoomCode);
    els.notice.textContent = "Room code copied.";
  } catch {
    els.notice.textContent = `Room code: ${currentRoomCode}`;
  }
});

els.ready.addEventListener("click", () => toggleReady());
els.start.addEventListener("click", () => startRace());
els.newRound.addEventListener("click", () => newRound());
els.leave.addEventListener("click", () => leaveRoom());
els.input.addEventListener("input", () => handleTyping());

window.addEventListener("beforeunload", () => {
  if (currentRoomCode && user) {
    remove(getPlayerRef());
  }
});

ensureAuth().catch((error) => {
  console.error(error);
  setConnection("Auth blocked", false);
  setLobbyNotice("Enable Firebase Anonymous Auth, then refresh this page.");
});
