import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
fs.mkdirSync('docs/expedition-content/qa',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5269');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 const result=await p.evaluate(async()=>{
  const {EXPEDITION_WALLPAPERS,resetMoon,stepMoon,moonGeometry}=await import('/src/game/expeditionWorlds.ts');
  const {COSMETICS,outfitTexture,sanitizeOutfit}=await import('/src/assets/cosmetics.ts');
  const {EXPEDITION_ANIMATIONS}=await import('/src/assets/expeditionCharacters.ts');
  const {LOOT_POOL}=await import('/src/game/lootCatalog.ts');
  const {rollLoot,lootChance}=await import('/src/game/economy.ts');
  const {createLobbyPlayer}=await import('/src/game/lobbyPhysics.ts');
  const {equippedWallpaper}=await import('/src/game/wallpapers.ts');
  const s=window.__FORGE_DEV__.scene.getScene('Menu');
  localStorage.setItem('jump-wallpaper','moonwalk');if(equippedWallpaper()!=='forged-command')throw Error('Locked wallpaper equipped');
  const ids=['pirate','astro-monkey','axolotl'];let frames=0,animations=0;
  for(const id of ids){
   if(!COSMETICS.character.some(c=>c.id===id))throw Error('Missing roster '+id);
   const key=outfitTexture(s,sanitizeOutfit({character:id}));
   for(let f=0;f<16;f++){if(s.textures.getFrame(key,f).width!==256)throw Error('Missing pose');frames++;}
   for(const a of Object.keys(EXPEDITION_ANIMATIONS)){if(!s.anims.exists(key+'-'+a))throw Error('Missing animation '+a);animations++;}
   if(LOOT_POOL.some(l=>l.slot==='retroCostume'&&l.id===id))throw Error('Invalid retro loot');
  }
  const items=LOOT_POOL.filter(l=>(l.slot==='wallpaper'&&EXPEDITION_WALLPAPERS.some(w=>w.id===l.id))||(l.slot==='character'&&ids.includes(l.id)));
  for(const item of items){const tier=LOOT_POOL.filter(l=>l.rarity===item.rarity);let n=0;const values=[([0,60,85,95,99][item.rarity]+.1)/100,(tier.indexOf(item)+.1)/tier.length];if(rollLoot(LOOT_POOL,()=>values[n++])!==item)throw Error('Unreachable loot '+item.id);}
  const chance=LOOT_POOL.reduce((sum,l)=>sum+lootChance(l,LOOT_POOL),0);if(Math.abs(chance-100)>1e-7)throw Error('Odds');
  const actor=createLobbyPlayer(960,540);resetMoon(actor);actor.input.right=true;
  let rotation=0;for(let i=0;i<220;i++){rotation=stepMoon(actor,1/30,960,540);const m=moonGeometry(960,540);if(Math.abs(Math.hypot(actor.x+7-m.x,actor.y+20-m.y)-m.radius)>.001)throw Error('Moon contact');}
  if(rotation<Math.PI*2)throw Error('Cannot circumnavigate');
  actor.input.right=false;actor.input.jumpHeld=true;for(let i=0;i<24;i++)stepMoon(actor,1/30,960,540);actor.input.jumpHeld=false;stepMoon(actor,1/30,960,540);if(actor.grounded||actor.vy>=0)throw Error('Moon jump');for(let i=0;i<80;i++)stepMoon(actor,1/30,960,540);if(!actor.grounded)throw Error('Moon return');
  localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:100,owned:items.map(i=>i.slot+':'+i.id),rewards:[],freeSpins:3,spinPoints:0}));localStorage.setItem('jump-wallpaper','corsair-cove');localStorage.setItem('forge-outfit-v1',JSON.stringify(sanitizeOutfit({character:'pirate'})));
  return {items:items.length,frames,animations,chance};
 });
 assert.equal(result.items,8);assert.equal(result.frames,48);assert.equal(result.animations,27);
 await p.reload();await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 for(const [id,character] of [['corsair-cove','pirate'],['moonwalk','astro-monkey'],['neon-rooftops','pirate'],['tidal-sanctuary','axolotl'],['cloud-garden','axolotl']]){
  await p.evaluate(({id,character})=>{localStorage.setItem('jump-wallpaper',id);localStorage.setItem('forge-outfit-v1',JSON.stringify({character}));window.__FORGE_DEV__.scene.getScene('Menu').scene.restart();},{id,character});
  await p.waitForFunction(id=>window.__FORGE_DEV__.scene.getScene('Menu').wallpaperId===id,id);await p.waitForTimeout(350);
  assert.equal(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').background.texture.key),id);
  await p.screenshot({path:`docs/expedition-content/qa/${id}.png`});
  if(id==='tidal-sanctuary'||id==='cloud-garden'){await p.locator('.expedition-interaction button').click();assert(await p.evaluate(()=>!window.__FORGE_DEV__.scene.getScene('Menu').lobbyPlayer.grounded));}
  if(id==='corsair-cove'){await p.getByRole('button',{name:'Fire signal cannon'}).click();assert(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').children.list.some(o=>o.type==='Arc')));}
 }
 await p.getByRole('button',{name:'Wallpapers',exact:true}).click();assert.equal(await p.locator('.wallpaper-track img').count(),8);await p.keyboard.press('Escape');
 for(const size of [{width:390,height:844},{width:844,height:390}]){await p.setViewportSize(size);await p.waitForTimeout(200);await p.screenshot({path:`docs/expedition-content/qa/mobile-${size.width}.png`});}
 await p.setViewportSize({width:1440,height:900});await p.getByRole('button',{name:'Start',exact:true}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.phase==='playing');
 assert(await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game');return s.playerEntities.get(s.localId).animationPrefix==='expedition-axolotl';}));
 assert.deepEqual(errors,[]);console.log('PASS',JSON.stringify(result),'moon orbit/jump, ownership, reload, interactions, carousel, mobile and match start; no browser errors');
}finally{await browser.close();}
