# Skills

*[日本語](./skills.ja.md)*

A catalog of every skill in this package — 6 in total — with a one- or two-line summary each.

Each skill lives at `kit/skills/<name>/`, directly under the skills directory, and that folder name is both the skill's `name:` and the folder name it is installed under. **Skill** below is therefore all you need: it is what you invoke as `/name`, what appears under `.claude/skills/` once installed, and where the source sits. The prefix is four characters, the hyphen included, and its third character names the library — see [the build convention](https://github.com/openreachtech/hora-skills-ort-support/blob/main/.claude/skills/build/SKILL.md) for the layout and the naming rules. Full guidance for a skill is in its own `SKILL.md`, and in the `references/` beside it where a skill needs one — a skill that fits in one file carries no `references/`, and each `SKILL.md` that has references says which of them settles what.

| Skill | Summary |
| :-- | :-- |
| `hos-explain` | Rewrite an AI-generated explanation, report or proposal into plain language with diagrams, so a reader with no technical background can understand it in one read. It rewrites an existing message and adds no new analysis. |
| `hos-humanize-docs` | Repair a maintained document so a first-time reader stops stalling on it: an agent with no prior knowledge reports where it stalled, each stall is classified against written criteria, and the document is fixed, looping until the findings fall inside a threshold. Structure, voice and intended reader all stay. |
| `hos-skillify` | Build a skill out of the conversation you are in — mine its transcript, decide what is durable convention, and hand the result to the skill-writing convention. Material that turns out not to be a convention is reported and dropped. |
| `hos-user-manual` | Generate end-user operation manuals by driving the system for real: walk each feature in the UI of a running environment, and write one HTML page per feature with screenshots, plus a table-of-contents page bound to the product version. |
| `hos-write-issue` | Write a GitHub issue for this organization — a title carrying its type emoji, and a body of `As-is`, `To-be`, `Note`, `Checklist` and `Sub-issues` — handed back inside a fenced block so it can be pasted straight into the form. It states where things stand and which direction to take; how the work is carried out belongs to the pull request. |
| `hos-write-pull-request` | Write a pull request — a title carrying the linked issue's type emoji, and a body of `# Why` carrying the issue it closes, `# How` carrying the approach taken, and `# Note` where something has to be watched — handed back inside a fenced block. It states how the work was carried out, and covers the merge-only line a pull request that merges a trunk turns on. |

## Where the boundaries are

The six overlap less than their summaries suggest, and each says in its own `SKILL.md` what it hands over rather than doing:

- **`hos-explain` rewrites, it does not investigate.** What it is given is already an answer; it makes that answer readable by somebody who did not follow the thread. A question that needs new analysis belongs to whatever skill covers the analysis.
- **`hos-humanize-docs` repairs a document; it does not rewrite one for a different reader.** The structure, the voice and the intended reader all stay, and the technical terms stay with them. Rebuilding a message so that somebody outside the field can read it is `hos-explain`'s job.
- **`hos-user-manual` writes for the product's users, not for its developers.** It needs a running environment to walk through — building that environment is the backend package's job — and what it produces is the manual a customer reads.
- **`hos-write-issue` produces text, and files nothing.** Opening the issue, converting a `# Sub-issues` line into a sub-issue, and checking a box are a person's actions. It states where things stand and which direction to take, and leaves how the work is carried out to the pull request.
- **`hos-write-pull-request` states how the work was carried out, and links to the issue for why.** It never restates where things stood or which direction to take — those are the issue's, one click away, and a second copy of them disagrees with the first as soon as either is edited.
- **`hos-skillify` produces skills only.** It mines a settled conversation for what is durable, and the naming, the `description:` and the file layout of what it produces belong to the skill-writing convention it hands off to.

## Installing them

```sh
npm install -D @openreachtech/hora-skills-ort-support
npx --no hora-skills-ort-support install
```

The [README](https://github.com/openreachtech/hora-skills-ort-support/blob/main/README.md) covers the `postinstall` hook, installing more than one domain into the same `.claude/skills/`, and keeping an installation current.
