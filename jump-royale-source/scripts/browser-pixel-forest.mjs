import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
fs.mkdirSync('docs/expedition-content/qa',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 p.on('response',r=>{if(r.status()>=400&&!r.url().includes('firebase'))errors.push(r.status()+' '+r.url());});
 await p.goto('http://127.0.0.1:5277');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 const sizes=await p.evaluate(async()=>{
  const {outfitTexture,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');
  const {spriteScale,spriteBounds,drawOutfitPreview}=await import('/src/game/spriteSizing.ts');
  const s=window.__FORGE_DEV__.scene.getScene('Menu');
  const panel=document.createElement('div');panel.id='pixel-qa';panel.style.cssText='position:fixed;inset:80px;background:#142127;z-index:99999;display:flex;align-items:center;justify-content:center;gap:16px;color:white;font:20px monospace';document.body.append(panel);
  const results={};
  for(const id of ['rat','axolotl','astro-monkey','pirate']){
   const key=outfitTexture(s,sanitizeOutfit({character:id,costume:id==='rat'?'rat-16':'classic'}));
   const bounds=spriteBounds(s,key);results[id]=bounds.bodyHeight*spriteScale(s,key,28);
   const tile=document.createElement('div'),label=document.createElement('div'),canvas=document.createElement('canvas');
   canvas.width=200;canvas.height=240;label.textContent=id;tile.append(canvas,label);panel.append(tile);drawOutfitPreview(s,canvas,key);
   if(id!=='rat'){
    if(s.textures.get(key).source[0].scaleMode!==1)throw Error('Non-nearest filter '+key);
    for(let f=0;f<16;f++)if(s.textures.getFrame(key,f).width!==256)throw Error('Missing animation frame');
    for(const a of ['idle','charge-start','charge-loop','jump','fall','land','walk','eliminated','victory'])if(!s.anims.exists(key+'-'+a))throw Error('Missing animation '+a);
   }
  }
  return results;
 });
 assert.equal(sizes.axolotl,sizes.rat);assert.equal(sizes.pirate,28);
 await p.screenshot({path:'docs/expedition-content/qa/pixel-lineup.png'});
 await p.evaluate(()=>{document.querySelector('#pixel-qa').remove();const g=window.__FORGE_DEV__;g.registry.set('mapId','forest');g.scene.getScene('Menu').scene.restart();});
 await p.getByRole('button',{name:'Start',exact:true}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 const roofs=await p.evaluate(()=>{
  const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);
  const roofs=h.platforms.filter(p=>p.ceiling);
  for(const roof of roofs){const art=s.platformEntities.get(roof.id).list.find(o=>o.texture);if(Math.abs(art.angle)!==180)throw Error('Roof not inverted');}
  const me=h.players.get(h.localId),roof=roofs[0];me.x=roof.x;me.y=roof.y+roof.h+80;me.vx=0;me.vy=0;h.tick();return roofs.length;
 });assert.equal(roofs,10);
 await p.waitForTimeout(900);await p.screenshot({path:'docs/expedition-content/qa/forest-overhead.png'});
 await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted,me=h.players.get(h.localId),pit=h.platforms.find(p=>p.bucket);me.x=pit.x+pit.w/2;me.y=pit.y-50;h.tick();});
 await p.waitForTimeout(900);await p.screenshot({path:'docs/expedition-content/qa/forest-hole.png'});
 assert.deepEqual(errors,[]);console.log('PASS',JSON.stringify({sizes,roofs,frames:48,animations:27,errors}));
}finally{await browser.close();}

