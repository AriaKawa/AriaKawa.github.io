import Phaser from "phaser";
import { BATTLE_WORLD_SCALE } from "./camera";
import { TexturedRoadRenderer } from "./roadEditor/TexturedRoadRenderer";
import { planetOneAuthoredRoads } from "./roadEditor/PlanetOneRoadNetwork";
import { TACTICAL_HIGHWAY_DEPTH } from "../map/UsStateBoundaries";

/** Viewport-sized texture, composed by the same surface renderer as Planet 3. */
export class PlanetOneTexturedRoads {
  private renderer = new TexturedRoadRenderer();
  private roads = planetOneAuthoredRoads();
  private texture: Phaser.Textures.CanvasTexture;
  private image: Phaser.GameObjects.Image;
  private signature = "";
  private key = "planet-one-textured-roads";
  constructor(private scene: Phaser.Scene) {
    this.texture = scene.textures.createCanvas(this.key, 1, 1)!;
    this.image = scene.add.image(0, 0, this.key).setOrigin(0).setDepth(TACTICAL_HIGHWAY_DEPTH);
  }
  refresh(camera: Phaser.Cameras.Scene2D.Camera, zoom: number): void {
    const { left, top } = camera.worldView;
    const signature = `${left}:${top}:${zoom}:${camera.width}:${camera.height}`;
    if (signature === this.signature) return;
    this.signature = signature;
    const width = Math.ceil(camera.width), height = Math.ceil(camera.height);
    if (this.texture.width !== width || this.texture.height !== height) this.texture.setSize(width, height);
    const ctx = this.texture.context;
    ctx.clearRect(0, 0, width, height);
    this.renderer.drawNetwork(ctx, this.roads, p => ({
      x: (p.x - left / BATTLE_WORLD_SCALE) * zoom,
      y: (p.y - top / BATTLE_WORLD_SCALE) * zoom
    }), zoom);
    this.texture.refresh();
    this.image.setPosition(left, top).setDisplaySize(width / camera.zoom, height / camera.zoom);
    this.scene.game.canvas.dataset.planetOneRoadRenderer = "planet3-textured-network";
    this.scene.game.canvas.dataset.planetOneRoadCount = String(this.roads.length);
  }
  destroy(): void { this.image.destroy(); this.scene.textures.remove(this.key); }
}
