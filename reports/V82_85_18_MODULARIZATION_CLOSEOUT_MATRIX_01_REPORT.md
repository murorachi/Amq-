# V82.85.18 Modularization Closeout Matrix (NOT CLOSED)

Date: 2026-10-18
Parent checkpoint: V82.85.17 package audit, accepted in GitHub Actions run 39138953742.
Product lock: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. Immutable V82.65 baseline remains 8,786,930 bytes / SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Purpose

Reconcile the current manifest inventory with older progress reports and explicitly separate physical source splitting from semantic modularization. This is an engineering inventory and decision register, not a completion claim.

## Inventory reconciliation

- `reports/FRAGMENT_MANIFEST.json`: 91 fragments total, 41 script/data fragments and 50 CSS fragments.
- Current manifest source modules: 13, hosted in 5 script fragments: `script_001`, `script_004`, `script_025`, `script_027`, and `script_040`.
- 36 script/data fragments currently have no module insertion marker. This is not automatically a defect: some are data payloads or compatibility patches, while others need explicit responsibility/dependency review.
- Older V82.79 progress reports still describe the earlier 8-module inventory. They are historical snapshots, not the current source of truth; this matrix follows the current manifest.
- Modules are inserted at their original classic-script positions. A separate source file does not imply an independently loaded ES module or full dependency isolation.

## Matrix rules

The CSV `reports/V82_85_18_MODULARIZATION_CLOSEOUT_MATRIX.csv` contains one row for every current manifest fragment and source module. Each row records its manifest path, byte count, SHA-256, available historical responsibility hint, current classification, evidence, remaining gate, and linked modules.

- `SOURCE_MODULE_EXTRACTED_NOT_FULLY_DECOUPLED`: source is separated and inserted by the builder; independence must still be judged per module.
- `PARTIAL_EXTRACTION_REMAINDER` / `PARTIAL_EXTRACTION_HIGH_RISK_REMAINDER`: some responsibilities were extracted, but the host script retains unclassified behavior.
- `DATA_ASSET_PRESERVE`: non-executable JSON or compressed payload; preserve its bytes and data/ID contract.
- `SEMANTIC_BOUNDARY_AUDIT_REQUIRED`: physical split exists but the safe module boundary is not yet established.
- `STATE_STORAGE_OR_IDENTITY_BOUNDARY_AUDIT_REQUIRED`: mutable state, storage, source identity or external API coupling needs contract-level separation.
- `ENVIRONMENT_BLOCKED_*`: the next decision requires browser/service coverage not established by the current CI environment.
- `CSS_ORDER_LOCKED_ENVIRONMENT_GATE`: all CSS fragments remain in their existing cascade order until cross-browser/cascade evidence authorizes movement.

## Evidence already available

- Source inventory completeness and deterministic build verification pass in CI.
- Contract tests cover candidate policy, quiz suggestion text/renderer/controller, candidate-pool behavior, answer metadata, custom-list validation/normalization, EMQ membership/selection and numeric tolerance.
- Chromium CI passes native-origin storage/custom-list workflows, IndexedDB/input integration, quiz suggestion integration, answer/playback lifecycle, and mocked multiplayer lifecycle.
- CSS residual review assigns dispositions to the 32 previously unresolved rows (8 parser artifacts and 24 selector ownership mappings); this does not constitute a full cross-browser CSS audit.

## Open gates, not silently waived

1. `script_004`: complete lexical and property-call resolution; global/window reads and writes; DOM writes; event listener and timer ownership; remaining settings, playback and answer-settlement responsibilities.
2. `script_020` / `script_023` / history and SRS paths: establish storage/domain/UI adapters and reload/failure contracts before moving stateful code.
3. `script_025` / `script_038` / `script_040`: prove AMQ/EMQ source-ID separation, list scope, audio eligibility and live API behavior under error conditions.
4. `script_028`: mocked multiplayer lifecycle passes, but a live server and two independent clients/reconnect failures remain untested.
5. `script_036` and storage repository: current Chromium origin checks pass; production-domain policy and full IndexedDB Blob round-trip/upgrade/quota-failure behavior are not established.
6. Real audio-provider playback remains unverified.
7. Firefox and CSS cascade comparison remain unavailable; no CSS movement is authorized.
8. Other script fragments remain individually classified as requiring boundary review rather than being assumed safe to extract.

## Acceptance

The matrix contract test verifies exact set equality with the manifest, unique paths, 41/50/13 counts, non-empty evidence/classification/gate fields, CSS order lock, module host links, and the locked V82.82 release fingerprint. CI result is pending at report creation; do not mark this checkpoint accepted until the new test and full workflow pass.

## Rollback

Revert the V82.85.18 matrix/test/workflow/documentation commit or return to parent V82.85.17 accepted checkpoint commit `3c4dc6e52d960b5e545b0e9b30a994b18b9d3249`. No product HTML, CSS, runtime source, or manifest was changed.
