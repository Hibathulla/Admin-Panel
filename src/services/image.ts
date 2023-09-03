import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-config";
import { routes } from "./routes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface deleteProps {
  type: string;
  image: string;
}

const postImageUpload = (val: FormData) => {
  return axiosInstance.post(routes.singleUpload, val);
};

const postMultiImageUpload = (val: FormData) => {
  return axiosInstance.post(routes.multiUpload, val);
};

const postDelete = (val: deleteProps) => {
  return axiosInstance.post(routes.deleteUpload, val);
};

export const useUploadImage = () => {
  return useMutation(postImageUpload);
};

export const useMultiUploadImage = () => {
  return useMutation(postMultiImageUpload);
};

export const useDeleteImage = () => {
  return useMutation(postDelete);
};
