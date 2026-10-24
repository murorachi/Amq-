# Candidate212 Cover Fallback Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: readable reconstructed Candidate212 with mocked Jikan and image routes. No source HTML modified.

## Scenario A: primary cover source fails, fallback succeeds

- Selected a real local song record using the existing playback API with autoplay disabled.
- Aborted external cover requests.
- Intercepted the delayed Jikan fallback request and returned a valid fallback cover URL.
- Intercepted that URL with a 1×1 PNG.

Results:
- PASS: Jikan fallback request was attempted.
- PASS: fallback image loaded (`naturalWidth=1`), cover became visible, and the current song title remained correct.
- PASS: no uncaught page errors.

## Scenario B: fallback service is rate-limited

- Intercepted Jikan fallback requests with HTTP 429 and aborted cover-image requests.

Results:
- PASS: fallback request was attempted.
- PASS: cover remained hidden instead of displaying a broken image.
- PASS: current song title remained available and no uncaught page errors occurred.

## Scope limits

These are controlled network-route tests, not live Jikan or cover-provider tests. They verify fallback control flow and failure presentation, but not provider availability, rate limits in production, CDN cache behavior, or real image quality. The source reconstruction is 26 bytes shorter than the recorded Candidate212 baseline; no source was modified.