# Candidate 181 — Compact Viewport Scroll Fix and UI Regression

Date: 2026-10-23

## Candidate identity
- Working file: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_181_compact_document_scroll_fix.html`
- Local SHA-256: `3671ec7fb9a276742bc227f7028c1df4f7afb730f27dc099138392640b82ee3a`
- Size: 9,278,478 bytes.
- Parent Candidate 180 SHA-256: `7b009b50743e4a237980d8d90a4974c8849f006940b754ed11d45bc2a5ad86a3`
- Candidate 181 is experimental, not accepted. HTML upload and remote SHA verification were not completed.

## Change
Candidate 179/180 exposed a compact-viewport layout issue: at 900×700 the Song Select stage was constrained, but the document still had 796px scroll height because legacy content outside the stage extended the body. Candidate 181 adds a route-scoped compact-viewport rule to constrain the document and body to 100dvh with overflow hidden only while Song Select is active at widths <=900px. Other routes are not targeted.

Candidate 180 also reduced the stage's 500px minimum-height forcing at compact viewports. Candidate 181 retains that fix.

## Tests

### PASS
- HTML structure: 1 opening/closing HTML pair; 103 opening/closing style pairs.
- 65 executable inline JavaScript blocks checked individually with Node `--check`: 0 syntax errors. Non-executable JSON/base64 script payloads were excluded.
- Chromium rendered the actual Song Select route using the in-page navigation (not a forced body-class-only simulation).
- Viewports tested: 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700.
- At all six viewports: 180 song rows available in the underlying list, legacy `#c99LeftRail` computed display is `none`, and document scroll width/height matches the viewport. At 900×700 document dimensions are 900×700, improved from 900×796 in Candidate 179/180.
- ArrowDown changes selection from “Boku no Haru” to “Oyuu no Uta”.
- Hover displacement is -3px; selected-row displacement is -7px. Hover background is pink-highlighted while selected background is near-white.
- AMQ mode reports source counts `{"amq":38821}`; EMQ reports `{"emq":16839}`; MIX reports both `{"amq":38821,"emq":16839}`. Each mode shows 180 initial rows; the source counts represent the full filtered dataset.
- At 2555×1438, selected row bounds are x=1408.5, y=570.5, w=1134.5, h=176.1. At 1648×928, selected row bounds are x=903.5, y=372.6, w=732.5, h=103.1.
- The eighth row is clipped by approximately half at the catalog boundary: at 1648×928 it spans y=764.3..863.5 while list bottom is 814; at 1280×720 it spans y=570.6..641.2 while list bottom is 606. This preserves the intended 7.5-row scroll affordance.
- Screenshot captured at 2555×1438: `candidate181_compact_document_scroll_fix_2555x1438.png`, SHA-256 `cbd1e47f7bd736bd68a45a38c7e927cf77afa020ef7e820b62cdd935ec790123`.

### BLOCKED / NOT RUN
- Two existing localStorage SecurityErrors occur because `page.set_content` uses an opaque origin. Durable persistence, custom-list CRUD/reload, and native-origin acceptance are not verified.
- Native `file://` navigation is still blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- External cover/API resolution, real audio playback, and error recovery are not tested.
- No registered pixel-difference score was produced. The reference and candidate scene states differ (the candidate uses the existing no-custom-background fallback), so a raw pixel score without state registration would be misleading.
- Full learning workspace regression is not run.

## Visual assessment
The root legacy rail is hidden, song list uses the right-side scene area, the selected row and hover treatment are distinct, and the 7.5-row scroll hint is present. With no custom background configured, the existing dark gradient fallback is shown. No fake cover art or ranking data is introduced. The workspace modal pattern (dimmed background, state restoration) remains a later stage.

## Rollback
- Candidate 180: `7b009b50743e4a237980d8d90a4974c8849f006940b754ed11d45bc2a5ad86a3`
- Candidate 179: `05d8c65734759441c3cb61387f138ede4cb99323794105dca9aa5fe3f354ba96`
- Candidate 173: `282edb78e91de4c4f65f1c917d6edf333b52efef11de7c6b65256404e4101b27`
- Candidate 170: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`
- Candidate 169 rollback checkpoint: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`

## Next
1. Keep Candidate 181 as the latest local working candidate.
2. Implement workspace actions as modal overlays only after this main Song Select layout is accepted: dim background, close/Escape behavior, keyboard focus, and restore selected song/scroll/filter state.
3. Re-run storage and full CRUD/API/audio regression in a native-origin-capable browser environment.
4. Upload Candidate 181 HTML and verify remote identity before calling it remotely delivered.
