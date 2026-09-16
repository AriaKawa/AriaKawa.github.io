import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile} from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const url=process.env.TEST_URL||'http://127.0.0.1:5238/',browser=await chromium.launch({headless:true,channel:'msedge',ignoreDefaultArgs:['--hide-scrollbars']});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
 await page.goto(url);await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 if(process.env.EXPECT_BUNDLE)assert((await page.locator('script[type=module]').getAttribute('src')).includes(process.env.EXPECT_BUNDLE));
 await page.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:[],rewards:[],freeSpins:0,spinPoints:0})));
 await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Character',exact:true}).click();await page.locator('[data-piece=magical-girl]').click();
 await page.getByRole('tab',{name:'Costumes',exact:true}).click();assert.equal(await page.locator('[data-piece=starlight-16] .equipment-price b').textContent(),'5');await page.locator('[data-piece=starlight-16]').click();
 assert.equal(await page.locator('.wardrobe-gold-balance').textContent(),'90');
 await page.screenshot({path:'docs/stella-16-wardrobe.png'});
 await page.getByRole('tab',{name:'Hairstyles',exact:true}).click();await page.locator('[data-piece=star-buns]').click();
 await page.getByRole('button',{name:'Close wardrobe',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('forge-outfit-v1')).magicalCostume),'starlight-16');
 if(!process.env.TEST_URL){
  const report=await page.evaluate(async()=>{
   const {outfitTexture,DEFAULT_OUTFIT,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');const {lockedPieces,playableOutfit}=await import('/src/game/economy.ts');
   const s=window.__FORGE_DEV__.scene.getScene('Menu'),canvas=document.createElement('canvas');canvas.width=1536;canvas.height=1600;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.fillStyle='#304958';c.fillRect(0,0,1536,1600);let row=0,checked=0;
   for(const animal of ['puppy','cat','rat','cerberus','kangaroo'])for(const hat of ['fedora','unicorn']){
    const outfit={...DEFAULT_OUTFIT,character:animal,animalHat:hat};if(sanitizeOutfit(outfit).animalHat!==hat)throw Error('Hat lost');
    const key=outfitTexture(s,outfit),texture=s.textures.get(key),source=texture.getSourceImage();
    for(let f=0;f<12;f++){const frame=texture.get(f);if(!frame)throw Error('Missing frame');c.drawImage(source,f*32,0,32,40,f*128,row*160,128,160);checked++;}
    for(const name of ['idle','charge-start','charge-loop','jump','fall','land','eliminated','walk'])if(!s.anims.get(key+'-'+name)?.frames.length)throw Error('Missing hat animation');
    row++;
   }
   for(const hair of ['original','star-buns']){
    const key=outfitTexture(s,{...DEFAULT_OUTFIT,character:'magical-girl',hair,magicalCostume:'starlight-16'}),tex=s.textures.get(key);if(tex.get(0).width!==64||tex.get(0).height!==64)throw Error('Not HD');
    const a=document.createElement('canvas');a.width=768;a.height=64;a.getContext('2d').drawImage(tex.getSourceImage(),0,0);const d=a.getContext('2d').getImageData(0,0,768,64).data;let detail=0;
    for(let y=0;y<64;y+=2)for(let x=0;x<768;x+=2){const i=(y*768+x)*4;for(const j of [i+4,i+768*4,i+768*4+4])for(let n=0;n<4;n++)if(d[i+n]!==d[j+n])detail++;}
    if(detail<1000)throw Error('Only an upscale');
    for(const name of ['idle','charge-start','charge-loop','jump','fall','land','eliminated','walk'])if(!s.anims.get(key+'-'+name)?.frames.length)throw Error('Missing HD animation');
   }
   return {checked,contact:canvas.toDataURL(),width:s.preview.displayWidth,frame:s.preview.frame.width};
  });assert.equal(report.checked,120);assert.equal(report.frame,64);assert(report.width<400);await writeFile('docs/animal-new-hats.png',Buffer.from(report.contact.split(',')[1],'base64'));
  await page.getByRole('button',{name:'Start',exact:true}).click();await page.waitForFunction(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities?.get(s.localId);});
  const actual=await page.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),p=s.playerEntities.get(s.localId).sprite;return {width:p.displayWidth,key:p.texture.key};});assert.equal(actual.width,32);assert.equal(actual.key,'fantasy-magical-girl-buns-16');await page.screenshot({path:'docs/stella-16-game.png'});await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 }
 await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();
 for(const animal of ['puppy','cat','rat','cerberus','kangaroo']){
  await page.getByRole('tab',{name:'Character',exact:true}).click();await page.locator(`[data-piece=${animal}]`).click();await page.getByRole('tab',{name:'Hats',exact:true}).click();assert.equal(await page.locator('.equipment-card').count(),4);
  for(const hat of ['fedora','unicorn']){await page.locator(`[data-piece=${hat}]`).click();assert.equal(await page.locator(`[data-piece=${hat}]`).getAttribute('aria-pressed'),'true');}
 }
 await page.screenshot({path:'docs/kangaroo-hats-wardrobe.png'});await page.getByRole('button',{name:'Close wardrobe',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('forge-outfit-v1')).animalHat),'unicorn');
 await page.locator('.loot-toggle').click();for(const id of ['animalHat:fedora','animalHat:unicorn','magicalCostume:starlight-16'])assert.equal(await page.locator(`.loot-grid [data-item="${id}"]`).count(),1);
 await page.getByRole('button',{name:'Close loot box',exact:true}).click();await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Hats',exact:true}).click();await page.screenshot({path:'docs/new-hats-mobile.png'});
 assert.deepEqual(errors,[]);console.log('PASS: Stella 64px costume and both hairstyles, same gameplay size, 120 hat frames on all five animals, wardrobe purchases and persistence, mystery-box entries, mobile, no browser errors.');
}finally{await browser.close();}
