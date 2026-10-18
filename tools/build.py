#!/usr/bin/env python3
"""Deterministic byte-preserving AMQ single-file HTML builder (Python stdlib only)."""
from pathlib import Path
import hashlib, json, os, sys, tempfile
ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/'reports/FRAGMENT_MANIFEST.json'
def sha(b): return hashlib.sha256(b).hexdigest()
def main():
    m=json.loads(MANIFEST.read_text(encoding='utf-8'))
    baseline=m['baseline']; template_path=ROOT/m['template']['path']
    template=template_path.read_bytes()
    if len(template)!=m['template']['bytes'] or sha(template)!=m['template']['sha256']:
        raise SystemExit('ERROR: template integrity check failed')
    out=template
    for row in m['fragments']:
        marker=f"<!-- AMQ_SPLIT_FRAGMENT:{row['kind']}:{row['index']:03d} -->".encode()
        frag=(ROOT/row['path']).read_bytes()
        if len(frag)!=row['byte_length'] or sha(frag)!=row['sha256']:
            raise SystemExit(f"ERROR: fragment integrity check failed: {row['path']}")
        if out.count(marker)!=1:
            raise SystemExit(f'ERROR: expected exactly one marker {marker!r}, got {out.count(marker)}')
        out=out.replace(marker,frag,1)
    for row in m.get('modules', []):
        marker=row['marker'].encode()
        module=(ROOT/row['path']).read_bytes()
        if len(module)!=row['byte_length'] or sha(module)!=row['sha256']:
            raise SystemExit(f"ERROR: module integrity check failed: {row['path']}")
        if out.count(marker)!=1:
            raise SystemExit(f'ERROR: expected exactly one module marker {marker!r}, got {out.count(marker)}')
        out=out.replace(marker,module,1)
    if b'AMQ_SPLIT_FRAGMENT:' in out or b'AMQ_SPLIT_MODULE:' in out:
        raise SystemExit('ERROR: unresolved source marker remains')
    expected=m.get('release') or baseline
    if expected.get('sha256') and (len(out)!=expected['bytes'] or sha(out)!=expected['sha256']):
        raise SystemExit(f"ERROR: reconstructed HTML differs from expected release {expected.get('version', 'baseline')}; bytes={len(out)} sha256={sha(out)}")
    target=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'dist/amq_learning_tool_v82_82.html'
    target=target.resolve(); target.parent.mkdir(parents=True,exist_ok=True)
    # Write to same directory and atomically replace only after all validations pass.
    fd,tmp=tempfile.mkstemp(prefix=target.name+'.',suffix='.tmp',dir=target.parent)
    try:
        with os.fdopen(fd,'wb') as f: f.write(out); f.flush(); os.fsync(f.fileno())
        if sha(Path(tmp).read_bytes())!=sha(out): raise SystemExit('ERROR: temporary output verification failed')
        os.replace(tmp,target)
    finally:
        if os.path.exists(tmp): os.unlink(tmp)
    print(f'PASS build: {target}')
    print(f'bytes={len(out)} sha256={sha(out)}')
if __name__=='__main__': main()
