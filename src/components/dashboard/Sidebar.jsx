import {
  Boxes,
  Clapperboard,
  Cog,
  LayoutDashboard,
  LifeBuoy,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
      { id: "projects", label: "Projects", icon: Layers },
      { id: "renders", label: "Render queue", icon: Clapperboard, badge: "2" },
      { id: "assets", label: "Asset library", icon: Boxes },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { id: "ai", label: "AI studio", icon: Sparkles },
      { id: "settings", label: "Settings", icon: Cog },
      { id: "support", label: "Support", icon: LifeBuoy },
    ],
  },
];

function NavItem({ item }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      aria-current={item.active ? "page" : undefined}
      className={cn(
        "press group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
        item.active
          ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent)]"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      <Icon className="size-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
      {item.badge ? (
        <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {item.badge}
        </span>
      ) : null}
    </button>
  );
}

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col gap-6 px-4 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-[18px]" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">RenderFlow</p>
            <p className="text-xs text-muted-foreground">Studio Pro</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onNavigate}
          className="press grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent lg:hidden"
          aria-label="Close navigation"
        >
          <X className="size-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="space-y-1">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        ))}
      </nav>

      <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-primary/10 to-transparent p-4">
        <p className="text-sm font-semibold tracking-tight">Need more GPU hours?</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Scale rendering capacity instantly for deadline weeks.
        </p>
        <button
          type="button"
          className="press mt-3 w-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          Upgrade plan
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className="hidden w-[268px] shrink-0 border-r border-border/70 bg-sidebar lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/25 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[268px] border-r border-border/70 bg-sidebar transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  );
}
