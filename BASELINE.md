# BASELINE — AMQ Song Select

- No accepted final release has been declared for the current osu!stable Song Select refactor.
- User explicitly selected Candidate 178 as recovery starting point because Candidate 205 was unavailable. Do not substitute Candidate 205 without user direction.
- Candidate 178 SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Candidate 203 SHA-256: `d5c8c19d52671e05f9d2f9a578c853bb8c0cf4123abc0d27c8d4fa5dc9bf26e6` (experimental workspace routing/custom-list integration).
- Candidate 207 SHA-256: `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`, 9,310,496 bytes (experimental; home menu initial-state fix).
- Candidate 208 SHA-256: `15cfd2caa7045e3cc585bfd6e4bc8c35b72e2e70e3d97a7a3111c0228d67f892`, 9,324,073 bytes (experimental; osu!stable-inspired top filter frame, song-row selection/playback behavior, dock actions, workspace label change).
- Candidate 208 derives from Candidate 207. Candidate 207 and earlier artifacts remain preserved unchanged.
- Recovered test sources include `engineering/test_candidate82_workbench.py`, `engineering/CANDIDATE82_CUSTOM_LIST_CRUD_TEST.json`, and Candidate 120 workspace/persistence reports. The Candidate 82 test asserts obsolete workspace keys and must be adapted to current requirements.
- Candidate 208 static checks: 68 executable inline JS blocks pass `node --check`; CSS parser found 0 parse errors across 105 style blocks. The full Playwright run timed out with Node EPIPE and yielded no valid UI acceptance assertions.
- No HTML artifact is currently verified as uploaded to the branch. Documentation commits are not artifact delivery.
- Do not declare acceptance until native browser interaction, reload persistence, live imports/audio/covers, the 26-case regression suite, and osu!stable visual comparison are supported by evidence.
