# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched. No force-push or overwrite of the accepted baseline.

## Latest verified Proto25 checkpoint
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source commit: `3c1ea186f7661f6312ee263800a45f34111a40e8`.
- Successful workflow: [Run 39538605138](https://github.com/murorachi/Amq-/actions/runs/39538605138).
- Workflow conclusion: SUCCESS. Static HTML parse, duplicate-ID check, inline JavaScript syntax checks and browser acceptance passed.
- Browser assertions: 18 PASS; page errors: 0; console errors: 0; elapsed browser acceptance approximately 20 seconds.
- Artifact: [proto25-stage24-ui-acceptance, ID 12318249366](https://github.com/murorachi/Amq-/actions/runs/39538605138/artifacts/12318249366).
- Artifact ZIP SHA-256: `474f338638bbcb2acb6c2fe0970a751344b83dd0bd8beaaeaa4e1bae9df137d2`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,920,621 bytes.
- Candidate SHA-256: `a36cedd3fc2f2ca612e7f5aaa8708b80924bfe912b47094812174651989883ac`; independently checked against the downloaded artifact's manifest.
- Stage 24 branch head after publication: `95f17580460b1dd1e17a7b069a1dd27f67c49576`.
- Remote tree confirms the HTML, 81-byte SHA-256 manifest and TEST_REPORT. The remote manifest and report match Run 39538605138.

## Changes in the latest tested checkpoint
- Preserved AMQ navigation, native storage, quiz, catalog, Learning Center, Analysis and Multiplayer UI behavior.
- Fixed workspace shell lifecycle so standalone catalog routes do not retain the Learning/Analysis sidebar or dock.
- Kept standalone audio dock at 54px and reserved scroll-wrapper clearance beneath it; final-row clearance passes at document end.
- Enlarged the desktop home cookie to 560px and kept the three primary actions at 520px wide by 76px high.
- Enlarged the Play submenu cookie to 500px and menu blades to 520px by 92px; required labels remain `Single Player`, `Multiplayer`, `Back`.
- Widened the desktop Options sidebar to 340px while retaining 292px on mobile.
- Stage 31 refined the home profile/player information hierarchy: desktop avatar 44px, profile name 15px, PP value 20px, player caption 9px and track title 13px; mobile avatar 40px and profile name 14px.
- Browser assertions now guard those profile/player typography and avatar dimensions at desktop and mobile sizes.
- Reviewed the latest desktop home screenshot after the change. The header remains inside its 86px frame; mobile viewport and document widths both remain 390px.

## Acceptance limits
- NOT RUN: real audio output; full quiz-answer lifecycle; multiplayer server connectivity and lifecycle.
- Exact osu!Stable client source commit and matching screenshot build remain unverified.
- >=90% visual similarity: NOT VERIFIED. Current evidence is a qualitative comparison against pinned official Wiki screenshots, not a build/viewport-matched pixel score.
- Background artwork, exact cookie artwork and differences between AMQ catalog data and osu!Stable Song Select remain. Do not invent osu! beatmap controls or settings to conceal those differences.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and separate runtime acceptance are complete.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Keep all Proto25 work isolated.


## Latest verified checkpoint — 2026-10-21 03:28 UTC

- Stage 24 workflow completed successfully: [run 39538605138](https://github.com/murorachi/Amq-/actions/runs/39538605138), tested PR merge candidate `3c1ea186f7661f6312ee263800a45f34111a40e8`.
- Published to isolated branch `v82.85.30-proto25-ui-refactor-stage-24` at commit [`95f17580460b1dd1e17a7b069a1dd27f67c49576`](https://github.com/murorachi/Amq-/commit/95f17580460b1dd1e17a7b069a1dd27f67c49576).
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`; 8,920,621 bytes; SHA-256 `a36cedd3fc2f2ca612e7f5aaa8708b80924bfe912b47094812174651989883ac`. Remote SHA manifest matches the locally extracted artifact manifest. Artifact ZIP SHA-256: `474f338638bbcb2acb6c2fe0970a751344b83dd0bd8beaaeaa4e1bae9df137d2` (artifact ID `12318249366`).
- Static checks PASS: HTML parse, 220 unique IDs, 42 inline JavaScript blocks syntax-checked.
- Browser acceptance PASS: 18 named checks; no page errors or console errors. Home actions/return routes, settings/background dialog, storage persistence, mobile overflow, Learning/Analysis separation, catalog/detail, fixed audio dock clearance and quiz palette were exercised. Desktop/mobile and key route screenshots are in the workflow artifact.
- Confirmed new layout assertions: profile name visible, profile 84px high, standalone catalog audio dock 54px high, audio player visible at 32px. The latest screenshots still show a stylized AMQ home rather than a verified close reproduction of osu!Stable.
- NOT RUN: real audio output, complete quiz-answer lifecycle, multiplayer server connectivity/lifecycle. Exact Stable client build and screenshot viewport match remain unknown; >=90% similarity remains NOT VERIFIED. Current qualitative estimate remains 70–75%, not a measured pixel score.
- The accepted Proto24 baseline remains untouched; PR #9 remains unmerged. Keep Proto25 isolated.
