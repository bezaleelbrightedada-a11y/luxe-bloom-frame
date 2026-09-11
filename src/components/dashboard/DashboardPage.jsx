import { ActionButton } from "@/components/common/ActionButton";
import { Skeleton } from "@/components/common/Skeleton";
import { Surface } from "@/components/common/Surface";
import { AiUsageCard } from "@/components/dashboard/AiUsageCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RenderingQueue } from "@/components/dashboard/RenderingQueue";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useDashboardNotifications } from "@/hooks/useDashboardNotifications";

/** Inline placeholder used when a section has no data yet. */
function SectionPlaceholder({ title, query, height = "h-72", children }) {
  if (query.isLoading) return <Skeleton className={height} />;
  if (query.data) return children;

  return (
    <Surface className="p-5 sm:p-6">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        No data yet. Connect the API to see this section.
      </p>
      <ActionButton variant="outline" onClick={query.refetch} className="mt-4">
        Retry
      </ActionButton>
    </Surface>
  );
}

export function DashboardPage() {
  const { user, projects, queue, usage, storage, all } = useDashboardData();

  useDashboardNotifications(all);

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
            <SectionPlaceholder title="Rendering queue" query={queue} height="h-80">
              <RenderingQueue jobs={queue.data ?? []} />
            </SectionPlaceholder>
          </div>

          <div className="space-y-5">
            <QuickActions />
            <SectionPlaceholder title="AI usage" query={usage}>
              {usage.data ? <AiUsageCard usage={usage.data} /> : null}
            </SectionPlaceholder>
            <SectionPlaceholder title="Storage" query={storage}>
              {storage.data ? <StorageCard storage={storage.data} /> : null}
            </SectionPlaceholder>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
