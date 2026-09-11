import { ChevronRight, Image as ImageIcon } from "lucide-react";

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

function ProjectRow({ project, index }) {
  return (
    <li
      style={{ animationDelay: `${index * 70}ms` }}
      className="animate-rise press flex cursor-pointer items-center gap-4 rounded-xl border border-transparent px-3 py-3 hover:border-border/70 hover:bg-muted/50"
    >
      <div
        className={`grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${project.thumbnailTone}`}
      >
        <ImageIcon className="size-5 text-foreground/50" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold tracking-tight">{project.name}</p>
          <span className="hidden sm:inline">
            <StatusBadge status={project.status} />
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {project.client} · {project.frames} frames · {relativeTime(project.updatedAt)}
        </p>
        <ProgressBar value={project.progress} className="mt-2 h-1.5 sm:hidden" />
      </div>

      <div className="hidden w-32 sm:block">
        <ProgressBar value={project.progress} className="h-1.5" />
        <p className="mt-1.5 text-right text-xs text-muted-foreground">{project.progress}%</p>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </li>
  );
}

export function RecentProjects({ projects }) {
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
      <ul className="space-y-1 p-2 sm:p-3">
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </ul>
    </Surface>
  );
}
