# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Immutable accepted baseline: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source commit: `bf332b5cf4ac4e089d689e9ac9614cc38b11b167`.
- Successful workflow: [39539309957](https://github.com/murorachi/Amq-/actions/runs/39539309957).
- Artifact ID: `12319085625`; ZIP SHA-256: `bb8aeb68a77ea862cc75febe6903b852030ab8e452f41ac527c592b1b61a8c76`.
- Candidate size: 8,923,325 bytes; SHA-256: `0ff2bc155b7953bce29ad43209bb02cc94f2aa992e614670762ce0bf0e0c38fd`.
- Stage 24 remote branch head after publication: `ba12305759ed916dd69f42e38646505be84a5710`; remote HTML, manifest and TEST_REPORT verified.
- Static checks PASS; 18 browser assertions PASS; page/console errors 0.
- PR #9 remains open and unmerged. Do not merge it automatically.

## Completed in Stage 33
- Refined profile/player header and added responsive assertions.
- Added triangular facets to the home and Play cookies.
- Added italic typography for the primary home and Play actions and subtle radial-ray backgrounds based on the pinned official osu!Stable Wiki screenshots.
- Browser acceptance passed, and the candidate hash matches its manifest; remote candidate, manifest and test report verified.

## Next work, in order
1. Continue the pinned-reference audit of Song Select/catalog structure. The reference has a skin-driven background, beatmap cards and ranking panel, while AMQ's catalog has different semantics. Preserve AMQ functionality and improve only the transferable hierarchy, spacing and visual grouping.
2. Avoid fake beatmap controls, dummy ranking data or settings that AMQ does not support.
3. Extend desktop/mobile assertions for any changed geometry or interaction.
4. Run the full Stage 24 workflow; inspect screenshots and acceptance report; verify candidate SHA-256 and remote HTML, manifest, TEST_REPORT and commit.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle marked NOT RUN until actually exercised.
6. Do not claim >=90% similarity without a matching reference build and viewport comparison.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.
