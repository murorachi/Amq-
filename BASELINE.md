# Baseline checkpoint: V82.85.22 historical debt and dedup

- Branch: `v82.85.22-historical-debt-dedup-01`.
- Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Candidate V82.85.22: 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Updated `script_028.htmlpart`: 139,955 bytes / SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`.
- Three identical `checked(selector)` declarations consolidated into one; focused contract passed 7/7.
- CI run [39196582296](https://github.com/murorachi/Amq-/actions/runs/39196582296): verifier 132/132; package reproducibility passed with two 14,640,473-byte archives at SHA-256 `65174354609f5eec49e41bda558c4dee093611f60c29a710b2628899db6368e3`; Firefox responsive passed.
- Native-origin storage, custom lists, IndexedDB/input, suggestions, quiz lifecycle and multiplayer lifecycle passed. Real-audio output capture failed (`peak=0, rms=0.0`); full browser acceptance is not passed.
- Historical debt ranking: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.

## Scope rule

Deduplicate only byte-identical helpers with identical dependencies and a clear maintenance benefit. Keep the audio output assertion and do not claim full acceptance while it fails.

## Rollback

Restore the original three helpers, fragment/release pins, package names and workflow artifact paths. V82.82 remains immutable.
