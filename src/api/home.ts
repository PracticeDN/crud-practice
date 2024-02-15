import { AxiosResponse } from "axios";
import apiInstance from "../utlis/request";

const getProductsAllApi = (): Promise<AxiosResponse> => {
  return apiInstance.get("/");
};

const addProductApi = (data: IValue): Promise<AxiosResponse> => {
  return apiInstance.post("/", data);
};

const deleteProductApi = (id: string): Promise<AxiosResponse> => {
  return apiInstance.delete(`/${id}`);
};

const updateProductApi = (id: string, data: IValue): Promise<AxiosResponse> => {
  return apiInstance.put(`/${id}`, data);
};

export { getProductsAllApi, addProductApi, deleteProductApi, updateProductApi };
