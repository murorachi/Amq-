# V82.85.22 History/SRS Boundary Audit and Test-First Candidate

Date: 2026-10-18
Parent accepted checkpoint: V82.85.21 script_004 boundary decision, commit `678cb6d0d2b40fa4536740047e657ae2edc746ac`.
Scope: audit plus a test-first contract. No production source/module/CSS/manifest/HTML change in this checkpoint.

## Inventory findings

| Fragment | Current size | Function declarations (simple scan) | localStorage calls | listeners | timers | Exports |
|---|---:|---:|---:|---:|---:|---:|
| `script_020.htmlpart` | 36,104 bytes | 55 | 5 | 14 | 5 | 4 |
| `script_023.htmlpart` | 42,137 bytes | 23 | 14 | 8 | 9 | 10 |

These counts are lexical scans, not a complete call graph. The AST dependency summary and V82.81 history/SRS boundary table are the more useful existing references.

## Boundary decisions

### script_020: SRS scheduler

- Keep `emptyStore`, `loadStore`, `persist` and `quarantine` coupled to storage recovery behavior. They own the `aniSrsScheduleV1` key and `aniSrsScheduleRecoveryV1_` recovery copies; failures intentionally block writes to protect existing data.
- Keep FSRS state transitions (`initMemory`, `updateMemory`, `applyRatingToCard`, `rate`, `finishRating`) together until state transition and time-injection contracts exist.
- **Candidate for a test-first extraction:** `isValidSchedule(x)`. It validates the persisted schema and card invariants and reads only the local `validStates` set plus standard language primitives. It does not write storage, touch DOM, call APIs, or own lifecycle. This checkpoint adds a direct contract against the existing source; extraction is deferred to a subsequent checkpoint so the behavior contract is established first.
- Other formatting helpers are either trivial or depend on scheduler state (`intervalDays`, `gradePreviewLabel`, `buttonLabelForSong`).

### script_023: history/SRS insights and backup restore

- `statsForHistory`, `reviewCandidates`, `weaknessEvidenceStatus` and `renderLearningInsights` mix history data, profile state and display models. No extraction is authorized without a stable input/output contract.
- `exportFullBackup`, `validateFullBackupStorageSnapshot`, `fullRestore` and `mergeLegacyBackup` are high-risk storage/backup boundaries. Preserve allowlisted keys, migration semantics, unknown-key rejection and rollback behavior.
- `scheduleDashboardInsightsRefreshV82` and visibility refresh logic own timers/lifecycle and should remain coupled until cancellation/reconnect behavior is explicitly tested.

## Test-first contract

Added `tests/unit/srs_schedule_validation_contract.test.cjs`. It runs against the current inline function today and is designed to switch to the extracted module after a future manifest entry appears. Cases cover valid/invalid schedule envelopes, numeric boundaries, card identity/state/timestamps/counters, stability/difficulty and review-log shape. The main engineering workflow now runs this contract.

## Validation status

- GitHub Actions: pending at report creation.
- Local execution: not run in this environment.
- Product baseline remains V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
- No production source change made.

## Rollback

Revert the V82.85.22 audit/test/workflow/documentation commit or return to parent commit `678cb6d0d2b40fa4536740047e657ae2edc746ac`.

## Next task

If the direct SRS validation contract passes, extract only `isValidSchedule` into a module inserted at its original position in `script_020`, preserving the assembled product HTML byte-for-byte. Do not move storage recovery or FSRS state transitions in the same change.
