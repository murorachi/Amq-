# Next task: Chinese-title loader cache and partial-source contract

Current accepted branch: `v82.85.31-scene-background-lifecycle-contract-01`.
Next stage should use a separate branch based on this checkpoint.

## Completed scene-background stage

- Added `tests/unit/scene_background_lifecycle_contract.test.cjs`: 18 exact-source cases for IndexedDB open/transaction/read success and failure, URL replacement/revocation, temporary preview cleanup, image MIME/size/dimension limits, and backup-restore source guards.
- Product `src/scripts/script_036.htmlpart` unchanged.
- CI [39238306059](https://github.com/murorachi/Amq-/actions/runs/39238306059): source/unit, scene-background 18/18, SRS 17/17, package contract/reproducibility, deterministic build and Firefox responsive passed. Chromium native-origin failed only at known final audio monitor capture (peak=0, rms=0); all preceding storage/custom-list/IndexedDB/input/suggestion/quiz/multiplayer lifecycle steps passed. Actual product playback was user-confirmed.

## Ordered next work

1. Start a separate contract stage for `src/scripts/script_031.htmlpart`: versioned IndexedDB cache, retry/abort handling, source-specific partial readiness and alias filtering.
2. Preserve pinned source revisions, cache schema/key, and existing fail-soft behavior. No live upstream freshness claim from synthetic tests.
3. Register tests in CI and the deterministic checkpoint package; report actual CI results.
4. Then consider script_041 cache precedence/alias filtering and script_039 VNDB fetch/cover retry races as separate bounded stages.

## Rollback

Revert the scene-background test, workflow/package registration, report and checkpoint-document changes. Keep V82.85.30 SRS test/report, V82.85.28 product source and immutable V82.82 unchanged.
