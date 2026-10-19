# Next task: select one new low-risk deduplication candidate

Current checkpoint: V82.85.19 duplicate-candidate decision.
Branch: `v82.85.18-source-inventory-gate-01`.
User-designated base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.

## Completed stage

The first current-source candidate was two `norm` helpers in `src/scripts/script_004.htmlpart`. They differ in normalization character classes (one removes punctuation/symbols; the other preserves them), so they are not equivalent. Decision recorded in `reports/V82_85_19_DUPLICATE_CANDIDATE_DECISION_01.md`. No production source changed. Stage stop condition satisfied.

## Next bounded investigation

A later candidate may be the repeated local helper `g = id => document.getElementById(id)` in `script_004.htmlpart`. Before editing, verify exact enclosing scopes, all uses, declaration order, and whether promoting it would alter lexical scope or initialization behavior. It is only an investigation lead, not yet approved for consolidation.

## Stop conditions

- Inspect one candidate only.
- If the exact behavior and safe shared scope are demonstrated, add a focused contract before changing production source.
- If consolidation needs broad quiz IIFE changes or saves negligible maintenance cost, reject it and stop.
- Run focused source/unit tests and deterministic build verification only if production source is changed.
- Do not touch answer settlement, playback lifecycle, or multiplayer session behavior as generic cleanup.

## Existing acceptance evidence

The latest inspected workflow run is [39193924298](https://github.com/murorachi/Amq-/actions/runs/39193924298). Source/unit passed (132 checks) and Firefox responsive passed. Browser-native-origin was still running at last inspection; its complete result must be checked before making any full-browser acceptance claim.

## Immutable baseline and rollback

V82.82 remains immutable at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Revert only the relevant report/status/task documentation or the specific code-cleanup stage. Never overwrite the product baseline.
