#!/usr/bin/env python3
"""Ensure the modularization closeout matrix reconciles exactly with the manifest."""
from pathlib import Path
import csv
import json

ROOT = Path(__file__).resolve().parents[2]
MATRIX = ROOT / "reports/V82_85_18_MODULARIZATION_CLOSEOUT_MATRIX.csv"
MANIFEST = ROOT / "reports/FRAGMENT_MANIFEST.json"

def require(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS: " + message)

def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    with MATRIX.open("r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    fragments = [r for r in rows if r["record_type"] == "fragment"]
    modules = [r for r in rows if r["record_type"] == "module"]
    expected_fragments = {r["path"] for r in manifest["fragments"]}
    expected_modules = {r["path"] for r in manifest["modules"]}
    actual_fragments = [r["path"] for r in fragments]
    actual_modules = [r["path"] for r in modules]
    require(len(actual_fragments) == len(set(actual_fragments)), "each fragment appears exactly once")
    require(len(actual_modules) == len(set(actual_modules)), "each module appears exactly once")
    require(set(actual_fragments) == expected_fragments, "fragment paths exactly match manifest inventory")
    require(set(actual_modules) == expected_modules, "module paths exactly match manifest inventory")
    require(len(fragments) == manifest["fragment_count"] == 91, "all 91 manifest fragments are represented")
    require(sum(r["kind"] == "script" for r in fragments) == manifest["script_count"] == 41,
            "all 41 script/data fragments are represented")
    require(sum(r["kind"] == "style" for r in fragments) == manifest["style_count"] == 50,
            "all 50 style fragments are represented")
    require(len(modules) == manifest["module_count"] == 13, "all 13 source modules are represented")
    require(all(r["classification"] and r["verification_evidence"] and r["remaining_gate"] for r in rows),
            "every row has a classification, evidence and remaining gate")
    require(all(r["classification"] == "CSS_ORDER_LOCKED_ENVIRONMENT_GATE"
                for r in fragments if r["kind"] == "style"),
            "all CSS rows preserve order pending browser/cascade gate")
    require(all(r["classification"] == "SOURCE_MODULE_EXTRACTED_NOT_FULLY_DECOUPLED"
                for r in modules), "module rows do not falsely imply full decoupling")
    host_paths = {r["path"] for r in fragments}
    require(all(not r["linked_modules"] or r["path"] in host_paths for r in fragments),
            "module links point to manifest-listed host fragments")
    require(all(r["linked_modules"] in host_paths for r in modules if r["linked_modules"]),
            "every module insertion host exists in fragment inventory")
    for row in modules:
        evidence = [part.strip() for part in row["verification_evidence"].split(";") if part.strip()]
        for path in evidence:
            if path.startswith("tests/"):
                require((ROOT / path).is_file(), "module test evidence exists: " + path)
    release = manifest["release"]
    require(release["version"] == "V82.82" and release["bytes"] == 8787490
            and release["sha256"] == "227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b",
            "locked V82.82 product fingerprint remains unchanged")
    print("PASS: modularization closeout matrix reconciles")

if __name__ == "__main__":
    main()
