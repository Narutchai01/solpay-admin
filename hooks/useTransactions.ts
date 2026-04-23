import { useState, useCallback, useEffect } from "react";
import { Transaction } from "@/types/transaction";
import { transactionService } from "@/services/transactionService";

export const useTransactions = (page = 1, pageSize = 10, txType?: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setError(null);

    try {
      const data = await transactionService.getTransactions(
        page,
        pageSize,
        txType,
      );

      if (data) {
        setTransactions(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setTransactions([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, txType]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    total,
    isLoading,
    error,
  };
};
