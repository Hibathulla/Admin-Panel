import { useQuery } from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";

const getUser = async () => {
  const data = await axiosInstance.get(routes?.loggedUser);
  return { data };
};

export const useGetLoggedUser = () => {
  return useQuery([routes?.loggedUser], getUser);
};
