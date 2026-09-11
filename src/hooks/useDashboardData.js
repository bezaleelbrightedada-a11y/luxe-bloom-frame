import { useQueries } from "@tanstack/react-query";

import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import {
  getAiUsage,
  getCurrentUser,
  getRecentProjects,
  getRenderQueue,
  getStorage,
} from "@/services/dashboardService";

/** Shared retry policy for every dashboard read. */
const QUERY_DEFAULTS = {
  retry: 2,
  retryDelay: (attempt) => Math.min(attempt * 1_000, 3_000),
};

const RESOURCES = [
  { name: "user", queryKey: DASHBOARD_QUERY_KEYS.user, queryFn: getCurrentUser },
  { name: "projects", queryKey: DASHBOARD_QUERY_KEYS.projects, queryFn: getRecentProjects },
  { name: "queue", queryKey: DASHBOARD_QUERY_KEYS.queue, queryFn: getRenderQueue },
  { name: "usage", queryKey: DASHBOARD_QUERY_KEYS.usage, queryFn: getAiUsage },
  { name: "storage", queryKey: DASHBOARD_QUERY_KEYS.storage, queryFn: getStorage },
];

/**
 * Loads every dashboard resource in parallel.
 *
 * @returns {{ user: object, projects: object, queue: object, usage: object, storage: object, all: object[] }}
 *   Each entry is a React Query result; `all` is the same list for aggregate checks.
 */
export function useDashboardData() {
  const results = useQueries({
    queries: RESOURCES.map(({ queryKey, queryFn }) => ({ queryKey, queryFn, ...QUERY_DEFAULTS })),
  });

  const byName = RESOURCES.reduce((acc, resource, index) => {
    acc[resource.name] = results[index];
    return acc;
  }, {});

  return { ...byName, all: results };
}
