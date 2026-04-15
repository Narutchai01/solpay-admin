import { adminRepository } from "../repositories/adminRepository";
import { CreateAdminRequest } from "../types/admin";

export const adminService = {
  async login(payload: CreateAdminRequest): Promise<string> {
    const res = await adminRepository.login(payload);
    
    if (res.code >= 400) {
        throw new Error(res.message || "Login failed");
    }

    const { token } = res.data;
    localStorage.setItem("token", token);
    return token;
  },

  logout(): void {
    localStorage.removeItem("token");
  }
};