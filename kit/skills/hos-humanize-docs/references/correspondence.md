# Correspondence

Comparing the language versions of one document, the fan-out across them, and what happens when
a repair needs the structure to change. Referenced from `SKILL.md`.

## The family, and what may be written

**The set of language versions is resolved from disk**, by finding what sits beside the target
under the same base name. The skill holds no naming scheme of its own, so a repository's own
convention is what decides the family.

**`lang:` decides which of them may be written. Everything in the family is read regardless** —
the voice and the correspondence cannot be judged from one member.

| Invocation | Read | Written |
| :-- | :-- | :-- |
| `docs/guide.ja.md` | the family | **that one file** |
| `docs/guide.ja.md lang:all` | the family | the family |
| `docs/guide.*` | the family | the family — the path named them |
| `docs/ lang:ja` | everything under it | the `.ja` versions |

**The target resolves literally, and never expands on its own.** Writing a file the caller did
not name is the worst failure available to this skill, so widening is the caller's act. Say what
the family holds and how to widen; do not decide it.

**A file outside the write set is never edited, whatever is found in it.** Report it.

## What is compared, and what is not

**One version is not a translation of another.** Each is that language's own document, so the
comparison is about what the versions claim, never about which words they chose.

| Compared | Requirement |
| :-- | :-- |
| Claims | **Identical.** A claim on one side and not the other is a defect, as is a condition dropped on one side |
| Heading structure | Same levels, same order, same count |
| Figures, tables, fenced blocks | Present in every version, or in none |
| Term mapping | One concept, one word per language, mapped one to one across them |
| **Word choice** | **Not compared.** Each language uses its own |
| **Line counts** | **Not compared.** They often align, and nothing requires it |

**This is what settles which fixes cross the language boundary.**

| The defect | Reach |
| :-- | :-- |
| Wording — a translation artifact, an unnatural phrase, a term this language does not use | **That version only.** The others are not wrong |
| A claim — no actor, an unresolvable reference, two claims in one sentence | **Likely present in every version.** Repair those in the write set, report the rest |

## Which side is right is not decided here

**A mismatch is a finding, not a verdict.** Which version states the intended claim is intent,
and reading the documents does not settle it.

| Situation | Action |
| :-- | :-- |
| Both sides are in the write set | **Ask which claim is the intended one** |
| One side is outside the write set | **Report and stop on that finding** |

**The version with no language suffix is not the authority.** It is usually the one written
first, and being first is not being right.

## The fan-out

```
stage A   one agent per language, in parallel
            each runs its own cold-read loop over its own version
            several documents in one language run serially

stage B   one agent, once, over every version at once

stage C   one cold-read round over the versions stage B wrote to
```

**Stage A parallelizes by language because the writes are exclusive** — one file per language —
and because a stall is language-bound. A reader of one language cannot report where a reader of
another stalls.

**Concurrency is bounded by the number of languages.** Ten documents in ten languages is ten
agents, not a hundred.

**Stage B cannot be split by language.** A mismatch is only visible with two versions side by
side.

**`rounds:` counts per language**, so ten languages at three rounds is up to thirty cold reads.
Show the resolved file list and that ceiling before the first round, so the cost is visible
before it is paid.

## Structural requests

**Stage A never changes the chapter structure or an item count.** Stage A runs per language, so a
version that gained a heading is out of correspondence with nine others the moment it is written —
the repair would create the defect stage B exists to find.

So a stall that cannot be repaired inside the existing structure is **carried to stage B as a
structural request**, and stage B applies it across the whole family at once.

**Try to repair inside the existing structure first.** A structural change costs every language,
and most clarity defects do not need one — sentences split, clauses reorder, a term gets
introduced, all inside the section that was already there.

When the structure genuinely has to move:

| Write set | Action |
| :-- | :-- |
| The whole family | Apply it to every version |
| Narrower | **Ask whether to widen to the family.** If not, leave the structure alone and repair inside it |

**Structure cannot be changed for part of a family.** Doing so leaves the set in exactly the
state the next run reports as a defect.

**New text a structural change requires is written in each language, by that language's agent.**
Filling it by translating one version breaks the premise that each version is its own document,
and a placeholder ships an unfinished page.

**Whatever stage B wrote gets a cold read in stage C.** Text that no cold read has seen is text
that never passed the check this skill exists to run.
