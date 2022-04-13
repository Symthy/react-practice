import { useLayoutEffect, useState } from "react";


export const useWindowSize = () => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return [width, height];
}
