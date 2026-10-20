import asyncio,json,time
from pathlib import Path
from playwright.async_api import async_playwright
async def main():
 r={"checks":[],"errors":[],"console_errors":[]}; started=time.time()
 async with async_playwright() as p:
  b=await p.chromium.launch(); page=await b.new_page(viewport={"width":1440,"height":900},device_scale_factor=1)
  page.on("pageerror",lambda e:r["errors"].append(str(e)))
  page.on("console",lambda m:r["console_errors"].append(m.text) if m.type=="error" else None)
  response=await page.goto("http://127.0.0.1:8765/candidate.html",wait_until="domcontentloaded",timeout=45000); assert response and response.status==200
  await page.wait_for_function("document.readyState==='complete'",timeout=45000); await page.wait_for_timeout(2200)
  r["storage"]=await page.evaluate("""async()=>{let db=false;try{await new Promise((ok,no)=>{let x=indexedDB.open('amq20probe',1);x.onsuccess=()=>{db=true;x.result.close();indexedDB.deleteDatabase('amq20probe');ok()};x.onerror=()=>no(x.error)})}catch{};localStorage.setItem('p','1');sessionStorage.setItem('p','1');return {local:localStorage.getItem('p')==='1',session:sessionStorage.getItem('p')==='1',indexedDB:db}}""")
  assert all(r["storage"].values()),r["storage"]; r["checks"].append("native-origin storage APIs: PASS")
  layout=await page.evaluate("""()=>{let q=s=>document.querySelector(s),box=e=>{let r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,display:getComputedStyle(e).display}};return {landing:box(q('.amqHomeLandingV851')),stage:box(q('#amqHomeStage')),logo:box(q('#amqMainIcon')),overlay:box(q('#amqHomeOverlay')),actions:[...q('#amqHomePrimaryNav').querySelectorAll('[data-home-action]')].map(e=>e.dataset.homeAction)}}""")
  r["layout"]=layout; assert layout["landing"]["display"]=="none" and layout["stage"]["display"]=="flex" and layout["overlay"]["display"]=="block",layout
  assert layout["logo"]["w"]>=240 and layout["logo"]["x"]<layout["overlay"]["x"],layout
  expected=["quiz","catalog","practiceExplore","practiceWeak","watchlist","learningPlan","dashboard"]; assert layout["actions"]==expected,layout["actions"]
  r["checks"].append("osu-inspired split layout and seven primary actions: PASS"); await page.screenshot(path="proto20-desktop.png",full_page=True)
  for action in expected:
   await page.locator('#amqHomePrimaryNav [data-home-action="'+action+'"]').click(timeout=8000); await page.wait_for_timeout(300)
   view=await page.evaluate("window.__aniGetActiveViewV82?.()||null"); assert view,{"action":action,"view":view}
   r["checks"].append(f"action {action}: route {view} PASS")
   back=page.locator("#uiBackHome")
   if await back.count() and await back.first.is_visible(): await back.first.click(timeout=5000); await page.wait_for_timeout(200)
  await page.evaluate("localStorage.setItem('amq20reload','yes')"); await page.reload(wait_until="domcontentloaded",timeout=45000); await page.wait_for_function("document.readyState==='complete'",timeout=45000)
  assert await page.evaluate("localStorage.getItem('amq20reload')")=="yes"
  await page.set_viewport_size({"width":390,"height":844}); await page.wait_for_timeout(400)
  mobile=await page.evaluate("({width:innerWidth,scroll:document.documentElement.scrollWidth,logo:document.querySelector('#amqMainIcon').getBoundingClientRect().width,actions:[...document.querySelectorAll('#amqHomePrimaryNav [data-home-action]')].filter(e=>e.getClientRects().length).length})")
  r["mobile"]=mobile; assert mobile["scroll"]<=mobile["width"] and mobile["logo"]>=160 and mobile["actions"]==7,mobile
  r["checks"].append("mobile layout: PASS"); await page.screenshot(path="proto20-mobile.png",full_page=True); r["elapsed_seconds"]=round(time.time()-started,2); await b.close()
 assert not r["errors"],r["errors"]; assert not r["console_errors"],r["console_errors"]
 Path("acceptance-report.json").write_text(json.dumps(r,ensure_ascii=False,indent=2),encoding="utf-8"); print(json.dumps(r,ensure_ascii=False,indent=2))
asyncio.run(main())
