# Candidate212 Volume Control Runtime Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: Candidate212 readable Library text export, with in-memory storage mock. No HTML file was modified or uploaded.

## Primary V44 path

- PASS: initial page creates exactly one `#v44VolumeControl`, one `#v44Volume`, and one `#v44VolumeValue`.
- PASS: starting value is 70; `aniQuizVolume` is read as `70` in the isolated store.
- PASS: setting slider to 35 writes `aniQuizVolume=35`, updates output to `35%`, and sets both `audioPlayer.volume` and `videoPlayer.volume` to 0.35 with `muted=false`.
- PASS: replacing the `audioPlayer` DOM node triggers the existing observer path; the replacement node inherits volume 0.35 and remains unmuted.
- PASS: setting slider to 0 writes `aniQuizVolume=0`, sets both audio/video volume to 0, and sets both elements muted.
- NOT RUN: actual sound output, real media seeking, remote audio playback, and page reload persistence.

## V82.35 fallback path

A controlled in-memory test removed the primary volume control immediately before the `v82-35-single-player-reveal-video` script executed, forcing its fallback builder to run.

- PASS: fallback creates exactly one volume control inside `#quizMediaControlsV835`; no duplicate volume IDs appeared in the live DOM.
- FAIL: setting fallback slider to 35 updates `aniQuizVolume=35` and `audioPlayer.volume=0.35`, but `videoPlayer.volume` remains 0.7.
- FAIL: setting fallback slider to 0 writes `aniQuizVolume=0` and sets `audioPlayer.volume=0`, but leaves `audioPlayer.muted=false`; `videoPlayer` remains at volume 0.7 and unmuted.
- PASS (static guard): the V82.35 script returns early when `#quizView` is absent, so it does not create the fallback toolbar outside the quiz workspace.

## Root cause

The fallback path duplicates volume event logic instead of using the primary controller. The primary path synchronizes audio and video and treats zero volume as mute; the fallback only updates the audio element and explicitly clears mute. This is a real behavior divergence, reproduced in Chromium with DOM/property assertions, not merely a static suspicion.

## Required fix once byte-preserving source access is available

1. Extract one shared `applyQuizVolume(value)` / volume-controller contract that clamps 0–100, persists `aniQuizVolume`, updates output text, synchronizes all active audio/video elements, and mutes when value is zero.
2. Make both the V44 primary builder and V82.35 fallback call the same handler rather than duplicating logic.
3. Keep the fallback as recovery until tests prove it is unreachable or safely redundant; do not simply delete it.
4. Re-run primary-path tests, injected fallback-path tests, audio-element replacement, repeated toolbar mount, and reload persistence on a native persistent origin.

## Test status

- PASS: primary volume property/storage behavior and replacement-audio observer behavior in isolated Chromium.
- FAIL: fallback video synchronization and mute-at-zero parity.
- NOT RUN: real sound output and native persistent storage reload.
- BLOCKED: native file/localhost navigation and external network in the current environment.