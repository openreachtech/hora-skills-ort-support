---
name: hos-gh-open-release
description: "Open the next release on both ends — the `release/x.x.x` trunk cut locally from a freshly fetched `origin/main`, pushed, and the umbrella issue that will gather its work. Use when the next release is to be prepared, or a release trunk has to exist before work can be opened against it. It ends at the push and the umbrella: the version bump, the pull request into `main` and the release note belong to their own conventions."
---

# Open release

**Opening a release is one act with two ends.** The trunk is cut and marked here, then it is pushed
and an umbrella issue is filed there. Neither end is worth having alone: a trunk that exists only
locally cannot be the base of anything, and an umbrella with no trunk behind it gathers work that
has nowhere to land.

**This skill ends at the push and the umbrella.** Everything after them belongs to a convention of
its own:

| What comes after | Whose it is |
| :-- | :-- |
| Work cut from the trunk and merged back into it | the git branch convention |
| A boilerplate's version, raised in the release's last commit | the boilerplate convention |
| The pull request that takes the trunk into `main` | `hos-gh-pull-request` |
| The release note for the tag the merge produces | `hos-gh-release-note` |

## Where it is cut from

**A `release/x.x.x` merges into `main` without exception**, so the next one always starts from
`main` — never from the release before it, and never from a branch still open. Two things are
confirmed before the cut:

- **The previous release has landed.** Its pull request into `main` is merged, and `origin/main`
  stands at that merge. A trunk cut before then starts without the release it follows, and the
  gap surfaces only as a diff somebody did not write
- **Its tag is on the remote.** `git ls-remote --tags origin` answers it. A tag that exists only
  locally is not the one the release hangs off

**The version is asked, not assumed.** Which part of it moves is a decision about what the
release will carry, and nothing on the branch can make it yet. Confirm it before the name is
written anywhere, because the name goes into the branch, the marker and the umbrella at once.

## The local end

```sh
git fetch origin --prune
git switch --no-track -c release/x.x.x origin/main
git commit --allow-empty -m 'Release x.x.x'
```

- **`git fetch origin --prune` comes first, every time.** `origin/main` is only as new as the last
  fetch, and a trunk cut from a stale one inherits that base silently. `--prune` removes the
  remote-tracking ref of the previous `release/x.x.x`, which the host deletes once it merges, so
  what the listing shows afterwards is what the remote actually holds
- **`--no-track` keeps `origin/main` from becoming the trunk's upstream.** Cut from a
  remote-tracking ref, a branch takes that ref as its upstream, and a release trunk tracking
  `main` reports itself ahead of or behind the wrong branch for the rest of its life. The upstream
  it should have is set by the push below
- **The marker is the trunk's first commit.** Its subject is the version alone, and it is empty;
  both are the git branch convention's, which defines the marker every trunk opens with

## The remote end

**Push the trunk as soon as it is marked.** Every piece of work for the release reaches it through
a pull request, and a pull request's base has to be a branch the host can see — a trunk that
exists only here is not a base at all.

```sh
git push -u origin release/x.x.x
```

**`-u` sets the upstream that `--no-track` left unset**, to the trunk's own remote branch.

**Then file the umbrella.** Its title is the release's version alone, in the form the issue
convention gives a release umbrella:

```
⛱️ Release `x.x.x`
```

**Its body carries one line under `# Note`, and that is the ordinary case:**

```markdown
# Note

* Next release
```

Nothing about the release can be written before its work exists. The work arrives as issues filed
under the umbrella, one by one, and the umbrella's sub-issue panel becomes its contents as they do —
so an umbrella opened with more than this is an umbrella that guessed.

**Both are asked for before they happen.** The push takes the permission the git push convention
describes, and the umbrella is shown in full before it is filed, as the issue convention requires.
One yes for the pair is not implied by a yes for either.

## What is left behind

**The previous release's local branch stays until somebody says it may go.** The host deletes the
remote one on merge, and `--prune` clears its tracking ref, but the local branch is untouched by
both. Deleting it once merged is the git branch convention's rule; asking first is what deleting
anything takes.
