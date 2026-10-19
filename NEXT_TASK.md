# Next task: one evidence-backed duplicate-code cleanup

Current checkpoint: V82.85.18 bounded source inventory and package completeness guards.
Branch: `v82.85.18-source-inventory-gate-01`.
Base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.

## First action

Check the latest GitHub Actions run for this branch and confirm source/unit, Firefox responsive, and browser-native-origin results separately. Source/unit acceptance for the package guard passed, including deterministic package output; do not infer that all browser lifecycle/audio/multiplayer checks passed from that result.

## Next bounded cleanup

Choose exactly one potential duplicate from current source, not from stale inventory counts. Before deletion:
1. Compare exact function bodies and execution position.
2. Check direct and dynamic call sites, global assignments, and initialization order.
3. Decide whether the apparent duplicate is a compatibility override or intentional specialization.
4. Add a focused behavior/source contract before changing production source.
5. Delete or consolidate only if equivalence and safe ownership are demonstrated; otherwise record the finding and stop.

## Stop conditions

- One candidate is either safely consolidated with a focused regression test or explicitly rejected as unsafe to remove.
- Relevant unit/source contracts and deterministic build verification pass.
- No unrelated duplicate list expansion.
- Do not touch high-risk quiz lifecycle or multiplayer closure without a concrete feature/defect that requires it.

## Completed engineering work

- Bounded historical technical-debt inventory: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.
- Source inventory completeness guard: `reports/V82_85_18_SOURCE_INVENTORY_COMPLETENESS_GATE_01.md`.
- Package completeness/reproducibility audit: `reports/V82_85_18_PACKAGE_COMPLETENESS_AUDIT_01.md`.
- Package output is no longer hard-coded to V82.84. Required handoff/build/test files are asserted and the package is built twice in CI for hash equality.
- Source package and external checksum are published as a workflow artifact under `AMQ_V82_85_18_SOURCE_INVENTORY_GATE_01`.

## Immutable baseline and rollback

V82.82 remains immutable at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Revert only the relevant stage commits if needed; do not overwrite the baseline or merge divergent historical branches wholesale.
