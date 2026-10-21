# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched. No force-push or overwrite of the accepted baseline.

## Latest verified Proto25 checkpoint
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source commit: `bf332b5cf4ac4e089d689e9ac9614cc38b11b167`.
- Successful workflow: [Run 39539309957](https://github.com/murorachi/Amq-/actions/runs/39539309957).
- Workflow conclusion: SUCCESS. Static HTML parse, duplicate-ID check, inline JavaScript syntax checks and browser acceptance passed.
- Browser assertions: 18 PASS; page errors: 0; console errors: 0.
- Artifact: [proto25-stage24-ui-acceptance, ID 12319085625](https://github.com/murorachi/Amq-/actions/runs/39539309957/artifacts/12319085625).
- Artifact ZIP SHA-256: `bb8aeb68a77ea862cc75febe6903b852030ab8e452f41ac527c592b1b61a8c76`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,923,325 bytes.
- Candidate SHA-256: `0ff2bc155b7953bce29ad43209bb02cc94f2aa992e614670762ce0bf0e0c38fd`; downloaded candidate hash matches the artifact manifest.
- Stage 24 branch head after publication: `ba12305759ed916dd69f42e38646505be84a5710`.
- Remote tree confirms the HTML, 81-byte checksum manifest and TEST_REPORT. Remote manifest/report match Run 39539309957.

## Changes in the latest tested checkpoint
- Preserved AMQ navigation, native storage, quiz, catalog, Learning Center, Analysis and Multiplayer UI behavior.
- Fixed workspace shell lifecycle so standalone catalog routes do not retain the Learning/Analysis sidebar or dock; the catalog's final row clears the fixed audio dock.
- Enlarged the desktop home cookie to 560px and kept the three primary actions at 520px wide by 76px high. The Play submenu cookie is 500px and its three blades are 520px by 92px.
- Required labels remain `Single Player`, `Multiplayer`, `Back`.
- Widened the desktop Options sidebar to 340px while retaining 292px on mobile.
- Stage 31 refined profile/player typography and avatar sizing, with desktop/mobile assertions.
- Stage 32 added a CSS-only translucent triangular skin pattern to the home and Play cookies based on the pinned official osu!Stable Wiki screenshots.
- Stage 33 matched the primary menu labels to the Stable reference's italic typography and added low-contrast radial-ray background layers to the home and Play screens.
- Stage 33 static checks PASS; 18 browser assertions PASS; page/console errors 0. Candidate hash matches the downloaded manifest; remote HTML, manifest and TEST_REPORT were verified.

## Acceptance limits
- NOT RUN: real audio output; full quiz-answer lifecycle; multiplayer server connectivity and lifecycle.
- Exact osu!Stable client source commit and matching screenshot build remain unverified.
- >=90% visual similarity: NOT VERIFIED. Comparison is qualitative because the official screenshots are not build/viewport matched.
- Background/skin and cookie artwork remain CSS approximations; AMQ catalog data differs from osu!Stable Song Select.
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


## Latest visual refinement checkpoint — 2026-10-21 03:36 UTC

- Added restrained radial-ray background and strengthened the Stable-like triangular cookie pattern on the Play screen; menu labels now use italic typography closer to the official Stable reference. Existing AMQ routes and labels remain unchanged.
- Latest workflow [39539309957](https://github.com/murorachi/Amq-/actions/runs/39539309957) PASS at work candidate `bf332b5cf4ac4e089d689e9ac9614cc38b11b167`; isolated Stage 24 publication commit `ba12305759ed916dd69f42e38646505be84a5710`.
- Candidate `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`: 8,923,325 bytes; SHA-256 `0ff2bc155b7953bce29ad43209bb02cc94f2aa992e614670762ce0bf0e0c38fd`. Remote manifest matches. Artifact ID `12319085625`, ZIP SHA-256 `bb8aeb68a77ea862cc75febe6903b852030ab8e452f41ac527c592b1b61a8c76`.
- Static checks PASS: HTML parse, 220 unique IDs, 42 inline JavaScript blocks syntax-checked. Browser acceptance PASS: 18 checks; no page errors or console errors. New assertions verify home action text is italic at 28px and Play submenu text is italic at 24px on desktop. Mobile overflow and key routes remain passing.
- Screenshot review confirms the Play submenu is closer in typography, cookie texture and background treatment. Remaining differences include exact logo proportions/font, actual skin/background artwork, top profile/jukebox composition, and app-specific catalog versus osu!Stable Song Select.
- Similarity remains a qualitative estimate of about 70–75% across the current UI scope, not a measured pixel score or >=90% acceptance. Exact Stable build/screenshot viewport is not verified.
- NOT RUN: real audio output, full quiz-answer lifecycle, multiplayer server connectivity/lifecycle. Accepted Proto24 baseline remains unchanged; PR #9 remains unmerged.
