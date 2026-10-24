# NEXT TASK — Candidate 208: verify behavior and finish osu!stable Song Select pass

1. Preserve Candidate 178 as the recovery baseline and keep Candidate 207/208 immutable.
2. Candidate 208 has only static PASS evidence. The full Playwright harness timed out with Node EPIPE; first establish a browser context that can run the 9.3 MB document without opaque-origin storage failures.
3. Verify top filter frame geometry at 2555×1438 and 1920×1080; type into the relocated search field and assert that filtered song records and result count change.
4. Verify selected-row click and wheel-centered selection, auto-play behavior, random seek after metadata, and no playback triggered by clicking a status/action button.
5. Verify dock action bar operations: heard/known/instant, tag editing, blacklist toggle, and persisted state after reload.
6. Candidate 208 changes the visible second rail action from VNDB import to batch organization. Finish the requested shared import workspace so AniList/MAL and VNDB remain accessible from one clear entry without losing either importer; do not leave VNDB import inaccessible.
7. Implement and test efficient batch operations: select visible/filter results, apply/remove learning states, add/remove selected songs to custom lists, blacklist/unblacklist, clear selection, and report counts/errors. Do not revive the old redundant batch organizer UI.
8. Fix cover display using verified existing cover APIs and actual selected-song/work metadata. Verify success, missing cover, network error, retry, and stale response cancellation.
9. Reproduce the EMQ/MIX/other control delay and hidden-background modal. Remove the works-catalog toggle and ensure every mode remains song-first, including persisted mode state.
10. Align the top black frame/search and bottom blue line/player against IMAGE1–IMAGE5 at fixed resolutions. Capture screenshots and report measured bounds/pixel differences; do not claim pixel similarity without images.
11. Adapt recovered Candidate 82 tests to current requirements and assemble the 26-case regression suite. Record PASS/FAIL/NOT RUN/BLOCKED individually.
12. Update validation report and status docs after each meaningful stage. Attempt HTML upload only when the candidate is ready for review, then fetch remote bytes/metadata and verify exact version, size, and SHA-256. GitHub HTML delivery remains NOT VERIFIED.
