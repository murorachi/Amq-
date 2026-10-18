#!/usr/bin/env python3
"""Run the checkpoint's complete deterministic unit/build/integrity check set."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
COMMANDS = [
    ("candidate policy", ["node", "tests/unit/candidate_pool_policy.test.cjs"]),
    ("candidate pool integration", ["node", "tests/unit/candidate_pool_integration.test.cjs"]),
    ("getQuizPool production-source characterization", ["node", "tests/unit/get_quiz_pool_characterization_contract.test.cjs"]),
    ("getQuizPool old/new differential", ["node", "tests/unit/get_quiz_pool_differential.test.cjs"]),
    ("quiz answer metadata extraction contract", ["node", "tests/unit/quiz_answer_metadata_extraction_contract.test.cjs"]),
    ("EMQ API and list contract", ["node", "tests/unit/emq_api_contract.test.cjs"]),
    ("custom-list source ID / membership / backup contract", ["node", "tests/unit/custom_list_source_contract.test.cjs"]),
    ("history/status isolation", ["node", "tests/unit/history_status_isolation.test.cjs"]),
    ("storage repository contract", ["node", "tests/unit/storage_repository_contract.test.cjs"]),
    ("backup restore contract", ["node", "tests/unit/backup_restore_contract.test.cjs"]),
    ("multiplayer session contract", ["node", "tests/unit/multiplayer_session_contract.test.cjs"]),
    ("solo EMQ list handoff", ["node", "tests/unit/solo_emq_list_handoff.test.cjs"]),
    ("answer-flow contract", ["node", "tests/unit/answer_flow_contract.test.cjs"]),
    ("answer/playback/storage/multiplayer boundary contract", ["node", "tests/unit/lifecycle_boundary_contract.test.cjs"]),
    ("quiz suggestion helper contract", ["node", "tests/unit/quiz_suggestion_helpers_contract.test.cjs"]),
    ("quiz suggestion renderer extraction contract", ["node", "tests/unit/quiz_suggestion_renderer_extraction_contract.test.cjs"]),
    ("quiz suggestion controller extraction contract", ["node", "tests/unit/quiz_suggestion_controller_extraction_contract.test.cjs"]),
    ("anime/song DB initializer extraction contract", ["node", "tests/unit/anime_song_database_extraction_contract.test.cjs"]),
    ("quiz suggestions browser integration", [sys.executable, "tests/browser/quiz_suggestions_integration.py", "--html", "dist/amq_learning_tool_v82_80.html"]),
    ("Chromium CSS visual baseline", [sys.executable, "tests/browser/css_visual_baseline.py", "--html", "dist/amq_learning_tool_v82_80.html"]),
    ("parser-backed dependency inventory", ["node", "tools/ast_dependency_inventory.cjs"]),
    ("modularization remaining-work audit", [sys.executable, "tools/modularization_progress_audit.py"]),
    ("modularization boundary audit", [sys.executable, "tools/modularization_boundary_audit.py"]),
    ("modularization boundary inventory contract", [sys.executable, "tests/unit/modularization_boundary_audit_contract.test.py"]),
    ("script_004 boundary audit contract", ["node", "tests/unit/script004_boundary_audit_contract.test.cjs"]),
    ("standalone HTML build", [sys.executable, "tools/build.py", "dist/amq_learning_tool_v82_80.html"]),
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
