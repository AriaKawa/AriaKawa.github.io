import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5218/');await p.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();
 await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:[],rewards:[]})));
 await p.getByRole('button',{name:'Open wardrobe',exact:true}).click();
 for(const name of ['Trailblazer','Celestial Guard','Ember Expedition','Spore Scout'])assert.equal(await p.getByRole('button',{name,exact:true}).count(),0);
 assert.equal(await p.locator('.equipment-grid .equipment-card').count(),8);
 await p.getByRole('button',{name:'Classic Finn',exact:true}).click();await p.screenshot({path:'docs/finn-bald-check.png'});
 await p.getByRole('tab',{name:'Character',exact:true}).click();await p.getByRole('button',{name:'Spore Scout',exact:true}).click();
 assert.equal(await p.getByRole('tab',{name:'Costumes',exact:true}).count(),0);assert.equal(await p.evaluate(()=>JSON.parse(localStorage.getItem('forge-outfit-v1')).character),'mushroom');
 await p.getByRole('button',{name:'Ember · Demon Lady',exact:true}).click();await p.getByRole('tab',{name:'Hairstyles',exact:true}).click();
 assert.equal(await p.locator('.equipment-grid .equipment-card').count(),3);
 for(const name of ['Midnight Locks','Rose Horn Buns','Silver Braid'])await p.getByRole('button',{name,exact:true}).click();
 await p.screenshot({path:'docs/ember-hair-check.png'});
 await p.reload();await p.getByRole('button',{name:'Open wardrobe',exact:true}).waitFor();assert.equal(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').outfit.hair),'braid');
 const report=await p.evaluate(async()=>{
  const {sanitizeOutfit,outfitTexture}=await import('/src/assets/cosmetics.ts'),{owns,playableOutfit}=await import('/src/game/economy.ts');
  for(const costume of ['fieldwork','celestial','ember'])if(sanitizeOutfit({character:'original',costume,wardrobe2:{variant:2,look:1}}).costume!=='classic')throw Error('retired save');
  localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:0,owned:['costume:mushroom'],rewards:[]}));
  const scout=sanitizeOutfit({character:'original',costume:'mushroom'});if(scout.character!=='mushroom'||!owns('character','mushroom')||playableOutfit(scout).character!=='mushroom')throw Error('ownership migration');
  const scene=window.__FORGE_DEV__.scene.getScene('Menu'),keys=['original','buns','braid'].map(hair=>outfitTexture(scene,{character:'demon',hair}));
  if(new Set(keys).size!==3)throw Error('hair texture collision');
  const canvas=document.createElement('canvas');canvas.width=960;canvas.height=128;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
  keys.forEach((key,i)=>c.drawImage(scene.textures.get(key).getSourceImage(),0,0,64,32,i*320,0,256,128));
  return {sheet:canvas.toDataURL(),keys};
 });
 const fs=await import('node:fs/promises');await fs.writeFile('docs/ember-hair-sheet.png',Buffer.from(report.sheet.split(',')[1],'base64'));
 await p.evaluate(()=>localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:['character:demon','hair:braid'],rewards:[]})));
 await p.getByRole('button',{name:'Start the Climb',exact:true}).click();await p.waitForFunction(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities?.get(s.localId)});
 assert.equal(await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities.get(s.localId).sprite.texture.key}),'ember-demon-braid');
 assert.deepEqual(errors,[]);console.log('PASS: removed cards, bald Finn selection, Spore character and ownership migration, all three Ember styles, persistence and gameplay.');
}finally{await browser.close();}
