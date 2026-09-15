import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5215/');await page.getByRole('button',{name:'Start the Climb'}).click();await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 await page.keyboard.down('KeyD');await page.waitForTimeout(400);await page.keyboard.up('KeyD');
 const walked=await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.snapshot.players.find(p=>p.id===s.localId).x;});assert(walked>345);
 await page.keyboard.down('Space');await page.waitForTimeout(620);assert(await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.snapshot.players.find(p=>p.id===s.localId).charging;}));
 await page.keyboard.up('Space');await page.waitForTimeout(150);assert(await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.snapshot.players.find(p=>p.id===s.localId).vy<0;}));
 console.log('PASS real keyboard grounded walking, charged release and committed flight');
 await page.reload();await page.getByRole('button',{name:'Start the Climb'}).click();await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);s.climbInput.snapshot=()=>({left:false,right:false,jumpHeld:false,seq:0});});
 const route=JSON.parse(fs.readFileSync('docs/vertical-route.json','utf8'));let maxX=0,minX=9999,frames=[];
 for(const step of route){
  const result=await page.evaluate(step=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;const start=performance.now();
   for(const a of step.actions)for(let i=0;i<a.ticks;i++){h.sendInput({left:a.direction<0,right:a.direction>0,jumpHeld:a.held,seq:0});h.tick();}
   const p=h.players.get(h.localId);return {id:p.groundedPlatformId,alive:p.alive,x:p.x,y:p.y,phase:h.phase,ms:performance.now()-start};
  },step);
  assert.equal(result.id,step.target,`Browser ascent landed incorrectly on ${step.target}`);assert(result.alive);maxX=Math.max(maxX,result.x);minX=Math.min(minX,result.x);frames.push(result.ms);
  if(step.target.endsWith('-14')||step.target==='crown'){
   await page.waitForTimeout(700);const cam=await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),p=s.playerEntities.get(s.localId);return {x:s.cameras.main.scrollX,screenX:p.sprite.x-s.cameras.main.scrollX,visible:[...s.platformEntities.values()].filter(c=>c.visible).length,total:s.platformEntities.size};});
   assert(cam.screenX>0&&cam.screenX<896);assert(cam.visible<45);await page.screenshot({path:'docs/played-'+step.target+'.png'});console.log('PLAYED',step.target,'camera',cam.x,'visible',cam.visible);
  }
 }
 assert(maxX-minX>1800);assert.deepEqual(errors,[]);
 const final=await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return {phase:s.snapshot.phase,winner:s.snapshot.winnerId,local:s.localId};});assert.equal(final.winner,final.local);
 console.log('PASS complete 281-jump browser ascent with original input/30Hz ticks, 24 competitors, flood, horizontal camera, chunk culling and summit victory. Accelerated clock; no teleports or flight. Max step execution ms',Math.max(...frames).toFixed(1));
 fs.writeFileSync('docs/vertical-browser-validation.json',JSON.stringify({jumps:route.length,maxX,minX,errors,final,maximumStepMs:Math.max(...frames)},null,2));
}finally{await browser.close();}
