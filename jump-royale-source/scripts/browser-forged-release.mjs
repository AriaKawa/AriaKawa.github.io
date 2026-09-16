import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[],base=process.env.FORGE_TEST_URL||'http://127.0.0.1:5209/';
try {
 const page=await browser.newPage({viewport:{width:1600,height:900}});
 // Test-only browser profile; never modifies a user's wallet or deployment defaults.
 await page.addInitScript(()=>{
   localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:97,owned:['character:demon'],rewards:[],spinPoints:0,freeSpins:1}));
   localStorage.setItem('forge-outfit-v1',JSON.stringify({character:'demon',hair:'original',helmet:'none',shirt:'original',pants:'original'}));
 });
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.goto(base);
 await page.locator('.forged-command').waitFor();
 await page.getByRole('textbox',{name:'Name'}).fill('Ashen Anvil');
 await page.getByRole('textbox',{name:'Name'}).blur();
 assert.equal(await page.locator('.map-track canvas').count(),0);
 assert.equal(await page.locator('.map-track img').count(),4);
 await page.waitForFunction(()=>Array.from(document.querySelectorAll('.map-track img,.forge-logo,.forge-helmet')).every(i=>i.complete&&i.naturalWidth>0));
 for(const [id,name] of [['mountain','The Long Mountain'],['forge','The Crown Forge'],['jungle','Verdant Canopy'],['snow','Frostpeak Summit']]) {
   assert.equal((await page.locator('.map-caption').innerText()).trim(),name);
   await page.waitForTimeout(400);
   await page.screenshot({path:`docs/forged-release-${id}.png`});
   await page.getByRole('button',{name:'Next map',exact:true}).click();
 }
 await page.getByRole('button',{name:'Scores',exact:true}).click();assert(await page.locator('.scores-popover').isVisible());
 await page.getByRole('button',{name:'Scores',exact:true}).click();
 await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();
 assert(await page.getByRole('tab',{name:'Hairstyles',exact:true}).isVisible());
 await page.getByRole('tab',{name:'Character',exact:true}).click();
 const locked=page.locator('.equipment-card[data-owned=false]').first();
 assert.equal(await locked.locator('span').innerText(),'?');
 assert.equal(await locked.getAttribute('aria-label'),'Locked item');
 assert.equal(await locked.locator('canvas').evaluate(e=>getComputedStyle(e).filter),'brightness(0)');
 await page.waitForTimeout(250);
 const preview=page.locator('.wardrobe-stage canvas');
 assert(await preview.isVisible());
 const outfitBefore=await page.locator('.wardrobe-stage').getAttribute('data-outfit');
 await page.getByRole('button',{name:'Finn',exact:true}).hover();
 assert.notEqual(await page.locator('.wardrobe-stage').getAttribute('data-outfit'),outfitBefore);
 await page.locator('.wardrobe-panel header').hover();
 assert.equal(await page.locator('.wardrobe-stage').getAttribute('data-outfit'),outfitBefore);
 await locked.hover();
 assert.equal(await page.locator('.wardrobe-stage').getAttribute('data-outfit'),outfitBefore);
 await page.locator('.wardrobe-panel header').hover();
 await page.screenshot({path:'docs/forged-release-wardrobe.png'});
 await page.getByRole('tab',{name:'Hairstyles',exact:true}).click();
 assert.equal(await page.locator('.equipment-card[data-owned=false]').first().locator('span').innerText(),'?');
 await page.screenshot({path:'docs/forged-release-hair.png'});
 await page.keyboard.press('Escape');assert(!(await page.locator('.wardrobe-overlay').isVisible()));
 const loot=page.getByRole('button',{name:/^Open loot box/});
 assert.equal(await loot.getAttribute('data-free-spins'),'1');
 await loot.click();
 await page.locator('#loot-dialog').getByRole('button',{name:'Buy gold',exact:true}).click();
 assert(await page.locator('#gold-store').isVisible());await page.keyboard.press('Escape');
 assert(await page.locator('#loot-dialog').isVisible());
 await page.locator('.loot-free').click();
 await page.waitForFunction(()=>!document.querySelector('.loot-buy').disabled);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('jump-royale-wallet-v1')).freeSpins),0);
 assert.equal(await loot.getAttribute('data-free-spins'),'0');
 await page.getByRole('button',{name:'Close loot box',exact:true}).click();
 await page.locator('.forge-resources .gold-add').click();assert(await page.locator('#gold-store').isVisible());await page.keyboard.press('Escape');
 await page.locator('.settings-cog').click();assert(await page.locator('.game-settings').isVisible());await page.screenshot({path:'docs/forged-release-settings.png'});await page.keyboard.press('Escape');
 await page.getByRole('button',{name:/^start$/i}).click();
 await page.locator('.forged-command').waitFor({state:'detached'});
 await page.waitForTimeout(1500);
 await page.keyboard.down('Space');await page.waitForTimeout(400);await page.keyboard.up('Space');
 await page.screenshot({path:'docs/forged-release-game.png'});
 await page.keyboard.press('Escape');await page.getByRole('button',{name:'Return to main menu',exact:true}).click();
 await page.locator('.forged-command').waitFor();
 assert.equal(await page.getByRole('textbox',{name:'Name'}).inputValue(),'Ashen Anvil');
 assert.equal(await page.locator('.forged-command').count(),1);
 for(const [width,height] of [[1280,720],[900,600],[390,844]]) {
   await page.setViewportSize({width,height});await page.waitForTimeout(400);
   const play=await page.getByRole('button',{name:/^start$/i}).boundingBox();
   assert(play&&play.x>=0&&play.y>=0&&play.x+play.width<=width&&play.y+play.height<=height,`Play button outside ${width}x${height}`);
   await page.screenshot({path:`docs/forged-release-${width}.png`});
 }
 assert.deepEqual(errors,[]);
 console.log('PASS four scenery-only carousel images, current wardrobe, scores, live loot spin/badge/wallet, nested gold modal, settings, gameplay entry/return, responsive menu, no page or HTTP errors. '+base);
} finally {await browser.close();}
