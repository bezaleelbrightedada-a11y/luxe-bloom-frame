import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { RenderingQueue } from "@/components/dashboard/RenderingQueue";
import { SectionState } from "@/components/common/SectionState";
import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import { getRenderQueue } from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

/** Full-page view of every render job. */
export function RenderQueuePage() {
  const queue = useApiResource(DASHBOARD_QUERY_KEYS.queue, getRenderQueue);

  return (
    <AppShell>
      <PageHeader
        title="Render queue"
        description="Jobs currently rendering, queued, completed or stopped."
      />
      <SectionState query={queue} title="Render queue" height="h-96">
        <RenderingQueue jobs={queue.data ?? []} />
      </SectionState>
    </AppShell>
  );
}
