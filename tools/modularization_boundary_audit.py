#!/usr/bin/env python3
"""Generate auditable storage/history/AMQ-EMQ/CSS boundary inventories (stdlib only)."""
from pathlib import Path
import csv, json, re, hashlib
ROOT=Path(__file__).resolve().parents[1]
REPORTS=ROOT/'reports'; SRC=ROOT/'src'

def write_csv(path, rows, fields):
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)

def js_fragments():
    return sorted((SRC/'scripts').glob('script_*.htmlpart'))

def classify_storage(text):
    found=[]
    for api,pat in [('localStorage',r'\blocalStorage\s*\.'),('sessionStorage',r'\bsessionStorage\s*\.'),('IndexedDB',r'\b(?:indexedDB|IDBDatabase|IDBObjectStore)\b')]:
        n=len(re.findall(pat,text))
        if n: found.append((api,n))
    return found

def literal_keys(text):
    keys=set()
    patterns=[r'(?:localStorage|sessionStorage)\.(?:getItem|setItem|removeItem)\(\s*[\'\"]([^\'\"]+)[\'\"]',r'\b(?:const|let|var)\s+\w*(?:KEY|Key)\w*\s*=\s*[\'\"]([^\'\"]+)[\'\"]']
    for pat in patterns:
        keys.update(re.findall(pat,text))
    return sorted(keys)

def css_selectors(text):
    # Remove comments and capture selector preambles immediately before declaration blocks.
    text=re.sub(r'/\*.*?\*/',' ',text,flags=re.S)
    rows=[]
    for m in re.finditer(r'([^{}]+)\{',text):
        raw=' '.join(m.group(1).split()).strip()
        if not raw or raw.startswith('@') or raw.startswith('<!--'): continue
        # Exclude declaration remnants and likely keyframe percentages.
        if ':' in raw and not any(c in raw for c in '#.[]*'): continue
        selectors=[x.strip() for x in raw.split(',') if x.strip()]
        for selector in selectors:
            if selector.startswith('@') or len(selector)>400: continue
            rows.append(selector)
    return rows

def classify_selector(sel):
    low=sel.lower()
    roots=[
      ('.quizsuggestion','quiz'),('.quiz-suggestion','quiz'),('#quizview','quiz'),('.quiz-mode','quiz'),('.quiz','quiz'),
      ('#multiplayerview','multiplayer'),('.multiplayer','multiplayer'),('.mp','multiplayer'),('[id^="mp','multiplayer'),
      ('.practicehub','SRS/learning'),('.practice','SRS/learning'),('.srs','SRS/learning'),('.learning','SRS/learning'),
      ('#watchlist','watchlist/library'),('.watchlist','watchlist/library'),('.library','watchlist/library'),
      ('#discover','discover/audio'),('.discover','discover/audio'),('.audiodock','discover/audio'),('.dock','discover/audio'),
      ('.emq','EMQ custom lists'),('[data-emq','EMQ custom lists'),('.vn49','VNDB/EMQ catalog'),('#vn49','VNDB/EMQ catalog'),('.vndb','VNDB/EMQ catalog'),
      ('.history','history'),('[class*="history','history'),('.home','home/navigation'),('#home','home/navigation'),('.appnav','home/navigation'),
      ('.customlist','watchlist/library'),('.custom-list','watchlist/library'),('.focus','SRS/learning'),
      ('.modal','shared modal'),('.dialog','shared modal'),('.overlay','shared modal'),('.toast','shared notification'),('.notification','shared notification'),
      ('.profile','home/navigation'),('.catalog','VNDB/EMQ catalog'),('.cover','VNDB/EMQ catalog'),('.scene','home/navigation')
    ]
    hits=[]
    for prefix,group in roots:
        if prefix in low and group not in hits: hits.append(group)
    if len(hits)==1: return hits[0],'heuristic selector prefix'
    if len(hits)>1: return 'cross-view / shared','multiple selector prefixes'
    if ':root' in low or 'body' in low or 'html' in low: return 'global theme/layout','global selector'
    if re.fullmatch(r'(?:button|input|select|textarea|label|small|strong|em|svg|a|img|hr|table|thead|tbody|tr|td|th|h[1-6]|p|ul|ol|li|summary|details|form|fieldset|legend|code|pre|article|section|header|footer|nav|main|aside)(?::[\w-]+)?',low):
        return 'global controls','common HTML element selector; inspect cascade context'
    shared={'.btn','.wrap','.top','.panel','.card','.row','.grid','.meta','.actions','.hidden','.muted','.small','.empty','.status','.primary','.danger','.error','.success','.pill','.badge','.section','.toolbar','.tabs','.nav','.content','.title','.subtitle','.field','.form','.toggle','.item','.search','.filter','.result','.loading','.spinner','.progress','.bar','.count','.label','.desc','.note','.help','.hint','.warning','.info','.setting','.settings','.option','.button','.container','.body','.header','.footer','.left','.right','.active','.disabled'}
    tokens=set(re.findall(r'\.[a-zA-Z_][\w-]*',low))
    if tokens & shared: return 'shared UI primitives','common reusable class; view ownership may vary'
    return 'unmapped','no confident prefix or shared-primitive match'

def main():
    storage=[]; source=[]; history=[]
    for p in js_fragments():
        text=p.read_text(encoding='utf-8',errors='replace')
        calls=classify_storage(text)
        storage.append({'fragment':p.name,'bytes':p.stat().st_size,'localStorage_calls':next((n for a,n in calls if a=='localStorage'),0),'sessionStorage_calls':next((n for a,n in calls if a=='sessionStorage'),0),'indexeddb_refs':next((n for a,n in calls if a=='IndexedDB'),0),'literal_keys':' | '.join(literal_keys(text)),'direct_storage_present':bool(calls),'notes':'Static text scan; computed keys, aliases and indirect wrappers may be missed.'})
        amq=len(re.findall(r'__ani(?:Emq|ChineseTitle|History|Quiz|CandidatePool|VnLibrary|EmqAPI)',text,re.I))
        emq=len(re.findall(r'\bemq\b|EMQ|erogemusicquiz',text,re.I))
        source_mode=len(re.findall(r'sourceMode|emqMode|includeEmq|customListIds|emqListIds|aniEmq',text,re.I))
        if amq or emq or source_mode:
            source.append({'fragment':p.name,'bytes':p.stat().st_size,'api_refs':amq,'emq_terms':emq,'source_mode_scope_refs':source_mode,'boundary_class':('AMQ/EMQ shared adapter' if amq and emq else 'EMQ-specific' if emq else 'AMQ/shared quiz API'),'notes':'Lexical reference counts only; does not prove runtime call reachability.'})
        names=[]
        for m in re.finditer(r'\b(?:function\s+([A-Za-z_$][\w$]*)|(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>)',text):
            name=m.group(1) or m.group(2)
            if re.search(r'history|srs|weak|review|plan|schedule|progress|statsFor',name,re.I): names.append(name)
        if names or re.search(r'aniQuizHistory|aniSrs|aniLearningPlan|history|srs',p.name+' '+text,re.I):
            history.append({'fragment':p.name,'bytes':p.stat().st_size,'named_history_srs_functions':' | '.join(sorted(set(names))),'localStorage_calls':next((n for a,n in calls if a=='localStorage'),0),'indexeddb_refs':next((n for a,n in calls if a=='IndexedDB'),0),'key_refs':' | '.join(k for k in literal_keys(text) if re.search(r'history|srs|plan|progress|weak',k,re.I)),'notes':'Static candidates; inspect complete bodies and API callers before extraction.'})
    write_csv(REPORTS/'STORAGE_ACCESS_BOUNDARY_V82_81.csv',storage,['fragment','bytes','localStorage_calls','sessionStorage_calls','indexeddb_refs','literal_keys','direct_storage_present','notes'])
    write_csv(REPORTS/'AMQ_EMQ_SOURCE_BOUNDARY_V82_81.csv',source,['fragment','bytes','api_refs','emq_terms','source_mode_scope_refs','boundary_class','notes'])
    write_csv(REPORTS/'HISTORY_SRS_BOUNDARY_V82_81.csv',history,['fragment','bytes','named_history_srs_functions','localStorage_calls','indexeddb_refs','key_refs','notes'])
    selector_rows=[]; summary={}
    for p in sorted((SRC/'styles').glob('style_*.htmlpart')):
        text=p.read_text(encoding='utf-8',errors='replace')
        for sel in css_selectors(text):
            group,confidence=classify_selector(sel)
            selector_rows.append({'style_fragment':p.name,'selector':sel,'component_guess':group,'mapping_basis':confidence,'source_order':int(p.stem.split('_')[1]),'review_status':'heuristic; manual review required; do not reorder from this map'})
            summary[group]=summary.get(group,0)+1
    write_csv(REPORTS/'CSS_SELECTOR_COMPONENT_MAP_V82_81.csv',selector_rows,['style_fragment','selector','component_guess','mapping_basis','source_order','review_status'])
    m=json.loads((REPORTS/'FRAGMENT_MANIFEST.json').read_text(encoding='utf-8'))
    report=['# V82.81 Modularization Boundary Audit','', 'Generated from the current source tree; static evidence only. No CSS rule order was changed.','',
      '## Scope and counts','',f"- Source modules: {m.get('module_count')}.",f"- Script/data fragments: {m.get('script_count')}.",f"- CSS fragments: {m.get('style_count')}.",f"- Fragments with direct storage references: {sum(x['direct_storage_present'] for x in storage)} / {len(storage)}.",f"- Fragments with AMQ/EMQ boundary references: {len(source)}.",f"- History/SRS candidate fragments: {len(history)}.",f"- Selector records generated: {len(selector_rows)}.",'',
      '## 1. GitHub full-source publication','', 'Status: OPEN. Current remote branch is an overlay, not a complete reproducible source tree. The required completion proof is the full manifest/source/tests/tools tree present remotely, a fresh checkout build, and readback SHA-256 verification. The available GitHub connector can create/update text files and Git objects, but does not expose a direct local-archive upload operation; this audit does not claim the ZIP or full tree was published.','',
      '## 2. getQuizPool pure calculation boundary','', '- `calculateQuizPoolCandidatesV8280(ctx)` now owns candidate calculation and returns `{pool, diagnostic}` without DOM, `window`, or storage access.','- `getQuizPool()` is a thin adapter that gathers the current IIFE state, invokes the calculator, and writes the status message.','- Differential contract compares V82.79 original behavior to V82.80 across candidate ordering, focus scope, filters, malformed settings, duplicate IDs and empty-pool diagnostics.','',
      '## 3. History/SRS/storage boundary','', '- Direct storage references are inventoried per script and literal key.','- History/SRS candidate functions and keys are inventoried separately.','- Real-origin localStorage/IndexedDB persistence is still blocked in this environment; no history/SRS storage refactor is made without that acceptance.','',
      '## 4. Custom playlists and AMQ/EMQ','', '- AMQ/EMQ source references, API terms and scope-setting references are inventoried per fragment.','- Existing EMQ API, solo list handoff, history isolation and backup/restore contracts remain the semantic safety net.','- The high-coupling list membership, metadata, source-mode and multiplayer paths remain unextracted pending a source-ID contract and real service acceptance.','',
      '## 5. CSS semantic mapping','', '- Selector inventory maps selectors to tentative view/component groups using explicit prefixes.','- Mapping is heuristic, selectors can span views, and cascade order remains behaviorally significant. No rules were reordered or deduplicated.','- V82.81 adds a Chromium screenshot/geometry baseline for home and quiz; it is not cross-browser pixel equality. The selector map remains heuristic and manual review is still required before moving CSS.','',
      '## Files generated','', '- `reports/STORAGE_ACCESS_BOUNDARY_V82_81.csv`','- `reports/HISTORY_SRS_BOUNDARY_V82_81.csv`','- `reports/AMQ_EMQ_SOURCE_BOUNDARY_V82_81.csv`','- `reports/CSS_SELECTOR_COMPONENT_MAP_V82_81.csv`','']
    (REPORTS/'V82_81_MODULARIZATION_BOUNDARY_AUDIT.md').write_text('\n'.join(report),encoding='utf-8')
    print(f'PASS boundary audit: storage_fragments={len(storage)} direct_storage={sum(x["direct_storage_present"] for x in storage)} amq_emq_fragments={len(source)} history_srs_fragments={len(history)} css_selectors={len(selector_rows)} groups={json.dumps(summary,ensure_ascii=False,sort_keys=True)}')
if __name__=='__main__': main()
