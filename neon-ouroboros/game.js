const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ui = {
  score: document.querySelector("#score"),
  length: document.querySelector("#length"),
  combo: document.querySelector("#combo"),
  phase: document.querySelector("#phase"),
  powerLabel: document.querySelector("#powerLabel"),
  powerFill: document.querySelector("#powerFill"),
  splash: document.querySelector("#splash"),
  start: document.querySelector("#start"),
  restart: document.querySelector("#restart"),
  pause: document.querySelector("#pause")
};

const TAU = Math.PI * 2;
const world = { w: 4200, h: 4200 };
const keys = new Set();
const pointer = { active: false, x: 0, y: 0 };
const camera = { x: 0, y: 0, shake: 0 };

const palettes = [
  { name: "calm", bg: "#050913", grid: "#12304a", tint: "#20e6ff" },
  { name: "gravity", bg: "#0b0611", grid: "#4d255f", tint: "#ff4fa3" },
  { name: "solar", bg: "#100b03", grid: "#65430f", tint: "#ffc83d" },
  { name: "ghost", bg: "#040d0a", grid: "#235647", tint: "#c8ff3d" }
];

const relics = [
  { name: "phase fang", color: "#20e6ff", duration: 5.5 },
  { name: "gravity jaw", color: "#ff4fa3", duration: 6.5 },
  { name: "star cough", color: "#ffc83d", duration: 7.5 },
  { name: "mirror molt", color: "#c8ff3d", duration: 6 }
];

let W = 0;
let H = 0;
let dpr = 1;
let last = 0;
let running = false;
let paused = false;
let gameOver = false;
let score = 0;
let combo = 1;
let phaseTimer = 0;
let phaseIndex = 0;
let foods = [];
let rivals = [];
let particles = [];
let relicPickups = [];
let player;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function angleTo(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
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

function createSnake(x, y, color, ai = null) {
  const segments = [];
  for (let i = 0; i < 18; i++) segments.push({ x: x - i * 12, y });
  return {
    x,
    y,
    vx: 0,
    vy: 0,
    angle: rand(0, TAU),
    targetAngle: rand(0, TAU),
    speed: ai ? rand(135, 185) : 190,
    radius: ai ? rand(12, 19) : 15,
    desired: ai ? Math.floor(rand(34, 70)) : 34,
    segments,
    color,
    ai,
    alive: true,
    boost: 0,
    invuln: ai ? 0 : 2.2,
    relic: null,
    relicTime: 0,
    mouth: 0
  };
}

function reset() {
  foods = [];
  rivals = [];
  particles = [];
  relicPickups = [];
  player = createSnake(world.w / 2, world.h / 2, "#20e6ff");
  score = 0;
  combo = 1;
  phaseTimer = 18;
  phaseIndex = 0;
  gameOver = false;
  paused = false;
  running = true;
  ui.splash.classList.add("hidden");
  ui.pause.textContent = "Pause";

  for (let i = 0; i < 430; i++) spawnFood();
  for (let i = 0; i < 16; i++) {
    rivals.push(createSnake(rand(240, world.w - 240), rand(240, world.h - 240), `hsl(${rand(0, 360)} 95% 62%)`, {
      mood: ["hunter", "orbiter", "coward", "thief"][i % 4],
      turn: rand(0.8, 1.9),
      pulse: rand(0, 9)
    }));
  }
  for (let i = 0; i < 8; i++) spawnRelic();
}

function spawnFood(x = rand(40, world.w - 40), y = rand(40, world.h - 40), rich = false) {
  foods.push({
    x,
    y,
    r: rich ? rand(6, 12) : rand(2.4, 5.8),
    hue: rich ? rand(40, 70) : rand(170, 330),
    spin: rand(0, TAU),
    value: rich ? 8 : 1
  });
}

function spawnRelic() {
  relicPickups.push({
    x: rand(160, world.w - 160),
    y: rand(160, world.h - 160),
    r: 18,
    relic: relics[Math.floor(rand(0, relics.length))],
    spin: rand(0, TAU)
  });
}

function addBurst(x, y, color, count, force = 1) {
  for (let i = 0; i < count; i++) {
    const a = rand(0, TAU);
    const s = rand(40, 440) * force;
    particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: rand(0.35, 1.1),
      max: 1.1,
      r: rand(1.2, 5.5),
      color
    });
  }
}

function turnToward(current, target, amount) {
  let diff = ((target - current + Math.PI) % TAU) - Math.PI;
  if (diff < -Math.PI) diff += TAU;
  return current + clamp(diff, -amount, amount);
}

function updateSnake(snake, dt) {
  if (!snake.alive) return;

  const boostHeld = snake === player && (keys.has(" ") || keys.has("Shift"));
  const boosted = boostHeld || snake.boost > 0;
  const speed = snake.speed * (boosted ? 1.55 : 1) * (snake.relic?.name === "gravity jaw" ? 1.15 : 1);
  snake.angle = turnToward(snake.angle, snake.targetAngle, dt * (snake.ai ? snake.ai.turn : 5.7));
  snake.vx = Math.cos(snake.angle) * speed;
  snake.vy = Math.sin(snake.angle) * speed;
  snake.x = clamp(snake.x + snake.vx * dt, 22, world.w - 22);
  snake.y = clamp(snake.y + snake.vy * dt, 22, world.h - 22);
  snake.mouth += dt * (boosted ? 13 : 7);
  snake.invuln = Math.max(0, snake.invuln - dt);

  if (snake.relicTime > 0) {
    snake.relicTime -= dt;
    if (snake.relicTime <= 0) snake.relic = null;
  }

  const front = snake.segments[0];
  if (!front || Math.hypot(front.x - snake.x, front.y - snake.y) > 8) {
    snake.segments.unshift({ x: snake.x, y: snake.y });
  }

  const burn = boosted && snake.desired > 18 ? 11 * dt : 0;
  snake.desired = Math.max(14, snake.desired - burn);
  while (snake.segments.length > snake.desired) snake.segments.pop();
}

function steerPlayer(dt) {
  let tx = 0;
  let ty = 0;
  if (keys.has("ArrowUp") || keys.has("w")) ty -= 1;
  if (keys.has("ArrowDown") || keys.has("s")) ty += 1;
  if (keys.has("ArrowLeft") || keys.has("a")) tx -= 1;
  if (keys.has("ArrowRight") || keys.has("d")) tx += 1;

  if (tx || ty) {
    player.targetAngle = Math.atan2(ty, tx);
  } else if (pointer.active) {
    const target = screenToWorld(pointer.x, pointer.y);
    player.targetAngle = angleTo(player, target);
  } else {
    player.targetAngle += Math.sin(performance.now() / 900) * dt * 0.18;
  }
}

function steerRival(rival, dt) {
  rival.ai.pulse += dt;
  let targetAngle = rival.targetAngle;
  const d = dist(rival, player);

  if (rival.ai.mood === "hunter" && d < 820) targetAngle = angleTo(rival, player);
  if (rival.ai.mood === "coward" && d < 520) targetAngle = angleTo(player, rival);
  if (rival.ai.mood === "thief") {
    const nearest = foods.reduce((best, food) => (!best || dist(rival, food) < dist(rival, best) ? food : best), null);
    if (nearest) targetAngle = angleTo(rival, nearest);
  }
  if (rival.ai.mood === "orbiter") {
    targetAngle = angleTo(rival, player) + Math.sin(rival.ai.pulse * 1.7) * 1.4 + Math.PI / 2;
  }
  if (rival.x < 180) targetAngle = 0;
  if (rival.x > world.w - 180) targetAngle = Math.PI;
  if (rival.y < 180) targetAngle = Math.PI / 2;
  if (rival.y > world.h - 180) targetAngle = -Math.PI / 2;

  rival.targetAngle = targetAngle + Math.sin(rival.ai.pulse * 2.4) * 0.12;
  rival.boost = d < 420 && rival.ai.mood === "hunter" ? 0.2 : Math.max(0, rival.boost - dt);
}

function eatFood(snake, food, index) {
  snake.desired += food.value * (snake === player ? 0.88 : 0.45);
  if (snake === player) {
    score += Math.round(food.value * 13 * combo);
    combo = clamp(combo + 0.035 + food.value * 0.006, 1, 9.9);
    if (food.value > 2) camera.shake = Math.max(camera.shake, 5);
  }
  addBurst(food.x, food.y, `hsl(${food.hue} 100% 65%)`, food.value > 2 ? 12 : 4, food.value > 2 ? 1.2 : 0.45);
  foods.splice(index, 1);
  spawnFood();
}

function applyRelic(snake, pickup, index) {
  snake.relic = pickup.relic;
  snake.relicTime = pickup.relic.duration;
  if (snake === player) {
    score += 150;
    camera.shake = 12;
  }
  addBurst(pickup.x, pickup.y, pickup.relic.color, 34, 1.4);
  relicPickups.splice(index, 1);
  setTimeout(spawnRelic, 1800);
}

function explodeSnake(snake, killer) {
  if (!snake.alive) return;
  snake.alive = false;
  addBurst(snake.x, snake.y, snake.color, 80, 1.8);
  for (let i = 0; i < snake.segments.length; i += 3) {
    const p = snake.segments[i];
    spawnFood(p.x + rand(-12, 12), p.y + rand(-12, 12), true);
  }
  if (snake === player) {
    gameOver = true;
    running = false;
    ui.splash.querySelector("h2").textContent = "Your waveform collapsed into delicious debris.";
    ui.splash.querySelector("p").textContent = `Final score: ${score}. Restart and make the arena regret having walls.`;
    ui.start.textContent = "Run It Back";
    ui.splash.classList.remove("hidden");
  } else if (killer === player) {
    score += Math.round(420 * combo);
    combo = clamp(combo + 0.6, 1, 9.9);
    camera.shake = 16;
    setTimeout(() => {
      const idx = rivals.indexOf(snake);
      if (idx !== -1) rivals[idx] = createSnake(rand(240, world.w - 240), rand(240, world.h - 240), `hsl(${rand(0, 360)} 95% 62%)`, {
        mood: ["hunter", "orbiter", "coward", "thief"][Math.floor(rand(0, 4))],
        turn: rand(0.8, 1.9),
        pulse: rand(0, 9)
      });
    }, 1400);
  }
}

function collideSnakeAgainstTrails(snake, snakes) {
  if (!snake.alive || snake.invuln > 0 || snake.relic?.name === "phase fang") return;
  for (const other of snakes) {
    if (!other.alive) continue;
    const start = other === snake ? 18 : 5;
    for (let i = start; i < other.segments.length; i += 3) {
      const p = other.segments[i];
      const hit = Math.hypot(snake.x - p.x, snake.y - p.y) < snake.radius + other.radius * 0.58;
      if (hit) {
        explodeSnake(snake, other === snake ? null : other);
        return;
      }
    }
  }
}

function updatePhase(dt) {
  phaseTimer -= dt;
  if (phaseTimer <= 0) {
    phaseIndex = (phaseIndex + 1) % palettes.length;
    phaseTimer = rand(13, 22);
    camera.shake = 18;
    addBurst(player.x, player.y, palettes[phaseIndex].tint, 70, 1.1);
    for (let i = 0; i < 30; i++) spawnFood(rand(200, world.w - 200), rand(200, world.h - 200), phaseIndex === 2);
  }
}

function update(dt) {
  if (!running || paused) return;
  steerPlayer(dt);
  updatePhase(dt);

  for (const rival of rivals) steerRival(rival, dt);
  const snakes = [player, ...rivals];
  for (const snake of snakes) updateSnake(snake, dt);

  if (phaseIndex === 1) {
    for (const food of foods) {
      const a = angleTo(food, player);
      const pull = clamp(260 / Math.max(80, dist(food, player)), 0, 1.8);
      food.x += Math.cos(a) * pull;
      food.y += Math.sin(a) * pull;
    }
  }

  for (const snake of snakes) {
    if (!snake.alive) continue;
    for (let i = foods.length - 1; i >= 0; i--) {
      if (Math.hypot(snake.x - foods[i].x, snake.y - foods[i].y) < snake.radius + foods[i].r + 4) eatFood(snake, foods[i], i);
    }
    for (let i = relicPickups.length - 1; i >= 0; i--) {
      if (Math.hypot(snake.x - relicPickups[i].x, snake.y - relicPickups[i].y) < snake.radius + relicPickups[i].r) applyRelic(snake, relicPickups[i], i);
    }
  }

  for (const snake of snakes) collideSnakeAgainstTrails(snake, snakes);

  combo = Math.max(1, combo - dt * 0.17);
  camera.shake = Math.max(0, camera.shake - dt * 22);
  particles = particles.filter((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.965;
    p.vy *= 0.965;
    return p.life > 0;
  });
}

function screenToWorld(x, y) {
  return { x: x + camera.x - W / 2, y: y + camera.y - H / 2 };
}

function updateCamera(dt) {
  const sx = camera.shake ? rand(-camera.shake, camera.shake) : 0;
  const sy = camera.shake ? rand(-camera.shake, camera.shake) : 0;
  camera.x = lerp(camera.x, player.x + sx, 1 - Math.pow(0.0008, dt));
  camera.y = lerp(camera.y, player.y + sy, 1 - Math.pow(0.0008, dt));
}

function drawGrid(palette, time) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  ctx.lineWidth = 1;
  ctx.strokeStyle = palette.grid;
  ctx.globalAlpha = 0.42;
  const size = 120 + Math.sin(time * 0.001) * 16;
  const startX = Math.floor((camera.x - W / 2) / size) * size;
  const endX = camera.x + W / 2;
  const startY = Math.floor((camera.y - H / 2) / size) * size;
  const endY = camera.y + H / 2;
  ctx.beginPath();
  for (let x = startX; x < endX; x += size) {
    ctx.moveTo(x, camera.y - H);
    ctx.lineTo(x + Math.sin((x + time * 0.05) * 0.01) * 16, camera.y + H);
  }
  for (let y = startY; y < endY; y += size) {
    ctx.moveTo(camera.x - W, y);
    ctx.lineTo(camera.x + W, y + Math.cos((y + time * 0.06) * 0.01) * 16);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, world.w, world.h);
  ctx.restore();
}

function drawFood(time) {
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  for (const food of foods) {
    food.spin += 0.025;
    const glow = food.r + 3 + Math.sin(time * 0.007 + food.spin) * 2;
    ctx.fillStyle = `hsl(${food.hue} 100% 60%)`;
    ctx.shadowColor = `hsl(${food.hue} 100% 62%)`;
    ctx.shadowBlur = food.value > 2 ? 18 : 9;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = food.spin + i * TAU / 5;
      const r = i % 2 ? food.r * 0.64 : glow;
      ctx.lineTo(food.x + Math.cos(a) * r, food.y + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawRelics(time) {
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  for (const pickup of relicPickups) {
    pickup.spin += 0.035;
    ctx.save();
    ctx.translate(pickup.x, pickup.y);
    ctx.rotate(pickup.spin);
    ctx.strokeStyle = pickup.relic.color;
    ctx.shadowColor = pickup.relic.color;
    ctx.shadowBlur = 28;
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = i * TAU / 6;
      const r = pickup.r + Math.sin(time * 0.006 + i) * 5;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawSnake(snake, time) {
  if (!snake.alive) return;
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0; i < snake.segments.length; i++) {
      const p = snake.segments[i];
      const wave = Math.sin(i * 0.65 + time * 0.012) * (snake === player ? 4.5 : 2.5);
      const x = p.x + Math.cos(snake.angle + Math.PI / 2) * wave;
      const y = p.y + Math.sin(snake.angle + Math.PI / 2) * wave;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = pass === 0 ? snake.color : "rgba(255,255,255,0.74)";
    ctx.globalAlpha = pass === 0 ? 0.78 : 0.28;
    ctx.lineWidth = pass === 0 ? snake.radius * 1.85 : snake.radius * 0.42;
    ctx.shadowColor = snake.color;
    ctx.shadowBlur = pass === 0 ? 24 : 0;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 30;
  ctx.shadowColor = snake.relic?.color || snake.color;
  const headPulse = 1 + Math.sin(snake.mouth) * 0.08;
  ctx.fillStyle = snake.relic?.color || snake.color;
  ctx.beginPath();
  ctx.arc(snake.x, snake.y, snake.radius * headPulse, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(snake.x + Math.cos(snake.angle - 0.42) * snake.radius * 0.58, snake.y + Math.sin(snake.angle - 0.42) * snake.radius * 0.58, 2.5, 0, TAU);
  ctx.arc(snake.x + Math.cos(snake.angle + 0.42) * snake.radius * 0.58, snake.y + Math.sin(snake.angle + 0.42) * snake.radius * 0.58, 2.5, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawParticles() {
  ctx.save();
  ctx.translate(W / 2 - camera.x, H / 2 - camera.y);
  ctx.globalCompositeOperation = "lighter";
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

function drawVignette(palette) {
  const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.1, W / 2, H / 2, Math.max(W, H) * 0.72);
  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(0.56, "rgba(255,255,255,0)");
  g.addColorStop(1, "rgba(0,0,0,0.72)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = palette.tint;
  ctx.globalAlpha = 0.035 + combo * 0.004;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;
}

function render(time) {
  const palette = palettes[phaseIndex];
  drawGrid(palette, time);
  drawFood(time);
  drawRelics(time);
  for (const rival of rivals) drawSnake(rival, time);
  drawSnake(player, time);
  drawParticles();
  drawVignette(palette);
}

function updateUi() {
  ui.score.textContent = score.toLocaleString();
  ui.length.textContent = Math.round(player.desired).toString();
  ui.combo.textContent = `x${combo.toFixed(1)}`;
  ui.phase.textContent = palettes[phaseIndex].name;
  if (player.relic) {
    ui.powerLabel.textContent = player.relic.name;
    ui.powerFill.style.width = `${clamp(player.relicTime / player.relic.duration, 0, 1) * 100}%`;
  } else {
    ui.powerLabel.textContent = "no relic";
    ui.powerFill.style.width = "0%";
  }
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

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  keys.add(event.key);
  if (event.key === "p") togglePause();
  if (event.key === "Enter" && gameOver) reset();
});
window.addEventListener("keyup", (event) => keys.delete(event.key));
canvas.addEventListener("pointermove", (event) => {
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});
canvas.addEventListener("pointerdown", (event) => {
  pointer.active = true;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  keys.add(" ");
});
canvas.addEventListener("pointerup", () => keys.delete(" "));
canvas.addEventListener("pointerleave", () => {
  pointer.active = false;
  keys.delete(" ");
});

function togglePause() {
  if (!running) return;
  paused = !paused;
  ui.pause.textContent = paused ? "Resume" : "Pause";
}

ui.start.addEventListener("click", reset);
ui.restart.addEventListener("click", reset);
ui.pause.addEventListener("click", togglePause);

resize();
reset();
running = false;
ui.splash.classList.remove("hidden");
requestAnimationFrame(loop);
