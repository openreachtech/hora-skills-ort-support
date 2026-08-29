# Table of Contents Template

`index.html` is **required**. Readers start here, and every feature page links back here. A
manual set without it is incomplete.

## Required content

| Item | Where |
|---|---|
| Product name and「利用マニュアル」 | `h1` |
| Target version (`v<version>`) | Header, visible without scrolling |
| Generation date | Header |
| Every feature page, linked, in reading order | The list — every published page must appear in it |
| One-line summary per feature | Under each link |

## Skeleton

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>利用マニュアル v0.3.0 | <product name></title>
  <link rel="stylesheet" href="./assets/manual.css">
</head>
<body>
  <main>
    <h1><product name> 利用マニュアル</h1>
    <p class="lead">対象バージョン:v0.3.0 / 作成日:2026-08-24</p>

    <section class="step">
      <h2>はじめに</h2>
      <ol class="toc">
        <li>
          <a href="./features/login.html">ログイン</a>
          <p>アカウントでシステムにサインインする</p>
        </li>
      </ol>
    </section>

    <section class="step">
      <h2>基本操作</h2>
      <ol class="toc">
        <li>
          <a href="./features/user-registration.html">ユーザー登録</a>
          <p>新しい利用者を登録する</p>
        </li>
        <!-- one li per feature page, in reading order -->
      </ol>
    </section>
  </main>
</body>
</html>
```

Add to `assets/manual.css` for the TOC list:

```css
.toc { padding-left: 1.4rem; }

.toc li { margin: 0.8rem 0; }

.toc a { color: var(--accent); font-weight: 600; text-decoration: none; }

.toc p { margin: 0.1rem 0 0; color: var(--ink-soft); font-size: 0.9rem; }
```

## TOC rules

- **Reading order, grouped when it helps.** Order features as a new user meets them: signing in
  first, everyday operations before administration. Group under `h2` headings only when there
  are enough features for groups to help scanning (roughly 8 or more). A short manual keeps one
  flat list.
- **The TOC is the completeness check.** After writing, check both directions: every file under
  `features/` appears in the TOC, and every TOC link points to a file. Fix any mismatch before
  finishing.
- **The pager follows the TOC.** The previous/next links on feature pages use TOC order, so
  decide the TOC order before filling in the pagers.
- The feature list was confirmed with the user before writing began. Do not change the scope
  here.
