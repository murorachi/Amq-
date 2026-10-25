#!/usr/bin/env python3
"""Stage 6 static audit for AMQ candidate HTMLs. No source edits."""
import argparse, hashlib, json, subprocess, tempfile
from pathlib import Path
from collections import Counter
from bs4 import BeautifulSoup
import tinycss2
parser=argparse.ArgumentParser(description='Static audit of AMQ candidate HTML files; requires bs4, tinycss2 and Node.js.')
for candidate in ('295','299','300','301','302'):
    parser.add_argument(f'--candidate{candidate}', help=f'Path to Candidate{candidate} HTML')
args=parser.parse_args()
FILES={f'Candidate{c}':Path(getattr(args,f'candidate{c}')) for c in ('295','299','300','301','302') if getattr(args,f'candidate{c}')}
if not FILES: parser.error('provide one or more --candidate295/299/300/301/302 paths')
missing=[f'{name}: {path}' for name,path in FILES.items() if not path.is_file()]
if missing: parser.error('input file(s) not found: '+'; '.join(missing))
results=[]
for name,path in FILES.items():
    b=path.read_bytes(); soup=BeautifulSoup(b.decode('utf-8'),'html.parser')
    ids=[e.get('id') for e in soup.find_all(id=True)]; counts=Counter(ids)
    duplicates=sorted(k for k,v in counts.items() if v>1)
    scripts=[]; script_errors=[]; skipped=0
    for idx,tag in enumerate(soup.find_all('script')):
        if tag.get('src'): continue
        typ=(tag.get('type') or '').lower().strip()
        if typ and typ not in ('text/javascript','application/javascript','module'): skipped+=1; continue
        code=tag.string if tag.string is not None else tag.get_text()
        if not code.strip(): continue
        scripts.append(idx)
        with tempfile.NamedTemporaryFile('w',suffix='.js',encoding='utf-8',delete=False) as f:
            f.write(code); tmp=Path(f.name)
        cmd=['node','--check',str(tmp)]
        if typ=='module': cmd=['node','--input-type=module','--check',str(tmp)]
        cp=subprocess.run(cmd,text=True,capture_output=True); tmp.unlink(missing_ok=True)
        if cp.returncode: script_errors.append({'scriptIndex':idx,'type':typ or 'classic','stderr':(cp.stderr or cp.stdout)[-1000:]})
    css_errors=[]; rule_count=0; decl_errors=0; styles=soup.find_all('style')
    for si,style in enumerate(styles):
        for rule in tinycss2.parse_stylesheet(style.get_text(),skip_comments=True,skip_whitespace=True):
            if rule.type=='error': css_errors.append({'styleIndex':si,'message':rule.message})
            elif rule.type=='qualified-rule':
                rule_count+=1
                for d in tinycss2.parse_declaration_list(rule.content,skip_comments=True,skip_whitespace=True):
                    if d.type=='error': decl_errors+=1
    results.append({'candidate':name,'file':path.name,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'inlineExecutableScripts':len(scripts),'scriptSyntaxErrors':script_errors,'nonExecutableScriptsSkipped':skipped,'styleBlocks':len(styles),'topLevelCssRules':rule_count,'cssStylesheetErrors':css_errors,'cssDeclarationErrors':decl_errors,'htmlIds':len(ids),'uniqueHtmlIds':len(counts),'duplicateHtmlIds':duplicates,'staticVerdict':'PASS' if not script_errors and not css_errors and decl_errors==0 and not duplicates else 'FAIL'})
print(json.dumps({'reportVersion':1,'purpose':'static-only Stage 6 candidate inventory; not browser/runtime E2E','candidates':results},ensure_ascii=False,indent=2))
if any(r['staticVerdict']!='PASS' for r in results): raise SystemExit(1)
