import { AiUsageCard } from "@/components/dashboard/AiUsageCard";
import { AppShell } from "@/components/layout/AppShell";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RenderingQueue } from "@/components/dashboard/RenderingQueue";
import { SectionState } from "@/components/common/SectionState";
import { StorageCard } from "@/components/dashboard/StorageCard";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useDashboardNotifications } from "@/hooks/useDashboardNotifications";

export function DashboardPage() {
  const { user, projects, queue, usage, storage, all } = useDashboardData();

  useDashboardNotifications(all);

  return (
    <AppShell>
      <WelcomeSection user={user.data} />

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <RecentProjects
            projects={projects.data ?? []}
            isLoading={projects.isLoading}
            error={projects.error}
            onRetry={projects.refetch}
          />
          <SectionState query={queue} title="Rendering queue" height="h-80">
            <RenderingQueue jobs={queue.data ?? []} />
          </SectionState>
        </div>

        <div className="space-y-5">
          <QuickActions />
          <SectionState query={usage} title="AI usage">
            {usage.data ? <AiUsageCard usage={usage.data} /> : null}
          </SectionState>
          <SectionState query={storage} title="Storage">
            {storage.data ? <StorageCard storage={storage.data} /> : null}
          </SectionState>
        </div>
      </div>
    </AppShell>
  );
}
