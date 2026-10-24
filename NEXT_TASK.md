# NEXT TASK — Candidate 210 working checkpoint

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