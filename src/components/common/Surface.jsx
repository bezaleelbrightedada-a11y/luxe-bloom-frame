import { cn } from "@/lib/utils";

/**
 * Base card surface used across the dashboard.
 * `delay` staggers the entrance animation (ms).
 */
export function Surface({ className, children, delay = 0, ...rest }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "animate-rise rounded-2xl border border-border/70 bg-card text-card-foreground",
        "shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-18px_rgba(16,24,40,0.35)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function SurfaceHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
      <div>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
