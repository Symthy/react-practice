# React Memo

## create react app (TS)

```
npx create-react-app my-app --template typescript

npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## 型付け

- [React + TypeScriptでpropsと型を便利に扱うTips集](https://zenn.dev/so_nishimura/articles/e9afde3b7dc779)
- [【初心者】React × TypeScript 基本の型定義](https://zenn.dev/ogakuzuko/articles/react-typescript-for-beginner)

React.FC には Props に暗黙的にchildrenが含まれるため非推奨?
```ts
// v18.0.0 時点
type React.PropsWithChildren<P> = P & {
    children?: ReactNode;
}
```

propsとしてchildrenを受け取る際は、propsの型定義の中に明示的にchildrenを含めるようにした方が良さそう
```ts
type Props = {
  text: string
  children: React.ReactNode
}

const SampleComponent: React.VFC<Props> = (props) => {
  return (
    <div>
      <h1>Hello {props.text}!</h1>
      <p>{props.children}</p>
    </div>
  )
}

const Parent: React.VFC = () => {
  return (
    <SampleComponent text="TypeScript">
      children
    </SampleComponent>
  )
}
```

### TS 型

- [TypeScriptでclassのプロパティ名のみの型の定義方法](https://zenn.dev/shun_kominato/articles/00f008c1090fa4)

```ts
type Attributes<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? never : P;
}[keyof T];
```


## ステート

ステート：コンポーネントの描画後に更新されるデータ

ステートの管理は上位コンポーネントで行う。下位コンポーネントの操作でステートを更新する場合は、
下位コンポーネントにステート更新用の関数を譲渡、それを実行することで更新を実現する。


```ts
// 親
type StarRatingProps = {
  totalStars?: number
}

const StarRating: FC<StarRatingProps> = ({ totalStars = 5 }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)} // ステート更新用関数譲渡
        />
      ))}
      <p>{selectedStars} of {totalStars} stars </p>
    </>
  )
}

// 子
type StarProps = {
  selected: boolean,
  onSelect: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}

const Star: VFC<StarProps> = ({ selected = false, onSelect = fn => fn }) => (
  <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />  // 操作されたらステート更新
);
```
