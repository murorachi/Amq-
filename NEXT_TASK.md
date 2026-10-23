# NEXT TASK — Song Select visual fidelity and workspace modal

1. Continue from local Candidate 173, SHA-256 `282edb78e91de4c4f65f1c917d6edf333b52efef11de7c6b65256404e4101b27`. It is not accepted and its HTML has not been uploaded to GitHub.
2. Candidate 173 fixes the legacy navigation leak: `#c99LeftRail` is hidden by a higher-specificity route-scoped rule that beats the later-injected Candidate 99 !important rule.
3. Existing set_content Chromium checks passed at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720 and 900×700. No horizontal overflow; 180 song rows render; keyboard selection and hover-vs-selected displacement checks pass.
4. Native file:// navigation remains blocked with ERR_BLOCKED_BY_ADMINISTRATOR. set_content uses an opaque origin; localStorage access errors mean durable storage acceptance is not possible in this environment.
5. Compare row background opacity, art/cover presentation, metadata and bottom dock against the user's reference. Keep the scene-background manager and visually pleasant fallback when no custom background is set. Never fabricate ranking, song cover, or score data.
6. Preserve the observed 7.5-row affordance: at 2555×1438 the eighth song row is partially clipped by the tracklist bottom. Re-check it at all target viewports.
7. After Song Select scene fidelity is stable, implement workspace actions as modal overlays (Anilist/MAL-style): dim background, focus modal, support close/Escape, restore selected song/scroll/filter state.
8. Complete full regression when a supported native-origin browser is available: custom-list create/add/remove/filter/reload persistence; import formats/error recovery/dedup; real API and cover failure recovery; audio; four workspace routes and back navigation; DOM stability.
9. Candidate HTML upload/remote SHA verification remains NOT COMPLETED; report files have been uploaded and read back. Do not conflate report upload with HTML delivery.
10. Keep unique candidate files and preserve Candidate 170 and Candidate 169 rollback checkpoints.