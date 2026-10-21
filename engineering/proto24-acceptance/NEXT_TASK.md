# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Immutable accepted baseline: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source commit: `a05c66401f0053d2c7bee53f5a965422edd8f9e9`.
- Successful workflow: [39536870515](https://github.com/murorachi/Amq-/actions/runs/39536870515).
- Artifact ID: `12318480861`; ZIP digest: `def95408d91797c5cdbc247c4275a217f5a6eeecdace2f4700f90aca6218d587`.
- Candidate size: 8,918,095 bytes.
- Candidate SHA-256: `0ae1692288d85c3d7750af365b9fcb60cd57744e47b979ab9cdef08ce7a30232`.
- Stage 24 remote head at verification: `6f51f1f0b53dc194524c0be1c86e5a94bf4c7493`; remote HTML, manifest and report verified.
- Static checks PASS; 18 browser assertions PASS; page/console errors 0.
- PR #9 remains open and unmerged. Do not merge it automatically.

## Completed in this checkpoint
- Main-menu and Play-menu cookie/menu geometry enlarged and guarded by browser assertions.
- Workspace shell route state and standalone catalog audio dock/scroll clearance fixed.
- Desktop Options sidebar widened to 340px; mobile remains 292px and no horizontal overflow.
- Latest desktop/mobile home, Play menu and Settings screenshots reviewed.
- Current UI is not pixel-perfect. Exact Stable source commit, reference capture build and >=90% similarity remain unverified.

## Next work, in order
1. Continue the reference audit on the remaining visible surfaces: compare Options sidebar hierarchy, Song Select/catalog structure and the top profile/player strip. Keep AMQ semantics intact; do not invent osu! beatmap controls or dummy settings.
2. Make one cohesive visual adjustment only where the screenshot evidence shows a material discrepancy. Preserve the existing routes and data flow.
3. Extend browser assertions for any changed geometry or interaction, including desktop and mobile bounds.
4. Run the full Stage 24 workflow; inspect the new report and screenshots, verify candidate size/SHA-256, and verify the remote Stage 24 HTML, manifest, TEST_REPORT and commit.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle as separate NOT RUN items until actually exercised.
6. Do not claim >=90% similarity without a matching reference build and viewport comparison.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until target-screen comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.
