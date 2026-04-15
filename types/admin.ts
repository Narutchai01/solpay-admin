export interface AdminData {
  id: number;
  username: string;
  created_at: string;
  updated_at: string;
}

interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
  error: string | null;
}

export type LoginResponse = BaseResponse<{ token: string }>;
export type AdminProfileResponse = BaseResponse<AdminData>;

export interface CreateAdminRequest {
  username: string;
  password: string;
}