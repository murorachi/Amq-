# V82.85.22 multiplayer helper deduplication

## Baseline

- Branch: `v82.85.22-historical-debt-dedup-01`
- Base commit: `7af202f0c7dbe8e28b71b92ba8afd718543383a1`
- Immutable V82.82 product: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Previous pinned candidate: V82.85.12, 8,787,574 bytes, SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

## Why this candidate

Three exact declarations in `src/scripts/script_028.htmlpart` perform the same operation. They occur in `readRoomFiltersFromUi`, `createSettings`, and `configureFromUi`, and all close over the same IIFE-level `view` element.

## Change

Moved one copy to shared IIFE scope immediately after `view` initialization and removed the other two local declarations. All `checked(selector)` call sites remain unchanged. No storage keys, UI markup, filter order, numeric conversion, room protocol or audio behavior was intentionally changed.

Added a focused Node contract and CI step. Improved failed fragment/module fingerprint diagnostics in `tools/verify.py`.

## Fingerprints

- Changed fragment: 139,955 bytes / SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`.
- Candidate V82.85.22: 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Manifest pins updated; clean CI acceptance remains pending.

## Acceptance

Source/unit, deterministic build, package reproducibility, Firefox and native-origin results must be recorded separately. The known real-audio capture failure remains open and unrelated to this refactor.

## Rollback

Restore the three local declarations and original manifest row, remove the contract test/workflow step and revert verifier/report/status updates. Keep V82.82 immutable.
