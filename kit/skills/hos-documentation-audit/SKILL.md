---
name: hos-documentation-audit
description: "Audit a maintained document against the conventions it must not contradict, and report what is found without repairing it. A document written for people and a skill written for an agent can state the same rule differently, and neither file records which of them moved last — so both sides are quoted with their evidence and a person decides which one is wrong. A rule a skill states and the document does not is not a finding. Use when a document and a convention may have drifted apart, and after either side changes. Repairing a document a reader stalls on belongs to the humanize skill; what a document may state belongs to the documentation convention."
---

# Documentation Audit

A document is written for people. A skill is written for an agent. When both speak about the
same rule and say different things, one of them is wrong — and **nothing in either file says
which.** This audit finds those places, sets the two statements side by side, and stops.

## A document is neither a copy of a skill nor its complement

**It holds what its own reader needs, and that is the whole of what it holds.** It is not a
rendering of the library in prose, and it is not the part of the library the skills left out.

- **A rule a skill states and the document does not is not a finding.** Not a gap, not an
  omission, not something to carry across. The document's reader did not need it, which is a
  decision already made and not this audit's to reopen.
- **The only thing compared is where the two speak about the same matter and say different
  things.** Everything else is out of range, including the shape of each side's table of
  contents.
- **Without this the audit turns into a diff of two indexes**, and the document grows toward
  being a translation of the library — which is the state it exists not to be in.

## The audit does not repair

**Report both sides. A person decides which one is fixed.**

- **A contradiction does not say which side is stale.** The skill may not have caught up with
  how the work is actually done; the document may have been left behind; or the rule changed
  and neither side followed it. These look identical in the files.
- **Neither file records when its statement was last true.** That is the fact the decision
  needs, and it is not written down anywhere the audit can read. Choosing anyway is picking
  one of two records to destroy on no evidence.
- **This holds even where one side looks plainly right.** A convention that names the other's
  wording as wrong has stated a position, not established a date. A skill can be the stale
  one, and a skill that is being audited is exactly where that is likeliest.
- Repairing a document whose reader stalls on it is the humanize skill's, and there the target
  is settled before the run starts. Here it is not, which is why this one stops.

## The run

| Phase | What happens | Stops |
| :-- | :-- | :-- |
| 1. Fix the counterparts | Name the conventions this document can contradict | — |
| 2. Take them as loaded | The conventions in force are the ones installed | — |
| 3. Collect | Quote both sides of every candidate | — |
| 4. Classify | Contradiction, or out of range | — |
| 5. Report | Set the two statements side by side | **Always** |

### 1. Name the counterparts before reading

Work them out from what the document is about, not from the library's index. **A list
assembled while reading grows to whatever happened to be read**, and an audit whose range was
decided by its own reading cannot say what it did not cover.

State the list in the report. A reader who disagrees with it is disagreeing with the range of
the audit, which is a cheaper argument than one about the findings.

### 2. Take the conventions as loaded

**Audit against the skills as they are loaded, and do not go looking for the repository they
are maintained in.** A convention takes effect by being installed and read. One still sitting
on a branch that has not shipped is not a rule anybody is following yet, and a document cannot
contradict a rule that is not in force.

- **This is what fixes the date the audit speaks for.** The findings are about the conventions
  in force at the moment of the run. Run it again after the next release and the answer may
  differ — which is correct, because the rules moved.
- **A convention known to be about to change is not a reason to reach for the unreleased
  version.** Auditing against text nobody has been given produces findings against a document
  that was never wrong. Wait for it to ship, then run again.
- It also means the audit needs nothing told to it about where the library lives.

### 3. Quote both sides, never from memory

**A finding that cannot be pointed at is not reported.** Every row carries, for each side, the
path, the line and the text as it stands.

This is not bookkeeping. A statement recalled rather than read comes back subtly wrong, and
the wrong version is what the person then decides on. An audit that misreports once is worth
less than one that reports nothing, because the reader now has to check it.

### 4. Classify

| What was found | Verdict |
| :-- | :-- |
| Both speak about the same matter and say different things | **Contradiction.** Report it |
| One states it and the other does not | Out of range. Not reported |
| The document says less about a matter than the convention does | Out of range. Less is not different |

- **Silence can be the correct state.** A convention that hands a matter to a neighbour is
  meant to say nothing about it, and reading that as an omission produces a finding that asks
  for the duplication the library is built to avoid.
- Where a candidate turns out to be out of range, drop it rather than reporting it as a
  near-miss. A report that lists what it decided not to report invites the reader to overturn
  those decisions one at a time.

### 5. Report

One row per contradiction, carrying the matter and both statements with their evidence.

- **State what each side says and nothing about which is right.** The report's job is to make
  the decision possible, not to make it.
- **Where something outside the two files bears on it, report that as a separate observation.**
  A history that follows one side's wording, a workflow that enforces it — these are worth
  knowing and they are still not a verdict, so they are set apart from the row rather than
  folded into it as a recommendation.
- Say how many candidates were examined and how many became findings. An audit that reports
  four findings out of four candidates was probably not looking at the right range.

## What this does not cover

- **Whether the document reads well.** A reader stalling on a passage is the humanize skill's.
- **What language the document is written in**, and what it may state as fact — the
  documentation convention's.
- **Whether a convention's own rules are sound.** The audit compares statements; it does not
  review either side on its merits.
