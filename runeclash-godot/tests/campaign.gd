extends SceneTree
const Scene = preload("res://scenes/Main.tscn")

func _initialize() -> void:
 call_deferred("run")

func run() -> void:
 var game = Scene.instantiate()
 root.add_child(game)
 game.set_process(false)
 var plan = [[1,2,2],[3,6],[5,5,7],[3,1,2,1],[6,3,7],[1,3,5,2,4]]
 for r in range(12):
  var recruits: Array = plan[mini(r,plan.size()-1)]
  for kind in recruits:
   game.choose_kind(kind)
   var placed = false
   for x in ([0,1,2,3] if kind in [2,3] else [3,2,1,0]):
    for y in [3,4,2,5,1,6,0,7]:
     var occupied = false
     for entry in game.army:
      if entry.cell == Vector2i(x,y):
       occupied = true
     if not occupied and game.gold >= game.Data.ROSTER[kind].cost:
      placed = game.place_at(Vector2i(x,y))
      break
    if placed:
     break
  game.advance()
  for tick in range(4000):
   if game.sim.finished:
    break
   game.sim.step(1.0/60.0)
  game.resolve_battle()
  print("Round %d: winner=%d, damage=%d, commanders=%s, time=%.1f, troops=%d" % [game.round_number,game.sim.winner,game.sim.damage,game.commander,game.sim.elapsed,game.army.size()])
  if game.phase == "over":
   break
  if game.tech_pending:
   game.choose_tech(1)
  game.advance()
 game.free()
 quit()
