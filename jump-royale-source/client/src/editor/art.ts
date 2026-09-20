import type Phaser from 'phaser';
import type { Platform } from '../../../server/src/sim/types';
import type { MapId } from '../../../server/src/sim/maps';
import { ASSETS } from '../assets/assetManifest';
import { renderForestTerrain } from '../game/forestArt';
import { renderMagicalTerrain } from '../game/magicalArt';
import { renderMountainTerrain } from '../game/mountainArt';
import { renderSnowTerrain } from '../game/snowArt';
import { renderJungleTerrain } from '../game/jungleArt';

export function renderMapPlatform(scene: Phaser.Scene, p: Platform, mapId: MapId): Phaser.GameObjects.Container {
  const c = scene.add.container(p.x, p.y).setDepth(1);
  // Child art turns around the same center used by collision and editor handles.
  const art=scene.add.container(p.w/2,p.h/2).setAngle(p.rotation??0);
  const local=scene.add.container(-p.w/2,-p.h/2);art.add(local);c.add(art);
  renderPart(scene,p,mapId,local);return c;
}
function renderPart(scene:Phaser.Scene,p:Platform,mapId:MapId,c:Phaser.GameObjects.Container):void{
  if (p.slope) { renderMountainTerrain(scene, p, c); return; }
  const renderers = { forest: renderForestTerrain, magical: renderMagicalTerrain, mountain: renderMountainTerrain, snow: renderSnowTerrain, jungle: renderJungleTerrain };
  if (mapId !== 'forge') {
    const index = Number(p.id.split('-').at(-1));
    const rendered = mapId === 'mountain' && p.id !== 'crown' ? { ...p, id: `editor-${Number.isSafeInteger(index) ? Math.abs(index) % 4 : 0}` } : p;
    renderers[mapId](scene, rendered, c);
  }
  else {
    const key = p.type === 'moving' ? 'forge-ferry' : p.type === 'anvil' ? ASSETS.restPlatform.key : ASSETS.platformTiles.key;
    c.add(scene.add.image(0, 0, key).setOrigin(0).setDisplaySize(p.w, p.h));
    c.add(scene.add.rectangle(0, 0, p.w, 1, p.type === 'moving' ? 0x94f3e5 : 0xffd49a).setOrigin(0));
    if (p.id === 'crown' || /route-\d-9/.test(p.id)) c.add(scene.add.image(p.w / 2, -2, ASSETS.anvils.key).setOrigin(.5, 1));
  }
}
export const backgroundFor = (map: MapId): string => ({ forge: ASSETS.background.key, jungle: 'canopy-background', snow: 'snow-background',
  forest: 'forest-ai-background', magical: 'magical-ai-dream-city', mountain: 'ascent-ai-village/background' })[map];
