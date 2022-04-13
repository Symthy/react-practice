import React, { createContext, useContext, useState } from "react";
import { buildInitColors, ColorData } from "../ColorData";

type ColorProviderProps = {
  children: React.ReactNode
}

type ColorContextValues = {
  colors: ColorData[],
  addColor: (title: string, color: string) => void,
  updateRateColor: (id: string, rating: number) => void,
  removeColor: (id: string) => void
}

const ColorContext = createContext<ColorContextValues>(undefined!);
export const useColors = () => useContext(ColorContext);

export const ColorProvider = (props: ColorProviderProps) => {
  const [colors, setColors] = useState<ColorData[]>(buildInitColors());

  const removeColor = (id: string) => {
    const excludeColor = (id: string) => colors.filter(c => c.id !== id);
    setColors(excludeColor(id));
  }

  const updateRateColor = (id: string, rating: number) => {
    const updatedColors = colors.map(c => c.id === id ? c.withRating(rating) : c)
    setColors(updatedColors);
  }

  const addColor = (title: string, color: string) => {
    const newColors = [
      ...colors,
      new ColorData(title, color)
    ];
    setColors(newColors);
  }

  return (
    <ColorContext.Provider value={{ colors, addColor, removeColor, updateRateColor }}>
      {props.children}
    </ColorContext.Provider>
  );
}
