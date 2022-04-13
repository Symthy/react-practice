import { useState, VFC } from "react";

type AddCatFormProps = {
  addCat: (name: string) => void
}

export const AddCatForm: VFC<AddCatFormProps> = ({ addCat }) => {
  const [name, setName] = useState<string>("");

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = event => {
    event.preventDefault();
    addCat(name);
    setName("");
  }

  const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
    setName(event.target.value);
  }

  return (
    <form>
      <input
        value={name} onChange={onChange}
        type="text" placeholder="input name..." required
      />
      <button>Add Cat</button>
    </form>
  )
}
