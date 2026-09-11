import { Image as ImageIcon } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { DataTable } from "@/components/common/DataTable";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { SECTION_DELAYS } from "@/constants/dashboard";
import { formatRelativeTime } from "@/utils/format";

/**
 * Column definitions live outside the component so their identity is stable
 * across renders (avoids re-sorting / re-rendering the table body).
 */
const PROJECT_COLUMNS = [
  {
    key: "name",
    title: "Project",
    render: (project) => (
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br sm:size-12 ${project.thumbnailTone}`}
        >
          <ImageIcon className="size-4 text-foreground/50 sm:size-5" aria-hidden="true" />
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
    render: (project) => (
      <span className="text-xs text-muted-foreground">{formatRelativeTime(project.updatedAt)}</span>
    ),
  },
];

const projectKey = (project) => project.id;

/**
 * Recent projects table with loading, empty and error states.
 *
 * @param {Object} props
 * @param {object[]} [props.projects]
 * @param {boolean} [props.isLoading]
 * @param {Error|null} [props.error]
 * @param {() => void} [props.onRetry]
 * @param {(project: object) => void} [props.onSelectProject]
 * @param {() => void} [props.onCreateProject]
 * @param {() => void} [props.onViewAll]
 */
export function RecentProjects({
  projects = [],
  isLoading = false,
  error = null,
  onRetry,
  onSelectProject,
  onCreateProject,
  onViewAll,
}) {
  return (
    <Surface delay={SECTION_DELAYS.recentProjects}>
      <SurfaceHeader
        title="Recent projects"
        subtitle="Your latest scenes and their progress"
        action={
          <ActionButton variant="ghost" onClick={onViewAll}>
            View all
          </ActionButton>
        }
      />
      <div className="p-2 sm:p-3">
        <DataTable
          columns={PROJECT_COLUMNS}
          data={projects}
          keyExtractor={projectKey}
          isLoading={isLoading}
          error={error}
          sortable
          onRowClick={onSelectProject}
          onRetry={onRetry}
          rowClassName="press"
          emptyState={{
            icon: ImageIcon,
            title: "No projects yet",
            description: "Create your first render project to see it here.",
            action: { label: "New project", onClick: onCreateProject },
          }}
          ariaLabel="Recent projects"
        />
      </div>
    </Surface>
  );
}
