# Baseline checkpoint: V82.85.29 first-pass source audit

- Branch: `v82.85.29-source-audit-matrix-01`.
- Product/source parent: `v82.85.28-next-audio-state-reset-dedup-01`.
- Audit matrix: `reports/SOURCE_BLOCK_AUDIT_MATRIX_V82_85_28.md`.
- First-pass audit: 91/91 fragments; 41/41 script fragments reviewed and 50/50 style fragments statically scanned. Initial-review queue is 0.
- CSS visual/pixel equivalence remains outside this static pass. No CSS or product runtime source changed.
- Added tests for actual embedded EMQ gzip payload and AniList JSON mapping; corrected their manifest roles. EMQ payload: 6,645 works, 16,839 songs, 8,383,856 decompressed bytes. AniList map: 9,400 entries, 9,364 unique target IDs.
- Latest completed source/unit + Firefox run: [39232821248](https://github.com/murorachi/Amq-/actions/runs/39232821248), verifier 132/132, both payload tests and Firefox responsive passed. Native-origin failed only at known non-silent audio capture; a newer audit-only run is pending final status.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Rollback: revert audit reports/matrix, the two integrity tests, workflow/package registration and manifest-role changes. No product-source rollback is required.


## SRS characterization test checkpoint

- Branch remains `v82.85.29-source-audit-matrix-01`.
- Added `tests/unit/srs_state_transition_persistence_contract.test.cjs` and its workflow step; report: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md`.
- Scope is limited to characterization of existing `script_020.htmlpart` behavior: rating/learning transitions, interval bounds, schema validation, reload preservation and storage quarantine/failure behavior.
- Production source, formula, weights and storage schema unchanged.
- CI execution pending; no pass claim until the new test is observed passing.
- Immutable V82.82 baseline unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.


## Runtime lifecycle contract checkpoint

- SRS characterization test passed 41 assertions in run [39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291); source/unit job and Firefox responsive passed. Chromium native-origin was still in progress at the last check.
- Added `tests/unit/scene_background_idb_object_url_lifecycle_contract.test.cjs` and CI step, with report `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`. Its execution is pending CI.
- Production `script_020.htmlpart` and `script_036.htmlpart` remain unchanged; this stage adds characterization tests only.
- Immutable V82.82 baseline remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
