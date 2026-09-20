import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../../../server/src/sim/constants';
import { stepPlayer } from '../../../server/src/sim/physics';
import { updateMovingPlatforms } from '../../../server/src/sim/platforms';
import { floodForMap, worldForMap } from '../../../server/src/sim/world';
import { forgeLavaPools, touchesForgeLava } from '../../../server/src/sim/level';
import { platformSurfaceY } from '../../../server/src/sim/platformSurface';
import {standingY} from '../../../server/src/sim/platformGeometry';
import type { InputMessage, Platform, PlayerState } from '../../../server/src/sim/types';
import { stepFlight } from '../game/godPowers';
import {spawnLocations,type SpawnPoint} from '../../../server/src/sim/spawn';
import {EditorBot} from './ai';
import { clone, type MapDraft } from './maps';

const emptyInput = (): InputMessage => ({ left: false, right: false, up: false, down: false, jumpHeld: false, seq: 0 });
type RetryState = { player: PlayerState; platforms: Platform[]; elapsed: number; hazardY: number };

/** Editor sessions never connect to parties, grant rewards, or submit scores. */
export class EditorSimulation {
  platforms: Platform[];
  player: PlayerState;
  elapsed = 0;
  hazardY: number;
  flying = false;
  hazards = false;
  completed = false;
  deaths = 0;
  bots:EditorBot[]=[];
  private botId=0;private ticks=0;private thinker=0;
  private retry!: RetryState;
  readonly world;
  constructor(readonly draft: MapDraft) {
    this.world = {...worldForMap(draft.baseMapId),left:-Infinity,right:Infinity,top:-Infinity,unbounded:true};
    this.platforms = clone(draft.platforms);
    this.hazardY = this.world.height - 150;
    const start=spawnLocations(this.platforms,draft.spawn,1)[0];
    this.player = { id: 'editor-player', name: 'Playtest',x:start.x,y:start.y, vx: 0, vy: 0,
      alive: true, grounded: false, charging: false, charge01: 0, chargeDirection: 0,
      facing: 1, isBot: false, colorIndex: 0, maxHeight: 0, input: emptyInput() };
    this.setRetry();
  }
  setRetry(): void {
    this.retry = clone({ player: this.player, platforms: this.platforms, elapsed: this.elapsed, hazardY: this.hazardY });
    // Start a fresh jump, while retaining moving-platform phase and collapse state.
    Object.assign(this.retry.player, { vx: 0, vy: 0, input: emptyInput(), charging: false, charge01: 0, chargeDirection: 0 });
    this.retry.player.vineId = undefined; this.retry.player.vineRadius = undefined;
    this.retry.player.vineJumpHeld = false;
  }
  reset(): void {
    const state = clone(this.retry);
    this.player = state.player; this.platforms = state.platforms;
    this.elapsed = state.elapsed; this.hazardY = state.hazardY;
    this.completed = false; this.flying = false;
    for(const bot of this.bots)bot.reset(this.platforms,this.elapsed);
  }
  addBot(origin:SpawnPoint=this.draft.spawn):void{
    if(this.bots.length>=24)return;
    const n=this.bots.filter(b=>b.origin===this.draft.spawn).length+1;
    const slot=12+Math.ceil(n/2)*(n%2?-1:1);
    const bot=new EditorBot('tester-'+(++this.botId),origin,this.platforms,origin===this.draft.spawn?slot:0,origin===this.draft.spawn?25:1);this.bots.push(bot);
  }
  removeBot():void{this.bots.pop();}
  get retryPoint() { return { x: this.retry.player.x, y: this.retry.player.y }; }
  teleport(x: number, y: number): void {
    Object.assign(this.player, { x: Math.max(this.world.left, Math.min(this.world.right - PLAYER_WIDTH, x)), y: Math.min(this.world.height - PLAYER_HEIGHT, y),
      vx: 0, vy: 0, alive: true, grounded: false, groundedPlatformId: undefined, charging: false, charge01: 0,
      input: emptyInput(), vineId: undefined, vineRadius: undefined, vineCooldown: .65 });
    this.completed = false;
  }
  placeOn(platform: Platform): void {
    const x=platform.x+platform.w/2-PLAYER_WIDTH/2;
    this.teleport(x,platform.rotation!==undefined?standingY(platform,x):platformSurfaceY(platform,x)-PLAYER_HEIGHT);
    this.player.grounded = true; this.player.groundedPlatformId = platform.id;
  }
  toggleFlight(): void {
    this.flying = !this.flying;
    this.teleport(this.player.x, this.player.y);
  }
  step(input: InputMessage): void {
    const dt = 1 / 30;
    this.elapsed += dt;
    updateMovingPlatforms(this.platforms, this.elapsed * 1000);
    this.player.input = input;
    const oldY = this.player.y;
    if (this.flying) stepFlight(this.player, dt, this.world);
    else stepPlayer(this.player, this.platforms, dt, { ...this.world, time: this.elapsed });
    if (this.hazards) {
      const rules = floodForMap(this.draft.baseMapId);
      if (this.elapsed > rules.grace) this.hazardY -= Math.min(rules.max, rules.base + (this.elapsed - rules.grace) * rules.acceleration) * dt;
    }
    if (!this.flying && (this.player.y > this.world.height || (this.hazards && (this.player.y + PLAYER_HEIGHT >= this.hazardY ||
      (this.draft.baseMapId === 'forge' && touchesForgeLava(this.player, forgeLavaPools(this.platforms), oldY)))))) {
      this.deaths++;if(this.bots.length){this.player=clone(this.retry.player);this.flying=false;this.completed=false;}else this.reset();
    }
    if(this.bots.length&&this.ticks++%6===0){this.bots[this.thinker++%this.bots.length].think(this.platforms,this.world,this.elapsed);}
    for(const bot of this.bots){bot.step(this.platforms,this.world,this.elapsed);if(this.hazards&&(bot.player.y+PLAYER_HEIGHT>=this.hazardY||(this.draft.baseMapId==='forge'&&touchesForgeLava(bot.player,forgeLavaPools(this.platforms)))))bot.reset(this.platforms,this.elapsed);}
    this.completed = this.player.groundedPlatformId === 'crown';
  }
}
