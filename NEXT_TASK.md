# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Immediate acceptance gate
1. Inspect the push-triggered V82.85.17 workflow.
2. Require source/module fingerprints, deterministic V82.82 build, byte-identical V82.85.12 candidate, all unit contracts including the new alias-tooltip contract, and Firefox responsive acceptance to pass.
3. Inspect native-origin results separately from the known Chromium PCM capture failure.
4. Keep the audio gate yellow/deferred while captured peak/RMS remain zero; do not lower thresholds or repeatedly ask the user to retest audible playback already confirmed on their machine.

## Next modularization
After V82.85.17 acceptance, continue one bounded read-only helper at a time from `script_004.htmlpart`. Add the production-source contract first, preserve exact source bytes and insertion position, and avoid quiz lifecycle logic.

## Rollback
Revert V82.85.17 implementation commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` plus this documentation checkpoint. Do not overwrite the immutable V82.82 baseline.
