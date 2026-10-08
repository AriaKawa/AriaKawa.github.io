import {
  CELLS,
  HEX_R,
  HEX_Y,
  point,
  onBoard,
  definition,
  UNIT,
  hexDistance,
  rng,
} from "./engine.mjs";
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.images = {};
    this.camera = { x: 455, y: 475, z: 1 };
    this.target = { ...this.camera };
    this.width = 0;
    this.height = 0;
    this.hover = null;
    this.selected = null;
    this.grid = false;
    this.effects = [];
    this.roadCache = new Map();
    this.time = 0;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.resize();
  }
  async load(progress) {
    const files = [
      "terrain.webp",
      "vfx.png",
      "rats-units.png",
      "wolves-units.png",
      ...["rats", "wolves"].flatMap((c) =>
        Array.from({ length: 9 }, (_, i) => `${c}-building-${i}.png`),
      ),
    ];
    let done = 0;
    await Promise.all(
      files.map(async (name) => {
        const img = new Image();
        img.src = "assets/" + name;
        await img.decode();
        this.images[name] = img;
        progress(++done / files.length);
      }),
    );
  }
  resize() {
    this.width = innerWidth;
    this.height = innerHeight;
    this.dpr = Math.min(2, devicePixelRatio || 1);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.imageSmoothingEnabled = false;
  }
  layout(battle = false) {
    const narrow = this.width <= 800;
    const right = battle ? 0 : narrow ? (this.width <= 480 ? 120 : 160) : 240;
    const available = this.width - right;
    let scale = battle
      ? Math.min((this.width - 55) / 1800, (this.height - 140) / 690)
      : Math.min((available - 25) / 790, (this.height - 140) / 630);
    if (!battle && this.width < 600 && this.height > this.width)
      scale = (this.height - 120) / 900;
    if (!battle && this.height < 500 && this.width > 600)
      scale = Math.min((available - 20) / 750, (this.height - 100) / 470);
    return {
      cx: available / 2,
      cy: this.height * 0.51,
      scale: Math.max(0.28, scale) * this.camera.z,
    };
  }
  screen(p, battle = false) {
    const l = this.layout(battle);
    return {
      x: (p.x - this.camera.x) * l.scale + l.cx,
      y: (p.y - this.camera.y) * l.scale + l.cy,
    };
  }
  world(x, y, battle = false) {
    const l = this.layout(battle);
    return {
      x: (x - l.cx) / l.scale + this.camera.x,
      y: (y - l.cy) / l.scale + this.camera.y,
    };
  }
  hit(x, y) {
    const p = this.world(x, y);
    let closest = null,
      dist = Infinity;
    for (const c of CELLS) {
      const at = point(c.q, c.r);
      const d = Math.hypot(p.x - at.x, (p.y - at.y) / HEX_Y);
      if (d < dist) {
        dist = d;
        closest = c;
      }
    }
    return dist <= HEX_R ? closest : null;
  }
  reset(battle = false) {
    this.target = { x: battle ? 900 : 455, y: 490, z: 1 };
  }
  zoom(delta) {
    this.target.z = Math.max(0.72, Math.min(2.3, this.target.z + delta));
  }
  burst(q, r) {
    const p = point(q, r);
    this.effects.push({ x: p.x, y: p.y, life: 1, max: 1 });
  }
  draw(state, sim, dt) {
    this.time += dt;
    const { ctx: c, width: w, height: h } = this;
    const battle = !!sim;
    const lerp = this.reduced ? 1 : Math.min(1, dt * 6);
    for (const k of ["x", "y", "z"])
      this.camera[k] += (this.target[k] - this.camera[k]) * lerp;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    c.fillStyle = "#14252b";
    c.fillRect(0, 0, w, h);
    const backdrop = this.images["terrain.webp"];
    if (backdrop) {
      const cover = Math.max(w / backdrop.width, h / backdrop.height);
      c.globalAlpha = 0.28;
      c.drawImage(
        backdrop,
        (w - backdrop.width * cover) / 2,
        (h - backdrop.height * cover) / 2,
        backdrop.width * cover,
        backdrop.height * cover,
      );
      c.globalAlpha = 1;
    }
    const l = this.layout(battle);
    c.translate(l.cx, l.cy);
    c.scale(l.scale, l.scale);
    c.translate(-this.camera.x, -this.camera.y);
    c.imageSmoothingEnabled = false;
    const terrain = this.images["terrain.webp"];
    if (terrain) c.drawImage(terrain, -40, -30, 1880, 1060);
    if (!state) return;
    this.drawRoads(state, 0);
    if (sim && state.opponent)
      this.drawRoads(
        { ...state.opponent, buildings: state.opponent.buildings },
        1,
      );
    if (!battle) this.drawGrid(state);
    const objects = [
      { hq: true, q: 0, r: 0, side: 0, clan: state.clan },
      ...onBoard(state).map((b) => ({ ...b, side: 0, clan: state.clan })),
    ];
    if (sim && state.opponent) {
      objects.push(
        { hq: true, q: 0, r: 0, side: 1, clan: state.opponent.clan },
        ...state.opponent.buildings.map((b) => ({
          ...b,
          q: -b.q,
          r: -b.r,
          side: 1,
          clan: state.opponent.clan,
        })),
      );
    }
    const renderObjects = objects.map((b) => ({
      kind: "building",
      b,
      y: point(b.q, b.r, b.side).y,
    }));
    if (sim) {
      for (const u of sim.units)
        if (u.hp > 0 || u.dead > 0)
          renderObjects.push({ kind: "unit", u, y: u.y });
    } else {
      for (const b of onBoard(state)) {
        const d = definition(state.clan, b.type);
        if (d.kind !== "unit") continue;
        const t = UNIT[d.unit],
          p = point(b.q, b.r);
        const n = Math.min(3, d.count);
        for (let i = 0; i < n; i++) {
          const angle = this.time * 0.22 + i * 2.8 + b.uid * 0.7;
          renderObjects.push({
            kind: "idle",
            u: {
              ...t,
              type: d.unit,
              clan: state.clan,
              side: 0,
              x: p.x + Math.cos(angle) * 35,
              y: p.y + 21 + Math.sin(angle) * 10,
              facing: Math.cos(angle) > 0 ? 1 : -1,
              star: b.star,
            },
            y: p.y + 25,
          });
        }
      }
    }
    renderObjects.sort((a, b) => a.y - b.y);
    for (const o of renderObjects) {
      if (o.kind === "building") this.drawBuilding(o.b, battle);
      else this.drawUnit(o.u, sim, o.kind === "idle");
    }
    if (!battle && this.selected) {
      const b = state.buildings.find((x) => x.uid === this.selected);
      if (b && this.hover) {
        const p = point(this.hover.q, this.hover.r),
          valid = this.hover.q !== 0 || this.hover.r !== 0;
        this.hex(p, valid ? "#cbd993" : "#df9990", 0.16, 2);
        const img =
          this.images[
            `${state.clan}-building-${definition(state.clan, b.type).art}.png`
          ];
        c.globalAlpha = 0.55;
        this.sprite(img, p.x, p.y + 12, 93);
        c.globalAlpha = 1;
      }
    }
    if (sim) this.drawCombat(sim);
    this.effects = this.effects.filter((e) => (e.life -= dt) > 0);
    for (const e of this.effects) {
      c.globalAlpha = e.life;
      c.strokeStyle = "#e5dfad";
      c.lineWidth = 2;
      c.beginPath();
      c.ellipse(
        e.x,
        e.y,
        60 * (1 - e.life) + 15,
        35 * (1 - e.life) + 8,
        0,
        0,
        Math.PI * 2,
      );
      c.stroke();
      c.globalAlpha = 1;
    }
    // Quiet ambient fireflies and drifting leaves.
    if (!this.reduced)
      for (let i = 0; i < 28; i++) {
        const x = 50 + ((i * 157) % 1700) + Math.sin(this.time * 0.2 + i) * 18,
          y = 80 + ((i * 97) % 810) + Math.cos(this.time * 0.3 + i) * 16;
        c.globalAlpha = 0.1 + Math.max(0, Math.sin(this.time + i * 2)) * 0.3;
        c.fillStyle = i % 3 ? "#eddb97" : "#b6d9b2";
        c.fillRect(x, y, 2, 2);
      }
    c.globalAlpha = 1;
    c.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const shade = c.createRadialGradient(
      w * 0.44,
      h * 0.45,
      h * 0.15,
      w * 0.45,
      h * 0.48,
      Math.max(w, h) * 0.69,
    );
    shade.addColorStop(0, "#06111800");
    shade.addColorStop(1, "#061118b0");
    c.fillStyle = shade;
    c.fillRect(0, 0, w, h);
  }
  sprite(img, x, y, width, alpha = 1) {
    if (!img) return;
    const c = this.ctx,
      h = (width * img.height) / img.width;
    c.globalAlpha = alpha;
    c.drawImage(
      img,
      Math.round(x - width / 2),
      Math.round(y - h),
      Math.round(width),
      Math.round(h),
    );
    c.globalAlpha = 1;
  }
  hex(p, color, alpha = 0.1, line = 1) {
    const c = this.ctx;
    c.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6,
        x = p.x + Math.cos(a) * HEX_R * 0.96,
        y = p.y + Math.sin(a) * HEX_R * HEX_Y * 0.96;
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath();
    c.fillStyle = color;
    c.globalAlpha = alpha;
    c.fill();
    c.globalAlpha = Math.min(0.7, alpha * 3);
    c.strokeStyle = color;
    c.lineWidth = line;
    c.stroke();
    c.globalAlpha = 1;
  }
  drawGrid(state) {
    const c = this.ctx;
    const b = state.buildings.find((x) => x.uid === this.selected);
    for (const cell of CELLS) {
      if (cell.q === 0 && cell.r === 0) continue;
      const p = point(cell.q, cell.r),
        occupied = state.buildings.find(
          (x) => x.q === cell.q && x.r === cell.r,
        );
      if (this.grid || b) {
        this.hex(
          p,
          occupied ? "#b0ba94" : "#d6dcba",
          occupied ? 0.035 : 0.055,
          0.8,
        );
      }
      if (this.hover?.q === cell.q && this.hover?.r === cell.r)
        this.hex(p, "#e1dfb0", 0.15, 1.5);
      if (
        b?.q !== null &&
        b &&
        definition(state.clan, b.type).kind === "support" &&
        hexDistance(b, cell) <= 1
      )
        this.hex(p, "#8ee3d0", 0.16, 1.5);
    }
  }
  drawBuilding(b, battle) {
    const c = this.ctx,
      p = point(b.q, b.r, b.side);
    const d = b.hq ? { art: 0, kind: "hq" } : definition(b.clan, b.type);
    const img = this.images[`${b.clan}-building-${d.art}.png`];
    const width = b.hq ? 137 : 87 + (b.star - 1) * 9;
    c.fillStyle = "#18201655";
    c.beginPath();
    c.ellipse(p.x, p.y + 9, width * 0.42, width * 0.14, 0, 0, Math.PI * 2);
    c.fill();
    if (!battle && b.uid === this.selected) this.hex(p, "#e1d39c", 0.2, 2);
    this.sprite(img, p.x, p.y + 18, width, battle ? 0.64 : 1);
    if (!battle && !b.hq) {
      c.font = "bold 9px sans-serif";
      c.textAlign = "center";
      c.fillStyle = "#122027d9";
      c.fillRect(p.x - 17, p.y + 18, 34, 15);
      c.strokeStyle = "#9ba58777";
      c.lineWidth = 1;
      c.strokeRect(p.x - 17, p.y + 18, 34, 15);
      c.fillStyle = "#e3cf8d";
      c.fillText("★".repeat(b.star), p.x, p.y + 29);
    }
    if (!battle && b.hq) {
      c.fillStyle = "#17292ac0";
      c.beginPath();
      c.moveTo(p.x - 12, p.y + 24);
      c.lineTo(p.x + 12, p.y + 24);
      c.lineTo(p.x + 12, p.y + 36);
      c.lineTo(p.x, p.y + 44);
      c.lineTo(p.x - 12, p.y + 36);
      c.closePath();
      c.fill();
      c.font = "12px serif";
      c.fillStyle = "#d9c890";
      c.textAlign = "center";
      c.fillText("♜", p.x, p.y + 37);
    }
  }
  drawUnit(u, sim, idle = false) {
    const c = this.ctx,
      img = this.images[`${u.clan}-units.png`];
    if (!img) return;
    let frame = idle
      ? 0
      : u.attack > 0
        ? 3 + Math.min(2, Math.floor(((0.38 - u.attack) / 0.38) * 3))
        : u.moving
          ? 1 + (Math.floor(this.time * 9 + u.id) % 2)
          : 0;
    const fw = img.width / 6,
      fh = img.height / 4;
    let size = u.size * (idle ? 0.82 : 1.14);
    const bob = idle
      ? Math.sin(this.time * 2 + u.x) * 0.6
      : u.moving
        ? Math.sin(this.time * 19 + u.id) * 1.5
        : 0;
    c.globalAlpha = u.hp <= 0 ? u.dead / 0.7 : 1;
    c.fillStyle = "#09181955";
    c.beginPath();
    c.ellipse(u.x, u.y, size * 0.31, size * 0.09, 0, 0, Math.PI * 2);
    c.fill();
    if (u.buff > 1 && !idle) {
      c.strokeStyle = "#a7dcef77";
      c.lineWidth = 1;
      c.beginPath();
      c.ellipse(u.x, u.y, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
      c.stroke();
    }
    c.save();
    c.translate(Math.round(u.x), Math.round(u.y + bob));
    c.scale(u.facing, 1);
    if (u.flash > 0) c.filter = "brightness(1.7)";
    if (u.type === "guard" || u.type === "guardian")
      c.filter = "saturate(.4) brightness(1.25)";
    c.drawImage(
      img,
      frame * fw,
      u.art * fh,
      fw,
      fh,
      -size * 0.65,
      -size * 1.05,
      size * 1.3,
      size * 1.3,
    );
    c.restore();
    c.globalAlpha = 1;
    if (!idle && u.hp > 0) {
      const width = Math.max(20, size * 0.67);
      c.fillStyle = "#12222ddd";
      c.fillRect(u.x - width / 2, u.y - size * 1.02, width, 4);
      c.fillStyle = u.side === 0 ? "#b7d18c" : "#db8e89";
      c.fillRect(
        u.x - width / 2,
        u.y - size * 1.02,
        (width * u.hp) / u.maxHP,
        3,
      );
      if (u.poison > 0) {
        c.fillStyle = "#bcde76";
        c.fillRect(u.x + width / 2 + 2, u.y - size * 1.02, 3, 3);
      }
    }
  }
  drawCombat(sim) {
    const c = this.ctx,
      img = this.images["vfx.png"];
    for (const p of sim.projectiles) {
      c.strokeStyle =
        p.kind === "poison"
          ? "#bfe576"
          : p.kind === "moon"
            ? "#b2edfc"
            : "#e6d4a4";
      c.lineWidth = p.kind === "arrow" ? 2 : 4;
      c.beginPath();
      c.moveTo(p.x, p.y);
      const angle = Math.atan2(p.ty - p.y, p.tx - p.x);
      c.lineTo(p.x - Math.cos(angle) * 15, p.y - Math.sin(angle) * 15);
      c.stroke();
    }
    for (const e of sim.events) {
      const age = 1 - e.life / e.max;
      c.globalAlpha = Math.min(1, e.life * 3);
      if (e.type === "text") {
        c.textAlign = "center";
        c.font = "bold 13px monospace";
        c.fillStyle = "#132127";
        c.fillText(e.text, e.x + 1, e.y - age * 23 + 1);
        c.fillStyle = e.color;
        c.fillText(e.text, e.x, e.y - age * 23);
      } else if (img) {
        const row =
          e.type === "slash" || e.type === "spark"
            ? 0
            : e.type === "poison" || e.type === "summon"
              ? 1
              : e.type === "moon"
                ? 2
                : 3;
        const frame = Math.min(3, Math.floor(age * 4)),
          sz =
            e.type === "howl" || e.type === "heal"
              ? (e.radius || 60) * 2
              : e.type === "slash"
                ? 53
                : (e.radius || 25) * 2.2;
        c.drawImage(
          img,
          (frame * img.width) / 4,
          (row * img.height) / 4,
          img.width / 4,
          img.height / 4,
          e.x - sz / 2,
          e.y - sz * 0.65,
          sz,
          sz * 0.8,
        );
      }
      c.globalAlpha = 1;
    }
  }
  drawRoads(state, side) {
    const bs = [{ q: 0, r: 0 }, ...state.buildings.filter((b) => b.q !== null)];
    const key =
      side +
      ":" +
      bs
        .map((b) => b.q + "," + b.r)
        .sort()
        .join(";");
    let roads = this.roadCache.get(key);
    if (!roads) {
      roads = makeRoads(bs, side);
      this.roadCache.set(key, roads);
      if (this.roadCache.size > 40)
        this.roadCache.delete(this.roadCache.keys().next().value);
    }
    const c = this.ctx;
    c.lineCap = "round";
    c.lineJoin = "round";
    for (const [color, width] of [
      ["#645b3540", 16],
      ["#8e7e5055", 12],
      ["#a28c5d70", 8],
    ]) {
      c.strokeStyle = color;
      c.lineWidth = width;
      for (const path of roads) {
        c.beginPath();
        path.forEach((p, i) => {
          if (!i) c.moveTo(p.x, p.y);
          else if (i < path.length - 1) {
            const next = path[i + 1];
            c.quadraticCurveTo(
              p.x,
              p.y,
              (p.x + next.x) / 2,
              (p.y + next.y) / 2,
            );
          } else c.lineTo(p.x, p.y);
        });
        c.stroke();
      }
    }
    c.fillStyle = "#d5bd812c";
    for (const path of roads)
      for (let i = 1; i < path.length; i++) {
        const a = path[i - 1],
          b = path[i],
          n = Math.ceil(Math.hypot(a.x - b.x, a.y - b.y) / 12);
        for (let j = 0; j < n; j++) {
          const t = j / n;
          c.fillRect(
            a.x + (b.x - a.x) * t - 1,
            a.y + (b.y - a.y) * t - 1,
            3,
            2,
          );
        }
      }
  }
}
// Roads share the hex boundaries, so they never run through a building footprint.
export function makeRoads(buildings, side = 0) {
  const vertices = new Map(),
    adj = new Map(),
    corners = new Map();
  const id = (p) => `${Math.round(p.x)},${Math.round(p.y)}`;
  const add = (p) => {
    const k = id(p);
    if (!vertices.has(k)) {
      vertices.set(k, p);
      adj.set(k, new Set());
    }
    return k;
  };
  for (const cell of CELLS) {
    const p = point(cell.q, cell.r, side),
      keys = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      keys.push(
        add({
          x: p.x + Math.cos(a) * HEX_R,
          y: p.y + Math.sin(a) * HEX_R * HEX_Y,
        }),
      );
    }
    corners.set(cell.q + "," + cell.r, keys);
    for (let i = 0; i < 6; i++) {
      adj.get(keys[i]).add(keys[(i + 1) % 6]);
      adj.get(keys[(i + 1) % 6]).add(keys[i]);
    }
  }
  const connected = new Set(),
    paths = [];
  const transformed = buildings.map((b) => ({
    ...b,
    q: side ? -b.q : b.q,
    r: side ? -b.r : b.r,
  }));
  transformed.sort(
    (a, b) => hexDistance(a, { q: 0, r: 0 }) - hexDistance(b, { q: 0, r: 0 }),
  );
  for (const b of transformed) {
    const p = point(b.q, b.r, side),
      keys = corners.get(b.q + "," + b.r);
    if (!keys) continue;
    const start = keys[2];
    paths.push([{ x: p.x, y: p.y + 17 }, vertices.get(start)]);
    if (!connected.size) {
      connected.add(start);
      continue;
    }
    const costs = new Map([[start, 0]]),
      prev = new Map(),
      open = new Set([start]);
    let end = null;
    while (open.size) {
      let current = [...open].reduce((a, k) =>
        costs.get(k) < costs.get(a) ? k : a,
      );
      open.delete(current);
      if (connected.has(current)) {
        end = current;
        break;
      }
      for (const next of adj.get(current)) {
        const a = vertices.get(current),
          z = vertices.get(next),
          cost = costs.get(current) + Math.hypot(a.x - z.x, a.y - z.y);
        if (cost < (costs.get(next) ?? Infinity)) {
          costs.set(next, cost);
          prev.set(next, current);
          open.add(next);
        }
      }
    }
    if (end) {
      const path = [];
      let k = end;
      while (k) {
        path.push(vertices.get(k));
        connected.add(k);
        k = prev.get(k);
      }
      paths.push(path);
    }
  }
  return paths;
}
