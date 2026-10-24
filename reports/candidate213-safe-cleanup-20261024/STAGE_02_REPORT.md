# Candidate213 Safe Cleanup Checkpoint

Date: 2026-10-24
Branch: `amq-candidate213-safe-cleanup-20261024`

## Source integrity
- Candidate212 source size: 9,352,632 bytes.
- Candidate212 SHA-256: `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952` (freshly computed; matches recorded baseline).
- Candidate213 local artifact: `amq_learning_tool_v82_85_46_candidate213_safe_dead_code_cleanup_20261024.html`.
- Candidate213 size: 9,352,274 bytes.
- Candidate213 SHA-256: `e409fcef642224e27d53baf0bc830e2ca34d32a4f38e6394891fb6ff4d2d9375`.
- Parent source and a byte-identical rollback copy remain unchanged.

## Changes
1. Removed `candidate84-workspace-merge-dashboard`: relabel-only script that renamed the analysis entry/title to “資料品質”. It did not implement an independent data-quality workflow.
2. Removed `candidate105-marker`: unreferenced `document.documentElement.dataset.candidate = "105"` marker. Exact-reference scan found no reader or matching selector.
3. Updated the root candidate marker and title to Candidate213. No other intentional behavior changes.

## Validation
- PASS: exact parent bytes and SHA-256.
- PASS: parent JavaScript syntax 68/68; CSS 108 blocks, zero parse errors.
- PASS: Candidate213 JavaScript syntax 66/66; CSS 108 blocks, zero parse errors.
- BLOCKED: browser launch. Chromium rejected file navigation with `net::ERR_BLOCKED_BY_ADMINISTRATOR`; local HTTP server was unreachable.
- NOT RUN: native storage reload, actual audio, IndexedDB Blob save/restore, live import APIs, full route interactions and pixel comparison.
- BLOCKED: local HTML upload/remote SHA validation; available GitHub connector actions accept text content but expose no local-file upload action. No remote HTML upload is claimed.

## Rollback
Use the byte-identical Candidate212 checkpoint, SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`. Candidate213 is a separate file and does not overwrite the baseline.
