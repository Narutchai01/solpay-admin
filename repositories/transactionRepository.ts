import apiClient from "@/lib / axios";
import { TransactionResponse } from "@/types/transaction";

export const transactionRepository = {
  getTransactions: (params?: {
    page?: number;
    pageSize?: number;
    txType?: string;
  }) =>
    apiClient
      .get<TransactionResponse>("/transactions", { params })
      .then((res) => res.data),
};
