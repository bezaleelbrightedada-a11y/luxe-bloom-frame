import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ActionButton } from "@/components/common/ActionButton";
import { Surface } from "@/components/common/Surface";
import { WELCOME_HIGHLIGHTS } from "@/constants/dashboard";
import { getGreeting } from "@/utils/format";

/**
 * Greeting banner with at-a-glance studio metrics.
 * Metrics come from the API; missing values render as an em dash.
 *
 * @param {{ user?: { firstName?: string, metrics?: Record<string, string|number> } }} props
 */
export function WelcomeSection({ user }) {
  const metrics = user?.metrics ?? {};

  return (
    <Surface className="overflow-hidden p-5 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{getGreeting()}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {user?.firstName ?? "Welcome back"}, here is your studio overview.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Move between your projects, render queue, asset library and AI studio from the sidebar.
          </p>
          <ActionButton as={Link} to="/projects" className="mt-4">
            Go to projects
            <ArrowUpRight className="size-4" />
          </ActionButton>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[420px]">
          {WELCOME_HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{ animationDelay: `${120 + index * 70}ms` }}
                className="animate-rise rounded-xl border border-border/70 bg-muted/50 p-3.5"
              >
                <Icon className="size-4 text-primary" />
                <p className="mt-2 text-xl font-semibold tracking-tight">
                  {metrics[item.id] ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Surface>
  );
}
