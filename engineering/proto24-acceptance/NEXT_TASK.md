# NEXT TASK — Proto25 UI Refactor

## Current verified checkpoint
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Source/test commit: `9959cdffeb8f2b89cf1ece64ac0e7aaaa61cdb0f`.
- Successful run: [39506880023](https://github.com/murorachi/Amq-/actions/runs/39506880023).
- Artifact ID: `12304256327`.
- Candidate size: 8,906,398 bytes.
- Candidate SHA-256: `63a771042fde17530245ef1c3ba56a5786799c873373c1314fa9856ebf65e29f`.
- Stage 24 remote publish commit: `97b5d54085c9f5a6ee3f7350cb77f3ac567dc978`.
- Static checks PASS; all 17 browser checks PASS; page errors 0; console errors 0.
- Accepted rollback baseline remains `v82.85.30-proto24-accepted-delivery-02` at `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next task: visual comparison and remaining UI gaps
1. Compare fresh desktop/mobile home, Play menu and Settings screenshots with the pinned official osu!Stable wiki references. Write down concrete geometry, hierarchy, color, icon and spacing differences before changing styles.
2. Review catalog, Song Select, Learning Center and Analysis screenshots for clipping, fixed-dock overlap, hierarchy, keyboard focus and responsive behavior.
3. Group related fixes at the modular CSS layer. Keep styles inside the active `<style>` block and preserve all AMQ route, data and playback behavior.
4. Keep the 17 existing assertions and add only checks for observed regressions. Run static and full browser acceptance after each coherent UI group.
5. Inspect fresh screenshots and verify remote candidate, manifest, report, byte size and SHA-256 after each successful stage.
6. Do not claim >=90% visual similarity until matching reference captures and measured comparison support it.
7. Keep actual audio output, full quiz-answer lifecycle and multiplayer server lifecycle marked NOT RUN until genuinely exercised.

## Delivery safety
- Do not merge PR #9 or promote Proto25 while target-screen review or required runtime tests remain incomplete.
- Update `CURRENT_STATUS.md`, `BASELINE.md` and `NEXT_TASK.md` after each verified stage.
- Roll back to the accepted Proto24 branch if a regression cannot be fixed safely.
