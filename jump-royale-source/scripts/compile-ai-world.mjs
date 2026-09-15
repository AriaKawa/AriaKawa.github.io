import fs from 'node:fs';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),sharp=require(process.env.SHARP_PATH||'C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const regions=['foothills','village','aqueduct','mine','castle','windmill','clouds','frozen','celestial','summit'];
const out='client/public/assets/jump-royale-ai';fs.mkdirSync(out,{recursive:true});const metrics={};
// Atlas extraction only: retain generated RGB/alpha and record the actual cap.
// Nothing is drawn, keyed, repainted, or substituted with vector assets.
async function extract(input,box,file,platform=false){
 const {data,info}=await sharp(input).extract(box).ensureAlpha().raw().toBuffer({resolveWithObject:true});let minX=info.width,minY=info.height,maxX=0,maxY=0;const counts=[];
 for(let y=0;y<info.height;y++){let count=0;for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>32){count++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}counts.push(count);}
 if(maxX<=minX||maxY<=minY)throw Error('Empty generated cell: '+file);
 const cap=counts.findIndex(n=>n>=Math.max(...counts)*.82);let capLeft=info.width,capRight=0;
 for(let x=0;x<info.width;x++)if(data[(cap*info.width+x)*4+3]>192){capLeft=Math.min(capLeft,x);capRight=Math.max(capRight,x);}
 if(platform)minY=cap; // Isolate the flat playable cap; exclude atlas spill and decorative protrusions.
 const width=maxX-minX+1,height=maxY-minY+1;
 await sharp(data,{raw:info}).extract({left:minX,top:minY,width,height}).webp({lossless:true}).toFile(out+'/'+file+'.webp');
 if(platform)metrics[file]={width,height,capLeft:capLeft-minX,capY:cap-minY,capWidth:capRight-capLeft+1};
 console.log(file,width,height,platform?'cap '+metrics[file].capY:'');
}
for(const key of regions){const input='docs/ai-source/'+key+'.png',m=await sharp(input).metadata();if(m.width!==1536||m.height!==1024||!m.hasAlpha)throw Error('Unexpected atlas '+key);fs.mkdirSync(out+'/'+key,{recursive:true});
 await sharp(input).extract({left:0,top:0,width:1536,height:512}).removeAlpha().webp({quality:87}).toFile(out+'/'+key+'/background.webp');
 for(let i=0;i<4;i++)await extract(input,{left:(i%2)*768,top:512+Math.floor(i/2)*256,width:768,height:256},key+'/platform-'+i,true);
}
fs.mkdirSync(out+'/props',{recursive:true});for(const [i,name] of ['bell','sigil','rotor','wind','cloud','water'].entries())await extract('docs/ai-source/props.png',{left:(i%3)*512,top:Math.floor(i/3)*512,width:512,height:512},'props/'+name);
fs.writeFileSync(out+'/metrics.json',JSON.stringify(metrics,null,2));
fs.writeFileSync(out+'/ASSET_CREDITS.md','# AI-generated Long Mountain environment\n\nAll ten regional backgrounds, forty platform variants and six props were generated with the built-in image_gen tool on 2026-09-15, using the foothills atlas as a style reference. Original prompts and unmodified alpha-bearing PNG atlases are retained in jump-royale-source/docs/ai-art-prompts.json and docs/ai-source/. The compiler only extracts atlas cells, preserves alpha and exports WebP. No SVG or programmatically illustrated scenery is used by this map renderer. Existing characters, UI and other maps retain their existing assets.\n');
