import {createRequire} from 'node:module';
import {copyFile,mkdir} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const sharp=require(process.env.SHARP_PATH||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const generated='C:/Users/Swagg/.codex/generated_images/01a0aa2d-9983-7912-96c0-553c5612267b/';
const sources={"magical-girl-16":"exec-e620c259-aede-479f-b1c3-3f413748f6f5.png","magical-girl-buns-16":"exec-9dfcb343-bee8-4367-8290-75f3805cb0e1.png"};
await mkdir('docs/art-source',{recursive:true});
const strips=[];
for(const [id,file] of Object.entries(sources)){
 const source=`docs/art-source/${id}-source.png`;
 try{await copyFile(generated+file,source);}catch(error){if(error.code!=='ENOENT')throw error;}
 const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 // Preserve real alpha; discard only nearly transparent edge noise.
 for(let i=3;i<data.length;i+=4)if(data[i]<100)data[i]=0;
 // Generated poses can cross the nominal grid. Connected components isolate
 // complete silhouettes without cropping feet or borrowing neighboring pixels.
 const seen=new Uint8Array(info.width*info.height),cells=[];
 for(let i=0;i<seen.length;i++){
  if(seen[i]||data[i*4+3]<180)continue;
  seen[i]=1;const pixels=[i];let left=info.width,top=info.height,right=0,bottom=0;
  for(let j=0;j<pixels.length;j++){
   const n=pixels[j],x=n%info.width,y=Math.floor(n/info.width);
   left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);
   for(const m of [x?n-1:-1,x<info.width-1?n+1:-1,n-info.width,n+info.width])if(m>=0&&m<seen.length&&!seen[m]&&data[m*4+3]>=180){seen[m]=1;pixels.push(m);}
  }
  if(pixels.length<500)continue;
  const width=right-left+1,height=bottom-top+1,rgba=Buffer.alloc(width*height*4);
  for(const n of pixels)data.copy(rgba,((Math.floor(n/info.width)-top)*width+n%info.width-left)*4,n*4,n*4+4);
  cells.push({left,top,width,height,input:await sharp(rgba,{raw:{width,height,channels:4}}).png().toBuffer()});
 }
 if(cells.length!==12)throw Error(`${id}: expected 12 connected poses, found ${cells.length}`);
 cells.sort((a,b)=>Math.floor((a.top+a.height/2)/info.height*3)-Math.floor((b.top+b.height/2)/info.height*3)||a.left-b.left);
 // One scale per sheet preserves crouch height and limb lengths across poses.
 const scale=56/Math.max(...cells.map(c=>Math.max(c.width,c.height))),frames=[];
 for(const [f,c] of cells.entries()){
  const w=Math.round(c.width*scale),h=Math.round(c.height*scale);
  frames.push({input:await sharp(c.input).resize(w,h,{kernel:'nearest'}).png().toBuffer(),left:f*64+Math.floor((64-w)/2),top:62-h});
 }
 const out=`client/public/assets/reforged/cosmetics/${id}.png`;
 await sharp({create:{width:768,height:64,channels:4,background:'#00000000'}}).composite(frames).png().toFile(out);
 strips.push({input:await sharp(out).resize(1536,128,{kernel:'nearest'}).png().toBuffer(),left:0,top:(strips.length)*144});
 console.log(`Compiled ${id}: 12 poses, 64px foot-aligned frames`);
}
await sharp({create:{width:1536,height:288,channels:4,background:'#304958'}}).composite(strips).png().toFile('docs/stella-16-frames.png');
