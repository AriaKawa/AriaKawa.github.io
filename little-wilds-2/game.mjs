import { makeWorld, ZONES, CN, CW, CH, CELL, landAt, FINALE, hash } from './world.mjs';
import { newLand, tick, touch, travel, catchUp, encode, decode, buySpirit, buyUpgrade, spiritCost, spiritOpen, upgradeCost, upgradeOpen, zonePct, zoneBloom, valleyPct, valleyComplete, initObjects, SPIRITS, UPGRADES, GREEN } from './sim.mjs';
import { createLand } from './land.mjs';
import { createRenderer } from './render.mjs';
import { createAudio } from './audio.mjs';

const KEY = 'little-wilds-2-v2', CARDS_KEY = 'little-wilds-2-postcards', SOUND_KEY = 'little-wilds-2-muted', VOLUME_KEY = 'little-wilds-2-volume';
const $ = id => document.getElementById(id);
const fmt = n => n >= 1e9 ? (n / 1e9).toFixed(2) + 'b' : n >= 1e6 ? (n / 1e6).toFixed(2) + 'm' : n >= 1e4 ? (n / 1e3).toFixed(1) + 'k' : Math.floor(n).toLocaleString();
const load = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
const nextFrame = () => new Promise(r => setTimeout(r, 30));

const audio = createAudio();
let images, world, land, view, s;
let ready = false, modal = '', lastUI = 0, lastSave = 0, last = performance.now(), toastTimer, bannerTimer, lastActive = performance.now(), frameNo = 0, slowFrames = 0;
const SPIRIT_SLICES = 6;
let thenX = null, timelapse = null, currentZone = 0, seedShown = 0, wasHidden = 0;
const pointer = { x: 0, y: 0, on: false, holding: false, id: null, kb: false };
let glideTo = -1, glideAt = 0, gliding = 0, quarters = [], rateAt = 0, rateSeeds = 0, rate = 0, pulseTimer;
function pulseSeeds() { $('seeds').parentElement.classList.add('pulse'); clearTimeout(pulseTimer); pulseTimer = setTimeout(() => $('seeds').parentElement.classList.remove('pulse'), 170); }
let carry = null, panning = false; const pointers = new Map(); let pinch = 0;

function toast(text) { $('toast').textContent = text; $('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('show'), 3200); }
function banner(title, sub = '', ms = 5200) { $('banner-title').textContent = title; $('banner-sub').textContent = sub; $('banner').classList.add('show'); clearTimeout(bannerTimer); bannerTimer = setTimeout(() => $('banner').classList.remove('show'), ms); }
function save() { if (!s) return; try { localStorage.setItem(KEY, encode(s)); } catch { toast('Saving is unavailable in this browser.'); } }

async function buildLand(index) {
  world = makeWorld(1 + index * 17);
  land = createLand(world, index);
  world.dirty = i => { land.markCell(i); view?.floraCell(i); };
  world.waterMoved = z => land.markWater(z);
}
function attach() {
  initObjects(s, world);
  land.setSource(s.h, s.zones); land.flushAll();
  view = createRenderer($('world'), world, land, images);
  view.onPet = (label, zone) => toast(`${label} has come back to ${ZONES[zone].name}.`);
  buildDock();
  currentZone = firstOpen(); view.focusZone(currentZone, true);
}
const firstOpen = () => { const i = s.zones.findIndex(z => z.open && !z.done); return i < 0 ? FINALE : i; };

function buildDock() {
  $('dock').innerHTML = SPIRITS.map((d, i) => `<button class="card" id="card-${i}" data-spirit="${i}" title="${d.job}"><span class="count" id="count-${i}"></span><span class="face" style="background-position:0 ${i * 100 / 7}%"></span><b>${d.name}</b><small id="cost-${i}"></small></button>`).join('') + `<button class="card tend" id="tend" title="Upgrades"><span class="tend-icon">✿</span><b>Tend</b><small id="tend-note"></small></button>`;
}
$('hud').addEventListener('click', e => {
  const b = e.target.closest('[data-spirit]'); if (!b) return;
  audio.start(); wake();
  const t = +b.dataset.spirit;
  if (!spiritOpen(s, t)) { toast(`${SPIRITS[t].name} comes when ${SPIRITS[t].need} glade${SPIRITS[t].need > 1 ? 's are' : ' is'} restored.`); return; }
  if (buySpirit(s, t)) { audio.buy(); save(); updateUI(); const a = s.spirits[s.spirits.length - 1], home = view.toCell(innerWidth / 2, innerHeight / 2), cell = Math.round(Math.max(0, Math.min(CH - 1, home.y))) * CW + Math.round(Math.max(0, Math.min(CW - 1, home.x))); if (s.zones[world.zone[cell]].open) { a.x = home.x; a.y = home.y; } view.pop(a.x, a.y); toast(`${SPIRITS[t].name}: ${SPIRITS[t].job}`); }
  else if (s.spirits.length >= 40) toast('The valley has all the spirits it can hold.');
});
function nextGoal() {
  const costs = UPGRADES.filter(u => upgradeOpen(s, u) && (s.upgrades[u.id] || 0) < u.max).map(u => upgradeCost(s, u));
  return costs.length ? Math.min(...costs) : Infinity;
}
function updateUI() {
  if (!s) return;
  SPIRITS.forEach((d, i) => {
    const open = spiritOpen(s, i), cost = spiritCost(s, i), can = open && s.seeds >= cost && s.spirits.length < 40, c = $('card-' + i); if (!c) return;
    c.classList.toggle('locked', !open); c.classList.toggle('can', can);
    $('count-' + i).textContent = s.spirits.filter(a => a.type === i).length || '';
    $('cost-' + i).textContent = open ? fmt(cost) : `after ${d.need} glade${d.need > 1 ? 's' : ''}`;
  });
  const goal = nextGoal(), t = $('tend'); if (t) { t.classList.toggle('can', s.seeds >= goal); $('tend-note').textContent = goal === Infinity ? 'all done' : fmt(goal); }
  // The chip follows whichever glade the player is looking at.
  const look = view.toCell(innerWidth / 2, innerHeight / 2), cx = Math.max(0, Math.min(CW - 1, Math.round(look.x))), cy = Math.max(0, Math.min(CH - 1, Math.round(look.y)));
  currentZone = world.zone[cy * CW + cx];
  const z = s.zones[currentZone], pct = zonePct(s, world, currentZone), bl = zoneBloom(s, world, currentZone);
  $('zone-name').textContent = ZONES[currentZone].name;
  $('zone-bar').style.width = pct * 100 + '%'; $('bloom-bar').style.width = (z.done ? bl * 100 : 0) + '%';
  $('zone-note').textContent = !z.open ? 'Still asleep' : z.bloomed ? 'Flourishing ✿' : z.done ? `Flowers ${Math.round(bl / .85 * 100)}%` : `${Math.floor(pct * 100)}% restored`;
  if (modal === 'tend') refreshTend(); if (modal === 'valley') openValley();
}
function renderHint() {
  const h = $('hint');
  let text = '';
  if (!s.touched) text = 'Hold and drag across the dead ground';
  else if (!s.revivedAny && s.age > 10 && !s.zones[0].done) text = 'Hold on a dead tree or stone to bring it back';
  else if (s.spirits.length === 1 && s.seeds >= spiritCost(s, 0)) text = 'Those seeds can wake another Mossling';
  h.hidden = !text; if (text) h.textContent = text;
}

/* Upgrades */
function tendHTML() {
  return `<h2>Tend the land</h2><p class="sub">Every upgrade changes what you see.</p>` + UPGRADES.map(u => {
    const l = s.upgrades[u.id] || 0, open = upgradeOpen(s, u), cost = upgradeCost(s, u), max = l >= u.max;
    return `<div class="up"><strong>${u.name}${u.max > 1 ? `<em>${l} / ${u.max}</em>` : ''}</strong><span>${open ? u.desc : 'Comes after your first restored glade.'}</span><button data-up="${u.id}" ${max || !open || s.seeds < cost ? 'disabled' : ''}>${max ? 'Done' : fmt(cost)}</button></div>`;
  }).join('');
}
function refreshTend() { for (const b of document.querySelectorAll('[data-up]')) { const u = UPGRADES.find(q => q.id === b.dataset.up), l = s.upgrades[u.id] || 0; b.disabled = l >= u.max || !upgradeOpen(s, u) || s.seeds < upgradeCost(s, u); } }
function show(type, html) { releaseAll(); modal = type; $('modal-body').innerHTML = html; if (!$('modal').open) $('modal').showModal(); }
$('close').onclick = () => $('modal').close();
$('modal').addEventListener('close', () => { modal = ''; wake(); });
$('modal').addEventListener('click', e => { if (e.target === $('modal')) { const r = $('modal').getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) $('modal').close(); } });
$('hud').addEventListener('click', e => { if (e.target.closest('#tend')) { audio.start(); show('tend', tendHTML()); } });
$('modal-body').addEventListener('click', e => {
  const up = e.target.closest('[data-up]');
  if (up && buyUpgrade(s, up.dataset.up)) { audio.buy(); save(); show('tend', tendHTML()); return; }
  const f = e.target.closest('[data-focus]');
  if (f) { view.focusZone(+f.dataset.focus); $('modal').close(); return; }
  const a = e.target.closest('[data-act]'); if (!a) return;
  ({ all() { view.focusAll(); $('modal').close(); }, travel: goOn, exportSave, importSave, reset: resetSave, cards: openCards, valley: openValley })[a.dataset.act]?.();
});

/* Valley map */
function openValley() {
  const cells = [...ZONES].sort((a, b) => a.row - b.row || a.col - b.col).map(z => { const st = s.zones[z.id], pct = zonePct(s, world, z.id); return `<button class="vz ${st.open ? '' : 'locked'} ${st.done ? 'done' : ''} ${st.bloomed ? 'bloomed' : ''}" data-focus="${z.id}"><b>${z.name}</b><small>${!st.open ? 'asleep' : st.bloomed ? 'flourishing ✿' : st.done ? 'restored' : Math.floor(pct * 100) + '%'}</small></button>`; }).join('');
  const html = `<h2>${landAt(s.land).name}</h2><p class="sub">${(valleyPct(s, world) * 100).toFixed(1)}% restored. Choose a glade to visit.</p><div class="valley">${cells}</div><div class="row"><button class="wood" data-act="all">See the whole valley</button>${valleyComplete(s) ? '<button class="wood" data-act="travel">Travel on</button>' : ''}</div>`;
  if (modal === 'valley' && $('modal-body').firstChild) { const scroll = $('modal').scrollTop; $('modal-body').innerHTML = html; $('modal').scrollTop = scroll; } else show('valley', html);
}
$('zonechip').onclick = () => { audio.start(); openValley(); };

/* Menu */
function openMenu() {
  show('menu', `<h2>Little Wilds 2</h2><p class="sub">Bring a dead valley back to life, one patch at a time.</p>
  <label class="volume">Volume <input id="volume" type="range" min="0" max="100" value="${Math.round(audio.volume * 100)}"></label><div class="row"><button class="wood" data-act="cards">Postcards</button><button class="wood" data-act="exportSave">Export save</button><button class="wood" data-act="importSave">Import save</button><button class="wood" data-act="reset">Start over</button></div>
  <p class="sub" style="margin-top:14px">Hold and drag: heal the land.<br>Drag a spirit: carry it somewhere.<br>Click a deer or rabbit: give it a pat.<br>Right-drag, two fingers or arrow keys: look around.<br>Wheel or pinch: zoom. H: hide the interface.</p><input type="file" id="file" accept=".json,application/json" hidden>`);
}
$('btn-menu').onclick = () => { audio.start(); openMenu(); $('volume').oninput = e => { audio.setVolume(e.target.value / 100); try { localStorage.setItem(VOLUME_KEY, audio.volume); } catch {} }; };
function exportSave() { save(); const a = document.createElement('a'), u = URL.createObjectURL(new Blob([encode(s)], { type: 'application/json' })); a.href = u; a.download = 'little-wilds-2-save.json'; a.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); }
function importSave() {
  const f = $('file'); f.onchange = async () => { try { const file = f.files[0]; if (!file || file.size > 2e6) throw 0; const text = await file.text(), o = JSON.parse(text); if (!confirm('Replace your current valley?')) return; await buildLand(o.land || 0); s = decode(text, world); attach(); save(); $('modal').close(); } catch { toast('That is not a Little Wilds 2 save.'); } }; f.click();
}
async function resetSave() { if (!confirm('Start again from barren ground? This erases your progress.')) return; s = newLand(0); await buildLand(0); attach(); try { localStorage.removeItem(CARDS_KEY); } catch {} save(); $('modal').close(); }
const readCards = () => { try { return JSON.parse(localStorage.getItem(CARDS_KEY) || '[]'); } catch { return []; } };
function openCards() { const list = readCards(); show('cards', `<h2>Postcards</h2><p class="sub">The lands you have brought back.</p>` + (list.length ? `<div class="cards">${list.map(c => `<figure><img src="${c.now}" alt="${c.name} restored"><figcaption>${c.name}</figcaption></figure>`).join('')}</div>` : '<p>Finish a whole valley to keep its postcard here.</p>')); }
function celebrate() {
  const then = view.snapshot(true), now = view.snapshot(false), name = landAt(s.land).name;
  const list = readCards(); if (!list.some(c => c.land === s.land)) { list.push({ land: s.land, name, now }); try { localStorage.setItem(CARDS_KEY, JSON.stringify(list.slice(-6))); } catch {} }
  show('postcard', `<h2>${name} lives again</h2><p class="sub">Drag to compare. Stay as long as you like, or travel on to the next land.</p><div class="compare" id="cmp"><img src="${then}" alt="The valley when you arrived"><img class="now" src="${now}" alt="The valley now"><input type="range" min="0" max="100" value="50" aria-label="Compare then and now"></div><div class="row"><button class="wood" data-act="travel">Travel on</button></div>`);
  $('cmp').querySelector('input').oninput = e => $('cmp').style.setProperty('--cut', e.target.value + '%');
}
async function goOn() {
  const next = travel(s); $('modal').close();
  $('loading').style.display = ''; document.body.appendChild($('loading')); await nextFrame();
  s = next; await buildLand(s.land); attach(); save(); $('loading').style.display = 'none';
  banner(landAt(s.land).name, 'Another land is waiting.');
}

/* Then and now, sound */
$('btn-then').onclick = () => { $('banner').classList.remove('show'); thenX = thenX == null ? innerWidth / 2 : null; $('btn-then').setAttribute('aria-pressed', thenX != null); if (thenX != null) toast('Drag across the land to compare. Press again to finish.'); };
const syncSound = () => { $('btn-sound').textContent = audio.muted ? 'Muted' : 'Sound'; $('btn-sound').setAttribute('aria-pressed', audio.muted); };
$('btn-sound').onclick = () => { audio.start(); audio.setMuted(!audio.muted); try { localStorage.setItem(SOUND_KEY, audio.muted ? '1' : ''); } catch {} syncSound(); };
try { if (localStorage.getItem(SOUND_KEY)) audio.setMuted(true); const v = parseFloat(localStorage.getItem(VOLUME_KEY)); if (v >= 0 && v <= 1) audio.setVolume(v); } catch {} syncSound();

/* Input */
const canvas = $('world');
function wake() { lastActive = performance.now(); document.body.classList.remove('quiet'); }
function releaseAll() { pointer.holding = false; pointer.kb = false; if (carry) { carry.held = false; carry = null; } panning = false; }
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointerdown', e => {
  if (!ready || $('modal').open) return;
  audio.start(); wake(); canvas.focus({ preventScroll: true }); canvas.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
  if (thenX != null) { thenX = e.clientX; pointer.id = e.pointerId; return; }
  if (pointers.size > 1 || e.button !== 0) { pointer.holding = false; if (carry) { carry.held = false; carry = null; } panning = true; pinch = 0; return; }
  const petted = view.hitPet(e.clientX, e.clientY);
  if (petted) { view.pet(petted); audio.buy(); const gift = 10 + s.seeds * .002; s.seeds += gift; view.reward(petted.x, petted.y - 12, gift, 3); pulseSeeds(); return; }
  const hit = view.hitSpirit(s, e.clientX, e.clientY);
  pointer.id = e.pointerId;
  if (hit) { carry = hit; hit.held = true; hit.tx = -1; hit.px = e.clientX; hit.py = e.clientY; return; }
  pointer.holding = true;
});
canvas.addEventListener('pointermove', e => {
  wake();
  const prev = pointers.get(e.pointerId); pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = e.pointerType !== 'touch' || !!prev;
  if (!prev) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (thenX != null) { thenX = Math.max(0, Math.min(innerWidth, e.clientX)); return; }
  if (carry) { carry.px = e.clientX; carry.py = e.clientY; return; }
  if (panning) {
    if (pointers.size === 2) { const [a, b] = [...pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) view.zoomAt(d / pinch, (a.x + b.x) / 2, (a.y + b.y) / 2); pinch = d; view.pan((e.clientX - prev.x) / 2, (e.clientY - prev.y) / 2); }
    else view.pan(e.clientX - prev.x, e.clientY - prev.y);
  }
});
function endPointer(e) {
  if (!pointers.has(e.pointerId)) return;
  pointers.delete(e.pointerId);
  if (carry && e.pointerId === pointer.id) { const c = view.toCell(e.clientX, e.clientY), i = Math.round(Math.max(0, Math.min(CH - 1, c.y + .6))) * CW + Math.round(Math.max(0, Math.min(CW - 1, c.x))); if (s.zones[world.zone[i]].open) { carry.x = i % CW; carry.y = Math.floor(i / CW); } else toast('That land is still asleep.'); carry.held = false; carry.tx = -1; carry = null; save(); }
  if (e.pointerId === pointer.id) { pointer.holding = false; pointer.id = null; }
  if (!pointers.size) { panning = false; pinch = 0; if (e.pointerType === 'touch') pointer.on = false; }
}
canvas.addEventListener('pointerup', endPointer); canvas.addEventListener('pointercancel', endPointer);
canvas.addEventListener('pointerleave', () => { if (!pointers.size) pointer.on = false; });
canvas.addEventListener('wheel', e => { e.preventDefault(); wake(); view.zoomAt(Math.exp(-e.deltaY * .0013), e.clientX, e.clientY); }, { passive: false });
addEventListener('keydown', e => {
  if (!ready || $('modal').open) return;
  wake();
  const moves = { ArrowLeft: [90, 0], ArrowRight: [-90, 0], ArrowUp: [0, 90], ArrowDown: [0, -90], KeyA: [90, 0], KeyD: [-90, 0], KeyW: [0, 90], KeyS: [0, -90] };
  if (moves[e.code]) { e.preventDefault(); view.pan(...moves[e.code]); }
  if (e.code === 'Space' && !e.repeat) { e.preventDefault(); audio.start(); pointer.holding = true; pointer.kb = true; if (!pointer.on) { pointer.x = innerWidth / 2; pointer.y = innerHeight / 2; pointer.on = true; } }
  if (e.key === '+' || e.key === '=') view.zoomAt(1.2); if (e.key === '-') view.zoomAt(1 / 1.2);
  if (e.code === 'KeyH') { document.body.classList.toggle('quiet'); lastActive = -1e9; }
});
addEventListener('keyup', e => { if (e.code === 'Space' && pointer.kb) { pointer.holding = false; pointer.kb = false; } });
addEventListener('blur', () => { pointers.clear(); releaseAll(); });

/* Events from the simulation: the game's big moments. */
function handle(ev, now, quiet = false) {
  for (const e of ev) {
    if (e.t === 'revive' && !quiet) { view.revived(e.o, now); audio.pop(); view.reward(e.o.x * CELL, e.o.y * CELL - e.o.size * .7, e.reward, e.o.size > 40 ? 10 : 5); pulseSeeds(); s.revivedAny = true; }
    if (e.t === 'water' && !quiet) { audio.water(); toast(`Water finds its way to ${ZONES[e.zone].name}.`); }
    if (e.t === 'zone') {
      land.markAll();
      if (quiet) continue;
      audio.chime(e.final); view.sweep(e.zone); view.glow(e.zone); glideTo = e.opened[0] ?? -1; glideAt = now + 6000;
      const names = e.opened.map(n => ZONES[n].name);
      banner(`${ZONES[e.zone].name} restored`, names.length ? `The mist lifts from ${names.join(' and ')}.` : 'Life is coming back.');
      const justOpened = SPIRITS.find(d => d.need === s.zones.filter(z => z.done).length);
      if (justOpened) setTimeout(() => toast(`A new spirit has come: ${justOpened.name}.`), 5400);
    }
    if (e.t === 'bloom' && !quiet) { audio.chime(); view.sweep(e.zone, '#ffc6dd'); view.glow(e.zone, '255,190,220'); banner(`${ZONES[e.zone].name} is flourishing`, 'A spirit fawn has come to graze.'); }
    if (e.t === 'valley' && !quiet) setTimeout(celebrate, 7000);
  }
}
function returnFrom(seconds) {
  if (s.paused || seconds < 20) return;
  const pre = s.h.slice(), r = catchUp(s, world, seconds); if (!r.seconds) return;
  handle(r.ev, performance.now(), true);
  let moved = 0; for (let i = 0; i < CN; i += 7) moved += Math.abs(s.h[i] - pre[i]);
  if (moved > 2) { // Play back what grew while the player was gone.
    timelapse = { pre, field: pre.slice(), start: performance.now(), dur: 5200, row: 0 };
    land.setField(timelapse.field); view.setShown(timelapse.field); land.markAll();
  }
  const mins = Math.round(r.seconds / 60);
  banner('While you were away', `${mins < 90 ? mins + ' minutes' : (mins / 60).toFixed(1) + ' hours'} of quiet growth · ${fmt(r.seeds)} seeds`, 5600);
}
function stepTimelapse(now) {
  const t = timelapse, k = Math.min(1, (now - t.start) / t.dur), f = t.field, target = s.h, ROWS = CH;
  for (let i = 0; i < CN; i += 1) { const delay = hash(i % CW >> 2, Math.floor(i / CW) >> 2, 5) * .18 + (Math.floor(i / CW) / ROWS) * .22, q = Math.max(0, Math.min(1, (k - delay) / .55)), e = q * q * (3 - 2 * q), next = t.pre[i] + (target[i] - t.pre[i]) * e; if (Math.abs(next - f[i]) > .004 || (k >= 1 && f[i] !== target[i])) { f[i] = next; land.markCell(i); } }
  if (k >= 1) { timelapse = null; land.setField(s.h); view.setShown(null); land.markAll(); }
}

/* Main loop */
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(.05, Math.max(0, (now - last) / 1000)); last = now;
  if (!ready || document.hidden) return;
  if (!$('modal').open && !timelapse) {
    const ev = [];
    if (pointer.holding && !s.paused && thenX == null) {
      const c = view.toCell(pointer.x, pointer.y), gain = touch(s, world, c.x, c.y, dt, ev);
      if (gain > 0) { view.spark(c.x, c.y, gain * 7, 3); audio.pluck(gain * 25); wake(); }
    }
    tick(s, world, dt, ev, frameNo++ % SPIRIT_SLICES, SPIRIT_SLICES);
    if (ev.length) handle(ev, now);
  } else if (timelapse) stepTimelapse(now);
  land.flush(timelapse ? 6 : 3);
  // Step quality down if this machine is struggling, rather than stuttering.
  slowFrames = Math.max(0, slowFrames + (dt > .032 ? 1 : -.25)); if (slowFrames > 90 && view.quality > 0) { view.setQuality(view.quality - 1); slowFrames = 0; }
  seedShown += (s.seeds - seedShown) * Math.min(1, dt * 9); if (Math.abs(s.seeds - seedShown) < 1) seedShown = s.seeds;
  $('seeds').textContent = fmt(seedShown);
  if (glideTo >= 0 && now > glideAt) { if (!pointer.holding && !pointers.size && !$('modal').open) { view.focusZone(glideTo); gliding = now + 5000; } glideTo = -1; }
  s.zones.forEach((z, i) => { const q = z.open && !z.done ? Math.floor(zonePct(s, world, i) * 4) : 0; if (quarters[i] !== undefined && q > quarters[i] && i === currentZone) { audio.water(); const c = $('zonechip'); c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse'); view.glow(i, '200,255,170'); } quarters[i] = q; });
  if (now - rateAt > 1000) { const d = s.seeds - rateSeeds; if (d >= 0) rate += (d / ((now - rateAt) / 1000) - rate) * .35; rateSeeds = s.seeds; rateAt = now; $('rate').textContent = rate >= 1 ? '+' + fmt(rate) + '/s' : ''; }
  view.draw(s, now, dt, { carry, pointer: pointer.on && !carry ? pointer : null, holding: pointer.holding, then: thenX, camSpeed: now < gliding ? .9 : 3.2 });
  if (now - lastUI > 200) { lastUI = now; updateUI(); renderHint(); audio.update(valleyPct(s, world), s.zones.some(z => z.water > 0)); if (Math.abs(s.seeds - seedShown) > 0) { seedShown = s.seeds; } if (!pointers.size && !$('modal').open && thenX == null && now - lastActive > 14000) document.body.classList.add('quiet'); }
  if (now - lastSave > 6000) { lastSave = now; save(); }
}
document.addEventListener('visibilitychange', () => {
  releaseAll();
  if (document.hidden) { wasHidden = Date.now(); save(); }
  else { if (wasHidden && ready) returnFrom((Date.now() - wasHidden) / 1000); wasHidden = 0; last = performance.now(); wake(); }
});
addEventListener('pagehide', save);

async function main() {
  try {
    await nextFrame();
    const [worldImg, spirits, landmarks, pets] = await Promise.all([load('assets/world.png'), load('assets/spirits.png'), load('assets/landmarks.png'), load('assets/pets.png')]);
    images = { world: worldImg, spirits, landmarks, pets };
    let raw = null, landIndex = 0;
    try { raw = localStorage.getItem(KEY); if (raw) landIndex = JSON.parse(raw).land || 0; } catch { raw = null; }
    await buildLand(landIndex);
    try { s = raw ? decode(raw, world) : newLand(0); } catch { s = newLand(0); toast('That save could not be read, so the valley starts fresh.'); }
    const away = (Date.now() - (s.last || Date.now())) / 1000;
    attach();
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) window.__lw = { get s() { return s; }, get w() { return world; }, get v() { return view; }, tick: (n, dt = .5) => { const ev = []; for (let k = 0; k < n; k++) tick(s, world, dt, ev); handle(ev, performance.now()); land.markAll(); view.allFlora(); updateUI(); return ev.length; }, grant: n => { s.seeds += n; updateUI(); } };
    ready = true; $('loading').style.display = 'none'; updateUI();
    if (raw) returnFrom(away); else banner('Little Wilds', 'Nothing has grown here in a long time.', 4500);
    requestAnimationFrame(frame);
  } catch (e) { console.error(e); $('loading').querySelector('span').textContent = 'The artwork could not load. Refresh to try again.'; }
}
main();
