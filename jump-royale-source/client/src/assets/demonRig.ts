import type Phaser from 'phaser';
import {PLAYER_ANIMATIONS} from './assetManifest';
import {appendWalkFrames} from './characterRig';

/** A complete character: equipment never paints over her authored artwork. */
export function demonTexture(scene:Phaser.Scene,hair='original'):string {
  const key=`ember-demon-${hair}`;if(scene.textures.exists(key))return key;
  const canvas=document.createElement('canvas');canvas.width=320;canvas.height=32;
  const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
  c.drawImage(scene.textures.get('demon-source').getSourceImage() as HTMLImageElement,0,0);
  if(hair==='buns'||hair==='braid') {
    // Replace the rear ponytail, preserving the face, horns and front fringe.
    const poses=[{x:0,y:0},{x:0,y:2},{x:1,y:7},{x:-1,y:10},{x:0,y:0},{x:0,y:1}];
    for(let f=0;f<6;f++) {
      const p=poses[f],pixels=c.getImageData(f*32,0,32,32);
      for(let y=0;y<32;y++)for(let x=0;x<32;x++) {
        const i=(y*32+x)*4,r=pixels.data[i],g=pixels.data[i+1],b=pixels.data[i+2];
        const purple=r>g*1.4&&b>g*1.5&&b>r*.7&&r<110&&pixels.data[i+3];
        if(!purple)continue;
        if(x<13+p.x&&y>8+p.y&&y<20+p.y)pixels.data[i+3]=0;
        else {const glow=Math.max(r,b);pixels.data[i]=hair==='buns'?glow+40:glow+65;pixels.data[i+1]=hair==='buns'?glow*.4:glow+55;pixels.data[i+2]=hair==='buns'?glow+20:glow+80;}
      }
      c.putImageData(pixels,f*32,0);
      c.save();c.beginPath();c.rect(f*32,0,32,32);c.clip();
      const rect=(x:number,y:number,w:number,h:number,color:string)=>{c.fillStyle=color;c.fillRect(f*32+x+p.x,y+p.y,w,h);};
      if(hair==='buns'){
        rect(8,7,5,5,'#402039');rect(9,7,3,4,'#a84c76');rect(9,7,2,1,'#dd83a1');
        rect(23,6,4,4,'#402039');rect(24,6,2,3,'#a84c76');rect(24,6,1,1,'#dd83a1');
      }else{
        for(let n=0;n<5;n++){const x=10+n%2;rect(x,9+n*2,3,3,'#494153');rect(x+1,9+n*2,2,2,'#a99bb7');rect(x+1,9+n*2,1,1,'#e5d4eb');}
        rect(11,19,2,1,'#d6a54b');
      }
      c.restore();
    }
  }
  // Keep idle feet fixed and identity exact while the connected body breathes.
  c.clearRect(32,0,32,32);
  for(let y=0;y<32;y++)c.drawImage(canvas,0,y,32,1,32,y+(y<23?1:0),32,1);
  appendWalkFrames(canvas);
  const texture=scene.textures.addCanvas(key,canvas)!;
  for(let f=0;f<10;f++)texture.add(f,0,f*32,0,32,32);
  for(const [name,a] of Object.entries({...PLAYER_ANIMATIONS,walk:{start:6,end:9,frameRate:10,repeat:-1}}))scene.anims.create({key:`${key}-${name.replaceAll('_','-')}`,frames:scene.anims.generateFrameNumbers(key,{start:a.start,end:a.end}),frameRate:a.frameRate,repeat:a.repeat});
  return key;
}
