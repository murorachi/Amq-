# Current engineering checkpoint: V82.85.22 historical debt and dedup

- Branch: `v82.85.22-historical-debt-dedup-01`; source baseline commit: `7af202f0c7dbe8e28b71b92ba8afd718543383a1`.
- Consolidated three identical local `checked(selector)` helpers in `src/scripts/script_028.htmlpart` into one IIFE-level helper after `view` initialization. Existing call sites remain unchanged.
- Added `tests/unit/multiplayer_checked_values_dedup_contract.test.cjs` and CI integration. `tools/verify.py` now prints actual byte length/SHA-256 on source fingerprint mismatches.
- Updated `script_028.htmlpart` fingerprint: 139,955 bytes, SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`.
- Candidate fingerprint from the deterministic builder diagnostic: V82.85.22, 8,787,300 bytes, SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`. Manifest pin updated; clean CI verification required.
- Package default and workflow artifact names aligned to V82.85.22; package completeness contract requires the debt inventory and dedup test/report.
- Immutable V82.82 remains 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Real-audio output capture remains a separate open issue; no audio code changed.

## Next direction

Verify the pinned V82.85.22 build, package reproducibility and helper contract in CI. Record Firefox and native-origin results independently.

## Rollback

Restore the three local helpers and original `script_028` fingerprint; restore the prior release pin, package name and workflow artifact paths; remove the test and revert verifier/docs changes. Never overwrite V82.82.
