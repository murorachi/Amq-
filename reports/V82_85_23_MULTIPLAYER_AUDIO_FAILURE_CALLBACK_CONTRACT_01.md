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

Expected assertions: 18 across both callbacks. The test is registered in the source-and-unit GitHub Actions job.

## Verification status

- Source change: test and workflow only; production script unchanged.
- Local execution: not run in this environment.
- GitHub Actions: triggered by pushing this branch; result must be checked before claiming the contract passes.
- Browser audio output gate: still a separate unresolved failure. This stage does not weaken or replace it.

## Rollback

Remove `tests/unit/multiplayer_audio_failure_callback_contract.test.cjs`, remove its workflow step, and revert this report and checkpoint-document updates. No production code rollback is required.

## Next task

After the contract passes in CI, investigate a minimal shared callback factory only if it can retain the two lexical contexts without behavioral changes. Run the same contract and the multiplayer browser lifecycle suite before accepting such a refactor.
