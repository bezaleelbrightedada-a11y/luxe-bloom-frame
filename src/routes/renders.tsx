import { createFileRoute } from "@tanstack/react-router";

import { RenderQueuePage } from "@/components/renders/RenderQueuePage";

export const Route = createFileRoute("/renders")({
  head: () => ({
    meta: [
      { title: "Render queue — RenderFlow Studio" },
      {
        name: "description",
        content:
          "Monitor every render job: what is rendering now, what is queued, and what needs attention.",
      },
      { property: "og:title", content: "Render queue — RenderFlow Studio" },
      {
        property: "og:description",
        content: "Live view of rendering, queued, completed and stopped jobs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RenderQueuePage,
});
