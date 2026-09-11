import { useCallback, useEffect, useState } from "react";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";

/**
 * Application shell: sidebar + top navigation + main content slot.
 * Owns the mobile drawer state only; all data comes from props.
 */
export function DashboardLayout({ user, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  // Escape closes the mobile drawer; listener is always cleaned up.
  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeSidebar();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, closeSidebar]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav user={user} onOpenSidebar={openSidebar} />
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-7">{children}</main>
      </div>
    </div>
  );
}
