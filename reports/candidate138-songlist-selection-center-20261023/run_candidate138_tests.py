#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json
SRC=Path("/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_138_songlist_selection_center.html")
raw=SRC.read_text(encoding="utf-8")
shim='''<script>(()=>{const mk=()=>{const m=new Map();return{getItem:k=>m.has(String(k))?m.get(String(k)):null,setItem:(k,v)=>m.set(String(k),String(v)),removeItem:k=>m.delete(String(k)),clear:()=>m.clear(),key:i=>Array.from(m.keys())[i]??null,get length(){return m.size}}};Object.defineProperty(window,"localStorage",{configurable:true,value:mk()});Object.defineProperty(window,"sessionStorage",{configurable:true,value:mk()})})();</script>'''
raw=raw.replace("<head>","<head>"+shim,1)
out={"candidate":SRC.name,"bytes":SRC.stat().st_size,"sha256":hashlib.sha256(SRC.read_bytes()).hexdigest(),"pass":0,"fail":0,"tests":[],"limits":["file:// and localhost navigation BLOCKED_BY_ADMINISTRATOR","durable storage NOT RUN"]}
def check(name,ok,detail):
 out["tests"].append({"name":name,"status":"PASS" if ok else "FAIL","detail":detail})
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path="/usr/bin/chromium",args=["--no-sandbox","--disable-web-security"])
 for w,h in [(1648,928),(1440,900),(1280,720)]:
  page=b.new_page(viewport={"width":w,"height":h},device_scale_factor=1);errs=[];page.on("pageerror",lambda e:errs.append(str(e)))
  page.set_content(raw,wait_until="domcontentloaded",timeout=30000);page.wait_for_timeout(900);page.locator('[data-home-action="catalog"]').first.evaluate("(e)=>e.click()");page.wait_for_function("document.querySelector('#amqSongSelectTracklist')&&!document.querySelector('#amqSongSelectTracklist').classList.contains('hidden')",timeout=20000)
  v=page.evaluate("""()=>{const l=document.querySelector('#amqSongSelectTracklist'),rs=[...l.querySelectorAll('.songrow')],i=rs.findIndex(r=>r.classList.contains('proto26-song-selected')),r=rs[0];return{selectedIndex:i,rows:rs.length,rowHeight:r.getBoundingClientRect().height,visibleRows:l.clientHeight/r.getBoundingClientRect().height,doc:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],viewport:[innerWidth,innerHeight]}}""")
  check(f"{w}x{h} selected row index 3",v["selectedIndex"]==3,v)
  check(f"{w}x{h} 7.5 rows and no overflow",abs(v["visibleRows"]-7.5)<.03 and v["doc"]==[w,h],v)
  check(f"{w}x{h} no page errors",not errs,errs)
  if w==1648:
   before=page.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");page.keyboard.press("ArrowDown");page.wait_for_timeout(80);after=page.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");check("ArrowDown changes selection",before!=after,{"before":before,"after":after})
   page.keyboard.press("ArrowUp");page.wait_for_timeout(80);back=page.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");check("ArrowUp restores selection",back==before,{"expected":before,"actual":back})
   row=page.locator("#amqSongSelectTracklist .songrow").first;row.hover(force=True);page.wait_for_timeout(80);tr=row.evaluate("e=>getComputedStyle(e).transform");check("hover shift -3px",tr=="matrix(1, 0, 0, 1, -3, 0)",{"transform":tr})
   page.locator("#amqSongSelectStage #search").fill("Usagi");page.wait_for_timeout(300);n=page.locator("#amqSongSelectTracklist .songrow").count();sel=page.locator("#amqSongSelectTracklist .songrow.proto26-song-selected");title=sel.locator(".songname").first.inner_text() if sel.count() else "";check("search keeps valid selected result",0<n<180 and sel.count()==1 and "Usagi" in title,{"rows":n,"title":title})
   page.locator("#amqSongSelectStage #search").fill("");page.wait_for_timeout(250);page.locator("#proto26SongModes [data-p26-mode='emq']").evaluate("(e)=>e.click()");page.wait_for_timeout(350);sources=page.locator("#amqSongSelectTracklist .songrow").evaluate_all("(rs)=>[...new Set(rs.map(r=>r.dataset.source))]");check("EMQ source filtering",sources==["emq"],{"sources":sources})
  page.close()
 b.close()
out["pass"]=sum(t["status"]=="PASS" for t in out["tests"]);out["fail"]=sum(t["status"]=="FAIL" for t in out["tests"]);print(json.dumps(out,ensure_ascii=False,indent=2))
