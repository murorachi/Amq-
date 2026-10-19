#!/usr/bin/env python3
"""Build a deterministic source/test checkpoint ZIP without embedding dist output.

The standalone HTML is delivered separately and is rebuilt/verified by tools/build.py
and tools/verify.py. The outer ZIP digest belongs in the external .zip.sha256 sidecar;
the fingerprint report is excluded to avoid recursive package-hash updates.
"""
from pathlib import Path
import hashlib
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
PACKAGE_NAME = 'AMQ_V82_85_27_HISTORICAL_DEBT_DEDUP_01.zip'
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path('/mnt/data') / PACKAGE_NAME
SIDECAR = Path(str(OUTPUT) + '.sha256')
MANIFEST = ROOT / 'PACKAGE_SHA256SUMS.txt'
EXCLUDED_DIRS = {'dist', '.git', '__pycache__'}
REQUIRED_PACKAGE_PATHS = {
    'BASELINE.md',
    'CURRENT_STATUS.md',
    'NEXT_TASK.md',
    '.github/workflows/v82-85-4-engineering-acceptance.yml',
    'tools/build.py',
    'tools/verify.py',
    'tools/package_checkpoint.py',
    'tests/unit/source_inventory_completeness_contract.py',
    'reports/V82_85_18_SOURCE_INVENTORY_COMPLETENESS_GATE_01.md',
    'reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md',
    'reports/V82_85_22_MULTIPLAYER_HELPER_DEDUP_01.md',
    'reports/V82_85_25_MULTIPLAYER_AUDIO_FAILURE_HANDLER_DEDUP_01.md',
    'reports/V82_85_27_SUGGESTION_CACHE_INVALIDATION_DEDUP_01.md',
    'reports/V82_85_27_ROOM_POOL_BOUNDS_VALIDATION_DEDUP_01.md',
    'tests/unit/multiplayer_audio_failure_callback_contract.test.cjs',
    'tests/unit/multiplayer_suggestion_cache_invalidation_dedup_contract.test.cjs',
    'tests/unit/multiplayer_room_pool_bounds_validation_contract.test.cjs',
    'tests/unit/multiplayer_checked_values_dedup_contract.test.cjs',
}
EXCLUDED_FROM_MANIFEST = {
    'PACKAGE_SHA256SUMS.txt',
    'reports/V82_66_ANSWER_FLOW_AND_RELIABILITY_07_SHA256.txt',
    'reports/V82_67_BROWSER_UI_SMOKE_08_SHA256.txt',
    'reports/V82_68_CANDIDATE_POLICY_MODULE_01_SHA256.txt',
    'reports/V82_69_ARCHITECTURE_STORAGE_MULTIPLAYER_01_SHA256.txt',
    'reports/V82_69_AST_DEPENDENCY_INVENTORY_01_SHA256.txt',
    'reports/V82_69_QUIZ_SUGGESTION_TEXT_01_SHA256.txt',
    'reports/V82_69_QUIZ_SUGGESTION_INTEGRATION_01_SHA256.txt',
    'reports/V82_70_QUIZ_SUGGESTION_ARIA_FIX_01_SHA256.txt',
    'reports/V82_71_SUGGESTION_EVENT_OWNERSHIP_AUDIT_01_SHA256.txt',
    'reports/V82_72_SHARED_QUIZ_SUGGESTION_SELECTION_01_SHA256.txt',
    'reports/V82_73_LOCAL_ORIGIN_ACCEPTANCE_BLOCKED_01_SHA256.txt',
    'reports/V82_74_DB_INITIALIZER_EXTRACTION_01_SHA256.txt',
    'reports/V82_75_QUIZ_SUGGESTION_RENDERER_EXTRACTION_01_SHA256.txt',
    'reports/V82_76_SCRIPT004_BOUNDARY_AUDIT_01_SHA256.txt',
    'reports/V82_77_GET_QUIZ_POOL_CHARACTERIZATION_01_SHA256.txt',
    'reports/V82_78_GET_QUIZ_POOL_EXTRACTION_01_SHA256.txt',
    'reports/V82_79_MODULARIZATION_REMAINING_WORK_AUDIT_01_SHA256.txt',
    'reports/V82_80_MODULARIZATION_BOUNDARY_AND_PURE_POOL_01_SHA256.txt',
    'reports/V82_79_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_80_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_81_MODULARIZATION_BOUNDARY_AND_LIFECYCLE_01_SHA256.txt',
    'reports/V82_81_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_82_EMQ_INVALID_SCOPE_AND_UI_ACCEPTANCE_01_SHA256.txt',
    'reports/V82_82_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_82_GITHUB_OVERLAY_STATUS.md',
    'reports/V82_83_CSS_SELECTOR_RESIDUAL_REVIEW_01_SHA256.txt',
    'reports/V82_83_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_83_GITHUB_OVERLAY_STATUS.md',
    'reports/V82_84_SOURCE_SYNC_AND_ACCEPTANCE_GATE_AUDIT_SHA256.txt',
    'reports/V82_84_PACKAGE_VERIFY_RESULTS.txt',
}
EXCLUDED_FROM_PACKAGE = {
    'reports/V82_66_ANSWER_FLOW_AND_RELIABILITY_07_SHA256.txt',
    'reports/V82_67_BROWSER_UI_SMOKE_08_SHA256.txt',
    'reports/V82_68_CANDIDATE_POLICY_MODULE_01_SHA256.txt',
    'reports/V82_69_ARCHITECTURE_STORAGE_MULTIPLAYER_01_SHA256.txt',
    'reports/V82_69_AST_DEPENDENCY_INVENTORY_01_SHA256.txt',
    'reports/V82_69_QUIZ_SUGGESTION_TEXT_01_SHA256.txt',
    'reports/V82_69_QUIZ_SUGGESTION_INTEGRATION_01_SHA256.txt',
    'reports/V82_70_QUIZ_SUGGESTION_ARIA_FIX_01_SHA256.txt',
    'reports/V82_71_SUGGESTION_EVENT_OWNERSHIP_AUDIT_01_SHA256.txt',
    'reports/V82_72_SHARED_QUIZ_SUGGESTION_SELECTION_01_SHA256.txt',
    'reports/V82_73_LOCAL_ORIGIN_ACCEPTANCE_BLOCKED_01_SHA256.txt',
    'reports/V82_74_DB_INITIALIZER_EXTRACTION_01_SHA256.txt',
    'reports/V82_75_QUIZ_SUGGESTION_RENDERER_EXTRACTION_01_SHA256.txt',
    'reports/V82_76_SCRIPT004_BOUNDARY_AUDIT_01_SHA256.txt',
    'reports/V82_77_GET_QUIZ_POOL_CHARACTERIZATION_01_SHA256.txt',
    'reports/V82_78_GET_QUIZ_POOL_EXTRACTION_01_SHA256.txt',
    'reports/V82_79_MODULARIZATION_REMAINING_WORK_AUDIT_01_SHA256.txt',
    'reports/V82_80_MODULARIZATION_BOUNDARY_AND_PURE_POOL_01_SHA256.txt',
    'reports/V82_79_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_80_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_81_MODULARIZATION_BOUNDARY_AND_LIFECYCLE_01_SHA256.txt',
    'reports/V82_81_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_82_EMQ_INVALID_SCOPE_AND_UI_ACCEPTANCE_01_SHA256.txt',
    'reports/V82_82_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_82_GITHUB_OVERLAY_STATUS.md',
    'reports/V82_83_CSS_SELECTOR_RESIDUAL_REVIEW_01_SHA256.txt',
    'reports/V82_83_PACKAGE_VERIFY_RESULTS.txt',
    'reports/V82_83_GITHUB_OVERLAY_STATUS.md',
    'reports/V82_84_SOURCE_SYNC_AND_ACCEPTANCE_GATE_AUDIT_SHA256.txt',
    'reports/V82_84_PACKAGE_VERIFY_RESULTS.txt',
}
FIXED_TIME = (2026, 10, 18, 0, 0, 0)

def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def missing_required_paths(paths):
    """Return required checkpoint files that would be absent from a package."""
    return sorted(REQUIRED_PACKAGE_PATHS - set(paths))

def included_files():
    files = []
    for p in ROOT.rglob('*'):
        if not p.is_file():
            continue
        rel = p.relative_to(ROOT).as_posix()
        if any(part in EXCLUDED_DIRS for part in p.relative_to(ROOT).parts):
            continue
        if rel in EXCLUDED_FROM_MANIFEST or rel.endswith('.pyc') or rel.endswith('.zip') or rel.endswith('.zip.sha256'):
            continue
        files.append((rel, p))
    return sorted(files)

def main():
    files = included_files()
    lines = [f'{digest(p.read_bytes())}  ./{rel}' for rel, p in files]
    MANIFEST.write_text('\n'.join(lines) + '\n', encoding='utf-8', newline='\n')
    payload_files = sorted([(p.relative_to(ROOT).as_posix(), p) for p in ROOT.rglob('*') if p.is_file()])
    payload_files = [(rel, p) for rel, p in payload_files
        if not any(part in EXCLUDED_DIRS for part in Path(rel).parts)
        and rel not in EXCLUDED_FROM_PACKAGE
        and not rel.endswith('.pyc') and not rel.endswith('.zip') and not rel.endswith('.zip.sha256')]
    missing = missing_required_paths(rel for rel, _ in payload_files)
    if missing:
        raise SystemExit('package missing required checkpoint files: ' + ', '.join(missing))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(OUTPUT, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9, strict_timestamps=True) as zf:
        for rel, p in payload_files:
            arcname = f'{ROOT.name}/{rel}'
            info = zipfile.ZipInfo(arcname, FIXED_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.create_system = 3
            info.external_attr = (0o100644 & 0xFFFF) << 16
            zf.writestr(info, p.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    outer_hash = digest(OUTPUT.read_bytes())
    SIDECAR.write_text(f'{outer_hash}  {OUTPUT.name}\n', encoding='utf-8', newline='\n')
    with zipfile.ZipFile(OUTPUT) as zf:
        crc_error = zf.testzip()
        entry_count = len(zf.namelist())
        unique_count = len(set(zf.namelist()))
        archived_paths = {name.split('/', 1)[1] for name in zf.namelist() if '/' in name}
    missing_archived = missing_required_paths(archived_paths)
    if crc_error is not None or entry_count != unique_count or missing_archived:
        raise SystemExit(f'package integrity failed: crc={crc_error!r}, entries={entry_count}, unique={unique_count}, missing_required={missing_archived}')
    print(f'PASS package: {OUTPUT}')
    print(f'bytes={OUTPUT.stat().st_size}')
    print(f'sha256={outer_hash}')
    print(f'entries={entry_count} unique={unique_count} crc=PASS required=PASS')
    print(f'sidecar={SIDECAR}')

if __name__ == '__main__':
    main()
