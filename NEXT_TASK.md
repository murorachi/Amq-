# NEXT TASK — Candidate 185 Acceptance and Remaining UI Work

1. Keep Candidate 185 experimental and retain Candidates 178, 183, and 184 unchanged.
2. Verify actual cover-fetch pipeline and failure/retry behavior in a browser with network access; shimmed tests only verified the selected-work gradient fallback.
3. Test visible workspace actions for AniList/MAL import, VNDB import, custom-list management, and learning plan. Verify close, Escape/back behavior, no page navigation, and no stale overlays.
4. Verify real mouse and keyboard song selection centers the selected row, including manual scrolling and actual loaded song lists.
5. Complete custom-list create/add/remove/filter/reload persistence in a functioning persistent browser origin.
6. Test live APIs, cover loading/failure recovery, real audio, and responsive layouts in native-origin browser.
7. Measure against the 2555×1438 osu!stable reference with geometry and pixel/region comparison. Do not claim visual-fidelity percentage without measurement.
8. Complete a dependency inventory before deleting legacy controls or handlers. Candidate 185 currently hides the redundant bottom workspace dock but retains its implementation for rollback.
9. Upload the 9.29 MB Candidate 185 HTML to GitHub and verify remote content and SHA-256. HTML upload is still NOT COMPLETED; docs alone are not delivery.
