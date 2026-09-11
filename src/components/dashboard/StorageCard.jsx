import { HardDrive } from "lucide-react";

import { Surface, SurfaceHeader } from "@/components/common/Surface";

export function StorageCard({ storage }) {
  const percent = Math.round((storage.usedGb / storage.totalGb) * 100);

  return (
    <Surface delay={240}>
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
          {storage.breakdown.map((segment) => (
            <div
              key={segment.label}
              style={{ width: `${(segment.value / storage.totalGb) * 100}%` }}
              className={`h-full transition-[width] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${segment.tone}`}
            />
          ))}
        </div>

        <ul className="mt-4 space-y-2.5">
          {storage.breakdown.map((segment) => (
            <li key={segment.label} className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span className={`size-2 rounded-full ${segment.tone}`} />
                {segment.label}
              </span>
              <span className="font-medium">{segment.value} GB</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="press mt-5 w-full rounded-xl border border-border/70 bg-card px-3 py-2.5 text-sm font-semibold"
        >
          Manage storage
        </button>
      </div>
    </Surface>
  );
}
