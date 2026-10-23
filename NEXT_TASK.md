# NEXT TASK — Continue Candidate 189 Work

1. Keep Candidate 189 experimental; preserve Candidates 178, 183, 184, 185, 186, 187, and 188 unchanged.
2. Fix the root cause that allows workspace actions to navigate to legacy `watchlist`/`practice` routes. All workspace actions must remain inside the shared Song Select container.
3. Resolve the mismatch between the stated four workspace destinations and the current two `data-ws` buttons; inventory dependencies before removing or replacing legacy controls.
4. Verify player placement against the 2555×1438 osu!stable reference with measured coordinates; do not claim visual similarity without pixel/region comparison.
5. Reproduce top-right freeze and DOM churn in a functioning browser; the narrowed observer is not proof of a fix.
6. Verify custom-list create/add/remove/filter/reload persistence, AniList/MAL/VNDB import and error paths, cover failure/retry, keyboard selection, real audio, and modal close behavior.
7. Run repeated workspace switch/open/close/Escape/backdrop/back tests and check for stale DOM/listeners.
8. Run static syntax checks while excluding embedded non-JavaScript data blocks; report browser-harness opaque-origin errors separately from product errors.
9. Upload the final single-file HTML to GitHub, fetch it back, and verify exact version, byte size, and SHA-256. No HTML upload or remote hash verification is complete.
10. Report PASS / FAIL / NOT RUN / BLOCKED accurately. Candidate 189 is not accepted; Candidate 178 remains the chosen recovery baseline.
