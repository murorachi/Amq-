# NEXT TASK — Song Select Fidelity, Modal Workspace, and Delivery

1. Current local working candidate is Candidate 181, SHA-256 `3671ec7fb9a276742bc227f7028c1df4f7afb730f27dc099138392640b82ee3a`. Candidate 181 is not accepted; HTML has not been uploaded to GitHub.
2. Candidate 181 fixes the compact viewport scroll overflow at <=900px while Song Select is active. At 900×700 document dimensions now remain 900×700 (previously 900×796).
3. PASS in Chromium page.set_content: 65 executable inline JS blocks parse cleanly; route/geometry checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700; legacy left rail hidden; 180 initial rows; ArrowDown selection; AMQ/EMQ/MIX source counts; hover -3px vs selected -7px; half-visible eighth row.
4. Two localStorage SecurityErrors are expected in opaque-origin page.set_content. Durable persistence and custom-list CRUD/reload are NOT verified. Native file navigation remains blocked with ERR_BLOCKED_BY_ADMINISTRATOR.
5. Next UI task after core screen: make 清單管理 / import / learning actions open modal overlays like AniList/MAL import, dim the Song Select background, keep keyboard focus in the modal, support close/Escape, and restore selected song, scroll position, and filters on close. Do not implement until main scene checks remain stable.
6. Preserve the scene-background manager and attractive no-custom-background fallback; do not fabricate ranking/score/cover data.
7. Keep the 7.5-row affordance. At 1648×928 the eighth row bounds are y=764.3..863.5 and list bottom=814; at 1280×720 row bounds are y=570.6..641.2 and list bottom=606.
8. Complete native-origin acceptance when a supported environment is available: custom-list CRUD/reload persistence, imports/error recovery/dedup, API/covers, audio, four workspace routes/back navigation, DOM stability.
9. Upload Candidate 181 HTML and verify remote SHA-256. Current remote result: NOT COMPLETED; report files are separate from HTML delivery.
10. Keep Candidate 180/179/170/169 intact for rollback.