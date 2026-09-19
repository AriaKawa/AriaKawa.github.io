import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
fs.mkdirSync('output',{recursive:true});
try {
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>localStorage.setItem('jump-royale-settings-v1',JSON.stringify({enemyOpacity:0})));
 await p.goto(process.env.GAME_URL??'http://127.0.0.1:5245');
 await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 await p.getByRole('button',{name:'Open settings',exact:true}).click();
 const slider=p.getByRole('slider',{name:'Enemy opacity',exact:true});assert.equal(await slider.inputValue(),'10');assert.equal(await slider.getAttribute('min'),'10');await p.keyboard.press('Escape');
 const roster=await p.evaluate(async()=>{const {botOutfit}=await import('/src/assets/cosmetics.ts');const counts={};for(let i=0;i<1000;i++){const c=botOutfit('audit-'+i).character;counts[c]=(counts[c]??0)+1;}return counts;});
 assert(roster.original>880&&roster.original<960,JSON.stringify(roster));console.log('Roster',roster);
 for(const map of ['forest','mountain','snow','magical','jungle','forge']){
  await p.evaluate(map=>window.__FORGE_DEV__.scene.getScene('Menu').scene.start('Game',{name:'Terrain audit',mapId:map}),map);
  await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.players.length>0);
  const audit=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');const names=new Set([...s.playerEntities.values()].map(e=>e.name));return {words:s.children.list.filter(o=>o.type==='Text'&&o.depth<90&&!names.has(o)&&/[a-z]/i.test(o.text)).map(o=>o.text),notice:!document.querySelector('.solid-terrain-notice').hidden};});
  assert.deepEqual(audit.words,[],map+' world labels');
  if(map!=='forge'){
   assert(audit.notice,map+' tutorial');const size=await p.locator('.solid-terrain-notice').evaluate(el=>({width:el.offsetWidth,height:el.offsetHeight,border:getComputedStyle(el).borderImageSource}));assert(size.width>=680&&size.height>=220);assert.match(size.border,/frame/);
   await p.screenshot({path:'output/tutorial-'+map+'.png'});
  }
  if(map==='forest'||map==='mountain'){
   const art=await p.evaluate(map=>{const s=window.__FORGE_DEV__.scene.getScene('Game');clearInterval(s.client.hosted.loop);s.snapshot.phase='playing';document.querySelector('.solid-terrain-notice').style.display='none';const target=s.minimapPlatforms.find(x=>map==='forest'?x.bucket:x.slope),local=s.snapshot.players.find(x=>x.id===s.localId),e=s.playerEntities.get(s.localId);Object.assign(local,{x:target.x+100,y:target.y+(target.slope?(1-107/target.w)*target.h:0)-20,grounded:true,groundedPlatformId:target.id});e.targetX=local.x;e.targetY=local.y;e.sprite.setPosition(local.x+7,local.y+20);s.lavaSurface?.setVisible(false);s.lavaBody?.setVisible(false);s.flood?.setVisible(false);return {target,texture:s.platformEntities.get(target.id).list[0].texture.key};},map);
   assert.match(art.texture,map==='forest'?/bucket/:/slope/);await p.waitForTimeout(800);await p.screenshot({path:'output/terrain-'+map+'.png'});
  }
  await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Game').scene.start('Menu'));
  await p.waitForFunction(()=>window.__FORGE_DEV__.scene.isActive('Menu'));
 }
 await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:[],rewards:[],freeSpins:10,spinPoints:0})));
 await p.getByRole('button',{name:/Open loot box/}).click();assert.equal(await p.locator('.loot-grid .loot-card').count(),0);
 await p.locator('.loot-free').click();await p.waitForFunction(()=>document.getAnimations().some(a=>a.effect?.target?.classList.contains('loot-reel')));
 const motion=await p.evaluate(()=>{const a=document.getAnimations().find(a=>a.effect?.target?.classList.contains('loot-reel'));return {duration:a.effect.getTiming().duration,keyframes:a.effect.getKeyframes(),filter:getComputedStyle(document.querySelector('.loot-reel canvas')).filter};});
 assert([7171.875,8437.5,10968.75].includes(motion.duration));assert.equal(motion.filter,'none');assert(motion.keyframes.every(k=>k.transform.startsWith('translate3d')));
 await p.waitForTimeout(1000);await p.screenshot({path:'output/loot-smooth-spin.png'});
 await p.evaluate(()=>document.getAnimations().filter(a=>a.effect?.target?.classList.contains('loot-reel')).forEach(a=>a.finish()));await p.waitForSelector('.loot-reveal[open]');
 const frame=await p.locator('.loot-reveal').evaluate(el=>({border:getComputedStyle(el).borderImageSource,hue:getComputedStyle(el,'::before').backgroundImage}));assert.match(frame.border,/frame/);assert.match(frame.hue,/radial-gradient/);
 await p.screenshot({path:'output/reward-framed.png'});await p.mouse.click(3,3);assert(await p.locator('#loot-dialog').isVisible());
 await p.locator('.loot-contents summary').click();await p.waitForFunction(()=>document.querySelectorAll('.loot-grid .loot-card').length>20);await p.keyboard.press('Escape');
 for(const viewport of [{width:390,height:844},{width:844,height:390}]){
  await p.setViewportSize(viewport);await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').scene.start('Game',{name:'Mobile',mapId:'snow'}));await p.waitForSelector('.solid-terrain-notice:not([hidden])');
  assert(await p.locator('.solid-terrain-notice').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight;}));await p.screenshot({path:'output/tutorial-mobile-'+viewport.width+'.png'});await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Game').scene.start('Menu'));await p.waitForFunction(()=>window.__FORGE_DEV__.scene.isActive('Menu'));
 }
 assert.deepEqual(errors,[]);console.log('PASS opacity migration, mostly knight bots, no world words, framed tutorials on all mechanic maps, terrain art, cached/lazy loot UI, GPU spin and rarity reveal, mobile layout.');
} finally {await browser.close();}
