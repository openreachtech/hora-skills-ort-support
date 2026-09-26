---
name: hos-gh-notation
description: "How anything filed to GitHub is written down, as against what it says — the form its sections, tables, names and cross-references take, and the language it is written in. Read alongside hos-gh-issue, hos-gh-pull-request or hos-gh-release-note whenever one of them is in hand: those say what the artefact holds and how it reaches the host, and this says how any of it is set down."
---

# GitHub notation

**What an issue, a pull request and a release note each carry is three different questions. How
any of them is set down is one.** This gathers that one, so that the three do not answer it
separately and drift.

Every rule here is read together with the skill for the artefact being written. That skill says
which sections exist and what goes in them; this one says how what goes in them is written.

## Several of one kind go in a table

**Where one sentence names several things of one kind, they are not enumerated in prose.** They
go in a table, one row per thing, with a column for whatever differs between them. This holds in
every section of a body, wherever the artefact puts them.

**The trigger is several of one kind in one sentence, whatever put them there.** A change reaching
each of them is the obvious case and not the only one: an inventory of what several classes hold
in common has no change in it at all, and still arrives as a run-on clause a reader has to unpick.
Fields, parameters, files, workflows, class members, config keys — **the kinds are not a list to
check against**, and a sentence is not exempt because the thing it names is absent from an
example.

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

- **The rows are the things being compared; the columns are what differs about them.** Putting
  the things across the top instead reads as a table of one row per attribute, and a reader
  looking for one of them scans a row rather than finding it where rows are found. Three servers
  compared on four points is four columns and three rows, never the reverse.
- **The columns carry what differs, and nothing else.** Where every row would repeat one value,
  that value belongs in the line above the table rather than in a column of its own. A list does
  the same thing with a heading, which is the second sign under `## When a section takes H2s`.
- **This is the prose counterpart of one line per target, below.** A checkbox already gives each
  item a row of its own; a paragraph does not, and the table is what gives it one.

**One subject is one table, and a property of the rows is not a reason to cut it in two.** Where
some rows carry an exception and others do not, splitting on that scatters the thing the reader
opened the section for: whoever wants to know what the set holds now has to find both halves and
put them back together. **Mark the exception instead** — a narrow last column carrying a footnote
mark, and the footnote beneath the table.

- **The mark is read only by whoever the exception concerns.** Everybody else reads the table and
  stops, which is what splitting it takes away.
- **Two marks where there are two kinds of exception.** One mark covering both makes the footnote
  claim something untrue of half the rows it points at — a name that differs and a member that is
  absent are not the same exception, and a single note cannot say both.

**Nor do two tables merge because their rows share a subject.** Rows naming the same things is not
enough; the columns have to be one kind. A table whose columns are member names and a table whose
column is how a module is reached are two tables however alike their left edges look, and joining
them leaves a row whose cells answer different questions.

## When a section takes H2s

**Headings from H2 down may be used inside an H1 section, and what decides whether they are is the
number of subjects the section holds — never the number of items.** A section holding ten items on
one subject takes none; a section holding two items on two subjects takes both. Depth is not
capped, and the same test settles each level below.

**An H2 is a table of contents.** An H1 names one thing — the current state, the approach taken —
so a section carrying two of that thing leaves the reader sorting the items as they go. The H2
hands them that sorting before they start.

**So a count never triggers one.** Six items falling four on one subject and two on another take
two H2s, and the four are not divided again — items differing only in which thing they name are
one subject. The division lands where the subjects part, never where the items pile up.

Three signs say a section wants them, and they arrive in this order.

- **Wanting to nest a bullet list.** A `* <a sentence that reads as a heading>` with
  `  * <the substance>` beneath it is an H2 written as a bullet, and the wish to write one is a
  subject boundary making itself felt. It is the earliest of the three, because it arrives while
  the section is still being written
- **One value repeated down the lines.** Where several lines carry the same words — the same
  file, the same section, the same package — that value is a heading written into each line
  instead of above them. **Where it sits in the line decides nothing.** A qualifier every line
  ends with repeats exactly as a prefix every line opens with, and the verb they share hoists with
  it: six lines reading `Migrate <a name> from <a package>` become a heading naming the migration
  and its origin, with the six names bare beneath it. **The test is repetition, not naming.** Four items each naming a
  different thing are the four things and stay as they are; eleven lines each naming the same
  thing are eleven items under one subject, and that subject is the heading
- **Two sections of one body dividing differently.** Where a section recording what was done and
  a section describing it do not carry the same H2s, one of the two divisions is wrong. Which two
  sections are held against each other is the artefact's own — each skill names its pair. It is
  the last of the three, because it needs both of them written

**Each sign catches what the one before it missed.** A flat run of six items raises no wish to
nest anything; six items that repeat nothing raise no second sign either, and the division shows
only when the two sections are held against each other.

**The second sign is the table rule one level up.** `## Several of one kind go in a table` sends
a value every row would repeat to the line above the table rather than to a column of its own,
and a value every line would repeat goes to the heading above them for the same reason: what they
share is not what the reader came for.

## Referring to a file

**Anything the reader will look up, copy or match against something in front of them goes in
backticks** — file names and paths, class, method, function and variable names, package names,
config keys, versions, commands. A name set in prose is one they cannot lift out of the sentence,
and each artefact is read with something beside it that the name has to be carried across to. What
that something is, and where the cost falls hardest, each skill says for itself.

**A version is one of them.** A bare number says only that something moved, and it is the part a
reader came for.

```
Bad   Raise @humanfs/node to 0.16.8
Good  Raise `@humanfs/node` to `0.16.8`
```

**A title carries them too**, wherever the artefact has one.

**A path is written, never linked.** A relative link resolves against the artefact's own URL
rather than the repository tree, so it is broken from the moment it is filed.

```
Bad   [`docs/adopting.md`](./docs/adopting.md)
Good  `docs/adopting.md`
```

## A reference to another issue is permanent

**Writing `#<number>` into an issue puts a line on that issue's timeline, and nothing takes it
off.** The mention is recorded as an event rather than as text, so editing the reference out of
the body leaves the event standing, and no API deletes one. Measured on a live repository: the
number was removed from the body, and the target still carried the line naming the issue that had
mentioned it.

**So `# Note` carries no `#<number>` at all.** An ordering dependency is stated by naming the
branch, which says the same thing and leaves nothing behind on anybody else.

- **The cost is borne by the issue that was referenced**, which is why it is easy to miss. The
  author sees a link; the reader of the other issue sees a timeline growing entries about work
  they did not open it for.
- **A repository that may be opened up later cannot be tidied afterwards.** The events are as
  public as the issues are, and they are the part nobody can go back and remove.
- **A pull request's `Close #<number>` is the exception, and the only one.** That line is what
  ties the pull request to the issue it closes, and the event it leaves is the tie being visible
  from the other end. It belongs to the pull request convention.

## How the text is shown

**Inside a fenced block, so it can be read and copied.** A body is full of tables, backticks and
`#`, and a reader checking one value against their own is copying rather than reading.

- **Where the artefact has a title as a separate field, it takes a block of its own.** Two fields
  on the form are two arguments on the command, and one block holding both needs a label saying
  which half is which — which then gets pasted in along with them
- **The body goes in one fenced block, whatever it contains.**
- **Where the body holds a fenced block of its own, fence the whole thing with four backticks or
  more.** Three would end the block at the first inner fence
- **Nothing but the artefact's own text goes inside the fence.** Commentary, a heading saying
  "body", an explanation of a choice — all of that goes outside it, or it is pasted in too

## Language

**Written in English unless a language is asked for.** The reader is whoever opens the repository
rather than whoever is in the conversation, so the language of the request does not decide it. An
explicit instruction wins.

**This overrides the documentation convention here.** That convention writes a document in the
language its reader is using; these readers are not knowable from the conversation, and English is
the one they share.

## The title names the whole at one altitude

**Work that falls into two subjects is still one piece of work, and the title is where that one
piece gets named.** `A, and B` hands the reader the division instead of the thing, and the
division already has a home — the body carries it under its own `##`.

```
Bad   💪 Settle the rules three skills leave unstated, and the audit no skill covers
Good  💪 Enhance skills by feedback
```

**The altitude to find is the one the parts sit beneath.** The three skills of the bad title were
all for handing work over, and the good one covers them without naming any of the three.

- **What the title opens with is the artefact's own.** An issue takes the emoji of its type and a
  pull request takes the emoji of the issue it closes; which one applies is settled by the skill
  for that artefact, not here.
- **A title that has stopped describing the work is corrected while the work is still running.** A
  title is written before the work exists, so it is a guess the work is free to outrun, and going
  stale is not a defect in the original. The branch name and the trunk's opening marker are
  written at this altitude too, and they are corrected along with it — those two belong to the git
  branch convention.


## Out of scope

- **What each artefact holds.** The sections of an issue, a pull request and a release note belong
  to their own skills, and so does the emoji each title opens with
- **Reaching the host.** Reading an issue before writing against it, opening a pull request as a
  draft, sending a release note — all of that is procedure rather than notation, and each skill
  states its own
- **Commit messages and branch names.** They belong to the git conventions, which are read by
  whoever is committing rather than by whoever is filing
