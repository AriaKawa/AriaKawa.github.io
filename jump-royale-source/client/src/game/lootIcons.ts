import type Phaser from 'phaser';
import {DEFAULT_OUTFIT,outfitTexture} from '../assets/cosmetics';
import {costumeFields} from '../assets/costumeSets';
import {drawAnimalHatIcon} from '../assets/animalRig';
import type {LootEntry} from './economy';

/** Display accessories on their own; characters and costumes show their full look. */
export function drawLootIcon(scene:Phaser.Scene,canvas:HTMLCanvasElement,item:LootEntry):void {
 if(item.slot==='wallpaper'){const source=scene.textures.get(item.id).getSourceImage() as HTMLImageElement;canvas.getContext('2d')!.drawImage(source,0,10,64,44);return;}
 if(item.slot==='animalHat'){drawAnimalHatIcon(canvas,item.id);return;}
 const sample=item.slot==='retroCostume'?{...DEFAULT_OUTFIT,character:item.id,retroCostumes:[item.id]}:item.slot==='hdCostume'?{...DEFAULT_OUTFIT,character:item.id.replace(/-16$/,''),detailedCostumes:[item.id]}:item.slot==='magicalCostume'?{...DEFAULT_OUTFIT,character:'magical-girl',magicalCostume:'starlight-16' as const}:item.slot==='costume'?{...DEFAULT_OUTFIT,...costumeFields(item.id)}:item.slot==='hair'?{...DEFAULT_OUTFIT,character:item.id==='star-buns'?'magical-girl':'demon',hair:item.id}:{...DEFAULT_OUTFIT,character:item.id};
 const key=outfitTexture(scene,sample),frame=scene.textures.getFrame(key,0),source=scene.textures.get(key).getSourceImage() as HTMLImageElement;
 const target=canvas.getContext('2d')!;target.imageSmoothingEnabled=false;
 if(item.slot!=='hair'){const scale=64/Math.max(frame.cutWidth,frame.cutHeight);target.drawImage(source,frame.cutX,frame.cutY,frame.cutWidth,frame.cutHeight,(64-frame.cutWidth*scale)/2,(64-frame.cutHeight*scale)/2,frame.cutWidth*scale,frame.cutHeight*scale);return;}
 const scratch=document.createElement('canvas');scratch.width=32;scratch.height=32;
 const c=scratch.getContext('2d')!;c.imageSmoothingEnabled=false;c.drawImage(source,frame.cutX,frame.cutY,frame.cutWidth,frame.cutHeight,0,0,32,32);
 const pixels=c.getImageData(0,0,32,32);let left=32,top=32,right=0,bottom=0;
 for(let y=0;y<32;y++)for(let x=0;x<32;x++){
  const i=(y*32+x)*4,r=pixels.data[i],g=pixels.data[i+1],b=pixels.data[i+2];
  const hair=item.id==='star-buns'?y<14&&r>g*1.25&&b>g*1.1:y<21&&(item.id==='buns'?r>g*1.6&&b>g*1.3&&b>r*.55:r>g&&b>r&&b-g>=10);
  if(!hair)pixels.data[i+3]=0;
  if(pixels.data[i+3]){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);}
 }
 c.putImageData(pixels,0,0);if(left>right)return;
 const w=right-left+1,h=bottom-top+1,scale=Math.floor(54/Math.max(w,h));
 target.drawImage(scratch,left,top,w,h,(64-w*scale)/2,(64-h*scale)/2,w*scale,h*scale);
}
