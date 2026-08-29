---
name: hos-user-manual
description: "Generate end-user operation manuals by driving the system for real: start the local E2E environment, log in as a test user, walk each feature in the UI, and write one HTML page per feature with screenshots plus a table-of-contents page, under a directory bound to the product version. Requires an already-built E2E environment (building it is the E2E build convention's job). Use when asked for a user manual / 利用マニュアル / operation guide; developer-facing docs belong to the documentation convention."
---

# User Manual

Create the manual an **end user** reads to operate the system. This is not a README and not an
architecture document. Each feature gets one HTML page of numbered steps with screenshots. A
table-of-contents page links the pages together. The whole set lives in a directory named after
the product version.

## Core rule: write only what you actually did

Do not write the manual from the source code. Write it from real operation: perform every step in
the running system, through the UI, during this run. Every screenshot shows a screen that really
appeared. If a step cannot be performed (broken feature, missing data, missing permission), do
not write around it. Report the gap to the user as a finding.

Two consequences:

- **The E2E environment is a hard prerequisite.** The whole stack must run for real. Building
  that environment is its own convention (`hor-build-e2e-test-environment`). If the repository has
  no E2E environment, stop and point the user there first.
- **The manual is bound to one product version** — the consuming repository's `package.json`
  `version`. A new version gets a new directory. Old versions are history: never edit them
  ([`references/versioning.md`](./references/versioning.md)).

## Workflow

1. **Check the prerequisite.** Confirm the E2E environment exists and find its commands
   (`up` / `start` / `seed` / `clean` / `down` or the project's equivalents). If it is missing,
   stop and point to the E2E build convention.
2. **Start the environment and seed it.** Bring the stack up and load the seed data.
   **Reuse the existing test seeders as far as they go.** They are the default material for the
   manual's screenshots, and they are already maintained. When a feature needs data the seeders
   do not provide, **stop and ask the user** before adding anything:
   - Add the missing data at all? If yes, as a proper seeder in the E2E seed set, or as
     throwaway records created through the UI?
   - Clean the additions up after the run, or keep them?
   Record the answers. Never grow the seed set without asking, and never leave manual-run data
   behind without asking.
3. **Log in as a test user.** Use a seeded test user and sign in through the UI. The login
   screenshots come from this step. Use an account with the same permissions the manual's reader
   has. An admin account shows menus the reader will never see.
4. **List the features.** Build the feature list from the UI's own navigation, cross-checked
   against any requirement definition. **Confirm the list with the user before writing.** The
   list becomes the table of contents, so scope questions are settled here, not after twenty
   pages.
5. **Walk, capture, write — one feature at a time.** Operate the feature end to end. Capture a
   screenshot per meaningful step
   ([`references/capture-workflow.md`](./references/capture-workflow.md)), then write that
   feature's page ([`references/manual-page-template.md`](./references/manual-page-template.md)).
   One feature = one HTML file.
6. **Write the table of contents.** `index.html` is **required** — a manual set without it is
   incomplete. It lists every feature page, the product version, and the generation date
   ([`references/toc-template.md`](./references/toc-template.md)).
7. **Tear down.** Stop the environment. If step 2 added throwaway data and the user chose
   cleanup, remove it now and say so in the final report.

## Output layout

```
docs/manuals/
├── v0.3.0/                    ← bound to the product version: 1 version = 1 directory
│   ├── index.html             ← table of contents — required
│   ├── assets/
│   │   ├── manual.css         ← shared stylesheet, copied from the page template reference
│   │   └── images/            ← screenshots, named <feature>-<step number>.png
│   └── features/
│       ├── login.html         ← 1 feature = 1 file
│       └── ...
└── v0.2.0/                    ← previous versions stay as written
```

## Rules

| Rule | Meaning |
|---|---|
| Table of contents required | No `index.html`, no manual. It carries the feature list, target version, and generation date. |
| One feature, one file | Pages are reached through the TOC and previous/next links. No single giant page. |
| Self-contained HTML | Styled by the bundled `manual.css`. No external CDNs. Images use relative paths. The directory must open from the filesystem as-is. |
| Version-bound | Output goes under `docs/manuals/v<version>/` only. A new version means a new directory. Never edit an old one. |
| Operation-based | Only steps actually performed and screenshots actually captured. Report steps that could not be performed; do not invent them. |
| Reader's language | Write the manual in the end user's language, whatever language this skill was invoked in. |
