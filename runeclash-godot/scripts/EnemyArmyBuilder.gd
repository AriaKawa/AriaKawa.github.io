extends RefCounted

const WAVES = [
 [0,0,2], [1,0,2,2,1,0], [4,4,0,2,5,1,2,5], [1,1,3,2,0,0,3,7,5,2,1],
 [6,5,3,2,2,7,6,1,4,3,5], [6,1,4,4,3,2,5,7,6,1,3,2,7,5],
 [6,6,1,5,3,3,2,4,7,7,6,6,3,4,5,7]
]
const NAMES = ["The border watch", "Iron and arrows", "Hooves at dusk", "The ember choir", "Stone awakens", "The shadow host", "The last covenant"]

static func build(round_number: int) -> Array:
 var comp: Array = WAVES[mini(round_number - 1, 6)].duplicate()
 for extra in range(maxi(0, round_number - 7) * 2):
  if comp.size() < 32:
   comp.append([6,3,7,5][extra % 4])
 var army: Array = []
 var occupied: Dictionary = {}
 var front = 0
 var back = 0
 for kind in comp:
  var ranged: bool = kind in [2,3]
  var index: int = back if ranged else front
  var x: int = (11 - index / 8) if ranged else (8 + index / 8)
  var y: int = [3,4,2,5,1,6,0,7][index % 8]
  var cell = Vector2i(x,y)
  if x > 11 or occupied.has(cell):
   for column in range(8,12):
    var found = false
    for row in range(8):
     if not occupied.has(Vector2i(column,row)):
      cell = Vector2i(column,row)
      found = true
      break
    if found:
     break
  occupied[cell] = true
  army.append({"kind":kind, "cell":cell, "level":1 + mini(2,(round_number+1)/3)})
  if ranged:
   back += 1
  else:
   front += 1
 return army
