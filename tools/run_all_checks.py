#!/usr/bin/env python3
"""Run the checkpoint's complete deterministic unit/build/integrity check set."""
from pathlib import Path
import subprocess
import sys
import argparse

ROOT = Path(__file__).resolve().parents[1]
COMMANDS = [
    ("candidate policy", ["node", "tests/unit/candidate_pool_policy.test.cjs"]),
    ("candidate pool integration", ["node", "tests/unit/candidate_pool_integration.test.cjs"]),
    ("getQuizPool production-source characterization", ["node", "tests/unit/get_quiz_pool_characterization_contract.test.cjs"]),
    ("getQuizPool old/new differential", ["node", "tests/unit/get_quiz_pool_differential.test.cjs"]),
    ("quiz answer metadata extraction contract", ["node", "tests/unit/quiz_answer_metadata_extraction_contract.test.cjs"]),
    ("EMQ API and list contract", ["node", "tests/unit/emq_api_contract.test.cjs"]),
    ("custom-list source ID / membership / backup contract", ["node", "tests/unit/custom_list_source_contract.test.cjs"]),
    ("AMQ/EMQ custom-list production UI acceptance", [sys.executable, "tests/browser/custom_lists_ui_acceptance.py", "--html", "dist/amq_learning_tool_v82_82.html"]),
    ("responsive Chromium visual baseline", [sys.executable, "tests/browser/responsive_visual_baseline.py", "--html", "dist/amq_learning_tool_v82_82.html"]),
    ("CSS unmapped-selector review triage", [sys.executable, "tools/review_css_selectors_v82_82.py"]),
    ("CSS selector review contract", [sys.executable, "tests/unit/css_selector_review_contract.py"]),
    ("V82.83 residual CSS selector review", [sys.executable, "tools/review_css_selector_residuals_v82_83.py"]),
    ("V82.83 residual CSS selector review contract", [sys.executable, "tests/unit/css_selector_residual_review_contract_v82_83.py"]),
    ("history/status isolation", ["node", "tests/unit/history_status_isolation.test.cjs"]),
    ("storage repository contract", ["node", "tests/unit/storage_repository_contract.test.cjs"]),
    ("backup restore contract", ["node", "tests/unit/backup_restore_contract.test.cjs"]),
    ("full backup export/import/rollback round-trip contract", ["node", "tests/unit/full_backup_restore_roundtrip_contract_v82_83.test.cjs"]),
    ("multiplayer session contract", ["node", "tests/unit/multiplayer_session_contract.test.cjs"]),
    ("solo EMQ list handoff", ["node", "tests/unit/solo_emq_list_handoff.test.cjs"]),
    ("answer-flow contract", ["node", "tests/unit/answer_flow_contract.test.cjs"]),
    ("answer/playback/storage/multiplayer boundary contract", ["node", "tests/unit/lifecycle_boundary_contract.test.cjs"]),
    ("quiz suggestion helper contract", ["node", "tests/unit/quiz_suggestion_helpers_contract.test.cjs"]),
    ("quiz answer target normalization extraction contract", ["node", "tests/unit/quiz_answer_target_normalization_contract.test.cjs"]),
    ("quiz target-value extraction contract", ["node", "tests/unit/quiz_target_value_extraction_contract.test.cjs"]),
    ("quiz practice metadata getter extraction contract", ["node", "tests/unit/quiz_practice_meta_getter_extraction_contract.test.cjs"]),
    ("quiz answer alias tooltip text extraction contract", ["node", "tests/unit/quiz_answer_alias_tooltip_text_extraction_contract.test.cjs"]),
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
    ("standalone HTML build", [sys.executable, "tools/build.py", "dist/amq_learning_tool_v82_82.html"]),
    ("integrity and deterministic rebuild", [sys.executable, "tools/verify.py"]),
]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--start', type=int, default=1, help='1-based command index, inclusive')
    parser.add_argument('--end', type=int, default=len(COMMANDS), help='1-based command index, inclusive')
    args = parser.parse_args()
    if args.start < 1 or args.end < args.start or args.end > len(COMMANDS):
        parser.error(f'command range must be within 1..{len(COMMANDS)}')
    selected = COMMANDS[args.start-1:args.end]
    failed = []
    for label, command in selected:
        print("\n=== " + label + " ===", flush=True)
        result = subprocess.run(command, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        print(result.stdout, end="" if result.stdout.endswith("\n") or not result.stdout else "\n")
        print("EXIT " + str(result.returncode), flush=True)
        if result.returncode:
            failed.append((label, result.returncode))
    print("\n=== CHECK SUMMARY ===")
    print("command_range=" + str(args.start) + ".." + str(args.end) + " commands=" + str(len(selected)) + " passed=" + str(len(selected)-len(failed)) + " failed=" + str(len(failed)))
    for label, code in failed:
        print("FAIL " + label + ": exit=" + str(code))
    return 1 if failed else 0

if __name__ == "__main__":
    raise SystemExit(main())
