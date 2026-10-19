# Current engineering checkpoint: V82.85.20 helper deduplication decision

- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.
- Working branch: `v82.85.18-source-inventory-gate-01`.
- Latest documentation commit before this checkpoint: `9b1e7a76766a5e5817e365a92351ddc1054a3dd8`.
- Previous bounded stages: reverse source inventory completeness guard; package completeness/reproducibility guard; rejected normalization-helper consolidation.
- Current bounded candidate: two local `g = id => document.getElementById(id)` helpers in `src/scripts/script_004.htmlpart`. They are in separate functions; moving them to a shared scope saves a negligible amount and adds unnecessary scope coupling. Consolidation rejected. Report: `reports/V82_85_20_HELPER_DEDUP_DECISION_01.md`.
- No production source, manifest, generated HTML, CSS, or runtime behavior changed in this stage.
- CI run [39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298): source/unit passed (132 checks); Firefox responsive passed; browser-native-origin failed at the final real-audio captured-output assertion (`peak=0, rms=0.0`). Other audio lifecycle assertions, quiz input/IndexedDB and multiplayer lifecycle checks passed. Full browser acceptance is not passed.
- Product candidate fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`; immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Direction

Stop generic deduplication unless a candidate has clear correctness or maintenance value. Next investigate the failing real-audio output capture assertion in isolation. Do not weaken the assertion or change production audio behavior without evidence.

## Rollback

Revert the V82.85.20 report and documentation updates if needed. No production rollback is required. Never overwrite immutable V82.82.
