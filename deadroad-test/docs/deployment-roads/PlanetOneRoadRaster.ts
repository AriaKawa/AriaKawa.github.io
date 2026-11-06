import { theaterZoomBand } from "./AmericasTheater";

export type RoadRasterView = { left: number; top: number; width: number; height: number; zoom: number; displayZoom?: number };
export type RoadRasterRequest = RoadRasterView & { id: number };
export type RoadRasterResult = RoadRasterRequest & { bitmap?: ImageBitmap; error?: string; renderMs: number };

/** Bounded overscan lets camera motion reuse the existing image. */
export function roadRasterView(left: number, top: number, width: number, height: number, zoom: number): RoadRasterView {
  const padding = 512;
  const scale = Math.min(1, 2560 / (width + padding * 2), 2560 / (height + padding * 2));
  return { left: left - padding / zoom, top: top - padding / zoom,
    width: Math.ceil((width + padding * 2) * scale), height: Math.ceil((height + padding * 2) * scale), zoom: zoom * scale, displayZoom: zoom };
}

export function roadRasterCovers(raster: RoadRasterView, view: RoadRasterView): boolean {
  const originalZoom = raster.displayZoom ?? raster.zoom;
  const ratio = view.zoom / originalZoom;
  return ratio >= .8 && ratio <= 1.35 && theaterZoomBand(view.zoom) === theaterZoomBand(originalZoom)
    && view.left >= raster.left && view.top >= raster.top
    && view.left + view.width / view.zoom <= raster.left + raster.width / raster.zoom
    && view.top + view.height / view.zoom <= raster.top + raster.height / raster.zoom;
}

/** Refill the overscan before driving can expose its outer edge. */
export function roadRasterNeedsRefresh(raster: RoadRasterView, view: RoadRasterView): boolean {
  const padding = 256 / view.zoom;
  return !roadRasterCovers(raster, {...view, left:view.left-padding, top:view.top-padding,
    width:view.width+512, height:view.height+512});
}
