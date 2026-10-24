# Stage 34 — Candidate261 Dedicated Song-Batch Route

Date: 2026-10-24

## Baseline verification
Candidate260 was materialized and its SHA-256 recomputed: `a19be956afdf10b50dc15bbc10b3c69408e42c8751a838fb8e61313d0d98ed1f` (PASS). Candidate260 and rollback files were not overwritten.

## Root cause and change
The visible song-batch entry reused `data-c99-action="vndb"`, while the legacy `runAction('vndb')` opens the VNDB importer. Candidate260 depended on a capture listener to reinterpret the shared action; when that listener returned early because the Song Select route was not active, the event could fall through to the importer. Candidate261 assigns the song-batch entry a dedicated `song-batch` action and migrates the legacy action before the active-route guard. It routes to the existing `batch-songs` renderer. Import remains connected to the separate import action and shared import renderer.

## Artifact
- File: `amq_learning_tool_v82_85_75_candidate261_dedicated_song_batch_route_20261024.html`
- Version: `v82.85.75-candidate261-dedicated-song-batch-route-20261024`
- Size: 9,358,614 bytes
- SHA-256: `b1e1e25bbf6125fd9b7a075a962f91e5cc9a01a30d67b5da1bc37361e092d77d`
- Parent Candidate260 SHA-256: `a19be956afdf10b50dc15bbc10b3c69408e42c8751a838fb8e61313d0d98ed1f`
- Candidate261 is not an accepted baseline.

## Tests
- PASS: 67 executable inline JavaScript blocks checked with `node --check`; zero syntax errors.
- PASS: 110 CSS blocks parsed with `tinycss2`; zero parse errors.
- PASS: 273 HTML start-tag IDs; zero duplicates.
- PASS: static routing invariants for dedicated identifier, migration before route guard, independent batch renderer, and import-only handler.
- BLOCKED: native browser click acceptance. Chromium headless attempts timed out and produced no DOM output.
- BLOCKED: Candidate261 HTML upload and remote SHA-256 readback. The candidate file is not in this branch.
- NOT RUN: real AniList/MAL/VNDB API, data persistence, and source-limited removal tests.

## GitHub and rollback
Created branch `amq-candidate261-dedicated-song-batch-route-20261024` from the Candidate260 branch. Updated `CURRENT_STATUS.md`, `BASELINE.md`, and `NEXT_TASK.md` to document the local candidate and blockers. Candidate260 HTML path under the expected `dist/` path and root-level path both returned 404 in prior checks; no remote HTML presence or SHA match is claimed. Rollback to the unchanged Candidate260 file by reopening its exact SHA-listed artifact.

## Next
Run native browser route clicks and workspace-switching acceptance, then complete remaining Batch 3 tests and resolve large-file upload/remote hash verification. Do not start Batch 4.
