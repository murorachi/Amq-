# Candidate212 MAL Import Status Ambiguity Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: reconstructed Candidate212 with a mocked Jikan-edge response and in-memory storage. No source HTML modified.

## Baseline reproduction

Mock response contains two anime entries:
1. Naruto (MAL ID 20) has only a top-level `status: "completed"`, with no user-list-specific `listStatus` field.
2. One Piece (MAL ID 21) has top-level `status: "completed"` and explicit `listStatus: "watching"`.

The importer comment explicitly warns that top-level `status` may describe anime airing status rather than the user's list status. Nevertheless, `getMALListStatus()` falls back to `entry.status` and maps it to the user's `completed` status.

Baseline results:
- PASS: explicit `listStatus: "watching"` correctly maps One Piece to `current`.
- FAIL: ambiguous top-level `status: "completed"` overwrites Naruto's pre-existing manual `planning` status with MAL `completed`.
- PASS: no uncaught page errors.

## Disposable prototype fix

Removed the ambiguous top-level `status` field from the fallback key list. The importer still accepts explicit user-list fields (`listStatus`, `list_status`, `myListStatus`, `watchStatus`, etc.) and leaves a record unchanged when no user-list status can be reliably identified.

Prototype results:
- PASS: explicit listStatus still maps One Piece to `current`.
- PASS: Naruto's ambiguous top-level airing status is not imported; its existing manual `planning` status remains unchanged.
- PASS: the import report records one known status and one unrecognized status instead of silently corrupting the manual record.
- PASS: no uncaught page errors.

## Production acceptance requirement

After byte-preserving Candidate212 access is restored, apply the narrow fallback removal and test representative actual jikan-edge response payloads. Do not use ambiguous anime airing state as a user watch status. Keep source precedence and conflict policy explicit, and test duplicate IDs/pages before accepting a full import.

## Scope limits

The response is mocked; no live MAL/Jikan-edge request was made. The source reconstruction is 26 bytes shorter than the recorded baseline, so no candidate or release source was modified.