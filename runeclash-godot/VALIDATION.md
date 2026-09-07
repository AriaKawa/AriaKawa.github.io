# Validation — 2026-09-07

- Godot 4.7 headless editor import: passed, no script parse errors.
- Godot runtime startup: passed.
- `tests/validate.gd`: passed with zero failures. Covers purchase / placement, deployment boundaries, insufficient gold, selection and movement, refunds, veteran upgrades, combat termination, attacks / projectiles / deaths, commander damage, persistent army and income, rune choice, defeat, victory, restart, counter damage, and unique enemy deployment through round 100.
- `tests/campaign.gd`: exercised a full legal-income campaign with mixed recruitment through round 10. First three rounds won; rounds 4–8 lost; round 9 won; defeat in round 10. Counterplay and reinforcements matter; a balanced opening is forgiving. This is a sample strategy, not an exhaustive balance study.
- Browser playtest: recruited a Shieldbearer and two Archers, started combat, observed movement and a completed victory with enemy commander HP dropping from 30 to 25. Continued through rounds two and three, bought a Fire Mage / Golem / Spearmen / Assassin, trained a troop, selected War Runes and used 2x speed. Rune selection and income progression worked. No browser warnings/errors reported. Later enemy strength was adjusted and rerun through headless campaign validation.
- Browser layout: fixed canvas height to account for the navigation bar; all bottom controls now fit at 1280×720.
- Release export: Godot Web, Compatibility renderer, single-threaded WASM. No cross-origin isolation headers or server-side backend required.

The static site's production artifact is `runeclash/index.html` plus its sibling engine and pack files. Existing games are untouched; only the Games menu gains a new link.
