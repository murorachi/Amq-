#!/usr/bin/env python3
"""Validate engineering backlog structure and Markdown parity."""
import csv, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "reports" / "ENGINEERING_BACKLOG.csv"
MD_PATH = ROOT / "reports" / "V82_86_02_ENGINEERING_BACKLOG_01.md"
EXPECTED_COUNT = 34
EXPECTED_COLUMNS = ["id","priority","workstream","title","status","classification","evidence","dependencies","action","acceptance","automation","risk_if_skipped"]
ALLOWED_PRIORITIES = {"P0", "P1", "P2", "P3"}
ALLOWED_CLASSIFICATIONS = {"EVIDENCE_BACKED_RISK", "AUDIT_REQUIRED", "EXTERNAL_GATE", "MAINTAINABILITY_CANDIDATE"}
def main():
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        assert reader.fieldnames == EXPECTED_COLUMNS, f"unexpected columns: {reader.fieldnames}"
        rows = list(reader)
    assert len(rows) == EXPECTED_COUNT, f"expected {EXPECTED_COUNT} rows, got {len(rows)}"
    ids = [r["id"] for r in rows]
    assert len(ids) == len(set(ids)), "duplicate IDs"
    assert all(re.fullmatch(r"AMQ-TODO-\d{3}", x) for x in ids), "invalid ID format"
    assert set(r["priority"] for r in rows) <= ALLOWED_PRIORITIES
    assert set(r["classification"] for r in rows) <= ALLOWED_CLASSIFICATIONS
    assert all(r["status"] == "Open" for r in rows), "new backlog rows must start Open"
    required = ("workstream", "title", "evidence", "action", "acceptance", "automation", "risk_if_skipped")
    for r in rows:
        assert all(r[k].strip() for k in required), f"missing required field: {r['id']}"
        deps = [] if r["dependencies"] == "None" else r["dependencies"].split("; ")
        assert all(d in ids for d in deps), f"unknown dependency in {r['id']}: {deps}"
    md = MD_PATH.read_text(encoding="utf-8")
    missing = [x for x in ids if x not in md]
    assert not missing, f"Markdown missing IDs: {missing}"
    assert "逐行人工審閱全部原始碼" in md and "NOT RUN" in md
    print(f"PASS: {len(rows)} backlog rows; schema, IDs, dependencies, required fields and Markdown parity valid.")
if __name__ == "__main__":
    main()
