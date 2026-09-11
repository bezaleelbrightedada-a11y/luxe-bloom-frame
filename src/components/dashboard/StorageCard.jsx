import { HardDrive } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { SECTION_DELAYS } from "@/constants/dashboard";
import { percentOf, toPercent } from "@/utils/format";

/**
 * Storage consumption with a segmented usage bar.
 * @param {{ storage: { usedGb: number, totalGb: number, breakdown: Array<{label: string, value: number, tone: string}> }, onManage?: () => void }} props
 */
export function StorageCard({ storage, onManage }) {
  const percent = toPercent(storage.usedGb, storage.totalGb);
  const breakdown = storage.breakdown ?? [];

  return (
    <Surface delay={SECTION_DELAYS.storage}>
      <SurfaceHeader
        title="Storage"
        subtitle={`${storage.totalGb} GB plan`}
        action={
          <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
            <HardDrive className="size-[18px]" />
          </span>
        }
      />
      <div className="p-5 sm:p-6">
        <div className="flex items-end gap-2">
          <p className="text-3xl font-semibold tracking-tight">{storage.usedGb} GB</p>
          <p className="pb-1 text-sm text-muted-foreground">used ({percent}%)</p>
        </div>

        <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          {breakdown.map((segment) => (
            <div
              key={segment.label}
              style={{ width: `${percentOf(segment.value, storage.totalGb)}%` }}
              className={`h-full transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${segment.tone}`}
            />
          ))}
        </div>

        <ul className="mt-4 space-y-2.5">
          {breakdown.map((segment) => (
            <li key={segment.label} className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span className={`size-2 rounded-full ${segment.tone}`} />
                {segment.label}
              </span>
              <span className="font-medium">{segment.value} GB</span>
            </li>
          ))}
        </ul>

        <ActionButton
          variant="outline"
          onClick={onManage}
          className="mt-5 w-full justify-center px-3"
        >
          Manage storage
        </ActionButton>
      </div>
    </Surface>
  );
}
