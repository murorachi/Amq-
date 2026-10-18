#!/usr/bin/env python3
"""Acceptance contract for checkpoint package completeness, hashes and reproducibility."""
from pathlib import Path
import hashlib
import importlib.util
import json
import subprocess
import sys
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "tools" / "package_checkpoint.py"
SPEC = importlib.util.spec_from_file_location("package_checkpoint", SCRIPT)
PACKAGE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(PACKAGE)

def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)
    print("PASS: " + message)

def main() -> None:
    require(PACKAGE.PACKAGE_NAME == "AMQ_V82_85_17_SOURCE_PACKAGE_AUDIT_01.zip",
            "default package name identifies the current checkpoint")

    package_inventory = {rel for rel, _ in PACKAGE.package_files()}
    source_manifest = json.loads((ROOT / "reports/FRAGMENT_MANIFEST.json").read_text(encoding="utf-8"))
    required = {
        "BASELINE.md", "CURRENT_STATUS.md", "NEXT_TASK.md",
        "PACKAGE_SHA256SUMS.txt", ".github/workflows/v82-85-4-engineering-acceptance.yml",
        "reports/FRAGMENT_MANIFEST.json",
        "reports/V82_85_17_CHECKPOINT_PACKAGE_AUDIT_01.md",
        "tools/build.py", "tools/verify.py", "tools/package_checkpoint.py",
        "tests/unit/package_checkpoint_contract.py",
        "baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html",
    }
    required.update(row["path"] for row in source_manifest.get("fragments", []))
    required.update(row["path"] for row in source_manifest.get("modules", []))
    required.add(source_manifest["template"]["path"])
    missing = sorted(required - package_inventory)
    require(not missing, "package inventory includes all required source/build/test/status files and manifest sources" +
            ("" if not missing else ": " + repr(missing)))
    require(not any(rel.startswith("dist/") for rel in package_inventory),
            "generated dist output is excluded from the source checkpoint package")

    with tempfile.TemporaryDirectory(prefix="amq-package-audit-") as tmp:
        first = Path(tmp) / "first.zip"
        second = Path(tmp) / "second.zip"
        for output in (first, second):
            result = subprocess.run([sys.executable, str(SCRIPT), str(output)], cwd=ROOT,
                                    text=True, capture_output=True)
            if result.returncode:
                raise AssertionError("package builder failed:\n" + result.stdout + result.stderr)
            print(result.stdout.strip())
        first_bytes, second_bytes = first.read_bytes(), second.read_bytes()
        require(sha(first_bytes) == sha(second_bytes),
                "two clean package builds produce the same ZIP SHA-256")
        for output in (first, second):
            sidecar = Path(str(output) + ".sha256")
            expected = f"{sha(output.read_bytes())}  {output.name}\n"
            require(sidecar.read_text(encoding="utf-8") == expected,
                    "external sidecar digest matches " + output.name)
            with zipfile.ZipFile(output) as archive:
                names = archive.namelist()
                require(archive.testzip() is None, "ZIP CRC passes for " + output.name)
                require(len(names) == len(set(names)), "ZIP entry names are unique for " + output.name)
                require(set(names) == {f"{ROOT.name}/{rel}" for rel, _ in PACKAGE.package_files()},
                        "ZIP entries exactly match declared package inventory for " + output.name)
                packed_manifest = archive.read(f"{ROOT.name}/PACKAGE_SHA256SUMS.txt").decode("utf-8")
                for line in packed_manifest.splitlines():
                    digest_value, sep, relative = line.partition("  ./")
                    require(bool(sep), "checksum manifest line format is valid")
                    rel_path = relative
                    require(f"{ROOT.name}/{rel_path}" in names, "manifest path exists in ZIP: " + rel_path)
                    require(sha(archive.read(f"{ROOT.name}/{rel_path}")) == digest_value,
                            "manifest digest matches packed file: " + rel_path)
    print("PASS: checkpoint package acceptance complete")

if __name__ == "__main__":
    main()
