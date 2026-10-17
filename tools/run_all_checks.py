#!/usr/bin/env python3
"""Run the checkpoint's complete deterministic unit/build/integrity check set."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
COMMANDS = [
    ("candidate policy", ["node", "tests/unit/candidate_pool_policy.test.cjs"]),
    ("candidate pool integration", ["node", "tests/unit/candidate_pool_integration.test.cjs"]),
    ("EMQ API and list contract", ["node", "tests/unit/emq_api_contract.test.cjs"]),
    ("history/status isolation", ["node", "tests/unit/history_status_isolation.test.cjs"]),
    ("solo EMQ list handoff", ["node", "tests/unit/solo_emq_list_handoff.test.cjs"]),
    ("answer-flow contract", ["node", "tests/unit/answer_flow_contract.test.cjs"]),
    ("standalone HTML build", [sys.executable, "tools/build.py"]),
    ("integrity and deterministic rebuild", [sys.executable, "tools/verify.py"]),
]

def main():
    failed = []
    for label, command in COMMANDS:
        print("\n=== " + label + " ===", flush=True)
        result = subprocess.run(command, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        print(result.stdout, end="" if result.stdout.endswith("\n") or not result.stdout else "\n")
        print("EXIT " + str(result.returncode), flush=True)
        if result.returncode:
            failed.append((label, result.returncode))
    print("\n=== CHECK SUMMARY ===")
    print("commands=" + str(len(COMMANDS)) + " passed=" + str(len(COMMANDS)-len(failed)) + " failed=" + str(len(failed)))
    for label, code in failed:
        print("FAIL " + label + ": exit=" + str(code))
    return 1 if failed else 0

if __name__ == "__main__":
    raise SystemExit(main())
