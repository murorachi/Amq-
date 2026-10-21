# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source head: `63451f4719f092587b02f2f30efa8bc25d6ec1c2`.
- Latest successful workflow: [39527781872](https://github.com/murorachi/Amq-/actions/runs/39527781872).
- Artifact ID: `12313869495`; ZIP digest: `fa0772649634f31be25dfda64ea5452a29d400617f2fa49dbf6b1662172875d1`.
- Candidate size: 8,916,086 bytes.
- Candidate SHA-256: `5d475770dc4ca8843fbb0562de8615b896a3355f692ff9a30753c3bcc3426b78`.
- Stage 24 remote head: `ab4e4d14eb0b9e3533307709e7e226bb7aecd6b8`; remote HTML size, manifest and test report verified.
- Static checks PASS; 18 browser assertions PASS; page errors 0; console errors 0.
- Accepted rollback baseline remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next engineering objective: evidence-led osu!Stable visual comparison
1. Use the pinned official wiki screenshots at commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50` for Main menu, Play menu, Song Select and Options. Record viewport dimensions and concrete differences in geometry, hierarchy, logo scale/placement, action shape, spacing, colors, overlays and focus states.
2. Compare only equivalent screen states. The AMQ catalog/detail and Learning/Analysis workspaces are AMQ-specific and should be judged for coherent styling/usability, not treated as osu! screens.
3. Fix only concrete observed issues as a related UI group. Keep AMQ handlers, native storage, quiz flow and existing routes intact. Do not claim >=90% similarity without a repeatable same-viewport comparison method and evidence.
4. Re-run the complete workflow after source changes. Download and inspect the new artifact, machine-readable report and screenshots; verify static/browser results, size/SHA-256, Stage 24 remote tree, checksum manifest and test report.
5. Continue separate runtime acceptance for real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle. Keep each marked NOT RUN until actually exercised.

## Verified catalog regression
The final catalog row now clears the fixed audio dock at the document end: last card bottom 471px, dock top 834px, dock height 54px, wrapper bottom padding 160px. The initial test failure was caused by using `scrollIntoView(block='end')`, which ignores fixed-dock obstruction; the test was corrected to scroll to the actual document end and then passed.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until the evidence-led reference comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.