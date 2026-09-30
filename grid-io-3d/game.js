import { steeringAxis, steeringTarget, relativeTurn } from "./chase.mjs?v=pixel-freedom-1";
import {
  Arena,
  COLORS,
  SKINS,
  HALF,
  WORLD_SIZE,
  LANDMARKS,
  JUMP_COOLDOWN,
  jumpHeight,
  riderHeight,
  normalizeSpeed,
} from "./simulation.mjs?v=pixel-freedom-1";
import { GridRenderer } from "./renderer.js?v=pixel-freedom-1";
import { BikeGarage } from "./garage.js?v=pixel-freedom-1";
import { BikeEngine } from './engine-audio.js?v=pixel-freedom-1';
import { ROADS, LOOP, roadPoint, loopPoint } from './terrain.mjs?v=pixel-freedom-1';
import {
  BODIES,
  WHEELS,
  RIDERS,
  normalizeLoadout,
} from "../grid-io/customization.mjs?v=pixel-freedom-1";

const $ = (id) => document.getElementById(id);
const read = (key, fallback) => {
  try {
    return localStorage.getItem(`grid-io-3d-${key}`) ?? fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(`grid-io-3d-${key}`, String(value));
  } catch {
    /* Private browsing can disable storage; riding still works. */
  }
};
let mode = read("mode", "360") === "90" ? "90" : "360";
let speedPercent = normalizeSpeed(read("speed", "100"));
const bestKey = () => (mode === "90" ? "best-90" : "best");
let skin = Math.max(0, Math.min(5, Number(read("skin", "0")) || 0)),
  best = Number(read(bestKey(), "0")) || 0;
const turns = [];
let loadout;
try {
  loadout = normalizeLoadout(JSON.parse(read("loadout", "{}")));
} catch {
  loadout = normalizeLoadout();
}
let garagePreview = null;
let state = "menu",
  arena = null,
  graphics = null,
  lastTime = 0,
  accumulator = 0,
  uiTimer = 0,
  toastUntil = 0;
let boostPointer = null, wheeliePointer = null, touchWheelie = false;
let rearHeld = false, stickTurnArmed = true;
let keys = new Set(),
  touchBoost = false,
  joystickAngle = null;
let highQuality = read("quality", "high") === "high",
  soundOn = read("sound", "on") === "on";
let audio = null,
  lastPickupSound = 0,
  engine = null;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = matchMedia("(pointer:coarse)").matches;
$("nickname").value = read("name", "");
$("play").disabled = true;
function updateMode() {
  save("mode", mode);
  best = Number(read(bestKey(), "0")) || 0;
  for (const button of document.querySelectorAll("[data-mode]"))
    button.setAttribute("aria-pressed", button.dataset.mode === mode);
  $("steer-key").textContent = "A / D";
}
for (const button of document.querySelectorAll("[data-mode]"))
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    updateMode();
  });
updateMode();
function updateSpeed() {
  $("speed").value = speedPercent;
  $("speed-value").value = `${speedPercent}%`;
  $("speed").setAttribute("aria-valuetext", `${speedPercent}%`);
  $("speed").style.setProperty("--speed-fill", `${speedPercent / 3}%`);
  save("speed", speedPercent);
}
$("speed").addEventListener("input", () => {
  speedPercent = normalizeSpeed($("speed").value);
  updateSpeed();
});
updateSpeed();

function updateSoundButton() {
  $("sound").textContent = `Sound ${soundOn ? "on" : "off"}`;
  $("sound").setAttribute("aria-pressed", soundOn);
  $("sound-pause").textContent=`Engine & sound: ${soundOn?'on':'off'} · M`;
  $("sound-pause").setAttribute('aria-pressed',soundOn);
}
function ensureAudio() {
  if (!soundOn) return;
  try {
    if (!audio) {
      audio = new (window.AudioContext || window.webkitAudioContext)();
      engine = new BikeEngine(audio);
    }
    if (audio.state === "suspended") audio.resume();
  } catch {
    soundOn = false;
    updateSoundButton();
  }
}
function tone(freq, duration = 0.14, type = "sine", volume = 0.035, slide = 1) {
  if (!soundOn || !audio) return;
  const o = audio.createOscillator(),
    g = audio.createGain(),
    t = audio.currentTime;
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(freq * slide, t + duration);
  g.gain.setValueAtTime(volume, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  o.connect(g);
  g.connect(audio.destination);
  o.start(t);
  o.stop(t + duration);
  o.onended = () => {
    o.disconnect();
    g.disconnect();
  };
}
function soundEvent(event) {
  if (!soundOn) return;
  if (event.type === "pickup") {
    if (performance.now() - lastPickupSound > 70) {
      tone(480 + (arena.player.length % 400), 0.1, "sine", 0.025, 1.3);
      lastPickupSound = performance.now();
    }
  } else if (event.type === "jump") tone(150, 0.5, "triangle", 0.065, 4);
  else if (event.type === "elimination") {
    tone(430, 0.35, "triangle", 0.07, 2);
    setTimeout(() => tone(760, 0.35), 90);
  } else if (event.type === "death") tone(130, 0.7, "sawtooth", 0.08, 0.15);
}
updateSoundButton();
function toggleSound() {
  soundOn = !soundOn;
  save("sound", soundOn ? "on" : "off");
  ensureAudio();
  updateSoundButton();
}
$("sound").addEventListener('click',toggleSound);
$("sound-pause").addEventListener('click',toggleSound);

function updateSkin() {
  save("skin", skin);
  save("loadout", JSON.stringify(loadout));
  const body = BODIES.find((p) => p.id === loadout.body),
    wheels = WHEELS.find((p) => p.id === loadout.wheels),
    rider = RIDERS.find((p) => p.id === loadout.rider);
  $("garage-name").textContent = body.name;
  $("loadout-summary").textContent =
    `${wheels.name} wheels · ${rider.name} rider`;
  for (const button of document.querySelectorAll("[data-part]"))
    button.setAttribute(
      "aria-pressed",
      loadout[button.dataset.part] === button.dataset.choice,
    );
  garagePreview?.setLoadout(skin, loadout);
  for (const b of $("swatches").children)
    b.setAttribute("aria-pressed", Number(b.dataset.skin) === skin);
}
for (const [key, id, choices] of [
  ["body", "body-options", BODIES],
  ["wheels", "wheel-options", WHEELS],
  ["rider", "rider-options", RIDERS],
]) {
  for (const [index, choice] of choices.entries()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "part-choice";
    button.dataset.part = key;
    button.dataset.choice = choice.id;
    button.setAttribute("aria-label", choice.name);
    const icon = document.createElement("span");
    icon.className = `part-symbol ${choice.id}`;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent =
      key === "wheels"
        ? ["◉", "✳", "⬡"][index]
        : key === "body"
          ? ["⌁", "⋈", "▰"][index]
          : index
            ? "♀"
            : "♂";
    const label = document.createElement("strong");
    label.textContent = choice.name;
    button.append(icon, label);
    button.addEventListener("click", () => {
      loadout = { ...loadout, [key]: choice.id };
      updateSkin();
    });
    $(id).append(button);
  }
}
for (let i = 0; i < COLORS.length; i++) {
  const b = document.createElement("button");
  b.className = "swatch";
  b.style.setProperty("--color", COLORS[i]);
  b.dataset.skin = i;
  b.setAttribute("aria-label", SKINS[i]);
  b.addEventListener("click", () => {
    skin = i;
    updateSkin();
  });
  $("swatches").append(b);
}
updateSkin();
$("garage").addEventListener("click", () => {
  $("garage-dialog").showModal();
  garagePreview?.open();
});
$("garage-dialog").addEventListener("close", () => garagePreview?.close());
$("reset-view").addEventListener("click", () => garagePreview?.resetView());
$("help").addEventListener("click", () => $("help-dialog").showModal());
for (const d of document.querySelectorAll("dialog")) {
  for (const b of d.querySelectorAll(".close-modal,.close-action"))
    b.addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const rect = d.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        if (d.id === "pause-dialog") resume();
        else if (d.id !== "death-dialog") d.close();
      }
    }
  });
}

function clearInput() {
  releaseCamera();
  keys.clear();
  boostPointer = null;
  wheeliePointer = null; touchWheelie = false;
  stickId = null;
  rearHeld = false;
  stickTurnArmed = true;
  if (graphics) {graphics.lookBack = false;graphics.orbit.x=graphics.orbit.y=0;}
  turns.length = 0;
  touchBoost = false;
  joystickAngle = null;
  $("joystick").querySelector("i").style.transform = "";
}
function toast(text, duration = 2600) {
  $("toast").textContent = text;
  $("toast").classList.add("visible");
  toastUntil = performance.now() + duration;
}
function start() {
  if (!graphics) return;
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  const name = $("nickname").value.trim().slice(0, 18) || "Rider";
  save("name", name);
  arena = new Arena({ name, skin, loadout, mode, speedPercent });
  graphics.reset(arena);
  state = "playing";
  $("menu").hidden = true;
  $("hud").hidden = false;
  clearInput();
  accumulator = 0;
  uiTimer = 0;
  toastUntil = 0;
  $("toast").classList.remove("visible");
  ensureAudio();
  updateHUD();
  $("pointer-hint").textContent = isTouch
    ? "Steer left/right · hold Wheelie to brake and pivot"
    : mode === "90"
      ? "A / D: 90° turns · Ctrl: wheelie brake · Space: jump"
      : "A / D: steer · Hold right mouse: camera · Ctrl: wheelie · Space: jump";
  $("pointer-hint").hidden = false;
}
function pause() {
  if (state !== "playing") return;
  state = "paused";
  clearInput();
  $("pause-dialog").showModal();
}
function resume() {
  if (state !== "paused") return;
  $("pause-dialog").close();
  clearInput();
  state = "playing";
  accumulator = 0;
}
function menu() {
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  if (arena) {
    best = Math.max(best, Math.floor(arena.player.peak));
    save(bestKey(), best);
  }
  state = "menu";
  clearInput();
  $("menu").hidden = false;
  $("hud").hidden = true;
  garagePreview?.resize();
}
function end(event) {
  best = Math.max(best, Math.floor(arena.player.peak));
  save(bestKey(), best);
  state = "dead";
  clearInput();
  $("result-length").textContent = Math.floor(arena.player.peak);
  $("result-kills").textContent = arena.player.kills;
  $("result-time").textContent = Math.floor(arena.time);
  $("death-reason").textContent =
    event.reason === "boundary"
      ? "You hit the arena boundary."
      : event.reason === 'barrier' ? 'Your bike hit a solid surface. Jump clear of an obstacle to pass over it.'
      : event.reason === "reactor"
        ? "You collided with a reactor platform."
        : event.reason === "self"
          ? "You crossed your own laser trail."
          : `You hit ${event.killer?.name ?? "a rival"}'s laser trail.`;
  setTimeout(() => {
    if (state === "dead") $("death-dialog").showModal();
  }, 1250);
}
$("play-form").addEventListener("submit", (e) => {
  e.preventDefault();
  start();
});
$("retry").addEventListener("click", start);
$("pause-button").addEventListener("click", pause);
$("resume").addEventListener("click", resume);
$("quit").addEventListener("click", menu);
$("death-menu").addEventListener("click", menu);
$("pause-dialog").addEventListener("cancel", (e) => {
  e.preventDefault();
  resume();
});
$("death-dialog").addEventListener("cancel", (e) => {
  e.preventDefault();
  menu();
});
function updateQuality() {
  $("quality").textContent =
    `Graphics: ${highQuality ? "Balanced" : "Performance"}`;
  graphics?.setQuality(highQuality);
}
$("quality").addEventListener("click", () => {
  highQuality = !highQuality;
  save("quality", highQuality ? "high" : "performance");
  updateQuality();
});

function doJump() {
  if (state === "playing" && arena.jump(arena.player)) {
    soundEvent({ type: "jump" });
    graphics.emit(arena.player.x, arena.player.z, skin, 22, 0.5);
  }
}
const gameKeys = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ShiftLeft",
  "ShiftRight",
  "Space",
  "Escape",
  "KeyP",
  "KeyC",
  "KeyM",
  "ControlLeft",
  "ControlRight",
]);
const turnKeys = { ArrowRight: 1, KeyD: 1, ArrowLeft: -1, KeyA: -1 };
window.addEventListener("keydown", (e) => {
  if (e.target instanceof HTMLInputElement) return;
  if (!gameKeys.has(e.code)) return;
  if (state === "playing" || state === "paused") e.preventDefault();
  if ((e.code === "Escape" || e.code === "KeyP") && !e.repeat) {
    if (state === "playing") pause();
    else if (state === "paused") resume();
    return;
  }
  if (state !== "playing") return;
  if(e.code==='KeyM'&&!e.repeat){toggleSound();return;}
  if (mode === "90" && (!touchWheelie&&!e.ctrlKey||arena.player.wheelieLocked||arena.player.wheelieCooldown>0) && !arena.player.wheelieActive && e.code in turnKeys && !e.repeat) {
    if (turns.length < 2) turns.push(turnKeys[e.code]);
  }
  keys.add(e.code);
  if (e.code === "Space" && !e.repeat) doJump();
});
window.addEventListener("keyup", (e) => keys.delete(e.code));
window.addEventListener("blur", () => {
  clearInput();
  pause();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause();
});
window.addEventListener("resize", () => {
  graphics?.resize();
  if (graphics && arena && state === "paused") graphics.draw(arena, 0, arena.time);
});
let cameraPointer=null,cameraLast=null;
function releaseCamera() {
  cameraPointer=null;cameraLast=null;
  if(graphics){graphics.orbit.x=graphics.orbit.y=0;}
}
$("world").addEventListener("pointerdown",e=>{
  if(e.pointerType==='mouse'&&e.button===2&&state==='playing') {
    e.preventDefault();cameraPointer=e.pointerId;cameraLast={x:e.clientX,y:e.clientY};
    e.currentTarget.setPointerCapture(e.pointerId);
  }
});
$("world").addEventListener("pointermove",e=>{
  if(e.pointerId!==cameraPointer||!cameraLast||state!=='playing')return;
  if(!(e.buttons&2)){releaseCamera();return;}
  graphics.orbit.x=Math.max(-1,Math.min(1,graphics.orbit.x+(e.clientX-cameraLast.x)/350));
  graphics.orbit.y=Math.max(-1,Math.min(1,graphics.orbit.y+(e.clientY-cameraLast.y)/280));
  cameraLast={x:e.clientX,y:e.clientY};
});
for(const type of ['pointerup','pointercancel','lostpointercapture'])window.addEventListener(type,e=>{if(e.pointerId===cameraPointer)releaseCamera();});
window.addEventListener('blur',releaseCamera);
for (const type of ["pointerup", "pointercancel"])
  window.addEventListener(type, e => {
    if (e.pointerId === boostPointer) { touchBoost = false; boostPointer = null; }
  });
$("world").addEventListener("contextmenu", (e) => e.preventDefault());
$("boost-button").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (state === "playing") {
    touchBoost = true;
    boostPointer = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
});
$("boost-button").addEventListener("lostpointercapture", e => {
  if (e.pointerId === boostPointer) { touchBoost = false; boostPointer = null; }
});
$("jump-button").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  doJump();
});
let stickId = null;
function moveStick(e) {
  if (e.pointerId !== stickId) return;
  const rect = $("joystick").getBoundingClientRect(),
    dx = e.clientX - rect.left - rect.width / 2,
    dy = e.clientY - rect.top - rect.height / 2,
    d = Math.hypot(dx, dy),
    scale = Math.min(1, 35 / (d || 1));
  $("joystick").querySelector("i").style.transform =
    `translate(${dx * scale}px,${dy * scale}px)`;
  joystickAngle = d > 7 ? Math.max(-1, Math.min(1, dx / 35)) : null;
  if (mode === "90" && (!touchWheelie||arena.player.wheelieLocked||arena.player.wheelieCooldown>0) && !arena.player.wheelieActive) {
    if (joystickAngle === null || Math.abs(joystickAngle) < 0.25) stickTurnArmed = true;
    else if (Math.abs(joystickAngle) > 0.55 && stickTurnArmed) {
      if (turns.length < 2) turns.push(Math.sign(joystickAngle));
      stickTurnArmed = false;
    }
  }
}
$("joystick").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  stickId = e.pointerId;
  e.currentTarget.setPointerCapture(e.pointerId);
  moveStick(e);
});
$("joystick").addEventListener("pointermove", moveStick);
for (const type of ["pointerup", "pointercancel", "lostpointercapture"])
  $("joystick").addEventListener(type, (e) => {
    if (e.pointerId === stickId) {
      stickId = null;
      stickTurnArmed = true;
      joystickAngle = null;
      $("joystick").querySelector("i").style.transform = "";
    }
  });
function input() {
  const p = arena.player;
  let axis = 0;
  const keyboard = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) -
    (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0);
  if (keyboard) axis = keyboard;
  if (joystickAngle !== null) axis = steeringAxis(joystickAngle);
  const wheelie = touchWheelie || keys.has("ControlLeft") || keys.has("ControlRight");
  let angle = p.angle;
  if ((wheelie&&!p.wheelieLocked&&p.wheelieCooldown<=0) || p.wheelieActive) { turns.length = 0; }
  else if (mode === "360") angle = steeringTarget(p.angle, axis, 1 / 60);
  else {
    if (turns.length) angle = relativeTurn(p.angle, turns.shift());
  }
  graphics.lookBack = rearHeld || keys.has("KeyC");
  return { angle, steer: axis, wheelie, boost: touchBoost || keys.has("ShiftLeft") || keys.has("ShiftRight") };
}
$("wheelie-button").addEventListener("pointerdown", e => {
  e.preventDefault();
  if (state === "playing") { touchWheelie = true; wheeliePointer = e.pointerId; e.currentTarget.setPointerCapture(e.pointerId); }
});
for (const type of ["pointerup", "pointercancel", "lostpointercapture"])
  $("wheelie-button").addEventListener(type, e => {
    if (e.pointerId === wheeliePointer) { touchWheelie = false; wheeliePointer = null; }
  });
$("rear-button").addEventListener("pointerdown", e => {
  e.preventDefault();
  if (state === "playing") { rearHeld = true; e.currentTarget.setPointerCapture(e.pointerId); }
});
for (const type of ["pointerup", "pointercancel", "lostpointercapture"])
  $("rear-button").addEventListener(type, () => { rearHeld = false; });

function updateHUD() {
  if (!arena) return;
  const p = arena.player;
  $("ride-speed").textContent = Math.round(p.speed);
  $("district").textContent = arena.sector();
  $("wheelie-label").textContent = p.wheelieActive ? (p.speed < 0.1 ? `Pivot · ${Math.max(0,3-p.wheelieElapsed).toFixed(1)}s` : "Braking · trail active") : p.wheelieLocked?'Release Ctrl to rearm':p.wheelieCooldown>0?'Recovering…':"Hold Ctrl · brake + pivot";
  $("wheelie-button").classList.toggle("active", p.wheelieActive);
  $("length").textContent = Math.floor(p.length);
  $("personal-best").textContent =
    `Best ${Math.max(best, Math.floor(p.peak))} m`;
  $("eliminations").textContent = p.kills;
  const secs = Math.floor(arena.time);
  $("run-time").textContent =
    `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const ranking = arena.ranking();
  $("leaders").replaceChildren();
  ranking.slice(0, 5).forEach((r, index) => {
    const li = document.createElement("li");
    if (r.player) li.className = "me";
    const place = document.createElement("i");
    place.textContent = index + 1;
    const name = document.createElement("span");
    name.textContent = r.name;
    const value = document.createElement("b");
    value.textContent = Math.floor(r.length);
    li.append(place, name, value);
    $("leaders").append(li);
  });
  const rank = ranking.indexOf(p) + 1;
  $("your-rank").textContent = rank
    ? `#${rank}  ${p.name} · ${Math.floor(p.length)} m`
    : "Crashed";
  drawMap();
}
function drawMap() {
  const c = $("minimap").getContext("2d"),
    s = 180,
    scale = s / WORLD_SIZE,
    p = arena.player;
  c.clearRect(0, 0, s, s);
  c.fillStyle = "#100d0e";
  c.fillRect(0, 0, s, s);
  c.strokeStyle = "#392326";
  c.lineWidth = 0.5;
  for (let i = 0; i <= s; i += s / 8) {
    c.beginPath();
    c.moveTo(i, 0);
    c.lineTo(i, s);
    c.moveTo(0, i);
    c.lineTo(s, i);
    c.stroke();
  }
  const map = (x) => (x + HALF) * scale;
  for(const road of ROADS){const a=roadPoint(road,0),b=roadPoint(road,road.end-road.start);c.strokeStyle='#'+road.color.toString(16).padStart(6,'0');c.globalAlpha=.6;c.lineWidth=road.kind==='bridge'?3:2;c.setLineDash(road.kind==='tunnel'?[3,3]:[]);c.beginPath();c.moveTo(map(a.x),map(a.z));c.lineTo(map(b.x),map(b.z));c.stroke();}
  c.setLineDash([]);c.strokeStyle='#ff64df';c.lineWidth=2;c.beginPath();c.arc(map(LOOP.x),map(LOOP.z-LOOP.approach),4,0,Math.PI*2);c.stroke();
  for (const o of LANDMARKS) {
    c.fillStyle = `#${o.color.toString(16).padStart(6, "0")}`;
    c.globalAlpha = 0.55;
    c.beginPath();
    c.arc(map(o.x), map(o.z), Math.max(2, o.r * scale), 0, Math.PI * 2);
    c.fill();
  }
  c.globalAlpha = 1;
  for (const r of arena.riders) {
    if (!r.alive) continue;
    c.strokeStyle = COLORS[r.skin];
    c.globalAlpha = r.player ? 0.9 : 0.35;
    c.lineWidth = r.player ? 1.3 : 0.7;
    c.beginPath();
    for (let i = 0; i < r.trail.length; i += 3) {
      const pt = r.trail[i];
      if (!i) c.moveTo(map(pt.x), map(pt.z));
      else c.lineTo(map(pt.x), map(pt.z));
    }
    c.lineTo(map(r.x), map(r.z));
    c.stroke();
    if (!r.player) {
      c.fillStyle = COLORS[r.skin];
      c.fillRect(map(r.x) - 1, map(r.z) - 1, 2, 2);
    }
  }
  c.globalAlpha = 1;
  c.strokeStyle = "#ffffff";
  c.lineWidth = 1;
  c.beginPath();
  c.arc(map(p.x), map(p.z), 5, 0, Math.PI * 2);
  c.stroke();
  c.fillStyle = "#fff0ed";
  c.beginPath();
  c.arc(map(p.x), map(p.z), 2, 0, Math.PI * 2);
  c.fill();
  c.save();
  c.translate(map(p.x), map(p.z));
  c.rotate(p.angle);
  c.beginPath(); c.moveTo(10, 0); c.lineTo(-4, -4); c.lineTo(-2, 0); c.lineTo(-4, 4); c.closePath();
  c.fill(); c.restore();
  c.strokeStyle = "#866167";
  c.strokeRect(0.5, 0.5, s - 1, s - 1);
}

const logoPath = $("logo-path"),
  logoLength = logoPath.getTotalLength(),
  logoBike = $("logo-bike");
let logoStarted = performance.now();
logoPath.style.strokeDasharray = logoLength;
logoPath.style.strokeDashoffset = reducedMotion ? 0 : logoLength;
function animateLogo(now) {
  if (reducedMotion) {
    logoBike.style.display = "none";
    return;
  }
  const elapsed = (now - logoStarted) / 1000,
    progress = Math.min(1, Math.max(0, (elapsed - 0.2) / 3.8));
  logoPath.style.strokeDashoffset = logoLength * (1 - progress);
  if (progress < 1) {
    const len = logoLength * progress,
      point = logoPath.getPointAtLength(len),
      next = logoPath.getPointAtLength(Math.min(logoLength, len + 2));
    logoBike.style.opacity = 1;
    logoBike.setAttribute(
      "transform",
      `translate(${point.x} ${point.y}) rotate(${(Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI})`,
    );
  } else {
    logoBike.style.opacity = 0;
  }
}

function frame(now) {
  requestAnimationFrame(frame);
  // Rendering above 60 Hz doubled GPU work while physics still ran at 60 Hz.
  if (now - lastTime < 1000 / 60 - 0.5) return;
  const dt = Math.min(0.08, (now - lastTime) / 1000 || 0.016);
  lastTime = now;
  engine?.update(arena?.player,state==='playing',soundOn);
  if (state === "interrupted") {
    return;
  }
  if (state === "menu") {
    animateLogo(now);
    garagePreview?.draw(dt, now);
    return;
  }
  if (state === "playing") {
    accumulator = Math.min(0.1, accumulator + dt);
    while (accumulator >= 1 / 60 && state === "playing") {
      const events = arena.step(1 / 60, input());
      accumulator -= 1 / 60;
      for (const e of events) {
        if (e.type === "pickup") {
          graphics.emit(e.x, e.z, e.skin, 3, 0.3,e.y,e.kind);
          soundEvent(e);
        }
        if (e.type === "death") {
          graphics.explode(e.rider);
          if (e.rider.player) {
            soundEvent(e);
            end(e);
          }
        }
        if (e.type === "elimination") {
          toast(`Eliminated ${e.victim.name}`);
          soundEvent(e);
        }
      }
    }
    const p = arena.player;
    $("jump-label").textContent =
      p.cooldown > 0 ? `${p.cooldown.toFixed(1)}s` : p.wheelieActive||p.airborne ? "Land / lower bike" : "READY · rear tire lit";
    $("jump-meter").style.transform =
      `scaleX(${1 - p.cooldown / JUMP_COOLDOWN})`;
    $("jump-button").classList.toggle("cooldown", p.cooldown > 0);
    $("jump-meter").parentElement.classList.toggle("jump-ready",p.cooldown<=0&&!p.wheelieActive&&!p.airborne);
    $("boost-label").textContent = p.boost
      ? "Boosting"
      : p.length < 50
        ? "Collect energy to boost"
        : "Hold Shift · spends length";
    $("boost-button").style.borderColor = p.boost ? "#ff4941" : "";
    if (arena.time > 9) $("pointer-hint").hidden = true;
    if (performance.now() > toastUntil) $("toast").classList.remove("visible");
    if (Math.abs(p.x) > HALF - 90 || Math.abs(p.z) > HALF - 90)
      toast("Boundary ahead — turn back", 800);
    uiTimer -= dt;
    if (uiTimer <= 0) {
      updateHUD();
      uiTimer = 0.2;
    }
  }
  if (state !== "paused") graphics.draw(arena, dt, arena.time, state === "playing" ? accumulator * 60 : 1);
}
try {
  graphics = new GridRenderer($("world"));
  updateQuality();
  $("load-status").textContent = "";
  $("play").disabled = false;
} catch (error) {
  console.error(error);
  $("load-status").textContent =
    "3D graphics are unavailable. Enable hardware acceleration or try another browser.";
  $("load-status").classList.add("error");
  $("play").disabled = true;
}
try {
  garagePreview = new BikeGarage(
    $("bike-teaser"),
    $("garage-stage"),
    reducedMotion,
  );
  garagePreview.setLoadout(skin, loadout);
} catch (error) {
  console.warn("Garage preview could not initialize:", error);
  $("garage-stage").dataset.error =
    "3D preview unavailable. Your chosen parts will still be saved.";
}
$("world").addEventListener("webglcontextlost", (e) => {
  e.preventDefault();
  state = "interrupted";
  clearInput();
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  $("graphics-dialog").showModal();
  $("play").disabled = true;
});
$("graphics-dialog").addEventListener("cancel", (e) => e.preventDefault());
$("reload").addEventListener("click", () => location.reload());
requestAnimationFrame(frame);
// Explicit opt-in diagnostics for deterministic browser smoke tests; absent on normal visits.
if (new URLSearchParams(location.search).has("test"))
  window.__GRID_TEST__ = {
    get arena() {
      return arena;
    },
    get audio(){return {context:audio,engine,soundOn};},
    get graphics() {
      return graphics;
    },
    get state() {
      return state;
    },
    get garage() {
      return garagePreview;
    },
    get loadout() {
      return { ...loadout };
    },
    snapshot() {
      return arena
        ? {
            state,
            mode: arena.mode,
            speedPercent: arena.speedPercent,
            time: arena.time,
            length: arena.player.length,
            peak: arena.player.peak,
            boost: arena.player.boost,
            speed: arena.player.speed,
            wheelie: arena.player.wheelie,
            wheelieActive: arena.player.wheelieActive,
            wheelieElapsed:arena.player.wheelieElapsed,
            elevation:arena.player.y,
            road:arena.player.road,
            loop:arena.player.loopS,
            renderScale: graphics.renderScale,
            jump: arena.player.jump,
            height: jumpHeight(arena.player),
            cooldown: arena.player.cooldown,
            alive: arena.player.alive,
            loadout: { ...arena.player.loadout },
            bots: arena.riders.length - 1,
            food: arena.food.length,
            drawCalls: graphics.renderer.info.render.calls,
          }
        : { state, mode, speedPercent };
    },
  };
