# Current status — Candidate 147 experiment

Candidate 147 is derived directly from Candidate 145. It changes only the distance-to-width values in `updateDistances()` from `[100,97,94,91,88,85,82,80]` to `[95.3,82,82,78,79,77,75,73]`. It makes the selected card more prominent and approximates the horizontal x-positions of the reference staircase.

- SHA-256: `85b0f97c5f6bad71e0d162b830af6964a74a170b3a63401eed1604b8ed7b64bd`; bytes: 9,268,392.
- Playwright: 22 PASS, 0 FAIL across 1648×928, 1440×900 and 1280×720.
- Static JS syntax: 60 inline blocks checked, 0 syntax errors; 5 blocks skipped as embedded data/empty/unsupported by this checker. CSS parse validation NOT RUN in this stage.
- Direct `file://` remains BLOCKED_BY_ADMINISTRATOR. The tests use `page.set_content` and an in-memory Storage shim. Durable storage, real audio, live APIs, full custom-list CRUD, and cross-workspace regression NOT RUN.
- Full-image visual metrics worsened slightly versus Candidate 145, despite improved estimated horizontal row positions. Song Select remains NOT ACCEPTED.
