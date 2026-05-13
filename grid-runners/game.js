const canvas = document.querySelector("#arena");
const ctx = canvas.getContext("2d");

const ui = {
  score: document.querySelector("#score"),
  level: document.querySelector("#level"),
  streak: document.querySelector("#streak"),
  round: document.querySelector("#round"),
  ultimateName: document.querySelector("#ultimateName"),
  ultimateFill: document.querySelector("#ultimateFill"),
  dashState: document.querySelector("#dashState"),
  dashFill: document.querySelector("#dashFill"),
  xpLabel: document.querySelector("#xpLabel"),
  xpFill: document.querySelector("#xpFill"),
  menu: document.querySelector("#menu"),
  menuRank: document.querySelector("#menuRank"),
  menuXp: document.querySelector("#menuXp"),
  menuUnlock: document.querySelector("#menuUnlock"),
  start: document.querySelector("#start"),
  restart: document.querySelector("#restart"),
  pause: document.querySelector("#pause")
};

const TAU = Math.PI * 2;
const keys = new Set();
const arena = { w: 2600, h: 1600 };
const camera = { x: arena.w / 2, y: arena.h / 2, shake: 0 };
const saveKey = "grid-runners-overdrive-save";

const ultimates = [
  { id: "nova", name: "Nova Cut", rank: 1, cost: 100, color: "#ff347e" },
  { id: "blink", name: "Ghost Blink", rank: 3, cost: 100, color: "#00e7ff" },
  { id: "storm", name: "Ion Storm", rank: 6, cost: 100, color: "#ffc83d" }
];

let W = 0;
let H = 0;
let dpr = 1;
let last = 0;
let active = false;
let paused = false;
let gameOver = false;
let player;
let runners = [];
let shards = [];
let particles = [];
let shockwaves = [];
let score = 0;
let wave = 1;
let kos = 0;
let spawnTimer = 0;
let message = "";
let messageTimer = 0;
let pointer = { active: false, x: 0, y: 0 };
let progression = loadProgress();

function loadProgress() {
  try {
    const raw = localStorage.getItem(saveKey);
    if (!raw) return { xp: 0, best: 0 };
    const parsed = JSON.parse(raw);
    return {
      xp: Math.max(0, Number(parsed.xp) || 0),
      best: Math.max(0, Number(parsed.best) || 0)
    };
  } catch {
    return { xp: 0, best: 0 };
  }
}

function saveProgress() {
  try {
    localStorage.setItem(saveKey, JSON.stringify(progression));
  } catch {
    // The game still plays if storage is unavailable.
  }
}

function rankFromXp(xp) {
  return Math.max(1, Math.floor(Math.sqrt(xp / 120)) + 1);
}

function xpForRank(rank) {
  return (rank - 1) * (rank - 1) * 120;
}

function activeUltimate() {
  const rank = rankFromXp(progression.xp);
  return ultimates.filter((u) => rank >= u.rank).at(-1) || ultimates[0];
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function makeRunner(x, y, angle, color, ai = null) {
  return {
    x,
    y,
    px: x,
    py: y,
    angle,
    turnTarget: angle,
    speed: ai ? rand(155, 198) + wave * 4 : 215 + rankFromXp(progression.xp) * 3,
    color,
    trail: [{ x, y }],
    alive: true,
    ai,
    radius: ai ? 10 : 11,
    dashCooldown: 0,
    dashTime: 0,
    shield: 1.6,
    ult: ai ? rand(10, 60) : 42,
    heat: 0
  };
}

function reset() {
  const ult = activeUltimate();
  player = makeRunner(arena.w * 0.5, arena.h * 0.5, -Math.PI / 2, "#00e7ff");
  runners = [player];
  shards = [];
  particles = [];
  shockwaves = [];
  score = 0;
  wave = 1;
  kos = 0;
  spawnTimer = 0;
  active = true;
  paused = false;
  gameOver = false;
  message = `${ult.name} online`;
  messageTimer = 2.2;
  ui.menu.classList.add("hidden");
  ui.pause.textContent = "Pause";
  for (let i = 0; i < 34; i++) spawnShard();
  for (let i = 0; i < 4; i++) spawnBot();
}

function spawnShard() {
  shards.push({
    x: rand(80, arena.w - 80),
    y: rand(80, arena.h - 80),
    r: rand(5, 10),
    value: Math.floor(rand(10, 24)),
    spin: rand(0, TAU),
    color: Math.random() > 0.35 ? "#00e7ff" : "#ffc83d"
  });
}

function spawnBot() {
  const side = Math.floor(rand(0, 4));
  const margin = 120;
  const pos = [
    { x: margin, y: rand(margin, arena.h - margin), a: 0 },
    { x: arena.w - margin, y: rand(margin, arena.h - margin), a: Math.PI },
    { x: rand(margin, arena.w - margin), y: margin, a: Math.PI / 2 },
    { x: rand(margin, arena.w - margin), y: arena.h - margin, a: -Math.PI / 2 }
  ][side];
  const moods = ["hunter", "ambusher", "collector", "survivor"];
  runners.push(makeRunner(pos.x, pos.y, pos.a, `hsl(${rand(320, 420)} 96% 62%)`, {
    mood: moods[Math.floor(rand(0, moods.length))],
    think: 0,
    turnRate: rand(2.4, 4.1),
    bias: rand(-1, 1)
  }));
}

function addParticles(x, y, color, count, force = 1) {
  for (let i = 0; i < count; i++) {
    const a = rand(0, TAU);
    const s = rand(40, 420) * force;
    particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rand(0.3, 1), max: 1, r: rand(1.2, 4.8), color });
  }
}

function steerPlayer(dt) {
  const left = keys.has("ArrowLeft") || keys.has("a");
  const right = keys.has("ArrowRight") || keys.has("d");
  const up = keys.has("ArrowUp") || keys.has("w");
  const down = keys.has("ArrowDown") || keys.has("s");
  if (left || right || up || down) {
    player.turnTarget = Math.atan2((down ? 1 : 0) - (up ? 1 : 0), (right ? 1 : 0) - (left ? 1 : 0));
  } else if (pointer.active) {
    const world = screenToWorld(pointer.x, pointer.y);
    player.turnTarget = angleTo(player, world);
  }
  if ((keys.has(" ") || keys.has("Shift")) && player.dashCooldown <= 0) dash(player);
  if ((keys.has("e") || keys.has("E")) && player.ult >= activeUltimate().cost) fireUltimate();
  player.angle = turnToward(player.angle, player.turnTarget, dt * 5.8);
}

function steerBot(bot, dt) {
  bot.ai.think -= dt;
  if (bot.ai.think > 0) return;
  bot.ai.think = rand(0.08, 0.24);
  const danger = nearestTrail(bot, bot.radius + 46);
  if (danger) {
    bot.turnTarget = angleTo(danger, bot) + bot.ai.bias * 0.7;
    return;
  }
  if (bot.ai.mood === "collector" && shards.length) {
    const target = shards.reduce((best, s) => (!best || dist(bot, s) < dist(bot, best) ? s : best), null);
    bot.turnTarget = angleTo(bot, target);
  } else if (bot.ai.mood === "survivor") {
    bot.turnTarget += rand(-0.8, 0.8);
  } else if (bot.ai.mood === "ambusher") {
    bot.turnTarget = angleTo(bot, player) + Math.PI / 3 * bot.ai.bias;
  } else {
    bot.turnTarget = angleTo(bot, player);
  }
  if (dist(bot, player) < 260 && bot.dashCooldown <= 0 && Math.random() > 0.75) dash(bot);
}

function turnToward(current, target, amount) {
  let diff = ((target - current + Math.PI) % TAU) - Math.PI;
  if (diff < -Math.PI) diff += TAU;
  return current + clamp(diff, -amount, amount);
}

function dash(runner) {
  const rankBonus = runner === player ? Math.min(0.22, rankFromXp(progression.xp) * 0.015) : 0;
  runner.dashTime = 0.18 + rankBonus;
  runner.dashCooldown = runner === player ? Math.max(0.9, 1.45 - rankFromXp(progression.xp) * 0.035) : rand(1.2, 2.5);
  runner.heat = 1;
  addParticles(runner.x, runner.y, runner.color, 18, 0.8);
}

function fireUltimate() {
  const ult = activeUltimate();
  player.ult = 0;
  camera.shake = 24;
  message = ult.name;
  messageTimer = 1.7;
  if (ult.id === "nova") {
    shockwaves.push({ x: player.x, y: player.y, r: 20, max: 360, life: 0.5, color: ult.color, mode: "kill" });
  }
  if (ult.id === "blink") {
    const oldX = player.x;
    const oldY = player.y;
    player.x = clamp(player.x + Math.cos(player.angle) * 390, 50, arena.w - 50);
    player.y = clamp(player.y + Math.sin(player.angle) * 390, 50, arena.h - 50);
    player.trail.push({ x: oldX, y: oldY, gap: true });
    player.trail.push({ x: player.x, y: player.y });
    player.shield = 1.1;
    shockwaves.push({ x: oldX, y: oldY, r: 10, max: 190, life: 0.35, color: ult.color, mode: "stun" });
    shockwaves.push({ x: player.x, y: player.y, r: 10, max: 230, life: 0.42, color: ult.color, mode: "kill" });
  }
  if (ult.id === "storm") {
    for (let i = 0; i < 7; i++) {
      shockwaves.push({ x: player.x + rand(-260, 260), y: player.y + rand(-220, 220), r: 10, max: rand(140, 260), life: rand(0.35, 0.65), color: ult.color, mode: "kill" });
    }
  }
}

function nearestTrail(runner, range) {
  for (const other of runners) {
    if (!other.alive) continue;
    const skip = other === runner ? 12 : 2;
    for (let i = skip; i < other.trail.length; i += 3) {
      const p = other.trail[i];
      if (p.gap) continue;
      if (Math.hypot(runner.x - p.x, runner.y - p.y) < range) return p;
    }
  }
  return null;
}

function updateRunner(runner, dt) {
  if (!runner.alive) return;
  runner.px = runner.x;
  runner.py = runner.y;
  runner.dashCooldown = Math.max(0, runner.dashCooldown - dt);
  runner.dashTime = Math.max(0, runner.dashTime - dt);
  runner.shield = Math.max(0, runner.shield - dt);
  runner.heat = Math.max(0, runner.heat - dt * 2.4);
  const speed = runner.speed * (runner.dashTime > 0 ? 2.35 : 1);
  runner.x += Math.cos(runner.angle) * speed * dt;
  runner.y += Math.sin(runner.angle) * speed * dt;
  runner.x = clamp(runner.x, 18, arena.w - 18);
  runner.y = clamp(runner.y, 18, arena.h - 18);
  if (!runner.trail.length || Math.hypot(runner.x - runner.trail[0].x, runner.y - runner.trail[0].y) > 7) {
    runner.trail.unshift({ x: runner.x, y: runner.y });
  }
  const maxTrail = runner === player ? 620 + rankFromXp(progression.xp) * 20 : 430 + wave * 10;
  while (runner.trail.length > maxTrail) runner.trail.pop();
}

function update(dt) {
  if (!active || paused) return;
  steerPlayer(dt);
  for (const runner of runners) {
    if (runner.ai) {
      steerBot(runner, dt);
      runner.angle = turnToward(runner.angle, runner.turnTarget, dt * runner.ai.turnRate);
    }
    updateRunner(runner, dt);
  }

  for (const runner of runners) {
    if (!runner.alive) continue;
    collectShards(runner);
    checkCollisions(runner);
  }

  for (const waveFx of shockwaves) {
    waveFx.life -= dt;
    waveFx.r += (waveFx.max - waveFx.r) * dt * 7;
    if (waveFx.mode === "kill") {
      for (const bot of runners) {
        if (bot === player || !bot.alive) continue;
        if (Math.hypot(bot.x - waveFx.x, bot.y - waveFx.y) < waveFx.r) destroyRunner(bot, player);
      }
    }
  }
  shockwaves = shockwaves.filter((s) => s.life > 0);

  particles = particles.filter((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.96;
    p.vy *= 0.96;
    return p.life > 0;
  });

  spawnTimer -= dt;
  if (spawnTimer <= 0 && runners.filter((r) => r.ai && r.alive).length < Math.min(4 + wave, 10)) {
    spawnTimer = rand(1.2, 2.3);
    spawnBot();
  }

  if (kos >= wave * 4) {
    wave += 1;
    kos = 0;
    message = `Wave ${wave}`;
    messageTimer = 1.4;
    player.ult = Math.min(activeUltimate().cost, player.ult + 35);
    for (let i = 0; i < 12; i++) spawnShard();
  }
  player.ult = clamp(player.ult + dt * (5 + rankFromXp(progression.xp) * 0.18), 0, activeUltimate().cost);
  messageTimer = Math.max(0, messageTimer - dt);
  camera.shake = Math.max(0, camera.shake - dt * 28);
}

function collectShards(runner) {
  for (let i = shards.length - 1; i >= 0; i--) {
    const shard = shards[i];
    if (Math.hypot(runner.x - shard.x, runner.y - shard.y) > runner.radius + shard.r + 6) continue;
    if (runner === player) {
      score += shard.value;
      player.ult = clamp(player.ult + shard.value * 0.28, 0, activeUltimate().cost);
      progression.xp += Math.ceil(shard.value * 0.25);
      saveProgress();
    }
    addParticles(shard.x, shard.y, shard.color, 8, 0.55);
    shards.splice(i, 1);
    spawnShard();
  }
}

function checkCollisions(runner) {
  if (runner.shield > 0) return;
  if (runner.x <= 20 || runner.x >= arena.w - 20 || runner.y <= 20 || runner.y >= arena.h - 20) {
    destroyRunner(runner, null);
    return;
  }
  for (const other of runners) {
    if (!other.alive) continue;
    const skip = other === runner ? 22 : 4;
    for (let i = skip; i < other.trail.length; i += 2) {
      const p = other.trail[i];
      if (p.gap) continue;
      if (Math.hypot(runner.x - p.x, runner.y - p.y) < runner.radius + 3) {
        destroyRunner(runner, other);
        return;
      }
    }
  }
}

function destroyRunner(runner, killer) {
  if (!runner.alive) return;
  runner.alive = false;
  addParticles(runner.x, runner.y, runner.color, 64, 1.45);
  shockwaves.push({ x: runner.x, y: runner.y, r: 8, max: 120, life: 0.32, color: runner.color, mode: "none" });
  if (runner === player) {
    active = false;
    gameOver = true;
    progression.best = Math.max(progression.best, score);
    progression.xp += Math.floor(score / 12) + wave * 18;
    saveProgress();
    updateMenu();
    ui.menu.querySelector("h2").textContent = "Your runner derezzed, but the garage kept the XP.";
    ui.menu.querySelector(".menu__copy p:not(.eyebrow)").textContent = `Score ${score.toLocaleString()} across wave ${wave}. Rank and unlocks persist, so the next run starts sharper.`;
    ui.start.textContent = "Recompile Runner";
    ui.menu.classList.remove("hidden");
  } else if (killer === player || killer === null) {
    const reward = 120 + wave * 16;
    score += reward;
    kos += 1;
    progression.xp += 18 + wave * 2;
    saveProgress();
    player.ult = clamp(player.ult + 18, 0, activeUltimate().cost);
    camera.shake = 14;
  }
}

function screenToWorld(x, y) {
  return { x: x + camera.x - W / 2, y: y + camera.y - H / 2 };
}

function updateCamera(dt) {
  if (!player) return;
  const sx = camera.shake ? rand(-camera.shake, camera.shake) : 0;
  const sy = camera.shake ? rand(-camera.shake, camera.shake) : 0;
  camera.x += (player.x + sx - camera.x) * (1 - Math.pow(0.001, dt));
  camera.y += (player.y + sy - camera.y) * (1 - Math.pow(0.001, dt));
}

function drawGrid(time) {
  ctx.fillStyle = "#02050a";
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  const pulse = Math.sin(time * 0.002) * 0.08 + 0.28;
  ctx.strokeStyle = `rgba(0, 231, 255, ${pulse})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= arena.w; x += 80) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, arena.h);
  }
  for (let y = 0; y <= arena.h; y += 80) {
    ctx.moveTo(0, y);
    ctx.lineTo(arena.w, y);
  }
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, arena.w, arena.h);
  ctx.restore();
}

function drawRunner(runner, time) {
  if (!runner.alive) return;
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = runner.color;
  ctx.shadowBlur = 18;
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = runner.trail.length - 1; i >= 0; i--) {
      const p = runner.trail[i];
      if (p.gap) {
        ctx.moveTo(p.x, p.y);
        continue;
      }
      if (i === runner.trail.length - 1) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = pass ? "rgba(255,255,255,0.52)" : runner.color;
    ctx.globalAlpha = pass ? 0.38 : 0.74;
    ctx.lineWidth = pass ? 3 : 9 + runner.heat * 5;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = runner.color;
  ctx.shadowBlur = 26;
  ctx.save();
  ctx.translate(runner.x, runner.y);
  ctx.rotate(runner.angle);
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-12, -9);
  ctx.lineTo(-7, 0);
  ctx.lineTo(-12, 9);
  ctx.closePath();
  ctx.fill();
  if (runner.shield > 0) {
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 24 + Math.sin(time * 0.012) * 3, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();
  ctx.restore();
}

function drawShards(time) {
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  for (const shard of shards) {
    shard.spin += 0.035;
    ctx.save();
    ctx.translate(shard.x, shard.y);
    ctx.rotate(shard.spin);
    ctx.fillStyle = shard.color;
    ctx.shadowColor = shard.color;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = i * TAU / 4;
      const r = shard.r + Math.sin(time * 0.006 + i) * 2;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawEffects() {
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  ctx.globalCompositeOperation = "lighter";
  for (const waveFx of shockwaves) {
    ctx.globalAlpha = clamp(waveFx.life * 2, 0, 1);
    ctx.strokeStyle = waveFx.color;
    ctx.lineWidth = 4;
    ctx.shadowColor = waveFx.color;
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(waveFx.x, waveFx.y, waveFx.r, 0, TAU);
    ctx.stroke();
  }
  for (const p of particles) {
    ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

function drawOverlay() {
  const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.1, W / 2, H / 2, Math.max(W, H) * 0.7);
  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(0.68, "rgba(255,255,255,0)");
  g.addColorStop(1, "rgba(0,0,0,0.75)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  if (messageTimer > 0) {
    ctx.save();
    ctx.globalAlpha = clamp(messageTimer, 0, 1);
    ctx.fillStyle = "#f6fbff";
    ctx.font = "900 42px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.shadowColor = activeUltimate().color;
    ctx.shadowBlur = 24;
    ctx.fillText(message, W / 2, H * 0.28);
    ctx.restore();
  }
}

function render(time) {
  drawGrid(time);
  drawShards(time);
  for (const runner of runners) drawRunner(runner, time);
  drawEffects();
  drawOverlay();
}

function updateUi() {
  const rank = rankFromXp(progression.xp);
  const nextRankXp = xpForRank(rank + 1);
  const currentRankXp = xpForRank(rank);
  const xpInRank = progression.xp - currentRankXp;
  const xpNeeded = nextRankXp - currentRankXp;
  const ult = activeUltimate();
  ui.score.textContent = score.toLocaleString();
  ui.level.textContent = String(rank);
  ui.streak.textContent = String(kos);
  ui.round.textContent = String(wave);
  ui.ultimateName.textContent = ult.name;
  ui.ultimateFill.style.width = `${clamp(player.ult / ult.cost, 0, 1) * 100}%`;
  ui.dashState.textContent = player.dashCooldown <= 0 ? "Ready" : `${player.dashCooldown.toFixed(1)}s`;
  ui.dashFill.style.width = `${(1 - clamp(player.dashCooldown / 1.45, 0, 1)) * 100}%`;
  ui.xpLabel.textContent = `${Math.floor(xpInRank)} / ${xpNeeded} XP`;
  ui.xpFill.style.width = `${clamp(xpInRank / xpNeeded, 0, 1) * 100}%`;
}

function updateMenu() {
  const rank = rankFromXp(progression.xp);
  ui.menuRank.textContent = String(rank);
  ui.menuXp.textContent = progression.xp.toLocaleString();
  ui.menuUnlock.textContent = activeUltimate().name;
}

function loop(time) {
  const dt = Math.min(0.033, (time - last) / 1000 || 0);
  last = time;
  if (player) {
    update(dt);
    updateCamera(dt);
    render(time);
    updateUi();
  }
  requestAnimationFrame(loop);
}

function togglePause() {
  if (!active) return;
  paused = !paused;
  ui.pause.textContent = paused ? "Resume" : "Pause";
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  keys.add(event.key);
  if (event.key === "p" || event.key === "P") togglePause();
  if (event.key === "Enter" && gameOver) reset();
});
window.addEventListener("keyup", (event) => keys.delete(event.key));
canvas.addEventListener("pointermove", (event) => {
  pointer = { active: true, x: event.clientX, y: event.clientY };
});
canvas.addEventListener("pointerdown", (event) => {
  pointer = { active: true, x: event.clientX, y: event.clientY };
  keys.add(" ");
});
canvas.addEventListener("pointerup", () => keys.delete(" "));
canvas.addEventListener("pointerleave", () => {
  pointer.active = false;
  keys.delete(" ");
});
ui.start.addEventListener("click", reset);
ui.restart.addEventListener("click", reset);
ui.pause.addEventListener("click", togglePause);

resize();
updateMenu();
reset();
active = false;
ui.menu.classList.remove("hidden");
requestAnimationFrame(loop);
