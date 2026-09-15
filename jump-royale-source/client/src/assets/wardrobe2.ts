import type Phaser from 'phaser';
import {PLAYER_ANIMATIONS} from './assetManifest';

export type LabLook={variant:number;look:number};
export const FINNS=['Finn · Trailblazer','Finn · Nightfall','Finn · Signature'];
export const LOOKS=['Fieldwork','Celestial Guard','Ember Expedition'];
export const labSize=(o:LabLook)=>o.variant===2||o.look>0?64:32;

/** Authored on the same foot anchor in every pose. HD detail uses half-grid
 * strokes, so the 64px sheets contain new pixels rather than a scaled copy. */
export function drawLabSheet(o:LabLook):HTMLCanvasElement {
 const n=labSize(o),canvas=document.createElement('canvas');canvas.width=n*10;canvas.height=n;
 const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;c.scale(n/32,n/32);
 const ink='#202337',skin='#efba94',light='#ffdbb4';
 const palettes=[['#367e87','#66b5b3','#213e55','#c69556'],['#273753','#668bba','#18273d','#efcc85'],['#963f3f','#dc7755','#333746','#f1c58a']];
 const [coat,highlight,trousers,trim]=palettes[o.look];
 const hair=[['#754a32','#b47a47'],['#30334b','#606982'],['#80522f','#d19a53']][o.variant];
 const poses=[{y:0,x:0,s:0,l:0,r:0},{y:1,x:0,s:0,l:0,r:0},{y:3,x:0,s:0,l:0,r:0},{y:5,x:0,s:0,l:0,r:0},{y:-2,x:0,s:2,l:2,r:0},{y:1,x:0,s:-2,l:0,r:2},{y:0,x:0,s:2,l:0,r:1},{y:-1,x:0,s:0,l:2,r:0},{y:0,x:0,s:-2,l:1,r:0},{y:-1,x:0,s:0,l:0,r:2}];
 poses.forEach((p,f)=>{
  c.save();c.translate(f*32,0);c.beginPath();c.rect(0,0,32,32);c.clip();
  const rect=(x:number,y:number,w:number,h:number,color:string)=>{c.fillStyle=color;c.fillRect(x,y,w,h);};
  // Feet stay planted in idle frame two. Only the connected upper body breathes.
  for(const [x,shift,lift] of [[11,p.s,p.l],[18,-p.s,p.r]]){
   rect(x+shift,23,5,7-lift,ink);rect(x+shift+1,24,3,4-lift,trousers);
   rect(x+shift-1,29-lift,6,2,ink);rect(x+shift,29-lift,4,1,trim);
  }
  const y=p.y;
  rect(10,17+y,14,8,ink);rect(11,17+y,12,7,coat);
  rect(12,17+y,3,6,highlight);rect(11,24,12,2,ink);rect(12,24,10,1,trim);
  for(const [x,dy] of [[8,-p.s],[23,p.s]]){rect(x,17+y+dy,4,7,ink);rect(x+1,18+y+dy,2,4,coat);rect(x+1,22+y+dy,2,2,skin);}
  rect(15,14+y,5,4,ink);rect(16,14+y,3,4,skin);
  // Consistent, deliberately compact silhouette and an unobstructed face.
  rect(11,5+y,12,10,ink);rect(10,7+y,14,6,ink);
  rect(12,6+y,10,9,skin);rect(11,8+y,12,5,skin);rect(13,7+y,7,5,light);
  rect(13,10+y,1,2,ink);rect(19,10+y,1,2,ink);rect(17,13+y,2,1,'#aa6862');
  rect(11,4+y,11,4,hair[0]);rect(10,6+y,3,4,hair[0]);rect(21,6+y,2,3,hair[0]);
  rect(12,4+y,6,1,hair[1]);rect(12,6+y,3,2,hair[1]);
  if(o.variant===0){rect(13,3+y,5,2,hair[0]);rect(17,6+y,3,1,hair[1]);}
  if(o.variant===1){rect(10,5+y,5,3,hair[1]);rect(11,7+y,2,2,hair[1]);rect(18,17+y,5,2,'#8f84bb');}
  if(o.variant===2){rect(15,3+y,6,2,hair[0]);rect(17,3+y,3,.5,hair[1]);}
  if(o.look===1){
   rect(10,17+y,4,2,trim);rect(21,17+y,3,2,trim);rect(16,18+y,4,4,trim);rect(17,19+y,2,2,'#8be1e3');
   rect(12,21+y,1,3,trim);rect(22,21+y,1,3,trim);
  }else if(o.look===2){
   rect(11,16+y,12,2,trim);rect(20,17+y,3,6,trim);rect(12,20+y,3,3,'#572f33');rect(13,20+y,1,1,trim);
  }else {rect(17,18+y,1,6,trim);rect(19,19+y,3,2,trousers);}
  if(n===64){
   // New subpixel embroidery, seams, eye glints, hair strands and boot rivets.
   rect(13,9.5+y,1,.5,'#9b644e');rect(19,9.5+y,1,.5,'#9b644e');
   rect(13,10+y,.5,.5,'#fff6db');rect(19,10+y,.5,.5,'#fff6db');
   rect(20,12+y,1,.5,'#d5927e');rect(17,13+y,1,.5,'#bc7d70');
   for(let i=0;i<4;i++)rect(13+i*2,5+y,.5,1,hair[1]);
   rect(11.5,19+y,.5,4,trim);rect(22,19+y,.5,4,highlight);
   for(let i=0;i<4;i++){rect(14+i*2,24,.5,.5,'#fff0c7');rect(17.5,18.5+y+i, .5,.5,trim);}
   rect(12+p.s,29-p.l,2,.5,'#ecd8ba');rect(19-p.s,29-p.r,2,.5,'#ecd8ba');
   if(o.look===1){rect(17.5,18+y,.5,4,'#fff0c7');rect(16,19.5+y,4,.5,'#fff0c7');}
   if(o.look===2){for(let i=0;i<4;i++)rect(20.5,18+y+i,1,.5,'#b3734a');}
  }
  c.restore();
 });
 return canvas;
}
export function labTexture(scene:Phaser.Scene,o:LabLook):string {
 const key=`wardrobe2-${o.variant}-${o.look}`;if(scene.textures.exists(key))return key;
 const n=labSize(o),texture=scene.textures.addCanvas(key,drawLabSheet(o))!;
 for(let f=0;f<10;f++)texture.add(f,0,f*n,0,n,n);
 for(const [name,a] of Object.entries({...PLAYER_ANIMATIONS,walk:{start:6,end:9,frameRate:10,repeat:-1}}))scene.anims.create({key:`${key}-${name.replaceAll('_','-')}`,frames:scene.anims.generateFrameNumbers(key,{start:a.start,end:a.end}),frameRate:a.frameRate,repeat:a.repeat});
 return key;
}
