import { CreateAdminRequest } from "@/types/auth";
import { authRepository } from "../repositories/authRepository";

export const authService = {
  async login(payload: CreateAdminRequest): Promise<string> {
    const res = await authRepository.login(payload);

    if (res.code >= 400) {
      throw new Error(res.message || "Login failed");
    }

    const { token } = res.data;
    localStorage.setItem("token", token);
    return token;
  },

  logout(): void {
    localStorage.removeItem("token");
  },
};
