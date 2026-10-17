# Baseline lock

## Direct V82.65 checkpoint package: recovered and verified

- Package: `AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip`
- Bytes: `124658780`
- SHA-256: `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`
- External `.sha256` sidecar: exact filename/digest match.
- ZIP CRC: PASS; 291 entries / 291 unique paths.
- Internal `SHA256SUMS.txt`: 290/290 entries verified, no missing paths or mismatches.
- Recovery copy: `/mnt/data/v82_65_baseline_recovery/AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip` (kept separate and untouched).
- Verification report: `reports/BASELINE_PACKAGE_VERIFICATION_06.md`.

## Locked current V82.65 product assets

| Asset | Bytes | SHA-256 |
|---|---:|---|
| `amq_learning_tool_v82_65_candidate_pool_cleanup.html` | 8,786,930 | `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33` |
| `anisong_multiplayer_room_server_v82_65.py` | 88,403 | `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736` |
| `anisong_multiplayer_catalog_server.json` | 36,540,011 | `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652` |
| `anisong_multiplayer_unavailable_audio_v82_59.json` | 40 | `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a` |

The source archive's `VERSION.json` labels V82.65 as a PARTIAL candidate-pool/filtering checkpoint, not a completed full engineering release. V82.64 Release ZIP remains the direct historical source from which V82.65 was derived.

## Build baseline used by the source split

- Standalone HTML: `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Bytes: 8,786,930
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- `python tools/verify.py` reconstructs the HTML twice and verifies byte identity to this baseline.

Do not overwrite the original package, the recovered copy, or the locked HTML baseline. Every checkpoint uses a unique artifact name.

## Engineering checkpoint overlay — V82.66 checkpoint 07

The immutable V82.65 HTML fingerprint above remains the build target. Checkpoint V82.66 ANSWER-FLOW-AND-RELIABILITY-07 adds exact-source tests, a one-command local verification runner, and engineering reports only; it does not change the production HTML/runtime. Test results are recorded in reports/ANSWER_FLOW_AND_RELIABILITY_07_TEST_PLAN.md. Product acceptance remains PARTIAL until browser, persistence, audio, and multiplayer checks run in a permitted test environment.


## Engineering checkpoint overlay — V82.67 checkpoint 08

The user confirmed the V82.66 product baseline is satisfactory. Checkpoint `V82.67 BROWSER-UI-SMOKE-08` adds a constrained Chromium UI smoke test and report only. Local and GitHub blob SHA for `tests/unit/candidate_pool_integration.test.cjs` is `c7313fe743157b5c6cde86e252983049be87ff5a`. The UI smoke uses page.set_content() with test-only in-memory storage because the environment blocks file:// and localhost navigation. It does not validate real browser persistence, IndexedDB, real audio, Firefox, or multiplayer. Production HTML remains byte-identical to the immutable V82.65 baseline.


## Engineering checkpoint overlay — V82.68 CANDIDATE-POLICY-MODULE-01

The locked V82.65 HTML remains 8,786,930 bytes / SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`. V82.68 extracts the pure candidate-policy block into a source module injected at its original position in the same classic script. No extra runtime script tag or external loading is introduced. Latest automated checks: 8/8 commands, 135 Node tests, and verifier 101/101 passed. Browser smoke rerun timed out with Playwright driver EPIPE after 11 preliminary assertions and is not considered passed. The binary ZIP and full source tree have not been published to this branch.
