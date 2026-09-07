# Style probe

Extracting a document's voice before writing into it, and checking afterwards that the writing
cannot be told apart. Referenced from `SKILL.md`.

## Why it is extracted rather than assumed

**A repair is writing into somebody else's document.** The criteria say what the sentence has to
carry; they say nothing about how this document sounds. Written without that, a corrected passage
lands in the right place and reads as an insertion.

So the voice is read off the document first, and written down before anything is written into it.

**Extract before repairing, not only before adding.** A repair rewords sentences, and reworded
sentences are where the voice slips.

## What to extract

Read the target, its language siblings, and the other documents in the same directory. Write the
answers down — an extraction that stays in the reader's head is one nobody can check the result
against.

| | What to settle |
| :-- | :-- |
| Register | Plain or polite form, and whether it is consistent |
| Bold | What it marks — the imperative, the term, the topic — and roughly how much per section |
| Headings | How deep they go, whether they are numbered, whether they are sentences or labels |
| Tables | When this document reaches for a table instead of prose |
| Punctuation | Dash and bracket forms, and full-width against half-width |
| Sentence length | The range the document actually sits in |
| The reader | Whether the document addresses them directly, and as what |
| Vocabulary | What this set calls each concept |
| Language family | Which versions exist, and what is held aligned across them |

**Nine rows, and the last two reach outside the file.** Vocabulary and alignment are properties
of the set, and a document repaired against its own contents alone drifts away from its siblings.

## The seam test

**Mix the sentences you wrote into the ones that were already there, and see whether anybody can
pick yours out.** If they can, the voice does not match.

```
1. take the passages this run wrote or reworded
2. interleave them with untouched passages from the same document
3. ask which ones are new
```

**Run it on the passages, not on the diff.** A diff announces what changed; the test only works
on text stripped of that.

**A seam is not always in the wording.** Bold arriving three times in a paragraph where the
document uses it twice a section is a seam. So is a table in a document that argues in prose.

## The criteria beat the voice

**Where the extracted voice and a criterion disagree, the criterion wins.**

A document written entirely in passives has a habit, not a house style. Carrying it forward would
make the extraction a way of reproducing defects, and every later run would report the same
stalls and repair them into the same shape.

| The document does this | Treatment |
| :-- | :-- |
| Uses a form the criteria forbid | **The document's defect.** Repair it, and do not carry it into new text |
| Uses a form the criteria say nothing about | **The voice.** Match it |

**Say which of the two a decision was.** A run that quietly changed the register, and a run that
quietly kept a defect, look identical from outside: both produced a document whose voice moved.
