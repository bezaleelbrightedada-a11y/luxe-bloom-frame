import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown, AlertCircle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @typedef {Object} ColumnDefinition
 * @property {string} key - Unique field key. Used for default cell value and sorting.
 * @property {string} title - Header label.
 * @property {('left'|'center'|'right')} [align='left'] - Cell text alignment.
 * @property {string} [width] - Optional Tailwind width class (e.g. "w-32").
 * @property {boolean} [sortable=false] - Whether this column can be sorted.
 * @property {string} [headerClassName] - Extra classes for the header cell.
 * @property {string} [cellClassName] - Extra classes for every body cell in this column.
 * @property {function(Object, number): React.ReactNode} [render] - Custom render function: (row, rowIndex) => ReactNode
 */

/**
 * @typedef {Object} EmptyStateConfig
 * @property {React.ComponentType} [icon] - Lucide icon component.
 * @property {string} title - Empty state title.
 * @property {string} [description] - Empty state description.
 * @property {Object} [action] - Optional action button config.
 * @property {string} action.label
 * @property {function} action.onClick
 */

/**
 * @typedef {Object} DataTableProps
 * @property {ColumnDefinition[]} columns
 * @property {Object[]} data
 * @property {function(Object, number): string} keyExtractor - Returns a stable React key for each row.
 * @property {boolean} [isLoading=false]
 * @property {Error|string|null} [error=null]
 * @property {EmptyStateConfig|React.ReactNode} [emptyState]
 * @property {function(Object, number): void} [onRowClick]
 * @property {boolean} [sortable=false]
 * @property {string} [className]
 * @property {string|function(Object, number): string} [rowClassName]
 * @property {string} [tableClassName]
 * @property {string} [headerClassName]
 * @property {function} [onRetry] - Called from the error-state retry button.
 * @property {string} [ariaLabel]
 */

function getValue(row, key) {
  return row[key];
}

function sortRows(rows, config) {
  if (!config) return rows;
  const { key, direction } = config;

  return [...rows].sort((a, b) => {
    const aVal = getValue(a, key);
    const bVal = getValue(b, key);

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    if (aStr < bStr) return direction === "asc" ? -1 : 1;
    if (aStr > bStr) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

function alignClass(align) {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

function resolveClassName(value, row, rowIndex) {
  return typeof value === "function" ? value(row, rowIndex) : value;
}

function EmptyStateRenderer({ config }) {
  if (!config) return null;

  // Allow callers to pass a fully custom React node.
  if (typeof config !== "object" || !("title" in config)) {
    return config;
  }

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
        <button
          type="button"
          onClick={config.action.onClick}
          className="mt-4 press rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {config.action.label}
        </button>
      ) : null}
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Something went wrong. Please try again.";

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-destructive/10">
        <AlertCircle className="size-6 text-destructive" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold">Failed to load data</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 press rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

function SkeletonRow({ columns }) {
  return (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className={cn("px-4 py-3.5", column.cellClassName)}>
          <div
            className={cn(
              "h-4 w-3/4 rounded-md bg-muted shimmer",
              column.align === "right" && "ml-auto",
              column.align === "center" && "mx-auto",
            )}
          />
        </td>
      ))}
    </tr>
  );
}

/**
 * A reusable, responsive data table built for API-driven content.
 *
 * Features:
 * - Column definitions via props (no hardcoded columns)
 * - Optional client-side sorting per column
 * - Loading skeleton rows
 * - Empty and error states
 * - Accessible markup with ARIA sort indicators
 * - Framer Motion row entrance animations
 * - Responsive horizontal scroll
 */
export function DataTable({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  error = null,
  emptyState,
  onRowClick,
  sortable = false,
  className,
  rowClassName,
  tableClassName,
  headerClassName,
  onRetry,
  ariaLabel,
}) {
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (column) => {
    if (!sortable || !column.sortable) return;

    setSortConfig((current) => {
      if (current?.key === column.key) {
        if (current.direction === "asc") {
          return { key: column.key, direction: "desc" };
        }
        return null; // Third click clears the sort.
      }
      return { key: column.key, direction: "asc" };
    });
  };

  const processedData = useMemo(() => sortRows(data, sortConfig), [data, sortConfig]);

  const isEmpty = !isLoading && !error && processedData.length === 0;
  const isError = !isLoading && error;
  const showTable = !isError;

  return (
    <div className={cn("w-full", className)}>
      {showTable ? (
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table
            className={cn("w-full caption-bottom text-sm", tableClassName)}
            aria-label={ariaLabel}
          >
            <thead className={cn("bg-muted/50", headerClassName)}>
              <tr>
                {columns.map((column) => {
                  const active = sortConfig?.key === column.key;

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      className={cn(
                        "group px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground",
                        alignClass(column.align),
                        column.width,
                        column.headerClassName,
                        sortable && column.sortable && "cursor-pointer select-none hover:text-foreground",
                      )}
                      aria-sort={active ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
                      onClick={() => handleSort(column)}
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          column.align === "right" && "flex-row-reverse",
                        )}
                      >
                        {column.title}
                        {sortable && column.sortable ? (
                          active ? (
                            sortConfig.direction === "asc" ? (
                              <ArrowUp className="size-3.5 text-primary" aria-hidden="true" />
                            ) : (
                              <ArrowDown className="size-3.5 text-primary" aria-hidden="true" />
                            )
                          ) : (
                            <ArrowUpDown
                              className="size-3.5 opacity-40 transition-opacity group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          )
                        ) : null}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70 bg-card">
              {isLoading ? (
                <>
                  {[...Array(4)].map((_, index) => (
                    <SkeletonRow key={index} columns={columns} />
                  ))}
                </>
              ) : (
                processedData.map((row, rowIndex) => {
                  const key = keyExtractor(row, rowIndex);
                  const resolvedRowClass = resolveClassName(rowClassName, row, rowIndex);

                  return (
                    <motion.tr
                      key={key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: rowIndex * 0.04, ease: [0.32, 0.72, 0, 1] }}
                      onClick={() => onRowClick?.(row, rowIndex)}
                      className={cn(
                        "group/row transition-colors duration-200",
                        onRowClick && "cursor-pointer hover:bg-muted/40",
                        resolvedRowClass,
                      )}
                      role={onRowClick ? "button" : undefined}
                      tabIndex={onRowClick ? 0 : undefined}
                      onKeyDown={(event) => {
                        if (onRowClick && (event.key === "Enter" || event.key === " ")) {
                          event.preventDefault();
                          onRowClick(row, rowIndex);
                        }
                      }}
                    >
                      {columns.map((column) => {
                        const content = column.render
                          ? column.render(row, rowIndex)
                          : getValue(row, column.key);

                        return (
                          <td
                            key={column.key}
                            className={cn(
                              "px-4 py-3.5 align-middle",
                              alignClass(column.align),
                              column.cellClassName,
                            )}
                          >
                            {content}
                          </td>
                        );
                      })}
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : null}

      {isEmpty ? <EmptyStateRenderer config={emptyState} /> : null}
      {isError ? <ErrorState error={error} onRetry={onRetry} /> : null}
    </div>
  );
}
