# Baseline checkpoint: V82.85.31 scene-background lifecycle contract

- Branch: `v82.85.31-scene-background-lifecycle-contract-01`.
- Parent accepted checkpoint: `v82.85.30-srs-transition-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product scene-background source `src/scripts/script_036.htmlpart` unchanged, blob `6d3690052c2fa049f9189faad6d0753ef91b4fa1`.
- CI [39238306059](https://github.com/murorachi/Amq-/actions/runs/39238306059): scene-background 18/18, SRS 17/17, source/unit, package contract/reproducibility and Firefox responsive passed. Package: 404 entries, repeated SHA-256 `43515ff8fbd44651cb558cb5a35c3464bc85b601fc97311d507efcdffed1296a`. Deterministic standalone build passed.
- Chromium native-origin failed only at known final audio monitor capture (peak=0, rms=0); preceding native storage/custom-list, IndexedDB/input, suggestion, quiz playback and multiplayer lifecycle checks passed. Actual playback was user-confirmed; manual interactive acceptance was not performed.
- Rollback: revert the scene-background test, workflow/package registration, report and status references. No product-source rollback is required.
