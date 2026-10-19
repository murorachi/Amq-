# Current engineering checkpoint: V82.86.06 AMQ／EMQ custom-list backup restore browser acceptance

- Branch: `v82.86.06-custom-list-backup-restore-browser-01`.
- Parent baseline: `v82.86.05-custom-list-id-lifecycle-matrix-01`, commit `1b9b9a6e2e95bb2414968fe6aef1e119bd6ee8dc`.
- Report: `reports/V82_86_06_CUSTOM_LIST_BACKUP_RESTORE_BROWSER_01.md`.
- Changed test: `tests/browser/native_storage_custom_lists_acceptance.py`.
- Verified CI commit: `cbc5fed2d513fa4c01761cd640ea65c160a76146`; run [39166474674](https://github.com/murorachi/Amq-/actions/runs/39166474674) passed both jobs.
- Browser/native-origin job passed: AMQ and EMQ backup inclusion, corrupt-manifest rejection without mutation, injected restore-write failure with exact storage rollback, valid restore of both list IDs/names, actual reload persistence and UI re-render. Existing browser regression steps in that job also passed.
- Source/unit job passed, including deterministic V82.82 build/fingerprint and engineering contracts.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 unchanged.
- Remaining external gates: Firefox CSS cascade, real audio provider, production-origin storage policy, naturally occurring IndexedDB quota/corruption. The injected write fault does not substitute for those gates.
- Thirteen modules have CI contracts but semantic modularization is not complete.

## Separate workstream: multiplayer Gamble Roguelike

- **Current phase: design iteration only. No further implementation until the design gates pass.**
- Work branch: `multiplayer-gamble-engine-discovery-01`.
- Design Gate 01: [report](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md).
- Design-first plan: [implementation plan](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md).
- Discovery record: [engine discovery](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md).
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; no product HTML/source changed.
- Existing prototype files under `gamble-roguelike/` contain four pure-rule candidates, an in-memory ledger, a Node test suite, and a scoped GitHub Actions workflow. They are engineering fixtures, not a playable game.
- Previously recorded local working-copy checks: 10/10 subtests passed and syntax checks passed. The committed GitHub suite has 8 tests; remote CI status has not been verified.
- Design review found Coin Call and Exact Seven too shallow to count as signature games; Vault needs a full state/cash-out model; Blind High Card needs a meaningful decision. Revised hypothesis: 2–6-player co-op, shared virtual bankroll, simultaneous private actions, escalating quotas, meaningful route choices, 8–12 run-only items, and 12–20 minute target runs. These are unvalidated design hypotheses.
- Proposed distinct game mechanisms: Vault push-your-luck, Risk Contract, Blind Pot with one extra information/insurance decision, and Team Gamble.
- No server, durable database, HTTP/WebSocket transport, browser UI, deployment, or real two-client test exists.
- Next: complete Design Gate 02 with a numeric full-run walkthrough, item/synergy set, independent payout/EV calculations, and reproducible simulations. Do not implement until design gates A–C pass and the playtest plan is ready.

## Test/verification boundary for this checkpoint

- Design-document changes only; no code tests were run for this documentation update.
- GitHub write results must be followed by read-back verification; successful writes do not prove game quality or CI status.
- Roll back this workstream by reverting design-only commits on `multiplayer-gamble-engine-discovery-01`; no product rollback is required.

## Next AMQ maintenance task

- Add a dedicated stable CI command for `backup_restore_contract.test.cjs`, `full_backup_restore_roundtrip_contract_v82_83.test.cjs`, and `custom_list_source_contract.test.cjs`.
- Continue the IndexedDB failure matrix: open/blocked/upgrade, transaction failure, quota/corruption, rollback and reload.
- Keep Firefox CSS cascade, real audio provider, production-origin storage policy, and naturally occurring IndexedDB quota/corruption as separate gates.
- Do not change product source until test evidence identifies a product defect.
