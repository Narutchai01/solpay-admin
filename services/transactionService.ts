import { transactionRepository } from "@/repositories/transactionRepository";

export const transactionService = {
  async getTransactions(page = 1, pageSize = 10, txType?: string) {
    const res = await transactionRepository.getTransactions({
      page,
      pageSize,
      txType,
    });

    if (res.code >= 400) {
      throw new Error(res.message || "Failed to fetch transactions");
    }

    return res.data;
  },

  async getSummary(month: string, year: string) {
    const res = await transactionRepository.getSummary(month, year);
    if (res.code >= 400) {
      throw new Error(res.message || "Failed to fetch summary");
    }
    return res.data;
  },
};
