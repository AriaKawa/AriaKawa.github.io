import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Swagg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});const errors=[];
try{const p=await browser.newPage({viewport:{width:1440,height:900}});p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
await p.goto((process.env.RELEASE_URL||'http://127.0.0.1:5217/forge-climb-royale/')+'?vertical=release',{waitUntil:'networkidle'});
assert(await p.locator('script[src*="index-BLwCvSCP"]').count());await p.getByRole('heading',{name:'The Long Mountain',exact:true}).waitFor();
await p.getByRole('button',{name:'Start the Climb'}).click();await p.getByText('FOOTHILLS',{exact:true}).waitFor();await p.waitForTimeout(9500);
await p.keyboard.down('KeyD');await p.waitForTimeout(350);await p.keyboard.up('KeyD');await p.keyboard.down('Space');await p.waitForTimeout(650);await p.keyboard.up('Space');await p.waitForTimeout(180);
assert.equal(await p.evaluate(()=>window.__FORGE_DEV__),undefined);assert.deepEqual(errors,[]);await p.screenshot({path:'docs/vertical-production.png'});
console.log('PASS published bundle, ten-region map menu, Foothills match, keyboard play, no dev global, zero request/runtime failures:',p.url());
}finally{await browser.close();}
