# Current Status

- Current candidate: Candidate 74, `amq_learning_tool_v82_85_30_workspace_proto28_song_select_74-mobile-frame-state-fix.html`.
- SHA-256: `69191737e6dcfba22c8018c4a5020959f28e39f923e45fa2b4b46b8a8c08b721`; size 9,094,018 bytes.
- Parent Candidate 73 SHA-256: `8a6f0e16ec730c39d7f45f7bc17ac0a73310a8192ed297c040ef273f33aa88c1`.
- Scope: fix the mobile workspace frame visibility state so it no longer overlays the song catalog when the workspace is collapsed.
- Static checks: 50/50 executable inline JavaScript blocks pass `node --check`; 75/75 CSS style blocks parse without parser errors; 0 duplicate IDs across 243 IDs; 4/4 targeted CSS assertions pass.
- Browser route checks: Song Select was reached by clicking the main icon and the visible Home menu's `歌曲選擇` action using Chromium + Playwright `page.set_content`. At 390x844 and 1440x900, all four workspace controls were activated through DOM click events; each set `aria-pressed=true`, showed the frame and sidebar, and the sidebar bounds stayed inside the frame bounds. Re-clicking the active control collapsed the panel; on mobile the frame returned to `display:none`.
- Browser limitations: navigation to `file://`, `data:` and local HTTP URLs is blocked by the environment. `page.set_content` uses an opaque origin and records two `localStorage` access errors. The tests validate route/layout and click-handler state, but do not validate persistent storage or full normal-origin app startup.
- Screenshots captured locally: `CANDIDATE74_SONGSELECT_MOBILE_COLLAPSED.png`, `CANDIDATE74_SONGSELECT_MOBILE_EXPANDED.png`, `CANDIDATE74_SONGSELECT_DESKTOP_COLLAPSED.png`, `CANDIDATE74_SONGSELECT_DESKTOP_EXPANDED.png`.
- Screenshot audit: the older `CANDIDATE72_SONGSELECT_PANEL_1440x900.png` image actually shows Home, not Song Select. It must not be treated as Song Select visual acceptance evidence.
- GitHub branch: `amq-candidate74-mobile-frame-state-fix`. Engineering docs upload/remote verification pending. HTML binary is not uploaded.
