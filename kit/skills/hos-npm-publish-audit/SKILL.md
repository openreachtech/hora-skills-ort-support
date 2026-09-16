---
name: hos-npm-publish-audit
description: "Audit a package before it reaches the npm registry, and report rather than release it — the artefact a consumer receives is read rather than the repository it was built from, and the inventory goes back in full. Covers the entry points resolved from outside the tree, the document followed the way a reader follows it, and the version number a release spends permanently. Use before a package goes out. Where the version bump sits among the commits is not this skill's."
---

# npm publish audit

**A publish hands an artefact to somebody who will never see this repository.** They get a
tarball and a document, and whatever is wrong in either is what they meet in their first
minute.

It also cannot be taken back. Every other step in a package's life can be redone; this one
spends a version number permanently, whether or not the release is later withdrawn. So this
audit reads what is about to go out, reports, and stops.

## What the name says

**`npm` is the registry, and `audit` is the shape.** It reads and reports and repairs nothing,
as `hos-documentation-audit` does for a document — and here that restraint is not a preference.
The last step is irreversible, so the person who owns the consequence is the person who takes
it. **Nothing in this skill runs a publish.**

## What is read is the artefact, not the repository

**Lint and tests read the repository. Neither opens what the consumer receives.** A tree where
the linter was clean and every test passed still says nothing about the tarball, because
nothing in it looked at one.

```sh
npm pack --dry-run
```

**Read every line of what it prints, and count.** The output is the inventory, and the
inventory is the only statement of what ships.

### The declaration is not the inventory

`files:` is an allowlist, and the registry adds to whatever it holds. `package.json`, every
`README*` and `LICENSE` ship whether or not they are listed, so a manifest declaring three
directories can produce a tarball holding six things.

- **An allowlist is only as good as its contents.** One entry that stopped matching after a
  rename ships nothing where something was meant to go, and nothing fails.
- **Reading the manifest instead of the inventory is the mistake this whole section exists to
  prevent.** The manifest states an intention. The inventory states a fact.

## What the inventory is read for

| Read for | What it catches |
| :-- | :-- |
| Files that must not ship | Tests, fixtures and configs. They bloat the install, drag in development dependencies nothing declared, and carry whatever the fixtures hold |
| Files that must ship and do not | An allowlist entry left pointing at a path that moved |
| The entry points | `main`, `exports`, `bin` and `types` name paths **inside the tarball**. A path that resolves here can be absent there |
| Generated output | Where a build runs from `prepack`, the output cannot be stale by construction. Where it does not, the tarball can carry a build older than the source |

### Resolve the entry points from outside

**The repository finds a file by its location; a consumer finds it through the manifest.**
Those are two resolvers, and only one of them is the consumer's.

So install the packed tarball into an empty project and use it there — import it, read the
exports back, run the type checker. **A runtime import is the only check that sees what a
consumer's code will see**, and a declaration that resolves in this tree can fail to resolve
in theirs.

## Follow the document the way a reader follows it

**This is the check that finds the most, and reading is the only way to run it.** Take the
document's own instructions and carry each one out against reality.

| Read for | Why it survives every other check |
| :-- | :-- |
| The install command | It names a package and a registry, and either can have moved since the line was written |
| A paragraph carried in from a sibling package | True there, false here. Counts, capabilities and behaviour differ, and the copy asserts the sibling's |
| An example that teaches a default | Where the stated default and the real one disagree, the reader is taught the wrong one and nothing fails |
| What an example leaves out | An example showing half a setting's options teaches that the other half does not exist |

**A claim copied between sibling packages is in every translation of the document.** The copy
is usually made before the translations, so repairing one language leaves the rest asserting
it.

## Scan for what no linter enforces

Every project holds rules that nothing fails on — a name that must not appear, a marker that
must not survive a release, a file whose content is frozen by policy. **Enumerate them and
grep.**

- These are cheap to check and easy to forget for the same reason: nothing goes red when they
  are violated.
- **The publish is the last point at which forgetting one is still recoverable.** After it, the
  text is in a tarball that stays fetchable.
- Include the rules about files that must not be edited. A document whose whole purpose is to
  record a frozen state is one that a tidy-up will happily bring up to date.

## The report

**Show the inventory in full — the count and every path, not a summary.** A summary is exactly
the second-hand statement the reading exists to stop trusting, and a reader who is about to
spend a version number is owed the thing itself.

- **A rehearsal is not a finding.** A command that reports what it would have done proves it
  would run. It says nothing about whether what it packed should go out, and reporting that it
  succeeded is not reporting that the package is right.
- **Say what was read and what was not.** An audit whose range is unstated cannot be argued
  with, and a reader disagreeing with the range is a cheaper conversation than one disagreeing
  with the findings.
- **Where nothing was found, say that.** A clean run is a result, and a report that only ever
  appears when something is wrong teaches everybody to skip it.

## Where the audit stops

The audit ends with the report. **A person runs the publish**, and these are the things the
report tells them, because nothing else will:

- **Whether this is a scoped package's first release.** Scoped packages are not public by
  default, so that release needs `--access public`; later versions of one already public do not
- **Whether the version is a prerelease.** `--tag` defaults to `latest`, so a prerelease sent
  without a tag of its own takes over what `npm install <name>` resolves to for everybody
- **Whether two-factor authentication is on**, so the command is given `--otp` rather than
  stalling on a prompt

## What cannot be taken back

| Situation | What the registry allows |
| :-- | :-- |
| Within 72 hours | Withdraw the version, as long as nothing in the public registry depends on the package |
| After 72 hours | Withdraw it only where **all three** hold: nothing depends on it, it had under 300 downloads in the last week, and it has a single maintainer |
| A version number already used | Never reusable. `package@version` is spent whether or not it was withdrawn |
| Every version withdrawn | No new version of that package may go out for 24 hours |

**So the remedy for a bad release is a new version, not a withdrawal.** `npm deprecate` puts a
warning on the version and leaves it fetchable, which is what a consumer who already has it
needs; taking it away removes it from them and still does not free the number.

## Out of scope

**What got the tree into a state worth releasing is what this audit could not reach:**

- **Where the version bump sits among the commits, and the two commits it takes.** The
  publishing convention (`hoc-npm-publish`) covers it, and it is where a reader goes when this
  audit says the tree is not ready to go out at all
- **The release note.** `hos-gh-release-note` writes what a reader deciding whether to upgrade
  needs; this audit reads the package, not the announcement
- **The tag, and the commits in its range.** The git conventions
- **Running the publish, and deciding when.** Both are a person's, as taking a pull request out
  of draft is
