import apiClient from "@/lib / axios";
import { LoginResponse, AdminProfileResponse, CreateAdminRequest } from "../types/admin";

export const adminRepository = {
  login: (payload: CreateAdminRequest) => 
    apiClient.post<LoginResponse>("/admins/login", payload).then(res => res.data),

  getMe: () => 
    apiClient.get<AdminProfileResponse>("/admins/me").then(res => res.data),
};