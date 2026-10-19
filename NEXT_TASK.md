# Next task: verify SRS characterization, then scene-background lifecycle

Current branch: `v82.85.30-srs-transition-contract-01`.

## Current stage

- Added `tests/unit/srs_rating_transition_contract.test.cjs`: 17 exact-source cases for default schedule, validation, quarantine, rating-state transitions, due intervals, review-log cap, invalid grades and persistence failure safety.
- Test is registered in CI and the reproducible checkpoint package. Production `script_020.htmlpart` remains unchanged.
- Local execution: NOT RUN. First inspect the latest branch workflow, confirm the new SRS test actually executes and passes, and inspect the package/reproducibility results. Do not treat the known audio-output capture failure as an SRS failure.

## Ordered next work

1. Resolve any SRS contract test failures with the smallest correction; do not change production scheduling behavior to make characterization pass.
2. Confirm source/unit and package reproducibility, Firefox responsive, and report Chromium native-origin separately. The known non-silent audio capture assertion is a pre-existing environment limitation.
3. After SRS contract passes, create a separate stage for `src/scripts/script_036.htmlpart`: characterize IndexedDB transaction behavior, object-URL creation/revocation, failed storage operations and page cleanup. Preserve current UI and storage schema.
4. Only then consider targeted contracts for script_031/script_039/script_041 external-source/cache behavior.

## Rollback

Revert the SRS test, its workflow/package registration, report and checkpoint-document changes. Keep V82.85.29 audit records, V82.85.28 product source and immutable V82.82 unchanged.
