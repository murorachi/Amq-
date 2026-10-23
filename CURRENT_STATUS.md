# CURRENT STATUS — Candidate 201 Local History Panel

- Current local experimental candidate: Candidate 201.
- HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_201_local_song_history_panel.html`
- Local SHA-256: `1a353023584509d188cb57a97f3efccff355ccab94d55824d047209d4c8ee093`
- Size: 9,301,940 bytes.
- Candidate 196–199 fixed compact catalog ownership, stacked rows, minimum row height/action layout, and responsive resize cleanup. Candidate 200 adjusted post-selected row offsets so the eighth card is about half-visible.
- Candidate 201 replaces the empty left faux-leaderboard frame with a real local quiz-history panel for the selected song. It displays up to six recent attempts from `__aniHistoryAPIv51.getHistory()`; no scores, names, avatars, or ranking data are fabricated. Empty state is explicit.
- PASS: 70 executable inline JavaScript blocks checked with Node `--check`; 0 syntax errors; 1 HTML pair, 72 script pairs, 108 style pairs.
- PASS: AMQ 38,821; EMQ 16,839; MIX 55,660 with exact source counts; 180 rows rendered.
- PASS: 1648×928 responsive test viewport and 2555×1438 primary reference viewport both show the eighth row about 46.1% visible.
- FAIL: pixel fidelity at the actual reference viewport 2555×1438 remains low: full-frame SSIM=0.37455, MAE=63.7712, RMSE=85.0330; regional SSIM header=0.0751, left-records=0.2439, catalog=0.4568, bottom-controls=0.2383, central-scene=0.4629. No visual acceptance pass. Compact rows stack without overlap at 390×844 and 900×700; document has no horizontal/vertical overflow.
- PASS: resize mobile→desktop→mobile; local-history rendering fixture; workspace modal backdrop, Escape, focus return, selected-song/scroll restoration.
- BLOCKED: native file:// and local HTTP navigation remain blocked by ERR_BLOCKED_BY_ADMINISTRATOR. page.set_content emits two localStorage access-denied errors under opaque origin, so durable storage/reload is not verified.
- NOT RUN: custom-list CRUD/reload persistence, live APIs/covers and recovery, real audio, full workspace regression, registered pixel diff.
- GitHub report `reports/candidate201-local-song-history-panel-20261024/VALIDATION.md` created. Candidate HTML upload and remote SHA verification are NOT COMPLETED.
- Candidate 201 is NOT ACCEPTED.

Next: native-origin check of the scene-background manager/fallback and local history panel; finish persistence, CRUD, API/cover, audio and workspace regression if a supported browser environment is available.