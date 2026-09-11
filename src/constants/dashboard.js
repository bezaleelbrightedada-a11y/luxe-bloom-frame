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
  LifeBuoy,
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
};

/** Sidebar navigation model. `to` is reserved for future router links. */
export const NAV_SECTIONS = [
  {
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
      { id: "projects", label: "Projects", icon: Layers },
      { id: "renders", label: "Render queue", icon: Clapperboard, badge: "2" },
      { id: "assets", label: "Asset library", icon: Boxes },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { id: "ai", label: "AI studio", icon: Sparkles },
      { id: "settings", label: "Settings", icon: Cog },
      { id: "support", label: "Support", icon: LifeBuoy },
    ],
  },
];

/** Quick action tiles. Handled by the `onAction` callback of QuickActions. */
export const QUICK_ACTIONS = [
  { id: "new-project", label: "New project", hint: "Start a scene", icon: FolderPlus },
  { id: "upload", label: "Upload assets", hint: "Models & textures", icon: Upload },
  { id: "ai-scene", label: "AI scene", hint: "Prompt to render", icon: Sparkles },
  { id: "enhance", label: "Enhance", hint: "Upscale & denoise", icon: Wand2 },
];

/** Welcome banner highlight tiles. */
export const WELCOME_HIGHLIGHTS = [
  { id: "active", label: "Active renders", value: "2", icon: Cpu },
  { id: "frames", label: "Frames today", value: "1,284", icon: Film },
  { id: "hours", label: "GPU hours left", value: "36.5", icon: Clock },
];

/** Animation stagger (ms) so section entrance order stays consistent. */
export const SECTION_DELAYS = {
  recentProjects: 80,
  renderingQueue: 120,
  quickActions: 160,
  aiUsage: 200,
  storage: 240,
};
