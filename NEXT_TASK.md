# NEXT TASK — Candidate 209: real browser verification and remaining requested rebuild

1. Preserve Candidate 178 as recovery baseline; Candidate 207 and 209 are immutable checkpoints. Candidate 208 is rejected and must not be used as a source.
2. Establish a browser test path for the 9.3 MB HTML that can run beyond 45 seconds and permits persistence testing. Do not count syntax checks as UI acceptance.
3. Verify Candidate 209 top frame and search/filter behavior at 2555×1438 and 1920×1080. Confirm typing filters actual song rows and result count.
4. Verify row click and wheel selection, centered geometry, selected-row equal top/bottom width, auto-play, random seek after metadata, and no unintended playback from clicking action controls.
5. Verify inline tag, familiarity and blacklist actions against the existing data layer, including persistence after reload.
6. Complete the requested shared import workspace for AniList/MAL/VNDB without losing any importer.
7. Implement a useful batch organization workflow for song records: select visible/filter results, batch add/remove custom-list membership, familiarity, tags and blacklist, with counts and safe confirmation.
8. Diagnose and fix actual animation cover loading/fallback/retry using the existing song/work metadata. Reproduce and fix EMQ/MIX delay and hidden background modal at the root cause.
9. Rebuild the app icon with a clear white outline and internal depth as a separate visual step.
10. Compare Candidate209 screenshots against IMAGE1–IMAGE5 at fixed viewport sizes; record measured bounds and pixel differences. Fix top frame, selected card stack, bottom blue line/black region, player alignment between Back and learning-stat entry, and workspace popover design based on evidence.
11. Adapt recovered Candidate82 tests to current requirements and run a mapped 26-case regression suite, with each case PASS/FAIL/NOT RUN/BLOCKED.
12. Update report/status docs after each meaningful verified stage. Upload HTML only after meaningful review readiness, then read it back and verify exact version, size, SHA-256. Current HTML upload is NOT VERIFIED.
