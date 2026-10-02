# Prompts

The prompt each persona receives. Referenced from `SKILL.md`.

**Every prompt is built from the brief alone.** The persona line, the audience, the context and
the criteria come from what was settled before the panel; nothing else from the session is
carried in.

**A Japanese persona's prompt is the same prompt, written in Japanese.** Translate the whole of
it, the persona line included, and leave only the candidates in their own spelling — the name is
the thing being read, so it reaches every persona exactly as it would reach them in use.

## The persona line

Each prompt opens with one line that sets who is answering.

| Persona | Line |
| :-- | :-- |
| Japanese, 30s | You are a Japanese web engineer in your 30s. |
| Japanese, 40s | You are a Japanese project manager in your 40s, formerly at a systems integrator. Your English is weak, and you do not play games. |
| Japanese, 20s | You are a Japanese frontend engineer in your 20s. You play games and use mods. |
| US, 30s | You are a senior backend engineer in the US, in your 30s. |
| UK, 40s | You are a technical writer and developer advocate in the UK, in your 40s. You are not a gamer. |
| Japanese, 50s | You are the president of a mid-size Japanese IT company, in your 50s. You approve what the company spends on tools. |
| Japanese, 60s | You are the CIO of a large Japanese enterprise, in your 60s. You read almost no English. |

**The line describes the persona and stops.** It says nothing about what the persona is expected
to think of the candidates, because that is the answer the panel exists to collect.

## Shared opening

After the persona line, every prompt carries the same three parts.

```
Answer by feel, as yourself, from a first reading. Do not use any tools, and do not look
anything up.

Who meets this: <the audience, and where they meet it>

What it is for: <the context — what the thing does, and the siblings it sits beside>
```

**The audience line is written for the persona.** Where the persona is not the audience — an
executive asked about a directory a developer opens — the line says how the name reaches them, so
they answer about the meeting they would actually have.

## Ranking

```
Candidates (in no particular order):
<the candidates, shuffled for this persona>

Rank every candidate, best first. Then:

1. For your top three, say why each reads well.
2. For your bottom three, say why each reads badly.
3. List any word you did not understand.
4. List any collision that worries you — a word that already means something else to you.

Hold every candidate to these criteria:
<the criteria, each on its own line>
```

**Shuffle per persona, and keep the shuffle.** The order each persona saw goes into the report's
working notes, so that a ranking that follows the listing order can be recognised for what it is.

## Single-name check

The check is two messages, not one, because the blind question has to be answered before the
explanation exists.

**First message:**

```
Here is a name: <X/>

What do you think it holds? Answer in a sentence or two, before anything else is said about it.
```

**Second message, once the first is answered:**

```
It is for: <the context>

1. What metaphor do you think the name intends?
2. Score it from 1 to 10 on each of:
   - meaning
   - fit with its siblings: <the siblings>
   - freedom from collision
   - English
   - overall
3. Would you adopt it? Yes or no, and why.

Hold it to these criteria:
<the criteria, each on its own line>
```

**The second message goes to the same agent that answered the first**, continued rather than
launched again. The seven first messages go out in parallel, and each agent is continued once its
guess is in. A new agent reading the
explanation would be scoring a name it never read blind, and the scores would stop being tied to
the guess they follow.
