# Skills

*[日本語](./skills.ja.md)*

A catalog of every skill in this package, with a one- or two-line summary each.

Each skill lives at `kit/skills/<name>/`, directly under the skills directory, and that folder name is both the skill's `name:` and the folder name it is installed under. **Skill** below is therefore all you need: it is what you invoke as `/name`, what appears under `.claude/skills/` once installed, and where the source sits. The prefix is four characters, the hyphen included, and its third character names the library — see [the build convention](https://github.com/openreachtech/hora-skills-ort-support/blob/main/.claude/skills/build/SKILL.md) for the layout and the naming rules. Full guidance for a skill is in its own `SKILL.md`, and in the `references/` beside it where a skill needs one — a skill that fits in one file carries no `references/`, and each `SKILL.md` that has references says which of them settles what.

| Skill | Summary |
| :-- | :-- |
| `hos-explain` | Rewrite an AI-generated explanation, report or proposal into plain language with diagrams, so a reader with no technical background can understand it in one read. It rewrites an existing message and adds no new analysis. |
| `hos-gh-issue` | Write a GitHub issue for this organization — a title carrying its type emoji, and a body of `As-is`, `To-be`, `Note`, `Checklist` and `Sub-issues` — shown in full first, then filed with `gh issue create` once you say so, and handed over as text alone where `gh` is missing or logged out. It states where things stand and which direction to take; how the work is carried out belongs to the pull request. |
| `hos-gh-pull-request` | Write a pull request — a title carrying the linked issue's type emoji, and a body of `# Why` carrying the issue it closes, `# How` carrying the approach taken, and `# Note` where something has to be watched — shown in full first, then opened with `gh pr create --draft` once you say so, and handed over as text alone where `gh` is missing or logged out. It states how the work was carried out, works out its base branch from the trunk marker above it, defaults the reviewer and the assignee, and covers the merge-only line a pull request that merges a trunk turns on. |
| `hos-gh-release-note` | Write a release note for a tag and send it — a body of `# What's Changed` carrying the change itself and `# Change Log` carrying nothing but the compare link, its `##` sections taken from a fixed list, and dependency moves in a table per `package.json` field with a third table for `overrides:`. It works the range out from the tag and the tag before it, shows and confirms every body before it is sent, and creates a new release as a draft. |
| `hos-humanize-docs` | Repair a maintained document so a first-time reader stops stalling on it: an agent with no prior knowledge reports where it stalled, each stall is classified against written criteria, and the document is fixed, looping until the findings fall inside a threshold. Structure, voice and intended reader all stay. |
| `hos-skillify` | Build a skill out of the conversation you are in — mine its transcript, decide what is durable convention, and hand the result to the skill-writing convention. Material that turns out not to be a convention is reported and dropped. |
| `hos-user-manual` | Generate end-user operation manuals by driving the system for real: walk each feature in the UI of a running environment, and write one HTML page per feature with screenshots, plus a table-of-contents page bound to the product version. |

## Where the boundaries are

They overlap less than their summaries suggest, and each says in its own `SKILL.md` what it hands over rather than doing:

- **`hos-explain` rewrites, it does not investigate.** What it is given is already an answer; it makes that answer readable by somebody who did not follow the thread. A question that needs new analysis belongs to whatever skill covers the analysis.
- **`hos-humanize-docs` repairs a document; it does not rewrite one for a different reader.** The structure, the voice and the intended reader all stay, and the technical terms stay with them. Rebuilding a message so that somebody outside the field can read it is `hos-explain`'s job.
- **`hos-user-manual` writes for the product's users, not for its developers.** It needs a running environment to walk through — building that environment is the backend package's job — and what it produces is the manual a customer reads.
- **`hos-gh-issue` shows the text before it files anything.** Nothing reaches GitHub until you say so, and where `gh` is missing or logged out the text is the whole of what you get. Converting a `# Sub-issues` line into a sub-issue and checking a box stay a person's actions. It states where things stand and which direction to take, and leaves how the work is carried out to the pull request.
- **`hos-gh-pull-request` states how the work was carried out, and links to the issue for why.** It never restates where things stood or which direction to take — those are the issue's, one click away, and a second copy of them disagrees with the first as soon as either is edited. What it opens is always a draft, because whether the work is ready to be looked at is a person's judgement.
- **`hos-gh-release-note` writes for whoever is deciding whether to upgrade.** It carries what changed, what could break and what has to be done about it, and never a record of the work — which is why the generated list of merged pull requests is dropped rather than extended. A new release is created as a draft; a published body is never dropped to draft to make it safe, because that regresses what the repository advertises as its latest release. On a new major it keeps what is already gone apart from what is merely on its way out, because the two ask different things of the reader.
- **`hos-skillify` produces skills only.** It mines a settled conversation for what is durable, and the naming, the `description:` and the file layout of what it produces belong to the skill-writing convention it hands off to.

## Installing them

```sh
npm install -D @openreachtech/hora-skills-ort-support
npx --no hora-skills-ort-support install
```

The [README](https://github.com/openreachtech/hora-skills-ort-support/blob/main/README.md) covers the `postinstall` hook, installing more than one domain into the same `.claude/skills/`, and keeping an installation current.
