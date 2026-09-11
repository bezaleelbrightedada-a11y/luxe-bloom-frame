import { FolderPlus, Sparkles, Upload, Wand2 } from "lucide-react";

import { Surface, SurfaceHeader } from "@/components/common/Surface";

const ACTIONS = [
  { id: "new-project", label: "New project", hint: "Start a scene", icon: FolderPlus },
  { id: "upload", label: "Upload assets", hint: "Models & textures", icon: Upload },
  { id: "ai-scene", label: "AI scene", hint: "Prompt to render", icon: Sparkles },
  { id: "enhance", label: "Enhance", hint: "Upscale & denoise", icon: Wand2 },
];

export function QuickActions({ onAction }) {
  return (
    <Surface delay={160}>
      <SurfaceHeader title="Quick actions" subtitle="Jump straight into the work" />
      <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
        {ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction?.(action.id)}
              style={{ animationDelay: `${index * 60}ms` }}
              className="animate-rise press group flex flex-col items-start gap-2 rounded-xl border border-border/70 bg-muted/40 p-3.5 text-left hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-primary/12 text-primary transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-[18px]" />
              </span>
              <span className="text-sm font-semibold tracking-tight">{action.label}</span>
              <span className="text-xs text-muted-foreground">{action.hint}</span>
            </button>
          );
        })}
      </div>
    </Surface>
  );
}
