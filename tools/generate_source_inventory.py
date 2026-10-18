#!/usr/bin/env python3
"""Generate a deterministic SHA-256 inventory of tracked repository files."""
import argparse
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import subprocess
import sys


DEFAULT_ROOT = Path(__file__).resolve().parents[1]


def fail(message):
    print("ERROR " + message, file=sys.stderr)
    return 2


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=DEFAULT_ROOT,
                        help="repository root (defaults to this tool's repository)")
    parser.add_argument("--output", required=True,
                        help="output JSON path, relative to repository root or absolute")
    args = parser.parse_args()

    root = args.root.resolve()
    try:
        repo_root = Path(subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            cwd=root, check=True, text=True, stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        ).stdout.strip()).resolve()
    except (OSError, subprocess.CalledProcessError) as exc:
        return fail(f"cannot locate Git repository from {root}: {exc}")
    if repo_root != root:
        return fail(f"--root must be the repository root: {repo_root}")

    output = Path(args.output)
    if not output.is_absolute():
        output = root / output
    output = output.resolve()
    try:
        output_relative = output.relative_to(root).as_posix()
    except ValueError:
        return fail("output path must be inside the repository")

    try:
        raw_paths = subprocess.run(
            ["git", "ls-files", "-z"],
            cwd=root, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        ).stdout
    except (OSError, subprocess.CalledProcessError) as exc:
        return fail(f"git ls-files failed: {exc}")

    paths = sorted(os.fsdecode(item) for item in raw_paths.split(b"\0") if item)
    records = []
    for relative in paths:
        if relative == output_relative:
            continue
        path_parts = PurePosixPath(relative).parts
        if path_parts and path_parts[0].startswith("-"):
            return fail(f"suspicious option-like root path in tracked files: {relative!r}")
        file_path = root.joinpath(*path_parts)
        if file_path.is_symlink() or not file_path.is_file():
            return fail(f"tracked path is missing, non-regular, or symlinked: {relative!r}")
        digest = hashlib.sha256()
        size = 0
        with file_path.open("rb") as stream:
            for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                digest.update(chunk)
                size += len(chunk)
        records.append({"path": relative, "sha256": digest.hexdigest(), "bytes": size})

    payload = {
        "schema": 1,
        "algorithm": "sha256",
        "file_count": len(records),
        "files": records,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    output.write_text(serialized, encoding="utf-8")
    print(f"INVENTORY PASS: {len(records)} tracked files; output excluded: {output_relative}")
    print(f"OUTPUT {output_relative}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
