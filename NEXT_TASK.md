# NEXT TASK — Candidate 203: finish custom-list UI integration and stage-2 regression

1. Preserve Candidate 178 as recovery baseline and all candidate artifacts unchanged.
2. Candidate 203 keeps the four visible C99 workspace actions inside Song Select and intercepts legacy navigation into shared panels. The old dock remains hidden and is not the actual workspace entry point.
3. Verify real row click behavior for custom-list add/remove in a native/approved browser context. The current set_content harness could verify the adapter but did not verify row-click dispatch; do not mark that test PASS.
4. Test create, duplicate rejection, rename, delete, filter members, add work, remove work, and rerender through the existing UI. Verify the work ID saved in `aniCustomPracticeListsV1` and that no learning/watch-status data is changed.
5. Adapt recovered Candidate 82 workbench tests to current requirements: remove obsolete batch and separate analysis workspace expectations; use the four visible C99 actions (AniList/MAL, VNDB, custom lists, learning plan) and shared-panel routing.
6. Build the 26 unique regression checks from the recovered Candidate 120 stage-2 and persistence/workspace reports; explicitly mark real reload persistence, live APIs, real audio, and pixel comparison as blocked/not-run until tested.
7. Run mocked AniList/MAL and VNDB success/empty/error/retry tests; then use a network-enabled approved browser for live import checks.
8. Verify cover fallback/retry, audio play/pause/previous/next/mode, AMQ/EMQ/MIX switching, keyboard Enter, blacklisting, tags, learning state, and multiplayer lifecycle.
9. Complete 2555x1438 screenshot geometry/pixel comparison using the existing reference image; include 7.5 visible rows, bottom half-row, hover/selected offsets, rail/panel, right details and player geometry.
10. Only after tests pass, upload final HTML and required source/build/test files to GitHub; read back remote artifact and compare version, size and SHA-256.
