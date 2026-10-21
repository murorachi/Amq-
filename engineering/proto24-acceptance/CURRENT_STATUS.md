# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched. No force-push or overwrite of the accepted baseline.

## Latest verified Proto25 checkpoint
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Tested source head: `63451f4719f092587b02f2f30efa8bc25d6ec1c2`.
- Successful workflow: [Run 39527781872](https://github.com/murorachi/Amq-/actions/runs/39527781872).
- Workflow conclusion: SUCCESS. Static HTML parse, duplicate-ID check, inline JavaScript syntax checks, and browser acceptance all passed.
- Browser assertions: 18 PASS; page errors: 0; console errors: 0.
- Artifact: [proto25-stage24-ui-acceptance, ID 12313869495](https://github.com/murorachi/Amq-/actions/runs/39527781872/artifacts/12313869495).
- Candidate size: 8,916,086 bytes.
- Candidate SHA-256: `5d475770dc4ca8843fbb0562de8615b896a3355f692ff9a30753c3bcc3426b78`.
- Downloaded artifact's candidate hash exactly matches `candidate.sha256`.
- Stage 24 publish branch head: `ab4e4d14eb0b9e3533307709e7e226bb7aecd6b8`.
- Remote tree confirms candidate HTML size 8,916,086 bytes, checksum manifest size 81 bytes, and `engineering/proto24-acceptance/TEST_REPORT.md` size 875 bytes. The remote manifest and report match the successful run.

## Changes and evidence
- Fixed workspace shell lifecycle so standalone catalog routes no longer retain the Learning/Analysis sidebar or dock.
- Fixed standalone audio dock to 54px and reserved scroll-wrapper space beneath it.
- Added a final-row scroll-clearance regression assertion. The first version of this new assertion failed because `scrollIntoView(block='end')` aligned the row to the viewport bottom without accounting for the fixed dock. This was a test setup error, not a confirmed UI defect. The test now scrolls to the actual document end and verifies the last card is above the dock.
- Latest final-row result: last card bottom 471px, dock top 834px, dock height 54px, wrapper bottom padding 160px, at document end: true.
- Downloaded and visually reviewed desktop/mobile home, Play menu, Settings, catalog, catalog detail, quiz, Learning Center and Analysis screenshots. No page/console errors were reported. Catalog detail has substantial empty space because the test fixture exposes a single song row; do not infer a broken layout from that alone.
- The home, Play menu, Settings and workspace styling are structurally consistent with the intended osu!Stable-inspired direction. Exact visual similarity remains unmeasured because the official pinned wiki screenshots are not proven captures from Stable 20260924.1 and are not matching same-viewport captures.

## Acceptance limits
- NOT RUN: real audio output; full quiz-answer lifecycle; multiplayer server connectivity and lifecycle.
- Exact osu!Stable client source commit and matching screenshot build remain unverified.
- >=90% visual similarity: NOT VERIFIED.
- Third-party cover-image availability is separate from layout acceptance.
- Do not merge PR #9 or promote Proto25 until remaining target-screen visual comparison and separate runtime acceptance are complete.

## Rollback
Return to `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`. Keep all Proto25 work isolated.