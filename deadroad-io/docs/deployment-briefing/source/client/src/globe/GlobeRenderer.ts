import * as THREE from "three";
import { normalGameplayHighways } from "../game/HighwayOnlyRoadPolicy";
import type { GlobeWorld, Settlement, WorldTile } from "./GlobeData";
import type { WarOperation, WarSector } from "../game/types";
import { createEarthTextures } from "./EarthTextureGenerator";
import { earthTerritories, earthTerritoryAt } from "./EarthTerritories";
import { usStateBoundaryData } from "../map/UsStateBoundaries";

export type PlanetId = "earth" | "earth-natural";
type RoadClass = "highway" | "secondary" | "dirt";
type RoadVisibility = "far" | "medium" | "close";
type RoadLayer = { object: THREE.LineSegments; material: THREE.LineBasicMaterial; roadClass: RoadClass; visibility: RoadVisibility; baseOpacity: number };

export type GlobeCallbacks = {
  onHoverTile: (tile?: WorldTile) => void;
  onSelectTile: (tile: WorldTile) => void;
  onHoverSettlement: (settlement?: Settlement) => void;
  onHoverOperation: (operation?: WarOperation) => void;
  onClear: () => void;
};

const latLonToVector = (lat: number, lon: number, radius = 1): THREE.Vector3 => {
  const phi = THREE.MathUtils.degToRad(90 - lat); const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
};

export class GlobeRenderer {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(37, 1, .1, 30);
  private renderer: THREE.WebGLRenderer;
  private globe = new THREE.Group();
  private tileMeshes: THREE.Mesh[] = [];
  private clickableIcons: THREE.Object3D[] = [];
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private dragging = false;
  private moved = false;
  private lastPointer = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private hoveredTile?: WorldTile;
  private selectedTile?: WorldTile;
  private hoverOverlay: THREE.LineSegments;
  private selectedOverlay: THREE.LineSegments;
  private targetQuaternion?: THREE.Quaternion;
  private frame = 0;
  private debug = false;
  private debugGrid?: THREE.LineSegments;
  private roadLayers: RoadLayer[] = [];
  private roadDebug = new THREE.Group();
  private territoryLayer = new THREE.Group();
  private territoriesVisible = true;
  private roadDebugPanel?: HTMLElement;
  private warOperationLayer = new THREE.Group();
  private warOperationMarkers: THREE.Object3D[] = [];
  private warStateSignature = "";
  private threatSignature = "";
  private refreshThreat?: (sectors: WarSector[]) => void;
  private labelLayer: HTMLElement;
  private labels: Array<{ element: HTMLElement; position: THREE.Vector3; minZoom: number; kind: string }> = [];

  constructor(private mount: HTMLElement, private world: GlobeWorld, private callbacks: GlobeCallbacks, private planetId: PlanetId = "earth", warSectors: WarSector[] = [], warOperations: WarOperation[] = []) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7)); this.renderer.outputColorSpace = THREE.SRGBColorSpace; this.renderer.setClearColor(0x060807, 1);
    this.renderer.domElement.className = "globe-webgl"; this.renderer.domElement.setAttribute("aria-label", "Rotatable Deadroad colony world"); mount.append(this.renderer.domElement);
    this.labelLayer = document.createElement("div"); this.labelLayer.className = "globe-label-layer"; mount.append(this.labelLayer);
    this.hoverOverlay = this.createOutline(0xc9f5c2, .014); this.selectedOverlay = this.createOutline(0xf3ce69, .02); this.hoverOverlay.visible = false; this.selectedOverlay.visible = false;
    this.buildScene(); this.setWarState(warSectors, warOperations); this.bind(); this.resize(); this.animate();
  }

  destroy(): void {
    cancelAnimationFrame(this.frame); window.removeEventListener("resize", this.resize); window.removeEventListener("keydown", this.keydown);
    const canvas = this.renderer.domElement; canvas.removeEventListener("pointerdown", this.pointerDown); canvas.removeEventListener("pointermove", this.pointerMove); canvas.removeEventListener("pointerup", this.pointerUp); canvas.removeEventListener("pointerleave", this.pointerLeave); canvas.removeEventListener("wheel", this.wheel); canvas.removeEventListener("contextmenu", this.contextMenu);
    this.renderer.dispose(); this.mount.replaceChildren();
  }

  setDebug(enabled: boolean): void { this.debug = enabled; if (this.debugGrid) this.debugGrid.visible = enabled; this.roadDebug.visible = enabled; this.warOperationLayer.visible = enabled; if (this.roadDebugPanel) this.roadDebugPanel.hidden = !enabled; this.labels.forEach((label) => { if (label.kind === "debug") label.element.hidden = !enabled; }); }
  setTerritoriesVisible(visible: boolean): void { this.territoriesVisible = visible; this.territoryLayer.visible = visible; }
  setWarState(sectors: WarSector[], operations: WarOperation[]): void {
    const threatSignature=sectors.filter(s=>s.regionId).map(s=>`${s.regionId}:${Math.round(s.pressure)}`).join("|"); if(threatSignature!==this.threatSignature){this.threatSignature=threatSignature;this.refreshThreat?.(sectors);}
    const earthSectorIds = new Set(sectors.filter((entry) => entry.id.startsWith("earth-")).map((entry) => entry.id)); const recent = operations.filter((entry) => earthSectorIds.has(entry.sectorId) && (["staging", "active", "survived"].includes(entry.status) || Date.now() - entry.updatedAt < 60000)); const signature = recent.map((entry) => `${entry.id}:${entry.sectorId}:${entry.status}:${entry.squadBeaconBuilt}:${entry.joinable}:${entry.sharedBaseSlots}:${entry.squadFilledSlots ?? 0}`).join("|"); if (signature === this.warStateSignature) return; this.warStateSignature = signature;
    this.clickableIcons = this.clickableIcons.filter((entry) => entry.userData.kind !== "war-operation");
    for (const child of this.warOperationLayer.children) { const mesh = child as THREE.Mesh; mesh.geometry?.dispose(); if (Array.isArray(mesh.material)) mesh.material.forEach((entry) => entry.dispose()); else mesh.material?.dispose(); } this.warOperationLayer.clear(); this.warOperationMarkers = [];
    for (const operation of recent) { const sector = sectors.find((entry) => entry.id === operation.sectorId); const lat = operation.visibleLat ?? sector?.centerLat; const lon = operation.visibleLon ?? sector?.centerLon; if (lat === undefined || lon === undefined) continue; const player = !operation.isAI; const failed = operation.status === "failed"; const evacuated = operation.status === "evacuated"; const beacon = operation.squadBeaconBuilt; const color = failed ? 0xe45f45 : evacuated ? 0x8b8e83 : beacon ? operation.joinable ? 0x67efe0 : 0x7f9e98 : operation.kind === "reclaim" ? 0xf0c45d : player ? 0x67dfd7 : 0xb8c878; const inner = beacon ? .009 : player ? .008 : .005; const outer = beacon ? .018 : player ? .015 : .01; const geometry = new THREE.RingGeometry(inner, outer, beacon ? 12 : operation.kind === "reclaim" ? 6 : 4); const marker = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: evacuated ? .45 : .95, depthTest: true, depthWrite: false })); this.placeMarker(marker, lat, lon, 1.052); marker.userData = { kind: "war-operation", operation, baseScale: beacon ? 1.28 : player ? 1.15 : 1 }; marker.renderOrder = 14; this.warOperationLayer.add(marker); this.warOperationMarkers.push(marker); }
    this.warOperationLayer.visible = this.debug;
  }
  focusSelected(): void { if (!this.selectedTile) return; const normal = latLonToVector(this.selectedTile.centerLat, this.selectedTile.centerLon).normalize(); this.targetQuaternion = new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 0, 1)); this.camera.position.z = Math.min(this.camera.position.z, 3); }

  private buildScene(): void {
    this.scene.fog = new THREE.FogExp2(0x060807, .055); this.camera.position.set(0, 0, 4.85);
    this.scene.add(new THREE.HemisphereLight(0xc8dded, 0x24382d, 2.05)); const key = new THREE.DirectionalLight(0xfff4d1, 3.1); key.position.set(-3, 2, 5); this.scene.add(key);
    const stars = new THREE.BufferGeometry(); const starPositions: number[] = [];
    for (let i = 0; i < 800; i++) { const radius = 6 + (i % 17) * .25; const lat = -88 + ((i * 47) % 176); const lon = -180 + ((i * 83) % 360); starPositions.push(...latLonToVector(lat, lon, radius).toArray()); }
    stars.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3)); this.scene.add(new THREE.Points(stars, new THREE.PointsMaterial({ color: 0x78806f, size: .012, transparent: true, opacity: .52 })));
    this.scene.add(this.globe);
    const textures = createEarthTextures(this.world.regions, this.planetId === "earth-natural"); this.refreshThreat = textures.refreshThreat; const surfaceGeometry = new THREE.SphereGeometry(1.018, 128, 80);
    this.globe.add(new THREE.Mesh(surfaceGeometry, new THREE.MeshStandardMaterial({ map: textures.surface, roughness: .88, metalness: 0 })));
    this.globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.021, 128, 80), new THREE.MeshBasicMaterial({ map: textures.difficulty, transparent: true, opacity: .9, depthWrite: false })));
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.065, 64, 42), new THREE.MeshBasicMaterial({ color: 0x79bde2, transparent: true, opacity: .1, side: THREE.BackSide })); this.globe.add(atmosphere);
    this.buildTiles(); this.buildTerritoryLayer(); this.buildRoutes(); this.buildRoadDebug(); this.buildLabels(); this.buildRoadQualityPanel(); this.globe.add(this.warOperationLayer, this.hoverOverlay, this.selectedOverlay);
    this.globe.rotation.set(.12, -.55, -.04);
  }

  private buildTiles(): void {
    const pickMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }); const borderPositions: number[] = [];
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1.033, 96, 64), pickMaterial); mesh.userData = { kind: "earth-surface" }; this.tileMeshes.push(mesh); this.globe.add(mesh); void borderPositions;
  }

  private buildTerritoryLayer(): void {
    const positions: number[] = [];
    const rings = [...earthTerritories.filter((territory) => territory.group !== "usa").flatMap((territory) => territory.polygons.flat()), ...usStateBoundaryData.internalBorderLines.map((line) => line.points), ...usStateBoundaryData.coastlineLines.map((line) => line.points)];
    for (const ring of rings) {
      const points = this.surfacePoints(ring.map(([lon, lat]) => ({ lat, lon })), 1.035);
      for (let index = 1; index < points.length; index++) positions.push(...points[index - 1].toArray(), ...points[index].toArray());
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const material = this.attachToVisibleSurface(new THREE.LineBasicMaterial({ color: 0xd1c497, transparent: true, opacity: .9, depthTest: true, depthWrite: false }));
    const boundaries = new THREE.LineSegments(geometry, material); boundaries.renderOrder = 10; this.territoryLayer.add(boundaries); this.territoryLayer.visible = this.territoriesVisible; this.globe.add(this.territoryLayer);
  }

  private buildRoutes(): void {
    for (const river of this.world.rivers) this.addRiver(river.pointLatLon, river.size === "large_river" ? .0052 : river.size === "river" ? .0035 : .0022);
    const normalRoads = this.planetId === "earth" ? normalGameplayHighways(this.world.roads) : this.world.roads; const primary = normalRoads.filter((road) => road.isPrimary); const regular = normalRoads.filter((road) => !road.isPrimary); const highways = regular.filter((road) => road.renderClass === "highway"); const secondary = regular.filter((road) => road.renderClass === "secondary"); const dirt = regular.filter((road) => road.renderClass === "dirt");
    const earthColor = 0xb07a59; this.addRoadLayer(highways, "highway", this.planetId === "earth" ? earthColor : 0xc5a878, this.planetId === "earth" ? .78 : .88, "far");
    this.addRoadLayer(primary, "highway", this.planetId === "earth" ? 0x6d422d : 0x6e4733, .88, "far");
    this.addRoadLayer(secondary, "secondary", this.planetId === "earth" ? 0x8a765d : 0xa7a184, .56, "medium");
    this.addRoadLayer(dirt, "dirt", this.planetId === "earth" ? 0x796144 : 0x8c6b45, .42, "close");
  }

  private surfacePoints(points: Array<{ lat: number; lon: number }>, radius: number): THREE.Vector3[] { const result: THREE.Vector3[] = []; for (let index = 1; index < points.length; index++) { const a = latLonToVector(points[index - 1].lat, points[index - 1].lon); const b = latLonToVector(points[index].lat, points[index].lon); for (let step = 0; step < 9; step++) result.push(a.clone().lerp(b, step / 9).normalize().multiplyScalar(radius)); } result.push(latLonToVector(points.at(-1)!.lat, points.at(-1)!.lon, radius)); return result; }
  private attachToVisibleSurface<T extends THREE.Material>(material: T): T {
    material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vRoadWorldPosition;\nvarying vec3 vRoadSurfaceNormal;").replace("#include <project_vertex>", "#include <project_vertex>\nvec4 roadWorldPosition = modelMatrix * vec4(transformed, 1.0);\nvec3 roadWorldCenter = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;\nvRoadWorldPosition = roadWorldPosition.xyz;\nvRoadSurfaceNormal = normalize(roadWorldPosition.xyz - roadWorldCenter);");
      shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vRoadWorldPosition;\nvarying vec3 vRoadSurfaceNormal;").replace("#include <opaque_fragment>", "float roadFacing = dot(vRoadSurfaceNormal, normalize(cameraPosition - vRoadWorldPosition));\nfloat roadHorizonMask = smoothstep(0.018, 0.065, roadFacing);\ndiffuseColor.a *= roadHorizonMask;\nif (diffuseColor.a <= 0.001) discard;\n#include <opaque_fragment>");
    };
    material.customProgramCacheKey = () => "deadroad-visible-surface-v1";
    return material;
  }
  private addRoadLayer(roads: GlobeWorld["roads"], roadClass: RoadClass, color: number, opacity: number, visibility: RoadVisibility = roadClass === "highway" ? "far" : roadClass === "secondary" ? "medium" : "close", parent: THREE.Object3D = this.globe): void { const positions: number[] = []; const radius = parent === this.roadDebug ? 1.031 : this.planetId === "earth" && roadClass === "dirt" ? 1.029 : 1.025; for (const road of roads) { const points = this.surfacePoints(road.pointLatLon, radius); for (let index = 1; index < points.length; index++) positions.push(...points[index - 1].toArray(), ...points[index].toArray()); } if (!positions.length) return; const geometry = new THREE.BufferGeometry(); geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3)); const material = this.attachToVisibleSurface(new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthTest: true, depthWrite: false })); const object = new THREE.LineSegments(geometry, material); object.renderOrder = parent === this.roadDebug ? 18 : roadClass === "dirt" ? 9 : 8; parent.add(object); if (parent === this.globe) this.roadLayers.push({ object, material, roadClass, visibility, baseOpacity: opacity }); }

  private buildRoadDebug(): void { this.roadDebug.visible = false; this.globe.add(this.roadDebug); const colors = { highway: 0xffc857, secondary: 0x55d6d0, dirt: 0xd68a55 } as const; for (const roadClass of ["highway", "secondary", "dirt"] as const) this.addRoadLayer(this.world.roads.filter((road) => road.renderClass === roadClass), roadClass, colors[roadClass], .92, "far", this.roadDebug); const pointsFor = (nodes: NonNullable<GlobeWorld["roadNodes"]>, color: number, size: number) => { if (!nodes.length) return; const geometry = new THREE.BufferGeometry().setFromPoints(nodes.map((node) => latLonToVector(node.lat, node.lon, 1.048))); this.roadDebug.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color, size, sizeAttenuation: true, depthWrite: false }))); }; const nodes = this.world.roadNodes ?? []; pointsFor(nodes.filter((node) => node.kind === "major_hub"), 0xffe178, .025); pointsFor(nodes.filter((node) => node.kind === "regional_hub" || node.kind === "coverage_outpost"), 0x63d8ce, .014); pointsFor(nodes.filter((node) => node.kind === "local_site" || node.kind === "deployment_lot"), 0xd98a55, .009); pointsFor(nodes.filter((node) => node.kind === "highway_exit"), 0xfff07a, .021); pointsFor(nodes.filter((node) => node.kind === "poi"), 0xff8b5b, .016); pointsFor((this.world.bridges ?? []).map((bridge) => ({ ...bridge, id: bridge.id, kind: "bridge" as const, endpointKind: "bridge" as const, importance: bridge.importance })), 0xeef0d0, .02); const costGeometry = new THREE.BufferGeometry(); const costPositions: number[] = []; const costColors: number[] = []; for (const tile of this.world.tiles.filter((entry) => entry.isLand)) { costPositions.push(...latLonToVector(tile.centerLat, tile.centerLon, 1.044).toArray()); const color = new THREE.Color(tile.terrain === "mountainous" ? 0xd1495b : tile.terrain === "marsh" ? 0x7157a6 : tile.hasRoad ? 0x49c98b : 0xe6a23c); costColors.push(color.r, color.g, color.b); } costGeometry.setAttribute("position", new THREE.Float32BufferAttribute(costPositions, 3)); costGeometry.setAttribute("color", new THREE.Float32BufferAttribute(costColors, 3)); this.roadDebug.add(new THREE.Points(costGeometry, new THREE.PointsMaterial({ vertexColors: true, size: .012, transparent: true, opacity: .72, depthWrite: false })));
  }

  private buildRoadQualityPanel(): void { const reports = this.world.roadQualityReports ?? []; if (!reports.length) return; const panel = document.createElement("pre"); panel.className = "road-quality-report"; panel.hidden = true; panel.textContent = ["ROAD QUALITY REPORT", "H/S/D  SETTLE  LOTS   AVG / MAX   COMP", ...reports.map((report) => `${report.passed ? "PASS" : "FAIL"} ${report.continentId.padEnd(15).slice(0, 15)} ${String(report.highwayCount).padStart(2)}/${String(report.secondaryCount).padStart(3)}/${String(report.dirtCount).padStart(2)}  ${String(Math.round(report.connectedSettlementPercent * 100)).padStart(3)}%   ${String(Math.round(report.connectedDeploymentLotPercent * 100)).padStart(3)}%   ${String(Math.round(report.averageDistanceToRoad)).padStart(3)}/${String(Math.round(report.maxDistanceToRoad)).padStart(3)}km   ${report.disconnectedRoadComponentCount}`), `EXITS ${this.world.roadExits?.length ?? 0} // PURPOSEFUL POIS ${this.world.roadPois?.length ?? 0}`, "F3 COLORS: INTERSTATE / ARTERIAL / LOCAL", "DOTS: HUB / COVERAGE / LOCAL / EXIT / POI", "TILE COST: ROAD / OPEN / MARSH / MOUNTAIN"].join("\n"); this.labelLayer.append(panel); this.roadDebugPanel = panel; }
  private addRiver(points: Array<{ lat: number; lon: number }>, mouthRadius: number): void {
    for (let index = 1; index < points.length; index++) { const curve = new THREE.CatmullRomCurve3(this.surfacePoints([points[index - 1], points[index]], 1.031), false, "catmullrom", .1); const radius = mouthRadius * (.35 + index / points.length * .65); this.globe.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 18, radius, 5, false), new THREE.MeshBasicMaterial({ color: 0x6c9297, transparent: true, opacity: .88 })));
    }
  }

  private placeMarker(marker: THREE.Object3D, lat: number, lon: number, radius: number): void { const normal = latLonToVector(lat, lon).normalize(); marker.position.copy(normal.clone().multiplyScalar(radius)); marker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal); }

  private buildLabels(): void {
    for (const lot of this.world.lots) this.addLabel(lot.id.replace("globe-", ""), lot.lat, lot.lon, 2.85, "debug");
    for (const node of (this.world.roadNodes ?? []).filter((entry) => entry.kind === "major_hub")) this.addLabel(`${node.label ?? node.id} // ${node.importance}`, node.lat, node.lon, 4.8, "debug");
  }

  private addLabel(text: string, lat: number, lon: number, minZoom: number, kind: string): void { const element = document.createElement("span"); element.className = `globe-label ${kind}`; element.textContent = text; if (kind === "debug") element.hidden = true; this.labelLayer.append(element); this.labels.push({ element, position: latLonToVector(lat, lon, 1.095), minZoom, kind }); }

  private createOutline(color: number, width: number): THREE.LineSegments { const geometry = new THREE.BufferGeometry(); const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .95 }); const line = new THREE.LineSegments(geometry, material); line.userData.width = width; line.renderOrder = 20; return line; }
  private updateOverlay(overlay: THREE.LineSegments, tile: WorldTile, visible: boolean): void {
    const territory = earthTerritories.find((entry) => entry.id === tile.regionId); const positions: number[] = [];
    if (territory) for (const polygon of territory.polygons) for (const ring of polygon) { const points = this.surfacePoints(ring.map(([lon, lat]) => ({ lat, lon })), 1.043); for (let index = 1; index < points.length; index++) positions.push(...points[index - 1].toArray(), ...points[index].toArray()); }
    overlay.geometry.dispose(); overlay.geometry = new THREE.BufferGeometry(); overlay.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3)); overlay.visible = visible && positions.length > 0;
  }

  private bind(): void { const canvas = this.renderer.domElement; canvas.addEventListener("pointerdown", this.pointerDown); canvas.addEventListener("pointermove", this.pointerMove); canvas.addEventListener("pointerup", this.pointerUp); canvas.addEventListener("pointerleave", this.pointerLeave); canvas.addEventListener("wheel", this.wheel, { passive: false }); canvas.addEventListener("contextmenu", this.contextMenu); window.addEventListener("resize", this.resize); window.addEventListener("keydown", this.keydown); }
  private pointerDown = (event: PointerEvent): void => { if (event.button !== 0) return; this.dragging = true; this.moved = false; this.lastPointer = { x: event.clientX, y: event.clientY }; this.velocity = { x: 0, y: 0 }; this.renderer.domElement.setPointerCapture(event.pointerId); };
  private pointerMove = (event: PointerEvent): void => {
    if (this.dragging) { const dx = event.clientX - this.lastPointer.x; const dy = event.clientY - this.lastPointer.y; if (Math.hypot(dx, dy) > 2) this.moved = true; const speed = .006; this.globe.rotation.y += dx * speed; this.globe.rotation.x = THREE.MathUtils.clamp(this.globe.rotation.x + dy * speed, -1.2, 1.2); this.velocity = { x: dy * speed, y: dx * speed }; this.lastPointer = { x: event.clientX, y: event.clientY }; this.targetQuaternion = undefined; return; }
    const hit = this.pick(event); const tile = hit?.object.userData.kind === "tile" ? hit.object.userData.tile as WorldTile : undefined; const settlement = hit?.object.userData.kind === "settlement" ? hit.object.userData.settlement as Settlement : undefined; const operation = hit?.object.userData.kind === "war-operation" ? hit.object.userData.operation as WarOperation : undefined;
    if (tile?.id !== this.hoveredTile?.id) { this.hoveredTile = tile; this.updateOverlay(this.hoverOverlay, tile ?? this.world.tiles[0], Boolean(tile)); this.callbacks.onHoverTile(tile); }
    this.callbacks.onHoverSettlement(settlement); this.callbacks.onHoverOperation(operation); this.renderer.domElement.style.cursor = hit ? (this.dragging ? "grabbing" : "pointer") : "grab";
  };
  private pointerUp = (event: PointerEvent): void => { if (!this.dragging) return; this.dragging = false; if (!this.moved) { const hit = this.pick(event); if (hit?.object.userData.kind === "tile") { const tile = hit.object.userData.tile as WorldTile; this.selectedTile = tile; this.updateOverlay(this.selectedOverlay, tile, true); this.callbacks.onSelectTile(tile); } } };
  private pointerLeave = (): void => { this.hoveredTile = undefined; this.hoverOverlay.visible = false; this.callbacks.onHoverTile(); this.callbacks.onHoverSettlement(); this.callbacks.onHoverOperation(); };
  private wheel = (event: WheelEvent): void => { event.preventDefault(); this.camera.position.z = THREE.MathUtils.clamp(this.camera.position.z + event.deltaY * .0019, 2.2, 5.6); };
  private contextMenu = (event: MouseEvent): void => { event.preventDefault(); this.selectedTile = undefined; this.selectedOverlay.visible = false; this.callbacks.onClear(); };
  private keydown = (event: KeyboardEvent): void => { const step = .075; if (["ArrowLeft", "a", "A", "q", "Q"].includes(event.key)) this.globe.rotation.y -= step; if (["ArrowRight", "d", "D", "e", "E"].includes(event.key)) this.globe.rotation.y += step; if (["ArrowUp", "w", "W"].includes(event.key)) this.globe.rotation.x -= step; if (["ArrowDown", "s", "S"].includes(event.key)) this.globe.rotation.x += step; if (["f", "F"].includes(event.key)) this.focusSelected(); if (event.key === "Escape") this.contextMenu(event as unknown as MouseEvent); };

  private pick(event: PointerEvent): THREE.Intersection | undefined {
    const rect = this.renderer.domElement.getBoundingClientRect(); this.pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1); this.raycaster.setFromCamera(this.pointer, this.camera); const hit = this.raycaster.intersectObjects([...this.clickableIcons, ...this.tileMeshes], false)[0];
    if (!hit || !this.tileMeshes.includes(hit.object as THREE.Mesh)) return hit;
    const local = this.globe.worldToLocal(hit.point.clone()).normalize(); const lat = THREE.MathUtils.radToDeg(Math.asin(local.y)); const lon = THREE.MathUtils.radToDeg(Math.atan2(-local.z, local.x)); const territory = earthTerritoryAt(lat, lon);
    const candidates = territory ? this.world.tiles.filter((entry) => entry.regionId === territory.id) : this.world.tiles; const nearest = (candidates.length ? candidates : this.world.tiles).reduce((best, tile) => Math.hypot(tile.centerLat - lat, (tile.centerLon - lon) * .65) < Math.hypot(best.centerLat - lat, (best.centerLon - lon) * .65) ? tile : best);
    const region = territory ? this.world.regions.find((entry) => entry.id === territory.id) : undefined; hit.object.userData = { kind: "tile", tile: territory && region ? { ...nearest, centerLat: lat, centerLon: lon, regionId: territory.id, state: region.state, threat: region.threat, infestation: region.infestation, isLand: true, continentId: territory.group } : { ...nearest, centerLat: lat, centerLon: lon, isLand: false, hasRoad: false, hasDeployLot: false } }; return hit;
  }
  private resize = (): void => { const width = Math.max(1, this.mount.clientWidth); const height = Math.max(1, this.mount.clientHeight); this.camera.aspect = width / height; this.camera.updateProjectionMatrix(); this.renderer.setSize(width, height, false); };
  private animate = (): void => {
    this.frame = requestAnimationFrame(this.animate); if (!this.dragging && !this.targetQuaternion) { this.globe.rotation.x += this.velocity.x; this.globe.rotation.y += this.velocity.y; this.velocity.x *= .9; this.velocity.y *= .9; }
    if (this.targetQuaternion) { this.globe.quaternion.slerp(this.targetQuaternion, .085); if (this.globe.quaternion.angleTo(this.targetQuaternion) < .004) this.targetQuaternion = undefined; }
    const now = performance.now(); this.globe.updateMatrixWorld(); for (const layer of this.roadLayers) { const visibility = this.debug || layer.visibility === "far" ? 1 : layer.visibility === "medium" ? 1 - THREE.MathUtils.smoothstep(this.camera.position.z, 4.45, 4.95) : 1 - THREE.MathUtils.smoothstep(this.camera.position.z, 3.65, 4.35); layer.material.opacity = layer.baseOpacity * visibility; layer.object.visible = visibility > .002; }
    for (const marker of this.clickableIcons) { const worldPosition = marker.position.clone().applyMatrix4(this.globe.matrixWorld); const facing = worldPosition.dot(this.camera.position) > .18; const far = this.camera.position.z > 4.05; const clustered = (marker.userData.iconIndex ?? 0) % 3 === 0 || (marker.userData.settlement?.threat ?? 0) >= 5; marker.visible = facing && (!far || clustered); marker.scale.setScalar(THREE.MathUtils.clamp(4.2 / this.camera.position.z, .8, 1.45)); }
    for (const marker of this.warOperationMarkers) { const worldPosition = marker.position.clone().applyMatrix4(this.globe.matrixWorld); const facing = worldPosition.dot(this.camera.position) > .2; const operation = marker.userData.operation as WarOperation; const pulse = ["staging", "active"].includes(operation.status) ? 1 + Math.sin(now / 260 + marker.position.y * 8) * .15 : 1; const farScale = this.camera.position.z > 4.05 ? .72 : 1; marker.visible = this.debug && facing; marker.scale.setScalar((marker.userData.baseScale as number) * farScale * pulse * THREE.MathUtils.clamp(4.4 / this.camera.position.z, .78, 1.55)); }
    this.updateLabels(); this.renderer.render(this.scene, this.camera);
  };
  private updateLabels(): void {
    this.globe.updateMatrixWorld(); const rect = this.renderer.domElement.getBoundingClientRect(); const zoom = this.camera.position.z;
    for (const label of this.labels) { if ((label.kind === "debug" && !this.debug) || zoom > label.minZoom && label.minZoom > 0) { label.element.style.opacity = "0"; continue; } const worldPosition = label.position.clone().applyMatrix4(this.globe.matrixWorld); const facing = worldPosition.dot(this.camera.position) > .2; const projected = worldPosition.clone().project(this.camera); const onScreen = Math.abs(projected.x) < 1.05 && Math.abs(projected.y) < 1.05; label.element.style.opacity = facing && onScreen ? "1" : "0"; label.element.style.transform = `translate(-50%,-50%) translate(${(projected.x * .5 + .5) * rect.width}px, ${(-projected.y * .5 + .5) * rect.height}px)`; }
  }
}
