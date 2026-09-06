import { theaterZoomBand } from "./AmericasTheater";
import { planetOneAuthoredRoads } from "./roadEditor/PlanetOneRoadNetwork";
import { sampleCatmullRom } from "./roadEditor/RoadEditorData";
import { TexturedRoadRenderer } from "./roadEditor/TexturedRoadRenderer";
import type { RoadRasterRequest, RoadRasterResult } from "./PlanetOneRoadRaster";

const roads = planetOneAuthoredRoads();
const sampled = roads.map(r => ({ ...r, points: sampleCatmullRom(r.points, 20) }));
const renderer = new TexturedRoadRenderer();
const canvas = new OffscreenCanvas(1, 1);
const ctx = canvas.getContext("2d")!;

self.onmessage = (event: MessageEvent<RoadRasterRequest>) => {
  const request = event.data, started = performance.now();
  try {
    canvas.width = request.width; canvas.height = request.height;
    const project = (p: { x: number; y: number }) => ({ x: (p.x - request.left) * request.zoom, y: (p.y - request.top) * request.zoom });
    const displayZoom = request.displayZoom ?? request.zoom;
    const band = theaterZoomBand(displayZoom);
    if (band === "local" || band === "base") {
      // One immutable physical network; no zoom-dependent polygon clipping.
      renderer.drawNetwork(ctx as unknown as CanvasRenderingContext2D, roads, project, request.zoom, { fixedGeometry: true, detailZoom: displayZoom });
    } else {
      ctx.lineJoin = "round"; ctx.lineCap = "butt";
      // All shoulders before surfaces keeps junction mouths continuous.
      for (const shoulder of [true, false]) for (const road of sampled) {
        const width = road.roadClass === "highway" ? band === "country" ? 1.8 : band === "regional" ? 4 : 8
          : band === "country" ? .9 : band === "regional" ? 2.4 : 4.5;
        ctx.beginPath(); road.points.forEach((p, i) => { const q = project(p); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
        ctx.lineWidth = (width + (shoulder ? 1.8 : 0)) * request.zoom / displayZoom;
        ctx.strokeStyle = shoulder ? "#665f4d" : "#484943"; ctx.stroke();
      }
    }
    const bitmap = canvas.transferToImageBitmap();
    const result: RoadRasterResult = { ...request, bitmap, renderMs: performance.now() - started };
    self.postMessage(result, { transfer: [bitmap] });
  } catch (error) {
    self.postMessage({ ...request, error: String(error), renderMs: performance.now() - started } satisfies RoadRasterResult);
  }
};
