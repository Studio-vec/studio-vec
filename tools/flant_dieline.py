"""FLANT nutrient box dielines as printed board seen from above → assets/img/projects/p04-flant/dieline.png

    python tools/flant_dieline.py

Source: the four colourways in ../FLANT/4_Packages/Boxes_1–4.svg (templatemaker carton, real artwork).
Each SVG is rendered by headless Chrome, then pressed onto board in code: paper fibre, crease lines on
the folds, a thin cut edge and a soft shadow on a plain surface. Doing it in code keeps every letter and
the barcode exact (an image model would redraw them).
"""
import subprocess, tempfile
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / 'FLANT' / '4_Packages'
OUT = ROOT / 'assets/img/projects/p04-flant/dieline.png'
FONTS = ROOT.parent / 'YomYom/app/renderer/fonts'   # Pretendard, the typeface the boxes were set in
CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
VB = (637.8, 763.94)            # viewBox of every Boxes_n.svg
K = 3.2                         # px per viewBox unit
rng = np.random.default_rng(11)

# folds, in viewBox units (traced from the cut outline: glue flap · 4 panels · tuck lids)
FOLDS = [((113.54, 238.88), (113.54, 522.7)), ((227.77, 238.88), (227.77, 522.7)),
         ((339.9, 238.88), (339.9, 522.7)), ((454.8, 238.88), (454.8, 522.7)),
         ((113.54, 238.88), (567.63, 238.88)), ((113.54, 522.7), (567.63, 522.7)),
         ((114.95, 125.35), (225.63, 125.35)), ((342.0, 637.64), (452.69, 637.64))]


def render(svg):
    w, h = round(VB[0] * K), round(VB[1] * K)
    out = Path(tempfile.gettempdir()) / f'flant-{svg.stem}.png'
    html = Path(tempfile.gettempdir()) / f'flant-{svg.stem}.html'
    # inline the SVG so the page's @font-face reaches its text (an <img> SVG cannot load fonts)
    body = svg.read_text(encoding='utf-8')
    body = body[body.index('<svg'):].replace('<svg', f'<svg width="{w}" height="{h}"', 1)
    face = ''.join(f"@font-face{{font-family:Pretendard;font-weight:{wt};src:url('{(FONTS / f).as_uri()}')}}"
                   for wt, f in (('100 500', 'Pretendard-Regular.woff2'), ('600 900', 'Pretendard-Bold.woff2')))
    html.write_text(f'<html><head><style>{face}body{{margin:0;background:transparent}}svg{{display:block}}</style></head>'
                    f'<body>{body}</body></html>', encoding='utf-8')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
                    '--default-background-color=00000000', '--virtual-time-budget=3000', f'--window-size={w},{h}', f'--screenshot={out}',
                    html.as_uri()], check=True, capture_output=True)
    return Image.open(out).convert('RGBA')


def windows():
    """the die-cut windows : the inner subpaths of the cut outline (cls-17), as polygons in viewBox units"""
    import re
    svg = (SRC / 'Boxes_1.svg').read_text(encoding='utf-8')
    d = re.search(r'<path class="cls-17" d="([^"]+)"', svg).group(1)
    polys = []
    for sub in d.split('Z')[1:]:
        toks = re.findall(r'[MlhvHVL]|-?\d*\.?\d+', sub)
        if not toks: continue
        x = y = 0; cmd = None; pts = []; i = 0
        while i < len(toks):
            t = toks[i]
            if t.isalpha(): cmd = t; i += 1; continue
            if cmd in 'ML': x, y = float(toks[i]), float(toks[i + 1]); i += 2
            elif cmd == 'l': x += float(toks[i]); y += float(toks[i + 1]); i += 2
            elif cmd == 'h': x += float(t); i += 1
            elif cmd == 'H': x = float(t); i += 1
            elif cmd == 'v': y += float(t); i += 1
            elif cmd == 'V': y = float(t); i += 1
            pts.append((x, y))
        polys.append(pts)
    return polys


def noise(h, w, blur, amp):
    n = Image.fromarray((rng.random((h, w)) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur))
    a = np.asarray(n).astype(float) / 255
    return (a - a.mean()) / (a.std() + 1e-6) * amp


def board(art):
    """the flat artwork printed on uncoated board"""
    a = np.asarray(art).astype(float) / 255
    rgb, alpha = a[..., :3], a[..., 3]
    h, w = alpha.shape
    win = Image.new('L', (w, h), 0); d = ImageDraw.Draw(win)
    for poly in windows(): d.polygon([(x * K, y * K) for x, y in poly], fill=255)
    alpha = alpha * (1 - np.asarray(win).astype(float) / 255)
    paper = np.array([0.965, 0.955, 0.93])
    # fibre : fine grain + short soft streaks
    tex = 1 + noise(h, w, .6, .012) + noise(h, w, 2.5, .008)
    fib = Image.new('L', (w, h), 0); d = ImageDraw.Draw(fib)
    for _ in range(int(w * h / 1400)):
        x, y = rng.random() * w, rng.random() * h
        L, t = rng.uniform(6, 22), rng.normal(0, .5)
        d.line([(x, y), (x + L * np.cos(t), y + L * np.sin(t))], fill=int(rng.uniform(20, 60)), width=1)
    fib = np.asarray(fib.filter(ImageFilter.GaussianBlur(.7))).astype(float) / 255
    tex = tex - fib * .05
    # ink sits in the paper : white in the file becomes the board, colour multiplies with it
    printed = rgb * paper * tex[..., None]
    # creases : a dark groove with a light lip beside it
    cr = Image.new('L', (w, h), 0); d = ImageDraw.Draw(cr)
    for (x0, y0), (x1, y1) in FOLDS: d.line([(x0 * K, y0 * K), (x1 * K, y1 * K)], fill=255, width=3)
    groove = np.asarray(cr.filter(ImageFilter.GaussianBlur(1.6))).astype(float) / 255
    lip = np.roll(np.roll(groove, -2, 0), -2, 1)
    printed = printed * (1 - .16 * groove[..., None]) + .05 * np.clip(lip - groove, 0, 1)[..., None]
    # cut edge : a hair of board thickness on the lower-right of every edge
    al = Image.fromarray((alpha * 255).astype(np.uint8))
    inner = np.asarray(al.filter(ImageFilter.MinFilter(5))).astype(float) / 255
    edge = np.clip(alpha - inner, 0, 1)
    printed = printed * (1 - .10 * edge[..., None])
    return np.clip(printed, 0, 1), alpha


def main():
    sheets = [board(render(SRC / f'Boxes_{i}.svg')) for i in (1, 2, 3, 4)]
    h, w = sheets[0][1].shape
    # tight box of the outline, so the four sit close
    ys, xs = np.where(sheets[0][1] > .5); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    cw, ch = x1 - x0, y1 - y0
    gap, pad = int(cw * .10), int(cw * .16)
    W, H = pad * 2 + cw * 2 + gap, pad * 2 + ch * 2 + gap
    # surface : warm light grey, a little low-frequency unevenness, light from the upper left
    yy, xx = np.mgrid[0:H, 0:W]
    light = 1.03 - .06 * (xx / W * .6 + yy / H * .4)
    surf = np.array([0.885, 0.875, 0.855])[None, None, :] * (light + noise(H, W, 160, .004) + noise(H, W, .8, .005))[..., None]
    canvas = surf.copy()
    for k, (rgb, alpha) in enumerate(sheets):
        rgb, alpha = rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1]
        ang = rng.uniform(-1.2, 1.2)
        A = Image.fromarray((alpha * 255).astype(np.uint8)).rotate(ang, Image.BICUBIC, expand=True)
        R = Image.fromarray((rgb * 255).astype(np.uint8)).rotate(ang, Image.BICUBIC, expand=True)
        ox = pad + (k % 2) * (cw + gap) - (A.width - cw) // 2
        oy = pad + (k // 2) * (ch + gap) - (A.height - ch) // 2
        a = np.asarray(A).astype(float) / 255; r = np.asarray(R).astype(float) / 255
        # shadow : soft contact shadow plus a wider faint one
        for off, blur, op in ((6, 6, .22), (22, 38, .14)):
            s = np.asarray(A.filter(ImageFilter.GaussianBlur(blur))).astype(float) / 255
            sy, sx = oy + off, ox + int(off * .7)
            region = canvas[sy:sy + s.shape[0], sx:sx + s.shape[1]]
            region *= (1 - op * s[:region.shape[0], :region.shape[1]])[..., None]
        region = canvas[oy:oy + a.shape[0], ox:ox + a.shape[1]]
        aa = a[:region.shape[0], :region.shape[1], None]
        region[:] = region * (1 - aa) + r[:region.shape[0], :region.shape[1]] * light[oy:oy + aa.shape[0], ox:ox + aa.shape[1], None] * aa
    img = Image.fromarray((np.clip(canvas, 0, 1) * 255).astype(np.uint8))
    img.thumbnail((2600, 2600), Image.LANCZOS)
    img.save(OUT, optimize=True)
    print(OUT, img.size)


if __name__ == '__main__':
    main()
