# Candidate212 Observer Mount-cycle Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: readable reconstructed Candidate212 with in-memory storage and observer-constructor instrumentation. No source file modified.

## Test procedure
Instrumented `MutationObserver`, `ResizeObserver` and `IntersectionObserver` constructors, `observe()` and `disconnect()` before app scripts ran. Opened and closed the existing `custom-list`, `learning-center`, `quiz` and `multiplayer` panels three times each (12 transitions total). Recorded counts after startup, after the first custom-list mount, and after all transitions.

## Observed counts

| Observer | Startup created / active / observe calls | After first lazy mount | After 12 transitions |
|---|---:|---:|---:|
| MutationObserver | 47 / 46 / 47 | 49 / 48 / 49 | 49 / 48 / 49 |
| ResizeObserver | 2 / 2 / 3 | 2 / 2 / 3 | 2 / 2 / 3 |
| IntersectionObserver | 1 / 1 / 1 | 2 / 2 / 181 | 2 / 2 / 181 |

## Results
- PASS: after the first lazy workspace mount, observer instance counts, active counts and observe-call counts remained stable through the remaining 11 workspace transitions.
- PASS: the single shared workspace panel closed, the Song Select route remained active, and no uncaught page errors occurred.
- Needs owner tracing: the first custom-list mount created two additional MutationObservers and one IntersectionObserver, with the latter observing 180 additional targets. This is consistent with one-time song-row/cover lazy initialization, but the exact observer owners and target lifetimes have not been proven by this instrumentation.
- NOT RUN: detached-target leak detection, callback activity after teardown, timer/requestAnimationFrame owner tracing, browser-native persistence and repeated navigation away from Song Select.

## Interpretation
The repeated workspace transitions do not show unbounded observer growth after first-time lazy initialization. This does **not** prove all existing observers are leak-free: 48 MutationObservers and 2 IntersectionObservers remained active at the final measurement. Their owners, targets and intended lifetime still require call-site tracing and teardown tests.

## Integrity limit
The source reconstruction is 26 bytes shorter than the recorded Candidate212 baseline. No executable source change or release candidate was created.