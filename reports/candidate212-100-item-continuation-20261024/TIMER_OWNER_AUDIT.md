# Candidate212 Timer Owner and Workspace-cycle Audit

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: reconstructed Candidate212 with timer API instrumentation. No source modified.

## Runtime test

Instrumented `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`, `requestAnimationFrame` and `cancelAnimationFrame`. After startup and a 5-second settling period, opened and closed the custom-list, learning-center, quiz and multiplayer panels three times each (12 transitions), then waited another second.

- PASS: no unbounded interval growth; 7 intervals were created in total, 4 were cleared, and 3 remained active at the end.
- PASS: active requestAnimationFrame callbacks settled to 0.
- PASS: pending one-shot timers rose during first-time lazy initialization, then were cleared/fired; no uncaught page errors occurred.
- FAIL / requires lifecycle decision: three recurring intervals remain active after the workspace panels are closed.

## Remaining active interval owners

1. `v82-known-audit-fixes`: `window.setInterval(showElapsed, 100)`; runs `showElapsed()` every 100 ms for the page lifetime.
2. `v82-34-multiplayer-ui`: `setInterval(updateTimerUi, 100)`; runs every 100 ms for the page lifetime, although `updateTimerUi()` returns when the multiplayer phase is not running/paused.
3. `v82-34-multiplayer-ui`: `setInterval(heartbeat, 1800)`; runs every 1.8 seconds for the page lifetime, although `heartbeat()` returns when no multiplayer session exists or the document is hidden.

The multiplayer module's separate `startPoll()` uses `state.pollTimer` and `stopPoll()` clears it; this part is lifecycle-scoped. Other initialization polling intervals inspected in the same source have bounded retry/clear paths.

## Interpretation

There is no evidence of recurring interval *growth* during the 12 workspace transitions, but the three intervals above persist when their corresponding workspace is closed. The heartbeat may be intentional when a multiplayer session must remain alive outside its panel; this needs an explicit lifecycle policy. The 100 ms elapsed/UI refresh intervals appear candidates for activation only while their relevant workspace/session is active.

Do not delete the heartbeat blindly. After byte-preserving baseline access is restored, decide whether multiplayer sessions should remain alive while their workspace is closed, then scope the UI refresh intervals to the appropriate lifecycle and verify teardown/re-entry.

## Integrity limits

This is a reconstructed-source runtime audit. It does not test native file launch, actual multiplayer room sessions, server heartbeat behavior, or real audio. The reconstruction is 26 bytes shorter than the recorded Candidate212 baseline; no source change was applied.