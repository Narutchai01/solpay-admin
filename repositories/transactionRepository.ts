import apiClient from "@/lib / axios";
import {
  SummaryResponse,
  TransactionDetailResponse,
  TransactionResponse,
} from "@/types/transaction";

export const transactionRepository = {
  getTransactions: (
    params?: {
      page?: number;
      pageSize?: number;
      txType?: string;
    },
    signal?: AbortSignal,
  ) =>
    apiClient
      .get<TransactionResponse>("/transactions", { params, signal })
      .then((res) => res.data),

  getSummary: (month: string, year: string, signal?: AbortSignal) =>
    apiClient
      .get<SummaryResponse>("/transactions/summary", {
        params: { month, year },
        signal,
      })
      .then((res) => res.data),

  getTransactionById: (uuid: string, signal?: AbortSignal) =>
    apiClient
      .get<TransactionDetailResponse>(`/transactions/${uuid}`, { signal })
      .then((res) => res.data),
};
