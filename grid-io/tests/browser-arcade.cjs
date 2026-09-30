const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path'), os = require('node:os'), fs = require('node:fs');
const base = process.env.GRID_BASE_URL || 'http://127.0.0.1:5276';
const out = path.join(os.tmpdir(), 'grid-io-arcade');
fs.mkdirSync(out, { recursive: true });

async function ready(page) {
  await page.goto(base + '/grid-io/?test=1');
  await page.waitForFunction(() => !document.getElementById('play').disabled);
}
async function play(page) {
  await page.locator('#play').click();
  await page.waitForFunction(() => window.__GRID_TEST__.state === 'playing');
  await page.evaluate(() => { window.__GRID_TEST__.arena.player.grace = 1000; });
}
async function menu(page) {
  await page.keyboard.press('Escape');
  await page.locator('#quit').click();
}
async function screenshot(page, name) {
  await page.screenshot({ path: path.join(out, name + '.png') });
}

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const errors = [];
  function observe(page) {
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  }
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    observe(page); await ready(page);
    assert.equal(await page.locator('[data-ruleset="classic"]').getAttribute('aria-pressed'), 'true');
    await play(page);
    assert(await page.evaluate(() => window.__GRID_TEST__.graphics.camera.isOrthographicCamera));
    assert(await page.locator('#wheelie-button').isHidden());
    await page.keyboard.down('ControlLeft'); await page.waitForTimeout(160); await page.keyboard.up('ControlLeft');
    assert.equal(await page.evaluate(() => !!window.__GRID_TEST__.arena.player.wheelieActive), false);
    await page.mouse.move(600, 100); await page.waitForTimeout(180);
    assert(await page.evaluate(() => window.__GRID_TEST__.arena.player.angle < -.1));
    await page.keyboard.press('Space');
    assert(await page.evaluate(() => window.__GRID_TEST__.arena.player.jump > 0));
    await page.evaluate(() => { window.__GRID_TEST__.arena.player.peak = 177; });
    await menu(page);
    assert.equal(await page.evaluate(() => localStorage.getItem('grid-io-best')), '177');

    await page.locator('[data-ruleset="arcade"]').click();
    await screenshot(page, 'menu'); await play(page);
    assert(await page.locator('#world').isHidden());
    assert(await page.locator('#arcade-world').isVisible());
    assert(await page.evaluate(() => window.__GRID_TEST__.graphics.camera.isOrthographicCamera));
    assert.equal(await page.evaluate(() => window.__GRID_TEST__.snapshot().ruleset), 'arcade');
    assert(await page.locator('#wheelie-button').isVisible());
    await page.keyboard.down('ControlLeft');
    await page.waitForFunction(() => window.__GRID_TEST__.arena.player.wheelieActive);
    const frozen = await page.evaluate(() => JSON.stringify(window.__GRID_TEST__.arena.player.trail));
    await page.waitForFunction(() => window.__GRID_TEST__.arena.player.wheelieElapsed >= 2.1);
    const stopped = await page.evaluate(() => ({ speed: window.__GRID_TEST__.arena.player.speed, angle: window.__GRID_TEST__.arena.player.angle }));
    assert(stopped.speed < .001);
    await page.keyboard.down('KeyA'); await page.waitForTimeout(140); await page.keyboard.up('KeyA');
    const left = await page.evaluate(() => window.__GRID_TEST__.arena.player.angle);
    assert(left < stopped.angle - .1);
    await page.keyboard.down('KeyD'); await page.waitForTimeout(140); await page.keyboard.up('KeyD');
    assert(await page.evaluate(left => window.__GRID_TEST__.arena.player.angle > left + .1, left));
    assert.equal(await page.evaluate(() => JSON.stringify(window.__GRID_TEST__.arena.player.trail)), frozen);
    await screenshot(page, 'wheelie');
    await page.waitForFunction(() => !window.__GRID_TEST__.arena.player.wheelieActive && window.__GRID_TEST__.arena.player.speed > 5);
    assert(await page.evaluate(() => window.__GRID_TEST__.arena.player.wheelieLocked));
    await page.keyboard.up('ControlLeft');

    // Drive complete routes, from their actual ground entrances to exits. These
    // checks use the exact Arena loaded by Arcade, including height collisions.
    const routes = await page.evaluate(async () => {
      const { Arena, ROADS, LOOP, roadPoint, loopPoint } = await import('../grid-io/arcade.js?v=arcade-1');
      const result = [];
      for (const road of ROADS) for (const direction of [1, -1]) {
        const a = new Arena({ seed: 42, bots: 0, food: 0, established: false, speedPercent: 300 });
        const start = roadPoint(road, direction > 0 ? 0 : road.end - road.start);
        const angle = start.angle + (direction < 0 ? Math.PI : 0);
        Object.assign(a.player, start, { angle, trail: [], length: 40, grace: 0, road: null });
        let extreme = 0;
        for (let i = 0; i < 1800; i++) {
          a.step(1 / 60, { angle });
          if (Math.abs(a.player.y) > Math.abs(extreme)) extreme = a.player.y;
          const along = road.axis === 'x' ? a.player.x : a.player.z;
          if (direction > 0 ? along > road.end + 2 : along < road.start - 2) break;
          if (!a.player.alive) break;
        }
        result.push({ id: road.id, direction, alive: a.player.alive, extreme, target: road.height, road: a.player.road, y: a.player.y });
      }
      for (const direction of [1, -1]) {
        const a = new Arena({ seed: 43, bots: 0, food: 0, established: false, speedPercent: 300 });
        const start = loopPoint(direction > 0 ? 0 : LOOP.length);
        const angle = start.angle + (direction < 0 ? Math.PI : 0);
        Object.assign(a.player, start, { angle, trail: [], grace: 0 });
        let high = 0, entered = false;
        for (let i = 0; i < 360; i++) {
          a.step(1 / 60, { angle }); high = Math.max(high, a.player.y);
          if (Number.isFinite(a.player.loopS)) entered = true;
          if (entered && !Number.isFinite(a.player.loopS) || !a.player.alive) break;
        }
        result.push({ id: LOOP.id, direction, alive: a.player.alive, extreme: high, target: LOOP.radius * 2, road: a.player.loopS, y: a.player.y });
      }
      return result;
    });
    for (const route of routes) {
      assert(route.alive, JSON.stringify(route));
      assert(Math.abs(route.extreme - route.target) < .1, JSON.stringify(route));
      assert.equal(route.road, null, JSON.stringify(route));
      assert.equal(route.y, 0, JSON.stringify(route));
    }

    await page.keyboard.press('Escape');
    const hideDialogs = await page.addStyleTag({ content: 'dialog[open]{visibility:hidden}dialog::backdrop{background:transparent}' });
    async function pose(id, s, ground = false) {
      return page.evaluate(async ({ id, s, ground }) => {
        const { ROADS, roadPoint, loopPoint } = await import('./arcade.js?v=arcade-1');
        const { arena: a, graphics: g } = window.__GRID_TEST__;
        for (const r of a.riders.slice(1)) { r.alive = false; r.respawn = 1e6; }
        const road = ROADS.find(r => r.id === id);
        const q = road ? roadPoint(road, s) : loopPoint(s);
        if (ground) { q.z -= q.y * 165 / 210; q.y = 0; q.pitch = 0; }
        Object.assign(a.player, q, { jump: 0, wheelie: 0, wheelieActive: false, boost: false,
          road: ground ? null : road?.id || null, loopS: road ? null : s, loopDir: 1, loopLane: 0,
          previousX: q.x, previousY: q.y, previousZ: q.z, previousAngle: q.angle, previousPitch: q.pitch,
          previousJump: 0, previousWheelie: 0, trail: [], grace: 1000 });
        g.reset(a); g.draw(a, 1, a.time, 1);
        const v = g.getBike(a.player).group.position.clone().project(g.camera);
        const x = Math.round((v.x + 1) / 2 * g.renderer.domElement.width), y = Math.round((v.y + 1) / 2 * g.renderer.domElement.height);
        const gl = g.renderer.getContext(), bytes = new Uint8Array(100 * 80 * 4);
        function pixels() {
          g.renderer.render(g.scene, g.camera);
          gl.readPixels(x - 50, y - 40, 100, 80, gl.RGBA, gl.UNSIGNED_BYTE, bytes);
          let red = 0;
          for (let i = 0; i < bytes.length; i += 4) if (bytes[i] > 65 && bytes[i] > bytes[i + 1] * 1.5 && bytes[i] > bytes[i + 2] * 1.3) red++;
          return red;
        }
        const visible = pixels(); g.cutaway.value.y = 1e6; const occluded = pixels();
        g.cutaway.value.y = q.y; g.draw(a, 1 / 60, a.time, 1);
        return { visible, occluded, camera: g.camera.isOrthographicCamera, up: g.camera.up.toArray(), pitch: g.getBike(a.player).group.rotation.z, calls: g.renderer.info.render.calls };
      }, { id, s, ground });
    }
    await pose('skyway-east', 950); await screenshot(page, 'skyway');
    const underneath = await pose('skyway-east', 950, true); await screenshot(page, 'under-overpass');
    assert(underneath.visible > underneath.occluded + 10, JSON.stringify(underneath));
    const underground = await pose('underpass-south', 700); await screenshot(page, 'underground');
    assert(underground.visible > underground.occluded + 10, JSON.stringify(underground));
    const loop = await pose('helix-loop', 80 + Math.hypot(2 * Math.PI * 32, 44) / 2); await screenshot(page, 'loop');
    assert(Math.abs(loop.pitch - Math.PI) < .01);
    assert.deepEqual(loop.up, [0, 1, 0]); assert(loop.camera);
    await hideDialogs.evaluate(e => e.remove());
    await page.locator('#quit').click();
    assert.equal(await page.evaluate(() => localStorage.getItem('grid-io-best')), '177');
    assert(await page.evaluate(() => Number(localStorage.getItem('grid-io-best-arcade-360')) >= 40));

    await page.locator('[data-mode="90"]').click(); await play(page);
    await page.keyboard.press('ArrowUp'); await page.waitForTimeout(50);
    assert(await page.evaluate(() => Math.abs(window.__GRID_TEST__.arena.player.angle + Math.PI / 2) < .01));
    await page.keyboard.down('ControlLeft'); await page.keyboard.down('ArrowRight');
    await page.waitForTimeout(250); await page.keyboard.up('ArrowRight');
    assert(await page.evaluate(() => window.__GRID_TEST__.arena.player.angle > -Math.PI / 2 + .1));
    await page.keyboard.up('ControlLeft'); await page.waitForTimeout(60);
    assert(await page.evaluate(() => Math.abs(Math.sin(window.__GRID_TEST__.arena.player.angle * 2)) < .01));
    await menu(page); await page.locator('[data-ruleset="classic"]').click(); await play(page);
    assert(await page.locator('#arcade-world').isHidden()); assert(await page.locator('#wheelie-button').isHidden());
    assert.equal(await page.evaluate(() => window.__GRID_TEST__.snapshot().ruleset), 'classic');

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const mobile = await mobileContext.newPage(); observe(mobile);
    await mobile.addInitScript(() => {
      window.pointerAudit = [];
      for (const type of ['pointerdown', 'pointerup', 'pointercancel', 'lostpointercapture'])
        window.addEventListener(type, e => window.pointerAudit.push([type, e.pointerId, e.target.id, e.pointerType]));
    });
    await ready(mobile);
    await mobile.locator('[data-ruleset="arcade"]').click(); await screenshot(mobile, 'mobile-menu');
    const playBox = await mobile.locator('#play').boundingBox(); assert(playBox.y + playBox.height < 844);
    await play(mobile);
    const cdp = await mobileContext.newCDPSession(mobile);
    const stick = await mobile.locator('#joystick').boundingBox(), wheelie = await mobile.locator('#wheelie-button').boundingBox(), boost = await mobile.locator('#boost-button').boundingBox();
    assert(wheelie.x >= 0 && wheelie.y + wheelie.height <= 844);
    const thumb = { id: 1, x: stick.x + stick.width / 2 + 30, y: stick.y + stick.height / 2 };
    const brake = { id: 2, x: wheelie.x + wheelie.width / 2, y: wheelie.y + wheelie.height / 2 };
    const gas = { id: 3, x: boost.x + boost.width / 2, y: boost.y + boost.height / 2 };
    await mobile.evaluate(() => { window.__GRID_TEST__.arena.player.length = 500; });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [thumb] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [thumb, gas] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [thumb, gas, brake] });
    await mobile.waitForFunction(() => window.__GRID_TEST__.arena.player.wheelieActive);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [brake] });
    try {
      await mobile.waitForFunction(() => !window.__GRID_TEST__.arena.player.wheelieActive && window.__GRID_TEST__.arena.player.boost, {}, { timeout: 3000 });
    } catch (error) {
      console.log(await mobile.evaluate(() => ({ audit: window.pointerAudit, snapshot: window.__GRID_TEST__.snapshot() })));
      throw error;
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await screenshot(mobile, 'mobile-play');
    await mobile.setViewportSize({ width: 844, height: 390 });
    await mobile.locator('#pause-button').click(); await mobile.locator('#quit').click();
    await screenshot(mobile, 'landscape-menu');
    const landscapePlay = await mobile.locator('#play').boundingBox(); assert(landscapePlay.y + landscapePlay.height <= 390);
    await play(mobile); await screenshot(mobile, 'landscape-play');
    assert.deepEqual(errors, []);
    console.log('PASS Classic preserved, separate Arcade scores, top-down camera, timed wheelie and frozen trail, left/right pivot, 90-degree mode, all routes both ways, visible underground/overpass cutaways, loop inversion, touch multi-input and portrait/landscape.', { routes, underneath, underground, loop, out });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
