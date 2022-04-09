import React from 'react';
import './App.css';
import { AddColorForm } from './components/AddColorForm';
import { ColorList } from './components/ColorList';

function App() {

  return (
    <>
      <AddColorForm />
      <ColorList />
    </>
  );
}

export default App;
