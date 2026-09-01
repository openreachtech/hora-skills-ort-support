---
name: hos-skillify
description: "Build a skill out of the conversation you are in: mine its transcript, decide what is durable convention, and hand the result to the skill-writing convention. Use when a thread has settled something worth keeping — as a new skill, or as an addition to one that already exists. Produces skills only: material that turns out not to be a convention is reported and dropped. Naming, `description:` and file layout belong to the skill-updating convention, not here."
---

# Skillify

A thread settles things that its diff cannot hold. A command that writes a file when its
own `--dry-run` said it would not, a formatter that reflows the lines around the one it
was asked to change, a peer dependency that constrains nobody once a package sits one
level down — each of these was learned by measuring, and none of them can be recovered
from the code that shipped. Neither can the decisions: that two language versions of one
document are a single commit, that the interface gets settled in a turn of its own before
anything is built. This skill takes such a thread and turns what it established into a
skill.

The material is the **transcript on disk**, not what remains in the conversation's
context. A long thread has been compacted, and the part that is gone is often the part
where the corrections happened.

- **Writing the skill is not this skill's work.** Naming, `description:`, directory
  layout and self-containment belong to the skill-updating convention. This one stops at
  handing over material that is ready to be written.
- **The output is a skill.** Nothing else. Material that turns out to be project state, or
  a record of some external package's behaviour, is reported at the gate and dropped —
  finding it a home is another tool's job, and a command named *skillify* that writes
  documents is lying about itself.

## Invocation

```
/hos-skillify [<topic>] [skill:<name>] [dir:<path>] [path:<subtree>] [dry]
```

| Argument | What it carries | Default |
| :-- | :-- | :-- |
| `<topic>` | What to mine for, as free text | The whole thread |
| `skill:` | Which skill to add to. A bare name, never a path | Create a new skill |
| `dir:` | Which repository holds it, relative to the folder the agent was launched in | That folder's repository |
| `path:` | Which subtree inside that repository | `kit/skills/` if the repository has one, else `.claude/skills/` |
| `dry` | Report the harvest and the outline, write nothing | Write |

The order above is for reading, not for parsing: a subject, then the thing it goes into,
then where that thing lives, then how the run behaves. **Accept the `key:value` arguments
in any order** — making the order a requirement buys nothing and fails a caller who
writes them the other way round.

**There is no argument for choosing a source.** Material from outside the conversation —
a chat log from elsewhere, a design document, someone's notes — arrives by being pasted
in, and a pasted block is part of the thread from that moment. An argument would only be
needed for a source too large to paste, and the first version does without it.

There is likewise no argument for producing something other than a skill: it would
contradict the name.

## One run, one skill

A run creates or updates exactly one skill. Where a thread holds more, the harvest gate
says so and the caller runs again for the rest.

This bound is what makes the rest affordable. Adding to an existing skill requires
reading that skill **in full** (see [classification.md](./references/classification.md)),
and reading several in one run multiplies a cost that is already the largest part of the
work.

To grow one skill across several runs: create it on the first run, then pass
`skill:<that name>` on the following ones.

## The run

| Phase | What happens | Stops |
| :-- | :-- | :-- |
| 1. Locate | Fix the transcript path and report its size | — |
| 2. Harvest | Pull candidate passages and group them into subjects | **When the subject is not determined, or `skill:` names nothing** |
| 3. Distil | Classify each fact and tie it to its evidence | — |
| 4. Sift | Drop what is not a convention. Decide new or addition | — |
| 5. Gate | Present the outline, and take the name for a new skill | **Always** |
| 6. Write | Write the rules, each carrying its shape and not its origin | — |
| 7. Verify | Run whatever audit the target repository carries | — |

Two words are used throughout and are not interchangeable. **Harvest** is what happens to
the transcript. **Survey** is what happens to the existing skills.

### 1. Locate

Find the transcript for the current session and report its line count, its size, and how
many turns in it are the user's own rather than tool output. The mechanics are in
[transcript.md](./references/transcript.md).

**A conversation resumed from an earlier session spans more than one transcript.** Resuming
opens a new file rather than appending to the old one, so the current session's file holds
only what has happened since — and the predecessor is usually the larger of the two. Locate
the predecessors too, and report each; how to find them is in
[transcript.md](./references/transcript.md).

**A path handed over by a compaction summary is a predecessor, not the current session.**
Taking it and going no further leaves the run one session behind, reading nothing that has
happened since the resume.

Report the numbers before going further. A caller who sees "271 turns of yours across
6,371 lines" knows the run is about to read a lot; a caller who sees eight knows the
opposite, and both should know which one they are in.

### 2. Harvest

Pull the passages worth keeping, then group them into subjects. What to look for, and why
that shape and not another, is in [transcript.md](./references/transcript.md).

**Separate the conversation's own exchanges from anything pasted into it.** They do not
carry the same weight and they do not read the same way: an exchange here has tool calls
and their output beside it, while a pasted chat log has speakers and no output at all, and
a pasted document has no dialogue whatever. Treating a line someone else typed elsewhere
as though a command had just proved it is the one mistake this phase can make on its own.

Grouping needs no close reading — the files a passage touched and the words of the
correction are enough to tell one subject from another, and that is what keeps this phase
cheap enough to run before anything expensive.

Then **survey** the existing skills: read the names under `kit/skills/*/` and
`.claude/skills/` in the target repository, so each subject can be marked as new work or
as work that belongs to a skill that already exists. A repository outside the one named by
`dir:` is not surveyed; where a subject plainly belongs to a domain that is not there, say
`not surveyed` rather than `none`.

**A `skill:` the survey does not find is a question, never a creation.** Stop and ask
whether to create it under that name, offering the closest names the target does hold.

The reason is not politeness. The likeliest cause of an absent target is a **typo**, and
creating on a typo does not merely waste the run — it puts a second skill claiming one
subject into the library, the outcome
[classification.md](./references/classification.md) rates worst, because the reader cannot
tell which of the two to follow and neither of them gets corrected.

**This question cannot wait for phase 5.** Whether the run creates or adds decides what
phase 3 does: in addition mode every fact is classified against the target, and in creation
mode every row comes out `new`. Ask right after the survey, before any of that reading is
spent.

**The gate here fires only when the subject is not determined.** It fires when no `<topic>`
was given and the thread holds several subjects, when a `<topic>` matches more than one,
and when it matches nothing at all. A short thread about one subject, or a `<topic>` that
resolves cleanly, goes straight to phase 5.

What it shows, one row per subject:

| Column | Where it comes from |
| :-- | :-- |
| Subject | The files touched and the words of the correction |
| Passages | Counted in this phase |
| Touched | The arguments of the tool calls |
| Existing skill | The survey. Blank for none, `not surveyed` when out of range |
| Proposal | New, addition, or thin |

**The caller picks one subject and nothing else.** Whether a fact is worth keeping is
phase 5's question, and asking it twice wastes the reading that phase 3 has not done yet.
Mark a subject with one weak passage as `thin`, and say whether it is better dropped or
folded into another.

Where the subjects are to be split rather than merged, say so with the reason. The reason
is not a matter of taste: a skill's prefix has to match the directory it sits in, so
subjects that fall in one domain **can** become one skill, and subjects spread across
domains **cannot** — there is no prefix that fits them. Offer "all of it as one skill"
only when the domain is single.

### 3. Distil

State each fact as one claim, tie it to what established it, and record where in the
thread it came from.

**What established it is one of three kinds**, and they are not a ranking:

| Kind | What it establishes | What it can overturn |
| :-- | :-- | :-- |
| Measurement | How something behaves | A claim about behaviour |
| Decision | How we will work | Another decision |
| Assertion | Nothing | — |

A measurement ran a command and read its output; anyone can run it again. A decision was
made by someone with standing over the matter, and recorded. **The two answer different
questions, which is why they rarely collide head-on** — how a lockfile install treats a
quarantine and how commits get split are not competing accounts of one thing.

Most of what a working thread establishes is decision, not measurement. A skill that
counted only measurements would throw nearly all of it away.

**An assertion is a statement that neither measured nor settled anything.** The test that
separates it from a decision: *did it close the matter, or was it one voice among
several?* A decision closes. In a pasted chat log, look at whether the thread went on
disputing it.

When adding to an existing skill, classify every fact against what that skill already
says. The five relations, and why the target has to be read in full to tell them apart,
are in [classification.md](./references/classification.md).

### 4. Sift

Keep what will still be true next month and drop the rest. Four kinds turn up and only
the first survives:

| Kind | Example shape | Verdict |
| :-- | :-- | :-- |
| A durable convention | How to split commits when one file holds two concerns | Keep |
| The state of a project | Which branch is waiting on which pull request | Drop |
| A record of some package's behaviour | Why a rule in a third-party plugin was deprecated | Drop |
| Anything that needs a person, a customer or an unpublished plan to be stated at all | "So-and-so prefers it written this way" | Drop |

The last of those is not a matter of scrubbing a name out. **A statement that cannot be
made without naming someone is not a general rule**, and no amount of redaction turns it
into one.

An assertion goes here too, by the previous phase's test.

**Dropping is not losing.** The transcript stays on disk and a run can be repeated, so an
assertion that later becomes a decision gets harvested then. Without that, a doubtful call
drifts towards keeping things "just in case", and the skill swells.

The second and third kinds are worth writing down somewhere. Not here, and not by this
skill: report them at the gate as material for a document or a note, and let the caller
take them elsewhere.

### 5. Gate

This stop always happens. It carries the outline and, for a new skill, the name.

The outline is **a table, not prose.** Reviewing prose is expensive, and the argument is
never about the wording — it is about which facts survive.

| Claim | Basis | Kind | Source | Verdict |
| :-- | :-- | :-- | :-- | :-- |
| A one-line statement of the rule | What established it | Measurement or decision | Where in the thread | New, sharpens, exception, contradicts, covered, or dropped |

The `Kind` column is not decoration. Approving a rule that rests on a decision is a
different act from approving one that rests on a measurement, and the person approving is
entitled to see which they are doing.

A row marked `contradicts` is not written until it is resolved. Resolving it is an
interview, not a veto — see [classification.md](./references/classification.md).

For a new skill, take the name here rather than in a turn of its own: the outline is what
tells you what to call it, and one stop is better than two. Show the domain the subject
implies, the names already in use in the target, and two or three candidates with the
reason for each. The rules the name has to satisfy belong to the skill-updating
convention.

**A skill bound for the library carries its prefix from the moment it is created.**
Renaming is a breaking change, and adding the prefix later is choosing to inflict one.
Tooling that belongs to a single repository and is never published carries no prefix at
all; which of the two this is gets decided here, because the prefix names the domain and
the domain names the repository.

### 6. Write

**A rule carries its shape, not where it was measured.** By this phase the facts are
already general — anything that needed a person, a customer or an unpublished plan to be
stated was dropped at the sift. What remains is to write the evidence the same way: the
shape of what happened, without the file paths, repository names and command output it
happened in. The library repositories are published to a registry, and a skill that quotes
its origin verbatim is not one.

Skills are written in English. A thread in another language is translated here, not
transcribed.

Then hand over. The skill-updating convention decides the file layout, the shape of
`description:`, and whether a section belongs in `SKILL.md` or under `references/`.

Adding to an existing skill may **rewrite** what is there, not only append to it. A fact
that sharpens a vague rule replaces its wording; a fact that carves out an exception adds
a clause to it; a contradiction resolved in the new fact's favour revises it. Only `new`
appends.

### 7. Verify

Run whatever check the target repository carries for its own skills — the library
repositories keep one as repository-local tooling. Where there is none, at least confirm
that `name:` matches the folder name and that the frontmatter parses, since both are
conditions the skill-updating convention states and neither survives being wrong.

## Adding material after a run

The outline is often what reveals that something is missing. The loop for that is to end
the run, paste what was missing, and run again — pasted text is part of the thread, so the
next run picks it up with no further ceremony.

Three rules make the loop safe:

- **The gate takes a selection or an approval, and nothing else.** Any other input ends the
  run without writing, and says to paste the missing material and run again. A paste is not
  an answer to the gate, and guessing that it might be is how an unintended write happens.
- **A run can be ended up to the gate, never during the write.** Stopping mid-write leaves
  a half-written file. Nothing is lost by this restriction: the moment a caller discovers
  the gap is the moment the outline is in front of them.
- **On a re-run, rows whose source has not changed come back with the same wording and the
  same verdict.** Only what the new material added is presented as new. The previous
  outline is in the thread, so it can be read; without this rule a caller who has just
  vetted twelve rows has to vet them all over again to find the two that changed.

**A run only ever reads the current session's transcript**, so a subject harvested here
cannot come back in a different conversation — a different conversation holds different
material. To continue a harvest later, resume the session rather than starting a new one:
resuming restores the conversation, and phase 1 follows the chain of transcripts back
through it. **Do not keep a record of what has been harvested.** The transcript is that
record, and a log beside it would be a less reliable copy of something already on disk.

A re-run repeats the harvest, and in addition mode it repeats the full read of the target
skill. That cost is the machine's, not the caller's, who only has to look at what is new.
Carrying the previous reading forward would avoid it and is not worth the machinery in a
first version.
