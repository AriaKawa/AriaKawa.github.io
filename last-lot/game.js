(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d", { alpha: false });
  const manifest = window.LAST_LOT_ASSETS;
  const images = new Map();
  const dom = Object.fromEntries([
    "healthBar", "healthText", "weaponText", "clipText", "reserveText", "killsText", "timeText", "waveText",
    "startScreen", "pauseScreen", "gameOverScreen", "loadingScreen", "loadingBar", "loadingText", "notifications",
    "startButton", "resumeButton", "restartButton", "soundButton", "finalKills", "finalTime", "controlsPanel"
  ].map((id) => [id, document.getElementById(id)]));

  const WORLD = { width: 1680, height: 1120 };
  const SCALE = { player: 5, small: 3.6, axe: 3.1, big: 3.2, prop: 4 };
  const keys = new Set();
  const pointer = { x: canvas.width / 2, y: canvas.height / 2, down: false };
  let audioContext = null;
  let soundEnabled = true;
  let lastFrame = performance.now();
  let assetsReady = false;
  let state;

  const weapons = {
    pistol: { name: "PISTOL", clipSize: 12, rate: .27, reload: 1.05, damage: 34, speed: 760, spread: .025, pellets: 1 },
    shotgun: { name: "SHOTGUN", clipSize: 6, rate: .72, reload: 1.45, damage: 23, speed: 680, spread: .24, pellets: 6 }
  };

  const obstacleDefs = [
    { x: 145, y: 125, w: 400, h: 286, kind: "building" },
    { x: 165, y: 676, w: 300, h: 18, kind: "fenceH" },
    { x: 165, y: 936, w: 300, h: 18, kind: "fenceH" },
    { x: 150, y: 676, w: 18, h: 278, kind: "fenceV" },
    { x: 462, y: 676, w: 18, h: 104, kind: "fenceV" },
    { x: 462, y: 850, w: 18, h: 104, kind: "fenceV" },
    { x: 1045, y: 395, w: 66, h: 98, kind: "carRed", spriteX: 1078, spriteY: 444 },
    { x: 1270, y: 650, w: 74, h: 104, kind: "carBlueWreck", spriteX: 1307, spriteY: 702 },
    { x: 1110, y: 840, w: 164, h: 86, kind: "container", spriteX: 1192, spriteY: 883 },
    { x: 1360, y: 180, w: 92, h: 154, kind: "van", spriteX: 1406, spriteY: 257 },
    { x: 720, y: 220, w: 115, h: 30, kind: "barricadeH" },
    { x: 720, y: 870, w: 115, h: 30, kind: "barricadeH" }
  ];

  function blankState() {
    return {
      mode: "intro",
      time: 0,
      wave: 1,
      kills: 0,
      spawnTimer: 1.4,
      camera: { x: 0, y: 0, shake: 0 },
      player: {
        x: 820, y: 570, radius: 16, speed: 205, health: 100, maxHealth: 100,
        weapon: "pistol", direction: "right", shotTimer: 0, shotAnim: 1,
        reloadTimer: 0, hurtTimer: 0,
        ammo: { pistol: { clip: 12, reserve: 72 }, shotgun: { clip: 0, reserve: 0 } }
      },
      bullets: [],
      zombies: [],
      pickups: [
        { x: 330, y: 790, type: "food", bob: .2 },
        { x: 995, y: 900, type: "ammo", bob: 1.8 },
        { x: 1260, y: 535, type: "shotgun", bob: 3.1 }
      ],
      particles: [],
      decals: [],
      elapsedControlHint: 0
    };
  }

  function resetGame(mode = "running") {
    state = blankState();
    state.mode = mode;
    for (let i = 0; i < 2; i += 1) spawnZombie("small");
    updateCamera(1);
    updateHud();
    dom.gameOverScreen.classList.remove("screen--visible");
    dom.pauseScreen.classList.remove("screen--visible");
  }

  function flattenPaths(value, found = []) {
    if (typeof value === "string") found.push(value);
    else if (value && typeof value === "object") Object.values(value).forEach((entry) => flattenPaths(entry, found));
    return found;
  }

  async function loadAssets() {
    if (!manifest) throw new Error("Asset manifest did not load.");
    const paths = [...new Set(flattenPaths(manifest))];
    let loaded = 0;
    await Promise.all(paths.map((path) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        images.set(path, image);
        loaded += 1;
        dom.loadingBar.style.width = `${(loaded / paths.length) * 100}%`;
        dom.loadingText.textContent = `SCAVENGING ASSETS… ${loaded}/${paths.length}`;
        resolve();
      };
      image.onerror = () => reject(new Error(`Could not load ${path}`));
      image.src = path;
    })));
    assetsReady = true;
    resetGame("intro");
    dom.loadingText.textContent = "LOT SECURED";
    setTimeout(() => dom.loadingScreen.classList.add("loading--done"), 180);
  }

  function imageFor(path) { return images.get(path); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function distanceSq(a, b) { const dx = a.x - b.x; const dy = a.y - b.y; return dx * dx + dy * dy; }
  function formatTime(seconds) {
    const whole = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(whole / 60)).padStart(2, "0")}:${String(whole % 60).padStart(2, "0")}`;
  }

  function setScreen(screen, visible) { screen.classList.toggle("screen--visible", visible); }

  function notice(text, tone = "normal") {
    const element = document.createElement("div");
    element.className = "notice";
    if (tone === "danger") element.style.color = "#ef7569";
    element.textContent = text;
    dom.notifications.append(element);
    setTimeout(() => element.remove(), 2350);
  }

  function initAudio() {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume();
  }

  function sound(kind) {
    if (!soundEnabled || !audioContext) return;
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const settings = {
      pistol: [150, 70, .055, .11, "square"], shotgun: [90, 42, .11, .17, "sawtooth"],
      pickup: [520, 860, .12, .09, "square"], hurt: [85, 46, .12, .13, "sawtooth"],
      empty: [190, 150, .04, .045, "square"], reload: [260, 210, .06, .045, "square"]
    }[kind] || [220, 110, .05, .05, "square"];
    oscillator.type = settings[4];
    oscillator.frequency.setValueAtTime(settings[0], now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, settings[1]), now + settings[2]);
    gain.gain.setValueAtTime(settings[3], now);
    gain.gain.exponentialRampToValueAtTime(.001, now + settings[2]);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + settings[2]);
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(720, Math.floor(innerWidth * dpr));
    canvas.height = Math.max(420, Math.floor(innerHeight * dpr));
    ctx.imageSmoothingEnabled = false;
    pointer.x = canvas.width / 2;
    pointer.y = canvas.height / 2;
    if (state) updateCamera(1);
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) * canvas.width / rect.width;
    pointer.y = (event.clientY - rect.top) * canvas.height / rect.height;
  }

  function directionFromVector(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) return dx >= 0 ? "right" : "left";
    return dy >= 0 ? "down" : "up";
  }

  function overlapsRect(x, y, radius, rect) {
    const closestX = clamp(x, rect.x, rect.x + rect.w);
    const closestY = clamp(y, rect.y, rect.y + rect.h);
    const dx = x - closestX;
    const dy = y - closestY;
    return dx * dx + dy * dy < radius * radius;
  }

  function positionBlocked(x, y, radius) {
    if (x - radius < 28 || y - radius < 28 || x + radius > WORLD.width - 28 || y + radius > WORLD.height - 28) return true;
    return obstacleDefs.some((rect) => overlapsRect(x, y, radius, rect));
  }

  function moveEntity(entity, dx, dy) {
    let movedX = false;
    let movedY = false;
    if (!positionBlocked(entity.x + dx, entity.y, entity.radius)) { entity.x += dx; movedX = true; }
    if (!positionBlocked(entity.x, entity.y + dy, entity.radius)) { entity.y += dy; movedY = true; }
    return { movedX, movedY };
  }

  function updatePlayer(dt) {
    const player = state.player;
    let dx = (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0);
    let dy = (keys.has("KeyS") ? 1 : 0) - (keys.has("KeyW") ? 1 : 0);
    if (dx || dy) {
      const length = Math.hypot(dx, dy);
      dx /= length;
      dy /= length;
      moveEntity(player, dx * player.speed * dt, dy * player.speed * dt);
    }
    player.moving = Boolean(dx || dy);

    const aimX = pointer.x + state.camera.x - player.x;
    const aimY = pointer.y + state.camera.y - player.y;
    player.aimAngle = Math.atan2(aimY, aimX);
    player.direction = directionFromVector(aimX, aimY);
    player.shotTimer = Math.max(0, player.shotTimer - dt);
    player.shotAnim = Math.max(0, player.shotAnim - dt);
    player.hurtTimer = Math.max(0, player.hurtTimer - dt);

    if (player.reloadTimer > 0) {
      player.reloadTimer -= dt;
      if (player.reloadTimer <= 0) finishReload();
    }
    if (pointer.down) tryShoot();
  }

  function startReload() {
    const player = state.player;
    const ammo = player.ammo[player.weapon];
    const weapon = weapons[player.weapon];
    if (player.reloadTimer > 0 || ammo.clip >= weapon.clipSize || ammo.reserve <= 0 || state.mode !== "running") return;
    player.reloadTimer = weapon.reload;
    notice(`RELOADING ${weapon.name}`);
    sound("reload");
  }

  function finishReload() {
    const player = state.player;
    const ammo = player.ammo[player.weapon];
    const needed = weapons[player.weapon].clipSize - ammo.clip;
    const moved = Math.min(needed, ammo.reserve);
    ammo.clip += moved;
    ammo.reserve -= moved;
  }

  function tryShoot() {
    if (!state) return;
    const player = state.player;
    const weapon = weapons[player.weapon];
    const ammo = player.ammo[player.weapon];
    if (player.shotTimer > 0 || player.reloadTimer > 0 || state.mode !== "running") return;
    if (ammo.clip <= 0) {
      sound("empty");
      player.shotTimer = .22;
      startReload();
      return;
    }

    ammo.clip -= 1;
    player.shotTimer = weapon.rate;
    player.shotAnim = .16;
    state.camera.shake = player.weapon === "shotgun" ? 8 : 3;
    sound(player.weapon);
    for (let i = 0; i < weapon.pellets; i += 1) {
      const angle = player.aimAngle + (Math.random() - .5) * weapon.spread;
      state.bullets.push({
        x: player.x + Math.cos(angle) * 20,
        y: player.y + Math.sin(angle) * 20,
        vx: Math.cos(angle) * weapon.speed,
        vy: Math.sin(angle) * weapon.speed,
        damage: weapon.damage,
        life: .82,
        radius: player.weapon === "shotgun" ? 3 : 2
      });
    }
    burst(player.x + Math.cos(player.aimAngle) * 29, player.y + Math.sin(player.aimAngle) * 29, "#f3d16a", 3, 95);
    if (ammo.clip === 0 && ammo.reserve > 0) setTimeout(() => state.mode === "running" && startReload(), 180);
  }

  function updateBullets(dt) {
    for (const bullet of state.bullets) {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
      bullet.life -= dt;
      if (positionBlocked(bullet.x, bullet.y, bullet.radius)) bullet.life = 0;
      if (bullet.life <= 0) continue;
      for (const zombie of state.zombies) {
        if (zombie.dead) continue;
        const reach = zombie.radius + bullet.radius;
        if (distanceSq(bullet, zombie) <= reach * reach) {
          bullet.life = 0;
          zombie.health -= bullet.damage;
          zombie.flash = .08;
          burst(bullet.x, bullet.y, "#9f3d38", 5, 100);
          if (zombie.health <= 0) killZombie(zombie);
          break;
        }
      }
    }
    state.bullets = state.bullets.filter((bullet) => bullet.life > 0);
  }

  function zombieStats(type) {
    return {
      small: { health: 56, speed: 72, radius: 16, damage: 5, scale: SCALE.small },
      axe: { health: 105, speed: 56, radius: 21, damage: 10, scale: SCALE.axe },
      big: { health: 190, speed: 40, radius: 26, damage: 15, scale: SCALE.big }
    }[type];
  }

  function spawnZombie(forcedType) {
    if (!state) return;
    const roll = Math.random();
    let type = forcedType || (state.wave >= 4 && roll > .87 ? "big" : state.wave >= 2 && roll > .64 ? "axe" : "small");
    const margin = 44;
    const side = Math.floor(Math.random() * 4);
    const spawn = side === 0 ? { x: margin, y: 80 + Math.random() * (WORLD.height - 160) }
      : side === 1 ? { x: WORLD.width - margin, y: 80 + Math.random() * (WORLD.height - 160) }
        : side === 2 ? { x: 80 + Math.random() * (WORLD.width - 160), y: margin }
          : { x: 80 + Math.random() * (WORLD.width - 160), y: WORLD.height - margin };
    const stats = zombieStats(type);
    if (positionBlocked(spawn.x, spawn.y, stats.radius)) return spawnZombie(forcedType);
    state.zombies.push({ ...spawn, ...stats, maxHealth: stats.health, type, direction: "down", anim: Math.random() * 3, attackTimer: 0, flash: 0, dead: false, deathTime: 0 });
  }

  function killZombie(zombie) {
    if (zombie.dead) return;
    zombie.dead = true;
    zombie.deathTime = 0;
    state.kills += 1;
    state.decals.push({ x: zombie.x, y: zombie.y, size: zombie.radius * (1.5 + Math.random() * .5), alpha: .28 });
    burst(zombie.x, zombie.y, "#7d2428", 8, 125);
    const dropRoll = Math.random();
    if (dropRoll < .11) state.pickups.push({ x: zombie.x, y: zombie.y, type: "food", bob: Math.random() * 6 });
    else if (dropRoll < .27) state.pickups.push({ x: zombie.x, y: zombie.y, type: "ammo", bob: Math.random() * 6 });
  }

  function updateZombies(dt) {
    const player = state.player;
    for (const zombie of state.zombies) {
      zombie.anim += dt;
      zombie.flash = Math.max(0, zombie.flash - dt);
      if (zombie.dead) { zombie.deathTime += dt; continue; }

      const dx = player.x - zombie.x;
      const dy = player.y - zombie.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      zombie.direction = directionFromVector(dx, dy);
      const nx = dx / distance;
      const ny = dy / distance;
      if (distance > zombie.radius + player.radius + 3) {
        const move = moveEntity(zombie, nx * zombie.speed * dt, ny * zombie.speed * dt);
        if (!move.movedX && !move.movedY) moveEntity(zombie, -ny * zombie.speed * dt, nx * zombie.speed * dt);
      }
      zombie.attackTimer = Math.max(0, zombie.attackTimer - dt);

      if (distance < zombie.radius + player.radius + 7 && zombie.attackTimer <= 0) {
        zombie.attackTimer = .9;
        player.health = Math.max(0, player.health - zombie.damage);
        player.hurtTimer = .25;
        state.camera.shake = 10;
        burst(player.x, player.y, "#e35c51", 7, 110);
        sound("hurt");
        if (player.health <= 0) gameOver();
      }
    }
    state.zombies = state.zombies.filter((zombie) => !zombie.dead || zombie.deathTime < .72);
  }

  function collectPickup(pickup) {
    const player = state.player;
    if (pickup.type === "food") {
      const gained = Math.min(25, player.maxHealth - player.health);
      player.health += gained;
      notice(gained ? `ATE CANNED FOOD  +${gained} HP` : "FOOD STASHED — VITALS FULL");
    } else if (pickup.type === "ammo") {
      player.ammo.pistol.reserve += 24;
      if (player.weapon === "shotgun" || player.ammo.shotgun.reserve > 0) player.ammo.shotgun.reserve += 8;
      notice("PICKED UP AMMO");
    } else if (pickup.type === "shotgun") {
      player.weapon = "shotgun";
      player.ammo.shotgun.clip = 6;
      player.ammo.shotgun.reserve = Math.max(player.ammo.shotgun.reserve, 24);
      player.reloadTimer = 0;
      notice("EQUIPPED SHOTGUN", "danger");
    }
    sound("pickup");
    burst(pickup.x, pickup.y, "#d7ee6b", 8, 90);
  }

  function updatePickups(dt) {
    for (const pickup of state.pickups) pickup.bob += dt * 3;
    state.pickups = state.pickups.filter((pickup) => {
      if (distanceSq(pickup, state.player) < 33 * 33) { collectPickup(pickup); return false; }
      return true;
    });
  }

  function burst(x, y, color, count, speed) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const force = speed * (.35 + Math.random() * .65);
      state.particles.push({ x, y, vx: Math.cos(angle) * force, vy: Math.sin(angle) * force, life: .25 + Math.random() * .35, maxLife: .6, color, size: 2 + Math.random() * 3 });
    }
  }

  function updateParticles(dt) {
    for (const particle of state.particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= .94;
      particle.vy *= .94;
      particle.life -= dt;
    }
    state.particles = state.particles.filter((particle) => particle.life > 0);
  }

  function updateSpawning(dt) {
    const nextWave = Math.floor(state.time / 25) + 1;
    if (nextWave !== state.wave) {
      state.wave = nextWave;
      notice(`WAVE ${state.wave} — THREAT RISING`, "danger");
      if (state.wave % 3 === 0) spawnZombie("big");
    }
    state.spawnTimer -= dt;
    const alive = state.zombies.filter((zombie) => !zombie.dead).length;
    if (state.spawnTimer <= 0 && alive < 6 + state.wave * 2) {
      spawnZombie();
      state.spawnTimer = Math.max(.72, 3.1 - state.wave * .11) * (.8 + Math.random() * .4);
    }
  }

  function updateCamera(dt) {
    if (!state) return;
    const targetX = clamp(state.player.x - canvas.width / 2, 0, Math.max(0, WORLD.width - canvas.width));
    const targetY = clamp(state.player.y - canvas.height / 2, 0, Math.max(0, WORLD.height - canvas.height));
    const ease = dt >= 1 ? 1 : 1 - Math.pow(.0006, dt);
    state.camera.x += (targetX - state.camera.x) * ease;
    state.camera.y += (targetY - state.camera.y) * ease;
    state.camera.shake = Math.max(0, state.camera.shake - dt * 30);
  }

  function updateHud() {
    if (!state) return;
    const player = state.player;
    const ammo = player.ammo[player.weapon];
    const healthPercent = player.health / player.maxHealth * 100;
    dom.healthBar.style.width = `${healthPercent}%`;
    dom.healthBar.style.background = healthPercent < 30 ? "#c84643" : healthPercent < 60 ? "#e08b48" : "#d7ee6b";
    dom.healthText.textContent = `${Math.ceil(player.health)} / ${player.maxHealth}`;
    dom.weaponText.textContent = player.reloadTimer > 0 ? "RELOADING…" : weapons[player.weapon].name;
    dom.clipText.textContent = ammo.clip;
    dom.reserveText.textContent = ammo.reserve;
    dom.killsText.textContent = state.kills;
    dom.timeText.textContent = formatTime(state.time);
    dom.waveText.textContent = `WAVE ${state.wave}`;
    canvas.dataset.mode = state.mode;
    canvas.dataset.playerX = state.player.x.toFixed(1);
    canvas.dataset.playerY = state.player.y.toFixed(1);
    canvas.dataset.zombies = state.zombies.filter((zombie) => !zombie.dead).length;
    canvas.dataset.pickups = state.pickups.length;
    canvas.dataset.assets = images.size;
    canvas.dataset.cameraX = state.camera.x.toFixed(1);
    canvas.dataset.cameraY = state.camera.y.toFixed(1);
    const nearestZombie = state.zombies.filter((zombie) => !zombie.dead).sort((a, b) => distanceSq(a, state.player) - distanceSq(b, state.player))[0];
    if (nearestZombie) {
      canvas.dataset.zombieX = nearestZombie.x.toFixed(1);
      canvas.dataset.zombieY = nearestZombie.y.toFixed(1);
    } else {
      delete canvas.dataset.zombieX;
      delete canvas.dataset.zombieY;
    }
  }

  function update(dt) {
    if (state.mode !== "running") return;
    state.time += dt;
    state.elapsedControlHint += dt;
    updatePlayer(dt);
    updateBullets(dt);
    updateZombies(dt);
    updatePickups(dt);
    updateParticles(dt);
    updateSpawning(dt);
    updateCamera(dt);
    updateHud();
    if (state.elapsedControlHint > 13) dom.controlsPanel.style.opacity = ".35";
  }

  function gameOver() {
    state.mode = "dead";
    pointer.down = false;
    updateHud();
    dom.finalKills.textContent = state.kills;
    dom.finalTime.textContent = formatTime(state.time);
    setScreen(dom.gameOverScreen, true);
  }

  function drawSprite(image, frames, frame, x, y, scale, alpha = 1) {
    if (!image) return;
    const frameWidth = image.width / frames;
    const safeFrame = clamp(Math.floor(frame), 0, frames - 1);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, safeFrame * frameWidth, 0, frameWidth, image.height, Math.round(x - frameWidth * scale / 2), Math.round(y - image.height * scale / 2), Math.round(frameWidth * scale), Math.round(image.height * scale));
    ctx.restore();
  }

  function drawShadow(x, y, rx, ry, alpha = .28) {
    ctx.save();
    ctx.fillStyle = `rgba(5,8,6,${alpha})`;
    ctx.beginPath();
    ctx.ellipse(x, y + 9, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawAtlasTile(image, sx, sy, sw, sh, x, y, w, h, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  }

  function drawGround() {
    const ground = imageFor(manifest.terrain.ground);
    ctx.fillStyle = "#27372e";
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    if (ground) {
      for (let y = 0; y < WORLD.height; y += 64) {
        for (let x = 0; x < WORLD.width; x += 64) {
          const variant = ((x / 64) + (y / 64) * 3) % 5;
          const sx = variant < 4 ? 288 + variant * 16 : 304;
          drawAtlasTile(ground, sx, 160, 16, 16, x, y, 64, 64, .54);
        }
      }
    }

    ctx.fillStyle = "#3a3a3c";
    ctx.fillRect(608, 0, 320, WORLD.height);
    ctx.fillStyle = "#454448";
    ctx.fillRect(928, 348, 520, 488);
    if (ground) {
      for (let y = 0; y < WORLD.height; y += 64) {
        for (let x = 608; x < 928; x += 64) drawAtlasTile(ground, 0, 96, 16, 16, x, y, 64, 64, .34);
      }
      for (let y = 348; y < 836; y += 64) {
        for (let x = 928; x < 1448; x += 64) drawAtlasTile(ground, 16, 96, 16, 16, x, y, 64, 64, .26);
      }
    }
    ctx.fillStyle = "rgba(228,221,184,.38)";
    for (let y = 50; y < WORLD.height; y += 92) ctx.fillRect(762, y, 13, 47);
    ctx.fillStyle = "rgba(228,221,184,.32)";
    for (let x = 965; x < 1410; x += 84) {
      ctx.fillRect(x, 410, 5, 105);
      ctx.fillRect(x, 680, 5, 105);
    }

    ctx.fillStyle = "rgba(11,16,13,.28)";
    ctx.fillRect(38, 38, WORLD.width - 76, 7);
    ctx.fillRect(38, WORLD.height - 45, WORLD.width - 76, 7);
    ctx.fillRect(38, 38, 7, WORLD.height - 76);
    ctx.fillRect(WORLD.width - 45, 38, 7, WORLD.height - 76);
  }

  function drawBuilding() {
    const atlas = imageFor(manifest.terrain.building);
    ctx.fillStyle = "#4b4b51";
    ctx.fillRect(145, 125, 400, 286);
    ctx.fillStyle = "#38383d";
    ctx.fillRect(169, 149, 352, 238);
    if (atlas) {
      for (let x = 145; x < 545; x += 64) drawAtlasTile(atlas, 80, 0, 16, 16, x, 125, 64, 64, .9);
      for (let x = 145; x < 545; x += 64) drawAtlasTile(atlas, 80, 128, 16, 16, x, 347, 64, 64, .95);
      drawAtlasTile(atlas, 128, 0, 64, 64, 245, 178, 192, 192, .94);
    }
    ctx.fillStyle = "rgba(7,10,8,.62)";
    ctx.fillRect(235, 207, 220, 135);
    ctx.fillStyle = "rgba(194,74,64,.5)";
    ctx.fillRect(252, 224, 10, 102);
    ctx.fillRect(426, 224, 10, 102);
    const door = imageFor(manifest.props.boardedDoor);
    if (door) ctx.drawImage(door, 0, 0, door.width, door.height, 442, 324, door.width * 4, door.height * 4);
  }

  function drawFence(rect) {
    const fence = imageFor(manifest.terrain.wireFence);
    ctx.fillStyle = "#73746f";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    if (!fence) return;
    if (rect.kind === "fenceH") {
      for (let x = rect.x; x < rect.x + rect.w; x += 48) drawAtlasTile(fence, 16, 0, 16, 16, x, rect.y - 15, 48, 48);
    } else {
      for (let y = rect.y; y < rect.y + rect.h; y += 48) drawAtlasTile(fence, 0, 16, 16, 16, rect.x - 15, y, 48, 48);
    }
  }

  function drawProp(rect) {
    if (rect.kind === "building") return;
    if (rect.kind.startsWith("fence")) return drawFence(rect);
    if (rect.kind === "barricadeH") {
      const prop = imageFor(manifest.props.woodWallH);
      if (prop) ctx.drawImage(prop, rect.x, rect.y - 4, rect.w, Math.max(38, prop.height * 4));
      return;
    }
    const propPath = manifest.props[rect.kind];
    const prop = imageFor(propPath);
    if (!prop) return;
    const width = prop.width * SCALE.prop;
    const height = prop.height * SCALE.prop;
    drawShadow(rect.spriteX, rect.spriteY, width * .38, Math.max(8, height * .18), .34);
    ctx.drawImage(prop, Math.round(rect.spriteX - width / 2), Math.round(rect.spriteY - height / 2), width, height);
  }

  function drawDetails() {
    const garbage = imageFor(manifest.terrain.garbage);
    if (garbage) {
      drawAtlasTile(garbage, 0, 0, 64, 32, 60, 470, 256, 128, .92);
      drawAtlasTile(garbage, 64, 16, 64, 32, 1410, 878, 220, 110, .88);
      drawAtlasTile(garbage, 0, 32, 64, 32, 480, 950, 230, 112, .72);
    }
    const wall = imageFor(manifest.props.destroyedWall);
    if (wall) {
      for (let i = 0; i < 5; i += 1) ctx.drawImage(wall, 248 + i * 48, 410, wall.width * 3, wall.height * 3);
    }
    ctx.save();
    ctx.fillStyle = "rgba(11,15,12,.22)";
    for (const decal of state.decals) {
      ctx.globalAlpha = decal.alpha;
      ctx.beginPath();
      ctx.ellipse(decal.x, decal.y, decal.size, decal.size * .55, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawPickup(pickup) {
    const path = manifest.pickups[pickup.type];
    const image = imageFor(path);
    if (!image) return;
    const bob = Math.sin(pickup.bob) * 4;
    const scale = pickup.type === "shotgun" ? 4.5 : 5;
    const width = image.width * scale;
    const height = image.height * scale;
    ctx.save();
    const pulse = .35 + Math.sin(pickup.bob * 1.7) * .08;
    ctx.fillStyle = `rgba(215,238,107,${pulse})`;
    ctx.beginPath();
    ctx.ellipse(pickup.x, pickup.y + 8, 26, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(image, Math.round(pickup.x - width / 2), Math.round(pickup.y - height / 2 + bob), width, height);
    ctx.restore();
  }

  function drawZombie(zombie) {
    const data = manifest.zombies[zombie.type];
    const direction = zombie.direction;
    const scale = zombie.scale;
    drawShadow(zombie.x, zombie.y, zombie.radius, zombie.radius * .42);
    if (zombie.dead) {
      const deathDirection = direction === "left" ? "left" : "right";
      const frame = Math.min(data.deathFrames - 1, Math.floor(zombie.deathTime / .09));
      drawSprite(imageFor(data.death[deathDirection]), data.deathFrames, frame, zombie.x, zombie.y, scale, 1 - Math.max(0, zombie.deathTime - .5) * 3.5);
      return;
    }
    const frame = Math.floor(zombie.anim * 9) % data.walkFrames;
    if (zombie.flash > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      drawSprite(imageFor(data.walk[direction]), data.walkFrames, frame, zombie.x, zombie.y, scale, .9);
      ctx.restore();
    }
    drawSprite(imageFor(data.walk[direction]), data.walkFrames, frame, zombie.x, zombie.y, scale);
    if (zombie.health < zombie.maxHealth) {
      const width = zombie.radius * 2;
      ctx.fillStyle = "rgba(8,10,8,.7)";
      ctx.fillRect(zombie.x - width / 2, zombie.y - zombie.radius - 20, width, 4);
      ctx.fillStyle = "#c84643";
      ctx.fillRect(zombie.x - width / 2, zombie.y - zombie.radius - 20, width * zombie.health / zombie.maxHealth, 4);
    }
  }

  function drawPlayer() {
    const player = state.player;
    const data = manifest.player[player.weapon];
    drawShadow(player.x, player.y, 19, 8, .42);
    let image;
    let frames;
    let frame;
    if (data.shoot && player.shotAnim > 0) {
      image = imageFor(data.shoot[player.direction]);
      frames = data.shootFrames;
      frame = Math.min(frames - 1, Math.floor((.16 - player.shotAnim) / .055));
    } else {
      image = imageFor(data.move[player.direction]);
      frames = data.moveFrames;
      frame = player.moving ? Math.floor(state.time * 11) % frames : 0;
    }
    if (player.hurtTimer > 0 && Math.floor(player.hurtTimer * 35) % 2 === 0) ctx.globalAlpha = .45;
    const recoil = player.weapon === "shotgun" && player.shotAnim > 0 ? 2 : 0;
    drawSprite(image, frames, frame, player.x - Math.cos(player.aimAngle) * recoil, player.y - Math.sin(player.aimAngle) * recoil, SCALE.player);
    ctx.globalAlpha = 1;
    if (player.reloadTimer > 0) {
      const progress = 1 - player.reloadTimer / weapons[player.weapon].reload;
      ctx.strokeStyle = "rgba(215,238,107,.35)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(player.x, player.y, 27, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
      ctx.stroke();
    }
  }

  function drawBullets() {
    ctx.fillStyle = "#ffe187";
    for (const bullet of state.bullets) {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawParticles() {
    for (const particle of state.particles) {
      ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.fillRect(Math.round(particle.x), Math.round(particle.y), particle.size, particle.size);
    }
    ctx.globalAlpha = 1;
  }

  function drawWorld() {
    const shakeX = state.camera.shake ? (Math.random() - .5) * state.camera.shake : 0;
    const shakeY = state.camera.shake ? (Math.random() - .5) * state.camera.shake : 0;
    ctx.save();
    ctx.translate(Math.round(-state.camera.x + shakeX), Math.round(-state.camera.y + shakeY));
    drawGround();
    drawBuilding();
    drawDetails();
    for (const rect of obstacleDefs) drawProp(rect);
    for (const pickup of state.pickups) drawPickup(pickup);
    const renderables = [
      ...state.zombies.map((value) => ({ y: value.y, type: "zombie", value })),
      { y: state.player.y, type: "player", value: state.player }
    ].sort((a, b) => a.y - b.y);
    for (const item of renderables) item.type === "player" ? drawPlayer() : drawZombie(item.value);
    drawBullets();
    drawParticles();
    ctx.restore();

    const vignette = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) * .2, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * .7);
    vignette.addColorStop(0, "rgba(3,6,4,0)");
    vignette.addColorStop(1, "rgba(3,6,4,.58)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (state.player.hurtTimer > 0) {
      ctx.fillStyle = `rgba(160,25,24,${state.player.hurtTimer * .5})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function render() {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#131c17";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (assetsReady && state) drawWorld();
  }

  function loop(now) {
    const dt = Math.min(.034, (now - lastFrame) / 1000 || 0);
    lastFrame = now;
    if (assetsReady && state) update(dt);
    render();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    keys.add(event.code);
    if (["KeyW", "KeyA", "KeyS", "KeyD", "KeyR", "Escape"].includes(event.code)) event.preventDefault();
    if (!event.repeat && state?.mode === "running" && ["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) {
      const tapX = (event.code === "KeyD" ? 1 : 0) - (event.code === "KeyA" ? 1 : 0);
      const tapY = (event.code === "KeyS" ? 1 : 0) - (event.code === "KeyW" ? 1 : 0);
      moveEntity(state.player, tapX * 4, tapY * 4);
      updateHud();
    }
    if (event.code === "KeyR") {
      if (state?.mode === "dead") resetGame("running");
      else startReload();
    }
    if (event.code === "Escape" && state) {
      if (state.mode === "running") { state.mode = "paused"; pointer.down = false; updateHud(); setScreen(dom.pauseScreen, true); }
      else if (state.mode === "paused") { state.mode = "running"; updateHud(); setScreen(dom.pauseScreen, false); }
    }
  });
  window.addEventListener("keyup", (event) => keys.delete(event.code));
  canvas.addEventListener("pointermove", pointerPosition);
  canvas.addEventListener("pointerdown", (event) => { pointerPosition(event); pointer.down = true; initAudio(); tryShoot(); });
  window.addEventListener("pointerup", () => { pointer.down = false; });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  window.addEventListener("blur", () => {
    keys.clear(); pointer.down = false;
    if (state?.mode === "running") { state.mode = "paused"; setScreen(dom.pauseScreen, true); }
  });

  dom.startButton.addEventListener("click", () => {
    initAudio();
    resetGame("running");
    setScreen(dom.startScreen, false);
    notice("SURVIVE. SCAVENGE. KEEP MOVING.");
  });
  dom.resumeButton.addEventListener("click", () => { initAudio(); state.mode = "running"; updateHud(); setScreen(dom.pauseScreen, false); });
  dom.restartButton.addEventListener("click", () => { initAudio(); resetGame("running"); });
  dom.soundButton.addEventListener("click", () => {
    initAudio();
    soundEnabled = !soundEnabled;
    dom.soundButton.textContent = soundEnabled ? "SOUND ON" : "SOUND OFF";
  });

  window.__LAST_LOT__ = {
    start: () => { if (assetsReady) { resetGame("running"); setScreen(dom.startScreen, false); } },
    snapshot: () => state ? {
      mode: state.mode, health: state.player.health, weapon: state.player.weapon,
      clip: state.player.ammo[state.player.weapon].clip, reserve: state.player.ammo[state.player.weapon].reserve,
      kills: state.kills, time: state.time, wave: state.wave,
      zombies: state.zombies.filter((zombie) => !zombie.dead).length, pickups: state.pickups.length,
      assets: images.size
    } : null
  };

  resize();
  requestAnimationFrame(loop);
  loadAssets().catch((error) => {
    console.error(error);
    dom.loadingText.textContent = "ASSET LOAD FAILED — CHECK CONSOLE";
    dom.loadingText.style.color = "#ef7569";
  });
})();
