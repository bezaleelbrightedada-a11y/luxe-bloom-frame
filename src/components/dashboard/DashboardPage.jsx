import { useQuery } from "@tanstack/react-query";

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

export function DashboardPage() {
  const user = useQuery({ queryKey: ["current-user"], queryFn: getCurrentUser });
  const projects = useQuery({ queryKey: ["recent-projects"], queryFn: getRecentProjects });
  const queue = useQuery({ queryKey: ["render-queue"], queryFn: getRenderQueue });
  const usage = useQuery({ queryKey: ["ai-usage"], queryFn: getAiUsage });
  const storage = useQuery({ queryKey: ["storage"], queryFn: getStorage });

  if (!user.data) {
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
            {projects.data ? <RecentProjects projects={projects.data} /> : <Skeleton className="h-80" />}
            {queue.data ? <RenderingQueue jobs={queue.data} /> : <Skeleton className="h-80" />}
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
