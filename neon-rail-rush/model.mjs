export const BASE_SPEED = 24;
export const MAX_SPEED = 56;
export const DISTRICTS = ['SUNSET TERMINAL', 'ELECTRIC AVENUE', 'MIDNIGHT EXPRESS'];
export function randomGenerator(seed) {
  let n = seed >>> 0;
  return () => { n += 0x6D2B79F5; let t = n; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export class Run {
  constructor(seed = Date.now()) {
    this.seed = seed; this.random = randomGenerator(seed);
    this.distance = 0; this.time = 0; this.speed = BASE_SPEED;
    this.lane = 0; this.x = 0; this.y = 0; this.vy = 0; this.slide = 0;
    this.coins = 0; this.shield = false; this.magnet = 0; this.invincible = 0;
    this.dead = false; this.reason = ''; this.entities = []; this.events = [];
    this.nextRow = 75; this.safeLane = 0; this.rows = 0; this.id = 0;
    this.generate();
  }
  get district() { return Math.floor(this.distance / 700) % 3; }
  action(action) {
    if (this.dead) return false;
    if (action === 'left' || action === 'right') {
      const lane = Math.max(-1, Math.min(1, this.lane + (action === 'left' ? -1 : 1)));
      if (lane === this.lane) return false;
      this.lane = lane; this.events.push({type:'step'}); return true;
    }
    if (action === 'jump' && this.y <= 0) {
      this.slide = 0; this.vy = 9.5; this.events.push({type:'jump'}); return true;
    }
    if (action === 'slide') {
      this.y = 0; this.vy = 0; this.slide = 0.85; this.events.push({type:'slide'}); return true;
    }
    return false;
  }
  add(kind, lane, at, extra = {}) {
    const item = {id:++this.id, kind, lane, at, done:false, ...extra};
    this.entities.push(item); return item;
  }
  generate() {
    while (this.nextRow < this.distance + 240) {
      const at = this.nextRow;
      // Neighbouring safe lanes and speed-scaled row spacing guarantee an open route.
      const options = [-1,0,1].filter(lane => Math.abs(lane - this.safeLane) <= 1);
      this.safeLane = options[Math.floor(this.random() * options.length)];
      const other = [-1,0,1].filter(lane => lane !== this.safeLane);
      const count = this.rows > 3 && this.random() > 0.3 ? 2 : 1;
      if (this.random() > 0.5) other.reverse();
      for (const lane of other.slice(0,count)) {
        const kinds = this.rows < 2 ? ['barrier'] : this.rows < 4 ? ['train','barrier'] : ['train','barrier','gate'];
        const kind = kinds[Math.floor(this.random() * kinds.length)];
        this.add(kind,lane,at,{row:this.rows,safeLane:this.safeLane});
        if (kind === 'barrier' && this.rows > 3) this.add('coin',lane,at,{height:1.35});
      }
      for (let n=0;n<5;n++) this.add('coin',this.safeLane,at - 20 + n * 4);
      if (this.rows > 2 && this.rows % 6 === 3) this.add(this.rows % 12 === 3 ? 'shield' : 'magnet',this.safeLane,at + 12);
      const predictedSpeed = Math.min(MAX_SPEED,BASE_SPEED + at / 120);
      this.nextRow += predictedSpeed * (1.42 + this.random() * 0.24);
      this.rows++;
    }
  }
  update(dt) {
    if (this.dead || dt <= 0) return;
    // Bound integration steps; collision tests also sweep over travelled distance.
    dt = Math.min(dt,0.05);
    const before = this.distance;
    this.time += dt; this.speed = Math.min(MAX_SPEED,BASE_SPEED + this.distance / 120);
    this.distance += this.speed * dt;
    this.x += (this.lane - this.x) * Math.min(1,dt * 19);
    this.slide = Math.max(0,this.slide-dt); this.magnet = Math.max(0,this.magnet-dt); this.invincible = Math.max(0,this.invincible-dt);
    if (this.vy !== 0 || this.y > 0) {
      this.y = Math.max(0,this.y + this.vy * dt - 11 * dt * dt); this.vy -= 22 * dt;
      if (this.y === 0) this.vy = 0;
    }
    for (const e of this.entities) {
      if (e.done) continue;
      const ahead = e.at-this.distance, oldAhead = e.at-before;
      const aligned = Math.abs(e.lane-this.x) < 0.56;
      if (e.kind === 'coin' && ((aligned && Math.abs(this.y-(e.height||0)) < 1.1) || this.magnet > 0) && ahead <= (this.magnet > 0 ? 14 : 2.8) && oldAhead >= -2) {
        e.done = true; this.coins++; this.events.push({type:'coin',lane:e.lane}); continue;
      }
      if ((e.kind === 'shield' || e.kind === 'magnet') && aligned && ahead <= 2.8 && oldAhead >= -2) {
        e.done = true; if (e.kind === 'shield') this.shield = true; else this.magnet = 9;
        this.events.push({type:e.kind}); continue;
      }
      if (!['train','barrier','gate'].includes(e.kind)) continue;
      if (ahead <= 1.8 && oldAhead >= -1.8 && aligned) {
        const avoided = (e.kind === 'barrier' && this.y > 0.72) || (e.kind === 'gate' && this.slide > 0 && this.y < 0.2);
        if (!avoided && this.invincible <= 0) {
          e.done = true;
          if (this.shield) { this.shield = false; this.invincible = 1.5; this.events.push({type:'save'}); }
          else { this.dead = true; this.reason = {train:'Dodge trains by changing lanes.',barrier:'Jump over orange barricades.',gate:'Slide under pink gates.'}[e.kind]; this.events.push({type:'crash'}); break; }
        }
      }
      if (ahead < -2) e.done = true;
    }
    this.entities = this.entities.filter(e => e.at-this.distance > -18 && (!e.done || e.kind !== 'coin'));
    this.generate();
  }
}
