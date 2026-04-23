import apiClient from "@/lib / axios";
import { BaseResponse } from "@/types/common";
import {
  GetUsersResponse,
  UpdateUserStatusRequest,
  UserDetail,
} from "@/types/user";

export const userRepository = {
  getUsers: (status?: string) =>
    apiClient
      .get<GetUsersResponse>("/users", { params: { status } })
      .then((res) => res.data),

  updateStatus: (payload: UpdateUserStatusRequest) =>
    apiClient
      .patch<BaseResponse<UserDetail>>("/users/approve", payload)
      .then((res) => res.data),
};
