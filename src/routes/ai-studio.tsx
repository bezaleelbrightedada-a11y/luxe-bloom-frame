import { createFileRoute } from "@tanstack/react-router";

import { AiStudioPage } from "@/components/ai/AiStudioPage";

export const Route = createFileRoute("/ai-studio")({
  head: () => ({
    meta: [
      { title: "AI studio — RenderFlow Studio" },
      {
        name: "description",
        content:
          "Write a script, improve it with AI, pick a presenter and voice, then send it to the render queue.",
      },
      { property: "og:title", content: "AI studio — RenderFlow Studio" },
      {
        property: "og:description",
        content: "One place for scripting, AI improvement, presenter and voice selection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AiStudioPage,
});
