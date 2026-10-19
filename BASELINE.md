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
- Added assertions: full backup includes AMQ/EMQ custom-list stores and manifest; corrupt manifest is rejected without storage mutation; injected write failure restores the exact prior application-storage snapshot; valid restore recovers both list IDs and names; real document reload preserves both payloads and both lists render again.
- One initial attempt failed due to invalid Python string escaping in the test harness; fixed before the passing commit. Keep this failure in the audit trail.

## Acceptance boundaries
- Browser checks use Chromium on a temporary localhost HTTP origin and an isolated context with native browser storage.
- The synthetic write failure verifies rollback logic, not a naturally occurring quota or disk failure.
- Firefox CSS cascade, real audio-provider playback, production-domain storage policy and naturally occurring IndexedDB quota/corruption remain separate gates.
- Thirteen modules have CI contracts but semantic modularization is not complete.

## Separate workstream: multiplayer Gamble Roguelike

- Branch: `multiplayer-gamble-engine-discovery-01`, created from V82.86.06 branch head `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Current phase is **design iteration only**. The existence of code-level rule fixtures does not authorize server/UI implementation.
- Design Gate 01: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md`.
- Design-first plan: `reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md`.
- Discovery record: `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`.
- Existing isolated files under `gamble-roguelike/` provide deterministic rules for Coin Call, Exact Seven, a partial Vault step, Blind High Card, and an in-memory integer-chip ledger. The ledger is not durable; Vault has no complete run-state/cash-out implementation. No server, database, browser UI, deployment, or live two-client test exists.
- Previously recorded local working-copy tests: 10/10 subtests passed and syntax checks passed. The committed GitHub `test/core.test.js` has 8 tests. No verified remote CI result is available; do not report remote CI as passing.
- Design Gate 01 concluded that Coin Call and Exact Seven are too shallow as signature games, Vault needs full state/cash-out rules, and Blind High Card needs an additional meaningful decision.
- Revised hypothesis: 2–6-player co-op, shared virtual bankroll, simultaneous private actions, escalating stage quotas, route choices, 8–12 run-only items, and target 12–20 minute runs. All are unvalidated hypotheses, not approved final constants.
- Proposed mechanism slots: Vault push-your-luck; Risk Contract with distinct probability/reward profiles; Blind Pot with one extra information/insurance choice; Team Gamble with collective push-your-luck.
- Next design gate: numeric full-run walkthrough, item/synergy set, independent probability and expected-value calculations, reproducible simulation, and revision based on findings.
- No product HTML, source, or existing multiplayer behavior has been changed in this workstream.

## Acceptance boundary
- Design docs and simulations may identify weak balance but cannot prove real player enjoyment.
- Do not implement a server or browser client until design Gates A–C pass and the Gate D playtest plan is ready. A low-fidelity playable prototype and external playtest are still required before claiming comparable fun.
- Any unexecuted test must be marked unexecuted; local checks and remote CI are separate evidence.

## Rollback
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`.
- No product rollback is required because product HTML/source and generated output remain unchanged.
