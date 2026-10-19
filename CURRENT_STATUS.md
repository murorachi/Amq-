# Current engineering checkpoint: V82.86.06 AMQ／EMQ custom-list backup restore browser acceptance

- Branch: `v82.86.06-custom-list-backup-restore-browser-01`.
- Parent baseline: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_BROWSER_01.md`.
- Changed test: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Verified CI commit: `cbc5fed2d513fa4c01761cd640ea65c160a76146`; run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674) passed both jobs.
- Browser/native-origin job passed: AMQ/EMQ backup inclusion, corrupt-manifest rejection without mutation, injected restore-write failure with exact rollback, valid restore of both list IDs/names, reload persistence and UI re-render.
- Source/unit job passed, including deterministic V82.82 build/fingerprint and engineering contracts.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 unchanged.
- Remaining external gates: Firefox CSS cascade, real audio provider, production-origin storage policy, naturally occurring IndexedDB quota/corruption.
- Thirteen modules have CI contracts but semantic modularization is not complete.

## Separate workstream: multiplayer Gamble Roguelike

- **Current phase: design iteration only. Implementation remains blocked.**
- Branch: `multiplayer-gamble-engine-discovery-01`.
- Design reports: [Gate 01](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md), [Gate 02](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md), [Gate 03](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_03.md), [Gate 04](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_04.md), [Gate 04 errata](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_04_ERRATA_01.md), [Gate 05](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_05.md).
- Paper playtest draft: [protocol and observation sheet](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_01.md).
- Design simulations: [Gate 02](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate02.py), [Gate 03](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate03.py), [Gate 05 exact enumeration](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate05.py).
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; no product HTML/source changed.
- Existing `gamble-roguelike/` code is rule fixtures and an in-memory ledger, not a playable game. No server, database, UI, durable persistence, deployment, or live two-client test exists.
- Previously recorded local core tests: 10/10 subtests and syntax checks passed. Committed GitHub suite has 8 tests; remote CI is not verified.
- Gate 05 exact enumeration corrected Signal Room two-clue success from provisional 2/3 to 3/4 using a defined pair-clue generator. Gross returns 3× / 2× / 4/3× preserve fair EV before fees/rounding.
- Gate 05 found median risk voting suppresses Push in six-player rooms; plurality with explicit tie compromise is the current proposal.
- Preferred economy: one shared team wager per stage. Separate wagers against a shared bank couple risk and variance to player count.
- Gates A–C are not passed: recovery/anti-griefing, item combinations, integer rounding, three viable strategies, and vote fairness need more work. The paper-playtest kit is a draft and has not been used with humans.
- Next: Gate 06 simulates the revised vote, clue fees/rounding, item bundles, and recovery; no implementation yet.

## Test/verification boundary
- Gate 02/03 seeded simulations ran locally; Gate 05 exact enumeration ran locally with Python standard library. Committed simulation source was read back from GitHub.
- No human playtest, live multi-client run, or verified remote CI for the gamble core is claimed.
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`; no product rollback is required.

## Next AMQ maintenance task
- Add a dedicated stable CI command for `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs`, and `custom_list_source_contract.test.cjs`.
- Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload.
- Keep Firefox CSS cascade, real audio provider, production-origin storage policy, and naturally occurring IndexedDB quota/corruption as separate gates.
- Do not change product source until test evidence identifies a product defect.


## Gamble Roguelike design checkpoint — Gate 07
- Report: [Design Gate 07](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_07.md).
- Simulation: [Gate 07 recovery stress test](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate07.py).
- Repeated recovery payments at 2 strain could remove strain indefinitely. Candidate correction: once per run, at 2 strain, fee ceil(15% of bank), clear one strain, and forfeit that stage's item reward.
- Exact committed integer-RNG simulation (100,000 runs per policy): never recover 46.832% clear / 34.773% strain failure / mean final bank 998.89; always recover when eligible 45.403% clear / 27.469% failure / mean final bank 947.30. Item reward opportunity cost is not modeled.
- Gate 06 rejected generic all-game retry because it was either dominant or irrelevant depending on penalty. Integer-floor payout creates small implicit EV losses for Safe and Jackpot.
- Full-run integration, item acquisition opportunity costs, three viable strategies, group fairness, and human playtest remain missing. Design only; server/UI/database implementation remains blocked.


## Gamble Roguelike — Gate 08/09 design revision
- Gate 08 report: [integrated model and strategy failure](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_08.md); simulation: `reports/design_simulations/gamble_roguelike_gate08.py`.
- Gate 08 showed fixed absolute targets made quota-aware play dominate. Gate 09 changed stage targets to current bank + ceil(1%) and tied risk tier to stake size: Bank 5%, Balanced 10%, Push 15%.
- Gate 09 report: [core strategy sensitivity](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_09.md); simulation: `reports/design_simulations/gamble_roguelike_gate09.py`; current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- At final goal 105% of starting bank, base clear rates across starting banks 750/1000/1500 were approximately Conservative 27.0–27.2%, Balanced 41.2–41.5%, Push 17.1–17.4%. Conservative has the lowest strain-failure rate; Balanced leads the standard clear; Push is strongest at the 150% high-score tier. This is a simulation signal, not evidence of fun.
- Items, recovery, personal item ownership, route choices, 2/3/6-player voting, and human playtesting remain open. No implementation authorized.
- New CI workflow: `.github/workflows/gamble-design-simulations.yml`; run status is pending verification.

- Design simulation CI verified: [run 39318826618](https://github.com/murorachi/Amq-/actions/runs/39318826618), commit `5942fc949d3d3962c1a63aebba9bf7f869017265`, completed successfully. Syntax checks and all Gate 05–09 simulation scripts passed. This verifies reproducibility/termination, not game balance or fun.


## Gamble Roguelike — Gate 10–13
- Gate 10 item/recovery report: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_10.md`; Gate 11 item-strength sweep: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_11.md`; Gate 12 integrated item/recovery model: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_12.md`; Gate 13 vote/event-order/rounding checks: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_13.md`.
- Current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`.
- Gate 11/12 tuning: Insurance is Bank/Balanced only with 10% stake refund; Vault Harness refunds 20% on a continued-step loss; recovery fee 12%, or 8% with Recovery Voucher, once per run at strain 2 and discards one held item if any.
- Signal Room two-clue fee changed from separately rounded 2%+4% to one `ceil(6% × stake)` fee. This avoids double-rounding at small stakes; low stakes still have higher effective percentage due to integer chips.
- Gate 12 integrated model keeps strategy niches: Conservative lowest strain failure, Balanced best at the 105% clear target, Push higher variance and strongest at high score tier. Shared inventory/fixed rankings remain a simplification.
- CI passed: [Gate 12 corrected model run 39320570030](https://github.com/murorachi/Amq-/actions/runs/39320570030) and [Gate 13 full design suite run 39320747705](https://github.com/murorachi/Amq-/actions/runs/39320747705). Syntax checks and simulations passed; this is not a fun or human-fairness pass.
- Still open: personal item ownership, real 2/3/6-player draft/vote fairness, route choices, paper test with humans, and evidence that players want to replay. No implementation authorized.


## Paper-test readiness checkpoint — Gate 13
- Current rulebook: [Candidate 02](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md).
- Paper test kit: [Kit 02](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md). It is prepared but has **not** been executed with human players.
- Gate 13 report: [event order, vote size, and rounding](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_13.md).
- CI passed: [run 39321094158](https://github.com/murorachi/Amq-/actions/runs/39321094158), including Python syntax checks and Gate 05–13 simulations. This verifies reproducible execution, not fun or human fairness.
- Rule updates: shuffle two Risk / two Vault / one Signal event cards; stage target is post-recovery bank + ceil(1%); final goal 105%; two-clue fee is ceil(6% stake); Insurance is Bank/Balanced only at 10% refund; Vault Harness 20%; recovery once/run at 12% (8% with voucher), skips the next eligible Blind Draft.
- Design is now stable enough for paper testing, but not proven comparable in enjoyment to existing products. No implementation authorized until real players show meaningful decisions and voluntary replay intent.


## Gate 14 — shared draft inventory finalized
- Current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_02.md`; paper kit: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`.
- Draft design changed from per-player items to a shared team inventory capped at two items. After a cleared stage 2 or 4, the two highest-ranked players each make one pick from three distinct item cards. The shared cap prevents item count scaling automatically with party size. Team votes whether to activate one eligible item.
- Favor rules now state that a token spent before a tie remains spent; tie rerolls use raw d6. AFK/disconnected players do not roll or spend Favor; if no player is active, skip the draft.
- Gate 14 report/script: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_14.md`, `reports/design_simulations/gamble_roguelike_gate14.py`. The two-pick simulation preserved the strategy niches in the fixed test sequence.
- CI passed: [run 39322221351](https://github.com/murorachi/Amq-/actions/runs/39322221351), including Gate 14 syntax and simulation. Human draft fairness is still untested.
- Design is paper-test ready, not implementation-ready. No human paper session has occurred, so fun comparability remains unproven.


## Design snapshot
Current rulebook: `reports/MULTIPLAYER_GAMBLE_RULEBOOK_CANDIDATE_03.md`. Paper test: `reports/MULTIPLAYER_GAMBLE_PAPER_PLAYTEST_02.md`. No human playtest yet; no implementation authorized.
