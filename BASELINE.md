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
- Added assertions: backup includes AMQ/EMQ custom-list stores and manifest; corrupt manifest rejection without mutation; injected write failure restores exact prior storage; valid restore recovers both list IDs/names; reload persists both payloads and renders both lists.
- One initial attempt failed due to Python string escaping; fixed before the passing commit. Keep the failure in the audit trail.

## Acceptance boundaries
- Browser checks use Chromium on a temporary localhost HTTP origin and isolated native browser storage.
- Synthetic write failure verifies rollback logic, not naturally occurring quota/disk failure.
- Firefox CSS cascade, real audio-provider playback, production-domain storage policy, and naturally occurring IndexedDB quota/corruption remain separate gates.
- Thirteen modules have CI contracts but semantic modularization is not complete.

## Separate workstream: multiplayer Gamble Roguelike

- Branch: `multiplayer-gamble-engine-discovery-01`, created from V82.86.06 branch head `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Current phase is **design iteration only**. Code-level rule fixtures do not authorize server/UI implementation.
- Gate 01: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_01.md`.
- Gate 02: `reports/MULTIPLAYER_GAMBLE_DESIGN_GATE_02.md`.
- Simulation: `reports/design_simulations/gamble_roguelike_gate02.py`.
- Design-first plan: `reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md`.
- Existing `gamble-roguelike/` files contain deterministic rules for Coin Call, Exact Seven, a partial Vault step, Blind High Card, and an in-memory ledger. The ledger is not durable; Vault lacks complete run-state/cash-out logic. No server, database, browser UI, deployment, or live two-client test exists.
- Previously recorded local working-copy tests: 10/10 subtests and syntax checks passed. The committed GitHub `test/core.test.js` has 8 tests. Remote CI is not verified.
- Gate 02 risk-profile math: Safe EV −10%/stake, Balanced −12%/stake, Jackpot −17.5%/stake. Vault revised cash-out gross EVs: 0.880×, 0.840×, and 0.8064× of original stake at steps 1–3.
- A 100,000-run quota-sized model exposed a dominant Safe strategy: 89.398% clear versus 31.780% Balanced and 2.684% Jackpot. The model was rejected.
- A fixed-stake model gave 38.830% clear for quota-aware play before items. A free-reroll upper bound increased it to 61.070%; this shows reroll strength must be tuned, not that the item is balanced.
- Mechanism slots: Vault; Risk Contract; Blind Draft with item priority rather than a fake shared-chip pot; Team Gamble.
- Ten draft items are documented but not yet combination-tested. Simulation models the team as one actor and cannot establish multiplayer fun.
- Next design gate: revise quota/strain/recovery, simulate items and 2/3/6-player policies, and prepare paper-playtest materials.
- No product HTML, source, or existing multiplayer behavior has been changed in this workstream.

## Acceptance boundary
- Design simulations can detect bad balance but cannot prove enjoyment.
- Do not implement server/UI until design Gates A–C pass and Gate D's playtest plan is ready. A low-fidelity playable prototype and external playtest are required before claiming comparable fun.
- Unexecuted tests remain marked unexecuted; local tests and remote CI are separate evidence.

## Rollback
- Revert design-only commits on `multiplayer-gamble-engine-discovery-01`.
- No product rollback is required because product HTML/source and generated output remain unchanged.
