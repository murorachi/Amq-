# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched. No force-push or overwrite of the accepted baseline.

## Latest verified Proto25 checkpoint
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source head: `d37792fdf17b40dfb7afbcae43a2de7598860f02`.
- Successful workflow: [Run 39530034146](https://github.com/murorachi/Amq-/actions/runs/39530034146).
- Workflow conclusion: SUCCESS. Static HTML parse, duplicate-ID check, inline JavaScript syntax checks and browser acceptance all passed.
- Browser assertions: 18 PASS; page errors: 0; console errors: 0.
- Artifact: [proto25-stage24-ui-acceptance, ID 12314713448](https://github.com/murorachi/Amq-/actions/runs/39530034146/artifacts/12314713448).
- Artifact ZIP SHA-256: `ddf0dc13028cebc5a6cf05a6bcab32c66e33df1361cf4f3ac4c71c9978ab26de`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,917,750 bytes.
- SHA-256: `65ff22b43383c142153cab4a403e5c2ab8d0839f685d07f75705865f2b2a82c9`.
- Downloaded candidate hash exactly matches `candidate.sha256`.
- Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`; verified remote head: `7687521f27f0c0ad2afa20cbac3680511d9b2caf`.
- Remote tree confirms candidate HTML size 8,917,750 bytes, checksum manifest size 81 bytes and TEST_REPORT size 875 bytes. Remote manifest and report match the successful run.

## Changes and evidence
- Fixed workspace shell lifecycle so standalone catalog routes no longer retain the Learning/Analysis sidebar or dock.
- Fixed standalone audio dock to 54px and reserved scroll-wrapper space beneath it. Final-row scroll clearance passes at document end: last card bottom 471px, dock top 834px, dock height 54px, wrapper bottom padding 160px.
- Enlarged the desktop home logo to 560px and moved it into the menu-blade area. Primary actions now use a 520px maximum width and 76px height. Browser assertions cover logo width, landing height and action heights.
- Enlarged the desktop Play submenu logo to 500px and menu blades to 520px wide by 92px high. The desktop-only implementation hint is hidden to prevent overlap; the mobile hint remains available. Browser assertions cover logo width, blade width/height and hidden desktop hint.
- Downloaded and reviewed the latest home and Play menu screenshots. Geometry is materially closer to the pinned osu!Stable references. Background texture, exact logo artwork, header layout and screen-specific differences remain; this is not a pixel-perfect clone claim.
- Other latest screenshots cover mobile home/Play menu/Settings, catalog/detail, quiz, Learning Center and Analysis. No page or console errors were reported.

## Acceptance limits
- NOT RUN: real audio output; full quiz-answer lifecycle; multiplayer server connectivity and lifecycle.
- Exact osu!Stable client source commit and matching screenshot build remain unverified.
- >=90% visual similarity: NOT VERIFIED.
- Third-party cover-image availability is separate from layout acceptance.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and separate runtime acceptance are complete.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Keep all Proto25 work isolated.