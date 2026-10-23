# Candidate 180 — Hover Displacement Root Fix

Date: 2026-10-23

## Identity
- Parent Candidate 179 SHA-256: `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`
- Candidate 180 local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_180_hover_displacement_rootfix.html`
- Size: 9,277,240 bytes
- SHA-256: `4858d816a4b7fa0583d2d883bab2acb066d51f25f4023344b6667bdf44db9b83`
- Status: experimental; not accepted.
- HTML itself is local only. GitHub upload and remote hash verification are NOT COMPLETED.

## Root cause and change
Candidate 179 corrected the row-opacity cascade: legacy distance-tier `!important` rules had overridden the earlier translucent-row styling. The new final override restores alpha values by distance tier and preserves a white selected row.

During actual hover testing, Candidate 179 moved a hovered row 6 px left despite its `translateX(-3px)` declaration. Root cause: the hover rule also grew row width by 3 px, and right-edge anchoring added a second 3 px left shift. Candidate 180 removes hover-only width growth while keeping `translateX(-3px)`. The selected row's stronger movement and expansion remain unchanged.

## Validation

### PASS
- HTML tag structure: 1 opening/closing HTML pair; 101 opening/closing style pairs.
- 64 executable inline JavaScript blocks checked with Node `--check`: zero syntax errors. JSON and octet-stream payload blocks were correctly excluded from JS syntax checks.
- Chromium launched from `/usr/bin/chromium`; Song Select route was activated with `window.__aniNavigateApp('catalog')` using `page.set_content`.
- At 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, and 900×700:
  - 180 song rows render.
  - Legacy left rail computed display is `none`.
  - Document horizontal overflow is zero.
  - Bottom dock remains inside the viewport.
  - Eighth row is clipped by approximately 50% at the tracklist viewport boundary, preserving the scroll affordance.
- At 1280×720, hovered row's actual bounding-box left edge moved exactly 3 px; computed transform is `translateX(-3px)`; hover background is translucent pink.
- At 1280×720, ArrowDown changes the selected song.
- AMQ → EMQ changed the first/selected row from `Usagi to Kame` / `Boku no Haru` to `Echoes`; switching back to AMQ restored `Usagi to Kame`.
- Screenshot captured at 2555×1438: `candidate180_songselect_2555x1438.png`.

### BLOCKED / NOT RUN
- Native `file://` navigation returns `ERR_BLOCKED_BY_ADMINISTRATOR`.
- In the opaque-origin `page.set_content` context, two existing localStorage access errors occur. Durable persistence is NOT verified.
- Full custom-list CRUD/reload persistence, live API/cover loading and recovery, real audio playback, and full four-workspace regression are NOT RUN.
- Pixel-perfect score against the uploaded reference is NOT RUN. The reference contains a specific anime background and osu! leaderboard data; Candidate 180 uses the app's dark fallback in this context, so a raw full-frame pixel metric would mostly measure differing content rather than layout.

## Visual review
- Root left rail remains hidden and the selected song metadata is visible at upper-left.
- The right catalog has translucent pink distance tiers, a white selected row, and the intended 7.5-row scroll cue.
- The user-controlled scene background manager and dark no-background fallback remain intact.
- The central scene is still visually sparse when no custom background is configured; no fake anime art, ranking, player score, or missing metadata was fabricated.
- The requested modal workspace panels with dimmed background remain deferred to a later stage.

## Rollback
- Candidate 179 SHA-256: `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`.
- Candidate 178 SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Candidate 170 SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate 169 rollback checkpoint SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

## Next
1. Continue from Candidate 180.
2. Compare song row geometry and metadata hierarchy against the user's reference, using regional geometry rather than claiming a full pixel match.
3. Improve the central scene only through the existing scene-background manager or real available data.
4. After main Song Select visual structure is stable, implement workspace actions as modal overlays with dimming and state restoration.
5. Upload Candidate 180 HTML to GitHub and verify remote file identity; this remains outstanding.
