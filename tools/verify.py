#!/usr/bin/env python3
"""Integrity, deterministic build, and source-to-output equivalence checks."""
from pathlib import Path
import hashlib, json, subprocess, sys, tempfile
ROOT=Path(__file__).resolve().parents[1]
def sha(b): return hashlib.sha256(b).hexdigest()
def main():
 m=json.loads((ROOT/'reports/FRAGMENT_MANIFEST.json').read_text(encoding='utf-8'))
 failures=[]; checks=[]
 def check(name,ok,detail=''):
  checks.append((name,bool(ok),detail)); print(('PASS' if ok else 'FAIL')+': '+name+((' - '+detail) if detail else ''))
 base=m['baseline']; template=(ROOT/m['template']['path']).read_bytes()
 check('baseline metadata format',len(base['sha256'])==64 and base['bytes']>0)
 baseline_file=ROOT/'baseline'/base['filename']; baseline_bytes=baseline_file.read_bytes() if baseline_file.is_file() else b''
 check('immutable baseline fingerprint',len(baseline_bytes)==base['bytes'] and sha(baseline_bytes)==base['sha256'])
 check('template fingerprint',len(template)==m['template']['bytes'] and sha(template)==m['template']['sha256'])
 check('fragment counts',len(m['fragments'])==m['fragment_count'] and sum(x['kind']=='style' for x in m['fragments'])==m['style_count'] and sum(x['kind']=='script' for x in m['fragments'])==m['script_count'])
 # Prevent new or renamed source fragments from silently escaping the manifest/build.
 manifest_fragments=sorted(row['path'] for row in m['fragments'])
 disk_fragments=sorted(p.relative_to(ROOT).as_posix() for folder in (ROOT/'src/styles',ROOT/'src/scripts') for p in folder.glob('*.htmlpart'))
 missing_fragments=sorted(set(disk_fragments)-set(manifest_fragments))
 stale_fragments=sorted(set(manifest_fragments)-set(disk_fragments))
 check('fragment source inventory completeness',disk_fragments==manifest_fragments,
       f'missing from manifest={missing_fragments}; absent on disk={stale_fragments}')
 manifest_modules=sorted(row['path'] for row in m.get('modules', []))
 disk_modules=sorted(p.relative_to(ROOT).as_posix() for p in (ROOT/'src/modules').iterdir() if p.is_file())
 missing_modules=sorted(set(disk_modules)-set(manifest_modules))
 stale_modules=sorted(set(manifest_modules)-set(disk_modules))
 check('module source inventory completeness',disk_modules==manifest_modules,
       f'missing from manifest={missing_modules}; absent on disk={stale_modules}')
 for row in m['fragments']:
  p=ROOT/row['path']; b=p.read_bytes() if p.is_file() else b''
  check('fragment '+row['path'],p.is_file() and len(b)==row['byte_length'] and sha(b)==row['sha256'])
 modules=m.get('modules', [])
 check('module count',len(modules)==m.get('module_count',0))
 for row in modules:
  p=ROOT/row['path']; b=p.read_bytes() if p.is_file() else b''
  check('module '+row['path'],p.is_file() and len(b)==row['byte_length'] and sha(b)==row['sha256'])
  marker_source=ROOT/row.get('insertion_fragment','src/scripts/script_004.htmlpart')
  marker_bytes=row['marker'].encode()
  check('module marker '+row['name'],template.count(marker_bytes)==0 and marker_source.is_file() and marker_source.read_bytes().count(marker_bytes)==1)
 with tempfile.TemporaryDirectory(prefix='amq-v8267-module-') as td:
  a=Path(td)/'first.html'; b=Path(td)/'second.html'
  for target in (a,b):
   r=subprocess.run([sys.executable,str(ROOT/'tools/build.py'),str(target)],capture_output=True,text=True)
   check('build '+target.name,r.returncode==0,(r.stdout+r.stderr).strip())
  if a.exists() and b.exists():
   ba,bb=a.read_bytes(),b.read_bytes()
   check('deterministic build hash',sha(ba)==sha(bb),sha(ba))
   expected=m.get('release') or base
   check('byte-identical to expected release',len(ba)==expected['bytes'] and sha(ba)==expected['sha256'],f"version={expected.get('version','baseline')} bytes={len(ba)} sha256={sha(ba)}")
 passed=sum(x[1] for x in checks); failed=len(checks)-passed
 print(f'RESULT: {passed} passed, {failed} failed, {len(checks)} total')
 return 1 if failed else 0
if __name__=='__main__': raise SystemExit(main())
