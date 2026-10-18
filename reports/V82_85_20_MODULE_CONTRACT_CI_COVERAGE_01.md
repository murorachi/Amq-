# V82.85.20 Module Contract CI Coverage

Date: 2026-10-18
Parent checkpoint: V82.85.19 AMQ valid-anime-ID module contract, commit `443b380186504950de23cdaf413419388748f021`.
Scope: test orchestration and workflow only; no product/runtime source, CSS, manifest or HTML change.

## Finding

The current closeout matrix lists existing unit contract files for all 13 source modules, but the main engineering workflow explicitly executed only a subset. Some module contracts had passed in earlier extraction checkpoints, but they were not all part of the current recurring CI gate.

## Change

- Added `tests/unit/run_module_contracts.py`, which reads the closeout matrix, requires exactly 13 module rows, checks every referenced evidence file exists, requires at least one `tests/unit/*.test.cjs` contract per module, and runs the unique Node tests in sorted order with fail-fast behavior.
- Browser evidence paths are checked for existence but are delegated to the browser workflow.
- Updated the main engineering workflow to invoke the matrix-driven runner and removed redundant explicit invocations for module tests now executed by the runner.

## Validation (ACCEPTED)

- GitHub Actions run 39141098175 passed both source-and-unit and browser-native-origin jobs: https://github.com/murorachi/Amq-/actions/runs/39141098175.
- The matrix-driven runner executed all 16 unique Node contract test files referenced by the 13 module rows; all passed. The browser integration evidence path was also covered by the browser job.
- Enabling the full suite exposed stale contracts, which were corrected rather than skipped: the anime/song DB test now restores both the database initializer and near-number module to reconstruct the pre-extraction script byte-for-byte; the EMQ handoff test now reads list membership helpers from their extracted module; TypeScript parser consumers now load a pinned TypeScript 5.8.3 dependency without an absolute machine-specific path.
- The locked product build remained byte-identical at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
- Local execution: not run in this environment; acceptance ran in GitHub Actions.

## Rollback

Revert the V82.85.20 runner/workflow/documentation commit or return to parent commit `443b380186504950de23cdaf413419388748f021`.

## Next task

After the matrix-driven module contracts pass, inspect existing `script_004` boundary evidence and choose the next narrowly scoped action based on an actual uncovered dependency or a demonstrably safe extraction. Avoid broad rewrites.
