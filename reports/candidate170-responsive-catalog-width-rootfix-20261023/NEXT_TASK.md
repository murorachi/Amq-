# NEXT_TASK.md

1. Recover the actual executable source for the historical 26-test Playwright suite. Candidate 169 ZIP contains only `TEST_REPORT.json` with 26 named results, not the test runner; Candidate 162 ZIP contains a separate scene-background test and audit scripts, not the 26-case suite. Search additional relevant branches, commits, and Actions artifacts before recreating anything.
2. Identify a valid osu!stable song-selection reference image. The currently supplied `image.png` (2555 x 1438) depicts a multiplayer ranking/score screen, not song selection, so it cannot validate song-row height/stagger or the 7.5-card cue.
3. Retry browser acceptance in an environment that permits navigation. Both `file://` and local HTTP navigation were blocked by Chromium with `ERR_BLOCKED_BY_ADMINISTRATOR` before DOMContentLoaded; no browser acceptance result exists yet.
4. Once the original test runner is recovered, run it unchanged against Candidate 170, then run the relevant regression suite. Keep the 6 focused `page.set_content` geometry checks separate from actual browser acceptance.
5. Measure song-row geometry only against the correct song-select reference. Record row start, height, stagger distance, visible card count, and bottom clipping at 2555 x 1438 and available comparison sizes.
6. Test durable storage, live APIs/audio, custom-list CRUD, and workspace routing in a permitted browser environment.
7. Keep Candidate 170 experimental until the above checks are evidenced. Candidate 169 remains the rollback checkpoint; upload the HTML only through a supported route and verify remote bytes/SHA-256.
