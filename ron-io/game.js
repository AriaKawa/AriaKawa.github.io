(() => {
  const canvas = document.getElementById("arena");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("score");
  const lengthEl = document.getElementById("length");
  const kosEl = document.getElementById("kos");
  const bestEl = document.getElementById("best");
  const boostLabel = document.getElementById("boostLabel");
  const boostFill = document.getElementById("boostFill");
  const menu = document.getElementById("menu");
  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");
  const restartBtn = document.getElementById("restart");

  const world = { w: 86, h: 54 };
  const dirs = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  const colors = ["#ff2bd6", "#ffd166", "#8fff64", "#a978ff", "#ff6b6b", "#52f26d", "#ff9f1c"];
  const keyDirs = {
    ArrowUp: "up",
    KeyW: "up",
    ArrowDown: "down",
    KeyS: "down",
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right"
  };

  let dpr = 1;
  let cell = 12;
  let offsetX = 0;
  let offsetY = 0;
  let running = false;
  let paused = false;
  let gameOver = false;
  let last = 0;
  let accumulator = 0;
  let baseStep = 74;
  let boostHeld = false;
  let player;
  let bots = [];
  let pickups = [];
  let particles = [];
  let occupied = new Map();
  let score = 0;
  let kos = 0;
  let best = readBest();

  bestEl.textContent = best.toString();

  function readBest() {
    try {
      return Number(localStorage.getItem("ronIoBest") || 0);
    } catch (error) {
      return 0;
    }
  }

  function writeBest(value) {
    best = Math.max(best, value);
    bestEl.textContent = best.toString();
    try {
      localStorage.setItem("ronIoBest", String(best));
    } catch (error) {
      // Local storage can be unavailable in private contexts; the run still works.
    }
  }

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = Math.max(9, Math.min(window.innerWidth / world.w, window.innerHeight / world.h));
    offsetX = (window.innerWidth - world.w * cell) / 2;
    offsetY = (window.innerHeight - world.h * cell) / 2;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  function opposite(a, b) {
    return dirs[a].x + dirs[b].x === 0 && dirs[a].y + dirs[b].y === 0;
  }

  function createRider(id, x, y, dir, color, isPlayer = false) {
    return {
      id,
      x,
      y,
      dir,
      nextDir: dir,
      color,
      alive: true,
      isPlayer,
      maxTrail: isPlayer ? 28 : 22 + Math.floor(Math.random() * 16),
      trail: [],
      brain: Math.random() * 1000,
      respawn: 0
    };
  }

  function reset() {
    running = true;
    paused = false;
    gameOver = false;
    score = 0;
    kos = 0;
    accumulator = 0;
    baseStep = 74;
    occupied.clear();
    pickups = [];
    particles = [];
    player = createRider("player", 42, 28, "right", "#33f4ff", true);
    bots = [
      createRider("bot-a", 17, 14, "right", colors[0]),
      createRider("bot-b", 68, 12, "down", colors[1]),
      createRider("bot-c", 70, 40, "left", colors[2]),
      createRider("bot-d", 20, 42, "up", colors[3]),
      createRider("bot-e", 48, 11, "left", colors[4]),
      createRider("bot-f", 12, 28, "down", colors[5])
    ];
    seedTrail(player, 10);
    bots.forEach((bot) => seedTrail(bot, 8));
    while (pickups.length < 26) spawnPickup();
    menu.classList.add("is-hidden");
    pauseBtn.textContent = "Pause";
    syncHud();
  }

  function seedTrail(rider, amount) {
    const dir = dirs[rider.dir];
    for (let i = amount; i >= 0; i -= 1) {
      const x = rider.x - dir.x * i;
      const y = rider.y - dir.y * i;
      if (inside(x, y)) {
        rider.trail.push({ x, y });
        occupied.set(key(x, y), rider.id);
      }
    }
  }

  function inside(x, y) {
    return x > 0 && x < world.w - 1 && y > 0 && y < world.h - 1;
  }

  function randomOpenCell() {
    for (let tries = 0; tries < 500; tries += 1) {
      const x = 3 + Math.floor(Math.random() * (world.w - 6));
      const y = 3 + Math.floor(Math.random() * (world.h - 6));
      if (!occupied.has(key(x, y)) && !pickupAt(x, y)) return { x, y };
    }
    return { x: 4, y: 4 };
  }

  function spawnPickup(x, y, rich = false) {
    const spot = x === undefined ? randomOpenCell() : { x, y };
    pickups.push({
      x: spot.x,
      y: spot.y,
      value: rich ? 5 : 2 + Math.floor(Math.random() * 3),
      phase: Math.random() * Math.PI * 2
    });
  }

  function pickupAt(x, y) {
    return pickups.find((pickup) => pickup.x === x && pickup.y === y);
  }

  function setDirection(dir) {
    if (!running || paused || gameOver || !player.alive) return;
    if (!opposite(player.dir, dir)) player.nextDir = dir;
  }

  function step() {
    if (!running || paused || gameOver) return;
    const riders = [player, ...bots];
    bots.forEach(updateBotBrain);
    riders.forEach((rider) => {
      if (rider.alive) moveRider(rider);
      else if (!rider.isPlayer) tickRespawn(rider);
    });
    while (pickups.length < 26) spawnPickup();
    baseStep = Math.max(52, 74 - Math.floor(score / 240) * 2);
    syncHud();
  }

  function updateBotBrain(bot) {
    if (!bot.alive) return;
    bot.brain -= 1;
    const options = ["up", "down", "left", "right"].filter((dir) => !opposite(bot.dir, dir));
    const safe = options.filter((dir) => isSafe(bot.x + dirs[dir].x, bot.y + dirs[dir].y, bot.id));
    if (!isSafe(bot.x + dirs[bot.dir].x, bot.y + dirs[bot.dir].y, bot.id) || bot.brain <= 0 || Math.random() < 0.08) {
      const target = nearestPickup(bot);
      const sorted = safe.sort((a, b) => distanceAfter(bot, a, target) - distanceAfter(bot, b, target));
      bot.nextDir = sorted[0] || options[Math.floor(Math.random() * options.length)] || bot.dir;
      bot.brain = 4 + Math.random() * 18;
    }
  }

  function nearestPickup(bot) {
    return pickups.reduce((bestPickup, pickup) => {
      if (!bestPickup) return pickup;
      return Math.abs(pickup.x - bot.x) + Math.abs(pickup.y - bot.y) < Math.abs(bestPickup.x - bot.x) + Math.abs(bestPickup.y - bot.y)
        ? pickup
        : bestPickup;
    }, null);
  }

  function distanceAfter(rider, dir, target) {
    if (!target) return Math.random() * 10;
    return Math.abs(rider.x + dirs[dir].x - target.x) + Math.abs(rider.y + dirs[dir].y - target.y);
  }

  function isSafe(x, y, riderId) {
    if (!inside(x, y)) return false;
    const owner = occupied.get(key(x, y));
    return !owner || owner === riderId && Math.random() < 0.03;
  }

  function moveRider(rider) {
    if (!opposite(rider.dir, rider.nextDir)) rider.dir = rider.nextDir;
    const dir = dirs[rider.dir];
    const nextX = rider.x + dir.x;
    const nextY = rider.y + dir.y;
    const nextKey = key(nextX, nextY);
    const crashOwner = occupied.get(nextKey);

    if (!inside(nextX, nextY) || crashOwner) {
      wreck(rider, crashOwner);
      return;
    }

    rider.x = nextX;
    rider.y = nextY;
    rider.trail.push({ x: nextX, y: nextY });
    occupied.set(nextKey, rider.id);

    const pickup = pickupAt(nextX, nextY);
    if (pickup) collect(rider, pickup);

    const burn = rider.isPlayer && boostHeld && rider.maxTrail > 18 ? 2 : 1;
    trimTrail(rider, burn);
  }

  function trimTrail(rider, burn = 1) {
    const limit = Math.max(6, rider.maxTrail);
    while (rider.trail.length > limit) {
      for (let i = 0; i < burn && rider.trail.length > limit; i += 1) {
        const tail = rider.trail.shift();
        occupied.delete(key(tail.x, tail.y));
      }
    }
  }

  function collect(rider, pickup) {
    const index = pickups.indexOf(pickup);
    if (index >= 0) pickups.splice(index, 1);
    rider.maxTrail += pickup.value;
    burst(pickup.x, pickup.y, rider.color, 8);
    if (rider.isPlayer) {
      score += pickup.value * 12;
      writeBest(score);
    }
  }

  function wreck(rider, crashOwner) {
    rider.alive = false;
    burst(rider.x, rider.y, rider.color, 26);
    for (let i = 0; i < Math.min(8, rider.trail.length); i += 1) {
      const segment = rider.trail[Math.floor(Math.random() * rider.trail.length)];
      if (segment) spawnPickup(segment.x, segment.y, true);
    }
    rider.trail.forEach((segment) => occupied.delete(key(segment.x, segment.y)));
    rider.trail = [];

    if (rider.isPlayer) {
      gameOver = true;
      running = false;
      writeBest(score);
      menu.querySelector("h2").textContent = "Derezzed on the grid.";
      menu.querySelector("p:not(.eyebrow)").textContent = `Final score ${score}. Your laser reached ${player.maxTrail} cells with ${kos} KOs.`;
      startBtn.textContent = "Run It Back";
      menu.classList.remove("is-hidden");
    } else {
      rider.respawn = 32;
      if (crashOwner === "player") {
        kos += 1;
        score += 150;
        player.maxTrail += 8;
        writeBest(score);
      }
    }
  }

  function tickRespawn(bot) {
    bot.respawn -= 1;
    if (bot.respawn > 0) return;
    const spot = randomOpenCell();
    bot.x = spot.x;
    bot.y = spot.y;
    bot.dir = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
    bot.nextDir = bot.dir;
    bot.maxTrail = 22 + Math.floor(Math.random() * 16);
    bot.alive = true;
    seedTrail(bot, 5);
  }

  function burst(x, y, color, amount) {
    for (let i = 0; i < amount; i += 1) {
      particles.push({
        x: x + 0.5,
        y: y + 0.5,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        life: 24 + Math.random() * 20,
        color
      });
    }
  }

  function syncHud() {
    scoreEl.textContent = score.toString();
    lengthEl.textContent = player ? player.maxTrail.toString() : "28";
    kosEl.textContent = kos.toString();
    const boostLevel = player ? Math.max(0, Math.min(1, (player.maxTrail - 18) / 42)) : 1;
    boostFill.style.transform = `scaleX(${boostLevel})`;
    boostLabel.textContent = boostHeld && boostLevel > 0.02 ? "Burning" : boostLevel > 0.18 ? "Ready" : "Low";
  }

  function updateParticles() {
    particles = particles.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;
      return particle.life > 0;
    });
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawBackdrop(time);
    drawPickups(time);
    [...bots, player].forEach((rider) => rider && drawRider(rider));
    drawParticles();
    if (paused) drawBanner("Paused");
    requestAnimationFrame(loop);
  }

  function drawBackdrop(time) {
    ctx.fillStyle = "#030711";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.fillStyle = "rgba(2, 9, 20, 0.8)";
    ctx.fillRect(0, 0, world.w * cell, world.h * cell);
    ctx.strokeStyle = "rgba(51, 244, 255, 0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= world.w; x += 2) {
      ctx.beginPath();
      ctx.moveTo(x * cell, 0);
      ctx.lineTo(x * cell, world.h * cell);
      ctx.stroke();
    }
    for (let y = 0; y <= world.h; y += 2) {
      ctx.beginPath();
      ctx.moveTo(0, y * cell);
      ctx.lineTo(world.w * cell, y * cell);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(51, 244, 255, 0.76)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#33f4ff";
    ctx.shadowBlur = 16 + Math.sin(time / 300) * 4;
    ctx.strokeRect(cell, cell, (world.w - 2) * cell, (world.h - 2) * cell);
    ctx.restore();
  }

  function drawPickups(time) {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    pickups.forEach((pickup) => {
      const pulse = 0.25 + Math.sin(time / 180 + pickup.phase) * 0.1;
      const x = (pickup.x + 0.5) * cell;
      const y = (pickup.y + 0.5) * cell;
      ctx.fillStyle = pickup.value > 4 ? "#ffd166" : "#ffffff";
      ctx.shadowColor = pickup.value > 4 ? "#ffd166" : "#33f4ff";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(x, y, cell * pulse, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawRider(rider) {
    if (!rider || !rider.alive) return;
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = rider.color;
    ctx.shadowBlur = rider.isPlayer ? 22 : 14;
    for (let i = 1; i < rider.trail.length; i += 1) {
      const a = rider.trail[i - 1];
      const b = rider.trail[i];
      const alpha = 0.24 + i / rider.trail.length * 0.76;
      ctx.strokeStyle = hexToRgba(rider.color, alpha);
      ctx.lineWidth = rider.isPlayer ? Math.max(3, cell * 0.4) : Math.max(2, cell * 0.32);
      ctx.beginPath();
      ctx.moveTo((a.x + 0.5) * cell, (a.y + 0.5) * cell);
      ctx.lineTo((b.x + 0.5) * cell, (b.y + 0.5) * cell);
      ctx.stroke();
    }
    const x = (rider.x + 0.5) * cell;
    const y = (rider.y + 0.5) * cell;
    ctx.fillStyle = "#041019";
    ctx.strokeStyle = rider.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, cell * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = rider.color;
    const nose = dirs[rider.dir];
    ctx.beginPath();
    ctx.arc(x + nose.x * cell * 0.24, y + nose.y * cell * 0.24, cell * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParticles() {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    particles.forEach((particle) => {
      ctx.globalAlpha = Math.max(0, particle.life / 42);
      ctx.fillStyle = particle.color;
      ctx.shadowColor = particle.color;
      ctx.shadowBlur = 12;
      ctx.fillRect(particle.x * cell - 2, particle.y * cell - 2, 4, 4);
    });
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function drawBanner(text) {
    ctx.save();
    ctx.fillStyle = "rgba(3, 7, 17, 0.62)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#edfaff";
    ctx.font = "900 42px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.shadowColor = "#33f4ff";
    ctx.shadowBlur = 20;
    ctx.fillText(text, window.innerWidth / 2, window.innerHeight / 2);
    ctx.restore();
  }

  function hexToRgba(hex, alpha) {
    const clean = hex.replace("#", "");
    const value = parseInt(clean, 16);
    const r = value >> 16 & 255;
    const g = value >> 8 & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function loop(time) {
    const delta = Math.min(80, time - last || 16);
    last = time;
    if (running && !paused && !gameOver) {
      accumulator += delta;
      updateParticles();
      const stepTime = boostHeld && player && player.maxTrail > 18 ? baseStep * 0.58 : baseStep;
      if (boostHeld && player && player.maxTrail > 18 && Math.random() < 0.36) player.maxTrail -= 1;
      while (accumulator >= stepTime) {
        step();
        accumulator -= stepTime;
      }
    }
    draw(time);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    if (keyDirs[event.code]) {
      event.preventDefault();
      setDirection(keyDirs[event.code]);
    }
    if (event.code === "Space" || event.code === "ShiftLeft" || event.code === "ShiftRight") {
      event.preventDefault();
      boostHeld = true;
    }
    if (event.code === "KeyP") togglePause();
    if (event.code === "Enter" && (!running || gameOver)) reset();
  });
  window.addEventListener("keyup", (event) => {
    if (event.code === "Space" || event.code === "ShiftLeft" || event.code === "ShiftRight") boostHeld = false;
  });

  document.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("pointerdown", () => setDirection(button.dataset.dir));
  });

  function togglePause() {
    if (!running || gameOver) return;
    paused = !paused;
    pauseBtn.textContent = paused ? "Resume" : "Pause";
  }

  startBtn.addEventListener("click", reset);
  restartBtn.addEventListener("click", reset);
  pauseBtn.addEventListener("click", togglePause);

  resize();
  reset();
  running = false;
  menu.classList.remove("is-hidden");
  requestAnimationFrame(loop);
})();
