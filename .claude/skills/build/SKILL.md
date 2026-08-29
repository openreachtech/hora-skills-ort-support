---
name: build
description: "Repository-specific build convention: kit/skills/ holds one level of skill folders named hos-*, and the build validates that tree and copies it into dist/skills/ unchanged, which is what a consuming repository installs. Use when rebuilding the dist/ output, or when adding, renaming or placing a skill under kit/skills/."
---

# Build

A consuming repository installs skills as a single flat list directly under `.claude/skills/`. `kit/skills/` already has that shape here, and `dist/skills/` is the build output that ships in the package.

## Source layout

Every skill sits directly under `kit/skills/`, at exactly this depth:

```
kit/skills/<name>/SKILL.md
```

There is no domain directory in between. This package is one domain — support — so a folder named after it would repeat what the package name and the skill prefix already say, and every consumer of the tree would have to know about a level that carries nothing.

A skill folder may hold its own subdirectories (`references/`, `scripts/`), but no `SKILL.md` below its top level: those subdirectories are the skill's own files, never more skills. There are no intermediate grouping directories.

### The folder name is the skill's name

A skill folder's name is the skill's `name:`, and the folder name it gets under `dist/skills/`, all one string:

```
kit/skills/hos-explain/   name: hos-explain   →   dist/skills/hos-explain/
```

The prefix is part of the name: the skill is invoked as `/hos-explain`. The `ho` stands for **hora**, from Hora Kit — the Open Reach Tech product this skill library is part of — and the third character names the library: `s` for this one, against `c` for `hora-skills-ort-core`, `r` for `hora-skills-ort-renchan` and `f` for `hora-skills-ort-furo`.

Those characters buy two things. A consuming repository installs these skills side by side with its own and with the sibling libraries' — a project equips whichever libraries it works with — all in one flat list, and the prefix is what tells a reader at a glance which library a skill came from. And because every prefix belongs to exactly one library, and a filesystem cannot hold two folders of one name in one directory, no two installed skills can collide: the flat namespace is protected by the source layout itself, with nothing to check.

## The build

```
node .claude/skills/build/scripts/build.js
```

It validates the whole source tree first, then deletes `dist/skills/` outright and recreates it: `dist/` is a function of the current source alone. Without the deletion, a skill renamed or removed at the source would keep its stale folder in `dist/` indefinitely, and the package would go on shipping a skill that no longer exists — a failure invisible in a diff, because nothing about the stale folder changes.

Each skill folder is then copied to `dist/skills/<folder name>/` **byte for byte**. Nothing is rewritten:

- The `name:` line stays. The field and the folder name are the same string by construction, so there is no second, divergent source of truth to remove.
- No source note is appended. The prefix already names the library, so an installed `hos-explain/` says where it came from, and a footer repeating it would be text to maintain that carries nothing.

Validation runs before the deletion, so a source tree that cannot produce a valid flat namespace leaves the previous output untouched rather than half-replaced. Every problem found is reported at once, not one per run:

| Aborts the build | Why |
|---|---|
| A non-directory entry directly under `kit/skills/` | Only skill folders belong there. |
| A skill folder with no `SKILL.md` | A skill is its `SKILL.md`; without one there is nothing to install. |
| A `SKILL.md` below a skill folder's top level | It would be a second skill hidden inside one, invisible to the flat output. |
| A folder name that is not `hos-<name>` | The folder name is the installed name, so an invalid one installs wrongly. |
| A `SKILL.md` with no `name:` | The agent reads that field to know what it is running. |
| A `name:` that differs from the folder name | Two answers to one question; the reader cannot tell which is real. |

The package's `prepack` runs this build, so `npm publish` cannot ship a `dist/` that does not match `kit/`.

## Adding a skill

Create `kit/skills/hos-<name>/SKILL.md`, write `name: hos-<name>` in its frontmatter to match the folder, and run the build. The audit skill reports the same tree without writing anything, and CI runs it on every pull request.
