# NEXT TASK — Continue Candidate 188 Work

1. Keep Candidate 188 experimental and retain Candidates 178, 183, 184, 185, 186 and 187 unchanged.
2. In a functioning browser, exercise each of the four left-rail workspaces and confirm all actions remain in Song Select; check open/close/Escape/backdrop/back behavior and stale DOM cleanup.
3. Verify Candidate 188 player dock placement against the user's stated target and the 2555×1438 osu!stable reference; adjust using measured coordinates rather than guesses.
4. Reproduce and diagnose top-right freeze and DOM churn. Candidate 188 narrows one MutationObserver's watched attributes, but this is not proof the freeze is fixed.
5. Verify custom-list create/add/remove/filter/reload persistence, live AniList/MAL/VNDB imports, cover failure/retry, keyboard selection, and real audio.
6. Run geometry and pixel/region comparison; do not claim a similarity percentage without measured results.
7. Run dependency inventory before deleting legacy controls; do not restore the redundant batch-organization feature or Singer in the primary mode row.
8. Report tests as PASS / FAIL / NOT RUN / BLOCKED. Static syntax validation is not browser acceptance.
9. Upload the final single-file HTML to GitHub and fetch it back to verify version, size, and SHA-256. No HTML upload or remote hash verification is complete.
10. Rollback to Candidate 187 if Candidate 188 causes a regression.
