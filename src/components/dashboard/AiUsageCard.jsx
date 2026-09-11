import { Sparkles } from "lucide-react";

import { ProgressBar } from "@/components/common/ProgressBar";
import { Surface, SurfaceHeader } from "@/components/common/Surface";

export function AiUsageCard({ usage }) {
  const percent = Math.round((usage.creditsUsed / usage.creditsTotal) * 100);
  const resets = new Date(usage.cycleResetsOn).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <Surface delay={200}>
      <SurfaceHeader
        title="AI usage"
        subtitle={`Resets ${resets}`}
        action={
          <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
            <Sparkles className="size-[18px]" />
          </span>
        }
      />
      <div className="p-5 sm:p-6">
        <div className="flex items-end gap-2">
          <p className="text-3xl font-semibold tracking-tight">
            {usage.creditsUsed.toLocaleString()}
          </p>
          <p className="pb-1 text-sm text-muted-foreground">
            / {usage.creditsTotal.toLocaleString()} credits
          </p>
        </div>

        <ProgressBar value={percent} className="mt-3" />
        <p className="mt-2 text-xs text-muted-foreground">{percent}% of monthly allowance used</p>

        <ul className="mt-4 space-y-2.5">
          {usage.breakdown.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}
