import { useState, useCallback, useEffect } from "react";
import { transactionService } from "@/services/transactionService";
import { TransactionDetail } from "@/types/transaction";

export const useTransactionDetail = (uuid: string) => {
  const [data, setData] = useState<TransactionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!uuid) return;
    setIsLoading(true);
    try {
      const result = await transactionService.getTransactionById(uuid);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setIsLoading(false);
    }
  }, [uuid]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, isLoading, error };
};
