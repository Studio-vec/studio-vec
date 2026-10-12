"""Copy the shared header/footer from partials/ into every page.

Edit partials/header.html or partials/footer.html, then run:

    python tools/sync_partials.py          # update all pages
    python tools/sync_partials.py --check  # exit 1 if any page is out of sync

Each page marks where a partial goes:

    <!-- partial:header -->...<!-- /partial:header -->

Pages without markers (404.html, covers/) are left alone. The first run on a
page that has no markers yet wraps its existing <header class="site-header">
and <footer class="site-footer"> in markers.

It also rewrites each project page's prev/next links (<section
class="project-footer-nav">) from the works grid on the home page, so reorder
the cards in index.html and run this. Each card carries its link title in
data-title; "soon" cards name their page in data-page. A "soon" neighbour shows
as 준비중입니다, and the first card's prev wraps to the last live project.
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
# name -> (marked pattern, legacy pattern)
PATTERNS = {
    name: (re.compile(r'<!-- partial:%s -->.*?<!-- /partial:%s -->' % (name, name), re.S),
           re.compile(legacy, re.S))
    for name, legacy in PARTIALS.items()
}
# Redirect stubs have no header/footer.
SKIP = {os.path.join('p06-shit-chat', 'index.html')}

CARD = re.compile(r'<(?:a|div) class="work-card[^"]*"([^>]*)>')
PROJECT_NAV = re.compile(r'<section class="project-footer-nav">.*?</section>', re.S)
NAV_SIDES = (('prev', '이전 프로젝트'), ('next', '다음 프로젝트'))


def load_works():
    """Works grid on the home page, in order: [(page dir, title or None if soon)]."""
    with open(os.path.join(ROOT, 'index.html'), encoding='utf-8') as fh:
        src = fh.read()
    works = []
    for attrs in CARD.findall(src):
        attr = dict(re.findall(r'([\w-]+)="([^"]*)"', attrs))
        if 'href' in attr:
            works.append((attr['href'].strip('/'), attr['data-title']))
        else:
            works.append((attr['data-page'].strip('/'), None))
    return works


def project_nav(works, page_dir):
    i = [d for d, _ in works].index(page_dir)
    live = [w for w in works if w[1]]
    prev = works[i - 1] if i > 0 else live[-1]
    nxt = works[i + 1] if i + 1 < len(works) else (None, None)
    links = []
    for (side, label), (target, title) in zip(NAV_SIDES, (prev, nxt)):
        if title:
            links.append(
                '        <a class="project-nav-link %s" href="/%s/">\n'
                '          <span class="project-nav-label">%s</span>\n'
                '          <span class="project-nav-title">%s</span>\n'
                '        </a>' % (side, target, label, title))
        else:
            links.append(
                '        <span class="project-nav-link %s is-soon" aria-disabled="true">\n'
                '          <span class="project-nav-label">%s</span>\n'
                '          <span class="project-nav-title">준비중입니다</span>\n'
                '        </span>' % (side, label))
    return ('<section class="project-footer-nav">\n'
            '    <div class="container">\n'
            '      <div class="project-nav-row">\n'
            '%s\n'
            '      </div>\n'
            '    </div>\n'
            '  </section>' % '\n'.join(links))


def load_partials():
    # utf-8-sig drops a BOM an editor may add.
    bodies = {}
    for name in PARTIALS:
        with open(os.path.join(ROOT, 'partials', name + '.html'), encoding='utf-8-sig') as fh:
            bodies[name] = fh.read().strip()
    return bodies


def render(page, partials, works):
    with open(os.path.join(ROOT, page), encoding='utf-8', newline='') as fh:
        src = fh.read()
    # Pages are LF (.gitattributes); reading raw lets --check flag a stray CRLF.
    out = src.replace('\r\n', '\n')
    if page != 'index.html':
        if not PROJECT_NAV.search(out):
            raise SystemExit('%s: no project-footer-nav found' % page)
        nav = project_nav(works, os.path.dirname(page))
        out = PROJECT_NAV.sub(lambda m: nav, out, count=1)
    for name, (marked, legacy) in PATTERNS.items():
        body = partials[name]
        if page == 'index.html':
            # Same-page anchors on home, so a URL with ?query doesn't reload.
            body = body.replace('href="/#', 'href="#')
        block = '<!-- partial:%s -->\n%s\n<!-- /partial:%s -->' % (name, body, name)
        if marked.search(out):
            out = marked.sub(lambda m: block, out, count=1)
        elif legacy.search(out):
            out = legacy.sub(lambda m: block, out, count=1)
        else:
            raise SystemExit('%s: no %s found' % (page, name))
    return src, out


def main():
    check = '--check' in sys.argv
    partials = load_partials()
    works = load_works()
    pages = [p for p in PAGES if p not in SKIP]
    stale = []
    for page in pages:
        src, out = render(page, partials, works)
        if src != out:
            stale.append(page)
            if not check:
                with open(os.path.join(ROOT, page), 'w', encoding='utf-8', newline='\n') as fh:
                    fh.write(out)
    if check:
        if stale:
            print('Out of sync (run python tools/sync_partials.py):')
            print('\n'.join('  ' + p for p in stale))
            sys.exit(1)
        print('All %d pages in sync.' % len(pages))
    else:
        print('Updated %d page(s).' % len(stale) if stale else 'Nothing to update.')


if __name__ == '__main__':
    main()
