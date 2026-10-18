# V82.65 baseline package verification (recovery checkpoint 06)

## Source and identity

Recovered the exact archived V82.65 checkpoint package from the user's Library file record, not from the similarly named audit ZIP.

- File: `AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip`
- Bytes: `124658780`
- Expected and recomputed SHA-256: `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`
- External sidecar: exact filename and digest match.
- ZIP CRC: PASS (`ZipFile.testzip()` returned `None`).
- Entries: 291; unique paths: 291.
- Internal `SHA256SUMS.txt`: 290 entries / 290 unique paths; 0 missing entries; 0 digest mismatches.
- `VERSION.json`: identifies V82.65 as a PARTIAL candidate-pool/filtering checkpoint, not a full engineering-completion release.

## Product payload fingerprints

| Asset | Bytes | SHA-256 | Result |
|---|---:|---|---|
| `amq_learning_tool_v82_65_candidate_pool_cleanup.html` | 8,786,930 | `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33` | PASS |
| `anisong_multiplayer_room_server_v82_65.py` | 88,403 | `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736` | PASS |
| `anisong_multiplayer_catalog_server.json` | 36,540,011 | `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652` | PASS |
| `anisong_multiplayer_unavailable_audio_v82_59.json` | 40 | `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a` | PASS |

## Commands / assertions

- Recomputed outer ZIP SHA-256 with Python `hashlib`.
- Recomputed sidecar comparison.
- Ran ZIP CRC validation.
- Parsed `SHA256SUMS.txt` and hashed every listed member directly from the archive without extracting or modifying the original package.
- Recomputed size and SHA-256 for all four current V82.65 product assets.

No product source, catalog, user storage, or baseline file was modified during verification. The recovered archive is kept in `/mnt/data/v82_65_baseline_recovery/` as a separate, untouched copy.
