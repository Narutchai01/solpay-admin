import { BaseResponse } from "./common";

export enum TransactionType {
  TOPUP = "TOPUP",
  ONCHAIN = "ONCHAIN",
  OFFCHAIN = "OFFCHAIN",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  COMPLETED = "COMPLETED",
  SOLANA_SUBMITTED = "SOLANA_SUBMITTED",
  FAILED = "BALANCE_FAILED",
}

export interface Transaction {
  id: number;
  transaction_uuid: string;
  account_id: number;
  transaction_type: string;
  usdt_amount: number;
  thb_amount: number;
  fee: number;
  created_at: string;
  status: string;
  source?: string;
}

export type TransactionResponse = BaseResponse<{
  items: Transaction[];
  page: number;
  pageSize: number;
  total: number;
}>;

export interface ChartDataItem {
  date: string;
  label: string; 
  deposit: number;
  withdraw: number;
}

export interface SummaryResponseData {
  chartData: ChartDataItem[];
  summary: {
    totalDeposit: number;
    totalWithdraw: number;
    totalFee: number;
    totalCompletedCount: number;
  };
}

export type SummaryResponse = BaseResponse<SummaryResponseData>;