import type Phaser from 'phaser';
import {PLAYER_ANIMATIONS} from './assetManifest';

export const ANIMALS=['puppy','cat','rat'] as const;
export type Animal=typeof ANIMALS[number];
export const isAnimal=(character:string):character is Animal=>ANIMALS.includes(character as Animal);
export const ANIMAL_HATS=[{id:'none',name:'No Hat'},{id:'party',name:'Party Hat'}] as const;
export const ANIMAL_ANIMATIONS={...PLAYER_ANIMATIONS,land:{start:6,end:6,frameRate:10,repeat:0},eliminated:{start:7,end:7,frameRate:6,repeat:0},walk:{start:8,end:11,frameRate:10,repeat:-1}};
// Forehead columns follow the head forward through crouch, flight and sleep.
const HEAD_COLUMNS:Record<Animal,number[]>={
 puppy:[21,21,23,22,24,23,23,23,21,21,21,21],
 cat:[22,22,23,23,24,23,23,24,22,22,22,22],
 rat:[22,22,22,22,24,23,23,23,22,22,22,22]
};
const HAT=['   YY   ','   PP   ','  DPPD  ','  DPBD  ',' DPPBPD ',' DBPPPD ','DPPPBPPD','DCCCCCCD'];
const COLORS:Record<string,string>={Y:'#ffe084',P:'#f264a4',D:'#47344e',B:'#fff0ae',C:'#64d9d7'};

export function animalTexture(scene:Phaser.Scene,animal:Animal,hat='none'):string {
 const sourceKey=animal+'-sprites',key=hat==='party'?animal+'-party':sourceKey;
 if(hat==='party'&&!scene.textures.exists(key)){
  const canvas=document.createElement('canvas');canvas.width=384;canvas.height=40;
  const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
  c.drawImage(scene.textures.get(sourceKey).getSourceImage() as HTMLImageElement,0,8);
  const pixels=c.getImageData(0,0,384,40).data;
  for(let frame=0;frame<12;frame++){
   const column=HEAD_COLUMNS[animal][frame];let headY=8;
   while(headY<39&&pixels[(headY*384+frame*32+column)*4+3]<180)headY++;
   if(headY>=39)throw new Error('Missing animal head anchor: '+animal+' frame '+frame);
   const lean=frame===4?1:frame===5?-1:frame===7?2:0;
   for(let y=0;y<HAT.length;y++)for(let x=0;x<HAT[y].length;x++){
    const color=COLORS[HAT[y][x]];if(!color)continue;
    c.fillStyle=color;c.fillRect(frame*32+column-4+x+Math.round(lean*(7-y)/7),headY-6+y,1,1);
   }
  }
  const texture=scene.textures.addCanvas(key,canvas)!;
  for(let frame=0;frame<12;frame++)texture.add(frame,0,frame*32,0,32,40);
 }
 for(const [name,animation] of Object.entries(ANIMAL_ANIMATIONS)){
  const animationKey=key+'-'+name.replaceAll('_','-');
  if(!scene.anims.exists(animationKey))scene.anims.create({key:animationKey,frames:scene.anims.generateFrameNumbers(key,{start:animation.start,end:animation.end}),frameRate:animation.frameRate,repeat:animation.repeat});
 }
 return key;
}

/** Use the same authored pixels as the equipped hat. */
export function drawAnimalHatIcon(canvas:HTMLCanvasElement):void {
 const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
 for(let y=0;y<HAT.length;y++)for(let x=0;x<HAT[y].length;x++){
  const color=COLORS[HAT[y][x]];if(color){c.fillStyle=color;c.fillRect(8+x*6,8+y*6,6,6);}
 }
}
