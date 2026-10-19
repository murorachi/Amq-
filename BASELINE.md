# Baseline checkpoint: V82.85.34 VNDB navigation contract

- Branch: `v82.85.34-vndb-navigation-contract-01`.
- Parent accepted checkpoint: `v82.85.33-emq-title-cache-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product `src/scripts/script_039.htmlpart` unchanged, reviewed blob `5044121904e20eb1ee6e66546213dcc8f02260ac`.
- Parent corrected CI [39240538829](https://github.com/murorachi/Amq-/actions/runs/39240538829): EMQ Chinese-title 19/19, loader 20/20, SRS 17/17, scene-background 18/18, source/unit, package reproducibility and Firefox responsive passed; Chromium native-origin failed only at known final audio monitor capture.
- This stage adds `tests/unit/vndb_navigation_contract.test.cjs` (15 cases), workflow registration, package requirements and `reports/V82_85_34_VNDB_NAVIGATION_CONTRACT_01.md`.
- Local test execution was not run. Inspect newest branch CI before acceptance.
- Rollback: revert the test, workflow/package registration, report and status references. No product-source rollback is required.
