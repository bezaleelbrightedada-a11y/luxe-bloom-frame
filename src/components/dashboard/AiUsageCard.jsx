import { Sparkles } from "lucide-react";

import { ProgressBar } from "@/components/common/ProgressBar";
import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { SECTION_DELAYS } from "@/constants/dashboard";
import { formatNumber, formatShortDate, toPercent } from "@/utils/format";

/**
 * AI credit consumption for the current billing cycle.
 * @param {{ usage: { creditsUsed: number, creditsTotal: number, cycleResetsOn: string, breakdown: Array<{label: string, value: number}> } }} props
 */
export function AiUsageCard({ usage }) {
  const percent = toPercent(usage.creditsUsed, usage.creditsTotal);

  return (
    <Surface delay={SECTION_DELAYS.aiUsage}>
      <SurfaceHeader
        title="AI usage"
        subtitle={`Resets ${formatShortDate(usage.cycleResetsOn)}`}
        action={
          <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
            <Sparkles className="size-[18px]" />
          </span>
        }
      />
      <div className="p-5 sm:p-6">
        <div className="flex items-end gap-2">
          <p className="text-3xl font-semibold tracking-tight">{formatNumber(usage.creditsUsed)}</p>
          <p className="pb-1 text-sm text-muted-foreground">
            / {formatNumber(usage.creditsTotal)} credits
          </p>
        </div>

        <ProgressBar value={percent} className="mt-3" />
        <p className="mt-2 text-xs text-muted-foreground">{percent}% of monthly allowance used</p>

        <ul className="mt-4 space-y-2.5">
          {usage.breakdown?.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{formatNumber(item.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}
