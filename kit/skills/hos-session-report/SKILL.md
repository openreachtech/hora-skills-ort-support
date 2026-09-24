---
name: hos-session-report
description: "The report that decides whether a session may be exited: what it leaves behind, and what closing it would strand. Held to the work the session touched — run bare it covers that alone, and `repository` widens it to repository level in the repositories it worked in. Covers what decides the boundary, why a section labelled out of scope is still out, and the marked verdict that closes it. Feature progress against recorded requirements belongs to the implementation-progress convention."
---

# Session report

**The report answers one question: may this session be exited?** Everything in it is there
because closing the session would strand it, and everything else is not.

The failure this convention exists for is not inaccuracy. Everything the surplus paragraph says
can be true, checked and useful, and it is still the reader's job to work out that none of it
stands between them and the exit.

## What the report is read for

A reader who can act on it closes the terminal. So the report is measured against that act:

- **What the session left unfinished in a place that will not keep it** — a change not committed,
  a draft nobody has read, a question asked and not answered.
- **What it handed over** — the issue filed, the pull request opened, the branch someone else now
  merges. These are finished from the session's side, and saying so is what lets the reader stop
  looking for them.

**A commit is the floor of preservation, and reaching it takes the work out of the report.** The
criterion is a place that will not keep it, and a commit is a place that keeps it: the work
survives the terminal closing, the machine restarting, and the branch being left alone for a
month. A branch committed and not pushed is therefore not stranded. It is preserved and waiting,
which is a different state and a different person's decision.

**A missing line is worse than a surplus one**, because it is the one that gets stranded. That is
not licence to add: a surplus line postpones the verdict the reader came for, and the way to
cover both is a scope fixed before anything is gathered, not a report widened to be safe.

## Invocation

```
/hos-session-report [repository]
```

**Bare is the ordinary form, and it takes no options.** The report then covers what the session
itself did, and nothing else.

**`repository` widens the scope to repository level**, in the repositories the session worked in
— what stands open there beside the session's own work: the release the work sits in, the trunk's
pull request nobody has opened yet, the issues left for later. It is the only argument, and
nothing is inferred in its absence.

- **It widens by level, not by reach.** A repository the session never opened is outside a
  `repository` run as surely as it is outside a bare one. What the argument lifts is the
  restriction to the session's own artefacts; it never lifts the restriction to where the session
  worked. A report reaching a repository the session did not touch has answered a third question,
  which neither form of this one asks.
- **The argument does not lift the scope rule; it moves the scope.** Bare and `repository` are two
  different questions, and each is answered the same way: report what the named scope holds, and
  nothing beside it. A bare run that reaches past the session's own work is the failure this
  convention is about, and a `repository` run that stops at it answers the wrong question.

## The scope is the session's work, not the repository's state

**What the session reached is inside.** The issue it filed, the branch it cut, the pull request
it opened, the artefact it changed — those are what it left behind, and their state is the
report.

**What merely stands open beside it is outside** — however open, however overdue, however plainly
the reader will have to deal with it later. Sitting in the same repository, the same release or
the same afternoon does not bring it in. That material has a home, and the home is a
`repository` run.

- **Reached, not adjacent, is the test.** An artefact the session touched stays in even where the
  session did not finish it: an issue filed under a larger one is part of what the session did.
  The larger one's other children are not.

## Nothing outstanding is a complete report

**Where the session leaves nothing outstanding, the verdict block is the whole report.** The ✅
line says it, and it is worth no more words than it takes.

A short report reads as a thin one, and the reach for something to add is where the surplus comes
from, never a judgement that the reader needed it. **Length is not what makes a report finished;
answering the question is.**

## The verdict goes last, and carries its mark

**The report ends with a block of its own: one line carrying the mark and a short statement of
the verdict, and the causes as a bullet list from the next line down.**

```
🤔 Something is left
- <what closing the session would strand>
- <and whatever else would be>
```

| Mark | What it says |
| :-- | :-- |
| ✅ | Nothing would be stranded. The session may be exited |
| 🤔 | Something is left, and the bullets below it say what |

**The mark carries a word, and the word is in the reader's language.** The forms above are the
English ones; a reader working in another language gets the verdict in theirs, as the
documentation convention requires of anything generated for a reader — `✅ Exit できます` and
`🤔 残りタスクがあります` are the same block in Japanese. The mark itself does not translate.

**🤔 rather than ❌, because nothing failed.** ❌ is the mark of an error, and work still
outstanding at the end of a session is the ordinary state of work rather than a fault in it. A
report that puts a failure mark on a session that went correctly has its glyph disagreeing with
its own sentences, and the reader trusts the glyph first.

**Last, because the reader is at the bottom of a scroll.** A report of any length has pushed its
own opening off the screen by the time it is finished, so a verdict placed first is a verdict the
reader has to scroll back for — and the one thing they came for is the one thing they should not
have to hunt. What they see without moving is the last line.

- **The causes go below the mark, never above it.** The mark is what the reader came for and the
  list is what they act on, so the order is the order they need them in: a ✅ stops them there,
  and a 🤔 sends them on to the next line. Put the causes first and the reader is reading a list
  before knowing whether it concerns them.
- **✅ takes no bullets.** There is nothing to list under it, and a line explaining why there is
  nothing is a paragraph the reader has already been told they do not need.
- **The mark is not decoration.** A reader scanning for it finds a glyph faster than a sentence,
  and the two states have to be told apart at a glance rather than read.
- **One cause per bullet.** A reader closes a session by clearing them one at a time, and two
  joined into a line cannot be half cleared.
- **The causes are numbered.** A reader answers the report by naming what to do next, and a
  number is what makes that a word rather than a quotation — `2` where otherwise the whole line
  has to be repeated back. The list is written to be replied to, which no other list in a report
  is.
  - **The numbering that checklists refuse is refused for reasons this list does not have.**
    There, a checkbox already marks each item and the numbers only double it, and every insertion
    or deletion forces a renumber. Here there is no checkbox to double, and a report is written
    once and never edited, so the renumber never arrives.
  - **Plain numerals, `1.` upward.** Enclosed forms such as `①` are not written anywhere a reader
    sees, in this convention or any other.
  - **✅ numbers nothing**, having nothing to list.

## A label does not put a section back outside

**Marking a section as out of scope does not excuse including it.** Measured: a report opened by
stating that nothing was outstanding, then carried a further section under a heading that named
it as no part of what had been asked. That section was the one objected to, and its heading had
been read before the objection was possible.

**The disclaimer arrives after the reading it was meant to save.** A reader cannot know a
paragraph is not theirs until they have read enough of it to place the label, so an annotated
surplus costs what an unannotated one costs, and adds the work of deciding whether to trust the
label.

- **So the remedy is omission, never annotation.** A section that needs a disclaimer in order to
  belong is a section that does not belong. Where it is genuinely worth having, it is a
  `repository` run's material, and the reader is the one who asks for it.

## Fix the scope before gathering

**Decide which of the two questions was asked, then gather only for that.** The gathering is
where the surplus is produced: commands run to answer a bare run turn up the repository's wider
state as a side effect, and a report reaches for whatever is already in hand. That state is a
`repository` run's answer, and holding it back is not withholding — it was never in this one.

Settling the scope afterwards does not work. By then the material is there, and dropping it feels
like withholding something — which it is not, because it was never in the answer.

## Where this stops

**A feature with its requirements written down is answered from those, not from here.** Where the
session's work has a progress document anchored to requirement ids, how far along it is and what
is blocking it are read off that document, and the implementation-progress convention settles
what that answer looks like. This convention covers the report with no such document behind it,
which is the residue that one leaves.

- **The scope rule still holds there.** Reading the answer off the document is that convention's
  decision; whether a neighbouring feature's document belongs in this report at all is decided
  here, by which of the two questions was asked.

Run this convention to its end and the report is scoped and true. **What is left is whether the
reader can follow it** — a report built for somebody who watched the session and handed to
somebody who did not is the explain skill's.

What a report may state as fact, and how it refers to a class member, belong to the documentation
convention.
