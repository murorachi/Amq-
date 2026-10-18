#!/usr/bin/env python3
"""Contract for the evidence-led structural issue inventory."""
import csv
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "reports" / "STRUCTURAL_ISSUE_INVENTORY.csv"
REPORT_PATH = ROOT / "reports" / "V82_86_01_STRUCTURAL_ISSUE_INVENTORY_01.md"

REQUIRED = {
    "id", "priority", "category", "target", "status",
    "classification", "evidence", "next_action", "acceptance_condition",
}
PRIORITIES = {"P0", "P1", "P2", "P3"}
CLASSIFICATIONS = {
    "EVIDENCE_BACKED_RISK", "AUDIT_REQUIRED", "EXTERNAL_GATE",
    "MAINTAINABILITY_CANDIDATE", "CONFIRMED_DEFECT",
}

def main():
    with CSV_PATH.open("r", encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        assert reader.fieldnames is not None, "CSV header missing"
        assert set(reader.fieldnames) == REQUIRED, f"unexpected CSV header: {reader.fieldnames}"
        rows = list(reader)

    assert len(rows) == 20, f"expected 20 issue rows, got {len(rows)}"
    ids = [row["id"] for row in rows]
    assert len(ids) == len(set(ids)), "duplicate issue IDs"
    assert all(re.fullmatch(r"AMQ-STR-\d{3}", issue_id) for issue_id in ids), "invalid issue ID format"

    for row in rows:
        assert row["priority"] in PRIORITIES, f'{row["id"]}: invalid priority'
        assert row["classification"] in CLASSIFICATIONS, f'{row["id"]}: invalid classification'
        for field in ("category", "target", "status", "evidence", "next_action", "acceptance_condition"):
            assert row[field].strip(), f'{row["id"]}: missing {field}'
        assert row["status"] == "Open", f'{row["id"]}: initial inventory status must be Open'
        assert row["classification"] != "CONFIRMED_DEFECT", (
            f'{row["id"]}: inventory v1 must not label a defect confirmed without reproduction evidence'
        )

    report = REPORT_PATH.read_text(encoding="utf-8")
    for issue_id in ids:
        assert issue_id in report, f"{issue_id}: absent from Markdown report"
    assert "not a claim that every line has already been manually audited" in report
    assert "No new confirmed production defect is asserted" in report
    print("PASS structural issue inventory: 20 rows, unique IDs, required fields, allowed priorities/classifications, Markdown ID parity")
    
if __name__ == "__main__":
    main()
