# First-pass audit: script_020 SRS engine

Baseline V82.85.28. File src/scripts/script_020.htmlpart. Source blob a141a4d1e5d94fc422ddbc89d47b65eba9d166fd.

Disposition: first-pass review complete; no production source change. This is a critical persistence and scheduling boundary; avoid algorithm or schema cleanup without direct characterization.

## Static profile
- 36,104 characters; 418 lines; 30 named function declarations detected by a conservative pattern.
- 14 event-listener registrations and 5 localStorage references.
- Main schedule key aniSrsScheduleV1; recovery keys use prefix aniSrsScheduleRecoveryV1_.
- The source declares FSRS-6-default+song-learning-steps-v1 and persists schedule version/state.

## Responsibilities
- Validate SRS schedule records and quarantine invalid stored data.
- Load/persist the schedule and manage recovery copies.
- Enroll songs, toggle cards, initialize difficulty/memory state and update scheduling after ratings.
- Calculate intervals, maintain review logs, select review sessions and render SRS controls.
- Synchronize per-song learning state with quiz/catalogue UI.

## Critical boundaries
- Invalid schedule data is quarantined rather than silently overwritten. Preserve recovery data and persistence-blocked behavior.
- FSRS weights, learning steps, rating transitions and interval rounding affect user review schedules. Do not reformat or simplify formulas without deterministic reference cases.
- New/learning/review/suspended states and Again/Hard/Good/Easy ratings are explicit state transitions.
- Storage writes and quiz answer integration must not create a new default schedule that erases existing records during reload/restore.
- The existing native-storage snapshot contract only validates the documented default-empty schedule initialization exception; it does not establish correctness of all scheduling formulas.

## Evidence and gaps
- tests/unit/native_storage_reload_snapshot_contract.test.cjs protects pre-existing storage across reload except the documented empty SRS initialization key.
- script_001 history and script_023 learning-insights/backup logic consume related state.
- No dedicated exact-source contract for FSRS rating transitions, learning-step progression, interval calculation or invalid-record quarantine was found in the reviewed test inventory.

## Findings
| ID | Risk | Disposition |
|---|---|---|
| SRS-01 | Schedule storage/recovery protects user learning data. | Critical: keep quarantine and recovery behavior. |
| SRS-02 | Rating and interval formulas are behaviorally significant. | Critical: add formula/state-transition tests before any refactor. |
| SRS-03 | Reload/restore can interact with empty default initialization. | High: retain native storage snapshot regression gate. |

No production source change. Next action should be a bounded SRS characterization-test plan, not a refactor. Rollback by reverting this report and matrix reference.
