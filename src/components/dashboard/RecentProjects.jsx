import { ChevronRight, Image as ImageIcon } from "lucide-react";

import { DataTable } from "@/components/common/DataTable";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Surface, SurfaceHeader } from "@/components/common/Surface";

function relativeTime(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.round(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

/**
 * Column definitions are declared outside the component so they are stable
 * across renders and easy to reuse or extend.
 */
const columns = [
  {
    key: "name",
    title: "Project",
    render: (project) => (
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br sm:size-12 ${project.thumbnailTone}`}
        >
          <ImageIcon className="size-4 text-foreground/50 sm:size-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold tracking-tight">{project.name}</span>
            <span className="sm:hidden">
              <StatusBadge status={project.status} />
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {project.client} · {project.frames} frames
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    align: "center",
    sortable: true,
    headerClassName: "hidden sm:table-cell",
    cellClassName: "hidden sm:table-cell",
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
    render: (project) => <span className="text-xs text-muted-foreground">{relativeTime(project.updatedAt)}</span>,
  },
];

export function RecentProjects({ projects, isLoading = false, error = null, onRetry }) {
  return (
    <Surface delay={80}>
      <SurfaceHeader
        title="Recent projects"
        subtitle="Your latest scenes and their progress"
        action={
          <button
            type="button"
            className="press rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
          >
            View all
          </button>
        }
      />
      <div className="p-2 sm:p-3">
        <DataTable
          columns={columns}
          data={projects}
          keyExtractor={(project) => project.id}
          isLoading={isLoading}
          error={error}
          sortable
          onRowClick={(project) => {
            // Future: navigate to project detail page.
            // eslint-disable-next-line no-console
            console.log("Open project:", project.id);
          }}
          onRetry={onRetry}
          rowClassName="press"
          emptyState={{
            icon: ImageIcon,
            title: "No projects yet",
            description: "Create your first render project to see it here.",
            action: {
              label: "New project",
              onClick: () => {
                // Future: open new-project modal or navigate to /projects/new.
              },
            },
          }}
          ariaLabel="Recent projects"
        />
      </div>
    </Surface>
  );
}
