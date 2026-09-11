import { cn } from "@/lib/utils";
import { clampPercent } from "@/utils/format";

/**
 * Accessible progress indicator.
 *
 * @param {Object} props
 * @param {number} [props.value=0] - 0-100, clamped.
 * @param {string} [props.tone='bg-primary'] - Tailwind background class for the fill.
 * @param {string} [props.className]
 * @param {boolean} [props.animated=false] - Adds a shimmer for in-flight work.
 * @param {string} [props.label] - Accessible name for standalone bars.
 */
export function ProgressBar({ value = 0, tone = "bg-primary", className, animated = false, label }) {
  const clamped = clampPercent(value);

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: `${clamped}%` }}
        className={cn(
          "relative h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
          tone,
        )}
      >
        {animated ? <span className="shimmer absolute inset-0 rounded-full" aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
