# V82.85.19 AMQ valid-anime-ID module contract

Date: 2026-10-18
Parent accepted checkpoint: V82.85.18 modularization closeout matrix, commit `56809fd619c99eca7073db88a4aba6493e5d0dfd`.
Scope: test-only. No product source, module source, manifest, CSS, or product HTML change.

## Finding

The V82.85.18 closeout matrix referenced `tests/unit/amq_valid_anime_ids_contract.test.cjs`, but a recursive GitHub tree check showed that this test file did not exist. This is a real evidence gap: `src/modules/amq_valid_anime_ids.htmlpart` contains the pure `validAnimeIds` helper, but no dedicated direct contract test was present in the current source tree.

## Change

- Added `tests/unit/amq_valid_anime_ids_contract.test.cjs`.
- Assertions cover module registration, exact manifest byte length/SHA-256, one host insertion marker, stringification of numeric IDs, deduplication across number/string aliases, filtering unknown IDs, preservation of first-seen order, non-string input coercion, empty input, and explicit errors for non-array input.
- Added the test to the V82.85.4 engineering acceptance workflow.
- Strengthened `tests/unit/modularization_closeout_matrix_contract.py` so every module evidence reference beginning with `tests/` must resolve to an existing file. This prevents a future matrix from claiming a nonexistent test.

## Validation

- GitHub Actions: pending at report creation.
- Local execution: not run in this environment.
- Expected behavior remains byte-identical; the module implementation is not changed.
- Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

## Rollback

Revert the V82.85.19 test/workflow/documentation changes or return to parent commit `56809fd619c99eca7073db88a4aba6493e5d0dfd`.

## Next task

Continue module-by-module test evidence reconciliation. After every module evidence path resolves and direct contracts are present where behavior is non-trivial, audit `script_004` remaining lifecycle and global/DOM dependencies before any further production extraction.
