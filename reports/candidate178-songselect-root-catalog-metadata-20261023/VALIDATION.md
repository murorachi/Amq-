# Candidate 178 — Song Select Root, Catalog Tint, Metadata Hierarchy

Date: 2026-10-23

## Identity
- Local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_178_metadata_selector_specificity_fix.html`
- Size: 9,274,075 bytes
- SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`
- Parent working checkpoint: Candidate 175, SHA-256 `c605d6df0fa63330a159451ea541e6317392e965d22c33232ee2d3e5fa726cec`
- Status: local experimental candidate, NOT ACCEPTED.
- HTML upload to GitHub: NOT COMPLETED; remote file/hash verification not done.

## Changes carried forward
- Correctly hides the actual legacy navigation `#c99LeftRail` and its curved-frame decoration while the Song Select route is active. The high-specificity selector defeats the later-injected Candidate 99 `display:flex!important` rule.
- Catalog rows use translucent distance tiers rather than fully opaque pink backgrounds, so the configured scene/background layer can show through.
- Selected-song title/metadata hierarchy is larger at reference-size viewports. The final CSS selector targets `#p32SongTitle` and `#p32SongMeta` explicitly because earlier generic selectors lost to legacy ID-specific rules.
- The selected row remains white; hover offset remains smaller than selected-row offset.

## PASS
- HTML structure: 1 opening/closing HTML pair, 100 opening/closing style pairs.
- Node syntax validation: 64 executable inline JavaScript blocks checked individually; 0 syntax errors.
- Chromium `page.set_content` tests at 2555×1438, 1920×1080, 1648×928, 1440×900, 1280×720, 900×700 with a test-only in-document storage shim:
  - route enters Song Select;
  - legacy left rail computed display is `none`;
  - 180 song rows render;
  - no horizontal document overflow;
  - catalog and bottom dock remain within viewport;
  - selected row stays near the list's vertical center at desktop sizes;
  - title font scales 39.6px / 29.8px / 25.5px / 22.3px / 20px for 2555 / 1920 / 1648 / 1440 / 1280 widths;
  - no uncaught page errors with the test shim;
  - ArrowDown changes selected song from “Boku no Haru” to “Oyuu no Uta”;
  - hovered row translateX = -3px; selected row translateX = -7px;
  - AMQ list initially reports 180 rows with `data-source=amq`; clicking EMQ switches the rendered rows to `data-source=emq`.
- Reference viewport screenshot: `candidate178_final_reference_2555x1438.png`.

## BLOCKED / NOT RUN
- Native `file://` navigation is blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- The storage shim is test-only, in-memory, and does not verify durable reload persistence.
- Live external cover/API loading, error recovery and real audio playback were not verified.
- Full custom-list CRUD/reload, import flows, learning workspace regression, and four-workspace routing regression were not run.
- Pixel-perfect comparison score is not claimed: candidate's local test environment has no persisted custom scene background and does not load external artwork, while the reference contains actual artwork and leaderboard data. Do not interpret the current screenshot as a 90%+ pixel match.

## Visual assessment
The root navigation leak is removed, the selected-song title is more legible, and list-row tint now allows scene/background visibility instead of blocking it with opaque pink. Remaining major differences are unavailable real cover/background artwork in this test environment and the left-side ranking/records region. No fabricated artwork, score, or ranking data was added. Existing scene-background manager and its no-custom-background fallback are preserved.

## Rollback
- Candidate 175 SHA-256: `c605d6df0fa63330a159451ea541e6317392e965d22c33232ee2d3e5fa726cec`.
- Candidate 173 SHA-256: `282edb78e91de4c4f65f1c917d6edf333b52efef11de7c6b65256404e4101b27`.
- Candidate 170 SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate 169 rollback checkpoint SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

## Next
1. Use a browser route that supports the actual local file origin/storage and verify scene-background persistence and covers.
2. Refine metadata/cover presentation only against real loaded data; don't fabricate ranking data.
3. Implement the requested modal workspace launcher: keep the Song Select scene in place, dim it behind the workspace modal, preserve selected song/scroll/filter state on close, and connect import/list/learning actions without deleting the existing features.
4. Complete full CRUD/import/audio/workspace regression before acceptance.
