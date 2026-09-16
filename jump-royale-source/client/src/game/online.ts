import {safePlayerName} from '../../../server/src/sim/names';
import type {MapId} from '../../../server/src/sim/maps';
import type {Outfit} from '../assets/cosmetics';

const ROOT='jumpRoyaleV2';
let connection:Promise<any>|undefined;
export async function backend():Promise<any>{
 return connection??=(async()=>{
  const base='https://www.gstatic.com/firebasejs/12.7.0/';
  const [app,db,authModule]=await Promise.all([import(/* @vite-ignore */ base+'firebase-app.js'),import(/* @vite-ignore */ base+'firebase-database.js'),import(/* @vite-ignore */ base+'firebase-auth.js')]);
  const instance=app.getApps().find((a:any)=>a.name==='jump-royale')??app.initializeApp({apiKey:'AIzaSyDRniZatGeylxphjHQadYjucOcirNBRIdk',authDomain:'multiplayer-640ec.firebaseapp.com',projectId:'multiplayer-640ec',databaseURL:'https://multiplayer-640ec-default-rtdb.firebaseio.com',appId:'1:94914236381:web:55ab00cc690140180cf034'},'jump-royale');
  const auth=authModule.getAuth(instance);await auth.authStateReady();const user=auth.currentUser??(await authModule.signInAnonymously(auth)).user;playerId=user.uid;localStorage.setItem('jump-profile-id',playerId);
  const database=db.getDatabase(instance);
  return {...db,at:(path:string)=>db.ref(database,ROOT+'/'+path)};
 })().catch(e=>{connection=undefined;throw e;});
}
export let playerId=(()=>{try{let id=localStorage.getItem('jump-profile-id');if(!id){id=crypto.randomUUID();localStorage.setItem('jump-profile-id',id);}return id;}catch{return crypto.randomUUID();}})();
export type Member={id:string;name:string;outfit:Outfit;wallpaper:string;icon:string;ready:boolean;x:number;y:number;updated:number};
export type Party={host:string;map:MapId;members:Record<string,Member>;round?:string;started?:number};
export const party:{code:string;data:Party|null;error:string}={code:'',data:null,error:''};
let stop:(()=>void)|undefined,stopPresence:(()=>void)|undefined,heartbeat:ReturnType<typeof setInterval>|undefined;
const changed=()=>window.dispatchEvent(new Event('jump-party'));
export const isHost=()=>party.data?.host===playerId;
export const partyMembers=()=>Object.values(party.data?.members??{}).filter(p=>Date.now()-p.updated<30000);
export async function updateMember(values:Partial<Member>){if(!party.code)return;const b=await backend();await b.update(b.at(`parties/${party.code}/members/${playerId}`),JSON.parse(JSON.stringify({...values,updated:Date.now()})));}
export async function updatePresence(x:number,y:number){if(!party.code)return;const b=await backend();await b.set(b.at(`presence/${party.code}/${playerId}`),{x,y});}
export async function joinParty(code:string,member:Member,host=false){
 code=code.toUpperCase().replace(/[^A-Z0-9]/g,'');if(code.length!==6)throw new Error('Enter a six-character party code.');
 member=JSON.parse(JSON.stringify(member));
 const b=await backend(),ref=b.at('parties/'+code);
 member.id=playerId;
 await b.get(ref);
 const result=await b.runTransaction(ref,(p:Party|null)=>{
  if(host){if(p)return;return {host:playerId,map:'magical',members:{[playerId]:member}};}
  if(!p)return null;
  if(p.started||Date.now()-(p.members?.[p.host]?.updated??0)>30000||Object.keys(p.members??{}).length>=8)return;
  return {...p,members:{...p.members,[playerId]:member}};
 },{applyLocally:false});
 if(!result.committed||!result.snapshot.exists())throw new Error(host?'Code unavailable. Try again.':'Party unavailable, full, or already playing.');
 stop?.();clearInterval(heartbeat);party.code=code;party.data=result.snapshot.val();party.error='';
 await b.onDisconnect(b.at(host?'parties/'+code:`parties/${code}/members/${playerId}`)).remove();
 await b.onDisconnect(b.at(`presence/${code}/${playerId}`)).remove();
 stopPresence?.();stopPresence=b.onValue(b.at('presence/'+code),(s:any)=>{for(const [id,position] of Object.entries(s.val()??{})){const m=party.data?.members?.[id];if(m)Object.assign(m,position);}});
 stop=b.onValue(ref,(s:any)=>{party.data=s.val();if(!party.data?.members?.[playerId]){party.code='';party.data=null;stop?.();clearInterval(heartbeat);}changed();},()=>{party.error='Connection lost. Reopen the party panel to reconnect.';changed();});
 heartbeat=setInterval(()=>{void updateMember({}).catch(()=>{party.error='Connection lost';changed();});changed();},5000);changed();
}
export async function leaveParty(){const code=party.code,host=isHost();stop?.();stopPresence?.();clearInterval(heartbeat);party.code='';party.data=null;changed();if(code){const b=await backend();await b.remove(b.at(host?`parties/${code}`:`parties/${code}/members/${playerId}`));await b.remove(b.at(host?'presence/'+code:`presence/${code}/${playerId}`));}}
export async function startParty(map:MapId){
 const b=await backend();const result=await b.runTransaction(b.at('parties/'+party.code),(p:Party|null)=>{
  if(!p||p.host!==playerId||p.started)return;
  const members=Object.values(p.members??{});if(members.some(m=>Date.now()-m.updated>=30000||(m.id!==playerId&&!m.ready)))return;
  return {...p,map,members:Object.fromEntries(members.map(m=>[m.id,{...m,ready:false}])),round:crypto.randomUUID(),started:Date.now()};
 },{applyLocally:false});if(!result.committed)throw new Error('Players not ready or disconnected.');
}
export async function returnToParty(){if(!party.code)return;const b=await backend();if(isHost())await b.update(b.at('parties/'+party.code),{started:null,round:null});await updateMember({ready:false});}
export type OnlineScore={name:string;wins:number;bestMs:number|null;rounds:Record<string,boolean>};
export async function submitRecord(map:MapId,round:string,name:string,won:boolean,completionMs:number|null){
 round=round.replace(/[^A-Za-z0-9_-]/g,'_');
 const b=await backend();await b.runTransaction(b.at(`boards/${map}/${playerId}`),(old:OnlineScore|null)=>{
  if(old?.rounds?.[round])return;
  return {name:safePlayerName(name),wins:(old?.wins??0)+(won?1:0),bestMs:completionMs===null?(old?.bestMs??null):Math.min(old?.bestMs??Infinity,completionMs),rounds:{...old?.rounds,[round]:true}};
 });
}
