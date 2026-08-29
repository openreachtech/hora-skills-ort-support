# Feature Page Template

One feature = one HTML file under `features/`. Every page uses the same skeleton and the same
shared stylesheet, so the whole manual reads as one document.

## Page skeleton

`features/<feature>.html`:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ログイン | 利用マニュアル v0.3.0</title>
  <link rel="stylesheet" href="../assets/manual.css">
</head>
<body>
  <header class="page-header">
    <a class="toc-link" href="../index.html">← 目次へ戻る</a>
    <p class="version">v0.3.0</p>
  </header>

  <main>
    <h1>ログイン</h1>
    <p class="lead">登録済みのアカウントでシステムにサインインします。</p>

    <section class="step">
      <h2><span class="step-no">1</span>ログイン画面を開く</h2>
      <p>ブラウザでシステムの URL を開くと、ログイン画面が表示されます。</p>
      <figure>
        <img src="../assets/images/login-1.png" alt="ログイン画面">
        <figcaption>ログイン画面</figcaption>
      </figure>
    </section>

    <section class="step">
      <h2><span class="step-no">2</span>メールアドレスとパスワードを入力する</h2>
      <p>登録したメールアドレスとパスワードを入力し、「ログイン」ボタンを押します。</p>
      <figure>
        <img src="../assets/images/login-2.png" alt="入力済みのログインフォーム">
        <figcaption>入力後、「ログイン」ボタンを押す</figcaption>
      </figure>
      <aside class="note">パスワードを忘れた場合は「パスワードを忘れた方」から再設定できます。</aside>
    </section>
  </main>

  <nav class="pager">
    <a class="prev" href="./previous-feature.html">← 前:○○</a>
    <a class="next" href="./next-feature.html">次:○○ →</a>
  </nav>
</body>
</html>
```

## Page rules

- **Title** is `<feature name> | 利用マニュアル v<version>` — the version is visible in the tab.
- **Lead paragraph**: one sentence, what the user gets done with this feature. Write for the end
  user: name things as the screen names them, not as the code does.
- **One `section.step` per operation step**, numbered by `span.step-no`, in the order actually
  performed. A step is one user action and its visible result.
- **Every step has a screenshot** (`figure > img + figcaption`), referenced relatively as
  `../assets/images/<feature>-<step>.png`. The caption says what the reader should see or do,
  not what the file is.
- **`aside.note`** holds a tip or warning the reader may need at that step. Use it rarely.
- **`nav.pager`** links the previous and next feature in TOC order. The first page has no `prev`,
  the last page has no `next`. `← 目次へ戻る` appears on every page.
- No external CDNs. No scripts needed to read the page. The manual must open from the local
  filesystem.

## Shared stylesheet

Written once per manual version, to `assets/manual.css`:

```css
:root {
  --ink: #24292f;
  --ink-soft: #57606a;
  --line: #d8dde3;
  --accent: #2b5a8c;
  --accent-soft: #eaf1f8;
  --paper: #ffffff;
  --note-bg: #fff8e6;
  --note-edge: #d4a72c;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
  line-height: 1.9;
}

main { max-width: 46rem; margin: 0 auto; padding: 1rem 1.5rem 4rem; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  border-bottom: 1px solid var(--line);
}

.page-header .toc-link { color: var(--accent); text-decoration: none; }

.page-header .version { color: var(--ink-soft); font-size: 0.85rem; margin: 0; }

h1 { font-size: 1.7rem; line-height: 1.4; margin: 1.6rem 0 0.4rem; }

.lead { color: var(--ink-soft); margin-top: 0; }

.step { margin-top: 2.5rem; }

.step h2 {
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent-soft);
}

.step-no {
  display: inline-grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 0.9rem;
  flex: none;
}

figure { margin: 1.2rem 0; }

figure img {
  max-width: 100%;
  border: 1px solid var(--line);
  border-radius: 6px;
}

figcaption { color: var(--ink-soft); font-size: 0.85rem; margin-top: 0.4rem; }

.note {
  background: var(--note-bg);
  border-left: 3px solid var(--note-edge);
  padding: 0.7rem 1rem;
  border-radius: 0 6px 6px 0;
  font-size: 0.92rem;
}

.pager {
  display: flex;
  justify-content: space-between;
  max-width: 46rem;
  margin: 0 auto;
  padding: 1rem 1.5rem 3rem;
  border-top: 1px solid var(--line);
}

.pager a { color: var(--accent); text-decoration: none; }
```

Adjust `--accent` to the product's brand color when it has one. Keep everything else the same, so
manuals of different versions look alike.
