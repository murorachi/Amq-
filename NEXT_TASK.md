# Next task: verify V82.85.22 dedup candidate and continue bounded debt review

Current branch: `v82.85.22-historical-debt-dedup-01`.
Base commit: `7af202f0c7dbe8e28b71b92ba8afd718543383a1`.

## Current stage

- Historical technical-debt inventory refreshed; earlier AST/selector reports are explicitly treated as historical snapshots.
- Three byte-identical `checked(selector)` helpers in `script_028.htmlpart` consolidated to one shared declaration.
- Added `tests/unit/multiplayer_checked_values_dedup_contract.test.cjs` and CI integration.
- Improved mismatch diagnostics in `tools/verify.py`.
- Stage report: `reports/V82_85_22_MULTIPLAYER_HELPER_DEDUP_01.md`.

## Immediate acceptance tasks

1. Read CI output for the changed fragment's actual UTF-8 byte length and SHA-256; update `reports/FRAGMENT_MANIFEST.json`.
2. Read the deterministic build's actual output byte count and SHA-256 from the release mismatch diagnostic; update the manifest release pin.
3. Rerun CI after both fingerprints are pinned. Record source/unit, Firefox and native-origin results independently.
4. Preserve the non-silent audio PCM assertion. The earlier real-audio capture issue remains open and unrelated to this refactor.

## Following debt candidate

After this stage passes, inspect the next small duplicate candidate using current source, not historical offsets. Keep the distinct `script_004` normalization semantics. Do not broad-refactor quiz or multiplayer lifecycle code without characterization tests.

## Rollback

Restore the three local helpers and original manifest row, remove the test/workflow step and revert the diagnostic/report/status updates if needed. V82.82 remains immutable.
