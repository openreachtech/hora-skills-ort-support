# Versioning

The manual describes the system **as it behaved when it was walked**. So every manual set is
bound to the product version it was written against, and it stays that way.

## The binding

- The version is the consuming repository's `package.json` `version` at the time of the run.
- Output goes to `docs/manuals/v<version>/` — the literal `version` string with a `v` prefix:
  `0.3.0` → `docs/manuals/v0.3.0/`.
- The version also appears inside the manual: in the TOC header and in every page's `<title>`.
  A printed or copied page still says what it describes.

## One version, one directory

```
docs/manuals/
├── v0.3.0/        ← current: the only directory this run may write into
├── v0.2.0/        ← history: never edited
└── v0.1.0/        ← history: never edited
```

- **Never edit a past version's directory.** It records how that version worked. Changing it to
  match today's system destroys that record. Fix a mistake found in an old manual in the current
  version's manual instead.
- **A new product version gets a fresh directory**, walked and captured against the new version.
  Screenshots age fastest, and carrying them forward silently is how manuals drift from the
  product. Unchanged features may reuse the previous version's *text* as a starting draft, but
  every screenshot in the new directory comes from a walk of the new version.
- **Re-running for the same version overwrites in place.** Regenerating `docs/manuals/v0.3.0/`
  while the product is still `0.3.0` replaces that directory's content. There are no
  `v0.3.0-final2` variants.

## Partial updates

Updating a single feature's page within the current version (a screen changed in a patch, a page
had an error) is allowed, with the same discipline as a full run: walk that feature for real,
recapture its screenshots, and update the TOC's generation date. Never edit a page's steps
without re-walking them.
