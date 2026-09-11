import { useQuery } from "@tanstack/react-query";

/** Shared retry policy for every read in the app. */
export const QUERY_DEFAULTS = {
  retry: 1,
  retryDelay: (attempt) => Math.min(attempt * 1_000, 3_000),
};

/**
 * Thin wrapper around React Query so every page shares one read policy.
 *
 * @param {string[]} queryKey
 * @param {() => Promise<unknown>} queryFn
 */
export function useApiResource(queryKey, queryFn) {
  return useQuery({ queryKey, queryFn, ...QUERY_DEFAULTS });
}
