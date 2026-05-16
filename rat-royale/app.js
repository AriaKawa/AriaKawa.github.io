import { getFirebaseServices, hasFirebaseConfig } from "../assets/js/firebase-client.js";

const COLLECTION = "ratRoyaleRooms";
const FIREBASE_VERSION = "12.7.0";
const MAX_PLAYERS = 4;
const CYCLES = 3;
const START_MONEY = 20;
const STAKE = 5;
const PLAYER_ID_KEY = "ratRoyalePlayerId";
const PLAYER_NAME_KEY = "ratRoyalePlayerName";

const RATS = [
  { name: "Miso", fur: "Pearl" },
  { name: "Pepper", fur: "Hooded" },
  { name: "Biscuit", fur: "Agouti" },
  { name: "Fig", fur: "Cinnamon" },
  { name: "Nimbus", fur: "Silver" },
  { name: "Maple", fur: "Cream" },
  { name: "Soba", fur: "Siamese" },
  { name: "Vesper", fur: "Slate" },
];

const BASE_STATS = {
  hp: 34,
  attack: 7,
  defense: 2,
  speed: 5,
  crit: 8,
};

const ITEMS = [
  { id: "silk-band", name: "Silk Band", slot: "hat", cost: 4, sprite: 0, stats: { speed: 1, crit: 2 }, color: "#ff6fae" },
  { id: "tiny-crown", name: "Tiny Crown", slot: "hat", cost: 12, sprite: 1, stats: { hp: 4, crit: 5 }, color: "#ffd76b" },
  { id: "mist-hood", name: "Mist Hood", slot: "hat", cost: 9, sprite: 2, stats: { defense: 2, speed: 1 }, color: "#68f4d5" },
  { id: "velvet-cap", name: "Velvet Cap", slot: "hat", cost: 7, sprite: 3, stats: { hp: 3, defense: 1 }, color: "#76b8ff" },
  { id: "quick-boots", name: "Quick Boots", slot: "boots", cost: 8, sprite: 4, stats: { speed: 3 }, color: "#76b8ff" },
  { id: "lucky-boots", name: "Lucky Boots", slot: "boots", cost: 11, sprite: 5, stats: { speed: 1, crit: 6 }, color: "#ffd76b" },
  { id: "moss-boots", name: "Moss Boots", slot: "boots", cost: 10, sprite: 6, stats: { hp: 3, speed: 2 }, color: "#8df08f" },
  { id: "iron-boots", name: "Iron Boots", slot: "boots", cost: 6, sprite: 7, stats: { defense: 2, speed: -1 }, color: "#aeb8c9" },
  { id: "needle", name: "Needle", slot: "weapon", cost: 6, sprite: 8, stats: { attack: 2, crit: 3 }, color: "#d7efff" },
  { id: "matchstick", name: "Matchstick", slot: "weapon", cost: 15, sprite: 9, stats: { attack: 3 }, element: "fire", color: "#ff7a2f" },
  { id: "thorn-knife", name: "Thorn Knife", slot: "weapon", cost: 14, sprite: 10, stats: { attack: 2, speed: 1 }, element: "poison", color: "#58f092" },
  { id: "glass-rapier", name: "Glass Rapier", slot: "weapon", cost: 18, sprite: 11, stats: { attack: 5, crit: 6, hp: -2 }, color: "#76b8ff" },
  { id: "ember-charm", name: "Ember Charm", slot: "charm", cost: 13, sprite: 12, stats: { attack: 1, hp: 3 }, element: "fire", color: "#ff7a2f" },
  { id: "venom-charm", name: "Venom Charm", slot: "charm", cost: 13, sprite: 13, stats: { speed: 1, defense: 1 }, element: "poison", color: "#58f092" },
  { id: "moon-charm", name: "Moon Charm", slot: "charm", cost: 10, sprite: 14, stats: { hp: 6 }, color: "#b7c8ff" },
  { id: "coin-charm", name: "Coin Charm", slot: "charm", cost: 5, sprite: 15, stats: { crit: 2 }, color: "#ffd76b" },
];

const ITEM_BY_ID = Object.fromEntries(ITEMS.map((item) => [item.id, item]));
const CARD_RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
const CARD_SUITS = ["S", "H", "D", "C"];
const RANK_VALUE = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  "10": 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

const els = {
  entryPanel: document.querySelector("#entryPanel"),
  gameShell: document.querySelector("#gameShell"),
  nameInput: document.querySelector("#nameInput"),
  roomCodeInput: document.querySelector("#roomCodeInput"),
  roomPill: document.querySelector("#roomPill"),
  playerDock: document.querySelector("#playerDock"),
  phaseKicker: document.querySelector("#phaseKicker"),
  phaseTitle: document.querySelector("#phaseTitle"),
  phaseMeta: document.querySelector("#phaseMeta"),
  phaseView: document.querySelector("#phaseView"),
  myRatFocus: document.querySelector("#myRatFocus"),
  myStats: document.querySelector("#myStats"),
  hostActions: document.querySelector("#hostActions"),
  toast: document.querySelector("#toast"),
};

let services = null;
let database = null;
let databaseApi = null;
let roomRef = null;
let unsubscribe = null;
let room = null;
let selectedRat = 0;
let selectedDiscards = new Set();
let toastTimer = 0;
let syncMode = "remote";

const playerId = getPlayerId();

init();

async function init() {
  els.nameInput.value = localStorage.getItem(PLAYER_NAME_KEY) || "";
  bindEvents();

  if (!hasFirebaseConfig()) {
    showToast("Firebase config is missing.");
    return;
  }

  try {
    services = await getFirebaseServices();
    await startRealtimeDatabase();
  } catch (error) {
    showToast("Online rooms unavailable. Local mode ready.");
    console.error(error);
  }

  const code = getHashRoomCode();
  if (code) {
    await joinRoom(code, { quiet: true });
  } else {
    render();
  }
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const trigger = event.target.closest("[data-action]");
    if (!trigger) {
      return;
    }

    event.preventDefault();
    const action = trigger.dataset.action;

    try {
      await handleAction(action, trigger);
    } catch (error) {
      showToast(error.message || "Something went sideways.");
      console.error(error);
    }
  });

  els.roomCodeInput.addEventListener("input", () => {
    els.roomCodeInput.value = cleanRoomCode(els.roomCodeInput.value);
  });
}

async function handleAction(action, trigger) {
  if (action === "create-room") return createRoom();
  if (action === "join-room") return joinRoom(els.roomCodeInput.value);
  if (action === "copy-room") return copyRoomLink();
  if (action === "leave-room") return leaveRoom();
  if (action === "select-rat") return selectRat(Number(trigger.dataset.rat));
  if (action === "save-profile") return saveProfile(false);
  if (action === "ready-toggle") return saveProfile(true);
  if (action === "add-rival") return addRival();
  if (action === "start-match") return startMatch();
  if (action === "vote-game") return voteGame(trigger.dataset.game);
  if (action === "resolve-vote") return resolveVote();
  if (action === "blackjack-hit") return hitBlackjack();
  if (action === "blackjack-stand") return standBlackjack();
  if (action === "settle-blackjack") return settleBlackjack();
  if (action === "continue-gamble") return continueAfterGamble();
  if (action === "poker-toggle") return togglePokerDiscard(Number(trigger.dataset.index));
  if (action === "poker-redraw") return redrawPoker();
  if (action === "poker-hold") return holdPoker();
  if (action === "settle-poker") return settlePoker();
  if (action === "buy-item") return buyItem(trigger.dataset.item);
  if (action === "shop-ready") return setShopReady();
  if (action === "start-fight") return startFight();
  if (action === "next-cycle") return advanceAfterFight();
  if (action === "restart-match") return restartMatch();
}

async function createRoom() {
  const code = await uniqueRoomCode();
  const name = getName();
  const nextRoom = {
    code,
    hostId: playerId,
    seed: `${Date.now()}-${Math.floor(Math.random() * 999999)}`,
    phase: "lobby",
    cycle: 1,
    gambleRound: 1,
    players: {
      [playerId]: newPlayer(playerId, name, selectedRat),
    },
    votes: {},
    gamble: null,
    shop: null,
    fight: null,
    winnerId: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  if (databaseApi) {
    try {
      syncMode = "remote";
      roomRef = roomReference(code);
      await databaseApi.set(roomRef, nextRoom);
      localStorage.setItem(PLAYER_NAME_KEY, name);
      setRoomHash(code);
      listenToRoom(code);
      showToast(`Room ${code} is live.`);
      return;
    } catch (error) {
      if (!isPermissionError(error)) {
        console.warn("Remote room failed; using local room.", error);
      }
    }
  }

  localStorage.setItem(PLAYER_NAME_KEY, name);
  startLocalRoom(code, nextRoom, "Local room. Firebase rules blocked online sync.");
}

async function joinRoom(code, options = {}) {
  const cleaned = cleanRoomCode(code);
  if (!cleaned) {
    throw new Error("Enter a room code.");
  }

  if (databaseApi) {
    try {
      const ref = roomReference(cleaned);
      const snap = await databaseApi.get(ref);
      if (snap.exists()) {
        syncMode = "remote";
        roomRef = ref;
        await runRoomTransaction((next) => {
          const players = Object.values(next.players || {});
          if (!next.players[playerId] && players.length >= MAX_PLAYERS) {
            throw new Error("Room is full.");
          }

          const name = getName();
          const existing = next.players[playerId];
          next.players[playerId] = {
            ...(existing || newPlayer(playerId, name, selectedRat)),
            name,
            rat: existing ? existing.rat : selectedRat,
            online: true,
            lastSeen: Date.now(),
          };
        });

        localStorage.setItem(PLAYER_NAME_KEY, getName());
        setRoomHash(cleaned);
        listenToRoom(cleaned);
        if (!options.quiet) {
          showToast(`Joined ${cleaned}.`);
        }
        return;
      }
    } catch (error) {
      if (!isPermissionError(error)) {
        console.warn("Remote join failed; checking local room.", error);
      }
    }
  }

  await joinLocalRoom(cleaned, options);
}

function listenToRoom(code) {
  if (unsubscribe) {
    unsubscribe();
  }

  if (syncMode === "local" || !databaseApi) {
    listenToLocalRoom(code);
    return;
  }

  roomRef = roomReference(code);
  unsubscribe = databaseApi.onValue(
    roomRef,
    (snap) => {
      room = snap.exists() ? snap.val() : null;
      const me = myPlayer();
      if (me) {
        selectedRat = me.rat || 0;
      }
      render();
    },
    (error) => {
      showToast("Room sync stopped.");
      console.error(error);
    },
  );
}

function render() {
  const me = myPlayer();
  const inRoom = Boolean(room && me);

  els.entryPanel.hidden = inRoom;
  els.gameShell.hidden = !inRoom;
  els.roomPill.textContent = room ? `${room.code}${syncMode === "local" ? " LOCAL" : ""}` : "No room";

  if (!inRoom) {
    return;
  }

  renderPlayers();
  renderMyRat(me);
  renderPhase();
  renderHostActions();
}

function renderPlayers() {
  els.playerDock.innerHTML = playersList(room)
    .map((player) => {
      const status = playerStatus(player);
      return `
        <article class="player-card ${player.id === playerId ? "is-me" : ""}">
          ${renderRat(player, { small: true })}
          <div>
            <strong>${escapeHtml(player.name)}</strong>
            <span>$${player.money} / ${player.fightPoints || 0} pts</span>
            <small>${escapeHtml(status)}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMyRat(me) {
  const rat = RATS[me.rat] || RATS[0];
  els.myRatFocus.innerHTML = `
    ${renderRat(me, { focus: true })}
    <div class="rat-caption">
      <div>
        <strong>${escapeHtml(rat.name)}</strong>
        <span class="mini-label">${escapeHtml(rat.fur)}</span>
      </div>
      <strong>$${me.money}</strong>
    </div>
  `;

  const stats = computeStats(me);
  els.myStats.innerHTML = [
    ["HP", stats.hp],
    ["ATK", stats.attack],
    ["DEF", stats.defense],
    ["SPD", stats.speed],
    ["CRIT", `${stats.crit}%`],
    ["PTS", me.fightPoints || 0],
  ]
    .map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderPhase() {
  const labels = phaseLabels();
  els.phaseKicker.textContent = labels.kicker;
  els.phaseTitle.textContent = labels.title;
  els.phaseMeta.textContent = labels.meta;

  if (room.phase === "lobby") {
    els.phaseView.innerHTML = renderLobby();
  } else if (room.phase === "vote") {
    els.phaseView.innerHTML = renderVote();
  } else if (room.phase === "blackjack") {
    els.phaseView.innerHTML = renderBlackjack();
  } else if (room.phase === "poker") {
    els.phaseView.innerHTML = renderPoker();
  } else if (room.phase === "shop") {
    els.phaseView.innerHTML = renderShop();
  } else if (room.phase === "fight") {
    els.phaseView.innerHTML = renderFight();
  } else if (room.phase === "finished") {
    els.phaseView.innerHTML = renderFinished();
  }
}

function phaseLabels() {
  const cycle = room?.cycle || 1;
  const round = room?.gambleRound || 1;
  const base = { meta: `Cycle ${cycle} / ${CYCLES}` };

  if (room.phase === "lobby") return { ...base, kicker: "Lobby", title: "Choose your rat" };
  if (room.phase === "vote") return { ...base, kicker: `Vote ${round}`, title: "Pick the table" };
  if (room.phase === "blackjack") return { ...base, kicker: `Round ${round}`, title: "Blackjack" };
  if (room.phase === "poker") return { ...base, kicker: `Round ${round}`, title: "Poker-lite" };
  if (room.phase === "shop") return { ...base, kicker: "Buy round", title: "Gear up" };
  if (room.phase === "fight") return { ...base, kicker: "Auto fight", title: "Rats settle it" };
  return { ...base, kicker: "Final", title: "Winner" };
}

function renderLobby() {
  const me = myPlayer();
  const readyCount = playersList(room).filter((player) => player.ready).length;
  const isHost = room.hostId === playerId;
  const canStart = playersList(room).length >= 2 && playersList(room).every((player) => player.id === room.hostId || player.ready || player.isBot);
  return `
    <div class="phase-grid lobby-grid">
      <section class="card-panel">
        <label class="field">
          <span>Name</span>
          <input value="${escapeAttr(els.nameInput.value || me.name)}" maxlength="18" data-name-field>
        </label>
        <div class="card-actions">
          <button class="primary" type="button" data-action="save-profile">Save Rat</button>
          <button class="secondary" type="button" data-action="ready-toggle">${me.ready ? "Unready" : "Ready"}</button>
          ${isHost ? `<button class="secondary" type="button" data-action="add-rival" ${playersList(room).length >= MAX_PLAYERS ? "disabled" : ""}>Rival</button>` : ""}
          ${isHost ? `<button class="primary" type="button" data-action="start-match" ${canStart ? "" : "disabled"}>Start</button>` : ""}
        </div>
        <p class="mini-label">${readyCount}/${playersList(room).length} ready</p>
      </section>
      <section class="rat-select-grid" aria-label="Rat selection">
        ${RATS.map((rat, index) => `
          <button class="rat-option ${index === selectedRat ? "is-selected" : ""}" type="button" data-action="select-rat" data-rat="${index}">
            ${renderRat({ rat: index, gear: {} })}
            <strong>${escapeHtml(rat.name)}</strong>
          </button>
        `).join("")}
      </section>
    </div>
  `;
}

function renderVote() {
  const vote = room.votes?.[playerId] || "";
  const blackjackVotes = Object.values(room.votes || {}).filter((game) => game === "blackjack").length;
  const pokerVotes = Object.values(room.votes || {}).filter((game) => game === "poker").length;
  return `
    <div class="phase-grid">
      <div class="vote-grid">
        <button class="vote-card ${vote === "blackjack" ? "is-picked" : ""}" type="button" data-action="vote-game" data-game="blackjack">
          <span>${blackjackVotes} votes</span>
          <strong>Blackjack</strong>
          <span>$5 stake. Hit, stand, cash out.</span>
        </button>
        <button class="vote-card ${vote === "poker" ? "is-picked" : ""}" type="button" data-action="vote-game" data-game="poker">
          <span>${pokerVotes} votes</span>
          <strong>Poker-lite</strong>
          <span>Five cards. One redraw. Winner takes pot.</span>
        </button>
      </div>
      ${room.hostId === playerId ? `<div class="card-actions"><button class="primary" type="button" data-action="resolve-vote" ${allHumansVoted() ? "" : "disabled"}>Deal</button></div>` : ""}
    </div>
  `;
}

function renderBlackjack() {
  const gamble = room.gamble;
  const hand = gamble?.hands?.[playerId];
  if (!gamble || !hand) {
    return `<div class="empty-state">Setting the table.</div>`;
  }

  const settled = Boolean(gamble.settled);
  const score = blackjackScore(hand.hand);
  const canAct = !settled && !hand.standing && score.total < 21;
  const dealerCards = settled ? gamble.dealer : [gamble.dealer[0], "BACK"];

  return `
    <div class="phase-grid">
      <section class="table-card">
        <span class="mini-label">Dealer</span>
        <div class="hand-grid">${dealerCards.map(cardHtml).join("")}</div>
        ${settled ? `<p>${blackjackScore(gamble.dealer).total}</p>` : ""}
      </section>
      <section class="table-card">
        <span class="mini-label">You</span>
        <div class="hand-grid">${hand.hand.map(cardHtml).join("")}</div>
        <p>${score.total}${hand.result ? ` / ${escapeHtml(hand.result)}` : ""}</p>
        <div class="card-actions">
          <button class="primary" type="button" data-action="blackjack-hit" ${canAct ? "" : "disabled"}>Hit</button>
          <button class="secondary" type="button" data-action="blackjack-stand" ${canAct ? "" : "disabled"}>Stand</button>
        </div>
      </section>
      <section class="leaderboard">
        ${playersList(room).map((player) => {
          const playerHand = gamble.hands[player.id];
          const playerScore = playerHand ? blackjackScore(playerHand.hand).total : 0;
          return `<div class="result-card"><h3>${escapeHtml(player.name)}</h3><p>${playerScore} / ${escapeHtml(playerHand?.result || playerStatus(player))}</p></div>`;
        }).join("")}
      </section>
      ${room.hostId === playerId ? `<div class="card-actions">
        ${settled
          ? `<button class="primary" type="button" data-action="continue-gamble">Continue</button>`
          : `<button class="primary" type="button" data-action="settle-blackjack" ${allBlackjackHumansDone() ? "" : "disabled"}>Settle</button>`}
      </div>` : ""}
    </div>
  `;
}

function renderPoker() {
  const gamble = room.gamble;
  const hand = gamble?.hands?.[playerId];
  if (!gamble || !hand) {
    return `<div class="empty-state">Shuffling.</div>`;
  }

  const settled = Boolean(gamble.settled);
  const evaluation = evaluatePoker(hand.hand);
  return `
    <div class="phase-grid">
      <section class="table-card">
        <span class="mini-label">Your hand</span>
        <div class="hand-grid">
          ${hand.hand.map((card, index) => cardHtml(card, { index, selected: selectedDiscards.has(index), clickable: !settled && !hand.locked })).join("")}
        </div>
        <p>${escapeHtml(hand.result || evaluation.label)}</p>
        <div class="card-actions">
          <button class="primary" type="button" data-action="poker-redraw" ${!settled && !hand.locked && selectedDiscards.size ? "" : "disabled"}>Redraw</button>
          <button class="secondary" type="button" data-action="poker-hold" ${!settled && !hand.locked ? "" : "disabled"}>Hold</button>
        </div>
      </section>
      <section class="leaderboard">
        ${playersList(room).map((player) => {
          const playerHand = gamble.hands[player.id];
          const faceUp = settled || player.id === playerId;
          const title = faceUp ? evaluatePoker(playerHand.hand).label : playerStatus(player);
          return `<div class="result-card"><h3>${escapeHtml(player.name)}</h3><p>${escapeHtml(playerHand?.result || title)}</p></div>`;
        }).join("")}
      </section>
      ${room.hostId === playerId ? `<div class="card-actions">
        ${settled
          ? `<button class="primary" type="button" data-action="continue-gamble">Continue</button>`
          : `<button class="primary" type="button" data-action="settle-poker" ${allPokerHumansLocked() ? "" : "disabled"}>Showdown</button>`}
      </div>` : ""}
    </div>
  `;
}

function renderShop() {
  const me = myPlayer();
  const market = me.market || [];
  return `
    <div class="phase-grid">
      <section class="gear-grid">
        ${["hat", "boots", "weapon", "charm"].map((slot) => {
          const item = ITEM_BY_ID[me.gear?.[slot]];
          return `<div class="gear-slot"><span>${slot}</span><strong>${item ? escapeHtml(item.name) : "Empty"}</strong></div>`;
        }).join("")}
      </section>
      <section class="shop-grid">
        ${market.map((itemId) => {
          const item = ITEM_BY_ID[itemId];
          const disabled = !item || me.money < item.cost || me.shopReady;
          return `
            <article class="shop-card">
              <div class="item-art" style="--item-color:${item.color}">
                ${renderGearSprite(item, "item-sprite")}
              </div>
              <div>
                <span class="mini-label">${item.slot}</span>
                <h3>${escapeHtml(item.name)}</h3>
                <p>${formatStats(item.stats)}${item.element ? ` / ${item.element}` : ""}</p>
              </div>
              <div class="price-row">
                <strong>$${item.cost}</strong>
                <button class="ghost" type="button" data-action="buy-item" data-item="${item.id}" ${disabled ? "disabled" : ""}>Buy</button>
              </div>
            </article>
          `;
        }).join("")}
      </section>
      <div class="card-actions">
        <button class="primary" type="button" data-action="shop-ready" ${me.shopReady ? "disabled" : ""}>Ready</button>
        ${room.hostId === playerId ? `<button class="primary" type="button" data-action="start-fight" ${allHumansShopReady() ? "" : "disabled"}>Fight</button>` : ""}
      </div>
    </div>
  `;
}

function renderFight() {
  const fight = room.fight;
  if (!fight) {
    return `<div class="empty-state">Walking to the arena.</div>`;
  }

  const latest = fight.events?.[0] || {};
  return `
    <div class="phase-grid">
      <section class="fight-grid">
        ${playersList(room).map((player) => {
          const standing = fight.standings?.find((entry) => entry.id === player.id);
          const winner = standing?.rank === 1;
          const attacking = latest.actorId === player.id;
          const hit = latest.targetId === player.id;
          return `
            <article class="combat-card ${winner ? "is-winner" : ""} ${attacking ? "is-attacking" : ""} ${hit ? "is-hit" : ""}">
              ${renderRat(player, { focus: true })}
              <div class="combat-caption">
                <h3>${escapeHtml(player.name)}</h3>
                <p>#${standing?.rank || "-"} / ${player.fightPoints || 0} pts</p>
              </div>
            </article>
          `;
        }).join("")}
      </section>
      <section class="battle-log">
        ${(fight.events || []).slice(0, 10).map((event) => `<div class="battle-line">${escapeHtml(event.text)}</div>`).join("")}
      </section>
      ${room.hostId === playerId ? `<div class="card-actions"><button class="primary" type="button" data-action="next-cycle">${room.cycle >= CYCLES ? "Results" : "Next Cycle"}</button></div>` : ""}
    </div>
  `;
}

function renderFinished() {
  const leaders = leaderboard(room);
  return `
    <section class="leaderboard">
      ${leaders.map((player, index) => `
        <article class="leader">
          ${renderRat(player, { focus: true })}
          <div class="leader-body">
            <span class="mini-label">#${index + 1}</span>
            <h3>${escapeHtml(player.name)}</h3>
            <p>${player.fightPoints || 0} pts / $${player.money}</p>
          </div>
        </article>
      `).join("")}
    </section>
    ${room.hostId === playerId ? `<div class="card-actions"><button class="primary" type="button" data-action="restart-match">Restart</button></div>` : ""}
  `;
}

function renderHostActions() {
  const me = myPlayer();
  const isHost = room.hostId === playerId;
  const actions = [
    `<button class="ghost" type="button" data-action="copy-room">Copy Room</button>`,
    `<button class="ghost" type="button" data-action="leave-room">Leave</button>`,
  ];

  if (!isHost) {
    const host = room.players?.[room.hostId];
    actions.unshift(`<div class="result-card"><h3>${escapeHtml(host?.name || "Host")}</h3><p>Host controls phase changes.</p></div>`);
    els.hostActions.innerHTML = actions.join("");
    return;
  }

  if (room.phase === "lobby") {
    const enough = playersList(room).length >= 2;
    const ready = enough && playersList(room).every((player) => player.id === room.hostId || player.ready || player.isBot);
    actions.unshift(`<button class="primary" type="button" data-action="start-match" ${ready ? "" : "disabled"}>Start</button>`);
    actions.unshift(`<button class="secondary" type="button" data-action="add-rival" ${playersList(room).length >= MAX_PLAYERS ? "disabled" : ""}>Add Rival</button>`);
  }

  if (room.phase === "vote") {
    actions.unshift(`<button class="primary" type="button" data-action="resolve-vote" ${allHumansVoted() ? "" : "disabled"}>Deal</button>`);
  }

  if (room.phase === "blackjack") {
    if (room.gamble?.settled) {
      actions.unshift(`<button class="primary" type="button" data-action="continue-gamble">Continue</button>`);
    } else {
      actions.unshift(`<button class="primary" type="button" data-action="settle-blackjack" ${allBlackjackHumansDone() ? "" : "disabled"}>Settle</button>`);
    }
  }

  if (room.phase === "poker") {
    if (room.gamble?.settled) {
      actions.unshift(`<button class="primary" type="button" data-action="continue-gamble">Continue</button>`);
    } else {
      actions.unshift(`<button class="primary" type="button" data-action="settle-poker" ${allPokerHumansLocked() ? "" : "disabled"}>Showdown</button>`);
    }
  }

  if (room.phase === "shop") {
    actions.unshift(`<button class="primary" type="button" data-action="start-fight" ${allHumansShopReady() ? "" : "disabled"}>Fight</button>`);
  }

  if (room.phase === "fight") {
    actions.unshift(`<button class="primary" type="button" data-action="next-cycle">${room.cycle >= CYCLES ? "Results" : "Next Cycle"}</button>`);
  }

  if (room.phase === "finished") {
    actions.unshift(`<button class="primary" type="button" data-action="restart-match">Restart</button>`);
  }

  els.hostActions.innerHTML = actions.join("");
}

function renderRat(player, options = {}) {
  const ratIndex = clamp(Number(player.rat) || 0, 0, RATS.length - 1);
  const col = ratIndex % 4;
  const row = Math.floor(ratIndex / 4);
  const x = spritePosition(col, 4);
  const y = spritePosition(row, 2);
  const gear = player.gear || {};
  const hat = ITEM_BY_ID[gear.hat];
  const boots = ITEM_BY_ID[gear.boots];
  const weapon = ITEM_BY_ID[gear.weapon];
  const charm = ITEM_BY_ID[gear.charm];
  const element = playerElement(player);
  const classes = options.small ? "rat-render rat-small" : "rat-render";

  return `
    <div class="${classes}" style="--rat-x:${x}; --rat-y:${y}">
      <div class="rat-photo"></div>
      ${element ? `<span class="effect-aura ${element}"></span>` : ""}
      ${hat ? renderGearSprite(hat, "gear-sprite gear-hat") : ""}
      ${boots ? renderBootSprites(boots) : ""}
      ${weapon ? renderGearSprite(weapon, "gear-sprite gear-weapon") : ""}
      ${charm ? renderGearSprite(charm, "gear-sprite gear-charm") : ""}
    </div>
  `;
}

function renderBootSprites(item) {
  return `
    <span class="gear-boots item-${item.id}" aria-hidden="true">
      <span class="gear-boot gear-boot-left"></span>
      <span class="gear-boot gear-boot-right"></span>
    </span>
  `;
}

function renderGearSprite(item, className) {
  const col = item.sprite % 4;
  const row = Math.floor(item.sprite / 4);
  return `<span class="${className} item-${item.id}" style="--gear-x:${spritePosition(col, 4)}; --gear-y:${spritePosition(row, 4)}" aria-hidden="true"></span>`;
}

function selectRat(index) {
  selectedRat = clamp(index, 0, RATS.length - 1);
  render();
}

async function saveProfile(markReady) {
  const nameField = document.querySelector("[data-name-field]");
  if (nameField) {
    els.nameInput.value = nameField.value;
  }

  const name = getName();
  localStorage.setItem(PLAYER_NAME_KEY, name);
  await runRoomTransaction((next) => {
    const player = next.players[playerId];
    player.name = name;
    player.rat = selectedRat;
    player.ready = markReady ? !player.ready : player.ready;
    player.lastSeen = Date.now();
  });
}

async function addRival() {
  requireHost();
  await runRoomTransaction((next) => {
    const count = playersList(next).length;
    if (count >= MAX_PLAYERS) {
      throw new Error("Room is full.");
    }
    const id = `bot-${Date.now().toString(36)}-${count}`;
    const rat = count % RATS.length;
    next.players[id] = {
      ...newPlayer(id, rivalName(count), rat, true),
      ready: true,
      money: START_MONEY,
    };
  });
}

async function startMatch() {
  requireHost();
  await runRoomTransaction((next) => {
    const players = playersList(next);
    if (players.length < 2) {
      throw new Error("Need two players.");
    }
    if (!players.every((player) => player.id === next.hostId || player.ready || player.isBot)) {
      throw new Error("Everyone needs to ready up.");
    }
    for (const player of Object.values(next.players)) {
      player.money = START_MONEY;
      player.fightPoints = 0;
      player.gear = {};
      player.inventory = [];
      player.market = [];
      player.ready = false;
      player.shopReady = false;
    }
    next.cycle = 1;
    beginVote(next, 1);
  });
}

async function voteGame(game) {
  if (!["blackjack", "poker"].includes(game)) {
    return;
  }

  await runRoomTransaction((next) => {
    if (next.phase !== "vote") return;
    next.votes[playerId] = game;
  });
}

async function resolveVote() {
  requireHost();
  await runRoomTransaction((next) => {
    if (next.phase !== "vote") return;
    const rng = createRng(`${next.seed}-vote-${next.cycle}-${next.gambleRound}`);
    for (const player of playersList(next)) {
      if (player.isBot && !next.votes[player.id]) {
        next.votes[player.id] = rng() > 0.48 ? "blackjack" : "poker";
      }
    }

    const votes = Object.values(next.votes || {});
    const blackjack = votes.filter((vote) => vote === "blackjack").length;
    const poker = votes.filter((vote) => vote === "poker").length;
    const game = blackjack === poker ? (rng() > 0.5 ? "blackjack" : "poker") : blackjack > poker ? "blackjack" : "poker";
    startGamble(next, game);
  });
}

async function hitBlackjack() {
  await runRoomTransaction((next) => {
    const gamble = next.gamble;
    const hand = gamble?.hands?.[playerId];
    if (next.phase !== "blackjack" || gamble.settled || !hand || hand.standing) return;
    hand.hand.push(drawCard(gamble.deck));
    const score = blackjackScore(hand.hand).total;
    if (score >= 21) {
      hand.standing = true;
    }
  });
}

async function standBlackjack() {
  await runRoomTransaction((next) => {
    const hand = next.gamble?.hands?.[playerId];
    if (next.phase !== "blackjack" || next.gamble?.settled || !hand) return;
    hand.standing = true;
  });
}

async function settleBlackjack() {
  requireHost();
  await runRoomTransaction((next) => {
    if (next.phase !== "blackjack" || next.gamble?.settled) return;
    const gamble = next.gamble;

    for (const player of playersList(next)) {
      const hand = gamble.hands[player.id];
      if (!hand) continue;
      if (player.isBot) {
        while (blackjackScore(hand.hand).total < 16) {
          hand.hand.push(drawCard(gamble.deck));
        }
      }
      hand.standing = true;
    }

    while (blackjackScore(gamble.dealer).total < 17) {
      gamble.dealer.push(drawCard(gamble.deck));
    }

    const dealer = blackjackScore(gamble.dealer);
    for (const player of playersList(next)) {
      const hand = gamble.hands[player.id];
      const score = blackjackScore(hand.hand);
      const natural = hand.hand.length === 2 && score.total === 21;
      let payout = 0;
      let result = "Lost";

      if (score.total > 21) {
        result = "Bust";
      } else if (dealer.total > 21 || score.total > dealer.total) {
        payout = natural ? hand.stake * 3 : hand.stake * 2;
        result = natural ? "Blackjack" : "Won";
      } else if (score.total === dealer.total) {
        payout = hand.stake;
        result = "Push";
      }

      next.players[player.id].money += payout;
      hand.result = `${result} ${formatDelta(payout - hand.stake)}`;
      hand.delta = payout - hand.stake;
    }

    gamble.settled = true;
  });
}

async function continueAfterGamble() {
  requireHost();
  await runRoomTransaction((next) => {
    if (!next.gamble?.settled) return;
    if (next.gambleRound === 1) {
      beginVote(next, 2);
    } else {
      startShop(next);
    }
  });
}

function togglePokerDiscard(index) {
  const hand = room.gamble?.hands?.[playerId];
  if (!hand || hand.locked || room.gamble.settled) {
    return;
  }

  if (selectedDiscards.has(index)) {
    selectedDiscards.delete(index);
  } else if (selectedDiscards.size < 2) {
    selectedDiscards.add(index);
  } else {
    showToast("Pick up to two cards.");
  }

  render();
}

async function redrawPoker() {
  const indices = [...selectedDiscards].sort((a, b) => a - b);
  if (!indices.length) {
    return;
  }

  await runRoomTransaction((next) => {
    const hand = next.gamble?.hands?.[playerId];
    if (next.phase !== "poker" || next.gamble?.settled || !hand || hand.locked) return;
    for (const index of indices) {
      hand.hand[index] = drawCard(next.gamble.deck);
    }
    hand.locked = true;
    hand.redrawn = true;
  });
  selectedDiscards = new Set();
}

async function holdPoker() {
  await runRoomTransaction((next) => {
    const hand = next.gamble?.hands?.[playerId];
    if (next.phase !== "poker" || next.gamble?.settled || !hand) return;
    hand.locked = true;
  });
}

async function settlePoker() {
  requireHost();
  await runRoomTransaction((next) => {
    if (next.phase !== "poker" || next.gamble?.settled) return;
    const gamble = next.gamble;
    const entries = playersList(next).map((player) => {
      const hand = gamble.hands[player.id];
      if (player.isBot) {
        hand.locked = true;
      }
      return {
        id: player.id,
        evaluation: evaluatePoker(hand.hand),
        stake: hand.stake,
      };
    });

    const best = Math.max(...entries.map((entry) => entry.evaluation.score));
    const winners = entries.filter((entry) => entry.evaluation.score === best);
    const share = Math.floor(gamble.pot / winners.length);
    let leftovers = gamble.pot - share * winners.length;

    for (const entry of entries) {
      const hand = gamble.hands[entry.id];
      const won = winners.some((winner) => winner.id === entry.id);
      const payout = won ? share + (leftovers-- > 0 ? 1 : 0) : 0;
      next.players[entry.id].money += payout;
      hand.result = `${entry.evaluation.label} ${formatDelta(payout - hand.stake)}`;
      hand.delta = payout - hand.stake;
      hand.locked = true;
    }

    gamble.settled = true;
  });
}

async function buyItem(itemId) {
  await runRoomTransaction((next) => {
    if (next.phase !== "shop") return;
    const player = next.players[playerId];
    const item = ITEM_BY_ID[itemId];
    if (!item || player.shopReady || !player.market?.includes(itemId)) return;
    if (player.money < item.cost) {
      throw new Error("Not enough cash.");
    }
    player.money -= item.cost;
    player.inventory = [...(player.inventory || []), itemId];
    player.gear = { ...(player.gear || {}), [item.slot]: itemId };
    player.market = player.market.filter((id) => id !== itemId);
  });
}

async function setShopReady() {
  await runRoomTransaction((next) => {
    if (next.phase !== "shop") return;
    next.players[playerId].shopReady = true;
  });
}

async function startFight() {
  requireHost();
  await runRoomTransaction((next) => {
    if (next.phase !== "shop") return;
    for (const player of playersList(next)) {
      if (player.isBot) {
        autoShop(player, `${next.seed}-shop-${next.cycle}-${player.id}`);
        player.shopReady = true;
      }
    }

    if (!playersList(next).filter((player) => !player.isBot).every((player) => player.shopReady)) {
      throw new Error("Everyone needs to ready.");
    }

    next.phase = "fight";
    next.fight = simulateFight(next);
    for (const standing of next.fight.standings) {
      const player = next.players[standing.id];
      if (standing.rank === 1) {
        player.fightPoints = (player.fightPoints || 0) + 3;
        player.money += 8;
      } else if (standing.rank === 2) {
        player.fightPoints = (player.fightPoints || 0) + 1;
        player.money += 3;
      }
      player.shopReady = false;
    }
  });
}

async function advanceAfterFight() {
  requireHost();
  await runRoomTransaction((next) => {
    if (next.phase !== "fight") return;
    if (next.cycle >= CYCLES) {
      const winner = leaderboard(next)[0];
      next.winnerId = winner?.id || "";
      next.phase = "finished";
    } else {
      next.cycle += 1;
      beginVote(next, 1);
    }
  });
}

async function restartMatch() {
  requireHost();
  await runRoomTransaction((next) => {
    next.phase = "lobby";
    next.cycle = 1;
    next.gambleRound = 1;
    next.votes = {};
    next.gamble = null;
    next.shop = null;
    next.fight = null;
    next.winnerId = "";
    for (const player of Object.values(next.players)) {
      player.money = START_MONEY;
      player.fightPoints = 0;
      player.gear = {};
      player.inventory = [];
      player.market = [];
      player.ready = player.isBot ? true : false;
      player.shopReady = false;
    }
  });
}

function beginVote(next, round) {
  next.phase = "vote";
  next.gambleRound = round;
  next.votes = {};
  next.gamble = null;
  next.shop = null;
  next.fight = null;
  selectedDiscards = new Set();
}

function startGamble(next, game) {
  const deck = shuffledDeck(`${next.seed}-${next.cycle}-${next.gambleRound}-${game}`);
  const players = playersList(next);
  const gamble = {
    game,
    round: next.gambleRound,
    seed: `${next.seed}-${next.cycle}-${next.gambleRound}-${game}`,
    deck,
    settled: false,
    hands: {},
    dealer: [],
    pot: 0,
  };

  if (game === "blackjack") {
    gamble.dealer = [drawCard(gamble.deck), drawCard(gamble.deck)];
    for (const player of players) {
      const stake = Math.min(STAKE, Math.max(0, next.players[player.id].money));
      next.players[player.id].money -= stake;
      gamble.hands[player.id] = {
        stake,
        hand: [drawCard(gamble.deck), drawCard(gamble.deck)],
        standing: false,
        result: "",
        delta: 0,
      };
    }
    next.phase = "blackjack";
  } else {
    for (const player of players) {
      const stake = Math.min(STAKE, Math.max(0, next.players[player.id].money));
      next.players[player.id].money -= stake;
      gamble.pot += stake;
      gamble.hands[player.id] = {
        stake,
        hand: [drawCard(gamble.deck), drawCard(gamble.deck), drawCard(gamble.deck), drawCard(gamble.deck), drawCard(gamble.deck)],
        locked: false,
        redrawn: false,
        result: "",
        delta: 0,
      };
    }
    next.phase = "poker";
  }

  next.gamble = gamble;
  next.votes = {};
}

function startShop(next) {
  next.phase = "shop";
  next.gamble = null;
  next.votes = {};
  next.shop = {
    seed: `${next.seed}-shop-${next.cycle}`,
  };

  for (const player of playersList(next)) {
    player.shopReady = false;
    player.market = rollMarket(`${next.shop.seed}-${player.id}`);
  }
}

function simulateFight(next) {
  const rng = createRng(`${next.seed}-fight-${next.cycle}`);
  const combatants = playersList(next).map((player) => {
    const stats = computeStats(player);
    return {
      id: player.id,
      name: player.name,
      hp: stats.hp,
      maxHp: stats.hp,
      attack: stats.attack,
      defense: stats.defense,
      speed: stats.speed,
      crit: stats.crit,
      element: playerElement(player),
      burn: 0,
      poison: 0,
      outAt: 999,
    };
  });

  const events = [];
  let tick = 0;
  while (aliveCombatants(combatants).length > 1 && tick < 80) {
    tick += 1;
    const order = aliveCombatants(combatants).sort((a, b) => (b.speed + rng()) - (a.speed + rng()));

    for (const actor of order) {
      if (actor.hp <= 0) continue;
      applyDot(actor, events);
      if (actor.hp <= 0) {
        actor.outAt = tick;
        continue;
      }

      const targets = aliveCombatants(combatants).filter((target) => target.id !== actor.id);
      if (!targets.length) break;
      const target = targets[Math.floor(rng() * targets.length)];
      const crit = rng() * 100 < actor.crit;
      const base = actor.attack + Math.floor(rng() * 4) - target.defense;
      const damage = Math.max(1, Math.floor(base * (crit ? 1.75 : 1)));
      target.hp -= damage;

      if (actor.element === "fire") {
        target.burn = Math.max(target.burn, 2);
      }
      if (actor.element === "poison") {
        target.poison += 1;
      }

      events.unshift({
        actorId: actor.id,
        targetId: target.id,
        text: `${actor.name} hits ${target.name} for ${damage}${crit ? " crit" : ""}${actor.element ? ` / ${actor.element}` : ""}.`,
      });

      if (target.hp <= 0) {
        target.outAt = tick;
        events.unshift({
          actorId: actor.id,
          targetId: target.id,
          text: `${target.name} drops out.`,
        });
      }
    }
  }

  const standings = [...combatants]
    .sort((a, b) => {
      if (a.hp > 0 && b.hp <= 0) return -1;
      if (a.hp <= 0 && b.hp > 0) return 1;
      if (a.hp > 0 && b.hp > 0) return b.hp - a.hp;
      return b.outAt - a.outAt;
    })
    .map((fighter, index) => ({
      id: fighter.id,
      rank: index + 1,
      hp: Math.max(0, fighter.hp),
    }));

  return {
    seed: `${next.seed}-fight-${next.cycle}`,
    events: events.slice(0, 18),
    standings,
    winnerId: standings[0]?.id || "",
  };
}

function applyDot(fighter, events) {
  if (fighter.burn > 0) {
    fighter.hp -= 2;
    fighter.burn -= 1;
    events.unshift({ actorId: "", targetId: fighter.id, text: `${fighter.name} burns for 2.` });
  }

  if (fighter.poison > 0) {
    fighter.hp -= fighter.poison;
    fighter.poison = Math.max(0, fighter.poison - 1);
    events.unshift({ actorId: "", targetId: fighter.id, text: `${fighter.name} takes poison.` });
  }
}

function autoShop(player, seed) {
  const rng = createRng(seed);
  const market = [...(player.market || [])].sort(() => rng() - 0.5);
  for (const itemId of market) {
    const item = ITEM_BY_ID[itemId];
    if (!item || player.money < item.cost) continue;
    if (rng() < 0.42) {
      player.money -= item.cost;
      player.inventory = [...(player.inventory || []), itemId];
      player.gear = { ...(player.gear || {}), [item.slot]: itemId };
    }
  }
}

function allHumansVoted() {
  return playersList(room).filter((player) => !player.isBot).every((player) => room.votes?.[player.id]);
}

function allBlackjackHumansDone() {
  const gamble = room.gamble;
  if (!gamble) return false;
  return playersList(room)
    .filter((player) => !player.isBot)
    .every((player) => {
      const hand = gamble.hands?.[player.id];
      return hand && (hand.standing || blackjackScore(hand.hand).total >= 21);
    });
}

function allPokerHumansLocked() {
  const gamble = room.gamble;
  if (!gamble) return false;
  return playersList(room)
    .filter((player) => !player.isBot)
    .every((player) => gamble.hands?.[player.id]?.locked);
}

function allHumansShopReady() {
  return playersList(room)
    .filter((player) => !player.isBot)
    .every((player) => player.shopReady);
}

function playerStatus(player) {
  if (room.phase === "lobby") return player.ready || player.isBot ? "Ready" : "Waiting";
  if (room.phase === "vote") return room.votes?.[player.id] ? "Voted" : "Picking";
  if (room.phase === "blackjack") {
    const hand = room.gamble?.hands?.[player.id];
    if (!hand) return "Waiting";
    if (room.gamble?.settled) return hand.result || "Done";
    return hand.standing || blackjackScore(hand.hand).total >= 21 ? "Standing" : "Playing";
  }
  if (room.phase === "poker") {
    const hand = room.gamble?.hands?.[player.id];
    if (!hand) return "Waiting";
    if (room.gamble?.settled) return hand.result || "Done";
    return hand.locked ? "Locked" : "Drawing";
  }
  if (room.phase === "shop") return player.shopReady || player.isBot ? "Ready" : "Shopping";
  if (room.phase === "fight") return "In arena";
  return "Finished";
}

function computeStats(player) {
  const stats = { ...BASE_STATS };
  const gear = player.gear || {};
  for (const itemId of Object.values(gear)) {
    const item = ITEM_BY_ID[itemId];
    if (!item) continue;
    for (const [key, value] of Object.entries(item.stats || {})) {
      stats[key] = (stats[key] || 0) + value;
    }
  }
  stats.hp = Math.max(10, stats.hp);
  stats.attack = Math.max(1, stats.attack);
  stats.defense = Math.max(0, stats.defense);
  stats.speed = Math.max(1, stats.speed);
  stats.crit = Math.max(0, stats.crit);
  return stats;
}

function playerElement(player) {
  const gear = player.gear || {};
  for (const itemId of Object.values(gear)) {
    const item = ITEM_BY_ID[itemId];
    if (item?.element) {
      return item.element;
    }
  }
  return "";
}

function rollMarket(seed) {
  const rng = createRng(seed);
  const pool = [...ITEMS].sort(() => rng() - 0.5);
  return pool.slice(0, 6).map((item) => item.id);
}

function shuffledDeck(seed) {
  const deck = [];
  for (const suit of CARD_SUITS) {
    for (const rank of CARD_RANKS) {
      deck.push(`${rank}${suit}`);
    }
  }

  const rng = createRng(seed);
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [deck[index], deck[swap]] = [deck[swap], deck[index]];
  }
  return deck;
}

function drawCard(deck) {
  return deck.pop() || "2C";
}

function cardParts(card) {
  if (card === "BACK") return { rank: "", suit: "" };
  return {
    rank: card.slice(0, -1),
    suit: card.slice(-1),
  };
}

function cardHtml(card, options = {}) {
  if (card === "BACK") {
    return `<div class="card back">?</div>`;
  }

  const { rank, suit } = cardParts(card);
  const red = suit === "H" || suit === "D";
  const selected = options.selected ? "is-selected" : "";
  const action = options.clickable ? `data-action="poker-toggle" data-index="${options.index}"` : "";
  const tag = options.clickable ? "button" : "div";
  return `<${tag} class="card ${red ? "red" : ""} ${selected}" type="button" ${action}><span>${rank}</span><span>${suit}</span></${tag}>`;
}

function blackjackScore(cards) {
  let total = 0;
  let aces = 0;
  for (const card of cards) {
    const { rank } = cardParts(card);
    if (rank === "A") {
      total += 11;
      aces += 1;
    } else if (["K", "Q", "J"].includes(rank)) {
      total += 10;
    } else {
      total += Number(rank) || 0;
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return { total, soft: aces > 0 };
}

function evaluatePoker(cards) {
  const ranks = cards.map((card) => cardParts(card).rank);
  const suits = cards.map((card) => cardParts(card).suit);
  const values = ranks.map((rank) => RANK_VALUE[rank]).sort((a, b) => b - a);
  const counts = {};
  for (const value of values) {
    counts[value] = (counts[value] || 0) + 1;
  }

  const groups = Object.entries(counts)
    .map(([value, count]) => ({ value: Number(value), count }))
    .sort((a, b) => b.count - a.count || b.value - a.value);
  const flush = suits.every((suit) => suit === suits[0]);
  const unique = [...new Set(values)].sort((a, b) => b - a);
  const wheel = unique.join(",") === "14,5,4,3,2";
  const straightHigh = unique.length === 5 && (unique[0] - unique[4] === 4 || wheel) ? (wheel ? 5 : unique[0]) : 0;

  let category = 0;
  let label = "High card";
  if (straightHigh && flush) {
    category = 8;
    label = "Straight flush";
  } else if (groups[0].count === 4) {
    category = 7;
    label = "Four of a kind";
  } else if (groups[0].count === 3 && groups[1]?.count === 2) {
    category = 6;
    label = "Full house";
  } else if (flush) {
    category = 5;
    label = "Flush";
  } else if (straightHigh) {
    category = 4;
    label = "Straight";
  } else if (groups[0].count === 3) {
    category = 3;
    label = "Three of a kind";
  } else if (groups[0].count === 2 && groups[1]?.count === 2) {
    category = 2;
    label = "Two pair";
  } else if (groups[0].count === 2) {
    category = 1;
    label = "Pair";
  }

  const tiebreakers = straightHigh ? [straightHigh] : groups.flatMap((group) => Array(group.count).fill(group.value));
  const score = category * 1000000 + tiebreakers.reduce((sum, value, index) => sum + value * (15 ** (4 - index)), 0);
  return { score, label };
}

function formatStats(stats) {
  return Object.entries(stats)
    .map(([key, value]) => `${value > 0 ? "+" : ""}${value} ${key}`)
    .join(", ");
}

function formatDelta(delta) {
  if (delta > 0) return `+$${delta}`;
  if (delta < 0) return `-$${Math.abs(delta)}`;
  return "$0";
}

function leaderboard(sourceRoom) {
  return playersList(sourceRoom).sort((a, b) => {
    const pointDiff = (b.fightPoints || 0) - (a.fightPoints || 0);
    if (pointDiff) return pointDiff;
    return (b.money || 0) - (a.money || 0);
  });
}

function aliveCombatants(combatants) {
  return combatants.filter((fighter) => fighter.hp > 0);
}

function playersList(sourceRoom) {
  return Object.values(sourceRoom?.players || {}).sort((a, b) => {
    if (a.isBot && !b.isBot) return 1;
    if (!a.isBot && b.isBot) return -1;
    return (a.joinedAt || 0) - (b.joinedAt || 0);
  });
}

function myPlayer() {
  return room?.players?.[playerId] || null;
}

function newPlayer(id, name, rat, isBot = false) {
  return {
    id,
    name: name || "Player",
    rat: clamp(Number(rat) || 0, 0, RATS.length - 1),
    isBot,
    money: START_MONEY,
    fightPoints: 0,
    gear: {},
    inventory: [],
    market: [],
    ready: false,
    shopReady: false,
    online: true,
    joinedAt: Date.now(),
    lastSeen: Date.now(),
  };
}

function rivalName(index) {
  return ["Velvet", "Pip", "Clover", "Juniper"][index % 4];
}

async function runRoomTransaction(mutator) {
  if (syncMode === "local" || !databaseApi) {
    runLocalRoomTransaction(mutator);
    return;
  }

  ensureServices();
  if (!roomRef) {
    throw new Error("No room selected.");
  }

  let transactionError = null;
  let result = null;
  try {
    result = await databaseApi.runTransaction(roomRef, (current) => {
      if (!current) {
        transactionError = new Error("Room is gone.");
        return;
      }

      const next = cloneRoom(current);
      try {
        mutator(next);
      } catch (error) {
        transactionError = error;
        return;
      }
      next.updatedAt = Date.now();
      return next;
    });
  } catch (error) {
    if (isPermissionError(error) && room?.code) {
      startLocalRoom(room.code, cloneRoom(room), "Switched to local room.");
      runLocalRoomTransaction(mutator);
      return;
    }
    throw error;
  }

  if (transactionError) {
    throw transactionError;
  }

  if (!result.committed) {
    throw new Error("Room update did not save.");
  }
}

async function uniqueRoomCode() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateRoomCode();
    const localExists = Boolean(loadLocalRoom(code));
    let remoteExists = false;
    if (databaseApi) {
      try {
        const ref = roomReference(code);
        const snap = await databaseApi.get(ref);
        remoteExists = snap.exists();
      } catch {
        remoteExists = false;
      }
    }
    if (!remoteExists && !localExists) {
      return code;
    }
  }
  throw new Error("Could not make a room code.");
}

async function joinLocalRoom(code, options = {}) {
  const existing = loadLocalRoom(code);
  if (!existing) {
    if (!options.quiet) {
      throw new Error("Room not found. Online sync is blocked by Firebase rules.");
    }
    render();
    return;
  }

  syncMode = "local";
  roomRef = { code };
  runLocalRoomTransaction((next) => {
    const players = Object.values(next.players || {});
    if (!next.players[playerId] && players.length >= MAX_PLAYERS) {
      throw new Error("Room is full.");
    }

    const name = getName();
    const existingPlayer = next.players[playerId];
    next.players[playerId] = {
      ...(existingPlayer || newPlayer(playerId, name, selectedRat)),
      name,
      rat: existingPlayer ? existingPlayer.rat : selectedRat,
      online: true,
      lastSeen: Date.now(),
    };
  });
  localStorage.setItem(PLAYER_NAME_KEY, getName());
  setRoomHash(code);
  listenToLocalRoom(code);
  if (!options.quiet) {
    showToast(`Joined local ${code}.`);
  }
}

function startLocalRoom(code, data, message) {
  syncMode = "local";
  roomRef = { code };
  saveLocalRoom(data);
  setRoomHash(code);
  listenToLocalRoom(code);
  showToast(message || `Local room ${code}.`);
}

function listenToLocalRoom(code) {
  if (unsubscribe) {
    unsubscribe();
  }

  roomRef = { code };
  const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("rat-royale") : null;
  const refresh = () => {
    room = loadLocalRoom(code);
    const me = myPlayer();
    if (me) {
      selectedRat = me.rat || 0;
    }
    render();
  };
  const onStorage = (event) => {
    if (event.key === localRoomKey(code)) {
      refresh();
    }
  };
  const onMessage = (event) => {
    if (event.data?.code === code) {
      refresh();
    }
  };

  window.addEventListener("storage", onStorage);
  channel?.addEventListener("message", onMessage);
  unsubscribe = () => {
    window.removeEventListener("storage", onStorage);
    channel?.removeEventListener("message", onMessage);
    channel?.close();
  };
  refresh();
}

function runLocalRoomTransaction(mutator) {
  const code = roomRef?.code || room?.code;
  if (!code) {
    throw new Error("No room selected.");
  }

  const current = loadLocalRoom(code);
  if (!current) {
    throw new Error("Room is gone.");
  }

  const next = cloneRoom(current);
  mutator(next);
  next.updatedAt = Date.now();
  saveLocalRoom(next);
}

function saveLocalRoom(data) {
  const snapshot = cloneRoom(data);
  localStorage.setItem(localRoomKey(snapshot.code), JSON.stringify(snapshot));
  room = snapshot;
  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel("rat-royale");
    channel.postMessage({ code: snapshot.code, updatedAt: snapshot.updatedAt });
    channel.close();
  }
  render();
}

function loadLocalRoom(code) {
  try {
    return JSON.parse(localStorage.getItem(localRoomKey(code)) || "null");
  } catch {
    return null;
  }
}

function localRoomKey(code) {
  return `ratRoyaleRoom:${cleanRoomCode(code)}`;
}

function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < 4; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

function getHashRoomCode() {
  const hash = window.location.hash.replace(/^#/, "");
  const params = new URLSearchParams(hash);
  return cleanRoomCode(params.get("room") || "");
}

function setRoomHash(code) {
  const url = new URL(window.location.href);
  url.hash = `room=${code}`;
  window.history.replaceState(null, "", url);
  els.roomCodeInput.value = code;
}

function cleanRoomCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
}

function getName() {
  return (els.nameInput.value || "").trim().slice(0, 18) || "Player";
}

function getPlayerId() {
  const existing = localStorage.getItem(PLAYER_ID_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID ? crypto.randomUUID() : `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(PLAYER_ID_KEY, id);
  return id;
}

function createRng(seed) {
  let value = hashSeed(seed);
  return () => {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(seed) {
  let hash = 2166136261;
  const text = String(seed);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function cloneRoom(value) {
  return JSON.parse(JSON.stringify(value));
}

function requireHost() {
  if (!room || room.hostId !== playerId) {
    throw new Error("Only the host can do that.");
  }
}

function ensureServices() {
  if (!services || !databaseApi || !database) {
    throw new Error("Firebase is not ready.");
  }
}

async function startRealtimeDatabase() {
  databaseApi = await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-database.js`);
  database = databaseApi.getDatabase(services.app);
}

function roomReference(code) {
  return databaseApi.ref(database, `${COLLECTION}/${code}`);
}

function isPermissionError(error) {
  const text = `${error?.code || ""} ${error?.message || ""}`;
  return /permission|PERMISSION_DENIED/i.test(text);
}

function copyRoomLink() {
  const link = window.location.href;
  if (!navigator.clipboard?.writeText) {
    showToast(room.code);
    return;
  }
  navigator.clipboard.writeText(link)
    .then(() => showToast("Room link copied."))
    .catch(() => showToast(room.code));
}

function leaveRoom() {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  room = null;
  roomRef = null;
  window.history.replaceState(null, "", window.location.href.split("#")[0]);
  render();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 2600);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function spritePosition(index, count) {
  if (count <= 1) {
    return "0%";
  }
  return `${(index / (count - 1)) * 100}%`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
