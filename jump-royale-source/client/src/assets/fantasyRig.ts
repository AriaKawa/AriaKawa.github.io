import type Phaser from 'phaser';
import {ANIMAL_ANIMATIONS} from './animalRig';

export const FANTASY_CHARACTERS=['cerberus','magical-girl','skeleton','neet','kangaroo'] as const;
export const FANTASY_SHEETS=['cerberus','magical-girl','magical-girl-buns','skeleton','neet','kangaroo'] as const;
export const isFantasy=(id:string)=>FANTASY_CHARACTERS.some(character=>character===id);
export const MAGICAL_HAIR=[{id:'original',name:'Starlight Twin Tails'},{id:'star-buns',name:'Starlight Star Buns'}] as const;
export const MAGICAL_COSTUMES=[{id:'classic',name:'Starlight · Original'},{id:'starlight-16',name:'Starlight · 16-bit'}] as const;
export const MAGICAL_HD_SHEETS=['magical-girl-16','magical-girl-buns-16'] as const;
export function fantasyTexture(scene:Phaser.Scene,character:string,hair:string,magicalCostume='classic'):string {
  const sheet=(character==='magical-girl'&&hair==='star-buns'?'magical-girl-buns':character)+((character==='magical-girl'&&magicalCostume==='starlight-16')||magicalCostume==='detailed'?'-16':'');
  const key='fantasy-'+sheet;
  for(const [name,animation] of Object.entries(ANIMAL_ANIMATIONS)) {
    const animationKey=key+'-'+name.replaceAll('_','-');
    if(!scene.anims.exists(animationKey))scene.anims.create({key:animationKey,frames:scene.anims.generateFrameNumbers(key,{start:animation.start,end:animation.end}),frameRate:animation.frameRate,repeat:animation.repeat});
  }
  return key;
}
