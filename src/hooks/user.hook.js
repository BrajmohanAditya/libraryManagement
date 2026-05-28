import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerApi,
  loginApi,
  getUserApi,
  logOutApi,
  verifyOtpApi,
} from "../api/user.api";
import { toast } from "sonner";

export const userRegisterHook = () => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong! Please check your connection.";
      toast.error(message);
    },
  });
};