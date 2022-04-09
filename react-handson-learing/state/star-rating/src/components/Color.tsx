import { VFC } from "react";
import { FaTrash } from "react-icons/fa";
import { ColorData } from "../ColorData";
import { useColors } from "../hooks/ColorHooks";
import { StarRating } from "./StarRating";

type ColorProps = {
  colorData: ColorData
}

export const Color: VFC<ColorProps> = ({ colorData }) => {
  const { removeColor, updateRateColor } = useColors();
  return (
    <section>
      <h1>{colorData.title}</h1>
      <button onClick={() => removeColor(colorData.id)}>
        <FaTrash />
      </button>
      <div style={{ height: 30, backgroundColor: colorData.color }}></div>
      <StarRating
        selectedStars={colorData.rating}
        onUpdateRate={rating => updateRateColor(colorData.id, rating)}
      />
    </section>
  );
}
