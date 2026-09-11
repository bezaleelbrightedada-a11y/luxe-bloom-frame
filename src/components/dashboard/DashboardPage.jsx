import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import { AiUsageCard } from "@/components/dashboard/AiUsageCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RenderingQueue } from "@/components/dashboard/RenderingQueue";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import {
  getAiUsage,
  getCurrentUser,
  getRecentProjects,
  getRenderQueue,
  getStorage,
} from "@/services/dashboardService";

function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-muted ${className}`} />;
}

function buildQueryOptions(queryKey, queryFn) {
  return {
    queryKey,
    queryFn,
    retry: 2,
    retryDelay: (attempt) => Math.min(attempt * 1_000, 3_000),
  };
}

export function DashboardPage() {
  const user = useQuery(buildQueryOptions(["current-user"], getCurrentUser));
  const projects = useQuery(buildQueryOptions(["recent-projects"], getRecentProjects));
  const queue = useQuery(buildQueryOptions(["render-queue"], getRenderQueue));
  const usage = useQuery(buildQueryOptions(["ai-usage"], getAiUsage));
  const storage = useQuery(buildQueryOptions(["storage"], getStorage));

  const queries = [user, projects, queue, usage, storage];

  useEffect(() => {
    const allSettled = queries.every((q) => !q.isLoading);
    const anyError = queries.some((q) => q.isError);
    const allSuccess = queries.every((q) => q.isSuccess);

    if (allSettled && allSuccess) {
      toast.success("Dashboard refreshed", { description: "All data is up to date." });
    } else if (allSettled && anyError) {
      toast.error("Dashboard update failed", {
        description: "Some dashboard data could not be loaded. Try retrying.",
      });
    }
  }, [user.isSuccess, projects.isSuccess, queue.isSuccess, usage.isSuccess, storage.isSuccess]);

  if (user.isLoading && !user.data) {
    return (
      <div className="min-h-screen space-y-4 bg-background p-6">
        <Skeleton className="h-16" />
        <Skeleton className="h-48" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  return (
    <DashboardLayout user={user.data}>
      <div className="mx-auto w-full max-w-[1400px] space-y-5">
        <WelcomeSection user={user.data} />

        <div className="grid gap-5 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">
            <RecentProjects
              projects={projects.data ?? []}
              isLoading={projects.isLoading}
              error={projects.error}
              onRetry={() => projects.refetch()}
            />
            {queue.data ? (
              <RenderingQueue jobs={queue.data} />
            ) : (
              <Skeleton className="h-80" />
            )}
          </div>

          <div className="space-y-5">
            <QuickActions />
            {usage.data ? <AiUsageCard usage={usage.data} /> : <Skeleton className="h-72" />}
            {storage.data ? <StorageCard storage={storage.data} /> : <Skeleton className="h-72" />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
