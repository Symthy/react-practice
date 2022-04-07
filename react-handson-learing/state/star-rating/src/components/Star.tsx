import { VFC } from "react";
import { FaStar } from "react-icons/fa";

type StarProps = {
  selected: boolean,
  onSelect: (event: React.MouseEvent<SVGElement, MouseEvent>) => void
}

export const Star: VFC<StarProps> = ({ selected = false, onSelect = fn => fn }) => (
  <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
);
