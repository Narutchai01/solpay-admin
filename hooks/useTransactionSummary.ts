import { useState, useCallback, useEffect } from "react";
import { transactionService } from "@/services/transactionService";
import { SummaryResponseData } from "@/types/transaction";

export const useTransactionSummary = (month: string, year: string) => {
  const [data, setData] = useState<SummaryResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await transactionService.getSummary(month, year);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setIsLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { data, isLoading, error };
};