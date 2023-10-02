import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { routes } from "./routes";
import { axiosInstance } from "../../axios-config";
import { couponType } from "../types/coupon";

//   interface updateProps extends CouponType {
//     id?: string;
//   }

const getCoupon = async () => {
  const { data } = await axiosInstance.get(routes?.coupon);
  return data?.data;
};

const getSingleCoupon = async (id: string) => {
  const { data } = await axiosInstance.get(routes?.coupon + `/${id}`);
  return data;
};

const postCoupon = async (val: couponType) => {
  const res = await axiosInstance.post(routes?.coupon, val);
  return res;
};

const updateCoupon = async (val: couponType) => {
  const id = val?.id;
  delete val?.id;
  return await axiosInstance.patch(routes?.coupon + `/${id}`, val);
};

const deleteCoupon = async (id: string) => {
  return await axiosInstance.delete(routes?.coupon + `/${id}`);
};

export const useGetCoupon = () => {
  return useQuery(["coupon"], getCoupon);
};

export const useGetSingleCoupon = (id: string) => {
  return useQuery([routes?.coupon + "/id", id], () => getSingleCoupon(id));
};

export const usePostCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation(postCoupon, {
    onSuccess: () => {
      return queryClient.invalidateQueries(["coupon"]);
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(["coupon"]);
    },
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(["coupon"]);
    },
  });
};
