import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getCurrentUser } from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

/**
 * Application shell shared by every route: sidebar, top navigation and a
 * centered content column. Fetches the signed-in user once per page.
 */
export function AppShell({ children }) {
  const user = useApiResource(DASHBOARD_QUERY_KEYS.user, getCurrentUser);

  return (
    <DashboardLayout user={user.data}>
      <div className="mx-auto w-full max-w-[1400px] space-y-5">{children}</div>
    </DashboardLayout>
  );
}
