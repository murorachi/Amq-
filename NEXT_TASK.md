# Next task: finish bounded historical debt and deduplication acceptance

Current branch: `v82.85.35-selected-list-validation-dedup-01`.

## Current checkpoint

- Parent: `v82.85.34-vndb-navigation-contract-01`.
- Product runtime source is unchanged in this documentation checkpoint.
- The stage report is `reports/V82_85_35_HISTORICAL_DEBT_DEDUP_CHECKPOINT_01.md`.
- Immutable V82.82 product baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Ordered acceptance work

1. Inspect the workflow run triggered by this branch's push.
2. Confirm source/unit, all focused dedup contracts, VNDB navigation contract (15 cases), package completeness/reproducibility, source verifier and deterministic build.
3. Confirm Firefox responsive acceptance.
4. Report Chromium native-origin steps individually. The known final audio-monitor capture failure is not a pass; if it remains the only failure and all preceding lifecycle checks pass, record it as an environment limitation rather than reopening unrelated product audio code.
5. If no new regression appears, close this bounded historical-debt/deduplication phase. Do not pursue a zero-debt claim or broaden into UI/lifecycle rewrites.
6. If a genuine failure appears, fix only that failure and rerun the affected contract plus relevant regression checks.

## Deferred candidate

AMQ and EMQ custom-list renderers have similar markup, but differ in list schema, summary text, invalid-setting flags and persistent fault keys. Do not unify them just to reduce line count. Reconsider only if a focused test demonstrates a worthwhile common behavior boundary.

## Rollback

Revert the V82.85.35 report and status-document changes to return to V82.85.34. Earlier deduplication commits are independent checkpoints; keep V82.82 immutable.
