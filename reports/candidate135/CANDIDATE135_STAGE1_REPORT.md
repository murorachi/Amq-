# Candidate 135 — Song Select selected-centered eight-card stack

## Status
Intermediate checkpoint only. Browser checks for the selected-card window pass at the three requested desktop viewports. Full osu!stable fidelity and feature regression are not accepted as complete.

## Artifact and rollback
- Candidate: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_135.html`
- Size: 9,245,332 bytes.
- SHA-256: `9e2a86313613da2e8a4b23bb66e42d4616a82637447175791eb05aae7bf94ee7`
- Immediate previous checkpoint Candidate 134 SHA-256: `4bcad44b81008ca5fb43dc962f7bf3428608a2917e83e5b5cbf01aca317c7b42`
- Safe rollback Candidate 130 SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`
- Reference `image.png`: 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.

## Changes
1. Corrected the runtime target to include the actual `.card` catalog entries rendered in AMQ mode.
2. The selected card is emphasized; neighboring cards use three distance tiers for width and opacity.
3. Enforces at most eight visible card rows total, counting catalog cards and expanded song rows. When two song rows are open, six catalog cards remain visible.
4. Selected song row is primary; the expanded parent work card is a quieter context row.
5. Selected song row has a 2px vertical margin. Hover displacement remains 3px and selected displacement remains 7px.
6. Removed a redundant late background override. The existing canonical no-custom-background rule remains the single owner of the subdued dark gradient; custom backgrounds retain their existing path. No external image was added.

## Tests
- PASS: 9/9 browser/static checks.
- PASS: 62 inline JavaScript blocks parsed, zero errors.
- PASS: 90 CSS blocks / 2,585 top-level rules parsed, zero errors.
- PASS: Song Select initialized; no uncaught page errors.
- PASS: initial list shows eight cards; expanded state remains eight total.
- PASS: clicking a card recenters the window; ArrowDown changes selection while preserving the cap.
- PASS: 1648×928, 1440×900 and 1280×720 all passed the eight-card count check.
- BLOCKED: direct `file://` navigation rejected. Playwright `set_content` plus in-memory localStorage shim was used.
- NOT RUN: durable reload persistence, live AniList/MAL/VNDB requests, audio playback, full list CRUD/persistence, and regression across all other workspaces.

## Pixel comparison
Reference resized from 2555×1438 to 1648×928 with Lanczos. Full-frame SSIM `0.27858`, MAE `75.3351`, RMSE `97.3386`. Regional metrics are in `CANDIDATE135_PIXEL_REPORT.json`. These are low and do not constitute a visual pass. Left player/ranking, top-left metadata, central scene artwork and bottom controls still differ substantially.

## Acceptance
**NOT ACCEPTED as final.** Stage 1 remains incomplete; Stages 2 and 3 remain incomplete.

## Rollback
Use Candidate 130, SHA-256 `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.