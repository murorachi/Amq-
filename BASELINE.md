# Baseline checkpoint: V82.85.33 EMQ Chinese-title cache contract

- Branch: `v82.85.33-emq-title-cache-contract-01`.
- Parent accepted checkpoint: `v82.85.32-chinese-title-loader-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product `src/scripts/script_041.htmlpart` unchanged, reviewed blob `0c5de62e62f36d35647b67825494a92b759a7c9f`.
- Parent CI [39239470902](https://github.com/murorachi/Amq-/actions/runs/39239470902): Chinese-title 20/20, SRS 17/17, scene-background 18/18, source/unit, package reproducibility and Firefox responsive passed; Chromium native-origin failed only at known final audio monitor capture.
- This stage adds `tests/unit/emq_chinese_title_cache_contract.test.cjs` (19 cases), workflow registration, package requirements and `reports/V82_85_33_EMQ_CHINESE_TITLE_CACHE_CONTRACT_01.md`.
- Local test execution was not run. Inspect newest branch CI before acceptance.
- Rollback: revert the test, workflow/package registration, report and status references. No product-source rollback is required.
