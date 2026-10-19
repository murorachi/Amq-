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
- Design Gate 01: [product thesis and critique](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md).
- Design Gate 02: [numeric stress test](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md).
- Design simulation: [reproducible Python script](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/design_simulations/gamble_roguelike_gate02.py).
- Design-first plan: [plan](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md).
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; no product HTML/source changed.
- Existing `gamble-roguelike/` files are deterministic rule fixtures and an in-memory ledger, not a playable game. No server, database, UI, durable persistence, deployment, or live two-client run exists.
- Previously recorded local working-copy checks: 10/10 subtests and syntax checks passed. Committed GitHub suite has 8 tests; remote CI result is not verified.
- Gate 02 independently calculated Risk Contract expected net values and Vault stopping-point values, then ran two quota models with Python standard library, seed `20261020`, and 100,000 runs/configuration.
- Rejected model: betting only enough to gain a 5% quota made Safe overwhelmingly dominant (89.398% clear) over Balanced (31.780%) and Jackpot (2.684%).
- Fixed-stake model: quota-aware clear rate 38.830% before items; a free reroll upper bound produced 61.070%, proving that reroll effect needs a real cost. This is not evidence of fun or final balance.
- Current mechanism set: Vault, Risk Contract, Blind Draft (item priority rather than shared-chip pot), and Team Gamble.
- Ten draft items are documented; item combinations, multiplayer policies, and recovery branches remain unvalidated.
- Next: Gate 03 revises quota/strain/recovery, simulates item combinations and 2/3/6-player policies, and prepares a paper-playtest kit. Do not implement the server/UI yet.

## Test/verification boundary
- Gate 02 simulation executed locally with Python 3 standard library; product tests were not run because product source was not changed.
- No human playtest, real multi-client run, or verified remote CI for the gamble core is claimed.
- Roll back design-only commits on `multiplayer-gamble-engine-discovery-01`; no product rollback is required.

## Next AMQ maintenance task
- Add a dedicated stable CI command for `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs`, and `custom_list_source_contract.test.cjs`.
- Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload.
- Keep Firefox CSS cascade, real audio provider, production-origin storage policy, and naturally occurring IndexedDB quota/corruption as separate gates.
- Do not change product source until test evidence identifies a product defect.
