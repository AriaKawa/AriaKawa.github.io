import type Phaser from 'phaser';

type Bounds={left:number;top:number;right:number;bottom:number;width:number;height:number;bodyHeight:number};
const cache=new Map<string,Bounds>();
/** Measure authored pixels, not the transparent frame. Keep the idle measurement
 * through every pose so crouching, jumping and wearing a hat never resize a body. */
export function spriteBounds(scene:Phaser.Scene,key:string):Bounds {
 const cached=cache.get(key);if(cached)return cached;
 const texture=scene.textures.get(key),frame=texture.get(0),canvas=document.createElement('canvas');
 canvas.width=frame.width;canvas.height=frame.height;const c=canvas.getContext('2d')!;
 c.drawImage(texture.getSourceImage() as HTMLImageElement,frame.cutX,frame.cutY,frame.width,frame.height,0,0,frame.width,frame.height);
 const pixels=c.getImageData(0,0,frame.width,frame.height).data;let left=frame.width,top=frame.height,right=0,bottom=0;
 for(let y=0;y<frame.height;y++)for(let x=0;x<frame.width;x++)if(pixels[(y*frame.width+x)*4+3]>32){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x+1);bottom=Math.max(bottom,y+1);}
 const width=Math.max(1,right-left),height=Math.max(1,bottom-top);
 let bodyHeight=height;
 // Pippa's pogo stick is equipment beneath her feet, not part of her body size.
 if(key==='fantasy-pogo-16')bodyHeight-=9;
 const hat=key.match(/^(puppy|cat|rat|cerberus|kangaroo)(-16)?-(party|fedora|unicorn)$/);
 if(hat)bodyHeight=spriteBounds(scene,hat[2]?'fantasy-'+hat[1]+'-16':hat[1]+'-sprites').bodyHeight;
 const result={left,top,right,bottom,width,height,bodyHeight};cache.set(key,result);return result;
}
/** Cosmetic scale only: all characters retain the shared physics body. */
export const characterVisualScale=(key:string)=>/^(?:fantasy-)?(?:puppy|cat|rat|cerberus|kangaroo)(?:-|$)/.test(key)?.575:1;
export const spriteScale=(scene:Phaser.Scene,key:string,bodyHeight:number)=>characterVisualScale(key)*bodyHeight/spriteBounds(scene,key).bodyHeight;

/** Shared framing for the wardrobe, reward reveals and collection cards. */
export function drawOutfitPreview(scene:Phaser.Scene,canvas:HTMLCanvasElement,key:string,frameIndex=0):void {
 const texture=scene.textures.get(key),frame=texture.get(frameIndex),bounds=spriteBounds(scene,key),c=canvas.getContext('2d')!;
 const scale=Math.min(canvas.height*.84/bounds.bodyHeight,canvas.width*.9/bounds.width,canvas.height*.94/bounds.height)*characterVisualScale(key);
 c.clearRect(0,0,canvas.width,canvas.height);c.imageSmoothingEnabled=false;
 c.drawImage(texture.getSourceImage() as HTMLImageElement,frame.cutX,frame.cutY,frame.width,frame.height,canvas.width/2-(bounds.left+bounds.width/2)*scale,canvas.height*.97-bounds.bottom*scale,frame.width*scale,frame.height*scale);
}
