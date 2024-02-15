import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IProps {
  setValues: Dispatch<SetStateAction<IValue>>;
}

function useOnChange({ setValues }: IProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === "price" && !/^\d*$/.test(value)) {
      return;
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { handleChange };
}

export default useOnChange;
