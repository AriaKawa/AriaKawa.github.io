import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js';
import { getAnalytics, isSupported as analyticsIsSupported } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js';
import { getDatabase, ref, set, update, onValue, onDisconnect, get, remove, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk',
  authDomain: 'multiplayer-640ec.firebaseapp.com',
  databaseURL: 'https://multiplayer-640ec-default-rtdb.firebaseio.com',
  projectId: 'multiplayer-640ec',
  storageBucket: 'multiplayer-640ec.firebasestorage.app',
  messagingSenderId: '94914236381',
  appId: '1:94914236381:web:55ab00cc690140180cf034',
  measurementId: 'G-V43J1S8RGF'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

analyticsIsSupported()
  .then(supported => {
    if (supported) {
      getAnalytics(app);
    }
  })
  .catch(err => {
    console.warn('Analytics not available', err);
  });

const SUITS = ['♠','♥','♦','♣'];
const RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function buildShoe(decks = 6) {
  const shoe = [];
  for (let d = 0; d < decks; d++) {
    for (const s of SUITS) {
      for (const r of RANKS) {
        shoe.push({ suit: s, rank: r });
      }
    }
  }
  for (let i = shoe.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shoe[i], shoe[j]] = [shoe[j], shoe[i]];
  }
  return shoe;
}

function cardValue(card) {
  if (!card) return 0;
  if (card.rank === 'A') return 11;
  if (['K', 'Q', 'J'].includes(card.rank)) return 10;
  return parseInt(card.rank, 10);
}

function handValue(cards) {
  let sum = 0;
  let aces = 0;
  for (const c of cards) {
    sum += cardValue(c);
    if (c.rank === 'A') aces++;
  }
  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces--;
  }
  return sum;
}

function suitColor(s) {
  return s === '♥' || s === '♦' ? '#d64545' : '#1f2a44';
}

function renderSVG(card) {
  const s = suitColor(card.suit);
  const rank = card.rank;
  return `
  <svg class="svg" viewBox="0 0 250 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${rank} ${card.suit}">
    <defs>
      <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feOffset dx="0" dy="2" />
        <feGaussianBlur stdDeviation="2" result="offblur" />
        <feComposite in="SourceGraphic" in2="offblur" operator="arithmetic" k2="-1" k3="1" />
      </filter>
    </defs>
    <rect x="4" y="4" rx="22" ry="22" width="242" height="342" fill="#ffffff" filter="url(#innerShadow)" />
    <rect x="8" y="8" rx="18" ry="18" width="234" height="334" fill="#ffffff" />
    <g fill="${s}">
      <text x="22" y="40" font-size="44" font-family="ui-monospace, Menlo, Consolas, monospace">${rank}</text>
      <text x="22" y="76" font-size="44">${card.suit}</text>
      <text x="228" y="340" font-size="44" text-anchor="end" transform="rotate(180,228,340)">${rank}</text>
      <text x="228" y="304" font-size="44" text-anchor="end" transform="rotate(180,228,304)">${card.suit}</text>
      <text x="125" y="205" font-size="120" text-anchor="middle" dominant-baseline="middle" opacity=".9">${card.suit}</text>
    </g>
  </svg>`;
}

const dealerSpot = document.getElementById('dealerSpot');
const playerSpot = document.getElementById('playerSpot');
const dealerTotal = document.getElementById('dealerTotal');
const playerTotal = document.getElementById('playerTotal');
const statusEl = document.getElementById('status');
const btnDeal = document.getElementById('btnDeal');
const btnHit = document.getElementById('btnHit');
const btnStand = document.getElementById('btnStand');
const btnNew = document.getElementById('btnNew');
const bankDisplay = document.getElementById('bank');

const lobbyOverlay = document.getElementById('lobbyOverlay');
const singleplayerBtn = document.getElementById('singleplayerBtn');
const hostBtn = document.getElementById('hostBtn');
const joinToggle = document.getElementById('joinToggle');
const hostPanel = document.getElementById('hostPanel');
const hostCodeEl = document.getElementById('hostCode');
const joinForm = document.getElementById('joinForm');
const joinCodeInput = document.getElementById('joinCodeInput');
const joinSubmit = document.getElementById('joinSubmit');
const lobbyStatus = document.getElementById('lobbyStatus');

let shoe = buildShoe(6);
let player = [];
let dealer = [];
let bank = 1000;
let dealerHoleHidden = false;
let currentButtonState = 'deal';
let statusTimer = null;
let statusVisible = false;
let statusDuration = 1100;
let suppressSync = false;

let mode = 'lobby';
let isHost = false;
let gameCode = null;
let remoteGameRef = null;
let remoteMetaUnsub = null;
let remoteStateUnsub = null;
let hostDisconnect = null;
let joinDisconnect = null;

bankDisplay.textContent = bank;
setButtons('deal');
showOverlay();
setLobbyStatus('Pick a mode to get started.');

function setButtons(state) {
  currentButtonState = state;
  const toggle = (el, on) => el.classList.toggle('muted', !on);
  switch (state) {
    case 'deal':
      toggle(btnDeal, true);
      toggle(btnHit, false);
      toggle(btnStand, false);
      break;
    case 'player':
      toggle(btnDeal, false);
      toggle(btnHit, true);
      toggle(btnStand, true);
      break;
    case 'lock':
      toggle(btnDeal, false);
      toggle(btnHit, false);
      toggle(btnStand, false);
      break;
  }
}

function showStatus(msg, ms = 1100, broadcast = true) {
  clearTimeout(statusTimer);
  statusEl.textContent = msg;
  statusEl.classList.add('show');
  statusVisible = true;
  statusDuration = ms;
  statusTimer = setTimeout(() => {
    statusEl.classList.remove('show');
    statusVisible = false;
    if (broadcast) broadcastState();
  }, ms);
  if (broadcast) broadcastState();
}

function clearStatus() {
  clearTimeout(statusTimer);
  statusEl.textContent = '';
  statusEl.classList.remove('show');
  statusVisible = false;
}

function clearSpots() {
  dealerSpot.innerHTML = '';
  playerSpot.innerHTML = '';
  dealerTotal.textContent = '0';
  playerTotal.textContent = '0';
}

function renderHand(spot, cards, hideHole) {
  spot.innerHTML = '';
  cards.forEach((card, idx) => {
    const el = document.createElement('div');
    el.className = 'card';
    const x = 20 + idx * 28;
    const y = 6 + idx * 2;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `translate(0,0) rotate(${[-3, -1, 1, 3][idx % 4]}deg)`;
    if (hideHole && idx === 1) {
      el.innerHTML = '<div class="back"></div>';
    } else {
      el.innerHTML = renderSVG(card);
    }
    spot.appendChild(el);
  });
}

function updateTotals() {
  if (dealer.length === 0) {
    dealerTotal.textContent = '0';
  } else if (dealerHoleHidden) {
    const first = dealer[0];
    dealerTotal.textContent = first ? `${cardValue(first)} +` : '0';
  } else {
    dealerTotal.textContent = String(handValue(dealer));
  }
  playerTotal.textContent = player.length ? String(handValue(player)) : '0';
}

function drawCard(toHand, toSpot, faceDown = false) {
  const card = shoe.pop();
  toHand.push(card);
  const el = document.createElement('div');
  el.className = 'card';
  el.style.left = '50%';
  el.style.top = '45%';
  el.style.transform = 'translate(-50%,-50%) rotate(5deg)';
  if (faceDown) {
    el.innerHTML = '<div class="back"></div>';
  } else {
    el.innerHTML = renderSVG(card);
  }
  const idx = toSpot.children.length;
  const x = 20 + idx * 28;
  const y = 6 + idx * 2;
  toSpot.appendChild(el);
  requestAnimationFrame(() => {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `translate(0,0) rotate(${[-3, -1, 1, 3][idx % 4]}deg)`;
  });
  return card;
}

function flipDealerHole() {
  dealerHoleHidden = false;
  const cardEl = dealerSpot.children[1];
  if (cardEl) {
    cardEl.innerHTML = renderSVG(dealer[1]);
  }
}

function broadcastState() {
  if (!remoteGameRef || !isHost || suppressSync) return;
  const state = {
    player,
    dealer,
    bank,
    dealerHoleHidden,
    buttonState: currentButtonState,
    statusMessage: statusEl.textContent,
    statusVisible,
    statusDuration
  };
  update(remoteGameRef, {
    state,
    updatedAt: serverTimestamp()
  }).catch(() => {});
}

function applyRemoteState(state) {
  if (mode !== 'joiner' || !state) return;
  suppressSync = true;
  player = Array.isArray(state.player) ? state.player : [];
  dealer = Array.isArray(state.dealer) ? state.dealer : [];
  bank = typeof state.bank === 'number' ? state.bank : bank;
  dealerHoleHidden = !!state.dealerHoleHidden;
  currentButtonState = state.buttonState || 'deal';
  statusDuration = state.statusDuration || 1100;

  bankDisplay.textContent = bank;
  renderHand(dealerSpot, dealer, dealerHoleHidden);
  renderHand(playerSpot, player, false);
  updateTotals();
  setButtons(currentButtonState);

  if (state.statusVisible && state.statusMessage) {
    showStatus(state.statusMessage, statusDuration, false);
  } else {
    clearStatus();
  }

  suppressSync = false;
}

function resetLocalGame() {
  shoe = buildShoe(6);
  player = [];
  dealer = [];
  bank = 1000;
  dealerHoleHidden = false;
  bankDisplay.textContent = bank;
  clearSpots();
  clearStatus();
  setButtons('deal');
}

function setLobbyStatus(message) {
  lobbyStatus.textContent = message || '';
}

function showOverlay(message) {
  if (message) setLobbyStatus(message);
  lobbyOverlay.classList.remove('is-hidden');
  lobbyOverlay.setAttribute('aria-hidden', 'false');
}

function hideOverlay() {
  lobbyOverlay.classList.add('is-hidden');
  lobbyOverlay.setAttribute('aria-hidden', 'true');
  setLobbyStatus('');
}

function resetLobbyPanels() {
  hostPanel.classList.add('hidden');
  joinForm.classList.add('hidden');
  joinToggle.setAttribute('aria-expanded', 'false');
  hostBtn.disabled = false;
  hostBtn.textContent = 'Host';
  joinToggle.disabled = false;
  joinSubmit.disabled = false;
  joinCodeInput.value = '';
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function cleanupListeners() {
  if (remoteStateUnsub) {
    remoteStateUnsub();
    remoteStateUnsub = null;
  }
  if (remoteMetaUnsub) {
    remoteMetaUnsub();
    remoteMetaUnsub = null;
  }
}

async function cleanupRemote(removeHostedGame = isHost) {
  const refToClean = remoteGameRef;
  cleanupListeners();
  if (hostDisconnect) {
    try { await hostDisconnect.cancel(); } catch (err) {}
    hostDisconnect = null;
  }
  if (joinDisconnect) {
    try { await joinDisconnect.cancel(); } catch (err) {}
    joinDisconnect = null;
  }
  remoteGameRef = null;
  gameCode = null;
  if (refToClean) {
    try {
      if (removeHostedGame) {
        await remove(refToClean);
      } else {
        await update(refToClean, { joinConnected: false });
      }
    } catch (err) {}
  }
}

function scheduleCleanup(removeHostedGame) {
  cleanupRemote(removeHostedGame).catch(() => {});
}

function deal() {
  clearSpots();
  if (shoe.length < 40) {
    shoe = buildShoe(6);
    showStatus('Shuffling…', 800);
  }
  player = [];
  dealer = [];
  drawCard(dealer, dealerSpot, false);
  dealerHoleHidden = true;
  drawCard(dealer, dealerSpot, true);
  drawCard(player, playerSpot, false);
  drawCard(player, playerSpot, false);
  updateTotals();
  setButtons('player');
  broadcastState();

  if (handValue(player) === 21) {
    setButtons('lock');
    setTimeout(() => {
      flipDealerHole();
      updateTotals();
      const dv = handValue(dealer);
      if (dv === 21) {
        showStatus('Push — both Blackjack');
      } else {
        bank += 150;
        bankDisplay.textContent = bank;
        showStatus('Blackjack! +150');
      }
      setButtons('deal');
      broadcastState();
    }, 550);
  }
}

function playerHit() {
  drawCard(player, playerSpot, false);
  updateTotals();
  broadcastState();
  const pv = handValue(player);
  if (pv > 21) {
    setButtons('lock');
    setTimeout(() => {
      flipDealerHole();
      updateTotals();
      bank -= 100;
      bankDisplay.textContent = bank;
      showStatus('Bust!');
      setButtons('deal');
      broadcastState();
    }, 450);
  }
}

function playerStand() {
  setButtons('lock');
  flipDealerHole();
  updateTotals();
  broadcastState();

  const drawDealer = () => {
    const dv = handValue(dealer);
    const soft17 = dv === 17 && dealer.some(c => c.rank === 'A') && handValue(dealer) === 17;
    if (dv < 17 || soft17) {
      setTimeout(() => {
        drawCard(dealer, dealerSpot, false);
        updateTotals();
        broadcastState();
        drawDealer();
      }, 420);
    } else {
      resolve();
    }
  };
  drawDealer();
}

function resolve() {
  const pv = handValue(player);
  const dv = handValue(dealer);
  let msg = '';
  if (dv > 21) {
    bank += 100;
    msg = 'Dealer busts — You win +100';
  } else if (pv > dv) {
    bank += 100;
    msg = 'You win +100';
  } else if (pv < dv) {
    bank -= 100;
    msg = 'You lose -100';
  } else {
    msg = 'Push';
  }
  bankDisplay.textContent = bank;
  showStatus(msg);
  setButtons('deal');
  broadcastState();
}

singleplayerBtn.addEventListener('click', async () => {
  const wasHost = isHost;
  await cleanupRemote(wasHost);
  isHost = false;
  mode = 'singleplayer';
  resetLobbyPanels();
  hideOverlay();
  resetLocalGame();
});

joinToggle.addEventListener('click', () => {
  const showing = !joinForm.classList.contains('hidden');
  if (showing) {
    joinForm.classList.add('hidden');
    joinToggle.setAttribute('aria-expanded', 'false');
  } else {
    joinForm.classList.remove('hidden');
    joinToggle.setAttribute('aria-expanded', 'true');
    hostPanel.classList.add('hidden');
    joinCodeInput.focus();
  }
});

async function startHosting() {
  hostBtn.disabled = true;
  hostBtn.textContent = 'Hosting…';
  joinToggle.disabled = true;
  joinSubmit.disabled = true;
  joinForm.classList.add('hidden');
  joinToggle.setAttribute('aria-expanded', 'false');
  setLobbyStatus('Creating lobby…');

  const wasHost = isHost;
  await cleanupRemote(wasHost);
  isHost = true;
  mode = 'host';

  gameCode = generateCode();
  hostCodeEl.textContent = gameCode;
  hostPanel.classList.remove('hidden');
  resetLocalGame();

  remoteGameRef = ref(db, `blackjack/${gameCode}`);
  try {
    await set(remoteGameRef, {
      createdAt: serverTimestamp(),
      hostConnected: true,
      joinConnected: false,
      state: null
    });
    hostDisconnect = onDisconnect(remoteGameRef);
    await hostDisconnect.remove();
    setLobbyStatus('Share this code with a friend to start playing.');
    joinToggle.disabled = false;
    joinSubmit.disabled = false;

    cleanupListeners();
    remoteMetaUnsub = onValue(remoteGameRef, snapshot => {
      const data = snapshot.val();
      if (!data) {
        return;
      }
      if (data.joinConnected) {
        if (!lobbyOverlay.classList.contains('is-hidden')) {
          resetLocalGame();
          hideOverlay();
          broadcastState();
        }
      } else {
        if (lobbyOverlay.classList.contains('is-hidden')) {
          showOverlay('Friend disconnected. Waiting for another player.');
          hostPanel.classList.remove('hidden');
          hostCodeEl.textContent = gameCode;
          resetLocalGame();
          broadcastState();
        } else {
          setLobbyStatus('Share this code with a friend to start playing.');
        }
      }
    });
  } catch (err) {
    console.error(err);
    setLobbyStatus('Unable to create lobby. Please try again.');
    hostPanel.classList.add('hidden');
    await cleanupRemote(true);
    isHost = false;
    mode = 'lobby';
  } finally {
    hostBtn.disabled = false;
    hostBtn.textContent = 'Host';
    joinToggle.disabled = false;
    joinSubmit.disabled = false;
  }
}

hostBtn.addEventListener('click', () => {
  startHosting();
});

joinForm.addEventListener('submit', event => {
  event.preventDefault();
  joinGame(joinCodeInput.value);
});

joinCodeInput.addEventListener('input', event => {
  event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
});

async function joinGame(code) {
  const trimmed = (code || '').trim().toUpperCase();
  if (trimmed.length < 4) {
    setLobbyStatus('Enter a valid 4–6 character code.');
    return;
  }

  joinSubmit.disabled = true;
  joinToggle.disabled = true;
  hostBtn.disabled = true;
  setLobbyStatus('Searching for lobby…');

  const wasHost = isHost;
  await cleanupRemote(wasHost);
  isHost = false;

  const pathRef = ref(db, `blackjack/${trimmed}`);
  try {
    const snapshot = await get(pathRef);
    if (!snapshot.exists()) {
      setLobbyStatus('No lobby found with that code.');
      return;
    }
    const data = snapshot.val();
    if (!data.hostConnected) {
      setLobbyStatus("That lobby isn't ready yet.");
      return;
    }

    gameCode = trimmed;
    remoteGameRef = pathRef;
    mode = 'joiner';

    const joinStatusRef = ref(db, `blackjack/${trimmed}/joinConnected`);
    joinDisconnect = onDisconnect(joinStatusRef);
    await joinDisconnect.set(false);
    await update(pathRef, { joinConnected: true });

    setLobbyStatus('Connected! Waiting for the host…');
    resetLobbyPanels();
    hideOverlay();
    clearSpots();
    clearStatus();
    setButtons('deal');

    cleanupListeners();
    remoteStateUnsub = onValue(ref(db, `blackjack/${trimmed}/state`), snap => {
      const state = snap.val();
      if (state) {
        applyRemoteState(state);
      }
    });
    remoteMetaUnsub = onValue(pathRef, snap => {
      const meta = snap.val();
      if (!meta) {
        cleanupRemote(false).then(() => {
          resetLobbyPanels();
          showOverlay('The host closed the lobby.');
          mode = 'lobby';
        });
        return;
      }
      if (!meta.hostConnected && mode === 'joiner') {
        cleanupRemote(false).then(() => {
          resetLobbyPanels();
          showOverlay('The host left the lobby.');
          mode = 'lobby';
        });
      }
    });
  } catch (err) {
    console.error(err);
    setLobbyStatus('Could not join the lobby. Try again.');
    await cleanupRemote(false);
    mode = 'lobby';
    showOverlay();
  } finally {
    joinSubmit.disabled = false;
    joinToggle.disabled = false;
    hostBtn.disabled = false;
  }
}

btnDeal.addEventListener('click', () => {
  if (mode === 'joiner' || btnDeal.classList.contains('muted')) return;
  deal();
});

btnHit.addEventListener('click', () => {
  if (mode === 'joiner' || btnHit.classList.contains('muted')) return;
  playerHit();
});

btnStand.addEventListener('click', () => {
  if (mode === 'joiner' || btnStand.classList.contains('muted')) return;
  playerStand();
});

btnNew.addEventListener('click', () => {
  if (mode === 'joiner') return;
  shoe = buildShoe(6);
  showStatus('New shoe ready', 700);
  if (isHost) broadcastState();
});

window.addEventListener('beforeunload', () => scheduleCleanup(isHost));
window.addEventListener('pagehide', () => scheduleCleanup(isHost));
