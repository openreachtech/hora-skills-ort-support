---
name: hos-write-issue
description: "Write a GitHub issue for this organization — a title carrying its type emoji, and a body of `As-is`, `To-be`, `Note`, `Checklist` and `Sub-issues` — handed back inside a fenced block so it can be pasted straight into the form. An issue states where things stand and which direction to take; how the work is carried out belongs to the pull request. It also writes the body of a sub-issue that GitHub created from a `Sub-issues` line and left empty, and the hub issue that gathers several. Use whenever an issue, a sub-issue or a tracking issue is asked for. Pull request bodies and commit messages are not this skill's."
---

# Write issue

**An issue says where things stand and which direction to take. It does not say how the work is
carried out** — that belongs to the pull request, which links back to the issue and describes
what was done.

The output is text somebody pastes into a form. So it is handed over raw, inside a fenced block,
never as rendered markdown.

## What each artefact holds

| | Holds |
| :-- | :-- |
| **Issue** | `# As-is` · `# To-be` · `# Note` · `# Checklist` · `# Sub-issues` |
| **Pull request** | `# Why` — `Close #<issue>`, and nothing more — then `# How` |

**The pull request's `# Why` is the issue link.** That is why an issue carries no `Why` heading of
its own: the same word already names a different thing one artefact over, and an issue's reason
for existing is the issue existing.

**Writing pull request bodies is not this skill's work.** The split is stated here because it is
what decides where a line belongs.

## The body

Five H1 sections, in this order. **Write only the ones that carry something** — an empty heading
says nothing and costs the reader a stop.

| Section | What goes in it |
| :-- | :-- |
| `# As-is` | How things stand now, and what that costs. A gap is a current state: "nothing states X" belongs here |
| `# To-be` | The direction to take. Not the implementation |
| `# Note` | Premises, constraints, warnings, ordering dependencies on other work |
| `# Checklist` | **What gets done inside this issue's own scope**, as checkboxes |
| `# Sub-issues` | **What becomes a sub-issue of its own** (below) |

**Inside an H1 section, headings from H2 down may be used.** Depth is not capped, and grouping a
long `# Checklist` under H2s is the ordinary use.

**A hub issue carries no `# Checklist`.** Its work is entirely in its children, so it states the
situation and the direction, then lists them under `# Sub-issues`.

## The title

**The title opens with the type's emoji**, and the rest of it says what the issue is about.

```
💪 Add a quick start to `docs/`
🗑️ Purge the unused fixtures under `tests/legacy/`
```

The types, and how to pick one, are in [types.md](./references/types.md).

## `# Sub-issues` empties itself

**Each line is the title the sub-issue will carry, written in full, emoji included.**

```markdown
# Sub-issues

- [ ] 🚀 Publish (npmjs.com) — `@openreachtech/hora` 0.8.0
- [ ] 📄 Specification of the new drop-off directory
```

**Converting a line with GitHub's sub-issue feature removes it from the body**, and the relation
moves to the native sub-issues panel. So:

- **The line's text becomes the new issue's title verbatim.** A line written without its emoji
  produces an issue whose title carries no type
- **Never write an issue number into a line.** There is nothing to number: the line is gone by the
  time the number exists
- **An empty `# Sub-issues` section means every line was converted**, not that somebody forgot to
  fill it in

**A converted sub-issue arrives with an empty body.** No template is applied, so it holds a title
and nothing else — and **writing that body is this skill's work too.** Given such an issue, write
the five sections for it as for any other.

## Language

**An issue is written in English unless a language is asked for.** The reader is whoever opens the
repository rather than whoever is in the conversation, so the language of the request does not
decide it.

**This overrides the documentation convention for issues only.** That convention writes a document
in the language its reader is using; an issue's readers are not knowable from the conversation,
and English is the one they share.

**An explicit instruction wins**, as it does everywhere. Asked for Japanese, write Japanese —
**and keep the type label in English.** The type set is defined in English, so a translated label
stops matching it.

```
💪 Add a quick start to `docs/`                 default
💪 `docs/` にクイックスタートを追加する          asked for in Japanese
```

## How it is handed over

**Inside fenced blocks, so it can be copied.** The title and the body go in separate blocks,
because the form has two fields.

- **Where the body contains a fenced block of its own, fence the whole thing with four backticks
  or more.** Three would end the block at the first inner fence
- **Nothing but the issue text goes inside the fence.** Commentary, a heading saying "body", an
  explanation of a choice — all of that goes outside it, or the reader pastes it into GitHub

## Referring to a file

**Write the path in backticks. Never as a markdown link.** A relative link resolves against the
issue's own URL rather than the repository tree, so it breaks the moment it is pasted.

```
Bad   [`docs/adopting.md`](./docs/adopting.md)
Good  `docs/adopting.md`
```

Everything a reader would copy and search for takes backticks: paths, package names, identifiers,
config keys, versions, commands.

## Two things about the checkboxes

- **An issue is sometimes filed after the work is done.** Where that is what happened, hand it over
  with the boxes already checked
- **A box states what is true.** Checking one that is not is the one thing that makes a checklist
  worth less than no checklist

## Templates

The organization keeps its issue templates centrally, so **a repository being worked in usually has
none to read.** This skill carries the format for that reason.

**Where a repository does carry its own template, that template wins.** Read it and follow it, and
say that is what happened.

## Out of scope

- **Pull request bodies.** Only the boundary above is this skill's
- **Commit messages and branch names.** They belong to the git conventions
- **Filing the issue.** This skill produces text; opening the issue, converting a `# Sub-issues`
  line, and closing a box are a person's actions
- **A requirement definition document.** That is a document in the repository, written with the
  requester and approved by them. An issue is a work item on the host

## Detail files

- [types.md](./references/types.md) — the issue types, their emoji, and how to pick or extend them
