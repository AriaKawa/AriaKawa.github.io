extends RefCounted
const Data = preload("res://scripts/UnitData.gd")
var units: Array = []
var shots: Array = []
var effects: Array = []
var elapsed: float = 0.0
var finished: bool = false
var winner: int = -2
var damage: int = 0
var attack_count: int = 0
var death_count: int = 0
var projectile_count: int = 0

func setup(player: Array, enemy: Array, tech: int = -1) -> void:
 units.clear()
 shots.clear()
 effects.clear()
 elapsed = 0.0
 finished = false
 winner = -2
 damage = 0
 attack_count = 0
 death_count = 0
 projectile_count = 0
 for team in range(2):
  for entry in (player if team == 0 else enemy):
   var d: Dictionary = Data.ROSTER[entry.kind]
   var multiplier: float = 1.0 + (entry.level - 1) * 0.3
   var health: float = d.hp * multiplier * (1.18 if team == 0 and tech == 0 else 1.0)
   units.append({"kind":entry.kind,"team":team,"pos":Vector2(entry.cell) + Vector2(0.5,0.5),"hp":health,"max_hp":health,"damage":d.damage * multiplier * (1.15 if team == 0 and tech == 1 else 1.0),"interval":d.interval * (0.85 if team == 0 and tech == 2 else 1.0),"cooldown":0.15,"charged":false,"flash":0.0,"level":entry.level})

func target_for(u: Dictionary) -> int:
 var best: int = -1
 var score: float = INF
 for i in range(units.size()):
  var v: Dictionary = units[i]
  if v.team == u.team or v.hp <= 0:
   continue
  var distance: float = u.pos.distance_to(v.pos)
  if (u.kind in [4,7] and v.kind in [2,3]) or (u.kind == 5 and v.kind in [4,6]):
   distance *= 0.35
  if distance < score:
   score = distance
   best = i
 return best

func hit(target: int, amount: float, magic: bool, attacker_kind: int) -> void:
 var v: Dictionary = units[target]
 if v.hp <= 0:
  return
 if attacker_kind == 5 and v.kind in [4,6]:
  amount *= 2.0
 if magic and v.kind == 6:
  amount *= 1.4
 var actual: float = maxf(1.0, amount - (0.0 if magic else Data.ROSTER[v.kind].armor))
 v.hp -= actual
 v.flash = 0.16
 effects.append({"pos":v.pos,"life":0.45,"max":0.45,"kind":"hit","magic":magic})
 if v.hp <= 0:
  death_count += 1
  effects.append({"pos":v.pos,"life":0.8,"max":0.8,"kind":"death","magic":magic})

func step(dt: float) -> void:
 if finished:
  return
 elapsed += dt
 for effect in effects:
  effect.life -= dt
 effects = effects.filter(func(e): return e.life > 0)
 for u in units:
  u.flash = maxf(0.0, u.flash - dt)
  if u.hp <= 0:
   continue
  var target: int = target_for(u)
  if target < 0:
   continue
  var v: Dictionary = units[target]
  var d: Dictionary = Data.ROSTER[u.kind]
  u.cooldown -= dt
  if u.pos.distance_to(v.pos) > d.range:
   var motion: Vector2 = u.pos.direction_to(v.pos) * d.speed
   # Soft separation prevents stacks without pathfinding deadlocks.
   for other in units:
    if other == u or other.hp <= 0:
     continue
    var diff: Vector2 = u.pos - other.pos
    if diff.length() < 0.48 and diff.length() > 0.001:
     motion += diff.normalized() * (0.48 - diff.length()) * 5.0
   u.pos += motion * dt
   u.pos = u.pos.clamp(Vector2(0.2,0.2),Vector2(11.8,7.8))
  elif u.cooldown <= 0:
   u.cooldown = u.interval
   var power: float = u.damage
   if u.kind == 4 and not u.charged:
    power *= 2.0
    u.charged = true
   attack_count += 1
   if u.kind in [2,3]:
    projectile_count += 1
    shots.append({"pos":u.pos,"target":target,"damage":power,"magic":u.kind == 3,"team":u.team})
   else:
    hit(target,power,false,u.kind)
 for shot in shots.duplicate():
  var v: Dictionary = units[shot.target]
  shot.pos = shot.pos.move_toward(v.pos, dt * (7.0 if shot.magic else 12.0))
  if shot.pos.distance_to(v.pos) < 0.15:
   if shot.magic:
    effects.append({"pos":v.pos,"life":0.4,"max":0.4,"kind":"blast","magic":true})
    for i in range(units.size()):
     if units[i].team != shot.team and units[i].pos.distance_to(v.pos) < 1.15:
      hit(i,shot.damage,true,3)
   else:
    hit(shot.target,shot.damage,false,2)
   shots.erase(shot)
 var alive: Array = [0,0]
 var weights: Array = [0,0]
 var health: Array = [0.0,0.0]
 for u in units:
  if u.hp > 0:
   alive[u.team] += 1
   weights[u.team] += 2 if u.kind == 6 else 1
   health[u.team] += u.hp / u.max_hp
 if alive[0] == 0 or alive[1] == 0 or elapsed >= 65.0:
  finished = true
  if alive[0] == 0 and alive[1] == 0:
   winner = -1
  elif elapsed >= 65.0:
   winner = 0 if health[0] > health[1] else (1 if health[1] > health[0] else -1)
  else:
   winner = 0 if alive[0] > 0 else 1
  damage = 2 + weights[winner] if winner >= 0 else 0
