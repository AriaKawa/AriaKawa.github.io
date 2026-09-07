extends SceneTree
const MainScene = preload("res://scenes/Main.tscn")
const Simulator = preload("res://scripts/BattleSimulator.gd")
const Enemy = preload("res://scripts/EnemyArmyBuilder.gd")
var failures: int = 0

func check(ok: bool, description: String) -> void:
 if not ok:
  failures += 1
  printerr("FAIL: ",description)
 else:
  print("PASS: ",description)

func _initialize() -> void:
 call_deferred("run")

func fight(game) -> void:
 game.advance()
 check(game.phase == "battle","battle starts")
 var steps = 0
 while not game.sim.finished and steps < 4000:
  game.sim.step(1.0/60.0)
  steps += 1
 check(game.sim.finished,"battle terminates within 65 seconds")
 game.resolve_battle()

func run() -> void:
 var game = MainScene.instantiate()
 root.add_child(game)
 game.set_process(false)
 check(game.gold == 10 and game.commander == [30,30],"initial economy and health")
 game.choose_kind(1)
 check(not game.place_at(Vector2i(5,3)),"neutral-zone placement rejected")
 check(game.place_at(Vector2i(3,3)) and game.gold == 6,"buy and place tank")
 game.choose_kind(2)
 game.place_at(Vector2i(1,3))
 game.place_at(Vector2i(1,4))
 check(game.gold == 0 and game.army.size() == 3,"gold charged per placement")
 check(not game.place_at(Vector2i(0,0)),"unaffordable purchase rejected")
 game.place_at(Vector2i(1,4))
 game.place_at(Vector2i(0,4))
 check(game.army[2].cell == Vector2i(0,4),"reposition without spending")
 game.sell_selected()
 check(game.gold == 3 and game.army.size() == 2,"sell refund")
 game.choose_kind(2)
 game.place_at(Vector2i(1,4))
 fight(game)
 check(game.sim.attack_count > 0 and game.sim.death_count > 0 and game.sim.projectile_count > 0,"attacks projectiles and deaths")
 check(game.sim.winner == 0,"balanced starter army wins easy first round")
 check(game.commander[1] < 30,"enemy commander damage applied")
 var formation = game.army.duplicate(true)
 game.advance()
 check(game.round_number == 2 and game.gold == 12 and game.army == formation,"next-round income and persistent army")
 game.place_at(Vector2i(3,3))
 game.upgrade_selected()
 check(game.army[0].level == 2 and game.gold == 10,"veteran upgrade")
 fight(game)
 check(game.tech_pending,"rune choice after round two")
 game.choose_tech(1)
 game.advance()
 check(game.round_number == 3 and game.tech == 1,"rune selection allows next round")
 game.reset_run()
 game.choose_kind(0)
 game.place_at(Vector2i(0,0))
 fight(game)
 check(game.commander[0] < 30,"losing damages player commander")
 for r in range(12):
  if game.phase == "over":
   break
  if game.tech_pending:
   game.choose_tech(0)
  game.advance()
  fight(game)
 check(game.phase == "over" and game.commander[0] == 0,"defeat ends run")
 game.reset_run()
 check(game.gold == 10 and game.army.is_empty() and game.round_number == 1 and game.tech == -1 and game.phase == "deploy","restart clears entire run")
 game.gold = 150
 for i in range(16):
  game.choose_kind([1,3,5,2][i%4])
  game.place_at(Vector2i(i%4,i/4))
 for r in range(12):
  fight(game)
  if game.phase == "over":
   break
  if game.tech_pending:
   game.choose_tech(2)
  game.advance()
 check(game.phase == "over" and game.commander[1] == 0,"victory ends run")
 for r in [1,2,3,4,5,6,7,8,9,20,100]:
  var wave = Enemy.build(r)
  var occupied = {}
  var legal = true
  for unit in wave:
   legal = legal and not occupied.has(unit.cell) and unit.cell.x >= 8 and unit.cell.x < 12
   occupied[unit.cell] = true
  check(legal,"enemy legal unique cells round %d" % r)
 var sim = Simulator.new()
 sim.setup([{"kind":5,"cell":Vector2i(3,3),"level":1}],[{"kind":4,"cell":Vector2i(8,3),"level":1}])
 var before: float = sim.units[1].hp
 sim.hit(1,15,false,5)
 check(is_equal_approx(before-sim.units[1].hp,28.0),"spearman anti-cavalry multiplier")
 sim.setup([{"kind":3,"cell":Vector2i(3,3),"level":1}],[{"kind":6,"cell":Vector2i(8,3),"level":1}])
 before = sim.units[1].hp
 sim.hit(1,26,true,3)
 check(is_equal_approx(before-sim.units[1].hp,36.4),"magic bypasses golem armor and exploits weakness")
 game.free()
 print("VALIDATION COMPLETE: %d failures" % failures)
 quit(1 if failures else 0)
