export const CARD_ART={caliber:'upgrade-caliber',trigger:'upgrade-trigger',pierce:'upgrade-pierce',spread:'upgrade-spread',crit:'upgrade-crit',burn:'upgrade-burn',vital:'upgrade-vital',armor:'upgrade-armor',medic:'upgrade-medic',leech:'upgrade-leech',ghost:'upgrade-ghost',grenade:'upgrade-grenade',scavenge:'upgrade-scavenge',rations:'upgrade-rations',reroll:'upgrade-reroll'};
export const ASSETS={horizon:'assets/v10/horizon.webp',home:'assets/v10/home.webp'};
const artNames=[...Array.from({length:4},(_,i)=>'facade'+i),'asphalt','sidewalk','roof','wall','car','barrier','gate','supply','lamp','barrel','weapon-carbine','weapon-shotgun','weapon-revolver','grenade','ammo','holster',...Object.values(CARD_ART),'upgrade-skull','panel-dialog','panel-common','panel-rare','panel-epic','panel-button','panel-hud',...['left','right','up','down','pause','play','fullscreen','sound','muted','health','grenade','reroll','home','exit','check','skull'].map(n=>'control-'+n),'bullet','muzzle','blast0','blast1','fire','smoke','impact','shadow','logo'];
for(const name of artNames)ASSETS[name]=`assets/v2/${name}.png`;
for(const name of ['bus-side','bus-back','bus-roof','truck-side','truck-back','truck-roof','cracks','oil','debris','spikes','barrels','ramp'])ASSETS[name]=`assets/v3/${name}.png`;
export const assetUrl=name=>ASSETS[name];
CARD_ART.reserves='upgrade-rations';
Object.assign(CARD_ART,{ice:'upgrade-ghost',fire:'upgrade-burn',air:'upgrade-ghost',earth:'upgrade-armor',headhunter:'upgrade-crit',bellows:'fire',wildfire:'blast0',firebomb:'grenade',cinders:'upgrade-leech',thorns:'spikes',juggernaut:'upgrade-vital',retribution:'upgrade-pierce',bulwark:'upgrade-armor'});
ASSETS.weaponcrate='assets/v7/weaponcrate.png';
for(const family of ['deagle','glocks','scorpion','barrett','katana']){
 ASSETS['weapon-'+family]=`assets/v7/weapon-${family}.png`;
 for(const pose of ['run',family==='katana'?'slash':'aim','jump'])for(let i=0;i<4;i++)ASSETS[`v7-${family}-${pose}-${i}`]=`assets/v7/v7-${family}-${pose}-${i}.png`;
}
for(const name of ['minigun','stim','skateboard'])ASSETS[name]=`assets/v5/${name}.png`;
for(const family of ['carbine','shotgun','revolver','minigun','shieldboard','walker','runner','brute','horde','gait']){
 const poses=['carbine','shotgun','revolver'].includes(family)?['run','aim','jump']:family==='minigun'?['aim','jump']:family==='shieldboard'?['ride','jump']:[''];
 for(const pose of poses)for(let i=0;i<8;i++){const name=`v6-${family}${pose?'-'+pose:''}-${i}`;ASSETS[name]=`assets/v6/${name}.png`;}
}
for(const name of [...Array.from({length:8},(_,i)=>'roll'+i),...Array.from({length:4},(_,i)=>'blood'+i),'blood-pool','blood-splatter','blood-fill','blood-drops'])ASSETS[name]=`assets/v4/${name}.png`;
