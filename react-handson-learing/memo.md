# React Memo

## create react app (TS)

```
npx create-react-app my-app --template typescript

npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## React + TS 型付け メモ

- [React + TypeScriptでpropsと型を便利に扱うTips集](https://zenn.dev/so_nishimura/articles/e9afde3b7dc779)
- [【初心者】React × TypeScript 基本の型定義](https://zenn.dev/ogakuzuko/articles/react-typescript-for-beginner)

React.FC には Props に暗黙的にchildrenが含まれるため非推奨?

```tsx
// v18.0.0 時点
type React.PropsWithChildren<P> = P & {
    children?: ReactNode;
}
```

propsとしてchildrenを受け取る際は、propsの型定義の中に明示的にchildrenを含めるようにした方が良さそう

```tsx
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

ref:
- [How to use React Context effectively - TypeScript](https://kentcdodds.com/blog/how-to-use-react-context-effectively#typescript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#extended-example) 

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


```tsx
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

```tsx
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


```tsx
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


```tsx
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

```tsx
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

- コンテキスト：中継地を経由せずにステートを伝達する方法
- コンテキストプロバイダー：データを渡す方 (親要素側)
- コンテキストコンシューマー：データを読みだす方 (利用コンポーネント側)

メリット
- 導入と管理が容易
デメリット
- 複数Contextの利用時は煩雑化
  - 関数コンポーネントの場合以下のように無駄にネストが深くなる（以下の通り）
- レンダリングコスト：高
  - Contextの値が頻繁に変更される場合、Context.Provider内のコンポーネントの範囲が広い場合、（コンポーネント内の全DOM要素が再レンダリングされ）再レンダリングのコストは非常に大きくなる

```jsx
const Contents = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

ref:
- [【React in TypeScript】Contextの使い方とユースケースについて解説](https://marsquai.com/745ca65e-e38b-4a8e-8d59-55421be50f7e/f83dca4c-79db-4adf-b007-697c863b82a5/c20fc9a1-fc36-4ba8-80dd-115b0bbde79f/)

- [Context.Consumer vs useContext() to access values passed by Context.Provider](https://stackoverflow.com/questions/56816374/context-consumer-vs-usecontext-to-access-values-passed-by-context-provider)

※ 複数のプロバイダーがある場合、フックははるかにクリーンになる傾向がある

基本形

```tsx
const colors: ColorData[] = buildInitColors();
export const ColorContext = createContext<ColorData[]>([]);

ReactDOM.render(
  <React.StrictMode>
    <ColorContext.Provider value={colors}>
      <App />
    </ColorContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

```tsx
export const ColorList: VFC<ColorListProps> = () => {
  const colors = useContext(ColorContext);
  if (colors.length === 0) {
    return <div>No Colors. (Add Color)</div>
  }
  return (
    <div>
      {colors.map(color => (
        <Color key={color.id} {...color.toObj()} />
      ))}
    </div>
  );
}
```


#### カスタムプロバイダー

基本はコンテキスト＆カスタムフックを使う＝コンテキストへのアクセスがカスタムフック経由のみになり安全

##### コンテキスト＆ステート併用

コンテキストプロバイダーはデータ変更ができないため、データ変更を可能にする手段。


```tsx
type ColorProviderProps = {
  children: React.ReactNode
}

export const ColorContext = createContext(undefined!);

export const ColorProvider = (props: ColorProviderProps) => {
  const [colors, setColors] = useState<ColorData[]>(buildInitColors());
  
  const removeColor = (id: string) => {
    const excludeColor = (id: string) => colors.filter(c => c.id !== id);
    setColors(excludeColor(id));
  }
  const addColor = (title: string, color: string) => {
    const newColors = [...colors, new ColorData(title, color)];
    setColors(newColors);
  }

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor }}>
      {props.children}
    </ColorContext.Provider>
  );
}
```

※setColors を公開するとどんな操作でも可能になる＝バグが混入する可能性。必要な操作を行う関数のみを(value に設定して)公開する

```tsx
// プロバイダー側：index.tsx
ReactDOM.render(
  <React.StrictMode>
    <ColorProvider>
      <App />
    </ColorProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

```tsx
// コンシューマー側
export const ColorList: VFC = () => {
  const { colors } = useContext(ColorContext);
  if (colors.length === 0) {
    return <div>No Colors. (Add Color)</div>
  }
  return (
    <div>
      {colors.map(color => (
        <Color key={color.id} {...color.toObj()} />
      ))}
    </div>
  );
}
```


##### コンテキスト＆カスタムフック

カスタムフックを導入することで、コンテキストをコンシューマーに一切公開することなくデータ共有可能

コンテキストの操作をカスタムフックで隠ぺいする


```tsx
type ColorContextValues = {
  colors: ColorData[],
  addColor: (title: string, color: string) => void,
  updateRateColor: (id: string, rating: number) => void,
  removeColor: (id: string) => void
}

const ColorContext = createContext<ColorContextValues>(undefined!);
export const useColors = () => useContext(ColorContext);

export const ColorProvider = (props: ColorProviderProps) => {
  // ... 同上のため省略
}
```

```tsx
export const ColorList: VFC = () => {
  const { colors } = useColors();
  if (colors.length === 0) {
    return <div>No Colors. (Add Color)</div>
  }
  return (
    <div>
      {colors.map(color => (
        <Color key={color.id} colorData={color} />
      ))}
    </div>
  );
}
```

ref:
- [TypeScript & Context APIのdefaultValueの書き方（use***がうまく機能しない時）](https://zenn.dev/hiro4hiro4/articles/a19d1f5c9b6eab) 


ステートが更新される＝ColorProviderコンポーネント全体が再描画 -> コンポーネントツリー全体にデータ更新が反映

ロジックをフックに分離する -> 関心の分離 = UI と ロジックを別々に開発/テスト＆デプロイ可能

## 副作用/メモ化/レデューサー

副作用：描画の一部ではない処理。UI構築に関する以外の処理
- useEffect：Paint処理手前
  - コンポーネント描画と描画結果依存処理(ロジック)との関心分離？
- useLayoutEffect：Paint処理後
  - コンポーネント描画前処理（コンポーネントサイズ決定等）

レデューサー：同じ引数の場合、必ず同じ戻り値を返さなければならない
- useReducer：ステート更新ロジックの抽出、複雑なステート管理


メモ化
- useMemo：パフォーマンス改善のための計算結果をキャッシュ、値のメモ化値
  - 依存配列の値が変わった場合のみ渡された関数実行。
- useCallback：パフォーマンス改善、関数のメモ化
- memo: 関数コンポーネントのメモ化（コンポーネントのパフォーマンス改善）

※なんでもかんでもメモ化すればいい訳ではない。メモ化にもコストはかかる

Reactは初めからパフォーマンスを年頭に置いて設計されている。
- パフォーマンスチューニングを実施するにはゴール設定が重要
- 静的な方法ではなく、実際に実行し、描画がもたついたり止まったりする箇所が何に時間を要しているかを確認して対処

**再レンダリング戦略**

- stateを持つ位置を工夫し、変更される範囲を限定する
- memo等でレンダリングをおさえる

ref:
- [なんとなくでやらないReact.memo戦略](https://zenn.dev/bom_shibuya/articles/b07da034fc5686)
- [Before You memo()](https://overreacted.io/before-you-memo/)
- [React.memo を濫用していませんか？ 更新頻度で見直す Provider 設計](https://zenn.dev/takepepe/articles/react-context-rerender)
  - いずれも更新頻度が高いとマイクロHookパターンが最適。末端コンポーネントでmemo化が不要になる

### useEffect

```tsx
export const CheckBox: VFC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    alert(`checked: ${checked.toString()}`);
  });

  // alert(`checked: ${checked.toString()}`); // OK押下されるまで↓の処理が実行されない

  return (
    <>
      <input
        type="checkbox" checked={checked}
        onChange={() => setChecked(checked => !checked)}
      />
      {checked ? "checked" : "non checked"}
    </>
  );
}
```

第二引数の配列：依存配列

#### 依存配列

副作用が実行される条件を指定（設定した値が更新された時に実行されるようになる）

- 依存配列：指定なし -> コンポーネント描画時は常時実行
```jsx
const [value, setValue] = useState("");

useEffect(() => {
  console.log(`typing ${value}`)
});
```

- 依存配列：空配列 -> コンポーネント初回描画のみ実行
```jsx
const [value, setValue] = useState("");

useEffect(() => {
  console.log(`typing ${value}`)
}, []);
```

- 依存配列：値有り -> 値更新時のみ実行（※）
```jsx
const [value, setValue] = useState("");

useEffect(() => {
  console.log(`typing ${value}`)
}, [value]);
```

（※）同一性チェックで値が同じか判定している
- プリミティブ値(string, number, boolean)：値が同じかどうかで評価
- 配列、オブジェクト、関数：参照同一性で評価するため常にfalseに
```js
const a = "test";
const b = "test";
console.log(a === b); // true

const arr1 = [1,2,3];
const arr2 = [1,2,3];
console.log(arr1 === arr2); // false
```

依存配列に、配列、オブジェクト、関数、を指定した場合は、コンポーネント再描画時に（これらのインスタンスは再生成され、非同一と判定されるため）useEffectが常時実行されてしまう。

それを防ぎ、かつ中身が変わった時のみ実行できる手段
- useMemo：配列、オブジェクト
- useCallback：関数


#### useMemo/useCallback

ref: [React.memo / useCallback / useMemo の使い方、使い所を理解してパフォーマンス最適化をする](https://qiita.com/soarflat/items/b9d3d17b8ab1f5dbfed2)

### useLayoutEffect

例：
- コンポーネントサイズの計算
```tsx
export const useWindowSize = () => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return [width, height];
}
```

- マウス座標の追跡
```tsx
export const useMousePosition = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  type SetPositionInput = { x: number, y: number };
  const setPosition = ({ x, y }: SetPositionInput) => {
    setX(x);
    setY(y);
  }

  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition)
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);

  return [x, y]
}
```

### useReducer

ステート更新のロジックを抽象化可能

```tsx
export const CheckBox: VFC = () => {
  const [checked, toggle] = useReducer(checked => !checked, false);

  return (
    <>
      <input
        type="checkbox" checked={checked}
        onChange={toggle}
      />
      {checked ? "checked" : "non checked"}
    </>
  );
}
```

- 複数値を包含するステート値の部分更新


```tsx
const firstUser = {
  id: "",
  firstName: "SYM",
  lastName: "THY",
  city: "Tokyo",
  state: "Japan",
  admin: false,
}

type UserData = typeof firstUser;

export const User: VFC = () => {
  const [user, setUser] = useReducer((user: UserData, newDetails: Partial<UserData>) =>
    ({ ...user, ...newDetails }), firstUser);

  // Reducer を使わずにやろうとすると以下にする必要がでてくる
  //const onClick = () => setUser({ ...user, admin: true })
  const onClick = () => setUser({ admin: true });

  return (
    <div>
      <h1>{user.firstName}{user.lastName} - {user.admin ? "Admin" : "User"}</h1>
      <p>Location: {user.city}, {user.state}</p>
      <button onClick={onClick}>Make Admin</button>
    </div>
  );
}
```

### memo関数

メモ化したコンポーネントは、プロパティが変更されない限り再描画されない

- プロパティが関数の場合は（依存配列と同じ理屈で）毎回描画されてしまう。
- 第２引数に条件指定することで回避可能

第２引数がfalseの時のみ実行される

```js
const OnceRenderCat = memo(Cat, () => true); // 初回のみ描画
const AlwaysRenderCat = memo(Cat, () => false); // 毎回描画
```



```tsx
export const App = () => {
  const [cats, setCats] = useReducer(
    (cats: string[], newCats: string[]) => [...cats, ...newCats], hadCats
  );

  const onAddCat = (name: string) => {
    setCats(name ? [name] : []);
  };

  return (
    <>
      {cats.map((name, i) => {
        <PureCat key={i} name={name} meow={() => console.log(`${name} meowed`)} />
      })}
      <AddCatForm addCat={onAddCat} />
    </>
  );
}
```

```tsx
type CatProps = {
  name: string,
  meow: (name: string) => void
}

const Cat: VFC<CatProps> = ({ name, meow = fn => fn }) => {
  console.log(`rendering cat: ${name}`);
  return <p onClick={() => meow(name)}>cat: {name}</p>
};

export const PureCat = memo(
  Cat,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
```

```tsx
type AddCatFormProps = {
  addCat: (name: string) => void
}

export const AddCatForm: VFC<AddCatFormProps> = ({ addCat }) => {
  const [name, setName] = useState<string>("");

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault();
    addCat(name);
    setName("");
  }

  const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setName(event.target.value);
  }

  return (
    <form>
      <input
        value={name} onChange={onChange}
        type="text" placeholder="input name..." required
      />
      <button>Add Cat</button>
    </form>
  )
}
```
