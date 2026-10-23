# NEXT TASK — Candidate 193: Verify workspace lifecycle, then core data

1. Preserve Candidate 178 as recovery baseline and all candidate artifacts unchanged.
2. Candidate 193 now exposes four existing-function workspaces: 清單管理, 學習中心, 猜歌練習, 多人模式. It routes legacy watchlist/practice/explore/learningPlan/dashboard/vnList navigation into the shared panel only while Song Select is active.
3. First verify on an approved real-browser context that Song Select remains the active route during all six intercepted destinations. The set_content harness confirms interception events and panel titles, but cannot prove route state because the app's active-view state defaults to home in that harness.
4. Test panel open/switch/close, Back, Escape, backdrop if supported, focus restoration, and repeated switching. Confirm original DOM nodes restore to original parents and no event listeners/DOM nodes accumulate.
5. Then test custom-list CRUD/reload persistence; AniList/MAL and VNDB actual import, empty/error/duplicate/retry and list removal; cover retry/fallback; actual audio controls; Enter selection; and preserved learning state/tags/favorites/blacklist/multiplayer.
6. Recover the original 26-test suite and document every assertion. Run all applicable P0/P1 tests.
7. Complete fixed-resolution osu!stable screenshot geometry/pixel comparison, including 7.5 cards, bottom half-card, selected-vs-hover left shift, right-side details and player geometry.
8. Only after runtime and regression tests pass, create a uniquely named final candidate, update handoff docs/report, upload HTML and source/build/test files, read back the remote artifact, and compare version, size and SHA-256.
