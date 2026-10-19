#!/usr/bin/env python3
"""Focused contract tests for checkpoint package completeness and naming."""
import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("amq_package_checkpoint", ROOT / "tools" / "package_checkpoint.py")
PACKAGE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(PACKAGE)

class PackageCheckpointContract(unittest.TestCase):
    def test_required_paths_are_present_in_current_source_tree(self):
        existing = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if p.is_file()}
        self.assertEqual(PACKAGE.missing_required_paths(existing), [])

    def test_missing_required_paths_are_sorted(self):
        self.assertEqual(
            PACKAGE.missing_required_paths(["NEXT_TASK.md"]),
            sorted(PACKAGE.REQUIRED_PACKAGE_PATHS - {"NEXT_TASK.md"}),
        )

    def test_current_package_name_is_not_stale_v82_84(self):
        self.assertIn("V82_85_18_SOURCE_INVENTORY_GATE_01", PACKAGE.PACKAGE_NAME)
        self.assertNotIn("V82_84", PACKAGE.PACKAGE_NAME)

    def test_core_reproducibility_and_acceptance_files_are_required(self):
        self.assertTrue({
            "tools/build.py",
            "tools/verify.py",
            "tools/package_checkpoint.py",
            "tests/unit/source_inventory_completeness_contract.py",
            "reports/V82_85_18_SOURCE_INVENTORY_COMPLETENESS_GATE_01.md",
        }.issubset(PACKAGE.REQUIRED_PACKAGE_PATHS))

if __name__ == "__main__":
    unittest.main(verbosity=2)
