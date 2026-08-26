import * as THREE from "three";
import "./style.css";

type VehiclePartSlot = "roof_weapon" | "front_weapon" | "tires" | "engine" | "armor";
type VehicleStats = {
  maxSpeed: number;
  acceleration: number;
  grip: number;
  turnRate: number;
  maxHealth: number;
  weaponDamage: number;
};
type VehiclePart = {
  id: string;
  name: string;
  slot: VehiclePartSlot;
  stats: Partial<VehicleStats>;
};
type Pickup = { group: THREE.Group; part: VehiclePart | null; repair?: number; collected: boolean; label: string };
type Target = { group: THREE.Group; health: number; alive: boolean; hitFlash: number };
type Bullet = { mesh: THREE.Mesh; velocity: THREE.Vector3; life: number };
type DustParticle = { mesh: THREE.Mesh; life: number; velocity: THREE.Vector3 };
type Obstacle = { position: THREE.Vector3; radius: number };

const canvas = document.querySelector<HTMLCanvasElement>("#game");
if (!canvas) throw new Error("Game canvas not found");

const ui = {
  health: getElement("health-value"), healthBar: getElement("health-bar"), speed: getElement("speed-value"),
  boost: getElement("boost-value"), targets: getElement("target-value"), weapon: getElement("weapon-part"),
  tires: getElement("tires-part"), engine: getElement("engine-part"), armor: getElement("armor-part"),
  weaponState: getElement("weapon-state"), message: getElement("message"), controls: getElement("controls"),
  pause: getElement("pause"), objective: getElement("objective"), radar: getElement<HTMLCanvasElement>("radar-canvas"),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
renderer.setSize(innerWidth, innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc27a4c);
scene.fog = new THREE.FogExp2(0xb86f45, 0.0125);

const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 260);
camera.position.set(0, 7, -11);

const hemi = new THREE.HemisphereLight(0xffd8a1, 0x3d352c, 2.4);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffd39d, 3.2);
sun.position.set(-28, 42, -18);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -55; sun.shadow.camera.right = 55; sun.shadow.camera.top = 55; sun.shadow.camera.bottom = -55;
scene.add(sun);

const warm = new THREE.MeshStandardMaterial({ color: 0x9f3d22, roughness: .78, metalness: .26 });
const metal = new THREE.MeshStandardMaterial({ color: 0x272a29, roughness: .55, metalness: .76 });
const darkMetal = new THREE.MeshStandardMaterial({ color: 0x151717, roughness: .67, metalness: .72 });
const sand = new THREE.MeshStandardMaterial({ color: 0x8f603f, roughness: 1, metalness: 0 });
const rubber = new THREE.MeshStandardMaterial({ color: 0x101111, roughness: .9, metalness: .08 });

function getGroundHeight(x: number, z: number): number {
  const northHill = 3.4 * Math.exp(-((x - 19) ** 2 + (z - 23) ** 2) / 210);
  const westRise = 2.3 * Math.exp(-((x + 28) ** 2 + (z - 5) ** 2) / 150);
  const southBump = 1.8 * Math.exp(-((x - 12) ** 2 + (z + 30) ** 2) / 100);
  const texture = Math.sin(x * .16) * Math.cos(z * .13) * .22 + Math.sin((x + z) * .08) * .16;
  return northHill + westRise + southBump + texture;
}

function addArena(): void {
  const geometry = new THREE.PlaneGeometry(120, 120, 70, 70);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index++) {
    positions.setY(index, getGroundHeight(positions.getX(index), positions.getZ(index)));
  }
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  const ground = new THREE.Mesh(geometry, sand);
  ground.receiveShadow = true;
  scene.add(ground);

  const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x50392b, roughness: 1, transparent: true, opacity: .84 });
  for (let segment = 0; segment < 30; segment++) {
    const angle = segment / 30 * Math.PI * 2;
    const next = (segment + 1) / 30 * Math.PI * 2;
    const x = Math.sin(angle) * 37;
    const z = Math.cos(angle) * 30;
    const nx = Math.sin(next) * 37;
    const nz = Math.cos(next) * 30;
    const strip = new THREE.Mesh(new THREE.BoxGeometry(7.2, .055, Math.hypot(nx - x, nz - z) + .7), trackMaterial);
    strip.position.set((x + nx) / 2, getGroundHeight((x + nx) / 2, (z + nz) / 2) + .05, (z + nz) / 2);
    strip.rotation.y = Math.atan2(nx - x, nz - z);
    strip.receiveShadow = true;
    scene.add(strip);
  }

  const arenaRing = new THREE.Mesh(new THREE.RingGeometry(57, 58, 80), new THREE.MeshBasicMaterial({ color: 0x5a2c20, side: THREE.DoubleSide }));
  arenaRing.rotateX(-Math.PI / 2);
  arenaRing.position.y = .12;
  scene.add(arenaRing);

  addRamp(-13, -2, Math.PI * .43);
  addRamp(29, -12, -Math.PI * .7);
  addRamp(-31, 22, Math.PI * .12);
  addScrapGate(0, 38);
  addScrapGate(0, -38);
}

function addRamp(x: number, z: number, rotation: number): void {
  const ramp = new THREE.Group();
  const deck = new THREE.Mesh(new THREE.BoxGeometry(6.5, .45, 9), metal);
  deck.rotation.x = -.18;
  deck.position.y = 1.05;
  deck.castShadow = deck.receiveShadow = true;
  ramp.add(deck);
  for (const side of [-2.8, 2.8]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.18, .6, 9.2), warm);
    rail.position.set(side, 1.3, 0); rail.rotation.x = -.18; rail.castShadow = true; ramp.add(rail);
  }
  ramp.position.set(x, getGroundHeight(x, z), z); ramp.rotation.y = rotation; scene.add(ramp);
}

function addScrapGate(x: number, z: number): void {
  const gate = new THREE.Group();
  for (const side of [-6, 6]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(.7, 5.5, .7), darkMetal);
    post.position.set(side, 2.75, 0); post.rotation.z = side > 0 ? -.07 : .07; post.castShadow = true; gate.add(post);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(13, .75, .75), metal);
  top.position.y = 5.2; top.rotation.z = .02; top.castShadow = true; gate.add(top);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.45, .2), warm);
  sign.position.set(0, 4.6, -.5); gate.add(sign);
  gate.position.set(x, getGroundHeight(x, z), z); scene.add(gate);
}

const obstacles: Obstacle[] = [];
function addWorldProps(): void {
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x5d5044, roughness: 1 });
  const placements = [[-42,-20,2.4],[-45,14,2.8],[43,-28,2.2],[47,8,3.2],[31,37,2],[-22,39,2.6],[8,16,1.5],[-9,-31,1.7],[22,-3,1.8]];
  placements.forEach(([x,z,size], index) => {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(size, 0), rockMaterial);
    rock.scale.y = .65 + (index % 3) * .12; rock.rotation.set(index*.7, index*.4, index*.2);
    rock.position.set(x, getGroundHeight(x,z) + size*.5, z); rock.castShadow = rock.receiveShadow = true;
    scene.add(rock); obstacles.push({ position: new THREE.Vector3(x,0,z), radius: size*.75 });
  });
  const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x8e3b22, roughness: .65, metalness: .55 });
  [[-18,11],[34,14],[-36,-7],[14,34],[38,-5]].forEach(([x,z]) => {
    for (let i=0;i<3;i++) {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,1.35,12), barrelMaterial);
      barrel.position.set(x+i*.9, getGroundHeight(x+i*.9,z)+.68, z+(i%2)*.65); barrel.castShadow=true; scene.add(barrel);
      obstacles.push({ position:new THREE.Vector3(x+i*.9,0,z+(i%2)*.65), radius:.55 });
    }
  });
  for (let i=0;i<20;i++) {
    const angle = i/20*Math.PI*2;
    const tire = new THREE.Mesh(new THREE.TorusGeometry(.5,.18,8,14), rubber);
    tire.position.set(Math.sin(angle)*(49+(i%2)*2), 1.1, Math.cos(angle)*(45+(i%3)));
    tire.rotation.set(Math.PI/2,angle,i*.5); tire.castShadow=true; scene.add(tire);
  }
}

const car = new THREE.Group();
const wheels: THREE.Mesh[] = [];
const frontWheelPivots: THREE.Group[] = [];
const turret = new THREE.Group();
let muzzle: THREE.Object3D;

function buildCar(): void {
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.7,.7,4.7), warm);
  chassis.position.y = 1.05; chassis.castShadow = chassis.receiveShadow = true; car.add(chassis);
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.35,.42,1.55), metal);
  hood.position.set(0,1.48,1.42); hood.rotation.x=-.06; hood.castShadow=true; car.add(hood);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.15,.9,1.8), darkMetal);
  cabin.position.set(0,1.72,-.35); cabin.scale.set(1,.92,.9); cabin.castShadow=true; car.add(cabin);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.85,.55,.08), new THREE.MeshStandardMaterial({color:0x273f42,roughness:.25,metalness:.5}));
  windshield.position.set(0,1.87,.5); windshield.rotation.x=-.18; car.add(windshield);
  const bumper = new THREE.Group();
  const beam = new THREE.Mesh(new THREE.BoxGeometry(3.25,.32,.32), metal); beam.position.y=1; beam.castShadow=true; bumper.add(beam);
  for(const side of [-1.15,1.15]) { const tooth=new THREE.Mesh(new THREE.ConeGeometry(.18,.85,5),metal); tooth.rotation.x=Math.PI/2; tooth.position.set(side,1,0.5); bumper.add(tooth); }
  bumper.position.z=2.55; car.add(bumper);
  for (const x of [-1.45,1.45]) for (const z of [-1.45,1.45]) {
    const pivot = new THREE.Group(); pivot.position.set(x,.72,z); car.add(pivot);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.57,.57,.42,14),rubber); wheel.rotation.z=Math.PI/2; wheel.castShadow=true; pivot.add(wheel); wheels.push(wheel);
    if(z>0) frontWheelPivots.push(pivot);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.45,10),metal); hub.rotation.z=Math.PI/2; wheel.add(hub);
  }
  const mount = new THREE.Mesh(new THREE.CylinderGeometry(.58,.68,.2,12),metal); mount.position.y=2.32; mount.castShadow=true; car.add(mount);
  turret.position.y=2.47; car.add(turret);
  const receiver = new THREE.Mesh(new THREE.BoxGeometry(.46,.4,.9),darkMetal); receiver.position.z=.14; receiver.castShadow=true; turret.add(receiver);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.08,.11,2.15,10),metal); barrel.rotation.x=Math.PI/2; barrel.position.set(0,.07,1.35); barrel.castShadow=true; turret.add(barrel);
  const shield = new THREE.Mesh(new THREE.BoxGeometry(1.05,.62,.12),warm); shield.position.set(0,.06,.25); shield.rotation.x=-.1; turret.add(shield);
  muzzle = new THREE.Object3D(); muzzle.position.set(0,.07,2.46); turret.add(muzzle);
  car.position.set(0,getGroundHeight(0,-18),-18); scene.add(car);
}

const defaultStats: VehicleStats = { maxSpeed: 25, acceleration: 18, grip: 1, turnRate: 1.7, maxHealth: 100, weaponDamage: 15 };
const stats: VehicleStats = { ...defaultStats };
const equipped: Partial<Record<VehiclePartSlot, VehiclePart>> = {};
const vehicle = { position: new THREE.Vector3(0,0,-18), heading: 0, speed: 0, health: 100, boost: 100, collisionCooldown: 0 };

type PartPickupKind = "tires" | "engine" | "armor" | "weapon";
type PickupKind = PartPickupKind | "repair";
const partCatalog: Record<PartPickupKind, VehiclePart> = {
  tires: { id:"better-tires", name:"All-Terrain Tires", slot:"tires", stats:{ grip:1.36, turnRate:2.0 } },
  engine: { id:"turbo-engine", name:"Turbo V8", slot:"engine", stats:{ maxSpeed:32, acceleration:24 } },
  armor: { id:"armor-plates", name:"Riveted Armor", slot:"armor", stats:{ maxHealth:145 } },
  weapon: { id:"roof-machine-gun", name:"Twin Roof MG", slot:"roof_weapon", stats:{ weaponDamage:24 } },
};

const pickups: Pickup[] = [];
function createPickup(x:number,z:number,kind:PickupKind): void {
  const group = new THREE.Group();
  const colors: Record<PickupKind, number> = { tires:0x4fc7de, engine:0xf0ad45, armor:0xc4d07a, weapon:0xe75c38, repair:0x67cf82 };
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(.08,.22,4,8,1,true),new THREE.MeshBasicMaterial({color:colors[kind],transparent:true,opacity:.15,side:THREE.DoubleSide}));
  beam.position.y=2; group.add(beam);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.75,.07,8,24),new THREE.MeshBasicMaterial({color:colors[kind]})); ring.rotation.x=Math.PI/2; ring.position.y=.12; group.add(ring);
  const item = new THREE.Group(); item.position.y=1.15; group.add(item);
  if(kind==="tires") { const tire=new THREE.Mesh(new THREE.TorusGeometry(.48,.2,10,18),rubber); tire.rotation.y=Math.PI/2; item.add(tire); }
  if(kind==="engine") { const block=new THREE.Mesh(new THREE.BoxGeometry(.9,.65,.65),metal); item.add(block); for(const side of [-.3,.3]){const pipe=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.8,8),warm);pipe.position.set(side,.45,0);item.add(pipe);} }
  if(kind==="armor") { for(const offset of [-.18,.18]){const plate=new THREE.Mesh(new THREE.BoxGeometry(1.05,.68,.1),new THREE.MeshStandardMaterial({color:colors[kind],roughness:.65,metalness:.55}));plate.position.z=offset;plate.rotation.y=offset*1.5;item.add(plate);} }
  if(kind==="weapon") { const gun=new THREE.Mesh(new THREE.BoxGeometry(.36,.32,1.2),metal);gun.position.z=.22;item.add(gun);const barrel=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.2,8),metal);barrel.rotation.x=Math.PI/2;barrel.position.z=1;item.add(barrel); }
  if(kind==="repair") { const box=new THREE.Mesh(new THREE.BoxGeometry(.85,.7,.55),new THREE.MeshStandardMaterial({color:colors[kind],roughness:.6}));item.add(box);const v=new THREE.Mesh(new THREE.BoxGeometry(.16,.5,.08),new THREE.MeshBasicMaterial({color:0xf1f0d3}));v.position.z=.3;item.add(v);const h=v.clone();h.rotation.z=Math.PI/2;item.add(h); }
  group.position.set(x,getGroundHeight(x,z)+.12,z); scene.add(group);
  const part = kind==="repair" ? null : partCatalog[kind];
  pickups.push({group,part,repair:kind==="repair"?45:undefined,collected:false,label:part?.name ?? "Repair Kit"});
}

const targets: Target[] = [];
function createTarget(x:number,z:number,rotation:number): void {
  const group=new THREE.Group();
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.75,.9,.35,10),darkMetal);base.position.y=.18;base.castShadow=true;group.add(base);
  const post=new THREE.Mesh(new THREE.BoxGeometry(.3,1.8,.3),metal);post.position.y=1.2;post.castShadow=true;group.add(post);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.62,.78,1.35,8),new THREE.MeshStandardMaterial({color:0x913c27,roughness:.7,metalness:.45,emissive:0x000000}));body.position.y=1.55;body.castShadow=true;body.name="target-body";group.add(body);
  const eye=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),new THREE.MeshBasicMaterial({color:0xffb446}));eye.position.set(0,1.72,.65);group.add(eye);
  for(const side of [-1,1]){const arm=new THREE.Mesh(new THREE.BoxGeometry(.8,.16,.16),metal);arm.position.set(side*.78,1.7,0);arm.rotation.z=side*.25;group.add(arm);}
  group.position.set(x,getGroundHeight(x,z),z);group.rotation.y=rotation;scene.add(group);targets.push({group,health:55,alive:true,hitFlash:0});
}

const bullets: Bullet[]=[]; const dust: DustParticle[]=[];
const bulletMaterial=new THREE.MeshBasicMaterial({color:0xffcf5a});
const dustMaterial=new THREE.MeshBasicMaterial({color:0xc18a59,transparent:true,opacity:.35,depthWrite:false});
let lastShot=0; let messageTimer=0; let paused=false; let cameraMode=0; let elapsed=0;
const input=new Set<string>(); const mouse=new THREE.Vector2(0,.15); const aimPoint=new THREE.Vector3();
const raycaster=new THREE.Raycaster(); const aimPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0);

function shoot(): void {
  const now=performance.now(); if(paused || now-lastShot < (equipped.roof_weapon?95:150)) return; lastShot=now;
  const origin=new THREE.Vector3();muzzle.getWorldPosition(origin);
  const yaw=car.rotation.y+turret.rotation.y; const direction=new THREE.Vector3(Math.sin(yaw),.01,Math.cos(yaw)).normalize();
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(.09,7,5),bulletMaterial);mesh.position.copy(origin);scene.add(mesh);
  bullets.push({mesh,velocity:direction.multiplyScalar(equipped.roof_weapon?60:48),life:1.45});
  ui.weaponState.textContent="FIRING"; setTimeout(()=>{if(ui.weaponState.textContent==="FIRING")ui.weaponState.textContent="READY";},80);
  const flash=new THREE.PointLight(0xff8a24,8,5,2);flash.position.copy(origin);scene.add(flash);setTimeout(()=>scene.remove(flash),45);
}

function spawnDust(dt:number): void {
  if(Math.abs(vehicle.speed)<3 || Math.random()>dt*Math.min(Math.abs(vehicle.speed),20)*1.8) return;
  const behind=new THREE.Vector3(-Math.sin(vehicle.heading)*2,0,-Math.cos(vehicle.heading)*2);
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(.18+Math.random()*.22,6,4),dustMaterial.clone());
  mesh.position.copy(vehicle.position).add(behind).add(new THREE.Vector3((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8));scene.add(mesh);
  dust.push({mesh,life:.7+Math.random()*.5,velocity:new THREE.Vector3((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)});
}

function explode(position:THREE.Vector3): void {
  for(let i=0;i<14;i++){
    const mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(.08+Math.random()*.14,0),new THREE.MeshBasicMaterial({color:i%3===0?0xffc34e:0xb84a29}));
    mesh.position.copy(position).add(new THREE.Vector3(0,1.4,0));scene.add(mesh);
    dust.push({mesh,life:.7+Math.random()*.8,velocity:new THREE.Vector3((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)});
  }
}

function damageTarget(target:Target,amount:number): void {
  if(!target.alive)return;target.health-=amount;target.hitFlash=.09;
  if(target.health<=0){target.alive=false;explode(target.group.position);scene.remove(target.group);const left=targets.filter(item=>item.alive).length;ui.targets.textContent=String(left);showMessage(left?`TARGET SCRAPPED // ${left} REMAIN`:`ARENA CLEARED // ALL TARGETS SCRAPPED`);if(!left)ui.objective.innerHTML="<small>FIELD TEST COMPLETE</small><b>All targets destroyed. Keep looting or run another lap.</b>";}
}

function equipPickup(pickup:Pickup): void {
  pickup.collected=true;scene.remove(pickup.group);
  if(pickup.repair){vehicle.health=Math.min(stats.maxHealth,vehicle.health+pickup.repair);showMessage(`REPAIR KIT // HULL RESTORED +${pickup.repair}`);return;}
  if(!pickup.part)return;equipped[pickup.part.slot]=pickup.part;Object.assign(stats,pickup.part.stats);
  if(pickup.part.slot==="armor"){vehicle.health=Math.min(stats.maxHealth,vehicle.health+45);ui.armor.textContent="RIVETED";}
  if(pickup.part.slot==="engine")ui.engine.textContent="TURBO V8";
  if(pickup.part.slot==="tires")ui.tires.textContent="ALL-TERRAIN";
  if(pickup.part.slot==="roof_weapon"){ui.weapon.textContent="TWIN ROOF MG";turret.scale.set(1.18,1.12,1.18);}
  showMessage(`EQUIPPED // ${pickup.part.name.toUpperCase()}`);
}

function showMessage(text:string): void {ui.message.textContent=text;ui.message.classList.add("show");clearTimeout(messageTimer);messageTimer=window.setTimeout(()=>ui.message.classList.remove("show"),1900);}

function updateVehicle(dt:number): void {
  vehicle.collisionCooldown=Math.max(0,vehicle.collisionCooldown-dt);
  const forward=input.has("KeyW")?1:0;const reverse=input.has("KeyS")?1:0;const steer=(input.has("KeyA")?1:0)-(input.has("KeyD")?1:0);const drifting=input.has("Space");
  const boosting=input.has("ShiftLeft")&&forward>0&&vehicle.boost>0;
  if(forward)vehicle.speed+=stats.acceleration*(boosting?1.75:1)*dt;
  if(reverse)vehicle.speed-=vehicle.speed>1?stats.acceleration*2.2*dt:stats.acceleration*.62*dt;
  if(boosting){vehicle.boost=Math.max(0,vehicle.boost-24*dt);}else vehicle.boost=Math.min(100,vehicle.boost+9*dt);
  const maxForward=stats.maxSpeed*(boosting?1.28:1);vehicle.speed=THREE.MathUtils.clamp(vehicle.speed,-10,maxForward);
  if(!forward&&!reverse){const drag=(drifting?3.6:1.7)*dt;vehicle.speed=Math.abs(vehicle.speed)<=drag?0:vehicle.speed-Math.sign(vehicle.speed)*drag;}
  const speedRatio=Math.min(Math.abs(vehicle.speed)/12,1);const reverseSign=vehicle.speed>=0?1:-1;
  vehicle.heading+=steer*stats.turnRate*(.18+speedRatio*.82)*(drifting?1.48:1)*reverseSign*dt;
  const moveScale=drifting?.78:1;vehicle.position.x+=Math.sin(vehicle.heading)*vehicle.speed*moveScale*dt;vehicle.position.z+=Math.cos(vehicle.heading)*vehicle.speed*moveScale*dt;
  const arenaDistance=Math.hypot(vehicle.position.x,vehicle.position.z);if(arenaDistance>55){const nx=vehicle.position.x/arenaDistance,nz=vehicle.position.z/arenaDistance;vehicle.position.x=nx*55;vehicle.position.z=nz*55;vehicle.speed*=-.25;hitVehicle(7);showMessage("BOUNDARY IMPACT // TURN BACK");}
  for(const obstacle of obstacles){const dx=vehicle.position.x-obstacle.position.x,dz=vehicle.position.z-obstacle.position.z,dist=Math.hypot(dx,dz),min=obstacle.radius+1.25;if(dist<min){vehicle.position.x=obstacle.position.x+dx/dist*min;vehicle.position.z=obstacle.position.z+dz/dist*min;if(Math.abs(vehicle.speed)>6){hitVehicle(Math.round(Math.abs(vehicle.speed)*.45));showMessage("SCRAP COLLISION // HULL DAMAGED");}vehicle.speed*=-.2;}}
  vehicle.position.y=getGroundHeight(vehicle.position.x,vehicle.position.z)+.06;
  const frontY=getGroundHeight(vehicle.position.x+Math.sin(vehicle.heading)*2,vehicle.position.z+Math.cos(vehicle.heading)*2);const backY=getGroundHeight(vehicle.position.x-Math.sin(vehicle.heading)*2,vehicle.position.z-Math.cos(vehicle.heading)*2);
  const rightY=getGroundHeight(vehicle.position.x+Math.cos(vehicle.heading)*1.2,vehicle.position.z-Math.sin(vehicle.heading)*1.2);const leftY=getGroundHeight(vehicle.position.x-Math.cos(vehicle.heading)*1.2,vehicle.position.z+Math.sin(vehicle.heading)*1.2);
  const pitch=Math.atan2(backY-frontY,4);const roll=Math.atan2(leftY-rightY,2.4)+(drifting?steer*.06*speedRatio:0);
  car.position.lerp(new THREE.Vector3(vehicle.position.x,vehicle.position.y,vehicle.position.z),1-Math.exp(-12*dt));car.rotation.set(pitch,vehicle.heading,roll,"YXZ");
  wheels.forEach(wheel=>wheel.rotation.x+=vehicle.speed*dt/.57);frontWheelPivots.forEach(pivot=>pivot.rotation.y=THREE.MathUtils.damp(pivot.rotation.y,-steer*.38,12,dt));
  for(const pickup of pickups){if(!pickup.collected&&pickup.group.position.distanceTo(car.position)<2.25)equipPickup(pickup);}
  for(const target of targets){if(target.alive&&target.group.position.distanceTo(car.position)<1.85&&Math.abs(vehicle.speed)>5){damageTarget(target,Math.abs(vehicle.speed)*1.8);vehicle.speed*=-.35;hitVehicle(4);}}
  spawnDust(dt);
}

function hitVehicle(amount:number):void{if(vehicle.collisionCooldown>0)return;vehicle.collisionCooldown=.45;vehicle.health=Math.max(0,vehicle.health-amount);if(vehicle.health<=0){showMessage("RIG DISABLED // RESETTING");setTimeout(resetVehicle,900);}}

function updateAim(): void {
  raycaster.setFromCamera(mouse,camera);aimPlane.constant=-(car.position.y+.7);raycaster.ray.intersectPlane(aimPlane,aimPoint);
  if(Number.isFinite(aimPoint.x)){const dx=aimPoint.x-car.position.x,dz=aimPoint.z-car.position.z;const worldYaw=Math.atan2(dx,dz);let local=worldYaw-vehicle.heading;local=Math.atan2(Math.sin(local),Math.cos(local));turret.rotation.y=THREE.MathUtils.damp(turret.rotation.y,local,10,1/60);}
}

function updateProjectiles(dt:number): void {
  for(let i=bullets.length-1;i>=0;i--){const bullet=bullets[i];bullet.mesh.position.addScaledVector(bullet.velocity,dt);bullet.life-=dt;let hit=false;for(const target of targets){if(target.alive&&bullet.mesh.position.distanceTo(target.group.position.clone().add(new THREE.Vector3(0,1.4,0)))<1){damageTarget(target,stats.weaponDamage);hit=true;break;}}if(hit||bullet.life<=0){scene.remove(bullet.mesh);bullets.splice(i,1);}}
  for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=3.5*dt;p.mesh.scale.multiplyScalar(1+dt*.55);const material=p.mesh.material as THREE.MeshBasicMaterial;material.opacity=Math.max(0,Math.min(material.opacity,p.life*.45));if(p.life<=0){scene.remove(p.mesh);material.dispose();dust.splice(i,1);}}
  for(const target of targets){if(!target.alive)continue;if(target.hitFlash>0){target.hitFlash-=dt;const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0xff6b2c);}else{const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0x000000);}}
}

const cameraLook=new THREE.Vector3();
function updateCamera(dt:number): void {
  const forward=new THREE.Vector3(Math.sin(vehicle.heading),0,Math.cos(vehicle.heading));
  const desired=cameraMode===0?vehicle.position.clone().addScaledVector(forward,-9.5).add(new THREE.Vector3(0,5.4,0)):vehicle.position.clone().add(new THREE.Vector3(0,15.5,-.01));
  camera.position.lerp(desired,1-Math.exp(-5*dt));const look=vehicle.position.clone().addScaledVector(forward,cameraMode===0?4:0).add(new THREE.Vector3(0,1.2,0));cameraLook.lerp(look,1-Math.exp(-8*dt));camera.lookAt(cameraLook);
}

function updatePickups(dt:number):void{for(const pickup of pickups){if(pickup.collected)continue;pickup.group.rotation.y+=dt*.8;const item=pickup.group.children[2];item.position.y=1.1+Math.sin(elapsed*2.4+pickup.group.position.x)*.18;}}

function updateHud():void{ui.speed.textContent=String(Math.round(Math.abs(vehicle.speed)*4.2));ui.boost.textContent=String(Math.round(vehicle.boost));ui.health.textContent=String(Math.round(vehicle.health));ui.healthBar.style.width=`${vehicle.health/stats.maxHealth*100}%`;}

function drawRadar():void{const context=ui.radar.getContext("2d");if(!context)return;const size=160,center=80,scale=1.15;context.clearRect(0,0,size,size);context.strokeStyle="rgba(213,183,119,.13)";context.lineWidth=1;for(const radius of [24,48,72]){context.beginPath();context.arc(center,center,radius,0,Math.PI*2);context.stroke();}context.beginPath();context.moveTo(center,8);context.lineTo(center,152);context.moveTo(8,center);context.lineTo(152,center);context.stroke();const plot=(x:number,z:number,color:string,radius:number)=>{const dx=(x-vehicle.position.x)*scale,dz=(z-vehicle.position.z)*scale;const angle=-vehicle.heading;const px=dx*Math.cos(angle)-dz*Math.sin(angle),py=dx*Math.sin(angle)+dz*Math.cos(angle);if(Math.hypot(px,py)>73)return;context.fillStyle=color;context.beginPath();context.arc(center+px,center-py,radius,0,Math.PI*2);context.fill();};pickups.forEach(p=>{if(!p.collected)plot(p.group.position.x,p.group.position.z,"#57dbe3",2.7)});targets.forEach(t=>{if(t.alive)plot(t.group.position.x,t.group.position.z,"#ef6846",3)});context.save();context.translate(center,center);context.fillStyle="#f3ce79";context.beginPath();context.moveTo(0,-7);context.lineTo(5,6);context.lineTo(0,3);context.lineTo(-5,6);context.closePath();context.fill();context.restore();}

function resetVehicle():void{vehicle.position.set(0,0,-18);vehicle.position.y=getGroundHeight(0,-18);vehicle.heading=0;vehicle.speed=0;vehicle.health=Math.max(vehicle.health,Math.min(stats.maxHealth,65));vehicle.boost=100;car.position.copy(vehicle.position);showMessage("RIG RECOVERED // SYSTEMS ONLINE");}

function togglePause(force?:boolean):void{paused=force??!paused;ui.pause.hidden=!paused;}
function toggleControls(show?:boolean):void{ui.controls.classList.toggle("closed",show===undefined?!ui.controls.classList.contains("closed"):!show);}

addArena();addWorldProps();buildCar();
createPickup(-23,-18,"tires");createPickup(22,9,"engine");createPickup(36,-25,"armor");createPickup(-4,28,"weapon");createPickup(-35,27,"repair");createPickup(14,-36,"repair");
createTarget(-14,8,.4);createTarget(11,18,-.5);createTarget(28,27,1.2);createTarget(39,2,-1.2);createTarget(21,-23,2.5);createTarget(-12,-35,.2);createTarget(-35,-22,-.8);createTarget(-41,12,1.6);
showMessage("ENGINE LIVE // FIND THE GLOWING PARTS");setTimeout(()=>toggleControls(false),4200);

window.addEventListener("keydown",event=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyF"].includes(event.code))event.preventDefault();if(event.repeat)return;if(event.code==="Escape"){togglePause();return;}if(event.code==="KeyR")resetVehicle();if(event.code==="KeyC"){cameraMode=(cameraMode+1)%2;showMessage(cameraMode?"CAMERA // OVERWATCH":"CAMERA // CHASE");}if(event.code==="KeyF")shoot();input.add(event.code);});
window.addEventListener("keyup",event=>input.delete(event.code));
canvas.addEventListener("pointermove",event=>{mouse.x=event.clientX/innerWidth*2-1;mouse.y=-(event.clientY/innerHeight)*2+1;});
canvas.addEventListener("pointerdown",event=>{if(event.button===0)shoot();});
canvas.addEventListener("contextmenu",event=>event.preventDefault());
getElement("help-button").addEventListener("click",()=>toggleControls());getElement("controls-close").addEventListener("click",()=>toggleControls(false));getElement("resume-button").addEventListener("click",()=>togglePause(false));
document.querySelectorAll<HTMLButtonElement>("[data-key]").forEach(button=>{const code=button.dataset.key??"";const press=(event:PointerEvent)=>{event.preventDefault();if(code==="Fire")shoot();else input.add(code);};const release=(event:PointerEvent)=>{event.preventDefault();input.delete(code);};button.addEventListener("pointerdown",press);button.addEventListener("pointerup",release);button.addEventListener("pointercancel",release);button.addEventListener("pointerleave",release);});
window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));});

const clock=new THREE.Clock();let radarAccumulator=0;
function animate():void{requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);if(!paused){elapsed+=dt;updateVehicle(dt);updateAim();updateProjectiles(dt);updatePickups(dt);updateCamera(dt);updateHud();radarAccumulator+=dt;if(radarAccumulator>.08){radarAccumulator=0;drawRadar();}}renderer.render(scene,camera);}
animate();

function getElement<T extends HTMLElement=HTMLElement>(id:string):T{const element=document.getElementById(id);if(!element)throw new Error(`Missing #${id}`);return element as T;}
