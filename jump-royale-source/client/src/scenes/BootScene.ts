import {queueMagicalAssets} from '../game/magicalArt';
import {queueForestAssets} from '../game/forestArt';
import {queueMountainAssets} from '../game/mountainArt';
import { queueSnowAssets } from "../game/snowArt";
import { queueJungleAssets, prepareJungleFrames } from "../game/jungleArt";
import { queueCosmetics } from "../assets/cosmetics";
import { ASSETS } from "../assets/assetManifest";
import Phaser from "phaser";
import { PLAYER_ANIMATIONS } from "../assets/assetManifest";
import { queueResolvedAssets, resolveArtAssets } from "../assets/assetLoader";

export class BootScene extends Phaser.Scene {
  constructor() { super("Boot"); }

  async create(): Promise<void> {
    const { paths, v2 } = await resolveArtAssets();
    this.registry.set("artV2", v2);
    queueResolvedAssets(this, paths, v2);
    queueCosmetics(this);
    queueJungleAssets(this);
    queueSnowAssets(this); queueMountainAssets(this); queueForestAssets(this); queueMagicalAssets(this);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      prepareJungleFrames(this);
      const platform = this.textures.get(ASSETS.restPlatform.key);
      platform.add("left",0,0,0,8,32); platform.add("middle",0,8,0,80,32); platform.add("right",0,88,0,8,32);
      if (v2.player) this.createPlayerAnimations();
      this.scene.start("Menu");
    });
    this.load.start();
  }

  private createPlayerAnimations(): void {
    for (const [name, animation] of Object.entries(PLAYER_ANIMATIONS)) {
      this.anims.create({
        key: `climber-${name.replaceAll("_", "-")}`,
        frames: this.anims.generateFrameNumbers("climber-v2", { start: animation.start, end: animation.end }),
        frameRate: animation.frameRate,
        repeat: animation.repeat
      });
    }
  }
}
