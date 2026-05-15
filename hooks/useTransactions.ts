import { useEffect, useReducer, useCallback, useRef } from "react";
import { Transaction } from "@/types/transaction";
import { transactionService } from "@/services/transactionService";

interface State {
  transactions: Transaction[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { items: Transaction[]; total: number } }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = {
  transactions: [],
  total: 0,
  isLoading: true,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      if (state.isLoading && state.error === null) {
        return state;
      }
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        transactions: action.payload.items,
        total: action.payload.total,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const useTransactions = (page = 1, pageSize = 10, txType?: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const performFetch = useCallback(
    async (signal: AbortSignal) => {
      try {
        const data = await transactionService.getTransactions(
          page,
          pageSize,
          txType,
          signal,
        );

        if (!signal.aborted) {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: {
              items: data?.items || [],
              total: data?.total || 0,
            },
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error && (err.name === "AbortError" || err.name === "CanceledError")) {
          return;
        }

        if (!signal.aborted) {
          const message =
            err instanceof Error ? err.message : "An unexpected error occurred";
          dispatch({ type: "FETCH_ERROR", payload: message });
        }
      }
    },
    [page, pageSize, txType],
  );

  const refetch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    dispatch({ type: "FETCH_START" });
    performFetch(controller.signal);
  }, [performFetch]);

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const startFetch = () => {
      queueMicrotask(() => {
        if (!controller.signal.aborted) {
          dispatch({ type: "FETCH_START" });
          performFetch(controller.signal);
        }
      });
    };

    startFetch();

    return () => {
      controller.abort();
    };
  }, [performFetch]);

  return {
    ...state,
    refetch,
  };
};
