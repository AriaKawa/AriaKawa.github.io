# Threat, commander XP, and tower research

The globe, tactical map, and deployment calculations sample one continuous geographic threat field. State outlines are labels, not difficulty boundaries. Missouri starts near threat 9 and Illinois near 2; surrounding fronts blend over a short geographic distance. The same field responds to regional pressure changes. A deployment locks its difficulty until the commander packs up again, so a level-up never changes a wave already in progress.

Commander rank starts at 1 and caps at 50. Rank thresholds are `150 × (rank − 1)²` lifetime XP. Every cleared wave awards both lifetime XP and spendable research XP; research does not reduce commander rank. Rank adds 0.08 difficulty per rank above 1, capped at +2. Geographic threat remains the dominant factor. The briefing's descriptive difficulty also accounts for rank, while the mission rating describes enemy scaling.

For difficulty D and cleared wave W:

- Wave XP: round(35 + 18D + 8W).
- Wave scrap: round(35 + 12D + 6W), plus existing scavenger bonuses and enemy kill scrap.
- Enemy health: existing wave health × (1 + 0.16(D − 1)).
- Additional ordinary enemies: floor(roster size × 0.07(D − 1)); bosses are not duplicated.
- Free turret chance per cleared wave: 4% + 3.5%D, capped at 50%.
- Recovered turret branch tier: 1 below difficulty 5, 2 from 5, 3 from 8.

Deployment opens a route and rewards briefing before unfolding the core. Previewing does not change lot occupancy, create a contract, consume cargo, or pay rewards. Confirmation checks the position and difficulty again; moving invalidates the briefing. The generated approach geometry matches the actual deployment. First-wave loot is a projection, and turret recovery is explicitly a chance.

The five combat towers have three research branches, each with three tiers:

| Branch | Effect per tier |
| --- | --- |
| Stopping power | +45% damage |
| Long watch | +23% range and +10% damage |
| Rapid response | +30% fire rate |

Research costs 100, 400, and 900 XP per successive tier, per tower type and branch. Installation costs 55 × tier scrap. Each individual turret can install one main branch through tier 3 and one secondary branch through tier 1. The third branch locks. Research unlocks are permanent across deployments. Squad Beacon remains the separate utility structure with its existing helper-slot upgrades.

Recovered turrets retain a random branch at the earned tier, can bypass research for that recovered item, and are consumed automatically when building their type. They cost no scrap. Research is still required for further paid upgrades.

The hosted/offline prototype saves lifetime XP, research balance, unlocked branches, and unused recovered turrets in browser localStorage under `deadroad-progression-v1`. Resetting a deployment preserves progression. This is one browser profile, not an authenticated account or cloud save. The authoritative Colyseus room uses the same reward and research rules; its progression lasts for the room lifetime, consistent with its existing persistence model.

Validation: `npm run validate:progression` exercises smooth geographic transitions, rank scaling, exact preview geometry, stale confirmation rejection, research gating and crosspath limits, free turret consumption, wave rewards, and authoritative room parity. Browser review additionally checks confirmation, desktop/mobile layout, and saved profile restoration.
