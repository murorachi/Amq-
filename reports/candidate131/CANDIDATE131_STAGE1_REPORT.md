# Candidate 131 — no-custom-background fallback correction

## Status
Candidate 131 is an intermediate checkpoint, **not an accepted final release**. This change addresses only the Song Select background fallback and the root cause that prevented it from showing. The full osu!stable Song Select layout and existing feature regression remain unfinished.

## Artifact
- Parent / rollback Candidate 130 SHA-256: `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.
- Candidate 131: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_131.html`
- Size: 9,238,776 bytes.
- SHA-256: `f5e475819810a9b71101e3e70ab073815f12b5dd1e073ecf81631451ced897d3`.
- Reference image `image.png`: 2555×1438, SHA-256 `f0fd3ab5ec11e87632d95aac0ab7b9df3595c96e20bb03c5201d012d613b99a4`.

## Change and root cause
The existing full-screen `#amqSongSelectStage` had an opaque gradient that painted over the shared `#amqSceneBackgroundLayer`. Candidate 131 changes the canonical stage background to transparent and adds a CSS-only fallback on the scene layer when Song Select is active and no saved image is present: dark navy/plum gradient, subtle diagonal texture, faint pink rings and a low-intensity cyan glow. No background image, screenshot crop, fake song data or external dependency was added.

The fallback is scoped to Song Select. The existing `amq-has-scene-image` path remains intact and suppresses the fallback when a real scene image is active.

osu! references: [Beatmap Background](https://osu.ppy.sh/wiki/en/Beatmap/Background) describes backgrounds on Song Select; [Skinning: Interface](https://osu.ppy.sh/wiki/en/Skinning/Interface) documents the default `menu-background.jpg` fallback where a beatmap has no background. Candidate 131 uses only generic CSS, not copied osu! artwork.

## Tests
- PASS: parent Candidate 130 SHA verified before editing.
- PASS: 8/8 static checks.
- PASS: 62 executable inline JavaScript blocks parsed, 0 syntax errors.
- PASS: 90 CSS blocks / 2,580 top-level qualified rules parsed, 0 parse errors.
- PASS: no duplicate HTML IDs.
- PASS: actual Playwright/Chromium rendering at 1648×928, 1440×900, and 1280×720, DPR 1.
- PASS: 180 catalog cards rendered.
- PASS: fallback applies to Song Select without a custom background.
- PASS: home page does not receive the Song Select fallback.
- PASS: Song Select stage is transparent, allowing the scene layer to show.
- PASS: simulated custom-scene-image state disables the fallback.
- BLOCKED: direct `file://` navigation is denied by this environment.
- NOT RUN: actual IndexedDB-backed background load/clear persistence, localStorage persistence after reload, live APIs, audio playback, and full feature regression.
- Browser console reports a `localStorage` SecurityError because `page.set_content` uses an opaque origin. This is a test-environment limitation, not a passing persistence test.

## Pixel metrics
At 1648×928, Candidate 130 vs Candidate 131: SSIM 0.962566, MAE 4.8648, RMSE 9.4962.
Reference resized from 2555×1438 to 1648×928 using Lanczos vs Candidate 131: SSIM 0.301583, MAE 64.5942, RMSE 85.9324.

The full-frame reference score is descriptive only: the reference contains anime artwork, while this candidate intentionally uses a neutral no-image fallback. It is not a valid acceptance score for the fallback feature.

## Acceptance and rollback
**NOT ACCEPTED as final Song Select.** The no-image fallback subtask passes available CSS/rendering checks. Overall Stage 1 layout is incomplete; Stages 2 and 3 remain incomplete. Roll back to Candidate 130 SHA-256 `9085754d5b6d8b1463709c25a97402a217e8ddb07afb9e4beb5d14dd1fbc3916`.
