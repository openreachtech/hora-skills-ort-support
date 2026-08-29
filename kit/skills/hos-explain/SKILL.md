---
name: hos-explain
description: "Rewrite an AI-generated explanation, report or proposal into plain language with diagrams, so that a reader with no technical background — a junior-high-school student is the bar — can understand it in one read. Use when an AI answer is too long or too hard, when sharing a conclusion with non-engineers, or when asked to explain simply or with diagrams. It only rewrites an existing message and adds no new analysis; end-user product manuals belong to the user-manual skill."
---

# Explain

Turn a long, jargon-heavy AI message into text that a reader with no technical background can
understand in one read. The target reader is a **junior-high-school student**. If a sentence needs
a footnote for that reader, rewrite the sentence.

The input is a message that already exists: an explanation, a review result, a proposal, an error
analysis. This skill **only rewrites**. Do not add new analysis, conclusions, or facts. If the
original is wrong, the plain version stays wrong in the same way. Fixing content is a different
task.

## Core rule: rebuild, do not shorten

A shorter hard text is still hard. Throw away the original structure and rebuild:

1. **Extract first, write second.** Before writing, pull out only the sentences that change what
   the reader decides or does. Drop everything else: hedges, methodology, options that were
   rejected. The test for each fact: "Does the reader act differently without this?" If no, drop
   it.
2. **Use the fixed format.** Every output has the same four parts in the same order
   ([`references/output-format.md`](./references/output-format.md)). A reader who has seen one
   output can read all of them.
3. **Always include a diagram.** Structure, order, and relationships are hard to read in prose.
   Put them in a diagram instead. Use one or two diagrams, chosen by the shape of the content
   ([`references/diagram-catalog.md`](./references/diagram-catalog.md)).

## The four parts

| # | Part | Rule |
|---|---|---|
| 1 | **Conclusion** | One sentence, about 40 characters in Japanese (about 15 words in English). What this is, or what the reader should do. Nothing comes before it. |
| 2 | **Diagram** | 1–2 diagrams. Mermaid is the first choice. At most 5 elements per diagram. One message per diagram. |
| 3 | **Points** | At most 3 bullets. One sentence each. |
| 4 | **Words** | A small glossary. Only the technical terms the output could not avoid, one line each, each with an everyday analogy. Skip this section when no term is left. |

The full format, with a good example and a bad example, is in
[`references/output-format.md`](./references/output-format.md).

## Language rules

- **Write in the reader's language.** The reader is whoever the plain version will be shown to.
  Normally that is the person asking, so answer in the language they used.
- **Replace jargon with an everyday word**, and put the original term in parentheses the first
  time: 「設計図(スキーマ)」, "a to-do list the server works through (a job queue)". After the
  first time, use the everyday word alone.
- **Use active voice and verbs.** "The server checks the password", not "password validation is
  performed".
- **One idea per sentence.** A sentence with two clauses is two sentences.
- Full word-level rules, with a substitution table for common terms, are in
  [`references/wording-rules.md`](./references/wording-rules.md).

## Choosing the diagram

Pick by the shape of the content:

| The content is… | Draw |
|---|---|
| A procedure, a sequence of events | Flowchart (top to bottom) |
| Things and how they relate | Block diagram |
| A choice between options | Comparison table |
| Sizes, amounts, proportions | Bar lengths |
| Things happening over time | Timeline |

Mermaid snippets for each shape are in
[`references/diagram-catalog.md`](./references/diagram-catalog.md).

## Out of scope

- **Do not answer new questions.** If the original message does not answer the reader's question,
  say so. Do not fill the gap with new reasoning.
- **Do not soften bad news.** "The tests fail" stays "the tests fail". Plainer, never rosier.
- **Do not write product manuals.** A user-facing operation manual is the user-manual skill's
  job. This skill explains messages, not products.
