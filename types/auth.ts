import { BaseResponse } from "./common";

export type LoginResponse = BaseResponse<{ token: string }>;

export interface CreateAdminRequest {
  username: string;
  password: string;
}
