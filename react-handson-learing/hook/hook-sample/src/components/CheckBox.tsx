import { useEffect, useReducer, VFC } from "react";

export const CheckBox: VFC = () => {
  const [checked, toggle] = useReducer(checked => !checked, false);

  useEffect(() => {
    alert(`checked: ${checked.toString()}`);
  });

  // alert(`checked: ${checked.toString()}`); // OK押下されるまで↓の処理が実行されない

  return (
    <>
      <input
        type="checkbox" checked={checked}
        onChange={toggle}
      />
      {checked ? "checked" : "non checked"}
    </>
  );
}
