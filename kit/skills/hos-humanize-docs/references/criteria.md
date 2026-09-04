# Criteria

The eight criteria a stall is classified against, each with the test that decides it.
Referenced from `SKILL.md`.

**Every criterion carries a mechanical test.** Without one a criterion is taste, two reviewers
disagree about the same sentence, and the loop cannot say whether a round improved anything.

**These are not a list of known defects.** A collection of examples misses everything shaped
slightly differently, which is why each entry below is the rule and its test, and the example is
only there to show the shape.

---

## 1. Every word and reference resolves to exactly one thing

**Test.** Count what the word or the reference could point at. Two or more is a violation.

Applies to vocabulary and to demonstratives alike: both fail the same way, by leaving the reader
to choose.

```
Bad   その設定を書き換えてください
      ("that setting" — the paragraph named three)
Good  タイムアウトの設定を書き換えてください
```

**A demonstrative is not only harder to read — with two candidates it produces a wrong reading.**
A sentence naming two repositories and then saying "that repository's install command" sends half
its readers to the wrong one, and nothing tells them they went wrong.

**Proper nouns cost nothing to repeat.** Where a reference and a name would both work, the name
is the one a reader can act on.

---

## 2. Every sentence has an actor

**Test.** Point at who or what performs the action. If nobody can be pointed at, it is a
violation.

```
Bad   宣言された設定は読み込まれ、内容が展開され、適用されます
      (three actions, no actor anywhere)
Good  宣言された設定は、起動時にサーバーが読み込みます。内容は…
```

**A run of passives is worse than one.** A single passive sentence borrows its actor from the one
before; three in a row leave the reader holding nothing.

**Inversion hides the actor at the end.** 「〜するのは、Xです」 puts X in the final position, where
the reader has already given up looking for it. Restore the order: X does it.

**A permission is not an actor.** 「放っておいても構いません」 says the reader need not watch, and
never says what happens instead. Name what runs.

---

## 3. One claim per sentence, and the order is conclusion, reason, contrast

**Test.** Split the sentence at every 「〜であり、かつ〜」 and every 「〜が、」. Two or more pieces
is a violation. Then check that an instruction's reason does not sit behind its contrast.

No character limit. A long sentence carrying one claim is fine.

```
Bad   後の工程は放っておいても構いませんが、名前の並びが要件に変わるのはここで、
      どの段階も対話です
Good  どの段階も対話で、名前の並びが要件に変わるのはここです。後の工程は放っておいて
      構いません
```

**The reason for an instruction must not be buried.** A reader who stops after the first clause
has to leave with the instruction and its reason; a concessive clause in front of the reason
means they leave with neither.

---

## 4. Only vocabulary the reader holds by that point

**Test.** Find each term's first occurrence, and check whether the document introduced it before
that line.

Three outcomes, and only the first two are allowed:

| | |
| :-- | :-- |
| Introduce it at first use | 「まず渡されたものを読みます — これが第0段です」 |
| Drop the term and say the thing | 「第0段が読みます」 → 「最初に読みます」 |
| Use it and explain it later, or never | **violation** |

**An entry document owes more here than a reference document.** A term that is common ground in
the deep documentation is a stall on the page somebody opens first.

**This does not mean replacing technical terms with everyday ones.** The reader is whoever the
document was written for, and the terms stay. Introducing them is what changes.

---

## 5. The language's own words, not the traces of a translation

**Test.** Replace the suspect wording with how the thing is actually referred to in that
language. If meaning increases, the original was a violation.

```
Bad   2つの半分を示す文書        (the two halves — a translation artifact)
Good  2つの工程に分かれている

Bad   仕様「そのもの」の文書      (documents that ARE the spec — the emphasis does not carry)
Good  すでに内容が決まっている文書
```

**A translation can come out as a self-evident proposition.** "Two halves" says only that a whole
has two parts. Where the translated phrase carries no information, name what the parts are.

**Abstract nouns and abstract negations are the same defect.** 「Xは前提ではない」 reads as *X is
not needed*; name the act being excused instead — 「始める前にXを書いておく必要はない」.

**One language version is not a translation of the other.** Fixing the wording on one side does
not oblige the other side to change: see [`correspondence.md`](./correspondence.md) for which
differences are defects and which are not.

---

## 6. One concept, one word — across the whole document set

**Test.** Search the sibling documents for the concept. If they use a different word, the
document under repair is the one that is wrong.

```
One document wrote 受け入れ for a phase every sibling called 検収.
The word was invented in one file, and only a search found it.
```

**A term invented in a single file splits the vocabulary of the set.** Two words for one concept
make the set unsearchable, and a reader who learned one of them cannot find the other.

**The scope is the set, not the file.** A document internally consistent and externally unique is
still in violation.

---

## 7. Items in parallel take the same form

**Test.** List what each parallel item ends with. An item that ends differently is a violation.

```
Bad   1. リポジトリを作る
      2. 資料を入れる
      3. プロンプトで実行コマンド      (a noun — reads as a heading, not a step)
Good  3. プロンプトで実行する
```

Applies to numbered steps, list items, table cells in one column, and headings at one level.

**A single odd item changes what the reader thinks the list is.** One noun among verbs reads as a
label, and the reader stops treating the list as a sequence of actions.

---

## 8. The criteria apply outside the body text

**Test.** Run criteria 1 to 7 over the headings, the table headers, the lead-in sentences, the
list items and the annotations inside fenced blocks — the same way, not more leniently.

```
Bad   埋めながら知っておくとよいこと      (lead-in: filling what?)
Good  ファイルを置くときに知っておくとよいこと

Bad   | | 説明 |                          (an empty header: the reader cannot tell what the
                                           left column holds)
Good  | 対象 | 説明 |
```

**A defective heading costs more than a defective sentence.** Readers skim structure to decide
what to read, so a lead-in or a header that says nothing misdirects everything under it.

**An empty table header is a violation of criterion 1.** The reader cannot resolve what the
column holds, and has to infer it from the rows.
