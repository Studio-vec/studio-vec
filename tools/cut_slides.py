"""Cut the photographs out of a padded web slide, so an A4 sheet can show each one large.

    python tools/cut_slides.py <project dir> <file> [<file> …]          # list the pieces found
    python tools/cut_slides.py <project dir> <file> … --save            # write <dir>/cut/<stem>-<n>.jpg

Many web slides are one or two photos on a flat grey/black field. The sheets trim uniform padding
(tools/sheet_images.py) but cannot pull two photos apart; this does. Pieces are numbered left → right,
top → bottom. The originals are left untouched.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent / 'assets' / 'img' / 'projects'
TOL = 14          # a pixel this far from the field colour belongs to a picture
MIN = .015        # pieces smaller than this share of the slide are noise (logos, captions)


def pieces(path):
    im = Image.open(path); im.seek(0)
    if im.mode in ('P', 'RGBA', 'LA'):                # transparent PNG : flatten onto white
        im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, 'white'); bg.alpha_composite(im); im = bg
    im = im.convert('RGB')
    a = np.asarray(im).astype(int)
    h, w, _ = a.shape
    ring = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    field = np.median(ring, axis=0)
    mask = (np.abs(a - field).max(axis=2) > TOL)
    mask = ndimage.binary_closing(mask, iterations=6)
    mask = ndimage.binary_fill_holes(mask)
    lab, n = ndimage.label(mask)
    boxes = []
    for sl in ndimage.find_objects(lab):
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        if (y1 - y0) * (x1 - x0) >= MIN * w * h: boxes.append([x0, y0, x1, y1])
    # merge boxes that overlap (a photo with a field-coloured patch inside it)
    merged = True
    while merged:
        merged = False
        for i in range(len(boxes)):
            for j in range(i + 1, len(boxes)):
                A, B = boxes[i], boxes[j]
                if A[0] < B[2] and B[0] < A[2] and A[1] < B[3] and B[1] < A[3]:
                    boxes[i] = [min(A[0], B[0]), min(A[1], B[1]), max(A[2], B[2]), max(A[3], B[3])]
                    boxes.pop(j); merged = True; break
            if merged: break
    boxes.sort(key=lambda b: (round(b[1] / h * 4), b[0]))
    return im, boxes


if __name__ == '__main__':
    args = [x for x in sys.argv[1:] if x != '--save']
    save = '--save' in sys.argv
    d = ROOT / args[0]
    for f in args[1:]:
        im, boxes = pieces(d / f)
        print(f, im.size, boxes)
        if save:
            (d / 'cut').mkdir(exist_ok=True)
            for k, b in enumerate(boxes, 1):
                piece = im.crop(b)
                piece.thumbnail((2000, 2000))          # web slides at 4× are far larger than a sheet needs
                piece.save(d / 'cut' / f'{Path(f).stem}-{k}.jpg', quality=90)
