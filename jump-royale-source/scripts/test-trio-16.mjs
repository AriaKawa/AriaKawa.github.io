import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:5238/');await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 if(process.env.EXPECT_BUNDLE)assert((await page.locator('script[type=module]').getAttribute('src')).includes(process.env.EXPECT_BUNDLE));
 await page.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:[],rewards:[],freeSpins:0,spinPoints:0})));
 await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();
 for(const [character,name] of [['demon','Ember'],['neet','Kenji'],['cerberus','Cerberus']]) {
  await page.getByRole('tab',{name:'Character',exact:true}).click();
  for(const [id,label] of [['cat','Mochi'],['magical-girl','Stella'],[character,name]])assert.equal(await page.locator(`[data-piece="${id}"] .equipment-name`).textContent(),label);
  await page.locator(`[data-piece="${character}"]`).click();await page.getByRole('tab',{name:'Costumes',exact:true}).click();
  assert.equal(await page.locator(`[data-piece="${character}-16"] .equipment-price b`).textContent(),'5');
  await page.locator(`[data-piece="${character}-16"]`).click();assert.equal(await page.locator(`[data-piece="${character}-16"]`).getAttribute('aria-pressed'),'true');
  if(character==='demon'){await page.getByRole('tab',{name:'Hairstyles',exact:true}).click();for(const hair of ['buns','braid','original'])await page.locator(`[data-piece="${hair}"]`).click();}
  if(character==='cerberus'){await page.getByRole('tab',{name:'Hats',exact:true}).click();for(const hat of ['party','fedora','unicorn'])await page.locator(`[data-piece="${hat}"]`).click();}
  await page.screenshot({path:`docs/${character}-16-wardrobe.png`});
 }
 await page.getByRole('button',{name:'Close wardrobe',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('forge-outfit-v1')).detailedCostumes),['demon-16','neet-16','cerberus-16']);
 if(!process.env.TEST_URL){
  const report=await page.evaluate(async()=>{
   const {outfitTexture,DEFAULT_OUTFIT,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');const {lockedPieces,playableOutfit,price}=await import('/src/game/economy.ts');
   const s=window.__FORGE_DEV__.scene.getScene('Menu'),c=document.createElement('canvas');c.width=1536;c.height=1280;const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.fillStyle='#304958';ctx.fillRect(0,0,c.width,c.height);let row=0;
   for(const [character,hair,animalHat] of [['demon','original','none'],['demon','buns','none'],['demon','braid','none'],['neet','original','none'],...['none','party','fedora','unicorn'].map(h=>['cerberus','original',h])]) {
    const o={...DEFAULT_OUTFIT,character,hair,animalHat,detailedCostumes:[character+'-16']},key=outfitTexture(s,o),tex=s.textures.get(key);
    if(tex.get(0).width!==64)throw Error('Not 64px '+key);
    for(let f=0;f<12;f++){const frame=tex.get(f);if(!frame)throw Error('Missing frame '+key);ctx.drawImage(tex.getSourceImage(),frame.cutX,frame.cutY,frame.width,frame.height,f*128,row*160,128,frame.height*2);}
    for(const a of ['idle','charge-start','charge-loop','jump','fall','land','eliminated','walk'])if(!s.anims.get(key+'-'+a)?.frames.length)throw Error('Missing animation '+key+' '+a);
    row++;
   }
   const saved=localStorage.getItem('jump-royale-wallet-v1');localStorage.removeItem('jump-royale-wallet-v1');
   try{for(const character of ['demon','neet','cerberus']){const o={...DEFAULT_OUTFIT,character,detailedCostumes:[character+'-16']};if(!lockedPieces(o).some(([slot])=>slot==='hdCostume'))throw Error('Missing lock');if(playableOutfit(o).detailedCostumes.length)throw Error('Unowned costume equipped');}if(price('hdCostume','invalid')!==Infinity)throw Error('Invalid price');if(sanitizeOutfit({...DEFAULT_OUTFIT,detailedCostumes:['invalid','demon-16','demon-16']}).detailedCostumes.join()!=='demon-16')throw Error('Invalid sanitization');}finally{localStorage.setItem('jump-royale-wallet-v1',saved);}
   return c.toDataURL();
  });await writeFile('docs/trio-16-animation-check.png',Buffer.from(report.split(',')[1],'base64'));
  await page.getByRole('button',{name:'Start',exact:true}).click();await page.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').playerEntities?.size);
  assert.equal(await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities.get(s.localId).sprite.displayWidth;}),32);
  await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 }
 await page.locator('.loot-toggle').click();for(const id of ['demon','neet','cerberus'])assert.equal(await page.locator(`.loot-grid [data-item="hdCostume:${id}-16"]`).count(),1);
 await page.getByRole('button',{name:'Close loot box',exact:true}).click();await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Costumes',exact:true}).click();await page.screenshot({path:'docs/trio-16-mobile.png'});
 assert.deepEqual(errors,[]);console.log('PASS: three costume purchases, persistence, names-only labels, hairstyle and hat compatibility, mystery-box entries, mobile; local run additionally validates 96 frames, animation states, ownership guards and gameplay size.');
}finally{await browser.close();}
