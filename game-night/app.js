import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  remove,
  onValue,
  onDisconnect,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import { firebaseConfig } from "../assets/js/firebase-config.js";

const ROOM_ROOT = "gamePickerRooms";
const ROOM_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const COLORS = ["#c8f45d", "#ff9d76", "#75d8ff", "#d5a8ff", "#ffcf5a", "#6de2bd", "#ff82af", "#a9b6ff"];

const elements = {
  welcomeView: document.querySelector("#welcomeView"),
  roomView: document.querySelector("#roomView"),
  entryForm: document.querySelector("#entryForm"),
  displayName: document.querySelector("#displayName"),
  roomCode: document.querySelector("#roomCode"),
  createRoomButton: document.querySelector("#createRoomButton"),
  joinRoomButton: document.querySelector("#joinRoomButton"),
  entryError: document.querySelector("#entryError"),
  activeRoomCode: document.querySelector("#activeRoomCode"),
  connectionLabel: document.querySelector("#connectionLabel"),
  copyLinkButton: document.querySelector("#copyLinkButton"),
  leaveRoomButton: document.querySelector("#leaveRoomButton"),
  peopleList: document.querySelector("#peopleList"),
  playerCount: document.querySelector("#playerCount"),
  onlineNote: document.querySelector("#onlineNote"),
  suggestForm: document.querySelector("#suggestForm"),
  gameName: document.querySelector("#gameName"),
  gameError: document.querySelector("#gameError"),
  gameList: document.querySelector("#gameList"),
  emptyState: document.querySelector("#emptyState"),
  consensusBanner: document.querySelector("#consensusBanner"),
  consensusGame: document.querySelector("#consensusGame"),
  consensusScore: document.querySelector("#consensusScore"),
  toast: document.querySelector("#toast"),
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let user = null;
let activeRoom = "";
let activeName = "";
let roomState = { players: {}, games: {}, votes: {} };
let unsubscribeRoom = null;
let toastTimer = null;
let busy = false;

boot();

async function boot() {
  elements.displayName.value = localStorage.getItem("gameNightName") || "";
  const sharedCode = cleanRoomCode(new URLSearchParams(location.search).get("room") || "");
  if (sharedCode) {
    elements.roomCode.value = sharedCode;
    elements.joinRoomButton.textContent = `Join ${sharedCode}`;
  }

  elements.roomCode.addEventListener("input", () => {
    elements.roomCode.value = cleanRoomCode(elements.roomCode.value);
    elements.joinRoomButton.textContent = "Join room";
  });
  elements.createRoomButton.addEventListener("click", createRoom);
  elements.entryForm.addEventListener("submit", joinRoom);
  elements.suggestForm.addEventListener("submit", addGame);
  elements.copyLinkButton.addEventListener("click", copyInviteLink);
  elements.leaveRoomButton.addEventListener("click", leaveRoom);
  window.addEventListener("online", () => setConnectionMessage("Live and synced"));
  window.addEventListener("offline", () => setConnectionMessage("Offline — reconnecting"));

}

function ensureSignedIn() {
  return new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(auth, async (currentUser) => {
      stop();
      if (currentUser) {
        resolve(currentUser);
        return;
      }
      try {
        const credential = await signInAnonymously(auth);
        resolve(credential.user);
      } catch (error) {
        reject(error);
      }
    }, reject);
  });
}

function validateName() {
  const value = elements.displayName.value.trim().replace(/\s+/g, " ");
  if (!value) {
    showEntryError("Add your name first so everyone knows which votes are yours.");
    elements.displayName.focus();
    return "";
  }
  return value.slice(0, 24);
}

async function createRoom() {
  const name = validateName();
  if (!name || busy) return;
  setBusy(true);
  showEntryError("");

  try {
    user = user || await ensureSignedIn();
    let code = "";
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const candidate = makeRoomCode();
      const roomSnapshot = await get(ref(db, `${ROOM_ROOT}/${candidate}/meta`));
      if (!roomSnapshot.exists()) {
        code = candidate;
        break;
      }
    }
    if (!code) throw new Error("Could not reserve a room code");

    await set(ref(db, `${ROOM_ROOT}/${code}/meta`), {
      createdAt: serverTimestamp(),
      createdBy: user.uid,
    });
    await enterRoom(code, name);
  } catch (error) {
    console.error(error);
    showEntryError("We couldn’t create the room. Please try once more.");
  } finally {
    setBusy(false);
  }
}

async function joinRoom(event) {
  event.preventDefault();
  const name = validateName();
  const code = cleanRoomCode(elements.roomCode.value);
  if (!name || busy) return;
  if (code.length !== 5) {
    showEntryError("Enter the five-character room code from your friend.");
    elements.roomCode.focus();
    return;
  }

  setBusy(true);
  showEntryError("");
  try {
    user = user || await ensureSignedIn();
    const snapshot = await get(ref(db, `${ROOM_ROOT}/${code}/meta`));
    if (!snapshot.exists()) {
      showEntryError("That room doesn’t exist yet. Double-check the code.");
      return;
    }
    await enterRoom(code, name);
  } catch (error) {
    console.error(error);
    showEntryError("We couldn’t join that room. Check your connection and retry.");
  } finally {
    setBusy(false);
  }
}

async function enterRoom(code, name) {
  activeRoom = code;
  activeName = name;
  localStorage.setItem("gameNightName", name);

  const playersSnapshot = await get(ref(db, `${ROOM_ROOT}/${code}/players`));
  const players = playersSnapshot.val() || {};
  const existingPlayer = players[user.uid];
  const color = existingPlayer?.color || chooseColor(players);
  const playerRef = ref(db, `${ROOM_ROOT}/${code}/players/${user.uid}`);
  await update(playerRef, {
    name,
    color,
    joinedAt: existingPlayer?.joinedAt || serverTimestamp(),
    lastSeen: serverTimestamp(),
    online: true,
  });
  await onDisconnect(playerRef).update({ online: false, lastSeen: serverTimestamp() });

  history.replaceState({}, "", `${location.pathname}?room=${code}`);
  elements.activeRoomCode.textContent = code;
  elements.welcomeView.classList.add("hidden");
  elements.roomView.classList.remove("hidden");
  setConnectionMessage("Live and synced");

  if (unsubscribeRoom) unsubscribeRoom();
  unsubscribeRoom = onValue(
    ref(db, `${ROOM_ROOT}/${code}`),
    (snapshot) => {
      roomState = snapshot.val() || { players: {}, games: {}, votes: {} };
      renderRoom();
      setConnectionMessage("Live and synced");
    },
    (error) => {
      console.error(error);
      setConnectionMessage("Sync interrupted");
      showToast("Live sync paused. Reconnecting…");
    },
  );
  setTimeout(() => elements.gameName.focus(), 100);
}

async function leaveRoom() {
  if (activeRoom && user) {
    try {
      await update(ref(db, `${ROOM_ROOT}/${activeRoom}/players/${user.uid}`), {
        online: false,
        lastSeen: serverTimestamp(),
      });
    } catch (error) {
      console.warn("Could not update presence before leaving", error);
    }
  }
  if (unsubscribeRoom) unsubscribeRoom();
  unsubscribeRoom = null;
  activeRoom = "";
  roomState = { players: {}, games: {}, votes: {} };
  history.replaceState({}, "", location.pathname);
  elements.roomView.classList.add("hidden");
  elements.welcomeView.classList.remove("hidden");
  elements.roomCode.value = "";
  elements.joinRoomButton.textContent = "Join room";
}

async function addGame(event) {
  event.preventDefault();
  const title = elements.gameName.value.trim().replace(/\s+/g, " ").slice(0, 60);
  if (!title || !activeRoom || !user) return;

  const duplicate = Object.values(roomState.games || {}).some(
    (game) => game.title?.toLocaleLowerCase() === title.toLocaleLowerCase(),
  );
  if (duplicate) {
    showGameError("That game is already on the ballot.");
    return;
  }

  showGameError("");
  const gameId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  try {
    await set(ref(db, `${ROOM_ROOT}/${activeRoom}/games/${gameId}`), {
      title,
      addedBy: user.uid,
      createdAt: serverTimestamp(),
    });
    elements.gameName.value = "";
    elements.gameName.focus();
  } catch (error) {
    console.error(error);
    showGameError("Couldn’t add that game. Try again.");
  }
}

async function toggleVote(gameId) {
  if (!activeRoom || !user) return;
  const voteRef = ref(db, `${ROOM_ROOT}/${activeRoom}/votes/${gameId}/${user.uid}`);
  const hasVote = Boolean(roomState.votes?.[gameId]?.[user.uid]);
  try {
    if (hasVote) await remove(voteRef);
    else await set(voteRef, true);
  } catch (error) {
    console.error(error);
    showToast("Couldn’t save that vote. Try again.");
  }
}

async function deleteGame(gameId, title) {
  if (!activeRoom || !user || roomState.games?.[gameId]?.addedBy !== user.uid) return;
  if (!confirm(`Remove “${title}” from the ballot?`)) return;
  try {
    await Promise.all([
      remove(ref(db, `${ROOM_ROOT}/${activeRoom}/games/${gameId}`)),
      remove(ref(db, `${ROOM_ROOT}/${activeRoom}/votes/${gameId}`)),
    ]);
  } catch (error) {
    console.error(error);
    showToast("Couldn’t remove that game.");
  }
}

function renderRoom() {
  const players = roomState.players || {};
  const games = roomState.games || {};
  const votes = roomState.votes || {};
  const playerEntries = Object.entries(players).sort(([, a], [, b]) => {
    if (a.online !== b.online) return a.online ? -1 : 1;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  const onlineCount = playerEntries.filter(([, player]) => player.online).length;

  elements.playerCount.textContent = String(playerEntries.length);
  elements.onlineNote.textContent = onlineCount === 1
    ? "You’re first — share the room link."
    : `${onlineCount} ${onlineCount === 1 ? "person" : "people"} online now`;
  elements.peopleList.replaceChildren(...playerEntries.map(([uid, player]) => makePerson(uid, player)));

  const rankedGames = Object.entries(games)
    .map(([id, game]) => ({ id, ...game, voterIds: Object.keys(votes[id] || {}) }))
    .sort((a, b) => b.voterIds.length - a.voterIds.length || (a.createdAt || 0) - (b.createdAt || 0));
  const topVotes = rankedGames[0]?.voterIds.length || 0;
  const leaderCount = rankedGames.filter((game) => game.voterIds.length === topVotes && topVotes > 0).length;

  elements.emptyState.classList.toggle("hidden", rankedGames.length > 0);
  elements.gameList.replaceChildren(
    ...rankedGames.map((game, index) => makeGameCard(game, players, index, topVotes, leaderCount)),
  );

  if (rankedGames.length && topVotes > 0) {
    const leader = rankedGames[0];
    elements.consensusBanner.classList.remove("hidden");
    elements.consensusGame.textContent = leaderCount > 1 ? `${leaderCount} games tied` : leader.title;
    elements.consensusScore.textContent = `${topVotes}/${playerEntries.length}`;
  } else {
    elements.consensusBanner.classList.add("hidden");
  }
}

function makePerson(uid, player) {
  const row = document.createElement("div");
  row.className = `person${uid === user.uid ? " person--me" : ""}`;

  const avatar = makeAvatar(player);
  const info = document.createElement("div");
  info.className = "person__info";
  const name = document.createElement("span");
  name.className = "person__name";
  name.textContent = `${player.name || "Player"}${uid === user.uid ? " (you)" : ""}`;
  const status = document.createElement("span");
  status.className = "person__status";
  status.textContent = player.online ? "Choosing tonight" : "Away";
  info.append(name, status);

  const dot = document.createElement("span");
  dot.className = `online-dot${player.online ? " online-dot--active" : ""}`;
  dot.title = player.online ? "Online" : "Offline";
  row.append(avatar, info, dot);
  return row;
}

function makeGameCard(game, players, index, topVotes, leaderCount) {
  const voted = game.voterIds.includes(user.uid);
  const card = document.createElement("article");
  card.className = `game-card${voted ? " game-card--voted" : ""}${index === 0 && topVotes > 0 && leaderCount === 1 ? " game-card--leader" : ""}`;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", String(voted));
  card.setAttribute("aria-label", `${voted ? "Remove your vote from" : "Vote for"} ${game.title}`);
  card.addEventListener("click", () => toggleVote(game.id));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleVote(game.id);
    }
  });

  const check = document.createElement("span");
  check.className = "vote-check";
  check.textContent = "✓";

  const body = document.createElement("div");
  body.className = "game-card__body";
  const title = document.createElement("span");
  title.className = "game-card__name";
  title.textContent = game.title;
  const meta = document.createElement("span");
  meta.className = "game-card__meta";
  meta.textContent = `Suggested by ${players[game.addedBy]?.name || "a friend"}`;
  body.append(title, meta);

  const right = document.createElement("div");
  right.className = "game-card__right";
  const stack = document.createElement("div");
  stack.className = "voter-stack";
  stack.setAttribute("aria-label", voterLabel(game.voterIds, players));
  game.voterIds.slice(0, 5).forEach((uid) => {
    if (players[uid]) stack.append(makeAvatar(players[uid]));
  });
  const total = document.createElement("span");
  total.className = "vote-total";
  total.textContent = `${game.voterIds.length} ${game.voterIds.length === 1 ? "vote" : "votes"}`;
  right.append(stack, total);

  if (game.addedBy === user.uid) {
    const removeButton = document.createElement("button");
    removeButton.className = "remove-game";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.title = `Remove ${game.title}`;
    removeButton.setAttribute("aria-label", `Remove ${game.title}`);
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteGame(game.id, game.title);
    });
    right.append(removeButton);
  }

  card.append(check, body, right);
  return card;
}

function makeAvatar(player) {
  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.style.backgroundColor = player.color || COLORS[0];
  avatar.textContent = initials(player.name || "Player");
  avatar.title = player.name || "Player";
  return avatar;
}

function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? `${parts[0][0]}${parts.at(-1)[0]}` : parts[0]?.slice(0, 2) || "?").toUpperCase();
}

function voterLabel(ids, players) {
  if (!ids.length) return "No votes yet";
  return `Votes from ${ids.map((uid) => players[uid]?.name || "a former player").join(", ")}`;
}

function chooseColor(players) {
  const used = new Set(Object.values(players).map((player) => player.color));
  return COLORS.find((color) => !used.has(color)) || COLORS[hashString(user.uid) % COLORS.length];
}

function hashString(value) {
  let hash = 0;
  for (const character of value) hash = ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  return Math.abs(hash);
}

function makeRoomCode() {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => ROOM_ALPHABET[byte % ROOM_ALPHABET.length]).join("");
}

function cleanRoomCode(value) {
  return value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 5);
}

async function copyInviteLink() {
  const url = `${location.origin}${location.pathname}?room=${activeRoom}`;
  try {
    await navigator.clipboard.writeText(url);
    showToast("Invite link copied");
  } catch {
    prompt("Copy this invite link:", url);
  }
}

function setBusy(value) {
  busy = value;
  elements.createRoomButton.disabled = value;
  elements.joinRoomButton.disabled = value;
  elements.createRoomButton.querySelector("span").textContent = value ? "Connecting…" : "Create a room";
}

function showEntryError(message) { elements.entryError.textContent = message; }
function showGameError(message) { elements.gameError.textContent = message; }
function setConnectionMessage(message) { elements.connectionLabel.textContent = message; }

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("toast--show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("toast--show"), 2200);
}
