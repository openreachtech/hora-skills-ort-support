# Wording Rules

The bar for every sentence: a junior-high-school student reads it once and does not stop.

## Sentence rules

- **One idea per sentence.** Split at every "、〜が、", "、〜し、", "; " and " but ".
- **About 40 characters per sentence in Japanese** (about 15 words in English). This is a limit,
  not a target to fill.
- **Active voice.** Name who does what: 「サーバーがパスワードを確認します」, not
  「パスワードの検証が行われます」.
- **Verbs over abstract nouns.** 「速くする」 not 「高速化を実現する」; "check" not "perform
  validation".
- **No hedging chains and no double negatives.** 「〜の可能性も考えられなくはない」 becomes
  「〜かもしれない」, or gets dropped during extraction.
- **Give numbers a feel.** "300ms" alone means nothing to this reader. "0.3秒 — まばたきくらい"
  does. Round to the precision the decision needs.

## Jargon substitution

First appearance: everyday word + original term in parentheses. After that: everyday word alone.

「設計図(スキーマ)を直してから…その設計図に合わせて…」

Substitutions that work for terms common in this stack:

| Term | Everyday substitution |
|---|---|
| データベース / DB | データを保存しておく場所(データベース) |
| スキーマ | データベースの設計図(スキーマ) |
| マイグレーション | データベースの作り変え作業(マイグレーション) |
| API | プログラム同士の窓口(API) |
| キャッシュ | 一度調べた結果のメモ(キャッシュ) |
| ジョブキュー | あとでやる仕事の順番待ちリスト(ジョブキュー) |
| デプロイ | 作ったものを本番に置くこと(デプロイ) |
| リクエスト / レスポンス | 問い合わせ / その返事 |
| バリデーション | 入力内容のチェック(バリデーション) |
| タイムアウト | 待ち時間切れ(タイムアウト) |
| 認証 | 本人確認(認証) |
| セッション | ログイン中であることの記録(セッション) |

The table is a starting point. Substitute any other term the same way: say what it does, in words
the reader already knows, with the original in parentheses once.

## Analogies

- One analogy per term, one line. An analogy that needs its own explanation is worse than none.
- Draw from shared everyday experience: school, shopping, mail, cooking. Do not draw from other
  technology ("like Docker but…" explains nothing to this reader).
- Do not let the analogy overclaim. If the real mechanism differs in a way that matters to the
  reader's decision, drop the analogy.

## What extraction drops

These almost never survive into the plain version:

- Methodology ("3つの観点でレビューした結果…") — the reader needs the findings, not the process.
- Options that were considered and rejected, unless the reader is the one choosing.
- Caveats that do not change the reader's action.
- Apologies, praise, and filler ("ご指摘の通り…", "素晴らしい質問です").

The test for every fact is always the same: **does the reader act differently without this?**
If no, drop it.
