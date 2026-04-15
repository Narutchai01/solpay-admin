import { adminRepository } from "@/repositories/adminRepository";
import { AdminData, CreateAdminRequest } from "../types/admin";

export const adminService = {
  async login(payload: CreateAdminRequest): Promise<string> {
    const res = await adminRepository.login(payload);
    
    if (res.code >= 400) throw new Error(res.message || "Login failed");

    const { token } = res.data;
    localStorage.setItem("token", token);
    return token;
  },

  async getProfile(): Promise<AdminData> {
    const res = await adminRepository.getMe();
    if (res.code !== 200) throw new Error(res.message || "Fetch profile failed");
    return res.data;
  },

  logout(): void {
    localStorage.removeItem("token");
  }
};