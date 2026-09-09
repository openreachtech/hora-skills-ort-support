---
name: hos-gh-release-note
description: "Write a release note for a tag and send it — a body of `# What's Changed` carrying the change itself and `# Change Log` carrying nothing but the compare link, its `##` sections taken from a fixed list and led by `## Kicked Out`, `## Deprecated` and `## New Features` on a new major and by `## Security` on every other release, with dependency moves in a table per `package.json` field and a third table for `overrides:`. Covers the range a single tag implies, the confirmation every body takes before it is sent, and the draft every new release is created as. Use whenever a release note is asked for. Pull request bodies, issue bodies and commit messages are not this skill's."
---

# GitHub release note

**A release note is read by somebody deciding whether to take this version, and what it will
cost them.** So it carries three things: what changed, what could break, and what they have to
do about it.

It is not a record of the work. The pull requests, the commits and the diff are all one click
away and none of them is what the reader came for — they came to find out whether to upgrade.

**The `gh` in the name is GitHub.** It marks a skill that reaches the host rather than stopping
at the text it wrote; `hos-gh-issue` and `hos-gh-pull-request` are the others carrying it.

## What it holds

| Heading | What goes in it | Level |
| :-- | :-- | :-- |
| `# What's Changed` | The changes themselves, in `##` sections | H1 |
| `# Change Log` | The compare link, and nothing else | H1 |

**Both are H1, and the sections inside `# What's Changed` are H2.** The host's own generated body
opens at H2, so a note written to this shape replaces that body rather than being appended to it.

### `# Change Log` is the heading for the compare link

```markdown
# Change Log

**Full Changelog**: https://github.com/<owner>/<repo>/compare/<previous tag>...<tag>
```

**It holds nothing else.** The name invites being read as "the list of changes", and it is not
that — the changes are in `# What's Changed`. This heading exists so the compare link arrives
under a heading rather than trailing off the end of the body.

## What it leaves out

| Left out | Why |
| :-- | :-- |
| The list of merged pull requests | The host generates it, and it says who did the work rather than what the version does. It also puts a `@handle` on every line |
| The version bump itself | A release raises the version by definition. A section stating it tells the reader nothing they did not know from the tag |
| Anything the reader cannot act on | Refactors with no visible effect, internal renames, work that only moved files |

**"The host generated it" is not a reason to keep something.** The generated body is a starting
point for a human writing one, not a draft to be extended.

## The sections

**These are the `##` headings, in the order they appear.** A note uses the ones it has something
for and skips the rest. **Names are title case throughout** — `Supply Chain`, not `Supply chain`:

| Heading | What goes in it | When |
| :-- | :-- | :-- |
| `## 🦵 Kicked Out` | What is gone in this version | A new major only |
| `## ⚠️ Deprecated` | What still works and is on its way out | A new major only, in this position |
| `## ⚒️ New Features` | What the major brings | A new major only |
| `## 🛡️ Security` | Where the version stands on advisories — what was closed, and by what means | whenever there is something |
| `## 🐛 Bug Fixes` | Incorrect behaviour put right | whenever there is something |
| `## ⚙️ Requirements` | What the reader has to have for this version to run — a declared engine range, a platform, a service version | whenever there is something |
| `## 🛡️ Supply Chain` | What may run at install, and what the tree resolves through | whenever there is something |
| `## 📦️ Dependencies` | The tables | whenever there is something |
| `## ⚙️ CI` | Workflow changes | whenever there is something |
| `## ⚠️ Deprecated` | What has just been announced as on its way out | Any release that is not a new major |

**A section with nothing in it is left out entirely** — out, not empty. An empty heading costs the
reader a stop and says nothing.

### Why this order

**It runs from what the reader has to act on to what they only have to know.**

- **The first three appear on a new major only, and then they lead.** A reader meeting a new major
  is not deciding whether to patch; they are deciding whether to port, and their first questions
  are what has been taken away, what is going away next, and what has arrived. On every other
  release `## 🛡️ Security` leads
- **`## 🦵 Kicked Out` before `## ⚠️ Deprecated`, and both before `## ⚒️ New Features`.** What the
  upgrade costs comes before what it pays, and inside the cost, what has to be done now comes
  before what has to be done later
- **Whether it is a new major is settled against the previous tag**, which the range already
  found. A tag whose major is one above its predecessor's takes those sections; a minor or a patch
  inside the same major does not

### Kicked out and deprecated are not the same section

**They ask different things of the reader**, which is why they are two headings and not one:

| | What it means | What the reader does |
| :-- | :-- | :-- |
| `## 🦵 Kicked Out` | It is gone in this version | Change their code now, or stay behind |
| `## ⚠️ Deprecated` | It still works, and is going | Take the version now, and change their code before the next major |

**Bundling them costs the reader the deadline.** A single list of "what is gone and going" makes
every entry read as urgent, and the ones that were only announcements get treated as breakage —
or, worse, the other way round.

**Only a major kicks something out**, because removing it in a minor or a patch is what a major is
for. **A deprecation can be announced in any release**, and usually is — announcing it early is the
whole point of announcing it.

**So `## ⚠️ Deprecated` sits in two places.** On a new major it leads, beside what has already
gone. On any other release it goes last, after `## ⚙️ CI`: nothing in it stops the reader taking
the version, and what it asks of them is dated for a release that has not happened yet.

**A section this list does not name goes in by the same measure: how much the reader has to take
into account.** That is the ranking the list itself follows, so a new section slots into it rather
than onto the end.

### Each heading opens with an emoji

**The emoji is there to make an `##` heading findable when the note is scrolled rather than read.**

**It marks the heading; it does not identify the section.** So it does not have to be unique, and
two sections sharing one is not a defect: `## 🛡️ Security` and `## 🛡️ Supply Chain` both open
with 🛡️, and hunting for a second emoji to keep them apart would buy nothing.

**Only the emoji comes from that list. The name does not.** A type names a kind of work; a section
names what the version delivers, and the two do not read the same way. `🐛 Bug` as a heading says
a bug is being reported — `## 🐛 Bug Fixes` says it is gone. Take the emoji from the row and write
the name from the reader's side.

**Where a section this list does not name needs one, take it from `hos-gh-issue`'s
`references/types.md`** — the type whose work that section carries. This skill keeps no second copy
of that list, and that list's own rule applies: where no type fits, choose an emoji that names what
the section is.

### What is raised out of the tables

**A dependency move earns a section of its own only when it is something the reader runs.** A
declared engine range and a runtime dependency are that; a development dependency is not.

| Change | Where it goes |
| :-- | :-- |
| An `engines` range newly declared or raised | `## ⚙️ Requirements` |
| A major on a runtime dependency | `## ⚙️ Requirements` where it changes what the reader must have, otherwise the table with its reason in `note` |
| A major on a development dependency | The table, and nowhere else |

**An `engines` mismatch does not fail an install.** npm warns and installs anyway; it fails only
where `engine-strict` is set. So the section states what the version now requires rather than
claiming the install will stop — and a reader on an older runtime gets a warning they may well
scroll past, which is the reason to state the range in the note at all.

**The exception is a boilerplate**, where the development environment is the product being handed
over. There a major on a development dependency reaches the reader directly, and it may be raised
into `## ⚙️ Requirements` like any other.

## The dependency tables

**One table per manifest field**, because a reader who has to check what they run does not want it
mixed with what they build with.

**A `package.json` field used as a heading keeps its colon** — `dependencies:`, `devDependencies:`,
`overrides:`. It is how the field is written in prose everywhere else, and the colon is what marks
it as a key in a manifest rather than the English word:

```markdown
### `dependencies:`

| package name | old version | new version | semver | note |
| --- | --- | --- | --- | --- |
| `alpha-client` | | `^2.1.0` | | Added |
| `epsilon-legacy` | `^2.0.0` | `(kicked)` | | Replaced by the platform's own API |
| `beta-parser` | `^3.0.4` | `^4.0.1` | Major | Drops the callback API |
| `gamma-utils` | `^1.4.0` | `^1.7.2` | Minor | |
| `delta-fs` | `^0.9.1` | `^0.9.2` | Patch | Closes the path-traversal advisory |
```

**The `semver` column carries which part of the version moved** — `Major`, `Minor` or `Patch`.

- **The column is `semver`, not `level`.** The note is ordered by importance, so a column headed
  `level` is read as importance and costs the reader a stop working out that it is not
- **Rows are ordered `Major` → `Minor` → `Patch`**, not by package name. The same principle that
  orders the sections orders the rows
- **Within one step, package name order**, which is the manifest's own order and lets the reader
  hold the table beside it
- **`note` carries a reason, and only where there is one.** A `Minor` that needs no explanation
  leaves the cell empty, which is what makes the explained rows visible
- **A raise that closes a vulnerability always has one, at every step.** `Major`, `Minor` or
  `Patch` — a raise taken for an advisory says so in `note`, and names what it closed. Left empty
  the row is indistinguishable from a routine raise, and a reader upgrading for that fix cannot
  see which package carried it
- **A `Major` often has two things to say**, because crossing one is expensive enough that an
  advisory with no patched release below it is a common reason to. The `note` carries both: what
  it closed, and what it breaks

**Saying it in the table does not duplicate `🛡️ Security`.** That section states where the
version now stands — that nothing is outstanding, or what was closed and by what means. The table
row states which raise did it, which is the line a reader checks their own lockfile against.

### An addition and a removal have no step

**They go in the same table, with the `semver` cell left empty** because no version stepped:

| Row | `old version` | `new version` | `semver` | `note` |
| :-- | :-- | :-- | :-- | :-- |
| Added | empty | the new range | empty | `Added` |
| Removed | the old range | `(kicked)` | empty | why it went, where there is a reason |

**A removal writes `(kicked)` in `new version`.** The cell has to say something: left blank it
reads as a table with a hole in it, and the reader cannot tell a dependency that was dropped from
a row somebody forgot to fill in. The word is the one `🦵 Kick out` uses for a part removed from
something that stays, which is what a dropped dependency is.

**The empty `semver` cell is the signal that no version moved.** There is no step to name, and
inventing one for the column would make the column mean two things.

**These rows sort above `Major`.** A dependency arriving or leaving is a larger fact about the
version than any raise within one.

### `overrides:` is a third table

**An override is a pin applied to somebody else's dependency**, so it is neither a raise in this
manifest nor an ordinary addition. It takes a table of its own, and the columns carry what the
reader's tree actually did:

```markdown
### `overrides:`

Both entries are new in this version. `old version` is what the tree resolved to before them.

| package name | old version | new version | semver | note |
| --- | --- | --- | --- | --- |
| `example-uuid` | `8.3.2` | `^11.1.1` | Major | Closes an advisory its dependant cannot reach. Contradicts the range that dependant declares, so it wants revisiting at that dependant's next major |
| `example-qs` | `6.15.3` | `^6.16.0` | Minor | One minor above what its dependant's line pins |
```

- **`old version` is the version that was resolved, not a range.** An override new to the manifest
  has no previous range, and the resolved version is the line the reader checks their own lockfile
  against
- **`semver` is the step the resolved version took.** Writing an override off as `Added` with an
  empty step throws away the only thing the reader came to the table for
- **A caption above the table says which entries are new**, because the columns mean something
  slightly different here than in the two manifest tables
- **`note` names the dependant that carried the finding**, and says why the override was reached
  for rather than raising that dependant. Where the override contradicts a range its dependant
  declares, it says so, so that dependant's next major is a prompt to drop the entry

**The same shape covers any pin a manifest applies to a tree it does not own** — a `resolutions:`,
a `pnpm.overrides:`. What differs is the key, not the reader's question.

## The range

**Given one tag, the range is that tag and the tag before it.** The reader is comparing this
version against the one they are on, which is the previous release rather than any other point.

```sh
git tag --sort=v:refname
```

**The sort is not optional.** Plain `git tag` sorts lexically, and a project past its ninth minor
has an order that no longer matches its versions — `1.10.0` lands next to `1.1.0`, and `1.2.0`
lands after `1.13.0`. Checking the rule against a recent tag hides it, because the newest tag
usually has the right neighbour by accident.

- **The predecessor is worked out once and used twice** — for the diff that is read, and for the
  `compare/<previous tag>...<tag>` link. Deciding it separately in two places is how the two come
  to disagree
- **The oldest tag has no predecessor**, and its note is written as a first release: what the
  version is, rather than what moved. There is no compare link, so `# Change Log` is left out
- **The tag has to be present locally to be diffed.** `git fetch --tags` first where it is not

## Language

**Written in English unless a language is asked for.** The reader is whoever opens the repository
rather than whoever is in the conversation, so the language of the request does not decide it. An
explicit instruction wins.

## How the text is shown

**In a fenced block, so it can be read and copied.** The body is full of tables and backticks, and
a reader checking a version number is copying it.

- **Fence the whole body with four backticks or more** where it holds a fenced block of its own
- **Nothing but the release note goes inside the fence.** Commentary belongs outside it

## Using `gh`

| `gh` | What this skill does |
| :-- | :-- |
| installed, and `gh auth status` passes | Reads the release, and sends the note once you say so |
| missing, or nobody is logged in | Says which of the two it was, and stops at the text |

**Nothing above this section changes either way.** What the note holds, how it is ordered and
which language it is written in are the same whether it is sent from here or pasted by hand.

### Before anything is sent

**The body is shown in full and confirmed before it goes — always.** `gh release edit` replaces
the body outright and the release is public the moment it lands, so there is no send small enough
to be worth skipping this for.

Two things are being checked, and they are not the same check:

1. **That it is right** — the versions, the ranges, the order, the compare link
2. **That it may be published at all** — nothing in it that must not be public, and no personal
   information

**The second check is not covered by the first.** A note can be accurate and still carry a
username, an email address, a customer's name, an internal URL, a hostname or a token. The
host's generated body is where these arrive from most often: a list of merged pull requests puts
a `@handle` on every line, and that list is dropped for its own reasons before this check ever
runs.

**A release note is more exposed than a commit message.** It is a page of its own, it shows on the
repository's front page, and it is what a registry and a search engine index. A repository
convention that lists commit messages, issues and pull requests as the places a private party must
not be named covers release notes too, whether or not it says so.

**A request that already said "send it" is not the confirmation.** The body did not exist when that
request was made, and what is being agreed to is the body. **Where there is nobody to ask** — a
delegated run, a non-interactive one — **the work stops at the text** and hands over the command,
exactly as it does where `gh` is missing.

### Creating a release

**Every release created from here is a draft**, exactly as every pull request opened from
`hos-gh-pull-request` is:

```sh
gh release create <tag> --draft --title '<tag>' --notes-file <path>
```

**The title is the version, and nothing else.** `1.4.0`, never `1.4.0 — security and dependency
raises`. A release is listed under its version and looked up by it, and a title that adds a
summary duplicates the first section of the body while dating faster than it does.

- **Whether it is ready to publish is a person's judgement**, made once the release exists.
  `gh release edit <tag> --draft=false` publishes it
- **The flag comes off only where it was asked for in so many words.** Work that looks finished is
  not that

### Replacing the body of a published release

**A published release is not dropped to draft to make it safe.** Doing so costs more than it
buys, and the cost is measurable:

| Dropping a published release to draft | Effect |
| :-- | :-- |
| `releases/latest` | Falls back to the previous version, so the repository advertises an older release |
| `releases/tags/<tag>` | Returns `404`. The release is reachable by its numeric id only |
| `html_url` | Becomes `/releases/tag/untagged-<hash>`, and the hash changes on every edit |
| The git tag | Survives. It is a real tag in the repository and is not touched |

**`gh release view --json isLatest` is not a field**, so latest-ness cannot be read that way. It
comes from `gh api repos/<owner>/<repo>/releases/latest`, or from `gh release list`.

**So the safeguard is the reading before the send, not a state change after it.** The body is
shown, it is read, and then it goes:

```sh
gh release edit <tag> --notes-file <path>
```

### Editing a release that is already a draft

**A draft's body is replaced the same way, and it stays a draft.**

```sh
gh release edit <tag> --notes-file <path>
```

**No `--draft` on the command means the state is untouched**, which is what is wanted: whether the
release is ready to publish is the same person's judgement it was when the draft was created, and
a body being rewritten says nothing about it.

**Keep the body it replaces here too.** A draft's previous text is no more recoverable than a
published one's.

### Keep the body it replaces

**Nothing on GitHub keeps the text an edit replaced.** There is no history endpoint, the release
object carries only the current body, and the repository's events record that a release was
published rather than what an edit changed. `updated_at` moves on an edit, which says one
happened and not what it was.

So the current body is saved before it is replaced:

```sh
gh release view <tag> --json body -q .body > <somewhere outside the repository>
```

**A `release` webhook does deliver the previous text**, as `changes.body.from` on an `edited`
action. That is pushed to a listener at the moment it happens; it is not somewhere to read back
from afterwards.

### The rest of the command

- **The body goes through `--notes-file`, never `--notes`.** A body is full of backticks, `#`,
  `|` and newlines, and the shell reads every one of them before `gh` sees anything. A file is
  read by `gh` itself, so nothing inside has to be escaped — and `-` reads standard input
- **`gh release edit <tag>` resolves a draft by its tag**, even where the REST endpoint
  `releases/tags/<tag>` returns `404` for it. `gh` matches against a listing that includes
  drafts, so the tag is still the argument to use
- **Report the URL `gh` prints.** It is the one part of the result that is not already on the
  screen. For a draft it is the `untagged-<hash>` form rather than the tag's URL

## Referring to a file

**Write the path in backticks. Never as a markdown link.** A relative link resolves against the
release's own URL rather than the repository tree, so it breaks the moment it is pasted.

Everything a reader would copy and search for takes backticks: file names and paths, package
names, config keys, commands, and **every version number**. A version is the thing a reader copies
to check what they are running against, and left bare it reads as prose rather than as a value.

```
Bad   Raise example-parser to 4.0.1
Good  Raise `example-parser` to `4.0.1`
```

## Out of scope

- **Whether a release exists at all.** Tagging and creating one may belong to a workflow; this
  skill writes the note that goes in it
- **Whether to publish a draft, and when.** That is a person's call, as taking a pull request out
  of draft is
- **Tagging, and the commits the range covers.** They belong to the git conventions
- **The pull request and issue bodies.** How the work was carried out is the pull request's, and
  where things stood is the issue's
