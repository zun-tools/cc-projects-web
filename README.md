# cc-projects-web

Claude Code Projects で、2つのリポジトリにまたがる仕事を試すためのサンプルです（Web 画面側）。
組になる API 側は [cc-projects-api](https://github.com/zun-tools/cc-projects-api) です。

依存なしの素の JavaScript。`src/api.js` が API の **`/v1/items`（v1）** を呼んで一覧を出し、`index.html` が表示します。
API のベース URL は `src/config.js` の1か所だけです。

## 使い方

```bash
# 別ターミナルで cc-projects-api を起動（ポート 8000）してから
python3 -m http.server 8080   # http://localhost:8080/ を開く
node --test                   # テスト（Node 20 以上）
```

※ ブラウザから別ポートの API を呼ぶ場合は API 側に CORS 設定が要ります（このサンプルには入れていません）。

## English

A dependency-free vanilla JavaScript page for trying Claude Code Projects on work that spans two repositories
(this is the web side; the API side is [cc-projects-api](https://github.com/zun-tools/cc-projects-api)).
`src/api.js` calls the API's **`/v1/items` (v1)** and `index.html` renders the list. The base URL is set only in `src/config.js`.
Tests: `node --test` (Node 20+).

License: MIT
