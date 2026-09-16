import type Phaser from 'phaser';
import {ANIMAL_ANIMATIONS} from './animalRig';

export const FANTASY_CHARACTERS=['cerberus','magical-girl','skeleton','neet','kangaroo'] as const;
export const FANTASY_SHEETS=['cerberus','magical-girl','magical-girl-buns','skeleton','neet','kangaroo'] as const;
export const isFantasy=(id:string)=>FANTASY_CHARACTERS.some(character=>character===id);
export const MAGICAL_HAIR=[{id:'original',name:'Starlight Twin Tails'},{id:'star-buns',name:'Starlight Star Buns'}] as const;
export function fantasyTexture(scene:Phaser.Scene,character:string,hair:string):string {
  const sheet=character==='magical-girl'&&hair==='star-buns'?'magical-girl-buns':character;
  const key='fantasy-'+sheet;
  for(const [name,animation] of Object.entries(ANIMAL_ANIMATIONS)) {
    const animationKey=key+'-'+name.replaceAll('_','-');
    if(!scene.anims.exists(animationKey))scene.anims.create({key:animationKey,frames:scene.anims.generateFrameNumbers(key,{start:animation.start,end:animation.end}),frameRate:animation.frameRate,repeat:animation.repeat});
  }
  return key;
}
