import { useReducer } from 'react';
import './App.css';
import { AddCatForm } from './components/AddCatForm';
import { PureCat } from './components/Cat';
import { CheckBox } from './components/CheckBox';
import { WordCount } from './components/WordCount';
import { useRenderWhenAnyKey } from './hooks/RenderWhenAnyKey';

const hadCats = ["Tama", "Sashimi", "Mike"];

export const App = () => {
  useRenderWhenAnyKey();

  const [cats, setCats] = useReducer(
    (cats: string[], newCats: string[]) => [...cats, ...newCats], hadCats
  );

  const onAddCat = (name: string) => {
    setCats(name ? [name] : []);
  };

  return (
    <>
      <CheckBox />
      <WordCount>React makes it painless to create interactive UIs</WordCount>
      <div>---</div>
      {cats.map((name, i) => {
        <PureCat key={i} name={name} meow={() => console.log(`${name} meowed`)} />
      })}
      <AddCatForm addCat={onAddCat} />
    </>
  );
}
