import axios from "axios";

/**
 * Base Axios client for the dashboard API.
 *
 * Reads configuration from environment variables:
 *   - VITE_API_BASE_URL (browser)
 *   - VITE_API_TOKEN    (browser, optional bearer token)
 *
 * For server-side usage in TanStack Start server functions the same names
 * can be provided as process.env variables.
 */

const baseURL = import.meta.env?.VITE_API_BASE_URL ?? process.env?.VITE_API_BASE_URL ?? "";
const token = import.meta.env?.VITE_API_TOKEN ?? process.env?.VITE_API_TOKEN ?? "";

export const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

apiClient.interceptors.request.use((config) => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message ?? "Request failed";
    return Promise.reject(new Error(message));
  },
);

/**
 * Ensures the API client is configured before making requests.
 * Throws a clear error when the base URL is missing.
 */
export function requireApiConfig() {
  if (!baseURL) {
    throw new Error(
      "API_BASE_URL is not configured. Set VITE_API_BASE_URL in your environment to connect to a real API.",
    );
  }
}
