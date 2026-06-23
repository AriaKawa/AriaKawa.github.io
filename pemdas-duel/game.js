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
const countdownDurationMs = 3000;
const roundDurationMs = 20000;
const revealDurationMs = 4000;
const roomsPath = "pemdasDuelRooms";
const playerStorageKey = "pemdas-duel-player-id";
const nameStorageKey = "pemdas-duel-name";
const aiPlayerId = "ai-test-player";

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
  battleSections: Array.from(document.querySelectorAll("[data-battle-ui]")),
  roomControls: document.querySelector("[data-room-controls]"),
  matchCountdown: document.querySelector("[data-match-countdown]"),
  matchCountdownValue: document.querySelector("[data-match-countdown-value]"),
  roundClock: document.querySelector("[data-round-clock]"),
  roundClockValue: document.querySelector("[data-round-clock-value]"),
  question: document.querySelector("[data-question]"),
  answerReveal: document.querySelector("[data-answer-reveal]"),
  answerValue: document.querySelector("[data-answer-value]"),
  countdownValue: document.querySelector("[data-countdown-value]"),
  answerForm: document.querySelector("[data-answer-form]"),
  answer: document.querySelector("[data-answer]"),
  submit: document.querySelector("[data-submit]"),
  ready: document.querySelector("[data-ready]"),
  aiPlayer: document.querySelector("[data-ai-player]"),
  start: document.querySelector("[data-start]"),
  newMatch: document.querySelector("[data-new-match]"),
  leave: document.querySelector("[data-leave]"),
  gameNotice: document.querySelector("[data-game-notice]"),
  celebration: document.querySelector("[data-celebration]"),
  celebrationNewMatch: document.querySelector("[data-celebration-new-match]"),
  winnerText: document.querySelector("[data-winner-text]"),
  winnerSubtext: document.querySelector("[data-winner-subtext]"),
  finalAnswer: document.querySelector("[data-final-answer]"),
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
let countdownTimer = null;
let countdownAdvancePending = false;
let lastCountdownTick = null;
let roundTimer = null;
let roundTimeoutPending = false;
let lastRoundTick = null;
let revealTimer = null;
let revealAdvancePending = false;
let lastRevealTick = null;
let lastCorrectSoundId = "";
let audioContext = null;
let audioUnlocked = false;

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

function unlockAudio() {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    audioUnlocked = true;
  } catch {
    audioUnlocked = false;
  }
}

function playSound(kind) {
  if (!audioUnlocked || !audioContext) return;

  if (kind === "correct") {
    playTone(620, 0, 0.08, "sine", 0.035);
    playTone(880, 0.08, 0.12, "sine", 0.03);
  } else if (kind === "wrong") {
    playTone(260, 0, 0.09, "triangle", 0.035);
    playTone(185, 0.09, 0.12, "triangle", 0.028);
  } else if (kind === "tick") {
    playTone(720, 0, 0.045, "sine", 0.02);
  }
}

function playTone(frequency, delay, duration, type, volume) {
  const start = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
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
    question: null,
    countdownEndsAt: 0,
    roundEndsAt: 0,
    reveal: null,
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
  const reveal = currentRoom.reveal || null;

  els.copyRoom.textContent = currentRoomCode;
  els.roundState.textContent = labelStatus(status);
  els.question.textContent = status === "revealing" && reveal?.expression
    ? reveal.expression
    : question?.expression || "Ready?";
  const isBattleVisible = status === "playing" || status === "revealing";
  els.battleSections.forEach((section) => {
    section.hidden = !isBattleVisible;
  });
  els.roomControls.hidden = status !== "lobby";
  els.ready.textContent = localPlayer?.ready ? "Unready" : "Ready";
  els.ready.disabled = status !== "lobby";
  els.start.disabled = !canStart(players);
  els.newMatch.disabled = !isHost();
  els.celebrationNewMatch.disabled = !isHost();
  renderAiControl(players);
  els.answer.disabled = status !== "playing";
  els.submit.disabled = status !== "playing";

  if (status === "playing" && question?.id && question.id !== lastQuestionId) {
    lastQuestionId = question.id;
    els.answer.value = "";
    requestAnimationFrame(() => els.answer.focus());
  }

  renderPlayers(players);
  renderMatchCountdown();
  renderRoundTimer();
  renderAnswerReveal();
  renderNotice(players);
  renderCelebration(players);
}

function labelStatus(status) {
  if (status === "countdown") return "Starting";
  if (status === "revealing") return "Answer reveal";
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

function renderAiControl(players) {
  const aiPlayer = players.find((player) => player.isAi);
  els.aiPlayer.hidden = !isHost();
  els.aiPlayer.textContent = aiPlayer ? "Remove AI player" : "Add AI player";
  els.aiPlayer.disabled = currentRoom?.status !== "lobby" || (!aiPlayer && players.length >= 2);
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
    if (player.isAi) {
      badges.push("AI");
    } else {
      if (player.id === currentRoom.hostId) badges.push("Host");
      if (player.id === playerId) badges.push("You");
    }
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
  if (player.isAi && currentRoom.status === "lobby") return "Idle test player";
  if (player.isAi && currentRoom.status === "playing") return "Idle";
  if (currentRoom.status === "countdown") return "Locked in";
  if (currentRoom.status === "revealing" && player.answerState === "hit") return "Scored";
  if (currentRoom.status === "revealing") return "Watching answer";
  if (currentRoom.status === "playing" && player.answerState === "miss") return "Recalculating";
  if (currentRoom.status === "playing" && player.answerState === "hit") return "Scored";
  if (currentRoom.status === "playing") return `${player.score || 0} points`;
  return player.ready ? "Ready" : "Waiting";
}

function renderNotice(players) {
  if (currentRoom.status === "finished") {
    const winner = players.find((player) => player.id === currentRoom.winnerId);
    const answer = currentRoom.reveal ? formatAnswer(currentRoom.reveal.answer) : "";
    setGameNotice(winner ? `${winner.name} hit five points first. Final answer: ${answer}.` : "Match finished.");
    return;
  }

  if (currentRoom.status === "revealing") {
    const reveal = currentRoom.reveal;
    if (!reveal) {
      setGameNotice("Answer revealed.");
      return;
    }
    const countdown = getRevealCountdown(reveal.endsAt);
    const nextText = reveal.final ? "Match ends" : "Next question";
    const prefix = reveal.timedOut ? "Time's up" : `${reveal.name} scored`;
    setGameNotice(`${prefix}. Correct answer: ${formatAnswer(reveal.answer)}. ${nextText} in ${countdown}.`);
    return;
  }

  if (currentRoom.status === "countdown") {
    setGameNotice("Match starting.");
    return;
  }

  if (currentRoom.status === "playing") {
    const last = currentRoom.lastAnswer;
    setGameNotice(last?.name && !last.timedOut
      ? `${last.name} scored. Next question is live.`
      : "Solve the expression first to score.");
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

function renderMatchCountdown() {
  const isVisible = currentRoom.status === "countdown";
  els.matchCountdown.hidden = !isVisible;
  clearInterval(countdownTimer);
  countdownTimer = null;

  if (!isVisible) {
    countdownAdvancePending = false;
    lastCountdownTick = null;
    return;
  }

  const tick = () => {
    const count = Math.max(1, Math.ceil(((currentRoom.countdownEndsAt || Date.now()) - Date.now()) / 1000));
    els.matchCountdownValue.textContent = String(count);
    if (count !== lastCountdownTick) {
      lastCountdownTick = count;
      playSound("tick");
    }

    if (Date.now() >= (currentRoom.countdownEndsAt || 0)) {
      advanceCountdown();
    }
  };

  tick();
  countdownTimer = setInterval(tick, 120);
}

function renderRoundTimer() {
  const isVisible = currentRoom.status === "playing" && currentRoom.roundEndsAt;
  els.roundClock.hidden = !isVisible;
  clearInterval(roundTimer);
  roundTimer = null;

  if (!isVisible) {
    roundTimeoutPending = false;
    lastRoundTick = null;
    els.roundClock.classList.remove("is-urgent");
    return;
  }

  const tick = () => {
    const count = getRoundCountdown(currentRoom.roundEndsAt);
    els.roundClockValue.textContent = `${count}s`;
    els.roundClock.classList.toggle("is-urgent", count <= 5);
    if (count !== lastRoundTick) {
      lastRoundTick = count;
      if (count > 0 && count <= 5) playSound("tick");
    }

    if (Date.now() >= currentRoom.roundEndsAt) {
      advanceRoundTimeout();
    }
  };

  tick();
  roundTimer = setInterval(tick, 200);
}

function renderAnswerReveal() {
  const reveal = currentRoom.reveal;
  const isVisible = currentRoom.status === "revealing" && reveal;
  els.answerReveal.hidden = !isVisible;
  clearInterval(revealTimer);
  revealTimer = null;

  if (!isVisible) {
    revealAdvancePending = false;
    lastRevealTick = null;
    return;
  }

  if (!reveal.timedOut && reveal.questionId && reveal.questionId !== lastCorrectSoundId) {
    lastCorrectSoundId = reveal.questionId;
    playSound("correct");
  }

  els.answerValue.textContent = formatAnswer(reveal.answer);

  const tick = () => {
    const countdown = getRevealCountdown(reveal.endsAt);
    els.countdownValue.textContent = reveal.final
      ? `Match ends in ${countdown}`
      : `Next question in ${countdown}`;
    if (countdown !== lastRevealTick) {
      lastRevealTick = countdown;
      if (countdown > 0) playSound("tick");
    }

    if (Date.now() >= reveal.endsAt) {
      advanceReveal();
    }
  };

  tick();
  revealTimer = setInterval(tick, 200);
}

function renderCelebration(players) {
  const finished = currentRoom.status === "finished";
  els.celebration.hidden = !finished;
  if (!finished) return;

  const winner = players.find((player) => player.id === currentRoom.winnerId);
  const winnerName = winner?.name || "Winner";
  els.winnerText.textContent = `${winnerName} wins`;
  els.winnerSubtext.textContent = `${winnerName} claimed ${targetScore} points in PEMDAS Duel.`;
  if (currentRoom.reveal) {
    els.finalAnswer.hidden = false;
    els.finalAnswer.textContent = `Final answer: ${currentRoom.reveal.expression} = ${formatAnswer(currentRoom.reveal.answer)}`;
  } else {
    els.finalAnswer.hidden = true;
  }
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

async function toggleAiPlayer() {
  if (!isHost() || !currentRoom || currentRoom.status !== "lobby") return;
  const players = getPlayers();
  const existingAi = players.find((player) => player.isAi);

  if (existingAi) {
    await remove(getPlayerRef(currentRoomCode, existingAi.id));
    return;
  }

  if (players.length >= 2) {
    setGameNotice("The room already has two players.");
    return;
  }

  await set(getPlayerRef(currentRoomCode, aiPlayerId), {
    name: "AI Player",
    isAi: true,
    ready: true,
    score: 0,
    streak: 0,
    answerState: "",
    joinedAt: Date.now(),
    lastSeen: serverTimestamp(),
  });
}

async function startMatch() {
  const players = getPlayers();
  if (!canStart(players)) return;
  const now = Date.now();
  const updates = {
    status: "countdown",
    winnerId: "",
    questionNumber: 1,
    question: makeQuestion(1),
    countdownEndsAt: now + countdownDurationMs,
    roundEndsAt: 0,
    reveal: null,
    lastAnswer: null,
    startedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  players.forEach((player) => {
    updates[`players/${player.id}/score`] = 0;
    updates[`players/${player.id}/streak`] = 0;
    updates[`players/${player.id}/answerState`] = "";
    if (player.isAi) {
      updates[`players/${player.id}/ready`] = true;
    }
  });

  await update(getRoomRef(), updates);
}

async function advanceCountdown() {
  if (!currentRoom || currentRoom.status !== "countdown") return;
  if (countdownAdvancePending) return;
  countdownAdvancePending = true;

  await runTransaction(getRoomRef(), (room) => {
    if (!room || room.status !== "countdown") return undefined;
    if (Date.now() < (room.countdownEndsAt || 0)) return undefined;

    room.status = "playing";
    room.startedAt = Date.now();
    room.roundEndsAt = Date.now() + roundDurationMs;
    room.updatedAt = Date.now();
    if (!room.question) {
      room.question = makeQuestion(room.questionNumber || 1);
    }
    return room;
  }).catch(() => {}).finally(() => {
    countdownAdvancePending = false;
  });
}

async function advanceRoundTimeout() {
  if (!currentRoom || currentRoom.status !== "playing" || !currentRoom.question) return;
  if (roundTimeoutPending) return;
  roundTimeoutPending = true;
  const questionId = currentRoom.question.id;

  await runTransaction(getRoomRef(), (room) => {
    if (!room || room.status !== "playing" || room.winnerId) return undefined;
    if (!room.question || room.question.id !== questionId) return undefined;
    if (Date.now() < (room.roundEndsAt || 0)) return undefined;

    const timedQuestion = room.question;
    const nextNumber = (room.questionNumber || 1) + 1;
    const now = Date.now();
    room.lastAnswer = {
      playerId: "",
      name: "Time",
      questionId,
      expression: timedQuestion.expression,
      answer: timedQuestion.answer,
      at: now,
      timedOut: true,
    };
    room.reveal = {
      playerId: "",
      name: "Time",
      questionId,
      expression: timedQuestion.expression,
      answer: timedQuestion.answer,
      endsAt: now + revealDurationMs,
      final: false,
      timedOut: true,
      nextNumber,
      nextQuestion: makeQuestion(nextNumber),
    };
    room.status = "revealing";
    room.roundEndsAt = 0;
    room.updatedAt = now;

    Object.keys(room.players || {}).forEach((id) => {
      room.players[id].answerState = "";
    });

    return room;
  }).catch(() => {}).finally(() => {
    roundTimeoutPending = false;
  });
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
    playSound("wrong");
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
  const revealEndsAt = Date.now() + revealDurationMs;
  const result = await runTransaction(getRoomRef(), (room) => {
    if (!room || room.status !== "playing" || room.winnerId) return undefined;
    if (!room.question || room.question.id !== questionId) return undefined;
    if (!room.players || !room.players[playerId]) return undefined;

    const player = room.players[playerId];
    const nextScore = (player.score || 0) + 1;
    const solvedQuestion = room.question;
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
      expression: solvedQuestion.expression,
      answer: solvedQuestion.answer,
      at: Date.now(),
    };
    room.reveal = {
      playerId,
      name: player.name || "Player",
      questionId,
      expression: solvedQuestion.expression,
      answer: solvedQuestion.answer,
      endsAt: revealEndsAt,
      final: nextScore >= (room.targetScore || targetScore),
      nextNumber,
      nextQuestion,
    };
    room.status = "revealing";
    room.roundEndsAt = 0;
    room.updatedAt = Date.now();

    if (nextScore >= (room.targetScore || targetScore)) {
      room.winnerId = playerId;
    }

    return room;
  });

  if (result.committed) {
    els.answer.value = "";
  } else {
    setGameNotice("Too late. Next one.");
  }
}

async function advanceReveal() {
  if (!currentRoom || currentRoom.status !== "revealing" || !currentRoom.reveal) return;
  if (revealAdvancePending) return;
  revealAdvancePending = true;
  const revealId = currentRoom.reveal.questionId;

  await runTransaction(getRoomRef(), (room) => {
    if (!room || room.status !== "revealing" || !room.reveal) return undefined;
    if (room.reveal.questionId !== revealId || Date.now() < room.reveal.endsAt) return undefined;

    if (room.reveal.final) {
      room.status = "finished";
      room.finishedAt = Date.now();
      room.updatedAt = Date.now();
      return room;
    }

    room.status = "playing";
    room.questionNumber = room.reveal.nextNumber;
    room.question = room.reveal.nextQuestion || makeQuestion(room.reveal.nextNumber || 1);
    room.reveal = null;
    room.roundEndsAt = Date.now() + roundDurationMs;
    Object.keys(room.players || {}).forEach((id) => {
      room.players[id].answerState = "";
    });
    room.updatedAt = Date.now();
    return room;
  }).catch(() => {}).finally(() => {
    revealAdvancePending = false;
  });
}

async function newMatch() {
  if (!isHost() || !currentRoom) return;
  const players = getPlayers();
  const updates = {
    status: "lobby",
    winnerId: "",
    questionNumber: 1,
    question: null,
    countdownEndsAt: 0,
    roundEndsAt: 0,
    reveal: null,
    lastAnswer: null,
    updatedAt: serverTimestamp(),
  };

  players.forEach((player) => {
    updates[`players/${player.id}/ready`] = Boolean(player.isAi);
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
  els.matchCountdown.hidden = true;
  els.celebration.hidden = true;
  clearInterval(countdownTimer);
  countdownTimer = null;
  countdownAdvancePending = false;
  lastCountdownTick = null;
  clearInterval(roundTimer);
  roundTimer = null;
  roundTimeoutPending = false;
  lastRoundTick = null;
  els.roundClock.hidden = true;
  els.roundClock.classList.remove("is-urgent");
  clearInterval(revealTimer);
  revealTimer = null;
  revealAdvancePending = false;
  lastRevealTick = null;
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

function formatAnswer(answer) {
  if (!Number.isFinite(Number(answer))) return "--";
  return Number(answer).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(Number(answer)) ? 0 : 1,
  });
}

function getRevealCountdown(endsAt) {
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

function getRoundCountdown(endsAt) {
  return Math.max(0, Math.ceil(((endsAt || Date.now()) - Date.now()) / 1000));
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

document.addEventListener("pointerdown", unlockAudio, { once: true });
document.addEventListener("keydown", unlockAudio, { once: true });
els.ready.addEventListener("click", () => toggleReady());
els.aiPlayer.addEventListener("click", () => toggleAiPlayer());
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
