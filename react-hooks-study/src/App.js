import React, { useState } from 'react';
import './App.css';

const App = props => {
  const [state, setState] = useState(props)
  const { name, price } = state
  return (
    <>
      <p>{name}: {price}円</p>
      <button onClick={() => setState({...state, price: state.price+10})}>+10円</button>
      <button onClick={() => setState({...state, price: state.price-10})}>-10円</button>
      <button onClick={() => setState(props)}>Reset</button>
      <input value={state.name} onChange={e => setState({...state, name: e.target.value})}></input>
    </>
  );
}

App.defaultProps = {
  name: "",
  price: 100
}

export default App;
