# VNDB cover batching and retry lifecycle contract — V82.85.29

## Scope

- Production file: `src/scripts/script_039.htmlpart`.
- Test: `tests/unit/vndb_cover_batch_retry_lifecycle_contract.test.cjs`.
- CI step: `Test VNDB cover batching and retry lifecycle`.
- Production code and live request behavior are unchanged.

## Deterministic scenarios

1. Cover detail requests are grouped into batches of at most 30 IDs.
2. Missing response records are represented as explicit no-image details and do not remain stuck in the loading set.
3. HTTP failure marks the current batch as failed, clears loading markers in `finally`, and exposes the retry control.
4. Existing loaded/loading/failed IDs are not requested again unless explicit retry clears the failed state.
5. Retry clears the failed marker, stale details and cached cover before requesting fresh data.

The test extracts production functions and mocks VNDB responses. It makes no external network request.

## Acceptance status

- Static review: the test exercises the current batching, loading/failure set and retry logic without changing production code.
- Automated execution: pending CI at report creation. Record assertion count and run ID after the focused test and source/unit job complete.
- Not covered: real API rate limiting, live VNDB response schema changes, browser image decode errors and full visual UI acceptance.

## Rollback

Remove the test and workflow step, then revert this report/status reference. No production source or immutable baseline rollback is required.
