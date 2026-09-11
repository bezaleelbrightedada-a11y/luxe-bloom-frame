import { Link } from "@tanstack/react-router";

import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { QUICK_ACTIONS, SECTION_DELAYS } from "@/constants/dashboard";

/**
 * Grid of shortcut tiles linking to the main areas of the workspace.
 * @param {{ actions?: typeof QUICK_ACTIONS }} props
 */
export function QuickActions({ actions = QUICK_ACTIONS }) {
  return (
    <Surface delay={SECTION_DELAYS.quickActions}>
      <SurfaceHeader title="Quick actions" subtitle="Jump straight into the work" />
      <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              to={action.to}
              style={{ animationDelay: `${index * 60}ms` }}
              className="animate-rise press group flex flex-col items-start gap-2 rounded-xl border border-border/70 bg-muted/40 p-3.5 text-left hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-[18px]" />
              </span>
              <span className="text-sm font-semibold tracking-tight">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.hint}</span>
            </Link>
          );
        })}
      </div>
    </Surface>
  );
}
