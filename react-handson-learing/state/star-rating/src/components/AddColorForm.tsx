import React, { VFC } from "react";
import { useColors } from "../hooks/ColorHooks";
import { useInput } from "../hooks/InputHooks";

// コメント： カスタムフック変更前
export const AddColorForm: VFC = () => {
  // const [title, setTitle] = useState("");
  // const [color, setColor] = useState("#000000")
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useInput("#000000");
  const { addColor } = useColors();

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault(); // デフォルト動作(submit:POST送信)抑止
    addColor(titleProps.value, colorProps.value);
    // setTitle("");
    // setColor("");
    resetTitle();
    resetColor();
  }
  // const onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
  //   setTitle(event.target.value)
  // }
  // const onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
  //   setColor(event.target.value)
  // }

  return (
    <form onSubmit={onSubmit}>
      <input
        // value={title} onChange={onChangeTitle}
        {...titleProps}
        type="text" placeholder="input title..." required
      />
      <input
        // value={color} onChange={onChangeColor}
        {...colorProps}
        type="color" required
      />
      <button>Add Color</button>
    </form>
  );

}
