# モンスター・トラップ (Monster Trap)

1対1ターン制・対面レーン方式の心理カードゲーム。全5ターンで決着するスマホ向けWebゲーム。

## 技術スタック

- Vite + React + TypeScript
- Tailwind CSS v4

## セットアップ

```bash
npm install
npm run dev
```

## ルール概要

- プレイヤー・CPUともに同一の10枚デッキ（モンスターLv.1〜5、オトリ×2、罠×3）を使用。
- 毎ターン手札から2枚を選び、レーン1・レーン2に配置。
- 相手と向かい合ったカードの組み合わせで捕獲・防御・不発を判定（詳細は `src/game/engine.ts`）。
- 5ターン終了時、捕獲した相手モンスターの合計点が高い方の勝利。

## ディレクトリ構成

- `src/data/cards.ts` — カード定義とデッキ生成
- `src/game/engine.ts` — レーン対面判定ロジック
- `src/game/cpu.ts` — CPUの手札選択ロジック
- `src/game/reducer.ts` — ゲーム状態管理（useReducer）
- `src/components/` — UIコンポーネント
