#!/usr/bin/env python3
"""Chromium responsive geometry and screenshot baseline for V82.82.

This is a responsive Chromium baseline only. It does not replace Firefox validation or
native-origin acceptance; the environment blocks direct file and localhost navigation.
"""
import argparse, hashlib, json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[2]
SHIM=r'''<script>(()=>{const values=new Map();const storage={get length(){return values.size},key:i=>[...values.keys()][i]??null,getItem:k=>values.has(String(k))?values.get(String(k)):null,setItem:(k,v)=>values.set(String(k),String(v)),removeItem:k=>values.delete(String(k)),clear:()=>values.clear()};Object.defineProperty(window,'localStorage',{configurable:true,value:storage});Object.defineProperty(window,'sessionStorage',{configurable:true,value:storage});Object.defineProperty(window,'indexedDB',{configurable:true,value:{open(){throw Error('disabled in visual harness')}}});window.__AMQ_TEST_STORAGE__=values})();</script>'''
VIEWPORTS=[('mobile',390,844),('tablet',768,1024),('desktop',1440,1200)]
def geometry(page):
    body=page.locator('body').evaluate('e=>({scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight})')
    selectors=['#homeView','#quizView','#quizAnswer','#quizSuggestions','#quizStatus','#quizStart','#watchlistView']
    elements={s:page.locator(s).first.evaluate("e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2),display:c.display,visibility:c.visibility}}") if page.locator(s).count() else None for s in selectors}
    if body['scrollWidth']>body['clientWidth']+2: raise AssertionError(f'horizontal overflow {body["scrollWidth"]}>{body["clientWidth"]}')
    return {'viewport':page.evaluate('({width:innerWidth,height:innerHeight,devicePixelRatio})'),'body':body,'elements':elements}
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--html',type=Path,default=ROOT/'dist'/'amq_learning_tool_v82_82.html');ap.add_argument('--chromium',default='/usr/bin/chromium');args=ap.parse_args()
    path=args.html.resolve();source=path.read_text(encoding='utf-8');i=source.lower().find('<head>');assert i>=0;i+=len('<head>');source=source[:i]+SHIM+source[i:]
    out=ROOT/'reports'/'visual-baselines'/'v82_82_responsive';out.mkdir(parents=True,exist_ok=True);errors=[];result={'schemaVersion':1,'product':'V82.82','browser':'Chromium headless','storage':'isolated in-memory shim','network':'external HTTP/HTTPS blocked','viewports':{}}
    with sync_playwright() as pw:
        browser=pw.chromium.launch(headless=True,executable_path=args.chromium,args=['--no-sandbox','--disable-dev-shm-usage'])
        context=browser.new_context(device_scale_factor=1,color_scheme='dark',reduced_motion='reduce')
        for name,w,h in VIEWPORTS:
            page=context.new_page();page.set_viewport_size({'width':w,'height':h});page.on('pageerror',lambda e:errors.append(str(e)));page.route('http://**/*',lambda r:r.abort());page.route('https://**/*',lambda r:r.abort());page.set_content(source,wait_until='domcontentloaded',timeout=60000);page.wait_for_timeout(650)
            if page.title()!='AMQ學習工具':raise AssertionError(f'{name}: app failed to initialize')
            pages={}
            for view in ('home','quiz'):
                if view=='quiz':page.evaluate("window.__aniNavigateApp?.('quiz')");page.wait_for_timeout(150)
                data=geometry(page)
                if view=='quiz' and (not data['elements']['#quizView'] or data['elements']['#quizView']['width']<=0 or not data['elements']['#quizAnswer'] or data['elements']['#quizAnswer']['width']<=0):raise AssertionError(f'{name}: quiz controls not laid out')
                shot=out/f'v82_82_{name}_{view}.png';page.screenshot(path=str(shot),full_page=False,animations='disabled')
                data['screenshot']={'path':shot.relative_to(ROOT).as_posix(),'bytes':shot.stat().st_size,'sha256':hashlib.sha256(shot.read_bytes()).hexdigest()};pages[view]=data
                if view=='home':page.evaluate("window.__aniNavigateApp?.('home')");page.wait_for_timeout(100)
            result['viewports'][name]={'width':w,'height':h,'pages':pages};page.close()
        context.close();browser.close()
    result['pageErrors']=errors
    if errors:raise AssertionError('page errors: '+' | '.join(errors[:5]))
    report=ROOT/'reports'/'V82_82_RESPONSIVE_VISUAL_BASELINE.json';report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'PASS responsive geometry: {len(VIEWPORTS)} viewport sizes x 2 views; no horizontal overflow; no page errors')
    for name,v in result['viewports'].items():
        for view,d in v['pages'].items():print(f'{name}/{view}: {d["screenshot"]["bytes"]} bytes sha256={d["screenshot"]["sha256"]}')
    print('LIMITATION: Firefox is not installed; localhost and file:// navigation are blocked. This is not cross-browser or native-storage acceptance.')
    return 0
if __name__=='__main__':raise SystemExit(main())
