(function () {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const ui = {
    time: document.getElementById("timeReadout"),
    level: document.getElementById("levelReadout"),
    kills: document.getElementById("killsReadout"),
    health: document.getElementById("healthReadout"),
    healthFill: document.getElementById("healthFill"),
    xp: document.getElementById("xpReadout"),
    xpFill: document.getElementById("xpFill"),
    loadout: document.getElementById("loadout"),
    best: document.getElementById("bestReadout"),
    wins: document.getElementById("winsReadout"),
    startOverlay: document.getElementById("startOverlay"),
    upgradeOverlay: document.getElementById("upgradeOverlay"),
    upgradeChoices: document.getElementById("upgradeChoices"),
    draftLevel: document.getElementById("draftLevel"),
    endOverlay: document.getElementById("endOverlay"),
    endEyebrow: document.getElementById("endEyebrow"),
    endTitle: document.getElementById("endTitle"),
    endBody: document.getElementById("endBody"),
    endTime: document.getElementById("endTime"),
    endKills: document.getElementById("endKills"),
    endLevel: document.getElementById("endLevel"),
    bossBanner: document.getElementById("bossBanner"),
    bossName: document.getElementById("bossName"),
    pauseButton: document.getElementById("pauseButton"),
    startButton: document.getElementById("startButton"),
    restartButton: document.getElementById("restartButton"),
    touchStick: document.getElementById("touchStick"),
    touchKnob: document.getElementById("touchKnob")
  };

  const TAU = Math.PI * 2;
  const WORLD = { width: 3600, height: 2600 };
  const RUN_DURATION = 600;
  const STORAGE_KEY = "nightboundSurvivors.records.v1";
  const bossSchedule = [
    { at: 120, name: "The Bellkeeper" },
    { at: 240, name: "Duchess of Static" },
    { at: 360, name: "The Moon Warden" },
    { at: 480, name: "Choir of Fangs" },
    { at: 555, name: "Dawnless Count" }
  ];

  const keys = new Set();
  const pointer = { active: false, id: null, baseX: 0, baseY: 0, x: 0, y: 0, dx: 0, dy: 0 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let lastFrame = performance.now();

  const enemyTypes = {
    thrall: { name: "Thrall", hp: 18, speed: 62, damage: 8, radius: 13, xp: 2, color: "#8b5cf6", weight: 1 },
    bat: { name: "Glass Bat", hp: 12, speed: 126, damage: 6, radius: 10, xp: 2, color: "#49f4ff", weight: 0.62 },
    knight: { name: "Grave Knight", hp: 68, speed: 42, damage: 15, radius: 18, xp: 7, color: "#ffd166", weight: 0.25 },
    cultist: { name: "Choir Cultist", hp: 32, speed: 50, damage: 7, radius: 14, xp: 5, color: "#ff4f87", weight: 0.32, ranged: true },
    shade: { name: "Burst Shade", hp: 26, speed: 88, damage: 22, radius: 15, xp: 4, color: "#77ff9b", weight: 0.28, explodes: true },
    boss: { name: "Boss", hp: 900, speed: 38, damage: 24, radius: 34, xp: 48, color: "#ff395d", weight: 0 }
  };

  const weaponCatalog = {
    orbit: { name: "Blood Orbit", color: "#ff4f87", level: 1, cooldown: 0, damage: 18, count: 2, radius: 76 },
    crossbow: { name: "Moonshot Crossbow", color: "#49f4ff", level: 1, cooldown: 0, delay: 0.72, damage: 24, count: 1, speed: 540 },
    sigil: { name: "Gravefire Sigil", color: "#9b66ff", level: 0, cooldown: 1.4, delay: 3.2, damage: 34, radius: 118 },
    bats: { name: "Bat Swarm", color: "#77ff9b", level: 0, cooldown: 0.9, delay: 1.9, damage: 17, count: 2, speed: 360 }
  };

  const state = {
    mode: "start",
    elapsed: 0,
    spawnClock: 0,
    spawnBudget: 0,
    kills: 0,
    level: 1,
    xp: 0,
    xpNeeded: 8,
    camera: { x: 0, y: 0, shake: 0 },
    player: null,
    weapons: {},
    enemies: [],
    projectiles: [],
    enemyShots: [],
    pulses: [],
    gems: [],
    particles: [],
    floaters: [],
    bossesSeen: new Set(),
    seenCodex: new Set(),
    pendingChoices: [],
    records: loadRecords()
  };

  function loadRecords() {
    try {
      return Object.assign({
        bestTime: 0,
        bestKills: 0,
        bestLevel: 1,
        wins: 0,
        codex: []
      }, JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
    } catch {
      return { bestTime: 0, bestKills: 0, bestLevel: 1, wins: 0, codex: [] };
    }
  }

  function saveRecords(won) {
    const codex = new Set(state.records.codex || []);
    state.seenCodex.forEach((name) => codex.add(name));
    const next = {
      bestTime: Math.max(state.records.bestTime || 0, state.elapsed),
      bestKills: Math.max(state.records.bestKills || 0, state.kills),
      bestLevel: Math.max(state.records.bestLevel || 1, state.level),
      wins: (state.records.wins || 0) + (won ? 1 : 0),
      codex: Array.from(codex).slice(0, 20)
    };
    state.records = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    updateRecords();
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resetRun() {
    state.mode = "playing";
    state.elapsed = 0;
    state.spawnClock = 0;
    state.spawnBudget = 0;
    state.kills = 0;
    state.level = 1;
    state.xp = 0;
    state.xpNeeded = 8;
    state.player = {
      x: WORLD.width / 2,
      y: WORLD.height / 2,
      radius: 17,
      speed: 225,
      health: 100,
      maxHealth: 100,
      regen: 0.55,
      pickup: 86,
      hurtTimer: 0,
      angle: 0
    };
    state.weapons = {
      orbit: cloneWeapon("orbit"),
      crossbow: cloneWeapon("crossbow"),
      sigil: cloneWeapon("sigil"),
      bats: cloneWeapon("bats")
    };
    state.enemies.length = 0;
    state.projectiles.length = 0;
    state.enemyShots.length = 0;
    state.pulses.length = 0;
    state.gems.length = 0;
    state.particles.length = 0;
    state.floaters.length = 0;
    state.bossesSeen = new Set();
    state.seenCodex = new Set();
    ui.startOverlay.hidden = true;
    ui.upgradeOverlay.hidden = true;
    ui.endOverlay.hidden = true;
    ui.bossBanner.hidden = true;
    ui.pauseButton.textContent = "Pause";
    spawnBurst(18, "thrall");
    updateHud();
  }

  function formatTime(seconds) {
    const value = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(value / 60).toString().padStart(2, "0");
    const secs = (value % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function angleTo(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }

  function spawnPoint(margin) {
    const side = Math.floor(Math.random() * 4);
    const camLeft = state.camera.x;
    const camTop = state.camera.y;
    if (side === 0) return { x: clamp(camLeft + Math.random() * width, 20, WORLD.width - 20), y: clamp(camTop - margin, 20, WORLD.height - 20) };
    if (side === 1) return { x: clamp(camLeft + width + margin, 20, WORLD.width - 20), y: clamp(camTop + Math.random() * height, 20, WORLD.height - 20) };
    if (side === 2) return { x: clamp(camLeft + Math.random() * width, 20, WORLD.width - 20), y: clamp(camTop + height + margin, 20, WORLD.height - 20) };
    return { x: clamp(camLeft - margin, 20, WORLD.width - 20), y: clamp(camTop + Math.random() * height, 20, WORLD.height - 20) };
  }

  function spawnEnemy(kind, bossName) {
    const base = enemyTypes[kind];
    const minute = state.elapsed / 60;
    const scale = 1 + minute * 0.2;
    const point = spawnPoint(kind === "boss" ? 140 : 95);
    const enemy = {
      x: point.x,
      y: point.y,
      vx: 0,
      vy: 0,
      radius: base.radius,
      type: Object.assign({}, base, { name: bossName || base.name }),
      hp: Math.round(base.hp * scale * (kind === "boss" ? 1 + minute * 0.12 : 1)),
      maxHp: Math.round(base.hp * scale * (kind === "boss" ? 1 + minute * 0.12 : 1)),
      speed: base.speed * (1 + Math.min(0.28, minute * 0.025)),
      touchTimer: 0,
      shotTimer: 1.2 + Math.random(),
      orbitTimer: 0,
      flash: 0,
      boss: kind === "boss",
      dead: false
    };
    state.seenCodex.add(enemy.type.name);
    state.enemies.push(enemy);
  }

  function spawnBurst(count, kind) {
    for (let i = 0; i < count; i += 1) {
      spawnEnemy(kind);
    }
  }

  function chooseEnemyType() {
    const minute = state.elapsed / 60;
    const candidates = [
      ["thrall", 1.2],
      ["bat", minute > 0.7 ? 0.72 : 0],
      ["knight", minute > 1.7 ? 0.3 + minute * 0.04 : 0],
      ["cultist", minute > 2.2 ? 0.28 + minute * 0.035 : 0],
      ["shade", minute > 3.2 ? 0.26 + minute * 0.035 : 0]
    ];
    const total = candidates.reduce((sum, item) => sum + item[1], 0);
    let roll = Math.random() * total;
    for (const [kind, weight] of candidates) {
      roll -= weight;
      if (roll <= 0) return kind;
    }
    return "thrall";
  }

  function updateDirector(dt) {
    const minute = state.elapsed / 60;
    state.spawnBudget += dt * (1.6 + minute * 0.92);
    const cap = 65 + minute * 22;
    while (state.spawnBudget >= 1 && state.enemies.length < cap) {
      state.spawnBudget -= 1;
      spawnEnemy(chooseEnemyType());
    }

    bossSchedule.forEach((boss) => {
      if (state.elapsed >= boss.at && !state.bossesSeen.has(boss.name)) {
        state.bossesSeen.add(boss.name);
        spawnEnemy("boss", boss.name);
        showBossBanner(boss.name);
      }
    });
  }

  function showBossBanner(name) {
    ui.bossName.textContent = name;
    ui.bossBanner.hidden = false;
    setTimeout(() => {
      ui.bossBanner.hidden = true;
    }, 2200);
  }

  function movementVector() {
    let x = 0;
    let y = 0;
    if (keys.has("arrowleft") || keys.has("a")) x -= 1;
    if (keys.has("arrowright") || keys.has("d")) x += 1;
    if (keys.has("arrowup") || keys.has("w")) y -= 1;
    if (keys.has("arrowdown") || keys.has("s")) y += 1;
    x += pointer.dx;
    y += pointer.dy;
    const length = Math.hypot(x, y) || 1;
    return { x: x / length, y: y / length, moving: Math.abs(x) + Math.abs(y) > 0.05 };
  }

  function updatePlayer(dt) {
    const player = state.player;
    const move = movementVector();
    if (move.moving) {
      player.x = clamp(player.x + move.x * player.speed * dt, 28, WORLD.width - 28);
      player.y = clamp(player.y + move.y * player.speed * dt, 28, WORLD.height - 28);
      player.angle = Math.atan2(move.y, move.x);
    }
    player.hurtTimer = Math.max(0, player.hurtTimer - dt);
    player.health = Math.min(player.maxHealth, player.health + player.regen * dt);
    state.camera.shake = Math.max(0, state.camera.shake - dt * 34);
    const shakeX = (Math.random() - 0.5) * state.camera.shake;
    const shakeY = (Math.random() - 0.5) * state.camera.shake;
    state.camera.x = clamp(player.x - width / 2 + shakeX, 0, WORLD.width - width);
    state.camera.y = clamp(player.y - height / 2 + shakeY, 0, WORLD.height - height);
  }

  function nearestEnemy(origin, range) {
    let best = null;
    let bestDistance = range;
    state.enemies.forEach((enemy) => {
      if (enemy.dead) return;
      const d = distance(origin, enemy);
      if (d < bestDistance) {
        best = enemy;
        bestDistance = d;
      }
    });
    return best;
  }

  function fireProjectile(options) {
    state.projectiles.push(Object.assign({
      x: state.player.x,
      y: state.player.y,
      vx: 0,
      vy: 0,
      radius: 6,
      life: 2,
      pierce: 1,
      hit: new Set(),
      homing: false,
      color: "#fff",
      trail: 0
    }, options));
  }

  function updateWeapons(dt) {
    const crossbow = state.weapons.crossbow;
    crossbow.cooldown -= dt;
    if (crossbow.cooldown <= 0) {
      const targets = Math.max(1, crossbow.count);
      for (let i = 0; i < targets; i += 1) {
        const target = nearestEnemy(state.player, 720);
        const angle = target ? angleTo(state.player, target) + (i - (targets - 1) / 2) * 0.14 : state.player.angle;
        fireProjectile({
          vx: Math.cos(angle) * crossbow.speed,
          vy: Math.sin(angle) * crossbow.speed,
          radius: 5,
          damage: crossbow.damage,
          pierce: 1 + Math.floor(crossbow.level / 4),
          life: 1.75,
          color: crossbow.color,
          trail: 1
        });
      }
      crossbow.cooldown = Math.max(0.24, crossbow.delay);
    }

    const bats = state.weapons.bats;
    if (bats.level > 0) {
      bats.cooldown -= dt;
      if (bats.cooldown <= 0) {
        for (let i = 0; i < bats.count; i += 1) {
          const angle = state.player.angle + (Math.random() - 0.5) * 1.4;
          fireProjectile({
            vx: Math.cos(angle) * bats.speed,
            vy: Math.sin(angle) * bats.speed,
            radius: 7,
            damage: bats.damage,
            pierce: 2,
            life: 3.2,
            homing: true,
            turn: 7.2,
            color: bats.color,
            trail: 2
          });
        }
        bats.cooldown = Math.max(0.32, bats.delay);
      }
    }

    const sigil = state.weapons.sigil;
    if (sigil.level > 0) {
      sigil.cooldown -= dt;
      if (sigil.cooldown <= 0) {
        state.pulses.push({
          x: state.player.x,
          y: state.player.y,
          radius: 18,
          maxRadius: sigil.radius,
          life: 0.62,
          age: 0,
          damage: sigil.damage,
          color: sigil.color,
          hit: new Set()
        });
        sigil.cooldown = Math.max(0.8, sigil.delay);
      }
    }
  }

  function updateOrbit(dt) {
    const orbit = state.weapons.orbit;
    const time = state.elapsed * (1.8 + orbit.level * 0.08);
    state.enemies.forEach((enemy) => {
      enemy.orbitTimer = Math.max(0, enemy.orbitTimer - dt);
      for (let i = 0; i < orbit.count; i += 1) {
        const angle = time + (i / orbit.count) * TAU;
        const blade = {
          x: state.player.x + Math.cos(angle) * orbit.radius,
          y: state.player.y + Math.sin(angle) * orbit.radius
        };
        if (enemy.orbitTimer <= 0 && distance(blade, enemy) < enemy.radius + 18) {
          damageEnemy(enemy, orbit.damage, orbit.color);
          enemy.orbitTimer = 0.38;
        }
      }
    });
  }

  function updateProjectiles(dt) {
    state.projectiles.forEach((shot) => {
      if (shot.homing) {
        const target = nearestEnemy(shot, 460);
        if (target) {
          const desired = angleTo(shot, target);
          const current = Math.atan2(shot.vy, shot.vx);
          const delta = Math.atan2(Math.sin(desired - current), Math.cos(desired - current));
          const next = current + clamp(delta, -shot.turn * dt, shot.turn * dt);
          const speed = Math.hypot(shot.vx, shot.vy);
          shot.vx = Math.cos(next) * speed;
          shot.vy = Math.sin(next) * speed;
        }
      }
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.life -= dt;
      if (shot.trail) addParticle(shot.x, shot.y, shot.color, 0.22, shot.trail === 2 ? 4 : 3);

      state.enemies.forEach((enemy) => {
        if (enemy.dead || shot.hit.has(enemy)) return;
        if (distance(shot, enemy) < shot.radius + enemy.radius) {
          shot.hit.add(enemy);
          shot.pierce -= 1;
          damageEnemy(enemy, shot.damage, shot.color);
          if (shot.pierce <= 0) shot.life = -1;
        }
      });
    });
    state.projectiles = state.projectiles.filter((shot) => shot.life > 0 && shot.x > -80 && shot.y > -80 && shot.x < WORLD.width + 80 && shot.y < WORLD.height + 80);

    state.pulses.forEach((pulse) => {
      pulse.age += dt;
      pulse.radius = pulse.maxRadius * easeOut(pulse.age / pulse.life);
      state.enemies.forEach((enemy) => {
        if (enemy.dead || pulse.hit.has(enemy)) return;
        if (distance(pulse, enemy) < pulse.radius + enemy.radius * 0.5) {
          pulse.hit.add(enemy);
          damageEnemy(enemy, pulse.damage, pulse.color);
        }
      });
    });
    state.pulses = state.pulses.filter((pulse) => pulse.age < pulse.life);
  }

  function updateEnemies(dt) {
    const player = state.player;
    state.enemies.forEach((enemy) => {
      if (enemy.dead) return;
      enemy.flash = Math.max(0, enemy.flash - dt * 8);
      enemy.touchTimer = Math.max(0, enemy.touchTimer - dt);
      const a = angleTo(enemy, player);
      const desiredDistance = enemy.type.ranged ? 245 : 0;
      const d = distance(enemy, player);
      const direction = d < desiredDistance ? -1 : 1;
      enemy.vx = Math.cos(a) * enemy.speed * direction;
      enemy.vy = Math.sin(a) * enemy.speed * direction;
      enemy.x = clamp(enemy.x + enemy.vx * dt, 18, WORLD.width - 18);
      enemy.y = clamp(enemy.y + enemy.vy * dt, 18, WORLD.height - 18);

      if (enemy.type.ranged) {
        enemy.shotTimer -= dt;
        if (enemy.shotTimer <= 0 && d < 520) {
          fireEnemyShot(enemy);
          enemy.shotTimer = 2.3 + Math.random() * 1.1;
        }
      }

      if (enemy.type.explodes && d < enemy.radius + player.radius + 8) {
        explodeShade(enemy);
      } else if (d < enemy.radius + player.radius && enemy.touchTimer <= 0) {
        hurtPlayer(enemy.type.damage);
        enemy.touchTimer = 0.62;
      }
    });

    state.enemyShots.forEach((shot) => {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.life -= dt;
      addParticle(shot.x, shot.y, shot.color, 0.2, 3);
      if (distance(shot, player) < shot.radius + player.radius) {
        hurtPlayer(shot.damage);
        shot.life = -1;
      }
    });
    state.enemyShots = state.enemyShots.filter((shot) => shot.life > 0);
  }

  function fireEnemyShot(enemy) {
    const a = angleTo(enemy, state.player);
    state.enemyShots.push({
      x: enemy.x,
      y: enemy.y,
      vx: Math.cos(a) * 255,
      vy: Math.sin(a) * 255,
      radius: 6,
      damage: 9,
      life: 3.2,
      color: "#ff4f87"
    });
  }

  function explodeShade(enemy) {
    enemy.dead = true;
    state.camera.shake = Math.max(state.camera.shake, 9);
    addBurst(enemy.x, enemy.y, enemy.type.color, 22);
    if (distance(enemy, state.player) < 82) hurtPlayer(enemy.type.damage);
  }

  function hurtPlayer(amount) {
    const player = state.player;
    if (player.hurtTimer > 0) return;
    player.health -= amount;
    player.hurtTimer = 0.42;
    state.camera.shake = Math.max(state.camera.shake, 7);
    addFloater(player.x, player.y - 24, `-${Math.round(amount)}`, "#ff4f87");
    if (player.health <= 0) {
      endRun(false);
    }
  }

  function damageEnemy(enemy, amount, color) {
    enemy.hp -= amount;
    enemy.flash = 1;
    addFloater(enemy.x, enemy.y - enemy.radius, Math.round(amount).toString(), color);
    addParticle(enemy.x, enemy.y, color, 0.25, 5);
    if (enemy.hp <= 0 && !enemy.dead) {
      killEnemy(enemy);
    }
  }

  function killEnemy(enemy) {
    enemy.dead = true;
    state.kills += enemy.boss ? 8 : 1;
    addBurst(enemy.x, enemy.y, enemy.type.color, enemy.boss ? 36 : 14);
    dropGem(enemy.x, enemy.y, enemy.type.xp);
    if (enemy.boss) {
      dropGem(enemy.x + 28, enemy.y, Math.floor(enemy.type.xp * 0.65));
      state.camera.shake = Math.max(state.camera.shake, 18);
    }
  }

  function dropGem(x, y, value) {
    state.gems.push({
      x: x + (Math.random() - 0.5) * 24,
      y: y + (Math.random() - 0.5) * 24,
      value,
      radius: 7 + Math.min(6, value),
      spin: Math.random() * TAU,
      magnet: false
    });
  }

  function updateGems(dt) {
    const player = state.player;
    state.gems.forEach((gem) => {
      gem.spin += dt * 4;
      const d = distance(gem, player);
      if (d < player.pickup) gem.magnet = true;
      if (gem.magnet) {
        const a = angleTo(gem, player);
        const speed = 290 + (player.pickup - Math.min(player.pickup, d)) * 8;
        gem.x += Math.cos(a) * speed * dt;
        gem.y += Math.sin(a) * speed * dt;
      }
      if (d < player.radius + gem.radius + 4) {
        gainXp(gem.value);
        gem.collected = true;
        addParticle(gem.x, gem.y, "#49f4ff", 0.3, 8);
      }
    });
    state.gems = state.gems.filter((gem) => !gem.collected);
  }

  function gainXp(amount) {
    state.xp += amount;
    while (state.xp >= state.xpNeeded) {
      state.xp -= state.xpNeeded;
      state.level += 1;
      state.xpNeeded = Math.round(8 + state.level * 5.4 + state.level ** 1.25);
      openUpgradeDraft();
      break;
    }
  }

  function openUpgradeDraft() {
    state.mode = "upgrade";
    state.pendingChoices = draftUpgrades();
    ui.draftLevel.textContent = state.level.toString();
    ui.upgradeChoices.innerHTML = "";
    state.pendingChoices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-card";
      button.type = "button";
      button.innerHTML = `<strong>${choice.title}</strong><span>${choice.kind}</span><p>${choice.body}</p>`;
      button.addEventListener("click", () => {
        choice.apply();
        state.mode = "playing";
        ui.upgradeOverlay.hidden = true;
        updateLoadout();
      });
      ui.upgradeChoices.appendChild(button);
    });
    ui.upgradeOverlay.hidden = false;
  }

  function draftUpgrades() {
    const upgrades = [
      {
        title: "Blood Orbit",
        kind: state.weapons.orbit.level ? `Rank ${state.weapons.orbit.level + 1}` : "Unlock",
        body: "More blades circle wider and bite harder.",
        apply: () => {
          const w = state.weapons.orbit;
          w.level += 1;
          w.damage += 7;
          w.radius += 5;
          if (w.level % 2 === 0) w.count += 1;
        }
      },
      {
        title: "Moonshot Crossbow",
        kind: `Rank ${state.weapons.crossbow.level + 1}`,
        body: "Fires faster and threads through more enemies.",
        apply: () => {
          const w = state.weapons.crossbow;
          w.level += 1;
          w.damage += 8;
          w.delay *= 0.88;
          if (w.level % 3 === 0) w.count += 1;
        }
      },
      {
        title: "Gravefire Sigil",
        kind: state.weapons.sigil.level ? `Rank ${state.weapons.sigil.level + 1}` : "Unlock",
        body: "A pulsing ward burns the whole courtyard.",
        apply: () => {
          const w = state.weapons.sigil;
          w.level += 1;
          w.damage += 10;
          w.radius += 16;
          w.delay *= 0.88;
        }
      },
      {
        title: "Bat Swarm",
        kind: state.weapons.bats.level ? `Rank ${state.weapons.bats.level + 1}` : "Unlock",
        body: "Homing familiars hunt down stragglers.",
        apply: () => {
          const w = state.weapons.bats;
          w.level += 1;
          w.damage += 5;
          w.delay *= 0.9;
          if (w.level % 2 === 0) w.count += 1;
        }
      },
      {
        title: "Crimson Heart",
        kind: "Body",
        body: "Max blood rises and a fresh pulse heals you.",
        apply: () => {
          state.player.maxHealth += 22;
          state.player.health = Math.min(state.player.maxHealth, state.player.health + 38);
        }
      },
      {
        title: "Velvet Thirst",
        kind: "Body",
        body: "Regenerate faster while the night is loud.",
        apply: () => {
          state.player.regen += 0.45;
        }
      },
      {
        title: "Magnet Moon",
        kind: "Utility",
        body: "Pull moonlight gems from farther away.",
        apply: () => {
          state.player.pickup += 34;
        }
      },
      {
        title: "Silver Boots",
        kind: "Utility",
        body: "Move faster through the closing swarm.",
        apply: () => {
          state.player.speed += 20;
        }
      }
    ];
    const pool = upgrades.sort(() => Math.random() - 0.5);
    return pool.slice(0, 3);
  }

  function addParticle(x, y, color, life, radius) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 44,
      vy: (Math.random() - 0.5) * 44,
      radius,
      life,
      maxLife: life,
      color
    });
  }

  function addBurst(x, y, color, count) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * TAU;
      const speed = 40 + Math.random() * 170;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 5,
        life: 0.45 + Math.random() * 0.5,
        maxLife: 0.95,
        color
      });
    }
  }

  function addFloater(x, y, text, color) {
    state.floaters.push({ x, y, text, color, life: 0.72, maxLife: 0.72 });
  }

  function updateEffects(dt) {
    state.particles.forEach((particle) => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.96;
      particle.vy *= 0.96;
      particle.life -= dt;
    });
    state.floaters.forEach((floater) => {
      floater.y -= 34 * dt;
      floater.life -= dt;
    });
    state.particles = state.particles.filter((particle) => particle.life > 0);
    state.floaters = state.floaters.filter((floater) => floater.life > 0);
  }

  function endRun(won) {
    if (state.mode === "gameOver" || state.mode === "victory") return;
    state.mode = won ? "victory" : "gameOver";
    saveRecords(won);
    ui.endEyebrow.textContent = won ? "Dawn survived" : "Run ended";
    ui.endTitle.textContent = won ? "The sun finds you standing." : "The night drinks deep.";
    ui.endBody.textContent = won
      ? "The courtyard is ash, the crown is quiet, and your build made it to dawn."
      : "Another run, another sharper lesson. The records are saved.";
    ui.endTime.textContent = formatTime(state.elapsed);
    ui.endKills.textContent = state.kills.toString();
    ui.endLevel.textContent = state.level.toString();
    ui.endOverlay.hidden = false;
  }

  function update(dt) {
    if (state.mode !== "playing") return;
    state.elapsed += dt;
    if (state.elapsed >= RUN_DURATION) {
      state.elapsed = RUN_DURATION;
      endRun(true);
      return;
    }
    updatePlayer(dt);
    updateDirector(dt);
    updateWeapons(dt);
    updateOrbit(dt);
    updateProjectiles(dt);
    updateEnemies(dt);
    updateGems(dt);
    updateEffects(dt);
    state.enemies = state.enemies.filter((enemy) => !enemy.dead);
    updateHud();
  }

  function easeOut(value) {
    const t = clamp(value, 0, 1);
    return 1 - (1 - t) * (1 - t);
  }

  function drawWorld() {
    const cam = state.camera;
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#080a17");
    gradient.addColorStop(0.55, "#09111b");
    gradient.addColorStop(1, "#06070d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    drawMoon();
    drawParallaxFog();
    drawCastle();
    drawGroundGrid(cam);
    drawWorldBounds(cam);
  }

  function drawMoon() {
    const mx = width * 0.72;
    const my = height * 0.18;
    const glow = ctx.createRadialGradient(mx, my, 10, mx, my, 190);
    glow.addColorStop(0, "rgba(200, 246, 255, 0.78)");
    glow.addColorStop(0.22, "rgba(73, 244, 255, 0.18)");
    glow.addColorStop(1, "rgba(73, 244, 255, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mx, my, 190, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "rgba(233, 252, 255, 0.92)";
    ctx.beginPath();
    ctx.arc(mx, my, 38, 0, TAU);
    ctx.fill();
  }

  function drawParallaxFog() {
    const offset = state.elapsed * 11;
    ctx.save();
    ctx.globalAlpha = 0.28;
    for (let i = 0; i < 9; i += 1) {
      const x = ((i * 260 + offset) % (width + 260)) - 160;
      const y = height * (0.25 + (i % 5) * 0.12);
      const fog = ctx.createRadialGradient(x, y, 12, x, y, 190);
      fog.addColorStop(0, "rgba(155, 102, 255, 0.2)");
      fog.addColorStop(1, "rgba(155, 102, 255, 0)");
      ctx.fillStyle = fog;
      ctx.beginPath();
      ctx.ellipse(x, y, 210, 44, 0, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawCastle() {
    ctx.save();
    ctx.translate(-state.camera.x * 0.06, 0);
    ctx.fillStyle = "rgba(5, 6, 12, 0.72)";
    const baseY = height * 0.28;
    for (let i = -1; i < 10; i += 1) {
      const x = i * 220;
      ctx.fillRect(x, baseY + 80, 170, height);
      ctx.fillRect(x + 52, baseY, 66, 110);
      ctx.beginPath();
      ctx.moveTo(x + 52, baseY);
      ctx.lineTo(x + 85, baseY - 46);
      ctx.lineTo(x + 118, baseY);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawGroundGrid(cam) {
    ctx.save();
    ctx.translate(-cam.x, -cam.y);
    ctx.strokeStyle = "rgba(73, 244, 255, 0.065)";
    ctx.lineWidth = 1;
    const step = 120;
    const startX = Math.floor(cam.x / step) * step;
    const endX = cam.x + width + step;
    const startY = Math.floor(cam.y / step) * step;
    const endY = cam.y + height + step;
    for (let x = startX; x <= endX; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }
    for (let y = startY; y <= endY; y += step) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawWorldBounds(cam) {
    ctx.save();
    ctx.translate(-cam.x, -cam.y);
    ctx.strokeStyle = "rgba(255, 79, 135, 0.32)";
    ctx.lineWidth = 5;
    ctx.strokeRect(0, 0, WORLD.width, WORLD.height);
    ctx.restore();
  }

  function worldToScreen(entity) {
    return { x: entity.x - state.camera.x, y: entity.y - state.camera.y };
  }

  function drawEntityGlow(x, y, radius, color, alpha) {
    const glow = ctx.createRadialGradient(x, y, 1, x, y, radius);
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function drawGems() {
    state.gems.forEach((gem) => {
      const p = worldToScreen(gem);
      drawEntityGlow(p.x, p.y, 34, "rgba(73, 244, 255, 0.62)", 0.55);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(gem.spin);
      ctx.fillStyle = "#49f4ff";
      ctx.strokeStyle = "#f8fbff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -gem.radius);
      ctx.lineTo(gem.radius * 0.74, 0);
      ctx.lineTo(0, gem.radius);
      ctx.lineTo(-gem.radius * 0.74, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
  }

  function drawEnemies() {
    state.enemies.forEach((enemy) => {
      const p = worldToScreen(enemy);
      if (p.x < -90 || p.y < -90 || p.x > width + 90 || p.y > height + 90) return;
      const color = enemy.flash > 0 ? "#ffffff" : enemy.type.color;
      drawEntityGlow(p.x, p.y, enemy.radius * (enemy.boss ? 3.2 : 2.2), enemy.type.color, enemy.boss ? 0.34 : 0.22);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.atan2(enemy.vy, enemy.vx));
      ctx.fillStyle = color;
      ctx.strokeStyle = enemy.boss ? "#ffd166" : "rgba(255, 255, 255, 0.72)";
      ctx.lineWidth = enemy.boss ? 3 : 1.6;
      if (enemy.type.explodes) {
        starShape(enemy.radius, enemy.radius * 0.48, 8);
      } else if (enemy.type.ranged) {
        ctx.beginPath();
        ctx.moveTo(enemy.radius, 0);
        ctx.lineTo(-enemy.radius * 0.7, enemy.radius * 0.72);
        ctx.lineTo(-enemy.radius * 0.42, 0);
        ctx.lineTo(-enemy.radius * 0.7, -enemy.radius * 0.72);
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, enemy.radius * 1.1, enemy.radius * 0.86, 0, 0, TAU);
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      if (enemy.boss) {
        const barWidth = 74;
        ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
        ctx.fillRect(p.x - barWidth / 2, p.y - enemy.radius - 18, barWidth, 6);
        ctx.fillStyle = "#ff4f87";
        ctx.fillRect(p.x - barWidth / 2, p.y - enemy.radius - 18, barWidth * clamp(enemy.hp / enemy.maxHp, 0, 1), 6);
      }
    });
  }

  function starShape(outer, inner, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i += 1) {
      const radius = i % 2 === 0 ? outer : inner;
      const angle = -Math.PI / 2 + (i / (points * 2)) * TAU;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function drawProjectiles() {
    state.pulses.forEach((pulse) => {
      const p = worldToScreen(pulse);
      ctx.save();
      ctx.globalAlpha = 1 - pulse.age / pulse.life;
      ctx.strokeStyle = pulse.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulse.radius, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha *= 0.18;
      ctx.fillStyle = pulse.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, pulse.radius, 0, TAU);
      ctx.fill();
      ctx.restore();
    });

    const drawShot = (shot, hostile) => {
      const p = worldToScreen(shot);
      drawEntityGlow(p.x, p.y, shot.radius * 4, shot.color, hostile ? 0.42 : 0.62);
      ctx.fillStyle = shot.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, shot.radius, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.beginPath();
      ctx.arc(p.x - shot.radius * 0.28, p.y - shot.radius * 0.28, shot.radius * 0.36, 0, TAU);
      ctx.fill();
    };
    state.projectiles.forEach((shot) => drawShot(shot, false));
    state.enemyShots.forEach((shot) => drawShot(shot, true));
  }

  function drawOrbit() {
    const orbit = state.weapons.orbit;
    const time = state.elapsed * (1.8 + orbit.level * 0.08);
    const center = worldToScreen(state.player);
    ctx.save();
    ctx.strokeStyle = "rgba(255, 79, 135, 0.22)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(center.x, center.y, orbit.radius, 0, TAU);
    ctx.stroke();
    for (let i = 0; i < orbit.count; i += 1) {
      const angle = time + (i / orbit.count) * TAU;
      const x = center.x + Math.cos(angle) * orbit.radius;
      const y = center.y + Math.sin(angle) * orbit.radius;
      drawEntityGlow(x, y, 34, "rgba(255, 79, 135, 0.8)", 0.65);
      ctx.fillStyle = orbit.color;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(x, y, 18, 7, angle, 0, TAU);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPlayer() {
    const player = worldToScreen(state.player);
    drawEntityGlow(player.x, player.y, 58, "rgba(73, 244, 255, 0.55)", 0.4);
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(state.player.angle);
    ctx.globalAlpha = state.player.hurtTimer > 0 ? 0.55 + Math.sin(state.elapsed * 52) * 0.25 : 1;
    ctx.fillStyle = "#0b1222";
    ctx.strokeStyle = "#49f4ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-12, 16);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-12, -16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ff4f87";
    ctx.beginPath();
    ctx.arc(-2, 0, 5, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  function drawEffects() {
    state.particles.forEach((particle) => {
      const p = worldToScreen(particle);
      ctx.save();
      ctx.globalAlpha = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, particle.radius, 0, TAU);
      ctx.fill();
      ctx.restore();
    });
    state.floaters.forEach((floater) => {
      const p = worldToScreen(floater);
      ctx.save();
      ctx.globalAlpha = clamp(floater.life / floater.maxLife, 0, 1);
      ctx.fillStyle = floater.color;
      ctx.font = "900 13px Segoe UI, system-ui";
      ctx.textAlign = "center";
      ctx.fillText(floater.text, p.x, p.y);
      ctx.restore();
    });
  }

  function draw() {
    drawWorld();
    if (!state.player) return;
    drawGems();
    drawProjectiles();
    drawEnemies();
    drawOrbit();
    drawPlayer();
    drawEffects();
  }

  function updateHud() {
    ui.time.textContent = formatTime(state.elapsed);
    ui.level.textContent = state.level.toString();
    ui.kills.textContent = state.kills.toString();
    ui.health.textContent = `${Math.ceil(state.player.health)} / ${state.player.maxHealth}`;
    ui.healthFill.style.width = `${clamp(state.player.health / state.player.maxHealth, 0, 1) * 100}%`;
    ui.xp.textContent = `${Math.floor(state.xp)} / ${state.xpNeeded}`;
    ui.xpFill.style.width = `${clamp(state.xp / state.xpNeeded, 0, 1) * 100}%`;
    updateLoadout();
  }

  function updateLoadout() {
    ui.loadout.innerHTML = "";
    Object.values(state.weapons).forEach((weapon) => {
      if (weapon.level <= 0) return;
      const chip = document.createElement("div");
      chip.className = "weapon-chip";
      chip.style.borderColor = weapon.color;
      chip.innerHTML = `<strong>${weapon.name}</strong><span>Rank ${weapon.level}</span>`;
      ui.loadout.appendChild(chip);
    });
  }

  function updateRecords() {
    ui.best.textContent = formatTime(state.records.bestTime || 0);
    ui.wins.textContent = `${state.records.wins || 0} wins`;
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastFrame) / 1000);
    lastFrame = now;
    update(dt);
    if (state.mode !== "playing") updateEffects(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function togglePause() {
    if (state.mode === "playing") {
      state.mode = "paused";
      ui.pauseButton.textContent = "Resume";
    } else if (state.mode === "paused") {
      state.mode = "playing";
      ui.pauseButton.textContent = "Pause";
    }
  }

  function setupInput() {
    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", " "].includes(key)) {
        event.preventDefault();
      }
      if (key === " ") {
        togglePause();
      } else {
        keys.add(key);
      }
    });
    window.addEventListener("keyup", (event) => {
      keys.delete(event.key.toLowerCase());
    });

    const startTouch = (event) => {
      const touch = event.changedTouches[0];
      pointer.active = true;
      pointer.id = touch.identifier;
      pointer.baseX = touch.clientX;
      pointer.baseY = touch.clientY;
      pointer.x = touch.clientX;
      pointer.y = touch.clientY;
      ui.touchStick.style.left = `${touch.clientX - 52}px`;
      ui.touchStick.style.bottom = `${window.innerHeight - touch.clientY - 52}px`;
      ui.touchKnob.style.transform = "translate(-50%, -50%)";
    };

    const moveTouch = (event) => {
      if (!pointer.active) return;
      const touch = Array.from(event.changedTouches).find((item) => item.identifier === pointer.id);
      if (!touch) return;
      pointer.x = touch.clientX;
      pointer.y = touch.clientY;
      const dx = pointer.x - pointer.baseX;
      const dy = pointer.y - pointer.baseY;
      const length = Math.hypot(dx, dy);
      const max = 42;
      const scale = length > max ? max / length : 1;
      pointer.dx = clamp(dx / max, -1, 1);
      pointer.dy = clamp(dy / max, -1, 1);
      ui.touchKnob.style.transform = `translate(calc(-50% + ${dx * scale}px), calc(-50% + ${dy * scale}px))`;
      event.preventDefault();
    };

    const endTouch = (event) => {
      const touch = Array.from(event.changedTouches).find((item) => item.identifier === pointer.id);
      if (!touch) return;
      pointer.active = false;
      pointer.id = null;
      pointer.dx = 0;
      pointer.dy = 0;
      ui.touchKnob.style.transform = "translate(-50%, -50%)";
    };

    canvas.addEventListener("touchstart", startTouch, { passive: true });
    canvas.addEventListener("touchmove", moveTouch, { passive: false });
    canvas.addEventListener("touchend", endTouch, { passive: true });
    canvas.addEventListener("touchcancel", endTouch, { passive: true });
  }

  function boot() {
    resize();
    updateRecords();
    setupInput();
    state.player = {
      x: WORLD.width / 2,
      y: WORLD.height / 2,
      radius: 17,
      speed: 225,
      health: 100,
      maxHealth: 100,
      regen: 0.55,
      pickup: 86,
      hurtTimer: 0,
      angle: 0
    };
    state.weapons = {
      orbit: cloneWeapon("orbit"),
      crossbow: cloneWeapon("crossbow"),
      sigil: cloneWeapon("sigil"),
      bats: cloneWeapon("bats")
    };
    updateHud();
    ui.startButton.addEventListener("click", resetRun);
    ui.restartButton.addEventListener("click", resetRun);
    ui.pauseButton.addEventListener("click", togglePause);
    window.addEventListener("resize", resize);
    requestAnimationFrame(loop);
  }

  function cloneWeapon(key) {
    return Object.assign({}, weaponCatalog[key]);
  }

  boot();
})();
