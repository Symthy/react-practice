import { VFC } from "react";
import { FaTrash } from "react-icons/fa";
import { ColorObj } from "../ColorData";
import { StarRating } from "./StarRating";

type ColorProps = ColorObj & {
  onUpdateRate: (id: string, rating: number) => void,
  onRemove: (id: string) => void
}

export const Color: VFC<ColorProps> = ({
  id,
  title,
  color,
  rating,
  onUpdateRate = fn => fn,
  onRemove = fn => fn }) => {
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => onRemove(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 30, backgroundColor: color }}></div>
      <StarRating
        selectedStars={rating}
        onUpdateRate={rating => onUpdateRate(id, rating)}
      />
    </section>
  );
}
