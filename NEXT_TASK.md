# Next task: accept scene-background lifecycle contract, then external-source/cache contracts

Current branch: `v82.85.31-scene-background-lifecycle-contract-01`.

## Current stage

- Added `tests/unit/scene_background_lifecycle_contract.test.cjs`: 18 exact-source cases for IndexedDB open/transaction/read success and failure, URL replacement/revocation, temporary preview cleanup, image MIME/size/dimension limits, and backup restore source guards.
- Test is registered in CI and deterministic checkpoint package. Production `src/scripts/script_036.htmlpart` unchanged.
- Local execution: NOT RUN. Inspect the newest workflow run, verify the test output and package reproducibility, and record Firefox/native-origin separately. The known final audio output capture failure is unrelated to this stage unless actual playback regresses.

## Ordered next work

1. Resolve any scene-background contract failures without changing production behavior merely to satisfy a test.
2. Confirm source/unit, package contract and reproducibility, deterministic build, Firefox responsive and Chromium native-origin results.
3. After acceptance, add targeted contracts for script_031/script_039/script_041 external-source/cache precedence, failure fallback and stale-response handling.
4. Do not perform a general storage or UI rewrite. No visual changes are planned in this stage.

## Rollback

Revert the scene-background test, workflow/package registration, report and checkpoint-document changes. Keep V82.85.30 SRS test and report, V82.85.28 product source and immutable V82.82 unchanged.
