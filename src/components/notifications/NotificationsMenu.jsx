import { useEffect, useRef, useState } from "react";
import { Bell, BellOff, CheckCheck, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

/** Dot colour per notification tone. */
const TONE_DOT = {
  success: "bg-emerald-500",
  danger: "bg-destructive",
  warning: "bg-amber-500",
  info: "bg-primary",
  muted: "bg-muted-foreground",
};

function formatWhen(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Bell button with a dropdown feed of live workspace notifications.
 * Closes on Escape and on outside click; all listeners are cleaned up.
 */
export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { items, unreadCount, markAllRead, markRead, refresh, isLoading, isError } =
    useNotifications();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={
          unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications, none unread"
        }
        aria-expanded={open}
        aria-haspopup="menu"
        className="press relative grid size-9 place-items-center rounded-xl border border-border/70 bg-card"
      >
        <Bell className="size-[18px]" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 grid min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-[18px] text-primary-foreground ring-2 ring-card">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Notifications"
          className="animate-rise absolute right-0 top-11 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border/70 px-4 py-3">
            <p className="text-sm font-semibold tracking-tight">Notifications</p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={refresh}
                aria-label="Refresh notifications"
                className="press grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                <RotateCcw className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="press inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary disabled:opacity-40"
              >
                <CheckCheck className="size-3.5" />
                Mark all read
              </button>
            </div>
          </div>

          <div className="max-h-[22rem] overflow-y-auto">
            {isLoading ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                Loading notifications…
              </p>
            ) : isError ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">Notifications are unavailable.</p>
                <button
                  type="button"
                  onClick={refresh}
                  className="press mt-2 rounded-lg border border-border/70 px-3 py-1.5 text-xs font-medium"
                >
                  Try again
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <BellOff aria-hidden="true" className="mx-auto size-6 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">You are all caught up</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Render and project updates will appear here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border/70">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      role="menuitem"
                      onClick={() => {
                        markRead(item.id);
                        setOpen(false);
                      }}
                      className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1.5 size-2 shrink-0 rounded-full",
                          TONE_DOT[item.tone] ?? TONE_DOT.muted,
                          item.read && "opacity-30",
                        )}
                      />
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-sm tracking-tight",
                            item.read ? "font-medium text-muted-foreground" : "font-semibold",
                          )}
                        >
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {item.body}
                        </span>
                        {formatWhen(item.timestamp) ? (
                          <span className="mt-1 block text-[11px] text-muted-foreground/80">
                            {formatWhen(item.timestamp)}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
