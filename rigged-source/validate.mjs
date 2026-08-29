import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../rigged");
const racekartModels = [
  "Prop_Track_Ramp", "Prop_Track_Ramp_Railing", "Prop_Decorative_Fence_Railing",
  "Prop_Decorative_Rock_2", "Prop_Decorative_Rock_5",
  "Prop_Decorative_Hay_Bale_Box",
];
const required = [
  "index.html", "ASSET_CREDITS.md", "THIRD_PARTY_LICENSES.txt", "assets/cloudy-sky.png", "assets/nitro-games.wav",
  "assets/materials/dirty-arena-ground-v1.png", "assets/materials/weathered-arena-metal-v1.png", "assets/materials/gritty-turret-metal-v1.png",
  "assets/audio/sfx/vehicle-engine-loop.wav", "assets/audio/sfx/turret-mg-fire.wav", "assets/audio/sfx/turret-rocket-fire.ogg",
  "assets/audio/sfx/turret-sniper-fire.ogg", "assets/audio/sfx/vehicle-hit-clank.ogg", "assets/audio/sfx/confirmed-hit-clank.ogg",
  "assets/audio/sfx/LICENSES.md",
  "assets/rigged/vehicles/kenney-suv.glb",
  "assets/rigged/vehicles/Textures/colormap.png",
  "assets/rigged/arena/kenney-ramp.glb",
  "assets/rigged/arena/kenney-barrier-wall.glb",
  "assets/rigged/arena/kenney-pylon.glb",
  "assets/rigged/props/kenney-crate.glb",
  "assets/rigged/props/kenney-debris-tire.glb",
  "assets/rigged/props/kenney-debris-bumper.glb",
  "assets/rigged/props/Textures/colormap.png",
  "assets/rigged/licenses/kenney-car-kit.txt",
  "assets/rigged/licenses/kenney-racing-kit.txt",
  "assets/rigged/racekart-hilly/LICENSE-CC0.txt",
  ...racekartModels.flatMap(name => [`assets/rigged/racekart-hilly/${name}.obj`, `assets/rigged/racekart-hilly/${name}.mtl`]),
];
for (const file of required) await access(resolve(root, file));

const html = await readFile(resolve(root, "index.html"), "utf8");
const source = await readFile(resolve(import.meta.dirname, "src/main.ts"), "utf8");
const colliderSource = await readFile(resolve(import.meta.dirname, "src/game/rigged/DriveSurfaceCollider.ts"), "utf8");
const ovalSource = await readFile(resolve(import.meta.dirname, "src/game/rigged/OvalBowlSurface.ts"), "utf8");
const cameraSource = await readFile(resolve(import.meta.dirname, "src/game/rigged/RiggedCameraController.ts"), "utf8");
const roguelikeSource = await readFile(resolve(import.meta.dirname, "src/game/rigged/RoguelikeRun.ts"), "utf8");
const racekartManifest = await readFile(resolve(import.meta.dirname, "src/assets/riggedRacekartManifest.ts"), "utf8");
const layouts = await readFile(resolve(import.meta.dirname, "src/game/rigged/RiggedArenaLayout.ts"), "utf8");
const checks = [
  ["title", /Rigged/i],
  ["game canvas", /id="game"/],
  ["health meter", /id="health-value"[\s\S]*id="health-bar"/],
  ["bottom boost meter", /id="boost-value"[\s\S]*id="boost-bar"/],
  ["round score HUD", /id="player-rounds"[\s\S]*id="round-value"[\s\S]*id="enemy-rounds"/],
  ["round countdown", /id="round-countdown"[\s\S]*id="round-countdown-value"/],
  ["rival health meter", /id="rival-health-bar"[\s\S]*id="rival-health-value"/],
  ["controls", /id="controls"/],
  ["camera mode HUD", /id="camera-mode-value"[^>]*>CHASE CAM/],
  ["level selector", /id="level-select"/],
  ["starter turret selector", /id="starter-select"[\s\S]*data-starter-turret="mg"[\s\S]*data-starter-turret="rocket"[\s\S]*data-starter-turret="sniper"/],
  ["between-round card draft", /id="card-draft"[\s\S]*id="card-grid"/],
  ["owned turret loadout", /id="weapon-select"[\s\S]*ROOF LOADOUT[\s\S]*WHEEL \/ 1–3 TO SWAP/],
  ["Dust Ring deploy button", /data-level="dustring"/],
  ["Capsule Circuit deploy button", /data-level="ovalbowl"[\s\S]*CAPSULE CIRCUIT/],
  ["compiled module", /assets\/.*\.js/],
  ["compiled stylesheet", /assets\/.*\.css/],
];

for (const [label, pattern] of checks) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in production output`);
}

const sceneChecks = [
  ["terrain", /addArena\(\)/],
  ["vehicle", /buildCar\(\)/],
  ["licensed GLB loader", /new GLTFLoader\(\)/],
  ["central asset manifest", /riggedAssetManifest/],
  ["Racekart OBJ loader", /new OBJLoader\(\)/],
  ["Racekart material loader", /new MTLLoader\(\)/],
  ["Racekart Hilly manifest", /riggedRacekartManifest/],
  ["Kenney SUV visual", /kenney-car-kit-suv/],
  ["animated imported wheel nodes", /vehicle\.wheelNodes/],
  ["driveable Racekart visual", /racekart-hilly-driveable/],
  ["Racekart arena fence", /racekart-hilly-arena-fence/],
  ["continuous circular track", /continuous-circular-ring-track/],
  ["continuous capsule wall ride mesh", /capsule-continuous-layered-wall-ride-surface/],
  ["solid capsule upper guard", /capsule-solid-upper-guard-collider/],
  ["flat floor collider debug", /capsule-flat-floor-collider-debug/],
  ["transition and bank collider debug", /capsule-transition-and-bank-collider-debug/],
  ["upper guard collider debug", /capsule-upper-guard-collider-debug/],
  ["central combat bowl", /central-combat-bowl/],
  ["ring lane markers", /ring-lane-marker/],
  ["roof weapon mount", /const turret = new THREE\.Group/],
  ["three test turret definitions", /mg: \{ kind:"mg"[\s\S]*rocket: \{ kind:"rocket"[\s\S]*sniper: \{ kind:"sniper"/],
  ["turret test selector", /querySelectorAll<HTMLButtonElement>\("\[data-weapon\]"\)/],
  ["procedural rocket turret", /kind === "rocket"[\s\S]*new THREE\.BoxGeometry\(1\.28,\.9,1\.72\)/],
  ["procedural sniper turret", /new THREE\.BoxGeometry\(\.12,\.12,3\.18\)[\s\S]*new THREE\.BoxGeometry\(\.68,\.34,\.48\)/],
  ["rocket splash damage", /bullet\.splashRadius[\s\S]*damageTarget\(target,damage\)/],
  ["large world-space rocket impact", /lastImpactEffect="rocket-world-detonation"[\s\S]*growth:major&&isRocket\?7\.2/],
  ["tight sniper laser tracer", /sniperTracerGlowGeometry = new THREE\.CylinderGeometry\(\.2,\.2,1[\s\S]*function spawnSniperTracer[\s\S]*glow\.scale\.y=distance[\s\S]*sniperTracerLength/],
  ["pinpoint sniper hit", /function spawnSniperHit[\s\S]*sniper-pinpoint-spark/],
  ["rocket flame trail", /spawnRocketTrail/],
  ["sniper segment collision", /segmentDistanceSq/],
  ["slow stamina boost recharge", /vehicle\.boost\+6\*dt/],
  ["boost depletion and recharge smoke route", /boostSmokeTest[\s\S]*boostAfterUse[\s\S]*boostAfterRecharge[\s\S]*boostSmoke/],
  ["round result state", /function finishRound\(winner:"player"\|"opponent"\)[\s\S]*dataset\.roundWinner=winner/],
  ["round HUD win smoke route", /roundWinSmokeTest[\s\S]*roundHudSmoke/],
  ["countdown-gated rounds", /type RoundPhase = "loading"[\s\S]*"starter_turret_select"[\s\S]*"card_select"[\s\S]*function beginRoundCountdown[\s\S]*function updateRoundCountdown/],
  ["starter turret ownership", /function showStarterTurretSelect[\s\S]*function chooseStarterTurret[\s\S]*createStarterRun\(kind,currentRound\)/],
  ["card draft between rounds", /function showCardDraft[\s\S]*draftCards\(runState\)[\s\S]*function chooseUpgradeCard/],
  ["three-round turret reward", /currentRound%3===0[\s\S]*dataset\.turretReward/],
  ["owned turret scroll swapping", /function cycleOwnedTurret[\s\S]*addEventListener\("wheel"/],
  ["run persistence across arenas", /sessionStorage\.setItem\(RUN_STORAGE_KEY[\s\S]*runState\.round=nextRound/],
  ["incendiary projectiles and burn", /function spawnBurnEmber[\s\S]*burnDps[\s\S]*dataset\.burnStatus="applied"/],
  ["multishot projectile fan", /projectileCount[\s\S]*for\(let index=0;index<count;index\+\+\)/],
  ["piercing projectile continuation", /piercesRemaining[\s\S]*piercingVfx="bright-tracer"/],
  ["ricochet projectile bounce", /ricochetsRemaining[\s\S]*ricochetVfx="spark"/],
  ["vehicle card runtime stats", /function recomputeRunStats[\s\S]*maxHealthMultiplier[\s\S]*handlingMultiplier[\s\S]*tractionMultiplier/],
  ["wheel card visual variants", /function applyWheelVisual[\s\S]*"racing"[\s\S]*"offroad"[\s\S]*"heavy"/],
  ["alternating map rounds", /function advanceRound[\s\S]*activeLayout\.id==="dustring"\?"ovalbowl":"dustring"[\s\S]*activeLayout=riggedArenaLayouts\[nextLayout\]/],
  ["seamless in-document round transition", /function clearRoundScene[\s\S]*roundWorldCleanup="complete"[\s\S]*seamlessTransition="complete"[\s\S]*beginRoundCountdown\(\)/],
  ["no between-round page navigation", /async function advanceRound[\s\S]*await addArena\(\);await addWorldProps\(\)/],
  ["combat opponent car", /function buildOpponentCar[\s\S]*rival-ai-combat-car[\s\S]*function updateOpponent/],
  ["opponent return fire", /function shootOpponent[\s\S]*owner:"opponent"[\s\S]*aiShotsFired/],
  ["rival damage wins round", /function damageOpponent[\s\S]*awardPlayerRound\(\)/],
  ["barrel pitch mount", /let barrelPivot = new THREE\.Group/],
  ["mouse world ray", /intersectObjects\(aimSurfaces/],
  ["ground crosshair", /const groundCrosshair = new THREE\.Group/],
  ["central vehicle stats", /type VehicleStats[\s\S]*projectileSpeed: number/],
  ["weapon stats contract", /type WeaponStats[\s\S]*fireRate: number[\s\S]*damage: number[\s\S]*projectileSpeed: number[\s\S]*range: number[\s\S]*automatic\?: boolean/],
  ["arena drops disabled", /dataset\.arenaDrops="disabled"/],
  ["projectile combat", /function shoot\(\)/],
  ["muzzle projectile direction", /shotDirection\.copy\(aimPoint\)\.sub\(shotOrigin\)\.normalize/],
  ["ramming damage", /damageTarget\(target,Math\.abs\(vehicle\.speed\)/],
  ["ramp surface collision", /function rampSample/],
  ["visual asset heightfields", /buildHeightfieldCollider\(object/],
  ["visual collider takes drive priority", /sampleHeightfield\(collider, x, z\)[\s\S]*best \?\? analyticRampSample/],
  ["async collider deployment", /await addArena\(\); await addWorldProps\(\)/],
  ["collider source telemetry", /colliderSource=activeLayout\.arenaKind==="capsule"\?"analytic-capsule-bands":"visual-asset-heightfields"/],
  ["contact point debug", /contactDebug\.position\.set/],
  ["visual collider error telemetry", /dataset\.heightMismatch/],
  ["ramp runtime smoke route", /physics-smoke.*ramp/],
  ["all ramp traversal smoke route", /all-surfaces[\s\S]*runRampTraversalSuite/],
  ["ramp landing verification", /allRampLandings[\s\S]*rampLanding/],
  ["solid prop colliders", /boxColliders/],
  ["height-aware prop colliders", /vehicle\.position\.y > obstacle\.top\+\.2/],
  ["low capsule vehicle collider", /VEHICLE_COLLIDER_RADIUS = 1\.12[\s\S]*VEHICLE_COLLIDER_HALF_LENGTH = \.95[\s\S]*VEHICLE_COLLIDER_HEIGHT = \.72/],
  ["forgiving ramp entry", /RAMP_ENTRY_BLEND = 1\.15[\s\S]*smoothstep/],
  ["held fire state", /let isFireHeld=false[\s\S]*function setFireHeld[\s\S]*if \(isFireHeld\) shoot\(\)/],
  ["fire cooldown limit", /fireCooldown = 1 \/ weaponStats\.fireRate/],
  ["held fire runtime smoke route", /holdFireSmokeTest[\s\S]*canvas\.dataset\.holdFireSmoke/],
  ["fixed physics timestep", /FIXED_TIMESTEP = 1 \/ 60[\s\S]*while\(physicsAccumulator>=FIXED_TIMESTEP/],
  ["interpolated vehicle render", /function updateVehicleVisual[\s\S]*lerpVectors/],
  ["performance debug", /function updateDebug[\s\S]*renderer\.info\.render\.calls/],
  ["looping quiet soundtrack", /soundtrack\.loop = true[\s\S]*soundtrack\.volume = \.12/],
  ["continuous music through rounds", /soundtrack\.preload = "auto"[\s\S]*musicContinuity="single-document-loop"/],
  ["eager combat audio decode", /sfxDataPromises[\s\S]*decodeAudioData[\s\S]*dataset\.combatAudio="decoded"/],
  ["first-shot GPU prewarm", /function warmCombatResources[\s\S]*offscreen-combat-resource-warmup[\s\S]*renderer\.compileAsync[\s\S]*combatPrewarm="complete"/],
  ["speed-reactive engine loop", /vehicle-engine-loop\.wav[\s\S]*function updateEngineAudio[\s\S]*engineLoop\.playbackRate/],
  ["distinct turret firing sounds", /turret-mg-fire\.wav[\s\S]*turret-rocket-fire\.ogg[\s\S]*turret-sniper-fire\.ogg[\s\S]*if\(selectedWeapon==="mg"\)playSfx/],
  ["quieter machine gun", /if\(selectedWeapon==="mg"\)playSfx\("turret-mg",\.10/],
  ["low-latency directional audio", /createStereoPanner\(\)[\s\S]*spatialCameraRight[\s\S]*stereo-world-positioned/],
  ["shot audio node cleanup", /source\.onended=[\s\S]*source\.disconnect\(\)[\s\S]*panner\.disconnect\(\)/],
  ["stable muzzle light shaders", /new THREE\.PointLight\(0xff8a24, 0[\s\S]*muzzleFlash\.intensity = 0/],
  ["pooled machine-gun projectiles", /mgProjectilePool[\s\S]*acquireMgProjectile[\s\S]*releaseProjectile/],
  ["pooled transient effect materials", /effectMaterialPool[\s\S]*recycleEffectMaterial/],
  ["audio failure isolation", /function updateAudioFrame[\s\S]*audioFrameDisabled=true[\s\S]*gameplay will continue/],
  ["countdown before audio work", /if\(!paused&&levelStarted\)updateRoundCountdown\(\);[\s\S]*updateAudioFrame\(frameDelta\)/],
  ["rocket trail detonation cleanup", /function clearRocketTrail[\s\S]*rocketTrailCleanup="detonation-synced"[\s\S]*clearRocketTrail\(bullet\.id\)/],
  ["incoming vehicle clank", /function hitVehicle[\s\S]*playSfx\("vehicle-hit"/],
  ["confirmed-hit clank", /function damageTarget[\s\S]*playHitConfirmation[\s\S]*playSfx\("confirmed-hit"/],
  ["cloudy environment map", /cloudy-sky\.png[\s\S]*scene\.environment = skyTexture/],
  ["dirty arena ground material", /dirty-arena-ground-v1\.png[\s\S]*const sand = new THREE\.MeshStandardMaterial/],
  ["weathered metal arena walls", /weathered-arena-metal-v1\.png[\s\S]*const wallMetal = new THREE\.MeshStandardMaterial/],
  ["gritty turret material", /gritty-turret-metal-v1\.png[\s\S]*const darkMetal = new THREE\.MeshStandardMaterial/],
  ["volumetric cloudy light shafts", /cloud-break-volumetric-light[\s\S]*volumetric-dust-motes/],
  ["optimized shadow map", /shadowMap\.type = THREE\.PCFShadowMap[\s\S]*shadow\.mapSize\.set\(1024, 1024\)[\s\S]*shadow\.normalBias/],
  ["bounded render resolution", /MAX_PIXEL_RATIO = 1\.25[\s\S]*Math\.min\(devicePixelRatio, MAX_PIXEL_RATIO\)/],
  ["cached effect traversal", /function registerVisualEffect[\s\S]*meshes:THREE\.Mesh\[\][\s\S]*function removeVisualEffect/],
  ["disposed effect materials", /function removeVisualEffect[\s\S]*material\.dispose\(\)/],
  ["reused aim intersections", /aimIntersections\.length=0;raycaster\.intersectObjects\(aimSurfaces,true,aimIntersections\)/],
  ["layout-sized arena boundary", /ARENA_RADIUS = activeLayout\.radius/],
  ["ring geometry telemetry", /dataset\.ringInnerRadius/],
  ["ring clearance audit", /function auditArenaFlow[\s\S]*ringTrackDrivable/],
  ["central combat area audit", /dataset\.centralCombatArea/],
  ["target lane audit", /dataset\.targetArea/],
  ["future opponent spawn", /opponent-spawn-placeholder/],
  ["recovery control", /event\.code==="KeyR"\)resetVehicle/],
  ["automatic outside recovery", /OUT OF BOUNDS \/\/ AUTO RECOVERY/],
  ["three-disc capsule boundary", /resolveOvalBoundary\(activeLayout\.bowl[\s\S]*VEHICLE_COLLIDER_HALF_LENGTH[\s\S]*VEHICLE_COLLIDER_RADIUS/],
  ["sliding upper guard response", /function applyCapsuleGuardResponse[\s\S]*outwardSpeed/],
  ["wall surface grip", /rampNow\.ramp\.kind==="wall"[\s\S]*wallRideGrip/],
  ["surface tangent projection", /function projectDirectionToDriveSurface[\s\S]*addScaledVector\(sample\.normal,-out\.dot\(sample\.normal\)\)/],
  ["arcade surface orientation frame", /function updateArcadeSurfaceFrame[\s\S]*makeBasis\(surfaceRight,desiredSurfaceUp,surfaceForward\)/],
  ["bounded arcade wall roll", /MAX_ARCADE_WALL_ROLL[\s\S]*MathUtils\.clamp\(surfaceEuler\.z/],
  ["correct roll slope direction", /Math\.atan2\(rightY-leftY,2\.4\)/],
  ["wall turning runtime suite", /function runWallTurningSuite[\s\S]*wallTurningSmoke/],
  ["surface frame debug arrows", /debugSurfaceNormal[\s\S]*debugSurfaceForward[\s\S]*debugVelocity[\s\S]*debugWallContact/],
  ["horizon stabilized wall camera", /cameraController\.update\([\s\S]*playerHeading:vehicle\.heading/],
  ["wall ride runtime smoke route", /function runWallRideSuite[\s\S]*wallRideSmoke/],
  ["wall reset runtime verification", /dataset\.wallReset=resetPassed\?"passed":"failed"/],
  ["analytic capsule collision telemetry", /capsuleCollision = "three-disc-analytic-bands"/],
  ["chase camera", /function updateCamera/],
  ["enemy camera toggle", /function toggleCameraMode[\s\S]*event\.code==="KeyC"/],
  ["enemy camera telemetry", /dataset\.cameraAimMode[\s\S]*dataset\.cameraLookAt/],
];
for (const [label, pattern] of sceneChecks) {
  if (!pattern.test(source)) throw new Error(`Missing ${label} implementation`);
}
const roguelikeChecks = [
  ["extensible run state", /type ScraproadRunState[\s\S]*ownedTurrets[\s\S]*turretStats[\s\S]*vehicleStats[\s\S]*upgrades/],
  ["impactful weapon cards", /id:"double-tap"[\s\S]*id:"heavy-rounds"[\s\S]*id:"multishot"[\s\S]*id:"incendiary-rounds"/],
  ["vehicle and utility cards", /id:"racing-tires"[\s\S]*id:"turbocharger"[\s\S]*id:"reinforced-plating"[\s\S]*id:"field-repair"[\s\S]*id:"emergency-shield"/],
  ["guaranteed three-round turret card", /state\.round%3!==0[\s\S]*createTurretCard/],
];
for (const [label, pattern] of roguelikeChecks) {
  if (!pattern.test(roguelikeSource)) throw new Error(`Missing ${label} implementation`);
}
if (/impact-frame/.test(html) || /triggerImpactFrame/.test(source)) throw new Error("Full-screen weapon impact frames must remain removed");
const colliderChecks = [
  ["downward visual ray sampling", /new THREE\.Raycaster\(\)[\s\S]*intersectObject\(object, true\)/],
  ["bounded heightfield grid", /columns = THREE\.MathUtils\.clamp[\s\S]*rows = THREE\.MathUtils\.clamp/],
  ["interpolated collision heights", /const samples = \[[\s\S]*height \/ weight/],
  ["matching collider wireframe", /createHeightfieldDebug[\s\S]*new THREE\.LineSegments/],
];
for (const [label, pattern] of colliderChecks) {
  if (!pattern.test(colliderSource)) throw new Error(`Missing ${label} implementation`);
}
const ovalChecks = [
  ["capsule surface sampler", /function sampleOvalBowl/],
  ["layered wall transition", /band: "transition"[\s\S]*band: "bank"[\s\S]*band: "upper-bank"/],
  ["surface normal", /new THREE\.Vector3\(-outwardX \* slope, 1, -outwardZ \* slope\)\.normalize/],
  ["generated floor collision geometry", /function createOvalFloorGeometry/],
  ["generated bank collision geometry", /function createOvalBankGeometry/],
  ["enclosed rim curtain", /function createOvalRimCurtainGeometry/],
  ["raised guard wall", /bankTop \+ config\.guardHeight/],
  ["three-disc boundary solver", /function resolveOvalBoundary[\s\S]*\[-halfLength, 0, halfLength\]/],
];
for (const [label, pattern] of ovalChecks) {
  if (!pattern.test(ovalSource)) throw new Error(`Missing ${label} implementation`);
}
const cameraChecks = [
  ["two camera modes", /type RiggedCameraMode = "chase" \| "enemy"/],
  ["player anchored enemy framing", /desiredPosition\.copy\(frame\.playerPosition\)\.addScaledVector\(this\.forward, -this\.followDistance\)/],
  ["player enemy blended focus", /desiredLook\.lerpVectors\(frame\.playerPosition, frame\.enemyPosition, focusBlend\)/],
  ["smoothed orbit yaw", /yawDelta[\s\S]*this\.response\(5\.4, dt\)/],
  ["smoothed target distance", /distanceGoal[\s\S]*this\.followDistance = THREE\.MathUtils\.lerp/],
  ["world-up horizon", /camera\.up\.set\(0, 1, 0\)/],
  ["missing target fallback", /fellBackToChase = true/],
  ["arena boundary clamp", /constrainToArena[\s\S]*ARENA_WALL_CLEARANCE/],
  ["floor clearance", /groundHeight\(this\.desiredPosition\.x, this\.desiredPosition\.z\) \+ MIN_FLOOR_CLEARANCE/],
];
for (const [label, pattern] of cameraChecks) {
  if (!pattern.test(cameraSource)) throw new Error(`Missing ${label} implementation`);
}
for (const key of ["stuntRamp", "fence", "rockWide", "rockTall", "hayBale"]) {
  if (!racekartManifest.includes(`${key}: asset(`)) throw new Error(`Missing ${key} from Racekart asset manifest`);
}
if (!layouts.includes("dustring: {")) throw new Error("Missing Dust Ring arena layout");
if (!layouts.includes("ovalbowl: {")) throw new Error("Missing Capsule Circuit arena layout");
if (!/ovalbowl:[\s\S]*arenaKind: "capsule"[\s\S]*bowl: \{ straightHalfLength: 46, flatRadius: 44, outerRadius: 62, wallRise: 11\.5, guardHeight: 4\.5 \}/.test(layouts)) throw new Error("Capsule Circuit dimensions are missing");
if ((layouts.match(/asset: "stuntRailing"/g) ?? []).length !== 4) throw new Error("Capsule Circuit must use four restrained Racing Assets rim railings");
if ((layouts.match(/targets: \[\]/g) ?? []).length !== 2) throw new Error("Target dummies must be removed from both arenas");
if ((layouts.match(/\{ asset: "stuntRamp", kind: "ramp"/g) ?? []).length !== 4) throw new Error("Expected exactly 4 placed ramp surfaces");
if (/\{ asset: "[^"]+", kind: "bridge"/.test(layouts)) throw new Error("Dust Ring must not include bridge or loop stunt chains");
if (/pickup/i.test(layouts)) throw new Error("Arena drops must remain fully removed from layouts");
if (/\b(?:createPickup|equipPickup|updatePickups|partCatalog|pickups)\b/.test(source)) throw new Error("Arena pickup runtime must remain removed");
if ((layouts.match(/rotation:/g) ?? []).length < 10) throw new Error("Expected curated track and prop placements");
if (/dustbowl|stuntworks|bridge deck|mega jump/i.test(layouts)) throw new Error("Legacy stunt arena content remains in the layout");

const assetPaths = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map((match) => match[1]);
for (const asset of assetPaths) await access(resolve(root, asset));

console.log(`Rigged production validation passed (${sceneChecks.length} gameplay/asset systems, 2 selectable arenas including Capsule Circuit's analytic collider bands, ${racekartModels.length} selected Racekart Hilly models, and ${required.length + assetPaths.length} files checked).`);
