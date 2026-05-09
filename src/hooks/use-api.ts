"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { type ApiResponse } from "@/types/api";

export function useFetch<T>(
  queryKey: string[],
  path: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, "queryKey" | "queryFn">,
) {
  return useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: async () => {
      const res = await apiClient.get<T>(path);
      // success: false 이면 TanStack Query isError 활성화
      if (!res.success) {
        throw new Error(res.error?.message ?? "API 오류가 발생했습니다.");
      }
      return res;
    },
    ...options,
  });
}

export function usePost<T, B = unknown>(path: string, queryKey?: string[]) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<T>, Error, B>({
    mutationFn: (body: B) => apiClient.post<T>(path, body),
    onSuccess: () => {
      if (queryKey) qc.invalidateQueries({ queryKey });
    },
  });
}

export function usePut<T, B = unknown>(
  pathFn: (id: number) => string,
  queryKey?: string[],
) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<T>, Error, { id: number; body: B }>({
    mutationFn: ({ id, body }) => apiClient.put<T>(pathFn(id), body),
    onSuccess: () => {
      if (queryKey) qc.invalidateQueries({ queryKey });
    },
  });
}

export function useDelete<T>(pathFn: (id: number) => string, queryKey?: string[]) {
  const qc = useQueryClient();

  return useMutation<ApiResponse<T>, Error, number>({
    mutationFn: (id) => apiClient.del<T>(pathFn(id)),
    onSuccess: () => {
      if (queryKey) qc.invalidateQueries({ queryKey });
    },
  });
}
