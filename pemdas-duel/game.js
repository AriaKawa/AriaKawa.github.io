import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
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
  runTransaction,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { firebaseConfig } from "../assets/js/firebase-config.js";

const targetScore = 5;
const roomsPath = "pemdasDuelRooms";
const playerStorageKey = "pemdas-duel-player-id";
const nameStorageKey = "pemdas-duel-name";

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
  roundState: document.querySelector("[data-round-state]"),
  playerCards: Array.from(document.querySelectorAll("[data-player-card]")),
  question: document.querySelector("[data-question]"),
  answerForm: document.querySelector("[data-answer-form]"),
  answer: document.querySelector("[data-answer]"),
  submit: document.querySelector("[data-submit]"),
  ready: document.querySelector("[data-ready]"),
  start: document.querySelector("[data-start]"),
  newMatch: document.querySelector("[data-new-match]"),
  leave: document.querySelector("[data-leave]"),
  gameNotice: document.querySelector("[data-game-notice]"),
  celebration: document.querySelector("[data-celebration]"),
  celebrationNewMatch: document.querySelector("[data-celebration-new-match]"),
  winnerText: document.querySelector("[data-winner-text]"),
  winnerSubtext: document.querySelector("[data-winner-subtext]"),
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const roomsRef = ref(db, roomsPath);

let user = null;
let playerId = getPlayerId();
let currentRoomCode = "";
let currentRoom = null;
let unsubscribeRoom = null;
let lastQuestionId = "";

els.name.value = localStorage.getItem(nameStorageKey) || "";

function getPlayerId() {
  let id = sessionStorage.getItem(playerStorageKey);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `player-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    sessionStorage.setItem(playerStorageKey, id);
  }
  return id;
}

function cleanName(value) {
  return value.replace(/\s+/g, " ").trim().slice(0, 18) || "Math mogul";
}

function makeRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function getRoomRef(code = currentRoomCode) {
  return child(roomsRef, code);
}

function getPlayerRef(code = currentRoomCode, id = playerId) {
  return child(getRoomRef(code), `players/${id}`);
}

function setConnection(text, online = false) {
  els.connection.textContent = text;
  els.connection.classList.toggle("is-online", online);
}

function setLobbyNotice(text) {
  els.lobbyNotice.textContent = text;
}

function setGameNotice(text) {
  els.gameNotice.textContent = text;
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
  const code = await findOpenRoomCode();
  await set(getRoomRef(code), {
    code,
    hostId: playerId,
    status: "lobby",
    targetScore,
    questionNumber: 1,
    question: makeQuestion(1),
    winnerId: "",
    lastAnswer: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await joinRoom(code);
}

async function findOpenRoomCode() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = makeRoomCode();
    const snapshot = await get(getRoomRef(code));
    if (!snapshot.exists()) return code;
  }
  throw new Error("Could not allocate a room code.");
}

async function joinRoom(rawCode) {
  await ensureAuth();
  const code = rawCode.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  if (!code) {
    setLobbyNotice("Enter a room code.");
    return;
  }

  const snapshot = await get(getRoomRef(code));
  if (!snapshot.exists()) {
    setLobbyNotice("That room does not exist.");
    return;
  }

  const room = snapshot.val();
  const players = room.players || {};
  if (!players[playerId] && Object.keys(players).length >= 2) {
    setLobbyNotice("That room already has two players.");
    return;
  }

  currentRoomCode = code;
  lastQuestionId = "";
  localStorage.setItem(nameStorageKey, cleanName(els.name.value));
  await set(getPlayerRef(code), {
    name: cleanName(els.name.value),
    authId: user.uid,
    ready: false,
    score: players[playerId]?.score || 0,
    streak: 0,
    answerState: "",
    joinedAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
  });
  onDisconnect(getPlayerRef(code)).remove();
  subscribeRoom(code);
  els.lobby.hidden = true;
  els.arena.hidden = false;
  els.answer.value = "";
}

function subscribeRoom(code) {
  if (unsubscribeRoom) unsubscribeRoom();
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
  return Object.entries(currentRoom?.players || {})
    .map(([id, value]) => ({ id, ...value }))
    .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
}

function isHost() {
  return currentRoom?.hostId === playerId;
}

function renderRoom() {
  const players = getPlayers();
  const localPlayer = players.find((player) => player.id === playerId);
  const status = currentRoom.status || "lobby";
  const question = currentRoom.question || null;

  els.copyRoom.textContent = currentRoomCode;
  els.roundState.textContent = labelStatus(status);
  els.question.textContent = question?.expression || "Ready?";
  els.ready.textContent = localPlayer?.ready ? "Unready" : "Ready";
  els.ready.disabled = status !== "lobby";
  els.start.disabled = !canStart(players);
  els.newMatch.disabled = !isHost();
  els.celebrationNewMatch.disabled = !isHost();
  els.answer.disabled = status !== "playing";
  els.submit.disabled = status !== "playing";

  if (status === "playing" && question?.id && question.id !== lastQuestionId) {
    lastQuestionId = question.id;
    els.answer.value = "";
    requestAnimationFrame(() => els.answer.focus());
  }

  renderPlayers(players);
  renderNotice(players);
  renderCelebration(players);
}

function labelStatus(status) {
  if (status === "playing") return "Live question";
  if (status === "finished") return "Finished";
  return "Lobby";
}

function canStart(players) {
  return isHost()
    && currentRoom?.status === "lobby"
    && players.length === 2
    && players.every((player) => player.ready);
}

function renderPlayers(players) {
  els.playerCards.forEach((card, index) => {
    const player = players[index];
    const role = card.querySelector("[data-player-role]");
    const name = card.querySelector("[data-player-name]");
    const status = card.querySelector("[data-player-status]");
    const pips = card.querySelector("[data-score-pips]");

    card.classList.toggle("is-local", player?.id === playerId);
    card.classList.toggle("is-winner", player?.id === currentRoom.winnerId);
    role.textContent = index === 0 ? "Seat 1" : "Seat 2";

    if (!player) {
      name.textContent = "Waiting";
      status.textContent = "Open seat";
      renderPips(pips, 0);
      return;
    }

    const badges = [];
    if (player.id === currentRoom.hostId) badges.push("Host");
    if (player.id === playerId) badges.push("You");
    role.textContent = badges.length ? badges.join(" / ") : `Seat ${index + 1}`;
    name.textContent = player.name || "Player";
    status.textContent = getPlayerStatus(player);
    renderPips(pips, player.score || 0);
  });
}

function renderPips(container, score) {
  container.innerHTML = "";
  for (let index = 0; index < targetScore; index += 1) {
    const pip = document.createElement("span");
    pip.classList.toggle("is-filled", index < score);
    container.appendChild(pip);
  }
}

function getPlayerStatus(player) {
  if (currentRoom.status === "finished" && currentRoom.winnerId === player.id) return "Champion";
  if (currentRoom.status === "finished") return `${player.score || 0} points`;
  if (currentRoom.status === "playing" && player.answerState === "miss") return "Recalculating";
  if (currentRoom.status === "playing" && player.answerState === "hit") return "Scored";
  if (currentRoom.status === "playing") return `${player.score || 0} points`;
  return player.ready ? "Ready" : "Waiting";
}

function renderNotice(players) {
  if (currentRoom.status === "finished") {
    const winner = players.find((player) => player.id === currentRoom.winnerId);
    setGameNotice(winner ? `${winner.name} hit five points first.` : "Match finished.");
    return;
  }

  if (currentRoom.status === "playing") {
    const last = currentRoom.lastAnswer;
    setGameNotice(last?.name ? `${last.name} scored. Next question is live.` : "Solve the expression first to score.");
    return;
  }

  if (players.length < 2) {
    setGameNotice("Waiting for a second player.");
  } else if (!players.every((player) => player.ready)) {
    setGameNotice("Both players need to ready up.");
  } else if (isHost()) {
    setGameNotice("Everyone is ready.");
  } else {
    setGameNotice("Waiting for the host to start.");
  }
}

function renderCelebration(players) {
  const finished = currentRoom.status === "finished";
  els.celebration.hidden = !finished;
  if (!finished) return;

  const winner = players.find((player) => player.id === currentRoom.winnerId);
  const winnerName = winner?.name || "Winner";
  els.winnerText.textContent = `${winnerName} wins`;
  els.winnerSubtext.textContent = `${winnerName} claimed ${targetScore} points in PEMDAS Duel.`;
  els.celebrationNewMatch.textContent = isHost() ? "New match" : "Host starts rematch";
}

async function toggleReady() {
  if (!currentRoom || currentRoom.status !== "lobby") return;
  const localPlayer = getPlayers().find((player) => player.id === playerId);
  await update(getPlayerRef(), {
    ready: !localPlayer?.ready,
    lastSeen: serverTimestamp(),
  });
}

async function startMatch() {
  const players = getPlayers();
  if (!canStart(players)) return;
  const updates = {
    status: "playing",
    winnerId: "",
    questionNumber: 1,
    question: makeQuestion(1),
    lastAnswer: null,
    startedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  players.forEach((player) => {
    updates[`players/${player.id}/score`] = 0;
    updates[`players/${player.id}/streak`] = 0;
    updates[`players/${player.id}/answerState`] = "";
  });

  await update(getRoomRef(), updates);
}

async function submitAnswer(event) {
  event.preventDefault();
  if (!currentRoom || currentRoom.status !== "playing" || !currentRoom.question) return;

  const answer = parseAnswer(els.answer.value);
  if (answer === null) {
    setGameNotice("Enter a number.");
    return;
  }

  if (!isCorrect(answer, currentRoom.question.answer)) {
    await update(getPlayerRef(), {
      answerState: "miss",
      lastSeen: serverTimestamp(),
    });
    setGameNotice("Not quite.");
    els.answer.select();
    return;
  }

  await awardPoint(currentRoom.question.id);
}

async function awardPoint(questionId) {
  const nextNumber = (currentRoom.questionNumber || 1) + 1;
  const nextQuestion = makeQuestion(nextNumber);
  const result = await runTransaction(getRoomRef(), (room) => {
    if (!room || room.status !== "playing" || room.winnerId) return undefined;
    if (!room.question || room.question.id !== questionId) return undefined;
    if (!room.players || !room.players[playerId]) return undefined;

    const player = room.players[playerId];
    const nextScore = (player.score || 0) + 1;
    player.score = nextScore;
    player.streak = (player.streak || 0) + 1;
    player.answerState = "hit";

    Object.keys(room.players).forEach((id) => {
      if (id !== playerId) room.players[id].answerState = "";
    });

    room.lastAnswer = {
      playerId,
      name: player.name || "Player",
      questionId,
      at: Date.now(),
    };
    room.updatedAt = Date.now();

    if (nextScore >= (room.targetScore || targetScore)) {
      room.status = "finished";
      room.winnerId = playerId;
      room.finishedAt = Date.now();
    } else {
      room.questionNumber = nextNumber;
      room.question = nextQuestion;
    }

    return room;
  });

  if (result.committed) {
    els.answer.value = "";
  } else {
    setGameNotice("Too late. Next one.");
  }
}

async function newMatch() {
  if (!isHost() || !currentRoom) return;
  const players = getPlayers();
  const updates = {
    status: "lobby",
    winnerId: "",
    questionNumber: 1,
    question: makeQuestion(1),
    lastAnswer: null,
    updatedAt: serverTimestamp(),
  };

  players.forEach((player) => {
    updates[`players/${player.id}/ready`] = false;
    updates[`players/${player.id}/score`] = 0;
    updates[`players/${player.id}/streak`] = 0;
    updates[`players/${player.id}/answerState`] = "";
  });

  await update(getRoomRef(), updates);
}

async function leaveRoom(removePlayer = true) {
  if (unsubscribeRoom) {
    unsubscribeRoom();
    unsubscribeRoom = null;
  }

  if (removePlayer && currentRoomCode) {
    await remove(getPlayerRef()).catch(() => {});
  }

  currentRoom = null;
  currentRoomCode = "";
  lastQuestionId = "";
  els.answer.value = "";
  els.lobby.hidden = false;
  els.arena.hidden = true;
  els.celebration.hidden = true;
}

function parseAnswer(value) {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;

  const fraction = normalized.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (fraction) {
    const numerator = Number(fraction[1]);
    const denominator = Number(fraction[2]);
    if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }

  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function isCorrect(given, expected) {
  return Math.abs(given - expected) < 0.01;
}

function makeQuestion(round) {
  const builders = [
    () => {
      const a = randomInt(4, 12);
      const b = randomInt(3, 12);
      const c = randomOdd(5, 17);
      return question(`${a}×${b}−${c}÷2`, a * b - c / 2, round);
    },
    () => {
      const a = randomInt(3, 9);
      const b = randomInt(2, 8);
      const c = randomInt(3, 7);
      const d = randomInt(4, 14);
      return question(`(${a}+${b})×${c}−${d}`, (a + b) * c - d, round);
    },
    () => {
      const a = randomInt(4, 11);
      const b = randomInt(2, 9);
      const c = randomInt(3, 8);
      return question(`${a}²+${b}×${c}`, a ** 2 + b * c, round);
    },
    () => {
      const a = randomInt(12, 35);
      const b = randomInt(3, 9);
      const c = randomInt(2, 8);
      const d = randomInt(4, 12);
      return question(`${a}+${b}×${c}−${d}`, a + b * c - d, round);
    },
    () => {
      const c = randomInt(2, 5);
      const a = c * randomInt(3, 8);
      const b = c * randomInt(2, 6);
      const d = randomInt(5, 18);
      return question(`(${a}+${b})÷${c}+${d}`, (a + b) / c + d, round);
    },
    () => {
      const a = randomInt(3, 8);
      const b = randomInt(4, 10);
      const c = randomInt(2, 7);
      const d = randomInt(6, 16);
      return question(`${a}×(${b}+${c})−${d}`, a * (b + c) - d, round);
    },
  ];

  return builders[Math.floor(Math.random() * builders.length)]();
}

function question(expression, answer, round) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    round,
    expression,
    answer: Math.round(answer * 100) / 100,
  };
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOdd(min, max) {
  let value = randomInt(min, max);
  if (value % 2 === 0) value += value === max ? -1 : 1;
  return value;
}

els.createRoom.addEventListener("click", () => {
  createRoom().catch((error) => {
    console.error(error);
    setLobbyNotice("Could not create a room. Check Firebase Anonymous Auth and Realtime Database rules.");
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
    setGameNotice("Room code copied.");
  } catch {
    setGameNotice(`Room code: ${currentRoomCode}`);
  }
});

els.name.addEventListener("input", () => {
  localStorage.setItem(nameStorageKey, cleanName(els.name.value));
});

els.ready.addEventListener("click", () => toggleReady());
els.start.addEventListener("click", () => startMatch());
els.newMatch.addEventListener("click", () => newMatch());
els.celebrationNewMatch.addEventListener("click", () => newMatch());
els.leave.addEventListener("click", () => leaveRoom());
els.answerForm.addEventListener("submit", submitAnswer);

window.addEventListener("beforeunload", () => {
  if (currentRoomCode) remove(getPlayerRef());
});

ensureAuth().catch((error) => {
  console.error(error);
  setConnection("Auth blocked", false);
  setLobbyNotice("Firebase sign-in is blocked. Enable Anonymous Auth, then refresh.");
});
