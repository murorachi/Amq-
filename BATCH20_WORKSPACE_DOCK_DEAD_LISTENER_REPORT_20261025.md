# Batch 20 — Workspace dock dead listener cleanup

Source Candidate314 SHA-256 e3e2afb98574aea5db9bc5ac94eaeba809b6ed3416999657463964eefab05d17. Candidate315 is 1,647,133 bytes, SHA-256 5c92830eeb519105d06b8cf1a71f3717bf8b4c852cd7be4da7c5622265958621; 339 bytes removed.

Removed the per-button [data-ws] click listener in Candidate70. Candidate77's document capture listener calls stopImmediatePropagation before the event reaches target phase, so the listener was unreachable. Preserved the Back button and Escape handler.

Tests: PASS JS syntax 68/68, CSS parse, duplicate IDs; isolated Chromium open, Escape-close and toggle behavior match before/after. Full-app E2E NOT RUN. Candidate315 not promoted; formal baseline Candidate302 unchanged. Candidate HTML remote upload/hash NOT VERIFIED.
