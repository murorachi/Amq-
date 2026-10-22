# Candidate 130 — catalog owner and selected-row specificity fixes

## Status
Candidate 130 is an intermediate candidate, not a final release. The browser observation loop works via Playwright `set_content`; catalog geometry is stable at three desktop viewports, and selected song rows move 7px left while hover moves the card 3px. Overall composition remains far from osu!stable. Stage 1 is incomplete; Stages 2 and 3 are not complete.

## Artifact
- Parent / rollback Candidate 129 SHA-256: `b23fbbfc1596d6f54db3bb54345cc4052b5128284387e43057754107dcdac1ef`
- Candidate 130: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_130.html`
- Size: 9,237,889 bytes
- SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`
- Reference `image.png`: 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.

## Root cause and change
A higher-specificity existing selected-row selector forced `transform:none!important;width:100%!important`, overriding the later selected movement. Candidate 130 corrects that existing rule to `translateX(-7px)` and `width:calc(100% + 7px)`. No new stylesheet was appended. Catalog CSS/JS owners both use `left:53.5vw;width:46.5vw`; widest card is 46vw; hover is 3px.

## Tests
- PASS: parent SHA verified.
- PASS: 8/8 static checks; 62 inline JS blocks, 0 syntax errors; 90 CSS blocks / 2,579 rules, 0 parse errors.
- PASS: Playwright actual rendering and home-menu-to-Song-Select navigation.
- PASS: screenshot/geometry at 1648×928, 1440×900, 1280×720, DPR 1.
- PASS: 180 cards; right-aligned vertical flex stack.
- PASS: hover transform -3px; selected row transform -7px; real song metadata and white selected styling.
- BLOCKED: direct `file://` navigation denied. `set_content` opaque origin denies localStorage; real reload persistence NOT RUN.
- NOT RUN: live AniList/MAL/VNDB APIs, actual audio in this run, full list create/delete/reload, and other-workspace regression.

## Pixel comparison
Normalized to 1648×928 with Lanczos: SSIM 0.312034, MAE 63.4492, RMSE 84.8510. This is descriptive, not an acceptance pass. Remaining major gaps: left feature rail instead of compact ranking/player panel, no scene artwork when no user background is selected, top-left metadata, bottom control layout, card text clipping, and full feature regression.

## Acceptance / rollback
**NOT ACCEPTED as final.** Stage 1 remains incomplete; Stages 2 and 3 remain incomplete. Roll back to Candidate 129, SHA-256 `b23fbbfc1596d6f54db3bb54345cc4052b5128284387e43057754107dcdac1ef`.
