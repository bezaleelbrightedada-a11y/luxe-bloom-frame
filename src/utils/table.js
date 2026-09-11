/** Pure helpers shared by table-like components. */

/**
 * Returns a copy of `rows` sorted by `config`, or the original array when no
 * sort is active. Numbers sort numerically, everything else case-insensitively.
 *
 * @param {object[]} rows
 * @param {{ key: string, direction: 'asc'|'desc' }|null} config
 * @returns {object[]}
 */
export function sortRows(rows, config) {
  if (!config) return rows;
  const { key, direction } = config;
  const factor = direction === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal == null && bVal == null) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * factor;
    }

    return String(aVal).localeCompare(String(bVal), undefined, { sensitivity: "base" }) * factor;
  });
}

/**
 * Cycles a sort config for a column: asc -> desc -> cleared.
 * @param {{ key: string, direction: 'asc'|'desc' }|null} current
 * @param {string} key
 * @returns {{ key: string, direction: 'asc'|'desc' }|null}
 */
export function nextSortConfig(current, key) {
  if (current?.key !== key) return { key, direction: "asc" };
  return current.direction === "asc" ? { key, direction: "desc" } : null;
}

/**
 * Tailwind alignment class for a column alignment token.
 * @param {('left'|'center'|'right')} [align]
 */
export function alignClass(align) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

/**
 * Resolves a className that may be a plain string or a row callback.
 * @param {string|function(object, number): string} [value]
 */
export function resolveClassName(value, row, rowIndex) {
  return typeof value === "function" ? value(row, rowIndex) : value;
}
