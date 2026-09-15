import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
try {
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.goto('http://127.0.0.1:5215/');await page.getByRole('button',{name:'Start the Climb'}).click();
 await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 const result=await page.evaluate(async()=>{
  const s=window.__FORGE_DEV__.scene.getScene('Game');clearInterval(s.client.hosted.loop);s.updateEntities=()=>{};
  const regions=['foothills','village','aqueduct','mine','castle','windmill','clouds','frozen','celestial','summit'],checked=[];
  for(const name of regions){
   const p=s.minimapPlatforms.find(p=>p.id===(name==='summit'?'crown':name+'-14'));
   s.cameras.main.scrollY=p.y-250;await new Promise(r=>setTimeout(r,60));
   const active=s.children.list.filter(c=>c.visible&&c.alpha>.5&&c.texture?.key.endsWith('/background')).map(c=>c.texture.key);
   const variants=Array.from({length:4},(_,i)=>s.textures.exists('ascent-ai-'+name+'/platform-'+i));checked.push({name,active,variants});
  }
  return checked;
 });
 for(const {name,active,variants} of result){assert.deepEqual(active,['ascent-ai-'+name+'/background']);assert(variants.every(Boolean));}
 assert.deepEqual(errors,[]);console.log('PASS all ten camera regions display their matching AI panorama, all forty platform variants load, zero request/runtime errors.');
}finally{await browser.close();}
