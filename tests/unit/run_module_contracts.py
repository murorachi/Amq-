#!/usr/bin/env python3
"""Run every Node contract referenced by the current module closeout matrix."""
from pathlib import Path
import csv
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
MATRIX = ROOT / "reports/V82_85_18_MODULARIZATION_CLOSEOUT_MATRIX.csv"

def main():
    with MATRIX.open("r", encoding="utf-8-sig", newline="") as fp:
        rows = list(csv.DictReader(fp))
    modules = [row for row in rows if row["record_type"] == "module"]
    if len(modules) != 13:
        raise SystemExit(f"expected 13 module rows in closeout matrix, found {len(modules)}")

    tests = set()
    browser_evidence = set()
    for row in modules:
        refs = [part.strip() for part in row["verification_evidence"].split(";") if part.strip()]
        unit_refs = [ref for ref in refs if ref.startswith("tests/unit/")]
        if not unit_refs:
            raise SystemExit(f"module has no direct unit-contract reference: {row['path']}")
        for ref in refs:
            path = ROOT / ref
            if not path.is_file():
                raise SystemExit(f"module evidence path is missing: {ref} ({row['path']})")
            if ref.startswith("tests/unit/"):
                if not ref.endswith(".test.cjs"):
                    raise SystemExit(f"unsupported module unit test type: {ref}")
                tests.add(ref)
            elif ref.startswith("tests/browser/"):
                browser_evidence.add(ref)
            else:
                raise SystemExit(f"unexpected module evidence path: {ref}")

    ordered = sorted(tests)
    print(f"Module rows: {len(modules)}")
    print(f"Unique Node module contract tests: {len(ordered)}")
    print(f"Browser evidence paths delegated to browser job: {len(browser_evidence)}")
    for test in ordered:
        print(f"\n=== RUN {test} ===", flush=True)
        subprocess.run(["node", test], cwd=ROOT, check=True)
        print(f"=== PASS {test} ===", flush=True)
    print(f"PASS: all {len(ordered)} unique module contract tests", flush=True)

if __name__ == "__main__":
    main()
