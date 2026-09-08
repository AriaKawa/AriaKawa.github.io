import { ZOMBIE_ROSTER, planZombieWave, waveHealthScale, waveSpacingMs, waveRestMs } from "../../../server/src/sim/zombieRoster";
import { SceneryWorld } from "../game/SceneryWorld";
import { COMBAT_PROGRESSION, FLAME_AOE_RADIUS, FLAME_BURN_DAMAGE_PER_SECOND, FLAME_BURN_DURATION_MS, FLAME_SPLASH_DAMAGE_MULTIPLIER, SQUAD_BEACON_UPGRADE_COSTS, TOWER_FIRE_RATE, TOWER_INFO, ZOMBIE_INFO } from "../game/constants";
import { TACTICAL_MAP_SCALE, THEATER_HEIGHT, THEATER_WIDTH } from "../game/AmericasTheater";
import { shouldZombieFollowRoad } from "../game/contractRules";
import { EQUIPMENT_TYPES } from "../game/Equipment";
import { continentWorld, createContinentLots, defenseContractSeed, generateDefenseContractLayout, territoriesSeed as expandedTerritories } from "../game/continentData";
import { CONVOY_FUEL_PER_SECOND, CONVOY_ROAD_SPEED, assessDeployment, convoyTravelSpeed, dampConvoySpeed, placeLotAtConvoy, steerConvoyHeading } from "../game/convoyDeployment";
import { createWarSectors, sectorIdForTerritory, territoryStateForWarState, warStateForPressure } from "../game/sectorWar";
import type { BaseState, DefenseContract, EquipmentType, LootSatchel, PlacedEquipment, PlayerState, RoadsideLot, Snapshot, SquadCommander, SquadRole, StrategicDeploymentContext, TowerState, TowerType, Vec2, WarOperation, WarSector, WorldStatic, ZombieState } from "../game/types";

type InternalZombie = ZombieState & { routePoints: Vec2[] };
type Notice = { text: string; error?: boolean };

const SQUAD_NAMES = ["Rook Battery", "Ash Courier", "Mara Voss", "Tin Prophet", "June Wire", "Patch-9", "Old Calder", "Signal Mae", "Crowbar Saint", "Dust Anchor"];
const SQUAD_ROLES: SquadRole[] = ["builder", "repair", "gunner", "scavenger", "signal"];
const LOOT_TABLE: EquipmentType[] = ["barbedWire", "barbedWire", "proximityMine", "fieldRepairKit", "roadFlare", "roadFlare", "overclockBooster"];
const SATCHEL_DROP_CHANCE: Record<ZombieState["type"], number> = { shambler: .02, runner: .02, bloater: .06, armored: .06, brute: .18, walker: .01, crawler: .02, stalker: .04, skitter: .04, ravager: .1, zombieKing: 1 };

function distanceToSegment(point: Vec2, a: Vec2, b: Vec2): number {
  const dx = b.x - a.x; const dy = b.y - a.y; const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(point.x - a.x, point.y - a.y);
  const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared));
  return Math.hypot(point.x - (a.x + dx * t), point.y - (a.y + dy * t));
}

export class LocalSimulation {
  private scenery?: SceneryWorld;
  private projectScenery: (p: Vec2) => Vec2 = p => p;
  private unprojectScenery: (p: Vec2) => Vec2 = p => p;
  private sceneryScale = 1;
  private sceneryRoutes = new Map<string, Vec2[]>();
  setScenery(world: SceneryWorld, project: (p: Vec2) => Vec2, unproject: (p: Vec2) => Vec2, scale: number): void {
    this.scenery=world; this.projectScenery=project; this.unprojectScenery=unproject; this.sceneryScale=scale; this.sceneryRoutes.clear();
    const base=this.bases.find(b=>b.ownerPlayerId===this.playerId && b.status==="packed");
    if(base) { const p=unproject(world.nearestFree(project({x:base.coreX,y:base.coreY}),45*scale+2)); base.coreX=p.x; base.coreY=p.y; }
  }
  private sceneryBlocked(p: Vec2, radius: number): boolean { return this.scenery?.blocked(this.projectScenery(p),radius*this.sceneryScale) ?? false; }
  private sceneryMove(a: Vec2,b: Vec2,radius: number): Vec2 { return this.scenery ? this.unprojectScenery(this.scenery.move(this.projectScenery(a),this.projectScenery(b),radius*this.sceneryScale)) : b; }
  private sceneryRoute(points: Vec2[]): Vec2[] { return this.scenery ? this.scenery.route(points.map(this.projectScenery),18*this.sceneryScale).map(this.unprojectScenery) : points; }
  readonly playerId = "offline-commander";
  readonly world: WorldStatic = structuredClone(continentWorld);
  private player: PlayerState;
  private territories = structuredClone(expandedTerritories);
  private lots = createContinentLots();
  private bases: BaseState[] = [];
  private towers: TowerState[] = [];
  private zombies: InternalZombie[] = [];
  private contracts: DefenseContract[] = [];
  private warSectors: WarSector[] = createWarSectors(this.territories);
  private warOperations: WarOperation[] = [];
  private squadCommanders: SquadCommander[] = [];
  private lootSatchels: LootSatchel[] = [];
  private placedEquipment: PlacedEquipment[] = [];
  private activityFeed = ["Roadwatch sector net synchronized.", "Mara Voss is holding West Prairie Corridor.", "Reclaim route opened toward Gateway Ruins."];
  private radio = "Sector war synchronized. Pick a front and open an operation.";
  private id = 1;
  private lastTick = performance.now();
  private nextAiResolutionAt = Date.now() + 20000;
  private aiResolutionIndex = 0;
  private lastWarPersistAt = 0;
  private nextSquadContributionAt = Date.now() + 5000;
  private activeStrategicContext?: StrategicDeploymentContext;

  constructor(name: string, private snapshotListener: (snapshot: Snapshot) => void, private noticeListener: (notice: Notice) => void) {
    this.player = { id: this.playerId, name, scrap: 250, fuel: 100, signal: 0, protectedUntil: Date.now() + 120000, redeployCooldownUntil: 0, equipmentStash: [], equipmentBar: [...EQUIPMENT_TYPES] };
    this.restoreWarState(); this.seedAi(); this.syncSectorState();
    window.setInterval(() => this.tick(), 50);
    window.setTimeout(() => this.emit(), 0);
  }

  reserveLot(lotId: string): void {
    const target = this.lots.find((entry) => entry.id === lotId);
    if (!target || target.status !== "empty" || this.player.baseId) return;
    this.lots.forEach((entry) => { if (entry.status === "reserved" && entry.ownerPlayerId === this.playerId) { entry.status = "empty"; entry.ownerPlayerId = undefined; } });
    target.status = "reserved"; target.ownerPlayerId = this.playerId; this.notice("Roadside lot reserved. Deploy when ready."); this.emit();
  }

  deploy(lotId: string, reclaim = false, strategicContext?: StrategicDeploymentContext): void {
    const target = this.lots.find((entry) => entry.id === lotId); const territory = this.territories.find((entry) => entry.id === target?.territoryId);
    if (!target || !territory || this.player.baseId) return;
    if (reclaim && !(target.status === "overrun" && territory.state === "overrun") && strategicContext?.state !== "overrun") return this.notice("That reclaim lot is unavailable.", true);
    if (!reclaim && !["empty", "reserved"].includes(target.status)) return this.notice("That roadside lot is occupied.", true);
    if (reclaim) { territory.state = "reclaiming"; territory.pressure = 78; }
    target.status = "occupied"; target.ownerPlayerId = this.playerId; this.activeStrategicContext = strategicContext;
    this.world.roads = structuredClone(continentWorld.roads);
    const now = Date.now(); const baseId = `base-${this.id++}`; const operation = this.startPlayerOperation(target, baseId, reclaim, now, strategicContext); const entry = { ...target.nearbyRoadPoint };
    target.worldX = strategicContext?.worldX; target.worldY = strategicContext?.worldY;
    this.bases.push({ id: baseId, ownerPlayerId: this.playerId, ownerName: this.player.name, isAI: false, territoryId: target.territoryId, lotId: target.id, operationId: operation.id, coreX: entry.x, coreY: entry.y, worldX: strategicContext?.worldX, worldY: strategicContext?.worldY, anchorX: target.x, anchorY: target.y, entryX: entry.x, entryY: entry.y, insertedAt: now, lastMovedAt: now, driveSpeed: 0, hp: reclaim ? 850 : 1000, maxHp: reclaim ? 850 : 1000, shieldEndsAt: 0, status: "packed", heading: 0, kind: reclaim ? "reclaim" : "command", joinable: false, squadBeaconLevel: 0, squadSlots: [] });
    this.player.baseId = baseId; this.player.activeOperationId = operation.id;
    this.radio = "Convoy inserted at the sector entry point. Drive across the country and deploy on clear dry land."; this.pushFeed(`${reclaim ? "Reclaim" : "Defense"} convoy entered ${strategicContext?.regionName ?? territory.name}.`); this.notice("Convoy Entry Point — drive with WASD, coast to a stop, then deploy."); this.syncSectorState(); this.emit();
  }

  deployConvoy(strategicOnLand?: boolean): void {
    const base = this.bases.find((entry) => entry.id === this.player.baseId); if (!base || base.status !== "packed") return this.notice("The command core is already deployed.", true);
    if (this.sceneryBlocked({x:base.coreX,y:base.coreY},75)) return this.notice("Move to clear ground before deploying: a solid object is in the way.",true);
    const assessment = assessDeployment(this.world, base, Date.now(), false, strategicOnLand); if (!assessment.valid) return this.notice(assessment.message, true);
    const target = this.lots.find((entry) => entry.id === base.lotId); const territory = this.territories.find((entry) => entry.id === base.territoryId); const operation = this.warOperations.find((entry) => entry.id === base.operationId);
    if (!target || !territory || !operation || !placeLotAtConvoy(target, base, this.world)) return this.notice("Cannot deploy here.", true);
    const now = Date.now(); const contractId = `contract-${this.id++}`; const difficulty = Math.max(1, territory.threatLevel + (base.kind === "reclaim" ? 2 : 0)); const seed = defenseContractSeed(`${contractId}:${target.id}:${base.coreX.toFixed(0)}:${base.coreY.toFixed(0)}`); let layout: ReturnType<typeof generateDefenseContractLayout>;
    try { layout = generateDefenseContractLayout(target, difficulty, contractId, seed, points => this.scenery ? this.scenery.deploymentRoute(points.map(this.projectScenery), 22*this.sceneryScale, this.sceneryScale).map(this.unprojectScenery) : points); }
    catch { return this.notice("No clear approach nearby. Move to more open ground and deploy again.", true); } layout.buildPads = layout.buildPads.filter(p => !this.sceneryBlocked(p,p.radius)); target.pads = layout.buildPads;
    this.sceneryRoutes.clear();
    this.contracts = this.contracts.filter((entry) => entry.baseId !== base.id); const primaryRoute = layout.routes[0]; const primarySpawn = layout.spawnpoints[0];
    this.contracts.push({ id: contractId, ownerPlayerId: this.playerId, baseId: base.id, sectorId: operation.sectorId, territoryId: target.territoryId, lotId: target.id, basePosition: { x: base.coreX, y: base.coreY }, corePosition: { x: base.coreX, y: base.coreY }, spawnpoints: layout.spawnpoints, routes: layout.routes, buildPads: layout.buildPads, spawnPointId: primarySpawn.id, routePoints: primaryRoute.points, nextWaveAt: now + 31200, nextSpawnAt: 0, waveIndex: 0, difficulty, threatLevel: territory.threatLevel, routeDanger: layout.routeDanger, status: "setup", queue: [], activeRouteIds: [primaryRoute.id] });
    const stowed = this.towers.filter((entry) => entry.baseId === base.id && entry.packed); stowed.forEach((tower, index) => { const pad = target.pads[index]; if (!pad) return; tower.padId = pad.id; tower.x = pad.x; tower.y = pad.y; tower.packed = false; pad.occupiedBy = tower.id; });
    base.status = "setup"; base.driveSpeed = 0; base.shieldEndsAt = now + 30000; base.joinable = (base.squadBeaconLevel ?? 0) > 0; operation.status = "staging"; operation.updatedAt = now; operation.visibleMarkerX = base.coreX; operation.visibleMarkerY = base.coreY; this.player.activeOperationId = operation.id;
    console.info(`DefenseContract created:\n- base: ${territory.name}\n- spawnpoint: ${primarySpawn.name}\n- route length: ${Math.round(primaryRoute.routeLength)}\n- build pads: ${layout.buildPads.length}\n- route danger: ${layout.routeDanger}`);
    const restored = stowed.filter((entry) => !entry.packed).length; this.radio = `Command core deployed. Horde route confirmed from ${primarySpawn.name}.`; this.pushFeed(`Defense contract refreshed at ${Math.round(base.coreX)}, ${Math.round(base.coreY)}; ${restored} turret${restored === 1 ? "" : "s"} restored.`); this.notice(`${this.radio} ${restored ? `${restored} stowed turret${restored === 1 ? "" : "s"} restored.` : "Build defenses on the marked pads."}`); this.syncOperationSquad(base); this.syncSectorState(); this.emit();
  }

  startDefenseNow(): void {
    const base = this.bases.find((entry) => entry.id === this.player.baseId); if (!base) return;
    const now = Date.now(); const contract = this.contracts.find((entry) => entry.baseId === base.id); const operation = this.warOperations.find((entry) => entry.id === base.operationId);
    if (base.status === "setup") {
      base.status = "active"; base.shieldEndsAt = now; if (contract) { contract.status = "active"; contract.nextWaveAt = now + 1200; } if (operation) { operation.status = "active"; operation.updatedAt = now; }
      this.radio = `${this.player.name} dropped the setup shield early. Weapons live.`; this.pushFeed(this.radio); this.notice("Defense started. First horde inbound."); this.emit(); return;
    }
    const hordeActive = Boolean(contract?.queue.length) || this.zombies.some((entry) => entry.contractId === contract?.id);
    if (!["active", "underAttack"].includes(base.status) || !contract || hordeActive || contract.nextWaveAt >= Number.MAX_SAFE_INTEGER) return;
    contract.nextWaveAt = now; if (operation) { operation.status = "active"; operation.updatedAt = now; }
    this.radio = `${this.player.name} called the next horde in early.`; this.pushFeed(this.radio); this.notice("Next horde inbound now."); this.emit();
  }

  build(padId: string, type: TowerType): void {
    const base = this.bases.find((entry) => entry.id === this.player.baseId); const targetLot = this.lots.find((entry) => entry.id === base?.lotId); const pad = targetLot?.pads.find((entry) => entry.id === padId);
    if (!base || !pad || pad.occupiedBy) return this.notice("That build pad is occupied.", true);
    if (this.sceneryBlocked(pad,pad.radius)) return this.notice("A solid object blocks this build pad.",true);
    if (base.status === "packed") return this.notice("Turrets are stowed while the convoy is mobile.", true);
    if (type === "squadBeacon" && (base.squadBeaconLevel ?? 0) > 0) return this.notice("This base already has a Squad Beacon. Upgrade the existing mast.", true);
    const info = TOWER_INFO[type]; const cost = this.effectiveTowerCost(base.id, type); if (this.player.scrap < cost) return this.notice("Not enough scrap.", true);
    this.player.scrap -= cost; const towerId = `tower-${this.id++}`; pad.occupiedBy = towerId;
    const rate = TOWER_FIRE_RATE[type];
    this.towers.push({ id: towerId, ownerPlayerId: this.playerId, baseId: base.id, padId, type, x: pad.x, y: pad.y, level: 1, range: info.range, damage: info.damage, fireRate: rate, lastFiredAt: 0 });
    if (type === "squadBeacon") { base.squadBeaconLevel = 1; base.joinable = true; base.squadSlots = [{ id: `squad-slot-${this.id++}`, baseId: base.id, status: "empty", isAI: false }]; this.syncOperationSquad(base); this.radio = `${this.player.name} raised a Squad Beacon. This operation is now joinable.`; this.pushFeed(this.radio); }
    else this.radio = `${this.player.name} built a ${type === "cannon" ? "scrap cannon" : type} tower${cost < info.cost ? " with Builder support" : ""}.`;
    this.emit();
  }

  upgrade(towerId: string): void {
    const tower = this.towers.find((entry) => entry.id === towerId && entry.ownerPlayerId === this.playerId); if (!tower || tower.level >= 3) return;
    if (tower.type === "squadBeacon") { const base = this.bases.find((entry) => entry.id === tower.baseId); const nextLevel = tower.level + 1 as 2 | 3; const cost = SQUAD_BEACON_UPGRADE_COSTS[nextLevel]; if (!base || this.player.scrap < cost) return this.notice("Not enough scrap for that beacon upgrade.", true); this.player.scrap -= cost; tower.level = nextLevel; base.squadBeaconLevel = nextLevel; base.squadSlots ??= []; while (base.squadSlots.length < nextLevel) base.squadSlots.push({ id: `squad-slot-${this.id++}`, baseId: base.id, status: "empty", isAI: false }); this.syncOperationSquad(base); this.radio = `Squad Beacon upgraded to Level ${nextLevel}. ${nextLevel} helper slots are online.`; this.pushFeed(this.radio); this.emit(); return; }
    const cost = COMBAT_PROGRESSION.towerUpgradeCostBase * tower.level; if (this.player.scrap < cost) return this.notice("Not enough scrap for that upgrade.", true);
    this.player.scrap -= cost; tower.level += 1; tower.damage *= COMBAT_PROGRESSION.towerUpgradeDamageMultiplier; tower.range += COMBAT_PROGRESSION.towerUpgradeRangeBonus; this.emit();
  }

  callBackup(baseId: string): void {
    const base = this.bases.find((entry) => entry.id === baseId && entry.ownerPlayerId === this.playerId); if (!base || !(base.squadBeaconLevel ?? 0)) return this.notice("Build a Squad Beacon first.", true); if (!base.joinable) return this.notice("Set the base to joinable before calling backup.", true);
    const slot = base.squadSlots?.find((entry) => entry.status === "empty"); if (!slot) return this.notice("Every squad slot is filled. Upgrade the beacon for more capacity.", true);
    const activeNames = new Set(this.squadCommanders.filter((entry) => entry.status === "active").map((entry) => entry.name)); const name = SQUAD_NAMES.find((entry) => !activeNames.has(entry)) ?? `Roadwatch Helper ${this.id}`; const role = SQUAD_ROLES[(this.squadCommanders.filter((entry) => entry.status === "active").length + 1) % SQUAD_ROLES.length]; const joinedAt = Date.now(); const commander: SquadCommander = { id: `squad-${this.id++}`, name, isAI: true, role, baseId, contribution: 0, status: "active", joinedAt }; this.squadCommanders.push(commander); Object.assign(slot, { status: "ai_joined", commanderId: commander.id, commanderName: name, isAI: true, role, joinedAt }); this.syncOperationSquad(base); this.radio = `${name} answered the Squad Beacon as ${role.toUpperCase()} support.`; this.pushFeed(this.radio); this.emit();
  }

  toggleBaseJoinable(baseId: string): void { const base = this.bases.find((entry) => entry.id === baseId && entry.ownerPlayerId === this.playerId); if (!base || !(base.squadBeaconLevel ?? 0)) return this.notice("A Squad Beacon is required.", true); base.joinable = !base.joinable; this.syncOperationSquad(base); this.radio = `${this.player.name}'s base is now ${base.joinable ? "open for backup" : "closed to new squadmates"}.`; this.pushFeed(this.radio); this.emit(); }
  requestJoinBase(_baseId: string, _preferredRole?: SquadRole): void { this.notice("Real commander joining is coming soon. AI backup is available now."); }
  acceptJoinRequest(_baseId: string, _commanderId: string): void { this.notice("Join-request approval is reserved for the multiplayer service."); }
  leaveSquad(baseId: string): void { const commander = this.squadCommanders.find((entry) => entry.baseId === baseId && !entry.isAI && entry.status === "active"); if (commander) commander.status = "left"; this.emit(); }

  redeploy(lotId: string, strategicContext?: StrategicDeploymentContext): void {
    const target = this.lots.find((entry) => entry.id === lotId); if (!this.player.baseId || !target || target.status !== "empty") return this.notice("Choose an empty roadside lot.", true);
    const activeContractIds = this.contracts.filter((entry) => entry.baseId === this.player.baseId).map((entry) => entry.id);
    if (this.zombies.some((entry) => activeContractIds.includes(entry.contractId))) return this.notice("Cannot pack the core while a horde is on the road.", true);
    this.closePlayerOperation("evacuated", "Convoy packed for redeployment."); this.removeBase(true); target.status = "reserved"; target.ownerPlayerId = this.playerId; this.deploy(target.id, false, strategicContext); this.player.redeployCooldownUntil = Date.now() + 30000;
    this.radio = `${this.player.name}'s convoy redeployed. Salvage crews recovered 75% of tower scrap.`; this.emit();
  }

  packConvoy(): void {
    const base = this.bases.find((entry) => entry.id === this.player.baseId); if (!base) return this.notice("Deploy a command core first.", true);
    if (base.status === "packed") return this.notice("Convoy is already packed. Use WASD to drive.");
    const contracts = this.contracts.filter((entry) => entry.baseId === base.id); const contractIds = new Set(contracts.map((entry) => entry.id));
    if (contracts.some((entry) => entry.queue.length > 0) || this.zombies.some((entry) => contractIds.has(entry.contractId))) return this.notice("Cannot pack while a horde is on the road.", true);
    for (const contract of contracts) { contract.status = "paused"; contract.queue = []; contract.nextWaveAt = Number.MAX_SAFE_INTEGER; }
    const lot = this.lots.find((entry) => entry.id === base.lotId); lot?.pads.forEach((pad) => { pad.occupiedBy = undefined; });
    const packed = this.towers.filter((entry) => entry.baseId === base.id); packed.forEach((tower) => { tower.packed = true; tower.shotX = undefined; tower.shotY = undefined; });
    base.status = "packed"; base.heading ??= 0; base.driveSpeed = 0; base.joinable = false; this.closePlayerOperation("evacuated", "Turrets stowed and mobile command core underway.");
    this.radio = `${this.player.name} packed ${packed.length} turret${packed.length === 1 ? "" : "s"}. Convoy controls transferred to WASD.`; this.pushFeed(this.radio); this.notice("All turrets stowed. Use WASD to drive; arrow keys pan the camera."); this.emit();
  }

  driveBase(steering: number, throttle: number, deltaMs: number, onVisibleHighway = false): void {
    const base = this.bases.find((entry) => entry.id === this.player.baseId); if (!base || base.status !== "packed") return;
    const previousHeading = base.heading ?? 0;
    const dt = Math.min(50, Math.max(0, deltaMs)) / 1000; const input = Math.max(-1, Math.min(1, throttle)); const fuelFactor = this.player.fuel > 0 ? 1 : .16; const targetSpeed = convoyTravelSpeed(onVisibleHighway) * fuelFactor * input;
    base.driveSpeed = dampConvoySpeed(base.driveSpeed ?? 0, targetSpeed, dt); const steeringDirection = Math.abs(base.driveSpeed) > .2 ? base.driveSpeed : input;
    if (Math.abs(steeringDirection) > .01) base.heading = steerConvoyHeading(base.heading ?? 0, steering, steeringDirection, dt);
    const distance = (base.driveSpeed ?? 0) * dt; if (Math.abs(distance) < .001) return;
    const heading = base.heading ?? 0; const nextX = base.coreX + Math.cos(heading) * distance; const nextY = base.coreY + Math.sin(heading) * distance;
    const previousX = base.coreX; const previousY = base.coreY;
    if (base.worldX !== undefined && base.worldY !== undefined) {
      const anchorX = base.anchorX ?? base.coreX; const anchorY = base.anchorY ?? base.coreY;
      const minX = anchorX - base.worldX / TACTICAL_MAP_SCALE; const maxX = anchorX + (THEATER_WIDTH - base.worldX) / TACTICAL_MAP_SCALE;
      const minY = anchorY - base.worldY / TACTICAL_MAP_SCALE; const maxY = anchorY + (THEATER_HEIGHT - base.worldY) / TACTICAL_MAP_SCALE;
      base.coreX = Math.max(minX, Math.min(maxX, nextX)); base.coreY = Math.max(minY, Math.min(maxY, nextY));
    } else {
      base.coreX = Math.max(0, Math.min(this.world.worldWidth, nextX)); base.coreY = Math.max(0, Math.min(this.world.worldHeight, nextY));
    }
    // Overlapping discs follow the chassis rather than transparent sprite bounds.
    const start={x:previousX,y:previousY},end={x:base.coreX,y:base.coreY};
    let fraction=1;
    const sweep=(t:number) => {
      for(const offset of [-20,-10,0,10,20]) {
        const a={x:start.x+Math.cos(previousHeading)*offset,y:start.y+Math.sin(previousHeading)*offset};
        const angle=previousHeading+(heading-previousHeading)*t;
        const b={x:start.x+(end.x-start.x)*t+Math.cos(angle)*offset,y:start.y+(end.y-start.y)*t+Math.sin(angle)*offset};
        const arcMargin=20*(1-Math.cos((heading-previousHeading)*t/2));
        if(this.scenery && !this.scenery.clear(this.projectScenery(a),this.projectScenery(b),(11+arcMargin)*this.sceneryScale)) return false;
      } return true;
    };
    if(!sweep(1)) { let low=0,high=1; for(let i=0;i<20;i++){const t=(low+high)/2;if(sweep(t))low=t;else high=t;} fraction=low; }
    const safe={x:start.x+(end.x-start.x)*fraction,y:start.y+(end.y-start.y)*fraction};
    base.heading=previousHeading+(heading-previousHeading)*fraction;
    base.coreX=safe.x; base.coreY=safe.y;
    const moved = Math.hypot(base.coreX - previousX, base.coreY - previousY); if (moved < Math.abs(distance) * .1) base.driveSpeed = 0;
    if (moved > .01) { base.lastMovedAt = Date.now(); if (this.player.fuel > 0) this.player.fuel = Math.max(0, this.player.fuel - CONVOY_FUEL_PER_SECOND * Math.min(1, Math.abs(base.driveSpeed ?? 0) / CONVOY_ROAD_SPEED) * dt); }
  }

  openLootSatchel(satchelId: string): void {
    const satchel = this.lootSatchels.find((entry) => entry.id === satchelId && entry.ownerPlayerId === this.playerId); if (!satchel) return;
    const stack = this.player.equipmentStash?.find((entry) => entry.type === satchel.itemType);
    if (stack) stack.count += satchel.quantity; else (this.player.equipmentStash ??= []).push({ type: satchel.itemType, count: satchel.quantity });
    this.lootSatchels = this.lootSatchels.filter((entry) => entry.id !== satchelId); this.notice(`Satchel opened: ${satchel.quantity} field item recovered.`); this.pushFeed(`${this.player.name} recovered field equipment from the horde.`); this.emit();
  }

  useEquipment(type: EquipmentType, point?: Vec2, towerId?: string): void {
    const stack = this.player.equipmentStash?.find((entry) => entry.type === type); if (!stack?.count) return this.notice("That equipment slot is empty.", true);
    const base = this.bases.find((entry) => entry.id === this.player.baseId); const contract = this.contracts.find((entry) => entry.baseId === base?.id);
    if (!base || base.status === "packed" || !contract) return this.notice("Deploy the command core before using field equipment.", true);
    const consume = () => { stack.count -= 1; this.player.equipmentStash = this.player.equipmentStash?.filter((entry) => entry.count > 0); };
    if (type === "fieldRepairKit") {
      if (base.hp >= base.maxHp) return this.notice("Command core integrity is already full.", true);
      base.hp = Math.min(base.maxHp, base.hp + 250); consume(); this.notice("Field Repair Kit restored 250 core integrity."); this.emit(); return;
    }
    if (type === "overclockBooster") {
      const tower = this.towers.find((entry) => entry.id === towerId && entry.ownerPlayerId === this.playerId && entry.type !== "squadBeacon"); if (!tower) return this.notice("Select a combat tower to overclock.", true);
      tower.boostWaveIndex = Math.max(1, contract.waveIndex || 1); consume(); this.notice("Tower overclocked: +50% damage and fire rate for this wave."); this.emit(); return;
    }
    if (!point) return this.notice("Click the marked horde track to place that item.", true);
    const onRoute = contract.routes.some((route) => route.points.slice(1).some((next, index) => distanceToSegment(point, route.points[index], next) <= 95));
    if (!onRoute) return this.notice("Place field gear directly on the marked horde track.", true);
    const expiresAt = Date.now() + (type === "roadFlare" ? 18000 : 90000); this.placedEquipment.push({ id: `equipment-${this.id++}`, ownerPlayerId: this.playerId, contractId: contract.id, type, x: point.x, y: point.y, placedAt: Date.now(), expiresAt }); consume();
    this.notice(type === "barbedWire" ? "Barbed wire deployed: slows and damages infected." : type === "proximityMine" ? "Proximity mine armed on the track." : "Road flare burning: infected inside its glow are slowed."); this.emit();
  }

  restart(): void { this.closePlayerOperation("evacuated", "Operation withdrawn to Commander Mode."); this.removeBase(false); this.player.scrap = 250; this.player.signal = 0; this.player.redeployCooldownUntil = 0; this.player.equipmentStash = []; this.lootSatchels = []; this.placedEquipment = []; this.radio = `${this.player.name} reset to protected commander mode.`; this.emit(); }

  private tick(): void {
    const current = performance.now(); const dt = Math.min(.05, (current - this.lastTick) / 1000); this.lastTick = current; const now = Date.now();
    for (const base of this.bases.filter((entry) => !entry.isAI && entry.status === "setup" && now >= entry.shieldEndsAt)) { base.status = "active"; const contract = this.contracts.find((entry) => entry.baseId === base.id); if (contract) contract.status = "active"; const operation = this.warOperations.find((entry) => entry.id === base.operationId); if (operation) { operation.status = "active"; operation.updatedAt = now; } this.radio = "Command core shield dropped. Weapons live."; }
    for (const contract of this.contracts) {
      if (contract.status !== "active") continue; const active = this.zombies.filter((entry) => entry.contractId === contract.id).length;
      if (now >= contract.nextWaveAt && active === 0 && !contract.queue.length) this.startWave(contract, now);
      if (contract.queue.length && now >= contract.nextSpawnAt) { this.spawn(contract, contract.queue.shift()!); contract.nextSpawnAt = now + waveSpacingMs(contract.waveIndex); }
      if (!contract.queue.length && !this.zombies.some(entry => entry.contractId === contract.id) && contract.nextWaveAt === Number.MAX_SAFE_INTEGER) this.finishWave(contract, now);
    }
    this.updateTowers(now);
    for (const zombie of [...this.zombies]) this.moveZombie(zombie, dt, now);
    this.placedEquipment = this.placedEquipment.filter((entry) => entry.expiresAt > now);
    this.lootSatchels = this.lootSatchels.filter((entry) => now - entry.droppedAt < 120000);
    this.updateSquadSupport(dt, now);
    this.updateSectorWar(dt, now);
    this.emit();
  }

  private startWave(contract: DefenseContract, now: number): void {
    contract.waveIndex += 1; const roster = planZombieWave(contract.waveIndex); const activeRoutes = contract.routes.slice(0, 1); contract.activeRouteIds = activeRoutes.map((entry) => entry.id);
    const orders = roster.map((zombieType, index) => { const route = activeRoutes[index % activeRoutes.length]; const roadFollowing = route.roadIds.length > 0 && shouldZombieFollowRoad(index, contract.waveIndex); return { spawnpointId: route.spawnpointId, routeId: route.id, zombieType, roadFollowing }; }); contract.queue = orders;
    const groups = new Map<string, NonNullable<DefenseContract["currentWavePlan"]>["spawnGroups"][number]>(); for (const order of orders) { const key = `${order.spawnpointId}:${order.routeId}:${order.zombieType}`; const existing = groups.get(key); if (existing) existing.count += 1; else groups.set(key, { spawnpointId: order.spawnpointId, routeId: order.routeId, zombieType: order.zombieType, count: 1, spacingMs: waveSpacingMs(contract.waveIndex) }); } contract.currentWavePlan = { contractId: contract.id, waveIndex: contract.waveIndex, spawnGroups: [...groups.values()] };
    contract.nextSpawnAt = now; contract.nextWaveAt = Number.MAX_SAFE_INTEGER; const operation = this.warOperations.find((entry) => entry.id === this.player.activeOperationId); if (operation) { operation.status = "active"; operation.updatedAt = now; } const sourceName = activeRoutes.length ? contract.spawnpoints.find((entry) => entry.id === activeRoutes[0].spawnpointId)?.name ?? "graveyard" : "graveyard"; this.radio = `Horde ${contract.waveIndex} inbound from ${sourceName}.${contract.waveIndex % 10 === 0 ? " BOSS: ZOMBIE KING — fused horde incoming." : contract.waveIndex % 5 === 0 ? " BOSS: GRAVEBREAKER incoming." : ""}`;
  }

  private spawn(contract: DefenseContract, order: DefenseContract["queue"][number]): void {
    const route = contract.routes.find((entry) => entry.id === order.routeId) ?? contract.routes[0]; const stats = ZOMBIE_INFO[order.zombieType];  const scale = waveHealthScale(contract.waveIndex); const leaveRoadAt = Math.max(2, route.points.length - 3); const rawRoutePoints = order.roadFollowing || route.roadIds.length === 0 ? route.points : [...route.points.slice(0, leaveRoadAt), contract.corePosition];
    const key=contract.id+':'+route.id+':'+order.roadFollowing;
    let routePoints=this.sceneryRoutes.get(key);
    if(!routePoints) { routePoints=this.sceneryRoute(rawRoutePoints); this.sceneryRoutes.set(key,routePoints); }
    const first=routePoints[0];
    this.zombies.push({ id: `zombie-${this.id++}`, contractId: contract.id, territoryId: contract.territoryId, type: order.zombieType, x: first.x, y: first.y, hp: Math.round(stats.hp * scale), maxHp: Math.round(stats.hp * scale), speed: stats.speed, routeIndex: 1, alive: true, reachedCore: false, routeId: route.id, spawnpointId: order.spawnpointId, roadFollowing: order.roadFollowing, routePoints });
  }

  private updateTowers(now: number): void {
    for (const tower of this.towers.filter((entry) => entry.ownerPlayerId === this.playerId && !entry.packed)) {
      if (tower.type === "squadBeacon") continue; const gunnerBonus = Math.min(.12, this.activeSquad(tower.baseId, "gunner").length * .06); const contract = this.contracts.find((entry) => entry.baseId === tower.baseId); const boosted = tower.boostWaveIndex === contract?.waveIndex; const effectiveFireRate = tower.fireRate * (1 + gunnerBonus) * (boosted ? 1.5 : 1); const effectiveDamage = tower.damage * (boosted ? 1.5 : 1);
      if (now - tower.lastFiredAt < 1000 / effectiveFireRate) continue;
      const targets = this.zombies.filter((entry) => Math.hypot(entry.x - tower.x, entry.y - tower.y) <= tower.range).sort((a, b) => b.routeIndex - a.routeIndex); const target = targets[0]; if (!target) continue;
      tower.lastFiredAt = now; tower.shotX = target.x; tower.shotY = target.y;
      if (tower.type === "flame") {
        [...this.zombies].filter((entry) => Math.hypot(entry.x - target.x, entry.y - target.y) <= FLAME_AOE_RADIUS).forEach((entry) => {
          const armorMultiplier = entry.type === "armored" ? 1.3 : 1; const directMultiplier = entry.id === target.id ? 1 : FLAME_SPLASH_DAMAGE_MULTIPLIER;
          this.damage(entry, effectiveDamage * armorMultiplier * directMultiplier);
          if (this.zombies.includes(entry)) this.ignite(entry, now);
        });
        continue;
      }
      const multiplier = target.type === "armored" ? (tower.type === "shock" ? 1.3 : .6) : 1; this.damage(target, effectiveDamage * multiplier);
      if (tower.type === "cannon") targets.slice(1).filter((entry) => Math.hypot(entry.x - target.x, entry.y - target.y) < 115).forEach((entry) => this.damage(entry, effectiveDamage * .5));
      if (tower.type === "shock") targets.slice(1, 3).forEach((entry) => this.damage(entry, effectiveDamage * .55));
    }
  }

  private damage(zombie: InternalZombie, amount: number): void { zombie.hp -= amount; if (zombie.hp > 0) return; const baseId = this.contracts.find((entry) => entry.id === zombie.contractId)?.baseId; const scavengerBonus = Math.min(.2, this.activeSquad(baseId, "scavenger").length * .1); this.player.scrap += Math.round(ZOMBIE_INFO[zombie.type].reward * (1 + scavengerBonus)); this.rollLootDrop(zombie); this.zombies = this.zombies.filter((entry) => entry.id !== zombie.id); }

  private rollLootDrop(zombie: InternalZombie): void {
    const chance = SATCHEL_DROP_CHANCE[zombie.type]; if (Math.random() > chance) return;
    const itemType = LOOT_TABLE[Math.floor(Math.random() * LOOT_TABLE.length)]; const quantity = zombie.type === "brute" ? 2 : 1;
    this.lootSatchels.push({ id: `satchel-${this.id++}`, ownerPlayerId: this.playerId, contractId: zombie.contractId, x: zombie.x, y: zombie.y, itemType, quantity, droppedAt: Date.now() });
  }

  private ignite(zombie: InternalZombie, now: number): void { zombie.burningUntil = Math.max(zombie.burningUntil ?? 0, now + FLAME_BURN_DURATION_MS); zombie.burnDamagePerSecond = Math.max(zombie.burnDamagePerSecond ?? 0, FLAME_BURN_DAMAGE_PER_SECOND); zombie.burnOwnerPlayerId = this.playerId; }

  private moveZombie(zombie: InternalZombie, dt: number, now: number): void {
    if ((zombie.burningUntil ?? 0) > now) { this.damage(zombie, (zombie.burnDamagePerSecond ?? FLAME_BURN_DAMAGE_PER_SECOND) * dt); if (!this.zombies.includes(zombie)) return; }
    else if (zombie.burningUntil) { zombie.burningUntil = undefined; zombie.burnDamagePerSecond = undefined; zombie.burnOwnerPlayerId = undefined; }
    let speedMultiplier = 1; const nearby = this.placedEquipment.filter((entry) => entry.contractId === zombie.contractId && Math.hypot(entry.x - zombie.x, entry.y - zombie.y) <= (entry.type === "roadFlare" ? 260 : 72));
    if (nearby.some((entry) => entry.type === "barbedWire")) { speedMultiplier *= .5; this.damage(zombie, 9 * dt); if (!this.zombies.includes(zombie)) return; }
    if (nearby.some((entry) => entry.type === "roadFlare")) speedMultiplier *= .65;
    const mine = nearby.find((entry) => entry.type === "proximityMine"); if (mine) { this.placedEquipment = this.placedEquipment.filter((entry) => entry.id !== mine.id); for (const victim of [...this.zombies].filter((entry) => entry.contractId === zombie.contractId && Math.hypot(entry.x - mine.x, entry.y - mine.y) <= 135)) this.damage(victim, 165); if (!this.zombies.includes(zombie)) return; }
    const target = zombie.routePoints[zombie.routeIndex]; if (!target) return this.hitCore(zombie);
    const dx = target.x - zombie.x; const dy = target.y - zombie.y; const distance = Math.hypot(dx, dy);
    if (distance < .001) { zombie.routeIndex += 1; if (zombie.routeIndex >= zombie.routePoints.length) this.hitCore(zombie); return; }
    const step = Math.min(distance, zombie.speed * speedMultiplier * dt); const safe=this.sceneryMove(zombie,{x:zombie.x+dx/distance*step,y:zombie.y+dy/distance*step},18); zombie.x=safe.x; zombie.y=safe.y;
  }

  private hitCore(zombie: InternalZombie): void {
    this.zombies = this.zombies.filter((entry) => entry.id !== zombie.id); const contract = this.contracts.find((entry) => entry.id === zombie.contractId); const base = this.bases.find((entry) => entry.id === contract?.baseId); if (!base || Date.now() < base.shieldEndsAt) return;
    base.hp -= ZOMBIE_INFO[zombie.type].damage; base.status = "underAttack"; if (base.hp <= 0) { const operation = this.warOperations.find((entry) => entry.id === base.operationId); const sector = this.warSectors.find((entry) => entry.id === operation?.sectorId); if (operation) { operation.status = "failed"; operation.casualties += 1; operation.updatedAt = Date.now(); } if (sector) { sector.pressure = Math.min(100, sector.pressure + 16); sector.supply = Math.max(0, sector.supply - 8); sector.lastEventText = `${this.player.name}'s core was lost.`; } this.radio = `Command core fell in ${sector?.name ?? "the sector"}. Zombie pressure surged.`; this.pushFeed(this.radio); this.syncSectorState(); this.removeBase(false); }
  }

  private finishWave(contract: DefenseContract, now: number): void {
    const base = this.bases.find((entry) => entry.id === contract.baseId); const scavengerBonus = Math.min(.2, this.activeSquad(base?.id, "scavenger").length * .1); contract.nextWaveAt = now + waveRestMs(contract.waveIndex); this.player.scrap += Math.round((COMBAT_PROGRESSION.waveRewardBase + contract.waveIndex * COMBAT_PROGRESSION.waveRewardPerIndex) * (1 + scavengerBonus)); this.player.signal += 1; const operation = this.warOperations.find((entry) => entry.id === base?.operationId); const sector = this.warSectors.find((entry) => entry.id === operation?.sectorId); const signalBonus = Math.min(.3, this.activeSquad(base?.id, "signal").length * .15); const reduction = Math.round((base?.kind === "reclaim" ? 16 : 5) * (1 + signalBonus) * 10) / 10;
    if (operation) { operation.status = "survived"; operation.wavesSurvived += 1; operation.pressureReduced += reduction; operation.contribution += 5 + contract.waveIndex * 2; operation.updatedAt = now; }
    for (const commander of this.activeSquad(base?.id)) commander.contribution += 3 + contract.waveIndex;
    if (sector) { sector.pressure = Math.max(0, sector.pressure - reduction); sector.supply = Math.min(100, sector.supply + 2); sector.lastEventText = `${this.player.name} survived Horde ${contract.waveIndex}.`; }
    this.radio = `${sector?.name ?? "Sector"} pressure reduced by ${reduction}%. Your operation contributed ${5 + contract.waveIndex * 2} signal.`; this.pushFeed(this.radio); this.syncSectorState();
    this.placedEquipment = this.placedEquipment.filter((entry) => entry.contractId !== contract.id); this.towers.filter((entry) => entry.baseId === contract.baseId).forEach((tower) => { tower.boostWaveIndex = undefined; });
  }

  private removeBase(refund: boolean): void {
    if (!this.player.baseId) return; const baseId = this.player.baseId; const base = this.bases.find((entry) => entry.id === baseId); const owned = this.towers.filter((entry) => entry.baseId === baseId);
    if (refund) this.player.scrap += Math.floor(owned.reduce((sum, tower) => sum + TOWER_INFO[tower.type].cost, 0) * .75);
    const departing = this.squadCommanders.filter((entry) => entry.baseId === baseId && ["joining", "active"].includes(entry.status)); for (const commander of departing) commander.status = "left"; if (departing.length) this.pushFeed(`${departing.map((entry) => entry.name).join(", ")} left the squad as the beacon went offline.`);
    this.towers = this.towers.filter((entry) => entry.baseId !== baseId); const contractIds = this.contracts.filter((entry) => entry.baseId === baseId).map((entry) => entry.id); this.contracts = this.contracts.filter((entry) => entry.baseId !== baseId); this.zombies = this.zombies.filter((entry) => !contractIds.includes(entry.contractId)); this.lootSatchels = this.lootSatchels.filter((entry) => !contractIds.includes(entry.contractId)); this.placedEquipment = this.placedEquipment.filter((entry) => !contractIds.includes(entry.contractId)); this.bases = this.bases.filter((entry) => entry.id !== baseId);
    const target = this.lots.find((entry) => entry.id === base?.lotId); if (target) { target.status = this.territories.find((entry) => entry.id === target.territoryId)?.state === "overrun" ? "overrun" : "empty"; target.ownerPlayerId = undefined; target.pads.forEach((pad) => { pad.occupiedBy = undefined; }); } this.player.baseId = undefined; this.player.activeOperationId = undefined;
  }

  private seedAi(): void {
    ["Mara Voss", "Tin Prophet", "June Wire", "Old Calder", "Patch-9", "Crowbar Saint", "Signal Mae", "Dust Anchor"].forEach((name, index) => this.startAiOperation(name, [0, 2, 3, 5, 6, 8, 10, 11][index]));
  }

  private startPlayerOperation(lot: RoadsideLot, baseId: string, reclaim: boolean, now: number, strategicContext?: StrategicDeploymentContext): WarOperation {
    const sector = strategicContext && strategicContext.planetId !== "colony" ? this.ensureStrategicSector(strategicContext) : this.warSectors.find((entry) => entry.id === (sectorIdForTerritory(lot.territoryId) ?? this.warSectors[0].id))!; const operation: WarOperation = { id: `operation-${this.id++}`, sectorId: sector.id, ownerPlayerId: this.playerId, ownerName: this.player.name, isAI: false, kind: reclaim ? "reclaim" : "defense", status: "staging", startedAt: now, updatedAt: now, lotId: lot.id, baseId, contribution: 0, wavesSurvived: 0, pressureReduced: 0, casualties: 0, visibleMarkerX: strategicContext?.worldX ?? lot.x, visibleMarkerY: strategicContext?.worldY ?? lot.y, visibleLat: strategicContext?.centerLat ?? sector.centerLat, visibleLon: strategicContext?.centerLon ?? sector.centerLon, sharedBaseSlots: 0, squadFilledSlots: 0, joinable: false, squadBeaconBuilt: false }; this.warOperations.push(operation); return operation;
  }

  private ensureStrategicSector(context: StrategicDeploymentContext): WarSector {
    const existing = this.warSectors.find((entry) => entry.id === context.regionId);
    if (existing) { existing.name = context.regionName; existing.regionId = context.regionId; existing.centerLat = context.centerLat; existing.centerLon = context.centerLon; existing.centerX = context.worldX; existing.centerY = context.worldY; return existing; }
    const state = context.state === "safe" ? "secure" : context.state; const pressure = Math.max(10, Math.min(96, context.infestation + context.threatLevel * 4)); const sector: WarSector = { id: context.regionId, name: context.regionName, regionId: context.regionId, centerLat: context.centerLat, centerLon: context.centerLon, centerX: context.worldX, centerY: context.worldY, state, threatLevel: context.threatLevel, pressure, infestation: context.infestation, supply: Math.max(8, 100 - pressure), activeOperationIds: [], aiOperationCount: 0, playerOperationCount: 0, recommended: state === "secure" || state === "contested", isFrontline: state !== "secure", lastEventText: `Roadwatch opened the ${context.regionName} sector net.` }; this.warSectors.push(sector); return sector;
  }

  private closePlayerOperation(status: "evacuated" | "failed", text: string): void { const operation = this.warOperations.find((entry) => entry.id === this.player.activeOperationId); if (!operation) return; operation.status = status; operation.updatedAt = Date.now(); const sector = this.warSectors.find((entry) => entry.id === operation.sectorId); if (sector) sector.lastEventText = text; this.pushFeed(`${this.player.name}: ${text}`); this.syncSectorState(); }

  private startAiOperation(ownerName: string, sectorIndex: number): void {
    const sector = this.warSectors[sectorIndex % this.warSectors.length]; const territory = this.territories.find((entry) => sectorIdForTerritory(entry.id) === sector.id); const now = Date.now(); const joinable = ["Mara Voss", "June Wire"].includes(ownerName); this.warOperations.push({ id: `ai-operation-${this.id++}`, sectorId: sector.id, ownerPlayerId: `ai-${ownerName.toLowerCase().replaceAll(" ", "-")}`, ownerName, isAI: true, kind: sector.state === "overrun" || sector.state === "reclaiming" ? "reclaim" : "defense", status: "active", startedAt: now, updatedAt: now, contribution: 4 + sectorIndex, wavesSurvived: sectorIndex % 4, pressureReduced: sectorIndex % 3, casualties: 0, visibleMarkerX: territory?.labelPoint?.x ?? sector.centerX, visibleMarkerY: territory?.labelPoint?.y ?? sector.centerY, visibleLat: sector.centerLat, visibleLon: sector.centerLon, sharedBaseSlots: joinable ? 2 : 0, squadFilledSlots: joinable ? 1 : 0, joinable, squadBeaconBuilt: joinable });
  }

  private updateSectorWar(dt: number, now: number): void {
    for (const sector of this.warSectors) { const rate = sector.state === "secure" ? .001 : sector.state === "contested" ? .0025 : sector.state === "infested" ? .0045 : .0008; sector.pressure = Math.min(100, sector.pressure + rate * dt); }
    if (now >= this.nextAiResolutionAt) this.resolveAiOperation(now);
    this.syncSectorState(); if (now - this.lastWarPersistAt > 5000) { this.lastWarPersistAt = now; this.persistWarState(); }
  }

  private resolveAiOperation(now: number): void {
    const active = this.warOperations.filter((entry) => entry.isAI && ["active", "survived", "staging"].includes(entry.status)); if (!active.length) return; const operation = active[this.aiResolutionIndex % active.length]; const sector = this.warSectors.find((entry) => entry.id === operation.sectorId)!; const outcome = this.aiResolutionIndex++ % 5; let message = "";
    if (outcome <= 2) { const reduction = 2 + outcome; operation.status = "survived"; operation.wavesSurvived += 1; operation.contribution += 3 + outcome; operation.pressureReduced += reduction; sector.pressure = Math.max(0, sector.pressure - reduction); sector.supply = Math.min(100, sector.supply + 1); message = `${operation.ownerName} survived a horde in ${sector.name}; pressure fell ${reduction}%.`; }
    else { operation.status = outcome === 3 ? "failed" : "evacuated"; operation.casualties += outcome === 3 ? 1 : 0; sector.pressure = Math.min(100, sector.pressure + (outcome === 3 ? 5 : 1)); sector.supply = Math.max(0, sector.supply - (outcome === 3 ? 3 : 1)); message = outcome === 3 ? `${operation.ownerName} lost a core in ${sector.name}.` : `${operation.ownerName} evacuated ${sector.name} before the next horde.`; this.startAiOperation(operation.ownerName, this.aiResolutionIndex + 2); }
    operation.updatedAt = now; sector.lastEventText = message; this.radio = message; this.pushFeed(message); this.nextAiResolutionAt = now + 20000 + this.aiResolutionIndex % 6 * 4300; this.warOperations = this.warOperations.slice(-30);
  }

  private syncSectorState(): void {
    for (const sector of this.warSectors) { const operations = this.warOperations.filter((entry) => entry.sectorId === sector.id && ["staging", "active", "survived"].includes(entry.status)); const reclaiming = operations.some((entry) => entry.kind === "reclaim"); sector.activeOperationIds = operations.map((entry) => entry.id); sector.aiOperationCount = operations.filter((entry) => entry.isAI).length; sector.playerOperationCount = operations.filter((entry) => !entry.isAI).length; sector.state = warStateForPressure(sector.pressure, reclaiming); sector.threatLevel = Math.max(0, Math.min(5, Math.ceil((sector.pressure + sector.infestation) / 40))); sector.isFrontline = ["contested", "infested", "reclaiming"].includes(sector.state); sector.recommended = sector.state === "secure" || sector.state === "contested" && sector.supply >= 55; const territory = this.territories.find((entry) => sectorIdForTerritory(entry.id) === sector.id); if (territory) { territory.pressure = sector.pressure; territory.infestation = sector.infestation; territory.threatLevel = sector.threatLevel; territory.state = territoryStateForWarState(sector.state); } }
  }

  private activeSquad(baseId?: string, role?: SquadRole): SquadCommander[] { if (!baseId) return []; return this.squadCommanders.filter((entry) => entry.baseId === baseId && entry.status === "active" && (!role || entry.role === role)); }
  private effectiveTowerCost(baseId: string, type: TowerType): number { if (type === "squadBeacon") return TOWER_INFO[type].cost; const discount = Math.min(.16, this.activeSquad(baseId, "builder").length * .08); return Math.ceil(TOWER_INFO[type].cost * (1 - discount)); }
  private updateSquadSupport(dt: number, now: number): void {
    const base = this.bases.find((entry) => entry.id === this.player.baseId); if (!base) return; const repairers = this.activeSquad(base.id, "repair"); const threatened = this.zombies.some((entry) => Math.hypot(entry.x - base.coreX, entry.y - base.coreY) < 440);
    if (repairers.length && !threatened && base.hp < base.maxHp) { const before = base.hp; base.hp = Math.min(base.maxHp, base.hp + Math.min(6, repairers.length * 3) * dt); const repaired = base.hp - before; for (const commander of repairers) commander.contribution += repaired / 12; }
    if (now >= this.nextSquadContributionAt) { for (const commander of this.activeSquad(base.id)) commander.contribution += 1; this.nextSquadContributionAt = now + 5000; }
  }
  private syncOperationSquad(base: BaseState): void { const operation = this.warOperations.find((entry) => entry.id === base.operationId); if (!operation) return; operation.sharedBaseSlots = base.squadSlots?.length ?? 0; operation.squadFilledSlots = base.squadSlots?.filter((entry) => ["ai_joined", "player_joined"].includes(entry.status)).length ?? 0; operation.joinable = Boolean(base.joinable && operation.sharedBaseSlots > 0); operation.squadBeaconBuilt = (base.squadBeaconLevel ?? 0) > 0; operation.updatedAt = Date.now(); }

  private pushFeed(message: string): void { this.activityFeed = [message, ...this.activityFeed.filter((entry) => entry !== message)].slice(0, 6); }
  private restoreWarState(): void { try { const stored = JSON.parse(sessionStorage.getItem("deadroad-sector-war-v1") ?? "[]") as Array<Pick<WarSector, "id" | "pressure" | "infestation" | "supply">>; for (const saved of stored) { const sector = this.warSectors.find((entry) => entry.id === saved.id); if (sector) { sector.pressure = saved.pressure; sector.infestation = saved.infestation; sector.supply = saved.supply; } } } catch { /* Browser session storage is optional. */ } }
  private persistWarState(): void { try { sessionStorage.setItem("deadroad-sector-war-v1", JSON.stringify(this.warSectors.map(({ id, pressure, infestation, supply }) => ({ id, pressure, infestation, supply })))); } catch { /* Browser session storage is optional. */ } }
  private emit(): void { this.snapshotListener({ serverTime: Date.now(), localPlayerId: this.playerId, players: [this.player], territories: this.territories, lots: this.lots, bases: this.bases, towers: this.towers, zombies: this.zombies.map(({ routePoints: _route, ...entry }) => entry), contracts: this.contracts, warSectors: this.warSectors, warOperations: this.warOperations, squadCommanders: this.squadCommanders, activityFeed: this.activityFeed, radio: this.radio, lootSatchels: this.lootSatchels, placedEquipment: this.placedEquipment }); }
  private notice(text: string, error = false): void { this.noticeListener({ text, error }); }
}
