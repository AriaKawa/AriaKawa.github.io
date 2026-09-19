import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
 await p.goto('http://127.0.0.1:5250');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 const poses=await p.evaluate(async()=>{
  const s=window.__FORGE_DEV__.scene.getScene('Menu'),{COSMETICS,sanitizeOutfit,outfitTexture}=await import('/src/assets/cosmetics.ts'),{drawOutfitPreview}=await import('/src/game/spriteSizing.ts');
  const canvas=document.createElement('canvas');canvas.width=160;canvas.height=192;let count=0;
  for(const character of COSMETICS.character)for(const retro of [false,true])for(const hat of ['none','party','fedora','unicorn']){
   const key=outfitTexture(s,sanitizeOutfit({character:character.id,animalHat:hat,retroCostumes:retro?[character.id]:[]}));
   for(const frame of [0,1,2,3]){drawOutfitPreview(s,canvas,key,frame);const d=canvas.getContext('2d').getImageData(0,191,160,1).data;if(!d.some((v,i)=>i%4===3&&v>32))throw Error('Foot gap '+key+':'+frame);count++;}
  }
  s.showOutfit(sanitizeOutfit({character:'cat'}));return count;
 });
 await p.getByRole('button',{name:'Open wardrobe',exact:true}).click();await p.waitForTimeout(150);await p.screenshot({path:'../../output/forest-wardrobe-cat.png'});
 for(const width of [1440,768,390,320]){await p.setViewportSize({width,height:900});await p.waitForTimeout(150);const gap=await p.evaluate(()=>{const c=document.querySelector('.wardrobe-stage canvas').getBoundingClientRect(),b=document.querySelector('.wardrobe-plinth').getBoundingClientRect();return b.top-c.bottom});assert(Math.abs(gap)<.1,'Wardrobe layout gap '+width);}
 await p.getByRole('button',{name:'Close wardrobe',exact:true}).click();
 for(const width of [1440,768,390,320]){await p.setViewportSize({width,height:900});await p.waitForTimeout(200);const r=await p.evaluate(()=>{const i=document.querySelector('.coffee-icon').getBoundingClientRect(),b=document.querySelector('.coffee-link').getBoundingClientRect();return {square:Math.abs(i.width-i.height)<.1,center:Math.abs(i.x+i.width/2-b.x-b.width/2)<.1,inside:i.left>=b.left&&i.right<=b.right&&i.top>=b.top,screen:b.left>=0&&b.right<=innerWidth}});assert(Object.values(r).every(Boolean),JSON.stringify({width,r}));}
 await p.setViewportSize({width:1440,height:900});await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').scene.start('Game',{name:'Forest check',mapId:'forest'}));await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').snapshot?.players.length>0);
 const water=await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted;clearInterval(h.loop);h.phase='playing';h.roundStartedAt=h.clock;const start=h.hazardY;for(let i=0;i<299;i++)h.tick();if(h.hazardY!==start)throw Error('Water moved before ten seconds');for(let i=0;i<3;i++)h.tick();if(h.hazardY>=start)throw Error('Water did not begin after ten seconds');h.hazardY=100;h.tick();s.update(1000,16);const bottom=s.flood.y+s.flood.displayHeight;if(bottom<s.worldHeight+500)throw Error('Water lower edge visible');const c=s.textures.get('forest-continuous-water').getSourceImage().getContext('2d'),pixel=c.getImageData(512,4095,1,1).data;if(pixel[3]!==255)throw Error('Water not opaque');return {start,after:h.hazardY,bottom,world:s.worldHeight};});
 await p.screenshot({path:'../../output/forest-deep-water.png'});
 await p.evaluate(()=>{const s=window.__FORGE_DEV__.scene.getScene('Game'),h=s.client.hosted,me=h.players.get(h.localId),platform=s.minimapPlatforms.find(p=>p.id==='forest-3');h.hazardY=s.worldHeight-150;me.x=platform.x+20;me.y=platform.y-20;me.alive=true;me.grounded=true;me.groundedPlatformId=platform.id;h.tick();});await p.waitForTimeout(700);await p.screenshot({path:'../../output/forest-horizontal-branch.png'});
 assert.deepEqual(errors,[]);console.log('PASS',poses,'idle previews touch the bottom; wardrobe and coffee at four widths; 10-second water delay and opaque coverage below entire world',water);
}finally{await browser.close()}

