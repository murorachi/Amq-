# CURRENT STATUS — Candidate 114

- Artifact: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_114.html`
- Size: 9,226,969 bytes
- SHA-256: `79b5f809abd1af10bf46fd4f2450153f7aba0486a70d164e37d2a54e085f6d02`

## This iteration
- Split Home and Song Select player presentation by route, preventing the Song Select fixed/large dock styles from persisting into Home.
- Song Select dock reduced 106px → 76px; selector stack 90px → 62px; catalog ends 2px above dock at the tested viewport.
- Home player frame reduced to 68px and player dock to 46px; duplicate metadata display hidden on Home.

## Tests
- Browser assertions: 7 PASS, 0 FAIL.
- Inline JavaScript syntax: 61 scripts, 0 errors.
- CSS parse: 89 style blocks, 2,549 qualified rules, 0 parse errors.
- Initial Home and return-to-Home geometry tested; Song Select geometry tested at 1648×928.
- No uncaught browser errors.

## Remaining gaps
- Real remote audio playback NOT VERIFIED.
- Durable persistence across reload NOT VERIFIED; in-memory shim used in browser test.
- Full pixel acceptance against osu!stable NOT COMPLETE.
- HTML binary upload and remote SHA verification NOT COMPLETE.
- Major visual differences remain in left rail and selected-song card structure.