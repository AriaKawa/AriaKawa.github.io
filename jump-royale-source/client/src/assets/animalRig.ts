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
// Per-frame crown anchors in the authored 64px sheets (between ears, not ear tips).
export const ANIMAL_HEAD_ANCHORS:Record<Animal,[number,number][]>= {
 puppy:[[44,16],[44,16],[45,22],[47,32],[45,16],[46,19],[45,32],[47,33],[45,18],[45,18],[45,18],[45,18]],
 cat:[[45,25],[45,25],[44,23],[47,37],[48,24],[43,39],[45,37],[44,47],[46,27],[46,28],[45,28],[46,29]],
 rat:[[43,25],[43,25],[41,30],[48,43],[45,33],[30,20],[44,46],[42,45],[42,38],[42,38],[43,38],[43,38]],
 cerberus:[[40,23],[40,23],[39,34],[39,40],[40,22],[37,28],[39,39],[43,49],[39,26],[39,29],[39,28],[39,27]],
 kangaroo:[[48,26],[48,26],[49,29],[48,43],[48,33],[48,22],[47,44],[45,51],[47,26],[45,25],[45,28],[45,27]]
};
const HATS:Record<string,{width:number;height:number}>= {
 party:{width:22,height:28},fedora:{width:28,height:13},unicorn:{width:10,height:28}
};

export function animalTexture(scene:Phaser.Scene,animal:Animal,hat='none',detailed=false):string {
 const hd=detailed,unit=hd?2:1,size=32*unit,width=384*unit,height=44*unit,padding=12*unit;
 const sourceKey=hd?'fantasy-'+animal+'-16':animal+'-sprites',design=HATS[hat],key=design?animal+(hd?'-16':'')+'-'+hat:sourceKey;
 if(design&&!scene.textures.exists(key)){
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
  c.drawImage(scene.textures.get(sourceKey).getSourceImage() as HTMLImageElement,0,padding);
  const pixels=c.getImageData(0,0,width,height).data;
  for(let frame=0;frame<12;frame++){
   const column=HEAD_COLUMNS[animal][frame];let headY=0;
   if(hd)headY=ANIMAL_HEAD_ANCHORS[animal][frame][1];
   else {while(headY<32&&pixels[((headY+padding)*width+frame*size+column)*4+3]<180)headY++;}
   const anchorX=hd?ANIMAL_HEAD_ANCHORS[animal][frame][0]:column;
   const w=hd?design.width:Math.round(design.width/2),h=hd?design.height:Math.round(design.height/2);
   const x=Math.max(0,Math.min(size-w,Math.round(anchorX-w/2)));
   const y=padding+headY-h+2;
   c.save();c.beginPath();c.rect(frame*size,0,size,height);c.clip();
   const hatImage=scene.textures.get('animal-hat-'+hat).getSourceImage() as HTMLImageElement;
   c.drawImage(hatImage,frame*size+x,y,w,h);
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

/** Icons use the exact generated equipment texture worn in play. */
export function drawAnimalHatIcon(scene:Phaser.Scene,canvas:HTMLCanvasElement,hat='party'):void {
 const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;c.clearRect(0,0,canvas.width,canvas.height);
 const design=HATS[hat];if(!design)return;
 const scale=Math.max(1,Math.floor(Math.min(canvas.width/design.width,canvas.height/design.height)*.85));
 const w=design.width*scale,h=design.height*scale;
 c.drawImage(scene.textures.get('animal-hat-'+hat).getSourceImage() as HTMLImageElement,(canvas.width-w)/2,(canvas.height-h)/2,w,h);
}
