import { AlertCircle, Inbox } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { cn } from "@/lib/utils";
import { alignClass } from "@/utils/table";

const STATE_BUTTON_CLASS = "rounded-lg px-3 py-2 font-medium hover:bg-primary/90 mt-4";

/**
 * Renders either a caller supplied node or a standard empty state.
 * @param {{ config?: object|React.ReactNode }} props
 */
export function EmptyStateRenderer({ config }) {
  if (!config) return null;

  // Allow callers to pass a fully custom React node.
  if (typeof config !== "object" || !("title" in config)) return config;

  const Icon = config.icon || Inbox;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-muted">
        <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold">{config.title}</h3>
      {config.description ? (
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">{config.description}</p>
      ) : null}
      {config.action ? (
        <ActionButton onClick={config.action.onClick} className={STATE_BUTTON_CLASS}>
          {config.action.label}
        </ActionButton>
      ) : null}
    </div>
  );
}

/**
 * Standard failure state with an optional retry action.
 * @param {{ error: Error|string|null, onRetry?: () => void }} props
 */
export function ErrorState({ error, onRetry }) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Something went wrong. Please try again.";

  return (
    <div role="alert" className="flex flex-col items-center justify-center py-12 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-destructive/10">
        <AlertCircle className="size-6 text-destructive" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold">Failed to load data</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <ActionButton onClick={onRetry} className={STATE_BUTTON_CLASS}>
          Try again
        </ActionButton>
      ) : null}
    </div>
  );
}

/**
 * Single shimmering placeholder row matching the column layout.
 * @param {{ columns: object[] }} props
 */
export function SkeletonRow({ columns }) {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className={cn("px-4 py-3.5", column.cellClassName)}>
          <div
            className={cn(
              "h-4 w-3/4 rounded-md bg-muted shimmer",
              column.align === "right" && "ml-auto",
              column.align === "center" && "mx-auto",
              alignClass(column.align) === "text-center" && "mx-auto",
            )}
          />
        </td>
      ))}
    </tr>
  );
}
