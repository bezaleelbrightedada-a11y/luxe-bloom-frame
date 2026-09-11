/**
 * Dashboard data access layer.
 *
 * Every function returns a Promise so the transport can be replaced with a
 * real HTTP/server-function call without touching any component.
 * Example future implementation:
 *   export const getRecentProjects = () => api.get("/projects?limit=4");
 */

import { aiUsage, currentUser, recentProjects, renderQueue, storage } from "@/data/dashboard";

const resolve = (value) => Promise.resolve(value);

export const getCurrentUser = () => resolve(currentUser);
export const getRecentProjects = () => resolve(recentProjects);
export const getRenderQueue = () => resolve(renderQueue);
export const getAiUsage = () => resolve(aiUsage);
export const getStorage = () => resolve(storage);
