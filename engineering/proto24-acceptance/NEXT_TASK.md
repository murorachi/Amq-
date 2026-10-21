# NEXT TASK — Proto25 UI Refactor

## Verified checkpoint to resume from
- Immutable accepted baseline: branch `v82.85.30-proto24-accepted-delivery-02`, commit `39d250cf5a269a0e2bf8f514474584bcc864f599`.
- Isolated source branch: `v82.85.30-proto25-ui-refactor-work-03`.
- Latest tested source commit: `3c1ea186f7661f6312ee263800a45f34111a40e8`.
- Successful workflow: [39538605138](https://github.com/murorachi/Amq-/actions/runs/39538605138).
- Artifact ID: `12318249366`; ZIP SHA-256: `474f338638bbcb2acb6c2fe0970a751344b83dd0bd8beaaeaa4e1bae9df137d2`.
- Candidate size: 8,920,621 bytes; SHA-256: `a36cedd3fc2f2ca612e7f5aaa8708b80924bfe912b47094812174651989883ac`.
- Stage 24 remote branch head after publication: `95f17580460b1dd1e17a7b069a1dd27f67c49576`; remote HTML, manifest and TEST_REPORT verified.
- Static checks PASS; 18 browser assertions PASS; page/console errors 0.
- PR #9 remains open and unmerged. Do not merge it automatically.

## Completed in Stage 31
- Refined profile/player typography and avatar sizing without changing AMQ data or actions.
- Added desktop/mobile assertions for avatar dimensions, profile-name size, PP value size, player caption and track title.
- Latest workflow passed; candidate hash matches its manifest; remote HTML, manifest and test report were verified.
- The accepted Proto24 baseline and production/read-only versions remain untouched.

## Next work, in order
1. Continue the Stable reference audit on the catalog/Song Select structure and the synthetic cookie/background artwork. Use the pinned official Wiki screenshots as qualitative references; exact Stable source commit and screenshot build remain unverified.
2. Choose one cohesive visual change only when the reference and existing AMQ semantics support it. Do not add fictional beatmap controls, dummy settings or dead-end navigation.
3. Extend browser assertions for any changed layout/interaction, including desktop and mobile bounds.
4. Run the full Stage 24 workflow, inspect screenshots and acceptance report, independently verify candidate SHA-256 and verify remote HTML, manifest, TEST_REPORT and commit.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle marked NOT RUN until actually exercised.
6. Do not claim >=90% similarity without a matching reference build and viewport comparison.

## Delivery safety
- Keep Proto25 changes isolated on the work branch and Stage 24.
- Do not merge PR #9 or promote Proto25 until remaining reference comparison and required runtime acceptance are complete.
- Do not overwrite the accepted Proto24 baseline. Roll back to `39d250cf5a269a0e2bf8f514474584bcc864f599` if an unresolved regression makes the candidate unsafe.


## Next task after Stage 24 browser acceptance — 2026-10-21

Stage 24 browser acceptance is now PASS at [run 39538605138](https://github.com/murorachi/Amq-/actions/runs/39538605138). The latest candidate is published to the isolated Stage 24 branch and its size/SHA-256 have been checked. Do not repeat this run unless source changes.

Priority order:
1. Perform a focused reference audit of the current desktop home, Play menu, Settings, catalog, catalog detail and mobile home against the pinned official osu! Wiki reference images. Record each visible mismatch by region; do not rely on memory or generic osu!-inspired styling.
2. Resolve the missing exact osu!Stable client build/screenshot identity if feasible. Do not substitute osu!lazer. Without a matching build and viewport, keep similarity as a qualitative estimate, not a pass/fail metric.
3. Make one cohesive, evidence-backed UI change set, preserving AMQ behavior and avoiding invented Stable-only controls/data.
4. Add or update assertions for affected regions, then run Stage 24 acceptance and inspect the newly generated screenshots/report. Verify the remote candidate SHA manifest and publication commit again.
5. Keep real audio output, full quiz-answer lifecycle and multiplayer server connectivity/lifecycle as NOT RUN until directly exercised.
6. Do not merge PR #9 or promote Proto25 until reference comparison and required runtime acceptance are complete. Keep accepted Proto24 baseline immutable.
