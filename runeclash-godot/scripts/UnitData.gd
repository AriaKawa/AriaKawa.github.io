extends RefCounted

# All distances are board cells; intervals are seconds.
const ROSTER = [
 {"name":"Squire", "cost":2, "role":"FRONTLINE", "hp":95.0, "damage":11.0, "range":0.72, "interval":0.85, "speed":1.3, "armor":1.0, "color":"bbc4d2", "tip":"An inexpensive sword. Hold the line."},
 {"name":"Shieldbearer", "cost":4, "role":"ARMORED TANK", "hp":230.0, "damage":10.0, "range":0.75, "interval":1.1, "speed":0.8, "armor":5.0, "color":"68b4c5", "tip":"Shrugs off physical hits. Slow advance."},
 {"name":"Archer", "cost":3, "role":"RANGED PHYSICAL", "hp":60.0, "damage":15.0, "range":4.1, "interval":1.0, "speed":1.0, "armor":0.0, "color":"a5cf80", "tip":"Steady arrows. Keep behind a tank."},
 {"name":"Fire Mage", "cost":5, "role":"SPLASH MAGIC", "hp":65.0, "damage":26.0, "range":3.7, "interval":1.7, "speed":0.95, "armor":0.0, "color":"f4a16d", "tip":"Fireballs blast clusters; ignore armor."},
 {"name":"Cavalry", "cost":5, "role":"FAST CHARGER", "hp":145.0, "damage":23.0, "range":0.9, "interval":1.1, "speed":2.5, "armor":2.0, "color":"dfc183", "tip":"First hit doubles. Hunt exposed ranged."},
 {"name":"Spearman", "cost":3, "role":"ANTI-LARGE", "hp":115.0, "damage":15.0, "range":1.15, "interval":1.0, "speed":1.2, "armor":1.0, "color":"92b7de", "tip":"Double damage to cavalry and golems."},
 {"name":"Golem", "cost":7, "role":"HEAVY CONSTRUCT", "hp":390.0, "damage":36.0, "range":0.95, "interval":1.65, "speed":0.6, "armor":7.0, "color":"a596ce", "tip":"Crushes swords. Takes extra magic damage."},
 {"name":"Assassin", "cost":6, "role":"BACKLINE HUNTER", "hp":95.0, "damage":25.0, "range":0.7, "interval":0.7, "speed":2.1, "armor":0.0, "color":"e098c8", "tip":"Seeks archers and mages. Fragile in a crowd."}
]
