# CURRENT STATUS — Candidate 136 (2026-10-23)

## Scope
Fix two verified Song Select interaction defects at their existing owners. No other page/workspace was intentionally changed.

## Changes
1. At the existing high-specificity inline-song hover rule, replaced `transform:none!important` with `translateX(-3px)!important`, width `calc(100% + 3px)`, and hover z-index.
2. At the existing delegated song-row selection owner, added ArrowUp/ArrowDown navigation within the active inline song list and Enter re-selection. The handler ignores form controls/buttons and only runs on the Song Select route. Selection uses the existing click handler.

## Test results
- PASS: document initialization and 180 catalog works.
- PASS: catalog hover shifts about -3px.
- PASS: opening a work renders real inline song rows.
- PASS: mouse click selects exactly one song row.
- PASS: hovered song row shifts -3px; selected row shifts -7px.
- PASS: ArrowDown changes selected row; ArrowUp returns to previous row; Enter preserves one selected row.
- PASS: search `Usagi` filters 180 results to 26.
- PASS: no duplicate IDs, one Song Select stage, no document overflow at 1648×928, 1440×900, 1280×720.
- PASS: no uncaught browser/console errors in tested flows.
- PASS: 62 inline JavaScript scripts passed `node --check`; 90 CSS blocks parsed with zero tinycss2 parse errors.
- PASS: screenshots and viewport measurements captured at all three viewport sizes.
- BLOCKED: direct `file://` and localhost navigation are blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- NOT RUN: durable storage/reload, live APIs, real audio playback, complete list CRUD, other-workspace regression.

## Visual acceptance
NOT ACCEPTED. Candidate 136's initial frame is pixel-identical to Candidate 130 (0 changed pixels), so the interaction fixes do not improve baseline visual similarity. At 1648×928, SSIM 0.312034, MAE 63.4492, RMSE 84.8510 against the reference resized with PIL Lanczos. Main layout mismatch remains: left player/ranking panel, central scene background, top metadata, right-side song hierarchy, bottom controls. Right catalog still contains 180 work cards at 60px, not the target 7.5-song-row presentation.

## Limitations
Browser tests use Chromium + Playwright `page.set_content` and a test-only in-memory Storage shim. They prove browser rendering/interaction for these flows, not direct opening of the delivered file or durable persistence.
