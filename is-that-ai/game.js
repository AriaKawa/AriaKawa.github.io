import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { firebaseConfig } from "../assets/js/firebase-config.js";
import { TRACKS } from "./tracks.js";

const ROOM_COLLECTION = "isThatAiRooms";
const TOTAL_ROUNDS = Math.min(10, TRACKS.length);
const MAX_PLAYERS = 16;
const ROUND_MS = 30_000;
const COUNTDOWN_MS = 3_800;
const REVEAL_MS = 7_500;
const PREVIEW_MS = 15_000;
const DEMO_DURATION_SECONDS = 180;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const elements = {
  screens: {
    home: document.getElementById("homeScreen"),
    lobby: document.getElementById("lobbyScreen"),
    countdown: document.getElementById("countdownScreen"),
    round: document.getElementById("gameScreen"),
    reveal: document.getElementById("revealScreen"),
    results: document.getElementById("resultsScreen"),
  },
  connectionPill: document.getElementById("connectionPill"),
  connectionText: document.getElementById("connectionText"),
  nameInput: document.getElementById("nameInput"),
  roomCodeInput: document.getElementById("roomCodeInput"),
  createRoomButton: document.getElementById("createRoomButton"),
  joinRoomButton: document.getElementById("joinRoomButton"),
  homeStatus: document.getElementById("homeStatus"),
  roomCodeDisplay: document.getElementById("roomCodeDisplay"),
  copyInviteButton: document.getElementById("copyInviteButton"),
  playerCount: document.getElementById("playerCount"),
  lobbyPlayerList: document.getElementById("lobbyPlayerList"),
  hostNote: document.getElementById("hostNote"),
  startGameButton: document.getElementById("startGameButton"),
  leaveLobbyButton: document.getElementById("leaveLobbyButton"),
  countdownRound: document.getElementById("countdownRound"),
  countdownNumber: document.getElementById("countdownNumber"),
  roundNumber: document.getElementById("roundNumber"),
  roundProgress: document.getElementById("roundProgress"),
  answeredCount: document.getElementById("answeredCount"),
  activePlayerCount: document.getElementById("activePlayerCount"),
  timerRing: document.getElementById("timerRing"),
  roundTimer: document.getElementById("roundTimer"),
  trackNumber: document.getElementById("trackNumber"),
  waveform: document.getElementById("waveform"),
  playButton: document.getElementById("playButton"),
  audioScrubber: document.getElementById("audioScrubber"),
  audioCurrentTime: document.getElementById("audioCurrentTime"),
  audioDuration: document.getElementById("audioDuration"),
  audioNote: document.getElementById("audioNote"),
  trackAudio: document.getElementById("trackAudio"),
  voteAiButton: document.getElementById("voteAiButton"),
  voteHumanButton: document.getElementById("voteHumanButton"),
  voteStatus: document.getElementById("voteStatus"),
  revealScreen: document.getElementById("revealScreen"),
  revealRound: document.getElementById("revealRound"),
  revealTimer: document.getElementById("revealTimer"),
  revealEyebrow: document.getElementById("revealEyebrow"),
  revealTitle: document.getElementById("revealTitle"),
  revealSubtitle: document.getElementById("revealSubtitle"),
  aiPickColumn: document.getElementById("aiPickColumn"),
  humanPickColumn: document.getElementById("humanPickColumn"),
  aiPickCount: document.getElementById("aiPickCount"),
  humanPickCount: document.getElementById("humanPickCount"),
  aiPickerList: document.getElementById("aiPickerList"),
  humanPickerList: document.getElementById("humanPickerList"),
  unansweredLine: document.getElementById("unansweredLine"),
  podium: document.getElementById("podium"),
  leaderboard: document.getElementById("leaderboard"),
  scoreTable: document.getElementById("scoreTable"),
  playAgainButton: document.getElementById("playAgainButton"),
  leaveResultsButton: document.getElementById("leaveResultsButton"),
  toast: document.getElementById("toast"),
};

const state = {
  playerId: sessionStorage.getItem("ita-player-id") || makePlayerId(),
  playerName: sessionStorage.getItem("ita-player-name") || "",
  roomCode: sessionStorage.getItem("ita-room-code") || "",
  room: null,
  unsubscribe: null,
  phaseKey: "",
  revealTimeout: null,
  toastTimeout: null,
  transitionAttemptAt: 0,
  leaving: false,
};

const audioState = {
  mode: "virtual",
  trackKey: "",
  virtualTime: 0,
  virtualBaseTime: 0,
  virtualStartedAt: 0,
  previewEndsAt: 0,
  playing: false,
  frame: 0,
};

sessionStorage.setItem("ita-player-id", state.playerId);
elements.nameInput.value = state.playerName;

function makePlayerId() {
  if (crypto.randomUUID) return `p_${crypto.randomUUID().replaceAll("-", "")}`;
  return `p_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function makeRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function cleanName(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, 20);
}

function cleanCode(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase() || "?";
}

function orderedPlayers(room, activeOnly = false) {
  return Object.values(room?.players || {})
    .filter((player) => !activeOnly || player.active !== false)
    .sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
}

function activePlayers(room) {
  return orderedPlayers(room, true);
}

function answerFor(player, roundIndex) {
  return player?.answers?.[String(roundIndex)] ?? player?.answers?.[roundIndex] ?? null;
}

function trackFor(room, roundIndex = room?.roundIndex ?? 0) {
  const trackIndex = room?.trackOrder?.[roundIndex] ?? roundIndex;
  return TRACKS[trackIndex] || TRACKS[roundIndex] || TRACKS[0];
}

function isHost(room = state.room) {
  return room?.hostId === state.playerId;
}

function allActivePlayersAnswered(room, roundIndex = room.roundIndex) {
  const players = activePlayers(room);
  return players.length > 0 && players.every((player) => Boolean(answerFor(player, roundIndex)));
}

function roomRef(code = state.roomCode) {
  return doc(db, ROOM_COLLECTION, code);
}

function setConnection(kind, text) {
  elements.connectionPill.classList.toggle("is-online", kind === "online");
  elements.connectionPill.classList.toggle("is-offline", kind === "offline");
  elements.connectionText.textContent = text;
}

function setHomeStatus(message = "", isError = false) {
  elements.homeStatus.textContent = message;
  elements.homeStatus.style.color = isError ? "#ff8b95" : "";
}

function setEntryBusy(busy) {
  elements.createRoomButton.disabled = busy;
  elements.joinRoomButton.disabled = busy;
  if (busy) setHomeStatus("Opening the listening room…");
}

function showToast(message) {
  clearTimeout(state.toastTimeout);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  state.toastTimeout = setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
}

function showScreen(name) {
  Object.entries(elements.screens).forEach(([screenName, screen]) => {
    const active = screenName === name;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
  });
}

function saveSession() {
  sessionStorage.setItem("ita-player-id", state.playerId);
  sessionStorage.setItem("ita-player-name", state.playerName);
  sessionStorage.setItem("ita-room-code", state.roomCode);
}

function clearRoomSession() {
  sessionStorage.removeItem("ita-room-code");
  state.roomCode = "";
  state.room = null;
  state.phaseKey = "";
}

function readableFirebaseError(error) {
  console.error(error);
  if (!navigator.onLine) return "You appear to be offline. Reconnect and try again.";
  if (error?.message?.includes("permission")) return "The multiplayer room is not available right now.";
  return "Could not reach the room. Please try again.";
}

function createAvatar(name, className = "player-avatar") {
  const avatar = document.createElement("span");
  avatar.className = className;
  avatar.textContent = initials(name);
  avatar.setAttribute("aria-hidden", "true");
  return avatar;
}

function appendPlayerListItem(list, player, room) {
  const item = document.createElement("li");
  item.append(createAvatar(player.name));
  const label = document.createElement("span");
  label.textContent = player.name;
  item.append(label);
  if (player.id === room.hostId) {
    const tag = document.createElement("span");
    tag.className = "host-tag";
    tag.textContent = "HOST";
    item.append(tag);
  }
  list.append(item);
}

async function createRoom() {
  const playerName = cleanName(elements.nameInput.value);
  if (!playerName) {
    setHomeStatus("Enter your display name first.", true);
    elements.nameInput.focus();
    return;
  }

  setEntryBusy(true);
  try {
    let createdCode = "";
    for (let attempt = 0; attempt < 6 && !createdCode; attempt += 1) {
      const code = makeRoomCode();
      const created = await runTransaction(db, async (transaction) => {
        const ref = roomRef(code);
        const snapshot = await transaction.get(ref);
        if (snapshot.exists()) return false;
        const now = Date.now();
        transaction.set(ref, {
          code,
          hostId: state.playerId,
          phase: "lobby",
          roundIndex: -1,
          phaseEndsAt: 0,
          roundStartedAt: 0,
          createdAt: now,
          updatedAt: now,
          trackOrder: Array.from({ length: TOTAL_ROUNDS }, (_, index) => index),
          players: {
            [state.playerId]: {
              id: state.playerId,
              name: playerName,
              joinedAt: now,
              active: true,
              score: 0,
              totalResponseMs: 0,
              answers: {},
            },
          },
        });
        return true;
      });
      if (created) createdCode = code;
    }
    if (!createdCode) throw new Error("Unable to reserve a unique room code.");

    state.playerName = playerName;
    state.roomCode = createdCode;
    saveSession();
    watchRoom(createdCode);
  } catch (error) {
    setHomeStatus(readableFirebaseError(error), true);
  } finally {
    setEntryBusy(false);
  }
}

async function joinRoom() {
  const playerName = cleanName(elements.nameInput.value);
  const code = cleanCode(elements.roomCodeInput.value);
  if (!playerName) {
    setHomeStatus("Enter your display name first.", true);
    elements.nameInput.focus();
    return;
  }
  if (!code) {
    setHomeStatus("Enter the room code your friend shared.", true);
    elements.roomCodeInput.focus();
    return;
  }

  setEntryBusy(true);
  try {
    await runTransaction(db, async (transaction) => {
      const ref = roomRef(code);
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) throw new Error("ROOM_NOT_FOUND");
      const room = snapshot.data();
      if (room.phase !== "lobby") throw new Error("GAME_STARTED");
      const players = { ...(room.players || {}) };
      const active = Object.values(players).filter((player) => player.active !== false);
      if (active.length >= MAX_PLAYERS) throw new Error("ROOM_FULL");
      if (active.some((player) => player.name.toLowerCase() === playerName.toLowerCase() && player.id !== state.playerId)) {
        throw new Error("NAME_TAKEN");
      }
      const now = Date.now();
      players[state.playerId] = {
        id: state.playerId,
        name: playerName,
        joinedAt: players[state.playerId]?.joinedAt || now,
        active: true,
        score: 0,
        totalResponseMs: 0,
        answers: {},
      };
      transaction.update(ref, { players, updatedAt: now });
    });

    state.playerName = playerName;
    state.roomCode = code;
    saveSession();
    watchRoom(code);
  } catch (error) {
    const messages = {
      ROOM_NOT_FOUND: "That room code does not exist.",
      GAME_STARTED: "That game has already started.",
      ROOM_FULL: "That room is full.",
      NAME_TAKEN: "Someone in that room is already using that name.",
    };
    setHomeStatus(messages[error.message] || readableFirebaseError(error), true);
  } finally {
    setEntryBusy(false);
  }
}

function watchRoom(code) {
  if (state.unsubscribe) state.unsubscribe();
  setConnection("online", "Room synced");
  state.unsubscribe = onSnapshot(roomRef(code), (snapshot) => {
    if (!snapshot.exists()) {
      if (!state.leaving) returnToHome("That room has closed.");
      return;
    }
    const room = snapshot.data();
    const me = room.players?.[state.playerId];
    if (!me || me.active === false) {
      if (!state.leaving) returnToHome("You are no longer in that room.");
      return;
    }
    state.room = room;
    setConnection("online", "Room synced");
    renderRoom(room);
    maybeAdvanceRoom();
  }, (error) => {
    setConnection("offline", "Sync interrupted");
    if (!state.room) returnToHome(readableFirebaseError(error));
  });
}

function renderRoom(room) {
  const nextPhaseKey = `${room.phase}:${room.roundIndex}`;
  const phaseChanged = nextPhaseKey !== state.phaseKey;
  if (phaseChanged) {
    clearTimeout(state.revealTimeout);
    state.phaseKey = nextPhaseKey;
  }

  if (room.phase === "lobby") {
    stopPlayback();
    showScreen("lobby");
    renderLobby(room);
  } else if (room.phase === "countdown") {
    stopPlayback();
    showScreen("countdown");
    renderCountdown(room);
  } else if (room.phase === "round") {
    showScreen("round");
    renderRound(room, phaseChanged);
  } else if (room.phase === "reveal") {
    stopPlayback();
    showScreen("reveal");
    renderReveal(room, phaseChanged);
  } else if (room.phase === "results") {
    stopPlayback();
    showScreen("results");
    renderResults(room);
  }
}

function renderLobby(room) {
  const players = activePlayers(room);
  elements.roomCodeDisplay.textContent = room.code;
  elements.playerCount.textContent = String(players.length);
  elements.lobbyPlayerList.replaceChildren();
  players.forEach((player) => appendPlayerListItem(elements.lobbyPlayerList, player, room));

  const host = room.players?.[room.hostId];
  if (isHost(room)) {
    elements.hostNote.textContent = "You are the host. Start whenever everyone is ready.";
    elements.startGameButton.hidden = false;
    elements.startGameButton.disabled = players.length < 1;
  } else {
    elements.hostNote.textContent = `Waiting for ${host?.name || "the host"} to start the game.`;
    elements.startGameButton.hidden = true;
  }
}

function renderCountdown(room) {
  elements.countdownRound.textContent = String(room.roundIndex + 1);
  updateCountdownClock(room);
}

function renderRound(room, phaseChanged) {
  const index = room.roundIndex;
  const players = activePlayers(room);
  const answered = players.filter((player) => answerFor(player, index)).length;
  const myAnswer = answerFor(room.players?.[state.playerId], index);

  elements.roundNumber.textContent = String(index + 1);
  elements.roundProgress.style.width = `${((index + 1) / TOTAL_ROUNDS) * 100}%`;
  elements.answeredCount.textContent = String(answered);
  elements.activePlayerCount.textContent = String(players.length);
  elements.trackNumber.textContent = String(index + 1).padStart(2, "0");

  if (phaseChanged) setupAudio(trackFor(room), index);
  elements.voteAiButton.disabled = Boolean(myAnswer);
  elements.voteHumanButton.disabled = Boolean(myAnswer);
  elements.voteAiButton.classList.toggle("is-selected", myAnswer?.choice === "ai");
  elements.voteHumanButton.classList.toggle("is-selected", myAnswer?.choice === "human");
  elements.voteStatus.textContent = myAnswer
    ? `${myAnswer.choice === "ai" ? "Artificial Intelligence" : "Human Artist"} locked in. Waiting for the room…`
    : "Your choice locks in immediately.";
  updateRoundClock(room);
}

function populatePickerList(list, players) {
  list.replaceChildren();
  players.forEach((player) => {
    const item = document.createElement("li");
    if (player.id === state.playerId) item.classList.add("is-you");
    item.append(createAvatar(player.name, "picker-avatar"));
    const name = document.createElement("span");
    name.textContent = player.name;
    item.append(name);
    list.append(item);
  });
}

function renderReveal(room, phaseChanged) {
  const index = room.roundIndex;
  const track = trackFor(room);
  const players = orderedPlayers(room);
  const aiPickers = players.filter((player) => answerFor(player, index)?.choice === "ai");
  const humanPickers = players.filter((player) => answerFor(player, index)?.choice === "human");
  const unanswered = players.filter((player) => !answerFor(player, index));

  elements.revealRound.textContent = String(index + 1);
  elements.aiPickCount.textContent = String(aiPickers.length);
  elements.humanPickCount.textContent = String(humanPickers.length);
  populatePickerList(elements.aiPickerList, aiPickers);
  populatePickerList(elements.humanPickerList, humanPickers);
  elements.unansweredLine.hidden = unanswered.length === 0;
  elements.unansweredLine.textContent = unanswered.length
    ? `No vote: ${unanswered.map((player) => player.name).join(", ")}`
    : "";
  updateRevealClock(room);

  if (!phaseChanged) return;
  elements.revealScreen.classList.remove("is-revealed");
  elements.revealScreen.dataset.answer = track.answer;
  elements.aiPickColumn.classList.remove("is-correct", "is-wrong");
  elements.humanPickColumn.classList.remove("is-correct", "is-wrong");
  elements.revealEyebrow.textContent = "Votes locked. Revealing origin…";
  elements.revealTitle.textContent = "AI or Human?";
  elements.revealSubtitle.textContent = "Every player has made their call.";

  state.revealTimeout = setTimeout(() => {
    const aiWasCorrect = track.answer === "ai";
    elements.aiPickColumn.classList.add(aiWasCorrect ? "is-correct" : "is-wrong");
    elements.humanPickColumn.classList.add(aiWasCorrect ? "is-wrong" : "is-correct");
    elements.revealEyebrow.textContent = aiWasCorrect ? "Generated origin detected" : "Human origin confirmed";
    elements.revealTitle.textContent = aiWasCorrect ? "It was made by AI." : "It was made by a human.";
    elements.revealSubtitle.textContent = track.placeholder
      ? "Demo answer for testing — the final song and credits will appear here."
      : `${track.title} · ${track.artist}`;
    elements.revealScreen.classList.add("is-revealed");
  }, 850);
}

function renderResults(room) {
  const players = orderedPlayers(room).sort((a, b) =>
    (b.score || 0) - (a.score || 0)
    || (a.totalResponseMs || Number.MAX_SAFE_INTEGER) - (b.totalResponseMs || Number.MAX_SAFE_INTEGER)
    || (a.joinedAt || 0) - (b.joinedAt || 0)
  );
  renderPodium(players);
  renderLeaderboard(players);
  renderScoreTable(room, players);
  elements.playAgainButton.hidden = !isHost(room);
  elements.playAgainButton.disabled = !isHost(room);
}

function renderPodium(players) {
  elements.podium.replaceChildren();
  const top = players.slice(0, 3);
  const displayOrder = top.length === 3 ? [top[1], top[0], top[2]] : top;
  displayOrder.forEach((player) => {
    const actualRank = players.indexOf(player) + 1;
    const card = document.createElement("article");
    card.className = `podium-card${actualRank === 1 ? " podium-card--first" : ""}`;
    const rank = document.createElement("span");
    rank.className = "podium-card__rank";
    rank.textContent = `#${actualRank}`;
    const name = document.createElement("strong");
    name.textContent = player.name;
    const score = document.createElement("p");
    score.textContent = `${player.score || 0} of ${TOTAL_ROUNDS} correct`;
    card.append(rank, createAvatar(player.name), name, score);
    elements.podium.append(card);
  });
}

function renderLeaderboard(players) {
  elements.leaderboard.replaceChildren();
  players.forEach((player) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.className = "leaderboard__name";
    name.textContent = `${player.name}${player.id === state.playerId ? " (you)" : ""}`;
    const accuracy = document.createElement("span");
    accuracy.className = "leaderboard__accuracy";
    accuracy.textContent = `${Math.round(((player.score || 0) / TOTAL_ROUNDS) * 100)}% accuracy`;
    const score = document.createElement("span");
    score.className = "leaderboard__score";
    score.textContent = `${player.score || 0} / ${TOTAL_ROUNDS}`;
    item.append(name, accuracy, score);
    elements.leaderboard.append(item);
  });
}

function renderScoreTable(room, players) {
  elements.scoreTable.replaceChildren();
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const roundHeader = document.createElement("th");
  roundHeader.scope = "col";
  roundHeader.textContent = "Round / answer";
  headerRow.append(roundHeader);
  players.forEach((player) => {
    const heading = document.createElement("th");
    heading.scope = "col";
    heading.textContent = player.name;
    headerRow.append(heading);
  });
  thead.append(headerRow);

  const tbody = document.createElement("tbody");
  for (let roundIndex = 0; roundIndex < TOTAL_ROUNDS; roundIndex += 1) {
    const track = trackFor(room, roundIndex);
    const row = document.createElement("tr");
    const roundCell = document.createElement("td");
    roundCell.textContent = `R${roundIndex + 1}`;
    const answer = document.createElement("span");
    answer.className = "answer-chip";
    answer.textContent = track.answer === "ai" ? "AI" : "Human";
    roundCell.append(answer);
    row.append(roundCell);

    players.forEach((player) => {
      const cell = document.createElement("td");
      const playerAnswer = answerFor(player, roundIndex);
      const chip = document.createElement("span");
      if (!playerAnswer) {
        chip.className = "score-cell score-cell--none";
        chip.textContent = "—";
      } else {
        chip.className = `score-cell ${playerAnswer.correct ? "score-cell--right" : "score-cell--wrong"}`;
        chip.textContent = `${playerAnswer.choice === "ai" ? "AI" : "Human"} ${playerAnswer.correct ? "✓" : "×"}`;
      }
      cell.append(chip);
      row.append(cell);
    });
    tbody.append(row);
  }
  elements.scoreTable.append(thead, tbody);
}

async function startGame() {
  if (!state.roomCode || !isHost()) return;
  elements.startGameButton.disabled = true;
  try {
    await runTransaction(db, async (transaction) => {
      const ref = roomRef();
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) return;
      const room = snapshot.data();
      if (room.phase !== "lobby" || room.hostId !== state.playerId) return;
      const players = Object.fromEntries(
        Object.entries(room.players || {})
          .filter(([, player]) => player.active !== false)
          .map(([id, player]) => [id, { ...player, score: 0, totalResponseMs: 0, answers: {} }])
      );
      const now = Date.now();
      transaction.update(ref, {
        players,
        phase: "countdown",
        roundIndex: 0,
        phaseEndsAt: now + COUNTDOWN_MS,
        roundStartedAt: 0,
        startedAt: now,
        updatedAt: now,
      });
    });
  } catch (error) {
    showToast(readableFirebaseError(error));
    elements.startGameButton.disabled = false;
  }
}

async function submitVote(choice) {
  if (!state.roomCode || !["ai", "human"].includes(choice)) return;
  elements.voteAiButton.disabled = true;
  elements.voteHumanButton.disabled = true;
  elements.voteStatus.textContent = "Locking your choice…";
  try {
    await runTransaction(db, async (transaction) => {
      const ref = roomRef();
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) throw new Error("ROOM_CLOSED");
      const room = snapshot.data();
      if (room.phase !== "round") return;
      const roundIndex = room.roundIndex;
      const players = { ...(room.players || {}) };
      const currentPlayer = players[state.playerId];
      if (!currentPlayer || currentPlayer.active === false || answerFor(currentPlayer, roundIndex)) return;
      const player = { ...currentPlayer };

      const track = trackFor(room, roundIndex);
      const now = Date.now();
      const responseMs = Math.max(0, Math.min(ROUND_MS, now - (room.roundStartedAt || now)));
      const correct = choice === track.answer;
      player.answers = {
        ...(player.answers || {}),
        [roundIndex]: { choice, correct, responseMs, answeredAt: now },
      };
      player.score = (player.score || 0) + (correct ? 1 : 0);
      player.totalResponseMs = (player.totalResponseMs || 0) + responseMs;
      players[state.playerId] = player;

      const update = { players, updatedAt: now };
      const active = Object.values(players).filter((candidate) => candidate.active !== false);
      if (active.length && active.every((candidate) => answerFor(candidate, roundIndex))) {
        update.phase = "reveal";
        update.phaseEndsAt = now + REVEAL_MS;
        update.revealedAt = now;
      }
      transaction.update(ref, update);
    });
  } catch (error) {
    elements.voteStatus.textContent = readableFirebaseError(error);
    if (state.room?.phase === "round") {
      elements.voteAiButton.disabled = false;
      elements.voteHumanButton.disabled = false;
    }
  }
}

async function maybeAdvanceRoom() {
  const room = state.room;
  if (!room || !["countdown", "round", "reveal"].includes(room.phase)) return;
  const now = Date.now();
  const deadlineReached = now >= (room.phaseEndsAt || 0);
  const shouldRevealEarly = room.phase === "round" && allActivePlayersAnswered(room);
  if (!deadlineReached && !shouldRevealEarly) return;
  if (now - state.transitionAttemptAt < 750) return;
  state.transitionAttemptAt = now;

  try {
    await runTransaction(db, async (transaction) => {
      const ref = roomRef();
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) return;
      const fresh = snapshot.data();
      const transitionNow = Date.now();
      const expired = transitionNow >= (fresh.phaseEndsAt || 0);

      if (fresh.phase === "countdown" && expired) {
        transaction.update(ref, {
          phase: "round",
          phaseEndsAt: transitionNow + ROUND_MS,
          roundStartedAt: transitionNow,
          updatedAt: transitionNow,
        });
      } else if (fresh.phase === "round" && (expired || allActivePlayersAnswered(fresh))) {
        transaction.update(ref, {
          phase: "reveal",
          phaseEndsAt: transitionNow + REVEAL_MS,
          revealedAt: transitionNow,
          updatedAt: transitionNow,
        });
      } else if (fresh.phase === "reveal" && expired) {
        const isLastRound = fresh.roundIndex + 1 >= TOTAL_ROUNDS;
        transaction.update(ref, isLastRound ? {
          phase: "results",
          phaseEndsAt: 0,
          finishedAt: transitionNow,
          updatedAt: transitionNow,
        } : {
          phase: "countdown",
          roundIndex: fresh.roundIndex + 1,
          phaseEndsAt: transitionNow + COUNTDOWN_MS,
          roundStartedAt: 0,
          updatedAt: transitionNow,
        });
      }
    });
  } catch (error) {
    console.warn("Room transition retrying", error);
  }
}

async function playAgain() {
  if (!isHost()) return;
  elements.playAgainButton.disabled = true;
  try {
    await runTransaction(db, async (transaction) => {
      const ref = roomRef();
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) return;
      const room = snapshot.data();
      if (room.phase !== "results" || room.hostId !== state.playerId) return;
      const players = Object.fromEntries(
        Object.entries(room.players || {})
          .filter(([, player]) => player.active !== false)
          .map(([id, player]) => [id, { ...player, score: 0, totalResponseMs: 0, answers: {} }])
      );
      const now = Date.now();
      transaction.update(ref, {
        players,
        phase: "lobby",
        roundIndex: -1,
        phaseEndsAt: 0,
        roundStartedAt: 0,
        updatedAt: now,
      });
    });
  } catch (error) {
    showToast(readableFirebaseError(error));
    elements.playAgainButton.disabled = false;
  }
}

async function leaveRoom() {
  if (!state.roomCode || state.leaving) {
    returnToHome();
    return;
  }
  state.leaving = true;
  try {
    await runTransaction(db, async (transaction) => {
      const ref = roomRef();
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists()) return;
      const room = snapshot.data();
      const players = { ...(room.players || {}) };
      if (!players[state.playerId]) return;

      if (room.phase === "lobby") {
        delete players[state.playerId];
      } else {
        players[state.playerId] = { ...players[state.playerId], active: false, leftAt: Date.now() };
      }

      const remaining = Object.values(players).filter((player) => player.active !== false);
      if (remaining.length === 0) {
        transaction.delete(ref);
        return;
      }

      const update = { players, updatedAt: Date.now() };
      if (room.hostId === state.playerId) {
        remaining.sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0));
        update.hostId = remaining[0].id;
      }
      if (room.phase === "round" && remaining.every((player) => answerFor(player, room.roundIndex))) {
        update.phase = "reveal";
        update.phaseEndsAt = Date.now() + REVEAL_MS;
      }
      transaction.update(ref, update);
    });
  } catch (error) {
    console.warn("Could not cleanly leave room", error);
  } finally {
    returnToHome();
    state.leaving = false;
  }
}

function returnToHome(message = "") {
  if (state.unsubscribe) {
    state.unsubscribe();
    state.unsubscribe = null;
  }
  stopPlayback();
  clearRoomSession();
  showScreen("home");
  setHomeStatus(message, Boolean(message));
}

async function copyInvite() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("room", state.roomCode);
  try {
    await navigator.clipboard.writeText(url.toString());
    showToast("Invite link copied.");
  } catch {
    showToast(`Room code: ${state.roomCode}`);
  }
}

function updateCountdownClock(room) {
  const remaining = Math.max(0, (room.phaseEndsAt || 0) - Date.now());
  const seconds = Math.max(1, Math.ceil(remaining / 1000));
  elements.countdownNumber.textContent = String(seconds);
}

function updateRoundClock(room) {
  const remaining = Math.max(0, (room.phaseEndsAt || 0) - Date.now());
  elements.roundTimer.textContent = String(Math.ceil(remaining / 1000));
  elements.timerRing.style.setProperty("--progress", String(remaining / ROUND_MS));
}

function updateRevealClock(room) {
  const remaining = Math.max(0, (room.phaseEndsAt || 0) - Date.now());
  elements.revealTimer.textContent = String(Math.ceil(remaining / 1000));
}

function formatTime(value) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = Math.floor(safe % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function buildWaveform() {
  const bars = document.createDocumentFragment();
  for (let index = 0; index < 82; index += 1) {
    const bar = document.createElement("span");
    const wave = Math.abs(Math.sin(index * 0.47) * 42 + Math.cos(index * 0.19) * 23);
    bar.style.setProperty("--h", String(12 + Math.min(82, wave)));
    bar.style.setProperty("--i", String(index));
    bars.append(bar);
  }
  elements.waveform.append(bars);
}

function setupAudio(track, roundIndex) {
  stopPlayback();
  audioState.trackKey = track.id;
  audioState.virtualTime = 0;
  elements.audioScrubber.value = "0";
  elements.audioScrubber.max = String(DEMO_DURATION_SECONDS);
  elements.audioDuration.textContent = formatTime(DEMO_DURATION_SECONDS);
  updateAudioVisuals(0, DEMO_DURATION_SECONDS);

  if (track.placeholder || !track.src) {
    audioState.mode = "virtual";
    elements.trackAudio.removeAttribute("src");
    elements.trackAudio.load();
    elements.audioNote.textContent = "Silent timing demo — the final music files will drop into these controls later.";
  } else {
    audioState.mode = "real";
    elements.trackAudio.src = track.src;
    elements.trackAudio.load();
    elements.audioNote.textContent = "Pick any point in the song, then press play for a 15-second preview.";
  }
  elements.playButton.disabled = false;
  elements.playButton.setAttribute("aria-label", `Play preview for mystery track ${roundIndex + 1}`);
}

function updateAudioVisuals(current, duration) {
  const safeDuration = Math.max(1, duration || DEMO_DURATION_SECONDS);
  const percent = Math.max(0, Math.min(100, (current / safeDuration) * 100));
  elements.audioScrubber.value = String(current);
  elements.audioScrubber.style.setProperty("--scrub", `${percent}%`);
  elements.audioCurrentTime.textContent = formatTime(current);
  elements.audioDuration.textContent = formatTime(safeDuration);
  const bars = elements.waveform.children;
  const playedBars = Math.floor((percent / 100) * bars.length);
  Array.from(bars).forEach((bar, index) => bar.classList.toggle("is-played", index <= playedBars));
}

function setPlaying(playing) {
  audioState.playing = playing;
  elements.playButton.classList.toggle("is-playing", playing);
  elements.waveform.classList.toggle("is-playing", playing);
  elements.playButton.setAttribute("aria-label", playing ? "Pause preview" : "Play 15-second preview");
}

function stopPlayback() {
  cancelAnimationFrame(audioState.frame);
  if (!elements.trackAudio.paused) elements.trackAudio.pause();
  setPlaying(false);
  audioState.previewEndsAt = 0;
}

function togglePlayback() {
  if (audioState.playing) {
    stopPlayback();
    return;
  }
  audioState.previewEndsAt = performance.now() + PREVIEW_MS;
  if (audioState.mode === "virtual") {
    audioState.virtualBaseTime = Number(elements.audioScrubber.value) || 0;
    audioState.virtualStartedAt = performance.now();
    setPlaying(true);
    runAudioFrame();
    return;
  }

  elements.trackAudio.play().then(() => {
    setPlaying(true);
    runAudioFrame();
  }).catch(() => {
    audioState.mode = "virtual";
    elements.audioNote.textContent = "This audio file could not load, so the silent timing demo is active.";
    audioState.virtualBaseTime = Number(elements.audioScrubber.value) || 0;
    audioState.virtualStartedAt = performance.now();
    setPlaying(true);
    runAudioFrame();
  });
}

function runAudioFrame() {
  if (!audioState.playing) return;
  const now = performance.now();
  let current;
  let duration;
  if (audioState.mode === "virtual") {
    duration = DEMO_DURATION_SECONDS;
    current = audioState.virtualBaseTime + (now - audioState.virtualStartedAt) / 1000;
    audioState.virtualTime = current;
  } else {
    current = elements.trackAudio.currentTime;
    duration = elements.trackAudio.duration || DEMO_DURATION_SECONDS;
  }
  updateAudioVisuals(current, duration);
  if (now >= audioState.previewEndsAt || current >= duration) {
    stopPlayback();
    return;
  }
  audioState.frame = requestAnimationFrame(runAudioFrame);
}

function scrubAudio() {
  const value = Number(elements.audioScrubber.value) || 0;
  if (audioState.mode === "virtual") {
    audioState.virtualTime = value;
    audioState.virtualBaseTime = value;
    audioState.virtualStartedAt = performance.now();
    updateAudioVisuals(value, DEMO_DURATION_SECONDS);
  } else if (Number.isFinite(elements.trackAudio.duration)) {
    elements.trackAudio.currentTime = Math.min(value, elements.trackAudio.duration);
    updateAudioVisuals(elements.trackAudio.currentTime, elements.trackAudio.duration);
  }
}

function tick() {
  if (state.room?.phase === "countdown") updateCountdownClock(state.room);
  if (state.room?.phase === "round") updateRoundClock(state.room);
  if (state.room?.phase === "reveal") updateRevealClock(state.room);
  maybeAdvanceRoom();
}

elements.createRoomButton.addEventListener("click", createRoom);
elements.joinRoomButton.addEventListener("click", joinRoom);
elements.startGameButton.addEventListener("click", startGame);
elements.leaveLobbyButton.addEventListener("click", leaveRoom);
elements.copyInviteButton.addEventListener("click", copyInvite);
elements.voteAiButton.addEventListener("click", () => submitVote("ai"));
elements.voteHumanButton.addEventListener("click", () => submitVote("human"));
elements.playAgainButton.addEventListener("click", playAgain);
elements.leaveResultsButton.addEventListener("click", leaveRoom);
elements.playButton.addEventListener("click", togglePlayback);
elements.audioScrubber.addEventListener("input", scrubAudio);
elements.trackAudio.addEventListener("loadedmetadata", () => {
  elements.audioScrubber.max = String(elements.trackAudio.duration);
  updateAudioVisuals(elements.trackAudio.currentTime, elements.trackAudio.duration);
});
elements.trackAudio.addEventListener("ended", stopPlayback);
elements.trackAudio.addEventListener("error", () => {
  if (audioState.mode !== "real") return;
  audioState.mode = "virtual";
  elements.audioNote.textContent = "This audio file could not load, so the silent timing demo is active.";
  elements.audioScrubber.max = String(DEMO_DURATION_SECONDS);
  updateAudioVisuals(0, DEMO_DURATION_SECONDS);
});
elements.roomCodeInput.addEventListener("input", () => {
  const cleaned = cleanCode(elements.roomCodeInput.value);
  if (elements.roomCodeInput.value !== cleaned) elements.roomCodeInput.value = cleaned;
});
elements.nameInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  if (elements.roomCodeInput.value) joinRoom();
  else createRoom();
});
elements.roomCodeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") joinRoom();
});
window.addEventListener("online", () => setConnection("online", state.room ? "Room synced" : "Online"));
window.addEventListener("offline", () => setConnection("offline", "Offline"));

buildWaveform();
setInterval(tick, 250);

const linkedRoom = cleanCode(new URLSearchParams(window.location.search).get("room") || "");
if (linkedRoom) elements.roomCodeInput.value = linkedRoom;

if (!navigator.onLine) {
  setConnection("offline", "Offline");
} else {
  setConnection("online", "Firebase ready");
}

if (state.roomCode && state.playerName) {
  getDoc(roomRef(state.roomCode)).then((snapshot) => {
    const player = snapshot.data()?.players?.[state.playerId];
    if (snapshot.exists() && player?.active !== false) {
      watchRoom(state.roomCode);
    } else {
      clearRoomSession();
    }
  }).catch(() => clearRoomSession());
}
