# Classification (adding to a skill that exists)

How a harvested fact is placed against what a skill already says, and what to do when it
says the opposite. Referenced from `SKILL.md`.

## The five relations

Every fact stands in exactly one relation to the target skill:

| Relation | The skill's state | What the write does |
| :-- | :-- | :-- |
| New | Says nothing on the matter | Append |
| Sharpens | Says something vague that the fact makes precise | Rewrite that wording |
| Exception | Says something that holds generally, and the fact carves out a case | Add the clause |
| Contradicts | Says the opposite | **Interview.** Nothing is written yet |
| Covered | Says it already | Drop |

This is the verdict column of the outline at the gate.

Only `New` appends. The other three that write anything **change text that is already
there**, which is why adding to a skill is not the same operation as creating one.

## `Covered` means covered by the target, and nothing else

The five relations are claims about **the target skill**. Nothing outside it settles any of
them — not a standing instruction in the environment the run happens in, not a memory, not a
convention the author knows by heart.

**A fact the environment already states is still `new` for the skill.** A skill is a
portable, independent artefact. It gets installed into repositories whose owners never saw
the instructions it was authored under, and it has to be complete for them. Leaving a rule
out because "the standing instruction already covers it" makes the skill complete for its
author alone — the same failure as resting a convention on an external link.

- This cuts against the instinct that stating a rule twice is duplication. Between a skill
  and an instruction outside it **there is no duplication to avoid**, because the two do not
  travel together: one is published, the other stays behind.
- The check is mechanical. **Could a reader holding only this skill follow the rule?** If
  not, the rule belongs in the skill, whatever else happens to state it.
- The one place duplication is a real question is between **two skills**, and that is a
  different test — see the last section of this file.

## Read the whole skill

**Each of the five is a claim about the skill as a whole**, and one of them is a claim that
something is absent:

| Relation | What has to be shown |
| :-- | :-- |
| Covered | It is written somewhere |
| Sharpens | A vague rule exists |
| Exception | A general rule exists |
| Contradicts | An opposing passage exists |
| **New** | **It is written nowhere** |

Absence cannot be established from a sample. Read `SKILL.md` and every file under
`references/` before classifying anything.

**Reading the index and searching the rest was tried and rejected.** A search only finds a
rule that shares vocabulary with the fact, and rules are not written in the words of the
thread that would later refine them. In one measured case the rule at issue was headed
*"Do not define shared variables outside `describe()` (at file scope)"* while the fact
refining it was *"a shared `cases` belongs once under the member describe"* — one word in
common, and a search built on the fact's own vocabulary would have returned nothing and
the fact would have been filed as `New`. The duplicate would then have shipped.

The cost is real: a large skill runs to several thousand lines across `SKILL.md` and its
`references/`. It is smaller than the cost of getting this wrong, which is a published
skill that contradicts itself or says the same thing twice in two places that will drift
apart. The one-skill-per-run bound keeps the cost to a single reading, done once in
phase 3 and carried through phases 4 and 5.

## Sharpens, or an exception, or a contradiction

These three are easy to confuse, and confusing them writes the wrong thing.

- **Sharpens** — the existing rule is right but imprecise, and the fact supplies the
  precision. The rule's scope does not change.
- **Exception** — the existing rule is right within its scope, and the fact shows a case
  that falls outside it. The rule stands; a clause is added beside it.
- **Contradicts** — the fact says the rule is wrong where the rule claims to apply.

The test that separates the second from the third: **ask whether the rule's own reason
still holds in the fact's situation.** Where the reason holds and the rule still fails,
the rule is wrong. Where the reason does not reach that situation at all, the rule was
never about it, and what looked like a contradiction is an exception.

A case that ran this way: a skill said test code must not share values between blocks,
because shared state hides which block depends on what. A thread then established that one
particular array **must** be shared, because two checks have to run against the same array
or one of them verifies nothing. The reason behind the rule — hidden dependencies — does
not reach that case, where the dependency is the point. So it was an exception, not a
contradiction, and the rule kept standing with a clause beside it.

## The interview

A contradiction is not a wall. **It is the best opportunity there is to fix a defect in
the existing skill**, and a run that only refuses to write throws that away.

Put four questions:

| Question | What it separates |
| :-- | :-- |
| Is the clash even in one register? | A measurement and a decision answer different questions, and two answers to different questions are not in conflict |
| Does the fact's situation fall inside the scope the rule states? | Outside it, this is not a contradiction at all |
| What concretely breaks if the rule is followed here? | Nothing breaking means this is a difference of taste |
| Is the rule's reason still valid, or inherited from conditions that changed? | A rule can outlive what made it right |

The first question does most of the work, and it is the one that used to be asked wrongly.
Comparing a fact's basis against a rule's on a single scale — measured beats asserted —
sounds decisive and misleads, because a measurement establishes **how something behaves**
while a decision establishes **how we will work**. Where a measured fact appears to
contradict a decision, what it usually shows is that the decision's reason does not reach
the case at hand, and the answer is an exception rather than a revision. A decision is
overturned by another decision.

Three outcomes:

- **Revise the existing rule.** The fact wins; the rule is rewritten and the thread's
  evidence goes in with it.
- **Add it as an exception.** The interview showed the rule's scope never covered this.
- **Reject the fact.** The rule holds for reasons the thread did not see.

Never resolve it by writing both. A skill holding two rules that contradict each other is
worse than one holding the wrong rule, because the reader cannot tell which to follow and
neither will be corrected.

## Where a fact belongs when two subjects both claim it

One fact can bear on two skills. Which happens decides whether it is written twice:

- **One subject is subordinate to the other** — write it in the primary, and have the
  other refer to it by the primary's name.
- **Neither governs the other** — write it in both.

Writing it in both is only safe when it is not the same text twice:

> **If the same sentence goes in two places, it is a copy. If it comes out as each
> domain's own way of saying it, it is not.**

A copy rots: one side gets corrected and the other stays wrong, with nothing to reveal the
gap. Two rules grown from one root do not, because each has its own trigger and its own
wording, and correcting one does not silently invalidate the other.

A measured pair: one root — *duplicating a thing whose identity is depended upon breaks
what depends on it* — surfaced in two domains as *"a shared `cases` belongs once under the
member describe"* and *"the two language versions of one document are one commit"*.
Different sentences, different triggers, neither a copy of the other.
