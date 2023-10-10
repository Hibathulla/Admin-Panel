import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { productFormType, productType } from "../types/product";

interface updateProps extends productType {
  id?: string;
}

const productStats = async () => {
  const { data } = await axiosInstance.get(routes?.product + "/stats");
  return data?.data;
};

const getProduct = async () => {
  const { data } = await axiosInstance.get(routes?.product);
  return data?.data;
};

const getSingleProduct = async (id: string) => {
  const { data } = await axiosInstance.get(routes?.product + `/${id}`);
  return data;
};

const postProduct = async (val: productFormType) => {
  const res = await axiosInstance.post(routes?.product, val);
  return res;
};

const updateProduct = async (val: productFormType) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.product + `/${id}`, val);
};

const deleteProduct = async (id: string) => {
  return await axiosInstance.delete(routes?.product + `/${id}`);
};

export const useGetProduct = () => {
  return useQuery(["product"], getProduct);
};

export const useGetSingleProduct = (id: string) => {
  return useQuery([routes?.product + "/id", id], () => getSingleProduct(id));
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(postProduct, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["product"]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
    },
  });
};

export const useGetProductStats = () => {
  return useQuery(["product"], productStats);
};
