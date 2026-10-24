# Candidate219 cleanup + Song Select ownership checkpoint

- Branch: amq-candidate219-songselect-ownership-20261024
- Parent Candidate212: 9,352,632 bytes / SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952 (freshly verified).
- Candidate219 local artifact: amq_learning_tool_v82_85_46_candidate219_songselect_keyboard_completion_20261024.html, 9,352,752 bytes / SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea.

## Changes
- Deleted Candidate84 relabel-only script that changed Learning Analysis to the misleading “資料品質” label.
- Deleted Candidate105 no-reader document dataset marker.
- Removed duplicate list-level Song Select keyboard handler; retained one delegated document handler.
- Made batch checkbox rendering read the shared selection Set; moved the Set to the owning behavior IIFE scope.
- Routed Enter through the canonical row-selection/playback function.

## Evidence
- PASS: 66/66 executable JS blocks pass Node syntax check; 108 CSS blocks parse with zero errors.
- PASS: Chromium page.set_content() + in-memory storage shim has zero page errors and zero console errors.
- PASS: Song Select route opens and renders 180 rows.
- PASS: ArrowDown moves selected index 0 to 1 exactly once.
- PASS: isolated Enter test invokes listenSong once for a selected song different from the current song.
- PASS: selected checkbox remains checked after search-driven rerender; batch count remains 1.
- BLOCKED: Chromium file:// and localhost navigation unavailable in this environment.
- NOT RUN: native persistence, real media, background Blob backup/restore, live APIs, multiplayer lifecycle and pixel comparison.

## Remote HTML status
The local HTML was not uploaded because available GitHub connector actions do not accept a local filesystem path or file attachment for a 9.35 MB artifact. A read-back attempt for the expected dist path returned 404. No remote HTML upload/hash is claimed.

## Rollback
Candidate215 SHA-256 4d57290bf3026d011ec0e29f2d0067a4b43756f85b00be8895a3f85b0e7ed4f0; Candidate213 SHA-256 e409fcef642224e27d53baf0bc830e2ca34d32a4f38e6394891fb6ff4d2d9375; original Candidate212 rollback SHA-256 52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952.
