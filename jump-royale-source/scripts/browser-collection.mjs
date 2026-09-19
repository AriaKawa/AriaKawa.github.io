import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
try {
 const page=await browser.newPage();
 page.on('pageerror',error=>console.error(error.message));
 await page.goto('http://127.0.0.1:5256');
 const audit=await page.evaluate(async()=>{
  const {LOOT_POOL}=await import('/src/game/lootCatalog.ts');
  const {COSMETICS,DEMON_HAIRS}=await import('/src/assets/cosmetics.ts');
  const {COSTUMES}=await import('/src/assets/costumeSets.ts');
  const {ANIMAL_HATS}=await import('/src/assets/animalRig.ts');
  const {MAGICAL_HAIR}=await import('/src/assets/fantasyRig.ts');
  const {isExpeditionCharacter}=await import('/src/assets/expeditionCharacters.ts');
  const {WALLPAPERS}=await import('/src/game/wallpapers.ts');
  const {wallet,owns,lootChance,rollLoot}=await import('/src/game/economy.ts');
  const {unlockCollection,UNLOCK_TOKEN}=await import('/src/game/wardrobeUnlock.ts');
  const expected=[
   ...COSMETICS.character.filter(c=>c.id!=='original').map(c=>'character:'+c.id),
   ...COSMETICS.character.filter(c=>!['pogo','aria'].includes(c.id)&&!isExpeditionCharacter(c.id)).map(c=>'retroCostume:'+c.id),
   ...COSTUMES.filter(c=>c.id!=='classic').map(c=>'costume:'+c.id),
   ...[...DEMON_HAIRS,...MAGICAL_HAIR].filter(c=>c.id!=='original').map(c=>'hair:'+c.id),
   ...ANIMAL_HATS.filter(c=>c.id!=='none').map(c=>'animalHat:'+c.id),
   ...WALLPAPERS.filter(c=>c.locked).map(c=>'wallpaper:'+c.id),
  ];
  const keys=LOOT_POOL.map(c=>c.slot+':'+c.id);
  if(new Set(keys).size!==keys.length||keys.length!==expected.length||expected.some(k=>!keys.includes(k)))throw Error('Catalog mismatch');
  const original={gold:123,owned:['legacy:keep'],rewards:['keep'],spinPoints:2,freeSpins:4};
  localStorage.setItem('jump-royale-wallet-v1',JSON.stringify(original));
  if(unlockCollection('#unlock=invalid',LOOT_POOL))throw Error('Invalid link accepted');
  const checkOdds=()=>{if(Math.abs(LOOT_POOL.reduce((sum,p)=>sum+lootChance(p,LOOT_POOL),0)-100)>1e-8)throw Error('Invalid odds');};
  checkOdds();
  for(const item of LOOT_POOL){const tier=LOOT_POOL.filter(p=>p.rarity===item.rarity);let n=0;const won=rollLoot(LOOT_POOL,()=>n++===0?([0,60,85,95,99][item.rarity]+.01)/100:(tier.indexOf(item)+.5)/tier.length);if(won!==item)throw Error('Unreachable '+item.id);}
  if(!unlockCollection('#unlock='+UNLOCK_TOKEN,LOOT_POOL))throw Error('Unlock failed');
  const saved=JSON.stringify(wallet());
  unlockCollection('#unlock='+UNLOCK_TOKEN,LOOT_POOL);
  if(saved!==JSON.stringify(wallet()))throw Error('Not idempotent');
  if(LOOT_POOL.some(p=>!owns(p.slot,p.id)))throw Error('Locked item');
  const w=wallet();if(w.gold!==123||w.freeSpins!==4||w.spinPoints!==2||w.rewards[0]!=='keep'||!w.owned.includes('legacy:keep'))throw Error('Save changed');
  checkOdds();
  return {items:keys.length,wallpapers:WALLPAPERS.filter(c=>c.locked).length,token:UNLOCK_TOKEN};
 });
 console.log('Catalog audit passed',audit);
 await page.goto('http://127.0.0.1:5256/?unlock-check=1#unlock='+audit.token);
 await page.waitForFunction(()=>!location.hash);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('jump-royale-wallet-v1')).owned.length),audit.items+1);
 console.log('PASS catalog completeness, every prize reachable, odds, unlock persistence/idempotency and preserved wallet',audit);
} finally {await browser.close();}
