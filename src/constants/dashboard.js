import {
  Boxes,
  Clapperboard,
  Clock,
  Cog,
  Cpu,
  Film,
  FolderPlus,
  LayoutDashboard,
  Layers,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";

/** React Query cache keys for every dashboard resource. */
export const DASHBOARD_QUERY_KEYS = {
  user: ["current-user"],
  projects: ["recent-projects"],
  queue: ["render-queue"],
  usage: ["ai-usage"],
  storage: ["storage"],
  assets: ["assets"],
  presenters: ["presenters"],
  voices: ["voices"],
  settings: ["settings"],
};

/** Sidebar navigation model. `to` maps to a real application route. */
export const NAV_SECTIONS = [
  {
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/" },
      { id: "projects", label: "Projects", icon: Layers, to: "/projects" },
      { id: "renders", label: "Render queue", icon: Clapperboard, to: "/renders" },
      { id: "assets", label: "Asset library", icon: Boxes, to: "/assets" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { id: "ai", label: "AI studio", icon: Sparkles, to: "/ai-studio" },
      { id: "settings", label: "Settings", icon: Cog, to: "/settings" },
    ],
  },
];

/** Quick action tiles. Each one navigates to the relevant workspace area. */
export const QUICK_ACTIONS = [
  { id: "new-project", label: "New project", hint: "Start a scene", icon: FolderPlus, to: "/projects" },
  { id: "upload", label: "Upload assets", hint: "Models & textures", icon: Upload, to: "/assets" },
  { id: "ai-scene", label: "AI studio", hint: "Prompt to render", icon: Sparkles, to: "/ai-studio" },
  { id: "enhance", label: "Render queue", hint: "Track renders", icon: Wand2, to: "/renders" },
];

/** Welcome banner highlight tiles (labels only; values come from the API). */
export const WELCOME_HIGHLIGHTS = [
  { id: "activeRenders", label: "Active renders", icon: Cpu },
  { id: "framesToday", label: "Frames today", icon: Film },
  { id: "gpuHoursLeft", label: "GPU hours left", icon: Clock },
];

/** Animation stagger (ms) so section entrance order stays consistent. */
export const SECTION_DELAYS = {
  recentProjects: 80,
  renderingQueue: 120,
  quickActions: 160,
  aiUsage: 200,
  storage: 240,
};
