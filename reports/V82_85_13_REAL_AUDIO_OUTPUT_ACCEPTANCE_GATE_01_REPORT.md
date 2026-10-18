# V82.85.13 Real Audio Output Acceptance Gate

## Purpose

Add a separate acceptance gate for browser audio behavior. Existing quiz lifecycle tests replace `HTMLMediaElement` methods and are useful for deterministic state-machine contracts, but they do not prove that Chromium decodes media or emits audible samples.

## Test method

- Build and load the standalone V82.85.12 candidate in Chromium.
- Use the native `HTMLMediaElement` implementation and a deterministic PCM16 WAV payload returned only for the second AMQ mirror host. The first mirror host is deliberately aborted so the production fallback handler is exercised.
- Start PulseAudio's null sink and capture its monitor stream as raw stereo PCM. This measures browser audio output instead of treating a `playing` event as proof of sound.
- Exercise the app's `NotAllowedError` handling with a deterministic policy shim until a real user gesture, then restore native `play()` for actual decoding/output. Headless Chromium does not enforce autoplay flags consistently across runner images, so the test does not mislabel a runner-specific policy result as a product failure.
- Check autoplay rejection/manual retry, first-mirror failure and fallback progression, actual playback-time advancement, pause/resume, the quiz playback gate, answer-reveal continuity, native `ended`, and playback cleanup after leaving the quiz.
- Report peak and RMS from captured output; silent capture is a hard failure.
- The rejection path is deterministic policy simulation, not proof that the runner's native autoplay policy itself rejects every attempt. The manual retry and subsequent playback use native media APIs.

## Scope and limits

This is a real browser decoder/output-path test with deterministic media bytes. It does **not** test the availability, licensing, encoding, or audio quality of live AniSongDB/AMQ production media URLs. Network access to external sites remains blocked; only the known mirror requests are intercepted by the harness. It does not prove physical-speaker output, because CI captures a virtual PulseAudio sink.

Production-domain storage policy remains a separate, unverified gate. V82.82 and its immutable fingerprint remain unchanged.

## Acceptance criteria

All named browser assertions must pass, no uncaught page errors may occur, and the PulseAudio monitor must capture at least one second of PCM with peak >= 1000 and RMS >= 150. Missing audio tools, failed capture, silent output, or an unhandled browser error fail the job rather than being reported as skipped.

## Rollback

Return to `v82.85.12-multiplayer-leave-poll-race-fix-01`. This checkpoint adds test/workflow/reporting code only; it does not modify production runtime fragments or the standalone product baseline.
