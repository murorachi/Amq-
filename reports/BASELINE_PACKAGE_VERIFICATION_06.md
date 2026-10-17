# V82.65 baseline package verification (checkpoint 06)

Recovered the exact V82.65 checkpoint package from the user's Library file record, not from the similarly named audit ZIP.

- File: `AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip`
- Bytes: `124658780`
- Expected and recomputed SHA-256: `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`
- External sidecar: exact filename and digest match.
- ZIP CRC: PASS; 291 entries / 291 unique paths.
- Internal `SHA256SUMS.txt`: 290 entries / 290 unique paths; 0 missing entries; 0 digest mismatches.
- `VERSION.json` identifies V82.65 as a PARTIAL candidate-pool/filtering checkpoint.

| Asset | Bytes | SHA-256 | Result |
|---|---:|---|---|
| V82.65 standalone HTML | 8,786,930 | `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33` | PASS |
| V82.65 multiplayer server | 88,403 | `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736` | PASS |
| Catalog | 36,540,011 | `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652` | PASS |
| Unavailable audio registry | 40 | `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a` | PASS |

Verification used Python hashlib, ZIP CRC testing, and per-entry hashing directly from the archive. No product source, catalog, user storage, or baseline file was modified.
