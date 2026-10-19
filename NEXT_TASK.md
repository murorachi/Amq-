# Next task

## Active workstream: multiplayer Gamble Roguelike — design-first gate

Branch: `multiplayer-gamble-engine-discovery-01`.

**Current phase: DESIGN ONLY. Do not implement server, UI, persistence, or more production game code until the design gates pass.**

### Baseline and evidence
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Existing prototype has pure-rule fixtures and an in-memory ledger only; no server, database, browser UI, durable persistence, or real two-client run.
- Previously recorded local core tests: 10/10 subtests and syntax checks passed. Committed GitHub suite has 8 tests; remote CI not verified.
- Gate 01–05 reports and simulations are linked from `CURRENT_STATUS.md`.

### Gate 05 results
- Exact Signal Room clue generator now yields 1/3, 1/2, and 3/4 success for zero, one, and two clues. Gross returns 3×, 2×, and 4/3× have fair expected gross return before fees/rounding.
- Median voting can suppress Push in six-player rooms (for a hypothetical 40/35/25 Bank/Balanced/Push preference mix, Push was selected 3.76% of the time). Plurality with explicit tie compromise raises this to 13.60%; these are modeled preferences, not player research.
- One shared team wager per stage remains the preferred economy.
- Gate 04's provisional two-clue 2/3 value is superseded by `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_04_ERRATA_01.md`.

### Next bounded task: Design Gate 06
1. Simulate plurality voting and the single-wager model for 2/3/6 players.
2. Add Signal Room clue fees, integer-rational payouts, minimum stake, and rounding.
3. Simulate no-item, nerfed-reroll, and small item-bundle configurations.
4. Check item combos, recursive triggers, maximum payouts, and recovery loops.
5. Complete a five-stage walkthrough with success/failure/recovery and at least three proposed strategies.
6. Finalize the paper-playtest cards and revise any dominant strategy.

### Stop conditions before implementation
- Complete numeric run includes success and failure/recovery branches.
- Four mechanisms make genuinely different decisions.
- Shared-bank griefing, AFK/disconnect, and recovery rules are explicit.
- Three viable strategies are demonstrated without a universal best game/item.
- Odds, rounding, fees, item effects, and quota curves are checked.
- Paper-playtest can run without facilitator improvisation. Human enjoyment remains unproven until actual playtest.

### Separate AMQ maintenance workstream
V82.86.06 maintenance remains separate: add a dedicated stable CI command for backup/restore contracts and continue the IndexedDB failure matrix. Do not modify product source during Gamble Roguelike design.

## Current status and rollback
- Gate 05 exact enumeration completed; Gates A–C still not passed.
- Product HTML/source unchanged.
- No product tests were run for design-only changes. Simulations and exact enumeration ran locally; no human playtest or verified remote core CI.
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`; no product rollback is required.


## Gate 07 update — recovery loophole closed in the design draft
- Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_07.md`.
- Simulation: `reports/design_simulations/gamble_roguelike_gate07.py`.
- A repeatable recovery payment was found to eliminate strain-based failure in the simplified model. Recovery is now proposed **once per run only**, at 2 strain, for `ceil(15% of bank)`, clearing one strain and forfeiting that stage's item reward.
- Exact committed integer-RNG simulation: never recover → 46.832% clear / 34.773% strain failure / mean final bank 998.89; always recover when eligible → 45.403% clear / 27.469% strain failure / mean final bank 947.30. This reduces failure but costs bank and slightly reduces clear rate. No item rewards or event diversity are modeled.
- Next: Gate 08 must integrate all four game mechanisms and item opportunity cost into a full five-stage model. No implementation.


## Gate 07 update — recovery loophole
- Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_07.md`.
- Simulation: `reports/design_simulations/gamble_roguelike_gate07.py`.
- Repeated recovery at 2 strain could eliminate strain-based failure. Candidate correction: recovery once per run only, at 2 strain, costs ceil(15% of bank), clears one strain, and forfeits the stage item reward.
- Exact committed integer-RNG simulation: never recover → 46.832% clear / 34.773% strain failure / mean final bank 998.89; always recover when eligible → 45.403% clear / 27.469% failure / mean final bank 947.30. Item rewards and other game mechanics are not modeled.
- Next: Gate 08 integrates all four game mechanisms and item opportunity cost into a full five-stage model. No implementation.


## Gate 09 update — core strategy niches
- Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_09.md`.
- Revised rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Simulation: `reports/design_simulations/gamble_roguelike_gate09.py`.
- Fixed absolute bank targets made quota-aware play dominate. Candidate revision: each stage target is current bank + ceil(1%); Bank/ Safe uses 5% stake at 75% / 4/3x, Balanced uses 10% at 40% / 2.5x, Push uses 15% at 15% / 20/3x. Final clear target is 105% of starting bank.
- Base simulation at 105% goal: Conservative ~27.1% clear and ~3.4% strain failure; Balanced ~41.5% clear and ~29.4% failure; Push ~17.2% clear and ~66.5% failure. At 150% final-bank tier, Push is strongest of these three. Items/recovery are excluded from this baseline.
- Next: add item/recovery effects one by one and test combinations, route choices, party-size vote fairness, and integer payout boundaries. Remain in design.
