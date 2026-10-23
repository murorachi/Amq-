# BASELINE — AMQ Song Select

- No accepted final release has been declared for the current osu!stable Song Select refactor.
- User explicitly selected Candidate 178 as recovery starting point because Candidate 205 was unavailable. Do not substitute Candidate 205 without user direction.
- Candidate 178 SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Candidate 190 SHA-256: `6364e31e214e5339165d010d1aa4b673a1e8889aa2c07e9cdd3df330199274db` (experimental).
- Candidate 203 SHA-256: `d5c8c19d52671e05f9d2f9a578c853bb8c0cf4123abc0d27c8d4fa5dc9bf26e6`, 9,309,775 bytes (experimental; workspace routing and custom-list Song Select integration).
- Candidate 203 derives from Candidate 202 -> 201 -> 200 -> 199 -> 198 -> 197 -> 196 -> 195 -> 194 -> 193. All earlier candidates remain preserved.
- Recovered existing test sources: `engineering/test_candidate82_workbench.py`, `engineering/CANDIDATE82_CUSTOM_LIST_CRUD_TEST.json`, and Candidate 120 workspace/persistence reports. The Candidate 82 test still asserts obsolete batch/analysis workspaces, so it must be adapted to the user's current requirement rather than blindly run unchanged.
- No HTML artifact is currently verified as uploaded to the branch. Documentation commits are not artifact delivery.
- Do not declare acceptance until real row add/remove interaction, durable storage, full P0/P1 regression and osu!stable visual comparison pass.
