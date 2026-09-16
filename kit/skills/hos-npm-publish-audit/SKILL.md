---
name: hos-npm-publish-audit
description: "The last audit of a package before it reaches the npm registry: it reads what is in the tarball. Use when a package is about to go out, or when asked whether one is fit to."
---

# npm publish audit

**This reads what is in the tarball.** That is what reaches a consumer, and whatever is wrong in
it is what they meet in their first minute.

## Read the inventory

**Lint and tests read the repository.** A tree where the linter was clean and every test passed
says nothing about the tarball, because nothing in it looked at one.

```sh
npm pack --dry-run
```

**Read every line of what it prints, and count.** That output is the inventory, and the
inventory is the only statement of what ships.

### The declaration is not the inventory

`files:` is an allowlist, and the registry adds to whatever it holds: `package.json`, every
`README*` and `LICENSE` ship whether or not they are listed, so a manifest declaring three
directories can produce a tarball holding six things.

- **An allowlist is only as good as its contents.** One entry that stopped matching after a
  rename ships nothing where something was meant to go, and nothing fails.
- **The manifest states an intention. The inventory states a fact.** Reading the first in place
  of the second is the mistake this section exists to prevent.

## What the inventory is read for

| Read for | What it catches |
| :-- | :-- |
| Files that must not ship | Tests, fixtures and configs. They bloat the install, drag in development dependencies nothing declared, and carry whatever the fixtures hold |
| Files that must ship and do not | An allowlist entry left pointing at a path that moved |
| The entry points | `main`, `exports`, `bin` and `types` name paths **inside the tarball**. A path that resolves here can be absent there |
| Generated output | Where a build runs from `prepack`, the output cannot be stale by construction. Where it does not, the tarball can carry a build older than the source |

### Resolve the entry points from outside

**The repository finds a file by its location; a consumer finds it through the manifest.** Those
are two resolvers, and only one of them is the consumer's.

So install the packed tarball into an empty project and use it there — import it, read the
exports back, run the type checker. **A runtime import is the only check that sees what a
consumer's code will see**, and a declaration that resolves in this tree can fail to resolve in
theirs.

## Follow the document the way a reader follows it

**This is the check that finds the most, and reading is the only way to run it.** Take the
document's own instructions and carry each one out against reality.

| Read for | Why it survives every other check |
| :-- | :-- |
| The install command | It names a package and a registry, and either can have moved since the line was written |
| A paragraph carried in from a sibling package | True there, false here. Counts, capabilities and behaviour differ, and the copy asserts the sibling's |
| An example that teaches a default | Where the stated default and the real one disagree, the reader is taught the wrong one and nothing fails |
| What an example leaves out | An example showing half a setting's options teaches that the other half does not exist |

**A claim copied between sibling packages is in every translation of the document.** The copy is
usually made before the translations, so repairing one language leaves the rest asserting it.

## Scan for what no linter enforces

Every project holds rules that nothing fails on — a name that must not appear, a marker that
must not survive a release, a file whose content is frozen by policy. **Enumerate them and
grep.**

- These are cheap to check and easy to forget for the same reason: nothing goes red when they
  are violated.
- **Nothing downstream of this reading looks for them.** This is where they are caught or not at
  all.
- Include the rules about files that must not be edited. A document whose whole purpose is to
  record a frozen state is one that a tidy-up will happily bring up to date.

## The report

**Show the inventory in full — the count and every path, not a summary.** A summary is exactly
the second-hand statement the reading exists to stop trusting.

- **A rehearsal is not a finding.** A command that reports what it would have done proves it
  would run, and says nothing about whether what it packed is right.
- **Say what was read and what was not.** An audit whose range is unstated cannot be argued
  with, and a reader disagreeing with the range is a cheaper conversation than one disagreeing
  with the findings.
- **Where nothing was found, say that.** A clean run is a result, and a report that only ever
  appears when something is wrong teaches everybody to skip it.

## Out of scope

- **Repairing what the reading finds.** A file that must not ship, an entry point that resolves
  here and not there, a document teaching a default the package does not hold — each is fixed by
  whoever owns it. This is the last reading before a package goes out, and what it owes the person
  deciding is the finding, not a tree quietly put right underneath them
- **Whether to publish, and when.** The reading says what is in the tarball; taking that as a yes
  is a person's call, as taking a pull request out of draft is
