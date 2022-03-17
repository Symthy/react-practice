import React, { useState } from 'react';
import './App.css';

const App = props => {
  const [name, setName] = useState(props.name)
  const [price, setPrice] = useState(props.price)
  const reset = () => {
    setPrice(props.price)
    setName(props.name)
  }
  return (
    <>
      <p>{name}: {price}円</p>
      <button onClick={() => setPrice(price + 10)}>+10円</button>
      <button onClick={() => setPrice(price - 10)}>-10円</button>
      <button onClick={reset}>Reset</button>
      <input value={name} onChange={e => setName(e.target.value)}></input>
    </>
  );
}

App.defaultProps = {
  name: "",
  price: 100
}

export default App;
