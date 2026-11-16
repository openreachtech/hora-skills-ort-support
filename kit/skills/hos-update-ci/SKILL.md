---
name: hos-update-ci
description: "Update a repository's CI along `npm-boilerplate` — the GitHub workflows first, with the environment files and dependencies they rely on brought along — and build the commit tree for it: branch from the base commit, carry what the boilerplate gained, raise dependencies, then shape the line into a trunk with sub-branches. Use when asked to update the CI, the GitHub workflows or the environment files along a boilerplate, or to bring `.npmrc`, `jsconfig.json`, `.vscode/cspell.json`, the workflows and the dependencies in line at once."
---

# Update CI

Carries what `npm-boilerplate` gained into a repository, then shapes the commits into the tree
the sibling boilerplates already use. The boilerplate is the base: what it has, the repository
gets, unless the repository has its own reason to differ.

**The CI workflows are what the work is for.** The environment files and the dependencies come
along because the workflows need them: a step that runs a script needs the script, the packages it
imports and the files that describe them, so none of those is left behind for being outside
`.github/`.

Read the conventions this work stands on before the first edit: `/hoc-git-branch`,
`/hoc-git-commit`, `/hoc-npm-raise-deps`, `/hoc-npm-npmrc`, `/hoc-git-prohibit-destructive-commands`.
The commands here are the procedure; those skills hold the reasons.

## The reference trees

Read how the sibling boilerplates did the same work before building anything, so that the
subjects and the shape come from precedent rather than from memory.

```bash
git -C <boilerplate clone> fetch origin
git -C <boilerplate clone> log origin/main --graph --format='%h %s' -60
```

Look for the trunk opened with `Start updating the environment along npm-boilerplate` in
`renchan-boilerplate`, and for the audit steps in `npm-boilerplate` and `hora-boilerplate`. Take
their merge subjects as they stand where the work is the same.

## 1. Cut the branch

- Confirm the base commit the user named, then cut from it: `git switch -c update/environment-along-npm-boilerplate <base>`.
- Check `git branch --show-current` before the first edit and before every commit. Nothing is committed on `main` or a release trunk.
- Fetch the boilerplate clone first. A stale clone gives a stale reference.

## 2. Read the difference, then decide the scope

```bash
B=<boilerplate clone>
for f in .npmrc jsconfig.json jest.config.js eslint.config.js .gitignore .env.development .env.live; do diff $B/$f $f; done
diff -rq $B/.github .github; diff -rq $B/.vscode .vscode; diff $B/package.json package.json
```

- **The boilerplate is the base, so carry what it gained.** Do not narrow the scope by asking
  which files count. Where a change needs something else to work, that comes with it: a workflow
  step that runs `npm run audit:npm` needs the script, the packages, the advisory list and the
  `types` entry, so all of them are part of the same work.
- **A file the boilerplate has is the boilerplate's file, byte for byte.** Clone it as it stands.
  Do not carry part of it, do not leave out a branch because it never runs in this repository,
  and do not keep a local variation because the requirement is already met.
  - **The reason is the check at the end of the work.** A file that differs forces the reader to
    decide, every time, whether it differs because a copy went wrong or because the requirement
    was already met and the file was left alone. That decision costs thought on every completion
    check. A file that is identical needs none: a byte comparison settles it.
  - **A thing the boilerplate has and the repository lacks is carried in, unless its existence is
    denied here.** A file whose own condition says it does not belong to this kind of repository
    (`boilerplate-version.yml`, which runs only where the repository name contains `-boilerplate`)
    is left out whole, and removed where it already stands. It is never copied to sit inert: an
    inert copy brings back the question this rule removes, whether it is there on purpose.
  - **A branch inside a file is not a denial of the file.** The `*boilerplate*` branch of
    `main-guard.yml` never runs in another repository, and the file is still cloned whole,
    branch included.
  - **Where it is unclear whether a thing's existence is denied, ask the user before the edit**,
    in one line, and proceed on the answer. The default is to carry it in.
- **What stays the repository's own** is a closed list, and each entry is the whole of a
  difference, never the start of a wider one:
  - `about-boilerplate.md`: a frozen record, never updated.
  - `package.json`: the parts that are valid for this repository and stay as they are, namely its
    identity, `bin`, `files`, `engines`, `scripts` and the dependencies of its own. What the
    boilerplate gained in it is carried in beside them. `overrides` and `allowScripts` are
    decided by the audit, as their own bullet in step 3 says.
  - `package-lock.json` and `actions.lock`: both are generated, never copied. `actions.lock` is
    produced by the tool after the tag switch and usually matches the boilerplate's, but it can
    differ with the time the work is done, so it is left out of the byte comparison, as is the
    entry of a workflow left out as denied.
  - `.claude/settings.local.json`, `.claude/skills/`, `CLAUDE.md` and the READMEs.
  - Any step or ignore the repository added for itself: a skill-name audit step, an extra `eslint`
    ignore, a word of its own in `cspell.json`.
  - **A file carrying an addition of its own cannot be identical.** Take the boilerplate's file
    and re-apply the addition as the only difference, so that a comparison leaves the addition and
    nothing else. Name each addition in the report; one that is not named is a difference nobody
    chose.
- Show the user the per-file table (file, difference, treatment) before the first edit when the
  scope is unclear, and proceed on it when it is not.

## 3. Work the line

Commit in one line first, one decision per commit, each with its own subject. Verbs follow
`/hoc-git-commit`.

- **`.npmrc`**: one commit per setting, edited by hand and never through `npm config set`.
  `Turn on strict-allow-scripts in .npmrc`, `Add tag-version-prefix to .npmrc`.
  `strict-allow-scripts` is the exception to taking the boilerplate's line: it belongs to the audit
  work below and is decided there.
- **Packages the boilerplate gained**: `Install <package> <version>` each. Check the option
  exists before using it (`npm install -h`). A release inside `min-release-age` is installed with
  `--min-release-age-exclude=<package>`, which the later `npm update` needs as well.
- **Dependencies raised**: compare each declared range with the registry
  (`npm view "<pkg>@<range>" version`), raise each to the newest release its range permits, one
  `Update <package> version to <x.y.z> in package.json` per package. A major the range excludes
  stays unless the user asks, and an install that succeeds is not evidence the toolchain works
  with it: check the plugins' peer ranges and run lint and tests before keeping it.
- **`overrides:`, `allowScripts:` and `strict-allow-scripts` (`.npmrc`) are audit work: the latest
  information decides.** All three bear on what `npm audit` and an install report, so neither the
  boilerplate's values nor the repository's own settle them. Run `npm run audit:npm` and read what
  it reports now, read the registry for the releases that clear it (`/hoc-npm-vulnerability`), and
  read the install scripts the tree now carries (`/hoc-npm-install-scripts`).
  - **The boilerplate's `overrides` are a first thing to try, never the answer.** An entry that
    clears the report is taken at the version the registry offers now, and an entry the report no
    longer asks for is not added (`Update glob version to ^14.0.2 in overrides: of package.json`,
    `Add minimatch to overrides: in package.json`).
  - **The repository's own `overrides` yield the same way.** One the report no longer needs is
    a candidate to kick out, and one that no longer clears it is moved to what does.
  - **An override is kicked out, or left unadded, only after a lock file rebuilt without it still
    audits clean.** That is the whole criterion. The lock file the repository holds is not
    evidence: an override moved the tree when it went in, and the lock file keeps what it
    resolved ever since, so an audit over it answers `clean` whether or not the override is
    still doing the work. Nor is a run over a copy of that lock file with the entry removed, for
    `npm install --package-lock-only` keeps what is already resolved.
    - **Test in a scratch copy, never in the working tree.** Copy `package.json` and `.npmrc`
      without `package-lock.json` and without `node_modules`, then run `npm install`
      (`--package-lock-only` is enough for the lock file, and a full install is what checks the
      tree runs) and `npm audit`. An install script gate that stops the run is a finding to
      read, not noise.
    - **One run per entry, plus one with every entry removed.** Removing one entry shows whether
      that entry alone is needed; the run with none shows what the set clears at all, so an
      entry that stays can be told from one that never mattered.
    - **A package published inside `min-release-age` blocks the rebuild with `ETARGET`.** Pass
      `--min-release-age-exclude=<package>` for the packages the repository has just taken on,
      and for no others; the rest of the quarantine stays on.
    - **The decision is made after the run, never before.** A reason read off history, off an
      advisory database or off the lock file explains why an entry once mattered; it does not
      replace the run. Say in the report which runs were made.
  - **`allowScripts:` and `strict-allow-scripts` follow the tree as it stands.** An entry is
    decided against the scripts the installed tree carries now, and the gate is turned on once
    every one of them has a decision. The boilerplate's setting is the default to try, and a
    differing result is not one to chase.
  - **The byte-identical rule does not reach any of the three.** It applies to files cloned from
    the boilerplate; what an audit asks for changes with the day it is run, so the result can
    differ from the boilerplate's and is not a difference to chase. `.npmrc` stays cloned for its
    other settings.
- **The lock file is one commit, last in the dependency work.** Run `npm install` once after the
  final `package.json` change and commit it as `Update package-lock.json after npm install`
  (name the command that actually produced it). No lock commit beside each package.
- **`npm` strips an empty `"dependencies": {}` on every install.** Put it back by hand, and stage
  the `package.json` change as a patch so only the intended hunk goes in:

  ```bash
  diff -u --label a/package.json --label b/package.json <(git show HEAD:package.json) <edited copy> > hunk.patch
  git apply --cached --check hunk.patch && git apply --cached hunk.patch
  git diff --cached package.json; git diff package.json
  ```

- **`jsconfig.json` and `.vscode/cspell.json`**: `Add <package> to types: in jsconfig.json`; a word
  goes into `cspell.json` only where it exists in the repository, and is re-checked after any file
  that brings new text (an advisory id in the advisory list brings `gcqx`).
- **Workflows**: switch each `uses:` to its major tag one file per commit
  (`Use major tag of <action> in <file>.yml`), then generate the lock file with the tool, never by
  hand: `gh actions-lock --no-narrow`, committed as
  `Add actions.lock after gh actions-lock --no-narrow`. **The lock is generated after the tag
  switch.** Generated before it, the lock lists both the commit form and the tag form.
- **Workflows the boilerplate has and the repository lacks**: bring each in, one file per
  commit, unless its existence is denied (step 2). How the commits are laid out is this step's
  own; that the file ends identical to the boilerplate's is checked in step 5.
- **Audit gates**: copy `scripts/stopgap-audit/IGNORED_ADVISORIES.js`, add `audit:npm` and
  `audit:actions` to `scripts:` of `package.json`, and replace the `npm audit` step of `test.yml`
  with `npm run audit:npm` after `npm ci`, then add the `npm run audit:actions` step. Keep the
  boilerplate's comments on the steps. Run both scripts and require exit 0.

## 4. Shape the line into the tree

When the work is finished and nothing is pushed, shape it. Tag the line first so the original is
one `git switch` away, and keep the tag local.

```text
Start updating the environment along npm-boilerplate        (empty marker, the trunk)
 +- Merge the settings of .npmrc                            (the .npmrc commits)
 +- Merge the dependencies the updated environment needs    (installs, raises, overrides, one lock commit)
 +- Merge the environment files following npm-boilerplate   (jsconfig.json, cspell.json: serial commits)
 +- Merge the CI workflows following npm-boilerplate        (nested trunk)
     Start updating the CI workflows along npm-boilerplate
      +- Merge the rules of the workflows the boilerplate gained
      +- Merge the pinning of actions by actions.lock       (tags, then actions.lock)
      +- Merge the audit of npm advisories by the shared package
      +- Merge the audit of action versions
```

- **Order**: a setting that governs an install goes before the install; what installs go before
  what refers to them; the audit of action versions goes after the pinning it inspects; the large
  diffs go last.
- **One-commit leaves go serial in one sub-branch.** `jsconfig.json` and `cspell.json` are one
  commit each, so they share a sub-branch rather than taking one apiece.
- **Settings stay out of the dependency sub-branch**, and the lock file is committed once, inside
  the dependency sub-branch, after its last `package.json` change.
- Every sub-branch is cut from the trunk's current tip, never from the one before it.

Build it by cherry-picking the line's commits, one sub-branch at a time. Chain the steps with
`&&` and stop at the first failure; a sub-branch name that already exists must stop the run
(check `git branch` first), because a failed `git switch -c` leaves the next `cherry-pick` landing
on the trunk itself.

```bash
git tag line/<name> HEAD
git switch -C update/environment-along-npm-boilerplate <base>
git commit --allow-empty -m 'Start updating the environment along npm-boilerplate'

# per sub-branch
git switch -c <sub> <trunk> && git cherry-pick <commits...>
git merge-base --is-ancestor <trunk> <sub>
test "$(git rev-list --count <trunk>..<sub>)" -gt 0        # a count of 0 means a rung is gone
NODE_ENV=development NODE_OPTIONS=--experimental-vm-modules npx jest
git switch <trunk> && git merge --no-ff <sub> -m '<merge subject>' && git branch -d <sub>
```

- The lock commit does not cherry-pick onto a branch that lacks its base. Write the final lock
  from the line (`git show <lock commit>:package-lock.json > package-lock.json`) and commit it
  there with the same subject.
- **Opening the nested trunk**: cut it from the trunk, add its `Start` marker, build and merge its
  sub-branches into it, then merge it into the outer trunk.
- **Inserting a sub-branch ahead of one already merged**: keep the later trunk on a branch, reset
  the outer trunk to the commit before it, merge the new piece, then
  `git rebase -r --onto <new tip> <commit the trunk was cut from> <that branch>` and merge it back.
- **Changing a commit inside the finished tree** (dropping one, regenerating a file) is a driven
  interactive rebase, never a hand rebuild: `GIT_SEQUENCE_EDITOR=<script> git rebase -i -r <base>`,
  where the script rewrites the todo (`drop` a line, add an `exec` line after a `pick`). `-i` and
  `-r` both go on.

## 5. Check, report, hand over

- The tree at the tip equals the tagged line: `git diff --stat line/<name> HEAD` is empty, or
  shows exactly the change just made on purpose.
- Tests, `npm run lint`, `npm run audit:npm`, `npm run audit:actions` all pass at the tip. Read
  the output; an empty line from a command is not a pass.
- Every file the boilerplate has is byte-identical to it (`cmp <boilerplate clone>/<file> <file>`
  for each, or `diff -rq` over the folders), except the closed list in step 2. Each difference
  that remains is one of those entries, named in the report; any other is a copy that is not done.
- Report the tree as a table of merge subjects and what each holds, and the differences left on
  purpose.
- **Never push or open a pull request here.** Report the branch, the commit list and the working
  tree state, and ask for permission to push. `gh pr create` always carries `--draft`.
- **Delete a saved tag only after checking what it uniquely holds.** Diff it against the trunk and
  read the lines only the tag has; where every one is superseded or was dropped on purpose, delete
  the tag with `git tag -d`. A tag is a name, so it is deleted and nothing else is touched.

## Recovery

- A mistaken merge or cherry-pick on a clean tree is undone with `git merge --abort` or
  `git cherry-pick --quit`. Never `git restore`, `git reset --hard` or `git clean`; set work aside
  with `git stash -u`, or copy the file out before overwriting it.
- Commits that landed on the wrong branch: `git branch <holder>` first, then
  `git rebase -r --onto <target> @` to put the branch back, then continue on `<holder>`.
