"""Generate the site icons from one set of shapes.

    python tools/make_favicons.py

Writes:
  assets/img/favicon.svg         black mark, white in dark mode (Chrome/Firefox/Edge tabs)
  favicon.ico                    16/32/48 black mark on transparent (fallback, /favicon.ico requests)
  assets/img/apple-touch-icon.png  180x180 black mark on opaque white (iOS home screen)
"""
import os

from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIEW = 289  # artboard size the shapes are drawn in

# Selection-box mark: four hollow corner handles, four edge bars, a ring.
HANDLE = 41      # outer size of each corner handle
HANDLE_W = 10.5  # handle stroke
NEAR, FAR = 52.5, 236.5  # handle centres
BAR_W = 15
BAR_START, BAR_LEN = 77, 135
RING_R, RING_W = 65.25, 10.5
C = VIEW / 2


def handles():
    s = HANDLE - HANDLE_W
    return [(x - s / 2, y - s / 2, s) for x in (NEAR, FAR) for y in (NEAR, FAR)]


def bars():
    h = [(BAR_START, y - BAR_W / 2, BAR_LEN, BAR_W) for y in (NEAR, FAR)]
    v = [(x - BAR_W / 2, BAR_START, BAR_W, BAR_LEN) for x in (NEAR, FAR)]
    return h + v


def svg():
    parts = [f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="none" stroke="currentColor" stroke-width="{HANDLE_W}"/>'
             for x, y, s in handles()]
    parts += [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="currentColor"/>' for x, y, w, h in bars()]
    parts.append(f'<circle cx="{C}" cy="{C}" r="{RING_R}" fill="none" stroke="currentColor" stroke-width="{RING_W}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEW} {VIEW}">'
            '<style>svg{color:#000}@media (prefers-color-scheme:dark){svg{color:#fff}}</style>'
            + ''.join(parts) + '</svg>\n')


def raster(size, background=None, ss=8):
    """Draw the mark at `size` px, supersampled for clean edges."""
    n = size * ss
    k = n / VIEW
    mask = Image.new('L', (n, n), 0)
    d = ImageDraw.Draw(mask)
    for x, y, s in handles():
        o, i = (s + HANDLE_W) / 2, (s - HANDLE_W) / 2
        cx, cy = x + s / 2, y + s / 2
        d.rectangle([(cx - o) * k, (cy - o) * k, (cx + o) * k - 1, (cy + o) * k - 1], fill=255)
        d.rectangle([(cx - i) * k, (cy - i) * k, (cx + i) * k - 1, (cy + i) * k - 1], fill=0)
    for x, y, w, h in bars():
        d.rectangle([x * k, y * k, (x + w) * k - 1, (y + h) * k - 1], fill=255)
    o, i = RING_R + RING_W / 2, RING_R - RING_W / 2
    d.ellipse([(C - o) * k, (C - o) * k, (C + o) * k, (C + o) * k], fill=255)
    d.ellipse([(C - i) * k, (C - i) * k, (C + i) * k, (C + i) * k], fill=0)
    mask = mask.resize((size, size), Image.LANCZOS)

    img = Image.new('RGBA', (size, size), background or (0, 0, 0, 0))
    img.paste((0, 0, 0, 255), (0, 0), mask)
    return img


def main():
    with open(os.path.join(ROOT, 'assets', 'img', 'favicon.svg'), 'w', encoding='utf-8', newline='\n') as fh:
        fh.write(svg())
    raster(48).save(os.path.join(ROOT, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)],
                    append_images=[raster(16), raster(32)])
    raster(180, background=(255, 255, 255, 255)).convert('RGB').save(
        os.path.join(ROOT, 'assets', 'img', 'apple-touch-icon.png'), optimize=True)


if __name__ == '__main__':
    main()
