# V82.69 automated checks summary

Execution date: 2026-10-18 (Asia/Taipei)

## Unit/contract suites
- Candidate policy: 70 passed, 0 failed.
- Candidate pool integration: 27 passed, 0 failed.
- EMQ API/list contract: 19 passed, 0 failed.
- History/status isolation: 7 passed, 0 failed.
- Storage repository: 9 passed, 0 failed.
- Full-backup manifest/allowlist: 6 passed, 0 failed.
- Multiplayer session/reconnect: 7 passed, 0 failed.
- Solo EMQ list handoff: 4 passed, 0 failed.
- Answer-flow contract: 8 passed, 0 failed.
- Total: **157 assertions passed, 0 failed**.

## Build/integrity
- One-command runner: 11 commands passed, 0 failed.
- Integrity verifier: 103 checks passed, 0 failed.
- Two independent builds produced identical bytes.
- Built HTML and immutable V82.65 baseline: 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.

## Browser acceptance
- A constrained Chromium run against the same byte-identical HTML passed 19 assertions for home/practice/quiz navigation, answer lock before playback, unplayed skip/history behavior, next-question transition, solo EMQ list handoff, EMQ API readiness and absence of uncaught page errors.
- A later rerun failed with Playwright driver `EPIPE` before producing a final assertion summary. This failure is recorded and is not counted as a pass.
- Direct `file://` navigation failed with `ERR_BLOCKED_BY_ADMINISTRATOR`.
- The successful smoke used an opaque origin, in-memory storage, disabled IndexedDB and blocked external HTTP(S). It is UI smoke, not persistence/audio/network/multiplayer acceptance.
