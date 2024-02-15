import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { addProductApi } from "../api/home";

interface IProps {
  values: IValue;
  setValues: Dispatch<SetStateAction<IValue>>;
  fetchData: () => void;
}

function useHandleSubmit({ values, setValues, fetchData }: IProps) {
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.product || !values.price) {
      alert("상품명과 비용을 모두 입력해주세요!");
      return;
    }

    try {
      const response = await addProductApi(values);

      if (response?.statusText === "Created") {
        setValues((prev) => ({
          ...prev,
          product: "",
          price: "",
        }));
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSubmit };
}

export default useHandleSubmit;
