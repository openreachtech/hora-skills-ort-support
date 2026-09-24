---
name: hos-skillify
description: "Build a skill out of the conversation you are in: mine its transcript, decide what is durable convention, then write it and run the repository's own audit. Use when a thread has settled something worth keeping — as a new skill, or as an addition to one that already exists. Produces skills only: material that turns out not to be a convention is reported and dropped. Naming, `description:` and file layout belong to the skill-updating convention, not here."
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

- **A run ends at a skill written and audited**, never at material handed over ready to
  be written. What it does not settle is naming, `description:`, directory layout and
  self-containment: those belong to the skill-updating convention, and a run applies
  them. **The delegation is of decisions, never of the work.**
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

**What separates an option from the topic is its shape, never its position.** The arguments
arrive as one string, and it is this skill that divides them: a token opening with one of the
keys above and a colon is that option, the bare word `dry` is that flag, and **everything else
is the topic**, joined in the order it appeared. A topic holding spaces therefore needs no
quoting, and **quoting it is worse than leaving it bare** — nothing here strips a quote mark, so
it would be harvested as part of the subject.

Two topics cannot be written at all, and a caller meets them by surprise rather than by an
error:

- **A topic holding a colon.** Everything up to it reads as a key, and an unknown key is not an
  error — the run simply mines for a subject that lost its first words. Write the clause without
  the colon
- **A topic holding the standalone word `dry`.** The run reports and writes nothing, which looks
  like a decision somebody made. Reword it, or drop the topic and let the subject gate ask

**A key given twice is a question, never a resolution.** Neither answer is safe to take on the
caller's behalf: taking the last drops a target they named, and taking both breaks the one-skill
bound the whole run is sized against. Stop, show what the two would each cost, and let them pick —
the other one is a second run, which is what the bound is for.

- **`skill:` is where this bites**, because the bound counts skills. Two of them are two runs, and
  a run cannot quietly become one of them
- **A second `dir:` or `path:` stops for the same reason.** They point at where the writing lands,
  and a run that guessed which one was meant writes into a repository nobody chose

**A deliberate `dry` is worth stating twice** — once as the flag and once in the report — so that
a run which wrote nothing never leaves the caller wondering whether it was asked to.

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

**The cost is paid per skill, not per subject**, which is why several subjects landing in one
skill ride together. The bound counts skills because that is what the reading counts; a run
carrying three subjects into one skill reads it once, and a run carrying one subject into each
of three skills reads three.

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

**A repository holding no skills at all is reported before the table, never inside it.** `Blank
for none` answers a question about the subject, and where the surveyed repository is not one that
holds skills it answers nothing — every row comes back blank, and a column of blanks reads as a
harvest of new skills rather than as a search run in the wrong place. Say that the repository
holds none, and that `dir:` therefore has to be supplied, before any row is shown.

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

**The survey does not stop at the trunk.** A library is worked on by more than one session,
and each leaves its work on a branch of its own rather than on the release trunk. So a
skill's current state is not what `release/x.x.x` holds — it is that, plus what every
branch cut from the trunk has already written into it, plus whatever the working tree
holds uncommitted. Surveying the trunk alone reads a version that nobody is going to
merge into.

**Fetch before enumerating.** `refs/heads` is what this machine holds and `refs/remotes` is
what it last heard, and neither is what the repository now has: a branch another session
pushed is invisible until it is fetched, and a branch already merged and deleted keeps its
remote-tracking ref until it is pruned. Unfetched, the enumeration comes back one branch
short and one branch long at once — and the short one is the one that gets overwritten.

Then enumerate, and read what each branch holds for the target:

```sh
git fetch origin --prune

git for-each-ref --format='%(refname:short)' refs/heads refs/remotes/origin |
  while read -r branch; do
    git merge-base --is-ancestor <trunk> "$branch" && echo "$branch"
  done

git diff <trunk>..<branch> -- <the target skill's directory>

git status --short
git diff -- <the target skill's directory>
```

Three things follow from what comes back, and none of them can be reached from the trunk:

- **A fact a pending branch already carries is `covered`, not `new`.** Written from the
  trunk's reading it becomes a second statement of one rule, which is the outcome
  [classification.md](./references/classification.md) rates worst.
- **A sharpening is aimed at wording that may no longer be there.** The sentence the row
  proposes to replace can have been rewritten on a pending branch already, and the
  replacement then lands on text that the merge will not contain.
- **A branch already holding work on the target is where this run's work goes**, unless
  there is a reason to keep them apart. Two branches editing one file merge by hand, and
  the reason has to be worth that.

**Reading the branches is also what keeps the write from erasing them.** Measured: a
branch carried six commits on one skill, and the run was about to write the file whole —
comparing the section sets is what caught it. How a change is carried onto a branch that
already holds work belongs to the branch convention.

**The gate here fires only when the subject is not determined.** It fires when no `<topic>`
was given and the thread holds several subjects, when a `<topic>` matches more than one,
and when it matches nothing at all. A short thread about one subject, or a `<topic>` that
resolves cleanly, goes straight to phase 5.

What it shows, one row per subject:

| Column | Where it comes from |
| :-- | :-- |
| # | A number, counted from one |
| Subject | The files touched and the words of the correction |
| Passages | Counted in this phase |
| Touched | The arguments of the tool calls |
| Existing skill | The survey: the skill's name and the library holding it. Blank for none, `not surveyed` when out of range |
| Proposal | New, addition, or thin |

**The library goes in that cell beside the name.** `dir:` is answered from this column, and a
skill's prefix has to match the library that holds it — so a bare name lets a caller read the
right skill and name the wrong repository. Measured: two subjects whose target carried the
foundational library's prefix were answered with the support library's path, and nothing but the
survey that followed caught it.

**The caller picks one skill's worth — one subject, or several that land in the same skill.**
Whether a fact is worth keeping is phase 5's question, and asking it twice wastes the reading
that phase 3 has not done yet.
Mark a subject with one weak passage as `thin`, and say whether it is better dropped or
folded into another.

**A `thin` verdict counts passages; it does not report what they establish.** This phase is
deliberately too shallow to judge that — the artefacts and the words of the correction, and no
further — so `thin` is a count with a guess attached to it. **The caller overrides it without
owing an argument.**

**Measured across three runs, `thin` has been wrong every time it has been used.** One subject was
marked on a misreading of how its exchange had closed, and produced two rows. Two were marked
because no skill seemed to hold them; one produced four rows across two skills, the other eleven.

**The third was given after this paragraph already ruled it out**, which is what settles that
words are not the remedy. So the verdict is withheld rather than argued against: **`thin` may
only be given where the skill it would go into is named in the same row.** A subject whose home
is unknown cannot carry it, because the judgement being made is about material and the thing
actually unknown is the destination.

**The second is the failure the column invites.** `New`, `addition` and `thin` sit in one cell
while answering two different questions: the first two say which skill, the third says how much
material. A subject with no obvious home is not thin, and a subject with one weak passage can have
an obvious home. **Where a subject looks homeless, leave `Existing skill` blank and leave
`Proposal` alone** — which skill it belongs to is settled at the sift, with the reading this phase
has not done.

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

**A claim is read against its own basis before it goes any further.** The claim is written after
the passage has been read, and it can come out saying more than the passage showed — not because
the wrong side of an exchange won, which the harvest already guards against, but because the
sentence generalised past the evidence standing beside it.

Measured: a row read *an authentication failure names the address, not the credential*, while the
exchange it came from had no credential at hand at all. The failure was exactly what it announced
itself to be; what had been wrong was the conclusion drawn next to it. The row passed this phase
and the sift, and was caught at the gate only because the caller asked something else about it.

So hold the two against each other: **does the basis, on its own, oblige the claim?** Where it
obliges something narrower, the narrower thing is the fact. The gate sets them in adjacent cells
for this reason, and that is the last place the gap can be seen.

When adding to an existing skill, classify every fact against what that skill already
says — **the trunk's version together with what the pending branches add to it**, as the
survey read it. The relations, and why the target has to be read in full to tell them
apart, are in [classification.md](./references/classification.md).

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

**A subject with no home is more often framed wrongly than homeless.** Before concluding that no
skill holds it and none should, say what it is about a second time, at the altitude a skill name
would sit at. Measured: a subject framed as how a proposal is made had no home anywhere in either
library — one convention covered code and the other covered a workflow, and neither covered
judgement. Framed instead as when a third-party tool may be brought in, it had a place beside the
dependency conventions, took a name that passed the naming test, and carried **every rule the
first framing had** plus the ones the reframing invited.

- **The rules do not change; the subject they sit under does.** Where a reframing would drop or
  alter a rule, it is a different subject rather than a better name for this one.
- **A framing that names behaviour rather than a practice is the usual cause.** *How a proposal is
  made* describes what somebody does; *when a tool may be adopted* names the decision being
  settled, which is what a skill is for.

The second and third kinds are worth writing down somewhere. Not here, and not by this
skill: report them at the gate as material for a document or a note, and let the caller
take them elsewhere.

### 5. Gate

This stop always happens. It carries the outline and, for a new skill, the name.

The outline is **a table, not prose.** Reviewing prose is expensive, and the argument is
never about the wording — it is about which facts survive.

**A table the caller has to point at carries an identifier, and both of these are pointed at.**
A row is answered with its number, so a caller who has to quote the subject back in order to name
it is being charged for the table's own omission — and the quote is the place a selection goes
wrong, because two rows of one harvest often differ by a few words. Numbering elsewhere is a
default worth refusing; here it is what the table is for.

| # | Claim | Basis | Kind | Source | Verdict |
| :-- | :-- | :-- | :-- | :-- | :-- |
| A number, counted from one | A one-line statement of the rule | The evidence itself | Measurement or decision | Where in the thread | New, sharpens, exception, contradicts, covered, or dropped |

**`Basis` carries the evidence, not an account of it.** A cell reporting that a decision was
made, or that a command was run, asks the caller to approve a rule on the strength of a summary
written by the party that wants it approved. What goes in the cell is the words that settled it,
or the command and what it printed.

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

**The text reaches the file as a file, never as a string some other syntax reads first.** A skill
body is full of backticks and dollar signs, and each is a substitution in two places on the way
in. A shell reads a backtick pair as a command, runs it, and puts its **output** where the pair
stood — so a fenced block passed inside a quoted argument is executed and replaced by whatever it
printed, which is usually nothing at all. A replacement string in a substitution reads the same
characters as references to the surrounding match, and puts the matched text, or everything
before it, where they stood.

Measured twice, on one passage: passed through a quoted shell argument, a fenced block came out
of the commit as a single blank line, and the command written inside it had been run on the way;
passed as a replacement string, the same passage inserted the whole of the file that preceded it.
Neither failure announced itself — both produced a file, a commit, and a clean audit.

Put the passage in a quoted heredoc, or in a file the writer reads, and **pass the replacement as
a function rather than as a string** — a function's return value is taken verbatim, where a
replacement string is read for its own references first. Nothing between the passage and the file
may interpret it.

**The anchor is confirmed to occur exactly once before anything is spliced.** A splice names a
passage of the target and puts the new text beside it, so an anchor matching nothing writes into
a file that has moved underneath the run, and one matching twice writes beside whichever came
first. Count the occurrences, and refuse anything but one.

Measured: the count refused two splices, both because the anchor had been copied with a
typographic quotation mark where the file carries an upright one — and both refusals came before
the file was touched.

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

**That check does not read the text.** It answers whether the skill sits where it should and
declares the name it should, and a body that lost a paragraph on the way in passes it untouched.
Measured: a commit whose fenced block had been eaten before it reached the file passed both the
repository's audit and its linter.

So read back what was written, against what was meant to be written, before the commit stands.
Where the writing spliced into an existing file, the diff is what to read; where it appended, the
tail of the file is. Reading the line count alone is enough to catch the larger accidents.

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
