"""Print every covers sheet to assets/portfolio.pdf (the intro "다운로드" button).

    python tools/portfolio_pdf.py [http://localhost:8850]

Needs the site served locally (covers/?all renders all projects in one page),
Chrome, and PyMuPDF + Pillow. Chrome embeds the original photos, so images are
downscaled to 2000px / JPEG q78 and duplicates merged (~45MB instead of ~180MB).
Re-run after changing sheets.js, and bump the "Ver" label in covers/index.html.
"""
import io, subprocess, sys, tempfile
from pathlib import Path
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'portfolio.pdf'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
MAXPX, Q = 2000, 78


def shrink(doc):
    done = set()
    for page in doc:
        for info in page.get_images(full=True):
            xref, smask = info[0], info[1]
            if xref in done or smask:          # images with transparency stay as they are
                continue
            done.add(xref)
            try:
                pix = fitz.Pixmap(doc, xref)
            except Exception:
                continue
            if pix.n - pix.alpha >= 4:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            if pix.alpha:
                pix = fitz.Pixmap(pix, 0)
            im = Image.frombytes('RGB' if pix.n >= 3 else 'L', (pix.width, pix.height), pix.samples)
            im.thumbnail((MAXPX, MAXPX), Image.LANCZOS)
            b = io.BytesIO()
            im.save(b, 'JPEG', quality=Q, optimize=True, progressive=True)
            if b.tell() < len(doc.xref_stream_raw(xref) or b''):
                page.replace_image(xref, stream=b.getvalue())


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8850'
    with tempfile.TemporaryDirectory() as tmp:
        raw = Path(tmp) / 'raw.pdf'
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                        '--virtual-time-budget=60000', '--run-all-compositor-stages-before-draw',
                        '--window-size=1440,900', f'--user-data-dir={tmp}\\chrome',
                        f'--print-to-pdf={raw}', f'{base}/covers/?all'], check=True)
        doc = fitz.open(raw)
        shrink(doc)
        mid = Path(tmp) / 'mid.pdf'
        doc.save(mid, garbage=4, deflate=True)
        doc.close()
        doc = fitz.open(mid)                   # second pass merges the duplicate images
        doc.save(OUT, garbage=4, deflate=True, clean=True)
        print(f'{OUT}  {doc.page_count} pages  {OUT.stat().st_size / 1e6:.1f} MB')
        doc.close()


if __name__ == '__main__':
    main()
