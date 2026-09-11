import { ArrowUpRight } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Surface } from "@/components/common/Surface";
import { WELCOME_HIGHLIGHTS } from "@/constants/dashboard";
import { getGreeting } from "@/utils/format";

/**
 * Greeting banner with at-a-glance studio metrics.
 * @param {{ user?: { firstName?: string }, onPrimaryAction?: () => void }} props
 */
export function WelcomeSection({ user, onPrimaryAction }) {
  return (
    <Surface className="overflow-hidden p-5 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{getGreeting()}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {user?.firstName}, your studio is running smoothly.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Two renders are in flight and one project is waiting on your review.
          </p>
          <ActionButton className="mt-4" onClick={onPrimaryAction}>
            Review Marina Villa
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
                <p className="mt-2 text-xl font-semibold tracking-tight">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Surface>
  );
}
