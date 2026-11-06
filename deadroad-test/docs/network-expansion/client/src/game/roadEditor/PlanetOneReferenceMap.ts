import type { WorldRoad } from "../../globe/GlobeData";
import { planetThreeHighways } from "./PlanetThreeHighways";
import { planetOneAuthoredRoads } from "./PlanetOneRoadNetwork";
import { PLANET_ONE_TERRAIN_COLORS, PLANET_ONE_US_COASTLINES, PLANET_ONE_US_STATE_BORDERS, planetOneTacticalLandmasses } from "../PlanetOneMapGeometry";
import { paintUsaBiomeTerrain } from "../TerrainBiomeRenderer";
import { theaterPoint, theaterZoomBand } from "../AmericasTheater";
import type { AuthoredRoad, EditorPoint } from "./RoadEditorData";
import type { SnapRoad } from "./RoadSnapSystem";
import { TERRAIN_TILESET_ASSETS, type TerrainTileName } from "../TilesetManifest";

type Project = (point: EditorPoint) => EditorPoint;
const cssColor = (color: number): string => `#${color.toString(16).padStart(6, "0")}`;
const polygon = (ctx: CanvasRenderingContext2D, points: EditorPoint[], project: Project): void => {
  ctx.beginPath(); points.forEach((point, index) => { const screen = project(point); index ? ctx.lineTo(screen.x, screen.y) : ctx.moveTo(screen.x, screen.y); }); ctx.closePath();
};

/** Planet 1's real tactical data rendered as a locked canvas layer for Planet 3. */
export class PlanetOneReferenceMap {
  readonly snapRoads: SnapRoad[];
  readonly roads: AuthoredRoad[];
  private terrain?: HTMLCanvasElement;
  private terrainBounds?: { left: number; top: number; size: number };
  private detailTiles = new Map<string, HTMLCanvasElement>();
  private tileset: Partial<Record<TerrainTileName, CanvasImageSource>> = {};

  constructor(worldRoads: WorldRoad[]) {
    const styles = new Map(planetOneAuthoredRoads().map(r => [r.id, r]));
    this.roads = planetThreeHighways(worldRoads).map((road) => ({
      id: road.id.startsWith("planet1:") ? road.id : `planet1:${road.id}`, name: road.name, roadClass: styles.get(road.id)?.roadClass ?? "highway", width: styles.get(road.id)?.width ?? 46,
      points: road.pointLatLon.map((point) => theaterPoint(point.lat, point.lon)), source: "manual_editor", locked: true, visible: true
    }));
    this.snapRoads = this.roads.map((road) => ({ id: road.id, width: road.width, roadClass: road.roadClass, points: road.points.map((point) => ({ x: point.x, y: point.y })) }));
  }

  async load(): Promise<void> {
    const lower48 = planetOneTacticalLandmasses().find((mass) => mass.group === "usa"); if (!lower48) return;
    const width = lower48.right - lower48.left; const height = lower48.bottom - lower48.top; const size = Math.max(width, height);
    const canvas = document.createElement("canvas"); canvas.width = 1400; canvas.height = 1400;
    const context = canvas.getContext("2d"); if (!context) return;
    context.fillStyle = cssColor(PLANET_ONE_TERRAIN_COLORS.usa); context.fillRect(0, 0, canvas.width, canvas.height);
    paintUsaBiomeTerrain(context, { worldX: lower48.left, worldY: lower48.top, chunkSize: size, pixels: canvas.width, lod: "far" });
    this.terrain = canvas; this.terrainBounds = { left: lower48.left, top: lower48.top, size };
    await Promise.all(TERRAIN_TILESET_ASSETS.map(asset => new Promise<void>(resolve => {
      const image = new Image(); image.onload = () => { this.tileset[asset.name] = image; resolve(); }; image.onerror = () => resolve(); image.src = asset.url;
    })));
  }

  draw(ctx: CanvasRenderingContext2D, project: Project, zoom: number): void {
    ctx.save();
    for (const mass of planetOneTacticalLandmasses()) { polygon(ctx, mass.points, project); ctx.fillStyle = cssColor(PLANET_ONE_TERRAIN_COLORS[mass.group]); ctx.fill(); }
    const lower48 = planetOneTacticalLandmasses().find((mass) => mass.group === "usa");
    if (lower48 && this.terrain && this.terrainBounds) {
      polygon(ctx, lower48.points, project); ctx.save(); ctx.clip();
      const topLeft = project({ x: this.terrainBounds.left, y: this.terrainBounds.top });
      ctx.globalAlpha = .9; ctx.drawImage(this.terrain, topLeft.x, topLeft.y, this.terrainBounds.size * zoom, this.terrainBounds.size * zoom); ctx.restore();
    }
    const band = theaterZoomBand(zoom);
    if (lower48 && (band === "local" || band === "base")) {
      ctx.save(); polygon(ctx, lower48.points, project); ctx.clip();
      const origin = project({ x: 0, y: 0 }); const dpr = ctx.getTransform().a;
      const size = 1024; const left = Math.floor(-origin.x / zoom / size), top = Math.floor(-origin.y / zoom / size);
      const right = Math.floor((ctx.canvas.width / dpr - origin.x) / zoom / size), bottom = Math.floor((ctx.canvas.height / dpr - origin.y) / zoom / size);
      for (let row = top; row <= bottom; row++) for (let col = left; col <= right; col++) {
        const key = `${col}:${row}`; let tile = this.detailTiles.get(key);
        if (!tile) {
          tile = document.createElement("canvas"); tile.width = 768; tile.height = 768; const paint = tile.getContext("2d")!;
          paint.fillStyle = cssColor(PLANET_ONE_TERRAIN_COLORS.usa); paint.fillRect(0, 0, 768, 768);
          paintUsaBiomeTerrain(paint, { worldX: col * size, worldY: row * size, chunkSize: size, pixels: 768, lod: "base", tileset: this.tileset });
          this.detailTiles.set(key, tile); if (this.detailTiles.size > 48) this.detailTiles.delete(this.detailTiles.keys().next().value!);
        }
        const p = project({ x: col * size, y: row * size }); ctx.drawImage(tile, p.x, p.y, size * zoom, size * zoom);
      }
      ctx.restore();
    }
    const borderWidth = band === "country" ? 1.1 : band === "regional" ? 1 : .85;
    ctx.strokeStyle = "rgba(216,207,154,.58)"; ctx.lineWidth = borderWidth;
    for (const line of PLANET_ONE_US_STATE_BORDERS) { ctx.beginPath(); line.forEach((point, index) => { const screen = project(point); index ? ctx.lineTo(screen.x, screen.y) : ctx.moveTo(screen.x, screen.y); }); ctx.stroke(); }
    ctx.strokeStyle = "rgba(216,207,154,.72)"; ctx.lineWidth = borderWidth + .35;
    for (const line of PLANET_ONE_US_COASTLINES()) { polygon(ctx, line, project); ctx.stroke(); }
    // Roads are composed together with the editable network after terrain.
    if (band === "country") {
      const label = project(theaterPoint(39, -98)); ctx.fillStyle = "rgba(227,226,200,.72)"; ctx.font = "800 18px Courier New"; ctx.textAlign = "center"; ctx.fillText("U N I T E D   S T A T E S", label.x, label.y);
    }
    ctx.restore();
  }
}
