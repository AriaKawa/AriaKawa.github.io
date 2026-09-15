import type { Placement } from './types';
import {MAPS, type MapId} from '../../../server/src/sim/maps';
export const SCORE_KEY='jump-royale-scores-v1';
type PersonalBest=Pick<Placement,'place'|'maxHeight'|'timeMs'>;
export type Records=Partial<Record<MapId,PersonalBest>>;
export function loadScores(): Records {
  try {
    const data=JSON.parse(localStorage.getItem(SCORE_KEY)||'{}'),scores:Records={};
    for(const {id} of MAPS) {
      const p=data?.[id];
      if(p && Number.isInteger(p.place) && p.place>0 && Number.isFinite(p.timeMs) && p.timeMs>=0 && Number.isFinite(p.maxHeight) && p.maxHeight>=0)scores[id]={place:p.place,maxHeight:p.maxHeight,timeMs:p.timeMs};
    }
    try {localStorage.setItem(SCORE_KEY,JSON.stringify(scores));for(const {id} of MAPS)localStorage.removeItem('jump-royale-standings-'+id);}catch{}
    return scores;
  } catch {return {};}
}
export function saveScore(map:MapId,score:PersonalBest):void {
  const scores=loadScores(),old=scores[map];
  if(!old || score.place<old.place || (score.place===old.place && (score.maxHeight>old.maxHeight || (score.maxHeight===old.maxHeight && score.timeMs<old.timeMs)))) {
    scores[map]={place:score.place,maxHeight:score.maxHeight,timeMs:score.timeMs};
    try{localStorage.setItem(SCORE_KEY,JSON.stringify(scores));}catch{}
  }
}
const WIN_KEY='jump-royale-wins-v1';
function winData():{count:number;rounds:string[]} {
  try {const d=JSON.parse(localStorage.getItem(WIN_KEY)||'{}');return {count:Number.isSafeInteger(d.count)&&d.count>=0?d.count:0,rounds:Array.isArray(d.rounds)?d.rounds.filter((x:unknown)=>typeof x==='string'):[]};}catch{return {count:0,rounds:[]};}
}
export function loadWins():number {return winData().count;}
export function recordWin(round:string):void {
  const data=winData();if(data.rounds.includes(round))return;
  data.count++;data.rounds.push(round);
  try{localStorage.setItem(WIN_KEY,JSON.stringify(data));}catch{}
}
export function scoreTime(ms:number):string {
  return `${Math.floor(ms/60000)}:${((ms%60000)/1000).toFixed(3).padStart(6,'0')}`;
}
