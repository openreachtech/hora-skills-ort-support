---
name: hos-gh-pull-request
description: "Write a pull request for this organization and open it — a title carrying the linked issue's type emoji, and a body of `# Why` carrying the issue it closes, `# How` carrying the approach taken, and `# Note` where something has to be watched — shown in full first, then opened with `gh pr create --draft` once you say so, and handed over as text alone where `gh` is missing or logged out. It states how the work was carried out; where things stood and which direction to take belongs to the issue. Covers the merge-only line a pull request that merges a trunk turns on. Use whenever a pull request body or title is asked for. Issue bodies, commit messages and branch names are not this skill's."
---

# GitHub pull request

**A pull request is read once, at merge, by somebody who already has the diff, the commit list,
the CI result and the linked issue in front of them.** So it does not narrate the change. It
carries the one thing none of those hold: **the approach that was taken.**

That is why it is three sections against the issue's five. The asymmetry is deliberate — an issue
is read before the work, with nothing else to look at.

**The `gh` in the name is GitHub.** It marks a skill that reaches the host rather than stopping
at the text it wrote; `hos-gh-issue` is the other one carrying it.

**How any of it is set down belongs to `hos-gh-notation`** — the form a table, a heading, a name
and a cross-reference take, and the language the body is written in. That convention is read
alongside this one, and this one does not restate it.

## What it holds

| Section | What goes in it | Written |
| :-- | :-- | :-- |
| `# Why` | `* Close #<issue>`, and nothing else | always |
| `# How` | The approach the work took | always |
| `# Note` | What has to be watched — follow-up left undone, a side effect, an ordering dependency | **only when there is something** |

## `# Why` is a link, not an explanation

```markdown
# Why

* Close #123
```

**The bullet is not decoration.** GitHub expands a list item holding nothing but an issue
reference into that issue's title and its state, so `* Close #123` arrives saying what #123 is
about, where a bare `Close #123` arrives as a bare number. The marker is what buys the expansion,
and dropping it costs the reader the one line that would have told them what they are merging.

**Do not restate the issue.** It says where things stood and which direction to take, and it is one
click away. A pull request that repeats it creates a second copy that will disagree with the first
the moment either is edited.

**`# Why` names exactly one issue, always.** A pull request is opened for one reason, and the
issue is that reason written down. Where the work arrives as several pieces at once, what the
pull request closes is the issue those pieces sit under — the hub — and never the children
beside it.

- **Several `Close` lines say the pull request had several reasons**, which is what one reason
  rules out. A reader meeting three of them has to work out which the pull request was for, and
  the answer is that it was for none of them on its own.
- **The children are reached through the hub**, whose sub-issue panel already lists them.
  Repeating them here is the restatement above by another route, and it goes stale the moment a
  child is added or dropped.

**The only issue the body links is the one it closes.** Naming another puts a cross-reference to
this pull request into that issue, so an issue mentioned in passing — as background, as a
neighbour, as something the work touched on the way — arrives in that issue beside the pull
request that closes it, and which one closed it stops being readable from there.

**`Close #<issue>` is what ties them**, and the tie is what the line is written for. Whether the
host closes the issue off the back of it is the host's, and which merges it acts on is not fixed
— so look at the issue once the pull request has landed, and close it by hand where it is still
open.

## `# How` is the approach, not the diff

**Write what a reader cannot get from what is already on the screen.** The diff shows what changed,
the commit subjects show the order it was built in, and CI shows whether it passes. What none of
them shows is why the work took this shape rather than another.

| Belongs in `# How` | Does not |
| :-- | :-- |
| The approach chosen, and the one rejected | A list of the files touched |
| A constraint that forced the shape | A restatement of the commit subjects |
| Something done differently from what the issue asked for | Whether the tests pass — CI says so |

**Completion is not reported here.** Whether the work is finished lives in the issue's
`# Checklist`, as checkboxes. Reporting it in the pull request as well puts the same state in two
places.

## `# How` and the `# Checklist` divide the same way

**Which sections take an H2, and when, belongs to `hos-gh-notation`.** One test is this skill's
own, because it needs the linked issue as well as the body.

**`# How` and the linked issue's `# Checklist` divide the same way.** The work divides one way, so
the boxes that record it and the approach that carried it out divide alike. Where the two sets of
H2s do not correspond, one of the two divisions is wrong. `# How` carries no H2 for a box it has
nothing to say about — it holds the approach, not what was done — and the ones that do answer a
box are that box's.

**An H2 about how the work was carried out answers no box.** A `# Checklist` never records the
branch structure, the order the sub-branches landed in, or what was dropped rather than written,
because an issue says where things stand and which direction to take and leaves the carrying-out
to this artefact. So the test is read against the headings that answer boxes, and a heading about
the carrying-out is not a disagreement with anything. **Whether such a heading is worth writing at
all is the question the section above settles.**

**Where two box-answering divisions disagree, the checklist is the one to suspect.** `# How` is
written after the work, so a heading there is evidence that the work under it was carried out —
and a box that was never written is the likelier omission of the two. The reverse needs no rule: a
box `# How` says nothing about is already allowed.

**`hos-gh-issue` states the same test from the issue's side**, where the two sections held against
each other are `# As-is` and `# Checklist`.

**And the units of the change never supply the subjects.** One heading per rule added, per file
touched, per commit made is the change's own table of contents, and the reader already holds it —
the diff lists the files and the commit subjects list the order. What replaces it is the reason the
points fall together: what the approach rests on, what it hands to another convention, what it
deliberately left alone.

## `# Note` is for what has to be watched

Follow-up deliberately left for later, a side effect somebody will meet, an ordering dependency on
another pull request. **It is left out entirely when there is none** — an empty heading costs the
reader a stop and says nothing.

**A note is about this pull request's own content, and nothing else.** What belongs is what the
reader cannot take from the diff in front of them — above all what the work deliberately did not
do, where the diff on its own would read as an oversight. A test case simplified rather than
written out in full is one shape of it, and a `## TODO` section naming what the change leaves for
later is another. The reader meets the gap, and the line is what tells them it was chosen.

**What holds for every pull request is not a note.** How the host behaves on a merge, what a
keyword does when one lands, which steps somebody takes afterwards — whoever merges pull requests
brings that with them, and a body restating it spends the reader's one stop on something this
change does not contain.

**What the reader already has is not a note.** The heading is read for what nothing else in front
of them supplies, so a line the linked issue, the title or the diff has already delivered spends
the stop and gives nothing back for it. The linked issue is the usual source — it holds where
things stand and which direction to take, and a note restating either of those puts one sentence
in two places, leaving a reader to work out whether the difference between them was meant.

**The two paragraphs above are the shapes this takes most often**, and the test behind all three
is the same: strike the line out, and ask what the reader would then not know. Where the answer is
nothing, it was struck out for good.

It exists so that `# How` stays the approach. A caveat mixed into the approach is read as part of
it.

## What the notation convention is read for here

**How anything in the body is set down belongs to `hos-gh-notation`.** Two of its rules land
differently on a pull request.

**A pull request is read at merge with the diff already open.** That is who the backticks are for:
a name set in prose is one the reader has to find twice, once in the sentence and once in the
files beside it.

**The title carries them as well.** It is what survives the merge commit, and a raise nobody can
read a version out of says only that something moved.

```
Bad   🛡️ Raise @humanfs/node to 0.16.8 and pin it through an override
Good  🛡️ Raise `@humanfs/node` to `0.16.8` and pin it through an override
```

## Merging a trunk

**A pull request that merges a trunk** — a `release/x.x.x`, a `dev`, an `env` — into another
branch carries one line the others do not:

```markdown
* All commits have already been reviewed, merge only
```

The commits arriving through it were reviewed in the pull requests that fed that trunk, so this
one asks for a merge rather than a review.

**Every other pull request leaves the line out** — out, not commented out. A body handed over
with the line wrapped in `<!-- -->` says nothing to whoever pastes it, and costs the next reader
a stop working out whether it was meant to be turned on. Where a repository's own template ships
it commented, delete it before handing the body back.

Which branches are trunks, and which are sub-branches, is settled by the branch convention
(`hoc-git-branch`).

## The title

**The title opens with the type's emoji**, as an issue's does, and the rest of it names the work.

```
🤖 Author the skills that hand work over
🐛 Fix the skill count the catalog states
```

**The emoji is the linked issue's.** `# Why` names the issue this pull request closes, and that
issue's title already opens with its type — a pull request picking a different one would say the
work changed kind on its way to review. The types and their emoji belong to `hos-gh-issue`,
in its `references/types.md`, and this skill keeps no second copy of the list.

**Name the work the pull request carries, never the branch it came from.** The host writes
`Merge pull request #<n> from <owner>/<branch>` on the merge commit, so the branch is already
recorded; the title is what survives it, and a title repeating the branch name says nothing the
merge commit did not.

**A title naming two subjects is one `hos-gh-notation` turns away.** Where the work falls into
two, `# How` carries the division under its own `##`, and the title names the one piece they sit
beneath.

## Using `gh`

**Where `gh` can reach GitHub, this skill uses it** — for reading the host as much as for opening
against it. What follows is decided by the environment rather than by the request:

| `gh` | What this skill does |
| :-- | :-- |
| installed, and `gh auth status` passes | Reads the linked issue, and opens the pull request once you say so |
| missing, or nobody is logged in | Says which of the two it was, and stops at the text |

**Nothing above this section changes either way.** What a pull request holds, how it is titled
and which language it is written in are the same whether it is opened from here or pasted by
hand.

### Reading

**`# Why` opens with the issue this pull request closes, as the list item described above:**

```markdown
# Why

* Close #123
```

**The number is worked out before it is asked for.** Where `gh` can reach GitHub, the open issues
are listed and matched against the work in hand — the branch name, the commit subjects, what the
diff touches:

```sh
gh issue list --state open --limit 100
```

- **One issue that plainly matches is the answer.** Take it, and name it when the text is shown,
  so that a wrong match is caught before anything is opened
- **Several that could fit, or none that does, is a question.** Ask which issue this closes
  rather than taking the likeliest: `Close #<issue>` closes that issue the moment the pull
  request merges, and reopening it afterwards does not unsay what the close told everybody

**The issue is then read, never remembered.** Its number goes into `# Why` and its emoji goes
into the title, and both belong to the issue rather than to the conversation:

```sh
gh issue view <number>
```

An emoji taken from memory is how a pull request ends up announcing a type its issue never had,
and the mismatch survives the merge.

### Opening

**`gh` is touched only after the text has been shown.** A send is not the moment to read what is
being sent, so the title and the body are in front of the reader in full before the question is
even asked.

- **Never send without asking.** The question comes after the text, so what is being agreed to is
  on the screen when it is asked. A yes covers the pull request that was shown, and nothing
  beyond it
- **A no ends the work, and ends it well.** The text stands, and it is worth no less for not
  having been opened
- **Where `gh` cannot be used, hand over the command along with the text**, so that whoever logs
  in later has nothing to reassemble

```sh
gh pr create --draft \
  --base <the branch it returns to> \
  --title '🤖 …' \
  --body-file <path> \
  --assignee @me
```

### `--draft`, without exception

**Every pull request opened from here is a draft.** Whether the work is ready to be looked at is
a judgement about the work, made by a person once the pull request exists — never by whoever
assembled the command.

- **Raising it is `gh pr ready <number>`**, and `gh pr ready --undo <number>` puts it back. Both
  are a person's, as the judgement is
- **A draft runs CI like any other.** `pull_request` fires `opened` and `synchronize` on one, so
  nothing is held back by opening it as a draft
- **The flag comes off only where it was asked for in so many words.** A hurry is not that, and
  neither is work that looks finished

### The base branch

**`--base` is always stated.** Left out, `gh` opens against the repository's default branch, and
a sub-branch here usually returns to a trunk that is not it.

**`git fetch origin --prune` is run before the pull request is opened, every time.** The walk
below reads remote-tracking refs, and those are a copy of what the remote held when it was last
fetched — so a walk against a stale copy names a base out of the past and the command carries it
to the host unchanged.

- **The prune is what makes it an answer.** Without it, a branch deleted on the remote stays in
  the local copy and goes on scoring in the walk, so the base that comes out is one the host no
  longer has.
- **Detect the base immediately before the command, not earlier in the run.** Between the walk
  and the create there is a body to write and flags to settle, and a base merged during that
  interval is gone by the time `gh` reads it. Measured: a base was detected, and was merged and
  its branch deleted while the body was being written.
- **A refusal naming the base ref is the base having moved, not the walk having erred.** `gh`
  answers `Base ref must be a branch` alongside `No commits between`, and both describe a branch
  that is no longer there rather than a mistake in finding it. Fetch again, walk again, and take
  what comes out — it is usually one trunk higher, because what removed the base was its own
  merge into that trunk.

**The base is the nearest trunk above, and what marks a trunk is the commit it opens with.** A
branch merged through GitHub never reaches its trunk by a local merge, so the trunk has to be
named on the command — and its name is no help in finding it. A `feature/xxx` with branches cut
from it is as much a trunk as a `release/x.x.x` is, and the branch convention (`hoc-git-branch`)
says so by giving both the same empty marker: `Start …`, or `Release x.x.x` on a `release/x.x.x`.

Walk the ancestry and stop at the first one:

```sh
git log --first-parent --format='%H %s' HEAD | while read -r sha subject; do
  case $subject in Start\ *|Release\ *) ;; *) continue ;; esac
  [ -z "$(git diff-tree --no-commit-id -r "$sha")" ] && echo "$sha $subject" && break
done
```

**The emptiness test is not decoration.** `Start` is reserved for a commit that carries no change
of its own, so one whose tree differs from its parent's is a mislabelled change rather than a
marker, and taking it would name the wrong branch.

Then find the branch that marker opened. It is the one that has taken no work of its own since:

```sh
marker=<the sha above>
git for-each-ref --format='%(refname:short)' refs/remotes/origin refs/heads |
  while read -r ref; do
    git merge-base --is-ancestor "$marker" "$ref" 2>/dev/null || continue
    echo "$(git rev-list --first-parent --no-merges --count "$marker..$ref") $ref"
  done | sort -n
```

**Zero is the trunk.** Nothing is committed to a trunk directly — work arrives there through
merges — so the branch carrying no non-merge commit of its own past the marker is the branch the
marker opened. Every sub-branch cut from that trunk scores higher, which is what stops a sibling
from being taken for a base.

**A trunk opening a pull request of its own walks past its own marker.** `release/0.3.0` heading
for `main` meets `Release 0.3.0` first, and that is the commit that opened the branch doing the
walking rather than anything above it. Step over it, take the next marker up, and where there is
none take `main`. The same holds for `dev` and for a `feature/xxx` returning to what it was cut
from.

**A trunk that is not on the remote is a question, not a base.** `gh pr create --base` names a
branch GitHub has to be able to see, and one that exists only here is not that. Say it is
unpushed and ask — never fall back to whatever else happens to be reachable, because the fallback
is always a branch further up, and opening against it drags in every commit in between.

**No marker anywhere in the ancestry means `main`**, and only a main-bound branch may take it — the next
section.

### Main-bound branches

**Only a main-bound branch opens against `main`**, and there are four of them: `dev`, `env`,
`hotfix/*` and `release/*`. Everything else returns to one of those, and reaches `main` when that
one does.

| The branch | What it opens against |
| :-- | :-- |
| `dev`, `env`, `release/*` | `main` — main-bound, and trunks besides |
| `hotfix/*` | `main` — main-bound without being a trunk, because the fix cannot wait for one |
| anything else | the trunk it was cut from |

**The word is `main-bound` because the four have nothing else in common.** Three are trunks and
`hotfix/*` is not, so `trunk` cannot name the set; what they share is a destination, and that is
all the name claims.

**The set is closed because a merge into `main` is not only a merge.** Publishing and deployment
hang off it, so what arrives there arrives in production. Every other base punishes a wrong guess
with a diff nobody wrote; `main` punishes it with a release.

**And it is enforced rather than merely agreed.** The organization's repositories carry a
`main-guard` workflow that reads the pull request's head branch and fails on anything outside the
four, so one opened against `main` from elsewhere is rejected before anybody reads it.

**So a walk that reaches `main` from a branch that is not main-bound is a result to check rather
than to use.** Either there was no trunk above to find, or the one above it was opened without
its marker — and the second is a defect in that branch, not an answer about this one.

- **A repository on GitHub Flow is the exception, and it is not a rare one.** Where there is no
  `dev`, no `env`, no `release/*` and no `main-guard` workflow, every branch does return to
  `main` directly and the table restricts nothing. The absent workflow is the plainest of the
  four tells: a repository that meant to restrict `main` would be checking
- **An explicit instruction wins.** Told which branch to open against, open against that one and
  say so when the text is shown
- **What is still unsettled is asked.** The base can be edited after the fact — `gh pr edit
  --base <branch>` — but not before somebody has read the wrong diff

### The assignee

**`--assignee @me`, and no `--reviewer`.** `@me` is `gh`'s own shorthand for whoever is logged
in, so nothing has to look the account up first. The pull request is the work of whoever opened
it, which is why the sender is the default rather than a name somebody has to choose.

- **Who reviews is the repository's own arrangement.** A team that names somebody in one
  organization names nobody in the next, and this skill is installed into repositories whose
  reviewers it cannot know. A handle that does not resolve fails the create outright
- **Told who reviews it, pass them.** An instruction in the conversation supplies the one thing
  the skill cannot work out for itself
- **Adding one afterwards costs nothing**: `gh pr edit <number> --add-reviewer <handle>`, and
  `--add-assignee` beside it. A draft holds a reviewer as an attachment rather than a request, so
  `gh pr ready <number>` is what turns it into one

### The rest of the command

- **The body goes through `--body-file`, never `--body`.** A body is full of backticks, `#` and
  newlines, and the shell reads every one of them before `gh` sees anything. A file is read by
  `gh` itself, so nothing inside has to be escaped — and `-` reads standard input where writing a
  file is not wanted
- **The branch has to be on the remote already.** Given every flag it needs, `gh pr create` opens
  the pull request without prompting, and a branch that exists nowhere but here has nothing to
  open one from. Where it is unpushed, say so and stop: a push is a decision of its own
- **Report the URL `gh` prints.** It is the one part of the result that is not already on the
  screen

## Out of scope

- **The issue.** Where things stand and which direction to take are the issue's, and the pull
  request links to it rather than repeating it
- **Commit messages and branch names.** They belong to the git conventions
- **Reviewing and merging the pull request.** Opening one is this skill's; what becomes of it
  afterwards is not, and taking it out of draft is a person's call
- **The merge commit's own subject.** A merge made through a host is written by the host, and
  nobody here chooses its wording
