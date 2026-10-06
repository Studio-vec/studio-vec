# Shared header / footer

`header.html` and `footer.html` are the single source for the site header and
footer on the home page and every project page (`p01-…` to `p13-…`).

After editing either file, run from the repo root:

```bash
python tools/sync_partials.py
```

The block between `<!-- partial:header -->` / `<!-- /partial:header -->` (and the
footer equivalent) in each page is overwritten, so don't edit it in a page
directly. `python tools/sync_partials.py --check` reports pages that are out of
sync. `404.html` and `covers/` have their own layouts and are not touched.
