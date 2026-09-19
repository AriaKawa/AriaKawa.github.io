import type Phaser from 'phaser';
import type { Platform } from './types';
import { GAME_WIDTH, WORLD_HEIGHT } from './constants';

export const SNOW_ASSETS=['blizzard-wall','background','ground','soil','ledge','ice','log','ruin','pine','storm','storm-edge'] as const;
export function queueSnowAssets(scene:Phaser.Scene):void {
  for(const name of SNOW_ASSETS)scene.load.image('snow-'+name,import.meta.env.BASE_URL+'assets/snow/'+name+'.png');
}
export function renderSnowTerrain(scene:Phaser.Scene,p:Platform,container:Phaser.GameObjects.Container):void {
  if(p.id==='spawn') {
    const width=Math.max(GAME_WIDTH+80,1000),left=320-width/2-p.x;
    container.add(scene.add.tileSprite(left,24,width,WORLD_HEIGHT-p.y+200,'snow-soil').setOrigin(0));
    container.add(scene.add.tileSprite(left,0,width,110,'snow-ground').setOrigin(0));
    for(const x of [75,515]) container.add(scene.add.image(x-p.x,0,'snow-pine').setOrigin(.5,1).setDisplaySize(85,118));
    container.add(scene.add.text(p.w/2,-50,'CYAN ICE SLIDES · HOLD SPACE TO GRIP',{fontFamily:'monospace',fontSize:'12px',color:'#e2f7ff',stroke:'#152844',strokeThickness:4}).setOrigin(.5));
    container.add(scene.add.text(p.w/2,-32,'CRACKED ICE BREAKS ONLY FOR YOU',{fontFamily:'monospace',fontSize:'11px',color:'#ffd7aa',stroke:'#152844',strokeThickness:4}).setOrigin(.5));
    return;
  }
  const key=p.slippery?'ice':p.terrain==='log'?'log':p.terrain==='ruin'?'ruin':'ledge';
  container.add(scene.add.image(0,0,'snow-'+key).setOrigin(0).setDisplaySize(p.w,p.h));
  // A crisp surface marker is the exact one-way collision boundary.
  container.add(scene.add.rectangle(0,0,p.w,2,p.slippery?0x8af2ff:0xf0faff).setOrigin(0));
  if(p.crumbleSeconds) {
    const cracks=scene.add.graphics().lineStyle(2,0x233d61,1);
    for(const x of [p.w*.25,p.w*.55,p.w*.8]) cracks.beginPath().moveTo(x,1).lineTo(x-8,10).lineTo(x+4,18).lineTo(x-5,p.h-2).strokePath();
    container.add(cracks);
    container.add(scene.add.text(p.w/2,7,'FRAGILE',{fontFamily:'monospace',fontSize:'10px',color:'#ffe0b8',stroke:'#233d61',strokeThickness:3}).setOrigin(.5,0));
  }
  if(!p.slippery && p.terrain==='ruin' && p.id!=='crown')container.add(scene.add.image(16,0,'snow-pine').setOrigin(.5,1).setDisplaySize(28,42));
  if(p.id==='crown')container.add(scene.add.text(p.w/2,-18,'◆',{fontFamily:'monospace',fontSize:'22px',color:'#ffe39a'}).setOrigin(.5,1));
}
export function drawSnowPreview(scene:Phaser.Scene,c:CanvasRenderingContext2D):void {
  const source=(name:string)=>scene.textures.get('snow-'+name).getSourceImage() as HTMLImageElement;
  c.drawImage(source('background'),0,0,240,170);
  c.drawImage(source('ground'),0,148,240,22);
  c.drawImage(source('pine'),15,104,28,44);
  c.drawImage(source('ledge'),149,113,83,24);
  c.drawImage(source('ice'),77,80,78,19);
  c.drawImage(source('ledge'),8,48,69,24);
  c.drawImage(source('ruin'),109,16,68,22);
}
