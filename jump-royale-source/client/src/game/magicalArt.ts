import type Phaser from 'phaser';
import type {Platform} from './types';
import metrics from './magicalArtMetrics.json';
import {GAME_WIDTH,GAME_HEIGHT} from './constants';
import {MAGICAL_HEIGHT,magicalSection} from '../../../server/src/sim/magical';

export function queueMagicalAssets(scene:Phaser.Scene):void{
 for(const name of ['ribbon-palace','rose-garden','star-crystal','dream-city','moon-palace','stardust-tide'])scene.load.image('magical-ai-'+name,import.meta.env.BASE_URL+'assets/magical-ai/'+name+'.webp');
}
export function drawMagical(scene:Phaser.Scene):void{
 drawMagicalFlybys(scene);
 const city=scene.add.image(0,0,'magical-ai-dream-city').setOrigin(0).setScrollFactor(0).setDepth(-40).setTint(0xc6b6d8);
 const palace=scene.add.image(0,0,'magical-ai-moon-palace').setOrigin(0).setScrollFactor(0).setDepth(-39).setAlpha(0).setTint(0xc6b6d8);
 const stars=scene.add.graphics().setScrollFactor(0).setDepth(-2);
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
/** Decorative screen-space flights stay behind terrain and never enter the simulation. */
function drawMagicalFlybys(scene:Phaser.Scene):void{
 const dust=scene.add.graphics().setScrollFactor(0).setDepth(-35).setName('magical-flight-starlight');
 const girls=['magical-girl-16','magical-girl-buns-16'].map(name=>scene.add.image(0,0,'fantasy-'+name,4)
  .setScrollFactor(0).setDepth(-34).setVisible(false).setName('magical-background-flyer'));
 let elapsed=0,nextFlight=6500,nextMeteor=10000;
 let flight:{start:number;duration:number;direction:number;y:number;count:number}|undefined;
 let meteor:{start:number;x:number;y:number}|undefined;
 const random=(min:number,max:number)=>min+Math.random()*(max-min);
 const spark=(x:number,y:number,size:number,color:number,alpha:number)=>{
  dust.fillStyle(color,alpha);dust.fillRect(Math.round(x-size),Math.round(y),size*2+1,1);
  dust.fillRect(Math.round(x),Math.round(y-size),1,size*2+1);
 };
 const update=(_time:number,delta:number)=>{
  elapsed+=Math.min(delta,100);dust.clear();
  if(!flight&&elapsed>=nextFlight){
   flight={start:elapsed,duration:random(10000,14000),direction:Math.random()<.5?1:-1,y:random(.16,.48),count:Math.random()<.35?2:1};
   girls.forEach((girl,i)=>girl.setVisible(i<flight!.count).setScale(i?.62:.8).setFlipX(flight!.direction<0).setTint(i?0xd9c9ff:0xffe4f4));
  }
  if(flight){
   const f=flight,progress=(elapsed-f.start)/f.duration;
   const position=(p:number,i:number)=>({x:f.direction>0?-100+p*(GAME_WIDTH+240)-i*55:GAME_WIDTH+100-p*(GAME_WIDTH+240)+i*55,
    y:GAME_HEIGHT*f.y-Math.sin(p*Math.PI)*55+Math.sin(p*Math.PI*4+i)*12+i*30});
   girls.forEach((girl,i)=>{
    if(i>=f.count)return;
    const p=position(progress,i),fade=Math.min(1,progress*8,(1-progress)*8);
    girl.setPosition(p.x,p.y).setAlpha(Math.max(0,fade)*.68).setAngle(-f.direction*(12+Math.cos(progress*Math.PI*4)*4));
    for(let j=1;j<=20;j++){
     const tail=position(progress-j*.003,i),pulse=.65+.35*Math.sin(elapsed*.004+j*2);
     spark(tail.x,tail.y+10+Math.sin(j*3+elapsed*.001)*7,j%5===0?2:1,j%3?0xffc5ec:0xffedbd,Math.max(0,fade)*.5*(1-j/21)*pulse);
    }
   });
   if(progress>=1){girls.forEach(g=>g.setVisible(false));flight=undefined;nextFlight=elapsed+random(14000,26000);}
  }
  if(!meteor&&elapsed>=nextMeteor)meteor={start:elapsed,x:random(.2,.9)*GAME_WIDTH,y:random(.08,.3)*GAME_HEIGHT};
  if(meteor){
   const age=(elapsed-meteor.start)/1500,fade=Math.sin(Math.min(1,age)*Math.PI)*.48;
   for(let i=0;i<15;i++)spark(meteor.x-age*210+i*5,meteor.y+age*85-i*2,i===0?3:1,0xffe6fa,fade*(1-i/15));
   if(age>=1){meteor=undefined;nextMeteor=elapsed+random(9000,18000);}
  }
 };
 scene.events.on('update',update);
 scene.events.once('shutdown',()=>scene.events.off('update',update));
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
