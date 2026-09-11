import { useMemo, useState } from "react";
import { Image as ImageIcon, Search } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/common/DataTable";
import { PageHeader } from "@/components/common/PageHeader";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Surface } from "@/components/common/Surface";
import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import { formatRelativeTime } from "@/utils/format";
import { getProjects } from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

const COLUMNS = [
  {
    key: "name",
    title: "Project",
    render: (project) => (
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted sm:size-12">
          <ImageIcon className="size-4 text-foreground/50 sm:size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">{project.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{project.client}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    align: "center",
    sortable: true,
    render: (project) => <StatusBadge status={project.status} />,
  },
  {
    key: "progress",
    title: "Progress",
    sortable: true,
    render: (project) => (
      <div className="w-full min-w-[6rem]">
        <ProgressBar value={project.progress} className="h-1.5" />
        <p className="mt-1 text-right text-xs text-muted-foreground">{project.progress}%</p>
      </div>
    ),
  },
  {
    key: "updatedAt",
    title: "Updated",
    sortable: true,
    headerClassName: "hidden md:table-cell",
    cellClassName: "hidden md:table-cell whitespace-nowrap",
    render: (project) => (
      <span className="text-xs text-muted-foreground">{formatRelativeTime(project.updatedAt)}</span>
    ),
  },
];

const projectKey = (project) => project.id;

/** Every project in the workspace, searchable by name or client. */
export function ProjectsPage() {
  const projects = useApiResource(DASHBOARD_QUERY_KEYS.projects, getProjects);
  const [term, setTerm] = useState("");

  const rows = useMemo(() => {
    const list = projects.data ?? [];
    const needle = term.trim().toLowerCase();
    if (!needle) return list;
    return list.filter((project) =>
      [project.name, project.client].filter(Boolean).some((field) =>
        String(field).toLowerCase().includes(needle),
      ),
    );
  }, [projects.data, term]);

  return (
    <AppShell>
      <PageHeader
        title="Projects"
        description="Every project being worked on in this workspace, with its current status and progress."
        actions={<ActionButton>New project</ActionButton>}
      />

      <Surface className="p-3 sm:p-4">
        <div className="relative mb-3">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search projects"
            aria-label="Search projects"
            className="h-10 w-full rounded-xl border border-border/70 bg-card pl-9 pr-3 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:border-primary/40"
          />
        </div>

        <DataTable
          columns={COLUMNS}
          data={rows}
          keyExtractor={projectKey}
          isLoading={projects.isLoading}
          error={projects.error}
          sortable
          onRetry={projects.refetch}
          emptyState={{
            icon: ImageIcon,
            title: term ? "No matching projects" : "No projects yet",
            description: term
              ? "Try a different search term."
              : "Projects you create will be listed here.",
          }}
          ariaLabel="All projects"
        />
      </Surface>
    </AppShell>
  );
}
