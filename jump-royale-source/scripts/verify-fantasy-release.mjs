import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const url=process.env.TEST_URL||'http://127.0.0.1:5238/',browser=await chromium.launch({headless:true,channel:'msedge'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.goto(url);await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 if(process.env.EXPECT_BUNDLE)assert((await page.locator('script[type=module]').getAttribute('src')).includes(process.env.EXPECT_BUNDLE));
 await page.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:[],rewards:[],freeSpins:1,spinPoints:0})));
 for(const id of ['cerberus','magical-girl','skeleton']){
  await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Character',exact:true}).click();
  assert.equal(await page.locator('.wardrobe-overlay [data-piece]').count(),9);
  await page.locator(`.wardrobe-overlay [data-piece="${id}"]`).click();
  if(id==='magical-girl'){
   await page.getByRole('tab',{name:'Hairstyles',exact:true}).click();assert.equal(await page.locator('.wardrobe-overlay [data-piece]').count(),2);
   await page.locator('.wardrobe-overlay [data-piece="star-buns"]').click();
  }
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('forge-outfit-v1')));assert.equal(saved.character,id);if(id==='magical-girl')assert.equal(saved.hair,'star-buns');
  await page.getByRole('button',{name:'Close wardrobe',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('forge-outfit-v1')).character),id);
 }
 await page.locator('.loot-toggle').click();
 for(const name of ['Cerberus · Hellhound','Stella · Magical Girl','Rattle · Skeleton','Starlight Star Buns'])assert.equal(await page.locator('.loot-grid').getByText(name,{exact:true}).count(),1);
 await page.getByRole('button',{name:'Buy · 2 gold',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.loot-dialog').classList.contains('loot-won'));
 await page.getByRole('button',{name:'Close loot box',exact:true}).click();
 await page.getByRole('button',{name:'Open wardrobe',exact:true}).click();await page.getByRole('tab',{name:'Character',exact:true}).click();
 await page.screenshot({path:'docs/fantasy-release-wardrobe.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'docs/fantasy-release-mobile.png'});
 const images=await page.evaluate(async()=>{const base=new URL('.',location.href);const list=[];for(const id of ['cerberus','magical-girl','magical-girl-buns','skeleton']){const img=new Image();img.src=new URL(`assets/reforged/cosmetics/${id}.png`,base).href;await img.decode();list.push([img.naturalWidth,img.naturalHeight]);}return list;});
 assert.deepEqual(images,Array.from({length:4},()=>[384,32]));assert.deepEqual(errors,[]);
 console.log('PASS '+url+': 9-character current wardrobe, new character purchases and persistence, two magical hairstyles, mystery-box entries and paid spin, all four sprite sheets, desktop/mobile, no browser errors.');
}finally{await browser.close();}
