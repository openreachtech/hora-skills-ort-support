---
name: hos-gh-issue
description: "Write a GitHub issue for this organization and file it — a title carrying its type emoji, and a body of `As-is`, `To-be`, `Note`, `Checklist` and `Sub-issues` — shown in full first, then sent with `gh issue create` once you say so, and handed over as text alone where `gh` is missing or logged out. An issue states where things stand and which direction to take; how the work is carried out belongs to the pull request. It also writes the body of a sub-issue that GitHub created from a `Sub-issues` line and left empty, and the hub issue that gathers several. Use whenever an issue, a sub-issue or a tracking issue is asked for. Pull request bodies and commit messages are not this skill's."
---

# GitHub issue

**An issue says where things stand and which direction to take. It does not say how the work is
carried out** — that belongs to the pull request, which links back to the issue and describes
what was done.

**The text is shown before anything is sent, and it is sent only if you say so.** It goes past
raw, inside a fenced block, never as rendered markdown — that is the shape it is checked in, and
the shape it is pasted in where `gh` cannot reach GitHub.

**The `gh` in the name is GitHub.** It marks a skill that reaches the host rather than stopping
at the text it wrote; `hos-gh-pull-request` is the other one carrying it.

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

**Asked for a hub, the issue is a hub.** The word settles the type and the shape in one go: the
title opens with `📂 Hub`, `# Checklist` is not written at all, and `# Sub-issues` stands where
it would have. A hub with work of its own is not a hub — that work belongs in one of the children.

**The two checkbox sections are not interchangeable.** A box under `# Checklist` is work done
inside this issue; a box under `# Sub-issues` is an issue that does not exist yet, written as the
full title it will carry, emoji and all — which is what lets GitHub's own sub-issue feature turn
the line into an issue, as the section below describes. An ordinary issue may carry either or
both; **a hub carries only the second.**

[types.md](./references/types.md) carries `📂 Hub` alongside the other types, and the hub's body
in full.

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

**A sub-issue can also be filed straight into the panel**, with no line to convert:

```sh
gh issue create --parent <parent number> --title '💪 …' --body-file <path>
```

- **A line and a `--parent` filing are the same relation by two routes**, so do one or the other.
  Converting a line after the child already exists leaves two issues where one was meant
- **An issue that already exists joins by number**, from either end: `gh issue edit <child>
  --parent <parent>`, or `gh issue edit <parent> --add-sub-issue <number>`. `--remove-parent` and
  `--remove-sub-issue` undo them
- **A child filed this way is an issue like any other.** Its title carries its own type emoji and
  its body carries the sections it needs; having a parent changes neither

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

## How the text is shown

**Inside fenced blocks, so it can be read and copied.** The title and the body go in separate
blocks, because they are two fields on the form and two arguments on the command.

- **Where the body contains a fenced block of its own, fence the whole thing with four backticks
  or more.** Three would end the block at the first inner fence
- **Nothing but the issue text goes inside the fence.** Commentary, a heading saying "body", an
  explanation of a choice — all of that goes outside it, or the reader pastes it into GitHub

## Using `gh`

**Where `gh` can reach GitHub, this skill uses it** — for reading the host as much as for filing
to it. What follows is decided by the environment rather than by the request:

| `gh` | What this skill does |
| :-- | :-- |
| installed, and `gh auth status` passes | Reads the issues it needs, and files this one once you say so |
| missing, or nobody is logged in | Says which of the two it was, and stops at the text |

**Nothing above this section changes either way.** What an issue holds, how it is titled and
which language it is written in are the same whether it is filed from here or pasted by hand.

### Reading

**A sub-issue whose body is to be written is read, never guessed at.** GitHub made it from a
`# Sub-issues` line and left it empty, so its title is the whole of what says which of the five
sections it needs — and the title is on the host, not in the conversation.

```sh
gh issue view <number>
```

### Filing

**`gh` is touched only after the text has been shown.** A send is not the moment to read what is
being sent, so the title and the body are in front of the reader in full before the question is
even asked.

- **Never send without asking.** The question comes after the text, so what is being agreed to is
  on the screen when it is asked. A yes covers the issue that was shown, and nothing beyond it
- **A no ends the work, and ends it well.** The text stands, and it is worth no less for not
  having been filed
- **Where `gh` cannot be used, hand over the command along with the text**, so that whoever logs
  in later has nothing to reassemble

```sh
gh issue create --title '💪 Add a quick start to `docs/`' --body-file <path>
```

- **The body goes through `--body-file`, never `--body`.** An issue body is full of backticks,
  `#` and newlines, and the shell reads every one of them before `gh` sees anything. A file is
  read by `gh` itself, so nothing inside has to be escaped — and `-` reads standard input where
  writing a file is not wanted
- **`--repo <owner>/<name>` wherever the working directory is not the repository the issue
  belongs to.** Left out, `gh` files against whatever repository the directory resolves to, which
  is how an issue lands somewhere nobody meant
- **`--parent <number>` files the issue under another one**, described under `# Sub-issues` above
- **Report the URL `gh` prints.** It is the one part of the result that is not already on the
  screen

## Referring to a file

**Write the path in backticks. Never as a markdown link.** A relative link resolves against the
issue's own URL rather than the repository tree, so it breaks the moment it is pasted.

```
Bad   [`docs/adopting.md`](./docs/adopting.md)
Good  `docs/adopting.md`
```

Everything a reader would copy and search for takes backticks: file names and paths, class,
method, function and variable names, package names, config keys, versions, commands. A name
written in code is written in backticks in prose as well.

**A version number is one of them, in the title as much as in the body.** It is what a reader
copies to check what they are running against, and left bare it reads as prose rather than as a
value.

```
Bad   💪 Raise @humanfs/node to 0.16.8
Good  💪 Raise `@humanfs/node` to `0.16.8`
```

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
- **Converting a `# Sub-issues` line, and closing a box.** Both are done by hand on GitHub, and
  neither follows from filing the issue
- **Everything after the issue exists.** Labels, assignees, milestones, the sub-issue panel and
  the project board are set by whoever owns them, so `gh issue create` is run with none of them
  and the assignee is left empty on purpose. **An issue is often filed for somebody else to pick
  up**, which is what parts it from a pull request: that one is the work of whoever opened it,
  and `hos-gh-pull-request` assigns it to them by default
- **A requirement definition document.** That is a document in the repository, written with the
  requester and approved by them. An issue is a work item on the host

## Detail files

- [types.md](./references/types.md) — the issue types, their emoji, and how to pick or extend them
