import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),sharp=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const out='client/public/assets/forest-ai';fs.mkdirSync(out,{recursive:true});const metrics={};
// Asset packing only: preserve generated RGB and alpha, locate the physical top.
for(const name of ['moss-slate','root-slate','moon-ruin']){
 const {data,info}=await sharp('docs/forest-ai-source/'+name+'.png').ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const rows=[];let left=info.width,right=0,bottom=0;
 for(let y=0;y<info.height;y++){let count=0;for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>192){count++;left=Math.min(left,x);right=Math.max(right,x);bottom=Math.max(bottom,y);}rows.push(count);}
 if(rows[0]>info.width*.95)throw Error('Expected transparent background: '+name);
 const cap=rows.findIndex(n=>n>=Math.max(...rows)*.96);let capLeft=info.width,capRight=0;
 for(let x=0;x<info.width;x++)if(data[(cap*info.width+x)*4+3]>192){capLeft=Math.min(capLeft,x);capRight=Math.max(capRight,x);}
 const width=right-left+1,height=bottom-cap+1;
 await sharp(data,{raw:info}).extract({left,top:cap,width,height}).webp({lossless:true}).toFile(out+'/'+name+'.webp');
 metrics[name]={width,height,capLeft:capLeft-left,capWidth:capRight-capLeft+1};
}
await sharp('docs/forest-ai-source/water.png').webp({quality:95}).toFile(out+'/water.webp');
await sharp('docs/forest-ai-source/background.png').webp({quality:94}).toFile(out+'/background.webp');
await sharp('docs/forest-ai-source/background.png').resize(768,512).png().toFile('client/public/assets/menu/map-previews/forest.png');
fs.writeFileSync(out+'/metrics.json',JSON.stringify(metrics,null,2));
fs.writeFileSync('client/src/game/forestArtMetrics.json',JSON.stringify(metrics,null,2));
fs.writeFileSync(out+'/CREDITS.md','# Moonveil Forest generated assets\n\nThree matching platform variations, moonlit water and a forest backdrop were created with the built-in image_gen tool. Full prompts and original PNGs are in jump-royale-source/docs/forest-ai-prompts.json and docs/forest-ai-source. The compiler crops transparent margins to the landing edge and exports WebP while preserving generated artwork and alpha.\n');
console.log(metrics);
