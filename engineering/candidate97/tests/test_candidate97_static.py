#!/usr/bin/env python3
"""Static guard for the Candidate 97 standalone HTML; no third-party packages required."""
from pathlib import Path
import hashlib
import sys

HTML_NAME = "amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html"
ROOT = Path(__file__).resolve().parents[3]
HTML = ROOT / HTML_NAME

if not HTML.is_file():
    raise SystemExit(f"Candidate HTML missing: {HTML}")

raw = HTML.read_bytes()
text = raw.decode("utf-8")
checks = {
    "AniList removal control": "aniListRemoveImportedBtn" in text,
    "MAL removal control": "malRemoveImportedBtn" in text,
    "VNDB local-list removal control": "vn49RemoveLocalList" in text,
    "batch workspace removed": "批次整理" not in text,
    "catalog workspace present": "圖鑑" in text,
    "AniList/MAL import error handling": "aniListImportStatus" in text,
    "VNDB import error handling": "VNDB 拒絕存取" in text,
}
failed = [name for name, passed in checks.items() if not passed]
print(f"file={HTML.name}")
print(f"bytes={len(raw)}")
print(f"sha256={hashlib.sha256(raw).hexdigest()}")
for name, passed in checks.items():
    print(f"{'PASS' if passed else 'FAIL'}: {name}")
if failed:
    raise SystemExit(f"{len(failed)} static assertions failed")
