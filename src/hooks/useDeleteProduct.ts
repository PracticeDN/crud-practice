import { deleteProductApi } from "../api/home";

interface IReturn {
  handleDeleteProduct: (id: string) => void;
}

function useDeleteProduct(fetchData: () => void): IReturn {
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await deleteProductApi(id);
      if (response.statusText === "OK") {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDeleteProduct };
}

export default useDeleteProduct;
