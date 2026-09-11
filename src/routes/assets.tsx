import { createFileRoute } from "@tanstack/react-router";

import { AssetLibraryPage } from "@/components/assets/AssetLibraryPage";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Asset library — RenderFlow Studio" },
      {
        name: "description",
        content:
          "Every image, audio file and presenter asset used across your AI generations and renders.",
      },
      { property: "og:title", content: "Asset library — RenderFlow Studio" },
      {
        property: "og:description",
        content: "All assets used in your AI generations, filterable by type.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssetLibraryPage,
});
