# Current Status: Candidate 100

## Artifact
`amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_100.html`
- SHA-256: `c645a9fed52dc2f8c01808305bde47df0cb46cf27d50736ea8551c619a8b2639`
- Size: 9,201,487 bytes
- Parent checkpoint: Candidate 99 (`5f86d279b25c3836d1bdd154b3ac6f1273d7d6b7d5334ef9ec0bf6242bc547c5`)

## Implemented
- Eight left-rail actions and icons, plus the `統計儀表板` entry beneath them.
- Chinese arrow-style `返回` and home icon occupy the two bottom corners.
- Bottom player uses the existing bottom strip: cover fallback, title/artist/song, yellow progress track, previous/play-next, playback mode and AMQ/EMQ/MIX source controls.
- Source switching changes the source used for subsequent extraction and leaves the current title unchanged.
- Alt+wheel adjusts the actual audio element volume and shows the radial indicator.
- Fixed the extra-grid-column/overflow arrangement and hid the redundant collapse control.

## Verification
- JavaScript syntax: PASS, 57 script blocks, 0 syntax failures.
- CSS parsing: PASS, 84 style blocks / 2,500 rules, 0 parse errors.
- UI acceptance: 11 PASS, 0 FAIL, 1 BLOCKED.
- Passed route, eight rail entries, dashboard icon/modal, source selector/current-title behavior, Alt+wheel volume, dock geometry, bottom-strip control bounds, and duplicate rail checks.

## Blocked / not verified
- Custom-list picker with persisted storage: BLOCKED because the opaque `page.set_content` origin denies localStorage. Native `file://` and local HTTP navigation were blocked (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- Native double-click persistence: NOT RUN.
- Real AniList/MAL/VNDB APIs, public cover hosts and real audio sources: NOT RUN; mocks were used.
- Official osu!stable pixel-level comparison: NOT RUN. 1:1 parity is not claimed.
- Combined legacy integration suite still has known `EPIPE`; not marked passed.
- Browser report contains a localStorage access error from the opaque test origin.

## GitHub
- Branch: `amq-candidate100-osu-songselect-ui`
- Engineering records uploaded and re-fetched: BASELINE.md, CURRENT_STATUS.md, NEXT_TASK.md, TEST_REPORT.json.
- HTML upload: NOT VERIFIED. Remote lookup of the Candidate 100 HTML returned 404.