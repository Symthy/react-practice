import { VFC } from "react";
import { ColorData } from "../ColorData";
import { Color } from "./Color";


type ColorListProps = {
  colors: ColorData[]
  onRemoveColor: (id: string) => void
  onUpdateRateColor: (id: string, rate: number) => void
}

export const ColorList: VFC<ColorListProps> = ({
  colors = [],
  onUpdateRateColor = fn => fn,
  onRemoveColor = fn => fn
}) => {
  if (colors.length === 0) {
    return <div>No Colors. (Add Color)</div>
  }
  return (
    <div>
      {colors.map(color => (
        <Color
          key={color.id}
          {...color.toObj()}
          onUpdateRate={onUpdateRateColor}
          onRemove={onRemoveColor} />
      ))}
    </div>
  );
}
