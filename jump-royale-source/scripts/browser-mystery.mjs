import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5245');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:20,owned:[],rewards:[],spinPoints:2,freeSpins:1})));
 const checks=await p.evaluate(async()=>{
  const {LOOT_POOL}=await import('/src/game/lootCatalog.ts'),{buildLootReel,SPIN_DURATION}=await import('/src/game/lootReel.ts'),{price,buy,playableOutfit}=await import('/src/game/economy.ts'),{sanitizeOutfit,outfitTexture}=await import('/src/assets/cosmetics.ts');
  for(const winner of LOOT_POOL)for(let n=0;n<20;n++){const reel=buildLootReel(LOOT_POOL,48,winner);if(reel[40]!==winner)throw Error('Winner changed');for(let i=1;i<reel.length;i++)if(reel[i].slot===reel[i-1].slot&&reel[i].id===reel[i-1].id)throw Error('Adjacent duplicate');}
  if(price('costume','finn-16')!==5)throw Error('HD cost');if(!buy('costume','finn-16'))throw Error('HD purchase');
  const o=playableOutfit(sanitizeOutfit({character:'original',costume:'finn-16'}));if(o.costume!=='finn-16')throw Error('HD equip');
  const scene=window.__FORGE_DEV__.scene.getScene('Menu'),classic=outfitTexture(scene,sanitizeOutfit({character:'original',costume:'classic'})),hd=outfitTexture(scene,o);
  for(const key of [classic,hd])for(let i=0;i<12;i++)if(!scene.textures.getFrame(key,i))throw Error('Missing frame');
  return {SPIN_DURATION,classic,hd};
 });assert.equal(checks.SPIN_DURATION,6750);console.log(checks);
 await p.screenshot({path:'../qa-finn-menu.png'});
 await p.getByRole('button',{name:/Open loot box/}).click();
 await p.getByRole('button',{name:'Free Spins?',exact:true}).click();assert(await p.locator('#loot-free-help').isVisible());
 await p.getByRole('button',{name:'Free Spins?',exact:true}).click();assert(await p.locator('#loot-free-help').isHidden());
 await p.getByRole('button',{name:'Free Spins?',exact:true}).click();await p.locator('.loot-result').click();assert(await p.locator('#loot-free-help').isHidden());
 await p.getByRole('button',{name:'Free spin',exact:true}).click();
 assert.equal(await p.locator('.loot-reel').evaluate(e=>e.getAnimations()[0].effect.getTiming().duration),6750);
 await p.waitForFunction(()=>document.querySelector('.loot-dialog').classList.contains('loot-won'));
 const alignment=await p.evaluate(()=>{const card=document.querySelectorAll('.loot-reel .loot-card')[40].getBoundingClientRect(),pointer=document.querySelector('.loot-pointer').getBoundingClientRect();return Math.abs(card.x+card.width/2-pointer.x);});assert(alignment<2);
 await p.getByRole('button',{name:'Free Spins?',exact:true}).click();await p.screenshot({path:'../qa-loot.png'});
 await p.getByRole('button',{name:'Close loot box'}).click();
 for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:844,height:390}]){
  await p.setViewportSize(viewport);await p.waitForTimeout(350);
  await p.getByRole('button',{name:'Wallpapers',exact:true}).click();await p.waitForTimeout(350);
  const geometry=await p.evaluate(()=>{const r=s=>document.querySelector(s).getBoundingClientRect();const d=r('.wallpaper-dialog'),x=r('.wallpaper-close'),svg=r('.wallpaper-close svg'),w=r('.wallpaper-window'),m=r('.map-window');return {width:d.width,height:d.height,x:d.x,y:d.y,previewWidth:w.width,mapWidth:m.width,centerX:Math.abs(x.x+x.width/2-svg.x-svg.width/2),centerY:Math.abs(x.y+x.height/2-svg.y-svg.height/2)};});console.log(viewport,geometry);
  assert(geometry.x>=0&&geometry.y>=0&&geometry.x+geometry.width<=viewport.width+1&&geometry.y+geometry.height<=viewport.height+1);assert(geometry.centerX<1&&geometry.centerY<1);assert(Math.abs(geometry.previewWidth-geometry.mapWidth)<2);
  await p.screenshot({path:`../qa-wallpaper-${viewport.width}.png`});
  await p.getByRole('button',{name:'Next wallpaper'}).click();assert(await p.getByRole('button',{name:'Unlock in loot box',exact:true}).isDisabled());
  await p.getByRole('button',{name:'Close wallpapers'}).click();
 }
 await p.getByRole('button',{name:'Daily missions',exact:true}).click();assert(!(await p.locator('.missions-dialog').innerText()).includes('A LITTLE HIGHER'));
 assert.deepEqual(errors,[]);console.log('PASS reel uniqueness/winner/centering, 6.75-second free spin, help dismissal, Finn classic/HD frames and purchase, wallpaper sizes/close centering/locks, missions, no browser errors');
}finally{await browser.close();}
