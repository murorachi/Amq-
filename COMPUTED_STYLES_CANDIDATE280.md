# Candidate280 computed-style snapshots

Browser: Chromium headless via Playwright. Viewports: desktop 1440×900 and mobile 390×844. External network was blocked; app DOM interactions ran in the browser.

## Home (1440×900)
- `#homeMenu`: display flex; rect x=43.19, y=63.69, w=1353.63, h=908.
- `#amqMainIcon`: display grid; rect x=570, y=234.69, w=300, h=484.
- `#amqWorkspaceDock`: display none; rect 0×0.
- Candidate277 vs Candidate280 home screenshot: 0 changed pixels at identical viewport.

## Song Select (1440×900)
- `#amqSongSelectStage .p32-catalog`: fixed; rect x=885.59, y=34, w=554.39, h=754.41; horizontal overflow visible so expanded tracklist canvas can extend left.
- `#amqSongSelectStage .p32-info`: fixed; x=8, y=7, w=792, h=78.84.
- `#amqSongSelectTracklist`: relative; x=795.59, y=94.59, w=639.39, h=679.81; overflow-x hidden and overflow-y auto. The widened scroll canvas contains the selected row instead of clipping it.
- Normal row: x=889.59, y=94.59, w=545.39, h=90.66.
- Selected row: x=799.59, w=635.39, h=94.28; left shift 90px.
- Hover row: x=863.69, w=571.30; left shift 25.91px.
- Normal/selected/hover right-edge difference: 0px.
- `#audioDock`: fixed grid; x=105, y=795.61, w=1231.33, h=104.39.
- `#amqWorkspaceDock`: display none; rect 0×0. Current page uses `#audioDock` and the left rail.

## Workspace panel
- `#amqWorkspaceContentPanel` when custom-list panel is open: fixed flex; x=420, y=120, w=460, h=530.
- The workspace content panel is separate from the hidden `#amqWorkspaceDock`; this stage did not reactivate the duplicate dock.

## Song Select (390×844)
- document width = 390; no horizontal overflow.
- Song info: x=8, y=6, w=374, h=78.
- Left navigation rail: x=8, y=94, w=374, h=48; horizontal scrolling.
- Catalog: x=8, y=150, w=374, h=608.
- Tracklist canvas: x=−4, y=222.38, w=381, h=521.63; viewport clips only at the screen edge.
- Normal row: x=12, w=365, h=69.59.
- Selected row: x=0, w=377, h=72.38; 12px left shift.
- Audio dock: x=50, y=752, w=290, h=92. Back/Home buttons each 50×58.

## Multiplayer
- Desktop root `#multiplayerView`: x=28, y=47.69, w=1384, h=1079.22; background rgb(33,29,38), border rgb(66,55,71), radius 16px.
- Card: background rgb(42,37,48), border rgb(66,55,71), radius 12px.
- Input: background rgb(33,29,38), border rgb(66,55,71), radius 8px.
- Mobile root: x=12, y=41.69, w=366; document width remains 390; heading visible in viewport.

## Quiz
- Desktop root: x=28, y=21.69, w=1384, h=1148.48.
- Mobile root: x=12, y=21.69, w=366; document width remains 390; heading visible in viewport.

Storage persistence and real external resources were not verified. See the Stage 60 report for BLOCKED items.
