import re, sys
src = open(sys.argv[1], encoding='utf-8').read()
src = re.sub(r'<\?xml[^>]*>', '', src)
src = src.replace('<tspan class="cls-30" x="34.75" y="24">t</tspan><tspan x="38.48" y="24">s</tspan>', 'ts')
inner = src[src.index('>', src.index('<svg'))+1 : src.rindex('</svg>')]
# ids must be unique per copy
def copy(tag, vb, w, h):
    s = inner
    for i in ['clippath-1','clippath','_무제_그라디언트_50']:
        s = s.replace('id="%s"'%i, 'id="%s-%s"'%(i,tag)).replace('#%s)'%i, '#%s-%s)'%(i,tag))
    # class names collide across copies but are identical, fine
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}" preserveAspectRatio="none">{s}</svg>'
k = float(sys.argv[3]) if len(sys.argv)>3 else 4
X1,X2,X3,Y0,Y1,YT = 113.54,227.06,340.6,238.88,522.7,125.35
X4,X5 = 454.1,567.63
CZ = float(sys.argv[8]) if len(sys.argv)>8 else .32
W=(X2-X1)*k; H=(Y1-Y0)*k; D=(X3-X2)*k
win = [(210.26,400.01),(130.33,400.01),(130.33,370.6),(137.98,370.6),(137.98,341.18),(145.64,341.18),(145.64,311.77),(153.29,311.77),(153.29,282.36),(187.3,282.36),(187.3,311.77),(194.96,311.77),(194.96,341.18),(202.61,341.18),(202.61,370.6),(210.26,370.6)]
pts = ','.join(f'{(x-X1)*k:.1f}px {(y-Y0)*k:.1f}px' for x,y in win)
hole = f"polygon(evenodd, 0 0, {W}px 0, {W}px {H}px, 0 {H}px, 0 0, {pts}, {(win[0][0]-X1)*k:.1f}px {(win[0][1]-Y0)*k:.1f}px, 0 0)"
m=k*6; bx0,by0,bx1,by1=(130.33-X1)*k-m,(282.36-Y0)*k-m,(210.26-X1)*k+m,(400.01-Y0)*k+m
ring = f"polygon(evenodd, {bx0}px {by0}px, {bx1}px {by0}px, {bx1}px {by1}px, {bx0}px {by1}px, {bx0}px {by0}px, {pts}, {(win[0][0]-X1)*k:.1f}px {(win[0][1]-Y0)*k:.1f}px, {bx0}px {by0}px)"
ry, rx = float(sys.argv[4]) if len(sys.argv)>4 else -34, float(sys.argv[5]) if len(sys.argv)>5 else -16
html = f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.css" rel="stylesheet">
<style>
html,body{{margin:0;background:transparent}}
body{{--c1:{sys.argv[6] if len(sys.argv)>6 else '#3f8f6c'};--c2:{sys.argv[7] if len(sys.argv)>7 else '#1d5a43'}}}
.stage{{width:3000px;height:3000px;perspective:6500px;display:flex;align-items:center;justify-content:center}}
.box{{position:relative;width:{W}px;height:{H}px;transform-style:preserve-3d;transform:rotateX({rx}deg) rotateY({ry}deg)}}
.f{{position:absolute;left:0;top:0;overflow:hidden;backface-visibility:hidden}}
.f svg{{display:block}}
.f::after{{content:'';position:absolute;inset:0;pointer-events:none}}
.front{{width:{W}px;height:{H}px;transform:translateZ({D/2}px);clip-path:{hole}}}
.front::after{{background:linear-gradient(100deg,rgba(255,255,255,.05),rgba(0,0,0,.02))}}
.side{{width:{D}px;height:{H}px;left:{(W-D)/2}px;transform:rotateY(90deg) translateZ({W/2-1.5}px)}}
.side::after{{background:linear-gradient(90deg,rgba(0,0,0,.22),rgba(0,0,0,.30))}}
.back{{width:{W}px;height:{H}px;transform:rotateY(180deg) translateZ({D/2}px);clip-path:{hole}}}
.left{{width:{D}px;height:{H}px;left:{(W-D)/2}px;transform:rotateY(-90deg) translateZ({W/2-1.5}px)}}
.left::after{{background:linear-gradient(90deg,rgba(0,0,0,.30),rgba(0,0,0,.22))}}
.eb{{transform:translateZ({-D/2+k*1.6}px)}}
.top{{width:{W}px;height:{D}px;top:{(H-D)/2}px;transform:rotateX(90deg) translateZ({H/2}px)}}
.top::after{{background:rgba(255,255,255,.10)}}
.top svg{{transform:rotate(180deg)}}
.core{{position:absolute;left:{bx0-m}px;top:{by0-m}px;width:{bx1-bx0+2*m}px;height:{by1-by0+2*m}px;transform:translateZ({D*CZ}px);background:radial-gradient(ellipse 70% 60% at 58% 50%,var(--c1),var(--c2))}}
.edge{{position:absolute;left:0;top:0;width:{W}px;height:{H}px;transform:translateZ({D/2-k*1.6}px);background:#e9e7df;clip-path:{ring}}}
.edge::after{{content:'';position:absolute;inset:0;background:rgba(0,0,0,.08)}}
.in{{background:#efede6}}
.iback{{width:{W}px;height:{H}px;transform:translateZ({-D/2}px);clip-path:{hole}}}
.iback::after{{background:linear-gradient(180deg,rgba(0,0,0,.34),rgba(0,0,0,.16))}}
.ileft{{width:{D}px;height:{H}px;left:{(W-D)/2}px;transform:rotateY(90deg) translateZ({-W/2}px)}}
.ileft::after{{background:linear-gradient(90deg,rgba(0,0,0,.40),rgba(0,0,0,.22))}}
.iright{{width:{D}px;height:{H}px;left:{(W-D)/2}px;transform:rotateY(-90deg) translateZ({-W/2}px)}}
.iright::after{{background:rgba(0,0,0,.45)}}
.ibot{{width:{W}px;height:{D}px;top:{(H-D)/2}px;transform:rotateX(90deg) translateZ({-H/2}px)}}
.ibot::after{{background:rgba(0,0,0,.30)}}
</style></head><body><div class="stage"><div class="box">
<div class="core"></div><div class="edge"></div><div class="f front">{copy('a', f'{X1} {Y0} {X2-X1} {Y1-Y0}', W, H)}</div>
<div class="f side">{copy('b', f'{X2} {Y0} {X3-X2} {Y1-Y0}', D, H)}</div>
<div class="edge eb"></div><div class="f back">{copy('d', f'{X3} {Y0} {X4-X3} {Y1-Y0}', W, H)}</div>
<div class="f left">{copy('e', f'{X4} {Y0} {X5-X4} {Y1-Y0}', D, H)}</div>
<div class="f top">{copy('c', f'{X1} {YT} {X2-X1} {Y0-YT}', W, D)}</div>
</div></div></body></html>'''
open(sys.argv[2],'w',encoding='utf-8').write(html)
