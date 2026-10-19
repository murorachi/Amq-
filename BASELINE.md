# Baseline checkpoint: V82.85.19 duplicate-candidate decision

- Branch: `v82.85.18-source-inventory-gate-01`.
- User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.
- Latest package/source-unit acceptance: [GitHub Actions run 39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298): source/unit 132 checks passed; Firefox responsive passed; browser-native-origin was still running at last inspection.
- Source inventory and package completeness/reproducibility guards remain in place.
- The single candidate inspected in this stage was two `norm` helpers in `src/scripts/script_004.htmlpart`. They use different normalization character classes and have distinct behavior; consolidation was rejected. See `reports/V82_85_19_DUPLICATE_CANDIDATE_DECISION_01.md`.
- No production source, manifest, generated HTML, runtime behavior, CSS, or immutable baseline was modified by the duplicate-candidate stage.
- Product baseline remains immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Candidate HTML fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

## Scope rule

Do not deduplicate by shared name alone. Require evidence of equivalent behavior and safe call-site coverage. The current candidate did not meet that threshold, so it was retained.

## Rollback

Revert the candidate-decision report and documentation updates if needed. No product-source rollback is required. Never modify or replace immutable V82.82.
