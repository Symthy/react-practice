import { useLayoutEffect, useState } from "react";

export const useMousePosition = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  type SetPositionInput = { x: number, y: number };
  const setPosition = ({ x, y }: SetPositionInput) => {
    setX(x);
    setY(y);
  }

  useLayoutEffect(() => {
    window.addEventListener("mousemove", setPosition)
    return () => window.removeEventListener("mousemove", setPosition);
  }, []);

  return [x, y]
}
