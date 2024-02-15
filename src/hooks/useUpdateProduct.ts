import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { updateProductApi } from "../api/home";

interface IProps {
  id: string;
  values: IValue;
  fetchData: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface IReturn {
  handleUpdateProduct: (e: ChangeEvent<HTMLFormElement>) => void;
}

function useUpdateProduct({
  id,
  values,
  fetchData,
  setShowModal,
}: IProps): IReturn {
  const handleUpdateProduct = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await updateProductApi(id, values);
      if (response.statusText === "OK") {
        fetchData();
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleUpdateProduct };
}

export default useUpdateProduct;
