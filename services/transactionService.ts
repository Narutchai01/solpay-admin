import { transactionRepository } from "@/repositories/transactionRepository";

export const transactionService = {
  async getTransactions(
    page = 1,
    pageSize = 10,
    txType?: string,
    signal?: AbortSignal,
  ) {
    const res = await transactionRepository.getTransactions(
      {
        page,
        pageSize,
        txType,
      },
      signal,
    );

    if (res.code >= 400) {
      throw new Error(res.message || "Failed to fetch transactions");
    }

    return res.data;
  },

  async getSummary(month: string, year: string, signal?: AbortSignal) {
    const res = await transactionRepository.getSummary(month, year, signal);
    if (res.code >= 400) {
      throw new Error(res.message || "Failed to fetch summary");
    }
    return res.data;
  },

  async getTransactionById(uuid: string, signal?: AbortSignal) {
    const res = await transactionRepository.getTransactionById(uuid, signal);
    if (res.code >= 400) {
      throw new Error(res.message || "Failed to fetch transaction detail");
    }
    return res.data;
  },
};
