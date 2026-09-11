import { cn } from "@/lib/utils";

/**
 * Neutral loading placeholder block.
 * @param {{ className?: string }} props
 */
export function Skeleton({ className }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-2xl bg-muted", className)} />;
}
