import { ActionButton } from "@/components/common/ActionButton";
import { Skeleton } from "@/components/common/Skeleton";
import { Surface } from "@/components/common/Surface";

/**
 * Renders loading / empty / error states for a React Query result and only
 * shows `children` once real data has arrived.
 *
 * @param {Object} props
 * @param {{ isLoading: boolean, data?: unknown, error?: Error|null, refetch?: () => void }} props.query
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {string} [props.height] Tailwind height class for the skeleton.
 * @param {React.ReactNode} props.children
 */
export function SectionState({ query, title, description, height = "h-64", children }) {
  if (query.isLoading) return <Skeleton className={height} />;
  if (query.data) return children;

  return (
    <Surface className="p-6">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {query.error
          ? "We couldn't load this yet. Connect your data source and try again."
          : (description ?? "Nothing here yet.")}
      </p>
      {query.refetch ? (
        <ActionButton variant="outline" onClick={query.refetch} className="mt-4">
          Retry
        </ActionButton>
      ) : null}
    </Surface>
  );
}
