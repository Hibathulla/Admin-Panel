import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { userType } from "../types/user";

const getLoggedUser = async () => {
  const { data } = await axiosInstance.get(routes?.loggedUser);
  return data?.data;
};

const updateLoggedUser = async (val: userType) => {
  const { data } = await axiosInstance.patch(routes?.updateLoggedUser, val);
  return data;
};

const getUser = async () => {
  const { data } = await axiosInstance.get(routes?.users);
  return data?.data;
};

const getSingleUser = async (id: string) => {
  const { data } = await axiosInstance.get(routes?.users + `/${id}`);
  return data;
};

const updateUser = async (val: userType) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.users + `/${id}`, val);
};

const deleteUser = async (id: string) => {
  return await axiosInstance.delete(routes?.users + `/${id}`);
};

export const useGetLoggedUser = () => {
  return useQuery([routes?.loggedUser], getLoggedUser);
};

export const useGetUser = () => {
  return useQuery(["user"], getUser);
};

export const useGetSingleUser = (id: string) => {
  return useQuery(["userId", id], () => getSingleUser(id), {
    enabled: !!id,
    retry: !!id,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser);
};

export const useUpdateLoggedUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateLoggedUser);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
