import type Phaser from "phaser";
import { BATTLE_WORLD_SCALE } from "./camera";
import { TACTICAL_HIGHWAY_DEPTH } from "../map/UsStateBoundaries";
import { roadRasterNeedsRefresh, roadRasterView, type RoadRasterView, type RoadRasterResult } from "./PlanetOneRoadRaster";

/** Camera transforms reuse a world-anchored image; all road baking is off-thread. */
export class PlanetOneTexturedRoads {
  private worker?: Worker;
  private texture: Phaser.Textures.CanvasTexture;
  private image: Phaser.GameObjects.Image;
  private raster?: RoadRasterView;
  private pending?: RoadRasterView;
  private view?: RoadRasterView;
  private requestId = 0;
  private lastRequestAt = -Infinity;
  private uploads = 0;
  private destroyed = false;
  private failed = false;
  private key = "planet-one-textured-roads";

  constructor(private scene: Phaser.Scene) {
    this.texture = scene.textures.createCanvas(this.key, 1, 1)!;
    this.image = scene.add.image(0, 0, this.key).setOrigin(0).setDepth(TACTICAL_HIGHWAY_DEPTH).setVisible(false);
    if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") { this.fail(); return; }
    try {
      this.worker = new Worker(new URL("./PlanetOneRoadWorker.ts", import.meta.url), { type: "module" });
      this.worker.onmessage = (event: MessageEvent<RoadRasterResult>) => this.receive(event.data);
      this.worker.onerror = () => this.fail();
    } catch { this.fail(); }
  }

  get ready(): boolean {
    // Once textured roads are available, camera motion must never reactivate
    // the legacy vector layer while an asynchronous refresh is in flight.
    return !!this.raster && !this.failed;
  }

  refresh(camera: Phaser.Cameras.Scene2D.Camera, zoom: number): void {
    if (this.failed || this.destroyed) return;
    const view = this.view = { left: camera.worldView.left / BATTLE_WORLD_SCALE, top: camera.worldView.top / BATTLE_WORLD_SCALE,
      width: camera.width, height: camera.height, zoom };
    this.image.setVisible(this.ready);
    if (this.pending || (this.raster && !roadRasterNeedsRefresh(this.raster, view))) return;
    // Only one in-flight request, with the latest camera read on the next frame.
    const now = performance.now(); if (now - this.lastRequestAt < 120) return;
    this.lastRequestAt = now;
    this.pending = roadRasterView(view.left, view.top, view.width, view.height, zoom);
    this.worker!.postMessage({ ...this.pending, id: ++this.requestId });
  }

  private receive(result: RoadRasterResult): void {
    if (this.destroyed || result.id !== this.requestId) { result.bitmap?.close(); return; }
    this.pending = undefined;
    if (result.error || !result.bitmap) { this.fail(); return; }
    const view = this.view!;
    const intersects = result.left < view.left + view.width / view.zoom && result.left + result.width / result.zoom > view.left
      && result.top < view.top + view.height / view.zoom && result.top + result.height / result.zoom > view.top;
    if (!intersects) { result.bitmap.close(); return; }
    const started = performance.now();
    this.texture.setSize(result.width, result.height);
    const ctx = this.texture.context; ctx.clearRect(0, 0, result.width, result.height); ctx.drawImage(result.bitmap, 0, 0); result.bitmap.close();
    this.texture.refresh();
    this.image.setPosition(result.left * BATTLE_WORLD_SCALE, result.top * BATTLE_WORLD_SCALE)
      .setDisplaySize(result.width / result.zoom * BATTLE_WORLD_SCALE, result.height / result.zoom * BATTLE_WORLD_SCALE).setVisible(true);
    this.raster = result;
    const data = this.scene.game.canvas.dataset;
    data.planetOneRoadRenderer = "worker-cached-textured-network";
    data.planetOneRoadCount = "18";
    data.planetOneRoadUploads = String(++this.uploads);
    data.planetOneRoadWorkerMs = result.renderMs.toFixed(1);
    data.planetOneRoadUploadMs = (performance.now() - started).toFixed(1);
  }

  private fail(): void {
    this.failed = true; this.pending = undefined; this.image.setVisible(false); this.worker?.terminate();
    this.scene.game.canvas.dataset.planetOneRoadRenderer = "vector-fallback";
  }

  destroy(): void {
    this.destroyed = true; this.worker?.terminate(); this.image.destroy(); this.scene.textures.remove(this.key);
  }
}
