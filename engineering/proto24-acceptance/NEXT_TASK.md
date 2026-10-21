# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source head: `d37792fdf17b40dfb7afbcae43a2de7598860f02`.
- Latest successful workflow: [39530034146](https://github.com/murorachi/Amq-/actions/runs/39530034146).
- Artifact ID: `12314713448`; ZIP digest: `ddf0dc13028cebc5a6cf05a6bcab32c66e33df1361cf4f3ac4c71c9978ab26de`.
- Candidate size: 8,917,750 bytes.
- Candidate SHA-256: `65ff22b43383c142153cab4a403e5c2ab8d0839f685d07f75705865f2b2a82c9`.
- Stage 24 remote head at verification: `7687521f27f0c0ad2afa20cbac3680511d9b2caf`; remote HTML size, manifest and test report verified.
- Static checks PASS; 18 browser assertions PASS; page errors 0; console errors 0.
- Accepted rollback baseline remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next engineering objective: finish target-screen comparison
1. Review the Options/Settings overlay against the pinned official screenshot. The AMQ drawer is narrower and has fewer options by design; adjust width and hierarchy only if it improves the composition without inventing osu! controls.
2. Review mobile screenshots after the desktop cookie/menu scaling. Confirm no horizontal overflow, no clipped logo/actions and the mobile help text remains reachable.
3. Compare the remaining visible surfaces against pinned official references and record concrete deltas in `OSU_STABLE_REFERENCE_AUDIT.md`. Do not claim >=90% similarity without matching viewport/build evidence.
4. Keep AMQ-specific catalog, quiz, Learning Center and Analysis behavior intact. The official Song Select screenshot is not the same data model as the AMQ catalog; do not invent beatmap features to force a superficial match.
5. After the next source change, rerun the complete workflow. Download and inspect the artifact/report/screenshots, verify static/browser results, candidate size/SHA-256, Stage 24 remote tree, checksum manifest and TEST_REPORT.
6. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle as separate NOT RUN items until actually exercised.

## Verified improvements
- Main menu cookie: 560px desktop diameter; 520px primary action blades at 76px height; logo overlaps the blades and is vertically centered more closely to the Stable reference.
- Play submenu cookie: 500px desktop diameter; three 520px-wide, 92px-high blades; implementation-specific desktop help text hidden to prevent overlap. Required labels remain `Single Player`, `Multiplayer`, `Back`.
- Catalog final-row clearance passes at document end: last card bottom 471px, dock top 834px, dock height 54px, wrapper bottom padding 160px.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until target-screen comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.