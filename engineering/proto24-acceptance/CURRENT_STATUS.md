# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched. No force-push or overwrite of the accepted baseline.

## Latest verified Proto25 checkpoint
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source commit: `a05c66401f0053d2c7bee53f5a965422edd8f9e9`.
- Successful workflow: [Run 39536870515](https://github.com/murorachi/Amq-/actions/runs/39536870515).
- Workflow conclusion: SUCCESS. Static HTML parse, duplicate-ID check, inline JavaScript syntax checks and browser acceptance passed.
- Browser assertions: 18 PASS; page errors: 0; console errors: 0.
- Artifact: [proto25-stage24-ui-acceptance, ID 12318480861](https://github.com/murorachi/Amq-/actions/runs/39536870515/artifacts/12318480861).
- Artifact ZIP SHA-256: `def95408d91797c5cdbc247c4275a217f5a6eeecdace2f4700f90aca6218d587`.
- Candidate: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Size: 8,918,095 bytes.
- SHA-256: `0ae1692288d85c3d7750af365b9fcb60cd57744e47b979ab9cdef08ce7a30232`.
- Downloaded candidate SHA-256 matches the artifact manifest.
- Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`; verified remote head: `6f51f1f0b53dc194524c0be1c86e5a94bf4c7493`.
- Remote tree confirms candidate HTML size 8,918,095 bytes, manifest size 81 bytes and TEST_REPORT presence. Remote manifest/report match the successful run.

## Changes in the latest tested checkpoint
- Preserved existing AMQ navigation, native storage, quiz, catalog, Learning Center, Analysis and Multiplayer UI behavior.
- Fixed workspace shell lifecycle so standalone catalog routes do not retain the Learning/Analysis sidebar or dock.
- Kept standalone audio dock at 54px and reserved scroll-wrapper clearance beneath it; final-row clearance passes at document end.
- Enlarged the desktop home cookie to 560px and kept the three primary actions at 520px wide by 76px high.
- Enlarged the Play submenu cookie to 500px and menu blades to 520px by 92px; required labels remain `Single Player`, `Multiplayer`, `Back`.
- Widened the desktop Options sidebar from 292px to 340px while retaining the 292px mobile panel. The browser test now asserts the desktop width and mobile overflow constraint.
- Downloaded and reviewed the latest desktop Settings screenshot; the wider panel remains within the viewport and existing controls remain visible.
- Reviewed desktop/mobile home, Play menu and Settings screenshots. Mobile document width remains 390px at a 390px viewport.

## Acceptance limits
- NOT RUN: real audio output; full quiz-answer lifecycle; multiplayer server connectivity and lifecycle.
- Exact osu!Stable client source commit and matching screenshot build remain unverified.
- >=90% visual similarity: NOT VERIFIED. Current evidence is a qualitative comparison against pinned official Wiki screenshots, not a build/viewport-matched pixel score.
- Background artwork, exact cookie artwork, header details and some screen-specific composition remain different. Third-party cover-image availability is not a layout pass.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and separate runtime acceptance are complete.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Keep all Proto25 work isolated.
