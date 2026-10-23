# Candidate 201 — Seven-and-a-Half Rows, Compact Layout, and Local History Panel

Date: 2026-10-24

## Candidate identity
- Local HTML: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_201_local_song_history_panel.html`
- Parent: Candidate 200, `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_200_seven_point_five_visible_rows.html`
- Local SHA-256: `1a353023584509d188cb57a97f3efccff355ccab94d55824d047209d4c8ee093`
- Size: 9,301,940 bytes.
- Status: experimental, not accepted. Candidate HTML upload and remote SHA verification are NOT COMPLETED.

## Changes carried forward
- Candidate 196 fixed compact catalog ownership so the catalog fills the viewport at widths <=900 instead of retaining the desktop fixed left offset.
- Candidate 197 uses stacked compact song rows, with desktop fan/offset geometry retained above 900px.
- Candidate 198 raises compact row height to a usable minimum and prevents action buttons wrapping over adjacent rows at 761–900px.
- Candidate 199 removes compact-only inline alignment/margin overrides when resizing back to desktop.
- Candidate 200 tunes the desktop rows below the selected song so the eighth card is about half-visible.

## Candidate 201 change
The left-side `#amqSongSelectRankingPlaceholder` was an empty faux leaderboard frame. The existing `__aniHistoryAPIv51.getHistory()` API provides real local quiz history records with song ID, correctness, answer target, answer, elapsed time and timestamp. Candidate 201 uses those records to show a compact **本機紀錄** panel for the selected song:
- Displays up to six most recent attempts for the selected song.
- Shows correct/incorrect, target type, answer, elapsed time and date from actual history entries.
- Shows an explicit empty state when no history exists.
- Does not fabricate global leaderboard rows, usernames, scores, avatars or play counts.
- Hides the panel on compact/mobile widths to protect the catalog viewport.
- Does not modify the existing scene-background manager or stored history.

## Tests

### PASS
- Static structure: one HTML open/close pair; 72 script open/close pairs; 108 style open/close pairs.
- 70 executable inline JavaScript blocks checked individually with Node `--check`: zero syntax errors.
- Browser rendered through system Chromium using Playwright `page.set_content`.
- AMQ mode: 38,821 records; all source counts AMQ; 180 rows rendered.
- EMQ mode: 16,839 records; all source counts EMQ; 180 rows rendered.
- MIX mode: 55,660 records; source counts AMQ=38,821 and EMQ=16,839; 180 rows rendered.
- Keyboard ArrowDown changes the selected song (verified in Candidate 198 mode checks; no navigation logic changed afterward).
- At 1648×928, the eighth row is 44.3px of 96.1px visible (46.1%).
- At 2555×1438, the eighth row is 75.6px of 164.1px visible (46.1%).
- At 390×844 compact width, stacked rows have no document overflow; eighth row is about half-visible.
- At 900×700, compact rows no longer overlap and controls fit on the row; list intentionally shows fewer than 7.5 rows because a readable 58px minimum is retained.
- Compact-to-desktop and desktop-to-compact resize check: row alignment/margins reset correctly; no document overflow.
- Local history panel fixture test: correct and incorrect entries render with answer/time/date, and panel is hidden with `aria-hidden=true` on compact width. Fixture was synthetic test data only and was not saved as user data.
- Workspace modal regression: custom-list panel opens with backdrop `rgba(5, 7, 13, 0.76)`; Escape closes it; selected song ID and scroll position restore exactly; focus returns to the action button; dock then closes.
- Existing AniList/MAL import modal and VNDB panel Escape/focus behavior were validated in Candidate 193; their code was not changed in Candidates 194–201.

### BLOCKED / NOT RUN
- Two localStorage access-denied page errors occur under opaque-origin `page.set_content`; this prevents durable reload/persistence acceptance.
- Native `file://` and local HTTP navigation remain blocked by `ERR_BLOCKED_BY_ADMINISTRATOR`.
- Custom-list CRUD/reload persistence, real API/cover loading and failure recovery, real audio playback, and full workspace regression are NOT RUN.
- Registered pixel metrics were run at the actual user-reference viewport 2555×1438. Full-frame: SSIM=0.37455, MAE=63.7712, RMSE=85.0330. Regional SSIM: header=0.0751, left-records=0.2439, catalog=0.4568, bottom-controls=0.2383, central-scene=0.4629. These are low and do NOT pass the visual-fidelity target; differences include absent persisted custom background, different title/control layout and no global osu! leaderboard. The primary user reference is 2555×1438, not 1648×928; 1648×928 remains a responsive test viewport.

## Visual assessment
- Desktop Song Select catalog now exposes approximately 7.5 rows, with the eighth card about 46% visible, clearly suggesting scroll.
- Compact widths now stack rows instead of letting desktop perspective offsets cause card overlap.
- Left-side history panel is data-backed and explicitly empty when there are no records. It is not a fabricated global leaderboard.
- The central area still depends on the existing scene-background manager and its fallback. Saved background loading cannot be verified in the opaque-origin test environment.

## Rollback
- Candidate 200 SHA-256: `ee8dac05b25c09a2ab6155cd57114203094ffa3b1dd7c4fbc78b9db666eaba3d`.
- Candidate 193 SHA-256: `40592745dd85e41ba8af3bfa3ab56ae34b7f1d698652418b65dfd7d0a3246083`.
- Candidate 186 SHA-256: `c07d82988c898b228cc891783ed4b351c4bdc2c87952583f6c68f15e209e66db`.
- Candidate 170 SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`.
- Candidate 169 rollback checkpoint SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

## Next
1. Inspect the history panel with real user history in a supported native-origin browser.
2. Verify scene-background manager behavior and its no-custom-background fallback in native-origin use.
3. Continue visual hierarchy comparison against the user-provided osu!stable reference; don't invent leaderboard data.
4. Finish native-origin persistence, custom-list CRUD/reload, API/cover recovery, audio, and full workspace regression when the environment allows.
5. Publish HTML and verify remote SHA-256; report files alone are not HTML delivery.


## Reference viewport correction and pixel metrics
The uploaded user reference `image.png` is 2555×1438. Earlier handoff notes that called 1648×928 the primary reference resolution were incorrect; 1648×928 is only a responsive viewport. Candidate 201 was captured at 2555×1438 and compared directly. The low metrics above are a failed visual-fidelity assessment, not an acceptance pass.
