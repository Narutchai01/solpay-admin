import apiClient from "@/lib / axios";
import {
  SummaryResponse,
  TransactionDetailResponse,
  TransactionResponse,
} from "@/types/transaction";

export const transactionRepository = {
  getTransactions: (params?: {
    page?: number;
    pageSize?: number;
    txType?: string;
  }) =>
    apiClient
      .get<TransactionResponse>("/transactions", { params })
      .then((res) => res.data),

  getSummary: (month: string, year: string) =>
    apiClient
      .get<SummaryResponse>("/transactions/summary", {
        params: { month, year },
      })
      .then((res) => res.data),

  getTransactionById: (uuid: string) =>
    apiClient
      .get<TransactionDetailResponse>(`/transactions/${uuid}`)
      .then((res) => res.data),
};
