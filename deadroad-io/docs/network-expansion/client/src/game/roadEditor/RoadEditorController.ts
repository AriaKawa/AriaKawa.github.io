import {
  EDITOR_INITIAL_VIEW, EDITOR_MAP, LEGACY_ROAD_EDITOR_STORAGE_KEY, ROAD_EDITOR_STORAGE_KEY, ROAD_STYLES, cloneRoads, createExport, createRoad,
  parseRoadEditorExport, sampleCatmullRom, validateRoads, type AuthoredRoad, type EditorPoint, type RoadClass
} from "./RoadEditorData";
import { PlanetOneReferenceMap } from "./PlanetOneReferenceMap";
import { CURATED_USA_LAYER_NAME } from "./CuratedUSARoadLayer";
import { planetOneAuthoredRoads as curatedUSARoads } from "./PlanetOneRoadNetwork";
import { TexturedRoadRenderer } from "./TexturedRoadRenderer";
import { applyAngleSnap, findSnapCandidate, snapToGrid, type SnapCandidate } from "./RoadSnapSystem";
import type { WorldRoad } from "../../globe/GlobeData";
import { theaterLatLon, theaterPoint } from "../AmericasTheater";

type EditorSnapshot = { roads: AuthoredRoad[]; draft?: AuthoredRoad; selectedRoadId?: string; selectedPointIndex?: number };
type DragPoint = { road: AuthoredRoad; index: number; before: EditorSnapshot; moved: boolean };
type PanGesture = { clientX: number; clientY: number; panX: number; panY: number };
type NavigationFrame = { canvas: HTMLCanvasElement; zoom: number; panX: number; panY: number; width: number; height: number };
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export class RoadEditorController {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private roads: AuthoredRoad[] = curatedUSARoads();
  private draft?: AuthoredRoad;
  private selectedRoadId?: string;
  private selectedPointIndex?: number;
  private undoStack: EditorSnapshot[] = [];
  private redoStack: EditorSnapshot[] = [];
  private cursor?: EditorPoint;
  private currentSnap?: SnapCandidate;
  private zoom = 1;
  private panX = 0;
  private panY = 0;
  private dragPoint?: DragPoint;
  private panGesture?: PanGesture;
  private spaceHeld = false;
  private shiftHeld = false;
  private controlHeld = false;
  private resizeObserver: ResizeObserver;
  private events = new AbortController();
  private dataMode: "export" | "import" = "export";
  private roadCounter = 1;
  private noticeTimer?: number;
  private navigationFrame?: NavigationFrame;
  private navigationRequest?: number;
  private wheelSettleTimer?: number;
  private roadRenderer = new TexturedRoadRenderer();
  private referenceMap: PlanetOneReferenceMap;

  private roadType: HTMLSelectElement;
  private roadName: HTMLInputElement;
  private roadWidth: HTMLInputElement;
  private widthValue: HTMLElement;
  private roadSummary: HTMLElement;
  private roadCount: HTMLElement;
  private pointCount: HTMLElement;
  private coordinates: HTMLElement;
  private warnings: HTMLElement;
  private status: HTMLElement;
  private dialog: HTMLDialogElement;
  private dataText: HTMLTextAreaElement;
  private snapping: HTMLInputElement;
  private showReferenceRoads: HTMLInputElement;
  private showEditorRoads: HTMLInputElement;
  private showGrid: HTMLInputElement;
  private snapStatus: HTMLElement;
  private currentType: HTMLElement;

  constructor(private shell: HTMLElement, referenceRoads: WorldRoad[], private onPlanet: (planet: "planet1-current" | "planet2-missouri") => void, private onExit: () => void) {
    this.referenceMap = new PlanetOneReferenceMap(referenceRoads);
    this.canvas = this.element("road-editor-canvas"); const context = this.canvas.getContext("2d"); if (!context) throw new Error("Road editor canvas is unavailable."); this.context = context;
    this.roadType = this.element("road-editor-type"); this.roadName = this.element("road-editor-name"); this.roadWidth = this.element("road-editor-width"); this.widthValue = this.element("road-editor-width-value");
    this.roadSummary = this.element("road-editor-selection"); this.roadCount = this.element("road-editor-road-count"); this.pointCount = this.element("road-editor-point-count"); this.coordinates = this.element("road-editor-coordinates");
    this.warnings = this.element("road-editor-warnings"); this.status = this.element("road-editor-status"); this.dialog = this.element("road-editor-data-dialog"); this.dataText = this.element("road-editor-data-text");
    this.snapping = this.element("road-editor-snapping"); this.showReferenceRoads = this.element("road-editor-reference-roads"); this.showEditorRoads = this.element("road-editor-authored-roads"); this.showGrid = this.element("road-editor-grid"); this.snapStatus = this.element("road-editor-snap-status"); this.currentType = this.element("road-editor-current-type");
    this.showReferenceRoads.checked = false; this.showEditorRoads.checked = true; this.syncCounter();
    this.shell.hidden = false; this.bindUi(); this.bindCanvas(); this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(this.canvas); this.resize(); this.updateUi();
    this.setStatus(`${CURATED_USA_LAYER_NAME} loaded. Preparing terrain…`); void this.loadReference();
  }

  destroy(): void { this.events.abort(); this.resizeObserver.disconnect(); window.clearTimeout(this.noticeTimer); window.clearTimeout(this.wheelSettleTimer); if (this.navigationRequest !== undefined) cancelAnimationFrame(this.navigationRequest); if (this.dialog.open) this.dialog.close(); this.shell.hidden = true; }
  private element<T extends HTMLElement>(id: string): T { const element = document.getElementById(id); if (!element) throw new Error(`Missing road editor element #${id}`); return element as T; }
  private async loadReference(): Promise<void> {
    await this.referenceMap.load();
    if (import.meta.env.DEV && new URLSearchParams(location.search).has("road-lab")) {
      const { roadLabFixtureRoads } = await import("./RoadNetworkFixtures");
      const origin = theaterPoint(38.5, -98); this.roads = roadLabFixtureRoads(origin);
      const rect = this.canvas.getBoundingClientRect(); this.zoom = Math.min((rect.width - 50) / 2050, (rect.height - 60) / 650);
      this.panX = 25 - origin.x * this.zoom; this.panY = 30 - origin.y * this.zoom;
      this.syncCounter(); this.updateUi();
    }
    this.render(); this.setStatus(`${CURATED_USA_LAYER_NAME} · ${this.roads.length} editable roads. Click a road to select; Save Local keeps your changes.`);
  }

  private bindUi(): void {
    const click = (id: string, fn: () => void) => this.element<HTMLButtonElement>(id).addEventListener("click", fn, { signal: this.events.signal });
    click("editor-planet-1-button", () => this.onPlanet("planet1-current")); click("editor-planet-2-button", () => this.onPlanet("planet2-missouri")); click("road-editor-back", this.onExit);
    click("road-editor-new", () => this.startRoad()); click("road-editor-finish", () => this.finishRoad()); click("road-editor-cancel", () => this.cancelRoad()); click("road-editor-delete", () => this.deleteSelected());
    click("road-editor-undo", () => this.undo()); click("road-editor-redo", () => this.redo()); click("road-editor-save", () => this.saveLocal()); click("road-editor-load", () => this.loadLocal());
    click("road-editor-curated", () => this.loadCurated());
    click("road-editor-export", () => this.openDataDialog("export")); click("road-editor-import", () => this.openDataDialog("import")); click("road-editor-clear", () => this.clearEditor());
    click("road-editor-data-close", () => this.dialog.close()); click("road-editor-data-apply", () => this.applyImport()); click("road-editor-data-copy", () => void this.copyExport()); click("road-editor-data-download", () => this.downloadExport());
    this.roadType.addEventListener("change", () => this.updateRoadClass(this.roadType.value as RoadClass), { signal: this.events.signal });
    this.roadName.addEventListener("input", () => this.updateRoadNameLive(this.roadName.value), { signal: this.events.signal }); this.roadWidth.addEventListener("input", () => this.updateRoadWidthLive(Number(this.roadWidth.value)), { signal: this.events.signal });
    for (const toggle of [this.snapping, this.showReferenceRoads, this.showEditorRoads, this.showGrid]) toggle.addEventListener("change", () => { this.currentSnap = undefined; this.updateUi(); }, { signal: this.events.signal });
    window.addEventListener("keydown", this.onKeyDown, { signal: this.events.signal, capture: true }); window.addEventListener("keyup", this.onKeyUp, { signal: this.events.signal, capture: true });
  }

  private bindCanvas(): void {
    const options = { signal: this.events.signal }; this.canvas.addEventListener("contextmenu", (event) => event.preventDefault(), options); this.canvas.addEventListener("pointerdown", (event) => this.pointerDown(event), options);
    this.canvas.addEventListener("pointermove", (event) => this.pointerMove(event), options); this.canvas.addEventListener("pointerup", (event) => this.pointerUp(event), options); this.canvas.addEventListener("pointercancel", (event) => this.pointerUp(event), options);
    this.canvas.addEventListener("pointerleave", () => { if (!this.dragPoint && !this.panGesture) { this.cursor = undefined; this.currentSnap = undefined; this.coordinates.textContent = "LAT —  LON —"; this.updateSnapStatus(); this.render(); } }, options);
    this.canvas.addEventListener("wheel", (event) => this.zoomAt(event), { passive: false, signal: this.events.signal });
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    const target = event.target as HTMLElement | null; const typing = target?.matches("input, textarea, select");
    const editorKey = event.code === "Space" || ["Enter", "Escape", "Backspace", "Delete"].includes(event.key) || (event.ctrlKey || event.metaKey) && ["z", "y"].includes(event.key.toLowerCase());
    if (editorKey && !typing) event.stopImmediatePropagation();
    if (event.code === "Space" && !typing) { this.spaceHeld = true; event.preventDefault(); } this.shiftHeld = event.shiftKey; this.controlHeld = event.ctrlKey || event.metaKey; if (typing) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? this.redo() : this.undo(); return; }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") { event.preventDefault(); this.redo(); return; }
    if (event.key.toLowerCase() === "f") { event.preventDefault(); this.focusRoads(); }
    if (event.key === "Enter") { event.preventDefault(); this.finishRoad(); } else if (event.key === "Escape") { event.preventDefault(); this.draft ? this.cancelRoad() : this.deselect(); }
    else if (event.key === "Backspace" && this.draft) { event.preventDefault(); this.removeLastDraftPoint(); } else if (event.key === "Delete") { event.preventDefault(); this.deleteSelected(); }
    this.render();
  };
  private onKeyUp = (event: KeyboardEvent): void => { if (event.code === "Space") this.spaceHeld = false; this.shiftHeld = event.shiftKey; this.controlHeld = event.ctrlKey || event.metaKey; this.render(); };

  private snapshot(): EditorSnapshot { return { roads: cloneRoads(this.roads), draft: this.draft ? cloneRoads([this.draft])[0] : undefined, selectedRoadId: this.selectedRoadId, selectedPointIndex: this.selectedPointIndex }; }
  private restore(snapshot: EditorSnapshot): void { this.roads = cloneRoads(snapshot.roads); this.draft = snapshot.draft ? cloneRoads([snapshot.draft])[0] : undefined; this.selectedRoadId = snapshot.selectedRoadId; this.selectedPointIndex = snapshot.selectedPointIndex; this.updateUi(); }
  private mutate(change: () => void): void { this.undoStack.push(this.snapshot()); if (this.undoStack.length > 100) this.undoStack.shift(); this.redoStack = []; change(); this.updateUi(); }
  private selectedRoad(): AuthoredRoad | undefined { return this.draft ?? this.roads.find((road) => road.id === this.selectedRoadId); }

  private startRoad(): void {
    if (this.draft) { this.setStatus("Finish or cancel the current road before starting another.", true); return; }
    const roadClass = this.roadType.value as RoadClass; let id = ""; do { id = `road_${String(this.roadCounter++).padStart(3, "0")}`; } while (this.roads.some((road) => road.id === id));
    this.mutate(() => { this.draft = createRoad(id, roadClass, this.roadName.value.trim()); this.draft.width = Number(this.roadWidth.value); this.selectedRoadId = undefined; this.selectedPointIndex = undefined; });
    this.setStatus("Road tool active. Click a start point, add curved nodes, then press Enter.");
  }
  private finishRoad(): void {
    if (!this.draft) { this.setStatus("Press New Road before placing points.", true); return; } if (this.draft.points.length < 2) { this.setStatus("A road needs at least two points before it can be finished.", true); return; }
    const id = this.draft.id; this.mutate(() => { this.draft!.name = this.roadName.value.trim(); this.roads.push(this.draft!); this.draft = undefined; this.currentSnap = undefined; this.selectedRoadId = id; this.selectedPointIndex = undefined; }); this.setStatus(`${this.selectedRoad()?.name || id} finished. Drag its nodes to reshape the layered road.`);
  }
  private cancelRoad(): void { if (!this.draft) return; this.mutate(() => { this.draft = undefined; this.currentSnap = undefined; this.selectedPointIndex = undefined; }); this.setStatus("Current road cancelled."); }
  private removeLastDraftPoint(): void { if (!this.draft?.points.length) return; this.mutate(() => { this.draft!.points.pop(); }); this.setStatus("Last control point removed."); }
  private deleteSelected(): void {
    const road = this.selectedRoad(); if (!road) { this.setStatus("Select a road or point to delete.", true); return; } if (this.draft) { this.cancelRoad(); return; }
    if (this.selectedPointIndex !== undefined) { const pointNumber = this.selectedPointIndex + 1; this.mutate(() => { road.points.splice(this.selectedPointIndex!, 1); this.selectedPointIndex = undefined; if (road.points.length < 2) { this.roads = this.roads.filter((candidate) => candidate.id !== road.id); this.selectedRoadId = undefined; } }); this.setStatus(road.points.length < 2 ? "Road removed because fewer than two points remained." : `Point ${pointNumber} deleted.`); return; }
    this.mutate(() => { this.roads = this.roads.filter((candidate) => candidate.id !== road.id); this.selectedRoadId = undefined; }); this.setStatus("Selected road deleted.");
  }
  private deselect(): void { this.selectedRoadId = undefined; this.selectedPointIndex = undefined; this.updateUi(); this.setStatus("Selection cleared."); }
  private undo(): void { const previous = this.undoStack.pop(); if (!previous) { this.setStatus("Nothing to undo.", true); return; } this.redoStack.push(this.snapshot()); this.restore(previous); this.setStatus("Undo complete."); }
  private redo(): void { const next = this.redoStack.pop(); if (!next) { this.setStatus("Nothing to redo.", true); return; } this.undoStack.push(this.snapshot()); this.restore(next); this.setStatus("Redo complete."); }

  private updateRoadClass(roadClass: RoadClass): void { const road = this.selectedRoad(); if (!road) { this.roadWidth.value = String(ROAD_STYLES[roadClass].width); this.updateUi(); return; } this.mutate(() => { road.roadClass = roadClass; road.width = ROAD_STYLES[roadClass].width; }); this.setStatus(`Road material changed to ${ROAD_STYLES[roadClass].label}.`); }
  private updateRoadNameLive(name: string): void { const road = this.selectedRoad(); if (!road) return; road.name = name.trim(); this.updateSummary(); }
  private updateRoadWidthLive(width: number): void { this.widthValue.textContent = `${this.roadWidth.value}px`; const road = this.selectedRoad(); if (!road || !Number.isFinite(width)) return; road.width = clamp(width, 4, 120); this.render(); }

  private resolveSnap(point: EditorPoint, excludeRoadId?: string): SnapCandidate | undefined {
    if (!this.snapping.checked || this.shiftHeld) return undefined;
    const anchor = this.draft?.points.at(-1); if (this.controlHeld && anchor) return applyAngleSnap(anchor, point);
    const target = findSnapCandidate(point, this.roads, this.showReferenceRoads.checked ? this.referenceMap.snapRoads : [], 22 / this.zoom, excludeRoadId); if (target) return target;
    if (this.showGrid.checked) { const grid = snapToGrid(point, 2500); if (grid.distance <= 14 / this.zoom) return grid; }
    return undefined;
  }
  private clampPoint(point: EditorPoint): EditorPoint { return { ...point, x: Math.round(clamp(point.x, 0, EDITOR_MAP.width) * 10) / 10, y: Math.round(clamp(point.y, 0, EDITOR_MAP.height) * 10) / 10 }; }
  private placementPoint(raw: EditorPoint, excludeRoadId?: string): EditorPoint { const snap = this.resolveSnap(raw, excludeRoadId); this.currentSnap = snap; return this.clampPoint(snap ? { ...snap.point, connection: snap.connection } : raw); }

  private pointerDown(event: PointerEvent): void {
    this.canvas.setPointerCapture(event.pointerId); const raw = this.screenToWorld(event.offsetX, event.offsetY);
    if (event.button === 1 || event.button === 2 || this.spaceHeld && event.button === 0) { this.beginNavigation(); this.panGesture = { clientX: event.clientX, clientY: event.clientY, panX: this.panX, panY: this.panY }; this.canvas.classList.add("panning"); return; }
    if (event.button !== 0) return;
    if (this.draft) { const point = this.placementPoint(raw, this.draft.id); const previous = this.draft.points.at(-1); if (previous && Math.hypot(point.x - previous.x, point.y - previous.y) < 12) { this.setStatus("That segment is too short. Move farther before placing the next node.", true); return; } this.mutate(() => { this.draft!.points.push(point); }); this.selectedPointIndex = this.draft.points.length - 1; this.setStatus(this.currentSnap ? `${this.currentSnap.type.toUpperCase()} connection placed.` : `${this.draft.points.length} control point${this.draft.points.length === 1 ? "" : "s"} placed.`); return; }
    const point = this.clampPoint(raw); const handle = this.findHandle(point); if (handle) { this.selectedRoadId = handle.road.id; this.selectedPointIndex = handle.index; this.dragPoint = { road: handle.road, index: handle.index, before: this.snapshot(), moved: false }; this.updateUi(); return; }
    const road = this.findRoad(point); this.selectedRoadId = road?.id; this.selectedPointIndex = undefined; this.updateUi();
  }

  private pointerMove(event: PointerEvent): void {
    if (this.panGesture) { this.panX = this.panGesture.panX + event.clientX - this.panGesture.clientX; this.panY = this.panGesture.panY + event.clientY - this.panGesture.clientY; this.requestNavigationPreview(); return; }
    const raw = this.screenToWorld(event.offsetX, event.offsetY); this.cursor = raw; this.currentSnap = this.resolveSnap(raw, this.dragPoint?.road.id ?? this.draft?.id); const display = this.currentSnap?.point ?? raw; const geo = theaterLatLon(display); this.coordinates.textContent = `${Math.abs(geo.lat).toFixed(2)}°${geo.lat >= 0 ? "N" : "S"}  ${Math.abs(geo.lon).toFixed(2)}°${geo.lon >= 0 ? "E" : "W"}`;
    if (this.dragPoint) { this.dragPoint.road.points[this.dragPoint.index] = this.clampPoint(this.currentSnap ? { ...this.currentSnap.point, connection: this.currentSnap.connection } : raw); this.dragPoint.moved = true; }
    this.updateSnapStatus(); this.render();
  }
  private pointerUp(event: PointerEvent): void { if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId); const wasPanning = Boolean(this.panGesture); if (this.dragPoint?.moved) { this.undoStack.push(this.dragPoint.before); if (this.undoStack.length > 100) this.undoStack.shift(); this.redoStack = []; this.updateUi(); this.setStatus(this.currentSnap ? `Control point connected by ${this.currentSnap.type} snap.` : "Control point moved."); } this.dragPoint = undefined; this.panGesture = undefined; this.canvas.classList.remove("panning"); wasPanning ? this.finishNavigation() : this.render(); }
  private zoomAt(event: WheelEvent): void {
    event.preventDefault(); this.beginNavigation(); const before = this.screenToWorld(event.offsetX, event.offsetY);
    this.zoom = clamp(this.zoom * Math.exp(-event.deltaY * .0013), .0025, 1.7); this.panX = event.offsetX - before.x * this.zoom; this.panY = event.offsetY - before.y * this.zoom;
    this.requestNavigationPreview(); window.clearTimeout(this.wheelSettleTimer); this.wheelSettleTimer = window.setTimeout(() => this.finishNavigation(), 90);
  }

  /** Keep expensive terrain generation and polygon clipping out of pointer/wheel events. */
  private beginNavigation(): void {
    window.clearTimeout(this.wheelSettleTimer); this.wheelSettleTimer = undefined;
    if (this.navigationFrame) return;
    const rect = this.canvas.getBoundingClientRect(); if (!rect.width || !rect.height) return;
    const snapshot = document.createElement("canvas"); snapshot.width = this.canvas.width; snapshot.height = this.canvas.height;
    snapshot.getContext("2d")?.drawImage(this.canvas, 0, 0);
    this.navigationFrame = { canvas: snapshot, zoom: this.zoom, panX: this.panX, panY: this.panY, width: rect.width, height: rect.height };
  }
  private requestNavigationPreview(): void {
    if (this.navigationRequest !== undefined) return;
    this.navigationRequest = requestAnimationFrame(() => { this.navigationRequest = undefined; this.drawNavigationPreview(); });
  }
  private drawNavigationPreview(): void {
    const frame = this.navigationFrame; if (!frame) { this.render(); return; }
    const rect = this.canvas.getBoundingClientRect(); if (rect.width !== frame.width || rect.height !== frame.height) { this.finishNavigation(); return; }
    const ctx = this.context; const dpr = this.canvas.width / rect.width; const scale = this.zoom / frame.zoom;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = "#101a1d"; ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.imageSmoothingEnabled = true;
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * (this.panX - frame.panX * scale), dpr * (this.panY - frame.panY * scale));
    ctx.drawImage(frame.canvas, 0, 0, frame.width, frame.height);
  }
  private finishNavigation(): void {
    window.clearTimeout(this.wheelSettleTimer); this.wheelSettleTimer = undefined;
    if (this.navigationRequest !== undefined) { cancelAnimationFrame(this.navigationRequest); this.navigationRequest = undefined; }
    this.navigationFrame = undefined; this.render();
  }
  private screenToWorld(x: number, y: number): EditorPoint { return { x: (x - this.panX) / this.zoom, y: (y - this.panY) / this.zoom }; }
  private focusRoads(): void {
    const points = (this.selectedRoad() ? [this.selectedRoad()!] : this.roads).flatMap(r => r.points); if (!points.length) return;
    const left = Math.min(...points.map(p => p.x)) - 100, right = Math.max(...points.map(p => p.x)) + 100;
    const top = Math.min(...points.map(p => p.y)) - 100, bottom = Math.max(...points.map(p => p.y)) + 100;
    const rect = this.canvas.getBoundingClientRect(); this.zoom = Math.min(1.7, (rect.width - 30) / (right - left), (rect.height - 70) / (bottom - top));
    this.panX = rect.width / 2 - (left + right) / 2 * this.zoom; this.panY = rect.height / 2 - (top + bottom) / 2 * this.zoom; this.render();
  }
  private worldToScreen = (point: EditorPoint): EditorPoint => ({ x: point.x * this.zoom + this.panX, y: point.y * this.zoom + this.panY });

  private findHandle(point: EditorPoint): { road: AuthoredRoad; index: number } | undefined { const road = this.selectedRoad(); if (!road) return undefined; const radius = 13 / this.zoom; for (let index = road.points.length - 1; index >= 0; index--) if (Math.hypot(road.points[index].x - point.x, road.points[index].y - point.y) <= radius) return { road, index }; return undefined; }
  private findRoad(point: EditorPoint): AuthoredRoad | undefined { let best: { road: AuthoredRoad; distance: number } | undefined; for (const road of [...this.roads].reverse()) { const sampled = sampleCatmullRom(road.points, 14); for (let index = 1; index < sampled.length; index++) { const distance = this.pointSegmentDistance(point, sampled[index - 1], sampled[index]); if (distance <= Math.max(10 / this.zoom, road.width / 2) && (!best || distance < best.distance)) best = { road, distance }; } } return best?.road; }
  private pointSegmentDistance(point: EditorPoint, a: EditorPoint, b: EditorPoint): number { const dx = b.x - a.x; const dy = b.y - a.y; const length = dx * dx + dy * dy; const t = length ? clamp(((point.x - a.x) * dx + (point.y - a.y) * dy) / length, 0, 1) : 0; return Math.hypot(point.x - (a.x + dx * t), point.y - (a.y + dy * t)); }

  private loadCurated(): void {
    this.mutate(() => { this.roads = curatedUSARoads(); this.draft = undefined; this.selectedRoadId = undefined; this.selectedPointIndex = undefined; this.currentSnap = undefined; });
    this.showReferenceRoads.checked = false; this.showEditorRoads.checked = true; this.syncCounter(); this.focusRoads();
    this.setStatus(`${CURATED_USA_LAYER_NAME} loaded. Undo restores your previous draft; local saves are kept until you press Save Local.`);
  }
  private saveLocal(): void { try { localStorage.setItem(ROAD_EDITOR_STORAGE_KEY, JSON.stringify(createExport(this.roads))); this.setStatus(`${this.roads.length} editor road${this.roads.length === 1 ? "" : "s"} saved separately from Planet 1.`); } catch { this.setStatus("The browser could not save editor data locally.", true); } }
  private loadLocal(): void { const saved = localStorage.getItem(ROAD_EDITOR_STORAGE_KEY) ?? localStorage.getItem(LEGACY_ROAD_EDITOR_STORAGE_KEY); if (!saved) { this.setStatus("No local Planet 3 save was found in this browser.", true); return; } try { const data = parseRoadEditorExport(saved); this.mutate(() => { this.roads = data.roads; this.draft = undefined; this.selectedRoadId = undefined; this.selectedPointIndex = undefined; }); this.syncCounter(); this.setStatus(`${this.roads.length} saved road${this.roads.length === 1 ? "" : "s"} loaded.`); } catch (error) { this.setStatus(error instanceof Error ? error.message : "Saved editor data is invalid.", true); } }
  private syncCounter(): void { this.roadCounter = Math.max(1, ...this.roads.map((road) => Number(road.id.match(/(\d+)$/)?.[1] ?? 0) + 1)); }
  private openDataDialog(mode: "export" | "import"): void { this.dataMode = mode; const exportMode = mode === "export"; this.element("road-editor-data-title").textContent = exportMode ? "EXPORT PLANET 3 ROADS" : "IMPORT PLANET 3 ROADS"; this.element("road-editor-data-help").textContent = exportMode ? "Copy or download this version 2 overlay. Planet 1 terrain and roads are never included or changed." : "Paste a version 2 Planet 3 export. Legacy Missouri exports are migrated to the Planet 1 coordinate space."; this.element<HTMLButtonElement>("road-editor-data-apply").hidden = exportMode; this.element<HTMLButtonElement>("road-editor-data-copy").hidden = !exportMode; this.element<HTMLButtonElement>("road-editor-data-download").hidden = !exportMode; this.dataText.readOnly = exportMode; this.dataText.value = exportMode ? JSON.stringify(createExport(this.roads), null, 2) : ""; const warnings = validateRoads(this.roads); this.warnings.textContent = warnings.length ? `${warnings.length} warning${warnings.length === 1 ? "" : "s"}:\n${warnings.join("\n")}` : "Validation passed. No road warnings."; this.dialog.showModal(); this.dataText.focus(); if (exportMode) this.dataText.select(); }
  private applyImport(): void { if (this.dataMode !== "import") return; try { const data = parseRoadEditorExport(this.dataText.value); this.mutate(() => { this.roads = data.roads; this.draft = undefined; this.selectedRoadId = undefined; this.selectedPointIndex = undefined; }); this.syncCounter(); this.dialog.close(); this.setStatus(`${this.roads.length} road${this.roads.length === 1 ? "" : "s"} imported into the isolated editor layer.`); } catch (error) { this.warnings.textContent = error instanceof Error ? error.message : "Could not import that JSON."; } }
  private async copyExport(): Promise<void> { try { await navigator.clipboard.writeText(this.dataText.value); this.setStatus("Road JSON copied to the clipboard."); } catch { this.dataText.focus(); this.dataText.select(); document.execCommand("copy"); this.setStatus("Road JSON copied to the clipboard."); } }
  private downloadExport(): void { const blob = new Blob([this.dataText.value], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `deadroad-planet3-roads-${new Date().toISOString().slice(0, 10)}.json`; link.click(); URL.revokeObjectURL(url); this.setStatus("Planet 3 road JSON downloaded."); }
  private clearEditor(): void { if (!this.roads.length && !this.draft) { this.setStatus("The editor layer is already empty."); return; } if (!window.confirm("Clear every editable Planet 3 road? Planet 1 and its locked reference roads will remain unchanged.")) return; this.mutate(() => { this.roads = []; this.draft = undefined; this.selectedRoadId = undefined; this.selectedPointIndex = undefined; }); this.setStatus("Editor layer cleared. Planet 1 was not changed."); }

  private updateSummary(): void { const road = this.selectedRoad(); this.roadSummary.textContent = road ? `${this.draft ? "DRAWING" : "SELECTED"} // ${road.name || road.id} // ${ROAD_STYLES[road.roadClass].label.toUpperCase()}` : "NO ROAD SELECTED"; }
  private updateSnapStatus(): void { const disabled = !this.snapping.checked || this.shiftHeld; this.snapStatus.textContent = disabled ? "OFF" : this.currentSnap ? this.currentSnap.type.toUpperCase() : "READY"; this.snapStatus.classList.toggle("active", Boolean(this.currentSnap) && !disabled); }
  private updateUi(): void { const road = this.selectedRoad(); const drawing = Boolean(this.draft); if (road) { this.roadType.value = road.roadClass; this.roadName.value = road.name; this.roadWidth.value = String(road.width); } else if (!this.roadType.value) this.roadType.value = "highway"; this.widthValue.textContent = `${this.roadWidth.value}px`; this.roadCount.textContent = String(this.roads.length); this.pointCount.textContent = String(road?.points.length ?? 0); this.currentType.textContent = ROAD_STYLES[this.roadType.value as RoadClass].label.toUpperCase(); this.updateSummary(); this.updateSnapStatus(); this.element<HTMLButtonElement>("road-editor-finish").disabled = !drawing || (road?.points.length ?? 0) < 2; this.element<HTMLButtonElement>("road-editor-cancel").disabled = !drawing; this.element<HTMLButtonElement>("road-editor-delete").disabled = !road; this.element<HTMLButtonElement>("road-editor-undo").disabled = !this.undoStack.length; this.element<HTMLButtonElement>("road-editor-redo").disabled = !this.redoStack.length; this.canvas.classList.toggle("drawing", drawing); this.render(); }
  private setStatus(message: string, error = false): void { this.status.textContent = message; this.status.classList.toggle("error", error); window.clearTimeout(this.noticeTimer); this.noticeTimer = window.setTimeout(() => this.status.classList.remove("error"), 3000); }
  private resize(): void { window.clearTimeout(this.wheelSettleTimer); this.wheelSettleTimer = undefined; if (this.navigationRequest !== undefined) cancelAnimationFrame(this.navigationRequest); this.navigationRequest = undefined; this.navigationFrame = undefined; const rect = this.canvas.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2); this.canvas.width = Math.max(1, Math.round(rect.width * dpr)); this.canvas.height = Math.max(1, Math.round(rect.height * dpr)); if (this.zoom === 1 && this.panX === 0 && this.panY === 0) { const width = EDITOR_INITIAL_VIEW.right - EDITOR_INITIAL_VIEW.left; const height = EDITOR_INITIAL_VIEW.bottom - EDITOR_INITIAL_VIEW.top; this.zoom = Math.min((rect.width - 54) / width, (rect.height - 54) / height); this.panX = (rect.width - width * this.zoom) / 2 - EDITOR_INITIAL_VIEW.left * this.zoom; this.panY = (rect.height - height * this.zoom) / 2 - EDITOR_INITIAL_VIEW.top * this.zoom; } this.render(); }

  private render(): void {
    const rect = this.canvas.getBoundingClientRect(); if (!rect.width || !rect.height) return; const dpr = this.canvas.width / rect.width; const ctx = this.context;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, rect.width, rect.height); ctx.fillStyle = "#101a1d"; ctx.fillRect(0, 0, rect.width, rect.height);
    this.referenceMap.draw(ctx, this.worldToScreen, this.zoom); if (this.showGrid.checked) this.drawGrid(ctx);
    if (this.showEditorRoads.checked) {
      const cursorPoint = this.draft && this.cursor ? this.clampPoint(this.currentSnap ? { ...this.currentSnap.point, connection: this.currentSnap.connection } : this.cursor) : undefined;
      const preview = this.draft && cursorPoint && this.draft.points.length ? { ...this.draft, points: [...this.draft.points, cursorPoint] } : this.draft;
      const last = this.draft?.points.at(-1); const valid = !last || !cursorPoint || Math.hypot(last.x - cursorPoint.x, last.y - cursorPoint.y) >= 24;
      this.roadRenderer.drawNetwork(ctx, [...(this.showReferenceRoads.checked ? this.referenceMap.roads : []), ...this.roads, ...(preview ? [preview] : [])], this.worldToScreen, this.zoom, { selectedRoadId: this.selectedRoadId, previewRoadId: preview?.id, previewValid: valid });
      if (this.draft) this.drawHandles(ctx, this.draft, true); else if (this.selectedRoad()) this.drawHandles(ctx, this.selectedRoad()!, false);
    } else if (this.showReferenceRoads.checked) {
      this.roadRenderer.drawNetwork(ctx, this.referenceMap.roads, this.worldToScreen, this.zoom);
    }
    if (this.showEditorRoads.checked && this.currentSnap && this.cursor && (this.draft || this.dragPoint)) this.drawSnapIndicator(ctx, this.currentSnap);
  }
  private drawGrid(ctx: CanvasRenderingContext2D): void { const rect = this.canvas.getBoundingClientRect(); const topLeft = this.screenToWorld(0, 0); const bottomRight = this.screenToWorld(rect.width, rect.height); const step = this.zoom < .02 ? 5000 : this.zoom < .08 ? 1000 : 250; const firstX = Math.max(0, Math.floor(topLeft.x / step) * step); const lastX = Math.min(EDITOR_MAP.width, bottomRight.x); const firstY = Math.max(0, Math.floor(topLeft.y / step) * step); const lastY = Math.min(EDITOR_MAP.height, bottomRight.y); for (let x = firstX; x <= lastX; x += step) { const a = this.worldToScreen({ x, y: Math.max(0, topLeft.y) }); const b = this.worldToScreen({ x, y: Math.min(EDITOR_MAP.height, bottomRight.y) }); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = "rgba(126,156,140,.11)"; ctx.lineWidth = 1; ctx.stroke(); } for (let y = firstY; y <= lastY; y += step) { const a = this.worldToScreen({ x: Math.max(0, topLeft.x), y }); const b = this.worldToScreen({ x: Math.min(EDITOR_MAP.width, bottomRight.x), y }); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = "rgba(126,156,140,.11)"; ctx.lineWidth = 1; ctx.stroke(); } }
  private drawHandles(ctx: CanvasRenderingContext2D, road: AuthoredRoad, drafting: boolean): void { const count = drafting ? road.points.length : road.points.length; for (let index = 0; index < count; index++) { const point = this.worldToScreen(road.points[index]); const active = index === this.selectedPointIndex; ctx.beginPath(); ctx.arc(point.x, point.y, active ? 7 : 5, 0, Math.PI * 2); ctx.fillStyle = road.points[index].connection ? "#6ce1d3" : active ? "#f4dc72" : "#e5eee0"; ctx.fill(); ctx.strokeStyle = "#102019"; ctx.lineWidth = 2; ctx.stroke(); } }
  private drawSnapIndicator(ctx: CanvasRenderingContext2D, snap: SnapCandidate): void { const point = this.worldToScreen(snap.point); ctx.save(); ctx.strokeStyle = "#65eee0"; ctx.fillStyle = "rgba(30,91,82,.42)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(point.x, point.y, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(point.x - 15, point.y); ctx.lineTo(point.x + 15, point.y); ctx.moveTo(point.x, point.y - 15); ctx.lineTo(point.x, point.y + 15); ctx.stroke(); ctx.fillStyle = "#c9fff7"; ctx.font = "800 9px Courier New"; ctx.textAlign = "left"; ctx.fillText(snap.type.toUpperCase(), point.x + 14, point.y - 10); ctx.restore(); }
}
