# Next task

Current checkpoint: **V82.86.03 quiz lifecycle ownership audit**. Branch `v82.86.03-quiz-lifecycle-ownership-01`. Parent `5ed5249c7f6f3865a2ab518c87a55d8ffb4ff793`.

## Deliverables
- `reports/V82_86_03_QUIZ_LIFECYCLE_OWNERSHIP_01.md`: state, DOM, timers/listeners and limits.
- `tests/unit/quiz_lifecycle_ownership_contract.test.cjs`: source-level lifecycle invariants.
- `tests/browser/quiz_answer_playback_lifecycle.py`: exit-during-countdown, stale callback and re-entry checks.
- Engineering workflow runs the new contract and browser suites.

## Acceptance gate
Wait for source/unit and browser-native-origin jobs. If either fails, record the actual assertion and fix before closing tasks.

## Next bounded work
1. After CI passes, update AMQ-TODO-001, 002 and 004 based on evidence.
2. Close AMQ-TODO-003 only if exit/countdown/re-entry passes.
3. Then resolve high-risk cross-fragment dependency owners. No broad cleanup/refactor yet.

## Rollback
Revert this report, test, workflow and documentation commit. Product rollback is not required.
