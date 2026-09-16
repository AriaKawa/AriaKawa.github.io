# Jump Royale social update — September 16, 2026

- Music output is halved for both synthesized music and Reverie's soundtrack. Effects retain their existing level.
- Reverie world height is 10,920 pixels, down from 15,600. Its 95 main transitions and 46 alternate jumps are collision-tested. Chapter labels are removed.
- Bottom-right minimap tracks a 1,800-pixel vertical window around the player and shows actual current player positions.
- Leaderboards show up to 100 real player records per map, with fastest completion and wins tabs plus the current player's rank. Records begin with this release; old browser-only personal scores are not fabricated into global entries. Only crown finishes count as completion times. Assisted rounds are excluded.
- Firebase anonymous identities support eight-player code parties. The host runs the shared physics simulation; guests send inputs and receive snapshots. Bots fill the remaining match slots. The host must keep the game open. This is casual host-run multiplayer, not a dedicated authoritative competitive server. The existing site's Firebase anonymous-auth rules are used without modification.
- Party membership/readiness, lobby movement, and match snapshots use separate database paths. Joining players appear in the lobby with their selected outfit and wallpaper. Character artwork supplies selectable profile icons. Guests ready up; the host cannot start until all guests are ready.
- Three daily missions reset at midnight UTC and award 2/4/3 gold for climbing 100m, two top-ten finishes, and three completed rounds. Claims have persistent day-specific receipts; assisted matches do not progress missions.
- Both extra wallpapers can drop from loot and persist when equipped. Rarity odds remain 60/25/10/4/1 percent. Within a rarity, only unowned items can drop until it is exhausted; then duplicates return. Catalog entries are unique and individual odds reflect ownership.

Validation: TypeScript checks; standard physics/bot/finale/costume suites; complete shortened Reverie traversal; five-rarity economic and mission receipt tests; two independent browser sessions verifying code join, readiness blocking, shared match and actual guest movement; live Firebase temporary-record aggregation/deduplication and cleanup; wallpaper equip/reload; mission claim; desktop and portrait/landscape layout screenshots.

Scripts: `scripts/test-social.ts`, `scripts/browser-social.mjs`, `scripts/browser-social-polish.mjs`. Browser tests expect hosted Vite at port 5235 and use the workstation's Playwright/Edge installation.
