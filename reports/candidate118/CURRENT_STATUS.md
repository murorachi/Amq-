# CURRENT STATUS — Candidate 118

Stage 2 route/player isolation fix completed and tested.

- HTML size: 9,235,643 bytes.
- SHA-256: `bb1536744bea764ecf9cb010a6cb1f23fcea2ab69f809193125c695ba9404163`.
- Browser assertions: 17 PASS / 0 FAIL.
- JavaScript syntax: 62 inline scripts, 0 errors.
- CSS: 90 blocks / 2,569 rules / 0 parse errors.
- ZIP integrity: PASS.
- Home ↔ Song Select four cycles: PASS, no duplicate profile/player/rail/back/home nodes.
- Player dock: 46px compact presentation on Home; `amqHomeDock` absent on Song Select, restored on Home; Song Select-only controls hidden on Home.
- Homepage main menu: initial icon-only state and exactly three options after click PASS.
- Song Select search/sort/filter/mode controls, selected-song info and learning/list entry points detected.
- Dashboard navigation from Song Select PASS.

Not verified: live imports, real audio playback, persistence after actual browser reload, full osu!stable pixel comparison, HTML binary upload and remote HTML SHA-256.