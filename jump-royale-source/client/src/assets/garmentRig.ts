/** Register all garments to Finn's authored silhouette, including older imports
 * whose waist cuts differ. Preserve source colors with the nearest opaque donor. */
const registered=new WeakMap<CanvasImageSource,HTMLCanvasElement>();
export function drawGarment(c:CanvasRenderingContext2D,image:CanvasImageSource,mask:CanvasImageSource):void {
  const cached=registered.get(image);if(cached){c.drawImage(cached,0,0);return;}
  const sheet=document.createElement('canvas');sheet.width=192;sheet.height=32;
  const s=sheet.getContext('2d')!;s.drawImage(image,0,0);
  const pixels=s.getImageData(0,0,192,32);
  s.clearRect(0,0,192,32);s.drawImage(mask,0,0);
  const shape=s.getImageData(0,0,192,32),out=s.createImageData(192,32);
  for(let f=0;f<6;f++)for(let y=0;y<32;y++)for(let x=0;x<32;x++) {
    const i=(y*192+f*32+x)*4;if(!shape.data[i+3])continue;
    let donor=i,best=Infinity;
    if(!pixels.data[i+3])for(let yy=0;yy<32;yy++)for(let xx=0;xx<32;xx++){
      const j=(yy*192+f*32+xx)*4,d=(xx-x)**2+(yy-y)**2;
      if(pixels.data[j+3]&&d<best){best=d;donor=j;}
    }
    out.data.set(pixels.data.subarray(donor,donor+3),i);out.data[i+3]=shape.data[i+3];
  }
  s.putImageData(out,0,0);
  // Both garments use the same deformation. The upper body follows the head's
  // +1,+1 idle anchor; the waist eases into stationary legs and planted boots.
  s.clearRect(32,0,32,32);
  for(let y=0;y<32;y++) {
    const dx=y<24?1:0,dy=y<23?1:0;
    s.drawImage(sheet,0,y,32-dx,1,32+dx,y+dy,32-dx,1);
  }
  registered.set(image,sheet);c.drawImage(sheet,0,0);
}
