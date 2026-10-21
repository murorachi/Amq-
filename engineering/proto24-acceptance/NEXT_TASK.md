# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Immutable accepted baseline: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source commit: `71d7f398d02a3044deb35f39cf5025e4a990c1ec`.
- Successful workflow: [39538953347](https://github.com/murorachi/Amq-/actions/runs/39538953347).
- Artifact ID: `12318299844`; ZIP SHA-256: `3ab2333d7aac2456d31067bdf6745b7803d5af97d4968a6893c3783765106302`.
- Candidate size: 8,921,697 bytes; SHA-256: `8df7f9f529bed5eaeb2f8a713dbfe24af628ce625a270add59d81edd6e7f2c69`.
- Stage 24 remote branch head after publication: `ffd9fd2813601a2351e4bf77fc5c9957c1c265bb`; remote HTML, manifest and TEST_REPORT verified.
- Static checks PASS; 18 browser assertions PASS; page/console errors 0.
- PR #9 remains open and unmerged. Do not merge it automatically.

## Completed in Stage 32
- Stage 31 profile/player hierarchy and responsive dimension checks passed.
- Added a subtle CSS triangular pattern to the main-menu and Play-menu cookies based on the pinned official Stable Wiki screenshot; did not embed the reference screenshot.
- Added browser assertions for the home and Play cookie background layers.
- Workflow passed; candidate SHA-256 matches the downloaded manifest; remote HTML, manifest and TEST_REPORT verified.

## Next work, in order
1. Continue the pinned-reference audit of the main-menu cookie/background and the catalog/Song Select composition. Separate real layout mismatches from AMQ's genuinely different data model.
2. Make only one cohesive, evidence-backed visual adjustment at a time. Do not invent osu! beatmap controls, fake score panels, or settings that AMQ does not support.
3. Extend desktop/mobile assertions for any changed geometry or interaction.
4. Run the full Stage 24 workflow; inspect the new report and screenshots; verify candidate SHA-256 and remote HTML, manifest, TEST_REPORT and commit.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle marked NOT RUN until actually exercised.
6. Do not claim >=90% similarity without a matching reference build and viewport comparison.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.


## Next task after latest Play-screen refinement — 2026-10-21

Latest workflow [39539309957](https://github.com/murorachi/Amq-/actions/runs/39539309957) is PASS, and the candidate SHA/remote manifest were verified. The Play menu now has a more Stable-like radial-ray background, cookie triangle texture and italic text. Do not rerun unchanged source.

Priority order:
1. Audit the current home header/profile/jukebox and main-menu geometry against the official Stable reference. The latest Play menu is closer, but logo typography/proportions and top-strip composition still differ.
2. Audit the catalog and catalog-detail screens against the official Stable Song Select reference while preserving AMQ's collection/filter semantics. Separate genuine visual gaps from intentional product differences; do not fabricate beatmap-only controls.
3. Make one cohesive, evidence-backed visual change set, add browser assertions for changed regions, and inspect the new desktop/mobile screenshots after the Stage 24 workflow.
4. Keep the similarity estimate qualitative (currently ~70–75% across the current UI scope); do not claim >=90% without a matching Stable build and viewport comparison.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle marked NOT RUN until directly exercised.
6. Keep PR #9 unmerged and the accepted Proto24 baseline immutable until reference and runtime acceptance are complete.
