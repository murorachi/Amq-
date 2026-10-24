# CURRENT STATUS — Candidate 208 (experimental, not accepted)

- Recovery baseline: Candidate 178, explicitly selected because Candidate 205 was unavailable. Do not substitute Candidate 205.
- Candidate lineage preserved through Candidate 207; Candidate 207 remains unchanged as the immediate parent.
- Immediate parent Candidate 207 SHA-256: `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`, 9,310,496 bytes.
- Latest local artifact: `/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_208_stable_frame_player_workspace_consolidation.html`.
- Candidate 208 size: 9,324,073 bytes. SHA-256: `15cfd2caa7045e3cc585bfd6e4bc8c35b72e2e70e3d97a7a3111c0228d67f892`.
- Candidate 208 uses Library references IMAGE1–IMAGE5 and image.png as visual guidance. It adds a black/blue top filter frame, transparent functional-search placement, selected-row width/centering logic, selection-triggered autoplay with random seek after metadata, consolidated dock actions, hides the works-catalog toggle, and relabels the VNDB rail entry as batch organization.
- Important limitation: changing the rail entry does not yet unify VNDB import into the AniList/MAL import workspace. That requirement remains unfinished.
- Static validation: 68 executable inline JavaScript blocks PASS; 0 syntax failures; two data/payload blocks excluded. CSS parse: 105 style blocks, 2,715 qualified rules, 0 parse errors.
- Browser harness: BLOCKED. A full Playwright set_content run timed out with Node EPIPE while processing the 9.3 MB document. No UI behavior assertions from that run count as PASS.
- NOT RUN / NOT VERIFIED: native file:// acceptance, search interaction, selected-row autoplay/scroll, dock action behavior, durable storage/reload, live imports, real audio/seek, cover load/retry, batch selection workflow, hidden modal/slow EMQ-MIX interaction, fixed-resolution pixel comparison, legacy 26-case suite.
- Candidate 208 is experimental, not accepted. HTML upload to GitHub and remote HTML SHA-256 readback are NOT VERIFIED.
- Full evidence: `reports/candidate208-stable-frame-player-workspace-consolidation-20261024/VALIDATION.md`.
