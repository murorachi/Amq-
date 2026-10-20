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

## Next task: visual comparison and remaining UI gaps
1. Compare home, Play menu and Settings screenshots with pinned official osu!Stable wiki references. Record geometry, hierarchy, color, icon and spacing differences before changing styles.
2. Review catalog, Song Select, Learning Center and Analysis screenshots for clipping, fixed-dock overlap, hierarchy, keyboard focus and responsive behavior.
3. Group related fixes at the modular CSS layer. Keep styles inside the active `<style>` block and preserve AMQ route, data and playback behavior.
4. Keep the 17 existing assertions and add only checks for observed regressions. Run static and full browser acceptance after each coherent UI group.
5. Inspect fresh screenshots and verify remote candidate, manifest, report, byte size and SHA-256 after each successful stage.
6. Do not claim >=90% visual similarity until matching reference captures and measured comparison support it.
7. Keep actual audio output, full quiz-answer lifecycle and multiplayer server lifecycle marked NOT RUN until genuinely exercised.

## Delivery safety
- Do not merge PR #9 or promote Proto25 while target-screen review or required runtime tests remain incomplete.
- Update `CURRENT_STATUS.md`, `BASELINE.md` and `NEXT_TASK.md` after each verified stage.
- Roll back to the accepted Proto24 branch if a regression cannot be fixed safely.
