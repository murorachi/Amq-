# Current engineering checkpoint: V82.85.19 duplicate-candidate decision

- Base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.
- Working branch: `v82.85.18-source-inventory-gate-01`.
- Latest inspected head before this decision: `3de5cd822048c477a5e65ece27b21ca0262e771a`.
- Previous bounded stages: reverse source inventory guard and package completeness/reproducibility guard.
- Latest package/source-unit acceptance: [GitHub Actions run 39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298). Source/unit passed (132 checks); Firefox responsive passed. Browser-native-origin was still running at last inspection, so full browser acceptance is not claimed.
- Package artifact and external checksum are published under `AMQ_V82_85_18_SOURCE_INVENTORY_GATE_01`.
- Current bounded cleanup: inspected two `norm` helpers in `src/scripts/script_004.htmlpart`; their character classes and behavior differ. The candidate was rejected as unsafe to deduplicate. Report: `reports/V82_85_19_DUPLICATE_CANDIDATE_DECISION_01.md`.
- Product source, manifest, generated HTML, runtime behavior and CSS were not changed in this stage.
- Local tests for this documentation-only decision: not run; no production change was made.
- Product candidate fingerprint remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`; immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Direction

The current duplicate candidate was rejected because normalization behavior is observably different. Stop this cleanup stage without changing production code. Resume feature work or select a new candidate only when a concrete change justifies the verification cost. Do not expand into bulk deduplication.

## Rollback

Revert the duplicate-candidate report and this documentation update if needed. No production rollback is required. Never overwrite immutable V82.82.
