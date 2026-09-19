"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useApi<T>(
  fetcherFn: () => Promise<T>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcherFn();
      setData(result);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error("API Fetching Error"));
    } finally {
      setLoading(false);
    }
  }, [fetcherFn]);

  useEffect(() => {
    executeFetch();
  }, dependencies);

  return { data, loading, error, refetch: executeFetch };
}
