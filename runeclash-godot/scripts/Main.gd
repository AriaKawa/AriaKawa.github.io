extends Node2D
const Data = preload("res://scripts/UnitData.gd")
const Enemy = preload("res://scripts/EnemyArmyBuilder.gd")
const Simulator = preload("res://scripts/BattleSimulator.gd")
const ORIGIN = Vector2(40,218)
const CELL = 68.0
const GOLD = Color("dfc087")
const INK = Color("e5e9ed")
const MUTED = Color("8d9aa9")
const TEAL = Color("72d9c2")
var font: Font = ThemeDB.fallback_font
var round_number: int = 1
var gold: int = 10
var commander: Array = [30,30]
var army: Array = []
var enemy: Array = []
var phase: String = "deploy"
var selected_kind: int = -1
var selected_unit: int = -1
var speed: int = 1
var tech: int = -1
var tech_pending: bool = false
var message: String = "Choose a unit, then click a blue tile to recruit. Gold is spent on placement."
var result_title: String = ""
var result_detail: String = ""
var sim = Simulator.new()
var shop: Array[Button] = []
var action: Button
var sell: Button
var upgrade: Button
var speed_button: Button
var restart: Button
var tech_buttons: Array[Button] = []
var clock_time: float = 0.0

func _ready() -> void:
 make_ui()
 reset_run()

func box(bg: Color, border: Color) -> StyleBoxFlat:
 var s = StyleBoxFlat.new()
 s.bg_color = bg
 s.border_color = border
 s.set_border_width_all(1)
 s.set_corner_radius_all(9)
 s.content_margin_left = 13
 s.content_margin_right = 10
 return s

func button(text_value: String, rect: Rect2, callback: Callable, accent: bool = false) -> Button:
 var b = Button.new()
 b.text = text_value
 b.position = rect.position
 b.size = rect.size
 b.add_theme_font_size_override("font_size",16)
 b.add_theme_color_override("font_color", INK)
 b.add_theme_color_override("font_disabled_color", Color("647080"))
 b.add_theme_stylebox_override("normal",box(Color("173832") if accent else Color("172330"), TEAL if accent else Color("354353")))
 b.add_theme_stylebox_override("hover",box(Color("29463e"),GOLD))
 b.add_theme_stylebox_override("pressed",box(Color("3d5148"),TEAL))
 b.add_theme_stylebox_override("disabled",box(Color("101923"),Color("23303e")))
 b.pressed.connect(callback)
 add_child(b)
 return b

func make_ui() -> void:
 for i in range(8):
  var d: Dictionary = Data.ROSTER[i]
  var b = button("",Rect2(912+(i%2)*244,220+(i/2)*132,232,120),choose_kind.bind(i))
  b.alignment = HORIZONTAL_ALIGNMENT_LEFT
  b.add_theme_font_size_override("font_size",15)
  b.tooltip_text = d.tip + "\nMove: %.1f cells/s | Armor: %d | Attack: %.2fs" % [d.speed,d.armor,d.interval]
  shop.append(b)
 action = button("START BATTLE  >",Rect2(630,804,226,54),advance,true)
 sell = button("Sell",Rect2(40,804,144,54),sell_selected)
 upgrade = button("Upgrade",Rect2(196,804,210,54),upgrade_selected)
 speed_button = button("Speed  1x",Rect2(1194,123,194,46),toggle_speed)
 restart = button("Restart run",Rect2(1194,53,194,42),reset_run)
 for i in range(3):
  var b = button(["Bulwark\n+18% army health","War runes\n+15% army damage","War drums\n15% faster attacks"][i],Rect2(104+i*234,540,218,76),choose_tech.bind(i),true)
  b.visible = false
  tech_buttons.append(b)

func reset_run() -> void:
 round_number = 1
 gold = 10
 commander = [30,30]
 army.clear()
 phase = "deploy"
 selected_kind = -1
 selected_unit = -1
 tech = -1
 tech_pending = false
 speed = 1
 sim = Simulator.new()
 enemy = Enemy.build(1)
 message = "Choose a unit, then click a blue tile to recruit. Gold is spent on placement."
 refresh()

func choose_kind(kind: int) -> void:
 if phase != "deploy":
  return
 selected_kind = kind
 selected_unit = -1
 message = "Place %s on an empty blue tile. %s" % [Data.ROSTER[kind].name,Data.ROSTER[kind].tip]
 refresh()

func place_at(cell: Vector2i) -> bool:
 if phase != "deploy" or cell.x < 0 or cell.x >= 4 or cell.y < 0 or cell.y >= 8:
  return false
 for i in range(army.size()):
  if army[i].cell == cell:
   selected_unit = i
   selected_kind = -1
   message = "%s selected. Click an empty blue tile to move, or upgrade / sell." % Data.ROSTER[army[i].kind].name
   refresh()
   return false
 if selected_unit >= 0:
  army[selected_unit].cell = cell
  refresh()
  return true
 if selected_kind >= 0 and gold >= Data.ROSTER[selected_kind].cost:
  gold -= Data.ROSTER[selected_kind].cost
  army.append({"kind":selected_kind,"cell":cell,"level":1})
  message = "%s recruited. Your army returns at full health after every battle." % Data.ROSTER[selected_kind].name
  refresh()
  return true
 return false

func sell_selected() -> void:
 if phase != "deploy" or selected_unit < 0:
  return
 var entry: Dictionary = army[selected_unit]
 gold += Data.ROSTER[entry.kind].cost + (entry.level-1)*2
 army.remove_at(selected_unit)
 selected_unit = -1
 message = "Unit sold. Recruitment and upgrade gold fully refunded."
 refresh()

func upgrade_selected() -> void:
 if phase == "deploy" and selected_unit >= 0 and gold >= 2 and army[selected_unit].level < 3:
  gold -= 2
  army[selected_unit].level += 1
  message = "Veteran trained: +30% base health and damage per level (maximum III)."
  refresh()

func toggle_speed() -> void:
 speed = 2 if speed == 1 else 1
 refresh()

func advance() -> void:
 if phase == "deploy" and not army.is_empty():
  phase = "battle"
  selected_kind = -1
  selected_unit = -1
  sim.setup(army,enemy,tech)
  message = "Armies engaged. Placement is locked. Surviving troops damage the losing commander."
 elif phase == "result" and not tech_pending:
  round_number += 1
  gold += 10 + (round_number-1)*2
  enemy = Enemy.build(round_number)
  phase = "deploy"
  message = "Round %d: +%d gold. Scout the enemy, reposition, and recruit." % [round_number,10+(round_number-1)*2]
 elif phase == "over":
  reset_run()
 refresh()

func resolve_battle() -> void:
 if sim.winner >= 0:
  var loser: int = 1 - sim.winner
  commander[loser] = maxi(0,commander[loser]-sim.damage)
 result_title = "ROUND WON" if sim.winner == 0 else ("ROUND LOST" if sim.winner == 1 else "STALEMATE")
 result_detail = ("Enemy" if sim.winner == 0 else "Your") + " commander takes %d damage." % sim.damage if sim.winner >= 0 else "Both armies fell. No commander damage."
 phase = "over" if commander[0] <= 0 or commander[1] <= 0 else "result"
 if phase == "over":
  result_title = "THE COVENANT FALLS" if commander[1] <= 0 else "YOUR RUN HAS ENDED"
  result_detail = "Victory in %d rounds. The field belongs to you." % round_number if commander[1] <= 0 else "Defeated in round %d. Try spears against cavalry and magic against armor." % round_number
 tech_pending = phase == "result" and round_number == 2 and tech == -1
 message = "All recruited units recover. Your formation and unused gold carry over."
 refresh()

func choose_tech(value: int) -> void:
 tech = value
 tech_pending = false
 refresh()

func refresh() -> void:
 for i in range(8):
  var d: Dictionary = Data.ROSTER[i]
  shop[i].text = "%s%s   %dg\n%s\nHP %d   ATK %d   RNG %.1f\n%s" % ["> " if selected_kind == i else "",d.name,d.cost,d.role,d.hp,d.damage,d.range,["Cheap sword frontline","High armor, slow advance","Protect your backline","Splash; ignores armor","Double first-hit damage","2x vs cavalry / golem","Huge HP; weak to magic","Hunts archers / mages"][i]]
  shop[i].disabled = phase != "deploy" or gold < d.cost
  shop[i].add_theme_color_override("font_color",Color(d.color))
 action.text = "START BATTLE  >" if phase == "deploy" else ("FIGHTING..." if phase == "battle" else ("RESTART RUN" if phase == "over" else "NEXT ROUND  >"))
 action.disabled = (phase == "deploy" and army.is_empty()) or phase == "battle" or tech_pending
 sell.disabled = phase != "deploy" or selected_unit < 0
 upgrade.disabled = phase != "deploy" or selected_unit < 0 or gold < 2
 if selected_unit >= 0:
  upgrade.disabled = upgrade.disabled or army[selected_unit].level >= 3
 upgrade.text = "Train +30%  /  2g"
 speed_button.text = "Speed  %dx" % speed
 for b in tech_buttons:
  b.visible = tech_pending
 queue_redraw()

func _unhandled_input(event: InputEvent) -> void:
 if event is InputEventMouseButton and event.pressed:
  var cell = Vector2i(((get_global_mouse_position()-ORIGIN)/CELL).floor())
  if event.button_index == MOUSE_BUTTON_LEFT:
   place_at(cell)
  elif event.button_index == MOUSE_BUTTON_RIGHT and phase == "deploy":
   for i in range(army.size()):
    if army[i].cell == cell:
     selected_unit = i
     sell_selected()
     return
   selected_kind = -1
   selected_unit = -1
   refresh()

func _process(delta: float) -> void:
 clock_time += delta
 if phase == "battle":
  # Bounded substeps preserve counters and collision at either playback speed.
  var dt: float = minf(delta,0.1)*speed
  while dt > 0.0 and not sim.finished:
   var step_size: float = minf(dt,1.0/60.0)
   sim.step(step_size)
   dt -= step_size
  if sim.finished:
   resolve_battle()
 queue_redraw()

func label_at(value: String, pos: Vector2, size_value: int = 16, color: Color = INK) -> void:
 draw_string(font,pos,value,HORIZONTAL_ALIGNMENT_LEFT,-1,size_value,color)

func panel(rect: Rect2, bg: Color, border: Color) -> void:
 draw_style_box(box(bg,border),rect)

func token(pos: Vector2, kind: int, team: int, hp: float = 1.0, level: int = 1, flash: float = 0.0) -> void:
 var c = Color(Data.ROSTER[kind].color)
 var side = TEAL if team == 0 else Color("f08083")
 var radius: float = 23.0 if kind == 6 else 18.0
 draw_set_transform(pos)
 draw_circle(Vector2(2,8),radius+4,Color(0,0,0,0.4))
 draw_circle(Vector2.ZERO,radius+4,Color(side,0.13))
 draw_arc(Vector2.ZERO,radius+3,0,TAU,32,side,1.5,true)
 draw_circle(Vector2.ZERO,radius,Color("17212c") if flash <= 0 else Color("faf1ce"))
 match kind:
  0: # Sword and helmet.
   draw_colored_polygon(PackedVector2Array([Vector2(-9,12),Vector2(-8,-4),Vector2(0,-12),Vector2(8,-4),Vector2(9,12)]),c)
   draw_line(Vector2(-5,-1),Vector2(5,-1),Color("293443"),3)
   draw_line(Vector2(12,9),Vector2(12,-16),INK,3)
   draw_line(Vector2(7,3),Vector2(17,3),GOLD,2)
  1:
   draw_colored_polygon(PackedVector2Array([Vector2(-12,-12),Vector2(12,-12),Vector2(10,6),Vector2(0,16),Vector2(-10,6)]),c)
   draw_line(Vector2(0,-8),Vector2(0,9),INK,3)
   draw_line(Vector2(-7,-2),Vector2(7,-2),INK,2)
  2:
   draw_arc(Vector2(-5,0),16,-1.2,1.2,20,c,3,true)
   draw_line(Vector2(1,-15),Vector2(1,15),INK,1)
   draw_line(Vector2(-12,0),Vector2(16,0),GOLD,2)
   draw_colored_polygon(PackedVector2Array([Vector2(17,0),Vector2(10,-4),Vector2(10,4)]),INK)
  3:
   draw_colored_polygon(PackedVector2Array([Vector2(-12,13),Vector2(0,-18),Vector2(12,13)]),c)
   draw_line(Vector2(-14,7),Vector2(15,7),GOLD,3)
   draw_circle(Vector2(2,-2),3,Color("ffe9aa"))
  4:
   draw_colored_polygon(PackedVector2Array([Vector2(-13,12),Vector2(-9,-6),Vector2(0,-15),Vector2(10,-11),Vector2(14,-1),Vector2(5,3),Vector2(5,12)]),c)
   draw_circle(Vector2(6,-8),2,Color("16242d"))
   draw_line(Vector2(-10,14),Vector2(11,14),INK,2)
  5:
   draw_line(Vector2(-10,15),Vector2(9,-12),c,4)
   draw_colored_polygon(PackedVector2Array([Vector2(14,-19),Vector2(3,-10),Vector2(12,-5)]),INK)
   draw_circle(Vector2(-8,1),6,c)
  6:
   draw_rect(Rect2(-13,-10,26,25),c)
   draw_rect(Rect2(-19,-3,7,18),c.darkened(0.2))
   draw_rect(Rect2(12,-3,7,18),c.darkened(0.2))
   draw_rect(Rect2(-8,-19,16,13),c.lightened(0.1))
   draw_circle(Vector2(-4,-13),2,TEAL)
   draw_circle(Vector2(4,-13),2,TEAL)
   draw_colored_polygon(PackedVector2Array([Vector2(0,-4),Vector2(5,2),Vector2(0,8),Vector2(-5,2)]),TEAL)
  7:
   draw_colored_polygon(PackedVector2Array([Vector2(0,-16),Vector2(-12,12),Vector2(12,12)]),c)
   draw_rect(Rect2(-6,-2,12,5),Color("18212f"))
   draw_line(Vector2(-17,12),Vector2(-10,-6),INK,3)
   draw_line(Vector2(17,12),Vector2(10,-6),INK,3)
 draw_rect(Rect2(-20,27,40,4),Color("09111a"))
 draw_rect(Rect2(-20,27,40*clampf(hp,0,1),4),side)
 for i in range(level-1):
  draw_circle(Vector2(-4+i*8,-28),2.5,GOLD)
 draw_set_transform(Vector2.ZERO)

func _draw() -> void:
 draw_rect(Rect2(0,0,1440,900),Color("09111b"))
 for i in range(14):
  draw_line(Vector2(i*130-300,0),Vector2(i*130+500,900),Color(0.2,0.3,0.4,0.055),1)
 label_at("R U N E C L A S H",Vector2(40,60),34,GOLD)
 label_at("T A C T I C S   /   THE SHATTERED COVENANT",Vector2(42,87),13,MUTED)
 label_at("Buy an army. Shape the battle. Break their commander.",Vector2(42,112),16,INK)
 panel(Rect2(40,133,240,57),Color("122b2a"),Color("2c5650"))
 label_at("YOUR COMMANDER",Vector2(56,155),12,TEAL)
 label_at("%d / 30" % commander[0],Vector2(56,180),23)
 panel(Rect2(296,133,240,57),Color("302129"),Color("61414b"))
 label_at("THE COVENANT",Vector2(312,155),12,Color("f08083"))
 label_at("%d / 30" % commander[1],Vector2(312,180),23)
 label_at("ROUND %02d" % round_number,Vector2(574,158),24,GOLD)
 label_at(phase.to_upper(),Vector2(575,182),13,MUTED)
 label_at("%d" % gold,Vector2(780,160),30,GOLD)
 label_at("GOLD",Vector2(781,182),12,MUTED)
 label_at("YOUR FORMATION",Vector2(40,210),12,TEAL)
 label_at("NO MAN'S LAND",Vector2(339,210),12,MUTED)
 label_at("ENEMY SCOUTING",Vector2(649,210),12,Color("f08083"))
 panel(Rect2(34,212,828,556),Color("101d28"),Color("354657"))
 for x in range(12):
  for y in range(8):
   var color = Color("19312f") if x < 4 else (Color("2d232d") if x >= 8 else Color("17232e"))
   if (x+y)%2 == 0:
    color = color.lightened(0.025)
   draw_rect(Rect2(ORIGIN+Vector2(x,y)*CELL+Vector2.ONE,Vector2.ONE*(CELL-2)),color)
 for x in [4,8]:
  draw_line(ORIGIN+Vector2(x*CELL,0),ORIGIN+Vector2(x*CELL,544),Color("62777e"),2)
 # The central seal is drawn into the board, under the troops.
 var center: Vector2 = ORIGIN+Vector2(408,272)
 draw_arc(center,80,0,TAU,64,Color(0.56,0.66,0.7,0.1),2,true)
 draw_arc(center,65,0,TAU,6,Color(0.56,0.66,0.7,0.1),2,true)
 label_at("WAR COUNCIL",Vector2(912,181),22,GOLD)
 label_at("Recruit on blue tiles   /   hover cards for details",Vector2(912,205),13,MUTED)
 if phase == "deploy":
  for team in range(2):
   var entries: Array = army if team == 0 else enemy
   for i in range(entries.size()):
    var e: Dictionary = entries[i]
    var pos: Vector2 = ORIGIN+(Vector2(e.cell)+Vector2(0.5,0.5))*CELL
    token(pos,e.kind,team,1.0,e.level)
    if team == 0 and i == selected_unit:
     draw_arc(pos,29,0,TAU,32,GOLD,2,true)
  var cell = Vector2i(((get_global_mouse_position()-ORIGIN)/CELL).floor())
  if cell.x >= 0 and cell.x < 4 and cell.y >= 0 and cell.y < 8:
   draw_rect(Rect2(ORIGIN+Vector2(cell)*CELL,Vector2.ONE*CELL),Color(0.5,0.9,0.8,0.12))
 else:
  for u in sim.units:
   if u.hp > 0:
    var pos: Vector2 = ORIGIN+u.pos*CELL
    if u.kind == 4 and not u.charged:
     draw_line(pos-Vector2(25 if u.team == 0 else -25,0),pos,Color(GOLD,0.3),8,true)
    token(pos,u.kind,u.team,u.hp/u.max_hp,u.level,u.flash)
  for s in sim.shots:
   var pos: Vector2 = ORIGIN+s.pos*CELL
   var dir: Vector2 = s.pos.direction_to(sim.units[s.target].pos)
   if s.magic:
    draw_circle(pos,13,Color(1,0.4,0.1,0.17))
    draw_circle(pos,6,Color("ffab64"))
    draw_circle(pos,3,Color("fff0b7"))
   else:
    draw_line(pos-dir*16,pos,GOLD,2,true)
  for e in sim.effects:
   var fraction: float = e.life/e.max
   var pos: Vector2 = ORIGIN+e.pos*CELL
   var color = Color("ffad66") if e.magic else INK
   color.a = fraction*0.7
   draw_arc(pos,(1.0-fraction)*(62 if e.kind == "blast" else 25)+4,0,TAU,24,color,2,true)
 label_at(Enemy.NAMES[mini(round_number-1,6)],Vector2(40,791),15,MUTED)
 label_at("%d troops  /  persistent army" % army.size(),Vector2(631,791),13,TEAL)
 label_at("FIELD NOTES" if tech < 0 else ["BULWARK ACTIVE  /  +18% HEALTH","WAR RUNES ACTIVE  /  +15% DAMAGE","WAR DRUMS ACTIVE  /  FASTER ATTACKS"][tech],Vector2(912,779),12,GOLD)
 label_at("Spears > cavalry     Magic > armor",Vector2(912,806),16,INK)
 label_at("Space your ranks to resist fireball splash.",Vector2(912,832),15,MUTED)
 label_at("Click troop, then tile to move. Right-click to sell.",Vector2(912,858),13,MUTED)
 label_at(message,Vector2(40,886),14,GOLD)
 if phase in ["result","over"]:
  panel(Rect2(76,338,744,310),Color(0.035,0.065,0.095,0.98),GOLD)
  label_at("BATTLE %02d  /  AFTERMATH" % round_number,Vector2(105,376),13,MUTED)
  label_at(result_title,Vector2(105,425),29,TEAL if sim.winner == 0 else GOLD)
  label_at(result_detail,Vector2(105,462),15,INK)
  label_at("Your troops recover. Formation and gold are retained.",Vector2(105,494),16,MUTED)
  if tech_pending:
   label_at("CHOOSE A RUNE  /  permanent army blessing",Vector2(105,526),14,GOLD)
  else:
   label_at("Press %s below to continue." % ("Restart Run" if phase == "over" else "Next Round"),Vector2(105,559),18,GOLD)
   if phase != "over":
    label_at("Next income: %d gold" % (10+round_number*2),Vector2(105,590),16,TEAL)
