---
name: hos-gh-issue
description: "Write a GitHub issue for this organization and file it, once the text has been approved. An issue states where things stand and which direction to take; how the work is carried out belongs to the pull request. Also writes the body of a sub-issue GitHub left empty, and the hub issue that gathers several. Use whenever an issue, a sub-issue or a tracking issue is asked for. Pull request bodies and commit messages are not this skill's."
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

| Artefact | Holds |
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

**Asked for a hub, the issue is a hub.** The word settles the type and the shape in one go:
`# Checklist` is not written at all, and `# Sub-issues` stands where it would have. A hub with
work of its own is not a hub — that work belongs in one of the children.

**A hub's title takes one of two forms, and the word `Hub` appears in neither.**

```
📂 Release `1.4.0`                          gathering a release — the version is the whole title
📂 The move off the legacy mail templates    any other hub — what the whole of it is about
```

A hub that gathers a release is titled by that release and nothing else. Every other hub is
titled by the overview of what it gathers, at the altitude the children sit beneath.

**Writing `Hub` into the title says nothing the emoji has not already said**, and it spends the
first words on a label instead of on the thing a reader opened the issue for.

**The two checkbox sections are not interchangeable.** A box under `# Checklist` is work done
inside this issue; a box under `# Sub-issues` is an issue that does not exist yet, written as the
full title it will carry, emoji and all — which is what lets GitHub's own sub-issue feature turn
the line into an issue, as the section below describes. An ordinary issue may carry either or
both; **a hub carries only the second.**

[types.md](./references/types.md) carries `📂 Hub` alongside the other types, and the hub's body
in full.

## When a section takes H2s

**Headings from H2 down may be used inside an H1 section, and what decides whether they are is the
number of subjects the section holds — never the number of items.** A section holding ten items on
one subject takes none; a section holding two items on two subjects takes both. Depth is not
capped, and the same test settles each level below.

**An H2 is a table of contents.** `# As-is` says only "the current state", so a section carrying
two kinds of current state leaves the reader sorting the items as they go. The H2 hands them that
sorting before they start.

**So a count never triggers one.** Six items falling four on one subject and two on another take
two H2s, and the four are not divided again — items differing only in which thing they name are
one subject. The division lands where the subjects part, never where the items pile up.

Three signs say a section wants them, and they arrive in this order.

- **Wanting to nest a bullet list.** A `* <a sentence that reads as a heading>` with
  `  * <the substance>` beneath it is an H2 written as a bullet, and the wish to write one is a
  subject boundary making itself felt. It is the earliest of the three, because it arrives while
  the section is still being written
- **One value repeated down the lines.** Where several lines open with the same words — the same
  file, the same section, the same package — that value is a heading written into each line
  instead of above them. **The test is repetition, not naming.** Four items each naming a
  different thing are the four things and stay as they are; eleven lines each naming the same
  thing are eleven items under one subject, and that subject is the heading
- **`# As-is` and `# Checklist` disagreeing.** The division is the issue's own, so the current
  state and the work divide the same way. Where the two sets of H2s do not correspond, one of the
  two divisions is wrong. It is the last of the three, because it needs both sections written

**Each sign catches what the one before it missed.** A flat run of six items raises no wish to
nest anything; six items that repeat nothing raise no second sign either, and the division shows
only when the two sections are held against each other.

**The second sign is the table rule one level up.** `## Several of one kind go in a table` sends
a value every row would repeat to the line above the table rather than to a column of its own,
and a value every line would repeat goes to the heading above them for the same reason: what they
share is not what the reader came for.

## `# As-is` is observed, never inferred

**Every sentence in `# As-is` is something that was read, or it is not written.** The section
states how things stand, so each sentence is a claim about the present — and one nobody checked
reads exactly like one that was, which leaves the reader holding a guess they cannot pick out.

- **Read the state where it lives.** Much of what an `# As-is` wants to say about a repository is
  held by the host rather than by the files — what gates a merge, what has already run, what a
  job can reach. A clone shows none of it, so a section written from the clone alone describes a
  repository nobody is looking at
- **Where the branch for the work already exists, it settles the scope.** An issue written beside
  a branch describes what that branch carries, and a paragraph wandering onto work the branch
  does not touch belongs to a different issue

**`# As-is` is the section that fails quietly.** `# To-be` is a direction and `# Checklist` is a
list of intentions, so both are read as things somebody has yet to agree with. `# As-is` is read
as reporting — and a reader who catches one sentence of it false has no reason left to trust the
others.

## A settled question leaves the body

**An open question belongs in the issue. The history of its answer does not.**

While a matter is undecided, writing it into `# Note` is what gets it decided. The reader is
being asked for something, and the candidates, the objection against each and what each would
cost are what they need in order to answer. The section is doing work.

The moment the matter settles, those same paragraphs stop being a question and become an account
of how the answer was arrived at — what was proposed first, which objection retired it, where
somebody conceded. **Nobody opens an issue to read that.** What the issue now carries is the
answer, and the answer is already in the title, the `# To-be` and the `# Checklist`.

- **Delete the section rather than rewriting it in the past tense.** A settled question written
  up as a record still reads as live, and costs the reader the paragraph it takes to find out it
  is not.
- **Reasoning that will govern the next decision of its kind is a convention, and it moves.** It
  goes to whichever convention owns that kind of decision. Reasoning that explains this issue
  alone goes nowhere, and nowhere is the right destination for it.
- **A constraint is not a biography.** `# Note` keeps premises, orderings and warnings, and every
  one of those still binds after the work is done. What leaves is the deliberation, never the
  conditions.

## The title

**The title opens with the type's emoji**, and the rest of it says what the issue is about.

```
💪 Add a quick start to `docs/`
🗑️ Purge the unused fixtures under `tests/legacy/`
```

**The title names the work, not the file the diff happens to concentrate in.** The test is
whether the file is the decision or the place the decision was recorded. A file purged, a
document written, a lock file regenerated because it had drifted from the manifest — each of
those is the work, and the title names it. The same lock file moved by an install that raised a
dependency is where the work came out, and there the title names the dependency.

The second example above names a path for the first reason: purging those files is the whole of
what the issue asks for.

A title reading `Tidy up <one file>` is the usual way this goes wrong. The file shrank because
fifteen others were fixed, and whoever opens the issue reads one file's worth of work where the
work was the fifteen.

**The title names the whole at one altitude, and never lists the parts.** Work that falls into
two subjects is still one piece of work, and the title is where that one piece gets named. `A,
and B` hands the reader the division instead of the thing, and the division already has a home —
`# As-is` and `# Checklist` carry it under their own `##`.

```
Bad   💪 Settle the rules three skills leave unstated, and the audit no skill covers
Good  💪 Enhance skills by feedback
```

**The altitude to find is the one the parts sit beneath.** Both halves of the bad title above
were the same thing — something the library settles by hand every time instead of once — and the
good one covers both without naming either. **A hub's title is written this way for the same
reason**, so the rule above it is not the hub's own: it is every title's, and the hub is only
where it shows most.

**The branch name and the trunk's opening marker are written at this altitude too.** All three
name one piece of work, so a title that stops listing its parts while the branch name keeps
listing them leaves the three disagreeing. Those two belong to the git branch convention, which
states the same rule from their side.

**A title that has stopped describing the work is corrected while the work is still running.** A
title is written before the work exists, so it is a guess the work is free to outrun, and going
stale is not a defect in the original. Correct it, and bring the branch name and the trunk's
opening marker along — those two belong to the git branch convention, and what is worth having is
the four of them saying one thing.

**The body comes with the title.** Where a title named something that has since been renamed, the
body names it too — in a `# Checklist` path, in a `# Note`, in a `# Sub-issues` line — and none of
those move when the title does. A title corrected on its own leaves an issue disagreeing with
itself, and the checklist is where it shows, because a path written inside a box is the copy
nobody rereads.

The types, and how to pick one, are in [types.md](./references/types.md).

## `# Sub-issues` empties itself

**Each line is the title the sub-issue will carry, written in full, emoji included.**

```markdown
# Sub-issues

- [ ] 🚀 Publish (npmjs.com) — `@openreachtech/hora` `0.8.0`
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

**Confirm a link from the parent, never from the child.** A child's REST payload carries no
`parent` field — `parent_issue_url` sits where one would be — so asking it for `.parent` answers
`null` whether the issue has a parent or not. The reading is indistinguishable from a link that
never took, and it is the first thing anyone reaches for.

```sh
gh api /repos/<owner>/<name>/issues/<parent>/sub_issues --jq '.[].number'
```

- **The parent's `sub_issues` is the plain check**, and it lists every child in one call
- **From the child's end the relation is reachable only through GraphQL**, as
  `issue(number: <child>) { parent { number } }`
- **A link made and then read back wrongly is worse than one not checked at all**, because the
  next move is to make it again — and a second `--parent` on an issue that already has one is how
  a relation gets reported as missing while it stands

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

- **The body goes in one fenced block, whatever it contains.** Split across two, it needs a
  label to say which half is which, and that label is pasted into GitHub along with them
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

**Anything somebody would search for goes in backticks** — file names and paths, class, method,
function and variable names, package names, config keys, versions, commands. An issue is read
before the work by whoever is deciding to pick it up, and a name set in prose is one they cannot
lift out of the sentence to look up.

**A version is one of them, and the title is where it goes missing.** A `# Sub-issues` line
becomes a title verbatim and a `# Checklist` line carries the version that closes it, so a bare
number lands in both places at once.

```
Bad   💪 Raise @humanfs/node to 0.16.8
Good  💪 Raise `@humanfs/node` to `0.16.8`
```

**A path goes in backticks, not in a link.** A relative link resolves against the issue's own URL
rather than the repository tree, so filing the issue is what breaks it.

```
Bad   [`docs/adopting.md`](./docs/adopting.md)
Good  `docs/adopting.md`
```

## Several of one kind go in a table

**Where one kind of change reaches several things of one kind — fields, parameters, files,
workflows — they are not enumerated in prose.** They go in a table, one row each, with a column
for whatever differs between them. This holds in every section of the body, not only in
`# As-is`.

```
Bad   `name:`, `repository:`, `bugs:` and `homepage:` all still carry the boilerplate's
      name, and `description:` still reads `TODO: fulfill here`.

Good  | Field | Current value |
      | :-- | :-- |
      | `name:` | `@acme/todo-fulfill-here` |
      | `description:` | `TODO: fulfill here` |
```

**Items of one kind are alike by construction, so what a reader came for is the differences.**
Prose spends its length on what they share and leaves the one thing that varies scattered through
a run-on clause; a reader checking whether their own case is among them has to parse the sentence
instead of scanning a column.

- **The columns carry what differs, and nothing else.** Where every row would repeat one value,
  that value belongs in the line above the table rather than in a column of its own. A list does
  the same thing with a heading, which is the second sign under `## When a section takes H2s`.
- **This is the prose counterpart of one line per target, below.** A checkbox already gives each
  item a row of its own; a paragraph does not, and the table is what gives it one.

## One line, one target

**A checklist line holds one thing, and the box beside it closes on that one thing.** Two packages,
two files, two workflows or two config keys sharing a line give a reader a box that can only be
whole or untouched — there is no way to say the half that is done.

```markdown
Bad   - [ ] Raise `@acme/env` and `jest`
Good  - [ ] Raise `@acme/env` to `^1.0.6`
      - [ ] Raise `jest` to `^30.5.1`
```

- **A dependency line carries the package and the version it goes to.** A raise without its target
  is not a line somebody can close, because nothing says what would make it true.
- The rule is not about packages. Anything taking the same operation over several targets splits
  per target, and a long result is grouped under `##` headings rather than folded back into fewer
  lines.

**Do not number the lines.** The checkbox is already the per-item mark, and `(1)` `(2)` set beside
it a second one that says nothing more — then has to be renumbered every time a line is inserted or
dropped.

- **Number them where you are asked to.** What is ruled out is reaching for numbering by default,
  not numbering itself: a reader who has to refer to a line from elsewhere is a reason, and being
  asked is the other.

## What the `# Checklist` leaves out

**What CI runs on its own is never a checklist line.** `npm test`, `npm run lint`, a typecheck,
`npm audit` — nobody closes those by hand, and a red run blocks the merge without being asked, so
the line adds nothing the repository was not already saying.

**This holds every time.** There is no run where writing them in to be sure makes the checklist
say more than it said without them.

Running them while the work is going on is a different thing, and nothing here is against it. What
is ruled out is standing them up as rows for somebody to close.

**What CI does not watch is a checklist line.** Behaviour confirmed on a real device, a setting
that has to take effect on an external service, a value somebody enters in a console — those close
by hand alone, which is what a box is for.

**A box is work that changes something.** Something left as it stands, and the outcome of a check,
are neither: they belong under `# Note`.

**Whether a line is still outstanding is checked before it is written.** A box already closed by
the time the issue is filed is something left as it stands, and belongs under `# Note` with the
rest — but it only lands there if somebody looked first. Written unchecked, it sends whoever picks
the issue up to do work that was finished before they arrived.

**A line nothing asks for is the worse of the two.** Where the repository's own documents say a
thing needs no arranging, a checklist that arranges it invents the work outright, and there is
nothing to find at review except that the line should never have been there.

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
- **Everything after the issue exists.** Labels, assignees, milestones and the project board are
  set by whoever owns them, so `gh issue create` is run with none of them and the assignee is
  left empty on purpose. **An issue is often filed for somebody else to pick up**, which is what
  parts it from a pull request: that one is the work of whoever opened it, and
  `hos-gh-pull-request` assigns it to them by default
  - **The parent relation is not one of these.** A sub-issue is an issue, and which issue it sits
    under is part of what it is rather than metadata laid over it afterwards. That is why
    `--parent` and the `gh issue edit` flags beside it are this skill's, above
- **A requirement definition document.** That is a document in the repository, written with the
  requester and approved by them. An issue is a work item on the host

## Detail files

- [types.md](./references/types.md) — the issue types, their emoji, and how to pick or extend them
