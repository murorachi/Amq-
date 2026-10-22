# Current Status: Candidate 104

## Artifact
- amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_104.html
- SHA-256: 39526d4fcbb2d92fb2e5da0c808b1a7c38f187141a21e168a81b4156873a5b93
- Size: 9,209,537 bytes

## Changes
- Fixed native audio controls leaking into the Song Select visual dock after navigation.
- Bottom dock height is 106 px at viewport 1648x928, top y=822.
- Song list ends at y=820, leaving the bottom command band clear.
- Mode, custom-list picker and source selector stack vertically in the bottom band.
- Song rows measure 68 px after layout; hover moves row left 7 px.
- AMQ/EMQ/MIX switch changes future extraction only; current track metadata remains unchanged.

## Verification
- JavaScript syntax: PASS, 58 script blocks, 0 errors.
- CSS parse: PASS, 86 style blocks, 2,519 qualified rules, 0 parse errors.
- Route and eight left-rail entries: PASS.
- Custom-list picker population and selection wiring: PASS with injected in-memory storage.
- Next-song stays within the selected custom-list candidate pool: PASS in focused test.
- Source switching/current title unchanged: PASS.
- Native media controls hidden; no uncaught browser errors in focused test: PASS.
- Bottom dock and song-list clearance: PASS.
- Durable localStorage persistence across reload: BLOCKED. file:// and localhost navigation both return ERR_BLOCKED_BY_ADMINISTRATOR in this environment.
- Audible media playback: NOT VERIFIED. An AMQ mirror URL was selected but external network playback was unavailable.
- Full pixel-difference parity: NOT RUN; geometry/style measurements only.

## GitHub
Engineering records are uploaded and re-fetched on branch `amq-candidate104-songselect-layout-fix`. The HTML itself remains NOT VERIFIED remotely because the execution container cannot resolve `api.github.com`, and the available connector has no binary upload/release-asset operation. A PowerShell helper and official upload guide are now present in the branch. Remote HTML SHA-256 must only be claimed after the helper completes successfully.