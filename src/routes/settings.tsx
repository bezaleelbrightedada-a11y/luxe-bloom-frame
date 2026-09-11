import { createFileRoute } from "@tanstack/react-router";

import { SettingsPage } from "@/components/settings/SettingsPage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — RenderFlow Studio" },
      {
        name: "description",
        content:
          "Manage workspace details, default render presets and email notification preferences.",
      },
      { property: "og:title", content: "Settings — RenderFlow Studio" },
      {
        property: "og:description",
        content: "Workspace, rendering defaults and notification preferences in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});
