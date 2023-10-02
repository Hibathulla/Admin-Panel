import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { settingsType } from "../types/settings";

interface updateProps extends settingsType {
  id?: string;
}

const getSettings = async () => {
  const { data } = await axiosInstance.get(routes?.settings);
  return data?.data;
};

const getSingleSettings = async (id: string) => {
  const { data } = await axiosInstance.get(routes?.settings + `/${id}`);
  return data;
};

const postSettings = async (val: settingsType) => {
  const res = await axiosInstance.post(routes?.settings, val);
  return res;
};

const updateSettings = async (val: updateProps) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.settings + `/${id}`, val);
};

const deleteSettings = async (id: string) => {
  return await axiosInstance.delete(routes?.settings + `/${id}`);
};

export const useGetSettings = () => {
  return useQuery(["settings"], getSettings);
};

export const useGetSingleSettings = (id: string) => {
  return useQuery([routes?.settings + "/id", id], () => getSingleSettings(id));
};

export const usePostSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(postSettings, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["settings"]);
    },
  });
};

export const useUpdateSettings = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(updateSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries([routes?.settings + "/id", id]);
    },
  });
};

export const useDeleteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(["settings"]);
    },
  });
};
