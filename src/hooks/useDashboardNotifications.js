import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Emits a single success/error toast once all dashboard queries settle.
 * Repeated identical outcomes are de-duplicated so refetches stay quiet.
 *
 * @param {Array<{ isLoading: boolean, isSuccess: boolean, isError: boolean }>} queries
 */
export function useDashboardNotifications(queries) {
  const settled = queries.every((query) => !query.isLoading);
  const allSuccess = queries.every((query) => query.isSuccess);
  const anyError = queries.some((query) => query.isError);
  const lastOutcome = useRef(null);

  useEffect(() => {
    if (!settled) {
      lastOutcome.current = null;
      return;
    }

    const outcome = allSuccess ? "success" : anyError ? "error" : null;
    if (!outcome || lastOutcome.current === outcome) return;
    lastOutcome.current = outcome;

    if (outcome === "success") {
      toast.success("Dashboard refreshed", { description: "All data is up to date." });
    } else {
      toast.error("Dashboard update failed", {
        description: "Some dashboard data could not be loaded. Try retrying.",
      });
    }
  }, [settled, allSuccess, anyError]);
}
