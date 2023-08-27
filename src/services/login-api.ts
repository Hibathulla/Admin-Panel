import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-config";
import { routes } from "./routes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface loginType {
  email: string;
  password: string;
}

const postLogin = (val: loginType) => {
  console.log(val, "val");

  return axiosInstance.post(routes.login, val);
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation(postLogin, {
    onSuccess: (res) => {
      if (res.data.data.user.role === "user") {
        toast.error("Please login as admin");
        return;
      }
      console.log(res, "res");
      const token = res.data.token;
      localStorage.setItem("token", token);
      toast.success(res.data.message);
      router.push("/dashboard");
    },
  });
};
