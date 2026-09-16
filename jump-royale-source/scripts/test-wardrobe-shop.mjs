import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',ignoreDefaultArgs:['--hide-scrollbars']}),url=process.env.TEST_URL||'http://127.0.0.1:5238/';
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.goto(url);await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 await page.evaluate(()=>{localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:30,owned:['character:demon','hair:buns','character:cerberus'],rewards:[],spinPoints:2,freeSpins:3}));localStorage.setItem('forge-outfit-v1',JSON.stringify({character:'demon',hair:'buns',costume:'classic',helmet:'none',shirt:'original',pants:'original'}));});
 await page.goto(url.split('#')[0]+'#lock=wardrobe-20260916-8d43');await page.reload();
 await page.getByText('Cosmetics locked.',{exact:false}).waitFor();
 const w=await page.evaluate(()=>JSON.parse(localStorage.getItem('jump-royale-wallet-v1')));assert.deepEqual(w.owned,[]);assert.equal(w.gold,30);assert.equal(w.freeSpins,3);
 await page.getByRole('button',{name:'Dismiss',exact:true}).click();await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Character',exact:true}).click();
 assert.equal(await page.locator('.wardrobe-overlay [data-owned=false]').count(),10);
 assert.equal(await page.locator('.wardrobe-gold-balance').textContent(),'30');
 const grid=page.locator('.wardrobe-overlay .equipment-grid');
 const metrics=await grid.evaluate(e=>({scroll:e.scrollHeight,height:e.clientHeight,width:e.clientWidth,fullWidth:e.scrollWidth,overflow:getComputedStyle(e).overflowY}));assert(metrics.scroll>metrics.height);assert.equal(metrics.overflow,'scroll');assert(metrics.fullWidth<=metrics.width);
 const bounds=await grid.boundingBox();await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.mouse.wheel(0,1000);await page.waitForFunction(()=>document.querySelector('.equipment-grid').scrollTop>0);
 const bottom=await grid.evaluate(e=>e.scrollTop);assert(bottom>0);
 // Drag the visible right-hand thumb back toward the top.
 const thumb=await grid.evaluate(e=>{const r=e.getBoundingClientRect(),track=e.clientHeight-32,h=Math.max(40,track*e.clientHeight/e.scrollHeight);return {x:r.right-8,y:r.top+16+(track-h)*e.scrollTop/(e.scrollHeight-e.clientHeight)+h/2,top:r.top+18};});
 await page.mouse.move(thumb.x,thumb.y);await page.mouse.down();await page.mouse.move(thumb.x,thumb.top,{steps:12});await page.mouse.up();
 assert(await grid.evaluate(e=>e.scrollTop)<bottom,'Scrollbar dragging works');
 const neet=page.locator('[data-piece=neet]');await neet.scrollIntoViewIfNeeded();assert.equal(await neet.locator('.equipment-price b').textContent(),'5');assert.equal(await neet.locator('.equipment-price img').getAttribute('alt'),'Gold');await neet.click();
 assert.equal(await page.locator('.wardrobe-gold-balance').textContent(),'25');assert.equal(await neet.getAttribute('aria-pressed'),'true');assert.match(await neet.textContent(),/Equipped/);
 await neet.click();assert.equal(await page.locator('.wardrobe-gold-balance').textContent(),'25','No repeated charge');
 await page.screenshot({path:'docs/wardrobe-shop-desktop.png'});
 await page.locator('[data-piece=kangaroo]').click();assert.equal(await page.locator('.wardrobe-gold-balance').textContent(),'20');
 await page.locator('[data-piece=magical-girl]').click();await page.getByRole('tab',{name:'Hairstyles',exact:true}).click();
 const hair=page.locator('[data-piece=star-buns]');assert.equal(await hair.locator('.equipment-price b').textContent(),'3');await hair.click();assert.equal(await page.locator('.wardrobe-gold-balance').textContent(),'12');
 await page.getByRole('tab',{name:'Character',exact:true}).click();await page.locator('[data-piece=original]').click();await page.getByRole('tab',{name:'Costumes',exact:true}).click();assert.equal(await page.locator('[data-piece=steel] .equipment-price b').textContent(),'9');
 await page.evaluate(()=>{const w=JSON.parse(localStorage.getItem('jump-royale-wallet-v1'));w.gold=0;localStorage.setItem('jump-royale-wallet-v1',JSON.stringify(w));});await page.locator('[data-piece=steel]').click();assert.match(await page.locator('.purchase-bar').textContent(),/Not enough gold/);
 await page.getByRole('tab',{name:'Character',exact:true}).click();await page.setViewportSize({width:390,height:844});await grid.hover();await page.mouse.wheel(0,1200);await page.waitForFunction(()=>document.querySelector('.equipment-grid').scrollTop>0);await page.screenshot({path:'docs/wardrobe-shop-mobile.png'});
 const panel=await page.locator('.wardrobe-panel').boundingBox();assert(panel.y>=0&&panel.y+panel.height<=844);assert(await grid.evaluate(e=>e.scrollWidth<=e.clientWidth));
 if(!process.env.TEST_URL){
  const frames=await page.evaluate(async()=>{const {outfitTexture,DEFAULT_OUTFIT}=await import('/src/assets/cosmetics.ts');const scene=window.__FORGE_DEV__.scene.getScene('Menu');let frames=0;for(const character of ['neet','kangaroo']){const key=outfitTexture(scene,{...DEFAULT_OUTFIT,character});const image=scene.textures.get(key).getSourceImage(),canvas=document.createElement('canvas');canvas.width=384;canvas.height=32;const c=canvas.getContext('2d');c.drawImage(image,0,0);const poses=new Set();for(let f=0;f<12;f++){const pixels=c.getImageData(f*32,0,32,32).data;if(!pixels.some((v,i)=>i%4===3&&v))throw Error('Empty pose');poses.add(pixels.join(','));frames++;}if(poses.size!==12)throw Error('Duplicate poses');for(const name of ['idle','charge-start','charge-loop','jump','fall','land','eliminated','walk'])if(!scene.anims.get(key+'-'+name)?.frames.length)throw Error('Missing animation '+name);}return frames;});assert.equal(frames,24);
 }
 if(!process.env.TEST_URL){
  await page.setViewportSize({width:1440,height:900});
  for(const id of ['neet','kangaroo']){
   await page.locator(`[data-piece=${id}]`).click();await page.getByRole('button',{name:'Close wardrobe',exact:true}).click();
   await page.evaluate(()=>window.__FORGE_DEV__.canvas.focus());
   await page.keyboard.down('KeyD');await page.waitForTimeout(120);
   assert.equal(await page.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key),'fantasy-'+id+'-walk');await page.keyboard.up('KeyD');
   await page.keyboard.down('Space');await page.waitForTimeout(300);
   assert.match(await page.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key),/charge/);
   await page.keyboard.up('Space');await page.waitForTimeout(70);assert.equal(await page.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').preview.anims.currentAnim.key),'fantasy-'+id+'-jump');
   await page.getByRole('button',{name:'Start',exact:true}).click();
   await page.waitForFunction(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities?.get(s.localId);});
   const texture=await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities.get(s.localId).sprite.texture.key;});assert.equal(texture,'fantasy-'+id);
   await page.screenshot({path:`docs/${id}-gameplay.png`});
   await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Character',exact:true}).click();
  }
 }
 assert.deepEqual(errors,[]);console.log('PASS '+url+': owner-only reset preserving gold/spins, 10 locked items, gold prices/balance, wheel and scrollbar dragging, character and hair purchases, no double charge, insufficient funds, mobile layout, new poses and gameplay.');
}finally{await browser.close();}
