import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const url=process.env.GAME_URL??'http://127.0.0.1:5244/forge-climb-royale/';
const b=await chromium.launch({headless:true,channel:'msedge'});
try {
 const p=await b.newPage({viewport:{width:1440,height:900}}),errors=[],missing=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().includes('/forge-climb-royale/'))missing.push(r.status()+' '+r.url());});
 await p.goto(url);await p.waitForSelector('.map-caption h2');
 for(const file of ['assets/forest-ai/lantern.webp','assets/forest-ai/bucket.webp','assets/jump-royale-ai/props/slope.webp']){const response=await p.request.get(new URL(file,url).href);assert.equal(response.status(),200,file);assert((await response.body()).length>1000);}
 await p.getByRole('button',{name:'Open settings',exact:true}).click();const slider=p.getByRole('slider',{name:'Enemy opacity',exact:true});assert.equal(await slider.getAttribute('min'),'10');assert.equal(await slider.inputValue(),'25');await slider.fill('10');await p.keyboard.press('Escape');
 for(const [name,heading] of [['Frostpeak Summit','Slippery when frozen!'],['Moonveil Forest','Solid Terrain'],['The Long Mountain','Keep your footing!']]){
  for(let i=0;i<8&&await p.locator('.map-caption h2').textContent()!==name;i++)await p.getByRole('button',{name:'Next map',exact:true}).click();
  assert.equal(await p.locator('.map-caption h2').textContent(),name);await p.getByRole('textbox',{name:'Name',exact:true}).fill('Release check');await p.getByRole('button',{name:'Start',exact:true}).click();
  await p.waitForSelector('.solid-terrain-notice:not([hidden])');assert.equal(await p.locator('.solid-terrain-notice h2').textContent(),heading);
  assert.match(await p.locator('.solid-terrain-notice').evaluate(el=>getComputedStyle(el).borderImageSource),/forge-climb-royale\/assets\/menu\/forged-command\/frame/);console.log(name,heading);
  await p.reload();await p.waitForSelector('.map-caption h2');
 }
 await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:[],rewards:[],freeSpins:5,spinPoints:0})));
 await p.getByRole('button',{name:/Open loot box/}).click();await p.locator('.loot-free').click();await p.waitForFunction(()=>document.getAnimations().some(a=>a.effect?.target?.classList.contains('loot-reel')));
 const duration=await p.evaluate(()=>{const a=document.getAnimations().find(a=>a.effect?.target?.classList.contains('loot-reel'));const duration=a.effect.getTiming().duration;a.finish();return duration;});assert([7171.875,8437.5,10968.75].includes(duration));
 await p.waitForSelector('.loot-reveal[open]');assert.match(await p.locator('.loot-reveal').evaluate(el=>getComputedStyle(el).borderImageSource),/forge-climb-royale\/assets\/menu\/forged-command\/frame/);await p.mouse.click(3,3);assert(await p.locator('#loot-dialog').isVisible());
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log('PASS published assets, map launch, opacity, framed tutorial/reward and spin timing at',url);
} finally {await b.close();}
