import {worldForMap} from './world.js';
import { stepPlayer, solidBoxes } from "./physics.js";
import { GRAVITY, HORIZONTAL_JUMP_SPEED, MAX_CHARGE_MS, MAX_JUMP_VELOCITY_Y, MIN_JUMP_VELOCITY_Y, PLAYER_WIDTH, SHAFT_LEFT, SHAFT_RIGHT } from "./constants.js";
import type { Platform, PlayerState } from "./types.js";

interface Plan { x: number; ticks: number; direction: -1 | 0 | 1; score: number }
const SKILLS = {
  bad: { think: 740, settle: 400, mistake: .46, error: 5 },
  average: { think: 400, settle: 230, mistake: .28, error: 4 },
  good: { think: 180, settle: 110, mistake: .11, error: 2 },
  cracked: { think: 65, settle: 35, mistake: 0, error: 0 }
};
function random(bot: PlayerState): number {
  const b=bot.bot!;
  if(b.rng===undefined) { b.rng=2166136261; for(const c of bot.id) b.rng=Math.imul(b.rng^c.charCodeAt(0),16777619); b.rng^=b.pattern*7919; }
  b.rng=(Math.imul(b.rng,1664525)+1013904223)>>>0;
  return b.rng/4294967296;
}
/** Search discrete 30 Hz launch arcs, matching the authoritative integrator. */
function planJump(bot: PlayerState, support: Platform, target: Platform, platforms: Platform[]): Plan | undefined {
  let best: Plan | undefined;
  for (let ticks = 10; ticks <= 24; ticks++) {
    const charge = Math.min(1, ticks * 1000 / 30 / MAX_CHARGE_MS);
    const eased = charge * charge * (3 - 2 * charge);
    let vy = MIN_JUMP_VELOCITY_Y + (MAX_JUMP_VELOCITY_Y - MIN_JUMP_VELOCITY_Y) * eased;
    let feet = support.y; let frames = 0;
    for (let frame = 1; frame < 35; frame++) {
      const old = feet; vy += GRAVITY / 30; feet += vy / 30;
      if (vy >= 0 && old <= target.y + 3 && feet >= target.y) { frames = frame; break; }
    }
    if (!frames) continue;
    for (let x = support.x + (support.mountain?-2:8); x <= support.x + support.w - PLAYER_WIDTH - (support.mountain?-2:8); x += support.mountain?2:8) {
      for (const direction of [-1, 0, 1] as const) {
        const landing = Math.max(SHAFT_LEFT, Math.min((support.magical?worldForMap('magical').right:support.forest?worldForMap('forest').right:support.mountain?worldForMap('mountain').right:SHAFT_RIGHT) - PLAYER_WIDTH, x + direction * HORIZONTAL_JUMP_SPEED * frames / 30));
        const margin = Math.min(landing - target.x, target.x + target.w - landing - PLAYER_WIDTH);
        if (margin < (support.mountain?Math.min(1,Math.max(.1,(target.w-14)/2-1.8)):(target.slippery ? target.w < 230 ? 8 : 108 : 8))) continue;
        // Each climber favors a different safe part of the landing and balances
        // a short run-up against a centered landing. No teleporting or air steering.
        const style=(bot.bot?.pattern??0)%4;
        const preferred=target.x+PLAYER_WIDTH+(target.w-PLAYER_WIDTH*3)*(.25+style/6);
        const score = Math.min(margin,style===0?100:24) - Math.abs(landing-preferred)*.16
          - Math.abs(x - bot.x) * [0.035,.16,.06,.1][style] - ticks * [0.06,.4,.12,.02][style];
        if (!best || score > best.score) {
          if(target.solid){
            if(platforms.some(platform=>platform.id!==support.id && solidBoxes(platform).some(p=>support.y>p.y && support.y-20<p.y+p.h && Math.max(x,bot.x)+PLAYER_WIDTH>p.x && Math.min(x,bot.x)<p.x+p.w)))continue;
            let robust=true;
            for(const offset of [-3,0,3]){
              const probe:PlayerState={...bot,crumblingPlatforms:{...bot.crumblingPlatforms},x:x+offset,y:support.y-20,vx:0,vy:0,grounded:true,groundedPlatformId:support.id,charging:true,charge01:charge,chargeDirection:direction,input:{left:direction<0,right:direction>0,jumpHeld:false,seq:0}};
              for(let frame=0;frame<40;frame++){stepPlayer(probe,platforms,1/30);if(probe.grounded)break;}
              if(probe.groundedPlatformId!==target.id){robust=false;break;}
            }
            if(!robust)continue;
          }
          best = { x, ticks, direction, score };
        }
      }
    }
  }
  return best;
}

export function updateBot(bot: PlayerState, platforms: Platform[], now: number): void {
  const brain = bot.bot;
  if (!bot.alive || !brain) return;
  platforms = platforms.filter(p => bot.crumblingPlatforms?.[p.id] !== 0);
  const skill=SKILLS[bot.skill??"average"];
  const pace=[1.4,.65,1,1.15][brain.pattern%4];
  if (!bot.grounded) { bot.input.jumpHeld = false; brain.alignedUntil=undefined; return; }
  if (!brain.initialized) { brain.initialized = true; brain.cooldownUntil = now + 80 + random(bot)*1200; }
  if(brain.supportId!==bot.groundedPlatformId) {
    brain.supportId=bot.groundedPlatformId; brain.targetId=undefined; brain.launchX=undefined; brain.alignedUntil=undefined;
    brain.cooldownUntil=Math.max(brain.cooldownUntil,now+skill.think*pace*(.6+random(bot))+(platforms[0]?.mountain?100+random(bot)*450:0));
  }
  const icySupport=platforms.find(p=>p.id===bot.groundedPlatformId)?.slippery;
  if(icySupport&&platforms[0]?.mountain&&Math.abs(bot.vx)>100&&!bot.charging){bot.input.left=false;bot.input.right=false;bot.input.jumpHeld=true;brain.holdUntil=now+34;return;}
  if (now < brain.cooldownUntil) {
    const support=platforms.find(p=>p.id===bot.groundedPlatformId);
    const wiggle=Math.sin(now/(85+brain.pattern%7*19)+brain.pattern);
    const room=support && support.w>55;
    bot.input.left = icySupport ? bot.vx>15 : !!room && wiggle<-.25 && bot.x>support!.x+12;
    bot.input.right = icySupport ? bot.vx< -15 : !!room && wiggle>.25 && bot.x+PLAYER_WIDTH<support!.x+support!.w-12;
    bot.input.jumpHeld=false; return;
  }
  if (bot.charging) {
    if (now >= brain.holdUntil) {
      bot.input.jumpHeld = false; brain.targetId = undefined; brain.launchX = undefined;
      brain.jumpCount++; brain.cooldownUntil = now;
    }
    return;
  }
  const support = platforms.find(p => p.id === bot.groundedPlatformId);
  if (!support) return;
  if (!brain.targetId) {
    const candidates = platforms.filter(p => !p.bucket && (p.type !== "moving" || support.mountain) && p.y < support.y - (support.mountain||support.forest?8:48) && p.y > support.y - 174).sort((a,b) => b.y-a.y);
    if(brain.pattern%4===2 && bot.skill!=="bad" && random(bot)<.55) candidates.reverse();
    for (const target of candidates) {
      const plan = planJump(bot, support, target, platforms);
      if (!plan) continue;
      brain.targetId = target.id; brain.launchX = plan.x; brain.plannedTicks = plan.ticks; brain.plannedDirection = plan.direction; break;
    }
  }
  if (!brain.targetId || brain.launchX === undefined) { brain.cooldownUntil = now + 180; bot.input.left=false;bot.input.right=false;bot.input.jumpHeld=false; return; }
  const dx = brain.launchX - bot.x;
  if(icySupport && Math.abs(dx)>3) {
    // Aim for a stopping point, rather than oscillating across the launch pixel.
    const stopping=bot.vx*Math.abs(bot.vx)/(2*620);
    const steering=dx-stopping;
    bot.input.left=steering< -1;bot.input.right=steering>1;
    bot.input.jumpHeld=false;brain.alignedUntil=undefined;return;
  }
  if (Math.abs(dx) > 3) { brain.alignedUntil=undefined; bot.input.left = dx < 0; bot.input.right = dx > 0; bot.input.jumpHeld = false; return; }
  if(brain.alignedUntil===undefined) brain.alignedUntil=now+skill.settle*pace*(.5+random(bot)*1.5);
  if(now<brain.alignedUntil && !icySupport) { bot.input.left=false; bot.input.right=false; bot.input.jumpHeld=false; bot.facing=brain.plannedDirection??bot.facing; return; }
  const direction = brain.plannedDirection ?? 0;
  bot.input.left = direction < 0; bot.input.right = direction > 0;
  const error = random(bot)<skill.mistake ? (random(bot)<.5?-1:1)*Math.ceil(random(bot)*skill.error) : 0;
  brain.holdUntil = now + ((brain.plannedTicks ?? 20) + error - 0.5) * 1000 / 30;
  bot.input.jumpHeld = true;
}

