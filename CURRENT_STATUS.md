# CURRENT STATUS — Candidate 210 (working checkpoint, experimental, not accepted)

- Recovery baseline remains Candidate 178 because Candidate 205 was unavailable. Candidate 207 is the direct source for this working checkpoint. Candidate 208 remains rejected; Candidate 209 exists as a rejected experimental artifact and was not overwritten.
- Candidate 207 remains unchanged: 9,310,496 bytes; SHA-256 `2f3a092a139628daa48bc113d2a192f41e2d7474182471ed926de3de49fd6100`.
- Candidate 210 local working artifact: `/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_210_songselect_rebuild_from_207.html`.
- Candidate 210 size: 9,345,508 bytes. SHA-256: `4189553ebd65d3ee81d239fd5e20c651cc783532d360bce8d79e25fb53473044`.
- Changes in the working checkpoint: dark/blue top frame; preserved actual search input; removed Song Select works-catalog toggle and Singer primary mode; compact song rows without row-level “更多”; dock song actions; centered wheel/keyboard selection, autoplay and random seek hooks; async row-cover attempts; shared AniList/MAL/VNDB import hub; song batch workspace for familiarity/tags/blacklist and work-level custom-list membership; AMQ-style white-outline bottom-right icon; scoped cover observer to the tracklist.
- Static validation PASS: 68 executable inline JavaScript blocks pass `node --check`; CSS parser reports zero errors across 107 style blocks / 2,745 qualified rules.
- HTML parser FAIL (inherited from Candidate 207): `lxml` reports two recoverable structure errors at the `</head><body>` boundary near line 324; root cause not corrected.
- Chromium acceptance BLOCKED: this environment times out even on `about:blank`; native UI behavior is not verified. Do not treat this as proof that the application itself is frozen.
- NOT RUN: actual click-through, reload persistence, four-workspace lifecycle, API/import, audio, cover failure recovery, 2555×1438 screenshot/pixel comparison, narrow viewport.
- Remaining high-risk gaps: EMQ/MIX slow activation/hidden modal not root-cause fixed or verified; existing importer/list-removal flows and all workspace lifecycle operations require browser tests; visual similarity is unmeasured.
- Candidate 210 is NOT ACCEPTED and must not be delivered as a finished version. HTML upload and remote SHA-256 readback are NOT VERIFIED.
- Report: `reports/candidate210-songselect-rebuild-from-207-20261024/VALIDATION.md`.
