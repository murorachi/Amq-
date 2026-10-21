# Current Status

- Current candidate: Candidate 75, `amq_learning_tool_v82_85_30_workspace_proto28_song_select_75-mobile-catalog-clearance.html`.
- SHA-256: `4ad5a0d50bb072f36c936640c14b3744bf2a91c50b79b653392880ce8084a6dd`; size 9,094,014 bytes.
- Parent Candidate 74 SHA-256: `69191737e6dcfba22c8018c4a5020959f28e39f923e45fa2b4b46b8a8c08b721`.
- Scope: correct the mobile Song Select catalog's double-reserved bottom clearance and keep the expanded workspace panel above the audio dock.
- Static checks: 50/50 executable inline JavaScript blocks pass `node --check`; 75/75 CSS style blocks parse without parser errors; 0 duplicate IDs across 243 IDs; 6/6 targeted assertions pass.
- Browser route checks: Chromium + Playwright reached Song Select through the Home icon and visible `歌曲選擇` menu action at 390x844 and 1440x900. All four workspace controls were activated via DOM click events; each set `aria-pressed=true`, displayed frame/sidebar with sidebar contained inside frame, and re-clicking collapsed the panel. Mobile frame is hidden while collapsed.
- Mobile geometry at 390x844: catalog bounds y=170..674; audio dock y=676..728; catalog ends 2px before audio dock. Expanded workspace frame ends y=674, also 2px before audio dock. This fixes the previous double reservation where catalog ended at y=516 and left about 160px of unused space before the audio dock.
- Browser limitations: navigation to `file://`, `data:` and local HTTP URLs is blocked by the environment. `page.set_content` uses an opaque origin and records two `localStorage` access errors. Tests validate layout/route/click state but not persistent storage or full normal-origin startup.
- Screenshots captured locally: `CANDIDATE75_SONGSELECT_MOBILE_COLLAPSED.png`, `CANDIDATE75_SONGSELECT_MOBILE_EXPANDED.png`, `CANDIDATE75_SONGSELECT_DESKTOP_COLLAPSED.png`, `CANDIDATE75_SONGSELECT_DESKTOP_EXPANDED.png`.
- Screenshot audit: `CANDIDATE72_SONGSELECT_PANEL_1440x900.png` actually shows Home and is not valid Song Select evidence.
- GitHub branch: `amq-candidate75-mobile-catalog-clearance`. Engineering docs upload/remote verification pending. HTML binary is not uploaded.
