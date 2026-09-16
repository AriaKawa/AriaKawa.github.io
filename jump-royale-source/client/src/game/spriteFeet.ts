import type Phaser from 'phaser';
const origins = new Map<string, number>();
/** Neutral-pose foot baseline avoids transparent padding and animation jitter. */
export function footOrigin(scene: Phaser.Scene, key: string): number {
  const cached = origins.get(key);
  if (cached !== undefined) return cached;
  const texture = scene.textures.get(key), frame = texture.get(0);
  const canvas = document.createElement('canvas');
  canvas.width = frame.width; canvas.height = frame.height;
  const context = canvas.getContext('2d', {willReadFrequently:true})!;
  context.drawImage(texture.getSourceImage() as HTMLImageElement, frame.cutX, frame.cutY, frame.width, frame.height, 0, 0, frame.width, frame.height);
  const pixels = context.getImageData(0,0,frame.width,frame.height).data;
  for(let y=frame.height-1;y>=0;y--) for(let x=0;x<frame.width;x++) {
    if(pixels[(y*frame.width+x)*4+3]>32) {
      const origin=(y+1)/frame.height; origins.set(key,origin); return origin;
    }
  }
  return 1;
}
