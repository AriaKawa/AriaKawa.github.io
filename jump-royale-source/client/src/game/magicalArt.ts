import type Phaser from 'phaser';
import type {Platform} from './types';
import metrics from './magicalArtMetrics.json';
import {GAME_WIDTH,GAME_HEIGHT} from './constants';
import {generateMagical,MAGICAL_CHAPTERS,MAGICAL_HEIGHT,magicalSection} from '../../../server/src/sim/magical';

export function queueMagicalAssets(scene:Phaser.Scene):void{
 for(const name of ['ribbon-palace','rose-garden','star-crystal','dream-city','moon-palace','stardust-tide'])scene.load.image('magical-ai-'+name,import.meta.env.BASE_URL+'assets/magical-ai/'+name+'.webp');
}
export function drawMagical(scene:Phaser.Scene):void{
 const city=scene.add.image(0,0,'magical-ai-dream-city').setOrigin(0).setScrollFactor(0).setDepth(-40).setTint(0xc6b6d8);
 const palace=scene.add.image(0,0,'magical-ai-moon-palace').setOrigin(0).setScrollFactor(0).setDepth(-39).setAlpha(0).setTint(0xc6b6d8);
 const stars=scene.add.graphics().setScrollFactor(0).setDepth(-2);
 for(const p of generateMagical().filter(p=>p.id.startsWith('magical-')&&!p.id.includes('branch')&&Number(p.id.split('-')[1])%8===7)){
  scene.add.text(p.x+p.w/2,p.y-64,MAGICAL_CHAPTERS[magicalSection(p.y)],{fontFamily:'monospace',fontSize:'10px',color:'#ffe3ae',stroke:'#301535',strokeThickness:4}).setOrigin(.5).setDepth(-1);
 }
 const update=(time:number)=>{
  const w=Math.max(GAME_WIDTH*1.12,(GAME_HEIGHT+80)*1.5),cam=scene.cameras.main;
  for(const image of [city,palace])image.setDisplaySize(w,w/1.5).setPosition(-cam.scrollX*.025,-Math.min(60,cam.scrollY*.004));
  const climb=1-cam.scrollY/(MAGICAL_HEIGHT-GAME_HEIGHT);palace.setAlpha(Math.max(0,Math.min(1,(climb-.35)/.3)));
  stars.clear();for(let i=0;i<26;i++){
   const x=((i*149-cam.scrollX*.35+Math.sin(time*.0007+i)*8)%GAME_WIDTH+GAME_WIDTH)%GAME_WIDTH;
   const y=((i*i*53-cam.scrollY*.2-time*.008)%GAME_HEIGHT+GAME_HEIGHT)%GAME_HEIGHT;
   const a=.18+.45*(.5+.5*Math.sin(time*.0015+i));stars.fillStyle(i%3?0xffcee8:0xffe5a3,a);
   stars.fillRect(Math.round(x)-2,Math.round(y),5,1);stars.fillRect(Math.round(x),Math.round(y)-2,1,5);
  }
 };
 update(0);scene.events.on('update',update);scene.events.once('shutdown',()=>scene.events.off('update',update));
}
export function renderMagicalTerrain(scene:Phaser.Scene,p:Platform,c:Phaser.GameObjects.Container):void{
 const variants=['ribbon-palace','rose-garden','star-crystal'] as const;
 const variant=variants[p.id==='crown'?2:p.type==='wood'?1:(Math.floor(p.y/100)+magicalSection(p.y))%3];
 const m=metrics[variant],sx=p.w/m.capWidth,artHeight=Math.max(p.h+12,Math.min(64,p.w*m.height/m.capWidth));
 c.setData('width',p.w);c.add(scene.add.image(-m.capLeft*sx,0,'magical-ai-'+variant).setOrigin(0).setDisplaySize(m.width*sx,artHeight));
 if(p.id==='crown'){
  const g=scene.add.graphics();const x=p.w/2;
  g.lineStyle(2,0xf7dca4).strokeCircle(x,-38,23);g.lineStyle(1,0xeab7ec).strokeCircle(x,-38,29);
  g.fillStyle(0xffb2d4).fillCircle(x-7,-40,10).fillCircle(x+7,-40,10).fillTriangle(x-16,-38,x+16,-38,x,-19);
  g.fillStyle(0xfff0c6).fillRect(x-1,-70,2,9).fillRect(x-5,-66,10,2);c.add(g);
 }
}
