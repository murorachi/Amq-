# CURRENT_STATUS.md

Updated: 2026-10-26 (Candidate366, Song Select cleanup converged)

## Current state
- Formal baseline: Candidate302, immutable. Recorded SHA-256 f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd. Original HTML is unavailable locally for a fresh hash.
- Latest experimental candidate: Candidate366, not promoted.
- Candidate366: amq_learning_tool_v82_86_77_candidate366_finalize_songselect_song_only_view_20261026.html, 1,608,200 bytes, SHA-256 38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d.
- Last known passing rollback: Candidate364, 1,609,811 bytes, SHA-256 88fd4422dcf8ed1782e2090da89a67b9802ec216aa853f5a5e4b7c24570be449.
- Candidate365 is rejected: fixture browser test found a runtime ReferenceError, “view is not defined”. Candidate366 removes the final stale guard and passes the same probe.
- Candidate361 was an abandoned diagnostic variant and is not part of the Candidate362→366 parent chain.

## Candidate366 changes
- Removed the retired Candidate137 work-view/toggle branch and Candidate210's create-then-remove lifecycle. The current song-first list remains.
- Removed Candidate72's redundant curved-frame observer and inline display writes; kept the arc element and CSS visibility rules.
- Removed the old Song Select Back button and duplicate scene-background quick-open shortcut.
- Removed the unreachable legacy workspace-dock click handler; visible C99 rail remains.
- Candidate106 now owns a two-row search/filter layout across desktop and mobile. The C99 mobile rail fits four actions at 320px.
- Candidate115 artwork for non-primary AMQ/EMQ inline lists remains KEEP.

## Verification
- Static PASS: 63 executable inline JS blocks, 0 syntax errors; 87 style blocks, 0 CSS parse errors; 3,396 qualified rules / 11,341 declarations; 245 IDs, 0 duplicates.
- Fixture-backed Chromium PASS: 16/16 tests, 0 uncaught JS exceptions. Includes route entry/exit, 3 fixture works/4 songs, row selection, search/clear, AMQ/EMQ/MIX, single dock, removed legacy controls, desktop and 390px mobile layout.
- 320px probe PASS: all six filters are aligned in one row; all four C99 rail entries fit inside the viewport; document width remains 320px; 0 uncaught JS exceptions.
- Real data.js/catalog integration, real audio, persistent real storage and full E2E: NOT RUN. The working directory lacks data.js and direct file:// / localhost navigation is blocked in this execution environment. Fixture tests do not prove real-data acceptance.
- GitHub docs readback can be verified; Candidate366 HTML upload and remote SHA-256 readback remain NOT VERIFIED.
- Formal release: NOT READY until one real-data acceptance pass and remote HTML verification are complete.

## Key artifacts
- Candidate366 final candidate and Candidate364 known-good rollback.
- Candidate366 static report, fixture browser report, source cleanup report, final residue scan and consolidated acceptance checklist.
- Song Select owner map updated through Candidate366.

## Next action
Run one consolidated Candidate366 browser acceptance against the real data/audio environment. If it passes, perform final release packaging and verify the exact remote HTML bytes and SHA-256. Do not ask for per-candidate testing.
