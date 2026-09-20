import artMetrics from './forestArtMetrics.json';
import type Phaser from 'phaser';
import type {Platform} from './types';
import {GAME_WIDTH,GAME_HEIGHT} from './constants';
import {forestSection} from '../../../server/src/sim/forest';

const random=(seed:number)=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
export function drawForest(scene:Phaser.Scene):void{
 const sky=scene.add.image(0,0,'forest-ai-background').setOrigin(0).setScrollFactor(0).setDepth(-40);
 const motes=scene.add.graphics().setScrollFactor(0).setDepth(-2);
 const update=(time:number)=>{
  const skyWidth=Math.max(GAME_WIDTH*1.12,(GAME_HEIGHT+80)*1.5);sky.setDisplaySize(skyWidth,skyWidth/1.5);sky.x=-scene.cameras.main.scrollX*.025;sky.y=-Math.min(60,scene.cameras.main.scrollY*.004);

  motes.clear();for(let i=0;i<26;i++){const x=((i*137-scene.cameras.main.scrollX*.45+Math.sin(time*.0004+i)*12)%GAME_WIDTH+GAME_WIDTH)%GAME_WIDTH,y=((i*i*43-scene.cameras.main.scrollY*.25+time*.008)%GAME_HEIGHT+GAME_HEIGHT)%GAME_HEIGHT;const a=.25+.55*(.5+.5*Math.sin(time*.002+i));motes.fillStyle(0x7edcb0,a*.12).fillCircle(x,y,4);motes.fillStyle(0xb5ffd0,a).fillRect(Math.round(x),Math.round(y),1,2);}
 };
 update(0);scene.events.on('update',update);scene.events.once('shutdown',()=>scene.events.off('update',update));
}
export function renderForestTerrain(scene:Phaser.Scene,p:Platform,container:Phaser.GameObjects.Container):void{
 if(p.bucket){container.add(scene.add.image(0,0,'forest-ai-bucket').setOrigin(0).setDisplaySize(p.w,p.h));return;}
 const variants=['moss-slate','root-slate','moon-ruin'] as const;
 const index=p.artVariant??(p.id==='crown'?2:p.type==='wood'?1:(Math.floor(p.y/100)+forestSection(p.y))%3);
 const variant=variants[index],m=artMetrics[variant],scaleX=p.w/m.capWidth;
 if(p.ceiling){
  // Rotate around the authored landing edge: its moss cap now faces down.
  container.add(scene.add.image(p.w/2,p.h,'forest-ai-'+variant).setOrigin(.5,0).setDisplaySize(m.width*scaleX,p.h).setAngle(180));
  return;
 }
 const artHeight=Math.max(p.h+12,Math.min(64,p.w*m.height/m.capWidth));
 container.setData('width',p.w);
 container.add(scene.add.image(-m.capLeft*scaleX,0,'forest-ai-'+variant).setOrigin(0).setDisplaySize(m.width*scaleX,artHeight));
 const seed=Math.round(p.x*3+p.y),w=p.w;
 // Small plants grow behind the collision top, so the edge remains unmistakable.
 const deco=scene.add.graphics();const r=random(seed+44);
 for(let i=0;i<Math.floor(w/45);i++){
  const x=12+r()*(w-24);deco.lineStyle(1,0x477765).lineBetween(x,0,x-4,-12);deco.lineBetween(x-2,-4,x-9,-8);deco.lineBetween(x-3,-8,x+3,-13);
  if(i%2===0)container.add(scene.add.image(x,1,'forest-ai-mushrooms').setOrigin(.5,1).setDisplaySize(24,28));
 }
 if(p.w>=290 || p.id==='crown'){
  container.add(scene.add.image(p.w-25,0,'forest-ai-lantern').setOrigin(.5,1).setDisplaySize(24,78));
 }
 if(p.id==='crown'){
  const x=p.w/2;deco.fillStyle(0x3e636c).fillRect(x-24,-44,48,44);deco.fillStyle(0x1b3644).fillRect(x-16,-37,32,37);deco.fillStyle(0x7daba5).fillRect(x-29,-47,58,5);deco.lineStyle(3,0xd6e7ae).strokeCircle(x,-62,13);deco.fillStyle(0xece4a5).fillTriangle(x-7,-23,x,-33,x+7,-23);
 }
 container.add(deco);
}

export function forestWater(scene:Phaser.Scene):string {
 const key='forest-continuous-water';
 if(!scene.textures.exists(key)){
  // Keep the authored crest at normal scale and fade into an opaque deep body.
  const texture=scene.textures.createCanvas(key,1024,4096)!,c=texture.context;
  c.fillStyle='#031630';c.fillRect(0,0,1024,4096);
  c.drawImage(scene.textures.get('forest-ai-water').getSourceImage() as HTMLImageElement,0,0,1024,160);
  const fade=c.createLinearGradient(0,90,0,160);fade.addColorStop(0,'#03163000');fade.addColorStop(1,'#031630');
  c.fillStyle=fade;c.fillRect(0,90,1024,70);texture.refresh();
 }
 return key;
}

export function queueForestAssets(scene:Phaser.Scene):void {
 for(const name of ['moss-slate','root-slate','moon-ruin','water','background','lantern','bucket','mushrooms'])scene.load.image('forest-ai-'+name,import.meta.env.BASE_URL+'assets/forest-ai/'+(name==='bucket'?'bucket-16':name)+'.webp');
}

