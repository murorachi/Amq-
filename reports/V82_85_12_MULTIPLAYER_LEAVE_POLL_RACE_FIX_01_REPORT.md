# V82.85.12 Multiplayer Leave / Stale Poll Race Fix

## Baseline and version identity

- Base branch: `v82.85.11-firefox-responsive-acceptance-01`
- Base commit: `b82ba04f23ef5c28669d1cd90aa08bf5a91a7dd0`
- Immutable prior product: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- Versioned candidate: V82.85.12, 8,787,574 bytes, SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`

## Failure evidence

The V82.85.11 run at https://github.com/murorachi/Amq-/actions/runs/39172992441 completed source/build, unit tests, Firefox responsive smoke, and earlier Chromium browser suites successfully. The multiplayer lifecycle test timed out waiting for the room stage to remain hidden after leave.

The failing assertion was meaningful: `loadState()` awaited a room GET and then applied the response without checking whether the room session was still active. A poll started before leave could resume after `releaseLocal()` and render stale room state.

## Change

In `src/scripts/script_028.htmlpart`:
- Capture the active session object before starting the room-state request.
- Use that captured session's room code for the request.
- After the await, return without applying the response if `state.session` is no longer the same session.

This keeps the fix narrow and does not change the standalone product's V82.82 file.

## Regression test

In `tests/browser/multiplayer_lifecycle_acceptance.py`:
- The mock can hold one room GET response.
- The test waits until that poll is in flight, leaves the room, confirms local cleanup, then releases the stale response.
- It asserts the room stage remains hidden after the old response completes.
- Existing socket closure, session cleanup, reconnect, and final teardown assertions remain.

## Build and test status

- Candidate build fingerprint is recorded in `reports/FRAGMENT_MANIFEST.json`.
- The workflow builds `dist/amq_learning_tool_v82_85_12.html` and uploads it as artifact `AMQ_V82_85_12_MULTIPLAYER_LEAVE_POLL_RACE_FIX_01`.
- CI status: pending at report creation. This report does not claim the new regression or full suite has passed until the workflow log confirms it.
- The earlier fingerprint-discovery run reported 118 passed and 2 failed only because the expected-release fingerprint was still V82.82; both deterministic builds produced the same V82.85.12 hash. That run was not acceptance.

## Limits

The multiplayer harness uses deterministic mock REST, WebSocket, and media implementations. This validates lifecycle logic, not real audio playback or real multi-client behavior against a production backend. Production-origin storage and real-audio acceptance remain separate gates.
