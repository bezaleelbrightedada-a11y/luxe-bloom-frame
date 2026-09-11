import { cn } from "@/lib/utils";

const STATUS_STYLES = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  in_progress: { label: "In progress", className: "bg-primary/12 text-primary" },
  review: { label: "In review", className: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  rendering: { label: "Rendering", className: "bg-primary/12 text-primary" },
  queued: { label: "Queued", className: "bg-muted text-muted-foreground" },
  failed: { label: "Failed", className: "bg-destructive/12 text-destructive" },
};

export function StatusBadge({ status }) {
  const meta = STATUS_STYLES[status] ?? STATUS_STYLES.draft;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        meta.className,
      )}
    >
      {status === "rendering" ? (
        <span className="size-1.5 animate-pulse rounded-full bg-current" />
      ) : null}
      {meta.label}
    </span>
  );
}
