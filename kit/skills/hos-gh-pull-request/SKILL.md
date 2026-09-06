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
work changed kind on its way to review. The types and their emoji belong to `hos-gh-issue`,
in its `references/types.md`, and this skill keeps no second copy of the list.

**Name the work the pull request carries, never the branch it came from.** The host writes
`Merge pull request #<n> from <owner>/<branch>` on the merge commit, so the branch is already
recorded; the title is what survives it, and a title repeating the branch name says nothing the
merge commit did not.

## Language

**Written in English unless a language is asked for.** The reader is whoever opens the repository
rather than whoever is in the conversation, so the language of the request does not decide it. An
explicit instruction wins.

## How the text is shown

**Inside fenced blocks, so it can be read and copied.** The title and the body go in separate
blocks, because they are two fields on the form and two arguments on the command.

- **Where the body contains a fenced block of its own, fence the whole thing with four backticks or
  more.** Three would end the block at the first inner fence
- **Nothing but the pull request text goes inside the fence.** Commentary belongs outside it, or it
  gets pasted into the form

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

**The linked issue is read, never remembered.** `# Why` carries its number and the title carries
its emoji, and both belong to the issue rather than to the conversation:

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
gh pr create --draft --base <the branch it returns to> --title '🤖 …' --body-file <path>
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

### The rest of the command

- **`--base` is always stated.** Left out, `gh` opens against the repository's default branch,
  where a sub-branch here usually returns to a `release/x.x.x` trunk instead. Which branch it
  returns to is settled by the branch convention (`hoc-git-branch`)
- **The body goes through `--body-file`, never `--body`.** A body is full of backticks, `#` and
  newlines, and the shell reads every one of them before `gh` sees anything. A file is read by
  `gh` itself, so nothing inside has to be escaped — and `-` reads standard input where writing a
  file is not wanted
- **The branch has to be on the remote already.** Given every flag it needs, `gh pr create` opens
  the pull request without prompting, and a branch that exists nowhere but here has nothing to
  open one from. Where it is unpushed, say so and stop: a push is a decision of its own
- **Report the URL `gh` prints.** It is the one part of the result that is not already on the
  screen

## Referring to a file

**Write the path in backticks. Never as a markdown link.** A relative link resolves against the
pull request's own URL rather than the repository tree, so it breaks the moment it is pasted.

```
Bad   [`docs/adopting.md`](./docs/adopting.md)
Good  `docs/adopting.md`
```

Everything a reader would copy and search for takes backticks: file names and paths, class,
method, function and variable names, package names, config keys, versions, commands. A name
written in code is written in backticks in prose as well.

**A version number is one of them, in the title as much as in the body.** It is what a reader
copies to check what they are running against, and left bare it reads as prose rather than as a
value.

```
Bad   🛡️ Raise @humanfs/node to 0.16.8 and pin it through an override
Good  🛡️ Raise `@humanfs/node` to `0.16.8` and pin it through an override
```

## Out of scope

- **The issue.** Where things stand and which direction to take are the issue's, and the pull
  request links to it rather than repeating it
- **Commit messages and branch names.** They belong to the git conventions
- **Reviewing and merging the pull request.** Opening one is this skill's; what becomes of it
  afterwards is not, and taking it out of draft is a person's call
- **The merge commit's own subject.** A merge made through a host is written by the host, and
  nobody here chooses its wording
