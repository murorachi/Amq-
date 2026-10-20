# CURRENT STATUS — Proto25 UI Refactor

## Immutable accepted baseline
- Accepted Proto24 branch: `v82.85.30-proto24-accepted-delivery-02`.
- Accepted commit: `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Accepted HTML SHA-256: `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`.
- Production V82.82 and read-only V82.85.30 remain untouched.

## Current isolated Proto25 checkpoint

- Immutable accepted baseline remains `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`, HTML SHA-256 `c402b2af9e23fe3a1ddef2c78d2f63a79217547c1c3a607e911bacac47d9bc8e`. It was not modified.
- Current isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`; tested source head: `38978e192ccd7ea02e228c70974ecc3a96437a1d`.
- Latest verified workflow run: [39512028498](https://github.com/murorachi/Amq-/actions/runs/39512028498), SUCCESS. Static HTML parsing, unique IDs, inline JavaScript syntax, and all 17 Playwright assertions passed. Page errors: 0. Console errors: 0.
- Artifact: `proto25-stage24-ui-acceptance`, artifact ID `12305094086`; candidate size 8,913,254 bytes; SHA-256 `cf4a3a209b512ce30090596f9db618d0ef956d4ff3960970ea58af3f54e2efe9`. Downloaded artifact bytes match the checksum manifest exactly.
- Remote Stage 24 branch: `v82.85.30-proto25-ui-refactor-stage-24`, current commit `1f9727e8082b13a4bcafdd781fc226362e75783f`. Git tree confirms candidate size 8,913,254 bytes; remote checksum manifest and `TEST_REPORT.md` match the verified candidate/run.
- Root cause fixed: the workspace sidebar/dock could remain active when the actual view changed to catalog. Added an isolated route-lifecycle module, explicit standalone-route marker, CSS visibility scope and browser assertions. The catalog screenshot now shows the catalog instead of the stale Analysis workspace.
- Root cause fixed: the expanded audio dock covered too much of the catalog. Standalone routes now use a compact 54px dock, and the scroll wrapper reserves bottom space. Browser assertions verify dock height/player visibility and wrapper padding.
- Profile card gradient/name visibility, 84px desktop profile/player strips, 390px mobile width, dashboard dark palette, workspace separation, catalog route, Song Select overlay stacking and Play menu responsive layout are covered by the latest or prior successful browser assertions. Screenshots were downloaded and reviewed.
- NOT RUN: actual audio output, complete quiz-answer lifecycle, multiplayer server connectivity/lifecycle. Exact osu!Stable screenshot build identity remains unknown; >=90% visual similarity is NOT VERIFIED. Broken third-party cover imagery may still occur and is not treated as a layout pass.
- Do not merge PR #9 or promote Proto25 yet. Keep remaining target-screen visual review and runtime acceptance on the isolated branch.

## Next engineering task
1. Review Song Select, Settings/background dialog, quiz, Learning Center and Analysis screenshots for remaining clipping, hierarchy, focus and responsive issues.
2. Review the catalog screenshot after scrolling to the final rows to confirm fixed-dock clearance; investigate cover-image failures separately from layout.
3. Compare the target screens against pinned osu!Stable references and record concrete deltas. Do not claim a similarity percentage without matching reference captures.
4. Extend regression assertions only for observed failures, then rerun the full workflow and verify artifact, candidate size/hash, remote Stage 24 tree, manifest and report.
5. Keep audio output, full quiz lifecycle and multiplayer lifecycle marked NOT RUN until they are exercised.
