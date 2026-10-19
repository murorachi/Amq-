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

- CI verification: [design simulation workflow run 39318826618](https://github.com/murorachi/Amq-/actions/runs/39318826618) passed on commit `5942fc949d3d3962c1a63aebba9bf7f869017265`; Python syntax checks and Gate 05–09 simulations all completed. This is not a balance/fun pass.


## Gate 10–13 checkpoint
- Current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Gate 10–13 reports: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_10.md` through `_13.md`; simulations: `reports/design_simulations/gamble_roguelike_gate10.py` through `_13.py`.
- Insurance is now proposed only for Bank/Balanced with 10% stake refund; Vault Harness 20% refund on continued-step loss; recovery 12% fee (8% with voucher), once per run at strain 2, discarding one held item if available.
- Signal Room two-clue fee uses one combined `ceil(6% × stake)` to avoid double-rounding. Small stakes still have a high effective fee due to whole-chip rounding.
- Gate 13 checked 30 event orders, exact 2/3/6-player plurality distributions, and fee boundaries. Strategy ranking did not reverse by event order; Push clear rates varied more than Conservative/Balanced.
- CI: [run 39320747705](https://github.com/murorachi/Amq-/actions/runs/39320747705) passed Gate 05–13 syntax/simulation suite. This does not validate fun or human fairness.
- Next: prepare Paper Playtest Kit 02 from Candidate 02, then stop for actual human paper sessions. Do not implement until paper test indicates meaningful decisions and replay intent; no human playtest has occurred yet.


## Next action: human paper test, not implementation
- Rules: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Facilitator kit: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`.
- Gate 13 report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_13.md`.
- CI run [39321094158](https://github.com/murorachi/Amq-/actions/runs/39321094158) passed syntax checks and Gate 05–13 simulations.
- Design work has reached paper-test readiness. No human session has happened, so the requirement “near existing products in fun” is **not proven**. Do not build server/UI yet.
- Next meaningful evidence is three paper sessions (2–4 players each; add a 6-player group if possible), measuring rule clarity, consequential decisions, 12–20 minute duration, perceived fairness, and voluntary replay. Revise rules from observed failure points before any implementation.


## Gate 14 checkpoint — next is human paper testing
- Current rules: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Facilitator kit: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`.
- Draft now uses a shared inventory capped at two items. Two highest-ranked players pick one item each after cleared stages 2/4; the number of available items no longer scales automatically with party size. Team vote activates at most one item per wager.
- Favor tie rerolls use raw d6 and do not refund Favor. AFK/disconnected players do not roll or spend Favor.
- Gate 14 simulation: `reports/design_simulations/gamble_roguelike_gate14.py`; report `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_14.md`.
- CI [run 39322221351](https://github.com/murorachi/Amq-/actions/runs/39322221351) passed Gate 14.
- Next: run paper sessions with humans and record actual observations. Do not implement server/UI until decision quality, fairness, duration, and voluntary replay gates are met.


## Frozen design snapshot
Use `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_03.md` and `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md` for the human paper test. Candidate 02 is historical. Gate 14 CI passed; no human playtest has happened. Next action is paper sessions, not server/UI implementation.

## Active Gamble Roguelike task — design direction reset (2026-10-20)
- Current direction record: `reports/MULTIPLAYER_GAMBLE_DESIGN_DIRECTION_RESET_01.md`.
- Do not use Candidate 03 / Paper Playtest Kit 02 as the active target; preserve them for comparison only.
- Next bounded task: design a 3-stage paper prototype with three genuinely different wager shapes: (1) lower-volatility but consequential downside, (2) frequent losses plus rare major jackpot, (3) push-your-luck ladder with cash-out/continue decisions. Add a few run-changing relics and three concrete example runs: catastrophic loss, jackpot rescue, and cash-out regret.
- Review whether the decisions are exciting and state-dependent before writing simulations. Then use simulations only to check exploit loops, payout extremes, and outcome frequencies, not to force equal EV or equal clear rates.
- Remain in design; no server/UI/database implementation until the design is compelling and later human testing supports it.
- No tests run for this documentation-only reset. Existing Gate 14 CI does not validate the new design.

## Active Gamble Roguelike task — build a diverse game floor
- Game catalog: `reports/MULTIPLAYER_GAMBLE_GAME_CATALOG_01.md`.
- Product requirement: 2–3 games are insufficient. Explore a library of 12 mechanically distinct launch-ready games; 15 concepts are currently in the discovery pool.
- Next bounded task: create paper prototypes for six different mechanics: Vault Ladder, Minefield, Jackpot Draw, Wheel of Misfortune, Pot Split, and Debt Collector. Give each concrete rules, provisional asymmetric payout/outcome tables, and at least one worked example round.
- Review whether each game has a real decision, a distinct emotional rhythm, and a reason to be chosen in some run states. Remove redundant/boring concepts before writing simulations.
- Simulations may check outcome frequencies, dominant choices, payout bugs, and exploit loops; do not force equal expected value or similar clear rates.
- Design only. No server/UI/database or production implementation until paper designs are compelling and human testing supports the direction. No tests run for the catalog document.


## Active task — resolve paper-rule ambiguities before simulation
- Primary artifact: `reports/MULTIPLAYER_GAMBLE_PAPER_PROTOTYPES_ZH_01.md`.
- First finalize Pot Split's exact integer settlement and insurance outcomes; Wheel of Misfortune's two-stage probabilities; and Debt Collector's due-date counter and default handling.
- Verify every payout table's definitions (gross return includes stake), outcome counts, probability totals, and worked examples.
- Then write small reproducible enumeration/simulation checks for outcome frequencies, payout extremes, dominant choices, and exploit loops. Do not optimize all games to equal EV.
- Produce printable playtest cards and facilitator settlement sheets only after rules are internally consistent.
- Recruit/perform human paper sessions before claiming fun, fairness, or readiness for implementation.
- No server/UI/database or production code until design gates and human playtest support the direction.


## Rule ambiguities closed — next: reproducible distribution checks
- The first-pass rule ambiguities recorded above have been resolved in `reports/MULTIPLAYER_GAMBLE_PAPER_PROTOTYPES_ZH_01.md`.
- Next, add a small deterministic checker for probability totals, outcome counts, gross-return semantics, ladder success probability, Minefield conditional odds, Wheel's combined probabilities, Pot Split integer conservation/house remainder, and Debt Collector settlement arithmetic.
- Then test for dominant choices and exploit loops with focused simulations; report distributions and extreme outcomes, not a single “balance score”.
- Produce printable paper cards and a facilitator settlement sheet after the checker catches no rule/arithmetic contradictions.
- Human playtesting remains necessary before claiming fun or authorizing implementation. No server/UI/database or production changes.
