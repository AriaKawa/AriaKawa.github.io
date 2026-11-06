import type { RoadClass } from "./RoadEditorData";

export type RoadMaterial = { surface: string; shoulder: string; shadow: string; fleckDark: string; fleckLight: string; repair: string };

export const ROAD_MATERIALS: Record<RoadClass, RoadMaterial> = {
  highway: { surface: "#383a37", shoulder: "#665f4d", shadow: "#171814", fleckDark: "rgba(12,13,12,.25)", fleckLight: "rgba(116,113,99,.15)", repair: "rgba(23,25,23,.42)" },
  major_road: { surface: "#4b4b45", shoulder: "#716957", shadow: "#1c1d19", fleckDark: "rgba(18,18,16,.25)", fleckLight: "rgba(128,120,99,.16)", repair: "rgba(34,35,32,.42)" },
  rural_road: { surface: "#5e5b52", shoulder: "#756b56", shadow: "#23231d", fleckDark: "rgba(23,22,19,.25)", fleckLight: "rgba(145,132,104,.15)", repair: "rgba(43,43,38,.4)" },
  dirt_road: { surface: "#745238", shoulder: "#574633", shadow: "#292118", fleckDark: "rgba(47,32,22,.28)", fleckLight: "rgba(158,126,84,.18)", repair: "rgba(72,51,34,.34)" },
  service_road: { surface: "#4d4c45", shoulder: "#625c4e", shadow: "#20211c", fleckDark: "rgba(18,18,16,.26)", fleckLight: "rgba(125,117,96,.14)", repair: "rgba(34,34,30,.4)" }
};

const hash = (value: string): number => { let result = 2166136261; for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619); return result >>> 0; };
const randomFactory = (seed: number) => () => { seed = Math.imul(seed ^ seed >>> 15, 2246822519) >>> 0; seed = Math.imul(seed ^ seed >>> 13, 3266489917) >>> 0; return seed / 0xffffffff; };

/** Generates subtle isotropic material grain; directional wear is painted along each spline by the renderer. */
export class RoadMaterialLibrary {
  private tiles = new Map<RoadClass, HTMLCanvasElement | OffscreenCanvas>();

  surface(ctx: CanvasRenderingContext2D, roadClass: RoadClass, origin: { x: number; y: number }, zoom: number): CanvasPattern | string {
    let tile = this.tiles.get(roadClass);
    if (!tile) {
      tile = typeof document === "undefined" ? new OffscreenCanvas(256, 256) : document.createElement("canvas"); tile.width = 256; tile.height = 256;
      const paint = tile.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null; const material = ROAD_MATERIALS[roadClass];
      if (!paint) return material.surface;
      paint.fillStyle = material.surface; paint.fillRect(0, 0, tile.width, tile.height);
      const random = randomFactory(hash(`material:${roadClass}`));
      for (let index = 0; index < 9500; index++) {
        paint.fillStyle = index % 3 ? material.fleckDark : material.fleckLight;
        const radius = .25 + random() * 1.2; paint.beginPath(); paint.arc(random() * tile.width, random() * tile.height, radius, 0, Math.PI * 2); paint.fill();
      }
      // Seamless, world-anchored cracks and weathering reused across every road.
      for (let i = 0; i < 85; i++) {
        const x = random() * 256, y = random() * 256;
        const dx = 8 + random() * 25, dy = (random() - .5) * 24;
        for (const ox of [-256, 0, 256]) for (const oy of [-256, 0, 256]) {
          paint.strokeStyle = "rgba(12,14,12,.24)"; paint.lineWidth = .45 + random() * .55;
          paint.beginPath(); paint.moveTo(x + ox, y + oy); paint.lineTo(x + ox + dx * .4, y + oy + dy * .3 + 2); paint.lineTo(x + ox + dx, y + oy + dy); paint.stroke();
        }
      }
      this.tiles.set(roadClass, tile);
    }
    const pattern = ctx.createPattern(tile, "repeat");
    if (pattern && "setTransform" in pattern) { pattern.setTransform(new DOMMatrix().translate(origin.x, origin.y).scale(zoom)); }
    return pattern ?? ROAD_MATERIALS[roadClass].surface;
  }
}

