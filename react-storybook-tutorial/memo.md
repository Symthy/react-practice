# Memo

## storybook

- [公式チュートリアル(EN)](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)
- [公式チュートリアル(JA)](https://storybook.js.org/tutorials/intro-to-storybook/react/ja/get-started/)

```
npx degit chromaui/intro-storybook-react-template taskbox
cd taskbox
yarn
```

```
# test
yarn test --watchAll
# run storybook
yarn storybook
# run frontend app
yarn start
```

### accessibility tests

アクセシビリティ・テストとは、WCAG ルールや業界で受け入れられているベスト・プラクティスに基づいた一連の経験則に対して、自動化されたツールを使用してレンダリングされた DOM を監査する方法。

これらは、視覚障害、聴覚障害、認知障害などの障害を持つユーザーを含む、できるだけ多くのユーザーがアプリケーションを使用できるようにする、露骨なアクセシビリティ違反をキャッチするための QA の最初のラインとして機能する。

Storybook には公式のアクセシビリティアドオンが含まれている。Deque の axe-core を使用しており、WCAG の問題の 57%を処理可能。

```
yarn add --dev @storybook/addon-a11y
```

main.js に追加

```
addons: [
    :
    '@storybook/addon-a11y',
  ]
```

## CDD（コンポーネント駆動開発）

[Component Driven User Interfaces](https://www.componentdriven.org/)

モジュール化されたコンポーネントを使用してユーザー・インタフェースを構築するための開発および設計プラクティス。UI は 「ボトムアップ」 から構築され、基本コンポーネントから始まり、段階的に結合されてスクリーンを組み立てる。

現代のユーザインターフェースは複雑。大規模に UI はもろい、デバッグ困難、出荷にじかんがかかるため、モジュール方式に分解することで、「堅牢で柔軟な UI を容易に構築可能」

- コンポーネントは、アプリケーションのビジネス・ロジックから状態を分離することで、互換性を実現
- 複雑な画面を単純なコンポーネントに分解可能
- 各コンポーネントには、明確に定義された API とモック化された一連の状態があるため、コンポーネントを分解して再構成し、さまざまな UI を構築可能

### How to

1. 一度に 1 つのコンポーネントを構築

各コンポーネントを個別にビルドし、関連する状態を定義する（小さく始める）

例：Avatar, Button, Input, Tooltip

2. コンポーネントを結合

小さなコンポーネントを一緒に構成し、複雑さを徐々に増しながら、新しい機能をアンロック。

例：Form, Header, List, Table

3. ページのアセンブル

複合コンポーネントを組み合わせてページを構築する。モックデータを使用して、到達しにくい状態やエッジケースのページをシミュレートする。

例：Home page, Settings page, Profile page

4. ページをプロジェクトに統合

データを接続し、ビジネスロジックをフックすることで、アプリにページを追加する（サービスに統合/バックエンド API と連携）

例：Web app, Marketing site, Docs site

### メリット

- 品質

コンポーネントを分離してビルドし、関連する状態を定義することで、UI がさまざまなシナリオで動作することを確認可能。

- 耐久性

コンポーネントレベルでテストすることで、バグを詳細に特定可能。テスト画面よりも作業が少なく正確。

- 速度

コンポーネントライブラリまたは設計システムから既存のコンポーネントを再利用することで、UI を高速にアセンブルできる。

- 効率性

UI を個別のコンポーネントに分解し、異なるチームメンバー間で負荷を共有することで、開発と設計を並列化できる。

ref: [Component-Driven Development](https://www.chromatic.com/blog/component-driven-development/)

### standard tool

[Component Story Format](https://github.com/ComponentDriven/csf)

- シンプル: コンポーネント“ストーリー”の記述は、クリーンで広く使用されているフォーマットを使って ES 6 関数をエクスポートするのと同じくらい簡単。

- 非独自仕様: CSF にはベンダー固有のライブラリは必要ない。

- 宣言型: 宣言型構文は、MDX のような高レベルのフォーマットと同型であり、クリーンで検証可能な変換を可能にする。

## Redux (Quick Start)

Redux ストア

```typescript
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
```

```typescript
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

configureStore を使用する場合、追加の入力は必要ないが、必要に応じて、RootState 型と Dispatch 型を抽出する必要がある。

ストア自体からこれらの型を推測することは、state slices を追加したりミドルウェア設定を変更したりすると、正しく更新されることを意味する。

アプリケーションで使用する際は、以下フックの作成推奨

- useDispatch フック
- useSelector フック

- useSelector の場合、毎回`(state:RootState)`と入力する必要がありません。
- useDispatch の場合、既定の Dispatch 型は thunks を認識しません。正しく thunks を dispatch するには、thunk middleware types を含むストアから特定のカスタマイズされた AppDispatch 型を使用し、それを useDispatch と共に使用する必要がある。事前に型指定された useDispatch フックを追加すると、必要な場所に AppDispatch をインポートすることを忘れずに済む。

```typescript
// app/sotre.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

const TasksSlice = createSlice({
  name: "taskbox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
});

// Redux ストア
export const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

// ストア自体から`RootState`型と`AppDispatch`型を推測する
export type RootState = ReturnType<typeof store.getState>;
// 推定型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// 単純な`useDispatch`と`useSelector`の代わりにアプリ全体で使用する
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

```typescript
// 発行
const pinTask = (value) => {
  dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
};
```
