---
name: hos-session-summary
description: "List the subjects a session took up, one line each, in the order it took them up — what the session was about, for a reader deciding where to look or which session this was. The reason the session was started is its main subject: it is found first, in the opening turns rather than in any summary of them, and every other line is held against it. Held to the session itself and read off its conversation. It lists subjects and carries no verdict, outcome or account of the work: whether the session may be exited belongs to the session-report convention."
---

# Session summary

**The reason the session was started is its most important subject. Find it before anything
else, and build the summary from it.** It is also the subject skipped most often: the end of a
session is what sits in front of whoever writes the summary, and the reason it was opened is not.
A summary that never looked for it lists whatever came last, and reports no gap, because a
region never read produces no absence to notice.

- **Read the first turns of the earliest transcript for it**, never a summary of them. In a long
  session the live context holds only the end, and a compaction summary keeps the opening as one
  entry among dozens, with nothing marking it as the reason the session exists. The first thing
  the person asked for usually names it plainly.
- **Every other line is held against it.** Work done in its service belongs to its line, and only
  what it does not serve becomes a subject of its own.

**The summary answers one question: what did this session take up?** It is a list of subjects,
and nothing else is in it.

Its reader is somebody who has to place the session rather than close it — telling apart several
sessions left open at once, finding which one a subject was settled in, or seeing at a glance how
far one session ranged. None of them needs to know how a subject ended in order to do that, and
each of them is slowed by a line that says.

## The subject the session was started for

**It is the first line**, where the conversation's order already puts it. What the opening of
this convention adds is not a position but a test: every further line has to be something the
opening subject did not hold.

- **A session that closed its opening subject and moved on holds two**, and the summary lists
  both. The later one is not demoted for coming later; it is a subject because the first did not
  hold it.

## What the summary is not

**It carries no verdict.** Whether the session may be exited is the session-report convention's
question, answered by a report that ends on its own marked block. A summary carrying a ✅ or a 🤔
has answered that question without the gathering it takes, and a report carrying a list of
subjects has put a list in front of the verdict its reader came for. Where both are wanted, both
are run, and neither is folded into the other.

**It carries no account of the work.** What was decided, what was changed, why, and in which
order are the conversation's own, and a summary that restates them becomes a second copy the
reader has to check against the first.

- **A subject is named, not resolved.** "Naming a summary skill" is a subject. "Chose
  `hos-session-summary` over `hos-session-topics`" is the outcome of one, and it is left out.
- **A subject the session got wrong is listed the same way.** The summary does not restate the
  answer, so it neither repeats the mistake nor carries the correction. Both stay in the
  conversation, where the reader who needs them will look.

## The scope is the session

**What the session took up is inside, and only that.** The scope is the one a bare session report
takes: the work the session itself did, and the questions it was asked. What stands open beside
it in the same repository is outside, however close it sits.

**The source is the conversation.** A subject is something the person raised or the session took
up, and that exists in what was said, not in what a repository holds. A question answered without
a single file changing is as much a subject as a change that was committed.

- **Nothing is fetched and no state is read.** Status, branches and pull requests say what was
  left on a host, which is a session report's material. Reading them here produces lines the
  summary does not carry.

## What counts as one subject

**A subject is what the person would name if asked what that part of the session was about.** It
is not a step. Reading a file, running an audit and fixing what the audit found are the work on
one subject, never three.

- **The questions a subject raises stay in its line.** A subject asked about, then challenged,
  then narrowed is one subject that took several turns — and so is one whose work raised questions
  of its own: how far along it is, why something it turned up went wrong, where a finding it made
  should be sent. Each was asked because the subject was under way, and none is what the person
  would name the session for.
  - Measured: a summary of a session started to try out a tool listed twenty-one lines, among
    them the progress display, the cause of a missing mark and where each finding was filed. All
    were questions the trial raised, and the correction was that most of the list had nothing to
    do with the subject.
- **Work toward one goal is one subject, however many prompts and artefacts it took.** Finishing
  a release may run through an issue body, a pull request and a release note, each asked for in a
  prompt of its own, and the person still names it as one thing: finishing the release. A line per
  artefact lists what the session produced, which is the account of the work arriving by another
  door. The line names the goal the person was pursuing, and the artefacts were steps toward it.
- **A subject that turned into a different one is two.** Where a question about whether a report
  should list topics became a question about what a new skill should be called, the person moved
  on, and the list says so by holding both.
- **A subject raised and dropped still counts.** It was taken up; that it went nowhere is an
  outcome, and outcomes are left out.
- **A skill run to report on the session itself is not a subject.** `/hos-session-report` and
  this convention look back over what the session took up rather than take anything up of their
  own. Listed, they make the session's bookkeeping read as work, and a summary run last would
  always end on itself.
- **A prompt that only moves the work along is not a subject.** "Go on", "next", "continue" ask
  the session to carry on, and name nothing to carry on with. What the session did in answer
  belongs to the subject that work served; where it opened a goal of its own, that goal is the
  subject, named for what it was rather than for the prompt that reached it.
- **Name it by its subject, not by the session's actions.** "The `/hos-explain` specification",
  not "Read `SKILL.md` and its references". A line the reader has to translate back into what the
  conversation was about has not named it.

## The form

**A numbered list, one subject per line, in the order the session took them up.**

```
1. <subject>
2. <subject>
3. <subject>
```

- **The order is the conversation's.** It is the one order the reader can check against what they
  remember, and any other — by importance, by repository — is a judgement the summary has no
  ground for.
- **The subjects are numbered**, because a reader answers a summary by pointing at a line, and
  `2` is a word where the line itself would be a quotation. Plain numerals, `1.` upward. A numeral
  drawn as one decorated character — circled, parenthesized, or carrying its own full stop — is
  not written anywhere a reader sees. Those characters occupy `U+2460`–`U+249B`,
  `U+24EA`–`U+24FF`, `U+2776`–`U+2793`, `U+3220`–`U+3229`, `U+3251`–`U+325F`, `U+3280`–`U+3289`,
  `U+32B1`–`U+32BF` and `U+1F100`–`U+1F10C`.
- **One line each, with no sub-bullets.** A second level is where the account of the work comes
  back in.
- **Nothing before the list and nothing after it.** No heading, no count, no closing sentence. A
  session that took up one subject gets a list of one.
- **Written in the reader's language**, as the documentation convention requires of anything
  generated for a reader. Names that are code stay in backticks whatever the language.

## Where this stops

Run this convention to its end and the reader knows what the session was about. **Whether it may
be closed** is the session-report convention's, and **what happened under any one subject** is the
conversation's, read there.

A summary built for somebody who watched the session and handed to somebody who did not is the
explain skill's to make readable.
