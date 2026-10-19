# Multiplayer Gamble Roguelike — Design-First Plan 01

- Status: **Design Gate 05 complete; product implementation remains blocked.**
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Design reports: Gates 01–05 under `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_*.md`; Gate 04 correction is recorded in `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_04_ERRATA_01.md`.
- Simulations: `reports/design_simulations/gamble_roguelike_gate02.py`, `gamble_roguelike_gate03.py`, `gamble_roguelike_gate05.py`.

## 1. Hard rule

**Do not implement the server, UI, database, or further production game code until the design gates pass.** Existing `gamble-roguelike/` source is an isolated engineering fixture, not a validated product.

Iterate through concrete rules, critique, mathematical verification, simulation, and revision. Stop only when evidence supports the gates. Documents and simulations can reject bad designs; they cannot prove enjoyment.

## 2. Product hypothesis

Short-session co-op gambling roguelite for 2–6 players, one shared virtual bankroll, escalating stage quotas, simultaneous private decisions, route choices, and run-only items. Target run length is 12–20 minutes, not yet validated. AMQ songs are optional atmosphere/event content. No real-money wagering, cash-out, transfers, or persistent wallet in the first target.

## 3. Design conclusions so far

- Coin Call is a tutorial/settlement fixture, not a signature game; Exact Seven is too shallow for a core slot.
- Preferred distinct mechanisms: Risk Contract, Vault, Signal Room, and Blind Draft.
- Use one shared team wager per stage. Separate player wagers against the same bank make exposure and variance depend on party size.
- Candidate Risk Contract profiles are fair-EV before fees/rounding: Safe 75% / 4/3×, Balanced 40% / 2.5×, Jackpot 15% / 20/3×.
- The quota-sized model was rejected because Safe dominated survival. Fixed-stake models show a measurable but not yet proven-good difficulty curve.
- Reroll is powerful: in one simplified model, quota-aware clear rate moved from 46.563% to 65.989% with one once-per-run reroll paying 90% of normal gross. It needs further tuning.
- Signal Room's exact clue model is three equally likely outcomes; each clue reveals a pair containing the truth. Accuracy is 1/3 with no clue, 1/2 with one clue, and 3/4 with two clues. Gate 05 corrects the provisional 2/3 figure in Gate 04.
- Gate 05 enumerated vote outcomes for 2/3/6 players. Median voting suppresses Push too much in six-player rooms; plurality with explicit tie handling is the current proposal.
- Blind Draft replaces a shared-chip pot that would only move chips inside the same team account.

## 4. Design gates

### Gate A — Coherent product
- [ ] Full numeric run includes success and failure/recovery.
- [x] Four game slots have distinct decision structures.
- [ ] Recovery, AFK/disconnect, and anti-griefing rules are integrated.
- [ ] Every stage presents a meaningful decision.

### Gate B — Mathematical integrity
- [x] Risk Contract EV and Vault stopping-point math checked.
- [x] Signal Room clue probabilities exactly enumerated.
- [x] Seeded 100,000-run quota simulations performed.
- [ ] Final integer rounding, minimum stakes, explicit fees, and payout caps tested.
- [ ] Item combinations and recovery loops simulated.

### Gate C — Strategy/replayability
- [ ] Three viable strategies demonstrated across states/seeds.
- [ ] No game/item is always best.
- [ ] Item synergies work without dominant or recursive combinations.
- [ ] Vote rule does not create party-size unfairness or minority frustration.

### Gate D — Playtest readiness
- [x] Draft paper-playtest kit exists at `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_01.md`.
- [ ] Rules and cards are stable enough to run without facilitator improvisation.
- [ ] Test plan: at least 3 groups, ideally 2–4 players each.
- [ ] Target: at least 70% would play another run; median duration 12–20 minutes; no one inactive over 20%.

Coding is authorized only after Gates A–C pass and the playtest protocol is ready. A low-fidelity prototype and external playtest are still required before claiming comparable enjoyment.

## 5. Next design cycle: Gate 06

1. Simulate the revised plurality vote and one-team-wager model for 2/3/6 players.
2. Add Signal Room clue fees and integer-rational payout rounding.
3. Simulate no-item, nerfed-reroll, and small item-bundle configurations.
4. Test high-risk item combinations and max-payout/cap boundaries.
5. Write a complete five-stage walkthrough with recovery and three candidate strategies.
6. Prepare fixed paper-test cards; revise if one profile or item dominates.

## 6. Architecture and evidence boundaries

A lightweight authoritative service remains likely, but Node.js/TypeScript/SQLite are not locked. No server, database, API, browser UI, or deployment should start before design gates authorize a playable prototype.

Previously recorded local core tests passed 10/10 in the fuller working copy; the committed GitHub suite has 8 tests and remote CI is unverified. Gate 02/03 simulations ran locally with Python standard library and seed 20261020. Gate 05 exact enumeration ran locally and its committed script was read back. No human playtest or live two-client run has occurred.

## 7. Rollback

Revert design-only reports/simulation commits on `multiplayer-gamble-engine-discovery-01`. No product rollback is required.


## Gate 06–07 design revisions
- Gate 06 report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_06.md`; simulation: `reports/design_simulations/gamble_roguelike_gate06.py`.
- Gate 06 rejected generic all-game retry: a 50% stake-profit penalty raised quota-aware clear rate from 46.999% to 58.699%; a 70% penalty reduced the uplift to about 0.7 points. Remove generic retry from the core pool.
- Integer floor payout creates small implicit expected-value losses for Safe and Jackpot. Use exact integer rational payouts and disclose rounding effects.
- Gate 07 report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_07.md`; simulation: `reports/design_simulations/gamble_roguelike_gate07.py`.
- Repeatable recovery can make strain failure impossible in the simplified model. Candidate correction: once per run at 2 strain, cost ceil(15% of bank), clear one strain, and forfeit the stage item reward.
- Exact results: never recover 46.832% clear / 34.773% failure / mean bank 998.89; always recover when eligible 45.403% clear / 27.469% failure / mean bank 947.30. Item reward opportunity cost and other game mechanisms are not modeled.
- Still blocked: integrated five-stage simulation, item opportunity costs/synergies, three viable strategies, group-size fairness, and human playtest. Remain in design; no server/UI/database work.


## Gate 08–09 integrated design revisions
- Gate 08 report/script: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_08.md`, `reports/design_simulations/gamble_roguelike_gate08.py`. Fixed absolute targets made quota-aware play dominate, so that target model was rejected.
- Gate 09 report/script: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_09.md`, `reports/design_simulations/gamble_roguelike_gate09.py`.
- Current rulebook candidate: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`. Each stage target is current bank + ceil(1%); risk tier sets stake size (Bank 5%, Balanced 10%, Push 15%); final run goal is 105% of starting bank.
- Base simulation suggests distinct niches: conservative best for low strain failure, Balanced best for 105% clear, Push best among tested policies at the 150% high-score tier. At the 105% goal, clear rates were stable across starting banks 750/1000/1500 (about 27% / 41% / 17%).
- Gate 09 excludes items/recovery. Next: reintroduce item effects and recovery one at a time, check interactions and opportunity costs, vary event order, and test 2/3/6-player voting/draft fairness. Design simulation workflow is pending remote result verification. No implementation until these gates pass.


## CI evidence
- Design simulation workflow [run 39318826618](https://github.com/murorachi/Amq-/actions/runs/39318826618) passed on commit `5942fc949d3d3962c1a63aebba9bf7f869017265`.
- Python syntax checks and Gate 05–09 simulation scripts completed successfully. This verifies repeatable execution, not game balance, strategy diversity beyond tested policies, or fun.


## Gate 10–13 and paper-test decision
- Gate 10–13 reports and scripts are recorded under `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_10.md` through `_13.md` and `reports/design_simulations/`.
- Current rulebook is `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`. Insurance is Bank/Balanced-only at 10%; Vault Harness 20%; recovery 12% (8% with voucher), once per run at strain 2 and discards one held item if available. Signal Room two-clue fee is one `ceil(6% × stake)` calculation.
- Gate 12's integrated model keeps different strategy niches under the tested fixed event order. Gate 13 tested all 30 event permutations, exact plurality distributions for 2/3/6 players, and clue fee boundaries. Human fairness/fun remain untested.
- CI [run 39320747705](https://github.com/murorachi/Amq-/actions/runs/39320747705) passed the design simulation suite through Gate 13.
- Next: produce Paper Playtest Kit 02 aligned with Candidate 02, then run actual human paper sessions. Implementation remains blocked until those results support meaningful decisions and replay intent.


## Design checkpoint: paper-test readiness, not implementation approval
- Current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Human test kit: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`; not yet executed.
- Gate 13 checked event-order sensitivity, exact plurality distributions for 2/3/6 players, and Signal Room fee boundaries.
- Latest CI [run 39321094158](https://github.com/murorachi/Amq-/actions/runs/39321094158) passed syntax checks and Gate 05–13 simulations.
- Candidate core rules: five shuffled event cards (2 Risk, 2 Vault, 1 Signal); stage target post-recovery bank + ceil(1%); final goal 105%; risk tier stakes 5/10/15%; combined two-clue fee ceil(6% stake); Insurance Bank/Balanced-only 10%; Vault Harness 20%; once-per-run recovery 12% (8% with voucher) skips next eligible Blind Draft.
- No server/UI/database implementation until human paper sessions show understandable consequential decisions, acceptable fairness, and voluntary replay. The “close to existing games in fun” threshold is not yet proven.


## Gate 14 — paper-test ready, implementation still blocked
- Current rules: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`; paper kit: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`.
- Shared draft: two picks per cleared draft phase, shared inventory cap two, top two ranks pick from three distinct cards; team votes on item activation. This prevents item count scaling with party size.
- Favor tie rerolls use raw d6 and keep spent Favor spent. AFK/disconnected players do not draft.
- Gate 14 simulation report/script: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_14.md`, `reports/design_simulations/gamble_roguelike_gate14.py`.
- CI [run 39322221351](https://github.com/murorachi/Amq-/actions/runs/39322221351) passed Gate 14. The design is ready for paper sessions, but no human session has occurred. Do not start server/UI/database implementation until the paper-test gates are met.


## Current snapshot
Rulebook `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_03.md`; paper kit `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`. Human testing not executed; implementation remains blocked.
