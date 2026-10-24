# NEXT TASK — Candidate 211 working checkpoint

1. Run browser acceptance on Candidate 211. Previous Chromium `set_content` smoke test exceeded 120 seconds, so runtime layout is BLOCKED, not passed.
2. Verify dock geometry at 2555×1438 and 1920×1080; ensure bottom bar sits between Back and Home and controls/progress do not overlap.
3. Reproduce AMQ wheel-to-autoplay against EMQ in the same test; verify no delayed scroll callback repositions the list after wheel input.
4. Verify selected-song outline and minimal row gaps in both AMQ and EMQ lists.
5. Inspect workspace icons/buttons, import/list/learning actions, and the bottom-right Home icon at desktop and narrow viewport sizes.
6. Run native `file://` launch, real audio/autoplay and random seek, workspace lifecycle, custom-list persistence, cover loading, and reference pixel comparison when environment permits.
7. Update all test states as PASS/FAIL/NOT RUN/BLOCKED. Do not accept Candidate 211 until runtime evidence supports it.
8. Attempt HTML upload and remote byte/hash verification when a byte-preserving transfer path is available. Do not claim upload succeeded.
9. Preserve Candidate 178 recovery baseline, Candidate 207 direct source, Candidate 210 parent, and rejected Candidate 208/209 unchanged.

---

1. Preserve Candidate 178 as recovery baseline and Candidate 207 as unchanged direct parent. Candidate 208/209 remain rejected. Candidate 210 is experimental and not for delivery.
2. Complete native-origin testing when a browser path is available. Current environment blocks file:// and localhost navigation; set_content tests use an in-memory localStorage shim and cannot prove durable persistence.
3. Finish exhaustive four-workspace lifecycle tests: import, batch, custom lists, learning plan. Repeat open/switch/close/Escape/Back and assert route stability, no duplicate components/listeners, and no hidden overlay intercepts.
4. Verify cover success/failure with real network access. Current loader retries existing image nodes without src, but external DNS failure blocks successful CDN validation.
5. Test actual audio URLs, player controls, random seek after real metadata, autoplay policy, and row-click playback. Current click-path checks do not prove audible playback.
6. Repeat mouse-wheel centering and keyboard Enter/arrow selection across filtered results and mode switches.
7. Capture matching states at 2555×1438 and 1920×1080; measure geometry and compare reference regions. Do not claim a similarity percentage without measured evidence.
8. Test custom-list create/add/remove/filter/reload persistence, importer error recovery, route cleanup, initialization/DOM stability, and unchanged learning statistics.
9. Rerun static checks and report PASS/FAIL/NOT RUN/BLOCKED per assertion.
10. Upload the exact HTML only when a transfer path supports the 9.35 MB artifact; fetch remote bytes and verify version/size/SHA-256. Current connector accepts text only and container git/curl has no DNS/network.
11. Update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md and validation report after material changes. Preserve all candidates; rollback to unchanged Candidate 207.

## Candidate 212 next acceptance gate
1. Reproduce AMQ versus EMQ scroll/autoplay in a browser with real media access; do not treat click-path or DOM smoke tests as proof of playback.
2. Resolve the opaque-origin localStorage SecurityError in the test harness, then verify custom-list create/add/remove/filter/reload persistence.
3. Verify the initial home-menu screenshot against the accepted reference; preserve the pre-open state and limit changes to the expanded workspace.
4. Test dock layout and mutation stability across route switches and resize; current 2-second smoke observation is not exhaustive proof against every loop.
5. Complete workspace switching/back-navigation/overlay cleanup and importer failure recovery tests.
6. Run actual audio, random seek after real metadata, cover/CDN success, and pixel-region comparison at 2555×1438 and 1920×1080 when the environment permits.
7. HTML upload and remote SHA-256 verification remain blocked until a byte-capable transfer path and GitHub network access are available. Never claim upload success without readback.
8. Candidate 212 remains EXPERIMENTAL / NOT ACCEPTED. Preserve all candidates; rollback to unchanged Candidate 207 if needed.