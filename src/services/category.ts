import { useQuery } from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";

const getCategory = async () => {
  const { data } = await axiosInstance.get(routes?.category);
  return data?.data;
};

export const useGetCategory = () => {
  return useQuery([routes?.category], getCategory);
};
