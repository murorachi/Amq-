# NEXT TASK — Proto25 UI Refactor

## Current verified checkpoint
- Source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Source/test commit: `c9dc16520800a65dc9800fd737ccfe47b5426d32`.
- Latest successful run: [39506207073](https://github.com/murorachi/Amq-/actions/runs/39506207073).
- Artifact ID: `12302494868`.
- Candidate size: 8,906,398 bytes.
- Candidate SHA-256: `63a771042fde17530245ef1c3ba56a5786799c873373c1314fa9856ebf65e29f`.
- Remote Stage 24 branch publish commit: `1e0962510ce1eec042a15b93801e77228ae2b35f`.
- Static checks PASS; all 17 browser checks PASS; page errors 0; console errors 0.
- Accepted rollback baseline remains Proto24 branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.

## Next task: complete the target-screen visual pass
1. Inspect the current desktop/mobile screenshots and compare home, Play menu, catalog, Song Select and Options/Settings against the pinned official osu!Stable wiki screenshots.
2. Review Learning Center and Analysis workspace composition, sidebar/dock spacing, legacy panel boundaries, fixed audio dock behavior and keyboard/focus states. Group related issues and fix their root CSS causes.
3. Preserve all existing AMQ routes, data and playback logic. Never add dead controls or replace the Stable target with osu!lazer UI/source.
4. Add only targeted regression assertions for observed layout or interaction failures; preserve the 17 existing checks.
5. Rebuild and rerun static/browser acceptance after each coherent UI group. Inspect fresh desktop/mobile screenshots and verify the remote candidate, manifest, exact byte size, SHA-256 and report.
6. Keep >=90% visual similarity marked NOT VERIFIED until matching reference captures and a measured comparison support it.
7. Keep real audio output, complete quiz-answer lifecycle and multiplayer server lifecycle marked NOT RUN until genuinely exercised.

## Delivery rules
- Do not merge PR #9 or promote Proto25 while visual review or required runtime checks remain incomplete.
- Update `CURRENT_STATUS.md`, `BASELINE.md` and `NEXT_TASK.md` after each verified stage.
- Keep all changes isolated on the Proto25 work/stage branches. If a regression cannot be fixed safely, return to the accepted Proto24 baseline.
