import { Skeleton } from "@/components/common/Skeleton";
import { ActionButton } from "@/components/common/ActionButton";
import { Surface, SurfaceHeader } from "@/components/common/Surface";

/**
 * Reusable selectable card grid used for presenters and voices.
 *
 * @param {Object} props
 * @param {string} props.step Step number shown before the title.
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {{ isLoading: boolean, data?: Array<{id: string, name: string, description?: string}>, error?: Error|null, refetch?: () => void }} props.query
 * @param {string|null} props.selectedId
 * @param {(id: string) => void} props.onSelect
 */
export function OptionPicker({ step, title, subtitle, query, selectedId, onSelect }) {
  const options = query.data ?? [];

  return (
    <Surface>
      <SurfaceHeader title={`${step}. ${title}`} subtitle={subtitle} />
      <div className="p-5 sm:p-6">
        {query.isLoading ? (
          <Skeleton className="h-24" />
        ) : options.length === 0 ? (
          <div>
            <p className="text-sm text-muted-foreground">
              No {title.toLowerCase()} options available yet.
            </p>
            {query.refetch ? (
              <ActionButton variant="outline" onClick={query.refetch} className="mt-3">
                Retry
              </ActionButton>
            ) : null}
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {options.map((option) => {
              const selected = option.id === selectedId;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(option.id)}
                    aria-pressed={selected}
                    className={`press w-full rounded-xl border p-3.5 text-left ${
                      selected
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/70 bg-muted/40 hover:border-primary/30"
                    }`}
                  >
                    <span className="block truncate text-sm font-semibold tracking-tight">
                      {option.name}
                    </span>
                    {option.description ? (
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Surface>
  );
}
