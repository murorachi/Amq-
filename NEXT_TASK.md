# NEXT TASK — Song Select Fidelity, Modal Workspace, and Delivery

1. Continue from local Candidate 180, SHA-256 `4858d816a4b7fa0583d2d883bab2acb066d51f25f4023344b6667bdf44db9b83`. It is experimental, not accepted, and its HTML has not been uploaded to GitHub.
2. Candidate 180 preserves translucent row distance tiers and fixes hover movement to an actual 3 px left shift (width growth removed). Selected row retains its stronger treatment.
3. PASS: 64 inline JS syntax checks; Chromium set_content route checks at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700. 180 rows; legacy rail hidden; zero horizontal overflow; dock stays within viewport; eighth row clips ~50%.
4. PASS: ArrowDown changes selection; AMQ→EMQ changes selected/list song data to Echoes; EMQ→AMQ restores Usagi to Kame. Actual hover shift measured -3 px.
5. Native file:// remains blocked with ERR_BLOCKED_BY_ADMINISTRATOR. page.set_content has an opaque origin and two existing localStorage access errors. Durable persistence acceptance is NOT RUN.
6. Next visual pass: compare row widths/offset tiers and metadata/control hierarchy to the user-provided osu!stable screenshot. Do not claim full pixel similarity when custom background/art and ranking data differ.
7. Preserve the existing scene-background manager and dark fallback. Do not invent anime artwork, ranking, player score, or unavailable metadata.
8. After main Song Select structure is stable, implement requested workspace panels as overlays: background dimmed, focus in modal, close/Escape support, restore selected song/scroll/filter state. Do not let the old left rail return.
9. Full regression still needed: custom-list CRUD/filter/reload persistence, import formats/dedup/error recovery, live API/covers and recovery, audio playback, four-workspace routing/back navigation, DOM stability.
10. Upload Candidate 180 HTML to GitHub and verify remote file identity/SHA-256. Current status: NOT COMPLETED; report upload is not HTML delivery.
11. Preserve Candidate 170 and Candidate 169 rollback checkpoints; every new candidate must have unique name, report, status update and explicit test classifications.