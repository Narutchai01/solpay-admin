import apiClient from "@/lib / axios";
import { CreateAdminRequest, LoginResponse } from "@/types/auth";

export const authRepository = {
  login: (payload: CreateAdminRequest) =>
    apiClient
      .post<LoginResponse>("/admins/login", payload)
      .then((res) => res.data),
};
