import * as E from "./engine.mjs";
import { Renderer } from "./render.mjs";
import { matchmaking, ping } from "./network.mjs";
const $ = (id) => document.getElementById(id),
  SAVE = "burrow-fang-run-v1";
const renderer = new Renderer($("world"));
let state = null,
  preview = E.newGame("rats", 517),
  sim = null,
  selected = null,
  chosenClan = "rats",
  busy = false,
  paused = false,
  speed = 1,
  lastTime = 0,
  accumulator = 0,
  resultDelay = 0,
  sound = true,
  audio = null,
  toastTimer,
  storageWarned = false,
  online = false;
try {
  state = E.restore(localStorage.getItem(SAVE));
  sound = localStorage.getItem("burrow-fang-sound") !== "off";
  if (state) chosenClan = state.clan;
} catch {}
const rarity = ["", "#b6baaa", "#8cae8f", "#88adca", "#b09bd0", "#e2c17a"];
function save() {
  if (!state) return;
  try {
    localStorage.setItem(SAVE, JSON.stringify(state));
  } catch {
    if (!storageWarned) {
      storageWarned = true;
      toast("Saving unavailable in this browser");
    }
  }
}
function toast(text) {
  $("toast").textContent = text;
  $("toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("toast").classList.remove("visible"), 2400);
}
function beep(kind = "click") {
  if (!sound) return;
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === "suspended") audio.resume();
    const o = audio.createOscillator(),
      g = audio.createGain(),
      now = audio.currentTime;
    const notes = {
      click: [380, 240, 0.045],
      buy: [540, 810, 0.1],
      place: [280, 520, 0.09],
      merge: [520, 1050, 0.22],
      error: [180, 110, 0.12],
      victory: [600, 900, 0.35],
      loss: [240, 140, 0.3],
      hit: [110, 60, 0.04],
    };
    const [a, b, d] = notes[kind] || notes.click;
    o.type = kind === "hit" ? "triangle" : "sine";
    o.frequency.setValueAtTime(a, now);
    o.frequency.exponentialRampToValueAtTime(b, now + d);
    g.gain.setValueAtTime(kind === "hit" ? 0.018 : 0.055, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + d);
    o.connect(g).connect(audio.destination);
    o.start(now);
    o.stop(now + d);
  } catch {}
}
function err(message) {
  toast(message);
  beep("error");
}
function commit() {
  save();
  update();
}
function clearSelected() {
  selected = null;
  renderer.selected = null;
  $("selection").hidden = true;
  $("hint").textContent = "";
  updateReserve();
}
function select(uid) {
  if (state?.phase !== "build" || busy) return;
  selected = uid;
  renderer.selected = uid;
  beep();
  updateSelection();
  updateReserve();
}
function updateSelection() {
  const b = state?.buildings.find((x) => x.uid === selected);
  if (!b) {
    clearSelected();
    return;
  }
  const d = E.definition(state.clan, b.type),
    stars = "★".repeat(b.star);
  $("selection").hidden = false;
  $("selection").innerHTML =
    `<div class="selection-header"><h3>${d.name}</h3><span class="stars">${stars}</span></div><p>${describe(d, b.star)}</p><div class="selection-actions">${b.q !== null ? '<button id="stash">Reserve</button>' : ""}<button id="sell">Sell <i class="coin"></i>${E.sellPrice(state, b)}</button><button id="cancel-select" aria-label="Cancel selection">×</button></div><small>${b.q === null ? "Choose a hex" : "Choose a hex to move"}</small>`;
  $("sell").onclick = () => {
    E.sell(state, b.uid);
    clearSelected();
    beep("buy");
    commit();
  };
  if ($("stash"))
    $("stash").onclick = () => {
      const error = E.stash(state, b.uid);
      if (error) return err(error);
      clearSelected();
      commit();
    };
  $("cancel-select").onclick = clearSelected;
  $("hint").textContent =
    b.q === null ? "Choose a hex · Esc to cancel" : "Choose a hex to move";
}
function describe(d, star = 1) {
  if (d.kind === "economy") return `+${d.income * star} gold each round`;
  if (d.kind === "support")
    return `Adjacent units: +${(d.buff === "haste" ? 20 : 25) * star}% ${d.buff === "haste" ? "attack speed" : "health"}`;
  return (
    d.detail + (star > 1 ? ` · ${star === 2 ? "1.85" : "3.5"}× strength` : "")
  );
}
function tip(html, rect) {
  $("tooltip").innerHTML = html;
  $("tooltip").hidden = false;
  const tw = $("tooltip").offsetWidth,
    th = $("tooltip").offsetHeight;
  $("tooltip").style.left =
    Math.max(8, Math.min(innerWidth - tw - 8, rect.left - tw - 12)) + "px";
  $("tooltip").style.top =
    Math.max(
      8,
      Math.min(innerHeight - th - 8, rect.top + rect.height / 2 - th / 2),
    ) + "px";
}
function hideTip() {
  $("tooltip").hidden = true;
}
function updateShop() {
  const shop = $("shop-cards");
  shop.replaceChildren();
  state.shop.forEach((id, i) => {
    const d = E.definition(state.clan, id),
      button = document.createElement("button");
    button.className = "shop-card";
    button.dataset.slot = i;
    if (!d) {
      button.classList.add("sold");
      button.textContent = "—";
      button.disabled = true;
      button.setAttribute("aria-label", "Sold building");
    } else {
      button.style.setProperty("--rarity", rarity[d.cost]);
      button.classList.toggle("unaffordable", state.gold < d.cost);
      button.setAttribute("aria-label", `Buy ${d.name}, ${d.cost} gold`);
      button.innerHTML = `<img src="assets/${state.clan}-building-${d.art}.png" alt=""><span class="card-copy"><strong>${d.name}</strong><small><i class="coin"></i>${d.cost}<span class="card-kind">${d.kind === "unit" ? "⚔" : d.kind === "economy" ? "◈" : "✧"}</span></small></span>`;
      button.onclick = () => {
        if (busy) return;
        hideTip();
        const result = E.buy(state, i);
        if (result.error) return err(result.error);
        beep(result.merged.length ? "merge" : "buy");
        if (result.merged.length) {
          toast("Merged · " + d.name);
          for (const uid of result.merged) {
            const b = state.buildings.find((x) => x.uid === uid);
            if (b?.q !== null) renderer.burst(b.q, b.r);
          }
        }
        commit();
        if (result.building?.q === null) select(result.building.uid);
        else clearSelected();
      };
      button.onmouseenter = () =>
        tip(
          `<strong>${d.name}</strong>${describe(d)}<br><span class="muted">${d.kind[0].toUpperCase() + d.kind.slice(1)} · ${d.cost} gold</span>`,
          button.getBoundingClientRect(),
        );
      button.onmouseleave = hideTip;
      button.onfocus = button.onmouseenter;
      button.onblur = hideTip;
    }
    shop.append(button);
  });
  $("reroll").disabled = state.gold < 2 || busy;
  $("lock").textContent = state.locked ? "◆" : "◇";
  $("lock").classList.toggle("locked", state.locked);
  $("lock").setAttribute("aria-pressed", String(state.locked));
}
function updateReserve() {
  if (!state) return;
  const items = E.bench(state),
    container = $("reserve");
  container.replaceChildren();
  for (let i = 0; i < 8; i++) {
    const b = items[i],
      button = document.createElement("button");
    button.className = "reserve-slot";
    if (b) {
      const d = E.definition(state.clan, b.type);
      button.innerHTML = `<img src="assets/${state.clan}-building-${d.art}.png" alt=""><small>${"★".repeat(b.star)}</small>`;
      button.classList.toggle("active", selected === b.uid);
      button.setAttribute(
        "aria-label",
        `${d.name}, ${b.star} star, reserve ${i + 1}`,
      );
      button.onclick = () => select(b.uid);
    } else {
      button.setAttribute("aria-label", `Empty reserve ${i + 1}`);
      button.onclick = () => {
        if (selected) {
          const error = E.stash(state, selected);
          if (error) return err(error);
          clearSelected();
          commit();
        }
      };
    }
    container.append(button);
  }
  $("reserve-count").textContent = `${items.length} / 8`;
}
function update() {
  if (!state) return;
  const build = state.phase === "build";
  $("game").hidden = false;
  $("gold").textContent = state.gold;
  $("hp").textContent = state.hp;
  $("round").textContent = `Round ${state.round}`;
  $("phase").textContent =
    state.phase === "battle"
      ? "Battle"
      : state.phase === "end"
        ? "Complete"
        : "Build";
  $("clan-name").textContent = state.clan === "rats" ? "Rats" : "Wolves";
  $("clan-icon").src = `assets/${state.clan}-building-0.png`;
  const army = E.armyBuildings(state),
    other = E.onBoard(state).length - army.length;
  const troopCount = army.reduce(
    (n, b) => n + E.definition(state.clan, b.type).count,
    0,
  );
  $("army-count").innerHTML = `⚔ <b>${army.length}/${state.level}</b>`;
  $("support-count").innerHTML = `⌂ <b>${other}/${state.level}</b>`;
  $("troops").innerHTML = `♟ <b>${troopCount}</b>`;
  $("level").textContent = `Lv. ${state.level}`;
  $("xp").textContent =
    state.level === 8 ? "MAX" : `${state.xp} / ${E.XP[state.level]}`;
  $("xp-fill").style.width =
    state.level === 8 ? "100%" : `${(100 * state.xp) / E.XP[state.level]}%`;
  $("level-button").disabled =
    state.gold < 4 || state.level === 8 || !build || busy;
  $("round-track").innerHTML = Array.from(
    { length: 10 },
    (_, i) =>
      `<i class="${i < state.wins ? "won" : i === state.wins ? "current" : ""}"></i>`,
  ).join("");
  $("shop").hidden = !build;
  $("bottom").hidden = !build;
  $("battle-hud").hidden = state.phase !== "battle";
  $("opponent").hidden = !sim;
  $("battle").disabled = busy || army.length === 0;
  $("battle-label").textContent = busy ? "Finding…" : "Battle";
  $("battle-symbol").textContent = busy ? "· · ·" : "➜";
  $("selection").hidden = !build || !selected;
  $("hint").hidden = !build;
  $("grid").disabled = !build;
  if (sim) {
    $("opponent-label").textContent =
      state.opponent.clan === "rats" ? "The Warrens" : "The Moonpack";
    $("opponent-source").textContent =
      state.opponentSource || "Practice village";
  }
  updateShop();
  updateReserve();
  if (selected) updateSelection();
}
function showMenu() {
  hideTip();
  renderer.reset();
  $("menu").hidden = false;
  $("continue").hidden = !state;
  $("continue").textContent =
    state?.phase === "end" ? "View result" : "Continue";
  setChoice(chosenClan);
  $("sound").textContent = sound ? "Sound on" : "Sound off";
}
function setChoice(clan) {
  chosenClan = clan;
  document.querySelectorAll("[data-clan]").forEach((el) => {
    el.classList.toggle("active", el.dataset.clan === clan);
    el.setAttribute("aria-pressed", String(el.dataset.clan === clan));
  });
  preview = E.newGame(clan, 517);
  preview.buildings.push(
    E.makeBuilding(preview, "market", -1, 1),
    E.makeBuilding(preview, "mage", 1, -1),
    E.makeBuilding(preview, "totem", -1, 0),
    E.makeBuilding(preview, "farm", -2, 1),
  );
}
function start() {
  state = E.newGame(chosenClan);
  sim = null;
  selected = null;
  renderer.selected = null;
  renderer.reset();
  $("menu").hidden = true;
  $("result").hidden = true;
  paused = false;
  busy = false;
  commit();
  beep("place");
  $("hint").textContent = "Buy a building · choose a hex";
  setTimeout(() => {
    if (!selected) $("hint").textContent = "";
  }, 6000);
}
function resume() {
  if (!state) return;
  $("menu").hidden = true;
  renderer.reset(!!sim);
  if (state.phase === "battle" && !sim) launchBattle();
  else if (["result", "end"].includes(state.phase)) showResult();
  update();
}
async function battle() {
  if (!state || state.phase !== "build" || busy) return;
  if (!E.armyBuildings(state).length) return err("Place a unit building first");
  const pendingState = state;
  busy = true;
  clearSelected();
  hideTip();
  update();
  beep();
  try {
    const match = await matchmaking(pendingState);
    if (state !== pendingState) return;
    state.opponent = match.opponent;
    state.opponentSource = match.source;
    setNetwork(match.online && match.published);
    state.battleSeed = (state.seed ^ (state.round * 877)) >>> 0;
    state.phase = "battle";
    save();
    launchBattle();
  } catch {
    if (state !== pendingState) return;
    state.opponent = E.makeOpponent(state);
    state.opponentSource = "Practice village";
    state.battleSeed = (state.seed ^ (state.round * 877)) >>> 0;
    state.phase = "battle";
    save();
    launchBattle();
  } finally {
    if (state === pendingState) {
      busy = false;
      update();
    }
  }
}
function launchBattle() {
  sim = E.createBattle(E.snapshot(state), state.opponent, state.battleSeed);
  renderer.reset(true);
  renderer.target.z = innerWidth < 800 ? 1.8 : 1.25;
  paused = false;
  speed = 1;
  accumulator = 0;
  resultDelay = 0;
  $("speed").textContent = "1×";
  $("pause").textContent = "Ⅱ";
  $("pause").setAttribute("aria-label", "Pause battle");
  $("result").hidden = true;
  update();
}
function showResult() {
  const r = state.lastResult;
  if (!r) return;
  const ended = state.phase === "end";
  $("result").hidden = false;
  $("result-emblem").textContent =
    ended && state.wins >= 10 ? "♛" : r.won ? "✦" : r.draw ? "◇" : "✧";
  $("result-title").textContent = ended
    ? state.wins >= 10
      ? "Reign secured"
      : state.hp <= 0
        ? "Village fallen"
        : "Journey complete"
    : r.won
      ? "Victory"
      : r.draw
        ? "Draw"
        : "Defeat";
  $("result-score").textContent =
    `${state.wins} victories · ${state.hp} health`;
  const names = {
    base: "Round income",
    interest: "Interest",
    economy: "Buildings",
    streak: "Streak",
    victory: "Victory",
  };
  $("earnings").innerHTML =
    Object.entries(r.earnings)
      .filter(([, n]) => n > 0)
      .map(([k, n]) => `<div><span>${names[k]}</span><b>+${n}</b></div>`)
      .join("") +
    `<div class="total"><span>Gold earned</span><b>+${Object.values(r.earnings).reduce((a, b) => a + b, 0)}</b></div>`;
  $("next").textContent = ended ? "New village" : "Next round →";
}
function setNetwork(value) {
  online = value;
  $("network").classList.toggle("online", value);
  $("network").title = value
    ? "Saved armies connected"
    : "Practice available · saved armies offline";
}
function reroll() {
  if (!state || busy || !$("menu").hidden) return;
  const error = E.roll(state);
  if (error) return err(error);
  beep();
  commit();
}
function buyXP() {
  if (!state || busy || !$("menu").hidden) return;
  const old = state.level,
    error = E.buyXP(state);
  if (error) return err(error);
  beep(old !== state.level ? "merge" : "buy");
  if (old !== state.level) toast(`Level ${state.level}`);
  commit();
}
function toggleGrid() {
  renderer.grid = !renderer.grid;
  $("grid").classList.toggle("active", renderer.grid);
  $("grid").setAttribute("aria-pressed", String(renderer.grid));
}
function openHelp() {
  hideTip();
  $("help").showModal();
}
$("start").onclick = () => {
  beep();
  if (state && state.phase !== "end") $("confirm").showModal();
  else start();
};
$("confirm-new").onclick = () => {
  $("confirm").close();
  start();
};
$("cancel-new").onclick = () => $("confirm").close();
$("continue").onclick = resume;
$("clan-badge").onclick = showMenu;
$("menu-button").onclick = showMenu;
document.querySelectorAll("[data-clan]").forEach(
  (button) =>
    (button.onclick = () => {
      beep();
      setChoice(button.dataset.clan);
    }),
);
$("reroll").onclick = reroll;
$("level-button").onclick = buyXP;
$("lock").onclick = () => {
  if (!state || busy) return;
  state.locked = !state.locked;
  beep();
  commit();
};
$("battle").onclick = battle;
$("next").onclick = () => {
  beep();
  $("result").hidden = true;
  sim = null;
  renderer.reset();
  if (state.phase === "end") {
    showMenu();
    return;
  }
  E.nextRound(state);
  commit();
};
$("pause").onclick = () => {
  paused = !paused;
  $("pause").textContent = paused ? "▶" : "Ⅱ";
  $("pause").setAttribute(
    "aria-label",
    paused ? "Resume battle" : "Pause battle",
  );
};
$("speed").onclick = () => {
  speed = speed === 1 ? 2 : speed === 2 ? 3 : 1;
  $("speed").textContent = speed + "×";
};
$("grid").onclick = toggleGrid;
$("recenter").onclick = () => renderer.reset(!!sim);
$("zoom-in").onclick = () => renderer.zoom(0.15);
$("zoom-out").onclick = () => renderer.zoom(-0.15);
$("help-button").onclick = openHelp;
$("menu-help").onclick = openHelp;
document.querySelector(".dialog-close").onclick = () => $("help").close();
$("sound").onclick = () => {
  sound = !sound;
  try {
    localStorage.setItem("burrow-fang-sound", sound ? "on" : "off");
  } catch {}
  $("sound").textContent = sound ? "Sound on" : "Sound off";
  beep();
};
$("gold-button").onclick = () => {
  const inc = E.income(state);
  tip(
    `<strong>Next round</strong>Base +5<br>Interest +${inc.interest}<br>Buildings +${inc.economy}<br>Streak +${inc.streak}<br><span class="muted">Victory adds 1 gold.</span>`,
    $("gold-button").getBoundingClientRect(),
  );
};
$("gold-button").onmouseleave = hideTip;
let pointer = null;
$("world").addEventListener("pointerdown", (e) => {
  if (!$("menu").hidden || !$("result").hidden) return;
  pointer = {
    id: e.pointerId,
    x: e.clientX,
    y: e.clientY,
    lastX: e.clientX,
    lastY: e.clientY,
    drag: false,
  };
  $("world").setPointerCapture(e.pointerId);
  hideTip();
});
$("world").addEventListener("pointermove", (e) => {
  renderer.hover = renderer.hit(e.clientX, e.clientY);
  if (!pointer || pointer.id !== e.pointerId) return;
  if (Math.hypot(e.clientX - pointer.x, e.clientY - pointer.y) > 8)
    pointer.drag = true;
  if (pointer.drag) {
    const l = renderer.layout(!!sim);
    renderer.target.x = Math.max(
      100,
      Math.min(1700, renderer.target.x - (e.clientX - pointer.lastX) / l.scale),
    );
    renderer.target.y = Math.max(
      180,
      Math.min(800, renderer.target.y - (e.clientY - pointer.lastY) / l.scale),
    );
    renderer.camera.x = renderer.target.x;
    renderer.camera.y = renderer.target.y;
  }
  pointer.lastX = e.clientX;
  pointer.lastY = e.clientY;
});
$("world").addEventListener("pointerup", (e) => {
  if (!pointer) return;
  const p = pointer;
  pointer = null;
  if (p.drag || !state || state.phase !== "build" || busy) return;
  const cell = renderer.hit(e.clientX, e.clientY);
  if (!cell) {
    clearSelected();
    return;
  }
  if (selected) {
    const b = state.buildings.find((x) => x.uid === selected);
    if (b?.q === cell.q && b?.r === cell.r) {
      clearSelected();
      return;
    }
    const error = E.place(state, selected, cell.q, cell.r);
    if (error) return err(error);
    renderer.burst(cell.q, cell.r);
    clearSelected();
    beep("place");
    commit();
  } else {
    const b = state.buildings.find((x) => x.q === cell.q && x.r === cell.r);
    if (b) select(b.uid);
    else clearSelected();
  }
});
$("world").addEventListener("pointercancel", () => {
  pointer = null;
});
$("world").addEventListener("pointerleave", () => {
  if (!pointer) renderer.hover = null;
});
$("world").addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    renderer.zoom(-Math.sign(e.deltaY) * 0.1);
  },
  { passive: false },
);
$("world").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  clearSelected();
});
addEventListener("resize", () => renderer.resize());
addEventListener("keydown", (e) => {
  if (
    e.target.matches("input,textarea") ||
    document.querySelector("dialog[open]")
  )
    return;
  if (e.key === "Escape") {
    hideTip();
    if (selected) clearSelected();
    else if (!$("menu").hidden && state) resume();
    else showMenu();
    return;
  }
  if (!$("menu").hidden || !$("result").hidden || !state) return;
  if (e.code === "KeyD") reroll();
  if (e.code === "KeyF") buyXP();
  if (e.code === "KeyG") toggleGrid();
  if (e.code === "Space") {
    e.preventDefault();
    if (state.phase === "build") battle();
    else if (sim) $("pause").click();
  }
  if (e.key === "?" || e.key === "h") openHelp();
});
addEventListener("pagehide", save);
document.addEventListener("visibilitychange", () => {
  lastTime = performance.now();
  accumulator = 0;
});
function frame(time) {
  const dt = Math.min(0.08, (time - lastTime) / 1000 || 0);
  lastTime = time;
  const inMenu = !$("menu").hidden;
  if (
    sim &&
    state.phase === "battle" &&
    !paused &&
    !inMenu &&
    !document.hidden &&
    !$("help").open
  ) {
    accumulator += dt * speed;
    let count = 0;
    while (accumulator >= 1 / 60 && count++ < 20 && !sim.done) {
      const before = sim.events.length;
      E.stepBattle(sim, 1 / 60);
      if (sim.events.length > before && Math.random() < 0.12) beep("hit");
      accumulator -= 1 / 60;
    }
    const a = sim.units.filter((u) => u.side === 0 && u.hp > 0).length,
      b = sim.units.filter((u) => u.side === 1 && u.hp > 0).length;
    $("battle-counts").innerHTML =
      `<span style="color:#bdd494">${a}</span> <span style="color:#7f9494;margin:0 12px">⚔</span> <span style="color:#dda09a">${b}</span>`;
    if (sim.done) {
      resultDelay += dt;
      if (resultDelay > 0.9) {
        E.settle(state, sim);
        save();
        update();
        showResult();
        beep(state.lastResult.won ? "victory" : "loss");
      }
    }
  }
  renderer.selected = selected;
  renderer.draw(inMenu ? preview : state || preview, inMenu ? null : sim, dt);
  requestAnimationFrame(frame);
}
async function boot() {
  try {
    await renderer.load((p) => ($("load-progress").value = p));
    $("loading").hidden = true;
    setChoice(chosenClan);
    showMenu();
    if (state) update();
    requestAnimationFrame(frame);
    ping().then(setNetwork);
  } catch (error) {
    $("loading").innerHTML =
      '<span class="loading-mark">B<span>&amp;</span>F</span><p>Art could not load.</p><button class="primary" id="reload">Retry</button>';
    $("reload").onclick = () => location.reload();
    console.error(error);
  }
}
boot();
if (
  ["127.0.0.1", "localhost"].includes(location.hostname) &&
  new URLSearchParams(location.search).has("qa")
)
  window.__game = {
    get state() {
      return state;
    },
    get sim() {
      return sim;
    },
    renderer,
    get busy() {
      return busy;
    },
    get selected() {
      return selected;
    },
    setState(s) {
      state = s;
      sim = null;
      $("menu").hidden = true;
      $("result").hidden = true;
      renderer.reset();
      commit();
    },
    start,
    update,
    save,
    battle,
  };
