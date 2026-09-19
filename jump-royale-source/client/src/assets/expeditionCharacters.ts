import type Phaser from 'phaser';
export const EXPEDITION_CHARACTERS=[{id:'pirate',name:'Captain Marlow'},{id:'astro-monkey',name:'Cosmo'},{id:'axolotl',name:'Mochi Rose'}] as const;
export const isExpeditionCharacter=(id:string)=>EXPEDITION_CHARACTERS.some(c=>c.id===id);
export const EXPEDITION_ANIMATIONS={
 idle:{frames:[0,1,0,15],rate:3,repeat:-1},
 'charge-start':{frames:[2,3],rate:8,repeat:0},
 'charge-loop':{frames:[3,2,3],rate:5,repeat:-1},
 jump:{frames:[4],rate:8,repeat:0},fall:{frames:[5],rate:8,repeat:-1},
 land:{frames:[6,2,0],rate:14,repeat:0},eliminated:{frames:[7],rate:6,repeat:0},
 walk:{frames:[8,9,10,11],rate:10,repeat:-1},
 victory:{frames:[12,13,14,13],rate:6,repeat:-1},
};
export function expeditionTexture(scene:Phaser.Scene,id:string):string {
 const key='expedition-'+id;
 for(const [name,animation] of Object.entries(EXPEDITION_ANIMATIONS))if(!scene.anims.exists(key+'-'+name))scene.anims.create({key:key+'-'+name,frames:animation.frames.map(frame=>({key,frame})),frameRate:animation.rate,repeat:animation.repeat});
 return key;
}
