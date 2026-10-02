---
name: hos-virtual-research
description: "Put a question to a panel of seven personas who know nothing of the session — a ranking of several candidates, or a blind check of a single name — so that a choice made by one judgement, a name above all, is held against a first reading. Use when choosing or checking a name, or when asked to poll personas or run virtual research. It reports and does not decide; repairing a document a cold reader stalls on belongs to the humanize-docs skill."
---

# Virtual research

**A choice made by one judgement drifts toward what that judgement already believes.** A name
above all: whoever proposes it knows what it is for, so they read the purpose into the word every
time they look at it, and nothing in the session ever reads it the way a stranger will.

So the question goes to readers who know nothing of the session — seven personas, each a subagent
meeting the question cold — and their first readings are set beside the session's.

Measured once by hand, naming the directory that holds an add-on's overlays: the panel exposed
what the session's own judgement had missed. `wisdoms` is not natural English, "overlay" collides
with UI vocabulary, "patch" with semver, "fixtures" with Jest. `wings/` was adopted.

**The output is a report. The decision stays with whoever asked.** The panel is evidence about
how a choice reads, not a vote that makes it.

## The two formats

| Format | Taken when | What it asks |
| :-- | :-- | :-- |
| **Ranking** | Several candidates for one slot | Which reads best, and why the worst read worst |
| **Single-name check** | One name, already favoured | What the name says before anybody explains it |

**Ranking.** Each persona ranks every candidate, then gives reasons for its top three and its
bottom three, the words it did not understand, and the collisions that worry it. **The candidates
are shuffled for each persona**, so that the order they were listed in does not become the order
they are ranked in.

**Single-name check.** First a blind question — "what do you think `X/` holds?" — answered before
any explanation is given. Then the explanation, the metaphor the persona thinks is intended, and a
score from 1 to 10 for each of: meaning, fit with its siblings, freedom from collision, English,
and overall. It closes on a verdict, to adopt the name or not.

- **The blind guess is the strongest signal either format produces.** It is the only answer given
  before the persona has been told what the right answer is. For `wisdoms`, none of the seven
  guessed its purpose; for `wings`, three did.
- **A ranking can be followed by a check.** The favourite a ranking turns up is still one nobody
  has read blind, and the check is how it gets read that way.

## Before the panel

**Settle the brief and show it before anything is launched.** Seven agents read whatever the
brief says, so a flaw in it is paid for seven times and then has to be paid for again.

The brief holds four things, settled in this order.

1. **The audience.** Who will actually meet the thing being judged, and where — a directory a
   developer opens, a label an operator reads, a word a customer hears.
2. **The criteria.** Everything the choice is held to, each one written out.
3. **The candidates**, or the single name.
4. **The context a persona is given.** What the thing is for, and the siblings it will sit
   beside — and nothing else.

**The audience is fixed before the criteria.** A criterion is a test of how the audience reads
something, so it cannot be written until the audience is known. The first round of the measured
run asked executives about a directory name they would never see, and the question had to be
corrected before any answer meant anything.

**Every criterion is stated.** A criterion the asker holds and does not write down is one the
panel cannot apply, and its absence does not show until the result is read against it. Stating
"no collision with any vocabulary to come" changed the whole ranking of the measured run:
`overlays` fell from first to ninth.

## The panel

Seven personas, each a `general-purpose` subagent on `sonnet`, **launched in parallel** in one
message, and told to answer by feel, without tools.

| Persona | |
| :-- | :-- |
| Japanese, 30s | web engineer |
| Japanese, 40s | PM, formerly at a systems integrator, weak English, no games |
| Japanese, 20s | frontend engineer, a gamer who uses mods |
| US, 30s | senior backend engineer |
| UK, 40s | technical writer and devrel, not a gamer |
| Japanese, 50s | president of a mid-size IT company, who approves tool spend |
| Japanese, 60s | CIO of a large enterprise, almost no English |

- **A Japanese persona gets the prompt in Japanese, the others in English.** A reader with weak
  English meets an English name through Japanese, and a prompt in English would hand them the
  fluency the persona does not have.
- **Nothing about the session goes into a prompt.** Not the asker's preference, not the
  reasoning behind a candidate, not an earlier round's result. Each of those tells the persona
  what the expected answer is, and the reading stops being a first one.
- **A new set of agents every round.** An agent that took part in an earlier round has read the
  earlier brief, and is no longer meeting the question cold.
- **Answering by feel is the instruction, not a shortcut.** A persona that goes looking things up
  answers as a researcher rather than as somebody meeting the word, and the first reading is what
  the panel exists to collect.

The prompts are in [prompts.md](./references/prompts.md).

## Collisions with Claude's own vocabulary

**Count them, by full-text search, alongside the panel.** A name that means something to Claude
Code or the Claude platform — a feature, a setting, a concept their documentation names — will be
read as that thing by every agent that meets it, and by every person who has read those documents.

Search the full text of both documentation sets for each candidate:

```sh
curl -sL https://code.claude.com/docs/llms-full.txt   -o claude-code.txt
curl -sL https://docs.claude.com/llms-full.txt        -o claude-platform.txt
grep -ci '<candidate>' claude-code.txt claude-platform.txt
```

- **This is done by the session, not by the panel.** The personas answer without tools, and a
  collision is a fact to be counted rather than a feeling to be reported.
- **Read the matches, not only their count.** A word that appears in passing is not a collision;
  a word that names a feature is.

## The report

**Ranking** comes back as a table of average ranks, one column per persona, followed by the
voices that stood out — a reason only one persona gave, a word several did not understand, a
collision nobody in the session had thought of.

**Single-name check** comes back as each persona's blind guess, set beside what the name is for,
then the scores and verdicts.

Either way, the Claude vocabulary count goes with it, and so does what the report says about
itself:

- **Every persona is the same model**, so the opinions spread less than real people's would. A
  consensus of seven is weaker evidence than seven people agreeing.
- **A subagent can see the session's skill list**, so the collisions it cites are grounded in the
  real repositories rather than imagined.

## Out of scope

- **Making the choice.** The report sets the readings beside each other; adopting a candidate is
  the asker's act
- **Repairing a document.** A cold reader reporting where a maintained document stalls belongs to
  the `hos-humanize-docs` skill, which fixes what it finds. This one judges a choice not yet made
- **Generating candidates.** The panel judges what it is given. Proposing names is the session's
  own work, done before the brief is settled

## Detail files

- [prompts.md](./references/prompts.md) — the persona lines, and the prompt for each format
