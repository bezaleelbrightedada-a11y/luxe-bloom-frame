import { apiClient, requireApiConfig } from "@/lib/api";

/**
 * Dashboard data access layer.
 *
 * Every function returns a Promise so the transport can be replaced with a
 * real HTTP/server-function call without touching any component.
 *
 * Endpoints expected from the configured API:
 *   GET  /dashboard/user
 *   GET  /dashboard/projects
 *   GET  /dashboard/queue
 *   GET  /dashboard/ai-usage
 *   GET  /dashboard/storage
 *   GET  /projects
 *   GET  /assets
 *   GET  /ai/presenters
 *   GET  /ai/voices
 *   GET  /settings          PATCH /settings
 */

async function get(path) {
  requireApiConfig();
  const { data } = await apiClient.get(path);
  return data;
}

export const getCurrentUser = () => get("/dashboard/user");
export const getRecentProjects = () => get("/dashboard/projects");
export const getRenderQueue = () => get("/dashboard/queue");
export const getAiUsage = () => get("/dashboard/ai-usage");
export const getStorage = () => get("/dashboard/storage");

export const getProjects = () => get("/projects");
export const getAssets = () => get("/assets");
export const getPresenters = () => get("/ai/presenters");
export const getVoices = () => get("/ai/voices");
export const getSettings = () => get("/settings");

/** Persists workspace settings. */
export async function updateSettings(payload) {
  requireApiConfig();
  const { data } = await apiClient.patch("/settings", payload);
  return data;
}

/** Sends a script to the AI service for improvement. */
export async function improveScript(payload) {
  requireApiConfig();
  const { data } = await apiClient.post("/ai/improve", payload);
  return data;
}

/** Queues a render job for a project. */
export async function queueRender(payload) {
  requireApiConfig();
  const { data } = await apiClient.post("/renders", payload);
  return data;
}
