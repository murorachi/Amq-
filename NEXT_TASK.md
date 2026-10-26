# NEXT_TASK.md

Updated: 2026-10-26 (Candidate366)

## Highest-value next task
The bounded Song Select source cleanup is converged through Candidate366. Do one consolidated real-data browser acceptance, not per-candidate testing. Use AMQ_CANDIDATE366_CONSOLIDATED_BROWSER_ACCEPTANCE_20261026.md, bound to SHA-256 38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d.

## Latest candidate
- Candidate366: amq_learning_tool_v82_86_77_candidate366_finalize_songselect_song_only_view_20261026.html
- Size: 1,608,200 bytes
- SHA-256: 38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d
- Known-good rollback Candidate364 SHA-256: 88fd4422dcf8ed1782e2090da89a67b9802ec216aa853f5a5e4b7c24570be449
- Formal baseline Candidate302 remains immutable.

## Completed source-side cleanup
1. Removed cascade-dead CSS declarations and empty rules; consolidated adjacent Song Select styles without changing rule order.
2. Integrated overflow behavior into Candidate106 and dock geometry/audio-control behavior into Candidate99; Candidate185 delegates dock layout to Candidate99.
3. Removed Candidate71's competing catalog/filter/mount geometry writes.
4. Removed the legacy Back button and duplicate scene-background quick-open shortcut.
5. Removed Candidate72's redundant curved-frame observer and inline display writes; kept the arc and CSS visibility rules.
6. Removed the unreachable legacy workspace-dock click handler.
7. Fixed Candidate106 search/filter geometry: full-width search row plus six-column filter row on desktop and mobile.
8. Fixed C99 mobile rail to fit all four entries at 320px without document overflow.
9. Removed Candidate137's retired work-view toggle/state branch and Candidate210's create-then-remove lifecycle; retained the song list, row behavior and stale singer-mode reset guard.

## Verification
- Static PASS: 63 executable inline JS blocks, 0 syntax errors; 87 style blocks, 0 CSS parse errors; 3,396 qualified rules / 11,341 declarations; 245 unique IDs.
- Fixture browser PASS: 16/16; 0 uncaught JS exceptions; desktop 1440px and mobile 390px.
- 320px probe PASS: six filters aligned; four rail entries in viewport; no horizontal document overflow; 0 uncaught JS exceptions.
- Real data/audio/persistence E2E: NOT RUN. data.js is unavailable in the working directory and browser navigation to file:// / localhost is blocked here.
- GitHub HTML upload and remote SHA-256 readback: NOT VERIFIED.

## One final acceptance
Open the exact Candidate366 file in the real data environment and complete the single consolidated checklist. Verify AMQ/EMQ/MIX source switching, search/filter, row selection, actual audio, C99 workspace entry points, return/Escape, responsive widths and persistent settings. Mark results honestly. If it passes, proceed to final package and GitHub remote byte/hash verification.

## Release blockers
- Real data.js/catalog/audio/persistence validation is pending.
- Exact Candidate366 HTML upload and remote SHA-256 readback is pending.
- Candidate365 is known-bad (“view is not defined”) and must not be used. Candidate364 is the known-good rollback.
