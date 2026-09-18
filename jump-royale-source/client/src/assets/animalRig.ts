import type Phaser from 'phaser';
import {PLAYER_ANIMATIONS} from './assetManifest';

export const ANIMALS=['puppy','cat','rat','cerberus','kangaroo'] as const;
export type Animal=typeof ANIMALS[number];
export const isAnimal=(character:string):character is Animal=>ANIMALS.includes(character as Animal);
export const ANIMAL_HATS=[{id:'none',name:'No Hat'},{id:'party',name:'Party Hat'},{id:'fedora',name:'Fedora'},{id:'unicorn',name:'Unicorn Horn'}] as const;
export type AnimalHat=typeof ANIMAL_HATS[number]['id'];
export const ANIMAL_ANIMATIONS={...PLAYER_ANIMATIONS,land:{start:6,end:6,frameRate:10,repeat:0},eliminated:{start:7,end:7,frameRate:6,repeat:0},walk:{start:8,end:11,frameRate:10,repeat:-1}};
// Forehead columns follow the head forward through crouch, flight and sleep.
const HEAD_COLUMNS:Record<Animal,number[]>={
 puppy:[21,21,23,22,24,23,23,23,21,21,21,21],
 cat:[22,22,23,23,24,23,23,24,22,22,22,22],
 rat:[22,22,22,22,24,23,23,23,22,22,22,22],
 cerberus:[19,19,23,23,20,20,23,24,21,21,21,21],
 kangaroo:[21,21,24,25,22,22,24,25,24,23,24,24]
};
const HAT=['   YY   ','   PP   ','  DPPD  ','  DPBD  ',' DPPBPD ',' DBPPPD ','DPPPBPPD','DCCCCCCD'];
const COLORS:Record<string,string>={Y:'#ffe084',P:'#f264a4',D:'#47344e',B:'#fff0ae',C:'#64d9d7'};
const HATS:Record<string,{pixels:string[];colors:Record<string,string>;anchor:number}>={
 party:{pixels:HAT,colors:COLORS,anchor:6},
 fedora:{pixels:['   DDDDD   ','  DLMMMD   ','  DLMMMD   ','  DMMMMMD  ','  DDDDDDD  ','DDMMMMMMMDD',' DDDDDDDDD '],colors:{D:'#302a35',L:'#d5b078',M:'#92704f'},anchor:5},
 unicorn:{pixels:['    G    ','    W    ','   GWG   ','   WCG   ','   GPWG  ','  GWCCG  ','  WPPWG  ',' GWWCCWG ',' DGGGGGD '],colors:{G:'#d9aa60',W:'#fff5da',C:'#84d9e7',P:'#e6a1dd',D:'#59405d'},anchor:7}
};

export function animalTexture(scene:Phaser.Scene,animal:Animal,hat='none',detailed=false):string {
 const hd=detailed,unit=hd?2:1,size=32*unit,width=384*unit,height=40*unit,padding=8*unit;
 const sourceKey=hd?'fantasy-'+animal+'-16':animal+'-sprites',design=HATS[hat],key=design?animal+(hd?'-16':'')+'-'+hat:sourceKey;
 if(design&&!scene.textures.exists(key)){
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
  c.drawImage(scene.textures.get(sourceKey).getSourceImage() as HTMLImageElement,0,padding);
  const pixels=c.getImageData(0,0,width,height).data;
  for(let frame=0;frame<12;frame++){
   const column=HEAD_COLUMNS[animal][frame]*unit;let headY=padding;
   while(headY<height-1&&pixels[(headY*width+frame*size+column)*4+3]<180)headY++;
   if(headY>=height-1)throw new Error('Missing animal head anchor: '+animal+' frame '+frame);
   const lean=frame===4?1:frame===5?-1:frame===7?2:0;
   c.save();c.beginPath();c.rect(frame*size,0,size,height);c.clip();
   for(let y=0;y<design.pixels.length;y++)for(let x=0;x<design.pixels[y].length;x++){
    const color=design.colors[design.pixels[y][x]];if(!color)continue;
    c.fillStyle=color;c.fillRect(frame*size+column+unit*(-Math.floor(design.pixels[0].length/2)+x+Math.round(lean*(design.pixels.length-1-y)/(design.pixels.length-1))),headY+unit*(-design.anchor+y),unit,unit);
   }
   c.restore();
  }
  const texture=scene.textures.addCanvas(key,canvas)!;
  for(let frame=0;frame<12;frame++)texture.add(frame,0,frame*size,0,size,height);
 }
 for(const [name,animation] of Object.entries(ANIMAL_ANIMATIONS)){
  const animationKey=key+'-'+name.replaceAll('_','-');
  if(!scene.anims.exists(animationKey))scene.anims.create({key:animationKey,frames:scene.anims.generateFrameNumbers(key,{start:animation.start,end:animation.end}),frameRate:animation.frameRate,repeat:animation.repeat});
 }
 return key;
}

/** Use the same authored pixels as the equipped hat. */
export function drawAnimalHatIcon(canvas:HTMLCanvasElement,hat='party'):void {
 const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
 c.clearRect(0,0,canvas.width,canvas.height);const design=HATS[hat];if(!design)return;
 const scale=Math.floor(Math.min(canvas.width,canvas.height)*.85/Math.max(design.pixels[0].length,design.pixels.length));
 const left=(canvas.width-design.pixels[0].length*scale)/2,top=(canvas.height-design.pixels.length*scale)/2;
 for(let y=0;y<design.pixels.length;y++)for(let x=0;x<design.pixels[y].length;x++){
  const color=design.colors[design.pixels[y][x]];if(color){c.fillStyle=color;c.fillRect(left+x*scale,top+y*scale,scale,scale);}
 }
}
