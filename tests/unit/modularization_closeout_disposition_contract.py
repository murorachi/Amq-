#!/usr/bin/env python3
"""Contract for the row-by-row modularization closeout disposition."""
from pathlib import Path
import csv
import json
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[2]
MATRIX = ROOT / "reports/V82_85_18_MODULARIZATION_CLOSEOUT_MATRIX.csv"
OUTPUT = ROOT / "reports/MODULARIZATION_CLOSEOUT_DISPOSITION.csv"
MANIFEST = ROOT / "reports/FRAGMENT_MANIFEST.json"
GENERATOR = ROOT / "tools/modularization_closeout_disposition.py"

def read_csv(path):
    with path.open("r", encoding="utf-8-sig", newline="") as fp:
        return list(csv.DictReader(fp))

def require(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message)

def main():
    matrix = read_csv(MATRIX)
    rows = read_csv(OUTPUT)
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    expected = {
        "EXTERNAL_CSS_CASCADE_GATE": 50,
        "AUDITED_RETAIN_COUPLED": 4,
        "PARTIAL_EXTRACTION_REVIEW_PENDING": 3,
        "SEMANTIC_AUDIT_PENDING": 26,
        "SEMANTIC_AUDIT_PENDING_HIGH_RISK": 4,
        "EXTERNAL_MULTIPLAYER_GATE": 1,
        "PRESERVE_DATA_PAYLOAD": 2,
        "EXTERNAL_INDEXEDDB_GATE": 1,
        "MODULE_CONTRACTS_IN_CI_NOT_FULLY_DECOUPLED": 13,
    }
    require(len(matrix) == 104 and len(rows) == 104, "all 104 source-matrix rows receive one disposition")
    require(len({row["path"] for row in rows}) == 104, "all disposition paths are unique")
    require(all(row["closeout_disposition"] for row in rows), "no disposition is blank")
    require(sum(row["record_type"] == "fragment" for row in rows) == 91, "all 91 physical fragments are represented")
    require(sum(row["record_type"] == "module" for row in rows) == 13, "all 13 extracted modules are represented")

    fragment_paths = {row["path"] for row in rows if row["record_type"] == "fragment"}
    module_paths = {row["path"] for row in rows if row["record_type"] == "module"}
    require(fragment_paths == {row["path"] for row in manifest["fragments"]}, "fragment disposition inventory exactly matches source manifest")
    require(module_paths == {row["path"] for row in manifest["modules"]}, "module disposition inventory exactly matches source manifest")

    counts = {}
    for row in rows:
        key = row["closeout_disposition"]
        counts[key] = counts.get(key, 0) + 1
    require(counts == expected, "closeout disposition counts match reviewed category boundaries")

    for row in rows:
        if row["closeout_disposition"] == "AUDITED_RETAIN_COUPLED":
            evidence = row["disposition_evidence"]
            require((ROOT / evidence).is_file(), "retain-coupled decision has an existing audit report: " + row["path"])
        if row["record_type"] == "module":
            require(row["closeout_disposition"] == "MODULE_CONTRACTS_IN_CI_NOT_FULLY_DECOUPLED", "module is marked CI-covered without falsely claiming full decoupling: " + row["path"])
            for evidence in row["disposition_evidence"].split(";"):
                evidence = evidence.strip()
                if evidence.startswith("tests/"):
                    require((ROOT / evidence).is_file(), "module test evidence exists: " + evidence)

    with tempfile.TemporaryDirectory(prefix="amq-closeout-disposition-") as temp:
        generated = Path(temp) / "disposition.csv"
        subprocess.run([sys.executable, str(GENERATOR), str(generated)], cwd=ROOT, check=True, capture_output=True, text=True)
        require(generated.read_bytes() == OUTPUT.read_bytes(), "disposition CSV is reproducible from the source matrix")
    print("PASS modularization closeout disposition contract")

if __name__ == "__main__":
    main()
