# Transcript (locating and harvesting)

How to find the conversation's own record and pull the passages worth keeping from it.
Referenced from `SKILL.md`.

## Where the record is

The agent writes each session as JSON Lines, one object per line, under a directory named
after the working directory it was launched in:

```
~/.claude/projects/<working-directory-slug>/<session-id>.jsonl
```

The slug is the absolute path of that folder with its separators replaced by hyphens, so a
session started in `/Users/someone/work/alpha` lands under
`-Users-someone-work-alpha`. One directory holds every session ever run there, and their
sizes differ by orders of magnitude — a directory of four sessions can hold one of 10 MB
and three under 1 MB.

**Read the file. Do not rely on what is still in context.** A long thread has been
compacted, and the summary that replaced it keeps conclusions while dropping the exchanges
that produced them. The corrections are in the exchanges.

## A resumed conversation spans more than one file

Resuming an earlier session **opens a new transcript rather than appending to the old one.**
The conversation continues; the file does not. So the current session's transcript holds
only what happened after the resume, and the material a run is looking for may be almost
entirely in a predecessor.

Measured on a conversation continued across two sessions: 13.8 MB in the first file, 3.5 MB
in the second, seven compactions between them. Reading only the current file would have
missed four fifths of the material — including every measurement the run was harvesting.

**The predecessor names itself inside the current transcript.** A resume injects a summary
of the session it continues, and that summary carries the earlier file's absolute path.
Find it, then repeat for the file it names: a conversation resumed twice has two
predecessors, and the chain ends at a transcript that summarises nothing.

- **A path taken from a summary is a predecessor, not the current session.** Reading it
  because a summary handed it over, without establishing which file is being written to
  now, puts the run one session behind and it stays there for every later run. The current
  session's file is the one still growing; modification time settles it.
- Report every file located and its size, so the caller sees the span the run covers rather
  than assuming it is one conversation in one file.
- Ordering matters when reading: the predecessors hold the earlier exchanges. A passage's
  position is its position within the chain, not within whichever file it sits in.

## What a line is

Each line is an object with a `type`. Only three carry material:

| `type` | What it is |
| :-- | :-- |
| `user` | Either a turn the person typed, or the result of a tool call |
| `assistant` | Text, tool calls, or both |
| `attachment` | Injected context — reminders, file contents, notices |

The rest are bookkeeping: modes, titles, cost, file-history snapshots. Ignore them.

## Telling a person's turn from a tool result

Both arrive as `type: "user"`, and separating them is the one thing the harvest cannot
work without. **The instructions and the corrections are in the person's turns; a search
that cannot exclude tool results is searching a haystack of command output.**

The shape of `message.content` decides it:

| `message.content` | What it is |
| :-- | :-- |
| A string | A turn the person typed |
| A list holding a `tool_result` block | A tool result |
| A list of `text` blocks only | A turn the person typed |

In one measured session of 6,371 lines these came out as 257 strings and 14 text-only
lists against 927 tool results — the person's turns were under a quarter of the records
that share their type. An assistant record's `content` is a list too, holding `text` and
`tool_use` blocks; `tool_use` carries the tool's `name` and its arguments, which is where
"what did this passage touch" comes from.

Report the counts at phase 1. They tell the caller the size of what is about to be read.

## What to harvest

Not the procedure. **The procedure is in the diff; what is not in the diff is why the
procedure is that way.**

The facts worth keeping share one shape:

```
a turn of the person's contains a correction
  → a command runs to settle it
    → its output changes the conclusion
```

Every fact worth keeping out of one long measured thread had that shape, and none of them
could be read back off the code that shipped:

- a subcommand's `--dry-run` wrote the file it claimed it would only describe
- a config writer tightened the spacing of the lines it was not asked to touch
- an install from a lockfile ignored the quarantine that a fresh resolution obeys
- a peer dependency constrained a direct consumer and nobody underneath one

So the search is for that sequence, not for keywords. Look for a person's turn that
pushes back — a question about why something was done, a statement that a rule was
broken, a flat contradiction — and then read forward for the command that settled it and
the output that decided the matter.

A passage where the assistant was corrected and simply complied is worth less: nothing was
measured, so nothing was established beyond a preference already written down elsewhere.

## Which position the passage established

**In a passage that turns on a correction, the fact is the position that came out of it, not
the one that went in.** The assistant argues for an order, a person pushes back with a reason,
the argument is dropped — what that passage established is the person's order. The assistant's
was refuted by the very exchange being read.

This is easy to get backwards, because the refuted position is the one stated at length. It
arrives with its reasoning laid out and sometimes with a measurement beside it, while the
correction that overturned it can be a single line. **Length is not standing.**

A measurement is no protection either. One can be real, repeatable, and still support nothing,
because the pushback showed it was measuring the wrong thing: a command was found to fail at a
midpoint, and the reply was that nobody runs that command there. The number was true and the
conclusion drawn from it was not.

So read to the end of a passage before writing its claim down, and ask which side the exchange
finished on. Sometimes it finishes on the assistant's — a person asks why, gets an answer, and
agrees — and then that is the fact. Where it does not, recording it anyway puts a refuted claim
into a convention with the skill's authority behind it, and the reader has no way to tell.

## Grouping passages into subjects

Read no further into a passage than its subject requires. The files a passage touched and
the words of the correction are enough, and keeping this phase shallow is what lets it run
before the reading in phase 3.

Two signals separate subjects reliably:

- **The artefacts.** Passages about test files, about commit structure and about a package
  manager's behaviour do not overlap in what they touched.
- **The vocabulary of the correction.** A person correcting test structure and a person
  correcting commit granularity do not use the same words.

Where a subject's passages are spread across the thread rather than adjacent, that is
normal — a subject is a set of passages, not a range of lines.
