# React

## Create React App

```shell
npx create-react-app hello-world --template=typescript
```

- --template=typescript: TypeScript のためのテンプレート

```shell
cd hello-world
npm start
```

デフォルトは 3000ポート。

HTML内の

```public/index.html
<div id="root"></div>
```

ReactDom.render() の第2 引数document.getElementById('root')

```src/index.tsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
