# CURRENT STATUS — Candidate 210 (experimental, not accepted)

- Candidate 178 remains the recovery baseline. Candidate 207 remains the unchanged direct source; Candidates 208/209 remain rejected and untouched.
- Candidate 207: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100.
- Current local Candidate 210: /mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html
- Current size: 9,347,587 bytes. SHA-256: fea29371f6a94cc21a4ccfba9b98c1f4d76a9ae4727d54a269e6b79e1f65a036.
- This iteration fixed Song Select row grid placement, normalized row widths, reduced row height to about 84 px at 2555×1438, removed an unnecessary getSongsForWork scan from EMQ/MIX default-category rendering, and added viewport-scoped cover retries with timeout/fallback.
- Chromium launches. Direct file:// and localhost navigation are blocked by the environment, so Playwright set_content plus an in-memory localStorage shim was used. This supports DOM/event/layout tests but does not validate native double-click launch or durable storage.
- PASS: page initializes without captured pageerror exceptions; Song Select creates 180 rows; search match/no-match works; repeated AMQ→EMQ→MIX switches complete after the performance fix; import, batch and custom-list workspaces open and Escape-close while retaining Song Select; Back returns home.
- Corrected runtime defects: row copy was placed under/behind the wrong grid column; EMQ/MIX performed unnecessary per-work song lookups for category “all”, stalling mode activation.
- NOT VERIFIED: successful real cover loading or network retry because external DNS fails here; real audio/autoplay/random seek; actual wheel-centered selection; learning workspace lifecycle; custom-list persistence; pixel acceptance.
- Static validation: 68 executable inline JS blocks pass node --check; two embedded payload blocks excluded. CSS: 107 style blocks, 2,745 qualified rules, zero tinycss2 parse errors. Inherited HTML structure warning from Candidate 207 still needs dedicated investigation.
- Fixed-resolution screenshot exists, but osu!stable geometry/pixel comparison is incomplete. No similarity percentage is claimed.
- GitHub HTML upload/readback SHA-256 is BLOCKED: connector accepts text content but not a local-file byte stream; container git/curl cannot resolve github.com. Do not claim the HTML is uploaded.
- Status: EXPERIMENTAL / NOT ACCEPTED / NOT FOR USER DELIVERY.