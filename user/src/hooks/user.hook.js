import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, registerApi, logOutApi, getUserApi } from "../api/user.api";

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

export const userLoginHook = () => {
  return useMutation({
    mutationFn: loginApi,
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

export const userLogoutHook = () => {
  return useMutation({
    mutationFn: logOutApi,
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

export const GetUserHook = () => {
  const token = localStorage.getItem("token"); //

  return useQuery({
    queryKey: ["get-user"],
    queryFn: getUserApi,
    enabled: !!token,
  });
};
