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

- **Current phase: design iteration only. Implementation remains blocked by design gates.**
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Gate 01: [product thesis and critique](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md).
- Gate 02: [numeric stress test](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md).
- Gate 03: [fair-EV and multiplayer exposure review](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_03.md).
- Simulations: [Gate 02](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate02.py), [Gate 03](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate03.py).
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; no product HTML/source changed.
- Existing `gamble-roguelike/` files are rule fixtures and an in-memory ledger, not a playable game. No server, database, UI, durable persistence, deployment, or live two-client test exists.
- Previously recorded local core tests: 10/10 subtests and syntax checks passed. Committed GitHub suite has 8 tests; remote CI is not verified.
- Gate 03 revised risk profiles to fair gross EV before fees/rounding: Safe 75% / 4/3×, Balanced 40% / 2.5×, Jackpot 15% / 20/3×.
- One shared wager per stage achieved 46.563% clears in the quota-aware no-item simulation and 65.989% with a once-per-run reroll paying 90% of normal gross on the reroll. This is one simplified model, not final balance.
- Separate wagers against a shared bank couple exposure to player count. A 20% aggregate cap helps but still lowers six-player clears in the tested model.
- Design decision: one team wager per stage, selected from simultaneous private votes/actions. This avoids multiplying shared-bank exposure by party size.
- Gate A–C are not passed: recovery/anti-griefing, item combinations, rounding, three viable strategies, and playtest protocol remain open.
- Next: Gate 04 defines vote mapping, tests item combinations and player counts, and prepares paper-playtest materials. No implementation yet.

## Test/verification boundary
- Gate 03 simulation ran locally using Python 3 standard library, fixed seed 20261020, 100,000 runs/configuration; the committed script was read back from GitHub. Local syntax/execution passed for the corresponding working copy.
- No human playtest, live multi-client run, or verified remote CI for the gamble core is claimed.
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`; no product rollback is required.

## Next AMQ maintenance task
- Add a dedicated stable CI command for `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs`, and `custom_list_source_contract.test.cjs`.
- Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload.
- Keep Firefox CSS cascade, real audio provider, production-origin storage policy, and naturally occurring IndexedDB quota/corruption as separate gates.
- Do not change product source until test evidence identifies a product defect.
