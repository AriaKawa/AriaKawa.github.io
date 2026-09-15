import type Phaser from 'phaser';
import {PLAYER_ANIMATIONS} from './assetManifest';
import {appendWalkFrames} from './characterRig';

/** A complete character: equipment never paints over her authored artwork. */
export function demonTexture(scene:Phaser.Scene):string {
  const key='ember-demon';if(scene.textures.exists(key))return key;
  const canvas=document.createElement('canvas');canvas.width=320;canvas.height=32;
  const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
  c.drawImage(scene.textures.get('demon-source').getSourceImage() as HTMLImageElement,0,0);
  // Keep idle feet fixed and identity exact while the connected body breathes.
  c.clearRect(32,0,32,32);
  for(let y=0;y<32;y++)c.drawImage(canvas,0,y,32,1,32,y+(y<23?1:0),32,1);
  appendWalkFrames(canvas);
  const texture=scene.textures.addCanvas(key,canvas)!;
  for(let f=0;f<10;f++)texture.add(f,0,f*32,0,32,32);
  for(const [name,a] of Object.entries({...PLAYER_ANIMATIONS,walk:{start:6,end:9,frameRate:10,repeat:-1}}))scene.anims.create({key:`${key}-${name.replaceAll('_','-')}`,frames:scene.anims.generateFrameNumbers(key,{start:a.start,end:a.end}),frameRate:a.frameRate,repeat:a.repeat});
  return key;
}
