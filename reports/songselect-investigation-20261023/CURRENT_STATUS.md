# CURRENT STATUS — Song Select (2026-10-23)

## Completed
- Reverified official reference image and Candidate 130 file SHA-256.
- Inspected branch tree and Candidate 125/126/129/131/132/133/134/135 reports.
- Confirmed Candidate 125/126/132/135 binaries are not in the current branch tree. Candidate 126 Library raw-byte materialization is blocked.
- Confirmed local Candidate 131 differs from remote Candidate 131 by SHA-256.
- Ran Chromium + Playwright `page.set_content` observations at 1648×928, 1440×900 and 1280×720, DPR 1. Direct `file://` and localhost navigation remain blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`.

## Focused Candidate 130 interaction results
- PASS: document initialization; 180 catalog cards; catalog hover measures about -3px; clicking a work opens inline songs; clicking a song selects exactly one row with -7px transform; search `Usagi` filters 180 to 26; one Song Select stage, no duplicate IDs/overflow; no uncaught page or console errors.
- FAIL: hovering a non-selected inline song row leaves computed transform `none`, so the intended -3px movement is suppressed.
- FAIL: ArrowDown does not change the selected song row. Source scan found no Song Select inline-row ArrowUp/ArrowDown handler.

## Root cause
Candidate 130 lines 7571–7572 apply a higher-specificity rule with `transform:none!important` to hovered inline song rows. A later lower-specificity rule at lines 10750–10751 attempts -3px movement but loses the cascade. This is a confirmed CSS conflict, not a timing issue. Inline song rows have click-selection behavior but no Song Select-specific arrow-key navigation.

## Visual status
- Candidate 130 full-frame metrics at 1648×928: SSIM 0.312034, MAE 63.4492, RMSE 84.8510. Reference resized from 2555×1438 with Lanczos; metrics are descriptive only.
- Candidate 130 shows 180 catalog cards with 60px rows and a repeating width pattern, not the target focused 7.5-row viewport.
- Player/ranking panel, top metadata, central scene and bottom controls remain substantially different.
- Song Select visual acceptance: NOT ACCEPTED.

## NOT RUN / BLOCKED
- Exact source recovery for Candidate 125/126/132/135.
- Direct file-origin loading; durable localStorage/IndexedDB reload persistence.
- Live AniList/MAL/VNDB APIs, real audio playback, complete custom-list CRUD, other-workspace regression.
- HTML binary upload and remote HTML SHA-256 verification.

Candidate 130 remains the verified local rollback. No new HTML candidate was accepted in this checkpoint.