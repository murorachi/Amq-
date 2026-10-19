# Baseline checkpoint: V82.85.20 helper deduplication decision

- Branch: `v82.85.18-source-inventory-gate-01`.
- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.
- Prior source inventory and package completeness/reproducibility guards remain in place.
- The two `g = id => document.getElementById(id)` declarations in `src/scripts/script_004.htmlpart` are local to separate functions. Consolidation was rejected because it would add shared-scope coupling for negligible benefit. See `reports/V82_85_20_HELPER_DEDUP_DECISION_01.md`.
- No production source, manifest, generated HTML, UI, runtime behavior, or immutable baseline changed in this stage.
- CI run [39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298): source/unit (132 checks) and Firefox responsive passed; browser-native-origin failed only at the final audio-output capture assertion, which reported `peak=0, rms=0.0` after the test had passed native playback lifecycle assertions. The failure remains open for investigation.
- Immutable V82.82 baseline: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product candidate HTML fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

## Scope rule

Do not deduplicate by name alone. Require equivalent behavior and a meaningful maintenance or correctness benefit. Do not declare full browser acceptance while any required job fails.

## Rollback

Revert the candidate-decision report and documentation updates if needed. No product-source rollback is required. Never modify or replace immutable V82.82.
