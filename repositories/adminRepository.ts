import apiClient from "@/lib / axios";
import { LoginResponse, CreateAdminRequest } from "../types/admin";

export const adminRepository = {
  login: (payload: CreateAdminRequest) => 
    apiClient.post<LoginResponse>("/admins/login", payload).then(res => res.data),
};