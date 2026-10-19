# Baseline checkpoint: V82.85.32 Chinese-title loader cache contract

- Branch: `v82.85.32-chinese-title-loader-contract-01`.
- Parent accepted checkpoint: `v82.85.31-scene-background-lifecycle-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product `src/scripts/script_031.htmlpart` unchanged, reviewed blob `ca426049f341ffbac03783f5a49d59ca9d9c8f8d`.
- Corrected CI [39239470902](https://github.com/murorachi/Amq-/actions/runs/39239470902): Chinese-title 20/20, SRS 17/17, scene-background 18/18, source/unit, package contract/reproducibility and Firefox responsive passed. Package: 406 entries, repeated SHA-256 `2bb266f79ef44d41d4bd9d9d25c487eb88d7dac891894450f8b8350d68f25795`. Deterministic build passed.
- Chromium native-origin failed only at known final audio monitor capture (peak=0, rms=0); preceding storage/custom-list, IndexedDB/input, suggestion, quiz playback and multiplayer lifecycle checks passed. Actual playback was user-confirmed; manual interactive acceptance was not performed.
- Rollback: revert the test, workflow/package registration, report and status references. No product-source rollback is required.
