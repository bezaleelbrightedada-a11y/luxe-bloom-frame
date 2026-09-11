import { createFileRoute } from "@tanstack/react-router";

import { DashboardPage } from "@/components/dashboard/DashboardPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — RenderFlow Studio" },
      {
        name: "description",
        content:
          "Track recent projects, monitor the rendering queue, and manage AI credits and storage from your RenderFlow studio dashboard.",
      },
      { property: "og:title", content: "Dashboard — RenderFlow Studio" },
      {
        property: "og:description",
        content:
          "Monitor renders, projects, AI usage, and storage in one calm, fast studio dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});
