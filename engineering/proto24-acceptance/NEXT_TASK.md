# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Immutable accepted baseline: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source commit: `452a7e2859ce9e1a118b60d5a9af1d38a84998e6`.
- Successful workflow: [39540608714](https://github.com/murorachi/Amq-/actions/runs/39540608714).
- Artifact ID: `12318779090`; ZIP SHA-256: `0e1f91d162e6ea0dd6a1402dcf0268c9a33333f1596bcad286b02e9b16bf1c93`.
- Candidate size: 8,926,249 bytes; SHA-256: `6e1a559fc7f6ab7602b66f12a25b148730a326181ff90680e72ef2260180729a`.
- Stage 24 remote branch head after publication: `41ad1a5cec439b4dd5af264edf85ebbc38e88073`; remote HTML, manifest and TEST_REPORT verified.
- Static checks PASS; 18 browser assertions PASS; page/console errors 0.
- PR #9 remains open and unmerged. Do not merge it automatically.

## Completed in Stage 36
- Reduced the desktop legacy header strip from its previous vertical footprint and moved the profile/player row from y=77px to y=41px.
- Added a desktop browser assertion for the top frame/profile/player y-coordinates.
- Browser acceptance passed; downloaded candidate hash matches its manifest; remote HTML, manifest and test report verified.

## Next work, in order
1. Continue the pinned-reference audit of catalog card presentation and the remaining background/cookie differences. Preserve AMQ catalog semantics; do not add fictional beatmap controls, rankings or settings.
2. Improve only the existing cover/title/metadata hierarchy where the screenshot demonstrates a real discrepancy. Keep image failures graceful and do not substitute fake artwork.
3. Extend browser assertions for changed geometry or interaction, including desktop/mobile bounds and fixed audio dock clearance.
4. Run the full Stage 24 workflow, inspect screenshots and acceptance report, verify candidate SHA-256 and remote HTML, manifest, TEST_REPORT and commit.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle marked NOT RUN until actually exercised.
6. Do not claim >=90% similarity without a matching reference build and viewport comparison.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.
