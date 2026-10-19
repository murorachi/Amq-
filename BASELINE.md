# Baseline checkpoint: V82.85.22 historical debt and dedup

- Branch: `v82.85.22-historical-debt-dedup-01`.
- Immutable V82.82 product: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Previous pinned V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- Candidate after dedup, measured by the deterministic builder: V82.85.22, 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`. Manifest pin updated; clean CI verification pending.
- `script_028.htmlpart`: 139,955 bytes / SHA-256 `8dc2d503becfd765fcb3dc9d3b402c0358c10a3f636ab1aa97515ddc2ed635c4`.
- Three identical `checked(selector)` declarations consolidated to one; focused contract and CI integration added.
- Historical debt ranking: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.
- Real-audio output acceptance remains open; no audio code changed.

## Scope rule

Deduplicate only byte-identical helpers with identical dependencies and a clear maintenance benefit. Pin actual product fingerprints and do not claim acceptance before clean CI passes.

## Rollback

Restore the original helper declarations, fragment/release pins, package name and workflow paths. V82.82 remains immutable.
