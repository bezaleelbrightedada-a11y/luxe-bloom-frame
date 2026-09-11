import { memo } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, X } from "lucide-react";

import { ActionButton } from "@/components/common/ActionButton";
import { NAV_SECTIONS } from "@/constants/dashboard";
import { cn } from "@/lib/utils";

const NavItem = memo(function NavItem({ item, onSelect }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      onClick={onSelect}
      activeOptions={{ exact: item.to === "/" }}
      className="press group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
      activeProps={{
        "aria-current": "page",
        className:
          "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent)]",
      }}
    >
      <Icon className="size-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
});

function SidebarContent({ onClose, onNavigate }) {
  return (
    <div className="flex h-full flex-col gap-6 px-4 py-5">
      <div className="flex items-center justify-between">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-[18px]" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">RenderFlow</p>
            <p className="text-xs text-muted-foreground">Studio Pro</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="press grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent lg:hidden"
          aria-label="Close navigation"
        >
          <X className="size-4" />
        </button>
      </div>

      <nav aria-label="Main" className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="space-y-1">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </p>
            {section.items.map((item) => (
              <NavItem key={item.id} item={item} onSelect={onNavigate} />
            ))}
          </div>
        ))}
      </nav>

      <div className="rounded-2xl border border-border/70 bg-gradient-to-b from-primary/10 to-transparent p-4">
        <p className="text-sm font-semibold tracking-tight">Need more GPU hours?</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Scale rendering capacity instantly for deadline weeks.
        </p>
        <ActionButton asChild className="mt-3 w-full justify-center rounded-lg px-3 py-2 text-xs">
          <Link to="/settings" onClick={onNavigate}>
            Upgrade plan
          </Link>
        </ActionButton>
      </div>
    </div>
  );
}

/**
 * Responsive navigation: static rail on desktop, overlay drawer on mobile.
 *
 * @param {{ open: boolean, onClose: () => void }} props
 */
export function Sidebar({ open, onClose }) {
  return (
    <>
      <aside
        aria-label="Sidebar"
        className="hidden w-[268px] shrink-0 border-r border-border/70 bg-sidebar lg:block"
      >
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-foreground/25 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[268px] border-r border-border/70 bg-sidebar transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent onClose={onClose} onNavigate={onClose} />
      </aside>
    </>
  );
}
