# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Immutable accepted baseline: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source commit: `1e665b3036df061c7d0f4ff86a040a4522ac77a3`.
- Successful workflow: [39540158570](https://github.com/murorachi/Amq-/actions/runs/39540158570).
- Artifact ID: `12318758166`; ZIP SHA-256: `a8a3ae0036f18c15bfe15cf65a097e8116382d159b0f250fdcca52ba43590f4d`.
- Candidate size: 8,925,711 bytes; SHA-256: `33ff46c97c50ae7f100a16d5a132a59c019e0e98a2819d402309ab835165e613`.
- Stage 24 remote branch head after publication: `125043fda3414ea3d87a0b42e61a29b197200e97`; remote HTML, manifest and TEST_REPORT verified.
- Static checks PASS; 18 browser assertions PASS; page/console errors 0.
- PR #9 remains open and unmerged. Do not merge it automatically.

## Completed in Stage 35
- Added and tuned CSS cookie texture and radial-ray background based on the pinned official Stable screenshots.
- Compactened catalog management/filter chrome so more collection cards are visible above the persistent audio dock.
- Added geometry and overflow assertions for catalog summary, batch controls, filters, tabs and section header.
- Traced the first failure to a measured batch-panel height of 253.5px; reduced padding and control dimensions. The rerun passed with a 225.5px panel and the grid top at 680.75px.
- Final workflow passed; candidate hash matches downloaded manifest; remote HTML, manifest and test report verified.

## Next work, in order
1. Continue the pinned-reference audit of catalog card presentation and the remaining background/cookie differences. Keep AMQ catalog semantics intact; do not add fictional beatmap controls, rankings or settings.
2. Prefer visual grouping, spacing, and existing cover/title metadata improvements over new features or data-model changes.
3. Extend browser assertions for any changed geometry or interaction, including desktop/mobile bounds and fixed audio dock clearance.
4. Run the full Stage 24 workflow, inspect screenshots and acceptance report, verify candidate SHA-256 and remote HTML, manifest, TEST_REPORT and commit.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle marked NOT RUN until actually exercised.
6. Do not claim >=90% similarity without a matching reference build and viewport comparison.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.
