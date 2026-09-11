import { Pause, RotateCcw, Server } from "lucide-react";

import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Surface, SurfaceHeader } from "@/components/common/Surface";

function eta(job) {
  if (job.status === "completed") return "Done";
  if (job.status === "failed") return "Stopped";
  return `~${job.etaMinutes} min left`;
}

function QueueRow({ job, index }) {
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
          {eta(job)}
          <button
            type="button"
            aria-label={isActive ? "Pause render" : "Retry render"}
            className="press grid size-7 place-items-center rounded-lg border border-border/70 bg-card text-foreground"
          >
            {isActive ? <Pause className="size-3.5" /> : <RotateCcw className="size-3.5" />}
          </button>
        </span>
      </div>
    </li>
  );
}

export function RenderingQueue({ jobs }) {
  const active = jobs.filter((job) => job.status === "rendering" || job.status === "queued").length;

  return (
    <Surface delay={120}>
      <SurfaceHeader
        title="Rendering queue"
        subtitle={`${active} job${active === 1 ? "" : "s"} pending`}
        action={
          <button
            type="button"
            className="press rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Manage
          </button>
        }
      />
      <ul className="space-y-2.5 p-4 sm:p-5">
        {jobs.map((job, index) => (
          <QueueRow key={job.id} job={job} index={index} />
        ))}
      </ul>
    </Surface>
  );
}
