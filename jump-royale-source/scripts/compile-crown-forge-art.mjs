import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),sharp=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const src='docs/crown-forge-source/',out='client/public/assets/crown-forge/';fs.mkdirSync(out,{recursive:true});
async function crop(name,slab=false){
 const {data,info}=await sharp(src+name+'.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let left=info.width,right=0,top=info.height,bottom=0;const rows=[];
 for(let y=0;y<info.height;y++){let count=0;for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>192){count++;left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}rows.push(count);}
 if(slab)top=rows.findIndex(n=>n>=Math.max(...rows)*.96);
 return sharp(data,{raw:info}).extract({left,top,width:right-left+1,height:bottom-top+1});
}
for(const n of ['stone','moving','rest'])await (await crop(n,true)).resize(512,112,{fit:'fill'}).webp({quality:95}).toFile(out+n+'.webp');
await sharp(src+'background.png').resize(1024,1536).webp({quality:90}).toFile(out+'background.webp');
await sharp(src+'background.png').resize(768,512,{fit:'cover'}).png().toFile('client/public/assets/menu/map-previews/forge.png');
await sharp(src+'wall.png').resize(128,128).webp({quality:94}).toFile(out+'wall.webp');
await sharp(src+'wall.png').resize(32,128,{fit:'cover'}).webp({quality:94}).toFile(out+'trim.webp');
await (await crop('chain')).resize(16,256,{fit:'fill'}).webp({quality:95}).toFile(out+'chain.webp');
await (await crop('vent')).resize(56,56,{fit:'contain',background:'#00000000'}).webp({quality:95}).toFile(out+'vent.webp');
const lava=await sharp(src+'lava.png').metadata();
await sharp(src+'lava.png').extract({left:0,top:65,width:lava.width,height:100}).resize(640,24,{fit:'fill'}).webp({quality:95}).toFile(out+'lava-surface.webp');
await sharp(src+'lava.png').extract({left:0,top:165,width:lava.width,height:lava.height-165}).resize(640,400).webp({quality:94}).toFile(out+'lava-body.webp');
for(const [n,w,h] of [['hook',28,58],['anvil',52,34],['spark',8,8],['dust',16,12]])if(fs.existsSync(src+n+'.png'))await (await crop(n)).resize(w,h,{fit:'contain',background:'#00000000'}).webp({quality:95}).toFile(out+n+'.webp');
console.log('Packed Crown Forge generated assets.');
