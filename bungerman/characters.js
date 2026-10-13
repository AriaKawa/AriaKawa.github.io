// Articulated, resolution-independent arcade cast. Coordinates use a 100-unit rig.
const TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;

export function animationPose(state={}) {
  const time=Number(state.time)||0, reduced=Boolean(state.reduced);
  const action=state.action||'idle', elapsed=Math.max(0,Number(state.actionTime)||0);
  const moving=state.moving??(action==='walk'||state.walk===true);
  const phase=typeof state.walk==='number'?state.walk:time*12.5, stride=moving?(reduced?.32:1):0;
  const wave=Math.sin(phase)*stride, breathe=reduced?0:Math.sin(time*2.5);
  const pose={leftLeg:wave*.52,rightLeg:-wave*.52,leftArm:-wave*.55,rightArm:wave*.55,
    bob:moving?-Math.abs(Math.cos(phase))*2.3*stride:breathe*.65,
    squash:1+(moving?Math.cos(phase*2)*.018:breathe*.012),lean:wave*.025,
    crouch:0,reach:0,blink:!reduced&&((time%4.7)>4.52),mouth:'smile',spin:0,alpha:clamp(state.alpha??1)};
  if(action==='charge') {
    const charge=clamp(Number(state.charge)||0), tremble=reduced?0:Math.sin(time*39)*charge;
    pose.leftArm=-.65;pose.rightArm=.65;pose.crouch=4+charge*4;
    pose.squash=.97-charge*.04;pose.lean=tremble*.018;pose.bob=tremble*.45;pose.mouth='tense';
  } else if(action==='plant') {
    const bend=Math.sin(clamp(elapsed/.32)*Math.PI);
    pose.crouch=12*bend;pose.squash=1-.1*bend;pose.reach=bend;
    pose.rightArm=-.5-bend*.7;pose.leftArm=.4*bend;pose.lean=.14*bend;
  } else if(action==='hit') {
    const kick=1-clamp(elapsed/.48);
    pose.lean=-.24*kick;pose.leftArm=1.3*kick;pose.rightArm=-1.3*kick;
    pose.bob=-5*Math.sin(kick*Math.PI);pose.squash=1+.16*kick;pose.mouth='open';
  } else if(action==='victory') {
    const hop=reduced?0:Math.max(0,Math.sin(time*7));
    pose.bob=-hop*10;pose.leftArm=2.25;pose.rightArm=-2.25;
    pose.leftLeg=-.14-hop*.15;pose.rightLeg=.14+hop*.15;pose.mouth='open';pose.lean=reduced?0:Math.sin(time*5)*.07;
  } else if(action==='death') {
    const fall=clamp(elapsed/.55);
    pose.crouch=fall*39;pose.squash=mix(1,.24,fall);pose.lean=-fall*.15;
    pose.leftArm=-1.4*fall;pose.rightArm=1.4*fall;pose.mouth='open';pose.blink=true;
  }
  return pose;
}


// Painted, independent poses replace the former geometric character rig.
export const CHARACTER_IDS=Object.freeze(['peanut','hutch','ninja','tpain']);
let sheets=null, loading=null;

export function spriteFrame(state={}) {
  const action=state.action||'idle', dir=state.dir||'down';
  let row=dir==='up'?2:(dir==='left'||dir==='right'?1:0), column=0;
  if(action==='throw'||action==='plant') {
    row=3; column=Math.min(5,Math.floor(clamp((state.actionTime||0)/(action==='throw'?.48:.34)) *6));
  } else if(action==='charge') {
    row=3;column=(state.charge||0)>.65?1:0;
  } else if(action==='victory') {row=3;column=3;}
  else if(state.moving??action==='walk') {
    const phase=typeof state.walk==='number'?state.walk:(state.time||0)*12.5;
    column=Math.floor(((phase%TAU+TAU)%TAU)/TAU*6)%6;
  }
  return {row,column,flip:dir==='left'};
}

function browserLoadImage(url) {
  return new Promise((resolve,reject)=>{
    const img=new Image(); img.onload=()=>resolve(img);
    img.onerror=()=>reject(new Error('Could not load character sprite: '+url)); img.src=url;
  });
}

/** Optional loadImage/createCanvas/basePath adapters allow the exact runtime renderer in offline QA. */
export async function loadCharacterSprites(options={}) {
  if(sheets)return sheets;
  if(loading)return loading;
  const loadImage=options.loadImage||browserLoadImage;
  const canvasFactory=options.createCanvas||((w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;});
  const base=options.basePath||new URL('./assets/arcade2005/',import.meta.url).href;
  loading=Promise.all(CHARACTER_IDS.map(async id=>{
    const image=await loadImage(base+id+'-sheet.png');
    const width=image.naturalWidth||image.width,height=image.naturalHeight||image.height;
    if(width%6||height%4)throw new Error('Invalid sprite grid: '+id);
    const cw=width/6,ch=height/4,canvas=canvasFactory(width,height),ctx=canvas.getContext('2d');
    ctx.drawImage(image,0,0);
    const pixels=ctx.getImageData(0,0,width,height).data;
    // Flood fill the full sheet: throw hands and overhead fuses cross nominal cells.
    // Assign a complete connected silhouette by its centroid, never clip to grid edges.
    const visited=new Uint8Array(width*height),queue=new Int32Array(width*height),labels=new Int32Array(width*height),components=[];
    let componentId=0;
    for(let start=0;start<visited.length;start++){
      if(visited[start]||pixels[start*4+3]<=90)continue;
      let head=0,tail=1,count=0,sumX=0,sumY=0,left=width,top=height,right=0,bottom=0;
      queue[0]=start;visited[start]=1;componentId++;
      while(head<tail){
        const index=queue[head++],x=index%width,y=Math.floor(index/width);
        labels[index]=componentId;count++;sumX+=x;sumY+=y;left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);
        for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
          const nx=x+dx,ny=y+dy;
          if(nx<0||nx>=width||ny<0||ny>=height)continue;
          const n=ny*width+nx;if(visited[n]||pixels[n*4+3]<=90)continue;
          visited[n]=1;queue[tail++]=n;
        }
      }
      if(count>500)components.push({label:componentId,count,cx:sumX/count,cy:sumY/count,left,top,right,bottom});
    }
    const frames=[];
    for(let row=0;row<4;row++)for(let col=0;col<6;col++){
      const parts=components.filter(c=>Math.floor(c.cx/cw)===col&&Math.floor(c.cy/ch)===row).sort((a,b)=>b.count-a.count);
      const main=parts[0];if(!main)throw new Error('Empty character silhouette: '+id+' '+row+','+col);
      const left=Math.max(0,main.left-3),top=Math.max(0,main.top-3),right=Math.min(width-1,main.right+3),bottom=Math.min(height-1,main.bottom+3);
      const clip=[];
      for(let y=top;y<=bottom;y++){
        let run=-1;
        for(let x=left;x<=right+1;x++){
          const belongs=x<=right&&labels[y*width+x]===main.label;
          if(belongs&&run<0)run=x;
          if(!belongs&&run>=0){clip.push([run-left,y-top,x-run]);run=-1;}
        }
      }
      const frameImage=canvasFactory(right-left+1,bottom-top+1),frameContext=frameImage.getContext('2d');
      frameContext.fillStyle='#fff';
      for(const [cx,cy,cw] of clip)frameContext.fillRect(cx-2,cy-2,cw+4,5);
      frameContext.globalCompositeOperation='source-in';
      frameContext.drawImage(image,-left,-top);
      frames.push({sx:left,sy:top,w:right-left+1,h:bottom-top+1,left,top,bottom,image:frameImage});
    }
    const referenceHeight=frames.slice(0,6).map(f=>f.h).sort((a,b)=>a-b)[3];
    return [id,{image,frames,referenceHeight}];
  })).then(entries=>(sheets=Object.fromEntries(entries))).catch(error=>{loading=null;throw error;});
  return loading;
}

/** Character image is anchored by the feet; poses have independent drawn limbs and shading. */
export function drawCharacter(ctx,x,feet,height,character='peanut',state={}) {
  const name=typeof character==='string'?character:character?.id||character?.key||'peanut';
  const sheet=sheets?.[name];if(!sheet)return;
  const selected=spriteFrame(state),frame=sheet.frames[selected.row*6+selected.column];
  const scale=height/sheet.referenceHeight,action=state.action||'idle',time=Number(state.time)||0;
  let bob=state.reduced?0:Math.sin(time*2.5)*height*.007,rotation=0,squash=1,alpha=clamp(state.alpha??1);
  if(action==='hit'){const kick=1-clamp((state.actionTime||0)/.48);rotation=-.2*kick;bob-=height*.12*Math.sin(kick*Math.PI);}
  if(action==='death'){const t=clamp((state.actionTime||0)/.75);rotation=t*1.5;squash=1-t*.65;alpha*=1-t;bob+=height*t*.1;}
  if(action==='victory'&&!state.reduced){bob-=Math.max(0,Math.sin(time*7))*height*.13;rotation=Math.sin(time*5)*.06;}
  ctx.save();ctx.translate(x,feet+bob);ctx.rotate(rotation);ctx.scale(selected.flip?-1:1,squash);ctx.globalAlpha*=alpha;
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  // A cached runtime blit isolates the connected pose from neighbouring frames.
  ctx.drawImage(frame.image,-frame.w*scale/2,-frame.h*scale,frame.w*scale,frame.h*scale);
  ctx.restore();
}
