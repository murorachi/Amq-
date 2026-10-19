# First-pass audit: script_023 backup/restore and learning insights

Baseline: V82.85.28. File: src/scripts/script_023.htmlpart. Source blob: 05f9e7bf25319cfd9890896f7b216f9a743cd0f2.

Disposition: first-pass review complete; no production source change. Backup import/export and rollback are destructive-operation boundaries and should not be simplified without failure-injection coverage.

## Static profile

- 42,137 characters; 295 lines; 23 named function declarations and 19 arrow-function declarations detected by conservative patterns.
- 8 addEventListener calls, 6 timeout calls and 21 localStorage references.
- The main backup setting key is aniQuizPlanBackupSettingsV72; most other storage names are read through shared helpers and allowlists.

## Responsibilities

1. Build learning-plan library, history-derived metrics and review candidates.
2. Start quiz/practice with focus settings and a delayed launch timer.
3. Export the full app storage snapshot after flushing history summaries.
4. Validate backup storage keys, payload shape, profile/records and version compatibility before applying.
5. Restore storage, scene-background data and related application state, with rollback on failure.
6. Merge legacy backups without blindly replacing unrelated current storage.
7. Mount learning dashboard panels and schedule insight refreshes.

## Risks and boundaries

- Full restore spans an allowlisted set of localStorage keys plus related scene/background state and application bridges. Rollback order and suppression flags must remain explicit.
- Storage validation must reject unknown or malformed records before destructive writes.
- History and target-summary flushes are required before export to avoid stale backup data.
- Legacy merge and full restore are intentionally different operations; do not collapse them into one generic importer.
- Learning insights derive from history and SRS state, so summaries can be incomplete or stale. UI metrics should not mutate the underlying history schema.

## Existing evidence reviewed

- tests/unit/backup_restore_contract.test.cjs: exact-source storage allowlist and validator contract.
- tests/unit/full_backup_restore_roundtrip_contract_v82_83.test.cjs: exact-source export/import and rollback tests using deterministic storage adapters.
- tests/unit/custom_list_source_contract.test.cjs: list membership and backup round-trip boundary.
- Browser native-storage and custom-list acceptance tests exercise the built standalone app separately from synthetic VM tests.

## Findings

| ID | Finding | Risk | Disposition |
|---|---|---|---|
| BK-01 | Full restore mutates multiple app-owned persistence domains. | Critical | Keep pre-validation and rollback behavior; no refactor without injected-failure tests. |
| BK-02 | Export flushes history summaries before serializing state. | High | Preserve ordering and verify the exported snapshot contains the flushed summary. |
| BK-03 | Full restore and legacy merge have different compatibility semantics. | High | Keep separate code paths and contracts. |
| BK-04 | Dashboard insights depend on history/SRS summary freshness. | Medium | Do not merge analytics with persistence or change source-of-truth rules during cleanup. |

## Coverage gaps and recommendation

Partially covered: quota failures in a real browser profile, interruption during every restore stage, and full round-trip with large real user datasets. Existing contracts provide a baseline but do not prove every real-profile recovery scenario. Keep the code unchanged until a concrete restore defect or testable extraction is identified.

Rollback: revert this report and its matrix/status references; no product source changed.
