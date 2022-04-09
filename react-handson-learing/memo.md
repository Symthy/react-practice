# React Memo

## create react app (TS)

```
npx create-react-app my-app --template typescript

npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## React + TS 型付け

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

### TS 型 メモ

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

### フォーム

以下実現方法

#### useRef (制御されていないコンポーネント)

- DOMノードに直接アクセスする方法
- 特徴：イミュータブルでもなければ宣言的でもない（）
- 用途：React以外のライブラリとデータをやり取りする場合（はDOMに直接アクセスが必要）

```ts
type AddColorFormProps = {
  onNewColor: (title: string, color: string) => void
}

export const AddColorForm: VFC<AddColorFormProps> = ({
  onNewColor = fn => fn
}) => {
  const textTitle = useRef<HTMLInputElement>(null!);
  const hexColor = useRef<HTMLInputElement>(null!);

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault(); // デフォルト動作(submit:POST送信)抑止
    const title = textTitle.current.value;
    const color = hexColor.current.value;
    onNewColor(title, color);
    textTitle.current.value = "";
    hexColor.current.value = "";
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={textTitle} type="text" placeholder="input title..." required />
      <input ref={hexColor} type="color" required />
      <button>Add Color</button>
    </form>
  );
}
```

#### useState (制御されたコンポーネント)

- ステート経由でDOMにアクセスする

※制御されたコンポーネント内の描画関数内で重い処理の実行は避ける（パフォーマンス劣化に繋がる）


```ts
type AddColorFormProps = {
  onNewColor: (title: string, color: string) => void
}

export const AddColorForm: VFC<AddColorFormProps> = ({
  onNewColor = fn => fn
}) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000")

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault(); // デフォルト動作(submit:POST送信)抑止
    onNewColor(title, color);
    setTitle("");
    setColor("#000000");
  }
  const onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setTitle(event.target.value)
  }
  const onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setColor(event.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={title} onChange={onChangeTitle}
        type="text" placeholder="input title..." required
      />
      <input
        value={color} onChange={onChangeColor}
        type="color" required
      />
      <button>Add Color</button>
    </form>
  );
}
```

### カスタムフック

制御されたコンポーネントから重複したコード切り出して抽象化できる

上記コードの以下が重複を変更
```
value={title} onChange={event => {setTitle(event.target.value)}
```


```ts
interface useInputHook {
  (initValue: string): useInputReturns;
}

type useInputReturns = [
  {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  },
  () => void
]

export const useInput: useInputHook = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);
  return [
    {
      value,
      onChange: event => setValue(event.target.value)
    },
    () => setValue(initValue)
  ]
}

```

```ts
// コメント： カスタムフック変更前
type AddColorFormProps = {
  onNewColor: (title: string, color: string) => void
}

export const AddColorForm: VFC<AddColorFormProps> = ({
  onNewColor = fn => fn
}) => {
  // const [title, setTitle] = useState("");
  // const [color, setColor] = useState("#000000")
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault(); // デフォルト動作(submit:POST送信)抑止
    onNewColor(titleProps.value, colorProps.value);
    // setTitle("");
    // setColor("");
    resetTitle();
    resetColor();
  }
  // const onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
  //   setTitle(event.target.value)
  // }
  // const onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
  //   setColor(event.target.value)
  // }

  return (
    <form onSubmit={onSubmit}>
      <input
        // value={title} onChange={onChangeTitle}
        {...titleProps}
        type="text" placeholder="input title..." required
      />
      <input
        // value={color} onChange={onChangeColor}
        {...colorProps}
        type="color" required
      />
      <button>Add Color</button>
    </form>
  );
}
```

### Reactコンテキスト
