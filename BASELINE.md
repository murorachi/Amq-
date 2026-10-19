# Baseline lock and current engineering checkpoint

## Immutable and product baselines
- V82.65 remains immutable and must never be overwritten.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.86.06 changes only browser test and engineering records; no product source or generated HTML changed.

## V82.86.06
- Branch: `v82.86.06-custom-list-backup-restore-browser-01`.
- Parent: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_BROWSER_01.md`.
- Browser harness: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Verified test commit: `cbc5fed2d513fa4c01761cd640ea65c160a76146`.
- CI run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674): both `source-and-unit` and `browser-native-origin` passed.
- Added assertions: backup includes AMQ/EMQ custom-list stores and manifest; corrupt-manifest rejection without mutation; injected write failure restores exact prior storage; valid restore recovers both list IDs/names; reload persists both payloads and renders both lists.
- One initial attempt failed due to Python string escaping; fixed before the passing commit. Keep the failure in the audit trail.

## Acceptance boundaries
- Browser checks use Chromium on a temporary localhost HTTP origin and isolated native browser storage.
- Synthetic write failure verifies rollback logic, not naturally occurring quota/disk failure.
- Firefox CSS cascade, real audio-provider playback, production-domain storage policy, and naturally occurring IndexedDB quota/corruption remain separate gates.
- Thirteen modules have CI contracts but semantic modularization is not complete.

## Separate workstream: multiplayer Gamble Roguelike

- Branch: `multiplayer-gamble-engine-discovery-01`, created from V82.86.06 branch head `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Current phase: **design only**. Existing code-level rule fixtures do not authorize server/UI implementation.
- Reports: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md` through `_05.md`; Gate 04 correction: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_04_ERRATA_01.md`; paper-test draft: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_01.md`.
- Simulations: `reports/design_simulations/gamble_roguelike_gate02.py`, `gamble_roguelike_gate03.py`, `gamble_roguelike_gate05.py`.
- Existing `gamble-roguelike/` files contain deterministic rules for Coin Call, Exact Seven, a partial Vault step, Blind High Card, and an in-memory ledger. The ledger is not durable; Vault lacks complete run-state/cash-out logic. No server, database, browser UI, deployment, or live two-client test exists.
- Previously recorded local core tests: 10/10 subtests and syntax checks passed. The committed GitHub `test/core.test.js` has 8 tests. Remote CI is not verified.
- Risk Contract candidates now have fair gross EV before fees/rounding: Safe 75% / 4/3×, Balanced 40% / 2.5×, Jackpot 15% / 20/3×.
- Signal Room exact clue generator yields 1/3, 1/2, and 3/4 success with 0/1/2 clues and gross multipliers 3×/2×/4/3×. Gate 04's provisional two-clue 2/3 value is superseded by Gate 05/errata.
- One shared team wager per stage is preferred. Median voting suppresses Push in six-player rooms; plurality with explicit tie handling is the current proposal.
- Design gaps: integrated recovery/AFK rules, item combo and integer rounding simulation, three viable strategies, vote fairness, and a human playtest. The paper-playtest kit has not been executed.
- No product HTML, source, or existing multiplayer behavior has been changed.

## Acceptance boundary
- Design simulations can detect balance failures but cannot prove enjoyment.
- Do not implement server/UI until Gates A–C pass and Gate D's playtest plan is ready. A low-fidelity prototype and external playtest are required before claiming comparable fun.
- Unexecuted tests remain unexecuted; local checks and remote CI are separate evidence.

## Rollback
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`.
- No product rollback is required because product HTML/source and generated output remain unchanged.


## Gamble Roguelike design checkpoint — Gate 07
- Report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_07.md`; script: `reports/design_simulations/gamble_roguelike_gate07.py`.
- Gate 07 identified a recovery exploit: repeatable recovery could make strain failure impossible. Candidate rule: one use/run at 2 strain, fee ceil(15% bank), clear one strain, forfeit the stage item reward.
- Exact results (100,000 runs/policy, seed 20261020): never recover 46.832% clear, 34.773% strain failure, mean bank 998.89; always recover 45.403% clear, 27.469% failure, mean bank 947.30.
- This tests Risk Contract plus strain/recovery only; full-game balance and enjoyment are not validated. No product source changed.
- Next design gate: integrate Risk Contract, Vault, Signal Room, Blind Draft, recovery, item opportunity costs, and three candidate strategies. No implementation until numerical gates pass.


## Gamble Roguelike — Gate 08/09
- Gate 08: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_08.md`; integrated fixed-target model showed quota-aware policy dominance.
- Gate 09: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_09.md`; simulation `reports/design_simulations/gamble_roguelike_gate09.py`; revised rulebook `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Core revision: stage target = stage-start bank + ceil(1%); risk tiers also set stake size (Bank 5%, Balanced 10%, Push 15%); final target 105% of starting bank.
- At 105% goal, clear rates remain stable across starting banks 750/1000/1500: Conservative about 27%, Balanced about 41%, Push about 17%. Conservative has lowest strain failure; Balanced best standard clear; Push better at 150% score tier.
- The Gate 09 baseline excludes items and recovery. Integrated item/recovery tests and human playtest remain open. No product source changed.
- Design simulation CI workflow added at `.github/workflows/gamble-design-simulations.yml`; remote result must be checked before claiming pass.


## Design simulation CI
- [Run 39318826618](https://github.com/murorachi/Amq-/actions/runs/39318826618) passed on commit `5942fc949d3d3962c1a63aebba9bf7f869017265`.
- Python syntax checks and Gate 05–09 scripts completed. This verifies script execution, not balance or enjoyment.


## Design Gate 10–13
- Reports: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_10.md` through `_13.md`; rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Candidate tuning: Insurance Bank/Balanced only with 10% refund; Vault Harness 20%; recovery once/run at strain 2 with 12% fee or 8% voucher fee; discard one held item if available.
- Two-clue Signal Room fee is `ceil(6% × stake)` to avoid double rounding.
- CI [run 39320747705](https://github.com/murorachi/Amq-/actions/runs/39320747705) passed the Gate 05–13 simulation suite. This is not proof of fun.
- Next: paper-playtest kit 02 and human paper sessions. No product source changed.


## Paper-test readiness — Gate 13
- Rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Paper test kit: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md` (prepared, not executed).
- Gate 13 report/script: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_13.md`, `reports/design_simulations/gamble_roguelike_gate13.py`.
- CI run [39321094158](https://github.com/murorachi/Amq-/actions/runs/39321094158) passed syntax and simulation steps for Gate 05–13.
- Design is paper-test ready, not proven fun. No product source changed. Next evidence must come from human paper sessions before implementation.


## Gate 14 shared draft
- Current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`; paper test: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`.
- Shared inventory is capped at two items regardless of player count. The two highest-ranked players each pick one item after cleared stages 2/4. Team vote activates at most one item per wager.
- Favor tie rerolls use raw d6; spent Favor remains spent. AFK players do not roll/spend Favor.
- Gate 14 simulation and report: `reports/design_simulations/gamble_roguelike_gate14.py`, `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_14.md`.
- CI [run 39322221351](https://github.com/murorachi/Amq-/actions/runs/39322221351) passed. Human fairness/fun remains untested; no product source changed.


## Current design snapshot
Rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_03.md`. Paper test: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`. Gate 14 CI passed; human testing not executed.

## Gamble Roguelike — design direction reset (2026-10-20)
- Branch HEAD at start of this change: `c3b6cba2f4d0a24d1d9061fe013b2e0637670fca`.
- Added `reports/MULTIPLAYER_GAMBLE_DESIGN_DIRECTION_RESET_01.md` after owner feedback that Candidate 03 is too predictable and over-balanced for a gambling game.
- Equal expected value and similar strategy clear rates are no longer primary design goals. The new target is honest but asymmetric odds, high variance, rare run-changing payouts, push-your-luck decisions, and meaningful run-dependent temptation.
- Candidate 03 and Paper Playtest Kit 02 are preserved unchanged as historical snapshots. No production AMQ source/HTML or playable implementation changed.
- Validation: documentation change only; no simulation or product tests run. Gate 14 CI only covers the previous design scripts and is not evidence for this new direction.

## Gamble Roguelike — game catalog breadth (2026-10-20)
- Added `reports/MULTIPLAYER_GAMBLE_GAME_CATALOG_01.md` on branch `multiplayer-gamble-engine-discovery-01`.
- Catalog contains 15 candidate game concepts; design target is 12 mechanically distinct launch-ready games, with six diverse games selected for first paper prototyping.
- Distinctness is defined by decision mechanic, outcome shape, resolution rhythm, and social/emotional tension; reskins do not count.
- This is design-only. Candidate 03 remains historical, no production AMQ source/HTML or game implementation changed, and no tests/simulations were run for the catalog.


## Gamble Roguelike — Chinese paper prototype checkpoint
- Added `reports/MULTIPLAYER_GAMBLE_PAPER_PROTOTYPES_ZH_01.md` on the design branch.
- The report defines six detailed paper prototypes plus Traditional Chinese rule drafts for the other nine catalog concepts.
- Provisional rules cover asymmetric outcomes and example rounds; they are not numerically approved. No simulation or human test was run for this artifact.
- AMQ product HTML/source, existing multiplayer behavior, server, UI, and database remain unchanged.
- Rollback is limited to the design report and its status-note commits.


### Paper prototype rule-closure update
- Follow-up to `reports/MULTIPLAYER_GAMBLE_PAPER_PROTOTYPES_ZH_01.md`: Pot Split's rounding/insurance and Debt Collector's two-completed-settlement due counter are now explicit in the draft.
- Wheel of Misfortune requires two probability layers to remain separately visible: chance to land on the selected color, then conditional result chance.
- This is documentation-only; all numeric tables remain provisional and no simulation or human test has run.


## Item system design note
- See `reports/MULTIPLAYER_GAMBLE_ITEM_BUILD_SYSTEM_ZH_01.md` for the proposed Roguelike item framework.
- Design only; no product code was changed.
