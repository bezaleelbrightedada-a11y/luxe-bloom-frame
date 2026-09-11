import { ActionButton } from "@/components/common/ActionButton";
import { Skeleton } from "@/components/common/Skeleton";
import { AiUsageCard } from "@/components/dashboard/AiUsageCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RenderingQueue } from "@/components/dashboard/RenderingQueue";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useDashboardNotifications } from "@/hooks/useDashboardNotifications";

function DashboardBootSkeleton() {
  return (
    <div className="min-h-screen space-y-4 bg-background p-6">
      <Skeleton className="h-16" />
      <Skeleton className="h-48" />
      <Skeleton className="h-72" />
    </div>
  );
}

function DashboardErrorState({ onRetry }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard unavailable</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We could not load your profile. Make sure VITE_API_BASE_URL is configured and the API is
        reachable.
      </p>
      <ActionButton onClick={onRetry} className="mt-6 py-2 font-medium transition">
        Retry
      </ActionButton>
    </div>
  );
}

export function DashboardPage() {
  const { user, projects, queue, usage, storage, all } = useDashboardData();

  useDashboardNotifications(all);

  if (user.isLoading && !user.data) return <DashboardBootSkeleton />;
  if (user.isError) return <DashboardErrorState onRetry={user.refetch} />;

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
              onRetry={projects.refetch}
            />
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
