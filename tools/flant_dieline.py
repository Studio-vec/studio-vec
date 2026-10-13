"""Draw the FLANT nutrient box dieline (reverse tuck-end carton) → assets/img/projects/p04-flant/dieline.png

    python tools/flant_dieline.py

Panels follow the boxes in img-25.png: a gradient from the SKU colour to white, a stepped window
on the front that shows the adapter, product name, logo at the foot, information and barcode on the back.
Solid line = cut, dashed = fold.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / 'assets/img/projects/p04-flant/dieline.png'
S = 11                                   # px per mm
W, D, H, G, TK = 55, 55, 130, 12, 14     # front width, depth, height, glue flap, tuck
PAD = 26                                 # mm around the drawing
TOP = (204, 233, 140)                    # SKU colour (leaf green) → white
INK, CUT, FOLD = (24, 30, 22), (24, 30, 22), (120, 128, 118)
FONT = 'C:/Windows/Fonts/malgun.ttf'; FONTB = 'C:/Windows/Fonts/malgunbd.ttf'
f = lambda pt, b=False: ImageFont.truetype(FONTB if b else FONT, int(pt * S / 3))

cols = [('glue', G), ('side', D), ('front', W), ('side', D), ('back', W)]
x0 = PAD; xs = []
for name, w in cols: xs.append((name, x0, w)); x0 += w
y_body = PAD + D + TK                    # body panels start under the top lid
CW, CH = (x0 + PAD) * S, (y_body + H + D + TK + PAD) * S
im = Image.new('RGB', (CW, CH), (247, 246, 241)); dr = ImageDraw.Draw(im)
P = lambda *v: [round(a * S) for a in v]

def gradient(box):
    x, y, w, h = P(*box)
    t = np.linspace(0, 1, h)[:, None] ** 1.3
    col = (np.array(TOP)[None, :] * (1 - t) + 255 * t).astype(np.uint8)
    im.paste(Image.fromarray(np.repeat(col[:, None, :], w, axis=1)), (x, y))

def dashed(a, b, step=2.2):
    (xa, ya), (xb, yb) = a, b
    n = max(1, int(((xb - xa) ** 2 + (yb - ya) ** 2) ** .5 / step))
    for i in range(0, n, 2):
        p, q = i / n, min(1, (i + 1) / n)
        dr.line(P(xa + (xb - xa) * p, ya + (yb - ya) * p, xa + (xb - xa) * q, ya + (yb - ya) * q), fill=FOLD, width=2)

# body panels
for name, x, w in xs:
    if name != 'glue': gradient((x, y_body, w, H))
# glue flap (tapered)
gx = xs[0][1]
dr.polygon(P(gx + G, y_body, gx, y_body + 6, gx, y_body + H - 6, gx + G, y_body + H), fill=(232, 231, 224))

# front : label, stepped window, name, logo
fx = xs[2][1]
dr.text(P(fx + W / 2, y_body + 9), '고농축 식물 영양제', font=f(7), fill=INK, anchor='mm')
steps = [(16, 22), (12, 30), (8, 40), (4, 50), (0, 62)]          # (inset from each side, y) — the ziggurat window
win = []
for inset, yy in steps: win += [(fx + 10 + inset, y_body + yy - 8), (fx + 10 + inset, y_body + yy)]
win = [(fx + 10 + 16, y_body + 14)] + win[1:] + [(fx + W - 10, y_body + 62)]
right = [(2 * fx + W - x, y) for x, y in reversed(win)]
poly = win + right
dr.polygon([tuple(P(*p)) for p in poly], fill=(247, 246, 241))
dr.line([tuple(P(*p)) for p in poly + [poly[0]]], fill=CUT, width=3)
dr.text(P(fx + W / 2, y_body + 72), 'WINDOW', font=f(5), fill=FOLD, anchor='mm')
for i, t in enumerate(['Plant', 'Nutritional', 'Supplements']):
    dr.text(P(fx + W / 2, y_body + 84 + i * 6.4), t, font=f(10, True), fill=INK, anchor='mm')
dr.text(P(fx + W / 2, y_body + H - 9), 'FLANT', font=f(11, True), fill=INK, anchor='mm')

# sides : information
for k, (name, x, w) in enumerate(xs):
    if name != 'side': continue
    rows = ['원료 성분', '사용 방법', '주의 사항', '보관 방법'] if k == 1 else ['어댑터 결합', '1회 사용량', '교체 주기', '제조원']
    for i, t in enumerate(rows):
        yy = y_body + 16 + i * 24
        dr.text(P(x + 7, yy), t, font=f(6.5, True), fill=INK)
        for j in range(3): dr.line(P(x + 7, yy + 8 + j * 3.4, x + w - 7 - (j == 2) * 14, yy + 8 + j * 3.4), fill=(150, 160, 145), width=3)

# back : copy, barcode
bx = xs[4][1]
dr.text(P(bx + 7, y_body + 12), '식물별 맞춤 영양 4종', font=f(7, True), fill=INK)
for j in range(9): dr.line(P(bx + 7, y_body + 22 + j * 4, bx + W - 7 - (j % 3 == 2) * 16, y_body + 22 + j * 4), fill=(150, 160, 145), width=3)
rng = np.random.default_rng(7); x = bx + 7
while x < bx + 31:
    w_ = rng.choice([.35, .6, .9]); dr.rectangle(P(x, y_body + H - 26, x + w_, y_body + H - 12), fill=INK); x += w_ + rng.choice([.35, .6])
dr.text(P(bx + W - 7, y_body + H - 12), '200ml', font=f(6), fill=INK, anchor='rs')

# lids : top on the back panel, bottom on the front ; dust flaps on the sides
def lid(x, w, y, up):
    s = -1 if up else 1
    body = [(x, y), (x, y + s * D), (x + w, y + s * D), (x + w, y)]
    tuck = [(x + 2, y + s * D), (x + 6, y + s * (D + TK)), (x + w - 6, y + s * (D + TK)), (x + w - 2, y + s * D)]
    dr.polygon([tuple(P(*p)) for p in body], fill=(238, 242, 226))
    dr.polygon([tuple(P(*p)) for p in tuck], fill=(238, 242, 226))
    dr.line([tuple(P(*p)) for p in [(x, y), (x, y + s * D), (x + 2, y + s * D), (x + 6, y + s * (D + TK)),
             (x + w - 6, y + s * (D + TK)), (x + w - 2, y + s * D), (x + w, y + s * D), (x + w, y)]], fill=CUT, width=3)
    dashed((x, y + s * D), (x + w, y + s * D))

def dust(x, w, y, up):
    s = -1 if up else 1; d = D * .42
    pts = [(x, y), (x + 3, y + s * d), (x + w - 9, y + s * d), (x + w, y + s * 4), (x + w, y)]
    dr.polygon([tuple(P(*p)) for p in pts], fill=(238, 242, 226))
    dr.line([tuple(P(*p)) for p in pts[:-1]], fill=CUT, width=3)

lid(bx, W, y_body, True); lid(fx, W, y_body + H, False)
for name, x, w in xs:
    if name == 'side': dust(x, w, y_body, True); dust(x, w, y_body + H, False)

# outline of the body and folds between panels
xl, xr = xs[1][1], x0
dr.line(P(gx + G, y_body, gx, y_body + 6, gx, y_body + H - 6, gx + G, y_body + H), fill=CUT, width=3)
for name, x, w in xs:
    if name in ('glue',): continue
    if name not in ('back', 'front'):
        pass
dr.line(P(xr, y_body, xr, y_body + H), fill=CUT, width=3)
for name, x, w in xs[1:]:
    dashed((x, y_body), (x, y_body + H))
    if name in ('side',): dashed((x, y_body), (x + w, y_body)); dashed((x, y_body + H), (x + w, y_body + H))
dashed((bx, y_body), (bx + W, y_body)); dashed((fx, y_body + H), (fx + W, y_body + H))
# top edge of the front panel and bottom edge of the back panel are cuts
dr.line(P(fx, y_body, fx + W, y_body), fill=CUT, width=3); dr.line(P(bx, y_body + H, bx + W, y_body + H), fill=CUT, width=3)

# dimensions
def dim(a, b, label, off, vertical=False):
    if vertical:
        x = a[0] + off; dr.line(P(x, a[1], x, b[1]), fill=FOLD, width=2)
        for y in (a[1], b[1]): dr.line(P(x - 1.5, y, x + 1.5, y), fill=FOLD, width=2)
        dr.text(P(x - 2, (a[1] + b[1]) / 2), label, font=f(6), fill=FOLD, anchor='rm')
    else:
        y = a[1] + off; dr.line(P(a[0], y, b[0], y), fill=FOLD, width=2)
        for x in (a[0], b[0]): dr.line(P(x, y - 1.5, x, y + 1.5), fill=FOLD, width=2)
        dr.text(P((a[0] + b[0]) / 2, y + 2), label, font=f(6), fill=FOLD, anchor='ma')
yb = y_body + H + D * .42
dim((xs[1][1], yb), (xs[1][1] + D, yb), f'{D} mm', 6)
dim((fx, y_body + H + D + TK), (fx + W, y_body + H + D + TK), f'{W} mm', 3)
dim((gx, y_body), (gx, y_body + H), f'{H} mm', -3, vertical=True)

# legend
lx, ly = PAD, CH / S - PAD + 8
dr.line(P(lx, ly, lx + 10, ly), fill=CUT, width=3); dr.text(P(lx + 13, ly), 'CUT', font=f(6), fill=INK, anchor='lm')
dashed((lx + 30, ly), (lx + 40, ly)); dr.text(P(lx + 43, ly), 'FOLD', font=f(6), fill=INK, anchor='lm')
dr.text(P(CW / S - PAD, ly), f'FLANT Nutrient Box — {W} × {D} × {H} mm · Reverse tuck end', font=f(6), fill=INK, anchor='rm')
im.save(OUT, optimize=True)
print(OUT, im.size)
