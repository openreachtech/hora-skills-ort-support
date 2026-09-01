# Skills

A catalog of every skill in this package — 3 in total — with a one- or two-line summary each.

Each skill lives at `kit/skills/<name>/`, directly under the skills directory, and that folder name is both the skill's `name:` and the folder name it is installed under. **Skill** below is therefore all you need: it is what you invoke as `/name`, what appears under `.claude/skills/` once installed, and where the source sits. The prefix is four characters, the hyphen included, and its third character names the library — see [the build convention](https://github.com/openreachtech/hora-skills-ort-support/blob/main/.claude/skills/build/SKILL.md) for the layout and the naming rules. Full guidance for a skill is in its own `SKILL.md` and in the `references/` beside it — all three here carry one, and each `SKILL.md` says which of its references settles what.

| Skill | Summary |
| :-- | :-- |
| `hos-explain` | Rewrite an AI-generated explanation, report or proposal into plain language with diagrams, so a reader with no technical background can understand it in one read. It rewrites an existing message and adds no new analysis. |
| `hos-skillify` | Build a skill out of the conversation you are in — mine its transcript, decide what is durable convention, and hand the result to the skill-writing convention. Material that turns out not to be a convention is reported and dropped. |
| `hos-user-manual` | Generate end-user operation manuals by driving the system for real: walk each feature in the UI of a running environment, and write one HTML page per feature with screenshots, plus a table-of-contents page bound to the product version. |

## Where the boundaries are

The three overlap less than their summaries suggest, and each says in its own `SKILL.md` what it hands over rather than doing:

- **`hos-explain` rewrites, it does not investigate.** What it is given is already an answer; it makes that answer readable by somebody who did not follow the thread. A question that needs new analysis belongs to whatever skill covers the analysis.
- **`hos-user-manual` writes for the product's users, not for its developers.** It needs a running environment to walk through — building that environment is the backend package's job — and what it produces is the manual a customer reads.
- **`hos-skillify` produces skills only.** It mines a settled conversation for what is durable, and the naming, the `description:` and the file layout of what it produces belong to the skill-writing convention it hands off to.

## Installing them

```sh
npm install -D @openreachtech/hora-skills-ort-support
npx --no hora-skills-ort-support install
```

The [README](https://github.com/openreachtech/hora-skills-ort-support/blob/main/README.md) covers the `postinstall` hook, installing more than one domain into the same `.claude/skills/`, and keeping an installation current.
