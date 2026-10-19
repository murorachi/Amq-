# V82.85.30 SRS characterization contract

## Scope

- Branch: v82.85.30-srs-characterization-contract-01.
- Parent: v82.85.29-source-audit-matrix-01.
- Source under test: src/scripts/script_020.htmlpart.
- Production SRS logic and storage schema are unchanged.

## Added test

tests/unit/srs_engine_characterization_contract.test.cjs executes the real SRS fragment in a minimal VM environment with deterministic localStorage and a synthetic song/history API. It exercises the exported __aniSRSAPI without invoking UI initialization.

The contract covers:
- API version and schedule validation, including rejection of invalid retention.
- New-card grades 1-4 and their configured initial state/delay.
- Good rating learning-step progression, repetition count and review-log append.
- Invalid grade rejection without storage mutation.
- Review lapse transition into relearning, lapse increment, configured delay and review-log cap.
- Storage write failure leaving both in-memory and persisted state unchanged.
- Invalid schedule quarantine preserving original bytes in a recovery key.
- Failed quarantine blocking writes while preserving the original raw schedule.
- Due-review priority, batch-size cap and explicit exclusion in session selection.

The CI assertion count and pass/fail status are pending the V82.85.30 workflow logs; no pass is claimed from source creation alone.

## Why this is bounded

This is characterization only. It does not alter FSRS weights, interval rounding, learning steps, rating transitions, keys, recovery behavior or UI. Expected delays come from the existing configured defaults, and tests use fixed timestamps rather than wall-clock comparisons.

## Remaining limits

This is not a comparison against the upstream FSRS reference implementation. It does not prove the mathematical model is globally correct; it protects the current application's explicit transition and persistence contract against accidental regression. Real browser quota behavior and complete backup/restore with large user data remain separate checks.

## Rollback

Revert this test, workflow/package registration and report. No product source change is required.
