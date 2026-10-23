# NEXT TASK — Compact Geometry, Import Modal, and Final Acceptance

1. Current local working candidate: Candidate 193, SHA-256 `40592745dd85e41ba8af3bfa3ab56ae34b7f1d698652418b65dfd7d0a3246083`. It is not accepted and its HTML is not uploaded to GitHub.
2. Candidate 193 fixes the legacy event-order bug: AniList/MAL import opens the existing `syncModal` without navigating away from Song Select.
3. Verified: route remains active while the modal is open; `aniListUsername` receives focus; Escape and explicit close both dismiss the modal, collapse the dock, preserve the route and return focus to a dock button.
4. Verified: after modal close, search=`a`, selected song ID=`46495`, and scrollTop=200 were all restored exactly. VNDB and custom-list workspace panels open on Song Select and Escape closes the topmost layer.
5. Static: 69 executable inline JS blocks passed Node `--check`, 0 syntax errors; 1 HTML pair, 71 script pairs, 106 style pairs.
6. Responsive checks: 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720 and 900×700 had 180 rows, hidden legacy rail, and document dimensions equal to viewport. However, compact 900×700 catalog geometry was inconsistent across timing; exact 7.5-row acceptance is NOT claimed. Fix the competing layout-runtime ownership rather than adding another late CSS patch.
7. AMQ and EMQ mode source counts were rerun and passed: AMQ=38,821, EMQ=16,839. Latest MIX rerun timed out before assertion; repeat it independently.
8. Native file:// and local HTTP navigation remain blocked by ERR_BLOCKED_BY_ADMINISTRATOR. page.set_content reports two existing localStorage access-denied errors on opaque origin. Durable persistence/reload cannot be claimed.
9. Remaining NOT RUN: custom-list CRUD/reload persistence, live APIs/covers and recovery, real audio playback, full workspace regression, registered pixel-diff.
10. Primary visual gap: actual user reference has central anime background and a left leaderboard overlay. Keep scene-background manager and fallback; do not invent osu! score/ranking data. Determine whether suitable real local data exists before implementing any record panel.
11. Upload Candidate 193 HTML and verify remote SHA-256. Report files alone do not count as HTML delivery.
12. Preserve Candidate 192/186/185/179/170 and Candidate 169 rollback points. Candidate 193 is the current local candidate, not a release.