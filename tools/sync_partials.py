"""Copy the shared header/footer from partials/ into every page.

Edit partials/header.html or partials/footer.html, then run:

    python tools/sync_partials.py          # update all pages
    python tools/sync_partials.py --check  # exit 1 if any page is out of sync

Each page marks where a partial goes:

    <!-- partial:header -->...<!-- /partial:header -->

Pages without markers (404.html, covers/) are left alone. The first run on a
page that has no markers yet wraps its existing <header class="site-header">
and <footer class="site-footer"> in markers.
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ['index.html'] + sorted(glob.glob('p[0-9][0-9]-*/index.html', root_dir=ROOT))
PARTIALS = {
    'header': r'<header class="site-header".*?</header>',
    'footer': r'<footer class="site-footer".*?</footer>',
}
# Redirect stubs have no header/footer.
SKIP = {os.path.join('p06-shit-chat', 'index.html')}


def read(path):
    with open(os.path.join(ROOT, path), encoding='utf-8', newline='') as fh:
        return fh.read()


def render(page):
    src = read(page)
    out = src
    for name, legacy in PARTIALS.items():
        body = read(os.path.join('partials', name + '.html')).strip()
        if page == 'index.html':
            # Same-page anchors on home, so a URL with ?query doesn't reload.
            body = body.replace('href="/#', 'href="#')
        block = '<!-- partial:%s -->\n%s\n<!-- /partial:%s -->' % (name, body, name)
        marked = re.compile(r'<!-- partial:%s -->.*?<!-- /partial:%s -->' % (name, name), re.S)
        if marked.search(out):
            out = marked.sub(lambda m: block, out, count=1)
        elif re.search(legacy, out, re.S):
            out = re.sub(legacy, lambda m: block, out, count=1, flags=re.S)
        else:
            raise SystemExit('%s: no %s found' % (page, name))
    return src, out


def main():
    check = '--check' in sys.argv
    stale = []
    for page in PAGES:
        if page in SKIP:
            continue
        src, out = render(page)
        if src != out:
            stale.append(page)
            if not check:
                with open(os.path.join(ROOT, page), 'w', encoding='utf-8', newline='') as fh:
                    fh.write(out)
    if check:
        if stale:
            print('Out of sync (run python tools/sync_partials.py):')
            print('\n'.join('  ' + p for p in stale))
            sys.exit(1)
        print('All %d pages in sync.' % (len(PAGES) - len(SKIP & set(PAGES))))
    else:
        print('Updated %d page(s).' % len(stale) if stale else 'Nothing to update.')


if __name__ == '__main__':
    main()
