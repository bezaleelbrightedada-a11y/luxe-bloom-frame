/**
 * Consistent page title block used by every route.
 *
 * @param {{ title: string, description?: string, actions?: React.ReactNode }} props
 */
export function PageHeader({ title, description, actions }) {
  return (
    <div className="animate-rise flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
