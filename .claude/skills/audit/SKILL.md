---
name: audit
description: "Repository-specific check: reports every skill under kit/skills/ whose folder name, SKILL.md or placement would stop the build — a wrong name, a missing or mismatched name: field, a nested skill, a stray file — and every place a document states a skill count that no longer matches what is there. Reads only, writes nothing. Use before opening a pull request that touches kit/skills/, or when the build aborts and the whole list of problems is wanted at once."
---

# Audit

The build refuses to write `dist/skills/` while the source tree is invalid. This skill reports the same problems without touching anything, so the tree can be fixed before a build, and so CI can fail a pull request that breaks the layout.

```
npm run skill-names
```

or

```
node .claude/skills/audit/scripts/audit.js
```

It prints how many skills it checked, then one group per kind of problem, and exits non-zero when there is at least one. A clean tree prints `No problem found.`

## What it reports

| Group | Meaning |
|---|---|
| `Not a skill directory` | Something that is not a directory sits directly under `kit/skills/`. |
| `No SKILL.md` | A skill folder holds no `SKILL.md`, so there is nothing to install. |
| `Nested skill below a skill directory` | A `SKILL.md` below a skill's own top level: a skill hidden inside a skill. |
| `Folder name is not ...` | The folder name does not read `hos-<name>`, and the folder name is the installed name. |
| `Missing name:` | The frontmatter declares no `name:`. |
| `name: does not match the folder name` | The two disagree, so a reader cannot tell which one the skill is. |
| `Stated skill count does not match ...` | A document states a number of skills that disagrees with what is under `kit/skills/`. |

Six places restate the count as prose — the catalog heading and the README opening in both languages, and this package's own row of the package table in both. Each is a fact about a directory, written by hand, so when a skill is added the count in all six moves or none of them does. The package table's other rows are **not** checked: they state a sibling library's count, which cannot be verified from inside this repository.

The rule for a valid name is written out in this script and in the build's, rather than shared through an import, so that neither has to reach into the other's skill folder. A test pins the two copies to each other: changing the rule in one place alone fails it.

## What it does not report

It says nothing about a skill's content — its wording, its structure, whether its description would make an agent pick it. This is the layout keeper, not the reviewer.
