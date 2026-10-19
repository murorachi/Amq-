# V82.85.18 checkpoint package completeness and reproducibility

- Date: 2026-10-19
- Branch: `v82.85.18-source-inventory-gate-01`
- Base: user-designated commit `715e7a6d734a487a21f8c866093431edd2f4938d`
- Scope: engineering package tooling and acceptance only; no product HTML, runtime logic, CSS, or source manifest changes.

## Findings

1. `tools/package_checkpoint.py` still defaulted to `AMQ_V82_84_SOURCE_SYNC_AND_ACCEPTANCE_GATE_AUDIT_01.zip`, which was stale for the current checkpoint.
2. The packager collected files broadly but did not assert that key build, verification, status, test, workflow, and report files were present in the final ZIP.
3. The package format already used sorted paths, fixed timestamps, stable compression settings, and CRC/duplicate-entry checks; these were retained.

## Changes

- Renamed the default package output to `AMQ_V82_85_18_SOURCE_INVENTORY_GATE_01.zip`.
- Added an explicit required-file set covering `BASELINE.md`, `CURRENT_STATUS.md`, `NEXT_TASK.md`, the engineering workflow, build/verify/package tools, the source-inventory contract, and its report.
- Added a clear preflight failure when required files are absent, and a second check against the completed ZIP entries.
- Added `tests/unit/package_checkpoint_contract.py` with four focused checks for required-file completeness, sorted missing-path reporting, current naming, and required reproducibility/acceptance files.
- CI builds the package twice, compares SHA-256 values, validates the package and sidecar, and uploads the ZIP plus checksum as a workflow artifact.

## Test and acceptance evidence

GitHub Actions run [39193720849](https://github.com/murorachi/Amq-/actions/runs/39193720849):

- Source/unit job: **PASS**, 132 integrity/build checks passed.
- Reverse source-inventory contract: **PASS**.
- Package completeness contract: **PASS**, four test cases.
- Existing runner configuration contract and source/unit contracts: **PASS**.
- Deterministic V82.82 build/fingerprint verification: **PASS**.
- Package A and package B: both **14,635,418 bytes**, 361 entries / 361 unique, CRC PASS, required files PASS.
- Both package SHA-256 values matched. The exact digest is held in the external `.zip.sha256` sidecar bundled with the workflow artifact, not repeated inside the package report, avoiding a self-referential package hash.
- Package plus sidecar uploaded as artifact `AMQ_V82_85_18_SOURCE_INVENTORY_GATE_01`.
- Firefox responsive: still running at last inspection; no result claimed here.
- Browser-native-origin: still running at last inspection; no claim that its remaining lifecycle/audio/multiplayer steps passed.
- Local execution: **NOT RUN** in this environment.

The standalone product HTML was not modified. The current candidate build remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`; immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Risk and rollback

The required-file set is intentionally explicit and must be updated when the checkpoint's minimum handoff contract changes. The module/source inventory gate still only covers files directly under `src/modules/`. Revert the package tool, focused test, workflow changes, and this report together if required. Never overwrite immutable V82.82.
