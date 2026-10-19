# Next task: bounded packaging completeness audit

Current checkpoint: V82.85.18 source inventory completeness gate.
Branch: `v82.85.18-source-inventory-gate-01`.
Base commit: `715e7a6d734a487a21f8c866093431edd2f4938d`.

## First action

Inspect the GitHub Actions run triggered by this branch. Verify source/unit, browser-native-origin and Firefox jobs separately. Do not call this stage accepted until the source-inventory contract and deterministic build checks pass. The known CI audio PCM capture issue remains separately deferred.

## Next bounded task after acceptance

Audit checkpoint packaging for completeness and reproducibility:
- Check that the source package contains the expected build, test, status, baseline, and next-task files.
- Identify stale hard-coded package/artifact names that create confusing output.
- Fix only concrete omissions or misleading names with focused tests.
- Do not alter product HTML or reopen the completed historical technical-debt inventory.

## Historical technical-debt decision

The bounded inventory in `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md` is complete. Quiz lifecycle coupling, multiplayer closure size, and uncertain duplicate/compatibility entries remain tracked risks, not prerequisites. Refactor only when a concrete feature or defect touches the boundary.

## Immutable baseline and stop conditions

- V82.82 standalone HTML remains immutable: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Do not overwrite the formal baseline.
- Every stage must state its scope, sufficient tests, must-fix failures and deferred findings before work expands.
- Stop once the focused contract, relevant regression checks, and deterministic build pass.

## Rollback

Revert the source-inventory gate commits on `v82.85.18-source-inventory-gate-01` if the gate causes unrelated failures. Do not merge divergent historical branches wholesale; port only reviewed changes.
