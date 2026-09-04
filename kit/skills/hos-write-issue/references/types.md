# Types

The issue types, the emoji each carries, and how to pick one. Referenced from `SKILL.md`.

**The emoji is not decoration.** It opens the title, and a `# Sub-issues` line becomes a title
verbatim, so a line written without one produces an issue nobody can classify at a glance.

## The types

| Type | For |
| :-- | :-- |
| 🤖 Agent | an AI element — a skill, an agent, a command |
| 🐛 Bug | incorrect behaviour |
| ✍️ Draft | something still being worked out |
| 💪 Enhancement | an existing thing made better |
| ⚙️ Environment | the environment a project runs or builds in |
| ⚒️ Feature | a capability that did not exist |
| 🏗️ Building layout | markup and layout written for the first time |
| 🧵 Lint | lint configuration and the fixes it demands |
| 🚚 Migrate | content carried in from elsewhere |
| 📦️ Package | a dependency taken on, given up, or moved |
| ✋ Proposal | something put up for a decision |
| 🚀 Publish (GitHub Packages) | a release to GitHub Packages |
| 🚀 Publish (npmjs.com) | a release to npm |
| 🚧 Refactoring | structure changed, behaviour untouched |
| 📄 Specification | what something must do, written down |
| 🎨 Adjusting CSS | styling |
| 🛡️ Security | an exposure, a hardening, an authorization decision |
| ✅ Tasks | **a hub.** It holds no work of its own; its children carry it |
| 🧪 Test | tests |
| 🧹 Tidy Up | a place brought into order, nothing removed, no behaviour changed |
| 🧩 Type | type declarations and annotations |
| 🗑️ Purge | **a file or folder gone whole**, with nothing replacing it |
| 🦵 Kick out | **a part removed from something that stays** — a member, a section, an entry, a field |

**The last two split on what survives**, and picking the wrong one loses the distinction a reader
needs: `🗑️ Purge` says the thing is gone, `🦵 Kick out` says the place is still there without it.

**Two types share 🚀.** So the emoji alone does not name a type — **quote the label as well**
whenever one is being referred to.

## Picking one

```
1. Does one of the types above describe the work?      -> use it
2. Does the work's commit vocabulary have a verb for it? -> that verb is the label,
                                                            and pick an emoji for it
3. Otherwise                                            -> choose a label and an emoji
                                                            that name what the work is
```

**The set is open.** Following an existing type is preferred, and inventing one where none fits is
allowed — so this list going out of date does not block anything.

**Step 2 is why several labels read as verbs.** `Purge`, `Kick out` and `Tidy Up` are the words the
work's own commits would use, and taking the label from that vocabulary keeps the issue, the branch
and the commits saying the same thing. The verbs are in the git commit convention (`hoc-git-commit`).

**Not every type is a verb, and that is not a defect.** `🚚 Migrate` names a kind of work that the
commit vocabulary deliberately leaves out, and `📄 Specification` names an artefact rather than an
action.

## Where a hub differs

**`✅ Tasks` is the one type whose body is shaped differently.** It carries the situation and the
direction, then its children:

```markdown
# As-is

* <the situation the whole group of work sits in>

# To-be

* <the direction, across all of it>

# Note

* <what holds across the children — ordering, release dependencies>

# Sub-issues

- [ ] 💪 <a child>
- [ ] 🧪 <another>
```

**No `# Checklist`.** A hub with work of its own is not a hub; that work belongs in one of the
children.

**A piece of work spanning two repositories is the ordinary case for a hub.** One issue per
repository, gathered under it, with the ordering between them stated in the hub's `# Note`.
