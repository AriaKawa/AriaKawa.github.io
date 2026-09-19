const fs=require('node:fs'),path=require('node:path');
const sharp=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..');
const source=path.join(root,'docs/expedition-content/source');
const target=path.join(root,'client/public/assets/reforged/cosmetics');
// Find transparent gutters, then pack at native 64px resolution before a
// nearest-neighbor 4x export. One scale preserves shorter crouched poses.
(async()=>{for(const id of ['pirate','astro-monkey','axolotl']){
 const {data,info}=await sharp(path.join(source,id+'.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const rows=Array(info.height).fill(0);
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>24)rows[y]++;
 const cuts=[0];
 for(let i=1;i<4;i++){
  const center=info.height*i/4,lo=Math.floor(center-110),hi=Math.ceil(center+110);let best=[0,0],start=-1;
  for(let y=lo;y<=hi;y++){if(rows[y]===0){if(start<0)start=y;}else if(start>=0){if(y-start>best[1]-best[0])best=[start,y];start=-1;}}
  if(best[1]-best[0]<2)throw Error('No clear row gutter '+id+' '+i);
  cuts.push(Math.round((best[0]+best[1])/2));
 }
 cuts.push(info.height);
 const cells=[];
 for(let frame=0;frame<16;frame++){
  const x0=Math.round((frame%4)*info.width/4),y0=cuts[Math.floor(frame/4)];
  const w=Math.round((frame%4+1)*info.width/4)-x0,h=cuts[Math.floor(frame/4)+1]-y0;
  const rgba=Buffer.alloc(w*h*4),seen=new Uint8Array(w*h),components=[];
  for(let y=0;y<h;y++)data.copy(rgba,y*w*4,((y0+y)*info.width+x0)*4,((y0+y)*info.width+x0+w)*4);
  for(let p=0;p<w*h;p++)if(!seen[p]&&rgba[p*4+3]>24){
   const points=[p];seen[p]=1;
   for(let q=0;q<points.length;q++){const a=points[q],x=a%w,y=Math.floor(a/w);for(const b of [x? a-1:-1,x<w-1?a+1:-1,y?a-w:-1,y<h-1?a+w:-1])if(b>=0&&!seen[b]&&rgba[b*4+3]>24){seen[b]=1;points.push(b);}}
   components.push(points);
  }
  const largest=Math.max(...components.map(c=>c.length)),keep=new Uint8Array(w*h);
  for(const component of components)if(component.length>=largest*.002)for(const p of component)keep[p]=1;
  let left=w,top=h,right=0,bottom=0;
  for(let p=0;p<w*h;p++){if(!keep[p]){rgba[p*4+3]=0;continue;}const x=p%w,y=Math.floor(p/w);left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x+1);bottom=Math.max(bottom,y+1);}
  if(right<=left)throw Error('Empty pose '+id+' '+frame);
  cells.push({rgba,w,h,left,top,width:right-left,height:bottom-top});
 }
 const scale=56/Math.max(...cells.map(c=>Math.max(c.width,c.height))),composite=[];
 for(let frame=0;frame<16;frame++){
  const cell=cells[frame],w=Math.round(cell.width*scale),h=Math.round(cell.height*scale);
  const input=await sharp(cell.rgba,{raw:{width:cell.w,height:cell.h,channels:4}}).extract({left:cell.left,top:cell.top,width:cell.width,height:cell.height}).resize(w,h,{kernel:'nearest'}).png({palette:true,colours:24,dither:0}).toBuffer();
  composite.push({input,left:(frame%4)*64+Math.round((64-w)/2),top:Math.floor(frame/4)*64+60-h});
 }
 const packed=await sharp({create:{width:256,height:256,channels:4,background:'#00000000'}}).composite(composite).png().toBuffer();
 await sharp(packed).resize(1024,1024,{kernel:'nearest'}).png().toFile(path.join(target,id+'-expedition-16.png'));
 console.log(id+': 16 aligned transparent poses');
}})().catch(e=>{console.error(e);process.exit(1)});
