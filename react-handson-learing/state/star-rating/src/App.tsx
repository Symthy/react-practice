import React, { useState } from 'react';
import './App.css';
import { buildInitColors, ColorData } from './ColorData';
import { AddColorForm } from './components/AddColorForm';
import { ColorList } from './components/ColorList';

function App() {
  const [colors, setColors] = useState<ColorData[]>(buildInitColors());
  const excludeColor = (id: string) => colors.filter(c => c.id !== id);
  const onRemoveColor = (id: string) => setColors(excludeColor(id));

  const onUpdateRateColor = (id: string, rating: number) => {
    const updatedColors = colors.map(c => c.id === id ? c.withRating(rating) : c)
    setColors(updatedColors);
  }

  const onNewColor = (title: string, color: string) => {
    const newColors = [
      ...colors,
      new ColorData(title, color)
    ];
    setColors(newColors);
  }

  return (
    <>
      <AddColorForm
        onNewColor={onNewColor}
      />
      <ColorList
        colors={colors}
        onRemoveColor={onRemoveColor}
        onUpdateRateColor={onUpdateRateColor} />
    </>
  );
}

export default App;
