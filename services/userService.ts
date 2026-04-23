import { userRepository } from "@/repositories/user.repository";
import { UpdateUserStatusRequest, UserDetail } from "@/types/user";

export const userService = {
  async getPendingUsers(): Promise<UserDetail[]> {
    const res = await userRepository.getUsers("PENDING");
    
    if (res.code >= 400) {
      throw new Error(res.message || "Failed to fetch users");
    }
    
    return res.data.rows; 
  },

  async updateUserStatus(payload: UpdateUserStatusRequest): Promise<void> {
    const res = await userRepository.updateStatus(payload);
    if (res.code >= 400) {
      throw new Error(res.message || "Failed to update user status");
    }
  },
};