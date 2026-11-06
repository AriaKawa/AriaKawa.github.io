import { routeFromCore, ROUTE_ROLLOUT_MS } from '../game/RouteRollout';
import { threatColor } from '../game/ThreatField';
import { ProgressionUI, type DeploymentPreview } from '../ui/ProgressionUI';
import { paintThreatField, threatAt } from '../game/ThreatField';
import { planetOneAuthoredRoads } from "../game/roadEditor/PlanetOneRoadNetwork";
import { RoadMaterialLibrary } from "../game/roadEditor/RoadMaterialLibrary";
import { buildZombieFrames } from "../game/ZombieRig";
import { ZOMBIE_ROSTER } from "../../../server/src/sim/zombieRoster";
import { SceneryWorld } from "../game/SceneryWorld";
import { PlanetOneTexturedRoads } from "../game/PlanetOneTexturedRoads";
import { ExpeditionScenery } from "../game/ExpeditionScenery";
import Phaser from "phaser";
import { BATTLE_WORLD_SCALE, CAMERA_MAX_ZOOM, CAMERA_PAN_SPEED, THEATER_MIN_ZOOM } from "../game/camera";
import { TACTICAL_MAP_SCALE, TACTICAL_ROUTE_OVERVIEW_STYLE, THEATER_HEIGHT, THEATER_WIDTH, theaterLatLon, theaterPoint, theaterZoomBand, theaterZoomLabel, type TacticalZoomBand } from "../game/AmericasTheater";
import { routeForLot } from "../game/continentData";
import { CONVOY_ROAD_SPEED, assessDeployment } from "../game/convoyDeployment";
import { drawUsaRoadLod } from "../game/RoadLodRenderer";
import { normalGameplayHighways } from "../game/HighwayOnlyRoadPolicy";
import { paintUsaBiomeTerrain } from "../game/TerrainBiomeRenderer";
import { resolveUsaTerrainBiome } from "../game/TerrainBiomeResolver";
import { paintTerrainSurfaceDetail, type TerrainSurfaceLod } from "../game/TerrainSurfaceDetail";
import { drawUsaTerrainLod } from "../game/TerrainLodRenderer";
import { TACTICAL_HIGHWAY_DEPTH, TACTICAL_NATIONAL_COASTLINE_DEPTH, TACTICAL_STATE_BORDER_ALPHA, TACTICAL_STATE_BORDER_COLOR, TACTICAL_STATE_BORDER_DEPTH, TACTICAL_STATE_BORDER_WIDTH_PX, TACTICAL_TERRITORY_FILL_DEPTH, usStateBoundaryData } from "../map/UsStateBoundaries";
import { duplicateMajorHighwayRenderSegmentCount, uniqueMajorHighwayRenderSegments } from "../map/MajorHighwayRenderGeometry";
import type { BattleMapSeed, GlobeWorld } from "../globe/GlobeData";
import { createEarthGlobeWorld } from "../globe/EarthGlobeData";
import { MISSOURI_PLANET_ID } from "../game/planet2/MissouriRoadData";
import { createMissouriTileWorld } from "../game/planet2/MissouriTileData";
import { isMissouriHighwayLocation, missouriTileDetailAlpha, MISSOURI_ONE_WAY_SEGMENTS, MISSOURI_TILE_ASSETS, MISSOURI_TILE_BOUNDS, MISSOURI_TILE_COLUMNS, MISSOURI_TILE_GROUND_ASSET, MISSOURI_TILE_MAP, MISSOURI_TILE_ROWS } from "../game/planet2/MissouriTileKit";
import { earthTerritories, earthTerritoryAt, earthTerritoryBoundaryRings, type EarthTerritory } from "../globe/EarthTerritories";
import { SQUAD_ROLE_INFO, TOWER_INFO } from "../game/constants";
import { BASE_DISPLAY_HEIGHT, BASE_DISPLAY_WIDTH, BASE_EFFECT_DEPTH, BASE_SPRITE_DEPTH, BASE_VISUAL_ASSETS, DESTROYED_BASE_WRECK_SECONDS, baseFacingAngle, baseLocalPoint, baseVisualState } from "../game/BaseVisuals";
import { BLOOD_DECAL_ASSETS, BLOOD_DECAL_DEPTH, BLOOD_DECAL_FADE_SECONDS, ENABLE_GORE, MAX_BLOOD_DECALS, PROJECTILE_EFFECT_DEPTH, ZOMBIE_HUD_DEPTH, ZOMBIE_SPRITE_DEPTH, ZOMBIE_VISUALS, advanceZombieVisual, bloodDecalSpecForZombie, initialZombieVisual, isZombieBurning, type ZombieVisualState } from "../game/ZombieVisuals";
import { TurretRenderer } from "../game/TurretRenderer";
import { TURRET_VISUAL_ASSETS, TURRET_VISUAL_ASSET_LIST, turretVisualConfigForTower } from "../game/TurretVisualConfig";
import { TERRAIN_TILESET_ASSETS, type TerrainTileName } from "../game/TilesetManifest";
import { sectorIdForTerritory } from "../game/sectorWar";
import { EQUIPMENT_INFO, EQUIPMENT_TYPES, equipmentTextureKey } from "../game/Equipment";
import type { BaseState, DefenseContract, EquipmentType, RoadsideLot, Snapshot, Territory, TerritoryStateName, TowerState, TowerType, Vec2, WorldStatic, ZombieState } from "../game/types";
import type { GameClient } from "../net/GameClient";
import { silenceConvoyEngineAudio, updateConvoyEngineAudio } from "../audio/ConvoyEngineAudio";
import { playBloodSplat, playTowerShot, primeCombatAudio, resetCombatAudioState } from "../audio/CombatAudio";
import { playFieldGearRummage } from "../audio/UiAudio";
import { PLANET_ONE_TERRAIN_COLORS, PLANET_ONE_US_COASTLINES, PLANET_ONE_US_STATE_BORDERS, planetOneTacticalLandmasses } from "../game/PlanetOneMapGeometry";

const STATE_COLORS: Record<TerritoryStateName, number> = { safe: 0x72c7a1, contested: 0xe2bd65, infested: 0xe97845, overrun: 0xa62f38, reclaiming: 0x61d7db };
const ZOMBIE_COLORS = Object.fromEntries(Object.entries(ZOMBIE_ROSTER).map(([type, def]) => [type, parseInt(def.skin.slice(1), 16)])) as Record<ZombieState["type"], number>;

const towerCardArt = (type: TowerType): string => {
  const previewTower: TowerState = { id: `preview-${type}`, ownerPlayerId: "preview", baseId: "preview", padId: "preview", type, x: 0, y: 0, level: 1, range: 0, damage: 0, fireRate: 0, lastFiredAt: 0 };
  const config = turretVisualConfigForTower(previewTower);
  const image = (url: string, className: string) => `<img class="${className}" src="${url}" alt="" draggable="false">`;
  const headParts = [
    image(TURRET_VISUAL_ASSETS.bodies[config.body].url, "tower-card-body"),
    config.centerWeapon ? image(TURRET_VISUAL_ASSETS.weapons[config.centerWeapon].url, "tower-card-weapon") : "",
    config.weaponLeft ? image(TURRET_VISUAL_ASSETS.weapons[config.weaponLeft].url, "tower-card-weapon tower-card-weapon-left") : "",
    config.weaponRight ? image(TURRET_VISUAL_ASSETS.weapons[config.weaponRight].url, "tower-card-weapon tower-card-weapon-right") : "",
    config.ammoModule ? image(TURRET_VISUAL_ASSETS.ammoModules[config.ammoModule].url, "tower-card-module tower-card-ammo") : "",
    config.supportModule ? image(TURRET_VISUAL_ASSETS.supportModules[config.supportModule].url, "tower-card-module tower-card-support") : ""
  ].join("");
  return `<span class="tower-card-art tower-card-art-${type}" aria-hidden="true">${image(TURRET_VISUAL_ASSETS.chassis[config.chassis].url, "tower-card-chassis")}<span class="tower-card-head">${headParts}</span></span>`;
};

const territoryShapeCache = new Map<string, Vec2[][]>();
const tacticalTerritoryShapes = (territory: EarthTerritory) => { const cached = territoryShapeCache.get(territory.id); if (cached) return cached; const shapes = earthTerritoryBoundaryRings(territory).map((ring) => ring.map(([lon, lat]) => theaterPoint(lat, lon))); territoryShapeCache.set(territory.id, shapes); return shapes; };
type SurfaceChunk = { image: Phaser.GameObjects.Image; textureKey: string; lastUsed: number };
type BloodDecal = { image: Phaser.GameObjects.Image; bornAt: number; alpha: number; worldX: number; worldY: number };
type BaseWreck = { baseId: string; image: Phaser.GameObjects.Image; bornAt: number; worldX: number; worldY: number; angle: number; scale: number };
type HitMarker = { image: Phaser.GameObjects.Image; worldX: number; worldY: number; bornAt: number; lethal: boolean };
type SpawnerMarker = { image: Phaser.GameObjects.Image; bornAt: number };
type HudPanel = "none" | "build" | "gear" | "sector" | "contract" | "squad" | "activity" | "help";

export class WorldScene extends Phaser.Scene {
  private network!: GameClient;
  private world?: WorldStatic;
  private snapshot?: Snapshot;
  private oceanBaseGraphics!: Phaser.GameObjects.Graphics;
  private staticGraphics!: Phaser.GameObjects.Graphics;
  private surfaceChunks = new Map<string, SurfaceChunk>();
  private surfacePatternCache = new Map<CanvasImageSource, Map<number, HTMLCanvasElement>>();
  private surfaceUseCounter = 0;
  private lastSurfaceSignature = "";
  private surfaceCameraSignature = "";
  private surfaceCameraChangedAt = 0;
  private terrainDetailGraphics!: Phaser.GameObjects.Graphics;
  private territoryOverlayGraphics!: Phaser.GameObjects.Graphics;
  private nationalCoastlineGraphics!: Phaser.GameObjects.Graphics;
  private stateBorderGraphics!: Phaser.GameObjects.Graphics;
  private planetOneTexturedRoads?: PlanetOneTexturedRoads;
  private overviewRoadGraphics!: Phaser.GameObjects.Graphics;
  private secondaryGraphics!: Phaser.GameObjects.Graphics;
  private localGraphics!: Phaser.GameObjects.Graphics;
  private dynamicGraphics!: Phaser.GameObjects.Graphics;
  private baseEffectGraphics!: Phaser.GameObjects.Graphics;
  private zombieHudGraphics!: Phaser.GameObjects.Graphics;
  private projectileEffectGraphics!: Phaser.GameObjects.Graphics;
  private turretRenderer!: TurretRenderer;
  private battleMaskSource?: Phaser.GameObjects.Graphics;
  private battleMask?: Phaser.Display.Masks.GeometryMask;
  private theaterLandMaskSource?: Phaser.GameObjects.Graphics;
  private theaterLandMask?: Phaser.Display.Masks.GeometryMask;
  private usaTerrainMaskSource?: Phaser.GameObjects.Graphics;
  private usaTerrainMask?: Phaser.Display.Masks.GeometryMask;
  private labels: Phaser.GameObjects.Text[] = [];
  private territoryLabels: Phaser.GameObjects.Text[] = [];
  private townLabels: Phaser.GameObjects.Text[] = [];
  private roadLabels: Phaser.GameObjects.Text[] = [];
  private debugLabels: Phaser.GameObjects.Text[] = [];
  private selectedLotId?: string;
  private hoveredLotId?: string;
  private lotSelectionMode = false;
  private debugMode = false;
  private selectedTower: TowerType = "rifle";
  private selectedEquipment?: EquipmentType;
  private hoveredTowerId?: string;
  private drag?: { x: number; y: number; scrollX: number; scrollY: number; moved: boolean };
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private renderedZombies = new Map<string, ZombieVisualState>();
  private zombieSprites = new Map<string, Phaser.GameObjects.Image>();
  private zombieCinderSprites = new Map<string, Phaser.GameObjects.Image>();
  private fieldEquipmentSprites = new Map<string, Phaser.GameObjects.Image>();
  private bloodDecals: BloodDecal[] = [];
  private baseSprites = new Map<string, Phaser.GameObjects.Image>();
  private baseWrecks: BaseWreck[] = [];
  private mapOpen = false;
  private buildOpen = false;
  private activePanel: HudPanel = "none";
  private activityUnread = 0;
  private lastFeedCount = 0;
  private lastCoreId?: string;
  private lastCoreHp?: number;
  private battleSeed?: BattleMapSeed;
  private theaterWorld?: GlobeWorld;
  private zoomBand: TacticalZoomBand = "base";
  private focusedDeployedBase = false;
  private followVehicle = true;
  private networkCleanup: Array<() => void> = [];
  private lastFeedSignature = "";
  private lastSquadSignature = "";
  private lastBaseWorldSignature = "";
  private lastCameraBoundsSignature = "";
  private lastLodSignature = "";
  private lastTerritoryBorderSignature = "";
  private lastViewedTerritoryId = "";
  private worldRevealed = false;
  private frameSamples: number[] = [];
  private lastFrameMetricAt = 0;
  private visibleHighwayLines?: Vec2[][];
  private missouriTileLayer?: Phaser.GameObjects.Container;
  private missouriTileMaskSource?: Phaser.GameObjects.Graphics;
  private missouriTileMask?: Phaser.Display.Masks.GeometryMask;
  private hitMarkers: HitMarker[] = [];
  private lastAudibleShotAt = new Map<string, number>();
  private spawnerMarkers = new Map<string, SpawnerMarker>();
  private lastEquipmentCounts = new Map<EquipmentType, number>();
  private equipmentCountsInitialized = false;

  constructor() { super("WorldScene"); }

  private isMissouriPlanet(): boolean { return this.battleSeed?.planetId === MISSOURI_PLANET_ID; }
  private isMissouriTilePlanet(): boolean { return this.isMissouriPlanet(); }
  private activePlanetId(): "earth" | typeof MISSOURI_PLANET_ID { return this.isMissouriPlanet() ? MISSOURI_PLANET_ID : "earth"; }

  private expeditionScenery?: ExpeditionScenery;
  private sceneryWorld?: SceneryWorld;
  private sceneryRoads: Vec2[][] = [];
  private sceneryLand = planetOneTacticalLandmasses();
  preload(): void {
    this.load.image("expedition-scenery", "./assets/expedition-atlas.png");
    const loading = document.querySelector<HTMLElement>("#deployment-loading"); const status = document.querySelector<HTMLElement>("#deployment-loading-status"); const bar = document.querySelector<HTMLElement>("#deployment-loading-bar");
    if (loading) loading.hidden = false;
    this.load.on("progress", (progress: number) => { if (bar) bar.style.width = `${Math.round(progress * 100)}%`; if (status) status.textContent = `LOADING TERRAIN ASSETS // ${Math.round(progress * 100)}%`; });
    this.load.on("fileprogress", (file: Phaser.Loader.File) => { if (status) status.textContent = `LOADING // ${String(file.key).replaceAll("-", " ").toUpperCase()}`; });
    this.load.once("complete", () => { if (bar) bar.style.width = "100%"; if (status) status.textContent = "BUILDING AMERICAS THEATER // CONNECTING TERRITORIES"; });
    this.load.image("temperate-ground-v1", "./assets/terrain/temperate-ground-v1.png");
    this.load.image("temperate-ground-detail-v2", "./assets/terrain/temperate-ground-detail-v2.png");
    this.load.image("desert-scrub-v1", "./assets/generated/terrain/desert-scrub-v1.png");
    this.load.image("forest-floor-v1", "./assets/generated/terrain/forest-floor-v1.png");
    this.load.image("deep-ocean-v1", "./assets/ocean/deep-ocean-v1.png");
    this.load.image("highway-clean-v1", "./assets/roads/highway-clean-v1.png");
    this.load.image("highway-damaged-v1", "./assets/roads/highway-damaged-v1.png");
    this.load.image(MISSOURI_TILE_GROUND_ASSET.key, MISSOURI_TILE_GROUND_ASSET.url);
    for (const asset of MISSOURI_TILE_ASSETS) this.load.image(asset.key, asset.url);
    for (const asset of TERRAIN_TILESET_ASSETS) this.load.image(asset.key, asset.url);
    for (const asset of Object.values(BASE_VISUAL_ASSETS)) this.load.image(asset.textureKey, asset.url);
    for (const visual of Object.values(ZOMBIE_VISUALS)) this.load.image(visual.textureKey, visual.url);
    for (const decal of BLOOD_DECAL_ASSETS) this.load.image(decal.textureKey, decal.url);
    for (const asset of TURRET_VISUAL_ASSET_LIST) this.load.image(asset.textureKey, asset.url);
    this.load.spritesheet("flamethrower-stream-cc0", "./assets/effects/flamethrower-stream.png", { frameWidth: 24, frameHeight: 62 });
    this.load.spritesheet("spark-cinders-cc0", "./assets/effects/spark-cinders-cc0.png", { frameWidth: 32, frameHeight: 32 });
    this.load.image("loot-satchel", "./assets/loot/satchel.png");
    for (const type of EQUIPMENT_TYPES) this.load.image(equipmentTextureKey(type), EQUIPMENT_INFO[type].asset);
    this.load.image("zombie-spawn-gravestone", "./assets/generated/zombie_spawn_gravestone.png");
  }

  private progressionUI?: ProgressionUI;
  private threatImage?: Phaser.GameObjects.Image;
  private threatSignature = "";
  create(): void {
    buildZombieFrames(this);
    this.focusedDeployedBase = false; this.theaterWorld = undefined; this.missouriTileLayer = undefined; this.zoomBand = "base"; this.lastBaseWorldSignature = ""; this.lastCameraBoundsSignature = ""; this.lastLodSignature = ""; this.lastViewedTerritoryId = ""; this.lastFeedSignature = ""; this.lastSquadSignature = ""; this.lastSurfaceSignature = ""; this.worldRevealed = false; this.surfacePatternCache.clear();
    this.mapOpen = false; this.buildOpen = false; this.activePanel = "none"; this.selectedEquipment = undefined; this.activityUnread = 0; this.lastFeedCount = 0; this.lastCoreId = undefined; this.lastCoreHp = undefined; this.selectedLotId = undefined; this.hoveredLotId = undefined; this.hoveredTowerId = undefined; this.lotSelectionMode = false; this.followVehicle = true; this.renderedZombies.clear(); this.zombieSprites.clear(); this.zombieCinderSprites.forEach((sprite) => sprite.destroy()); this.zombieCinderSprites.clear(); this.fieldEquipmentSprites.forEach((sprite) => sprite.destroy()); this.fieldEquipmentSprites.clear(); this.bloodDecals = []; this.baseSprites.clear(); this.baseWrecks = []; this.hitMarkers = []; this.lastAudibleShotAt.clear(); this.spawnerMarkers.clear(); this.lastEquipmentCounts.clear(); this.equipmentCountsInitialized = false; resetCombatAudioState();
    this.network = this.registry.get("network") as GameClient;
    this.battleSeed = this.registry.get("battleSeed") as BattleMapSeed | undefined;
    const entry = this.entryWorldPoint(); this.cameras.main.setBounds(0, 0, THEATER_WIDTH * BATTLE_WORLD_SCALE, THEATER_HEIGHT * BATTLE_WORLD_SCALE).setZoom(.88 / BATTLE_WORLD_SCALE).centerOn(entry.x * BATTLE_WORLD_SCALE, entry.y * BATTLE_WORLD_SCALE);
    this.oceanBaseGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(-.2);
    this.staticGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(0);
    this.terrainDetailGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(.2); this.territoryOverlayGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(TACTICAL_TERRITORY_FILL_DEPTH); this.nationalCoastlineGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(TACTICAL_NATIONAL_COASTLINE_DEPTH); this.stateBorderGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(TACTICAL_STATE_BORDER_DEPTH); this.overviewRoadGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(TACTICAL_HIGHWAY_DEPTH); this.secondaryGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(.6); this.localGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(.7); this.dynamicGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(1); this.baseEffectGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(BASE_EFFECT_DEPTH); this.zombieHudGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(ZOMBIE_HUD_DEPTH); this.projectileEffectGraphics = this.add.graphics().setScale(BATTLE_WORLD_SCALE).setDepth(PROJECTILE_EFFECT_DEPTH);
    this.turretRenderer = new TurretRenderer(this);
    this.game.canvas.dataset.tacticalStateBorderLayer = "census-shared-unmasked"; this.game.canvas.dataset.tacticalStateBorderLines = String(usStateBoundaryData.internalBorderLines.length); this.game.canvas.dataset.tacticalNationalCoastlineLines = String(usStateBoundaryData.coastlineLines.length); this.game.canvas.dataset.tacticalStateBorderSource = "us-census-2025-20m"; this.game.canvas.dataset.tacticalCountrySeam = "usa-mexico-shared-natural-earth"; this.game.canvas.dataset.zombieVisualSystem = "ai-generated-textured-gait"; this.game.canvas.dataset.zombieBurnEffect = "opengameart-cc0-spark-cinders"; this.game.canvas.dataset.goreEnabled = String(ENABLE_GORE); this.game.canvas.dataset.combatFeedback = "continuous-flame-audio-textured-flame-vfx-blood-splat-spark-cinders"; this.game.canvas.dataset.hordeRoutePolicy = "generated-dirt-path-with-gravestone-spawner"; this.game.canvas.dataset.turretRangePolicy = "hover-only"; this.game.canvas.dataset.baseVisualSystem = "mobile-command-core-generated-png"; this.game.canvas.dataset.baseVisualAssets = String(Object.keys(BASE_VISUAL_ASSETS).length); this.game.canvas.dataset.turretVisualSystem = "modular-layered-png-v1"; this.game.canvas.dataset.turretVisualAssets = String(TURRET_VISUAL_ASSET_LIST.length); this.game.canvas.dataset.turretVisualLayers = "chassis,body,weapons,ammo,support,effects"; this.game.canvas.dataset.terrainBiomeSystem = "generated-png-tileset-v1"; this.game.canvas.dataset.terrainBiomeCount = "8"; this.game.canvas.dataset.terrainTilesetAssets = String(TERRAIN_TILESET_ASSETS.length); this.game.canvas.dataset.planetId = this.battleSeed?.planetId ?? "earth"; this.game.canvas.dataset.planet2RoadSource = this.isMissouriPlanet() ? "connected-statewide-tile-network" : "inactive";
    this.createTheaterLandMask();
    this.networkCleanup.push(this.network.on("world", (world) => { this.world = world; this.ensureTheaterWorld(); this.revealWorldWhenReady(); }));
    this.networkCleanup.push(this.network.on("snapshot", (snapshot) => { const previous = this.snapshot; const recovered = this.detectRecoveredEquipment(snapshot); this.captureCombatFeedback(previous, snapshot); this.snapshot = snapshot; const threatSignature = snapshot.warSectors.filter(s => s.regionId).map(s => `${s.regionId}:${Math.round(s.pressure)}`).join("|"); if (threatSignature !== this.threatSignature) { this.threatSignature = threatSignature; this.threatImage?.destroy(); this.threatImage = undefined; this.textures.remove("threat-field"); } this.setText("ai-convoy-count", String(snapshot.players.length - 1)); this.ensureTheaterWorld(); this.captureDestroyedBases(previous, snapshot); const base = this.localBase(); const signature = `${base?.id ?? "none"}:${base?.worldX ?? "x"}:${base?.worldY ?? "y"}`; if (this.theaterWorld && (signature !== this.lastBaseWorldSignature || !this.threatImage)) { this.lastBaseWorldSignature = signature; this.drawWorld(); } this.refreshHud(); recovered.forEach((type) => this.flashRecoveredEquipment(type)); this.refreshZoomUi(); this.revealWorldWhenReady(); }));
    this.networkCleanup.push(this.network.on("notice", (notice) => this.showNotice(notice.text, Boolean(notice.error))));
    this.networkCleanup.push(this.network.on("leave", () => this.showNotice("Roadwatch link lost. Refresh to reconnect.", true)));
    if (this.network.latestWorld) this.world = this.network.latestWorld;
    if (this.network.latestSnapshot) this.snapshot = this.network.latestSnapshot;
    this.ensureTheaterWorld(); if (this.snapshot) this.refreshHud(); this.revealWorldWhenReady();
    this.expeditionScenery = new ExpeditionScenery(this);

    this.setupInputs(); this.setupUi(); this.progressionUI = new ProgressionUI(this.network, preview => this.captureDeploymentMap(preview)); this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => { this.progressionUI?.destroy(); this.threatImage?.destroy(); this.threatImage = undefined; this.textures.remove("threat-field"); this.networkCleanup.forEach((off) => off()); this.networkCleanup = []; this.battleMask?.destroy(); this.battleMaskSource?.destroy(); this.theaterLandMask?.destroy(); this.theaterLandMaskSource?.destroy(); this.usaTerrainMask?.destroy(); this.usaTerrainMaskSource?.destroy(); this.missouriTileMask?.destroy(); this.missouriTileMaskSource?.destroy(); this.turretRenderer.destroy(); this.destroySurfaceChunks(); this.planetOneTexturedRoads?.destroy(); this.planetOneTexturedRoads = undefined; this.expeditionScenery?.destroy(); this.dirtPathImages.forEach(p=>{p.image.destroy();this.textures.remove(p.key);}); this.dirtPathImages.clear(); silenceConvoyEngineAudio(); });
  }

  private revealWorldWhenReady(): void {
    if (this.worldRevealed) return; const loading = document.querySelector<HTMLElement>("#deployment-loading"); const status = document.querySelector<HTMLElement>("#deployment-loading-status");
    if (!this.theaterWorld || !this.snapshot || !this.textures.exists("temperate-ground-v1") || !this.textures.exists("temperate-ground-detail-v2") || !this.textures.exists("desert-scrub-v1") || !this.textures.exists("forest-floor-v1") || !this.textures.exists("deep-ocean-v1")) { if (status) status.textContent = "SYNCHRONIZING ROADWATCH DATA"; this.time.delayedCall(50, () => this.revealWorldWhenReady()); return; }
    if (status) status.textContent = "BAKING TERRAIN SURFACE // CONNECTING LANDMASS"; this.refreshSurfaceTexture(this.cameras.main, this.effectiveZoom());
    this.worldRevealed = true; if (status) status.textContent = "THEATER READY // OPENING COMMAND VIEW";
    window.setTimeout(() => { document.querySelector<HTMLElement>("#globe-deploy")!.hidden = true; document.querySelector<HTMLElement>("#hud")!.hidden = false; this.game.canvas.style.opacity = "1"; loading?.classList.add("complete"); window.setTimeout(() => { if (loading) { loading.hidden = true; loading.classList.remove("complete"); loading.setAttribute("aria-busy", "false"); } }, 280); }, 90);
  }

  private applyBattlefieldMask(): void {
    const outline = this.battleSeed?.territoryOutline; if (!outline?.length) return; this.battleMaskSource = this.make.graphics({}, false).setScale(BATTLE_WORLD_SCALE); this.battleMaskSource.fillStyle(0xffffff, 1).fillPoints(outline, true); this.battleMask = this.battleMaskSource.createGeometryMask(); this.staticGraphics.setMask(this.battleMask); this.dynamicGraphics.setMask(this.battleMask);
  }

  private createTheaterLandMask(): void {
    this.theaterLandMaskSource = this.make.graphics({}, false).setScale(BATTLE_WORLD_SCALE); this.theaterLandMaskSource.fillStyle(0xffffff, 1);
    for (const mass of planetOneTacticalLandmasses()) this.theaterLandMaskSource.fillPoints(mass.points, true);
    this.theaterLandMask = this.theaterLandMaskSource.createGeometryMask(); this.territoryOverlayGraphics.setMask(this.theaterLandMask);
    this.usaTerrainMaskSource = this.make.graphics({}, false).setScale(BATTLE_WORLD_SCALE).fillStyle(0xffffff, 1); for (const mass of planetOneTacticalLandmasses().filter((entry) => entry.group === "usa")) this.usaTerrainMaskSource.fillPoints(mass.points, true);
    this.usaTerrainMask = this.usaTerrainMaskSource.createGeometryMask(); this.terrainDetailGraphics.setMask(this.usaTerrainMask);
  }

  update(_time: number, deltaMs: number): void {
    const dt = Math.min(deltaMs / 1000, 0.05); const camera = this.cameras.main;
    const view = camera.worldView;
    this.network.setAiViewport({ left: view.left / BATTLE_WORLD_SCALE - 3000, top: view.top / BATTLE_WORLD_SCALE - 3000, right: view.right / BATTLE_WORLD_SCALE + 3000, bottom: view.bottom / BATTLE_WORLD_SCALE + 3000, detail: ['base', 'local'].includes(this.zoomBand) });
    if (import.meta.env.DEV) { this.frameSamples.push(deltaMs); if (this.frameSamples.length > 180) this.frameSamples.shift(); this.game.canvas.dataset.aiWorkerMs = (this.network.getAiMetrics()?.workerMs ?? 0).toFixed(1); this.game.canvas.dataset.effectiveZoom = this.effectiveZoom().toFixed(4); this.game.canvas.dataset.worldView = `${camera.worldView.width.toFixed(0)}x${camera.worldView.height.toFixed(0)}`; if (_time - this.lastFrameMetricAt > 1000 && this.frameSamples.length >= 30) { this.lastFrameMetricAt = _time; const ordered = [...this.frameSamples].sort((a, b) => a - b); const average = ordered.reduce((sum, value) => sum + value, 0) / ordered.length; this.game.canvas.dataset.gameFps = (1000 / average).toFixed(1); this.game.canvas.dataset.frameP95 = ordered[Math.floor(ordered.length * .95)].toFixed(1); } }
    this.syncCameraBounds(camera);
    if (!this.capturingDeploymentMap && !document.querySelector(".progression-dialog[open]")) {
    let dx = 0; let dy = 0; const driving = this.localBase()?.status === "packed";
    if (this.keys.left.isDown || (!driving && this.keys.a.isDown)) dx -= 1;
    if (this.keys.right.isDown || (!driving && this.keys.d.isDown)) dx += 1;
    if (this.keys.up.isDown || (!driving && this.keys.w.isDown)) dy -= 1;
    if (this.keys.down.isDown || (!driving && this.keys.s.isDown)) dy += 1;
    if (dx || dy) { this.followVehicle = false; const length = Math.hypot(dx, dy); camera.scrollX += dx / length * CAMERA_PAN_SPEED * dt / camera.zoom; camera.scrollY += dy / length * CAMERA_PAN_SPEED * dt / camera.zoom; }
    if (driving) { let steering = 0; let throttle = 0; if (this.keys.a.isDown) steering -= 1; if (this.keys.d.isDown) steering += 1; if (this.keys.w.isDown) throttle += 1; if (this.keys.s.isDown) throttle -= 1; const base = this.localBase(); const onHighway = base ? this.convoyOnVisibleHighway(this.baseWorldPoint(base)) : false; this.network.driveBase(steering, throttle, deltaMs, onHighway); this.game.canvas.dataset.convoySurface = onHighway ? "highway" : "terrain"; const coasting = Math.abs(base?.driveSpeed ?? 0) > .2; if (base && (throttle || coasting) && this.followVehicle && ["base", "local"].includes(this.zoomBand)) { const point = this.baseWorldPoint(base); camera.centerOn(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE); } }
    }
    const engineBase = this.localBase(); const enginePoint = engineBase ? this.baseWorldPoint(engineBase) : undefined; updateConvoyEngineAudio(engineBase?.status === "packed", Math.abs(engineBase?.driveSpeed ?? 0) / CONVOY_ROAD_SPEED, dt, enginePoint ? this.spatialAudioGainAtWorldPoint(enginePoint.x, enginePoint.y) : 0);
    const zoom = this.effectiveZoom(); const nextBand = theaterZoomBand(zoom); if (nextBand !== this.zoomBand) { this.zoomBand = nextBand; this.refreshZoomUi(); }
    this.refreshViewedTerritory(camera);
    this.refreshTerritoryBorders(zoom); this.refreshUsaLod(camera, zoom); this.overviewRoadGraphics.setVisible(true); this.secondaryGraphics.setVisible(true); this.localGraphics.setVisible(true); this.refreshSurfaceTexture(camera, zoom);
    if (this.sceneryWorld) this.expeditionScenery?.update(zoom, this.sceneryWorld);
    if (this.missouriTileLayer) { const detailAlpha = missouriTileDetailAlpha(zoom / .105); this.missouriTileLayer.setAlpha(detailAlpha).setVisible(detailAlpha > .01); this.game.canvas.dataset.missouriTileDetailAlpha = detailAlpha.toFixed(3); }
    const territoryScale = Phaser.Math.Clamp(.008 / zoom, .075, 2.2); const detailScale = Phaser.Math.Clamp(.16 / zoom, .16, 1.4);
    this.territoryLabels.forEach((label) => { const group = label.getData("group") as string | undefined; const continentOnly = Boolean(label.getData("continentOnly")); const bandVisible = this.zoomBand === "country" ? continentOnly || !["usa", "canada"].includes(group ?? "") : !continentOnly; label.setVisible(!["base", "local"].includes(this.zoomBand) && bandVisible && this.labelInView(label, 8000)).setScale(territoryScale).setAlpha(this.zoomBand === "country" ? .88 : .62); });
    this.townLabels.forEach((label) => label.setVisible(["base", "local", "city"].includes(this.zoomBand) && this.labelInView(label, 1200)).setScale(detailScale));
    this.roadLabels.forEach((label) => { const importantPoi = Number(label.getData("poiImportance") ?? 0) >= 45; label.setVisible((["base", "local"].includes(this.zoomBand) || this.zoomBand === "city" && importantPoi) && this.labelInView(label, 1600)).setScale(detailScale); });
    this.debugLabels.forEach((label) => label.setVisible(this.debugMode).setScale(detailScale));
    if (this.snapshot) {
      if (!this.focusedDeployedBase) { const base = this.localBase(); if (base) { this.focusedDeployedBase = true; const point = this.baseWorldPoint(base); camera.centerOn(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE).setZoom(.88 / BATTLE_WORLD_SCALE); const entryName = this.battleSeed?.entryTerritoryName && this.battleSeed.entryTerritoryName !== this.battleSeed.territoryName ? ` // ${this.battleSeed.entryTerritoryName.toUpperCase()}` : ""; this.showNotice(base.status === "packed" ? `CONVOY ENTRY POINT${entryName} — DRIVE WITH WASD` : `AMERICAS THEATER${entryName}`); } }
      const liveIds = new Set<string>();
      for (const zombie of this.snapshot.zombies) {
        const point = this.theaterWorld ? this.toTheater(zombie) : zombie;
        if ((this.theaterWorld ? this.zoomBand !== 'base' : this.effectiveZoom() < .52) || !this.pointInView(point.x, point.y, 650)) continue;
        liveIds.add(zombie.id);
        const render = advanceZombieVisual(this.renderedZombies.get(zombie.id) ?? initialZombieVisual(zombie), zombie, dt);
        this.renderedZombies.set(zombie.id, render); this.ensureZombieSprite(zombie.id, zombie.type);
      }
      for (const [id, render] of this.renderedZombies) if (!liveIds.has(id)) {
        const point = this.theaterWorld ? this.toTheater(render) : render;
        const visible = (this.theaterWorld ? this.zoomBand === 'base' : this.effectiveZoom() >= .52) && this.pointInView(point.x, point.y, 500);
        this.retireZombieVisual(id, render, visible && !this.snapshot.zombies.some(z => z.id === id));
      }
      this.updateZombieSprites(); this.updateBloodDecals(Date.now()); this.updateBaseWrecks(Date.now());
      this.drawDynamic();
    }
  }

  private setupInputs(): void {
    const keyboard = this.input.keyboard!;
    this.keys = keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W, a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S, d: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.UP, down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT, right: Phaser.Input.Keyboard.KeyCodes.RIGHT
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    keyboard.on("keydown-B", () => this.toggleBuild());
    keyboard.on("keydown-G", () => this.toggleFieldGear());
    keyboard.on("keydown-M", () => this.toggleMap());
    keyboard.on("keydown-F3", () => { this.debugMode = !this.debugMode; this.lastLodSignature = ""; this.drawWorld(); this.rebuildDebugLabels(); this.showNotice(`Map debug ${this.debugMode ? "enabled" : "hidden"}.`); });
    keyboard.on("keydown-T", () => this.returnToWarGlobe());
    keyboard.on("keydown-P", () => this.packConvoy());
    keyboard.on("keydown-E", () => this.deployConvoy());
    keyboard.on("keydown-SPACE", () => this.deployConvoy());
    keyboard.on("keydown-F", () => this.returnToBase());
    for (let slot = 1; slot <= EQUIPMENT_TYPES.length; slot++) keyboard.on(`keydown-${slot}`, () => this.selectEquipment(EQUIPMENT_TYPES[slot - 1]));
    keyboard.on("keydown", (event: KeyboardEvent) => {
      primeCombatAudio();
      if (event.repeat || this.localBase()?.status !== "packed" || !["w", "s"].includes(event.key.toLowerCase())) return;
      const base = this.localBase(); if (!base) return; const steering = (this.keys.d.isDown ? 1 : 0) - (this.keys.a.isDown ? 1 : 0); const throttle = event.key.toLowerCase() === "w" ? 1 : -1;
      this.network.driveBase(steering, throttle, 50, this.convoyOnVisibleHighway(this.baseWorldPoint(base)));
    });
    keyboard.on("keydown-R", () => { this.network.restart(); this.selectedLotId = undefined; this.showNotice("Local commander state reset."); });
    keyboard.on("keydown-ESC", () => { this.selectedLotId = undefined; if (this.mapOpen) this.toggleMap(); else this.openHudPanel("none"); this.refreshHud(); });
    this.input.mouse?.disableContextMenu();
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      primeCombatAudio();
      if (pointer.rightButtonDown()) { this.selectedLotId = undefined; if (this.buildOpen) this.openHudPanel("none"); this.refreshHud(); return; }
      this.drag = { x: pointer.x, y: pointer.y, scrollX: this.cameras.main.scrollX, scrollY: this.cameras.main.scrollY, moved: false };
    });
    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown) { this.updateWorldHover(pointer.worldX / BATTLE_WORLD_SCALE, pointer.worldY / BATTLE_WORLD_SCALE); return; }
      if (!this.drag) return;
      const dx = pointer.x - this.drag.x; const dy = pointer.y - this.drag.y;
      if (Math.hypot(dx, dy) > 5) this.drag.moved = true;
      if (this.drag.moved) this.followVehicle = false;
      if (this.drag.moved) { this.cameras.main.scrollX = this.drag.scrollX - dx / this.cameras.main.zoom; this.cameras.main.scrollY = this.drag.scrollY - dy / this.cameras.main.zoom; }
    });
    this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => { if (this.drag && !this.drag.moved && !this.mapOpen) this.handleWorldClick(pointer.worldX / BATTLE_WORLD_SCALE, pointer.worldY / BATTLE_WORLD_SCALE); this.drag = undefined; });
    this.input.on("gameout", () => { this.hoveredTowerId = undefined; });
    this.input.on("wheel", (_pointer: Phaser.Input.Pointer, _objects: unknown[], _dx: number, dy: number) => {
      const zoom = Phaser.Math.Clamp(this.cameras.main.zoom * (dy > 0 ? 0.82 : 1.18), THEATER_MIN_ZOOM, CAMERA_MAX_ZOOM);
      this.cameras.main.setZoom(zoom); this.syncCameraBounds(this.cameras.main);
    });
  }

  private syncCameraBounds(camera: Phaser.Cameras.Scene2D.Camera): void {
    const mapWidth = THEATER_WIDTH * BATTLE_WORLD_SCALE; const mapHeight = THEATER_HEIGHT * BATTLE_WORLD_SCALE;
    const viewWidth = camera.width / camera.zoom; const viewHeight = camera.height / camera.zoom;
    const padX = Math.max(0, (viewWidth - mapWidth) / 2); const padY = Math.max(0, (viewHeight - mapHeight) / 2);
    const signature = `${camera.zoom.toFixed(6)}:${camera.width}:${camera.height}`; if (signature === this.lastCameraBoundsSignature) return;
    this.lastCameraBoundsSignature = signature; camera.setBounds(-padX, -padY, mapWidth + padX * 2, mapHeight + padY * 2);
  }

  private setupUi(): void {
    const cards = document.querySelector<HTMLElement>("#tower-cards")!;
    cards.innerHTML = "";
    for (const [type, info] of Object.entries(TOWER_INFO) as [TowerType, (typeof TOWER_INFO)[TowerType]][]) {
      const button = document.createElement("button"); button.className = `tower-card ${type === this.selectedTower ? "selected" : ""}`; button.dataset.type = type;
      button.innerHTML = `${towerCardArt(type)}<span class="tower-card-copy"><b>${info.name}</b><small>${info.role}</small></span><strong>◈ ${info.cost}</strong><em>${type === "squadBeacon" ? "1 SLOT<br>UTILITY" : `${info.damage} DMG<br>${info.range} RNG`}</em>`;
      button.onclick = () => { this.selectedTower = type; cards.querySelectorAll("button").forEach((card) => card.classList.toggle("selected", card === button)); this.showNotice("Select a glowing build pad."); };
      cards.append(button);
    }
    document.querySelector<HTMLButtonElement>("#deploy-button")!.onclick = () => {
      if (!this.localBase()) { this.returnToWarGlobe(); return; }
      if (this.debugMode) this.deploySelected();
    };
    document.querySelector<HTMLButtonElement>("#redeploy-button")!.onclick = () => this.redeploySelected();
    document.querySelector<HTMLButtonElement>("#pack-button")!.onclick = () => this.packConvoy();
    document.querySelector<HTMLButtonElement>("#deploy-core-button")!.onclick = () => this.deployConvoy();
    document.querySelector<HTMLButtonElement>("#follow-vehicle-button")!.onclick = () => this.returnToBase();
    document.querySelector<HTMLButtonElement>("#start-wave-button")!.onclick = () => this.network.startDefenseNow();
    document.querySelector<HTMLButtonElement>("#build-close")!.onclick = () => this.toggleBuild();
    document.querySelector<HTMLButtonElement>("#build-button")!.onclick = () => this.toggleBuild();
    document.querySelector<HTMLButtonElement>("#field-gear-button")!.onclick = () => this.toggleFieldGear();
    document.querySelector<HTMLButtonElement>("#sector-summary-button")!.onclick = () => this.openHudPanel("sector");
    document.querySelector<HTMLButtonElement>("#sector-button")!.onclick = () => this.openHudPanel("sector");
    document.querySelector<HTMLButtonElement>("#contract-button")!.onclick = () => this.openHudPanel("contract");
    document.querySelector<HTMLButtonElement>("#squad-button")!.onclick = () => this.openHudPanel("squad");
    document.querySelector<HTMLButtonElement>("#activity-button")!.onclick = () => this.openHudPanel("activity");
    document.querySelector<HTMLButtonElement>("#help-button")!.onclick = () => this.openHudPanel("help");
    document.querySelectorAll<HTMLButtonElement>("[data-close-panel]").forEach((button) => { button.onclick = () => this.openHudPanel("none"); });
    document.querySelector<HTMLButtonElement>("#add-ai-convoy")!.onclick = () => this.network.addAiConvoy();
    document.querySelector<HTMLButtonElement>("#fill-ai-convoys")!.onclick = () => { for (let i = 0; i < 100; i++) this.network.addAiConvoy(); };
    document.querySelector<HTMLButtonElement>("#clear-ai-convoys")!.onclick = () => this.network.clearAiConvoys();
    let watchedAi = 0;
    document.querySelector<HTMLButtonElement>("#watch-ai-convoy")!.onclick = () => { const bots = this.snapshot?.bases.filter(b => b.isAI) ?? []; if (!bots.length) return; const point = this.baseWorldPoint(bots[watchedAi++ % bots.length]); this.followVehicle = false; this.cameras.main.centerOn(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE); };
    document.querySelector<HTMLButtonElement>("#map-button")!.onclick = () => this.toggleMap();
    document.querySelector<HTMLButtonElement>("#war-globe-button")!.onclick = () => this.returnToWarGlobe();
    document.querySelector<HTMLButtonElement>("#return-base-button")!.onclick = () => this.returnToBase();
    document.querySelector<HTMLButtonElement>("#map-close")!.onclick = () => this.toggleMap();
    document.querySelector<HTMLButtonElement>("#squad-call-button")!.onclick = () => { const base = this.localBase(); if (base) this.network.callBackup(base.id); };
    document.querySelector<HTMLButtonElement>("#squad-toggle-button")!.onclick = () => { const base = this.localBase(); if (base) this.network.toggleBaseJoinable(base.id); };
    document.querySelectorAll<HTMLButtonElement>("#equipment-bar [data-equipment]").forEach((button) => {
      const info = EQUIPMENT_INFO[button.dataset.equipment as EquipmentType];
      const tooltip = document.createElement("span"); tooltip.className = "equipment-tooltip"; tooltip.setAttribute("role", "tooltip");
      const name = document.createElement("b"); name.textContent = info.name;
      const description = document.createElement("span"); description.textContent = info.description;
      tooltip.append(name, description); button.append(tooltip);
      button.onclick = () => this.selectEquipment(button.dataset.equipment as EquipmentType);
    });
  }

  private selectEquipment(type: EquipmentType): void {
    const count = this.localPlayer()?.equipmentStash?.find((entry) => entry.type === type)?.count ?? 0;
    if (!count) { this.showNotice(`${EQUIPMENT_INFO[type].name} slot is empty. Open satchels to stock it.`, true); return; }
    if (type === "fieldRepairKit") { this.network.useEquipment(type); this.selectedEquipment = undefined; return; }
    this.selectedEquipment = this.selectedEquipment === type ? undefined : type; this.openHudPanel("none"); this.refreshEquipmentUi();
    if (this.selectedEquipment) this.showNotice(EQUIPMENT_INFO[type].useHint.replace("SELECT, THEN ", ""));
  }

  private handleWorldClick(x: number, y: number): void {
    if (!this.snapshot) return; const player = this.localPlayer(); const base = this.localBase();
    const simulationPoint = this.toSimulation({ x, y }); x = simulationPoint.x; y = simulationPoint.y;
    const tower = this.snapshot.towers.find((entry) => entry.ownerPlayerId === player?.id && Math.hypot(entry.x - x, entry.y - y) < 42);
    const satchel = this.snapshot.lootSatchels?.find((entry) => entry.ownerPlayerId === player?.id && Math.hypot(entry.x - x, entry.y - y) < 62);
    if (satchel) { this.network.openLootSatchel(satchel.id); this.showNotice("Opening recovered satchel…"); return; }
    if (this.selectedEquipment) {
      if (this.selectedEquipment === "overclockBooster") { if (!tower) { this.showNotice("Click one of your combat towers to overclock it.", true); return; } this.network.useEquipment(this.selectedEquipment, undefined, tower.id); }
      else this.network.useEquipment(this.selectedEquipment, { x, y });
      this.selectedEquipment = undefined; this.refreshEquipmentUi(); return;
    }
    if (tower) { if (tower.type === "squadBeacon") this.network.upgrade(tower.id); else this.progressionUI?.armory(tower); return; }
    if (base) {
      const ownLot = this.snapshot.lots.find((lot) => lot.id === base.lotId);
      const pad = ownLot?.pads.find((entry) => Math.hypot(entry.x - x, entry.y - y) < 58);
      if (this.buildOpen && pad && !pad.occupiedBy) { this.network.build(pad.id, this.selectedTower); return; }
    }
    const lotHitRadius = Math.max(42, 11 / this.effectiveZoom());
    const lot = this.snapshot.lots.find((entry) => Math.hypot(entry.x - x, entry.y - y) < lotHitRadius);
    if (this.debugMode && lot) {
      this.selectedLotId = lot.id; this.hoveredLotId = lot.id; this.lotSelectionMode = true;
      if (!player?.baseId && lot.status === "empty") this.network.reserveLot(lot.id);
      this.refreshHud();
      const point = this.toTheater(lot); this.cameras.main.pan(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, 360, "Sine.easeOut");
      if (this.effectiveZoom() < .48) this.cameras.main.zoomTo(.62 / BATTLE_WORLD_SCALE, 500, "Sine.easeOut");
      return;
    }
    const territory = this.snapshot.territories.find((entry) => entry.polygon ? this.pointInPolygon({ x, y }, entry.polygon) : x >= entry.x && x <= entry.x + entry.w && y >= entry.y && y <= entry.y + entry.h);
    if (this.debugMode && territory) { const firstLot = this.snapshot.lots.find((lotEntry) => lotEntry.territoryId === territory.id && ["empty", "overrun"].includes(lotEntry.status)); if (firstLot) this.selectedLotId = firstLot.id; this.refreshHud(); }
  }

  private updateLotHover(x: number, y: number): void {
    if (!this.snapshot || this.mapOpen) return;
    if (!this.debugMode) { if (this.hoveredLotId) { this.hoveredLotId = undefined; this.refreshHud(); } return; }
    const radius = Math.max(38, 10 / this.effectiveZoom()); let hovered: RoadsideLot | undefined;
    if (this.zoomBand === "base") { const point = this.toSimulation({ x, y }); hovered = this.snapshot.lots.find((entry) => Math.hypot(entry.x - point.x, entry.y - point.y) < radius); }
    else { const target = this.theaterWorld?.lots.map((lot) => ({ lot, point: theaterPoint(lot.lat, lot.lon) })).find((entry) => Math.hypot(entry.point.x - x, entry.point.y - y) < radius); hovered = target ? this.snapshot.lots.find((entry) => entry.id === target.lot.tacticalLotId) : undefined; }
    if (hovered?.id === this.hoveredLotId) return;
    this.hoveredLotId = hovered?.id; this.refreshHud();
  }

  private updateWorldHover(x: number, y: number): void {
    if (!this.snapshot || this.mapOpen) { this.hoveredTowerId = undefined; return; }
    const point = this.theaterWorld ? this.toSimulation({ x, y }) : { x, y }; const tower = this.snapshot.towers.filter((entry) => !entry.packed && entry.type !== "squadBeacon").sort((a, b) => Math.hypot(a.x - point.x, a.y - point.y) - Math.hypot(b.x - point.x, b.y - point.y))[0];
    this.hoveredTowerId = tower && Math.hypot(tower.x - point.x, tower.y - point.y) <= 48 ? tower.id : undefined; this.updateLotHover(x, y);
  }

  private deploySelected(): void {
    if (!this.selectedLotId || !this.snapshot) return; const lot = this.snapshot.lots.find((entry) => entry.id === this.selectedLotId); const territory = this.snapshot.territories.find((entry) => entry.id === lot?.territoryId);
    if (!lot || !territory) return;
    if (territory.state === "overrun" && lot.status === "overrun") this.network.reclaim(lot.id); else this.network.deploy(lot.id);
  }

  private redeploySelected(): void { if (!this.selectedLotId || !this.theaterWorld) return; const globeLot = this.theaterWorld.lots.find((entry) => entry.tacticalLotId === this.selectedLotId); const region = globeLot ? this.theaterWorld.regions.find((entry) => entry.id === globeLot.regionId) : undefined; if (!globeLot || !region) { this.network.redeploy(this.selectedLotId); return; } const point = theaterPoint(globeLot.lat, globeLot.lon); this.network.redeploy(this.selectedLotId, { planetId: this.activePlanetId(), regionId: region.id, regionName: region.name, centerLat: globeLot.lat, centerLon: globeLot.lon, worldX: point.x, worldY: point.y, threatLevel: region.threat, infestation: region.infestation, state: region.state }); this.battleSeed = { ...(this.battleSeed!), regionId: region.id, entryTerritoryName: region.name, entryLat: globeLot.lat, entryLon: globeLot.lon, worldX: point.x, worldY: point.y }; this.focusedDeployedBase = false; }

  private packConvoy(): void { const base = this.localBase(); if (!base) { this.showNotice("Deploy a command core first.", true); return; } if (base.status === "packed") { this.showNotice("Convoy is already packed. Use WASD to drive."); return; } this.openHudPanel("none"); this.network.packConvoy(); }

  private assessConvoySite(base: BaseState, activeHorde: boolean): ReturnType<typeof assessDeployment> {
    const assessment=assessDeployment(this.world!,base,Date.now(),activeHorde,this.convoyStrategicOnLand(base));
    if(assessment.valid && this.sceneryWorld?.blocked(this.baseWorldPoint(base),75*TACTICAL_MAP_SCALE)) return {...assessment,valid:false,code:"blocked",message:"Solid object in the way — move to clear ground"};
    return assessment;
  }
  private capturingDeploymentMap = false;
  private async captureDeploymentMap(preview: DeploymentPreview): Promise<HTMLCanvasElement> {
    const camera=this.cameras.main; const original={x:camera.scrollX,y:camera.scrollY,zoom:camera.zoom,follow:this.followVehicle};
    const output=document.createElement('canvas'); output.width=960; output.height=480;
    const projectWorld=(p:Vec2)=>{const q=this.theaterWorld?this.toTheater(p):p;return {x:q.x*BATTLE_WORLD_SCALE,y:q.y*BATTLE_WORLD_SCALE};};
    const points=[...preview.routes.flat(),preview.core].map(projectWorld); const left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y)),bottom=Math.max(...points.map(p=>p.y));
    const screen=this.game.canvas; const cropWidth=Math.min(screen.width,screen.height*2),cropHeight=cropWidth/2,cropX=(screen.width-cropWidth)/2,cropY=(screen.height-cropHeight)/2;
    const margin=200*TACTICAL_MAP_SCALE*BATTLE_WORLD_SCALE; this.capturingDeploymentMap=true; this.followVehicle=false;
    try {
      camera.setZoom(Math.min(cropWidth/(right-left+margin*2),cropHeight/(bottom-top+margin*2))); camera.centerOn((left+right)/2,(top+bottom)/2);
      // Let normal terrain, road chunks, scenery and convoy sprites render at survey scale.
      await new Promise<void>(resolve=>window.setTimeout(resolve,650));
      if (!this.scene.isActive()) throw new Error('Tactical scene closed');
      await new Promise<void>(resolve=>this.game.events.once(Phaser.Core.Events.POST_RENDER,()=>resolve()));
      const ctx=output.getContext('2d')!; ctx.drawImage(screen,cropX,cropY,cropWidth,cropHeight,0,0,960,480);
      const project=(p:Vec2)=>{const q=projectWorld(p); return {x:((q.x-camera.worldView.x)*camera.zoom-cropX)*960/cropWidth,y:((q.y-camera.worldView.y)*camera.zoom-cropY)*480/cropHeight};};
      ctx.lineJoin='round';ctx.lineCap='round';
      for(const route of preview.routes){const points=route.map(project);ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.strokeStyle='#111b19';ctx.lineWidth=8;ctx.stroke();ctx.strokeStyle=threatColor(preview.difficulty);ctx.lineWidth=4;ctx.stroke();const spawn=points[0];ctx.fillStyle='#f3ae79';ctx.beginPath();ctx.arc(spawn.x,spawn.y,6,0,Math.PI*2);ctx.fill();ctx.font='bold 12px monospace';ctx.strokeStyle='#0c1412';ctx.lineWidth=4;ctx.strokeText('HORDE APPROACH',Math.max(8,Math.min(810,spawn.x+12)),Math.max(18,spawn.y-12));ctx.fillText('HORDE APPROACH',Math.max(8,Math.min(810,spawn.x+12)),Math.max(18,spawn.y-12));}
      const core=project(preview.core);ctx.font='bold 13px monospace';ctx.strokeStyle='#0b1310';ctx.lineWidth=4;ctx.fillStyle='#e8f7d6';ctx.strokeText('YOUR CONVOY',Math.max(8,Math.min(830,core.x+20)),core.y-18);ctx.fillText('YOUR CONVOY',Math.max(8,Math.min(830,core.x+20)),core.y-18);
      output.dataset.mapSource='tactical-renderer';return output;
    } finally { camera.setZoom(original.zoom);camera.setScroll(original.x,original.y);this.followVehicle=original.follow;this.capturingDeploymentMap=false; }
  }
  private async deployConvoy(): Promise<void> { const base = this.localBase(); if (!base || base.status !== "packed") return; if (!this.world) return; const strategicOnLand = this.convoyStrategicOnLand(base); const assessment = this.assessConvoySite(base, this.hordeActive(base)); if (!assessment.valid) { this.showNotice(assessment.message, true); return; } this.openHudPanel("none"); if (!await this.progressionUI?.preview(stamp => this.network.deployConvoy(strategicOnLand, stamp))) this.showNotice("No clear route preview is available here. Move to open ground and try again.", true); }

  private returnToBase(): void { const base = this.localBase(); if (!base) return; this.followVehicle = true; const point = this.baseWorldPoint(base); this.cameras.main.pan(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, 480, "Sine.easeOut"); this.cameras.main.zoomTo(.88 / BATTLE_WORLD_SCALE, 520, "Sine.easeOut"); }
  private refreshZoomUi(): void { this.setText("tactical-view", theaterZoomLabel(this.zoomBand)); this.refreshViewedTerritory(this.cameras.main, true); const activeSector = this.snapshot?.warSectors.find((entry) => entry.id === this.battleSeed?.regionId || entry.regionId === this.battleSeed?.regionId); this.setText("tactical-pressure", activeSector ? `${Math.round(activeSector.pressure)}%` : `${this.battleSeed?.threatLevel ? this.battleSeed.threatLevel * 18 : 0}%`); const base = this.localBase(); const point = base ? this.baseWorldPoint(base) : this.entryWorldPoint(); const nearby = (this.snapshot?.warOperations ?? []).filter((operation) => operation.visibleLat !== undefined && operation.visibleLon !== undefined && Math.hypot(theaterPoint(operation.visibleLat, operation.visibleLon).x - point.x, theaterPoint(operation.visibleLat, operation.visibleLon).y - point.y) < 18000 * TACTICAL_MAP_SCALE).length; this.setText("tactical-operations", String(nearby)); const button = document.querySelector<HTMLButtonElement>("#return-base-button"); if (button) { button.textContent = base?.status === "packed" ? "FOLLOW VEHICLE  F" : "RETURN TO BASE  F"; button.hidden = ["base", "local"].includes(this.zoomBand) || !base; } }

  private refreshViewedTerritory(camera: Phaser.Cameras.Scene2D.Camera, force = false): void { const center = theaterLatLon({ x: camera.worldView.centerX / BATTLE_WORLD_SCALE, y: camera.worldView.centerY / BATTLE_WORLD_SCALE }); const territory = earthTerritoryAt(center.lat, center.lon); const id = territory?.id ?? "americas"; if (!force && id === this.lastViewedTerritoryId) return; this.lastViewedTerritoryId = id; this.setText("tactical-sector", territory?.name ?? this.battleSeed?.entryTerritoryName ?? "Americas"); }

  private ensureTheaterWorld(): void {
    if (!this.world || !this.snapshot || this.theaterWorld) return;
    this.theaterWorld = this.isMissouriPlanet() ? createMissouriTileWorld(this.snapshot.lots) : createEarthGlobeWorld(this.world, this.snapshot.lots);
    const roads = this.isMissouriPlanet() ? this.theaterWorld.roads : normalGameplayHighways(this.theaterWorld.roads);
    const widths = new Map(planetOneAuthoredRoads().map(road=>[road.id,road.width]));
    this.sceneryRoads = roads.map(r=>r.pointLatLon.map(p=>theaterPoint(p.lat,p.lon)));
    this.sceneryWorld = new SceneryWorld(this.sceneryRoads,
      (this.theaterWorld.roadPois ?? []).map(p=>({...theaterPoint(p.lat,p.lon),id:p.id,kind:p.kind})),
      p=>this.sceneryLand.some(m=>this.pointInPolygon(p,m.points)),roads.map(r=>widths.get(r.id)??48));
    this.network.setScenery(this.sceneryWorld,p=>this.toTheater(p),p=>this.toSimulation(p),TACTICAL_MAP_SCALE);
    this.network.setAiScenery({ roads: this.sceneryRoads, sites: (this.theaterWorld.roadPois ?? []).map(p => ({ ...theaterPoint(p.lat, p.lon), id: p.id, kind: p.kind })), roadWidths: roads.map(r => widths.get(r.id) ?? 48), land: this.sceneryLand.map(m => m.points) });
    this.visibleHighwayLines = undefined; this.drawWorld(); this.refreshZoomUi();
  }

  private entryWorldPoint(): Vec2 { return this.battleSeed?.worldX !== undefined && this.battleSeed.worldY !== undefined ? { x: this.battleSeed.worldX, y: this.battleSeed.worldY } : theaterPoint(this.battleSeed?.entryLat ?? 31.5, this.battleSeed?.entryLon ?? -99.3); }
  private baseDeploymentWorldPoint(base = this.localBase()): Vec2 { return base?.worldX !== undefined && base.worldY !== undefined ? { x: base.worldX, y: base.worldY } : this.entryWorldPoint(); }
  private baseWorldPoint(base = this.localBase()): Vec2 { const origin = this.baseDeploymentWorldPoint(base); if (!base) return origin; const anchor = { x: base.anchorX ?? this.snapshot?.lots.find((entry) => entry.id === base.lotId)?.x ?? base.coreX, y: base.anchorY ?? this.snapshot?.lots.find((entry) => entry.id === base.lotId)?.y ?? base.coreY }; return { x: origin.x + (base.coreX - anchor.x) * TACTICAL_MAP_SCALE, y: origin.y + (base.coreY - anchor.y) * TACTICAL_MAP_SCALE }; }
  private convoyStrategicOnLand(base = this.localBase()): boolean | undefined { if (!base || !this.theaterWorld) return undefined; const location = theaterLatLon(this.baseWorldPoint(base)); return Boolean(earthTerritoryAt(location.lat, location.lon)); }
  private convoyOnVisibleHighway(position: Vec2): boolean {
    if (!this.theaterWorld) return false;
    if (this.isMissouriTilePlanet()) { const location = theaterLatLon(position); return isMissouriHighwayLocation(location.lat, location.lon); }
    this.visibleHighwayLines ??= normalGameplayHighways(this.theaterWorld.roads).map((road) => road.pointLatLon.map((point) => theaterPoint(point.lat, point.lon)));
    const maxDistanceSquared = 38 * 38;
    for (const points of this.visibleHighwayLines) for (let index = 1; index < points.length; index++) {
      const a = points[index - 1]; const b = points[index]; const dx = b.x - a.x; const dy = b.y - a.y; const lengthSquared = dx * dx + dy * dy;
      if (lengthSquared < 1) continue;
      const t = Phaser.Math.Clamp(((position.x - a.x) * dx + (position.y - a.y) * dy) / lengthSquared, 0, 1); const px = a.x + dx * t; const py = a.y + dy * t;
      if ((position.x - px) ** 2 + (position.y - py) ** 2 <= maxDistanceSquared) return true;
    }
    return false;
  }
  private simulationAnchor(): Vec2 { const base = this.localBase(); if (base?.anchorX !== undefined && base.anchorY !== undefined) return { x: base.anchorX, y: base.anchorY }; const lot = this.snapshot?.lots.find((entry) => entry.id === (base?.lotId ?? this.battleSeed?.selectedLotId)); return lot ? { x: lot.x, y: lot.y } : { x: 3000, y: 2000 }; }
  private toTheater(point: Vec2): Vec2 { const anchor = this.simulationAnchor(); const world = this.baseDeploymentWorldPoint(); return { x: world.x + (point.x - anchor.x) * TACTICAL_MAP_SCALE, y: world.y + (point.y - anchor.y) * TACTICAL_MAP_SCALE }; }
  private toSimulation(point: Vec2): Vec2 { const anchor = this.simulationAnchor(); const world = this.baseDeploymentWorldPoint(); return { x: anchor.x + (point.x - world.x) / TACTICAL_MAP_SCALE, y: anchor.y + (point.y - world.y) / TACTICAL_MAP_SCALE }; }
  private globeLotPoint(lotId: string): Vec2 | undefined { const lot = this.theaterWorld?.lots.find((entry) => entry.tacticalLotId === lotId); return lot ? theaterPoint(lot.lat, lot.lon) : undefined; }

  private drawAmericasWorld(): void {
    if (!this.theaterWorld) return; const land = this.staticGraphics; land.clear(); this.nationalCoastlineGraphics.clear(); this.stateBorderGraphics.clear(); this.territoryOverlayGraphics.clear(); this.oceanBaseGraphics.clear().fillStyle(0x101a1d, 1).fillRect(0, 0, THEATER_WIDTH, THEATER_HEIGHT); this.terrainDetailGraphics.clear(); this.overviewRoadGraphics.clear(); this.secondaryGraphics.clear(); this.localGraphics.clear(); this.lastLodSignature = ""; this.lastTerritoryBorderSignature = ""; this.lastSurfaceSignature = "";
    this.missouriTileLayer?.destroy(); this.missouriTileLayer = undefined; this.missouriTileMask?.destroy(); this.missouriTileMask = undefined; this.missouriTileMaskSource?.destroy(); this.missouriTileMaskSource = undefined;
    this.labels.forEach((label) => label.destroy()); this.labels = []; this.territoryLabels = []; this.townLabels = []; this.roadLabels = [];
    // Countries define land. States are only borders drawn over this unbroken
    // silhouette, so source-data seams can never expose ocean inside the USA.
    for (const mass of planetOneTacticalLandmasses()) land.fillStyle(PLANET_ONE_TERRAIN_COLORS[mass.group], 1).fillPoints(mass.points, true);
    if (!this.threatImage) { const texture = this.textures.createCanvas('threat-field', 1024, 1408)!; const ctx = texture.getContext(); ctx.save(); ctx.beginPath(); for (const mass of planetOneTacticalLandmasses()) { mass.points.forEach((p, i) => i ? ctx.lineTo(p.x / THEATER_WIDTH * 1024, p.y / THEATER_HEIGHT * 1408) : ctx.moveTo(p.x / THEATER_WIDTH * 1024, p.y / THEATER_HEIGHT * 1408)); ctx.closePath(); } ctx.clip(); paintThreatField(ctx, 1024, 1408, (x, y) => theaterLatLon({ x: x / 1024 * THEATER_WIDTH, y: y / 1408 * THEATER_HEIGHT }), this.snapshot?.warSectors, 4); ctx.restore(); texture.refresh(); this.threatImage = this.add.image(0, 0, 'threat-field').setOrigin(0).setDisplaySize(THEATER_WIDTH * BATTLE_WORLD_SCALE, THEATER_HEIGHT * BATTLE_WORLD_SCALE).setDepth(.25); }
    if (this.isMissouriTilePlanet()) this.createMissouriTileLayer();
    for (const territory of earthTerritories) {
      const point = theaterPoint(territory.centerLat, territory.centerLon); const label = this.add.text(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, territory.name.toUpperCase(), { fontFamily: "monospace", fontSize: `${1100 * BATTLE_WORLD_SCALE}px`, fontStyle: "bold", color: "#d6d8bd", stroke: "#121711", strokeThickness: 70 * BATTLE_WORLD_SCALE }).setOrigin(.5).setDepth(2).setData({ logicalX: point.x, logicalY: point.y, group: territory.group }); this.territoryLabels.push(label);
    }
    this.refreshTerritoryBorders(this.effectiveZoom());
    for (const [name, lat, lon] of [["UNITED STATES", 39, -98], ["CANADA", 57, -108]] as const) { const point = theaterPoint(lat, lon); this.territoryLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, name, { fontFamily: "monospace", fontSize: `${1700 * BATTLE_WORLD_SCALE}px`, fontStyle: "bold", color: "#e3e2c8", stroke: "#111710", strokeThickness: 90 * BATTLE_WORLD_SCALE }).setOrigin(.5).setDepth(2).setData({ logicalX: point.x, logicalY: point.y, continentOnly: true })); }
    if (!this.isMissouriTilePlanet()) for (const settlement of this.theaterWorld.settlements) { const point = theaterPoint(settlement.lat, settlement.lon); const label = this.add.text(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, settlement.name.toUpperCase(), { fontFamily: "monospace", fontSize: `${160 * BATTLE_WORLD_SCALE}px`, color: "#d8d8c8", backgroundColor: "#10120ed9", padding: { x: 20 * BATTLE_WORLD_SCALE, y: 10 * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(3).setData({ logicalX: point.x, logicalY: point.y }); this.townLabels.push(label); }
    for (const poi of this.theaterWorld.roadPois ?? []) { const point = theaterPoint(poi.lat, poi.lon); const hostile = ["infected_hive", "overrun_town", "abandoned_mall"].includes(poi.kind); const label = this.add.text(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, `◆ ${poi.name}`, { fontFamily: "monospace", fontSize: `${92 * BATTLE_WORLD_SCALE}px`, color: hostile ? "#ef875f" : "#d2c88e", backgroundColor: "#11130ed0", padding: { x: 14 * BATTLE_WORLD_SCALE, y: 7 * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(3).setData({ logicalX: point.x, logicalY: point.y, poiImportance: poi.importance }); this.roadLabels.push(label); }
    this.labels = [...this.territoryLabels, ...this.townLabels, ...this.roadLabels]; this.rebuildDebugLabels();
    this.game.canvas.dataset.roadSource = this.isMissouriPlanet() ? "connected-statewide-road-tiles" : "authored-interstate-corridors"; this.game.canvas.dataset.roadPolylines = String(this.theaterWorld.roads.length);
  }

  private createMissouriTileLayer(): void {
    const northWest = theaterPoint(MISSOURI_TILE_BOUNDS.latMax, MISSOURI_TILE_BOUNDS.lonMin); const southEast = theaterPoint(MISSOURI_TILE_BOUNDS.latMin, MISSOURI_TILE_BOUNDS.lonMax); const worldWidth = southEast.x - northWest.x; const worldHeight = southEast.y - northWest.y;
    const cellWidth = worldWidth / MISSOURI_TILE_COLUMNS * BATTLE_WORLD_SCALE; const cellHeight = worldHeight / MISSOURI_TILE_ROWS * BATTLE_WORLD_SCALE; const overlap = 1.5 * BATTLE_WORLD_SCALE;
    const roadByCell = new Map(MISSOURI_TILE_MAP.map((tile) => [`${tile.column},${tile.row}`, tile] as const));
    const assetKeyByKind = new Map(MISSOURI_TILE_ASSETS.map((asset) => [asset.kind, asset.key] as const)); const tiles: Phaser.GameObjects.GameObject[] = [];
    for (let row = 0; row < MISSOURI_TILE_ROWS; row++) for (let column = 0; column < MISSOURI_TILE_COLUMNS; column++) {
      const road = roadByCell.get(`${column},${row}`); const textureKey = road ? assetKeyByKind.get(road.kind)! : MISSOURI_TILE_GROUND_ASSET.key;
      const quarterTurn = road?.rotation === 90 || road?.rotation === 270; const width = (quarterTurn ? cellHeight : cellWidth) + overlap; const height = (quarterTurn ? cellWidth : cellHeight) + overlap;
      tiles.push(this.add.image((northWest.x * BATTLE_WORLD_SCALE) + (column + .5) * cellWidth, (northWest.y * BATTLE_WORLD_SCALE) + (row + .5) * cellHeight, textureKey).setDisplaySize(width, height).setRotation((road?.rotation ?? 0) * Math.PI / 180));
    }
    const oneWayMarkers = this.add.graphics(); oneWayMarkers.lineStyle(Math.max(3, Math.min(cellWidth, cellHeight) * .035), 0x201906, .96); oneWayMarkers.fillStyle(0xf3cf59, .98);
    for (const segment of MISSOURI_ONE_WAY_SEGMENTS) {
      const x1 = northWest.x * BATTLE_WORLD_SCALE + (segment.from[0] + .5) * cellWidth; const y1 = northWest.y * BATTLE_WORLD_SCALE + (segment.from[1] + .5) * cellHeight;
      const x2 = northWest.x * BATTLE_WORLD_SCALE + (segment.to[0] + .5) * cellWidth; const y2 = northWest.y * BATTLE_WORLD_SCALE + (segment.to[1] + .5) * cellHeight;
      const angle = Math.atan2(y2 - y1, x2 - x1); const x = (x1 + x2) / 2; const y = (y1 + y2) / 2; const size = Math.min(cellWidth, cellHeight) * .16; const cos = Math.cos(angle); const sin = Math.sin(angle);
      const transform = (forward: number, side: number) => ({ x: x + forward * cos - side * sin, y: y + forward * sin + side * cos }); const tip = transform(size, 0); const left = transform(-size * .7, -size * .62); const right = transform(-size * .7, size * .62);
      oneWayMarkers.beginPath().moveTo(tip.x, tip.y).lineTo(left.x, left.y).lineTo(right.x, right.y).closePath().strokePath().fillPath();
    }
    tiles.push(oneWayMarkers);
    this.missouriTileMaskSource = this.make.graphics({}, false).setScale(BATTLE_WORLD_SCALE).fillStyle(0xffffff, 1); const territory = earthTerritories.find((entry) => entry.id === "earth-us-mo");
    if (territory) for (const polygon of territory.polygons) for (const ring of polygon) this.missouriTileMaskSource.fillPoints(ring.map(([lon, lat]) => theaterPoint(lat, lon)), true);
    this.missouriTileMask = this.missouriTileMaskSource.createGeometryMask(); this.missouriTileLayer = this.add.container(0, 0, tiles).setDepth(.65).setMask(this.missouriTileMask);
    this.game.canvas.dataset.missouriTileBaseAssets = String(MISSOURI_TILE_ASSETS.length); this.game.canvas.dataset.missouriTileGrid = `${MISSOURI_TILE_COLUMNS}x${MISSOURI_TILE_ROWS}`; this.game.canvas.dataset.missouriTileOrientations = "horizontal,vertical,corners,t-junction,cross"; this.game.canvas.dataset.missouriTileRenderSource = "direct-512px-textures"; this.game.canvas.dataset.missouriTileSprites = String(tiles.length); this.game.canvas.dataset.missouriOneWaySegments = String(MISSOURI_ONE_WAY_SEGMENTS.length);
  }

  private refreshTerritoryBorders(zoom: number): void {
    const signature = `${this.zoomBand}:${Math.round(zoom * 1000)}`; if (signature === this.lastTerritoryBorderSignature) return; this.lastTerritoryBorderSignature = signature;
    const borders = this.stateBorderGraphics; const coastline = this.nationalCoastlineGraphics; borders.clear(); coastline.clear();
    const pixelWidth = TACTICAL_STATE_BORDER_WIDTH_PX[this.zoomBand]; const alpha = TACTICAL_STATE_BORDER_ALPHA[this.zoomBand];
    borders.lineStyle(pixelWidth / Math.max(.001, zoom), TACTICAL_STATE_BORDER_COLOR, alpha);
    for (const line of PLANET_ONE_US_STATE_BORDERS) borders.strokePoints(line, false);
    coastline.lineStyle((pixelWidth + .24) / Math.max(.001, zoom), TACTICAL_STATE_BORDER_COLOR, Math.min(.72, alpha + .12));
    for (const line of PLANET_ONE_US_COASTLINES()) coastline.strokePoints(line, true);
  }

  private refreshUsaLod(camera: Phaser.Cameras.Scene2D.Camera, zoom: number): void {
    if (!this.theaterWorld) return;
    if (!this.isMissouriPlanet()) {
      this.planetOneTexturedRoads ??= new PlanetOneTexturedRoads(this);
      this.planetOneTexturedRoads.refresh(camera, zoom);
    }
    const quantize = this.zoomBand === "country" ? 16000 : this.zoomBand === "regional" ? 6000 : this.zoomBand === "city" ? 1800 : this.zoomBand === "local" ? 420 : 110; const centerX = camera.worldView.centerX / BATTLE_WORLD_SCALE; const centerY = camera.worldView.centerY / BATTLE_WORLD_SCALE; const signature = `${this.planetOneTexturedRoads?.ready}:${this.zoomBand}:${this.debugMode}:${Math.round(zoom * 100)}:${Math.round(centerX / quantize)}:${Math.round(centerY / quantize)}:${camera.width}:${camera.height}`; if (signature === this.lastLodSignature) return; this.lastLodSignature = signature;
    const view = { left: camera.worldView.left / BATTLE_WORLD_SCALE, top: camera.worldView.top / BATTLE_WORLD_SCALE, right: camera.worldView.right / BATTLE_WORLD_SCALE, bottom: camera.worldView.bottom / BATTLE_WORLD_SCALE };
    drawUsaTerrainLod(this.terrainDetailGraphics, this.zoomBand, view);
    if (this.isMissouriTilePlanet()) { this.overviewRoadGraphics.clear(); this.secondaryGraphics.clear(); this.localGraphics.clear(); this.game.canvas.dataset.roadPolylinesInView = "0"; return; }
    const visibleRoads = this.isMissouriPlanet() ? this.theaterWorld.roads : normalGameplayHighways(this.theaterWorld.roads).filter(road => !this.planetOneTexturedRoads?.ready || !road.id.startsWith("curated-usa-"));
    drawUsaRoadLod({ graphics: { highways: this.overviewRoadGraphics, regional: this.secondaryGraphics, local: this.localGraphics }, roads: visibleRoads, band: this.zoomBand, zoom, debug: this.debugMode, curatedRoads: this.isMissouriPlanet(), project: (point) => theaterPoint(point.lat, point.lon), inView: (point, margin) => this.pointInView(point.x, point.y, margin), isUsaRoad: () => true });
    this.game.canvas.dataset.roadPolylinesInView = String(visibleRoads.length);
  }

  private refreshSurfaceTexture(camera: Phaser.Cameras.Scene2D.Camera, zoom: number): void {
    const progress = Phaser.Math.Clamp((zoom - .018) / .19, 0, 1); const alpha = progress * progress * (3 - 2 * progress); if (!this.theaterWorld || alpha <= .01) { this.lastSurfaceSignature = ""; this.surfaceChunks.forEach((chunk) => chunk.image.setVisible(false)); return; }
    const lod: TerrainSurfaceLod = zoom >= .78 ? "base" : zoom >= .22 ? "local" : zoom >= .1 ? "mid" : "far"; const chunkSize = lod === "base" ? 1024 : lod === "local" ? 2048 : lod === "mid" ? 4096 : 16384; const pixels = lod === "base" || lod === "local" ? 1024 : 512; const view = { left: camera.worldView.left / BATTLE_WORLD_SCALE, top: camera.worldView.top / BATTLE_WORLD_SCALE, right: camera.worldView.right / BATTLE_WORLD_SCALE, bottom: camera.worldView.bottom / BATTLE_WORLD_SCALE };
    const firstColumn = Math.max(0, Math.floor(view.left / chunkSize)); const lastColumn = Math.min(Math.ceil(THEATER_WIDTH / chunkSize) - 1, Math.floor(view.right / chunkSize)); const firstRow = Math.max(0, Math.floor(view.top / chunkSize)); const lastRow = Math.min(Math.ceil(THEATER_HEIGHT / chunkSize) - 1, Math.floor(view.bottom / chunkSize)); const signature = `${lod}:${firstColumn}:${lastColumn}:${firstRow}:${lastRow}:${Math.round(alpha * 20)}`; if (signature === this.lastSurfaceSignature) return; const cameraSignature = `${camera.worldView.left.toFixed(1)}:${camera.worldView.top.toFixed(1)}:${zoom.toFixed(5)}:${camera.width}:${camera.height}`; const now = performance.now(); if (cameraSignature !== this.surfaceCameraSignature) { this.surfaceCameraSignature = cameraSignature; this.surfaceCameraChangedAt = now; } const mayBake = now - this.surfaceCameraChangedAt >= 120; let pending = 0; const active = new Set<string>(); this.surfaceUseCounter++; const refreshStarted = performance.now(); let created = 0;
    for (let row = firstRow; row <= lastRow; row++) for (let column = firstColumn; column <= lastColumn; column++) {
      const cacheKey = `${lod}:${column}:${row}`; active.add(cacheKey); let chunk = this.surfaceChunks.get(cacheKey); if (!chunk && (!mayBake || created >= 1)) { pending++; continue; } if (!chunk) { chunk = this.createSurfaceChunk(cacheKey, column * chunkSize, row * chunkSize, chunkSize, pixels, lod); this.surfaceChunks.set(cacheKey, chunk); created++; }
      chunk.lastUsed = this.surfaceUseCounter; chunk.image.setAlpha(.72 * alpha).setVisible(true);
    }
    const elapsed = performance.now() - refreshStarted; const previousMax = Number(this.game.canvas.dataset.surfaceRefreshMaxMs ?? 0); const centerBiome = resolveUsaTerrainBiome(camera.worldView.centerX / BATTLE_WORLD_SCALE, camera.worldView.centerY / BATTLE_WORLD_SCALE); this.game.canvas.dataset.surfaceChunks = String(active.size); this.game.canvas.dataset.surfaceChunksCreated = String(created); this.game.canvas.dataset.surfaceRefreshMs = elapsed.toFixed(1); this.game.canvas.dataset.surfaceRefreshMaxMs = Math.max(previousMax, elapsed).toFixed(1); this.game.canvas.dataset.surfaceChunkMargin = "2px-overlapping-gutter"; this.game.canvas.dataset.surfaceBiomeRenderer = "continuous-feathered-biomes-v3"; this.game.canvas.dataset.surfaceLod = lod; this.game.canvas.dataset.surfacePixels = String(pixels); this.game.canvas.dataset.surfaceAlpha = alpha.toFixed(3); this.game.canvas.dataset.surfaceDetailSeed = "world-cell-v2"; this.game.canvas.dataset.surfaceBiome = centerBiome.primary; this.game.canvas.dataset.surfaceBiomeBlend = `${centerBiome.primary}:${centerBiome.secondary}:${centerBiome.secondaryMix.toFixed(2)}`;
    if (!pending) { this.lastSurfaceSignature = signature; this.surfaceChunks.forEach((chunk, key) => { if (!active.has(key)) chunk.image.setVisible(false); }); } this.game.canvas.dataset.surfaceChunksPending = String(pending); this.trimSurfaceChunks(active);
  }

  private createSurfaceChunk(cacheKey: string, worldX: number, worldY: number, chunkSize: number, pixels: number, lod: TerrainSurfaceLod): SurfaceChunk {
    const gutterPixels = 2; const gutterWorld = chunkSize / pixels * gutterPixels; const renderWorldX = worldX - gutterWorld; const renderWorldY = worldY - gutterWorld; const renderChunkSize = chunkSize + gutterWorld * 2; const renderPixels = pixels + gutterPixels * 2;
    const textureKey = `surface-${cacheKey}`; const texture = this.textures.createCanvas(textureKey, renderPixels, renderPixels); if (!texture) throw new Error(`Could not allocate terrain surface ${textureKey}`); const context = texture.getContext(); context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high"; const ocean = this.textures.get("deep-ocean-v1").getSourceImage() as CanvasImageSource; const ground = this.textures.get("temperate-ground-v1").getSourceImage() as CanvasImageSource; const detail = this.textures.get("temperate-ground-detail-v2").getSourceImage() as CanvasImageSource; const patternWorldSize = lod === "base" ? 720 : lod === "local" ? 900 : lod === "mid" ? 1800 : 5200;
    context.clearRect(0, 0, renderPixels, renderPixels); this.paintRepeatingSurface(context, ocean, renderWorldX, renderWorldY, renderChunkSize, renderPixels, patternWorldSize);
    const pixelScale = renderPixels / renderChunkSize; const masses = planetOneTacticalLandmasses().filter((mass) => mass.right >= renderWorldX && mass.left <= renderWorldX + renderChunkSize && mass.bottom >= renderWorldY && mass.top <= renderWorldY + renderChunkSize);
    const usaMasses = masses.filter((mass) => mass.group === "usa"); const clipMasses = (entries: typeof masses): void => { context.beginPath(); for (const mass of entries) { const first = mass.points[0]; context.moveTo((first.x - renderWorldX) * pixelScale, (first.y - renderWorldY) * pixelScale); for (let index = 1; index < mass.points.length; index++) context.lineTo((mass.points[index].x - renderWorldX) * pixelScale, (mass.points[index].y - renderWorldY) * pixelScale); context.closePath(); } context.clip(); };
    if (masses.length) { context.save(); clipMasses(masses); this.paintRepeatingSurface(context, ground, renderWorldX, renderWorldY, renderChunkSize, renderPixels, patternWorldSize); if (lod === "base" || lod === "local") { context.save(); context.globalAlpha = lod === "base" ? .58 : .34; this.paintRepeatingSurface(context, detail, renderWorldX, renderWorldY, renderChunkSize, renderPixels, lod === "base" ? 360 : 640); context.restore(); } context.restore(); }
    if (usaMasses.length) { const tileset = Object.fromEntries(TERRAIN_TILESET_ASSETS.map((asset) => [asset.name, this.textures.get(asset.key).getSourceImage() as CanvasImageSource])) as Partial<Record<TerrainTileName, CanvasImageSource>>; context.save(); clipMasses(usaMasses); const biome = paintUsaBiomeTerrain(context, { worldX: renderWorldX, worldY: renderWorldY, chunkSize: renderChunkSize, pixels: renderPixels, lod, tileset }); context.restore(); this.game.canvas.dataset.surfaceChunkBiome = biome.centerBiome; this.game.canvas.dataset.surfaceBiomeTiles = String(biome.materialTiles); this.game.canvas.dataset.surfaceBiomeDecals = String(biome.decals); }
    if (masses.length && (lod === "base" || lod === "local")) { context.save(); clipMasses(masses); const count = paintTerrainSurfaceDetail(context, { worldX: renderWorldX, worldY: renderWorldY, chunkSize: renderChunkSize, pixels: renderPixels, lod, threat: this.battleSeed?.threatLevel ?? 0 }); context.restore(); this.game.canvas.dataset.surfaceDetailCount = String(count); }
    // Render the gutter itself and overlap neighboring chunks. Cropping at the
    // exact texture edge lets linear filtering sample transparent pixels,
    // which showed up as the large horizontal/vertical grid in close view.
    texture.refresh(); const image = this.add.image((renderWorldX + renderChunkSize / 2) * BATTLE_WORLD_SCALE, (renderWorldY + renderChunkSize / 2) * BATTLE_WORLD_SCALE, textureKey).setDisplaySize(renderChunkSize * BATTLE_WORLD_SCALE, renderChunkSize * BATTLE_WORLD_SCALE).setDepth(.1); return { image, textureKey, lastUsed: this.surfaceUseCounter };
  }

  private paintRepeatingSurface(context: CanvasRenderingContext2D, source: CanvasImageSource, worldX: number, worldY: number, chunkSize: number, pixels: number, patternWorldSize: number): void {
    const pixelScale = pixels / chunkSize; const tilePixels = Math.max(24, patternWorldSize * pixelScale); const mod = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor; const offsetX = -mod(worldX, patternWorldSize) * pixelScale; const offsetY = -mod(worldY, patternWorldSize) * pixelScale;
    const preparedSource = this.preparedPatternSource(source, Math.round(tilePixels)); const pattern = context.createPattern(preparedSource, "repeat"); const sourceWidth = preparedSource.width;
    if (pattern?.setTransform && typeof DOMMatrix !== "undefined") { pattern.setTransform(new DOMMatrix().translate(offsetX, offsetY).scale(tilePixels / sourceWidth)); context.save(); context.fillStyle = pattern; context.fillRect(0, 0, pixels, pixels); context.restore(); return; }
    for (let y = offsetY; y < pixels; y += tilePixels) for (let x = offsetX; x < pixels; x += tilePixels) context.drawImage(preparedSource, x, y, tilePixels + 1, tilePixels + 1);
  }

  private preparedPatternSource(source: CanvasImageSource, size: number): HTMLCanvasElement {
    let variants = this.surfacePatternCache.get(source); if (!variants) { variants = new Map(); this.surfacePatternCache.set(source, variants); } const cached = variants.get(size); if (cached) return cached;
    const canvas = document.createElement("canvas"); canvas.width = size; canvas.height = size; const context = canvas.getContext("2d"); if (!context) throw new Error("Could not prepare terrain pattern"); context.imageSmoothingEnabled = true; context.imageSmoothingQuality = "high"; context.drawImage(source, 0, 0, size, size); variants.set(size, canvas); return canvas;
  }

  private trimSurfaceChunks(active: Set<string>): void {
    if (this.surfaceChunks.size <= 48) return; const stale = [...this.surfaceChunks.entries()].filter(([key]) => !active.has(key)).sort((a, b) => a[1].lastUsed - b[1].lastUsed); while (this.surfaceChunks.size > 48 && stale.length) { const [key, chunk] = stale.shift()!; chunk.image.destroy(); this.textures.remove(chunk.textureKey); this.surfaceChunks.delete(key); }
  }

  private destroySurfaceChunks(): void { for (const chunk of this.surfaceChunks.values()) { chunk.image.destroy(); this.textures.remove(chunk.textureKey); } this.surfaceChunks.clear(); this.surfacePatternCache.clear(); this.lastSurfaceSignature = ""; this.surfaceCameraSignature = ""; }

  private drawWorld(): void {
    if (this.theaterWorld) { this.drawAmericasWorld(); return; }
    if (!this.world) return; const g = this.staticGraphics; g.clear(); this.oceanBaseGraphics.clear();
    this.labels.forEach((label) => label.destroy()); this.labels = []; this.territoryLabels = []; this.townLabels = []; this.roadLabels = [];
    g.fillStyle(0x080a08, 1).fillRect(0, 0, this.world.worldWidth, this.world.worldHeight);
    const outline = this.battleSeed?.territoryOutline ?? this.world.outline ?? [{ x: 0, y: 0 }, { x: this.world.worldWidth, y: 0 }, { x: this.world.worldWidth, y: this.world.worldHeight }, { x: 0, y: this.world.worldHeight }];
    const terrainFill: Record<string, number> = { wasteland: 0x29291d, dead_forest: 0x1b271f, prairie: 0x2d3320, ashland: 0x34231f, swamp: 0x20332c, urban_ruins: 0x30312c, mountains: 0x32332c, riverlands: 0x243535 };
    g.fillStyle(terrainFill[this.battleSeed?.biome ?? "wasteland"] ?? 0x25281d, 1).fillPoints(outline, true); g.lineStyle(18, 0x0b0d0a, 1).strokePoints(outline, true); g.lineStyle(5, 0x697057, .8).strokePoints(outline, true);

    // A few authored terrain masses replace the former field of random debug specks.
    const forests: Vec2[][] = [
      [{ x: 520, y: 520 }, { x: 1250, y: 390 }, { x: 1430, y: 820 }, { x: 840, y: 1030 }],
      [{ x: 760, y: 2750 }, { x: 1710, y: 2600 }, { x: 2070, y: 3480 }, { x: 1080, y: 3630 }],
      [{ x: 2500, y: 2630 }, { x: 3550, y: 2440 }, { x: 3850, y: 3500 }, { x: 2920, y: 3610 }]
    ];
    forests.forEach((polygon) => { g.fillStyle(0x171d16, .78).fillPoints(polygon, true); g.lineStyle(3, 0x3b4431, .45).strokePoints(polygon, true); });
    const ashPatches: Vec2[][] = [
      [{ x: 3510, y: 430 }, { x: 4690, y: 350 }, { x: 4870, y: 1510 }, { x: 3720, y: 1620 }],
      [{ x: 3900, y: 1830 }, { x: 5530, y: 1880 }, { x: 5480, y: 3430 }, { x: 4230, y: 3380 }]
    ];
    ashPatches.forEach((polygon) => { g.fillStyle(0x35221c, .25).fillPoints(polygon, true); g.lineStyle(2, 0x6f3c2d, .22).strokePoints(polygon, true); });
    g.lineStyle(120, 0x11191a, .82); this.strokePolyline(g, [{ x: 5700, y: 500 }, { x: 5520, y: 1130 }, { x: 5640, y: 1880 }, { x: 5460, y: 2550 }, { x: 5580, y: 3500 }]);
    g.lineStyle(4, 0x415052, .55); this.strokePolyline(g, [{ x: 5640, y: 500 }, { x: 5460, y: 1130 }, { x: 5580, y: 1880 }, { x: 5400, y: 2550 }, { x: 5520, y: 3500 }]);

    for (const candidateRoad of [...this.world.roads].filter((road) => this.debugMode || road.kind === "highway").sort((a, b) => (a.kind === "dirt" ? 0 : a.kind === "secondary" ? 1 : 2) - (b.kind === "dirt" ? 0 : b.kind === "secondary" ? 1 : 2))) {
      if (candidateRoad.kind === "dirt") {
        g.lineStyle(11, 0x17140f, 1); this.strokePolyline(g, candidateRoad.points);
        g.lineStyle(6, 0x765a38, 1); this.strokePolyline(g, candidateRoad.points);
      } else if (candidateRoad.kind === "secondary") {
        g.lineStyle(18, 0x121411, 1); this.strokePolyline(g, candidateRoad.points);
        g.lineStyle(11, 0x454741, 1); this.strokePolyline(g, candidateRoad.points);
        g.lineStyle(2, 0x777969, .34); this.strokePolyline(g, candidateRoad.points);
      } else {
        g.lineStyle(30, 0x0e100e, 1); this.strokePolyline(g, candidateRoad.points);
        g.lineStyle(21, 0x565750, 1); this.strokePolyline(g, candidateRoad.points);
        g.lineStyle(15, 0x3e403b, 1); this.strokePolyline(g, candidateRoad.points);
        for (let i = 1; i < candidateRoad.points.length; i++) this.drawDashedLine(g, candidateRoad.points[i - 1], candidateRoad.points[i], 2, 0xd4b65f);
      }
      if (candidateRoad.kind !== "dirt") for (let i = 1; i < candidateRoad.points.length; i += 2) {
        const a = candidateRoad.points[i - 1]; const b = candidateRoad.points[i]; const t = .58;
        const x = Phaser.Math.Linear(a.x, b.x, t); const y = Phaser.Math.Linear(a.y, b.y, t); const dx = b.x - a.x; const dy = b.y - a.y; const length = Math.max(1, Math.hypot(dx, dy));
        g.lineStyle(2, 0x171914, .75).lineBetween(x - dy / length * 9, y + dx / length * 9, x + dy / length * 9, y - dx / length * 9);
      }
    }

    const occupiedLabelBounds: Phaser.Geom.Rectangle[] = [];
    for (const candidateTerritory of this.world.territories) {
      const point = candidateTerritory.labelPoint ?? { x: candidateTerritory.x + candidateTerritory.w / 2, y: candidateTerritory.y + 70 };
      const label = this.addMapLabel(candidateTerritory.name.toUpperCase(), point, "territory", occupiedLabelBounds);
      if (label) this.territoryLabels.push(label);
    }
    for (const candidateRoad of this.world.roads.filter((entry) => entry.showLabel && entry.label && (this.debugMode || entry.kind === "highway"))) {
      const point = candidateRoad.points[Math.floor(candidateRoad.points.length / 2)]; const label = this.addMapLabel(candidateRoad.label!, { x: point.x, y: point.y + 50 }, "road", occupiedLabelBounds);
      if (label) this.roadLabels.push(label);
    }
    for (const town of this.world.towns ?? []) {
      const label = this.addMapLabel(town.name.toUpperCase(), { x: town.x, y: town.y + 46 }, "town", occupiedLabelBounds);
      if (label) this.townLabels.push(label);
    }
    this.labels = [...this.territoryLabels, ...this.roadLabels, ...this.townLabels]; this.rebuildDebugLabels();
  }

  private addMapLabel(text: string, point: Vec2, kind: "territory" | "road" | "town", occupied: Phaser.Geom.Rectangle[]): Phaser.GameObjects.Text | undefined {
    const fontSize = kind === "territory" ? 48 : kind === "road" ? 16 : 19; const width = (text.length * fontSize * .61 + 16) * BATTLE_WORLD_SCALE; const height = (fontSize + 12) * BATTLE_WORLD_SCALE; const x = point.x * BATTLE_WORLD_SCALE; const y = point.y * BATTLE_WORLD_SCALE;
    const bounds = new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height);
    if (kind !== "territory" && occupied.some((entry) => Phaser.Geom.Intersects.RectangleToRectangle(entry, bounds))) return undefined;
    occupied.push(bounds);
    const label = this.add.text(x, y, text, { fontFamily: "monospace", fontSize: `${fontSize * BATTLE_WORLD_SCALE}px`, fontStyle: kind === "territory" ? "bold" : "normal", color: kind === "road" ? "#d6bc70" : kind === "town" ? "#d8d8c8" : "#b9b9aa", backgroundColor: kind === "territory" ? undefined : "#10120ed9", padding: { x: (kind === "territory" ? 0 : 6) * BATTLE_WORLD_SCALE, y: (kind === "territory" ? 0 : 3) * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(3).setData({ logicalX: point.x, logicalY: point.y }); if (this.battleMask) label.setMask(this.battleMask);
    return label;
  }

  private strokePolyline(g: Phaser.GameObjects.Graphics, points: { x: number; y: number }[]): void {
    if (!points?.length) return;
    g.beginPath().moveTo(points[0].x, points[0].y); points.slice(1).forEach((point) => g.lineTo(point.x, point.y)); g.strokePath();
  }

  private strokeRoundedPolyline(g: Phaser.GameObjects.Graphics, points: Vec2[], cornerRadius: number): void {
    if (points.length < 2) return;
    g.beginPath().moveTo(points[0].x, points[0].y);
    for (let index = 1; index < points.length - 1; index++) {
      const before = points[index - 1]; const point = points[index]; const after = points[index + 1];
      const beforeLength = Math.hypot(point.x - before.x, point.y - before.y); const afterLength = Math.hypot(after.x - point.x, after.y - point.y);
      const radius = Math.min(cornerRadius, beforeLength * .28, afterLength * .28);
      const entry = { x: point.x - (point.x - before.x) / Math.max(1, beforeLength) * radius, y: point.y - (point.y - before.y) / Math.max(1, beforeLength) * radius };
      const exit = { x: point.x + (after.x - point.x) / Math.max(1, afterLength) * radius, y: point.y + (after.y - point.y) / Math.max(1, afterLength) * radius };
      g.lineTo(entry.x, entry.y);
      for (let sample = 1; sample <= 4; sample++) {
        const t = sample / 4; const inverse = 1 - t;
        g.lineTo(inverse * inverse * entry.x + 2 * inverse * t * point.x + t * t * exit.x, inverse * inverse * entry.y + 2 * inverse * t * point.y + t * t * exit.y);
      }
    }
    g.lineTo(points.at(-1)!.x, points.at(-1)!.y).strokePath();
  }

  private offsetPolyline(points: Vec2[], offset: number): Vec2[] {
    return points.map((point, index) => {
      const before = points[Math.max(0, index - 1)]; const after = points[Math.min(points.length - 1, index + 1)];
      const dx = after.x - before.x; const dy = after.y - before.y; const length = Math.max(1, Math.hypot(dx, dy));
      return { x: point.x - dy / length * offset, y: point.y + dx / length * offset };
    });
  }

  private dirtMaterials = new RoadMaterialLibrary();
  private dirtPathImages = new Map<string, {image: Phaser.GameObjects.Image; key: string; paint:(progress:number)=>void; progress:number}>();
  private dirtPathSerial = 0;
  private drawGeneratedDirtPath(g: Phaser.GameObjects.Graphics, points: Vec2[], width = 34, alpha = .96, detailed = true, progress = 1): void {
    if(points.length<2)return; const signature=JSON.stringify([points,width]); let cached=this.dirtPathImages.get(signature);
    if(!cached){const margin=width,left=Math.min(...points.map(p=>p.x))-margin,top=Math.min(...points.map(p=>p.y))-margin;const w=Math.max(...points.map(p=>p.x))-left+margin,h=Math.max(...points.map(p=>p.y))-top+margin;const resolution=Math.min(2,2048/Math.max(w,h));const key=`deployment-dirt-${this.dirtPathSerial++}`;const texture=this.textures.createCanvas(key,Math.ceil(w*resolution),Math.ceil(h*resolution));if(!texture)return;
      const paint=(fraction:number)=>{const ctx=texture.context;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,texture.width,texture.height);ctx.scale(resolution,resolution);ctx.translate(-left,-top);const visible=routeFromCore(points,fraction);if(visible.length>1){ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();ctx.moveTo(visible[0].x,visible[0].y);for(const p of visible.slice(1))ctx.lineTo(p.x,p.y);ctx.strokeStyle='#574633';ctx.lineWidth=width*1.16;ctx.stroke();ctx.strokeStyle=this.dirtMaterials.surface(ctx,'dirt_road',{x:0,y:0},1);ctx.lineWidth=width;ctx.stroke();}texture.refresh();};
      cached={key,paint,progress:-1,image:this.add.image(left*BATTLE_WORLD_SCALE,top*BATTLE_WORLD_SCALE,key).setOrigin(0).setDisplaySize(w*BATTLE_WORLD_SCALE,h*BATTLE_WORLD_SCALE).setDepth(TACTICAL_HIGHWAY_DEPTH-.01)};this.dirtPathImages.set(signature,cached);
      if(this.dirtPathImages.size>4){const oldest=this.dirtPathImages.keys().next().value!;const item=this.dirtPathImages.get(oldest)!;item.image.destroy();this.textures.remove(item.key);this.dirtPathImages.delete(oldest);}
    }
    const frame=Math.min(1,Math.ceil(progress*52)/52);if(frame!==cached.progress){cached.paint(frame);cached.progress=frame;}cached.image.setAlpha(alpha).setVisible(true);
    if(progress<1){const tip=routeFromCore(points,progress).at(-1);if(tip){g.fillStyle(0xf1ce85,.65).fillCircle(tip.x,tip.y,width*.56);g.lineStyle(3,0xffe8ba,.75).strokeCircle(tip.x,tip.y,width*.78);}}
  }

  private drawDashedLine(g: Phaser.GameObjects.Graphics, a: { x: number; y: number }, b: { x: number; y: number }, width = 5, color = 0xc2a55a): void {
    const distance = Math.hypot(b.x - a.x, b.y - a.y); const count = Math.floor(distance / 72); g.lineStyle(width, color, 0.58);
    for (let i = 0; i < count; i += 2) { const t1 = i / count; const t2 = Math.min(1, (i + 0.8) / count); g.lineBetween(Phaser.Math.Linear(a.x, b.x, t1), Phaser.Math.Linear(a.y, b.y, t1), Phaser.Math.Linear(a.x, b.x, t2), Phaser.Math.Linear(a.y, b.y, t2)); }
  }

  private ensureZombieSprite(id: string, type: ZombieState["type"]): void {
    if (this.zombieSprites.has(id)) return; const visual = ZOMBIE_VISUALS[type]; if (!this.textures.exists(visual.textureKey + "-0")) return;
    this.zombieSprites.set(id, this.add.image(0, 0, visual.textureKey + "-0").setOrigin(.5, .5).setDepth(ZOMBIE_SPRITE_DEPTH));
  }

  private retireZombieVisual(id: string, render: ZombieVisualState, died = true): void {
    const contract = this.snapshot?.contracts.find((entry) => entry.id === render.contractId); const reachedCore = contract ? Math.hypot(render.x - contract.corePosition.x, render.y - contract.corePosition.y) <= 90 : true;
    // Death audio must not depend on the randomized chance of leaving a decal.
    // Zombies that reach the core are retired here too, so keep those silent.
    if (died && contract && !reachedCore) { playBloodSplat(this.spatialAudioGainForSimulationPoint(render.x, render.y)); this.spawnBloodDecal(id, render); }
    this.zombieSprites.get(id)?.destroy(); this.zombieSprites.delete(id); this.renderedZombies.delete(id);
  }

  private spawnBloodDecal(id: string, render: ZombieVisualState): void {
    const spec = bloodDecalSpecForZombie(id); if (!spec || !this.textures.exists(spec.textureKey)) return; const point = this.theaterWorld ? this.toTheater(render) : render;
    const image = this.add.image(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, spec.textureKey).setDepth(BLOOD_DECAL_DEPTH).setRotation(spec.rotation).setAlpha(spec.alpha);
    image.setDisplaySize(spec.displaySize * spec.scale * BATTLE_WORLD_SCALE, spec.displaySize * spec.scale * BATTLE_WORLD_SCALE);
    this.bloodDecals.push({ image, bornAt: Date.now(), alpha: spec.alpha, worldX: point.x, worldY: point.y });
    while (this.bloodDecals.length > MAX_BLOOD_DECALS) this.bloodDecals.shift()?.image.destroy();
  }

  private updateZombieSprites(): void {
    const visibleAtBand = this.theaterWorld ? this.zoomBand === "base" : this.effectiveZoom() >= .52; let visible = 0;
    for (const [id, sprite] of this.zombieSprites) {
      const render = this.renderedZombies.get(id); if (!render) { sprite.setVisible(false); continue; } const point = this.theaterWorld ? this.toTheater(render) : render; const inView = visibleAtBand && this.pointInView(point.x, point.y, 500); sprite.setVisible(inView); if (!inView) continue;
      const visual = ZOMBIE_VISUALS[render.type];
      sprite.setTexture(`${visual.textureKey}-${Math.floor(render.walkPhase / (Math.PI * 2) * 8) % 8}`);
      sprite.setPosition(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE).setRotation(render.angle).setDisplaySize(visual.displaySize * BATTLE_WORLD_SCALE, visual.displaySize * BATTLE_WORLD_SCALE); visible++;
    }
    this.game.canvas.dataset.zombieSprites = String(visible);
  }

  private updateBloodDecals(now: number): void {
    const bandVisible = this.theaterWorld ? this.zoomBand === "base" : this.effectiveZoom() >= .78; const lifetime = BLOOD_DECAL_FADE_SECONDS * 1000;
    this.bloodDecals = this.bloodDecals.filter((decal) => { const age = now - decal.bornAt; if (age >= lifetime) { decal.image.destroy(); return false; } const visible = bandVisible && this.pointInView(decal.worldX, decal.worldY, 500); decal.image.setVisible(visible).setAlpha(decal.alpha * (1 - age / lifetime)); return true; });
    this.game.canvas.dataset.bloodDecals = String(this.bloodDecals.length);
  }

  private captureDestroyedBases(previous: Snapshot | undefined, next: Snapshot): void {
    if (!previous) return;
    const liveIds = new Set(next.bases.map((base) => base.id));
    for (const base of previous.bases) {
      if (liveIds.has(base.id) || this.baseWrecks.some((wreck) => wreck.baseId === base.id)) continue;
      const operation = next.warOperations.find((entry) => entry.id === base.operationId);
      if (operation?.status !== "failed") { this.baseSprites.get(base.id)?.destroy(); this.baseSprites.delete(base.id); continue; }
      const point = this.theaterWorld ? this.baseWorldPoint(base) : { x: base.coreX, y: base.coreY };
      const scale = this.baseVisualScale(); const angle = this.baseVisualAngle(base, previous);
      const image = this.add.image(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, BASE_VISUAL_ASSETS.destroyed.textureKey).setDepth(BASE_SPRITE_DEPTH).setRotation(angle).setDisplaySize(BASE_DISPLAY_WIDTH * scale * BATTLE_WORLD_SCALE, BASE_DISPLAY_HEIGHT * scale * BATTLE_WORLD_SCALE);
      this.baseWrecks.push({ baseId: base.id, image, bornAt: Date.now(), worldX: point.x, worldY: point.y, angle, scale });
      this.baseSprites.get(base.id)?.destroy(); this.baseSprites.delete(base.id);
    }
  }

  private updateBaseWrecks(now: number): void {
    const lifetime = DESTROYED_BASE_WRECK_SECONDS * 1000; const visibleBand = !this.theaterWorld || ["base", "local"].includes(this.zoomBand);
    this.baseWrecks = this.baseWrecks.filter((wreck) => { const age = now - wreck.bornAt; if (age >= lifetime) { wreck.image.destroy(); return false; } const fade = age > lifetime * .72 ? 1 - (age - lifetime * .72) / (lifetime * .28) : 1; wreck.image.setVisible(visibleBand && this.pointInView(wreck.worldX, wreck.worldY, 900)).setAlpha(.92 * fade); return true; });
    this.game.canvas.dataset.baseWrecks = String(this.baseWrecks.length);
  }

  private baseVisualScale(): number { return this.theaterWorld ? .58 : .86; }

  private baseVisualAngle(base: BaseState, snapshot = this.snapshot): number {
    if (base.status === "packed" && base.heading !== undefined) return base.heading;
    const contract = snapshot?.contracts.find((entry) => entry.baseId === base.id); const routes = contract?.routes ?? []; const activeId = contract?.activeRouteIds?.[0]; const route = routes.find((entry) => entry.id === activeId) ?? routes[0]; const raw = route?.points ?? contract?.routePoints;
    if (!raw?.length || !this.theaterWorld) return baseFacingAngle(raw);
    const anchor = this.simulationAnchor(); const world = this.baseWorldPoint(base); const projected = raw.map((point) => ({ x: world.x + (point.x - anchor.x) * TACTICAL_MAP_SCALE, y: world.y + (point.y - anchor.y) * TACTICAL_MAP_SCALE }));
    return baseFacingAngle(projected);
  }

  private ensureBaseSprite(base: BaseState, textureKey: string, angle: number, scale: number): Phaser.GameObjects.Image {
    let sprite = this.baseSprites.get(base.id);
    if (!sprite) { sprite = this.add.image(0, 0, textureKey).setDepth(BASE_SPRITE_DEPTH); this.baseSprites.set(base.id, sprite); }
    sprite.setTexture(textureKey).setPosition(base.coreX * BATTLE_WORLD_SCALE, base.coreY * BATTLE_WORLD_SCALE).setRotation(angle).setDisplaySize(BASE_DISPLAY_WIDTH * scale * BATTLE_WORLD_SCALE, BASE_DISPLAY_HEIGHT * scale * BATTLE_WORLD_SCALE).setAlpha(1).setVisible(true); this.game.canvas.dataset.baseSprites = String(this.baseSprites.size);
    return sprite;
  }

  private drawZombieFallback(g: Phaser.GameObjects.Graphics, x: number, y: number, type: ZombieState["type"], phase: number): void {
    const size = type === "brute" ? 30 : type === "bloater" ? 24 : type === "armored" ? 20 : type === "runner" ? 15 : 18; const stride = Math.sin(phase) * 4; const color = ZOMBIE_COLORS[type];
    g.fillStyle(0x11140f, .72).fillEllipse(x + 4, y + 12, size * 1.7, size * .55); g.fillStyle(type === "armored" ? 0x343d3d : 0x292c25, 1).fillEllipse(x, y, size, size * 1.25); g.fillStyle(color, 1).fillCircle(x, y - size * .62, size * .3);
    g.fillEllipse(x - size * .58, y - 1 + stride, size * .3, size * .95).fillEllipse(x + size * .58, y - 1 - stride, size * .3, size * .95); g.fillStyle(0x171a16, 1).fillEllipse(x - size * .2, y + size * .62 - stride, size * .3, size * .65).fillEllipse(x + size * .2, y + size * .62 + stride, size * .3, size * .65);
  }

  private drawZombieBurnEffect(g: Phaser.GameObjects.Graphics, zombie: ZombieState, point: Vec2, size: number, now: number): void {
    void g; if (!isZombieBurning(zombie, now)) return; const seed = [...zombie.id].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
    let sprite = this.zombieCinderSprites.get(zombie.id); if (!sprite) { sprite = this.add.image(0, 0, "spark-cinders-cc0", 0).setDepth(PROJECTILE_EFFECT_DEPTH).setBlendMode(Phaser.BlendModes.ADD); this.zombieCinderSprites.set(zombie.id, sprite); }
    const frame = (Math.floor(now / 66) + seed) % 9; const display = Math.max(34, size * 2.5) * BATTLE_WORLD_SCALE; sprite.setVisible(true).setFrame(frame).setPosition(point.x * BATTLE_WORLD_SCALE, (point.y - size * .18) * BATTLE_WORLD_SCALE).setDisplaySize(display, display).setAlpha(.92);
  }

  private syncFieldEquipmentSprites(now: number, visible: boolean): void {
    if (!this.snapshot) return; const active = new Set<string>(); const position = (point: Vec2) => this.theaterWorld ? this.toTheater(point) : point;
    for (const satchel of this.snapshot.lootSatchels ?? []) { const key = `loot-${satchel.id}`; active.add(key); let image = this.fieldEquipmentSprites.get(key); if (!image) { image = this.add.image(0, 0, "loot-satchel").setDepth(PROJECTILE_EFFECT_DEPTH - .1); this.fieldEquipmentSprites.set(key, image); } const point = position(satchel); const bob = Math.sin(now / 180 + satchel.x) * 4; image.setVisible(visible).setPosition(point.x * BATTLE_WORLD_SCALE, (point.y + bob) * BATTLE_WORLD_SCALE).setDisplaySize(48 * BATTLE_WORLD_SCALE, 48 * BATTLE_WORLD_SCALE).setRotation(Math.sin(now / 300 + satchel.y) * .08); }
    for (const item of this.snapshot.placedEquipment ?? []) { const key = `placed-${item.id}`; active.add(key); let image = this.fieldEquipmentSprites.get(key); if (!image) { image = this.add.image(0, 0, equipmentTextureKey(item.type)).setDepth(PROJECTILE_EFFECT_DEPTH - .15); this.fieldEquipmentSprites.set(key, image); } const point = position(item); const wide = item.type === "barbedWire"; image.setVisible(visible).setPosition(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE).setDisplaySize((wide ? 92 : 54) * BATTLE_WORLD_SCALE, (wide ? 50 : 54) * BATTLE_WORLD_SCALE).setAlpha(item.type === "roadFlare" ? .84 + Math.sin(now / 90) * .14 : .96); }
    for (const [key, image] of this.fieldEquipmentSprites) if (!active.has(key)) { image.destroy(); this.fieldEquipmentSprites.delete(key); }
  }

  private drawDynamic(): void {
    this.baseSprites.forEach((sprite) => sprite.setVisible(false)); this.spawnerMarkers.forEach((marker) => marker.image.setVisible(false)); this.zombieCinderSprites.forEach((sprite) => sprite.setVisible(false)); this.fieldEquipmentSprites.forEach((sprite) => sprite.setVisible(false)); this.baseEffectGraphics.clear().setPosition(0, 0); this.turretRenderer.beginFrame();
    if (this.theaterWorld) { this.drawTheaterDynamic(); return; }
    if (!this.snapshot) return; const g = this.dynamicGraphics; const hud = this.zombieHudGraphics; const effects = this.projectileEffectGraphics; const now = Date.now(); const zoom = this.effectiveZoom(); g.clear(); hud.clear(); effects.clear(); this.dirtPathImages.forEach(p=>p.image.setVisible(false));
    for (const candidateTerritory of this.snapshot.territories) {
      const color = STATE_COLORS[candidateTerritory.state]; const polygon = candidateTerritory.polygon ?? [{ x: candidateTerritory.x, y: candidateTerritory.y }, { x: candidateTerritory.x + candidateTerritory.w, y: candidateTerritory.y }, { x: candidateTerritory.x + candidateTerritory.w, y: candidateTerritory.y + candidateTerritory.h }, { x: candidateTerritory.x, y: candidateTerritory.y + candidateTerritory.h }];
      if (!this.polygonInView(polygon, 260)) continue;
      const alpha = candidateTerritory.state === "overrun" ? .2 : candidateTerritory.state === "infested" ? .13 : .08;
      g.fillStyle(color, alpha).fillPoints(polygon, true); g.lineStyle(candidateTerritory.state === "reclaiming" ? 7 : 3, color, .42).strokePoints(polygon, true);
      if (candidateTerritory.state === "overrun") {
        const center = candidateTerritory.labelPoint ?? { x: candidateTerritory.x + candidateTerritory.w / 2, y: candidateTerritory.y + candidateTerritory.h / 2 };
        for (let ring = 0; ring < 4; ring++) g.lineStyle(18 - ring * 3, 0x2b090c, .1).strokeCircle(center.x + ring * 55, center.y + ring * 30, 170 + ring * 95);
      }
    }
    const player = this.localPlayer(); const localBase = this.localBase();
    if (zoom >= .28) for (const town of this.world?.towns ?? []) if (this.pointInView(town.x, town.y, 150)) this.drawTown(g, town.x, town.y, town.kind);
    if (zoom >= .32) for (const infestation of this.world?.infestations ?? []) if (this.pointInView(infestation.x, infestation.y, 180)) this.drawInfestation(g, infestation.x, infestation.y, infestation.kind, now);

    if (this.debugMode && zoom < .3 && this.lotSelectionMode) for (const candidateTerritory of this.snapshot.territories) {
      const availableCount = this.snapshot.lots.filter((lot) => lot.territoryId === candidateTerritory.id && ["empty", "reserved", "overrun"].includes(lot.status)).length;
      if (!availableCount) continue; const center = candidateTerritory.labelPoint ?? { x: candidateTerritory.x + candidateTerritory.w / 2, y: candidateTerritory.y + candidateTerritory.h / 2 };
      g.fillStyle(0x0c1210, .9).fillRoundedRect(center.x - 30, center.y + 65, 60, 38, 8); g.lineStyle(4, 0x73d4bd, .8).strokeRoundedRect(center.x - 30, center.y + 65, 60, 38, 8);
      for (let i = 0; i < Math.min(3, availableCount); i++) g.fillStyle(0x73d4bd, .85).fillRect(center.x - 15 + i * 12, center.y + 80, 7, 7);
    }
    if (this.debugMode && zoom <= .62) for (const operation of this.snapshot.warOperations ?? []) { if (!["staging", "active", "survived"].includes(operation.status) && now - operation.updatedAt > 60000) continue; if (operation.visibleMarkerX === undefined || operation.visibleMarkerY === undefined || !this.pointInView(operation.visibleMarkerX, operation.visibleMarkerY, 180)) continue; this.drawOperationMarker(g, operation.visibleMarkerX, operation.visibleMarkerY, operation.isAI, operation.kind, operation.status, now, operation.squadBeaconBuilt); }
    for (const lot of this.snapshot.lots) {
      const isSelected = lot.id === this.selectedLotId; const isHovered = lot.id === this.hoveredLotId; const available = lot.status === "empty" || lot.ownerPlayerId === player?.id; const color = lot.status === "overrun" ? 0xd24d42 : lot.status === "reserved" ? 0xe0bd5d : lot.status === "occupied" ? 0xb9dce0 : available ? 0x72c9ac : 0x555a50;
      if (!isSelected && localBase?.lotId !== lot.id && !this.pointInView(lot.x, lot.y, 220)) continue;
      if (this.debugMode && zoom >= .3 && lot.status !== "occupied") {
        const visibleAlpha = isSelected || isHovered || this.lotSelectionMode ? (available ? .95 : .3) : .22;
        if (zoom < .6) {
          const pulse = isSelected ? 1 + Math.sin(now / 130) * .18 : 1; g.fillStyle(0x111511, .9).fillCircle(lot.x, lot.y, 13 * pulse); g.lineStyle(isSelected ? 5 : 3, color, visibleAlpha).strokeCircle(lot.x, lot.y, (isSelected ? 16 : 10) * pulse); g.fillStyle(color, visibleAlpha).fillRect(lot.x - 4, lot.y - 4, 8, 8);
        } else {
          if (lot.drivewayPoints?.length) { g.lineStyle(10, 0x17140f, .95); this.strokePolyline(g, lot.drivewayPoints); g.lineStyle(5, 0x745638, .9); this.strokePolyline(g, lot.drivewayPoints); }
          g.fillStyle(0x171b16, .92).fillRoundedRect(lot.x - 88, lot.y - 58, 176, 116, 10); g.fillStyle(color, isSelected ? .28 : .1).fillRoundedRect(lot.x - 82, lot.y - 52, 164, 104, 8);
          g.lineStyle(isSelected ? 7 : isHovered ? 5 : 3, isSelected ? 0xf0d884 : color, visibleAlpha).strokeRoundedRect(lot.x - 88, lot.y - 58, 176, 116, 10);
          g.fillStyle(color, visibleAlpha).fillRect(lot.x - 17, lot.y - 12, 34, 24); g.fillStyle(0x10130f, 1).fillRect(lot.x - 9, lot.y - 5, 18, 17);
        }
      }
      if (this.buildOpen && zoom >= .58 && localBase?.lotId === lot.id) for (const pad of lot.pads) {
        g.fillStyle(pad.occupiedBy ? 0x20251f : 0x6cbf92, pad.occupiedBy ? 0.7 : 0.18).fillCircle(pad.x, pad.y, pad.radius);
        g.lineStyle(5, pad.occupiedBy ? 0x525b4c : 0x89e0ad, 0.8).strokeCircle(pad.x, pad.y, pad.radius);
        if (!pad.occupiedBy) { g.lineStyle(3, 0x89e0ad, 0.65).lineBetween(pad.x - 13, pad.y, pad.x + 13, pad.y); g.lineBetween(pad.x, pad.y - 13, pad.x, pad.y + 13); }
      }
    }
    const focusedLot = this.snapshot.lots.find((entry) => entry.id === this.selectedLotId);
    if (focusedLot && localBase && zoom >= .32 && localBase.status !== "packed") this.drawRoutePreview(g, routeForLot(focusedLot).points);
    if (this.debugMode) this.drawDebug(g);
    for (const base of this.snapshot.bases) if (this.pointInView(base.coreX, base.coreY, 240)) this.drawBase(g, base, now);
    if (zoom >= .58) for (const tower of this.snapshot.towers.filter((entry) => !entry.packed)) {
      if (!this.pointInView(tower.x, tower.y, 160)) continue;
      if (tower.type === "squadBeacon") { this.drawSquadBeacon(g, tower.x, tower.y, tower.level, now); continue; }
      const color = Phaser.Display.Color.HexStringToColor(TOWER_INFO[tower.type].color).color;
      const pose = this.turretRenderer.render(tower, tower, now);
      if (tower.id === this.hoveredTowerId) { g.lineStyle(2, color, .2).strokeCircle(tower.x, tower.y, tower.range); }
      if (tower.shotX !== undefined) this.turretRenderer.drawFiringEffect(effects, tower, pose, { x: tower.shotX, y: tower.shotY ?? tower.y }, now);
    }
    this.turretRenderer.endFrame(new Set(this.snapshot.towers.filter((tower) => tower.type !== "squadBeacon" && !tower.packed).map((tower) => tower.id)));
    if (zoom >= .52) for (const zombie of this.snapshot.zombies) {
      const render = this.renderedZombies.get(zombie.id) ?? initialZombieVisual(zombie); const size = ZOMBIE_VISUALS[zombie.type].displaySize * .42;
      if (!this.pointInView(render.x, render.y, 130)) continue;
      g.fillStyle(0x11140f, 0.75).fillEllipse(render.x + 5, render.y + 11, size * 2.1, size * 0.75);
      if (!this.zombieSprites.has(zombie.id)) this.drawZombieFallback(g, render.x, render.y, zombie.type, render.walkPhase);
      this.drawZombieBurnEffect(effects, zombie, render, size, now);
      if (zombie.hp < zombie.maxHp) { hud.fillStyle(0x321717, 1).fillRect(render.x - 18, render.y - size - 16, 36, 4); hud.fillStyle(0xbadd64, 1).fillRect(render.x - 18, render.y - size - 16, 36 * Math.max(0, zombie.hp / zombie.maxHp), 4); }
    }
    this.syncFieldEquipmentSprites(now, zoom >= .52);
    this.drawHitMarkers(effects, now, false, zoom >= .78);
  }

  private drawTheaterDynamic(): void {
    if (!this.snapshot || !this.theaterWorld) return; const g = this.dynamicGraphics; const hud = this.zombieHudGraphics; const effects = this.projectileEffectGraphics; const territories = this.territoryOverlayGraphics; const now = Date.now(); const zoom = this.effectiveZoom(); const band = this.zoomBand; const player = this.localPlayer(); const base = this.localBase(); const visualScale = .55; this.dirtPathImages.forEach(p=>p.image.setVisible(false)); g.clear().setPosition(0, 0); hud.clear().setPosition(0, 0); effects.clear().setPosition(0, 0); territories.clear().setPosition(0, 0);
    if (this.debugMode && ["city", "regional", "country"].includes(band)) for (const territory of earthTerritories) { const sector = this.snapshot.warSectors.find((entry) => entry.regionId === territory.id || entry.id === territory.id); const state = sector?.state === "secure" ? "safe" : sector?.state ?? (territory.infestation >= 72 ? "infested" : territory.infestation >= 38 ? "contested" : "safe"); const color = STATE_COLORS[state]; for (const points of tacticalTerritoryShapes(territory)) { if (!this.polygonInView(points, 6000)) continue; const alpha = state === "overrun" ? .28 : state === "infested" ? .17 : state === "contested" ? .1 : .045; territories.fillStyle(color, alpha).fillPoints(points, true); } }
    if (this.debugMode && ["city", "regional", "country"].includes(band)) for (const lot of this.theaterWorld.lots) { const point = theaterPoint(lot.lat, lot.lon); if (!this.pointInView(point.x, point.y, 5000)) continue; const live = this.snapshot.lots.find((entry) => entry.id === lot.tacticalLotId); const selected = live?.id === this.selectedLotId; const status = live?.status ?? lot.status; const color = status === "occupied" ? 0xdbece6 : status === "overrun" ? 0xe15c46 : status === "blocked" ? 0x777a70 : 0x72d4b2; const radius = (selected ? 10 : 6) / Math.max(.003, zoom); g.fillStyle(0x0c110d, .92).fillCircle(point.x, point.y, radius * 1.55); g.lineStyle(2 / Math.max(.003, zoom), color, .9).strokeCircle(point.x, point.y, radius); if (status === "available" || status === "empty") g.fillStyle(color, .9).fillCircle(point.x, point.y, radius * .38); }
    if (this.debugMode) for (const operation of this.snapshot.warOperations ?? []) { if (!["staging", "active", "survived"].includes(operation.status) && now - operation.updatedAt > 60000) continue; const point = operation.visibleLat !== undefined && operation.visibleLon !== undefined ? theaterPoint(operation.visibleLat, operation.visibleLon) : operation.visibleMarkerX !== undefined && operation.visibleMarkerY !== undefined ? { x: operation.visibleMarkerX, y: operation.visibleMarkerY } : undefined; if (!point || !this.pointInView(point.x, point.y, 6000)) continue; const color = operation.kind === "reclaim" ? 0xf0c45d : operation.joinable ? 0x67efe0 : operation.isAI ? 0xb5c876 : 0x67dfd7; const radius = (operation.isAI ? 5 : 7) / Math.max(.003, zoom); g.fillStyle(0x0b100d, .92).fillCircle(point.x, point.y, radius * 1.5); g.lineStyle(2 / Math.max(.003, zoom), color, .88).strokeCircle(point.x, point.y, radius); g.fillStyle(color, .9).fillCircle(point.x, point.y, radius * .4); }
    if (["base", "local", "city"].includes(band)) for (const settlement of this.theaterWorld.settlements) { const point = theaterPoint(settlement.lat, settlement.lon); if (!this.pointInView(point.x, point.y, 2500)) continue; const radius = (band === "city" ? 3.5 : 5) / Math.max(.02, zoom); const color = settlement.threat >= 4 ? 0xd56147 : 0xd4b968; g.fillStyle(0x111510, .8).fillPoints([{ x: point.x, y: point.y - radius * 1.6 }, { x: point.x + radius * 1.6, y: point.y }, { x: point.x, y: point.y + radius * 1.6 }, { x: point.x - radius * 1.6, y: point.y }], true); g.fillStyle(color, .72).fillPoints([{ x: point.x, y: point.y - radius }, { x: point.x + radius, y: point.y }, { x: point.x, y: point.y + radius }, { x: point.x - radius, y: point.y }], true); }
    if (["base", "local"].includes(band)) {
      for (const town of this.world?.towns ?? []) { const point = this.toTheater(town); if (this.pointInView(point.x, point.y, 500)) this.drawTown(g, point.x, point.y, town.kind); }
      for (const infestation of this.world?.infestations ?? []) { const point = this.toTheater(infestation); if (this.pointInView(point.x, point.y, 700)) this.drawInfestation(g, point.x, point.y, infestation.kind, now); }
    }
    const localLot = base ? this.snapshot.lots.find((entry) => entry.id === base.lotId) : this.snapshot.lots.find((entry) => entry.id === this.selectedLotId); const localContract = base ? this.snapshot.contracts.find((entry) => entry.baseId === base.id) : undefined;
    if (localLot && localContract && base?.status !== "packed" && band === "local") this.drawContractPreview(g, localContract, localLot, now);
    const routeOverviewStyle = TACTICAL_ROUTE_OVERVIEW_STYLE[band];
    if (localContract && base?.status !== "packed" && routeOverviewStyle) { const routes = localContract.routes ?? []; const activeIds = new Set(localContract.activeRouteIds?.length ? localContract.activeRouteIds : routes.slice(0, 1).map((route) => route.id)); for (const route of routes.filter((entry) => activeIds.has(entry.id))) { const points = (route.points ?? []).map((entry) => this.toTheater(entry)); if (!points.some((point) => this.pointInView(point.x, point.y, 6000))) continue; this.drawGeneratedDirtPath(g, points, routeOverviewStyle.outerWidth, routeOverviewStyle.alpha, false); } }
    if (localLot && band === "base") { const point = this.toTheater(localLot); const selected = localLot.id === this.selectedLotId; if (!base) { g.fillStyle(0x171b16, .92).fillRoundedRect(point.x - 88 * visualScale, point.y - 58 * visualScale, 176 * visualScale, 116 * visualScale, 6); g.lineStyle(selected ? 4 : 2, selected ? 0xf0d884 : 0x72c9ac, .9).strokeRoundedRect(point.x - 88 * visualScale, point.y - 58 * visualScale, 176 * visualScale, 116 * visualScale, 6); } if (this.buildOpen) for (const pad of localLot.pads) { const padPoint = this.toTheater(pad); const radius = pad.radius * visualScale; g.fillStyle(pad.occupiedBy ? 0x171b17 : 0x6cbf92, pad.occupiedBy ? .28 : .24).fillCircle(padPoint.x, padPoint.y, radius); g.lineStyle(2.5, pad.occupiedBy ? 0x4b5249 : 0xa4f2c1, pad.occupiedBy ? .45 : .95).strokeCircle(padPoint.x, padPoint.y, radius); if (!pad.occupiedBy) { g.lineStyle(1.8, 0xa4f2c1, .85).lineBetween(padPoint.x - 7, padPoint.y, padPoint.x + 7, padPoint.y); g.lineBetween(padPoint.x, padPoint.y - 7, padPoint.x, padPoint.y + 7); } } if (localContract && base?.status !== "packed") this.drawContractPreview(g, localContract, localLot, now); }
    for (const convoy of this.snapshot.bases) { const point = this.baseWorldPoint(convoy); if (this.pointInView(point.x, point.y, 2000)) this.drawBase(g, { ...convoy, coreX: point.x, coreY: point.y }, now); }
    for (const convoy of this.snapshot.bases.filter(b => b.isAI && b.status !== "packed")) { const contract = this.snapshot.contracts.find(c => c.baseId === convoy.id); const lot = this.snapshot.lots.find(l => l.id === convoy.lotId); if (contract && lot && ["base", "local"].includes(band) && this.pointInView(this.baseWorldPoint(convoy).x, this.baseWorldPoint(convoy).y, 3000)) this.drawContractPreview(g, contract, lot, now); }
    if (band === "base") for (const tower of this.snapshot.towers.filter((entry) => !entry.packed)) { const point = this.toTheater(tower); if (!this.pointInView(point.x, point.y, 500)) continue; if (tower.type === "squadBeacon") { this.drawSquadBeacon(g, point.x, point.y, tower.level, now); continue; } const color = Phaser.Display.Color.HexStringToColor(TOWER_INFO[tower.type].color).color; const shot = tower.shotX === undefined ? undefined : this.toTheater({ x: tower.shotX, y: tower.shotY ?? tower.y }); const visualTower = { ...tower, x: point.x, y: point.y, shotX: shot?.x, shotY: shot?.y }; const pose = this.turretRenderer.render(visualTower, point, now, true); if (tower.id === this.hoveredTowerId) g.lineStyle(1.8, color, .2).strokeCircle(point.x, point.y, tower.range * TACTICAL_MAP_SCALE); if (shot) this.turretRenderer.drawFiringEffect(effects, visualTower, pose, shot, now); }
    this.turretRenderer.endFrame(new Set(this.snapshot.towers.filter((tower) => tower.type !== "squadBeacon" && !tower.packed).map((tower) => tower.id)));
    if (band === "base") for (const zombie of this.snapshot.zombies) { const render = this.renderedZombies.get(zombie.id) ?? initialZombieVisual(zombie); const point = this.toTheater(render); if (!this.pointInView(point.x, point.y, 500)) continue; const size = ZOMBIE_VISUALS[zombie.type].displaySize * .42; g.fillStyle(0x11140f, .75).fillEllipse(point.x + 5, point.y + 11, size * 2.1, size * .75); if (!this.zombieSprites.has(zombie.id)) this.drawZombieFallback(g, point.x, point.y, zombie.type, render.walkPhase); this.drawZombieBurnEffect(effects, zombie, point, size, now); if (zombie.hp < zombie.maxHp) { hud.fillStyle(0x321717, 1).fillRect(point.x - 18, point.y - size - 16, 36, 4); hud.fillStyle(0xbadd64, 1).fillRect(point.x - 18, point.y - size - 16, 36 * Math.max(0, zombie.hp / zombie.maxHp), 4); } }
    this.syncFieldEquipmentSprites(now, band === "base"); this.drawHitMarkers(effects, now, true, band === "base");
  }

  private spawnBloodHit(worldX: number, worldY: number, lethal: boolean): void {
    const textureKey = BLOOD_DECAL_ASSETS[0].textureKey; if (!this.textures.exists(textureKey)) return;
    const point = this.theaterWorld ? this.toTheater({ x: worldX, y: worldY }) : { x: worldX, y: worldY };
    const image = this.add.image(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, textureKey).setDepth(PROJECTILE_EFFECT_DEPTH).setRotation(Math.random() * Math.PI * 2);
    this.hitMarkers.push({ image, worldX, worldY, bornAt: Date.now(), lethal });
    while (this.hitMarkers.length > 60) this.hitMarkers.shift()?.image.destroy();
  }

  private captureCombatFeedback(previous: Snapshot | undefined, current: Snapshot): void {
    if (!previous) return; const previousZombies = new Map(previous.zombies.map((zombie) => [zombie.id, zombie])); const currentZombies = new Map(current.zombies.map((zombie) => [zombie.id, zombie])); const marked: Array<{ x: number; y: number }> = []; const liveTowerIds = new Set(current.towers.map((tower) => tower.id));
    for (const towerId of this.lastAudibleShotAt.keys()) if (!liveTowerIds.has(towerId)) this.lastAudibleShotAt.delete(towerId);
    for (const tower of current.towers) { const lastPlayedAt = this.lastAudibleShotAt.get(tower.id) ?? 0; if (tower.lastFiredAt <= lastPlayedAt || tower.lastFiredAt <= 0) continue; this.lastAudibleShotAt.set(tower.id, tower.lastFiredAt); playTowerShot(tower.type, tower.id, this.spatialAudioGainForSimulationPoint(tower.x, tower.y)); if (tower.shotX === undefined) continue; const y = tower.shotY ?? tower.y; if (tower.type !== "flame") { const nearestBefore = previous.zombies.reduce<ZombieState | undefined>((best, zombie) => Math.hypot(zombie.x - tower.shotX!, zombie.y - y) < Math.hypot((best?.x ?? Infinity) - tower.shotX!, (best?.y ?? Infinity) - y) ? zombie : best, undefined); this.spawnBloodHit(tower.shotX, y, Boolean(nearestBefore && !currentZombies.has(nearestBefore.id))); } marked.push({ x: tower.shotX, y }); }
    for (const zombie of current.zombies) { const before = previousZombies.get(zombie.id); if (!before || zombie.hp >= before.hp || isZombieBurning(zombie, current.serverTime)) continue; if (!marked.some((point) => Math.hypot(point.x - zombie.x, point.y - zombie.y) < 24)) this.spawnBloodHit(zombie.x, zombie.y, false); }
  }

  private drawHitMarkers(_g: Phaser.GameObjects.Graphics, now: number, theater: boolean, zoomVisible = true): void {
    const lifetime = 340; this.hitMarkers = this.hitMarkers.filter((marker) => { const age = now - marker.bornAt; if (age < lifetime) return true; marker.image.destroy(); return false; });
    for (const marker of this.hitMarkers) { const progress = Phaser.Math.Clamp((now - marker.bornAt) / lifetime, 0, 1); const point = theater ? this.toTheater({ x: marker.worldX, y: marker.worldY }) : { x: marker.worldX, y: marker.worldY }; const size = (marker.lethal ? 48 : 31) * (1 + progress * .2); marker.image.setPosition(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE).setDisplaySize(size * BATTLE_WORLD_SCALE, size * BATTLE_WORLD_SCALE).setAlpha((1 - progress) * .88).setVisible(zoomVisible && this.pointInView(point.x, point.y, 120)); }
  }

  private drawBase(g: Phaser.GameObjects.Graphics, base: BaseState, now: number): void {
    const friendly = base.ownerPlayerId === this.network.localId; const color = friendly ? 0x64d8d4 : base.kind === "reclaim" ? 0xf2c45f : 0xb5c376;
    const zoom = this.effectiveZoom(); if (zoom < .55 && base.status !== "packed") { const radius = (friendly ? 4 : 3) / zoom; g.fillStyle(0x10130f, .9).fillCircle(base.coreX, base.coreY, radius * 1.35); g.fillStyle(color, 1).fillCircle(base.coreX, base.coreY, radius); g.lineStyle(1.2 / zoom, color, .55).strokeCircle(base.coreX, base.coreY, radius * 1.35); if (base.joinable) { const pulse = radius * (1.8 + Math.sin(now / 260) * .14); g.lineStyle(1.2 / zoom, 0x67dfd7, .7).strokeCircle(base.coreX, base.coreY, pulse); } return; }
    const scale = this.baseVisualScale(); const center = { x: base.coreX, y: base.coreY }; const angle = this.baseVisualAngle(base); const visual = baseVisualState(base, now);
    const sprite = this.ensureBaseSprite(base, visual.textureKey, angle, scale); if (visual.damaged && Math.sin(now / 105) < -.72) sprite.setAlpha(.84);
    const effects = this.baseEffectGraphics;
    if (visual.damaged) { const smokeOrigin = baseLocalPoint(center, -54 * scale, -21 * scale, angle); for (let puff = 0; puff < 3; puff++) { const drift = (now / 38 + puff * 11) % 30; effects.fillStyle(0x252925, .3 - drift / 130).fillCircle(smokeOrigin.x + Math.sin(now / 260 + puff) * 5 * scale, smokeOrigin.y - drift * scale, (5 + puff * 2) * scale); } const spark = baseLocalPoint(center, 37 * scale, 23 * scale, angle); const flash = Math.max(0, Math.sin(now / 47)); effects.lineStyle(1.5 * scale, 0xffb244, flash).lineBetween(spark.x - 5 * scale, spark.y - 4 * scale, spark.x + 5 * scale, spark.y + 4 * scale).lineBetween(spark.x + 3 * scale, spark.y - 6 * scale, spark.x - 2 * scale, spark.y + 5 * scale); }
    if (friendly) { this.game.canvas.dataset.baseVisualState = visual.mode; this.game.canvas.dataset.convoyWorldPosition = `${base.coreX.toFixed(2)},${base.coreY.toFixed(2)}`; this.game.canvas.dataset.convoyHeading = angle.toFixed(4); }
  }

  private drawSquadBeacon(g: Phaser.GameObjects.Graphics, x: number, y: number, level: number, now: number): void { const pulse = 20 + Math.sin(now / 210) * 4; g.fillStyle(0x111713, .95).fillRect(x - 12, y + 7, 24, 10); g.lineStyle(2.5, 0x67dfd7, .95).lineBetween(x, y + 7, x, y - 26); g.lineBetween(x, y - 16, x - 10, y + 4); g.lineBetween(x, y - 16, x + 10, y + 4); g.fillStyle(0xb8fff1, 1).fillCircle(x, y - 28, 4); for (let ring = 0; ring < level; ring++) g.lineStyle(1.7, 0x67dfd7, .55 - ring * .1).strokeCircle(x, y - 28, pulse + ring * 8); }

  private drawOperationMarker(g: Phaser.GameObjects.Graphics, x: number, y: number, isAI: boolean, kind: "defense" | "reclaim", status: string, now: number, joinable = false): void {
    const scale = Phaser.Math.Clamp(.32 / this.effectiveZoom(), .65, 1.7) * .62; const failed = status === "failed"; const evacuated = status === "evacuated"; const color = failed ? 0xe45f45 : evacuated ? 0x858a7d : joinable ? 0x67efe0 : kind === "reclaim" ? 0xf0c45d : isAI ? 0xb5c876 : 0x67dfd7; const pulse = ["staging", "active"].includes(status) ? 1 + Math.sin(now / 250 + x * .01) * .14 : 1; const radius = 22 * scale * pulse;
    g.fillStyle(0x0c100d, .9).fillCircle(x, y, radius + 9 * scale); g.lineStyle(4 * scale, color, evacuated ? .4 : .85).strokeCircle(x, y, radius); if (joinable) g.lineStyle(2.5 * scale, 0x9cfff0, .62).strokeCircle(x, y, radius + (11 + Math.sin(now / 190) * 3) * scale); if (failed) { g.lineStyle(6 * scale, color, .95).lineBetween(x - 12 * scale, y - 12 * scale, x + 12 * scale, y + 12 * scale); g.lineBetween(x + 12 * scale, y - 12 * scale, x - 12 * scale, y + 12 * scale); } else if (kind === "reclaim") { g.fillStyle(color, .9).fillTriangle(x, y - 12 * scale, x + 11 * scale, y + 10 * scale, x - 11 * scale, y + 10 * scale); } else { g.fillStyle(color, .9).fillRect(x - 8 * scale, y - 8 * scale, 16 * scale, 16 * scale); }
  }

  private drawTown(g: Phaser.GameObjects.Graphics, x: number, y: number, kind: string): void {
    const color = kind === "city" ? 0xd7b866 : kind === "bridge" ? 0x8db8ba : kind === "checkpoint" ? 0xc78c55 : 0xb8b9a5;
    g.fillStyle(0x0d100d, .95).fillCircle(x, y, kind === "city" ? 10 : 7); g.lineStyle(1.7, color, .9).strokeCircle(x, y, kind === "city" ? 8 : 6);
    if (kind === "radio_tower") { g.lineStyle(1.7, color, .9).lineBetween(x, y + 6, x, y - 8); g.lineBetween(x, y - 5, x - 5, y + 4); g.lineBetween(x, y - 5, x + 5, y + 4); }
    else if (kind === "bridge") { g.lineStyle(1.7, color, .9).lineBetween(x - 6, y - 4, x + 6, y - 4); g.lineBetween(x - 6, y + 4, x + 6, y + 4); }
    else { g.fillStyle(color, .9).fillRect(x - 3, y - 3, 6, 6); g.fillStyle(0x151914, 1).fillRect(x - 1, y - 1, 2, 4); }
  }

  private drawInfestation(g: Phaser.GameObjects.Graphics, x: number, y: number, kind: string, now: number): void {
    const pulse = 10 + Math.sin(now / 180 + x) * 2; g.fillStyle(0x2a0d0d, .55).fillCircle(x, y, pulse + 4); g.lineStyle(2, 0xd8583f, .55).strokeCircle(x, y, pulse);
    g.fillStyle(0xe36a45, .95).fillTriangle(x, y - 7, x + 7, y + 6, x - 7, y + 6); g.fillStyle(0x1b0d0c, 1).fillCircle(x - 2, y, 1.2).fillCircle(x + 2, y, 1.2);
    if (["hospital", "factory", "mall"].includes(kind)) g.lineStyle(1.7, 0xffaa6a, .65).lineBetween(x - 5, y + 8, x + 5, y + 8);
  }

  private drawRoutePreview(g: Phaser.GameObjects.Graphics, points: Vec2[], progress = 1): void { this.drawGeneratedDirtPath(g, points, 34, .96, true, progress); }

  private drawContractPreview(g: Phaser.GameObjects.Graphics, contract: DefenseContract | undefined, lot: RoadsideLot, now: number): void {
    const contractRoutes = contract?.routes?.length ? contract.routes : undefined; const activeIds = new Set(contract?.activeRouteIds?.length ? contract.activeRouteIds : contractRoutes?.slice(0, 1).map((entry) => entry.id));
    if (!contractRoutes) { this.drawRoutePreview(g, routeForLot(lot).points.map((entry) => this.toTheater(entry))); return; }
    for (const route of contractRoutes) {
      if (!activeIds.has(route.id)) continue; const points = route.points.map((entry) => this.toTheater(entry)); this.drawRoutePreview(g, points, contract?.deployedAt ? Phaser.Math.Clamp((now-contract.deployedAt)/ROUTE_ROLLOUT_MS,0,1) : 1);
      const spawn = contract?.spawnpoints?.find((entry) => entry.id === route.spawnpointId); if (spawn && contract) this.drawGravestoneSpawner(contract.id, { x: spawn.worldX, y: spawn.worldY }, now);
      const approach = this.toTheater(route.finalApproachPoint); g.lineStyle(2.2, 0xffc35c, .9).strokeCircle(approach.x, approach.y, 10); g.lineBetween(approach.x - 14, approach.y, approach.x + 14, approach.y); g.lineBetween(approach.x, approach.y - 14, approach.x, approach.y + 14);
    }
  }

  private drawGravestoneSpawner(contractId: string, spawn: Vec2, now: number): void {
    const point = this.theaterWorld ? this.toTheater(spawn) : spawn; let marker = this.spawnerMarkers.get(contractId);
    if (!marker) { marker = { image: this.add.image(0, 0, "zombie-spawn-gravestone").setDepth(ZOMBIE_SPRITE_DEPTH - .08), bornAt: now }; this.spawnerMarkers.set(contractId, marker); }
    const progress = Phaser.Math.Clamp((now - marker.bornAt) / 720, 0, 1); const rise = Phaser.Math.Easing.Back.Out(progress); const size = 54 * (.52 + rise * .48) * BATTLE_WORLD_SCALE;
    marker.image.setVisible(true).setPosition(point.x * BATTLE_WORLD_SCALE, (point.y + (1 - rise) * 22) * BATTLE_WORLD_SCALE).setDisplaySize(size, size).setAlpha(.45 + progress * .55);
  }

  private drawDebug(g: Phaser.GameObjects.Graphics): void {
    for (const roadNode of this.world?.roadNodes ?? []) { g.fillStyle(0x62e7db, .9).fillCircle(roadNode.x, roadNode.y, 7); g.lineStyle(2, 0x0b1110, 1).strokeCircle(roadNode.x, roadNode.y, 9); }
    for (const candidateTerritory of this.world?.territories ?? []) for (const point of candidateTerritory.polygon ?? []) { g.fillStyle(0xfff08a, .9).fillRect(point.x - 4, point.y - 4, 8, 8); }
  }

  private rebuildDebugLabels(): void {
    this.debugLabels.forEach((label) => label.destroy()); this.debugLabels = [];
    if (!this.debugMode || !this.world) return;
    if (this.theaterWorld) {
      for (const stamp of this.theaterWorld.roadStamps ?? []) { const point = theaterPoint(stamp.anchor.lat, stamp.anchor.lon); this.debugLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, (point.y - 70) * BATTLE_WORLD_SCALE, `${stamp.kind} // ${stamp.id}`, { fontFamily: "monospace", fontSize: `${48 * BATTLE_WORLD_SCALE}px`, color: "#67e3d5", backgroundColor: "#071816dd", padding: { x: 8 * BATTLE_WORLD_SCALE, y: 4 * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(8).setData({ logicalX: point.x, logicalY: point.y })); }
      for (const exit of this.theaterWorld.roadExits ?? []) { const point = theaterPoint(exit.lat, exit.lon); this.debugLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, `${exit.id} // ${exit.importance}`, { fontFamily: "monospace", fontSize: `${58 * BATTLE_WORLD_SCALE}px`, color: "#ffe178", backgroundColor: "#171107dd", padding: { x: 8 * BATTLE_WORLD_SCALE, y: 4 * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(8).setData({ logicalX: point.x, logicalY: point.y })); }
      for (const poi of this.theaterWorld.roadPois ?? []) { const point = theaterPoint(poi.lat, poi.lon); this.debugLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, (point.y + 75) * BATTLE_WORLD_SCALE, `${poi.kind} // ${poi.id}`, { fontFamily: "monospace", fontSize: `${52 * BATTLE_WORLD_SCALE}px`, color: "#d68a55", backgroundColor: "#100d08dd", padding: { x: 8 * BATTLE_WORLD_SCALE, y: 4 * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(8).setData({ logicalX: point.x, logicalY: point.y })); }
      for (const road of this.theaterWorld.roads.filter((entry) => !entry.purpose)) { const source = road.pointLatLon[Math.floor(road.pointLatLon.length / 2)]; const point = theaterPoint(source.lat, source.lon); this.debugLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, point.y * BATTLE_WORLD_SCALE, `WARNING: ${road.id} HAS NO PURPOSE`, { fontFamily: "monospace", fontSize: `${56 * BATTLE_WORLD_SCALE}px`, color: "#ff6b5f", backgroundColor: "#240906ee" }).setOrigin(.5).setDepth(9).setData({ logicalX: point.x, logicalY: point.y })); }
      for (const issue of this.theaterWorld.roadValidationIssues ?? []) { const road = this.theaterWorld.roads.find((entry) => issue.roadIds.includes(entry.id)); const source = road?.pointLatLon[Math.floor(road.pointLatLon.length / 2)]; if (!source) continue; const point = theaterPoint(source.lat, source.lon); this.debugLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, (point.y + 45) * BATTLE_WORLD_SCALE, `${issue.code}: ${issue.message}`, { fontFamily: "monospace", fontSize: `${48 * BATTLE_WORLD_SCALE}px`, color: "#ff6356", backgroundColor: "#240906ee" }).setOrigin(.5).setDepth(9).setData({ logicalX: point.x, logicalY: point.y })); }
      return;
    }
    for (const roadNode of this.world.roadNodes ?? []) this.debugLabels.push(this.add.text((roadNode.x + 10) * BATTLE_WORLD_SCALE, (roadNode.y - 12) * BATTLE_WORLD_SCALE, roadNode.id, { fontFamily: "monospace", fontSize: `${11 * BATTLE_WORLD_SCALE}px`, color: "#71e4dc", backgroundColor: "#07100ddd", padding: { x: 3 * BATTLE_WORLD_SCALE, y: 2 * BATTLE_WORLD_SCALE } }).setDepth(6));
    for (const candidateRoad of this.world.roads) { const point = candidateRoad.points[Math.floor(candidateRoad.points.length / 2)]; this.debugLabels.push(this.add.text(point.x * BATTLE_WORLD_SCALE, (point.y - 18) * BATTLE_WORLD_SCALE, candidateRoad.id, { fontFamily: "monospace", fontSize: `${10 * BATTLE_WORLD_SCALE}px`, color: "#f1d46f", backgroundColor: "#100d08dd", padding: { x: 3 * BATTLE_WORLD_SCALE, y: 2 * BATTLE_WORLD_SCALE } }).setOrigin(.5).setDepth(6)); }
    for (const lot of this.snapshot?.lots ?? []) this.debugLabels.push(this.add.text((lot.x + 10) * BATTLE_WORLD_SCALE, (lot.y + 8) * BATTLE_WORLD_SCALE, lot.id, { fontFamily: "monospace", fontSize: `${10 * BATTLE_WORLD_SCALE}px`, color: "#9be3d3", backgroundColor: "#07100ddd", padding: { x: 3 * BATTLE_WORLD_SCALE, y: 2 * BATTLE_WORLD_SCALE } }).setDepth(6));
  }

  private effectiveZoom(): number { return this.cameras.main.zoom * BATTLE_WORLD_SCALE; }
  private spatialAudioGainForSimulationPoint(x: number, y: number): number { const point = this.theaterWorld ? this.toTheater({ x, y }) : { x, y }; return this.spatialAudioGainAtWorldPoint(point.x, point.y); }
  private spatialAudioGainAtWorldPoint(x: number, y: number): number {
    const camera = this.cameras.main; const center = camera.worldView; const sourceX = x * BATTLE_WORLD_SCALE; const sourceY = y * BATTLE_WORLD_SCALE;
    const normalizedX = Math.abs(sourceX - center.centerX) / Math.max(1, center.width * .5); const normalizedY = Math.abs(sourceY - center.centerY) / Math.max(1, center.height * .5); const radialDistance = Math.hypot(normalizedX, normalizedY);
    const distanceGain = Phaser.Math.Clamp(1 - radialDistance * .62, 0, 1); const zoomGain = Phaser.Math.Clamp(Math.pow(Math.max(.001, this.effectiveZoom()) / .88, .65), .015, 1.2); const gain = Phaser.Math.Clamp(distanceGain * zoomGain, 0, 1.2);
    this.game.canvas.dataset.spatialAudioGain = gain.toFixed(3); return gain;
  }
  private pointInView(x: number, y: number, margin = 0): boolean { const view = this.cameras.main.worldView; const px = x * BATTLE_WORLD_SCALE; const py = y * BATTLE_WORLD_SCALE; const scaledMargin = margin * BATTLE_WORLD_SCALE; return px >= view.left - scaledMargin && px <= view.right + scaledMargin && py >= view.top - scaledMargin && py <= view.bottom + scaledMargin; }
  private polygonInView(points: Vec2[], margin = 0): boolean { if (!points.length) return false; const minX = Math.min(...points.map((point) => point.x)); const maxX = Math.max(...points.map((point) => point.x)); const minY = Math.min(...points.map((point) => point.y)); const maxY = Math.max(...points.map((point) => point.y)); const view = this.cameras.main.worldView; const scaledMargin = margin * BATTLE_WORLD_SCALE; return maxX * BATTLE_WORLD_SCALE >= view.left - scaledMargin && minX * BATTLE_WORLD_SCALE <= view.right + scaledMargin && maxY * BATTLE_WORLD_SCALE >= view.top - scaledMargin && minY * BATTLE_WORLD_SCALE <= view.bottom + scaledMargin; }
  private labelInView(label: Phaser.GameObjects.Text, margin = 0): boolean { return this.pointInView(label.getData("logicalX") as number, label.getData("logicalY") as number, margin); }

  private pointInPolygon(point: Vec2, polygon: Vec2[]): boolean {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) { const a = polygon[i]; const b = polygon[j]; if ((a.y > point.y) !== (b.y > point.y) && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside; }
    return inside;
  }

  private refreshHud(): void {
    if (!this.snapshot) return; const player = this.localPlayer(); const base = this.localBase(); const selectedLot = this.snapshot.lots.find((entry) => entry.id === this.selectedLotId); const hoveredLot = this.snapshot.lots.find((entry) => entry.id === this.hoveredLotId); const focusedLot = selectedLot ?? hoveredLot; const territory = this.snapshot.territories.find((entry) => entry.id === (focusedLot?.territoryId ?? base?.territoryId)); const contract = this.snapshot.contracts.find((entry) => entry.baseId === base?.id); const operation = (this.snapshot.warOperations ?? []).find((entry) => entry.id === player?.activeOperationId) ?? (this.snapshot.warOperations ?? []).find((entry) => entry.baseId === base?.id); const focusedSectorId = operation?.sectorId ?? sectorIdForTerritory(focusedLot?.territoryId ?? territory?.id); const sector = (this.snapshot.warSectors ?? []).find((entry) => entry.id === focusedSectorId); const allied = sector ? (this.snapshot.warOperations ?? []).filter((entry) => entry.sectorId === sector.id && ["staging", "active", "survived"].includes(entry.status)) : []; const liveHostiles = this.snapshot.zombies.filter((zombie) => zombie.contractId === contract?.id).length; const activeHorde = liveHostiles > 0 || Boolean(contract?.queue?.length); const deployment = base?.status === "packed" && this.world ? this.assessConvoySite(base, activeHorde) : undefined;
    this.refreshEquipmentUi();
    this.setText("scrap-value", String(player?.scrap ?? 0)); this.setText("fuel-value", String(Math.ceil(player?.fuel ?? 0))); this.setText("signal-value", String(player?.signal ?? 0)); const threatBase = this.localBase(); const threatPoint = threatBase ? theaterLatLon(this.baseWorldPoint(threatBase)) : undefined; this.setText("threat-value", threatPoint ? `${threatAt(threatPoint.lat, threatPoint.lon, this.snapshot?.warSectors).toFixed(1)}/10` : "—");
    this.setText("territory-name", sector?.name ?? territory?.name ?? "Choose USA land on the War Globe"); this.setText("territory-state", (sector?.state ?? territory?.state ?? "observer").toUpperCase());
    this.setText("sector-summary-name", sector?.name ?? territory?.name ?? "AMERICAS"); this.setText("sector-summary-state", (sector?.state ?? territory?.state ?? "observer").toUpperCase());
    const stateEl = document.querySelector<HTMLElement>("#territory-state")!; stateEl.className = `state ${sector?.state === "secure" ? "safe" : sector?.state ?? territory?.state ?? "safe"}`;
    this.setText("pressure-value", `${Math.round(sector?.pressure ?? territory?.pressure ?? 0)}% PRESSURE`); (document.querySelector<HTMLElement>("#pressure-fill")!).style.width = `${sector?.pressure ?? territory?.pressure ?? 0}%`;
    this.setText("sector-name", sector?.name ?? "NO OPERATION"); this.setText("sector-war-state", (sector?.state ?? "COMMANDER MODE").toUpperCase()); this.setText("sector-supply", sector ? `${Math.round(sector.supply)}%` : "—"); this.setText("sector-allied", sector ? `${allied.length} TOTAL · ${sector.aiOperationCount} AI` : "—"); this.setText("sector-contribution", String(operation?.contribution ?? 0));
    const coreHealth = document.querySelector<HTMLElement>("#core-health")!;
    if (base) { if (this.lastCoreId === base.id && this.lastCoreHp !== undefined && base.hp < this.lastCoreHp) this.triggerCoreHitEffect(this.lastCoreHp - base.hp, base.maxHp); this.lastCoreId = base.id; this.lastCoreHp = base.hp; const ratio = Phaser.Math.Clamp(base.hp / Math.max(1, base.maxHp), 0, 1); const visual = baseVisualState(base, Date.now()); coreHealth.hidden = false; coreHealth.dataset.state = visual.damaged ? "damaged" : visual.underAttack ? "underAttack" : visual.mode; this.setText("core-health-value", `${Math.ceil(base.hp)} / ${Math.ceil(base.maxHp)}`); this.setText("core-health-state", base.status === "packed" ? "MOBILE" : visual.protected ? "PROTECTED" : visual.underAttack ? "UNDER ATTACK" : visual.damaged ? "DAMAGED" : "ACTIVE"); const fill = document.querySelector<HTMLElement>("#core-health-fill")!; fill.style.width = `${ratio * 100}%`; fill.style.background = ratio <= .25 ? "#e25d4f" : ratio <= .55 ? "#d79a4c" : "#80d06d"; }
    else { coreHealth.hidden = true; this.lastCoreId = undefined; this.lastCoreHp = undefined; }
    if (base) {
      const setup = Math.max(0, Math.ceil((base.shieldEndsAt - Date.now()) / 1000)); this.setText("base-status", base.status === "setup" ? `SETUP SHIELD // ${setup}S` : base.status === "packed" ? `CONVOY MOBILE // ${Math.ceil(player?.fuel ?? 0)} FUEL` : `${base.status.toUpperCase()} // ${Math.ceil(base.hp)} HP`);
      const intermission = ["active", "underAttack"].includes(base.status) && Boolean(contract) && !activeHorde && contract!.nextWaveAt < Number.MAX_SAFE_INTEGER; const startCountdown = base.status === "setup" ? setup : Math.max(0, Math.ceil(((contract?.nextWaveAt ?? Date.now()) - Date.now()) / 1000));
      const startWave = document.querySelector<HTMLButtonElement>("#start-wave-button")!; startWave.hidden = base.status !== "setup" && !intermission; startWave.textContent = `START NOW · ${startCountdown}S`;
      this.setText("wave-value", contract ? `WAVE ${Math.max(1, contract.waveIndex)} // ${contract.status.toUpperCase()}` : "NO CONTRACT");
      this.setText("hud-wave-status", base.status === "packed" ? "CONVOY MOBILE" : setup > 0 ? `SETUP · ${setup}S` : liveHostiles ? `HORDE ACTIVE · WAVE ${Math.max(1, contract?.waveIndex ?? 1)}` : contract?.status === "survived" ? "WAVE CLEARED" : `WAVE ${Math.max(1, contract?.waveIndex ?? 1)} INCOMING`);
      this.setText("hud-objective", base.status === "packed" ? `${deployment?.message ?? "Drive to clear land"} · WASD to drive` : liveHostiles ? "Defend the command core" : "Build along the marked route");
      this.setText("contract-title", contract ? `WAVE ${Math.max(1, contract.waveIndex)} · ${contract.status.toUpperCase()}` : "NO ACTIVE CONTRACT");
      this.setText("zombie-value", `${this.snapshot.zombies.filter((zombie) => zombie.contractId === contract?.id).length} ON ROUTE`);
      const activeRouteIds = new Set(contract?.activeRouteIds?.length ? contract.activeRouteIds : contract?.routes?.slice(0, 1).map((entry) => entry.id)); const activeSources = contract?.routes?.filter((entry) => activeRouteIds.has(entry.id)).map((route) => contract.spawnpoints?.find((entry) => entry.id === route.spawnpointId)).filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)) ?? []; const danger = contract?.routeDanger ?? contract?.routes?.[0]?.routeDanger;
      this.setText("contract-source", activeSources.map((entry) => entry.name).join(" + ") || "ROADWATCH PENDING"); this.setText("contract-danger", danger ? (["LOW", "GUARDED", "MODERATE", "HIGH", "EXTREME"][danger - 1] ?? `LEVEL ${danger}`) : "—"); this.setText("contract-pads", contract?.buildPads?.length ? `${contract.buildPads.length} BESIDE ROUTE` : `${this.snapshot.lots.find((entry) => entry.id === base.lotId)?.pads.length ?? 0} AVAILABLE`);
    } else { document.querySelector<HTMLButtonElement>("#start-wave-button")!.hidden = true; this.setText("base-status", "NOT DEPLOYED"); this.setText("wave-value", "NO ACTIVE HORDE"); this.setText("hud-wave-status", "COMMANDER MODE"); this.setText("hud-objective", "Choose any USA land location on the War Globe"); this.setText("contract-title", "NO ACTIVE CONTRACT"); this.setText("zombie-value", `${this.snapshot.zombies.length} SHARED HOSTILES`); this.setText("contract-source", "—"); this.setText("contract-danger", "—"); this.setText("contract-pads", "—"); }
    this.setText("radio-message", this.snapshot.radio);
    this.refreshSquadPanel(base);
    const feedItems = this.snapshot.activityFeed ?? []; const feedSignature = feedItems.join("|"); if (feedSignature !== this.lastFeedSignature) { if (this.lastFeedSignature && this.activePanel !== "activity") this.activityUnread += Math.max(1, feedItems.length - this.lastFeedCount); this.lastFeedCount = feedItems.length; this.lastFeedSignature = feedSignature; const feed = document.querySelector<HTMLElement>("#sector-feed")!; feed.replaceChildren(...feedItems.slice(0, 8).map((text) => { const item = document.createElement("li"); item.textContent = text; return item; })); }
    const count = document.querySelector<HTMLElement>("#activity-count")!; count.hidden = this.activityUnread === 0; count.textContent = String(this.activityUnread);
    const buildButton = document.querySelector<HTMLButtonElement>("#build-button")!; buildButton.hidden = base?.status === "packed"; buildButton.disabled = !base || base.status === "packed"; buildButton.classList.toggle("active", this.buildOpen); buildButton.setAttribute("aria-expanded", String(this.buildOpen));
    const packButton = document.querySelector<HTMLButtonElement>("#pack-button")!; packButton.hidden = !base || base.status === "packed"; packButton.disabled = !base || base.status === "packed" || activeHorde; packButton.textContent = activeHorde ? "HORDE ACTIVE · CANNOT PACK" : "PACK UP & DRIVE  P"; packButton.title = activeHorde ? "Cannot pack during horde. Clear the wave first." : "Stow every owned turret and drive the command vehicle.";
    const convoyActions = document.querySelector<HTMLElement>("#convoy-actions")!; convoyActions.hidden = base?.status !== "packed"; convoyActions.classList.toggle("valid", Boolean(deployment?.valid)); const deployCore = document.querySelector<HTMLButtonElement>("#deploy-core-button")!; deployCore.disabled = !deployment?.valid; deployCore.title = deployment?.message ?? "Drive the command vehicle to clear dry land."; this.setText("deployment-validity", deployment?.message ?? "Find clear dry land"); const stowedCount = this.snapshot.towers.filter((entry) => entry.baseId === base?.id && entry.packed).length; this.setText("stowed-turrets", `STOWED TURRETS: ${stowedCount}`);
    const squadButton = document.querySelector<HTMLButtonElement>("#squad-button")!; squadButton.disabled = !(base?.squadBeaconLevel); squadButton.title = base?.squadBeaconLevel ? "Open squad controls." : "Build a Squad Beacon to open this.";
    document.querySelectorAll<HTMLButtonElement>("#tower-cards .tower-card").forEach((card) => { const type = card.dataset.type as TowerType; card.disabled = (player?.scrap ?? 0) < TOWER_INFO[type].cost; });
    const deploy = document.querySelector<HTMLButtonElement>("#deploy-button")!; const redeploy = document.querySelector<HTMLButtonElement>("#redeploy-button")!;
    if (!base) {
      redeploy.hidden = true; deploy.hidden = false; deploy.disabled = Boolean(selectedLot && !["empty", "reserved", "overrun"].includes(selectedLot.status));
      deploy.textContent = "OPEN WAR GLOBE FOR FREE ENTRY";
      this.setText("selection-copy", "Choose any supported USA land location on the War Globe. The convoy enters there; drive and deploy on clear land when ready.");
    } else {
      deploy.hidden = true; redeploy.hidden = !(selectedLot && selectedLot.status === "empty" && selectedLot.id !== base.lotId);
      redeploy.textContent = "PACK CONVOY // MOVE TO NEW SECTOR"; const firstRoute = contract?.routes?.find((entry) => (contract.activeRouteIds ?? []).includes(entry.id)) ?? contract?.routes?.[0]; const firstSource = contract?.spawnpoints?.find((entry) => entry.id === firstRoute?.spawnpointId); const fieldRoute = firstRoute?.roadIds.length === 0; const sourceCount = contract?.spawnpoints?.length ?? 1; const sourceLabel = fieldRoute ? sourceCount === 1 ? "field approach" : "field approaches" : sourceCount === 1 ? "road source" : "road sources"; this.setText("selection-copy", base.status === "packed" ? `DRIVING MODE // ${deployment?.message ?? "Find clear dry land"}\nFuel ${Math.ceil(player?.fuel ?? 0)} · Stowed turrets ${stowedCount}\nCoast to a stop, then press DEPLOY BASE [E].` : selectedLot && selectedLot.id !== base.lotId ? "New sector location selected. Packing refunds 75% of tower scrap; the next contract is generated where the base deploys." : contract ? `BASE CONTRACT // ${sector?.name ?? territory?.name ?? "AMERICAS"}\n${sourceCount} ${sourceLabel} detected · first horde: ${firstSource?.name ?? "nearest infected corridor"}\nHorde route confirmed from this deployed base location.` : "Hold this sector, or open the War Globe to choose the convoy's next front.");
    }
    this.updateBuildVisibility(); if (this.mapOpen) this.drawMapOverlay();
  }

  private refreshEquipmentUi(): void {
    const player = this.localPlayer(); const counts = new Map(player?.equipmentStash?.map((entry) => [entry.type, entry.count]) ?? []);
    document.querySelectorAll<HTMLButtonElement>("#equipment-bar [data-equipment]").forEach((button, index) => { const type = button.dataset.equipment as EquipmentType; const count = counts.get(type) ?? 0; const info = EQUIPMENT_INFO[type]; button.disabled = count <= 0; button.classList.toggle("selected", this.selectedEquipment === type); button.setAttribute("aria-label", `${index + 1}: ${info.name}. ${info.description} ${count} available.`); button.removeAttribute("title"); const countNode = button.querySelector<HTMLElement>(".equipment-count"); if (countNode) countNode.textContent = String(count); });
    this.setText("field-gear-total", String([...counts.values()].reduce((sum, count) => sum + count, 0)));
  }

  private detectRecoveredEquipment(snapshot: Snapshot): EquipmentType[] { const player = snapshot.players.find((entry) => entry.id === (snapshot.localPlayerId ?? this.network.localId)); const recovered: EquipmentType[] = []; for (const type of EQUIPMENT_TYPES) { const count = player?.equipmentStash?.find((entry) => entry.type === type)?.count ?? 0; if (this.equipmentCountsInitialized && count > (this.lastEquipmentCounts.get(type) ?? 0)) recovered.push(type); this.lastEquipmentCounts.set(type, count); } this.equipmentCountsInitialized = true; return recovered; }
  private flashRecoveredEquipment(type: EquipmentType): void { if (this.activePanel !== "gear") return; const button = document.querySelector<HTMLButtonElement>(`#equipment-bar [data-equipment="${type}"]`); if (!button) return; button.classList.remove("loot-highlight"); void button.offsetWidth; button.classList.add("loot-highlight"); window.setTimeout(() => button.classList.remove("loot-highlight"), 1250); }

  private toggleBuild(): void { const base = this.localBase(); if (!base) { this.showNotice("Deploy a command core before building.", true); return; } if (base.status === "packed") { this.showNotice("Turrets are stowed while the convoy is mobile.", true); return; } this.openHudPanel(this.buildOpen ? "none" : "build"); if (this.buildOpen) this.showNotice("Select a tower, then choose a glowing build pad."); }
  private toggleFieldGear(): void { playFieldGearRummage(); this.openHudPanel(this.activePanel === "gear" ? "none" : "gear"); }
  private openHudPanel(panel: HudPanel): void {
    if (panel === "squad" && !this.localBase()?.squadBeaconLevel) { this.showNotice("Build a Squad Beacon to open squad controls.", true); return; }
    this.activePanel = this.activePanel === panel ? "none" : panel; this.buildOpen = this.activePanel === "build";
    for (const candidate of ["sector", "contract", "squad", "activity", "help"] as const) { const element = document.querySelector<HTMLElement>(`#${candidate}-panel`); const open = this.activePanel === candidate; element?.classList.toggle("closed", !open); element?.setAttribute("aria-hidden", String(!open)); document.querySelector<HTMLElement>(`#${candidate}-button`)?.classList.toggle("active", open); }
    if (this.activePanel === "activity") { this.activityUnread = 0; const count = document.querySelector<HTMLElement>("#activity-count"); if (count) count.hidden = true; }
    document.querySelector<HTMLElement>("#help-button")?.classList.toggle("active", this.activePanel === "help");
    this.updateBuildVisibility(); this.drawDynamic();
  }
  private returnToWarGlobe(): void { if (this.snapshot && this.localBase()) { const contract = this.snapshot.contracts.find((entry) => entry.baseId === this.localBase()?.id); if (this.snapshot.zombies.some((entry) => entry.contractId === contract?.id)) { this.showNotice("Cannot pack the convoy while a horde is actively attacking.", true); return; } } document.querySelector<HTMLElement>("#hud")!.hidden = true; this.scene.start("GlobeDeployScene"); }
  private updateBuildVisibility(): void { const open = this.buildOpen && Boolean(this.localBase()); const menu = document.querySelector<HTMLElement>("#build-menu")!; menu.classList.toggle("closed", !open); menu.setAttribute("aria-hidden", String(!open)); const buildButton = document.querySelector<HTMLElement>("#build-button"); buildButton?.classList.toggle("active", open); buildButton?.setAttribute("aria-expanded", String(open)); const gearOpen = this.activePanel === "gear"; const gearMenu = document.querySelector<HTMLElement>("#field-gear-menu")!; gearMenu.classList.toggle("closed", !gearOpen); gearMenu.setAttribute("aria-hidden", String(!gearOpen)); const gearButton = document.querySelector<HTMLElement>("#field-gear-button"); gearButton?.classList.toggle("active", gearOpen); gearButton?.setAttribute("aria-expanded", String(gearOpen)); }
  private toggleMap(): void { this.mapOpen = !this.mapOpen; if (this.mapOpen) this.openHudPanel("none"); document.querySelector<HTMLElement>("#map-overlay")!.hidden = !this.mapOpen; if (this.mapOpen) this.drawMapOverlay(); }

  private drawMapOverlay(): void {
    if (this.theaterWorld) { this.drawTheaterMapOverlay(); return; }
    if (!this.snapshot || !this.world) return; const canvas = document.querySelector<HTMLCanvasElement>("#continent-map")!; const ctx = canvas.getContext("2d")!; ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#11130f"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const sx = canvas.width / this.world.worldWidth; const sy = canvas.height / this.world.worldHeight; const css: Record<TerritoryStateName, string> = { safe: "#72c7a1", contested: "#e2bd65", infested: "#e97845", overrun: "#a62f38", reclaiming: "#61d7db" }; const mapOutline = this.battleSeed?.territoryOutline ?? this.world.outline; ctx.save();
    if (mapOutline?.length) { ctx.beginPath(); mapOutline.forEach((point, index) => index ? ctx.lineTo(point.x * sx, point.y * sy) : ctx.moveTo(point.x * sx, point.y * sy)); ctx.closePath(); ctx.fillStyle = "#252a1f"; ctx.fill(); ctx.strokeStyle = "#6b735a"; ctx.lineWidth = 3; ctx.stroke(); ctx.clip(); }
    for (const candidateTerritory of this.snapshot.territories) {
      const polygon = candidateTerritory.polygon ?? [{ x: candidateTerritory.x, y: candidateTerritory.y }, { x: candidateTerritory.x + candidateTerritory.w, y: candidateTerritory.y }, { x: candidateTerritory.x + candidateTerritory.w, y: candidateTerritory.y + candidateTerritory.h }, { x: candidateTerritory.x, y: candidateTerritory.y + candidateTerritory.h }];
      ctx.beginPath(); polygon.forEach((point, index) => index ? ctx.lineTo(point.x * sx, point.y * sy) : ctx.moveTo(point.x * sx, point.y * sy)); ctx.closePath(); ctx.fillStyle = `${css[candidateTerritory.state]}32`; ctx.fill(); ctx.strokeStyle = `${css[candidateTerritory.state]}aa`; ctx.lineWidth = 2; ctx.stroke();
    }
    for (const candidateRoad of [...this.world.roads].filter((road) => this.debugMode || road.kind === "highway").sort((a, b) => (a.kind === "dirt" ? 0 : a.kind === "secondary" ? 1 : 2) - (b.kind === "dirt" ? 0 : b.kind === "secondary" ? 1 : 2))) { ctx.beginPath(); candidateRoad.points.forEach((point, index) => index ? ctx.lineTo(point.x * sx, point.y * sy) : ctx.moveTo(point.x * sx, point.y * sy)); ctx.strokeStyle = candidateRoad.kind === "highway" ? "#d0ad54dd" : candidateRoad.kind === "secondary" ? "#aeb29f99" : "#8a633d70"; ctx.lineWidth = candidateRoad.kind === "highway" ? 4 : candidateRoad.kind === "secondary" ? 2 : 1; ctx.stroke(); }
    for (const town of this.world.towns ?? []) { ctx.fillStyle = town.kind === "city" ? "#e1bf6a" : "#d4d5c3"; ctx.fillRect(town.x * sx - 3, town.y * sy - 3, 6, 6); }
    for (const infestation of this.world.infestations ?? []) { ctx.fillStyle = "#e45f45"; ctx.beginPath(); ctx.arc(infestation.x * sx, infestation.y * sy, 5, 0, Math.PI * 2); ctx.fill(); }
    for (const candidateTerritory of this.snapshot.territories) { const point = candidateTerritory.labelPoint ?? { x: candidateTerritory.x + candidateTerritory.w / 2, y: candidateTerritory.y + 40 }; ctx.fillStyle = "#f1eed8"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.fillText(candidateTerritory.name.toUpperCase(), point.x * sx, point.y * sy); ctx.font = "10px monospace"; ctx.fillStyle = css[candidateTerritory.state]; ctx.fillText(`${Math.round(candidateTerritory.pressure)}%`, point.x * sx, point.y * sy + 15); }
    for (const base of this.snapshot.bases) { ctx.fillStyle = base.ownerPlayerId === this.network.localId ? "#ffffff" : base.kind === "reclaim" ? "#f2c45f" : "#a7d08c"; ctx.fillRect(base.coreX * sx - 5, base.coreY * sy - 5, 10, 10); }
    for (const operation of this.snapshot.warOperations ?? []) { if (operation.visibleMarkerX === undefined || operation.visibleMarkerY === undefined || !["staging", "active", "survived"].includes(operation.status)) continue; ctx.fillStyle = operation.squadBeaconBuilt ? operation.joinable ? "#67efe0" : "#7f9e98" : operation.isAI ? operation.kind === "reclaim" ? "#f2c45f" : "#a7d08c" : "#67dfd7"; ctx.beginPath(); ctx.arc(operation.visibleMarkerX * sx, operation.visibleMarkerY * sy, operation.isAI ? 4 : 6, 0, Math.PI * 2); ctx.fill(); if (operation.squadBeaconBuilt) { ctx.strokeStyle = "#a4fff1"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(operation.visibleMarkerX * sx, operation.visibleMarkerY * sy, 9, 0, Math.PI * 2); ctx.stroke(); } } ctx.restore();
  }

  private drawTheaterMapOverlay(): void {
    if (!this.theaterWorld) return; const canvas = document.querySelector<HTMLCanvasElement>("#continent-map")!; const ctx = canvas.getContext("2d")!; const sx = canvas.width / THEATER_WIDTH; const sy = canvas.height / THEATER_HEIGHT; ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#101a1d"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (this.textures.exists('threat-field')) ctx.drawImage(this.textures.get('threat-field').getSourceImage() as CanvasImageSource, 0, 0, canvas.width, canvas.height);
    for (const territory of earthTerritories) for (const ring of earthTerritoryBoundaryRings(territory)) { ctx.beginPath(); ring.forEach(([lon, lat], i) => { const p = theaterPoint(lat, lon); i ? ctx.lineTo(p.x * sx, p.y * sy) : ctx.moveTo(p.x * sx, p.y * sy); }); ctx.closePath(); ctx.strokeStyle = '#aeb19488'; ctx.lineWidth = .7; ctx.stroke(); }
    const mapRoads = this.isMissouriPlanet() ? this.theaterWorld.roads : normalGameplayHighways(this.theaterWorld.roads); for (const { road, points: sourcePoints } of uniqueMajorHighwayRenderSegments(mapRoads)) { const points = sourcePoints.map((point) => theaterPoint(point.lat, point.lon)); ctx.beginPath(); points.forEach((point, index) => index ? ctx.lineTo(point.x * sx, point.y * sy) : ctx.moveTo(point.x * sx, point.y * sy)); ctx.strokeStyle = road.isPrimary ? "#80503b" : "#b8a06bbb"; ctx.lineWidth = road.isPrimary ? 2.2 : 1.1; ctx.stroke(); }
    const base = this.localBase(); if (base) { const point = this.baseWorldPoint(base); ctx.fillStyle = "#e8fff8"; ctx.beginPath(); ctx.arc(point.x * sx, point.y * sy, 6, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "#67dfd7"; ctx.lineWidth = 2; ctx.stroke(); }
  }

  private localPlayer() { return this.snapshot?.players.find((entry) => entry.id === this.network.localId); }
  private localBase() { const player = this.localPlayer(); return this.snapshot?.bases.find((entry) => entry.id === player?.baseId); }
  private hordeActive(base?: BaseState): boolean { if (!base || !this.snapshot) return false; const contracts = this.snapshot.contracts.filter((entry) => entry.baseId === base.id); const ids = new Set(contracts.map((entry) => entry.id)); return contracts.some((entry) => (entry.queue?.length ?? 0) > 0) || this.snapshot.zombies.some((entry) => ids.has(entry.contractId)); }
  private refreshSquadPanel(base?: BaseState): void {
    const level = base?.squadBeaconLevel ?? 0; const slots = base?.squadSlots ?? []; const filled = slots.filter((entry) => ["ai_joined", "player_joined"].includes(entry.status)).length; const commanders = (this.snapshot?.squadCommanders ?? []).filter((entry) => entry.baseId === base?.id && entry.status === "active");
    const signature = `${base?.id}:${level}:${base?.joinable}:${filled}:${slots.length}:${commanders.map((entry) => `${entry.id}:${Math.floor(entry.contribution)}:${entry.status}`).join("|")}`; if (signature === this.lastSquadSignature) return; this.lastSquadSignature = signature;
    this.setText("squad-beacon-status", level ? `BEACON LEVEL ${level}` : "BEACON NOT BUILT"); this.setText("squad-joinable", `JOINABLE: ${base?.joinable ? "YES" : "NO"}`); this.setText("squad-slots", `${filled} / ${slots.length} SLOTS FILLED`);
    const roster = document.querySelector<HTMLElement>("#squad-roster")!; roster.replaceChildren();
    if (!base) { const text = document.createElement("p"); text.textContent = "Deploy a command core before opening a shared operation."; roster.append(text); }
    else if (!level) { const text = document.createElement("p"); text.textContent = "Build a Squad Beacon on a tower pad to let other commanders join this base."; roster.append(text); }
    else if (!commanders.length) { const text = document.createElement("p"); text.textContent = base.joinable ? "Beacon transmitting. Call for AI backup to fill an open slot." : "Beacon is closed. Open the base when you are ready for backup."; roster.append(text); }
    else for (const commander of commanders) { const card = document.createElement("div"); card.className = "squad-member"; const name = document.createElement("b"); name.textContent = commander.name; const role = document.createElement("em"); role.textContent = SQUAD_ROLE_INFO[commander.role].name; const effect = document.createElement("small"); effect.textContent = `${SQUAD_ROLE_INFO[commander.role].effect} · ${Math.floor(commander.contribution)} contribution`; card.append(name, role, effect); roster.append(card); }
    const call = document.querySelector<HTMLButtonElement>("#squad-call-button")!; call.disabled = !base || !level || !base.joinable || filled >= slots.length; call.textContent = filled >= slots.length && level ? "SLOTS FULL" : "CALL FOR BACKUP"; const toggle = document.querySelector<HTMLButtonElement>("#squad-toggle-button")!; toggle.disabled = !base || !level; toggle.textContent = base?.joinable ? "CLOSE BASE" : "OPEN BASE";
  }
  private triggerCoreHitEffect(damage: number, maxHp: number): void {
    const effect = document.querySelector<HTMLElement>("#core-hit-effect"); if (!effect) return;
    effect.style.setProperty("--hit-strength", String(Phaser.Math.Clamp(.55 + damage / Math.max(1, maxHp) * 5, .55, 1)));
    effect.classList.remove("hit"); void effect.offsetWidth; effect.classList.add("hit");
    window.setTimeout(() => effect.classList.remove("hit"), 720);
  }

  private setText(id: string, text: string): void { const element = document.getElementById(id); if (element) element.textContent = text; }
  private showNotice(text: string, error = false): void { const notice = document.querySelector<HTMLElement>("#notice")!; notice.textContent = text; notice.className = error ? "show error" : "show"; window.setTimeout(() => notice.className = "", 3500); }
}



