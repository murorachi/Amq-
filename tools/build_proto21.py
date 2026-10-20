from pathlib import Path
import hashlib
p=Path("amq_learning_tool_v82_85_30_workspace_proto17.html")
s=p.read_text(encoding="utf-8")
css=Path("engineering/proto20-full-ui-rebuild/workspace-shell.css").read_text(encoding="utf-8")
style='<style id="amq-proto20-ui-rebuild-style">\\n'+css+'\\n</style>\\n'
assert s.count("</head>")==1
s=s.replace("</head>",style+"</head>",1)
needle='''    <button class="amqHomeLandingAction" type="button" data-menu-number="03" data-home-action="practiceWeak">
      <span class="amqHomeLandingActionTag">03 / REVIEW</span><strong>弱點補強</strong><small>針對不熟悉的歌曲練習</small><span class="amqHomeLandingArrow" aria-hidden="true">↗</span>
    </button>'''
addition=needle+'''\\n    <button class="amqHomeLandingAction amqHomeLandingActionMulti" type="button" data-menu-number="04" data-home-action="multiplayer"><span class="amqHomeLandingActionTag">04 / MULTIPLAYER</span><strong>多人模式</strong><small>建立房間、輸入代碼加入好友對局</small><span class="amqHomeLandingArrow" aria-hidden="true">↗</span></button>'''
if s.count(needle)!=1: raise SystemExit(f"landing insertion count={s.count(needle)}")
s=s.replace(needle,addition,1)
s += "\\n"+Path("engineering/proto21-settings-multiplayer/settings-layer.html").read_text(encoding="utf-8")
Path("candidate.html").write_text(s,encoding="utf-8")
Path("candidate.sha256").write_text(hashlib.sha256(s.encode()).hexdigest()+"  candidate.html\\n",encoding="utf-8")
print("Proto21 candidate reconstructed; bytes=",len(s),"sha256=",hashlib.sha256(s.encode()).hexdigest())
