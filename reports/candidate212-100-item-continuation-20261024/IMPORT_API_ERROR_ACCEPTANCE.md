# Candidate212 Import API Error and Timeout Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: readable reconstructed Candidate212 with mocked API routes and in-memory storage. No source file modified.

## Existing error handling tested

All requests were intercepted locally; no external API was contacted.

- PASS: AniList 429 response surfaces `Too Many Requests`, leaves import status out of loading state, and does not change watch-status storage.
- PASS: AniList invalid JSON response surfaces a recoverable import error; no uncaught page error.
- PASS: AniList network failure surfaces `Failed to fetch` and no watch-status changes.
- PASS: MAL 429, invalid response shape/JSON and offline failures produce user-visible errors; import button is re-enabled and restored to its normal label.
- PASS: VNDB 429, invalid JSON, 401 for private-list access and offline failures produce user-visible errors; import button is re-enabled and no local list is written.
- PASS: controlled local removal tests separately confirm AniList, MAL and VNDB imported data can be removed without deleting manual/unrelated records; see `IMPORT_REMOVAL_ACCEPTANCE.md`.

## Timeout gap in the existing source

Static inspection found no explicit timeout/abort wrapper in the AniList, MAL or VNDB import fetch paths. Delayed requests remain pending while the UI shows a loading state or keeps the MAL/VNDB button disabled. Catch blocks handle a rejected fetch, but they cannot handle a request that never settles by themselves.

Status: **timeout handling not implemented in the baseline importer paths**. The 0.9-second delayed-response probe only establishes that the request remained pending during that observation window; it is not a product timeout threshold.

## Disposable shared-timeout prototype

A temporary in-memory fixture added `window.__amqFetchWithTimeoutV1`, using `AbortController`, a configurable timeout and a `TimeoutError` message. The AniList GraphQL request, MAL page request, VNDB user lookup and VNDB list request were routed through the helper in the fixture only. Timeout was set to 150 ms for the test; mocked server responses were delayed by 800 ms.

- PASS: AniList request timeout aborts and shows `請求逾時`.
- PASS: MAL request timeout aborts, shows `請求逾時`, and restores its button label/enabled state.
- PASS: VNDB user lookup timeout aborts, shows `請求逾時`, and re-enables the import button.
- PASS: VNDB list-fetch timeout aborts, shows `請求逾時`, and re-enables the import button.
- PASS: zero uncaught page errors in the prototype run.

## Required production work

1. After byte-preserving Candidate212 access is restored, introduce one shared timeout-aware fetch helper for these import paths, with a documented production timeout and correct abort cleanup.
2. Ensure each paginated request receives its own timeout and that partial imports are not committed when a request fails midway.
3. Test retry behavior, API rate limits, malformed payloads, offline errors, duplicate records and persistent storage on a native persistent origin.
4. Re-run AniList/MAL/VNDB import and removal tests; do not claim live API success from mocked responses.

## Integrity limit

The readable reconstruction is 26 bytes shorter than the recorded Candidate212 baseline. All timeout changes were temporary fixture-only prototypes. No Candidate HTML was modified or uploaded.