import { apiClient, requireApiConfig } from "@/lib/api";

/**
 * Dashboard data access layer.
 *
 * Every function returns a Promise so the transport can be replaced with a
 * real HTTP/server-function call without touching any component.
 *
 * Endpoints expected from the configured API:
 *   GET /dashboard/user
 *   GET /dashboard/projects
 *   GET /dashboard/queue
 *   GET /dashboard/ai-usage
 *   GET /dashboard/storage
 */

export async function getCurrentUser() {
  requireApiConfig();
  const { data } = await apiClient.get("/dashboard/user");
  return data;
}

export async function getRecentProjects() {
  requireApiConfig();
  const { data } = await apiClient.get("/dashboard/projects");
  return data;
}

export async function getRenderQueue() {
  requireApiConfig();
  const { data } = await apiClient.get("/dashboard/queue");
  return data;
}

export async function getAiUsage() {
  requireApiConfig();
  const { data } = await apiClient.get("/dashboard/ai-usage");
  return data;
}

export async function getStorage() {
  requireApiConfig();
  const { data } = await apiClient.get("/dashboard/storage");
  return data;
}
