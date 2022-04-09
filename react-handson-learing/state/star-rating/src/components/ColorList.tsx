import { VFC } from "react";
import { useColors } from "../hooks/ColorHooks";
import { Color } from "./Color";


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
