# Next task

## Active workstream: multiplayer Gamble Roguelike — design-first gate

Branch: `multiplayer-gamble-engine-discovery-01`.

**Current phase: DESIGN ONLY. Do not implement server, UI, persistence, or more product game code until the design gates pass.**

### Verified baseline
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Separate work branch; no product HTML/source modified.
- Existing prototype contains pure-rule fixtures and an in-memory ledger only. No live server, database, browser client, durable persistence, or real two-client run.
- Previous local working-copy core tests: 10/10 subtests and syntax checks passed. Committed GitHub suite has 8 tests; remote CI not verified.

### Design checkpoints
- Gate 01: product thesis, critique of shallow candidate games, initial loop and gates.
- Gate 02: numeric run walkthrough, ten-item draft, EV/variance checks, quota model simulation. Naive quota-sized betting was rejected because Safe dominated survival.
- Gate 03: fair-EV risk profiles and comparison of shared versus individual wagers. Recommended design is one shared team wager per stage.
- Reports: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md`, `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md`, `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_03.md`.
- Simulations: `reports/design_simulations/gamble_roguelike_gate02.py`, `reports/design_simulations/gamble_roguelike_gate03.py`.

### Next bounded task: Design Gate 04
1. Define secret simultaneous voting that selects Safe/Balanced/Jackpot without making the 2-player and 6-player rooms unfair. Specify tie and AFK defaults.
2. Simulate single shared wagers for 2/3/6 players; compare no item, nerfed reroll, and a small item bundle.
3. Test item combinations and integer-chip rounding/caps; reject dominant or recursive item loops.
4. Build the paper-playtest facilitator script and observation sheet.
5. Demonstrate at least three viable strategies and revise the design if one choice dominates.
6. Do not implement server/UI in this task.

### Stop conditions before implementation
- Complete numeric run includes success and failure/recovery branches.
- Four mechanisms have genuinely different decisions.
- Shared-bank griefing and zero-balance participation have clear rules.
- Three viable strategies are demonstrated without a universal best game/item.
- Payout math, rounding, item effects, and quota/failure curves are checked.
- Paper-playtest protocol is ready; human enjoyment remains explicitly unproven until tested.

### Existing AMQ maintenance workstream (separate)
V82.86.06 maintenance remains separate: add a dedicated stable CI command for backup/restore contracts and continue the IndexedDB failure matrix. Do not modify product source during Gamble Roguelike design.

## Current status and rollback
- Design Gate 03 complete; Gate A–C are not yet passed.
- Product HTML/source unchanged.
- No product tests were run for the design-only changes. Simulations ran locally with Python 3 standard library, seed 20261020, 100,000 runs/configuration.
- No human playtest or verified remote CI pass for the gamble core.
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`; no product rollback is required.
