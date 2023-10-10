import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { orderType } from "../types/order";

interface updateProps {
  id?: string;
  status: string;
}

const orderStats = async () => {
  const { data } = await axiosInstance.get(routes?.order + "/stats");
  return data?.data;
};

const getOrder = async () => {
  const { data } = await axiosInstance.get(routes?.order);
  return data?.data;
};

const getSingleOrder = async (id: string) => {
  const { data } = await axiosInstance.get(routes?.order + `/${id}`);
  return data;
};

const postOrder = async (val: orderType) => {
  const res = await axiosInstance.post(routes?.order, val);
  return res;
};

const updateOrder = async (val: updateProps) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.order + `/${id}`, val);
};

const deleteOrder = async (id: string) => {
  return await axiosInstance.delete(routes?.order + `/${id}`);
};

export const useGetOrder = () => {
  return useQuery(["order"], getOrder);
};

export const useGetSingleOrder = (id: string) => {
  return useQuery([routes?.order + "/id", id], () => getSingleOrder(id), {
    enabled: !!id,
    refetchOnMount: true,
  });
};

export const usePostOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(postOrder, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["Order"]);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });
};

export const useGetOrderStats = () => {
  const queryClient = useQueryClient();
  return useQuery(["order-stats"], orderStats);
};
