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
PACKAGE_NAME = 'AMQ_V82_66_EMQ_SOLO_LIST_HANDOFF_06.zip'
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path('/mnt/data') / PACKAGE_NAME
SIDECAR = Path(str(OUTPUT) + '.sha256')
MANIFEST = ROOT / 'PACKAGE_SHA256SUMS.txt'
EXCLUDED_DIRS = {'dist', '.git', '__pycache__'}
EXCLUDED_FROM_MANIFEST = {
    'PACKAGE_SHA256SUMS.txt',
    'reports/V82_66_EMQ_SOLO_LIST_HANDOFF_06_SHA256.txt',
}
EXCLUDED_FROM_PACKAGE = {
    'reports/V82_66_EMQ_SOLO_LIST_HANDOFF_06_SHA256.txt',
}
FIXED_TIME = (2026, 10, 18, 0, 0, 0)

def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

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
    if crc_error is not None or entry_count != unique_count:
        raise SystemExit(f'package integrity failed: crc={crc_error!r}, entries={entry_count}, unique={unique_count}')
    print(f'PASS package: {OUTPUT}')
    print(f'bytes={OUTPUT.stat().st_size}')
    print(f'sha256={outer_hash}')
    print(f'entries={entry_count} unique={unique_count} crc=PASS')
    print(f'sidecar={SIDECAR}')

if __name__ == '__main__':
    main()
