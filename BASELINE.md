# Baseline checkpoint: V82.85.33 EMQ Chinese-title cache contract

- Branch: `v82.85.33-emq-title-cache-contract-01`.
- Parent accepted checkpoint: `v82.85.32-chinese-title-loader-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product `src/scripts/script_041.htmlpart` unchanged, reviewed blob `0c5de62e62f36d35647b67825494a92b759a7c9f`.
- Corrected CI [39240538829](https://github.com/murorachi/Amq-/actions/runs/39240538829): EMQ Chinese-title 19/19, Chinese-title loader 20/20, SRS 17/17, scene-background 18/18, source/unit, package contract/reproducibility and Firefox responsive passed. Package: 408 entries, repeated SHA-256 `75d2dd241094bb6e73d9c47f584de662fde505d5ba7f428b0a3f0ab4a5189954`. Deterministic build passed.
- Chromium native-origin failed only at known final audio monitor capture (peak=0, rms=0); preceding storage/custom-list, IndexedDB/input, suggestion, quiz playback and multiplayer lifecycle checks passed. Actual playback was user-confirmed; manual interactive acceptance was not performed.
- Rollback: revert the test, workflow/package registration, report and status references. No product-source rollback is required.
