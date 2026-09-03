# Cold read

How to get a report of where a reader stalls, and how the loop around it terminates.
Referenced from `SKILL.md`.

## Why it comes first

**A document's defects are invisible to whoever wrote it.** Rereading supplies the missing
subject from memory, resolves the pronoun against knowledge the text never carried, and skips
the term that was never introduced. Every reread confirms the document, and none of them reads
it.

A criteria pass by the author has the same blind spot. Scanning for "sentences with no actor"
finds the ones the author already suspects, in the passages the author already doubts.

So the report comes from a reader who holds nothing:

```
cold read  ->  where it stalled  ->  classify against the criteria  ->  fix
```

**Measured on one document repaired over ten rounds of author review:** the cold read then found
three defects none of those rounds had raised — a run of three passive sentences with no actor
anywhere in them, one stage name that meant nothing to a first reader, and a command the
document never said where to type.

## Running one

**One fresh agent per round.** An agent that read the previous version knows what the sentences
were meant to say, which is the state this whole procedure exists to avoid.

Give it four constraints:

| Constraint | Why |
| :-- | :-- |
| **Read the target file and nothing else** | A sibling document supplies the missing definition, and the reader stops being cold |
| **No search, no grep** | Same reason. Searching is reading the rest of the repository |
| **Report where you stalled, with the line and the quote** | A count is not a report, and a stall nobody can locate is a stall nobody fixes |
| **Propose no fixes** | A proposal costs the agent a second pass and biases the classification toward whatever it happened to suggest |

Ask for five kinds, and say that more is better than fewer:

```
1. passages whose meaning you could not get at all
2. passages you could read two ways, without being able to choose
3. terms and concepts that arrive with no explanation
4. references — this, that, it — whose target you could not settle
5. sentences where you could not tell who or what performs the action
```

**Ask for what had to be supplied, too.** A passage the reader worked out by filling a gap is a
finding: the gap is in the document, and the next reader may fill it differently.

**Do not ask it to be kind.** Praise costs a round and settles nothing.

## Severity

**Decided by what the reader could not do — never by how the writer feels about the sentence.**

| Class | Test | Counted |
| :-- | :-- | :-- |
| `critical` | The reader cannot carry out the document's own instruction | yes |
| `major` | The meaning cannot be settled, or settles two ways | yes |
| `minor` | The reader got there, but had to supply something | yes |
| `out-of-scope` | The missing fact belongs to another document | **no** |

**`out-of-scope` is what makes the loop terminable.** A cold reader legitimately asks what the
product is, why a step exists, what a directory is for. Those are gaps in a document set, not in
this document. Report them, name the document that should hold each, and leave them out of the
count.

**Nothing else is exempt.** A stall the author considers unreasonable is still a stall; the
reader is the measurement.

## The threshold

| | `critical` | `major` | `minor` |
| :-- | :-- | :-- | :-- |
| Default | 0 | 0 | characters ÷ 1000, rounded up |
| `strict` | 0 | 0 | **0** |

**`critical` and `major` do not scale with length.** A long document does not earn one sentence
whose meaning cannot be settled.

**`minor` scales, because a longer document has more places to supply something.** Count
characters over the target file, not over the family.

## The cap

`rounds:` bounds the loop per language, default 3.

- **Reaching the cap is reported as reaching the cap.** List every finding still standing, with
  its class. A verdict that reads like a pass, over a document that never met the threshold, is
  the one outcome this loop must not produce
- **A round whose in-scope count did not fall stops the loop.** The repairs are introducing
  defects as fast as they remove them, and another round spends a full read to learn that again
- **A count that rises is the same stop**, reported as a regression, naming the round that
  introduced it

## What a round does with the report

```
1. classify   every finding: severity, and in scope or out
2. map        every in-scope finding to the criterion it violates
3. report     any finding that maps to no criterion, as a gap in the criteria
4. fix        inside the existing chapters and item counts only
5. carry      anything needing a structural change to the correspondence stage
```

**Step 2 before step 4.** A fix made straight off a stall repairs that sentence and leaves its
twenty siblings, because nothing generalized it. The criterion is what generalizes it.

**Step 3 is not a formality.** Eight criteria do not cover every way prose fails. A stall that
maps to none of them is either a missing criterion or a fact for another document, and both are
reported rather than patched over.

**Where the reader restated the passage, take their wording.** A reader who can paraphrase what a
sentence was trying to say has already written the clearer version, and the paraphrase is
evidence of what the original failed to carry.
