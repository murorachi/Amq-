# Next task

## Active workstream: multiplayer Gamble Roguelike — design-first gate

Branch: `multiplayer-gamble-engine-discovery-01`.

**Current phase: DESIGN ONLY. Do not implement server, UI, persistence, or more game code until design gates pass.**

### Verified baseline
- Product baseline remains V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Workstream branch is separate from AMQ product source.
- Existing prototype contains four pure-rule candidates and an in-memory ledger. It is not a playable multiplayer game.
- Previously recorded local working-copy tests passed 10/10 subtests and syntax checks. The committed GitHub suite has 8 tests; remote CI is not verified.
- No server, database, browser client, durable persistence, or live two-client run exists.

### Design checkpoints
- Gate 01: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md` — product thesis, critique of shallow candidates, revised loop and gates.
- Gate 02: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md` — numeric run walkthrough, payout/variance calculations, 10-item draft, reproducible simulation.
- Simulation: `reports/design_simulations/gamble_roguelike_gate02.py`.
- The first quota-sized model was rejected because Safe dominated survival (89.398% clear versus 31.780% Balanced and 2.684% Jackpot).
- A fixed-stake model gave 38.830% clears for quota-aware play before items; a free reroll upper-bound raised this to 61.070%. The reroll is not accepted as balanced because no payout penalty was modeled.
- The simulation is a single shared actor model. It does not prove multiplayer behavior or fun.
- Revised mechanisms: Vault, Risk Contract, Blind Draft, Team Gamble.

### Next bounded task: Design Gate 03
1. Revise quota/strain and recovery rules using the Gate 02 stress test.
2. Compare at least three item configurations, including a nerfed reroll, and simulate dangerous item combinations.
3. Extend to 2, 3, and 6 players with individual secret actions and shared-bank reservation rules.
4. Check for dominant games/items, unbounded payouts, rounding exploits, and dead-end quota states.
5. Produce the paper-playtest facilitator script and observation sheet.
6. Repeat the design cycle until Gates A–C pass and Gate D's playtest plan is ready. Do not code the server/UI in this task.

### Stop conditions before implementation
- A complete numeric run includes success and failure/recovery branches.
- Four game mechanisms make different decisions.
- Shared-bank griefing and zero-balance participation are addressed.
- At least three viable strategies are demonstrated without one universal best option.
- Payout math, rounding, item effects, and quota/failure curves are checked.
- The playtest protocol is ready; unknowns that require real human play are explicitly marked unproven.

### Existing AMQ maintenance workstream (separate)
V82.86.06 maintenance remains separate: add a dedicated stable CI command for backup/restore contracts and continue the IndexedDB failure matrix. Do not modify product source during Gamble Roguelike design.

## Current status and rollback
- Phase: design iteration only.
- Product HTML/source: unchanged.
- Core code: existing Stage 1 rules and in-memory ledger only.
- Gate 02 simulation ran locally: 100,000 runs/configuration, seed 20261020. No product tests were run because product code was not changed.
- Remote CI for the core suite and human playtesting remain unverified/not run.
- Roll back by reverting design-only commits on `multiplayer-gamble-engine-discovery-01`. No product rollback is required.
