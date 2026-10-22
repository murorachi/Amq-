# Candidate 134 — rejected layout experiment

## Purpose
Test whether the opened-work state could replace the right-side work-card stack with a fixed song-card rail, while preserving the selected work as a compact return target.

## Baseline
- Parent Candidate 132 SHA-256: `558076127bf072b992543c32224e1890c331c7ba3116d58d153757349aa739f1`
- Candidate 134 SHA-256: `50e0a06e86ce6884d2a97ac30ca71fff3e58fa8a17d2afaf06d8a335ad763d89`
- Candidate 134 size: 9,246,811 bytes.
- Candidate 132 remains the rollback for the eight-row window logic; Candidate 130 remains the last GitHub status checkpoint.

## Result: FAIL / NOT ACCEPTED
Playwright test at 1648×928 used the real app route and clicked the first visible work card:
- Candidate 132: one AMQ inline song list was created; the DOM retained 180 cards.
- Candidate 134: no inline song list remained after the click; the grid was rebuilt to 360 cards.
- The fixed-overlay/hide-other-cards experiment therefore interferes with the current catalog runtime lifecycle. The visual state transition cannot be accepted, even though the HTML parses and no style block was added.
- This experiment is rejected. Do not use Candidate 134 as the next baseline.

## Relevant prior evidence
Candidate 132 did successfully render a real work with 13 song rows and applied the eight-row window: 8 visible, selected row index 5, with distance tiers 4/3/2/1/0/1/2/3. This verified the window algorithm in DOM geometry, but the inline list overlapped the still-visible work catalog. That visual defect remains unresolved.

## Environment
- Playwright can render the HTML via `page.set_content`.
- Direct `file://` navigation is still blocked.
- localStorage access is denied for the opaque origin, so persistence is NOT RUN.
- The console reports localStorage SecurityError from the environment; this is separate from the catalog duplication failure.

## Next action
Return to Candidate 132 and investigate the catalog render/clone lifecycle. Do not hide or reposition the work grid until the source of the 180-to-360 card rebuild is identified. Then separate work selection and song selection using the canonical event/DOM owner, and re-test eight-card geometry.
