#!/usr/bin/env python3
"""Create a review queue for V82.81's previously-unmapped CSS selectors.

This is a static ownership triage, not proof of runtime reachability. It does not edit CSS.
"""
import csv, collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'reports'/'CSS_SELECTOR_COMPONENT_MAP_V82_81.csv'
out=ROOT/'reports'/'CSS_SELECTOR_REVIEW_V82_82.csv'

def classify(fragment, selector):
    s=selector.lower()
    # Strong selector semantics take precedence over the source fragment.
    rules=[
      (('ani-srs','anisrs','srs','spaced'), 'SRS / spaced repetition', 'SRS-specific class/identifier'),
      (('learning','lsintro','lsmetric','lssection','lsweak'), 'learning / progress dashboard', 'learning-system selector family'),
      (('customlist','custom-list','qs-custom','managelist','manage-list','bulkcustomlist'), 'AMQ custom lists / list management', 'custom-list selector family'),
      (('emq','erogemusicquiz','vn49','vndb','vnlist','catalog'), 'EMQ / VNDB catalog', 'catalog or EMQ selector family'),
      (('multiplayer','mpcheck','mpfilter','mproom','mpgame','mp-'), 'multiplayer', 'multiplayer selector family'),
      (('watchlist','watchcard','watchgrid','watchcover','watchtoolbar','watchtab','watchsummary','watchpill'), 'watchlist / library', 'watchlist selector family'),
      (('quiz','answer','suggestion','quizview','quiztarget','quizstatus','quizstart'), 'quiz / answer UI', 'quiz selector family'),
      (('player','songlist','songrow','songname','songmeta','songactions','songnum','disc','listenbtn','audiodock','audioplayer','queuebtn'), 'audio / song playback UI', 'audio/player/song selector family'),
      (('drawer','detailhero','detailcover','detailhero','relationcanvas','overlay','dialog','modal','close'), 'detail panel / overlay', 'detail or overlay selector family'),
      (('brand','logo','hero','amqhome','home-menu','home-menu','homecard','home-card'), 'home / navigation', 'home branding/navigation selector family'),
      (('dashmetric','dashsection','dashintro','dashgrid','stat','stats','gridcounter','loadmore'), 'dashboard / collection grid', 'dashboard/grid selector family'),
      (('cover','cardtitle','cardfoot','sticker','tinybar','watchcard','viewmode'), 'catalog cards / presentation', 'card or catalog presentation selector family'),
      (('theme','dark-theme','color-scheme',':root','html','body','*::before','*::after','[hidden]'), 'global theme / layout', 'global theme/reset selector'),
    ]
    for tokens,group,basis in rules:
        if any(t in s for t in tokens): return group,basis
    shared_tokens=('btn','button','panel','card','row','grid','meta','actions','hidden','muted','small','empty','status','primary','danger','error','success','pill','badge','section','toolbar','tabs','nav','content','title','subtitle','field','form','toggle','item','search','filter','result','loading','spinner','progress','bar','count','label','desc','note','help','hint','warning','info','setting','option','container','header','footer','left','right','active','disabled','input','select','label')
    if any(t in s for t in shared_tokens): return 'shared UI primitive', 'generic reusable control/layout selector; cascade context may cross views'
    if fragment=='style_001.htmlpart': return 'legacy collection/library UI', 'selector belongs to style_001 legacy library/player stylesheet; exact active DOM ownership not proven'
    if fragment=='style_031.htmlpart': return 'global theme override / legacy compatibility', 'selector belongs to consolidated theme override; active DOM ownership requires browser inspection'
    if fragment=='style_003.htmlpart': return 'catalog / collection detail', 'selector belongs to catalog/detail stylesheet; active DOM ownership requires browser inspection'
    return 'manual ownership unresolved', 'no reliable semantic match; do not move this rule'

def main():
    with source.open(encoding='utf-8-sig',newline='') as f: rows=list(csv.DictReader(f))
    todo=[r for r in rows if r['component_guess']=='unmapped']
    reviewed=[]
    for r in todo:
        group,basis=classify(r['style_fragment'],r['selector'])
        reviewed.append({**r,'review_component':group,'review_basis':basis,'move_decision':'DO NOT MOVE: Firefox unavailable; responsive Chromium only; cascade/runtime ownership not fully proven','review_status':'static triage complete; cross-browser visual gate open'})
    fields=list(rows[0].keys())+['review_component','review_basis','move_decision','review_status']
    with out.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(reviewed)
    counts=collections.Counter(x['review_component'] for x in reviewed)
    print(f'PASS selector triage rows={len(reviewed)} components={dict(sorted(counts.items()))}')
    print(f'RESOLVED_BY_STATIC_TRIAGE={len(reviewed)-counts.get("manual ownership unresolved",0)} STILL_MANUAL={counts.get("manual ownership unresolved",0)}')
if __name__=='__main__':main()
