#!/usr/bin/env python3
"""Executable contract tests for the deterministic source inventory generator."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parents[2]
GENERATOR = ROOT / "tools" / "generate_source_inventory.py"


def run(args, cwd=None):
    return subprocess.run(
        [sys.executable, str(GENERATOR), *args],
        cwd=cwd, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
    )


def require(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message)


def git(root, *args):
    subprocess.run(["git", *args], cwd=root, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)


def main():
    help_result = run(["--help"])
    require(help_result.returncode == 0 and "usage:" in help_result.stdout.lower(),
            "--help is parsed as a CLI option and exits without treating it as a file")
    require(not (Path.cwd() / "--help").exists(),
            "--help invocation does not create a pseudo-path file")

    with tempfile.TemporaryDirectory(prefix="amq-inventory-contract-") as temp:
        root = Path(temp)
        git(root, "init", "-q")
        git(root, "config", "user.name", "Inventory Contract")
        git(root, "config", "user.email", "inventory-contract@example.invalid")
        (root / "tracked.txt").write_text("tracked payload\n", encoding="utf-8")
        (root / "--help").write_text("not a valid repository inventory path\n", encoding="utf-8")
        git(root, "add", "--", "tracked.txt", "--help")
        git(root, "commit", "-qm", "inventory fixture")

        output = "reports/source_inventory.json"
        rejected = run(["--root", str(root), "--output", output])
        require(rejected.returncode != 0 and "option-like root path" in rejected.stdout,
                "generator rejects option-like root path instead of silently inventorying it")

        git(root, "rm", "-q", "--", "--help")
        first = run(["--root", str(root), "--output", output])
        require(first.returncode == 0, "generator succeeds for a clean tracked-file set")
        inventory_path = root / output
        payload = json.loads(inventory_path.read_text(encoding="utf-8"))
        require(payload["file_count"] == 1 and len(payload["files"]) == 1,
                "file_count equals the emitted entry count")
        require(payload["files"][0]["path"] == "tracked.txt",
                "only tracked repository files are inventoried")
        require(payload["files"][0]["bytes"] == len(b"tracked payload\n"),
                "byte count is measured from file bytes")
        git(root, "add", "--", output)
        before = inventory_path.read_bytes()
        second = run(["--root", str(root), "--output", output])
        require(second.returncode == 0, "generator succeeds when its output is already tracked")
        after = inventory_path.read_bytes()
        require(before == after, "repeated generation is byte-deterministic")
        require(json.loads(after.decode("utf-8"))["file_count"] == 1,
                "output file is excluded to avoid self-referential hashes")

        outside = run(["--root", str(root), "--output", str(root.parent / "outside.json")])
        require(outside.returncode != 0 and "inside the repository" in outside.stdout,
                "output paths outside the repository are rejected")

    print("RESULT source inventory generator contract PASS")


if __name__ == "__main__":
    main()
