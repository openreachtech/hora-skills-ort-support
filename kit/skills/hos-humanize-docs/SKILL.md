---
name: hos-humanize-docs
description: "Repair a maintained document so that a first-time reader stops stalling on it. A cold read by an agent with no prior knowledge reports where it stalled, each stall is classified against written criteria, and the document is fixed — looping until the findings fall inside a threshold. Structure and voice are preserved, and the intended reader never changes. Use when a document is hard to follow, when one language version reads like a translation, or when a language family has drifted apart. Rewriting a message for a non-technical reader belongs to the explain skill; deciding which language a document is written in belongs to the documentation convention."
---

# Humanize docs

**An author cannot see what stops a reader.** Ten rounds of the author rereading their own
document finds the typos and leaves the sentence with no subject standing, because the author
supplies the subject from memory every time they read it.

So the first act is not a checklist. It is a **cold read**: an agent with no prior knowledge
reads the document and reports only where it stalled. The criteria in this skill are what turn
that report into edits; they are not what finds the defects.

The input is a document the repository maintains. The output is edits to that document, with
its structure and its voice intact. **The reader never changes** — a document for engineers
stays a document for engineers, and its technical terms stay.

## Invocation

```
/hos-humanize-docs <target> [lang:<codes>] [rounds:<n>] [strict] [dry]
```

| Argument | What it carries | Default |
| :-- | :-- | :-- |
| `<target>` | What to repair. A path, a glob, or prose | Required |
| `lang:` | Which language versions may be written — `ja`, `ja,zh`, `all` | Whatever the path named |
| `rounds:` | Cap on cold-read rounds, **per language** | `3` |
| `strict` | Drop the `minor` threshold to zero | Threshold from the document's length |
| `dry` | Cold read and classify only. Write nothing | Write |

**Accept the `key:value` arguments in any order.**

**Resolve `<target>` to an explicit file list and show it before the first round.** Prose is
accepted because real requests carry exclusions a glob cannot ("the Japanese ones, not the API
reference"), and ambiguity in a target is expensive: it decides which files get written. The
resolution is where the ambiguity dies, before any reading is paid for.

Show the language family alongside it, and how to widen:

```
family 10 files, writing 1 (docs/quick-start.ja.md)
the other 9 are read only. lang:all writes all of them
```

**`dry` fixes `rounds` at 1.** With nothing repaired, the next round reads the same text and
reports the same stalls.

## The three stages

```
A. per language, in parallel
     cold read -> classify -> fix -> cold read again, up to the cap
     fix only inside the existing chapters and item counts
     anything needing a structural change is carried to B as a structural request

B. correspondence, once, after every language has finished
     claims, heading structure, figures and tables, term mapping
     apply the carried structural requests to the WHOLE family at once

C. one cold-read round, only over the language versions B wrote to
```

**Stage A runs per language because a stall is language-bound.** A reader of Japanese stalls on
Japanese sentences, and no other version tells you where. One agent per language, and several
documents in one language run serially — the concurrency is bounded by the number of languages,
never by the number of files.

**Correspondence cannot run before A.** Stage A splits sentences and reorders clauses, so
comparing the versions first compares documents that are about to change.

**Stage C exists because B writes prose.** A version B has touched has text in it that no cold
read has seen.

Details: [`cold-read.md`](./references/cold-read.md) for A, [`correspondence.md`](./references/correspondence.md)
for B and C.

## The loop

```
round = 0
previous = null

while (round < rounds) {
  report  = coldRead(doc)          // a NEW agent every round
  finding = classify(report)       // severity, and in scope or out

  if (finding.critical == 0
   && finding.major    == 0
   && finding.minor    <= threshold(doc)) break

  if (previous && finding.inScope >= previous.inScope) reportAndStop()

  fix(finding)
  previous = finding
  round++
}
```

**Classification comes before fixing, and only what is in scope is counted.** A cold reader asks
about facts other documents own — what the product is, why an install step exists. Counting those
makes the exit condition unreachable and the loop never ends.

**A new agent every round.** The same agent carries what it read last round and stops being cold.

**Reaching the cap is not a pass.** List what is still standing and say the cap was reached.

**A round that does not reduce the in-scope count stops the loop.** The fixes are producing new
defects, and another round will not settle it.

## The criteria

Eight, each with a mechanical test, in [`criteria.md`](./references/criteria.md). A test is what
keeps a criterion out of the realm of taste — and a criterion nobody can test is what lets a
defect through.

| | |
| :-- | :-- |
| 1 | Every word and reference resolves to exactly one thing |
| 2 | Every sentence has an actor |
| 3 | One claim per sentence, ordered conclusion or instruction, then reason, then contrast |
| 4 | Only vocabulary the reader holds by that point. Introduce a term at its first use, or drop it |
| 5 | The language's own words, not the traces of a translation. Concrete acts and objects, not abstract nouns |
| 6 | One concept, one word — across the whole document set, not one file |
| 7 | Items in parallel take the same form |
| 8 | The criteria apply outside the body text too — headings, table headers, lead-ins, annotations inside fenced blocks |

**A stall that fits none of them is reported as a gap in the criteria**, never fixed on instinct.

## Voice

A document being repaired has a voice already, and repairs must not change it. Extract it before
writing, and check the result with the seam test:
[`style-probe.md`](./references/style-probe.md).

**The criteria beat the voice.** Where an existing document violates a criterion, that is the
document's defect and not a house style to carry forward.

## Out of scope

- **Rewriting a message for a different reader** belongs to the `hos-explain` skill. That one
  throws the structure away and rebuilds it for a reader with no technical background. This one
  changes neither the structure nor the reader
- **Which language a document is written in**, and the notation for class members, belong to the
  documentation convention (`hoc-documentation`)
- **A README's section structure** belongs to the `hoc-readme` skill. This one works on the
  sentences inside those sections
- **Writing a document that does not exist yet** belongs to whichever skill owns that document —
  a requirement definition, a runbook, a manual. This one only repairs what is already there
- **Filling a missing fact.** Where the cold read stalls on something another document owns,
  report it. Inventing the fact makes this skill an author

## Detail files

- [cold-read.md](./references/cold-read.md) — running a cold read, the severity classes, the threshold, the loop
- [criteria.md](./references/criteria.md) — the eight criteria, each with its test and one example
- [style-probe.md](./references/style-probe.md) — extracting the voice, and the seam test
- [correspondence.md](./references/correspondence.md) — comparing language versions, the fan-out, structural requests
