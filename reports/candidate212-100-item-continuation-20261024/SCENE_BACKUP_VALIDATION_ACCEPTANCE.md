# Candidate212 Scene-background Backup Validation Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, opaque-origin page with IndexedDB blocked
Source: readable reconstructed Candidate212; validation changes tested in a disposable fixture only. No Candidate HTML modified.

## Baseline results

The existing `window.__aniSceneBackgroundsV1.prepareBackupRestore()` correctly rejects malformed base64 and duplicate scene entries, and accepts a valid 1×1 PNG backup. However, it accepts both:

- Four arbitrary text bytes labelled as `image/png` (`dGVzdA==`).
- A valid PNG whose width is 8193 px, above the existing 8192 px file-input limit.

The restore validator checks MIME label, base64 syntax, byte size and scene references, but does not decode the image or enforce the same dimensions/pixel-count limits as `readSceneFile()`. A malformed or oversized image can therefore pass preflight and be written to IndexedDB by the restore path if storage is available.

Baseline results:
- PASS: valid PNG backup accepted.
- PASS: malformed base64 rejected.
- PASS: duplicate scene rejected.
- FAIL: invalid image bytes accepted.
- FAIL: oversized image dimensions accepted.
- PASS: no uncaught page errors.

## Disposable prototype fix

The prototype creates a Blob after base64 decoding, calls `createImageBitmap(blob)` to verify that the bytes are actually an image, and applies the same `MAX_DIMENSION` and `MAX_PIXELS` checks used by file input before adding the Blob to the prepared asset map. The bitmap is closed in a `finally` block.

Prototype results:
- PASS: valid 1×1 PNG accepted.
- PASS: invalid image bytes rejected with `背景圖片內容無法解碼。`.
- PASS: 8193 px image width rejected with the dimension-limit error.
- PASS: malformed base64 rejected.
- PASS: duplicate scene rejected.
- PASS: no uncaught page errors.

## Limits

The browser environment has an opaque origin and denies native IndexedDB access. Therefore `exportBackup()`, actual IndexedDB writes, reload persistence and `restoreBackup()` transaction behavior remain BLOCKED / NOT RUN. This report validates only the preflight data preparation path. No source change was applied because Candidate212's original bytes are unavailable; the readable reconstruction is 26 bytes shorter than the recorded baseline.