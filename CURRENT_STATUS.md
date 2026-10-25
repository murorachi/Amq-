# CURRENT_STATUS — Candidate295 baseline / Candidate296 route checkpoint (2026-10-25)

## Baseline
- User-authorized baseline: Candidate295, `index-old.html`.
- Version: `v82.86.06-candidate295-db-extraction-20261025`.
- Bytes: 1,720,917; SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.
- Candidate295 remains unchanged.

## Latest child candidate
- File: `amq_learning_tool_v82_86_07_candidate296_route_guard_consolidation_20261025.html`.
- Version: `v82.86.07-candidate296-route-guard-consolidation-20261025`.
- Bytes: 1,719,843; SHA-256: `ec94f1daabdcc0b3151ba45b50d1e42d5ed5ddbf9ff4861050285cb44e94bddc`.
- Change: removed the earlier duplicate Song Select route wrapper; final Song Select guard and generic body-class guard retained.

## Tests
- PASS: 67/67 executable inline JavaScript blocks pass Node.js `--check`.
- PASS: 109 CSS blocks, 2,808 qualified rules, zero stylesheet/declaration parser errors.
- PASS: 271 parsed HTML IDs are unique.
- PASS: only one Song Select route map remains; old guard marker absent; final and generic guards remain.
- BLOCKED: browser routing/body-class/home-menu/back navigation checks due managed browser restriction.
- BLOCKED: AMQ/EMQ full data validation because `data.js` and `emq-data.js` are not present in this workspace.
- NOT RUN: CRUD, storage reload, backup/restore, audio and multiplayer regression.

## Remaining findings
- AMQ custom-list key/store: `aniCustomPracticeListsV1` / `window.__aniCustomListsStoreV1`; four runtime fallback readers remain. Do not remove them until compatibility adapter behavior is specified and tested.
- EMQ list keys and schema are separate from AMQ; retain `aniEmqWorkListsV8254`, `aniEmqWorkListsSelectedV8254`, `aniEmqAudioOverridesV8254` and validate with external data files.
- Full report: `reports/stage6-candidate296-route-guard-consolidation-20261025/ROUTE_GUARD_CONSOLIDATION_CANDIDATE296_20261025.md`.

## Rollback
Use the untouched Candidate295 baseline file. Candidate296 is a child copy and must not overwrite Candidate295.
