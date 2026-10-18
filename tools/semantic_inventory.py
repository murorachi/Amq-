#!/usr/bin/env python3
"""Conservative regex inventory for preserved inline JS fragments; not a full JS parser."""
from pathlib import Path
import csv, re, collections
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'reports'
files = sorted((ROOT/'src/scripts').glob('script_*.htmlpart')) + sorted((ROOT/'src/modules').glob('*.js')) + sorted((ROOT/'src/modules').glob('*.htmlpart'))
patterns = {
 'function_decl': re.compile(r'\bfunction\s+([A-Za-z_$][\w$]*)\s*\('),
 'assigned_func': re.compile(r'\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function\b|\([^;{}]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)'),
 'window_assign': re.compile(r'\bwindow\.([A-Za-z_$][\w$]*)\s*='),
 'id_access': re.compile(r"getElementById\(\s*['\"]([^'\"]+)['\"]\s*\)"),
 'query_id': re.compile(r"querySelector(?:All)?\(\s*['\"]#([A-Za-z_][\w:.-]*)['\"]\s*\)"),
 'listener': re.compile(r'\baddEventListener\s*\(\s*[\'\"]([^\'\"]+)[\'\"]'),
 'timer': re.compile(r'\b(setTimeout|setInterval|clearTimeout|clearInterval|requestAnimationFrame|cancelAnimationFrame)\s*\('),
 'storage': re.compile(r'\b(localStorage|sessionStorage)\.(getItem|setItem|removeItem|clear)\s*\('),
 'storage_key': re.compile(r"\b(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\s*\(\s*(['\"])(.*?)\1"),
 'indexeddb': re.compile(r'\bindexedDB\.(open|deleteDatabase)\s*\('),
 'db_name': re.compile(r"\b(?:DB_NAME|CACHE_DB|DB|DATABASE_NAME)\s*=\s*(['\"])(.*?)\1"),
}
def rows_for(pattern):
 out=[]
 for f in files:
  s=f.read_text(encoding='utf-8', errors='replace')
  for m in pattern.finditer(s): out.append((f.name,m.group(1),m.start()))
 return out
# Function definition inventory with duplicate-name groups.
funcs=[]
for f in files:
 s=f.read_text(encoding='utf-8', errors='replace')
 matches=[]
 for kind in ('function_decl','assigned_func'):
  for m in patterns[kind].finditer(s): matches.append((m.start(),m.group(1),kind))
 for pos,name,kind in sorted(matches):
  funcs.append({'name':name,'fragment':f.name,'kind':kind,'offset':pos,'context':s[max(0,pos-80):min(len(s),pos+160)].replace('\n',' ')})
counts=collections.Counter(x['name'] for x in funcs)
with (OUT/'FUNCTION_DEFINITION_INVENTORY.csv').open('w',newline='',encoding='utf-8-sig') as fp:
 w=csv.DictWriter(fp,fieldnames=['name','fragment','kind','offset','occurrences_across_fragments','duplicate_name','context']);w.writeheader()
 for x in funcs:
  w.writerow({**x,'occurrences_across_fragments':counts[x['name']],'duplicate_name':counts[x['name']]>1})
# Global/window properties assigned; only explicit window properties are asserted as globals.
with (OUT/'WINDOW_EXPORT_INVENTORY.csv').open('w',newline='',encoding='utf-8-sig') as fp:
 w=csv.writer(fp);w.writerow(['fragment','property','offset','context'])
 for f in files:
  s=f.read_text(encoding='utf-8',errors='replace')
  for m in patterns['window_assign'].finditer(s): w.writerow([f.name,m.group(1),m.start(),s[max(0,m.start()-70):m.start()+130].replace('\n',' ')])
# DOM id references
with (OUT/'DOM_ID_REFERENCE_INVENTORY.csv').open('w',newline='',encoding='utf-8-sig') as fp:
 w=csv.writer(fp);w.writerow(['fragment','id','reference_kind','occurrences'])
 for f in files:
  s=f.read_text(encoding='utf-8',errors='replace')
  c=collections.Counter()
  for m in patterns['id_access'].finditer(s): c[(m.group(1),'getElementById')]+=1
  for m in patterns['query_id'].finditer(s): c[(m.group(1),'querySelector')]+=1
  for (id_,kind),n in sorted(c.items()): w.writerow([f.name,id_,kind,n])
# Listener/timer/storage/db counts by fragment, with observed literal storage keys.
with (OUT/'LIFECYCLE_STORAGE_INVENTORY.csv').open('w',newline='',encoding='utf-8-sig') as fp:
 w=csv.writer(fp);w.writerow(['fragment','category','name_or_key','count','notes'])
 for f in files:
  s=f.read_text(encoding='utf-8',errors='replace')
  for key in ('listener','timer','storage','indexeddb'):
   c=collections.Counter(m.group(1) if key!='storage' else m.group(1)+'.'+m.group(2) for m in patterns[key].finditer(s))
   for name,n in sorted(c.items()): w.writerow([f.name,key,name,n,'static regex count; dynamic calls may be missed'])
  keys=collections.Counter(m.group(2) for m in patterns['storage_key'].finditer(s))
  for name,n in sorted(keys.items()): w.writerow([f.name,'literal_storage_key',name,n,'literal key only; template/dynamic keys are not captured'])
# Summary
summary=[]
summary.append('# Static semantic inventory summary')
summary.append('')
summary.append('Generated from the byte-preserved script fragments and extracted source modules in the current checkpoint. Regex-based inventory only; not a complete JavaScript AST or call graph.')
summary.append('')
summary.append(f'- Script/data fragments and source modules scanned: {len(files)}')
summary.append(f'- Named function/arrow-style declarations recorded: {len(funcs)}')
summary.append(f'- Names with more than one detected definition: {sum(1 for n,c in counts.items() if c>1)}')
summary.append(f'- Explicit window property assignments: {sum(1 for _ in patterns["window_assign"].finditer("".join(f.read_text(encoding="utf-8",errors="replace") for f in files)))}')
summary.append(f'- DOM ID references: {sum(1 for f in files for _ in patterns["id_access"].finditer(f.read_text(encoding="utf-8",errors="replace"))) + sum(1 for f in files for _ in patterns["query_id"].finditer(f.read_text(encoding="utf-8",errors="replace")))}')
summary.append('')
summary.append('## Interpretation rules')
summary.append('- Duplicate function names are leads for review, not proof of redundant behavior; later assignments may intentionally override earlier functions.')
summary.append('- Listener and timer counts are syntactic occurrence counts, not proof that duplicate listeners or leaked timers exist.')
summary.append('- Storage keys are literal matches only; dynamic/template keys and indirect repository access require manual tracing.')
summary.append('- DOM references are reads/selectors; this inventory does not fully identify all writers or dynamic IDs.')
summary.append('- Embedded JSON and compressed/base64 payloads are retained and are not treated as executable logic.')
(OUT/'SEMANTIC_INVENTORY_SUMMARY.md').write_text('\n'.join(summary)+'\n',encoding='utf-8')
print('\n'.join(summary))
