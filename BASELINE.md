# Baseline checkpoint: V82.85.30 SRS transition contract

- Branch: `v82.85.30-srs-transition-contract-01`.
- Parent audit branch: `v82.85.29-source-audit-matrix-01` (91/91 first-pass source fragments reviewed; CSS assessment is static cascade inventory, not exhaustive visual equivalence).
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Production SRS source `src/scripts/script_020.htmlpart` unchanged, blob `a141a4d1e5d94fc422ddbc89d47b65eba9d166fd`.
- Added exact-source characterization: `tests/unit/srs_rating_transition_contract.test.cjs` (17 named cases), workflow registration, package requirements and `reports/V82_85_30_SRS_RATING_TRANSITION_CONTRACT_01.md`.
- CI [39237555930](https://github.com/murorachi/Amq-/actions/runs/39237555930): SRS 17/17, source/unit, package reproducibility and Firefox responsive passed. Chromium native-origin failed only at the known final audio monitor capture assertion (peak=0, rms=0); preceding native-storage, custom-list, IndexedDB/input, suggestion, quiz lifecycle and multiplayer lifecycle steps passed. Manual interactive acceptance was not performed.
- Rollback: revert the test, workflow/package registration, stage report and status-file references; no product-source rollback is required.
