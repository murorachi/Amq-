#!/usr/bin/env python3
"""Guard against stale test targets and accidental overwrite of the V82.82 artifact."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
source = (ROOT / "tools/run_all_checks.py").read_text(encoding="utf-8")

build_label = '("build current V82.85.12 candidate for current-version browser checks"'
candidate_path = '"dist/amq_learning_tool_v82_85_12.html"'
quiz_label = '("quiz suggestions browser integration"'
quiz_path = '"dist/amq_learning_tool_v82_85_12.html"'
assert build_label in source, "runner builds the current candidate"
assert candidate_path in source, "candidate build targets the versioned candidate filename"
assert source.index(build_label) < source.index(quiz_label), "candidate is built before quiz suggestion browser integration"
quiz_command = source[source.index(quiz_label):source.index("\n", source.index(quiz_label))]
assert quiz_path in quiz_command, "quiz suggestion integration uses the current candidate"
assert '"dist/amq_learning_tool_v82_82.html"]),' not in source[source.index("tools/build.py"):], "runner must not overwrite the V82.82 artifact with the candidate"
assert '("Chromium CSS visual baseline"' not in source, "historical V82.80/V82.81 visual baseline is not in default current acceptance"
assert '"tools/verify.py"' in source, "deterministic build and integrity verification remains enabled"
print("PASS current candidate is built before current-version browser integration")
print("PASS V82.82 artifact is not overwritten by the candidate build")
print("PASS historical CSS baseline is excluded from default acceptance")
print("PASS deterministic build/integrity verification remains enabled")
print("assertions=6")
