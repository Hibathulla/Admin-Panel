import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { SizeType } from "../types/size";

interface updateProps extends SizeType {
  id?: string;
}

const getSize = async () => {
  const { data } = await axiosInstance.get(routes?.size);
  return data?.data;
};

const getSingleSize = async (id: string) => {
  console.log(id, "id");
  const { data } = await axiosInstance.get(routes?.size + `/${id}`);
  return data;
};

const postSize = async (val: SizeType) => {
  const res = await axiosInstance.post(routes?.size, val);
  return res;
};

const updateSize = async (val: updateProps) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.size + `/${id}`, val);
};

const deleteSize = async (id: string) => {
  return await axiosInstance.delete(routes?.size + `/${id}`);
};

export const useGetSize = () => {
  return useQuery(["size"], getSize);
};

export const useGetSingleSize = (id: string) => {
  return useQuery([routes?.size + "/id", id], () => getSingleSize(id));
};

export const usePostSize = () => {
  const queryClient = useQueryClient();
  return useMutation(postSize, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["size"]);
    },
  });
};

export const useUpdateSize = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSize, {
    onSuccess: () => {
      queryClient.invalidateQueries(["size"]);
    },
  });
};

export const useDeleteSize = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSize, {
    onSuccess: () => {
      queryClient.invalidateQueries(["size"]);
    },
  });
};
