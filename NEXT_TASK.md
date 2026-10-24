# NEXT TASK — Candidate 210 working checkpoint

1. Preserve Candidate 178 as recovery baseline and Candidate 207 as the direct, unchanged parent. Candidate 208/209 remain preserved rejected experiments. Candidate 210 is experimental and must not be delivered as finished.
2. Establish a working browser environment first. Current Chromium hangs even on `about:blank`, so the block is environmental until another browser path is available.
3. In a real browser, test Candidate 210's row factory, search, selected-row geometry, wheel/keyboard centering, autoplay/random seek, and dock actions. Fix runtime errors and rerun.
4. Test the shared AniList/MAL/VNDB import hub, existing importer removal flows, batch status/tag/blacklist actions, custom-list add/remove, and safe data persistence after reload.
5. Verify all four Song Select workspaces open/switch/close/Escape/back repeatedly without duplicate DOM, stale listeners, or old-route navigation.
6. Reproduce the EMQ/MIX delay/hidden-background-modal issue and fix the actual lifecycle/observer/render cause. Verify animation cover loading and fallback/retry against actual network results.
7. Capture Candidate 210 at 2555×1438 and 1920×1080; measure geometry and pixel/region differences against the supplied osu!stable reference images. No similarity percentage until measured.
8. Confirm bottom player geometry between navigation controls, small viewport behavior, button actions and the layered AMQ icon. Verify the existing learning statistics page is unchanged.
9. Run persistence and regression checks for initialization/DOM stability, custom lists, imports, audio, covers, keyboard selection, and route cleanup. Mark each case PASS/FAIL/NOT RUN/BLOCKED.
10. Only after browser acceptance, upload the HTML with a method capable of handling a 9.3 MB file, read the remote artifact back, and verify exact size/version/SHA-256. HTML upload/readback is currently NOT VERIFIED.
11. Update this report and status documents after each meaningful verified stage. Rollback remains the unchanged Candidate 207 SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
