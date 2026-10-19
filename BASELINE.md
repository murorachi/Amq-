# Baseline checkpoint: V82.85.31 scene-background lifecycle contract

- Branch: `v82.85.31-scene-background-lifecycle-contract-01`.
- Parent accepted checkpoint: `v82.85.30-srs-transition-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product scene-background source `src/scripts/script_036.htmlpart` unchanged, blob `6d3690052c2fa049f9189faad6d0753ef91b4fa1`.
- SRS characterization accepted at run [39237555930](https://github.com/murorachi/Amq-/actions/runs/39237555930): 17/17 SRS cases, source/unit, deterministic package and Firefox passed; native-origin failed only at the known final audio monitor capture assertion.
- This stage adds `tests/unit/scene_background_lifecycle_contract.test.cjs` (18 cases), workflow registration, package requirements and `reports/V82_85_31_SCENE_BACKGROUND_LIFECYCLE_CONTRACT_01.md`.
- Local test execution was not run. Inspect the newest CI run before acceptance.
- Rollback: revert the scene-background test, workflow/package registration, report and status references. No product-source rollback is required.
