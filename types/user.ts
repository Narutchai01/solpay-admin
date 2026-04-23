import { BaseResponse } from "./common";

export interface UserDetail {
  id: number;
  id_card: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  expire_date: string;
  front_card_url: string;
  back_card_url: string;
  created_at?: string; 
}

export interface PaginatedUserData {
  rows: UserDetail[];
  total_count: number;
  page: number;
  page_size: number;
}

export interface UpdateUserStatusRequest {
  id_card: string;
  status: "APPROVED" | "REJECTED";
}

export type GetUsersResponse = BaseResponse<PaginatedUserData>;