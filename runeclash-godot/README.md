# Runeclash Tactics

An original fantasy army autobattler made in **Godot 4.7**, using the Compatibility renderer and a single-threaded Web export.

**Play:** https://ariakawa.github.io/runeclash/

## How to play

1. Choose a unit in the War Council, then click an empty tile in the four leftmost columns. Gold is spent when placed; you can place multiple copies while you can afford them.
2. Click one of your troops, then an empty blue tile to reposition. Sell with the button or right-click a troop for a full refund. Train a selected troop for 2 gold: +30% base HP and damage per level, up to level III.
3. Scout the red army. Tanks protect archers; spears deal double damage to cavalry and golems; fireballs ignore armor and blast clustered targets; cavalry and assassins prioritize ranged troops.
4. Start Battle. Units move, attack, and target automatically. Use 1x / 2x speed. Deployment is locked during combat.
5. The losing commander takes 2 damage plus surviving enemy troops (golems count twice). Both commanders start at 30 HP. All purchased troops return at full health after battle.
6. Next Round grants 12 gold after round one, then 14, 16, etc. Unspent gold carries over. After round two, choose one permanent army blessing.
7. Reduce the enemy commander to zero to win. Restart Run clears the entire run.

Try a Shieldbearer on the front edge and two Archers behind it for a 10-gold opening. Desktop or landscape fullscreen is recommended. No saves, accounts, networking, or third-party game assets.

## Project layout

- `scenes/Main.tscn`: entry scene.
- `scripts/Main.gd`: game phases, recruitment, progression, native Godot buttons, original procedural token art and battlefield effects.
- `scripts/UnitData.gd`: eight unit definitions and counter descriptions.
- `scripts/BattleSimulator.gd`: deterministic bounded-step combat, targeting, separation, projectiles, armor and splash damage.
- `scripts/EnemyArmyBuilder.gd`: seven authored compositions plus capped reinforcements for longer runs.
- `tests/validate.gd`: gameplay integration and counter tests.
- `web_shell.html`: loading, navigation, fullscreen and responsive canvas wrapper.
- `../runeclash/`: committed production HTML / JS / WASM / PCK files served directly by GitHub Pages.

## Run and rebuild

Install Godot 4.7 Standard and its matching official export templates using Editor > Manage Export Templates. Open `project.godot`, then press F6 on Main or F5 to run.

```powershell
godot --headless --path runeclash-godot --editor --quit
godot --headless --path runeclash-godot --script tests/validate.gd
godot --headless --path runeclash-godot --export-release Web
python -m http.server 8765
```

Open http://localhost:8765/runeclash/. Do not open the HTML through `file://`.

Alternatively `./runeclash-godot/export.ps1 -Godot <path-to-Godot.exe> -WebTemplate <path-to-web_nothreads_release.zip>` uses an extracted official template without installing it globally. The script restores the portable preset afterward.

There is no separate Node production build for this static site. The production build is the Godot release export. Commit the project, export, and Games menu entry, then push to the site's main branch; GitHub Pages publishes the route. No special cross-origin isolation headers are needed because threading is disabled. See [Godot's Web export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html).

## Prototype boundaries

One board, eight types, one blessing per run. Tokens are intentionally simple original vector-like drawings. No audio assets. Combat times out at 65 simulated seconds; remaining normalized health decides the winner, with an exact tie doing no commander damage. No multiplayer, persistent progression, or drag controls. Balance targets a short run; this is not competitively tuned.

See [ASSET_CREDITS.md](ASSET_CREDITS.md) and [VALIDATION.md](VALIDATION.md).
