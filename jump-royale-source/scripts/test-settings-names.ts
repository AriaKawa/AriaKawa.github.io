import assert from 'node:assert/strict';
import {isBadName,REBUKES} from '../server/src/sim/names';
let count=0;
for(const term of ['nigger','nigga','faggot','wetback','raghead','towelhead','heilhitler','whitepower','siegheil'])for(let i=1;i<term.length;i++)for(const letter of 'abcdefghijklmnopqrstuvwxyz') {const name=term.slice(0,i)+letter+term.slice(i);assert(isBadName(name),name);count++;}
for(const good of ['Nigel','Nightingale','Ginger','Trigger','Raccoon','Spice','Scunthorpe','Finn','Luna','Knight','Biscuit','Mochi','Rebecca','Sky Walker','BigClimber'])assert(!isBadName(good),good);
for(const bad of ['n1gxg3r','n i g x g e r','ＮＩＧＸＧＥＲ','nіgxgеr'])assert(isBadName(bad),bad);
assert.equal(new Set(REBUKES).size,10);console.log('PASS',count,'inserted-letter evasions, Unicode/leet variants, benign names and 10 unique responses');
