#!/usr/bin/env python3
"""Focused contract tests for reverse source-inventory validation."""
import importlib.util
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("amq_verify", ROOT / "tools" / "verify.py")
VERIFY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFY)

class InventoryDeltaContract(unittest.TestCase):
    def test_matching_inventory_has_no_delta(self):
        self.assertEqual(VERIFY.inventory_delta(["a.htmlpart", "b.htmlpart"], ["b.htmlpart", "a.htmlpart"]), ([], []))

    def test_unlisted_disk_file_is_reported(self):
        self.assertEqual(VERIFY.inventory_delta(["a.htmlpart"], ["a.htmlpart", "new.htmlpart"]), (["new.htmlpart"], []))

    def test_stale_manifest_entry_is_reported(self):
        self.assertEqual(VERIFY.inventory_delta(["a.htmlpart", "gone.htmlpart"], ["a.htmlpart"]), ([], ["gone.htmlpart"]))

    def test_both_directions_are_reported_and_sorted(self):
        self.assertEqual(
            VERIFY.inventory_delta(["z.htmlpart", "gone.htmlpart"], ["new-b.htmlpart", "new-a.htmlpart"]),
            (["new-a.htmlpart", "new-b.htmlpart"], ["gone.htmlpart", "z.htmlpart"]),
        )

if __name__ == "__main__":
    unittest.main(verbosity=2)
