/**
 * Dashboard view-model shapes.
 *
 * These exports are static seeds used only for the initial UI render.
 * Every consumer reads them through `src/services/dashboardService.js`, so
 * swapping in a real API later requires no component changes.
 */

export const currentUser = {
  id: "usr_001",
  firstName: "Bezaleel",
  fullName: "Bezaleel Bright",
  email: "bezaleel@studio.io",
  plan: "Studio Pro",
  avatarInitials: "BB",
};

export const recentProjects = [
  {
    id: "prj_9021",
    name: "Aurora Tower — Lobby",
    client: "Nexa Architects",
    status: "in_progress",
    progress: 68,
    frames: 240,
    updatedAt: "2026-09-11T09:12:00Z",
    thumbnailTone: "from-indigo-500/25 to-sky-400/10",
  },
  {
    id: "prj_9017",
    name: "Marina Villa Exterior",
    client: "Halcyon Group",
    status: "review",
    progress: 92,
    frames: 60,
    updatedAt: "2026-09-10T17:40:00Z",
    thumbnailTone: "from-emerald-500/25 to-teal-400/10",
  },
  {
    id: "prj_8994",
    name: "Product Shot — Helix X1",
    client: "Helix Labs",
    status: "completed",
    progress: 100,
    frames: 12,
    updatedAt: "2026-09-09T11:05:00Z",
    thumbnailTone: "from-amber-500/25 to-orange-400/10",
  },
  {
    id: "prj_8971",
    name: "Skyline Night Flythrough",
    client: "Vertex Realty",
    status: "draft",
    progress: 14,
    frames: 900,
    updatedAt: "2026-09-08T08:22:00Z",
    thumbnailTone: "from-fuchsia-500/25 to-violet-400/10",
  },
];

export const renderQueue = [
  {
    id: "rnd_5512",
    projectName: "Aurora Tower — Lobby",
    preset: "4K · Ultra · Denoise",
    status: "rendering",
    progress: 61,
    etaMinutes: 18,
    node: "GPU-Node-03",
  },
  {
    id: "rnd_5513",
    projectName: "Skyline Night Flythrough",
    preset: "1080p · High",
    status: "queued",
    progress: 0,
    etaMinutes: 47,
    node: "Auto-assign",
  },
  {
    id: "rnd_5509",
    projectName: "Marina Villa Exterior",
    preset: "4K · Ultra",
    status: "completed",
    progress: 100,
    etaMinutes: 0,
    node: "GPU-Node-01",
  },
  {
    id: "rnd_5504",
    projectName: "Product Shot — Helix X1",
    preset: "8K · Cinematic",
    status: "failed",
    progress: 42,
    etaMinutes: 0,
    node: "GPU-Node-02",
  },
];

export const aiUsage = {
  creditsUsed: 7420,
  creditsTotal: 10000,
  cycleResetsOn: "2026-10-01T00:00:00Z",
  breakdown: [
    { label: "Prompt to scene", value: 3180 },
    { label: "Upscaling", value: 2460 },
    { label: "Material synthesis", value: 1780 },
  ],
};

export const storage = {
  usedGb: 412,
  totalGb: 750,
  breakdown: [
    { label: "Renders", value: 236, tone: "bg-primary" },
    { label: "Assets", value: 118, tone: "bg-emerald-500" },
    { label: "Archives", value: 58, tone: "bg-amber-500" },
  ],
};
