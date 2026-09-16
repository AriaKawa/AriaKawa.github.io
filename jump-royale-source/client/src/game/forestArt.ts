import type Phaser from 'phaser';
import type {Platform} from './types';
import {GAME_WIDTH,GAME_HEIGHT} from './constants';
import {FOREST_WIDTH,FOREST_CHAPTERS,forestSection,generateForest} from '../../../server/src/sim/forest';

const random=(seed:number)=>()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
function poly(c:CanvasRenderingContext2D,color:string,pts:number[]){c.fillStyle=color;c.beginPath();c.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)c.lineTo(pts[i],pts[i+1]);c.closePath();c.fill();}
function pine(c:CanvasRenderingContext2D,x:number,y:number,h:number,color:string,seed:number){
 const r=random(seed),w=h*.26;c.fillStyle=color;c.fillRect(x-3,y-h,6,h);
 for(let i=0;i<10;i++){const t=i/10,cy=y-h+t*h*.86,spread=w*(.15+t*.85);poly(c,color,[x,cy-24,x-spread,cy+25,x-spread*.63,cy+23,x-spread*1.13,cy+40,x,cy+33,x+spread,cy+40,x+spread*.72,cy+18]);
  for(let j=0;j<4;j++){c.fillRect(Math.round(x-spread+r()*spread*2),Math.round(cy+22+r()*18),3+Math.floor(r()*8),2);}
 }
}
/** Draw at native pixel resolution, then sample with nearest filtering. */
export function paintForestSky(c:CanvasRenderingContext2D,w=1280,h=720):void{
 const r=random(7281);const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#070b24');sky.addColorStop(.5,'#203851');sky.addColorStop(1,'#3c706e');c.fillStyle=sky;c.fillRect(0,0,w,h);
 for(let i=0;i<350;i++){c.fillStyle=i%8===0?'#d3f8ec':'#5e7d9e';const x=Math.floor(r()*w),y=Math.floor(r()*h*.65);c.fillRect(x,y,i%8===0?2:1,1);if(i%30===0){c.fillRect(x-2,y,5,1);c.fillRect(x,y-2,1,5);}}
 const mx=w*.68,my=h*.23;
 for(let i=8;i>=1;i--){c.fillStyle=`rgba(148,205,212,${.007+i*.0009})`;c.beginPath();c.arc(mx,my,51+i*9,0,Math.PI*2);c.fill();}
 c.fillStyle='#d7e9d0';c.beginPath();c.arc(mx,my,49,0,Math.PI*2);c.fill();
 for(let i=0;i<60;i++){const x=(r()-.5)*80,y=(r()-.5)*80;if(x*x+y*y<1800){c.fillStyle=i%2?'#bdcfc3':'#c8dbcb';c.fillRect(Math.floor(mx+x),Math.floor(my+y),3+r()*8,2+r()*4);}}
 for(let layer=0;layer<3;layer++){
  const pts=[0,h];for(let x=0;x<=w+32;x+=32)pts.push(x,h*.5+layer*64+Math.sin(x*.008+layer*2)*55+r()*36);pts.push(w,h);poly(c,['#243b58','#254b61','#28596b'][layer],pts);
 }
 for(let i=0;i<45;i++)pine(c,i*31,h*.9+Math.sin(i)*30,140+r()*170,'#234b5b',i+51);
 for(let i=0;i<30;i++)pine(c,i*47-15,h+30,210+r()*180,'#173b4d',i+901);
 const fog=c.createLinearGradient(0,h*.7,0,h);fog.addColorStop(0,'#36727400');fog.addColorStop(1,'#467d7977');c.fillStyle=fog;c.fillRect(0,h*.7,w,h*.3);
}
function texture(scene:Phaser.Scene,key:string,w:number,h:number,paint:(c:CanvasRenderingContext2D)=>void){
 if(!scene.textures.exists(key)){const t=scene.textures.createCanvas(key,w,h)!;t.context.imageSmoothingEnabled=false;paint(t.context);t.refresh();t.setFilter(0);}return key;
}
export function drawForest(scene:Phaser.Scene):void{
 const key=texture(scene,'moonveil-sky',1280,720,c=>paintForestSky(c));
 const sky=scene.add.image(0,0,key).setOrigin(0).setScrollFactor(0).setDepth(-40);
 const treeKey=texture(scene,'moonveil-parallax',1280,900,c=>{for(let i=0;i<12;i++)pine(c,i*116,940,360+(i*71)%320,'#0b2737',i+3);});
 const trees=scene.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,treeKey).setOrigin(0).setScrollFactor(0).setDepth(-31).setAlpha(.72);
 // World-space ancient trunks connect the outstretching branches into a landscape.
 const trunkKey=texture(scene,'moonveil-elder',160,1024,c=>{
  c.fillStyle='#0a2029';c.fillRect(44,0,76,1024);const r=random(55);
  for(let i=0;i<1500;i++){c.fillStyle=['#102e34','#14383a','#19413e','#0d252d'][i%4];c.fillRect(46+Math.floor(r()*70),Math.floor(r()*1024),2+Math.floor(r()*8),10+Math.floor(r()*65));}
  for(let y=90;y<1024;y+=270){poly(c,'#0a2029',[70,y+65,12,y+21,0,y-34,24,y+10,83,y+32,147,y-40,156,y-17,101,y+66]);}
 });
 for(let x=160;x<FOREST_WIDTH;x+=480)scene.add.tileSprite(x,0,160,14400,trunkKey).setOrigin(0).setDepth(-14).setAlpha(.55);
 const level=generateForest();
 for(const p of level.filter(p=>p.id.startsWith('forest-')&&!p.id.includes('branch')&&Number(p.id.split('-')[1])%8===7)){
  const section=forestSection(p.y);scene.add.text(p.x+p.w/2,p.y-65,FOREST_CHAPTERS[section],{fontFamily:'monospace',fontSize:'10px',color:'#bbd7b0',stroke:'#09242e',strokeThickness:4}).setOrigin(.5).setDepth(-1);
 }
 const motes=scene.add.graphics().setScrollFactor(0).setDepth(-2);
 const update=(time:number)=>{
  const skyWidth=Math.max(GAME_WIDTH*1.12,GAME_HEIGHT*1280/720);sky.setDisplaySize(skyWidth,skyWidth*720/1280);sky.x=-scene.cameras.main.scrollX*.025;
  trees.setSize(GAME_WIDTH,GAME_HEIGHT);trees.tilePositionX=scene.cameras.main.scrollX*.3;trees.tilePositionY=scene.cameras.main.scrollY*.13;
  motes.clear();for(let i=0;i<26;i++){const x=((i*137-scene.cameras.main.scrollX*.45+Math.sin(time*.0004+i)*12)%GAME_WIDTH+GAME_WIDTH)%GAME_WIDTH,y=((i*i*43-scene.cameras.main.scrollY*.25+time*.008)%GAME_HEIGHT+GAME_HEIGHT)%GAME_HEIGHT;const a=.25+.55*(.5+.5*Math.sin(time*.002+i));motes.fillStyle(0x7edcb0,a*.12).fillCircle(x,y,4);motes.fillStyle(0xb5ffd0,a).fillRect(Math.round(x),Math.round(y),1,2);}
 };
 update(0);scene.events.on('update',update);scene.events.once('shutdown',()=>scene.events.off('update',update));
}
export function renderForestTerrain(scene:Phaser.Scene,p:Platform,container:Phaser.GameObjects.Container):void{
 const w=Math.ceil(p.w),h=Math.ceil(p.h),seed=Math.round(p.x*3+p.y),wood=p.type==='wood';
 const key=texture(scene,'moonveil-terrain-'+p.id,w,h+32,c=>{
  const r=random(seed);c.fillStyle=wood?'#293a33':'#203a48';c.fillRect(0,0,w,h);
  // Exactly rectangular solid core. Dark roots below are decorative, with no false tops.
  for(let y=6;y<h;y+=6)for(let x=0;x<w;x+=8){c.fillStyle=(wood?['#344b3e','#405444','#20362f','#526047']:['#2b4653','#35525b','#243e4b','#426065'])[Math.floor(r()*4)];c.fillRect(x,y,wood?16+r()*22:6+r()*10,wood?2:4);}
  if(!wood)for(let x=0;x<w;x+=22){const y=8+Math.floor(r()*12),size=12+r()*28;poly(c,'#142d3b',[x,y,x+size,y+4,x+size-7,h-3,x-6,h-3]);poly(c,'#3c5862',[x+2,y+1,x+size-2,y+5,x+size-9,h-5,x,h-5]);c.fillStyle='#577279';c.fillRect(x+2,y+1,size-10,1);}
  c.fillStyle='#102b34';c.fillRect(0,h-5,w,5);
  for(let i=0;i<w/15;i++){const x=Math.floor(r()*w);poly(c,wood?'#263b32':'#18333e',[x,h-2,x+12,h-2,x+7,h+7+r()*22,x+3,h+9]);}
  c.fillStyle='#3d6854';c.fillRect(0,0,w,7);c.fillStyle='#8dbb79';c.fillRect(0,0,w,2);
  for(let x=0;x<w;x+=3){c.fillStyle=['#b1d59c','#71a67b','#477c62'][Math.floor(r()*3)];c.fillRect(x,2,2,1+r()*6);if(r()>.66){c.fillStyle='#3f7558';c.fillRect(x,6,3,4+r()*11);}}
 });
 container.add(scene.add.image(0,0,key).setOrigin(0));
 // Small plants grow behind the collision top, so the edge remains unmistakable.
 const deco=scene.add.graphics();const r=random(seed+44);
 for(let i=0;i<Math.floor(w/45);i++){
  const x=12+r()*(w-24);deco.lineStyle(1,0x477765).lineBetween(x,0,x-4,-12);deco.lineBetween(x-2,-4,x-9,-8);deco.lineBetween(x-3,-8,x+3,-13);
  if(i%2===0){deco.fillStyle(0x669ba2).fillRect(x+9,-6,2,6);deco.fillStyle(0x9ae1ce).fillRect(x+6,-8,8,3);deco.fillStyle(0xe2f9c0).fillRect(x+8,-9,3,1);}
 }
 if(p.w>=290 || p.id==='crown'){
  const x=p.w-25;deco.fillStyle(0x182d34).fillRect(x,-32,3,32);deco.fillStyle(0x629077).fillRect(x-5,-35,13,3);deco.fillStyle(0xeec987).fillRect(x-3,-31,9,10);deco.fillStyle(0xffffc3).fillRect(x,-29,3,5);
 }
 if(p.id==='crown'){
  const x=p.w/2;deco.fillStyle(0x3e636c).fillRect(x-24,-44,48,44);deco.fillStyle(0x1b3644).fillRect(x-16,-37,32,37);deco.fillStyle(0x7daba5).fillRect(x-29,-47,58,5);deco.lineStyle(3,0xd6e7ae).strokeCircle(x,-62,13);deco.fillStyle(0xece4a5).fillTriangle(x-7,-23,x,-33,x+7,-23);
 }
 container.add(deco);
}

export function forestWater(scene:Phaser.Scene):string{
 return texture(scene,'moonveil-water',1024,512,c=>{
  const r=random(980);const g=c.createLinearGradient(0,0,0,512);g.addColorStop(0,'#3b878a');g.addColorStop(.12,'#204d66');g.addColorStop(1,'#09172c');c.fillStyle=g;c.fillRect(0,0,1024,512);
  for(let i=0;i<1300;i++){const y=Math.floor(r()*512),x=Math.floor(r()*1024);c.fillStyle=y<30?['#83ccbf','#417e89','#b2e1cd'][i%3]:['#2b6274','#255269','#1b3a53'][i%3];c.fillRect(x,y,4+r()*35,1+(i%3===0?1:0));}
  c.fillStyle='#b7e2cc';c.fillRect(0,0,1024,2);
 });
}
