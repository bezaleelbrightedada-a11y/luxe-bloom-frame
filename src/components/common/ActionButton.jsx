import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  /** Filled brand button. */
  primary:
    "rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90",
  /** Compact text button used in card headers. */
  ghost: "rounded-lg px-2.5 py-1.5 text-sm font-medium text-primary hover:bg-primary/10",
  /** Neutral outlined button. */
  outline:
    "rounded-xl border border-border/70 bg-card px-3 py-2.5 text-sm font-semibold text-foreground",
};

/**
 * Shared button primitive so brand styling lives in one place.
 *
 * @param {Object} props
 * @param {('primary'|'ghost'|'outline')} [props.variant='primary']
 * @param {React.ElementType} [props.as='button'] - Render as a link or other element.
 * @param {string} [props.className] - Extra classes, merged last so they win.
 * @param {React.ReactNode} props.children
 */
export function ActionButton({ variant = "primary", as: Component = "button", className, children, ...rest }) {
  const typeProp = Component === "button" ? { type: "button" } : {};

  return (
    <Component
      {...typeProp}
      className={cn("press inline-flex items-center gap-1.5", VARIANT_CLASSES[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

