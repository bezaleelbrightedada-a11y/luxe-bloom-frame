import { createFileRoute } from "@tanstack/react-router";

import { ProjectsPage } from "@/components/projects/ProjectsPage";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — RenderFlow Studio" },
      {
        name: "description",
        content:
          "Browse every project in your studio workspace with live status, progress and last-updated times.",
      },
      { property: "og:title", content: "Projects — RenderFlow Studio" },
      {
        property: "og:description",
        content: "Every project being worked on, with status and progress at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});
