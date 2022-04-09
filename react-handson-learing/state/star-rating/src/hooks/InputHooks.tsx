import { useState } from "react";

interface useInputHook {
  (initValue: string): useInputReturns;
}

type useInputReturns = [
  {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  },
  () => void
]

export const useInput: useInputHook = (initValue: string) => {
  const [value, setValue] = useState<string>(initValue);
  return [
    {
      value,
      onChange: event => setValue(event.target.value)
    },
    () => setValue(initValue)
  ]
}
