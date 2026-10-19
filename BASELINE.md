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

## Separate workstream: multiplayer Gamble Roguelike discovery
- Branch: `multiplayer-gamble-engine-discovery-01`, based on V82.86.06 branch head `6bfe40908ae81e391c42ceeabb20896cac55ab50`.
- Design record: `reports/MULTIPLAYER_GAMBLE_ENGINE_DISCOVERY_01.md`.
- This is documentation/discovery only. Product HTML, source fragments, workflows, and multiplayer behavior have not been changed.
- Current inspected multiplayer client: `src/scripts/script_028.htmlpart`, blob SHA `b89ed0014f02ae156b6c66b607feb2639024eae9`.
- Blocking dependency: the current room API server source/deployment is not present in the inspected repository tree. Do not implement authoritative bets, balances, or random outcomes in the browser.
- Next gate: identify the current server source and live API contract, or document an explicit decision to create a new server service.
