import asyncio, json, time
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
 report={"checks":[],"errors":[],"console_errors":[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch()
  page=await browser.new_page(viewport={"width":1440,"height":900},device_scale_factor=1)
  page.on("pageerror",lambda e:report["errors"].append(str(e)))
  page.on("console",lambda m:report["console_errors"].append(m.text) if m.type=="error" else None)
  response=await page.goto("http://127.0.0.1:8765/candidate.html",wait_until="domcontentloaded",timeout=60000)
  report["http_status"]=response.status if response else None
  await page.wait_for_function("document.readyState==='complete'",timeout=60000)
  await page.wait_for_timeout(2500)
  report["origin"]=await page.evaluate("location.origin")
  report["storage_apis"]=await page.evaluate("""async()=>{let db=false;try{await new Promise((ok,no)=>{let q=indexedDB.open('proto21probe',1);q.onsuccess=()=>{db=true;q.result.close();indexedDB.deleteDatabase('proto21probe');ok()};q.onerror=()=>no(q.error)})}catch{}localStorage.setItem('proto21','ok');sessionStorage.setItem('proto21','ok');return {localStorage:localStorage.getItem('proto21')==='ok',sessionStorage:sessionStorage.getItem('proto21')==='ok',indexedDB:db}}""")
  assert all(report["storage_apis"].values()),report["storage_apis"]
  report["checks"].append("normal-origin native localStorage/sessionStorage/IndexedDB: PASS")
  await page.wait_for_selector('[data-home-action="multiplayer"]',timeout=30000)
  actions=await page.locator('#homeMenu [data-home-action]').evaluate_all("els=>[...new Set(els.map(e=>e.dataset.homeAction))]")
  assert "multiplayer" in actions,actions
  report["checks"].append("main landing contains first-class Multiplayer entry: PASS")
  await page.screenshot(path="proto21-home-desktop.png",full_page=True)
  await page.locator("#uiHomeSettings").click(timeout=8000)
  await page.wait_for_selector("#amqSettingsLayerV21:not([hidden])",timeout=8000)
  groups=await page.locator(".amqSettingsGroupV21 h3").all_text_contents()
  assert groups==["介面與外觀","猜歌與練習","多人模式","資料與備份"],groups
  report["checks"].append("settings layer opens with four functional groups: PASS")
  await page.screenshot(path="proto21-settings.png",full_page=True)
  await page.locator('[data-settings-close]').first.click()
  await page.wait_for_selector("#amqSettingsLayerV21[hidden]")
  report["checks"].append("settings layer closes via explicit close control: PASS")
  await page.locator('#homeMenu [data-home-action="multiplayer"]').click(timeout=8000)
  await page.wait_for_timeout(250)
  active=await page.evaluate("window.__aniGetActiveViewV82?.()")
  assert active=="multiplayer",active
  assert await page.locator("#multiplayerView").is_visible()
  report["checks"].append("Multiplayer entry opens existing multiplayer view: PASS")
  await page.evaluate("window.__aniNavigateApp('home')")
  await page.wait_for_timeout(150)
  expected={"quiz":"quiz","practiceExplore":"practice","practiceWeak":"practice","catalog":"catalog","watchlist":"watchlist","learningPlan":"learningPlan","dashboard":"dashboard"}
  for action,view in expected.items():
   await page.locator('#homeMenu [data-home-action="'+action+'"]').first.click(timeout=8000)
   await page.wait_for_timeout(120)
   actual=await page.evaluate("window.__aniGetActiveViewV82?.()")
   assert actual==view,(action,actual,view)
   report["checks"].append("homepage route "+action+": PASS")
   await page.evaluate("window.__aniNavigateApp('home')")
   await page.wait_for_timeout(80)
  await page.evaluate("localStorage.setItem('proto21-reload','persisted')")
  await page.reload(wait_until="domcontentloaded",timeout=60000)
  await page.wait_for_function("document.readyState==='complete'",timeout=60000)
  assert await page.evaluate("localStorage.getItem('proto21-reload')")=="persisted"
  report["checks"].append("native localStorage survives reload: PASS")
  await page.set_viewport_size({"width":390,"height":844})
  await page.wait_for_timeout(300)
  widths=await page.evaluate("({viewport:innerWidth,document:document.documentElement.scrollWidth})")
  report["mobile_widths"]=widths
  assert widths["document"]<=widths["viewport"],widths
  await page.screenshot(path="proto21-home-mobile.png",full_page=True)
  report["checks"].append("mobile layout has no horizontal overflow: PASS")
  report["errors"]=report["errors"][:30]
  report["console_errors"]=report["console_errors"][:30]
  await browser.close()
 assert not report["errors"],report["errors"]
 Path("acceptance-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding="utf-8")
 print(json.dumps(report,ensure_ascii=False,indent=2))
asyncio.run(main())
