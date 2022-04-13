import { memo, VFC } from "react";

type CatProps = {
  name: string,
  meow: (name: string) => void
}

const Cat: VFC<CatProps> = ({ name, meow = fn => fn }) => {
  console.log(`rendering cat: ${name}`);
  return <p onClick={() => meow(name)}>cat: {name}</p>
};

export const PureCat = memo(
  Cat,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
