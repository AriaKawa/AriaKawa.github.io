const fs=require('node:fs'),path=require('node:path');
const sharp=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..');
const source=path.join(root,'docs/expedition-content/source');
const target=path.join(root,'client/public/assets/reforged/cosmetics');
// Pack generated 4x4 pose sheets into aligned 256px frames. One scale per
// character preserves crouch heights; component filtering removes alpha dust.
(async()=>{for(const id of ['pirate','astro-monkey','axolotl']){
 const {data,info}=await sharp(path.join(source,id+'.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const cells=[];
 for(let frame=0;frame<16;frame++){
  const x0=Math.round((frame%4)*info.width/4),y0=Math.round(Math.floor(frame/4)*info.height/4);
  const w=Math.round((frame%4+1)*info.width/4)-x0,h=Math.round((Math.floor(frame/4)+1)*info.height/4)-y0;
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
 const scale=224/Math.max(...cells.map(c=>Math.max(c.width,c.height))),composite=[];
 for(let frame=0;frame<16;frame++){
  const cell=cells[frame],w=Math.round(cell.width*scale),h=Math.round(cell.height*scale);
  const input=await sharp(cell.rgba,{raw:{width:cell.w,height:cell.h,channels:4}}).extract({left:cell.left,top:cell.top,width:cell.width,height:cell.height}).resize(w,h).png().toBuffer();
  composite.push({input,left:(frame%4)*256+Math.round((256-w)/2),top:Math.floor(frame/4)*256+240-h});
 }
 await sharp({create:{width:1024,height:1024,channels:4,background:'#00000000'}}).composite(composite).png().toFile(path.join(target,id+'-expedition.png'));
 console.log(id+': 16 aligned transparent poses');
}})().catch(e=>{console.error(e);process.exit(1)});
