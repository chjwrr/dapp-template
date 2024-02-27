
import React from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryCache = new QueryCache({
  onError: (error, query) => {
    if (error instanceof Error) console.error({ key: query.queryKey, error: error.message });
  },
});

export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      notifyOnChangeProps:'all',
      retry:3,
    },
  },
});

export const ReactQueryProvider = ({ children }:any) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
