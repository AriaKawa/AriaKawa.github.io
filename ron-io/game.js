(() => {
  const canvas = document.getElementById("arena");
  const ctx = canvas.getContext("2d");
  const minimap = document.getElementById("minimap");
  const mini = minimap.getContext("2d");
  const scoreEl = document.getElementById("score");
  const lengthEl = document.getElementById("length");
  const kosEl = document.getElementById("kos");
  const bestEl = document.getElementById("best");
  const hopLabel = document.getElementById("hopLabel");
  const hopFill = document.getElementById("hopFill");
  const leaderboardEl = document.getElementById("leaderboard");
  const menu = document.getElementById("menu");
  const startBtn = document.getElementById("start");

  const world = { w: 190, h: 125 };
  const cell = 16;
  const gateSize = 13;
  const gateTop = Math.floor(world.h / 2 - gateSize / 2);
  const gateBottom = gateTop + gateSize;
  const dirs = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  const colors = ["#ff2bd6", "#ffd166", "#8fff64", "#a978ff", "#ff6b6b", "#52f26d", "#ff9f1c", "#ff7bf1", "#7cf7ff", "#b5ff3d", "#ffbd59", "#7c8cff", "#f45d7b"];
  const names = ["Byte", "Vanta", "Cipher", "Flux", "Arc", "Glint", "Vector", "Prism", "Quanta", "Ghost", "Volt", "Nova", "Pixel"];
  const bikeSkins = [
    { name: "Circuit Ronin", chassis: "#061b25", accent: "#ffffff", visor: "#33f4ff", trim: "#ff2bd6" },
    { name: "Hotwire", chassis: "#210513", accent: "#ffd166", visor: "#ff2bd6", trim: "#ff6b6b" },
    { name: "Volt Fang", chassis: "#102006", accent: "#edff8c", visor: "#8fff64", trim: "#33f4ff" },
    { name: "Purple Ghost", chassis: "#120b28", accent: "#efe7ff", visor: "#a978ff", trim: "#ff7bf1" },
    { name: "Solar Blade", chassis: "#251105", accent: "#fff1bb", visor: "#ff9f1c", trim: "#ffd166" },
    { name: "Blue Shift", chassis: "#061427", accent: "#dff7ff", visor: "#7cf7ff", trim: "#7c8cff" }
  ];
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
  const tunnels = [
    { a: { x: 30, y: 22 }, b: { x: 156, y: 96 }, color: "#33f4ff" },
    { a: { x: 151, y: 28 }, b: { x: 42, y: 103 }, color: "#ff2bd6" },
    { a: { x: 94, y: 17 }, b: { x: 99, y: 110 }, color: "#ffd166" }
  ];

  let dpr = 1;
  let running = false;
  let gameOver = false;
  let last = 0;
  let lastRender = 0;
  let accumulator = 0;
  let stepMs = 74;
  let camera = { x: 0, y: 0 };
  let viewport = { w: 0, h: 0 };
  let frameCount = 0;
  let leaderboardTick = 0;
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
    dpr = 1;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    viewport.w = window.innerWidth;
    viewport.h = window.innerHeight;
    minimap.width = Math.floor(minimap.clientWidth * dpr);
    minimap.height = Math.floor(minimap.clientHeight * dpr);
    mini.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  function opposite(a, b) {
    return dirs[a].x + dirs[b].x === 0 && dirs[a].y + dirs[b].y === 0;
  }

  function createRider(id, name, x, y, dir, color, isPlayer = false, skinIndex = 0) {
    return {
      id,
      name,
      x,
      y,
      prevX: x,
      prevY: y,
      dir,
      nextDir: dir,
      color,
      alive: true,
      isPlayer,
      maxTrail: isPlayer ? 36 : 28 + Math.floor(Math.random() * 22),
      trail: [],
      brain: Math.random() * 30,
      respawn: 0,
      points: 0,
      hopCharge: isPlayer ? 0 : Math.random() * 0.7,
      hopQueued: false,
      ghost: 0,
      skin: bikeSkins[skinIndex % bikeSkins.length]
    };
  }

  function reset() {
    running = true;
    gameOver = false;
    score = 0;
    kos = 0;
    accumulator = 0;
    lastRender = 0;
    frameCount = 0;
    leaderboardTick = 0;
    stepMs = 74;
    occupied.clear();
    pickups = [];
    particles = [];
    player = createRider("player", "YOU", 95, 62, "right", "#33f4ff", true, 0);
    bots = names.slice(0, 6).map((name, index) => {
      const spot = randomOpenCell(24);
      return createRider(`bot-${index}`, name, spot.x, spot.y, ["up", "down", "left", "right"][index % 4], colors[index % colors.length], false, index + 1);
    });
    seedTrail(player, 10);
    bots.forEach((bot) => seedTrail(bot, 7));
    while (pickups.length < 60) spawnPickup();
    menu.classList.add("is-hidden");
    syncCamera(true);
    syncHud();
  }

  function seedTrail(rider, amount) {
    const dir = dirs[rider.dir];
    for (let i = amount; i >= 0; i -= 1) {
      const x = rider.x - dir.x * i;
      const y = rider.y - dir.y * i;
      if (isFloor(x, y) && !occupied.has(key(x, y))) {
        rider.trail.push({ x, y });
        occupied.set(key(x, y), rider.id);
      }
    }
  }

  function isGateY(y) {
    return y >= gateTop && y <= gateBottom;
  }

  function isFloor(x, y) {
    return x > 0 && x < world.w - 1 && y > 0 && y < world.h - 1;
  }

  function resolveEdge(x, y) {
    if (x < 1 && isGateY(y)) return { x: world.w - 2, y, wrapped: true };
    if (x > world.w - 2 && isGateY(y)) return { x: 1, y, wrapped: true };
    return { x, y, wrapped: false };
  }

  function randomOpenCell(minPlayerDistance = 0) {
    for (let tries = 0; tries < 1200; tries += 1) {
      const x = 3 + Math.floor(Math.random() * (world.w - 6));
      const y = 3 + Math.floor(Math.random() * (world.h - 6));
      const farEnough = !player || distance({ x, y }, player) >= minPlayerDistance;
      if (farEnough && !occupied.has(key(x, y)) && !pickupAt(x, y) && !tunnelAt(x, y)) return { x, y };
    }
    return { x: 4, y: 4 };
  }

  function distance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function spawnPickup(x, y, rich = false) {
    const spot = x === undefined ? randomOpenCell(16) : { x, y };
    pickups.push({
      x: spot.x,
      y: spot.y,
      value: rich ? 6 : 2 + Math.floor(Math.random() * 4),
      phase: Math.random() * Math.PI * 2
    });
  }

  function pickupAt(x, y) {
    return pickups.find((pickup) => pickup.x === x && pickup.y === y);
  }

  function tunnelAt(x, y) {
    for (const tunnel of tunnels) {
      if (tunnel.a.x === x && tunnel.a.y === y) return { tunnel, exit: tunnel.b };
      if (tunnel.b.x === x && tunnel.b.y === y) return { tunnel, exit: tunnel.a };
    }
    return null;
  }

  function setDirection(dir) {
    if (!running || gameOver || !player.alive) return;
    if (!opposite(player.dir, dir)) player.nextDir = dir;
  }

  function queueHop() {
    if (!running || gameOver || !player.alive) return;
    if (player.hopCharge >= 1) player.hopQueued = true;
  }

  function step() {
    if (!running || gameOver) return;
    bots.forEach(updateBotBrain);
    [player, ...bots].forEach((rider) => {
      if (rider.alive) moveRider(rider);
      else if (!rider.isPlayer) tickRespawn(rider);
    });
    while (pickups.length < 60) spawnPickup();
    stepMs = Math.max(56, 74 - Math.floor(score / 900) * 2);
    syncHud();
  }

  function updateBotBrain(bot) {
    if (!bot.alive) return;
    bot.brain -= 1;
    bot.hopCharge = Math.min(1, bot.hopCharge + 0.004);
    const options = ["up", "down", "left", "right"].filter((dir) => !opposite(bot.dir, dir));
    const safe = options.filter((dir) => canMoveInto(bot, bot.x + dirs[dir].x, bot.y + dirs[dir].y));
    const ahead = getForward(bot, 1);
    const dangerAhead = !canMoveInto(bot, ahead.x, ahead.y);
    if (dangerAhead && bot.hopCharge >= 1 && occupied.has(key(ahead.x, ahead.y)) && Math.random() < 0.55) bot.hopQueued = true;
    if (dangerAhead || bot.brain <= 0 || Math.random() < 0.045) {
      const target = nearestPickup(bot);
      safe.sort((a, b) => distanceAfter(bot, a, target) - distanceAfter(bot, b, target));
      bot.nextDir = safe[0] || options[Math.floor(Math.random() * options.length)] || bot.dir;
      bot.brain = 6 + Math.random() * 22;
    }
  }

  function nearestPickup(bot) {
    return pickups.reduce((bestPickup, pickup) => {
      if (!bestPickup) return pickup;
      return distance(pickup, bot) < distance(bestPickup, bot) ? pickup : bestPickup;
    }, null);
  }

  function distanceAfter(rider, dir, target) {
    if (!target) return Math.random() * 10;
    return Math.abs(rider.x + dirs[dir].x - target.x) + Math.abs(rider.y + dirs[dir].y - target.y);
  }

  function canMoveInto(rider, x, y) {
    const edge = resolveEdge(x, y);
    if (!isFloor(edge.x, edge.y)) return false;
    const owner = occupied.get(key(edge.x, edge.y));
    return !owner || owner === rider.id && Math.random() < 0.02;
  }

  function getForward(rider, amount) {
    const dir = dirs[rider.nextDir || rider.dir];
    return { x: rider.x + dir.x * amount, y: rider.y + dir.y * amount };
  }

  function moveRider(rider) {
    if (!opposite(rider.dir, rider.nextDir)) rider.dir = rider.nextDir;
    if (rider.ghost > 0) rider.ghost -= 1;
    rider.hopCharge = Math.min(1, rider.hopCharge + (rider.isPlayer ? 0.0055 : 0.004));

    const dir = dirs[rider.dir];
    let next = resolveEdge(rider.x + dir.x, rider.y + dir.y);
    let nextKey = key(next.x, next.y);
    let crashOwner = occupied.get(nextKey);

    if ((!isFloor(next.x, next.y) || crashOwner) && tryHop(rider, next, crashOwner)) return;

    if (!isFloor(next.x, next.y) || crashOwner) {
      wreck(rider, crashOwner);
      return;
    }

    placeRider(rider, next.x, next.y, next.wrapped);
  }

  function tryHop(rider, blockedCell, crashOwner) {
    if (!rider.hopQueued || rider.hopCharge < 1 || !crashOwner) return false;
    const dir = dirs[rider.dir];
    const landing = resolveEdge(blockedCell.x + dir.x, blockedCell.y + dir.y);
    if (!isFloor(landing.x, landing.y) || occupied.has(key(landing.x, landing.y))) return false;
    rider.hopQueued = false;
    rider.hopCharge = 0;
    rider.ghost = 6;
    burst(blockedCell.x, blockedCell.y, rider.color, 18);
    placeRider(rider, landing.x, landing.y, true);
    if (rider.isPlayer) score += 35;
    return true;
  }

  function placeRider(rider, x, y, skipLine = false) {
    const fromX = rider.x;
    const fromY = rider.y;
    let targetX = x;
    let targetY = y;
    const tunnel = tunnelAt(targetX, targetY);
    if (tunnel) {
      burst(targetX, targetY, tunnel.tunnel.color, 18);
      targetX = tunnel.exit.x;
      targetY = tunnel.exit.y;
      skipLine = true;
      burst(targetX, targetY, tunnel.tunnel.color, 18);
    }

    const riderKey = key(targetX, targetY);
    if (occupied.has(riderKey)) {
      wreck(rider, occupied.get(riderKey));
      return;
    }

    rider.prevX = skipLine ? targetX : fromX;
    rider.prevY = skipLine ? targetY : fromY;
    rider.x = targetX;
    rider.y = targetY;
    rider.trail.push({ x: rider.x, y: rider.y, skip: skipLine });
    occupied.set(riderKey, rider.id);
    const pickup = pickupAt(rider.x, rider.y);
    if (pickup) collect(rider, pickup);
    trimTrail(rider);
  }

  function trimTrail(rider) {
    const limit = Math.max(6, rider.maxTrail);
    while (rider.trail.length > limit) {
      const tail = rider.trail.shift();
      occupied.delete(key(tail.x, tail.y));
    }
  }

  function collect(rider, pickup) {
    const index = pickups.indexOf(pickup);
    if (index >= 0) pickups.splice(index, 1);
    rider.maxTrail += pickup.value;
    rider.points += pickup.value * 10;
    rider.hopCharge = Math.min(1, rider.hopCharge + pickup.value * 0.025);
    burst(pickup.x, pickup.y, rider.color, 8);
    if (rider.isPlayer) {
      score += pickup.value * 12;
      writeBest(score);
    }
  }

  function wreck(rider, crashOwner) {
    rider.alive = false;
    burst(rider.x, rider.y, rider.color, 28);
    for (let i = 0; i < Math.min(10, rider.trail.length); i += 1) {
      const segment = rider.trail[Math.floor(Math.random() * rider.trail.length)];
      if (segment) spawnPickup(segment.x, segment.y, true);
    }
    rider.trail.forEach((segment) => occupied.delete(key(segment.x, segment.y)));
    rider.trail = [];

    if (rider.isPlayer) {
      gameOver = true;
      running = false;
      writeBest(score);
      menu.querySelector("h1").textContent = "Derezzed.";
      menu.querySelector("p:not(.eyebrow)").textContent = `Final score ${score}. Your laser reached ${player.maxTrail} cells with ${kos} KOs.`;
      startBtn.textContent = "Run It Back";
      menu.classList.remove("is-hidden");
    } else {
      rider.respawn = 45;
      if (crashOwner === "player") {
        kos += 1;
        score += 180;
        player.maxTrail += 9;
        player.hopCharge = Math.min(1, player.hopCharge + 0.28);
        writeBest(score);
      }
    }
  }

  function tickRespawn(bot) {
    bot.respawn -= 1;
    if (bot.respawn > 0) return;
    const spot = randomOpenCell(28);
    bot.x = spot.x;
    bot.y = spot.y;
    bot.prevX = spot.x;
    bot.prevY = spot.y;
    bot.dir = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
    bot.nextDir = bot.dir;
    bot.maxTrail = 28 + Math.floor(Math.random() * 22);
    bot.hopCharge = Math.random() * 0.35;
    bot.alive = true;
    seedTrail(bot, 5);
  }

  function burst(x, y, color, amount) {
    for (let i = 0; i < amount; i += 1) {
      particles.push({
        x: x + 0.5,
        y: y + 0.5,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        life: 24 + Math.random() * 22,
        color
      });
    }
  }

  function syncHud() {
    scoreEl.textContent = score.toString();
    lengthEl.textContent = player ? player.maxTrail.toString() : "36";
    kosEl.textContent = kos.toString();
    const hop = player ? player.hopCharge : 0;
    hopFill.style.transform = `scaleX(${Math.max(0, Math.min(1, hop))})`;
    hopLabel.textContent = hop >= 1 ? "Ready" : `${Math.floor(hop * 100)}%`;
    leaderboardTick += 1;
    if (leaderboardTick % 5 === 0) renderLeaderboard();
  }

  function renderLeaderboard() {
    const riders = [player, ...bots].filter(Boolean).map((rider) => ({
      name: rider.name,
      color: rider.color,
      value: Math.floor((rider.isPlayer ? score : rider.points) + rider.maxTrail * 4 + (rider.alive ? 25 : 0)),
      alive: rider.alive
    })).sort((a, b) => b.value - a.value).slice(0, 8);
    leaderboardEl.innerHTML = riders.map((rider, index) => `
      <li style="color:${rider.color}">
        <small>${index + 1}</small>
        <span>${rider.name}${rider.alive ? "" : " RIP"}</span>
        <small>${rider.value}</small>
      </li>
    `).join("");
  }

  function updateParticles() {
    particles = particles.filter((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 1;
      return particle.life > 0;
    });
  }

  function syncCamera(force = false) {
    if (!player) return;
    const targetX = player.x * cell - viewport.w / 2;
    const targetY = player.y * cell - viewport.h / 2;
    const maxX = world.w * cell - viewport.w;
    const maxY = world.h * cell - viewport.h;
    const clampedX = Math.max(0, Math.min(maxX, targetX));
    const clampedY = Math.max(0, Math.min(maxY, targetY));
    if (force) {
      camera.x = clampedX;
      camera.y = clampedY;
    } else {
      camera.x += (clampedX - camera.x) * 0.12;
      camera.y += (clampedY - camera.y) * 0.12;
    }
  }

  function toScreen(x, y) {
    return { x: x * cell - camera.x, y: y * cell - camera.y };
  }

  function draw(time = 0) {
    syncCamera();
    ctx.clearRect(0, 0, viewport.w, viewport.h);
    drawBackdrop();
    drawTunnels(time);
    drawPickups(time);
    [...bots, player].forEach((rider) => rider && drawRider(rider));
    drawParticles();
    frameCount += 1;
    if (frameCount % 8 === 0) drawMinimap();
  }

  function drawBackdrop() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, viewport.w, viewport.h);
    const start = toScreen(0, 0);
    drawWalls(start.x, start.y, world.w * cell, world.h * cell);
  }

  function drawWalls(x, y, w, h) {
    ctx.save();
    ctx.strokeStyle = "rgba(51, 244, 255, 0.82)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + cell, y + cell);
    ctx.lineTo(x + w - cell, y + cell);
    ctx.lineTo(x + w - cell, y + gateTop * cell);
    ctx.moveTo(x + w - cell, y + gateBottom * cell);
    ctx.lineTo(x + w - cell, y + h - cell);
    ctx.lineTo(x + cell, y + h - cell);
    ctx.lineTo(x + cell, y + gateBottom * cell);
    ctx.moveTo(x + cell, y + gateTop * cell);
    ctx.lineTo(x + cell, y + cell);
    ctx.stroke();

    drawGateMouth(x + cell, y, -1);
    drawGateMouth(x + w - cell, y, 1);
    ctx.restore();
  }

  function drawGateMouth(edgeX, y, side) {
    const top = y + gateTop * cell;
    const bottom = y + gateBottom * cell;
    const lip = cell * 0.95;
    ctx.strokeStyle = "rgba(255, 43, 214, 0.78)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(edgeX, top);
    ctx.lineTo(edgeX + lip * side, top);
    ctx.moveTo(edgeX, bottom);
    ctx.lineTo(edgeX + lip * side, bottom);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 43, 214, 0.72)";
    const chevronX = edgeX + lip * 0.58 * side;
    const mid = (top + bottom) / 2;
    ctx.beginPath();
    ctx.moveTo(chevronX + cell * 0.28 * side, mid);
    ctx.lineTo(chevronX - cell * 0.2 * side, mid - cell * 0.32);
    ctx.lineTo(chevronX - cell * 0.2 * side, mid + cell * 0.32);
    ctx.closePath();
    ctx.fill();
  }

  function drawTunnels(time) {
    tunnels.forEach((tunnel) => {
      [tunnel.a, tunnel.b].forEach((point) => {
        const p = toScreen(point.x + 0.5, point.y + 0.5);
        if (p.x < -60 || p.y < -60 || p.x > viewport.w + 60 || p.y > viewport.h + 60) return;
        ctx.save();
        ctx.strokeStyle = tunnel.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, cell * (0.75 + Math.sin(time / 180) * 0.06), 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, cell * 0.34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
    });
  }

  function drawPickups(time) {
    pickups.forEach((pickup) => {
      const p = toScreen(pickup.x + 0.5, pickup.y + 0.5);
      if (p.x < -30 || p.y < -30 || p.x > viewport.w + 30 || p.y > viewport.h + 30) return;
      const pulse = 0.22 + Math.sin(time / 180 + pickup.phase) * 0.08;
      ctx.fillStyle = pickup.value > 5 ? "#ffd166" : "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, cell * pulse, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawRider(rider) {
    if (!rider || !rider.alive) return;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const rendered = interpolatedRiderPosition(rider);
    const firstVisibleSegment = Math.max(1, rider.trail.length - 180);
    for (let i = firstVisibleSegment; i < rider.trail.length - 1; i += 1) {
      const a = rider.trail[i - 1];
      const b = rider.trail[i];
      if (b.skip || Math.abs(a.x - b.x) + Math.abs(a.y - b.y) > 2) continue;
      const start = toScreen(a.x + 0.5, a.y + 0.5);
      const end = toScreen(b.x + 0.5, b.y + 0.5);
      if (!lineNearScreen(start, end)) continue;
      const alpha = 0.22 + i / rider.trail.length * 0.78;
      ctx.strokeStyle = hexToRgba(rider.color, rider.ghost ? alpha * 0.42 : alpha);
      ctx.lineWidth = rider.isPlayer ? 4.5 : 3.4;
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
    drawActiveTrailSegment(rider, rendered);
    const p = toScreen(rendered.x + 0.5, rendered.y + 0.5);
    drawBike(rider, p);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function interpolatedRiderPosition(rider) {
    const distanceMoved = Math.abs(rider.x - rider.prevX) + Math.abs(rider.y - rider.prevY);
    if (distanceMoved === 0 || distanceMoved > 2) return { x: rider.x, y: rider.y };
    const t = Math.max(0, Math.min(1, accumulator / stepMs));
    const eased = t * t * (3 - 2 * t);
    return {
      x: rider.prevX + (rider.x - rider.prevX) * eased,
      y: rider.prevY + (rider.y - rider.prevY) * eased
    };
  }

  function drawActiveTrailSegment(rider, rendered) {
    if (rider.trail.length < 2) return;
    const tail = rider.trail[rider.trail.length - 2];
    const head = rider.trail[rider.trail.length - 1];
    if (head.skip || Math.abs(tail.x - head.x) + Math.abs(tail.y - head.y) > 2) return;
    const start = toScreen(tail.x + 0.5, tail.y + 0.5);
    const end = toScreen(rendered.x + 0.5, rendered.y + 0.5);
    if (!lineNearScreen(start, end)) return;
    ctx.strokeStyle = hexToRgba(rider.color, rider.ghost ? 0.36 : 0.9);
    ctx.lineWidth = rider.isPlayer ? 4.5 : 3.4;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  function drawBike(rider, p) {
    const angle = {
      right: 0,
      down: Math.PI / 2,
      left: Math.PI,
      up: -Math.PI / 2
    }[rider.dir];
    const skin = rider.skin || bikeSkins[0];
    const length = cell * (rider.isPlayer ? 1.75 : 1.55);
    const height = cell * (rider.isPlayer ? 0.78 : 0.68);
    const wheel = height * 0.34;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(angle);
    ctx.globalAlpha = rider.ghost ? 0.58 : 1;

    ctx.fillStyle = hexToRgba(rider.color, 0.16);
    ctx.fillRect(-length * 0.52, -height * 0.5, length * 0.88, height);

    ctx.fillStyle = skin.chassis;
    ctx.strokeStyle = rider.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(length * 0.54, 0);
    ctx.lineTo(length * 0.12, -height * 0.5);
    ctx.lineTo(-length * 0.48, -height * 0.34);
    ctx.lineTo(-length * 0.48, height * 0.34);
    ctx.lineTo(length * 0.12, height * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = skin.accent;
    ctx.beginPath();
    ctx.moveTo(length * 0.38, 0);
    ctx.lineTo(length * 0.12, -height * 0.18);
    ctx.lineTo(length * 0.12, height * 0.18);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = rider.color;
    ctx.fillRect(-length * 0.4, -height * 0.54, wheel, height * 0.16);
    ctx.fillRect(-length * 0.4, height * 0.38, wheel, height * 0.16);
    ctx.fillRect(length * 0.12, -height * 0.54, wheel, height * 0.16);
    ctx.fillRect(length * 0.12, height * 0.38, wheel, height * 0.16);

    ctx.restore();
  }

  function lineNearScreen(a, b) {
    return Math.max(a.x, b.x) > -40 && Math.min(a.x, b.x) < viewport.w + 40 && Math.max(a.y, b.y) > -40 && Math.min(a.y, b.y) < viewport.h + 40;
  }

  function drawParticles() {
    particles.forEach((particle) => {
      const p = toScreen(particle.x, particle.y);
      if (p.x < -30 || p.y < -30 || p.x > viewport.w + 30 || p.y > viewport.h + 30) return;
      ctx.globalAlpha = Math.max(0, particle.life / 44);
      ctx.fillStyle = particle.color;
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    });
    ctx.globalAlpha = 1;
  }

  function drawMinimap() {
    const w = minimap.clientWidth;
    const h = minimap.clientHeight;
    mini.clearRect(0, 0, w, h);
    mini.fillStyle = "#000";
    mini.fillRect(0, 0, w, h);
    const sx = w / world.w;
    const sy = h / world.h;
    mini.strokeStyle = "rgba(51, 244, 255, 0.62)";
    mini.lineWidth = 1;
    mini.strokeRect(1, 1, w - 2, h - 2);

    mini.strokeStyle = "rgba(255, 255, 255, 0.55)";
    mini.strokeRect(camera.x / cell * sx, camera.y / cell * sy, viewport.w / cell * sx, viewport.h / cell * sy);

    [...bots, player].forEach((rider) => {
      if (!rider || !rider.alive) return;
      mini.fillStyle = rider.color;
      mini.beginPath();
      mini.arc(rider.x * sx, rider.y * sy, rider.isPlayer ? 3.2 : 2.1, 0, Math.PI * 2);
      mini.fill();
    });
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
    if (running && !gameOver) {
      accumulator += delta;
      updateParticles();
      while (accumulator >= stepMs) {
        step();
        accumulator -= stepMs;
      }
    }
    if (time - lastRender >= 1000 / 60) {
      draw(time);
      lastRender = time;
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    if (keyDirs[event.code]) {
      event.preventDefault();
      setDirection(keyDirs[event.code]);
    }
    if (event.code === "Space") {
      event.preventDefault();
      queueHop();
    }
    if (event.code === "Enter" && (!running || gameOver)) reset();
  });

  document.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("pointerdown", () => setDirection(button.dataset.dir));
  });

  startBtn.addEventListener("click", reset);

  resize();
  reset();
  running = false;
  menu.classList.remove("is-hidden");
  requestAnimationFrame(loop);
})();
