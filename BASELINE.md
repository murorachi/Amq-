# BASELINE — AMQ Song Select

- No accepted final release has been declared for the current osu!stable Song Select refactor.
- User explicitly selected Candidate 178 as recovery starting point because Candidate 205 was unavailable. Do not substitute Candidate 205 without user direction.
- Candidate 178 SHA-256: `b91109c7c660be064cedf76b20e473b12ca415be8e0650f16d8086339c2a9f80`.
- Candidate 183 SHA-256: `c733057a3e7fce2ce0dd772729f296dae59e829675c10890a8ae8d6221a1b8cd`.
- Candidate 184 SHA-256: `f3032d62cc22a5fb6272b14671f356daad3bb1503447813083fe434b5576a870`.
- Candidate 185 SHA-256: `2d0b9e6c5d69d6d5d0d799cbbc44c3787a6956da7e73111ba8facc6300d882a8`.
- Candidate 186 SHA-256: `cedf5ee3ff107a04443a899b3e92ede5daf2c513d083b93fb622caca1c9843aa`.
- Candidate 187 SHA-256: `fd0c20698f7251f351aceecf8051d1a8784d91aac9232f5573c1316f8fa7cf83`.
- Candidate 188 SHA-256: `a49a5abe71d3b688e25d9852c3c199af4c8998ab77d7a05337fb603d3c9af371`.
- Candidate 189: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_189_songselect_action_route_guard.html`, 9,303,538 bytes, SHA-256 `8fe6d3a4be97fb6be36f166ea6af425a7e7f8b4918788abadd45b91801cd8cbb`. Experimental only, not accepted.
- Candidate 189 adds a route guard for catalog helper actions already running on Song Select. A browser harness still shows legacy `watchlist` and `practice` routes can leave Song Select, so the guard is not a full solution.
- Visual reference: user-provided 2555×1438 osu!stable Song Select screenshot. No verified pixel-diff score exists.
- Native browser acceptance, persistent storage, live API/audio, full workspace lifecycle, and remote HTML hash verification remain incomplete.
- Preserve every candidate file. Do not overwrite any baseline or label an experimental candidate as accepted.
