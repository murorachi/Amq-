# Baseline checkpoint: V82.85.32 Chinese-title loader cache contract

- Branch: `v82.85.32-chinese-title-loader-contract-01`.
- Parent accepted checkpoint: `v82.85.31-scene-background-lifecycle-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product `src/scripts/script_031.htmlpart` unchanged, reviewed blob `ca426049f341ffbac03783f5a49d59ca9d9c8f8d`.
- Scene-background prior acceptance [39238306059](https://github.com/murorachi/Amq-/actions/runs/39238306059): scene-background 18/18, SRS 17/17, source/unit, package reproducibility and Firefox passed; Chromium native-origin failed only at known final audio monitor capture.
- This stage adds `tests/unit/chinese_title_loader_cache_contract.test.cjs` (20 cases), workflow registration, package requirements and `reports/V82_85_32_CHINESE_TITLE_LOADER_CACHE_CONTRACT_01.md`.
- Local test execution was not run. Inspect newest branch CI before acceptance.
- Rollback: revert the test, workflow/package registration, report and status references. No product-source rollback is required.
