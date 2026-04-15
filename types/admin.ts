interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
  error: string | null;
}

export type LoginResponse = BaseResponse<{ token: string }>;

export interface CreateAdminRequest {
  username: string;
  password: string;
}