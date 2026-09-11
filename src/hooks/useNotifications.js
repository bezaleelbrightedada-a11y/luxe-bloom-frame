import { useCallback, useMemo, useState } from "react";

import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import { getRecentProjects, getRenderQueue } from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

/**
 * Notification feed.
 *
 * Notifications are derived from live workspace data (render queue + projects)
 * so nothing here is invented: each entry points at a real record returned by
 * the API. Read state is kept in memory for the session.
 */

const QUEUE_MESSAGES = {
  completed: (job) => ({
    tone: "success",
    title: "Render finished",
    body: `${job.projectName} is ready to download.`,
  }),
  failed: (job) => ({
    tone: "danger",
    title: "Render failed",
    body: `${job.projectName} stopped on ${job.node ?? "the render node"}.`,
  }),
  rendering: (job) => ({
    tone: "info",
    title: "Rendering in progress",
    body: `${job.projectName} is ${job.progress ?? 0}% complete.`,
  }),
  queued: (job) => ({
    tone: "muted",
    title: "Queued for render",
    body: `${job.projectName} is waiting for a free node.`,
  }),
};

function fromQueue(jobs) {
  return jobs.map((job) => {
    const build = QUEUE_MESSAGES[job.status] ?? QUEUE_MESSAGES.queued;
    const { tone, title, body } = build(job);
    return {
      id: `queue-${job.id}`,
      tone,
      title,
      body,
      timestamp: job.updatedAt ?? job.createdAt ?? null,
      to: "/renders",
    };
  });
}

function fromProjects(projects) {
  return projects
    .filter((project) => project.status === "review")
    .map((project) => ({
      id: `project-${project.id}`,
      tone: "warning",
      title: "Waiting for review",
      body: `${project.name} needs approval before it can render.`,
      timestamp: project.updatedAt ?? null,
      to: "/projects",
    }));
}

export function useNotifications() {
  const queue = useApiResource(DASHBOARD_QUERY_KEYS.queue, getRenderQueue);
  const projects = useApiResource(DASHBOARD_QUERY_KEYS.projects, getRecentProjects);
  const [readIds, setReadIds] = useState(() => new Set());

  const items = useMemo(() => {
    const jobs = Array.isArray(queue.data) ? queue.data : [];
    const list = Array.isArray(projects.data) ? projects.data : [];
    return [...fromQueue(jobs), ...fromProjects(list)].map((item) => ({
      ...item,
      read: readIds.has(item.id),
    }));
  }, [queue.data, projects.data, readIds]);

  const unreadCount = items.filter((item) => !item.read).length;

  const markAllRead = useCallback(() => {
    setReadIds(new Set(items.map((item) => item.id)));
  }, [items]);

  const markRead = useCallback((id) => {
    setReadIds((previous) => new Set(previous).add(id));
  }, []);

  const refresh = useCallback(() => {
    queue.refetch();
    projects.refetch();
  }, [queue, projects]);

  return {
    items,
    unreadCount,
    markAllRead,
    markRead,
    refresh,
    isLoading: queue.isLoading || projects.isLoading,
    isError: queue.isError && projects.isError,
  };
}
