# BASELINE — User-authorized working baseline: Candidate277

## Baseline decision
On 2026-10-25, the user explicitly authorized adopting Candidate277 directly as the working baseline. This supersedes the prior Stage54 hold pending recovery of Candidate212. This is a replacement-baseline decision, not a claim that Candidate277 is byte-identical to Candidate212.

- File: `amq_learning_tool_v82_85_91_candidate277_custom_list_name_normalization_20261025.html`
- Version: `v82.85.91-candidate277-custom-list-name-normalization-20261025`
- Size: 9,373,238 bytes
- Locally recomputed SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`
- Direct rollback parent: Candidate276
- Candidate276 SHA-256: `7a604c1d2d604b928d2ccb51dbb55d58ead2d34f73abfcba27693c794a4ddbd5`

## Known caveats
- Candidate277 HTML upload/readback from GitHub and remote hash verification are not yet complete.
- Metadata mismatch: document title says Candidate219 and `data-amq-candidate` says `227`, while build comment identifies Candidate277. Fix only in a new uniquely named child candidate; never overwrite the baseline.
- Browser interactions, storage reload, live API/audio/multiplayer and pixel comparison remain NOT RUN/BLOCKED.
- Stage55 is a static inventory, not a complete runtime call graph.

## Rollback
Preserve Candidate277 and Candidate276 unchanged. If a child candidate regresses, return to Candidate277; use Candidate276 only when reverting Candidate277's custom-list name normalization change.


## Stage57 baseline integrity note (2026-10-25)
Candidate277 remains the user-authorized working baseline and was not modified by Stage57. Recomputed local size: 9,373,238 bytes. Recomputed SHA-256: `b628bfb5b4aec30a34935bcf5aaac095ab405a71ebe482f9a666c2f91a019371`. Stage57 is a read-only targeted dependency gap audit; it does not claim Candidate277 is byte-identical to Candidate212, and it does not promote the artifact to a fully browser-accepted release.


## Stage58 child candidate record (2026-10-25)
Candidate277 remains the immutable user-authorized baseline. Homepage changes are in child candidate `amq_learning_tool_v82_85_92_candidate278_homepage_shell_inplace_play_menu_20261025.html` (version `v82.85.92-candidate278-homepage-shell-inplace-play-menu-20261025`), 9360487 bytes, SHA-256 `cd2fdb8f1f762c4a30f64f54e64ab530607a3a3fb1866f9275804c507df08bf1`. This child is not promoted to a fully browser-accepted release because direct Chromium headless launch timed out even for `about:blank`; browser acceptance remains BLOCKED/NOT RUN. Do not overwrite Candidate277. See `reports/stage58-candidate278-homepage-20261025/STAGE_58_CANDIDATE278_HOMEPAGE_SHELL_AND_INPLACE_PLAY_MENU_20261025.md`.
