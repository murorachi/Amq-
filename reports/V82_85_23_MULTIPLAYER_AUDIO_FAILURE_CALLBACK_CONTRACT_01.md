# V82.85.23 multiplayer audio failure callback contract

## Scope

This stage adds a focused unit contract around the two currently identical `failed` callbacks inside `src/scripts/script_028.htmlpart`. It does not change production audio behavior and does not extract the callbacks yet.

## Why extraction is deferred

Both callbacks currently contain the same body, but capture local variables from separate async flows. A shared helper must preserve:
- watchdog cancellation;
- pending/preload failure routing through `tryNextAudio()`;
- active-media failure routing through `advanceActiveAudioV8261(id, a)`;
- stale callback behavior when the current pending song has changed.

The test proves current branches before any future refactor. It is not proof that a refactor is safe by itself; the contract must pass before and after a later extraction.

## Test cases

For each of the two source callbacks, the contract checks:
1. Pending audio failure clears the watchdog and advances the candidate.
2. Active audio failure clears the watchdog and invokes the active fallback with the expected song ID and media object.
3. A stale event clears its own watchdog but does not clear or advance the newer song's pending load.
4. Both callback bodies remain equivalent after whitespace normalization.

The test logs 20 counted assertions (18 branch assertions plus two global source-shape/equivalence assertions); it also checks brace balance while extracting both callbacks. The test is registered in the source-and-unit GitHub Actions job.

## Verification status

- Source change: test and workflow only; production script unchanged.
- Local execution: not run in this environment.
- GitHub Actions run `39211912490`: source-and-unit passed, including `Test multiplayer audio failure callback branches`; Firefox responsive passed. Browser-native-origin failed at the separate real-audio output assertion; the remaining listed browser acceptance steps passed.
- Browser audio output gate: still a separate unresolved failure. This stage does not weaken or replace it.

## Rollback

Remove `tests/unit/multiplayer_audio_failure_callback_contract.test.cjs`, remove its workflow step, and revert this report and checkpoint-document updates. No production code rollback is required.

## Next task

The callback contract passed. A shared factory was reviewed and deferred: the duplicate logic is small, and a production change would require updating fragment/release fingerprints and rebuilding the standalone candidate without a demonstrated functional gain. The next task is to diagnose Chromium audio output routing. CI evidence shows a connected Chromium client but no PulseAudio sink inputs while media playback time advances; the PCM monitor remains silent. Do not weaken the non-silent output gate.
