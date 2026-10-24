# CURRENT STATUS — Candidate 211 (experimental, not accepted)

- Candidate 211 local output: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_211_layout_scroll_focus.html`; 9,352,687 bytes; SHA-256 `4ba1ded70e46e6c437628150be3c86bad045a070f49a84ba50dac7d02465c53b`.
- Parent Candidate 210 SHA-256 `92f3e6353bd9e9d72d148037cd710818e25d514ce6c2ed57642e2ab248f6ec5f`; Candidate 207 and all earlier candidates retained unchanged.
- Candidate 211 changes: removed delayed 900 ms scroll correction; fixed inline-important dock geometry that forced a 440 px floating player; unified blue/dark workspace button styling; compacted selected-row spacing and changed focus state to a blue outline.
- PASS: 68 executable inline JS blocks pass `node --check`; 2 embedded payload blocks excluded. Static assertions confirm old delayed scroll correction and 440 px dock override removed.
- BLOCKED: Chromium `set_content` smoke test exceeded 120 seconds; no runtime UI acceptance is claimed. Native file launch, audio, wheel/autoplay behavior, persistence, cover success, pixel comparison NOT RUN.
- GitHub HTML artifact upload/readback SHA remains BLOCKED by current transfer/network limitations. Candidate 211 is experimental, not accepted.

---

- Candidate 178 remains the recovery baseline. Candidate 207 remains the unchanged direct source; Candidates 208/209 remain rejected and untouched.
- Candidate 207: 9,310,496 bytes; SHA-256 2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100.
- Current local Candidate 210: /mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html
- Current size: 9,347,601 bytes. SHA-256: 92f3e6353bd9e9d72d148037cd710818e25d514ce6c2ed57642e2ab248f6ec5f.
- Fixes: corrected row grid placement; normalized row widths; aligned catalog at 61.5vw/38.5vw to match the reference's right-side list; row height about 151 px at 2555×1438 to target 7.5 visible rows; removed unnecessary getSongsForWork scans for EMQ/MIX category “all”; added viewport-scoped cover retry, timeout and fallback.
- Chromium launches. Direct file:// and localhost navigation are blocked by the environment, so Playwright set_content plus an in-memory localStorage shim was used. This supports DOM/event/layout tests but does not validate native double-click launch or durable storage.
- PASS: initialization with no captured pageerror; Song Select creates 180 rows; search match/no-match works; repeated AMQ→EMQ→MIX switches complete; all four workspace entries (import, batch, custom lists, learning plan) opened and Escape-closed over 3 consecutive rounds; route stayed active, one rail/stage remained, and no modal overlays stayed open; Back returned home; row click invokes autoplay path; real mouse wheel changes centered selection; previous/play/next controls accept clicks without JS errors; synthetic metadata exercised random-seek hook.
- Corrected runtime defects: row copy was under/behind the wrong grid column; EMQ/MIX did expensive per-work song lookups for category “all”.
- Geometry at 2555×1438: catalog x≈1571 px, width≈984 px; list viewport height≈1108 px; row height≈151 px; 8 rows intersect viewport (last partial), consistent with the 7.5-row target. At 1920×1080, list x≈1181 px, width≈734 px, row height 130 px, 7 rows intersect.
- Cover fallback: observed visible ♫ fallback after cover queue/API could not resolve images. Successful real cover loading and retry against a reachable CDN are NOT VERIFIED because external DNS fails here.
- NOT VERIFIED: actual audio playback and real-media random seek; native file launch and durable localStorage persistence; exhaustive Back navigation from every workspace; pixel-region acceptance against reference. No similarity percentage is claimed.
- Static validation: 68 executable inline JS blocks pass node --check; two embedded payload blocks excluded. CSS: 107 style blocks, 2,745 qualified rules, zero tinycss2 parse errors. HTML parser still reports two inherited structural warnings at the </head><body> boundary near line 324.
- GitHub HTML upload/readback SHA-256 is BLOCKED: connector accepts text content but not a local-file byte stream; container git/curl cannot resolve github.com. Do not claim the HTML is uploaded.
- Status: EXPERIMENTAL / NOT ACCEPTED / NOT FOR USER DELIVERY.

## Candidate 212 follow-up — 2026-10-24
- Candidate 212 local artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_212_mutation_loop_fix.html`; 9,352,632 bytes; SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Root-cause change: removed the `MutationObserver(applyDockStyle)` observer on `#audioDock` style because `applyDockStyle` mutates the same style attribute, creating a feedback-loop risk. Removed the `inset` shorthand assignment and retained explicit dock geometry properties.
- Home-menu initial styles are untouched in this candidate; layout changes remain scoped to `body.amq-songselect-route-active`. Visual screenshot equivalence is not yet verified.
- PASS: 68 executable inline JS blocks pass `node --check`; browser smoke test reached complete, expanded the home menu, navigated to Song Select, and rendered one stage, one tracklist, 180 rows. Dock measured x≈134, y≈955, w≈1647, h≈125 at 1920×1080. A 2-second mutation observation recorded 60 DOM mutations without stalling.
- BLOCKED/NOT RUN: opaque-origin storage shim still logs localStorage SecurityError; native `file://`, persistence after reload, actual AMQ/EMQ autoplay comparison, real audio/media seek, CDN/API success, exhaustive workspace regression, and pixel comparison remain unverified.
- HTML upload and remote SHA readback remain BLOCKED; no remote HTML upload is claimed. Candidate 212 is EXPERIMENTAL / NOT ACCEPTED.
- Report: `amq_candidate212_validation_report.md` (local delivery artifact).