# V82.85.31 scene-background lifecycle characterization

- Branch: `v82.85.31-scene-background-lifecycle-contract-01`
- Parent checkpoint: `v82.85.30-srs-transition-contract-01`
- Product source baseline: V82.85.28; `src/scripts/script_036.htmlpart` unchanged (blob `6d3690052c2fa049f9189faad6d0753ef91b4fa1`).
- Immutable V82.82 product baseline remains 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Scope: exact-source lifecycle characterization only. No production UI, IndexedDB schema, image limit, backup format, or storage behavior change.

## Why this stage exists

The first-pass audit found no dedicated contract for the scene-background IndexedDB wrapper, object-URL ownership, temporary preview cleanup, or image dimension guards. These paths own persistent image data and browser resources, so regressions could lose settings or retain stale Blob URLs.

## Test design

Added `tests/unit/scene_background_lifecycle_contract.test.cjs`. It extracts the current production functions from `src/scripts/script_036.htmlpart` and executes their exact bodies in a VM with synthetic IndexedDB, URL, Blob and image-decoder doubles. It does not use a real browser profile or real user data.

The 18 named test cases cover:
1. IndexedDB unsupported, successful upgrade/store creation, and open failure.
2. Transaction wrapper not-ready, success-after-completion, transaction error, abort and synchronous work failure.
3. Read-all request success and failure.
4. Object URL replacement and revocation-map cleanup even if revoke throws.
5. Temporary preview cleanup of Blob/name/input and URL.
6. Opacity/fit/position bounds.
7. Image MIME, empty/oversized file rejection before decoding.
8. Dimension and total-pixel rejection with bitmap cleanup.
9. Valid image accepted at the configured byte/pixel limits with bitmap cleanup.
10. Backup restore source guards for total-size limit, unique scenes, transactional replacement and URL revocation.

The backup-restore checks are source-contract assertions; they do not simulate a full real-browser restore against a live IndexedDB implementation.

## Acceptance

- Static source-boundary inspection: PASS; exact function bodies are bounded by adjacent production declarations.
- Local execution in this authoring environment: NOT RUN; GitHub Actions is the execution authority.
- CI source/unit, package reproducibility, Firefox responsive and Chromium native-origin: pending this branch's workflow run.
- Existing CI audio capture issue remains separate from this storage/resource stage. Actual product playback was user-confirmed; do not interpret the known non-silent output capture mismatch as an IndexedDB failure.

## Rollback and next work

Rollback by reverting the test, workflow/package registration, this report and status-file references. No product source rollback is required. After CI acceptance, next focus can be targeted contracts for script_031/script_039/script_041 external-source/cache behavior; do not broaden into a generic storage rewrite.
