# NASA Photo Gallery (React + Vite)

This is a photo gallery web app using NASA's API. Built with React and Vite, it supports bilingual display (English/Japanese) via i18n.

## Features

- Fetch and display photos and videos from the NASA API
- Search by date range
- View images and videos in a modal
- Switch between English and Japanese (i18n support)

## Directory Structure

```
NasaApi/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── locales/
  │   ├── assets/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── i18n.js
  ├── .env.development
  ├── .env.production
  ├── package.json
  ├── vite.config.js
  └── README.md
```

## Getting Started

1. Install dependencies

   ```sh
   npm install
   ```

2. Start the development server

   ```sh
   npm run dev
   ```

3. Build for production

   ```sh
   npm run build
   ```

## Environment Variables

- Set `VITE_BASE_PATH` in `.env.development` and `.env.production` as needed.

## Tech Stack

- React
- Vite
- react-router-dom
- react-i18next
- NASA

# NASA Photo Gallery (React + Vite)

NASAのAPIを利用した写真ギャラリーWebアプリです。ReactとViteで構築され、i18nによる英語・日本語のバイリンガル対応をしています。

## 主な機能

- NASA APIから写真・動画を取得し表示
- 日付範囲で検索可能
- モーダルで画像・動画の拡大表示
- 英語/日本語の切り替え（i18n対応）

## ディレクトリ構成

```
NasaApi/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── locales/
  │   ├── assets/
  │   ├── App.jsx
  │   ├── main.jsx
  │   └── i18n.js
  ├── .env.development
  ├── .env.production
  ├── package.json
  ├── vite.config.js
  └── README.md
```

## セットアップ方法

1. 依存パッケージのインストール

   ```sh
   npm install
   ```

2. 開発サーバー起動

   ```sh
   npm run dev
   ```

3. ビルド

   ```sh
   npm run build
   ```

## 環境変数

- `.env.development` と `.env.production` で `VITE_BASE_PATH` を設定できます。

## 技術スタック

- React
- Vite
- react-router-dom
- react-i18next
- NASA API


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
