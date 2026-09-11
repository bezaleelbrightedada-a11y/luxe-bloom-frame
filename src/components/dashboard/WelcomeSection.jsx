import { ArrowUpRight, Clock, Cpu, Film } from "lucide-react";

import { Surface } from "@/components/common/Surface";

const HIGHLIGHTS = [
  { id: "active", label: "Active renders", value: "2", icon: Cpu },
  { id: "frames", label: "Frames today", value: "1,284", icon: Film },
  { id: "hours", label: "GPU hours left", value: "36.5", icon: Clock },
];

function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function WelcomeSection({ user }) {
  return (
    <Surface className="overflow-hidden p-5 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting()}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {user.firstName}, your studio is running smoothly.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Two renders are in flight and one project is waiting on your review.
          </p>
          <button
            type="button"
            className="press mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Review Marina Villa
            <ArrowUpRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[420px]">
          {HIGHLIGHTS.map((item, index) => {
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
