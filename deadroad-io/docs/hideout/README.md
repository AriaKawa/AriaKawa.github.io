# Deadroad: character expeditions and Hideout

The title screen uses the original Last Light artwork and Deadroad branding without a sequel number. The browser campaign has exactly three survivor slots, full expedition save/continue, permanent convoy death, and a shared Hideout with convoy, turret and field workshops and a memorial.

Extraction between hordes banks all unbanked earned XP and scrap above the 250 issued field supplies. Death banks half the unbanked XP and 25% of surplus scrap, increased by 5 percentage points per recovery level. Starter resources cannot be banked and settlements are idempotent. Recruits start at zero XP; banked resources and Hideout upgrades survive. Existing legacy progression is migrated to slot one and its unused research XP to the shared bank.

Each workshop upgrade costs both scrap and legacy XP, has five levels, and affects real simulation stats: 150 extra hull per chassis level, 10% new turret damage per fabrication level, repair-kit resupply per field level, and increased recovery. All convoys must be extracted before workshop purchases. Recovered turrets can be sold to the local salvage counter for 40 banked scrap. The Player Market section explicitly reports that online trading is offline; this static browser-authoritative game has no shared inventory or trading service.

Saves preserve player inventory/research, convoy position/health, turrets, routes, queued and spawned enemies, sector operations, equipment and battlefield seed. Epoch timers shift on restore so time away does not skip waves or kill a saved character. Simulation pauses in the field menu, on the globe and while the theater loads. Reset cannot bypass character progression. Storage is local to this browser and origin, not an account/cloud save.

Validation: production build and TypeScript; validate-campaign (slot isolation, migration-independent new recruitment, memorial, death idempotency, reward farming protection, armor/turret/field effects, active-horde save/restore, extraction gating and repeated settlement); validate-progression (including authoritative legacy server parity); validate-convoy. Browser verification covered title/keyart, Hideout overview, three slots, recruitment, globe entry, saving to title, full reload/continue, and safe extraction. Browser console had no runtime errors. Existing Vite vendor-script and large-bundle warnings remain.

The source directory mirrors changed files from the deadroad-io source checkout, including the regression script.
