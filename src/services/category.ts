import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { categoryType } from "../types/category";

interface updateProps extends categoryType {
  id?: string;
}

const getCategory = async () => {
  const { data } = await axiosInstance.get(routes?.category);
  return data?.data;
};

const getSingleCategory = async (id: string) => {
  console.log(id, "id");
  const { data } = await axiosInstance.get(routes?.category + `/${id}`);
  return data;
};

const postCategory = async (val: categoryType) => {
  const res = await axiosInstance.post(routes?.category, val);
  return res;
};

const updateCategory = async (val: updateProps) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.category + `/${id}`, val);
};

const deleteCategory = async (id: string) => {
  return await axiosInstance.delete(routes?.category + `/${id}`);
};

export const useGetCategory = () => {
  return useQuery(["category"], getCategory);
};

export const useGetSingleCategory = (id: string) => {
  return useQuery([routes?.category + "/id", id], () => getSingleCategory(id));
};

export const usePostCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(postCategory, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["category"]);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategory);
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
    },
  });
};
