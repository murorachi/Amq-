# Current engineering checkpoint: V82.85.22 historical debt and dedup

- Branch: `v82.85.22-historical-debt-dedup-01`, based on `7af202f0c7dbe8e28b71b92ba8afd718543383a1`.
- Scope: bounded historical technical-debt inventory and one exact duplicate-helper consolidation in `src/scripts/script_028.htmlpart`.
- Consolidated three identical local `checked(selector)` helpers into one shared helper after `view` initialization; call sites remain unchanged.
- Added `tests/unit/multiplayer_checked_values_dedup_contract.test.cjs`, CI integration, and more useful fingerprint mismatch diagnostics in `tools/verify.py`.
- Inventory: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`; stage report: `reports/V82_85_22_MULTIPLAYER_HELPER_DEDUP_01.md`.
- Fragment and final release fingerprints are not yet accepted; CI must report actual hashes and the manifest must be pinned before the candidate can pass.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- The prior real-audio output capture failure remains open; no audio code changed.
- Tests for this stage are pending CI; no test result is claimed as passed.

## Next direction

Pin the actual fragment and candidate hashes from CI, then rerun source/unit and browser acceptance. Continue with the next small duplicate only after this candidate is verified. Avoid broad quiz/multiplayer lifecycle refactors without focused characterization tests.

## Rollback

Restore the three local helpers and original manifest row, remove the contract test/workflow step and revert verifier/report/status changes if needed. Never overwrite V82.82.
