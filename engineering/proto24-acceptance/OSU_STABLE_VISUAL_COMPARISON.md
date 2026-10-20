# osu!Stable Visual Comparison — Proto25 Stage 10

Date: 2026-10-21

## Reference
- Official osu!-wiki main-menu screenshot pinned at commit `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- File: `wiki/Client/Interface/img/main-menu.jpg`
- Blob SHA: `f6617a0da2058f79d9bdf11191326df8e74ecba1`
- Reference: https://github.com/ppy/osu-wiki/blob/ae2c6443a4264e5429ea7bcd2f3503be8a518a50/wiki/Client/Interface/img/main-menu.jpg
- Exact capture build is unknown; this is the user-authorized official Wiki fallback, not proof that the image came from Stable 20260924.1.

## Direct visual observations
The reference screenshot has:
1. A dark, visually textured full-screen background.
2. A large pink circular osu! cookie mark left of center.
3. Four short horizontal menu rows to the right, with a bright Play row and compact icons.
4. A very compact player/status strip at the upper left.
5. A compact jukebox/control strip at the upper right.
6. Small status/help information along the lower edge.
7. No large dashboard cards occupying the center or a large two-column footer.

## Proto24 screenshot findings
The pinned Proto24 desktop screenshot showed:
- The correct broad left-logo/right-actions composition, but the center buttons were much taller than the Stable menu rows.
- The circular mark still displayed the placeholder `♫ ?`.
- Profile/player cards were large and pale.
- The lower Library/Learning link groups consumed substantial screen space.
- The background was a plain dark fill rather than the reference's textured playfield.

## Proto25 Stage 10 changes
- Replaced the placeholder circular mark with a stylized `osu!` wordmark inside a pink cookie-like circle.
- Reduced profile/player panel height and padding.
- Converted primary actions to compact horizontal rows, hiding secondary tags/descriptions in the main menu.
- Compressed footer groups to small utility links so AMQ features remain reachable without dominating the layout.
- Kept the Play submenu separate and mapped Single Player and Multiplayer to the existing AMQ routes.

## Remaining visual gaps / risks
- The circle is a CSS approximation, not the exact osu! cookie artwork.
- The reference background's subtle scene texture and in-client overlays are not reproduced exactly.
- AMQ needs more feature navigation than the four Stable menu choices; secondary utility links remain, though compacted.
- The new stage has not yet been rendered by a verified browser workflow in this session. These are intended CSS changes; post-change screenshot acceptance remains NOT VERIFIED.
- Do not state a numerical similarity percentage until the new desktop screenshot is captured and compared at a matched viewport.

## Next comparison pass
1. Retrieve the Stage 10 screenshot and compare it at 1440×900 with a proportionally scaled reference.
2. Tune cookie diameter, menu row width/height, top strip scale, and background treatment from measured deltas.
3. Review 390×844 mobile layout separately; do not distort the desktop composition to imitate a mobile viewport.
