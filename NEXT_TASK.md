# Next task: scene-background IndexedDB and object-URL lifecycle contract

Current accepted branch: `v82.85.30-srs-transition-contract-01`.
Next work should use a separate branch based on this accepted checkpoint.

## Completed SRS stage

- Added `tests/unit/srs_rating_transition_contract.test.cjs`: 17 exact-source cases for default schedule, validation, quarantine, rating-state transitions, due intervals, review-log cap, invalid grades and persistence failure safety.
- Product `src/scripts/script_020.htmlpart` unchanged.
- CI [39237555930](https://github.com/murorachi/Amq-/actions/runs/39237555930): source/unit PASS, SRS 17/17 PASS, package contract/reproducibility PASS, deterministic standalone build PASS, Firefox responsive PASS. Chromium native-origin failed only at known final audio monitor capture (peak=0, rms=0); all preceding storage/custom-list/IndexedDB/input/suggestion/quiz/multiplayer lifecycle steps passed. Actual product playback was user-confirmed. Do not reopen audio capture unless actual playback regresses.

## Ordered next work

1. Start a separate scene-background contract stage for `src/scripts/script_036.htmlpart`.
2. Cover IndexedDB transaction success/error/abort, no-db failure, URL replacement/revocation, preview URL cleanup, image MIME/size/dimension limits, and backup-restore validation/rollback.
3. Use exact production functions and synthetic browser/storage doubles. Do not change production code merely to simplify testing.
4. Register tests in CI and the deterministic checkpoint package, add a report, and run the full workflow.
5. After that, consider focused contracts for script_031/script_039/script_041 external-source/cache behavior.

## Rollback

Revert the SRS test, its workflow/package registration, report and checkpoint-document changes. Keep V82.85.29 audit records, V82.85.28 product source and immutable V82.82 unchanged.
