# First-pass audit: script_030 AniList ID mapping payload

Baseline: V82.85.28. File: src/scripts/script_030.htmlpart. Git blob: 9a9386ce304a7fb1941363da76086357c7fa8a4b.

Disposition: first-pass data-payload review complete; no production runtime change. This fragment is a JSON data map consumed by script_031, not executable JavaScript.

## Static findings

- Wrapper: script type application/json, ID aniAnilistIdMapV8237.
- Source size: 125,793 characters/bytes in this ASCII JSON fragment.
- JSON parse succeeded during inspection.
- Mapping entries: 9,400.
- Every source key is a positive numeric string; every target value is a positive safe integer.
- There are 9,364 unique target IDs. Multiple source IDs mapping to the same target occur in this data (25 target values have duplicates); this was recorded, not treated as an error, because the map's domain semantics may allow many-to-one aliases.
- script_031 reads the map via getElementById and JSON.parse before joining it with Chinese title sources.
- Manifest role was corrected from the generic inline-script-or-data-payload to json-id-mapping-payload. The source MIME type and non-executable classification remain unchanged.

## Integrity test

Added tests/unit/anilist_id_map_payload_integrity.test.cjs to verify wrapper uniqueness, valid JSON, numeric source IDs, positive safe-integer target IDs, and manifest classification. It is wired into the engineering workflow and source package. Run [39232821248](https://github.com/murorachi/Amq-/actions/runs/39232821248) passed the contract: 9,400 entries and 9,364 unique target IDs. Source/unit passed 132/132; Firefox responsive passed. The browser-native job failed only at the known non-silent audio output capture assertion.

## Risks and limits

- The mapping's semantic freshness against upstream AniList/MAL data is not established by structural checks.
- Duplicate target IDs may be legitimate many-to-one mappings; do not deduplicate them without a documented source-data rule.
- This check does not validate the remote Chinese-title sources or OpenCC conversion handled by script_031.
- No product source behavior changed.

## Recommendation and rollback

Keep the payload and runtime mapping unchanged. Accept the integrity test after CI passes, then continue with the next script fragment. Rollback by reverting the new test, workflow/package registration, this report, matrix reference and manifest role change as one audit step.
