import { useMemo, useState } from "react";
import { Boxes, Upload } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionState } from "@/components/common/SectionState";
import { Surface } from "@/components/common/Surface";
import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import { formatRelativeTime } from "@/utils/format";
import { getAssets } from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

const ALL = "all";

function AssetCard({ asset }) {
  return (
    <li className="animate-rise overflow-hidden rounded-xl border border-border/70 bg-muted/40">
      <div className="aspect-video w-full bg-muted">
        {asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <Boxes className="size-6" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold tracking-tight">{asset.name}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {[asset.type, asset.usedIn && `used in ${asset.usedIn}`].filter(Boolean).join(" · ")}
        </p>
        {asset.updatedAt ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {formatRelativeTime(asset.updatedAt)}
          </p>
        ) : null}
      </div>
    </li>
  );
}

/** Every asset used across AI generations and renders. */
export function AssetLibraryPage() {
  const assets = useApiResource(DASHBOARD_QUERY_KEYS.assets, getAssets);
  const [type, setType] = useState(ALL);

  const types = useMemo(() => {
    const set = new Set((assets.data ?? []).map((asset) => asset.type).filter(Boolean));
    return [ALL, ...set];
  }, [assets.data]);

  const visible = useMemo(() => {
    const list = assets.data ?? [];
    return type === ALL ? list : list.filter((asset) => asset.type === type);
  }, [assets.data, type]);

  return (
    <AppShell>
      <PageHeader
        title="Asset library"
        description="Images, audio, presenters and files used in your AI generations and renders."
        actions={
          <ActionButton>
            <Upload className="size-4" />
            Upload
          </ActionButton>
        }
      />

      <SectionState
        query={assets}
        title="Asset library"
        description="Assets used by your generations will appear here once your library is connected."
        height="h-96"
      >
        <Surface className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {types.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option)}
                aria-pressed={type === option}
                className={`press rounded-lg border px-3 py-1.5 text-xs font-medium capitalize ${
                  type === option
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border/70 text-muted-foreground hover:bg-accent"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No assets in this category yet.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </ul>
          )}
        </Surface>
      </SectionState>
    </AppShell>
  );
}
