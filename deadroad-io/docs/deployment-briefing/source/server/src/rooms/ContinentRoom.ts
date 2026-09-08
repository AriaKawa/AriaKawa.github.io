import { threatAt } from '../sim/threatField.js';
import { missionDifficulty, missionRewards, awardXp, unlockResearch, applyResearchUpgrade, enemyHealthMultiplier, enemyCountMultiplier, RESEARCH_PATHS, type ResearchPath } from '../sim/progression.js';
import { planZombieWave, waveHealthScale, waveSpacingMs, waveRestMs } from "../sim/zombieRoster.js";
import { Client, Room } from "@colyseus/core";
import { BASE_SETUP_SECONDS, COMBAT_PROGRESSION, FLAME_AOE_RADIUS, FLAME_BURN_DAMAGE_PER_SECOND, FLAME_BURN_DURATION_MS, FLAME_SPLASH_DAMAGE_MULTIPLIER, NEW_PLAYER_PROTECTION_SECONDS, REDEPLOY_COOLDOWN_SECONDS, REDEPLOY_REFUND_RATE, REGION_MAX_ACTIVE_ZOMBIES, SERVER_TICK_RATE, SNAPSHOT_RATE, STARTING_SCRAP, TOWER_STATS, ZOMBIE_STATS } from "../sim/constants.js";
import { cloneWorld, routeForLot, validateWorld, worldStatic } from "../sim/continent.js";
import { CONVOY_FUEL_PER_SECOND, CONVOY_ROAD_SPEED, assessDeployment, convoyTravelSpeed, dampConvoySpeed, placeLotAtConvoy, steerConvoyHeading } from "../sim/convoyDeployment.js";
import type { BaseState, DefenseContract, PlayerState, RoadsideLot, Snapshot, SquadCommander, SquadRole, Territory, TowerState, TowerType, Vec2, ZombieState, ZombieType } from "../sim/types.js";

const AI_NAMES = ["Mara Voss", "Tin Prophet", "June Wire", "Old Calder", "Patch-9"];
const SQUAD_NAMES = ["Rook Battery", "Ash Courier", "Mara Voss", "Tin Prophet", "June Wire", "Patch-9", "Old Calder", "Signal Mae", "Crowbar Saint", "Dust Anchor"];
const SQUAD_ROLES: SquadRole[] = ["builder", "repair", "gunner", "scavenger", "signal"];
const TOWER_TYPES: TowerType[] = ["rifle", "cannon", "flame", "shock", "floodlight"];

export class ContinentRoom extends Room {
  maxClients = 16;
  private players = new Map<string, PlayerState>();
  private bases = new Map<string, BaseState>();
  private towers = new Map<string, TowerState>();
  private zombies = new Map<string, ZombieState>();
  private contracts = new Map<string, DefenseContract>();
  private squadCommanders = new Map<string, SquadCommander>();
  private territoryList: Territory[] = [];
  private lotList: RoadsideLot[] = [];
  private snapshotAccumulator = 0;
  private idCounter = 1;
  private radio = "Roadwatch online. The continent never sleeps.";

  onCreate(): void {
    this.resetWorld();
    const validationErrors = validateWorld(this.lotList);
    if (validationErrors.length) console.warn("World build validation:", validationErrors);
    this.seedAiBases();
    this.setSimulationInterval((deltaMs) => this.tick(Math.min(deltaMs / 1000, 0.05)), 1000 / SERVER_TICK_RATE);

    this.onMessage("reserveLot", (client, message: { lotId?: string }) => this.reserveLot(client, String(message?.lotId || "")));
    this.onMessage("deploy", (client, message: { lotId?: string; strategicContext?: { worldX?: number; worldY?: number } }) => this.deploy(client, String(message?.lotId || ""), "command", message?.strategicContext));
    this.onMessage("reclaim", (client, message: { lotId?: string; strategicContext?: { worldX?: number; worldY?: number } }) => this.deploy(client, String(message?.lotId || ""), "reclaim", message?.strategicContext));
    this.onMessage("build", (client, message: { padId?: string; towerType?: TowerType }) => this.buildTower(client, String(message?.padId || ""), message?.towerType));
    this.onMessage("upgrade", (client, message: { towerId?: string; path?: ResearchPath }) => this.upgradeTower(client, String(message?.towerId || ""), message?.path));
    this.onMessage('research', (client, message: { type?: TowerType; path?: ResearchPath }) => { const player = this.players.get(client.sessionId); if (!player || !message.type || !TOWER_TYPES.includes(message.type) || !message.path || !unlockResearch(player, message.type, message.path)) this.reject(client, 'Research unavailable or insufficient XP.'); });
    this.onMessage('previewDeployment', (client, message) => { client.send('deploymentPreview', { requestId: message?.requestId, preview: this.previewDeployment(client, message?.reroll === true) }); });
    this.onMessage("redeploy", (client, message: { lotId?: string; strategicContext?: { worldX?: number; worldY?: number } }) => this.redeploy(client, String(message?.lotId || ""), message?.strategicContext));
    this.onMessage("packConvoy", (client) => this.packConvoy(client));
    this.onMessage("deployConvoy", (client, message: { strategicOnLand?: boolean; previewStamp?: string }) => this.deployConvoy(client, message?.strategicOnLand, message?.previewStamp));
    this.onMessage("startDefenseNow", (client) => this.startDefenseNow(client));
    this.onMessage("chat", (client, message: { text?: string }) => this.sendChat(client, message?.text));
    this.onMessage("driveBase", (client, message: { steering?: number; throttle?: number; deltaMs?: number; onVisibleHighway?: boolean }) => this.driveBase(client, Number(message?.steering), Number(message?.throttle), Number(message?.deltaMs), message?.onVisibleHighway === true));
    this.onMessage("callBackup", (client, message: { baseId?: string }) => this.callBackup(client, String(message?.baseId || "")));
    this.onMessage("toggleBaseJoinable", (client, message: { baseId?: string }) => this.toggleBaseJoinable(client, String(message?.baseId || "")));
    this.onMessage("restart", (client) => this.resetPlayer(client));
    this.onMessage("requestWorld", (client) => this.sendWorld(client));
  }

  onJoin(client: Client, options: { name?: string }): void {
    const name = String(options?.name || "Roadwarden").replace(/[^a-zA-Z0-9 _-]/g, "").trim().slice(0, 18) || "Roadwarden";
    this.players.set(client.sessionId, {
      id: client.sessionId, name, scrap: STARTING_SCRAP, fuel: 100, signal: 0,
      protectedUntil: Date.now() + NEW_PLAYER_PROTECTION_SECONDS * 1000, redeployCooldownUntil: 0
    });
    client.send("welcome", { id: client.sessionId, world: worldStatic });
    this.sendWorld(client);
    this.radio = `${name} entered commander mode. No core deployed; no personal horde.`;
  }

  onLeave(client: Client): void {
    // Local prototype keeps the base for the life of the room, like a tiny persistent continent.
    if (![...this.clients].some((entry) => entry.sessionId !== client.sessionId)) this.disconnect();
  }

  private resetWorld(): void {
    const fresh = cloneWorld();
    this.territoryList = fresh.territories;
    this.lotList = fresh.lots;
  }

  private seedAiBases(): void {
    const normal = this.lotList.filter((entry) => entry.status === "empty");
    const reclaim = this.lotList.find((entry) => entry.status === "overrun");
    const aiLots = [normal[2], normal[Math.floor(normal.length * .22)], normal[Math.floor(normal.length * .45)], normal[Math.floor(normal.length * .68)], reclaim ?? normal[normal.length - 2]].filter((entry): entry is RoadsideLot => Boolean(entry));
    aiLots.forEach((lot, index) => {
      lot.status = "occupied"; lot.ownerPlayerId = `ai-${index + 1}`;
      const base: BaseState = {
        id: `ai-base-${index + 1}`, ownerPlayerId: `ai-${index + 1}`, ownerName: AI_NAMES[index], isAI: true,
        territoryId: lot.territoryId, lotId: lot.id, coreX: lot.x, coreY: lot.y, hp: 700, maxHp: 700,
        shieldEndsAt: 0, status: "active", kind: index === 4 ? "reclaim" : "command"
      };
      this.bases.set(base.id, base);
      lot.pads.slice(0, index === 4 ? 2 : 3).forEach((pad, padIndex) => {
        const type = TOWER_TYPES[(index + padIndex) % 3];
        const stats = TOWER_STATS[type]; const id = `ai-tower-${index + 1}-${padIndex + 1}`;
        pad.occupiedBy = id;
        this.towers.set(id, { id, ownerPlayerId: base.ownerPlayerId, baseId: base.id, padId: pad.id, type, x: pad.x, y: pad.y, level: 1, ...stats, lastFiredAt: 0 });
      });
    });
  }

  private reserveLot(client: Client, lotId: string): void {
    const player = this.players.get(client.sessionId); const lot = this.lotList.find((entry) => entry.id === lotId);
    if (!player || !lot) return;
    if (lot.status !== "empty" && lot.ownerPlayerId !== player.id) return this.reject(client, "That roadside lot is already claimed.");
    const territory = this.territoryList.find((entry) => entry.id === lot.territoryId);
    if (!territory || !["safe", "contested", "infested"].includes(territory.state)) return this.reject(client, "Normal deployment is blocked in an overrun territory.");
    this.lotList.forEach((entry) => { if (entry.status === "reserved" && entry.ownerPlayerId === player.id) { entry.status = "empty"; entry.ownerPlayerId = undefined; } });
    lot.status = "reserved"; lot.ownerPlayerId = player.id;
    client.send("notice", { text: "Roadside lot reserved. Deploy when ready." });
  }

  private deploy(client: Client, lotId: string, kind: "command" | "reclaim", context?: { worldX?: number; worldY?: number }): void {
    const player = this.players.get(client.sessionId); const lot = this.lotList.find((entry) => entry.id === lotId);
    if (!player || !lot) return;
    if (player.baseId) return this.reject(client, "Pack up or redeploy your current command core first.");
    const territory = this.territoryList.find((entry) => entry.id === lot.territoryId);
    if (!territory) return;
    if (kind === "command" && !(["empty", "reserved"].includes(lot.status) && (!lot.ownerPlayerId || lot.ownerPlayerId === player.id))) return this.reject(client, "Lot unavailable.");
    if (kind === "reclaim" && !(territory.state === "overrun" && lot.status === "overrun")) return this.reject(client, "This reclaim convoy cannot deploy here.");

    if (kind === "reclaim") { territory.state = "reclaiming"; territory.pressure = 78; lot.status = "empty"; }
    lot.status = "occupied"; lot.ownerPlayerId = player.id;
    const id = `base-${this.idCounter++}`; const now = Date.now(); const entry = { ...lot.nearbyRoadPoint };
    const base: BaseState = {
      id, ownerPlayerId: player.id, ownerName: player.name, isAI: false, territoryId: lot.territoryId, lotId: lot.id,
      coreX: entry.x, coreY: entry.y, anchorX: lot.x, anchorY: lot.y, entryX: entry.x, entryY: entry.y, insertedAt: now, lastMovedAt: now, hp: kind === "reclaim" ? 850 : 1000, maxHp: kind === "reclaim" ? 850 : 1000,
      shieldEndsAt: 0, status: "packed", heading: 0, driveSpeed: 0, kind, joinable: false, squadBeaconLevel: 0, squadSlots: []
    };
    if (Number.isFinite(context?.worldX) && Number.isFinite(context?.worldY) && context!.worldX! >= 0 && context!.worldX! <= 240000 && context!.worldY! >= 0 && context!.worldY! <= 330000) { base.worldX = context!.worldX; base.worldY = context!.worldY; }
    this.bases.set(id, base); player.baseId = id;
    this.radio = `Convoy inserted into ${territory.name}. Drive off the road and deploy the command core.`; client.send("notice", { text: "Convoy Entry Point — drive with WASD, then deploy beside the road." });
  }

  private deploymentDifficulty(base: BaseState, player: PlayerState): number {
    const x=(base.worldX ?? 0)+(base.coreX-(base.anchorX ?? base.coreX))*1.5; const y=(base.worldY ?? 0)+(base.coreY-(base.anchorY ?? base.coreY))*1.5;
    return missionDifficulty(base.worldX !== undefined ? threatAt(83-y/330000*143,-170+x/240000*140) : this.territoryList.find(t=>t.id===base.territoryId)?.threatLevel ?? 1, player.xp);
  }
  private routeVariants = new Map<string, number>();
  private previewDeployment(client: Client, reroll = false) {
    const player=this.players.get(client.sessionId); const base=player?.baseId?this.bases.get(player.baseId):undefined; const source=this.lotList.find(l=>l.id===base?.lotId); if(!player||!base||base.status!=='packed'||!source) return;
    const lot=structuredClone(source); if(!placeLotAtConvoy(lot,base,worldStatic)) return; const difficulty=this.deploymentDifficulty(base,player); const variant=(this.routeVariants.get(base.id)??0)+(reroll?1:0); this.routeVariants.set(base.id,variant); const route=routeForLot(lot,variant);
    return { difficulty,rewards:missionRewards(difficulty),routes:[route.points],core:{x:base.coreX,y:base.coreY},stamp:`${base.id}:${base.coreX}:${base.coreY}:${difficulty}:${variant}` };
  }
  private deployConvoy(client: Client, strategicOnLand?: boolean, previewStamp?: string): void {
    if(previewStamp && this.previewDeployment(client)?.stamp !== previewStamp) return this.reject(client,'Site changed. Preview again before confirming.');
    const player = this.players.get(client.sessionId); const base = player?.baseId ? this.bases.get(player.baseId) : undefined; if (!player || !base || base.status !== "packed") return this.reject(client, "The command core is already deployed.");
    const assessment = assessDeployment(worldStatic, base, Date.now(), false, strategicOnLand); if (!assessment.valid) return this.reject(client, assessment.message); const lot = this.lotList.find((entry) => entry.id === base.lotId); const territory = this.territoryList.find((entry) => entry.id === base.territoryId); if (!lot || !territory || !placeLotAtConvoy(lot, base, worldStatic)) return this.reject(client, "Cannot deploy here.");
    for (const [id, contract] of this.contracts) if (contract.baseId === base.id) this.contracts.delete(id); const now = Date.now(); const route = routeForLot(lot,this.routeVariants.get(base.id)??0); const contract: DefenseContract = { deployedAt: now, id: `contract-${this.idCounter++}`, ownerPlayerId: player.id, baseId: base.id, territoryId: lot.territoryId, spawnPointId: route.infestationId, routePoints: route.points, nextWaveAt: now + BASE_SETUP_SECONDS * 1000 + 1200, nextSpawnAt: 0, waveIndex: 0, difficulty: this.deploymentDifficulty(base, player), status: "setup", queue: [] }; this.contracts.set(contract.id, contract);
    const stowed = [...this.towers.values()].filter((entry) => entry.baseId === base.id && entry.packed); stowed.forEach((tower, index) => { const pad = lot.pads[index]; if (!pad) return; tower.padId = pad.id; tower.x = pad.x; tower.y = pad.y; tower.packed = false; pad.occupiedBy = tower.id; }); base.status = "setup"; base.driveSpeed = 0; base.shieldEndsAt = now + BASE_SETUP_SECONDS * 1000; base.joinable = (base.squadBeaconLevel ?? 0) > 0; const restored = stowed.filter((entry) => !entry.packed).length; this.radio = `${player.name} deployed the command core. ${restored} stowed turret${restored === 1 ? "" : "s"} restored.`; client.send("notice", { text: `Command core deployed. ${restored ? `${restored} turrets restored.` : "Build defenses on the marked pads."}` });
  }

  private startDefenseNow(client: Client): void {
    const player = this.players.get(client.sessionId); const base = player?.baseId ? this.bases.get(player.baseId) : undefined;
    if (!player || !base) return;
    const now = Date.now(); const contract = [...this.contracts.values()].find((entry) => entry.baseId === base.id);
    if (base.status === "setup") {
      base.status = "active"; base.shieldEndsAt = now; if (contract) { contract.status = "active"; contract.nextWaveAt = now + 1200; }
      this.radio = `${player.name} dropped the setup shield early. Weapons live.`; client.send("notice", { text: "Defense started. First horde inbound." }); return;
    }
    const hordeActive = Boolean(contract?.queue.length) || [...this.zombies.values()].some((entry) => entry.contractId === contract?.id);
    if (!["active", "underAttack"].includes(base.status) || !contract || hordeActive || contract.nextWaveAt >= Number.MAX_SAFE_INTEGER) return;
    contract.nextWaveAt = now; this.radio = `${player.name} called the next horde in early.`; client.send("notice", { text: "Next horde inbound now." });
  }

  private sendChat(client: Client, rawText?: string): void {
    const player = this.players.get(client.sessionId); const text = String(rawText ?? "").replace(/\s+/g, " ").trim().slice(0, 180); if (!player || !text) return;
    this.broadcast("chat", { id: `chat-${Date.now()}-${client.sessionId}`, playerId: player.id, playerName: player.name, text, sentAt: Date.now() });
  }

  private redeploy(client: Client, lotId: string, context?: {worldX?:number;worldY?:number}): void {
    const player = this.players.get(client.sessionId); if (!player?.baseId) return this.reject(client, "No active base to redeploy.");
    const now = Date.now(); if (now < player.redeployCooldownUntil) return this.reject(client, "Redeploy convoy is still refueling.");
    if ([...this.zombies.values()].some((zombie) => this.contracts.get(zombie.contractId)?.baseId === player.baseId)) return this.reject(client, "Cannot pack the core while a horde is on the road.");
    const target = this.lotList.find((lot) => lot.id === lotId);
    if (!target || target.status !== "empty") return this.reject(client, "Choose an empty roadside lot.");
    this.removePlayerBase(player, true); player.redeployCooldownUntil = now + REDEPLOY_COOLDOWN_SECONDS * 1000;
    target.status = "reserved"; target.ownerPlayerId = player.id;
    this.deploy(client, target.id, "command", context);
    this.radio = `${player.name}'s convoy redeployed. Salvage crews recovered 75% of tower scrap.`;
  }

  private packConvoy(client: Client): void {
    const player = this.players.get(client.sessionId); const base = player?.baseId ? this.bases.get(player.baseId) : undefined;
    if (!player || !base) return this.reject(client, "Deploy a command core first.");
    if (base.status === "packed") return client.send("notice", { text: "Convoy is already packed. Use WASD to drive." });
    const contracts = [...this.contracts.values()].filter((entry) => entry.baseId === base.id); const contractIds = new Set(contracts.map((entry) => entry.id));
    if (contracts.some((entry) => entry.queue.length > 0) || [...this.zombies.values()].some((entry) => contractIds.has(entry.contractId))) return this.reject(client, "Cannot pack while a horde is on the road.");
    for (const contract of contracts) { contract.status = "paused"; contract.queue = []; contract.nextWaveAt = Number.MAX_SAFE_INTEGER; }
    const lot = this.lotList.find((entry) => entry.id === base.lotId); lot?.pads.forEach((pad) => { pad.occupiedBy = undefined; });
    const towers = [...this.towers.values()].filter((entry) => entry.baseId === base.id); towers.forEach((tower) => { tower.packed = true; tower.shotX = undefined; tower.shotY = undefined; });
    base.status = "packed"; base.heading ??= 0; base.driveSpeed = 0; base.joinable = false;
    this.radio = `${player.name} packed ${towers.length} turret${towers.length === 1 ? "" : "s"}. Convoy controls transferred to WASD.`;
    client.send("notice", { text: "All turrets stowed. Use WASD to drive; arrow keys pan the camera." });
  }

  private driveBase(client: Client, steering: number, throttle: number, deltaMs: number, onVisibleHighway: boolean): void {
    const player = this.players.get(client.sessionId); const base = player?.baseId ? this.bases.get(player.baseId) : undefined;
    if (!player || !base || base.status !== "packed" || !Number.isFinite(steering) || !Number.isFinite(throttle)) return;
    const dt = Math.min(50, Math.max(0, Number.isFinite(deltaMs) ? deltaMs : 0)) / 1000; const input = Math.max(-1, Math.min(1, throttle)); const targetSpeed = convoyTravelSpeed(onVisibleHighway) * (player.fuel > 0 ? 1 : .16) * input;
    base.driveSpeed = dampConvoySpeed(base.driveSpeed ?? 0, targetSpeed, dt); const steeringDirection = Math.abs(base.driveSpeed) > .2 ? base.driveSpeed : input;
    if (Math.abs(steeringDirection) > .01) base.heading = steerConvoyHeading(base.heading ?? 0, steering, steeringDirection, dt);
    const distance = (base.driveSpeed ?? 0) * dt; if (Math.abs(distance) < .001) return;
    const previousX = base.coreX; const previousY = base.coreY; const heading = base.heading ?? 0; base.coreX = Math.max(0, Math.min(worldStatic.worldWidth, base.coreX + Math.cos(heading) * distance)); base.coreY = Math.max(0, Math.min(worldStatic.worldHeight, base.coreY + Math.sin(heading) * distance));
    const moved = Math.hypot(base.coreX - previousX, base.coreY - previousY); if (moved < Math.abs(distance) * .1) base.driveSpeed = 0;
    if (moved > .01) { base.lastMovedAt = Date.now(); if (player.fuel > 0) player.fuel = Math.max(0, player.fuel - CONVOY_FUEL_PER_SECOND * Math.min(1, Math.abs(base.driveSpeed ?? 0) / CONVOY_ROAD_SPEED) * dt); }
  }

  private buildTower(client: Client, padId: string, towerType?: TowerType): void {
    const player = this.players.get(client.sessionId); const base = player?.baseId ? this.bases.get(player.baseId) : undefined;
    if (!player || !base || !towerType || !(towerType in TOWER_STATS)) return;
    if (base.status === "packed") return this.reject(client, "Turrets are stowed while the convoy is mobile.");
    if (towerType === "squadBeacon" && (base.squadBeaconLevel ?? 0) > 0) return this.reject(client, "This base already has a Squad Beacon.");
    const lot = this.lotList.find((entry) => entry.id === base.lotId); const pad = lot?.pads.find((entry) => entry.id === padId);
    if (!pad || pad.occupiedBy) return this.reject(client, "That build pad is occupied.");
    const stats = TOWER_STATS[towerType]; const rewardIndex = (player.turretRewards ?? []).findIndex(r => r.type === towerType); const reward = player.turretRewards?.[rewardIndex]; const cost = reward ? 0 : stats.cost; if (player.scrap < cost) return this.reject(client, "Not enough scrap.");
    player.scrap -= cost; const id = `tower-${this.idCounter++}`; pad.occupiedBy = id;
    this.towers.set(id, { id, ownerPlayerId: player.id, baseId: base.id, padId, type: towerType, x: pad.x, y: pad.y, level: 1, ...stats, lastFiredAt: 0 });
    if (reward) { const tower = this.towers.get(id)!; tower.pathTiers = { [reward.path]: reward.tier }; tower.level = Math.min(3, reward.tier + 1); for (let i = 0; i < reward.tier; i++) applyResearchUpgrade(tower, reward.path); player.turretRewards!.splice(rewardIndex, 1); }
    if (towerType === "squadBeacon") { base.squadBeaconLevel = 1; base.joinable = true; base.squadSlots = [{ id: `squad-slot-${this.idCounter++}`, baseId: base.id, status: "empty", isAI: false }]; this.radio = `${player.name} raised a Squad Beacon. This operation is now joinable.`; }
    else this.radio = `${player.name} built a ${towerType === "cannon" ? "scrap cannon" : towerType} tower.`;
  }

  private upgradeTower(client: Client, towerId: string, path: ResearchPath = "power"): void {
    const player = this.players.get(client.sessionId); const tower = this.towers.get(towerId);
    if (!player || !tower || tower.ownerPlayerId !== player.id || tower.packed || !RESEARCH_PATHS.includes(path) || tower.type === "squadBeacon" && tower.level >= 3) return;
    if (tower.type === "squadBeacon") { const base = this.bases.get(tower.baseId); const nextLevel = tower.level + 1; const cost = nextLevel === 2 ? 160 : 220; if (!base || player.scrap < cost) return this.reject(client, "Not enough scrap for that beacon upgrade."); player.scrap -= cost; tower.level = nextLevel; base.squadBeaconLevel = nextLevel; base.squadSlots ??= []; while (base.squadSlots.length < nextLevel) base.squadSlots.push({ id: `squad-slot-${this.idCounter++}`, baseId: base.id, status: "empty", isAI: false }); this.radio = `Squad Beacon upgraded to Level ${nextLevel}.`; return; }
    const tier=(tower.pathTiers?.[path]??0)+1; if(tier>3||(player.research?.[`${tower.type}:${path}`]??0)<tier) return this.reject(client,'Research that branch first.');
    const others=RESEARCH_PATHS.filter(p=>p!==path&&(tower.pathTiers?.[p]??0)>0); if(others.length>=2||tier>1&&others.some(p=>(tower.pathTiers?.[p]??0)>1)) return this.reject(client,'One main branch and one tier-1 support branch per turret.');
    const cost=COMBAT_PROGRESSION.towerUpgradeCostBase*tier; if(player.scrap<cost) return this.reject(client,'Not enough scrap.'); player.scrap-=cost; (tower.pathTiers??={})[path]=tier; tower.level=Math.min(3,1+Math.max(...Object.values(tower.pathTiers))); applyResearchUpgrade(tower,path);
  }

  private callBackup(client: Client, baseId: string): void { const base = this.bases.get(baseId); if (!base || base.ownerPlayerId !== client.sessionId || !(base.squadBeaconLevel ?? 0) || !base.joinable) return this.reject(client, "A joinable Squad Beacon is required."); const slot = base.squadSlots?.find((entry) => entry.status === "empty"); if (!slot) return this.reject(client, "Every squad slot is filled."); const active = [...this.squadCommanders.values()].filter((entry) => entry.status === "active"); const activeNames = new Set(active.map((entry) => entry.name)); const name = SQUAD_NAMES.find((entry) => !activeNames.has(entry)) ?? `Roadwatch Helper ${this.idCounter}`; const role = SQUAD_ROLES[(active.length + 1) % SQUAD_ROLES.length]; const joinedAt = Date.now(); const commander: SquadCommander = { id: `squad-${this.idCounter++}`, name, isAI: true, role, baseId, contribution: 0, status: "active", joinedAt }; this.squadCommanders.set(commander.id, commander); Object.assign(slot, { status: "ai_joined", commanderId: commander.id, commanderName: name, isAI: true, role, joinedAt }); this.radio = `${name} answered the Squad Beacon as ${role.toUpperCase()} support.`; }
  private toggleBaseJoinable(client: Client, baseId: string): void { const base = this.bases.get(baseId); if (!base || base.ownerPlayerId !== client.sessionId || !(base.squadBeaconLevel ?? 0)) return this.reject(client, "A Squad Beacon is required."); base.joinable = !base.joinable; this.radio = `${base.ownerName}'s base is now ${base.joinable ? "open for backup" : "closed to new squadmates"}.`; }

  private resetPlayer(client: Client): void {
    const player = this.players.get(client.sessionId); if (!player) return;
    this.removePlayerBase(player, false); player.scrap = STARTING_SCRAP; player.signal = 0; player.redeployCooldownUntil = 0;
    this.radio = `${player.name} reset to protected commander mode.`;
  }

  private removePlayerBase(player: PlayerState, refund: boolean): void {
    if (!player.baseId) return; const baseId = player.baseId; const base = this.bases.get(baseId);
    const ownedTowers = [...this.towers.values()].filter((tower) => tower.baseId === baseId);
    if (refund) player.scrap += Math.floor(ownedTowers.reduce((sum, tower) => sum + TOWER_STATS[tower.type].cost, 0) * REDEPLOY_REFUND_RATE);
    ownedTowers.forEach((tower) => this.towers.delete(tower.id));
    for (const commander of this.squadCommanders.values()) if (commander.baseId === baseId && commander.status === "active") commander.status = "left";
    const contractIds = [...this.contracts.values()].filter((contract) => contract.baseId === baseId).map((contract) => contract.id);
    contractIds.forEach((id) => this.contracts.delete(id));
    [...this.zombies.values()].filter((zombie) => contractIds.includes(zombie.contractId)).forEach((zombie) => this.zombies.delete(zombie.id));
    const lot = this.lotList.find((entry) => entry.id === base?.lotId);
    if (lot) { lot.status = this.territoryList.find((territory) => territory.id === lot.territoryId)?.state === "overrun" ? "overrun" : "empty"; lot.ownerPlayerId = undefined; lot.pads.forEach((pad) => { pad.occupiedBy = undefined; }); }
    this.bases.delete(baseId); player.baseId = undefined;
  }

  private startWave(contract: DefenseContract, now: number): void {
    contract.waveIndex += 1; const roster = planZombieWave(contract.waveIndex); contract.queue = [...roster, ...Array.from({length:Math.floor(roster.length*(enemyCountMultiplier(contract.difficulty)-1))},(_,i)=>roster[i%roster.length]).filter(t=>t!=="zombieKing"&&t!=="brute")];
    contract.nextSpawnAt = now; contract.nextWaveAt = Number.MAX_SAFE_INTEGER;
    const base = this.bases.get(contract.baseId);
    this.radio = `Horde ${contract.waveIndex} inbound on ${base?.ownerName ?? "the"} road contract.${contract.waveIndex % 10 === 0 ? " BOSS: ZOMBIE KING — fused horde incoming." : contract.waveIndex % 5 === 0 ? " BOSS: GRAVEBREAKER incoming." : ""}`;
  }

  private spawnZombie(contract: DefenseContract, type: ZombieType): void {
    if (this.zombies.size >= REGION_MAX_ACTIVE_ZOMBIES) return;
    const stats = ZOMBIE_STATS[type]; const start = contract.routePoints[0]; const id = `zombie-${this.idCounter++}`;
    const scale = waveHealthScale(contract.waveIndex) * enemyHealthMultiplier(contract.difficulty);
    this.zombies.set(id, { id, contractId: contract.id, territoryId: contract.territoryId, type, x: start.x, y: start.y, hp: Math.round(stats.hp * scale), maxHp: Math.round(stats.hp * scale), speed: stats.speed, routeIndex: 1, alive: true, reachedCore: false, routePoints: contract.routePoints });
  }

  private tick(dt: number): void {
    const now = Date.now();
    for (const base of this.bases.values()) if (!base.isAI && base.status === "setup" && now >= base.shieldEndsAt) {
      base.status = "active"; const contract = [...this.contracts.values()].find((entry) => entry.baseId === base.id); if (contract) contract.status = "active";
      this.radio = `Command core shield dropped in ${this.territoryList.find((t) => t.id === base.territoryId)?.name}. Weapons live.`;
    }
    for (const contract of this.contracts.values()) {
      if (contract.status !== "active") continue;
      const active = [...this.zombies.values()].filter((zombie) => zombie.contractId === contract.id).length;
      if (now >= contract.nextWaveAt && active === 0 && contract.queue.length === 0) this.startWave(contract, now);
      if (contract.queue.length && now >= contract.nextSpawnAt && this.zombies.size < REGION_MAX_ACTIVE_ZOMBIES) {
        this.spawnZombie(contract, contract.queue.shift()!); contract.nextSpawnAt = now + waveSpacingMs(contract.waveIndex);
      }
      if (!contract.queue.length && ![...this.zombies.values()].some(entry => entry.contractId === contract.id && entry.alive) && contract.nextWaveAt === Number.MAX_SAFE_INTEGER) this.finishWave(contract, now);
    }

    this.updateTowers(now);
    for (const zombie of [...this.zombies.values()]) this.updateZombie(zombie, dt, now);
    this.updateTerritories(dt);

    this.snapshotAccumulator += dt;
    if (this.snapshotAccumulator >= 1 / SNAPSHOT_RATE) { this.snapshotAccumulator = 0; for (const client of this.clients) this.sendSnapshot(client); }
  }

  private updateTowers(now: number): void {
    for (const tower of this.towers.values()) {
      if (tower.ownerPlayerId.startsWith("ai-") || tower.packed) continue;
      if (now - tower.lastFiredAt < 1000 / tower.fireRate) continue;
      const candidates = [...this.zombies.values()].filter((zombie) => zombie.alive && Math.hypot(zombie.x - tower.x, zombie.y - tower.y) <= tower.range).sort((a, b) => b.routeIndex - a.routeIndex);
      const target = candidates[0]; if (!target) continue;
      tower.lastFiredAt = now; tower.shotX = target.x; tower.shotY = target.y;
      if (tower.type === "flame") {
        [...this.zombies.values()].filter((zombie) => zombie.alive && Math.hypot(zombie.x - target.x, zombie.y - target.y) <= FLAME_AOE_RADIUS).forEach((zombie) => {
          const armorMultiplier = zombie.type === "armored" ? 1.3 : 1;
          const directMultiplier = zombie.id === target.id ? 1 : FLAME_SPLASH_DAMAGE_MULTIPLIER;
          this.damageZombie(zombie, tower.damage * armorMultiplier * directMultiplier, tower.ownerPlayerId);
          if (this.zombies.has(zombie.id)) this.igniteZombie(zombie, tower.ownerPlayerId, now);
        });
        continue;
      }
      const armorMultiplier = target.type === "armored" ? (["flame", "shock"].includes(tower.type) ? 1.3 : 0.6) : 1;
      this.damageZombie(target, tower.damage * armorMultiplier, tower.ownerPlayerId);
      if (tower.type === "cannon") candidates.slice(1).filter((zombie) => Math.hypot(zombie.x - target.x, zombie.y - target.y) < 115).forEach((zombie) => this.damageZombie(zombie, tower.damage * 0.5, tower.ownerPlayerId));
      if (tower.type === "shock") candidates.slice(1, 3).forEach((zombie) => this.damageZombie(zombie, tower.damage * 0.55, tower.ownerPlayerId));
    }
  }

  private damageZombie(zombie: ZombieState, damage: number, contributorId: string): void {
    if (!zombie.alive) return; zombie.hp -= damage;
    if (zombie.hp > 0) return;
    zombie.alive = false; const reward = ZOMBIE_STATS[zombie.type].reward; const contributor = this.players.get(contributorId); if (contributor) contributor.scrap += reward;
    if (zombie.type === "bloater") [...this.zombies.values()].filter((other) => other.id !== zombie.id && Math.hypot(other.x - zombie.x, other.y - zombie.y) < 110).forEach((other) => { other.hp -= 22; });
    this.zombies.delete(zombie.id);
  }

  private igniteZombie(zombie: ZombieState, contributorId: string, now: number): void {
    zombie.burningUntil = Math.max(zombie.burningUntil ?? 0, now + FLAME_BURN_DURATION_MS);
    zombie.burnDamagePerSecond = Math.max(zombie.burnDamagePerSecond ?? 0, FLAME_BURN_DAMAGE_PER_SECOND);
    zombie.burnOwnerPlayerId = contributorId;
  }

  private updateZombie(zombie: ZombieState, dt: number, now: number): void {
    if (!zombie.alive) return;
    if ((zombie.burningUntil ?? 0) > now) {
      this.damageZombie(zombie, (zombie.burnDamagePerSecond ?? FLAME_BURN_DAMAGE_PER_SECOND) * dt, zombie.burnOwnerPlayerId ?? "burn");
      if (!this.zombies.has(zombie.id)) return;
    } else if (zombie.burningUntil) {
      zombie.burningUntil = undefined; zombie.burnDamagePerSecond = undefined; zombie.burnOwnerPlayerId = undefined;
    }
    const target = zombie.routePoints[zombie.routeIndex];
    if (!target) return this.hitCore(zombie);
    const dx = target.x - zombie.x; const dy = target.y - zombie.y; const distance = Math.hypot(dx, dy);
    if (distance < 10) { zombie.routeIndex += 1; if (zombie.routeIndex >= zombie.routePoints.length) this.hitCore(zombie); return; }
    const step = Math.min(distance, zombie.speed * dt); zombie.x += dx / distance * step; zombie.y += dy / distance * step;
  }

  private hitCore(zombie: ZombieState): void {
    const contract = this.contracts.get(zombie.contractId); const base = contract ? this.bases.get(contract.baseId) : undefined;
    zombie.reachedCore = true; this.zombies.delete(zombie.id); if (!base || Date.now() < base.shieldEndsAt) return;
    base.hp -= ZOMBIE_STATS[zombie.type].coreDamage; base.status = "underAttack";
    if (base.hp <= 0) this.destroyBase(base);
  }

  private destroyBase(base: BaseState): void {
    const player = this.players.get(base.ownerPlayerId); const territory = this.territoryList.find((entry) => entry.id === base.territoryId);
    if (territory) territory.pressure = Math.min(100, territory.pressure + 22);
    this.radio = `${base.ownerName}'s command core fell. Territory pressure surged.`;
    if (player) this.removePlayerBase(player, false);
  }

  private finishWave(contract: DefenseContract, now: number): void {
    contract.nextWaveAt = now + waveRestMs(contract.waveIndex);
    const player = this.players.get(contract.ownerPlayerId); if (player) { const reward=missionRewards(contract.difficulty,contract.waveIndex); player.scrap+=reward.scrap; awardXp(player,reward.xp); if(Math.random()<reward.turretChance) (player.turretRewards??=[]).push({type:TOWER_TYPES[Math.floor(Math.random()*TOWER_TYPES.length)],path:RESEARCH_PATHS[Math.floor(Math.random()*3)],tier:reward.turretTier}); player.signal += 1; }
    const territory = this.territoryList.find((entry) => entry.id === contract.territoryId);
    if (territory) territory.pressure = Math.max(0, territory.pressure - (this.bases.get(contract.baseId)?.kind === "reclaim" ? 16 : 5));
    this.radio = `Wave survived. Territory pressure reduced; salvage crews recovered scrap.`;
  }

  private updateTerritories(dt: number): void {
    for (const territory of this.territoryList) {
      if (territory.state !== "overrun") territory.pressure = Math.min(100, territory.pressure + territory.infestation * 0.00022 * dt);
      if (territory.pressure >= 100) territory.state = "overrun";
      else if (territory.state === "reclaiming" && territory.pressure <= 40) territory.state = "contested";
      else if (territory.pressure >= 65 && territory.state !== "reclaiming") territory.state = "infested";
      else if (territory.pressure >= 30 && territory.state === "safe") territory.state = "contested";
    }
  }

  private sendWorld(client: Client): void { client.send("world", worldStatic); this.sendSnapshot(client); }

  private sendSnapshot(client: Client): void {
    const operations = [...this.bases.values()].map((base) => ({ id: `server-operation-${base.id}`, sectorId: base.territoryId, ownerPlayerId: base.ownerPlayerId, ownerName: base.ownerName, isAI: base.isAI, kind: base.kind === "reclaim" ? "reclaim" as const : "defense" as const, status: base.status === "setup" ? "staging" as const : base.status === "destroyed" ? "failed" as const : base.status === "packed" ? "evacuated" as const : "active" as const, startedAt: base.shieldEndsAt - BASE_SETUP_SECONDS * 1000, updatedAt: Date.now(), lotId: base.lotId, baseId: base.id, contribution: 0, wavesSurvived: 0, pressureReduced: 0, casualties: 0, visibleMarkerX: base.coreX, visibleMarkerY: base.coreY, sharedBaseSlots: base.squadSlots?.length ?? 0, squadFilledSlots: base.squadSlots?.filter((entry) => ["ai_joined", "player_joined"].includes(entry.status)).length ?? 0, joinable: Boolean(base.joinable && (base.squadSlots?.length ?? 0) > 0), squadBeaconBuilt: (base.squadBeaconLevel ?? 0) > 0 }));
    const sectors = this.territoryList.map((territory) => { const active = operations.filter((operation) => operation.sectorId === territory.id); const center = territory.labelPoint ?? { x: territory.x + territory.w / 2, y: territory.y + territory.h / 2 }; return { id: territory.id, name: territory.name, regionId: territory.id, centerX: center.x, centerY: center.y, state: territory.state === "safe" ? "secure" as const : territory.state, threatLevel: territory.threatLevel, pressure: territory.pressure, infestation: territory.infestation, supply: Math.max(0, 100 - territory.pressure * .72), activeOperationIds: active.map((operation) => operation.id), aiOperationCount: active.filter((operation) => operation.isAI).length, playerOperationCount: active.filter((operation) => !operation.isAI).length, recommended: territory.state === "safe" || territory.state === "contested", isFrontline: ["contested", "infested", "reclaiming"].includes(territory.state), lastEventText: this.radio }; });
    const snapshot: Snapshot = {
      serverTime: Date.now(), localPlayerId: client.sessionId, players: [...this.players.values()], territories: this.territoryList,
      lots: this.lotList, bases: [...this.bases.values()], towers: [...this.towers.values()],
      zombies: [...this.zombies.values()].map(({ routePoints: _routePoints, ...zombie }) => zombie), contracts: [...this.contracts.values()], warSectors: sectors, warOperations: operations, squadCommanders: [...this.squadCommanders.values()], activityFeed: [this.radio], radio: this.radio
    };
    client.send("snapshot", snapshot);
  }

  private reject(client: Client, text: string): void { client.send("notice", { text, error: true }); }
}
