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
- Work branch: `multiplayer-gamble-engine-discovery-01`, created from V82.86.06 branch head `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Discovery record: [`reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md).
- Implementation proposal: [`reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md`](https://github.com/murorachi/Amq-/blob/multiplayer-gamble-engine-discovery-01/reports/MULTIPLAYER_GAMBLE_IMPLEMENTATION_PLAN_01.md).
- The existing multiplayer client contains HTTP/WebSocket route references, but the user clarified the existing feature substantively does not use a conventional server. Do not treat missing server source as a blocker for planning the new game, and do not infer the current transport model from route names alone.
- Recommended architecture for the new game: separate lightweight authoritative service, run locally during development and hosted later if always-on friend access is needed. This remains a proposal awaiting approval.
- No product source, HTML, or existing multiplayer behavior has been changed in this workstream.
- Added isolated source files under `gamble-roguelike/` for deterministic rules and an in-memory ledger, plus Node tests and a scoped CI workflow.
- Local working-copy tests: 10/10 subtests passed; syntax checks passed. Remote CI status for the consolidated GitHub test file is not verified.
- Proposed first playable scope: 2–6 players, per-run balance of 1,000 virtual chips, five stages, four mechanically distinct candidate games, run-only items, no real-money wagering/cash-out/player transfers.
- Proposed payouts have deterministic rule coverage but have not been simulated or playtested. Ledger persistence, server, client UI, and real two-client run are not implemented.

## Rollback
- Revert the documentation-only commits on `multiplayer-gamble-engine-discovery-01`.
- No product rollback is required because product HTML/source and generated output remain unchanged.
