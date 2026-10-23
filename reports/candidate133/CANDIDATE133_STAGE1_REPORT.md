# Candidate 133 — Song Select proximity hierarchy and fallback background

## Status
Candidate 133 is an intermediate candidate, **not an accepted final release**. It advances the requested Song Select card hierarchy and no-custom-background fallback. The visual loop now produces actual Playwright screenshots at three viewport sizes. The overall page remains materially different from osu!stable, and full feature regression is not complete.

## Artifact
- Parent Candidate 130 SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`
- Candidate 133: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_133.html`
- Size: 9,242,471 bytes
- SHA-256: `92507a86af95b556733664510dc5727e40c34398c86f8932ca212e08f7d9edfe`
- Reference `image.png`: 2555 × 1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`
- Rollback Candidate 130 remains unchanged.

## Changes
1. Replaced the prior Candidate 130 layout-owner block with one canonical Song Select card-layout block.
2. Added a restrained CSS-only fallback backdrop using dark gradients, faint radial rings, and low-contrast diagonal texture. No external art search or screenshot-as-background was used.
3. The catalog viewport is capped at 736px on standard desktop and adapts to short viewports. At 1648×928, the initial viewport displays exactly eight top-level catalog cards.
4. Added proximity classes from the selected/expanded work: nearer cards are wider and more prominent; distant cards progressively narrow and fade. The expanded work remains pink so the actual selected song row is the single white focus state.
5. Preserved a 3px left shift on hover and a 7px left shift on the selected song row. Inline song lists are normal-flow flex children with a bounded 92px area rather than overlays that cover neighboring catalog cards.
6. The selected song row has 1px vertical margin, keeping its separation from neighboring difficulty rows deliberately small.

## Tests
- PASS: parent Candidate 130 SHA-256 verified before editing.
- PASS: 62 executable inline JavaScript blocks parsed by `node --check`, 0 failures. Embedded JSON and gzip/base64 data were excluded.
- PASS: 90 CSS blocks parsed by `tinycss2`: 2,582 qualified rules, 0 parse errors.
- PASS: Playwright rendered the HTML via `page.set_content` and entered Song Select through the actual home-menu controls.
- PASS: screenshots and geometry captured at 1648×928, 1440×900 and 1280×720, DPR 1.
- PASS: 180 catalog items exist; at 1648×928 the initial scroll viewport contains exactly 8 top-level catalog cards.
- PASS: selecting a work creates an inline song list and one selected song row; computed selected-row transform is -7px.
- PASS: hovering an unselected catalog card changes computed transform from none to -3px.
- PASS: selected work receives proximity tier 1 and actual selected song row is the white focus.
- BLOCKED: direct `file://` navigation is denied by the environment.
- NOT RUN: actual reload persistence, live APIs, audio playback, complete custom-list CRUD and full other-workspace regression. `localStorage` access is denied on the opaque `set_content` origin.
- NOT ACCEPTED: full UI acceptance remains incomplete.

## Pixel comparison
Reference resized from 2555×1438 to 1648×928 using Lanczos. Candidate screenshot captured at 1648×928, DPR 1.

| Region | SSIM | MAE | RMSE |
|---|---:|---:|---:|
| Full screen | 0.306571 | 65.2708 | 85.9472 |
| Left player / rail | 0.138318 | 83.5535 | 97.0726 |
| Top metadata | 0.068010 | 51.3857 | 76.1928 |
| Central background | 0.417784 | 54.8422 | 74.6045 |
| Right catalog | 0.388050 | 68.5985 | 85.8646 |
| Bottom controls | 0.166022 | 62.8117 | 98.5172 |

Compared with Candidate 130's recorded full-screen metrics (SSIM 0.312034, MAE 63.4492, RMSE 84.8510), Candidate 133's overall pixel metrics are worse. The new change targets card count/proximity behavior, not overall pixel similarity. No visual pass is claimed.

## Remaining gaps
- Left feature rail differs from osu!stable's compact ranking/player panel.
- Top-left metadata and bottom controls remain structurally different.
- The fallback is intentionally a CSS background, not anime artwork.
- Work-card / nested-song hierarchy is not identical to osu!'s beatmap difficulty list.
- Browser-origin, persistence, API, audio and full regression acceptance remain outstanding.

## Rollback
Use Candidate 130, SHA-256 `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.
