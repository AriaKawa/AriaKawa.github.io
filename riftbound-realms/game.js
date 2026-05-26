(() => {
    "use strict";

    const SAVE_KEY = "riftbound-realms-save";
    const SETTINGS_KEY = "riftbound-realms-settings";
    const WORLD = { w: 3600, h: 2500 };
    const VIEW = { w: 1280, h: 720 };
    const MAX_INVENTORY = 18;
    const TICK = 1 / 60;
    const RARITIES = ["common", "fine", "rare", "epic", "mythic"];
    const BIOMES = [
        { id: "shardfen", name: "Shardfen Realm", color: "#1e4030", floor: "#203a2c", accent: "#74b86a" },
        { id: "sunglass", name: "Sunglass Expanse", color: "#403826", floor: "#3b3125", accent: "#f0c15c" },
    ];
    const DUNGEONS = [
        { id: "mire-vault", name: "Mire Vault", color: "#54a35d", enemies: ["mireling", "thornEye"], boss: "mireCrown" },
        { id: "glass-warrens", name: "Glass Warrens", color: "#61c6c7", enemies: ["glassImp", "shardMage"], boss: "prismWyrm" },
        { id: "starfall-crypt", name: "Starfall Crypt", color: "#8d69df", enemies: ["cryptWisp", "starAcolyte"], boss: "eclipsePrior" },
    ];

    const CLASS_DEFS = {
        ironVow: {
            name: "Iron Vow",
            role: "Melee guard",
            color: "#b6bac4",
            hp: 170,
            speed: 210,
            fireRate: 6.2,
            damage: 24,
            range: 310,
            shotSpeed: 620,
            spread: 0.42,
            shots: 2,
            sprite: "classGuard",
            desc: "Heavy armor, wide sword arcs, and sturdy health.",
        },
        thornScout: {
            name: "Thorn Scout",
            role: "Bow scout",
            color: "#74b86a",
            hp: 115,
            speed: 275,
            fireRate: 5.3,
            damage: 27,
            range: 710,
            shotSpeed: 850,
            spread: 0.05,
            shots: 1,
            sprite: "classScout",
            desc: "Fast feet, clean arrows, and long reach.",
        },
        emberSage: {
            name: "Ember Sage",
            role: "Spellcaster",
            color: "#d95f4d",
            hp: 105,
            speed: 235,
            fireRate: 4.3,
            damage: 18,
            range: 640,
            shotSpeed: 700,
            spread: 0.22,
            shots: 3,
            sprite: "classSage",
            desc: "Triple bolts and strong burst damage.",
        },
        dawnMender: {
            name: "Dawn Mender",
            role: "Healer",
            color: "#f0c15c",
            hp: 132,
            speed: 225,
            fireRate: 4.6,
            damage: 18,
            range: 560,
            shotSpeed: 660,
            spread: 0.08,
            shots: 1,
            regen: 3.2,
            sprite: "classMender",
            desc: "Radiant bolts, passive healing, and steady runs.",
        },
        veilKnave: {
            name: "Veil Knave",
            role: "Assassin",
            color: "#8d69df",
            hp: 98,
            speed: 292,
            fireRate: 7.4,
            damage: 17,
            range: 470,
            shotSpeed: 780,
            spread: 0.14,
            shots: 2,
            sprite: "classKnave",
            desc: "Quick knives, high speed, and risky pressure.",
        },
        runeShepherd: {
            name: "Rune Shepherd",
            role: "Summoner",
            color: "#61c6c7",
            hp: 122,
            speed: 220,
            fireRate: 3.7,
            damage: 17,
            range: 600,
            shotSpeed: 630,
            spread: 0.04,
            shots: 1,
            summons: 2,
            sprite: "classShepherd",
            desc: "Guiding runes orbit and harry nearby foes.",
        },
    };

    const ENEMY_DEFS = {
        mireling: { name: "Mireling", sprite: "enemyMire", hp: 42, speed: 78, damage: 13, xp: 12, radius: 18, color: "#74b86a", kind: "chaser" },
        thornEye: { name: "Thorn Eye", sprite: "enemyEye", hp: 58, speed: 54, damage: 15, xp: 18, radius: 18, color: "#a4d16f", kind: "shooter", fireRate: 1.4 },
        glassImp: { name: "Glass Imp", sprite: "enemyImp", hp: 52, speed: 112, damage: 16, xp: 18, radius: 17, color: "#61c6c7", kind: "zigzag" },
        shardMage: { name: "Shard Mage", sprite: "enemyMage", hp: 84, speed: 50, damage: 19, xp: 30, radius: 20, color: "#79d8dd", kind: "shooter", fireRate: 1.05 },
        cryptWisp: { name: "Crypt Wisp", sprite: "enemyWisp", hp: 46, speed: 92, damage: 18, xp: 20, radius: 16, color: "#8d69df", kind: "orbit" },
        starAcolyte: { name: "Star Acolyte", sprite: "enemyAcolyte", hp: 96, speed: 58, damage: 23, xp: 36, radius: 21, color: "#c08cff", kind: "burst", fireRate: 1.8 },
    };

    const BOSS_DEFS = {
        mireCrown: { name: "Crown of Vines", sprite: "bossMire", hp: 920, damage: 22, xp: 380, radius: 46, color: "#74b86a", pattern: "spiral" },
        prismWyrm: { name: "Prism Wyrm", sprite: "bossPrism", hp: 1100, damage: 26, xp: 460, radius: 52, color: "#61c6c7", pattern: "fan" },
        eclipsePrior: { name: "Eclipse Prior", sprite: "bossEclipse", hp: 1280, damage: 30, xp: 540, radius: 50, color: "#8d69df", pattern: "rings" },
        gateTitan: { name: "Gate Titan", sprite: "bossTitan", hp: 1500, damage: 32, xp: 680, radius: 58, color: "#f0c15c", pattern: "fan" },
    };

    const ITEM_POOLS = {
        weapon: ["Gleambrand", "Thornstring", "Sunspike", "Moonknife", "Rune Crook", "Ash Wand"],
        armor: ["Mist Hauberk", "Glassmail", "Verdant Plate", "Oath Robe", "Cinder Jerkin", "Starhide"],
        charm: ["Bright Seed", "Warding Coin", "Rift Lens", "Echo Loop", "Fever Opal", "Mender Bell"],
    };

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const miniCanvas = document.getElementById("miniCanvas");
    const miniCtx = miniCanvas.getContext("2d");
    const ui = {
        zoneLabel: document.getElementById("zoneLabel"),
        hpText: document.getElementById("hpText"),
        hpFill: document.getElementById("hpFill"),
        xpFill: document.getElementById("xpFill"),
        levelText: document.getElementById("levelText"),
        scoreText: document.getElementById("scoreText"),
        classLabel: document.getElementById("classLabel"),
        leaderboard: document.getElementById("leaderboardList"),
        inventory: document.getElementById("inventoryGrid"),
        hint: document.getElementById("itemHint"),
        slots: {
            weapon: document.getElementById("slotWeapon"),
            armor: document.getElementById("slotArmor"),
            charm: document.getElementById("slotCharm"),
        },
        classScreen: document.getElementById("classScreen"),
        classGrid: document.getElementById("classGrid"),
        bestRun: document.getElementById("bestRunText"),
        continueButton: document.getElementById("continueButton"),
        deathScreen: document.getElementById("deathScreen"),
        deathStats: document.getElementById("deathStats"),
        restartButton: document.getElementById("restartButton"),
        portalButton: document.getElementById("portalButton"),
        returnButton: document.getElementById("returnButton"),
        autoButton: document.getElementById("autoButton"),
        sortButton: document.getElementById("sortButton"),
    };

    const keys = new Set();
    const pointer = { x: VIEW.w / 2, y: VIEW.h / 2, down: false, active: false };
    const settings = loadSettings();
    const save = loadSave();
    const atlas = createAtlas();
    let selectedClass = save.lastClass || "ironVow";
    let frame = 0;
    let last = performance.now();
    let accumulator = 0;
    let camera = { x: 0, y: 0 };
    let selectedItemId = null;

    const state = {
        mode: "menu",
        zone: "realm",
        dungeon: null,
        player: null,
        bots: [],
        enemies: [],
        bosses: [],
        bullets: [],
        enemyBullets: [],
        loot: [],
        portals: [],
        particles: [],
        floaters: [],
        summons: [],
        realmTime: 0,
        actionPortal: null,
        toast: "",
        toastTimer: 0,
    };

    initClassScreen();
    bindEvents();
    resize();
    renderInventory();
    requestAnimationFrame(loop);

    function initClassScreen() {
        ui.bestRun.textContent = `${save.bestFame || 0} fame`;
        ui.classGrid.innerHTML = "";
        for (const [id, def] of Object.entries(CLASS_DEFS)) {
            const button = document.createElement("button");
            button.className = "class-card";
            button.type = "button";
            button.style.setProperty("--class-color", def.color);
            button.setAttribute("aria-pressed", id === selectedClass ? "true" : "false");
            button.dataset.classId = id;
            button.innerHTML = `<i aria-hidden="true"></i><strong>${def.name}</strong><span>${def.role}</span><p>${def.desc}</p>`;
            button.addEventListener("click", () => {
                selectedClass = id;
                save.lastClass = id;
                writeSave();
                for (const card of ui.classGrid.querySelectorAll(".class-card")) {
                    card.setAttribute("aria-pressed", card.dataset.classId === id ? "true" : "false");
                }
            });
            ui.classGrid.appendChild(button);
        }
    }

    function bindEvents() {
        window.addEventListener("resize", resize);
        window.addEventListener("keydown", (event) => {
            keys.add(event.key.toLowerCase());
            if (event.key.toLowerCase() === "e") enterNearestPortal();
            if (event.key.toLowerCase() === "r" && state.zone === "dungeon") returnToRealm();
        });
        window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
        canvas.addEventListener("pointerdown", (event) => {
            pointer.down = true;
            pointer.active = true;
            setPointer(event);
            canvas.setPointerCapture(event.pointerId);
        });
        canvas.addEventListener("pointermove", setPointer);
        canvas.addEventListener("pointerup", (event) => {
            pointer.down = false;
            setPointer(event);
        });
        ui.continueButton.addEventListener("click", () => startRun(selectedClass));
        ui.restartButton.addEventListener("click", () => {
            ui.deathScreen.hidden = true;
            ui.classScreen.hidden = false;
            state.mode = "menu";
        });
        ui.portalButton.addEventListener("click", enterNearestPortal);
        ui.returnButton.addEventListener("click", returnToRealm);
        ui.autoButton.addEventListener("click", () => {
            settings.autoFire = !settings.autoFire;
            writeSettings();
            updateAutoButton();
        });
        ui.sortButton.addEventListener("click", () => {
            if (!state.player) return;
            state.player.inventory.sort((a, b) => itemScore(b) - itemScore(a));
            selectedItemId = null;
            renderInventory();
            saveCharacter();
        });
    }

    function setPointer(event) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width * VIEW.w;
        pointer.y = (event.clientY - rect.top) / rect.height * VIEW.h;
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        ctx.setTransform(canvas.width / VIEW.w, 0, 0, canvas.height / VIEW.h, 0, 0);
        ctx.imageSmoothingEnabled = false;
        miniCtx.imageSmoothingEnabled = false;
    }

    function startRun(classId) {
        const def = CLASS_DEFS[classId];
        const equipment = cleanEquipment(save.character?.equipment);
        const inventory = cleanInventory(save.character?.inventory);
        state.player = createActor({
            id: "player",
            name: "You",
            classId,
            x: WORLD.w * 0.5,
            y: WORLD.h * 0.52,
            bot: false,
            equipment,
            inventory,
        });
        state.player.hp = maxHp(state.player);
        state.player.fireTimer = 0;
        state.mode = "play";
        state.zone = "realm";
        state.dungeon = null;
        state.realmTime = 0;
        state.toast = `${def.name} crossed the rift gate.`;
        state.toastTimer = 2.8;
        ui.classScreen.hidden = true;
        ui.deathScreen.hidden = true;
        generateRealm();
        renderInventory();
        updateAutoButton();
        saveCharacter();
    }

    function generateRealm() {
        state.enemies = [];
        state.bosses = [];
        state.bullets = [];
        state.enemyBullets = [];
        state.loot = [];
        state.portals = [];
        state.particles = [];
        state.floaters = [];
        state.summons = [];
        state.bots = [];

        for (let i = 0; i < 5; i += 1) {
            const classIds = Object.keys(CLASS_DEFS);
            const classId = classIds[i % classIds.length];
            state.bots.push(createActor({
                id: `bot-${i}`,
                name: ["Kestrel", "Mira", "Sol", "Pax", "Rook"][i],
                classId,
                x: WORLD.w * 0.5 + rand(-180, 180),
                y: WORLD.h * 0.52 + rand(-160, 160),
                bot: true,
                equipment: {},
                inventory: [],
            }));
        }

        for (let i = 0; i < 138; i += 1) {
            spawnEnemy(i < 70 ? "mireling" : i < 92 ? "thornEye" : i < 116 ? "glassImp" : "shardMage", randomWorldPoint());
        }
        for (let i = 0; i < 32; i += 1) {
            spawnEnemy(i % 2 ? "cryptWisp" : "starAcolyte", randomWorldPoint());
        }
        state.bosses.push(createBoss("gateTitan", WORLD.w * 0.82, WORLD.h * 0.42, true));
        state.bosses.push(createBoss("mireCrown", WORLD.w * 0.2, WORLD.h * 0.64, true));
        DUNGEONS.forEach((dungeon, index) => {
            state.portals.push({
                id: dungeon.id,
                dungeonId: dungeon.id,
                x: 650 + index * 1120,
                y: 430 + (index % 2) * 1460,
                radius: 40,
                color: dungeon.color,
                pulse: rand(0, 10),
            });
        });
    }

    function generateDungeon(dungeonId) {
        const dungeon = DUNGEONS.find((item) => item.id === dungeonId) || DUNGEONS[0];
        state.zone = "dungeon";
        state.dungeon = dungeon;
        state.enemies = [];
        state.bosses = [];
        state.bullets = [];
        state.enemyBullets = [];
        state.loot = [];
        state.portals = [];
        state.particles = [];
        state.floaters = [];
        state.summons = [];
        state.player.x = WORLD.w * 0.5;
        state.player.y = WORLD.h * 0.5;
        for (const bot of state.bots) {
            bot.x = state.player.x + rand(-130, 130);
            bot.y = state.player.y + rand(-120, 120);
            bot.hp = maxHp(bot);
        }
        for (let i = 0; i < 86; i += 1) {
            const type = dungeon.enemies[i % dungeon.enemies.length];
            spawnEnemy(type, {
                x: WORLD.w * 0.5 + rand(-1150, 1150),
                y: WORLD.h * 0.5 + rand(-780, 780),
            });
        }
        state.bosses.push(createBoss(dungeon.boss, WORLD.w * 0.5 + 820, WORLD.h * 0.5 - 180));
        state.toast = `${dungeon.name} opened.`;
        state.toastTimer = 3;
        saveCharacter();
    }

    function createActor({ id, name, classId, x, y, bot, equipment, inventory }) {
        const def = CLASS_DEFS[classId];
        return {
            id,
            name,
            classId,
            x,
            y,
            vx: 0,
            vy: 0,
            aim: 0,
            hp: def.hp,
            xp: bot ? randInt(0, 280) : save.character?.xp || 0,
            fame: bot ? randInt(25, 920) : save.character?.fame || 0,
            level: 1,
            bot,
            fireTimer: rand(0, 0.4),
            hurtTimer: 0,
            inventory: inventory || [],
            equipment: equipment || {},
            targetId: null,
            pathTimer: 0,
            summonTimer: 0,
        };
    }

    function spawnEnemy(type, point) {
        const def = ENEMY_DEFS[type];
        const elite = Math.random() < 0.1;
        state.enemies.push({
            id: makeId("enemy"),
            type,
            x: clamp(point.x, 80, WORLD.w - 80),
            y: clamp(point.y, 80, WORLD.h - 80),
            hp: def.hp * (elite ? 2.35 : 1),
            maxHp: def.hp * (elite ? 2.35 : 1),
            radius: def.radius * (elite ? 1.22 : 1),
            elite,
            fireTimer: rand(0, 2),
            phase: rand(0, Math.PI * 2),
            hurtTimer: 0,
        });
    }

    function createBoss(type, x, y, roaming = false) {
        const def = BOSS_DEFS[type];
        return {
            id: makeId("boss"),
            type,
            x,
            y,
            hp: def.hp,
            maxHp: def.hp,
            radius: def.radius,
            fireTimer: 1.4,
            phase: rand(0, Math.PI * 2),
            hurtTimer: 0,
            roaming,
        };
    }

    function loop(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        accumulator += dt;
        while (accumulator >= TICK) {
            if (state.mode === "play") step(TICK);
            accumulator -= TICK;
        }
        draw();
        if (state.mode === "play") updateUi();
        requestAnimationFrame(loop);
    }

    function step(dt) {
        frame += 1;
        state.realmTime += dt;
        state.toastTimer = Math.max(0, state.toastTimer - dt);
        state.actionPortal = null;
        updatePlayer(dt);
        updateBots(dt);
        updateSummons(dt);
        updateEnemies(dt);
        updateBosses(dt);
        updateBullets(dt);
        updateEnemyBullets(dt);
        updateLoot(dt);
        updateParticles(dt);
        updateCamera();
        maybeRepopulate();
        if (frame % 120 === 0) saveCharacter();
    }

    function updatePlayer(dt) {
        const player = state.player;
        if (!player) return;
        const input = getInputVector();
        const speed = moveSpeed(player);
        player.vx = input.x * speed;
        player.vy = input.y * speed;
        player.x = clamp(player.x + player.vx * dt, 36, WORLD.w - 36);
        player.y = clamp(player.y + player.vy * dt, 36, WORLD.h - 36);
        player.aim = angleFromPointer(player);
        player.hp = Math.min(maxHp(player), player.hp + regen(player) * dt);
        player.hurtTimer = Math.max(0, player.hurtTimer - dt);
        if (settings.autoFire || pointer.down) fireActor(player, dt, nearestTarget(player, 780));
        updateSummoner(player, dt);

        for (const portal of state.portals) {
            if (dist(player, portal) < portal.radius + 32) {
                state.actionPortal = portal;
                break;
            }
        }
        ui.portalButton.hidden = !(state.actionPortal && state.zone === "realm");
        ui.returnButton.hidden = state.zone !== "dungeon";
    }

    function getInputVector() {
        let x = 0;
        let y = 0;
        if (keys.has("w") || keys.has("arrowup")) y -= 1;
        if (keys.has("s") || keys.has("arrowdown")) y += 1;
        if (keys.has("a") || keys.has("arrowleft")) x -= 1;
        if (keys.has("d") || keys.has("arrowright")) x += 1;
        if (!x && !y && pointer.down && isSmallScreen()) {
            const dx = pointer.x - VIEW.w / 2;
            const dy = pointer.y - VIEW.h / 2;
            if (Math.hypot(dx, dy) > 90) {
                x = dx;
                y = dy;
            }
        }
        const len = Math.hypot(x, y) || 1;
        return { x: x / len, y: y / len };
    }

    function angleFromPointer(actor) {
        const worldPointer = screenToWorld(pointer.x, pointer.y);
        if (pointer.active) return Math.atan2(worldPointer.y - actor.y, worldPointer.x - actor.x);
        const target = nearestTarget(actor, 700);
        return target ? Math.atan2(target.y - actor.y, target.x - actor.x) : actor.aim;
    }

    function updateBots(dt) {
        for (const bot of state.bots) {
            if (bot.hp <= 0) {
                bot.hp = maxHp(bot);
                bot.x = state.player.x + rand(-240, 240);
                bot.y = state.player.y + rand(-220, 220);
            }
            const target = nearestTarget(bot, 700);
            bot.pathTimer -= dt;
            if (target) {
                const angle = Math.atan2(target.y - bot.y, target.x - bot.x);
                const gap = dist(bot, target);
                const keep = gap < 230 ? -0.7 : 1;
                bot.vx = Math.cos(angle) * moveSpeed(bot) * keep + Math.cos(bot.phase + state.realmTime) * 35;
                bot.vy = Math.sin(angle) * moveSpeed(bot) * keep + Math.sin(bot.phase + state.realmTime) * 35;
                bot.aim = angle;
                fireActor(bot, dt, target);
            } else {
                const angle = Math.atan2(state.player.y - bot.y, state.player.x - bot.x);
                bot.vx = Math.cos(angle) * moveSpeed(bot) * 0.65;
                bot.vy = Math.sin(angle) * moveSpeed(bot) * 0.65;
            }
            bot.x = clamp(bot.x + bot.vx * dt, 38, WORLD.w - 38);
            bot.y = clamp(bot.y + bot.vy * dt, 38, WORLD.h - 38);
            bot.hp = Math.min(maxHp(bot), bot.hp + regen(bot) * dt);
            bot.hurtTimer = Math.max(0, bot.hurtTimer - dt);
            updateSummoner(bot, dt);
        }
    }

    function updateSummoner(actor, dt) {
        const def = CLASS_DEFS[actor.classId];
        if (!def.summons) return;
        actor.summonTimer -= dt;
        const owned = state.summons.filter((summon) => summon.ownerId === actor.id);
        if (owned.length < def.summons && actor.summonTimer <= 0) {
            actor.summonTimer = 1.2;
            state.summons.push({
                id: makeId("summon"),
                ownerId: actor.id,
                x: actor.x + rand(-35, 35),
                y: actor.y + rand(-35, 35),
                angle: rand(0, Math.PI * 2),
                fireTimer: rand(0, 0.4),
            });
        }
    }

    function updateSummons(dt) {
        for (const summon of state.summons) {
            const owner = findActor(summon.ownerId);
            if (!owner || owner.hp <= 0) {
                summon.dead = true;
                continue;
            }
            summon.angle += dt * 2.4;
            summon.x += (owner.x + Math.cos(summon.angle) * 58 - summon.x) * 0.12;
            summon.y += (owner.y + Math.sin(summon.angle) * 58 - summon.y) * 0.12;
            summon.fireTimer -= dt;
            const target = nearestTarget(summon, 420);
            if (target && summon.fireTimer <= 0) {
                summon.fireTimer = 0.72;
                spawnBullet({
                    ownerId: owner.id,
                    x: summon.x,
                    y: summon.y,
                    angle: Math.atan2(target.y - summon.y, target.x - summon.x),
                    speed: 560,
                    damage: damage(owner) * 0.45,
                    range: 440,
                    color: CLASS_DEFS[owner.classId].color,
                    radius: 5,
                    friendly: true,
                });
            }
        }
        state.summons = state.summons.filter((summon) => !summon.dead);
    }

    function updateEnemies(dt) {
        const actors = livingActors();
        for (const enemy of state.enemies) {
            const def = ENEMY_DEFS[enemy.type];
            const target = nearestActor(enemy, actors, 660);
            enemy.phase += dt;
            enemy.hurtTimer = Math.max(0, enemy.hurtTimer - dt);
            if (target) {
                const angle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
                const gap = dist(enemy, target);
                let speed = def.speed;
                let ax = Math.cos(angle);
                let ay = Math.sin(angle);
                if (def.kind === "shooter" && gap < 360) {
                    ax *= -0.34;
                    ay *= -0.34;
                }
                if (def.kind === "zigzag") {
                    ax += Math.cos(enemy.phase * 5) * 0.48;
                    ay += Math.sin(enemy.phase * 5) * 0.48;
                }
                if (def.kind === "orbit") {
                    ax += Math.cos(angle + Math.PI / 2) * 0.78;
                    ay += Math.sin(angle + Math.PI / 2) * 0.78;
                }
                enemy.x = clamp(enemy.x + ax * speed * dt, 32, WORLD.w - 32);
                enemy.y = clamp(enemy.y + ay * speed * dt, 32, WORLD.h - 32);
                if (def.fireRate) {
                    enemy.fireTimer -= dt;
                    if (enemy.fireTimer <= 0) {
                        enemy.fireTimer = def.fireRate * rand(0.75, 1.25);
                        fireEnemy(enemy, target, def);
                    }
                }
                if (gap < enemy.radius + actorRadius(target)) damageActor(target, def.damage * dt * 1.8, enemy);
            }
        }
        state.enemies = state.enemies.filter((enemy) => enemy.hp > 0);
    }

    function updateBosses(dt) {
        const actors = livingActors();
        for (const boss of state.bosses) {
            const def = BOSS_DEFS[boss.type];
            boss.phase += dt;
            boss.hurtTimer = Math.max(0, boss.hurtTimer - dt);
            const target = nearestActor(boss, actors, 1050);
            if (!target) continue;
            const angle = Math.atan2(target.y - boss.y, target.x - boss.x);
            const drift = boss.roaming ? 46 : 30;
            boss.x = clamp(boss.x + Math.cos(angle) * drift * dt + Math.cos(boss.phase * 0.8) * 11 * dt, 70, WORLD.w - 70);
            boss.y = clamp(boss.y + Math.sin(angle) * drift * dt + Math.sin(boss.phase * 0.9) * 11 * dt, 70, WORLD.h - 70);
            boss.fireTimer -= dt;
            if (boss.fireTimer <= 0) {
                boss.fireTimer = def.pattern === "spiral" ? 0.42 : def.pattern === "rings" ? 1.25 : 0.78;
                fireBoss(boss, target, def);
            }
            if (dist(boss, target) < boss.radius + actorRadius(target)) damageActor(target, def.damage * dt * 2.2, boss);
        }
        state.bosses = state.bosses.filter((boss) => boss.hp > 0);
    }

    function fireActor(actor, dt, target) {
        actor.fireTimer -= dt;
        if (actor.fireTimer > 0 || !target) return;
        const def = CLASS_DEFS[actor.classId];
        const rate = fireRate(actor);
        actor.fireTimer = 1 / rate;
        actor.aim = Math.atan2(target.y - actor.y, target.x - actor.x);
        const shots = def.shots + (actor.equipment.weapon?.bonusShots || 0);
        for (let i = 0; i < shots; i += 1) {
            const offset = shots === 1 ? 0 : (i / (shots - 1) - 0.5) * def.spread;
            spawnBullet({
                ownerId: actor.id,
                x: actor.x + Math.cos(actor.aim) * 22,
                y: actor.y + Math.sin(actor.aim) * 22,
                angle: actor.aim + offset + rand(-0.025, 0.025),
                speed: def.shotSpeed,
                damage: damage(actor),
                range: def.range + itemStat(actor, "range"),
                color: def.color,
                radius: actor.classId === "ironVow" ? 9 : 6,
                friendly: true,
            });
        }
    }

    function spawnBullet(data) {
        state.bullets.push({
            id: makeId("bullet"),
            ownerId: data.ownerId,
            x: data.x,
            y: data.y,
            vx: Math.cos(data.angle) * data.speed,
            vy: Math.sin(data.angle) * data.speed,
            damage: data.damage,
            range: data.range,
            traveled: 0,
            radius: data.radius,
            color: data.color,
            friendly: data.friendly,
        });
    }

    function fireEnemy(enemy, target, def) {
        const base = Math.atan2(target.y - enemy.y, target.x - enemy.x);
        const count = def.kind === "burst" ? 5 : 1;
        for (let i = 0; i < count; i += 1) {
            const angle = base + (i - (count - 1) / 2) * 0.28;
            state.enemyBullets.push(makeEnemyBullet(enemy, angle, def.damage, def.color, 380));
        }
    }

    function fireBoss(boss, target, def) {
        const base = Math.atan2(target.y - boss.y, target.x - boss.x);
        if (def.pattern === "spiral") {
            for (let i = 0; i < 4; i += 1) state.enemyBullets.push(makeEnemyBullet(boss, boss.phase * 4 + i * Math.PI / 2, def.damage, def.color, 420));
            return;
        }
        if (def.pattern === "rings") {
            for (let i = 0; i < 18; i += 1) state.enemyBullets.push(makeEnemyBullet(boss, i / 18 * Math.PI * 2 + boss.phase * 0.4, def.damage, def.color, 330));
            return;
        }
        for (let i = 0; i < 7; i += 1) state.enemyBullets.push(makeEnemyBullet(boss, base + (i - 3) * 0.18, def.damage, def.color, 460));
    }

    function makeEnemyBullet(source, angle, damageValue, color, speed) {
        return {
            id: makeId("eb"),
            x: source.x + Math.cos(angle) * source.radius,
            y: source.y + Math.sin(angle) * source.radius,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            damage: damageValue,
            range: 920,
            traveled: 0,
            radius: 7,
            color,
        };
    }

    function updateBullets(dt) {
        for (const bullet of state.bullets) {
            bullet.x += bullet.vx * dt;
            bullet.y += bullet.vy * dt;
            bullet.traveled += Math.hypot(bullet.vx * dt, bullet.vy * dt);
            let hit = false;
            for (const enemy of state.enemies) {
                if (dist(bullet, enemy) < bullet.radius + enemy.radius) {
                    hit = true;
                    damageEnemy(enemy, bullet.damage, bullet.ownerId);
                    break;
                }
            }
            if (!hit) {
                for (const boss of state.bosses) {
                    if (dist(bullet, boss) < bullet.radius + boss.radius) {
                        hit = true;
                        damageBoss(boss, bullet.damage, bullet.ownerId);
                        break;
                    }
                }
            }
            bullet.dead = hit || bullet.traveled > bullet.range || outOfWorld(bullet);
        }
        state.bullets = state.bullets.filter((bullet) => !bullet.dead);
    }

    function updateEnemyBullets(dt) {
        const actors = livingActors();
        for (const bullet of state.enemyBullets) {
            bullet.x += bullet.vx * dt;
            bullet.y += bullet.vy * dt;
            bullet.traveled += Math.hypot(bullet.vx * dt, bullet.vy * dt);
            for (const actor of actors) {
                if (dist(bullet, actor) < bullet.radius + actorRadius(actor)) {
                    damageActor(actor, bullet.damage, bullet);
                    bullet.dead = true;
                    break;
                }
            }
            if (bullet.traveled > bullet.range || outOfWorld(bullet)) bullet.dead = true;
        }
        state.enemyBullets = state.enemyBullets.filter((bullet) => !bullet.dead);
    }

    function damageEnemy(enemy, amount, ownerId) {
        enemy.hp -= amount;
        enemy.hurtTimer = 0.12;
        sparkle(enemy.x, enemy.y, ENEMY_DEFS[enemy.type].color, 4);
        if (enemy.hp <= 0) {
            const def = ENEMY_DEFS[enemy.type];
            award(ownerId, def.xp * (enemy.elite ? 2.2 : 1));
            maybeDrop(enemy.x, enemy.y, enemy.elite ? 0.34 : 0.14, enemy.elite ? 2 : 1);
        }
    }

    function damageBoss(boss, amount, ownerId) {
        boss.hp -= amount;
        boss.hurtTimer = 0.12;
        sparkle(boss.x, boss.y, BOSS_DEFS[boss.type].color, 6);
        if (boss.hp <= 0) {
            const def = BOSS_DEFS[boss.type];
            award(ownerId, def.xp);
            maybeDrop(boss.x, boss.y, 1, 4);
            for (let i = 0; i < 3; i += 1) maybeDrop(boss.x + rand(-46, 46), boss.y + rand(-46, 46), 0.86, 3);
            state.toast = `${def.name} collapsed into loot.`;
            state.toastTimer = 3;
        }
    }

    function damageActor(actor, amount) {
        actor.hp -= amount * (1 - armor(actor));
        actor.hurtTimer = 0.2;
        if (actor.id === "player") {
            sparkle(actor.x, actor.y, "#e05c67", 3);
            if (actor.hp <= 0) die();
        }
    }

    function award(ownerId, xp) {
        const actor = findActor(ownerId);
        if (!actor) return;
        actor.xp += Math.round(xp);
        actor.fame += Math.max(1, Math.round(xp * 0.42));
        const old = actor.level;
        actor.level = levelForXp(actor.xp);
        if (actor.level > old) {
            actor.hp = Math.min(maxHp(actor), actor.hp + 38);
            if (actor.id === "player") {
                state.toast = `Level ${actor.level}`;
                state.toastTimer = 1.8;
            }
        }
    }

    function maybeDrop(x, y, chance, tierBias = 1) {
        if (Math.random() > chance) return;
        const item = createItem(tierBias);
        state.loot.push({
            id: item.id,
            item,
            x,
            y,
            bob: rand(0, Math.PI * 2),
            life: 80,
        });
    }

    function createItem(tierBias = 1) {
        const type = ["weapon", "armor", "charm"][randInt(0, 2)];
        const tier = clamp(randInt(1, 3) + (Math.random() < tierBias * 0.22 ? 1 : 0) + (Math.random() < tierBias * 0.08 ? 1 : 0), 1, 5);
        const rarity = RARITIES[tier - 1];
        const name = `${ITEM_POOLS[type][randInt(0, ITEM_POOLS[type].length - 1)]} ${roman(tier)}`;
        const item = {
            id: makeId("item"),
            type,
            name,
            tier,
            rarity,
            color: rarityColor(rarity),
            damage: type === "weapon" ? tier * 4 + randInt(0, tier + 1) : 0,
            hp: type === "armor" ? tier * 16 + randInt(0, tier * 4) : 0,
            speed: type === "charm" ? tier * 5 : 0,
            regen: type === "charm" ? tier * 0.8 : 0,
            range: type === "weapon" ? tier * 18 : 0,
            bonusShots: type === "weapon" && tier >= 4 && Math.random() < 0.28 ? 1 : 0,
            armor: type === "armor" ? tier * 0.035 : 0,
        };
        return item;
    }

    function updateLoot(dt) {
        const player = state.player;
        for (const drop of state.loot) {
            drop.bob += dt * 4;
            drop.life -= dt;
            if (player && dist(player, drop) < 42) {
                pickup(drop.item);
                drop.dead = true;
            }
        }
        state.loot = state.loot.filter((drop) => !drop.dead && drop.life > 0);
    }

    function pickup(item) {
        const inv = state.player.inventory;
        if (inv.length >= MAX_INVENTORY) {
            const weakest = inv.reduce((worst, current) => itemScore(current) < itemScore(worst) ? current : worst, inv[0]);
            if (itemScore(item) <= itemScore(weakest)) {
                state.toast = "Pack full";
                state.toastTimer = 1.2;
                return;
            }
            inv.splice(inv.indexOf(weakest), 1);
        }
        inv.push(item);
        selectedItemId = item.id;
        state.toast = item.name;
        state.toastTimer = 2;
        renderInventory();
        saveCharacter();
    }

    function equipItem(id) {
        const player = state.player;
        const item = player.inventory.find((entry) => entry.id === id);
        if (!item) return;
        const current = player.equipment[item.type];
        player.equipment[item.type] = item;
        player.inventory = player.inventory.filter((entry) => entry.id !== id);
        if (current) player.inventory.push(current);
        player.hp = Math.min(maxHp(player), player.hp + (item.hp || 0));
        selectedItemId = null;
        renderInventory();
        saveCharacter();
    }

    function renderInventory() {
        ui.inventory.innerHTML = "";
        const player = state.player;
        for (let i = 0; i < MAX_INVENTORY; i += 1) {
            const item = player?.inventory[i];
            const button = document.createElement("button");
            button.type = "button";
            button.className = "item-cell";
            if (item) {
                button.style.setProperty("--item-color", item.color);
                button.dataset.rarity = item.rarity;
                button.title = itemSummary(item);
                button.innerHTML = `<span>T${item.tier}</span>`;
                button.addEventListener("click", () => {
                    if (selectedItemId === item.id) equipItem(item.id);
                    else {
                        selectedItemId = item.id;
                        ui.hint.textContent = itemSummary(item);
                    }
                });
            } else {
                button.disabled = true;
            }
            ui.inventory.appendChild(button);
        }
        for (const slot of ["weapon", "armor", "charm"]) {
            ui.slots[slot].textContent = player?.equipment[slot]?.name || "Empty";
        }
        if (!selectedItemId) ui.hint.textContent = "No item selected.";
    }

    function enterNearestPortal() {
        if (state.mode !== "play" || state.zone !== "realm" || !state.actionPortal) return;
        generateDungeon(state.actionPortal.dungeonId);
    }

    function returnToRealm() {
        if (state.mode !== "play" || state.zone !== "dungeon") return;
        const xp = state.bosses.length ? 0 : 160;
        award("player", xp);
        state.player.x = WORLD.w * 0.5;
        state.player.y = WORLD.h * 0.52;
        generateRealm();
        state.toast = xp ? "Dungeon cleared" : "Returned to realm";
        state.toastTimer = 2.4;
    }

    function maybeRepopulate() {
        if (frame % 120 !== 0 || state.zone !== "realm") return;
        if (state.enemies.length < 130) {
            const types = Object.keys(ENEMY_DEFS);
            for (let i = 0; i < 12; i += 1) spawnEnemy(types[randInt(0, types.length - 1)], randomWorldPoint());
        }
        if (!state.bosses.length && Math.random() < 0.2) state.bosses.push(createBoss("gateTitan", rand(300, WORLD.w - 300), rand(300, WORLD.h - 300), true));
    }

    function die() {
        const fame = state.player.fame;
        save.bestFame = Math.max(save.bestFame || 0, fame);
        save.graves = [{ className: CLASS_DEFS[state.player.classId].name, fame, date: new Date().toISOString() }].concat(save.graves || []).slice(0, 8);
        save.character = null;
        writeSave();
        ui.bestRun.textContent = `${save.bestFame} fame`;
        ui.deathStats.textContent = `${fame} fame claimed at level ${state.player.level}.`;
        ui.deathScreen.hidden = false;
        state.mode = "dead";
    }

    function draw() {
        drawWorld();
        if (state.mode === "play") {
            drawPortals();
            drawLoot();
            drawActors();
            drawEnemies();
            drawProjectiles();
            drawParticles();
            drawOverlayText();
            drawMinimap();
        } else {
            drawMenuBackdrop();
        }
    }

    function drawWorld() {
        ctx.clearRect(0, 0, VIEW.w, VIEW.h);
        const biome = currentBiome();
        ctx.fillStyle = biome.floor;
        ctx.fillRect(0, 0, VIEW.w, VIEW.h);
        const startX = Math.floor(camera.x / 64) * 64;
        const startY = Math.floor(camera.y / 64) * 64;
        for (let x = startX - 64; x < camera.x + VIEW.w + 64; x += 64) {
            for (let y = startY - 64; y < camera.y + VIEW.h + 64; y += 64) {
                const sx = Math.floor(x - camera.x);
                const sy = Math.floor(y - camera.y);
                const n = hashNoise(x * 0.02, y * 0.02);
                ctx.fillStyle = n > 0.58 ? shade(biome.color, 16) : n < 0.22 ? shade(biome.color, -18) : biome.floor;
                ctx.fillRect(sx, sy, 64, 64);
                if ((Math.floor(x / 64) + Math.floor(y / 64)) % 2 === 0) {
                    ctx.fillStyle = "rgba(255,255,255,0.035)";
                    ctx.fillRect(sx, sy, 64, 1);
                    ctx.fillRect(sx, sy, 1, 64);
                }
            }
        }
        drawBiomeSeam();
    }

    function drawBiomeSeam() {
        if (state.zone !== "realm") return;
        const sx = WORLD.w / 2 - camera.x;
        const grad = ctx.createLinearGradient(sx - 80, 0, sx + 80, 0);
        grad.addColorStop(0, "rgba(116,184,106,0)");
        grad.addColorStop(0.5, "rgba(240,193,92,0.18)");
        grad.addColorStop(1, "rgba(97,198,199,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(sx - 90, 0, 180, VIEW.h);
    }

    function drawMenuBackdrop() {
        camera.x = WORLD.w / 2 - VIEW.w / 2;
        camera.y = WORLD.h / 2 - VIEW.h / 2;
        ctx.fillStyle = "rgba(0,0,0,0.26)";
        ctx.fillRect(0, 0, VIEW.w, VIEW.h);
        for (let i = 0; i < 34; i += 1) {
            const x = (i * 137 + frame * 0.18) % VIEW.w;
            const y = (i * 89 + Math.sin(frame * 0.02 + i) * 20) % VIEW.h;
            drawPixelGem(x, y, ["#74b86a", "#61c6c7", "#f0c15c", "#8d69df"][i % 4], 0.8 + (i % 3) * 0.18);
        }
    }

    function drawPortals() {
        for (const portal of state.portals) {
            const p = worldToScreen(portal);
            if (!onScreen(p, 90)) continue;
            const pulse = Math.sin(state.realmTime * 3 + portal.pulse) * 0.5 + 0.5;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(state.realmTime * 0.8);
            ctx.strokeStyle = portal.color;
            ctx.lineWidth = 5;
            ctx.globalAlpha = 0.55 + pulse * 0.35;
            ctx.beginPath();
            ctx.ellipse(0, 0, 30 + pulse * 8, 44 + pulse * 6, 0, 0, Math.PI * 2);
            ctx.stroke();
            drawSprite("portal", -22, -30, 44, 60);
            ctx.restore();
        }
    }

    function drawLoot() {
        for (const drop of state.loot) {
            const p = worldToScreen(drop);
            if (!onScreen(p, 40)) continue;
            const y = p.y + Math.sin(drop.bob) * 5;
            ctx.fillStyle = "rgba(0,0,0,0.28)";
            ctx.fillRect(p.x - 12, y + 11, 24, 5);
            drawItemIcon(drop.item, p.x, y);
        }
    }

    function drawActors() {
        const all = [...state.bots, state.player].filter(Boolean);
        for (const actor of all) {
            const p = worldToScreen(actor);
            if (!onScreen(p, 80)) continue;
            const def = CLASS_DEFS[actor.classId];
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(actor.aim);
            ctx.globalAlpha = actor.hp > 0 ? 1 : 0.25;
            drawSprite(def.sprite, -22, -22, 44, 44);
            ctx.fillStyle = def.color;
            ctx.fillRect(12, -4, 17, 8);
            ctx.restore();
            if (actor.hurtTimer > 0) ring(p.x, p.y, actorRadius(actor) + 6, "#ffffff", 0.55);
            healthBar(p.x, p.y + 30, 44, actor.hp / maxHp(actor), actor.id === "player" ? "#e05c67" : def.color);
            if (actor.id !== "player") label(actor.name, p.x, p.y - 34);
        }
        for (const summon of state.summons) {
            const p = worldToScreen(summon);
            if (!onScreen(p, 30)) continue;
            ring(p.x, p.y, 10, "#61c6c7", 0.6);
            drawPixelGem(p.x, p.y, "#61c6c7", 0.75);
        }
    }

    function drawEnemies() {
        for (const enemy of state.enemies) {
            const p = worldToScreen(enemy);
            if (!onScreen(p, 80)) continue;
            const def = ENEMY_DEFS[enemy.type];
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(enemy.phase * 0.8);
            if (enemy.elite) ctx.scale(1.18, 1.18);
            drawSprite(def.sprite, -22, -22, 44, 44);
            ctx.restore();
            if (enemy.elite) ring(p.x, p.y, enemy.radius + 8, "#f0c15c", 0.45);
            if (enemy.hurtTimer > 0) ring(p.x, p.y, enemy.radius + 4, "#ffffff", 0.42);
            healthBar(p.x, p.y + enemy.radius + 12, 36, enemy.hp / enemy.maxHp, def.color);
        }
        for (const boss of state.bosses) {
            const p = worldToScreen(boss);
            if (!onScreen(p, 140)) continue;
            const def = BOSS_DEFS[boss.type];
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(Math.sin(boss.phase) * 0.08);
            drawSprite(def.sprite, -58, -58, 116, 116);
            ctx.restore();
            ring(p.x, p.y, boss.radius + Math.sin(state.realmTime * 4) * 4, def.color, 0.4);
            healthBar(p.x, p.y + boss.radius + 17, 110, boss.hp / boss.maxHp, def.color);
            label(def.name, p.x, p.y - boss.radius - 20);
        }
    }

    function drawProjectiles() {
        for (const bullet of state.bullets) drawBullet(bullet, bullet.color);
        for (const bullet of state.enemyBullets) drawBullet(bullet, bullet.color);
    }

    function drawBullet(bullet, color) {
        const p = worldToScreen(bullet);
        if (!onScreen(p, 24)) return;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    }

    function drawParticles() {
        for (const part of state.particles) {
            const p = worldToScreen(part);
            ctx.globalAlpha = clamp(part.life / part.maxLife, 0, 1);
            ctx.fillStyle = part.color;
            ctx.fillRect(p.x, p.y, part.size, part.size);
            ctx.globalAlpha = 1;
        }
        for (const floater of state.floaters) {
            const p = worldToScreen(floater);
            ctx.globalAlpha = clamp(floater.life / 1.2, 0, 1);
            ctx.fillStyle = "#f6f1df";
            ctx.font = "700 14px Plus Jakarta Sans, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(floater.text, p.x, p.y);
            ctx.globalAlpha = 1;
        }
    }

    function drawOverlayText() {
        if (state.toastTimer > 0) {
            ctx.save();
            ctx.globalAlpha = clamp(state.toastTimer, 0, 1);
            ctx.fillStyle = "rgba(13,15,20,0.7)";
            ctx.fillRect(VIEW.w / 2 - 160, 94, 320, 36);
            ctx.strokeStyle = "rgba(240,193,92,0.5)";
            ctx.strokeRect(VIEW.w / 2 - 160, 94, 320, 36);
            ctx.fillStyle = "#f6f1df";
            ctx.font = "800 15px Plus Jakarta Sans, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(state.toast, VIEW.w / 2, 118);
            ctx.restore();
        }
    }

    function drawMinimap() {
        miniCtx.clearRect(0, 0, 148, 148);
        miniCtx.fillStyle = "#14201a";
        miniCtx.fillRect(0, 0, 148, 148);
        miniCtx.fillStyle = state.zone === "realm" ? "#3c3425" : "#1e2633";
        miniCtx.fillRect(74, 0, 74, 148);
        const drawDot = (entity, color, size) => {
            miniCtx.fillStyle = color;
            miniCtx.fillRect(entity.x / WORLD.w * 148 - size / 2, entity.y / WORLD.h * 148 - size / 2, size, size);
        };
        for (const portal of state.portals) drawDot(portal, portal.color, 5);
        for (const boss of state.bosses) drawDot(boss, BOSS_DEFS[boss.type].color, 6);
        for (let i = 0; i < state.enemies.length; i += 10) drawDot(state.enemies[i], "#d95f7d", 2);
        for (const bot of state.bots) drawDot(bot, CLASS_DEFS[bot.classId].color, 3);
        if (state.player) drawDot(state.player, "#ffffff", 5);
    }

    function updateUi() {
        const player = state.player;
        if (!player) return;
        const hpMax = maxHp(player);
        const xpNeeded = xpForLevel(player.level + 1) - xpForLevel(player.level);
        const xpProgress = player.xp - xpForLevel(player.level);
        player.level = levelForLevelFloor(player.xp);
        ui.hpText.textContent = `${Math.max(0, Math.ceil(player.hp))} / ${Math.ceil(hpMax)}`;
        ui.hpFill.style.width = `${clamp(player.hp / hpMax * 100, 0, 100)}%`;
        ui.xpFill.style.width = `${clamp(xpProgress / xpNeeded * 100, 0, 100)}%`;
        ui.levelText.textContent = String(player.level);
        ui.scoreText.textContent = `${player.fame} fame`;
        ui.classLabel.textContent = CLASS_DEFS[player.classId].name;
        ui.zoneLabel.textContent = state.zone === "realm" ? currentBiome().name : state.dungeon.name;
        const rows = [...state.bots, player]
            .sort((a, b) => b.fame - a.fame)
            .slice(0, 6)
            .map((actor) => `<li>${actor.name} <strong>${actor.fame}</strong></li>`)
            .join("");
        ui.leaderboard.innerHTML = rows;
    }

    function updateAutoButton() {
        ui.autoButton.setAttribute("aria-pressed", settings.autoFire ? "true" : "false");
    }

    function updateCamera() {
        if (!state.player) return;
        camera.x = clamp(state.player.x - VIEW.w / 2, 0, WORLD.w - VIEW.w);
        camera.y = clamp(state.player.y - VIEW.h / 2, 0, WORLD.h - VIEW.h);
    }

    function updateParticles(dt) {
        for (const part of state.particles) {
            part.x += part.vx * dt;
            part.y += part.vy * dt;
            part.life -= dt;
        }
        for (const floater of state.floaters) {
            floater.y -= 28 * dt;
            floater.life -= dt;
        }
        state.particles = state.particles.filter((part) => part.life > 0);
        state.floaters = state.floaters.filter((floater) => floater.life > 0);
    }

    function sparkle(x, y, color, count) {
        for (let i = 0; i < count; i += 1) {
            const angle = rand(0, Math.PI * 2);
            const speed = rand(35, 120);
            state.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                size: randInt(2, 5),
                life: rand(0.25, 0.55),
                maxLife: 0.55,
            });
        }
    }

    function currentBiome() {
        if (state.zone === "dungeon") return { name: state.dungeon.name, floor: shade(state.dungeon.color, -62), color: shade(state.dungeon.color, -38), accent: state.dungeon.color };
        if (!state.player || state.player.x < WORLD.w / 2) return BIOMES[0];
        return BIOMES[1];
    }

    function saveCharacter() {
        if (!state.player || state.mode !== "play") return;
        save.character = {
            classId: state.player.classId,
            xp: state.player.xp,
            fame: state.player.fame,
            equipment: state.player.equipment,
            inventory: state.player.inventory,
        };
        save.lastClass = state.player.classId;
        writeSave();
    }

    function cleanInventory(inventory) {
        return Array.isArray(inventory) ? inventory.filter((item) => item && item.id && item.type).slice(0, MAX_INVENTORY) : [];
    }

    function cleanEquipment(equipment) {
        const clean = {};
        if (equipment && typeof equipment === "object") {
            for (const slot of ["weapon", "armor", "charm"]) if (equipment[slot]?.id) clean[slot] = equipment[slot];
        }
        return clean;
    }

    function loadSave() {
        try {
            return { bestFame: 0, graves: [], ...JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") };
        } catch {
            return { bestFame: 0, graves: [] };
        }
    }

    function writeSave() {
        localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    }

    function loadSettings() {
        try {
            return { autoFire: true, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
        } catch {
            return { autoFire: true };
        }
    }

    function writeSettings() {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }

    function createAtlas() {
        const spriteSize = 16;
        const names = [
            "classGuard", "classScout", "classSage", "classMender", "classKnave", "classShepherd",
            "enemyMire", "enemyEye", "enemyImp", "enemyMage", "enemyWisp", "enemyAcolyte",
            "bossMire", "bossPrism", "bossEclipse", "bossTitan", "portal",
        ];
        const atlasCanvas = document.createElement("canvas");
        atlasCanvas.width = spriteSize * names.length;
        atlasCanvas.height = spriteSize;
        const a = atlasCanvas.getContext("2d");
        a.imageSmoothingEnabled = false;
        const map = {};
        names.forEach((name, index) => {
            map[name] = { x: index * spriteSize, y: 0, w: spriteSize, h: spriteSize };
            drawAtlasSprite(a, name, index * spriteSize, 0);
        });
        return { canvas: atlasCanvas, map };
    }

    function drawAtlasSprite(a, name, ox, oy) {
        const px = (x, y, color) => {
            a.fillStyle = color;
            a.fillRect(ox + x, oy + y, 1, 1);
        };
        const rect = (x, y, w, h, color) => {
            a.fillStyle = color;
            a.fillRect(ox + x, oy + y, w, h);
        };
        const palettes = {
            classGuard: ["#3b414d", "#b6bac4", "#f0c15c"],
            classScout: ["#24432c", "#74b86a", "#d8f0a0"],
            classSage: ["#4a2521", "#d95f4d", "#ffd08d"],
            classMender: ["#5b4622", "#f0c15c", "#fff0b8"],
            classKnave: ["#271f43", "#8d69df", "#d8c7ff"],
            classShepherd: ["#1d3f42", "#61c6c7", "#d7ffff"],
            enemyMire: ["#183222", "#74b86a", "#bfe38a"],
            enemyEye: ["#29391e", "#a4d16f", "#f6f1df"],
            enemyImp: ["#163a3c", "#61c6c7", "#c8ffff"],
            enemyMage: ["#1b3a4a", "#79d8dd", "#f6f1df"],
            enemyWisp: ["#27204a", "#8d69df", "#f2dcff"],
            enemyAcolyte: ["#342151", "#c08cff", "#f6f1df"],
            bossMire: ["#102718", "#74b86a", "#f0c15c"],
            bossPrism: ["#153a40", "#61c6c7", "#f6f1df"],
            bossEclipse: ["#1c1534", "#8d69df", "#d95f7d"],
            bossTitan: ["#3f3120", "#f0c15c", "#f6f1df"],
            portal: ["#14242d", "#61c6c7", "#8d69df"],
        };
        const p = palettes[name];
        rect(5, 2, 6, 2, p[2]);
        rect(4, 4, 8, 8, p[1]);
        rect(5, 12, 2, 3, p[0]);
        rect(9, 12, 2, 3, p[0]);
        rect(3, 6, 2, 5, p[0]);
        rect(11, 6, 2, 5, p[0]);
        rect(6, 6, 1, 1, "#111318");
        rect(9, 6, 1, 1, "#111318");
        if (name.startsWith("enemy")) {
            rect(4, 5, 8, 7, p[1]);
            rect(3, 7, 10, 3, p[0]);
            rect(7, 7, 2, 2, p[2]);
        }
        if (name.startsWith("boss")) {
            rect(2, 2, 12, 12, p[1]);
            rect(4, 0, 8, 3, p[2]);
            rect(5, 6, 2, 2, "#111318");
            rect(9, 6, 2, 2, "#111318");
            rect(3, 12, 10, 2, p[0]);
        }
        if (name === "portal") {
            a.clearRect(ox, oy, 16, 16);
            rect(6, 1, 4, 14, p[1]);
            rect(4, 3, 8, 10, p[2]);
            rect(6, 5, 4, 6, p[0]);
        }
    }

    function drawSprite(name, x, y, w, h) {
        const sprite = atlas.map[name];
        if (!sprite) return;
        ctx.drawImage(atlas.canvas, sprite.x, sprite.y, sprite.w, sprite.h, x, y, w, h);
    }

    function drawItemIcon(item, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = item.color;
        if (item.type === "weapon") {
            ctx.rotate(-0.6);
            ctx.fillRect(-4, -14, 8, 24);
            ctx.fillStyle = "#f6f1df";
            ctx.fillRect(-8, 7, 16, 4);
        } else if (item.type === "armor") {
            ctx.fillRect(-12, -12, 24, 24);
            ctx.fillStyle = "rgba(0,0,0,0.22)";
            ctx.fillRect(-6, -6, 12, 18);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, 13, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#f6f1df";
            ctx.fillRect(-3, -3, 6, 6);
        }
        ctx.restore();
    }

    function drawPixelGem(x, y, color, scale) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = color;
        ctx.fillRect(-7, -3, 14, 8);
        ctx.fillRect(-4, -7, 8, 14);
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fillRect(-2, -5, 3, 3);
        ctx.restore();
    }

    function healthBar(x, y, width, pct, color) {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(x - width / 2, y, width, 5);
        ctx.fillStyle = color;
        ctx.fillRect(x - width / 2, y, width * clamp(pct, 0, 1), 5);
    }

    function label(text, x, y) {
        ctx.fillStyle = "rgba(0,0,0,0.42)";
        ctx.fillRect(x - 54, y - 12, 108, 18);
        ctx.fillStyle = "#f6f1df";
        ctx.font = "700 11px Plus Jakarta Sans, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text, x, y + 1);
    }

    function ring(x, y, radius, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    function findActor(id) {
        if (state.player?.id === id) return state.player;
        return state.bots.find((bot) => bot.id === id);
    }

    function livingActors() {
        return [state.player, ...state.bots].filter((actor) => actor && actor.hp > 0);
    }

    function nearestActor(source, actors, range) {
        let best = null;
        let bestDist = range;
        for (const actor of actors) {
            const d = dist(source, actor);
            if (d < bestDist) {
                best = actor;
                bestDist = d;
            }
        }
        return best;
    }

    function nearestTarget(actor, range) {
        const enemies = [...state.enemies, ...state.bosses];
        let best = null;
        let bestDist = range;
        for (const enemy of enemies) {
            const d = dist(actor, enemy);
            if (d < bestDist) {
                best = enemy;
                bestDist = d;
            }
        }
        return best;
    }

    function moveSpeed(actor) {
        return CLASS_DEFS[actor.classId].speed + itemStat(actor, "speed") + actor.level * 1.6;
    }

    function fireRate(actor) {
        return CLASS_DEFS[actor.classId].fireRate * (1 + itemStat(actor, "speed") / 420);
    }

    function damage(actor) {
        return CLASS_DEFS[actor.classId].damage + itemStat(actor, "damage") + actor.level * 0.8;
    }

    function regen(actor) {
        return (CLASS_DEFS[actor.classId].regen || 1.2) + itemStat(actor, "regen") + actor.level * 0.08;
    }

    function armor(actor) {
        return clamp(itemStat(actor, "armor"), 0, 0.42);
    }

    function maxHp(actor) {
        return CLASS_DEFS[actor.classId].hp + itemStat(actor, "hp") + actor.level * 8;
    }

    function actorRadius(actor) {
        return actor.id === "player" ? 20 : 19;
    }

    function itemStat(actor, stat) {
        return Object.values(actor.equipment || {}).reduce((sum, item) => sum + (Number(item?.[stat]) || 0), 0);
    }

    function itemScore(item) {
        return item.tier * 100 + (item.damage || 0) * 3 + (item.hp || 0) + (item.speed || 0) * 2 + (item.regen || 0) * 15 + (item.bonusShots || 0) * 130;
    }

    function itemSummary(item) {
        const parts = [`${item.name}`, item.type, item.rarity];
        if (item.damage) parts.push(`+${item.damage} dmg`);
        if (item.hp) parts.push(`+${item.hp} hp`);
        if (item.speed) parts.push(`+${item.speed} speed`);
        if (item.regen) parts.push(`+${item.regen.toFixed(1)} regen`);
        if (item.range) parts.push(`+${item.range} range`);
        if (item.bonusShots) parts.push("+1 shot");
        return parts.join(" | ");
    }

    function levelForXp(xp) {
        return levelForLevelFloor(xp);
    }

    function levelForLevelFloor(xp) {
        let level = 1;
        while (level < 20 && xp >= xpForLevel(level + 1)) level += 1;
        return level;
    }

    function xpForLevel(level) {
        return Math.floor((level - 1) ** 2 * 95);
    }

    function randomWorldPoint() {
        return { x: rand(120, WORLD.w - 120), y: rand(120, WORLD.h - 120) };
    }

    function worldToScreen(point) {
        return { x: point.x - camera.x, y: point.y - camera.y };
    }

    function screenToWorld(x, y) {
        return { x: x + camera.x, y: y + camera.y };
    }

    function onScreen(point, pad) {
        return point.x > -pad && point.y > -pad && point.x < VIEW.w + pad && point.y < VIEW.h + pad;
    }

    function outOfWorld(point) {
        return point.x < -80 || point.y < -80 || point.x > WORLD.w + 80 || point.y > WORLD.h + 80;
    }

    function isSmallScreen() {
        return window.innerWidth < 720 || window.innerHeight < 520;
    }

    function dist(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randInt(min, max) {
        return Math.floor(rand(min, max + 1));
    }

    function makeId(prefix) {
        return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
    }

    function roman(value) {
        return ["I", "II", "III", "IV", "V"][value - 1] || "I";
    }

    function rarityColor(rarity) {
        return {
            common: "#b6bac4",
            fine: "#74b86a",
            rare: "#61c6c7",
            epic: "#8d69df",
            mythic: "#f0c15c",
        }[rarity] || "#b6bac4";
    }

    function hashNoise(x, y) {
        const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return s - Math.floor(s);
    }

    function shade(hex, amount) {
        const value = Number.parseInt(hex.slice(1), 16);
        const r = clamp((value >> 16) + amount, 0, 255);
        const g = clamp(((value >> 8) & 255) + amount, 0, 255);
        const b = clamp((value & 255) + amount, 0, 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    window.riftboundDebug = {
        summary: () => ({
            mode: state.mode,
            zone: state.zone,
            className: state.player ? CLASS_DEFS[state.player.classId].name : null,
            enemies: state.enemies.length,
            bosses: state.bosses.length,
            loot: state.loot.length,
            inventory: state.player?.inventory.length || 0,
            level: state.player?.level || 0,
            fame: state.player?.fame || 0,
            storage: Boolean(localStorage.getItem(SAVE_KEY)),
        }),
        start: (classId = selectedClass) => startRun(classId),
        giveLoot: () => {
            if (!state.player) return false;
            pickup(createItem(4));
            return true;
        },
        enterPortal: () => {
            if (!state.player) return false;
            state.actionPortal = state.portals[0];
            enterNearestPortal();
            return state.zone === "dungeon";
        },
        kill: () => {
            if (!state.player) return false;
            state.player.hp = 0;
            die();
            return true;
        },
    };
})();
