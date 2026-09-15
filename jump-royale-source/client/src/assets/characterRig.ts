/** Head anchors in the original 32px pose grid. All head attachments share
 * the idle breath; the feet remain at the authored position. */
export const HEAD_POSES = [
  {x:0,y:7,bobX:0,bobY:0,sway:0},
  {x:1,y:8,bobX:1,bobY:1,sway:1},
  {x:1,y:12,bobX:0,bobY:0,sway:0},
  {x:-1,y:15,bobX:0,bobY:0,sway:1},
  {x:1,y:5,bobX:0,bobY:0,sway:-1},
  {x:1,y:10,bobX:0,bobY:0,sway:1}
] as const;

// A small rounded three-quarter face. Single-pixel eyes and a quiet mouth
// replace the old oversized eye, flat rectangular cheek and dark mouth bar.
const FACE = [
  '  sssss  ',
  ' smhhhms ',
  'smhllllm ',
  'emlElElm ',
  'emllllmmn',
  ' smllmmn ',
  '  mmrmm  ',
  '   nnn   ',
] as const;
const SKIN:Record<string,string>={s:'#80594d',m:'#e5ab88',h:'#ffe0b8',l:'#f7c7a2',E:'#363243',n:'#d9987b',r:'#bf7b77',e:'#c78d72'};
export function drawFace(c:CanvasRenderingContext2D,frame:number):void {
  const pose=HEAD_POSES[frame];
  for(let row=0;row<FACE.length;row++)for(let col=0;col<FACE[row].length;col++) {
    const color=SKIN[FACE[row][col]];if(!color)continue;
    c.fillStyle=color;c.fillRect(frame*32+13+pose.x+col,pose.y+row,1,1);
  }
}

/** Four actual stepping poses from the selected outfit's own pixel layers.
 * Separate legs swing in opposite directions; feet lift on passing poses.
 * The upper body bobs as a unit so face, hair and helmet stay registered. */
export function appendWalkFrames(canvas:HTMLCanvasElement):void {
  const c=canvas.getContext('2d')!;
  const source=document.createElement('canvas');source.width=32;source.height=32;
  source.getContext('2d')!.drawImage(canvas,0,0,32,32,0,0,32,32);
  const steps=[{s:2,l:0,r:1,b:0},{s:0,l:2,r:0,b:-1},{s:-2,l:1,r:0,b:0},{s:0,l:0,r:2,b:-1}];
  for(const [i,p] of steps.entries()) {
    const x=(6+i)*32;
    c.save();c.beginPath();c.rect(x,0,32,32);c.clip();
    // Boots and trouser cuffs swing underneath the unchanged waist/apron/skirt.
    for(let y=24;y<32;y++) {
      const swing=Math.round(p.s*(y-23)/8);
      c.drawImage(source,0,y,17,1,x+swing,y-p.l,17,1);
      c.drawImage(source,17,y,15,1,x+17-swing,y-p.r,15,1);
    }
    c.drawImage(source,0,0,32,24,x,p.b,32,24);
    // Small opposing hand swings retain the original sleeve and hand colors.
    for(const arm of [{sx:9,w:4,dx:p.s>0?1:-1},{sx:23,w:4,dx:p.s>0?-1:1}]) {
      c.clearRect(x+arm.sx,19+p.b,arm.w,5);
      c.drawImage(source,arm.sx,19,arm.w,5,x+arm.sx+arm.dx,19+p.b,arm.w,5);
    }
    c.restore();
  }
}

/** Draw within one frame so a bobbing attachment cannot leak into its neighbor. */
export function drawHelmet(c:CanvasRenderingContext2D,image:CanvasImageSource,frame:number):void {
  const pose=HEAD_POSES[frame],x=frame*32;
  c.save();c.beginPath();c.rect(x,0,32,32);c.clip();
  c.drawImage(image,x,0,32,32,x+pose.bobX,pose.bobY,32,32);
  c.restore();
}

export function drawHairLayer(c:CanvasRenderingContext2D,image:CanvasImageSource,frame:number,back:boolean,covered:boolean):void {
  const pose=HEAD_POSES[frame],x=frame*32,left=x+6+pose.x,top=pose.y-3;
  c.save();c.beginPath();c.rect(x,0,32,32);c.clip();
  if(back) {
    // Cap follows the skull. Lower locks have one pixel of pose-dependent sway.
    c.drawImage(image,0,0,20,10,left,top,20,10);
    c.drawImage(image,0,10,20,10,left+pose.sway,top+10,20,10);
  } else if(!covered) {
    // Preserve the generated fringe and its transparent face opening instead
    // of chopping it into a six-pixel-high rectangular strip.
    c.drawImage(image,0,0,20,13,left,top,20,13);
  }
  c.restore();
}
