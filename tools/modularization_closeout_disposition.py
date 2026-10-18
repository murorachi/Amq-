#!/usr/bin/env python3
"""Build a deterministic, evidence-linked closeout disposition for every matrix row."""
from pathlib import Path
import csv
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "reports/V82_85_18_MODULARIZATION_CLOSEOUT_MATRIX.csv"
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "reports/MODULARIZATION_CLOSEOUT_DISPOSITION.csv"

AUDITED_KEEP = {
    "src/scripts/script_002.htmlpart": "reports/V82_85_15_PURE_HELPER_BOUNDARY_AUDIT_01.md",
    "src/scripts/script_003.htmlpart": "reports/V82_85_15_PURE_HELPER_BOUNDARY_AUDIT_01.md",
    "src/scripts/script_004.htmlpart": "reports/V82_85_21_SCRIPT004_EXTRACTION_DECISION_01.md",
    "src/scripts/script_040.htmlpart": "reports/V82_85_15_PURE_HELPER_BOUNDARY_AUDIT_01.md",
}

def disposition(row):
    path, kind, classification = row["path"], row["kind"], row["classification"]
    if row["record_type"] == "module":
        return "MODULE_CONTRACTS_IN_CI_NOT_FULLY_DECOUPLED", "reports/V82_85_20_MODULE_CONTRACT_CI_COVERAGE_01.md"
    if path in AUDITED_KEEP:
        return "AUDITED_RETAIN_COUPLED", AUDITED_KEEP[path]
    if classification == "CSS_ORDER_LOCKED_ENVIRONMENT_GATE":
        return "EXTERNAL_CSS_CASCADE_GATE", "matrix classification plus remaining_gate; preserve source order"
    if classification == "SEMANTIC_BOUNDARY_AUDIT_REQUIRED":
        return "SEMANTIC_AUDIT_PENDING", "matrix classification plus remaining_gate"
    if classification == "PARTIAL_EXTRACTION_REMAINDER":
        return "PARTIAL_EXTRACTION_REVIEW_PENDING", "matrix classification plus remaining_gate"
    if classification == "PARTIAL_EXTRACTION_HIGH_RISK_REMAINDER":
        return "HIGH_RISK_LEGACY_REMAINDER", "matrix classification plus remaining_gate"
    if classification == "STATE_STORAGE_OR_IDENTITY_BOUNDARY_AUDIT_REQUIRED":
        return "SEMANTIC_AUDIT_PENDING_HIGH_RISK", "matrix classification plus remaining_gate"
    if classification == "ENVIRONMENT_BLOCKED_LIVE_MULTIPLAYER":
        return "EXTERNAL_MULTIPLAYER_GATE", "matrix classification plus remaining_gate"
    if classification == "ENVIRONMENT_BLOCKED_INDEXEDDB":
        return "EXTERNAL_INDEXEDDB_GATE", "matrix classification plus remaining_gate"
    if classification == "DATA_ASSET_PRESERVE":
        return "PRESERVE_DATA_PAYLOAD", "matrix classification plus remaining_gate"
    raise ValueError(f"unclassified closeout row: {path}: {classification}")

def main():
    with SOURCE.open("r", encoding="utf-8-sig", newline="") as fp:
        rows = list(csv.DictReader(fp))
    output_rows = []
    for row in rows:
        closeout, evidence = disposition(row)
        output_rows.append({
            "record_type": row["record_type"],
            "kind": row["kind"],
            "path": row["path"],
            "order": row["order"],
            "bytes": row["bytes"],
            "sha256": row["sha256"],
            "source_classification": row["classification"],
            "closeout_disposition": closeout,
            "disposition_evidence": evidence,
            "remaining_gate": row["remaining_gate"],
            "linked_modules": row["linked_modules"],
            "notes": row["notes"],
        })
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8-sig", newline="") as fp:
        writer = csv.DictWriter(fp, fieldnames=list(output_rows[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(output_rows)
    counts = {}
    for row in output_rows:
        counts[row["closeout_disposition"]] = counts.get(row["closeout_disposition"], 0) + 1
    print(f"PASS closeout disposition rows={len(output_rows)}")
    for key in sorted(counts):
        print(f"{key}={counts[key]}")
    print(f"output={OUTPUT}")

if __name__ == "__main__":
    main()
