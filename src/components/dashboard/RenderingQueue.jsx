import { memo } from "react";
import { Pause, RotateCcw, Server } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { SECTION_DELAYS } from "@/constants/dashboard";
import { pluralize } from "@/utils/format";

const PENDING_STATUSES = ["rendering", "queued"];

/** @param {{ status: string, etaMinutes?: number }} job */
function formatEta(job) {
  if (job.status === "completed") return "Done";
  if (job.status === "failed") return "Stopped";
  return `~${job.etaMinutes} min left`;
}

const QueueRow = memo(function QueueRow({ job, index, onToggle }) {
  const isActive = job.status === "rendering";

  return (
    <li
      style={{ animationDelay: `${index * 70}ms` }}
      className="animate-rise rounded-xl border border-border/70 bg-muted/40 p-3.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">{job.projectName}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{job.preset}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <ProgressBar
        value={job.progress}
        animated={isActive}
        tone={job.status === "failed" ? "bg-destructive" : "bg-primary"}
        className="mt-3 h-1.5"
      />

      <div className="mt-2.5 flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Server className="size-3.5" />
          {job.node}
        </span>
        <span className="inline-flex items-center gap-2">
          {formatEta(job)}
          <button
            type="button"
            onClick={() => onToggle?.(job)}
            aria-label={`${isActive ? "Pause" : "Retry"} render for ${job.projectName}`}
            className="press grid size-7 place-items-center rounded-lg border border-border/70 bg-card text-foreground"
          >
            {isActive ? <Pause className="size-3.5" /> : <RotateCcw className="size-3.5" />}
          </button>
        </span>
      </div>
    </li>
  );
});

/**
 * Live render queue list.
 * @param {{ jobs?: object[], onToggleJob?: (job: object) => void, onManage?: () => void }} props
 */
export function RenderingQueue({ jobs = [], onToggleJob, onManage }) {
  const pending = jobs.filter((job) => PENDING_STATUSES.includes(job.status)).length;

  return (
    <Surface delay={SECTION_DELAYS.renderingQueue}>
      <SurfaceHeader
        title="Rendering queue"
        subtitle={`${pending} ${pluralize(pending, "job")} pending`}
        action={
          <ActionButton variant="ghost" onClick={onManage}>
            Manage
          </ActionButton>
        }
      />
      <ul className="space-y-2.5 p-4 sm:p-5">
        {jobs.map((job, index) => (
          <QueueRow key={job.id} job={job} index={index} onToggle={onToggleJob} />
        ))}
      </ul>
    </Surface>
  );
}
