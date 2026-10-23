# NEXT TASK — Song Select root composition

1. Current working file is local Candidate 171, SHA-256 `0c54a57cb359ac1549d9d4558102fc6757e5aab6fb3577d680a521384c219fed`. Candidate 170 and Candidate 169 remain preserved rollback points.
2. Candidate 171 suppresses home dashboard/discovery, quicktools/batch organization, and legacy sidebar on the Song Select route; it resets inherited left padding. Static JS syntax validation passed, but browser layout validation is NOT RUN.
3. Restore a supported browser runtime. Playwright package is installed but the Chromium executable is missing. Do not count a failed browser launch as an app test.
4. Inspect Candidate 171 at 2555×1438 and 1920×1080, 1648×928, 1440×900, 1280×720, and 900×700. Confirm hidden legacy sections, no blank-route regressions, catalog bounds, and bottom dock.
5. Compare scene structure to the user's osu!stable reference. Candidate 171 is only a root-composition cleanup, not a completed ranking overlay or pixel-match.
6. Preserve real data; do not fabricate ranking/player records.
7. Once the root layout is stable, refine selected/hovered row geometry, scroll hint, metadata, and controls.
8. Implement modal workspace panels only in a later candidate: dim background, trap focus appropriately, close with Escape/close control, and restore selected song, scroll position, and filters.
9. Then rerun custom-list CRUD/reload, imports and error recovery, audio playback, mode switching, workspace routing, DOM stability, and responsive regression.
10. Upload the candidate HTML and verify remote SHA-256 before calling the stage remotely delivered. Current GitHub upload result for Candidate 171 HTML: NOT COMPLETED.