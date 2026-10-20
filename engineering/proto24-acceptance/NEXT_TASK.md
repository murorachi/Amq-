# NEXT TASK — Proto25 UI Refactor

## Current verified checkpoint
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Source/test commit: `0efd88be9a8ab65da1c8a14db9aefb0b0c53e1b5`.
- Successful run: [39507319150](https://github.com/murorachi/Amq-/actions/runs/39507319150).
- Artifact ID: `12303243319`.
- Candidate size: 8,907,671 bytes.
- Candidate SHA-256: `04d27d56000a8e6d73858b6ff125edcff0669fdef8e3b78e55479460fdccb7c0`.
- Stage 24 remote publish commit: `4487ebb43c3c512489384c30c82fd5a1728de832`.
- Static checks PASS; all 17 browser checks PASS; page errors 0; console errors 0.
- Accepted rollback baseline remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next task: complete target-screen visual review
1. Start from successful run `39512028498`, artifact `12305094086`, candidate SHA-256 `cf4a3a209b512ce30090596f9db618d0ef956d4ff3960970ea58af3f54e2efe9`. Do not repeat unchanged tests without a code change.
2. Review Song Select, Settings and scene-background dialog, quiz, Learning Center and Analysis screenshots at desktop/mobile sizes. Identify related issues as a coherent UI group and fix root selectors in modular sources.
3. Review catalog after scrolling to the final rows. The dock is compact (54px) and the wrapper has 90px bottom padding; confirm last-row content can scroll fully above the dock.
4. Compare screens against pinned osu!Stable references and record concrete geometry, hierarchy, spacing, colors, hover/focus and modal-stacking differences. Do not claim >=90% similarity without matching screenshots.
5. Rerun static checks and the complete browser acceptance after changes. Download the artifact, inspect screenshots/report, verify candidate hash/size and read back the remote Stage 24 HTML tree entry, checksum manifest and TEST_REPORT.
6. Keep real audio output, full quiz-answer lifecycle and multiplayer server lifecycle as separate NOT RUN items until actually exercised.

## Delivery safety
- Latest successful workflow run: `39512028498`; tested source head `38978e192ccd7ea02e228c70974ecc3a96437a1d`.
- Artifact ID: `12305094086`; candidate size 8,913,254 bytes; SHA-256 `cf4a3a209b512ce30090596f9db618d0ef956d4ff3960970ea58af3f54e2efe9`.
- Remote Stage 24 branch commit: `1f9727e8082b13a4bcafdd781fc226362e75783f`; remote HTML size and manifest match.
- Keep Proto25 changes isolated on `v82.85.30-proto25-ui-refactor-work-03` and Stage 24. Preserve accepted Proto24 baseline `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Do not merge PR #9 or promote until the target-screen visual review and separate runtime acceptance are complete. Roll back to the accepted Proto24 branch if a regression cannot be resolved safely.
