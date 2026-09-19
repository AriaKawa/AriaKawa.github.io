import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];fs.mkdirSync('docs/wallpaper-revision/qa',{recursive:true});
try{
 const p=await browser.newPage({viewport:{width:1440,height:900}});p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{localStorage.setItem('jump-royale-wallet-v1',JSON.stringify({gold:0,owned:['wallpaper:corsair-cove','wallpaper:moonwalk','wallpaper:neon-rooftops','wallpaper:tidal-sanctuary','wallpaper:cloud-garden','character:aria'],rewards:[],spinPoints:0,freeSpins:0}));localStorage.setItem('jump-wallpaper','corsair-cove');localStorage.setItem('forge-outfit-v1',JSON.stringify({character:'aria'}));});
 await p.goto('http://127.0.0.1:5271');await p.waitForFunction(()=>window.__FORGE_DEV__?.scene.isActive('Menu'));
 await p.screenshot({path:'docs/wallpaper-revision/qa/pirate.png'});
 assert.equal(await p.locator('.expedition-interaction').count(),0);assert.equal(await p.locator('.forge-controls').isVisible(),false);
 await p.locator('.expedition-hotspot').click({position:{x:250,y:140}});
 assert(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').children.list.some(o=>o.name==='cannonball')));
 await p.screenshot({path:'docs/wallpaper-revision/qa/cannon.png'});
 await p.waitForTimeout(1500);
 const platformResults=await p.evaluate(async()=>{
  const {stepLobbyPlayer,createLobbyPlayer}=await import('/src/game/lobbyPhysics.ts');
  const {GAME_WIDTH:w,GAME_HEIGHT:h}=await import('/src/game/constants.ts');
  const s=window.__FORGE_DEV__.scene.getScene('Menu');s.refreshSurfaces();const surfaces=s.lobbySurfaces;
  const canvas=s.game.canvas.getBoundingClientRect(),sx=w/canvas.width,sy=h/canvas.height;
  let count=0;
  for(const el of document.querySelectorAll('.menu-ui button,.menu-form input')){
   const r=el.getBoundingClientRect();if(!r.width||!r.height||el.closest('[hidden],dialog:not([open])'))continue;
   const x=(r.left-canvas.left)*sx,y=(r.top-canvas.top)*sy;
   const platform=surfaces.find(v=>Math.abs(v.x-x)<.01&&Math.abs(v.y-y)<.01);if(!platform)throw Error('No platform '+el.outerHTML.slice(0,80));
   const actor=createLobbyPlayer(w,h);Object.assign(actor,{x:platform.x+platform.w/2-7,y:platform.y-30,vy:100,grounded:false});
   for(let i=0;i<8&&!actor.grounded;i++)stepLobbyPlayer(actor,1/30,w,h,[platform]);
   if(actor.groundedPlatformId!==platform.id)throw Error('Fallthrough '+el.textContent);
   Object.assign(actor,{y:platform.y-5,vy:-200,grounded:false});stepLobbyPlayer(actor,1/30,w,h,[platform]);if(actor.grounded||actor.y>=platform.y-5)throw Error('Cannot pass upward');count++;
  }
  return count;
 });assert(platformResults>8);
 await p.evaluate(()=>{localStorage.setItem('jump-wallpaper','moonwalk');window.__FORGE_DEV__.scene.getScene('Menu').scene.restart();});
 await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Menu').wallpaperId==='moonwalk');await p.waitForTimeout(250);
 await p.screenshot({path:'docs/wallpaper-revision/qa/moon.png'});
 const moon=await p.evaluate(async()=>{
  const {resetMoon,stepMoon,moonGeometry}=await import('/src/game/expeditionWorlds.ts'),{createLobbyPlayer}=await import('/src/game/lobbyPhysics.ts');
  const actor=createLobbyPlayer(960,540);resetMoon(actor);stepMoon(actor,0,960,540);actor.input.right=true;
  let hidden=false,angle=0;for(let i=0;i<700;i++){angle=stepMoon(actor,1/30,960,540);if(actor.y>540)hidden=true;}
  if(!hidden||angle<Math.PI*2)throw Error('Orbit incomplete');
  resetMoon(actor);actor.input.right=false;actor.input.jumpHeld=true;for(let i=0;i<25;i++)stepMoon(actor,1/30,960,540);actor.input.jumpHeld=false;stepMoon(actor,1/30,960,540);
  let flight=0;while(!actor.grounded&&flight<10){stepMoon(actor,1/30,960,540);flight+=1/30;}
  if(flight<4||flight>5)throw Error('Wrong gravity '+flight);
  const ledge={id:'ui-test',x:400,y:220,w:160,h:4,type:'stone'};
  resetMoon(actor);actor.input.jumpHeld=true;for(let i=0;i<25;i++)stepMoon(actor,1/30,960,540,[ledge]);actor.input.jumpHeld=false;
  for(let i=0;i<200;i++)stepMoon(actor,1/30,960,540,[ledge]);
  if(actor.groundedPlatformId!=='ui-test')throw Error('Moon UI fallthrough');
  actor.input.right=true;for(let i=0;i<100;i++)stepMoon(actor,1/30,960,540,[ledge]);if(actor.groundedPlatformId==='ui-test')throw Error('Cannot leave UI');
  return {angle,hidden,flight,geometry:moonGeometry(960,540)};
 });
 for(const id of ['neon-rooftops','tidal-sanctuary','cloud-garden']){
  await p.evaluate(id=>{localStorage.setItem('jump-wallpaper',id);window.__FORGE_DEV__.scene.getScene('Menu').scene.restart();},id);
  await p.waitForFunction(id=>window.__FORGE_DEV__.scene.getScene('Menu').wallpaperId===id,id);
  assert.equal(await p.locator('.forge-controls').isVisible(),false);
  assert(await p.evaluate(()=>window.__FORGE_DEV__.scene.getScene('Menu').lobbySurfaces.length>10));
 }
 for(const size of [{width:390,height:844},{width:844,height:390}]){
  await p.setViewportSize(size);await p.waitForTimeout(250);await p.screenshot({path:`docs/wallpaper-revision/qa/mobile-${size.width}.png`});
 }
 assert.deepEqual(errors,[]);console.log('PASS',JSON.stringify({platformResults,moon,errors}));
}finally{await browser.close();}
