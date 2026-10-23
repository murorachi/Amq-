# NEXT TASK — Song Select root composition

1. Continue from Candidate 170 as the current experimental input; preserve Candidate 169 as the rollback checkpoint. Candidate 170 is not accepted.
2. Fix the root Song Select composition, not another isolated width override: make the route own one full-screen scene with a background region, left ranking/player-record overlay, right song/difficulty list overlay, top-left metadata, top-right list controls, and shallow bottom control dock.
3. Identify why the legacy left workspace/navigation content remains visible in the Song Select screenshot. Keep import/list/learning functionality available through the intended internal workspace controls, but do not let the old navigation stack occupy the main scene.
4. Preserve real data only. Do not invent ranking/player scores or song metadata.
5. After root composition is corrected, measure at the user reference viewport 2555×1438 and responsive viewports 1920×1080, 1648×928, 1440×900, 1280×720, and 900×700.
6. Test selected row, hover displacement, keyboard navigation/Enter, scroll affordance, mode switching and bottom controls; report each assertion separately.
7. Native file:// and local HTTP navigation were blocked by ERR_BLOCKED_BY_ADMINISTRATOR. Find a supported browser route for native-origin and persistence acceptance; do not claim persistence from page.set_content.
8. Re-run the existing relevant regression tests: custom-list create/add/remove/filter/reload persistence, import error recovery, audio playback, workspace routing, and DOM stability.
9. Capture same-viewport reference/candidate images and compute regional pixel metrics only after scene alignment. Previous Candidate 135 SSIM was 0.27858 and MAE 75.3351; these are historical, not Candidate 170 scores.
10. Keep every new candidate uniquely named; update status, baseline, task and report files; verify remote file identity after upload.