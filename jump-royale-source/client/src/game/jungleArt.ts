import { terrainArtScale } from "../../../server/src/sim/terrainGeometry";
import type Phaser from 'phaser';
import type { Platform } from './types';
import { GAME_WIDTH, WORLD_WIDTH, WORLD_HEIGHT } from './constants';

export const JUNGLE_ASSETS = ['background','ground','soil','cliff-v3','island','log','ruin','fern','flood-surface','flood-body'] as const;
export function queueJungleAssets(scene: Phaser.Scene): void {
  const root=import.meta.env.BASE_URL+'assets/jungle/';
  for(const name of JUNGLE_ASSETS)scene.load.image('jungle-'+name,root+name+'.png');
}

export function prepareJungleFrames(scene:Phaser.Scene):void {
  const texture=scene.textures.get('jungle-cliff-v3');
  texture.add('wall',0,0,0,224,341);
  texture.add('edge',0,224,0,288,341);
}

/** Generated sprites are compiled to a common landing-edge origin at y=0. */
export function renderJungleTerrain(scene:Phaser.Scene,p:Platform,container:Phaser.GameObjects.Container): void {
  const terrain=p.terrain ?? 'island';
  const margin=(GAME_WIDTH-WORLD_WIDTH)/2;
  if(terrain==='ground'){
    // Continuous earth fills the bottom of the world and the entire view.
    const width=Math.max(GAME_WIDTH+80,1000),left=320-width/2-p.x;
    container.add(scene.add.tileSprite(left,16,width,WORLD_HEIGHT-p.y+400,'jungle-soil').setOrigin(0));
    container.add(scene.add.tileSprite(left,-3,width,48,'jungle-ground').setOrigin(0));
    for(const x of [90,490])container.add(scene.add.image(x-p.x,-1,'jungle-fern').setOrigin(.5,1).setDisplaySize(54,43));
    return;
  }
  const art=terrainArtScale(p)!;
  const top=-art.profile.landing*art.y;
  if(terrain==='left'||terrain==='right'){
    const extension=margin+54+40;
    const right=terrain==='right';
    // Adjacent crops from ONE painting: identical source pixels at the join,
    // continuous roots/stone, and a complete natural underside on both pieces.
    container.add(scene.add.image(right?p.w:-extension,top,'jungle-cliff-v3','wall').setOrigin(0).setFlipX(right).setDisplaySize(extension,art.profile.height*art.y));
    const edgeWidth=(art.profile.width-art.profile.left)*art.x;
    container.add(scene.add.image(right?p.w-edgeWidth:0,top,'jungle-cliff-v3','edge').setOrigin(0).setFlipX(right).setDisplaySize(edgeWidth,art.profile.height*art.y));
  }else{
    container.add(scene.add.image(-art.profile.left*art.x,top,'jungle-'+terrain).setOrigin(0).setDisplaySize(art.profile.width*art.x,art.profile.height*art.y));
  }
  if(terrain==='ruin'&&p.w>100)container.add(scene.add.image(p.w*.18,-1,'jungle-fern').setOrigin(.5,1).setDisplaySize(28,22));
  if(p.id==='crown')container.add(scene.add.text(p.w/2,-16,'◆',{fontFamily:'monospace',fontSize:'20px',color:'#f2d67c'}).setOrigin(.5,1));
}

export function drawJunglePreview(scene:Phaser.Scene,c:CanvasRenderingContext2D):void {
  const source=(name:string)=>scene.textures.get('jungle-'+name).getSourceImage() as HTMLImageElement;
  const bg=source('background');c.drawImage(bg,0,bg.height*.47,bg.width,bg.height*.5,0,0,240,170);
  c.drawImage(source('soil'),0,143,240,27);c.drawImage(source('ground'),0,138,240,18);
  c.save();c.translate(240,0);c.scale(-1,1);c.drawImage(source('cliff-v3'),224,30,288,311,0,98,74,64);c.restore();
  c.drawImage(source('island'),112,69,29,20);c.drawImage(source('cliff-v3'),0,30,512,311,-55,30,123,92);
  c.drawImage(source('flood-body'),0,163,240,7);c.drawImage(source('flood-surface'),0,160,240,4);
}
