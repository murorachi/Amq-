# Next task: historical-code technical-debt inventory

Current branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Acceptance closeout
V82.85.17 required checks are complete with one explicitly deferred failure:
- PASS: source/unit, deterministic builds, extraction contracts, storage/custom-list/backup contracts.
- PASS: Firefox responsive.
- PASS: Chromium storage/custom-list, IndexedDB/quiz input, quiz suggestions, answer/playback lifecycle.
- PASS: multiplayer room/phase/live-draft/reconnect.
- DEFERRED/FAIL: CI real-browser PCM output capture reports peak=0 / RMS=0.0 despite non-silent PulseAudio self-test and successful native playback lifecycle. Do not lower the threshold; do not ask the user to repeat real-device playback already confirmed.

Reference run: https://github.com/murorachi/Amq-/actions/runs/39189657895

## Next major phase (do not continue routine modularization)
Perform a read-only audit of the verified source and produce a ranked inventory:
1. duplicated functions/conditions/normalization logic;
2. obsolete compatibility branches and historical workarounds;
3. global state and multiple mutation paths;
4. dead-code candidates, accounting for dynamic references;
5. long mixed-responsibility functions and dependency clusters;
6. high-risk boundaries: quiz/audio/storage/custom lists/multiplayer.

For each finding record evidence/location, dependency impact, risk, likely benefit, and existing test coverage. Do not modify product logic during the initial inventory. Then select the highest-value low-risk refactor and add tests before changing behavior.

## Explicit stop condition
Do not extract unrelated small helpers merely to increase module count. Modularization is sufficient unless the audit proves a specific blocker.

## Rollback
V82.85.17 extraction can be reverted independently. Never overwrite immutable V82.82.
