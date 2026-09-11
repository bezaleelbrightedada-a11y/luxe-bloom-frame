import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { EmptyStateRenderer, ErrorState, SkeletonRow } from "@/components/common/DataTableStates";
import { cn } from "@/lib/utils";
import { alignClass, nextSortConfig, resolveClassName, sortRows } from "@/utils/table";

/**
 * @typedef {Object} ColumnDefinition
 * @property {string} key - Unique field key. Used for default cell value and sorting.
 * @property {string} title - Header label.
 * @property {('left'|'center'|'right')} [align='left'] - Cell text alignment.
 * @property {string} [width] - Optional Tailwind width class (e.g. "w-32").
 * @property {boolean} [sortable=false] - Whether this column can be sorted.
 * @property {string} [headerClassName] - Extra classes for the header cell.
 * @property {string} [cellClassName] - Extra classes for every body cell in this column.
 * @property {function(Object, number): React.ReactNode} [render] - (row, rowIndex) => ReactNode
 */

/**
 * @typedef {Object} DataTableProps
 * @property {ColumnDefinition[]} columns
 * @property {Object[]} data
 * @property {function(Object, number): string} keyExtractor - Stable React key per row.
 * @property {boolean} [isLoading=false]
 * @property {Error|string|null} [error=null]
 * @property {Object|React.ReactNode} [emptyState]
 * @property {function(Object, number): void} [onRowClick]
 * @property {boolean} [sortable=false] - Master switch for per-column sorting.
 * @property {number} [skeletonRows=4]
 * @property {string} [className]
 * @property {string|function(Object, number): string} [rowClassName]
 * @property {string} [tableClassName]
 * @property {string} [headerClassName]
 * @property {function} [onRetry]
 * @property {string} [ariaLabel]
 */

const ROW_TRANSITION_EASE = [0.32, 0.72, 0, 1];

function SortIndicator({ active, direction }) {
  if (active) {
    const Icon = direction === "asc" ? ArrowUp : ArrowDown;
    return <Icon className="size-3.5 text-primary" aria-hidden="true" />;
  }
  return (
    <ArrowUpDown
      className="size-3.5 opacity-40 transition-opacity group-hover:opacity-100"
      aria-hidden="true"
    />
  );
}

function HeaderCell({ column, sortable, sortConfig, onSort }) {
  const isSortable = sortable && column.sortable;
  const active = sortConfig?.key === column.key;

  const label = (
    <>
      {column.title}
      {isSortable ? <SortIndicator active={active} direction={sortConfig?.direction} /> : null}
    </>
  );

  const labelClass = cn(
    "inline-flex items-center gap-1.5",
    column.align === "right" && "flex-row-reverse",
  );

  return (
    <th
      scope="col"
      className={cn(
        "group px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground",
        alignClass(column.align),
        column.width,
        column.headerClassName,
        isSortable && "cursor-pointer select-none hover:text-foreground",
      )}
      aria-sort={active ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
    >
      {isSortable ? (
        <button type="button" className={labelClass} onClick={() => onSort(column.key)}>
          {label}
        </button>
      ) : (
        <span className={labelClass}>{label}</span>
      )}
    </th>
  );
}

function BodyRow({ row, rowIndex, columns, keyExtractor, rowClassName, onRowClick }) {
  const interactive = Boolean(onRowClick);

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: rowIndex * 0.04, ease: ROW_TRANSITION_EASE }}
      onClick={interactive ? () => onRowClick(row, rowIndex) : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onRowClick(row, rowIndex);
              }
            }
          : undefined
      }
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        "group/row transition-colors duration-200",
        interactive && "cursor-pointer hover:bg-muted/40",
        resolveClassName(rowClassName, row, rowIndex),
      )}
      data-row-key={keyExtractor(row, rowIndex)}
    >
      {columns.map((column) => (
        <td
          key={column.key}
          className={cn("px-4 py-3.5 align-middle", alignClass(column.align), column.cellClassName)}
        >
          {column.render ? column.render(row, rowIndex) : row[column.key]}
        </td>
      ))}
    </motion.tr>
  );
}

/**
 * A reusable, responsive data table built for API-driven content.
 *
 * Features: prop-driven columns, optional client-side sorting, loading
 * skeletons, empty and error states, accessible markup with ARIA sort
 * indicators, Framer Motion row entrance, and responsive horizontal scroll.
 *
 * @param {DataTableProps} props
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
  skeletonRows = 4,
  className,
  rowClassName,
  tableClassName,
  headerClassName,
  onRetry,
  ariaLabel,
}) {
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = useCallback((key) => {
    setSortConfig((current) => nextSortConfig(current, key));
  }, []);

  const rows = useMemo(() => sortRows(data ?? [], sortConfig), [data, sortConfig]);

  const hasError = !isLoading && Boolean(error);
  const isEmpty = !isLoading && !hasError && rows.length === 0;

  return (
    <div className={cn("w-full", className)}>
      {hasError ? null : (
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table
            className={cn("w-full caption-bottom text-sm", tableClassName)}
            aria-label={ariaLabel}
            aria-busy={isLoading || undefined}
          >
            <thead className={cn("bg-muted/50", headerClassName)}>
              <tr>
                {columns.map((column) => (
                  <HeaderCell
                    key={column.key}
                    column={column}
                    sortable={sortable}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70 bg-card">
              {isLoading
                ? Array.from({ length: skeletonRows }, (_, index) => (
                    <SkeletonRow key={`skeleton-${index}`} columns={columns} />
                  ))
                : rows.map((row, rowIndex) => (
                    <BodyRow
                      key={keyExtractor(row, rowIndex)}
                      row={row}
                      rowIndex={rowIndex}
                      columns={columns}
                      keyExtractor={keyExtractor}
                      rowClassName={rowClassName}
                      onRowClick={onRowClick}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      )}

      {isEmpty ? <EmptyStateRenderer config={emptyState} /> : null}
      {hasError ? <ErrorState error={error} onRetry={onRetry} /> : null}
    </div>
  );
}
