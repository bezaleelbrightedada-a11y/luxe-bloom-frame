import { cn } from "@/lib/utils";

export function ProgressBar({ value = 0, tone = "bg-primary", className, animated = false }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: `${clamped}%` }}
        className={cn(
          "relative h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          tone,
        )}
      >
        {animated ? <span className="shimmer absolute inset-0 rounded-full" /> : null}
      </div>
    </div>
  );
}
