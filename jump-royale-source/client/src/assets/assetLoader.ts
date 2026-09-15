import type Phaser from "phaser";
import { ASSETS, type AssetName } from "./assetManifest";
export type ArtAvailability = Record<AssetName, boolean>;
export async function resolveArtAssets(): Promise<{ paths: Record<AssetName, string>; v2: ArtAvailability }> {
  return { paths: Object.fromEntries(Object.entries(ASSETS).map(([name,a]) => [name,a.image])) as Record<AssetName,string>,
    v2: Object.fromEntries(Object.keys(ASSETS).map(name => [name,true])) as ArtAvailability };
}
export function queueResolvedAssets(scene: Phaser.Scene, paths: Record<AssetName,string>, _v2: ArtAvailability): void {
  for (const name of Object.keys(ASSETS) as AssetName[]) {
    const a = ASSETS[name];
    if (a.frameWidth && a.frameHeight) scene.load.spritesheet(a.key,paths[name],{frameWidth:a.frameWidth,frameHeight:a.frameHeight});
    else scene.load.image(a.key,paths[name]);
  }
}
