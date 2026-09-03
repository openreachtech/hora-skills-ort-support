---
name: hos-write-pull-request
description: "Write a pull request for this organization — a title carrying the linked issue's type emoji, and a body of `# Why` carrying the issue it closes, `# How` carrying the approach taken, and `# Note` where something has to be watched — handed back inside a fenced block so it can be pasted straight into the form. It states how the work was carried out; where things stood and which direction to take belongs to the issue. Covers the merge-only line a pull request that merges a trunk turns on. Use whenever a pull request body or title is asked for. Issue bodies, commit messages and branch names are not this skill's."
---

# Write pull request

**A pull request is read once, at merge, by somebody who already has the diff, the commit list,
the CI result and the linked issue in front of them.** So it does not narrate the change. It
carries the one thing none of those hold: **the approach that was taken.**

That is why it is three sections against the issue's five. The asymmetry is deliberate — an issue
is read before the work, with nothing else to look at.

## What it holds

| Section | What goes in it | Written |
| :-- | :-- | :-- |
| `# Why` | `Close #<issue>`, and nothing else | always |
| `# How` | The approach the work took | always |
| `# Note` | What has to be watched — follow-up left undone, a side effect, an ordering dependency | **only when there is something** |

## `# Why` is a link, not an explanation

```markdown
# Why

* Close #123
```

**Do not restate the issue.** It says where things stood and which direction to take, and it is one
click away. A pull request that repeats it creates a second copy that will disagree with the first
the moment either is edited.

**`Close #<issue>` is what ties them**, and it is what closes the issue on merge.

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

## `# Note` is for what has to be watched

Follow-up deliberately left for later, a side effect somebody will meet, an ordering dependency on
another pull request. **It is left out entirely when there is none** — an empty heading costs the
reader a stop and says nothing.

It exists so that `# How` stays the approach. A caveat mixed into the approach is read as part of
it.

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
🤖 Author three skills for document repair, issues and pull requests
🐛 Fix the skill count the catalog states
```

**The emoji is the linked issue's.** `# Why` names the issue this pull request closes, and that
issue's title already opens with its type — a pull request picking a different one would say the
work changed kind on its way to review. The types and their emoji belong to `hos-write-issue`,
in its `references/types.md`, and this skill keeps no second copy of the list.

**Name the work the pull request carries, never the branch it came from.** The host writes
`Merge pull request #<n> from <owner>/<branch>` on the merge commit, so the branch is already
recorded; the title is what survives it, and a title repeating the branch name says nothing the
merge commit did not.

## Language

**Written in English unless a language is asked for.** The reader is whoever opens the repository
rather than whoever is in the conversation, so the language of the request does not decide it. An
explicit instruction wins.

## How it is handed over

**Inside fenced blocks, so it can be copied.** The title and the body go in separate blocks,
because the form has two fields.

- **Where the body contains a fenced block of its own, fence the whole thing with four backticks or
  more.** Three would end the block at the first inner fence
- **Nothing but the pull request text goes inside the fence.** Commentary belongs outside it, or it
  gets pasted into the form

## Out of scope

- **The issue.** Where things stand and which direction to take are the issue's, and the pull
  request links to it rather than repeating it
- **Commit messages and branch names.** They belong to the git conventions
- **Opening, reviewing or merging the pull request.** This skill produces text; the rest is a
  person's action
- **The merge commit's own subject.** A merge made through a host is written by the host, and
  nobody here chooses its wording
