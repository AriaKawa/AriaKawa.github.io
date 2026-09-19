import assert from 'node:assert/strict';import {createRequire} from 'node:module';import fs from 'node:fs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const url=process.argv[2]??'http://127.0.0.1:5270/forge-climb-royale/';
const b=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{const p=await b.newPage({viewport:{width:1440,height:900}}),errors=[],missing=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(url)&&r.status()>=400)missing.push(r.url());});
 await p.addInitScript(()=>{localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:0,owned:['wallpaper:moonwalk','character:astro-monkey'],rewards:[],spinPoints:0,freeSpins:0}));localStorage.setItem('jump-wallpaper','moonwalk');localStorage.setItem('forge-outfit-v1',JSON.stringify({character:'astro-monkey'}));});
 await p.goto(url,{waitUntil:'networkidle'});await p.getByRole('button',{name:'Wallpapers',exact:true}).waitFor();
 assert.equal(await p.evaluate(()=>typeof window.__FORGE_DEV__),'undefined');
 await p.getByRole('button',{name:'Wallpapers',exact:true}).click();assert.equal(await p.locator('.wallpaper-track img').count(),8);assert.equal(await p.locator('.wallpaper-dialog h3').textContent(),'Little Moon');assert.equal(await p.locator('.wallpaper-equip').textContent(),'Equipped');
 assert(await p.locator('.wallpaper-track img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0)));await p.keyboard.press('Escape');
 await p.getByRole('button',{name:'Open wardrobe',exact:true}).click();await p.getByRole('tab',{name:'Character',exact:true}).click();
 for(const name of ['Captain Marlow','Cosmo','Mochi Rose'])assert(await p.getByRole('button',{name:new RegExp(name)}).count()>0);
 await p.keyboard.press('Escape');await p.keyboard.press('KeyD');
 fs.mkdirSync('docs/expedition-content/qa',{recursive:true});await p.screenshot({path:'docs/expedition-content/qa/production.png'});
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log('PASS production build: 8 wallpaper cards, equipped moon, 3 new wardrobe entries, no missing game assets or browser errors',url);
}finally{await b.close();}
