import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ActionButton } from "@/components/common/ActionButton";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { Skeleton } from "@/components/common/Skeleton";
import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import { getSettings, updateSettings } from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

function Field({ id, label, hint, ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className="mt-1.5 h-10 w-full rounded-xl border border-border/70 bg-card px-3 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:border-primary/40"
        {...rest}
      />
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Toggle({ id, label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-muted/40 p-3.5">
      <div>
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 accent-[var(--primary)]"
      />
    </div>
  );
}

const EMPTY_FORM = {
  workspaceName: "",
  contactEmail: "",
  defaultPreset: "",
  emailOnComplete: false,
  emailOnFailure: false,
};

/** Workspace, rendering and notification settings. */
export function SettingsPage() {
  const settings = useApiResource(DASHBOARD_QUERY_KEYS.settings, getSettings);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (settings.data) setForm({ ...EMPTY_FORM, ...settings.data });
  }, [settings.data]);

  const save = useMutation({
    mutationFn: () => updateSettings(form),
    onSuccess: () => toast.success("Settings saved"),
    onError: (error) => toast.error(error.message),
  });

  const set = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <AppShell>
      <PageHeader
        title="Settings"
        description="Workspace details, render defaults and notification preferences."
      />

      {settings.isLoading ? (
        <Skeleton className="h-96" />
      ) : (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            save.mutate();
          }}
        >
          <Surface>
            <SurfaceHeader title="Workspace" subtitle="How your studio is identified" />
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
              <Field
                id="workspaceName"
                label="Workspace name"
                value={form.workspaceName}
                onChange={(event) => set("workspaceName")(event.target.value)}
              />
              <Field
                id="contactEmail"
                label="Contact email"
                type="email"
                value={form.contactEmail}
                onChange={(event) => set("contactEmail")(event.target.value)}
              />
            </div>
          </Surface>

          <Surface>
            <SurfaceHeader title="Rendering" subtitle="Defaults applied to new render jobs" />
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
              <Field
                id="defaultPreset"
                label="Default preset"
                hint="For example: 1080p · 30fps"
                value={form.defaultPreset}
                onChange={(event) => set("defaultPreset")(event.target.value)}
              />
            </div>
          </Surface>

          <Surface>
            <SurfaceHeader title="Notifications" subtitle="When we should email you" />
            <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
              <Toggle
                id="emailOnComplete"
                label="Render completed"
                description="Email me when a render finishes."
                checked={Boolean(form.emailOnComplete)}
                onChange={set("emailOnComplete")}
              />
              <Toggle
                id="emailOnFailure"
                label="Render failed"
                description="Email me when a render stops unexpectedly."
                checked={Boolean(form.emailOnFailure)}
                onChange={set("emailOnFailure")}
              />
            </div>
          </Surface>

          <div className="flex items-center gap-3">
            <ActionButton as="button" type="submit" disabled={save.isPending} className="disabled:opacity-50">
              {save.isPending ? "Saving…" : "Save changes"}
            </ActionButton>
            {settings.error ? (
              <p className="text-sm text-muted-foreground">
                Settings couldn&apos;t be loaded, so these fields start empty.
              </p>
            ) : null}
          </div>
        </form>
      )}
    </AppShell>
  );
}
