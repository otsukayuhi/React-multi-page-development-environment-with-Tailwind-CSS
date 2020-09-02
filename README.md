# React multi-page development environment with Tailwind CSS

React マルチページ開発環境です。各ページ毎に HTML ファイルを作成します。

- 使用技術
  - React
  - TypeScript
  - Tailwind CSS
  - PostCSS

## Setup

パッケージのインストール。

```sh
$ npm ci
```

## Development

### Command

ローカルサーバーが http://localhost:3000 で立ち上がります。

```sh
$ npm run dev
```

`dist/` 配下にビルドされたファイルが出力されます。

```sh
$ npm run build
```

TypeScript のトランスパイルに babel を使用しているため、トランスパイル時に型チェックが行われません。

チェックの際は以下のコマンドを使用してください。

```sh
$ npm run type-check
```

その他 `npm script` を参照してください。

### commit & push

Git のコミット・プッシュ時に、自動で以下の処理が走ります。

- commit
  - eslint --fix
  - stylelint --fix
  - prettier --write
- push
  - lint
  - prettier --check
  - type-check
  - test

### Settings

`project.config.js` で、開発環境の調整や、各ページの情報を設定できます。

## ディレクトリ

```
.
├── README.md
├── html
│   └── template.ejs
├── jest.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── project.config.js
├── public
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── images
│   │   └── sample.png
│   └── og.png
├── src
│   ├── components
│   │   ├── App
│   │   │   ├── index.tsx
│   │   │   └── styles.css
│   │   └── Title
│   │       ├── index.tsx
│   │       └── styles.css
│   ├── index.d.ts
│   ├── pages
│   │   └── top
│   │       └── index.tsx
│   └── utils
│       ├── sampleUtil.test.ts
│       └── sampleUtil.ts
├── tailwind.config.js
├── tsconfig.json
└── webpack.config.js
```
