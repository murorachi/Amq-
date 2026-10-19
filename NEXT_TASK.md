# Next task: historical code technical-debt inventory (not more routine modularization)

Current branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Final acceptance closeout
1. Inspect the workflow after multiplayer is configured to run even if audio capture fails.
2. Record the audio capture issue as a known deferred CI gate; do not lower thresholds or ask the user to repeat real-device playback already confirmed.
3. Confirm source/unit and Firefox results remain green on the latest workflow.
4. Keep the immutable V82.82 baseline and V82.85.12 standalone candidate fingerprints documented.

## Next major phase
Start a read-only technical-debt inventory against the verified source:
- duplicated functions and conditions;
- obsolete compatibility/workaround branches;
- global state and multiple write paths;
- dead code candidates (prove dynamic references before removal);
- long mixed-responsibility functions and dependency clusters;
- high-risk boundaries around quiz/audio/storage/custom lists/multiplayer.
Rank findings by evidence, risk, expected benefit and regression-test coverage. Do not edit product logic during the initial inventory. Then choose the highest-value bounded refactor and add tests before changing it.

## Explicit stop condition
Do not continue extracting unrelated small helpers merely to increase module count. Modularization is sufficient for now unless the inventory finds a specific blocker.

## Rollback
The V82.85.17 helper extraction can be reverted independently from the workflow-only `if: always()` change. Never overwrite V82.82.
