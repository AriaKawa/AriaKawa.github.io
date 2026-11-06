import { theaterZoomBand } from "../AmericasTheater";
import { ROAD_STYLES, type AuthoredRoad, type EditorPoint } from "./RoadEditorData";
import { ROAD_MATERIALS, RoadMaterialLibrary } from "./RoadMaterialLibrary";
import { compileRoadNetwork, polygonPath, type CompiledNetwork } from "./RoadNetworkGeometry";
import type { SnapRoad } from "./RoadSnapSystem";

type Project = (point: EditorPoint) => EditorPoint;
type DrawOptions = { selected?: boolean; preview?: boolean; reference?: boolean; valid?: boolean; smooth?: boolean };
type NetworkOptions = { selectedRoadId?: string; previewRoadId?: string; previewValid?: boolean; reference?: boolean; smooth?: boolean; referenceRoads?: SnapRoad[]; fixedGeometry?: boolean; detailZoom?: number };
const trace = (ctx: CanvasRenderingContext2D, points: EditorPoint[]) => { ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); };

/** One network surface and one exterior boundary, never stacked road-end meshes. */
export class TexturedRoadRenderer {
  private materials = new RoadMaterialLibrary();
  private cacheKey = "";
  private network?: CompiledNetwork;
  private conflicts = new Map<string, string[]>();

  draw(ctx: CanvasRenderingContext2D, road: AuthoredRoad, project: Project, zoom: number, options: DrawOptions = {}): void {
    this.drawNetwork(ctx, [road], project, zoom, { selectedRoadId: options.selected ? road.id : undefined, previewRoadId: options.preview ? road.id : undefined, previewValid: options.valid, smooth: options.smooth });
  }

  drawNetwork(ctx: CanvasRenderingContext2D, roads: AuthoredRoad[], project: Project, zoom: number, options: NetworkOptions = {}): void {
    const band = theaterZoomBand(options.detailZoom ?? zoom); const local = band === "local" || band === "base";
    const dpr = ctx.getTransform().a || 1;
    const viewportWidth = ctx.canvas.width / dpr, viewportHeight = ctx.canvas.height / dpr;
    const visible = options.fixedGeometry ? roads : roads.filter(r => {
      if (r.visible === false || r.points.length < 2) return false;
      const points = r.points.map(project); const padding = Math.max(120, r.width * zoom * 2);
      return Math.max(...points.map(p => p.x)) >= -padding && Math.min(...points.map(p => p.x)) <= viewportWidth + padding && Math.max(...points.map(p => p.y)) >= -padding && Math.min(...points.map(p => p.y)) <= viewportHeight + padding;
    });
    // Immutable gameplay roads keep their physical geometry across every camera
    // position and zoom. Editor previews still use their screen-width policy.
    const effective = options.fixedGeometry ? visible : visible.map(r => ({ ...r, width: this.screenWidth(r, zoom, band) / zoom }));
    const key = JSON.stringify([effective.map(r => [r.id, r.width, r.roadClass, r.locked, r.points]), options.smooth]);
    if (key !== this.cacheKey) {
      this.network = compileRoadNetwork(effective, options.smooth !== false); this.cacheKey = key;
      this.conflicts.clear();
      for (const node of this.network.nodes) if (node.edges.length >= 3) {
        const ids = [...new Set(node.edges.map(i => this.network!.edges[i].roadId))];
        for (const id of ids) this.conflicts.set(id, [...new Set([...(this.conflicts.get(id) ?? []), ...ids.filter(other => other !== id)])]);
      }
    }
    const network = this.network; if (!network?.surface.length) return;
    const surface = polygonPath(network.surface, project);
    ctx.save(); ctx.lineJoin = "round"; ctx.lineCap = "butt";
    // Stroke only the outside of the UNION. There is no curb across any mouth.
    ctx.strokeStyle = "rgba(15,16,12,.65)"; ctx.lineWidth = local ? 8 : 3; ctx.stroke(surface);
    ctx.strokeStyle = "#665f4d"; ctx.lineWidth = local ? 5 : 1.8; ctx.stroke(surface);
    ctx.fillStyle = local ? this.materials.surface(ctx, "major_road", project({ x: 0, y: 0 }), zoom) : "#484943";
    ctx.fill(surface);
    // Paved classes share one continuous asphalt field. Dirt owns only its
    // non-overlapping area; the same polygons are directly triangulatable.
    for (const road of network.roads) if (road.roadClass === "dirt_road") {
      ctx.fillStyle = local ? this.materials.surface(ctx, "dirt_road", project({ x: 0, y: 0 }), zoom) : ROAD_MATERIALS.dirt_road.surface;
      ctx.fill(polygonPath(network.owned.get(road.id)!, project));
    }
    ctx.save(); ctx.clip(surface);
    for (const road of network.roads) {
      const owned = network.owned.get(road.id)!; if (!owned.length) continue;
      ctx.save(); ctx.clip(polygonPath(owned, project));
      for (const otherId of this.conflicts.get(road.id) ?? []) {
        const exclusion = polygonPath(network.footprints.get(otherId)!, project);
        exclusion.rect(-1e7, -1e7, 2e7, 2e7); ctx.clip(exclusion, "evenodd");
      }
      this.drawMarkings(ctx, road, project, zoom, local || band === "city");
      this.drawWear(ctx, road, project, zoom, local);
      ctx.restore();
    }
    ctx.restore();
    for (const road of network.roads) if (road.id === options.selectedRoadId || road.id === options.previewRoadId) {
      trace(ctx, road.points.map(project)); ctx.strokeStyle = options.previewValid === false ? "rgba(226,91,62,.9)" : "rgba(99,230,211,.7)"; ctx.lineWidth = 2; ctx.setLineDash([12, 9]); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.restore();
  }

  private screenWidth(road: Pick<AuthoredRoad, "width" | "roadClass">, zoom: number, band: ReturnType<typeof theaterZoomBand>): number {
    if (band === "base" || band === "local") return Math.max(road.roadClass === "highway" ? 8 : 3, road.width * zoom);
    if (road.roadClass === "highway") return band === "country" ? 1.8 : band === "regional" ? 4 : 8;
    return road.roadClass === "major_road" ? band === "country" ? .9 : band === "regional" ? 2.4 : 4.5 : band === "country" ? .65 : band === "regional" ? 1.5 : 3;
  }

  private drawMarkings(ctx: CanvasRenderingContext2D, road: AuthoredRoad, project: Project, zoom: number, visible: boolean): void {
    const style = ROAD_STYLES[road.roadClass]; if (!visible || !style.marking) return;
    const points = road.points.map(project); const width = road.width * zoom;
    const stroke = (offset: number, color: string, dash: number[]) => {
      const shifted = points.map((p, i) => { const a = points[Math.max(0, i - 1)], b = points[Math.min(points.length - 1, i + 1)]; const len = Math.hypot(b.x - a.x, b.y - a.y) || 1; return { x: p.x - (b.y - a.y) / len * offset, y: p.y + (b.x - a.x) / len * offset }; });
      trace(ctx, shifted); ctx.strokeStyle = color; ctx.lineWidth = Math.max(.65, zoom * .95); ctx.setLineDash(dash.map(d => d * Math.max(.45, zoom))); ctx.stroke(); ctx.setLineDash([]);
    };
    stroke(0, "rgba(201,181,102,.56)", style.dash ?? [22, 16]);
    if (road.roadClass === "highway") for (const side of [-1, 1]) {
      stroke(width * .41 * side, "rgba(206,204,177,.52)", []);
      stroke(width * .21 * side, "rgba(202,200,174,.40)", [20, 19]);
    }
  }

  private drawWear(ctx: CanvasRenderingContext2D, road: AuthoredRoad, project: Project, zoom: number, visible: boolean): void {
    if (!visible) return;
    // Longitudinal wheel wear follows the centerline, not a rotated screen tile.
    const points = road.points.map(project);
    for (const side of [-1, 1]) {
      const shifted = points.map((p, i) => { const a = points[Math.max(0, i - 1)], b = points[Math.min(points.length - 1, i + 1)]; const len = Math.hypot(b.x - a.x, b.y - a.y) || 1; const offset = road.width * zoom * .24 * side; return { x: p.x - (b.y - a.y) / len * offset, y: p.y + (b.x - a.x) / len * offset }; });
      trace(ctx, shifted); ctx.strokeStyle = road.roadClass === "dirt_road" ? "rgba(38,26,17,.18)" : "rgba(15,17,15,.07)"; ctx.lineWidth = Math.max(.8, road.width * zoom * .1); ctx.stroke();
    }
  }
}
