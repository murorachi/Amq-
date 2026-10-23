#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json
SRC=Path("/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_140_remove_empty_frame.html")
raw=SRC.read_text(encoding="utf-8")
shim='''<script>(()=>{const mk=()=>{const m=new Map();return{getItem:k=>m.get(String(k))??null,setItem:(k,v)=>m.set(String(k),String(v)),removeItem:k=>m.delete(String(k)),clear:()=>m.clear(),key:i=>[...m.keys()][i]??null,get length(){return m.size}}};Object.defineProperty(window,"localStorage",{configurable:true,value:mk()});Object.defineProperty(window,"sessionStorage",{configurable:true,value:mk()})})();</script>'''
raw=raw.replace("<head>","<head>"+shim,1)
out={"candidate":SRC.name,"bytes":SRC.stat().st_size,"sha256":hashlib.sha256(SRC.read_bytes()).hexdigest(),"tests":[],"limits":["file:// and localhost blocked","durable persistence not run"]}
def check(n,ok,d):out["tests"].append({"name":n,"status":"PASS" if ok else "FAIL","detail":d})
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path="/usr/bin/chromium",args=["--no-sandbox","--disable-web-security"])
 for w,h in [(1648,928),(1440,900),(1280,720)]:
  pg=b.new_page(viewport={"width":w,"height":h},device_scale_factor=1);errs=[];pg.on("pageerror",lambda e:errs.append(str(e)));pg.set_content(raw,wait_until="domcontentloaded",timeout=30000);pg.wait_for_timeout(800);pg.locator('[data-home-action="catalog"]').first.evaluate("(e)=>e.click()");pg.wait_for_function("document.querySelector('#amqSongSelectTracklist')&&!document.querySelector('#amqSongSelectTracklist').classList.contains('hidden')")
  v=pg.evaluate("""()=>{const l=document.querySelector('#amqSongSelectTracklist'),rs=[...l.querySelectorAll('.songrow')],i=rs.findIndex(r=>r.classList.contains('proto26-song-selected')),r=rs[0];return{selectedIndex:i,rowHeight:r.getBoundingClientRect().height,visibleRows:l.clientHeight/r.getBoundingClientRect().height,doc:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],viewport:[innerWidth,innerHeight]}}""")
  check(f"{w}x{h} selected row index 3",v["selectedIndex"]==3,v);check(f"{w}x{h} 7.5 rows/no overflow",abs(v["visibleRows"]-7.5)<.03 and v["doc"]==[w,h],v);check(f"{w}x{h} no page errors",not errs,errs)
  if w==1648:
   pg.screenshot(path="/mnt/data/amq_songselect_work/candidate140_delivery/candidate140_1648x928.png")
   fr=pg.locator("#amqSongSelectRankingPlaceholder").evaluate("e=>({border:getComputedStyle(e).borderTopWidth,bg:getComputedStyle(e).backgroundColor})");check("empty frame transparent",fr["border"]=="0px" and fr["bg"]=="rgba(0, 0, 0, 0)",fr)
   pg.locator("#amqWorkspaceDock [data-ws]").first.evaluate("(e)=>e.click()");pg.wait_for_timeout(350);panel=pg.locator("#amqWorkspaceSidebar").evaluate("e=>({display:getComputedStyle(e).display,visibility:getComputedStyle(e).visibility,pointer:getComputedStyle(e).pointerEvents,width:e.getBoundingClientRect().width})");check("workspace sidebar remains usable",panel["display"]=="block" and panel["visibility"]=="visible" and panel["pointer"]=="auto" and panel["width"]>100,panel);pg.locator("#amqWorkspacePanelClose").evaluate("(e)=>e.click()");pg.wait_for_timeout(100)
   before=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");pg.keyboard.press("ArrowDown");pg.wait_for_timeout(80);after=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");check("ArrowDown selection",before!=after,{"before":before,"after":after});pg.keyboard.press("ArrowUp");pg.wait_for_timeout(80);back=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");check("ArrowUp selection",back==before,{"expected":before,"actual":back})
   row=pg.locator("#amqSongSelectTracklist .songrow").first;row.hover(force=True);pg.wait_for_timeout(80);tr=row.evaluate("e=>getComputedStyle(e).transform");check("hover shift -3px",tr=="matrix(1, 0, 0, 1, -3, 0)",{"transform":tr})
   pg.locator("#amqSongSelectStage #search").fill("Usagi");pg.wait_for_timeout(300);n=pg.locator("#amqSongSelectTracklist .songrow").count();sel=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected");title=sel.locator(".songname").first.inner_text() if sel.count() else "";check("search fallback",0<n<180 and sel.count()==1 and "Usagi" in title,{"rows":n,"title":title})
   pg.locator("#amqSongSelectStage #search").fill("");pg.wait_for_timeout(250);pg.locator("#proto26SongModes [data-p26-mode='emq']").evaluate("(e)=>e.click()");pg.wait_for_timeout(350);sources=pg.locator("#amqSongSelectTracklist .songrow").evaluate_all("(rs)=>[...new Set(rs.map(r=>r.dataset.source))]");check("EMQ filtering",sources==["emq"],{"sources":sources})
  pg.close()
 b.close()
out["pass"]=sum(t["status"]=="PASS" for t in out["tests"]);out["fail"]=sum(t["status"]=="FAIL" for t in out["tests"]);print(json.dumps(out,ensure_ascii=False,indent=2))
