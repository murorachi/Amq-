#!/usr/bin/env python3
"""Static contract for the canonical AMQ acceptance runner; stdlib only."""
import ast
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RUNNER = ROOT / "tools" / "run_all_checks.py"
SELF = "tests/unit/automatic_acceptance_runner_contract.test.py"
source = RUNNER.read_text(encoding="utf-8")
tree = ast.parse(source, filename=str(RUNNER))

def require(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message)

assign = next(
    node for node in tree.body
    if isinstance(node, ast.Assign)
    and any(isinstance(target, ast.Name) and target.id == "COMMANDS" for target in node.targets)
)
commands_node = assign.value
require(isinstance(commands_node, ast.List), "runner command registry is an explicit list")

labels = []
script_paths = []
for entry in commands_node.elts:
    require(isinstance(entry, ast.Tuple) and len(entry.elts) == 2, "each command entry has label and argv")
    label_node, argv_node = entry.elts
    require(isinstance(label_node, ast.Constant) and isinstance(label_node.value, str) and label_node.value.strip(),
            "each command has a non-empty literal label")
    labels.append(label_node.value)
    require(isinstance(argv_node, ast.List) and len(argv_node.elts) >= 2,
            "each command has a non-empty argv with a script argument")
    first = argv_node.elts[0]
    is_python_or_node = (
        isinstance(first, ast.Constant) and first.value in ("node", "python", "python3")
    ) or (
        isinstance(first, ast.Attribute)
        and isinstance(first.value, ast.Name)
        and first.value.id == "sys"
        and first.attr == "executable"
    )
    require(is_python_or_node, "registered command uses an explicit supported runtime")
    script_node = argv_node.elts[1]
    require(isinstance(script_node, ast.Constant) and isinstance(script_node.value, str),
            "registered command script path is a literal")
    script_paths.append(script_node.value)

require(len(labels) == 35, "runner has exactly 35 registered commands including this contract")
require(len(labels) == len(set(labels)), "runner command labels are unique")
require(labels[-1] == "automatic acceptance runner contract", "runner contract is registered as the final command")
require(script_paths[-1] == SELF, "final command points to this contract file")
for script in script_paths:
    require((ROOT / script).is_file(), "registered script exists: " + script)

require("subprocess.run(command, cwd=ROOT" in source, "commands execute from the repository root")
require("if result.returncode:" in source and "failed.append((label, result.returncode))" in source,
        "non-zero command exits are collected as failures")
require("return 1 if failed else 0" in source, "any collected failure makes the runner exit non-zero")
require("parser.add_argument('--start'" in source and "parser.add_argument('--end'" in source,
        "runner supports bounded command ranges")
require("parser.error(f'command range must be within 1..{len(COMMANDS)}')" in source,
        "invalid command ranges are rejected")
print(f"RESULT {len(labels)} commands audited; runner contract PASS")
