// Builds the A4-landscape sheets for covers/index.html from the project pages.
//   node tools/build_covers.js
// Reads p01–p14 index.html (same copy & images as the site), packs them onto
// 297 × 210 mm sheets on the covers' 7-column grid, and writes the result
// between the /*SHEETS*/ … /*/SHEETS*/ markers in covers/index.html.
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

/* project id (covers) → page folder */
const PAGES = {
  kalido: 'p01-kaleido', voyeur: 'p02-voyeur', starry: 'p03-starry', flant: 'p04-flant',
  misfortune: 'p05-unfortune', yomyom: 'p06-yomyom', huihui: 'p14-huihui', circa: 'p07-circa',
  sipsi: 'p08-sipsi', puffnote: 'p09-puffnote', wkf: 'p13-wkf2026', hardcopy: 'p10-hardcopy',
  gimpick: 'p11-gimpick', seolred: 'p12-seolred'
};

/* ---------- sheet geometry (mm) — same proportions as the cover artboard ---------- */
const SW = 297, SH = 210;
const ML = 9.2, MT = 8.6, GUT = 5;                 // 3.1% / 4.1% / 1.67%
const COL = (SW - ML * 2 - GUT * 6) / 7;
const colX = c => ML + (c - 1) * (COL + GUT);      // left edge of column c (1-based)
const colR = c => colX(c) + COL;                   // right edge
const TOP = 19, BOT = SH - MT;                     // content band below the running header
const GAP = 3;                                     // gap between images
const BOX_FULL = { x: colX(1), y: TOP, w: colR(7) - colX(1), h: BOT - TOP };
const BOX_TEXT = { x: colX(3), y: TOP, w: colR(7) - colX(3), h: BOT - TOP };
const BOX_OPEN = { x: colX(4), y: TOP, w: colR(7) - colX(4), h: BOT - TOP };

/* ---------- html helpers ---------- */
const attr = (t, k) => (t.match(new RegExp('\\s' + k + '="([^"]*)"')) || [])[1];
const clean = s => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').replace(/[ \t\r]+/g, ' ')
  .replace(/ *\n */g, '\n').trim();
const inline = s => s.replace(/<br\s*\/?>/g, '<br>').replace(/<(?!br>|\/?b>|\/?i>)[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/* stream tokens, in document order. Composite patterns come first so their inner <p> is consumed. */
const TOKENS = [
  ['head', /<p class="pm-sec-label">(\d+)<b>([\s\S]*?)<\/b><\/p>/],
  ['chapter', /<header class="pm-chapter">\s*<span class="pm-chapter-num">([^<]*)<\/span>\s*<h2 class="pm-chapter-title">([\s\S]*?)<\/h2>\s*(?:<p class="pm-chapter-desc">([\s\S]*?)<\/p>)?\s*<\/header>/],
  ['prod', /<header class="pm-prod"><span class="pm-prod-num">([^<]*)<\/span><h3 class="pm-prod-name">([\s\S]*?)<\/h3><\/header>/],
  ['pull', /<div class="pm-pull">\s*<p>([\s\S]*?)<\/p>\s*<\/div>/],
  ['pull', /<p class="pm-display">([\s\S]*?)<\/p>/],
  ['fact', /<div class="pm-fact"><span class="pm-fact-label">([^<]*)<\/span><p>([\s\S]*?)<\/p><\/div>/],
  ['fact', /<li[^>]*><span class="pm-keyflow-num">([^<]*)<\/span><b>([^<]*)<\/b><small>([^<]*)<\/small><\/li>/],
  ['swatch', /<span class="pm-swatch-chip" style="background:([^"]+)"><\/span><span class="pm-swatch-name">([^<]*)<\/span><span class="pm-swatch-hex">([^<]*)<\/span>/],
  ['swatch', /<div class="pm-chip" style="background:([^;"]+)[^"]*"><b>([^<]*)<\/b>([^<]*)<\/div>/],
  ['skip', /<figcaption class="pm-book-ui">[\s\S]*?<\/figcaption>|<p class="pm-palette-label">[\s\S]*?<\/p>|<span class="pm-swap-hint">[\s\S]*?<\/span>|<div class="pm-keyflow-scope"[\s\S]*?<\/div>/],
  ['cap', /<figcaption>([^<]*)<\/figcaption>/],
  ['img', /<img\b[^>]*>/],
  ['video', /<video\b[^>]*>/],
  ['p', /<p( class="[^"]*")?>([\s\S]*?)<\/p>/],
  ['mission', /<span class="pm-mission-name">([^<]*)<\/span>/]
];
const TOKEN_RE = new RegExp(TOKENS.map(([, r]) => '(' + r.source + ')').join('|'), 'g');
const groupStarts = (() => { let n = 1; return TOKENS.map(([, r]) => { const s = n; n += 1 + new RegExp(r.source + '|').exec('').length - 1; return s; }); })();

function tokens(html) {
  const out = []; let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(html))) {
    const k = TOKENS.findIndex((_, i) => m[groupStarts[i]] !== undefined);
    const groups = m.slice(groupStarts[k], groupStarts[k + 1] || m.length);
    out.push({ type: TOKENS[k][0], raw: m[0], g: i => groups[i] });
  }
  return out;
}

function media(t) {
  if (t.type === 'img') {
    const src = attr(t.raw, 'src'), w = +attr(t.raw, 'width'), h = +attr(t.raw, 'height');
    if (!src || /\/mark(-ink)?\.png$/.test(src) || !w || !h) return null;
    if (w / h >= 8) return null;                      // divider bars
    return { src, a: w / h, alt: attr(t.raw, 'alt') || '' };
  }
  const src = attr(t.raw, 'src'), poster = attr(t.raw, 'poster');
  const ar = +((attr(t.raw, 'style') || '').match(/--ar:([\d.]+)/) || [])[1] || 16 / 9;
  return { src: poster, video: src, a: ar, alt: '' };
}

function parsePage(dir) {
  const html = fs.readFileSync(path.join(ROOT, dir, 'index.html'), 'utf8');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  let s0 = main.indexOf('<section class="project-stream');
  let s1 = ['class="pm-outro"', 'class="project-cta"', 'class="project-footer-nav"']
    .map(k => main.indexOf(k, s0)).filter(i => i > 0).reduce((a, b) => Math.min(a, b), main.length);
  const intro = main.slice(0, s0), stream = main.slice(s0, s1);

  // intro: poster / cover image + description
  const heroTok = tokens(intro).find(t => t.type === 'img');
  let hero = heroTok ? media(heroTok) : null;
  const desc = [...intro.matchAll(/<p class="project-desc">([\s\S]*?)<\/p>/g), ...((intro.match(/<div class="ed-lede">([\s\S]*?)<\/div>/) || [, ''])[1].matchAll(/<p>([\s\S]*?)<\/p>/g))]
    .map(m => inline(m[1]));

  // stream → segments: text first, then the media that follow it
  const segs = []; let cur = null;
  const fresh = () => (cur = { text: [], items: [] }, segs.push(cur), cur);
  const textSeg = () => (!cur || cur.items.length) ? fresh() : cur;
  // a new section heading closes any text still waiting for images (a lone display line stays with it)
  const headSeg = () => (!cur || cur.items.length || cur.text.some(t => t.k !== 'pull')) ? fresh() : cur;
  for (const t of tokens(stream)) {
    switch (t.type) {
      case 'head': headSeg().text.push({ k: 'head', num: t.g(1), name: clean(t.g(2)) }); break;
      case 'chapter': {
        const s = headSeg(), tt = t.g(2);
        s.text.push({ k: 'head', num: t.g(1), name: clean(tt.replace(/<small>[\s\S]*<\/small>/, '')), sub: clean((tt.match(/<small>([\s\S]*?)<\/small>/) || [, ''])[1]) });
        if (t.g(3)) s.text.push({ k: 'p', html: inline(t.g(3)) });
        break;
      }
      case 'prod': {
        const tt = t.g(2);
        textSeg().text.push({ k: 'sub', num: t.g(1), name: clean(tt.replace(/<small>[\s\S]*<\/small>/, '')), sub: clean((tt.match(/<small>([\s\S]*?)<\/small>/) || [, ''])[1]) });
        break;
      }
      case 'pull': textSeg().text.push({ k: 'pull', html: inline(t.g(1)) }); break;
      case 'fact': textSeg().text.push(t.g(3) !== undefined
        ? { k: 'fact', label: t.g(1) + ' ' + t.g(2), html: inline(t.g(3)) }
        : { k: 'fact', label: t.g(1), html: inline(t.g(2)) }); break;
      case 'swatch': {
        const s = textSeg(), last = s.text[s.text.length - 1];
        const sw = { bg: t.g(1).trim(), name: clean(t.g(2)), hex: clean(t.g(3)) };
        if (last && last.k === 'swatches') last.list.push(sw); else s.text.push({ k: 'swatches', list: [sw] });
        break;
      }
      case 'mission': textSeg().text.push({ k: 'fact', label: '', html: inline(t.g(1)) }); break;
      case 'p': {
        const cls = t.g(1) || '', body = inline(t.g(2));
        if (!body) break;
        textSeg().text.push({ k: /pm-en/.test(cls) ? 'en' : 'p', html: body });
        break;
      }
      case 'cap': { const last = cur && cur.items[cur.items.length - 1]; if (last) last.cap = clean(t.g(1)); break; }
      case 'img': case 'video': {
        const m = media(t); if (!m) break;
        (cur || fresh()).items.push(m);
        break;
      }
    }
  }
  if (!hero) {                                        // no poster → first stream image opens the project
    const s = segs.find(s => s.items.length);
    if (s) hero = s.items.shift();
  }
  // text with no images of its own (e.g. a diagram caption) joins the section before it
  const out = [];
  segs.forEach(s => {
    if (!s.items.length && out.length && !s.text.some(t => t.k === 'head')) out[out.length - 1].text.push(...s.text);
    else if (s.items.length || s.text.length) out.push(s);
  });
  return { hero, desc, segs: out };
}

/* ---------- packing ---------- */
// very tall images are cut into side-by-side slices so they read on a landscape sheet
function sliced(items) {
  const out = [];
  items.forEach((it, idx) => {
    const k = it.a < 0.45 ? Math.min(3, Math.round(0.8 / it.a)) : 1;
    if (k < 2 || it.video) return out.push({ ...it, grp: idx });
    for (let i = 0; i < k; i++) out.push({ ...it, a: it.a * k, crop: [i / k, (i + 1) / k], grp: idx, part: i });
  });
  return out;
}

function partitions(n) {                             // all ways to cut 0..n into consecutive runs
  const res = [];
  for (let mask = 0; mask < 1 << (n - 1); mask++) {
    const runs = []; let start = 0;
    for (let i = 1; i < n; i++) if (mask & 1 << (i - 1)) { runs.push([start, i]); start = i; }
    runs.push([start, n]); res.push(runs);
  }
  return res;
}

// lay out `items` in box: rows (each row justified) or columns (each column justified)
function layout(items, box, runs, orient) {
  const g = GAP, R = runs.map(([a, b]) => items.slice(a, b));
  // slices of one image: same row (rows) / separate columns (cols)
  for (const r of R) if (r.length > 1 && orient === 'cols' && r.some(x => x.crop)) return null;
  for (let i = 1; i < items.length; i++) if (items[i].crop && items[i].grp === items[i - 1].grp) {
    const ri = R.findIndex(r => r.includes(items[i]));
    if (orient === 'rows' && !R[ri].includes(items[i - 1])) return null;
  }
  const cells = [];
  if (orient === 'rows') {
    // block width w: row height = (w - g(n-1)) / Σa ; total = Σ + g(r-1)
    const inv = R.reduce((s, r) => s + 1 / r.reduce((t, x) => t + x.a, 0), 0);
    const off = R.reduce((s, r) => s + g * (r.length - 1) / r.reduce((t, x) => t + x.a, 0), 0);
    let w = box.w;
    if (w * inv - off + g * (R.length - 1) > box.h) w = (box.h - g * (R.length - 1) + off) / inv;
    let y = 0, H = 0;
    R.forEach(r => { const A = r.reduce((t, x) => t + x.a, 0), h = (w - g * (r.length - 1)) / A; let x = 0;
      r.forEach(it => { cells.push({ it, x, y, w: h * it.a, h }); x += h * it.a + g; }); y += h + g; });
    H = y - g;
    return place(cells, w, H, box);
  } else {
    const inv = R.reduce((s, c) => s + 1 / c.reduce((t, x) => t + 1 / x.a, 0), 0);
    const off = R.reduce((s, c) => s + g * (c.length - 1) / c.reduce((t, x) => t + 1 / x.a, 0), 0);
    let h = box.h;
    if (h * inv - off + g * (R.length - 1) > box.w) h = (box.w - g * (R.length - 1) + off) / inv;
    let x = 0;
    R.forEach(c => { const B = c.reduce((t, it) => t + 1 / it.a, 0), w = (h - g * (c.length - 1)) / B; let y = 0;
      c.forEach(it => { cells.push({ it, x, y, w, h: w / it.a }); y += w / it.a + g; }); x += w + g; });
    return place(cells, x - g, h, box);
  }
}
function place(cells, bw, bh, box) {
  const dx = box.x + (box.w - bw) / 2, dy = box.y;                 // top of the content band, centred across
  const area = cells.reduce((s, c) => s + c.w * c.h, 0), boxA = box.w * box.h;
  return { cells: cells.map(c => ({ ...c, x: c.x + dx, y: c.y + dy })), fill: area / boxA,
    min: Math.min(...cells.map(c => c.w * c.h)) / boxA };
}
function best(items, box) {
  let top = null;
  for (const orient of ['rows', 'cols']) for (const runs of partitions(items.length)) {
    const L = layout(items, box, runs, orient);
    if (!L) continue;
    const minA = items.length === 1 ? 0 : 0.11;              // every image keeps ≥ 11% of the sheet
    if (L.min < minA) continue;
    if (!top || L.fill > top.fill) top = L;
  }
  return top;
}
// DP over a segment: fewest, fullest sheets. first sheet may use a narrower box (text column)
function pack(items, firstBox) {
  const n = items.length, MAXN = 8;
  const cost = Array(n + 1).fill(Infinity), pick = Array(n + 1);
  cost[0] = 0;
  for (let j = 1; j <= n; j++) for (let k = 1; k <= Math.min(MAXN, j); k++) {
    const i = j - k;
    if (cost[i] === Infinity) continue;
    if (items[i].crop && items[i].part > 0) continue;            // never split one image's slices
    if (j < n && items[j].crop && items[j].part > 0) continue;
    const L = best(items.slice(i, j), i === 0 ? firstBox : BOX_FULL);
    if (!L) continue;
    const c = cost[i] + 1 + 1.4 * (1 - L.fill);
    if (c < cost[j]) { cost[j] = c; pick[j] = { i, L }; }
  }
  const sheets = [];
  for (let j = n; j > 0; j = pick[j].i) sheets.unshift(pick[j].L);
  return sheets;
}

const r1 = v => Math.round(v * 10) / 10;
function cellOut(c) {
  const o = { src: c.it.src, x: r1(c.x), y: r1(c.y), w: r1(c.w), h: r1(c.h) };
  if (c.it.crop) o.crop = c.it.crop;
  if (c.it.video) o.video = c.it.video;
  const cap = c.it.cap || (c.it.alt || '').replace(/^[^—]*—\s*/, '');
  if (cap) o.cap = cap;
  return o;
}

/* ---------- build ---------- */
const OUT = {};
for (const [id, dir] of Object.entries(PAGES)) {
  const page = parsePage(dir);
  const sheets = [];
  if (page.hero) {
    const L = best([page.hero], BOX_OPEN);
    sheets.push({ open: 1, desc: page.desc, cells: L.cells.map(cellOut) });
  } else sheets.push({ open: 1, desc: page.desc, cells: [] });
  let section = '';
  for (const seg of page.segs) {
    const h = seg.text.find(t => t.k === 'head');
    if (h) section = (h.num ? h.num + ' ' : '') + h.name;
    const items = sliced(seg.items);
    if (!items.length) {                              // text only → its own sheet
      if (seg.text.length) sheets.push({ sec: section, text: seg.text, cells: [] });
      continue;
    }
    const hasText = seg.text.length > 0;
    pack(items, hasText ? BOX_TEXT : BOX_FULL).forEach((L, i) =>
      sheets.push({ sec: section, ...(i === 0 && hasText ? { text: seg.text } : {}), cells: L.cells.map(cellOut) }));
  }
  OUT[id] = sheets;
  console.log(id.padEnd(11), String(sheets.length).padStart(3), 'sheets',
    page.segs.reduce((s, g) => s + g.items.length, 0) + (page.hero ? 1 : 0), 'media');
}

const file = path.join(ROOT, 'covers', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const a = html.indexOf('/*SHEETS*/'), b = html.indexOf('/*/SHEETS*/');
if (a < 0 || b < 0) throw new Error('SHEETS markers not found in covers/index.html');
const geo = { SW, SH, ML, MT, GUT, COL: r1(COL), TOP };
fs.writeFileSync(file, html.slice(0, a) + '/*SHEETS*/\nconst SHEET_GEO = ' + JSON.stringify(geo) + ';\nconst SHEETS = ' + JSON.stringify(OUT) + ';\n' + html.slice(b));
