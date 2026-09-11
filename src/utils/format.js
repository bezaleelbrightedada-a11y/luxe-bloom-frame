/**
 * Shared, framework-agnostic formatting helpers.
 * Kept pure so they can be unit tested and reused by any feature.
 */

const MS_PER_HOUR = 3_600_000;

/**
 * Human readable "time ago" label for an ISO date string.
 * @param {string|number|Date} value
 * @returns {string}
 */
export function formatRelativeTime(value) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "—";

  const hours = Math.round((Date.now() - timestamp) / MS_PER_HOUR);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

/**
 * Short "Mon D" date label.
 * @param {string|number|Date} value
 * @returns {string}
 */
export function formatShortDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/**
 * Safe percentage of `used` against `total`, clamped to 0-100.
 * @param {number} used
 * @param {number} total
 * @returns {number} whole-number percentage
 */
export function toPercent(used, total) {
  return Math.round(percentOf(used, total));
}

/**
 * Exact (unrounded) percentage of `used` against `total`, clamped to 0-100.
 * Use when sub-pixel accuracy matters, e.g. segmented bar widths.
 * @param {number} used
 * @param {number} total
 * @returns {number}
 */
export function percentOf(used, total) {
  if (!total || Number.isNaN(Number(used)) || Number.isNaN(Number(total))) return 0;
  return clampPercent((used / total) * 100);
}

/**
 * Clamps any numeric value into the 0-100 range.
 * @param {number} value
 * @returns {number}
 */
export function clampPercent(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return Math.max(0, Math.min(100, numeric));
}

/**
 * Locale aware thousands formatting.
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return Number(value ?? 0).toLocaleString();
}

/**
 * Time-of-day greeting.
 * @param {Date} [date]
 * @returns {string}
 */
export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/**
 * Simple English pluralisation helper.
 * @param {number} count
 * @param {string} singular
 * @param {string} [plural]
 * @returns {string}
 */
export function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}
