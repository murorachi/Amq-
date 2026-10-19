# V82.85.30 SRS rating-transition characterization

- Branch: `v82.85.30-srs-transition-contract-01`
- Parent audit baseline: `v82.85.29-source-audit-matrix-01`
- Product source baseline: V82.85.28; `src/scripts/script_020.htmlpart` unchanged (blob `a141a4d1e5d94fc422ddbc89d47b65eba9d166fd`).
- Immutable V82.82 product baseline remains 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Scope: exact-source characterization tests only. No FSRS formula, learning-step, storage-key, schema, or production UI change.

## Why this stage exists

The first-pass SRS audit found no focused contract for rating transitions, interval rounding, review-log bounds, or invalid-record quarantine. These behaviors affect a user's long-lived study schedule, so the next change is a characterization gate, not a refactor.

## Test design

Added `tests/unit/srs_rating_transition_contract.test.cjs`. It extracts the current production functions from `script_020.htmlpart` and executes those exact function bodies in an isolated VM with synthetic storage. It does not load or mutate a real browser profile.

The test suite covers:
1. Default schedule schema and settings.
2. Rejection of invalid schema/settings/state/card IDs/review-log shapes.
3. Invalid JSON quarantine, recovery copy creation and removal of the invalid primary key.
4. Quarantine storage failure blocks writes and preserves the original raw value.
5. New-card Again, Hard, Good and Easy transitions and due delays.
6. Learning Again reset, step-specific Hard delay, Good progression/graduation and Easy graduation minimum.
7. Review Again relearning/lapse handling; review Hard/Good/Easy intervals.
8. Relearning Hard and Good behavior.
9. Interval rounding, minimum and configured maximum.
10. Review log capped at 20 and post-transition values.
11. Invalid grade rejection without mutation.
12. Failed persistence does not change in-memory or saved schedule state.

The suite has 17 named test cases. Assertions lock the existing behavior; they are not an independent proof that the FSRS-6 formula matches an external reference implementation.

## Acceptance

- Static source-boundary inspection: PASS. Every extracted function is bounded by an adjacent production function marker; test uses no synthetic replacement for the function bodies.
- Local execution in this authoring environment: NOT RUN. The repository runtime is not mounted here; GitHub Actions is the execution authority for the committed test.
- CI source/unit, package reproducibility, Firefox responsive and Chromium native-origin: pending this branch's workflow run.
- Existing known CI issue remains separate: the final non-silent audio monitor capture step has failed with peak=0/rms=0 while preceding playback lifecycle assertions passed and actual product playback was user-confirmed. Do not interpret that capture failure as an SRS regression.

## Rollback and next work

Rollback by reverting the new test, its workflow/package registration, this report and status-file references. No product source rollback is required. If CI passes, next focus is script_036 scene-background IndexedDB transaction and object-URL lifecycle characterization; do not start a general SRS rewrite.
