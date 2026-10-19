# SRS state-transition and persistence characterization — V82.85.29

## Scope

- Baseline: V82.85.28, branch `v82.85.29-source-audit-matrix-01`.
- Production file under test: `src/scripts/script_020.htmlpart`.
- New test: `tests/unit/srs_state_transition_persistence_contract.test.cjs`.
- CI workflow: `.github/workflows/v82-85-4-engineering-acceptance.yml`.
- Production source and persisted schema/formulas are unchanged.

## Test design

The test extracts the actual named functions from `script_020.htmlpart` and evaluates them in a deterministic VM with synthetic in-memory storage. It does not copy/reimplement the SRS production algorithm and does not contact the browser, network, or a live account.

The scenarios cover:
1. New-card Again: learning state, first learning step, one-minute due time, rating and review count.
2. New-card Hard: first learning step and hard-step delay.
3. New-card Good: second learning step and ten-minute due time.
4. New-card Easy: graduation to review and easy-graduation delay.
5. Review Again: relearning flag, lapse increment and relearning delay.
6. Learning Good: step-zero progression and graduation from step one.
7. Invalid rating rejection.
8. Interval minimum/maximum bounds and monotonicity with higher stability.
9. Schedule schema validation.
10. Valid schedule reload preserves card/settings data.
11. Invalid schedule quarantine copies raw bytes before removing the primary key.
12. Failed quarantine blocks writes and preserves the original raw value.
13. Failed storage read blocks writes instead of replacing data.

## Expected safety properties

- Existing FSRS weights, formulas, grade mapping, learning-step configuration and interval rounding remain untouched.
- Invalid or unreadable storage must not be silently overwritten with an empty schedule.
- Recovery must preserve the exact raw payload before the invalid primary key is removed.
- Storage failure must fail closed and must not mutate the in-memory persisted store.
- This is characterization of current behavior, not independent proof that the scheduling algorithm conforms to an external FSRS reference implementation.

## Test status

- Static review: test extracts production functions and supplies deterministic dependencies; production source was not modified.
- Automated execution: **PASS, 41 assertions** in run [39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291). The source/unit job completed successfully (132/132 source verifier checks and all unit steps including this contract); Firefox responsive also passed. At the last check, Chromium native-origin remained in progress, so the overall three-job workflow was not yet complete. The known final audio output capture assertion must be reported separately if it fails.
- Not covered: real-browser UI interactions, real browser storage quota/security behavior, randomized property testing, or independent numerical comparison against a canonical FSRS implementation.

## Rollback

Delete `tests/unit/srs_state_transition_persistence_contract.test.cjs`, remove its workflow step, and revert this report/status update. No production source or V82.82 baseline rollback is needed.
