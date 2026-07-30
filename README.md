# 近藤接骨院 1ページサイト

GitHubへそのままアップロードできる静的サイトです。

## 公開前に必ず変更する箇所

1. `script.js` 冒頭の `PHONE_NUMBER` と `LINE_URL`
2. `index.html` 内の院長名、正式住所、料金、受付時間
3. `assets` 内のサンプル写真

写真は、同じファイル名で上書きするとHTMLを変更せずに差し替えできます。

- `hero.webp`：トップの施術写真
- `doctor.webp`：院長写真
- `interior.webp`：施術室写真
- `oxygen.webp`：酸素カプセル写真

## GitHubへアップロードする方法

ZIPを解凍し、このフォルダ内の `index.html`、`style.css`、`script.js`、`assets` をリポジトリの一番上の階層へアップロードします。ZIPファイルそのものではなく、解凍後の中身をアップロードしてください。

## 素材について

- 院長・施術・院内・酸素カプセルの写真はAI生成の架空サンプルです。実在の院長・患者さま・院内写真ではありません。
- 症状イラストは「ソコスト」の配布素材を、2026年7月30日時点の利用規約に基づきダウンロードして同梱しています。著作権はソコスト運営者に帰属します。本サイト以外への素材単体での再配布・販売はしないでください。
- 利用規約：https://soco-st.com/guide

## ファイル構成

```text
kondo-seikotsuin/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── hero.webp
    ├── doctor.webp
    ├── interior.webp
    ├── oxygen.webp
    └── icon-*.png
```
