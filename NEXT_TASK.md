# Next task: SRS state-transition and persistence characterization

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed milestone

- First-pass audit completed for all 91 registered fragments: 41 scripts and 50 styles.
- Matrix: `reports/SOURCE_BLOCK_AUDIT_MATRIX_V82_85_28.md`.
- Summary: `reports/V82_85_29_SOURCE_AUDIT_SUMMARY.md`.
- Product source/CSS was not changed. Two data-integrity tests were added for the real embedded EMQ gzip payload and AniList mapping JSON; manifest roles were corrected.
- Latest completed source/unit + Firefox run [39232821248](https://github.com/murorachi/Amq-/actions/runs/39232821248): verifier 132/132, both payload tests and Firefox responsive passed. Native-origin failed only at the known audio monitor non-silent capture assertion. Newer audit commits need final CI confirmation.

## Ordered next work

1. Add focused characterization for script_020 SRS rating transitions, learning-step progression, interval calculation and invalid-record quarantine. Do not change production formula or storage schema in the test stage.
2. Then add scene-background transaction/object-URL lifecycle coverage for script_036.
3. Then consider targeted contracts for script_031/script_039/script_041 external-source/cache behavior.
4. Only run CSS visual comparison when proposing a concrete style change; static selector duplication alone is not a reason to edit.

## Rollback

The audit milestone is documentation/tests/manifest metadata only. Keep V82.85.28 and immutable V82.82 unchanged. Any later SRS test stage should be a separate branch/commit with its own report and acceptance.
