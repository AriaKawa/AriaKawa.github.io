import assert from 'node:assert/strict';
import {readPreference,savePreference} from '../client/src/game/sessionStorage';
const values=new Map<string,string>();
let denied=false, full=false;
Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){
 if(denied)throw new Error('SecurityError');
 return {getItem:(key:string)=>values.get(key)??null,setItem:(key:string,value:string)=>{if(full)throw new Error('QuotaExceededError');values.set(key,value);}};
}});
values.set('wallpaper','saved');
assert.equal(readPreference('wallpaper'),'saved');
denied=true;
assert.equal(readPreference('wallpaper'),null);
savePreference('icon','new');
assert.equal(readPreference('icon'),'new');
denied=false;full=true;
savePreference('wallpaper','session');
assert.equal(readPreference('wallpaper'),'session');
assert.equal(values.get('wallpaper'),'saved');
full=false;
savePreference('wallpaper','persisted');
assert.equal(readPreference('wallpaper'),'persisted');
assert.equal(values.get('wallpaper'),'persisted');
values.set('wallpaper','changed-in-another-tab');
assert.equal(readPreference('wallpaper'),'changed-in-another-tab');
console.log('PASS unavailable storage, quota failure, session fallback, recovery, and external updates');

