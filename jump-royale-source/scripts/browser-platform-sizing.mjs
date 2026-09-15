import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {const p=await browser.newPage({viewport:{width:1200,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const [index,map] of ['mountain','forge','jungle','snow'].entries()){
  await p.goto('http://127.0.0.1:5218/');await p.getByRole('button',{name:'Start the Climb'}).waitFor();for(let n=0;n<index;n++)await p.getByRole('button',{name:'Next map'}).click();
  await p.getByRole('button',{name:'Start the Climb'}).click();await p.waitForFunction(()=>window.__FORGE_DEV__.scene.getScene('Game').minimapPlatforms?.length>0);
  const report=await p.evaluate(async(map)=>{const {levelForMap}=await import('/@fs/C:/Users/Swagg/Documents/Playground/jump-royale-vertical-live/jump-royale-source/server/src/sim/maps.ts');const expected=levelForMap(map),actual=window.__FORGE_DEV__.scene.getScene('Game').minimapPlatforms;return {expected:expected.map(p=>[p.id,p.w,p.h]),actual:actual.map(p=>[p.id,p.w,p.h])}},map);
  assert.deepEqual(report.actual,report.expected);await p.screenshot({path:'docs/platform-sizing-'+map+'.png'});console.log('PASS browser',map,report.actual.length,'platform dimensions match physics');
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();}
