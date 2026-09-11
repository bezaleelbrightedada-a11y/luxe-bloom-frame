import { Bell, Menu, Moon, Plus, Search, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ActionButton } from "@/components/common/ActionButton";
import { useTheme } from "@/hooks/useTheme";


/**
 * Sticky application header: mobile menu, search, and account controls.
 *
 * @param {Object} props
 * @param {{ avatarInitials?: string, fullName?: string }} [props.user]
 * @param {() => void} props.onOpenSidebar
 * @param {(term: string) => void} [props.onSearch]
 * @param {() => void} [props.onNewProject]
 * @param {() => void} [props.onOpenNotifications]
 * @param {() => void} [props.onOpenProfile]
 */
export function TopNav({
  user,
  onOpenSidebar,
  onSearch,
  onNewProject,
  onOpenNotifications,
  onOpenProfile,
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
          className="press grid size-9 place-items-center rounded-xl border border-border/70 bg-card lg:hidden"
        >
          <Menu className="size-[18px]" />
        </button>

        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Search projects, renders, assets"
            aria-label="Search"
            onChange={(event) => onSearch?.(event.target.value)}
            className="h-10 w-full rounded-xl border border-border/70 bg-card pl-9 pr-3 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:border-primary/40 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_14%,transparent)]"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ActionButton
            as={Link}
            to="/ai-studio"
            onClick={onNewProject}
            className="hidden gap-2 px-3.5 py-2 sm:inline-flex"
          >
            <Plus className="size-4" />
            New project
          </ActionButton>


          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="press relative grid size-9 place-items-center rounded-xl border border-border/70 bg-card"
          >
            <Bell className="size-[18px]" />
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card"
            />
          </button>

          <button
            type="button"
            onClick={onOpenProfile}
            aria-label={`Account menu for ${user?.fullName ?? "Guest"}`}
            className="press flex items-center gap-2 rounded-xl border border-border/70 bg-card py-1.5 pl-1.5 pr-3"
          >
            <span className="grid size-7 place-items-center rounded-lg bg-primary/12 text-xs font-semibold text-primary">
              {user?.avatarInitials ?? "?"}
            </span>
            <span className="hidden text-sm font-medium md:inline">{user?.fullName ?? "Guest"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
