import { loadCampaign, saveCampaign, activeCharacter } from '../game/Campaign';
import { threatAt } from '../game/ThreatField';
import Phaser from "phaser";
import { battleSeedFor, type DeploymentLot, type GlobeWorld, type Settlement, type WorldTile } from "../globe/GlobeData";
import { GlobeRenderer, type GlobeCallbacks } from "../globe/GlobeRenderer";
import { closestHighwayAccess, createEarthGlobeWorld } from "../globe/EarthGlobeData";
import { earthCountryBattlefieldOutline, earthCountryForTerritory, earthTerritories, earthTerritoryAt, earthTerritoryBattlefieldOutline } from "../globe/EarthTerritories";
import { MISSOURI_PLANET_ID, MISSOURI_TERRITORY_ID } from "../game/planet2/MissouriRoadData";
import { closestMissouriTileAccess } from "../game/planet2/MissouriTileData";
import { MISSOURI_TILE_MAP, missouriTileCenter } from "../game/planet2/MissouriTileKit";
import type { Snapshot, StrategicDeploymentContext, WarOperation, WarSector, WorldStatic } from "../game/types";
import type { GameClient } from "../net/GameClient";
import { theaterPoint } from "../game/AmericasTheater";

type DeadroadPlanetId = "planet1-current" | typeof MISSOURI_PLANET_ID;

export class GlobeDeployScene extends Phaser.Scene {
  private network!: GameClient;
  private globeRenderer?: GlobeRenderer;
  private globeWorld?: GlobeWorld;
  private selectedTile?: WorldTile;
  private selectedLot?: DeploymentLot;
  private activePlanet: DeadroadPlanetId = "planet1-current";
  private debug = false;
  private keyHandler?: (event: KeyboardEvent) => void;
  private offSnapshot?: () => void;
  private lastWarUiAt = 0;
  private territoryVisible = true;

  constructor() { super("GlobeDeployScene"); }

  create(): void {
    const shell = document.querySelector<HTMLElement>("#globe-deploy")!; const mount = document.querySelector<HTMLElement>("#globe-canvas")!;
    document.querySelector<HTMLElement>("#hud")!.hidden = true; shell.hidden = false; this.game.canvas.style.opacity = "0";
    this.network = this.registry.get("network") as GameClient; this.network.setPaused(true); const savedPlanet = this.registry.get("deadroadPlanetId"); this.activePlanet = savedPlanet === MISSOURI_PLANET_ID ? savedPlanet : "planet1-current";
    const world = this.network.latestWorld; const snapshot = this.network.latestSnapshot;
    if (!world || !snapshot) {
      this.setText("globe-region", "Synchronizing orbital survey"); this.setText("globe-recommend", "Roadwatch is loading colony tiles, routes, and deployment contracts…");
      let offWorld = () => {}; let offSnapshot = () => {};
      const ready = () => { if (this.network.latestWorld && this.network.latestSnapshot) { offWorld(); offSnapshot(); this.scene.restart(); } };
      offWorld = this.network.on("world", ready); offSnapshot = this.network.on("snapshot", ready); this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => { offWorld(); offSnapshot(); }); ready(); return;
    }
    this.mountPlanet(mount, world, snapshot);
    document.querySelector<HTMLButtonElement>("#planet-1-button")!.onclick = () => this.switchPlanet("planet1-current");
    document.querySelector<HTMLButtonElement>("#planet-2-button")!.onclick = () => this.switchPlanet(MISSOURI_PLANET_ID);
    document.querySelector<HTMLButtonElement>("#planet-3-button")!.onclick = () => this.openRoadEditor();
    document.querySelector<HTMLButtonElement>("#globe-deploy-button")!.onclick = () => this.deploy();
    document.querySelector<HTMLButtonElement>("#globe-random-button")!.onclick = () => this.randomSpawn();
    document.querySelector<HTMLButtonElement>("#globe-focus-button")!.onclick = () => this.globeRenderer?.focusSelected();
    document.querySelector<HTMLButtonElement>("#globe-territories-button")!.onclick = () => this.toggleTerritories();
    document.querySelector<HTMLButtonElement>("#globe-back-button")!.onclick = () => this.returnToMenu();
    this.keyHandler = (event) => {
      if (event.key === "F3") { event.preventDefault(); this.debug = !this.debug; this.globeRenderer?.setDebug(this.debug); shell.classList.toggle("debug", this.debug); this.setText("globe-mode", this.debug ? "DEBUG OVERLAY // ACTIVE" : "COMMANDER MODE // PROTECTED"); }
      if (event.key.toLowerCase() === "m") shell.classList.toggle("map-mode");
      if (event.key.toLowerCase() === "r") this.randomSpawn();
      if (event.key.toLowerCase() === "v") this.toggleTerritories();
      if (event.key === "Escape") { this.selectedTile = undefined; this.selectedLot = undefined; this.showTile(); }
    };
    this.offSnapshot = this.network.on("snapshot", (next) => { if (performance.now() - this.lastWarUiAt < 350) return; this.lastWarUiAt = performance.now(); this.globeRenderer?.setWarState(next.warSectors ?? [], next.warOperations ?? []); if (this.selectedLot) this.showLocation(this.selectedLot); else if (this.selectedTile) this.showTile(this.selectedTile, true); });
    window.addEventListener("keydown", this.keyHandler); this.showTile();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.cleanup());
  }

  private isMissouriPlanet(): boolean { return this.activePlanet === MISSOURI_PLANET_ID; }

  private openRoadEditor(): void {
    this.scene.start("RoadEditorScene");
  }

  private switchPlanet(planetId: DeadroadPlanetId): void {
    if (planetId === this.activePlanet) return;
    const world = this.network.latestWorld; const snapshot = this.network.latestSnapshot; if (!world || !snapshot) return;
    this.activePlanet = planetId; this.registry.set("deadroadPlanetId", planetId); this.mountPlanet(document.querySelector<HTMLElement>("#globe-canvas")!, world, snapshot);
  }

  private mountPlanet(mount: HTMLElement, world: WorldStatic, snapshot: Snapshot): void {
    this.globeRenderer?.destroy(); this.selectedTile = undefined; this.selectedLot = undefined;
    const missouri = this.isMissouriPlanet(); this.globeWorld = createEarthGlobeWorld(world, snapshot.lots);
    const callbacks: GlobeCallbacks = {
      onHoverTile: (tile) => { if (!this.selectedTile && !this.selectedLot) this.showTile(tile); },
      onSelectTile: (tile) => { this.selectedTile = tile; this.selectedLot = this.freeSelectionForTile(tile); if (this.selectedLot) this.showLocation(this.selectedLot); else this.showTile(tile, true); },
      onHoverSettlement: (settlement) => this.showTooltip(settlement),
      onHoverOperation: (operation) => { if (operation) this.showOperationTooltip(operation); },
      onClear: () => { this.selectedTile = undefined; this.selectedLot = undefined; this.showTile(); }
    };
    this.globeRenderer = new GlobeRenderer(mount, this.globeWorld, callbacks, "earth", snapshot.warSectors ?? [], snapshot.warOperations ?? []);
    this.globeRenderer.setDebug(this.debug); this.globeRenderer.setTerritoriesVisible(this.territoryVisible);
    const one = document.querySelector<HTMLButtonElement>("#planet-1-button")!; const two = document.querySelector<HTMLButtonElement>("#planet-2-button")!; const three = document.querySelector<HTMLButtonElement>("#planet-3-button")!;
    one.classList.toggle("active", !missouri); two.classList.toggle("active", missouri); three.classList.remove("active"); document.body.dataset.deadroadPlanet = this.activePlanet;
    this.game.canvas.dataset.planetId = this.activePlanet; this.game.canvas.dataset.planet2RoadSource = missouri ? "connected-statewide-tile-network" : "inactive";
    this.setText("globe-planet-label", missouri ? "PLANET 2 // MISSOURI ROAD NETWORK" : "PLANET 1 // CURRENT MAP");
    const dragCopy = document.querySelector<HTMLElement>(".globe-controls div:first-child span"); if (dragCopy) dragCopy.textContent = "Rotate planet"; const legendCopy = document.querySelector<HTMLElement>(".globe-legend b"); if (legendCopy) legendCopy.textContent = missouri ? "CLICK MISSOURI // FREE ENTRY" : "CLICK LAND // FREE ENTRY";
    const territoryButton = document.querySelector<HTMLButtonElement>("#globe-territories-button")!; territoryButton.hidden = false; territoryButton.classList.toggle("off", !this.territoryVisible); territoryButton.textContent = `[V] ${missouri ? "STATE OUTLINE" : "TERRITORIES"} ${this.territoryVisible ? "ON" : "OFF"}`;
    this.showTile();
  }

  private freeSelectionForTile(tile: WorldTile): DeploymentLot | undefined {
    const territory = earthTerritoryAt(tile.centerLat, tile.centerLon); const missouri = this.isMissouriPlanet();
    if (!this.globeWorld || !tile.isLand || territory?.group !== "usa" || missouri && territory.id !== MISSOURI_TERRITORY_ID) return undefined;
    const region = this.globeWorld.regions.find((entry) => entry.id === tile.regionId); if (!region) return undefined;
    const liveLots = this.network.latestSnapshot?.lots ?? []; const candidates = this.globeWorld.lots.filter((lot) => liveLots.some((entry) => entry.id === lot.tacticalLotId && (entry.status === "empty" || entry.status === "reserved" && entry.ownerPlayerId === this.network.localId)));
    const template = (candidates.length ? candidates : this.globeWorld.lots.filter((lot) => lot.status === "available"))[0]; if (!template) return undefined;
    const tileAccess = missouri ? closestMissouriTileAccess({ lat: tile.centerLat, lon: tile.centerLon }) : undefined;
    const roadAccess = tileAccess ? undefined : closestHighwayAccess(this.globeWorld.roads, { lat: tile.centerLat, lon: tile.centerLon }, "north-america");
    const accessPoint = tileAccess?.point ?? roadAccess!.point; const distanceKm = tileAccess ? tileAccess.distanceKm : Math.hypot(accessPoint.lat - tile.centerLat, accessPoint.lon - tile.centerLon) * 111;
    return { ...template, id: `free-entry-${tile.regionId}-${tile.centerLat.toFixed(3)}-${tile.centerLon.toFixed(3)}`, tileId: tile.id, regionId: tile.regionId, name: `${region.name} Free Entry`, lat: tile.centerLat, lon: tile.centerLon, roadId: tileAccess?.tileId ?? roadAccess!.road.id, roadAccessLat: accessPoint.lat, roadAccessLon: accessPoint.lon, roadAccessDistanceKm: distanceKm, roadAccessClass: tileAccess ? "rural_road" : roadAccess!.road.gameRoadClass ?? "interstate", roadAccessName: tileAccess ? "MISSOURI STATE ROAD" : roadAccess!.road.name, routePointLatLon: undefined, status: "available", routeDanger: region.threat + 1, safetyRating: Math.max(1, 6 - region.threat) };
  }

  private showTile(tile?: WorldTile, locked = false): void {
    const missouri = this.isMissouriPlanet();
    if (!tile || !this.globeWorld) {
      this.setText("globe-region", missouri ? "Missouri statewide road network" : "Choose any USA land location"); this.setText("globe-state", missouri ? "CONNECTED TEST // ISOLATED" : "COMMANDER MODE"); this.setText("globe-biome", "—"); this.setText("globe-terrain", "—"); this.setText("globe-road", missouri ? "ONE CONNECTED STATEWIDE NETWORK" : "MAJOR HIGHWAYS VISIBLE"); this.setText("globe-river", missouri ? "34×31 · NO INTERIOR DEAD ENDS" : "FREE LOCATION ENTRY"); this.setText("globe-nearby", missouri ? "CLICK MISSOURI TO STAGE" : "CLICK LAND TO ENTER"); this.setText("globe-threat", "—"); this.setText("globe-infestation", "—"); this.setText("globe-deployment", "SELECT LAND"); this.setText("globe-scrap", "—"); this.setText("globe-horde", missouri ? "OCCASIONAL ONE-WAY LINKS" : "CALCULATED AFTER BASE DEPLOYMENT"); this.setText("globe-recommend", missouri ? "Rotate the planet, select Missouri, and enter on the nearest connected road." : "Pan and zoom, then click any supported land location in the United States."); this.updateButton(); return;
    }
    if (!tile.isLand) {
      this.setText("globe-region", missouri ? "Outside Missouri" : "Open water"); this.setText("globe-state", `UNAVAILABLE${locked ? " // INVALID" : ""}`); this.setText("globe-biome", "0%"); this.setText("globe-terrain", "0%"); this.setText("globe-road", "NO ROAD ACCESS"); this.setText("globe-river", "—"); this.setText("globe-nearby", missouri ? "SELECT MISSOURI" : "SELECT LAND"); this.setText("globe-threat", "—"); this.setText("globe-infestation", "0%"); this.setText("globe-deployment", "UNAVAILABLE"); this.setText("globe-scrap", "—"); this.setText("globe-horde", "—"); this.setText("globe-recommend", missouri ? "Planet 2 is restricted to Missouri." : locked ? "Cannot enter water." : "Select land in the United States."); this.updateButton(); return;
    }
    const selectedTerritory = earthTerritoryAt(tile.centerLat, tile.centerLon); const outsideTest = missouri && selectedTerritory?.id !== MISSOURI_TERRITORY_ID;
    if (selectedTerritory?.group !== "usa" || outsideTest) { this.setText("globe-region", selectedTerritory?.name ?? "Unsupported territory"); this.setText("globe-state", locked ? "OUTSIDE PLAYABLE AREA" : "LAND // UNSUPPORTED"); this.setText("globe-biome", "—"); this.setText("globe-terrain", "—"); this.setText("globe-road", outsideTest ? "PLANET 2 IS MISSOURI ONLY" : "NO USA TACTICAL LINK"); this.setText("globe-river", "—"); this.setText("globe-nearby", missouri ? "SELECT MISSOURI" : "SELECT USA LAND"); this.setText("globe-threat", `${threatAt(tile.centerLat, tile.centerLon, this.network.latestSnapshot?.warSectors).toFixed(1)} / 10`); this.setText("globe-infestation", `${Math.round(tile.infestation)}%`); this.setText("globe-deployment", "UNAVAILABLE"); this.setText("globe-scrap", "—"); this.setText("globe-horde", "—"); this.setText("globe-recommend", outsideTest ? "Switch to Planet 1 for the current full map." : "Outside playable area."); this.updateButton(); return; }
    const region = this.globeWorld.regions.find((entry) => entry.id === tile.regionId); const sector = this.sectorFor(tile.regionId); const operations = this.operationsFor(sector); const scrapModifier = tile.biome === "urban_ruins" ? 80 : tile.biome === "mountains" ? 55 : 25;
    this.setText("globe-region", sector?.name ?? region?.name ?? tile.id); this.setText("globe-state", `${(sector?.state ?? tile.state).toUpperCase()}${locked ? " // LOCKED" : ""}`); this.setText("globe-biome", `${Math.round(sector?.pressure ?? tile.infestation)}%`); this.setText("globe-terrain", `${Math.round(sector?.supply ?? 100 - tile.infestation)}%`);
    this.setText("globe-road", missouri ? "CONNECTED TILE NETWORK" : `${operations.length} ACTIVE ALLIED SIGNAL${operations.length === 1 ? "" : "S"}`); this.setText("globe-river", "ENTRY POINT FOLLOWS YOUR CLICK"); this.setText("globe-nearby", "FREE LAND SELECTION"); this.setText("globe-threat", `${threatAt(tile.centerLat, tile.centerLon, this.network.latestSnapshot?.warSectors).toFixed(1)} / 10`); this.setText("globe-infestation", `${Math.round(sector?.infestation ?? tile.infestation)}%`); this.setText("globe-deployment", "READY TO ENTER"); this.setText("globe-scrap", `+${scrapModifier}`); this.setText("globe-horde", missouri ? "TILE ROADS // MARKED ONE-WAYS" : "ROUTE BUILDS AFTER BASE DEPLOYMENT");
    this.setText("globe-recommend", locked ? "No convoy template is currently available. Select another land location." : `${region?.name ?? "USA sector"} · Enter on the nearest ${missouri ? "connected road tile" : "highway"}.`); this.updateButton();
  }

  private showLocation(location: DeploymentLot): void {
    if (!this.globeWorld) return; const region = this.globeWorld.regions.find((entry) => entry.id === location.regionId); const sector = this.sectorFor(location.regionId);
    this.setText("globe-region", region?.name ?? location.name); this.setText("globe-state", `LAND ENTRY // ${(sector?.state ?? region?.state ?? "contested").toUpperCase()}`); this.setText("globe-biome", `${Math.round(sector?.pressure ?? 0)}%`); this.setText("globe-terrain", `${Math.round(sector?.supply ?? 100)}%`);
    this.setText("globe-road", `${location.roadAccessName ?? "HIGHWAY"} // ${location.roadAccessClass?.replaceAll("_", " ").toUpperCase() ?? "INTERSTATE"}`); this.setText("globe-river", `${location.lat.toFixed(2)}°, ${location.lon.toFixed(2)}°`); this.setText("globe-nearby", `${(location.roadAccessDistanceKm ?? 0).toFixed(1)} KM TO ROAD ENTRY`); this.setText("globe-threat", `${threatAt(location.lat, location.lon, this.network.latestSnapshot?.warSectors).toFixed(1)} / 10`); this.setText("globe-infestation", `${Math.round(sector?.infestation ?? 0)}%`); this.setText("globe-deployment", "ENTRY READY"); this.setText("globe-scrap", `${250 + location.startingScrapBonus}`); this.setText("globe-horde", this.isMissouriPlanet() ? "CONNECTED TILE-ROAD ROUTING" : "CALCULATED WHERE BASE DEPLOYS"); this.setText("globe-recommend", "Convoy entry accepted. Enter the sector, drive anywhere on dry land, and deploy after coming to a stop."); this.updateButton();
  }

  private updateButton(): void { const button = document.querySelector<HTMLButtonElement>("#globe-deploy-button")!; button.disabled = !this.selectedLot; button.textContent = this.selectedLot ? this.isMissouriPlanet() ? "ENTER MISSOURI ROAD NETWORK" : "ENTER SELECTED SECTOR" : this.isMissouriPlanet() ? "CLICK MISSOURI TO STAGE" : "CLICK USA LAND TO ENTER"; }

  private deploy(): void {
    if (!this.selectedLot || !this.selectedTile) return;
    const territory = earthTerritories.find((entry) => entry.id === this.selectedLot!.regionId); const country = earthCountryForTerritory(this.selectedLot.regionId); const entryLat = this.selectedLot.roadAccessLat ?? this.selectedLot.lat; const entryLon = this.selectedLot.roadAccessLon ?? this.selectedLot.lon; const worldPoint = theaterPoint(entryLat, entryLon); const missouri = this.isMissouriPlanet();
    const seed = { ...battleSeedFor(this.selectedTile, this.selectedLot), planetId: missouri ? MISSOURI_PLANET_ID : "earth" as const, territoryName: missouri ? "Missouri" : country?.name ?? territory?.name, entryTerritoryName: territory?.name, entryLat, entryLon, worldX: worldPoint.x, worldY: worldPoint.y, territoryOutline: missouri ? earthTerritoryBattlefieldOutline(this.selectedLot.regionId) : earthCountryBattlefieldOutline(this.selectedLot.regionId) };
    this.registry.set("battleSeed", seed); const campaign = loadCampaign(); const character = activeCharacter(campaign); if (character) { character.battleSeed = seed; saveCampaign(campaign); } const shell = document.querySelector<HTMLElement>("#globe-deploy")!; shell.classList.add("deploying"); this.showDeploymentLoading();
    const strategicContext = this.strategicContext(); const playerHasBase = Boolean(this.network.latestSnapshot?.players.find((entry) => entry.id === this.network.localId)?.baseId); if (playerHasBase) this.network.redeploy(this.selectedLot.tacticalLotId, strategicContext); else if (this.selectedLot.status === "overrun") this.network.reclaim(this.selectedLot.tacticalLotId, strategicContext); else { this.network.reserveLot(this.selectedLot.tacticalLotId); this.network.deploy(this.selectedLot.tacticalLotId, strategicContext); }
    this.time.delayedCall(120, () => { shell.hidden = true; shell.classList.remove("deploying"); this.scene.start("WorldScene"); });
  }

  private showDeploymentLoading(): void {
    const loading = document.querySelector<HTMLElement>("#deployment-loading")!; loading.hidden = false; loading.classList.remove("complete"); loading.setAttribute("aria-busy", "true");
    const bar = document.querySelector<HTMLElement>("#deployment-loading-bar"); const status = document.querySelector<HTMLElement>("#deployment-loading-status"); if (bar) bar.style.width = "4%"; if (status) status.textContent = this.isMissouriPlanet() ? "LOCKING MISSOURI // PREPARING CONVOY" : "LOCKING SECTOR // PREPARING CONVOY";
    document.querySelector<HTMLElement>("#hud")!.hidden = true; this.game.canvas.style.opacity = "0";
  }

  private strategicContext(): StrategicDeploymentContext | undefined {
    if (!this.selectedLot || !this.globeWorld) return undefined; const region = this.globeWorld.regions.find((entry) => entry.id === this.selectedLot!.regionId); if (!region) return undefined;
    const point = theaterPoint(this.selectedLot.roadAccessLat ?? this.selectedLot.lat, this.selectedLot.roadAccessLon ?? this.selectedLot.lon); return { planetId: this.isMissouriPlanet() ? MISSOURI_PLANET_ID : "earth", regionId: region.id, regionName: region.name, centerLat: this.selectedLot.lat, centerLon: this.selectedLot.lon, worldX: point.x, worldY: point.y, roadAccessLat: this.selectedLot.roadAccessLat, roadAccessLon: this.selectedLot.roadAccessLon, roadId: this.selectedLot.roadId, roadName: this.selectedLot.roadAccessName, threatLevel: region.threat, infestation: region.infestation, state: region.state };
  }

  private randomSpawn(): void {
    if (!this.globeWorld) return; const missouri = this.isMissouriPlanet();
    const missouriTiles = MISSOURI_TILE_MAP.map((placement) => ({ placement, point: missouriTileCenter(placement) })).filter(({ point }) => earthTerritoryAt(point.lat, point.lon)?.id === MISSOURI_TERRITORY_ID);
    const candidates = missouri
      ? missouriTiles.map(({ placement, point }) => { const nearest = this.globeWorld!.tiles.reduce((best, tile) => Math.hypot(tile.centerLat - point.lat, tile.centerLon - point.lon) < Math.hypot(best.centerLat - point.lat, best.centerLon - point.lon) ? tile : best); return { ...nearest, id: `planet2-random-${placement.column}-${placement.row}`, centerLat: point.lat, centerLon: point.lon, regionId: MISSOURI_TERRITORY_ID, continentId: "usa", isLand: true, hasRoad: true }; })
      : this.globeWorld.tiles.filter((tile) => { const territory = earthTerritoryAt(tile.centerLat, tile.centerLon); return tile.isLand && territory?.group === "usa"; });
    if (!candidates.length) { this.setText("globe-recommend", `NO SUPPORTED ${missouri ? "MISSOURI" : "USA"} LAND IS CURRENTLY AVAILABLE.`); return; }
    const entropy = new Uint32Array(1); if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(entropy); else entropy[0] = Math.floor(Math.random() * 0xffffffff);
    const start = entropy[0] % candidates.length; let selection: { tile: WorldTile; lot: DeploymentLot } | undefined;
    for (let attempt = 0; attempt < candidates.length; attempt++) { const tile = candidates[(start + attempt) % candidates.length]; const lot = this.freeSelectionForTile(tile); if (lot) { selection = { tile, lot }; break; } }
    if (!selection) { this.setText("globe-recommend", "NO CONVOY IS AVAILABLE FOR A RANDOM ENTRY."); return; } this.selectedTile = selection.tile; this.selectedLot = selection.lot;
    this.showLocation(this.selectedLot); this.setText("globe-recommend", `RANDOM ${missouri ? "MISSOURI ROAD" : "LAND"} ENTRY // ${this.selectedLot.name.toUpperCase()} // DEPLOYING`);
    const shell = document.querySelector<HTMLElement>("#globe-deploy")!; shell.classList.add("randomizing"); this.time.delayedCall(620, () => { shell.classList.remove("randomizing"); this.deploy(); });
  }

  private showTooltip(settlement?: Settlement): void { const tooltip = document.querySelector<HTMLElement>("#globe-tooltip")!; if (!settlement) { tooltip.hidden = true; return; } tooltip.hidden = false; tooltip.textContent = `${settlement.name} // ${settlement.kind.replaceAll("_", " ").toUpperCase()} // THREAT ${settlement.threat}`; }
  private showOperationTooltip(operation: WarOperation): void { const tooltip = document.querySelector<HTMLElement>("#globe-tooltip")!; const sector = this.network.latestSnapshot?.warSectors.find((entry) => entry.id === operation.sectorId); const filled = operation.squadFilledSlots ?? 0; const open = Math.max(0, operation.sharedBaseSlots - filled); const base = this.network.latestSnapshot?.bases.find((entry) => entry.id === operation.baseId); const activeRoles = new Set((this.network.latestSnapshot?.squadCommanders ?? []).filter((entry) => entry.baseId === base?.id && entry.status === "active").map((entry) => entry.role)); const needed = (["repair", "gunner", "scavenger", "builder", "signal"] as const).filter((entry) => !activeRoles.has(entry)).slice(0, 3).map((entry) => entry[0].toUpperCase() + entry.slice(1)).join(" / ") || "Any support"; tooltip.hidden = false; tooltip.replaceChildren(); const text = document.createElement("span"); text.textContent = `JOINABLE BASE\nOwner: ${operation.ownerName}\nSector: ${sector?.name ?? operation.sectorId}\nSlots: ${filled}/${operation.sharedBaseSlots} · ${open} open\nThreat: ${sector?.threatLevel ?? "—"}\nRole Needed: ${needed}`; const button = document.createElement("button"); button.disabled = true; button.textContent = "JOIN BASE — COMING SOON"; tooltip.append(text, button); }
  private sectorFor(regionId?: string): WarSector | undefined { return this.network.latestSnapshot?.warSectors?.find((entry) => entry.regionId === regionId || entry.id === regionId); }
  private operationsFor(sector?: WarSector) { return sector ? (this.network.latestSnapshot?.warOperations ?? []).filter((entry) => entry.sectorId === sector.id && ["staging", "active", "survived"].includes(entry.status)) : []; }
  private toggleTerritories(): void { this.territoryVisible = !this.territoryVisible; this.globeRenderer?.setTerritoriesVisible(this.territoryVisible); const button = document.querySelector<HTMLButtonElement>("#globe-territories-button")!; button.classList.toggle("off", !this.territoryVisible); button.textContent = `[V] ${this.isMissouriPlanet() ? "STATE OUTLINE" : "TERRITORIES"} ${this.territoryVisible ? "ON" : "OFF"}`; }
  private setText(id: string, value: string): void { const element = document.getElementById(id); if (element) element.textContent = value; }
  private returnToMenu(): void { this.network.disconnect(); document.querySelector<HTMLElement>("#globe-deploy")!.hidden = true; this.game.canvas.style.opacity = "1"; this.scene.start("MenuScene"); }
  private cleanup(): void { this.globeRenderer?.destroy(); this.globeRenderer = undefined; this.offSnapshot?.(); this.offSnapshot = undefined; if (this.keyHandler) window.removeEventListener("keydown", this.keyHandler); }
}
