import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count+1)
  const decrement = () => setCount(count-1)
  const divide3 = () => setCount(previous => {
    return previous % 3 === 0 ? previous / 3 : previous
  })
  const reset = () => setCount(0)
  return (
    <>
      <div>count: {count}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
      <button onClick={divide3}>divide3</button>
    </>
  );
}

export default App;
